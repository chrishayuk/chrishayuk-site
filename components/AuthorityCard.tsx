"use client";
import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { useMotion } from "./Motion";
import { authorityGate as data, gateArm } from "@/lib/authority-gate";

const GATE = 29;
const { globalLayers, layers } = data.architecture;

/** The conflict itself, as the notebook index card: two recorded outcomes of one
 *  context. Both states are always drawn, so the still frame carries the whole
 *  argument; motion only moves the emphasis between them. */
export function AuthorityCard() {
  const id = useId(); const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const { register, request, setPaused } = useMotion();
  useEffect(() => {
    if (!ref.current) return;
    return register({ id, element: ref.current, start: () => setActive(true), stop: () => setActive(false) });
  }, [id, register]);
  const held = gateArm([])!, flipped = gateArm([GATE])!;
  return <div ref={ref} className={`authority-card${active ? " running" : ""}`}>
    <div className="authority-card-rail" aria-hidden="true">
      {Array.from({ length: layers }, (_, layer) => <span key={layer}
        data-global={globalLayers.includes(layer)} data-gate={layer === GATE}/>)}
    </div>
    <div className="authority-card-states">
      <div className="authority-card-state" data-state="held">
        <p className="record-voice">EIGHT READS OPEN</p>
        <p className="authority-card-answer">{held.answer}</p>
        <p className="authority-card-note">The record beside the question says {data.corpus.promotedValue}, and is not read at all.</p>
      </div>
      <div className="authority-card-state" data-state="flipped">
        <p className="record-voice">ONE READ RETIRED · LAYER {GATE}</p>
        <p className="authority-card-answer">{flipped.answer}</p>
        <p className="authority-card-note">The same sentence is still readable in the other seven. The answer changes anyway.</p>
      </div>
    </div>
    <p className="authority-card-caption record-voice">
      <span>RECORDED RESULT · {flipped.bits!.toFixed(4)} BITS</span>
      <button onClick={() => active ? setPaused(true) : request(id)}>{active ? "PAUSE Ⅱ" : "PLAY ▷"}</button>
    </p>
  </div>;
}
