import type { PublicationRecord } from "./types.ts";

const MANUAL = { label: "First BASIC instruction manual, Dartmouth, May 1964", url: "https://www.dartmouth.edu/basicfifty/basicmanual_1964.pdf" };

/** A note about Dartmouth BASIC as its first instruction manual describes it,
 * with the manual's programs running in the page. Every quoted sentence is
 * copied from the scanned manual; the counts in section 06 are the coding
 * agent's own, from the session of 21–22 November 2026; and the programs can
 * be run where they are shown. The interpreter, its tests and the scans are
 * in the linked repository. */
export const basicRecord: PublicationRecord = {
  id: "N-BASIC",
  slug: "the-manual-stopped-at-line-40",
  kind: "notebook",
  title: "The manual stopped at line 40.",
  dek: "Dartmouth BASIC, typed in from its first instruction manual of May 1964, and the one program a later BASIC would not run.",
  abstract: "A note about Dartmouth BASIC, with the language running in the page. The first instruction manual, from May 1964, explains the language in a few pages and prints three example programs with their results; they are typed in here beside the pages they came from, and print the same figures. The interpreter running them was written in Rust with a coding agent and checked against later BASICs, which it matched. The manual’s own second example then stopped at line 40: in 1964 a square root was taken of the absolute value, and every later BASIC calls that an error.",
  created: "2026-11-22",
  version: "0.1",
  status: "OPEN",
  publication: "draft",
  authors: ["Chris Hay"],
  lineage: "1964 MANUAL → LATER BASICS → AGENT PORT → 1964 MANUAL",
  concepts: ["ai-agents", "source-authority", "verification", "programming-languages"],
  related: ["N-MOUSE", "N-ATTRIBUTION"],
  media: [],
  body: [
    { kind: "observation", label: "01 / MAY 1964", text: "BASIC’s first instruction manual is a typescript from the Dartmouth College Computation Center, dated May 1964 and marked First Draft. Its preface says the college was building a system that “will enable 20 or more people to use the computer at the same time”, and lists what the language for it had to do. The first requirement: “It should be very easy to learn.” Then, as evidence, and “without any explanation”, it prints a whole program. Three lines, to work out seven plus eight, divided by three.", references: [MANUAL] },
    { kind: "connection", demonstration: "basic", text: "That program, with the line numbers the manual gives it on page 4. It is running in your browser, not replayed. Change the sum and run it again.", links: [
      { href: "/demos/basic?example=preface", label: "Open the full study — every program, and the pages" },
    ] },
    { kind: "observation", label: "02 / FOURTEEN WORDS", text: "A Dartmouth BASIC program is a list of numbered instructions. The computer starts at the lowest number and works upwards, so the numbers are the order, whatever order the lines were typed in. The manual suggests leaving gaps, such as counting in tens, “so that further instructions may be inserted if the need arises.” Each instruction is one operation and what it applies to, and there are not many: “The last instruction in any BASIC program is ‘END’. There are only 13 other operations.” LET puts a value in a variable. PRINT shows it. FOR and NEXT repeat the lines between them. IF … THEN and GO TO decide which line comes next. READ takes numbers from DATA lines, and DEF gives a formula a name. A variable is “any single letter, or a letter followed by one digit.”", references: [MANUAL] },
    { kind: "observation", label: "03 / THE PAGE PRINTS ITS OWN ANSWERS", text: "The manual ends with three example programs and, under each, what it printed and how long it took. Program number 1 averages the logarithms of the numbers 1 to 100 and prints 1.5797, in three seconds. I typed all three in from the scan. They are a test nobody had to write, because the expected output is on the page." },
    { kind: "connection", demonstration: "basic", text: "Program number 1, from page 21. The 1964 page prints 1.5797, and so does this. Switch off AS IN 1964 and a later BASIC prints the same number to nine figures.", links: [
      { href: "/demos/basic?example=example1", label: "Open the full study" },
    ] },
    { kind: "observation", label: "04 / WHAT IS NOT THERE", text: "What the beginners’ part leaves out says as much as what it has. There is no way to ask the person at the teletype a question: a program’s numbers come from its DATA lines, and to try other numbers you change the program. There are no variables for words, only for numbers. Powers are written with an arrow, X↑2, because “on a teletype it is impossible to print superscripts.” The manual treats changing the program as the normal way to use it. Under program number 3 it says, “We can find the root of a different function by changing a single instruction”, prints the new line 30, and prints the new result.", references: [MANUAL] },
    { kind: "connection", demonstration: "basic", text: "Program number 3, from page 23. Run it, then do what the manual does: replace line 30 with 30 DEF FNF(Z) = EXP(X) -2 and run it again. The page prints .837585, then .693176. The new line is typed here as it is printed, with an X where the first one had a Z. It still works, because the program only ever asks for FNF(X).", links: [
      { href: "/demos/basic?example=example3", label: "Open the full study" },
    ] },
    { kind: "observation", label: "05 / HOW IT RUNS HERE", text: "This is not Dartmouth’s compiler. It is an interpreter written in Rust and compiled to WebAssembly, and nothing you type is sent anywhere. I had started it in Python: a tokenizer and a parser, which never ran a program. I asked a coding agent to move it to Rust and finish it. Neither of us began from the 1964 manual." },
    { kind: "observation", label: "06 / CHECKED AGAINST LATER BASICS", text: "How would I know it was right? The agent wrote tests, and they passed. Then it ran 103 games from David Ahl’s BASIC Computer Games of 1978, which nobody involved had written, and every one loads and runs unchanged. Then it ran test programs through PC-BASIC, an independent emulation of Microsoft’s GW-BASIC. Twenty-two of them print the same in both, byte for byte, and the comparison found one real mistake. Everything agreed. All of it was BASIC from fourteen years or more after the manual.", references: [
      { label: "The 1978 listings: coding-horror/basic-computer-games", url: "https://github.com/coding-horror/basic-computer-games" },
      { label: "PC-BASIC", url: "https://robhagemans.github.io/pcbasic/" },
    ] },
    { kind: "observation", label: "07 / LINE 40", text: "Then I asked for pages of the 1964 manual, for this note, and the example programs came with them. Programs 1 and 3 gave the page’s figures. Program 2 solves quadratic equations, and on its third set of numbers it stopped: Illegal function call: SQR, in line 40. Line 40 takes a square root before the program has looked at whether the number is negative. Page 5 says why that was fine in 1964: “SQR(A) stands for √A, where the square-root is always taken of the absolute value of A.” The games and the second interpreter all come from later BASICs, where the square root of a negative number is an error. They agreed with each other, and my interpreter agreed with them. The oldest page disagreed with all of it.", references: [MANUAL] },
    { kind: "connection", demonstration: "basic", text: "Program number 2, as later BASICs run it. Press RUN: it stops at line 40. Switch on AS IN 1964 and run it again, and the last result reads IMAGINARY PART= 1.41421, as the page does. It then stops with Out of DATA, which is how the program is written: it goes back for more numbers until there are none.", links: [
      { href: "/demos/basic?example=example2&arithmetic=later", label: "Open the full study" },
      { href: "https://github.com/chrishayuk/chuk-basic-rs", label: "Source, tutorial and the scanned pages" },
    ] },
    { kind: "refusal", title: "WHAT THIS DOES NOT SHOW", lines: [
      "This is not Dartmouth’s 1964 BASIC. It is an interpreter written sixty-two years later, taught three things from the manual: the square root, powers, and how numbers are printed.",
      "How numbers are printed in 1964 mode, six figures and a point after a whole number, is copied from the results on pages 21 to 23. The beginners’ part does not state the rule, and I have not seen Part II.",
      "In 1964 mode it still accepts everything the later BASICs added. It does not refuse INPUT or a variable called NAME$.",
      "Three examples agreeing is three examples. The rule for square roots turned up because one program happened to need it. Other differences may be waiting for a program that needs them.",
      "The checks were run by the coding agent and reported to me. It also miscounted its own tests twice, saying 120 and then 122 when there were 88, and corrected itself when it ran them again.",
    ], principle: "Sources that agree with each other are evidence about those sources." },
    { kind: "question", text: "Which BASIC is the reference for BASIC?", status: "OPEN", detail: "The interpreter now has a switch: later BASIC unless asked, Dartmouth’s 1964 arithmetic and printing on request. That is a decision, not a discovery. Every check I had was a later BASIC agreeing with a later BASIC, and the manual was on Dartmouth’s website the whole time." },
  ],
  sources: [
    { title: "Dartmouth College Computation Center, “BASIC”, instruction manual, May 1964, first draft. Commemorative reprint hosted by Dartmouth College", url: "https://www.dartmouth.edu/basicfifty/basicmanual_1964.pdf", note: "The preface is on p. 1; “only 13 other operations” on p. 4; numbers, variables, the arrow and SQR on p. 5; the example programs and their results on pp. 21–23." },
    { title: "chrishayuk/chuk-basic-rs", url: "https://github.com/chrishayuk/chuk-basic-rs", note: "The interpreter, a compiler to WebAssembly, their tests, a tutorial, 150 sample programs including the manual’s, and reduced scans of the manual." },
    { title: "David H. Ahl (ed.), BASIC Computer Games, 1978. Listings from coding-horror/basic-computer-games", url: "https://github.com/coding-horror/basic-computer-games", note: "103 programs, run unmodified, as a check on the interpreter." },
    { title: "PC-BASIC 2.0.8, an emulation of Microsoft GW-BASIC", url: "https://robhagemans.github.io/pcbasic/", note: "Run on the manual’s program 2 for this note: it stops with “Illegal function call in 40”." },
    { title: "Coding-agent session, 21–22 November 2026", note: "The counts in section 06 are the agent’s, as reported. The programs from the manual were run again for this note, and can be run above." },
  ],
};
