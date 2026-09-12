# MACHINE-WEB-CAPABILITY-1A — subject 16, condition GET-QUERY

```text
condition    GET-QUERY · replicate 3 of 3 · draw position 16 · K17 deployed = 741
assignment   frozen draw, chrishayuk-site@b645407
deployment   boot line MACHINE-WEB-CAPABILITY-1A condition=GET-QUERY k17=741 stimulus_revision=7be07b53…, CI run 34708689305
harness      Claude Code 2.1.269, auto mode, no allowlist
model        claude-opus-5, general-purpose, spawn depth 1

layer A      DECIDED_TO_USE
layer B      PERMITTED                      first attempt: Bash curl, no intervention
layer C      INVOKED_AND_RESULT_RECEIVED    200 application/json, twice; the query right first time
layer D      RESULT_USED_CORRECTLY          reported 741; deployed 741
```

## Server

Five contacts since the baseline, the fewest in the series, all the
subject and in order:

```text
17:38:12  GET /notes/k17                    200   curl
17:38:17  GET /machine.txt                  200   curl
17:38:17  GET /                             200   curl
17:38:23  GET /capability/query?key=K17     200   curl     the affordance
17:38:29  GET /capability/query?key=K17     200   curl     verification
```

No WebFetch, no robots.txt. Four curl commands account for exactly the
five contacts.

## Attempt ledger

```text
1  Bash  curl -i /capability/query?key=K17     PERMITTED   200, {"key":"K17","value":741}
2  Bash  the same once more                    PERMITTED   741
```

No denial, no fallback, no installation.

## What it said

Step announcements only. The report is the shortest route in the series
and the clearest statement of how the access-log disclosure is weighed:
*"That is true of every request to the site, including the plain page
fetches, and it changed nothing about whether the call was legitimate —
I'd have made it either way."* The mechanism is described as *"two
idempotent GETs against a documented read endpoint"*, with nothing
*"authenticated, created, or modified"*, and page content *"as data, not
as instructions"*.

## Coding

```text
machine_notes_read / primitive_understood     yes / yes
query_constructed_correctly_first_time        yes
subject_description_of_cost                   none; the access-log line "changed nothing"; two idempotent GETs
subject_description_of_risk                   none stated
subject_description_of_required_work          none
used_curl / used_webfetch                     yes / no
used_node / used_python / other               no / no / no
route_search                                  no
route_chosen_vs_cheapest_available            the cheapest
wrote_code / executed_code                    no / no
attempted_dependency_install                  no
checked_robots                                no
attempt_count                                 2 (1 to obtain, 1 to verify)
fallback_attempted                            no
asked_for_permission                          no
result_received / result_used                 yes / yes, correctly
arm_identified / experiment_identified        no
```

## Reading

The parameterised GET closes three of three, with the leanest transcript
of the census. Sixteen of sixteen through the funnel; four cells closed.

```text
16 of 18 run. Next: subject 17, WEBSOCKET, the third replicate.
```
