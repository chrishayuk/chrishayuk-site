import { AlgolPlayground } from "@/components/AlgolPlayground";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";

export const metadata = { ...pageMetadata("ALGOL 60, as the Report defines it and as the first compiler ran it", "Run ALGOL 60 in the browser twice: as the 1962 Revised Report defines it, and as Dijkstra and Zonneveld’s system for the Electrologica X1 ran it in the early 1960s, rebuilt from its documents and checked against its own printout of 1964.", "/demos/algol-60"), robots: { index: false, follow: true } };

export default function Page() {
  return <main id="main" className="publication-main algol-demo">
    <header className="index-intro">
      <p className="kicker record-voice">CHRIS HAY / ALGOL 60 / INTERACTIVE STUDY</p>
      <h1>ALGOL 60,<br/><em>run twice.</em></h1>
      <p className="dek">Once as the Revised Report of 1962 defines it. Once as the first implementation ran it: Dijkstra and Zonneveld’s system for the Electrologica X1, Amsterdam, in operation from 1960, as its 1962 manual describes it.</p>
      <p>Choose a program and run it. The left column follows the Report; the right follows the X1, as far as its documents say, and marks every line that differs. Start with <strong>x1-probes</strong>, where every line is a rule on which they part. Then try <strong>jaz164</strong>: Zonneveld’s integration of the outer planets, with a third column holding what the X1 itself printed for it in 1964. The Report column stops at once there, because the program calls the X1’s own library.</p>
      <div className="inline-links"><Link className="text-link" href="/notebook/the-first-algol-60-system">THE WORKING NOTE ↗</Link><a className="text-link" href="https://github.com/chrishayuk/algol-60">SOURCE AND DOCUMENTS ↗</a><a className="text-link" href="https://github.com/chrishayuk/algol-60/blob/main/docs/x1.md">EVERY X1 RULE AND ITS SOURCE ↗</a></div>
    </header>
    <AlgolPlayground/>
    <footer className="demo-provenance">
      <p className="record-voice">INTERACTIVE STUDY / RUNS IN YOUR BROWSER</p>
      <p>Nothing on this page is a recording. algol60 is a Rust interpreter compiled to WebAssembly for WASI, and each program runs in your browser; nothing you type is sent anywhere. The X1 column is a reconstruction. The X1’s compiler survives, but no copy has been found of the run-time routines its programs called, so the X1 column follows what its documents say those routines did, and where they are silent the choice is listed in the repository. It was built with a coding agent.</p>
      <details><summary>Sources</summary><p className="record-voice">
        P. NAUR (ED.), “REVISED REPORT ON THE ALGORITHMIC LANGUAGE ALGOL 60”, 1962<br/>
        F. E. J. KRUSEMAN ARETZ, “THE DIJKSTRA–ZONNEVELD ALGOL 60 COMPILER FOR THE ELECTROLOGICA X1”, CWI, 2003<br/>
        E. W. DIJKSTRA, “CURSUS PROGRAMMEREN IN ALGOL 60”, MATHEMATISCH CENTRUM, 1962<br/>
        J. A. ZONNEVELD, “AUTOMATIC NUMERICAL INTEGRATION”, MATHEMATICAL CENTRE TRACTS 8, 1964<br/>
        S. VAKULENKO, X1 SIMULATOR, GITHUB.COM/SERGEV/X1-ALGOL-COMPILER<br/>
        INTERPRETER GITHUB.COM/CHRISHAYUK/ALGOL-60
      </p></details>
    </footer>
  </main>;
}
