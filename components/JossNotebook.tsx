import type { ReactNode } from "react";
import type { PublicationRecord } from "@/lib/types";
import { StudyMeasures, StudySequence } from "@chrishayuk/hause/components/exhibition/Study";
import { NotebookEntry } from "./NotebookEntry";
import { Acts } from "./Acts";
import Link from "next/link";
import { JossRunner } from "./JossRunner";
import { JossTry } from "./JossTypewriter";

const ARCHIVE = "https://bitsavers.org/pdf/rand/joss/";

const TRY = ["Type 2+2.", "1.1 Type x, 1/x.", "Do part 1.", "Set x = 4.", "Go.", "Do part 1 for x = 1(1)3."];
const FIRST = "Type 2+2.\nSet x = 3.\nType x*2, sqrt(x), 1/x.\n1.1 Type x, x*2 in form 1.\nForm 1:\n__ squared is ____\nDo step 1.1 for x = 1(1)5.";
const QUADRATIC = "1.1 Set x(1) = [-b+sqrt(b*2-4·a·c)] / [2·a].\n1.2 Set x(2) = [-b-sqrt(b*2-4·a·c)] / [2·a].\n1.3 Type x(1), x(2) in form 1.\nSet b = -1.\nSet c = -6.\nDo part 1.";
const LOGS = "Type log(2), exp(72).\nType [.7*5-2.3*(-.7)]/[7*6-|9*5-5*7|*(2/3)].\nSet s = 0.\n1.1 Set s = s+.1.\nDo step 1.1 for i = 1(1)10.\nType s.";
const YEARS = "Type 7/0.\nSet t = 1/50.\nType t, 2+2.";

/** A detail of a scanned page, credited to the document it came from. */
function Excerpt({ src, alt, width, height, caption, narrow }: { src: string; alt: string; width: number; height: number; caption: ReactNode; narrow?: boolean }) {
  return <figure className={narrow ? "joss-excerpt joss-excerpt-narrow" : "joss-excerpt"}>
    <img src={`/media/notebook/joss/${src}`} alt={alt} width={width} height={height} loading="lazy"/>
    <figcaption className="record-voice">{caption} · <a href={ARCHIVE}>THE SCANS AT BITSAVERS ↗</a></figcaption>
  </figure>;
}

/** The note in pictures: the pages it quotes, and JOSS running where it is described. */
export function JossNotebook({ record }: { record: PublicationRecord }) {
  const act = (index: number) => <Acts acts={[record.body[index]]} anchored offset={index} staticRefusals/>;
  return <NotebookEntry record={record} className="joss-notebook" chapters={[
    { label: "A computing aide", children: <>
      <Excerpt src="console-1964.jpg" width={1550} height={1790} narrow
        alt="A photograph of a JOSS console: an IBM electric typewriter with sprocket-fed paper rising from it, and a small box of lights and switches to its right."
        caption="SHAW, P-2922, AUGUST 1964, FIG. 1 / JOSS CONSOLE AND STATION LOCAL CONTROL BOX"/>
      {act(0)}
      <JossTry label="SIT AT THE CONSOLE / SIGN ON WITH YOUR INITIALS, THEN TYPE A LITTLE PROGRAM" lines={TRY}
        note={<>A step kept for later (1.1), a mistake (x has no value), the fix, <strong>Go.</strong> to carry on from where it stopped, and the step done for three values of x. The ribbon’s two colours, the speed of ten characters a second, the red light and the gong are from Shaw’s papers; the sign-on is from the listing of January 1965. Everything after it is the interpreter. <Link href="/demos/joss">The full console ↗</Link></>}/>
    </> },
    { label: "JOSS in five lines", children: <>
      <StudySequence label="EVERY INSTRUCTION IS A SENTENCE" steps={[
        { label: "DO IT NOW", value: "Type 2+2.", detail: "A capital at the start and a full stop at the end. JOSS does it and answers." },
        { label: "REMEMBER", value: "Set x = 3.", detail: "A name is one letter. There are 52 of them: small letters and capitals are different names." },
        { label: "KEEP IT", value: "1.1 Type x, x*2.", detail: "A number in front makes it a step, kept for later. Steps 1.1 and 1.2 belong to part 1. * is “to the power”; times is a raised dot." },
        { label: "REPEAT", value: "Do part 1 for x = 1(1)5.", detail: "Do the steps of part 1 with x from 1, in steps of 1, to 5." },
        { label: "SAY HOW", value: "Form 1:", detail: "The next line typed is a picture of a line of output, with blanks of underscores where the numbers go." },
      ]} note="Direct or kept, it is the same language."/>
      <JossRunner label="TRY IT / THE PAPER STAYS OPEN: KEEP TYPING" program={FIRST}
        note="Green is what was typed and black is JOSS, as the console’s two-colour ribbon had it. Arithmetic is in nine decimal digits, so a tenth is exactly a tenth."/>
      <p className="joss-play-link record-voice"><Link href="/demos/joss">MORE SITTINGS IN THE PLAYGROUND ↗</Link></p>
    </> },
    { label: "Go", children: <>
      <Excerpt src="p-3149-figure-2.jpg" width={940} height={1400} narrow
        alt="Figure 2 of Shaw's 1965 paper: a console session. The user enters three steps to solve a quadratic equation and types Do part 1. JOSS answers Error at step 1.1: a is undefined. The user sets a and types Go, and JOSS finds the next thing wrong, six more times, before typing the roots 3.0000 and -2.0000."
        caption="SHAW, P-3149, MAY 1965, FIG. 2 / JOSS IS THE DARKER TYPE"/>
      {act(1)}
      <JossRunner label="THE FIRST SIX LINES OF FIGURE 2 / THE REST IS YOURS TO TYPE" program={QUADRATIC}
        next="NOW TYPE: Set a = 0.   THEN: Go."
        note="JOSS stops at step 1.1 because a has no value. Give it one and type Go. Zero gives the next complaint, and −1 the one after. With a = 1 it gets as far as step 1.3 and finds there is no form 1. On the paper, type Form 1: and then a line with five blanks, such as a = __ b = __ c = __ roots: ___.____ ___.____ and fix step 1.3 to type five values."/>
      <Excerpt src="p-3131-root-finding.jpg" width={860} height={1680} narrow
        alt="A page typed at a JOSS console on 28 April 1965, in two colours. The user's lines are green and JOSS's are black. Halfway down JOSS types Error at step 1.4: e is undefined. The user types Set e=.00005. and Go., and the search for a root carries on from where it stopped."
        caption="SHAW, P-3131, APRIL 1965, PDF P. 6 / THE USER IN GREEN, JOSS IN BLACK"/>
    </> },
    { label: "Forty messages", children: <>
      <Excerpt src="listing-1965-messages.jpg" width={1560} height={790}
        alt="Part of an assembly listing. Columns of octal numbers, and beside them in capitals: I NEED MORE STORAGE SPACE. I HAVE AN OVERFLOW. IS UNDEFINED. I HAVE A ZERO DIVISOR. INDEX VALUE MUST BE INTEGER AND 0-INDEX-99."
        caption="JOSS 666 LISTING, 9 JANUARY 1965, PDF P. 38 / EACH MESSAGE AS OCTAL WORDS, FIVE CHARACTERS TO A WORD"/>
      {act(2)}
    </> },
    { label: "Two JOSSes", kind: "evidence", children: <>
      {act(3)}
      <StudyMeasures label="THE SAME THREE LINES, A YEAR APART" items={[
        { label: "Type 7/0.", value: "Zero divisor.", detail: "By 1965: I have a zero divisor." },
        { label: "Type t.  (t is 1/50)", value: "2·10*(-2)", detail: "By 1965: .02" },
        { label: "Type 2+2.", value: "column 17", detail: "Where the 4 falls, counting from 1, in August 1964. By 1965: column 18." },
      ]} note="The first column is the JOSS of 1964. Run the three lines below, change the year in the playground, and run them again."/>
      <JossRunner label="THE JOSS OF MARCH 1964" program={YEARS} year="1964"
        note="The wording of 1964 is known only where a page of 1964 shows it. Elsewhere this setting uses the words of 1965."/>
    </> },
    { label: "What the replay found in the film", children: <>{act(4)}</> },
    { label: "Five lines", kind: "evidence", children: <>
      <StudyMeasures label="FIVE SESSIONS, EVERY LINE JOSS TYPED" items={[
        { label: "COLUMN FOR COLUMN", value: "689", detail: "Against the typewriter’s own output, reproduced in the papers." },
        { label: "CHARACTER FOR CHARACTER", value: "78", detail: "Against pages a typist had copied, closing up the columns." },
        { label: "FROM JOSS’S OWN ROUTINES", value: "5", detail: "One unit away with a modern library; as printed once the logarithm, exponential and powers of the 1965 listing are followed." },
      ]} note="A further six blank lines fall off the cut edges of figures, where the page cannot show them."/>
      {act(5)}
      <Excerpt src="rm-4162-row-72.jpg" width={960} height={220}
        alt="Five rows of a table typed by JOSS, for 71 to 75, with square roots, logarithms and exponentials. The exponential for 72 is 1.8586717 31."
        caption="BAKER, RM-4162-PR, JUNE 1964, PDF P. 23 / THE ROW FOR 72 ENDS IN A 7"/>
      <JossRunner label="THE THREE THINGS JOSS’S OWN ROUTINES DECIDE, AND ONE THEY DO NOT" program={LOGS}
        note="The pages have .69314718 for log 2, a 7 for exp(72), and 357. A correctly rounded library gives …181, an 8 and 356; the routines of the 1965 listing, followed here, give what the pages print. The last three lines add a tenth ten times. Shaw: “the result is indeed 1.”"/>
    </> },
    { label: "Check it", children: <>
      <Excerpt src="shaw-note-1964-11-19.jpg" width={1440} height={1660} narrow
        alt="A handwritten page headed F1 and signed JCS 11-19-64. It works out a bound with the square root of 2 and powers of 2 and 10, lists a short table, and ends: Check it. Looks like coefficient between 1 and root 2 gets doubled several times."
        caption="JOSS PROGRAM NOTES AND TESTS, PDF P. 13 / J. C. SHAW, 19 NOVEMBER 1964"/>
      {act(6)}
    </> },
    { label: "Run it yourself", kind: "operate", children: <>{act(7)}</> },
    { label: "What this does not show", children: <>
      {act(8)}
      {act(9)}
    </> },
  ]}/>;
}
