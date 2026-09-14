import { StudyRoom } from '@chrishayuk/hause/components/exhibition/Study';
import { NotebookFieldNotes } from './NotebookFieldNotes';
import { NotebookNavigation } from './NotebookNavigation';
import { worldRemembersSections } from '@/lib/world-remembers-record';
import { worldRemembersRecord } from '@/lib/world-remembers-record';
import { Acts } from './Acts';
import { HandoffFigure, LineageFigure, DiagnosisFigure, DefenderFigure } from './WorldRemembersFigures';
import '@/app/ecology-notebook.css';
import '@/app/world-remembers.css';

export function WorldRemembersNotebook(){return <NotebookFieldNotes><div className="cinematic-notebook machine-visit-notebook eco-notebook wr-notebook">
 <nav className="wr-contents" aria-label="In this notebook"><a href="#handoff">The handoff ↓</a><a href="#persistence">The descendants ↓</a><a href="#corruption">The mistake ↓</a><a href="#defender">The repair ↓</a></nav>
 {worldRemembersSections.map(s=><StudyRoom key={s.id} id={s.id} label={s.label} title={<>{s.title.split('\n')[0]}<br/><em>{s.title.split('\n')[1]}</em></>} tone={s.id==='corruption'?'dark':s.id==='boundary'?'accent':undefined}>
  <div className="mv-prose">{s.paragraphs.slice(0,s.figure==='handoff'?3:2).map((p,i)=><p id={`act-${worldRemembersSections.slice(0,worldRemembersSections.indexOf(s)).reduce((n,v)=>n+v.paragraphs.length,0)+i+1}`} key={i}>{p}</p>)}</div>
  {s.figure==='handoff'?<HandoffFigure/>:s.figure==='writing'||s.figure==='corruption'?<LineageFigure kind={s.figure}/>:s.figure==='diagnosis'?<DiagnosisFigure/>:s.figure==='defender'?<DefenderFigure/>:null}
  <div className="mv-prose">{s.paragraphs.slice(s.figure==='handoff'?3:2).map((p,i)=><p id={`act-${worldRemembersSections.slice(0,worldRemembersSections.indexOf(s)).reduce((n,v)=>n+v.paragraphs.length,0)+(s.figure==='handoff'?3:2)+i+1}`} key={i}>{p}</p>)}</div>
  {s.id==='incident'&&<p className="wr-caption"><a href="https://openai.com/index/hugging-face-incident-and-the-road-ahead/">Read OpenAI’s account, 26 August 2026 ↗</a></p>}
  {s.id==='content'&&<p className="wr-caption"><a href="/notebook/the-stronger-agent-left-something-behind">The earlier key-world handoff: I1 and I2 ↗</a></p>}
  {s.figure&&<p className="wr-caption"><a href={`/data/ecology/world-remembers/${({handoff:'i4',writing:'i6',corruption:'i7',diagnosis:'i10',defender:'i11'} as Record<string,string>)[s.figure]}-results.md`}>Read this experiment’s complete results and limits ↗</a></p>}
 </StudyRoom>)}
 <details className="wr-details"><summary>The two bounded claims</summary><Acts acts={worldRemembersRecord.body.slice(-2)} anchored offset={worldRemembersRecord.body.length-2}/></details>
 <NotebookNavigation><p className="wr-caption"><a href="/thread/agent-ecology">AGENT ECOLOGY / THE COMPLETE SEQUENCE ↗</a> · <a href="/data/ecology/world-remembers/provenance.json">FIGURE PROVENANCE ↗</a></p></NotebookNavigation>
 </div></NotebookFieldNotes>;}
