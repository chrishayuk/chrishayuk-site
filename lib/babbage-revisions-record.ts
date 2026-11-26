import type { PublicationRecord } from "./types.ts";

/** A note about the three versions of one program for the Analytical
 * Engine, the elliptic radius vector of BAB/L/017 (1 October 1838), L/025
 * (undated, pencil) and L/018 (a fair copy of 9 August 1841), each run as
 * written with the machine never taking the sheet's value. Every count is
 * from the linked repository: `babbage verify`, `babbage verify --strict`
 * and `babbage L017 --strict`, at analytical-engine bf2e583. */
const REPO = "https://github.com/chrishayuk/analytical-engine";
const L017 = "https://collection.sciencemuseumgroup.org.uk/documents/aa110001665";
const L018 = "https://collection.sciencemuseumgroup.org.uk/documents/aa110001666";
const L025 = "https://collection.sciencemuseumgroup.org.uk/documents/aa110001734";
const SERIES = "https://collection.sciencemuseumgroup.org.uk/documents/aa110000020/notations-of-calculations-for-the-analytical-engine";
const ROJAS_2017 = "https://www.mi.fu-berlin.de/inf/groups/ag-ki/publications/Computerprogramme-Babbage/Computer-Programme-von-Babbage.pdf";

export const babbageRevisionsRecord: PublicationRecord = {
  id: "N-BABBAGE-REVISIONS",
  slug: "babbage-wrote-one-program-three-times",
  kind: "notebook",
  title: "Babbage wrote one program three times. Run as written, only the undated pencil copy is right.",
  dek: "The elliptic radius vector, in 29 operations, on three sheets of 1838 to 1841. The first loses a number it needs again; two later versions keep it in two different ways, and the fair copy of 1841 swaps the signs of two operations.",
  abstract: "A note about three versions of one program in Charles Babbage’s notations of calculations for the Analytical Engine: BAB/L/017, dated 1 October 1838; BAB/L/025, undated and in pencil; and BAB/L/018, dated 9 August 1841 and headed “Copied from Not. No 17”. Each computes the coefficients B6,8 to B6,18 of the elliptic radius vector in 29 operations, and the mill column is the same in all three, row for row. Each was transcribed by a coding agent from the Museum’s scans and run on a model of the engine that never takes the sheet’s value when the two differ. L/017 divides by Q0 at operation 1 and gives it back to no column, then reads it again at operation 4; run so, five of its six coefficients are wrong, and 84 of its 127 statements agree. L/025 holds P0 and Q0 in two columns each from the start and gets all six right. L/018 mends the lost Q0 another way, by giving it to a second column at operation 1, but writes × at row 5 and ÷ at row 6, each the other’s sign; run so, five of six are wrong again. Which order the sheets were written in is not settled, and whether the swap ever reached the cards cannot be known from the sheet.",
  created: "2026-11-26",
  version: "0.1",
  status: "OPEN",
  publication: "draft",
  authors: ["Chris Hay"],
  lineage: "BAB/L/017, L/025, L/018 → SCANS → AGENT → TRANSCRIPTIONS → THE SAME ENGINE → RUN STRICTLY → THREE OUTCOMES",
  concepts: ["ai-agents", "source-authority", "verification", "programming-languages"],
  related: ["N-BABBAGE", "N-BABBAGE-HISTORY", "N-ATLAS-AUTOCODE"],
  media: [],
  body: [
    { kind: "observation", label: "01 / ONE PROGRAM, THREE SHEETS", text: "Three sheets among Babbage’s notations of calculations for the Analytical Engine carry the same program: the coefficients B6,8 to B6,18 of the elliptic radius vector, each found from the one before by multiplying by a ratio P/Q of two polynomials, which the mill steps forward by their differences. Each takes 29 operations, and the mill column is the same in all three, row for row. BAB/L/017 is in ink, “No 17”, dated 1 October 1838. BAB/L/025 is in pencil, headed “Algebraic Notation”, with no number and no date. BAB/L/018 is in ink, dated 9 August 1841, and says of itself “Copied from Not. No 17 Dated 1 Oct. 1838”. What differs is how each keeps its numbers in the store, and its slips. A coding agent transcribed all three from the Museum’s scans, and each was run on the same model of the engine.", references: [
      { label: "BAB/L/017, Science Museum Group", url: L017 },
      { label: "BAB/L/025, Science Museum Group", url: L025 },
      { label: "BAB/L/018, Science Museum Group", url: L018 },
    ] },
    { kind: "observation", label: "02 / RUN STRICTLY", text: "An ordinary run, where the sheet and the operation differ, notes the difference and goes on with the sheet’s value, so that one slip is one disagreement. A strict run never does. It keeps the value the operation gives, and when a row reads a number from a column, it takes whatever that column actually holds, not what the sheet says it holds. So a strict run counts what a slip would do to everything after it, as a machine fed these cards would have done it. Run that way, the three sheets come apart. Of their six coefficients, L/017 gets B6,8 right and the other five wrong; L/025 gets all six right; L/018 gets B6,8 right and the other five wrong. Right means equal to the value the cover’s own formula gives. Of the statements each sheet makes, 84 of 127 agree for L/017, 89 of 93 for L/025, and 73 of 91 for L/018." },
    { kind: "observation", label: "03 / L/017: A NUMBER LOST", text: "Operation 1 divides P0 by Q0. Q0 goes from v6 to the mill, v6 is left at 0, and Q0 is given back to no column. Operation 4 adds ΔQ0 to Q0, and reads Q0 from v6, which by then holds nothing. On the sheet, v6 is written 0 at operation 1 and 0 again at operation 4. Run as written, the machine adds ΔQ0 to 0, so Q1 comes out as 344 instead of 512, short by Q0 = 168, and every Q after it is short by the same. B6,10 comes out as (540/301)B6,6 against the right (135/112)B6,6. Babbage’s own working beside the table writes (288 + 72)/(168 + 344) for the same step. The right number was in his working; it was not in the program." },
    { kind: "observation", label: "04 / L/025: TWO COLUMNS FROM THE START", text: "The pencil sheet starts with P0 in v1 and v2 and Q0 in v5 and v6. The division at operation 1 takes one copy of each, and at operation 4 Q0 is still in the store. All six coefficients come out right, with every P, Q and difference. Its four disagreements all come from one row: row 5 writes B6,10 into v18 and v19 a row early, where row 6, which makes it, writes it again. That is a slip in the writing of the table, not in what the machine computes. L/025 also keeps each new B in a fresh pair of columns, and its last division keeps neither P5 nor Q5, since nothing needs them again." },
    { kind: "observation", label: "05 / L/018: MENDED, AND A NEW FAULT", text: "The fair copy “from Not. No 17” mends the lost Q0 differently from L/025: at operation 1, as Q0 goes to the mill, it is laid again in v6, and operation 4 reads it there. But rows 5 and 6 carry each other’s signs. Row 5, whose mill column is the division P1/Q1, is marked ×; row 6, whose mill column is the multiplication (P1/Q1) × B6,8, is marked ÷. Every other division row and every other starred row has the right sign. Taken as the cards, row 5 multiplies, giving P1·Q1 = 184320 for P1/Q1, and every B from B6,10 on is wrong. Row 20 writes “ΔQ2 + ΔQ2” in the mill column for ΔQ2 + Δ²Q2; the columns hold the right numbers, so it changes nothing. The copy also keeps the signs of the Bs in a column beside the table (“B6,6 has a −”, “B6,8 .. +”), where L/017 writes its products without them." },
    { kind: "observation", label: "06 / TWO MENDINGS OF ONE FAULT", text: "The same fault is handled three ways: not at all on L/017, by a second column from the start on L/025, and by a copy at operation 1 on L/018. Two different mendings of one lost number is what correcting a program looks like. But neither later sheet says it corrects anything. L/018 is dated nearly three years after L/017, and in mending one fault it makes another. L/025’s arrangement is not the one L/018 copies, so L/018 was not made from L/025. Rojas (2017) dates L/025 to October 1838; the sheet itself has no date." },
    { kind: "connection", text: "Each sheet is a text file in the repository that runs as written; the strict run of each, and what each difference rests on, can be done again.", links: [
      { href: `${REPO}/blob/main/docs/revisions.md`, label: "The three versions, side by side" },
      { href: `${REPO}/blob/main/docs/discrepancies.md`, label: "The 49 disagreements of Series L, as leads" },
      { href: `${REPO}/blob/main/sources/notes/L017.md`, label: "L/017: what was read, and what was hard to read" },
      { href: `${REPO}/blob/main/sources/notes/L025.md`, label: "L/025: transcription notes" },
      { href: `${REPO}/blob/main/sources/notes/L018.md`, label: "L/018: transcription notes" },
      { href: "/notebook/babbage-reordered-a-program-to-save-ten-turns-of-the-hand", label: "The earlier note: Babbage’s programs of August 1837, run as written" },
    ] },
    { kind: "refusal", title: "WHAT THIS DOES NOT SHOW", lines: [
      "The order of the three. L/025 is undated and in pencil. That it stands between L/017 and L/018, or after both, is not settled by the sheets.",
      "That L/018’s swap was ever on the cards. The table may be the only place it was made. Whether a card list for No. 18 survives would decide it; it was not looked for in this work.",
      "That Babbage knew of the lost Q0. His working for B6,10 has the right numbers; nothing on any of the three sheets says a fault was found or corrected.",
      "That the strict run is how the engine would have behaved in every detail. It is a model with the rules the sheets show, and the same rules for all three; where it reads an empty column, a real machine may have done something else.",
      "The transcriptions were made by a coding agent from the Museum’s scans and have not been checked by a person. L/017’s table was read from tiles reduced by about a tenth, and L/018’s working beside the table in overview only. The slips above should be confirmed on the manuscripts before anything is built on them.",
      "Rojas (2017) lists these programs, and was read; Bromley’s accounts of the engine were not. Whether earlier readings note the lost Q0 or the swapped signs was not checked. Nothing here is claimed as new.",
    ], principle: "A copy is not a proof of the original. Run each version on the same machine, and the differences say where to look." },
    { kind: "question", text: "Do any cards for these programs survive, and do they carry L/017’s fault or L/018’s?", status: "OPEN", detail: "From 1840, L/019 to L/022 list their variable cards beside each row, and the cards of L/019 to L/021 agree with the run. The transcriptions of L/017, L/018 and L/025 record no card list. A list for either would say whether the fault was in the program or only in its writing out." },
  ],
  sources: [
    { title: "C. Babbage, “Notation For computing the elliptic radius vector by having the eccentricity and mean anomaly”, No 17, 1 October 1838, BAB/L/017, the Babbage Papers, Science Museum Group", url: L017, note: "Three images: the cover, with the formulas and the values at n = 6; the opened sheet, with the table of 29 operations and the working; the back, blank." },
    { title: "C. Babbage, “Algebraic Notation”, undated, BAB/L/025, the Babbage Papers, Science Museum Group", url: L025, note: "Two images: the outside and the opened sheet, all in pencil. Catalogued as “Tabulation of the elliptic radius vector from the eccentricity and the mean anomaly”." },
    { title: "C. Babbage, “Notation For Computing the Elliptic radius vector”, No 18, 9 August 1841, “Copied from Not. No 17 Dated 1 Oct. 1838”, BAB/L/018, the Babbage Papers, Science Museum Group", url: L018, note: "Three images. The working to the right of the table and the back were read in overview only." },
    { title: "Notations of calculations for the Analytical Engine, BAB/L, Science Museum Group", url: SERIES, note: "“27 sets of notations consisting of 36 sheets”, 1836–1840; the series runs to 1841 on the sheets themselves." },
    { title: "R. Rojas, “Die Computerprogramme von C. Babbage”, Informatik-Spektrum 40(3), 2017", url: ROJAS_2017, note: "The programs of Series L, listed by date; the date of October 1838 for L/025 is his." },
    { title: "chrishayuk/analytical-engine", url: REPO, note: "The transcriptions (corpus/L017.bab, L018.bab, L025.bab), the engine, the strict run and docs/revisions.md. The counts here are from babbage verify --strict at commit bf2e583." },
    { title: "Coding-agent sessions, 25 and 26 November 2026", note: "The transcriptions and the runs were made in these sessions. The crops shown were fetched from the Museum’s image service for this note." },
  ],
};
