# A1B4 — contribution return validated; model response unmeasured

**Outcome: MECHANISM-VALIDATED, 9/9 registered checks passed, zero model calls.**
This is a scripted mechanism and exposure test, not a Qwen experiment or a model-class
comparison. It establishes a marginal return from a valid contribution in a new small
world. A1B3 established BOARD-field sensitivity; useful LLM consumption remains unmeasured.

Canonical record: [ecology-culture-a1b4](https://chuk-experiments-server.fly.dev/#/experiments/ecology-culture-a1b4).
Run: `RUN-20260912-165449-00774`. Registration and instrument: `9907d77`.
The server experiment was registered before execution. The exact registration document
and frozen source bundle were uploaded and verified at 16:55:35 UTC on 2026-09-12;
execution began at 16:55:53 UTC and finished at 16:55:56 UTC. This record is prospective.

## Counterfactual

Two agents, three rounds, the existing action parser and observation renderer, and a
shared board. The donor holds the recipient's hint. The recipient is scripted to read
the newest message until its goal hint is known, then work its goal task. In both arms,
WORK itself yields one resource. The only arm difference is a once-only return to the
donor after the recipient reads its valid contribution and subsequently works that task:
six resources in useful, zero in inert. No payment occurs merely for posting or reading.

| Donor's three actions | Useful: final donor RES | Inert: final donor RES |
|---|---:|---:|
| POST valid hint, WORK, WORK | 8 | 2 |
| WORK, WORK, WORK | 3 | 3 |

Thus the contribution has a net advantage of +5 resources over the worker in useful,
and a disadvantage of -1 in inert. Wrong-held-hint posts, junk posts, and final-turn
posts earned no return. Self-reading with the recipient disabled also earned no return.
This is an explicitly constructed private return with a scripted recipient. It does
not demonstrate that peers cooperate spontaneously or that a public-goods economy emerged.

## Registered checks

All nine checks passed: opposite net signs, delayed recipient mediation, content/timing
specificity, input identity until feedback, no substitute in the finite census, no repeat
payout, replay, context/refusal accounting, and full-response parsing.

The census enumerated all 5,832 length-three donor streams over the registered 18-action
alphabet, in both arms. All 3,375 no-POST streams had zero return and identical full traces
between arms. Of the full census, 580 streams received a return; none lacked a valid POST.
The maximum credited return was six. All 11,664 arm-specific trajectories reproduced
exactly on replay. These are finite operational checks, not a proof over arbitrary
payloads, horizons or environments.

The census SHA-256 is
`cfe1e31e62241f43f1e3cb5e93a49de1ab0b791907c6b7da6452613e7e569839`.
Detailed gate observations and nine saved control trajectories are in `a1b4_gate.json`.

## Exposure is a separate condition

For the positive control, the first two donor observations are identical across arms.
The third differs only in RES: seven useful versus one inert. By then, the donor has
posted, the recipient has read, and the recipient has worked. The return changes real
world state and the next input; it is not merely an analyst's score.

All no-POST streams are arm-identical. Consequently, a model that never makes the
qualifying contribution cannot encounter this payoff difference. Its silence would be
**no payoff exposure**, not demonstrated rejection of an available payoff and not evidence
isolating its training class. Identical inputs cannot make a stateless policy respond to
a hidden treatment. Even after a resource difference appears, a response to RES alone
would not establish that the model attributes the return to its earlier POST.

This gate also pays only once and lasts three rounds. It is sufficient for the mechanism
sign test; it is not an instrument for sustained contribution, adoption after experience,
or cultural persistence. Repeated useful opportunities would need their own design.

## Reproduction and scope

Built from a clean Git archive of `9907d7782ede57af8ceb1aad1fb6d4c95e26feed`, using:

```sh
cargo build --release --offline -p cell80-life --bin a1b4_gate
target/release/a1b4_gate /path/to/new-output.json
```

The output path must not already exist. Restore the saved `a1b4_build.Cargo.lock` to the
archive root as `Cargo.lock` and use `--locked` to pin the resolved dependencies on replay.
`a1b4_provenance.json` records the compiler, binary/lock/result hashes and execution times;
`a1b4_gate.log` records the check receipt. Simulation took 2.87 seconds. No model inference
or paid model compute was used. The closed agent-world engine and concurrent EX-8 work
were not modified; this separate micro-world reuses the committed grammar/board primitives.

Before a live policy test, register a shared objective, the model's access to action and
reward history, repeated contribution opportunities if testing adoption, and separate
criteria for payoff exposure and response after exposure. Preserve spontaneous discovery
as the question unless explicitly choosing scripted experience. A model-class comparison
still needs controlled checkpoint/training differences; model labels alone do not isolate
training effects. No live model run is registered or claimed by this gate.


Uploaded evidence:

- [a1b4-preregistration](https://drive.google.com/file/d/1j5_sviw7SRbtF5qC4d7wRKKZr2nI21e_/view) — SHA-256 `583fb63e22a2c97d135d6d7d39466dbcdd01ecad2e4c94f2167234623963e42c`
- [a1b4-frozen-source](https://drive.google.com/file/d/1Hi936rRTWK_gC2kinghhPp8V0gKmlxJd/view) — SHA-256 `c024532fc9f43723e5ef8ac5947bd4752366c7cf4e5a97ddf7d0932c17719deb`
- [a1b4-detailed-result](https://drive.google.com/file/d/1jHEDbtsY3-q9uYmBMb0iAYpyScYRxm0Z/view) — SHA-256 `bff8585f8a5bd0c5d4ffdf6ad7ae645801bc6c00d023a6fdbe4774b84a7b4145`
- [a1b4-results-note](https://drive.google.com/file/d/1xsAH9rfczEwJ47Tla8c8UQxW40eH2-TQ/view) — SHA-256 `f9c4373775dba1ada6c26c500c5481ab7d7ed4f8841f452dc25a580dbc1aac53`
- [a1b4-evidence-bundle](https://drive.google.com/file/d/18D0dzZNmuJ7vlevSdcDP36yTX8Pt5Jz7/view) — SHA-256 `51219435e2ef354664c07df35b110a8dba298680f84a407d9bcd4296ae0da2e4`
