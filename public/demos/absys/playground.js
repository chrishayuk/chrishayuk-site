// The Absys playground: a text on the left, and on the right the computation
// after each of its assertions is accepted: every derivation alive, its
// bindings, its suspended equations and waiting processes, the tree of
// alternatives the ors made, and every step on the way.
//
// absys.wasm does the work (`absys json`), in a worker; the language server
// (`absys lsp`, the same file) gives the hover text, in another.

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
      worker.postMessage({ id, wasmUrl: new URL("absys.wasm", import.meta.url).href, ...message });
    });
  };
}
const runner = client("worker.js");
const server = client("lsp-worker.js");

/** [from, to, kind] for each piece of the text, for colouring. */
export function tokens(text, notation) {
  const out = [];
  const re =
    notation === "1969"
      ? /(%[^\n]*)|('[^'\n]*'|"[^"\n]*")|\b(lambda|or|begin|end|key)\b|\b(tout|null)(?=\s*\()|([A-Za-z][A-Za-z0-9_]*)(?=\s*\(|'?\s*=\s*lambda)|([A-Za-z][A-Za-z0-9_]*'?)|(\d+)|(=>|[=&;|+\-*/])/g
      : /(%[^\n]*)|('[^'\n]*'|"[^"\n]*")|\b(lambda|or|not)\b|\b(tout|set)(?=\s*\()|([a-z][A-Za-z0-9_]*(?:-[A-Za-z][A-Za-z0-9_]*)*)(?=\s*\(|\s*=\s*lambda)|([A-Z_][A-Za-z0-9_]*|[a-z][A-Za-z0-9_]*(?:-[A-Za-z][A-Za-z0-9_]*)*)|(\d+)|([=|,])/g;
  const kinds = [null, "comment", "string", "keyword", "macro", "function", "variable", "number", "operator"];
  for (const m of text.matchAll(re)) {
    const k = m.findIndex((g, i) => i > 0 && g !== undefined);
    // a quote straight after a name, in 1969, is a prime, not a constant
    if (k === 2 && notation === "1969" && m.index > 0 && /[A-Za-z0-9_]/.test(text[m.index - 1])) continue;
    out.push([m.index, m.index + m[0].length, kinds[k]]);
  }
  return out;
}

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** The derivation tree, from the events of every step up to `upto`. */
function tree(run, upto) {
  const kids = new Map();
  const status = new Map([[0, "root"]]);
  const why = new Map();
  for (const step of run.steps.slice(0, upto + 1)) {
    for (const e of step.events) {
      if (e.depth !== 0) continue;
      if (e.kind === "or") {
        const ids = [...e.text.matchAll(/#(\d+)/g)].map((m) => Number(m[1]));
        kids.set(e.deriv, ids);
        status.set(e.deriv, "split");
        for (const id of ids) status.set(id, "running");
      } else if (e.kind === "fail") {
        status.set(e.deriv, "failed");
        why.set(e.deriv, e.text);
      } else if (e.kind === "hibernate") status.set(e.deriv, "hibernating");
    }
  }
  const alive = new Set(run.steps[upto].derivations.map((d) => d.id));
  return { kids, status, why, alive };
}

function mountWith(host, { examples, initial, theme }) {
  host.classList.add("ab");
  if (theme === "light") host.classList.add("ab-light");
  const state = { run: null, step: 0, notation: "1990", busy: false, showEnv: false, hideQuiet: true };

  // ---- the left: text and options ----
  const pick = $("select", { class: "ab-pick", "aria-label": "Example" });
  let group = null;
  for (const [i, ex] of examples.entries()) {
    if (ex.group !== group) {
      group = ex.group;
      pick.append($("optgroup", { label: group === "examples" ? "From the sources" : "Experiments (docs/research.md)" }));
    }
    pick.lastChild.append($("option", { value: i }, `${ex.name}  ·  ${ex.notation}`));
  }
  const notation = $("select", { "aria-label": "Notation" }, $("option", { value: "1990" }, "1990 notation (Elcock)"), $("option", { value: "1969" }, "1969 notation (Absys 1)"));
  const search = $("select", { "aria-label": "Search" }, $("option", { value: "fair" }, "search: fair"), $("option", { value: "depth-first" }, "search: depth-first"));
  const select = $("select", { "aria-label": "Literal" }, $("option", { value: "in-place" }, "literals: in place"), $("option", { value: "fifo" }, "literals: fifo"));
  const negation = $("select", { "aria-label": "Negation" }, $("option", { value: "immediate" }, "not: immediate"), $("option", { value: "delayed" }, "not: delayed"));
  const budget = $("select", { "aria-label": "Budget" }, ...[2000, 20000, 100000].map((n) => $("option", { value: n, selected: n === 20000 }, `${n.toLocaleString()} steps`)));
  const runButton = $("button", { class: "ab-run", onclick: () => run() }, "Run ⌘↵");
  const area = $("textarea", { class: "ab-text", spellcheck: "false", autocapitalize: "off", "aria-label": "Absys text" });
  const paint = $("pre", { class: "ab-paint", "aria-hidden": "true" });
  const editor = $("div", { class: "ab-editor" }, paint, area);
  const problem = $("div", { class: "ab-problem", role: "status" });
  const hoverBox = $("div", { class: "ab-hover", hidden: true });
  const left = $(
    "div",
    { class: "ab-left" },
    $("div", { class: "ab-bar" }, pick, notation, runButton),
    $("div", { class: "ab-bar ab-opts" }, search, select, negation, budget),
    editor,
    problem,
    hoverBox,
  );

  // ---- the right: the computation ----
  const timeline = $("ol", { class: "ab-timeline" });
  const prev = $("button", { onclick: () => show(state.step - 1), "aria-label": "Previous assertion" }, "←");
  const next = $("button", { onclick: () => show(state.step + 1), "aria-label": "Next assertion" }, "→");
  const where = $("span", { class: "ab-where" });
  const summary = $("div", { class: "ab-summary" });
  const derivs = $("div", { class: "ab-derivs" });
  const treeBox = $("div", { class: "ab-tree" });
  const envToggle = $("label", {}, $("input", { type: "checkbox", onchange: (e) => ((state.showEnv = e.target.checked), show(state.step)) }), " whole binding environments");
  const quietToggle = $("label", {}, $("input", { type: "checkbox", checked: true, onchange: (e) => ((state.hideQuiet = e.target.checked), show(state.step)) }), " hide hibernations");
  const log = $("ol", { class: "ab-log" });
  const right = $(
    "div",
    { class: "ab-right" },
    $("div", { class: "ab-steps" }, prev, where, next),
    timeline,
    summary,
    $("h3", {}, "Derivations after this assertion ", envToggle),
    derivs,
    $("details", { class: "ab-treebox", open: true }, $("summary", {}, "Alternatives: the derivations each or made"), treeBox),
    $("details", { class: "ab-logbox", open: true }, $("summary", {}, "What accepting this assertion did ", quietToggle), log),
  );
  host.append($("div", { class: "ab-grid" }, left, right));

  // ---- the text ----
  const repaint = () => {
    const text = area.value;
    const step = state.run?.steps[state.step];
    let html = "";
    let at = 0;
    const marks = [];
    if (step) marks.push([step.start, step.end]);
    for (const [from, to, kind] of tokens(text, notation.value)) {
      html += esc(text.slice(at, from)) + `<span class="t-${kind}">${esc(text.slice(from, to))}</span>`;
      at = to;
    }
    html += esc(text.slice(at)) + "\n";
    paint.innerHTML = html;
    // the assertion being shown: a band behind its lines
    paint.querySelectorAll(".ab-band").forEach((b) => b.remove());
    if (step) {
      const lh = parseFloat(getComputedStyle(area).lineHeight) || 20;
      const pad = parseFloat(getComputedStyle(area).paddingTop) || 0;
      const band = $("div", { class: "ab-band" });
      band.style.top = `${pad + (step.line - 1) * lh}px`;
      band.style.height = `${(step.endLine - step.line + 1) * lh}px`;
      paint.prepend(band);
    }
    paint.scrollTop = area.scrollTop;
    paint.scrollLeft = area.scrollLeft;
  };
  area.addEventListener("input", () => {
    repaint();
    clearTimeout(area._t);
    area._t = setTimeout(run, 500);
  });
  area.addEventListener("scroll", () => ((paint.scrollTop = area.scrollTop), (paint.scrollLeft = area.scrollLeft)));
  area.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      run();
    }
  });
  // hover: what the language server says about the word under the pointer
  area.addEventListener("mousemove", (e) => {
    clearTimeout(area._h);
    area._h = setTimeout(() => hover(e), 350);
  });
  area.addEventListener("mouseleave", () => (hoverBox.hidden = true));
  async function hover(e) {
    const offset = offsetAt(e);
    if (offset === null) return (hoverBox.hidden = true);
    const before = area.value.slice(0, offset);
    const line = before.split("\n").length - 1;
    const character = offset - (before.lastIndexOf("\n") + 1);
    const uri = notation.value === "1969" ? "file:///text.ab1" : "file:///text.abs";
    const r = await server({ text: area.value, uri, requests: [{ method: "textDocument/hover", params: { position: { line, character } } }] });
    const md = r?.results?.[0]?.contents?.value;
    if (!md) return (hoverBox.hidden = true);
    hoverBox.innerHTML = esc(md)
      .replace(/\*\*([^*]+)\*\*/g, "<b>$1</b>")
      .replace(/`([^`]+)`/g, "<code>$1</code>")
      .replace(/_([^_]+)_/g, "<i>$1</i>")
      .replace(/\n\n---\n\n/g, "<hr>")
      .replace(/ {2}\n|\n\n/g, "<br>");
    hoverBox.hidden = false;
  }
  function offsetAt(e) {
    // the character under the pointer, from the monospace grid
    const r = area.getBoundingClientRect();
    const cs = getComputedStyle(area);
    const lh = parseFloat(cs.lineHeight) || 20;
    const cw = (() => {
      const probe = $("span", {}, "0000000000");
      probe.style.font = cs.font;
      probe.style.visibility = "hidden";
      document.body.append(probe);
      const w = probe.getBoundingClientRect().width / 10;
      probe.remove();
      return w;
    })();
    const y = e.clientY - r.top - parseFloat(cs.paddingTop) + area.scrollTop;
    const x = e.clientX - r.left - parseFloat(cs.paddingLeft) + area.scrollLeft;
    const lines = area.value.split("\n");
    const line = Math.floor(y / lh);
    if (line < 0 || line >= lines.length) return null;
    const col = Math.round(x / cw);
    if (col < 0 || col > lines[line].length) return null;
    return lines.slice(0, line).reduce((n, l) => n + l.length + 1, 0) + col;
  }

  // ---- running ----
  async function run() {
    const args = ["json", "--notation", notation.value, "--search", search.value, "--select", select.value, "--negation", negation.value, "--steps", budget.value];
    runButton.disabled = true;
    const keep = state.step;
    const r = await runner({ args, text: area.value });
    runButton.disabled = false;
    if (r.error || r.code) {
      problem.textContent = r.error || r.err || `absys stopped (${r.code})`;
      return;
    }
    state.run = JSON.parse(r.out);
    const e = state.run.error;
    problem.textContent = e ? `line ${e.line}, column ${e.column}: ${e.message}` : "";
    problem.classList.toggle("bad", !!e);
    timeline.replaceChildren(
      ...state.run.steps.map((s, i) =>
        $(
          "li",
          { onclick: () => show(i), title: s.source },
          $("code", {}, s.source.split("\n")[0].slice(0, 46) + (s.source.length > 46 || s.source.includes("\n") ? " …" : "")),
          $("span", { class: "ab-count" + (s.alive === 0 ? " dead" : "") }, s.alive === 0 ? "none" : `${s.alive}`),
        ),
      ),
    );
    show(Math.min(keep, Math.max(0, state.run.steps.length - 1)), true);
  }

  function show(i, fresh = false) {
    const runData = state.run;
    if (!runData || !runData.steps.length) {
      derivs.replaceChildren();
      log.replaceChildren();
      treeBox.replaceChildren();
      summary.textContent = runData ? "No assertion has been accepted." : "";
      repaint();
      return;
    }
    i = Math.max(0, Math.min(i, runData.steps.length - 1));
    state.step = i;
    const step = runData.steps[i];
    const before = i > 0 ? runData.steps[i - 1] : null;
    [...timeline.children].forEach((li, k) => li.classList.toggle("on", k === i));
    timeline.children[i]?.scrollIntoView({ block: "nearest" });
    where.textContent = `assertion ${i + 1} of ${runData.steps.length}`;
    prev.disabled = i === 0;
    next.disabled = i === runData.steps.length - 1;

    const was = before ? before.derivations.length : 1;
    const parts = [`${step.steps.toLocaleString()} step${step.steps === 1 ? "" : "s"}`];
    if (step.failed) parts.push(`${step.failed} derivation${step.failed === 1 ? "" : "s"} failed`);
    parts.push(step.alive === 0 ? "no derivation survives: the text is unsatisfiable" : `${was} → ${step.alive} derivation${step.alive === 1 ? "" : "s"}`);
    if (step.exhausted) parts.push(`the budget ran out with derivations still elaborating`);
    summary.replaceChildren($("code", {}, step.source.split("\n")[0]), $("span", {}, " · " + parts.join(" · ")));
    summary.classList.toggle("dead", step.alive === 0);

    // the derivations, with what changed since the assertion before
    const old = new Map((before?.derivations ?? []).map((d) => [d.id, d]));
    const oldParent = (d) => old.get(d.id) ?? (before?.derivations ?? []).find((o) => o.id === d.parent);
    derivs.replaceChildren(
      ...step.derivations.map((d) => {
        const prior = oldParent(d);
        const priorValue = new Map((prior?.answers ?? []).map((a) => [a.name, a.value]));
        const card = $(
          "article",
          { class: `ab-card ${d.status}` + (old.has(d.id) ? "" : " new") },
          $("header", {}, $("b", {}, `#${d.id}`), $("span", { class: "ab-status" }, d.status), old.has(d.id) || !before ? null : $("span", { class: "ab-new" }, "new")),
          d.outputs.length ? $("div", { class: "ab-out" }, ...d.outputs.map((o) => $("div", {}, "tout → ", $("code", {}, o)))) : null,
          d.procedures.length ? $("div", { class: "ab-procs" }, "procedures ", ...d.procedures.map((p) => $("code", {}, p))) : null,
          $(
            "table",
            { class: "ab-ans" },
            ...d.answers.map((a) =>
              $(
                "tr",
                { class: before && priorValue.get(a.name) !== a.value ? "changed" : "" },
                $("th", {}, a.name),
                $("td", {}, a.value === a.name && !a.via.length ? $("i", {}, "uninstantiated") : $("code", {}, a.value), a.via.length ? $("div", { class: "ab-via" }, "by the suspended ", ...a.via.flatMap((v, k) => [k ? ", " : null, $("code", {}, v)])) : null),
              ),
            ),
          ),
          d.suspended.length
            ? $("div", { class: "ab-susp" }, $("div", { class: "ab-label" }, "suspended"), ...d.suspended.map((s) => $("div", { class: `chip ${s.why}` }, s.text)))
            : null,
          d.pending.length ? $("div", { class: "ab-pend" }, $("div", { class: "ab-label" }, "still to do"), ...d.pending.slice(0, 6).map((p) => $("code", {}, p))) : null,
          state.showEnv ? $("div", { class: "ab-env" }, $("div", { class: "ab-label" }, "binding environment"), $("code", {}, d.environment.map(([k, v]) => `${k}/${v}`).join(",  ") || "empty")) : null,
        );
        return card;
      }),
    );
    if (!step.derivations.length) derivs.append($("p", { class: "ab-none" }, "No derivation survives."));
    if (step.alive > step.derivations.length) derivs.append($("p", { class: "ab-none" }, `… and ${step.alive - step.derivations.length} more derivations.`));

    // the tree of alternatives
    const t = tree(runData, i);
    const node = (id) => {
      const st = t.alive.has(id) ? "alive" : t.status.get(id) || "gone";
      const kids = t.kids.get(id) || [];
      return $(
        "li",
        { class: `t-${st}`, title: t.why.get(id) || "" },
        $("span", {}, `#${id}`),
        st === "failed" ? $("small", {}, " ✗ " + (t.why.get(id) || "").slice(0, 70)) : st === "alive" ? $("small", {}, " ●") : null,
        kids.length ? $("ul", {}, ...kids.map(node)) : null,
      );
    };
    const count = [...t.status.keys()].length;
    treeBox.replaceChildren(count > 400 ? $("p", {}, `${count} derivations: too many to draw.`) : $("ul", { class: "ab-treelist" }, node(0)));

    // the events
    const evs = state.hideQuiet ? step.events.filter((e) => e.kind !== "hibernate") : step.events;
    log.replaceChildren(
      ...evs.map((e) =>
        $("li", { class: `k-${e.kind}`, style: `padding-left:${0.6 + e.depth * 1.4}em` }, $("span", { class: "ab-d" }, `#${e.deriv}`), $("span", { class: "ab-k" }, e.kind), $("span", {}, e.text)),
      ),
    );
    if (step.eventCount > step.events.length) log.append($("li", {}, `… ${step.eventCount - step.events.length} more steps not shown`));
    repaint();
    if (!fresh) host.dispatchEvent(new CustomEvent("ab-step", { detail: i }));
  }

  // keyboard: ← and → step through the assertions, when not typing
  const keys = (e) => {
    if (!host.contains(document.activeElement) && document.activeElement !== document.body) return;
    if (document.activeElement === area || e.target.tagName === "SELECT") return;
    if (e.key === "ArrowLeft") show(state.step - 1);
    if (e.key === "ArrowRight") show(state.step + 1);
  };
  document.addEventListener("keydown", keys);

  const load = (i) => {
    const ex = examples[i];
    pick.value = i;
    notation.value = ex.notation;
    area.value = ex.text;
    state.step = 0;
    state.run = null;
    repaint();
    host.dispatchEvent(new CustomEvent("ab-example", { detail: ex.name }));
    run();
  };
  pick.addEventListener("change", () => load(Number(pick.value)));
  for (const s of [notation, search, select, negation, budget]) s.addEventListener("change", run);
  const start = Math.max(0, examples.findIndex((e) => e.name === initial));
  load(start);
  return {
    destroy: () => {
      document.removeEventListener("keydown", keys);
      host.replaceChildren();
      host.classList.remove("ab", "ab-light");
    },
  };
}

/**
 * The playground: a text, and the computation after each of its assertions.
 * `examples` is the list of texts (examples.json); if it is not given it is
 * fetched from beside this module. `initial` names the one to open. `theme`
 * "auto" follows the reader's light or dark setting; "light" keeps it light.
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
 * One cell of a notebook: a text, a button that runs it, and what absys
 * prints. The text can be edited before it is run.
 *
 * @param {HTMLElement} host
 * @param {{example?: string, text?: string, notation?: "1990"|"1969", args?: string[], label?: string, note?: string, theme?: "auto"|"light"}} options
 *        example names a text of examples.json; otherwise `text` and
 *        `notation` give it. args go before the text: ["--each"],
 *        ["--trace"], ["permute"], ["--search", "depth-first"] …
 */
export function mountRunner(host, { example = null, text = "", notation = "1990", args = [], label = "", note = "", theme = "auto" } = {}) {
  const area = $("textarea", { class: "ab-text", spellcheck: "false", autocapitalize: "off", "aria-label": label || "Absys text" });
  const paint = $("pre", { class: "ab-paint", "aria-hidden": "true" });
  const out = $("pre", { class: "ab-cell-out", hidden: true, "aria-live": "polite" });
  const run = $("button", { class: "ab-run" }, "Run");
  const shown = ["absys", ...args, "FILE"].join(" ");
  const root = $(
    "div",
    { class: theme === "light" ? "ab ab-light ab-cell" : "ab ab-cell" },
    $("div", { class: "ab-cell-head" }, $("span", { class: "ab-cell-label" }, label), $("code", { class: "ab-cell-args" }, shown), run),
    $("div", { class: "ab-editor" }, paint, area),
    out,
    note ? $("p", { class: "ab-cell-note" }, note) : null,
  );
  host.replaceChildren(root);
  const repaint = () => {
    const t = area.value;
    let html = "";
    let at = 0;
    for (const [from, to, kind] of tokens(t, notation)) {
      html += esc(t.slice(at, from)) + `<span class="t-${kind}">${esc(t.slice(from, to))}</span>`;
      at = to;
    }
    paint.innerHTML = html + esc(t.slice(at)) + "\n";
  };
  area.addEventListener("input", repaint);
  area.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      go();
    }
  });
  const ready = (example ? loadExamples().then((all) => all.find((x) => x.name === example)) : Promise.resolve(null)).then((ex) => {
    if (ex) {
      text = ex.text;
      notation = ex.notation;
    }
    area.value = text.replace(/\n$/, "");
    repaint();
  });
  async function go() {
    await ready;
    run.disabled = true;
    run.textContent = "Running…";
    const r = await runner({ args: [...args, "--notation", notation, "-"], text: area.value + "\n" });
    run.disabled = false;
    run.textContent = "Run again";
    out.hidden = false;
    out.textContent = r.error ? `absys could not run: ${r.error}` : (r.out + r.err).replace(/\n$/, "") || "(nothing printed)";
  }
  run.addEventListener("click", go);
  return { run: go, destroy: () => host.replaceChildren() };
}
