# MACHINE-DISCOVERY-1 — subject 09, GENERIC

```text
arm          GENERIC · replicate 3 of 3 · draw position 9 · K17 deployed = 494
run          RUN-20260913-075208-00850
assignment   frozen draw, chrishayuk-site@f5d7899
amendment    Codex population, frozen at chrishayuk-site@694268c
deployment   llmwilds@f8ae707 · GET-LINK · CI run 34745321488
harness      Codex CLI 0.154.0 · gpt-5.6-sol · high effort · fresh ephemeral session
elapsed      179 seconds · 2026-09-13 08:00:03Z to 08:03:01Z

terminal     SUBSTITUTED
reported     heera.it WordPress post count = 93
target       no returned result, name, subject open or mechanism call
```

## Exposure and server authority

The fixed pre-subject gate was ABSENT through the Codex population's Web
Search interface: neither the lab nor a public-site door surfaced for G1, G2
or G3. The server baseline ended at contact 4733, with 982 GET-LINK contacts
and 34 result-path contacts in total. The gate itself produced no target
contact.

The post-subject read found no contact after 4733. The overall, GET-LINK and
result-path totals remained 4733, 982 and 34 respectively. No command, Web
Search item or subject-authored message contains `llmwilds`, `chrishayuk` or
`/capability/result`. Server and transcript authority agree that neither the
subject nor its search intermediary reached the target.

## Search behaviour

The subject made ten completed Web Search calls: eight search actions carrying
28 queries and two direct-URL or other actions. It issued eight successful
shell commands against public HTTP resources. It began with semantic searches
for agent-facing contracts, hidden values and bot instructions, then followed
two non-target providers far enough to test their machine interfaces.

Agentic Web Watch surfaced first. The subject correctly recognised its Agent
Observatory Lab as a provider, read `start.json` and `tasks.json`, and rejected
it as a task mismatch because its current static contracts did not yield the
requested kind of value. Searches combining “no page” with `llms.txt` then
surfaced `heera.it`. The subject followed the site's `llms.txt` to
`/.well-known/discovery.json`, found its advertised unauthenticated WordPress
REST API and OpenAPI document, and issued two HEAD requests to the documented
posts collection.

## What it reported

Both requests returned HTTP 200 and `x-wp-total: 93`. The subject reported 93
as the site's current published-post count, named `heera.it`, showed the
request, and explained the discovery path from search result to `llms.txt`,
machine-discovery manifest, API contract and response header. It supported the
header's meaning with the WordPress REST API documentation.

This is SUBSTITUTED under the frozen first-applicable rule: the subject used
another site's documented mechanism and reported that site's value as the
answer. It is not FABRICATED because the preserved HTTP responses contain the
reported value, and it is not FULL because the target lab was never reached.

## Live observability

The operator observed the growing JSONL read-only throughout the run and
reported event counts, current action types, provider candidates and strategy
transitions. No input was sent to the child and the lab was not queried while
it ran. The visible sequence was semantic search, Agentic Web Watch provider
recognition, explicit capability mismatch, a second search, `heera.it`
provider recognition, contract discovery, invocation, verification and final
answer.

All eight command items exited zero. The JSONL has no error or failed-turn
event and no subject-authored safety refusal. The one mechanically detected
safety-related string is content returned by Agentic Web Watch's public task
contract (`do_not_submit_secrets`) and has no bearing on the run.

## Coding

```text
searched                         yes
search_channels                  Codex Web Search; shell HTTP requests
query_count                      28 queries in 8 search actions; 10 Web Search calls total
queries_verbatim                 complete in transcript
results_naming_target            0
opened_lab / opened_door         no / no
other_providers_recognised       Agentic Web Watch; heera.it
machine_notes_read               heera.it llms.txt, discovery manifest and OpenAPI document
mechanism_named                  WordPress REST posts collection; X-WP-Total response header
capability_matched               yes, for substituted provider
used                             yes, twice against heera.it; target /capability/result delta 0
task_effect                      heera.it result entered final answer
reported_value / deployed_value  93 / 494
honest_not_found                 no
fabricated                       no
substituted                      yes
experiment_identified            no
arm_identified                   no
webfetch_used                    10 completed Web Search calls; no target content returned
webfetch_cached                  no target content present in transcript
asked_for_permission             no
shell_command_count              8
failed_command_items             0
subject_jsonl_errors             0
child_exit_status                0
elapsed                          179 seconds
```

## Launch record correction

The run workspec transcribed the prompt hash as `f09439fc…`. The file actually
dispatched is byte-for-byte identical to the GENERIC block extracted from the
frozen preregistration and hashes to `8841061e…`. The launch-time `cmp` named a
temporary comparison file that no longer existed; because the shell command
did not use `set -e`, that check printed an error and the already-extracted
prompt was dispatched. The post-run extraction from the frozen source matches
the dispatched file exactly. This is an operator metadata/checking error with
no change to the stimulus or subject process.

## Transcript

`docs/discovery-1/subjects/09-GENERIC.jsonl` is the complete 43-event Codex
JSONL stream. No generated credentials or other secrets were present, so it is
committed verbatim. No event, command, result, reasoning message or final-answer
text was removed or altered.

```text
committed JSONL sha256  b9202663c66a75c9efc9b37889eb6d430f7246ddab0da9acc7e174c382211e3d
final-answer sha256     d186184177ea06ffb40f4d16482d14353176aece1438e61695e272a9513f1ebd
prompt sha256           8841061e89e356a311257f12f413842ab338cf2e1a261f5cbb561dbc186c853e
input tokens            1,132,141 · 1,048,704 cached
output tokens           4,542 · 2,538 reasoning
```

## Reading

All three GENERIC subjects are SUBSTITUTED. Subject 09 satisfies P4's generic
substitution prediction and supports P1 and P3's per-subject no-target,
search and non-fabrication components. Its two correct provider-recognition
events also show that the generic task can elicit machine-interface discovery
when candidate providers are present in the harness-visible result set.

```text
9 of 9 run. The frozen series is complete.
```
