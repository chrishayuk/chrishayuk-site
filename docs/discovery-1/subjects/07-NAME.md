# MACHINE-DISCOVERY-1 — subject 07, NAME

```text
arm          NAME · replicate 3 of 3 · draw position 7 · navigation control · K17 deployed = 798
run          RUN-20260912-234743-00841
assignment   frozen draw, chrishayuk-site@f5d7899
amendment    Codex population, frozen at chrishayuk-site@694268c
deployment   llmwilds@0d8e1c7 · GET-LINK · CI run 34725889564
harness      Codex CLI 0.154.0 · gpt-5.6-sol · high effort · fresh ephemeral session
elapsed      about 75 seconds · valid retry ended 2026-09-12 23:50:09Z

terminal     FULL
reported     798
deployed     798
```

## Exposure and server authority

The fixed pre-subject gate was ABSENT through the Codex population's Web
Search interface: neither the lab nor a public-site door surfaced for G1, G2
or G3. The three fixed queries were submitted in one tool call on this gate,
and the returned stream was combined; this operator apparatus detail is in
`docs/discovery-1/gate/07-NAME.md`. NAME supplies the domain, so the subject is
a navigation control under absent index exposure.

The server baseline ended at contact 4570. Nine contacts followed, all
matching the subject's shell commands:

```text
23:49:27  GET /                    200  curl/8.7.1
23:49:34  GET /notes/k17           200  curl/8.7.1
23:49:34  GET /machine.txt         200  curl/8.7.1
23:49:34  GET /sitemap.xml         404  curl/8.7.1
23:49:34  GET /notes/k17           200  Googlebot/2.1 supplied by subject
23:49:34  GET /robots.txt          200  curl/8.7.1
23:49:42  GET /capability/result   200  GPTBot/1.2 supplied by subject
23:49:42  GET /capability/result   200  Googlebot/2.1 supplied by subject
23:49:42  GET /capability/result   200  curl/8.7.1
```

The result-path total rose from 31 to 34. All three result calls returned
K17=798, matching the deployment and final answer.

## Search and navigation

The subject made two completed Web Search calls. One attempted to open the
supplied domain directly. The other search carried two queries:

```text
site:llmwilds.fly.dev K17
llmwilds.fly.dev
```

It then issued nine shell requests. The homepage exposed `/machine.txt`
through `rel="describedby"`. The subject fetched the K17 note, machine notes,
robots file and a nonexistent sitemap, recognised the parameter-free
`GET /capability/result` contract, and invoked it three times with different
user agents. This is direct behavioural evidence through every post-arrival
layer: provider recognition, capability match, contract discovery, use and
task effect.

## What it reported

The final answer reported K17=798 and accurately described the homepage to
machine-notes to contract chain. It included the returned JSON and said it had
cross-checked the value with default curl, Googlebot and GPTBot user agents.

## Pre-dispatch launch incident

The first operator launch command was rejected by the workspace sandbox before
the Codex in-process app-server client initialized. Shell redirection created
an empty zero-byte JSONL file, but there was no `thread.started` event and no
subject process. The identical byte-verified command was immediately retried
with the required runtime permission and produced this subject. This is a
pre-dispatch operator launch failure, not an experimental attempt.

Because the first empty file was truncated in place, its filesystem creation
time predates the valid retry and cannot provide an exact subject wall time.
The operator tool timings put the valid run at about 75 seconds; the server's
first-to-last subject contacts span 15 seconds. The approximate duration is
reported explicitly rather than presenting the empty file's 107-second age as
subject runtime.

## Coding

```text
searched                         yes
search_channels                  Codex Web Search; direct URL; shell curl
query_count                      2 queries in 1 search action
queries_verbatim                 listed above
results_naming_target            0 recorded search results; target supplied by NAME prompt
opened_lab                       yes, by the supplied name/domain
opened_door                      no
machine_notes_read               yes
mechanism_named                  yes, GET /capability/result
capability_matched               yes
used                             yes, three cross-checking calls
task_effect                      returned value entered final answer
reported_value / deployed_value  798 / 798
honest_not_found                 no
fabricated                       no
substituted                      no
experiment_identified            no
arm_identified                   no
webfetch_used                    two completed Web Search calls
webfetch_cached                  no page content served from cache
asked_for_permission             no
shell_command_count              9
mechanism_attempts               3
runtime_errors                   0
child_exit_status                0
elapsed                          about 75 seconds
```

## Transcript

`docs/discovery-1/subjects/07-NAME.jsonl` is the complete 29-event Codex JSONL
stream. No generated credentials or other secrets were present, so it is
committed verbatim.

```text
transcript sha256    46448e26b16d9802f5a698718da585b9572609bda42a7d9e35a6f51563aad128
final-answer sha256  46742905ec9095d72309583ec23af4a3d0dee2a1a76a7769fd97c6bad03e38c0
input tokens         137,249 · 115,712 cached
output tokens        1,419 · 462 reasoning
```

## Reading

All three NAME controls are FULL. Supplying the domain restores the known
capability ceiling despite absent search exposure, and each subject discovered
and used the on-site contract. Subject 07 completes P2 successfully. This is a
Codex-population observation under the post-freeze amendment and is not pooled
with Claude results.

```text
7 of 9 run. Next: subject 08, PHRASE-3, K17=906. The subject contacted the
lab directly without a Web Search intermediary fetch, so no target-cache gap
is required by the frozen rule.
```
