"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { useMotion } from "./Motion";
import { chartInk } from "@/lib/chart-ink";
import { Cell80Meaning as Meaning } from "./Cell80Meaning";
import posters from "@/lib/data/cell80-replay-posters.json";
import { decodeReplay, foodAt, frameCounts, replayIndex, type ReplayFrame, type ReplayHistory, type WorldReplay } from "@/lib/cell80-replay";

const palette = { paper: "#efeadc", amber: "#e3b56b", blue: "#83c5d2", green: "#607d51", muted: "#8c9185", ground: "#10150f" };
const format = (n: number) => n.toLocaleString("en-GB");

function World({ frame, data, lineage, selected, onSelect, label }: { frame: ReplayFrame; data: WorldReplay; lineage: boolean; selected: number | null; onSelect: (tile: number) => void; label: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const el = canvas.current; if (!el) return;
    const ctx = el.getContext("2d"); if (!ctx) return;
    const size = 768, step = size / data.width;
    ctx.fillStyle = palette.ground; ctx.fillRect(0, 0, size, size);
    for (let tile = 0; tile < data.width * data.height; tile++) {
      const x = tile % data.width * step, y = Math.floor(tile / data.width) * step;
      ctx.fillStyle = foodAt(frame, tile) ? "#34492c" : "#171e15";
      ctx.fillRect(x + 1, y + 1, step - 2, step - 2);
    }
    // Organisms can share a tile. Group them; never jitter coordinates into invented paths.
    const tiles = new Map<number, typeof frame.organisms>();
    for (const o of frame.organisms) { const occupants = tiles.get(o[1]) ?? []; occupants.push(o); tiles.set(o[1], occupants); }
    for (const [tile, occupants] of tiles) {
      const x = (tile % data.width + .5) * step, y = (Math.floor(tile / data.width) + .5) * step;
      const radius = Math.min(step * .40, step * (.18 + Math.log2(occupants.length + 1) * .045));
      const predators = occupants.some(o => o[3] === 1);
      const grazers = occupants.some(o => o[3] === 0);
      if (grazers) {
        ctx.fillStyle = data.kind === "ecology" ? palette.paper : occupants.some(o => o[4] === 33) ? palette.amber : occupants.some(o => o[4] === 37) ? palette.blue : palette.muted;
        ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2); ctx.fill();
      }
      if (predators) {
        const r = radius + 2; ctx.strokeStyle = palette.amber; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(x, y-r); ctx.lineTo(x+r, y); ctx.lineTo(x, y+r); ctx.lineTo(x-r, y); ctx.closePath(); ctx.stroke();
      }
      if (lineage && occupants.some(o => o[6] === 1)) { ctx.strokeStyle = palette.paper; ctx.lineWidth = 1.5; ctx.strokeRect(x-step*.44, y-step*.44, step*.88, step*.88); }
      if (occupants.some(o => o[0] === 2231) && data.kind === "lineage") { ctx.strokeStyle = palette.paper; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(x, y, step*.9, 0, 2*Math.PI); ctx.stroke(); }
    }
    if (selected !== null) { ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.strokeRect(selected % data.width * step + 1, Math.floor(selected / data.width) * step + 1, step-2, step-2); }
  }, [frame, data, lineage, selected]);
  return <canvas ref={canvas} width={768} height={768} tabIndex={0} role="img" aria-label={`${label}, tick ${frame.tick}. ${frame.organisms.length} organisms. Click a tile to inspect it, or use arrow keys.`}
    onClick={e => { const r = e.currentTarget.getBoundingClientRect(); const x = Math.min(data.width-1, Math.max(0, Math.floor((e.clientX-r.left)/r.width*data.width))); const y = Math.min(data.height-1, Math.max(0, Math.floor((e.clientY-r.top)/r.height*data.height))); onSelect(y*data.width+x); }}
    onKeyDown={e => { const delta = {ArrowLeft:-1,ArrowRight:1,ArrowUp:-data.width,ArrowDown:data.width}[e.key]; if (delta !== undefined) { e.preventDefault(); onSelect(((selected ?? 0)+delta+data.width*data.height)%(data.width*data.height)); } }}>
    Recorded grid: {data.width} by {data.height}, {frame.organisms.length} living organisms at tick {frame.tick}. Use the recorded-state download for the complete data.
  </canvas>;
}

function PopulationTrace({ histories, tick, ecology }: { histories: ReplayHistory[]; tick: number; ecology: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const series = useMemo(() => {
    const frames = histories[0].frames;
    return ecology ? [frames.map(f=>({tick:f.tick,value:frameCounts(f).grazers})),frames.map(f=>({tick:f.tick,value:frameCounts(f).predators}))] : histories.map(h=>h.frames.map(f=>({tick:f.tick,value:f.organisms.length})));
  }, [histories, ecology]);
  useEffect(() => {
    const el = canvas.current; if (!el) return;
    const ctx = el.getContext("2d"); if (!ctx) return;
    const ink = chartInk(el);
    const max = Math.max(1,...series.flatMap(s=>s.map(p=>p.value))); const end = Math.max(1,series[0].at(-1)!.tick);
    ctx.clearRect(0,0,1200,140);
    series.forEach((points,i)=>{ctx.strokeStyle=i===0?ink.accent:ink.secondary;ctx.lineWidth=2;ctx.beginPath();points.forEach((p,j)=>{const x=p.tick/end*1200,y=130-p.value/max*120;j===0?ctx.moveTo(x,y):ctx.lineTo(x,y);});ctx.stroke();});
    ctx.strokeStyle=ink.ink;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(tick/end*1200,0);ctx.lineTo(tick/end*1200,140);ctx.stroke();
  },[series,tick]);
  return <div className="cell80-population-trace"><div className="record-voice"><span>POPULATION / SHARED SCALE</span><span><b style={{color:"var(--notebook-rust, #e3b56b)",fontWeight:400}}>{ecology ? "GRAZERS" : "OBSERVED"}</b> · <b style={{color:"var(--notebook-blue, #83c5d2)",fontWeight:400}}>{ecology ? "PREDATORS" : "UNDONE"}</b></span></div><canvas ref={canvas} width={1200} height={140} role="img" aria-label={ecology ? "Recorded grazer and predator population histories. Exact current counts appear above." : "Recorded population histories in both worlds. Exact current counts appear above."}/></div>;
}

export function Cell80WorldReplay({ kind }: { kind: "lineage" | "ecology" }) {
  const initial = posters[kind] as unknown as WorldReplay;
  const [data,setData] = useState<WorldReplay>(initial);
  const [loaded,setLoaded] = useState(false);
  const [loadState,setLoadState] = useState<"idle"|"loading"|"error"|"ready">("idle");
  const [request,setRequest] = useState(0);
  const [index,setIndex] = useState(0);
  const [playing,setPlaying] = useState(false);
  const [speed,setSpeed] = useState(1);
  const [lineage,setLineage] = useState(true);
  const [selected,setSelected] = useState<number|null>(null);
  const root=useRef<HTMLElement>(null), visible=useRef(true);
  const id=useId();
  const {register,request:playReplay,setPaused}=useMotion();
  useEffect(()=>{
    if(!root.current)return;
    return register({id,element:root.current,manualOnly:true,start:()=>setPlaying(true),stop:()=>setPlaying(false)});
  },[id,register]);
  const frames=data.histories[0].frames;
  const frame=frames[index];
  const tick=frame.tick;
  const last=frames.at(-1)!.tick;
  const select = useCallback((tile:number)=>{setPlaying(false);setSelected(tile);},[]);
  useEffect(()=>{
    const observer=new IntersectionObserver(entries=>{visible.current=entries[0].isIntersecting;if(!visible.current)setPlaying(false);});
    if(root.current)observer.observe(root.current);
    const hidden=()=>{if(document.hidden)setPlaying(false);};document.addEventListener("visibilitychange",hidden);
    return()=>{observer.disconnect();document.removeEventListener("visibilitychange",hidden);};
  },[]);
  useEffect(()=>{
    if(!request)return;
    const controller=new AbortController();
    async function load(){
      setLoadState("loading");
      try{
        const response=await fetch(`/data/cell80/${kind}-replay.json.gz`,{signal:controller.signal});if(!response.ok)throw new Error("Replay unavailable");
        const replay=await decodeReplay(await response.arrayBuffer());if(controller.signal.aborted)return;
        if(replay.kind!==kind)throw new Error("Wrong replay");
        setData(replay);setIndex(replayIndex(replay.histories[0].frames,kind==="lineage"?980:0));setLoaded(true);setLoadState("ready");
        if(visible.current&&!document.hidden)playReplay(id);
      }catch{if(!controller.signal.aborted)setLoadState("error");}
    }
    void load();return()=>controller.abort();
  },[request,kind,id,playReplay]);
  useEffect(()=>{
    if(!playing||!loaded)return;
    let raf=0;let previous=performance.now();let clock=frames[index].tick;
    const advance=(now:number)=>{
      clock+=Math.min(now-previous,100)*(kind==="lineage"?24:200)*speed/1000;previous=now;
      setIndex(replayIndex(frames,clock));
      if(clock>=last){setPlaying(false);return;}raf=requestAnimationFrame(advance);
    };
    raf=requestAnimationFrame(advance);return()=>cancelAnimationFrame(raf);
    // index is intentionally the starting frame: advancing it must not restart the clock.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[playing,loaded,frames,last,speed,kind]);
  function seek(t:number){setPlaying(false);setIndex(replayIndex(frames,t));}
  const inspection=data.histories.map(h=>h.frames[index].organisms.filter(o=>o[1]===selected));
  return <figure ref={root} className="cell80-spatial-replay" aria-label={kind==="lineage"?"Synchronized replay of a mutation and its counterfactual":"Recorded predator and grazer world"}>
    <div className="cell80-instrument-heading record-voice"><span>{kind==="lineage"?"EX-4 / SEED 1 / 32 × 32":"EX-9 / SEED 42 / 48 × 48 / 2% SWAPS"}</span><span>RECORDED WORLD STATES</span></div>
    <div className="cell80-replay-clock"><span className="record-voice"><Meaning term="tick">TICK</Meaning></span><strong>{format(tick)}</strong><p>{kind==="lineage"?(tick<994?"Before the birth. One shared history.":tick===994?"Organism 2231 is born. One program is undone.":tick<1080?"The same world. Different inherited programs.":"Follow what changes after the intervention."):"Eat. Move. Reproduce. Survive."}</p></div>
    <div className="cell80-spatial-worlds" data-paired={kind==="lineage"}>{data.histories.map((history)=>{
      const current=history.frames[index];const counts=frameCounts(current);
      return <section key={history.label} className="cell80-spatial-world"><h3 className="record-voice">{history.label}</h3><World frame={current} data={data} lineage={lineage} selected={selected} onSelect={select} label={history.label}/>
        <div className="cell80-world-counts"><p><strong>{format(counts.population)}</strong><span>alive</span></p>{kind==="lineage"?<><p><strong>{counts.population?(counts.program33/counts.population*100).toFixed(1):"0"}%</strong><span>program 33</span></p><p><strong>{format(counts.descendants)}</strong><span>2231’s family</span></p></>:<><p><strong>{format(counts.grazers)}</strong><span>grazers</span></p><p><strong>{format(counts.predators)}</strong><span>predators</span></p></>}</div>
        <p className="cell80-world-events">{format(current.births)} births · {format(current.deaths)} deaths{kind==="ecology"?` · ${format(current.kills)} predation kills`:""} / cumulative</p>
      </section>;
    })}</div>
    <div className="cell80-replay-legend">{kind==="lineage"?<><span><i className="c80-dot c80-amber"/>Program 33</span><span><i className="c80-dot c80-blue"/>Program 37</span><span><i className="c80-dot"/>Other programs</span><label><input type="checkbox" checked={lineage} onChange={e=>setLineage(e.target.checked)}/>Outline 2231’s family</label></>:<><span><i className="c80-dot c80-paper"/>Grazers</span><span><i className="c80-diamond"/>Predators</span></>}<span><i className="c80-food"/>Food</span></div>
    {loaded&&<PopulationTrace histories={data.histories} tick={tick} ecology={kind==="ecology"}/>}
    {!loaded&&<p className="cell80-caption">The preview is a recorded frame. Play loads {kind==="lineage"?"1.6":"9.3"} MB of history.</p>}
    <div className="cell80-playback">
      <button type="button" className="cell80-play" disabled={loadState==="loading"} onClick={()=>{if(!loaded){setRequest(r=>r+1);return;}if(index===frames.length-1)setIndex(0);if(playing)setPaused(true);else playReplay(id);}}>{loadState==="loading"?"Loading history…":playing?"Ⅱ Pause":loaded?"▶ Play":"▶ Load & play"}</button>
      <div className="cell80-scrubber"><label htmlFor={id}>History <span>{format(tick)} / {kind==="lineage"?"1,999":"9,999"}</span></label><input id={id} type="range" min={0} max={Math.max(last,1)} value={tick} disabled={!loaded} aria-valuetext={`Tick ${tick}`} onChange={e=>seek(Number(e.target.value))}/></div>
      <label className="cell80-speed">Speed<select value={speed} onChange={e=>setSpeed(Number(e.target.value))}><option value={.25}>¼×</option><option value={1}>1×</option><option value={4}>4×</option></select></label>
    </div>
    {loadState==="error"&&<p role="alert" className="cell80-caption">The replay could not load. Try Load & play again, or download the recorded states below.</p>}
    <div className="cell80-replay-jumps"><button type="button" disabled={!loaded} onClick={()=>seek(0)}>From the beginning</button>{kind==="lineage"?<><button type="button" disabled={!loaded} onClick={()=>seek(993)}>Before / 993</button><button type="button" disabled={!loaded} onClick={()=>{seek(994);const origin=data.histories[0].frames[replayIndex(frames,994)].organisms.find(o=>o[0]===2231);if(origin)setSelected(origin[1]);}}>The birth / 994</button><button type="button" disabled={!loaded} onClick={()=>seek(1080)}>The shift / 1,080</button></>:<><button type="button" disabled={!loaded} onClick={()=>seek(2000)}>Tick 2,000</button><button type="button" disabled={!loaded} onClick={()=>seek(9999)}>The endpoint / 9,999</button></>}</div>
    <div className="cell80-tile-inspector" aria-live={playing?"off":"polite"}>{selected===null?<p>Select a square to inspect its organisms. Arrow keys work when a world has focus.</p>:<><p className="record-voice">TILE {selected%data.width}, {Math.floor(selected/data.width)} / TICK {format(tick)}</p><div className="cell80-inspection-pair">{inspection.map((organisms,i)=><div key={i}><strong>{data.histories[i].label}</strong><p>{foodAt(data.histories[i].frames[index],selected)?"40 food":"No food"} · {organisms.length} organisms</p>{organisms.length>0&&<ul>{organisms.slice(0,8).map(o=><li key={o[0]}>#{o[0]} · {o[3]?"predator":"grazer"} · energy {o[2]} · threshold {o[5]} · program {o[4]} ({data.promoters[o[4]]}){o[6]?" · 2231’s family":""}</li>)}</ul>}{organisms.length>8&&<p>{organisms.length-8} more organisms share this tile. All are included in the download.</p>}</div>)}</div></>}</div>
    <figcaption className="cell80-caption"><p>{kind==="lineage"?"Both worlds use the same clock. This replay reproduces the recorded birth and change in the leading program. Frames are sampled every two ticks, and every tick from 990–1,200.":"One recorded world with 2% program replacement, sampled every twenty ticks. Its complete history matches the experiment’s recorded hash. Both species survived; their evolutionary-response tests did not pass."} </p><p>Squares are actual locations. Larger marks mean more organisms share that square. In the paired view, colour shows program 33 first, then 37; select a square to inspect all its programs. Positions are recorded, with no movement filled in between frames.</p><p> <a href={`/data/cell80/${kind}-replay.json.gz`} download>Download recorded states ↓</a> · <a href="/data/cell80/replay-provenance.json">Replay provenance ↗</a></p></figcaption>
  </figure>;
}
