"use client";

import { useState } from "react";
import { authorityGate as data, promotionArm, gateArm, measuredGateArms, gateArmLabel, bitsLabel,
  type RecordChoice, type SourceState } from "@/lib/authority-gate";

/** Divergence spans four orders of magnitude, so the rail is logarithmic.
 *  The mark at 0.05 bits is this programme's own qualifying tolerance. */
const FLOOR = 0.0001, CEIL = 20, SPAN = Math.log10(CEIL) - Math.log10(FLOOR);
const railPosition = (bits: number) => (Math.log10(Math.max(bits, FLOOR)) - Math.log10(FLOOR)) / SPAN;
const barWidth = (bits: number | null) => bits === null ? 0 : Math.max(0.015, Math.min(1, railPosition(bits)));
const TOLERANCE = 0.05;
const tolerancePercent = `${(railPosition(TOLERANCE) * 100).toFixed(1)}%`;

const SOURCES: { value: SourceState; label: string; detail: string }[] = [
  { value: "live", label: "Live", detail: "The original sentence is still readable by every attention layer." },
  { value: "retired", label: "Retired", detail: "The original sentence is excluded from the global attention layers." },
];
const RECORDS: { value: RecordChoice; label: string; detail: string }[] = [
  { value: "none", label: "Nothing", detail: "Width-matched padding only." },
  { value: "correct", label: "The same value", detail: "A record asserting 7431, agreeing with the source." },
  { value: "contradicting", label: "A different value", detail: "A record asserting 5824, contradicting the source." },
];

export function PromotionInstrument() {
  const [source, setSource] = useState<SourceState>("live");
  const [record, setRecord] = useState<RecordChoice>("contradicting");
  const [companions, setCompanions] = useState(0);
  const arm = promotionArm(source, record, companions);
  const detail = arm?.detail;
  return <section className="authority-lab" aria-label="Promotion and override: recorded arms">
    <div className="authority-controls">
      <p className="record-voice">01 / SET UP THE CONTEXT</p>
      <p className="authority-preamble">One 64,000-token context. The original sentence is planted 15% of the way in, roughly 55,000 tokens before the question. A short record is injected beside the question itself. Choose what the model can still read, and what that record says.</p>
      <fieldset className="authority-choice">
        <legend className="record-voice">THE ORIGINAL SENTENCE</legend>
        {SOURCES.map(option => <button key={option.value} type="button" aria-pressed={source === option.value}
          onClick={() => setSource(option.value)}><strong>{option.label}</strong><span>{option.detail}</span></button>)}
      </fieldset>
      <fieldset className="authority-choice">
        <legend className="record-voice">THE PROMOTED RECORD</legend>
        {RECORDS.map(option => <button key={option.value} type="button" aria-pressed={record === option.value}
          onClick={() => setRecord(option.value)}><strong>{option.label}</strong><span>{option.detail}</span></button>)}
      </fieldset>
      <fieldset className="authority-choice authority-companions">
        <legend className="record-voice">INERT COMPANION RECORDS</legend>
        {[0, 1, 2, 3].map(k => <button key={k} type="button" aria-pressed={companions === k}
          onClick={() => setCompanions(k)}><strong>{k}</strong></button>)}
      </fieldset>
    </div>
    <div className="authority-readout">
      <p className="record-voice">02 / THE RECORDED ANSWER</p>
      <div role="status" aria-live="polite" aria-atomic="true">
        {arm ? <>
          <p className="authority-answer">{arm.answer}</p>
          <p className="authority-verdict record-voice" data-verdict={arm.verdict}>{arm.verdict}
            {arm.crossRun ? <span> · SEPARATE RUN</span> : null}</p>
          <p className="authority-bits"><span className="record-voice">DIVERGENCE FROM THE UNMODIFIED RUN</span>
            <strong>{bitsLabel(arm.bits)}</strong>
            <span>{arm.bits !== null && arm.bits <= TOLERANCE ? "inside the 0.05-bit qualifying tolerance" : "outside the 0.05-bit qualifying tolerance"}</span></p>
          {detail ? <p className="authority-detail">{detail}</p> : null}
          <p className="record-voice authority-arm">ARM / {arm.arm.toUpperCase()}</p>
        </> : <>
          <p className="authority-answer authority-unrun">Not run.</p>
          <p className="authority-detail">This combination was never measured, so this page has nothing to show you. It will not guess. The arms that were run are listed below.</p>
        </>}
      </div>
    </div>
    <div className="authority-ledger">
      <p className="record-voice">03 / EVERY ARM THAT WAS RUN</p>
      <ol>{data.promotion.arms.map(row => {
        const current = row.source === source && row.record === record && row.companions === companions;
        return <li key={row.arm} data-current={current} data-flips={row.answer !== data.corpus.sourceValue}>
          <span className="authority-ledger-arm">{row.source === "live" ? "SOURCE LIVE" : "SOURCE RETIRED"} · {
            row.record === "none" ? "no record" : row.record === "correct" ? "same value" : "different value"} · +{row.companions}</span>
          <span className="authority-meter" aria-hidden="true"><span style={{ width: `${barWidth(row.bits) * 100}%` }}/></span>
          <span className="authority-ledger-answer">{row.answer}</span>
          <span className="authority-ledger-bits">{row.bits === null ? "—" : row.bits.toFixed(4)}</span>
        </li>;
      })}</ol>
      <div className="authority-scale" aria-hidden="true">
        <span/>
        <span className="authority-scale-track" style={{ "--tolerance": tolerancePercent } as React.CSSProperties}>
          <span className="record-voice">0.0001</span>
          <span className="authority-scale-mark record-voice">0.05 · QUALIFYING TOLERANCE</span>
          <span className="record-voice">20</span>
        </span>
        <span className="authority-scale-note record-voice">BITS · LOGARITHMIC</span>
      </div>
    </div>
  </section>;
}

const GLOBAL = data.architecture.globalLayers;
const DEPTH = data.architecture.layers;

export function GateInstrument() {
  const [retired, setRetired] = useState<number[]>([29]);
  const arm = gateArm(retired);
  const toggle = (layer: number) => setRetired(current =>
    current.includes(layer) ? current.filter(l => l !== layer) : [...current, layer].sort((a, b) => a - b));
  return <section className="authority-lab gate-lab" aria-label="Which reads have to stop: recorded arms">
    <div className="gate-intro">
      <p className="record-voice">04 / CHOOSE WHICH READS STOP</p>
      <p className="authority-preamble">The model has {DEPTH} attention layers. Every sixth one reads the whole context; the rest see only the last {data.architecture.slidingWindow} tokens. The source is far outside that window, so these eight are the only path to it. Switch one off and the record beside the question may take over.</p>
    </div>
    <div className="gate-rail">
      <div className="gate-track">
        {Array.from({ length: DEPTH }, (_, layer) => GLOBAL.includes(layer)
          ? <button key={layer} type="button" className="gate-layer" style={{ gridColumn: layer + 1 }}
              aria-pressed={retired.includes(layer)} onClick={() => toggle(layer)}>
              <span className="gate-mark" aria-hidden="true"/>
              <span className="gate-number" aria-hidden="true">{layer}</span>
              <span className="sr-only">Global layer {layer}, {retired.includes(layer) ? "retired" : "still reading the source"}</span>
            </button>
          : <span key={layer} className="gate-tick" style={{ gridColumn: layer + 1 }} aria-hidden="true"/>)}
      </div>
      <p className="gate-scale record-voice"><span>LAYER 0</span><span>SLIDING · GLOBAL · SLIDING</span><span>LAYER {DEPTH - 1}</span></p>
    </div>
    <div className="authority-readout gate-readout">
      <div role="status" aria-live="polite" aria-atomic="true">
        {arm ? <>
          <p className="record-voice">{retired.length ? `${retired.length} READ${retired.length > 1 ? "S" : ""} RETIRED` : "NOTHING RETIRED"} · {gateArmLabel(arm)}</p>
          <p className="authority-answer" data-flips={arm.flips}>{arm.answer}</p>
          <p className="authority-verdict record-voice" data-verdict={arm.flips ? "REPLACED" : "HELD"}>
            {arm.flips ? "THE PROMOTED RECORD TAKES THE ANSWER" : "THE ORIGINAL SENTENCE HOLDS"}</p>
          <p className="authority-bits"><span className="record-voice">DIVERGENCE</span><strong>{bitsLabel(arm.bits)}</strong></p>
          {arm.detail ? <p className="authority-detail">{arm.detail}</p> : null}
          <p className="record-voice authority-arm">ARM / {arm.arm.toUpperCase()}</p>
        </> : <>
          <p className="record-voice">{retired.length} READ{retired.length > 1 ? "S" : ""} RETIRED · {gateArmLabel({ ...measuredGateArms[0], layers: retired })}</p>
          <p className="authority-answer authority-unrun">Not in the record.</p>
          <p className="authority-detail">There are {2 ** GLOBAL.length} possible combinations and {measuredGateArms.length} of them were run. This one was not, and nothing here will interpolate an answer for it. Choose a measured subset below.</p>
        </>}
      </div>
    </div>
    <div className="gate-presets">
      <p className="record-voice">THE {measuredGateArms.length} SUBSETS THAT WERE RUN</p>
      <div className="gate-chips">{measuredGateArms.map(row => <button key={row.arm} type="button"
        aria-pressed={gateArm(retired)?.arm === row.arm} data-flips={row.flips}
        onClick={() => setRetired([...row.layers])}>
        <span>{gateArmLabel(row)}</span>
        <span className="record-voice">{row.answer}{row.bits === null ? "" : ` · ${row.bits.toFixed(4)}`}</span>
      </button>)}</div>
    </div>
  </section>;
}
