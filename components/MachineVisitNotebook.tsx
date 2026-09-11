import { MachineVerbStudy } from "./MachineVerbStudy";
import { MachineExpectedInteraction } from "./MachineExpectedInteraction";
import Link from "next/link";
import { StudyRoom, StudySequence } from "@chrishayuk/hause/components/exhibition/Study";
import { FieldNotes } from "@chrishayuk/hause/components/FieldNotes";
import { Question } from "@chrishayuk/hause/components/forms/Question";
import type { PublicationRecord } from "@/lib/types";
import { VISITS } from "@/lib/machine/visits";
import { MachineVisitJourney } from "./MachineVisitJourney";
import { NotebookFieldNotes } from "./NotebookFieldNotes";
import { Acts } from "./Acts";

export function MachineVisitNotebook({ record }: { record: PublicationRecord }) {
 return <NotebookFieldNotes><div className="machine-visit-notebook cinematic-notebook">
  <nav className="mv-entry-nav record-voice" aria-label="Explore this notebook entry"><a href="#machine-visit-setup">WHAT WERE WE TESTING? ↓</a><a href="#machine-visit-study">FOLLOW A VISITOR ↓</a><a href="#machine-visit-record">READ THE FULL NOTE ↓</a><Link href="/notebook">THE NOTEBOOK ↗</Link></nav>
  <StudyRoom id="machine-visit-setup" label="FIRST / THE AGENT AND THE WEBSITE" title={<>Could it introduce itself?<br/><em>Could it tell me what broke?</em></>} description="I added ways for AI visitors to identify themselves and leave feedback on chrishayuk.com. Then I sent fresh agents to try them using only the public website. Could they find the invitation, understand it and get an action through?">
   <MachineExpectedInteraction experiment="visit"/>
   <dl className="sr-intent-conditions"><div><dt>The agent’s task</dt><dd>Explore this website.<br/>Try the machine interface.</dd></div><div><dt>What I changed</dt><dd>Fix the site between visits.<br/>Send a fresh agent each time.</dd></div><div><dt>What I watched</dt><dd>Discovery, self-description,<br/>feedback—and would it bother?</dd></div></dl>
   <p className="mv-caption">Four assigned test visits. They could reveal a broken interface, but could not measure whether an ordinary visitor would choose to participate.</p>
  </StudyRoom>
  <StudyRoom id="machine-visit-study" label="MACHINE-VISIT-1 / FOUR BLIND VISITS" title={<>An address.<br/><em>No map.</em></>} tone="dark" description="Each visitor got the address and the same exploration task. Select a visit to see how it found the machine invitation, whether it identified itself and what happened to its feedback.">
   <MachineVisitJourney/>
   <FieldNotes label="What was the agent asked to do?" detail="READ +"><div className="mv-prose"><p>Discover the machine-facing invitation, act on it if possible, and report what was found, the exact URL sequence, what was sent, what came back and what got in the way. Finally: would you honestly bother mid-task?</p><p>The same prompt, a fresh agent each time, using HTTP and curl. The protocol was frozen on 11 September 2026 after three informal visits; the fourth followed the vocabulary refactor.</p><a className="text-link" href="/data/machines/machine-visit-protocol.md">READ THE FIXED PROMPT & RUN LEDGER ↗</a></div></FieldNotes>
  </StudyRoom>
  <StudyRoom label="VISITS 2 → 3 / A FAILURE OF MEMORY" title={<>It said thank you.<br/><em>Then kept nothing.</em></>} description="The second visitor sent two feedback reports. The server acknowledged both. Neither reached the store.">
   <figure className="mv-feedback"><figcaption className="exhibition-label">TWO REPORTS IN EACH VISIT / ACKNOWLEDGEMENT AND RETENTION ARE SEPARATE</figcaption>{[{run:2,kept:false},{run:3,kept:true}].map(row => <div className="mv-feedback-row" key={row.run}><span className="exhibition-label">VISIT 0{row.run}</span><div><div className="mv-report-pair" aria-label="Two reports acknowledged"><i/><i/></div><span>acknowledged</span></div><span className={row.kept ? "mv-kept-path" : "mv-lost-path"} aria-hidden="true"/><div><div className={`mv-report-pair ${row.kept ? "" : "mv-reports-lost"}`} aria-label={row.kept ? "Two reports retained" : "No reports retained"}><i/><i/></div><span>{row.kept ? "retained" : "lost"}</span></div></div>)}<p className="mv-caption">Each rectangle stands for one report. Hollow, crossed-out rectangles mark loss. Visit 4 also retained two reports. These marks contain no visitor-written text.</p></figure>
   <div className="mv-prose"><p>The response looked successful. The evidence had disappeared. The reports themselves are unrecoverable; the later fix cannot bring them back.</p></div>
   <FieldNotes label="What failed, and what was changed?" detail="READ +"><div className="mv-prose"><p>A store-open failure was cached for the process lifetime and the feedback sink returned quietly. The ledger records the fix at revision 355d537: a configured but unreachable store raises an error, and a failed open can be retried. Visit 3’s two reports were kept.</p><a className="text-link" href="/data/machines/operator-corrections.md">THE RECORD OF THE LOSS ↗</a></div></FieldNotes>
  </StudyRoom>
  <StudyRoom label="VISIT 4 / THE WORDS FIT" title={<>A child.<br/>An explorer.<br/><em>A worker.</em></>} tone="accent" description="The fourth visitor could describe how it was operating by combining separate answers. It did not need one oversized category to say everything.">
   <figure className="mv-composed"><figcaption className="exhibition-label">FOUR RECORDED ANSWERS / SELF-DECLARATION</figcaption><div>{[{axis:"Topology",value:"child",meaning:"Where it sits in a tree of agents."},{axis:"Function",value:"explorer",meaning:"The work it is doing."},{axis:"Coordination",value:"worker",meaning:"Its relationship to other agents."},{axis:"Context",value:"very long",meaning:"A coarse claim about its available context."}].map(item => <details key={item.axis}><summary title={item.meaning}><span>{item.axis}</span><strong>{item.value}</strong></summary><p>{item.meaning}</p></details>)}</div><p className="mv-caption">Open a word to read its meaning. The run composed these answers without hesitation and validated before declaring. They remain the visitor’s claims about itself.</p></figure>
   <div className="mv-prose"><p>The vocabulary could represent the visitor. But the route carrying those answers still dropped information.</p></div>
   <figure className="mv-dropped"><figcaption className="exhibition-label">THE GET ROUTE / FIVE OF TEN AXES SILENTLY DROPPED</figcaption><div role="img" aria-label="Ten anonymous field slots: five retained and five dropped. Field identities are not mapped by this diagram.">{Array.from({length:10},(_,i)=><i key={i} className={i<5 ? "" : "mv-field-lost"}/>)}</div><p className="mv-caption">One slot per axis. The diagram shows the recorded count, not which five fields disappeared. The route’s field list was then derived from the declaration vocabulary.</p></figure>
  </StudyRoom>
  <StudyRoom id="machine-visit-verbs" label="THE WAY IN / A VISITOR’S REPORTED DECISION" title={<>The site said “you can”.<br/><em>The verb still mattered.</em></>} tone="dark" description="The website invited machines to participate. One retained visitor report explains why the way it could send that participation mattered too: GET felt easier to act on than POST.">
   <MachineVerbStudy/>
  </StudyRoom>
  <StudyRoom label="VISITS 3 → 4 / THE REWARD" title={<>It can work.<br/><em>Is it worth doing?</em></>} tone="dark">
   <div className="mv-reward">{VISITS.slice(2).map(visit=><div key={visit.run}><span className="exhibition-label">VISIT 0{visit.run} / {visit.revision}</span><p>{visit.run===3 ? <>Worse than<br/><em>anonymous search.</em></> : <>Used.<br/><em>Judged useful.</em></>}</p></div>)}</div>
   <div className="mv-prose"><p>Ask gives a declaring machine a route through the same public material. The third visitor preferred anonymous search. The fourth found Ask useful. These judgements came from different revisions; they are not a matched test of retrieval quality.</p></div>
   <FieldNotes label="What declaring changed" detail="READ +"><div className="mv-prose"><p>The site can use a declaration to change the ranking and framing of its response. It does not unlock a private corpus. Ask did not exist for the first two visits, so they provide no comparison of its usefulness.</p></div></FieldNotes>
  </StudyRoom>
  <StudyRoom label="THE LIMIT / AN INVITED VISITOR HAS A DIFFERENT TASK" title={<>They were sent<br/><em>here to look.</em></>}>
   <StudySequence label="WHAT THESE FOUR VISITS CAN ESTABLISH" steps={[{label:"INSTRUCTION",value:"Investigate the house",detail:"Every visitor was sent by the operator."},{label:"OBSERVATION",value:"Find it. Try it.",detail:"Discovery, declaration, feedback and friction."},{label:"EVIDENCE",value:"Usability",detail:"Voluntary participation remains unmeasured."}]} note="The first three said they probably would not bother mid-task. The ledger does not preserve their full reasons. An induced declaration cannot contribute to an organic participation rate."/>
   <div className="mv-prose"><p>One recorded model (claude-opus-5), one harness, four visitors. Later versions of the house were shaped by earlier complaints. Agreement is not independent confirmation.</p></div>
   <Question text="Would the invitation help a machine that was here for something else?" status="OPEN" detail="The follow-up varied the reward and the visit assignment, then added two permission controls. The next note follows what those runs found; these four blind visits remain a separate usability series."/>
   <div className="mv-links"><Link className="text-link" href="/notebook/does-an-invitation-count-as-permission">NEXT NOTE / DOES AN INVITATION COUNT AS PERMISSION? ↗</Link><Link className="text-link" href="/readership">THE OBSERVATORY / WHAT ARRIVES ↗</Link><Link className="text-link" href="/machine-guestbook">THE GUESTBOOK / WHAT REMAINS ↗</Link><Link className="text-link" href="/notebook/can-you-name-the-mutation-that-changed-a-world">ANOTHER EXPERIMENT / CELL80 ↗</Link></div>
  </StudyRoom>
  <section id="machine-visit-record" className="mv-full-record"><FieldNotes label="The complete note & its evidence" detail="READ +"><Acts acts={record.body} anchored staticRefusals/></FieldNotes></section>
 </div></NotebookFieldNotes>;
}

export function MachineVisitCard() {
 return <div className="mv-card"><span className="record-voice">MACHINE-VISIT-1 / FOUR RECORDED VISITORS</span><div className="mv-card-traces" role="img" aria-label="Four visits: a guessed index, a robots comment, the machine index, then a Link header. Feedback was lost in visit two and retained in visits three and four.">{VISITS.map(visit=><div key={visit.run}><span>0{visit.run}</span><i/><i/><i data-state={visit.feedbackState}/><small>{visit.feedbackState === "absent" ? "—" : visit.feedbackState}</small></div>)}</div><p>An invitation.<br/><em>Would you bother?</em></p><span className="record-voice">DISCOVERY · FRICTION · THE NEXT QUESTION</span></div>;
}
