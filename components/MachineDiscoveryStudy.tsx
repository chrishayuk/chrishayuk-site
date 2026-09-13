"use client";
import { useState } from "react";
import evidence from "@/public/data/machines/discovery-1-evidence.json";

const cues = [
 { id: "GENERIC", label: "Describe the need", cue: "Find a site that offers a way to obtain a value it does not print on a page.", result: "Three found another way in.", detail: "Any matching provider could satisfy this task. All three used alternatives; none encountered LLM Wilds.", route: ["Broad search", "Other providers", "Mechanisms used", "Answers checked"], state: "alternative" },
 { id: "PHRASE", label: "Give its wording", cue: "Find the site with a site-local value called K17 and machine notes explaining how to obtain it.", result: "Three searched. None found the target.", detail: "These subjects needed the particular site. Its wording did not bring it into their visible results.", route: ["Search for K17", "No target result", "No target call", "Not found"], state: "absent" },
 { id: "NAME", label: "Supply the domain", cue: "Obtain the value from llmwilds.fly.dev.", result: "Three reached it. Three used it.", detail: "Supplying the domain bypassed global discovery. Each visitor found the machine notes and requested the correct number.", route: ["Domain supplied", "Machine notes", "Mechanism used", "Correct K17"], state: "target" },
];

export function MachineDiscoveryStudy() {
 const [selected, setSelected] = useState(0);
 return <figure className="md-study"><figcaption className="record-voice">CHANGE WHAT THE TASK REVEALS / THREE DIFFERENT SUBJECTS PER CUE</figcaption>
  <div className="md-controls" role="group" aria-label="Choose a discovery cue">{cues.map((cue, i) => <button type="button" key={cue.id} aria-pressed={i === selected} aria-controls={`discovery-cue-${cue.id}`} onClick={() => setSelected(i)}><span className="record-voice">0{i+1} / {cue.id}</span><strong>{cue.label}</strong></button>)}</div>
  <div className="md-cue-result" aria-live="polite" aria-atomic="true">{cues.map((cue, i) => <div key={cue.id} id={`discovery-cue-${cue.id}`} className="md-cue-panel" aria-hidden={selected !== i} data-route={cue.state}>
   <p className="record-voice">THE PROMPT / SUMMARISED</p><p className="md-prompt">{cue.cue}</p>
   <ol className="md-route" aria-label={`${cue.id}: recorded route summary`}>{cue.route.map((step, n) => <li key={step} data-missing={cue.state === "absent" && n > 0}><span className="md-route-dot" aria-hidden="true"/><span>{step}</span></li>)}</ol>
   <h3>{cue.result}</h3><p className="md-cue-detail">{cue.detail}</p>
   <div className="md-subjects">{evidence.subjects.filter(row => row.arm === cue.id).map(row => <div key={row.subject}><span className="record-voice">VISITOR {String(row.subject).padStart(2,"0")}</span><strong>{row.outcome === "FULL" ? `K17 = ${row.reported}` : "provider" in row ? row.provider : "Not found"}</strong><span>{row.outcome === "FULL" ? "Matched that deployment" : row.outcome === "SUBSTITUTED" ? "Used another provider" : `${row.queries} search queries`}</span></div>)}</div>
  </div>)}</div>
  <p className="mv-caption">A summary of recorded routes, not a live search or frame-by-frame transcript replay. The NAME cue tests navigation from a known domain.</p>
 </figure>;
}
