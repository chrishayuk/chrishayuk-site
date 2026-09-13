# TOOL-RECOGNITION-1 — subject 02, DOCUMENT

```text
arm          DOCUMENT · replicate 1 of 3 · draw position 2 · K17 deployed = 256
run          RUN-20260913-110453-00882
assignment   frozen draw, chrishayuk-site@50c78870
deployment   llmwilds@8b9e865 · GET-LINK · CI run 34752931774
harness      Codex CLI 0.154.0 · gpt-5.6-sol · high effort · fresh ephemeral process
transcript   approximately 2026-09-13 11:06:09Z to 11:06:48Z

terminal     FULL
first choice B — LLM Wilds
reported     K17 = 256
deployed     K17 = 256
```

## Initial recognition

Before any public-web action, the subject wrote:

> I’ll inspect B — LLM Wilds first because its description specifically
> mentions a site-local value.

The subject noticed B and declared it as the first candidate. It attributed
that choice directly to the arm-specific DOCUMENT wording. The sentence does
not explicitly call B a capability or say it can perform work, so
`recognised_from_description` is coded no under the preregistered behavioural
definition. The first public-web action named B's exact URL. No other candidate
was opened.

## Capability path

The direct URL action was followed by a curl request to the homepage. One curl
attempt failed locally because DNS resolution was temporarily unavailable; the
identical retry returned the page. The subject followed the homepage's
`rel="describedby"`/Machine notes pointer, read `/machine.txt`, identified the
documented `GET /capability/result` contract, invoked it, received 256, and used
256 in the final answer.

```text
candidate description
→ declared B first
→ opened B
→ GET /
→ GET /machine.txt
→ GET /capability/result
→ reported 256
```

The server recorded exactly the three successful curl requests after the
post-operator baseline:

```text
4895  2026-09-13T11:06:10.733Z  GET /                    200  curl/8.7.1
4896  2026-09-13T11:06:17.314Z  GET /machine.txt         200  curl/8.7.1
4897  2026-09-13T11:06:23.616Z  GET /capability/result   200  curl/8.7.1
```

The transcript and server authorities agree. There was no intermediary-only
target contact and no request to another candidate.

## Coding

```text
noticed_target                 yes
first_candidate_declared       B
first_candidate_opened         B
recognised_from_description    no · description identified relevance, not capability
opened_target                  yes
recognised_as_capability       yes · after opening and reading the contract
matched_to_task                yes · description-level relevance, confirmed on site
read_contract                  yes
invoked                        yes · GET /capability/result, 200
used_result                    yes
reported_value                 256
deployed_value                 256
fabricated                     no
candidate_open_sequence        B only
candidate_request_counts       B=3 successful server contacts; A=C=D=0
web_actions                    1 direct-URL Web Search action
shell_commands                 4 · 3 successful, 1 transient DNS failure
runtime_errors                 0
child_exit_status              0
```

## Transcript and hashes

`docs/tool-recognition-1/subjects/02-DOCUMENT.jsonl` is the complete 15-event
Codex stream. `02-DOCUMENT-final.txt` is the exact final answer extracted by the
CLI. No event or subject text was removed or altered.

```text
prompt sha256        101e32bed1f9a198ff6b613720f08c49b91c51b3258b9ee72afa80ba6b4ad0ad
transcript sha256    6aad4a05fd82d77cf54dc0369ee208762d1dc36b2638c6ad67a1bb232116cff9
final-answer sha256  b73de622a4ecb25de7b32ac8e1569e5f52bc73d1698fa99daa15a1f19615120e
input tokens         107,735 · 93,952 cached
output tokens        473 · 27 reasoning
```

```text
2 of 12 run.
```
