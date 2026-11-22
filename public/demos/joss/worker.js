// Replays sittings off the main thread, so that a long one does not freeze
// the page and can be abandoned (by terminating this worker).
//
// Messages in:  { id, wasmUrl, sitting }   a sitting for replay() in session.js
//               { id, wasmUrl, verify }    the text of a transcript of an
//                                          original session, to replay and
//                                          compare with the page
// Messages out: { id, result } or { id, error }

import { replay, verify } from "./session.js";

let module = null;

self.onmessage = async (event) => {
  const { id, wasmUrl, sitting, verify: transcript } = event.data;
  try {
    module ??= await WebAssembly.compileStreaming(fetch(wasmUrl));
    self.postMessage({ id, result: transcript === undefined ? replay(module, sitting) : verify(module, transcript) });
  } catch (error) {
    self.postMessage({ id, error: String(error && error.message ? error.message : error) });
  }
};
