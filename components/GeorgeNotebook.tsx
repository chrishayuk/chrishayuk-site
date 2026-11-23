import type { ReactNode } from "react";
import type { PublicationRecord } from "@/lib/types";
import { StudyMeasures, StudySequence } from "@chrishayuk/hause/components/exhibition/Study";
import { NotebookEntry } from "./NotebookEntry";
import { Acts } from "./Acts";
import Link from "next/link";
import { GeorgeRunner } from "./GeorgeRunner";

const ARCHIVE = "https://www.uraone.com/computers/deuce/deucdocs.html";

const FORMULA = "3 (a) ; 4 (b) ; 5 (c) ;\na b + c × (P) ;";
const SUBROUTINE = "R R 6 ↓ (P) ;                       # main program\n]                                   # end of main program\n* 6 dup × rev dup × + .5 pow ]      # subroutine";
const COMMA = "2 (x) ;\n4.3, 16 x - ÷ (P) ;       # with the comma\n4.3 16 x - ÷ (P) ;        # without it";
const TRUTH = "2, 1 > (P) ;      # truth\n1, 2 > (P) ;      # falsehood\n0 ~ (P) ;         # not falsehood\n1 neg ~ (P) ;     # not truth";
const REP = "5, 5 rep (j) j (P) ; ]";
const SIMPSON_DATA = "0\n0.5\n1\n2\n4\n";
const simpson = (n: number) => `1, ${n} ÷ 0|(s) 16|(s) 2 × 1, 7 rep (j) j 2 ×|(s) ]
2 × 0, 7 rep (j) j 2 × 1 +|(s) ] ;
1, 5 R|(a)                       # read in values a1 ... a5
1, 5 rep (i) i|a (a) ;           # repeat with a = a1 ... a5 in turn
0, 0, 16 rep (j)                 # mark acc. space with zero, j from 0 to 16
j 4 ÷ 1 + (x)                    # calculate argument
dup × 2 ÷ neg exp x a × neg exp 1 + ÷   # calculate integrand
j|s × + ]                        # multiply by Simpson coefficient and add
i|(r) ; ]                        # store result; end outer repeat
1, 5 P|(r)                       # punch results`;

/** A detail of a scanned page, credited to the document and page it came from. */
function Excerpt({ src, alt, width, height, caption, narrow }: { src: string; alt: string; width: number; height: number; caption: ReactNode; narrow?: boolean }) {
  return <figure className={narrow ? "george-excerpt george-excerpt-narrow" : "george-excerpt"}>
    <img src={`/media/notebook/george/${src}`} alt={alt} width={width} height={height} loading="lazy"/>
    <figcaption className="record-voice">{caption} · <a href={ARCHIVE}>THE SCANS ↗</a></figcaption>
  </figure>;
}

/** The note in pictures: the pages it rests on, and the language running where it is described. */
export function GeorgeNotebook({ record }: { record: PublicationRecord }) {
  const act = (index: number) => <Acts acts={[record.body[index]]} anchored offset={index} staticRefusals/>;
  return <NotebookEntry record={record} className="george-notebook" chapters={[
    { label: "Three documents", children: <>
      <Excerpt src="manual-1958-title.jpg" width={1100} height={1144} narrow
        alt="The first page of the manual: GEORGE, IA and II, a semi-translation programming scheme for DEUCE, Programming and Operation Manual. Prepared by C. L. Hamblin, University of New South Wales."
        caption="MANUAL, FIRST PAGE"/>
      <p className="george-play-link record-voice"><Link href="/demos/george">OPEN THE GEORGE PLAYGROUND ↗</Link><span>Write a G-program and step through its accumulator.</span></p>
      {act(0)}
    </> },
    { label: "Twelve cells", children: <>
      <Excerpt src="manual-p5-running-accumulator.jpg" width={1200} height={972}
        alt="The manual's picture of the running accumulator: a row of cells, with a in cell 1, then b in cell 2, then a+b in cell 1 after the plus sign."
        caption="MANUAL, P. 2 (PDF P. 5) / THE RUNNING ACCUMULATOR"/>
      {act(1)}
      <StudySequence label="(a + b) × c, IN G-CODE" steps={[
        { label: "a", value: "3", detail: "Into the first empty cell, cell 1." },
        { label: "b", value: "3  4", detail: "Into cell 2." },
        { label: "+", value: "7", detail: "The last two cells are added, cleared, and the sum put in cell 1." },
        { label: "c", value: "7  5", detail: "Into cell 2." },
        { label: "×", value: "35", detail: "The last two cells multiplied. The result is as if a single number had been written." },
      ]} note="(a) stores the last cell in a and leaves it there; ; cancels it; (P) punches it on a card."/>
      <GeorgeRunner label="TRY IT / RUN, THEN STEP THROUGH THE CELLS" program={FORMULA}
        note="Step back to the start and watch cells 1 and 2. Change c × to c ÷, or add a sixth number, and run it again."/>
      <Excerpt src="manual-p13-twelve-cells.jpg" width={1210} height={340}
        alt="Section 1.9 (i) of the manual: The accumulator is limited to 12 cells. This is more than enough for all normal calculations; but a program which demands more cells may be written inadvertently, e.g. by omitting a cancel sign in a repetitive operation."
        caption="MANUAL, P. 10 (PDF P. 13) / SECTION 1.9 (i)"/>
      <GeorgeRunner label="A SUBROUTINE, FROM SECTION 1.7" program={SUBROUTINE} data={"3\n4"}
        note="The manual’s subroutine 6: the square root of the sum of the squares of the last two cells. 6 ↓ skips to mark 6 and links back at its ]."/>
    </> },
    { label: "Example 3", kind: "evidence", children: <>
      <Excerpt src="manual-p11-example-3-simpson-vector.jpg" width={1240} height={830}
        alt="Example 3 as printed: the Simpson vector with the values 1/48, 4/48, 2/48, 4/48, ... 1/48, the preliminary program that prepares it beginning 1, 48 divide, and the main part of the program, ending with punch results."
        caption="MANUAL, P. 8 (PDF P. 11) / EXAMPLE 3, THE SIMPSON VECTOR AND THE PROGRAM"/>
      {act(2)}
      <StudyMeasures label="THE INTEGRAL FOR a = 0" items={[
        { label: "AS PRINTED, 1/48", value: "0.0497078", detail: "What the program punches." },
        { label: "WITH 1/12", value: "0.198831", detail: "The same program with 12 for 48." },
        { label: "SIMPSON’S RULE, DOUBLE PRECISION", value: "0.198831", detail: "The same 17 ordinates, worked outside GEORGE." },
      ]} note="The ratio is four for every value of a. The trace of either run is about 2,300 symbols."/>
      <GeorgeRunner label="EXAMPLE 3 AS PRINTED" program={simpson(48)} data={SIMPSON_DATA}
        note="The five values of a are on the data cards. Each result is a quarter of the integral."/>
      <GeorgeRunner label="EXAMPLE 3 WITH 1/12" program={simpson(12)} data={SIMPSON_DATA}
        note="Only the first line differs."/>
    </> },
    { label: "The comma", children: <>
      <Excerpt src="manual-p21-coding-table.jpg" width={1000} height={1500} narrow
        alt="Appendix I, the GEORGE coding table: sixteen rows and the columns 0 to 8 and 15. The digits 0 to 9 are each a symbol of their own in column 2, and the comma is in column 0, row 1."
        caption="MANUAL, P. 18 (PDF P. 21) / APPENDIX I, THE CODING TABLE"/>
      {act(3)}
      <GeorgeRunner label="4.3 / (16 − x), WITH THE COMMA AND WITHOUT" program={COMMA}
        note="Without the comma, 4.3 16 is one number, 4.316, and the ÷ finds only one cell to work on. The machine stopped there, and so does this."/>
    </> },
    { label: "The flow diagrams", kind: "evidence", children: <>
      <Excerpt src="flow-diagram-p26-rep-first-entry.jpg" width={900} height={1141} narrow
        alt="Flow diagram page 26, rep, first entry: a column of DEUCE instructions, two calls of fetch integer, and a call of store link list, with no branch on the way."
        caption="FLOW DIAGRAMS, P. 26 / REP, FIRST ENTRY"/>
      {act(4)}
      <GeorgeRunner label="A REPETITION FROM 5 TO 5" program={REP}
        note="The body is obeyed once. With a greater than b it would be obeyed tens of thousands of times."/>
      <Excerpt src="flow-diagram-p22-relations-and-logic.jpg" width={1000} height={1175}
        alt="Flow diagram page 22, relations and logical operations: the routines for not, and, or, equals and greater than, with corrections in the routines for equals and greater than."
        caption="FLOW DIAGRAMS, P. 22 / RELATIONS AND LOGICAL OPERATIONS"/>
      <GeorgeRunner label="TRUTH, FALSEHOOD, AND THEIR COMPLEMENTS" program={TRUTH}
        note="Truth is −1, the sign digit alone. ~ complements every digit, so neither result is 0 or −1, though each still acts correctly in a skip."/>
    </> },
    { label: "The coding sheets", children: <>
      <Excerpt src="coding-sheet-21-sin-cos-coefficients.jpg" width={445} height={980} narrow
        alt="Coding sheet 21, DL8, track 15/13, minor cycles 0 to 13. At minor cycles 1, 3, 5, 7 and 13 the instruction fields hold six numbers each, written as constants: 12, 7, 3, 22, 16, 24 point 2, and so on."
        caption="CODING SHEET 21 / DL8, TRACK 15/13"/>
      {act(5)}
      <StudyMeasures label="SHEET 21, MINOR CYCLES 1, 3, 5, 7 AND 13" items={[
        { label: "M.C. 1", value: "−1.2337005", detail: "−(π/2)²/2! is −1.2337006." },
        { label: "M.C. 3", value: "+0.2536693", detail: "+(π/2)⁴/4! is +0.2536695." },
        { label: "M.C. 5", value: "−0.0208627", detail: "−(π/2)⁶/6! is −0.0208635." },
        { label: "M.C. 7", value: "+0.00091768", detail: "+(π/2)⁸/8! is +0.00091926." },
        { label: "M.C. 13", value: "−0.0000238", detail: "−(π/2)¹⁰/10! is −0.0000252." },
      ]} note="Read as signed words at 30 binary places. P31 at minor cycle 31 is the 1.0 the polynomial starts from."/>
    </> },
    { label: "Pending", children: <>{act(6)}</> },
    { label: "Run it yourself", kind: "operate", children: <>{act(7)}</> },
    { label: "What this does not show", children: <>
      {act(8)}
      {act(9)}
    </> },
  ]}/>;
}
