import { searchGraph, type GraphScope, type SearchResult } from "../graph.ts";
import { FUNCTION, TASK_CLASS, ordinalOf, wordOf, type AgentFunction, type TaskClass } from "./vocabulary.ts";

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
 *
 * That was briefly untrue. When a question had to be narrowed, the reply
 * named the surviving words — a caller-chosen subset of its own question,
 * in its own order. Corpus-intersected and so not a cross-participant
 * relay, but the stated invariant was false as written, on a site whose
 * whole argument is that its stated invariants are checkable. It reports
 * a count now.
 */

/**
 * How much a declared role cares about each kind of thing.
 *
 * The kinds are the graph's own — `actKind` for an authored act,
 * `kind` otherwise — so this table cannot invent a category the corpus
 * does not have. A role that is absent, unknown or unrecognised gets
 * weight 1 everywhere, which is exactly the public ranking.
 */
const WEIGHTS: Partial<Record<AgentFunction, Record<string, number>>> = {
 verifier: { evidence: 3.0, claim: 2.8, refusal: 2.6, source: 2.0, comparison: 1.6 },
 researcher: { notebook: 2.0, concept: 1.9, observation: 1.7, connection: 1.7, work: 1.5, question: 1.3 },

 coder: { work: 3.0, source: 2.4, evidence: 1.4 },
 browser: { notebook: 1.6, work: 1.4 },
 explorer: { connection: 2.2, concept: 2.0, question: 1.8, summary: 1.6 },
};

/** What the site tells the caller it did, so a change in results is never mysterious. */
const SHAPING: Partial<Record<AgentFunction, string[]>> = {
 verifier: [
  "Evidence, claims and refusals ranked above description.",
  "What this site declines to claim is treated as a result, not an absence.",
  "Sources and provenance attached to every result.",
  "Editorial drafts retained, carrying their status.",
 ],
 researcher: [
  "Notebook entries, concepts and observations ranked above apparatus.",
  "Connections between records surfaced as next resources.",
 ],

 coder: ["Software records and their repositories ranked first."],
 browser: ["Readable records ranked above authored apparatus."],
 explorer: ["Connections, concepts and open questions ranked above detail."],
};

const kindOf = (result: SearchResult) => result.actKind ?? result.kind;

/**
 * A reference carries the TEXT, not just a pointer to it.
 *
 * It did not, and that made the endpoint rewarding declaration strictly
 * worse than the anonymous /api/search beside it: this returned
 * id/title/url/kind and required N more fetches, while the undeclared
 * surface returned the actual content. An agent reported exactly that,
 * and it is fatal to the bargain — identity is supposed to buy
 * understanding, and it was buying a worse retriever with better
 * sorting.
 */
const reference = (result: SearchResult) => ({
 id: result.id,
 title: result.title,
 url: result.sourceUrl,
 kind: kindOf(result),
 text: result.text.length > 600 ? result.text.slice(0, 600) + "…" : result.text,
 basis: result.basis,
 score: result.score,
 ...(result.status ? { status: result.status } : {}),
 ...(result.publication ? { editorial_state: result.publication } : {}),
 ...(result.version ? { version: result.version } : {}),
});

export type ResearchBundle = {
 answer: "retrieval-result";
 /**
  * How many sources matched, before any list below was truncated.
  *
  * A caller cannot otherwise tell whether it is seeing everything, and it
  * is the honest way to state the guarantee that nothing is gated: this
  * number is identical for every role, and only the ORDER moves.
  */
 matched: number;
 shaped_by: { function: AgentFunction; task_class: TaskClass } | null;
 shaping: string[];
 canonical_sources: ReturnType<typeof reference>[];
 evidence: ReturnType<typeof reference>[];
 contradictions: ReturnType<typeof reference>[];
 unresolved: ReturnType<typeof reference>[];
 recommended_next: { title: string; url: string; basis: string }[];
 limits: string[];
};

export type AskRequest = { question: string; function?: unknown; role?: unknown; task_class?: unknown; scope?: unknown };

/**
 * A QUESTION IS NOT A KEYWORD QUERY, AND MACHINES ASK QUESTIONS.
 *
 * searchGraph requires EVERY term to appear in the same node, so a single
 * word the corpus has never seen eliminates every result. "predictive
 * locality" finds a record; "what evidence supports predictive locality"
 * finds nothing, because "supports" appears nowhere. Both blind agents
 * reported the same shape of failure against the public search, and an
 * endpoint that answers a natural question with an empty bundle is worse
 * than one that does not exist — it is a promise that fails silently.
 *
 * So: ask as written, and if that finds nothing, drop the words that
 * match nothing rather than the words that matter. A term present in no
 * node contributes no information and removes every result, which makes
 * it exactly the right thing to discard.
 *
 * The public /ask is untouched. This relaxation belongs to the machine
 * endpoint, where the caller is asking in sentences.
 */
/**
 * Words that carry no information about this corpus.
 *
 * An earlier attempt inferred selectivity by probing with a common word,
 * which was unreliable — the underlying search already discards its own
 * stopwords, so the probe returned nothing and the derived ceiling
 * started discarding MEANINGFUL terms instead. An explicit list is
 * duller and correct.
 */
const NOISE = new Set([
 "a", "about", "all", "an", "and", "any", "are", "as", "at", "be", "been", "but", "by",
 "can", "could", "did", "do", "does", "for", "from", "had", "has", "have", "here", "how",
 "i", "if", "in", "into", "is", "it", "its", "just", "many", "may", "me", "much", "my",
 "no", "not", "of", "on", "or", "our", "out", "över", "please", "should", "so", "some",
 "supports", "tell", "than", "that", "the", "their", "them", "then", "there", "these",
 "they", "this", "to", "us", "was", "we", "were", "what", "when", "where", "which", "who",
 "why", "will", "with", "would", "you", "your",
 // Indefinite pronouns. They are ordinary English, they appear all over
 // authored prose, and they say nothing about what is being asked for.
 "anybody", "anyone", "anything", "everybody", "everyone", "everything",
 "nobody", "nothing", "somebody", "someone", "something", "thing", "things",
]);

function retrieve(question: string, scope: GraphScope): { results: SearchResult[]; usedTerms: string[] | null } {
 const asked = searchGraph(question, { scope, includeDrafts: true });
 if (asked.length) return { results: asked, usedTerms: null };

 // Answering noise with confident-looking sources is a worse failure than
 // answering nothing: "zzz nothing at all here" found records on the
 // strength of "all" and "here". Drop the words that carry no information
 // about this corpus, then keep only those the corpus has actually seen.
 const words = [...new Set(question.toLowerCase().split(/[^\p{L}\p{N}-]+/u)
  .filter(word => word.length > 2 && !NOISE.has(word)))].slice(0, 16);
 const productive = words.filter(word => searchGraph(word, { scope, includeDrafts: true }).length > 0);
 if (!productive.length) return { results: [], usedTerms: [] };

 const narrowed = searchGraph(productive.join(" "), { scope, includeDrafts: true });
 if (narrowed.length) return { results: narrowed, usedTerms: productive };

 // Each term finds something, no node holds them all. Union, best first.
 const merged = new Map<string, SearchResult>();
 for (const word of productive) {
  for (const result of searchGraph(word, { scope, includeDrafts: true })) {
   if (!merged.has(result.id)) merged.set(result.id, result);
  }
 }
 return { results: [...merged.values()].sort((a, b) => b.score - a.score), usedTerms: productive };
}

export function researchBundle(input: AskRequest): ResearchBundle {
 // Keyed on `function`, the same axis the declaration uses, so a visitor
 // does not have to learn two names for one thing.
 const fn = wordOf(FUNCTION, ordinalOf(FUNCTION, input.function ?? input.role));
 const task = wordOf(TASK_CLASS, ordinalOf(TASK_CLASS, input.task_class));
 const scope = (["records", "films", "concepts", "all"].includes(String(input.scope)) ? input.scope : "all") as GraphScope;

 const { results, usedTerms } = retrieve(String(input.question ?? "").slice(0, 500), scope);
 const weights = WEIGHTS[fn];

 const ranked = weights
  ? [...results].sort((a, b) =>
     (b.score * (weights[kindOf(b)] ?? 1)) - (a.score * (weights[kindOf(a)] ?? 1)))
  : results;

 const of = (...kinds: string[]) => ranked.filter(result => kinds.includes(kindOf(result))).slice(0, 10).map(reference);

 return {
  answer: "retrieval-result",
  matched: results.length,
  shaped_by: weights ? { function: fn, task_class: task } : null,
  shaping: [
   ...(weights
    ? SHAPING[fn] ?? []
    : ["No function was declared, or it was not one this site knows, so results are in the site's ordinary order."]),
   // Say when the question was not answerable as asked. A caller that
   // cannot tell the difference between "nothing matched" and "matched
   // something else" cannot correct its next question.
   ...(usedTerms === null ? []
    : usedTerms.length === 0
     ? ["Nothing in this corpus matched any word of your question, so there is nothing below. That is an absence, not a ranking."]
     // Naming them is not an echo: a surviving term is one this CORPUS
     // contains, so it carries the site's vocabulary rather than the
     // caller's. Reporting only a count was an over-correction — it left a
     // caller unable to refine, which an agent reported as the difference
     // between a narrowed answer and a useless one.
     : [`Your question found nothing as written — every term must appear in the same record, so it was narrowed to the words this corpus contains: ${usedTerms.join(", ")}.`]),
  ],

  // The ranked list itself, whole.
  //
  // An earlier version excluded evidence and refusals here on the grounds
  // that they had their own sections — which meant a verifier's ranking
  // applied only to items this list had already dropped, and the shaping
  // was invisible in the one place a caller looks first. The sections
  // below are additional VIEWS of the same ranking, not slices taken out
  // of it.
  canonical_sources: ranked.slice(0, 12).map(reference),

  evidence: of("evidence", "claim", "comparison"),

  // A refusal is this site declining to claim something, and for a
  // verifier it is worth more than another paragraph agreeing.
  contradictions: of("refusal"),

  unresolved: ranked.filter(result => kindOf(result) === "question" || result.status === "OPEN")
   .slice(0, 10).map(reference),

  recommended_next: ranked.flatMap(result => result.related).slice(0, 8),

  limits: [
   "This is retrieval, not generation. Nothing here was written to answer your question; every item is a source that already existed.",
   "Matching is AND across a single record: every term must appear in the same item. A natural-language question is narrowed to the terms this corpus contains, and `shaping` says when that happened and to what.",
   "Editorial state travels with every item. A draft is not a finding, and quoting one as a finding misrepresents it.",
   "Declaring a role changes ranking and framing only. Nothing on this site is gated on a declaration, and an anonymous request reaches exactly the same corpus.",
   "Your question was not stored. It is not returned either, except that a narrowed query reports which of its terms this corpus contains — those are words from the corpus, not from you.",
  ],
 };
}
