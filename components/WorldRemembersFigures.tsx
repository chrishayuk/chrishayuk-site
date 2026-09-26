'use client';

import { useState } from 'react';
import { FigureMotion } from './FigureMotion';
import raw from '@/public/data/ecology/world-remembers/figures.json';

type Table={stage1:Record<string,string>;stage2:Record<string,string>};
type Board={id:string;text:string;expires_after_generation:number|null}|null;
type Frame={map:number;arm:string;generation:number;before:{board:Board};after:{board:Board};reward:number;renewals:number;actions:{id:string;agent:number;reply:string;reward:number;renewal:boolean;correct:boolean|null;created:string|null}[]};
type Panel={frames:Frame[];starts:{map_index:number;generation:number;arm:string;state:{board:Board}}[]};
const data=raw as unknown as {tables:Table[];producer:string;handoff:{map:number;signal:string;arm:string;reply:string;correct:boolean;reward:number;target:string}[];writing:Panel;corruption:Panel;defender:Panel};
const hub=(s:string)=>`Hub ${String.fromCharCode(65+Number(s.slice(1)))}`;
const door=(s:string)=>`Door ${Number(s.slice(1))+1}`;
const parsed=(b:Board):Table|null=>b?JSON.parse(b.text):null;

function Maps({value,onChange}:{value:number;onChange:(n:number)=>void}){
 return <div className="wr-controls"><span>Recorded map</span><div role="group" aria-label="Recorded map">{[0,1,2,3].map(m=><button key={m} type="button" aria-pressed={m===value} onClick={()=>onChange(m)}>Map {m}</button>)}</div></div>;
}
function TableView({table,truth,compact=false}:{table:Table|null;truth:Table;compact?:boolean}){
 if(!table)return <div className="wr-empty">No inherited note.<small>The parcel and physical device are still here.</small></div>;
 return <div className={`wr-table ${compact?'wr-table-compact':''}`}><table><caption>Routes in the shared note</caption><thead><tr><th scope="col">Parcel</th><th scope="col">Via</th><th scope="col">To</th></tr></thead><tbody>{Object.entries(table.stage1).map(([s,r])=>{const dest=table.stage2[r],correct=dest===truth.stage2[truth.stage1[s]];return <tr key={s} data-wrong={!correct}><th scope="row">{s}</th><td>{hub(r)}</td><td>{door(dest)}{!correct&&<span className="wr-mark" title="Differs from the fixed device"> ✕</span>}</td></tr>;})}</tbody></table></div>;
}
function Totals({items}:{items:[string,string,string][]}){return <dl className="wr-totals">{items.map(([number,label,detail])=><div key={label}><dt>{label}</dt><dd>{number}</dd><small>{detail}</small></div>)}</dl>;}

export function HandoffFigure(){
 const [map,setMap]=useState(2),[signal,setSignal]=useState('s0');
 const truth=data.tables[map];
 const arms=['retained','removed','rotated'];
 const tableFor=(arm:string)=>arm==='removed'?null:arm==='retained'?truth:{...truth,stage2:Object.fromEntries(Object.entries(truth.stage2).map(([k,v])=>[k,`d${(Number(v.slice(1))+1)%4}`]))};
 return <FigureMotion><figure className="wr-figure wr-handoff" aria-label="Recorded retained, removed and altered inheritance comparison">
  <figcaption className="wr-label">I4 / One recorded decision under each condition</figcaption>
  <Maps value={map} onChange={setMap}/><div className="wr-controls"><label htmlFor="wr-signal">Parcel</label><select id="wr-signal" value={signal} onChange={e=>setSignal(e.target.value)}>{['s0','s1','s2','s3'].map(s=><option key={s} value={s}>{s}</option>)}</select><span className="wr-device">Fixed device: {door(truth.stage2[truth.stage1[signal]])}</span></div>
  <div className="wr-three wr-routes" aria-live="polite">{arms.map(arm=>{
   const row=data.handoff.find(r=>r.map===map&&r.signal===signal&&r.arm===arm)!;
   return <section className="wr-route" key={arm}>
    <h3>{arm==='retained'?'Note retained':arm==='removed'?'Note removed':'Note altered'}</h3>
    <div className="wr-route-line" data-figure-trace aria-hidden="true"><span>{signal}</span><i/><span>→</span></div>
    <p className="wr-route-destination" data-figure-reveal>{door(row.reply.split(' ')[1])}</p>
    <p className="wr-route-result">{row.correct?'Correct destination':'Wrong destination'} · +{row.reward} resources</p>
   </section>;
  })}</div>
  <details className="wr-details"><summary>Inspect the inherited tables & recorded replies</summary><div className="wr-three">{arms.map(arm=>{
   const row=data.handoff.find(r=>r.map===map&&r.signal===signal&&r.arm===arm)!;
   return <section className="wr-case" key={arm}><h3>{arm==='rotated'?'Altered':arm==='retained'?'Retained':'Removed'}</h3><TableView table={tableFor(arm)} truth={truth}/><code>{row.reply}</code></section>;
  })}</div><p className="wr-caption">Composed routes from the two tables. ✕ marks a mismatch for the reader; it was not shown to Qwen.</p></details>
  <p className="wr-label wr-total-label">Across all sixteen recorded parcels</p>
  <Totals items={[["11 / 16","Retained","correct routes"],["4 / 16","Removed","correct routes"],["2 / 16","Altered","correct routes"]]}/>
 </figure></FigureMotion>;
}

export function LineageFigure({kind}:{kind:'writing'|'corruption'}){
 const [map,setMap]=useState(0),[generation,setGeneration]=useState(kind==='writing'?1:3);
 const generations=kind==='writing'?[1,2,3,4,5,6]:[3,4,5,6];
 const panel=data[kind],arms=kind==='writing'?['write_seeded','write_none']:['intact','corrupt'];
 const active=panel.frames.find(f=>f.map===map&&f.arm===arms[0]&&f.generation===generation)!;
 return <FigureMotion><figure className="wr-figure"><figcaption className="wr-label">{kind==='writing'?'I6 / WRITTEN DESCENDANTS':'I7 / A CONTROLLED TWO-ENTRY SWAP'}</figcaption><Maps value={map} onChange={setMap}/>
  <div className="wr-timeline" role="group" aria-label="Choose recorded generation">{generations.map(g=>{const f=panel.frames.find(f=>f.map===map&&f.arm===arms[0]&&f.generation===g)!;return <button type="button" key={g} aria-pressed={g===generation} onClick={()=>setGeneration(g)}><span>GEN {g}</span><b>{f.renewals}</b><small>renewals</small></button>;})}</div>
  <p className="wr-caption">Choose a generation to compare its final records. Each has four action opportunities; ✕ marks a wrong route for the reader only.</p>
  <div className="wr-two" aria-live="polite">{arms.map(arm=>{const f=panel.frames.find(f=>f.map===map&&f.arm===arm&&f.generation===generation)!;return <section className="wr-case" key={arm}><p className="wr-label">{({write_seeded:'INHERITANCE / WRITE TO PRESERVE',write_none:'NO INHERITANCE',intact:'INTACT DESCENDANTS',corrupt:'CORRUPTED DESCENDANTS'} as Record<string,string>)[arm]}</p><div data-figure-reveal><TableView table={parsed(f.after.board)} truth={data.tables[map]}/></div><p className="wr-endpoint"><strong>{f.reward}</strong> resources this generation · {f.renewals} renewals</p><details className="wr-details"><summary>Inspect the four actions</summary><ol className="wr-actions">{f.actions.map(a=><li key={a.id}><span>Qwen {a.agent+1}</span><code>{a.renewal?`REFRESH → ${a.created}`:a.reply}</code><span>+{a.reward}</span></li>)}</ol></details></section>;})}</div>
  <details className="wr-details"><summary>Inspect a complete written response</summary><p>Map {map}, generation {generation}. Exact recorded text; no missing content is supplied by the viewer.</p><pre>{active.actions.find(a=>a.renewal)?.reply??'No renewal in this generation.'}</pre></details>
  {kind==='writing'?<Totals items={[["43 / 43","Faithful renewals","all eight entries preserved"],["84 vs 27","Later resources","generations 2–6"],["4 / 4","Functional lineages","still alive at generation 6"]]}/>:<Totals items={[["29 / 29","Error retained","corrupted renewals unchanged"],["42 vs 69","Resources","corrupt vs intact · generations 3–6"],["8","Inherited wrong routes","after renewal of the corruption"]]}/>}
 </figure></FigureMotion>;
}

export function DiagnosisFigure(){return <figure className="wr-figure"><figcaption className="wr-label">I9 → I10 / EXACT MAPS · SAME COMPONENT TASKS</figcaption><table className="wr-score-table"><thead><tr><th scope="col">Repair component</th><th scope="col">Qwen</th><th scope="col">Sol</th></tr></thead><tbody>{[['Find damaged entries','0 / 4','3 / 4'],['Supply patch values','1 / 4','4 / 4'],['Protect unchanged entries','0 / 4','3 / 4'],['Assemble eligible repairs','Not eligible','3 / 3']].map(r=><tr key={r[0]}>{r.map((v,i)=>i===0?<th key={i} scope="row">{v}</th>:<td key={i}>{v}</td>)}</tr>)}</tbody></table><p className="wr-caption">Sol’s assembly score is conditional on passing the components. The registered four-map primary failed. Qwen’s assembly was never run. These are exact-case counts, not population accuracy estimates.</p></figure>;}

export function DefenderFigure(){
 const [map,setMap]=useState(0),[arm,setArm]=useState('repair_authorised'),[generation,setGeneration]=useState(6);
 const start=data.defender.starts.find(s=>s.map_index===map&&s.generation===generation&&s.arm===arm)!;
 const labels:Record<string,string>={no_defender:'No defender',read_only:'Read only',repair_authorised:'Repair authorised'};
 const rows=data.defender.frames.filter(f=>f.map===map&&f.arm===arm);
 return <FigureMotion><figure className="wr-figure"><figcaption className="wr-label">I11 / DEFENDER REMOVED BEFORE GENERATIONS 4–6</figcaption><div className="wr-intervention"><span>Sol proposes</span><b aria-hidden="true">→</b><span>Public-evidence validation</span><b aria-hidden="true">→</b><strong>3 repairs applied · 1 blocked</strong><b aria-hidden="true">→</b><span>Sol leaves</span></div>
  <div className="wr-score-scroll" role="region" aria-label="Repair outcomes by map" tabIndex={0}><table className="wr-score-table" data-figure-reveal><caption>Registered endpoint: correct new descendants at the start of generation 6</caption><thead><tr><th scope="col">Branch</th>{[0,1,2,3].map(m=><th scope="col" key={m}>Map {m}</th>)}<th scope="col">Total</th></tr></thead><tbody>{Object.entries(labels).map(([a,label])=><tr key={a}><th scope="row">{label}</th>{[0,1,2,3].map(m=><td key={m} data-correct={a==='repair_authorised'&&m!==2}>{a==='repair_authorised'&&m!==2?'Correct':'Damaged'}</td>)}<td>{a==='repair_authorised'?'3 / 4':'0 / 4'}</td></tr>)}</tbody></table></div>
  <details className="wr-details"><summary>Follow a repaired or blocked lineage</summary><Maps value={map} onChange={setMap}/><div className="wr-controls"><label htmlFor="wr-branch">Branch</label><select id="wr-branch" value={arm} onChange={e=>setArm(e.target.value)}>{Object.entries(labels).map(([k,v])=><option key={k} value={k}>{v}</option>)}</select><label htmlFor="wr-generation">Record at start of</label><select id="wr-generation" value={generation} onChange={e=>setGeneration(Number(e.target.value))}>{[4,5,6].map(g=><option key={g} value={g}>Generation {g}</option>)}</select></div>
  <div className="wr-two" aria-live="polite"><section className="wr-case"><p className="wr-label">{start.state.board?.id} / START OF GENERATION {generation}</p><TableView table={parsed(start.state.board)} truth={data.tables[map]}/></section><section className="wr-case"><p className="wr-label">AFTER SOL LEFT / QWEN ONLY</p><h3>{map===2?'The proposal was blocked.':arm==='repair_authorised'?'The corrected record was inherited.':'The damaged record remained.'}</h3><p>{map===2?'Validation blocked a false-positive diagnosis before assembly. This map received no repair.':arm==='repair_authorised'?'No extra lifetime was granted. Qwen wrote the descendants.':'Read-only inspection left the shared state unchanged. Both controls produced identical requests and actions.'}</p><ol className="wr-actions">{rows.map(f=><li key={f.generation}><span>Gen {f.generation}</span><span>{f.renewals} renewals</span><b>+{f.reward}</b></li>)}</ol><p className="wr-caption">This map earned {rows.reduce((s,f)=>s+f.reward,0)} resources across generations 4–6.</p></section></div>
  </details><Totals items={[["15","Correct renewals","Qwen preserved repaired lineages"],["4","Later corrected routes","affected signals · repaired descendants"],["24 vs 21","Later resources","repair vs either control · generations 5–6"]]}/>
 </figure></FigureMotion>;
}
