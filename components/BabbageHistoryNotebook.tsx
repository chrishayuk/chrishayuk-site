import type { ReactNode } from "react";
import type { PublicationRecord } from "@/lib/types";
import { StudyMeasures } from "@chrishayuk/hause/components/exhibition/Study";
import { NotebookEntry } from "./NotebookEntry";
import { Acts } from "./Acts";

const N001 = "https://collection.sciencemuseumgroup.org.uk/documents/aa110000071";
const N007 = "https://collection.sciencemuseumgroup.org.uk/documents/aa110001796";
const L020 = "https://collection.sciencemuseumgroup.org.uk/documents/aa110001682";
const CREDIT = "SCIENCE MUSEUM GROUP COLLECTION";

/** A detail of a sheet, credited to where it came from. */
function Excerpt({ src, alt, width, height, caption, href, narrow }: { src: string; alt: string; width: number; height: number; caption: ReactNode; href: string; narrow?: boolean }) {
  return <figure className={narrow ? "babbage-excerpt babbage-excerpt-narrow" : "babbage-excerpt"}>
    <img src={`/media/notebook/babbage/${src}`} alt={alt} width={width} height={height} loading="lazy"/>
    <figcaption className="record-voice">{caption} · {CREDIT} · <a href={href}>THE SCANS ↗</a></figcaption>
  </figure>;
}

/** The note in pictures: the history's key, the two orders, and the June entry beside the July program. */
export function BabbageHistoryNotebook({ record }: { record: PublicationRecord }) {
  const act = (index: number) => <Acts acts={[record.body[index]]} anchored offset={index} staticRefusals/>;
  return <NotebookEntry record={record} className="babbage-notebook" chapters={[
    { label: "A history kept by the month", children: <>
      {act(0)}
      <Excerpt src="n001-draft-back-key.jpg" width={1600} height={222} href={N001}
        alt="Two lines of faint pencil on the back of the 1834–1836 draft: Figures after the description denote the day of the month. Figures at the end of each column denote the number of the drawing or notation referred to, with “the” and “or notation” written above the line."
        caption="BAB/N/001, THE BACK OF THE 1834–1836 DRAFT, READ BELOW FULL RESOLUTION"/>
    </> },
    { label: "Two records", children: <>
      {act(1)}
    </> },
    { label: "Recorded first", kind: "evidence", children: <>
      {act(2)}
      <StudyMeasures label="IN THE HISTORY BEFORE A PROGRAM USES IT" items={[
        { label: "TABLE OF MULTIPLES", value: "12 Mar 1835", detail: "“Plan of Mult. by Table”. First used by L/001, 4 Aug 1837." },
        { label: "REPETITION", value: "7 Mar 1836", detail: "“To repeat an Opn any variable No of times”. First used by L/023, 7 Jun 1838." },
        { label: "LETTER CARDS", value: "18 Nov 1837", detail: "“Two sets of variable cards”. First used by L/023, 7 Jun 1838." },
        { label: "CARD BACKING", value: "Dec 1837", detail: "Sketch Book Vol 3 pp 161–162, cited by the history. First used by L/023, 7 Jun 1838." },
      ]} note="babbage history. The dates of use are the first program whose run needs the capability."/>
    </> },
    { label: "Used first", kind: "evidence", children: <>
      {act(3)}
      <StudyMeasures label="IN A PROGRAM BEFORE THE HISTORY RECORDS IT" items={[
        { label: "MANY NUMBERS ADDED", value: "11 months", detail: "L/011, 28 Aug 1837; “Principles of Compound Addn”, Jul 1838." },
        { label: "COMPLEMENTS", value: "over 2 years", detail: "L/001 No. 2, 5 Aug 1837; “Selecting App. for number and Comp.”, Dec 1839." },
      ]} note="Where the history gives only a month, the gap is counted in months."/>
    </> },
    { label: "The slip that was not", kind: "evidence", children: <>
      <Excerpt src="n007-june-1840.jpg" width={700} height={260} href={N007} narrow
        alt="An entry in ink in the Miscellaneous Contrivances column of the history for 1840, in the June row: Order to Mill to give out the Result of any opern with its sign changed p. 406 V.IV."
        caption="BAB/N/007, THE HISTORY FOR 1840, JUNE"/>
      <Excerpt src="l020-last-division.jpg" width={1400} height={440} href={L020}
        alt="The foot of the second table of BAB/L/020: a bracketed group ending in × and a subtraction whose mill column reads ′γε − γ′ε = e; then, with its own bracket, ÷ with the mill column −e/∂ = z, and 0 written in the two columns it reads."
        caption="BAB/L/020, 31 JULY 1840, THE LAST OPERATION: ÷, −e/∂ = z"/>
      {act(4)}
      <StudyMeasures label="BAB/L/020, AGAINST THE RUN" items={[
        { label: "WITH THE JUNE ORDER", value: "148 / 148", detail: "Every statement the run checks." },
        { label: "VARIABLE CARDS", value: "225", detail: "The running count from No. 19, carried over, agrees." },
        { label: "STRICT", value: "z solves", detail: "z = −e/∂ satisfies the three equations." },
      ]} note="babbage verify and babbage verify --strict. The rule is dated: the mill may give out a result with its sign changed (BAB/N/007, June 1840)."/>
    </> },
    { label: "Not in the history", children: <>
      {act(5)}
      {act(6)}
    </> },
    { label: "What this does not show", children: <>
      {act(7)}
      {act(8)}
    </> },
  ]}/>;
}
