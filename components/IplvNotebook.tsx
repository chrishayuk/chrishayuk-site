import type { ReactNode } from "react";
import type { PublicationRecord } from "@/lib/types";
import { NotebookEntry } from "./NotebookEntry";
import { Acts } from "./Acts";
import Link from "next/link";
import { IplvRunner } from "./IplvRunner";
import { IplvMoments } from "./IplvMoments";

const MANUAL = "https://github.com/jeffshrager/ExecutableArchaeology/tree/main/IPL-V/manual";
const RM3731 = "https://github.com/jeffshrager/ExecutableArchaeology/tree/main/LogicTheorist";

/** The manual's own program of Part One, section 2 (examples/manual-f1.iplv in chrishayuk/ipl-v). */
const F1 = `EXAMPLE RUN OF F1, FROM THE MANUAL      9
IPL-V MANUAL, PART ONE, SECTION 2:      1
THE PROGRAM OF FIG. 1 AND FIG. 2.       1
                                        2 A                10
                                        2 B                10
                                        2 C                10
                                        2 E                10
                                        2 F                10
                                        2 K                10
                                        5       00
E1---EXECUTIVE ROUTINE.                 1
EXECUTE F1 WITH THE LIST K1             1
AS INPUT AND PRINT THE                  1
RESULTING OUTPUT LIST.                  1
Q=3 SAYS TRACE THIS ROUTINE.            1
                                          E1    13K1
EXECUTE F1 AND                                    F1
PRINT THE OUTPUT LIST.                            J151  0
                                        5       00
F1---PRODUCE AN OUTPUT LIST (0)         1
CONTAINING ONLY ONE OCCURRENCE OF       1
EACH DISTINCT SYMBOL ON THE INPUT       1
LIST (0). THE ROUTINE F1 IS             1
MARKED TO TRACE CONDITIONALLY WITH      1
Q=4 IN ITS FIRST INSTRUCTION.           1
CREATE AN EMPTY OUTPUT LIST.              F1    04J90
PRESERVE W0.                                    40W0
W0 HOLDS NAME OF OUTPUT LIST.                   20W0
LOCATE NEXT CELL OF INPUT LIST.           9-1     J60
GO TO 9-2 IF NO NEXT CELL.                      709-2
INPUT THE SYMBOL IN THE CELL.                   12H0
INPUT THE NAME OF THE OUTPUT LIST,              11W0
REVERSE THEIR POSITION IN H0, AND                 J6
ADD THE SYMBOL TO THE OUTPUT LIST                 J66   9-1
IF IT IS NOT ALREADY ON IT---           1
RETURN TO 9-1 IN EITHER CASE.           1
PUT THE NAME OF THE OUTPUT LIST           9-2   51W0
IN H0 AND RESTORE W0 BEFORE                     30W0    0
QUITTING.                               1
                                        5       01
THE LIST K1.                              K1      0
                                                  B1
                                                  C1
                                                  B1
                                                  A1
                                                  A1
                                                  B1    0
                                        5         E1
`;
/** R62 as printed on page 26, wrong Q and all (manual/03-r62.md in chrishayuk/ipl-v). */
const R62 = `R62 AS PRINTED ON PAGE 26               9
                                        2 L                10
                                        2 P                10
                                        2 R               100
                                        2 S                10
                                        5       00
PRESERVE W0, W1; (0) TO W0, (1) TO W1.    R62     J51
START (OR RESUME) SEARCH.                 9-1   10W1
LOCATE THE CELL HOLDING NEXT SYMBOL.              J60
POP W0 AND W1 WHEN NO MORE. QUIT H5-.           70J31
SAVE LOCATION TO RESUME SEARCH.                 20W1
INPUT THE NEW SYMBOL.                           12W1
INPUT SYMBOL BEING SOUGHT.                      11W0
TEST IF SYMBOLS MATCH.                            J2
RESUME SEARCH AT 9-1 IF NO MATCH.               709-1
LOCATION OF MATCHING SYMBOL TO H0.              11W1    J31
                                        5       00
                                          P0    10L1
                                                10S3
WHERE IS S3 ON L1.                                R62
                                                  J152  0
                                        5       01
                                          L1      0
                                                  S1
                                                  S2
                                                  S3    0
                                        5         P0
`;

/** A detail of a page of the manual, credited to the page it came from. */
function Excerpt({ src, alt, width, height, caption, narrow, source = [MANUAL, "THE SCANNED MANUAL"] }: { src: string; alt: string; width: number; height: number; caption: ReactNode; narrow?: boolean; source?: [string, string] }) {
  return <figure className={narrow ? "iplv-excerpt iplv-excerpt-narrow" : "iplv-excerpt"}>
    <img src={`/media/notebook/ipl-v/${src}`} alt={alt} width={width} height={height} loading="lazy"/>
    <figcaption className="record-voice">{caption} · <a href={source[0]}>{source[1]} ↗</a></figcaption>
  </figure>;
}

/** The note in pictures: the manual's own runs, and its programs running where they are described. */
export function IplvNotebook({ record }: { record: PublicationRecord }) {
  const act = (index: number) => <Acts acts={[record.body[index]]} anchored offset={index} staticRefusals/>;
  return <NotebookEntry record={record} className="iplv-notebook" chapters={[
    { label: "Symbols, not numbers", children: <>
      {act(0)}
      <Excerpt src="manual-xvi-lists.jpg" width={1101} height={1549} narrow
        alt="A page of the manual's introduction: a list drawn as four cells, 2233, 3111, 4010 and 6222, each with an arrow to the next and 0000 in the last, then the same list with 5333 inserted at the end and with its first item deleted, and the same items in consecutive cells for comparison."
        caption="IPL-V MANUAL, 1964, INTRODUCTION, P. XVI / A LIST, AND WHAT INSERTING AND DELETING DO TO IT"/>
      <IplvMoments label="A LIST, A COPY MADE FROM AVAILABLE SPACE, AND THE SPACE GIVEN BACK / THE DECK LISTS, RUNNING HERE" deck="lists" moments={[
        { label: "A list", steps: 0, show: "L1", note: "L1 before the program starts: a head, whose address is the list’s name, and four cells, S1 to S4, each with the address of the next. The order is in the links." },
        { label: "A copy, taken from available space", steps: 43, show: "131", note: "43 instructions in, the program is making a reversed copy. J90 took a head, cell 131, from available space; each J64 took another cell and linked it in just after the head, so S4 comes first. Available space is lower than before." },
        { label: "Given back", steps: 68, show: "L1", note: "It has printed the copy, erased it with J71 and halted. L1 is as it was, and every cell the copy used is back on available space: the count is what it was before the program began." },
      ]}/>
    </> },
    { label: "A machine nobody had", children: <>
      {act(1)}
      <p className="iplv-play-link record-voice"><Link href="/demos/ipl-v">STEP THE IPL COMPUTER ↗</Link><span>Start with its guided stops: a list, available space, the manual’s program, a theorem.</span></p>
    </> },
    { label: "One run, printed in full", children: <>
      <Excerpt src="fig-2-trace-of-f1.jpg" width={1278} height={1139}
        alt="Fig. 2 of the manual: a trace of 46 instructions in columns headed Level, CIA, H5, P, Q, SYMB, LINK, S, (0), Contents of (0) and H3, the count of cycles running from 5 to 70, and below it the output list 148: 0, B1, C1, A1."
        caption="IPL-V MANUAL, 1964, PART ONE, P. 23 / FIG. 2, TRACE OF E1 AND F1"/>
      {act(2)}
      <IplvMoments label="WHAT THE TRACED PROGRAM DOES / THE MANUAL’S F1, RUNNING HERE" deck="manual-f1" moments={[
        { label: "The input", steps: 0, show: "K1", note: "K1, the list F1 is given: B1 C1 B1 A1 A1 B1, in cells 136 to 141, where Fig. 1 puts them." },
        { label: "An empty output list", steps: 3, show: "145", note: "Three instructions in, J90 has made an empty output list. It is cell 145 here and 148 in Fig. 2; what the system of 1964 did with three more cells, the manual does not say." },
        { label: "The repeats removed", steps: 46, show: "145", note: "After 46 instructions, one for each line of Fig. 2, the output list is B1 C1 A1: each symbol goes on the end unless it is already there." },
      ]}/>
      <IplvRunner label="THE PROGRAM OF FIGS. 1 AND 2 / ITS TRACE MARKS ARE ITS OWN" deck={F1} open="manual-02-1"
        note="E1 has Q = 3 in its first instruction, which asks for a trace, and F1 has Q = 4, which passes it on. The last column is the count of cycles, as in the figure."/>
      {act(3)}
    </> },
    { label: "A theorem is a list structure", children: <>
      <Excerpt src="rm3731-p5-expression.jpg" width={1360} height={1870} narrow source={[RM3731, "THE SCANNED MEMORANDUM"]}
        alt="Page 5 of RAND RM-3731: the representation of expressions as IPL-V list structures, with Axiom *1.5 laid out as a total expression, its description list (Q15 tree form, Q7 external name), its main expression with I0 in the head, and the left and right subexpressions."
        caption="E. STEFFERUD, RAND RM-3731, 1963, P. 5 / AXIOM *1.5 AS LIST STRUCTURES"/>
      {act(4)}
      <Excerpt src="lt-2-01-in-storage.jpg" width={763} height={590} source={["/demos/ipl-v", "THE MACHINE"]}
        alt="The playground's list structure panel: *201 with cells 9-4250 and 9-4251; 4250, the description list, with Q15, Q15, Q7 and the name *2.01; 4251 with I0, 9-4418 and 9-4424; 4418 with I0, P0 and 9-4422; 4424 and 4422 each with -0 and P0."
        caption="THIS RECONSTRUCTION, STEFFERUD’S DECK STOPPED AT M70 FOR THE NINTH TIME / THEOREM *2.01 IN STORAGE"/>
      <Excerpt src="lt-2-01-description-list.jpg" width={763} height={582} source={["/demos/ipl-v", "THE MACHINE"]}
        alt="The same structure at TO PROVE: the description list 4250 now begins Q4 with the value 3, Q3 with 1 and Q2 with 4, before Q15, Q15, Q7 and *2.01."
        caption="THE SAME, AT TO PROVE / Q2 = 4, Q3 = 1, Q4 = 3 ON ITS DESCRIPTION LIST"/>
      <p className="iplv-play-link record-voice"><Link href="/demos/ipl-v">SEE IT YOURSELF ↗</Link><span>The deck is not ours to publish; the machine’s fifth guided stop says how to open it from Moews’s transcription.</span></p>
    </> },
    { label: "The Logic Theorist of 1963", children: <>
      {act(5)}
    </> },
    { label: "The manual writes its own processes", children: <>
      <Excerpt src="fig-11-j101.jpg" width={1048} height={1273} narrow
        alt="The first page of Fig. 11: the code of J101 in IPL, with comments headed Set up, Find next cell, Obtain next sublist, Execute subprocess and Diagnose current cell."
        caption="IPL-V MANUAL, 1964, PART ONE, P. 80 / FIG. 11, J101"/>
      {act(6)}
      <Excerpt src="fig-3-trace-of-r3.jpg" width={1484} height={976}
        alt="Fig. 3 of the manual: 27 of the 151 steps of a recursive search, with columns Level, Step, H1, Instruction, H5, H0 and W0. At step 87 the search is four levels down."
        caption="IPL-V MANUAL, 1964, PART ONE, P. 34 / FIG. 3, TRACE OF R3"/>
      <p className="iplv-play-link record-voice"><Link href="/demos/ipl-v?deck=manual-04-1">STEP R3 TO STEP 87 ↗</Link><span>Four levels down, in the machine.</span></p>
    </> },
    { label: "A mistake printed on purpose", children: <>
      {act(7)}
      <IplvRunner label="R62 AS PRINTED ON PAGE 26 / FIND THE WRONG Q" deck={R62} open="manual-03-1"
        note="The answer should be the cell that holds S3. It is W1. The wrong Q is at 9-1: the manual says it should be 11W1."/>
    </> },
    { label: "Run it yourself", kind: "operate", children: <>{act(8)}</> },
    { label: "What this does not show", children: <>
      {act(9)}
      {act(10)}
    </> },
  ]}/>;
}
