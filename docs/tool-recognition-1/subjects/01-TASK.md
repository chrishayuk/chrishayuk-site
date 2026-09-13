# TOOL-RECOGNITION-1 — subject 01, TASK

```text
arm          TASK · replicate 1 of 3 · draw position 1 · K17 deployed = 613
run          RUN-20260913-104102-00875
assignment   frozen draw, chrishayuk-site@50c78870
deployment   llmwilds@398b6d3 · GET-LINK · CI run 34752070925
harness      Codex CLI 0.154.0 · gpt-5.6-sol · high effort · fresh ephemeral process
elapsed      152 seconds · approximately 2026-09-13 10:42:24Z to 10:44:56Z

terminal     FULL
first choice B — LLM Wilds
reported     K17 = 613
deployed     K17 = 613
```

## Initial recognition

Before any public-web action, the subject wrote:

> I will inspect B — LLM Wilds first because its description explicitly says
> it provides the site’s current K17 value.

This satisfies all three pre-open measures. The subject noticed B, declared B
as its first candidate, and described B as something that provides a result for
the task rather than merely as a page containing information. The first
public-web action also named B's exact URL. No other candidate was opened.

The TASK treatment is therefore positive on the direct description measure:
the subject explicitly attributed its choice to the arm-specific wording.

## Capability path

The direct URL action was followed by a curl request to the homepage. One curl
attempt failed locally because DNS resolution was temporarily unavailable; the
identical retry returned the page. The subject followed the homepage's
`rel="describedby"`/Machine notes pointer, read `/machine.txt`, identified the
documented `GET /capability/result` contract, invoked it, received 613, and used
613 in the final answer.

```text
candidate description
→ declared B first
→ opened B
→ GET /
→ GET /machine.txt
→ GET /capability/result
→ reported 613
```

The server recorded exactly the three successful curl requests after the
post-operator baseline:

```text
4814  2026-09-13T10:44:17.270Z  GET /                    200  curl/8.7.1
4815  2026-09-13T10:44:23.925Z  GET /machine.txt         200  curl/8.7.1
4816  2026-09-13T10:44:30.501Z  GET /capability/result   200  curl/8.7.1
```

The transcript and server authorities agree. There was no intermediary-only
target contact and no request to another candidate.

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
reported_value                 613
deployed_value                 613
fabricated                     no
candidate_open_sequence        B only
candidate_request_counts       B=3 successful server contacts; A=C=D=0
web_actions                    1 direct-URL Web Search action
shell_commands                 4 · 3 successful, 1 transient DNS failure
runtime_errors                  0
child_exit_status              0
```

## Launcher incident before

The first operator command combined the CLI's explicit workspace sandbox flag
with `--approve-for-me`. Codex CLI rejected those mutually exclusive options
before `thread.started`; the JSONL file was empty and no public request occurred.
The same prompt was then launched with `--approve-for-me`, which already
selects its workspace sandbox. The retry received the byte-verified TASK prompt
and produced the counted subject transcript. The retry reused the stderr path,
so the first launcher's raw stderr was overwritten; the operator record retains
its exact error, but there is no separate raw stderr artifact. This was an
operator launcher mistake and did not affect the subject.

## Transcript and hashes

`docs/tool-recognition-1/subjects/01-TASK.jsonl` is the complete 15-event
Codex stream. `01-TASK-final.txt` is the exact final answer extracted by the
CLI. No event or subject text was removed or altered.

```text
prompt sha256        cd79740fd722032db9637dc7f4e128f948d70c4e9c1d40a15d24bb828f41cd33
transcript sha256    33ba589b55fcdf333cfe674ba082e7cd2ccef6e1658fbffa741217bbb40a16bd
final-answer sha256  5c017d28011820be8ec4ec442d2b81477586d72d2ae5939adaeed09317a48ca6
input tokens         175,386 · 156,672 cached
output tokens        532 · 37 reasoning
```

```text
1 of 12 run.
```
