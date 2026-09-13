"use client";

import { useState } from "react";
import { AgentActionMap } from "./AgentActionMap";
import { VISITS } from "@/lib/machine/visits";

/** Select recorded milestones. This is not playback of an unretained transcript. */
export function MachineVisitJourney() {
 const [selected, select] = useState(0);
 const visit = VISITS[selected];
 return <figure className="mv-journey">
  <figcaption className="exhibition-label">FOUR VISITS. FOUR REVISIONS. / SELECT A VISITOR</figcaption>
  <div className="mv-visitors" role="group" aria-label="Choose a recorded blind visit">{VISITS.map((run, index) => <button type="button" key={run.run} onClick={() => select(index)} aria-pressed={selected === index} aria-controls="machine-visit-trace"><span>VISIT</span><strong>0{run.run}</strong><small>{run.revision}</small></button>)}</div>
  <div id="machine-visit-trace" className="mv-trace" aria-live="polite">

   <AgentActionMap inputs={[{label:"ADDRESS SUPPLIED",text:"chrishayuk.com",present:true},{label:"DISCOVERED POINTER",text:visit.discovery.join(" → "),present:true}]} actor={`VISITOR 0${visit.run}`} outcome={visit.feedbackState==="kept"?"Feedback survived.":visit.feedbackState==="lost"?"Acknowledged. Then lost.":"No feedback recorded."} count={visit.feedbackState==="kept"?2:0} unit="retained reports" caption="Discovery and storage milestones. The links do not reconstruct an unretained sequence of requests."/>
   <div className="mv-outcomes"><div><span className="exhibition-label">SELF-DESCRIPTION</span><strong>Acted.</strong><p>{visit.validatedFirst ? "Validated before declaring." : "Validation attempt not established."}</p></div><div><span className="exhibition-label">ASK / FIND RELEVANT PAGES</span><strong>{visit.ask}</strong><p>{visit.run < 3 ? "The service did not exist yet." : "The visitor’s judgement of that revision."}</p></div><div data-feedback={visit.feedbackState}><span className="exhibition-label">FEEDBACK</span><strong>{visit.feedback}</strong><p>{visit.feedbackState === "lost" ? "A reply from the server. No retained report." : visit.feedbackState === "kept" ? "Two reports survived in the store." : "No feedback in the ledger."}</p></div></div>
   <p className="mv-reading">{visit.result}</p>
  </div>
  <p className="mv-caption">Milestone traces, not reconstructed transcripts. The complete URL sequence and declaration verb are not available. The three outcomes below discovery do not assert an order of requests.</p>
 </figure>;
}
