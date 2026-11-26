import type { PublicationRecord } from "./types.ts";

/** A note about Babbage's yearly history sheets of the Analytical Engine,
 * BAB/N/001 to N/008 (1834 to 1841), set against what his programs of
 * Series L needed of the machine. Every date is from the linked
 * repository's history/chronology.txt and `babbage history`, and every count
 * from `babbage verify` and `babbage verify --strict`, at analytical-engine
 * bf2e583. */
const REPO = "https://github.com/chrishayuk/analytical-engine";
const N001 = "https://collection.sciencemuseumgroup.org.uk/documents/aa110000071";
const N007 = "https://collection.sciencemuseumgroup.org.uk/documents/aa110001796";
const L020 = "https://collection.sciencemuseumgroup.org.uk/documents/aa110001682";
const SERIES = "https://collection.sciencemuseumgroup.org.uk/documents/aa110000020/notations-of-calculations-for-the-analytical-engine";

export const babbageHistoryRecord: PublicationRecord = {
  id: "N-BABBAGE-HISTORY",
  slug: "a-slip-in-babbages-program-was-an-order-recorded-the-month-before",
  kind: "notebook",
  title: "A slip in Babbage’s program of July 1840 was an order he had given the mill in June.",
  dek: "Babbage kept a history of his engine, a sheet a year from 1834 to 1841. Set against what his programs needed, it runs both ways: some parts were recorded years before a program used them, others used years before he recorded them, and none of the programs is in it.",
  abstract: "A note about the history sheets of Charles Babbage’s Analytical Engine, BAB/N/001 to N/008 in the Science Museum, one ruled sheet a year from September 1834 to December 1841, a row for each month and a column for each part of the machine. A coding agent transcribed them from the Museum’s scans, and each capability that a model of the engine needs to run Babbage’s programs of Series L was set against the entries that bear on it: when the history records it, and when a program first uses it. The order runs both ways. Multiplication by a table is recorded on 12 March 1835 and repetition on 7 March 1836, years before a program uses them; a backing apparatus for the cards is used in June 1838 and recorded in February 1839, and complements are used in August 1837 and an apparatus for them recorded in December 1839. One disagreement changes its reading: the last operation of BAB/L/020, 31 July 1840, writes “−e/∂ = z”, which no order of a division gives, and had been counted a slip. The history for June 1840 records an “Order to Mill to give out the Result of any opern with its sign changed”. With that, L/020 agrees in all 148 statements, and a strict run solves its equations. The history’s column for notations records none of the programs.",
  created: "2026-11-26",
  version: "0.1",
  status: "OPEN",
  publication: "draft",
  authors: ["Chris Hay"],
  lineage: "BAB/N/001–008 → SCANS → AGENT → TRANSCRIPTIONS → EACH CAPABILITY DATED → AGAINST SERIES L, RUN",
  concepts: ["ai-agents", "source-authority", "verification", "programming-languages"],
  related: ["N-BABBAGE", "N-BABBAGE-REVISIONS", "N-NINE-CHAPTERS"],
  media: [],
  body: [
    { kind: "observation", label: "01 / A HISTORY KEPT BY THE MONTH", text: "Babbage kept a “History” of the Analytical Engine: one ruled sheet a year, a row for each month, and a column for each part of the machine: Addition, Carriage, Stepping, Counting, Selectors, Groupings, General Plans, Barrels, Miscellaneous Contrivances, Notations, Division and Principles. Eight sheets survive in the Science Museum, BAB/N/001 to N/008, covering September 1834 to December 1841, some with pencil drafts marked “Copied”. On the back of the draft for 1834 to 1836 he wrote the key to its numbers: “Figures after the description denote the day of the month”, and “Figures at the end of each column denote the number of the drawing or notation referred to”. So an entry such as “Plans for Cards 18 64” means the 18th of the month, drawing 64. A coding agent transcribed all eight from the Museum’s scans.", references: [
      { label: "BAB/N/001, with the 1834–1836 draft, Science Museum Group", url: N001 },
    ] },
    { kind: "observation", label: "02 / TWO RECORDS SIDE BY SIDE", text: "Running Babbage’s programs of Series L, 1837 to 1841, needs a model of the engine with particular capabilities: reading a column leaves it at zero, the mill keeps a table of multiples, a number can be laid in a column as its complement, cards can be backed and repeated. For each, the history entries that bear on it were quoted and dated, and marked as conceived (the idea recorded), designed (a drawing number given) or revised. Each was also marked direct, if the entry is about the capability itself, or related, if it is about something the capability depends on. The date a capability is first used is not taken from the history: it is the first program whose run needs it. So the two dates come from two independent records: what Babbage wrote down about his machine, and what his programs asked of it." },
    { kind: "observation", label: "03 / RECORDED FIRST", text: "Some capabilities are in the history long before a program uses them. “Plan of Mult. by Table”, on 12 March 1835, is the table of multiples the mill keeps, which the first program of 4 August 1837 depends on. “To repeat an Opn any variable No of times”, on 7 March 1836, is the repetition of BAB/L/023, the looped program of 7 June 1838. “Two sets of variable cards to save the necessity of a great number of Cards for Comb. Analys.”, on 18 November 1837, and “Combinatorial Cards”, on 11 December 1837, are the letter cards and combinatorial cards L/023 runs on, about six months later. And “Plans for Cards”, with drawing 64, is dated 18 June 1838: eleven days after L/023." },
    { kind: "observation", label: "04 / USED FIRST", text: "Others appear in a program first. L/023’s cover describes the apparatus, Y and Z, that backs its cards to the start of a group, in June 1838; the history first names a “Card backing App.” in February 1839, eight months later. L/011, of 28 August 1837, adds more than two numbers at once; “Principles of Compound Addn” is recorded in July 1838, eleven months later. The second program of BAB/L/001, on 5 August 1837, lays numbers in the store as their complements; the history records a “Selecting App. for number and Comp.” in December 1839, more than two years later, with only a related entry before it. So the first surviving evidence of a capability is not the date it was thought of, in either direction." },
    { kind: "observation", label: "05 / THE SLIP THAT WAS NOT", text: "BAB/L/020, dated 31 July 1840, reduces three equations to two and those to one, ∂z + e = 0, and solves it. Its last operation is a division, written in the mill column as “−e/∂ = z”. Its cards take ∂ and then e, and neither order of a division gives −e/∂; the value it names is right. It had been counted as a slip of the pen, like the subtraction of BAB/L/001 that writes −c − ax. The history for 1840, in June, under Miscellaneous Contrivances, has: “Order to Mill to give out the Result of any opern with its sign changed p. 406 V.IV”. With that order given to the engine, L/020 agrees in all 148 of the statements the run checks, its variable cards and their running count included, and a strict run, which never takes the sheet’s value, reaches z = −e/∂ and finds that it solves the three equations. A month separates the record and the program." },
    { kind: "observation", label: "06 / THE NOTATIONS ARE NOT IN THE HISTORY", text: "The history has a column headed Notations. In every year from 1834 to 1841 it is empty but for one entry, “Division by Stepping up to top of Engine”, in November 1840, with no number. Elsewhere the sheets record a “Notation for Div.n” in February 1835, on the draft, and a “Notation of Formulæ” in August 1836. None of the 27 sets of notations of Series L, from August 1837 on, is recorded, nor any of the programs on them. Several capabilities the programs need have no entry at all: transfers between columns, copying a number into a second column, giving off a number and retaining it, moving a number during an operation, and the store worked as a difference engine. Their only evidence is the programs. The history follows the design of the machine; it does not follow its programs." },
    { kind: "connection", text: "The chronology is a text file in the repository, every entry quoted with its sheet and date, and the comparison is a command that can be run again.", links: [
      { href: `${REPO}/blob/main/docs/chronology.md`, label: "The capabilities against the history sheets" },
      { href: `${REPO}/blob/main/history/chronology.txt`, label: "Every entry, quoted, dated and marked direct or related" },
      { href: `${REPO}/blob/main/sources/notes/N007.md`, label: "BAB/N/007, the history for 1840, transcribed" },
      { href: `${REPO}/blob/main/sources/notes/N001.md`, label: "BAB/N/001 and the draft of 1834–1836, with the key" },
      { href: `${REPO}/blob/main/docs/discrepancies.md`, label: "The 49 disagreements of Series L, as leads" },
      { href: "/notebook/babbage-wrote-one-program-three-times", label: "One program written three times, run strictly" },
    ] },
    { kind: "refusal", title: "WHAT THIS DOES NOT SHOW", lines: [
      "The history sheets are Babbage’s own summary, copied fair from drafts written up later; the 1834 draft covers three years and the 1837 draft two. They are not a complete record, and an entry’s date is where Babbage placed it, not necessarily when the idea first came.",
      "Whether an entry bears directly on a capability or is only related to it is a judgement made here. Each judgement is in the file with the quotation it rests on, so that it can be checked and disagreed with.",
      "The first surviving evidence of a capability is not its date of invention. A program that uses something first shows that Babbage had it by then, not that he had just thought of it.",
      "That the June order is what L/020’s last operation relies on is a reading. It fits the sign, the date and the cards; the sheet does not cite the history, and the history does not cite the sheet.",
      "The transcriptions were made by a coding agent from the Museum’s scans and have not been checked by a person. The pencil draft of 1834 to 1836, which gives the date of “Plan of Mult. by Table” and the key, was read below the scan’s full resolution after the image service refused requests for a time.",
      "Six of the programs are undated and are not placed. Bromley and Collier, who worked through the Babbage Papers, were not read for this. Nothing here is claimed as new.",
    ], principle: "Two records of one machine, kept for different reasons, check each other. Where they disagree on order, neither is wrong; where a program looks wrong, the other record may say why." },
    { kind: "question", text: "Are any of the other slips in the programs capabilities the history records?", status: "OPEN", detail: "Of the 2672 statements of Series L the run checks, 2623 agree. The 49 that do not come from 18 causes, now kept as leads. Two look most like machine behaviour: row 35 of L/007 (August 1837), which has the shape of a result given out with its sign changed three years before the history records it, and operation 12 of L/001’s second program, which writes −c − ax." },
  ],
  sources: [
    { title: "C. Babbage, “History: beginning of September 1834 to the end of December 1834”, with the pencil draft “1834, 5, 6”, BAB/N/001, the Babbage Papers, Science Museum Group", url: N001, note: "The fair copy, its cover and the folder; the draft, its cover marked “Copied”, and its back, with the key to the figures. The draft was read below full resolution." },
    { title: "C. Babbage, “History”, 1840, BAB/N/007, the Babbage Papers, Science Museum Group", url: N007, note: "The cover and the opened sheet, every written cell read at full resolution. The June entry under Miscellaneous Contrivances." },
    { title: "BAB/N/002 to N/006 and N/008, the history sheets for 1835 to 1839 and 1841, the Babbage Papers, Science Museum Group", note: "Documents aa110000072, aa110000073, aa110001793 to aa110001795 and aa110001797, with the drafts N 1837 [a] and N 1839 [a]." },
    { title: "C. Babbage, “Notation of the Reduction of the Three Equations … with the solution”, No 20, 31 July 1840, BAB/L/020, the Babbage Papers, Science Museum Group", url: L020, note: "The second table’s last operation, “÷ −e/∂ = z”, and the variable cards beside every row." },
    { title: "Notations of calculations for the Analytical Engine, BAB/L, Science Museum Group", url: SERIES, note: "The programs the history is set against." },
    { title: "chrishayuk/analytical-engine", url: REPO, note: "The transcriptions of Series N and Series L, history/chronology.txt, and the commands babbage history and babbage history pages. The counts here are from babbage verify and babbage verify --strict at commit bf2e583." },
    { title: "Coding-agent sessions, 25 and 26 November 2026", note: "The transcriptions, the chronology and the runs were made in these sessions. The crops shown were fetched from the Museum’s image service." },
  ],
};
