import type { PublicationRecord } from "./types.ts";

/** A note about running the instruction tables in Alan Turing's 1945 report
 * "Proposed Electronic Calculator" on a simulation of the machine that report
 * proposes, built with a coding agent. Every quoted sentence is copied from the
 * report (as transcribed on Wikisource) or from Carpenter and Doran's 1986
 * edition. No image of the report is reproduced: figures are redrawn from data. Every result named
 * here can be reproduced on /demos/turing-ace or from the linked repository. */
export const turingAceRecord: PublicationRecord = {
  id: "N-TURING-ACE",
  slug: "turings-1945-computer-run-as-written",
  kind: "notebook",
  title: "Turing’s 1945 computer, run as written.",
  dek: "The machine of the ACE report, the two programs it prints, and a coding agent that ran them on the computer they were written for.",
  abstract: "A note about building the computer Alan Turing proposed in his 1945 report for the National Physical Laboratory, which was never built as he specified it, and running the two instruction tables the report prints. A coding agent built the machine at the level of its instructions, an assembler that follows Turing’s own procedure for numbering cards, and the tables the report only describes. Neither printed table runs as printed. INDEXIN needs three corrections and CALPOL five, and three of the thirteen cards Turing drew for INDEXIN do not say what its table says. The machine and the tables run in the browser.",
  created: "2026-11-22",
  version: "0.1",
  status: "OPEN",
  publication: "draft",
  authors: ["Chris Hay"],
  lineage: "REPORT → SCAN → AGENT → MACHINE",
  concepts: ["ai-agents", "source-authority", "verification", "programming-languages"],
  related: ["N-BOHM", "N-CPL"],
  media: [],
  body: [
    { kind: "observation", label: "01 / A COMPUTER ON PAPER", text: "In 1945, at the National Physical Laboratory, Alan Turing wrote a report called Proposed Electronic Calculator: a design for a stored-program computer he called the Automatic Computing Engine. It describes the memory, the logical control, the arithmetic and the circuits, down to the valves. It was never built as written. The Pilot ACE that ran at NPL in 1950 was a smaller and different design. I asked a coding agent to build the machine the report describes and to run the programs in it.", references: [
      { label: "Turing, Proposed Electronic Calculator, transcribed", url: "https://en.wikisource.org/wiki/Proposed_Electronic_Calculator" },
      { label: "The report and its figures at the Turing Archive", url: "https://www.alanturing.net/ace" },
    ] },
    { kind: "observation", label: "02 / A MACHINE THAT WAITS FOR ITS MEMORY", text: "The memory is mercury delay lines. Each holds 1,024 pulses, a microsecond apart, going round and round: 32 words, which Turing calls minor cycles, of 32 digits each. A word can only be read as it comes out of the end of the line. So after an ordinary instruction the machine does not go to the next word in the line but the one after: by the time it is ready, the next “would have gone by before we were ready to apply it; we should always just miss the boat”. The simulation keeps time in minor cycles, because where a word sits decides how long the machine waits for it." },
    { kind: "observation", label: "03 / PROGRAMS IN POPULAR FORM", text: "Section 13 gives each instruction three forms: machine form, the 32 digits; permanent form, on punched cards kept in a library; and popular form, a short notation for people to read. Programs are tables of instructions in popular form, such as TS 6 - TS 2 or B, BURY, and a table can name another as a subsidiary. Turing describes how a job is assembled: copy the cards it needs, sort them by name, “renumber them consecutively in the binary scale”, and fill those numbers in wherever one instruction names another. The agent wrote that procedure as a program." },
    { kind: "observation", label: "04 / THE CARDS AND THE TABLE", text: "The report prints two complete tables. INDEXIN, thirteen instructions, fetches a word whose position is held in a temporary storage. It is printed twice: in popular form, and in Figure 38 as the thirteen cards that would be punched for it, digit by digit. Three of the cards do not say what the table says. Where the table has ADD ‘A’ the card has a different multiplier switched on. Where the table has OR the card has AND. And where the table moves TS 8 the card moves TS 4." },
    { kind: "observation", label: "05 / INDEXIN DOES NOT RUN AS PRINTED", text: "Run as printed, INDEXIN fetches nothing, and it does no better from the cards. It needs three corrections. The instruction it builds has the code for storing a word where it needs the code for fetching one, and it ends by burying a return address where it should dig one up. Carpenter and Doran’s 1986 edition of the report points out both. The third we have not found written down. INDEXIN shifts the digits it has built sixteen places to move them into place, and then takes the half of the result they have just left. With all three corrections it works, and leaving out any one of them stops it." },
    { kind: "observation", label: "06 / CALPOL NEVER STOPS", text: "The second table, CALPOL, works out a polynomial of degree fifteen. As printed it never stops. With five corrections it gives the right answer, and gives it again the second time it is used. Carpenter and Doran call section 13 “brilliant” and say it “contains numerous coding errors”, and they analysed CALPOL in a paper in 1977. I have not read that paper, so none of the five is claimed as new here. They are listed, with what each one does, in the repository." },
    { kind: "observation", label: "07 / THE TABLES HE ONLY DESCRIBED", text: "Both printed tables call others the report describes in a sentence or two and does not print: BURY and UNBURY, which keep return addresses; DISCRIM, which chooses between two ways on; PLUSIND, MULTIP, ADD, TRANS 45 and BINDEC. These were written for the machine from Turing’s descriptions, and they are ours. Writing them turned up two things. BURY cannot be written the obvious way, with logical operations, because DISCRIM is given its question in the storage they write to. And DISCRIM done as its outline says gives the wrong answer for any word whose last digit is a 1, because that digit counts as a sign: it says no such word contains a 1." },
    { kind: "connection", text: "The machine, the assembler and every table run in the browser. You can write a table, see it in machine form, watch every instruction the machine obeys, and run INDEXIN and CALPOL as printed or corrected.", links: [
      { href: "/demos/turing-ace?example=indexin-trial&printed=1", label: "INDEXIN as printed — interactive study" },
      { href: "/demos/turing-ace", label: "Write an instruction table in the playground" },
      { href: "https://github.com/chrishayuk/turing-ace", label: "Source, the tables, the corrections and the decisions" },
      { href: "https://en.wikisource.org/wiki/Proposed_Electronic_Calculator", label: "The report, transcribed on Wikisource" },
    ] },
    { kind: "refusal", title: "WHAT THIS DOES NOT SHOW", lines: [
      "This is the machine at the level of its instructions. The circuits of Figures 12 to 36 are not simulated, and where the text and the figures disagree about what an instruction does, a choice was made. There are nine such choices, and each is listed with both readings.",
      "Carpenter and Doran’s 1986 notes point out several of the same problems, and their 1977 paper analyses CALPOL, which I have not read. Some of what is reported here as not found before may be in it.",
      "The machine, the assembler, the tables the report only describes and the corrections all came from one agent in one session. The corrections are readings of what Turing meant.",
      "The DISCRIM result depends on reading its outline literally. Turing may have meant the sign to be dealt with in a way the outline does not mention.",
      "I found no earlier program that runs the machine of the 1945 report, as opposed to the Pilot ACE. I searched the web and GitHub, and that is not proof there is none.",
      "Figures 19 and 38 are redrawn here from a transcription. The originals are at the Turing Archive.",
    ], principle: "A program printed as an example is still a program. The way to read it is to run it." },
    { kind: "question", text: "If a computer was only ever a design, were its example programs ever more than drafts?", status: "OPEN", detail: "Turing wrote INDEXIN and CALPOL for a machine that existed only in the same report, with nothing to run them on. The errors are the ordinary kind: a digit, a register, a name. What running them adds is not cleverness but a way of finding the ones that only show when a word is actually in the wrong place." },
  ],
  sources: [
    { title: "A. M. Turing, “Proposed Electronic Calculator”, report to the Executive Committee of the National Physical Laboratory (E.882), 1945; transcribed on Wikisource", url: "https://en.wikisource.org/wiki/Proposed_Electronic_Calculator", note: "INDEXIN is on p. 29 of the report and CALPOL on p. 31. Instruction forms are in section 13, the card layout in section 7, the operation types in section 12. Figures 19, 37 and 38 give the digits of each instruction." },
    { title: "The report and its original figures, The Turing Archive for the History of Computing", url: "https://www.alanturing.net/ace", note: "Figures 19 and 38 are redrawn in this note from a transcription; the originals are here." },
    { title: "B. E. Carpenter and R. W. Doran (eds.), “A. M. Turing’s ACE Report of 1946 and Other Papers”, MIT Press, 1986", note: "The editors’ introduction and notes 11 to 18 on the text, which point out conflicts in sections 11 and 12 and two of the corrections to INDEXIN." },
    { title: "B. E. Carpenter and R. W. Doran, “The other Turing machine”, The Computer Journal 20(3), 1977, pp. 269–279", url: "https://doi.org/10.1093/comjnl/20.3.269", note: "Analyses CALPOL. Not read for this note." },
    { title: "chrishayuk/turing-ace", url: "https://github.com/chrishayuk/turing-ace", note: "The machine, the assembler, the tables as printed and corrected, the tables written from Turing’s descriptions, the corrections and the nine decisions, with tests." },
    { title: "Coding-agent session, 22 November 2026", note: "The machine, the assembler, the transcription of the tables and the tables the report only describes were written in this session. Every result in this note can be rerun on the interactive study." },
  ],
};
