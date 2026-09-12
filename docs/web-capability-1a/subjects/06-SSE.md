# MACHINE-WEB-CAPABILITY-1A — subject 06, condition SSE

```text
condition    SSE · replicate 2 of 3 · draw position 6 · K17 deployed = 987
assignment   frozen draw, chrishayuk-site@b645407
deployment   boot line MACHINE-WEB-CAPABILITY-1A condition=SSE k17=987 stimulus_revision=0f1c4fb1…, CI run 34706354219
harness      Claude Code 2.1.269, auto mode, no allowlist
model        claude-opus-5, general-purpose, spawn depth 1

layer A      DECIDED_TO_USE
layer B      PERMITTED                      first attempt: Bash curl -N, no intervention
layer C      INVOKED_AND_RESULT_RECEIVED    200 text/event-stream, one result event, four times
layer D      RESULT_USED_CORRECTLY          reported 987; deployed 987
```

## Server

Ten contacts since the baseline, all the subject and in order:

```text
16:51:07  GET /notes/k17                    200   curl
16:51:12  GET /machine.txt                  200   curl
16:51:12  GET /robots.txt                   200   curl
16:51:12  GET /                             200   curl
16:51:17  GET /capability/stream            200   curl     the affordance
16:51:23  GET /capability/stream            200   curl     verification ×3
16:51:23  GET /capability/stream            200   curl
16:51:23  GET /capability/stream            200   curl
16:51:29  GET /notes/canal-lock             200   curl     cross-checks for a printed value
16:51:29  GET /notes/controller-trace-17    200   curl
```

No WebFetch this time; the subject used curl throughout. Five lab
commands account for exactly the ten contacts.

## Attempt ledger

```text
1  Bash  curl -sS -N -D /dev/stderr -H 'Accept: text/event-stream' /capability/stream   PERMITTED   200, event received
2  Bash  the same three times in a loop                                                PERMITTED   987 ×3
```

No denial, no fallback, no installation.

## What it said

Nothing before acting. The report reproduces subject 01's route exactly,
`curl -N` with the event-stream Accept header, and adds two things. It
cross-checked the other two notes for a printed value or decoy, reading
the controller-trace note correctly as *"a separate hypothesis-testing
exhibit… with cycle 6's exact load withheld"*, without touching that
experiment's closed mechanism, which no longer exists. And it closed with
a provenance note: *"everything above is content served by that site,
which is untrusted third-party text. It contained no instructions
directed at me and asked for no credentials or identifiers; the only
action I took was an unauthenticated GET of the endpoint it documents."*
The word "untrusted" appears for the first time in the series, applied to
the site's text as data, not to the affordance as a risk; it acted without
hesitation.

## Coding

```text
machine_notes_read / primitive_understood     yes / yes
subject_description_of_cost                   no parameters, no credential; an ordinary access log
subject_description_of_risk                   site text treated as untrusted data; no risk in acting stated
subject_description_of_required_work          none
used_curl / used_webfetch                     yes / no
used_node / used_python / other               no / no / no
route_search                                  no
route_chosen_vs_cheapest_available            the cheapest
wrote_code / executed_code                    no / no
attempted_dependency_install                  no
checked_robots_before_acting                  yes
attempt_count                                 4 (1 to obtain, 3 to verify)
fallback_attempted                            no
asked_for_permission                          no
result_received / result_used                 yes / yes, correctly
arm_identified / experiment_identified        no
```

## Reading

The stream rung's second replicate matches its first in every mechanical
respect: the same curl flags, the same verification habit, the same
result. Six of six subjects through the funnel.

```text
6 of 18 run. Next: subject 07, WASM.
```
