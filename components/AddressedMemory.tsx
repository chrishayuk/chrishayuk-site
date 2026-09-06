"use client";

import { useState } from "react";
import { addressedMemory as data, readAddress } from "@/lib/addressed-memory";

export function AddressedMemory() {
  const [entity, setEntity] = useState("Atlantis");
  const [relation, setRelation] = useState("capital");
  const [suppress, setSuppress] = useState(false);
  const index = data.facts.findIndex(fact => fact.address === `${relation} of ${entity}`);
  const result = readAddress(index, suppress ? index : null);
  const expected = data.facts[index].answer;
  return <section className="address-lab" aria-label="Interactive addressed memory">
    <div className="address-controls">
      <p className="record-voice">01 / CHOOSE AN ADDRESS</p>
      <div className="address-selectors">
        <label>Relation<select value={relation} onChange={e => setRelation(e.target.value)}>
          { ["capital", "currency", "language"].map(value => <option key={value}>{value}</option>) }
        </select></label>
        <span aria-hidden="true">of</span>
        <label>Entity<select value={entity} onChange={e => setEntity(e.target.value)}>
          <option>Atlantis</option><option>Zerivia</option>
        </select></label>
      </div>
      <p>These are invented places with planted answers. Choosing an address supplies its preassigned 24-number vector to the FFN.</p>
      <label className="address-intervention"><input type="checkbox" checked={suppress} onChange={e => setSuppress(e.target.checked)}/> Switch off the matching neuron</label>
    </div>
    <div className="address-calculation">
      <div className="address-keys">
        <p className="record-voice">02 / MATCH KEYS · APPLY RELU</p>
        <p className="address-explanation">Each row compares its key with the input. Negative matches become zero. Other rows can still activate.</p>
        <ol>{data.facts.map((fact, i) => <li key={fact.address} data-selected={index === i}>
          <span className="address-row-label">{fact.address}<small>WRITES {fact.answer.toUpperCase()}</small></span>
          <span className="address-meter" aria-hidden="true"><span style={{width: `${Math.max(0, Math.min(1, result.activations[i])) * 100}%`}}/></span>
          <span className="record-voice">{result.activations[i].toFixed(3)}</span>
        </li>)}</ol>
      </div>
      <div className="address-readout">
        <p className="record-voice">03 / COMBINE VALUES · READ THE OUTPUT</p>
        <div role="status" aria-live="polite" aria-atomic="true">
          <p className="address-answer">{result.answer}</p>
          <p>{suppress ? `Matching neuron switched off. Planted answer: ${expected}.` : `Planted answer: ${expected}. ${result.answer === expected ? "Recovered." : "Not recovered."}`}</p>
        </div>
        <p className="address-explanation">Every active row adds its value vector, weighted by its activation. The answer is the word whose reader scores that combined output highest.</p>
        <dl>{data.vocab.map((word, i) => <div key={word} data-winner={word === result.answer}><dt>{word}</dt><dd>{result.scores[i].toFixed(3)}</dd></div>)}</dl>
        <p className="record-voice">DOT-PRODUCT SCORES / NOT PROBABILITIES</p>
      </div>
    </div>
    <details className="address-math"><summary>Inspect the calculation</summary>
      <p><code>activations = ReLU(W_in × address)</code><br/><code>output = W_outᵀ × activations</code><br/><code>answer = highest dot(output, word_reader)</code></p>
      <p>There are six rows, each with 24 dimensions. This uses two matrix projections and a ReLU. The browser recomputes the result when you change the controls. Switching off a neuron sets its activation to zero before combining the values.</p>
    </details>
  </section>;
}
