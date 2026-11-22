// The language server of the ACE notation in a web page, off the main thread.
//
// Receives {id, wasmUrl, text, requests: [{method, params}]}.
// Posts    {id, diagnostics, results} or {id, error}.

import { ask } from "./lsp.js";

/** Compiles ace.wasm, from its bytes if the server does not call it application/wasm. */
async function compile(url) {
  const response = await fetch(url);
  try {
    return await WebAssembly.compileStreaming(response.clone());
  } catch {
    return WebAssembly.compile(await response.arrayBuffer());
  }
}

let compiled;

self.onmessage = async (event) => {
  const { id, wasmUrl, text, requests } = event.data;
  try {
    compiled ??= await compile(wasmUrl);
    self.postMessage({ id, ...ask(compiled, text, requests) });
  } catch (error) {
    self.postMessage({ id, error: String(error.message || error) });
  }
};
