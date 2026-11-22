import type { ReactNode } from "react";
import type { PublicationRecord } from "@/lib/types";
import { NotebookEntry } from "./NotebookEntry";
import { Acts } from "./Acts";
import Link from "next/link";
import { IplvRunner } from "./IplvRunner";

const MANUAL = "https://github.com/jeffshrager/ExecutableArchaeology/tree/main/IPL-V/manual";

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
function Excerpt({ src, alt, width, height, caption, narrow }: { src: string; alt: string; width: number; height: number; caption: ReactNode; narrow?: boolean }) {
  return <figure className={narrow ? "iplv-excerpt iplv-excerpt-narrow" : "iplv-excerpt"}>
    <img src={`/media/notebook/ipl-v/${src}`} alt={alt} width={width} height={height} loading="lazy"/>
    <figcaption className="record-voice">{caption} · <a href={MANUAL}>THE SCANNED MANUAL ↗</a></figcaption>
  </figure>;
}

/** The note in pictures: the manual's own runs, and its programs running where they are described. */
export function IplvNotebook({ record }: { record: PublicationRecord }) {
  const act = (index: number) => <Acts acts={[record.body[index]]} anchored offset={index} staticRefusals/>;
  return <NotebookEntry record={record} className="iplv-notebook" chapters={[
    { label: "A machine nobody had", children: <>
      {act(0)}
      <p className="iplv-play-link record-voice"><Link href="/demos/ipl-v">STEP THE IPL COMPUTER ↗</Link><span>Watch a program take cells and give them back.</span></p>
    </> },
    { label: "One run, printed in full", children: <>
      <Excerpt src="fig-2-trace-of-f1.jpg" width={1278} height={1139}
        alt="Fig. 2 of the manual: a trace of 46 instructions in columns headed Level, CIA, H5, P, Q, SYMB, LINK, S, (0), Contents of (0) and H3, the count of cycles running from 5 to 70, and below it the output list 148: 0, B1, C1, A1."
        caption="IPL-V MANUAL, 1964, PART ONE, P. 23 / FIG. 2, TRACE OF E1 AND F1"/>
      {act(1)}
      <IplvRunner label="THE PROGRAM OF FIGS. 1 AND 2 / ITS TRACE MARKS ARE ITS OWN" deck={F1} open="manual-02-1"
        note="E1 has Q = 3 in its first instruction, which asks for a trace, and F1 has Q = 4, which passes it on. The last column is the count of cycles, as in the figure."/>
      {act(2)}
    </> },
    { label: "The Logic Theorist of 1963", children: <>
      {act(3)}
    </> },
    { label: "The manual writes its own processes", children: <>
      <Excerpt src="fig-11-j101.jpg" width={1048} height={1273} narrow
        alt="The first page of Fig. 11: the code of J101 in IPL, with comments headed Set up, Find next cell, Obtain next sublist, Execute subprocess and Diagnose current cell."
        caption="IPL-V MANUAL, 1964, PART ONE, P. 80 / FIG. 11, J101"/>
      {act(4)}
      <Excerpt src="fig-3-trace-of-r3.jpg" width={1484} height={976}
        alt="Fig. 3 of the manual: 27 of the 151 steps of a recursive search, with columns Level, Step, H1, Instruction, H5, H0 and W0. At step 87 the search is four levels down."
        caption="IPL-V MANUAL, 1964, PART ONE, P. 34 / FIG. 3, TRACE OF R3"/>
      <p className="iplv-play-link record-voice"><Link href="/demos/ipl-v?deck=manual-04-1">STEP R3 TO STEP 87 ↗</Link><span>Four levels down, in the machine.</span></p>
    </> },
    { label: "A mistake printed on purpose", children: <>
      {act(5)}
      <IplvRunner label="R62 AS PRINTED ON PAGE 26 / FIND THE WRONG Q" deck={R62} open="manual-03-1"
        note="The answer should be the cell that holds S3. It is W1. The wrong Q is at 9-1: the manual says it should be 11W1."/>
    </> },
    { label: "Run it yourself", kind: "operate", children: <>{act(6)}</> },
    { label: "What this does not show", children: <>
      {act(7)}
      {act(8)}
    </> },
  ]}/>;
}
