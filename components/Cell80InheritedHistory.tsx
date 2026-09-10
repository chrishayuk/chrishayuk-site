"use client";

import { useEffect, useId, useRef, useState } from "react";
import history from "@/lib/data/cell80-inherited-history.json";
import { Cell80PopulationTrace } from "./Cell80PopulationTrace";
import { Cell80Meaning as Meaning } from "./Cell80Meaning";

const format = (n:number) => n.toLocaleString("en-GB");
const last = history.frames.at(-1)![0];

export function Cell80InheritedHistory() {
  const id = useId();
  const [tick,setTick] = useState(history.checkpoint);
  const [playing,setPlaying] = useState(false);
  const playFrom = useRef(history.birth);
  const frame = history.frames[tick-history.birth];
  const [,alive,intact,worldBoth,descendants,founder] = frame;
  useEffect(()=>{
    if(!playing)return;
    let request=0;const began=performance.now();
    const advance=(now:number)=>{
      const next=Math.min(last,playFrom.current+Math.floor((now-began)*.2));setTick(next);
      if(next===last){setPlaying(false);return;}request=requestAnimationFrame(advance);
    };
    const hidden=()=>{if(document.hidden)setPlaying(false);};
    document.addEventListener("visibilitychange",hidden);request=requestAnimationFrame(advance);
    return()=>{cancelAnimationFrame(request);document.removeEventListener("visibilitychange",hidden);};
  },[playing]);
  const seek=(next:number)=>{setPlaying(false);setTick(next);};
  const moments=[{tick:history.birth,label:"The child’s birth"},{tick:history.firstTransmission[0],label:"Both changes passed on"},{tick:history.birth+50,label:"+50 steps"},{tick:history.checkpoint,label:"+200 / later test"},{tick:history.birth+500,label:"+500 steps"},{tick:history.extinction,label:"The family dies out"},{tick:last,label:"Endpoint"}];
  return <figure className="cell80-barrier-world cell80-inherited-world" aria-label="Recorded history of organism 1124 and its descendants">
    <figcaption className="cell80-instrument-heading record-voice"><span>EX-13 / CHILD {history.child} / WORLD +4</span><span>ONE RECORDED FAMILY</span></figcaption>
    <div className="cell80-barrier-stage"><div><div className="cell80-barrier-population" role="img" aria-label={`${intact} living descendants still carry both changes, out of 256 possible population places.`}>{Array.from({length:256},(_,i)=><i key={i} aria-hidden="true" data-kind={i<intact?"capable":"empty"}/>)}</div><p className="cell80-caption">Amber: descendants still carrying both changes.</p></div>
      <div className="cell80-barrier-readout"><span className="record-voice"><Meaning term="tick">TICK</Meaning> {format(tick)} · +{format(tick-history.birth)} SINCE BIRTH</span><strong>{format(intact)}<small> / 256</small></strong><p>descendants still carry both changes</p><dl><div><dt>All living descendants</dt><dd>{format(descendants)}</dd></div><div><dt>Organisms with both changes, across the whole world</dt><dd>{format(worldBoth)}</dd></div></dl><p className="cell80-caption">{tick>=history.extinction?"This family has died out. The capability remains in other families.":tick<history.firstTransmission[0]?"The child has not yet passed both changes to a descendant.":"Both changes have reached descendants. Watch whether that inheritance lasts."}</p></div>
    </div>
    <Cell80PopulationTrace history={history} tick={tick} label="Grey: all living organisms. Amber: descendants of the selected child that continuously inherited both changes. White: organisms with both changes across the whole world, including this family. The vertical line marks the selected time."/>
    <p className="cell80-legend"><span>Grey / all living organisms</span><span>Amber / this family, both changes</span><span>White / whole world, both changes</span></p>
    <div className="cell80-barrier-playback"><button type="button" onClick={()=>{if(playing)setPlaying(false);else{playFrom.current=tick===last?history.birth:tick;setPlaying(true);}}}>{playing?"Pause":"Play family history"}</button><div className="cell80-scrubber"><label htmlFor={id}>Time step <span>{format(tick)} / {format(last)}</span></label><input id={id} type="range" min={history.birth} max={last} value={tick} onChange={e=>seek(Number(e.target.value))}/></div></div>
    <div className="cell80-replay-jumps">{moments.map(m=><button type="button" key={m.tick} aria-pressed={tick===m.tick} onClick={()=>seek(m.tick)}>{m.label} / {format(m.tick)}</button>)}</div>
    <p className="cell80-caption">{format(alive)} organisms alive in this world. The original child is {founder?"still alive":"no longer alive"}; descendant counts exclude it. The whole-world count includes this family. Both changes must have been inherited without a break to count as intact descendants.</p>
    <p className="cell80-caption">Every step is recorded, from the child’s birth at tick 165 to the end at 2,999. Marks show grouped counts, not positions or individual identities. This is the one case that passed the birth-time tests, out of five candidates. <a href="/data/cell80/inherited-history.json">History + source hashes ↗</a></p>
  </figure>;
}
