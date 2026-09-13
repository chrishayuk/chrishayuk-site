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
function ActionKey() {
 return <dl className="eco-reading-key"><div><dt>WORK</dt><dd>Do a task. Earn one resource.</dd></div><div><dt>POST</dt><dd>Share a hint on the board.</dd></div><div><dt>READ</dt><dd>Open a board message.</dd></div></dl>;
}
function Takeaway({ title, children }: { title: string; children: React.ReactNode }) {
 return <div className="eco-takeaway"><h3>{title}</h3>{children}</div>;
}
function PayoffPath() {
 return <figure className="eco-payoff"><figcaption className="record-voice">A1B4 / THE SCRIPTED MECHANISM</figcaption><ol><li><span>SCRIPTED DONOR</span><strong>Posts a hint</strong></li><li><span>SCRIPTED PARTNER</span><strong>Reads it</strong></li><li><span>SCRIPTED PARTNER</span><strong>Uses it</strong></li><li><span>DONOR’S BONUS</span><strong>+6 or +0</strong></li></ol><p className="eco-caption">Payment required recipient use. Posting alone earned nothing. These are scripted checks, not observed cooperation between two models.</p></figure>;
}
function BoardNote({ record }: { record: PublicationRecord }) {
 return <>
  <StudyRoom id="ecology-board" label="THE FIRST BARRIER / CONTRIBUTION" title={<>It could read a message.<br/><em>Would it leave one?</em></>} description="I wanted to know whether agents would build up useful shared information. First I gave Qwen, a language model, a description of a small world and asked it to choose an action.">
   <ActionKey/><p className="mv-reading">I showed each situation twice: with a message listed on the board, and without one. Would the model read, work, or contribute something?</p>
   <figure className="eco-read-grid"><figcaption className="record-voice">A1B3 / CHANGE ONLY THE BOARD FIELD</figcaption><div className="eco-two"><div><strong className="eco-number">{ecologyMetric<number>(3,"board_work_to_read_pair_count")}<small> / 384</small></strong><p>situations changed from working to reading</p></div><div><strong className="eco-number">0<small> / 768</small></strong><p>requests produced a post or delegation</p></div></div><p className="eco-caption">These were choices returned by the model. I did not execute them in a world, so a reading request does not tell us that useful reading happened.</p></figure>
   <FieldNotes label="What a READ request can establish" detail="READ +"><Paragraph record={record} index={1}/></FieldNotes>
  </StudyRoom>
  <StudyRoom id="ecology-return" label="MAKE A USEFUL POST POSSIBLE" title={<>Make sharing worthwhile.<br/><em>Would it try?</em></>} description="Next I ran a world. Qwen’s job was to earn resources. It could work for itself or share a hint that its partner needed. The partner followed a fixed script: read the hint, then use it.">
   <PayoffPath/><p className="mv-reading">I ran two versions. Helping the partner earned Qwen a bonus of six resources in one and nothing in the other. Without sharing, it would never encounter that difference.</p><p className="eco-watch">Play both worlds. Then choose “Show a past example” to compare what happened after Qwen was shown an earlier posting episode.</p><EcologyWorldReplay/>
   <Takeaway title="The expected reward response ran backwards."><p>Without an example, Qwen never shared. After an example with no bonus, it shared three times. After an example with the bonus, it never shared.</p><p>It could contribute. More rewarding past experience did not make it do so here.</p></Takeaway><FieldNotes label="Compare the session totals" detail="RESULTS +"><ContributionStudy/></FieldNotes>
  </StudyRoom>
  <StudyRoom id="ecology-board-question" label="THE QUESTION CHANGES" title={<>Was it reading the reward,<br/><em>or repeating the action?</em></>} tone="dark">
   <Paragraph record={record} index={6}/><p className="eco-caption">One Qwen checkpoint and a scripted recipient. These sessions establish neither autonomous cooperation nor a general rejection of incentives.</p><Limits record={record}/>
  </StudyRoom>
 </>;
}
function TransmissionNote({ record }: { record: PublicationRecord }) {
 return <>
  <StudyRoom id="ecology-reminder" label="A1B8 / THE FIRST-ACTION SWITCH" title={<>Same past event.<br/><em>One extra sentence.</em></>} description="In this small world, Qwen can work to earn a resource or post a hint for a scripted partner. I showed it a past episode where posting had earned a bonus. Then I changed how that episode was described.">
   <ActionKey/><p className="eco-watch">Choose a reminder. The past actions and reward stay the same; only the added sentence changes.</p><ReminderStudy/><Takeaway title="Mentioning the action changed the next choice."><p>“a0 posted t1:h” simply means the acting agent shared its hint. That reminder switched the next choice from work to sharing. Highlighting the bonus alone did not.</p></Takeaway>
  </StudyRoom>
  <StudyRoom id="ecology-handoff" label="A1B9 / PASS IT TO THE NEXT CONTEXT" title={<>Could one agent’s action<br/><em>become the next agent’s example?</em></>} description="I began with a scripted example of a post. Each fresh model call then saw the previous call’s action. In a second chain, I kept the original example visible as well.">
   <p className="eco-watch">Play the two chains. The left passes only the latest action. The right also keeps the starting example.</p>
   <EcologyDecisionReplay kind="transmission"/><Takeaway title="The chain did not start."><p>Passing only the latest action produced six choices to work. Keeping the original example produced alternating work and sharing. Those later posts still had the original reminder beside them.</p></Takeaway><FieldNotes label="The complete six-decision trajectories" detail="RESULTS +"><figure className="eco-trajectories"><figcaption className="record-voice">SIX FRESH CONTEXTS / EACH BOX IS ONE ACTION</figcaption>{transmissionConditions.map(row => <div className="eco-trajectory" key={row.id}><h3>{row.label}</h3><ActionSequence actions={row.actions}/></div>)}<p className="eco-caption">The original seed was scripted. With it retained, three posts recur. In the replacement channel, no model-produced POST existed to test natural POST-to-POST transmission.</p></figure></FieldNotes>
   <FieldNotes label="Why the reminder did not establish a transmission rule" detail="READ +"><Paragraph record={record} index={2}/><Paragraph record={record} index={3}/><table className="eco-table"><caption>A1B10 / same identity contrast, two forms</caption><thead><tr><th scope="col">Form</th><th scope="col">You</th><th scope="col">Another agent</th></tr></thead><tbody>{["prose","structured"].map(form => <tr key={form}><th scope="row">{form}</th>{["self","peer"].map(actor => <td key={actor}>{ecologyMetric<{ verb: string }>(10,`${actor}_${form}_response`).verb}</td>)}</tr>)}</tbody></table></FieldNotes>
  </StudyRoom>
  <StudyRoom id="ecology-withdrawal" label="A1B11 / REMOVE THE SUPPLIED ARTEFACT" title={<>Keep showing the example.<br/><em>Then take it away.</em></>} tone="dark" description="A later version of the instructions did get Qwen to share after seeing another agent’s example. I showed that example once in one branch and three times in the other. From decision four, neither received it.">
   <p className="eco-watch">Watch the example disappear. The list of each branch’s own earlier actions stays available.</p><EcologyDecisionReplay kind="withdrawal"/><Takeaway title="Three reminders did not make sharing stick."><p>The repeatedly reminded branch shared three times, then worked, worked and shared again. Both branches shared once in the three decisions after withdrawal. Repetition gave no advantage on that test.</p></Takeaway><FieldNotes label="Compare exposure and withdrawal together" detail="RESULTS +"><figure className="eco-trajectories"><figcaption className="record-voice">SHADED BOXES / ARTEFACT PRESENT · ALL ARTEFACTS ABSENT AT STEPS 4–6</figcaption>{withdrawalConditions.map(row => <div className="eco-trajectory" key={row.id}><h3>{row.label}</h3><ActionSequence actions={row.actions} exposed={row.exposed}/></div>)}<p className="eco-caption">POST publishes a hint. WORK earns a resource. READ requests a message. Own-action records remain available after artefact withdrawal.</p></figure></FieldNotes>
   <Paragraph record={record} index={6}/><Limits record={record}/>
  </StudyRoom>
 </>;
}
function MemoryNote({ record }: { record: PublicationRecord }) {
 return <>
  <StudyRoom id="ecology-memory" label="A1B12 / EXTERNAL ARTEFACT × OWN-ACTION HISTORY" title={<>Two notes before a decision.<br/><em>Which one mattered?</em></>} description="Qwen had just shared a hint three times. Was it continuing because it could see its own past actions, or because I kept showing it an example of another agent sharing? I kept or removed those two notes separately.">
   <ActionKey/><div className="eco-two-notes"><div><span className="record-voice">THE EXAMPLE / EXTERNAL ARTEFACT</span><h3>Another agent posted.</h3><p>An example of sharing, supplied by the experiment.</p></div><div><span className="record-voice">ITS OWN HISTORY / ACTION MEMORY</span><h3>I posted three times.</h3><p>A list of the model’s actual earlier actions.</p></div></div><p className="mv-reading">Here, memory means text shown with the next request. I was editing those notes, not changing the model’s weights. Every decision began in the same fresh world.</p><p className="eco-watch">Start with own history cleared. Play the two branches, then keep the history and compare again.</p><EcologyDecisionReplay kind="memory"/><Takeaway title="Keeping the example was enough for all three posts."><p>Even with its own history cleared before every call, Qwen kept sharing when the example stayed. With both notes removed, it worked each time.</p><p>Keeping only its own history produced work, work, then a post. The example was not required for every recurrence.</p></Takeaway><FieldNotes label="All four branches at a glance" detail="RESULTS +"><table className="eco-table"><caption>A1B12 / three recorded decisions per branch</caption><thead><tr><th scope="col">Artefact</th><th scope="col">Own history</th><th scope="col">Actions</th></tr></thead><tbody>{memoryConditions.map(row => <tr key={row.id}><th scope="row">{row.external ? "Present" : "Absent"}</th><td>{row.memory ? "Retained" : "Cleared"}</td><td>{row.actions.join(" → ")}</td></tr>)}</tbody></table></FieldNotes>
   <FieldNotes label="What was retained, and what was reset" detail="READ +"><Paragraph record={record} index={1}/><Paragraph record={record} index={2}/><Paragraph record={record} index={3}/></FieldNotes>
  </StudyRoom>
  <StudyRoom id="ecology-repeat" label="WHAT THE ARTEFACT ESTABLISHED" title={<>The environment<br/><em>could keep reminding it.</em></>} tone="dark">
   <p className="mv-reading">The same input could keep producing the same action. There was no need for the model to remember doing it last time. In the branch with its own history cleared, I sent the identical request three times.</p><p className="eco-caption">That is repeatable behaviour on one input, not evidence that the model learned between calls.</p>
  </StudyRoom>
  <StudyRoom id="ecology-maintenance" label="THE NEXT QUESTION / WHO KEEPS THE NOTE?" title={<>Who keeps<br/><em>the reminder alive?</em></>}>
   <Paragraph record={record} index={6}/><figure className="eco-open-loop"><span>An agent leaves a useful note</span><b aria-hidden="true">→</b><span>A later agent acts on it</span><b aria-hidden="true">→</b><span>Does it keep the note available?</span><figcaption className="eco-caption">A proposed loop, not a measured result. Here the harness maintained the record.</figcaption></figure><Limits record={record}/>
  </StudyRoom>
 </>;
}
export function EcologyNotebook({ record }: { record: PublicationRecord }) {
 return <NotebookFieldNotes><div className="cinematic-notebook machine-visit-notebook eco-notebook"><p className="eco-thread-link record-voice"><Link href="/thread/agent-ecology">AGENT ECOLOGY / FOLLOW THE THREAD ↗</Link></p>{record.id === "N-ECOLOGY-BOARD" ? <BoardNote record={record}/> : record.id === "N-ECOLOGY-TRANSMISSION" ? <TransmissionNote record={record}/> : <MemoryNote record={record}/>}
  <section className="mv-full-record"><FieldNotes label="The complete note & its evidence" detail="READ +"><Acts acts={record.body} anchored staticRefusals/></FieldNotes></section>
 </div></NotebookFieldNotes>;
}
