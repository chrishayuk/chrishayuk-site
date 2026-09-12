# A1B7 — chronological and causal notes both elicit POST

**DIAGNOSTIC-COMPLETE. The registered payoff-specific causal-wording prediction was
not supported.** All twelve annotated inputs elicited valid POST, whether the connector
was After or Because and whether the source history returned zero or six resources.
Both original raw-history anchors reproduced. Unannotated factual summaries behaved
differently from raw histories, and receipt inclusion restored the raw zero-return choice.

Canonical record: [ecology-culture-a1b7](https://chuk-experiments-server.fly.dev/#/experiments/ecology-culture-a1b7).
Run: `RUN-20260912-181123-00801`. Original registration: `b10d509`; pre-inference checker
amendment: `fe1fb23`. All 18 exact model inputs remained unchanged through the amendment.

## Complete response table

Every POST below is executed, valid `POST t1:h`; every WORK is `WORK t0`.

| Representation | Genuine historical return | No note | Chronological: After | Causal: Because |
|---|---:|---|---|---|
| Raw events | 0 | POST | POST | POST |
| Raw events | 6 | WORK | POST | POST |
| Factual summary | 0 | WORK | POST | POST |
| Factual summary | 6 | WORK | POST | POST |
| Summary plus receipt events | 0 | POST | POST | POST |
| Summary plus receipt events | 6 | WORK | POST | POST |

The mean causal-minus-chronological valid-POST contrast is **0 useful** and **0 inert**.
Their difference, the registered payoff-specific annotation contrast, is also **0**.
The prediction required both the useful contrast and its difference from inert to be
positive; it was not supported. No favourable note-versus-none comparison replaces it.

All six individual After/Because pairs produced identical replies. All eighteen responses
parsed and executed in first-action validation: POST 14, WORK 4, no refusal or other verb.
This validation did not run new full payoff/adoption episodes.

## Matched representation and annotation observations

Without a note, compressing the zero-return raw history changed POST to WORK; adding the
two factual receipt events to that summary restored POST. The positive-return history
remained WORK in all three unannotated representations. Thus receipt inclusion mattered
for this particular zero-return input but did not produce positive-payoff adoption.

Adding either note changed all three positive-return choices from WORK to POST. It also
changed the unannotated zero-return summary from WORK to POST. The other two zero-return
representations already chose POST. Both note variants ended at POST everywhere, including
after zero settlement, so this is not selective response to the positive payoff.

The raw/no-note cells exactly reused A1B5's first exposed requests. They reproduced POST
inert and WORK useful, matching A1B5 and A1B6's anchor checks. All eighteen cells kept the
original A1B5 system prompt, objective, model/settings and fresh current observation.
There was no new counterfactual or external-adjustment framing.

## What the wording contrast does and does not establish

The note was `a0 posted t1:h. After a1 read that message and worked t1, a0 received an
additional N resources.` Its causal counterpart changed only **After** to **Because**.
N was the genuine recorded contribution settlement, zero or six. Both source histories
were actual scripted-world executions, with recipient provenance and settlement verified;
neither was a fabricated reward trajectory or the model's own earlier action.

Explicit Because wording supplied **no incremental effect over the matched After wording**
on this finite panel. That is narrower than claiming causal explanations never matter:
the chronological statement already links contribution, recipient use and a later receipt,
and may invite causal inference. Both notes also repeat action content and make the
sequence more salient. Priming, repetition, narrative coherence and inferred causality
are not separated by this result. No peer independently generated the explanation.

The experiment identifies response differences under specified memory representations,
not rational reward attribution, learned weights, autonomous cultural transmission or a
model-training class. There is one genuine source pair, one checkpoint and one response
per cell. The eighteen inputs are not independent-agent replicates or population estimates;
zeros do not establish equivalence outside this grid. Nor does receipt inclusion prove
which fields are generally necessary or sufficient to preserve a policy under compression.

## Exploratory cross-run comparison, outside the registered contrasts

A post-run audit found that the two unannotated factual-summary user inputs are identical
to A1B6's POST-history summary user inputs at totals 2 and 8. A1B6's system additionally
contained its common counterfactual/external-adjustment clarification. A1B6 returned POST
for both; A1B7 returned WORK for both. This highlights a framing candidate for a successor,
but it is a **post-hoc cross-run comparison**, not a concurrently registered framing test.
The old summary requests were not rerun here, and temporal or inference variability is
not eliminated by the reproduced raw anchors. Do not claim that summaries invariably
cause imitation or that the clarification's particular words have been isolated.

## Verification, amendment and chronology

The server design was registered at 18:07:27 UTC on 2026-09-12; exact registration, inputs
and source were uploaded/hash-verified at 18:12:01 UTC, before checks or inference.
The initial gates passed 16/17. The label checker falsely flagged `inert` in the shared
original system's seed/invalid-hint description. This was a checker defect, not a leaked
payoff label. The failed result was retained as `a1b7_gates_initial.json`, uploaded, and
recorded as a failed numeric metric before any model calls.

The amendment restricts that check to varying user input; the separate byte-identical
system check remains in force. Original failed gates, original source and amended source
are all durable server artifacts. The amendment upload was verified at 18:18:07 UTC and
corrected **17/17 gates** were uploaded/verified at 18:49:08 UTC. Exact input-file SHA-256
remained `d4b43348c5c508033f45284ab6eecd03153ce5f487de23f274f0560b6ec960b2`.

Inference ran 18:51:25–18:51:47 UTC: **18 calls, 22.60 seconds, 86 generated tokens**.
Qwen `qwen3.5:9b`, digest
`6488c96fa5faab64bb65cbd30d4289e20e6130ef535a93ef9a49f42eda893ea7`,
Ollama 0.33.3, temperature 0, thinking disabled, no context/output cap overrides. Metadata
matched before/after; maximum reply nine bytes; no thinking, retry, transport error or
parse/execution refusal. The pinned A1B5 clean binary was reused without engine changes.

The audit matched all frozen requests to raw calls, replayed all eighteen first actions,
verified all six After/Because-only pairs, recomputed the primary contrasts and checked
source hashes and prospective chronology. No additional model inference ran. Result SHA-256:
`2052b3c482e616840de9e28a3e7ed45945936e774e184aba021a741a7bc4142e`.

The canonical server holds numeric metrics, complete requests/responses, both gate results,
source/amendment bundles, audit, write-up and conclusion. Local receipt: `a1b7_server.json`.
No model-class comparison or successor is registered by this outcome.


Downloadable evidence:

- [a1b7-preregistration](https://drive.google.com/file/d/1SrsAEifwUjs__4CDgwXRSjciAb3PaTIJ/view)
- [a1b7-frozen-source](https://drive.google.com/file/d/1dUqXU5tRMLgZEM1-VAuhTqAcY_HtuJdD/view)
- [a1b7-initial-gate-failure](https://drive.google.com/file/d/1Lg0QV42pFto9plWKMQR_3ZJ8o2GChMbQ/view)
- [a1b7-gate-amendment-source](https://drive.google.com/file/d/1keMtJjQlrMw1_cjzu17rnTi5H5vDeh_1/view)
- [a1b7-gates](https://drive.google.com/file/d/1NkDwws5s7l3PhvnVpbyNT4y2aspJ1Hvs/view)
- [a1b7-detailed-result](https://drive.google.com/file/d/1NaMUAMBTXSg8MkkYFkXq-l6t-ubAFUe_/view)
- [a1b7-results-note](https://drive.google.com/file/d/1B3yVmslcvPRChMC8sUn43M_XEaCqtACc/view)
- [a1b7-evidence-bundle](https://drive.google.com/file/d/1ibFfD4EipoA87T9uMQJxyW9Fa8Gc9anV/view)
