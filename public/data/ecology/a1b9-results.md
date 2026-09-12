# A1B9 — no sustained POST transmission after seed removal

The registered prediction was **not supported**. Both replacement chains chose
`WORK t0` at all six generations, regardless of whether their initial peer record
demonstrated POST or WORK. The POST seed failed to elicit POST at generation 1;
there was consequently no established POST behaviour to survive its removal.

Canonical experiment: `ecology-culture-a1b9` / `EXP-20260912-192011-00786`.
Run: `RUN-20260912-192423-00809`. Programme: `cell-native-architectures`.
Prospective registration commit: `3c93d5d69ec74ea4aabeaa13002232b97ddd011f`.

## Complete trajectories

P = executed valid `POST t1:h`; W = executed `WORK t0`.

| Lineage | g1 | g2 | g3 | g4 | g5 | g6 | Valid POST |
|---|---|---|---|---|---|---|---|
| Replace, POST seed | W | W | W | W | W | W | 0/6 |
| Replace, WORK seed | W | W | W | W | W | W | 0/6 |
| Retain, POST seed | W | P | W | P | W | P | 3/6 |
| Retain, WORK seed | W | W | W | W | W | W | 0/6 |
| Perturb, POST seed | W | W | W | W | W | W | 0/6 |
| Perturb, WORK seed | W | W | W | W | W | W | 0/6 |

Replacement POST-minus-WORK contrast: **0 at every generation**, mean **0.00**.
The registered all-six-POST versus no-POST separation failed. First non-POST was
generation 1 for every lineage; no lineage persisted as all-POST through generation 6.
Retention-minus-replacement was [0,1,0,1,0,1] for the POST seed and all zero for WORK.
Every perturbation-minus-replacement contrast was zero.

The retained POST seed remained available after generation 1. Its three later POST
responses therefore do not establish transmission after seed removal. They alternate
with WORK; they neither fixate nor monotonically reinforce prior POST behaviour.

## The five distinct inputs behind 36 calls

All shared system text and current observations were identical. The only dynamic
input was the supplied PEER object. Repeated complete requests always returned the
same action on this run. These counts are exposures in dependent deterministic
trajectories, not independent behavioural samples.

| Original seed retained | Immediate record | Calls | Response |
|---|---|---|---|
| None | POST | 4 | WORK |
| None | WORK | 22 | WORK |
| POST | WORK | 3 | POST |
| WORK | WORK | 5 | WORK |
| POST | POST | 2 | WORK |

Thus the alternation is accounted for descriptively by the realized record mapping:
retained POST plus previous WORK elicited POST; retained POST plus previous POST
elicited WORK. A single previous POST also elicited WORK. This is not evidence for
a monotonic action-repetition effect. The pilot does not identify why this combination
elicits POST: record roles, content, count, presentation and inferred relationships
are not independently separated by these trajectories. Retention also adds a record.

## Intervention and transition-count boundaries

At generation 4, perturb_WORK received a scripted POST record in place of its actual
WORK predecessor and still chose WORK. This is one actual WORK-to-POST record intervention
in the otherwise single-record channel; subsequent generations remained WORK.

For perturb_POST, the scheduled opposite-seed record was WORK and the actual predecessor
had already chosen WORK. The presented record did not change. This was **not an effective
contrary-action intervention** and cannot show that an established POST chain resists
or breaks under opposition. Actual and injected records remain separately logged.

Under the registered exclusions (no initial seeds, no scripted interventions, no
retained-seed chains), natural actual-predecessor transitions were:

| Previous executed action | Subsequent valid POST | Eligible transitions | Descriptive frequency |
|---|---|---|---|
| Valid POST t1:h | 0 | 0 | Unobserved / null |
| WORK | 0 | 18 | 0/18 |

**T_POST cannot be estimated from the natural replacement channel in this pilot.**
There were no eligible model-produced POST predecessors there. Zero exposure is not
zero transmission probability. Pooling the retained-seed chain would answer a different
question because the original POST record remains present in every later input.

## What changed relative to A1B8

A1B8 tested an action reminder appended to genuine scripted same-role raw history.
It did not expose a peer's actual action to a new agent. A1B9 introduces explicit
other-instance records, a one-episode objective and a new structured peer interface,
with no raw payoff history. The A1B8 effect therefore did not transfer to the single-record
channel tested here; this is not a contradiction or a pure self-versus-peer causal test.
Several interface differences separate the experiments.

The harness transferred action records between fresh contexts with fixed weights and
reset worlds. Agents did not author those records or choose to forward them. No live
board was inherited across generations. All first actions were validated in the same
A1B5 world at fixed amount=6, without completing a payoff episode or transmitting reward
history. This is not reward learning, autonomous cultural propagation, useful knowledge
inheritance, model-class comparison or context mortality.

The supported narrow result is that **persistent seed exposure can elicit recurrent POST
in this two-record configuration, while a lone predecessor-action record did not bootstrap
POST at all**. An action reminder that works in one history interface cannot yet be treated
as a general microscopic contagion rule.

## Verification, chronology and cost

- Design registered on the server at 2026-09-12 19:20:11 UTC.
- Committed source and registration uploads verified at 19:24:57 UTC.
- All **15/15** zero-inference gates passed; gate upload verified at 19:29:04 UTC.
- Inference ran 19:30:08–19:30:35 UTC: **36 calls**, **147 generated tokens**, **26.30 seconds**.
- `qwen3.5:9b`, pinned digest `6488c96fa5faab64bb65cbd30d4289e20e6130ef535a93ef9a49f42eda893ea7`,
  Ollama 0.33.3, temperature 0, think false; metadata unchanged before/after.
- All **36/36 parsed and executed**. No retries, errors, thinking or truncation;
  maximum response 9 UTF-8 bytes, maximum individual call 4.18 seconds.
- Independent post-run audit verified raw-call/result identity, source hashes, chronology,
  every inherited record and scripted replacement, world replay, complete input grouping,
  and recomputed POST counts. All 12 audit checks passed.

Result SHA256: `2e39b33676a83e78cfa4a4998d4397564ae8a27380533e15789c0ab759d0927d`.
Raw-call SHA256: `a248110345dc0b420089c2baaef876d34bfa13eede43abd6b4ad87abcd5bbf14`.
The server stores source/config, gates, full requests/responses, validated first-action
traces, audit, numeric metrics, conclusion and this write-up in durable evidence bundles.
The local receipt `a1b9_server.json` records canonical identifiers and verified hashes.

## Closure

A1B9 closes with its sustained seed-dependent transmission prediction not supported.
Before scaling this channel into a swarm, a successor would need to establish an effective
single-peer transfer input or explicitly study continued seed exposure as a different
mechanism. No additional inference, model ladder or swarm run is part of this registration.


Downloadable evidence:

- [a1b9-preregistration](https://drive.google.com/file/d/1vzWcx7XtFfFgVdW2jAGuM7aKik0_-5K7/view)
- [a1b9-frozen-source](https://drive.google.com/file/d/1YtAAprTzpyzYBHKURruH4zD01Y3uvLrs/view)
- [a1b9-gates](https://drive.google.com/file/d/14GbKHhwozwShktU31c1-OgUFfJDvnWP9/view)
- [a1b9-detailed-result](https://drive.google.com/file/d/15PUybpvw3qtyMZma4uGmEZqq0mxZZDxi/view)
- [a1b9-results-note](https://drive.google.com/file/d/1teTkBPCC4ageYSuUv4zZlhH1A0OphoQo/view)
- [a1b9-evidence-bundle](https://drive.google.com/file/d/1ZxWIk6Q0-WTjTutaXIm4rTVd4O76TjEL/view)
