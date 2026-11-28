import type { PublicationRecord } from "./types.ts";

/** A note about Babbage's mechanical notation of January 1836 (Series F of the
 * Babbage Papers): what his B and U labels do, tested by predictions frozen
 * before the motion marks of held-out sheets were read. Every number is from
 * the linked repository, as of commit 6c9f9cf; each document is linked. */
const REPO = "https://github.com/chrishayuk/analytical-engine";
const BLOB = `${REPO}/blob/6c9f9cf`;
const SMG = "https://collection.sciencemuseumgroup.org.uk/documents";

export const babbageSeriesFRecord: PublicationRecord = {
  id: "N-BABBAGE-SERIES-F",
  slug: "babbages-1836-timing-charts-describe-persistent-connections-not-single-movements",
  kind: "notebook",
  title: "Babbage’s 1836 timing charts describe connections that persist, not single movements.",
  dek: "In January 1836 Babbage charted, row by row, how every axis of his engine moved. Read as connections to travelling platforms that last until released, his B and U labels predicted the motions of sheets nobody here had read, across division and square root.",
  abstract: "A note about Series F of the Babbage Papers at the Science Museum: the mechanical notation of January 1836, timing charts in which each column is a part of the engine and each row a moment of its cycle. Many columns carry labels, “B 3”, “U 5”, at the head of a band of rows. Read here, as a hypothesis, as a part being bolted to travelling platform 3, or unbolted from platform 5: the platforms are in Babbage’s notebooks of 1835, and he writes “Lock … to Pl. 4” in December 1835. Built from the multiplication sheets, the reading was tested twice on sheets held out from it, with rules and predictions committed before the motion marks were read by a reader not shown them. In the second test, on four sheets of division without a table, four of square root, the ordinary cycle and the notation of carriage, a fresh “B k” moved its part 173 times out of 173, the right way 168 times. Parts attached by an earlier B, with no label of their own, moved 37 times out of 43, every time the right way; a reading in which only a fresh label moves a part gets 6. No part moved in a band where it had been released: 198 cases. The failures are reported as fully: parts with a bare “B”, and some with no label on their sheet at all, move too, by amounts outside the table, and the carriage sheet does not follow the table. A simulator executes the labels as state, band by band, and leaves unknown what the tests do not settle. What the motions do to numbers is not reconstructed.",
  created: "2026-11-28",
  version: "0.1",
  status: "OPEN",
  publication: "draft",
  authors: ["Chris Hay"],
  lineage: "THE CHARTS → B AND U → PLATFORMS → FROZEN PREDICTIONS → HELD-OUT SHEETS → SIMULATOR",
  concepts: ["source-authority", "verification", "programming-languages"],
  related: ["N-BABBAGE", "N-BABBAGE-CONTROL", "N-BABBAGE-NOTE-G"],
  media: [],
  body: [
    { kind: "observation", label: "01 / A CHART OF EVERY MOVING PART", text: "In January 1836 Babbage drew, for one operation after another (multiplication with and without a table, division, square root, the ordinary cycle, carriage), a chart of the engine’s motions. Each column is a part: an axis, a pinion, a figure wheel. Each row is a moment of the cycle. A short arrow in a row says the part moves up or down then, with a figure for how far; a double-headed arrow later in the band, its return. Many columns carry a label at the head of a band, “B 5”, “U 3”, “U 7 B 4”. Babbage does not say what B and U mean on these sheets.", references: [
      { label: "BAB/F/021, Division without table, 13 January 1836 (Science Museum Group)", url: `${SMG}/aa110000505` },
      { label: "The glossary of the notation, with confidence levels", url: `${BLOB}/docs/f-glossary.md` },
    ] },
    { kind: "observation", label: "02 / BOLTED TO A TRAVELLING PLATFORM", text: "The reading tested here: “B k” bolts the part to travelling platform k, and “U k” unbolts it; while bolted, the part moves as its platform moves. Babbage’s notebooks of 1835 describe “locking axes to travelling platforms”, platforms “which being raised” carry axes with them, and in December 1835 “Lock … to Pl. 4”. A drawing of 4 February 1836 is headed “Method of bolting to platforms for vertical motion of Axes”. The multiplication sheet of 5 January 1836 heads twelve platform columns with their lifts: platform 3 rises 1.1, platform 7 falls 0.2. The expansion of B and U is not written anywhere read here; the reading is of what the labels do.", references: [
      { label: "The audit of B and U, and the archive read for it", url: `${BLOB}/docs/f-bu-audit.md` },
      { label: "Travelling platforms, 1835–1836: the sources", url: `${BLOB}/sources/notes/platforms-1835-1836.md` },
    ] },
    { kind: "observation", label: "03 / TWO TESTS ON HELD-OUT SHEETS", text: "The reading was built from the multiplication sheets. Then it was tested on sheets it had not seen, twice. Each time, rules were committed first; a program turned the sheets’ labels into predictions, also committed; and only then did a reader who was shown neither read every column’s arrows. The first test, on table division, got every direction right (42 of 42) and the lift 38 times, but its fixed rule for when a part returns failed (18 of 30), and was dropped. The second test, on ten sheets of four kinds, added what the first suggested: a bolt lasts until a U. Its program was revised once, for the way it handled bare labels, before any arrow was read; both versions were scored.", references: [
      { label: "The rules of the second test, frozen", url: `${BLOB}/docs/predictions/held-out-2-rules.md` },
      { label: "Its scoring protocol, frozen", url: `${BLOB}/docs/predictions/held-out-2-protocol.md` },
      { label: "The first test’s result", url: `${BLOB}/docs/predictions/f015-f016-result.md` },
    ] },
    { kind: "observation", label: "04 / A FRESH B MOVES ITS PART", text: "Across division without a table, square root, the ordinary cycle and carriage, a part with a fresh “B k” moved in the band’s first row 173 times out of 173. It moved the way platform k goes 168 times, and by platform k’s lift in 145 of the 150 cases where a figure is written. Its return, later in the band, went the other way 123 times out of 124. A part carrying a U and no B did not move: 123 out of 123." },
    { kind: "observation", label: "05 / AND IT STAYS BOLTED", text: "The case that tells the readings apart is a part with no label in a band, bolted by a B in an earlier band and not unbolted since. If a label is a single instruction, it should stay still. If a bolt persists, it should move with its platform again. It moved 37 times out of 43: in division 14 of 16, in square root 21 of 24, in carriage 2 of 3. Where the paper ends inside the first row of a band, four more such parts show no arrow in what is visible; counted as not moving, it is 37 of 47. All 37 went the way of the platform bolted earlier; of the 29 with a figure, 28 by its lift. A part unbolted earlier and not bolted again never moved: 75 cases. Three of the six that did not move are on one square-root sheet, where the reader found U labels over exactly those columns that the list of labels had missed; they are scored as failures, as frozen.", references: [
      { label: "The result of the second test, every miss listed", url: `${BLOB}/docs/predictions/held-out-2-result.md` },
      { label: "The scores, as the scorer wrote them", url: `${BLOB}/docs/predictions/held-out-2-scores.md` },
    ] },
    { kind: "observation", label: "06 / WHAT FAILED", text: "Every part with a bare “B”, no number, moved (37 of 37), mostly by 0.45 or 0.3, lifts that are not among the twelve platforms of 5 January; the revised program had predicted they would not, and that fails. Parts move with no label on their sheet at all, 102 times, among them the same three columns in every band of three division sheets: a rule that an unlabelled part stays still fails, and the sheets are not self-contained. The carriage sheet does not follow the multiplication table: in the middle of its bands three “B 7”s go up, where platform 7 goes down. And when a part returns is not tested at all: no sheet numbers its platform columns. Read the other way, F/032’s “L k” behaves exactly as “B k” (5 of 5), as December 1835’s “Lock … to Pl. 4” would suggest." },
    { kind: "observation", label: "07 / A SIMULATOR OF THE LABELS", text: "The labels are executed as state: parts; numbered platforms, each with a displacement from a configuration; unknown resources, one for each bare B; bolts that persist until a U; and timed events, band by band, with the mid-band changes of the carriage sheet where they are written. What the tests support is marked supported. What they do not settle is left unknown rather than filled in: where a bare B goes, how far a carriage part moves, a part whose state at the start of a sheet is not known, what the Lock columns do, and when anything returns. Step through any held-out sheet and see each simulated motion beside what the reader transcribed.", references: [
      { label: "The simulator (scripts/f_sim.py)", url: `${BLOB}/scripts/f_sim.py` },
      { label: "Its model, entity by entity", url: `${BLOB}/docs/f-mech-model.md` },
    ] },
    { kind: "observation", label: "08 / HOW IT WAS CHECKED", text: "The rules (dc3bf1d), the protocol (1833752) and both versions of the predictions (64ca93e, 1732e2f) are in the repository’s history before the transcription (cdb7aac). The transcription is of full-resolution photographs of the sheets, every column of every band, by one reader shown none of them. Cropped and unreadable cells are counted and not scored. Some scoring choices were made after the transcription was seen (two column names, where the carriage sheet’s mid-band arrows are read, and its band-closing labels left unscored); they are listed in the result. An independent review of the scorer reproduced every count, and found that its first comparison of the models did not score exactly what the frozen predictions said; it was rescored as frozen, the open conventions are reported both ways, and the first figures stay in the history." },
    { kind: "connection", text: "Every prediction, every mark read, and every miss is in the repository.", links: [
      { href: `${BLOB}/docs/predictions/held-out-2-result.md`, label: "The second held-out result" },
      { href: `${BLOB}/sources/notes/F021-F033-arrows.md`, label: "The blind transcription, column by column" },
      { href: `${BLOB}/docs/predictions/held-out-2-predictions-v2.md`, label: "The frozen predictions (v2; v1 beside it)" },
      { href: `${SMG}/aa110000497`, label: "BAB/F/013, Table multiplication, 5 January 1836 (Science Museum Group)" },
      { href: "/notebook/where-babbages-1836-count-comes-from-decides-what-his-engine-could-compute", label: "The earlier note: what the Sketch Books’ control could compute" },
    ] },
    { kind: "refusal", title: "WHAT THIS DOES NOT SHOW", lines: [
      "What B and U stand for. “Bolt” and “unbolt” is a reading supported by what the labels do and by the platforms of 1835; the words are not written on the sheets read here.",
      "That the engine computes anything in these charts. No motion here has been turned into a digit; the arithmetic is not reconstructed.",
      "When a part returns. The rule that it returns with its platform could not be tested: no held-out sheet numbers its platform columns.",
      "What a bare B attaches to, what moves the unlabelled parts, or how the carriage sheet’s parts are driven. They are left unknown.",
      "That the transcriptions are final. They are one reader’s, from photographs, and have not been checked against the originals by a specialist. Nor is it claimed that nobody has read these charts this way before.",
    ], principle: "Freeze the prediction, then read the sheet." },
    { kind: "question", text: "If Babbage’s timing charts describe which parts are connected to which motions, and for how long, can the arithmetic be recovered by running them?", status: "OPEN", detail: "Open here: the return-with-platform rule, on a sheet that numbers its platforms; what a bare B attaches to; the carriage sheet’s own motions; the Lock columns; and what the motions do to the figure wheels." },
  ],
  sources: [
    { title: "Babbage Papers, Series F: mechanical notations, BAB/F/013–033 (January 1836), Science Museum Group", url: `${SMG}/aa110000505`, note: "Read from the Science Museum Group’s photographs, at full resolution. BAB/F/013 (aa110000497), F/021 (aa110000505), F/026 (aa110000510)." },
    { title: "Babbage Papers, Scribbling Books, Vol. II and Vol. XIII (1835–1836), Science Museum Group", url: `${SMG}/aa110001323`, note: "The travelling platforms and their locking, 1835; “Lock … to Pl. 4”, December 1835. Read in sources/notes/platforms-1835-1836.md." },
    { title: "C. Hay, analytical-engine (GitHub), commit 6c9f9cf", url: REPO, note: "The predictions, transcriptions, scorer, results and simulator." },
  ],
};
