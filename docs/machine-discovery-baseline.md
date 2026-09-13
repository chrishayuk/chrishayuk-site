# Discovery topology — baseline before intervention

**Captured 11 September 2026, before any link was added.** Recorded because the
change that follows spends a measurement, and a before/after is worth nothing
without the before.

## What the site had

```text
HTML pages (what a live agent reads)
  ├─ /llms.txt              linked from every page   — a plain-text file
  └─ /machine-guestbook     linked from every page   — a page ABOUT the guestbook

/machines                   NOT linked from any HTML page, NOT in the sitemap
/api/machines/declaration   linked ONLY from /machines
/api/machines/feedback      linked from NOWHERE in HTML
/api/machines/ask           linked from NOWHERE in HTML
```

The exclusion of `/machines` was deliberate. `lib/readership/visible.ts` says so:

> `/machines` is named here and deliberately not in the sitemap. It is
> advertised to machines through `/llms.txt` rather than to indexers through the
> canonical surface, which is what makes the question it exists to ask — how a
> machine visitor found it — answerable from these counters at all.

The endpoints being unlinked was **not** deliberate. Nobody chose it.

## What the baseline measured

Thirty days to 2026-09-11, 1,684 requests.

```text
population        requests   can it act?
ai_user                 50   yes — ChatGPT-User, the only live agent here
ai_search               23   no  — OAI-SearchBot, fetched robots.txt x23
ai_training            407   no  — GPTBot 353, ClaudeBot 37, Meta 16, Bytespider 1
search_bot             530   no  — Amazonbot 452, Googlebot 73, Applebot 3, bingbot 2
automation             670   operator curls, blind agents, unrecognised bots
link_preview             4   no
```

**937 of 1,684 requests come from batch crawlers with no user, no task and no
turn in which to decide anything.** They were never going to declare, and
counting them as non-participation was a category error this baseline exists to
stop repeating.

`/llms.txt`, whole window: **48 fetches — 42 curl, 4 unrecognised client, 1
Amazonbot, 1 ClaudeBot.**

Machine endpoints, whole recorded history: **127 requests, every one `curl` or
`unrecognised client`. Zero from any verified or declared fleet, ever.**

### The one population that could have acted

ChatGPT-User read 19 distinct paths across 6 hours — `/`, `/about`, `/notebook`
and six entries, `/research`, `/systems`, `/readership`, `/thread/cell80`,
`/api/records`, `/api/graph`, `/api/readership`, **and `/machine-guestbook`**.

*(`docs/authority/chatgpt-window-2026-09-11.md` restates this same session as 4
hours. Both name the same 19 paths, so it is one session, not two — the
duration is unreconciled between the two docs and is noted there rather than
corrected here without a raw re-derivation.)*

It never fetched `/llms.txt` or any `/api/machines/*` path. Every page it read
linked `/llms.txt` in HTML. It did not follow it.

## The finding this baseline establishes

> **The machine surface was reachable only by following a plain-text link that
> no live agent followed.** For an HTML-reading agent the feedback endpoint was
> three hops away — page → `/llms.txt` → prose → endpoint — and `/machines`, the
> only page linking the declaration endpoint, was linked from nowhere and absent
> from the sitemap.

The instrument worked and returned a clean negative: convention-based discovery,
on this site, over thirty days, produced two provider-crawler fetches of the
index and no endpoint contact at all.

## What changes next, and why it is recorded rather than quiet

The intervention adds HTML routes to the machine surface. That will probably
produce arrivals, and it destroys the ability to measure convention-only
discovery on this site ever again. It is being done anyway, because the question
has been answered and leaving the surface unreachable preserves a measurement
already taken.

It is recorded here, dated, so the readership record after this point is
interpretable as an intervention rather than as drift — and so MACHINE-DISCOVERY-1
inherits a real baseline instead of starting from nothing.
