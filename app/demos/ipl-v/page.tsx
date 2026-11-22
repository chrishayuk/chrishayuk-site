import { IplvMachine } from "@/components/IplvMachine";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";

export const metadata = { ...pageMetadata("IPL-V — the language of the first AI programs, in the browser", "Step the IPL computer: the list-processing machine of the 1964 IPL-V manual, rebuilt in Rust and compiled to WebAssembly. Watch a program take cells from available space, link them into lists and give them back.", "/demos/ipl-v"), robots: { index: false, follow: true } };

export default function Page() {
  return <main id="main" className="publication-main iplv-demo">
    <header className="index-intro">
      <p className="kicker record-voice">CHRIS HAY / IPL-V / INTERACTIVE STUDY</p>
      <h1>The machine<br/><em>the first AI ran on.</em></h1>
      <p className="dek">Information Processing Language V. RAND and Carnegie Tech, 1957 to 1964. Running here.</p>
      <p>Computers were built to calculate. IPL was built to hold symbols: linked into lists that a program makes, changes and gives back while it runs, which is how the first artificial intelligence programs held what they worked on. New here? Take the <strong>START HERE</strong> stops below: a list, cells taken from available space and given back, the manual’s own program, and a theorem as a list structure.</p>
      <p>IPL-V is less a language than a computer. Its manual describes a machine: cells that each hold a word <strong>P Q SYMB LINK</strong>, one long list of the cells not in use, and a cycle that interprets lists of instructions punched one to a card. Choose a deck and press <strong>STEP</strong>. Watch the instruction in words, the communication cell H0, and storage, a square for each cell, as the program takes cells from available space and gives them back. Name a symbol above the drawing to keep its list structure in view. The decks under <strong>the manual’s programs</strong> are transcribed from the 1964 manual itself.</p>
      <div className="inline-links"><Link className="text-link" href="/notebook/its-manual-printed-a-trace">THE WORKING NOTE ↗</Link><a className="text-link" href="https://github.com/chrishayuk/ipl-v">SOURCE, TUTORIAL AND THE MANUAL’S PROGRAMS ↗</a></div>
    </header>
    <IplvMachine/>
    <footer className="demo-provenance">
      <p className="record-voice">INTERACTIVE STUDY / RUNS IN YOUR BROWSER</p>
      <p>Nothing on this page is replayed or simulated. The machine is a Rust program compiled to WebAssembly, and every step happens in your browser; storage is drawn from the program’s own memory. It was written from the <em>Information Processing Language-V Manual</em> of 1964, and holds to the assembly listing and traces that manual prints. It is not the whole system: auxiliary storage, tapes and blocks are left out, as the repository says.</p>
      <p>Einar Stefferud’s 1963 IPL-V version of the Logic Theorist runs on it unmodified, but its deck is not ours to publish. It is in <a className="text-link" href="https://github.com/dmoews/ipl-v-logic-theorist">David Moews’s transcription ↗</a>, also kept in <a className="text-link" href="https://github.com/jeffshrager/ExecutableArchaeology">Jeff Shrager’s Executable Archaeology ↗</a>: use <strong>Open a deck</strong> and choose the deck and its file of theorems together.</p>
      <details><summary>Sources</summary><p className="record-voice">
        A. NEWELL (ED.), “INFORMATION PROCESSING LANGUAGE-V MANUAL”, SECOND EDITION, PRENTICE-HALL, 1964<br/>
        A. NEWELL AND F. M. TONGE, “AN INTRODUCTION TO INFORMATION PROCESSING LANGUAGE V”, COMMUNICATIONS OF THE ACM 3(4), 1960<br/>
        E. STEFFERUD, “THE LOGIC THEORY MACHINE: A MODEL HEURISTIC PROGRAM”, RAND RM-3731, 1963<br/>
        INTERPRETER GITHUB.COM/CHRISHAYUK/IPL-V
      </p></details>
    </footer>
  </main>;
}
