/**
 * Running `rhind`, the Rhind Mathematical Papyrus reconstruction, in a worker.
 *
 * public/demos/rhind-papyrus/ holds rhind.wasm (the Rust program `rhind`,
 * compiled unchanged for WASI), wasi.js, worker.js, lsp-worker.js,
 * papyrus.json and examples.json, copied from
 * github.com/chrishayuk/rhind-papyrus's web/ folder: rebuild them there with
 * `node web/build.mjs` and copy them across, rather than editing them here.
 *
 * One wasm does everything: `rhind json -` checks a page read from standard
 * input, `rhind multiply 3 '2 by 5` and `rhind reckon with 6 to find 21`
 * print the working, and `rhind lsp` is the language server.
 */

export const FILES = "/demos/rhind-papyrus";

/** A line of a page, as `rhind json -` gives it. `{…}` in the text is red ink. */
export type Line = { text: string; note: string; kind: string; mark: "right" | "wrong" | "unchecked" | ""; expected: string; left: string; right: string; red: boolean; how: string };
export type Slip = { model: string; explanation: string };
export type Finding = { line: number; severity: string; message: string; carried: boolean | null; slips: Slip[] };
/** Rows rhind wrote itself, for a Multiply or Reckon with no working under it. */
export type Written = { after: number; rows: string[] };
export type Checked = { lines: Line[]; written: Written[]; findings: Finding[]; checked: number; right: number };
/** A page of the papyrus as transcribed: Problem 27 is `no-27`. */
export type Page = { name: string; label: string; text: string; about: string; words: string };
export type Example = { name: string; text: string; about: string };
type Ran = { out: string; err: string; code: number };

let worker: Worker | null = null;
let nextId = 0;
const waiting = new Map<number, { resolve: (ran: Ran) => void; reject: (error: Error) => void }>();

/** Runs `rhind` with these arguments and this standard input. */
export function rhind(args: string[], text = "", timeout = 20_000): Promise<Ran> {
  if (!worker) {
    worker = new Worker(`${FILES}/worker.js`, { type: "module" });
    worker.onmessage = (event: MessageEvent<{ id: number; error?: string } & Partial<Ran>>) => {
      const { id, error, out = "", err = "", code = 0 } = event.data;
      const job = waiting.get(id);
      waiting.delete(id);
      if (error) job?.reject(new Error(error));
      else job?.resolve({ out, err, code });
    };
    worker.onerror = event => {
      for (const job of waiting.values()) job.reject(new Error(event.message || "the worker failed"));
      waiting.clear();
      worker?.terminate();
      worker = null;
    };
  }
  const id = ++nextId;
  const running = worker;
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      waiting.delete(id);
      // A run that does not end: start again with a fresh worker.
      running.terminate();
      if (worker === running) worker = null;
      reject(new Error("abandoned: rhind took more than twenty seconds"));
    }, timeout);
    waiting.set(id, { resolve: ran => { clearTimeout(timer); resolve(ran); }, reject: error => { clearTimeout(timer); reject(error); } });
    running.postMessage({ id, wasmUrl: new URL(`${FILES}/rhind.wasm`, window.location.href).href, args, text });
  });
}

/** A page, with every figure the scribe wrote checked. */
export async function check(text: string): Promise<Checked> {
  const ran = await rhind(["json", "-"], text);
  if (!ran.out.trim()) throw new Error(ran.err.trim() || "rhind gave no answer");
  return JSON.parse(ran.out) as Checked;
}

/** `multiply A by B` or `reckon with A to find B`, worked the scribe's way. */
export async function work(question: string): Promise<{ lines: string[]; failed: boolean }> {
  const words = question.trim().split(/\s+/).filter(Boolean);
  const ran = await rhind(words);
  const text = (ran.out || ran.err).trimEnd();
  return { lines: text ? text.split("\n") : [], failed: ran.code !== 0 && !ran.out };
}

let papyrus: Promise<Page[]> | null = null;
/** Every page of the papyrus as transcribed: the tables, then the problems. */
export function loadPapyrus(): Promise<Page[]> {
  papyrus ??= fetch(`${FILES}/papyrus.json`).then(response => response.json() as Promise<Page[]>);
  return papyrus;
}

let examples: Promise<Example[]> | null = null;
/** The repository's examples/ folder: short pages written to show one thing. */
export function loadExamples(): Promise<Example[]> {
  examples ??= fetch(`${FILES}/examples.json`).then(response => response.json() as Promise<Example[]>);
  return examples;
}
