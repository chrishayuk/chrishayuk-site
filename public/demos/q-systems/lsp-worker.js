// The qsys language server in a web page.
//
// qsys.wasm, run as `qsys lsp`, is the same server an editor talks to over standard input
// and output. It reads messages until its input ends, so each question from
// the page is one short run: open this text, answer these requests, stop.
//
// Receives {id, wasmUrl, text, requests: [{method, params}]}.
// Posts    {id, diagnostics, results, capabilities} or {id, error}.

import { run } from "./wasi.js";

const URI = "file:///text.q";
const encoder = new TextEncoder();
const decoder = new TextDecoder();
let compiled;

function frame(message) {
  const body = encoder.encode(JSON.stringify({ jsonrpc: "2.0", ...message }));
  const head = encoder.encode(`Content-Length: ${body.length}\r\n\r\n`);
  const out = new Uint8Array(head.length + body.length);
  out.set(head);
  out.set(body, head.length);
  return out;
}

function join(chunks) {
  const out = new Uint8Array(chunks.reduce((n, c) => n + c.length, 0));
  let at = 0;
  for (const chunk of chunks) {
    out.set(chunk, at);
    at += chunk.length;
  }
  return out;
}

/** Splits the server's output back into messages. */
function unframe(bytes) {
  const messages = [];
  let at = 0;
  while (at < bytes.length) {
    let end = at;
    while (end + 3 < bytes.length && !(bytes[end] === 13 && bytes[end + 1] === 10 && bytes[end + 2] === 13 && bytes[end + 3] === 10)) end++;
    const length = Number(/Content-Length: (\d+)/i.exec(decoder.decode(bytes.subarray(at, end)))[1]);
    messages.push(JSON.parse(decoder.decode(bytes.subarray(end + 4, end + 4 + length))));
    at = end + 4 + length;
  }
  return messages;
}

/**
 * One run of the server: opens `text` and asks it the requests.
 *
 * @param {WebAssembly.Module} module  the compiled language server
 * @param {string} text                the program
 * @param {{method: string, params?: object}[]} requests
 * @param {string} [uri]               file:///text.q (a treatment) or file:///text.dat (its data)
 * @returns {{diagnostics: object[], results: any[], capabilities: object}}
 *          the problems it found, the answer to each request (null where it
 *          had none), and what the server said it can do (the editor reads
 *          the legend of its semantic tokens from it)
 */
export function answer(module, text, requests, uri = URI) {
  const input = join([
    frame({ id: 0, method: "initialize", params: { capabilities: {} } }),
    frame({ method: "textDocument/didOpen", params: { textDocument: { uri, languageId: "qsystems", version: 1, text } } }),
    ...requests.map((request, n) => frame({ id: n + 1, method: request.method, params: { textDocument: { uri }, ...request.params } })),
    frame({ id: requests.length + 1, method: "shutdown" }),
    frame({ method: "exit" }),
  ]);
  const output = [];
  run(module, ["lsp"], input, (fd, bytes) => {
    if (fd === 1) output.push(bytes);
  });
  let messages = [];
  try {
    messages = unframe(join(output));
  } catch {
    // a server that wrote something other than messages: no answers
  }
  const published = messages.find((m) => m.method === "textDocument/publishDiagnostics");
  const results = requests.map((_, n) => {
    const reply = messages.find((m) => m.id === n + 1);
    return reply && "result" in reply ? reply.result : null;
  });
  const initialized = messages.find((m) => m.id === 0);
  const capabilities = initialized?.result?.capabilities ?? {};
  return { diagnostics: published ? published.params.diagnostics : [], results, capabilities };
}

// In a worker, answer the page. (web/test.mjs calls answer() directly.)
if (typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope) {
  self.onmessage = async (event) => {
    const { id, wasmUrl, text, requests, uri } = event.data;
    try {
      compiled ??= await WebAssembly.compileStreaming(fetch(wasmUrl));
      self.postMessage({ id, ...answer(compiled, text, requests, uri) });
    } catch (error) {
      self.postMessage({ id, error: String(error.message || error) });
    }
  };
}
