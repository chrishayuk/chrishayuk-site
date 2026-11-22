import { JossPlayground } from "@/components/JossPlayground";
import { JossConsole } from "@/components/JossConsole";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";

export const metadata = { ...pageMetadata("JOSS — a computer you talked to in 1964, in the browser", "Sit at a JOSS console: RAND’s conversational computing system of 1963–65, rebuilt in Rust from the original papers and compiled to WebAssembly. Make a mistake, put it right, and type Go.", "/demos/joss"), robots: { index: false, follow: true } };

export default function Page() {
  return <main id="main" className="publication-main joss-demo">
    <header className="index-intro">
      <p className="kicker record-voice">CHRIS HAY / JOSS / INTERACTIVE STUDY</p>
      <h1>A computer<br/><em>you talked to.</em></h1>
      <p className="dek">Written for RAND’s JOHNNIAC by J. C. Shaw. In daily use from January 1964. Running here.</p>
      <p>JOSS is a conversation at a typewriter: you type in green, JOSS answers in black, at ten characters a second. Sign on with your initials, as RAND’s users did, and try <strong>Type 2+2.</strong> A line that begins with a number is kept as a step of a program; anything else is done at once. When something goes wrong, put it right and type <strong>Go.</strong> Or choose a sitting from the papers and let the typewriter type it in.</p>
      <div className="inline-links"><Link className="text-link" href="/notebook/762-lines-matched-five-did-not">THE WORKING NOTE ↗</Link><a className="text-link" href="https://github.com/chrishayuk/joss">SOURCE AND TUTORIAL ↗</a><a className="text-link" href="https://github.com/chrishayuk/joss/tree/main/docs/scans">THE ORIGINAL PAGES ↗</a></div>
    </header>
    <JossConsole/>
    <JossPlayground/>
    <footer className="demo-provenance">
      <p className="record-voice">INTERACTIVE STUDY / RUNS IN YOUR BROWSER</p>
      <p>The typewriter is drawn by the page: the two colours of its ribbon, its speed of ten characters a second, the red light, and the gong when JOSS hands it back are from Shaw’s papers, and the sign-on (“JOSS at your service.” “Initials please:”) and the heading on each page are from the listing of January 1965; the sounds are made by your browser. Everything after the sign-on is typed by the interpreter. Nothing on this page is a recording. The interpreter is a Rust program compiled to WebAssembly for WASI, and it runs in your browser; nothing you type is sent anywhere. Each time you type a line, the whole sitting is run again from its first line, which gives the same page and one line more. It was written from RAND’s papers of 1964 and 1965, and its messages are the ones in the listing of the program dated 9 January 1965. It is the JOSS of the JOHNNIAC, not the larger JOSS that followed on the PDP-6. Its logarithms and exponentials are correctly rounded, which JOSS’s were not quite: five lines of the original sessions differ in the last digit, and REPLAY IT shows which.</p>
      <details><summary>Sources</summary><p className="record-voice">
        J. C. SHAW, “JOSS: EXPERIENCE WITH AN EXPERIMENTAL COMPUTING SERVICE FOR USERS AT REMOTE TYPEWRITER CONSOLES”, RAND P-3149, MAY 1965<br/>
        J. C. SHAW, “JOSS: EXAMPLES OF THE USE OF AN EXPERIMENTAL ON-LINE COMPUTING SERVICE”, RAND P-3131, APRIL 1965<br/>
        J. C. SHAW, “JOSS: A DESIGNER’S VIEW OF AN EXPERIMENTAL ON-LINE COMPUTING SYSTEM”, RAND P-2922, AUGUST 1964<br/>
        C. L. BAKER, “JOSS: SCENARIO OF A FILMED REPORT”, RAND RM-4162-PR, JUNE 1964<br/>
        “JOSS 666”, JOHNNIAC ASSEMBLY LISTING, 9 JANUARY 1965<br/>
        INTERPRETER GITHUB.COM/CHRISHAYUK/JOSS
      </p></details>
    </footer>
  </main>;
}
