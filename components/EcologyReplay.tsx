"use client";

import { useEffect, useId, useRef, useState, type RefObject } from "react";
import { ecologyActionLabel } from "@/lib/ecology-evidence";
import { AgentActionMap } from "./AgentActionMap";
import recorded from "@/public/data/ecology/replays.json";

type World = { board: { id: number; payload: string }[]; resources: number[]; known: number[][]; settled: boolean };
type Decision = { case: string; input: string; requestSha256: string; action: string; executed: boolean; ownActions: { action: string; executed: boolean }[]; external: boolean; before: World; after: World };
type Event = { episode: number; round: number; actor: number; action: string; executed: boolean; before: World; after: World };
const decisions = recorded.decisions as Record<string, Record<string, Decision[]>>;
const worlds = recorded.worlds as Record<string, { frames: Event[] }>;

function usePlayback(last: number, container: RefObject<HTMLDivElement | null>) {
 const [frame, setFrame] = useState(0), [playing, setPlaying] = useState(false);
 useEffect(() => {
  if (!playing || frame >= last) return;
  const timer = setTimeout(() => { setFrame(frame + 1); if (frame + 1 === last) setPlaying(false); }, 1400);
  return () => clearTimeout(timer);
 }, [playing, frame, last]);
 useEffect(() => {
  const pauseHidden = () => { if (document.hidden) setPlaying(false); };
  const observer = new IntersectionObserver(entries => { if (!entries[0].isIntersecting) setPlaying(false); });
  if (container.current) observer.observe(container.current);
  document.addEventListener("visibilitychange", pauseHidden);
  return () => { observer.disconnect(); document.removeEventListener("visibilitychange", pauseHidden); };
 }, [container]);
 const seek = (next: number) => { setPlaying(false); setFrame(Math.max(0, Math.min(last, next))); };
 const toggle = () => { if (frame === last) setFrame(0); setPlaying(!playing); };
 return { frame, playing, seek, toggle, last };
}
function Transport({ playback, label }: { playback: ReturnType<typeof usePlayback>; label: string }) {
 const id = useId();
 return <div className="eco-transport"><div><button type="button" onClick={playback.toggle}>{playback.playing ? "Pause" : playback.frame === playback.last ? "Replay" : "Play"}</button><button type="button" onClick={() => playback.seek(playback.frame - 1)} disabled={playback.frame === 0} aria-label="Previous recorded frame">←</button><button type="button" onClick={() => playback.seek(playback.frame + 1)} disabled={playback.frame === playback.last} aria-label="Next recorded frame">Step →</button><button type="button" onClick={() => playback.seek(0)}>Reset</button></div><label htmlFor={id}>{label}<input id={id} type="range" min={0} max={playback.last} value={playback.frame} onChange={event => playback.seek(Number(event.target.value))} aria-valuetext={label}/></label></div>;
}
function Board({ state }: { state: World }) {
 return <div className="eco-live-board"><span className="record-voice">CURRENT BOARD</span>{state.board.map(message => <div key={message.id} data-useful={message.payload !== "seed"}><span>m{message.id}</span><strong>{message.payload === "seed" ? "Starter message" : "Partner’s hint"}</strong></div>)}</div>;
}
function Actor({ label, resources, active, hint }: { label: string; resources: number; active: boolean; hint: boolean }) {
 return <div className="eco-world-actor" data-active={active}><span className="record-voice">{label}</span><div className="eco-agent-disc" aria-hidden="true">●</div><strong>{resources}<small> resources</small></strong><span className="eco-agent-hint">{hint ? "Goal hint known" : "Goal hint not known"}</span></div>;
}
export function EcologyWorldReplay() {
 const [experienced, setExperienced] = useState(false);
 const container = useRef<HTMLDivElement>(null);
 const playback = usePlayback(18, container);
 const prefix = experienced ? "exposed" : "discovery";
 return <div className="eco-replay" ref={container}>
  <p className="record-voice eco-replay-label">A1B5 / REPLAY TWO RECORDED WORLDS</p>
  <div className="eco-controls" role="group" aria-label="History supplied before the session"><button aria-pressed={!experienced} onClick={() => { playback.seek(playback.frame); setExperienced(false); }}>No past example</button><button aria-pressed={experienced} onClick={() => { playback.seek(playback.frame); setExperienced(true); }}>Show a past example</button></div>
  <div className="eco-world-pair">{["inert", "useful"].map(arm => {
   const event = worlds[`${prefix}_${arm}`].frames[Math.max(0, playback.frame - 1)];
   const state = playback.frame ? event.after : event.before;
   return <section className="eco-world-lane" key={arm} aria-label={arm === "inert" ? "Zero return world" : "Six resource return world"}><header><span className="record-voice">BONUS AFTER PARTNER USE</span><h3>{arm === "inert" ? "No bonus" : "Bonus of six"}</h3><p>Episode {event.episode} / 3 · Round {event.round} / 3</p></header>
    <div className="eco-world-stage"><Actor label="QWEN / MODEL" resources={state.resources[0]} active={playback.frame > 0 && event.actor === 0} hint={state.known[0].includes(0)}/><Board state={state}/><Actor label="SCRIPTED PARTNER" resources={state.resources[1]} active={playback.frame > 0 && event.actor === 1} hint={state.known[1].includes(1)}/></div>
    <div className="eco-event" data-action={playback.frame ? event.action.split(" ")[0] : ""}><span className="record-voice">{playback.frame ? event.actor ? "SCRIPTED RECIPIENT" : "MODEL ACTION" : "INITIAL STATE"}</span><strong>{playback.frame ? ecologyActionLabel(event.action) : "Ready"}</strong><small>{playback.frame ? event.action.startsWith("READ") ? "The recipient requests a board message." : event.action.startsWith("POST") ? "The model leaves a hint on the board." : "Work adds one resource to its actor." : "Play to follow the board and resources."}</small></div>
   </section>;
  })}</div>
  <ResourceHistory prefix={prefix} frame={playback.frame}/><Transport playback={playback} label={`Recorded event ${playback.frame} / 18`}/>
  <p className="eco-caption">Two actors, three rounds per episode, three episodes. Resources and the board reset between episodes; the event history remains available. Every displayed state is recorded. The recipient is scripted. Layout shows roles, not spatial positions. <a href="/data/ecology/replays.json">Download states + source hashes ↗</a></p>
 </div>;
}

function InputRecords({ row, after }: { row: Decision; after:boolean }) {
 const peer = row.input.startsWith("PEER") ? JSON.parse(row.input.split("CURRENT")[0].slice(4).trim()) as { action?:string; original_seed?:{action:string}; previous_agent?:{action:string} } : null;
 const inputs = peer ? [
  {label:"STARTING EXAMPLE",text:peer.original_seed?ecologyActionLabel(peer.original_seed.action):"Not kept separately",present:Boolean(peer.original_seed)},
  {label:"PREVIOUS ACTION",text:ecologyActionLabel(peer.previous_agent?.action||peer.action||""),present:true},
 ] : [
  {label:"EXTERNAL EXAMPLE",text:row.external?"Another agent posted":"Absent",present:row.external},
  {label:"OWN ACTION HISTORY",text:row.ownActions.length?row.ownActions.map(action=>action.action.split(" ")[0]).join(" · "):"Cleared / empty",present:row.ownActions.length>0},
 ];
 return <AgentActionMap inputs={inputs} actor="QWEN" outcome={after?ecologyActionLabel(row.action):"Awaiting the action."} caption={after?`Recorded response: ${row.action}. ${row.executed?"Executed in the world.":"Not executed."}`:"The actual notes supplied before this decision. The diagram does not depict internal reasoning."}/>;
}
function ResourceHistory({prefix,frame}:{prefix:string;frame:number}) {
 const histories=["inert","useful"].map(arm=>worlds[`${prefix}_${arm}`].frames);
 const max=Math.max(1,...histories.flatMap(events=>events.flatMap(event=>[event.before.resources[0],event.after.resources[0]])));
 return <figure className="eco-resource-history"><figcaption className="record-voice">QWEN’S RESOURCES / RECORDED STATES / SHARED SCALE</figcaption><svg viewBox="0 0 660 160" role="img" aria-label={`Resource histories for zero and six bonus worlds, maximum ${max}. Current event ${frame} of 18. Resources reset between episodes.`}>
  {[0,1,2].map(i=><g key={i}><path className="eco-history-rule" d={`M${30+i*200} 10 V128`}/><text x={130+i*200} y="151" textAnchor="middle">EPISODE {i+1}</text></g>)}
  <text x="8" y="20">{max}</text><text x="8" y="128">0</text>
  {histories.map((events,j)=>{let path="";events.forEach((event,i)=>{const x=30+i/18*600,y=128-event.after.resources[0]/max*110,prior=128-event.before.resources[0]/max*110;path+=`${i===0||event.episode!==events[i-1].episode?`M${x} ${prior}`:""} H${x+600/18} V${y} `;});return <path key={j} className="eco-history-line" data-series={j} d={path}/>;})}
  <path className="eco-history-cursor" d={`M${30+frame/18*600} 5 V130`}/>
 </svg><p className="eco-caption"><span className="eco-history-key">Amber: no bonus · blue: bonus of six.</span> Steps are recorded changes; gaps mark episode resets. The white line follows playback.</p></figure>;
}

export function EcologyDecisionReplay({ kind }: { kind: "memory" | "transmission" | "withdrawal" }) {
 const [variant, setVariant] = useState(false);
 const steps = kind === "memory" ? 3 : 6, experiment = kind === "memory" ? "12" : kind === "transmission" ? "9" : "11";
 const container = useRef<HTMLDivElement>(null);
 const playback = usePlayback(steps * 2 - 1, container), step = Math.floor(playback.frame / 2), after = playback.frame % 2 === 1;
 const arms = kind === "memory" ? [{ id: `E1_M${variant ? 1 : 0}`, label: "Example present" }, { id: `E0_M${variant ? 1 : 0}`, label: "Example absent" }] : kind === "transmission" ? [{ id: `replace_${variant ? "WORK" : "POST"}`, label: "Pass only the latest" }, { id: `retain_${variant ? "WORK" : "POST"}`, label: "Keep the original too" }] : [{ id: "A_once", label: "Example shown once" }, { id: "B_repeated", label: "Example shown three times" }];
 const phase = `Decision ${step + 1} / ${steps} · ${after ? "action recorded" : "records supplied"}`;
 return <div className="eco-replay" ref={container}>
  <p className="record-voice eco-replay-label">A1B{experiment} / REPLAY THE RECORDED COMPARISON</p>
  {kind !== "withdrawal" && <div className="eco-controls" role="group" aria-label={kind === "memory" ? "Own-action memory condition" : "Starting scripted example"}>{[false,true].map(option => <button key={String(option)} aria-pressed={variant === option} onClick={() => { playback.seek(playback.frame); setVariant(option); }}>{kind === "memory" ? option ? "Retain own history" : "Clear own history each call" : option ? "Start with a work example" : "Start with a sharing example"}</button>)}</div>}
  <div className="eco-decision-pair">{arms.map(arm => {
   const rows = decisions[experiment][arm.id], row = rows[step];
   return <section className="eco-decision-lane" key={arm.id} aria-label={arm.label}><header><h3>{arm.label}</h3><span className="record-voice">FRESH WORLD / DECISION {step + 1}</span></header><InputRecords row={row} after={after}/>
    <div className="eco-recorded-tape" aria-label="Jump to a recorded decision">{rows.map((item, i) => <button key={item.case} onClick={() => playback.seek(i * 2 + 1)} aria-current={step === i ? "step" : undefined} aria-label={`Show decision ${i+1}: ${item.action}`} data-action={i < step || i === step && after ? item.action.split(" ")[0] : ""}><small>{i + 1}</small><span>{i < step || i === step && after ? item.action.split(" ")[0] : "·"}</span></button>)}</div>
    <details className="eco-request"><summary>Inspect this recorded input</summary><pre>{row.input}</pre><p className="eco-caption">Recorded response: <code>{row.action}</code></p><p className="eco-caption">{row.case} · Exact supplied user record. Shared instructions also remain present. Full request SHA-256: <code>{row.requestSha256}</code></p></details>
   </section>;
  })}</div>
  <Transport playback={playback} label={phase}/><p className="eco-playback-status" role="status" aria-live={playback.playing ? "off" : "polite"}>{kind === "withdrawal" && step >= 3 ? "The supplied examples are now absent in both branches. Own-action history remains." : kind === "memory" && !variant ? "Every new call starts with empty own-action history—even after a POST." : kind === "transmission" ? "The harness passes the action records. The worlds and model contexts reset." : "Inspect what is supplied before each recorded action."}</p>
  <p className="eco-caption">Each decision has an input frame and an action frame. Playback reveals saved outcomes; it does not run a model or simulate its reasoning. {kind === "memory" ? "Only the first decision is the controlled factorial comparison; later histories depend on earlier actions." : "These are dependent recorded sequences, not independent-agent replications."} <a href="/data/ecology/replays.json">Recorded inputs + source hashes ↗</a></p>
 </div>;
}
