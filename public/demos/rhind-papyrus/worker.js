// Runs rhind off the main thread.
//
// Messages in:  { id, wasmUrl, args, text }   args: e.g. ["json", "-"] or ["multiply", "3", "'2", "by", "5"]
// Messages out: { id, out, err, code } or { id, error }

import { run } from "./wasi.js";

let module = null;
const decoder = new TextDecoder();

export function rhind(compiled, args, text = "") {
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
      self.postMessage({ id, ...rhind(module, args, text) });
    } catch (error) {
      self.postMessage({ id, error: String(error && error.message ? error.message : error) });
    }
  };
}
