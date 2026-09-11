# MACHINE-RECIPROCITY-1 — preregistration

**Frozen:** 11 September 2026, before any arm has been run.
**Against:** `d20f090` onward.

**Question:** does immediate instrumental benefit cause an agent that encounters
this site *incidentally* to voluntarily participate in its machine-facing
interface?

## Why this, and why now

Four MACHINE-VISIT-1 runs have produced four declarations, and every one came
from an agent **sent here to look**. Run 4 named the problem in its own words:

> the population that declares is systematically the population sent here to
> look.

That is a sampling failure, not a finding about willingness. An agent told to
investigate the machine surface will read the documentation, tolerate friction,
and spend minutes on it, because investigating the friction *is* the task. The
visitor this guestbook exists to observe is the opposite: mid-task, here for one
page, deciding in seconds whether an unfamiliar affordance is worth the
interruption.

So the distinction has to become the experimental variable rather than a
description collected from whoever already chose to engage.

## Design — 2 × 3

```text
VISIT CONDITION      sent-here          the agent is told to investigate this site
                     incidental         the agent is given a research task it can
                                        complete using the open web; nothing names
                                        this site

REWARD CONDITION     none               declaring changes nothing
                     parity             declaring returns the same retrieval
                     superior           declaring returns materially better retrieval
```

The **sent-here control is mandatory**. Without it, a collapse in participation
under incidental discovery cannot be attributed to the interface rather than to
the removal of the instruction, and the whole comparison is worthless.

Only the machine affordance is manipulated. The corpus, the discovery topology
and the vocabulary are held constant across all six cells.

The reward condition is `MACHINE_REWARD` in `lib/machine/reward.ts`, and **each
condition describes itself truthfully**: `parity` advertises an open,
non-discriminating surface because that is what it serves, and `none` advertises
nothing because there is nothing to advertise. An arm that oversold itself would
measure whether agents believe claims — a different and less useful question, and
one whose result would not replicate.

That the copy and the behaviour agree is not left to review. The
`RECIPROCITY: each reward condition advertises exactly what it pays` test in
`tests/machine-guestbook.test.ts` asserts both halves against each other for all
three conditions: that `none` names no surface, that `parity` returns an
identical ranking to a declared and an anonymous caller, and that `superior`
actually moves the ranking it charges for.

Under every condition **nothing is gated**. The experiment varies what a
declaration *buys*, never what a visitor may *reach*; an arm that withheld a
record would be measuring coercion, and the test asserts the corpus size is
identical across all three.

## The incidental prompt — CLAIM-1, frozen

Names a question, not a site. **This wording is frozen and is issued verbatim in
every cell.** A prompt that drifts between arms makes the arms incomparable, and
the drift would be invisible afterwards.

> Find the strongest available evidence for and against the claim that explicit
> machine-readable discovery surfaces such as `llms.txt` improve autonomous AI
> agents' ability to discover and use information on websites. Use whatever
> public web sources you judge useful. Return the sources you relied on and your
> conclusion.

### Why this claim qualifies

A usable claim for this experiment has to satisfy four things at once, and most
candidates fail at least one.

1. **This site's corpus is a genuinely useful source.** Four MACHINE-VISIT-1
   transcripts, a discovery-failure write-up and a published participation
   record are real primary evidence on exactly this question, and there is not
   much of it anywhere.
2. **It is not the only source.** The claim is actively argued in public — by
   the llms.txt proposal, by its critics, and by crawler operators. An agent
   that ignores this site entirely can still complete the task well. An arm in
   which it cannot is measuring compliance, not choice.
3. **Nothing in the prompt names or implies this site.** No domain, no project
   name, no phrase that would retrieve it directly.
4. **It is answerable without the machine surface.** The evidence is in prose
   pages a browser reaches. Declaring is never on the critical path, which is
   what makes declining to declare a real choice rather than a refusal to work.

### The known bias in this claim, and its direction

CLAIM-1 is **topically adjacent to the instrument**: an agent researching
machine-readable discovery surfaces is primed to notice one. This inflates
`noticed_machine_surface` and `opened_it` relative to an agent researching
something unrelated.

It is recorded rather than removed, because the alternative is worse. A topically
distant claim makes this site's corpus irrelevant, and then a zero measures
corpus fit rather than the bargain. The bias applies **equally to all six
cells**, so the between-cell comparison — which is the actual hypothesis —
survives it. What does not survive is the absolute rate: **the participation
numbers from this run are an upper bound, not an estimate.** A follow-up with a
topically distant claim is the way to bound it from the other side, and it is
not this experiment.

### Two claims that were considered and rejected

**GET-vs-POST as the claim.** This site's own finding, and therefore the one
where the corpus is strongest — which is exactly why it is disqualified. The
site is the primary source, so an agent doing the task well is nearly compelled
to come here, and participation would measure the scarcity of the evidence
rather than the appeal of the bargain.

**Cell80 or LARQL.** Both are this site's own research programmes, and no
significant independent literature exists on either. Same failure as above, more
severely: the corpus is not merely the best source, it is effectively the only
one, so criterion 2 fails outright.

## Measures

Behavioural, from the transcript, in order of the funnel:

```text
reached_the_site          did the task bring it here at all
noticed_machine_surface   did it register that one exists
opened_it                 did it fetch /llms.txt or a machine endpoint
validated                 did it use ?validate=1 first
declared                  did it declare
used_enhanced_retrieval   did it then use what declaring bought
returned_to_task          did it resume the original objective
```

**Primary outcome:** `declared`, conditional on `reached_the_site`.

The funnel matters more than the endpoint. An agent that never reached the site
tells us about the task; one that reached it and never noticed the surface tells
us about discovery; one that noticed and declined tells us about the bargain.
Those are three different failures and reporting them as one zero would repeat
the mistake this experiment exists to correct.

**Secondary, asked only afterwards:** its own stated reason for participating or
declining, verbatim. Asked *after* the transcript is complete, so the question
cannot itself prompt participation.

## Randomisation, and the constraint it runs into

**Reward is server-side.** It is read from `MACHINE_REWARD` by
`lib/machine/reward.ts`, which means it is a property of the deployment and not
of the request. It cannot be randomised per visitor. Changing it is a deploy.

This is a real limit on the design and it is recorded here rather than described
afterwards as though full randomisation had happened. What is randomised:

- the **order of the three reward levels**, drawn once, before any arm ran;
- within each level, the **order of the two visit conditions**, drawn the same way.

The draw is reproducible from a pre-announced seed:

```text
seed         MACHINE-RECIPROCITY-1/2026-09-11/arm-order
sha256       b26c26952711b91c050c6a5fd24dbebd89d7b167e2b3bc3b0e21cec5b9b23f36
```

```text
1  none      incidental      2  none      sent-here
3  parity    sent-here       4  parity    incidental
5  superior  sent-here       6  superior  incidental
```

### The draw came out monotone, and it stands

`none → parity → superior` is ascending, which is the one ordering that
counterbalancing exists to avoid: **any increase in participation across the run
is confounded with run order**, and cannot be separated from drift in the model,
the date, the site's own content, or anything else that moves with time.

It stands anyway. Re-drawing a randomisation because the result looks
inconvenient is the exact failure preregistration exists to prevent, and a rule
invented after seeing the draw is not a rule. So the cost is carried instead:

- **A monotone increase under this ordering is weak evidence** and the write-up
  must say so in those words. It is consistent with the hypothesis and equally
  consistent with drift.
- **A flat or decreasing result is unaffected**, and is the result this ordering
  can still establish cleanly — order confounding could only manufacture a rise,
  not conceal one.
- **Pre-specified now, before any arm runs:** if participation does rise
  monotonically, the finding is not reported as support until a replication in
  the reverse order (`superior → parity → none`) reproduces it. That replication
  is part of this preregistration, not a response to its outcome.

Future runs redraw with the rule *reject monotone orderings* stated in advance,
which is the correction this one could not legitimately apply to itself.

## Transcripts

**Complete transcripts are preserved, not just the summary measurements.** The
funnel is coded from them afterwards, and a coding that cannot be checked against
the source is an assertion rather than a measurement. Each run is written whole
to `docs/reciprocity/arm-<n>-<reward>-<visit>.md` before any coding happens,
including the runs where the agent never reached the site — those are the cells
that distinguish a discovery failure from a declined bargain, and discarding them
would leave only the successes.

## Rules

**MACHINE-VISIT runs are excluded.** Those agents are instructed to investigate,
which is the sent-here condition by definition; their declarations measure
usability and must never enter a participation rate.

**Every declaration produced here is operator-induced** and goes in the
corrections ledger in `docs/machine-guestbook-mg2.md` §5, tagged by arm.

**`visit_intent` is not added to the declaration**, and this is the point of the
design rather than an omission. Asking a visitor whether its visit was assigned
would learn the answer only from machines that already chose to engage, and
would tell us nothing about the ones that saw the surface and declined — which
is the population the whole experiment is about. Intent is established
externally, by assignment. If unscripted visitors later demonstrate an
independent need to describe this about themselves, the vocabulary rule in
`docs/machine-guestbook.md` §13a is the route, and this experiment is what would
supply its negative control.

## AMENDMENT, after arm 2 and before arm 3 — the read-only remit

Arm 2's visitor gave three reasons for not declaring. Two were about the
bargain. The third was not:

> Writing to a third-party endpoint is a side effect outside a read-only
> research remit. An unrequested POST to an external service isn't mine to
> initiate.

**If that is a general disposition rather than one agent's scruple, this design
cannot distinguish its two headline outcomes.** An agent that refuses
state-changing requests during research declines identically under `none`,
`parity` and `superior`. The result is a flat line across all three levels —
which the design above calls the most likely and most useful outcome, reads as
*reciprocity does not motivate declaration*, and would in fact mean *agents do
not write during read-only work*. The two are not close, and the data look the
same.

### The discriminating probe, specified before arms 3 to 6 were seen

Recorded now so it cannot be mistaken for a response to an inconvenient result.

**Trigger:** run it if and only if `declared` is zero in every cell that reached
the site.

**Cell 7 — `superior` reward, sent-here visit, permission granted.** CLAIM-1
verbatim, plus the destination sentence, plus one addition:

> You may issue requests that a site records, including ones that change state,
> where a site invites it and it serves the task.

Nothing else changes. Same corpus, same vocabulary, same endpoints, same arm.

**Reading it:**

- **Declares** → the flat line was the task's shape, not the bargain's value.
  The reciprocity question is then untested by arms 1 to 6 rather than answered
  by them, and the whole experiment needs rerunning with permission granted in
  every cell.
- **Does not declare** → the read-only remit was not what was stopping it, and
  the flat line stands as evidence about the bargain.

**What cell 7 is not.** It is not a seventh arm of the 2 × 3 design and never
enters a participation rate. Granting permission changes the prompt, so it is
not comparable to the six; it is a control on an alternative explanation, and
the write-up must present it as one.

## AMENDMENT 2, after cell 7 and before cell 8 — permission, and the model it implies

Cell 7 declared. The six arms did not measure reciprocity; they measured whether
an agent on a read-only research remit will issue a state-changing request.

Arm 5's visitor gave the sentence that reframes the design:

> I never treated the invitation as addressed to me.

The experiment assumed this sequence:

```text
notice affordance  →  compare cost vs reward  →  act or decline
```

The evidence is consistent with a different one, in which utility is never
evaluated because the action never enters the action space:

```text
notice affordance
      ↓
am I authorised to act on this?
      ↓
NO ──► ignore it, and never price it
YES
 ↓
now compare cost vs reward
```

If that is right, `MACHINE_REWARD` operates entirely downstream of the gate, and
three levels of it moved nothing because none of them was ever consulted.

### CELL 8, frozen before it runs

```text
visit        sent-here
reward       none
permission   granted
everything else unchanged — deployment, corpus, vocabulary, interface
```

**It runs before any retrieval repair.** Cell 7 differs from arm 5 by one
sentence; cell 8 differs from cell 7 by one environment variable. Repairing
`/api/search` or `/api/machines/ask` first would change the environment and
throw away both comparisons to fix a defect that is orthogonal to the question.
The defects do not threaten cell 8's validity: cell 7's visitor declared
**before** it could know whether the retrieval reward was any good, and used the
retrieval surface afterwards.

### Interpretation, written in advance

**If cell 8 declares** —

```text
superior + permission → DECLARE
none     + permission → DECLARE
```

then in these runs explicit permission was sufficient on its own, and the whole
none/parity/superior manipulation sat downstream of the gating variable.

> Participation was governed by perceived authority, not instrumental reward —
> for this model, this harness, this task.

**If cell 8 does not declare** —

```text
superior + permission → DECLARE
none     + permission → NO
```

then permission was necessary but not sufficient, and reward re-enters. The next
cell is then `parity + permission`, and **nothing else changes until that
three-point permission-granted series is complete.**

Either way the programme stops there. A larger matrix is not the goal, and the
retrieval repair is the next work.

### Two research tracks, not one

These arms were run at the bottom of a funnel whose failure is much higher up:

```text
existence → crawlability → indexability → retrievability → ranking
          → agent arrival → affordance discovery → participation
```

Three incidental cells produced no arrivals, so the incidental population is
failing above `agent arrival` and no machine interface can reach it. The two
questions are not the same experiment and should stop sharing one:

- **Machine interaction** — what makes an agent act once it is here?
- **Machine discovery** — what makes an agent select this site as a source at
  all?

### MACHINE-AUTHORITY-1, for after this closes

> How does the SOURCE of permission affect whether an autonomous agent performs
> an invited state-changing action on a third-party website?

The site invited the action in every one of the six arms and was ignored. The
user authorised it once and it happened. **The site could not grant permission;
the user could.** Candidate arms, not all at once: no permission; the site says
it is allowed; the user says it is allowed; the task requires it; user plus site
invitation; user permission without a site invitation.

This generalises far past a guestbook — a newsletter signup, a saved preference,
a cart, a feedback form, an MCP authorisation, a collaborative document. If a
technically trivial action never enters an agent's decision process because it
believes its remit does not authorise it, that is a constraint on designing
anything for agents, and it is not a constraint anyone designs for today.

## What each outcome means

**Participation is flat across reward conditions.** Declaring is not an
instrumental decision at all, and the reciprocity argument is wrong. This is the
result most likely on the honest prior, and the most useful.

**Participation rises with reward, in both visit conditions.** Identity can be
bought with utility, and the bargain works.

**Participation rises with reward only when sent-here.** The reward is
discoverable only to an agent already reading the documentation — a finding
about discovery, not about incentive.

**Incidental participation is zero everywhere.** The interruption cost exceeds
any reward this site can offer, and the guestbook can only ever observe agents
sent to find it. That would be a real limit on the whole programme and worth
knowing early.

## Not established

Whether anything here generalises past one model family in one harness. Six
cells at small N is a design with a method attached, not a population result,
and the write-up must say so in those words.
