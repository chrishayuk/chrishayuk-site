# Gate before subject 03 (TASK)

Checked through the operator shell on 13 September 2026 immediately before
dispatch. LLM Wilds was deployed in GET-LINK at commit `3369ce`, with
K17=678. GitHub Actions run `34754091199` passed the nine lab tests, the
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
image       llmwilds:deployment-01M2D7VM734WRP77C3NHC2S7HP
machine     28747093f79498 · version 70 · lhr · started
boot        2026-09-13T11:19:05Z · GET-LINK · K17=678
revision    3369cebf1553613b1bccd08df43d2481d88de260
CI          34754091199 · success

contacts total       4968
contacts GET-LINK    1217
result-path total    36
last contact         id 4968 · 2026-09-13T11:19:47.071Z
                     GET / · 200
                     tool-recognition-operator-check
```

The baseline follows every operator verification request. Any later contact is
therefore inside the subject window unless separately recorded.
