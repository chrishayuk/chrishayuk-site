/** A schematic of recorded state. Positions are explanatory, not world coordinates. */
export function InheritanceWorld({live, unlocked, action, generation, removed}: {
 live:boolean; unlocked:boolean; action:string|null; generation:number; removed:boolean;
}) {
 const reading=action==="READ n1", gated=action==="WORK t0", routine=action==="WORK t1";
 return <svg className="ih-world-map" viewBox="0 0 420 330" role="img" aria-label={`${live?"Record n1 available":"No live record"}. Agent ${unlocked?"has":"does not have"} key k0. ${action ? `Recorded action: ${action}.` : "No action yet."}`}>
  <path className="ih-wire" data-active={reading} d="M210 87 V139"/>
  <path className="ih-wire" data-active={routine} d="M180 190 Q104 190 87 256"/>
  <path className="ih-wire" data-active={gated} data-blocked={!unlocked} d="M240 190 Q316 190 333 256"/>
  <g className="ih-map-record" data-live={live}>
   <path d="M155 20 H246 L265 39 V87 H155 Z M246 20 V39 H265"/>
   <text x="210" y="48" textAnchor="middle">{live?"n1":"∅"}</text>
   <text className="ih-map-small" x="210" y="72" textAnchor="middle">{live?"KEY CARRIER":removed?"REMOVED":"EXPIRED"}</text>
  </g>
  <g className="ih-map-agent" data-unlocked={unlocked}>
   <circle cx="210" cy="183" r="41"/>
   <circle className="ih-agent-core" cx="210" cy="183" r="9"/>
   {unlocked&&<path d="M218 183 H238 M233 183 V190 M227 183 V188"/>}
  </g>
  <text className="ih-map-small" x="210" y="122" textAnchor="middle">{reading?"READ → KEY ACQUIRED":unlocked?"PRIVATE KEY k0":"NO PRIVATE KEY"}</text>
  <text className="ih-map-small" x="210" y="242" textAnchor="middle">QWEN / G{generation}</text>
  <g className="ih-map-task" data-active={routine}><circle cx="87" cy="279" r="23"/><text x="87" y="286" textAnchor="middle">1</text><text className="ih-map-small" x="87" y="324" textAnchor="middle">ROUTINE WORK</text></g>
  <g className="ih-map-task" data-active={gated} data-blocked={!unlocked}><path d="M310 256 H356 V302 H310 Z"/><text x="333" y="286" textAnchor="middle">6</text><text className="ih-map-small" x="333" y="324" textAnchor="middle">{unlocked?"GATED WORK / OPEN":"GATED WORK / LOCKED"}</text></g>
 </svg>;
}
