import { RecoveryDiagnostic } from './RecoveryDiagnostic';
import type { CSSProperties } from 'react';
import { FieldNotes } from '@chrishayuk/hause/components/FieldNotes';
import { StudyRoom } from '@chrishayuk/hause/components/exhibition/Study';
import { NotebookFieldNotes } from './NotebookFieldNotes';
import { NotebookNavigation } from './NotebookNavigation';
import { Acts } from './Acts';
import { recoveryRecord } from '@/lib/recovery-record';
import { recoveryMovements } from '@/lib/recovery-reading';
import data from '@/public/data/ecology/recovery/evidence.json';
import '@/app/ecology-notebook.css';
import '@/app/recovery-notebook.css';

const labels: Record<string, string> = { A: 'Corrected state', B: 'Prose procedure', C: 'Executable mechanism', D: 'Matched baseline' };

export function RecoveryCard() {
 return <div className="recovery-card"><span className="record-voice">AGENT ECOLOGY / EQUAL-STATE RECOVERY</span><div><strong>0<span>/12</span></strong><span aria-hidden="true">→</span><strong>7<span>/12</span></strong></div><p>Prose · Executable</p><span className="record-voice">SAME STATE. SAME DAMAGE.<br/>THE BUILDER NEVER RETURNED.</span></div>;
}

function Outcomes() {
 const panel = data.panels.find(p => p.id === 'I12')!;
 return <figure className="recovery-outcomes" aria-label="I12 successful worlds by inherited treatment">
  <figcaption className="record-voice">I12 / PRESERVATION AND RECOVERY COMBINED</figcaption>
  {panel.arms.map(arm => <div className="recovery-row" key={arm.id}><span>{arm.id} · {labels[arm.id]}</span><div className="recovery-bar" aria-hidden="true"><i style={{ '--success': String(100 * arm.successes / arm.denominator) + '%' } as CSSProperties}/></div><strong>{arm.successes}<small>/{arm.denominator}</small></strong></div>)}
  <p className="recovery-caption">The prose arm had already lost correct state before the new damage.</p>
 </figure>;
}

function EqualStateResult() {
 const panel = data.panels.find(p => p.id === 'I12R')!;
 return <figure className="recovery-equal-state" aria-label="I12R: prose zero of twelve; executable seven of twelve">
  <figcaption className="record-voice">I12R / IDENTICAL STARTING STATE · IDENTICAL CORRUPTION</figcaption>
  <div>{panel.arms.map(arm => <div key={arm.id}><span className="record-voice">{arm.id === 'B' ? 'PROSE' : 'EXECUTABLE'}</span><strong>{arm.successes}<small>/{arm.denominator}</small></strong><span>worlds recovered</span></div>)}</div>
  <p className="recovery-caption">All seven successes occurred at the first successor generation.</p>
 </figure>;
}

function PairedWorlds() {
 const panel = data.panels.find(p => p.id === 'I12R')!;
 return <figure className="recovery-worlds"><figcaption className="record-voice">THE TWELVE PAIRED WORLDS / ORIGINAL BLOCK ORDER 0–11</figcaption>
  {panel.arms.map(arm => <div key={arm.id}><span>{arm.id} · {labels[arm.id]}</span><ol>{arm.flags.map((flag, index) => <li className={flag ? 'recovered' : ''} key={index} title={'Block ' + index + ': ' + (flag ? 'recovered at G11' : 'no joint recovery')}><span className="sr-only">Block {index}: </span>{flag ? '✓' : '—'}<span className="sr-only"> {flag ? 'recovered at G11' : 'no joint recovery'}</span></li>)}</ol></div>)}
  <p className="recovery-caption">✓ Recovered · — No joint recovery. All twelve assigned packages remain in the denominator, including four rejected packages.</p>
 </figure>;
}

function Mechanism() {
 return <figure className="recovery-mechanism"><figcaption className="record-voice">I12R / CORRUPTION BRANCHES · REPEATED OBSERVATIONS</figcaption>
  <div>{[[80, 'Executable calls'], [80, 'Correct proposals'], [61, 'Correct records committed']].map(([n, label]) => <div key={label}><strong>{n}</strong><span>{label}</span></div>)}</div>
 </figure>;
}

function RecordedCommit() {
 return <figure className="recovery-commit"><figcaption className="record-voice">ONE RECORDED TRANSITION / BLOCK 9 · G11</figcaption>
  <ol>{[
   ['Damaged record', data.example.damaged],
   ['Executable proposal · correct', data.example.proposed],
   ['Qwen commit · incorrect', data.example.committed],
  ].map(([label, values]) => <li key={String(label)}><span>{String(label)}</span><code>{JSON.stringify(values)}</code></li>)}</ol>
 </figure>;
}

function InheritancePaths() {
 return <figure className="recovery-inheritances"><figcaption className="record-voice">THE SAME REPAIR PROBLEM / TWO INHERITED TREATMENTS</figcaption><div>
  <section><h3>B · Prose</h3><ol><li>Interpret the procedure.</li><li>Calculate the codes.</li><li>Check the result.</li><li>Write the record.</li></ol></section>
  <section><h3>C · Executable</h3><ol><li>Invoke the mechanism.</li><li>Receive a checked proposal.</li><li>Write the record.</li></ol></section>
 </div></figure>;
}

export function RecoveryNotebook() {
 return <NotebookFieldNotes><div className="cinematic-notebook machine-visit-notebook eco-notebook recovery-notebook">
  {recoveryMovements.map(section => <StudyRoom key={section.id} id={section.id} label={section.label} title={<>{section.title.split('\n').map((line, i) => <span key={line}>{i > 0 && <br/>}{line}</span>)}</>} tone={section.id === 'mechanism' ? 'dark' : section.id === 'next' ? 'accent' : undefined}>
   {section.paragraphs.map((text, index) => <div className="recovery-passage" key={text}>
    <p className="mv-reading">{text}</p>
    {section.id === 'inheritance' && index === 0 && <InheritancePaths/>}
    {section.id === 'i12' && index === 1 && <Outcomes/>}
    {section.id === 'i12r' && index === 0 && <EqualStateResult/>}
    {section.id === 'i12r' && index === 3 && <PairedWorlds/>}
    {section.id === 'mechanism' && index === 0 && <Mechanism/>}
    {section.id === 'mechanism' && index === 2 && <RecordedCommit/>}
   </div>)}
   {section.id === 'inheritance' && <details className="recovery-arithmetic-drawer" id="world"><summary>Try the recorded diagnostic: why does only zero fit?</summary><RecoveryDiagnostic/></details>}
  </StudyRoom>)}
  <section className="mv-full-record" id="recovery-record">
   <FieldNotes label="The complete note & its evidence" detail="READ +">
    <p className="recovery-caption">The full published account, including fresh-task construction, uncertainty, rejected packages and the I12 interruption.</p>
    <div id="fresh"/><div id="limits"/><div id="audit"/>
    <Acts acts={recoveryRecord.body} anchored staticRefusals/>
   </FieldNotes>
  </section>
  <NotebookNavigation><nav className="mv-entry-nav record-voice" aria-label="Explore this notebook"><a href="#i12">THE FIRST TEST ↑</a><a href="#i12r">EQUAL-STATE RECOVERY ↑</a><a href="#mechanism">PROPOSAL → COMMIT ↑</a><a href="#recovery-record">THE FULL RECORD ↑</a><a href="/thread/agent-ecology">THE COMPLETE SEQUENCE ↗</a></nav></NotebookNavigation>
 </div></NotebookFieldNotes>;
}
