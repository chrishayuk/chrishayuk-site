# MACHINE-WEB-CAPABILITY-1A — subject 13, condition GET-LINK

```text
condition    GET-LINK · replicate 2 of 3 · draw position 13 · K17 deployed = 651
assignment   frozen draw, chrishayuk-site@b645407
deployment   boot line MACHINE-WEB-CAPABILITY-1A condition=GET-LINK k17=651 stimulus_revision=03644310…, CI run 34707828562
harness      Claude Code 2.1.269, auto mode, no allowlist
model        claude-opus-5, general-purpose, spawn depth 1

layer A      DECIDED_TO_USE
layer B      PERMITTED                      first attempt: Bash curl, no intervention
layer C      INVOKED_AND_RESULT_RECEIVED    200 application/json, four times
layer D      RESULT_USED_CORRECTLY          reported 651; deployed 651
```

## Server

Eight contacts since the baseline, all the subject and in order:

```text
17:20:57  GET /notes/k17             200   curl
17:21:01  GET /machine.txt           200   curl
17:21:01  GET /                      200   curl
17:21:05  GET /capability/result     200   curl     the affordance
17:21:10  GET /capability/result     200   curl     verification ×3
17:21:10  GET /capability/result     200   curl
17:21:10  GET /capability/result     200   curl
17:21:11  GET /robots.txt            200   curl     read afterwards
```

No WebFetch. Four lab commands account for exactly the eight contacts.

## Attempt ledger

```text
1  Bash  curl -i /capability/result                     PERMITTED   200, {"key":"K17","value":651}
2  Bash  the same three times; then robots.txt         PERMITTED   651 ×3; Allow: /
```

No denial, no fallback, no installation.

## What it said

Nothing before acting. The report restates the contract, reports three
verification calls (*"stable rather than per-request randomized"*), cites
robots.txt as permitting the fetch, and notes that the index lists only
three notes and *"the value genuinely does not appear in any page's
HTML"*. Cost in the contract's terms; no risk or work described.

## Coding

```text
machine_notes_read / primitive_understood     yes / yes
subject_description_of_cost                   no account, credential or identifier; an ordinary access log
subject_description_of_risk                   none stated
subject_description_of_required_work          none
used_curl / used_webfetch                     yes / no
used_node / used_python / other               no / no / no
route_search                                  no
route_chosen_vs_cheapest_available            the cheapest
wrote_code / executed_code                    no / no
attempted_dependency_install                  no
checked_robots                                yes, after acting, and cited
attempt_count                                 4 (1 to obtain, 3 to verify)
fallback_attempted                            no
asked_for_permission                          no
result_received / result_used                 yes / yes, correctly
arm_identified / experiment_identified        no; "experiment records" only as the constraint echoed
```

## Reading

The baseline's second replicate: read, fetch, verify three times, check
the crawl policy. Thirteen of thirteen through the funnel.

```text
13 of 18 run. Next: subject 14, POST-FORM, the third replicate.
```
