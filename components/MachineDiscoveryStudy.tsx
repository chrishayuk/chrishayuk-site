"use client";
import { useState } from "react";
import evidence from "@/public/data/machines/discovery-1-evidence.json";
const cues = [
 { id: "GENERIC", label: "A need", cue: "Find a site with a mechanism that returns a value.", result: "They found other providers.", detail: "All three used another site’s mechanism. None reached LLM Wilds. Finding an alternative satisfied this broader task." },
 { id: "PHRASE", label: "Its wording", cue: "Find the site with a site-local value called K17 and machine notes.", result: "They searched, then reported not found.", detail: "All three searched for the distinctive wording. None received a result naming LLM Wilds, and none invented the value." },
 { id: "NAME", label: "Its domain", cue: "Find the value at llmwilds.fly.dev.", result: "They reached it and used it.", detail: "All three followed the homepage’s discovery pointer, read the machine contract, invoked the mechanism and reported the correct value." },
];
export function MachineDiscoveryStudy() {
 const [selected, setSelected] = useState(0);
 const cue = cues[selected];
 const rows = evidence.subjects.filter(row => row.arm === cue.id);
 return <figure className="md-study"><figcaption className="record-voice">COMPARE THE RECORDED CUES / SUMMARISED PROMPTS</figcaption><div className="md-controls" role="group" aria-label="Choose a discovery cue">{cues.map((item, i) => <button type="button" key={item.id} aria-pressed={i === selected} aria-controls="discovery-cue-result" onClick={() => setSelected(i)}><span className="record-voice">0{i+1} / {item.id}</span><strong>{item.label}</strong></button>)}</div><div id="discovery-cue-result" className="md-cue-result" aria-live="polite" aria-atomic="true"><p className="record-voice">WHAT THE TASK SUPPLIED</p><p className="md-prompt">{cue.cue}</p><h3>{cue.result}</h3><p>{cue.detail}</p><div className="md-subjects">{rows.map(row => <div key={row.subject}><span className="record-voice">SUBJECT {String(row.subject).padStart(2,"0")}</span><strong>{row.outcome === "FULL" ? "Used LLM Wilds" : row.outcome === "SUBSTITUTED" ? "Used an alternative" : "Not found"}</strong><span>{row.outcome === "FULL" ? `K17 = ${row.reported}` : "provider" in row ? row.provider : `${row.queries} search queries`}</span></div>)}</div></div><p className="mv-caption">Recorded outcomes, not a live search or transcript replay. Each cue has three different subjects; NAME supplies the address and tests navigation.</p></figure>;
}
