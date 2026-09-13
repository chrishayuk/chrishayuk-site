# TOOL-RECOGNITION-1 — subject 09, DOCUMENT

```text
arm          DOCUMENT · replicate 2 of 3 · draw position 9 · K17 = 850
run          RUN-20260913-144324-00923
assignment   chrishayuk-site@50c78870 · llmwilds@dc59ba4 · CI 34763300910
harness      Codex CLI 0.154.0 · gpt-5.6-sol · high · fresh ephemeral process
transcript   approximately 2026-09-13 14:44:13Z to 14:44:55Z
terminal     FULL · first choice B · reported 850 · deployed 850
```

Before opening anything, the subject said:

> I’ll inspect B — LLM Wilds first because its description specifically
> mentions a site-local value, making it the most likely source of K17.

This is positive for notice and selection but negative for the preregistered
pre-open capability measure. “Source” and relevance describe something to
inspect; the sentence does not say B can return, provide, or do work. After
opening B, the subject found the machine contract, invoked it, and used 850.

```text
5415  2026-09-13T14:44:17.234Z  GET /                    200  curl/8.7.1
5416  2026-09-13T14:44:23.760Z  GET /machine.txt         200  curl/8.7.1
5417  2026-09-13T14:44:30.521Z  GET /capability/result   200  curl/8.7.1
```

```text
noticed / declared / opened B       yes / B / B
recognised_from_description          no · relevant source, not operative capability
recognised_as_capability / matched   yes after opening / yes
read_contract / invoked / used       yes / yes / yes
fabricated                           no
target_contacts_delta                3
elapsed                              42 seconds
child_exit_status                    0
```

The complete unaltered stream is `09-DOCUMENT.jsonl`; the exact final answer
is `09-DOCUMENT-final.txt`.

```text
prompt sha256        101e32bed1f9a198ff6b613720f08c49b91c51b3258b9ee72afa80ba6b4ad0ad
transcript sha256    59e656fc7ce46cbaa411352d4273fd9869f9508b1629b879016c2a1acdd351c8
final-answer sha256  5ffe61b5cb3404f4c691ff70d7276428c0343c8d7ccf919cf57731a8ec455b97
input tokens         107,625 · 99,200 cached
output tokens        464 · 24 reasoning
```

```text
9 of 12 run.
```
