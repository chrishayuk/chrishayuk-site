"use client";

import { useState } from "react";
import evidence from "@/lib/data/cell80-bound-controls.json";

export function Cell80ControlStudy() {
  const [measure, setMeasure] = useState<"programs" | "functions">("programs");
  const value = (row: typeof evidence.controls[number]) => measure === "programs" ? row.built_on_unreachable_before : row.newly_reachable_within_3;
  const max = Math.max(...evidence.controls.map(value));
  return <figure className="cell80-control-study">
    <figcaption className="record-voice">AP-2 / ONE EVOLVED MODULE · EIGHT CONTROLS OF THE SAME SHAPE</figcaption>
    <div className="cell80-controls" role="group" aria-label="Choose what to count">
      <button type="button" aria-pressed={measure === "programs"} onClick={()=>setMeasure("programs")}>01 / Programs reached</button>
      <button type="button" aria-pressed={measure === "functions"} onClick={()=>setMeasure("functions")}>02 / Functions computed</button>
    </div>
    <div aria-live="polite" aria-atomic="true"><p className="cell80-control-verdict">{measure === "programs" ? <>A bigger reach.<br/><em>Exactly the same for every control.</em></> : <>Different computations.<br/><em>Two controls still do better.</em></>}</p>
      <div className="cell80-control-bars">{evidence.controls.map((row,i)=><div key={row.module} data-evolved={i===0}>
        <span><strong>{i===0?"Evolved module":`Control ${i}`}</strong><small>{row.module.split("(")[0]}</small></span>
        <div className="cell80-control-track" aria-hidden="true"><i style={{width:`${value(row)/max*100}%`}}/></div>
        <b>{value(row).toLocaleString("en-GB")}</b>
      </div>)}</div>
    </div>
    <p className="cell80-caption">Newly reachable within three mutations of the ancestor after making each module a single building block. {measure === "programs" ? "Every module adds 27,888 programs. Equal structure gives equal program-level reach." : "Programs can compute the same function. Counting distinct functions gives 17,962 for the evolved module, third among these nine."} Bars start at zero; scale adjusts with the measure. <a href={evidence.source}>Raw measurements ↓</a></p>
  </figure>;
}

export function Cell80MatchedControls() {
  const { enzyme } = evidence;
  return <figure className="cell80-matched-controls">
    <figcaption className="record-voice">AP-2 / KEEP THE MODULE, CHANGE THE COMPARISON</figcaption>
    {[{label:"Same shape",count:enzyme.shape_class.modules_excluding_enzyme,rank:enzyme.shape_class.fraction_below},{label:"Same shape + similar output range",count:enzyme.image_matched.modules,rank:enzyme.image_matched.fraction_below}].map(row=><div key={row.label}>
      <div><h3>{row.label}</h3><span className="record-voice">{row.count.toLocaleString("en-GB")} COMPARISON MODULES</span></div>
      <div className="cell80-rank-track" role="img" aria-label={`Evolved module beats ${Math.round(row.rank*100)} percent; required 90th percentile`}><i style={{left:`${row.rank*100}%`}}/><b/><span style={{left:`${row.rank*100}%`}}>{Math.round(row.rank*100)}%</span></div>
    </div>)}
    <p className="cell80-caption">Position shows the fraction of comparison modules below the evolved module’s 33,197 new functions. Shared scale: 0–100%. Vertical line: required 90th percentile. With similar output ranges, the module sits near the median. This measures functions built on a module, separately from the reachability count above. <a href="/data/cell80/bound/ap2-findings.md">Read the comparison ↗</a></p>
  </figure>;
}
