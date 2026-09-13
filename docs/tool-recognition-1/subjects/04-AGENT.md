# TOOL-RECOGNITION-1 — subject 04, AGENT

```text
arm          AGENT · replicate 1 of 3 · draw position 4 · K17 deployed = 299
run          RUN-20260913-113519-00893
assignment   frozen draw, chrishayuk-site@50c78870
deployment   llmwilds@5ac25a1 · GET-LINK · CI run 34754691344
harness      Codex CLI 0.154.0 · gpt-5.6-sol · high effort · fresh ephemeral process
transcript   approximately 2026-09-13 11:36:21Z to 11:37:10Z

terminal     FULL
first choice B — LLM Wilds
reported     K17 = 299
deployed     K17 = 299
```

## Initial recognition

Before any public-web action, the subject wrote:

> I will inspect B — LLM Wilds first because it explicitly offers automated
> visitors a documented way to obtain K17.

This satisfies all three pre-open measures. The subject noticed B, declared B
as its first candidate, and described B as a provider offering an automated
visitor mechanism. The first public-web action named B's exact URL. No other
candidate was opened.

## Capability path

One initial curl attempt failed locally because DNS resolution was temporarily
unavailable; the identical retry returned the homepage. The subject followed
the homepage's `rel="describedby"`/Machine notes pointer, read `/machine.txt`,
identified the documented `GET /capability/result` contract, invoked it,
received 299, and used 299 in the final answer.

```text
candidate description
→ declared B first
→ opened B
→ GET /
→ GET /machine.txt
→ GET /capability/result
→ reported 299
```

The server recorded four contacts after the post-operator baseline:

```text
5043  2026-09-13T11:36:19.525Z  GET /robots.txt           200  OAI-SearchBot/1.0
5044  2026-09-13T11:36:27.753Z  GET /                    200  curl/8.7.1
5045  2026-09-13T11:36:34.605Z  GET /machine.txt         200  curl/8.7.1
5046  2026-09-13T11:36:43.324Z  GET /capability/result   200  curl/8.7.1
```

The OAI-SearchBot request is an intermediary contact caused by the subject's
direct-URL Web Search action. It is not a subject page open and did not expose
content to the subject. The three curl requests are the subject's own complete
capability path. Transcript and server authorities otherwise agree.

## Coding

```text
noticed_target                 yes
first_candidate_declared       B
first_candidate_opened         B
recognised_from_description    yes · before opening
opened_target                  yes
recognised_as_capability       yes · before opening; confirmed by contract
matched_to_task                yes · before opening
read_contract                  yes
invoked                        yes · GET /capability/result, 200
used_result                    yes
reported_value                 299
deployed_value                 299
fabricated                     no
candidate_open_sequence        B only
target_contacts_delta          4 · 1 intermediary + 3 subject
subject_target_contacts        3
candidate_request_counts       B=3 subject requests; A=C=D=0
web_actions                    1 direct-URL Web Search action
shell_commands                 4 · 3 successful, 1 transient DNS failure
runtime_errors                 0
child_exit_status              0
```

## Operator enqueue incident before dispatch

The first Chuk enqueue contained a mistyped gate path. It was cancelled before
the run was marked running, before `thread.started`, and before any public-web
request. The corrected run above received the same frozen assignment and
prompt. The gate record preserves both Chuk run ids.

## Transcript and hashes

`docs/tool-recognition-1/subjects/04-AGENT.jsonl` is the complete 15-event
Codex stream. `04-AGENT-final.txt` is the exact final answer extracted by the
CLI. No event or subject text was removed or altered.

```text
prompt sha256        d96d28cfba2f3422fc124f4ef6d3e9907e7f09215a9e3ba4bed8a1b63bb78346
transcript sha256    7e3907d6e999c169e3e6fcd18e2f67b9ca057a100282db19f8588e23cad8c1c9
final-answer sha256  0dc3f050e09c28a2891056292ed971c2f9aef8c83d3a7cf278692bf8c729a074
input tokens         165,398 · 148,864 cached
output tokens        501 · 9 reasoning
```

```text
4 of 12 run.
```
