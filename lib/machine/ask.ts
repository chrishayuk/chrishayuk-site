import { searchGraph, type GraphScope, type SearchResult } from "../graph.ts";
import { ROLE, TASK_CLASS, ordinalOf, wordOf, type Role, type TaskClass } from "./vocabulary.ts";

/**
 * WHAT DECLARING BUYS.
 *
 * The principle, and it is the opposite of the human web's bargain:
 *
 *   IDENTITY BUYS UNDERSTANDING, NOT ACCESS.
 *
 * Nothing here is gated. An anonymous agent reads everything a declared
 * one does, and no declaration unlocks a record, a field or a route.
 * What a declared role changes is the ORDER and the FRAMING — which of
 * the things it could already have found are put in front of it, and
 * what they are labelled as.
 *
 * That is cheap because Ask on this site retrieves rather than
 * generates. There is no model in this path: it is deterministic
 * re-ranking over the same graph the public /ask searches, so declaring
 * costs the site nothing and can be given away without limit.
 *
 * THE QUESTION IS NOT STORED AND NOT ECHOED. It reaches searchGraph and
 * is discarded; `recordAsk` takes no string, so there is no argument
 * position through which it could travel into a store. Nor does it come
 * back in the response — a machine endpoint that returns submitted text
 * unchanged is an echo service whatever else it does, and the caller
 * already knows what it asked.
 */

/**
 * How much a declared role cares about each kind of thing.
 *
 * The kinds are the graph's own — `actKind` for an authored act,
 * `kind` otherwise — so this table cannot invent a category the corpus
 * does not have. A role that is absent, unknown or unrecognised gets
 * weight 1 everywhere, which is exactly the public ranking.
 */
const WEIGHTS: Partial<Record<Role, Record<string, number>>> = {
 verifier: { evidence: 3.0, claim: 2.8, refusal: 2.4, source: 2.0, comparison: 1.6 },
 critic: { refusal: 3.0, evidence: 2.6, claim: 2.2, question: 1.6, comparison: 1.4 },
 researcher: { notebook: 2.0, concept: 1.9, observation: 1.7, connection: 1.7, work: 1.5, question: 1.3 },
 synthesizer: { question: 3.0, refusal: 2.4, connection: 1.8, statement: 1.6, summary: 1.6 },
 planner: { question: 2.4, summary: 2.0, connection: 1.8, work: 1.4 },
 coder: { work: 3.0, source: 2.4, evidence: 1.4 },
 retriever: { source: 2.4, evidence: 1.6 },
 browser: { notebook: 1.6, work: 1.4 },
};

/** What the site tells the caller it did, so a change in results is never mysterious. */
const SHAPING: Partial<Record<Role, string[]>> = {
 verifier: [
  "Evidence, claims and refusals ranked above description.",
  "Sources and provenance attached to every result.",
  "Editorial drafts retained, carrying their status.",
 ],
 critic: [
  "Refusals and contradictory evidence ranked first.",
  "What this site declines to claim is treated as a result, not an absence.",
 ],
 researcher: [
  "Notebook entries, concepts and observations ranked above apparatus.",
  "Connections between records surfaced as next resources.",
 ],
 synthesizer: [
  "Open questions and refusals ranked first.",
  "What is unresolved is listed separately from what is settled.",
 ],
 planner: ["Open questions and summaries ranked above detail."],
 coder: ["Software records and their repositories ranked first."],
 retriever: ["Primary sources ranked above commentary."],
 browser: ["Readable records ranked above authored apparatus."],
};

const kindOf = (result: SearchResult) => result.actKind ?? result.kind;

const reference = (result: SearchResult) => ({
 id: result.id,
 title: result.title,
 url: result.sourceUrl,
 kind: kindOf(result),
 ...(result.status ? { status: result.status } : {}),
 ...(result.publication ? { editorial_state: result.publication } : {}),
 ...(result.version ? { version: result.version } : {}),
});

export type ResearchBundle = {
 answer: "retrieval-result";
 shaped_by: { role: Role; task_class: TaskClass } | null;
 shaping: string[];
 canonical_sources: ReturnType<typeof reference>[];
 evidence: ReturnType<typeof reference>[];
 contradictions: ReturnType<typeof reference>[];
 unresolved: ReturnType<typeof reference>[];
 recommended_next: { title: string; url: string; basis: string }[];
 limits: string[];
};

export type AskRequest = { question: string; role?: unknown; task_class?: unknown; scope?: unknown };

export function researchBundle(input: AskRequest): ResearchBundle {
 const role = wordOf(ROLE, ordinalOf(ROLE, input.role));
 const task = wordOf(TASK_CLASS, ordinalOf(TASK_CLASS, input.task_class));
 const scope = (["records", "films", "concepts", "all"].includes(String(input.scope)) ? input.scope : "all") as GraphScope;

 const results = searchGraph(String(input.question ?? "").slice(0, 500), { scope, includeDrafts: true });
 const weights = WEIGHTS[role];

 const ranked = weights
  ? [...results].sort((a, b) =>
     (b.score * (weights[kindOf(b)] ?? 1)) - (a.score * (weights[kindOf(a)] ?? 1)))
  : results;

 const of = (...kinds: string[]) => ranked.filter(result => kinds.includes(kindOf(result))).slice(0, 10).map(reference);

 return {
  answer: "retrieval-result",
  shaped_by: weights ? { role, task_class: task } : null,
  shaping: weights
   ? SHAPING[role] ?? []
   : ["No role was declared, or the role was not one this site knows, so results are in the site's ordinary order."],

  // Everything that is a record or a primary source, ranked for this role.
  canonical_sources: ranked.filter(result => result.kind !== "act" || !["evidence", "refusal"].includes(kindOf(result)))
   .slice(0, 12).map(reference),

  evidence: of("evidence", "claim", "comparison"),

  // A refusal is this site declining to claim something, and for a
  // verifier it is worth more than another paragraph agreeing.
  contradictions: of("refusal"),

  unresolved: ranked.filter(result => kindOf(result) === "question" || result.status === "OPEN")
   .slice(0, 10).map(reference),

  recommended_next: ranked.flatMap(result => result.related).slice(0, 8),

  limits: [
   "This is retrieval, not generation. Nothing here was written to answer your question; every item is a source that already existed.",
   "Editorial state travels with every item. A draft is not a finding, and quoting one as a finding misrepresents it.",
   "Declaring a role changes ranking and framing only. Nothing on this site is gated on a declaration, and an anonymous request reaches exactly the same corpus.",
   "Your question was not stored and is not returned. It reached the index and was discarded.",
  ],
 };
}
