/**
 * Running `george`, the GEORGE reconstruction, in a worker.
 *
 * public/demos/george/ holds george.wasm (the Rust program `george`, compiled
 * unchanged for WASI), george-lsp.wasm (its language server), wasi.js,
 * worker.js, lsp-worker.js, george.js and examples.json, copied unedited from
 * the george repository's web/ folder: rebuild them there with
 * `node web/build.mjs` and copy them across, rather than editing them here.
 *
 * The page runs exactly the command line of that repository's README, so
 * what follows is a typed copy of the readers in web/george.js: the arguments
 * are built by the worker, and the output is read here.
 */

export const FILES = "/demos/george";
/** A trace keeps every accumulator, so george is told to stop it sooner than a run. */
export const TRACE_LIMIT = 100_000;
/** The running accumulator: "The accumulator is limited to 12 cells." */
export const CELLS = 12;

export type Example = { name: string; about: string; program: string; data: string };
export type Mode = "run" | "cards" | "trace" | "deck" | "format" | "table";
export type Result = { mode: Mode; code: number; out: string; err: string };
export type Results = Partial<Record<Mode, Result>> & { error?: string };
export type Step = { at: number; symbol: string; cells: string[] };
export type Stop = { indication: string; cause: string; at: number | null; symbol: string | null; line: number | null; column: number | null; resumed: string | null; text: string };
export type Problem = { line?: number; column?: number; message: string; text: string };
export type Report = { stop: Stop | null; resumed: Stop[]; lights: string[]; limit: number | null; problem: Problem | null };

type Message = { type: "result"; mode: Mode; code: number; out: string; err: string } | { type: "done" } | { type: "error"; message: string };

/** One run of george in a fresh worker, in each of `modes`. `stop()` ends it. */
export function runGeorge(what: { program: string; data?: string; keys?: string; singleShot?: boolean; limit?: number }, modes: Mode[]) {
  const worker = new Worker(`${FILES}/worker.js`, { type: "module" });
  let settle: (results: Results) => void = () => {};
  const results: Results = {};
  const done = new Promise<Results>(resolve => { settle = resolve; });
  worker.onmessage = (event: MessageEvent<Message>) => {
    const message = event.data;
    if (message.type === "result") results[message.mode] = message;
    else { worker.terminate(); settle(message.type === "error" ? { ...results, error: message.message } : results); }
  };
  worker.onerror = event => { worker.terminate(); settle({ ...results, error: event.message || "the worker failed" }); };
  worker.postMessage({ wasmUrl: new URL(`${FILES}/george.wasm`, window.location.href).href, modes, ...what });
  return { done, stop: () => { worker.terminate(); settle({ ...results, error: "stopped" }); } };
}

/** The punched numbers, one to a line, from standard output. */
export const punched = (stdout: string) => stdout.split("\n").filter(line => line !== "");

/** The trace george prints on standard error with --trace: the symbol's index, the symbol, and the accumulator after it, cell 1 first. */
export function readTrace(stderr: string): Step[] {
  const steps: Step[] = [];
  for (const line of stderr.split("\n")) {
    const found = /^ *(\d+)  (\S+)(?: +(.*))?$/.exec(line);
    if (found) steps.push({ at: Number(found[1]), symbol: found[2], cells: (found[3] ?? "").trim().split(/\s+/).filter(Boolean) });
  }
  return steps;
}

/** Everything else george says on standard error: the stop it ended on, stops a single shot got past, what wait showed, a limit reached, or a mistake in the program. */
export function report(stderr: string, code: number): Report {
  const lines = stderr.split("\n");
  const stops: Stop[] = [];
  const lights: string[] = [];
  let limit: number | null = null;
  let problem: Problem | null = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let found: RegExpExecArray | null;
    if ((found = /^stop (.+?): (.*)$/.exec(line))) {
      let text = line;
      const stop: Stop = { indication: found[1], cause: found[2], at: null, symbol: null, line: null, column: null, resumed: null, text };
      const where = /^ {2}at symbol (\d+) "(.*)", line (\d+), column (\d+)/.exec(lines[i + 1] ?? "");
      if (where) {
        Object.assign(stop, { at: Number(where[1]), symbol: where[2], line: Number(where[3]), column: Number(where[4]) });
        text += "\n" + lines[++i];
      }
      const resumed = /\(single shot: (.*)\)$/.exec(text);
      if (resumed) { stop.resumed = resumed[1]; stop.cause = stop.cause.replace(/ \(single shot: .*\)$/, ""); }
      stop.text = text;
      stops.push(stop);
    } else if ((found = /^wait: the output lights show (.*)$/.exec(line))) lights.push(found[1]);
    else if ((found = /^george: gave up after (\d+) symbols obeyed/.exec(line))) limit = Number(found[1]);
    else if ((found = /^george: (.*)$/.exec(line))) {
      const message = found[1].replace("/program.george: ", "").replace("/program.in: ", "data: ");
      const at = /^line (\d+), column (\d+): (.*)$/.exec(message);
      problem = at ? { line: Number(at[1]), column: Number(at[2]), message: at[3], text: message } : { message, text: message };
    }
  }
  const stop = code === 1 ? stops.filter(s => !s.resumed).at(-1) ?? null : null;
  return { stop, resumed: stops.filter(s => s.resumed), lights, limit, problem };
}

/** The twenty columns of a punched card, as `george run --cards` prints them. */
export const cardColumns = (card: string) => card.padEnd(20).slice(0, 20);

/** How many numbers a punching symbol punched, given the accumulator before it. */
export function punchCount(symbol: string, before: string[]) {
  const last = (k: number) => Math.floor(Number(before[before.length - k]));
  if (symbol === "(P)") return 1;
  if (symbol === "P|" && before.length >= 2) return Math.max(0, last(1) - last(2) + 1);
  if (symbol === "P||" && before.length >= 4) return Math.max(0, last(3) - last(4) + 1) * Math.max(0, last(1) - last(2) + 1);
  return 0;
}

/** Which numbers each step of a trace punched. */
export function punchesOf(steps: Step[], numbers: string[]) {
  let next = 0;
  return steps.map((step, k) => {
    const n = punchCount(step.symbol, k ? steps[k - 1].cells : []);
    const these = numbers.slice(next, next + n);
    next += n;
    return these;
  });
}

/** The first cell a step changed. */
export function changedFrom(before: string[], after: string[]) {
  let i = 0;
  while (i < before.length && i < after.length && before[i] === after[i]) i++;
  return i;
}

/** A numeral is one symbol per digit, but a step obeys the whole of it. */
export const isNumeral = (step: Step) => /^[0-9.]+$/.test(step.symbol);
