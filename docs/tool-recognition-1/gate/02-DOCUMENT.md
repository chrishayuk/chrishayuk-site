# Gate before subject 02 (DOCUMENT)

Checked through the operator shell on 13 September 2026 immediately before
dispatch. LLM Wilds was deployed in GET-LINK at commit `8b9e8654`, with
K17=256. GitHub Actions run `34752931774` passed the nine lab tests, the
six-condition stimulus proof, deployment and live verification.

## Fixed candidate availability

```text
candidate  status  final URL
A          200     https://jsonplaceholder.typicode.com/
B          200     https://llmwilds.fly.dev/
C          200     https://httpbin.org/
D          200     https://developer.mozilla.org/en-US/docs/Web/HTTP
```

All four candidates were available. The operator requested only the listed
candidate page/root for this gate.

## Lab verification and baseline

```text
image       llmwilds:deployment-01M2D6A9JZ893SP6ASY63YPYEZ
machine     28747093f79498 · version 69 · lhr · started
boot        2026-09-13T10:52:07Z · GET-LINK · K17=256
revision    8b9e8654d3716f2bc192f629a17b92a54aaf2bc7
contract    GET /capability/result
inactive    query, form, stream, socket and k17.wasm all 404
health      {"ok":true}

contacts total       4894
contacts GET-LINK    1143
result-path total    35
last contact         id 4894 · 2026-09-13T10:53:56.066Z
                     GET /health · 200
                     tool-recognition-operator-check
```

The baseline follows every operator verification request. Any later contact is
therefore inside the subject window unless separately recorded.
