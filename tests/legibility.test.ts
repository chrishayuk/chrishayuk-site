import assert from "node:assert/strict";
import test from "node:test";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { auditLegibility, legibilityLd, searchProjection, type LegiblePublication } from "../vendor/hause/legibility.ts";
import { auditPublicationLegibility } from "../lib/legibility-audit.ts";
import { legibilityFor, publicationLegibility } from "../lib/legibility.ts";
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

test("editorial search opt-outs require a reason and keep meaning and provenance obligations", () => {
 const editorial: LegiblePublication = {...example, searchTitle:undefined, description:undefined, search:{mode:"editorial",reason:"The editorial title already states the question precisely."}};
 assert.equal(auditLegibility(editorial).ok,true);
 assert.deepEqual(searchProjection(editorial),{});
 assert.equal(legibilityLd(editorial).alternativeHeadline,undefined);
 assert.equal(legibilityLd(editorial).about[0].name,editorial.subject);
 for (const patch of [{search:{mode:"editorial",reason:" "}}, {subject:""}, {question:""}, {abstract:""}, {authors:[]}, {url:"/relative"}, {state:"published",published:undefined}])
  assert.equal(auditLegibility({...editorial,...patch} as LegiblePublication).ok,false,JSON.stringify(patch));
 const registry={...publicationLegibility,"N-MACHINE-TASK":editorial};
 assert.equal(auditPublicationLegibility(registry).find(result=>result.id==="N-MACHINE-TASK")!.ok,true);
 const missing=Object.fromEntries(Object.entries(registry).filter(([id])=>id!=="N-MACHINE-TASK"));
 assert.equal(auditPublicationLegibility(missing).find(result=>result.id==="N-MACHINE-TASK")!.ok,false);
});

test("diagnostics identify the failure and supply a concrete remedy", () => {
 const subject=auditLegibility({...example,subject:""}).diagnostics.find(issue=>issue.code==="literal-subject")!;
 assert.equal(subject.severity,"error");
 assert.match(subject.message,/what it is about/);
 assert.match(subject.remedy,/editorial title may remain unchanged/);
 const missingHead=auditLegibility({...example,searchTitle:undefined}).diagnostics.find(issue=>issue.code==="search-title")!;
 assert.match(missingHead.remedy,/literal search title/);
 assert.match(missingHead.remedy,/editorial.*reason/);
 const duplicate={...publicationLegibility,"N-MACHINE-TASK":{...publicationLegibility["N-MACHINE-TASK"],searchTitle:publicationLegibility["THREAD-MACHINES"].searchTitle!.toUpperCase()+" !!!"}};
 const collision=auditPublicationLegibility(duplicate).flatMap(result=>result.diagnostics).find(issue=>issue.code==="duplicate-search-title")!;
 assert.match(collision.message,/N-MACHINE-TASK/);
 assert.match(collision.remedy,/own question/);
 for(const date of [undefined,"not-a-date","2026-02-30","2026-13-01"])
  assert.equal(auditLegibility({...example,state:"published",published:date}).ok,false,String(date));
 assert.equal(auditLegibility({...example,state:"published",published:"2024-02-29"}).ok,true);
});

// Fresh processes model a rebuilt edition. Fixtures change in-memory source
// records before consumers load, so stale module caches cannot hide an edit.
for(const mode of ["projected","editorial"]) test(`an edit reaches real consumers in ${mode} mode`, () => {
 const output=execFileSync(process.execPath,["--experimental-strip-types",fileURLToPath(new URL("./fixtures/legibility-edit.ts",import.meta.url)),mode],{
  cwd:fileURLToPath(new URL("..",import.meta.url)),encoding:"utf8",env:{...process.env,SITE_INDEXABLE:"true"},
 });
 assert.match(output,/Three edited records passed metadata, structured data, graph, retrieval and machine-index parity/);
});
