"use client";

import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { MeasurementTrace } from "@chrishayuk/hause/components/MeasurementTrace";
import { useMotion } from "./Motion";
import { components, format, layers, percent, reader, readability, stageNotes, transplant, type Layer } from "@/lib/address-build";

/** The publication adapts its verified record to HAUSE's measured-trace contract. */
export function AddressDepth() {
  return <MeasurementTrace id="act-2" className="address-depth"
    label="Held-out reader accuracy across model depth" kicker="01 / THE DEPTH OF A QUESTION · RECORDED MEASUREMENTS"
    stageLabel="Residual entering" autoPlay
    stages={layers.map(layer => ({ id: String(layer), label: `L${layer}`, ...stageNotes[layer], description: stageNotes[layer].text,
      caution: layer >= 28 ? "Perfect readability may decode the answer token; this endpoint is not clean address geometry." : undefined }))}
    series={components.map(component => ({ id: component, label: component.toUpperCase(), domain: [0, 1] as const,
      values: layers.map(layer => readability(layer, component)), precision: 2, unit: "accuracy",
      color: component === "relation" ? "#bdc7b0" : component === "entity" ? "#e3b374" : "#f0eae0" }))}
    annotations={[{ from: "8", to: "12", label: "↻ Basis change L8 → 12" }, { from: "20", to: "24", label: "↻ Basis change L20 → 24" }]}
    bands={[{ from: "8", to: "24", label: "L8–24 / mechanistic evidence" }, { from: "28", to: "30", label: "Answer-token endpoint", caution: true }]}
    summary="194 prompts · 3 held-out wording folds. Stages are equally spaced for reading; only the displayed depths were measured."
    source={{ label: "Complete reader record", href: "/data/address-build-1/reader.json" }} />;
}

export function AddressTransplant() {
  const [layer, setLayer] = useState<Layer>(20);
  const [replaying, setReplaying] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const id = useId();
  const { register, request } = useMotion();
  useEffect(() => {
    if (!ref.current) return;
    return register({ id, element: ref.current, manualOnly: true, start: () => setReplaying(true), stop: () => setReplaying(false) });
  }, [id, register]);
  useEffect(() => {
    if (!replaying) return;
    const timer = window.setTimeout(() => setReplaying(false), 2200);
    return () => window.clearTimeout(timer);
  }, [replaying]);
  const arm = transplant(layer);
  const recipient = Math.round(arm.retention * arm.n);
  const donor = Math.round(arm.donor_answer_rate * arm.n);
  return <figure id="act-3" className="address-transplant" ref={ref} data-replaying={replaying}>
    <div className="address-object-label record-voice"><span>02 / REPLACE ONE POSITION</span><span>SCHEMATIC RECREATION · MEASURED RATES</span></div>
    <div className="address-transplant-selector"><p>Same intervention.<br /><em>Different depth.</em></p><div role="group" aria-label="Transplant depth">{([20, 24, 28] as const).map(value => <button key={value} aria-pressed={layer === value} onClick={() => { setReplaying(false); setLayer(value); }}>L{value}</button>)}</div></div>
    <div className="address-splice-scene">
      <div className="address-donor"><span className="record-voice">DONOR / FRANCE · CAPITAL</span><strong>“The capital of France is”</strong><span className="address-state-vector" aria-hidden="true">▥</span><small>Final-position state, entering L{layer}</small></div>
      <div className="address-recipient"><span className="record-voice">RECIPIENT / JAPAN · CAPITAL</span><strong>“The capital of Japan is”</strong><div className="address-positions" aria-label="Earlier recipient positions preserved; only the final position is replaced">{Array.from({ length: 6 }, (_, i) => <span key={i} data-replaced={i === 5}>{i === 5 ? "↧" : "·"}</span>)}</div><div className="address-position-labels record-voice"><span>RECIPIENT CONTEXT REMAINS</span><span>SWAP HERE</span></div></div>
      <div className="address-continue"><span aria-hidden="true">↓</span><span className="record-voice">CONTINUE THE REMAINING LAYERS → READ THE NEXT TOKEN</span></div>
    </div>
    <div className="address-transplant-results" aria-live="polite" aria-atomic="true"><div><span className="record-voice">RECIPIENT ANSWER RETAINED</span><strong>{percent(arm.retention)}</strong><small>{recipient} / {arm.n} transplants</small></div><div><span className="record-voice">DONOR ANSWER IMPOSED</span><strong>{percent(arm.donor_answer_rate)}</strong><small>{donor} / {arm.n} transplants</small></div></div>
    <div className="address-outcome-strip" aria-hidden="true">{Array.from({ length: arm.n }, (_, i) => <i key={i} data-answer={i < recipient ? "recipient" : i < recipient + donor ? "donor" : "other"} style={{ "--delay": `${i * 15}ms` } as CSSProperties}/>)}</div>
    <div className="address-cohort-legend record-voice"><span>○ RECIPIENT</span><span>● DONOR</span><span>· OTHER {arm.n - recipient - donor}/{arm.n}</span></div>
    <p className="address-transplant-verdict">{layer === 20 ? <>France’s state. Still Japan’s answer.<br /><em>The entity has not taken control here.</em></> : layer === 24 ? <>The boundary begins to move.<br /><em>6 of 48 donors now supply the answer.</em></> : <>The donor takes over.<br /><em>But this state can already carry the answer token.</em></>}</p>
    <button className="address-replay record-voice" disabled={replaying} onClick={() => request(id)} onAnimationEnd={() => setReplaying(false)}>{replaying ? "REPLAYING THE SPLICE…" : "REPLAY THE SPLICE ↻"}</button>
    <figcaption>Japan/Tokyo and France/Paris illustrate the intervention. Percentages are aggregate top-1 outcomes across 48 different-entity transplants, not probabilities or repeated trials for this example. Position boxes are schematic, not a tokenisation. No model runs in your browser.</figcaption>
  </figure>;
}

const transitions = ["L8->L12", "L20->L24"] as const;
const methods = [{ key: "identity", label: "Raw transfer" }, { key: "norm_only", label: "Rescale only" }, { key: "procrustes", label: "Align coordinates" }] as const;
export function AddressCoordinates() {
  const [method, setMethod] = useState<typeof methods[number]["key"]>("identity");
  const aligned = method === "procrustes";
  return <figure id="act-4" className="address-coordinates" data-aligned={aligned}>
    <div className="address-object-label record-voice"><span>03 / THE RELATION READER</span><span>SAME INFORMATION · DIFFERENT COORDINATES</span></div>
    <div className="address-coordinate-layout"><div className="address-coordinate-sketch"><div className="address-basis-reader" aria-hidden="true"><div className="address-basis-state">{["A", "B", "C", "D"].map((label, i) => <i key={label} style={{ left: `${20 + (i % 2) * 60}%`, top: `${20 + Math.floor(i / 2) * 60}%` }}><span>{label}</span></i>)}</div><span className="address-reader-axis"/></div><span className="record-voice">{aligned ? "STATE + READER / ALIGNED" : "STATE + READER / MISMATCHED"}</span><small>Illustrative basis change.<br />Not a projection of measured states.</small></div><div className="address-transfer-values">{transitions.map(transition => { const values = reader.cross_layer_transfer.relation[transition]; return <div key={transition}><div className="address-transfer-title"><span className="record-voice">{transition.replace("->", " → ")}</span><strong>{format(values[method])}</strong></div><div className="address-transfer-meter" aria-hidden="true"><span style={{ width: `${values[method] * 100}%` }}/><i/></div><p className="record-voice">CHANCE .50 <span>SAME-LAYER {format(values.same_layer_reference)}</span></p></div>; })}</div></div>
    <div className="address-methods" role="group" aria-label="Cross-layer reader control">{methods.map((item, i) => <button key={item.key} aria-pressed={method === item.key} onClick={() => setMethod(item.key)}><span className="record-voice">0{i + 1}</span>{item.label}<span aria-hidden="true">{method === item.key ? "●" : "○"}</span></button>)}</div>
    <p className="address-coordinate-verdict" aria-live="polite">{aligned ? "An orthogonal coordinate change restores the reader." : method === "norm_only" ? "Rescaling changes nothing. The mismatch is not scale." : "Across depth, the same reader falls below chance."}</p>
    <figcaption>Relation only · held-out transfer accuracy, mean of 3 folds. Raw → aligned: L8→12, .39 → .90; L20→24, .46 → 1.00. Entity’s coordinate behaviour remains unresolved.</figcaption>
  </figure>;
}
