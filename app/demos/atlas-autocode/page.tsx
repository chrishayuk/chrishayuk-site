import { AtlasPlayground } from "@/components/AtlasPlayground";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";

export const metadata = { ...pageMetadata("Atlas Autocode on the Flexowriter, in the browser", "Type Atlas Autocode as it was typed at Manchester in 1965, on a Friden Flexowriter: underlined words made by backspacing, the seven-track tape it punched, and COMPILER AA or AB rebuilt from the 1965 Reference Manual and run in your browser.", "/demos/atlas-autocode"), robots: { index: false, follow: true } };

export default function Page() {
  return <main id="main" className="publication-main atlas-demo">
    <header className="index-intro">
      <p className="kicker record-voice">CHRIS HAY / ATLAS AUTOCODE / INTERACTIVE STUDY</p>
      <h1>Atlas Autocode,<br/><em>typed on a Flexowriter.</em></h1>
      <p className="dek">The language of the Ferranti Atlas at Manchester, as COMPILER AA and COMPILER AB ran it in 1965. Its words were underlined by backspacing over them.</p>
      <p>Choose a program and run it. Click the Flexowriter page to type at the carriage: <strong>Backspace</strong> moves it back, so the next key strikes over, and that is how <strong>cycle</strong> was underlined and <strong>≠</strong> made. Each key has two symbols, as the Atlas Flexowriter’s did: the digits were on upper case, the brackets on lower. Underneath is the tape it punches. Try <strong>1965-ab-monitor</strong>, a function that takes the square root of −2, three routines deep: beside our page is the one COMPILER AB printed for it in 1965.</p>
      <div className="inline-links"><Link className="text-link" href="/notebook/the-manuals-program-does-not-compile">THE WORKING NOTE ↗</Link><a className="text-link" href="https://github.com/chrishayuk/atlas-autocode">SOURCE AND TUTORIAL ↗</a><a className="text-link" href="https://github.com/chrishayuk/atlas-autocode/blob/main/sources/README.md">THE DOCUMENTS ↗</a></div>
    </header>
    <AtlasPlayground/>
    <footer className="demo-provenance">
      <p className="record-voice">INTERACTIVE STUDY / RUNS IN YOUR BROWSER</p>
      <p>Nothing on this page is a recording. aa is a Rust interpreter compiled to WebAssembly, and each program runs in your browser; nothing you type is sent anywhere. The Atlas compilers are lost: this one was rebuilt from the Reference Manual, its Amendments for COMPILER AB and the Mini-Manual, with a coding agent. Its program map leaves out the machine addresses and code sizes the real compilers printed, because it writes no machine code. The keys’ symbols, cases and tape codes are from the Atlas Bible; where the keys sat on the keyboard is not known, and is drawn here for convenience.</p>
      <details><summary>Sources</summary><p className="record-voice">
        R. A. BROOKER AND J. S. ROHL, “ATLAS AUTOCODE REFERENCE MANUAL”, MANCHESTER UNIVERSITY, 1965, WITH “AMENDMENTS FOR COMPILER AB”<br/>
        W. F. LUNNON AND G. RIDING, “THE ATLAS AUTOCODE MINI-MANUAL”, MANCHESTER UNIVERSITY, JULY 1965<br/>
        FERRANTI, THE “ATLAS BIBLE”, §8.7, CHARACTER CODES AND THE FLEXOWRITER CODE, 1963<br/>
        INTERPRETER GITHUB.COM/CHRISHAYUK/ATLAS-AUTOCODE
      </p></details>
    </footer>
  </main>;
}
