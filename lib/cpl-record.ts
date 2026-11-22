import type { PublicationRecord } from "./types.ts";

/** A note about running the one sizeable program in the CPL Working Papers of
 * July 1966 with a coding agent. Every quoted sentence is copied from its
 * source: the Working Papers and their Appendix 1. Every result named here can
 * be reproduced on /demos/cpl or from the linked repository. */
export const cplRecord: PublicationRecord = {
  id: "N-CPL",
  slug: "a-1966-program-said-it-had-not-been-checked",
  kind: "notebook",
  title: "A 1966 program said it had not been checked. So I ran it.",
  dek: "The one large program in the papers that define CPL, a handwritten warning across the top of it, and a coding agent with a scan.",
  abstract: "A note about building an interpreter for CPL, the language BCPL was cut down from, out of its 1966 working papers with a coding agent. The papers contain one program of any size, a preprocessor written in CPL, and someone has written across the top of it that the draft has not been fully checked. Typed in as printed it does not compile. With seven slips put right it runs and gives wrong answers in two ways, and in two more places its informal notes disagree with its own text. Corrected, it reads its own text to the last word. The interpreter and the program run in the browser.",
  created: "2026-11-22",
  version: "0.1",
  status: "OPEN",
  publication: "draft",
  authors: ["Chris Hay"],
  lineage: "TYPESCRIPT → SCAN → AGENT → INTERPRETER",
  concepts: ["ai-agents", "source-authority", "verification", "programming-languages"],
  related: ["N-BOHM", "N-MOUSE"],
  media: [],
  body: [
    { kind: "observation", label: "01 / A LANGUAGE IN WORKING PAPERS", text: "CPL was designed in the early 1960s by a group at Cambridge and London. Martin Richards cut it down to make BCPL, and BCPL led to B and then C. In July 1966 the group put out a technical report called CPL Working Papers, most of which is a draft of the reference manual. I asked a coding agent to build an interpreter for the language those papers describe: the 1966 language, not the subset that became BCPL.", references: [
      { label: "CPL Working Papers, July 1966", url: "https://www.ancientgeek.org.uk/CPL/CPL_Working_Papers.pdf" },
      { label: "Richards, How BCPL evolved from CPL", url: "https://www.cl.cam.ac.uk/~mr10/cpl2bcpl.pdf" },
    ] },
    { kind: "observation", label: "02 / ONE PROGRAM OF ANY SIZE", text: "An interpreter built from a manual can only be tested on programs. The examples in the manual are a few lines each, and everything longer the agent wrote itself. The papers contain one exception. Appendix 1 is a preprocessor, about 190 lines of CPL, “intended to be both a description of the transformation from an implementation alphabet to canonical CPL and a general example of a CPL program”. Across the top of its first page someone has written by hand: “This draft has not been fully checked”." },
    { kind: "observation", label: "03 / AS PRINTED, IT DOES NOT COMPILE", text: "The agent typed the program in from the scan, keeping every character as printed. It does not compile. Three sections open with one tag and close with another: R.T and R.T., R.U.W and R.U.W., R.S. and R.S. One call is to Proprocessor. One case has no colon. And twice a name that should begin with a capital is typed small, goto switch and standard, which matters in CPL because a small letter is a whole name: standard is eight names side by side." },
    { kind: "observation", label: "04 / IT RUNS, AND IS WRONG", text: "With those seven put right the program runs, and what it writes is wrong in two ways. The routine that reads an underlined word starts from the first letter instead of from nothing, so every word begins twice. And after an ordinary comma it loses a character. That one can be followed on the page with a finger: ReadSpaces has already moved on to the next character, and then NextChar moves on again." },
    { kind: "observation", label: "05 / WHERE THE NOTES DISAGREE WITH THE PROGRAM", text: "Part 3 of the appendix describes the functions the program uses but does not declare, a sentence or a list for each. In two places those descriptions cannot be what the program needs. One says a function is true for the symbols that can come before a command, where the program uses it for the symbols that cannot. The other turns goto into go, after which nothing recognises it as a jump. These are perhaps better called open questions than slips. Part 3 says of itself that it is informal." },
    { kind: "observation", label: "06 / IT READS ITSELF", text: "A preprocessor for CPL written in CPL can be given its own text. Corrected, it reads all 189 lines of itself and writes about 1,100 symbols, ending with finish. Given its own text as printed, it stops a little over 200 symbols in, at the first tag that does not match, and says nothing, because the program has no message for that case. It is doing what it was written to do. A closing bracket with the wrong tag makes every open section jump out through a label it was handed by its caller, and the outermost label is the end of the program." },
    { kind: "connection", text: "The interpreter runs in the browser, compiled from the same Rust source as the command-line version, with the preprocessor as one of its examples. The programs on this page are run by it where they sit.", links: [
      { href: "/demos/cpl?example=appendix-1-preprocessor", label: "Run the 1966 preprocessor — interactive study" },
      { href: "/demos/cpl", label: "Write CPL in the playground" },
      { href: "https://github.com/chrishayuk/cpl/tree/main/appendix1", label: "The program, the eleven slips and a detail of the page for each" },
      { href: "https://github.com/chrishayuk/cpl", label: "Source, tutorial and example programs" },
    ] },
    { kind: "refusal", title: "WHAT THIS DOES NOT SHOW", lines: [
      "These are readings of a scan of a typescript, made by one reader, and that reader was a coding agent. Each slip has a page number and a detail of the scan so that it can be checked by eye.",
      "Whether the program was ever run in 1966, the documents I have do not say. A later draft may have put all of this right.",
      "The appendix describes thirteen of its functions only informally and never mentions six more names it uses. All of them were supplied. A different reading of those sentences gives a different program.",
      "The interpreter and the transcription came from the same agent in one session. The seven slips that stop the program compiling can be seen on the page. The two wrong answers also rest on the interpreter doing what the manual means.",
      "The interpreter is not all of CPL. What it leaves out is listed in the repository, and where the 1966 papers say a section is out of date without giving the new rules, it follows the old ones.",
      "I have not searched for an earlier list of these slips. Somebody may have made one.",
    ], principle: "A program that has never been run has only been proofread. Running it is a different kind of reading." },
    { kind: "question", text: "How much of a language that was still a draft can you check by running the one program its authors left?", status: "OPEN", detail: "The preprocessor exercises the parts of CPL its authors reached for when they had real work to do: recursion, strings, a switch, sections with tags, and a label passed as a parameter so that a routine can jump out of its caller. It says nothing about the parts they did not need that day. For those, the interpreter has only the manual’s short examples and programs written by the same agent that wrote the interpreter." },
  ],
  sources: [
    { title: "University of London Institute of Computer Science and The Mathematical Laboratory, Cambridge, “CPL Working Papers”, technical report, July 1966", url: "https://www.ancientgeek.org.uk/CPL/CPL_Working_Papers.pdf", note: "Appendix 1, “The Preprocessor”, begins on page 120 of the PDF. The program is Part 2, on pages 2 to 5 of the appendix; the informal definitions are Part 3, on page 6." },
    { title: "“CPL Elementary Programming Manual”, Edition II, Cambridge, January 1966", url: "https://www.ancientgeek.org.uk/CPL/CPL_Elementary_Programming_Manual.pdf" },
    { title: "D. W. Barron, J. N. Buxton, D. F. Hartley, E. Nixon and C. Strachey, “The main features of CPL”, The Computer Journal 6, 1963", url: "https://www.ancientgeek.org.uk/CPL/The_Main_Features_of_CPL.pdf" },
    { title: "Martin Richards, “How BCPL evolved from CPL”", url: "https://www.cl.cam.ac.uk/~mr10/cpl2bcpl.pdf" },
    { title: "chrishayuk/cpl", url: "https://github.com/chrishayuk/cpl", note: "The interpreter, its tests, 73 example programs, a tutorial, and the preprocessor as printed and corrected with a detail of the page for each slip." },
    { title: "Coding-agent session, 22 November 2026", note: "The interpreter, the transcription of Appendix 1 and the functions it leaves informal were written in this session. Every result in this note can be rerun on the interactive study." },
  ],
};
