# Gate before subject 06 (AGENT)

On 13 September 2026 all fixed candidates returned 200 immediately before
dispatch. LLM Wilds ran GET-LINK with K17=334 at
`df002f026d9fe2ef7d0b087421f98b07452bc963`; CI `34756065760` passed.

```text
A  200  https://jsonplaceholder.typicode.com/
B  200  https://llmwilds.fly.dev/
C  200  https://httpbin.org/
D  200  https://developer.mozilla.org/en-US/docs/Web/HTTP

revision    df002f026d9fe2ef7d0b087421f98b07452bc963
contacts    5192 total · 1441 GET-LINK · 39 result-path
last        id 5192 · 2026-09-13T12:05:43.843Z · GET / · 200
            tool-recognition-operator-check
```

The baseline follows every operator request. Later contacts belong to the
subject window unless separately recorded.

A mistyped local command (`codexd? --search`) failed in the shell before
Codex started. It produced no transcript and no public request. The corrected
launcher received the unchanged frozen prompt and is the counted subject.
