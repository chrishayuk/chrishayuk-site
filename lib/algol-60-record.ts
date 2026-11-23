import type { PublicationRecord } from "./types.ts";

/** A note about rebuilding ALGOL 60 from the Revised Report, and the first
 * implementation of it, the Dijkstra–Zonneveld system for the Electrologica
 * X1, from that system's documents, with a coding agent. Every count is from
 * the linked repository (release v0.1.1): compare/README.md for the probes
 * against the real compiler, historical/README.md and tests/x1.rs for the
 * 1964 printout. Every program named can be run again on /demos/algol-60. */
const REPO = "https://github.com/chrishayuk/algol-60";
const TRACT8 = "https://ir.cwi.nl/pub/13099";
const KA03 = "https://ir.cwi.nl/pub/4155";
const COURSE = "https://ir.cwi.nl/pub/9591";
const COURSE11 = "https://ir.cwi.nl/pub/9606";
const SERGEV = "https://github.com/sergev/x1-algol-compiler";

export const algol60Record: PublicationRecord = {
  id: "N-ALGOL-60",
  slug: "the-first-algol-60-system",
  kind: "notebook",
  title: "The first ALGOL 60 system’s run-time is missing. Its 1964 printout is not.",
  dek: "ALGOL 60 rebuilt from its Report, and its first implementation, Dijkstra and Zonneveld’s for the Electrologica X1, rebuilt from that system’s documents, then checked against what the X1 printed in 1964: 80 of 82 numbers to the last digit.",
  abstract: "A note about building an ALGOL 60 interpreter from the 1962 Revised Report with a coding agent, and then a second mode that runs programs as the first ALGOL 60 system ran them: the one Dijkstra and Zonneveld wrote for the Electrologica X1 in Amsterdam, which went into operation in 1960. The X1’s compiler survives and has been run again; the run-time routines its programs called were printed by the Mathematical Centre, but no copy has been found. So the second mode was built from what the system’s documents say those routines did, and checked two ways: against the real compiler on a simulator, and against output the X1 printed in 1964. Of the 82 numbers of its first run, it reproduces 80. The other two are last digits that sit just above a decimal tie. Both modes run in the browser, side by side.",
  created: "2026-11-23",
  version: "0.1",
  status: "OPEN",
  publication: "draft",
  authors: ["Chris Hay"],
  lineage: "REPORT → MANUALS → AGENT → INTERPRETER → 1964 PRINTOUT",
  concepts: ["ai-agents", "source-authority", "verification", "programming-languages"],
  related: ["N-CPL", "N-BOHM", "N-JOSS"],
  media: [],
  body: [
    { kind: "observation", label: "01 / MAN OR BOY", text: "ALGOL 60 is defined by a report of seventeen pages, the Revised Report of 1962. What makes it hard to implement is not the syntax but call by name: a parameter is not a value but a piece of the caller’s program, worked out again every time it is used. In 1964 Donald Knuth wrote to the Algol Bulletin with a ten-line test that would “separate the man-compilers from the boy-compilers”. He had no man-compiler himself, worked it by hand, and guessed −121, “probably wrong”. The answer compilers found is −67. I asked a coding agent to build an interpreter from the Report alone, with call by name done the way the Report’s copy rule describes it. It gives −67.", references: [
      { label: "Revised Report on the Algorithmic Language ALGOL 60, 1962", url: "https://www.masswerk.at/algol60/report.htm" },
      { label: "Knuth, “Man or boy?”, Algol Bulletin 17, July 1964", url: "https://archive.computerhistory.org/resources/text/algol/algol_bulletin/A17/A17P7.GIF" },
    ] },
    { kind: "observation", label: "02 / THE FIRST IMPLEMENTATION", text: "A report can be implemented many ways. The first implementation of ALGOL 60 was written by Edsger Dijkstra and Jaap Zonneveld at the Mathematical Centre in Amsterdam, for the Electrologica X1, and went into operation in the summer of 1960. Its compiler survives: Kruseman Aretz, who looked after the system in the 1960s, published the full text of a 1964 version in 2003, with an equivalent in Pascal, and Serge Vakulenko has since run that again on a simulator of the X1. The other half of the system is missing. The run-time routines that compiled programs called for arithmetic, for statements, procedure calls and printing were printed by the Mathematical Centre as a series of its own, and Kruseman Aretz typed them in again to rerun the system, but no copy has been found. So I asked the agent for a second mode, --x1, that runs a program the way the X1 did, as far as the system’s own documents say: the system as its 1962 manual describes it, not the first version of 1960." },
    { kind: "observation", label: "03 / THE MANUAL’S RULES WERE NOT THE COMPILER’S CHECKS", text: "The X1’s user manual of 1962 lists 23 “special properties”: rules a program had to keep, such as declaring simple variables before procedures and specifying every parameter. The first version of --x1 refused programs that broke them. Then the real compiler, run on Vakulenko’s simulator, compiled a procedure declared before a variable, and Knuth’s program as printed, with five parameters unspecified, and both ran: −67. Most of the manual’s rules were advice to programmers, not checks the compiler made, though not all: it stops on a label that is a number, as the manual says it will. --x1 now warns about the rules the compiler did not check, and says that what followed on the X1 is not known." },
    { kind: "observation", label: "04 / WHERE THE X1 PARTS FROM THE REPORT", text: "Some of the X1’s properties, and the way it stored numbers, change what a program means. In a for statement with a step, the X1 worked the step out once each time round, and the first time before assigning the starting value; the Report works it out twice each time round, after. Parameters called by value were evaluated in the order of their specifications, not the order written. Only the first nine characters of a name counted. An integer procedure could return 1.5. A real kept a 40-bit mantissa in store, so x := 1/3 followed by x − 1/3 gives about 1.5⏨−13, not 0. One example program, x1-probes, prints a line for each of these, six in all, and every line differs between the two modes." },
    { kind: "observation", label: "05 / A REAL IS NEVER ZERO", text: "An extract of the X1 user manual, printed in an appendix of Kruseman Aretz’s comparison of the X1 and X8 systems, describes the arithmetic of the lost run-time routines. On the X1 a real number is never 0: zero as a real is the least positive number the machine has, and “the relation ‘a = 0’ can never have the value true for variable a of type real”. So 1/0 is not an error. A real too large to store becomes the largest one there is, and an integer result too large for 26 bits quietly becomes a real. --x1 does all of this, each rule with the sentence it comes from." },
    { kind: "observation", label: "06 / AGAINST THE REAL COMPILER", text: "Vakulenko’s simulator runs the real 1964 compiler, but with run-time routines he reconstructed himself, as --x1’s are. So a program run there is evidence about the X1 only where the compiler decides the answer. The agent wrote 39 probe programs, each asking one question, and ran them on both. Of the 14 the compiler decides, such as the order in which f(1) − f(2) × f(3) calls f, all agree, and so do the 7 decided by both halves. Of the 18 the run-time decides, 7 differ. One is a jump the manual leaves undefined. In the other six the X1 manual’s words are on the side of --x1: x1sim’s abs returns a real where the manual says it keeps the type of its argument, and its sqrt refuses a negative number where the manual says it takes the absolute value.", references: [
      { label: "Vakulenko, the X1 ALGOL compiler and simulator", url: SERGEV },
      { label: "The 39 probes, three ways", url: `${REPO}/tree/main/compare` },
    ] },
    { kind: "observation", label: "07 / WHAT THE X1 PRINTED IN 1964", text: "Two reconstructions agreeing is not the X1. What would settle the run-time is the X1’s own output, and some survives. Zonneveld’s thesis of 1964, Automatic Numerical Integration, prints his program for the motion of the five outer planets with what the X1 printed for it, four runs on three pages. --x1 had been checked against a version of that program on the simulator all along: the one in Kruseman Aretz’s report, which types its output where the thesis’s punches it, with the same layout. The first run fills page 103 and has 82 numbers, besides the tolerance and the times. --x1 prints 80 of them digit for digit. The other two differ in the last digit, 6.641455425 against 6.641455426 and 16.281370896 against 16.281370897, and both values lie a hair above a decimal tie, less than one unit of the 40-bit mantissa, where the answer turns on how precisely the X1 converted binary to decimal, which is not known. Making stores truncate instead of round would explain the first, but two other input values the X1 printed back exactly would then come out one lower; so stores round, as the manual says.", references: [
      { label: "Zonneveld, Automatic Numerical Integration, MC Tract 8, 1964, pp. 102–107", url: TRACT8 },
    ] },
    { kind: "observation", label: "08 / WHAT THE PAGE CORRECTED", text: "The page also corrected the reconstruction. --x1 had put the sign of a fixed-point number beside its first digit; the X1 put it in the first column, + 3.429474152. It had printed the X1’s smallest real as .3094⏨−616; Dijkstra’s ALGOL course says such a number is typed as “the integer 0 or ‘inf’”, and page 106 shows the mass of Pluto, set to zero, as a plus sign and a 0. And where the documents are silent, the designer can be. --x1 rounds a real that is exactly halfway between two integers away from zero. Dijkstra’s course says that for an integer x, x := 7/2 “is undefined: x can just as well become 3 as 4”. The X1 promised nothing, so the choice is recorded as --x1’s own.", references: [
      { label: "Dijkstra, Cursus programmeren in ALGOL 60, 2nd edition, 1962", url: COURSE },
    ] },
    { kind: "connection", text: "Both modes run in the browser, compiled from the same Rust source as the command-line version, each program twice, side by side, with the lines that differ marked. For the outer planets a third column holds the X1’s page of 1964.", links: [
      { href: "/demos/algol-60?example=x1-probes", label: "Where the X1 parts from the Report — interactive study" },
      { href: "/demos/algol-60?example=jaz164", label: "The outer planets, against the X1’s printout of 1964" },
      { href: `${REPO}/blob/main/docs/x1.md`, label: "Every X1 rule and the sentence it comes from" },
      { href: `${REPO}/blob/main/docs/decisions.md`, label: "What the documents leave undecided, and what was chosen" },
      { href: REPO, label: "Source, examples and the probes" },
    ] },
    { kind: "refusal", title: "WHAT THIS DOES NOT SHOW", lines: [
      "--x1 is not the X1. The compiler’s decisions were checked against the real compiler; the run-time’s are rebuilt from what documents say, and documents describe, they do not execute.",
      "The 1964 page is one program. It exercises real arithmetic, procedures and printing, not switches, own variables or deep recursion. Agreement on 80 of its numbers says nothing about what it does not use.",
      "The two last digits are explained, not reproduced. The explanation, a conversion of unknown precision, fits both, but another rule might too.",
      "Everything here was read and built by a coding agent over two days, including the transcription of the 1964 page from the scan’s text layer. The page is linked so that it can be checked by eye.",
      "The original run-time routines were printed by the Mathematical Centre, but I have not found them. Gauthier van den Hove’s 2019 thesis has a chapter on how the X1 executed ALGOL 60 programs; it is held back until 2027, and was not read. It may answer what this cannot.",
      "Nothing here is claimed as new. Kruseman Aretz recovered and described the compiler, and Vakulenko made it run again; this project builds on both.",
    ], principle: "A reconstruction checked only against another reconstruction has been checked for consistency. A page the machine printed is a different kind of witness." },
    { kind: "question", text: "How much of a lost run-time can be rebuilt from what its documents say, and how would you know?", status: "OPEN", detail: "For the X1 the answer so far is: enough to reproduce 80 of 82 printed numbers, with the other two at the limit of what the documents fix. Two more of Zonneveld’s programs, with their X1 output, are in a 1963 report of the Mathematical Centre, and are the next test. The run-time’s own text, if it surfaces, would be the last." },
  ],
  sources: [
    { title: "P. Naur (ed.), “Revised Report on the Algorithmic Language ALGOL 60”, 1962", url: "https://www.masswerk.at/algol60/report.htm" },
    { title: "D. E. Knuth, “Man or boy?”, Algol Bulletin 17.2.4, July 1964, p. 7", url: "https://archive.computerhistory.org/resources/text/algol/algol_bulletin/A17/A17P7.GIF" },
    { title: "F. E. J. Kruseman Aretz, “The Dijkstra–Zonneveld ALGOL 60 compiler for the Electrologica X1”, CWI report SEN-N0301, 2003", url: KA03, note: "The full text of a 1964 version of the compiler, with a Pascal equivalent, the 23 special properties of the 1962 user manual (section 1.3) and the outer-planets program (appendix B)." },
    { title: "F. E. J. Kruseman Aretz, “A comparison between the ALGOL 60 implementations on the Electrologica X1 and the Electrologica X8”", url: "https://ir.cwi.nl/pub/13677", note: "Its appendix B.1 is an extract of the X1 user manual describing the arithmetic of the run-time routines: real zero, overflow, integer intermediates." },
    { title: "E. W. Dijkstra, “Cursus programmeren in ALGOL 60”, 2nd edition, Mathematisch Centrum, February 1962", url: COURSE, note: "x := 7/2 is undefined for an integer x." },
    { title: "E. W. Dijkstra, “Cursus programmeren in ALGOL 60”, 11th edition, Mathematisch Centrum, undated", url: COURSE11, note: "Pp. 17–18, shown in the note: the same passage on 7/2. Pp. 68–69 of the scan: numbers beyond the range of variables typed as 0 or ‘inf’." },
    { title: "J. A. Zonneveld, “Automatic Numerical Integration”, Mathematical Centre Tracts 8, 1964", url: TRACT8, note: "Pp. 102–107: the outer-planets program, JAZ164, and what the X1 printed for it. The first run (eps = 10⁻³) is on p. 103, two more tolerances on p. 104, and the run with the mass of Pluto set to zero on p. 106." },
    { title: "S. Vakulenko, x1-algol-compiler", url: SERGEV, note: "The 1964 compiler in C, with a simulator of the X1 and a reconstructed run-time." },
    { title: "chrishayuk/algol-60, release v0.1.1", url: REPO, note: "The interpreter, --x1 with a source for every rule, the 39 probes run three ways, the 1964 output as a test, and the playground." },
    { title: "Coding-agent sessions, 22–23 November 2026", note: "The interpreter, --x1, the probes and the transcription of the 1964 output were made in these sessions. Every result in this note can be rerun on the interactive study or with cargo test in the repository." },
  ],
};
