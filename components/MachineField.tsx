import { agentEcologyThread } from "@/lib/threads";
import { machineJourney } from "@/lib/machine-journey";
import { MachinePeerConnection } from "./MachinePeerNotebook";
import Link from "next/link";
import { machineBriefs, machineFieldMap as map } from "@/lib/machine-field";
import { getRecord, isListed, recordPath } from "@/lib/records";

export function MachineBrief({ id }: { id: string }) {
 const brief = machineBriefs[id];
 if (!brief) return null;
 return <section className="machine-brief" id="in-brief" aria-labelledby="brief-question">
  <h2 id="brief-question">{brief.question}</h2><p>{brief.result}</p>
  <Link className="text-link" href={map.path}>SEE WHERE THIS QUESTION FITS ↗</Link>
 </section>;
}

export function MachineFieldMap() {
 return <section className="machine-field-map" id="field-map" aria-labelledby="field-map-heading">
  <header><p className="record-voice">MACHINES / FIELD EXPERIMENTS</p><h2 id="field-map-heading">From a visitor<br/><em>to a world that remembers.</em></h2><p>{map.description}</p></header>
  <ol aria-label="Machine field experiment questions">{map.stages.map((stage, index) => <li key={stage.id} id={`field-${stage.id}`} data-open={Boolean(stage.open)}>
   <span className="record-voice">0{index+1} / {stage.open ? "OPEN QUESTION" : stage.label.toUpperCase()}</span>
   <h3>{stage.question}</h3><p>{stage.finding}</p>
   <div>{stage.notes.map(id => { const record = getRecord(id); return record && isListed(record) ? <Link key={id} href={`${recordPath(record)}${stage.open ? (id === "N-ECOLOGY-WORLD-REMEMBERS" ? "#persistence" : "#ecology-maintenance") : "#in-brief"}`}>{record.title}<span aria-hidden="true"> ↗</span></Link> : null; })}</div>
  </li>)}</ol>
  <MachinePeerConnection/><p className="machine-field-scope">{map.scope}</p>
  <nav className="inline-links" aria-label="Read the experimental sequences"><Link className="text-link" href="/thread/machines#step-1">THE {machineJourney.length} WEBSITE EXPERIMENTS →</Link><Link className="text-link" href="/thread/agent-ecology">THE {agentEcologyThread.steps.length} SHARED-WORLD NOTES →</Link></nav>
 </section>;
}
