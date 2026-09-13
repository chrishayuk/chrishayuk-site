import "@/app/ecology-notebook.css";

export function EcologyCard({ id }: { id: string }) {
 if (id === "N-ECOLOGY-INHERITANCE") return <div className="eco-card"><span className="record-voice">AGENT ECOLOGY / INHERITANCE</span><p>Sol leaves.<br/><em>What survives?</em></p><div className="eco-card-marks"><span>WITH THE RECORD / QWEN 7 · GEMMA 7</span></div></div>;
 const board = id === "N-ECOLOGY-BOARD", transmission = id === "N-ECOLOGY-TRANSMISSION";
 return <div className="eco-card"><span className="record-voice">AGENT ECOLOGY / {board ? "CONTRIBUTION" : transmission ? "TRANSMISSION" : "EXTERNAL MEMORY"}</span><p>{board ? <>A place to read.<br/><em>Who writes?</em></> : transmission ? <>An action appeared.<br/><em>Would it travel?</em></> : <>Clear the history.<br/><em>Keep the reminder.</em></>}</p><div className="eco-card-marks" aria-hidden="true"><span>{board ? "POSTS / 0" : transmission ? "THE NEXT ACTION" : "RECORDED / POST"}</span>{[0,1,2].map(i => <i key={i} data-post={!board && !transmission}/>)}</div></div>;
}
