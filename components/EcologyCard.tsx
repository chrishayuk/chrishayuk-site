import "@/app/ecology-notebook.css";
import "@/app/visual-studies.css";
import replication from "@/public/data/ecology/i2-summary.json";

import { RecoveryResult } from './RecoveryResult';

export function EcologyCard({ id }: { id: string }) {
 if (id === "N-ECOLOGY-RECOVERY") return <RecoveryResult compact/>;
 if (id === "N-ECOLOGY-WORLD-REMEMBERS") return <div className="eco-written-card"><span className="record-voice">AGENT ECOLOGY / WRITTEN INHERITANCE</span><div className="eco-written-lineage" aria-label="Founder record, written descendant, later generations"><span>RECORD</span><b aria-hidden="true">→</b><span>REWRITE</span><b aria-hidden="true">→</b><span>INHERIT</span></div><p>The founder leaves.<br/><em>The successors keep writing.</em></p><span className="record-voice">43 FAITHFUL RENEWALS · SIX GENERATIONS<br/>I6 / RECORDED RESULTS</span></div>;
 if (id === "N-ECOLOGY-INHERITANCE") return <div className="mv-card eco-inheritance-card"><span className="record-voice">AGENT ECOLOGY / THE RECORDED HANDOFF</span><div className="eco-inheritance-flow"><div className="eco-inheritance-source"><span className="record-voice">SOL</span><strong>Preserves a useful record</strong></div><span className="eco-inheritance-arrow" aria-hidden="true">↓</span><div className="eco-inheritance-recipients">{replication.panels.map(panel=><div key={panel.recipient}><span className="record-voice">{panel.recipient==="qwen"?"QWEN":"GEMMA"}</span><strong>{panel.analysis.arms.inherit.resources[0]}</strong><span className="record-voice">RESOURCES</span></div>)}</div><span className="eco-inheritance-arrow" aria-hidden="true">↓</span><span className="record-voice">NEITHER RECIPIENT RENEWED THE RECORD</span></div><p>A useful inheritance.<br/><em>One generation.</em></p><span className="record-voice">FIRST SUCCESSOR / RECORD RETAINED ↗</span></div>;
 const board = id === "N-ECOLOGY-BOARD", transmission = id === "N-ECOLOGY-TRANSMISSION";
 return <div className="eco-card"><span className="record-voice">AGENT ECOLOGY / {board ? "CONTRIBUTION" : transmission ? "TRANSMISSION" : "EXTERNAL MEMORY"}</span><p>{board ? <>A place to read.<br/><em>Who writes?</em></> : transmission ? <>An action appeared.<br/><em>Would it travel?</em></> : <>Clear the history.<br/><em>Keep the reminder.</em></>}</p><div className="eco-card-marks" aria-hidden="true"><span>{board ? "POSTS / 0" : transmission ? "THE NEXT ACTION" : "RECORDED / POST"}</span>{[0,1,2].map(i => <i key={i} data-post={!board && !transmission}/>)}</div></div>;
}
