"use client";

import { Cell80Meaning as Meaning } from "./Cell80Meaning";
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
        {stage === 2 && <p className="cell80-outcome">{reverted ? <>The detected shift<br/><em>does not recur.</em></> : <>A sustained<br/><em>lead in the population.</em></>}</p>}
      </div>)}
    </div>
    <p className="cell80-reading" aria-live="polite">{stage === 0 ? "The histories match exactly before the edited birth. These are the parent’s two relevant inherited settings." : stage === 1 ? "Both histories keep the threshold change, 198 → 192. Only the inherited program differs: 33 versus 37." : "Program 33 reached 35.3%, peaking at 41.6% during the following 100 ticks. Undoing the change removes the sustained lead; it does not mean program 33 disappeared."}</p>
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
    <div className="cell80-selected-world" aria-live="polite"><p className="record-voice">SELECTED WORLD / SEED {row.seed}</p><div><p><strong>{row.grazers.toLocaleString("en-GB")}</strong> grazers</p><p><strong>{row.predators.toLocaleString("en-GB")}</strong> predators</p></div><p>{row.label_p === null ? "The response tests could not run because both species did not survive." : `Neither test for linked evolutionary changes passed. Label-shuffle p = ${row.label_p.toFixed(4)}; time-shift p = ${row.circular_p!.toFixed(4)}.`}</p></div>
    <p className="cell80-caption">Numerical settings could still mutate. Each statistical test required p &lt; 0.05/12 (about 0.00417). Filled symbols mean alive at the end; their size does not show population size. <a href="/data/cell80/evidence.json">Recorded results ↗</a></p>
  </figure>;
}

export function Cell80Benefits() {
  const [selected, setSelected] = useState(0);
  const result = cell80.firstSteps[selected];
  return <figure className="cell80-benefits"><figcaption className="record-voice">108 BIRTHS / THE NEW PROGRAM KEPT OR UNDONE</figcaption>
    <div className="cell80-mutation-grid">{cell80.firstSteps.map((r, i) => <button type="button" key={`${r.seed}:${r.child}`} data-result={r.delta_children > 0 ? "helpful" : r.delta_children < 0 ? "harmful" : "tied"} aria-pressed={selected === i} aria-label={`Origin ${r.child}, seed ${r.seed}: ${signed(r.delta_children)} direct offspring`} onClick={() => setSelected(i)}>{r.delta_children > 0 ? "+" : r.delta_children < 0 ? "−" : "·"}</button>)}</div>
    <div className="cell80-legend"><span>+ 8 helped</span><span>· 84 tied</span><span>− 16 harmed</span></div>
    <p className="cell80-reading" aria-live="polite">Origin {result.child} · seed {result.seed} · {result.baseline_children} direct offspring with the combined program, {result.reverted_children} with the change undone. <strong>{signed(result.delta_children)} offspring.</strong></p>
    <p className="cell80-caption">Each comparison counts the changed organism’s own offspring over the same fixed period. Select a mark to see the two counts. Results stay in their recorded order. <a href="/data/cell80/evidence.json">Inspect the measurements ↗</a></p>
  </figure>;
}

const actionLabels = ["Action 0", "Action 1", "Action 2", "Fallback"];
export function Cell80Novelty() {
  const [selected, setSelected] = useState(0);
  const row = cell80.novelty[selected];
  return <figure className="cell80-novelty"><figcaption className="record-voice">EIGHT HELPFUL PROGRAMS / DO THEY MAKE NEW CHOICES?</figcaption>
    <div className="cell80-novelty-choices">{cell80.novelty.map((r, i) => <button type="button" key={`${r.seed}:${r.origin}`} aria-pressed={selected === i} onClick={() => setSelected(i)}><span className="cell80-signature" aria-hidden="true">{r.action_classes.map((a, j) => <i key={j} data-action={a}/>)}</span><span>Origin {r.origin}</span><small>{r.equivalent_disk_genes.length ? "Matches existing code" : "Different choices here"}</small></button>)}</div>
    <div className="cell80-signature-detail" aria-live="polite"><p className="record-voice">{row.composition}</p><p>{row.equivalent_disk_genes.length ? <>Same movement choices as existing program <strong>{row.equivalent_disk_genes.join(", ")}</strong>.</> : "No existing library program makes this same set of movement choices for these inputs."}</p>
    <div className="cell80-action-inputs">{row.inputs.map((input, i) => <div key={i}><span>{input.join(" / ")}</span><strong>{actionLabels[row.action_classes[i]]}</strong><small>output {row.raw_outputs[i]}</small></div>)}</div></div>
    <p className="cell80-caption">Each program reads food at three locations: each reading is either 0 or 40, giving eight possible combinations. Outputs other than 0, 1 or 2 use the default action. This later check compares choices, not execution cost or future mutations.</p>
  </figure>;
}

export function Cell80Dependence() {
  const [candidate, setCandidate] = useState(0);
  const [world, setWorld] = useState(0);
  const result = factorialAt(candidate, world);
  const gate = dependenceGate(candidate);
  const labels = ["Neither change", "Later setting only", "Movement change only", "Both changes"];
  const max = Math.max(...result.values, 1);
  return <figure className="cell80-dependence"><figcaption className="record-voice">EX-10 / FOUR VERSIONS · TOTAL BIRTHS IN EACH WORLD</figcaption>
    <div className="cell80-controls" role="group" aria-label="Choose a sequence of changes">{["597 → 638 · energy share", "4964 → 4975 · threshold"].map((label, i) => <button type="button" key={label} aria-pressed={candidate===i} onClick={() => setCandidate(i)}>{label}</button>)}</div>
    <div className="cell80-factorial" aria-live="polite">{result.values.map((value, i) => <div key={i} data-composed={i>=2}><span className="record-voice">{labels[i]}</span><strong>{value.toLocaleString("en-GB")}</strong><div className="cell80-birth-bar" aria-hidden="true"><i style={{width:`${value/max*100}%`}}/></div></div>)}</div>
    <div className="cell80-benefit-comparison" aria-live="polite"><p>Later setting’s benefit with old movement<strong>{signed(result.oldBenefit)}</strong></p><p>Later setting’s benefit with new movement<strong>{signed(result.newBenefit)}</strong></p><p><Meaning term="interaction">Extra benefit from the first change</Meaning><strong>{signed(result.interaction)}</strong></p></div>
    <div className="cell80-controls cell80-world-selector" role="group" aria-label="Choose a fresh test world">{[0,1,2,3,4].map(i=><button type="button" key={i} aria-pressed={world===i} onClick={()=>setWorld(i)}>World {i+1}</button>)}</div>
    <p className="cell80-caption">Seed {result.seed}. The four bars share a scale, which adjusts for each world. Each version starts a whole population in a fresh world. These are total births across that population, rather than one organism’s offspring.</p>
    <div className="cell80-gate" aria-live="polite"><div><span className="record-voice">FIRST CHANGE ADDED BENEFIT</span><strong>{gate.positive}<small> / 5</small></strong></div><div><span className="record-voice">REQUIRED</span><strong>4<small> / 5</small></strong></div><p><strong>Test not passed.</strong> The added benefit also had to be positive on average. This sequence’s average is {signed(Number(gate.mean.toFixed(1)))} births.</p></div>
    <p className="cell80-caption">The interaction is the extra benefit that the first change gives the later setting. A positive result would not, by itself, show the later benefit was impossible without the first change.</p>
  </figure>;
}
