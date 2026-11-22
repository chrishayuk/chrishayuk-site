// Runs programs off the main thread, so that a long-running one does not
// freeze the page and can be stopped (by terminating this worker).
//
// Messages in:  { module }            the compiled chuk-basic.wasm, once
//               { id, request }       a request for runProgram
// Messages out: { id, result } or { id, error }

import { runProgram } from "./session.js";

let module = null;

self.onmessage = (event) => {
  const { id, request } = event.data;
  if (event.data.module) {
    module = event.data.module;
    return;
  }
  try {
    self.postMessage({ id, result: runProgram(module, request) });
  } catch (error) {
    self.postMessage({ id, error: String(error && error.message ? error.message : error) });
  }
};
