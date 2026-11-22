"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * A delay line of the 1945 report: 32 minor cycles going round, one of them
 * at the reading end in each minor cycle. Six instructions of type A are laid
 * out two ways: two minor cycles apart, as the report numbers them (Fig. 19),
 * or side by side. Each takes one minor cycle to find and one to obey, so
 * side by side the next has always just gone by. The times come from the
 * same rule the simulator uses; nothing here is measured.
 */

const SLOTS = 32;
const COUNT = 6;

/** The minor cycle in which each instruction is found, laid out `gap` apart. */
function timeline(gap: number) {
  const found: number[] = [];
  let time = 0;
  for (let k = 0; k < COUNT; k++) {
    const slot = gap * k;
    const at = time + ((slot - (time % SLOTS)) + SLOTS) % SLOTS;
    found.push(at);
    time = at + 2;
  }
  return { found, end: time };
}

export function AceDelayLine() {
  const [gap, setGap] = useState(2);
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const { found, end } = useMemo(() => timeline(gap), [gap]);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setTime(t => {
      if (t >= end) { setPlaying(false); return t; }
      return t + 1;
    }), gap === 2 ? 260 : 45);
    return () => window.clearInterval(timer);
  }, [end, gap, playing]);

  const choose = (g: number) => { setGap(g); setTime(0); setPlaying(false); };
  const head = time % SLOTS;
  const done = found.filter(t => t + 1 < time).length;
  const busy = found.findIndex(t => t <= time && time <= t + 1);
  const radius = 120;
  return <figure className="ace-figure ace-delay">
    <div className="ace-delay-body">
      <svg viewBox="-160 -160 320 320" role="img" aria-label={`A delay line of 32 minor cycles. Minor cycle ${time}: slot ${head} is at the reading end. ${done} of ${COUNT} instructions obeyed.`}>
        <circle r={radius} className="ace-delay-ring"/>
        {Array.from({ length: SLOTS }, (_, slot) => {
          // The line turns: the slot at the reading end is drawn at the top.
          const angle = ((slot - head) / SLOTS) * 2 * Math.PI - Math.PI / 2;
          const x = Math.cos(angle) * radius, y = Math.sin(angle) * radius;
          const k = slot % gap === 0 && slot / gap < COUNT ? slot / gap : -1;
          const state = k < 0 ? "empty" : found[k] + 1 < time ? "done" : k === busy ? "busy" : "waiting";
          return <g key={slot} transform={`translate(${x.toFixed(1)} ${y.toFixed(1)})`} className={`ace-delay-slot ace-delay-${state}`}>
            <rect x={-11} y={-11} width={22} height={22}/>
            <text dy="4">{k < 0 ? "" : k + 1}</text>
          </g>;
        })}
        <path d={`M 0 ${-radius - 30} L -7 ${-radius - 44} L 7 ${-radius - 44} Z`} className="ace-delay-head"/>
        <text y="-8" className="ace-delay-count">{time}</text>
        <text y="14" className="ace-delay-unit">MINOR CYCLES</text>
        <text y="34" className="ace-delay-unit">{(time * 32).toLocaleString("en-GB")} µs</text>
      </svg>
      <div className="ace-delay-side">
        <div className="ace-delay-choice" role="radiogroup" aria-label="Where the instructions lie">
          <button type="button" role="radio" aria-checked={gap === 2} onClick={() => choose(2)}>TWO APART, AS TURING NUMBERS THEM</button>
          <button type="button" role="radio" aria-checked={gap === 1} onClick={() => choose(1)}>SIDE BY SIDE</button>
        </div>
        <div className="ace-delay-controls">
          <button type="button" onClick={() => { if (time >= end) setTime(0); setPlaying(p => !p); }}>{playing ? "PAUSE" : time >= end ? "AGAIN" : "PLAY"}</button>
          <button type="button" onClick={() => { setPlaying(false); setTime(t => Math.min(t + 1, end)); }} disabled={time >= end}>ONE MINOR CYCLE</button>
        </div>
        <p className="ace-delay-status" aria-live="polite">{done} of {COUNT} instructions obeyed. {time >= end ? `All six took ${end} minor cycles, ${(end * 32).toLocaleString("en-GB")} microseconds.` : busy >= 0 ? `Instruction ${busy + 1} is in hand.` : "Waiting for the next instruction to come round."}</p>
        <p className="ace-delay-note">Each instruction is found as its minor cycle reaches the end of the line, and obeyed in the minor cycle after. Two apart, the next arrives just then. Side by side it has just gone by, and the machine waits {SLOTS - 1} minor cycles for it to come round again.</p>
      </div>
    </div>
    <figcaption className="record-voice">ONE DELAY LINE: 1,024 PULSES, 32 MINOR CYCLES OF 32 DIGITS, ROUND ONCE A MILLISECOND · SECTIONS 3, 4 AND 11 OF THE REPORT</figcaption>
  </figure>;
}
