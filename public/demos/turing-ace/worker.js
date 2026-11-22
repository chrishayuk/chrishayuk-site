// Runs one ace command off the main thread, so that a job which never ends
// can be stopped by terminating the worker.
//
// Receives {wasmUrl, args, program, input, limit}. `args` are the
// command-line arguments, with `-` where the file name goes. Posts
// {type: "out", fd, text} as output arrives, then {type: "done", code} or
// {type: "error", message}. `limit` is how many characters of output to
// pass on before stopping; the JSON of a long run is large.

import { run, stdinFor } from "./wasi.js";

/** Compiles ace.wasm, from its bytes if the server does not call it application/wasm. */
async function compile(url) {
  const response = await fetch(url);
  try {
    return await WebAssembly.compileStreaming(response.clone());
  } catch {
    return WebAssembly.compile(await response.arrayBuffer());
  }
}

const FLUSH_MS = 50;

self.onmessage = async (event) => {
  const { wasmUrl, args, program, input, limit = 400_000 } = event.data;
  try {
    const module = await compile(wasmUrl);
    const decoders = { 1: new TextDecoder(), 2: new TextDecoder() };
    const pending = { 1: "", 2: "" };
    let sent = 0;
    let last = Date.now();

    const flush = () => {
      for (const fd of [1, 2]) {
        if (pending[fd]) self.postMessage({ type: "out", fd, text: pending[fd] });
        pending[fd] = "";
      }
      last = Date.now();
    };

    const code = run(module, stdinFor(program || "", input || ""), (fd, bytes) => {
      const text = decoders[fd].decode(bytes, { stream: true });
      pending[fd] += text;
      sent += text.length;
      if (sent > limit) {
        flush();
        throw new Error("stopped: the job printed more than the page will show");
      }
      if (Date.now() - last > FLUSH_MS) flush();
    }, args);
    flush();
    self.postMessage({ type: "done", code });
  } catch (error) {
    self.postMessage({ type: "error", message: String(error.message || error) });
  }
};
