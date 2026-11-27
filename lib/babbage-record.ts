import type { PublicationRecord } from "./types.ts";

/** A note about running Charles Babbage's earliest surviving notations of
 * calculations for the Analytical Engine, the two programs of BAB/L/001
 * (4 and 5 August 1837), as he wrote them, with every cell of the sheet
 * checked. Every count is from the linked repository: `babbage verify` and
 * tests/corpus.rs. Every program named can be run again on /demos/babbage. */
const REPO = "https://github.com/chrishayuk/analytical-engine";
const SHEET = "https://collection.sciencemuseumgroup.org.uk/documents/aa110000065";
const SERIES = "https://collection.sciencemuseumgroup.org.uk/documents/aa110000020/notations-of-calculations-for-the-analytical-engine";
const ROJAS = "https://arxiv.org/abs/2303.13740";
const ROJAS_2017 = "https://www.mi.fu-berlin.de/inf/groups/ag-ki/publications/Computerprogramme-Babbage/Computer-Programme-von-Babbage.pdf";

export const babbageRecord: PublicationRecord = {
  id: "N-BABBAGE",
  slug: "babbage-reordered-a-program-to-save-ten-turns-of-the-hand",
  kind: "notebook",
  title: "In August 1837, Babbage reordered a program to save ten turns of the hand.",
  dek: "Two of the earliest programs for the Analytical Engine, run on the store and the mill as Babbage set them out, a day apart. 122 of the 123 things he wrote agree with what the operations do, and his own note in the margin explains the order of the first.",
  abstract: "A note about running the two programs on BAB/L/001, the first sheet of Charles Babbage’s notations of calculations for the Analytical Engine in the Science Museum: No. 1 of 4 August 1837, which eliminates x between two equations, and No. 2 of 5 August, which finds x and y. Both tables were transcribed cell for cell from the Museum’s scans, and a program runs each operation on a model of the engine that has no rules but those the sheet shows, holding every value as algebra in Babbage’s own letters. Of 123 statements on the sheet, the store cells, the mill’s entries, the formulas and their accents, the compositions, the results and the counts of operations and variables, 122 agree. The sheet depends on the mill keeping a table of multiples of the multiplicand between operations, as Babbage’s own remark explains, and its accents name numbers, not columns. The one disagreement is operation 12 of No. 2: a subtraction whose result Babbage writes as −c − ax.",
  created: "2026-11-25",
  version: "0.1",
  status: "OPEN",
  publication: "draft",
  authors: ["Chris Hay"],
  lineage: "BAB/L/001 → SCANS → TRANSCRIPTION → THE ENGINE AS THE SHEET SHOWS IT → EVERY CELL CHECKED",
  concepts: ["source-authority", "verification", "programming-languages"],
  related: ["N-NINE-CHAPTERS", "N-TURING-ACE", "N-BOHM"],
  media: [],
  body: [
    { kind: "observation", label: "01 / TWO PROGRAMS ON ONE SHEET", text: "Among the Babbage Papers in the Science Museum is a series of 27 sets of “notations of calculations” for the Analytical Engine, 36 sheets dated 1836 to 1840. The first, BAB/L/001, is a large ruled sheet in a cover headed “Notations of Calculation”. The cover lists two programs: No. 1, dated 4 August 1837, the elimination of x between ax + by + c = 0 and a′x + b′y + c′ = 0, and No. 2, dated 5 August, the elimination of x and y. Each is a table. Down the left are the number of each operation, its kind and what the mill makes; across the middle the columns of the store, v1 to v9, with what each is given and 0 where a number is taken away; down the right the operation as a formula in the variables. Raúl Rojas described this sheet in 2023 as the first computer program, reading its two tables as one program of 4 August. Here both tables are transcribed, cell for cell, from the Museum’s scans, and run.", references: [
      { label: "BAB/L/001, Science Museum Group (catalogue and scans)", url: SHEET },
      { label: "R. Rojas, “The first computer program”, 2023", url: ROJAS },
    ] },
    { kind: "observation", label: "02 / RUN AS WRITTEN", text: "The run takes each row’s operation and columns from the sheet, does the operation, and checks everything the row writes: each store cell, the mill’s entry, the formula on the right and the accents on its variables; then the page’s “Composition”, the values of x and y it states, and its counts of operations and variables. Values are held as algebra in Babbage’s letters, exactly, so a check holds for every value of a, b, c, a′, b′ and c′, not for numbers chosen to test it. The engine has no rule the sheet does not show: a number taken from a column leaves it at zero; its complement may be laid in another column as it is taken; a transfer from column to column complements again. Rojas had described the same rules in 2017, from the same series of sheets. Of 123 statements, 122 agree: all 42 of No. 1 and 80 of the 81 of No. 2. The x and y it finds solve the equations, and the counts on the cover, “great 7, small 6, total 13” and “6 variables, 3 working, 9 occupied” for No. 2, are what the run counts." },
    { kind: "observation", label: "03 / TEN TURNS OF THE HAND", text: "Operation 1 of No. 1 multiplies b′ by a and leaves both their columns at zero. Operation 2 multiplies b′ by c, though b′ is no longer in the store. A remark under the table gives the reason, and it is the remark of a programmer. The mill makes a table of multiples of the number it multiplies by, and keeps it, so Babbage ordered the products to use each table twice: b′ for operations 1 and 2, b for 3 and 4. He had thought of another order, which would have saved variables, and rejected it because it “would have caused the table of b′ made in the third operation to be destroyed and it must have been recomputed in the operation for b′c thus causing the loss of about ten turns of the hand.” The run keeps a table standing until another operation comes between, and with that one rule every operand of both programs is to hand. The ten turns are his figure; how long a table took to make is not on this sheet." },
    { kind: "observation", label: "04 / THE NEXT DAY", text: "No. 1 finds x and leaves the store spent: a, b and c have each been taken to the mill and left at zero. The next day, No. 2 finds y as well, and y needs a, b and c again. So as each is taken in operations 1 to 3, its complement is laid in another column at the same time: Ca in v8, Cc in v5, Cb in v9. On the back of the sheet Babbage defined the sign: “C … before any number signifies the Complement of that number as Ca means complement of a”. After x is found, operations 8 to 10 move them back, with nothing for the mill to do, and the second half finds y. Keeping them costs three transfers and two more working variables. With the three operations that find y, No. 2 takes 13 operations and 9 variables where No. 1 took 7 and 7, as the cover counts them." },
    { kind: "observation", label: "05 / ACCENTS NAME NUMBERS", text: "Babbage writes v₁′ for the first new number v1 is given and v₁″ for the second. The right-hand columns and compositions of the two programs name variables 53 times with accents, and every one is the number the run finds there. They name numbers, not columns: operation 8 of No. 2 is written v₁″ = v₁ = a. The a that comes back from v8 is still v₁, the number v1 started with, though for seven operations it was somewhere else as its complement.", references: [
      { label: "The notation, and every rule of the engine with what it rests on", url: `${REPO}/blob/main/docs/notation.md` },
    ] },
    { kind: "observation", label: "06 / OPERATION 12", text: "One row does not agree. No. 2 finds y from the first equation as (−c − ax)/b. Operation 11 makes ax. Operation 12 is marked as a subtraction, its mill column reads −c − ax, and its formula −v₃″ − v₅″. A subtraction of one of c and ax from the other gives c − ax or ax − c, not −c − ax. Taken as Babbage wrote it, every cell after it agrees, y included, and so does his composition of y, expanded through −cb′a + cba′ − c′ba + cb′a to (a′c − ac′)/(b′a − ba′). The algebra is right. What the row asks of the mill, to take both numbers negatively, no other row asks. Rojas prints the formula without comment." },
    { kind: "connection", text: "The same program runs in the browser, compiled to WebAssembly: the mill and the columns of the store, stepped one operation at a time, the sheet laid out as Babbage laid it out with every cell checked, and the transcription in an editor that runs as you type.", links: [
      { href: "/demos/babbage?page=L001-2", label: "Both programs, run in the browser — interactive study" },
      { href: `${REPO}/blob/main/sources/notes/L001.md`, label: "What was hard to read on the sheet, and the pencil not run" },
      { href: `${REPO}/blob/main/docs/literature.md`, label: "Where this reading and Rojas’s agree and differ" },
      { href: `${REPO}/tree/main/tutorial`, label: "A tutorial in nine chapters, every page tested" },
      { href: REPO, label: "Source, language server and editor extension" },
    ] },
    { kind: "refusal", title: "WHAT THIS DOES NOT SHOW", lines: [
      "One sheet of 27. The rules of the engine here are read off this sheet alone. Later sheets, and Babbage’s own description of the engine of December 1837, may need others; each sheet is to be run on the rules of its own date.",
      "That another operation destroys the mill’s table comes from the remark; no row of this sheet tests it. That a transfer complements is Rojas’s explanation of operations 8 to 10; the sheet shows only Ca going out and a coming back.",
      "The “about ten turns of the hand” is quoted and not checked: how long a table took to make is not on this sheet.",
      "The transcription was made from the Museum’s scans, in one session. The scans are linked so that it can be checked.",
      "Two readings by Rojas, of 2017 and 2023, have been read, and a short search made; Bromley’s paper of 2000 on the programmer’s interface was found and not read. That the cover dates No. 2 a day later, and the sign of operation 12, were not found in what was read. Nothing here is claimed as new.",
    ], principle: "A program that writes down every cell can be run again. Where it agrees, the machine was understood; where it does not, that is the place to look." },
    { kind: "question", text: "Do the other 26 sets run as written, and when does the engine they need change?", status: "OPEN", detail: "L/004 to L/007 eliminate three and four unknowns, L/008 to L/010 tabulate polynomials by differences, L/017 and L/018 compute the radius vector of an ellipse. Each is to be run on the rules of its own date, and every rule a sheet needs that BAB/L/001 does not show will be dated where it first appears." },
  ],
  sources: [
    { title: "C. Babbage, “Notations of Calculation”, No. 1 (4 August 1837) and No. 2 (5 August 1837), BAB/L/001, the Babbage Papers, Science Museum Group", url: SHEET, note: "Three images: the cover, the opened sheet with both tables, and the back with the definition of the complement. Read at full resolution from the Museum’s image service." },
    { title: "Notations of calculations for the Analytical Engine, BAB/L, Science Museum Group", url: SERIES, note: "“27 sets of notations consisting of 36 sheets”, 1836–1840. The catalogue’s titles are Allan Bromley’s." },
    { title: "R. Rojas, “The first computer program”, arXiv:2303.13740, 2023; Communications of the ACM, 2024", url: ROJAS, note: "A reading of BAB/L/001. Read in its arXiv version." },
    { title: "R. Rojas, “Die Computerprogramme von C. Babbage”, Informatik-Spektrum 40(3), 2017", url: ROJAS_2017, note: "The programs of Series L, listed by date, and the rules of the engine they show: destructive reading, complements, separate operation and variable cards." },
    { title: "chrishayuk/analytical-engine", url: REPO, note: "The transcription, the engine, the checks, a tutorial, a language server, the editor extension and the playground." },
    { title: "Reconstruction, 25 November 2026", note: "The transcription and the run. Every result in this note can be rerun on the interactive study or with cargo test in the repository." },
  ],
};
