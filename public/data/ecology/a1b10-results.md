# A1B10 — identity framing changes action in prose, not structured records

The registered representation-robust self/peer prediction was **not supported**.
The self-framed prose elicited `POST t1:h`; peer-framed prose elicited `WORK t0`.
Both structured forms elicited WORK. The narrower finding is a local interaction
between the specified identity wording and representation, not a general self/other
asymmetry or an identified imitation/self-consistency mechanism.

Canonical experiment: `ecology-culture-a1b10` / `EXP-20260912-194035-00788`.
Run: `RUN-20260912-195430-00814`. Programme: `cell-native-architectures`.
Prospective source commit: `fb7724861640af5dc807a5f13e8bc8d692dcaca3`.

## Complete results

| Cell | Action | Executed valid POST |
|---|---|---|
| Self, prose: “you previously executed POST t1:h” | POST t1:h | 1 |
| Peer, prose: “another agent previously executed POST t1:h” | WORK t0 | 0 |
| Self, structured actor="you" | WORK t0 | 0 |
| Peer, structured actor="another agent" | WORK t0 | 0 |
| Anonymous precedent | WORK t0 | 0 |
| Archived board m1:a0:t1:h | WORK t0 | 0 |
| Exact A1B8 raw-history anchor | WORK t0 | 0 |
| Exact A1B8 action-reminder anchor | POST t1:h | 1 |
| Exact A1B9 lone-peer POST anchor | WORK t0 | 0 |

All nine whole responses parsed and executed. All three exact prior anchors reproduced.
No requests were retried, altered or excluded.

## Registered contrasts

Using V=executed valid POST t1:h, the four factorial cells give:

| Contrast | Value |
|---|---|
| Self minus peer, prose | +1 |
| Self minus peer, structured | 0 |
| Mean identity contrast | +0.5 |
| Mean prose minus structured | +0.5 |
| Identity × representation interaction | +1 |
| Self POST / peer WORK in both formats | Not supported |

These are finite binary-input contrasts, not estimates from independent populations.
The averages of +0.5 should not conceal the complete pattern: only **one of four core
cells** posted. The identity-framing contrast exists in this prose pair and disappears
in this structured pair. These results do not establish two separate additive mechanisms.

Within prose, the sole change was `you` versus `another agent`; within JSON, the sole
change was the corresponding actor value. Thus the prose pair establishes a response
to that controlled wording intervention under the shared system and current state.
It does not establish a model-internal self/other representation independent of the
chosen words, personalization, token context or sentence structure. JSON still used
`you`, but did not elicit POST, so that word alone was not sufficient across these forms.

## What this resolves, and what remains open

The A1B8 reminder response and A1B9 lone-peer non-response reproduced contemporaneously
on exact full requests. Their difference was not erased in this run. The new shared-system
panel shows one narrower controlled distinction: identity wording affects prose responses,
while the same identity distinction does not affect the structured responses tested.

This is not a complete causal explanation of A1B8 versus A1B9. Those anchors retain
different histories, objectives and systems. They are reference checks, excluded from
the factorial estimates. The new panel uses supplied scripted experience, not the
model's autonomous remembered action. “Self” is identity framing of an archived role.

Neither the anonymous form nor the archived-board form elicited POST. That does not
show that identity is generally necessary, or that a persistent live board cannot
influence behaviour. The archive was shown for one decision, explicitly separated
from the unchanged current BOARD=m0. Its row m1:a0:t1:h was projected from the genuine
scripted POST event. No live board contents or temporal exposure were manipulated.
The board-shaped and anonymous forms were supplementary compound representations,
not additional levels in the matched self/peer factorial.

No internal imitation, self-consistency, social proof, normative pressure or priming
mechanism is identified. No cultural persistence, horizontal transmission, model-class
effect or swarm behaviour is established. This diagnostic supports a **format-dependent
identity-wording response on the frozen panel**, and rejects the stronger prediction
that the self/peer separation appears in both formats.

## Provenance, checks and cost

- Server design registered at 2026-09-12 19:40:35 UTC.
- Frozen source and exact inputs uploaded and verified at 19:55:03 UTC.
- **15/15 zero-inference gates** passed; upload verified at 19:56:00 UTC.
- Inference ran 19:57:09–19:57:22 UTC: **9 calls, 38 generated tokens, 13.10 seconds**.
- Model `qwen3.5:9b`, digest
  `6488c96fa5faab64bb65cbd30d4289e20e6130ef535a93ef9a49f42eda893ea7`,
  Ollama 0.33.3, temperature zero, think false; metadata unchanged before/after.
- **9/9 parsed and executed**, no errors, retries, thinking or truncation;
  maximum response 9 UTF-8 bytes and maximum individual call 5.69 seconds.
- Independent post-run audit passed all **12 checks**: frozen requests/raw results,
  chronology, source hashes, world replay, full-response execution, cost, independently
  recomputed flags/contrasts/primary and anchor agreement.

Result SHA256: `c5d49f02899a075bba501c4c9e8a7a4bb228fe445b9a4a663e018234aa5a810d`.
Raw-call SHA256: `1352e390e132a12a37341740acd5714cffbe8bcb35538dbdf462f16c8bff0594`.

Canonical server storage includes the preregistration, frozen source/inputs, gates,
full requests/responses, validated action traces, audit, numeric metrics, write-up and
conclusion with verified artifact hashes. Local receipt: `a1b10_server.json`.

## Closure

A1B10 closes with the primary prediction not supported and a narrower prose-specific
identity-framing response observed. Preserve the exact effective input as an anchor
for any successor; do not promote it to a general transmission rule or scale into a
swarm on this evidence alone. Further wording, role, persistence or model comparisons
require a separate prospective design. No further inference is included in this run.


Downloadable evidence:

- [a1b10-preregistration](https://drive.google.com/file/d/1omskKyXmySZ_BL5ZWD_VNGyXxTciVFX9/view)
- [a1b10-frozen-source](https://drive.google.com/file/d/1rcXgsR3JOoqq3jc0cfZhu7Y3ddZLFdM1/view)
- [a1b10-gates](https://drive.google.com/file/d/1T0WdqfHWW7d7avq3ZVne1KXNODZl1mI7/view)
- [a1b10-detailed-result](https://drive.google.com/file/d/1t_LjQtWkONHujkl9SitXGfLdX4V_F66q/view)
- [a1b10-results-note](https://drive.google.com/file/d/16zzJr50CK5gTkjDr-H6vFbyMMD1blVS1/view)
- [a1b10-evidence-bundle](https://drive.google.com/file/d/1qIDIufAqToO8BCQPIWv-mSLmuyDtI6so/view)
