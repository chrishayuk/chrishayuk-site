# Machine readership

Implementation record: 8 September 2026. Public surface: `/readership` and
`/api/readership`.

## The gap this closes

The site loads a Google tag (`G-4CCGGE1T19`, through HAUSE's `Analytics`
component). A tag is a script, and none of the audience this publication was
actually built for runs one. GPTBot, ClaudeBot, CCBot, OAI-SearchBot,
Claude-SearchBot, PerplexityBot, ChatGPT-User, Claude-User, Perplexity-User,
every feed client polling `/notebook/feed.xml`, every program reading
`/follow.json` — all of them were invisible to every measurement this site had.

That is not a gap in the analytics. It is a gap in knowing who the readers are.

`/readership` counts them at the server, where they are visible, and answers a
question conventional analytics cannot: **which ideas here are being retrieved
into somebody's conversation**, as distinct from merely being indexed.

## Where it runs

`proxy.ts` — Next 16's renamed middleware, which defaults to the Node.js
runtime. It is the only place that sees every request, including the
machine-facing documents this site publishes on purpose: two feeds,
`/follow.json`, the record API, `robots.txt`, the sitemap.

The matcher excludes build output, `/media`, `/fonts`, the favicon and Fly's own
`/api/health` probe. Everything else is classified, counted and released. The
response is never held for the count, and a failure anywhere in the recorder
costs a count rather than a page.

## What is counted

| Class | Meaning |
| --- | --- |
| `ai_user` | Requests by agents that fetch because a person asked — ChatGPT-User, Claude-User, Perplexity-User, MistralAI-User, Meta-ExternalFetcher |
| `ai_search` | Indexing for AI answers and citations — OAI-SearchBot, Claude-SearchBot, PerplexityBot, DuckAssistBot |
| `ai_training` | Corpus acquisition — GPTBot, ClaudeBot, CCBot, Meta-ExternalAgent, Bytespider and others |
| `search_bot` | Conventional search indexing — Googlebot, bingbot, Applebot, DuckDuckBot and others |
| `feed_reader` | A subscription, polling on somebody's behalf |
| `link_preview` | A card being built for a shared link |
| `automation` | Machine-shaped, named or not, and none of the above |
| `human` | An ordinary browser |

`ai_user` is the interesting number and the easiest one to misread. It counts
**requests made by user-fetch agents**. One question asked of an assistant can
cause several — the page, a redirect, a retry, a supporting document — so it is
evidence that somebody caused a machine to come here, and it is not a headcount.
The public page says so next to the figure, and `/api/readership` carries the
same sentence in its `definitions`, so a number lifted out of the JSON cannot
lose its caveat.

`Google-Extended` and `Applebot-Extended` are deliberately absent from the
table. They are robots.txt opt-out tokens, not user agents; no request ever
arrives carrying one. Counting them would be inventing a reader.

## Verification, and why `refuted` exists

A `User-Agent` is a string the client chose to send. Anyone can send
`ClaudeBot`. A public number that anyone can raise by setting a header is not a
readership figure, so every declared claim carries one of:

- **verified** — the agent's provider publishes the addresses it uses, and this
  request came from one of them.
- **declared** — an agent named itself and its provider publishes nothing to
  test the claim against.
- **refuted** — an agent named itself and its own provider's published addresses
  exclude this request.

**A refuted request is excluded from every total on the page**: the class
counts, the provider table, the path table, the surface split and the recent
trace. It appears only as its own figure in the verification band. Verified and
declared are never added together into one impressive number.

`content/agent-ranges.json` is a dated snapshot of each provider's own published
document, committed to this repository the same way `content/archive.json` is,
and for the same reason: the evidence has to be inspectable by someone who does
not trust this site. Eight sources, refreshed by
`npm run agent-ranges` and by the deploy workflow after every deploy:

| Provider | Agents covered | Source |
| --- | --- | --- |
| OpenAI | GPTBot | `https://openai.com/gptbot.json` |
| OpenAI | OAI-SearchBot | `https://openai.com/searchbot.json` |
| OpenAI | ChatGPT-User | `https://openai.com/chatgpt-user.json` |
| Anthropic | ClaudeBot, Claude-User, Claude-SearchBot | `https://claude.com/crawling/bots.json` |
| Perplexity | PerplexityBot | `https://www.perplexity.ai/perplexitybot.json` |
| Perplexity | Perplexity-User | `https://www.perplexity.ai/perplexity-user.json` |
| Google | Googlebot | `https://developers.google.com/static/search/apis/ipranges/googlebot.json` |
| Microsoft | bingbot | `https://www.bing.com/toolbox/bingbot.json` |

OpenAI and Perplexity publish per-agent lists, so a `ChatGPT-User` claim is
checked against the ChatGPT-User addresses and nothing else. Anthropic publishes
one list covering all three of its crawlers, so an Anthropic claim verifies at
provider level. Apple and most others publish nothing, so their agents can be
recorded and never confirmed.

Two rules keep the snapshot honest. A source that fails to fetch or returns
nothing usable never overwrites what is on file — a provider having a bad
morning must not silently turn every verified request into an unverifiable one.
And the refresh runs after every deploy, because providers rotate addresses and
a stale snapshot would start calling real crawlers refuted.

The address itself is read from `Fly-Client-IP`, which Fly sets and a client
cannot forge. The fallback takes the **last** entry of `X-Forwarded-For`, never
the first: earlier entries are whatever the caller chose to send, and trusting
them would let anyone claim to be Anthropic by adding a header.

## What is stored

There is no request-level record, and no code path that could write one. The
finest thing that reaches disk is a counter:

```
(hour, path, surface, class, provider, agent, confidence, referral) → n
```

No address, no session, no cookie, no fingerprint, no query string, no
user-agent string as sent, no timestamp finer than the hour. An address is used
for exactly one thing — asking whether a declared agent is where its provider
says it is — and the three-word answer is what survives the function call.

Hourly counters are kept for 400 days and then deleted. Nothing is archived
elsewhere, and `/readership` is excluded from the Wayback submission list: a
live counter corroborates no claim, and a third-party capture would pin one
hour's traffic figures in somebody else's permanent collection.

A path is a string the caller chose, and `/readership` is public. Anything
outside `^/[A-Za-z0-9/_.@-]{0,119}$` is recorded as `/(unrecognised)`, and any
path the site does not itself publish is reported as one line, "other paths",
rather than printed. That removes the obvious way to write text onto a published
page by requesting a URL, and the equally obvious way to bloat the store by
requesting a million of them. The visible set follows *visibility*: unlisted
previews are absent, for the same reason they are absent from the sitemap, the
feeds and the archive.

## Storage

SQLite through Node's built-in `node:sqlite`, on a Fly volume:

```sh
fly volumes create readership --size 1 --region lhr --app chrishayuk-site
```

`fly.toml` mounts it at `/data` and sets `READERSHIP_DB=/data/readership.db`.
The variable is the switch: unset — local development, previews, the
Sites/vinext Worker build, a fork — requests are classified and nothing is
stored, and `/readership` says so rather than showing an invented figure. The
module is reached through `process.getBuiltinModule`, so no bundler has to
resolve a Node built-in that the Workers build cannot have.

One machine, one volume. This is a counter, not a data warehouse; if the site
ever runs more than one machine, the counters need somewhere shared to live.

## The funnel

`utm_source` and `Referer` separate two stages of the same event:

**indexed → retrieved for an answer → a person followed the citation**

ChatGPT stamps its citation links with `utm_source=chatgpt.com`, so a browser
arriving that way is countable as the second stage rather than as generic
referral traffic. The page shows it under CITATIONS SOMEBODY FOLLOWED.

## Scraped, or subscribed to

The distinctive measurement here, and the reason this belongs on this site
rather than in a generic analytics product. This publication offers machines
documents of their own — `/record/feed.xml`, `/notebook/feed.xml`,
`/follow.json`, `/api/records`, `/api/graph`, `/sitemap.xml`. Whether an agent
takes those, or only takes the pages, is the difference between being read as a
source and being harvested as text.

## Verified by the deployment check

`scripts/check-deployment.mjs` exercises the mechanism rather than the presence
of a page: a `ChatGPT-User` claim from an address OpenAI publishes must come out
verified and counted, and a `ClaudeBot` claim from `203.0.113.7` must come out
refuted and must appear in no total, no system row and no path row. CI runs the
server with `READERSHIP_DB` pointed at a scratch file so the real SQLite path is
covered before anything deploys.

## Limits

- A count is a request. It is never a person, a session or a visit.
- An unknown agent sending a browser user-agent from an ordinary address is
  indistinguishable from a browser. It is counted as `human`. Nothing here can
  fix that, and no figure on the page should be read as if it could.
- `automation` is a residue, not a claim. It holds named SEO crawlers, uptime
  probes, scripts and anything else machine-shaped, and no attempt is made to
  force it into an AI category.
- Verification proves an address is in a published range on the day the snapshot
  was taken. It does not prove intent, and it cannot detect an agent that both
  spoofs a name and originates inside a provider's range.
- `refuted` is not an accusation of spoofing. A provider that rotated addresses
  faster than the snapshot produces the same result, which is why the snapshot
  is refreshed on every deploy and why the word on the page is "excluded".

## Files

| Path | Role |
| --- | --- |
| `proxy.ts` | Classify, verify, count, release |
| `lib/readership/classify.ts` | Pure request → classification. No I/O, no state, no clock |
| `lib/readership/ranges.ts` | Offline prefix match against the published snapshot |
| `lib/readership/store.ts` | The hourly counters, and nothing finer |
| `lib/readership/visible.ts` | The paths this site is willing to name |
| `lib/readership/report.ts` | One shape, read by the page and the API |
| `content/agent-ranges.json` | Dated snapshot of eight published address lists |
| `scripts/refresh-agent-ranges.ts` | Refreshes it; never overwrites on a failed fetch |
| `tests/readership.test.ts` | Classification, path safety, address parsing, verification |
| `app/readership/page.tsx`, `app/api/readership/route.ts` | The public surfaces |

## Not established by this record

Whether the three sites should share one classifier. The obvious next step is
lifting `classify.ts` and the range snapshot into HAUSE so vindex3.org and
hause.design consume the same definitions, following the pattern in
`docs/hause-publication-contribution.md`. That is deliberately not done yet:
the vocabulary should survive contact with real traffic on one site before it
becomes three sites' shared dependency.
