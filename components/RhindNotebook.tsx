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
    { label: "The scribe’s working", children: <>
      <Plate src="chace-plate-50-problem-27.jpg" width={1350} height={1170} narrow
        alt="Plate 50 of Chace's edition, Problem 27: above, the hieratic of the papyrus, with the opening words in red; below, Chace's hieroglyphic transcription with each number glossed. Photograph XII, register 4."
        caption="CHACE, VOL. II, 1929, PLATE 50 / PROBLEM 27: THE HIERATIC ABOVE, CHACE’S HIEROGLYPHIC TRANSCRIPTION BELOW"/>
      <p className="rh-play-link record-voice"><Link href="/demos/rhind-papyrus">OPEN THE PLAYGROUND ↗</Link><span>Every page of the papyrus, checked, in your browser.</span></p>
      {act(0)}
      <RhindRunner label="PROBLEM 27, AS TRANSCRIBED / CHANGE IT AND CHECK IT AGAIN" page={PROBLEM_27}
        note="A quantity and its fifth make 21. The first column is the false position: try 5, and 5 and its fifth make 6. The second reckons with 6 to find 21, which gives 3 2̅. The third multiplies 3 2̅ by 5, and its last row has 15 where 4 times 3 2̅ is 14. Choose the line marked ✗."/>
    </> },
    { label: "No division, no fractions but parts", children: <>
      {act(1)}
      <StudySequence label="A PAGE IN RHIND’S NOTATION" steps={[
        { label: "A ROW", value: "\\ 2   10", detail: "The multiplier and the product. \\ is the scribe’s tick against the rows to be added." },
        { label: "A PART", value: "'4   1", detail: "'4 is a quarter, written 4̅: the sign for “part” over the number. 2/3 is two-thirds, ⅔." },
        { label: "A STATEMENT", value: "Reckon with 5 to find 15.", detail: "Division as the scribe says it. With no working under it, rhind works it, the scribe’s way." },
        { label: "RED INK", value: "{Total 1.}", detail: "{…} is red ink, […] a restoration, % a note. The scribe’s own words are kept in quotes." },
      ]} note="A transcription never corrects the scribe. Where the papyrus has 15, the file has 15."/>
      <RhindRunner label="PROBLEM 26’S FIRST STEP, SET OUT AS A COLUMN" page={OWN}
        note="Delete the two ticked rows and check it again: rhind works the Reckon itself and sets out the rows it would write, in italic."/>
      <RhindWork question="multiply 3 '2 by 5" label="WORK IT THE SCRIBE’S WAY" />
    </> },
    { label: "965 lines of working", kind: "evidence", children: <>
      {act(2)}
      <StudyMeasures label="THE WHOLE PAPYRUS, AS TRANSCRIBED" items={[
        { label: "LINES OF WORKING CHECKED", value: "965", detail: "838 right, 127 with something wrong. 91 problem sections and the two tables." },
        { label: "WRONG FIGURES", value: "133", detail: "In those 127 lines." },
        { label: "POINTED OUT BY CHACE OR PEET", value: "87 of 133", detail: "46 are pointed out by neither edition, as transcribed here: each a question for the photographs." },
      ]} note="Every count is against this project’s transcription, not the papyrus."/>
    </> },
    { label: "The slips", kind: "evidence", children: <>
      {act(3)}
      <StudyMeasures label="THE FIRST SLIP THAT FITS, FOR EACH OF 133 WRONG FIGURES" items={[
        { label: "PART-SIGN", value: "71", detail: "The sign for “part” left off, so 3̅0̅ is written 30." },
        { label: "ONE-SIGN", value: "9", detail: "One hieratic number sign written for another: 15 for 14." },
        { label: "NONE", value: "33", detail: "No single slip of the kinds modelled." },
      ]} note="The rest: ticks 6, multiplier 4, in-the-list 3, and the wrong row, the next row’s figure or a dropped fraction 7."/>
      {act(4)}
      {act(5)}
      <Plate src="chace-plate-85-problem-63.jpg" width={1455} height={1110}
        alt="Plate 85 of Chace's edition, Problem 63: on the right, the hieratic, with a few words in red; on the left, Chace's hieroglyphic transcription, each number glossed beneath it, reading right to left as the signs do."
        caption="CHACE, VOL. II, 1929, PLATE 85 / PROBLEM 63: FOUR SHARES TOTALLED 700"/>
      {act(6)}
    </> },
    { label: "2 ÷ 59", kind: "evidence", children: <>
      <Plate src="chace-plate-17-two-divided-by-59.jpg" width={1420} height={580}
        alt="The lower half of plate 17 of Chace's edition, 2 divided by 59: the hieratic above, with the answer in red; Chace's hieroglyphic transcription below, its numbers glossed reading right to left, the red answer's middle part glossed 622, that is 226, and the working's glossed 632, that is 236."
        caption="CHACE, VOL. II, 1929, PLATE 17 / 2 ÷ 59. THE GLOSSES READ RIGHT TO LEFT, AS THE SIGNS DO"/>
      <Plate src="chace-p81-two-divided-by-59-226.jpg" width={760} height={250} narrow
        alt="Chace's literal translation of 2 divided by 59: 59; in red 36, 1 2 12 18; 226 in red, 4; 531 in red, 9; then gm Find, ticked 36, ticked 4, 236, 4, ticked 9, 531, 9."
        caption="CHACE, VOL. II, 1929, P. 81 / THE RED ANSWER HAS 226, THE WORKING 236"/>
      {act(7)}
      <RhindRunner label="2 ÷ 59, AS TRANSCRIBED" page={TWO_BY_59}
        note="The red rows are the answer: 2 ÷ 59 is 3̅6̅ 2̅3̅6̅ 5̅3̅1̅, each with what it makes of 59. The ticked rows under “Find” are the working. Choose the line marked ✗."/>
      <RhindWork question="reckon with 59 to find 2" label="2 ÷ 59, WORKED BY RHIND" auto={false}/>
    </> },
    { label: "The routes and the table", children: <>
      {act(8)}
      <StudyMeasures label="65 COLUMNS THE PROBLEMS WRITE IN FULL" items={[
        { label: "BY DOUBLING ALONE, ROW FOR ROW", value: "40", detail: "The same rows and ticks as the scribe’s." },
        { label: "WITH THREE MORE CONVENTIONS", value: "47", detail: "Tens by a row for 10, 3̅ straight from the first row, and a division read as halving." },
        { label: "WHERE THE SCRIBE CHOSE DIFFERENTLY", value: "17", detail: "10 used another way 5, by ⅔ where rhind halves or the reverse 6, another route 6. One more has rows written that are not used." },
      ]} note="rhind routes --all lists the columns that differ."/>
      {act(9)}
      <StudyMeasures label="RULES FOR THE TABLE OF 2 ÷ n, AGAINST ALL 49 ENTRIES" items={[
        { label: "THE LARGEST PART THAT FITS, AGAIN AND AGAIN", value: "4 of 49" },
        { label: "FEWEST PARTS", value: "25 to 29", detail: "Depending on how ties are broken." },
        { label: "THE DIVISOR METHOD", value: "32 to 34", detail: "2/n = m̅ + (2m − n)/mn, with 2m − n made of divisors of m. No rule here gives 2 ÷ 13 or 2 ÷ 95." },
      ]} note="None of these rules is claimed to be any one scholar’s, or new."/>
      <RhindWork question="reckon with 13 to find 2" label="2 ÷ 13, WORKED BY RHIND" auto={false}/>
    </> },
    { label: "Run it yourself", kind: "operate", children: <>{act(10)}</> },
    { label: "What this does not show", children: <>
      {act(11)}
      {act(12)}
    </> },
  ]}/>;
}
