import type { PublicationRecord } from "./types.ts";

const MANUAL = { label: "First BASIC instruction manual, Dartmouth, May 1964", url: "https://www.dartmouth.edu/basicfifty/basicmanual_1964.pdf" };

/** A note about BASIC, with the language running in the page. Every quoted
 * sentence is copied from the scanned manual; the counts in the checking
 * section are the coding agent's own, from the session of 21–22 November
 * 2026; and the four programs from the manual can be run where they are
 * shown. The interpreter, its tests and the scans are in the linked
 * repository. */
export const basicRecord: PublicationRecord = {
  id: "N-BASIC",
  slug: "the-games-all-ran-the-manual-stopped-at-line-40",
  kind: "notebook",
  title: "The games all ran. The manual stopped at line 40.",
  dek: "BASIC’s first instruction manual, a book of 1978 games, and an interpreter that had to choose between them.",
  abstract: "A note about BASIC, with the language running in the page. The first instruction manual, from Dartmouth in May 1964, explains the language in a few pages and prints three example programs with their results; they are typed in here beside the pages they came from. An interpreter written in Rust with a coding agent runs 103 games from a 1978 book unchanged and agrees with an independent emulation of a later BASIC. The manual’s own second example stopped at line 40: in 1964 a square root was taken of the absolute value, and every later BASIC calls that an error.",
  created: "2026-11-22",
  version: "0.1",
  status: "OPEN",
  publication: "draft",
  authors: ["Chris Hay"],
  lineage: "PYTHON PARSER → AGENT PORT → 1978 GAMES → 1964 MANUAL",
  concepts: ["ai-agents", "source-authority", "verification", "programming-languages"],
  related: ["N-MOUSE", "N-ATTRIBUTION"],
  media: [],
  body: [
    { kind: "observation", label: "01 / MAY 1964", text: "BASIC’s first instruction manual is a typescript from the Dartmouth College Computation Center, dated May 1964 and marked First Draft. Its preface says the college was building a system that “will enable 20 or more people to use the computer at the same time”, and lists what the language for it had to do. The first requirement: “It should be very easy to learn.” Then, as evidence, and “without any explanation”, it prints a whole program. Three lines, to work out seven plus eight, divided by three.", references: [MANUAL] },
    { kind: "connection", demonstration: "basic", text: "That program, with the line numbers the manual gives it on page 4. It is running in your browser, not replayed. Change the sum and run it again.", links: [
      { href: "/demos/basic?example=preface", label: "Open the full study — every program, and the pages" },
    ] },
    { kind: "observation", label: "02 / FOURTEEN WORDS", text: "A BASIC program is a list of numbered instructions. The computer starts at the lowest number and works upwards, so the numbers are the order, whatever order the lines were typed in. The manual suggests leaving gaps, such as counting in tens, “so that further instructions may be inserted if the need arises.” Each instruction is one operation and what it applies to, and there are not many: “The last instruction in any BASIC program is ‘END’. There are only 13 other operations.” LET puts a value in a variable. PRINT shows it. FOR and NEXT repeat the lines between them. IF … THEN and GO TO decide which line comes next. READ takes numbers from DATA lines, and DEF gives a formula a name. A variable is “any single letter, or a letter followed by one digit.”", references: [MANUAL] },
    { kind: "observation", label: "03 / THE PAGE PRINTS ITS OWN ANSWERS", text: "The manual ends with three example programs and, under each, what it printed and how long it took. Program number 1 averages the logarithms of the numbers 1 to 100 and prints 1.5797, in three seconds. I typed all three in from the scan. They are a test nobody had to write, because the expected output is on the page." },
    { kind: "connection", demonstration: "basic", text: "Program number 1, from page 21. The 1964 page prints 1.5797. This prints the same figure to more places: the manual says a number “may contain up to 9 digits (the limit of accuracy of the computer)”, and the system printed six of them.", links: [
      { href: "/demos/basic?example=example1", label: "Open the full study" },
    ] },
    { kind: "observation", label: "04 / 1978", text: "Fourteen years later BASIC was on home computers and the programs had changed. The beginners’ part of the manual has no way to ask the person at the teletype a question; numbers come from DATA lines. The programs in David Ahl’s BASIC Computer Games do little else. I took 103 listings from the public-domain collection of that book’s programs. Every one loads and runs here unchanged, up to Super Star Trek, which is 425 lines.", references: [
      { label: "The listings: coding-horror/basic-computer-games", url: "https://github.com/coding-horror/basic-computer-games" },
    ] },
    { kind: "connection", demonstration: "basic", text: "Hammurabi, from the 1978 book: rule a city for ten years. It asks, you type, and it is the same interpreter as the three-line program above.", links: [
      { href: "/demos/basic?example=hammurabi", label: "Open the full study — Lunar Lander and Super Star Trek are there too" },
    ] },
    { kind: "observation", label: "05 / HOW IT RUNS HERE", text: "The interpreter is written in Rust and compiled to WebAssembly, and nothing you type is sent anywhere. I had started it in Python: a tokenizer and a parser, which never ran a program. I asked a coding agent to move it to Rust and finish it. A browser cannot stop a program halfway to wait for a line of typing, so the page does not try. Each answer runs the program again from its first line, with everything typed so far and the same random numbers. It looks like waiting." },
    { kind: "observation", label: "06 / THREE CHECKS", text: "How would I know it was right? Three checks, in the order they happened. The agent wrote tests, and they passed. Then it ran the 1978 games, which nobody involved had written. Of 105 files, 100 loaded first time; two were not vintage BASIC; the other three stopped on the habits of old listings, such as FOR I=Q1-1TOQ1+1 with no spaces, and comments that begin REMARKABLE PROGRAM and REMEMBER. Then it ran test programs through PC-BASIC, an independent emulation of Microsoft’s GW-BASIC. Twenty-two of them print the same in both, byte for byte, and the comparison found one real mistake: an empty item in a DATA line stopped the program, where it should read as zero.", references: [
      { label: "PC-BASIC", url: "https://robhagemans.github.io/pcbasic/" },
    ] },
    { kind: "observation", label: "07 / LINE 40", text: "Then I asked for pages of the 1964 manual, for this note, and the example programs came with them. Programs 1 and 3 print what the page prints. Program 2 solves quadratic equations, and on its third set of numbers it stopped: Illegal function call: SQR, in line 40. Line 40 takes a square root before the program has looked at whether the number is negative. Page 5 says why that was fine in 1964: “SQR(A) stands for √A, where the square-root is always taken of the absolute value of A.” The games and the second interpreter all come from later BASICs, where the square root of a negative number is an error. They agreed with each other, and my interpreter agreed with them. The oldest page disagreed with all of it.", references: [MANUAL] },
    { kind: "connection", demonstration: "basic", text: "Program number 2, as later BASICs run it. Press RUN: it stops at line 40. Switch on 1964 ARITHMETIC and run it again, and the last result reads IMAGINARY PART= 1.41421356. The page prints 1.41421.", links: [
      { href: "/demos/basic?example=example2&arithmetic=later", label: "Open the full study" },
      { href: "https://github.com/chrishayuk/chuk-basic-rs", label: "Source, tutorial and the scanned pages" },
    ] },
    { kind: "refusal", title: "WHAT THIS DOES NOT SHOW", lines: [
      "This is not Dartmouth’s 1964 BASIC. It is an interpreter written sixty-two years later, from the manual and from programs written for later BASICs.",
      "I read the manual as the commemorative reprint that Dartmouth hosts, which is the part for beginners. I have not seen Part II.",
      "Three examples agreeing is three examples. The 1964 rule for square roots turned up because one program happened to need it. Other differences may be waiting for a program that needs them.",
      "The checks were run by the coding agent and reported to me. It also miscounted its own tests twice, saying 120 and then 122 when there were 88, and corrected itself when it ran them again.",
      "The games were played by a program typing at random, and a few by hand. Nobody has played all 103 to the end.",
    ], principle: "Sources that agree with each other are evidence about those sources." },
    { kind: "question", text: "Which BASIC is the reference for BASIC?", status: "OPEN", detail: "The interpreter now has a switch: later arithmetic unless asked, 1964 arithmetic on request. That is a decision, not a discovery. A 1978 program called Diamond settled a different argument the other way, drawing its diamonds only if TAB counts columns from zero, which the later GW-BASIC does not. Each program was right about the BASIC it was written for." },
  ],
  sources: [
    { title: "Dartmouth College Computation Center, “BASIC”, instruction manual, May 1964, first draft. Commemorative reprint hosted by Dartmouth College", url: "https://www.dartmouth.edu/basicfifty/basicmanual_1964.pdf", note: "The preface is on p. 1; “only 13 other operations” on p. 4; numbers, variables and SQR on p. 5; the example programs and their results on pp. 21–23." },
    { title: "David H. Ahl (ed.), BASIC Computer Games, 1978. Listings from coding-horror/basic-computer-games", url: "https://github.com/coding-horror/basic-computer-games", note: "103 programs, run unmodified." },
    { title: "PC-BASIC 2.0.8, an emulation of Microsoft GW-BASIC", url: "https://robhagemans.github.io/pcbasic/" },
    { title: "chrishayuk/chuk-basic-rs", url: "https://github.com/chrishayuk/chuk-basic-rs", note: "The interpreter, a compiler to WebAssembly, their tests, 150 sample programs, and reduced scans of the manual." },
    { title: "Coding-agent session, 21–22 November 2026", note: "The counts in section 06 are the agent’s, as reported. The four programs from the manual were run again for this note, and can be run above." },
  ],
};
