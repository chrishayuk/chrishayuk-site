import type { ReactNode } from "react";
import type { PublicationRecord } from "@/lib/types";
import { StudyMeasures, StudySequence } from "@chrishayuk/hause/components/exhibition/Study";
import { NotebookEntry } from "./NotebookEntry";
import { Acts } from "./Acts";
import Link from "next/link";
import { RhindRunner, RhindWork } from "./RhindRunner";

const CHACE = "https://archive.org/details/arnoldbuffumchaceludlowbullhenryparkermanningtherhindmathematicalpapyrus.volumei";

// Pages as transcribed in github.com/chrishayuk/rhind-papyrus, papyrus/.
const PROBLEM_27 = "No. 27\n\"{A quantity, '5 of it added to it,} becomes it: 21.\"\n  1      5\n  '5     1\nTotal 6.\n% 6 is then reckoned with to find 21, with no sentence\n\\ 1      6\n\\ 2      12\n\\ '2     3\nTotal 21.\n% the ticked multipliers give 3 '2, which is then multiplied by 5\n\\ 1      3 '2\n  2      7\n\\ 4      15             % Peet: \"15 (sic)\", \"15 has been erroneously written for 14\"; Chace prints 15 without comment\n% no total written\n\"{The quantity is 17 '2,} '5 of it is 3 '2, {the total is 21.}\"\n";
const TWO_BY_59 = "2 ÷ 59\n% Chace PDF p. 81 (pl. 17, p. 82); Peet p. 44 (Pl. C)\n\"59\"\n{'36}   1 '2 '12 '18\n{'226}  '4        % so in Chace's translation and plate (red 226; the working has 236); no comment by Chace; Peet: '236\n{'531}  '9\n\"Find\"\n\\ '36   1 '2 '12 '18\n\\ 4     '236  '4\n\\ 9     531   '9       % Peet: '531\n";
const OWN = "No. 1\n\"A quantity whose fourth part is added to it becomes 15.\"\n  1   4\n '4   1\nTotal 5.\nReckon with 5 to find 15.\n\\ 1   5\n\\ 2   10\nResult 3.\n";

/** A crop of a plate in Chace's edition, credited to it. */
function Plate({ src, alt, width, height, caption, narrow }: { src: string; alt: string; width: number; height: number; caption: ReactNode; narrow?: boolean }) {
  return <figure className={narrow ? "rh-excerpt rh-excerpt-narrow" : "rh-excerpt"}>
    <img src={`/media/notebook/rhind-papyrus/${src}`} alt={alt} width={width} height={height} loading="lazy"/>
    <figcaption className="record-voice">{caption} · <a href={CHACE}>THE SCANNED EDITION ↗</a></figcaption>
  </figure>;
}

/** The note in pictures: the plates it is about, and pages checked where they are discussed. */
export function RhindNotebook({ record }: { record: PublicationRecord }) {
  const act = (index: number) => <Acts acts={[record.body[index]]} anchored offset={index} staticRefusals/>;
  return <NotebookEntry record={record} className="rh-notebook" chapters={[
    { label: "Fifteen for fourteen", children: <>
      <Plate src="chace-plate-50-problem-27.jpg" width={1350} height={1170} narrow
        alt="Plate 50 of Chace's edition, Problem 27: above, the hieratic of the papyrus, with the opening words in red; below, Chace's hieroglyphic transcription with each number glossed. Photograph XII, register 4."
        caption="CHACE, VOL. II, 1929, PLATE 50 / PROBLEM 27: THE HIERATIC ABOVE, CHACE’S HIEROGLYPHIC TRANSCRIPTION BELOW"/>
      <p className="rh-play-link record-voice"><Link href="/demos/rhind-papyrus">OPEN THE PLAYGROUND ↗</Link><span>Every page of the papyrus, checked, in your browser.</span></p>
      {act(0)}
      <RhindRunner label="PROBLEM 27, AS TRANSCRIBED / CHANGE IT AND CHECK IT AGAIN" page={PROBLEM_27}
        note="A quantity and its fifth make 21. The first column is the false position: try 5, and 5 and its fifth make 6. The second reckons with 6 to find 21, which gives 3 2̅. The third multiplies 3 2̅ by 5, and its last row has 15 where 4 times 3 2̅ is 14. Choose the line marked ✗."/>
    </> },
    { label: "A check and a generator", children: <>
      {act(1)}
      <StudySequence label="A PAGE IN RHIND’S NOTATION" steps={[
        { label: "A ROW", value: "\\ 2   10", detail: "The multiplier and the product. \\ is the scribe’s tick against the rows to be added." },
        { label: "A PART", value: "'4   1", detail: "'4 is a quarter, written 4̅: the sign for “part” over the number. 2/3 is two-thirds, ⅔." },
        { label: "A STATEMENT", value: "Reckon with 5 to find 15.", detail: "Division as the scribe says it. With no working under it, rhind writes the working, the scribe’s way." },
        { label: "RED INK", value: "{Total 1.}", detail: "{…} is red ink, […] a restoration, % a note. The scribe’s own words are kept in quotes." },
      ]} note="A transcription never corrects the scribe. Where the papyrus has 15, the file has 15."/>
      <RhindRunner label="PROBLEM 26’S FIRST STEP, SET OUT AS A COLUMN" page={OWN}
        note="Delete the two ticked rows and check it again: rhind works the Reckon itself and sets out the rows it would write, in italic."/>
      <RhindWork question="multiply 3 '2 by 5" label="THE GENERATOR: WORK IT THE SCRIBE’S WAY" />
    </> },
    { label: "956 lines of working", kind: "evidence", children: <>
      {act(2)}
      <StudyMeasures label="THE WHOLE PAPYRUS, AS TRANSCRIBED: 113 DIAGNOSTIC RECORDS ON 111 LINES" items={[
        { label: "A PART SIGN", value: "75", detail: "The figure differs from the working only by the sign for “part”. A notation the editions treat differently, not necessarily an error." },
        { label: "THE TICKS", value: "4", detail: "The total written is right for other rows than those ticked." },
        { label: "A FIGURE", value: "34", detail: "A figure that differs in more than its part sign. Most are pointed out by Chace or Peet." },
      ]} note="956 lines checked across 91 problem sections and the two tables; 845 agree with the working. Every count is against this project’s transcription, under the rules in rhind decisions."/>
      {act(3)}
    </> },
    { label: "The 34 figures", kind: "evidence", children: <>
      {act(4)}
      <Plate src="chace-plate-85-problem-63.jpg" width={1455} height={1110}
        alt="Plate 85 of Chace's edition, Problem 63: on the right, the hieratic, with a few words in red; on the left, Chace's hieroglyphic transcription, each number glossed beneath it."
        caption="CHACE, VOL. II, 1929, PLATE 85 / PROBLEM 63: FOUR SHARES TOTALLED 700, WHICH ADD TO 680"/>
      {act(5)}
    </> },
    { label: "2 ÷ 59", kind: "evidence", children: <>
      <Plate src="chace-plate-17-two-divided-by-59.jpg" width={1420} height={580}
        alt="The lower half of plate 17 of Chace's edition, 2 divided by 59: the hieratic above, with the answer in red; Chace's hieroglyphic transcription below, each number glossed beneath it."
        caption="CHACE, VOL. II, 1929, PLATE 17 / 2 ÷ 59: THE HIERATIC ABOVE, CHACE’S TRANSCRIPTION BELOW"/>
      <Plate src="chace-p81-two-divided-by-59-226.jpg" width={760} height={250} narrow
        alt="Chace's literal translation of 2 divided by 59: 59; in red 36, 1 2 12 18; 226 in red, 4; 531 in red, 9; then gm Find, ticked 36, ticked 4, 236, 4, ticked 9, 531, 9."
        caption="CHACE, VOL. II, 1929, P. 81 / THE RED ANSWER HAS 226, THE WORKING 236"/>
      {act(6)}
      <RhindRunner label="2 ÷ 59, AS TRANSCRIBED" page={TWO_BY_59}
        note="The red rows are the answer: 2 ÷ 59 is 3̅6̅ 2̅3̅6̅ 5̅3̅1̅, each with what it makes of 59. The ticked rows under “Find” are the working. rhind marks the red 2̅2̅6̅, which disagrees with the working: Chace’s answer and Peet’s differ here, and which is on the papyrus is a question for the photograph."/>
      <RhindWork question="reckon with 59 to find 2" label="2 ÷ 59, WORKED BY RHIND’S GENERATOR" auto={false}/>
    </> },
    { label: "The routes and the table", children: <>
      {act(7)}
      <StudyMeasures label="65 ELIGIBLE COLUMNS OF 139, COMPARED BY MULTIPLIERS AND TICKS" items={[
        { label: "BY DOUBLING ALONE", value: "40", detail: "The same multipliers and ticks as the scribe’s." },
        { label: "WITH THREE CONVENTIONS", value: "47", detail: "Tens by a row for 10, 3̅ straight from the first row, and a division read as halving." },
        { label: "THE REST", value: "18", detail: "10 used another way 5, by ⅔ where rhind halves or the reverse 6, another route 6, and one with rows written that are not used." },
      ]} note="This describes the subset; it does not validate the procedure. rhind routes --all lists the columns that differ."/>
      {act(8)}
      <StudyMeasures label="RULES FOR THE TABLE OF 2 ÷ n, AGAINST ALL 49 ENTRIES" items={[
        { label: "THE LARGEST PART THAT FITS, AGAIN AND AGAIN", value: "4 of 49" },
        { label: "FEWEST PARTS", value: "25 to 29", detail: "Depending on how ties are broken." },
        { label: "THE DIVISOR METHOD", value: "32 to 34", detail: "2/n = m̅ + (2m − n)/mn, with 2m − n made of up to three divisors of m. With parts up to 10,000 the first falls to 25." },
      ]} note="At most four parts, none past 1000. No rule here gives 2 ÷ 13 or 2 ÷ 95. Agreement describes a rule; it does not show the scribe used it, and none is claimed to be any one scholar’s, or new."/>
      <RhindWork question="reckon with 13 to find 2" label="2 ÷ 13, WORKED BY RHIND’S GENERATOR" auto={false}/>
    </> },
    { label: "An independent review", children: <>
      {act(9)}
      <StudyMeasures label="WHAT A SECOND MODEL CHECKED IN RELEASE 0.1.0" items={[
        { label: "PLACES READ AGAIN AGAINST THE SCANS", value: "72", detail: "No misread digit. 2 ÷ 59 and the five 60-for-80 places confirmed." },
        { label: "THE FIRST CENSUS", value: "unsound", detail: "The part sign called a slip, a keyword search called a count of what the editions point out, and a test of carried errors that was wrong." },
        { label: "FINDINGS ACTED ON", value: "all", detail: "Each was checked against the code, by running it, and against the scans where it concerned them, then fixed, reworded or withdrawn in release 0.1.1." },
      ]} note="The review is a model’s, like the transcription. No person or palaeographer has checked either."/>
    </> },
    { label: "Run it yourself", kind: "operate", children: <>{act(10)}</> },
    { label: "What this does not show", children: <>
      {act(11)}
      {act(12)}
    </> },
  ]}/>;
}
