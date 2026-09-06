import { ThreadNavigation } from "@/components/ThreadNavigation";
import { memoryStudy } from "@/lib/threads";
import { AddressedMemory } from "@/components/AddressedMemory";
import { Acts } from "@/components/Acts";
import { pageMetadata } from "@/lib/metadata";
import { addressedMemory as data } from "@/lib/addressed-memory";

export const metadata = { ...pageMetadata("Reading by address — interactive study", "Choose one of six planted facts and inspect how a constructed feed-forward network matches keys and writes an answer. A browser adaptation of Chris Hay’s The Mechanism.", "/demos/addressed-memory"), robots: { index: false, follow: true } };

export default function Page() {
  return <main id="main" className="publication-main address-demo">
    <header className="index-intro">
      <p className="kicker record-voice">CHRIS HAY / THE MECHANISM / INTERACTIVE STUDY</p>
      <h1>Reading<br/><em>by address.</em></h1>
      <p className="dek">Six planted facts. Twenty-four dimensions. One question to follow.</p>
      <p>Choose a relation and an entity. Watch which keys activate, then read the answer those activations produce. Switch off the matching neuron to see what the remaining rows write.</p>
      <div className="inline-links"><a className="text-link" href="/notebook/what-is-the-map">RETURN TO THE MAP ↗</a><a className="text-link" href="/notebook/reading-by-address">READ THE NOTEBOOK ↗</a></div>
    </header>
    <AddressedMemory/>
    <div className="record-body">
      <Acts acts={[
        {kind:"observation", label:"WHAT YOU ARE RUNNING", text:"This is the constructed FFN from The Mechanism, adapted for the browser using the source’s six facts, seed-0 key and value vectors, and output readers. All six baseline answers match the saved Python example. The neuron switch is an added intervention you can explore here. No model server or download is needed."},
        {kind:"refusal",title:"A CONSTRUCTED MEMORY",lines:["The facts and their address vectors were supplied by hand. This example does not parse an arbitrary natural-language question.","Its six successful reads do not establish unlimited capacity, interference-free storage or the organisation of every fact in a trained model."],principle:"The value of the toy is that every operation can be inspected."},
        {kind:"observation",label:"CONTINUE THE INVESTIGATION",text:"The notebook connects this small mechanism to the films, the native-model experiments and the question of how a useful address develops through a transformer.",references:[{label:"Reading by address",url:"/notebook/reading-by-address"},{label:"The map and its readers",url:"/notebook/what-is-the-map"},{label:"Source repository",url:data.source}]}
      ]}/>
    </div>
    <footer className="demo-provenance"><ThreadNavigation id={memoryStudy.id}/>
      <p className="record-voice">INTERACTIVE STUDY / CONSTRUCTED EXAMPLE / 06 SEPTEMBER 2026</p>
      <p>Based on <a href={`${data.source}/blob/${data.sourceRevision}/ffn.py`}>The Mechanism · ffn.py ↗</a> by Chris Hay. <a href={`${data.source}/blob/${data.sourceRevision}/ffn.json`}>Inspect the saved six reads ↗</a></p>
      <details><summary>Source identity</summary><p className="record-voice">REVISION {data.sourceRevision}<br/>FILE SHA-256 {data.sourceSha256}<br/>BROWSER ADAPTATION / SEED {data.seed} · {data.dimensions} DIMENSIONS</p></details>
    </footer>
  </main>;
}
