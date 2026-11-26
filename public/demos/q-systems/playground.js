// The Q-systems playground: a treatment and its data on the left; on the
// right, for each phase, the graph of strings as the first phase grows it,
// one rule application at a time, then what the second phase removes, then
// what is left, as the line printer printed it.
//
// qsys.wasm does the work (`qsys json`), in a worker. The graph is drawn as
// C70 draws it on p. 29: the data on a line, and each path a rule adds as a
// bracket above or below the path it was applied to.

const $ = (tag, props = {}, ...kids) => {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === "class") e.className = v;
    else if (k.startsWith("on")) e.addEventListener(k.slice(2), v);
    else if (v !== undefined && v !== null && v !== false) e.setAttribute(k, v === true ? "" : v);
  }
  for (const kid of kids.flat()) if (kid !== null && kid !== undefined && kid !== false) e.append(kid instanceof Node ? kid : String(kid));
  return e;
};
const SVG = "http://www.w3.org/2000/svg";
const s$ = (tag, attrs = {}, ...kids) => {
  const e = document.createElementNS(SVG, tag);
  for (const [k, v] of Object.entries(attrs)) if (v !== undefined && v !== null) e.setAttribute(k, v);
  for (const kid of kids.flat()) if (kid !== null && kid !== undefined) e.append(kid instanceof Node ? kid : String(kid));
  return e;
};

function client(script) {
  let worker = null;
  let next = 0;
  const waiting = new Map();
  return (message) => {
    if (!worker) {
      worker = new Worker(new URL(script, import.meta.url), { type: "module" });
      worker.onmessage = ({ data }) => {
        waiting.get(data.id)?.(data);
        waiting.delete(data.id);
      };
      worker.onerror = (e) => {
        for (const resolve of waiting.values()) resolve({ error: String(e.message || e) });
        waiting.clear();
      };
    }
    const id = ++next;
    return new Promise((resolve) => {
      waiting.set(id, resolve);
      worker.postMessage({ id, wasmUrl: new URL("qsys.wasm", import.meta.url).href, ...message });
    });
  };
}
const runner = client("worker.js");

/** [from, to, kind] for each piece of a program or data text, for colouring. */
export function tokens(text) {
  const out = [];
  const re = /(\*\*[^.]*\.?)|(-(?:INV|REQ|DET)-)|(-(?:DANS|HORS|ET|OU|NON|NUL)-)|([A-FI-NU-Z]\*\d?)|(-\d+-)|(==|--|\$\$|\(\.|\.\)|[/≠#])/g;
  const kinds = [null, "comment", "keyword", "operator2", "variable", "vertex", "operator"];
  for (const m of text.matchAll(re)) {
    const k = m.findIndex((g, i) => i > 0 && g !== undefined);
    out.push([m.index, m.index + m[0].length, kinds[k]]);
  }
  return out;
}

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function paintInto(paint, text) {
  let html = "";
  let at = 0;
  for (const [from, to, kind] of tokens(text)) {
    html += esc(text.slice(at, from)) + `<span class="t-${kind}">${esc(text.slice(from, to))}</span>`;
    at = to;
  }
  paint.innerHTML = html + esc(text.slice(at)) + "\n";
}

function editor(label, rows) {
  const area = $("textarea", { class: "qs-text", spellcheck: "false", autocapitalize: "off", "aria-label": label });
  const paint = $("pre", { class: "qs-paint", "aria-hidden": "true" });
  const box = $("div", { class: "qs-editor" + (rows ? " qs-small" : "") }, paint, area);
  const repaint = () => {
    paintInto(paint, area.value);
    paint.scrollTop = area.scrollTop;
    paint.scrollLeft = area.scrollLeft;
  };
  area.addEventListener("input", repaint);
  area.addEventListener("scroll", () => ((paint.scrollTop = area.scrollTop), (paint.scrollLeft = area.scrollLeft)));
  return { area, box, repaint };
}

// ---------------------------------------------------------------- layout

const CH = 7.4; // width of a character of a label, at 12px
const MAXLABEL = 34;
const LANE = 30;
const GAP = 26;
const short = (t) => (t.length > MAXLABEL ? t.slice(0, MAXLABEL - 1) + "…" : t);

/**
 * Where to draw each vertex and arrow of a phase. The vertices of the
 * phase's data that are the entry, the exit or a crossing sit on the base
 * line; each path without crossings of the data, and each path a rule adds,
 * is a segment drawn on a lane of its own, packed so that segments on one
 * lane do not overlap.
 */
export function layout(ph) {
  const arrows = ph.arrows;
  const n = ph.nverts;
  const inn = Array.from({ length: n }, () => []);
  const out = Array.from({ length: n }, () => []);
  arrows.forEach((a, i) => (out[a.from].push(i), inn[a.to].push(i)));
  // x: the longest path from the entry, each arrow as wide as its label
  const indeg = inn.map((l) => l.length);
  const order = [];
  const queue = [];
  for (let v = 0; v < n; v++) if (indeg[v] === 0 && (out[v].length || v === ph.entry)) queue.push(v);
  while (queue.length) {
    const v = queue.shift();
    order.push(v);
    for (const a of out[v]) if (--indeg[arrows[a].to] === 0) queue.push(arrows[a].to);
  }
  const width = (a) => short(arrows[a].tree).length * CH + GAP;
  const x = new Array(n).fill(0);
  for (const v of order) for (const a of out[v]) x[arrows[a].to] = Math.max(x[arrows[a].to], x[v] + width(a));
  // segments: the data's paths without crossings, then each application's path
  const input = arrows.map((a) => a.app === null);
  const inDeg = new Array(n).fill(0);
  const outDeg = new Array(n).fill(0);
  arrows.forEach((a, i) => {
    if (input[i]) (outDeg[a.from]++, inDeg[a.to]++);
  });
  const isBase = (v) => v === ph.entry || v === ph.exit || inDeg[v] !== 1 || outDeg[v] !== 1;
  const segments = [];
  for (const v of order) {
    if (!isBase(v)) continue;
    for (const a0 of out[v]) {
      if (!input[a0]) continue;
      const seg = [a0];
      let w = arrows[a0].to;
      while (!isBase(w)) {
        const b = out[w].find((b) => input[b]);
        seg.push(b);
        w = arrows[b].to;
      }
      segments.push({ arrows: seg, from: v, to: w, app: null });
    }
  }
  ph.applications.forEach((ap, k) => segments.push({ arrows: ap.added, from: arrows[ap.added[0]].from, to: arrows[ap.added.at(-1)].to, app: k }));
  // lanes: 0, -1, 1, -2, 2, …; the first lane free over the segment's span
  const lanes = new Map();
  const laneOf = new Array(arrows.length).fill(0);
  const y = new Array(n).fill(0);
  const free = (l, a, b) => !(lanes.get(l) || []).some(([c, d]) => a < d - 1 && c < b - 1);
  let top = 0;
  let bottom = 0;
  for (const s of segments) {
    const a = x[s.from];
    const b = x[s.to];
    let l = 0;
    for (let k = 0; ; k++) {
      l = k === 0 ? 0 : k % 2 ? -((k + 1) >> 1) : k >> 1;
      if (free(l, a, b)) break;
    }
    lanes.set(l, [...(lanes.get(l) || []), [a, b]]);
    top = Math.min(top, l);
    bottom = Math.max(bottom, l);
    for (const i of s.arrows) laneOf[i] = l;
    for (const i of s.arrows.slice(1)) y[arrows[i].from] = l;
  }
  return { x, y, laneOf, top, bottom, width: Math.max(...x, 0) };
}

function drawGraph(ph) {
  const L = layout(ph);
  const pad = 16;
  const yy = (l) => (l - L.top) * LANE + 26;
  const height = (L.bottom - L.top) * LANE + 44;
  const svg = s$("svg", { class: "qs-graph", width: L.width + 2 * pad, height, viewBox: `${-pad} 0 ${L.width + 2 * pad} ${height}` });
  svg.append(s$("defs", {}, s$("marker", { id: "qs-head", viewBox: "0 0 8 8", refX: 7, refY: 4, markerWidth: 6, markerHeight: 6, markerUnits: "userSpaceOnUse", orient: "auto-start-reverse" }, s$("path", { d: "M0,0 L8,4 L0,8 z", class: "qs-headpath" }))));
  const els = ph.arrows.map((a, i) => {
    const x1 = L.x[a.from];
    const x2 = L.x[a.to];
    const y1 = yy(L.y[a.from]);
    const y2 = yy(L.y[a.to]);
    const ly = yy(L.laneOf[i]);
    const r = 5;
    let d;
    if (y1 === ly && y2 === ly) d = `M${x1 + 3},${ly} H${x2 - 3}`;
    else {
      const up1 = ly < y1 ? -1 : 1;
      const up2 = ly < y2 ? -1 : 1;
      d = `M${x1},${y1}` + (y1 === ly ? "" : ` V${ly - up1 * r} Q${x1},${ly} ${x1 + r},${ly}`) + ` H${x2 - (y2 === ly ? 3 : r)}` + (y2 === ly ? "" : ` Q${x2},${ly} ${x2},${ly - up2 * r} V${y2 - up2 * 3}`);
    }
    const g = s$(
      "g",
      { class: "qs-arrow" + (a.app === null ? " input" : "") },
      s$("title", {}, a.tree),
      s$("path", { d, "marker-end": "url(#qs-head)" }),
      s$("text", { x: (x1 + x2) / 2, y: ly - 6, "text-anchor": "middle" }, short(a.tree)),
    );
    svg.append(g);
    return g;
  });
  const dots = [];
  const seen = new Set();
  ph.arrows.forEach((a) => {
    for (const v of [a.from, a.to]) {
      if (seen.has(v)) continue;
      seen.add(v);
      const c = s$("circle", { cx: L.x[v], cy: yy(L.y[v]), r: v === ph.entry || v === ph.exit ? 4 : 2.6, class: "qs-vertex" + (v === ph.entry || v === ph.exit ? " end" : "") });
      svg.append(c);
      dots.push([v, c]);
      c._arrows = [];
    }
  });
  const at = new Map(dots);
  ph.arrows.forEach((a, i) => (at.get(a.from)._arrows.push(i), at.get(a.to)._arrows.push(i)));
  return { svg, els, dots };
}

// ---------------------------------------------------------------- the page

function mountWith(host, { examples, initial, theme }) {
  host.classList.add("qs");
  if (theme === "light") host.classList.add("qs-light");
  const state = { run: null, graph: 0, phase: 0, step: 0, drawn: null, timer: null };

  // ---- the left ----
  const pick = $("select", { class: "qs-pick", "aria-label": "Example" });
  let group = null;
  for (const [i, ex] of examples.entries()) {
    if (ex.group !== group) {
      group = ex.group;
      pick.append($("optgroup", { label: group === "examples" ? "From C70" : "Experiments (docs/research.md)" }));
    }
    pick.lastChild.append($("option", { value: i }, `${ex.name}  ·  ${ex.title.toLowerCase()}`));
  }
  const limit = $("select", { "aria-label": "Limit" }, ...[2000, 20000, 200000].map((n) => $("option", { value: n, selected: n === 20000 }, `stop after ${n.toLocaleString()} new arrows`)));
  const runButton = $("button", { class: "qs-run", onclick: () => run() }, "Run ⌘↵");
  const prog = editor("Q-treatment");
  const data = editor("Data: graphs of strings", true);
  const problem = $("div", { class: "qs-problem", role: "status" });
  const left = $(
    "div",
    { class: "qs-left" },
    $("div", { class: "qs-bar" }, pick, runButton),
    $("div", { class: "qs-bar qs-opts" }, limit),
    $("div", { class: "qs-label" }, "Treatment"),
    prog.box,
    $("div", { class: "qs-label" }, "Data"),
    data.box,
    problem,
  );

  // ---- the right ----
  const graphTabs = $("div", { class: "qs-tabs qs-graphs" });
  const phaseTabs = $("div", { class: "qs-tabs" });
  const prev = $("button", { onclick: () => show(state.step - 1), "aria-label": "Previous step" }, "←");
  const next = $("button", { onclick: () => show(state.step + 1), "aria-label": "Next step" }, "→");
  const play = $("button", { onclick: () => toggle(), "aria-label": "Play" }, "▶");
  const slider = $("input", { type: "range", min: 0, max: 0, value: 0, class: "qs-slider", "aria-label": "Step", oninput: (e) => show(Number(e.target.value)) });
  const where = $("span", { class: "qs-where" });
  const summary = $("div", { class: "qs-summary" });
  const canvas = $("div", { class: "qs-canvas" });
  const rules = $("ol", { class: "qs-rules" });
  const result = $("pre", { class: "qs-result" });
  const log = $("ol", { class: "qs-log" });
  const printout = $("pre", { class: "qs-printout" });
  const right = $(
    "div",
    { class: "qs-right" },
    graphTabs,
    phaseTabs,
    $("div", { class: "qs-steps" }, prev, play, slider, next),
    where,
    summary,
    canvas,
    $("div", { class: "qs-legend" }, $("span", { class: "k-input" }, "data"), $("span", { class: "k-new" }, "added"), $("span", { class: "k-match" }, "path matched"), $("span", { class: "k-rewritten" }, "rewritten"), $("span", { class: "k-stranded" }, "stranded")),
    $("h3", {}, "Rules of this phase"),
    rules,
    $("h3", {}, "The graph after this phase, as printed"),
    result,
    $("details", { class: "qs-logbox" }, $("summary", {}, "Every application of a rule in this phase"), log),
    $("details", { class: "qs-printbox" }, $("summary", {}, "The whole printout"), printout),
  );
  host.append($("div", { class: "qs-grid" }, left, right));

  // ---- running ----
  const go = () => {
    clearTimeout(prog.area._t);
    prog.area._t = setTimeout(run, 600);
  };
  for (const ed of [prog, data]) {
    ed.area.addEventListener("input", go);
    ed.area.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        run();
      }
    });
  }
  limit.addEventListener("change", run);

  async function run() {
    stop();
    runButton.disabled = true;
    const r = await runner({ args: ["json", "--max-arrows", limit.value, "--data", data.area.value, "-"], text: prog.area.value });
    runButton.disabled = false;
    if (r.error || r.code) {
      problem.textContent = r.error || r.err || `qsys stopped (${r.code})`;
      problem.classList.add("bad");
      return;
    }
    const res = JSON.parse(r.out);
    if (res.error) {
      const e = res.error;
      problem.textContent = `${e.in}, line ${e.line}, column ${e.column}: ${e.message}`;
      problem.classList.add("bad");
      return;
    }
    problem.textContent = `${res.phases.length} phase${res.phases.length === 1 ? "" : "s"} · ${res.graphs.length} graph${res.graphs.length === 1 ? "" : "s"} of data`;
    problem.classList.remove("bad");
    state.run = res;
    printout.textContent = res.printout;
    state.graph = Math.min(state.graph, res.graphs.length - 1);
    graphTabs.replaceChildren(...(res.graphs.length > 1 ? res.graphs.map((_, i) => $("button", { onclick: () => pickGraph(i) }, `graph ${i + 1}`)) : []));
    pickGraph(state.graph, true);
  }

  function pickGraph(i, keep = false) {
    state.graph = i;
    [...graphTabs.children].forEach((b, k) => b.classList.toggle("on", k === i));
    const g = state.run.graphs[i];
    phaseTabs.replaceChildren(
      ...g.phases.map((ph, k) => {
        const sys = state.run.phases[k];
        return $("button", { onclick: () => pickPhase(k) }, `phase ${k + 1}`, sys.inv ? $("small", {}, " -INV-") : null, ph.converged ? null : $("small", { class: "bad" }, " ∞"));
      }),
    );
    if (!g.phases.length) {
      canvas.replaceChildren($("p", {}, "The treatment has no phase."));
      return;
    }
    pickPhase(Math.min(keep ? state.phase : 0, g.phases.length - 1), keep);
  }

  function pickPhase(k, keep = false) {
    stop();
    state.phase = k;
    [...phaseTabs.children].forEach((b, i) => b.classList.toggle("on", i === k));
    const ph = state.run.graphs[state.graph].phases[k];
    const sys = state.run.phases[k];
    rules.replaceChildren(...sys.rules.map((r, i) => $("li", { title: `line ${r.line}` }, $("code", {}, r.text))));
    result.textContent = ph.converged ? ph.printed || "(no arrows: the graph is empty)" : `The phase did not converge: it was stopped after ${state.run.limit.toLocaleString()} new arrows. C70 p. 22: "si le processus ne converge pas le résultat est indéfini".`;
    log.replaceChildren(
      ...ph.applications.slice(0, 3000).map((ap, i) =>
        $(
          "li",
          { onclick: () => show(i + 1) },
          $("span", { class: "qs-n" }, `${i + 1}`),
          $("span", {}, `rule ${ap.rule + 1}`),
          $("code", {}, ap.path.map((a) => ph.arrows[a].tree).join(" + ")),
          $("span", { class: "qs-to" }, "→"),
          $("code", {}, ap.added.map((a) => ph.arrows[a].tree).join(" + ")),
        ),
      ),
    );
    if (!ph.drawn) {
      state.drawn = null;
      canvas.replaceChildren($("p", { class: "qs-none" }, `${ph.arrowCount.toLocaleString()} arrows: too many to draw. The printout is below.`));
      slider.max = 0;
      show(0);
      return;
    }
    const d = drawGraph(ph);
    state.drawn = d;
    canvas.replaceChildren(d.svg);
    slider.max = ph.applications.length + 2;
    show(keep ? Math.min(state.step, ph.applications.length + 2) : ph.applications.length + 2, true);
  }

  // step 0: the data of the phase; 1..N: after each application; N+1: what
  // the second phase removes; N+2: the result.
  function show(i, fresh = false) {
    const ph = state.run?.graphs[state.graph]?.phases[state.phase];
    if (!ph) return;
    const N = ph.applications.length;
    const last = ph.drawn ? N + 2 : 0;
    i = Math.max(0, Math.min(i, last));
    state.step = i;
    slider.value = i;
    prev.disabled = i === 0;
    next.disabled = i === last;
    const sys = state.run.phases[state.phase];
    [...rules.children].forEach((li) => li.classList.remove("on"));
    [...log.children].forEach((li, k) => li.classList.toggle("on", k === i - 1));
    const counts = `${ph.inputArrows} arrow${ph.inputArrows === 1 ? "" : "s"} in · ${N} application${N === 1 ? "" : "s"} · ${ph.arrowCount} arrows after the first phase · ${ph.rewritten} rewritten · ${ph.stranded} stranded · ${ph.kept} kept, carrying ${ph.strings} string${ph.strings === "1" ? "" : "s"}`;
    if (!ph.drawn) {
      where.textContent = counts;
      summary.textContent = "";
      return;
    }
    if (i === 0) {
      where.textContent = "The data of this phase";
      summary.replaceChildren($("span", {}, counts));
    } else if (i <= N) {
      const ap = ph.applications[i - 1];
      const r = sys.rules[ap.rule];
      rules.children[ap.rule]?.classList.add("on");
      where.textContent = `First phase: application ${i} of ${N}`;
      summary.replaceChildren(
        $("div", {}, "rule ", $("b", {}, `${ap.rule + 1}`), " ", $("code", {}, r.text)),
        $("div", {}, "on ", $("code", { class: "k-match" }, ap.path.map((a) => ph.arrows[a].tree).join(" + "))),
        ap.env ? $("div", {}, "with ", $("code", {}, ap.env)) : null,
        $("div", {}, "adds ", $("code", { class: "k-new" }, ap.added.map((a) => ph.arrows[a].tree).join(" + "))),
      );
      log.children[i - 1]?.scrollIntoView({ block: "nearest" });
    } else if (i === N + 1) {
      where.textContent = "Second phase: removing";
      summary.replaceChildren(
        $("div", {}, $("span", { class: "k-rewritten" }, `${ph.rewritten} arrows`), " were on a path some rule was applied to; then ", $("span", { class: "k-stranded" }, `${ph.stranded} more`), " were left off every path from the entry to the exit."),
      );
    } else {
      where.textContent = ph.converged ? "The result of the phase" : "The phase did not converge";
      summary.replaceChildren($("span", {}, counts));
    }
    const cur = i >= 1 && i <= N ? ph.applications[i - 1] : null;
    const match = new Set(cur ? cur.path : []);
    const added = new Set(cur ? cur.added : []);
    state.drawn.els.forEach((g, k) => {
      const a = ph.arrows[k];
      const visible = a.app === null || (i > N ? true : a.app < i);
      const gone = i === N + 2 && a.fate !== "kept";
      g.classList.toggle("hidden", !visible || gone);
      g.classList.toggle("match", match.has(k));
      g.classList.toggle("new", added.has(k));
      g.classList.toggle("rewritten", i === N + 1 && a.fate === "rewritten");
      g.classList.toggle("stranded", i === N + 1 && a.fate === "stranded");
    });
    // a vertex is shown while an arrow at it is
    for (const [, c] of state.drawn.dots) c.classList.toggle("hidden", c._arrows.every((k) => state.drawn.els[k].classList.contains("hidden")));
    if (cur && !fresh) state.drawn.els[cur.added[0]]?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }

  function toggle() {
    if (state.timer) return stop();
    const ph = state.run?.graphs[state.graph]?.phases[state.phase];
    if (!ph?.drawn) return;
    if (state.step >= ph.applications.length + 2) show(0);
    play.textContent = "❚❚";
    state.timer = setInterval(() => {
      if (state.step >= ph.applications.length + 2) return stop();
      show(state.step + 1);
    }, Math.max(60, Math.min(500, 12000 / (ph.applications.length + 2))));
  }
  function stop() {
    clearInterval(state.timer);
    state.timer = null;
    play.textContent = "▶";
  }

  const keys = (e) => {
    if (document.activeElement === prog.area || document.activeElement === data.area || e.target.tagName === "SELECT" || e.target.tagName === "INPUT") return;
    if (!host.isConnected) return;
    if (e.key === "ArrowLeft") show(state.step - 1);
    if (e.key === "ArrowRight") show(state.step + 1);
  };
  document.addEventListener("keydown", keys);

  const load = (i) => {
    const ex = examples[i];
    pick.value = i;
    prog.area.value = ex.program;
    data.area.value = ex.data;
    prog.repaint();
    data.repaint();
    state.graph = 0;
    state.phase = 0;
    state.step = Infinity; // a new text opens on the result of its first phase
    host.dispatchEvent(new CustomEvent("qs-example", { detail: ex.name }));
    run();
  };
  pick.addEventListener("change", () => load(Number(pick.value)));
  load(Math.max(0, examples.findIndex((e) => e.name === initial)));
  return {
    destroy: () => {
      stop();
      document.removeEventListener("keydown", keys);
      host.replaceChildren();
      host.classList.remove("qs", "qs-light");
    },
  };
}

/**
 * The playground. `examples` is the list of texts (examples.json); if it is
 * not given it is fetched from beside this module. `initial` names the one to
 * open. `theme` "auto" follows the reader's setting; "light" keeps it light.
 */
export function mountPlayground(host, { examples = null, initial = null, theme = "auto" } = {}) {
  if (examples) return mountWith(host, { examples, initial, theme });
  let mounted = null;
  let gone = false;
  loadExamples().then((list) => {
    if (!gone) mounted = mountWith(host, { examples: list, initial, theme });
  });
  return { destroy: () => ((gone = true), mounted?.destroy()) };
}

let library = null;
/** The examples and research texts, from examples.json beside this module. */
export function loadExamples() {
  library ??= fetch(new URL("examples.json", import.meta.url)).then((r) => r.json());
  return library;
}

/**
 * One cell of a notebook: a treatment and its data, a button that runs them,
 * and what qsys prints.
 *
 * @param {HTMLElement} host
 * @param {{example?: string, program?: string, data?: string, args?: string[], label?: string, note?: string, theme?: "auto"|"light"}} options
 *        example names a text of examples.json; otherwise `program` and
 *        `data` give it. args go before the program: ["--det"], ["--width", "72"] …
 */
export function mountRunner(host, { example = null, program = "", data = "", args = [], label = "", note = "", theme = "auto" } = {}) {
  const p = editor(label || "Q-treatment");
  const d = editor("Data", true);
  const out = $("pre", { class: "qs-cell-out", hidden: true, "aria-live": "polite" });
  const run = $("button", { class: "qs-run" }, "Run");
  const shown = ["qsys", ...args, "PROGRAM", "DATA"].join(" ");
  const root = $(
    "div",
    { class: theme === "light" ? "qs qs-light qs-cell" : "qs qs-cell" },
    $("div", { class: "qs-cell-head" }, $("span", { class: "qs-cell-label" }, label), $("code", { class: "qs-cell-args" }, shown), run),
    p.box,
    d.box,
    out,
    note ? $("p", { class: "qs-cell-note" }, note) : null,
  );
  host.replaceChildren(root);
  const ready = (example ? loadExamples().then((all) => all.find((x) => x.name === example)) : Promise.resolve(null)).then((ex) => {
    if (ex) ({ program, data } = ex);
    p.area.value = program.replace(/\n$/, "");
    d.area.value = data.replace(/\n$/, "");
    p.repaint();
    d.repaint();
  });
  async function go() {
    await ready;
    run.disabled = true;
    run.textContent = "Running…";
    const r = await runner({ args: [...args, "--data", d.area.value + "\n", "-"], text: p.area.value + "\n" });
    run.disabled = false;
    run.textContent = "Run again";
    out.hidden = false;
    out.textContent = r.error ? `qsys could not run: ${r.error}` : (r.out + r.err).replace(/\n$/, "") || "(nothing printed)";
  }
  run.addEventListener("click", go);
  for (const ed of [p, d])
    ed.area.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        go();
      }
    });
  return { run: go, destroy: () => host.replaceChildren() };
}
