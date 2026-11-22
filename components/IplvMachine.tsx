"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FILES, H0, H1, H2, Iplv, W0, type Example, type State, type Structure } from "@/lib/iplv-machine";

/**
 * The IPL computer, stepped where the reader can see it.
 *
 * The machine is the Rust program from github.com/chrishayuk/ipl-v, compiled
 * to WebAssembly (lib/iplv-machine.ts). This component only asks it what it
 * holds: the instruction, the cells with system functions, storage read
 * where it lies, and any list structure. It is a port of web/index.html in
 * that repository.
 */

const P = ["Execute S.", "Input S: push H0 down and put S in it.", "Output to S: put (0) in cell S and pop H0 up.",
  "Restore S: pop it up.", "Preserve S: push it down.", "Replace (0) by S.", "Copy (0) in cell S.",
  "Branch to S if H5 is −; otherwise go on."];
const Q = (symb: string) => [`S is ${symb}.`, `S is the symbol in cell ${symb}.`, `S is the symbol in the cell named in cell ${symb}.`,
  `S is ${symb}. A monitor point: this routine is traced.`, `S is ${symb}. Traced if the routine that executes it is.`];

/** What an instruction does, in words. */
function meaning(cia: State["cia"]) {
  if (cia.q === 5) return `${cia.symb}, a basic process, as the last process of its list.`;
  return `${P[cia.p]} ${Q(cia.symb)[cia.q] ?? ""}`;
}

/** Instructions per tick, and milliseconds between ticks, for each speed. */
const SPEEDS: [number, number][] = [[1, 700], [1, 300], [1, 120], [1, 40], [3, 16], [20, 16], [150, 16], [1000, 16], [6000, 16], [30000, 16], [200000, 16]];

/** The kinds of cell the storage map tells apart, in its legend's order. */
const KINDS = [["free", "available space"], ["region", "a region"], ["loaded", "loaded from cards"], ["made", "made while running"],
  ["data", "a data term"], ["h0", "under H0"], ["h1", "under H1: routines in progress"], ["wcell", "under W0–W9"],
  ["flash", "just changed"], ["now", "the instruction"]] as const;

function rgb(element: Element, name: string): number[] {
  const canvas = document.createElement("canvas").getContext("2d")!;
  canvas.fillStyle = getComputedStyle(element).getPropertyValue(`--iplv-${name}`).trim() || "#888";
  canvas.fillRect(0, 0, 1, 1);
  return [...canvas.getImageData(0, 0, 1, 1).data];
}

type Shown = { s: State; tree: Structure | null; root: string };

export function IplvMachine() {
  const [examples, setExamples] = useState<Example[]>([]);
  const [chosen, setChosen] = useState(0);
  const [deck, setDeck] = useState("");
  const [input, setInput] = useState("");
  const [editing, setEditing] = useState(false);
  const [shown, setShown] = useState<Shown | null>(null);
  const [printed, setPrinted] = useState("");
  const [traced, setTraced] = useState("");
  const [symbol, setSymbol] = useState("");
  const [speed, setSpeed] = useState(3);
  const [running, setRunning] = useState(false);
  const [traceAll, setTraceAll] = useState(false);
  const [breaks, setBreaks] = useState<Set<number>>(new Set());
  const [where, setWhere] = useState("");
  const [lines, setLines] = useState<Map<number, number>>(new Map());
  const [mapRows, setMapRows] = useState({ cols: 100, to: 400 });

  const machine = useRef<Iplv | null>(null);
  const loaded = useRef<Set<number>>(new Set());
  const previous = useRef<Uint8Array | null>(null);
  const changed = useRef<Set<number>>(new Set());
  const extent = useRef(0);
  const canvas = useRef<HTMLCanvasElement | null>(null);
  const listing = useRef<HTMLDivElement | null>(null);
  const lab = useRef<HTMLElement | null>(null);
  const symbolRef = useRef(symbol);
  symbolRef.current = symbol;

  /** Draw storage, a square for each cell, coloured by what it is for. */
  const drawMap = useCallback((m: Iplv, s: State) => {
    const words = m.words();
    const top = s.top;
    const kind = new Uint8Array(top).fill(3);
    for (let a = 0; a < Math.min(top, s.brk); a++) kind[a] = 1;
    for (const a of loaded.current) if (a < top) kind[a] = 2;
    for (let c = words.link(H2), n = 0; c !== 0 && n < words.length; c = words.link(c), n++) if (c < top) kind[c] = 0;
    for (let a = s.brk; a < top; a++) if (kind[a] === 3 && words.q(a) === 1 && !loaded.current.has(a)) kind[a] = 4;
    const under = (cell: number, k: number) => {
      for (let c = words.link(cell), n = 0; c !== 0 && n < top; c = words.link(c), n++) if (c < top) kind[c] = k;
    };
    under(H0, 5);
    under(H1, 6);
    for (let i = 0; i < 10; i++) under(W0 + i, 7);
    const bytes = words.bytes;
    const now = new Set<number>();
    const was = previous.current;
    if (was && was.length === bytes.length) {
      for (let a = 64; a < top; a++) {
        const o = a * 12;
        for (const k of [0, 1, 4, 5, 6, 8, 9, 10]) if (bytes[o + k] !== was[o + k]) { now.add(a); break; }
      }
    }
    previous.current = bytes.slice();
    changed.current = now;
    for (const a of now) if (kind[a] !== 0) kind[a] = 8;
    if (!s.halted && s.cia.a < top) kind[s.cia.a] = 9;
    // The picture stops a little above the highest cell that has been in
    // use, and never shrinks during a run.
    for (let a = top - 1; a > extent.current; a--) if (kind[a] !== 0) extent.current = a;
    const to = Math.min(top, Math.max(400, extent.current + 1));
    const cols = to <= 2000 ? 100 : to <= 8000 ? 200 : 320;
    const height = Math.ceil(to / cols);
    const c = canvas.current;
    if (!c || !lab.current) return;
    if (c.width !== cols || c.height !== height) { c.width = cols; c.height = height; }
    const palette = KINDS.map(([name]) => rgb(lab.current!, name));
    const g = c.getContext("2d")!;
    const image = g.createImageData(cols, height);
    for (let a = 0; a < Math.min(top, cols * height); a++) image.data.set(palette[kind[a]], a * 4);
    g.putImageData(image, 0, 0);
    setMapRows({ cols, to: cols * height });
  }, []);

  /** Read the machine after it has moved. */
  const look = useCallback((m: Iplv) => {
    const out = m.output(), trace = m.traced();
    if (out) setPrinted(text => text + out);
    if (trace) setTraced(text => (text + trace).slice(-40000));
    const s = m.state();
    const named = symbolRef.current.trim();
    const root = named ? m.resolve(named) : s.h0.items[0].a;
    setShown({ s, tree: root >= 0 ? m.structure(root, 200) : null, root: named ? named.toUpperCase() : s.h0.items[0].name });
    drawMap(m, s);
  }, [drawMap]);

  const load = useCallback(async (text: string, cards: string) => {
    setRunning(false);
    const m = await Iplv.create();
    machine.current = m;
    m.load(text.toUpperCase(), cards.toUpperCase());
    m.trace(traceAll ? 1 : 0);
    const warned = m.warnings();
    setPrinted(warned ? warned.split("\n").filter(Boolean).map(w => `! ${w.split("\n")[0]}\n`).join("") : "");
    setTraced("");
    const map = new Map<number, number>();
    for (const [line, a] of m.lines()) map.set(line, a);
    setLines(map);
    loaded.current = new Set(map.values());
    previous.current = null;
    extent.current = 0;
    setBreaks(new Set());
    look(m);
  }, [look, traceAll]);

  useEffect(() => {
    let cancelled = false;
    fetch(`${FILES}/examples.json`).then(r => r.json() as Promise<Example[]>).then(list => {
      if (cancelled) return;
      setExamples(list);
      const wanted = new URLSearchParams(window.location.search).get("deck");
      const index = Math.max(0, list.findIndex(e => e.name === wanted));
      setChosen(index);
      setDeck(list[index].deck);
      setInput(list[index].input);
      void load(list[index].deck, list[index].input);
    });
    return () => { cancelled = true; };
    // Once, on arrival.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const step = useCallback((n: number, mode: number) => {
    const m = machine.current;
    if (!m) return "halted";
    const why = m.advance(n, mode);
    look(m);
    return why;
  }, [look]);

  useEffect(() => {
    if (!running) return;
    let timer = 0;
    const tick = () => {
      const [n, wait] = SPEEDS[speed];
      if (step(n, 0) === "done") timer = window.setTimeout(tick, wait);
      else setRunning(false);
    };
    timer = window.setTimeout(tick, 0);
    return () => window.clearTimeout(timer);
  }, [running, speed, step]);

  // Keep the card being interpreted in view.
  useEffect(() => {
    const row = listing.current?.querySelector<HTMLElement>("[data-now]");
    const box = listing.current;
    if (!row || !box) return;
    const top = row.offsetTop - box.offsetTop;
    if (top < box.scrollTop + 20 || top > box.scrollTop + box.clientHeight - 40) box.scrollTop = top - box.clientHeight / 2;
  }, [shown]);

  const s = shown?.s;
  const cards = useMemo(() => { const c = deck.split("\n"); if (c.at(-1) === "") c.pop(); return c; }, [deck]);
  const now = s && !s.halted ? (s.cia.line || (s.calls.find(c => c.line)?.line ?? 0)) : 0;
  const choose = (index: number) => {
    const e = examples[index];
    setChosen(index); setDeck(e.deck); setInput(e.input); setSymbol(""); setEditing(false);
    void load(e.deck, e.input);
  };
  const toggle = (a: number) => {
    const next = new Set(breaks);
    const on = !next.has(a);
    if (on) next.add(a); else next.delete(a);
    machine.current?.setBreak(a, on);
    setBreaks(next);
  };
  const show = (text: string) => { setSymbol(text); symbolRef.current = text; if (machine.current) look(machine.current); };

  return <section ref={lab} className="iplv-lab" aria-label="The IPL computer">
    <div className="iplv-bar">
      <label>Deck<select value={chosen} onChange={event => choose(Number(event.target.value))}>
        <optgroup label="Examples">{examples.map((e, i) => e.expected === undefined && <option key={e.name} value={i}>{e.name}: {e.title.toLowerCase()}</option>)}</optgroup>
        <optgroup label="The manual’s programs (Part One)">{examples.map((e, i) => e.expected !== undefined && <option key={e.name} value={i}>{e.name}: {e.title.toLowerCase()}</option>)}</optgroup>
      </select></label>
      <label className="iplv-file">Open a deck…<input type="file" multiple onChange={async event => {
        const texts = await Promise.all([...(event.target.files ?? [])].map(file => file.text()));
        if (!texts.length) return;
        setDeck(texts[0]); setInput(texts.slice(1).join("")); setSymbol(""); setEditing(false);
        void load(texts[0], texts.slice(1).join(""));
      }}/></label>
      <button type="button" onClick={() => void load(deck, input)}>LOAD</button>
      <button type="button" className="iplv-go" onClick={() => { setRunning(false); step(1, 0); }} disabled={!s || s.halted}>STEP</button>
      <button type="button" onClick={() => { setRunning(false); step(5_000_000, 1); }} disabled={!s || s.halted} title="Go on to this routine’s next instruction">OVER</button>
      <button type="button" onClick={() => { setRunning(false); step(5_000_000, 2); }} disabled={!s || s.halted} title="Go on until this routine has finished">OUT</button>
      <button type="button" onClick={() => setRunning(r => !r)} disabled={!s || s.halted}>{running ? "STOP" : "RUN"}</button>
      <label className="iplv-speed">Speed<input type="range" min={0} max={10} value={speed} onChange={event => setSpeed(Number(event.target.value))}/></label>
      <label className="iplv-check"><input type="checkbox" checked={editing} onChange={event => setEditing(event.target.checked)}/> Edit the deck</label>
      <span className="record-voice" aria-live="polite">{s ? (s.error ? "STOPPED ON AN ERROR" : s.halted ? `HALTED AFTER ${s.cycles.toLocaleString()} CYCLES` : `${s.cycles.toLocaleString()} CYCLES`) : "LOADING"}</span>
    </div>

    <div className="iplv-grid">
      <div className="iplv-panel">
        <p className="record-voice">01 / THE DECK: ONE CARD TO A WORD. CLICK BESIDE A CARD TO STOP THERE.</p>
        {editing
          ? <textarea className="iplv-edit" value={deck} spellCheck={false} wrap="off" aria-label="The deck" onChange={event => setDeck(event.target.value)}/>
          : <div className="iplv-listing" ref={listing}>
            <div className="iplv-ruler" aria-hidden="true">{"comments".padEnd(40)}T NAME ±PQSYMB  LINK</div>
            {cards.map((card, i) => {
              const a = lines.get(i + 1);
              return <div key={i} className="iplv-row" data-now={i + 1 === now ? "" : undefined} data-break={a !== undefined && breaks.has(a) ? "" : undefined}>
                {a !== undefined ? <button type="button" className="iplv-bp" aria-label={`Stop at cell ${a}`} onClick={() => toggle(a)}/> : <span className="iplv-bp"/>}
                <span className="iplv-addr">{a ?? ""}</span>
                <span className={a === undefined ? "iplv-note" : undefined}>{card || " "}</span>
              </div>;
            })}
          </div>}
        <textarea className="iplv-input" value={input} spellCheck={false} wrap="off" placeholder="Cards for the program to read" aria-label="Cards for the program to read" onChange={event => setInput(event.target.value)}/>
      </div>

      <div className="iplv-panel iplv-machine">
        <p className="record-voice">02 / THE INTERPRETER</p>
        {s && <>
          <p className="iplv-now">{s.error ? <b>Stopped.</b> : s.halted ? <b>Halted.</b> : <><b>{s.cia.place}</b> {s.cia.q === 5 ? "" : `${s.cia.p}${s.cia.q} `}{s.cia.symb}</>}</p>
          <p className="iplv-means">{s.error ? <span className="iplv-error">{s.error}</span> : s.halted ? "H1 is empty: the routine the start card named has finished." : <>{meaning(s.cia)}{s.cia.comment && ` — “${s.cia.comment}”`}</>}</p>
          <dl className="iplv-facts"><dt>H5</dt><dd>{s.h5}</dd><dt>Level</dt><dd>{s.level}</dd><dt>H3</dt><dd>{s.h3.toLocaleString()}</dd><dt>Cards to read</dt><dd>{s.cards}</dd></dl>
          <p className="record-voice">AVAILABLE SPACE: {s.free.toLocaleString()} OF {s.space.toLocaleString()} CELLS</p>
          <div className="iplv-space" title={`${s.space - s.free} cells in use; ${s.space - s.low} at the most`}><i style={{ width: `${(100 * (s.space - s.free)) / s.space}%` }}/></div>
          <p className="record-voice">H0, THE COMMUNICATION CELL</p>
          <table><tbody>{s.h0.items.map((item, i) => <tr key={i}><td className="iplv-k">({i})</td><td><button type="button" className="iplv-sym" onClick={() => show(item.name)}>{item.name}</button></td><td className="iplv-t">{item.text}</td></tr>)}
            {s.h0.depth > s.h0.items.length && <tr><td className="iplv-k">…</td><td className="iplv-t" colSpan={2}>{s.h0.depth - s.h0.items.length} more</td></tr>}</tbody></table>
          <p className="record-voice">WORKING CELLS</p>
          <table><tbody>{s.w.map((cell, i) => (cell.depth > 1 || cell.items[0].a !== 0) && <tr key={i}><td className="iplv-k">W{i}</td><td><button type="button" className="iplv-sym" onClick={() => show(cell.items[0].name)}>{cell.items[0].name}</button></td><td className="iplv-t">{cell.items[0].text}</td><td className="iplv-t">{cell.depth > 1 ? `over ${cell.items.slice(1).map(x => x.name).join(", ")}${cell.depth > cell.items.length ? ", …" : ""}` : ""}</td></tr>)}</tbody></table>
          <p className="record-voice">H1: ROUTINES IN PROGRESS</p>
          <table><tbody>{s.calls.slice(0, 30).map((c, i) => <tr key={i}><td className="iplv-k">{s.level - i}</td><td>{c.place}</td><td className="iplv-t">{c.native ? "for a basic process" : ""}</td></tr>)}</tbody></table>
        </>}
      </div>
    </div>

    <div className="iplv-panel">
      <p className="record-voice">03 / STORAGE: CELLS 0 TO {(mapRows.to - 1).toLocaleString()}, {mapRows.cols} TO A ROW</p>
      <canvas ref={canvas} className="iplv-map" width={100} height={4}
        onMouseMove={event => {
          const box = event.currentTarget.getBoundingClientRect();
          const a = Math.floor(((event.clientY - box.top) / box.height) * event.currentTarget.height) * event.currentTarget.width + Math.floor(((event.clientX - box.left) / box.width) * event.currentTarget.width);
          setWhere(machine.current && s && a < s.top ? `cell ${a}   ${machine.current.describe(a)}` : "");
          event.currentTarget.dataset.cell = String(a);
        }}
        onClick={event => show(event.currentTarget.dataset.cell ?? "")}/>
      <ul className="iplv-legend">{KINDS.map(([kind, text]) => <li key={kind}><i style={{ background: `var(--iplv-${kind})` }}/>{text}</li>)}</ul>
      <p className="iplv-where">{where || " "}</p>
    </div>

    <div className="iplv-grid">
      <div className="iplv-panel">
        <p className="record-voice">04 / A LIST STRUCTURE <input className="iplv-show" value={symbol} placeholder="(0)" aria-label="Symbol to show" onChange={event => show(event.target.value)}/> {!symbol && shown && <span>FOLLOWING (0), WHICH IS {shown.root}</span>}</p>
        {shown?.tree ? <Tree tree={shown.tree} changed={changed.current} onPick={show}/> : <p className="iplv-t">{symbol ? `${symbol.toUpperCase()} is not a symbol in use.` : ""}</p>}
      </div>
      <div className="iplv-panel">
        <p className="record-voice">05 / PRINTED</p>
        <pre className="iplv-out">{printed}</pre>
        <p className="record-voice">06 / TRACED <label className="iplv-check"><input type="checkbox" checked={traceAll} onChange={event => { setTraceAll(event.target.checked); machine.current?.trace(event.target.checked ? 1 : 0); }}/> Every instruction</label></p>
        <pre className="iplv-out iplv-trace">{traced}</pre>
      </div>
    </div>
  </section>;
}

/** A list structure as boxes and arrows: one row of cells to a list. */
function Tree({ tree, changed, onPick }: { tree: Structure; changed: Set<number>; onPick: (symbol: string) => void }) {
  const [W, H, GAP, LEFT, PER] = [70, 38, 20, 64, 6];
  let y = 8;
  const heads = new Map<number, [number, number]>();
  const wants: [number, number, number][] = [];
  const parts: React.ReactNode[] = [];
  const wires: React.ReactNode[] = [];
  for (const list of tree.lists) {
    heads.set(list.a, [LEFT, y]);
    parts.push(<text key={`n${list.a}`} x={0} y={y + 16} className="iplv-name">{list.name}</text>, <text key={`a${list.a}`} x={0} y={y + 30} className="iplv-small">{list.a}</text>);
    list.cells.forEach((c, i) => {
      const [col, line] = [i % PER, Math.floor(i / PER)];
      const [x, cy] = [LEFT + col * (W + GAP), y + line * (H + 18)];
      const label = c.kind === "data" ? c.data : c.kind === "empty" ? (i === 0 ? "" : "0") : c.name;
      const pick = c.kind !== "data" && c.kind !== "empty" ? () => onPick(c.kind === "regional" ? c.name : String(c.s)) : undefined;
      parts.push(<g key={`c${c.a}-${i}`} className={`iplv-cell iplv-${c.kind}${i === 0 ? " iplv-head" : ""}${c.data && c.kind !== "data" ? " iplv-named" : ""}${changed.has(c.a) ? " iplv-changed" : ""}`} onClick={pick}>
        <title>{`cell ${c.a}: ${c.kind === "data" ? `${c.p}${c.q} ${c.data}` : `${c.p}${c.q} ${c.name} ${c.l}`}`}</title>
        <rect x={x} y={cy} width={W} height={H}/>
        <text x={x + 6} y={cy + 15}>{label.length > 9 ? `${label.slice(0, 8)}…` : label}</text>
        <text x={x + 6} y={cy + 30} className="iplv-small">{c.kind === "data" ? `data ${c.p}${c.q}` : c.data ? `“${c.data}”` : c.a}</text>
      </g>);
      if (c.kind === "local") wants.push([x + W / 2, cy + H, c.s]);
      const last = i === list.cells.length - 1;
      if (!last && col < PER - 1) wires.push(<path key={`w${c.a}-${i}`} className="iplv-wire" d={`M${x + W},${cy + H / 2} h${GAP - 5} m-5,-4 l5,4 l-5,4`}/>);
      else if (!last) wires.push(<path key={`w${c.a}-${i}`} className="iplv-wire" d={`M${x + W},${cy + H / 2} h8 v${H / 2 + 9} H${LEFT - 10} v${H / 2 + 9} h5 m-5,-4 l5,4 l-5,4`}/>);
      else if (list.end !== "data") parts.push(<text key={`e${c.a}`} x={x + W + 6} y={cy + H / 2 + 4} className="iplv-small">{{ "0": "0", cell: "a termination cell", more: "… and more", loop: "↺ runs into itself", data: "" }[list.end]}</text>);
    });
    y += Math.ceil(list.cells.length / PER) * (H + 18) + 14;
  }
  for (const [x, cy, to] of wants) {
    const head = heads.get(to);
    if (head) wires.push(<path key={`s${x}-${cy}`} className="iplv-sub" d={`M${x},${cy} C${x},${cy + 22} ${head[0] + 20},${head[1] - 26} ${head[0] + 20},${head[1]}`}/>);
  }
  const width = LEFT + PER * (W + GAP);
  return <div className="iplv-tree"><svg width={width} height={y} viewBox={`0 0 ${width} ${y}`} role="img" aria-label={`The list structure ${tree.lists[0]?.name ?? ""}`}>{wires}{parts}</svg></div>;
}
