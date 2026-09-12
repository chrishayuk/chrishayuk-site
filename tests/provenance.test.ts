import assert from "node:assert/strict";
import test from "node:test";
import { createHash } from "node:crypto";
import { auditContinuity } from "../vendor/hause/provenance.ts";
import { publicationSnapshots, getManuscript, getRecord } from "../lib/records.ts";
import { publicationProvenance, publicationHistory } from "../lib/provenance.ts";
import { preparePublication } from "../lib/publication-release.ts";
import { assertAppendOnly, auditProvenance } from "../lib/provenance-audit.ts";
import { stableJson } from "../lib/publication.ts";
import { recordGraph } from "../lib/graph.ts";

const original = publicationSnapshots[0];
const revision = { kind: "interpretation" as const, summary: "Follow-up evidence narrows the interpretation.", previous: original.record.version };
const key = (snapshot: typeof original) => `${snapshot.record.id}@${snapshot.record.version}`;

test("the real preserved corpus has matching manuscripts, evidence and continuity", async () => {
 const result = await auditProvenance(publicationSnapshots, publicationProvenance);
 assert.deepEqual(result.errors, []);
 assert.ok(result.advisories.every(issue => issue.includes("External reference only")));
});
test("a revision publishes the edited manuscript and keeps the cited original unchanged", () => {
 const before = stableJson(original);
 const manuscript = { ...getManuscript(original.record.id)!, abstract: "A revised interpretation with explicit evidence limits.", status: "NOT SUPPORTED" as const };
 const next = preparePublication(manuscript, publicationSnapshots, "2.0", "2026-09-13", revision);
 assert.equal(next.record.abstract, manuscript.abstract);
 assert.equal(next.record.published, original.record.published);
 assert.equal(next.record.revised, "2026-09-13");
 assert.equal(next.record.publication, "published");
 assert.equal(next.record.status, "NOT SUPPORTED");
 assert.equal(stableJson(original), before);
 assert.equal(getRecord(original.record.id)?.abstract, original.record.abstract);
 assert.notEqual(getManuscript(original.record.id), getRecord(original.record.id));
});
test("same, equivalent, older and undated releases are refused", () => {
 const manuscript = getManuscript(original.record.id)!;
 for (const version of ["1.0", "1.0.0", "0.9"]) assert.throws(() => preparePublication(manuscript, publicationSnapshots, version, "2026-09-13", revision));
 for (const date of ["2026-02-30", "2026-09-11", "yesterday"]) assert.throws(() => preparePublication(manuscript, publicationSnapshots, "2.0", date, revision));
 assert.throws(() => preparePublication(manuscript, publicationSnapshots, "2.0", "2026-09-13", { ...revision, summary: " " }), /why this version exists/);
 assert.throws(() => preparePublication(manuscript, publicationSnapshots, "2.0", "2026-09-13", { ...revision, previous: "0.1" }), /predecessor/);
});
test("first publication stays fixed even when the scientific interpretation changes", () => {
 const issues = auditContinuity({ version: "2.0", published: "2026-09-13", revised: "2026-09-13" }, revision, original.record);
 assert.ok(issues.some(issue => issue.code === "first-publication"));
 assert.deepEqual(auditContinuity({ version: "1.0", published: "2026-09-12" }, { kind: "initial", summary: "Initial publication." }), []);
});
test("append-only history rejects rehashed rewrites and removal, but accepts new versions", () => {
 const tampered = structuredClone(original);
 tampered.record.abstract = "Silently cleaned-up history.";
 tampered.hash = createHash("sha256").update(stableJson(tampered.record)).digest("hex");
 assert.throws(() => assertAppendOnly([original], [tampered], key), /rewritten/);
 assert.throws(() => assertAppendOnly([original], [], key), /removed/);
 const next = preparePublication(getManuscript(original.record.id)!, publicationSnapshots, "2.0", "2026-09-13", revision);
 assert.doesNotThrow(() => assertAppendOnly([original], [original, next], key));
});
test("altered provenance, orphan entries and missing evidence cannot pass the audit", async () => {
 const entries = structuredClone(publicationProvenance);
 entries[0].sources[0].title = "A different origin";
 entries[0].recordHash = "0".repeat(64);
 const preserved = entries[0].sources.find(source => source.preserved)!.preserved!;
 preserved.url = `/data/publications/sha256/${"0".repeat(64)}.json`;
 preserved.sha256 = "0".repeat(64);
 const result = await auditProvenance(publicationSnapshots, entries);
 for (const pattern of [/different manuscript/, /references differ/, /evidence is missing/]) assert.ok(result.errors.some(error => pattern.test(error)));
 assert.equal((await auditProvenance([], publicationProvenance)).ok, false);
});
test("history exposes pinned citation and evidence URLs without inventing draft publications", () => {
 const history = publicationHistory(original.record.id)!;
 assert.equal(history.versions[0].hash, original.hash);
 assert.equal(history.versions[0].title, original.record.title);
 assert.equal(history.versions[0].abstract, original.record.abstract);
 assert.deepEqual(history.versions[0].authors, original.record.authors);
 assert.equal(history.versions[0].next, undefined);
 assert.equal(history.versions[0].previous, undefined);
 assert.ok(history.versions[0].citations.endsWith("?version=1.0"));
 assert.deepEqual(publicationHistory("N-MACHINE-TASK")?.versions, []);
 assert.equal(publicationHistory("missing"), undefined);
});
test("graph connects preserved versions and evidence without treating history as current findings", () => {
 const graph = recordGraph(), versionId = `${original.record.id}@${original.record.version}`;
 const node = graph.nodes.find(node => node.id === versionId)!;
 assert.equal(node.sourceHash, original.hash);
 assert.equal(node.retrievable, false);
 assert.ok(graph.edges.some(edge => edge.to === versionId && edge.kind === "includes-version"));
 assert.ok(graph.nodes.some(node => node.basis === "preserved-artifact" && node.sourceHash));
 assert.ok(graph.nodes.some(node => node.id === `${original.record.id}:history` && node.retrievable));
});

test("supersession requires a recoverable target and cannot form a cycle", async () => {
 const snapshots = structuredClone(publicationSnapshots), entries = structuredClone(publicationProvenance);
 const a = snapshots[0], b = snapshots[1];
 a.record.supersedes = [{ id: b.record.id, version: b.record.version, reason: "A synthetic circular claim." }];
 b.record.supersedes = [{ id: a.record.id, version: a.record.version, reason: "A synthetic reverse claim." }];
 const result = await auditProvenance(snapshots, entries);
 assert.ok(result.errors.some(error => error.includes("circular")));
 a.record.supersedes[0].id = "MISSING";
 assert.ok((await auditProvenance(snapshots, entries)).errors.some(error => error.includes("does not resolve")));
});

test("capability publication preserves the falsified prediction and leaves discovery open", async () => {
 const { default: evidence } = await import("../public/data/machines/web-capability-1a-evidence.json", { with: { type: "json" } });
 const note = getRecord("N-MACHINE-CAPABILITY")!;
 assert.equal(note.publication, "published");
 assert.equal(note.status, "REFUTED");
 assert.equal(note.experiments?.[0].id, "MACHINE-WEB-CAPABILITY-1A");
 assert.equal(evidence.subjects.length, 18);
 assert.equal(evidence.subjects.filter(subject => subject.webfetch).length, 10);
 for (const condition of new Set(evidence.subjects.map(subject => subject.condition))) {
  const subjects = evidence.subjects.filter(subject => subject.condition === condition);
  assert.equal(subjects.length, 3);
  assert.ok(subjects.every(subject => subject.fullFunnel && subject.reported === subject.deployed));
 }
 assert.ok(note.body.some(act => act.kind === "question" && act.status === "OPEN" && act.text.includes("capability")));
 assert.ok(note.body.some(act => act.kind === "claim" && act.status === "REFUTED" && act.text.includes("fewer")));
 assert.match(note.abstract, /did not test discovery/);
});
