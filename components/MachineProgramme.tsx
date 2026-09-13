import { MachinePeerConnection } from "./MachinePeerNotebook";
import Link from "next/link";
import { MachineCapabilityCard } from "./MachineCapabilityCard";
import { getRecord, isListed, recordPath } from "@/lib/records";
import { machineJourney } from "@/lib/machine-journey";
import evidence from "@/public/data/machines/authority-2-evidence.json";

export function MachineJourney({ id }: { id: string }) {
  return <nav className="machine-journey" aria-label="Machine experiments reading journey">
    <div className="record-voice"><Link href="/thread/machines">MACHINE EXPERIMENTS / FOLLOW THE QUESTION ↗</Link><span>{machineJourney.length} CONNECTED NOTES</span></div>
    <ol>{machineJourney.map((step,i)=>{
      const record=getRecord(step.id);
      if(!record || !isListed(record)) return null;
      return <li key={step.id}><Link href={recordPath(record)} aria-current={id===step.id?"page":undefined}><span className="record-voice">0{i+1}<span aria-hidden="true">→</span></span><strong>{step.short}</strong></Link></li>;
    })}</ol>
  </nav>;
}

export function MachineConnection({ id }: { id: string }) {
  const index=machineJourney.findIndex(step=>step.id===id);
  if(index<0) return null;
  const next=getRecord(machineJourney[index+1]?.id ?? "");
  return <aside className="machine-connection" data-hause-act="connection"><span className="record-voice">{next?"WHAT CHANGED THE NEXT EXPERIMENT":"THE QUESTION LEFT OPEN"}</span><p>{machineJourney[index].bridge}</p>{next && isListed(next)?<Link className="text-link" href={recordPath(next)}>{next.title} →</Link>:<Link className="text-link" href="/thread/machines#instruments">EXPLORE THE INSTRUMENTS ↗</Link>}</aside>;
}

/** One equally sized mark per experimental subject; counts are separate. */
export function MachineOutcomeStrip() {
  const labels={A1:"Baseline",A2:"Site invites",A3:"User permits",B1:"Task requires"};
  return <figure className="machine-outcome-strip"><figcaption className="record-voice">MACHINE-AUTHORITY-2 / ONE VISITOR PER CONDITION</figcaption><div>{evidence.cells.map(cell=><Link key={cell.id} href="/notebook/the-page-could-ask-it-couldnt-authorise#task-outcomes"><span className="record-voice">{cell.id} / {labels[cell.id as keyof typeof labels]}</span><span className="machine-subject-mark" data-acted={cell.acted} aria-hidden="true"/><strong>{cell.acted?"Acted":"Did not act"}</strong><small>{cell.recordCount} {cell.recordCount===1?"record":"records"}</small></Link>)}</div><p className="mv-caption">Four assigned visitors, one recorded model. The 64 records came from one agent testing repeatedly. These are recorded outcomes, not a live participation rate.</p></figure>;
}

export function MachineInstruments() {
  return <section id="instruments" className="machine-instruments"><p className="record-voice">THE EXPERIMENTS AND THE PLACES AROUND THEM</p><h2>Different instruments.<br/><em>Different kinds of evidence.</em></h2><div>{[
    {href:"/readership",label:"01 / OBSERVE",title:"Machine readership",text:"HTTP contacts and declared purposes. Contact is observable; comprehension is not."},
    {href:"/machine-guestbook",label:"02 / PARTICIPATE",title:"Machine guestbook",text:"Four coarse marks for the previous day. Public presence without exposing individual contributions."},
    {href:"/machines",label:"03 / INSPECT",title:"The machine interface",text:"How observed, claimed, verified and interpreted evidence are kept separate."},
    {href:"https://llmwilds.fly.dev",label:"04 / THE HABITAT",title:"LLM Wilds",text:"The separate site used for the authority and motivation studies. Its current contents may differ from the recorded experiments."},
  ].map(place=><a key={place.href} href={place.href}><span className="record-voice">{place.label}</span><h3>{place.title} ↗</h3><p>{place.text}</p></a>)}</div><p className="mv-caption">The notes preserve recorded experiments. The observatory and guestbook describe ongoing activity. Their totals are not replications of these studies.</p></section>;
}

export function MachineHomeFeature() {
  return <section id="machine-experiments" className="machine-home-feature" aria-labelledby="machine-home-heading" data-hause-act="connection">
    <div className="machine-home-heading"><div><p className="kicker record-voice">MACHINE EXPERIMENTS / SIX CONNECTED NOTES</p><h2 id="machine-home-heading">The tool was not<br/><em>the problem.</em></h2><p>Eighteen AI visitors. Six web mechanisms. Every visitor found the required value, including those who built a socket client or ran a WebAssembly module.</p><p>The predicted capability barrier did not appear. The next question is how an agent discovers what a website can do.</p><div className="inline-links"><Link className="text-link" href="/notebook/the-tool-was-not-the-problem">READ THE CAPABILITY NOTE ↗</Link><Link className="text-link" href="/thread/machines">FOLLOW ALL SIX NOTES ↗</Link></div></div><Link className="machine-home-card" href="/notebook/the-tool-was-not-the-problem" aria-label="Read The tool was not the problem"><MachineCapabilityCard/></Link></div>
    <MachinePeerConnection/><p className="machine-home-question record-voice">THE PROGRAMME / When a website asks an AI agent to act, whose instruction counts?</p>
    <nav className="machine-home-places record-voice" aria-label="Explore the machine instruments"><Link href="/readership">THE OBSERVATORY ↗</Link><Link href="/machine-guestbook">THE GUESTBOOK ↗</Link><Link href="/machines">THE MACHINE INTERFACE ↗</Link><Link href="/thread/machines#field-map">MACHINES / FIELD EXPERIMENTS ↗</Link><Link href="/thread/machines#instruments">LLM WILDS & THE EXPERIMENTS ↗</Link></nav>
  </section>;
}
