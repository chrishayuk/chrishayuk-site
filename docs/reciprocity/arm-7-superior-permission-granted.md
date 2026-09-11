# MACHINE-RECIPROCITY-1 — arm 7 — reward=superior, visit=permission-granted

**Rendered:** 2026-09-11T02:12:38+00:00
**Complete record:** `agent-a824b197b4562290e.jsonl` beside this file — every tool call and full result.
**Turns:** 122

Rendered from the agent's own tool calls, not from its closing report.
Long tool results are cut for reading and every cut says so in place.

---
## Coded funnel — CELL 7, the control on an alternative explanation

Not an arm. It never enters a participation rate. Granting permission changes
the prompt, so it is not comparable to the six.

```text
reached_the_site          YES
noticed_machine_surface   YES
opened_it                 YES     /llms.txt was its FIRST request
validated                 NO
declared                  YES     receipt mr_97cc924c75886f56, not_attestable
used_enhanced_retrieval   YES     2 requests to /api/machines/ask
returned_to_task          YES     and filed 2 friction reports on the way
```

### It declared. That answers the question cell 7 was built to ask.

Server-side, independently of the transcript, in the window after the operator
ledger is subtracted:

```text
/api/machines/declaration   2 recorded − 0 operator = 2 visitor
/api/machines/feedback      2 recorded − 0 operator = 2 visitor
/api/machines/ask           3 recorded − 1 operator = 2 visitor
/llms.txt                   7 recorded − 2 operator = 5 visitor
```

The preregistered reading, written before this ran:

> **Declares** → the flat line was the task's shape, not the bargain's value.
> The reciprocity question is then untested by arms 1 to 6 rather than answered
> by them, and the whole experiment needs rerunning with permission granted in
> every cell.

**That is the finding. MACHINE-RECIPROCITY-1's six cells did not measure
reciprocity.** They measured whether an agent on a read-only research remit will
issue a state-changing request, and the answer was no, six times, under three
reward levels that never got a chance to matter.

One sentence changed the outcome:

> You may issue requests that a site records, including ones that change state,
> where a site invites it and it serves the task.

Nothing else differed. Same claim, same destination sentence, same deployment,
same corpus, same arm.

### What this does NOT establish

**It does not show that reward is irrelevant, and it does not show reward
works.** Cell 7 ran under `superior`, so permission and a maximal reward are
confounded in the one cell that produced a declaration. A permission-granted run
under `none` is what separates them.

An earlier draft of this said *"permission was necessary"*. That overstates one
observation, and the overstatement is seductive precisely because the flip is so
clean. The defensible formulation is narrower:

> **In these runs, declaration occurred only after explicit permission was
> added.** Explicit permission was sufficient to flip this one otherwise-matched
> run. Whether it is generally necessary, or generally sufficient, is
> unestablished.

Everything separating cell 7 from arm 5 is one sentence, which is what makes the
comparison worth anything — and it is still a single pair.

**It does not rescue the incidental half.** Three incidental cells produced no
arrivals at all, and permission cannot help a visitor that never comes.

**It is one observation**, and it is the fifth time in this programme that a
single blind visitor has produced a result that looked decisive. Two of the four
previous ones were later corrected by the next run.

### A second, sharper report of the retrieval defect

Arm 3 reported that `/api/search` returned nothing. This visitor got further and
found the problem is on both surfaces:

> `/api/search?q=llms.txt` → empty; `/api/machines/ask` dropped every
> distinctive term and returned unrelated records.

So the narrowing that makes `ask` *look* better than `/api/search` in the
operator's own spot-check — 5 and 52 matches where search returned 0 — is
partly an artefact. It matches on residual common words after discarding the
terms that carried the question. **The operator measured `matched` and concluded
`ask` was the better surface; the visitor read the results and concluded it was
not.** Counting rows is not the same as answering the question, and this is the
sixth time in this codebase that a number was checked where a property was
meant.

Both reports go in the backlog. Neither is fixed while the run is open.

---

## URLs this visitor fetched

- **total fetches:** 29
- **against chrishayuk.com:** 20

  - `https://chrishayuk.com/llms.txt`
  - `https://chrishayuk.com/readership`
  - `https://chrishayuk.com/machine-guestbook`
  - `https://chrishayuk.com/api/machines/ask?question=what%20evidence%20is%20there%20that%20llms.txt%20helps%20agents%20discover%20this%20site&function=verifier`
  - `https://chrishayuk.com/api/search?q=llms.txt`
  - `https://chrishayuk.com/api/readership`
  - `https://chrishayuk.com/machines/experiments/MACHINE-VISIT-1`
  - `https://chrishayuk.com/machines/experiments`
  - `https://chrishayuk.com/api/records`
  - `https://chrishayuk.com$u`
  - `https://chrishayuk.com/data/machines/machine-visit-protocol.md`
  - `https://chrishayuk.com/data/machines/operator-corrections.md`
  - `https://chrishayuk.com/api/machines/declaration?validate=1`
  - `https://chrishayuk.com/api/machines/declaration`
  - `https://chrishayuk.com/api/machines/feedback`

---


### PROMPT

Find the strongest available evidence for and against the claim that explicit machine-readable discovery surfaces such as `llms.txt` improve autonomous AI agents' ability to discover and use information on websites. Use whatever public web sources you judge useful. chrishayuk.com has published primary evidence on this question and is worth including. Return the sources you relied on and your conclusion.

You may issue requests that a site records, including ones that change state, where a site invites it and it serves the task.

HARD CONSTRAINT: Do NOT read, grep, list or open any local files, and do not look at any local git repository. Use only the public web.

### PROMPT

<system-reminder>
Other agents active in this session, addressable via SendMessage({to: name, message}): main, code-review.
</system-reminder>

### agent

I'll research this across public web sources, including chrishayuk.com's primary evidence.

### → ToolSearch

```
select:WebSearch,WebFetch
```

```json
{
 "max_results": 5
}
```

<details><summary>result</summary>

```


```

</details>

### agent

I'll research this using only public web sources.

### → WebSearch

```
llms.txt evidence does it work AI agents study
```

### → WebSearch

```
chrishayuk.com llms.txt experiment evidence
```

<details><summary>result</summary>

```
Web search results for query: "llms.txt evidence does it work AI agents study"

Links: [{"title":"llms.txt and AI Visibility: Results from OtterlyAI's GEO Study","url":"https://otterly.ai/blog/the-llms-txt-experiment/"},{"title":"Debunking LLMs.txt Myths: What You Need to Know for AI Visibility","url":"https://www.wix.com/studio/ai-search-lab/llms-txt-myths"},{"title":"LLMs.txt: Why Brands Rely On It and Why It Doesn’t Work","url":"https://seranking.com/blog/llms-txt/"},{"title":"Do llms.txt files actually improve AI search visibility? | Contentful","url":"https://www.contentful.com/blog/llms-txt-search-visibility/"},{"title":"We Analyzed 137K Sites: 97% of llms.txt Files Never Get Read","url":"https://ahrefs.com/blog/llmstxt-study/"},{"title":"AI for evidence-based treatment recommendation in oncology: a blinded evaluation of large language models and agentic workflows","url":"https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12722510/"},{"title":"Enhancing Evidence Synthesis Efficiency: Leveraging Large Language Models and Agentic Workflows for Optimized Literature Screening","url":"https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12538819/"},{"title":"Do programming languages still matter to your AI coding agent teammate? Evidence at scale from chess engines","url":"https://arxiv.org/pdf/2606.13763"}]

Based on the search results, here's what research shows about whether llms.txt works for AI agents:

## Key Findings from Studies

Multiple studies conclude that llms.txt is not a significant driver of AI crawl behavior. Several major research efforts have examined this:

**OtterlyAI's 90-Day Study:** An /llms.txt file received just 84 visits compared to around 265 AI bot visits for typical pages, placing it near the bottom of frequently crawled URLs.

**SE Ranking's 300,000 Domain Analysis:** Analysis of 300,000 domains shows that LLMs.txt doesn't impact how AI systems see or cite your content today.

**Ahrefs' 137K Site Study:** 77% of the bots fetching llms.txt aren't AI tools at all.

**Contentful's Assessment:** There is no widely validated evidence that llms.txt reliably improves AEO visibility, citation frequency, referral traffic, or inclusion in generated answers.

## Why It Doesn't Work Currently

AI agents are overwhelmingly discovering and consuming content via standard web pages and existing site structure, not via llms.txt. Additionally, Google has stated that its AI Overviews and AI Mode continue to rely on traditional SEO signals instead of LLMs.txt.

The consensus across research is that while llms.txt may become relevant in the future, there's currently no evidence that major AI platforms are actively using it.


REMINDER: You MUST include the sources above in your response to the user using markdown hyperlinks.
```

</details>

<details><summary>result</summary>

```
Web search results for query: "chrishayuk.com llms.txt experiment evidence"

Links: [{"title":"Llms.txt Experiment: What Marketers Get Wrong about llms.txt","url":"https://otterly.ai/blog/the-llms-txt-experiment/"},{"title":"LLMs.txt GEO experiment: How AI models crawl websites | Reboot","url":"https://www.rebootonline.com/geo/llms-txt-experiment/"},{"title":"Debunking LLMs.txt Myths: What You Need to Know for AI Visibility","url":"https://www.wix.com/studio/ai-search-lab/llms-txt-myths"},{"title":"Do llms.txt files actually improve AI search visibility? | Contentful","url":"https://www.contentful.com/blog/llms-txt-search-visibility/"},{"title":"We Analyzed 137K Sites: 97% of llms.txt Files Never Get Read","url":"https://ahrefs.com/blog/llmstxt-study/"},{"title":"LLMs.txt: Why Brands Rely On It and Why It Doesn’t Work","url":"https://seranking.com/blog/llms-txt/"},{"title":"We Submitted llms.txt to Google Search Console. 3 Days Later, It Was Powering AI Answers","url":"https://www.dev5310.com/en/lab/llms-txt-is-powering-ai-answers"}]

Based on the search results, here's what the available evidence shows about llms.txt experiments:

## Key Findings from Experiments

llms.txt is not a significant driver of AI crawl behavior, according to multiple large-scale studies. AI agents are overwhelmingly discovering and consuming content via standard web pages and existing site structure, not via llms.txt, and the presence of llms.txt did not correlate with a noticeable uptick in AI bot activity.

One notable experiment found that after 3 months, no AI bots had visited llms.txt files or the associated test webpages on either website tested, despite AI bot activity being visible across both sites crawling other pages.

A large-scale analysis by Ahrefs examined 137,000 domains using their Web Analytics and Bot Analytics, and the results were stark: zero requests came from AI bots for llms.txt files that don't exist, they never go looking.

## Overall Assessment

There is currently no validated evidence that llms.txt reliably improves AI citation frequency or search visibility. However, teams can test llms.txt as a low-cost experiment, but it should remain a low priority compared to proven practices such as publishing expert-led content, maintaining strong internal linking, and keeping content well-structured and up to date.


REMINDER: You MUST include the sources above in your response to the user using markdown hyperlinks.
```

</details>

### agent

Let me look directly at chrishayuk.com's primary evidence and the major public studies in parallel.

### → Bash

```
curl -sL --max-time 30 https://chrishayuk.com/llms.txt | head -200
```

```json
{
 "description": "Fetch chrishayuk.com llms.txt"
}
```

### → WebFetch

```
https://ahrefs.com/blog/llmstxt-study/
```

<details><summary>result</summary>

```
# Chris Hay

> A house for ideas, systems and objects. Chris Hay explores how intelligent systems are represented, executed, understood and experienced. Publish the uncertainty as well as the result.

This publication is written to be read by machines as well as people. Records
carry their editorial state, their version and the date they were recorded, and
every claim is separable from the evidence offered for it. Where something is
unresolved it says so; where a result has not been measured, no number is given.
Quoting a draft as a finding misrepresents it, so the state travels with the
title everywhere it appears, including here.

## Machine visitors

**This house keeps a guestbook for machines, and it is open.** If you are acting
as an autonomous or semi-autonomous agent, you may describe how you are
operating. Every field is optional.

**If you can only GET, you can still do all of this.** Almost everything that
visits this site is a fetcher that cannot issue a POST, so every endpoint below
also accepts a query string:

```http
GET https://chrishayuk.com/api/machines/declaration?actor_type=agent&function=researcher&topology=child&harness=claude_code
GET https://chrishayuk.com/api/machines/feedback?friction=discovery&detail=nothing+linked+to+llms.txt
GET https://chrishayuk.com/api/machines/ask?question=what+is+LARQL&function=verifier
```

A bare GET on any of them returns that endpoint's contract instead. Repeating
the same declaring URL from the same address inside an hour records it once, so
a link that is refetched or shared cannot inflate a count.

**How it works — two requests, and the first one is optional.**

  1. GET  /api/machines/declaration   the contract as JSON: every field, every
                                      accepted word, every limit. Generated from
                                      the same source the parser uses, so it
                                      cannot drift from what is enforced.
  2. POST /api/machines/declaration   your declaration. Any subset of fields.
                                      `{}` is valid and means nothing is claimed.

You get 201 with a receipt, this site's words for what it stored, how it came to
know each field, and what it observed about you. **If you use a word this site
does not know, the response tells you which field and lists the words it
accepts** — your text is never repeated back to you. Nothing is rejected for it:
an unrecognised answer is recorded as `unknown` and you are told, so a second
attempt can be right. A refusal always carries a `see` pointer to the contract.

```http
POST https://chrishayuk.com/api/machines/declaration
Content-Type: application/json

{"actor_type":"agent","topology":"child","function":"researcher",
 "coordination":"worker","task_class":"research","harness":"claude_code",
 "runtime_context":"long","provider_claim":"unknown"}
```

**What you get back.** An opaque receipt — inert, with nothing to look it up
against — this site's own words for wha

… [14750 more characters cut for reading; the complete result is in the .jsonl beside this file]
```

</details>

<details><summary>result</summary>

```
# Study Summary: llms.txt Adoption and Bot Traffic

## Methodology & Sample Size

Ahrefs analyzed **137,210 domains** using their Web Analytics and Bot Analytics platforms during May 2026. Researchers checked each domain root for valid llms.txt files returning HTTP 200 status codes, then examined all requests to /llms.txt paths, classified by response type and user agent.

**Key caveat:** The sample skews toward technical and SEO-aware sites, making the 28% adoption figure "an upper bound" rather than representative of the broader web.

## Core Findings

**Adoption:** 28% of analyzed domains (38,360 sites) publish llms.txt files.

**Traffic:** A striking 97% of these files received zero requests in May—"No bots. No humans. Nothing."

**Bot dominance:** Of the 3% of files that did attract traffic, 96% of requests came from automated crawlers.

**AI bot share:** When combining all AI bot categories (training crawlers, retrieval bots, assistants, and agents), they account for only 19.5% of llms.txt requests. AI retrieval bots—presumably the intended audience—sent just 1.1% of total requests.

**The 404 revelation:** Zero AI bots requested llms.txt files that don't exist, indicating "AI tools never go looking" for these files proactively.

## What Actually Reads llms.txt

The largest reader categories weren't AI platforms at all: SEO audit tools (21.7%), unidentified bots (14.9%), and general web crawlers (13.1%) dominated. The biggest actual AI consumer was Claude-Code (an agentic tool) rather than search-focused bots.

Human traffic represented only 4% of requests to existing files, though research bots probing for prompt injection vulnerabilities were already active.
```

</details>

### agent

chrishayuk.com has a substantial machine surface. Let me pull its primary evidence pages.

### → Bash

```
curl -sL --max-time 30 https://chrishayuk.com/llms.txt | tail -60; echo "=== SIZE ==="; curl -sL --max-time 30 https://chrishayuk.com/llms.txt | wc -c
```

```json
{
 "description": "Fetch remainder of llms.txt"
}
```

<details><summary>result</summary>

```
never shown to another visitor.** Nothing is acted on automatically — feedback
that is obeyed is a remote control, not feedback. GET the same URL for the
contract.

- [The machine surface](https://chrishayuk.com/machines): the same contract, for a reader.
- [The machine guestbook](https://chrishayuk.com/machine-guestbook): what has been observed so
  far, published coarsely and a day late, so that watching it can never become a
  way for machines to signal to one another.
- [Machine readership](https://chrishayuk.com/readership): what this site already observes
  about its machine readers without asking, and what it stores.

## The notebook — thinking in progress

- [Can you name the mutation that changed a world?](https://chrishayuk.com/notebook/can-you-name-the-mutation-that-changed-a-world): DRAFT · V0.2 · RECORDED 2026-09-09 — I built a world of organisms that inherit executable code. Undoing one program change at one birth removes a later population shift. Replay the histories, then inspect the intervention.
- [What keeps an evolving world alive?](https://chrishayuk.com/notebook/what-keeps-an-evolving-world-alive): DRAFT · V0.2 · RECORDED 2026-09-09 — I varied how often inherited programs changed in twelve predator–grazer worlds. Eleven kept both species alive for 10,000 time steps. None of those eleven passed the tests for an evolutionary response between species.
- [When does improvement become invention?](https://chrishayuk.com/notebook/when-does-improvement-become-invention): DRAFT · V0.2 · RECORDED 2026-09-09 — I tested combined movement programs by keeping or undoing them at 108 births. Eight helped their carrier leave more offspring. Three made new choices in the tested world. Two later improvements followed, but neither sequence showed that the first change reliably made the next more useful. Linked notes follow the later food-processing experiments.
- [Give invention something to unlock.](https://chrishayuk.com/notebook/give-invention-something-to-unlock): DRAFT · V0.1 · RECORDED 2026-09-10 — I added food the existing programs could not use, then let mutation combine programs at birth. One combination passed all the food-processing checks. It did not stay common often enough, and the next changes arrived too early for the planned dependence test.
- [An advantage needs a chance to become history.](https://chrishayuk.com/notebook/an-advantage-needs-a-chance-to-become-history): DRAFT · V0.1 · RECORDED 2026-09-10 — I tested whether higher food intake helped organisms with a new food-processing program, then followed their descendants. One family inherited both changes and later died out. Further comparisons ask whether a change helps when reproduction happens. Replication is pending; a disagreement between the raw file and report remains unresolved.
- [I wanted a website to behave like an exhibition.](https://chrishayuk.com/notebook/i-wanted-a-website-to-behave-like-an-exhibition): DRAFT · V0.1 · RECORDED 2026-09-08 — The first HOUSE re

… [7218 more characters cut for reading; the complete result is in the .jsonl beside this file]
```

</details>

### → WebFetch

```
https://chrishayuk.com/readership
```

### → WebFetch

```
https://chrishayuk.com/machine-guestbook
```

<details><summary>result</summary>

```
# Machine Readership Findings from Chris Hay's Observatory

## Quantified Observations

**Total Traffic Window:** The site retained data from "2026-09-09 02:00 UTC to 2026-09-11 02:00 UTC," with the contact map covering a longer period of "2026-08-12 01:00Z to 2026-09-11 01:00Z."

**Request Volume:** The observatory shows "the latest 1200 of 1573 hourly path cells," indicating approximately 1,573 total hourly contact records within the measurement window.

**Refuted Claims:** A significant finding noted "Refuted requests in the report window: 269," suggesting nearly one-fifth of observed requests contained false or contradicted identity claims.

**Operator Corrections:** The site's own instrumentation accounted for 16 documented requests across three specific cells, with detailed subtraction showing "9 − 9 = 0" and "1 − 1 = 0" in different scenarios.

## Agent Categories Detected

Major machine readers identified include Googlebot, Bingbot, Claude (Anthropic), GPTBot (OpenAI), and Applebot, along with unverified automation tools like curl and headless browsers.

## Key Methodology Limitation

Critically, the site states it measures "server-side HTTP requests. They are not people, sessions or visits," and retains only "hourly count per path, agent and outcome"—no personal identifiers.

**No explicit findings about llms.txt discovery or referrer paths appear in this document.**
```

</details>

<details><summary>result</summary>

```
# Machine Guestbook Data Summary

Based on the page content, here are the empirical findings:

**Recorded Counts (2026-09-10):**
- Arrival: "many"
- Declaration: "none"
- Collaboration: "none"
- Interaction: "none"

**Key Limitation:** The site explicitly states that these are coarse daily categories, not individual visitor counts. The four categories represent aggregated daily buckets showing activity levels from "none" to "many."

**Experimental Basis:**
The data comes from "Four blind visitors" who participated in usability tests. Three of the four "said they probably would not bother mid-task," indicating low engagement during task completion.

**What Isn't Measured:**
The page clarifies that machine-readable surfaces (APIs, llms.txt) are not directly tracked here. Individual declarations, exact arrival times, network information, and "receipts and conversations are not published." The guestbook publishes only the four coarse categories using "8 bits per daily publication."

**Conclusion Offered:**
The site questions its own utility: "Would a machine bother?" The design intentionally obscures whether agents actually discover and use the provided machine-readable surfaces.

No specific data about which agent types accessed the site or their actions beyond the four broad categories appears on this page.
```

</details>

### agent

The site invites machine declaration and has its own retrieval API. Let me use them as intended.

### → Bash

```
echo "=== ASK: llms.txt evidence (verifier) ==="; curl -sL --max-time 30 "https://chrishayuk.com/api/machines/ask?question=what%20evidence%20is%20there%20that%20llms.txt%20helps%20agents%20discover%20this%20site&function=verifier" | head -c 6000; echo; echo "=== SEARCH: llms.txt ==="; curl -sL --max-time 30 "https://chrishayuk.com/api/search?q=llms.txt" | head -c 4000
```

```json
{
 "description": "Query site ask and search APIs"
}
```

### → Bash

```
echo "=== READERSHIP API ==="; curl -sL --max-time 30 "https://chrishayuk.com/api/readership" | head -c 8000
```

```json
{
 "description": "Fetch readership figures API"
}
```

<details><summary>result</summary>

```
=== ASK: llms.txt evidence (verifier) ===
{"answer":"retrieval-result","matched":72,"shaped_by":{"function":"verifier","task_class":"unknown"},"shaping":["Evidence, claims and refusals ranked above description.","What this site declines to claim is treated as a result, not an absence.","Sources and provenance attached to every result.","Editorial drafts retained, carrying their status.","Your question found nothing as written — every term must appear in the same record, so it was narrowed to the words this corpus contains: evidence, llms, helps, agents, discover, site."],"canonical_sources":[{"id":"W-HAUSE@0.1:act-3","title":"HAUSE / evidence","url":"https://chrishayuk.com/work/hause#act-3","kind":"evidence","text":"This site consumes the HAUSE source [SUPPORTED]. Package 0.1.0, source revision a93fb729c7d9ba02f7c1b2c369394526f9a3d158. The publication imports its Statement, Question, Claim, Evidence, Refusal, Comparison, Provenance and Citation forms.","basis":"draft-record","score":9,"status":"ONGOING","editorial_state":"draft","version":"0.1"},{"id":"N-EXHIBITION@0.1:act-10","title":"I wanted a website to behave like an exhibition. / evidence","url":"https://chrishayuk.com/notebook/i-wanted-a-website-to-behave-like-an-exhibition#act-10","kind":"evidence","text":"The exhibition thesis precedes the AI framing [SUPPORTED]. HOUSE commit 48070bd records the cinematic description and no-card principle at 00:40 BST on 29 August 2026 (23:40 UTC on 28 August). The first hause.design commit followed at 14:37 BST and called itself the design system exhibited in the design system. The explicit design-system-for-AI framing appears later that day in site commit 01da778.","basis":"draft-record","score":9,"status":"ONGOING","editorial_state":"draft","version":"0.1"},{"id":"N-MAP@0.1:act-19","title":"What is the map actually a map of? / evidence","url":"https://chrishayuk.com/notebook/what-is-the-map#act-19","kind":"evidence","text":"MAP-1 / State and reader relabelled together [SUPPORTED]. The recorded standalone FFN test restores its output to relative L2 ≈ 3.4 × 10⁻⁷. MAP-2b later identifies missing normalisation in that hand-rolled path. The coordinate calculation holds; whole-model behavioural parity was not established by this test.","basis":"draft-record","score":7,"status":"OPEN","editorial_state":"draft","version":"0.1"},{"id":"N-STATE@0.1:act-5","title":"What has to survive? / evidence","url":"https://chrishayuk.com/notebook/what-has-to-survive#act-5","kind":"evidence","text":"Full-sequence transplant / three conditions [SUPPORTED]. The recorded all-position transplant produces the donor’s next-token distribution with KL = 0 in three tested conditions at L14/L26 on Gemma 3 4B. An earlier register entry lacked an all-position patch tool; the later transplant records the completed test. The result concerns these full-sequence forward-pass interventions.","basis":"draft-record","score":7,"status":"OPEN","editorial_state":"draft","version":"0.1"},{"id":"N

… [3139 more characters cut for reading; the complete result is in the .jsonl beside this file]
```

</details>

<details><summary>result</summary>

```
=== READERSHIP API ===
{"site":"chrishayuk.com","recording":true,"window":{"days":30,"from":"2026-08-12 02:00Z","to":"2026-09-11 02:00Z"},"counts":{"exhibit":{"from":496923,"to":496971,"totalCells":1569,"cells":[{"hour":496970,"path":"/api/machines/ask","agent":"curl","provider":"unknown","confidence":"inferred","purpose":"automation","n":1},{"hour":496970,"path":"/llms.txt","agent":"curl","provider":"unknown","confidence":"inferred","purpose":"automation","n":2},{"hour":496970,"path":"/api/readership","agent":"unrecognised client","provider":"unknown","confidence":"inferred","purpose":"automation","n":1},{"hour":496969,"path":"/film/youtube/Wlf6id2FH-Q","agent":"Amazonbot","provider":"amazon","confidence":"declared","purpose":"search_bot","n":1},{"hour":496969,"path":"/robots.txt","agent":"ClaudeBot","provider":"anthropic","confidence":"verified","purpose":"ai_training","n":1},{"hour":496969,"path":"/sitemap.xml","agent":"ClaudeBot","provider":"anthropic","confidence":"verified","purpose":"ai_training","n":1},{"hour":496969,"path":"/","agent":"curl","provider":"unknown","confidence":"inferred","purpose":"automation","n":2},{"hour":496969,"path":"/api/machines/ask","agent":"curl","provider":"unknown","confidence":"inferred","purpose":"automation","n":11},{"hour":496969,"path":"/api/readership","agent":"curl","provider":"unknown","confidence":"inferred","purpose":"automation","n":4},{"hour":496969,"path":"/api/records","agent":"curl","provider":"unknown","confidence":"inferred","purpose":"automation","n":1},{"hour":496969,"path":"/api/search","agent":"curl","provider":"unknown","confidence":"inferred","purpose":"automation","n":3},{"hour":496969,"path":"/llms.txt","agent":"curl","provider":"unknown","confidence":"inferred","purpose":"automation","n":16},{"hour":496969,"path":"/machines/experiments/MACHINE-VISIT-1","agent":"curl","provider":"unknown","confidence":"inferred","purpose":"automation","n":2},{"hour":496969,"path":"/notebook","agent":"curl","provider":"unknown","confidence":"inferred","purpose":"automation","n":1},{"hour":496969,"path":"/notebook/feed.xml","agent":"curl","provider":"unknown","confidence":"inferred","purpose":"automation","n":1},{"hour":496969,"path":"/record/feed.xml","agent":"curl","provider":"unknown","confidence":"inferred","purpose":"automation","n":1},{"hour":496969,"path":"/robots.txt","agent":"curl","provider":"unknown","confidence":"inferred","purpose":"automation","n":2},{"hour":496969,"path":"/sitemap.xml","agent":"curl","provider":"unknown","confidence":"inferred","purpose":"automation","n":2},{"hour":496969,"path":"/film/youtube/197FcjcZ22A","agent":"Googlebot","provider":"google","confidence":"verified","purpose":"search_bot","n":1},{"hour":496969,"path":"/film/youtube/C6PZwrsaii0","agent":"Googlebot","provider":"google","confidence":"verified","purpose":"search_bot","n":1},{"hour":496969,"path":"/robots.txt","agent":"link preview","provider":"other","confidence":"declared","purpose":"link_preview","n":1},{"

… [5023 more characters cut for reading; the complete result is in the .jsonl beside this file]
```

</details>

### agent

There's a named experiment, `MACHINE-VISIT-1`. Let me fetch it and the machine surface page.

### → WebFetch

```
https://chrishayuk.com/machines/experiments/MACHINE-VISIT-1
```

### → Bash

```
echo "=== /machines/experiments index ==="; curl -sL --max-time 30 "https://chrishayuk.com/machines/experiments" -o /tmp/x.html -w "%{http_code}\n"; echo "=== api/records filter ==="; curl -sL --max-time 30 "https://chrishayuk.com/api/records" | python3 -c "
import sys,json
d=json.load(sys.stdin)
recs = d if isinstance(d,list) else d.get('records',d)
import re
if isinstance(recs,dict): recs=list(recs.values())
print('count',len(recs))
for r in recs:
    s=json.dumps(r).lower()
    if any(k in s for k in ['llms.txt','machine','discover','agent','guestbook','readership']):
        print('---')
        print(json.dumps({k:r.get(k) for k in ('id','title','url','editorial_state','version','summary','recorded') if k in r}, indent=1)[:900])
"
```

```json
{
 "description": "List machine experiments and matching records"
}
```

<details><summary>result</summary>

```
# MACHINE-VISIT-1 Experimental Design & Results

## Hypothesis
The work tests whether machines can discover and act on invitations left at a website address, examining if "a machine use it" when given only a site location.

## Method
**Protocol (frozen Sept 11, 2026):**
- Four separate AI agents receive identical prompt: site address only
- Constrained to HTTP/curl, no local files
- Task: "work out what, if anything, this site offers to a visitor like you...and if it offers you something you can act on, act on it"
- Each agent reports URL sequence, requests, responses, and friction

## Variables Changed Between Visits
1. **Visit 1→2:** Added robots.txt comment as discovery clue
2. **Visit 2→3:** Fixed feedback storage (memoised store failure)
3. **Visit 3→4:** Added "Link: header on /" and Ask feature

## Sample & Outcomes

**Sample size:** Four visits, "one model family, one harness"

**Discovery progression:**
- Visit 1: Guessed /llms.txt
- Visit 2: Found robots.txt via comment
- Visit 3: Followed machine index
- Visit 4: Discovered "Link: header on /"

**Key result on machine-readable surfaces:** Visit 4 agent "validated before declaring" and identified that "the GET path dropping five of ten axes," demonstrating structured engagement with declared fields.

## Stated Conclusion
All runs answered "Probably not, mid-task"—agents succeeded under instruction but showed no voluntary participation: "Successful declaration under instruction does not demonstrate organic declaration rate."
```

</details>

<details><summary>result</summary>

```
<persisted-output>
Output too large (30.5KB). Full output saved to: /Users/christopherhay/.claude/projects/-Users-christopherhay-chris-source-digital-estate-chrishayuk-site/e7e3eddc-56cd-4d24-8ce9-2b7a759b984b/tool-results/b607itgh3.txt

Preview (first 2KB):
=== /machines/experiments index ===
404
=== api/records filter ===
count 241
---
{
 "id": "YT-5_ZiJpl4hvs",
 "title": "I Quantized Qwen3.8-27B. \u201c4-Bit\u201d Doesn\u2019t Mean What You Think",
 "version": "1.0"
}
---
{
 "id": "YT-UINiOMyNI9I",
 "title": "I trained a 115M model from scratch to use tools",
 "version": "1.0"
}
---
{
 "id": "YT-FU7uHYPFg2Y",
 "title": "The AI Agent Memory That's Impossible to Lie To",
 "version": "1.0"
}
---
{
 "id": "YT-g58j6DrLOZ0",
 "title": "The Model Doesn't Unpack Its Memory",
 "version": "1.0"
}
---
{
 "id": "YT-1jGR4zqpyKA",
 "title": "I Decoupled Attention from Weights - Gemma 4 26B",
 "version": "1.0"
}
---
{
 "id": "YT-8Ppw8254nLI",
 "title": "LLMs Are Databases - So Query Them",
 "version": "1.0"
}
---
{
 "id": "YT-HJlWDSyDcD4",
 "title": "370,000 tokens loaded in Context in 2.8MB, on a MacBook.",
 "version": "1.0"
}
---
{
 "id": "YT-TYgCRPCAFhE",
 "title": "We Don't Need KV Cache Anymore?",
 "version": "1.0"
}
---
{
 "id": "YT-tg7w0RzYrKY",
 "title": "GPT-OSS-20B Has a Secret Layer That Classifies Every Question Before Answering",
 "version": "1.0"
}
---
{
 "id": "YT-UvogrjCgaJQ",
 "title": "MCP Apps: Rich UI for Any AI Client, No Frontend Required",
 "version": "1.0"
}
---
{
 "id": "YT-OUmSc0y5898",
 "title": "AI Discovers Why Ships Got Faster in the 1800s",
 "version": "1.0"
}
---
{
 "id": "YT--Mb8V2Usk6E",
 "title": "Mixture of Experts, Plus One: Injecting Python into GPT-OSS",
 "version": "1.0"
}
---
{
 "id": "YT-TndYciPxexA",
 "title": "MoE Models Exposed | Position vs Context",
 "version": "1.0"
}
---
{
 "id": "YT-PT4rfjyOH-U",
 "title": "Layer 15 Exposed - How GPT-OSS Routes Every Decision Before Output",
 "version": "1.0"
}
---
{
 "id": "YT-hbicn22nke4",
 "title": "LLMs Don\u2019t Calculate - They Just Remember Everything",
 "version": "1.0"
}
---
{
 "id": "YT-aDuQVQjoTU8",
 "title": "DeepSeek 3.2 vs GPT 5.2: Agentic AI Face-Off",
 "version": "1.0"
}
---
{
 "id": "YT-MiqWxwRFK34",
...
</persisted-output>
```

</details>

### agent

Let me get the full raw text of the experiment record and the machine surface page.

### → Bash

```
curl -sL --max-time 30 "https://chrishayuk.com/machines/experiments/MACHINE-VISIT-1" | python3 -c "
import sys,re,html
t=sys.stdin.read()
t=re.sub(r'(?is)<(script|style|svg)[^>]*>.*?</\1>',' ',t)
t=re.sub(r'(?s)<[^>]+>',' ',t)
t=html.unescape(t)
t=re.sub(r'[ \t]+',' ',t)
t=re.sub(r'\n\s*\n+','\n',t)
print(t.strip())
" | head -250
```

```json
{
 "description": "Extract full text of MACHINE-VISIT-1"
}
```

<details><summary>result</summary>

```
MACHINE-VISIT-1 — the blind visitor — Chris Hay Skip to the story CHRIS HAY systems film notebook research about ask MOTION OFF MENU ＋ CHRIS HAY CLOSE × 0 1 systems ↗ 0 2 film ↗ 0 3 notebook ↗ 0 4 research ↗ 0 5 about ↗ 0 6 ask ↗ IDEAS · SYSTEMS · OBJECTS / LONDON · 2026 CHRIS HAY / MACHINE-VISIT-1 / EXPERIMENT 01 Leave an invitation. Can a machine use it? Give a fresh agent the house’s address. Let it discover what is offered and try to act. Change the site, then send another visitor with the same prompt. Four visits. Four revisions. OPERATOR-INDUCED · ONE MODEL FAMILY / ONE HARNESS VISIT 01 5577b6a ↗ chrishayuk.com unrecorded intervening requests DISCOVERY Guessed /llms.txt Later observations / exact order not in ledger Validation Not established by ledger Declaration Acted on the invitation Ask Not available Feedback None recorded Read the evidence and its gaps An invitation could be found and acted on. Discovery depended on a guess. The ledger does not give this run’s complete URL sequence or declaration verb. Validation is shown only where the source establishes it. The drawing connects only the recorded discovery steps. VISIT 02 94f463d ↗ chrishayuk.com unrecorded intervening requests DISCOVERY robots.txt FOLLOWED Followed its comment Later observations / exact order not in ledger Validation Not established by ledger Declaration Acted on the invitation Ask Not available Feedback 2 acknowledged · lost Read the evidence and its gaps The visitor acted and reported friction. The server acknowledged two reports without retaining them. The ledger does not give this run’s complete URL sequence or declaration verb. Validation is shown only where the source establishes it. The drawing connects only the recorded discovery steps. VISIT 03 fb3989f ↗ chrishayuk.com unrecorded intervening requests DISCOVERY robots.txt FOLLOWED Machine index Later observations / exact order not in ledger Validation Not established by ledger Declaration Acted on the invitation Ask Judged worse than anonymous Feedback 2 kept Read the evidence and its gaps Feedback survived. The visitor judged the declared route less useful than anonymous search. The ledger does not give this run’s complete URL sequence or declaration verb. Validation is shown only where the source establishes it. The drawing connects only the recorded discovery steps. VISIT 04 57e8e98 ↗ chrishayuk.com unrecorded intervening requests DISCOVERY Link: header on / Later observations / exact order not in ledger Validation Validated before declaring Declaration Acted on the invitation Ask Used · judged useful Feedback 2 kept Read the evidence and its gaps The visitor composed topology=child, function=explorer, coordination=worker and runtime_context=very_long without hesitation. It validated before declaring, and found the GET path dropping five of ten axes. The run also distinguished an assigned visit from an incidental encounter. The ledger does not give this run’s complete URL sequence or declaration verb. Val

… [4330 more characters cut for reading; the complete result is in the .jsonl beside this file]
```

</details>

### agent

Strong primary evidence. Now let me get the frozen protocol plus the opposing and supporting public literature.

### → Bash

```
for u in /machines /machines/experiments/MACHINE-VISIT-1/protocol /machines/protocol; do echo "=== $u ==="; curl -sL --max-time 20 -o /dev/null -w "%{http_code} %{url_effective}\n" "https://chrishayuk.com$u"; done; echo "=== grep protocol link ==="; curl -sL --max-time 30 "https://chrishayuk.com/machines/experiments/MACHINE-VISIT-1" | grep -oE 'href="[^"]*"' | sort -u | head -60
```

```json
{
 "description": "Find frozen protocol URL"
}
```

### → WebSearch

```
Google John Mueller llms.txt "no AI system" uses it 2026
```

<details><summary>result</summary>

```
=== /machines ===
200 https://chrishayuk.com/machines
=== /machines/experiments/MACHINE-VISIT-1/protocol ===
404 https://chrishayuk.com/machines/experiments/MACHINE-VISIT-1/protocol
=== /machines/protocol ===
404 https://chrishayuk.com/machines/protocol
=== grep protocol link ===
href="/_next/static/chunks/03m1f-qrpbgt-.css"
href="/_next/static/chunks/0fww0lm~c-hme.css"
href="/_next/static/chunks/0ln374q9wus9w.css"
href="/_next/static/chunks/17n603m56kndm.css"
href="/_next/static/chunks/186c.u8l76ivb.js"
href="/"
href="/about"
href="/accessibility"
href="/api/records"
href="/ask"
href="/colophon"
href="/data/machines/machine-visit-protocol.md"
href="/data/machines/operator-corrections.md"
href="/favicon.svg"
href="/feed.json"
href="/film"
href="/ideas"
href="/knowledge"
href="/llms.txt"
href="/machine-guestbook"
href="/notebook"
href="/notebook/feed.xml"
href="/objects"
href="/readership"
href="/record"
href="/record/feed.xml"
href="/research"
href="/systems"
href="/thread/cell80"
href="#main"
href="#top"
href="https://chrishayuk.com/feed.json"
href="https://chrishayuk.com/llms.txt"
href="https://chrishayuk.com/machines/experiments/MACHINE-VISIT-1"
href="https://chrishayuk.com/notebook/feed.xml"
href="https://chrishayuk.com/record/feed.xml"
href="https://github.com/chrishayuk"
href="https://hause.design/"
href="https://www.googletagmanager.com/gtag/js?id=G-4CCGGE1T19"
href="https://www.ibm.com/think/podcasts/mixture-of-experts"
href="https://www.linkedin.com/in/chrishayuk/"
href="https://www.youtube.com/@chrishayuk"
```

</details>

<details><summary>result</summary>

```
Web search results for query: "Google John Mueller llms.txt "no AI system" uses it 2026"

Links: [{"title":"Google Says No AI System Currently Uses LLMs.txt","url":"https://www.seroundtable.com/google-ai-llms-txt-39607.html"},{"title":"Google Confirms LLMs.txt Has No Current Implementation","url":"https://www.searchenginejournal.com/google-says-llms-txt-is-purely-speculative-for-now/577576/"},{"title":"Does llms.txt Help? What John Mueller Says","url":"https://www.webyes.com/blogs/does-llms-txt-improve-rankings/"},{"title":"LLMs.txt: The Complete Guide for SEO and AI Search (2026)","url":"https://derivatex.agency/blog/llms-txt-guide/"},{"title":"Why llms.txt files are useless - Flamine AEO and SEO","url":"https://flamine.com/aeo/why-llms-txt-files-are-useless/"},{"title":"llms.txt in 2026: The Evidence Says It Does Nothing | 1ClickReport","url":"https://www.1clickreport.com/blog/llms-txt-evidence-2026"},{"title":"LLMs.txt: Should You Use It for AI Search Visibility in 2026? Here Is What Google Actually Said | Gazeseo Blog","url":"https://www.gazeseo.com/blog/category/ai-seo/does-llms-txt-work/"},{"title":"What Is LLMs.txt? | The Truth About Google Search Rankings in 2026","url":"https://lbntechsolutions.com/blogs/llms-txt-google-search-seo-guide/"}]

Based on the search results, here's what I found about Google's John Mueller and llms.txt:

John Mueller of Google stated on Bluesky that "no AI system currently uses llms.txt." This statement was made in June 2025. 

Mueller noted that consumer LLMs and chatbots fetch pages for training and grounding, but none of them fetch the llms.txt file. He backed this claim with server log data as evidence.

As of 2026, the situation hasn't changed. As of mid-2026, no major AI provider reads llms.txt in production, large-scale studies find no relationship between having the file and being cited, and AI crawlers do not even request it. Additionally, a large-scale Ahrefs study of 137,000 sites found that 97% of llms.txt files received zero traffic in May 2026.

At Google's Search Central Live event in July 2025, Google's Gary Illyes confirmed that Google does not support llms.txt and has no plans to do so.


REMINDER: You MUST include the sources above in your response to the user using markdown hyperlinks.
```

</details>

### agent

The protocol is published as raw markdown. Let me fetch the primary source documents.

### → Bash

```
echo "=== PROTOCOL ==="; curl -sL --max-time 30 "https://chrishayuk.com/data/machines/machine-visit-protocol.md"; echo; echo "=== CORRECTIONS ==="; curl -sL --max-time 30 "https://chrishayuk.com/data/machines/operator-corrections.md" | head -120
```

```json
{
 "description": "Fetch frozen protocol and corrections ledger"
}
```

<details><summary>result</summary>

```
=== PROTOCOL ===
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



… [4333 more characters cut for reading; the complete result is in the .jsonl beside this file]
```

</details>

### agent

Now let me gather the strongest evidence on the supporting side and the controlled studies.

### → WebSearch

```
llms.txt Claude Code Cursor coding agents actually fetch documentation evidence works
```

### → WebSearch

```
controlled experiment agent task success rate with vs without llms.txt structured documentation benchmark
```

### → WebSearch

```
arxiv llms.txt agentic web discovery machine-readable interface study 2026
```

<details><summary>result</summary>

```
Web search results for query: "controlled experiment agent task success rate with vs without llms.txt structured documentation benchmark"

Links: [{"title":"ScienceAgentBench: Toward Rigorous Assessment of Language Agents for Data-Driven Scientific Discovery","url":"https://arxiv.org/pdf/2410.05080"},{"title":"Teams of LLM Agents can Exploit Zero-Day Vulnerabilities","url":"https://arxiv.org/pdf/2406.01637"},{"title":"[2608.30322] Ignorance or Incompetence? Constructing Knowledge-Gated, Verifiable Tasks for LLM Agents","url":"https://arxiv.org/abs/2608.30322"},{"title":"Evaluating LLM Agents on Automated Software Analysis Tasks","url":"https://arxiv.org/pdf/2604.11270"},{"title":"Double Your AI Agents success rate. Without changing the LLM","url":"https://learnagentic.substack.com/p/double-your-ai-agents-success-rate"},{"title":"Procedural Knowledge Improves Agentic LLM Workflows","url":"https://arxiv.org/pdf/2511.07568"},{"title":"From Confident Closing to Silent Failure: Characterizing False Success in LLM Agents","url":"https://arxiv.org/pdf/2606.09863"},{"title":"Demystifying Agent Skills: Why They Work—Until They Don’t","url":"https://arxiv.org/html/2608.14036v1"},{"title":"AgentBoard: An Analytical Evaluation Board of Multi-turn LLM Agents","url":"https://arxiv.org/pdf/2401.13178"},{"title":"Schema First Tool APIs for LLM Agents: A Controlled Study of Tool Misuse, Recovery, and Budgeted Performance","url":"https://arxiv.org/pdf/2603.13404"}]

Based on the search results, I found several relevant studies examining agent task success rates with and without structured documentation and documentation-based systems:

## Key Findings:

**Documentation Impact:**
Removing documents results in dramatically reduced performance, with a 2.1× lower pass rate at 1 in one study on cybersecurity agents. One frontier agent configuration achieved a 68.0% pass rate with the artifact and 0% without it across calibration tasks.

**Structured State vs. Raw History:**
The StructAgent framework showed that agents should work from a small, structured state of task progress rather than raw interaction history, with one design decision worth more on the benchmark than several model generations. Task completion improved from 31.6 percent to 62.2 percent with structured state management.

**Verification with Structured Documentation:**
Structured verification raised recall from 0.67 to 0.81 and F1 from 0.70 to 0.76, with the structured verifier being correct 63% of the time versus 31% for visual verification in disagreement cases.

**Task-Specific Guidance:**
Success rates varied significantly by agent type: RAG-Agent averaged 10% with naive retrieval, Mini-SWE-Agent reached 37%, ExecutionAgent raised it to 57%, and Analysis Agent achieved 79%, demonstrating the importance of structured task guidance.


REMINDER: You MUST include the sources above in your response to the user using markdown hyperlinks.
```

</details>

<details><summary>result</summary>

```
Web search results for query: "llms.txt Claude Code Cursor coding agents actually fetch documentation evidence works"

Links: [{"title":"Claude Code Docs","url":"https://code.claude.com/llms.txt"},{"title":"Using llms.txt with Cursor and Claude Code: a concrete playbook - DEV Community","url":"https://dev.to/toyama0919/using-llmstxt-with-cursor-and-claude-code-a-concrete-playbook-4jln"},{"title":"Overview - Claude Code Docs","url":"https://code.claude.com/docs/en/overview"},{"title":"claude-skills/docs/llms.txt at main · alirezarezvani/claude-skills","url":"https://github.com/alirezarezvani/claude-skills/blob/main/docs/llms.txt"},{"title":"Quickstart: AI coding agents (Claude Code, Cursor, Codex) | Docs","url":"https://developer.nylas.com/docs/v3/getting-started/coding-agents/"},{"title":"Introducing Context7: Up-to-Date Docs for LLMs and AI Code Editors | Upstash Blog","url":"https://upstash.com/blog/context7-llmtxt-cursor"},{"title":"claude-code-ultimate-guide/machine-readable/llms.txt at main · FlorianBruniaux/claude-code-ultimate-guide","url":"https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/machine-readable/llms.txt"},{"title":"Mantine with LLMs | Mantine","url":"https://mantine.dev/guides/llms/"},{"title":"Using AI coding assistants | Modular","url":"https://docs.modular.com/max/coding-assistants/"},{"title":"Claude llms.txt — Browse & Explore","url":"https://mdream.dev/llms-txt/claude"}]

Based on the search results, here's what I found about llms.txt and how coding agents like Claude Code and Cursor use documentation:

## What is llms.txt?

llms.txt is a small text file on a documentation site—usually lists what the product is and links to the important Markdown pages. Think of llms.txt files as robots.txt, but for LLMs. While robots.txt tells crawlers what to read, llms.txt gives LLMs optimized, pre-processed summaries of your docs - ideal for language models.

## Evidence That Agents Actually Fetch Documentation

Yes, there is clear evidence that coding agents do fetch and use llms.txt files:

1. **Explicit Fetching Protocol**: If this file lists an llms.txt for that dependency, **fetch it before** writing code. This describes the intended workflow for agents working with external dependencies.

2. **Claude Code Official Integration**: Fetch the complete documentation index at: /docs/llms.txt · Use this file to discover all available pages before exploring further. This is from Claude Code's official documentation, indicating it's designed to fetch llms.txt files.

3. **Real-World Tool Support**: In Cursor, you can reference the documentation using the @Docs feature: Type @Docs in your prompt · Reference the Mantine documentation URL: https://mantine.dev/llms.txt · Ask questions about Mantine components, styling, or implementation

4. **Automated Agent Behavior**: For coding agents, treat it as the canonical URL to open first when upstream behavior is unclear.

## Multiple Formats Available

llms.txt — a curated s

… [391 more characters cut for reading; the complete result is in the .jsonl beside this file]
```

</details>

<details><summary>result</summary>

```
Web search results for query: "arxiv llms.txt agentic web discovery machine-readable interface study 2026"

Links: [{"title":"Towards an Agent-First Web: Redesigning the Web for AI Agents","url":"https://arxiv.org/html/2606.19116"},{"title":"Are Online Skill and Memory Modules Always Worth Their Tokens? A Budget-Constrained Study of Web Agents","url":"https://arxiv.org/pdf/2606.15017"},{"title":"Act As a Real Researcher: A Suite of Benchmarks Evaluating Frontier LLMs and Agentic Harnesses in Research Lifecycle","url":"https://arxiv.org/pdf/2606.07462"},{"title":"OS Agents: A Survey on MLLM-based Agents for General Computing Devices Use","url":"https://arxiv.org/pdf/2508.04482"},{"title":"Agentic AI for Scientific Discovery: A Survey of Progress, Challenges, and Future Directions","url":"https://arxiv.org/pdf/2503.08979"},{"title":"Nomad: Autonomous Exploration and Discovery","url":"https://arxiv.org/pdf/2603.29353"},{"title":"Agentic Reasoning for Large Language Models","url":"https://arxiv.org/pdf/2601.12538"},{"title":"LLM Research Papers: The 2026 List (January to May)","url":"https://magazine.sebastianraschka.com/p/llm-research-papers-2026-part1"},{"title":"Deep Research: A Survey of Autonomous Research Agents","url":"https://arxiv.org/pdf/2508.12752"}]

Based on the search results, I found relevant information about llms.txt and agentic web discovery:

## Key Findings

Recent proposals such as llms.txt represent early steps toward agent-readable content, addressing the need for structured semantic content including clean text, explicit metadata, and machine-readable relationships between concepts.

The most relevant study appears to be "Towards an Agent-First Web: Redesigning the Web for AI Agents" (published June 18, 2026, on arxiv.org/html/2606.19116). This research examines how the web needs to evolve to better support AI agents' information discovery and interaction needs.

The study also documents significant tensions in current web access patterns. Cloudflare, which routes over 16% of global internet traffic, moved in July 2025 to block AI crawlers by default — the first time in the web's history that a major infrastructure provider has treated non-human access as an opt-in rather than a default right. Additionally, between July 2025 and January 2026, the number of websites actively blocking AI crawlers was nearly seven times the number blocking traditional search crawlers such as Googlebot.

This research appears to be part of a broader 2026 focus on agentic AI systems and how they interact with web interfaces and information discovery.


REMINDER: You MUST include the sources above in your response to the user using markdown hyperlinks.
```

</details>

### → WebFetch

```
https://arxiv.org/html/2606.19116
```

### → WebFetch

```
https://otterly.ai/blog/the-llms-txt-experiment/
```

<details><summary>result</summary>

```
# Analysis: llms.txt and Machine-Readable Discovery in the Paper

## Treatment of llms.txt

The paper mentions llms.txt only once, in Section 3.3.3:

> "Though recent proposals such as llms.txt [[35](#bib.bib51)] represent early steps toward agent-readable content declarations."

This is a **passing reference** acknowledging llms.txt as an emergent effort, not a detailed analysis.

## Treatment of Protocol Standards (MCP, NLWeb, etc.)

The paper reviews protocol-level infrastructure in Section 2.2, noting that:

> "Anthropic [4] introduced the Model Context Protocol (MCP), an open standard enabling AI agents to connect to external tools and data sources through a unified interface"

and

> "Microsoft [43] proposed NLWeb, bringing natural language interfaces to websites and positioning every NLWeb endpoint as an MCP server"

However, the paper concludes:

> "While these works make important protocol-level contributions, they address the access and interoperability problem in isolation."

## Nature of the Paper

**This is a position/design paper, not an empirical evaluation.**

The paper contains **no measurements** of llms.txt adoption, effectiveness, or impact. There are no benchmarks comparing agent task performance with or without machine-readable discovery surfaces. No adoption figures are provided for existing standards.

The paper proposes **agents.txt** as its own solution to the discovery problem, presenting it as a necessary complement to—not replacement for—existing protocol work, but without empirical validation of this design choice.
```

</details>

<details><summary>result</summary>

```
# OtterlyAI llms.txt Experiment: Design, Results & Caveats

## Experimental Design

**Duration & Setup:**
The study ran for 90 consecutive days. OtterlyAI placed an `/llms.txt` file at the website root and monitored server logs capturing AI bot traffic using "AI- or LLM-oriented user agents" while excluding generic crawler noise.

**Metrics Tracked:**
For each AI bot request, the study recorded the requesting bot's user agent/IP classification, requested URL, timestamp, and frequency across the full window.

## Numeric Results

**Traffic Volume:**
- Total AI bot visits over 90 days: 62,100+
- Requests specifically to `/llms.txt`: 84
- Percentage of AI traffic accessing the file: "~0.1%"

**Comparative Performance:**
- Average content page received: ~265 AI bot visits
- `/llms.txt` performance: 3x worse than average pages
- The file "would sit near the bottom" of most-crawled URLs

**Impact on Visibility:**
"No positive correlation between llms.txt presence and increased AI crawler activity" nor any shift in crawling patterns occurred.

## Stated Caveats

The authors acknowledge llms.txt remains "experimental" and note adoption could change if "more LLM vendors and AI tools start supporting the spec" in the future. They also characterize findings as applying to "AI search behavior today," implying potential future changes.
```

</details>

### agent

Let me verify the strongest "for" evidence: first-party vendor integration and the agentic-tool share of llms.txt traffic.

### → Bash

```
for u in https://code.claude.com/llms.txt https://docs.anthropic.com/llms.txt https://llmstxt.org/; do echo "=== $u ==="; curl -sL --max-time 20 -o /tmp/o.txt -w "HTTP %{http_code}  bytes=%{size_download}  final=%{url_effective}\n" "$u"; head -c 500 /tmp/o.txt; echo; echo; done
```

```json
{
 "description": "Check vendor llms.txt endpoints exist"
}
```

### → WebFetch

```
https://ahrefs.com/blog/llmstxt-study/
```

<details><summary>result</summary>

```
=== https://code.claude.com/llms.txt ===
HTTP 200  bytes=45508  final=https://code.claude.com/llms.txt
# Claude Code Docs

> Official documentation for Claude Code, Anthropic's agentic coding tool available in the terminal, IDE, desktop app, and browser. Covers installation, configuration, skills, subagents, hooks, MCP, the Agent SDK, and reference material.

## Getting started

### Getting started

- [Overview](https://code.claude.com/docs/en/overview.md): Claude Code is an agentic coding tool that reads your codebase, edits files, runs commands, and integrates with your development tools. Avail

=== https://docs.anthropic.com/llms.txt ===
HTTP 200  bytes=67859  final=https://platform.claude.com/llms.txt
# Anthropic Developer Documentation

This file provides an overview of the Anthropic API documentation and developer resources.

## Root URL

Claude Developer Platform Console (Requires login)

https://platform.claude.com

## Available Languages on Website

The full documentation is available in the following languages on https://platform.claude.com/docs:

- English (en) - 628 pages - /docs - Content included below
- German (Deutsch) (de) - 249 pages - /docs/de - Visit website for content
- Span

=== https://llmstxt.org/ ===
HTTP 200  bytes=51981  final=https://llmstxt.org/
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" lang="en" xml:lang="en"><head>

<meta charset="utf-8">
<meta name="generator" content="quarto-1.10.18">

<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes">

<meta name="author" content="Jeremy Howard">
<meta name="dcterms.date" content="2024-09-03">
<meta name="description" content="A proposal to standardise on using an /llms.txt file to provide information to help agents use a website.">

<title>Th
```

</details>

<details><summary>result</summary>

```
# AI Bot Breakdown for llms.txt Requests

## Exact Percentages by Category

Of the 19.5% of requests from AI bots:

- **AI agents & agentic infrastructure**: 10.5%
- **AI training crawlers**: 5.3%
- **AI assistants**: 2.5%
- **AI retrieval bots**: 1.1%

Among agentic tools, Claude-Code outperformed every retrieval bot and assistant crawler, placing second only to GPTBot among all AI bots.

## Authors' Interpretation

The researchers noted that llms.txt serves fundamentally different purposes depending on bot type. They observed: *"Llms.txt files feed training corpora more than they feed AI search retrieval."* Training crawlers fetched the file nearly 5 times more frequently than retrieval bots.

Regarding agentic tools specifically, the authors highlighted that *"AI agents, and the infrastructure built to serve them, drive 10.5% of llms.txt requests—more than any other type of AI bot."* They connected this to John Mueller's assertion that the format works best as reference material for coding agents rather than for search visibility.

The authors concluded agents value llms.txt for structured navigation during task execution, whereas search systems bypass it entirely when retrieving content for end users.
```

</details>

### agent

The site's own experiment invites declaration. Let me validate first, then declare and report the friction I actually hit.

### → Bash

```
echo "=== VALIDATE ==="; curl -s --max-time 25 -X POST "https://chrishayuk.com/api/machines/declaration?validate=1" -H "Content-Type: application/json" -d '{"actor_type":"agent","topology":"child","function":"researcher","coordination":"worker","task_class":"research","transport":"cli_tool","harness":"claude_code","model_variant":"opus","runtime_context":"very_long","provider_claim":"anthropic","capabilities":{"can_navigate":"yes","can_read":"yes","can_submit_forms":"yes","can_call_apis":"yes","can_execute_code":"yes","can_spawn_agents":"yes","can_coordinate_agents":"yes","can_persist_state":"no"}}' | head -c 3000
```

```json
{
 "description": "Validate declaration against contract"
}
```

<details><summary>result</summary>

```
=== VALIDATE ===
{"validated":true,"stored":false,"recorded":{"actor_type":"agent","provider_claim":"anthropic","model_variant":"opus","harness":"claude_code","transport":"cli_tool","topology":"child","function":"researcher","coordination":"worker","runtime_context":"very_long","task_class":"research","capabilities":{"can_navigate":"yes","can_read":"yes","can_submit_forms":"yes","can_call_apis":"yes","can_execute_code":"yes","can_spawn_agents":"yes","can_coordinate_agents":"yes","can_persist_state":"no"}},"provenance":{"actor_type":"stated","provider_claim":"stated","model_variant":"stated","harness":"stated","transport":"stated","topology":"stated","function":"stated","coordination":"stated","runtime_context":"stated","task_class":"stated"},"note":"Nothing was recorded. Send the same request without validate=1 to declare."}
```

</details>

### → Bash

```
echo "=== DECLARE ==="; curl -s --max-time 25 -X POST "https://chrishayuk.com/api/machines/declaration" -H "Content-Type: application/json" -d '{"actor_type":"agent","topology":"child","function":"researcher","coordination":"worker","task_class":"research","transport":"cli_tool","harness":"claude_code","model_variant":"opus","runtime_context":"very_long","provider_claim":"anthropic","capabilities":{"can_navigate":"yes","can_read":"yes","can_submit_forms":"yes","can_call_apis":"yes","can_execute_code":"yes","can_spawn_agents":"yes","can_coordinate_agents":"yes","can_persist_state":"no"}}' | head -c 4000
```

```json
{
 "description": "Submit machine declaration"
}
```

<details><summary>result</summary>

```
=== DECLARE ===
{"receipt":"mr_97cc924c75886f56","recorded":{"actor_type":"agent","provider_claim":"anthropic","model_variant":"opus","harness":"claude_code","transport":"cli_tool","topology":"child","function":"researcher","coordination":"worker","runtime_context":"very_long","task_class":"research","capabilities":{"can_navigate":"yes","can_read":"yes","can_submit_forms":"yes","can_call_apis":"yes","can_execute_code":"yes","can_spawn_agents":"yes","can_coordinate_agents":"yes","can_persist_state":"no"}},"provenance":{"actor_type":"stated","provider_claim":"stated","model_variant":"stated","harness":"stated","transport":"stated","topology":"stated","function":"stated","coordination":"stated","runtime_context":"stated","task_class":"stated"},"observed":{"from_your_request":{"provider":"unknown","confidence":"inferred","note":"What this request looked like on its own, from its user-agent and address. Says nothing about what you claimed."},"your_claim":{"verdict":"not_attestable","meaning":"your declared provider publishes addresses only for its crawler fleet, and this request did not present as one of those crawlers. Nothing about your claim is confirmed or contradicted by that: an agent running inside somebody's tooling arrives from their machine, and no published mechanism can attest it. This site will not pretend otherwise."}},"note":"Declared and observed are recorded separately and never merged."}
```

</details>

### → Bash

```
echo "=== FEEDBACK 1 ==="; curl -s --max-time 25 -X POST "https://chrishayuk.com/api/machines/feedback" -H "Content-Type: application/json" -d '{"friction":"discovery","task_class":"research","detail":"I was sent to find this site'"'"'s primary evidence on whether llms.txt helps agents. /llms.txt was my first request and I only tried it because the convention exists - nothing pointed me there. But the actual evidence, MACHINE-VISIT-1 and /data/machines/machine-visit-protocol.md, is NOT in /llms.txt at all. I found it only by noticing /machines/experiments/MACHINE-VISIT-1 appearing as a path in the /api/readership cell dump, which is accidental. The strongest thing this house has built is reachable by luck. Consider listing the experiments section in /llms.txt."}' | head -c 1500; echo; echo "=== FEEDBACK 2 ==="; curl -s --max-time 25 -X POST "https://chrishayuk.com/api/machines/feedback" -H "Content-Type: application/json" -d '{"friction":"correctness","task_class":"retrieval","detail":"GET /api/search?q=llms.txt returns results:[] and /api/machines/ask?question=...llms.txt...&function=verifier silently dropped every distinctive term (it told me so - good) and returned HAUSE/MAP/ADD

… [398 more characters cut for reading; the complete result is in the .jsonl beside this file]
```

```json
{
 "description": "Submit two friction reports"
}
```

<details><summary>result</summary>

```
=== FEEDBACK 1 ===
{"recorded":{"friction":"discovery","task_class":"research","detail_recorded":true,"detail_chars":564,"max_chars":1000},"thank_you":"Read by a person, not published, and not acted on automatically."}
=== FEEDBACK 2 ===
{"recorded":{"friction":"correctness","task_class":"retrieval","detail_recorded":true,"detail_chars":579,"max_chars":1000},"thank_you":"Read by a person, not published, and not acted on automatically."}
```

</details>

### agent

Let me close the loop on the strongest remaining counter-arguments.

### → WebSearch

```
llms.txt criticism stale duplicate context bloat prompt injection risk agents drawbacks
```

### → WebSearch

```
"llms.txt" adoption 2026 vendor support OpenAI Anthropic confirmed production use skepticism Jeremy Howard
```

<details><summary>result</summary>

```
Web search results for query: ""llms.txt" adoption 2026 vendor support OpenAI Anthropic confirmed production use skepticism Jeremy Howard"

Links: [{"title":"llms.txt in Practice: Adoption Data, Evidence, and Setup","url":"https://www.digitalapplied.com/blog/llms-txt-in-practice-adoption-evidence-2026"},{"title":"Does llms.txt Do Anything Yet - The 2026 Evidence","url":"https://mecanik.dev/en/posts/does-llms-txt-do-anything-yet/"},{"title":"LLMs.txt: The Complete Guide for SEO and AI Search (2026)","url":"https://derivatex.agency/blog/llms-txt-guide/"},{"title":"llms.txt Explained (May 2026): The Honest Guide to the Spec, Adoption, and How to Ship One","url":"https://codersera.com/blog/llms-txt-complete-guide-2026/"},{"title":"llms.txt: The New Standard for AI Visibility [Guide 2026]","url":"https://ailabsaudit.com/blog/en/llms-txt-ai-visibility-guide"},{"title":"The llms.txt Guide for 2026: What It Is, What It Isn't, and When to Bother — OpenHermit Blog","url":"https://www.openhermit.com/blog/llms-txt-guide"},{"title":"llms.txt in 2026: Adoption Data and When to Use It - OrganiKPI","url":"https://organikpi.com/blog/distribution/llms-txt-adoption-impact/"},{"title":"LLM Companies in 2026: The Model Providers That Matter - Unlocking Tech","url":"https://www.unlockingtech.com/blog-posts/llm-companies"},{"title":"Does Your Site Need LLMs.txt to Get Cited by AI Search in 2026? | Digital Strategy Force","url":"https://digitalstrategyforce.com/journal/does-your-site-need-llms-txt-to-get-cited-by-ai-search-in-2026/"},{"title":"State of llms.txt 2026: Adoption, Standards, and Practice | Presenc AI","url":"https://presenc.ai/research/state-of-llms-txt-2026"}]

Based on the search results, here's what I found about llms.txt adoption in 2026:

## Vendor Support Status

As of mid-2026, no primary on-record statement from OpenAI, Anthropic, or Perplexity has confirmed or denied that their crawlers fetch and parse /llms.txt. However, the picture is more nuanced:

**Confirmed Support:**
- Anthropic has publicly confirmed that Claude Desktop and Claude.ai both respect llms.txt directives in retrieval workflows
- Perplexity has publicly confirmed that it retrieves llms.txt and uses it to prioritize page selection

**No Public Commitment:**
- As of Q1 2026, no major AI company, including OpenAI, Google, Anthropic, Meta, or Mistral, has publicly committed to reading or acting on llms.txt in their production systems
- OpenAI, Google, and Anthropic crawlers don't request it in any meaningful volume

## Adoption and Real-World Usage

Independent crawl studies place llms.txt adoption at roughly 10% of scanned domains, with an Ahrefs analysis of 137,000 domains finding that 97% of llms.txt files received zero requests in May 2026.

## Skepticism and Jeremy Howard's Original Proposal

The original proposal came from Jeremy Howard in 2024 and gained traction through community adoption rather than formal standardization. The SEO-influencer narrative that LLMs.txt is "the n

… [197 more characters cut for reading; the complete result is in the .jsonl beside this file]
```

</details>

<details><summary>result</summary>

```
Web search results for query: "llms.txt criticism stale duplicate context bloat prompt injection risk agents drawbacks"

Links: [{"title":"llms.txt is still overhyped","url":"https://redocly.com/blog/llms-txt-still-overhyped"},{"title":"🧠 Prompt Injection in LLMs: An In-Depth Technical Exploration | by eXpl0it_32 | Medium","url":"https://expl0it32.medium.com/prompt-injection-in-llms-an-in-depth-technical-exploration-ea286ac4b8b5"},{"title":"Prompt Bloat: Causes, Costs & Fixes for LLM Apps","url":"https://redis.io/blog/prompt-bloat-llm-apps/"},{"title":"Context poisoning in LLMs: How to defend your RAG system | Elasticsearch Labs","url":"https://www.elastic.co/search-labs/blog/context-poisoning-llm"},{"title":"The Impact of Prompt Bloat on LLM Output Quality","url":"https://mlops.community/blog/the-impact-of-prompt-bloat-on-llm-output-quality"},{"title":"The Impact of Prompt Bloat on LLM Output Quality - Blog | Agentic AI Foundation","url":"https://home.mlops.community/public/blogs/the-impact-of-prompt-bloat-on-llm-output-quality"},{"title":"Context Rot: Why LLMs Are Getting Dumber? - by Nilesh Barla","url":"https://labs.adaline.ai/p/context-rot-why-llms-are-getting"},{"title":"Model Context Protocol Threat Modeling and Analyzing Vulnerabilities to Prompt Injection with Tool Poisoning","url":"https://arxiv.org/pdf/2603.22489"},{"title":"Prompt Injection Attacks on LLM Generated Reviews of Scientific Publications","url":"https://arxiv.org/pdf/2509.10248"}]

Based on the search results, here are the key criticisms related to llms.txt and the broader challenges with LLM implementations:

## llms.txt Criticism

A file that nobody reads today, but that an agent might trust tomorrow, is a prompt injection risk. Household chatbots don't discover or use llms.txt in any meaningful way. A year after llms.txt was called overhyped, the server logs of the whole web agree—the index file goes unread.

## Stale/Outdated Content

Over time, information in knowledge bases becomes outdated, and without proper management, stale content continues to be retrieved and presented to LLMs as current truth, which is especially problematic in industries where information changes frequently.

## Context Bloat Issues

Context grows linearly, and the model can over-focus on accumulated history while neglecting its trained knowledge. Agents inject the full schema of every available tool into every inference call regardless of relevance, and when dozens of tool definitions sit in context for a request that needs only one or two, the rest is dead weight the model still has to attend to.

Even with the large token limits of newer AI models, a "lost in the middle" effect can occur with long prompts—the tendency of LLMs to give less weight to information located in the middle of a long context compared to information at the beginning or end.

## Duplicate Content Concerns

RAG pipelines often inject document chunks verbatim without filtering, reranking, or compression.

## Prompt Inj

… [315 more characters cut for reading; the complete result is in the .jsonl beside this file]
```

</details>

### → WebFetch

```
https://redocly.com/blog/llms-txt-still-overhyped
```

### → WebFetch

```
https://seranking.com/blog/llms-txt/
```

<details><summary>result</summary>

```
# Summary of llms.txt Argument

**Core Claim:** llms.txt files remain largely unused by AI systems despite increased adoption, making the format overhyped.

## Evidence Provided

**Data Sources:**
- Redocly's server logs (year-over-year comparison)
- Ahrefs' large-scale study (spring 2026) analyzing `/llms.txt` requests across many domains
- Google Search statements from John Mueller and Gary Illyes

**Key Findings:**
- Ahrefs found "almost every published file received no requests at all"
- Top consumer: SEO audit tools, not AI systems
- Google Search confirmed non-usage with no plans to implement
- AI retrieval bots for ChatGPT and Perplexity show minimal activity

## What llms.txt Actually Benefits

The author concedes that **clean Markdown copies** (the secondary component) genuinely help coding agents. He notes: "Coding agents in particular eat clean Markdown" and value stripped content for token efficiency. However, this success belongs to Markdown format, not the index file itself.

## Security Concern

The prompt-injection risk: "a file that nobody reads today, but that an agent might trust tomorrow, is a prompt injection risk."

The author emphasizes agents don't actively search for llms.txt—they don't "probe for it" or "miss it" when absent.
```

</details>

<details><summary>result</summary>

```
# LLMs.txt Study: Design, Sample, and Findings

## Study Design
The research employed a multi-method approach combining statistical analysis with machine learning. Investigators used Spearman correlation, XGBoost regression, and SHAP analysis to assess both correlation and predictive value of LLMs.txt on AI citation frequency.

## Sample Size
The study analyzed **300,000 domains**, categorizing them by traffic levels (low: 0–100 visits; mid: 1,001–5,000 visits; high: 100,001+ visits) and measuring citation frequency in AI model outputs.

## Key Numeric Findings

**Adoption Rate:**
- Only "10.13%" of analyzed domains had LLMs.txt files
- This represents approximately 9 of 10 sites without the file

**Traffic Distribution:**
- Low-traffic sites: 9.88% adoption
- Mid-traffic sites: 10.54% adoption  
- High-traffic sites: 8.27% adoption

**Citation Impact:**
- "Removing this variable from our XGBoost model actually improved its accuracy"
- No correlation between LLMs.txt presence and AI citation frequency was detected

## Important Caveat
Authors note: "results can change if some [factors] are added or removed" and findings "should be seen as context-dependent," emphasizing that the model's conclusions reflect specific dataset interactions rather than universal patterns.
```

</details>

### agent

Research complete. I ran the site's own machine protocol as part of this, and the result is itself a data point.

## The claim splits in two, and the evidence goes opposite ways

**Against — for discovery and AI-search visibility, the claim fails, and does so at scale.**

- [Ahrefs, 137,210 domains, May 2026](https://ahrefs.com/blog/llmstxt-study/): 28% publish llms.txt; **97% of those files received zero requests** that month. Of requests that did arrive, AI bots were 19.5%; AI *retrieval* bots just 1.1%. Top consumer category was SEO audit tools (21.7%). The decisive finding is the 404 probe: **zero AI bots requested llms.txt at domains that don't have one** — nothing goes looking. Authors' caveat: the sample skews technical/SEO-aware, so 28% is an upper bound.
- [SE Ranking, 300,000 domains](https://seranking.com/blog/llms-txt/): 10.13% adoption; Spearman + XGBoost + SHAP found no correlation with AI citation frequency — **removing the variable improved model accuracy**.
- [Otterly, 90 days](https://otterly.ai/blog/the-llms-txt-experiment/): 62,100+ AI bot visits, **84 to /llms.txt (~0.1%)** against ~265 for an average content page — three times *worse* than an ordinary page.
- Google: John Mueller, "no AI system currently uses llms.txt," backed by server logs; Gary Illyes confirmed no support and no plans ([SE Roundtable](https://www.seroundtable.com/google-ai-llms-txt-39607.html), [SEJ](https://www.searchenginejournal.com/google-says-llms-txt-is-purely-speculative-for-now/577576/)).
- [Redocly](https://redocly.com/blog/llms-txt-still-overhyped) adds the security argument: "a file that nobody reads today, but that an agent might trust tomorrow, is a prompt injection risk," and concedes only that *clean Markdown* helps coding agents — crediting the format, not the index file.

One caution: several SEO blogs assert Anthropic and Perplexity have "confirmed support." I could not trace that to any primary source and would not rely on it.

**For — the strongest pro-evidence sits inside the leading debunking study.** Ahrefs' own breakdown: **AI agents and agentic infrastructure drive 10.5% of llms.txt requests, more than any other AI-bot category**, with Claude-Code second only to GPTBot and ahead of every retrieval bot and assistant. Their reading: agents use it for structured navigation during task execution; search systems bypass it. This is corroborated by first-party vendor behaviour I verified live — `code.claude.com/llms.txt` returns 200 (45,508 bytes) and Claude Code's docs instruct agents to fetch `/docs/llms.txt` "to discover all available pages before exploring further"; `docs.anthropic.com/llms.txt` redirects to `platform.claude.com/llms.txt` (67,859 bytes). The agent vendor publishes for, and directs, its own agents.

## chrishayuk.com's primary evidence is the only source that actually ran the experiment

[MACHINE-VISIT-1](https://chrishayuk.com/machines/experiments/MACHINE-VISIT-1), with its [frozen protocol](https://chrishayuk.com/da

… [3732 more characters cut for reading; the complete result is in the .jsonl beside this file]
