// A sitting at a JOSS console, in a page.
//
// JOSS is a conversation, and the interpreter (joss.wasm, the Rust program
// compiled unchanged for WASI) reads its lines from standard input. It cannot
// be paused in a browser while it waits for the next one, so it is not: each
// time a line is typed, the whole sitting is replayed from the first line.
// JOSS has no clock in it and no chance, so every replay types the same page
// as the one before and then one line more.
//
// Shared by the page (worker.js) and by test.mjs. No DOM.

import { run } from "./wasi.js";

/** Steps JOSS may do in answer to one line before the page presses INTERRUPT. */
export const DEFAULT_PATIENCE = 200_000;
/** Characters of page before the host gives up on a sitting. */
export const OUTPUT_LIMIT = 2_000_000;

/**
 * Replays a sitting.
 *
 * @param {WebAssembly.Module} module  joss.wasm, compiled
 * @param {object} sitting
 * @param {string[]} sitting.lines     every line typed so far, in order. A
 *        line `! interrupt after N lines` is not typed: it is the INTERRUPT
 *        key, pressed once JOSS has typed N lines of its next answer.
 * @param {"1964" | "1965"} [sitting.year]
 * @param {number} [sitting.patience]
 * @returns {{
 *   page: { who: "user" | "joss" | "key" | "page", text: string, asked?: string }[],
 *   waiting: "instruction" | "form" | "value",
 *   suspended: boolean,
 *   line: number,
 * }}
 *   `page` is the paper: each line and who typed it. A line JOSS began and
 *   the user finished (a Demand) is a "user" line with `asked` holding
 *   JOSS's part. If JOSS is waiting for a value, the last line is a "joss"
 *   line with `asked` and no text after it.
 */
export function replay(module, { lines, year = "1965", patience = DEFAULT_PATIENCE }) {
  const decoder = new TextDecoder();
  let text = "";
  const stdin = new TextEncoder().encode(lines.map((line) => line.replace(/[\r\n]+/g, " ") + "\n").join(""));
  run(module, ["--marked", "--status", "--year", year, "--patience", String(patience)], stdin, (fd, bytes) => {
    if (fd !== 1) return;
    text += decoder.decode(bytes, { stream: true });
    if (text.length > OUTPUT_LIMIT) throw new Error("stopped: more was typed than the page will hold");
  });
  return read(text);
}

/**
 * Replays a transcript of an original session (see transcripts/) and returns
 * the interpreter's own report of how what it typed compares with the page.
 */
export function verify(module, transcript) {
  const decoder = new TextDecoder();
  let text = "";
  run(module, ["--verify", "-"], new TextEncoder().encode(transcript), (fd, bytes) => {
    text += decoder.decode(bytes, { stream: true });
  });
  return text.replace(/^-\n/, "");
}

/** Reads the interpreter's marked output back into a page. */
export function read(text) {
  const page = [];
  let waiting = "instruction";
  let suspended = false;
  let line = 1;
  for (const raw of text.split("\n")) {
    const mark = raw.slice(0, 2);
    const rest = raw.slice(3);
    if (mark === "U:") page.push({ who: "user", text: rest });
    else if (mark === "J:") page.push({ who: "joss", text: rest });
    else if (mark === "P:") page.push({ who: "page", text: "" });
    else if (raw.startsWith("!")) page.push({ who: "key", text: raw.slice(1).trim() });
    else if (mark === "D:") {
      // JOSS typed up to and including "= "; the user typed the rest.
      const at = rest.indexOf("= ");
      const asked = at < 0 ? rest : rest.slice(0, at + 2);
      page.push({ who: "user", asked, text: at < 0 ? "" : rest.slice(at + 2) });
    } else if (mark === "S:") {
      const [what, task, at] = rest.split(" ");
      waiting = what;
      suspended = task === "suspended";
      line = Number(at);
    }
  }
  if (waiting === "value" && page.length) {
    const last = page[page.length - 1];
    if (last.asked !== undefined && last.text === "") page[page.length - 1] = { who: "joss", asked: last.asked, text: "" };
  }
  return { page, waiting, suspended, line };
}

/** The page as plain text: what the paper would show. */
export function paper(result) {
  return result.page
    .filter((line) => line.who === "user" || line.who === "joss")
    .map((line) => (line.asked ?? "") + line.text)
    .join("\n");
}

/**
 * One sitting. `runner` takes what `replay` takes (without the module) and
 * returns its result, or a promise of it: the page runs it in a worker.
 */
export class Sitting {
  constructor(runner, { year = "1965", patience = DEFAULT_PATIENCE } = {}) {
    this.runner = runner;
    this.year = year;
    this.patience = patience;
    /** Every line typed so far, and the keys pressed. */
    this.lines = [];
    this.result = { page: [], waiting: "instruction", suspended: false, line: 1 };
    this.busy = false;
  }

  /** Types one line and returns the new page. */
  type(line) {
    return this.typeAll([line]);
  }

  /** Types several lines, one after another. */
  async typeAll(lines) {
    this.lines.push(...lines.map((line) => String(line).replace(/[\r\n]+/g, " ")));
    return this.#replay();
  }

  /**
   * Presses INTERRUPT in the answer to the last line typed, after JOSS has
   * typed `after` lines of it.
   */
  async interrupt(after) {
    let at = this.lines.length - 1;
    while (at > 0 && this.lines[at].startsWith("!")) at--;
    this.lines.splice(at, 0, `! interrupt after ${after} lines`);
    return this.#replay();
  }

  async #replay() {
    this.busy = true;
    try {
      this.result = await this.runner({ lines: this.lines.slice(), year: this.year, patience: this.patience });
    } finally {
      this.busy = false;
    }
    return this.result;
  }
}
