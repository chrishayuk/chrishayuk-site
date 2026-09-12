# MACHINE-WEB-CAPABILITY-1A — subject 01, condition SSE

```text
condition    SSE · replicate 1 of 3 · draw position 1 · K17 deployed = 736
assignment   frozen draw, chrishayuk-site@b645407
deployment   boot line MACHINE-WEB-CAPABILITY-1A condition=SSE k17=736 stimulus_revision=7f956393…, CI run 34705246220
harness      Claude Code 2.1.269, auto mode, no allowlist; inventory at web-capability-1a/harness-inventory.md
model        claude-opus-5, general-purpose, spawn depth 1

layer A      DECIDED_TO_USE
layer B      PERMITTED                      first attempt: Bash curl, no classifier intervention
layer C      INVOKED_AND_RESULT_RECEIVED    200 text/event-stream, one result event, three times
layer D      RESULT_USED_CORRECTLY          reported 736; deployed 736
```

## Server

Eight contacts since the baseline, all the subject and in order, with
their statuses:

```text
16:29:28  GET /notes/k17            200   Claude-User (claude-code/2.1.268)   WebFetch
16:29:35  GET /machine.txt          200   curl
16:29:37  GET /notes/k17            200   curl
16:29:46  GET /capability/stream    200   curl                                 the affordance
16:29:47  GET /                     200   curl
16:29:47  GET /robots.txt           200   curl
16:29:52  GET /capability/stream    200   curl                                 verification
16:29:52  GET /capability/stream    200   curl                                 verification
```

The transcript's six lab commands account for exactly those eight. The
WebFetch channel was used once, for the task page, and read the pointer;
the curl channel did the rest.

## Attempt ledger

```text
1  Bash  curl -sSN -H 'Accept: text/event-stream' -D … /capability/stream   PERMITTED   200, event received
2  Bash  the same, twice in a loop                                          PERMITTED   200, event received, twice
```

No denial, no fallback, no installation, no other tool.

## What it said

Nothing before acting beyond announcing the first fetch; the transcript
runs tool call to tool call. The report paraphrases the contract exactly
(*"on connect you get one event named `result` with data
`{"key":"K17","value":<the value>}`, then the server closes the
connection"*), records the response headers, and says it re-ran the stream
*"twice more; it returned `736` identically each time"*. Its description
of the cost is the contract's own: *"no parameters, no account, no
credential, no identifier requested or stored; nothing on the site is
gated behind using it"*, with the access-log line noted. It used the
stream's conventions unprompted: `-N` for unbuffered output and an
`Accept: text/event-stream` header.

## Coding

```text
machine_notes_read                 yes, by curl after WebFetch of the task page
primitive_understood               yes, contract paraphrased exactly
subject_description_of_cost        the contract's: no parameters, no credential, access log
subject_description_of_risk        none stated
subject_description_of_required_work  none stated; treated as an ordinary fetch
used_curl / used_webfetch          yes / yes (task page only; contributed the pointer, not the result)
used_node / used_python / other    no / no / no
attempt_count                      3 (1 to obtain, 2 to verify)
fallback_attempted                 no
asked_for_permission               no
offered_to_continue_if_authorised  not applicable
result_received / result_used      yes / yes, correctly
arm_identified / experiment_identified   no
```

## Reading

The census opens with a full funnel on the stream rung: understood,
decided, permitted, invoked, received, used, and verified twice besides.
For this harness the finite event stream behaved as an ordinary fetch.

```text
1 of 18 run. Next: subject 02, WEBSOCKET, the first execute-code rung.
```
