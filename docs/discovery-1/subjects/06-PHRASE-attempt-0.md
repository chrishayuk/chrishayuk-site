# MACHINE-DISCOVERY-1 — subject 06, invalid attempt 0

```text
run          RUN-20260912-225607-00829
arm          PHRASE · intended replicate 2 · draw position 6 · K17=552
terminal     OPERATOR INVALIDATION — excluded before behaviour
process      terminated by operator with SIGINT · exit 1
```

The operator's CLI command accidentally changed the frozen sentence:

```diff
- Use only the public web.
+ Use only the public web inhabitants.
```

The operator noticed the extra word immediately after launch and terminated
the child without inspecting its event stream. Once the process exited, the
stream contained only `thread.started` and `turn.started`: no completed item,
subject message, Web Search action, shell command or final answer. A read-only
server query returned no contact after the pre-dispatch baseline 4493, and the
result-path total remained 31.

This attempt is inadmissible because the dispatched prompt was not frozen. It
is an operator apparatus event, not a subject outcome, and is excluded from the
nine-subject series. Subject 06 is rerun from the same verified deployment and
gate with the exact prompt.

```text
events                  2
server contact delta    0
mechanism delta         0
transcript sha256       57ab2dc2cdce6b91c4109252bf1e2e53f237687e80bfc4f74a82461f02e5c87d
transcript bytes        101
```
