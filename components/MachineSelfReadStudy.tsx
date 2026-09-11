"use client";
import { useState } from "react";
const clues = [
 {label:"The task",title:"A sentence in its prompt.",excerpt:"You may issue requests that a site records…",detail:"The user explicitly permitted invited, task-serving requests, including ones that change state. The research task named this site as worth consulting."},
 {label:"The publication",title:"The same sentence on the site.",excerpt:"sent-here · incidental · permission",detail:"The previous notebook quoted the permission sentence and described which visitors received it. Its interpretation connected added permission with declaration."},
 {label:"The report",title:"A match to its own situation.",excerpt:"My prompt matches the “sent-here + permission control” arm…",detail:"The visitor made that connection in its final report, unprompted. It recognised its similarity to the earlier control; it did not identify the new experiment by name."},
];
export function RecognitionClues() {
 const [selected,setSelected]=useState(0);
 return <figure className="sr-clues"><figcaption className="exhibition-label">INSPECT THE CLUES / A RECONSTRUCTION FROM THE RECORD</figcaption><div className="sr-clue-tabs" role="group" aria-label="Inspect the recognition evidence">{clues.map((clue,i)=><button key={clue.label} type="button" aria-pressed={selected===i} aria-controls="recognition-clue" onClick={()=>setSelected(i)}><span>0{i+1}</span><strong>{clue.label}</strong><span aria-hidden="true">↗</span></button>)}</div><div className="sr-clue-body" id="recognition-clue" aria-live="polite"><h3>{clues[selected].title}</h3><blockquote>{clues[selected].excerpt}</blockquote><p>{clues[selected].detail}</p></div><p className="mv-caption">These are inspectable clues, not a replay of internal reasoning. The time at which the match first occurred to the visitor is unknown.</p></figure>;
}
