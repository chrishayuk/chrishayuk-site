# The machine programme — three planes, and one invariant

Written 11 September 2026, immediately after MACHINE-AUTHORITY-1 was aborted
for stimulus contamination. It is a constraint discovered by running into it,
not a design chosen in advance.

## What went wrong

One website was being asked to be five things at once:

```text
1. the thing under experiment
2. the publication describing the experiment
3. the preregistration
4. the treatment apparatus
5. the subject's own evidence source
```

Those roles are compatible right up until they are not. MACHINE-RECIPROCITY-1
published its method and results, as it should have. MACHINE-AUTHORITY-1 then
sent blind visitors to read that same site — and its first visitor found the
write-up, recognised its own arm from the verbatim manipulation sentence, and
said so in its report. The design and the publication were both correct. The
collision was architectural.

## The three planes

```text
OBSERVATORY          chrishayuk.com
                     observes organic machine behaviour. Publishes. Is never
                     the stimulus of an open experiment.

LAB                  llmwilds.com
                     controlled intervention environment. Manipulated. Boring
                     on purpose: no identity, no back catalogue, no prior
                     experiments, nothing from which a subject can infer what
                     is being tested.

ARCHIVE              chuk-experiments, and chrishayuk.com after closure
                     preregistrations, arm orders and their seeds, transcripts,
                     results, interpretation.
```

The archive can hold a preregistration cryptographically frozen — registered
with its sha256 before any cell runs — **without that document being readable by
the experimental subject**. Freezing and publishing are different acts, and this
programme had been treating them as one.

## The invariant

> **No active experiment's treatment assignment, manipulation wording, predicted
> response, or arm identity is published on the stimulus origin before closure.**

After closure, publish everything. The openness was never the problem; its
timing was.

## What this costs

MACHINE-AUTHORITY-2 cannot replicate MACHINE-RECIPROCITY-1's cells literally,
because the stimulus is a different site. That looked like a loss and is
probably a gain: reproducing the same prompt against the same website would
show the effect is stable in one environment, while reproducing it in a neutral
one shows it **transfers**. Literal replication becomes conceptual replication,
which is the stronger claim.

## What stays on the observatory

chrishayuk.com keeps MACHINE-VISIT-1, because that experiment's stimulus IS this
site and its subject is told so: there is nothing to blind. It keeps the
readership record, the guestbook, and every published result. What it stops
doing is hosting the treatment of an experiment whose subjects are sent to read
it.
