// Runs lz off the main thread, so that a long run does not freeze the page
// and can be abandoned (by terminating this worker).
//
// Messages in:  { id, wasmUrl, job, tape, settings }
//               job is "feed", "translation", "check", "trace" or "compare"
// Messages out: { id, result } or { id, error }

import { check, compareZeros, feed, trace, translation } from "./tape.js";

const jobs = { feed, translation, check, trace, compare: compareZeros };
let module = null;

self.onmessage = async (event) => {
  const { id, wasmUrl, job, tape, settings } = event.data;
  try {
    module ??= await WebAssembly.compileStreaming(fetch(wasmUrl));
    self.postMessage({ id, result: jobs[job](module, tape, settings) });
  } catch (error) {
    self.postMessage({ id, error: String(error && error.message ? error.message : error) });
  }
};
