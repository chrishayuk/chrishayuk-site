// The language server for the 1945 ACE tables in a web page, off the main thread.
//
// Receives {id, wasmUrl, text, requests: [{method, params}]}.
// Posts    {id, diagnostics, results} or {id, error}.

import { ask } from "./lsp.js";

let compiled;

self.onmessage = async (event) => {
  const { id, wasmUrl, text, requests } = event.data;
  try {
    compiled ??= await WebAssembly.compileStreaming(fetch(wasmUrl));
    self.postMessage({ id, ...ask(compiled, text, requests) });
  } catch (error) {
    self.postMessage({ id, error: String(error.message || error) });
  }
};
