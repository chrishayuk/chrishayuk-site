// Runs george off the main thread, so that a program which never ends can
// be stopped by terminating the worker.
//
// Receives {wasmUrl, program, data, keys, singleShot, modes}. For each mode
// in turn ("run", "cards", "trace") posts {type: "result", mode, code, out,
// err}; then {type: "done"}, or {type: "error", message}.

import { invocation } from "./george.js";
import { run } from "./wasi.js";

const OUTPUT_LIMIT = 4_000_000; // characters; a trace of a long run is large

self.onmessage = async (event) => {
  const { wasmUrl, modes, ...what } = event.data;
  try {
    const module = await WebAssembly.compileStreaming(fetch(wasmUrl));
    for (const mode of modes) {
      const { args, files } = invocation({ ...what, mode });
      const decoders = { 1: new TextDecoder(), 2: new TextDecoder() };
      const text = { 1: "", 2: "" };
      let size = 0;
      const code = run(module, args, new Uint8Array(0), (fd, bytes) => {
        const piece = decoders[fd].decode(bytes, { stream: true });
        text[fd] += piece;
        size += piece.length;
        if (size > OUTPUT_LIMIT) throw new Error("stopped: the program punched more than the page will show");
      }, files);
      self.postMessage({ type: "result", mode, code, out: text[1], err: text[2] });
    }
    self.postMessage({ type: "done" });
  } catch (error) {
    self.postMessage({ type: "error", message: String(error.message || error) });
  }
};
