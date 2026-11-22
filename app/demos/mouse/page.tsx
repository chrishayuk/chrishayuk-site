import { MousePlayground } from "@/components/MousePlayground";
import { pageMetadata } from "@/lib/metadata";

export const metadata = { ...pageMetadata("Mouse — a 1979 language in the browser", "Run Peter Grogono’s Mouse, the programming language published in BYTE in July 1979, in the browser: a Rust interpreter compiled to WebAssembly, with the original listings and a reader’s 1980 test program.", "/demos/mouse"), robots: { index: false, follow: true } };

export default function Page() {
  return <main id="main" className="publication-main mouse-demo">
    <header className="index-intro">
      <p className="kicker record-voice">CHRIS HAY / MOUSE / INTERACTIVE STUDY</p>
      <h1>A language<br/><em>on a magazine page.</em></h1>
      <p className="dek">Published in BYTE in July 1979. Corrected by a reader in June 1980. Running here.</p>
      <p>Mouse is Peter Grogono’s tiny programming language. Almost every instruction is a single character, and arithmetic is written with the operator last. Choose a program, change it, and run it. Start with <strong>lane-test</strong>: six lines from a reader’s letter that the interpreter as first published got wrong. It should print 1.</p>
      <div className="inline-links"><a className="text-link" href="https://github.com/chrishayuk/mouse-interpreter">SOURCE AND TUTORIAL ↗</a><a className="text-link" href="https://github.com/chrishayuk/mouse-interpreter/tree/master/docs/scans">THE ORIGINAL PAGES ↗</a></div>
    </header>
    <MousePlayground/>
    <footer className="demo-provenance">
      <p className="record-voice">INTERACTIVE STUDY / RUNS IN YOUR BROWSER</p>
      <p>Nothing on this page is replayed or simulated. The interpreter is a Rust program compiled to WebAssembly for WASI, and each run happens in your browser; no program or input is sent anywhere. It follows the Pascal listing in Grogono’s article and includes the four corrections Tom Lane published the following year.</p>
      <details><summary>Sources</summary><p className="record-voice">
        PETER GROGONO, “MOUSE: A LANGUAGE FOR MICROCOMPUTERS”, BYTE, JULY 1979, PP. 198–220<br/>
        TOM LANE, “COMMENT AND CORRECTION FOR MOUSE”, WITH GROGONO’S REPLY, BYTE, JUNE 1980, PP. 238, 240<br/>
        INTERPRETER GITHUB.COM/CHRISHAYUK/MOUSE-INTERPRETER
      </p></details>
    </footer>
  </main>;
}
