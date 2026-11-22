// The ACE as Turing's report describes it, to stand in front of: a card
// reader with the job in its hopper, the mercury delay lines with the job
// going round in them, the control's lamps, and the punch and the listing.
//
//   import { mountConsole } from "./console.js";
//   const ace = mountConsole(element);
//   await ace.load({ name: "answer", program, input });   // the deck goes into the hopper
//   ace.start();                                           // close the starting switch
//
// What is from the report (A. M. Turing, Proposed Electronic Calculator,
// 1945), and what is not:
//
// - The machine starts empty. "Actually it has been arranged that the special
//   initial order consists of 0 throughout so that there is no need to set it
//   up." (section 7) That order reads a card into DL 0, and "the first few
//   orders obeyed will probably be to take in a few more cards". The deck the
//   machine reads is made by `ace deck`; its format is ours (src/deck.rs).
// - The starting device "merely emits pulses synchronously with the clock from
//   a certain point onwards, on the closing of a switch manually" (section 11).
// - The memory is delay lines, "mercury or water tubes about 5' long and 1"
//   diameter in contact with a quartz crystal at each end", 1024 digits going
//   round in 1.024 ms (section 3), in 32 minor cycles of 32 digits (section 4).
//   Each tube here is drawn going round at that rate, scaled by the speed
//   chosen; a minor cycle is read as it comes past the crystal at the end.
// - CD and CI are kept as lamps because the control turns them into "static
//   form, i.e. we transfer it on to trigger circuits" (section 11). The
//   temporary storages, "about 50 and each with a capacity of say 32 binary
//   digits" (section 2), are TS 1 to TS 32 in section 12; showing them as
//   lamps is ours.
// - Input and output are Hollerith cards, 32 columns and all 12 rows (section
//   7). "As each row comes into position for reading a signal is sent back to
//   the calculator": the rows of the card in the reader light one by one. The
//   report proposes the 80 columns of an instruction card (section 7 (v)); the
//   machine reads columns 41-72, the genuine input, and that is where the
//   holes are drawn. Its card reader's speed is not given: the simulation
//   takes 100 cards a minute (src/machine.rs, CARD_TIME).
// - BINDEC writes numbers "such that the content of DL 10 can be passed out
//   onto a card in the usual way and if the card is then listed the digits of
//   the numbers will then appear on the listing paper in the usual way"
//   (section 13). The listing paper shows each punched card as a tabulator
//   would list it.
// - The sounds are made by the browser, not recorded.
//
// Everything the machine does is computed by ace.wasm (`ace run - --json
// --cold`) in worker.js before it is shown; this module only plays it back.

const MINOR_CYCLE_US = 32;
const ROWS = ["12", "11", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

// How long things take on the screen, in milliseconds. `mc` is one minor
// cycle of computing; `card` is one card through the reader or the punch.
// While the deck is loading, `deckMc` and `deckCard` are used instead.
export const SPEEDS = {
  watch: { label: "Slowed down to watch", mc: 28, card: 1400, deckMc: 0.25, deckCard: 160 },
  real: { label: "The machine's own speed", mc: 0.032, card: 600, deckMc: 0.032, deckCard: 600 },
  hurry: { label: "Hurry", mc: 0.004, card: 60, deckMc: 0.004, deckCard: 25 },
};

const CSS = `
.ace-console{--paper:#efece4;--ink:#171614;--faint:#8b877d;--panel:#262420;--panel-ink:#e9e3d2;--lamp-off:#3a362f;--lamp:#ffb347;--lamp-glow:rgba(255,170,60,.55);--mercury:#c9ccd1;--mercury-dark:#8e939b;--pulse:#1e4e8c;--card:#efe2c2;--card-edge:#c9b68c;--hole:#2a2620;--hot:#d9482b;
 font:14px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;color:var(--ink);background:var(--paper);border:1px solid #cfcabd;border-radius:10px;padding:14px;display:grid;gap:12px;max-width:100%;box-sizing:border-box}
@media (prefers-color-scheme:dark){.ace-console:not([data-theme=light]){--paper:#1b1a18;--ink:#ece8de;--faint:#8f8a7f;--card:#d9cba6;--card-edge:#a8956b;border-color:#3a3732}}
.ace-console[data-theme=dark]{--paper:#1b1a18;--ink:#ece8de;--faint:#8f8a7f;--card:#d9cba6;--card-edge:#a8956b;border-color:#3a3732}
.ace-console *{box-sizing:border-box}
.ace-top{display:flex;flex-wrap:wrap;align-items:center;gap:10px 16px}
.ace-title{font-family:Georgia,serif;font-size:19px;margin-right:auto}
.ace-title small{display:block;font-size:12px;color:var(--faint);font-family:ui-sans-serif,system-ui,sans-serif}
.ace-clock{font-family:ui-monospace,Menlo,monospace;font-size:13px;text-align:right}
.ace-clock b{font-size:18px;font-weight:600}
.ace-top select,.ace-top button{font:inherit;font-size:13px;padding:5px 9px;border:1px solid #bdb7a8;border-radius:6px;background:transparent;color:inherit}
.ace-switch{display:flex;align-items:center;gap:8px;cursor:pointer;user-select:none;border:none!important;padding:0!important}
.ace-switch .lever{width:46px;height:26px;border-radius:13px;background:#6b665c;position:relative;transition:background .2s}
.ace-switch .lever::after{content:"";position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#f4f1ea;transition:left .2s}
.ace-switch[aria-pressed=true] .lever{background:#b3542f}
.ace-switch[aria-pressed=true] .lever::after{left:23px}
.ace-floor{display:grid;grid-template-columns:minmax(170px,210px) 1fr minmax(250px,300px);gap:12px;align-items:start}
@media (max-width:980px){.ace-floor{grid-template-columns:minmax(0,1fr)}}
.ace-box{background:var(--panel);color:var(--panel-ink);border-radius:8px;padding:10px;min-width:0}
.ace-box h4{margin:0 0 8px;font:600 11px/1 ui-sans-serif,system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#bdb5a1}
.ace-box h4 span{font-weight:400;letter-spacing:0;text-transform:none;color:#8f887a}
.ace-hopper{height:46px;position:relative;margin-bottom:8px}
.ace-hopper i{position:absolute;left:8px;right:8px;height:3px;background:var(--card);border-bottom:1px solid var(--card-edge);border-radius:1px}
.ace-count{font-family:ui-monospace,Menlo,monospace;font-size:12px;color:#cfc7b3;margin:6px 0 0}
.ace-cardface{display:block;width:100%;height:auto;background:var(--card);border-radius:4px}
.ace-cardnote{font-size:12px;color:#cfc7b3;margin-top:6px;min-height:34px}
.ace-tubes{display:block;width:100%;max-width:100%;min-width:0}
.ace-lamps{display:block;width:100%;max-width:100%;min-width:0}
.ace-readout{font-family:ui-monospace,Menlo,monospace;font-size:12px;color:#f1e7cd;margin:4px 0 10px;min-height:16px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.ace-status{font-size:13.5px;min-height:20px;padding:0 2px}
.ace-status b{font-weight:600}
.ace-out{display:grid;grid-template-columns:minmax(170px,210px) 1fr;gap:12px}
@media (max-width:700px){.ace-out{grid-template-columns:minmax(0,1fr)}}
.ace-listing{background:#f7f4e8;color:#24211c;border-radius:6px;padding:10px 14px;font:14px/1.5 "Courier New",ui-monospace,monospace;min-height:84px;max-height:190px;overflow:auto;background-image:repeating-linear-gradient(#f7f4e8 0 21px,#e5efe0 21px 42px);white-space:pre}
.ace-listing:empty::before{content:"The listing of the cards the machine punches comes out here.";color:#8f887a;font-family:ui-sans-serif,system-ui,sans-serif;font-size:12.5px}
.ace-error{color:var(--hot);font-size:13px;white-space:pre-wrap}
.ace-console.compact .ace-floor{grid-template-columns:minmax(0,1fr)}
.ace-console{min-width:0}
`;

function el(tag, attrs = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") node.className = v;
    else if (k === "text") node.textContent = v;
    else node.setAttribute(k, v);
  }
  for (const child of children) node.append(child);
  return node;
}

const bit = (word, k) => (word >>> (k - 1)) & 1;
const posOf = (word) => ({ dl: (word >>> 22) & 1023, slot: (word >>> 17) & 31 });
const isB = (ci) => bit(ci, 3) === 1;
// Digits 5-8 as Fig. 19 prints them, digit 5 the least significant.
const CODES = { 2: "K", 10: "L", 4: "M", 12: "N", 8: "O", 0: "P", 6: "Q", 14: "R", 1: "S", 9: "T" };
const typeOf = (ci) => (isB(ci) ? "B" : CODES[(ci >>> 4) & 15] ?? "?");

/** A card as a tabulator would list it: for each of the 32 columns, the row it is punched in. */
export function listing(card) {
  let line = "";
  for (let column = 1; column <= 32; column++) {
    const rows = [];
    for (let r = 0; r < 12; r++) if (bit(card[r] >>> 0, column)) rows.push(r);
    line += rows.length === 0 ? " " : rows.length > 1 ? "*" : rows[0] === 0 ? "+" : rows[0] === 1 ? "-" : String(rows[0] - 2);
  }
  return line.replace(/\s+$/, "");
}

function time(us) {
  if (us < 10_000) return `${Math.round(us)} µs`;
  if (us < 10_000_000) return `${(us / 1000).toFixed(1)} ms`;
  return `${(us / 1_000_000).toFixed(2)} s`;
}

// ---------------------------------------------------------------- sound

class Sound {
  constructor() { this.on = true; this.ctx = null; }
  ready() {
    if (!this.on) return null;
    try { this.ctx ??= new (window.AudioContext || window.webkitAudioContext)(); } catch { return null; }
    if (this.ctx.state === "suspended") void this.ctx.resume();
    return this.ctx;
  }
  click(at = 0, pitch = 900, level = 0.12, length = 0.018) {
    const ctx = this.ready();
    if (!ctx) return;
    const t = ctx.currentTime + at;
    const noise = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * length), ctx.sampleRate);
    const data = noise.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / data.length);
    const src = ctx.createBufferSource();
    src.buffer = noise;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = pitch;
    const gain = ctx.createGain();
    gain.gain.value = level;
    src.connect(filter).connect(gain).connect(ctx.destination);
    src.start(t);
  }
  /** Twelve rows going past the brushes. */
  card(seconds, punch = false) {
    const step = Math.max(0.012, seconds / 14);
    for (let r = 0; r < 12; r++) this.click(r * step, punch ? 420 : 1300, punch ? 0.2 : 0.09, punch ? 0.03 : 0.012);
  }
  lever() { this.click(0, 220, 0.35, 0.06); this.click(0.05, 500, 0.15, 0.03); }
}

// ---------------------------------------------------------------- drawing

function cardSvg(card, lit = -1, label = "") {
  // 80 columns by 12 rows; the 32 the machine reads are columns 41-72.
  const W = 400, H = 180, cw = W / 84, rh = (H - 30) / 12;
  let s = `<svg class="ace-cardface" viewBox="0 0 ${W} ${H}" role="img" aria-label="${label}">`;
  s += `<path d="M0 0H${W - 14}L${W} 14V${H}H0Z" fill="var(--card)" stroke="var(--card-edge)"/>`;
  s += `<rect x="${2 + 40 * cw}" y="20" width="${32 * cw}" height="${H - 26}" fill="rgba(180,120,40,.10)"/>`;
  for (let r = 0; r < 12; r++) {
    const y = 22 + r * rh;
    if (r === lit) s += `<rect x="0" y="${y - 1}" width="${W}" height="${rh}" fill="rgba(255,170,60,.35)"/>`;
    for (let c = 1; c <= 80; c++) {
      const x = 2 + (c - 1) * cw;
      const punched = card && c >= 41 && c <= 72 && bit(card[r] >>> 0, c - 40);
      if (punched) s += `<rect x="${x + 0.6}" y="${y + 1}" width="${cw - 1.6}" height="${rh - 3}" fill="var(--hole)"/>`;
      else if (r >= 2 && c % 4 === 1) s += `<text x="${x + cw / 2}" y="${y + rh - 3}" font-size="5" text-anchor="middle" fill="#a58f60">${ROWS[r]}</text>`;
    }
  }
  s += `<text x="${2 + 40 * cw}" y="13" font-size="9" fill="#7a6845" font-family="ui-sans-serif,sans-serif">genuine input, columns 41-72</text>`;
  return s + "</svg>";
}

// ---------------------------------------------------------------- the console

export function mountConsole(host, options = {}) {
  const base = options.base ?? new URL(".", import.meta.url);
  const sound = new Sound();
  sound.on = options.sound ?? true;
  if (!document.getElementById("ace-console-css")) document.head.append(el("style", { id: "ace-console-css", text: CSS }));

  // Layout.
  const speedSelect = el("select", { "aria-label": "Speed" });
  for (const [key, s] of Object.entries(SPEEDS)) speedSelect.append(el("option", { value: key, text: s.label }));
  speedSelect.value = options.speed && SPEEDS[options.speed] ? options.speed : "watch";
  const soundButton = el("button", { type: "button", text: sound.on ? "Sound on" : "Sound off" });
  const lever = el("button", { type: "button", class: "ace-switch", "aria-pressed": "false" }, el("span", { class: "lever" }), el("span", { text: "Start" }));
  const skip = el("button", { type: "button", text: "Skip ahead" });
  const clock = el("div", { class: "ace-clock" });
  const top = el("div", { class: "ace-top" },
    el("div", { class: "ace-title", text: options.title ?? "The Automatic Computing Engine" }, el("small", { text: "as proposed by A. M. Turing, 1945" })),
    clock, speedSelect, soundButton, skip, lever);

  const hopper = el("div", { class: "ace-hopper" });
  const count = el("p", { class: "ace-count" });
  const readerCard = el("div");
  const readerNote = el("div", { class: "ace-cardnote" });
  const reader = el("div", { class: "ace-box" }, el("h4", { text: "Card reader" }), hopper, readerCard, readerNote, count);

  const tubes = el("canvas", { class: "ace-tubes", width: "900", height: "300" });
  const rack = el("div", { class: "ace-box" }, el("h4", {}, "Mercury delay lines ", el("span", { text: "· 32 minor cycles each, read at the crystal on the left" })), tubes);

  const lamps = el("canvas", { class: "ace-lamps", width: "300", height: "420" });
  const readout = el("div", { class: "ace-readout" });
  const control = el("div", { class: "ace-box" }, el("h4", {}, "Control ", el("span", { text: "· CD, CI and TS 1-32" })), readout, lamps);

  const status = el("div", { class: "ace-status", role: "status" });
  const punchCard = el("div");
  const punchNote = el("div", { class: "ace-cardnote" });
  const punch = el("div", { class: "ace-box" }, el("h4", { text: "Punch" }), punchCard, punchNote);
  const paper = el("div", { class: "ace-listing", "aria-label": "Listing" });
  const out = el("div", { class: "ace-out" }, punch, el("div", {}, paper));
  const error = el("div", { class: "ace-error" });

  const root = el("div", { class: "ace-console" + (options.compact ? " compact" : "") }, top, el("div", { class: "ace-floor" }, reader, rack, control), status, out, error);
  host.replaceChildren(root);

  // State.
  let run = null;          // the JSON of `ace run --json --cold`
  let lines = [];          // delay lines shown, in order
  let mem = new Map();     // "dl,slot" -> word
  let ts = new Array(33).fill(0);
  let cd = 0, ci = 0, form = "";
  let i = 0;               // the next step to finish
  let into = 0;            // real milliseconds spent in step i
  let t = 0;               // machine time shown, in minor cycles
  let cardsRead = 0, cardsPunched = 0;
  let playing = false, raf = 0, last = 0;
  let flash = new Map();   // "dl,slot" -> real time of the flash
  let changed = new Map(); // ts -> real time
  let names = new Map();

  const speed = () => SPEEDS[speedSelect.value];
  let jobStart = Infinity;

  function stepInfo(k) {
    const [began, fetched, done, scd, sci] = run.steps[k];
    const type = typeOf(sci);
    const card = type === "P" || type === "O";
    const loading = k < jobStart;
    const s = speed();
    const real = card ? (loading ? s.deckCard : s.card) : Math.max(1, done - began) * (loading ? s.deckMc : s.mc);
    return { began, fetched, done, cd: scd, ci: sci, type, card, real, loading };
  }

  function reset() {
    playing = false;
    lever.setAttribute("aria-pressed", "false");
    cancelAnimationFrame(raf);
    mem = new Map();
    for (const [dl, slot, w] of run?.start.cells ?? []) mem.set(`${dl},${slot}`, w);
    ts = [0, ...(run?.start.ts ?? new Array(32).fill(0))];
    cd = run?.start.cd ?? 0; ci = 0; form = "";
    i = 0; into = 0; t = 0; cardsRead = 0; cardsPunched = 0;
    flash = new Map(); changed = new Map();
    paper.textContent = "";
    punchCard.innerHTML = cardSvg(null, -1, "no card");
    punchNote.textContent = "";
    status.innerHTML = run ? "The machine is empty. Its only order is the one it starts with, <b>0 throughout</b>: read a card. Close the switch to start." : "";
    lines = [];
    if (run) {
      const seen = new Set([0]);
      for (const [dl] of run.start.cells) seen.add(dl);
      for (const s of run.steps) for (const [dl] of s[7]) seen.add(dl);
      lines = [...seen].sort((a, b) => a - b);
    }
    draw(performance.now());
  }

  async function load({ program, input = "", name = "" }) {
    pause();
    error.textContent = "";
    status.textContent = "Punching the deck…";
    const result = await runAce(base, ["run", "-", "--json", "--cold", "--limit", String(options.limit ?? 200_000)], program, input);
    if (result.code !== 0 && !result.out.trim().startsWith("{")) {
      run = null;
      error.textContent = result.err.trim() || "The job could not be loaded.";
      status.textContent = "";
      reset();
      return false;
    }
    run = JSON.parse(result.out);
    names = new Map(run.names.map(([dl, slot, n]) => [`${dl},${slot}`, n]));
    // The job starts when the last card of the deck has passed control to it.
    jobStart = Infinity;
    let reads = 0;
    for (let k = 0; k < run.steps.length; k++) {
      if (typeOf(run.steps[k][4]) === "P") reads++;
      if (reads === run.deck && isB(run.steps[k][4]) && posOf(run.steps[k][4]).dl !== 0) { jobStart = k; break; }
    }
    root.dataset.job = name;
    reset();
    return true;
  }

  function start() {
    if (!run) return;
    if (i >= run.steps.length) reset();
    if (!playing) sound.lever();
    playing = true;
    lever.setAttribute("aria-pressed", "true");
    last = performance.now();
    raf = requestAnimationFrame(frame);
  }

  function pause() {
    playing = false;
    lever.setAttribute("aria-pressed", "false");
    cancelAnimationFrame(raf);
  }

  /** Applies step k to the machine shown. */
  function apply(k, now) {
    const [, , done, scd, sci, f, tsChanges, cells, punchedCount] = run.steps[k];
    cd = scd; ci = sci; form = run.forms[f];
    for (const [n, w] of tsChanges) { ts[n] = w; changed.set(n, now); }
    for (const [dl, slot, w] of cells) { mem.set(`${dl},${slot}`, w); flash.set(`${dl},${slot}`, now); }
    const type = typeOf(sci);
    if (type === "P") cardsRead++;
    if (punchedCount > cardsPunched) {
      for (let n = cardsPunched; n < punchedCount; n++) paper.textContent += (paper.textContent ? "\n" : "") + (listing(run.raw[n]) || " ");
      paper.scrollTop = paper.scrollHeight;
      cardsPunched = punchedCount;
    }
    if (!isB(sci)) cd = (cd + (1 << 18)) & ~(1 << 16) & 0xffff0000;
    else cd = sci & 0xffff0000;
    t = done;
  }

  function frame(now) {
    if (!playing) return;
    let budget = Math.min(now - last, 250);
    last = now;
    while (budget > 0 && i < run.steps.length) {
      const info = stepInfo(i);
      if (into === 0) onBegin(i, info);
      const left = info.real - into;
      if (budget >= left) {
        budget -= left;
        apply(i, now);
        i++; into = 0;
      } else {
        into += budget;
        budget = 0;
        t = info.began + (info.done - info.began) * (into / info.real);
      }
    }
    draw(now);
    if (i >= run.steps.length) {
      playing = false;
      lever.setAttribute("aria-pressed", "false");
      status.innerHTML = summary();
      setTimeout(() => draw(performance.now()), 800);
      return;
    }
    raf = requestAnimationFrame(frame);
  }

  /** Where the machine's time went: the deck, the cards, and the computing. */
  function summary() {
    const end = run.idle ? `Done: <b>${run.at}</b> passes control to itself.` : `Stopped at <b>${run.at}</b>: ${run.stop}.`;
    if (!(jobStart < Infinity)) return end;
    const loading = run.steps[jobStart][2] * MINOR_CYCLE_US;
    let cards = 0;
    for (let k = jobStart; k < run.steps.length; k++) {
      const type = typeOf(run.steps[k][4]);
      if (type === "P" || type === "O") cards += run.steps[k][2] - run.steps[k][0];
    }
    const total = run.time * MINOR_CYCLE_US, job = total - loading, computing = job - cards * MINOR_CYCLE_US;
    return `${end} Loading the deck of ${run.deck} cards took <b>${time(loading)}</b>; the job, <b>${time(job)}</b>, of which ${time(computing)} was computing and the rest cards. ` +
      `<span style="color:var(--faint)">"In some jobs the input and output of material may also be very time-consuming." (section 13)</span>`;
  }

  function onBegin(k, info) {
    const where = names.get(`${posOf(info.cd).dl},${posOf(info.cd).slot}`);
    if (info.type === "P") {
      const n = cardsRead + 1;
      const fromDeck = n <= run.deck;
      sound.card(info.real / 1000);
      readerNote.textContent = fromDeck
        ? (n === 1 ? "The initial order, 0 throughout, reads the first card into DL 0." : `Card ${n} of the deck into DL 0.`)
        : `One of the job's own cards, into DL ${posOf(info.ci).dl}.`;
    }
    if (info.type === "O") sound.card(info.real / 1000, true);
    const wait = info.fetched - info.began;
    const what = run.forms[run.steps[k][5]];
    if (k < jobStart) {
      status.innerHTML = `Loading from cold: card <b>${Math.min(cardsRead + (info.type === "P" ? 1 : 0), run.deck)}</b> of ${run.deck}. ${info.type === "P" ? "Reading." : `Obeying the card's own order: <b>${what}</b>.`}`;
    } else {
      status.innerHTML = `${where ? `<b>${where}</b>: ` : ""}${what}${wait > 1 ? ` <span style="color:var(--faint)">· waited ${wait} minor cycles for it to come round</span>` : ""}`;
    }
  }

  // ---- drawing

  function draw(now) {
    const us = t * MINOR_CYCLE_US;
    const s = speed();
    const loading = run && i < jobStart && i < run.steps.length;
    const mc = loading ? s.deckMc : s.mc;
    const ratio = (mc * 1000) / MINOR_CYCLE_US;
    clock.innerHTML = `machine time <b>${time(us)}</b><br><span style="color:var(--faint)">${ratio >= 1.5 ? `slowed ${Math.round(ratio).toLocaleString()}×` : ratio > 0.5 ? "as fast as the machine" : "faster than the machine"}</span>`;
    // The hopper.
    const total = run?.start.reader.length ?? 0;
    const left = Math.max(0, total - cardsRead);
    hopper.replaceChildren(...Array.from({ length: Math.min(12, Math.ceil(left / Math.max(1, total / 12))) }, (_, n) => el("i", { style: `bottom:${n * 3.6}px` })));
    count.textContent = run ? `${left} card${left === 1 ? "" : "s"} in the hopper · ${cardsRead} read${run.deck ? ` · the deck is ${run.deck}` : ""}` : "";
    // The card in the reader, its rows lit as they pass.
    if (run && i < run.steps.length) {
      const info = stepInfo(i);
      if (info.type === "P" && into > 0) {
        const card = run.start.reader[cardsRead];
        readerCard.innerHTML = cardSvg(card, Math.min(11, Math.floor((into / info.real) * 12)), "the card being read");
      } else if (cardsRead === 0) readerCard.innerHTML = cardSvg(run.start.reader[0], -1, "the first card");
      if (info.type === "O" && into > 0) {
        const card = run.raw[cardsPunched];
        const row = Math.floor((into / info.real) * 12);
        punchCard.innerHTML = cardSvg(card && card.map((w, r) => (r <= row ? w : 0)), Math.min(11, row), "the card being punched");
        punchNote.textContent = `Punching card ${cardsPunched + 1} from DL ${posOf(info.ci).dl}.`;
      }
    } else if (!readerCard.innerHTML) readerCard.innerHTML = cardSvg(null, -1, "no card");
    drawTubes(now);
    drawLamps(now);
  }

  function drawTubes(now) {
    const ctx = tubes.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const width = tubes.clientWidth || 900;
    const n = Math.max(1, lines.length);
    const rowH = n > 18 ? 22 : n > 12 ? 26 : 30;
    const height = 14 + n * rowH;
    if (tubes.width !== Math.round(width * dpr) || tubes.height !== Math.round(height * dpr)) {
      tubes.width = Math.round(width * dpr); tubes.height = Math.round(height * dpr);
      tubes.style.height = `${height}px`;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    const label = width < 560 ? 44 : 96, x0 = label + 12, x1 = width - 8, len = x1 - x0, cell = len / 32;
    const turn = t % 32; // how far the line has turned
    const reading = run && i < run.steps.length ? stepInfo(i) : null;
    const want = reading ? new Set([`${posOf(reading.cd).dl},${posOf(reading.cd).slot}`]) : new Set();
    if (reading && !reading.card && !isB(reading.ci) && (reading.type === "K" || reading.type === "L")) want.add(`${posOf(reading.ci).dl},${posOf(reading.ci).slot}`);
    const th = rowH - 12;
    lines.forEach((dl, r) => {
      const y = 8 + r * rowH;
      ctx.fillStyle = "#cfc7b3";
      ctx.font = "11px ui-monospace,Menlo,monospace";
      ctx.textBaseline = "middle";
      ctx.fillText(`DL ${dl}`, 0, y + th / 2 + 2);
      // The tube and its crystals.
      ctx.fillStyle = "#4d4a44";
      ctx.fillRect(x0 - 7, y + 1, 4, th + 2);
      ctx.fillRect(x1 + 1, y + 1, 4, th + 2);
      const grad = ctx.createLinearGradient(0, y, 0, y + th + 4);
      grad.addColorStop(0, "#e6e8eb"); grad.addColorStop(0.5, "#b5bac1"); grad.addColorStop(1, "#7f858e");
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.roundRect(x0, y + 2, len, th, th / 2);
      ctx.fill();
      for (let slot = 0; slot < 32; slot++) {
        // Minor cycle `slot` is at the reading end when turn == slot.
        let place = (slot - turn + 32) % 32;
        const x = x0 + place * cell;
        const key = `${dl},${slot}`;
        const word = mem.get(key) ?? 0;
        const lit = flash.get(key);
        if (want.has(key)) { ctx.fillStyle = "rgba(255,170,60,.45)"; ctx.fillRect(x, y + 2, cell, th); }
        if (lit && now - lit < 700) { ctx.fillStyle = `rgba(217,72,43,${0.6 * (1 - (now - lit) / 700)})`; ctx.fillRect(x, y + 2, cell, th); }
        if (word) {
          ctx.fillStyle = "#1e3f73";
          const step = (cell - 2) / 32;
          for (let k = 1; k <= 32; k++) if (bit(word >>> 0, k)) ctx.fillRect(x + 1 + (k - 1) * step, y + 5, Math.max(0.6, step * 0.7), th - 6);
        }
        ctx.strokeStyle = "rgba(60,60,70,.25)";
        ctx.beginPath(); ctx.moveTo(x, y + 4); ctx.lineTo(x, y + th); ctx.stroke();
      }
      const name = names.get(`${dl},0`) || names.get(`${dl},2`);
      if (name && label > 60) { ctx.fillStyle = "#8f887a"; ctx.font = "10px ui-sans-serif,sans-serif"; ctx.fillText(name.replace(/ \d+$/, ""), 40, y + th / 2 + 2); }
    });
    // The reading end.
    ctx.fillStyle = "#ffb347";
    ctx.beginPath(); ctx.moveTo(x0 - 1, 2); ctx.lineTo(x0 + 5, 2); ctx.lineTo(x0 + 2, 7); ctx.fill();
  }

  function drawLamps(now) {
    const ctx = lamps.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    const width = lamps.clientWidth || 300;
    const rows = 2 + 32, rowH = 11.5, top = 6;
    const height = top + rows * rowH + 14;
    if (lamps.width !== Math.round(width * dpr) || lamps.height !== Math.round(height * dpr)) {
      lamps.width = Math.round(width * dpr); lamps.height = Math.round(height * dpr);
      lamps.style.height = `${height}px`;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
    const x0 = 40, pitch = (width - x0 - 4) / 32, r = Math.min(3.6, pitch * 0.36);
    const row = (y, label, word, hot) => {
      ctx.fillStyle = hot ? "#ffd28a" : "#bdb5a1";
      ctx.font = "10px ui-monospace,Menlo,monospace";
      ctx.textBaseline = "middle";
      ctx.fillText(label, 0, y);
      for (let k = 1; k <= 32; k++) {
        const on = bit(word >>> 0, k);
        ctx.beginPath();
        ctx.arc(x0 + (k - 0.5) * pitch, y, r, 0, Math.PI * 2);
        ctx.fillStyle = on ? (hot ? "#fff0c8" : "#ffb347") : "#3a362f";
        if (on) { ctx.shadowColor = "rgba(255,170,60,.7)"; ctx.shadowBlur = 5; } else ctx.shadowBlur = 0;
        ctx.fill();
      }
      ctx.shadowBlur = 0;
    };
    row(top + 4, "CD", cd >>> 0, false);
    row(top + 4 + rowH, "CI", ci >>> 0, false);
    for (let n = 1; n <= 32; n++) {
      const hot = changed.has(n) && now - changed.get(n) < 600;
      row(top + 4 + (n + 1) * rowH + 4, `TS ${n}`, ts[n] >>> 0, hot);
    }
    readout.textContent = form ? `CI  ${form}` : run ? "CI  0 throughout" : "";
  }

  // ---- controls

  lever.addEventListener("click", () => (playing ? pause() : start()));
  speedSelect.addEventListener("change", () => draw(performance.now()));
  soundButton.addEventListener("click", () => { sound.on = !sound.on; soundButton.textContent = sound.on ? "Sound on" : "Sound off"; });
  skip.addEventListener("click", () => {
    if (!run) return;
    // To the end of the deck if it is still loading, otherwise to the end.
    const target = i < jobStart && jobStart < Infinity ? jobStart : run.steps.length;
    const now = performance.now();
    while (i < target) { apply(i, now); i++; }
    into = 0;
    if (i < run.steps.length) { onBegin(i, stepInfo(i)); }
    draw(now);
    if (i >= run.steps.length) frame(now);
  });
  const resize = new ResizeObserver(() => draw(performance.now()));
  resize.observe(root);
  reset();

  return {
    load, start, pause, reset,
    setSpeed(key) { if (SPEEDS[key]) speedSelect.value = key; },
    get state() { return { step: i, steps: run?.steps.length ?? 0, cardsRead, cardsPunched, time: t, playing, jobStart }; },
    destroy() { pause(); resize.disconnect(); host.replaceChildren(); },
  };
}

// ---------------------------------------------------------------- ace.wasm

/** Runs `ace` with arguments in worker.js beside this module. */
export function runAce(base, args, program, input) {
  return new Promise((resolve) => {
    const worker = new Worker(new URL("worker.js", base), { type: "module" });
    let out = "", err = "";
    const end = (code, message = "") => { worker.terminate(); resolve({ code, out, err: err + message }); };
    worker.onmessage = ({ data }) => {
      if (data.type === "out") { if (data.fd === 1) out += data.text; else err += data.text; }
      else if (data.type === "done") end(data.code);
      else if (data.type === "error") end(1, data.message);
    };
    worker.onerror = (event) => end(1, event.message || "the worker stopped");
    worker.postMessage({ wasmUrl: new URL("ace.wasm", base).href, args, program, input, limit: 80_000_000 });
  });
}
