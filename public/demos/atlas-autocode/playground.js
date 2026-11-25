// The playground, as a module that can be mounted anywhere: this folder's
// index.html mounts it on a page of its own, and the site mounts it inside
// its pages. Two things can be mounted:
//
//   import { mountPlayground, mountRunner } from "./playground.js";
//   mountPlayground(element, { example: "1965-binomial" });
//     the Flexowriter, the tape, the line printer, and the 1965 page beside
//     ours for the two programs that have one
//   mountRunner(element, { example: "1965-ab-monitor" })    or { tape: "..." }
//     a program and a button to run it, with what it prints
//
// The program runs in a worker (worker.js) that runs aa.wasm, the Rust
// interpreter compiled for WASI. The look is playground.css, scoped to
// .aa-play.

import { drawPage, drawTape, keysOf, punch, splitTape, significant, Flexowriter, KEYBOARD } from "./flexowriter.js";

const BASE = new URL(".", import.meta.url);
let shared = null;

/** examples.json and transcripts.json, fetched once. */
function library() {
  shared ??= Promise.all([
    fetch(new URL("examples.json", BASE)).then((r) => r.json()),
    fetch(new URL("transcripts.json", BASE)).then((r) => r.json()),
  ]).then(([examples, t]) => ({
    examples,
    // name → the page as it was printed
    transcripts: Array.isArray(t) ? Object.fromEntries(t.map((x) => [x.name, x.text])) : t,
  }));
  return shared;
}

const PRINTED = {
  "1965-ab-monitor": "What COMPILER AB printed: Reference Manual, p. B1.4",
  "1965-binomial": "What COMPILER AB printed: Mini-Manual, July 1965, p. 8",
};

/** Run a tape in a fresh worker. Resolves to { out, err, code } or { error }. */
export function runTape(tape, compiler = "aa", { seconds = 20 } = {}) {
  return new Promise((resolve) => {
    const worker = new Worker(new URL("worker.js", BASE), { type: "module" });
    const timer = setTimeout(() => { worker.terminate(); resolve({ error: `stopped after ${seconds} seconds` }); }, seconds * 1000);
    const done = (r) => { clearTimeout(timer); worker.terminate(); resolve(r); };
    worker.onmessage = ({ data }) => done(data);
    worker.onerror = (e) => done({ error: e.message || "the worker stopped" });
    worker.postMessage({ wasmUrl: new URL("aa.wasm", BASE).href, tape, compiler });
  });
}

/** Mark the lines of our page and the 1965 page that differ, word for word. */
function compare(ours, theirs) {
  const a = significant(ours), b = significant(theirs);
  const marksOurs = new Set(), marksTheirs = new Set();
  let same = 0;
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    if (a[i] && b[i] && a[i][1] === b[i][1]) { same++; continue; }
    if (a[i]) marksOurs.add(a[i][0]);
    if (b[i]) marksTheirs.add(b[i][0]);
  }
  return { same, of: b.length, marksOurs, marksTheirs };
}

const html = (s) => { const t = document.createElement("template"); t.innerHTML = s.trim(); return t.content.firstElementChild; };

export function mountPlayground(host, { example = null, autorun = false, compact = false } = {}) {
  const root = html(`<div class="aa-play">
  <div class="controls">
    <label>Example <select data-k="example"></select></label>
    <label>Compiler, if the tape names none <select data-k="compiler"><option value="aa">COMPILER AA</option><option value="ab">COMPILER AB</option></select></label>
    <button data-k="run" class="primary">COMPILE AND RUN</button>
    <button data-k="stop" disabled>STOP</button>
    <span data-k="status" class="status"></span>
  </div>
  <div class="grid">
    <section>
      <div class="label">The tape, as text</div>
      <textarea data-k="source" class="source" spellcheck="false" autocomplete="off" aria-label="The program, as text"></textarea>
      <div class="label">The data, after end of program, up to ***Z</div>
      <textarea data-k="data" class="data" spellcheck="false" autocomplete="off" aria-label="The data"></textarea>
      <details>
        <summary>How to type</summary>
        <p>In the text box, type as on any keyboard. Delimiters are underlined letters: write <code>%cycle</code> or <code>c̲y̲c̲l̲e̲</code>; <code>!=</code>, <code>&lt;=</code>, <code>&gt;=</code> and <code>^</code> stand for <code>≠ ≤ ≥ ↑</code>.</p>
        <p>On the Flexowriter page, click it and type: the keys strike where the carriage is, on the paper. <kbd>Backspace</kbd> moves the carriage back, so the next key strikes over: type <code>cycle</code>, five backspaces and five underlines, and it is the delimiter. <code>=</code>, <kbd>Backspace</kbd>, <code>/</code> is <code>≠</code>; <code>*</code>, <kbd>Backspace</kbd>, <code>|</code> is <code>↑</code>; <code>:</code>, <kbd>Backspace</kbd>, <code>,</code> is the semicolon. <kbd>Ctrl</kbd>+<kbd>U</kbd> underlines the word before the carriage, as a shortcut for doing it by hand. There is no deleting on paper: change the text box instead.</p>
        <p>The keys drawn below have two symbols. Which one a key prints depends on the case: press UPPER CASE or LOWER CASE as a typist did. The digits and the point are on upper case; the comma and the brackets on lower.</p>
      </details>
    </section>
    <section>
      <div class="label">The Flexowriter page: what the compiler reads</div>
      <div class="sheet-wrap"><div data-k="page" class="page" tabindex="0" aria-label="The Flexowriter page. Click to type."></div></div>
      <div class="keyboard" data-k="keyboard" aria-label="The Flexowriter keyboard"></div>
    </section>
  </div>
  <div class="label">The seven-track tape it punches <span data-k="count"></span></div>
  <div class="tape-wrap"><canvas data-k="tape" aria-label="The punched tape"></canvas></div>
  <div class="grid">
    <section>
      <div class="label">The line printer</div>
      <div class="sheet-wrap printout"><div data-k="printout" class="page" aria-live="polite"></div></div>
    </section>
    <section data-k="compare-wrap" hidden>
      <div class="label" data-k="compare-title"></div>
      <div class="sheet-wrap"><div data-k="compare" class="page"></div></div>
      <p class="note" data-k="compare-note"></p>
    </section>
  </div>
</div>`);
  if (compact) root.classList.add("compact");
  host.replaceChildren(root);
  const $ = (k) => root.querySelector(`[data-k="${k}"]`);
  const source = $("source"), data = $("data"), page = $("page"), printout = $("printout");
  let examples = [], transcripts = {}, running = 0;

  const tape = () => {
    const p = source.value.endsWith("\n") ? source.value : source.value + "\n";
    const d = data.value;
    return d.trim() ? p + d + (d.endsWith("\n") ? "" : "\n") : p;
  };
  const fw = new Flexowriter({ getText: () => source.value, setText: (t) => { source.value = t; }, onChange: () => draw(true) });

  function draw(typing) {
    drawPage(page, source.value, { carriage: typing ? fw.carriage : null });
    const rows = punch(keysOf(source.value));
    drawTape($("tape"), rows);
    $("count").textContent = `(${rows.length} rows)`;
    drawKeyboard();
  }

  function drawKeyboard() {
    const kb = $("keyboard");
    kb.textContent = "";
    for (const row of KEYBOARD) {
      const r = document.createElement("div");
      r.className = "row";
      for (const key of row) {
        const b = document.createElement("button");
        b.className = `key ${fw.upper ? "upper" : "lower"}`;
        b.type = "button";
        b.setAttribute("aria-label", `${key[0]} on upper case, ${key[1]} on lower case`);
        b.innerHTML = `<span class="up"></span><span class="lo"></span>`;
        b.children[0].textContent = key[0];
        b.children[1].textContent = key[1];
        b.onclick = () => { if (!fw.carriage) fw.start(); fw.press(key); fw.write(); };
        r.append(b);
      }
      kb.append(r);
    }
    const r = document.createElement("div");
    r.className = "row";
    const wide = (label, act, on) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = `key wide${on ? " on" : ""}`;
      b.textContent = label;
      b.onclick = () => { if (!fw.carriage) fw.start(); act(); fw.write(); };
      r.append(b);
    };
    wide("UPPER CASE", () => { fw.upper = true; }, fw.upper);
    wide("LOWER CASE", () => { fw.upper = false; }, !fw.upper);
    wide("SPACE", () => fw.space());
    wide("BACK SPACE", () => fw.backspace());
    wide("TAB", () => fw.tab());
    wide("RETURN", () => fw.newline());
    kb.append(r);
  }

  page.addEventListener("focus", () => { fw.start(); draw(true); });
  page.addEventListener("blur", () => draw(false));
  page.addEventListener("keydown", (e) => {
    if (!fw.carriage) fw.start();
    let done = true;
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "u") fw.underlineWord();
    else if (e.ctrlKey || e.metaKey || e.altKey) done = false;
    else if (e.key === "Backspace") fw.backspace();
    else if (e.key === "Enter") fw.newline();
    else if (e.key === "Tab") fw.tab();
    else if (e.key.length === 1) $("status").textContent = fw.type(e.key) ? "" : `the Flexowriter has no key for ${e.key}`;
    else done = false;
    if (done) { e.preventDefault(); fw.write(); }
  });
  source.addEventListener("input", () => { fw.carriage = null; draw(false); });

  function showCompare(name, ours) {
    const wrap = $("compare-wrap");
    wrap.hidden = !PRINTED[name];
    if (!PRINTED[name]) return null;
    const theirs = transcripts[name];
    $("compare-title").textContent = PRINTED[name];
    let note = "Run it to compare, word for word, line by line.";
    let marks = { marksOurs: null, marksTheirs: new Set() };
    if (ours !== null) {
      marks = compare(ours, theirs);
      note = `${marks.same} of ${marks.of} lines agree, compared word for word. Machine addresses and code sizes are left out of both, because no machine code is written here. Lines that differ are marked.`;
    }
    drawPage($("compare"), theirs, { marks: marks.marksTheirs });
    $("compare-note").textContent = note;
    return marks.marksOurs;
  }

  function load(name) {
    const ex = examples.find((x) => x.name === name) || examples[0];
    $("example").value = ex.name;
    const { program, data: d } = splitTape(ex.tape);
    source.value = program.replace(/\n$/, "");
    data.value = d === null ? "" : d.replace(/\n$/, "");
    fw.carriage = null;
    draw(false);
    printout.textContent = "";
    $("status").textContent = "";
    showCompare(ex.name, null);
  }

  async function run() {
    const mine = ++running;
    $("run").disabled = true;
    $("stop").disabled = false;
    $("status").textContent = "compiling…";
    printout.textContent = "";
    const result = await runTape(tape(), $("compiler").value);
    if (mine !== running) return;
    $("run").disabled = false;
    $("stop").disabled = true;
    if (result.error) { $("status").textContent = result.error; return; }
    const marks = showCompare($("example").value, result.out);
    drawPage(printout, result.out + (result.err ? `\n${result.err}` : ""), { marks });
    $("status").textContent = result.code === 0 ? "ran to the end" : "stopped: see the page";
  }

  $("run").onclick = run;
  $("stop").onclick = () => { running++; $("run").disabled = false; $("stop").disabled = true; $("status").textContent = "stopped"; };
  $("example").onchange = (e) => { load(e.target.value); host.dispatchEvent(new CustomEvent("aa-example", { detail: e.target.value })); };

  library().then((lib) => {
    examples = lib.examples;
    transcripts = lib.transcripts;
    for (const ex of examples) {
      const o = document.createElement("option");
      o.value = o.textContent = ex.name;
      $("example").append(o);
    }
    load(examples.some((x) => x.name === example) ? example : examples[0].name);
    if (autorun) run();
  });
  return { load, run, destroy: () => { running++; host.replaceChildren(); } };
}

/**
 * A program and what it prints, for a page about it: the program as the
 * Flexowriter printed it, a button, the line printer, and, for the two 1965
 * programs, the page that was printed then.
 */
export function mountRunner(host, { example = null, tape = null, compiler = "aa", label = "", note = "", printed = true } = {}) {
  const root = html(`<div class="aa-play runner">
  <div class="sheet-wrap"><div data-k="program" class="page"></div></div>
  <div class="controls"><button data-k="run" class="primary">COMPILE AND RUN</button><span data-k="status" class="status"></span></div>
  <div class="grid" data-k="pages">
    <section><div class="label">The line printer</div><div class="sheet-wrap printout"><div data-k="printout" class="page"></div></div></section>
    <section data-k="compare-wrap" hidden><div class="label" data-k="compare-title"></div><div class="sheet-wrap"><div data-k="compare" class="page"></div></div></section>
  </div>
  <p class="note" data-k="note"></p>
</div>`);
  host.replaceChildren(root);
  const $ = (k) => root.querySelector(`[data-k="${k}"]`);
  $("note").textContent = note;
  let text = tape;
  let theirs = null;
  const ready = library().then((lib) => {
    if (example) {
      const ex = lib.examples.find((x) => x.name === example);
      text = ex ? ex.tape : "";
      const t = lib.transcripts[example];
      if (printed && t && PRINTED[example]) theirs = t;
    }
    const { program } = splitTape(text);
    drawPage($("program"), program.replace(/\n$/, ""));
    if (theirs) {
      $("compare-wrap").hidden = false;
      $("compare-title").textContent = PRINTED[example];
      drawPage($("compare"), theirs);
    } else {
      $("pages").classList.add("single");
    }
  });
  $("run").onclick = async () => {
    await ready;
    $("run").disabled = true;
    $("status").textContent = "compiling…";
    const r = await runTape(text, compiler);
    $("run").disabled = false;
    if (r.error) { $("status").textContent = r.error; return; }
    let marks = null;
    let status = r.code === 0 ? "ran to the end" : "stopped: see the page";
    if (theirs) {
      const c = compare(r.out, theirs);
      marks = c.marksOurs;
      drawPage($("compare"), theirs, { marks: c.marksTheirs });
      status = `${c.same} of ${c.of} lines agree with the page of 1965, word for word`;
    }
    drawPage($("printout"), r.out, { marks });
    $("status").textContent = status;
  };
  void label;
  return { destroy: () => host.replaceChildren() };
}
