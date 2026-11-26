import type { ReactNode } from "react";
import type { PublicationRecord } from "@/lib/types";
import { StudyMeasures, StudySequence } from "@chrishayuk/hause/components/exhibition/Study";
import { NotebookEntry } from "./NotebookEntry";
import { Acts } from "./Acts";

const L017 = "https://collection.sciencemuseumgroup.org.uk/documents/aa110001665";
const L018 = "https://collection.sciencemuseumgroup.org.uk/documents/aa110001666";
const CREDIT = "SCIENCE MUSEUM GROUP COLLECTION";

/** A detail of a sheet, credited to where it came from. */
function Excerpt({ src, alt, width, height, caption, href }: { src: string; alt: string; width: number; height: number; caption: ReactNode; href: string }) {
  return <figure className="babbage-excerpt">
    <img src={`/media/notebook/babbage/${src}`} alt={alt} width={width} height={height} loading="lazy"/>
    <figcaption className="record-voice">{caption} · {CREDIT} · <a href={href}>THE SCANS ↗</a></figcaption>
  </figure>;
}

/** The note in pictures: the three sheets, the row where each one parts from the others, and what a strict run makes of it. */
export function BabbageRevisionsNotebook({ record }: { record: PublicationRecord }) {
  const act = (index: number) => <Acts acts={[record.body[index]]} anchored offset={index} staticRefusals/>;
  return <NotebookEntry record={record} className="babbage-notebook" chapters={[
    { label: "One program, three sheets", children: <>
      {act(0)}
      <StudySequence label="ONE FULL CYCLE OF THE PROGRAM, SIX OPERATIONS" steps={[
        { label: "+", value: "P + ΔP", detail: "The next P, by its constant difference." },
        { label: "+", value: "Δ²Q + Δ³Q", detail: "Q is a cubic in p, so its differences are stepped too." },
        { label: "+", value: "ΔQ + Δ²Q", detail: "The next first difference." },
        { label: "+", value: "Q + ΔQ", detail: "The next Q. This is the step that needs the Q before it." },
        { label: "÷", value: "P / Q", detail: "The ratio of one coefficient to the one before." },
        { label: "×", value: "(P / Q) · B", detail: "The next B. Starred on the sheets." },
      ]} note="The first cycle needs only four of these and the second five. Two operations to start, then 4 + 5 + 6 + 6 + 6, make the 29."/>
    </> },
    { label: "Run strictly", kind: "evidence", children: <>
      {act(1)}
      <StudyMeasures label="THE SAME 29 OPERATIONS, RUN STRICTLY" items={[
        { label: "L/017, 1 OCT 1838", value: "1 of 6", detail: "Coefficients right. 84 of 127 statements agree." },
        { label: "L/025, UNDATED", value: "6 of 6", detail: "Coefficients right. 89 of 93 statements agree." },
        { label: "L/018, 9 AUG 1841", value: "1 of 6", detail: "Coefficients right. 73 of 91 statements agree." },
      ]} note="babbage verify --strict. Run the ordinary way, going on with the sheet’s value, the counts are 118 of 127, 89 of 93 and 88 of 91."/>
    </> },
    { label: "L/017: a number lost", kind: "evidence", children: <>
      <Excerpt src="l017-ops-1-4.jpg" width={1600} height={418} href={L017}
        alt="The top of the table of BAB/L/017: columns No of Oper, Nature of Opern, the mill, and the store v1 to v9, headed P0, P0, ΔP, ΔP, an empty v5, Q0, 0, ΔQ0, 0. Operation 1, ÷ P0/Q0, writes 0 under v1 and 0 under v6. Operation 2, ×, (P0/Q0)·B6,6, starred. Operation 3, + P0 + ΔP, gives {P1} in v1 with 0 in v2 and v3. Operation 4, + Q0 + ΔQ0, writes 0 under v6 again, {Q1} in v7, 0 in v8 and ΔQ0 in v9."
        caption="BAB/L/017, OPERATIONS 1 TO 4: Q0 TAKEN FROM v6 AT 1, AND v6 READ AGAIN AT 4"/>
      {act(2)}
      <StudyMeasures label="L/017, STRICTLY, AGAINST THE COVER’S FORMULA" items={[
        { label: "Q1", value: "344", detail: "Should be 512: ΔQ0 added to an empty column." },
        { label: "B6,10", value: "540/301 · B6,6", detail: "Should be 135/112 · B6,6." },
        { label: "BABBAGE’S WORKING", value: "(288 + 72)/(168 + 344)", detail: "The right numbers, beside the table." },
      ]} note="babbage L017 --strict."/>
    </> },
    { label: "L/025: two columns", kind: "evidence", children: <>
      {act(3)}
    </> },
    { label: "L/018: a new fault", kind: "evidence", children: <>
      <Excerpt src="l018-ops-2-8.jpg" width={1200} height={792} href={L018}
        alt="Rows 2 to 8 of BAB/L/018’s table: No of Opn, a column of stars, Nature of Opn and the mill’s result. 2, starred, × (P0/Q0) × B6,6; 3, + P0 + ΔP; 4, + Q0 + ΔQ0; 5, × P1/Q1; 6, starred, ÷ (P1/Q1) × B6,8; 7, + P1 + ΔP; 8, + ΔQ0 + Δ²Q0."
        caption="BAB/L/018, ROWS 2 TO 8: × AT ROW 5 FOR A DIVISION, ÷ AT ROW 6 FOR A MULTIPLICATION"/>
      {act(4)}
    </> },
    { label: "Two mendings", children: <>
      {act(5)}
      {act(6)}
    </> },
    { label: "What this does not show", children: <>
      {act(7)}
      {act(8)}
    </> },
  ]}/>;
}
