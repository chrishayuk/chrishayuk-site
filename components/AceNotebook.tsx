import type { PublicationRecord } from "@/lib/types";
import { StudyMeasures, StudySequence } from "@chrishayuk/hause/components/exhibition/Study";
import { NotebookEntry } from "./NotebookEntry";
import { Acts } from "./Acts";
import { AceRunner } from "./AceRunner";
import { AceDelayLine } from "./AceDelayLine";
import { AceCardsFigure, AceQuoted, AceWordFigure, CALPOL_PRINTED, INDEXIN_PRINTED } from "./AceFigures";

const ANSWER = "# Six times seven, punched on a card.\nANSWER\n  1   DL 1,1 - TS 2\n  3   DL 1,2 - TS 3\n  5   MULTIPLY 'A'\n  6   TS 4 - DL 2,1\n  8   O, DL 2\n  9   B, ANSWER 9\n\nDL 1,1   6\nDL 1,2   7\n";
const TRIAL = "# INDEXIN fetches the minor cycle whose position is in TS 27 into TS 28.\n# Here it fetches the 1945 kept in DL 3,5, and the job punches it.\nTRIAL\n  1   B, BURY\n  2   B, INDEXIN\n  3   TS 28 - DL 2,1\n  5   O, DL 2\n  6   B, TRIAL 6\n\nTS 27   DL 3,5\nDL 3,5  1945\n";
const POLY = "# cards: listing\n# CALPOL: x^3 - 2x + 5 at x = 7. The sixteen coefficients lie in DL 3\n# in pairs, highest power first; the last four are 1, 0, -2, 5.\nPOLY\n  1   B, BURY\n  2   B, CALPOL\n  3   TS 25 - TS 13\n  5   B, BURY\n  6   B, BINDEC\n  7   O, DL 10\n  8   B, POLY 8\n\nTS 13    7\nDL 3,25  +1\nDL 3,29  -2\nDL 3,31  +5\n";
const ASK = "# DISCRIM: if TS 8 contains any digit 1, TS 15 goes to TS 24, otherwise\n# TS 16. TS 8 has one digit 1, in digit 32, so the card should say 1.\nASK\n  1   B, BURY\n  2   B, DISCRIM\n  3   TS 24 - DL 2,1\n  5   O, DL 2\n  6   B, ASK 6\n\nTS 8    0000,0000,0000,0000,0000,0000,0000,0001\nTS 15   +1\nTS 16   +0\n";

/** The note in pictures: the machine, the two printed tables, and the tables running where they are described. */
export function AceNotebook({ record }: { record: PublicationRecord }) {
  const act = (index: number) => <Acts acts={[record.body[index]]} anchored offset={index} staticRefusals/>;
  return <NotebookEntry record={record} className="ace-notebook" chapters={[
    { label: "A computer on paper", children: <>
      {act(0)}
      <StudyMeasures label="THE MACHINE THE REPORT PROPOSES" items={[
        { label: "DELAY LINES", value: "200", detail: "“Room for 200 delay lines”, each a tube of mercury about five feet long (sections 3 and 10)." },
        { label: "DIGITS IN EACH", value: "1,024", detail: "32 minor cycles of 32 digits, one digit a microsecond." },
        { label: "TEMPORARY STORAGES", value: "32", detail: "Short delay lines of one minor cycle each, TS 1 to TS 32 (section 12)." },
        { label: "ESTIMATED COST", value: "£11,200", detail: "Delay lines, valves, power supply and Hollerith equipment (section 10)." },
      ]} note="Figures from the report. The simulation has the 200 delay lines and 32 temporary storages; it does not have valves."/>
    </> },
    { label: "Memory that goes round", children: <>
      <AceDelayLine/>
      {act(1)}
    </> },
    { label: "An instruction is 32 digits", children: <>
      <AceWordFigure/>
      {act(2)}
      <StudySequence label="ONE INSTRUCTION, FROM POPULAR FORM TO MACHINE" steps={[
        { label: "POPULAR FORM", value: "TS 28 - TS 18", detail: "What Turing writes in a table: move the content of TS 28 to TS 18." },
        { label: "TWO STAGES", value: "TS 28 - TS 6 ; TS 6 - TS 18", detail: "Every transfer goes through TS 6, “the shunting station”: a type M and a type N." },
        { label: "MACHINE FORM", value: "0000,0010,0001,1100,0000,…", detail: "Digits 5-8 are 0010, type M. Digits 10-14 are 00111: 28, least significant digit first." },
        { label: "ITS PLACE", value: "DL 32,1 AND DL 32,3", detail: "The assembler gives every instruction a place, two minor cycles after the one before." },
      ]} note="The assembler numbers the tables of a job as section 7 says, then fills in every reference to another table."/>
      <AceRunner label="A JOB, IN MACHINE FORM" program={ANSWER} args={["tables", "-"]}
        note="Each line is an instruction: its detail figure, where it lies, its 32 digits, and its popular form read back from the digits. Change the job and run it again. Hover over an instruction to see its digits in the editor."/>
      <AceRunner label="THE SAME JOB, RUN" program={ANSWER} args={["run", "-", "--time"]}
        note="The card is punched as a number. 42."/>
    </> },
    { label: "One table, printed twice", children: <>
      <AceQuoted text={INDEXIN_PRINTED} caption="INDEXIN IN POPULAR FORM, AS PRINTED. TURING, PROPOSED ELECTRONIC CALCULATOR, 1945, SECTION 13, P. 29"/>
      <AceCardsFigure/>
      {act(3)}
    </> },
    { label: "INDEXIN on the machine", kind: "evidence", children: <>
      <AceRunner label="INDEXIN FETCHES A NUMBER. TICK THE BOX FOR THE TABLE AS PRINTED" program={TRIAL} printed startPrinted
        note="As printed, the machine stops waiting for a card it was never meant to read. Untick the box for the table with its three corrections: it punches 1945."/>
      <StudyMeasures label="INDEXIN, FETCHING THE 1945 IN DL 3,5" items={[
        { label: "AS PRINTED", value: "FAILS", detail: "Fetches nothing and stops, waiting for a card." },
        { label: "FROM THE CARDS OF FIG. 38", value: "FAILS", detail: "The same." },
        { label: "THREE CORRECTIONS", value: "1945", detail: "Back after 71 instructions." },
        { label: "WITHOUT THE TYPE CODE", value: "FAILS", detail: "It stores the instruction it built over the number it was sent for." },
        { label: "WITHOUT THE HALF", value: "FAILS", detail: "Fetches nothing and stops." },
        { label: "WITHOUT UNBURY", value: "FAILS", detail: "Fetches 1945, then never finds its way back." },
      ]} note="Each row is one run of the simulation. `ace audit` in the repository prints all of them."/>
      {act(4)}
    </> },
    { label: "CALPOL", kind: "evidence", children: <>
      <AceQuoted text={CALPOL_PRINTED} caption="CALPOL, AS PRINTED. TURING, PROPOSED ELECTRONIC CALCULATOR, 1945, SECTION 13, P. 31"/>
      <AceRunner label="CALPOL WORKS OUT x³ − 2x + 5 AT x = 7, WHICH IS 334" program={POLY} printed
        note="Corrected, it punches 334 after about six seconds of machine time. Tick the box and it runs until the simulator’s limit on instructions stops it."/>
      {act(5)}
    </> },
    { label: "The tables he only described", children: <>
      {act(6)}
      <AceRunner label="DISCRIM, ASKED ABOUT A WORD WHOSE ONLY 1 IS DIGIT 32" program={ASK} printed startPrinted
        note="Done as the outline says, DISCRIM answers 0: no digit 1. Untick the box for the corrected table, which answers 1."/>
    </> },
    { label: "Run it yourself", kind: "operate", children: <>{act(7)}</> },
    { label: "What this does not show", children: <>
      {act(8)}
      {act(9)}
    </> },
  ]}/>;
}
