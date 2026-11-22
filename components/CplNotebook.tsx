import type { ReactNode } from "react";
import type { PublicationRecord } from "@/lib/types";
import { StudyMeasures, StudySequence } from "@chrishayuk/hause/components/exhibition/Study";
import { NotebookEntry } from "./NotebookEntry";
import { Acts } from "./Acts";
import Link from "next/link";
import { CplRunner } from "./CplRunner";

const PAPERS = "https://www.ancientgeek.org.uk/CPL/CPL_Working_Papers.pdf";

/** A word as it was typed in 1966: each letter overstruck with an underline. */
const u = (word: string) => [...word].map(letter => `${letter}̲`).join("");
const LINE = `${u("let")} a, b = 1, 2; ${u("if")} a > b ${u("goto")} L`;

const NAMES = "let x, y = 3, 4\nWrite[2x, ' ', xy, ' ', (x + y)(x - y), '*n']";
const TAGS = "$(Outer for i = 1 to 3 do\n   $( for j = 1 to i do\n      $( Write[i j, ' '] $)Outer\nWrite['*n']";
const LABELS = "let rec routine R[integer n, label L, M] be\n   $( if n > 0 do R[n - 1, M, N]\n   N: goto L $)\n\nR[10, Even, Odd]\n\nEven: Write['Even*n']\n      finish\nOdd:  Write['Odd*n']";

/** A detail of a scanned page, credited to the page it came from. */
function Excerpt({ src, alt, width, height, caption, narrow }: { src: string; alt: string; width: number; height: number; caption: ReactNode; narrow?: boolean }) {
  return <figure className={narrow ? "cpl-excerpt cpl-excerpt-narrow" : "cpl-excerpt"}>
    <img src={`/media/notebook/cpl/${src}`} alt={alt} width={width} height={height} loading="lazy"/>
    <figcaption className="record-voice">{caption} · <a href={PAPERS}>THE SCANNED REPORT ↗</a></figcaption>
  </figure>;
}

/** The note in pictures: the pages it quotes, and the language running where it is described. */
export function CplNotebook({ record }: { record: PublicationRecord }) {
  const act = (index: number) => <Acts acts={[record.body[index]]} anchored offset={index} staticRefusals/>;
  return <NotebookEntry record={record} className="cpl-notebook" chapters={[
    { label: "A language in working papers", children: <>
      <Excerpt src="working-papers-1966-cover.jpg" width={1050} height={1260} narrow
        alt="The cover of the report: University of London Institute of Computer Science and The Mathematical Laboratory, Cambridge. Technical Report. CPL Working Papers. July 1966."
        caption="CPL WORKING PAPERS, JULY 1966, COVER"/>
      <p className="cpl-play-link record-voice"><Link href="/demos/cpl">OPEN THE CPL PLAYGROUND ↗</Link><span>Write CPL and run it in your browser.</span></p>
      {act(0)}
    </> },
    { label: "CPL in five lines", children: <>
      <StudySequence label="A SMALL LETTER IS A WHOLE NAME" steps={[
        { label: "NAMES", value: "let x, y = 3, 4", detail: "A name is one small letter. Several things can be defined, or assigned, at once." },
        { label: "MULTIPLY", value: "2x + xy", detail: "Because a small letter is a whole name, xy is two names side by side, and that means x times y." },
        { label: "LONG NAMES", value: "Total, ReadTag", detail: "A longer name begins with a capital. Written small, total would be five names multiplied together." },
        { label: "SECTIONS", value: "§ … §̸", detail: "Commands are grouped between section brackets. On a keyboard without them, type $( and $)." },
        { label: "TAGS", value: "§Outer … §̸Outer", detail: "A bracket can carry a tag. Closing a tagged section closes every section opened inside it." },
      ]} note="Words such as let, if and goto were underlined in print, which is how they were told from names."/>
      <CplRunner label="TRY IT / CHANGE IT AND RUN AGAIN" program={NAMES}
        note="2x is 6, xy is 12, and (x + y)(x - y) is 7 times −1. The numbers are real unless you say otherwise."/>
      <CplRunner label="THREE SECTIONS, ONE CLOSING BRACKET / PRINTED AS IN 1966" program={TAGS} mode="printed"
        note="RUN prints this program the way it would have been typed in 1966, with the words underlined and § for $(. One tagged bracket closes all three sections."/>
      <p className="cpl-play-link record-voice"><Link href="/demos/cpl">MORE PROGRAMS IN THE PLAYGROUND ↗</Link></p>
    </> },
    { label: "One program of any size", children: <>
      <Excerpt src="appendix-1-head.jpg" width={1350} height={695}
        alt="The head of Appendix 1, The Preprocessor, from the draft CPL Reference Manual. Across the top, in handwriting: This draft has not been fully checked. The first paragraph says it is intended to be both a description of the transformation from an implementation alphabet to canonical CPL and a general example of a CPL program."
        caption="CPL WORKING PAPERS, APPENDIX 1, P. 1"/>
      {act(1)}
      <CplRunner label="WHAT THE PREPROCESSOR DOES, ON ONE LINE" programFile="appendix1/preprocessor.cpl" programName="the 1966 preprocessor, corrected" input={LINE}
        note="It writes each symbol followed by ø. Names and numbers are marked N̸ and K̸. It has put in the do that may be left out before goto. The line is yours to change: an underlined letter is the letter followed by U+0332, so the easiest thing is to edit the names and numbers."/>
    </> },
    { label: "As printed", children: <>
      <Excerpt src="slip-1-readtag-tags.jpg" width={1150} height={370}
        alt="The routine ReadTag as printed. Its body opens with a section bracket tagged R.T and closes with one tagged R.T. with a final dot."
        caption="APPENDIX 1, P. 2 / READTAG OPENS R.T AND CLOSES R.T."/>
      <CplRunner label="THE PROGRAM AS PRINTED, GIVEN THE SAME LINE" programFile="appendix1/preprocessor-as-printed.cpl" programName="the 1966 preprocessor, as printed" input={LINE}
        note="It does not get as far as reading the line. A dot is part of a tag by the program’s own rule, so R.T. is a different tag from R.T."/>
      {act(2)}
      <Excerpt src="slip-7-standard.jpg" width={601} height={140} narrow
        alt="A line of the program as printed: s becomes standard, with a small s, of s joined to s prime."
        caption="APPENDIX 1, P. 5 / STANDARD WITH A SMALL S"/>
    </> },
    { label: "It runs, and is wrong", kind: "evidence", children: <>
      {act(3)}
      <StudyMeasures label="ONE LINE THROUGH THREE VERSIONS OF THE PROGRAM" items={[
        { label: "CORRECTED", value: "let", detail: "The line comes out whole, a symbol at a time." },
        { label: "WORDS START FROM THEIR FIRST LETTER", value: "l̲let", detail: "The underlined l is taken once as the start and once as a letter." },
        { label: "AN EXTRA NEXTCHAR AFTER A COMMA", value: "a , =", detail: "The b after the comma is gone, and so is the 2." },
      ]} note="The same line each time. The second and third versions are the corrected program with one slip put back, and both run below."/>
      <Excerpt src="slips-2-3-8-underlined-word-and-spaces.jpg" width={1280} height={360}
        alt="The routines ReadUnderlinedWord and ReadSpaces as printed. ReadUnderlinedWord begins by assigning c to s."
        caption="APPENDIX 1, P. 3 / READUNDERLINEDWORD BEGINS s := c"/>
      <CplRunner label="WITH s := c PUT BACK" programFile="appendix1/slip-8-first-letter-twice.cpl" programName="corrected, except that an underlined word starts from its first letter" input={LINE}
        note="Every word begins twice, and no longer matches any word the program knows."/>
      <Excerpt src="slips-5-9-case-and-comma.jpg" width={1130} height={500}
        alt="Three cases of the switch as printed. The case for a closing round bracket has no colon. In the case for a comma, ReadSpaces of c is followed by Output of a comma and then NextChar of c. A goto Switch is crossed out by hand and Return written beside it."
        caption="APPENDIX 1, P. 3 / THE CASE FOR A COMMA, WITH A CORRECTION MADE BY HAND"/>
      <CplRunner label="WITH THE EXTRA NEXTCHAR PUT BACK" programFile="appendix1/slip-9-after-a-comma.cpl" programName="corrected, except for NextChar[c] after a comma" input={LINE}
        note="ReadSpaces has read past the spaces to b. NextChar then throws b away."/>
    </> },
    { label: "Where the notes disagree", children: <>
      <Excerpt src="slip-10-cannot-precede.jpg" width={1250} height={130}
        alt="Part 3, definition c: the function the program calls CannotProceedCommand is true if LastOutput is any of semicolon, section bracket, do, colon, or."
        caption="APPENDIX 1, P. 6 / PART 3 (c)"/>
      <Excerpt src="slip-11-go-goto.jpg" width={1144} height={260}
        alt="Part 3, definition f: a table for the function Standard, with a row that gives go if x is goto."
        caption="APPENDIX 1, P. 6 / PART 3 (f)"/>
      {act(4)}
    </> },
    { label: "It reads itself", kind: "evidence", children: <>
      <StudyMeasures label="THE PREPROCESSOR, GIVEN ITS OWN 189 LINES" items={[
        { label: "ITS TEXT CORRECTED", value: "≈ 1,100", detail: "Symbols written. The last one is finish." },
        { label: "ITS TEXT AS PRINTED", value: "≈ 220", detail: "Symbols written before it stops, at the closing bracket of ReadTag." },
        { label: "MESSAGES", value: "0", detail: "The program has nothing to say about a tag that matches no section." },
      ]} note="Both runs use the corrected program. Only the text it is given differs. Both are runnable below."/>
      <CplRunner label="GIVEN ITS OWN TEXT" programFile="appendix1/preprocessor.cpl" programName="the 1966 preprocessor, corrected" inputFile="appendix1/itself.pub" inputName="Part 2 of the same program, corrected, as it would be printed"
        note="Scroll to the end: the last symbols are the label Error, a colon, and finish."/>
      <CplRunner label="GIVEN ITS OWN TEXT AS PRINTED" programFile="appendix1/preprocessor.cpl" programName="the 1966 preprocessor, corrected" inputFile="appendix1/itself-as-printed.pub" inputName="Part 2 of the same program, as printed"
        note="It ends with three closing brackets in a row: one for each of the two open sections and one more from the outermost level, on the way out."/>
      {act(5)}
      <CplRunner label="A LABEL PASSED AS A PARAMETER" program={LABELS}
        note="This is the Reference Manual’s own small example, from section 9.3, of the feature the preprocessor relies on. R calls itself ten times, handing each call a label of its own, and the jumps unwind back out. Change 10 to 9."/>
    </> },
    { label: "Run it yourself", kind: "operate", children: <>{act(6)}</> },
    { label: "What this does not show", children: <>
      {act(7)}
      {act(8)}
    </> },
  ]}/>;
}
