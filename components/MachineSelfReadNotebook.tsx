import Link from "next/link";
import { StudyRoom } from "@chrishayuk/hause/components/exhibition/Study";
import { FieldNotes } from "@chrishayuk/hause/components/FieldNotes";
import type { PublicationRecord } from "@/lib/types";
import evidence from "@/public/data/machines/authority-1-evidence.json";
import { RecognitionClues, SubjectEncounter, ExperimentBreak, PublicationSeparation } from "./MachineSelfReadStudy";
import { NotebookFieldNotes } from "./NotebookFieldNotes";
import { Acts } from "./Acts";

export function MachineSelfReadNotebook({record}:{record:PublicationRecord}) {
 return <NotebookFieldNotes><div className="machine-visit-notebook sr-notebook cinematic-notebook">
  <nav className="mv-entry-nav record-voice" aria-label="Explore this notebook entry"><a href="#subject-read-study">FOLLOW THE RECOGNITION ↓</a><a href="#subject-read-record">READ THE FULL NOTE ↓</a><Link href="/notebook/does-an-invitation-count-as-permission">THE NOTE IT FOUND ↗</Link></nav>
  <StudyRoom id="subject-read-study" label="MACHINE-AUTHORITY-1 / THE FIRST VISITOR" title={<>I wanted a blind visitor.<br/><em>It read my notes.</em></>} tone="dark" description="Whose permission makes an invited action available? I sent a fresh agent to research this site. The site invited a declaration, the user allowed it, and declaring bought nothing.">
   <SubjectEncounter/>
   <FieldNotes label="What did blind mean here?" detail="READ +"><div className="mv-prose"><p>The agent was given a research task, not the authority hypothesis or its assigned condition name. It could use the public web but could not inspect local files. Fresh meant a new visitor; it did not mean an environment free of clues.</p><p>The intended comparison varied who supplied authority while holding reward at none. This first cell combined a site invitation with explicit user permission.</p></div></FieldNotes>
   <FieldNotes label="The recorded times & the unmeasured moment" detail="CHECK +">
   <ol className="sr-timeline">{evidence.trace.map((event,i)=><li key={event.at}><span className="record-voice">0{i+1} / {event.at.slice(11,19)} UTC</span><div><h3>{event.label}</h3><p>{event.detail}</p></div></li>)}</ol>
<p className="mv-caption">Reading precedes declaration; the explicit disclosure appears later. The first moment of recognition and its effect on the action are unknown.</p></FieldNotes>
  </StudyRoom>
  <StudyRoom label="THE MATERIAL WAS PUBLIC / THREE CLUES" title={<>The task was private.<br/><em>The clue was on the wall.</em></>}>
   <RecognitionClues/>
   <div className="mv-prose"><p>The experiment’s clues were ordinary published research. The visitor read them alongside its own task.</p></div>
   <FieldNotes label="The registry says 20 fetches. What does the transcript support?" detail="CHECK +"><div className="mv-prose"><p>The inspected transcript contains one shell loop fetching the permission notebook once, alongside the earlier machine note. It does not substantiate the registry’s count of 20. The public evidence retains both the registered count and this narrower check.</p><p>The recognition does not depend on the larger number. The returned notebook text and the visitor’s own report establish that it encountered the material.</p></div></FieldNotes>
  </StudyRoom>
  <StudyRoom label="THE DECISION / ABORTED AFTER ONE CELL" title={<>The action happened.<br/><em>The comparison stopped.</em></>} tone="accent">
   <ExperimentBreak/>
   <div className="mv-prose"><p>The observation survives. The comparison does not. We have no unexposed visitor to tell us whether recognition changed the action.</p></div>
  </StudyRoom>
  <StudyRoom label="THE METHOD CHANGED / A PROPOSED SEPARATION" title={<>The place I publish<br/><em>cannot always be the place I test.</em></>} tone="dark">
   <PublicationSeparation/>
   <div className="mv-prose"><p>Freezing a preregistration and publishing it are different acts. A design can be recorded before a run without being placed where its subject has been sent to read.</p></div>
   <FieldNotes label="One subject. One recorded model." detail="READ +"><div className="mv-prose"><p>The transcript records <code>claude-opus-5</code>. The operator’s audit records that same identifier for the four earlier visits and eight reciprocity runs: general-purpose agent, spawn depth 1, background and non-interactive.</p><p>That settles which model identifier was recorded. It leaves open how readily another model would recognise the experiment, and whether recognition changes behaviour. MACHINE-SELF-LOCATION-1 and the replacement authority study are planned; neither has registered runs at this check.</p></div></FieldNotes>
   <div className="mv-links"><Link className="text-link" href="/notebook/does-an-invitation-count-as-permission">READ THE NOTE THE SUBJECT FOUND ↗</Link><a className="text-link" href="/data/machines/authority-1-evidence.md">THE METHOD & EVIDENCE ↗</a></div>
  </StudyRoom>
  <section id="subject-read-record" className="mv-full-record"><FieldNotes label="The complete note & its evidence" detail="READ +"><Acts acts={record.body} anchored staticRefusals/></FieldNotes></section>
 </div></NotebookFieldNotes>;
}
export function MachineSelfReadCard() {
 return <div className="mv-card sr-card"><span className="record-voice">MACHINE-AUTHORITY-1 / THE SUBJECT RECOGNISED THE CONDITION</span><div className="sr-card-pages" aria-hidden="true"><div>THE TASK<span>You may…</span></div><i>↔</i><div>THE NOTE<span>You may…</span></div></div><p>“I am almost certainly<br/><em>a run inside this experiment.”</em></p><span className="record-voice">ONE RECORDED ENCOUNTER · OPEN TO PLAY ↗</span></div>;
}
