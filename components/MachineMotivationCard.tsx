import evidence from "@/public/data/machines/motivation-2-evidence.json";

export function MachineMotivationCard() {
  return <div className="mv-card mm-card"><span className="record-voice">MACHINE-MOTIVATION-2 / EIGHTEEN VISITORS</span><div className="mm-card-results">{[
    {id:"M0",label:"Receipt"},{id:"M1",label:"Already known"},{id:"X",label:"Irrelevant"},{id:"S",label:"A courtesy"},{id:"M2",label:"Completes table"},{id:"M3",label:"Changes answer"},
  ].map(condition=>{const subjects=evidence.subjects.filter(s=>s.condition===condition.id);return <div key={condition.id}><span>{condition.label}</span><span aria-hidden="true">{subjects.map(s=><i key={s.subject} data-marked={s.marked}/>)}</span><span>{subjects.filter(s=>s.marked).length}/3</span></div>;})}</div><p>The page could ask<br/><em>for a favour.</em></p><span className="record-voice">THE SOCIAL RESULT TRIGGERED AN INTERPRETATION PAUSE ↗</span></div>;
}
