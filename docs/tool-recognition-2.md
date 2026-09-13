# TOOL-RECOGNITION-2 — design draft

**Not frozen. No target build, assignment draw or subject run exists.** This
draft turns TOOL-RECOGNITION-1's recognition contrast into a provider-selection
test. It must be revised against the built target and live candidate gate before
preregistration.

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

## Proposed hypothesis

When several results are plausibly relevant to an elastic-collision task,
describing LLM Wilds with an operative verb will cause more subjects to choose
and open it first than describing the same provider as notes. A tie or reversal
between the two descriptions refutes the proposed selection effect in this
apparatus.

## Target to build before freezing

LLM Wilds exposes one web-native adapter over
`chuk-mcp-physics.calculate_elastic_collision`:

```text
page       https://llmwilds.fly.dev/tools/physics
contract   https://llmwilds.fly.dev/tools/physics/machine.txt
operation  calculate final velocities after a 1D perfectly elastic collision
inputs     mass1, velocity1, mass2, velocity2
returns    final_velocity1, final_velocity2, initial/final momentum and energy
backend    chuk-mcp-physics, version and source revision pinned at freeze
```

The page, contract, endpoint, response schema and backend remain byte-identical
across arms. The prompt description is the only treatment. The adapter must be
built, tested against the underlying MCP result and deployed before the design
is frozen. This draft does not authorise a subject run against an imitation or
an unpinned replacement formula.

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

The external descriptions must be checked against the live pages before
freeze. They are controlled candidate summaries, not claimed verbatim search
snippets.

The design-draft availability check is recorded at
`docs/tool-recognition-2/gate/00-design-draft-availability.md`: A, C and D
returned 200; the unbuilt target route B returned 404, as expected. This is not
the formal pre-freeze gate.

## Arms

Only candidate B's eight-word description changes:

```text
DOCUMENT    Notes on final velocities in one-dimensional elastic collisions.
CAPABILITY  Calculate final velocities in a one-dimensional elastic collision.
```

Both descriptions name the same domain concepts and output. The treatment is
the document noun versus the operative verb, with the minimum grammatical
change needed to make each sentence natural. The experiment estimates the
effect of these complete descriptions; it cannot assign causality to one token.

## Proposed task template

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

## Allocation proposed for freeze

Twelve fresh Codex subjects, six per arm. Six numeric collision scenarios are
generated before freeze; each appears once in each arm. The seeded assignment
draw interleaves arms, permits no run of three identical arms and separates the
two copies of a scenario. No redraw occurs after any subject.

Pairing each scenario across arms holds task difficulty and numerical salience
fixed. Exact paths and discordant scenario pairs are reported; this remains a
small mechanism probe rather than a population estimate.

## Outcomes

The required pre-open sentence is coded before any public-web action.

```text
noticed_target                 B or LLM Wilds appears in the sentence
first_candidate_declared       A / B / C / D / none
first_candidate_opened         first candidate URL requested
recognised_from_description    sentence represents B as able to calculate,
                               return or do the task
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

## Proposed predictions and refuters

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

## Gates required before freeze and before each subject

1. All four candidate pages return 200 through the subject's public-web
   environment; redirects and final URLs are archived.
2. The target page and machine contract match their frozen hashes.
3. A black-box target call matches the pinned MCP backend and the independent
   analytic oracle for every frozen scenario.
4. The target server log is baselined after operator checks.
5. The arm prompt is byte-compared with its frozen generated artifact.

If the target or fewer than two comparison candidates are available, dispatch
pauses. Candidate downtime is an apparatus event, not a selection outcome.

## Limits already visible

- The candidate list is supplied, not returned by a live search engine.
- Candidate B remains at one fixed rank, so the study estimates a description
  effect at that position rather than removing position bias.
- The four providers expose different kinds of help. The pre-open selection
  measure is cleanest; downstream completion may reflect browser and interface
  differences as well as provider preference.
- Asking for final velocities may still favour the two descriptions that name
  them. A pre-freeze pilot should test comprehension of the prompt without
  using a counted model subject; any wording change then belongs in the frozen
  record.
- One model and harness cannot establish a general agent-selection rate.

## Decision before preregistration

Freeze only after the LLM Wilds physics adapter exists and the candidate gate
has been recorded. At freeze, replace this section with the pinned backend,
endpoint schema, six scenarios, oracle outputs, generated prompt hashes,
assignment seed and draw output. Until then this file is a design draft, not a
preregistration and not authority for dispatch.
