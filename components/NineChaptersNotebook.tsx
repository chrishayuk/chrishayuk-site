import type { ReactNode } from "react";
import type { PublicationRecord } from "@/lib/types";
import { StudyMeasures, StudySequence } from "@chrishayuk/hause/components/exhibition/Study";
import { NotebookEntry } from "./NotebookEntry";
import { Acts } from "./Acts";
import Link from "next/link";
import { NineChaptersRunner } from "./NineChaptersRunner";

const SCANS = "https://commons.wikimedia.org/wiki/File:Sibu_Congkan0392-%E5%8A%89%E5%BE%BD-%E4%B9%9D%E7%AB%A0%E7%AE%97%E8%A1%93-3-3.djvu";

// Pages as transcribed in github.com/chrishayuk/nine-chapters, corpus/ (no-02.jz,
// no-06.jz, and dai-zhen-18.jz up to its Count 145).
const PROBLEM_2 = "No. 8.2\n% Sibu congkan pp. 6-7\n\"今有上禾七秉，損實一斗，益之下禾二秉，而實十斗，下禾八秉，益實一斗，與上禾二秉，而實十斗，問上下禾實一秉各幾何\"\n% Suppose 7 bundles of top-grade grain, their yield lessened by 1 dou, with 2 bundles of low-grade\n% grain added, yield 10 dou; 8 bundles of low-grade grain, their yield increased by 1 dou, with\n% 2 bundles of top-grade, yield 10 dou. How much does one bundle of each grade yield?\n\"荅曰，上禾一秉實一斗五十二分斗之十八，下禾一秉實五十二分斗之四十一\"\n% Answer: one bundle of top grain yields 1 dou and 18/52 of a dou; one of low grain, 41/52 of a dou.\n% (十 / 八 of the first answer is broken across pp. 6-7.)\n\"術曰，如方程，損之曰益，益之曰損，損實一斗者，其實過十斗也，益實一斗者，其實不滿十斗也\"\n% in 斗\n% The procedure says only 如方程, with 損之曰益，益之曰損: the 斗 taken off the first\n% condition is added to its 實 (10 + 1), and the 斗 put on the second is taken from\n% its 實 (10 - 1). Each condition is a column, the first the right.\nThings 上禾 下禾 實\nSet right  7 2 11        \"損之曰益\"\nSet left   2 8 9         \"益之曰損\"\nGives right 7 2 11       \"今按實云上禾七秉，下禾二秉，實十一斗\"\nGives left  2 8 9        \"上禾二秉，下禾八秉，實九斗也\"\n% Liu Hui's commentary states both columns; the Gives lines record it.\nSolve.\nAnswer 1 18/52, 41/52\n";
const PROBLEM_6 = "No. 8.6\n% Sibu congkan pp. 13-14\n\"今有上禾三秉，益實六斗，當下禾十秉，下禾五秉，益實一斗，當上禾二秉，問上下禾實一秉各幾何\"\n% Suppose the yield of 3 bundles of top-grade grain, increased by 6 dou, equals that of 10 bundles\n% of low-grade; the yield of 5 bundles of low-grade, increased by 1 dou, equals that of 2 bundles\n% of top-grade. How much does one bundle of each grade yield?\n\"荅曰，上禾一秉實八斗，下禾一秉實三斗\"\n% Answer: one bundle of top grain yields 8 dou; one of low grain, 3 dou.\n\"術曰，如方程，置上禾三秉正，下禾十秉負，益實六斗正，次置上禾二秉負，下禾五秉正，益實一斗正，以正負術入之\"\n% in 斗\n% The signs are set as the procedure states them, 益實 正 in both columns (image p. 14\n% reads 正 after 益實六斗 and after 益實一斗; re-read, it says so). The Wikisource\n% text of this scan agrees (正, 正). The punctuated Wikisource text of another edition\n% (jiuzhang.wiki) reads 益實六斗負 ... 益實一斗負; with those signs the board gives 8, 3.\n% Not changed: this page follows the scan. jiuzhang finds -8, -3 (法 -5, 實 40 15).\nThings 上禾 下禾 實\nSet right  3 -10 6       \"置上禾三秉正，下禾十秉負，益實六斗正\"\nSet left   -2 5 1        \"次置上禾二秉負，下禾五秉正，益實一斗正\"\nSolve.                   \"以正負術入之\"\nAnswer 8, 3\n";
const DAI_ZHEN_145 = "No. 8.18 (Dai Zhen, 訂訛: 145 and 99)\n% Sibu congkan pp. 48-49, Dai Zhen's collation notes on Liu Hui's commentary to Problem 18.\n% He calls Liu Hui's account of the old method corrupt (訛舛不可通) and gives his own,\n% with his own counts of 算.\n\"以上所言舊術訛舛不可通據方程術凡五物及總價求其各物之價者應列五行行五位及價以上一位互乘因徧乘次位以下及價兩兩相對減去其頭位所減之餘重列之減至一物一價乃止物爲法價爲實實如法而一得一物之價轉減而上以知各價\"\n% \"What is said above of the old method is corrupt and cannot be followed. By the fangcheng\n% procedure, to find each price from five things and their total prices, set five columns of\n% five positions and the price; cross-multiply by the top positions, and so multiply through the\n% positions below and the price; take each pair from the other to remove its head; set out again\n% what is left; go on until one thing and one price remain. The thing is the 法, the price the 實;\n% divide, and one price is found; work back upwards to know each price.\"\nThings 麻 麥 菽 荅 黍 實\nSet right 9 7 3 2 5 140\nSet 2nd   7 6 4 5 3 128\nSet 3rd   3 5 7 6 4 116\nSet 4th   2 5 3 9 4 112\nSet left  1 3 2 8 5  95\nSolve by cross.\nAnswer 7, 4, 3, 5, 6\n\"先化五爲四次化四爲三次化三爲二次化二爲一凡用十算兼乘減除言之則一百四十五算\"\n% \"First five become four, then four three, three two, two one: ten [eliminations] in all;\n% counting multiplications, takings and divisions together, 145 算.\"\nCount 145                                    \"兼乘減除言之則一百四十五算\"\n";

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
    </> },
    { label: "38 figures", kind: "evidence", children: <>
      {act(2)}
      <StudyMeasures label="JIUZHANG VERIFY: 26 PAGES, THE 18 PROBLEMS AND 8 PAGES OF COMMENTARY" items={[
        { label: "AGREE WITH THE BOARD", value: "37", detail: "Answers, columns a commentator says the board holds, rates and counts of 算." },
        { label: "DO NOT", value: "1", detail: "Problem 6’s answer, by this edition’s signs." },
        { label: "NOT REACHED", value: "5", detail: "They come after a step that cannot be done." },
      ]} note="Every count is against this project’s transcription, under the choices in jiuzhang decisions."/>
    </> },
    { label: "How the answers are written", kind: "evidence", children: <>
      {act(3)}
      <StudyMeasures label="ELEVEN ANSWERS WITH FRACTIONS: WHICH READING OF THE LAST STEP WRITES THEM AS THE TEXT DOES" items={[
        { label: "EVERY 實 OVER THE 法 AS THE BOARD LEAVES IT", value: "7 of 11", detail: "Problem 1’s board leaves 36; the text writes quarters." },
        { label: "EACH ANSWER IN ITS LOWEST TERMS", value: "9 of 11", detail: "Problem 2’s 52 and Problem 14’s 111 survive." },
        { label: "THE 法 AND THE 實S DIVIDED BY WHAT THEY SHARE (約)", value: "11 of 11", detail: "One common factor taken out of the board." },
      ]} note="This describes how the answers are written. It does not show how they were found."/>
    </> },
    { label: "Problem 6", kind: "evidence", children: <>
      <Scan src="p14-problem-6-procedure.jpg" width={740} height={1240}
        alt="Page 14 of the Sibu congkan reprint: the answer to Problem 6, 上禾一秉實八斗, 下禾一秉實三斗, and its procedure, 術曰如方程置上禾三秉正下禾十秉負益實六斗正次置上禾二秉負下禾五秉正益實一斗正以正負術入之."
        caption="SIBU CONGKAN, P. 14 / PROBLEM 6’S PROCEDURE: 益實六斗正 … 益實一斗正"/>
      {act(4)}
      <NineChaptersRunner label="PROBLEM 6, AS THIS EDITION PRINTS IT" page={PROBLEM_6} play="/demos/nine-chapters?page=no-06"
        note="Change the 實 of both columns to −6 and −1, the 負 of the other text consulted, and run it again: the board gives 8 and 3."/>
    </> },
    { label: "Dai Zhen’s 145", kind: "evidence", children: <>
      <Scan src="p48-one-hundred-forty-five-suan.jpg" width={506} height={613}
        alt="Part of page 48 of the Sibu congkan reprint, Dai Zhen's collation notes in small characters; the second column from the left reads 則一百四十五算."
        caption="SIBU CONGKAN, P. 48 / DAI ZHEN’S 訂訛: …兼乘減除言之則一百四十五算"/>
      {act(5)}
      <StudyMeasures label="PROBLEM 18: 算 BY ONE RULE OF COUNTING" items={[
        { label: "THE TEXT’S 徧乘 AND 直除", value: "158" },
        { label: "DAI ZHEN’S 互乘", value: "145", detail: "As he says." },
        { label: "DAI ZHEN’S SHORTER WAY", value: "101 or 98", detail: "He says 99. Three operations by ±1 separate the two." },
      ]} note="Every multiplication, taking and division of one figure, leaving out the heads that cross-multiplying makes equal. jiuzhang counts gives every rule."/>
      <NineChaptersRunner label="PROBLEM 18, BY DAI ZHEN’S PLAIN METHOD" page={DAI_ZHEN_145} play="/demos/nine-chapters?page=dai-zhen-18"
        note="Solve by cross cross-multiplies each pair of columns; Count 145 is checked against every rule of counting, and the line says what each gives."/>
    </> },
    { label: "Liu Hui’s 77", kind: "evidence", children: <>
      <Scan src="p32-seventy-seven-suan.jpg" width={273} height={1266}
        alt="Four columns of page 32 of the Sibu congkan reprint, Liu Hui's commentary to Problem 18; the second from the left reads 此凡用七十七算以新術爲此先以第四."
        caption="SIBU CONGKAN, P. 32 / LIU HUI: 此凡用七十七算"/>
      {act(6)}
      <StudyMeasures label="EVERY READING OF THE PASSAGE THIS PROJECT COULD FIND" items={[
        { label: "READINGS", value: "100,000,000" },
        { label: "DONE TO THE END", value: "229,906" },
        { label: "LEAVE THE PRICE OF 黍", value: "0", detail: "As the passage says the 4th column should." },
      ]} note="None of these readings works. That does not show that no reading does; Liu Hui’s 77 is not tested."/>
    </> },
    { label: "Reading the text", children: <>{act(7)}</> },
    { label: "Run it yourself", kind: "operate", children: <>{act(8)}</> },
    { label: "What this does not show", children: <>
      {act(9)}
      {act(10)}
    </> },
  ]}/>;
}
