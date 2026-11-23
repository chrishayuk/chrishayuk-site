/**
 * Running `algol60` in the page, as the Revised Report defines ALGOL 60 and
 * as the Electrologica X1 system of 1960 ran it (`--x1`).
 *
 * public/demos/algol-60/ holds algol60.wasm (the Rust interpreter from
 * github.com/chrishayuk/algol-60, compiled for WASI), wasi.js, worker.js and
 * examples.json, copied from that repository's web/ folder: rebuild them
 * there with `node web/build.mjs` and copy them across, rather than editing
 * them here.
 *
 * Each run happens in a worker, so a program that never ends can be stopped.
 * A browser's workers have a smaller stack than its page (Chrome's runs
 * Knuth's man or boy test to k = 9 in a worker and k = 10 on the page), so a
 * program a worker finds too deep is run again on the page, with a limit on
 * its steps so that it cannot hang it.
 */

export const FILES = "/demos/algol-60";
export type Mode = "report" | "x1";
export const MODES: Mode[] = ["report", "x1"];

/** A program from the repository's examples/ (and historical/jaz164, with
 * what the X1 printed for it in 1964). */
export type Example = { name: string; program: string; input: string; printed1964?: string };

/** One run: the X1's warnings, the lines printed, and the error it stopped with. */
export type Run = { warnings: string[]; lines: string[]; error: string };

const TOO_DEEP = "nested too deeply for the browser";
type WorkerMessage = { type: "out"; fd: number; text: string } | { type: "done"; code: number } | { type: "error"; message: string };
type WasiModule = { runOnPage: (wasmUrl: string, program: string, input: string, mode: Mode) => Promise<{ out: string; err: string }> };

const wasmUrl = () => new URL(`${FILES}/algol60.wasm`, window.location.href).href;

/** What a run printed on standard output and standard error, sorted. */
export function transcript(out: string, err: string): Run {
  const said = err.split("\n").map(line => line.replace(/^-e: /, "").trim()).filter(Boolean);
  const lines = out.split("\n");
  if (lines.at(-1) === "") lines.pop();
  return { warnings: said.filter(line => line.startsWith("warning:")), lines, error: said.filter(line => !line.startsWith("warning:")).join("\n") };
}

function inWorker(program: string, input: string, mode: Mode, started: (worker: Worker) => void): Promise<{ out: string; err: string }> {
  return new Promise(resolve => {
    const worker = new Worker(`${FILES}/worker.js`, { type: "module" });
    started(worker);
    let out = "";
    let err = "";
    worker.onmessage = (event: MessageEvent<WorkerMessage>) => {
      const message = event.data;
      if (message.type === "out") { if (message.fd === 2) err += message.text; else out += message.text; }
      else if (message.type === "error") { worker.terminate(); resolve({ out, err: `${err}\n${message.message}` }); }
      else { worker.terminate(); resolve({ out, err }); }
    };
    worker.onerror = event => { worker.terminate(); resolve({ out, err: `${err}\n${event.message || "the worker failed"}` }); };
    worker.postMessage({ wasmUrl: wasmUrl(), program, input, mode });
  });
}

/** Runs a program one way: in a worker, or on the page if it is too deep for one. */
export async function run(program: string, input: string, mode: Mode, started: (worker: Worker) => void = () => {}): Promise<Run> {
  const first = await inWorker(program, input, mode, started);
  if (!first.err.includes(TOO_DEEP)) return transcript(first.out, first.err);
  const wasi = await import(/* webpackIgnore: true */ /* @vite-ignore */ `${FILES}/wasi.js`) as WasiModule;
  const again = await wasi.runOnPage(wasmUrl(), program, input, mode);
  return transcript(again.out, again.err);
}

/** Runs a program both ways at once. */
export async function runBoth(program: string, input: string, started?: (worker: Worker) => void): Promise<Record<Mode, Run>> {
  const [report, x1] = await Promise.all(MODES.map(mode => run(program, input, mode, started)));
  return { report, x1 };
}

let examples: Promise<Example[]> | null = null;
export function loadExamples(): Promise<Example[]> {
  examples ??= fetch(`${FILES}/examples.json`).then(response => response.json() as Promise<Example[]>);
  return examples;
}
