import Link from "next/link";
import { Codex, FolioObject, Marginalia } from '@chrishayuk/hause/components/Codex';
import { NotebookSupport } from '@chrishayuk/hause/components/NotebookEdition';
import { ReadingFigure } from '@chrishayuk/hause/components/ReadingFigure';
import { getRecord } from '@/lib/records';
import { publicationHistory } from '@/lib/provenance';
import { RecoveryResult } from './RecoveryResult';
import { FigureMotion } from "./FigureMotion";
import { RecoveryCommit } from "./RecoveryCommit";
import { RecoveryDiagnostic } from "./RecoveryDiagnostic";
import type { CSSProperties } from 'react';
import { Acts } from './Acts';
import { recoverySections } from '@/lib/recovery-record';
import data from '@/public/data/ecology/recovery/evidence.json';
import '@/app/ecology-notebook.css';
import '@/app/recovery-notebook.css';
import '@/app/recovery-codex.css';

const labels: Record<string,string> = {A:'Corrected state',B:'Prose procedure',C:'Executable mechanism',D:'Matched baseline'};
export function RecoveryCard(){return <RecoveryResult compact/>;}
function Outcomes({id}:{id:string}){const panel=data.panels.find(p=>p.id===id)!;return <FigureMotion><figure className="recovery-outcomes" aria-label={`${id} successful worlds by inherited treatment`}><figcaption className="record-voice">{id} / JOINT RECOVERY BY THE END OF TEN SUCCESSOR GENERATIONS</figcaption>{panel.arms.map(arm=><div className="recovery-row" key={arm.id}><span>{arm.id} · {labels[arm.id]}</span><div className="recovery-bar" aria-hidden="true"><i data-figure-trace style={{'--success':`${100*arm.successes/arm.denominator}%`} as CSSProperties}/></div><strong>{arm.successes}<small>/{arm.denominator}</small></strong></div>)}<p className="recovery-caption">Each outcome requires both a correct original record and all four fresh-task answers at the same assessment. {id==='I12'?'Establishment and preservation are part of this endpoint.':'Both arms began with identical correct state and identical corruption.'}</p></figure></FigureMotion>;}
function PairedWorlds(){const p=data.panels.find(p=>p.id==='I12R')!;return <FigureMotion><figure className="recovery-worlds"><figcaption className="record-voice">I12R / TWELVE PAIRED WORLDS · ORIGINAL BLOCK ORDER 0–11</figcaption>{p.arms.map(arm=><div key={arm.id}><span>{arm.id} · {labels[arm.id]}</span><ol>{arm.flags.map((flag,index)=><li data-figure-reveal className={flag?'recovered':''} key={index} title={`Block ${index}: ${flag?'recovered at G11':'no joint recovery'}`}><span className="sr-only">Block {index}: </span><span className="recovery-world-index">{index}</span><b>{flag?'✓':'—'}</b><span className="sr-only"> {flag?'recovered at G11':'no joint recovery'}</span></li>)}</ol></div>)}<p className="recovery-caption">✓ Recovered · — Did not meet the joint endpoint. Four rejected builder packages remain in each denominator.</p></figure></FigureMotion>;}
function Mechanism(){return <FigureMotion><figure className="recovery-mechanism"><figcaption className="record-voice">I12R / CORRUPTION BRANCHES · REPEATED OBSERVATIONS</figcaption><div>{[[80,'Executable calls'],[80,'Correct proposals'],[61,'Correct records committed']].map(([n,label])=><div data-figure-reveal key={label}><strong>{n}</strong><span>{label}</span></div>)}</div><p className="recovery-caption">All 80 proposals also answered the fresh task correctly. Committing the correct record and answering the fresh task correctly occurred together in 59 assessments. Calls are not independent worlds.</p></figure></FigureMotion>;}
function FullPassage({ id, omitLast = false }: { id: string; omitLast?: boolean }) {
 const section = recoverySections.find(section => section.id === id)!;
 const paragraphs = omitLast ? section.paragraphs.slice(0, -1) : section.paragraphs;
 return <>{paragraphs.map(text => <p key={text}>{text}</p>)}</>;
}

export function RecoveryNotebook() {
 const record = getRecord('N-ECOLOGY-RECOVERY')!;
 const history = publicationHistory(record.id)!;
 const comparison = data.panels.find(panel => panel.id === 'I12R')!;
 const folios = [
  { id: 'i12r', label: 'The result', children: <>
   <FolioObject place="full"><h2 id="question">Same record.<br/>Same damage.</h2></FolioObject>
   {comparison.arms.map((arm, index) => <FolioObject place={index === 0 ? 'left' : 'right'} key={arm.id} className="recovery-folio-result"><ReadingFigure motion={false} aria-label={`${arm.id === 'B' ? 'Prose' : 'Executable'}: ${arm.successes} of ${arm.denominator} worlds recovered`}><figcaption>{arm.id === 'B' ? 'Prose procedure' : 'Executable mechanism'}</figcaption><p className="recovery-folio-count"><strong>{arm.successes}</strong><span>/ {arm.denominator}</span></p><div className="recovery-folio-marks" aria-hidden="true">{arm.flags.map((flag, block) => <i key={block} data-recovered={Boolean(flag)}/>)}</div></ReadingFigure></FolioObject>)}
   <FolioObject place="main"><p>The builder had gone. Seven worlds recovered with the executable; none recovered with prose.</p><p className="recovery-folio-small">Joint recovery required the original record and a fresh task to be correct at the same assessment. The inherited machinery remained protected.</p></FolioObject>
   <FolioObject place="margin"><Marginalia label="I12R / paired worlds"><p>One mark per world, in block order 0–11. Ten successor opportunities, G11–G20.</p><a href="#paired-world-record">Inspect the evidence ↗</a></Marginalia></FolioObject>
  </> },
  { id: 'world', label: 'The apparatus', kind: 'operate' as const, children: <>
   <FolioObject place="main"><h2>Find the missing value.</h2><RecoveryDiagnostic/></FolioObject>
   <FolioObject place="margin"><Marginalia label={`World ${data.example.block + 1} / block ${data.example.block}`}><p>The inherited record:</p><code className="recovery-folio-record">[{data.example.damaged.join(', ')}]</code><p>The second entry changed. The diagnostic did not.</p><a href="#calibration-method">Read the calibration method ↗</a></Marginalia><div id="inheritance" className="recovery-folio-annotation"><h3>Two ways to inherit</h3><p>Prose supplies a procedure. Executable code supplies a checked proposal.</p><p>In both arms, Qwen must write the replacement record.</p></div></FolioObject>
  </> },
  { id: 'mechanism', label: 'The failed write', kind: 'operate' as const, children: <>
   <FolioObject place="main"><h2>A proposal is not a write.</h2><RecoveryCommit/></FolioObject>
   <FolioObject place="margin"><Marginalia label={`I12R / block ${data.example.block} / G${data.example.generation}`}><p>The mechanism reconstructed the answer. Qwen’s next action lost it.</p><p>This is one recorded failure, not a reconstruction of the model’s reasoning.</p><a href="#executable-calls">All eighty calls ↗</a></Marginalia></FolioObject>
   <FolioObject place="full"><p className="recovery-folio-small">80 correct proposals. 61 correct records committed. 59 assessments with both a correct record and fresh-task answers. These repeated observations are not independent worlds.</p></FolioObject>
  </> },
  { id: 'recovery-evidence', label: 'The evidence', kind: 'evidence' as const, children: <>
   <FolioObject place="main"><h2 id="paired-world-record">Keep the twelve worlds visible.</h2><PairedWorlds/><NotebookSupport label="Methods, comparisons & source reports"><div id="recovery-methods">
    <section id="calibration-method"><h3>The calibration test</h3><FullPassage id="world" omitLast/></section>
    <section id="inheritance-method"><h3>What each successor inherited</h3><FullPassage id="inheritance"/></section>
    <section id="fresh"><h3>A fresh task</h3><FullPassage id="fresh"/></section>
    <section id="i12"><h3>The earlier experiment</h3><Outcomes id="I12"/><FullPassage id="i12"/></section>
    <section id="executable-calls"><h3>Across all eighty calls</h3><Mechanism/><FullPassage id="mechanism"/></section>
    <section id="scope"><h3>Uncertainty and scope</h3><FullPassage id="limits"/></section>
    <section id="audit"><h3>The evidence audit</h3><FullPassage id="audit"/></section>
    <section><h3>Canonical reports</h3>{data.sources.map(source => <p key={source.run}><a href={source.publicPath}>{source.publicPath.split('/').at(-1)} ↗</a></p>)}</section>
   </div></NotebookSupport></FolioObject>
   <FolioObject place="margin"><Marginalia label="Scope / twelve paired worlds"><p id="limits">A fixed interface, historical builder packages and protected repair machinery. Prose successors often failed to follow the permitted interface.</p><p>Four rejected packages stay in each denominator. The effect size is uncertain. These are not independent new builders.</p><a href="#scope">Read the limitations ↗</a></Marginalia></FolioObject>
  </> },
  { id: 'next', label: 'The next question', children: <>
   <FolioObject place="left"><span className="recovery-folio-kicker">Proposed I13</span><h2>What happens when the mechanism breaks?</h2></FolioObject>
   <FolioObject place="right"><p>Repair the inherited program. Then have a later successor use it.</p><p className="recovery-folio-small">That is the next question recorded in this note—not a result of I12 or I12R.</p><a className="recovery-folio-link" href="#recovery-codex-history">Follow the record’s history ↗</a></FolioObject>
   <FolioObject place="full"><Link className="recovery-folio-link" href="/thread/agent-ecology">Agent Ecology / the complete sequence ↗</Link></FolioObject>
  </> },
 ];
 return <div className="recovery-notebook recovery-codex"><Codex id="recovery-codex" title={record.title} collection="Agent Ecology / a research codex" byline={<><span>Chris Hay</span><time dateTime={record.published || record.created}>{record.published || record.created}</time><span>I12 · I12R</span></>} folios={folios}
  manuscript={<div id="recovery-record"><p className="recovery-folio-small">The complete authored account. Version {record.version}; original experiment results and qualifications retained.</p><Acts acts={record.body} anchored staticRefusals/></div>}
  history={<><ol className="recovery-codex-history">{history.versions.map(entry => <li key={entry.version}><span>{entry.revised || entry.published} / v{entry.version}</span><h3>{entry.revision?.kind === 'initial' ? 'First publication' : 'Clarification'}</h3><p>{entry.revision?.summary}</p><a href={entry.url}>Read the preserved edition ↗</a><details><summary>Manuscript fingerprint</summary><code>{entry.hash}</code><a href={entry.manuscript}>Manuscript JSON ↗</a></details></li>)}</ol><p className="recovery-folio-small">The codex is a presentation of these records. It adds no experiment, revised outcome or superseded claim.</p><a className="recovery-folio-link" href={`/api/record/${record.id}/history`}>Complete publication history ↗</a></>}/></div>;
}
