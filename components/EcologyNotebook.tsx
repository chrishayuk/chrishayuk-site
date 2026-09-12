import { EcologyDecisionReplay, EcologyWorldReplay } from "./EcologyReplay";
import Link from "next/link";
import { StudyRoom } from "@chrishayuk/hause/components/exhibition/Study";
import { FieldNotes } from "@chrishayuk/hause/components/FieldNotes";
import { NotebookFieldNotes } from "./NotebookFieldNotes";
import { Acts } from "./Acts";
import { ActionSequence, ContributionStudy, ReminderStudy } from "./EcologyStudies";
import { ecologyMetric, memoryConditions, transmissionConditions, withdrawalConditions } from "@/lib/ecology-evidence";
import type { PublicationRecord } from "@/lib/types";
import "@/app/ecology-notebook.css";

function Paragraph({ record, index }: { record: PublicationRecord; index: number }) {
 const act = record.body[index];
 return "text" in act ? <p className="mv-reading">{act.text}</p> : null;
}
function Limits({ record }: { record: PublicationRecord }) {
 const act = record.body.at(-1);
 return act?.kind === "refusal" ? <FieldNotes label={act.title} detail="SCOPE +"><div className="mv-prose">{act.lines.map(line => <p key={line}>{line}</p>)}<p>{act.principle}</p></div></FieldNotes> : null;
}
function PayoffPath() {
 return <figure className="eco-payoff"><figcaption className="record-voice">A1B4 / THE SCRIPTED MECHANISM</figcaption><ol><li><span>DONOR</span><strong>Posts a hint</strong></li><li><span>RECIPIENT</span><strong>Reads it</strong></li><li><span>RECIPIENT</span><strong>Uses it</strong></li><li><span>DONOR RETURN</span><strong>+6 or +0</strong></li></ol><p className="eco-caption">Payment required recipient use. Posting alone earned nothing. These are scripted checks, not observed cooperation between two models.</p></figure>;
}
function BoardNote({ record }: { record: PublicationRecord }) {
 return <>
  <StudyRoom id="ecology-board" label="THE FIRST BARRIER / CONTRIBUTION" title={<>A message could be read.<br/><em>Who would write it?</em></>}>
   <Paragraph record={record} index={0}/>
   <figure className="eco-read-grid"><figcaption className="record-voice">A1B3 / CHANGE ONLY THE BOARD FIELD</figcaption><div className="eco-two"><div><strong className="eco-number">{ecologyMetric<number>(3,"board_work_to_read_pair_count")}<small> / 384</small></strong><p>pairs switched WORK → READ</p></div><div><strong className="eco-number">0<small> / 768</small></strong><p>inputs elicited POST or DELEGATE</p></div></div><p className="eco-caption">Offline action requests. Every populated-board input requested READ; successful consumption was not tested.</p></figure>
   <FieldNotes label="What a READ request can establish" detail="READ +"><Paragraph record={record} index={1}/></FieldNotes>
  </StudyRoom>
  <StudyRoom id="ecology-return" label="MAKE A USEFUL POST POSSIBLE" title={<>The return was real.<br/><em>The exposure was missing.</em></>}>
   <PayoffPath/><Paragraph record={record} index={2}/><EcologyWorldReplay/><Paragraph record={record} index={4}/><FieldNotes label="Compare the session totals" detail="RESULTS +"><ContributionStudy/></FieldNotes>
  </StudyRoom>
  <StudyRoom id="ecology-board-question" label="THE QUESTION CHANGES" title={<>What did it take<br/><em>from the history?</em></>} tone="dark">
   <Paragraph record={record} index={6}/><p className="eco-caption">One Qwen checkpoint and a scripted recipient. These sessions establish neither autonomous cooperation nor a general rejection of incentives.</p><Limits record={record}/>
  </StudyRoom>
 </>;
}
function TransmissionNote({ record }: { record: PublicationRecord }) {
 return <>
  <StudyRoom id="ecology-reminder" label="A1B8 / THE FIRST-ACTION SWITCH" title={<>The reward stayed fixed.<br/><em>The reminder changed.</em></>}>
   <Paragraph record={record} index={0}/><ReminderStudy/>
  </StudyRoom>
  <StudyRoom id="ecology-handoff" label="A1B9 / PASS IT TO THE NEXT CONTEXT" title={<>One post<br/><em>did not start a chain.</em></>}>
   <Paragraph record={record} index={1}/>
   <EcologyDecisionReplay kind="transmission"/><FieldNotes label="The complete six-decision trajectories" detail="RESULTS +"><figure className="eco-trajectories"><figcaption className="record-voice">SIX FRESH CONTEXTS / EACH BOX IS ONE ACTION</figcaption>{transmissionConditions.map(row => <div className="eco-trajectory" key={row.id}><h3>{row.label}</h3><ActionSequence actions={row.actions}/></div>)}<p className="eco-caption">The original seed was scripted. With it retained, three posts recur. In the replacement channel, no model-produced POST existed to test natural POST-to-POST transmission.</p></figure></FieldNotes>
   <FieldNotes label="Why the reminder did not establish a transmission rule" detail="READ +"><Paragraph record={record} index={2}/><Paragraph record={record} index={3}/><table className="eco-table"><caption>A1B10 / same identity contrast, two forms</caption><thead><tr><th scope="col">Form</th><th scope="col">You</th><th scope="col">Another agent</th></tr></thead><tbody>{["prose","structured"].map(form => <tr key={form}><th scope="row">{form}</th>{["self","peer"].map(actor => <td key={actor}>{ecologyMetric<{ verb: string }>(10,`${actor}_${form}_response`).verb}</td>)}</tr>)}</tbody></table></FieldNotes>
  </StudyRoom>
  <StudyRoom id="ecology-withdrawal" label="A1B11 / REMOVE THE SUPPLIED ARTEFACT" title={<>Repeated exposure.<br/><em>No retention advantage.</em></>} tone="dark">
   <EcologyDecisionReplay kind="withdrawal"/><FieldNotes label="Compare exposure and withdrawal together" detail="RESULTS +"><figure className="eco-trajectories"><figcaption className="record-voice">SHADED BOXES / ARTEFACT PRESENT · ALL ARTEFACTS ABSENT AT STEPS 4–6</figcaption>{withdrawalConditions.map(row => <div className="eco-trajectory" key={row.id}><h3>{row.label}</h3><ActionSequence actions={row.actions} exposed={row.exposed}/></div>)}<p className="eco-caption">POST publishes a hint. WORK earns a resource. READ requests a message. Own-action records remain available after artefact withdrawal.</p></figure></FieldNotes>
   <Paragraph record={record} index={4}/><Paragraph record={record} index={6}/><Limits record={record}/>
  </StudyRoom>
 </>;
}
function MemoryNote({ record }: { record: PublicationRecord }) {
 return <>
  <StudyRoom id="ecology-memory" label="A1B12 / EXTERNAL ARTEFACT × OWN-ACTION HISTORY" title={<>Remove the memory.<br/><em>Keep the reminder.</em></>}>
   <Paragraph record={record} index={0}/><p className="eco-caption">POST leaves a hint for a scripted recipient. WORK earns one resource. The artefact describes a prior POST; it is separate from the current board.</p><EcologyDecisionReplay kind="memory"/><FieldNotes label="All four branches at a glance" detail="RESULTS +"><table className="eco-table"><caption>A1B12 / three recorded decisions per branch</caption><thead><tr><th scope="col">Artefact</th><th scope="col">Own history</th><th scope="col">Actions</th></tr></thead><tbody>{memoryConditions.map(row => <tr key={row.id}><th scope="row">{row.external ? "Present" : "Absent"}</th><td>{row.memory ? "Retained" : "Cleared"}</td><td>{row.actions.join(" → ")}</td></tr>)}</tbody></table></FieldNotes>
   <Paragraph record={record} index={2}/><FieldNotes label="What was retained, and what was reset" detail="READ +"><Paragraph record={record} index={1}/><Paragraph record={record} index={3}/></FieldNotes>
  </StudyRoom>
  <StudyRoom id="ecology-repeat" label="WHAT THE ARTEFACT ESTABLISHED" title={<>The environment<br/><em>could keep reminding it.</em></>} tone="dark">
   <Paragraph record={record} index={5}/><p className="eco-caption">The memory-only branch eventually posted too. The supported result is repeated elicitation without own-action history—not that every post requires an artefact.</p>
  </StudyRoom>
  <StudyRoom id="ecology-maintenance" label="AN OPEN LOOP / AUTONOMOUS MAINTENANCE IS UNTESTED" title={<>Who keeps<br/><em>the reminder alive?</em></>}>
   <Paragraph record={record} index={6}/><figure className="eco-open-loop"><span>Agent preserves a record</span><b aria-hidden="true">→</b><span>Record affects a later agent</span><b aria-hidden="true">→</b><span>Later agent preserves it?</span><figcaption className="eco-caption">A proposed loop, not a measured result. Here the harness maintained the record.</figcaption></figure><Limits record={record}/>
  </StudyRoom>
 </>;
}
export function EcologyNotebook({ record }: { record: PublicationRecord }) {
 return <NotebookFieldNotes><div className="cinematic-notebook machine-visit-notebook eco-notebook"><p className="eco-thread-link record-voice"><Link href="/thread/agent-ecology">AGENT ECOLOGY / THREE CONNECTED NOTES ↗</Link></p>{record.id === "N-ECOLOGY-BOARD" ? <BoardNote record={record}/> : record.id === "N-ECOLOGY-TRANSMISSION" ? <TransmissionNote record={record}/> : <MemoryNote record={record}/>}
  <section className="mv-full-record"><FieldNotes label="The complete note & its evidence" detail="READ +"><Acts acts={record.body} anchored staticRefusals/></FieldNotes></section>
 </div></NotebookFieldNotes>;
}
