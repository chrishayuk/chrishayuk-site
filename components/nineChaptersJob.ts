/**
 * Running `jiuzhang`, the reconstruction of chapter 8 of the Nine Chapters
 * on the Mathematical Art (九章算術, 方程), in a worker.
 *
 * public/demos/nine-chapters/ holds jiuzhang.wasm (the Rust program
 * `jiuzhang`, compiled unchanged for WASI), wasi.js, worker.js,
 * lsp-worker.js and corpus.json, copied from the nine-chapters
 * repository's web/ folder: rebuild them there with `node web/build.mjs`
 * and copy them across, rather than editing them here.
 *
 * One wasm does everything: `jiuzhang json -` runs and checks a page read
 * from standard input, and `jiuzhang lsp` is the language server.
 */

export const FILES = "/demos/nine-chapters";

/** The board after a step: the positions (things), and each column top to bottom, right to left. A column not yet set is null. */
export type Board = { things: string[]; cols: (number[] | null)[]; names: string[]; rods: number };
/** One operation on the board. `actor` is the column taken or multiplied by, `target` the column worked. */
export type Step = { what: string; target: number | null; actor: number | null; count: { plain: number; worked: number }; board: Board };
export type Mark = { kind: "right" | "wrong" | "info" | string; text: string };
/** A line of a page, as `jiuzhang json -` gives it: its kind (op, words, note, heading, blank), the source's words it transcribes, what was checked, and the steps it took. */
export type Line = { text: string; kind: string; quote: string | null; marks: Mark[]; steps: Step[] };
export type Finding = { line: number; severity: string; message: string };
export type Run = { title: string; lines: Line[]; findings: Finding[]; right: number; wrong: number; stopped: number | null; peakRods: number; widest: number };
/** A page of the transcription: Problem 2 is `no-02`, Liu Hui's 77 is `liu-hui-18-old`. */
export type Page = { name: string; title: string; words: string; text: string };
type Ran = { out: string; err: string; code: number };

let worker: Worker | null = null;
let nextId = 0;
const waiting = new Map<number, { resolve: (ran: Ran) => void; reject: (error: Error) => void }>();

/** Runs `jiuzhang` with these arguments and this standard input. */
export function jiuzhang(args: string[], text = "", timeout = 20_000): Promise<Ran> {
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
      reject(new Error("abandoned: jiuzhang took more than twenty seconds"));
    }, timeout);
    waiting.set(id, { resolve: ran => { clearTimeout(timer); resolve(ran); }, reject: error => { clearTimeout(timer); reject(error); } });
    running.postMessage({ id, wasmUrl: new URL(`${FILES}/jiuzhang.wasm`, window.location.href).href, args, text });
  });
}

/** A page, worked on the board a line at a time, with every figure the source states checked. */
export async function check(text: string): Promise<Run> {
  const ran = await jiuzhang(["json", "-"], text);
  if (!ran.out.trim()) throw new Error(ran.err.trim() || "jiuzhang gave no answer");
  return JSON.parse(ran.out) as Run;
}

/** Every step of a run, with the line it came from. */
export function stepsOf(run: Run): (Step & { line: number })[] {
  return run.lines.flatMap((line, i) => line.steps.map(step => ({ ...step, line: i })));
}

/** The first step to show: the board once every column is set. */
export function firstStep(steps: Step[]): number {
  let start = 0;
  while (start + 1 < steps.length && steps[start + 1].what.startsWith("set ")) start++;
  return start;
}

/** Places per column over every board of a run, so the layout holds still. */
export function widthsOf(boards: Board[]): number[] {
  const places = (v: number) => Math.max(1, String(Math.abs(v)).length);
  const w: number[] = [];
  for (const b of boards) b.cols.forEach((c, i) => { if (c) w[i] = Math.max(w[i] || 1, ...c.map(places)); });
  const n = Math.max(0, ...boards.map(b => b.cols.length));
  for (let i = 0; i < n; i++) w[i] ??= 1;
  return w;
}

/** The board as text, columns right to left, as web/index.html draws it without WebGL. */
export function textBoard(b: Board): string {
  const shown = b.cols.map((c, i) => [c, i] as const).filter((pair): pair is readonly [number[], number] => !!pair[0]).reverse();
  const w = shown.map(([c, i]) => Math.max(b.names[i].length, ...c.map(x => String(x).length)));
  const lw = Math.max(...b.things.map(t => [...t].length * 2));
  const pad = (s: string, n: number) => " ".repeat(Math.max(0, n - s.length)) + s;
  let out = " ".repeat(lw) + shown.map(([, i], k) => "  " + pad(b.names[i], w[k])).join("") + "\n";
  b.things.forEach((t, p) => {
    out += t + " ".repeat(Math.max(0, lw - [...t].length * 2)) + shown.map(([c], k) => "  " + pad(c[p] ? String(c[p]) : "·", w[k])).join("") + "\n";
  });
  return out;
}

let corpus: Promise<Page[]> | null = null;
/** Every page of the transcription: the problems in order, each followed by its commentaries. */
export function loadCorpus(): Promise<Page[]> {
  corpus ??= fetch(`${FILES}/corpus.json`).then(response => response.json() as Promise<Page[]>);
  return corpus;
}
