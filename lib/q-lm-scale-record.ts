import type { PublicationRecord } from "./types.ts";

/** The second Q-LM note: how the substitution learner's cost grows, on
 * Colmerauer's language and on TinyStories, and the first stages of Q-LM v2.
 * Every number is from QLM-SCALE-001 and the v2 results documents of the
 * linked repository. */
const REPO = "https://github.com/chrishayuk/q-lm";
const DOC = (name: string) => `${REPO}/blob/main/docs/${name}`;

export const qLmScaleRecord: PublicationRecord = {
  id: "N-Q-LM-SCALE",
  slug: "the-language-model-that-gets-smaller-as-it-learns",
  kind: "notebook",
  title: "The language model that gets smaller as it learns.",
  dek: "On Colmerauer’s language, a learned grammar has 85,969 rules at 300 sentences and 1,772 from 10,000 on, and its cost per next token falls about 584 times from that peak. On TinyStories nothing merges, and it grows with the text.",
  abstract: "A second note on Q-LM, a modern experiment that learns a grammar from sentences alone by grouping substrings that share a context. QLM-SCALE-001 measures how its cost grows. On more sentences of the same language, the grammar is largest with little data: at 300 of Colmerauer’s sentences it has 85,969 rules, uses 23,948 of them per sentence, and takes 613 milliseconds per next token. From 10,000 sentences to 105,138 it is the same 192 categories and 1,772 rules, at about a millisecond per next token, some 584 times less. A generated language does the same sooner. What keeps growing is the learner’s bookkeeping: every substring of every sentence, over a million at full size. On sentences from TinyStories it breaks. The learner takes the context of a substring to be the whole rest of its sentence, and in natural text such contexts almost never recur, so almost nothing merges: 5.4 million categories from 6.6 million substrings at 100,000 sentences, with the rules growing about linearly. Q-LM v2 starts again from contexts of a few words. Its first stages are a known technique, distributional word classes mixed with a 5-gram in the line of Brown et al. (1992). They beat the 5-gram, and with little data a small Llama-shaped transformer, but at 100,000 sentences the transformer is ahead by about 0.3 bits, and building classes on classes added almost nothing beyond an ensemble of independent class models.",
  created: "2026-11-27",
  version: "0.1",
  status: "OPEN",
  publication: "draft",
  authors: ["Chris Hay"],
  lineage: "A GRAMMAR LEARNED FROM SENTENCES → MORE OF THE SAME LANGUAGE → TINYSTORIES → BOUNDED CONTEXTS",
  concepts: ["verification", "grammar-induction", "language-models", "scaling"],
  related: ["N-Q-LM", "N-Q-LM-TRANSPLANT"],
  media: [],
  body: [
    { kind: "observation", label: "01 / MORE OF THE SAME LANGUAGE", text: "The learner of the last note groups substrings that share a context into categories, and fits their rules by inside–outside. QLM-SCALE-001 asks how its cost grows: with the amount of text, or with the amount of new structure the text holds. Only the second could scale. The first measure is the simplest, more sentences of the same structures: nested subsets of Colmerauer’s corpus, from 100 training sentences to 105,138, and of a generated language, the right family, from 100 to 36,000. Each size ran in its own process, with 20 rounds of inside–outside. The plan’s criteria were revised before any measurement: the stored grammar should stop growing, its rules at the largest size within 20% of those at 10,000; the rules each sentence uses should stop growing; and the time to fit it should grow at most linearly with the corpus.", references: [
      { label: "QLM-SCALE-001, docs/results-qlm-scale-001-kind1.md", url: DOC("results-qlm-scale-001-kind1.md") },
      { label: "Its plan, docs/qlm-scale-001-plan.md", url: DOC("qlm-scale-001-plan.md") },
    ] },
    { kind: "observation", label: "02 / LARGEST AT 300 SENTENCES", text: "The grammar is largest with little data. At 300 of Colmerauer’s sentences it has 6,390 categories and 85,969 rules; each development sentence touches 23,948 of them on average; a next-token distribution takes 613 milliseconds, and the run needs 2.2 GB. Then merging takes hold. At 1,000 sentences there are 38,121 rules, at 3,000 there are 3,280, and from 10,000 on there are 192 categories and 1,772 rules, identical at 30,000 and at 105,138. A sentence then touches 454 rules, and a next token takes 0.97 to 1.05 milliseconds: from the peak to the full corpus, about 584 times less. The right family does the same sooner: 15,518 rules at 300 sentences, then 52 categories and 351 rules from 3,000 on, with 103.6 milliseconds per next token falling to 0.33. The smaller grammar is not quite free: development costs 1.046 bits per token at 1,000 Colmerauer sentences and 1.058 from 3,000 on, though the 300-sentence peak itself scores 1.059. The model really does become smaller and faster as it learns more, but only after an expensive phase of too little evidence.", references: [
      { label: "QLM-SCALE-001, kind 1, docs/results-qlm-scale-001-kind1.md", url: DOC("results-qlm-scale-001-kind1.md") },
    ] },
    { kind: "observation", label: "03 / THE BOOKKEEPING STILL GROWS", text: "Against the plan, the three criteria hold for both languages: the stored grammar and the rules each sentence uses stop growing, and estimation time grows no faster than the corpus. What grows is the learner’s own bookkeeping, not the model. Distinct substrings grow roughly linearly, to 1,086,642 at 105,138 sentences, and peak memory with them, to 607 MB, because the learner lists every substring of every sentence with its whole-sentence context. Estimation re-reads every sentence on every round: 22.7 seconds at 10,000 sentences, 67.1 at 30,000, 238.4 at 105,138. A fourth criterion, that adding a tenth more data should cost about a tenth, fails by design: the learner relearns from scratch. The model is fixed in size; the cost of finding and fitting it is not.", references: [
      { label: "QLM-SCALE-001, kind 1, against the plan’s criteria", url: DOC("results-qlm-scale-001-kind1.md") },
    ] },
    { kind: "observation", label: "04 / TINYSTORIES: NOTHING MERGES", text: "The same learner was run on natural text, as a feasibility run and not a modelling result: sentences from the first 20,000 TinyStories training stories, lowercased, with punctuation as tokens, 12 tokens long on average. That is 346,098 training sentences and 10,952 words. Each size had 15 minutes, and grammars of more than 200,000 rules were measured for structure without estimation. Here the grammar never begins to collapse. At every size, categories are 81% to 94% of the distinct substrings: at 100,000 sentences, 5,373,773 categories from 6,607,023 substrings, and 49,056,462 rules. The rules grow about linearly, 9.6 times and then 8.7 times per tenfold; a first draft said faster than linearly, which the measurements did not bear out. At 100 and 300 sentences, the only sizes small enough to estimate, development costs 13.7 bits per token, no better than the floor: a uniform choice among the 10,952 words is 13.4 bits.", references: [
      { label: "QLM-SCALE-001, docs/results-qlm-scale-001-tinystories.md", url: DOC("results-qlm-scale-001-tinystories.md") },
    ] },
    { kind: "observation", label: "05 / WHY: NO CONTEXT RECURS", text: "The learner takes the context of a substring to be the whole rest of its sentence. In the synthetic languages, contexts repeat, and a few thousand sentences were enough for the grammar to collapse to tens of categories. In natural text, whole-sentence contexts almost never recur, so two substrings rarely share one, and nearly every substring becomes a category of its own. The model then grows with the text, from an enormous constant: the opposite of what it did on the synthetic languages. Memory follows the grammar. The next-token computation closes a dense left-corner relation, categories squared, which at 300 sentences and 21,093 categories needs 15.5 GB, and structure alone needs 13.8 GB at 100,000 sentences. The repository’s conclusion is that this needs a different way of finding categories, judged on a few words either side, not a larger run of this one. Short contexts bring the opposite danger: almost anything can follow “the”, so merging on one shared context would merge far too much.", references: [
      { label: "QLM-SCALE-001, TinyStories, “What breaks, and why”", url: DOC("results-qlm-scale-001-tinystories.md") },
      { label: "chrishayuk/q-lm, README, “Direction”", url: REPO },
    ] },
    { kind: "observation", label: "06 / BOUNDED CONTEXTS, A KNOWN TECHNIQUE", text: "Q-LM v2 starts again on TinyStories, with a vocabulary of 8,525: the training words seen twice or more, and one token for the rest. Its stages E1 to E3 give each word a vector of the words up to one, two or four places either side, weight it by PPMI, reduce it to 128 dimensions, and cluster the words into nodes, each word keeping its identity, with memberships in one or more nodes; the best settings use one. A class trigram over the nodes is mixed with a Kneser–Ney word 5-gram. There is no backpropagation, and all stages take about 2.5 seconds at 10,000 sentences. This is a known technique: distributional word classes interpolated with an n-gram, in the line of Brown et al. (1992), and the repository says so. It passes its plan’s bar, at least 0.05 bits per token better than the 5-gram alone at both 10,000 and 100,000 sentences, for every PPMI setting but one. The best mixtures give 4.999 bits per token against the 5-gram’s 5.130 at 10,000 sentences, and 4.058 against 4.134 at 100,000. The best setting was chosen on the scored sentences; only the mixing weight was fitted apart. The gain shrinks with data, from 0.131 to 0.076, as class models’ gains usually do.", references: [
      { label: "Q-LM v2, E1 to E3, docs/results-qlm-v2-e1-e3.md", url: DOC("results-qlm-v2-e1-e3.md") },
      { label: "Its plan, docs/qlm-v2-plan.md", url: DOC("qlm-v2-plan.md") },
    ] },
    { kind: "observation", label: "07 / AHEAD WITH LITTLE DATA, BEHIND WITH MORE", text: "Against a Llama-shaped transformer of 2,141,312 parameters, trained on one seed with no tuning and, by the repository’s account, scored on the same development sentences: at 1,000 training sentences the v2 mixture gives 6.184 bits per token to the transformer’s 6.755, and at 10,000, 4.999 to 5.074. The transformer is behind the 5-gram at both sizes. At 100,000 it is ahead of the mixture, 3.761 against 4.058, by 0.30 bits: it gains 1.31 bits from 10,000 sentences to 100,000, where the mixture gains 0.94. The next stage, E4, fed the learned nodes back in as contexts for further nodes, after fixes asked for once E1 to E3 were done, with a split of the development sentences kept for confirmation. Read, as the repository reads it, against independent class models with the same number of components, it fails its criterion. At 100,000 sentences, four passes built on one another are slightly worse than four independent class models with different seeds, 4.1615 bits against 4.1563 on the confirmation sentences, and the transformer gives 3.844, 0.31 bits ahead. The class trigram and the 5-gram see at most four words back; the transformer sees the whole sentence. A later run, with a transformer limited to the 5-gram’s four words, splits the gap of 0.29 bits into about 0.12 of better generalisation over the same words and 0.17 of longer context.", references: [
      { label: "Q-LM v2, E1 to E3, against the transformer", url: DOC("results-qlm-v2-e1-e3.md") },
      { label: "Q-LM v2, E4, docs/results-qlm-v2-e4.md", url: DOC("results-qlm-v2-e4.md") },
      { label: "The windowed transformer, docs/results-qlm-key-001-b.md", url: DOC("results-qlm-key-001-b.md") },
    ] },
    { kind: "connection", text: "The tables, the commands that make them and the plans they are reported against are in the repository.", links: [
      { href: DOC("results-qlm-scale-001-kind1.md"), label: "QLM-SCALE-001: more of the same language" },
      { href: DOC("results-qlm-scale-001-tinystories.md"), label: "QLM-SCALE-001: TinyStories" },
      { href: DOC("results-qlm-v2-e1-e3.md"), label: "Q-LM v2, E1 to E3: bounded-context classes" },
      { href: DOC("results-qlm-v2-e4.md"), label: "Q-LM v2, E4: abstractions as contexts, no gain" },
      { href: "/notebook/from-q-systems-to-q-lm", label: "The first Q-LM note: the learner, and its corrections" },
      { href: "/notebook/can-you-transplant-a-relationship-inside-a-transformer", label: "The next note: inside the transformers" },
    ] },
    { kind: "refusal", title: "WHAT THIS DOES NOT SHOW", lines: [
      "The shrinking is shown on two synthetic languages, Colmerauer’s and one generated family, with more sentences of the same structures. The plan’s other two kinds of growth, more facts and more structure, are not measured yet.",
      "One run per size. The learner relearns from scratch at every size; nothing here is incremental.",
      "The TinyStories run is a feasibility run. Most of its sizes were too large to estimate. It shows that this learner does not merge natural text, not how well any grammar learner could model it.",
      "v2’s first stages are a known technique, not a new one, and their best setting was chosen on the scored sentences. E4, the first stage meant to add something, failed its criterion. The E1 to E3 numbers come from before the fixes made for E4.",
      "The transformer was trained once, on one seed, with no tuning for TinyStories and the same 6,000 steps at every size: a reference, not a tuned bar. Nothing here is compared with GPT-2 or any large model.",
    ], principle: "A model that shrinks on a language that repeats itself says nothing yet about one that does not; measure both." },
    { kind: "question", text: "What should a learned graph condition on beyond the last few words?", status: "OPEN", detail: "Of the gap of about 0.3 bits to the transformer at 100,000 sentences, a windowed control puts about 0.17 down to context: the class models see four words back, the transformer the whole sentence. The other 0.12 is generalisation over the same few words. Can a graph learner summarise the clause or the sentence so far in nodes of its own, and keep the merging that made it small?" },
  ],
  sources: [
    { title: "chrishayuk/q-lm, docs/results-qlm-scale-001-kind1.md", url: DOC("results-qlm-scale-001-kind1.md"), note: "Kind 1 of QLM-SCALE-001: nested subsets of Colmerauer’s language and the right family, against the plan as revised before measurement." },
    { title: "chrishayuk/q-lm, docs/results-qlm-scale-001-tinystories.md", url: DOC("results-qlm-scale-001-tinystories.md"), note: "The same learner on TinyStories sentences, a feasibility run." },
    { title: "chrishayuk/q-lm, docs/results-qlm-v2-e1-e3.md", url: DOC("results-qlm-v2-e1-e3.md"), note: "Bounded-context word classes mixed with a 5-gram, and the Llama-shaped transformer on the same sentences." },
    { title: "chrishayuk/q-lm, docs/results-qlm-v2-e4.md", url: DOC("results-qlm-v2-e4.md"), note: "Abstractions as contexts, with the seeds and flat controls and a confirmation split." },
    { title: "chrishayuk/q-lm, docs/results-qlm-key-001-b.md", url: DOC("results-qlm-key-001-b.md"), note: "A transformer limited to the 5-gram’s window, which splits v2’s gap to the full transformer." },
    { title: "chrishayuk/q-lm", url: REPO, note: "The learners, v2/classes.py and v2/hier.py, and the commands that reproduce every table." },
  ],
};
