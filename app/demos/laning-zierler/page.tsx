import { LzPlayground } from "@/components/LzPlayground";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";

export const metadata = { ...pageMetadata("Laning and Zierler — algebra for Whirlwind, 1953, in the browser", "Type equations as a programmer did for MIT’s Whirlwind I in 1953 and feed the tape: the algebraic system of Laning and Zierler, rebuilt in Rust from its 1954 manual and compiled to WebAssembly.", "/demos/laning-zierler"), robots: { index: false, follow: true } };

export default function Page() {
  return <main id="main" className="publication-main lz-demo">
    <header className="index-intro">
      <p className="kicker record-voice">CHRIS HAY / LANING AND ZIERLER / INTERACTIVE STUDY</p>
      <h1>A computer within<br/><em>a computer.</em></h1>
      <p className="dek">Written for MIT’s Whirlwind I by J. H. Laning Jr. and N. Zierler. Working by May 1953. Described in January 1954. Running here.</p>
      <p>You typed ordinary algebra on a Flexowriter, which punched it on paper tape: <strong>y = -6.3a,</strong> with a comma at the end of every equation. The tape was translated into Whirlwind’s instructions and run, and the delayed printer typed the answers. Choose a tape from the manual, change it, and feed it. Then try <strong>1976-knuth-tpk</strong>, Knuth and Trabb Pardo’s example program in the language, and look at <strong>+0 and −0</strong>.</p>
      <div className="inline-links"><Link className="text-link" href="/notebook/a-1954-manual-asked-for-trouble-reports">THE WORKING NOTE ↗</Link><a className="text-link" href="https://github.com/chrishayuk/laning-zierler">SOURCE AND TUTORIAL ↗</a><a className="text-link" href="https://web.mit.edu/digitalapollo/Documents/Chapter5/laningwhirlwind.pdf">THE 1954 MANUAL ↗</a></div>
    </header>
    <LzPlayground/>
    <footer className="demo-provenance">
      <p className="record-voice">INTERACTIVE STUDY / RUNS IN YOUR BROWSER</p>
      <p>Nothing on this page is a recording. The system is a Rust program compiled to WebAssembly for WASI, and each tape is fed in your browser; nothing you type is sent anywhere. It was written from the programmer’s manual, Engineering Memorandum E-364 of January 1954; the translator itself has not been found. The manual’s rules are followed as written, including the slash (a/b/c is ac over b), the space between digits that multiplies, the four parentheses, and eight digits to a printed number. What the manual leaves open is this reconstruction’s choice: the sign of a computed zero, the arrangement of Gill’s method, the function routines, the rounding, and the wording of the post-mortem. The translation’s orders are a small stack code, not Whirlwind’s. Nothing is timed. The manual prints almost none of its programs’ output, so these pages are checked against mathematics, not against Whirlwind: the equations of page 18 against sin and cos, the table of page 11 against cos.</p>
      <details><summary>Sources</summary><p className="record-voice">
        J. H. LANING JR. AND N. ZIERLER, “A PROGRAM FOR TRANSLATION OF MATHEMATICAL EQUATIONS FOR WHIRLWIND I”, ENGINEERING MEMORANDUM E-364, MIT INSTRUMENTATION LABORATORY, JANUARY 1954<br/>
        PROJECT WHIRLWIND SUMMARY REPORT NO. 37, FIRST QUARTER 1954<br/>
        “DIGITAL COMPUTERS: ADVANCED CODING TECHNIQUES”, MIT SUMMER SESSION 1954, LECTURE 13<br/>
        D. E. KNUTH AND L. TRABB PARDO, “THE EARLY DEVELOPMENT OF PROGRAMMING LANGUAGES”, STANFORD, 1976<br/>
        INTERPRETER GITHUB.COM/CHRISHAYUK/LANING-ZIERLER
      </p></details>
    </footer>
  </main>;
}
