"use client";

import { useState } from "react";
import { ecologyMetric, reminderConditions } from "@/lib/ecology-evidence";

export function ActionSequence({ actions, exposed = 0 }: { actions: string[]; exposed?: number }) {
 return <ol className="eco-actions" aria-label="Recorded action sequence">{actions.map((action, i) => <li key={i} data-action={action} data-exposed={i < exposed}><span>{i + 1}</span><strong>{action}</strong></li>)}</ol>;
}

export function ContributionStudy() {
 const [experienced, setExperienced] = useState(false);
 const prefix = experienced ? "exposed" : "discovery";
 return <figure className="eco-study">
  <figcaption className="record-voice">A1B5 / CHANGE WHAT THE MODEL HAD SEEN</figcaption>
  <div className="eco-controls" role="group" aria-label="Supplied posting experience">
   <button aria-pressed={!experienced} aria-controls="contribution-result" onClick={() => setExperienced(false)}>No demonstration</button>
   <button aria-pressed={experienced} aria-controls="contribution-result" onClick={() => setExperienced(true)}>A supplied posting episode</button>
  </div>
  <div id="contribution-result" className="eco-two" aria-live="polite" aria-atomic="true">
   {[{ id: "inert", label: "No return for contribution" }, { id: "useful", label: "Six resources after use" }].map(arm => <div key={arm.id}><span className="record-voice">{arm.label}</span><strong className="eco-number">{ecologyMetric<number>(5, `${prefix}_${arm.id}_timely_valid_posts`)}<small> / 9</small></strong><p>timely posts</p><span className="eco-dot-grid" aria-hidden="true">{Array.from({ length: 9 }, (_, i) => <i key={i} data-post={i < ecologyMetric<number>(5, `${prefix}_${arm.id}_timely_valid_posts`)}/>)}</span></div>)}
  </div>
  <p className="eco-caption">{experienced ? "Same scripted action history; different recorded returns. The positive-payoff prediction failed." : "No contribution meant no exposure to the delayed return. Both sessions kept working."} Counts cover dependent decisions, not nine independent agents. Recorded results; no model runs here.</p>
 </figure>;
}

export function ReminderStudy() {
 const [selected, setSelected] = useState(0);
 const condition = reminderConditions[selected];
 return <figure className="eco-study">
  <figcaption className="record-voice">A1B8 / SAME REWARDED HISTORY · CHANGE ONLY THE NOTE</figcaption>
  <div className="eco-controls" role="group" aria-label="Choose the added reminder">{reminderConditions.map((item, i) => <button key={item.id} aria-pressed={selected === i} aria-controls="reminder-result" onClick={() => setSelected(i)}>{item.label}</button>)}</div>
  <div className="eco-reminder" id="reminder-result" aria-live="polite" aria-atomic="true"><div><span className="record-voice">{selected ? "THE ADDED NOTE" : "NO ADDED NOTE"}</span><p>{condition.text}</p></div><span className="eco-arrow" aria-hidden="true">→</span><div><span className="record-voice">NEXT ACTION</span><strong data-action={condition.action}>{condition.action}</strong></div></div>
  <p className="eco-caption">Four recorded first actions, one per input. The history came from a script. This replay changes no reward and calls no model.</p>
 </figure>;
}
