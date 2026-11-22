/**
 * Feeding a tape to the Laning and Zierler system in a worker.
 *
 * public/demos/laning-zierler/ holds lz.wasm (the Rust program `lz`,
 * compiled unchanged for WASI), wasi.js, tape.js and worker.js, copied from
 * github.com/chrishayuk/laning-zierler's web/ folder: rebuild them there with
 * `node web/build.mjs` and copy them across, rather than editing them here.
 *
 * Each job gets a worker of its own, so a tape that runs for ever can be
 * abandoned by terminating it.
 */

export const FILES = "/demos/laning-zierler";

export type Settings = { zero?: "ones" | "plus"; rules?: boolean; limit?: number };
export type Problem = { line: number; column: number; severity: "error" | "warning" | "hint"; message: string };
export type Stat = { label: string; value: number; note: string };
export type Fed = { translated: boolean; problems: Problem[]; page: string; alarm: string | null; limit: boolean; stats: Stat[]; code: number };
export type Compared = { ones: Fed; plus: Fed; differ: number[] };
export type Traced = { lines: string[]; cut: boolean; notes: string[] };
export type Translated = { text: string; problems: Problem[] };
export type Example = { name: string; tape: string; out: string; about: string; settings: Settings };

type Jobs = { feed: Fed; compare: Compared; trace: Traced; translation: Translated; check: Problem[] };

/** Runs one job. `abandon` stops it; the promise then rejects. */
export function job<K extends keyof Jobs>(kind: K, tape: string, settings: Settings = {}, timeout = 20_000): { result: Promise<Jobs[K]>; abandon: () => void } {
  const worker = new Worker(`${FILES}/worker.js`, { type: "module" });
  let fail: (reason: Error) => void = () => {};
  const result = new Promise<Jobs[K]>((resolve, reject) => {
    fail = reject;
    const timer = setTimeout(() => { worker.terminate(); reject(new Error("abandoned: the run took more than twenty seconds")); }, timeout);
    worker.onmessage = (event: MessageEvent<{ result?: Jobs[K]; error?: string }>) => {
      clearTimeout(timer);
      worker.terminate();
      if (event.data.error) reject(new Error(event.data.error));
      else resolve(event.data.result as Jobs[K]);
    };
    worker.onerror = event => { clearTimeout(timer); worker.terminate(); reject(new Error(event.message || "the worker failed")); };
    worker.postMessage({ id: 1, wasmUrl: new URL(`${FILES}/lz.wasm`, window.location.href).href, job: kind, tape, settings });
  });
  return { result, abandon: () => { worker.terminate(); fail(new Error("stopped")); } };
}

let examples: Promise<Example[]> | null = null;
/** The tapes of the repository's examples/ folder, with the page each types. */
export function loadExamples(): Promise<Example[]> {
  examples ??= fetch(`${FILES}/examples.json`).then(response => response.json() as Promise<Example[]>);
  return examples;
}
