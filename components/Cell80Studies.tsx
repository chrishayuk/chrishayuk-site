"use client";

import { useState } from "react";
import { cell80, dependenceGate, factorialAt, signed } from "@/lib/cell80";

/** A diagram of the recorded intervention, never invented spatial replay. */
export function Cell80Replay() {
  const [stage, setStage] = useState(0);
  const stages = ["Before the birth", "One inherited change", "The recorded outcome"];
  const tick = stage === 0 ? "993" : stage === 1 ? "994" : "1,080";
  return <figure className="cell80-replay" aria-label="Diagram of the recorded single-field intervention">
    <div className="cell80-instrument-heading record-voice"><span>EX-4 / SEED 1</span><span>INTERVENTION DIAGRAM · RECORDED VALUES</span></div>
    <div className="cell80-tick"><span className="record-voice">{stage === 2 ? "OBSERVED SHIFT AT TICK" : "TICK"}</span><strong>{tick}</strong></div>
    <div className="cell80-world-pair" aria-live="polite">
      {[false, true].map(reverted => <div className="cell80-genome" key={String(reverted)} data-reverted={reverted && stage > 0}>
        <span className="record-voice">{reverted ? "PROGRAM CHANGE UNDONE" : "HISTORY AS OBSERVED"}</span>
        <div className="cell80-organism" aria-hidden="true"><i/><i/><i/><b>{stage === 0 ? "2059" : "2231"}</b></div>
        <p className="record-voice">{stage === 0 ? "PARENT 2059 · BEFORE BIRTH" : "OFFSPRING 2231 · PARENT 2059"}</p>
        <dl><div><dt>Threshold</dt><dd>{stage === 0 ? "198" : "192"}</dd></div><div data-changed={stage > 0}><dt>Program</dt><dd>{stage === 0 || reverted ? "37" : "33"}</dd></div></dl>
        {stage === 2 && <p className="cell80-outcome">{reverted ? <>The detected shift<br/><em>does not recur.</em></> : <>A sustained<br/><em>plurality shift.</em></>}</p>}
      </div>)}
    </div>
    <p className="cell80-reading" aria-live="polite">{stage === 0 ? "Every tick before the intervention is byte-identical. The diagram shows the parent’s two relevant fields." : stage === 1 ? "Both histories keep the threshold change, 198 → 192. Only the inherited program differs: 33 versus 37." : "Observed share: 35.3%, peaking at 41.6% in the sustain window. The counterfactual removes this event; its population share is not reported as zero."}</p>
    <div className="cell80-controls" role="group" aria-label="Step through the intervention">{stages.map((label, i) => <button key={label} type="button" aria-pressed={stage === i} onClick={() => setStage(i)}><span>0{i+1}</span>{label}</button>)}</div>
    <figcaption className="cell80-caption">Read the intervention in three steps. This is a diagram of report values, not footage of organism positions. <a href="/data/cell80/historical-findings.md">Open the EX-4 record ↗</a></figcaption>
  </figure>;
}

export function Cell80Survival() {
  const [selected, setSelected] = useState("100:42");
  const [bps, seed] = selected.split(":");
  const row = cell80.predators.find(r => r.swap_bps === Number(bps) && r.seed === seed)!;
  return <figure className="cell80-survival">
    <figcaption className="record-voice">EX-9 / SIX WORLDS AT EACH SWAP RATE · 10,000 TICKS</figcaption>
    {[100, 200].map(rate => <div key={rate} className="cell80-survival-row"><div><strong>{rate/100}%</strong><span className="record-voice">PROGRAM SWAPS</span></div><div className="cell80-worlds">{cell80.predators.filter(r => r.swap_bps === rate).map((r, i) => <button type="button" key={r.seed} aria-pressed={selected === `${rate}:${r.seed}`} aria-label={`${rate/100}% swaps, world ${i+1}: ${r.grazers > 0 && r.predators > 0 ? "both species survived" : "both species extinct"}`} onClick={() => setSelected(`${rate}:${r.seed}`)}><span className="cell80-species-pair" aria-hidden="true"><i data-alive={r.grazers > 0}/><b data-alive={r.predators > 0}/></span><span>0{i+1}</span></button>)}</div></div>)}
    <p className="cell80-legend"><span>○ Grazer</span><span>◇ Predator</span><span>Filled = alive at the endpoint</span></p>
    <div className="cell80-selected-world" aria-live="polite"><p className="record-voice">SELECTED WORLD / SEED {row.seed}</p><div><p><strong>{row.grazers.toLocaleString("en-GB")}</strong> grazers</p><p><strong>{row.predators.toLocaleString("en-GB")}</strong> predators</p></div><p>{row.label_p === null ? "Coupling untestable: both species did not survive." : `Neither coupling screen passed. Label p = ${row.label_p.toFixed(4)}; circular p = ${row.circular_p!.toFixed(4)}.`}</p></div>
    <p className="cell80-caption">Numerical mutation remained active. Each screen required p &lt; 0.05/12 (about 0.00417). Select a world to inspect its endpoint; these symbols are not population sizes. <a href="/data/cell80/evidence.json">Recorded results ↗</a></p>
  </figure>;
}

export function Cell80Benefits() {
  const [selected, setSelected] = useState(0);
  const result = cell80.firstSteps[selected];
  return <figure className="cell80-benefits"><figcaption className="record-voice">108 TESTED ORIGINS / EACH MARK IS ONE COUNTERFACTUAL</figcaption>
    <div className="cell80-mutation-grid">{cell80.firstSteps.map((r, i) => <button type="button" key={`${r.seed}:${r.child}`} data-result={r.delta_children > 0 ? "helpful" : r.delta_children < 0 ? "harmful" : "tied"} aria-pressed={selected === i} aria-label={`Origin ${r.child}, seed ${r.seed}: ${signed(r.delta_children)} direct offspring`} onClick={() => setSelected(i)}>{r.delta_children > 0 ? "+" : r.delta_children < 0 ? "−" : "·"}</button>)}</div>
    <div className="cell80-legend"><span>+ 8 helped</span><span>· 84 tied</span><span>− 16 harmed</span></div>
    <p className="cell80-reading" aria-live="polite">Origin {result.child} · seed {result.seed} · {result.baseline_children} direct offspring with the composition, {result.reverted_children} with the change undone. <strong>{signed(result.delta_children)} offspring.</strong></p>
    <p className="cell80-caption">Local benefit over a fixed horizon, not a universal fitness estimate. Origins retain their recorded order. <a href="/data/cell80/evidence.json">Inspect the measurements ↗</a></p>
  </figure>;
}

const actionLabels = ["Action 0", "Action 1", "Action 2", "Fallback"];
export function Cell80Novelty() {
  const [selected, setSelected] = useState(0);
  const row = cell80.novelty[selected];
  return <figure className="cell80-novelty"><figcaption className="record-voice">EIGHT HELPFUL COMPOSITIONS / EXHAUSTIVE IMMEDIATE-ACTION CHECK</figcaption>
    <div className="cell80-novelty-choices">{cell80.novelty.map((r, i) => <button type="button" key={`${r.seed}:${r.origin}`} aria-pressed={selected === i} onClick={() => setSelected(i)}><span className="cell80-signature" aria-hidden="true">{r.action_classes.map((a, j) => <i key={j} data-action={a}/>)}</span><span>Origin {r.origin}</span><small>{r.equivalent_disk_genes.length ? "Existing match" : "Distinct here"}</small></button>)}</div>
    <div className="cell80-signature-detail" aria-live="polite"><p className="record-voice">{row.composition}</p><p>{row.equivalent_disk_genes.length ? <>Same immediate actions as <strong>{row.equivalent_disk_genes.join(", ")}</strong>.</> : "No existing library gene matches this immediate-action signature in the tested domain."}</p>
    <div className="cell80-action-inputs">{row.inputs.map((input, i) => <div key={i}><span>{input.join(" / ")}</span><strong>{actionLabels[row.action_classes[i]]}</strong><small>output {row.raw_outputs[i]}</small></div>)}</div></div>
    <p className="cell80-caption">All eight food triples in &#123;0,40&#125;³. Outputs other than 0, 1 or 2 share the fallback branch. This post-hoc check does not compare instruction cost or future mutation paths.</p>
  </figure>;
}

export function Cell80Dependence() {
  const [candidate, setCandidate] = useState(0);
  const [world, setWorld] = useState(0);
  const result = factorialAt(candidate, world);
  const gate = dependenceGate(candidate);
  const labels = ["Old movement · old allele", "Old movement · later allele", "Composed movement · old allele", "Composed movement · later allele"];
  const max = Math.max(...result.values, 1);
  return <figure className="cell80-dependence"><figcaption className="record-voice">EX-10 / FOUR GENETIC COMBINATIONS · RECORDED TOTAL BIRTHS</figcaption>
    <div className="cell80-controls" role="group" aria-label="Choose a sequential candidate">{["597 → 638 · energy share", "4964 → 4975 · threshold"].map((label, i) => <button type="button" key={label} aria-pressed={candidate===i} onClick={() => setCandidate(i)}>{label}</button>)}</div>
    <div className="cell80-factorial" aria-live="polite">{result.values.map((value, i) => <div key={i} data-composed={i>=2}><span className="record-voice">{labels[i]}</span><strong>{value.toLocaleString("en-GB")}</strong><div className="cell80-birth-bar" aria-hidden="true"><i style={{width:`${value/max*100}%`}}/></div></div>)}</div>
    <div className="cell80-benefit-comparison" aria-live="polite"><p>Later allele with old movement<strong>{signed(result.oldBenefit)}</strong></p><p>Later allele with composed movement<strong>{signed(result.newBenefit)}</strong></p><p>Interaction<strong>{signed(result.interaction)}</strong></p></div>
    <div className="cell80-controls cell80-world-selector" role="group" aria-label="Choose a held-out world">{[0,1,2,3,4].map(i=><button type="button" key={i} aria-pressed={world===i} onClick={()=>setWorld(i)}>World {i+1}</button>)}</div>
    <p className="cell80-caption">Seed {result.seed}. Bar scale adjusts to the selected world's largest birth count; all four bars share that scale. These are fresh worlds with whole founder populations, not replays of the ancestral birth.</p>
    <div className="cell80-gate" aria-live="polite"><div><span className="record-voice">POSITIVE INTERACTION</span><strong>{gate.positive}<small> / 5</small></strong></div><div><span className="record-voice">REQUIRED</span><strong>4<small> / 5</small></strong></div><p><strong>Gate not passed.</strong> Positive mean interaction was also required. This candidate’s mean is {signed(Number(gate.mean.toFixed(1)))} births.</p></div>
    <p className="cell80-caption">Interaction = the later allele’s benefit with composed movement minus its benefit with old movement. Even a positive interaction does not by itself show the benefit was impossible without the first change.</p>
  </figure>;
}
