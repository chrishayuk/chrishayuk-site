// Compiles and runs one tape off the main thread, so that a program that
// never ends can be stopped by terminating the worker.
//
// Receives { wasmUrl, tape, compiler }. Posts { code, out, err } or
// { error }.

import { runAa } from "./wasi.js";

let module = null;

self.onmessage = async (event) => {
  const { wasmUrl, tape, compiler } = event.data;
  try {
    module ??= await WebAssembly.compileStreaming(fetch(wasmUrl));
    self.postMessage(runAa(module, tape, compiler, false));
  } catch (error) {
    const deep = error instanceof RangeError;
    self.postMessage({ error: deep ? "stopped: the routines call each other too deeply for the browser" : String(error.message || error) });
  }
};
