import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { parseFeedback } from "../lib/machine/feedback.ts";
import { WriteQueue, resetLimiter } from "../lib/machine/admission.ts";
import { handleDeclaredValues, type StoredDeclaration } from "../lib/machine/handler.ts";
import {
 PUBLISHED_DECLARATION_EXAMPLES, PUBLISHED_FEEDBACK_EXAMPLES, classifyDeclarationQuery, declaredValuesFromQuery,
 isPublishedDeclarationExample, isPublishedFeedbackExample,
} from "../lib/machine/published-examples.ts";

const declares = (query: string) => declaredValuesFromQuery(new URLSearchParams(query));

/**
 * The GET route's path from URL to store: the same classification it acts
 * on, then the real handler with an in-memory sink. Each crawler arrives
 * from its own address, which is what the hourly dedupe could not see.
 */
async function getDeclaration(query: string, source: string, written: StoredDeclaration[]) {
 const url = `https://chrishayuk.com/api/machines/declaration?${query}`;
 const decision = classifyDeclarationQuery(new URL(url).searchParams);
 if (decision.kind !== "declare") return { kind: decision.kind, status: 200 };
 const request = new Request(url, { headers: { "fly-client-ip": source } });
 const { response } = await handleDeclaredValues(request, decision.values, {
  sink: async (record: StoredDeclaration) => { written.push(record); },
  queue: new WriteQueue(),
 });
 return { kind: decision.kind, status: response.status };
}

test("every example ever published is refused, in any parameter order", () => {
 for (const query of PUBLISHED_DECLARATION_EXAMPLES) {
  assert.ok(isPublishedDeclarationExample(declares(query)), query);
  const reversed = query.split("&").reverse().join("&");
  assert.ok(isPublishedDeclarationExample(declares(reversed)), reversed);
 }
});

test("the replayed declarations of 12 September – 15 October are refused", () => {
 // As the crawlers sent them: the /llms.txt example and the contract's declare_by_get.
 assert.ok(isPublishedDeclarationExample(declares("harness=claude_code&topology=child&function=researcher&actor_type=agent")));
 assert.ok(isPublishedDeclarationExample(declares("actor_type=agent&function=researcher&topology=child&coordination=worker&harness=claude_code&cb=1")));
 assert.ok(isPublishedDeclarationExample(declares("capability=can_execute_code:no&capability=can_navigate:yes")));
});

test("one field of the visitor's own makes it a declaration again", () => {
 assert.equal(isPublishedDeclarationExample(declares("actor_type=agent&function=researcher&topology=child&harness=claude_code&task_class=research")), false);
 assert.equal(isPublishedDeclarationExample(declares("actor_type=agent&function=verifier")), false);
 assert.equal(isPublishedDeclarationExample(declares("capability=can_navigate:yes")), false);
});

test("an old example replayed repeatedly, from many sources and in any order, records nothing", async () => {
 resetLimiter();
 const written: StoredDeclaration[] = [];
 const replays = [
  "actor_type=agent&function=researcher&topology=child&harness=claude_code",
  "harness=claude_code&actor_type=agent&topology=child&function=researcher",
  "topology=child&harness=claude_code&function=researcher&actor_type=agent&utm_source=crawl",
  "coordination=worker&harness=claude_code&topology=child&function=researcher&actor_type=agent",
  "capability=can_execute_code:no&capability=can_navigate:yes",
 ];
 for (let round = 0; round < 3; round++) {
  for (const [i, query] of replays.entries()) {
   const result = await getDeclaration(query, `198.51.100.${round * 10 + i}`, written);
   assert.equal(result.kind, "published_example", `round ${round}: ${query}`);
  }
 }
 assert.equal(written.length, 0, "fifteen replays, fifteen different sources, no row");
});

test("a genuinely new declaration by GET is still recorded", async () => {
 resetLimiter();
 const written: StoredDeclaration[] = [];
 const result = await getDeclaration("actor_type=agent&function=verifier&harness=codex&task_class=research", "203.0.113.7", written);
 assert.equal(result.kind, "declare");
 assert.equal(result.status, 201);
 assert.equal(written.length, 1);

 // The old example plus one field of the visitor's own counts as theirs.
 const extended = await getDeclaration("actor_type=agent&function=researcher&topology=child&harness=claude_code&task_class=analysis", "203.0.113.8", written);
 assert.equal(extended.status, 201);
 assert.equal(written.length, 2);

 // And the published dry run still records nothing.
 assert.equal((await getDeclaration("validate=1&actor_type=agent&function=verifier", "203.0.113.9", written)).kind, "validate");
 assert.equal(written.length, 2);
});

test("the replayed feedback is refused and real feedback is not", () => {
 for (const detail of PUBLISHED_FEEDBACK_EXAMPLES) assert.ok(isPublishedFeedbackExample(parseFeedback({ detail }).detail), detail);
 assert.ok(isPublishedFeedbackExample(parseFeedback({ detail: "  Nothing linked to llms.txt " }).detail));
 assert.equal(isPublishedFeedbackExample(parseFeedback({ detail: "nothing linked to llms.txt from the homepage" }).detail), false);
 assert.equal(isPublishedFeedbackExample(parseFeedback({}).detail), false);
});

test("no ready-to-run write URL is published any more", async () => {
 for (const file of ["../lib/llms.ts", "../lib/machine/contract.ts", "../app/api/machines/feedback/route.ts"]) {
  const source = await readFile(new URL(file, import.meta.url), "utf8");
  for (const url of source.matchAll(/machines\/(?:declaration|feedback)\?([^`"\s]+)|\$\{url\}\?([^`"\s]+)/g)) {
   const query = url[1] ?? url[2];
   if (new URLSearchParams(query).get("validate") === "1") continue;
   const params = new URLSearchParams(query);
   const writes = url[0].includes("feedback")
    ? !isPublishedFeedbackExample(parseFeedback({ detail: params.get("detail") ?? undefined }).detail)
    : Object.keys(declares(query)).length > 0 && !isPublishedDeclarationExample(declares(query));
   assert.equal(writes, false, `${file} publishes a URL that records: ${url[0]}`);
  }
 }
});
