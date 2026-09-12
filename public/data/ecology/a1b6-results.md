# A1B6 — summaries follow demonstrated action; original anchors reproduce

**DIAGNOSTIC-COMPLETE. The registered number-driven prediction was not supported.**
Across the four counterfactual summary inputs, Qwen chose POST after POST/WORK/WORK and
WORK after WORK/WORK/WORK, at both previous resource totals. Both original A1B5 raw-history
anchor replies reproduced exactly. This distinguishes a summary response pattern from
the earlier raw-history pattern, without identifying the underlying learning mechanism.

Canonical record: [ecology-culture-a1b6](https://chuk-experiments-server.fly.dev/#/experiments/ecology-culture-a1b6).
Run: `RUN-20260912-173910-00796`. Prospective registration and exact inputs: `51bbb61`.

## Four-cell result

Every cell has the same fresh current observation and one deterministic-temperature call.

| Demonstrated donor actions | Previous final RES 2 | Previous final RES 8 |
|---|---|---|
| POST t1:h, WORK t0, WORK t0 | POST t1:h | POST t1:h |
| WORK t0, WORK t0, WORK t0 | WORK t0 | WORK t0 |

On the registered parsed-POST indicator, the finite resource effect (high minus low,
averaged across histories) is **0**; action-history effect (POST history minus WORK history,
averaged across totals) is **+1**; interaction is **0**. Both within-history high-minus-low
contrasts are zero. The exact prediction, POST at both low totals and WORK at both high
totals, is false. These are four individual inputs, not a sample estimating a population
effect. Zero is not evidence of equivalence across untested histories or models.

Both factorial POSTs were valid `POST t1:h`. All six responses, including the anchors,
parsed and executed when validated as the first action in the unchanged fresh world.
No full payoff episode or new adoption trajectory ran in A1B6.

## Original A1B5 inputs remain reproducible

| Exact original first-decision request | A1B5 reply | A1B6 reply |
|---|---|---|
| Exposed inert: raw POST/WORK/WORK history, no delayed return | POST t1:h | POST t1:h |
| Exposed useful: raw POST/WORK/WORK history, return six | WORK t0 | WORK t0 |

The two checks reused the original complete requests, including system prompt, raw
event-history text, fresh observation and inference settings. They bracketed the four
new summary calls. Thus the original response reversal reproduced during this diagnostic.

In particular, the high-total POST summary elicited POST, whereas the original raw
positive-return history elicited WORK. Several features change together between these
presentations: intermediate event/receipt information is omitted, a summary replaces
the full history, and a common counterfactual/external-adjustment clarification is added.
The anchors do not isolate which of those changes caused the difference.

## Integrity of the counterfactual

WORK/WORK/WORK genuinely earns **3**, not 2 or 8, in the original micro-world. The four
factorial cells are explicitly labelled **controlled counterfactual summaries**, whose
final totals include any external resource adjustments. They are assigned diagnostic
inputs, never represented as genuine A1B4/A1B5 reward trajectories. No impossible peer
event sequence or invented measured reward was supplied. Only donor actions and final
total are shown; the current world state remains identical.

That clarification matters for interpretation: the model may disregard externally
adjustable totals precisely because they are not reliable evidence of action value.
This assay therefore does **not** show that Qwen ignores genuinely earned rewards. It
also does not refute resource-history sensitivity in A1B5, whose original anchors still
show it. It rejects only the registered simple low/high-total pattern on these four
counterfactual summary inputs.

The observed action-history pattern is consistent with imitation, first-action copying,
or token priming, but those mechanisms were not separated. No causal understanding,
rational payoff learning, model-training class, autonomous culture, or general success/
failure strategy has been identified. A1B3 still established BOARD-sensitive READ requests,
not useful LLM consumption. A1B5 remains the demonstration of model contribution after
supplied experience in the separate live micro-world.

## Verification and chronology

Server design registered at 17:33:48 UTC on 2026-09-12. Registration, source and exact six
inputs were uploaded and hash-verified at 17:39:42 UTC before the zero-inference checks.
All **13/13 gates passed**: anchor identity, six unique requests, exact factorial crossing,
only two differing fields, common system/provenance label, fixed current state, pinned
world binary, actual WORK-only baseline, full-response refusals and synthetic scoring
patterns. Gates were uploaded and verified at 17:58:27 UTC before model inference.

Inference ran 17:58:58–17:59:08 UTC: **6 calls, 10.06 seconds, 27 generated tokens**.
Qwen `qwen3.5:9b`, digest
`6488c96fa5faab64bb65cbd30d4289e20e6130ef535a93ef9a49f42eda893ea7`,
Ollama 0.33.3, temperature zero, thinking disabled, no context/output cap overrides.
Metadata matched before/after; maximum reply nine bytes; no thinking, retries, transport
errors or parse/execution refusals. The A1B5 clean binary hash was verified and its durable
source/build provenance retained; no engine changes or rebuild were needed.

The post-run audit matched all frozen inputs to complete saved calls, replayed all six
first actions, independently recomputed the factorial main effects, and checked source
hashes and prospective chronology. No additional inference ran. Result SHA-256:
`de944594fd33a6ffbe0bc128a0542d397ce28f484f2e19daef1188bc908b616e`.

The canonical server stores queryable metrics, complete requests/responses, gates, audit,
source, this write-up and the conclusion. Local receipt: `a1b6_server.json`.
Any successor should isolate presentation/provenance cues before interpreting the
response as payoff attribution; no further run or model-class comparison is registered.


Downloadable evidence:

- [a1b6-preregistration](https://drive.google.com/file/d/1A4Tb1cuy4zgN-cs7I5Go1KfpjOpbTKbN/view)
- [a1b6-frozen-source](https://drive.google.com/file/d/1hxco-RRRYLutkv8pmiSoiPF5Q1ttELo9/view)
- [a1b6-gates](https://drive.google.com/file/d/1dpdI5c3B5pzzimVlgvVz1jmJ1nGXKMDT/view)
- [a1b6-detailed-result](https://drive.google.com/file/d/1utvc81NSY1OiuPlcsf0j4YyM27KN9kzN/view)
- [a1b6-results-note](https://drive.google.com/file/d/16nRXoMm-PLXlWfNuXdKIs9YxK4jY7gh2/view)
- [a1b6-evidence-bundle](https://drive.google.com/file/d/17350xqBwUNGeVuJTGMhOuyycf1p2Se4t/view)
