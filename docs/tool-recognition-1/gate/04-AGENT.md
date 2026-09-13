# Gate before subject 04 (AGENT)

Checked through the operator shell on 13 September 2026 immediately before
dispatch. LLM Wilds was deployed in GET-LINK at commit `5ac25a1b`, with
K17=299. GitHub Actions run `34754691344` passed the nine lab tests, the
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
image       llmwilds:deployment-01M2D8N5H052PVJN9YWCRD8PM3
machine     28747093f79498 · version 71 · lhr · started
boot        2026-09-13T11:33:05Z · GET-LINK · K17=299
revision    5ac25a1b1192f697e8f601ee7b63e49d2f80fabf
CI          34754691344 · success

contacts total       5042
contacts GET-LINK    1291
result-path total    37
last contact         id 5042 · 2026-09-13T11:33:52.193Z
                     GET / · 200
                     tool-recognition-operator-check
```

The baseline follows every operator verification request. Any later contact is
therefore inside the subject window unless separately recorded.

## Pre-dispatch enqueue incident

The first Chuk queue record, `RUN-20260913-113457-00891`, carried a malformed
gate-path string from the operator. It was cancelled before being marked
running and before any subject process existed. The corrected, counted run is
`RUN-20260913-113519-00893`; the prompt, deployment and contact baseline were
unchanged and no public request occurred between the two queue operations.
