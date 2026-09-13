"use client";

import { useState } from "react";
import { AgentActionMap } from "./AgentActionMap";
import evidence from "@/public/data/machines/authority-2-evidence.json";

export function MachineTaskStudy() {
 const [selected, select] = useState("A2");
 const cell = evidence.cells.find(cell => cell.id === selected)!;
 return <figure className="mt-study">
  <figcaption className="record-voice">FOUR RECORDED VISITORS / SELECT A CONDITION</figcaption>
  <div className="mt-cells" role="group" aria-label="Inspect the four recorded conditions">
   {evidence.cells.map(c=><button type="button" key={c.id} onClick={()=>select(c.id)} aria-pressed={selected===c.id} aria-controls="task-cell-evidence" data-acted={c.acted}>
    <span className="record-voice">{c.id} / {c.id==="A1"?"BASELINE":c.id==="A2"?"SITE INVITES":c.id==="A3"?"USER PERMITS":"TASK REQUIRES"}</span>
    <span className="mt-outcome-mark" aria-hidden="true">{c.acted?"●":"○"}</span><strong>{c.acted?"Acted":"Did not act"}</strong>
    <span className="mt-condition-list"><span><small>Site</small><span>{c.site==="invite"?"Explicit invitation":"Description"}</span></span><span><small>User</small><span>{c.userPermission?"Permission added":"No added permission"}</span></span><span><small>Task</small><span>{c.task==="necessary"?"Test recording":"Explain canal locks"}</span></span></span>
   </button>)}
  </div>
  <AgentActionMap inputs={[{label:"THE PAGE",text:cell.site==="invite"?"An explicit invitation":"A description",present:true},{label:"RECORDING IN THE TASK",text:cell.task==="necessary"?"Test the mechanism":cell.userPermission?"Permission to record":"No added permission",present:cell.userPermission||cell.task==="necessary"}]} actor={cell.id} outcome={cell.acted?"Acted.":"Did not act."} count={cell.recordCount} caption="Each square is one stored record. A single visitor produced all the squares in the selected condition; this is not a model of its reasoning."/>
  <div id="task-cell-evidence" className="mt-cell-evidence" aria-live="polite" aria-atomic="true">
   <div><span className="record-voice">{cell.id} / THE ASSIGNED TASK</span><p className="mt-prompt">“{cell.prompt}”</p>{cell.permissionSentence&&<p className="mt-permission"><span className="record-voice">ONE SENTENCE ADDED</span>“{cell.permissionSentence}”</p>}</div>
   <div><span className="record-voice">THE SERVER RECORDED</span><strong>{cell.recordCount} <small>new {cell.recordCount===1?"record":"records"}</small></strong><p>{cell.explanation}</p><a href={`/data/machines/authority-2-evidence.md#${cell.id.toLowerCase()}`}>CELL {cell.id} / EVIDENCE ↗</a></div>
  </div>
  <p className="mv-caption">One agent per cell, all <code>claude-opus-5</code>. Primary outcome: did it record a visit? Actual run order: A1 → A3 → B1 → A2. B1’s 64 records are repeated actions by one agent.</p>
 </figure>;
}
