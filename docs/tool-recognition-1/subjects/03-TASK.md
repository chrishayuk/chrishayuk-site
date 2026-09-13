# TOOL-RECOGNITION-1 — subject 03, TASK

```text
arm          TASK · replicate 2 of 3 · draw position 3 · K17 deployed = 678
run          RUN-20260913-112210-00886
assignment   frozen draw, chrishayuk-site@50c78870
deployment   llmwilds@3369ceb · GET-LINK · CI run 34754091199
harness      Codex CLI 0.154.0 · gpt-5.6-sol · high effort · fresh ephemeral process
transcript   approximately 2026-09-13 11:22:45Z to 11:23:30Z

terminal     FULL
first choice B — LLM Wilds
reported     K17 = 678
deployed     K17 = 678
```

## Initial recognition

Before any public-web action, the subject wrote:

> I will inspect B — LLM Wilds first because its description explicitly says
> it provides the site’s current K17 value.

This satisfies all three pre-open measures. The subject noticed B, declared B
as its first candidate, and described B as providing the task result. The
first public-web action named B's exact URL. No other candidate was opened.

The TASK treatment is positive on the direct description measure: the subject
explicitly attributed its choice and capability interpretation to the
arm-specific wording.

## Capability path

One initial curl attempt failed locally because DNS resolution was temporarily
unavailable; the identical retry returned the homepage. The subject followed
the homepage's `rel="describedby"`/Machine notes pointer, read `/machine.txt`,
identified the documented `GET /capability/result` contract, invoked it,
received 678, and used 678 in the final answer.

```text
candidate description
→ declared B first
→ opened B
→ GET /
→ GET /machine.txt
→ GET /capability/result
→ reported 678
```

The server recorded exactly the three successful curl requests after the
post-operator baseline:

```text
4969  2026-09-13T11:22:52.166Z  GET /                    200  curl/8.7.1
4970  2026-09-13T11:22:58.776Z  GET /machine.txt         200  curl/8.7.1
4971  2026-09-13T11:23:05.684Z  GET /capability/result   200  curl/8.7.1
```

The transcript and server authorities agree. There was no request to another
candidate.

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
reported_value                 678
deployed_value                 678
fabricated                     no
candidate_open_sequence        B only
candidate_request_counts       B=3 successful server contacts; A=C=D=0
web_actions                    1 direct-URL Web Search action
shell_commands                 4 · 3 successful, 1 transient DNS failure
runtime_errors                 0
child_exit_status              0
```

## Transcript and hashes

`docs/tool-recognition-1/subjects/03-TASK.jsonl` is the complete 15-event
Codex stream. `03-TASK-final.txt` is the exact final answer extracted by the
CLI. No event or subject text was removed or altered.

```text
prompt sha256        cd79740fd722032db9637dc7f4e128f948d70c4e9c1d40a15d24bb828f41cd33
transcript sha256    2430934818d490f107cf676efe8e6e0b68c08e897c4aafab0f5b8143271561fe
final-answer sha256  2977d26fb29ee137c73b29c20edf347fb6d3c45283590c3718c4fd7d6d15018c
input tokens         170,531 · 152,960 cached
output tokens        536 · 25 reasoning
```

```text
3 of 12 run.
```
