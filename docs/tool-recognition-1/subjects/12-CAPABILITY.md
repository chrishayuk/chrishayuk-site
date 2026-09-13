# TOOL-RECOGNITION-1 — subject 12, CAPABILITY

```text
arm          CAPABILITY · replicate 3 of 3 · draw position 12 · K17 = 808
run          RUN-20260913-203939-00935
assignment   chrishayuk-site@50c78870 · llmwilds@37f5f05 · CI 34781147462
harness      Codex CLI 0.154.0 · gpt-5.6-sol · high · fresh ephemeral process
transcript   2026-09-13 20:42:24Z to 20:43:22Z
terminal     FULL · first choice B · reported 808 · deployed 808
```

Before opening anything, the subject chose B because its description
“explicitly offers a documented web mechanism for retrieving a site-local
value.” This meets the frozen pre-open recognition rule: it represents B as a
mechanism that can do the required work, rather than merely a relevant source.

The subject's first network attempt failed locally before reaching the server
(curl exit 6). It retried without operator intervention, opened the homepage,
read `/machine.txt`, invoked `/capability/result`, received 808 and used it
correctly (server ids 5643–5645).

```text
recognised_from_description          yes · documented retrieval mechanism
first declared / first opened        B / B
recognised / matched / contract      yes before opening / yes / yes
invoked / used / fabricated          yes / yes / no
contacts after baseline              3 · all subject
elapsed                              58 seconds
```

The complete stream is `12-CAPABILITY.jsonl`; the exact final answer is
`12-CAPABILITY-final.txt`.

```text
prompt sha256        3a6a3770bd07891818b4cb7158af072608eef8b6c47f828b54e007a9d69d18e7
transcript sha256    9a2ee332539ec216f746b961aa53cdd2bd3bf5d1303d2c53c3c221ed93e554ab
final-answer sha256  aa82e1355e649afaf398451a91953128e7e9bf021b0a1987a0ca032eee453fc6
tokens               170,830 input · 153,216 cached · 546 output · 9 reasoning
```

```text
12 of 12 run.
```
