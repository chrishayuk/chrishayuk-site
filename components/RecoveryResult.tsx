import data from '@/public/data/ecology/recovery/evidence.json';
import '@/app/recovery-result.css';

/** Paired treatments, with observed flags in the original block order. */
export function RecoveryResult({compact=false}:{compact?:boolean}) {
 const panel=data.panels.find(panel=>panel.id==='I12R')!;
 return <figure className={`recovery-result${compact?' recovery-result-compact':''}`}>
  <figcaption>I12R / worlds recovered</figcaption>
  <div className="recovery-result-arms">{panel.arms.map(arm=><div key={arm.id}><h3>{arm.id==='B'?'Prose':'Executable'}</h3><p className="recovery-result-count"><strong>{arm.successes}</strong><span> / {arm.denominator}</span></p><div className="recovery-result-marks" aria-hidden="true">{arm.flags.map((flag,index)=><span data-figure-reveal key={index} data-recovered={Boolean(flag)}/>)}</div></div>)}</div>
  <p className="recovery-result-caption">Same starting state and damage. Recovery required the original record and a fresh task. Fixed interface; protected repair machinery.</p>
 </figure>;
}
