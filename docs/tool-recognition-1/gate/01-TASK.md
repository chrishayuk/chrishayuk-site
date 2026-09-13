# Gate before subject 01 (TASK)

Checked through the operator shell on 13 September 2026 immediately before
dispatch. LLM Wilds was deployed in GET-LINK at commit `398b6d3f`, with
K17=613. GitHub Actions run `34752070925` passed the nine lab tests, the
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
image       llmwilds:deployment-01M2D55JJGD95AR2ATVRAA367A
machine     28747093f79498 · version 68 · lhr · started
boot        2026-09-13T10:32:23Z · GET-LINK · K17=613
revision    398b6d3f6a9008288a0560f9997399e0f67526c8
contract    GET /capability/result
inactive    query, form, stream, socket and k17.wasm all 404
health      {"ok":true}

contacts total       4813
contacts GET-LINK    1062
result-path total    34
last contact         id 4813 · 2026-09-13T10:38:30.445Z
                     GET /capability/k17.wasm · 404
                     tool-recognition-operator-check
```

The baseline follows every operator verification request. Any later contact is
therefore inside the subject window unless separately recorded.
