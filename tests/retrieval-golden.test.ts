import assert from "node:assert/strict";
import test from "node:test";
import { NOISE, retrieveGraph, searchGraph } from "../lib/graph.ts";

/**
 * THE GOLDEN RETRIEVAL BANK.
 *
 * This file exists because a number was green while the property was
 * false, for the sixth time in this codebase, and because a visitor
 * caught it rather than a test.
 *
 * The operator spot-checked `matched` counts, saw /api/machines/ask
 * return 5 and 52 where /api/search returned 0, and concluded ask was
 * the better surface. A blind visitor read the actual results and
 * reported that ask "dropped every distinctive term and returned
 * unrelated records". Both observations were true of the same request.
 * COUNTING ROWS IS NOT ANSWERING A QUESTION.
 *
 * So nothing here asserts a count, and almost nothing pins an id. The
 * corpus grows; relevance rankings should be free to improve. What is
 * pinned is the PROPERTY that was broken:
 *
 *   1. a record answering more of the question outranks one answering
 *      less, however high the lesser one scores on its own
 *   2. the distinctive term survives narrowing
 *   3. noise retrieves nothing rather than something confident
 *   4. both public surfaces answer one corpus identically
 */

const opts = { scope: "all" as const, includeDrafts: true };
const search = (q: string) => searchGraph(q, opts);
const terms = (q: string) => [...new Set(q.toLowerCase().split(/[^\p{L}\p{N}-]+/u)
 .filter(w => w.length > 2 && !NOISE.has(w)))].filter(w => search(w).length > 0);

/** How much of the question a result answers, rarer terms counting for more. */
function coverage(question: string, id: string): number {
 return terms(question)
  .filter(term => search(term).some(r => r.id === id))
  .reduce((total, term) => total + 1 / Math.log2(2 + search(term).length), 0);
}

test("GOLDEN: a record answering more of the question outranks one answering less", () => {
 // The defect, exactly. When no record holds the whole question the results
 // are a union over its terms, and that union used to be sorted by each
 // record's own score — which says nothing about how much was answered. A
 // concept node matching one common word (score 105) beat records matching
 // three. Asserted as monotonicity so any future re-ranking stays honest.
 for (const question of ["machine mutation invention", "agent readable calculate", "llms exhibition"]) {
  const { results, usedTerms } = retrieveGraph(question, opts);
  assert.ok(results.length > 1, `${question} must exercise the union path`);
  assert.ok(usedTerms && usedTerms.length > 1, `${question} must actually narrow`);

  const covers = results.map(r => coverage(question, r.id));
  for (let i = 1; i < covers.length; i++) {
   assert.ok(covers[i] <= covers[i - 1] + 1e-9,
    `"${question}": result ${i} answers more of the question than result ${i - 1} but ranks below it`);
  }
  assert.ok(covers[0] > covers[covers.length - 1],
   `"${question}": the ranking must actually separate — if every result covers the same, this proves nothing`);
 }
});

test("GOLDEN: the distinctive term survives, and punctuation does not lose it", () => {
 // "llms.txt" tokenises to llms + txt. /api/search returned nothing for it
 // while the corpus plainly held the answer; a visitor found the site's own
 // primary evidence only via a path glimpsed in a telemetry dump.
 const { results, usedTerms } = retrieveGraph("llms.txt", opts);
 assert.ok(results.length > 0, "the corpus holds this; nothing is the old /api/search failure");

 const survived = usedTerms ?? terms("llms.txt");
 assert.ok(survived.includes("llms"),
  "the DISTINCTIVE term must survive — discarding it is what the visitor reported");

 // And the top hit must be a record that genuinely contains it, not one that
 // floated up on the commoner half.
 assert.ok(search("llms").some(r => r.id === results[0].id),
  "the first result must contain the distinctive term");
});

test("GOLDEN: noise retrieves nothing rather than sources that look confident", () => {
 // "zzz nothing at all here" once returned records on the strength of
 // "all" and "here". Answering noise with citations is worse than silence.
 for (const nonsense of ["zzz nothing at all here", "the and of it", "qqqq wwww eeee", "please tell me something"]) {
  const { results, usedTerms } = retrieveGraph(nonsense, opts);
  assert.equal(results.length, 0, `"${nonsense}" must retrieve nothing`);
  assert.deepEqual(usedTerms, [], "and must say that nothing of the question survived");
 }
});

test("PARITY: the two retrieval surfaces answer one corpus the same way", () => {
 // /api/search and /api/machines/ask both retrieve over this graph. They
 // disagreed for as long as they had separate query handling, and three
 // separate blind visitors reported it. They now derive from one function;
 // this asserts that rather than trusting it.
 for (const question of ["llms.txt", "machine mutation invention", "predictive locality", "zzz nothing here"]) {
  const shared = retrieveGraph(question, opts);
  const direct = search(question);
  if (direct.length) {
   assert.deepEqual(shared.results.map(r => r.id), direct.map(r => r.id),
    `when the plain search finds something, the shared path returns exactly it: ${question}`);
   assert.equal(shared.usedTerms, null, "and reports that no narrowing happened");
  } else {
   assert.ok(shared.usedTerms !== null,
    `when the plain search finds nothing, the shared path must say what it narrowed to: ${question}`);
  }
 }
});
