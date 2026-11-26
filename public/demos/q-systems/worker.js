// Runs qsys off the main thread.
//
// Messages in:  { id, wasmUrl, args, text }   args: e.g. ["json", "--data", DATA, "-"]
// Messages out: { id, out, err, code } or { id, error }

import { run } from "./wasi.js";

let module = null;
const decoder = new TextDecoder();

export function qsys(compiled, args, text = "") {
  const out = [];
  const err = [];
  const code = run(compiled, args, new TextEncoder().encode(text), (fd, bytes) => (fd === 1 ? out : err).push(decoder.decode(bytes, { stream: true })));
  return { out: out.join(""), err: err.join(""), code };
}

if (typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope) {
  self.onmessage = async (event) => {
    const { id, wasmUrl, args, text } = event.data;
    try {
      module ??= await WebAssembly.compileStreaming(fetch(wasmUrl));
      self.postMessage({ id, ...qsys(module, args, text) });
    } catch (error) {
      self.postMessage({ id, error: String(error && error.message ? error.message : error) });
    }
  };
}
