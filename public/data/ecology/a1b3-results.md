Changing the BOARD input changed action requests, but none of 768 inputs elicited posting or delegation; useful live consumption was not tested.

Retrospective server import on 2026-09-12. Original Git registration and completion snapshots are included in the evidence bundle; this server entry was created after the run.

# A1B3 — BOARD input affects READ requests; externalisation remains absent

**DIAGNOSTIC-COMPLETE**, 2026-09-12. Registration, all 768 inputs, instrument and analysis
frozen at `048d74d` before inference. The descriptive expressibility screen is
**BEHAVIOUR-DISQUALIFIED**: zero POST or DELEGATE. No live world, rate check or paired
payoff test was part of this diagnostic, and none ran.

## Main result

| Quantity | Result |
|---|---:|
| Unique observations / inference calls | 768 / 768 |
| Full-response parse rate | 1.00 |
| Parsed non-WAIT rate (offline proxy) | 1.00 |
| WORK | 365 |
| READ | 403 |
| POST + DELEGATE | **0** |
| Parse refusals / infrastructure failures / cost breaches | 0 / 0 / 0 |

**Changing only BOARD from empty to m0 switched WORK to READ in 365/384 matched pairs
(95.05%).** The remaining 19 pairs were READ in both conditions. All 384 populated-board
inputs returned `READ m0`. Unlike A1B2, this BOARD comparison fixes GOAL, KNOWN, RES,
HOLD and CTX within each pair. It therefore isolates sensitivity to the submitted BOARD
field on this grid; it does not identify the model's motives or sensitivity to realised payoff.

All 192 populated-board inputs with the own-goal hint already known still returned READ.
Adding the own-goal hint changed the verb in only 19/384 matched pairs, all with an empty
board: READ -> WORK in 15 and WORK -> READ in 4. It did not interrupt the all-READ pattern
with a populated board. Increasing RES from 0 to 7 changed READ -> WORK in 11/384 pairs.

The 365 WORK requests all targeted the assigned GOAL. Of the 19 empty-board READ requests,
18 named m0 and one named m1 (`g0_b0_k04_r0_h3`). Neither target is readable on an empty
board. Thus a READ request must not be reported as successful information consumption.

## Design and interpretation limits

The full crossing was four GOAL ids x two BOARD states x all 16 literal KNOWN subsets x
two RES values (0,7) x three legal held hints, with CTX fixed at 600. Every rendered input
was unique. HOLD != GOAL is the only restriction; goal contrasts below hold absolute HOLD
fixed and exclude illegal changes. Fixed hash ordering interleaved cells through the run.

The same qwen3.5:9b digest, Q4_K_M quantization, Ollama 0.33.3 version, template, defaults,
temperature 0 and thinking-disabled settings matched A1B2 and stayed unchanged through
the run. The shared 987-byte system prompt was not edited. Only one exact observation
overlapped A1B2 (`g1_b1_k02_r0_h2`). This was a prospective follow-up designed after
A1B2, not a blind replication or an estimate of a size/training effect.

Some Cartesian states are unreachable in the registered live world, whose seeded board
never becomes empty. CTX did not vary; BOARD varied only between empty and m0. These
finite textual contrasts do not establish global response rules, live action rates,
useful consumption, public-goods motives, or rejection of an obvious contribution payoff.
Repeated use of cells across contrasts does not create independent replications.

The bounded negative result is **no externalisation elicited across this frozen orthogonal
input set under this configuration**. It does not show that instruct models cannot
cooperate, or that a collaboration-trained model would behave differently. Incentives,
model training/configuration and their interaction remain competing hypotheses.

## All prespecified matched contrasts

Each direction is first level -> second level. Unlisted transitions have count zero.
Every externalising-fraction delta is 0. Full raw-reply changes and marginals are in the JSON.

| Contrast | Pairs | WORK -> READ | READ -> WORK | READ -> READ | WORK -> WORK |
|---|---:|---:|---:|---:|---:|
| BOARD empty -> m0 | 384 | 365 | 0 | 19 | 0 |
| Own-goal hint absent -> present | 384 | 4 | 15 | 192 | 173 |
| RES 0 -> 7 | 384 | 0 | 11 | 196 | 177 |
| KNOWN t0 absent -> present | 384 | 12 | 7 | 192 | 173 |
| KNOWN t1 absent -> present | 384 | 2 | 17 | 192 | 173 |
| KNOWN t2 absent -> present | 384 | 2 | 17 | 192 | 173 |
| KNOWN t3 absent -> present | 384 | 3 | 16 | 192 | 173 |
| Non-own hint additions, pooled | 1152 | 15 | 42 | 576 | 519 |
| GOAL t0 -> t1, legal fixed HOLD | 128 | 0 | 6 | 65 | 57 |
| GOAL t0 -> t2, legal fixed HOLD | 128 | 0 | 4 | 65 | 59 |
| GOAL t0 -> t3, legal fixed HOLD | 128 | 0 | 4 | 64 | 60 |
| GOAL t1 -> t2, legal fixed HOLD | 128 | 0 | 1 | 68 | 59 |
| GOAL t1 -> t3, legal fixed HOLD | 128 | 0 | 2 | 66 | 60 |
| GOAL t2 -> t3, legal fixed HOLD | 128 | 0 | 1 | 66 | 61 |

## Validation and cost

Ten zero-inference tests passed before inference, covering the inherited admissibility
and response contract plus factorial completeness, rendering, matched field isolation,
synthetic board-only/own-hint-only policies, externalisation direction, and missing cells.
The completed raw transcript was reparsed with the engine parser and all screen and
matched results recomputed. An independent grouping by rendered fields reproduced all
384 BOARD pairs and their transition counts. Frozen source/input/parser hashes agreed.

768 calls, 3072 generated tokens, **974.06 seconds (16.23 minutes)** elapsed; maximum
request 9.87 s, maximum visible response 7 UTF-8 bytes, zero hidden-thinking bytes.
Host load varied during the run; no retry, timeout extension or output cap change occurred.
The 30-minute limit held. All seven foreign tracked files retained their starting bytes.

## Implication for the next mechanism test

The observation-confounding explanation no longer accounts for the matched BOARD effect
on this grid. But a preference for issuing READ is not evidence of public-information
utility or a learned individualist objective. Before comparing model training variants,
validate a **contribution-specific** counterfactual.

Code inspection of A1B's existing reward control found that its scripted agent posts a
hint but then reads the pre-existing **m0** seed. Its new post is not the message supplying
the measured reward. That control remains valid for reader-versus-worker payoff, but does
not isolate the marginal benefit of POST. The current prompt also supplies no explicit
private-resource or population objective. These limits, mortality, and seed/entrant removal
designs are recorded in [the hypothesis note (in evidence bundle)](https://drive.google.com/file/d/10KDcGEqGI90eBRueXSaAqQ5RL5DOZx9B/view).
No new experiment or model-class comparison is registered by this result.

## Evidence

- [Full result and matched tables](https://drive.google.com/file/d/1nApqzPuX4gdwwLMjF0lh4YMKCOoaoLtb/view)
- [Raw observation/response transcript (in evidence bundle)](https://drive.google.com/file/d/10KDcGEqGI90eBRueXSaAqQ5RL5DOZx9B/view)
- [Pre-inference model and source provenance (in evidence bundle)](https://drive.google.com/file/d/10KDcGEqGI90eBRueXSaAqQ5RL5DOZx9B/view)
- [All frozen inputs (in evidence bundle)](https://drive.google.com/file/d/10KDcGEqGI90eBRueXSaAqQ5RL5DOZx9B/view), [manifest (in evidence bundle)](https://drive.google.com/file/d/10KDcGEqGI90eBRueXSaAqQ5RL5DOZx9B/view)
- [Completed-run audit (in evidence bundle)](https://drive.google.com/file/d/10KDcGEqGI90eBRueXSaAqQ5RL5DOZx9B/view)
- [Registration (in evidence bundle)](https://drive.google.com/file/d/10KDcGEqGI90eBRueXSaAqQ5RL5DOZx9B/view)


## Server records and downloadable evidence

Bundled-file links open the archive; its manifest preserves relative filenames and per-file hashes.

- [qwen3.5:9b — run and metrics](https://chuk-experiments-server.fly.dev/#/runs/RUN-20260912-163057-00761); [result JSON](https://drive.google.com/file/d/1nApqzPuX4gdwwLMjF0lh4YMKCOoaoLtb/view).
- [Complete evidence bundle](https://drive.google.com/file/d/10KDcGEqGI90eBRueXSaAqQ5RL5DOZx9B/view).
