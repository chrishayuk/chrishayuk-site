'use client';
import { useState } from 'react';
import data from '@/public/data/ecology/recovery/evidence.json';

/** Arithmetic explorer over one recorded public row. No model calls or replay claims. */
export function RecoveryDiagnostic(){
 const [candidate,setCandidate]=useState(data.example.damaged[1]);
 const row=data.example.evidence[1];
 const beforeWrap=row.gain*candidate+row.offset;
 const predicted=beforeWrap%17;
 const matches=predicted===row.observed;
 return <figure className="recovery-diagnostic">
  <figcaption className="record-voice">ONE RECORDED CASE / WORLD 10 · BLOCK 9 IN THE LOG</figcaption>
  <div className="recovery-record-cells" aria-label="The damaged record: zero, ten, thirteen, three">{data.example.damaged.map((value,index)=><div key={index} className={index===1?'damaged':''}><span>ENTRY {index+1}</span><strong>{value}</strong>{index===1&&<small>Changed by the experiment</small>}</div>)}</div>
  <p>The record says <strong>10</strong>. The independent diagnostic says the reading must be <strong>9</strong>. Test which candidate code can produce that reading.</p>
  <label className="recovery-candidate" htmlFor="recovery-candidate">Candidate for entry 2 <output htmlFor="recovery-candidate">{candidate}</output></label>
  <input id="recovery-candidate" type="range" min="0" max="16" step="1" value={candidate} onChange={event=>setCandidate(Number(event.target.value))}/>
  <div className="recovery-arithmetic"><div><span>1 · MULTIPLY BY 8</span><strong>{candidate} × 8 = {candidate*row.gain}</strong></div><div><span>2 · ADD 9</span><strong>{candidate*row.gain} + 9 = {beforeWrap}</strong></div><div><span>3 · REMAINDER AFTER ÷ 17</span><strong>{predicted}</strong></div></div>
  <p className="recovery-match" aria-live="polite">{matches?`${candidate} fits: its predicted reading is 9, the observed reading.`:`${candidate} does not fit: its predicted reading is ${predicted}, but the observed reading is 9.`}</p>
  <div className="recovery-diagnostic-buttons"><button type="button" onClick={()=>setCandidate(10)}>Test the damaged entry: 10</button><button type="button" onClick={()=>setCandidate(0)}>Test the proposed repair: 0</button></div>
  <p className="recovery-caption">Move through all seventeen candidates: only 0 fits this diagnostic. The explorer calculates from recorded inputs; it does not run Qwen or simulate an experimental outcome. The actual agent’s next action appears later in the note.</p>
 </figure>;
}
