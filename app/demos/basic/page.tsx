import { BasicStudy } from "@/components/BasicStudy";
import { pageMetadata } from "@/lib/metadata";

export const metadata = { ...pageMetadata("Dartmouth BASIC — the 1964 manual’s programs, in the browser", "Run the programs printed in the first BASIC instruction manual (Dartmouth, May 1964) in the browser, beside the pages they were printed on: a Rust interpreter compiled to WebAssembly. Later programs, including 103 games from 1978, are there too.", "/demos/basic"), robots: { index: false, follow: true } };

const PAGES = [
  { file: "cover.jpg", caption: "THE REPRINT’S COVER" },
  { file: "title-page.jpg", caption: "TITLE PAGE / MAY 1964, FIRST DRAFT" },
  { file: "p04-instruction-format.jpg", caption: "P. 4 / “THERE ARE ONLY 13 OTHER OPERATIONS”" },
  { file: "p05-formulas.jpg", caption: "P. 5 / NUMBERS, VARIABLES, TEN FUNCTIONS" },
];

export default function Page() {
  return <main id="main" className="publication-main basic-demo">
    <header className="index-intro">
      <p className="kicker record-voice">CHRIS HAY / DARTMOUTH BASIC / INTERACTIVE STUDY</p>
      <h1>The manual,<br/><em>still running.</em></h1>
      <p className="dek">First issued at Dartmouth in May 1964. Typed in from the page. Running here.</p>
      <p>Dartmouth BASIC’s first instruction manual ends with three example programs and the results they printed. Choose one, change it, and run it; the page it came from is beside it, and the figures should match. Then try <strong>example 2</strong> with AS IN 1964 switched off: a later BASIC stops at line 40, for a reason the manual gives on page 5.</p>
      <p>There are 142 programs in the list: the manual’s four, the fourteen programs of the tutorial, seventeen short classics, and all 103 games from a 1978 book, which ask you questions.</p>
      <div className="inline-links"><a className="text-link" href="https://github.com/chrishayuk/chuk-basic-rs">SOURCE AND TUTORIAL ↗</a><a className="text-link" href="https://www.dartmouth.edu/basicfifty/basicmanual_1964.pdf">THE MANUAL, AT DARTMOUTH ↗</a></div>
    </header>
    <BasicStudy choose/>
    <section className="basic-pages" aria-label="Pages of the 1964 manual">
      {PAGES.map(page => <figure key={page.file}>
        {/* eslint-disable-next-line @next/next/no-img-element -- a scanned page at its own size, not site photography */}
        <a href={`/demos/basic/scans/${page.file}`}><img src={`/demos/basic/scans/${page.file}`} alt={`First BASIC instruction manual, Dartmouth, May 1964: ${page.caption.toLowerCase()}`} loading="lazy"/></a>
        <figcaption className="record-voice">{page.caption}</figcaption>
      </figure>)}
    </section>
    <footer className="demo-provenance">
      <p className="record-voice">INTERACTIVE STUDY / RUNS IN YOUR BROWSER</p>
      <p>Nothing on this page is replayed or simulated. The interpreter is a Rust program compiled to WebAssembly for WASI, and each run happens in your browser; no program or input is sent anywhere. A program that asks a question is run again from its first line each time you answer, with the same random numbers, which is how it appears to wait. It is not Dartmouth’s 1964 compiler: it is a reading of the manual, and of the programs people wrote for the BASICs that followed. With AS IN 1964 on, square roots and powers take the absolute value, as page 5 says, and numbers are printed as the results on pages 21 to 23 show them.</p>
      <details><summary>Sources</summary><p className="record-voice">
        DARTMOUTH COLLEGE COMPUTATION CENTER, “BASIC”, INSTRUCTION MANUAL, MAY 1964, FIRST DRAFT. COMMEMORATIVE REPRINT, HOSTED BY DARTMOUTH COLLEGE. PAGES REPRODUCED FOR REFERENCE, REDUCED<br/>
        DAVID H. AHL (ED.), BASIC COMPUTER GAMES, 1978. LISTINGS FROM GITHUB.COM/CODING-HORROR/BASIC-COMPUTER-GAMES<br/>
        INTERPRETER GITHUB.COM/CHRISHAYUK/CHUK-BASIC-RS
      </p></details>
    </footer>
  </main>;
}
