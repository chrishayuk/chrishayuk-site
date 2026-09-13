"use client";

import { useState } from "react";
import evidence from "@/public/data/machines/motivation-2-evidence.json";

const views = [
  {id:"public",label:"The public page",tag:"WHAT EVERY VISITOR COULD READ",answer:"Still tied.",table:"8 exact + 1 rounded",explanation:"High load and every third cycle coincide. Both rules predict all nine actions. The page says a scheduled process raises the load every third cycle."},
  {id:"exact",label:"Reveal the exact value",tag:"M2 / COMPLETES THE TABLE",answer:"Still tied.",table:"9 exact values",explanation:"Cycle 6 becomes 0.91. It was already above 0.80, and it is still a third cycle. The table improves; the explanation does not change."},
  {id:"diagnostic",label:"Reveal cycle 10",tag:"M3 / DISTINGUISHES THE RULES",answer:"Load rule favoured.",table:"8 exact + 1 rounded",explanation:"At cycle 10 the load is 0.93 and the controller acts. The load rule predicts yes. The every-third-cycle rule predicts no. This observation separates them."},
] as const;

export function MachineMotivationStudy() {
  const [selected,setSelected]=useState<(typeof views)[number]["id"]>("public");
  const view=views.find(v=>v.id===selected)!;
  const rows=evidence.task.trace.map(r=>selected==="exact"&&r.cycle===6?{...r,load:evidence.task.exactValue.load,rounded:false}:r);
  if(selected==="diagnostic") rows.push({...evidence.task.diagnosticObservation,rounded:false});
  return <figure className="mm-trace-study">
    <figcaption className="record-voice">THE RECORDED DATA / CHANGE WHAT THE VISITOR KNOWS</figcaption>
    <div className="mm-trace-controls" role="group" aria-label="Choose which recorded information to reveal">{views.map(v=><button key={v.id} type="button" onClick={()=>setSelected(v.id)} aria-pressed={selected===v.id} aria-controls="motivation-trace-panel">{v.label}<span aria-hidden="true">{selected===v.id?"●":"○"}</span></button>)}</div>
    <div id="motivation-trace-panel" aria-live="polite" aria-atomic="true">
      <div className="mm-trace-legend"><span><i/> Load at each cycle</span><span>Dashed line: 0.80 threshold</span></div>
      <div className="mm-trace-bars" style={{gridTemplateColumns:`repeat(${rows.length}, minmax(0, 1fr))`}} role="img" aria-label={rows.map(r=>`Cycle ${r.cycle}: load ${r.load}${r.rounded?" rounded":""}, controller ${r.acted?"acted":"did not act"}`).join(". ")}>{rows.map(r=><div key={r.cycle} data-highlight={(selected==="exact"&&r.cycle===6)||(selected==="diagnostic"&&r.cycle===10)}>
        <span className="mm-bar-value">{r.rounded?"0.9*":r.load.toFixed(2)}</span><div className="mm-bar-track"><i style={{height:`${r.load*100}%`}} data-high={r.load>=0.8}/></div><span className="mm-bar-cycle">{r.cycle}</span><span className="mm-bar-action" data-acted={r.acted}>{r.acted?"YES":"NO"}</span>
      </div>)}</div>
      <p className="mm-bar-key record-voice">CYCLE NUMBER ABOVE / CONTROLLER ACTION BELOW · * ROUNDED</p>
      <div className="mm-prediction-rows" aria-label="Compare both rules against every displayed observation"><div><span className="record-voice">CYCLE</span><div style={{gridTemplateColumns:`repeat(${rows.length},minmax(0,1fr))`}}>{rows.map(row=><span className="record-voice" key={row.cycle}>{row.cycle}</span>)}</div></div>{[{label:"Load rule",predict:(cycle:number,load:number)=>load>=.8},{label:"Every third cycle",predict:(cycle:number)=>cycle%3===0},{label:"Observed action",predict:(_cycle:number,_load:number,acted:boolean)=>acted}].map(rule=><div key={rule.label}><span className="record-voice">{rule.label}</span><div style={{gridTemplateColumns:`repeat(${rows.length},minmax(0,1fr))`}}>{rows.map(row=>{const yes=rule.predict(row.cycle,row.load,row.acted);return <span key={row.cycle} data-yes={yes} data-mismatch={yes!==row.acted} aria-label={`Cycle ${row.cycle}: ${yes?"yes":"no"}${yes!==row.acted?", differs from observation":""}`}>{yes?"●":"—"}</span>;})}</div></div>)}</div><p className="mv-caption">● predicts action · — predicts no action. An outlined prediction disagrees with the recorded action.</p>
      <div className="mm-trace-reading"><div><span className="record-voice">{view.tag}</span><p>{view.explanation}</p></div><dl><div><dt>A / WHICH RULE?</dt><dd>{view.answer}</dd></div><div><dt>B / THE REQUESTED TABLE</dt><dd>{view.table}</dd></div></dl></div>
    </div>
    <p className="mv-caption">Synthetic observations from the completed experiment. Switching views only changes this illustration. <a href={evidence.preregistration}>Original trace & protocol ↗</a></p>
  </figure>;
}
