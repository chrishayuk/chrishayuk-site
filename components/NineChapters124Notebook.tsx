import type { PublicationRecord } from "@/lib/types";
import { StudyMeasures } from "@chrishayuk/hause/components/exhibition/Study";
import { NotebookEntry } from "./NotebookEntry";
import { Acts } from "./Acts";
import Link from "next/link";
import { NineChaptersRunner } from "./NineChaptersRunner";

// github.com/chrishayuk/nine-chapters, corpus/guo-18-new.jz
const GUO_124 = "No. 8.18 (Guo Shuchun's reading of Liu Hui's 124)\n% Liu Hui's new method (方程新術) on Problem 18, as Guo Shuchun works it: 九章筭術譯注 (revised, 2020),\n% ch. 8, notes 41-62, figure 8-8 (not in the transcription read). Read by a second model, OpenAI Codex,\n% which marked what it read and what it reconstructed; see docs/guo-77.md, section 3. The operations\n% are its expansion of the procedure, cross-checked against Guo's notes; how many times each column is\n% taken is worked out from the figures, not read from Guo's figure. The figures asserted are those the\n% notes or the text state. Guo gives no tally for the 124 (n. 82 states the total only).\n% Liu Hui's 124 covers the whole method; this page is the part that finds the rates (to n. 62). The\n% last part, the columns set afresh, is the page liu-hui-18-rates.\n\"方程新術曰以正負術入之令左右相減先去下實又轉去物位求其一行二物正負相借者易其相當之率\"\nThings 麻 麥 菽 荅 黍 實\nSet right 9 7 3 2 5 140\nSet 2nd   7 6 4 5 3 128\nSet 3rd   3 5 7 6 4 116\nSet 4th   2 5 3 9 4 112\nSet left  1 3 2 8 5  95\n% n. 42: the 4th from the 3rd\nTake 4th from 3rd.                           \"以新術爲此先以第四行減第三行\"\n% the 3rd is now 1 0 4 -3 0 4\n% n. 43: the 實s of the right, the 2nd and the 4th removed by the 3rd\nTake 3rd from right 35 times.                \"次以第三行去右行\"\nTake 3rd from 2nd 32 times.                  \"及第二行\"\nTake 3rd from 4th 28 times.                  \"第四行下位\"\n% n. 44: the text prints 右行, whose 實 is already gone; read as 左行, as Guo works it\nTake 3rd from left 23 times.                 \"又以減右行下位不足減乃止\"\n% n. 45\nTake left from 3rd.                          \"次以左行減第三行下位\"\n% n. 46\nTake 3rd from left 3 times.                  \"次以第三行去左行下位\"\n% Every operation so far is fixed by the text: 減 once, 去 until the 實 is gone, 不足減乃止 as far\n% as it goes. The board now holds the most rods it ever holds on this path, 124 (`jiuzhang rods`),\n% and the text drops the 3rd column at once.\nDrop 3rd.                                    \"訖廢去第三行\"\n% n. 47\nTake 4th from left 5 times.\nTake 4th from right.\n% n. 48\nTake right from 2nd 3 times.\nTake right from 4th 4 times.\n% n. 49\nTake 2nd from 4th.\nAdd 2nd to left.\n% n. 50\nTake 4th from left 3 times.\n% n. 51: added, then halved twice\nAdd left to 2nd.\nHalve 2nd.                                   \"餘可再半\"\nHalve 2nd.\n% n. 52\nAdd 4th to left 17 times.\nTake 4th from 2nd 2 times.\n% n. 53\nAdd 2nd to left 11 times.\nGives left 0 0 -310 186 0 0\nDivide left by 62.                           \"餘約之\"\nGives left 0 0 -5 3 0 0 | Gives left 0 0 5 -3 0 0   \"上得五下得三是菽五當荅三\"\n% n. 54\nTake left from 2nd 19 times.\nAdd left to 4th 8 times.\nTake left from right 5 times.\n% n. 55\nTake right from 2nd 2 times.\n% n. 56\nTake 2nd from right 2 times.\n% n. 57\nTake left from right 3 times.\nGives right 0 0 0 -6 5 0 | Gives right 0 0 0 6 -5 0   \"餘上得六下得五是爲荅六當黍五\"\n% n. 58\nAdd left to right 2 times.\nGives right 0 0 -10 0 5 0\nDivide right by 5.                           \"餘約之\"\nGives right 0 0 -2 0 1 0\n% n. 59\nAdd right to 2nd 2 times.\n% n. 60\nAdd 2nd to 4th.\nAdd 2nd to left.\n% n. 61: added as written, the 2nd is 0 3 -4; Guo's note gives -3 4, the same rate (docs/guo-77.md)\nAdd left to 2nd 2 times.\nGives 2nd 0 3 -4 0 0 0 | Gives 2nd 0 -3 4 0 0 0   \"餘上得三下得四是爲麥三當菽四\"\n% n. 62: with the 2nd as added, the 4th takes it by adding\nAdd 2nd to 4th.\nAdd 4th to 2nd 4 times.\nGives 2nd -4 7 0 0 0 0 | Gives 2nd 4 -7 0 0 0 0   \"餘上得四下得七是爲麻四當麥七\"\n\"是爲相當之率舉矣\"\nCount 124                                    \"如此則凡用一百二十四算也\"\n% The 124 is for the whole method, the last part too; this page stops before it. A count that is\n% already more than 124 here cannot be Liu Hui's.\n";

/** The 124: Guo's working of the new method, run, and counted two ways. */
export function NineChapters124Notebook({ record }: { record: PublicationRecord }) {
  const act = (index: number) => <Acts acts={[record.body[index]]} anchored offset={index} staticRefusals/>;
  return <NotebookEntry record={record} className="nc-notebook" chapters={[
    { label: "Two numbers", children: <>
      <p className="nc-play-link record-voice"><Link href="/demos/nine-chapters?page=guo-18-new">OPEN THE NEW METHOD ON THE BOARD ↗</Link><span>Step to the moment before the third column is taken away.</span></p>
      {act(0)}
    </> },
    { label: "The new method, as Guo works it", kind: "evidence", children: <>
      {act(1)}
      <NineChaptersRunner label="LIU HUI’S NEW METHOD, AS GUO WORKS IT / CHANGE IT AND RUN IT AGAIN" page={GUO_124} play="/demos/nine-chapters?page=guo-18-new"
        note="Each Gives line is a figure the text or Guo’s notes state, checked against the board. The Count line is checked under every rule of counting operations, and none gives 124."/>
    </> },
    { label: "As operations", kind: "evidence", children: <>
      {act(2)}
      <StudyMeasures label="THE PART THAT FINDS THE RATES, COUNTED AS OPERATIONS" items={[
        { label: "GUO’S RULE (2020, N. 40)", value: "228", detail: "A column taken 35 times is 35 takings, as in his tally of the 77." },
        { label: "EACH FIGURE MULTIPLIED, TAKEN OR DIVIDED", value: "199" },
        { label: "EVERY FIGURE, BY ONE OR NOT", value: "123", detail: "The last part’s first taking alone adds 6." },
        { label: "EACH OPERATION ON A WHOLE COLUMN", value: "35" },
      ]} note="Liu Hui says 124 for the whole method. No count of operations gives it."/>
    </> },
    { label: "As rods", kind: "evidence", children: <>
      {act(3)}
      <StudyMeasures label="RODS ON THE BOARD, AFTER EACH OPERATION THE TEXT FIXES" items={[
        { label: "FIVE COLUMNS SET", value: "116" },
        { label: "THE 4TH FROM THE 3RD; THE 實S CLEARED", value: "104–109" },
        { label: "THE LEFT FROM THE 3RD; THE 3RD CLEARS THE LEFT", value: "124", detail: "23, 21, 27, 27 and 26 in the five columns. The most it ever holds." },
        { label: "訖廢去第三行", value: "97", detail: "The third column, 27 rods, taken away." },
      ]} note="Counted with the rule that confirms all fifteen of Hart’s counts for the 77."/>
      {act(4)}
    </> },
    { label: "The old method, asked the same", kind: "evidence", children: <>
      {act(5)}
      <StudyMeasures label="THE MOST RODS ON THE BOARD, BY WORKING" items={[
        { label: "THE NEW METHOD, GUO’S WORKING", value: "124", detail: "Liu Hui: 124." },
        { label: "THE OLD METHOD, GUO’S WORKING, FIVE COLUMNS SET", value: "116", detail: "Liu Hui: 77." },
        { label: "THE SAME, EACH COLUMN SET WHEN FIRST USED", value: "100" },
        { label: "THE OLD METHOD, HART’S PATH", value: "77", detail: "Built to keep within 77." },
      ]} note="Read as rods, the 124 falls out of the one published working of the new method; the 77 needs a path chosen for it."/>
    </> },
    { label: "What is already known", children: <>{act(6)}</> },
    { label: "Run it yourself", kind: "operate", children: <>{act(7)}</> },
    { label: "What this does not show", children: <>{act(8)}{act(9)}</> },
    { label: "What the second number did", children: <>{act(10)}</> },
  ]}/>;
}
