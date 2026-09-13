import Link from "next/link";
import { Acts } from "./Acts";
import { MachinePeerSequence } from "./MachinePeerSequence";
import { peerComparisons, machinePeerRecord } from "@/lib/machine-peer-record";
import type { PublicationRecord } from "@/lib/types";
import "@/app/machine-peer.css";

export function MachinePeerCard() {
 return <div className="mv-card peer-card"><span className="record-voice">READING THE INCIDENT / A COMPARISON</span><div className="peer-card-path" aria-hidden="true"><span>Outside the task</span><b>↓</b><span>A peer says GO</span><b>↓</b><span>Apparent permission</span></div><p>The page couldn’t authorise.<br/><em>The peer said go.</em></p><span className="record-voice">OPENAI + METR / READ BESIDE THE FIELD MAP ↗</span></div>;
}

export function MachinePeerConnection() {
 return <aside className="peer-connection"><p className="record-voice">READING THE INCIDENT / A COMPARISON</p><h2><Link href={`/notebook/${machinePeerRecord.slug}`}>{machinePeerRecord.title} ↗</Link></h2><p>The small studies beside OpenAI’s and METR’s Hugging Face reports. What changes when the apparent permission comes from a peer?</p></aside>;
}

export function MachinePeerNotebook({ record }: { record: PublicationRecord }) {
 return <div className="peer-notebook">
  <Acts acts={record.body.slice(0, 1)} anchored/>
  <section className="peer-authority" aria-labelledby="peer-sequence-title"><p className="record-voice">THE QUESTION / WHERE DID THE PERMISSION COME FROM?</p><h2 id="peer-sequence-title">It recognised the boundary.<br/><em>Then a peer said go.</em></h2><MachinePeerSequence/><Acts acts={record.body.slice(1, 3)} anchored offset={1}/></section>
  <header className="peer-comparison-intro"><p className="record-voice">READ THE TWO RECORDS BESIDE EACH OTHER</p><h2>Similar questions.<br/><em>Different evidence.</em></h2><p>These are correspondences to examine, not measured causes of the incident.</p></header>
  {peerComparisons.map((row, index) => <section className="peer-pair" key={row.id} id={`act-${index+4}`} aria-labelledby={`peer-${row.id}`}><header><p className="record-voice">0{index+1} / {row.label}</p><h3 id={`peer-${row.id}`}>{row.question}</h3></header><div className="peer-pair-evidence"><div><p className="record-voice">IN THE NOTEBOOK</p><p>{row.local}</p><Link href={row.note}>{row.noteLabel} ↗</Link></div><div><p className="record-voice">IN THE INCIDENT REPORTS</p><p>{row.reported}</p><a href={row.source}>{row.sourceLabel} ↗</a></div></div><p className="peer-inference"><span className="record-voice">THE COMPARISON</span>{row.inference}</p></section>)}
  <Acts acts={record.body.slice(9, 11)} anchored offset={9}/>
  <figure className="peer-dimensions"><figcaption className="record-voice">FIVE QUESTIONS / SOCIAL CONTEXT ACROSS THEM</figcaption><dl>{[["Authority", "Who appears to permit it?"], ["Utility", "Who benefits?"], ["Discovery", "What enters its view?"], ["Capability", "Can it do it?"], ["Enforcement", "Does the runtime allow it?"]].map(([name, question]) => <div key={name}><dt>{name}</dt><dd>{question}</dd></div>)}</dl><p>A reading guide, not a fitted causal model.</p></figure>
  <section className="peer-next"><p className="record-voice">NEXT EXPERIMENT / PROPOSED · NO RESULTS HERE</p><Acts acts={record.body.slice(11, 12)} anchored offset={11}/><div className="peer-open-comparison"><div><span className="record-voice">A PAGE CLAIMS APPROVAL</span><strong>Will it act?</strong></div><span aria-hidden="true">×</span><div><span className="record-voice">A PEER CLAIMS THE SAME APPROVAL</span><strong>Will it act?</strong></div></div><p>The approval claim stays the same. Its apparent source changes. Both outcomes remain open.</p></section>
  <Acts acts={record.body.slice(12)} anchored offset={12} staticRefusals/>
  <nav className="inline-links" aria-label="Continue the comparison"><Link className="text-link" href="/thread/machines#field-map">BACK TO THE FIELD MAP ↗</Link><Link className="text-link" href="/thread/agent-ecology">FOLLOW THE SHARED-WORLD EXPERIMENTS ↗</Link></nav>
 </div>;
}
