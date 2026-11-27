import type { PublicationRecord } from "./types.ts";

/** A note about running the compiler in Corrado Böhm's 1951 dissertation.
 * Every quoted sentence is copied from its source: the 1954
 * printing, Knuth and Trabb Pardo's 1976 report, and Sestoft's 2016
 * translation. Every result named here can be reproduced on /demos/bohm or from the linked repository. */
export const bohmRecord: PublicationRecord = {
  id: "N-BOHM",
  slug: "a-compiler-from-1951-ran-it-needed-four-corrections",
  kind: "notebook",
  title: "A compiler from 1951 ran. It needed four corrections.",
  dek: "A language, a machine and a compiler that existed on paper, and three ways of being wrong that had to agree.",
  abstract: "A note about running the compiler in Corrado Böhm’s 1951 dissertation, which is written in the language it compiles, for a machine that was only ever a design. The machine was built, the compiler typed in from the 1954 printing, and two independent readings written to check it against. As printed, the compiler does not work. With three corrections, one of them reported by Knuth and Trabb Pardo in 1976, and a fourth change that is needed only because of how this reconstruction compiles the compiler’s own formulas, it compiles itself. The language, the machine and the compiler run in the browser.",
  created: "2026-11-22",
  version: "0.1",
  status: "OPEN",
  publication: "draft",
  authors: ["Chris Hay"],
  lineage: "THESIS → SCAN → MACHINE",
  concepts: ["source-authority", "verification", "programming-languages"],
  related: ["N-MOUSE", "N-AUTHORITY", "N-LANING-ZIERLER"],
  media: [],
  body: [
    { kind: "observation", label: "01 / A COMPILER ON PAPER", text: "In 1951 Corrado Böhm submitted a doctoral dissertation at ETH Zürich. It describes a computer, a language for it in which every statement is an assignment, and a compiler written in that language. Knuth and Trabb Pardo call it “the first compiler in its own language”. The computer was a design, and the compiler stayed on the page. Here the machine is built and the compiler run on it.", references: [
      { label: "Böhm, Calculatrices digitales, 1954 printing", url: "https://www.research-collection.ethz.ch/handle/20.500.11850/132662" },
    ] },
    { kind: "observation", label: "02 / THREE READINGS", text: "A compiler typed in and a machine built in the same session prove nothing by themselves: if they are wrong in the same way, they agree. So there are three readings of every program. One works out each formula as written, as algebra, with no machine. One is a second compiler, written from the prose of the thesis and not from Böhm’s code. The third is Böhm’s compiler, as instruction numbers on the simulated machine. They have to agree number for number." },
    { kind: "observation", label: "03 / AS PRINTED", text: "They did not. For the simplest program there is, the compiler as printed writes four numbers and none of them is an instruction. The group that encodes a plain copy adds up the two addresses and leaves out the operation code. An earlier section of the thesis encodes the same formula with the code in it." },
    { kind: "observation", label: "04 / TWO BRANCHES AT ONCE", text: "There is no “if” in this language. A program chooses by multiplying each destination by 0 or 1 and adding, so exactly one multiplier may be 1. In group C of the compiler two of them are 1 for every symbol that is not a parenthesis, and the compiler continues at the sum of two groups. This one was not foreseen. It showed up in a trace of the first run." },
    { kind: "observation", label: "05 / KNUTH’S PAGE", text: "The third was already known. In 1976 Knuth and Trabb Pardo wrote: “It appears to be necessary to add one more statement in order to fix a bug in his program, caused by overlaying information when a left parenthesis follows an operator symbol”. They did not print the fix, so the one here is ours. They did work one formula through by hand, and with the fix in, the compiler’s six instructions for that formula match their page line for line. That page is the only check in this note from outside the reconstruction.", references: [
      { label: "Knuth and Trabb Pardo, 1976, pp. 39–41", url: "http://bitsavers.org/pdf/stanford/cs_techReports/STAN-CS-76-562_EarlyDevelPgmgLang_Aug76.pdf" },
    ] },
    { kind: "observation", label: "06 / THE FOURTH NEEDS A MACHINE", text: "With three corrections the compiler works when its own formulas are read as algebra. On the machine it stops after one number. Böhm’s method computes every product in a variable called X, and the compiler keeps its place among the parentheses in a variable it also calls X. Once the compiler has itself been turned into instructions, its own code overwrites its own bookmark. The thesis names the two letters its method uses. It does not say a program must avoid them. This fourth change is of a different kind from the other three: an independent review later found that writing the compiler’s formulas fully bracketed, which the thesis also allows, avoids the clash without renaming anything." },
    { kind: "observation", label: "07 / IT COMPILES ITSELF", text: "With its X renamed, the compiler gets through its own text. Read as algebra over its own source it writes 401 instruction numbers. Those numbers, run on the machine over the same source, write the compiler again, and that copy does the same. The third copy is identical to the first, and all of them are identical to what the second compiler writes." },
    { kind: "connection", text: "The language, the machine and the compiler run in the browser. You can write a program, see the instructions Böhm’s compiler makes of it, run the compiler as printed, and have it compile itself.", links: [
      { href: "/demos/bohm", label: "Write a program — interactive study" },
      { href: "/demos/bohm?example=knuth-tpk&mode=verify", label: "Knuth and Trabb Pardo’s own program, three ways" },
      { href: "https://github.com/chrishayuk/bohm", label: "Source, tutorial and the scanned pages" },
      { href: "https://raspi.itu.dk/~sestoft/boehmthesis/", label: "The thesis in English, translated by Peter Sestoft" },
    ] },
    { kind: "refusal", title: "WHAT THIS DOES NOT SHOW", lines: [
      "This may not be the first time the compiler has run. Peter Sestoft’s 2016 translation says he implemented it in Java. I could not find that code and do not know which corrections it needed.",
      "Of the three slips, one was reported in 1976. I have not found the other two written down, but I read two sources, not the literature. The fourth change, renaming X, depends on how this reconstruction compiles the compiler’s formulas.",
      "All three readings were written in one session. They are three routes, not three authors. A second model, OpenAI’s Codex, later reviewed the repository independently and found that the algebra and the machine read input in different orders inside brackets; they now agree. Its review, and what was done about each point, is in the repository.",
      "The compiler was typed in from a scan. For the two formulas that were not known to be wrong, the French printing and the English translation agree. Two arrows the printing leaves out of group J′ are supplied, the loader’s printed constant 94999010000 is read as Sestoft’s 9490010000, and a repeated label in Böhm’s second Euclid program is corrected; each is now listed as a slip in the repository.",
      "The corrections are a reading of what Böhm meant. He is not here to ask.",
    ], principle: "Agreement between things one author wrote is evidence of consistency. The page somebody else worked by hand is evidence of correctness." },
    { kind: "question", text: "If a program has only ever existed on paper, how would you know it was right?", status: "OPEN", detail: "Producing a compiler was the cheap part. The work was arranging three ways to be wrong and making them agree, and even then the one outside check was a single hand-worked formula from 1976. Knuth and Trabb Pardo’s own test program in Böhm’s language is correct as algebra and prints nothing on the machine, because it uses the letters S and X." },
  ],
  sources: [
    { title: "Corrado Böhm, “Calculatrices digitales. Du déchiffrage de formules logico-mathématiques par la machine même dans la conception du programme”, dissertation, ETH Zürich, 1951; printed Bologna, 1954", url: "https://www.research-collection.ethz.ch/handle/20.500.11850/132662", note: "Euclid’s algorithm is on p. 25. The compiler is chapter 7, pp. 39–43: group C on p. 40, group E′ on p. 43." },
    { title: "The same, translated into English by Peter Sestoft, 2016", url: "https://raspi.itu.dk/~sestoft/boehmthesis/", note: "Appendix B: “We have made a simple implementation in Java of Böhm’s machine, and his compiler and loader”. The translation omits group W of chapter 7." },
    { title: "Donald E. Knuth and Luis Trabb Pardo, “The Early Development of Programming Languages”, Stanford report STAN-CS-76-562, August 1976, pp. 35–42", url: "http://bitsavers.org/pdf/stanford/cs_techReports/STAN-CS-76-562_EarlyDevelPgmgLang_Aug76.pdf", note: "The bug is reported on p. 40, the hand-worked formula is on p. 41, and their TPK program in Böhm’s language is on pp. 36–39." },
    { title: "chrishayuk/bohm", url: "https://github.com/chrishayuk/bohm", note: "The machine, loader and compiler, their tests, 42 example programs, a tutorial, and reduced scans of the pages the corrections rest on." },
    { title: "Reconstruction, 22 November 2026", note: "The machine, the loader, both compilers’ harness and the transcription of chapter 7. Every result in this note can be rerun on the interactive study." },
  ],
};
