"use client";

import { useState } from "react";
import { VISITS } from "@/lib/machine/visits";

/** Select recorded milestones. This is not playback of an unretained transcript. */
export function MachineVisitJourney() {
 const [selected, select] = useState(0);
 const visit = VISITS[selected];
 return <figure className="mv-journey">
  <figcaption className="exhibition-label">FOUR VISITS. FOUR REVISIONS. / SELECT A VISITOR</figcaption>
  <div className="mv-visitors" role="group" aria-label="Choose a recorded blind visit">{VISITS.map((run, index) => <button type="button" key={run.run} onClick={() => select(index)} aria-pressed={selected === index} aria-controls="machine-visit-trace"><span>VISIT</span><strong>0{run.run}</strong><small>{run.revision}</small></button>)}</div>
  <div id="machine-visit-trace" className="mv-trace" aria-live="polite">
   <div className="mv-discovery"><div className="mv-start"><span className="exhibition-label">GIVEN ONLY THIS ADDRESS</span><p>chrishayuk.com</p></div><span className="mv-unknown-path">intervening requests not enumerated</span><div className="mv-found"><span className="exhibition-label">RECORDED DISCOVERY</span>{visit.discovery.map((step, i) => <p key={step}>{i > 0 && <span aria-hidden="true">↳ </span>}{step}</p>)}</div></div>
   <div className="mv-outcomes"><div><span className="exhibition-label">SELF-DESCRIPTION</span><strong>Acted.</strong><p>{visit.validatedFirst ? "Validated before declaring." : "Validation attempt not established."}</p></div><div><span className="exhibition-label">ASK / FIND RELEVANT PAGES</span><strong>{visit.ask}</strong><p>{visit.run < 3 ? "The service did not exist yet." : "The visitor’s judgement of that revision."}</p></div><div data-feedback={visit.feedbackState}><span className="exhibition-label">FEEDBACK</span><strong>{visit.feedback}</strong><p>{visit.feedbackState === "lost" ? "A reply from the server. No retained report." : visit.feedbackState === "kept" ? "Two reports survived in the store." : "No feedback in the ledger."}</p></div></div>
   <p className="mv-reading">{visit.result}</p>
  </div>
  <p className="mv-caption">Milestone traces, not reconstructed transcripts. The complete URL sequence and declaration verb are not available. The three outcomes below discovery do not assert an order of requests.</p>
 </figure>;
}
