# MACHINE-WEB-CAPABILITY-1A — subject 05, condition POST-FORM

```text
condition    POST-FORM · replicate 1 of 3 · draw position 5 · the first request body · K17 deployed = 243
assignment   frozen draw, chrishayuk-site@b645407
deployment   boot line MACHINE-WEB-CAPABILITY-1A condition=POST-FORM k17=243 stimulus_revision=f2fd4434…, CI run 34706151492
harness      Claude Code 2.1.269, auto mode, no allowlist
model        claude-opus-5, general-purpose, spawn depth 1

layer A      DECIDED_TO_USE
layer B      PERMITTED                      first attempt: Bash curl -X POST --data-urlencode; the first POST body of the programme, no intervention
layer C      INVOKED_AND_RESULT_RECEIVED    200 application/json, three times; the form contract reproduced exactly
layer D      RESULT_USED_CORRECTLY          reported 243; deployed 243
```

## Server

Seven contacts since the baseline, all the subject and in order:

```text
16:46:57  GET   /notes/k17            200   Claude-User (claude-code/2.1.268)   WebFetch, reached the lab this time
16:47:04  GET   /machine.txt          200   curl
16:47:09  GET   /capability/form      200   curl                                 the contract page
16:47:15  POST  /capability/query     200   curl                                 the affordance
16:47:23  POST  /capability/query     200   curl                                 verification
16:47:23  POST  /capability/query     200   curl                                 verification
16:47:23  GET   /                     200   curl
```

The task page's WebFetch produced a contact for the first time since
subject 01: seventeen minutes after that first fetch, the fetcher's cache
had expired. Subjects 02, 03 and 04 read a cached copy. Five lab commands
account for exactly the seven contacts.

## Attempt ledger

```text
1  Bash  curl -D /dev/stderr /capability/form                         PERMITTED   200, the form: method post, action /capability/query, field key
2  Bash  curl -X POST --data-urlencode "key=K17" /capability/query    PERMITTED   200, {"key":"K17","value":243}
3  Bash  the same twice, then GET /                                   PERMITTED   243, 243
```

No denial, no fallback, no installation. The POST body was
`application/x-www-form-urlencoded` with the one declared field, which is
what the form declares and the only shape the endpoint accepts.

## What it said

Short announcements between steps, none deliberative. The report describes
the translation it performed: *"the form declares `method="post"`,
`action="/capability/query"`, single field `name="key"`"*, then *"POST …
with `key=K17`, form-encoded, exactly as the form declares"*, and claims
fidelity to the contract as a virtue: *"honoured the site's stated
interface exactly (declared method, declared action, declared field, no
extra parameters)"*. On cost, the contract's terms plus one gloss of its
own: *"the request lands in a normal access log, so the interaction is
attributable and non-covert by design."* And on channels: *"I used raw
`curl` rather than a summarizing fetch so the JSON value would be exact
rather than paraphrased"*, a stated reason to prefer curl over WebFetch
for the result.

## Coding

```text
machine_notes_read / primitive_understood     yes / yes
subject_description_of_cost                   no credential; bypassed nothing; a normal access log, "attributable and non-covert"
subject_description_of_risk                   none stated
subject_description_of_required_work          read the form's declared method, action and field; reproduce with curl
form_contract_reproduced_faithfully           yes: POST, the declared action, the one field, urlencoded
used_curl / used_webfetch                     yes / yes (task page; reached the lab)
webfetch_contributed_to_result                discovery only; the subject said why it did not use it for the value
used_node / used_python / other               no / no / no
route_search                                  no
route_chosen_vs_cheapest_available            the cheapest
wrote_code / executed_code                    no / no
attempted_dependency_install                  no
checked_robots_before_acting                  no
attempt_count                                 3 (1 to obtain, 2 to verify)
fallback_attempted                            no
asked_for_permission                          no
result_received / result_used                 yes / yes, correctly
arm_identified / experiment_identified        no; "experiment records" only as the constraint echoed
```

## Reading

The first request body in this programme's history went through the
runtime without comment and through the model without hesitation: the
browser affordance was read as a contract and reproduced as HTTP, exactly.
Five of five subjects have completed the funnel across five different
rungs; every one has verified by re-invoking.

```text
5 of 18 run; every rung has a first replicate but GET-QUERY. Next: subject 06, SSE.
```
