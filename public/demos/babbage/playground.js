// The Analytical Engine playground: Babbage's notations of calculations run in
// the page by babbage.wasm (the same program as the command line), drawn as
// the mill and the columns of the store, with the sheet laid out as Babbage
// laid it out and every cell checked.
//
//   mountPlayground(host, { page, step, theme })  the whole playground: picker,
//                                          engine, sheet, and the transcription in an editor
//   mountRunner(host, { page, step, numbers, theme, text, editable, hint })
//                                          one program's engine, stepped, for a note;
//                                          `text` runs a page of its own, `editable`
//                                          puts it in a box under the engine to change
//
// theme "auto" follows the reader's light or dark setting; "light" keeps it light.
//
// No framework and no build step. Everything it needs is beside it:
// babbage.wasm, worker.js, wasi.js, corpus.json, and (for the editor)
// editor.js and lsp-worker.js. Styles are scoped to `.bab`.

const here = (file) => new URL(file, import.meta.url).href;

// ---- babbage, off the main thread -------------------------------------------

let worker = null;
let nextId = 0;
const waiting = new Map();
function babbage(args, text = "") {
  if (!worker) {
    worker = new Worker(here("worker.js"), { type: "module" });
    worker.onmessage = ({ data }) => {
      waiting.get(data.id)?.(data);
      waiting.delete(data.id);
    };
  }
  const id = nextId++;
  return new Promise((resolve) => {
    waiting.set(id, resolve);
    worker.postMessage({ id, wasmUrl: here("babbage.wasm"), args, text });
  });
}

let corpus = null;
const pages = () => (corpus ??= fetch(here("corpus.json")).then((r) => r.json()));

async function runPage(text, page, numbers) {
  const args = ["json", "-"];
  if (numbers && page?.at) args.push("--at", page.at);
  const result = await babbage(args, text);
  if (result.error || !result.out) throw new Error(result.error || result.err || "babbage gave nothing");
  return JSON.parse(result.out);
}

// ---- styles --------------------------------------------------------------------

const CSS = `
.bab { --card: #fbf9f4; --ink: #1c1a17; --soft: #6a6357; --rule: #d8cfbf;
  --brass: #a8822e; --brass-hi: #e3c77a; --steel: #59636b; --red: #b3261e; --right: #2f6b3a; --accent: #7a4f12;
  --read: #c0472f; --write: #2f7a49; --comp: #6b4aa0;
  --mono: "JetBrains Mono", "SF Mono", Menlo, Consolas, monospace;
  --serif: "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif;
  color: var(--ink); font: 16px/1.5 var(--serif); }
@media (prefers-color-scheme: dark) {
  .bab:not(.light) { --card: #1e1b17; --ink: #eee6d6; --soft: #a69b87; --rule: #3a3328;
    --red: #ef7a6c; --right: #8cc79a; --accent: #d9a45a; --read: #ef8a6c; --write: #7fcf97; --comp: #b9a0e6; }
}
.bab * { box-sizing: border-box; }
.bab .bar { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin: 10px 0 12px; }
.bab select, .bab button { font: 14px var(--mono); color: var(--ink); background: var(--card); border: 1px solid var(--rule); border-radius: 6px; padding: 6px 10px; }
.bab button { cursor: pointer; min-width: 38px; }
.bab button:hover, .bab select:hover { border-color: var(--accent); }
.bab button[aria-pressed="true"] { background: var(--accent); color: var(--card); }
.bab .stat { font: 13px var(--mono); color: var(--soft); margin-left: auto; }
.bab .stat b { color: var(--ink); font-weight: 600; }
.bab .engine { position: relative; border: 1px solid var(--rule); border-radius: 8px; overflow: hidden;
  background: radial-gradient(ellipse at 40% 20%, #3b342b 0%, #1d1a16 75%); color: #efe6d4; padding: 18px; }
.bab svg.wires { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; }
.bab .engine-row { position: relative; display: flex; gap: 22px; align-items: flex-end; }
.bab .mill { flex: 0 0 240px; border: 1px solid #6b5a3c; border-radius: 10px; padding: 12px; background: rgba(0,0,0,.22); align-self: stretch; display: flex; flex-direction: column; gap: 8px; }
.bab .label { font: 11px var(--mono); letter-spacing: .1em; text-transform: uppercase; color: var(--brass-hi); opacity: .85; }
.bab .sign { font: 54px/1 var(--serif); text-align: center; color: var(--brass-hi); min-height: 58px; }
.bab .ingress { display: grid; gap: 6px; }
.bab .plate { font: 13px/1.35 var(--mono); background: rgba(255,255,255,.06); border: 1px solid rgba(227,199,122,.25); border-radius: 6px; padding: 5px 8px; min-height: 30px; word-break: break-word; }
.bab .plate small { display: block; color: #bfae8a; font-size: 11px; }
.bab .plate.result { border-color: var(--write); }
.bab .table-of { font: 12px var(--mono); color: #d7c79f; border-top: 1px dashed rgba(227,199,122,.3); padding-top: 6px; }
.bab .table-of b { color: var(--brass-hi); }
.bab .table-of.made b { color: #fff; }
.bab .store { flex: 1; overflow-x: auto; }
.bab .columns { display: flex; gap: 10px; align-items: flex-end; padding: 4px 2px; min-width: max-content; }
.bab .col { width: 78px; display: flex; flex-direction: column; align-items: center; gap: 2px; }
.bab .col .name { font: 13px var(--mono); color: var(--brass-hi); margin-top: 4px; }
.bab .col .head { font: 11px var(--mono); color: #a89a7c; min-height: 15px; }
.bab .col.working .name { color: #b8c3cc; }
.bab .wheel { width: 54px; height: 15px; border-radius: 50%; background: linear-gradient(180deg, var(--brass-hi), var(--brass) 55%, #6d5420);
  box-shadow: 0 2px 0 #4a3914; font: 10px/15px var(--mono); color: #2a1f0a; text-align: center; transition: background .4s; }
.bab .col.working .wheel { background: linear-gradient(180deg, #c9d1d6, var(--steel) 60%, #353c42); box-shadow: 0 2px 0 #23292d; color: #10161a; }
.bab .col .value { margin-top: 6px; width: 78px; font: 12px/1.3 var(--mono); text-align: center; min-height: 34px; word-break: break-word; color: #efe6d4; }
.bab .col .value.zero { color: #7d7362; }
.bab .col .value.comp { color: #c9b5f0; }
.bab .col.read .wheel { background: linear-gradient(180deg, #f0a48f, #c0472f 60%, #6e2414); }
.bab .col.read .name { color: #f0a48f; }
.bab .col.wrote .wheel { background: linear-gradient(180deg, #b6ecc6, #2f7a49 60%, #1b4a2b); }
.bab .col.wrote .name { color: #b6ecc6; }
.bab .col.wrote.comp .wheel { background: linear-gradient(180deg, #d9c9f4, #6b4aa0 60%, #3b2763); }
.bab .caption { margin-top: 16px; display: flex; flex-wrap: wrap; gap: 6px 14px; align-items: baseline;
  background: rgba(20, 16, 12, .8); color: #efe6d4; border-radius: 6px; padding: 8px 12px; font: 14px/1.4 var(--mono); }
.bab .caption .what { font-weight: 600; }
.bab .caption .ok { color: #8cc79a; } .bab .caption .no { color: #ef7a6c; }
.bab .legend { font: 12px var(--mono); color: var(--soft); margin: 8px 0 0; display: flex; gap: 14px; flex-wrap: wrap; }
.bab .legend i { display: inline-block; width: 14px; height: 8px; border-radius: 4px; margin-right: 5px; vertical-align: middle; }
.bab .grid { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr); gap: 18px; align-items: start; margin-top: 18px; }
@media (max-width: 960px) { .bab .grid { grid-template-columns: 1fr; } .bab .mill { flex-basis: 190px; } }
.bab .panel h2 { font: 12px var(--mono); letter-spacing: .08em; text-transform: uppercase; color: var(--soft); margin: 0 0 8px; font-weight: 500; }
.bab .sheet { background: #f6f0e2; color: #2b241a; border: 1px solid var(--rule); border-radius: 6px; overflow: auto; max-height: 620px; }
.bab .sheet table { border-collapse: collapse; font: italic 15px/1.3 var(--serif); min-width: 100%; }
.bab .sheet th { font: 11px var(--mono); font-style: normal; color: #7a6a52; padding: 6px 6px 4px; text-align: center; position: sticky; top: 0; background: #efe7d4; border-bottom: 1px solid #d5c6a6; }
.bab .sheet td { padding: 3px 7px; text-align: center; white-space: nowrap; border-bottom: 1px solid rgba(120, 100, 70, .1); border-right: 1px solid rgba(178, 90, 70, .18); }
.bab .sheet td.store { min-width: 58px; }
.bab .sheet td.millcell { border-right: 2px solid #2b241a; }
.bab .sheet td.card { text-align: left; font-style: normal; font-family: var(--mono); font-size: 12px; }
.bab .sheet td.mk { font: 12px var(--mono); font-style: normal; color: #2f6b3a; }
.bab .sheet tr.bad td.mk { color: #b3261e; font-weight: 600; }
.bab .sheet tr.bad { background: rgba(179, 38, 30, .07); }
.bab .sheet tr { cursor: pointer; }
.bab .sheet tr.now { background: rgba(217, 164, 90, .32); }
.bab .sheet .zero { color: #8b7c63; }
.bab .checks { margin-top: 12px; font: 13px/1.6 var(--mono); }
.bab .checks .bad { color: var(--red); }
.bab .checks .good { color: var(--right); }
.bab .quoted { font: italic 15px/1.5 var(--serif); color: var(--soft); border-left: 3px solid var(--rule); padding: 4px 10px; margin: 10px 0; }
.bab textarea, .bab .rh-editor { width: 100%; min-height: 560px; font: 13px/1.6 var(--mono); background: var(--card); color: var(--ink); border: 1px solid var(--rule); border-radius: 6px; padding: 10px; }
.bab .rh-editor { padding: 0; }
.bab .cm-editor { height: 560px; }
.bab .cm-tooltip { background: var(--card) !important; color: var(--ink); border: 1px solid var(--rule) !important; max-width: 60ch; font: 13px/1.45 var(--serif); }
.bab .rh-hover { padding: 6px 10px; }
.bab .rh-token-keyword { color: var(--accent); font-weight: 600; } .bab .rh-token-comment { color: var(--soft); font-style: italic; }
.bab .rh-token-string { color: #7d5a9e; } .bab .rh-token-number { color: var(--red); } .bab .rh-token-variable { color: #2d6a8a; }
.bab .rh-token-parameter { color: #5d7a2a; } .bab .rh-token-macro { font-weight: 700; } .bab .rh-token-operator { color: var(--soft); }
.bab.runner .engine { padding: 14px; }
.bab .runner-text { display: block; width: 100%; min-height: 0; height: auto; margin-top: 10px; font: 13px/1.55 var(--mono); background: var(--card); color: var(--ink); border: 1px solid var(--rule); border-radius: 6px; padding: 10px; resize: vertical; }
.bab .runner-hint { font: 13px/1.5 var(--mono); color: var(--soft); margin: 6px 0 0; }
.bab.runner .bar { margin: 12px 0 0; }
.bab.runner .bar button { background: rgba(255,255,255,.06); color: #efe6d4; border-color: rgba(227,199,122,.3); }
.bab.runner .bar button[aria-pressed="true"] { background: #d9a45a; color: #1d1a16; }
.bab.runner .stat { color: #bfae8a; } .bab.runner .stat b { color: #efe6d4; }
.bab.runner .col { width: 62px; } .bab.runner .col .value { width: 62px; font-size: 11px; } .bab.runner .wheel { width: 46px; }
.bab.runner .columns { gap: 6px; }
@media (max-width: 700px) { .bab.runner .engine-row { flex-direction: column; align-items: stretch; } .bab.runner .mill { flex-basis: auto; } }
`;

function addStyles() {
  if (document.getElementById("bab-styles")) return;
  const style = document.createElement("style");
  style.id = "bab-styles";
  style.textContent = CSS;
  document.head.appendChild(style);
}

// ---- drawing -------------------------------------------------------------------

const el = (tag, cls, text) => {
  const e = document.createElement(tag);
  if (cls) e.className = cls;
  if (text != null) e.textContent = text;
  return e;
};
/** Accents as typed (`v1''`) to accents as written (`v1″`). */
const prime = (s) => String(s).replace(/'''/g, "‴").replace(/''/g, "″").replace(/'/g, "′");
const accents = (k) => ["", "′", "″", "‴"][k] ?? "′".repeat(k);

const ENGINE = `
<div class="engine">
  <svg class="wires" aria-hidden="true"></svg>
  <div class="engine-row">
    <div class="mill">
      <div class="label">Mill</div>
      <div class="sign"></div>
      <div class="ingress"></div>
      <div class="plate result"><small>result</small>&nbsp;</div>
      <div class="table-of"></div>
    </div>
    <div class="store">
      <div class="label">Store</div>
      <div class="columns"></div>
    </div>
  </div>
  <div class="caption"></div>
</div>`;

const LEGEND = `<div class="legend">
  <span><i style="background:#c0472f"></i>read: sent to the mill, left at zero</span>
  <span><i style="background:#2f7a49"></i>given the result</span>
  <span><i style="background:#6b4aa0"></i>given a complement (C)</span>
  <span><i style="background:#59636b"></i>working variable</span>
</div>`;

const CONTROLS = `
<button data-do="first" title="The store as it starts (Home)">|◀</button>
<button data-do="back" title="Back an operation (←)">◀</button>
<button data-do="play" title="Play (space)" aria-pressed="false">▶ play</button>
<button data-do="fwd" title="Forward an operation (→)">▶</button>
<button data-do="last" title="The last operation (End)">▶|</button>
<button data-do="nums" title="Letters, or the numbers of a worked example" aria-pressed="false">numbers</button>`;

/** The engine at one step: state shared by the playground and the runner. */
function engine(root) {
  const q = (s) => root.querySelector(s);
  const view = { run: null, at: -1, numbers: false, onStep: null };

  const show = (h) => {
    if (!h) return "";
    if (view.numbers && h.number != null) return (h.complement ? "C" : "") + h.number;
    return h.text;
  };
  const wheels = (h) => {
    const n = 6;
    if (!view.numbers || !h || h.complement || h.number == null || h.number.includes("/")) return Array(n).fill("");
    return h.number.replace("-", "").padStart(n, " ").slice(-n).split("").map((d) => (d === " " ? "0" : d));
  };

  function drawColumns(store, s) {
    const run = view.run;
    const box = q(".columns");
    box.replaceChildren();
    const reads = new Set(s ? s.reads : []);
    const writes = new Map((s ? s.writes : []).map((w) => [w.v, w.held]));
    const counts = {};
    if (s) for (const st of run.steps.slice(0, view.at + 1)) for (const w of st.writes) counts[w.v] = (counts[w.v] ?? 0) + 1;
    for (const v of run.columns) {
      const h = store.get(v);
      const col = el("div", "col");
      col.dataset.v = v;
      if (run.working.includes(v)) col.classList.add("working");
      if (reads.has(v)) col.classList.add("read");
      if (writes.has(v)) {
        col.classList.add("wrote");
        if (writes.get(v).complement) col.classList.add("comp");
      }
      const start = run.start.find((x) => x.v === v);
      col.appendChild(el("div", "head", start ? prime(start.text) : ""));
      for (const d of wheels(h)) col.appendChild(el("div", "wheel", d));
      const k = (run.working.includes(v) ? -1 : 0) + (counts[v] ?? 0);
      col.appendChild(el("div", "name", "v" + v + accents(Math.max(0, k))));
      col.appendChild(el("div", "value" + (!h || h.zero ? " zero" : "") + (h?.complement ? " comp" : ""), h ? (h.zero ? "0" : show(h)) : ""));
      box.appendChild(col);
    }
  }

  function wires(s) {
    const svg = q("svg.wires");
    svg.replaceChildren();
    if (!s) return;
    const box = q(".engine").getBoundingClientRect();
    const mill = q(".mill").getBoundingClientRect();
    const mx = mill.right - box.left;
    const my = mill.top - box.top + mill.height * 0.45;
    const line = (v, color, dash) => {
      const c = q(`.columns [data-v="${v}"] .name`);
      if (!c) return;
      const r = c.getBoundingClientRect();
      const x = r.left - box.left + r.width / 2;
      const y = r.top - box.top + r.height / 2;
      const p = document.createElementNS("http://www.w3.org/2000/svg", "path");
      p.setAttribute("d", `M${mx},${my} C${(mx + x) / 2},${my} ${x},${y + 60} ${x},${y + 8}`);
      p.setAttribute("fill", "none");
      p.setAttribute("stroke", color);
      p.setAttribute("stroke-width", "2");
      p.setAttribute("opacity", ".75");
      if (dash) p.setAttribute("stroke-dasharray", "5 4");
      svg.appendChild(p);
    };
    for (const v of s.reads) line(v, "#e0735a", false);
    for (const w of s.writes) line(w.v, w.held.complement ? "#b9a0e6" : "#7fcf97", true);
  }

  view.show = function showStep(i) {
    const run = view.run;
    if (!run) return;
    view.at = Math.max(-1, Math.min(run.steps.length - 1, i));
    const s = view.at >= 0 ? run.steps[view.at] : null;
    const store = new Map((s ? s.store : run.start.map((x) => ({ v: x.v, held: x.held }))).map((c) => [c.v, c.held]));
    drawColumns(store, s);
    q(".sign").textContent = s ? (s.op ?? "→") : "";
    const ing = q(".ingress");
    ing.replaceChildren();
    if (s)
      s.operands.forEach((o, k) => {
        const p = el("div", "plate");
        const role = s.op === "×" ? (k ? "multiplier" : "multiplicand") : s.op ? (k ? "second" : "first") : "moved";
        p.appendChild(el("small", "", o.table ? `${role}: the table already in the mill` : `${role}: from v${o.from}`));
        p.appendChild(document.createTextNode(show(o.held)));
        ing.appendChild(p);
      });
    q(".result").replaceChildren(el("small", "", "result"), document.createTextNode(s ? show(s.result) : ""));
    let table = null;
    let made = false;
    for (const st of run.steps.slice(0, view.at + 1)) {
      if (st.op === "×") {
        table = st.operands[0].held;
        made = st.tableMade;
      } else if (st.op) table = null;
    }
    const t = q(".table-of");
    t.className = "table-of" + (s && s.op === "×" && made ? " made" : "");
    t.replaceChildren(
      document.createTextNode("Table of multiples: "),
      el("b", "", table ? show(table) : "none"),
      document.createTextNode(s && s.op === "×" ? (made ? " (made now)" : " (used again)") : "")
    );
    const cap = q(".caption");
    if (!s) cap.replaceChildren(el("span", "what", `The store as the sheet starts it: ${run.start.map((x) => `v${x.v} = ${prime(x.text)}`).join(", ")}`));
    else {
      const bad = s.checks.filter((c) => !c.ok);
      cap.replaceChildren(
        el("span", "what", `${s.number}${s.star ? " *" : ""}  ${s.op ?? "transfer"}  ${prime(s.card)}`),
        el("span", bad.length ? "no" : "ok", bad.length ? `✗ ${bad.map((c) => c.detail).join("; ")}` : `✓ ${s.checks.length} statements`)
      );
    }
    view.onStep?.(view.at, s);
    requestAnimationFrame(() => wires(s));
  };
  view.redrawWires = () => view.run && wires(view.at >= 0 ? view.run.steps[view.at] : null);
  return view;
}

/** Step buttons and keys, for the playground and the runner. */
function controls(root, view, rerun) {
  let timer = null;
  const button = (name) => root.querySelector(`[data-do="${name}"]`);
  const stop = () => {
    clearInterval(timer);
    timer = null;
    button("play").setAttribute("aria-pressed", "false");
    button("play").textContent = "▶ play";
  };
  const play = () => {
    if (timer) return stop();
    if (view.at >= view.run.steps.length - 1) view.show(-1);
    button("play").setAttribute("aria-pressed", "true");
    button("play").textContent = "❚❚ pause";
    timer = setInterval(() => {
      if (view.at >= view.run.steps.length - 1) return stop();
      view.show(view.at + 1);
    }, 1400);
  };
  button("first").onclick = () => (stop(), view.show(-1));
  button("back").onclick = () => (stop(), view.show(view.at - 1));
  button("fwd").onclick = () => (stop(), view.show(view.at + 1));
  button("last").onclick = () => (stop(), view.show(view.run.steps.length - 1));
  button("play").onclick = play;
  button("nums").onclick = () => {
    view.numbers = !view.numbers;
    button("nums").setAttribute("aria-pressed", String(view.numbers));
    rerun();
  };
  return { stop, play };
}

// ---- the whole playground --------------------------------------------------------

export function mountPlayground(host, { page = null, step = null, theme = "auto" } = {}) {
  addStyles();
  const root = el("div", theme === "light" ? "bab light" : "bab");
  root.innerHTML = `
    <div class="bar"><select aria-label="Program"></select>${CONTROLS}<span class="stat"></span></div>
    ${ENGINE}${LEGEND}
    <div class="grid">
      <section class="panel"><h2>The sheet, as Babbage laid it out, checked</h2>
        <div class="sheet"></div><div class="checks"></div><div class="quoted"></div></section>
      <section class="panel"><h2>The transcription (edit it: it runs as you type)</h2>
        <textarea spellcheck="false"></textarea></section>
    </div>`;
  host.replaceChildren(root);
  const q = (s) => root.querySelector(s);
  const view = engine(root);
  let list = [];
  let current = 0;
  let editor = null;
  let edit = null;
  let linked = step != null;

  const drawSheet = (r) => {
    const table = el("table");
    const head = el("tr");
    for (const h of ["No.", "", "Nature", "in Mill", ...r.columns.map((v) => "v" + v), "", ""]) head.appendChild(el("th", "", h));
    table.appendChild(head);
    r.steps.forEach((s, i) => {
      const tr = el("tr");
      tr.dataset.step = i;
      if (s.checks.some((c) => !c.ok)) tr.classList.add("bad");
      tr.append(el("td", "", String(s.number)), el("td", "", s.star ? "✱" : ""), el("td", "", s.op ?? ""), el("td", "millcell", prime(s.mill ?? "")));
      const cells = new Map(s.cells.map((c) => [c.v, c.text]));
      for (const v of r.columns) {
        const t = cells.get(v);
        tr.appendChild(el("td", "store" + (t === "0" ? " zero" : ""), t == null ? "" : prime(t)));
      }
      tr.appendChild(el("td", "card", prime(s.card)));
      const bad = s.checks.filter((c) => !c.ok).length;
      tr.appendChild(el("td", "mk", bad ? `✗ ${bad}` : `✓ ${s.checks.length}`));
      tr.onclick = () => (ctl.stop(), view.show(i));
      table.appendChild(tr);
    });
    q(".sheet").replaceChildren(table);
    const ch = q(".checks");
    ch.replaceChildren();
    for (const c of r.checks) ch.appendChild(el("div", c.ok ? "good" : "bad", (c.ok ? "✓ " : "✗ ") + c.what + (c.ok ? "" : ": " + c.detail)));
    if (r.stopped) ch.appendChild(el("div", "bad", "The run stops: " + r.stopped));
    const quoted = q(".quoted");
    quoted.replaceChildren();
    for (const m of r.remarks) quoted.appendChild(el("div", "quoted", "Remark: “" + prime(m) + "”"));
    for (const p of r.problems.filter((p) => p.severity === 1)) quoted.appendChild(el("div", "checks bad", `line ${p.line}: ${p.message}`));
  };

  view.onStep = (at) => {
    root.querySelectorAll(".sheet tr.now").forEach((r) => r.classList.remove("now"));
    const tr = root.querySelector(`.sheet tr[data-step="${at}"]`);
    if (!tr) return;
    tr.classList.add("now");
    const box = q(".sheet");
    if (tr.offsetTop < box.scrollTop + 30 || tr.offsetTop > box.scrollTop + box.clientHeight - 30) box.scrollTop = tr.offsetTop - box.clientHeight / 3;
  };

  const check = async (text) => {
    try {
      view.run = await runPage(text, list[current], view.numbers);
    } catch (e) {
      q(".sheet").textContent = String(e.message ?? e);
      return;
    }
    const r = view.run;
    drawSheet(r);
    q(".stat").innerHTML = `<b>${r.statements}</b> statements · <b>${r.agree}</b> agree · <b>${r.statements - r.agree}</b> do not`;
    if (linked) {
      linked = false;
      view.show(Number(step) - 1);
    } else view.show(Math.min(view.at, r.steps.length - 1));
  };
  const ctl = controls(root, view, () => check(q("textarea").value));

  const pick = (i) => {
    ctl.stop();
    current = (i + list.length) % list.length;
    q("select").value = String(current);
    view.at = -1;
    const text = list[current].text;
    if (editor) editor.set(text);
    else q("textarea").value = text;
    check(text);
    host.dispatchEvent(new CustomEvent("bab-page", { detail: list[current].name }));
  };

  const keys = (e) => {
    if (!root.isConnected || e.target.closest?.(".cm-editor, textarea, select, input")) return;
    if (e.key === "ArrowRight") (ctl.stop(), view.show(view.at + 1));
    else if (e.key === "ArrowLeft") (ctl.stop(), view.show(view.at - 1));
    else if (e.key === " " && root.contains(document.activeElement)) (e.preventDefault(), ctl.play());
    else if (e.key === "Home") (ctl.stop(), view.show(-1));
    else if (e.key === "End") (ctl.stop(), view.show(view.run.steps.length - 1));
  };
  document.addEventListener("keydown", keys);
  addEventListener("resize", view.redrawWires);
  q("textarea").addEventListener("input", (e) => {
    clearTimeout(edit);
    edit = setTimeout(() => check(e.target.value), 250);
  });

  pages().then((ps) => {
    list = ps;
    ps.forEach((p, i) => q("select").appendChild(el("option", "", p.title)).setAttribute("value", String(i)));
    q("select").onchange = () => pick(Number(q("select").value));
    const start = ps.findIndex((p) => p.name === page);
    pick(start >= 0 ? start : 0);
    import(here("editor.js"))
      .then(({ upgrade }) => upgrade(q("textarea"), { onRun: () => check(q("textarea").value) }))
      .then((ed) => {
        if (ed) editor = ed;
      })
      .catch(() => {});
  });

  return {
    destroy() {
      ctl.stop();
      document.removeEventListener("keydown", keys);
      removeEventListener("resize", view.redrawWires);
      root.remove();
    },
  };
}

// ---- one program, for a note -------------------------------------------------------

/**
 * One program's engine, stepped. `step` is the operation to open at (from 1;
 * 0 for the store as it starts). `numbers` opens on the worked example.
 */
export function mountRunner(host, { page = "L001-1", step = 0, numbers = false, theme = "auto", text = null, editable = false, hint = null } = {}) {
  addStyles();
  const root = el("div", theme === "light" ? "bab runner light" : "bab runner");
  root.innerHTML = ENGINE.replace('<div class="caption"></div>', `<div class="caption"></div><div class="bar">${CONTROLS}<span class="stat"></span></div>`);
  host.replaceChildren(root);
  const view = engine(root);
  view.numbers = numbers;
  root.querySelector('[data-do="nums"]').setAttribute("aria-pressed", String(numbers));
  let entry = null;
  let source = text;
  let first = true;
  let box = null;
  if (editable) {
    box = el("textarea", "runner-text");
    box.spellcheck = false;
    root.appendChild(box);
    if (hint) root.appendChild(el("p", "runner-hint", hint));
  }
  const load = async () => {
    try {
      view.run = await runPage(source ?? entry.text, entry, view.numbers);
    } catch (e) {
      root.querySelector(".caption").textContent = String(e.message ?? e);
      return;
    }
    const r = view.run;
    const name = text != null ? "this page" : entry.title;
    root.querySelector(".stat").innerHTML = `${name} · <b>${r.agree}</b> of <b>${r.statements}</b> agree`;
    if (r.stopped) root.querySelector(".stat").innerHTML += ` · stops`;
    if (first) {
      first = false;
      view.show(step ? step - 1 : -1);
    } else view.show(Math.min(view.at, r.steps.length - 1));
    if (r.stopped && view.at >= r.steps.length - 1) {
      root.querySelector(".caption").appendChild(el("span", "no", "✗ the run stops: " + r.stopped));
    }
  };
  const ctl = controls(root, view, load);
  if (box) {
    let wait = null;
    box.addEventListener("input", () => {
      clearTimeout(wait);
      wait = setTimeout(() => {
        source = box.value;
        load();
      }, 250);
    });
  }
  addEventListener("resize", view.redrawWires);
  pages().then((ps) => {
    entry = ps.find((p) => p.name === page) ?? ps[0];
    if (box) {
      box.value = source ?? entry.text;
      box.rows = Math.min(16, box.value.split("\n").length + 1);
    }
    load();
  });
  return {
    destroy() {
      ctl.stop();
      removeEventListener("resize", view.redrawWires);
      root.remove();
    },
  };
}
