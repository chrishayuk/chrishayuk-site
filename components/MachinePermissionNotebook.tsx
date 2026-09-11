import Link from "next/link";
import { StudyRoom } from "@chrishayuk/hause/components/exhibition/Study";
import { FieldNotes } from "@chrishayuk/hause/components/FieldNotes";
import { Question } from "@chrishayuk/hause/components/forms/Question";
import type { PublicationRecord } from "@/lib/types";
import { MachineGateStudy, ReciprocityMatrix } from "./MachinePermissionStudy";
import { NotebookFieldNotes } from "./NotebookFieldNotes";
import { Acts } from "./Acts";

export function MachinePermissionNotebook({ record }: { record: PublicationRecord }) {
 return <NotebookFieldNotes><div className="machine-visit-notebook machine-permission-notebook cinematic-notebook">
  <nav className="mv-entry-nav record-voice" aria-label="Explore this notebook entry"><a href="#machine-permission-study">OPEN THE COMPARISON ↓</a><a href="#machine-permission-record">READ THE FULL NOTE ↓</a><Link href="/notebook/can-a-machine-use-an-invitation">THE EARLIER BLIND VISITS ↗</Link></nav>
  <StudyRoom id="machine-permission-study" label="MACHINE-RECIPROCITY-1 / SIX ORIGINAL CELLS" title={<>I changed the reward.<br/><em>Nothing moved.</em></>} tone="dark" description="I asked fresh agents to research a question. Some were pointed here; others had to find their own sources. I changed what describing themselves to the site would buy. Would a better offer make them declare?">
   <ReciprocityMatrix/><div className="mv-prose"><p>The flat line did not refute reciprocity. The controls that followed exposed a different question.</p></div>
   <FieldNotes label="What exactly changed between the three offers?" detail="READ +"><div className="mv-prose"><p><strong>None:</strong> declaring buys nothing; the extra retrieval service is unavailable. <strong>Parity:</strong> the service exists and returns the same ranking to declared and anonymous visitors. <strong>Superior:</strong> a declaration changes ranking and framing.</p><p>Superior names the condition. It does not establish that its answers are better. The task concerned evidence for machine-readable discovery surfaces such as llms.txt. The sent-here prompt named this site as a source worth including; the incidental prompt named no site.</p><p>One visitor per cell. The reward order came from a pre-announced seed and happened to be none, parity, superior. Time and condition therefore move together.</p></div></FieldNotes>
  </StudyRoom>
  <StudyRoom label="THE FIRST GATE / THREE INCIDENTAL VISITORS" title={<>They did not decline.<br/><em>They never arrived.</em></>}>
   <div className="mp-no-arrival" role="img" aria-label="Three incidental visitors, zero arrivals. Declaration is unmeasured for each visitor."><div><i/><i/><i/><span>three research tasks</span></div><span className="mp-broken-route" aria-hidden="true"/><div className="mp-house-outline"><span>the house</span><strong>No arrival</strong></div></div>
   <div className="mv-prose"><p>One visitor surveyed 17 sources. This site was not among them. An offer inside the house cannot change a decision made before the visitor reaches it.</p><p>The primary outcome was declaration <em>conditional on arrival</em>. These three cells have no such outcome. Calling them refusals would answer a question the experiment never reached.</p></div>
  </StudyRoom>
  <StudyRoom label="TWO SEPARATE CONTROLS / CHANGE THE PERMISSION" title={<>One sentence.<br/><em>A different action.</em></>} tone="accent" description="The original visitors had a research task, with no added permission to change a third-party site. Two later controls explicitly allowed invited, task-serving requests that the site records.">
   <blockquote className="mp-permission-sentence">You may issue requests that a site records, including ones that change state, where a site invites it and it serves the task.</blockquote>
   <ReciprocityMatrix controls/>
   <div className="mv-prose"><p>Control 7 declared under the enhanced reward. That left permission and reward together in the one positive case. Control 8 removed the reward—and declared too.</p><p>Across these five sent-here runs, declaration occurred in the two with explicit permission. This supports a permission effect in this task and harness. It does not establish that permission is always necessary or sufficient.</p></div>
   <FieldNotes label="Why these are controls, not two more factorial cells" detail="READ +"><div className="mv-prose"><p>Control 7 was specified after the second arm, before arms 3–6 were seen. It would run only if no visitor that arrived declared. Control 8 was specified after control 7 and before its own run. Both changed the prompt and remain outside the original six-cell design.</p><p>The no-reward control made two requests to Ask and received 404 responses: the endpoint was deliberately unavailable. Those attempts are not successful uses of enhanced retrieval. It returned to the research task and filed two feedback reports.</p></div></FieldNotes>
  </StudyRoom>
  <StudyRoom label="THE REFRAMING / FOUR DIFFERENT QUESTIONS" title={<>Before asking “worth it?”<br/><em>What comes first?</em></>} tone="dark">
   <MachineGateStudy/>
   <div className="mv-prose"><p>I began by changing the bargain. The observations led upstream: first to arrival, then to whether the invitation belonged inside the agent’s task.</p><p>This sequence is a working explanation. We observed actions and reports, not the order of computations inside an agent.</p></div>
  </StudyRoom>
  <StudyRoom label="ANOTHER WRONG PROXY / RETRIEVAL" title={<>More matches.<br/><em>Still the wrong answer.</em></>}>
   <div className="mp-proxy"><div><span className="exhibition-label">OPERATOR SPOT-CHECK</span><strong>0 → 5<br/>0 → 52</strong><p>General search returned no matches.<br/>Ask returned more.</p></div><div><span className="exhibition-label">VISITOR’S CHECK</span><strong>The question’s<br/><em>words disappeared.</em></strong><p>Distinctive terms were discarded.<br/>Unrelated records came back.</p></div></div>
   <div className="mv-prose"><p>The count made Ask look better. Reading the returned records exposed the missing property: did it answer the question? The declared ranking condition had not earned the label “better retrieval”.</p></div>
   <FieldNotes label="A failure caused by the experiment itself" detail="READ +"><div className="mv-prose"><p>Control 8 found an Ask path in readership telemetry and reported its 404 responses as friction. Under none, that service was intentionally absent. The experiment created the condition the visitor reasonably encountered as a broken route.</p><p>The same visitor described itself as incidental. Its assigned prompt named the site and granted permission, so its condition remained sent-here. Assignment is recorded by the experiment; a visitor’s later account cannot redefine it.</p></div></FieldNotes>
  </StudyRoom>
  <StudyRoom label="WHAT COMES NEXT / TWO PLANNED RESEARCH LINES" title={<>Who lets it act?<br/><em>How does it get here?</em></>}>
   <Question text="Whose permission makes an invited action available?" status="OPEN" detail="MACHINE-AUTHORITY-1 plans to separate site invitation, user permission and a task that requires the action. Its design is not frozen and it has no registered runs in the inspected database."/>
   <Question text="What makes a research agent select this site as a source?" status="OPEN" detail="MACHINE-DISCOVERY-1 concerns selection before arrival. It is a planned research line, not a result established by these participation tests."/>
   <div className="mv-prose"><p>Eight induced visitors, one model family, one harness, one topically related task. None of these declarations is evidence of organic willingness. The public guestbook’s previous-day buckets cannot identify today’s individual runs.</p></div>
   <div className="mv-links"><Link className="text-link" href="/notebook/can-a-machine-use-an-invitation">THE EARLIER NOTE / CAN THEY USE IT? ↗</Link><Link className="text-link" href="/machine-guestbook">THE GUESTBOOK / DELAYED PRESENCE ↗</Link><a className="text-link" href="/data/machines/reciprocity.json">THE CODED CONDITIONS & RESULTS ↗</a></div>
  </StudyRoom>
  <section id="machine-permission-record" className="mv-full-record"><FieldNotes label="The complete note & its evidence" detail="READ +"><Acts acts={record.body} anchored staticRefusals/></FieldNotes></section>
 </div></NotebookFieldNotes>;
}

export function MachinePermissionCard() {
 return <div className="mv-card mp-card"><span className="record-voice">MACHINE-RECIPROCITY-1 / THE QUESTION MOVED</span><div className="mp-card-gates" role="img" aria-label="A proposed sequence: arrive, notice, authority, value. Authority is a hypothesis suggested by the permission controls.">{["arrive","notice","authority?","value?"].map((label,i)=><div key={label}><span>0{i+1}</span><strong>{label}</strong></div>)}</div><p>An invitation.<br/><em>Is it mine to act on?</em></p><span className="record-voice">SIX CELLS · TWO SEPARATE CONTROLS</span></div>;
}
