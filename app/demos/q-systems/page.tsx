import { QSystemsPlayground } from "@/components/QSystemsPlayground";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";

export const metadata = { ...pageMetadata("Q-systems, Montréal 1969, in the browser", "Alain Colmerauer’s Q-systems, the rule language of the TAUM machine-translation project at the Université de Montréal, reconstructed from his report of 1970 and run in your browser: each rule adds a path beside the one it matched, and the rewritten arrows are removed only at the end.", "/demos/q-systems"), robots: { index: false, follow: true } };

export default function Page() {
  return <main id="main" className="publication-main qsystems-demo">
    <header className="index-intro">
      <p className="kicker record-voice">CHRIS HAY / Q-SYSTEMS / INTERACTIVE STUDY</p>
      <h1>Q-systems,<br/><em>a graph of every alternative.</em></h1>
      <p className="dek">The rule language Alain Colmerauer built at Montréal in 1969 for translating English into French: a rule rewrites a graph of strings, never a single string.</p>
      <p>Choose a treatment and step through each phase with <strong>←</strong> and <strong>→</strong>. Each step is one application of one rule: the path it matched in blue, the path it <strong>added</strong> beside it in gold. Nothing is replaced until the last two steps, the second phase: first what it removes, then what is left. The graph is drawn as the report draws it on page 29. Try <strong>paraphrase</strong>: the same sixteen rules analyse a French sentence, then write all eighteen of its paraphrases into one graph.</p>
      <div className="inline-links"><Link className="text-link" href="/notebook/a-q-system-rule-never-replaced-anything">THE WORKING NOTE ↗</Link><a className="text-link" href="https://github.com/chrishayuk/q-systems">SOURCE ↗</a><a className="text-link" href="https://github.com/chrishayuk/q-systems/blob/main/docs/decisions.md">EVERY RULE, AND WHAT IT RESTS ON ↗</a></div>
    </header>
    <QSystemsPlayground/>
    <footer className="demo-provenance">
      <p className="record-voice">INTERACTIVE STUDY / RUNS IN YOUR BROWSER</p>
      <p>Nothing on this page is a recording. qsys is a Rust program compiled to WebAssembly, and each treatment runs in your browser; nothing you type is sent anywhere. No program text of the Q-systems is known to survive: this is the formalism as Colmerauer’s report of 1970 describes it, rebuilt with a coding agent, and where the report is silent the choice made is listed, with its reason, in the repository. The examples are the report’s; the experiments, one with a grammar of our own, are marked as such.</p>
      <details><summary>Sources</summary><p className="record-voice">
        A. COLMERAUER, LES SYSTÈMES-Q OU UN FORMALISME POUR ANALYSER ET SYNTHÉTISER DES PHRASES SUR ORDINATEUR, PUBLICATION INTERNE NO 43, UNIVERSITÉ DE MONTRÉAL, 1970<br/>
        I. FINDEISEN-BELLERT, INTERACTIVE SESSION WITH TAUM, C. 1972, COMPUTER HISTORY MUSEUM<br/>
        INTERPRETER GITHUB.COM/CHRISHAYUK/Q-SYSTEMS
      </p></details>
    </footer>
  </main>;
}
