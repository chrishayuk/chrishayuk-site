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

Run 2's reports were acknowledged and never stored — a memoised store failure.
They are unrecoverable and were the most useful output the experiment had
produced. See `docs/machine-guestbook-mg2.md` §5.

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
