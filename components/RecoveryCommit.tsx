"use client";
import { useFigureSequence } from "./useFigureSequence";
import data from "@/public/data/ecology/recovery/evidence.json";

const frames = [
  { label: "Damaged record", values: data.example.damaged, note: "The second entry had been changed." },
  { label: "Executable proposal", values: data.example.proposed, note: "The mechanism returned the correct record." },
  { label: "Qwen’s actual write", values: data.example.committed, note: "The successor wrote a different, incorrect record." },
];
export function RecoveryCommit() {
  const sequence = useFigureSequence(2, 3000);
  const frame = frames[sequence.step];
  return <figure id="recovery-commit" className="recovery-commit" ref={sequence.element} data-running={sequence.running} data-animate={sequence.animate}>
    <figcaption>One recorded failure <span>Block {data.example.block} · G{data.example.generation}</span></figcaption>
    <div className="recovery-commit-stage">
      <p className="recovery-stage-label">{frame.label}</p>
      <div className="recovery-record-line" key={sequence.step} aria-label={`${frame.label}: ${frame.values.join(', ')}`}>
        <span aria-hidden="true">[</span>{frame.values.map((value, index) => <strong key={index} data-changed={value !== data.example.proposed[index]}>{value}</strong>)}<span aria-hidden="true">]</span>
      </div>
      <p className="recovery-commit-caption">{frame.note}</p>
    </div>
    <div className="recovery-transport"><nav aria-label="Recorded proposal and commit">{frames.map((item, index) => <button type="button" key={item.label} aria-current={index === sequence.step ? "step" : undefined} onClick={() => sequence.select(index)}><span>0{index + 1}</span>{item.label}</button>)}</nav><button type="button" className="recovery-play" onClick={sequence.running ? sequence.pause : sequence.play}>{sequence.running ? "Pause" : "Play the sequence"} <span aria-hidden="true">{sequence.running ? "Ⅱ" : "↗"}</span></button></div>
    <details className="recovery-explore"><summary>Read the three recorded states</summary><dl>{frames.map(item => <div key={item.label}><dt>{item.label}</dt><dd>[{item.values.join(', ')}]</dd></div>)}</dl></details>
    <p className="recovery-caption">Recorded order, with editorial timing. A correct proposal did not guarantee a correct write. Source: world-09.json, first successor generation.</p>
  </figure>;
}
