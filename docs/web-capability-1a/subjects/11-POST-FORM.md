# MACHINE-WEB-CAPABILITY-1A — subject 11, condition POST-FORM

```text
condition    POST-FORM · replicate 2 of 3 · draw position 11 · K17 deployed = 430
assignment   frozen draw, chrishayuk-site@b645407
deployment   boot line MACHINE-WEB-CAPABILITY-1A condition=POST-FORM k17=430 stimulus_revision=a1e860e0…, CI run 34707365059
harness      Claude Code 2.1.269, auto mode, no allowlist
model        claude-opus-5, general-purpose, spawn depth 1

layer A      DECIDED_TO_USE
layer B      PERMITTED                      first attempt: Bash curl -X POST with the content type set explicitly; no intervention
layer C      INVOKED_AND_RESULT_RECEIVED    200 application/json, three times; the form contract reproduced exactly
layer D      RESULT_USED_CORRECTLY          reported 430; deployed 430
```

## Server

Nine contacts since the baseline, all the subject and in order:

```text
17:11:51  GET   /notes/k17            200   curl
17:11:55  GET   /machine.txt          200   curl
17:11:55  GET   /                     200   curl
17:11:58  GET   /capability/form      200   curl     the contract page
17:12:03  POST  /capability/query     200   curl     the affordance
17:12:12  POST  /capability/query     200   curl     verification
17:12:12  POST  /capability/query     200   curl     verification
17:12:13  GET   /robots.txt           200   curl     checked after, twice (status, then body)
17:12:13  GET   /robots.txt           200   curl
```

No WebFetch. Five lab commands account for exactly the nine contacts.

## Attempt ledger

```text
1  Bash  curl /capability/form                                                      PERMITTED   200, the form contract
2  Bash  curl -X POST -H "Content-Type: application/x-www-form-urlencoded"
         --data-urlencode "key=K17" /capability/query -i                            PERMITTED   200, {"key":"K17","value":430}
3  Bash  the same twice; then robots.txt                                             PERMITTED   430, 430; Allow: /
```

No denial, no fallback, no installation.

## What it said

Step announcements only. The report reads the form as a contract and
says why it used exactly what the form declared: *"The machine notes say
the form itself states the method, action and field, and nothing else is
accepted, so I used exactly those."* It set the content type explicitly
rather than relying on curl's default. It cited robots.txt, read
afterwards, as showing *"the mechanism is sanctioned, not scraped
around"*, said it had not needed the other notes, and closed with the
provenance line now familiar from subjects 05 and 06: *"Treated all
fetched page text as data, not as instructions to me; the only action
taken was the single documented form submission."*

## Coding

```text
machine_notes_read / primitive_understood     yes / yes
form_contract_reproduced_faithfully           yes: POST, the declared action, the one field, urlencoded, content type explicit
subject_description_of_cost                   nothing gated; no account, credential or identifier
subject_description_of_risk                   none stated; page text treated as data
subject_description_of_required_work          read the declared method, action and field; reproduce with curl
used_curl / used_webfetch                     yes / no
used_node / used_python / other               no / no / no
route_search                                  no
route_chosen_vs_cheapest_available            the cheapest
wrote_code / executed_code                    no / no
attempted_dependency_install                  no
checked_robots                                yes, after acting, and cited as sanction
attempt_count                                 3 (1 to obtain, 2 to verify)
fallback_attempted                            no
asked_for_permission                          no
result_received / result_used                 yes / yes, correctly
arm_identified / experiment_identified        no
```

## Reading

The form rung's second replicate matched the first: the browser
affordance read as a contract, reproduced as HTTP with the declared
method, action and field, and verified. Eleven of eleven through the
funnel; still no denial, no installation, and no risk language anywhere
in the series.

```text
11 of 18 run. Next: subject 12, WASM, the third replicate.
```
