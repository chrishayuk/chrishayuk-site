import { RhindPlayground } from "@/components/RhindPlayground";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";

export const metadata = { ...pageMetadata("The Rhind Mathematical Papyrus, run — every figure of the scribe’s working, checked in the browser", "Every figure the scribe Ahmose wrote in the working of the Rhind Mathematical Papyrus, about 1550 BCE, worked again with the operations he had and compared with what he wrote: rhind, in Rust, compiled to WebAssembly.", "/demos/rhind-papyrus"), robots: { index: false, follow: true } };

export default function Page() {
  return <main id="main" className="publication-main rh-demo">
    <header className="index-intro">
      <p className="kicker record-voice">CHRIS HAY / THE RHIND PAPYRUS / INTERACTIVE STUDY</p>
      <h1>The Rhind papyrus,<br/><em>run.</em></h1>
      <p className="dek">Copied by the scribe Ahmose about 1550 BCE. Every figure of his working, worked again with the operations he had: doubling, halving, two-thirds, tenths, and the table of 2 divided by odd numbers at the head of the papyrus.</p>
      <p>Choose a page. Each figure the scribe wrote is marked <strong>✓</strong> or <strong>✗</strong>, with red ink in red. Choose a line marked ✗ to see what the working gives, whether the error is carried, and what slip of the pen would turn the right figure into the one written. Start with <strong>Problem 27</strong>, then try <strong>2 ÷ 51 to 2 ÷ 101</strong> and look at 2 ÷ 59.</p>
      <div className="inline-links"><Link className="text-link" href="/notebook/rhind-papyrus">THE WORKING NOTE ↗</Link><a className="text-link" href="https://github.com/chrishayuk/rhind-papyrus">SOURCE AND TUTORIAL ↗</a><a className="text-link" href="https://archive.org/details/arnoldbuffumchaceludlowbullhenryparkermanningtherhindmathematicalpapyrus.volumei">CHACE’S EDITION ↗</a></div>
    </header>
    <RhindPlayground/>
    <footer className="demo-provenance">
      <p className="record-voice">INTERACTIVE STUDY / RUNS IN YOUR BROWSER</p>
      <p>Nothing on this page is a recording. rhind is a Rust program compiled unchanged to WebAssembly for WASI, and each page is checked in your browser; nothing you type is sent anywhere. The papyrus itself was not read. Each page was transcribed from two editions, Chace (1929) and Peet (1923), from page images, by a coding agent and its sub-agents, and no person has checked the transcription against the pages. So every ✗ is a disagreement with this transcription: most of those the editions do not point out will be silent corrections in the editions, or misreadings here, before any is something new. Where the editions disagree the transcription follows Chace, with a note on the line. What does not fit the notation, such as the hundred-hekat notation of Problems 68 to 86, is kept as the scribe’s words in quotes and not computed.</p>
      <details><summary>Sources</summary><p className="record-voice">
        A. B. CHACE, L. BULL, H. P. MANNING, “THE RHIND MATHEMATICAL PAPYRUS”, VOL. II, MATHEMATICAL ASSOCIATION OF AMERICA, 1929<br/>
        T. E. PEET, “THE RHIND MATHEMATICAL PAPYRUS, BRITISH MUSEUM 10057 AND 10058”, 1923<br/>
        RHIND GITHUB.COM/CHRISHAYUK/RHIND-PAPYRUS
      </p></details>
    </footer>
  </main>;
}
