"use client";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { useMotion } from "./Motion";
export function SystemStudy({ variant = "model" }: { variant?: "model" | "query" }) {
  const id = useId(); const ref = useRef<HTMLDivElement>(null); const [active, setActive] = useState(false); const { register, request, setPaused } = useMotion();
  useEffect(() => { if (!ref.current) return; return register({ id, element: ref.current, start: () => setActive(true), stop: () => setActive(false) }); }, [id,register]);
  return <div ref={ref} className={`system-study ${variant} ${active ? "running" : ""}`}>
    <div className="system-object" aria-hidden="true">{Array.from({ length: 12 }, (_,i) => <div className="tensor-slice" key={i} style={{ "--i": i } as CSSProperties}>{Array.from({ length: 8 },(_,j) => <span key={j}/>)}</div>)}</div>
    <div className="system-states record-voice"><span>01 / REPRESENTATION</span><span>02 / ADDRESS</span><span>03 / {variant === "query" ? "QUERY" : "RELATION"}</span></div>
    <p className="study-caption">{variant === "query" ? "A query identifies an address, follows a relationship and returns a result." : "One representation, with parts that can be addressed and relationships that can be inspected."} <span>Conceptual study · not a measured trace.</span></p>
    <button className="study-control record-voice" onClick={() => active ? setPaused(true) : request(id)}>{active ? "PAUSE STUDY Ⅱ" : "PLAY STUDY ▷"}</button>
  </div>;
}
