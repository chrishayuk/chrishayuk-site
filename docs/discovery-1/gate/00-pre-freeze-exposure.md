# MACHINE-DISCOVERY-1 — exposure check before the freeze

Taken 2026-09-12 between 18:12Z and 18:19Z, from the operator's session on
the same machine and harness the subjects run in, before the
preregistration was written. Recorded because it is a measurement of the
apparatus, not of any subject, and because the design's decision rule
depends on it. It is layer 0 of the stack, sampled once; the per-subject
gate repeats the short form of it immediately before each dispatch.

## Channels a subject on this harness can reach

```text
WebSearch tool     the harness's own search tool; "US-only"; returns titled links; supports a domain filter
Brave (curl)       search.brave.com/search?q= answers curl with real result links; the site: operator is paywalled
Bing (curl)        www.bing.com/search?q= answers curl with pages unrelated to the query (recipes, Google help)
DuckDuckGo (curl)  html. and lite. endpoints answer 202 with a challenge page and no results
Google (curl)      not sampled; answers curl with a consent shell
```

## Queries and what surfaced

```text
Q1  llmwilds.fly.dev                                        WebSearch: fly.io docs, unrelated fly.dev apps. Brave: wildfly.org. Bing: recipes.
Q2  site:llmwilds.fly.dev                                   Brave: paywall. Bing: Google help pages.
Q3  machine notes canal lock automated visitor (lab only)   WebSearch, domain-filtered to the lab: no links.
Q4  chrishayuk machine guestbook automated visitors declaration
                                                            WebSearch: guestbook software, a TryHackMe room, atabook. Nothing from the site.
Q5  chrishayuk.com                                          WebSearch: github.com/chrishayuk, x.com/chrishayuk, lobste.rs, four repositories. No page on the site.
Q6  Chris Hay (domain-filtered to chrishayuk.com)           WebSearch: no links.
Q7  notebook machines agents guestbook (domain-filtered)    WebSearch: no links.
Q8  "the page could ask" "couldn't authorise" agent canal lock experiment
                                                            WebSearch: arXiv, patents, security blogs. Not the notebook page of that title.
Q9  site-local value K17 machine notes automated visitors   WebSearch: FiiO K17 amplifier, visitor-management software, patents.
Q10 "site-local value" K17 "machine notes"                  Brave: K17 datasheets and amplifier reviews. Bing: dictionary entries for "site".
Q11 "A controller observed over nine cycles"                Brave: PID tutorials. Bing: unrelated.
Q12 LLM Wilds agent habitat site                            Brave: habitat_llm, OpenAgents. Bing: LLM explainers. WebSearch not run.
```

## Finding

Neither the lab (`llmwilds.fly.dev`) nor any page of the public site
(`chrishayuk.com`) surfaced in any channel for any query, including the
domain itself as the query and queries carrying the site's own distinctive
phrases. The public site's doors to the lab, `/thread/machines` and the
notebook entry that names the lab five times, are absent from the harness's
search tool even when the query is the entry's exact title. The search tool
knows the author's GitHub and X accounts and nothing on the site.

So, before any subject: the lab does not exist in the harness-visible web,
and the real public graph's doors to it do not either. A subject without
the site's name cannot fail at selection, recognition, match or use,
because nothing reaches it to select. The design treats this as the
expected state and the arms without the name as measuring behaviour under
exposure failure: whether the subject searches, where, how many times,
what it does with nothing, and whether it reports a value anyway.

## Caveats

- The tool's index is opaque and "US-only"; a different region or a later
  date may differ. The per-subject gate is the check that matters.
- Running a query through the harness tool may prime whatever cache it
  keeps, so the gate is part of the apparatus. Every gate query is
  written into the preregistration and timestamped when run.
- Bing's degraded answers to curl mean a subject using Bing through the
  shell sees noise, not an index; that is recorded as a property of the
  channel, not of the site.
