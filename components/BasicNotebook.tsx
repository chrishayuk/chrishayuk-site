import type { ReactNode } from "react";
import type { PublicationRecord } from "@/lib/types";
import { StudyMeasures, StudySequence } from "@chrishayuk/hause/components/exhibition/Study";
import { NotebookEntry } from "./NotebookEntry";
import { Acts } from "./Acts";
import { BasicStudy } from "./BasicStudy";

const MANUAL = "https://www.dartmouth.edu/basicfifty/basicmanual_1964.pdf";

/** An excerpt from a page of the 1964 manual, credited to the page it came from. */
function Excerpt({ src, alt, width, height, caption }: { src: string; alt: string; width: number; height: number; caption: ReactNode }) {
  return <figure className="basic-excerpt">
    {/* eslint-disable-next-line @next/next/no-img-element -- a scanned page at its own size, not site photography */}
    <img src={`/media/notebook/basic/${src}`} alt={alt} width={width} height={height} loading="lazy"/>
    <figcaption className="record-voice">{caption} · <a href={MANUAL}>DARTMOUTH COLLEGE ↗</a></figcaption>
  </figure>;
}

/** A short program that can be changed and run where it sits. */
function Runner({ label, program, note }: { label: string; program: string; note: string }) {
  return <div className="basic-inline basic-runner">
    <BasicStudy source={{ title: label, program }}/>
    <p className="basic-runner-note">{note}</p>
  </div>;
}

/** Dartmouth BASIC in pictures: the pages the note quotes, and the language running where it is described. */
export function BasicNotebook({ record }: { record: PublicationRecord }) {
  const act = (index: number) => <Acts acts={[record.body[index]]} anchored offset={index} staticRefusals/>;
  return <NotebookEntry record={record} className="basic-notebook" chapters={[
    { label: "May 1964", children: <>
      <Excerpt src="manual-1964-title.jpg" width={1500} height={1230}
        alt="The title page: Dartmouth College Computation Center, the word BASIC written by hand, Beginners' All-purpose Symbolic Instruction Code, Instruction Manual, May 1964, First Draft."
        caption="INSTRUCTION MANUAL, MAY 1964 / TITLE PAGE"/>
      {act(0)}
      <Excerpt src="manual-1964-requirements.jpg" width={1340} height={1010}
        alt="The preface: the Dartmouth time-sharing system will enable 20 or more people to use the computer at the same time, followed by four requirements, the first being that it should be very easy to learn."
        caption="P. 1 / THE FOUR REQUIREMENTS"/>
    </> },
    { label: "The first program in print", kind: "operate", children: <>
      <Excerpt src="manual-1964-first-program.jpg" width={1340} height={370}
        alt="The end of the preface: as evidence we present, without any explanation, a program written entirely in BASIC. LET X = (7+8)/3, PRINT X, END."
        caption="P. 1 / “WITHOUT ANY EXPLANATION”"/>
      {act(1)}
    </> },
    { label: "Dartmouth BASIC in five lines", children: <>
      <Excerpt src="manual-1964-thirteen-operations.jpg" width={1360} height={800}
        alt="Page 4: the last instruction in any BASIC program is END; there are only 13 other operations. Below, the preface's program on a programming sheet, as instructions 10, 20 and 30."
        caption="P. 4 / “THERE ARE ONLY 13 OTHER OPERATIONS”"/>
      <StudySequence label="A NUMBER, AN OPERATION, AND WHAT IT APPLIES TO" steps={[
        { label: "LET", value: "10 LET X = (7+8)/3", detail: "Works out a formula and keeps the answer in a variable: one letter, or a letter and a digit." },
        { label: "PRINT", value: "20 PRINT X", detail: "Types the answer. Text in quotes is typed as it stands." },
        { label: "FOR … NEXT", value: "30 FOR N = 1 TO 5", detail: "Repeats every line down to NEXT N, with N counting up." },
        { label: "IF … THEN", value: "40 IF X > 4 THEN 90", detail: "Chooses the next line. GO TO does the same without asking." },
        { label: "READ / DATA", value: "50 READ A, B", detail: "Takes the next numbers from the DATA lines. That is how a program gets its numbers." },
      ]} note="DEF names a formula, DIM makes room for a list, and END is always last. That is most of the 1964 language."/>
      {act(2)}
      <Runner label="TRY IT / CHANGE IT AND RUN AGAIN" program={"10 FOR N = 1 TO 5\n20 LET S = N * N\n30 PRINT N, S\n40 NEXT N\n50 PRINT \"DONE\"\n60 END"}
        note="Change the 5 on line 10, or the formula on line 20: N↑3 is N cubed. Add a line 35 and it runs between 30 and 40, because the numbers are the order. The point after each whole number is how the 1964 results are printed."/>
    </> },
    { label: "The page prints its own answers", kind: "evidence", children: <>
      <Excerpt src="manual-1964-program-1.jpg" width={1300} height={840}
        alt="Page 21: Program number 1, nine lines that average the logarithms of 1 to 100, and its result: AVERAGE OF 100 LOGS, 1.5797, TIME: 3 SECS."
        caption="P. 21 / PROGRAM NUMBER 1 AND ITS RESULT"/>
      {act(3)}
      <StudyMeasures label="WHAT THE 1964 PAGES PRINT" items={[
        { label: "PROGRAM 1, P. 21", value: "1.5797", detail: "Average of the logarithms of 1 to 100. Three seconds in 1964." },
        { label: "PROGRAM 3, P. 23", value: ".837585", detail: "Root of a function, found by halving the step." },
        { label: "PROGRAM 3, LINE 30 CHANGED", value: ".693176", detail: "The manual changes one instruction and prints a new result." },
      ]} note="The programs below print these figures. A later BASIC prints the same numbers to nine places: 1.57970004."/>
      {act(4)}
    </> },
    { label: "What is not there", kind: "operate", children: <>
      {act(5)}
      <Excerpt src="manual-1964-program-3-change.jpg" width={1300} height={710}
        alt="Page 23: the result of program 3, ROOT = .837585, then: we can find the root of a different function by changing a single instruction. For example, 30 DEF FNF(Z) = EXP(X) -2. New result: ROOT = .693176."
        caption="P. 23 / “BY CHANGING A SINGLE INSTRUCTION”"/>
      {act(6)}
    </> },
    { label: "Checked against later BASICs", kind: "evidence", children: <>
      {act(7)}
      <StudyMeasures label="WHAT IT HAD BEEN CHECKED AGAINST" items={[
        { label: "ITS OWN TESTS", value: "88", detail: "Written by the agent that wrote the interpreter. All passed." },
        { label: "LISTINGS FROM 1978", value: "103", detail: "From BASIC Computer Games. Every one loads and runs unchanged." },
        { label: "PROGRAMS ON A SECOND INTERPRETER", value: "22", detail: "Print the same as PC-BASIC, byte for byte." },
      ]} note="Every one of these is a BASIC from fourteen years or more after the manual."/>
      {act(8)}
    </> },
    { label: "Line 40", kind: "evidence", children: <>
      <Excerpt src="manual-1964-program-2-line-40.jpg" width={1300} height={492}
        alt="Page 21: Program number 2. Line 40 reads LET T = SQR(D) / (2 * A), before lines 50 and 60 test whether D is zero or negative."
        caption="P. 21 / PROGRAM NUMBER 2, LINES 5–60"/>
      {act(9)}
      <Excerpt src="manual-1964-functions.jpg" width={1360} height={415}
        alt="Page 5: there are 10 special functions available in BASIC. The last line reads SQR(A) stands for the square root of A, where the square-root is always taken of the absolute value of A."
        caption="P. 5 / THE TEN FUNCTIONS"/>
      <Excerpt src="manual-1964-program-2-result.jpg" width={1270} height={730}
        alt="Page 22: the result of program 2. Two real roots, one root, and for 1, 0, 2: COMPLEX ROOTS, imaginary part = 1.41421."
        caption="P. 22 / THE RESULT, AS PRINTED IN 1964"/>
      <StudyMeasures label="PROGRAM 2, THIRD SET OF NUMBERS, ON THREE BASICS" items={[
        { label: "THE 1964 PAGE", value: "1.41421", detail: "The square root of the absolute value of −8, over 2." },
        { label: "PC-BASIC, AS GW-BASIC", value: "ERROR", detail: "“Illegal function call in 40”. In a later BASIC the square root of a negative number is an error." },
        { label: "THIS INTERPRETER, AT FIRST", value: "ERROR", detail: "“Illegal function call: SQR”, in line 40. It had been checked against later BASICs, and agreed with them." },
      ]} note="The first is on the page above. The second is not runnable here. The third is, below: run it, then switch on AS IN 1964."/>
      {act(10)}
    </> },
    { label: "What this does not show", children: <>
      {act(11)}
      {act(12)}
    </> },
  ]}/>;
}
