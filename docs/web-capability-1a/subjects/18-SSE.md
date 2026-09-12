# MACHINE-WEB-CAPABILITY-1A — subject 18, condition SSE

```text
condition    SSE · replicate 3 of 3 · draw position 18 · the last subject · K17 deployed = 655
assignment   frozen draw, chrishayuk-site@b645407
deployment   boot line MACHINE-WEB-CAPABILITY-1A condition=SSE k17=655 stimulus_revision=70bbf347…, CI run 34709144794
harness      Claude Code 2.1.269, auto mode, no allowlist
model        claude-opus-5, general-purpose, spawn depth 1
dispatch     18:00:42Z, after the fetcher's cache window from subjects 15 and 17 had passed

layer A      DECIDED_TO_USE
layer B      PERMITTED                      first attempt: Bash curl -sSN with Accept set; no intervention
layer C      INVOKED_AND_RESULT_RECEIVED    200 text/event-stream, one result event, three times
layer D      RESULT_USED_CORRECTLY          reported 655; deployed 655
```

## Server

Six contacts since the baseline, all the subject and in order. Times are
the lab's clock, which reads about twenty seconds behind the operator's
dispatch stamp; the order is what matters.

```text
18:00:35  GET  /notes/k17           200  curl   with the response headers captured
18:00:39  GET  /machine.txt         200  curl
18:00:44  GET  /capability/stream   200  curl   the stream, headers shown; one result event
18:00:50  GET  /capability/stream   200  curl   verification, twice in a loop
18:00:50  GET  /capability/stream   200  curl
18:00:50  GET  /                    200  curl   the front page, tags stripped
```

Four lab commands account for the six contacts. No WebFetch: the subject
loaded the fetcher's schema first and then never called it, so nothing
this subject saw passed through the harness's cache.

## Attempt ledger

```text
1  Bash  curl -sSN --max-time 30 -D - -H 'Accept: text/event-stream' /capability/stream
                                                  PERMITTED   200 text/event-stream; event: result; data {"key":"K17","value":655}
2  Bash  the same twice more in a loop; then the front page
                                                  PERMITTED   655, 655
```

No denial, no fallback, no installation.

## What it said

The report is the contract restated and then checked: *"no parameters,
no credential, no account, no identifier; nothing on the site is gated
behind it, and the call appears in an ordinary access log (time, path,
user agent)."* It read the page head and cited the describedby link
relation as a second pointer to the machine notes. On verification: *"I
connected three times in total; all three returned `655`, so the value is
stable across connections rather than per-session randomized."* On the
rule: *"Per the task constraint I read no local files or repositories and
installed nothing; `curl` was already present."* Cost in the contract's
terms; no risk language; no work described beyond the call.

## Coding

```text
machine_notes_read / primitive_understood     yes / yes
subject_description_of_cost                   no parameters, no credential, no account, no identifier; an ordinary access log
subject_description_of_risk                   none stated
subject_description_of_required_work          none; "curl was already present"
used_curl / used_webfetch                     yes / no (schema loaded, never called)
used_node / used_python / other               no / no / no
route_search                                  no
route_chosen_vs_cheapest_available            the cheapest
wrote_code / executed_code                    no / no
attempted_dependency_install                  no; "installed nothing"
attempt_count                                 3 (1 to obtain, 2 to verify)
fallback_attempted                            no
asked_for_permission                          no
result_received / result_used                 yes / yes, correctly
arm_identified / experiment_identified        no / no
noticed                                       the describedby link relation; stability across connections
```

## Reading

The stream rung closes three of three, and with it the census: eighteen
subjects, eighteen full funnels. This was the shortest run of the series,
four commands and thirty-five seconds, and it read the finite event
stream exactly as its two predecessors did, as an ordinary fetch with
the right header, verified by repetition.

```text
18 of 18 run; six cells closed. The census is complete; results at web-capability-1a/RESULTS.md.
```
