import { AcePlayground } from "@/components/AcePlayground";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";

export const metadata = { ...pageMetadata("Turing’s ACE — the 1945 computer in the browser", "Run the computer Alan Turing proposed in 1945 in the browser: write instruction tables in his popular form, see them as 32-digit minor cycles, and run INDEXIN and CALPOL from his report as printed or corrected.", "/demos/turing-ace"), robots: { index: false, follow: true } };

export default function Page() {
  return <main id="main" className="publication-main ace-demo">
    <header className="index-intro">
      <p className="kicker record-voice">CHRIS HAY / TURING’S ACE / INTERACTIVE STUDY</p>
      <h1>Turing’s computer,<br/><em>as he proposed it in 1945.</em></h1>
      <p className="dek">Designed at the National Physical Laboratory. Never built as written. Running here.</p>
      <p>The memory is delay lines of 32 minor cycles going round, and a program is a set of instruction tables in what Turing called popular form: <strong>TS 6 - TS 2</strong> moves a word, <strong>ADD</strong> adds into the partial sum, <strong>B, BURY</strong> enters a subsidiary table. Choose a job, change it, and run it. Choose <strong>Show the job in machine form</strong> to see every instruction as its 32 digits, or tick <strong>Tables as printed in 1945</strong> to run INDEXIN and CALPOL exactly as the report prints them.</p>
      <div className="inline-links"><Link className="text-link" href="/notebook/turings-1945-computer-run-as-written">THE WORKING NOTE ↗</Link><a className="text-link" href="https://github.com/chrishayuk/turing-ace">SOURCE AND TABLES ↗</a><a className="text-link" href="https://en.wikisource.org/wiki/Proposed_Electronic_Calculator">THE REPORT ↗</a><a className="text-link" href="https://www.alanturing.net/ace">ITS FIGURES, TURING ARCHIVE ↗</a></div>
    </header>
    <AcePlayground/>
    <footer className="demo-provenance">
      <p className="record-voice">INTERACTIVE STUDY / RUNS IN YOUR BROWSER</p>
      <p>Nothing on this page is replayed. The machine of sections 11 and 12 of the report is simulated at the level of its instructions by a Rust program compiled to WebAssembly, and each run happens in your browser; no table or number is sent anywhere. INDEXIN and CALPOL are transcribed from section 13 and run with eight corrections unless you ask for them as printed. The tables the report only describes, BURY, UNBURY, DISCRIM, PLUSIND, TRANS 45, MULTIP, ADD and BINDEC, are written to its descriptions and are ours. Where the report says two things, the choice made is listed under <strong>List where the report says two things</strong>.</p>
      <details><summary>Sources</summary><p className="record-voice">
        A. M. TURING, “PROPOSED ELECTRONIC CALCULATOR”, NATIONAL PHYSICAL LABORATORY, 1945<br/>
        B. E. CARPENTER AND R. W. DORAN (EDS.), “A. M. TURING’S ACE REPORT OF 1946 AND OTHER PAPERS”, MIT PRESS, 1986<br/>
        B. E. CARPENTER AND R. W. DORAN, “THE OTHER TURING MACHINE”, THE COMPUTER JOURNAL 20, 1977<br/>
        SIMULATOR GITHUB.COM/CHRISHAYUK/TURING-ACE
      </p></details>
    </footer>
  </main>;
}
