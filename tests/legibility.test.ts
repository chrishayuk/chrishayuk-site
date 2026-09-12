import assert from "node:assert/strict";
import test from "node:test";
import { auditLegibility, legibilityLd, searchProjection, type LegiblePublication } from "../vendor/hause/legibility.ts";
import { auditPublicationLegibility } from "../lib/legibility-audit.ts";
import { legibilityFor } from "../lib/legibility.ts";
import { records } from "../lib/records.ts";
import { threads } from "../lib/threads.ts";
import { retrieveGraph, recordGraph } from "../lib/graph.ts";

test("every listed notebook and thread passes the legibility contract", () => {
 const results = auditPublicationLegibility();
 assert.equal(results.length, records.filter(record => record.kind === "notebook").length + threads.length);
 assert.deepEqual(results.filter(result => !result.ok), []);
});

const example: LegiblePublication = {
 ...legibilityFor("N-MACHINE-TASK")!, title: "The page could ask. It couldn’t authorise.",
 abstract: "Four visitors tested a recording mechanism.", visibleAbstract: "Four visitors tested a recording mechanism.",
 url: "https://example.org/note", authors: ["An author"], indexable: false, state: "draft",
};
test("audit requires meaning and explicit policy without manufacturing draft provenance", () => {
 assert.equal(auditLegibility(example).ok, true);
 assert.equal(auditLegibility({...example, state: "published"}).ok, false);
 assert.equal(auditLegibility({...example, state: "published", published: "2026-09-12"}).ok, true);
 for (const patch of [{subject:""}, {question:""}, {abstract:""}, {authors:[]}, {concepts:[]}, {url:"javascript:alert(1)"}, {visibleAbstract:"Different account"}, {indexable:undefined}])
  assert.equal(auditLegibility({...example,...patch} as LegiblePublication).ok, false, JSON.stringify(patch));
 assert.equal(auditLegibility({...example,searchTitle:example.title}).ok, true);
 assert.ok(auditLegibility({...example,searchTitle:example.title}).advisories.length);
});
test("search projection changes discovery titles while structured headlines keep authorship", () => {
 assert.notEqual(searchProjection(example).title, example.title);
 const ld = legibilityLd(example);
 assert.equal(ld.headline, example.title);
 assert.equal(ld.abstract, example.abstract);
 assert.equal(ld.alternativeHeadline, example.searchTitle);
 assert.equal("datePublished" in ld, false);
 assert.equal("@type" in ld, false);
 assert.equal("acceptedAnswer" in ld, false);
});
test("literal subject queries discover the relevant programme or experiment", () => {
 for (const [query, id] of [
  ["AI agent permissions task scope website instructions", "THREAD-MACHINES"],
  ["artificial life open-ended evolution", "THREAD-CELL80"],
  ["transformer memory mechanistic interpretability", "THREAD-MAP"],
  ["coding agent guardrails Git attribution CI", "N-ATTRIBUTION"],
  ["entity binding Gemma 3", "N-ADDRESS-BUILD"],
 ]) assert.ok(retrieveGraph(query,{scope:"records"}).results.some(result => result.id === id || result.recordId === id), query);
 for (const record of records.filter(record => record.kind === "notebook")) {
  const node = recordGraph().nodes.find(node => node.id === record.id)!;
  assert.equal(node.title, record.title);
  assert.equal(node.text, record.abstract);
  assert.equal(node.subject, legibilityFor(record.id)!.subject);
 }
});
