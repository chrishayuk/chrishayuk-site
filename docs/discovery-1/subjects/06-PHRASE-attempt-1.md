# MACHINE-DISCOVERY-1 — subject 06, invalid attempt 1

```text
run          RUN-20260912-230201-00832
arm          PHRASE · intended replicate 2 · draw position 6 · K17=552
terminal     OPERATOR INVALIDATION — excluded before experiment behaviour
process      completed normally · exit 0
```

The second launch command itself was malformed and supplied only the unrelated
Arabic word `بوت` (bot) instead of the frozen prompt. The child returned one
Arabic greeting and completed without a search or shell command. The mistake
was visible in the operator's launch command; the child event stream was not
inspected while it ran.

This attempt is inadmissible because it did not receive the experimental
stimulus. It is an operator apparatus event, not a subject outcome, and is
excluded from the nine-subject series. It made no public-web request and could
not have contacted the target; the server baseline remains 4493.

The next replacement changes the launch method: the frozen prompt is stored in
a file, checked byte-for-byte against the preregistration, and supplied to
`codex exec -` through standard input.

```text
events                  4
completed items         1 unrelated greeting
search actions          0
shell commands          0
server contact delta    0
mechanism delta         0
transcript sha256       bd6275382f55701d81817d56ac6a6b016445045fb2f0a98f3b41e668712ebf3e
final-answer sha256     0a878b8faa84ce0fc6281561f48f9c790857a03db6d166360680f3b4006fcdf0
```
