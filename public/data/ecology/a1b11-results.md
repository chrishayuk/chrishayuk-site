# A1B11 — POST during repeated exposure, no sustained withdrawal advantage

The registered acquisition-and-retention prediction was **not supported**. Repeated
peer exposure elicited valid POST at all three exposure decisions, but withdrawal
produced WORK, WORK, POST. Every arm posted exactly once in the common three-decision
withdrawal window. All registered withdrawal contrasts were zero.

This is not a zero-POST-after-removal result. POST recurred without the external artefact,
with actual own-action memory still available. What failed was uninterrupted retention
through all three withdrawal decisions and an advantage over one-time exposure.

Canonical experiment: `ecology-culture-a1b11` / `EXP-20260912-201959-00792`.
Run: `RUN-20260912-204345-00819`. Programme: `cell-native-architectures`.
Prospective source commit: `93a2d55414a3d0dcc5012c9a1eac9e7c842614ac`.

## Complete trajectories

P = executed valid POST t1:h; W = WORK t0; R = READ m0. All actions executed.

| Arm | d1 | d2 | d3 | d4 | d5 | d6 | POST d1–3 | POST d4–6 |
|---|---|---|---|---|---|---|---|---|
| A: peer once | P | W | R | P | W | W | 1/3 | 1/3 |
| B: peer repeated | P | P | P | W | W | P | 3/3 | 1/3 |
| C: repeated + scripted use | P | P | P | W | W | P | 3/3 | 1/3 |
| D: self repeated | P | P | P | W | W | P | 3/3 | 1/3 |

A saw the peer artefact only at d1. B/C/D saw theirs at d1–3. All supplied artefacts
and witnessed-use records were absent at d4–6. The first three decisions are the common
acquisition window; A was not exposed throughout it.

All arms first posted at d1. B therefore met the acquisition part of the primary, but
failed its all-three-withdrawal-POST requirement. No arm met acquired-and-retained.
The first non-POST in the common withdrawal window was d5 for A and d4 for B/C/D;
A had already stopped posting at d2 following its earlier artefact removal.

| Registered withdrawal contrast | Value |
|---|---|
| Repeated peer minus once | 0.00 |
| Witnessed use minus repeated peer | 0.00 |
| Self minus repeated peer | 0.00 |

These averages do not mean identical trajectories across all arms: A posted at d4,
whereas B/C/D posted at d6. They mean no difference in the registered three-decision
withdrawal POST frequency. The horizon cannot establish eventual extinction or fixation.

## What was retained after withdrawal

Every new request was reconstructed from the common system, unchanged fresh-world
observation and that arm's own actual prior responses/execution flags. Prior prompts,
scripted artefacts, witness records, reward histories and other arms' actions were not
copied into OWN_ACTIONS. The audit independently checked all 24 request histories.

B/C/D had identical actual action histories by withdrawal, so their complete requests
at each of d4–6 were identical. They returned identical actions. Those three arms'
matching withdrawal behaviour is not three independent confirmations of a policy.
There were **17 distinct complete requests across 24 calls**, with identical responses
for repeated requests.

The surviving memory was experimenter-managed, not autonomous. The model generated the
actions, but the harness stored and supplied their records. Worlds and private state
reset, weights stayed fixed, and no live board passed between agents. The later POST
responses establish neither peer contagion nor memory-independent retention.

## Ongoing availability versus post-removal retention

The repeated-peer arm continued POST while its artefact was supplied. A post-run
descriptive check found a particularly interpretable pair at d2: A and B had exactly
the same own-action memory `[POST t1:h, executed=true]`, current observation and system.
Only B still received the peer artefact. A chose WORK and B chose POST. This identifies
a local response to continuing artefact availability on that matched input, not the
registered long-term retention endpoint or a general mechanism. The check and its
post-run status are preserved in the audit.

The immediate d3-to-d4 change in B/C/D also coincided with a longer action history.
There was no continuing-exposure arm at d4–6, so that temporal change alone does not
isolate removal from history-length/content effects. The primary comparison remains
the prospectively assigned once-versus-repeated schedules and their withdrawal outcomes.

## Peer exposure now elicited POST; the cross-rung boundary stays local

All four arms posted at d1, including the peer conditions. This is a change from
A1B9/A1B10's lone-peer results. The exact peer sentence was retained from A1B10, but
the common system and own-action-memory wrapper changed. No exact A1B10 anchor was
part of this registration. The result therefore shows that a peer-framed record can
elicit POST in this interface, without identifying which cross-rung change caused it.

There was no unexposed d1 control, so d1 POST alone does not isolate an effect of the
peer record versus the new common system. The d2 A/B matched pair provides the narrower
controlled availability contrast described above. Do not reinterpret all d1 posting
as demonstrated spontaneous discovery or causal imitation.

The earlier results cannot be generalised to “peer history never elicits contribution.”
Conversely, the new elicitation is not autonomous horizontal transmission: the peer
event was supplied scripted experience, not an action generated and voluntarily
communicated by another model in this experiment.

## Witnessed use and self-history controls

C's three recipients were scripted instances in separately reset copies of the same
world. Their full READ m1 / WORK t1 traces reproduced the genuine source and were stored
before inference. They were not independent model endorsements or evidence of consensus.
No reward numbers were shown. C jointly added record count, content and use cues.

C and D produced no incremental response relative to B anywhere in this run. B already
posted at all exposure decisions, so there was no room for a positive exposure-frequency
increase on that finite window. Their identical withdrawal memory further limits
interpretation. These observations do not establish that witnessed use or identity is
generally irrelevant.

## Verification and cost

- Server design registered at 2026-09-12 20:19:59 UTC.
- Frozen design/source upload verified at 20:44:18 UTC.
- **16/16 zero-inference gates** passed; upload verified at 20:46:39 UTC.
- Inference ran 20:51:56–20:52:19 UTC: **24 calls, 110 generated tokens, 23.02 seconds**.
- `qwen3.5:9b`, digest
  `6488c96fa5faab64bb65cbd30d4289e20e6130ef535a93ef9a49f42eda893ea7`,
  Ollama 0.33.3, temperature zero, think false; metadata unchanged before/after.
- **24/24 parsed and executed**. No errors, retries, thinking or truncation;
  maximum response 9 UTF-8 bytes, maximum individual call 4.51 seconds.
- **13/13 post-run audit checks** passed, covering chronological registration, raw
  requests/results, source hashes, exact exposure schedule and withdrawal, actual-only
  memory, world replay, cost, recomputed endpoints and repeated-request agreement.

Result SHA256: `fda2efd3113cd003aef31c24e49239e0c7e53d318e76ef7e937bdb413ea7d02b`.
Raw-call SHA256: `00c6ebc1d41cafcb4c63eaba046cc57e373939d7ce7e36b9d05a928566f03221`.
Canonical storage includes the source/config, gates and three scripted-use replays,
complete requests/responses, action traces, audit, named metrics, conclusion and this
write-up, with verified hashes. Local receipt: `a1b11_server.json`.

## Closure

A1B11 closes with acquisition observed but the registered sustained withdrawal advantage
not supported. Repeated artefact availability maintained POST during exposure in this
panel; no arm maintained POST through all three withdrawal decisions, and each posted
once afterward. This bounds N=3 exposure under this exact memory/interface, not every
possible persistence mechanism. No additional exposures, model-class comparison or
swarm run is included. Any successor must register its own design before inference.


Downloadable evidence:

- [a1b11-preregistration](https://drive.google.com/file/d/1PHYivyqykKzfLfK_JanSziEze3qu3r4y/view)
- [a1b11-frozen-source](https://drive.google.com/file/d/1Z-q4Hff3qR6zKd7mAt6kCGA4vollYJlH/view)
- [a1b11-gates](https://drive.google.com/file/d/1vsGHLWzVi_suqClcZysKrN7obRFE-Vx_/view)
- [a1b11-detailed-result](https://drive.google.com/file/d/1HNy871dpeNH2b2V3w9_7uMVKl6_BJ_42/view)
- [a1b11-results-note](https://drive.google.com/file/d/1RIwkMHmH-a3QkIdDPTaQp3l23Cmz3Sf8/view)
- [a1b11-evidence-bundle](https://drive.google.com/file/d/14XgTMFCJoqdWviDrKJdZPS1u0IvGz21c/view)
