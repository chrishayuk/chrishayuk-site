// A JOSS console as it looked in 1964: paper on a platen, a ribbon in two
// colours, and the typewriter handed back and forth.
//
//   import { mountTypewriter } from "./typewriter.js";
//   const console = mountTypewriter(element, { year: "1965" });
//   console.play(["Type 2+2.", "Set x = 3."]);   // types lines in, one by one
//
// What is from the sources, and what is not:
//
// - The user's lines are typed in green and JOSS's in black. "A two-color
//   ribbon switches automatically to black for output and to green for
//   input." (Shaw, P-3149, May 1965, p. 3)
// - JOSS types at ten characters a second. "The typing speed of ten
//   characters per second, less shifting time, has not been a source of
//   dissatisfaction." (Shaw, P-2922, August 1964, p. 12)
// - While JOSS has the typewriter, a red light is on and the keyboard is
//   locked. "As JOSS turns control of the typewriter back to the user, the
//   light changes to green, the keyboard unlocks, the ribbon color changes to
//   green, and a soft gong rings." (P-2922, p. 9) The gong here is made by the
//   browser, not recorded.
// - The sign-on of 1965 is from the listing of 9 January 1965: "JOSS at your
//   service." and "Initials please:  " (routine X11), and, for initials that
//   will not do, "Just one to four letters please." (X10). Each page is headed
//   with the time, the date and the initials, and five blank lines (routine
//   =22, and every page of P-3131). The sign-on of 1964 is from the film
//   (RM-4162-PR, p. 2): "Press 'IN' for JOSS service." and "Please identify
//   yourself.", and a page headed with the date and the name given.
// - The sign-on and the page headings are played by this page. Everything
//   after them is typed by the interpreter, joss.wasm, replayed from the first
//   line each time a line is typed (session.js).
// - `@` becomes `·` as it is typed, and `!=`, `<=`, `>=` become `≠`, `≤`, `≥`:
//   the JOSS typewriter had keys for them (P-2922, p. 11). Backspace takes a
//   character back, where on the typewriter it struck over.

import { DEFAULT_PATIENCE, Sitting, replay } from "./session.js";

const SPEEDS = { 1964: 10, fast: 60, instant: Infinity }; // characters a second
const USER_SPEED = 14; // how fast play() types the user's lines

let sharedWorker = null;
let nextId = 0;
const pending = new Map();

/** Replays a sitting in a worker beside this module. */
function workerRunner(base) {
  const wasmUrl = new URL("joss.wasm", base).href;
  return (sitting) => {
    if (!sharedWorker) {
      sharedWorker = new Worker(new URL("worker.js", base), { type: "module" });
      sharedWorker.onmessage = ({ data }) => {
        const wait = pending.get(data.id);
        pending.delete(data.id);
        if (!wait) return;
        if (data.error) wait.reject(new Error(data.error));
        else wait.resolve(data.result);
      };
      sharedWorker.onerror = (event) => {
        for (const wait of pending.values()) wait.reject(new Error(event.message || "the worker stopped"));
        pending.clear();
        sharedWorker = null;
      };
    }
    const id = ++nextId;
    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject });
      sharedWorker.postMessage({ id, wasmUrl, sitting });
    });
  };
}

/** Replays a sitting in this thread, with a module given: for tests. */
export function localRunner(module) {
  return (sitting) => replay(module, sitting);
}

// ---------------------------------------------------------------- sound

class Sound {
  constructor() {
    this.on = true;
    this.ctx = null;
  }
  wake() {
    // Silent until the reader has clicked or typed on the page: a browser will
    // not start sound before then, and should not be asked to.
    if (!this.on || (typeof navigator !== "undefined" && navigator.userActivation && !navigator.userActivation.hasBeenActive)) return null;
    try {
      this.ctx ??= new (window.AudioContext || window.webkitAudioContext)();
      if (this.ctx.state === "suspended") this.ctx.resume();
    } catch {
      this.ctx = null;
    }
    return this.ctx;
  }
  /** A typebar striking the platen. */
  strike(soft = false) {
    const ctx = this.wake();
    if (!ctx) return;
    const t = ctx.currentTime;
    const length = 0.035;
    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * length), ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 6);
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    const band = ctx.createBiquadFilter();
    band.type = "bandpass";
    band.frequency.value = 2200 + Math.random() * 900;
    band.Q.value = 0.9;
    const gain = ctx.createGain();
    gain.gain.value = soft ? 0.12 : 0.28;
    noise.connect(band).connect(gain).connect(ctx.destination);
    noise.start(t);
  }
  /** The carriage returning, and the paper moving up a line. */
  carriage() {
    const ctx = this.wake();
    if (!ctx) return;
    const t = ctx.currentTime;
    for (let i = 0; i < 5; i++) {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "square";
      o.frequency.value = 180 + i * 7;
      g.gain.setValueAtTime(0.0001, t + i * 0.018);
      g.gain.exponentialRampToValueAtTime(0.035, t + i * 0.018 + 0.003);
      g.gain.exponentialRampToValueAtTime(0.0001, t + i * 0.018 + 0.016);
      o.connect(g).connect(ctx.destination);
      o.start(t + i * 0.018);
      o.stop(t + i * 0.018 + 0.02);
    }
  }
  /** "a soft gong rings" */
  gong() {
    const ctx = this.wake();
    if (!ctx) return;
    const t = ctx.currentTime;
    for (const [f, level] of [[392, 0.16], [784.6, 0.05], [1182, 0.025]]) {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = "sine";
      o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(level, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);
      o.connect(g).connect(ctx.destination);
      o.start(t);
      o.stop(t + 1.7);
    }
  }
}

// ---------------------------------------------------------------- helpers

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/** The typewriter's own characters, from what a keyboard has. */
export function typewriterKeys(text, picture = false) {
  if (picture) return text;
  let out = "";
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    const next = text[i + 1];
    if (c === '"') quoted = !quoted;
    if (!quoted && c === "@") out += "·";
    else if (!quoted && next === "=" && (c === "!" || c === "<" || c === ">")) {
      out += c === "!" ? "≠" : c === "<" ? "≤" : "≥";
      i++;
    } else out += c;
  }
  return out;
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function headingFor(year, who, now = new Date()) {
  const yy = String(now.getFullYear()).slice(-2);
  const date = `${now.getMonth() + 1}-${String(now.getDate()).padStart(2, "0")}-${yy}`;
  if (year === "1964") return `${date} ${who}`;
  const time = `${String(now.getHours()).padStart(2, "0")}${String(now.getMinutes()).padStart(2, "0")}`;
  return `${time} ${date} ${who}`;
}


const STYLE = `
.jt{--jt-paper:#f3eedf;--jt-paper-edge:#e6dfcb;--jt-black:#1b1a17;--jt-green:#1d6b3a;--jt-red:#c8392b;--jt-lamp-green:#2fa35c;--jt-metal:#2a2b28;--jt-metal-2:#3a3c38;--jt-label:#cfcabc;font-family:system-ui,-apple-system,Segoe UI,sans-serif;color:var(--jt-black);max-width:880px}
.jt *{box-sizing:border-box}
.jt-box{display:flex;flex-wrap:wrap;align-items:center;gap:10px 16px;padding:10px 14px;background:linear-gradient(#34362f,#25261f);border-radius:10px 10px 0 0;color:var(--jt-label);font:11px/1.2 ui-monospace,Menlo,monospace;letter-spacing:.08em}
.jt-lamps{display:flex;gap:14px}
.jt-lamp-label{display:inline-flex;align-items:center;gap:6px}
.jt-lamp{width:12px;height:12px;border-radius:50%;background:#4a4a44;box-shadow:inset 0 1px 2px #0008}
.jt-lamp-red.jt-on{background:var(--jt-red);box-shadow:0 0 10px var(--jt-red),inset 0 1px 1px #fff6}
.jt-lamp-green.jt-on{background:var(--jt-lamp-green);box-shadow:0 0 10px var(--jt-lamp-green),inset 0 1px 1px #fff6}
.jt-state{flex:1 1 180px;min-width:0}
.jt-buttons{display:flex;flex-wrap:wrap;gap:6px}
.jt-button,.jt-select{font:11px/1 ui-monospace,Menlo,monospace;letter-spacing:.06em;padding:7px 10px;border:1px solid #6b6a60;border-radius:4px;background:#1c1d19;color:var(--jt-label);cursor:pointer}
.jt-button:disabled{opacity:.35;cursor:default}
.jt-select{letter-spacing:0;max-width:230px}
.jt-platen{position:relative;background:linear-gradient(#141512,#22231f 14px,#22231f calc(100% - 14px),#141512);padding:0 34px;cursor:text}
.jt-paper{height:440px;overflow-y:auto;overflow-x:auto;scrollbar-width:none;background:var(--jt-paper);background-image:radial-gradient(circle at 12px 50%,#22231f 4.5px,transparent 5px),radial-gradient(circle at calc(100% - 12px) 50%,#22231f 4.5px,transparent 5px);background-size:100% 24px;background-repeat:repeat-y;box-shadow:inset 0 10px 18px -10px #0006,inset 0 -26px 22px -18px #0007;padding:16px 40px 46px}
.jt-paper::-webkit-scrollbar{display:none}
.jt-compact .jt-paper{height:260px}
.jt-sheet{min-width:max-content}
.jt-line{white-space:pre;font:15px/1.6 "Courier Prime","Courier New",Courier,monospace;min-height:1.6em;letter-spacing:.02em}
.jt-black{color:var(--jt-black);font-weight:700;text-shadow:0 0 .4px #1b1a17aa}
.jt-green{color:var(--jt-green);text-shadow:0 0 .4px #1d6b3a88}
.jt-point{display:inline-block;width:.62em;border-bottom:2px solid transparent;margin-left:1px}
.jt-focused:not(.jt-locked) .jt-point{border-bottom-color:var(--jt-green);animation:jt-blink 1.1s steps(2) infinite}
.jt-locked .jt-point{border-bottom-color:#c8392b55}
@keyframes jt-blink{50%{border-bottom-color:transparent}}
.jt-new-page{margin:14px 0 0}
.jt-perforation{border-top:2px dashed #b8ae94;margin:6px -40px 10px}
.jt-key-line{font:10px/1.9 ui-monospace,Menlo,monospace;letter-spacing:.08em;color:#9a5b00}
.jt-keyboard{position:absolute;left:0;bottom:0;width:1px;height:1px;opacity:0;border:0;padding:0;font-size:16px}
.jt-keys{display:flex;flex-wrap:wrap;align-items:center;gap:6px;padding:10px 14px;background:#25261f;border-radius:0 0 10px 10px}
.jt-key{width:40px;height:34px;border-radius:50%;border:1px solid #6b6a60;background:radial-gradient(circle at 50% 35%,#f4f1e6,#cfc9b6);color:#1b1a17;font:16px/1 "Courier Prime","Courier New",monospace;cursor:pointer;box-shadow:0 2px 0 #0007}
.jt-key:active{transform:translateY(1px);box-shadow:0 1px 0 #0007}
.jt-caption{margin:0 0 0 8px;color:var(--jt-label);font-size:12px;line-height:1.4;flex:1 1 240px}
@media (max-width:640px){.jt-platen{padding:0 10px}.jt-paper{padding:12px 26px 40px;height:360px}.jt-line{font-size:13px}}
`;

function addStyle() {
  if (document.getElementById("jt-style")) return;
  const style = document.createElement("style");
  style.id = "jt-style";
  style.textContent = STYLE;
  document.head.append(style);
}

// ---------------------------------------------------------------- the console

/**
 * Puts a JOSS console in `host`.
 *
 * Options:
 *   year      "1965" (default) or "1964"
 *   signOn    true (default) to begin with the sign-on; false to begin at a
 *             fresh page as if signed on as `initials`
 *   initials  for signOn false: what heads the page (default "YOU")
 *   speed     "1964" (ten characters a second, the default), "fast" or "instant"
 *   sound     true (default) or false
 *   runner    a function that replays a sitting (default: a worker beside this file)
 *   compact   true for a shorter sheet, to sit in a note
 *   label     an accessible name for the paper
 *
 * Returns { play(lines), type(line), fresh(), setYear(year), setSpeed(speed),
 *           interrupt(), element, destroy() }.
 */
export function mountTypewriter(host, options = {}) {
  const base = options.base || new URL(".", import.meta.url).href;
  const runner = options.runner || workerRunner(base);
  addStyle();
  const sound = new Sound();
  sound.on = options.sound !== false;
  let year = options.year === "1964" ? "1964" : "1965";
  let speed = options.speed in SPEEDS ? options.speed : "1964";

  // ---- the parts
  const root = el("div", `jt${options.compact ? " jt-compact" : ""}`);
  const box = el("div", "jt-box");
  const lampJoss = el("span", "jt-lamp jt-lamp-red");
  const lampYou = el("span", "jt-lamp jt-lamp-green");
  const lamps = el("div", "jt-lamps");
  const joss = el("span", "jt-lamp-label");
  joss.append(lampJoss, el("span", "", "JOSS"));
  const you = el("span", "jt-lamp-label");
  you.append(lampYou, el("span", "", "YOU"));
  lamps.append(joss, you);
  const state = el("span", "jt-state");
  state.setAttribute("aria-live", "polite");
  const buttons = el("div", "jt-buttons");
  const inButton = el("button", "jt-button", "IN");
  inButton.type = "button";
  inButton.hidden = true;
  const interruptButton = el("button", "jt-button", "INTERRUPT");
  interruptButton.type = "button";
  const goButton = el("button", "jt-button", "Go.");
  goButton.type = "button";
  const freshButton = el("button", "jt-button", "FRESH PAPER");
  freshButton.type = "button";
  const speedSelect = el("select", "jt-select");
  speedSelect.setAttribute("aria-label", "How fast JOSS types");
  for (const [value, label] of [["1964", "10 characters a second, as in 1964"], ["fast", "fast"], ["instant", "at once"]]) {
    const option = new Option(label, value);
    speedSelect.append(option);
  }
  speedSelect.value = speed;
  const soundButton = el("button", "jt-button jt-sound", sound.on ? "SOUND ON" : "SOUND OFF");
  soundButton.type = "button";
  buttons.append(inButton, interruptButton, goButton, freshButton, speedSelect, soundButton);
  box.append(lamps, state, buttons);

  const platen = el("div", "jt-platen");
  const paper = el("div", "jt-paper");
  paper.setAttribute("role", "log");
  paper.setAttribute("aria-label", options.label || "The paper in the JOSS typewriter");
  const sheet = el("div", "jt-sheet");
  paper.append(sheet);
  platen.append(paper);

  // The line being typed: what JOSS began, what the user has typed, the print point.
  const current = el("div", "jt-line jt-current");
  const currentAsked = el("span", "jt-black");
  const currentTyped = el("span", "jt-green");
  const printPoint = el("span", "jt-point", " ");
  current.append(currentAsked, currentTyped, printPoint);
  sheet.append(current);

  // A text box that holds the keyboard: off to the side, but focusable, so a
  // phone shows its keyboard.
  const keyboard = el("input", "jt-keyboard");
  keyboard.setAttribute("autocomplete", "off");
  keyboard.setAttribute("autocapitalize", "off");
  keyboard.setAttribute("autocorrect", "off");
  keyboard.setAttribute("spellcheck", "false");
  keyboard.setAttribute("aria-label", "Type a line for JOSS");
  platen.append(keyboard);

  const keys = el("div", "jt-keys");
  for (const character of ["·", "≠", "≤", "≥"]) {
    const key = el("button", "jt-key", character);
    key.type = "button";
    key.setAttribute("aria-label", `Type ${character}`);
    key.addEventListener("click", () => {
      if (!ready) return;
      keyboard.value += character;
      showTyped();
      sound.strike();
      keyboard.focus();
    });
    keys.append(key);
  }
  const caption = el("p", "jt-caption", "Click the paper and type. Every instruction ends with a full stop. Times is @ or ·; * is “to the power”.");
  keys.append(caption);

  root.append(box, platen, keys);
  host.append(root);

  // ---- state
  let sitting = new Sitting(runner, { year, patience: DEFAULT_PATIENCE });
  let drawn = [];          // the page entries on the paper, as { who, text, asked }
  let nodes = [];          // their elements, one each
  let ready = false;       // the user has the typewriter
  let phase = "idle";      // "signon" | "identify" | "joss" | "work"
  let who = options.initials || "YOU";
  let typing = null;       // { cancel: boolean } while JOSS is typing
  let answered = 0;        // lines JOSS has typed of its latest answer
  let generation = 0;      // bumped by fresh(): stale work stops
  let waiting = "instruction";
  let destroyed = false;
  let engaged = false;     // the reader has clicked or typed here

  function setState() {
    lampJoss.classList.toggle("jt-on", !ready);
    lampYou.classList.toggle("jt-on", ready);
    root.classList.toggle("jt-locked", !ready);
    keyboard.readOnly = !ready;
    interruptButton.disabled = !typing || phase !== "work";
    goButton.disabled = !ready || phase !== "work";
    state.textContent = !ready ? "JOSS HAS THE TYPEWRITER"
      : phase === "signon" ? "PRESS IN"
      : phase === "identify" ? "YOUR TURN: SIGN ON"
      : waiting === "value" ? "YOUR TURN: JOSS WANTS A VALUE"
      : waiting === "form" ? "YOUR TURN: TYPE THE FORM"
      : sitting.result.suspended ? "YOUR TURN: A TASK IS WAITING FOR Go."
      : "YOUR TURN";
    options.onState?.({ ready, phase, waiting, suspended: sitting.result.suspended });
  }

  function scroll() {
    // The platen stays still and the paper moves up.
    paper.scrollTop = paper.scrollHeight;
  }

  function addLine(entry) {
    let node;
    if (entry.who === "page") {
      // A new sheet: the perforation, and the heading JOSS types at its top.
      node = el("div", "jt-new-page");
      node.append(el("div", "jt-perforation"));
      const head = el("div", "jt-line");
      head.append(el("span", "jt-black", ""));
      node.append(head);
      for (let i = 0; i < 5; i++) node.append(el("div", "jt-line"));
    } else if (entry.who === "key") {
      // A key pressed, such as INTERRUPT: on the real paper it left no mark.
      node = el("div", "jt-key-line");
      node.hidden = true;
    } else {
      node = el("div", "jt-line");
      if (entry.asked !== undefined) node.append(el("span", "jt-black", entry.asked));
      node.append(el("span", entry.who === "joss" ? "jt-black" : "jt-green", entry.text));
    }
    sheet.insertBefore(node, current);
    drawn.push(entry);
    nodes.push(node);
    scroll();
    return node;
  }

  function trimTo(count) {
    while (drawn.length > count) {
      nodes.pop().remove();
      drawn.pop();
    }
  }

  /** Types text onto a span at the current speed. */
  async function typeOut(span, text, rate, soft = false, job = typing) {
    const mine = generation;
    const perChar = rate === Infinity ? 0 : 1000 / rate;
    if (perChar === 0) {
      span.textContent += text;
      scroll();
      return true;
    }
    for (const c of text) {
      if (mine !== generation || job?.cancel) return false;
      span.textContent += c;
      if (c !== " ") sound.strike(soft);
      scroll();
      await sleep(c === " " ? perChar * 0.6 : perChar);
    }
    return true;
  }

  async function carriageReturn() {
    if (SPEEDS[speed] === Infinity) return;
    sound.carriage();
    await sleep(SPEEDS[speed] >= 60 ? 40 : 180);
  }

  /** JOSS types a whole line, then returns the carriage. */
  async function jossLine(text, job = typing) {
    const node = addLine({ who: "joss", text: "" });
    const span = node.lastChild;
    const ok = await typeOut(span, text, SPEEDS[speed], false, job);
    drawn[drawn.length - 1] = { who: "joss", text };
    await carriageReturn();
    return ok;
  }

  function handOver() {
    ready = true;
    typing = null;
    sound.gong();
    setState();
    // Take the keyboard back if the reader has been using this typewriter.
    if (engaged || options.focus) keyboard.focus({ preventScroll: true });
  }

  function takeOver() {
    ready = false;
    setState();
  }

  function showTyped() {
    keyboard.value = typewriterKeys(keyboard.value, waiting === "form");
    currentTyped.textContent = keyboard.value;
    scroll();
  }

  // ---- the sign-on, played by this page

  async function signOn() {
    const mine = generation;
    takeOver();
    if (options.signOn === false) {
      await heading(who);
      if (mine === generation) {
        phase = "work";
        handOver();
      }
      return;
    }
    if (year === "1964") {
      typing = { cancel: false };
      await jossLine("Press 'IN' for JOSS service.");
      if (mine !== generation) return;
      phase = "signon";
      inButton.hidden = false;
      handOver();
      return;
    }
    typing = { cancel: false };
    addLine({ who: "joss", text: "" });
    await jossLine("JOSS at your service.");
    if (mine !== generation) return;
    await ask("Initials please:  ");
  }

  async function ask(prompt) {
    const mine = generation;
    typing = { cancel: false };
    currentAsked.textContent = "";
    await typeOut(currentAsked, prompt, SPEEDS[speed]);
    if (mine !== generation) return;
    phase = "identify";
    handOver();
  }

  async function heading(name) {
    typing = { cancel: false };
    await jossLine(headingFor(year, name));
    for (let i = 0; i < 5; i++) addLine({ who: "joss", text: "" });
  }

  inButton.addEventListener("click", async () => {
    if (phase !== "signon") return;
    inButton.hidden = true;
    takeOver();
    typing = { cancel: false };
    await jossLine("Please identify yourself.");
    phase = "identify";
    currentAsked.textContent = "";
    handOver();
  });

  async function identify(line) {
    const name = line.trim();
    const mine = generation;
    takeOver();
    const asked = currentAsked.textContent;
    addLine({ who: "user", text: name, asked: asked || undefined });
    currentAsked.textContent = "";
    await carriageReturn();
    if (year === "1965" && !/^[A-Za-z]{1,4}$/.test(name)) {
      typing = { cancel: false };
      await jossLine("Just one to four letters please.");
      if (mine === generation) await ask("Initials please:  ");
      return;
    }
    who = year === "1965" ? name.toUpperCase() : name;
    await heading(who);
    if (mine !== generation) return;
    phase = "work";
    drawnBase = drawn.length;
    handOver();
  }

  // The interpreter's page begins after the sign-on: entries of its page are
  // drawn from here.
  let drawnBase = 0;

  // ---- the sitting

  async function show(result) {
    const mine = generation;
    const page = result.page;
    // How much of what is on the paper the new page agrees with.
    let same = 0;
    while (same < page.length && drawnBase + same < drawn.length) {
      const a = page[same];
      const b = drawn[drawnBase + same];
      if (a.who !== b.who || a.text !== b.text || (a.asked ?? "") !== (b.asked ?? "")) break;
      same++;
    }
    trimTo(drawnBase + same);
    // The line JOSS is waiting on is the current line, not the paper.
    const end = result.waiting === "value" && page.at(-1)?.who === "joss" ? page.length - 1 : page.length;
    // This answer's own job: INTERRUPT cancels it, and the answer that
    // replaces it gets a new one.
    const job = (typing = { cancel: false });
    answered = 0;
    setState();
    for (let i = same; i < end; i++) {
      if (mine !== generation || job.cancel) return;
      const entry = page[i];
      if (entry.who === "joss") {
        if (!(await jossLine(entry.text, job))) return;
        answered++;
      } else if (entry.who === "page") {
        const node = addLine(entry);
        await carriageReturn();
        await typeOut(node.querySelector(".jt-black"), headingFor(year, who), SPEEDS[speed], false, job);
        await carriageReturn();
      } else {
        addLine(entry);
        answered = 0;
      }
    }
    if (mine !== generation || job.cancel) return;
    waiting = result.waiting;
    currentAsked.textContent = "";
    if (end < page.length) await typeOut(currentAsked, page.at(-1).asked ?? "", SPEEDS[speed], false, job);
    if (mine !== generation || job.cancel) return;
    handOver();
  }

  async function submit(line) {
    if (!ready) return;
    const typed = typewriterKeys(line, waiting === "form");
    keyboard.value = "";
    currentTyped.textContent = "";
    if (phase === "identify") return identify(typed);
    if (phase !== "work") return;
    takeOver();
    // The line goes onto the paper as typed; the replay will agree with it.
    const asked = currentAsked.textContent;
    currentAsked.textContent = "";
    addLine(asked ? { who: "user", text: typed, asked } : { who: "user", text: typed });
    await carriageReturn();
    const mine = generation;
    try {
      const result = await sitting.type(typed);
      if (mine === generation) await show(result);
    } catch (error) {
      if (mine !== generation) return;
      addLine({ who: "key", text: "" }).textContent = `[${String(error.message || error)}]`;
      handOver();
    }
  }

  keyboard.addEventListener("input", () => {
    if (!ready) {
      keyboard.value = currentTyped.textContent;
      return;
    }
    sound.strike();
    showTyped();
  });
  keyboard.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (ready) submit(keyboard.value);
    }
  });
  platen.addEventListener("click", () => keyboard.focus({ preventScroll: true }));
  root.addEventListener("pointerdown", () => (engaged = true));
  root.addEventListener("keydown", () => (engaged = true));
  keyboard.addEventListener("focus", () => root.classList.add("jt-focused"));
  keyboard.addEventListener("blur", () => root.classList.remove("jt-focused"));

  interruptButton.addEventListener("click", () => interrupt());
  goButton.addEventListener("click", () => {
    if (!ready) return;
    submit("Go.");
  });
  freshButton.addEventListener("click", () => fresh());
  speedSelect.addEventListener("change", () => (speed = speedSelect.value));
  soundButton.addEventListener("click", () => {
    sound.on = !sound.on;
    soundButton.textContent = sound.on ? "SOUND ON" : "SOUND OFF";
  });

  /** The INTERRUPT key: JOSS finishes the line it is on, and stops. */
  async function interrupt() {
    if (!typing || phase !== "work") return;
    const after = answered + 1;
    typing.cancel = true;
    const mine = generation;
    // Let the line being typed finish.
    await sleep(0);
    const lines = sitting.lines.slice();
    try {
      const result = await sitting.interrupt(after);
      if (mine !== generation) return;
      // Redraw this answer from the replay, cut short.
      await show(result);
    } catch {
      sitting.lines = lines;
    }
  }

  function fresh() {
    generation++;
    typing = null;
    ready = false;
    phase = "idle";
    waiting = "instruction";
    drawn = [];
    for (const node of nodes) node.remove();
    nodes = [];
    drawnBase = 0;
    keyboard.value = "";
    currentTyped.textContent = "";
    currentAsked.textContent = "";
    inButton.hidden = true;
    sitting = new Sitting(runner, { year, patience: DEFAULT_PATIENCE });
    setState();
    return signOn().then(() => {
      drawnBase = phase === "work" ? drawn.length : drawnBase;
    });
  }

  /** Types lines in, one by one, as a user would: for a demonstration. */
  async function play(lines, { initials = "JCS" } = {}) {
    const mine = generation;
    const wait = async () => {
      while (!ready && mine === generation && !destroyed) await sleep(30);
    };
    await wait();
    if (phase === "signon") {
      inButton.click();
      await sleep(50);
      await wait();
    }
    if (phase === "identify") await typeLine(year === "1964" ? "RAND" : initials);
    for (const line of lines) {
      await wait();
      if (mine !== generation || destroyed) return;
      // `! interrupt after N lines`: the INTERRUPT key, pressed in the answer
      // to the next line.
      const key = /^!\s*interrupt after (\d+) lines?$/.exec(line.trim());
      if (key) {
        pendingInterrupt = Number(key[1]);
        continue;
      }
      if (/^!/.test(line.trim())) continue;
      await typeLine(line);
    }
  }

  let pendingInterrupt = null;

  async function typeLine(line) {
    const mine = generation;
    keyboard.value = "";
    currentTyped.textContent = "";
    const cps = SPEEDS[speed] === Infinity ? Infinity : USER_SPEED * (SPEEDS[speed] / 10 > 1 ? 4 : 1);
    for (const c of line) {
      if (mine !== generation) return;
      keyboard.value += c;
      showTyped();
      if (c !== " " && cps !== Infinity) sound.strike(true);
      if (cps !== Infinity) await sleep(1000 / cps);
    }
    if (pendingInterrupt !== null && phase === "work") {
      const after = pendingInterrupt;
      pendingInterrupt = null;
      sitting.lines.push(`! interrupt after ${after} lines`);
    }
    await submit(keyboard.value);
  }

  function setYear(next) {
    year = next === "1964" ? "1964" : "1965";
    return fresh();
  }

  function setSpeed(next) {
    if (next in SPEEDS) {
      speed = next;
      speedSelect.value = next;
    }
  }

  function destroy() {
    destroyed = true;
    generation++;
    root.remove();
  }

  setState();
  fresh();
  return {
    element: root,
    play,
    type: (line) => typeLine(line),
    fresh,
    setYear,
    setSpeed,
    interrupt,
    get page() {
      return drawn.slice();
    },
    get ready() {
      return ready;
    },
    destroy,
  };
}
