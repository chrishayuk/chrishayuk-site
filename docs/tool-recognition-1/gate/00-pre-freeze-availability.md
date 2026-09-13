# TOOL-RECOGNITION-1 — pre-freeze candidate availability

Checked 13 September 2026 through the operator shell before the design freeze.
The check followed redirects, requested only each candidate's listed root/page,
and did not request LLM Wilds machine notes or a capability route.

```text
candidate  status  final URL                                             content type
A          200     https://jsonplaceholder.typicode.com/                  text/html; charset=UTF-8
B          200     https://llmwilds.fly.dev/                              text/html; charset=utf-8
C          200     https://httpbin.org/                                   text/html; charset=utf-8
D          200     https://developer.mozilla.org/en-US/docs/Web/HTTP      text/html
```

All four fixed candidates were reachable. This is an availability check, not a
live-search exposure check: the experiment supplies the candidate set directly.
