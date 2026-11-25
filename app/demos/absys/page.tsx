import { AbsysPlayground } from "@/components/AbsysPlayground";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";

export const metadata = { ...pageMetadata("Absys, Aberdeen 1967, in the browser", "Absys, the assertional language of Foster and Elcock at Aberdeen, reconstructed from their papers and run in your browser: equations suspended until they can be solved, every alternative pursued as a derivation of its own, and the text accepted an assertion at a time.", "/demos/absys"), robots: { index: false, follow: true } };

export default function Page() {
  return <main id="main" className="publication-main absys-demo">
    <header className="index-intro">
      <p className="kicker record-voice">CHRIS HAY / ABSYS / INTERACTIVE STUDY</p>
      <h1>Absys,<br/><em>assertions, not instructions.</em></h1>
      <p className="dek">The language Foster and Elcock built at Aberdeen around 1967: a text is a conjunction of assertions, and the machine finds data that satisfy them.</p>
      <p>Choose a text and step through it with <strong>←</strong> and <strong>→</strong>. After each assertion: every derivation alive, what it knows, the equations it is holding <strong>suspended</strong> until one of their unknowns is known, and the tree of alternatives each <strong>or</strong> made. Try <strong>reverse</strong>, Elcock’s own example: after the third assertion the derivation hibernates with U = X₃ and X₃ = V suspended, and the fourth wakes it. The options under the text are not Absys; they are there to compare.</p>
      <div className="inline-links"><Link className="text-link" href="/notebook/absys-did-not-unify-two-unknowns-it-waited">THE WORKING NOTE ↗</Link><a className="text-link" href="https://github.com/chrishayuk/absys">SOURCE AND TUTORIAL ↗</a><a className="text-link" href="https://github.com/chrishayuk/absys/blob/main/docs/decisions.md">EVERY RULE, AND WHAT IT RESTS ON ↗</a></div>
    </header>
    <AbsysPlayground/>
    <footer className="demo-provenance">
      <p className="record-voice">INTERACTIVE STUDY / RUNS IN YOUR BROWSER</p>
      <p>Nothing on this page is a recording. absys is a Rust program compiled to WebAssembly, and each text runs in your browser; nothing you type is sent anywhere. No Absys program or listing from Aberdeen survives: this is the language as its designers described it, rebuilt with a coding agent, and where their descriptions are silent the choice made is listed, with its reason, in the repository. Files ending .ab1 are in the notation of Absys 1 (1969); the rest in that of Elcock’s retrospective (1990).</p>
      <details><summary>Sources</summary><p className="record-voice">
        E. W. ELCOCK, “ABSYS: THE FIRST LOGIC PROGRAMMING LANGUAGE — A RETROSPECTIVE AND A COMMENTARY”, J. LOGIC PROGRAMMING 9, 1990<br/>
        J. M. FOSTER AND E. W. ELCOCK, “ABSYS 1: AN INCREMENTAL COMPILER FOR ASSERTIONS”, MACHINE INTELLIGENCE 4, 1969<br/>
        J. M. FOSTER, “ASSERTIONS: PROGRAMS WRITTEN WITHOUT SPECIFYING UNNECESSARY ORDER”, MACHINE INTELLIGENCE 3, 1968<br/>
        INTERPRETER GITHUB.COM/CHRISHAYUK/ABSYS
      </p></details>
    </footer>
  </main>;
}
