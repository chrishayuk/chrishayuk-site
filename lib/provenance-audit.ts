import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import type { Snapshot } from "./records.ts";
import { stableJson } from "./publication.ts";
import { auditContinuity, compareVersions, realDate, type Provenance } from "../vendor/hause/provenance.ts";

/** Rehashing a rewritten manuscript must not make it an acceptable old version. */
export function assertAppendOnly(before: unknown[], after: unknown[], key: (entry: never) => string) {
 for (const previous of before) {
  const id = key(previous as never), current = after.find(entry => key(entry as never) === id);
  if (!current || stableJson(previous) !== stableJson(current)) throw new Error(`${id}: Published history was removed or rewritten. Restore it and create a new version with a change reason.`);
 }
}
export async function auditProvenance(snapshots: Snapshot[], provenance: Provenance[]) {
 const errors: string[] = [], advisories: string[] = [];
 const seen = new Set<string>();
 for (const snapshot of [...snapshots].sort((a, b) => compareVersions(a.record.version, b.record.version))) {
  const record = snapshot.record, key = `${record.id}@${record.version}`;
  const fail = (message: string) => errors.push(`${key}: ${message}`);
  if (seen.has(key)) fail("Duplicate version. Each immutable version must resolve once.");
  seen.add(key);
  if (snapshot.algorithm !== "sha256" || snapshot.hash !== createHash("sha256").update(stableJson(record)).digest("hex")) fail("Manuscript checksum differs. Restore the preserved record and publish edits as a new version.");
  if (record.publication !== "published" || record.visibility === "unlisted" || !record.authors.length || record.authors.some(author => !author.trim()) || !record.title.trim() || !record.abstract.trim() || !record.body.length) fail("Publication identity or manuscript is incomplete. Supply authorship, readable content and explicit published visibility.");
  if (!realDate(record.created) || record.created > (record.published || "")) fail("Recorded date must be real and no later than first publication.");
  const matches = provenance.filter(entry => entry.id === record.id && entry.version === record.version);
  if (matches.length !== 1) { fail("Version provenance is missing or duplicated. Supply one change record bound to this manuscript checksum."); continue; }
  const entry = matches[0];
  if (!entry.revision || !Array.isArray(entry.sources)) { fail("Revision reason or source list is missing. Record why this version exists and what it cites."); continue; }
  if (entry.recordHash !== snapshot.hash) fail("Provenance identifies a different manuscript. Bind it to the preserved checksum.");
  const previous = snapshots.filter(s => s.record.id === record.id && compareVersions(s.record.version, record.version) < 0).sort((a, b) => compareVersions(a.record.version, b.record.version)).at(-1)?.record;
  for (const issue of auditContinuity(record, entry.revision, previous)) fail(`[${issue.code}] ${issue.message} ${issue.remedy}`);
  if (previous && (record.slug !== previous.slug || record.kind !== previous.kind || record.created !== previous.created)) fail("Stable route or recorded date changed. Preserve the original identity.");
  if (snapshots.some(s => s !== snapshot && s.record.id === record.id && compareVersions(s.record.version, record.version) === 0)) fail("Two spellings identify the same numeric version. Choose a distinct later version.");
  if (stableJson(entry.sources.map(source => ({ title: source.title, url: source.url, note: source.note }))) !== stableJson(record.sources)) fail("Evidence references differ from the manuscript. Preserve the original source list.");
  for (const experiment of record.experiments || []) if (!experiment.id.trim()) fail("An experiment has no identifier. Use the actual source record ID or omit the field.");
  for (const reference of record.supersedes || []) {
   const target = snapshots.find(s => s.record.id === reference.id && s.record.version === reference.version);
   if (!target || target === snapshot || !reference.reason.trim() || (target.record.revised || target.record.published || "") > (record.revised || record.published || "")) fail("A supersession does not resolve to an earlier published version with a reason. Preserve that version and explain the changed interpretation.");
  }
  if (!entry.sources.length) fail("No origin is recorded. State the source artifacts or authored basis; do not manufacture evidence.");
  for (const source of entry.sources) {
   if (!source.title.trim() || (!source.url && !source.note?.trim())) fail("A source has no recoverable origin. Supply a URL or an honest provenance note.");
   if (source.preserved) {
    const { url, sha256, date } = source.preserved;
    if (!/^\/data\/publications\/sha256\/[a-f0-9]{64}\.[a-z0-9]+$/.test(url) || !url.includes(sha256) || !realDate(date)) { fail("Invalid evidence preservation reference. Use a dated, content-addressed public artifact."); continue; }
    try {
     const bytes = await readFile(new URL(`../public${url}`, import.meta.url));
     if (createHash("sha256").update(bytes).digest("hex") !== sha256) fail(`Preserved evidence changed: ${url}. Restore the original bytes.`);
    } catch { fail(`Preserved evidence is missing: ${url}. Restore the artifact.`); }
   } else if (source.url?.startsWith("/data/")) fail(`Local evidence is not preserved: ${source.url}. Capture a dated copy before release.`);
   else if (source.url) advisories.push(`${key}: External reference only — ${source.title}. The link does not attest continued availability.`);
  }
 }
 for (const entry of provenance) if (!seen.has(`${entry.id}@${entry.version}`)) errors.push(`${entry.id}@${entry.version}: Provenance has no published manuscript. Restore the version or remove an unreleased entry.`);
 const visiting = new Set<string>(), visited = new Set<string>();
 const visit = (snapshot: Snapshot) => {
  const key = `${snapshot.record.id}@${snapshot.record.version}`;
  if (visiting.has(key)) { errors.push(`${key}: Supersession is circular. A work cannot replace its own successor.`); return; }
  if (visited.has(key)) return;
  visiting.add(key);
  for (const reference of snapshot.record.supersedes || []) {
   const target = snapshots.find(s => s.record.id === reference.id && s.record.version === reference.version);
   if (target) visit(target);
  }
  visiting.delete(key); visited.add(key);
 };
 snapshots.forEach(visit);
 return { ok: !errors.length, errors, advisories };
}
