// Running a BASIC program, and the "re-run from the start" session that lets
// a program ask for input without blocking the browser.
//
// Shared by the page (app.js, worker.js) and by test.mjs. No DOM.

import { runWasi } from "./wasi.js";

/** Operations before the interpreter gives up on a program. */
export const DEFAULT_MAX_STEPS = 20_000_000;
/** Bytes of output before the host gives up on a program. */
export const DEFAULT_OUTPUT_LIMIT = 2 * 1024 * 1024;

const PROGRAM_PATH = "/program.bas";
const STEP_LIMIT_MESSAGE = "Step limit exceeded";

/** A seed for a new session. */
export function randomSeed() {
  return Math.floor(Math.random() * 0x7fffffff) + 1;
}

/**
 * Run a program once, from the start, with the input typed so far.
 *
 * @param {WebAssembly.Module} module  chuk-basic.wasm, compiled
 * @param {object} request
 * @param {string} request.source      the BASIC program
 * @param {string[]} [request.inputs]  lines typed so far
 * @param {number} request.seed        seed for RND
 * @param {number} [request.maxSteps]
 * @param {number} [request.outputLimit]
 * @param {string} [request.dialect]   "microsoft" (default) or "dartmouth"
 * @returns {{
 *   status: "done" | "waiting" | "error" | "step-limit" | "output-limit" | "crash",
 *   segments: { type: "out" | "in", text: string }[],
 *   message: string,      // the interpreter's error message, or ""
 *   exitCode: number | null,
 *   linesRead: number,
 * }}
 */
export function runProgram(module, request) {
  const {
    source,
    inputs = [],
    seed,
    maxSteps = DEFAULT_MAX_STEPS,
    outputLimit = DEFAULT_OUTPUT_LIMIT,
    dialect = "microsoft",
  } = request;
  const run = runWasi(module, {
    args: ["chuk-basic", "--seed", String(seed), "--max-steps", String(maxSteps), "--dialect", dialect, PROGRAM_PATH],
    files: { [PROGRAM_PATH]: source },
    stdin: inputs,
    outputLimit,
  });

  const message = run.stderr.trim();
  let status;
  if (run.exit === "need-input") status = "waiting";
  else if (run.exit === "output-limit") status = "output-limit";
  else if (run.exit === "trap") status = "crash";
  else if (run.exitCode === 0) status = "done";
  else if (message.includes(STEP_LIMIT_MESSAGE)) status = "step-limit";
  else status = "error";

  return {
    status,
    segments: run.segments,
    message: status === "crash" ? run.trap : message,
    exitCode: run.exitCode,
    linesRead: run.linesRead,
  };
}

/** A runner that runs in this thread. */
export function localRunner(module) {
  return (request) => runProgram(module, request);
}

/** The transcript as plain text: what a terminal would show. */
export function transcriptText(result) {
  return result.segments.map((segment) => segment.text).join("");
}

/**
 * One sitting at a program.
 *
 * The program cannot be paused while it waits for a line, so it is not: each
 * time a line is typed the program is run again from the start with all the
 * lines so far. The seed is fixed for the session, so every run repeats the
 * one before it exactly and then gets one INPUT further.
 *
 * `runner` takes a request for `runProgram` and returns its result, or a
 * promise of it (the page runs it in a worker).
 */
export class Session {
  constructor(runner, { source, seed = randomSeed(), maxSteps, outputLimit, dialect }) {
    this.runner = runner;
    this.source = source;
    this.seed = seed;
    this.maxSteps = maxSteps;
    this.outputLimit = outputLimit;
    this.dialect = dialect;
    /** Lines typed so far. */
    this.inputs = [];
    /** The result of the latest run. */
    this.result = null;
    /** How many times the program has been run. */
    this.runs = 0;
    this.busy = false;
  }

  /** True when the program is waiting for a line. */
  get waiting() {
    return !this.busy && this.result !== null && this.result.status === "waiting";
  }

  /** True when the program has stopped, for whatever reason. */
  get ended() {
    return !this.busy && this.result !== null && this.result.status !== "waiting";
  }

  /** Run the program for the first time. */
  start() {
    if (this.runs > 0) throw new Error("The session has already started");
    return this.#run();
  }

  /** Give the waiting program a line, and run it again. */
  submit(line) {
    if (!this.waiting) throw new Error("The program is not waiting for input");
    this.inputs.push(String(line).replace(/[\r\n]+/g, " "));
    return this.#run();
  }

  async #run() {
    this.busy = true;
    this.runs += 1;
    try {
      this.result = await this.runner({
        source: this.source,
        inputs: this.inputs.slice(),
        seed: this.seed,
        maxSteps: this.maxSteps,
        outputLimit: this.outputLimit,
        dialect: this.dialect,
      });
    } finally {
      this.busy = false;
    }
    return this.result;
  }
}
