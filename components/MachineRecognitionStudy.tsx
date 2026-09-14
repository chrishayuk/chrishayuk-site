"use client";

import { useState } from "react";
import { recognitionArms, selectionDescriptions } from "@/lib/machine-recognition";
import evidence from "@/public/data/machines/tool-recognition-2-evidence.json";
import scenarios from "@/public/data/machines/tool-recognition-2-scenarios.json";

export function RecognitionDots({ count, total }: { count: number; total: number }) {
 return <span className="mr-dots" aria-hidden="true">{Array.from({ length: total }, (_, i) => <i key={i} data-filled={i < count}/>)}</span>;
}

export function MachineRecognitionStudy() {
 const [selected, setSelected] = useState(0);
 const arm = recognitionArms[selected];
 return <div className="mr-study" id="recognition-outcomes">
  <div className="mr-controls" role="group" aria-label="Choose a Recognition-1 description">{recognitionArms.map((item, index) => <button type="button" key={item.id} aria-pressed={index === selected} onClick={() => setSelected(index)}>{item.id}</button>)}</div>
  <div aria-live="polite" aria-atomic="true">
   <div className="mr-result"><span className="record-voice">B / LLM WILDS / SAME TITLE, URL AND RANK</span><p>{arm.description}</p></div>
   <div className="mr-counts"><div><strong>{arm.recognised}<small> / 3</small></strong><RecognitionDots count={arm.recognised} total={3}/><p>recognised a capability<br/>before opening</p></div><div><strong>3<small> / 3</small></strong><RecognitionDots count={3} total={3}/><p>declared B first<br/>and requested B first</p></div><div><strong>3<small> / 3</small></strong><RecognitionDots count={3} total={3}/><p>used B’s mechanism<br/>and answered correctly</p></div></div>
  </div>
  <p className="mv-caption">One dot per subject. Filled = observed outcome. These controls reveal recorded arms; they do not run an agent.</p>
  <div className="mr-table-wrap"><table><caption>Recognition-1 / all twelve subjects</caption><thead><tr><th scope="col">Description</th><th scope="col">Recognised B</th><th scope="col">Declared / requested B first</th><th scope="col">Correct use</th></tr></thead><tbody>{recognitionArms.map(item => <tr key={item.id}><th scope="row">{item.id}</th><td>{item.recognised}/3</td><td>3/3</td><td>3/3</td></tr>)}</tbody></table></div>
 </div>;
}

export function MachineSelectionStudy() {
 const [arm, setArm] = useState<keyof typeof selectionDescriptions>("DOCUMENT");
 const rows = evidence.subjects.filter(row => row.arm === arm);
 const choseB = rows.filter(row => row.declared === "B").length;
 return <div className="mr-selection">
  <div className="mr-controls" role="group" aria-label="Choose a Recognition-2 description">{Object.keys(selectionDescriptions).map(id => <button key={id} type="button" aria-pressed={arm === id} onClick={() => setArm(id as keyof typeof selectionDescriptions)}>{id}</button>)}</div>
  <div aria-live="polite" aria-atomic="true">
   <div className="mr-candidates">
    {[
     ["A", "OpenStax", "Equations and worked examples for one-dimensional elastic collisions."],
     ["B", "LLM Wilds / Physics", selectionDescriptions[arm]],
     ["C", "PhET / Collision Lab", "Interactive experiments with masses, velocities, momentum and elasticity."],
     ["D", "myPhysicsLab", "A rigid-body collision simulation with adjustable physical parameters."],
    ].map(([id, name, description]) => <div key={id} className="mr-candidate" data-target={id === "B"} data-chosen={id === (choseB ? "B" : "A")}><span className="mr-letter">{id}</span><div><h3>{name}</h3><p>{description}</p></div><span className="mr-pick record-voice">{id === (choseB ? "B" : "A") ? "6 FIRST CHOICES" : id === "B" ? "ONLY THIS LINE CHANGES" : "FIXED"}</span></div>)}
   </div>
   <div className="mr-selection-result"><div><span className="record-voice">RECOGNISED B BEFORE OPENING</span><strong>{rows.filter(row => row.recognised).length}<small> / 6</small></strong><RecognitionDots count={choseB} total={6}/></div><div><span className="record-voice">DECLARED & REQUESTED B FIRST</span><strong>{choseB}<small> / 6</small></strong><RecognitionDots count={choseB} total={6}/></div></div>
  </div>
  <p className="mv-caption">Six recorded subjects per description. First request means the URL selected for fetching; a successful page load was measured later.</p>
 </div>;
}

export function MachineRecognitionPairs() {
 const [selected, setSelected] = useState("S1");
 const scenario = scenarios.find(item => item.id === selected)!;
 return <div className="mr-pairs">
  <div className="mr-pair-head record-voice"><span>SCENARIO</span><span>DOCUMENT / FIRST CHOICE</span><span>CAPABILITY / FIRST CHOICE</span></div>
  <div className="mr-pair-buttons" role="group" aria-label="Inspect a matched scenario">{scenarios.map(item => <button type="button" key={item.id} aria-pressed={selected === item.id} onClick={() => setSelected(item.id)}><span>{item.id}</span><span><b>A</b> OpenStax</span><span><b>B</b> LLM Wilds</span></button>)}</div>
  <div className="mr-pair-detail" aria-live="polite" aria-atomic="true">
   <p className="record-voice">{selected} / TWO FRESH SUBJECTS / IDENTICAL PHYSICS INPUTS</p>
   <div className="mr-physics"><div><span className="mr-object">1</span><p>{scenario.inputs_text.mass1} kg<br/><strong>{scenario.inputs_text.velocity1} m/s</strong></p></div><span className="mr-collision" aria-hidden="true">↔</span><div><span className="mr-object">2</span><p>{scenario.inputs_text.mass2} kg<br/><strong>{scenario.inputs_text.velocity2} m/s</strong></p></div></div>
   <div className="mr-pair-paths">{["DOCUMENT", "CAPABILITY"].map(arm => { const row = evidence.subjects.find(item => item.scenario === selected && item.arm === arm)!; return <div key={arm}><span className="record-voice">{arm} / SUBJECT {String(row.subject).padStart(2, "0")}</span><ol><li>{row.recognised ? "Recognised B as a capability" : "No pre-open recognition of B"}</li><li>Declared {row.declared} → requested {row.requested}</li>{row.fetch_blocked && <li className="mr-blocked">Product fetcher blocked B</li>}<li>{row.provider === "B" ? "Recovered via curl → used B" : "Used OpenStax"}</li></ol></div>; })}</div>
   <p className="mr-answer">Both answered correctly: <strong>v₁ = {scenario.oracle.final_velocity1.exact} m/s</strong><span> · </span><strong>v₂ = {scenario.oracle.final_velocity2.exact} m/s</strong></p>
  </div>
 </div>;
}
