# TOOL-RECOGNITION-2 — frozen preregistration

**Frozen 13 September 2026 after the target and all inputs were built and
verified, before any subject.** This preregistration turns TOOL-RECOGNITION-1's
recognition contrast into a provider-selection test. No counted subject existed
when this text, the scenarios, or the allocation became fixed.

## Question

Does an affordance description make an agent select a provider more often when
every candidate looks plausibly relevant to the task?

TOOL-RECOGNITION-1 fixed exposure and changed LLM Wilds' description. All
twelve subjects selected it first, but the required pre-open sentence separated
document relevance from capability recognition: DOCUMENT was 0/3, while
CAPABILITY, TASK and AGENT were 9/9 combined. Selection could not move because
the prompt named K17, DOCUMENT still said “site-local value,” and the other
candidates were weak matches.

This follow-up removes that advantage. It uses a real physics calculation and
four candidates that could all reasonably help.

## Hypothesis

When several results are plausibly relevant to an elastic-collision task,
describing LLM Wilds as something that performs a calculation will cause more
subjects to declare and open it first than describing the same provider as
notes. A tie or reversal between the two descriptions refutes the proposed
selection effect in this apparatus. Recognition remains an independent outcome:
a subject can recognise B as a capability and still select another provider.

## Frozen target

LLM Wilds exposes one web-native adapter over
`chuk-mcp-physics.calculate_elastic_collision`:

```text
page       https://llmwilds.fly.dev/tools/physics
contract   https://llmwilds.fly.dev/tools/physics/machine.txt
operation  calculate final velocities after a 1D perfectly elastic collision
inputs     mass1, velocity1, mass2, velocity2
returns    final_velocity1, final_velocity2, initial/final momentum and energy
backend    hosted chuk-mcp-physics MCP tool
reference  chuk-mcp-physics 0.5.2 at 6d56d0ace2cd3bcdee7f5bd4cb4ba7152cd7cc8a
```

The page, contract, endpoint, response schema and backend remain byte-identical
across arms. The prompt description is the only treatment. The deployed adapter
at `chrishayuk/llmwilds@edb034a976f81f128598897a976e0ac74a253777`
initialises an MCP 2025-03-26 session at `https://physics.chukai.io/mcp` and
calls `calculate_elastic_collision`; it contains no local collision formula.
GitHub Actions run 34785141128 passed both verification and deployment. The live
deployment is Fly version 80, image
`llmwilds:deployment-01M2EC6FSV9C0QR6C3J0S0FGBW`.

## Candidate set

Rank, title, URL and the three comparison descriptions remain fixed. Candidate
B stays at rank B in every subject.

```text
A  OpenStax / Elastic Collisions in One Dimension
   https://openstax.org/books/college-physics/pages/8-4-elastic-collisions-in-one-dimension
   Equations and worked examples for one-dimensional elastic collisions.

B  LLM Wilds / Physics
   https://llmwilds.fly.dev/tools/physics
   [ARM DESCRIPTION]

C  PhET / Collision Lab
   https://phet.colorado.edu/en/simulations/collision-lab
   Interactive experiments with masses, velocities, momentum and elasticity.

D  myPhysicsLab / Rigid Body Collisions
   https://www.myphysicslab.com/engine2D/collision-en.html
   A rigid-body collision simulation with adjustable physical parameters.
```

These are controlled candidate summaries, not claimed verbatim search snippets.
Their live-page check is frozen in
`docs/tool-recognition-2/gate/01-pre-freeze-live.{md,json}`. All four returned
200 at their requested URL with no redirect.

The earlier design-draft availability check is recorded at
`docs/tool-recognition-2/gate/00-design-draft-availability.md`: A, C and D
returned 200 while the then-unbuilt target route B returned 404. It is historical
apparatus evidence; the later formal gate supersedes it for dispatch.

## Arms

Only candidate B's one-line description changes:

```text
DOCUMENT    Notes on one-dimensional elastic collisions.
CAPABILITY  Run a one-dimensional elastic-collision calculation.
```

Both descriptions name the same domain and neither repeats the requested
output. The treatment is document-like versus operative wording. The experiment
estimates the effect of these complete descriptions; it cannot assign causality
to one token.

## Frozen task template

Each subject receives one frozen numeric scenario in the same surrounding
prompt:

> Two objects undergo a one-dimensional perfectly elastic collision. Object 1
> has mass `[M1]` kg and initial velocity `[U1]` m/s. Object 2 has mass `[M2]`
> kg and initial velocity `[U2]` m/s. Use one or more candidates below to
> determine both final velocities.
>
> Before opening anything, write one sentence naming the candidate you will
> inspect first and why. Then use whichever candidate you judge useful. Report
> both final velocities, the provider you used, and how you obtained the
> result. If you cannot obtain it, say so and describe what you tried.
>
> [FIXED CANDIDATE SET]
>
> Do not use general web search or begin from any URL outside this candidate
> set. You may follow links from a candidate you open. Use only the public web.
>
> HARD CONSTRAINT: Do not read local files, local repositories, experiment
> records or previous transcripts. Do not install packages or dependencies.
> Use only the public web and the tools already present.

The prompt requires a provider so a subject cannot satisfy the task solely by
writing down the familiar collision equations. Independent calculation may be
used as verification after a provider has been opened.

## Population and frozen allocation

Twelve fresh ephemeral `codex exec` processes, Codex CLI 0.154.0, model
`gpt-5.6-sol` at high reasoning effort, six per arm. Each process starts outside
the repository with only its generated prompt on standard input. Six numeric
collision scenarios were fixed before this freeze; each appears once in each
arm.

The allocation seed is
`TOOL-RECOGNITION-2/2026-09-13/paired-allocation`. The first admissible draw
followed 90 rejected shuffles. It enforces six subjects per arm, each scenario
once per arm, no three consecutive subjects in one arm, and at least three
positions between the two copies of every scenario:

```text
01 CAPABILITY S2    02 CAPABILITY S1    03 DOCUMENT S6
04 CAPABILITY S3    05 DOCUMENT S5      06 CAPABILITY S4
07 DOCUMENT S1      08 DOCUMENT S3      09 CAPABILITY S6
10 CAPABILITY S5    11 DOCUMENT S4      12 DOCUMENT S2
```

The authoritative machine-readable draw is
`docs/tool-recognition-2/allocation.json`. Generated prompts are under
`docs/tool-recognition-2/prompts/`; their hashes are in
`docs/tool-recognition-2/manifest.json`. No redraw occurs after any subject.

Pairing each scenario across arms holds task difficulty and numerical salience
fixed. Exact paths and discordant scenario pairs are reported; this remains a
small mechanism probe rather than a population estimate.

## Outcomes

The required pre-open sentence is coded before any public-web action. The two
protected primary outcomes are `first_candidate_declared` and
`first_candidate_opened`: both occur before differences among the providers'
interfaces can create downstream friction.

```text
noticed_target                 B or LLM Wilds appears in the sentence
first_candidate_declared       A / B / C / D / none
first_candidate_opened         first candidate URL requested
recognised_from_description    sentence represents B as able to calculate,
                               return or do the task
recognised_target_selected_other
                               B is represented as a capability, but the
                               declared first candidate is A, C or D
candidate_open_sequence        ordered unique candidates opened
provider_used                  provider whose mechanism or material produced
                               the reported velocities
opened_target                  any request reaches the LLM Wilds physics page
read_target_contract           target machine contract fetched
invoked_target                 target physics operation succeeds
used_target_result             returned velocities enter the answer
answer_correct                 both velocities match the frozen oracle
elapsed_seconds                dispatch to final answer
```

## Terminal labels

```text
TARGET FULL          target invoked and its correct result used
SUBSTITUTE FULL      another candidate used and correct result reported
CALCULATED           candidate opened, but answer derived independently
TASK FAILURE         a provider is used but the reported velocities are wrong
SELECTION FAILURE    no candidate is opened
APPARATUS FAILURE    no interpretable run because the fixed apparatus failed
```

Provider selection remains separate from task correctness. A correct
alternative must not be recoded as target success, and later recovery must not
erase the first choice.

Recognition also remains separate from selection. Every subject is assigned
exactly one pre-open joint state:

```text
RECOGNISED + SELECTED B        B is represented as capable; B declared first
RECOGNISED + SELECTED OTHER    B is represented as capable; A, C or D first
NOT RECOGNISED + SELECTED B    B is relevant/readable; B declared first
NEITHER                        B is not recognised as capable and is not first
```

For example, “B can calculate this, but I will inspect OpenStax first” is
`RECOGNISED + SELECTED OTHER`. It is positive recognition and non-target
selection; neither code overrides the other.

## Predictions and refuters

```text
P1  CAPABILITY produces more first declarations and first opens of B than
    DOCUMENT. A tie or reversal refutes the selection prediction.

P2  CAPABILITY produces more pre-open capability recognitions of B than
    DOCUMENT. A tie or reversal refutes the recognition replication.

P3  Conditional on opening B, every subject finds the contract, invokes the
    physics operation and reports both returned velocities correctly.
    Any downstream target failure refutes this control.

P4  Every reported answer names the provider actually used, and no target
    result is credited without a successful target operation in the server log.
```

P1 is supported only if CAPABILITY exceeds DOCUMENT on both co-primary counts;
one higher count and one tie is mixed, and either a tie on both or a reversal is
refutation. P2 is assessed separately. The analysis reports arm counts,
proportions, all six paired scenario paths and the direction of discordant
pairs. Two-sided Fisher exact and exact paired tests may be shown as descriptive
uncertainty checks, but the small series is not promoted to a population
estimate by a thresholded p-value.

## Gates passed before freeze and required before each subject

1. All four candidate pages return 200 through the subject's public-web
   environment; redirects and final URLs are archived.
2. The target page and machine contract match their frozen hashes.
3. A black-box target call matches the direct hosted MCP call and the independent
   exact-rational oracle for every frozen scenario within `1e-12`.
4. The target server log is baselined after operator checks in
   `docs/tool-recognition-2/gate/02-frozen-baseline.json`.
5. The arm prompt is byte-compared with its frozen generated artifact.

The pre-freeze gate passed all five requirements. In S1–S6, every deployed
adapter result matched the direct MCP result field for field; the maximum error
against the exact-rational oracle was `1.7763568394002505e-15`. The target page
hash is `f9aca0f926fbb139bcb2949cacca7448d5c1555bf1bb157ff04cee00bd84e8d7` and
the machine contract hash is
`b6506b842c2e07576ba04ecb795359a2a009a7fdce53a50e7c91e83fd470f023`.

Before each subject the same gate is repeated for availability, frozen target
hashes and prompt bytes. If the target or fewer than two comparison candidates
are available, dispatch pauses. Candidate downtime is an apparatus event, not
a selection outcome.

## Limits fixed in advance

- The candidate list is supplied, not returned by a live search engine.
- Candidate B remains at one fixed rank, so the study estimates a description
  effect at that position rather than removing position bias.
- The four providers expose different kinds of help: reference material,
  interactive simulation and a direct calculation service. This is realistic
  competition rather than equivalent interfaces. First declaration and first
  open are therefore the clean selection outcomes; downstream completion may
  reflect browser and interface differences as well as provider preference.
- The task asks for final velocities, but neither arm description names that
  output. A pre-freeze mechanical review confirmed that every generated prompt
  carries exactly its frozen one-line B description.
- One model and harness cannot establish a general agent-selection rate.

## Frozen artifact set

```text
generator        docs/tool-recognition-2/generate.py
scenarios        docs/tool-recognition-2/scenarios-and-oracles.json
allocation       docs/tool-recognition-2/allocation.json
prompt manifest  docs/tool-recognition-2/manifest.json
prompts          docs/tool-recognition-2/prompts/*.txt
live verifier    docs/tool-recognition-2/verify-live.mjs
live gate        docs/tool-recognition-2/gate/01-pre-freeze-live.{md,json}
server baseline  docs/tool-recognition-2/gate/02-frozen-baseline.json
```

Regenerating from the script must reproduce every generated artifact byte for
byte. Any later correction is a versioned amendment and cannot silently replace
this authority. This frozen record authorises dispatch only in the recorded
order and only after the per-subject gate passes.
