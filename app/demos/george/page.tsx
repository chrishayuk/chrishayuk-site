import { GeorgePlayground } from "@/components/GeorgePlayground";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";

export const metadata = { ...pageMetadata("GEORGE — Hamblin’s reverse Polish scheme for DEUCE, in the browser", "Run GEORGE, the General Order Generator C. L. Hamblin wrote for the English Electric DEUCE in 1957–58, and step through its twelve-cell running accumulator a symbol at a time: a Rust interpreter built from his manual and compiled to WebAssembly.", "/demos/george"), robots: { index: false, follow: true } };

export default function Page() {
  return <main id="main" className="publication-main george-demo">
    <header className="index-intro">
      <p className="kicker record-voice">CHRIS HAY / GEORGE / INTERACTIVE STUDY</p>
      <h1>Twelve cells,<br/><em>last in, first out.</em></h1>
      <p className="dek">GEORGE, the General Order Generator. Written by Charles Hamblin for the English Electric DEUCE at the New South Wales University of Technology, 1957–58. Running here.</p>
      <p>A G-program has no addresses. Each number or variable goes into the next empty cell of a running accumulator of twelve, and each operator works on the last cell or the last two: <strong>a b +</strong> adds a and b, and leaves the sum where a was. A program is run as soon as it is chosen. Step through it below and watch the cells fill and empty. Then try <strong>subroutine</strong>, <strong>converge</strong>, and <strong>simpson</strong>, the manual’s Example 3, which punches a quarter of each integral.</p>
      <div className="inline-links"><Link className="text-link" href="/notebook/a-handwritten-program-from-1958-runs-again">THE WORKING NOTE ↗</Link><a className="text-link" href="https://github.com/chrishayuk/george">SOURCE AND TUTORIAL ↗</a><a className="text-link" href="https://www.uraone.com/computers/deuce/deucdocs.html">THE 1958 DOCUMENTS ↗</a></div>
    </header>
    <GeorgePlayground/>
    <footer className="demo-provenance">
      <p className="record-voice">INTERACTIVE STUDY / RUNS IN YOUR BROWSER</p>
      <p>Nothing on this page is replayed or simulated. george is a Rust program compiled to WebAssembly for WASI, and each run, and each trace, happens in your browser; no program or data is sent anywhere. It was written with a coding agent from Hamblin’s programming and operation manual, and obeys programs a symbol at a time, as GEORGE II did. It is the language of the manual, not Hamblin’s program. His program survives as coding sheets for DEUCE, and in the repository it runs on a simulated DEUCE, where it punches the same numbers as this interpreter for 14 of the 16 examples; that run is not in the browser. Where the manual leaves a question open, what was decided is listed with the source. sin and cos are computed in double precision and rounded, not by the machine’s polynomial. The examples are the manual’s programs as printed, apart from the data and the punching of results the manual leaves in store.</p>
      <details><summary>Sources</summary><p className="record-voice">
        C. L. HAMBLIN, “GEORGE IA AND II: A SEMI-TRANSLATION PROGRAMMING SCHEME FOR DEUCE. PROGRAMMING AND OPERATION MANUAL”, UNIVERSITY OF NEW SOUTH WALES, C. 1958<br/>
        “GEORGE FLOW DIAGRAMS”, C. 1958, 52 PP., HANDWRITTEN<br/>
        “UTECOM PROGRAMME GEORGE”, CODING SHEETS, C. 1958, 22 PP., HANDWRITTEN<br/>
        DAVID GREEN’S DEUCE ARCHIVE, SCANS SUPPLIED BY ROBIN VOWELS
      </p></details>
    </footer>
  </main>;
}
