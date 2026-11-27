import type { PublicationRecord } from "./types.ts";

/** The first Q-LM note: learners given only the sentences of Colmerauer's
 * French, from the reconstructed Q-systems machine. Every number is from the
 * results documents of the linked repository, read as they now stand, with
 * the corrections they record. Nothing in Q-LM is historical; the
 * reconstructed machine makes the corpus and judges the samples. */
const REPO = "https://github.com/chrishayuk/q-lm";
const DOC = (name: string) => `${REPO}/blob/main/docs/${name}`;
const QSYS = "https://github.com/chrishayuk/q-systems";

export const qLmRecord: PublicationRecord = {
  id: "N-Q-LM",
  slug: "from-q-systems-to-q-lm",
  kind: "notebook",
  title: "From Q-systems to Q-LM.",
  dek: "A learner given only the sentences of Colmerauer’s French finds a category that holds a name and a clause, and derives sentences deeper than any it saw. How far it led a transformer at depth depended on when its training stopped and which transformer it met.",
  abstract: "The third Q-systems note asked whether the rules could be learned from the sentences. Q-LM, a modern experiment that leaves the reconstructed machine unchanged, uses it to make a corpus of 131,424 sentences, every sentence of every tree with at most one level of embedding, and to judge what learners produce. A learner given only 105,138 training sentences and the vocabulary groups substrings that share a context into categories. From 1,000 sentences one category holds both a name and an embedded clause, and every one of 300 deeper sentences of known words can be derived. From 10,000 sentences on, the grammar is the same 192 categories and 1,772 rules. Its first write-up, QLM-003, put it far ahead of a transformer at depth. Two corrections followed, and a test. Its five rounds of inside–outside were early stopping: run to convergence, it gives deeper sentences 2.37 bits per token at full size, not 1.59, though its structure still derives all of them. The transformer it beat was one custom model: a Llama-shaped model of about the same size comes within 0.02 to 0.6 bits of the grammar at full size, and is about 1% better on the corpus. The test showed that the custom model’s failure was not sentence length, and an ablation finds that rotary positions alone carry the difference between the two transformers. On three generated languages, the grammar still leads Llama at depth by 0.2 to 1.5 bits.",
  created: "2026-11-27",
  version: "0.1",
  status: "OPEN",
  publication: "draft",
  authors: ["Chris Hay"],
  lineage: "THE RECONSTRUCTED MACHINE’S CORPUS → A GRAMMAR LEARNED BY SUBSTITUTION → THE CORRECTIONS → WHICH TRANSFORMER, AND WHY",
  concepts: ["verification", "programming-languages", "grammar-induction", "language-models"],
  related: ["N-Q-SYSTEMS-NEXT-TOKEN", "N-Q-LM-SCALE", "N-Q-LM-TRANSPLANT"],
  media: [],
  body: [
    { kind: "observation", label: "01 / ONLY THE SENTENCES", text: "The third Q-systems note ended on a question: can the rules be learned from the sentences? Q-LM is the attempt. It uses the reconstructed machine for three things and changes nothing in it. The corpus is every sentence of every tree with at most one level of embedding, synthesised by the report’s rules: 131,424 sentences. In a fixed shuffle, 105,138 are for training, 13,143 for development and 13,143 for confirmation, which has not been read. The deeper test is 300 sentences of trees with two levels of embedding, and 300 more that use only words of the training sentences, so that depth is tested apart from unseen words. The judge is the report’s system inverted: a sentence is grammatical if it analyses to exactly one tree. The learners see the training sentences and the vocabulary, and nothing else: no rules and no trees. Nothing in Q-LM is historical.", references: [
      { label: "chrishayuk/q-lm, README", url: REPO },
      { label: "QLM-002, docs/results.md", url: DOC("results.md") },
    ] },
    { kind: "observation", label: "02 / A CATEGORY THAT HOLDS A CLAUSE", text: "The learner groups every substring of every sentence with every other substring that ever occurs in the same context, the words before it and after it: the substitutability of Clark and Eyraud (2007). Each group is a category, each split of a member a binary rule, and the probabilities are fitted by inside–outside. From 1,000 sentences, one learned category holds both BENOIT and LE FAIT QUE BEAUCEVILLE EST CONSTATE PAR BEAUCEVILLE: a name and an embedded clause, interchangeable as arguments. With it, all 300 deeper sentences made of known words can be derived, and 299 of 300 development sentences with two words swapped are rejected. From 10,000 sentences on, the learned grammar is the same, 192 categories and 1,772 rules, against 38,121 rules at 1,000. Next-token probabilities come from it exactly, by the prefix probabilities of Jelinek and Lafferty (1991), equal to those of listing a small finite language to 1e-12. The rules are recursive in behaviour; they are not shown to be Colmerauer’s. After five rounds, about 6% of its samples were ungrammatical, and its categories hold over-merges.", references: [
      { label: "QLM-003, docs/results.md; src/subst.rs, src/prefix.rs", url: DOC("results.md") },
    ] },
    { kind: "observation", label: "03 / FIVE ROUNDS WAS EARLY STOPPING", text: "The QLM-003 write-up scored the grammar after five rounds of inside–outside, and put it far ahead of the transformer at depth: 1.59 bits per token on deeper sentences, and 34 to 44 deeper samples in 300. Nothing had chosen five rounds. Run on, inside–outside converges in about 12 to 20 rounds, and each round makes the corpus likelier and the deeper sentences less likely. On the first 100 deeper sentences of corpus words, they are best after two rounds, 1.39 bits, and after 40 cost 1.81 bits at 1,000 training sentences, 2.19 at 10,000 and 2.37 at 105,138; deeper samples fall to between 1 and 12 in 300. The structure keeps depth while the probabilities give it up: at every size and every round, the grammar still derives all 300 deeper sentences. The recursive rules lose probability because no training sentence uses them twice, which is what maximum likelihood should do. Choosing the rounds by the deeper scores would be fitting to the test, and development sentences, of one level of embedding, improve all the way to convergence, so convergence is the setting kept. The custom transformer, seed 1, gives the same 100 sentences 2.97, 3.69 and 4.75 bits. Both get worse at depth with more data.", references: [
      { label: "Inside–outside to convergence, docs/results-qlm004.md", url: DOC("results-qlm004.md") },
      { label: "The correction, docs/results.md", url: DOC("results.md") },
    ] },
    { kind: "observation", label: "04 / THE TRANSFORMER, NOT TRANSFORMERS", text: "Every comparison so far was with one transformer, a custom model with learned absolute positions, a GELU feed-forward and a separate output layer: 4 layers, width 128, 832,023 parameters. A Llama-shaped model of about the same size, with rotary positions, RMSNorm, a gated feed-forward and tied embeddings, was trained identically, with three seeds. It changed the headline. On the first 100 deeper sentences at full size it gives 2.45, 2.97 and 2.39 bits against the converged grammar’s 2.37, and it is about 1% better on the corpus. The grammar still leads at depth at every size, by 0.36 to 0.56 bits at 1,000 sentences, but at full size by only 0.02 to 0.6, depending on the seed. The large depth advantage reported until then was over the custom transformer, not over transformers, and “superior recursive prediction” was withdrawn as a general claim. What still separates them is that the grammar derives every deeper sentence by a mechanism that can be read, and does better at depth from little data.", references: [
      { label: "docs/results-architectures.md", url: DOC("results-architectures.md") },
    ] },
    { kind: "observation", label: "05 / NOT A LENGTH EFFECT", text: "The custom transformer learns one embedding per position, and deeper sentences are longer: up to 27 words, where no training sentence has more than 20, and 175 of the 300 deeper sentences of corpus words are longer than every training sentence. Positions past the training lengths never get any gradient, so its failure could have been about length rather than depth. It is not. At full size, on the 125 deeper sentences of 20 words or fewer, the custom transformer, seed 1, gives 4.97 bits per token, against 4.57 on the longer ones; the converged grammar gives 2.72 and 2.14, and Llama 2.61 to 3.23 and 2.20 to 2.76. The shorter deeper sentences cost more per token for every model.", references: [
      { label: "docs/results-architectures.md, “Not a length effect”", url: DOC("results-architectures.md") },
    ] },
    { kind: "observation", label: "06 / ROTARY POSITIONS CARRY IT", text: "Llama differs from the custom model in four things at once. QLM-ARCH-001 made each change alone to a reimplementation of the custom model, with three seeds an arm. Its plan, written before any ablation run, says a change carries depth if, at full size, its mean on deeper sentences beats the base arm’s by more than both arms’ seed ranges combined. Only rotary positions pass: they take the deeper sentences from 4.58 bits to 2.45, a gap of 2.13 against a combined range of 1.36. At 1,000 sentences they take them from 2.94 to 2.13. RMSNorm and the gated feed-forward are slightly worse than base. Tied embeddings do not pass at full size, make depth much worse at 1,000 sentences, 4.70, and cost corpus fit at both. With rotary positions, depth gets worse with more data much less: 2.13 to 2.45, against base’s 2.94 to 4.58. The repository’s reading is that relative positions let an embedded clause look the same wherever it starts, which is what recursion asks for; it labels that an interpretation, since the experiment shows only that rotary positions alone carry the difference. These arms were scored on all 300 deeper sentences of corpus words and the grammar on the first 100, so the two are not yet compared on the same sentences.", references: [
      { label: "QLM-ARCH-001, docs/results-qlm-arch-001.md", url: DOC("results-qlm-arch-001.md") },
      { label: "Its plan, docs/qlm-arch-001-plan.md", url: DOC("qlm-arch-001-plan.md") },
    ] },
    { kind: "observation", label: "07 / THREE OTHER LANGUAGES", text: "Colmerauer’s is one small language. QLM-005 generated three more from seeded random grammars, named by where an embedded clause sits: after its marker (right), between two markers (centre), or before its marker (left). Each is one seed; every argument is a bare noun, and no sentence has two trees, so they are simpler than his in those ways. There Llama does not close the gap. At full size the grammar gives deeper sentences 3.25, 2.91 and 2.27 bits per token; Llama 3.45 to 3.58, 3.77 to 4.43 and 3.53 to 3.77; the custom transformer 4.60 to 4.76, 4.73 to 5.12 and 3.77 to 3.85. Llama has rotary positions, so on these languages rotary positions do not close the gap, though the rotary-only arm has not yet been run on them. The Llama arm was a change to the plan, added after the right family’s results were seen. Depth and length are not yet separated on the families, whose deeper sentences are longer, relative to training, than Colmerauer’s. And on the left family the grammar learner overgenerates: it is 10% behind on development, failing that criterion.", references: [
      { label: "QLM-005, docs/results-qlm005.md", url: DOC("results-qlm005.md") },
      { label: "Its plan, docs/qlm005-plan.md", url: DOC("qlm005-plan.md") },
    ] },
    { kind: "connection", text: "Every number is in the repository’s results documents, with the commands that reproduce them. The next two notes follow the same learner to natural text, and look inside the transformers.", links: [
      { href: DOC("results.md"), label: "QLM-002 and QLM-003: the learned grammar, with its correction" },
      { href: DOC("results-qlm004.md"), label: "Inside–outside to convergence, QLM-004 pruning and QLM-PERF-001 cost" },
      { href: DOC("results-architectures.md"), label: "The Llama arm and the length test" },
      { href: DOC("results-qlm-arch-001.md"), label: "QLM-ARCH-001: rotary positions" },
      { href: DOC("results-qlm005.md"), label: "QLM-005: three generated languages" },
      { href: "/notebook/can-a-language-from-1969-predict-the-next-token", label: "The third Q-systems note, which asked the question" },
      { href: "/notebook/the-language-model-that-gets-smaller-as-it-learns", label: "The next note: the learner’s cost, and TinyStories" },
      { href: "/notebook/can-you-transplant-a-relationship-inside-a-transformer", label: "The note after: inside the transformers" },
    ] },
    { kind: "refusal", title: "WHAT THIS DOES NOT SHOW", lines: [
      "Nothing in Q-LM is historical. The reconstructed machine of the earlier notes makes the corpus and judges the samples; the learners, the transformers and every measure are modern.",
      "Every number is a development number. The confirmation sentences, set aside before the experiments, have not been read.",
      "The learned grammar is recursive in behaviour, not shown to be Colmerauer’s. It overgenerates, and on the left family it overgenerates enough to fail.",
      "Other corrections the repository records: minimum description length, as coded, chose a grammar that had lost the recursion on Colmerauer’s language, though not on two of the three generated ones; and pruned, the grammar is level with the transformer in cost per next token, 0.28 ms against 0.26, so the claim that it was the faster machine was withdrawn. Both were unoptimised code.",
      "Four small synthetic languages. The three generated ones are on one seed each, with no modifiers and no sentence of two trees, simpler than Colmerauer’s. The transformers had no tuning. Nothing here is a claim about natural language or about large models.",
      "Categories by substitution are Clark and Eyraud’s, next-token probabilities from a grammar Jelinek and Lafferty’s. What is tried here is setting them against transformers on a language whose grammar is known exactly.",
    ], principle: "Before calling a result an advantage, check when the training stopped and which opponent it beat." },
    { kind: "question", text: "Can a learner keep a capability its data rarely shows?", status: "OPEN", detail: "Inside–outside lowers the probability of the recursive rules because no training sentence uses them twice, while the structure keeps them. A prior that does not punish recursion would have to be justified from the training sentences, not from the deeper test." },
  ],
  sources: [
    { title: "chrishayuk/q-lm", url: REPO, note: "The corpus, the learners (src/subst.rs, src/prefix.rs), the transformers (transformer/train.py), and the commands that reproduce every table." },
    { title: "chrishayuk/q-lm, docs/results.md, QLM-002 and QLM-003", url: DOC("results.md"), note: "The learned grammar and its exact next-token prediction, with the correction for early stopping. The first run is kept as docs/results-run1.md." },
    { title: "chrishayuk/q-lm, docs/results-qlm004.md", url: DOC("results-qlm004.md"), note: "Inside–outside run to convergence, pruning by expected rule count, and inference cost against the transformer." },
    { title: "chrishayuk/q-lm, docs/results-architectures.md", url: DOC("results-architectures.md"), note: "The Llama arm, and the test that rules out sentence length." },
    { title: "chrishayuk/q-lm, docs/results-qlm-arch-001.md", url: DOC("results-qlm-arch-001.md"), note: "Which of Llama’s four changes carries depth." },
    { title: "chrishayuk/q-lm, docs/results-qlm005.md", url: DOC("results-qlm005.md"), note: "Three generated languages, against the plan written before they were generated." },
    { title: "chrishayuk/q-systems", url: QSYS, note: "The reconstruction of Colmerauer’s Q-systems, whose machine makes the corpus and judges grammar." },
  ],
};
