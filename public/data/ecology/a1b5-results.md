# A1B5 — posting after unrewarded experience, absent after rewarded experience

**ASSAY-COMPLETE; registered prediction not supported, with a negative contrast.**
Qwen made no spontaneous POST in either discovery session. After the supplied scripted
episode it posted once per fresh episode in inert, but never in useful. Thus this
interface elicited valid contribution, but the expected direction of payoff response
was reversed in this small deterministic pilot.

Canonical record: [ecology-culture-a1b5](https://chuk-experiments-server.fly.dev/#/experiments/ecology-culture-a1b5).
Run: `RUN-20260912-171942-00785`. Frozen registration/instrument: `edda243`.

## Measured result

| Condition | Model verb mix | Timely valid POST / decisions | Final RES by fresh episode | Fresh episodes receiving return |
|---|---|---:|---|---:|
| Discovery, inert | WORK 9 | 0/9 | 3, 3, 3 | 0/3 |
| Discovery, useful | WORK 9 | 0/9 | 3, 3, 3 | 0/3 |
| Supplied experience, inert | POST 3, WORK 6 | 3/9 | 2, 2, 2 | 0/3 |
| Supplied experience, useful | WORK 9 | 0/9 | 3, 3, 3 | 0/3 |

All three model-generated posts were executed `POST t1:h`, on the first round of their
episodes. No READ, VERIFY, DELEGATE, WAIT or refusal occurred. Parse rate **1.00** and
**actual world execution rate 1.00**, rather than the old offline non-WAIT proxy.

Registered primary, useful minus inert exposed timely-valid-POST fraction:
**0/9 − 3/9 = −0.333333**, or −33.3 percentage points. This is opposite the predicted
positive contrast. The episode view is 0/3 versus 3/3 episodes containing a timely post;
these are dependent repeated opportunities in one session per condition, not independent
model replicates or population estimates. No significance test was registered or applied.

The first fresh exposed decision already differed: **POST t1:h after zero return;
WORK t0 after return six**. Current OBS and all non-resource history fields matched.
The only five differing entries in the two supplied event records were donor RES
before/after events downstream of the return. Later decisions additionally depend on
the model's own different histories, so the nine-decision contrast is a session-policy
effect, not nine isolated interventions on the same input.

All nine discovery decision pairs had byte-identical full requests and identical WORK
replies. Neither encountered a positive return. By contrast, all nine exposed-useful
decisions had the positive return available in their supplied history; none generated
POST. Across the full run, no identical-request group produced different replies.

## What the assay tested

The user requested separate spontaneous discovery and adoption after controlled experience.
The four sessions use the exact A1B4 micro-world with its scripted recipient. Each fresh
episode resets all state, including board, resources and once-only settlement, and offers
another contribution opportunity. The model retains a neutral chronological event record.
It receives an explicit objective: maximise the sum of its final resources over three
fresh episodes. This prompt/history interface differs from A1B3's terse offline screen.

Both exposed sessions first receive the **same scripted POST/WORK/WORK episode**, clearly
identified as environment-supplied experience rather than the model's own earlier choice.
The scripted donor finishes with RES 2 inert / 8 useful. Only the delayed return differs;
the script's reward is excluded from the subsequent test score and current RES resets
to zero in both. A recipient must actually read and use a valid donor hint before the
return can settle. The amount and arm identity are not disclosed in the prompt.

The inert model posts did publish valid hints that the scripted recipient subsequently
read and used. **Model contribution is therefore now demonstrated in this interface.**
This is contribution after supplied experience, not spontaneous discovery, useful-arm
payoff optimisation, or autonomous collaboration by both agents. There was no LLM reading
in this pilot; A1B3 still only demonstrates BOARD-sensitive READ requests.

## Interpretation boundary

The positive-payoff-adoption prediction is not supported. The supplied positive history
did not elicit contribution, while the otherwise matched zero-return history did. In
this finite pair the policy is sensitive to resource-history differences, but the direction
does not establish rational payoff learning. It is not evidence that the model dislikes
reward, that incentives generally suppress collaboration, or that a training class is
responsible. History-number cues, imitation interacting with those cues, objective handling
and other interface mechanisms have not been separated.

The absence of discovery remains **no positive payoff exposure**, not rejection after
learning. The exposed-useful absence has a different evidential status: the return was
present in the supplied record, but adoption did not follow. Available history is not
proof that the model understood its causal structure. There is no weight update or claim
of durable learning. Three episodes do not establish sustained behaviour or culture.

No larger-model ladder or model-class comparison ran. A1B's original paired primary,
context mortality, and an autonomous two-model ecology remain unmeasured. A successor
should first distinguish payoff attribution from history/number effects with separately
registered controls; do not tune this prompt or reinterpret the negative contrast as a pass.

## Verification, chronology and durable evidence

Server design created at 17:13:06 UTC on 2026-09-12. Exact registration and frozen source
uploaded and hash-verified at 17:20:19 UTC, before the clean build and zero-inference checks.
All **11/11 gates passed**, including byte-identical A1B4 World code and exact reproduction
of its nine saved positive/negative traces, delayed return, reset opportunities, exposure
isolation, whole-response refusals and synthetic scoring branches. Gates and build
provenance were uploaded and verified at 17:22:25 UTC, before inference.

Inference ran 17:23:53–17:24:57 UTC: **36 calls, 64.41 seconds, 147 generated tokens**.
Model `qwen3.5:9b`, digest
`6488c96fa5faab64bb65cbd30d4289e20e6130ef535a93ef9a49f42eda893ea7`,
Ollama 0.33.3, temperature 0, thinking disabled, no context/output-limit overrides.
Maximum reply nine bytes; zero thinking, transport errors or retries. Model/server metadata
matched before/after. The source was built from a clean archive with A1B4's saved lockfile;
concurrent EX-8 and eco1 work was excluded.

A post-run audit reconstructed all 36 requests and executed action prefixes, matched
complete saved sessions and scores, checked the first exposed pair's five resource-only
differences, and verified frozen source hashes and prospective chronology. No additional
model calls were made. The upload helper's structured-metric JSON encoding was corrected
after inference; the prompt, driver, adapter and scoring were unchanged. Both the original
frozen helper and corrected upload helper are retained in the evidence bundles.

Server evidence contains the frozen source/registration, gate and build records, full
requests/responses, world traces, audit, numeric endpoints and this write-up. Local receipt:
`a1b5_server.json`; full result: `a1b5_assay.json`; raw calls: `a1b5_calls.jsonl`.
The result SHA-256 is
`4abaeb4546c165d4795f61299e3928257eb47dcd5f0a6481521b2838a6f99afd`.


Downloadable evidence:

- [a1b5-preregistration](https://drive.google.com/file/d/1R_V9I6RLDjQBuMIfX5puschUjrIhoaW1/view)
- [a1b5-frozen-source](https://drive.google.com/file/d/1v4Pw9sMofbNggX7dJzfWJeD81TgEGnHl/view)
- [a1b5_gates](https://drive.google.com/file/d/1S-M7RQFk4RiRdxW5dKX7fv04RRKq-zSB/view)
- [a1b5_build](https://drive.google.com/file/d/1vI0XGQu79113p6kTdIjRDEZrpIeXK2L5/view)
- [a1b5-detailed-result](https://drive.google.com/file/d/1V1BvSy7Y5uJOMDztHiQkyKXuPBhD_mfI/view)
- [a1b5-results-note](https://drive.google.com/file/d/1uMy5NT50mirksCSYNikU-yE09hTMcWHx/view)
- [a1b5-evidence-bundle](https://drive.google.com/file/d/1mRAOZpo6z3JTF5HrdYwtC1hZ63hXX0X3/view)
