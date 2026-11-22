import { CplPlayground } from "@/components/CplPlayground";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";

export const metadata = { ...pageMetadata("CPL — a 1966 language in the browser", "Run CPL, the language BCPL was cut down from, in the browser: a Rust interpreter built from the 1966 working papers and compiled to WebAssembly, with the one large program those papers contain.", "/demos/cpl"), robots: { index: false, follow: true } };

export default function Page() {
  return <main id="main" className="publication-main cpl-demo">
    <header className="index-intro">
      <p className="kicker record-voice">CHRIS HAY / CPL / INTERACTIVE STUDY</p>
      <h1>The language<br/><em>before BCPL.</em></h1>
      <p className="dek">Designed at Cambridge and London in the early 1960s. Described in working papers in July 1966. Running here.</p>
      <p>In CPL a small letter is a whole name, so <strong>xy</strong> means x times y, and longer names begin with a capital. Commands are grouped in sections, written <strong>$(</strong> and <strong>$)</strong>, and a label is a value that can be handed to a routine. Choose a program, change it, and run it. Choose <strong>Print it as in 1966</strong> to see it with its words underlined. Then try <strong>appendix-1-preprocessor</strong>: the one large program in the 1966 papers, reading a small program typed that way.</p>
      <div className="inline-links"><Link className="text-link" href="/notebook/a-1966-program-said-it-had-not-been-checked">THE WORKING NOTE ↗</Link><a className="text-link" href="https://github.com/chrishayuk/cpl">SOURCE AND TUTORIAL ↗</a><a className="text-link" href="https://github.com/chrishayuk/cpl/tree/main/appendix1">THE 1966 PROGRAM AND ITS SLIPS ↗</a></div>
    </header>
    <CplPlayground/>
    <footer className="demo-provenance">
      <p className="record-voice">INTERACTIVE STUDY / RUNS IN YOUR BROWSER</p>
      <p>Nothing on this page is replayed or simulated. The interpreter is a Rust program compiled to WebAssembly for WASI, and each run happens in your browser; no program or input is sent anywhere. It was written from the CPL Working Papers of July 1966 and the Elementary Programming Manual of January 1966. It is not the whole language: what it leaves out is listed in the repository. The preprocessor is transcribed from Appendix 1 of the Working Papers and runs with eleven corrections; the functions that appendix describes only informally are supplied.</p>
      <details><summary>Sources</summary><p className="record-voice">
        “CPL WORKING PAPERS”, UNIVERSITY OF LONDON INSTITUTE OF COMPUTER SCIENCE AND THE MATHEMATICAL LABORATORY, CAMBRIDGE, JULY 1966<br/>
        “CPL ELEMENTARY PROGRAMMING MANUAL”, EDITION II, CAMBRIDGE, JANUARY 1966<br/>
        BARRON, BUXTON, HARTLEY, NIXON AND STRACHEY, “THE MAIN FEATURES OF CPL”, THE COMPUTER JOURNAL 6, 1963<br/>
        MARTIN RICHARDS, “HOW BCPL EVOLVED FROM CPL”<br/>
        INTERPRETER GITHUB.COM/CHRISHAYUK/CPL
      </p></details>
    </footer>
  </main>;
}
