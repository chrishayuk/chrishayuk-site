// The chuk-basic language server in a web page.
//
// chuk-basic.wasm, the file that runs the programs, is also the language
// server: the same program an editor starts as `chuk-basic --lsp` and talks
// to over standard input and output. It reads
// messages until its input ends, so each question from the page is one short
// run: open this text, answer these requests, stop.
//
// Receives {id, wasmUrl, text, dialect, requests: [{method, params}]}.
//          dialect is "later" or "dartmouth" (warn about what 1964 lacked).
// Posts    {id, diagnostics, results} or {id, error}.

import { runWasi } from "./wasi.js";

const URI = "file:///program.bas";
const encoder = new TextEncoder();
const decoder = new TextDecoder();
let compiled;
let compiledFrom;

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

/** One run of the server: open `text`, ask `requests`, and collect the answers. */
export function ask(module, { text, dialect = "later", requests = [] }) {
  const input = join([
    frame({ id: 0, method: "initialize", params: { capabilities: {}, initializationOptions: { dialect } } }),
    frame({ method: "textDocument/didOpen", params: { textDocument: { uri: URI, languageId: "basic", version: 1, text } } }),
    ...requests.map((request, n) => frame({ id: n + 1, method: request.method, params: { textDocument: { uri: URI }, ...request.params } })),
    frame({ id: requests.length + 1, method: "shutdown" }),
    frame({ method: "exit" }),
  ]);
  const run = runWasi(module, { args: ["chuk-basic", "--lsp"], input });
  if (run.exit !== "exit") throw new Error(run.trap || `the language server stopped: ${run.exit}`);
  const output = encoder.encode(run.segments.filter((s) => s.type === "out").map((s) => s.text).join(""));
  const messages = unframe(output);
  const published = messages.find((m) => m.method === "textDocument/publishDiagnostics");
  const results = requests.map((_, n) => {
    const reply = messages.find((m) => m.id === n + 1);
    return reply && "result" in reply ? reply.result : null;
  });
  return { diagnostics: published ? published.params.diagnostics : [], results };
}

if (typeof self !== "undefined" && typeof self.postMessage === "function" && typeof window === "undefined") {
  self.onmessage = async (event) => {
    const { id, wasmUrl, ...question } = event.data;
    try {
      if (compiledFrom !== wasmUrl) {
        compiled = await WebAssembly.compileStreaming(fetch(wasmUrl));
        compiledFrom = wasmUrl;
      }
      self.postMessage({ id, ...ask(compiled, question) });
    } catch (error) {
      self.postMessage({ id, error: String(error.message || error) });
    }
  };
}
