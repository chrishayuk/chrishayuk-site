// Feeding a tape to the Laning and Zierler system, in a page.
//
// lz.wasm is the Rust program `lz`, compiled unchanged for WASI. It reads the
// tape from standard input, types the page on standard output, and says what
// went wrong (and, if asked, the trace and the costs) on standard error. The
// system of 1954 was a batch system: the tape went in whole and the answers
// came back. So there is nothing to wait for and nothing to replay: each run
// is one run of the program.
//
// Shared by the page (worker.js) and by test.mjs. No DOM.

import { run } from "./wasi.js";

/** Equations carried out before the page gives up on a run. */
export const DEFAULT_LIMIT = 2_000_000;
/** Characters of output kept from one stream. */
export const OUTPUT_LIMIT = 2_000_000;

/**
 * One run of lz.
 *
 * @param {WebAssembly.Module} module  lz.wasm, compiled
 * @param {string} tape                the program, as typed
 * @param {string[]} args              lz's options
 * @returns {{stdout: string, stderr: string, code: number, cut: boolean}}
 *          `cut` is true if more was written than the page keeps
 */
export function lz(module, tape, args = []) {
  const decoder = [new TextDecoder(), new TextDecoder()];
  const out = ["", ""];
  let cut = false;
  const code = run(module, args, new TextEncoder().encode(tape), (fd, bytes) => {
    const i = fd === 1 ? 0 : 1;
    if (out[i].length > OUTPUT_LIMIT) {
      cut = true;
      return;
    }
    out[i] += decoder[i].decode(bytes, { stream: true });
  });
  return { stdout: out[0], stderr: out[1], code, cut };
}

/** The options of `settings` as lz's arguments. */
export function options({ zero = "ones", rules = false, limit = DEFAULT_LIMIT } = {}) {
  const args = ["--zero", zero === "plus" ? "plus" : "ones", "--limit", String(limit)];
  if (rules) args.push("--temporary-rules");
  return args;
}

/**
 * Reads `file:line:col: severity: message` lines (from --check, or from a
 * translation that failed) into problems.
 */
export function problems(text) {
  const found = [];
  for (const raw of text.split("\n")) {
    const m = /^.*?:(\d+):(\d+): (error|warning|hint): (.*)$/.exec(raw);
    if (m) found.push({ line: Number(m[1]), column: Number(m[2]), severity: m[3], message: m[4] });
  }
  return found;
}

/** Reads --stats: "label   value  (note)" lines. */
export function stats(text) {
  const rows = [];
  for (const raw of text.split("\n")) {
    const m = /^([a-z][a-z -]*?[a-z])\s{2,}(\d+)\s*(.*)$/.exec(raw);
    if (m) rows.push({ label: m[1], value: Number(m[2]), note: m[3].replace(/^\(|\)$/g, "") });
  }
  return rows;
}

/**
 * Feeds the tape: translates it and, if it translates, runs it.
 *
 * @returns {{
 *   translated: boolean,         false if the tape did not translate
 *   problems: object[],          what stopped translation (when it did not)
 *   page: string,                what the delayed printer typed
 *   alarm: string | null,        why the run stopped with an alarm, in words
 *   limit: boolean,              the run was cut off by the limit
 *   stats: object[],             what the run cost
 *   code: number,
 * }}
 */
export function feed(module, tape, settings = {}) {
  const r = lz(module, tape, [...options(settings), "--stats"]);
  const found = problems(r.stderr);
  const translated = !(r.code !== 0 && found.length && r.stdout === "");
  const alarm = /^lz: alarm: (.*)$/m.exec(r.stderr);
  return {
    translated,
    problems: translated ? [] : found,
    page: r.stdout,
    alarm: alarm ? alarm[1] : null,
    limit: /^lz: stopped after/m.test(r.stderr),
    stats: stats(r.stderr),
    code: r.code,
  };
}

/** `lz --translate`: each equation's number and its block of orders. */
export function translation(module, tape, settings = {}) {
  const r = lz(module, tape, [...options(settings), "--translate"]);
  return r.code === 0 ? { text: r.stdout, problems: [] } : { text: "", problems: problems(r.stderr) };
}

/** `lz --check`: problems and warnings, without running. */
export function check(module, tape, settings = {}) {
  return problems(lz(module, tape, [...options(settings), "--check"]).stdout);
}

/**
 * `lz --trace`: each equation as it is carried out. Long runs are cut at
 * `lines` lines.
 */
export function trace(module, tape, settings = {}, lines = 4000) {
  const limit = Math.min(settings.limit ?? DEFAULT_LIMIT, lines * 4);
  const r = lz(module, tape, [...options({ ...settings, limit }), "--trace"]);
  const all = r.stderr.split("\n").filter((l) => l && !l.startsWith("lz: "));
  const notes = r.stderr.split("\n").filter((l) => l.startsWith("lz: "));
  return { lines: all.slice(0, lines), cut: all.length > lines || r.cut || notes.some((n) => n.includes("stopped after")), notes };
}

/**
 * The same tape with each model of zero: what one's complement (n - n is -0)
 * and an always-positive zero make of it, and which lines of the page differ.
 */
export function compareZeros(module, tape, settings = {}) {
  const ones = feed(module, tape, { ...settings, zero: "ones" });
  const plus = feed(module, tape, { ...settings, zero: "plus" });
  const a = ones.page.split("\n");
  const b = plus.page.split("\n");
  const differ = [];
  for (let i = 0; i < Math.max(a.length, b.length); i++) if (a[i] !== b[i]) differ.push(i);
  return { ones, plus, differ };
}
