import type { PublicationRecord } from "./types.ts";

/** A note about rebuilding JOSS, RAND's conversational computing system of
 * 1963-65, from its scanned papers with a coding agent, and replaying the
 * console sessions those papers print. Every quoted sentence is copied from
 * its source. Every count can be reproduced with `joss --verify` in the linked
 * repository, or with REPLAY IT on /demos/joss. */
export const jossRecord: PublicationRecord = {
  id: "N-JOSS",
  slug: "762-lines-matched-five-did-not",
  kind: "notebook",
  title: "762 lines matched. Five did not.",
  dek: "Five conversations with a computer, typed at RAND in 1964 and 1965, replayed on a reconstruction built from the papers by a coding agent.",
  abstract: "A note about rebuilding JOSS, the conversational computing system J. C. Shaw wrote for RAND’s JOHNNIAC, from its scanned papers with a coding agent. The papers print five console sessions, mistakes included. Typed in again, line by line, the reconstruction answers as the page does on 762 of the 767 lines JOSS typed, 686 of them column for column. The five that differ are each one unit in the ninth digit of a logarithm or an exponential. The words JOSS used were not in the papers: they were decoded from a listing of the program. And the JOSS of 1964 turned out not to be the JOSS of 1965. The console runs in the browser.",
  created: "2026-11-22",
  version: "0.1",
  status: "OPEN",
  publication: "draft",
  authors: ["Chris Hay"],
  lineage: "TYPEWRITER → SCAN → AGENT → INTERPRETER → TYPEWRITER",
  concepts: ["ai-agents", "source-authority", "verification", "programming-languages"],
  related: ["N-CPL", "N-BASIC", "N-MOUSE"],
  media: [],
  body: [
    { kind: "observation", label: "01 / A COMPUTING AIDE", text: "JOSS ran on the JOHNNIAC at RAND from 1963. You sat at an electric typewriter with a two-colour ribbon and typed a line in green; JOSS did what it said, or kept it as a step of a program, and answered in black. J. C. Shaw, who wrote it, wanted the user to “interact with JOSS as with a computing aide”. I asked a coding agent to rebuild the JOSS of 1964 and 1965 from RAND’s scanned papers, and to hold it to one test: type the sessions printed in those papers again, and get the same page.", references: [
      { label: "Shaw, JOSS: Experience with an Experimental Computing Service, P-3149, May 1965", url: "https://bitsavers.org/pdf/rand/joss/P-3149_JOSS_Experience_With_An_Experimental_Computing_Service_For_Users_At_Remote_Typwriter_Consoles_May65.pdf" },
    ] },
    { kind: "observation", label: "02 / GO", text: "The session that mattered most is figure 2 of Shaw’s 1965 paper. A user sets out to solve a quadratic equation and gets nine things wrong, one after another. A value is missing. A divisor is zero. A square root is negative. The form for the answers does not exist, then has too few blanks, then no room, then blanks that touch. Each time JOSS says what is wrong and stops where it is. The user puts that one thing right and types Go. The program is never started again from the top. A parser and an evaluator do not get you this. The task has to be kept, broken off in the middle of a step, while the user changes the program underneath it." },
    { kind: "observation", label: "03 / FORTY MESSAGES, TWELVE IN PRINT", text: "Shaw wrote that JOSS “simply selects from a stock of forty ‘canned’ messages”. The papers show about a dozen of them. The rest were not lost. A listing of the program survives, headed in his hand “JOSS 666, JCS 1-9-65”, and it holds each message as octal numbers, five characters to a word. The agent decoded them with the listing’s own table of characters. There are forty.", references: [
      { label: "JOSS 666 listing, January 1965", url: "https://bitsavers.org/pdf/rand/joss/JOSS_666_Listing_Jan65.pdf" },
    ] },
    { kind: "observation", label: "04 / TWO JOSSES", text: "The first replays would not settle, because the pages disagree with each other. A film made in March 1964 has JOSS say “Zero divisor.” The paper of May 1965 has “I have a zero divisor.” Shaw explains it: “After a year’s experience with neutral, impersonal messages, we introduced personal pronouns and some informal diction.” The wording was not all that changed. In the pages of 1965 every answer sits one column further to the right than in 1964. And the JOSS of the film types one fiftieth as 2·10*(-2), where by 1965 a number that small is typed as .02. So the reconstruction has a year. A session from one does not replay on the other." },
    { kind: "observation", label: "05 / WHAT THE REPLAY FOUND IN THE FILM", text: "The film’s scenario was printed as a report, with the typewriter’s real output pasted in as figures. Replayed as printed, it goes wrong halfway: a listing in the report shows none of the first program’s steps, though nothing typed before it removes them. A Delete all was cut from the scenario. The report also has a comma that JOSS’s own listing of the same step does not have, and a space where there should be a multiplication dot. With those three put right, and marked, it replays." },
    { kind: "observation", label: "06 / FIVE LINES", text: "The five sessions have 385 lines typed by the user and 767 typed by JOSS that the pages show. 762 come out the same: 686 column for column against the typewriter’s own output, and 76 against pages a typist had copied, where only the characters can be compared. The other five are all the same kind of thing. The page has log 2 as .69314718, three times, and the correctly rounded figure ends in a 1. It has one long expression ending in 357 where the reconstruction gets 356. And in a table of a hundred exponentials, the row for 72 ends in a 7 where correct rounding gives an 8. Each is one unit in the ninth digit. JOSS’s own logarithm and exponential were a hair off, and the reconstruction’s are not." },
    { kind: "observation", label: "07 / CHECK IT", text: "Among Shaw’s working papers there is a handwritten page headed F1, dated 11-19-64. F1 is the logarithm routine in the listing. The page works through its range reduction and ends: “Check it. Looks like coefficient between 1 and √2 gets doubled several times.” That is three months after the paper with log 2 in it. I cannot say it is the same fault. I can say he was looking at that routine." },
    { kind: "connection", text: "The console runs in the browser, compiled from the same Rust source as the command-line version. Each of the five original sessions can be replayed there and compared with its page.", links: [
      { href: "/demos/joss?example=1965-quadratic-with-mistakes", label: "Sit at the console — interactive study" },
      { href: "https://github.com/chrishayuk/joss/tree/main/transcripts", label: "The five sessions, as typed in from the scans" },
      { href: "https://github.com/chrishayuk/joss/tree/main/docs/scans", label: "The pages they were typed in from" },
      { href: "https://github.com/chrishayuk/joss", label: "Source, tutorial and example programs" },
    ] },
    { kind: "refusal", title: "WHAT THIS DOES NOT SHOW", lines: [
      "The pages were read by the same coding agent that wrote the interpreter, with sub-agents doing the measuring. Nobody has checked the transcriptions against the scans by eye. The pages are in the repository so that somebody can.",
      "The column rules were set from these pages, so their matching is partly the reconstruction being fitted to them. The digits were not fitted: the three long tables matched on the first replay, apart from the row for 72.",
      "Matching five sessions says nothing about what they do not exercise. Stop, Done, To and Cancel, most of the forty messages, and what happens when a step is deleted from under a loop are built from the listing and Shaw’s notes, and no page shows them.",
      "The logarithm, exponential, sine and cosine here are a modern library’s, rounded to nine digits. They are not JOSS’s routines, which is why five lines differ. Those routines are in the listing and have not been read.",
      "The messages were decoded by machine from a scan of a printed listing. Each was checked against the capitals printed beside it, which have no small letters and no ≤.",
      "Where no page of 1964 shows a message, the 1964 setting uses the words of 1965. How much storage each step, value and level of a task takes is an estimate.",
      "This is the JOSS of the JOHNNIAC. The later JOSS on the PDP-6, which most descriptions are of, is a larger language and is not here. Nor are the punched cards, the sign-on, or the other seven users.",
    ], principle: "A manual tells you what a system was meant to do. A page it typed tells you what it did, mistakes included." },
    { kind: "question", text: "How much of a conversation survives on paper?", status: "OPEN", detail: "The pages keep what was typed, by whom, and in which column. They do not keep the gong that rang when JOSS handed the typewriter back, the half second it took to fetch your work from the drum, or what it was like to be told “Eh?” by a machine in 1964. A reconstruction that matches the page has matched the part that was written down." },
  ],
  sources: [
    { title: "J. C. Shaw, “JOSS: Experience with an Experimental Computing Service for Users at Remote Typewriter Consoles”, RAND P-3149, May 1965", url: "https://bitsavers.org/pdf/rand/joss/P-3149_JOSS_Experience_With_An_Experimental_Computing_Service_For_Users_At_Remote_Typwriter_Consoles_May65.pdf", note: "Figure 1 is on page 6 of the PDF, figure 2 on page 8, and the one-page summary of the language on page 11." },
    { title: "J. C. Shaw, “JOSS: Examples of the Use of an Experimental On-Line Computing Service”, RAND P-3131, April 1965", url: "https://bitsavers.org/pdf/rand/joss/P-3131_JOSS_Examples_Of_The_Use_Of_An_Experimental_On-Line_Computing_Service_Apr65.pdf", note: "Eight pages typed at a console on 28 April 1965, reproduced in two colours." },
    { title: "J. C. Shaw, “JOSS: A Designer’s View of an Experimental On-Line Computing System”, RAND P-2922, August 1964", url: "https://bitsavers.org/pdf/rand/joss/P-2922_JOSS_A_Designers_View_Of_An_Experimental_On-Line_Computing_System_Aug64.pdf", note: "Figures 3a to 3i. log(2) is in figure 3b, on page 17 of the PDF." },
    { title: "C. L. Baker, “JOSS: Scenario of a Filmed Report”, RAND RM-4162-PR, June 1964", url: "https://bitsavers.org/pdf/rand/joss/RM-4162-PR_JOSS_Scenario_Of_A_Filmed_Report_Jun64.pdf", note: "The session filmed on 21 March 1964. The row for 72 is on page 23 of the PDF." },
    { title: "“JOSS 666”, JOHNNIAC assembly listing, J. C. Shaw, 9 January 1965", url: "https://bitsavers.org/pdf/rand/joss/JOSS_666_Listing_Jan65.pdf", note: "The message texts are on pages 38 to 42 of the PDF." },
    { title: "“JOSS Program Notes and Tests”, J. C. Shaw’s working papers", url: "https://bitsavers.org/pdf/rand/joss/JOSS_Program_Notes_and_Tests.pdf", note: "The note of 11-19-64 is page 13 of the PDF." },
    { title: "chrishayuk/joss", url: "https://github.com/chrishayuk/joss", note: "The interpreter, the five sessions as transcripts, its tests, a tutorial, example programs, a language server, and reduced scans of the pages." },
    { title: "Coding-agent session, 22 November 2026", note: "The interpreter, the transcriptions and the reading of the listings were made in this session. Every count in this note can be rerun on the interactive study." },
  ],
};
