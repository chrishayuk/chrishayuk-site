import { NineChaptersPlayground } from "@/components/NineChaptersPlayground";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";

export const metadata = { ...pageMetadata("The Nine Chapters, chapter 8, on a counting board — every procedure worked in rods in the browser", "Chapter 8 of the Nine Chapters on the Mathematical Art (九章算術, 方程), set out in counting rods and worked a step at a time as the text says, with what the text and its commentators state checked where the notation can hold it. jiuzhang, in Rust, compiled to WebAssembly; the board drawn with three.js.", "/demos/nine-chapters"), robots: { index: false, follow: true } };

const SCANS = "https://commons.wikimedia.org/wiki/File:Sibu_Congkan0392-%E5%8A%89%E5%BE%BD-%E4%B9%9D%E7%AB%A0%E7%AE%97%E8%A1%93-3-3.djvu";

export default function Page() {
  return <main id="main" className="publication-main nc-demo">
    <header className="index-intro">
      <p className="kicker record-voice">CHRIS HAY / THE NINE CHAPTERS / INTERACTIVE STUDY</p>
      <h1>The Nine Chapters,<br/><em>on a counting board.</em></h1>
      <p className="dek">Chapter 8 of the <i>Nine Chapters on the Mathematical Art</i> (九章算術, 方程), with the commentaries of Liu Hui (263) and Dai Zhen (1770s). Every problem, and the boards its commentators work, set out in rods and worked a step at a time as the text says; what the text states, where the notation can hold it, checked against what the board gives.</p>
      <p>Choose a page and step through it, or play it. A rod that stays stays put; a new one is dropped into place; the rods taken off are knocked off the felt. The column taken and the column taken from are lit, and the running count of operations (算), the rods on the board and the widest figure are kept in the corner. Start with <strong>Problem 2</strong>, whose answer the text writes as 1 18/52, not 1 9/26; then <strong>Problem 6</strong>, where the signs this edition prints give −8 and −3.</p>
      <div className="inline-links"><Link className="text-link" href="/notebook/the-nine-chapters-writes-18-52-as-the-board-leaves-it">THE WORKING NOTE ↗</Link><a className="text-link" href="https://github.com/chrishayuk/nine-chapters">SOURCE AND TUTORIAL ↗</a><a className="text-link" href={SCANS}>THE SCANS ↗</a></div>
    </header>
    <NineChaptersPlayground/>
    <footer className="demo-provenance">
      <p className="record-voice">INTERACTIVE STUDY / RUNS IN YOUR BROWSER</p>
      <p>Nothing on this page is a recording. jiuzhang is a Rust program compiled unchanged to WebAssembly for WASI, and each page is run in your browser; nothing you type is sent anywhere. The board is drawn with three.js, and the rods taken off fall under Rapier; without WebGL the board is shown as text. The text is the Sibu congkan photographic reprint of the Weiboxie edition, read from the page images on Wikimedia Commons by a coding agent and its sub-agents; a second model reviewed it against the scans at the answers, the signs, the commentary figures and the counts, and no person has checked it. Every ✓ and ✗ is against that transcription, under the choices <code>jiuzhang decisions</code> lists. Some figures the sources give, such as rates read crosswise and arithmetic in fractions off the board, are kept as the source’s words and not checked. A transcription never corrects the text: where the text’s signs give the wrong answer, the page has the text’s signs.</p>
      <details><summary>Sources</summary><p className="record-voice">
        九章算術, 四部叢刊 REPRINT OF THE 微波榭 EDITION, WITH LIU HUI’S COMMENTARY, LI CHUNFENG’S NOTES AND DAI ZHEN’S 訂訛, WIKIMEDIA COMMONS<br/>
        JIUZHANG GITHUB.COM/CHRISHAYUK/NINE-CHAPTERS<br/>
        INDEPENDENT REVIEW BY OPENAI CODEX, 23 NOVEMBER 2026, GITHUB.COM/CHRISHAYUK/NINE-CHAPTERS/BLOB/MAIN/DOCS/INDEPENDENT-REVIEW.MD
      </p></details>
    </footer>
  </main>;
}
