import { RhindPlayground } from "@/components/RhindPlayground";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";

export const metadata = { ...pageMetadata("The Rhind Mathematical Papyrus, run — the scribe’s working, checked figure by figure in the browser", "The working of the Rhind Mathematical Papyrus, about 1550 BCE, as transcribed: each figure the notation can hold checked exactly against the working above it, and any multiplication or division worked the scribe’s way. rhind, in Rust, compiled to WebAssembly.", "/demos/rhind-papyrus"), robots: { index: false, follow: true } };

export default function Page() {
  return <main id="main" className="publication-main rh-demo">
    <header className="index-intro">
      <p className="kicker record-voice">CHRIS HAY / THE RHIND PAPYRUS / INTERACTIVE STUDY</p>
      <h1>The Rhind papyrus,<br/><em>run.</em></h1>
      <p className="dek">Copied by the scribe Ahmose about 1550 BCE. Every figure of his working that the notation can hold, checked exactly against the working above it; and any multiplication or division worked the scribe’s way, by doubling, halving, two-thirds and the table of 2 divided by odd numbers at the head of the papyrus.</p>
      <p>Choose a page. Each figure the scribe wrote is marked <strong>✓</strong> or <strong>✗</strong>, with red ink in red. Choose a line marked ✗ to see what the working gives and the explanations that fit: a part sign left off, one sign for another, the wrong rows ticked. They are ways a figure could have come to differ, not its cause. Start with <strong>Problem 27</strong>, where the scribe wrote 15 for 14.</p>
      <div className="inline-links"><Link className="text-link" href="/notebook/a-scribe-wrote-15-where-his-working-says-14">THE WORKING NOTE ↗</Link><a className="text-link" href="https://github.com/chrishayuk/rhind-papyrus">SOURCE AND TUTORIAL ↗</a><a className="text-link" href="https://archive.org/details/arnoldbuffumchaceludlowbullhenryparkermanningtherhindmathematicalpapyrus.volumei">CHACE’S EDITION ↗</a></div>
    </header>
    <RhindPlayground/>
    <footer className="demo-provenance">
      <p className="record-voice">INTERACTIVE STUDY / RUNS IN YOUR BROWSER</p>
      <p>Nothing on this page is a recording. rhind is a Rust program compiled unchanged to WebAssembly for WASI, and each page is checked in your browser; nothing you type is sent anywhere. The papyrus itself was not read. Each page was transcribed from two editions, Chace (1929) and Peet (1923), from page images, by a coding agent and its sub-agents, and no person has checked the transcription against the pages. A second model reviewed it at 72 places. So every ✗ is a disagreement between this transcription and its working, under the choices rhind decisions lists: it can come from the figure, the transcription or one of those choices. Most are a part sign left off, which Chace says need not be an error, or figures the editions already point out. Where the editions disagree the transcription follows Chace, with a note on the line. What does not fit the notation, such as the hundred-hekat notation of Problems 68 to 86, is kept as the scribe’s words in quotes and not computed.</p>
      <details><summary>Sources</summary><p className="record-voice">
        A. B. CHACE, L. BULL, H. P. MANNING, “THE RHIND MATHEMATICAL PAPYRUS”, VOL. II, MATHEMATICAL ASSOCIATION OF AMERICA, 1929<br/>
        T. E. PEET, “THE RHIND MATHEMATICAL PAPYRUS, BRITISH MUSEUM 10057 AND 10058”, 1923<br/>
        RHIND GITHUB.COM/CHRISHAYUK/RHIND-PAPYRUS
      </p></details>
    </footer>
  </main>;
}
