"use client";

import { useEffect, useMemo, useState } from "react";

/**
 * The chart-driven simulator of the analytical-engine repository
 * (scripts/f_sim.py), as it ran on the held-out sheets of Babbage's January
 * 1836 notation: every transition, band by band, with the blind
 * transcription's row-1 mark beside each simulated motion. The trace is
 * public/demos/babbage-series-f/f-sim.json, copied unedited from that
 * repository's docs/data/f-sim.json; regenerate it there.
 */

type Observed = { row1: string | null; figure: string | null; returns: string; other: string } | null;
type Ev = { sheet: string; band: string; row: string; kind: string; component: string; detail: string; status: string; height: number | null; observed: Observed };
type Sheet = { sheet: string; design: string; config: string; events: Ev[] };

const FILE = "/demos/babbage-series-f/f-sim.json";

function seen(o: Observed): "up" | "down" | "both" | "moved" | "none" | "cropped" | null {
  if (!o) return null;
  const m = (o.row1 ?? "").toLowerCase();
  if (/cropped|visible part|not photographed/.test(m)) return "cropped";
  if (!/arrow|stroke/.test(m)) return "none";
  const up = /\bup\b/.test(m), down = /\bdown\b/.test(m);
  return up && down ? "both" : up ? "up" : down ? "down" : "moved";
}

function shift(detail: string): number | null {
  const m = detail.match(/by ([+-]\d*\.?\d+)/);
  return m ? parseFloat(m[1]) : null;
}

function verdict(e: Ev): { text: string; cls: string } {
  if (e.row.startsWith("after") && e.observed && !/(up|down) arrow/i.test(e.observed.other) && /double head/i.test(e.observed.returns))
    return { text: "a double-headed arrow in row 12: a return, or this motion", cls: "na" };
  const s = e.row.startsWith("after") ? (/(up|down) arrow/i.exec(e.observed?.other ?? "")?.[1]?.toLowerCase() ?? "none") : seen(e.observed);
  if (s === null) return { text: "not transcribed", cls: "na" };
  if (s === "cropped") return { text: "cropped", cls: "na" };
  if (e.kind === "no prediction") return s === "none" ? { text: "did not move", cls: "na" } : { text: `moved (${s})`, cls: "na" };
  const d = shift(e.detail);
  if (s === "none") return { text: "no motion seen", cls: "miss" };
  if (d === null) return { text: `moved (${s}); not predicted how`, cls: "na" };
  const want = d > 0 ? "up" : "down";
  return s === want ? { text: `moved ${s}`, cls: "hit" } : { text: `moved ${s}, predicted ${want}`, cls: "miss" };
}

/** The transcription's text, without its markdown emphasis. */
const plain = (t: string) => t.replace(/\*\*/g, "").replace(/<\/?u>/g, "");

function transcribed(e: Ev): string {
  const o = e.observed;
  if (!o) return "—";
  if (o.row1 === null) return plain(o.other || (o.returns && o.returns !== "none" ? `returns: ${o.returns}` : "nothing in rows 11–13"));
  return plain(`${o.row1}${o.figure && o.figure !== "—" ? ` ${o.figure}` : ""}`);
}

const STATUS: Record<string, string> = {
  supported: "Tested on held-out sheets",
  unresolved: "The simulator does not know",
  unverified: "Not tested",
};

/** Step through a held-out sheet, band by band. */
export function SeriesFSimulator() {
  const [data, setData] = useState<Sheet[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sheet, setSheet] = useState(0);
  const [band, setBand] = useState(0);
  useEffect(() => {
    fetch(FILE).then(r => r.ok ? r.json() : Promise.reject(new Error(String(r.status)))).then(d => setData(d as Sheet[])).catch(e => setError(String(e)));
  }, []);
  const s = data?.[sheet];
  const bands = useMemo(() => {
    const out: string[] = [];
    for (const e of s?.events ?? []) if (!out.includes(e.band)) out.push(e.band);
    return out;
  }, [s]);
  if (error) return <p className="babbage-deck-error">The simulator’s trace could not be loaded ({error}).</p>;
  if (!data || !s) return <p className="babbage-deck-idle">Loading the simulator’s trace…</p>;
  const b = bands[Math.min(band, bands.length - 1)];
  const evs = s.events.filter(e => e.band === b);
  const labels = evs.filter(e => ["attach", "detach", "conflict", "lock", "label"].includes(e.kind));
  const motions = evs.filter(e => e.kind === "motion" || e.kind === "no prediction");
  const returns = evs.filter(e => e.kind === "return");
  const moving = evs.filter(e => e.kind === "motion");
  const W = Math.max(320, moving.length * 34 + 40), H = 190, Z = 75, K = 50;
  return <figure className="babbage-explorer series-f-sim">
    <figcaption className="record-voice">THE STATEFUL SIMULATOR / STEP THROUGH A HELD-OUT SHEET</figcaption>
    <div className="babbage-explorer-dates" role="radiogroup" aria-label="The sheet">
      {data.map((x, i) => <button key={x.sheet} type="button" role="radio" aria-checked={i === sheet} className={i === sheet ? "on" : undefined} onClick={() => { setSheet(i); setBand(0); }}>
        <span className="record-voice">{x.sheet}</span><span>{x.design}</span>
      </button>)}
    </div>
    <div className="babbage-deck-bar">
      <button type="button" disabled={band === 0} onClick={() => setBand(band - 1)}>← BAND</button>
      <span className="record-voice">BAND {b} · {bands.indexOf(b) + 1} OF {bands.length} · DISPLACEMENT: {s.config.toUpperCase()}</span>
      <button type="button" disabled={band >= bands.length - 1} onClick={() => setBand(band + 1)}>BAND →</button>
    </div>
    {moving.length > 0 && <svg className="series-f-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`The parts that move in band ${b}, raised or lowered by their platform's displacement`}>
      <line x1={0} x2={W} y1={Z} y2={Z} className="series-f-zero"/>
      {moving.map((e, i) => {
        const d = shift(e.detail), x = 30 + i * 34, v = verdict(e);
        const y = d === null ? Z : Z - d * K;
        return <g key={e.component} className={`series-f-part series-f-${e.status} series-f-${v.cls}`}>
          <title>{`${e.component}: ${e.detail}. Transcribed: ${e.observed ? `${e.observed.row1} ${e.observed.figure}` : "—"}`}</title>
          {d === null
            ? <text x={x} y={Z - 8} textAnchor="middle" className="series-f-unknown">?</text>
            : <line x1={x} x2={x} y1={Z} y2={y} className="series-f-bar"/>}
          <circle cx={x} cy={y} r={5}/>
          <text x={x} y={Z + 72} transform={`rotate(-60 ${x} ${Z + 72})`} className="series-f-name">{e.component.length > 14 ? e.component.slice(0, 13) + "…" : e.component}</text>
        </g>;
      })}
    </svg>}
    <div className="babbage-deck-out"><table>
      <tbody>
        {labels.length > 0 && <tr><th className="record-voice">LABELS ({labels[0].row})</th><td>{labels.map((e, i) => <div key={i}><b>{e.component}</b>: {e.detail} <span className="babbage-status" title={STATUS[e.status]}>{e.status}</span></div>)}</td></tr>}
        <tr><th className="record-voice">ROW {motions[0]?.row ?? "1"}</th><td>{motions.length === 0 ? "Nothing attached." : motions.map((e, i) => {
          const v = verdict(e);
          return <div key={i} className={`series-f-row series-f-${v.cls}`}><b>{e.component}</b>: {e.kind === "no prediction" ? "unknown initial configuration, no prediction" : e.detail} <span className="babbage-status" title={STATUS[e.status]}>{e.status}</span>
            {" · transcribed: "}{transcribed(e)} <i>({v.text})</i></div>;
        })}</td></tr>
        {returns.length > 0 && <tr><th className="record-voice">ROWS 12–1/3</th><td>{returns.map((e, i) => <div key={i}><b>{e.component}</b>: {e.detail} <span className="babbage-status" title={STATUS[e.status]}>{e.status}</span></div>)}</td></tr>}
      </tbody>
    </table></div>
    <p className="babbage-explorer-note">Supported: tested on these sheets before their arrows were read. Unresolved: a bare B (its resource is not known), the carriage sheet’s displacements (F/013’s table is not adopted there), a part whose initial configuration is unknown, the Lock columns. Unverified: the timing of returns and F/032’s “L k”. The transcription beside each motion was read after the predictions were frozen; this view compares after the fact, and the test is the scored result.</p>
  </figure>;
}
