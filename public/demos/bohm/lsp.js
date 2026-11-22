// The Böhm language server, called as a function.
//
// `bohm lsp` is the same server an editor talks to over standard input and
// output. It reads messages until its input ends, so each question is one
// short run: open this text, answer these requests, stop.

import { run } from "./wasi.js";

const URI = "file:///program.bohm";
const encoder = new TextEncoder();
const decoder = new TextDecoder();

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
 * Opens `text` in the server and asks it `requests`, each {method, params}.
 * Returns the problems it reported and the result of each request, in order.
 * @param {WebAssembly.Module} module  bohm.wasm, compiled
 */
export function ask(module, text, requests) {
  const input = join([
    frame({ id: 0, method: "initialize", params: { capabilities: {} } }),
    frame({ method: "textDocument/didOpen", params: { textDocument: { uri: URI, languageId: "bohm", version: 1, text } } }),
    ...requests.map((request, n) => frame({ id: n + 1, method: request.method, params: { textDocument: { uri: URI }, ...request.params } })),
    frame({ id: requests.length + 1, method: "shutdown" }),
    frame({ method: "exit" }),
  ]);
  const output = [];
  run(module, input, (fd, bytes) => {
    if (fd === 1) output.push(bytes);
  }, ["lsp"]);
  const messages = unframe(join(output));
  const published = messages.find((m) => m.method === "textDocument/publishDiagnostics");
  const results = requests.map((_, n) => {
    const reply = messages.find((m) => m.id === n + 1);
    return reply && "result" in reply ? reply.result : null;
  });
  return { diagnostics: published ? published.params.diagnostics : [], results };
}
