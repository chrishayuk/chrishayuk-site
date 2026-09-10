"use client";

import { useEffect, useId, useRef, useState } from "react";
import index from "@/lib/data/cell80-barrier-index.json";
import { Cell80PopulationTrace } from "./Cell80PopulationTrace";
import preview from "@/lib/data/cell80-barrier-preview.json";
import { Cell80Meaning as Meaning } from "./Cell80Meaning";

type History = {key:string; frames:number[][]};
const conditions = [
  {id:"full", label:"Full evolution", initial:5},
  {id:"b_only", label:"Fixed food intake", initial:6},
  {id:"no_substrate", label:"New food removed", initial:5},
  {id:"atomic_only", label:"No combinations", initial:0},
];
const start = index.worlds.find(w => w.key === preview.key)!;
const format = (n:number) => n.toLocaleString("en-GB");


export function Cell80BarrierWorld() {
  const id = useId();
  const [key,setKey] = useState(start.key);
  const [history,setHistory] = useState<History>(preview);
  const [tick,setTick] = useState(start.firstObserved ?? 0);
  const [playing,setPlaying] = useState(false);
  const [error,setError] = useState(false);
  const [retry,setRetry] = useState(0);
  const playFrom = useRef(0);
  const cache = useRef(new Map<string,History>([[preview.key,preview]]));
  const meta = index.worlds.find(w=>w.key===key)!;
  const ready = history.key===key;
  const frame = ready ? history.frames[tick] : meta.preview;
  const [shownTick,alive,capable,high] = frame;
  const arm = conditions.find(c=>c.id===meta.arm)!;

  useEffect(()=>{
    if (cache.current.has(key)) return;
    const controller = new AbortController();
    fetch(`/data/cell80/barrier/${key}.json`,{signal:controller.signal}).then(r=>{if(!r.ok)throw new Error("History unavailable");return r.json();}).then(value=>{
      if(controller.signal.aborted)return;
      const data = value as History;
      if(!data || data.key!==key || !Array.isArray(data.frames) || data.frames.length!==3000 || data.frames.some((f,i)=>!Array.isArray(f) || f.length!==4 || f[0]!==i || !f.every(Number.isInteger) || f[3]<0 || f[3]>f[2] || f[2]>f[1] || f[1]>256))throw new Error("Wrong history");
      cache.current.set(key,data);setHistory(data);
    }).catch(()=>{if(!controller.signal.aborted)setError(true);});
    return()=>controller.abort();
  },[key,retry]);

  useEffect(()=>{
    if(!playing)return;
    let request = 0;const began = performance.now();
    const advance = (now:number) => {
      const next = Math.min(2999,playFrom.current + Math.floor((now-began)*.2));setTick(next);
      if(next===2999){setPlaying(false);return;}
      request=requestAnimationFrame(advance);
    };
    const hidden = () => {if(document.hidden)setPlaying(false);};
    document.addEventListener("visibilitychange",hidden);request=requestAnimationFrame(advance);
    return()=>{cancelAnimationFrame(request);document.removeEventListener("visibilitychange",hidden);};
  },[playing]);

  const choose = (next:string) => {
    setPlaying(false);setError(false);setKey(next);
    const selected=index.worlds.find(w=>w.key===next)!;setTick(selected.firstObserved ?? 0);
    const saved=cache.current.get(next);if(saved)setHistory(saved);
  };
  const seek = (next:number) => {setPlaying(false);setTick(next);};
  const status = meta.firstBirth===null ? "No program that could use the new food arose in this world."
    : shownTick<meta.firstBirth ? "Before the new capability. No organism can use the new food."
    : capable>0 ? "A new capability is present. Follow what happens to its carriers."
    : "The capability arose, but no carriers remain at this recorded step.";

  return <figure className="cell80-barrier-world" aria-label="Recorded population history of the food-processing experiment">
    <figcaption className="cell80-instrument-heading record-voice"><span>EX-11 / {arm.label.toUpperCase()} / WORLD +{meta.offset}</span><span>RECORDED POPULATION COUNTS</span></figcaption>
    <div className="cell80-barrier-stage">
      <div><div className="cell80-barrier-population" role="img" aria-label={`At tick ${shownTick}, ${alive} organisms are alive. ${capable} have the food-processing capability, including ${high} with increased food intake. ${256-alive} places are empty.`}>
        {Array.from({length:256},(_,i)=><i key={i} aria-hidden="true" data-kind={i<high?"high":i<capable?"capable":i<alive?"ordinary":"empty"}/>)}</div><p className="cell80-caption">256 places. Organisms grouped by capability.</p></div>
      <div className="cell80-barrier-readout"><span className="record-voice"><Meaning term="tick">TICK</Meaning> {format(shownTick)}</span><strong>{format(capable)}<small> / 256</small></strong><p>carry a program that can use the new food</p><dl><div><dt>Alive</dt><dd>{format(alive)}</dd></div><div><dt>Also have higher food intake</dt><dd>{format(high)}</dd></div></dl><p className="cell80-caption">{status}</p></div>
    </div>
    <p className="cell80-legend cell80-barrier-legend"><span><i data-kind="ordinary"/>Other organisms</span><span><i data-kind="capable"/>Can use new food</span><span><i data-kind="high"/>Also higher intake</span><span><i data-kind="empty"/>Empty place</span></p>
    {ready && <Cell80PopulationTrace history={history} tick={tick} label="Population history: grey is all living organisms, amber is those able to use the new food, and white is those also carrying increased food intake. The vertical line marks the selected time."/>}
    <div className="cell80-barrier-playback"><button type="button" disabled={!ready} onClick={()=>{if(playing)setPlaying(false);else{playFrom.current=tick===2999?0:tick;setPlaying(true);}}}>{playing?"Pause":"Play history"}</button><div className="cell80-scrubber"><label htmlFor={id}>Time step <span>{format(shownTick)} / 2,999</span></label><input id={id} type="range" min={0} max={2999} value={shownTick} disabled={!ready} onChange={e=>seek(Number(e.target.value))}/></div></div>
    <div className="cell80-replay-jumps"><button type="button" disabled={!ready} onClick={()=>seek(0)}>Beginning</button>{meta.firstBirth!==null && <><button type="button" disabled={!ready} onClick={()=>seek(Math.max(0,meta.firstBirth!-1))}>Before the new program</button><button type="button" disabled={!ready} onClick={()=>seek(meta.firstBirth!)}>Its first birth / {format(meta.firstBirth)}</button></>}<button type="button" disabled={!ready} onClick={()=>seek(2999)}>Endpoint</button></div>
    <div className="cell80-controls" role="group" aria-label="Choose experimental conditions">{conditions.map(c=><button type="button" key={c.id} aria-pressed={meta.arm===c.id} onClick={()=>choose(`${c.id}-${c.initial}`)}>{c.label}</button>)}</div>
    <div className="cell80-barrier-worlds" role="group" aria-label="Choose one of ten recorded worlds">{index.worlds.filter(w=>w.arm===meta.arm).map(w=><button type="button" key={w.key} aria-pressed={key===w.key} aria-label={`World +${w.offset}: ${w.retained?"capability retained":w.origins?"appeared but not retained":"no capability appeared"}`} data-result={w.retained?"retained":w.origins?"appeared":"absent"} onClick={()=>choose(w.key)}><span>+{w.offset}</span><b aria-hidden="true">{w.retained?"●":w.origins?"○":"–"}</b></button>)}</div>
    <p className="cell80-caption">● Appeared and stayed common · ○ Appeared, not retained · – Never appeared. Each button is one world. {meta.origins>0 && meta.firstObserved===null ? "Here, a capable child was born and replaced within the same time step; it never appears in the end-of-step population counts. " : ""}The initial selection is one of the two full-evolution worlds that retained the capability.</p>
    {!ready && <p role="status" className="cell80-caption">{error?<>History could not load. <button type="button" onClick={()=>{setError(false);setRetry(r=>r+1);}}>Try again</button></>:"Loading the recorded history…"}</p>}
    <p className="cell80-caption">Every time step comes from the experiment. Squares show counts, not organism positions or continuous family identities. The trace shows all living organisms in grey, capable organisms in amber, and capable organisms with higher intake in white. <a href={`/data/cell80/barrier/${key}.json`} download>Download this history ↓</a> · <a href="/data/cell80/barrier/index.json">Source hashes ↗</a></p>
  </figure>;
}

export function Cell80BarrierOutcomes() {
  return <figure className="cell80-barrier-outcomes"><figcaption className="record-voice">40 WORLDS / DID THE CAPABILITY STAY?</figcaption>{conditions.map(c=>{
    const worlds=index.worlds.filter(w=>w.arm===c.id);
    return <div key={c.id}><h3>{c.label}</h3><div className="cell80-barrier-outcome-marks" role="img" aria-label={`${worlds.filter(w=>w.origins).length} of ten worlds had new capable programs; ${worlds.filter(w=>w.retained).length} retained the capability.`}>{worlds.map(w=><span key={w.key} data-result={w.retained?"retained":w.origins?"appeared":"absent"} aria-hidden="true">{w.retained?"●":w.origins?"○":"–"}</span>)}</div><p><strong>{worlds.filter(w=>w.retained).length}/10</strong> retained</p></div>;
  })}<p className="cell80-caption">One mark per world, in seed order. ● Appeared and stayed common · ○ Appeared, not retained · – Never appeared. With food-intake changes disabled, eight worlds had to retain the capability. Only one did.</p></figure>;
}
