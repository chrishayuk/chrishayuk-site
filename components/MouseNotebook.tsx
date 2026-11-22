import type { ReactNode } from "react";
import type { PublicationRecord } from "@/lib/types";
import { StudyMeasures, StudySequence } from "@chrishayuk/hause/components/exhibition/Study";
import { NotebookEntry } from "./NotebookEntry";
import { Acts } from "./Acts";
import { MouseRunner } from "./MouseRunner";

const BYTE_1979 = "https://archive.org/details/byte-magazine-1979-07";
const BYTE_1980 = "https://archive.org/details/byte-magazine-1980-06";

/** An excerpt from a scanned magazine page, credited to the page it came from. */
function Excerpt({ src, alt, width, height, caption, href }: { src: string; alt: string; width: number; height: number; caption: ReactNode; href: string }) {
  return <figure className="mouse-excerpt">
    <img src={`/media/notebook/mouse/${src}`} alt={alt} width={width} height={height} loading="lazy"/>
    <figcaption className="record-voice">{caption} · <a href={href}>INTERNET ARCHIVE ↗</a></figcaption>
  </figure>;
}

/** The note in pictures: the pages it quotes, and the language running where it is described. */
export function MouseNotebook({ record }: { record: PublicationRecord }) {
  const act = (index: number) => <Acts acts={[record.body[index]]} anchored offset={index} staticRefusals/>;
  return <NotebookEntry record={record} className="mouse-notebook" chapters={[
    { label: "A language on a magazine page", children: <>
      <Excerpt src="byte-1979-title.jpg" width={1600} height={889} href={BYTE_1979}
        alt="The opening of the article: the title Mouse, A Language for Microcomputers, by Peter Grogono, above the first two columns of text."
        caption="BYTE, JULY 1979, P. 198"/>
      {act(0)}
    </> },
    { label: "Mouse in five lines", children: <>
      <StudySequence label="ALMOST EVERY INSTRUCTION IS ONE CHARACTER" steps={[
        { label: "PRINT", value: "\"Hello!\"", detail: "Quotes print text. An exclamation mark inside them is a new line." },
        { label: "CALCULATE", value: "3 4 + !", detail: "Numbers go on a stack. The operator comes last, and ! prints the result." },
        { label: "REMEMBER", value: "X 17 =   X.", detail: "A letter is where a variable lives. = stores there, and a dot fetches." },
        { label: "REPEAT", value: "( N. ^ … )", detail: "Brackets loop. ^ leaves the loop when the number is zero or less." },
        { label: "CALL", value: "#D,21;   $D %A 2 * @", detail: "A macro, its parameter, and its definition. Every call gets its own variables." },
      ]} note="That is nearly the whole language. A program ends with $$."/>
      <MouseRunner label="TRY IT / CHANGE IT AND RUN AGAIN" program={'"Counting down: "\nN 5 =\n( N. ^\n  N. ! " "\n  N N. 1 - = )\n"lift off!"\n$$'}
        note="The loop runs while N is above zero. N N. 1 - = is N = N − 1."/>
    </> },
    { label: "It matched", children: <>
      {act(1)}
      {act(2)}
    </> },
    { label: "Line 176", children: <>
      <Excerpt src="byte-1979-listing-176.jpg" width={1600} height={415} href={BYTE_1979}
        alt="Lines 169 to 179 of the Pascal listing. Line 175 reads MACRO : PARBAL := PARBAL - 1 and line 176 reads PARAM : PARBAL := PARBAL - 1."
        caption="BYTE, JULY 1979, P. 212 / LISTING 6, LINES 169–179"/>
      {act(3)}
      <Excerpt src="byte-1979-figure-1.jpg" width={1600} height={909} href={BYTE_1979}
        alt="Figure 1 of the article: the program #A,3; $A #B,%A; @ $B %A ! @ $$ beside a stack of four frames, two PARAM above two MACRO."
        caption="BYTE, JULY 1979, P. 216 / FIGURE 1"/>
      <MouseRunner label="THE PROGRAM IN FIGURE 1" program={"#A,3;\n\n$A #B,%A; @\n$B %A ! @\n$$"}
        note="With a plus on line 176 it prints 3. On the C interpreter, with the printed minus, it prints nothing."/>
    </> },
    { label: "A reader, two evenings", children: <>
      <Excerpt src="byte-1980-letter.jpg" width={1109} height={1600} href={BYTE_1980}
        alt="The start of Tom Lane's letter, headed Comment and Correction for Mouse, ending with the sentence that line 176 should have been PARAM: PARBAL := PARBAL + 1, a plus sign not a minus."
        caption="BYTE, JUNE 1980, P. 238"/>
      {act(4)}
      <Excerpt src="byte-1980-reply.jpg" width={1600} height={782} href={BYTE_1980}
        alt="Peter Grogono's reply: he commends Mr Lane for carefully reading the interpreter, and says the proof copy of listing 6 that he received was a poor photocopy."
        caption="BYTE, JUNE 1980, P. 240"/>
    </> },
    { label: "Thirty-three or one", kind: "evidence", children: <>
      <StudyMeasures label="LANE’S TEST ON THREE INTERPRETERS" items={[
        { label: "THE C REFERENCE", value: "33", detail: "As Lane said the published interpreter would." },
        { label: "THE AGENT’S FIRST PORT", value: "33", detail: "Copied from the C without knowing." },
        { label: "WITH LANE’S CORRECTIONS", value: "1", detail: "Each macro keeps its own variables." },
      ]} note="One six-line program, run on each. The first two are not runnable here; the third is, below."/>
      <MouseRunner label="LANE’S TEST, FROM HIS LETTER" program={"#A,#B;;\n\n$A Q 1 = %A Q. ! @\n$B Q 33 = @\n$$"}
        note="A sets its Q to 1, then runs its parameter, which calls B. B sets its own Q to 33. A should still print 1."/>
      {act(5)}
    </> },
    { label: "Run it yourself", kind: "operate", children: <>{act(6)}</> },
    { label: "What this does not show", children: <>
      {act(7)}
      {act(8)}
    </> },
  ]}/>;
}
