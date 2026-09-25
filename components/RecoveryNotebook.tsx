import { FigureMotion } from "./FigureMotion";
import { RecoveryCommit } from "./RecoveryCommit";
import { RecoveryDiagnostic } from "./RecoveryDiagnostic";
import type { CSSProperties } from 'react';
import { FieldNotes } from '@chrishayuk/hause/components/FieldNotes';
import { StudyRoom } from '@chrishayuk/hause/components/exhibition/Study';
import { NotebookFieldNotes } from './NotebookFieldNotes';
import { NotebookNavigation } from './NotebookNavigation';
import { Acts } from './Acts';
import { recoverySections, recoveryRecord } from '@/lib/recovery-record';
import data from '@/public/data/ecology/recovery/evidence.json';
import '@/app/ecology-notebook.css';
import '@/app/recovery-notebook.css';

const labels: Record<string,string> = {A:'Corrected state',B:'Prose procedure',C:'Executable mechanism',D:'Matched baseline'};
export function RecoveryCard(){return <div className="recovery-card"><span className="record-voice">AGENT ECOLOGY / EQUAL-STATE RECOVERY</span><div><strong>0<span>/12</span></strong><span aria-hidden="true">→</span><strong>7<span>/12</span></strong></div><p>Prose · Executable</p><span className="record-voice">SAME STATE. SAME DAMAGE.<br/>THE BUILDER NEVER RETURNED.</span></div>;}
function Outcomes({id}:{id:string}){const panel=data.panels.find(p=>p.id===id)!;return <FigureMotion><figure className="recovery-outcomes" aria-label={`${id} successful worlds by inherited treatment`}><figcaption className="record-voice">{id} / JOINT RECOVERY BY THE END OF TEN SUCCESSOR GENERATIONS</figcaption>{panel.arms.map(arm=><div className="recovery-row" key={arm.id}><span>{arm.id} · {labels[arm.id]}</span><div className="recovery-bar" aria-hidden="true"><i data-figure-trace style={{'--success':`${100*arm.successes/arm.denominator}%`} as CSSProperties}/></div><strong>{arm.successes}<small>/{arm.denominator}</small></strong></div>)}<p className="recovery-caption">Each outcome requires both a correct original record and all four fresh-task answers at the same assessment. {id==='I12'?'Establishment and preservation are part of this endpoint.':'Both arms began with identical correct state and identical corruption.'}</p></figure></FigureMotion>;}
function PairedWorlds(){const p=data.panels.find(p=>p.id==='I12R')!;return <FigureMotion><figure className="recovery-worlds"><figcaption className="record-voice">I12R / TWELVE PAIRED WORLDS · ORIGINAL BLOCK ORDER 0–11</figcaption>{p.arms.map(arm=><div key={arm.id}><span>{arm.id} · {labels[arm.id]}</span><ol>{arm.flags.map((flag,index)=><li data-figure-reveal className={flag?'recovered':''} key={index} title={`Block ${index}: ${flag?'recovered at G11':'no joint recovery'}`}><span className="sr-only">Block {index}: </span><span className="recovery-world-index">{index}</span><b>{flag?'✓':'—'}</b><span className="sr-only"> {flag?'recovered at G11':'no joint recovery'}</span></li>)}</ol></div>)}<p className="recovery-caption">✓ Recovered · — Did not meet the joint endpoint. Four rejected builder packages remain in each denominator.</p></figure></FigureMotion>;}
function Mechanism(){return <FigureMotion><figure className="recovery-mechanism"><figcaption className="record-voice">I12R / CORRUPTION BRANCHES · REPEATED OBSERVATIONS</figcaption><div>{[[80,'Executable calls'],[80,'Correct proposals'],[61,'Correct records committed']].map(([n,label])=><div data-figure-reveal key={label}><strong>{n}</strong><span>{label}</span></div>)}</div><p className="recovery-caption">All 80 proposals also answered the fresh task correctly. Committing the correct record and answering the fresh task correctly occurred together in 59 assessments. Calls are not independent worlds.</p></figure></FigureMotion>;}
function InheritancePaths(){return <FigureMotion><figure className="recovery-inheritances"><figcaption className="record-voice">THE SAME REPAIR PROBLEM / TWO INHERITED TREATMENTS</figcaption><div><section><h3>B · Prose</h3><ol><li data-figure-trace>Read the repair procedure.</li><li data-figure-trace>Work out and check the four codes.</li><li data-figure-trace>Write the replacement record.</li></ol></section><section><h3>C · Executable</h3><ol><li data-figure-trace>Invoke the inherited mechanism.</li><li data-figure-trace>Receive a checked proposal.</li><li data-figure-trace>Write the replacement record.</li></ol></section></div><p className="recovery-caption">In both arms the final write belongs to Qwen. A proposal does not change shared state. The executable and the prose remain protected; the data record must be renewed by successors.</p></figure></FigureMotion>;}
function FullPassage({ id, omitLast = false }: { id: string; omitLast?: boolean }) {
 const section = recoverySections.find(section => section.id === id)!;
 const paragraphs = omitLast ? section.paragraphs.slice(0, -1) : section.paragraphs;
 return <>{paragraphs.map(text => <p key={text}>{text}</p>)}</>;
}

export function RecoveryNotebook() {
 return <NotebookFieldNotes><div className="cinematic-notebook machine-visit-notebook eco-notebook recovery-notebook">
  <section id="question" className="recovery-opening" aria-label="The question">
   <p>The builder had gone. Could a successor reconstruct a damaged record using the method it left behind?</p>
  </section>

  <StudyRoom id="world" label="01 / THE DAMAGE" title="One entry changes.">
   <p className="recovery-intro">The record says ten. An independent measurement can show why it is wrong—and which value fits.</p>
   <RecoveryDiagnostic/>
   <details className="recovery-context"><summary>How the calibration test works</summary><FullPassage id="world" omitLast/></details>
  </StudyRoom>

  <StudyRoom id="inheritance" label="02 / THE INHERITANCE" title="Leave instructions. Or leave an operation.">
   <p className="recovery-intro">One group inherited prose. Another inherited executable code. In both, the successor still had to write the repaired record.</p>
   <InheritancePaths/>
   <details className="recovery-context"><summary>What each successor inherited</summary><FullPassage id="inheritance"/></details>
   <details id="fresh" className="recovery-context"><summary>How a fresh task ruled out a stored answer</summary><FullPassage id="fresh"/></details>
  </StudyRoom>

  <StudyRoom id="i12r" label="03 / THE RESULT" title="Seven of twelve recovered with code.">
   <p className="recovery-intro">None recovered with prose. Both groups began with the same correct record and received the same damage.</p>
   <Outcomes id="I12R"/>
   <p className="recovery-qualification">Twelve paired worlds, using historical builder packages and a fixed interface. The procedure and executable were protected; prose successors often failed to follow the permitted interface.</p>
   <details className="recovery-context"><summary>Inspect the twelve paired worlds</summary><PairedWorlds/><FullPassage id="i12r"/></details>
   <details id="i12" className="recovery-context"><summary>The earlier experiment: preservation and recovery</summary><p>I12 found 6/12 recoveries with code, but the prose records had already failed before damage. I12R was designed to remove that unequal starting point.</p><Outcomes id="I12"/><FullPassage id="i12"/></details>
  </StudyRoom>

  <StudyRoom id="mechanism" label="04 / THE FAILURE" title="A correct proposal. A wrong write." tone="dark">
   <p className="recovery-intro">The mechanism could supply the answer. The successor could still lose it when committing the record.</p>
   <RecoveryCommit/>
   <details className="recovery-context"><summary>Across all eighty executable calls</summary><Mechanism/><FullPassage id="mechanism"/></details>
  </StudyRoom>

  <StudyRoom id="limits" label="05 / THE LIMITS" title="The machinery was protected.">
   <p className="recovery-intro">This establishes recovery under the tested conditions. It does not establish that successors can maintain the repair mechanism itself.</p>
   <p className="recovery-qualification">The effect size remains uncertain with twelve worlds. I12 was interrupted and continued; I12R used new worlds but reused the same builder packages.</p>
   <details className="recovery-context"><summary>Uncertainty, rejected packages and scope</summary><FullPassage id="limits"/></details>
   <details id="audit" className="recovery-context"><summary>Interruption, continuation and evidence audit</summary><FullPassage id="audit"/></details>
  </StudyRoom>

  <StudyRoom id="next" label="06 / NEXT" title="What happens when the mechanism breaks?">
   <p className="recovery-intro">That is the proposed I13: repair the inherited program, then have a later successor use it. It is the next question, not a result of this study.</p>
  </StudyRoom>

  <section className="mv-full-record" id="recovery-record"><FieldNotes label="Read the complete note & evidence" detail="READ +"><Acts acts={recoveryRecord.body} anchored staticRefusals/></FieldNotes></section>
  <NotebookNavigation><nav className="mv-entry-nav record-voice" aria-label="Explore this notebook"><a href="#world">THE DAMAGE ↑</a><a href="#i12r">THE RESULT ↑</a><a href="#mechanism">PROPOSAL → COMMIT ↑</a><a href="#recovery-record">THE FULL RECORD ↑</a><a href="/thread/agent-ecology">THE COMPLETE SEQUENCE ↗</a></nav></NotebookNavigation>
 </div></NotebookFieldNotes>;
}
