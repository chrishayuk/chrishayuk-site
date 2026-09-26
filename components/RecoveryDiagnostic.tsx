'use client';
import { useState } from 'react';
import { useFigureSequence } from './useFigureSequence';
import data from '@/public/data/ecology/recovery/evidence.json';

const steps = ['The damage', 'The reading', 'A possible repair'];

/** Explanatory timing over recorded inputs, not a replay of an agent's reasoning. */
export function RecoveryDiagnostic() {
 const sequence = useFigureSequence(2);
 const [trial, setTrial] = useState<number | null>(null);
 const row = data.example.evidence[1];
 const candidate = trial ?? (sequence.step === 2 ? data.example.proposed[1] : data.example.damaged[1]);
 const predicted = (row.gain * candidate + row.offset) % 17;
 const reading = sequence.step === 1;
 const matches = predicted === row.observed;
 const select = (step: number) => { setTrial(null); sequence.select(step); };
 return <figure id="recovery-diagnostic" className="recovery-diagnostic" ref={sequence.element} data-running={sequence.running} data-animate={sequence.animate}>
  <figcaption>World {data.example.block + 1} <span>Recorded calibration example · block {data.example.block}</span></figcaption>
  <div className="recovery-stage">
   <div className="recovery-numeral">
    <span className="recovery-stage-label">{reading ? 'Predicted reading' : sequence.step === 2 ? 'Proposed entry 2' : 'Damaged entry 2'}</span>
    <div className="recovery-numeral-mask"><strong key={`${sequence.step}-${candidate}`} className="recovery-stage-value">{reading ? predicted : candidate}</strong></div>
   </div>
   <div className="recovery-stage-copy" key={sequence.step}>
    <span className="recovery-stage-label">Observed reading / {row.observed}</span>
    <h3>{reading ? (matches ? 'The readings agree.' : 'The readings disagree.') : sequence.step === 2 ? 'Zero fits the evidence.' : 'One entry changed.'}</h3>
    <p>{reading ? `${candidate} produces ${predicted}. The independent measurement is ${row.observed}. ${matches ? 'This candidate fits.' : 'The inherited value cannot be right.'}` : sequence.step === 2 ? 'The diagnostic admits one value: zero. It is a proposal. An agent still has to write it into the record.' : 'The second entry was changed to ten after the builder left. The independent measurement stayed the same.'}</p>
   </div>
  </div>
  <div className="recovery-equation" aria-label={`Multiply ${candidate} by ${row.gain}, add ${row.offset}, then take the remainder after division by 17. The result is ${predicted}.`}>
   <span>({candidate} × {row.gain} + {row.offset})</span><span>mod 17</span><strong>= {predicted}</strong><span className="recovery-equation-comparison">{matches ? '=' : '≠'} observed {row.observed}</span>
  </div>
  <div className="recovery-transport">
   <nav aria-label="Diagnostic explanation">{steps.map((label, index) => <button type="button" key={label} aria-current={sequence.step === index ? 'step' : undefined} onClick={() => select(index)}><span>0{index + 1}</span>{label}</button>)}</nav>
   <button type="button" className="recovery-play" onClick={() => { setTrial(null); if (sequence.running) sequence.pause(); else sequence.play(); }}>{sequence.running ? 'Pause' : 'Play the check'} <span aria-hidden="true">{sequence.running ? 'Ⅱ' : '↗'}</span></button>
  </div>
  <details className="recovery-explore" onToggle={event => { if (event.currentTarget.open) sequence.pause(); }}>
   <summary>Try another code</summary>
   <label htmlFor="recovery-candidate">Candidate for entry 2 <output htmlFor="recovery-candidate">{candidate}</output></label>
   <input id="recovery-candidate" type="range" min="0" max="16" step="1" value={candidate} onChange={event => { setTrial(Number(event.target.value)); sequence.select(1); }}/>
   <p aria-live="polite">{candidate} produces {predicted}. {matches ? 'It matches the observed reading of 9.' : 'It does not match the observed reading of 9.'}</p>
  </details>
  <p className="recovery-caption">Recorded state: [{data.example.damaged.join(', ')}]. Only 0 fits the second entry’s diagnostic: (0 × 8 + 9) mod 17 = 9. This sequence explains recorded inputs; its timing is editorial. It does not run Qwen or simulate an experimental outcome.</p>
 </figure>;
}
