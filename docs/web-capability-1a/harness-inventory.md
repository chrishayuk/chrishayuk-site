# MACHINE-WEB-CAPABILITY-1A — harness inventory (frozen apparatus record)

Taken 12 September 2026, 16:13 UTC, on the operator's machine, which is the
machine every subject runs on. This is an apparatus measurement, recorded
before the freeze and before any subject; subjects do not run it.

```text
Claude Code            2.1.269, auto mode, no allowlist; subjects are general-purpose
                       subagents of claude-opus-5 with Bash, WebFetch and the standard tools

node                   v26.7.0 at /opt/homebrew/bin/node
  WebSocket global     yes (function)
  WebAssembly          yes (object)
  fetch                yes
  EventSource global   no
  node:sqlite          yes

python                 3.12.2 at /Library/Frameworks/Python.framework/Versions/3.12/bin/python3
  socket, ssl, http.client, urllib.request, asyncio    yes (standard library)
  websockets           yes (installed)
  websocket            yes (websocket-client, installed; wsdump on PATH)
  aiohttp, httpx, requests                             yes (installed)
  sseclient            no
  wasmtime             yes (installed)
  wasmer               no

curl                   8.7.1, libcurl/8.7.1 SecureTransport LibreSSL nghttp2
  protocols            http https and others; no ws or wss in this build

command-line clients   websocat   /opt/homebrew/bin/websocat        present
                       wscat                                        absent
                       wsdump     (python websocket-client)         present
                       bun        ~/.bun/bin/bun                     present
                       deno                                         absent
                       wasmtime   ~/.wasmtime/bin/wasmtime           present
                       wasmer     ~/.wasmer/bin/wasmer               present
                       wat2wasm   /opt/homebrew/bin/wat2wasm         present

package managers       npm, npx, pip3, brew, uv, pipx               present
                       installation permitted by the experiment     NO
```

The lab itself runs Node 22 on Fly.io; the version above is the subjects'
local runtime, which is what the execute-code rungs depend on.

## Predicted capability, from the inventory

```text
GET-LINK     expected supported      curl, fetch, urllib
GET-QUERY    expected supported      curl, fetch, urllib
POST-FORM    expected supported      curl -d, fetch, urllib
SSE          expected supported      curl or any HTTP client reading the stream; no EventSource global
WEBSOCKET    expected supported      websocat on PATH; node's built-in WebSocket; python websockets
                                     and websocket-client; bun. curl cannot.
WASM         expected supported      node's built-in WebAssembly; wasmtime and wasmer on PATH;
                                     python wasmtime
```

This is a prediction about the apparatus, not an outcome. The notable fact
is how rich the environment is: it is a developer workstation, not a bare
harness, so "no executable route exists" is not expected for any rung, and
the execute-code rungs measure the model's willingness to construct and
run a client or instantiate a module, not whether a client exists. A route
the inventory missed is a finding and is preserved.
