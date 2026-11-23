import type { ReactNode } from "react";
import type { PublicationRecord } from "@/lib/types";
import { StudyMeasures, StudySequence } from "@chrishayuk/hause/components/exhibition/Study";
import { NotebookEntry } from "./NotebookEntry";
import { Acts } from "./Acts";
import Link from "next/link";
import { NineChaptersRunner } from "./NineChaptersRunner";
import { NineChaptersHover } from "./NineChaptersHover";
import { NoteLedger, type LedgerLane } from "./NoteLedger";
import type { GuideStep } from "./NoteGuide";

const SCANS = "https://commons.wikimedia.org/wiki/File:Sibu_Congkan0392-%E5%8A%89%E5%BE%BD-%E4%B9%9D%E7%AB%A0%E7%AE%97%E8%A1%93-3-3.djvu";

// Pages as transcribed in github.com/chrishayuk/nine-chapters, corpus/ (no-01.jz, no-02.jz,
// no-06.jz, and dai-zhen-18.jz up to its Count 145).
const PROBLEM_1 = "No. 8.1\n% Sibu congkan pp. 2-6 (statement p. 2, answer and procedure pp. 3-6; Liu Hui's commentary throughout)\n\"今有上禾三秉，中禾二秉，下禾一秉，實三十九斗，上禾二秉，中禾三秉，下禾一秉，實三十四斗，上禾一秉，中禾二秉，下禾三秉，實二十六斗，問上中下禾實一秉各幾何\"\n% Suppose 3 bundles of top-grade grain, 2 of middle-grade and 1 of low-grade yield 39 dou of grain;\n% 2 top, 3 middle and 1 low yield 34 dou; 1 top, 2 middle and 3 low yield 26 dou.\n% How much grain does one bundle of each grade yield?\n\"荅曰，上禾一秉九斗四分斗之一，中禾一秉四斗四分斗之一，下禾一秉二斗四分斗之三\"\n% Answer: one bundle of top grain, 9 1/4 dou; of middle, 4 1/4 dou; of low, 2 3/4 dou.\n\"術曰，置上禾三秉，中禾二秉，下禾一秉，實三十九斗，於右方，中左禾列如右方，以右行上禾徧乘中行，而以直除，又乘其次，亦以直除，然以中行中禾不盡者，徧乘左行，而以直除，左方下禾不盡者，上爲法，下爲實，實卽下禾之實，求中禾，以法乘中行下實，而除下禾之實，餘如中禾秉數而一，卽中禾之實，求上禾，亦以法乘右行下實，而除下禾中禾之實，餘如上禾秉數而一，卽上禾之實，實皆如法，各得一斗\"\n% The image reads 而以直除 / 亦以直除 / 而以直除 (pp. 3-4); the Wikisource text drops 直 each time.\n% in 斗\nThings 上禾 中禾 下禾 實\nSet right   3 2 1 39          \"置上禾三秉，中禾二秉，下禾一秉，實三十九斗，於右方\"\nSet middle  2 3 1 34          \"中左禾列如右方\"\nSet left    1 2 3 26\nMultiply middle by the head of right.            \"以右行上禾徧乘中行\"\nTake right from middle until the head is gone.   \"而以直除\"\nMultiply left by the head of right.              \"又乘其次\"\nTake right from left until the head is gone.     \"亦以直除\"\n% 其次 read as the next column, the left (so Liu Hui: 復去左行首).\nMultiply left by the 中禾 of middle.             \"然以中行中禾不盡者，徧乘左行\"\nTake middle from left until the head is gone.    \"而以直除\"\n% Liu Hui: 亦令兩行相乘去行之中禾也. No figure for any column is stated by\n% the text, Liu Hui, or Dai Zhen, so there are no Gives lines.\n% Dai Zhen (訂訛 p. 36) reads each 徧乘 ... 直除 as mutual: 以右行上禾徧乘中行，\n% 復以中行上禾徧乘右行，然後可相對減 (i.e. `crosswise`), the text naming only one\n% multiplication 古人文省. He gives no figures.\nSolve.\nAnswer 9 1/4, 4 1/4, 2 3/4\n";
const PROBLEM_2 = "No. 8.2\n% Sibu congkan pp. 6-7\n\"今有上禾七秉，損實一斗，益之下禾二秉，而實十斗，下禾八秉，益實一斗，與上禾二秉，而實十斗，問上下禾實一秉各幾何\"\n% Suppose 7 bundles of top-grade grain, their yield lessened by 1 dou, with 2 bundles of low-grade\n% grain added, yield 10 dou; 8 bundles of low-grade grain, their yield increased by 1 dou, with\n% 2 bundles of top-grade, yield 10 dou. How much does one bundle of each grade yield?\n\"荅曰，上禾一秉實一斗五十二分斗之十八，下禾一秉實五十二分斗之四十一\"\n% Answer: one bundle of top grain yields 1 dou and 18/52 of a dou; one of low grain, 41/52 of a dou.\n% (十 / 八 of the first answer is broken across pp. 6-7.)\n\"術曰，如方程，損之曰益，益之曰損，損實一斗者，其實過十斗也，益實一斗者，其實不滿十斗也\"\n% in 斗\n% The procedure says only 如方程, with 損之曰益，益之曰損: the 斗 taken off the first\n% condition is added to its 實 (10 + 1), and the 斗 put on the second is taken from\n% its 實 (10 - 1). Each condition is a column, the first the right.\nThings 上禾 下禾 實\nSet right  7 2 11        \"損之曰益\"\nSet left   2 8 9         \"益之曰損\"\nGives right 7 2 11       \"今按實云上禾七秉，下禾二秉，實十一斗\"\nGives left  2 8 9        \"上禾二秉，下禾八秉，實九斗也\"\n% Liu Hui's commentary states both columns; the Gives lines record it.\nSolve.\nAnswer 1 18/52, 41/52\n";
const PROBLEM_6 = "No. 8.6\n% Sibu congkan pp. 13-14\n\"今有上禾三秉，益實六斗，當下禾十秉，下禾五秉，益實一斗，當上禾二秉，問上下禾實一秉各幾何\"\n% Suppose the yield of 3 bundles of top-grade grain, increased by 6 dou, equals that of 10 bundles\n% of low-grade; the yield of 5 bundles of low-grade, increased by 1 dou, equals that of 2 bundles\n% of top-grade. How much does one bundle of each grade yield?\n\"荅曰，上禾一秉實八斗，下禾一秉實三斗\"\n% Answer: one bundle of top grain yields 8 dou; one of low grain, 3 dou.\n\"術曰，如方程，置上禾三秉正，下禾十秉負，益實六斗正，次置上禾二秉負，下禾五秉正，益實一斗正，以正負術入之\"\n% in 斗\n% The signs are set as the procedure states them, 益實 正 in both columns (image p. 14\n% reads 正 after 益實六斗 and after 益實一斗; re-read, it says so). The Wikisource\n% text of this scan agrees (正, 正). The punctuated Wikisource text of another edition\n% (jiuzhang.wiki) reads 益實六斗負 ... 益實一斗負; with those signs the board gives 8, 3.\n% Not changed: this page follows the scan. jiuzhang finds -8, -3 (法 -5, 實 40 15).\nThings 上禾 下禾 實\nSet right  3 -10 6       \"置上禾三秉正，下禾十秉負，益實六斗正\"\nSet left   -2 5 1        \"次置上禾二秉負，下禾五秉正，益實一斗正\"\nSolve.                   \"以正負術入之\"\nAnswer 8, 3\n";
const DAI_ZHEN_145 = "No. 8.18 (Dai Zhen, 訂訛: 145 and 99)\n% Sibu congkan pp. 48-49, Dai Zhen's collation notes on Liu Hui's commentary to Problem 18.\n% He calls Liu Hui's account of the old method corrupt (訛舛不可通) and gives his own,\n% with his own counts of 算.\n\"以上所言舊術訛舛不可通據方程術凡五物及總價求其各物之價者應列五行行五位及價以上一位互乘因徧乘次位以下及價兩兩相對減去其頭位所減之餘重列之減至一物一價乃止物爲法價爲實實如法而一得一物之價轉減而上以知各價\"\n% \"What is said above of the old method is corrupt and cannot be followed. By the fangcheng\n% procedure, to find each price from five things and their total prices, set five columns of\n% five positions and the price; cross-multiply by the top positions, and so multiply through the\n% positions below and the price; take each pair from the other to remove its head; set out again\n% what is left; go on until one thing and one price remain. The thing is the 法, the price the 實;\n% divide, and one price is found; work back upwards to know each price.\"\nThings 麻 麥 菽 荅 黍 實\nSet right 9 7 3 2 5 140\nSet 2nd   7 6 4 5 3 128\nSet 3rd   3 5 7 6 4 116\nSet 4th   2 5 3 9 4 112\nSet left  1 3 2 8 5  95\nSolve by cross.\nAnswer 7, 4, 3, 5, 6\n\"先化五爲四次化四爲三次化三爲二次化二爲一凡用十算兼乘減除言之則一百四十五算\"\n% \"First five become four, then four three, three two, two one: ten [eliminations] in all;\n% counting multiplications, takings and divisions together, 145 算.\"\nCount 145                                    \"兼乘減除言之則一百四十五算\"\n";

// Four edits, each run by jiuzhang in the page. What each notice says was
// checked by running the same text through jiuzhang.wasm.
const PROBLEM_6_FU = PROBLEM_6.replace("Set right  3 -10 6 ", "Set right  3 -10 -6").replace("Set left   -2 5 1 ", "Set left   -2 5 -1");
const PROBLEM_2_LOWEST = PROBLEM_2.replace("Answer 1 18/52, 41/52", "Answer 1 9/26, 41/52");
const PROBLEM_2_OVER_104 = PROBLEM_2.replace("Answer 1 18/52, 41/52", "Answer 1 36/104, 82/104");
const STEPS: GuideStep[] = [
  { label: "PROBLEM 6 AS PRINTED", action: "The 實s set 正, as this edition has them.", text: PROBLEM_6,
    notice: "The Answer line is ✗: with the 法 at −5 and the 實s at 40 and 15, the board gives −8 and −3 where the text says 8 and 3." },
  { label: "SET BOTH 實S 負", action: "6 becomes -6 and 1 becomes -1 in the Set lines.", text: PROBLEM_6_FU,
    notice: "Now the Answer is ✓ 8, 3: the 法 is still −5 and the 實s are −40 and −15. This is Li Huang’s correction, which Chemla and Guo print; the board reaches it by another road." },
  { label: "PROBLEM 2 IN LOWEST TERMS", action: "The answer written 1 9/26, 41/52.", text: PROBLEM_2_LOWEST,
    notice: "The value is still ✓, and jiuzhang says how it is written: each in its lowest terms, not as the board leaves it, which is 1 18/52." },
  { label: "PROBLEM 2 OVER 104", action: "The answer written 1 36/104, 82/104.", text: PROBLEM_2_OVER_104,
    notice: "The value is ✓ but the written form is ✗: no reading of the last step writes it over 104. What is checked is how the text writes its answer, as well as what it is worth." },
];

/** What was checked, what was left out, and what the counts are of: statements, and fractional answers. */
const LANES: LedgerLane[] = [
  { unit: "STATEMENTS",
    checked: [
      { value: "26", label: "pages", detail: "The 18 problems and 8 pages of commentary, each worked on the board a step at a time as the text says." },
      { value: "39", label: "statements the board reaches", detail: "Answers, columns a commentator gives, rates and counts of 算." },
    ],
    excluded: [
      { value: "5", label: "statements not reached", detail: "They come after a step that cannot be done." },
      { value: "Quoted", label: "figures kept as the source’s words, not checked", detail: "Rates read crosswise, and arithmetic in fractions off the board." },
    ],
    counts: [{ value: "38 · 1", label: "agree · do not", parts: [{ value: 38, label: "agree", tone: "agree" }, { value: 1, label: "does not: Problem 6", tone: "differ" }] }],
    meaning: "Statements, not figures: one can hold several, so this is not a census of every number. The 1 is Problem 6 by this edition’s signs, which Li Huang had already corrected." },
  { unit: "FRACTIONAL ANSWERS",
    checked: [{ value: "11", label: "answers with fractions", detail: "How each is written, compared with three readings of the last step." }],
    excluded: [{ value: "Not shown", label: "where in the working a reduction was made", detail: "Nor how the answers were found." }],
    counts: [
      { value: "7 of 11", label: "every 實 over the 法 as the board leaves it" },
      { value: "9 of 11", label: "each answer in its lowest terms" },
      { value: "11 of 11", label: "the 法 and the 實s reduced together (約)" },
    ],
    meaning: "This describes how the answers are written. That the denominators follow the board is known (Hart 2011, on 33/111); the count across all eleven was not found in the literature searched." },
];

/** A crop of a page of the Sibu congkan reprint, credited to the scans. */
function Scan({ src, alt, width, height, caption }: { src: string; alt: string; width: number; height: number; caption: ReactNode }) {
  return <figure className="nc-excerpt">
    <img src={`/media/notebook/nine-chapters/${src}`} alt={alt} width={width} height={height} loading="lazy"/>
    <figcaption className="record-voice">{caption} · <a href={SCANS}>THE SCANS ↗</a></figcaption>
  </figure>;
}

/** The note in pictures: the scans it is about, and pages run where they are discussed. */
export function NineChaptersNotebook({ record }: { record: PublicationRecord }) {
  const act = (index: number) => <Acts acts={[record.body[index]]} anchored offset={index} staticRefusals/>;
  return <NotebookEntry record={record} className="nc-notebook" chapters={[
    { label: "Eighteen fifty-seconds", children: <>
      <Scan src="p06-p07-problem-2-answer.jpg" width={490} height={1186}
        alt="Two columns of the Sibu congkan reprint, read right to left: 荅曰, then 上禾一秉實一斗五十二分斗之十, ending at the foot of page 6, with 八 at the head of page 7, followed by 下禾一秉實五十二分斗之四十一."
        caption="SIBU CONGKAN, PP. 6–7 / PROBLEM 2’S ANSWER: 一斗五十二分斗之十 | 八, BROKEN ACROSS THE PAGES"/>
      <p className="nc-play-link record-voice"><Link href="/demos/nine-chapters">OPEN THE PLAYGROUND ↗</Link><span>Every page of chapter 8, on a counting board, in your browser.</span></p>
      {act(0)}
      <NineChaptersRunner label="PROBLEM 2, AS TRANSCRIBED / CHANGE IT AND RUN IT AGAIN" page={PROBLEM_2} play="/demos/nine-chapters?page=no-02"
        note="Two columns, the first on the right. Liu Hui’s commentary states both, and the Gives lines check them. Solve does the rest of the procedure and leaves the 法 at 52; the Answer line is checked as the text writes it, over 52, not 26."/>
    </> },
    { label: "A board and what is done to it", children: <>
      {act(1)}
      <StudySequence label="A PAGE IN JIUZHANG’S NOTATION" steps={[
        { label: "A COLUMN", value: "Set right  3 2 1 39", detail: "置……於右方: a column of rods, each position top to bottom, the 實 last. Columns are set from the right." },
        { label: "徧乘", value: "Multiply middle by the head of right.", detail: "Multiply the whole of a column by the first figure of another that is not empty." },
        { label: "直除", value: "Take right from middle until the head is gone.", detail: "Take one column from another as many times as empties the head." },
        { label: "WHAT THE SOURCE STATES", value: "Answer 1 18/52, 41/52", detail: "Checked against the board, and how each fraction is written: 1 18/52 is not to be reduced to 1 9/26." },
      ]} note="A transcription never corrects the text. Where the text’s signs give the wrong answer, the page has the text’s signs."/>
      <NineChaptersHover label="WHAT THE EDITOR SAYS OVER 直除: JIUZHANG’S LANGUAGE SERVER, ASKED IN THIS PAGE" page={PROBLEM_1} lines={[12, 16]}
        targets={[{ label: "TAKE … UNTIL THE HEAD IS GONE", line: 16, character: 0, length: 46 }, { label: "MULTIPLY … BY THE HEAD", line: 15, character: 0, length: 37 }, { label: "SET RIGHT", line: 12, character: 0, length: 9 }]}
        note="Problem 1, three kinds of grain. This is what the editor shows when the pointer rests on an operation, and what the VS Code extension shows: the same language server, jiuzhang lsp, running here in the page. Over the 直除 it says what was done to each position by the rule of signs, what it costs in 算 under each rule of counting, the board after it, and the words of the text it transcribes."/>
      <NineChaptersRunner label="TRY IT ON THE BOARD / FOUR EDITS, EACH RUN AS YOU PRESS IT" page={PROBLEM_6} play="/demos/nine-chapters?page=no-06" steps={STEPS}/>
    </> },
    { label: "39 statements", kind: "evidence", children: <>
      <NoteLedger label="BEFORE THE COUNTS: WHAT WAS CHECKED, WHAT WAS LEFT OUT, AND WHAT EACH COUNT IS OF" lanes={LANES}
        note="Two counts, of two different things: statements the board reaches, and how the eleven fractional answers are written. Every figure is from the repository’s README, against this project’s transcription."/>
      {act(2)}
      <StudyMeasures label="JIUZHANG VERIFY: 26 PAGES, THE 18 PROBLEMS AND 8 PAGES OF COMMENTARY" items={[
        { label: "AGREE WITH THE BOARD", value: "38", detail: "Answers, columns a commentator gives, rates and counts of 算." },
        { label: "DO NOT", value: "1", detail: "Problem 6’s answer, by this edition’s signs, which Li Huang corrected." },
        { label: "NOT REACHED", value: "5", detail: "They come after a step that cannot be done." },
      ]} note="Statements, not figures: one can hold several, and some figures the sources give are quoted and not checked. Not a census of every number in the text. Every count is against this project’s transcription, under the choices in jiuzhang decisions."/>
    </> },
    { label: "How the answers are written", kind: "evidence", children: <>
      {act(3)}
      <StudyMeasures label="ELEVEN ANSWERS WITH FRACTIONS: WHICH READING OF THE LAST STEP WRITES THEM AS THE TEXT DOES" items={[
        { label: "EVERY 實 OVER THE 法 AS THE BOARD LEAVES IT", value: "7 of 11", detail: "Problem 1’s board leaves 36; the text writes quarters. Problem 2’s 52 is the board’s." },
        { label: "EACH ANSWER IN ITS LOWEST TERMS", value: "9 of 11", detail: "Problem 2’s 52 and Problem 14’s 111 survive." },
        { label: "THE 法 AND THE 實S DIVIDED BY WHAT THEY SHARE (約)", value: "11 of 11", detail: "The same denominators as each answer reduced and all written over their least common denominator." },
      ]} note="This shows how the answers are written, not where in the working a reduction was made, or how they were found."/>
    </> },
    { label: "Problem 6", kind: "evidence", children: <>
      <Scan src="p14-problem-6-procedure.jpg" width={740} height={1240}
        alt="Page 14 of the Sibu congkan reprint: the answer to Problem 6, 上禾一秉實八斗, 下禾一秉實三斗, and its procedure, 術曰如方程置上禾三秉正下禾十秉負益實六斗正次置上禾二秉負下禾五秉正益實一斗正以正負術入之."
        caption="SIBU CONGKAN, P. 14 / PROBLEM 6’S PROCEDURE: 益實六斗正 … 益實一斗正"/>
      {act(4)}
      <NineChaptersRunner label="PROBLEM 6, AS THIS EDITION PRINTS IT" page={PROBLEM_6} play="/demos/nine-chapters?page=no-06"
        note="Change the 實 of both columns to −6 and −1, the 負 of the other text consulted and of Li Huang’s correction, and run it again: the board gives 8 and 3."/>
    </> },
    { label: "Dai Zhen’s 145 and 99", kind: "evidence", children: <>
      <Scan src="p48-one-hundred-forty-five-suan.jpg" width={506} height={613}
        alt="Part of page 48 of the Sibu congkan reprint, Dai Zhen's collation notes in small characters; the second column from the left reads 則一百四十五算."
        caption="SIBU CONGKAN, P. 48 / DAI ZHEN’S 訂訛: …兼乘減除言之則一百四十五算"/>
      {act(5)}
      <StudyMeasures label="PROBLEM 18 BY DAI ZHEN’S TWO WAYS: 算 UNDER THREE RULES OF COUNTING" items={[
        { label: "PLAIN", value: "145 / 101", detail: "Each multiplication, taking and division of one figure, less the heads cross-multiplying makes equal." },
        { label: "WORKED", value: "140 / 98", detail: "Also saving everything multiplied or divided by one." },
        { label: "READOFF", value: "145 / 99", detail: "Plain, with a division by one read off. Proposed by the review after both counts were known." },
      ]} note="He says 145 and 99. His words define none of these rules fully, and none is preferred. jiuzhang counts gives every rule."/>
      <NineChaptersRunner label="PROBLEM 18, BY DAI ZHEN’S PLAIN METHOD" page={DAI_ZHEN_145} play="/demos/nine-chapters?page=dai-zhen-18"
        note="Solve by cross cross-multiplies each pair of columns; Count 145 is checked against every rule of counting, and the line says which give it."/>
      {act(6)}
    </> },
    { label: "Liu Hui’s 77", kind: "evidence", children: <>
      <Scan src="p32-seventy-seven-suan.jpg" width={273} height={1266}
        alt="Four columns of page 32 of the Sibu congkan reprint, Liu Hui's commentary to Problem 18; the second from the left reads 此凡用七十七算以新術爲此先以第四."
        caption="SIBU CONGKAN, P. 32 / LIU HUI: 此凡用七十七算"/>
      {act(7)}
      <StudyMeasures label="A SMALL MENU OF OPERATIONS FOR EACH CLAUSE OF THE PASSAGE AS PRINTED" items={[
        { label: "COMBINATIONS", value: "100,000,000", detail: "Of the menu’s operations, not 100,000,000 interpretations." },
        { label: "DONE TO THE END", value: "229,906" },
        { label: "LEAVE THE PRICE OF 黍", value: "0", detail: "As the passage says the 4th column should." },
      ]} note="None of these readings of the unemended passage works, nor any in the review’s wider search. Chemla and Guo (2004) emend the passage and Guo Shuchun (2020) works it to 77; those emendations were not run here, and Liu Hui’s 77 is not tested."/>
    </> },
    { label: "An independent review", children: <>
      {act(8)}
      <StudyMeasures label="WHAT A SECOND MODEL FOUND IN COMMIT 8532977" items={[
        { label: "MISTRANSCRIPTIONS AT THE PLACES CHECKED", value: "0", detail: "Every answer, Problem 6’s signs, the commentary figures, the 77 passage and the four counts, against the scans." },
        { label: "PROBE PAGES THAT MADE THE CHECKER FAIL", value: "fixed", detail: "A contradictory board ticked, a stale answer, wrong arity and unwritten forms unmarked, unchecked fractions." },
        { label: "CLAIMS WIDER THAN THE PROGRAM", value: "reworded", detail: "Statements, not figures; recorded boards; the census’s menu; Dai Zhen’s rules." },
      ]} note="The review is a model’s, like the transcription. No person has checked either."/>
    </> },
    { label: "Reading the text", children: <>{act(9)}</> },
    { label: "Earlier work", children: <>{act(10)}</> },
    { label: "Run it yourself", kind: "operate", children: <>{act(11)}</> },
    { label: "What this does not show", children: <>
      {act(12)}
      {act(13)}
    </> },
    { label: "What the chapter has become", children: <>{act(14)}</> },
  ]}/>;
}
