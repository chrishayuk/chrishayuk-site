import "@/app/agent-instruments.css";

type Input = {label:string; text:string; present:boolean};
/** Observed inputs beside an observed outcome. Links never assert an internal decision order. */
export function AgentActionMap({inputs, actor="AGENT", outcome, count, unit="records", reached=true, caption}: {
 inputs:Input[]; actor?:string; outcome:string; count?:number; unit?:string; reached?:boolean; caption:string;
}) {
 return <div className="agent-action-map">
  <div className="agent-map-layout">
   <div className="agent-map-inputs">{inputs.map(input=><div className="agent-input-sheet" key={input.label} data-present={input.present}><span className="record-voice">{input.label}</span><strong>{input.text}</strong><span className="agent-sheet-lines" aria-hidden="true"><i/><i/></span></div>)}</div>
   <div className="agent-map-person" data-reached={reached}><span className="agent-map-connector" aria-hidden="true"/><div className="agent-map-orbit" aria-hidden="true"><i/></div><span className="record-voice">{actor}</span><span className="agent-map-connector" aria-hidden="true"/></div>
   <div className="agent-map-output" data-positive={count!==undefined&&count>0}><span className="record-voice">RECORDED OUTCOME</span>{count!==undefined&&<div className="agent-output-marks" aria-label={`${count} ${unit}`}>{count>0?Array.from({length:count},(_,i)=><i key={i} aria-hidden="true"/>):<span className="agent-empty-mark" aria-hidden="true">∅</span>}</div>}<strong>{outcome}</strong>{count!==undefined&&<span className="record-voice">{count} {unit.toUpperCase()}</span>}</div>
  </div>
  <p className="agent-map-caption">{caption}</p>
 </div>;
}
