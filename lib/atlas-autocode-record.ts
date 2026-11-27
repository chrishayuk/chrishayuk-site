import type { PublicationRecord } from "./types.ts";

/** A note about rebuilding Atlas Autocode, the language of the Ferranti
 * Atlas at Manchester, from its 1965 Reference Manual,
 * and checking it against the two pages of output that survive with their
 * programs. Every count is from the linked repository: tests/transcripts.rs
 * for the printouts, sources/ERRATA.md for what disagrees. Every program
 * named can be run again on /demos/atlas-autocode. */
const REPO = "https://github.com/chrishayuk/atlas-autocode";
const MANUAL = "https://gtoal.com/history.dcs.ed.ac.uk/archive/docs/Atlas_Autocode_1965.pdf";
const MINI = "http://www.ancientgeek.org.uk/EMAS/Miscellaneous/Atlas_Autocode_Mini_Manual.pdf";
const BIBLE = "https://gtoal.com/history.dcs.ed.ac.uk/archive/atlas/atlasbible.pdf";
const KDF9 = "https://gtoal.com/history.dcs.ed.ac.uk/archive/languages/atlas-autocode/";

export const atlasAutocodeRecord: PublicationRecord = {
  id: "N-ATLAS-AUTOCODE",
  slug: "the-manuals-program-does-not-compile",
  kind: "notebook",
  title: "The program in the Atlas Autocode manual does not compile. Its printout shows what ran.",
  dek: "Atlas Autocode rebuilt from its 1965 manual, with both compilers and the Flexowriter it was typed on, prints the words of all 29 lines of the one full page COMPILER AB printed that survives with its program. The program printed beside it would have stopped at line 12.",
  abstract: "A note about rebuilding Atlas Autocode, the language of the Ferranti Atlas at Manchester, from Brooker and Rohl’s Reference Manual of 1965: both of its compilers, AA and AB, the Atlas arithmetic, and the Friden Flexowriter on which its programs were typed, underlined word by word with the backspace key. The compilers are lost. Two pages that COMPILER AB printed survive with the programs that produced them: a program map and run-time monitor in the manual’s Amendments, and a table of binomial coefficients in the Mini-Manual of July 1965. The rebuilt compiler prints the same words as all 29 lines of the first, and the second’s table number for number. It also shows that the program printed beside the first page would not have compiled: it declares a′ and assigns a″. The printout lists a″ where a′ is declared, so the program that ran was most likely not quite the program that was printed. The second page’s map counts a line its listing does not have, and the first program in the manual prints a sum of squares of −125.3.",
  created: "2026-11-25",
  version: "0.1",
  status: "OPEN",
  publication: "draft",
  authors: ["Chris Hay"],
  lineage: "REFERENCE MANUAL → FLEXOWRITER → COMPILERS AA AND AB → 1965 PRINTOUTS",
  concepts: ["source-authority", "verification", "programming-languages"],
  related: ["N-ALGOL-60", "N-CPL", "N-JOSS", "N-GEORGE"],
  media: [],
  body: [
    { kind: "observation", label: "01 / TYPED ON A FLEXOWRITER", text: "Atlas Autocode was the language of the Ferranti Atlas, which Manchester University and Ferranti put into service in 1962. Tony Brooker’s group wrote it, and Brooker and J. S. Rohl’s Reference Manual of March 1965 defines it. It is close kin to ALGOL 60, with blocks, recursive routines and arrays sized when the block is entered, but it was written for the keyboard it was typed on: a Friden Flexowriter, an electric typewriter that punched paper tape. The keyboard had no underlined letters and no ≠. The words of the language were underlined by typing the word, backspacing, and typing underlines over it; ≠ was = with / struck over it, and even the semicolon was a colon struck over a comma. Atlas rebuilt each line as the paper showed it, and spaces did not count at all. Here the language is built from the manual, with the Flexowriter as its input: a line is a row of positions, each holding the symbols struck there.", references: [
      { label: "Brooker and Rohl, Atlas Autocode Reference Manual, 1965 (scan)", url: MANUAL },
    ] },
    { kind: "observation", label: "02 / TWO COMPILERS, AND ATLAS ARITHMETIC", text: "In 1965 there were two compilers. COMPILER AA is the language of the Reference Manual. COMPILER AB, described in Amendments bound into the same manual and in Lunnon and Riding’s Mini-Manual of July 1965, dropped complex numbers, own variables and some checks, and rounded a real put into an integer where AA refused it when compiling. The job description at the head of the tape chose between them, and does here. The arithmetic is Atlas’s, from Ferranti’s description of the machine: a 40-bit fraction and an octal exponent, each result formed exactly and then rounded “by forcing a one into the least significant bit” if anything was lost. So .1 added ten times is not 1. The store is a model of the Atlas stack, word by word, and as the manual warns, nothing is cleared between one routine and the next.", references: [
      { label: "Lunnon and Riding, The Atlas Autocode Mini-Manual, July 1965", url: MINI },
      { label: "The Atlas Bible, §3.1 and §8.7", url: BIBLE },
    ] },
    { kind: "observation", label: "03 / WHAT COMPILER AB PRINTED", text: "The compilers do not survive, so there is nothing to run the rebuilt one against. What survives is output. The Amendments end with a short program, a routine that calls a routine that calls a function that takes the square root of −2, and the page COMPILER AB printed for it: a program map, then the run-time monitor, which lists every block and routine that was running, with its variables and its cycles. The rebuilt compiler prints the same words in the same order, all 29 lines, apart from the machine addresses and code sizes in the map, which belong to machine code it does not write. The page was typed again for the manual, so its spacing is not compared. The serial numbers, 91 to 94, follow the order of the routine specifications, not of the routines. The line numbers count from 1 and leave blank lines out, so line 33 is the square root. The monitor shows only the variables declared in each routine that are not zero, not the parameters, and says the function’s first cycle has gone round 0 times and its second was never entered." },
    { kind: "observation", label: "04 / ONE PRIME", text: "Run as printed, the program on the facing page does not reach the square root. Its second line declares a′, with one prime, and its twelfth sets a″, with two. To the compiler they are different names, so it stops at line 12 with NAME a″ NOT SET, and the program is never entered. The printout points to which was meant: the monitor lists a″ = 21.6 sixth among the reals of the main block, exactly where a′ is declared. The likely reading is that the program COMPILER AB ran declared a″, and the listing, typed out again for the manual, dropped a prime. The tape is lost, so that cannot be proved; the printout could have been edited instead. Neither page could have caught it alone: the listing looks right, and the printout has no listing. The interpreter caught it only because it was given both." },
    { kind: "observation", label: "05 / A LINE THE LISTING DOES NOT HAVE", text: "The Mini-Manual’s sample program tabulates binomial coefficients, and its next page shows what COMPILER AB printed. The table comes out character for character. The program map agrees as far as line 9, where an inner block begins; after that every line number on the page is one more than the listing gives, 27 where the listing has 26, through to the end of the program. The listing was redrawn for the Mini-Manual with boxes round its blocks, and may have lost a line on the way; or the map may have been edited. The pages do not say which." },
    { kind: "observation", label: "06 / THE FIRST PROGRAM IN THE MANUAL", text: "The Reference Manual opens with a program that fits a straight line to sets of points and prints, it says, “the sum of the squares of the deviations”. Its formula has + 2abΣX; its program has − 2a*b*Sx. For five points near y = 2x + 1 the program prints −1.253α 2, a sum of squares of −125.3; with the sign put right it is 0.107. The manual printed no output for this program, so nothing on the page shows the mistake. Both scans that could be read have the minus sign. The manual also says that the constant 'a' is 33, which its own table gives to A." },
    { kind: "connection", text: "The compiler runs in the browser, compiled from the same Rust source as the command-line version. Type a program on the Flexowriter, see the tape it punches, and run it as COMPILER AA or AB. For the two programs of 1965, the page that was printed then is beside the one printed now.", links: [
      { href: "/demos/atlas-autocode?example=1965-ab-monitor", label: "The monitor of 1965, run again — interactive study" },
      { href: "/demos/atlas-autocode?example=1965-binomial", label: "The binomial coefficients, against the Mini-Manual’s page" },
      { href: `${REPO}/blob/main/sources/ERRATA.md`, label: "Every disagreement found, and where" },
      { href: `${REPO}/blob/main/docs/decisions.md`, label: "What the documents leave undecided, and what was chosen" },
      { href: `${REPO}/tree/main/tutorial`, label: "A tutorial in fifteen chapters, every program tested" },
      { href: REPO, label: "Source, examples, language server and editor extension" },
    ] },
    { kind: "refusal", title: "WHAT THIS DOES NOT SHOW", lines: [
      "Two pages are the whole of the evidence about what the compilers printed, and both are COMPILER AB. No output of COMPILER AA survives with its program; its map and monitor follow the manual’s description and examples, which are illustrations, not runs.",
      "The layout of the AB monitor, which variables it shows and how many to a line, was read off the same page it is tested against. Agreement there is not independent. What is independent is what comes from running the program: the line and serial numbers, the values, the counts of each cycle.",
      "The arithmetic follows Ferranti’s description of the machine. The pages show four or five digits of each number, which does not test the last bits. The standard functions are computed in modern double precision, because the Atlas routines for them have not been found.",
      "Both pages were retyped for the documents they are printed in, so they are compared word for word, not character for character, and they may have been changed in retyping, as the listings were.",
      "Everything here, including the transcriptions of the programs from the scans, was read and built over one day. The scans are linked so that they can be checked by eye.",
      "A second model, OpenAI’s Codex, reviewed the repository independently before this note was published. It found eighteen problems, among them a tab stop misread from the Mini-Manual, large constants turned into wrong numbers, and claims of agreement “to the character” where the test compares words. All are fixed or reworded, and each is now a test; the review is in the repository.",
      "Nothing here is claimed as new. The manuals were kept and put online by the Edinburgh computer history project and others; the language’s history is well told elsewhere.",
    ], principle: "A listing typed for a manual is a copy. Where the listing and the machine’s own page disagree, the page is the better witness to what ran." },
    { kind: "question", text: "What else did Atlas print that survives with its program?", status: "OPEN", detail: "Two pages are enough to find a dropped prime and a missing line, and not enough to test the arithmetic or COMPILER AA. Listings and output of real Atlas jobs, in archives at Manchester, Chilton or Edinburgh, would be the next test." },
  ],
  sources: [
    { title: "R. A. Brooker and J. S. Rohl, “Atlas Autocode Reference Manual”, Manchester University, 1 March 1965", url: MANUAL, note: "The language of COMPILER AA. Bound in at the end: “Amendments for COMPILER AB”, pp. B1.1–B1.4, with the program and printout of pp. B1.3–B1.4." },
    { title: "W. F. Lunnon and G. Riding, “The Atlas Autocode Mini-Manual”, Manchester University, July 1965", url: MINI, note: "COMPILER AB in nine pages. Pp. 7–8: the binomial coefficients program and its printout." },
    { title: "Ferranti, the “Atlas Bible”, sections dated 1963", url: BIBLE, note: "§3.1 for the floating-point orders and their rounding; §8.7.4 for the Flexowriter’s seven-track code, key by key." },
    { title: "The Edinburgh KDF9 compiler for Atlas Autocode, Version 4G, 1965", url: KDF9, note: "Written in Atlas Autocode. The wording of two messages the Atlas documents do not give." },
    { title: "chrishayuk/atlas-autocode, release v0.1.0", url: REPO, note: "The interpreter, both compilers, the 1965 printouts as tests, the errata, the independent review, a tutorial, a language server and editor extension, and the playground." },
    { title: "The independent review of the repository, by OpenAI Codex CLI, 25 November 2026", url: `${REPO}/blob/main/docs/independent-review.md`, note: "Eighteen findings and what was done about each." },
    { title: "Reconstruction, 24–25 November 2026", note: "The interpreter, the transcriptions and the comparisons. Every result in this note can be rerun on the interactive study or with cargo test in the repository." },
  ],
};
