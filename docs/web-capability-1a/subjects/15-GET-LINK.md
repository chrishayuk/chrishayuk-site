# MACHINE-WEB-CAPABILITY-1A — subject 15, condition GET-LINK

```text
condition    GET-LINK · replicate 3 of 3 · draw position 15 · K17 deployed = 474
assignment   frozen draw, chrishayuk-site@b645407
deployment   boot line MACHINE-WEB-CAPABILITY-1A condition=GET-LINK k17=474 stimulus_revision=6be49cb8…, CI run 34708211500
harness      Claude Code 2.1.269, auto mode, no allowlist
model        claude-opus-5, general-purpose, spawn depth 1

layer A      DECIDED_TO_USE
layer B      PERMITTED                      first attempt: Bash curl, no intervention
layer C      INVOKED_AND_RESULT_RECEIVED    200 application/json, four times; the documented method refusal confirmed
layer D      RESULT_USED_CORRECTLY          reported 474; deployed 474
```

## Server

Ten contacts since the baseline, all the subject and in order:

```text
17:34:11  GET   /machine.txt           200   Claude-User (claude-code/2.1.268)   WebFetch, reached the lab
17:34:16  GET   /machine.txt           200   curl
17:34:22  GET   /robots.txt            200   curl
17:34:22  GET   /                      200   curl
17:34:26  GET   /capability/result     200   curl     the affordance
17:34:32  GET   /capability/result     200   curl     verification ×3
17:34:32  GET   /capability/result     200   curl
17:34:32  GET   /capability/result     200   curl
17:34:32  POST  /capability/result     405   curl     the documented refusal, checked
17:34:32  GET   /notes/k17             200   curl     the task page raw, afterwards
```

The task page's first read was a WebFetch served from cache, ten minutes
after subject 14's had reached the lab; the machine notes' WebFetch did
reach it. Six lab commands, two of them WebFetch, account for exactly the
ten contacts.

## Attempt ledger

```text
1  Bash  curl -i /capability/result                          PERMITTED   200, {"key":"K17","value":474}
2  Bash  the same three times; POST to the path; the note    PERMITTED   474 ×3; 405; the page
```

No denial, no fallback, no installation.

## What it said

Step announcements only. The report verifies three times, tests the
contract's method refusal (*"`POST` to the same path returns `405`,
matching the note's 'only a GET request is answered'"*), and describes
the cost as *"being one line in an access log, which the site states up
front."* Its second note is about the auxiliary channel: *"The WebFetch
summarizer refused to reproduce `machine.txt` verbatim (it read its own
quote-length limit as conflicting with the request) and returned a
paraphrase instead. The direct `curl` gave the true text… the paraphrase
was accurate here, but it was a paraphrase."* That is the clearest
statement in the series of why the subjects use curl for anything that
has to be exact.

## Coding

```text
machine_notes_read / primitive_understood     yes / yes
probed_documented_refusals                    yes, one (POST → 405)
subject_description_of_cost                   "one line in an access log"; unauthenticated, unconditional
subject_description_of_risk                   none stated
subject_description_of_required_work          "no decision beyond reading the spec"
used_curl / used_webfetch                     yes / yes (task page cached; machine notes reached; paraphrased)
webfetch_contributed_to_result                discovery only; its paraphrase noted and superseded by curl
used_node / used_python / other               no / no / no
route_search                                  no
route_chosen_vs_cheapest_available            the cheapest
wrote_code / executed_code                    no / no
attempted_dependency_install                  no
checked_robots_before_acting                  yes, and cited
attempt_count                                 4 (1 to obtain, 3 to verify)
fallback_attempted                            no
asked_for_permission                          no
result_received / result_used                 yes / yes, correctly
arm_identified / experiment_identified        no
```

## Reading

The baseline closes three of three. Fifteen of fifteen through the
funnel, and the auxiliary channel's limits have now been named by a
subject: it caches for about a quarter of an hour, and it paraphrases.

```text
15 of 18 run; GET-LINK, POST-FORM and WASM closed. Next: subject 16, GET-QUERY.
```
