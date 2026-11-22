// Runs one Mouse program off the main thread, so that a program which never
// ends can be stopped by terminating the worker.
//
// Receives {wasmUrl, program, input}. Posts {type: "out", fd, text} as output
// arrives, then {type: "done", code} or {type: "error", message}.

import { run, stdinFor } from "./wasi.js";

const OUTPUT_LIMIT = 200_000; // characters; an endless loop prints for ever
const FLUSH_MS = 50;

self.onmessage = async (event) => {
  const { wasmUrl, program, input } = event.data;
  try {
    const module = await WebAssembly.compileStreaming(fetch(wasmUrl));
    const decoders = { 1: new TextDecoder(), 2: new TextDecoder() };
    let pending = { 1: "", 2: "" };
    let sent = 0;
    let last = Date.now();

    const flush = () => {
      for (const fd of [1, 2]) {
        if (pending[fd]) self.postMessage({ type: "out", fd, text: pending[fd] });
        pending[fd] = "";
      }
      last = Date.now();
    };

    const code = run(module, stdinFor(program, input), (fd, bytes) => {
      const text = decoders[fd].decode(bytes, { stream: true });
      pending[fd] += text;
      sent += text.length;
      if (sent > OUTPUT_LIMIT) {
        flush();
        throw new Error("stopped: the program printed more than the page will show");
      }
      if (Date.now() - last > FLUSH_MS) flush();
    });
    flush();
    self.postMessage({ type: "done", code });
  } catch (error) {
    self.postMessage({ type: "error", message: String(error.message || error) });
  }
};
