import type { PublicationRecord } from "./types.ts";

/** The third Q-systems note: the graphs the reconstructed machine makes,
 * read as a language model, and the report's grammar read as an open one.
 * Every count is from QSYS-E16 and E17 in the linked repository,
 * docs/research.md, asserted by tests/research.rs. The prediction layer
 * (src/lm.rs, src/open.rs) is a modern experiment, not Colmerauer's; the
 * graphs it reads are made by the historical machine, src/machine.rs,
 * which it does not change. */
const REPO = "https://github.com/chrishayuk/q-systems";
const RESEARCH = `${REPO}/blob/main/docs/research.md`;
const C70 = "http://alain.colmerauer.free.fr/alcol/ArchivesPublications/SystemesQ/SystemesQ.pdf";

export const qSystemsNextTokenRecord: PublicationRecord = {
  id: "N-Q-SYSTEMS-NEXT-TOKEN",
  slug: "can-a-language-from-1969-predict-the-next-token",
  kind: "notebook",
  title: "Can a language from 1969 predict the next token?",
  dek: "A graph made by Colmerauer’s Q-systems, rebuilt from his report of 1970, read as a language model. It predicts the next word over 9,565,938 sentences without listing one, exactly where checked, but only for sentences it was built to hold.",
  abstract: "A third note on the Q-systems, Alain Colmerauer’s rule language of 1969, reconstructed with a coding agent from his report of 1970. The graphs the reconstructed machine makes hold every sentence they allow. Read as a language model, which is a modern experiment and not anything Colmerauer did, a graph gives the probability of each next word as the share of its complete paths that continue the prefix with that word. Counted by dynamic programming, without listing any sentence, the counts equal those of listing at all 13,510 prefixes of a graph of 1,458 sentences, and the 9,565,938 paraphrases of one sentence of the report’s grammar decode from 2,760 arrows. Against a trigram model trained on all 131,424 sentences of the grammar with at most one level of embedding, the graph of those sentences samples only grammatical French, where the trigram’s samples are grammatical 91 times in 300. But the graph is closed: it gives zero to every sentence with deeper embedding, and the trigram gives a probability to 16 of 300 and invents 29 grammatical sentences it never saw. Read instead as a grammar, by hand, and checked against the machine on 8,414 trees, then given a probability for each choice with the tree drawn only as the prefix needs it, the report’s sixteen rules predict with no tree given and no bound on depth: every sample grammatical, every deeper sentence given a probability. Merging equal partial derivations saved nothing there: no two of them ever left the same work.",
  created: "2026-11-26",
  version: "0.1",
  status: "OPEN",
  publication: "draft",
  authors: ["Chris Hay"],
  lineage: "THE RECONSTRUCTED MACHINE → ITS GRAPHS READ AS A LANGUAGE MODEL → A TRIGRAM BASELINE → THE RULES READ AS AN OPEN GRAMMAR",
  concepts: ["ai-agents", "verification", "programming-languages"],
  related: ["N-Q-SYSTEMS", "N-Q-SYSTEMS-POSSIBILITIES"],
  media: [],
  body: [
    { kind: "observation", label: "01 / A GRAPH OF EVERY SENTENCE", text: "Colmerauer’s Q-systems hold a set of strings as a graph: every path from its entry to its exit carries one string, and strings that share words share arrows. The first two notes rebuilt the machine from his report of 1970 and measured it. Its French grammar, run as written, writes every paraphrase of a sentence into one graph: a sentence with fourteen embedded clauses has 9,565,938 paraphrases, held in 2,760 arrows. A language model gives the probability of each next word after a prefix. A graph that holds every sentence of a set can do that exactly: the probability of a word is the share of the complete paths that spell the prefix and go on with that word. This note asks how far that goes. It is a modern experiment. Colmerauer used the graphs to analyse and to synthesise, and the TAUM project later to translate, not to predict, and nothing here changes the machine that makes them; the counting reads what it leaves.", references: [
      { label: "QSYS-E16, docs/research.md; src/lm.rs, not historical", url: RESEARCH },
      { label: "Colmerauer 1970, pp. 35–42: the grammar and its graph", url: C70 },
    ] },
    { kind: "observation", label: "02 / COUNTING WITHOUT LISTING", text: "Two counts are enough. For each vertex, the number of paths from it to the exit, which the graph gives in one pass from the exit backwards. And for a prefix, the vertices it can reach, with how many paths reach each, which the prefix gives one word at a time. The probability of the next word is then a sum over the arrows leaving those vertices. No sentence is listed. On the 1,458 paraphrases of a sentence with two levels of embedding, the counts were compared with those got by listing every sentence, at every one of their 13,510 prefixes, and they are equal. On the graph of 9,565,938 paraphrases, every sentence is one of the paraphrases, so the distribution is uniform and its entropy is log₂ 9,565,938, 23.19 bits. Choosing the likeliest word each time gives one of them, 88 words long. In the run that explored it, a whole sentence took about 30 microseconds; that was not measured as a benchmark. Twenty sampled sentences, put back through the report’s system inverted, each gave back the tree they came from.", references: [
      { label: "QSYS-E16, docs/research.md", url: RESEARCH },
    ] },
    { kind: "observation", label: "03 / PATHS OR SENTENCES", text: "A graph can carry one sentence on two paths, so there are two ways to count: by paths, or by distinct sentences. The second needs the graph made deterministic, its paths that spell the same prefix merged into one state, which can be done only as far as a question needs. In the large French graph the two agree: counted either way it holds 9,565,938, so no paraphrase is spelled twice. Where two paths do spell one string they part. Two rules that turn both A and B into X, run on four choices of A, B or C, leave 81 paths but only 16 strings. Counted by paths, the first word is X 54 times and C 27; counted by strings, 8 and 8. The second note found the same thing in the machine: it counts derivations, not results.", references: [
      { label: "QSYS-E16 and E11, docs/research.md", url: RESEARCH },
    ] },
    { kind: "observation", label: "04 / AGAINST A TRIGRAM", text: "The whole language with at most one level of embedding, 8,112 trees, a clause allowed in either argument but none inside another, was put through the grammar as one graph: 131,424 sentences, 2,021,088 words, in 536,641 arrows. A trigram model, the probability of each word given the two before it, was trained on all 131,424. Both were tested on 300 sentences of trees with two levels of embedding, and on 300 sentences sampled from each. The judge of grammar was the report’s own system inverted: a sentence counts as French if it analyses to exactly one tree. Every sample from the graph is grammatical; 91 of the trigram’s 300 are. Of the 300 deeper sentences, the graph gives every one a probability of zero, and the trigram gives 16 a probability above zero. And 29 of the trigram’s grammatical samples are sentences it never saw; each analyses to a tree with two or more levels of embedding. The two fail in opposite ways. The graph is exact and closed: it is a model of the sentences of the trees it was built from, the paraphrases of a given meaning, and nothing else. The trigram generalises and overgenerates.", references: [
      { label: "QSYS-E16, docs/research.md", url: RESEARCH },
    ] },
    { kind: "observation", label: "05 / THE GRAMMAR IS NOT CLOSED", text: "The graph is finite; the grammar is not. The report calls the language of its last section “un ensemble restreint mais cependant infini”, and its analysis recognised every deeper sentence tried here. So the sixteen rules were read as a grammar: the clause, active or passive, and a preposition before an argument, giving the name with its prefix, the clause after LE FAIT QUE, QUE, PAR LE FAIT QUE or DE CE QUE, or the clause turned into a noun. That reading was made by hand, and checked against the machine: for each of 8,414 trees, all 8,112 with at most one level of embedding, 300 random trees with clauses on both sides at depth two and two chains of depth five, it gives exactly the strings of the machine’s graph, each as often as the graph has paths for it. Then a probability for each choice. An argument the prefix has not yet reached is left unknown; when it is needed it becomes a name, or, one time in four, a clause whose own arguments are unknown. Each choice between two rewritings is an even chance. To predict, the model keeps every partial derivation that agrees with the prefix, expanded only until its next word is known: the graph built as the prefix asks for it, and no further.", references: [
      { label: "QSYS-E17, docs/research.md; src/open.rs, not historical", url: RESEARCH },
      { label: "Colmerauer 1970, p. 35", url: C70 },
    ] },
    { kind: "observation", label: "06 / OPEN AND EXACT", text: "Bounded at one level of embedding, the model’s 131,424 sentences have probabilities that sum to one, and its predictions equal those of listing every derivation at all 3,287 prefixes of 200 of them. With no bound, every one of the 300 deeper sentences gets a probability above zero, and so do 20 sampled from the 9,565,938 paraphrases. Of 300 sentences it samples, all 300 analyse back to one tree, and 53 have two or more levels of embedding, deeper than anything in the graph of the language. Reading the 88-word paraphrase, it holds at most 2,160 partial derivations at once. Merging those that leave the same work to do, as the second note merged equal arrows, changes nothing: the count is 2,160 with or without, and the probability is the same. No two derivations of a prefix ever left the same work: no ambiguity was found at one level of embedding or in the largest graph, though that does not prove the grammar has none. Merging saves only where there is something equal to merge, and here there was nothing.", references: [
      { label: "QSYS-E17, docs/research.md", url: RESEARCH },
    ] },
    { kind: "connection", text: "The graphs are made by the historical machine, which can be run here; the counting and the open model are in the repository, with the tests that assert every number.", links: [
      { href: "/demos/q-systems?example=paraphrase", label: "The paraphrase treatment: the graph of eighteen sentences — interactive study" },
      { href: "/notebook/a-q-system-can-hold-a-trillion-strings-but-never-sees-two-become-one", label: "The second note: what the machine costs and loses" },
      { href: "/notebook/a-q-system-rule-never-replaced-anything", label: "The first note: the reconstruction, checked against the report" },
      { href: RESEARCH, label: "QSYS-E16 and E17, with their numbers" },
      { href: `${REPO}/blob/main/src/open.rs`, label: "The open model, not historical" },
    ] },
    { kind: "refusal", title: "WHAT THIS DOES NOT SHOW", lines: [
      "Colmerauer did not use the Q-systems to predict anything. The prediction layer is ours; the graphs it reads are the reconstructed machine’s, made as his report describes.",
      "The open model is a hand-made reading of the sixteen rules, checked against the machine on 8,414 fully known trees, not on every tree; the drawing of unknown arguments used for prediction was checked against listing every derivation at one level of embedding, not against the machine. Its probabilities, a clause one time in four and an even chance at each choice, are a choice made here, not learned from anything.",
      "Nothing here is learned. The trigram is the only model that learns from sentences, and it is a weak baseline; no smoothed n-gram, probabilistic grammar learned from data, or neural network was compared.",
      "The domain is the report’s: three verbs, four names, one construction. Grammaticality is judged by the report’s own analysis, so the test cannot find French the grammar does not cover.",
      "Next-token prediction from a grammar is old: probabilistic grammars and their prefix probabilities are well studied, and no literature search was made. Nothing here is claimed as new except that it was done with a machine from 1969. Everything was built and measured by one coding agent and checked by no person.",
    ], principle: "A model that is exact and a model that generalises fail in opposite ways; to say which a system is, test it on what it was not built from." },
    { kind: "question", text: "Can the rules be learned from the sentences?", status: "OPEN", detail: "The open model works because the grammar was read off the report. Given only sentences, could a learner recover rules of the same shape, a clause, a marker and its argument, a choice between rewritings, and would a neural network trained on the same sentences come to hold anything like them?" },
  ],
  sources: [
    { title: "A. Colmerauer, Les systèmes-Q ou un formalisme pour analyser et synthétiser des phrases sur ordinateur, publication interne no 43, Département d’informatique, Université de Montréal, September 1970", url: C70, note: "The grammar of section 11, pp. 35–37, whose synthesis makes the graphs and whose analysis judges grammar. Read from the page scans for the first note." },
    { title: "chrishayuk/q-systems, docs/research.md, QSYS-E16 and E17", url: RESEARCH, note: "Every count in this note, with the test in tests/research.rs that asserts it." },
    { title: "chrishayuk/q-systems", url: REPO, note: "The historical machine, src/machine.rs; the counting, src/lm.rs, and the open model, src/open.rs, neither historical." },
    { title: "Coding-agent session, 26 November 2026", note: "The experiments were designed, run and written up with a coding agent. Every result can be rerun with cargo test --release --test research in the repository." },
  ],
};
