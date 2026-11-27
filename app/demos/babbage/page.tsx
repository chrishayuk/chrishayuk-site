import { BabbagePlayground } from "@/components/BabbagePlayground";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";

export const metadata = { ...pageMetadata("Babbage’s programs of 1837 to 1841, run in the browser", "Charles Babbage’s notations of calculations for the Analytical Engine, Series L, run as he wrote them: the mill and the columns of the store, stepped one operation at a time, and every cell of the sheet checked, in your browser.", "/demos/babbage"), robots: { index: false, follow: true } };

export default function Page() {
  return <main id="main" className="publication-main babbage-demo">
    <header className="index-intro">
      <p className="kicker record-voice">CHRIS HAY / THE ANALYTICAL ENGINE / INTERACTIVE STUDY</p>
      <h1>Babbage’s programs of 1837 to 1841,<br/><em>run as he wrote them.</em></h1>
      <p className="dek">Every sheet of Series L in the Babbage Papers that has images, from the two programs of 4 and 5 August 1837 to the fair copy of 1841: equations eliminated, polynomials tabulated by differences, the radius vector of an ellipse, and the looped program of June 1838.</p>
      <p>Choose a program and step through it. In the mill: the operation, where each number came from, and the table of multiples it keeps. In the store: each column read is left at zero, and each column given a number shows it. <strong>numbers</strong> runs the same program on a worked example. <strong>strict</strong> runs it without ever taking the sheet’s value where the sheet and the machine differ, so that a slip carries through to what follows. Below, the sheet as Babbage laid it out, each row checked, and the transcription, which runs again as you edit it. Try <strong>L001-2, operation 12</strong>, or <strong>L017</strong> with strict on.</p>
      <div className="inline-links"><Link className="text-link" href="/notebook/babbage-reordered-a-program-to-save-ten-turns-of-the-hand">THE WORKING NOTE ↗</Link><a className="text-link" href="https://github.com/chrishayuk/analytical-engine">SOURCE AND TUTORIAL ↗</a><a className="text-link" href="https://collection.sciencemuseumgroup.org.uk/documents/aa110000065">THE SHEET ↗</a></div>
    </header>
    <BabbagePlayground/>
    <footer className="demo-provenance">
      <p className="record-voice">INTERACTIVE STUDY / RUNS IN YOUR BROWSER</p>
      <p>Nothing on this page is a recording. babbage is a Rust program compiled to WebAssembly, and each program runs in your browser; nothing you type is sent anywhere. The tables were transcribed from the Science Museum’s scans by a coding agent and have not been checked by a person. The engine has only the rules the dated sheets show; each is listed, with what it rests on, in the repository. The worked example’s numbers are chosen here, not Babbage’s.</p>
      <details><summary>Sources</summary><p className="record-voice">
        C. BABBAGE, NOTATIONS OF CALCULATIONS FOR THE ANALYTICAL ENGINE, BAB/L/001 TO L/027, 1837–1841, THE BABBAGE PAPERS, SCIENCE MUSEUM GROUP<br/>
        R. ROJAS, “THE FIRST COMPUTER PROGRAM”, ARXIV:2303.13740, 2023<br/>
        PROGRAM GITHUB.COM/CHRISHAYUK/ANALYTICAL-ENGINE
      </p></details>
    </footer>
  </main>;
}
