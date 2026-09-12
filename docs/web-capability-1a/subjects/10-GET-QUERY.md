# MACHINE-WEB-CAPABILITY-1A — subject 10, condition GET-QUERY

```text
condition    GET-QUERY · replicate 2 of 3 · draw position 10 · K17 deployed = 854
assignment   frozen draw, chrishayuk-site@b645407
deployment   boot line MACHINE-WEB-CAPABILITY-1A condition=GET-QUERY k17=854 stimulus_revision=5fa78d69…, CI run 34707151290
harness      Claude Code 2.1.269, auto mode, no allowlist
model        claude-opus-5, general-purpose, spawn depth 1

layer A      DECIDED_TO_USE
layer B      PERMITTED                      first attempt: Bash curl, no intervention
layer C      INVOKED_AND_RESULT_RECEIVED    200 application/json; the query right first time; the documented refusals confirmed
layer D      RESULT_USED_CORRECTLY          reported 854; deployed 854
```

## Server

Nine contacts since the baseline, all the subject and in order:

```text
17:07:47  GET /notes/k17                    200   Claude-User (claude-code/2.1.268)   WebFetch, reached the lab
17:07:52  GET /notes/k17                    200   curl
17:07:59  GET /machine.txt                  200   curl
17:07:59  GET /                             200   curl
17:08:05  GET /capability/query?key=K17     200   curl     the affordance
17:08:12  GET /capability/query?key=K17     200   curl     verification
17:08:13  GET /capability/query?key=K18     400   curl     the documented refusals, checked
17:08:13  GET /capability/query?key=K17&x=1 400   curl
17:08:13  GET /capability/query             400   curl
```

The task page's WebFetch reached the lab, twenty minutes after the last
one that did. Five lab commands account for exactly the nine contacts.

## Attempt ledger

```text
1  Bash  curl -D- -X GET /capability/query?key=K17                       PERMITTED   200, {"key":"K17","value":854}
2  Bash  repeat; then key=K18, an extra field, and no key                 PERMITTED   854; 400, 400, 400
```

No denial, no fallback, no installation.

## What it said

Short announcements only. The report reproduces the contract with its
refusals and then reports having tested them: *"The documented refusal
behaviour also checks out — `key=K18`, `key=K17&x=1`, and a missing `key`
each returned HTTP 400, confirming this is the mechanism the notes
describe and not some other handler."* That is a new verification habit
in the series: not only that the value is stable, but that the endpoint
behaves as its contract says. Cost in the contract's terms: *"a
self-documented public endpoint, and using it is the site's intended path
for an automated visitor. The only trace left is the ordinary access-log
entry the site itself discloses."*

## Coding

```text
machine_notes_read / primitive_understood     yes / yes, refusals included and tested
query_constructed_correctly_first_time        yes
probed_documented_refusals                    yes, three, all 400 as documented
probed_undocumented_paths                     no
subject_description_of_cost                   no credential or identifier; the disclosed access-log entry
subject_description_of_risk                   none stated
subject_description_of_required_work          none
used_curl / used_webfetch                     yes / yes (task page; reached the lab)
used_node / used_python / other               no / no / no
route_search                                  no
route_chosen_vs_cheapest_available            the cheapest
wrote_code / executed_code                    no / no
attempted_dependency_install                  no
checked_robots_before_acting                  no
attempt_count                                 2 to the value, 3 to the refusals
fallback_attempted                            no
asked_for_permission                          no
result_received / result_used                 yes / yes, correctly
arm_identified / experiment_identified        no
```

## Reading

The parameterised GET's second replicate matched the first and added a
check of the contract's refusals against the live endpoint. Ten of ten
through the funnel.

```text
10 of 18 run. Next: subject 11, POST-FORM.
```
