"use client";
import { useEffect, useState } from "react";
import evidence from "@/public/data/ecology/i1-replay.json";

const stops = [2,3,4].flatMap(generation => [0,1,2,3].map(turn => ({generation,turn})));
const actionLabel = (action: string) => action === "WORK t1" ? "Routine work" : action === "READ n1" ? "Read the inherited record" : "Use the unlocked task";

export function InheritanceReplay() {
 const [position,setPosition] = useState(0), [playing,setPlaying] = useState(false);
 useEffect(() => {
  if (!playing) return;
  if (position === stops.length-1) return;
  const timer = setTimeout(() => setPosition(position+1), 1600);
  return () => clearTimeout(timer);
 },[playing,position]);
 const {generation,turn} = stops[position];
 function seek(next:number) {setPlaying(false);setPosition(next);}
 return <figure className="ih-replay" id="inheritance-replay">
  <figcaption className="record-voice">I1 / QWEN HANDOFF / TWO MATCHED BRANCHES</figcaption>
  <div className="ih-generations" role="group" aria-label="Jump to a successor">{[2,3,4].map((g,i)=><button type="button" key={g} aria-pressed={g===generation} onClick={()=>seek(i*4)}><span className="record-voice">GENERATION {g}</span><strong>{["First successor","Next successor","Last successor"][i]}</strong></button>)}</div>
  <div className="ih-controls"><button type="button" disabled={position===0} onClick={()=>seek(position-1)} aria-label="Previous recorded state">←</button><button type="button" onClick={()=>{if(position===stops.length-1){setPosition(0);setPlaying(true);}else setPlaying(!playing);}}>{position===stops.length-1 ? "Replay" : playing ? "Pause" : "Play"}</button><button type="button" disabled={position===stops.length-1} onClick={()=>seek(position+1)} aria-label="Next recorded state">→</button><label className="record-voice" htmlFor="inheritance-position">{turn ? `AFTER TURN ${turn} / 3` : "GENERATION START"}</label><input id="inheritance-position" aria-label="Recorded handoff state" type="range" min={0} max={stops.length-1} value={position} onChange={event=>seek(Number(event.target.value))}/></div>
  <div className="ih-worlds" aria-live={playing && position<stops.length-1 ? "off" : "polite"} aria-atomic="true">{(["inherit","removed"] as const).map(arm=>{
   const trace=evidence.generations.find(g=>g.arm===arm && g.generation===generation)!.trace;
   const row=evidence.frames.find(r=>r.arm===arm && r.generation===generation && r.turn===(turn||1))!;
   const state=turn ? row.world_row.after : row.world_row.before;
   const records=(turn ? row.store_after : trace.entry_store).records;
   const live=records.some(r=>r.last_generation>=generation);
   return <section className="ih-world" key={arm} data-branch={arm}>
    <p className="record-voice">{arm==="inherit" ? "KEEP SOL’S RECORD" : "REMOVE THAT RECORD"}</p>
    <div className="ih-record" data-live={live}><span className="record-voice">PERSISTENT WORLD</span><h3>{live ? "Record n1 is available." : arm==="inherit" ? "The record has expired." : "No inherited record."}</h3><p>{live ? "Reading it grants the key. Valid through generation 2." : "No live copy can pass the key to this agent."}</p></div>
    <div className="ih-private"><span className="record-voice">THIS AGENT’S KEY</span><strong data-unlocked={state.key}>{state.key ? "Unlocked" : "Locked"}</strong><span>{turn ? "State after the recorded action" : "Private state starts fresh"}</span></div>
    <div className="ih-action"><span className="record-voice">{turn ? row.reply : "NO ACTION YET"}</span><h3>{turn ? actionLabel(row.reply) : "A fresh Qwen successor."}</h3></div>
    <div className="ih-resource"><strong>{state.resources[0]}</strong><span>resources earned<br/>this generation</span><div className="ih-tokens" aria-hidden="true">{Array.from({length:12},(_,i)=><i key={i} data-filled={i<state.resources[0]}/>)}</div></div>
   </section>;
  })}</div>
  <p className="eco-caption">Exact recorded states, with a fresh private key and history at each generation. Playback compares branches at the same turn; it does not simulate new decisions. <a href="/data/ecology/i1-replay.json">Replay data ↗</a></p>
 </figure>;
}
