import type { PublicationRecord } from "./types.ts";

/** A note about porting a 1979 interpreter with a coding agent. Every quoted
 * sentence is copied from its source: the two BYTE issues, and the agent's own
 * report from the session of 21 November 2026. The corrected interpreter can
 * be run from the linked repository. */
export const mouseRecord: PublicationRecord = {
  id: "N-MOUSE",
  slug: "the-port-matched-the-reference-was-wrong",
  kind: "notebook",
  title: "The port matched. The reference was wrong.",
  dek: "A 1979 language, a coding agent, and a misprint a reader had already caught in 1980.",
  abstract: "A note about finishing a Rust port of Mouse, the language Peter Grogono published in BYTE in July 1979, with a coding agent. The port matched the C interpreter it was checked against. The C carried a misprint from the printed listing and three bugs that a reader, Tom Lane, had described in BYTE in June 1980. The agent guessed the misprint and said it had not checked; it inherited the other three without comment. The corrected interpreter runs in the browser.",
  created: "2026-11-22",
  version: "0.1",
  status: "OPEN",
  publication: "draft",
  authors: ["Chris Hay"],
  lineage: "MAGAZINE → C PORT → AGENT PORT → MAGAZINE",
  concepts: ["ai-agents", "source-authority", "verification", "programming-languages"],
  related: ["N-ATTRIBUTION", "N-AUTHORITY"],
  media: [],
  body: [
    { kind: "observation", label: "01 / WHAT I ASKED", text: "Mouse is a programming language that fits on a magazine page. Peter Grogono published it in BYTE in July 1979, with the interpreter printed as 198 lines of Pascal. I had a C version of it and an unfinished Rust port of my own. I asked a coding agent to finish the port, using the C as the reference." },
    { kind: "observation", label: "02 / IT MATCHED", text: "The agent finished the port and compared it with the C on every example I had. The output was identical, byte for byte. Every example I had only printed text." },
    { kind: "observation", label: "03 / BELIEVE, BUT DID NOT CHECK", text: "The agent’s report listed the places where it had chosen not to copy the C. One was the code that finds a macro’s parameter: “I used an increment, which I believe matches Grogono’s original listing but did not check against a source.” So I asked it to check against the magazine, not against the C." },
    { kind: "observation", label: "04 / LINE 176", text: "The printed listing has the same subtraction as the C. Lines 175 and 176 both take one away, and the article’s own explanation only works if one of them adds. The agent had guessed right, and the C carries the same minus as the misprint.", references: [
      { label: "BYTE, July 1979, pp. 198–220", url: "https://archive.org/details/byte-magazine-1979-07" },
    ] },
    { kind: "observation", label: "05 / A READER, TWO EVENINGS", text: "Somebody had already noticed. In June 1980 BYTE printed a letter from a reader, Tom Lane: line 176 should have a plus sign, not a minus (one of several misprints), and there were three further bugs in the logic. He found them “during two evenings of studying the interpreter listing, with no machine use whatever.” Grogono replied that they were “all genuine bugs”, and that the misprint came from a poor photocopy of the proof. The correction was in print within a year. It did not reach the C.", references: [
      { label: "BYTE, June 1980, pp. 238 and 240", url: "https://archive.org/details/byte-magazine-1980-06" },
    ] },
    { kind: "observation", label: "06 / THIRTY-THREE OR ONE", text: "The agent had guessed the misprint. This bug it copied from the C without knowing it was there. With Lane’s corrections in, the port prints 1, and the article’s example listings run as described, with two exceptions that are the article’s own: listing 5, the bubble sort, fails when given fewer than two numbers, and the array program on page 204 reads with one full stop too many and accepts a twenty-sixth number where its text says twenty-five. Listing 2, which runs for ever, prints primes until it is stopped." },
    { kind: "connection", text: "The corrected interpreter runs in the browser, compiled from the same Rust source as the command-line version. Lane’s test is one of the examples.", links: [
      { href: "/demos/mouse?example=lane-test", label: "Run Lane’s test — interactive study" },
      { href: "https://github.com/chrishayuk/mouse-interpreter", label: "Source, tutorial and the scanned pages" },
    ] },
    { kind: "refusal", title: "WHAT THIS DOES NOT SHOW", lines: [
      "The agent did not discover these bugs. Tom Lane did, and they were in print by 1980.",
      "This is one port in one session. It says nothing general about how often an agent copies a reference’s mistakes.",
      "I have not established where the C version came from, only that it has the same subtraction as the printed listing.",
      "A second model, OpenAI’s Codex, later reviewed the repository independently. It found the slips in the bubble sort and the array program, and that the examples had added spaces to the printed prompts. The examples now keep the printed strings, each change is listed, and the review and what was done about each point are in the repository.",
    ], principle: "Matching a reference is evidence about the port. It is not evidence about the reference." },
    { kind: "question", text: "When a port matches its reference, who checks the reference?", status: "OPEN", detail: "Two habits came out of this: asking the agent what it did not check, and asking what the reference was copied from. Whether either would have been enough without a reader’s letter from 1980 is not something this note can answer." },
  ],
  sources: [
    { title: "Peter Grogono, “Mouse: A Language for Microcomputers”, BYTE, July 1979, pp. 198–220", url: "https://archive.org/details/byte-magazine-1979-07", note: "Listing 6 is on pp. 209, 210 and 212; line 176 on p. 212; Figure 1 on p. 216." },
    { title: "Tom Lane, “Comment and Correction for Mouse”, with Peter Grogono’s reply, BYTE, June 1980, pp. 238 and 240", url: "https://archive.org/details/byte-magazine-1980-06" },
    { title: "chrishayuk/mouse-interpreter", url: "https://github.com/chrishayuk/mouse-interpreter", note: "The interpreter, its tests, 42 example programs, and reduced scans of both sources." },
    { title: "Coding-agent session, 21 November 2026", note: "The agent’s report is quoted as written. The first completed port was rebuilt unchanged from the session transcript to confirm that it prints 33 on Lane’s test." },
  ],
};
