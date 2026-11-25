import type { ReactNode } from "react";
import type { PublicationRecord } from "@/lib/types";
import { StudyMeasures, StudySequence } from "@chrishayuk/hause/components/exhibition/Study";
import { NotebookEntry } from "./NotebookEntry";
import { Acts } from "./Acts";
import Link from "next/link";
import { BabbageRunner } from "./BabbagePlayground";

const SHEET = "https://collection.sciencemuseumgroup.org.uk/documents/aa110000065";
const CREDIT = "SCIENCE MUSEUM GROUP COLLECTION";

/** Two multiplications by a with a subtraction between: the table of a is
 * gone, and so is a. Moving the subtraction to the end puts it right. */
const TRY = `Sheet try it
No. 0
Letters a b c d
Store v1 = a, v2 = b, v3 = c, v4 = d
Working v5 v6 v7
Op 1  ×  | ab   | v1 0, v2 0, v5 ab   | v5 = v1·v2
Op 2  −  | ab-c | v3 0, v5 0, v6 ab-c | v6 = v5-v3
Op 3  ×  | ad   | v4 0, v7 ad         | v7 = v1·v4
`;

/** A detail of the sheet, credited to where it came from. */
function Excerpt({ src, alt, width, height, caption, narrow }: { src: string; alt: string; width: number; height: number; caption: ReactNode; narrow?: boolean }) {
  return <figure className={narrow ? "babbage-excerpt babbage-excerpt-narrow" : "babbage-excerpt"}>
    <img src={`/media/notebook/babbage/${src}`} alt={alt} width={width} height={height} loading="lazy"/>
    <figcaption className="record-voice">{caption} · {CREDIT} · <a href={SHEET}>THE SCANS ↗</a></figcaption>
  </figure>;
}

/** The note in pictures: the sheet, and its programs running where the note describes them. */
export function BabbageNotebook({ record }: { record: PublicationRecord }) {
  const act = (index: number) => <Acts acts={[record.body[index]]} anchored offset={index} staticRefusals/>;
  return <NotebookEntry record={record} className="babbage-notebook" chapters={[
    { label: "Two programs on one sheet", children: <>
      <Excerpt src="cover.jpg" width={777} height={900} narrow
        alt="The cover of BAB/L/001, in Babbage’s hand: No. 1, 4 Aug 1837, elimination of x between the equations ax + by + c = 0 and a′x + b′y + c′ = 0, with x = (bc′ − b′c)/(b′a − ba′), 6 variables, 1 working, 7 occupied, great 5, small 2, total 7 operations; then No. 2, Aug. 5, elimination of x and y, 6 variables, 3 working, 9 occupied, great 7, small 6, total 13."
        caption="BAB/L/001, THE COVER"/>
      {act(0)}
    </> },
    { label: "The notation in five cells", children: <>
      <StudySequence label="ONE ROW OF NO. 1, READ ACROSS" steps={[
        { label: "THE STORE", value: "v1 = a … v6 = c′", detail: "Columns of figure wheels, one number each. The six coefficients start in v1 to v6; v7 is a working variable." },
        { label: "THE OPERATION", value: "2   ×   b′c", detail: "The number of the operation, what kind, and what the mill makes." },
        { label: "TAKEN", value: "v3   0", detail: "A column whose number goes to the mill is left at zero. Babbage writes the 0." },
        { label: "GIVEN", value: "v1   b′c", detail: "The column that receives the result, and what it now holds." },
        { label: "THE FORMULA", value: "v₁′ = v₅·v₃", detail: "The same operation in the variables. The accent says this is the first new number v1 has been given." },
      ]} note="Every row of both programs is written like this, so every row can be done again and checked."/>
      <Excerpt src="no1-table.jpg" width={1600} height={706}
        alt="The table of No. 1: columns headed Numbers of Operations, Nature of oper., variables in Mill, and the Store, v1 to v7, under +ax +by +c and +a′x +b′y +c′. Seven rows: × b′a, × b′c, × ba′, × bc′, − bc′−b′c, − b′a−ba′, and ÷ (bc′−b′c)/(b′a−ba′) giving = x in v3, with 0 in each column a number is taken from."
        caption="BAB/L/001, NO. 1, 4 AUGUST 1837"/>
      <BabbageRunner label="NO. 1, RUN AS WRITTEN" page="L001-1" step={0}
        note="Step through the seven operations: each column read is left at zero, and each cell the sheet writes is checked."/>
    </> },
    { label: "Run as written", kind: "evidence", children: <>
      {act(1)}
      <StudyMeasures label="BAB/L/001, AGAINST THE RUN" items={[
        { label: "NO. 1, 4 AUGUST", value: "42 / 42", detail: "Every store cell, mill entry, formula, accent, composition and count." },
        { label: "NO. 2, 5 AUGUST", value: "80 / 81", detail: "The one that does not agree is operation 12." },
        { label: "ACCENTED NAMES", value: "53", detail: "Each names the number the run finds." },
      ]} note="The checks are tests in the repository, tests/corpus.rs, with probes that a changed cell is caught."/>
    </> },
    { label: "Ten turns of the hand", kind: "evidence", children: <>
      <Excerpt src="remark.jpg" width={1400} height={156}
        alt="Babbage’s remark under No. 1: It at first appeared that variables v7 and v3′ might have been saved by making b′a − ba′ at the fourth operation but this would have caused the table of b′ made in the third operation to be destroyed and it must have been recomputed in the operation for b′c thus causing the loss of about ten turns of the hand."
        caption="BAB/L/001, THE REMARK UNDER NO. 1"/>
      {act(2)}
      <BabbageRunner label="NO. 1, OPERATION 2: THE TABLE OF b′ USED AGAIN" page="L001-1" step={2}
        note="v5, which held b′, is at zero; the multiplicand comes from the table still standing in the mill."/>
      <BabbageRunner label="TRY IT / A TABLE DOES NOT SURVIVE ANOTHER OPERATION" page="L001-1" text={TRY} editable step={3}
        hint="Move the line Op 2 below Op 3: the table of a then serves both multiplications, and every statement agrees."
        note="A page of four lines, not Babbage’s: a·b, a subtraction, then a·d. As written it stops, because the subtraction destroys the table of a and v1 is empty. Edit it below the engine; it runs as you type."/>
    </> },
    { label: "The next day", kind: "evidence", children: <>
      <Excerpt src="back-complement.jpg" width={1200} height={166}
        alt="The back of BAB/L/001: 4 Augt 1837. C, C or C before any number signifies the Complement of that number as Ca means complement of a."
        caption="BAB/L/001, THE BACK OF THE SHEET"/>
      {act(3)}
      <StudyMeasures label="THE SAME ELIMINATION, A DAY APART" items={[
        { label: "OPERATIONS", value: "7 → 13", detail: "Three transfers to bring a, b and c back, and three operations to find y." },
        { label: "VARIABLES OCCUPIED", value: "7 → 9", detail: "Two more working variables, v8 and v9, to hold complements; v5 is used again for the third." },
        { label: "TABLES MADE", value: "2 → 3", detail: "The third is the table of a, for ax." },
      ]} note="The first two rows are the counts on the cover; the run counts the same. The tables are the run’s count."/>
      <BabbageRunner label="NO. 2, OPERATION 1: a TAKEN, AND ITS COMPLEMENT LAID IN v8" page="L001-2" step={1}/>
    </> },
    { label: "Accents name numbers", kind: "evidence", children: <>
      {act(4)}
      <BabbageRunner label="NO. 2, OPERATION 8: a BROUGHT BACK FROM ITS COMPLEMENT" page="L001-2" step={8} numbers
        note="With numbers: 2x + 3y − 8 = 0 and 5x − y − 3 = 0. Babbage writes this row v₁″ = v₁ = a."/>
    </> },
    { label: "Operation 12", kind: "evidence", children: <>
      <Excerpt src="no2-ops-11-13.jpg" width={1600} height={278}
        alt="Operations 11 to 13 of No. 2: 11 × ax, with 0 in v1 and v4 and ax in v5; 12 − −c−ax, with −c−ax in v1 and 0 in v3 and v5; 13 ÷ (−c−ax)/b, with 0 in v1 and v2 and = y in v5."
        caption="BAB/L/001, NO. 2, OPERATIONS 11 TO 13"/>
      {act(5)}
      <BabbageRunner label="NO. 2, OPERATION 12, AS WRITTEN" page="L001-2" step={12}
        note="The one statement of the sheet that does not agree. Step on: everything after it does."/>
    </> },
    { label: "Run it yourself", kind: "operate", children: <>
      {act(6)}
      <p className="babbage-play-link record-voice"><Link href="/demos/babbage?page=L001-2">OPEN THE ENGINE ↗</Link><span>Both programs, the sheet laid out as Babbage laid it, and the transcription to edit.</span></p>
    </> },
    { label: "What this does not show", children: <>
      {act(7)}
      {act(8)}
    </> },
  ]}/>;
}
