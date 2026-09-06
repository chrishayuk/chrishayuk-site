"use client";
import { useState } from "react";
import { authorityGate as data, gateArm } from "@/lib/authority-gate";
/** Exhibition-local HAUSE instrument: a schematic of two measured arms.
 * Static mode shows the baseline, and the caption records both outcomes. */
export function AuthorityScene() {
    const [retired, setRetired] = useState(false);
    const arm = gateArm(retired ? [29] : [])!;
    return <figure className="authority-scene" data-retired={retired}>
    <div className="authority-scene-label record-voice"><span>ONE CONTEXT / TWO CLAIMS</span><span>RECORDED ARMS</span></div>
    <div className="authority-scene-sources">
      <div><span className="record-voice">ORIGINAL SOURCE</span><strong>{data.corpus.sourceValue}</strong><small>Earlier in the document</small></div>
      <div data-new><span className="record-voice">PROMOTED RECORD</span><strong>{data.corpus.promotedValue}</strong><small>Beside the question</small></div>
    </div>
    <p className="authority-scene-distance record-voice">↓ APPROX. 55,000 TOKENS FROM SOURCE TO QUESTION</p>
    <div className="authority-scene-reads">
      <p className="record-voice">THE EIGHT GLOBAL READS OF THE ORIGINAL SOURCE</p>
      <div className="authority-scene-gates">{data.architecture.globalLayers.map(layer => <div key={layer} data-blocked={retired && layer === 29} data-gate={layer === 29}><span className="authority-scene-wire" aria-hidden="true"/><span className="record-voice">{layer}</span><span className="authority-scene-state">{retired && layer === 29 ? "cut" : "open"}</span></div>)}</div>
    </div>
    <div className="authority-scene-result" aria-live="polite" aria-atomic="true"><div><span className="record-voice">THE MODEL ANSWERS</span><strong>{arm.answer}</strong></div><p>{retired ? "Seven reads remain open. The answer changes anyway." : "Both claims are present. The original still supplies the answer."}</p></div>
    <button className="authority-scene-toggle record-voice" aria-pressed={retired} onClick={() => setRetired(value => !value)}><span>{retired ? "RESTORE THE READ AT LAYER 29" : "RETIRE THE READ AT LAYER 29"}</span><span aria-hidden="true">{retired ? "↶" : "→"}</span></button>
    <figcaption>All eight reads open: {data.corpus.sourceValue}. Retire layer 29 alone: {data.corpus.promotedValue}, with seven reads still open. Schematic · Gemma 3 12B · one synthetic 65,536-token context. <a href="#source-5">Layer attribution ↗</a></figcaption>
  </figure>;
}
