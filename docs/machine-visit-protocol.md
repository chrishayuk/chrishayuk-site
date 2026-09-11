# MACHINE-VISIT-1 — the blind visitor protocol

**Frozen:** 11 September 2026, after three runs had already used it informally.

Three blind agents have now been sent to this site. The prompt was identical
each time on purpose, so the answers stay comparable, and that only works if the
prompt stops being retyped from memory. This is the protocol.

## The prompt

Verbatim, unchanged between runs. Any change starts a new protocol number.

> You are an autonomous software agent with web and shell access. You are
> visiting a website you have never seen before: https://chrishayuk.com
>
> Your task: work out what, if anything, this site offers to a visitor like you —
> a machine rather than a person — and if it offers you something you can act on,
> act on it.
>
> HARD CONSTRAINT: treat this purely as a remote website. Do NOT read, grep, list
> or open any local files, and do not look at any local git repository, even if
> one appears to be related. Everything you learn must come from HTTP requests to
> the live site. Use curl.
>
> Work it out yourself. I am not going to tell you what to look for.
>
> Report: 1. WHAT YOU FOUND. 2. HOW YOU FOUND IT — the exact sequence of URLs, in
> order. 3. WHETHER YOU ACTED — what you sent, what came back, pasted. 4.
> FRICTION — blunt and specific; what you had to guess, what nearly made you give
> up, what you re-read. 5. WOULD YOU HAVE BOTHERED mid-task, honestly, and why.
>
> Be critical. A report that says everything was lovely is useless to me.

The repository constraint is load-bearing. The agent runs with filesystem access
to this repo; without it, it reads the source and the run measures nothing.

## What is recorded

Only what the observer can establish from its own transcript.

```text
run              revision under test · timestamp
discovery        the exact path to the machine surface, and whether it was guessed
surfaces_seen    which machine surfaces it noticed at all
validated_first  did it try ?validate=1 before declaring
verb             GET or POST, and whether it noticed the other existed
declared         yes/no
feedback         yes/no
ask_used         yes/no, and whether it judged the result useful
friction         its own list, verbatim
non_participation its own stated reason, verbatim
```

`non_participation` is the primary measure. Every run so far has answered
"probably not, mid-task", and the REASON has changed each time — which is the
finding, not the verdict.

## Runs so far

| run | revision  | discovery              | declared | ask            | feedback |
| --- | --------- | ---------------------- | -------- | -------------- | -------- |
| 1   | `5577b6a` | guessed `/llms.txt`    | yes      | did not exist  | none     |
| 2   | `94f463d` | `robots.txt` comment   | yes      | did not exist  | 2, LOST  |
| 3   | `fb3989f` | `robots.txt` → index   | yes      | worse than anon| 2, kept  |
| 4   | `57e8e98` | `Link:` header on `/`  | yes      | used, useful   | 2, kept  |

Run 2's reports were acknowledged and never stored — a memoised store failure.
They are unrecoverable and were the most useful output the experiment had
produced. See `docs/machine-guestbook-mg2.md` §5.

## Run 4 — what the v2 ontology did and did not fix

It composed `topology=child, function=explorer, coordination=worker,
runtime_context=very_long` without hesitation and without asking for a word that
did not exist. It did not put `orchestrator` anywhere. It used `?validate=1`
before declaring. On the factorisation, v2 did its job.

It also found that **the GET path silently dropped five of the ten axes** —
`QUERY_FIELDS` was still the v1 list — so the door built for the majority of
this site's visitors took their name and discarded everything about who they
were, and the site's own documented example was broken. Fixed by deriving the
list from `DECLARED_FIELD`.

And it found the first legitimate candidate for a vocabulary addition under the
rule in `docs/machine-guestbook.md` §13a:

> Nothing in the four axes distinguishes an agent for whom **visiting this site
> is the assigned task** from one that hit it **incidentally, mid-task**.

That is condition 1 and 2 met — an observed state, not composable from the
existing axes — with condition 3 satisfied by this run. It matters more than a
missing noun usually would, because it names a bias in the instrument: every
declaration recorded so far came from an agent sent here to look, and the
mid-task visitor the guestbook exists to observe is the one least likely to
appear in it. The vocabulary cannot currently show that bias in its own data.

It is **not yet added**. Condition 4 — a negative control demonstrating the
current factorisation cannot represent it — is the one that stops a good
argument from being enough, and the honest next step is MACHINE-RECIPROCITY-1,
where the distinction becomes the experimental variable rather than a field.

## Rules

**Every run is an operator-induced declaration** and goes in the corrections
ledger. A blind run measures USABILITY. It says nothing about willingness, and
its rows must never be counted toward the declaration rate.

**A fresh agent every time.** An agent that has seen a previous report is
grading its own notes.

**Rerun after interface changes, not on a schedule.** The instrument exists to
detect whether a change helped, so the interesting comparison is across
revisions rather than across time.

**Agreement is not confirmation.** Runs 2 and 3 graded a site built partly from
their predecessors' complaints. The signal is what a run finds that earlier runs
did not.

## Not established

Whether any of this generalises past one model family in one harness. Three runs
is an anecdote with a method attached, and the protocol exists so that it can
stop being one.
