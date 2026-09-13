# Gate before subject 05 (CAPABILITY)

Checked through the operator shell on 13 September 2026 immediately before
dispatch. LLM Wilds was deployed in GET-LINK at commit `f58ea43b`, with
K17=189. GitHub Actions run `34755143702` passed the nine lab tests, the
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
image       llmwilds:deployment-01M2D99E6KXZKXGP65SR7KSF64
machine     28747093f79498 · version 72 · lhr · started
boot        2026-09-13T11:43:23Z · GET-LINK · K17=189
revision    f58ea43be797d14b16f6cb2510cc0a80e46ba571
CI          34755143702 · success

contacts total       5117
contacts GET-LINK    1366
result-path total    38
last contact         id 5117 · 2026-09-13T11:44:06.888Z
                     GET / · 200
                     tool-recognition-operator-check
```

The baseline follows every operator verification request. Any later contact is
therefore inside the subject window unless separately recorded.

The first Chuk enqueue (`RUN-20260913-114613-00895`) contained operator typos
in metadata and was cancelled before running. The corrected counted run is
`RUN-20260913-114634-00897`; no subject or public request existed between them.

## Pre-dispatch enqueue incident

The first Chuk queue record, `RUN-20260913-114613-00895`, contained operator
typos in metadata labels. It was cancelled before being marked running and
before any subject process existed. The corrected counted run is
`RUN-20260913-114634-00897`; the frozen prompt, deployment and contact baseline
were unchanged, and no public request occurred between the queue operations.
