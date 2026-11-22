import { BohmPlayground } from "@/components/BohmPlayground";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";

export const metadata = { ...pageMetadata("Böhm — a 1951 compiler in the browser", "Run the language, machine and compiler from Corrado Böhm’s 1951 dissertation in the browser: write a program as formulas, see it as instruction numbers, and have the compiler compile itself.", "/demos/bohm"), robots: { index: false, follow: true } };

export default function Page() {
  return <main id="main" className="publication-main bohm-demo">
    <header className="index-intro">
      <p className="kicker record-voice">CHRIS HAY / BÖHM / INTERACTIVE STUDY</p>
      <h1>A compiler<br/><em>written in itself, in 1951.</em></h1>
      <p className="dek">Designed for a computer that was only ever a design. Printed in 1954. Running here, with four corrections.</p>
      <p>In Corrado Böhm’s language every statement is an assignment. <strong>? → a</strong> reads a number, <strong>a → ?</strong> prints one, <strong>B → π</strong> continues at group B, and a choice is a sum that works out where to go. Choose a program, change it, and run it. Then choose <strong>Show the instructions</strong> to see what Böhm’s own compiler makes of it, or tick <strong>Compiler as printed in 1954</strong> to see what it made of it before the corrections.</p>
      <div className="inline-links"><Link className="text-link" href="/notebook/a-compiler-from-1951-ran-it-needed-four-corrections">THE WORKING NOTE ↗</Link><a className="text-link" href="https://github.com/chrishayuk/bohm">SOURCE AND TUTORIAL ↗</a><a className="text-link" href="https://github.com/chrishayuk/bohm/tree/main/docs/scans">THE ORIGINAL PAGES ↗</a><a className="text-link" href="https://raspi.itu.dk/~sestoft/boehmthesis/">THE THESIS IN ENGLISH ↗</a></div>
    </header>
    <BohmPlayground/>
    <footer className="demo-provenance">
      <p className="record-voice">INTERACTIVE STUDY / RUNS IN YOUR BROWSER</p>
      <p>Nothing on this page is replayed. The machine of chapter 1, the loader of section 4.1 and the compiler of chapter 7 are simulated by a Rust program compiled to WebAssembly, and each run happens in your browser; no program or input is sent anywhere. The compiler is transcribed from the 1954 printing and runs with four corrections unless you ask for it as printed. The thesis has no way to load a constant and leaves its decision table as a description; those are supplied.</p>
      <details><summary>Sources</summary><p className="record-voice">
        CORRADO BÖHM, “CALCULATRICES DIGITALES. DU DÉCHIFFRAGE DE FORMULES LOGICO-MATHÉMATIQUES PAR LA MACHINE MÊME DANS LA CONCEPTION DU PROGRAMME”, ETH ZÜRICH, 1951; PRINTED BOLOGNA, 1954<br/>
        THE SAME, TRANSLATED BY PETER SESTOFT, 2016<br/>
        DONALD E. KNUTH AND LUIS TRABB PARDO, “THE EARLY DEVELOPMENT OF PROGRAMMING LANGUAGES”, STANFORD STAN-CS-76-562, 1976, PP. 35–42
      </p></details>
    </footer>
  </main>;
}
