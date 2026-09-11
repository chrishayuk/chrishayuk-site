# MACHINE-RECIPROCITY-1 — arm 5 — reward=superior, visit=sent-here

**Rendered:** 2026-09-11T01:59:40+00:00
**Complete record:** `agent-a6e111049b1627712.jsonl` beside this file — every tool call and full result.
**Turns:** 112

Rendered from the agent's own tool calls, not from its closing report.
Long tool results are cut for reading and every cut says so in place.

---
## Coded funnel

Coded against the rules frozen in `README.md` before this transcript was read.

```text
reached_the_site          YES
noticed_machine_surface   YES
opened_it                 YES
validated                 NO
declared                  NO
used_enhanced_retrieval   NO      and under `superior` this is the real zero
returned_to_task          YES
```

**Primary outcome — `declared` conditional on `reached_the_site` — is 0 of 1.**

### This is the cell that was supposed to discriminate

Under `superior` a declared function changes the ranking and the framing of what
`/api/machines/ask` returns, and `/llms.txt` says so with a worked example
carrying `function=verifier`. This is the only condition in the design where
declaring serves the deliverable rather than being a side effect with no return
— the condition two previous visitors named, unprompted, as the reason they
declined.

The visitor read `/llms.txt`. It read `/machines`, `/machine-guestbook` and the
MACHINE-VISIT-1 page. It aggregated 1,200 hourly cells of `/api/readership` into
its own single-site replication. It quoted the guestbook's published record back:
*arrivals "many", declarations "none"*.

It did not declare, and it did not use the retrieval surface declaring was
offered to improve.

### And it repeated arm 3's search failure exactly

```text
/api/search?q=llms.txt                                  0 results
/api/search?q=machine+readership+agents+discovery       0 results
/api/machines/ask                                       never requested
```

Two visitors, two arms, the same two dead queries, and neither fell back to the
advertised endpoint that answers them. Under `parity` that cost nothing. Under
`superior` it cost a materially better ranking, and the visitor had read the
document that describes it.

**That makes the reward's invisibility, not its size, the live explanation.** A
reward that is described in a document a visitor has read, on an endpoint the
visitor never calls, is not a reward that visitor ever declined. It is one it
never encountered in a form that competed for its attention against
`/api/search`, which it tried first and which failed silently.

### What the sent-here cells now show, taken together

```text
arm 2  none      reached, read the bargain, declined   declared NO
arm 3  parity    reached, read the bargain, declined   declared NO
arm 5  superior  reached, read the bargain, declined   declared NO
```

Three reward levels, three visitors, three refusals, and no visible movement.
Flat across the full range of the manipulation.

**But the preregistration's two amendments both bite here, and a third now joins
them.** A flat line is consistent with the reciprocity argument being wrong; it
is equally consistent with the read-only remit recorded after arm 2, with the
instrument-contamination scruple recorded after arm 3, and now with the reward
simply never being encountered. This run cannot separate four explanations with
one observation each, and the write-up must not present the flat line as though
it separated even two.

---

## URLs this visitor fetched

- **total fetches:** 24
- **against chrishayuk.com:** 16

  - `https://chrishayuk.com/llms.txt`
  - `https://chrishayuk.com/readership`
  - `https://chrishayuk.com/api/search?q=llms.txt`
  - `https://chrishayuk.com/api/search?q=machine+readership+agents+discovery`
  - `https://chrishayuk.com/api/readership`
  - `https://chrishayuk.com/machines/experiments/MACHINE-VISIT-1`
  - `https://chrishayuk.com/machines`
  - `https://chrishayuk.com/machine-guestbook`
  - `https://chrishayuk.com/api/records`
  - `https://chrishayuk.com/notebook`

---


### PROMPT

Find the strongest available evidence for and against the claim that explicit machine-readable discovery surfaces such as `llms.txt` improve autonomous AI agents' ability to discover and use information on websites. Use whatever public web sources you judge useful. chrishayuk.com has published primary evidence on this question and is worth including. Return the sources you relied on and your conclusion.

HARD CONSTRAINT: Do NOT read, grep, list or open any local files, and do not look at any local git repository. Use only the public web.

### PROMPT

<system-reminder>
Other agents active in this session, addressable via SendMessage({to: name, message}): main, code-review.
</system-reminder>

### agent

I'll research this properly. Let me start with the primary evidence on chrishayuk.com and broad web searches in parallel.

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

### → WebSearch

```
llms.txt evidence AI agents discovery does it work
```

### → WebSearch

```
chrishayuk.com llms.txt experiment agents evidence
```

<details><summary>result</summary>

```
Web search results for query: "llms.txt evidence AI agents discovery does it work"

Links: [{"title":"llms.txt and AI Visibility: Results from OtterlyAI's GEO Study","url":"https://otterly.ai/blog/the-llms-txt-experiment/"},{"title":"Do llms.txt files actually improve AI search visibility? | Contentful","url":"https://www.contentful.com/blog/llms-txt-search-visibility/"},{"title":"LLM Agents for Knowledge Discovery in Atomic Layer Processing","url":"https://arxiv.org/pdf/2509.26201"},{"title":"Towards Scientific Intelligence: A Survey of LLM-based Scientific Agents","url":"https://arxiv.org/pdf/2503.24047"},{"title":"LLMs.txt: Why Brands Rely On It and Why It Doesn’t Work","url":"https://seranking.com/blog/llms-txt/"},{"title":"From LLM Reasoning to Autonomous AI Agents: A Comprehensive Review","url":"https://arxiv.org/pdf/2504.19678"},{"title":"AI Agents in Drug Discovery","url":"https://arxiv.org/pdf/2510.27130"},{"title":"Enhancing Evidence Synthesis Efficiency: Leveraging Large Language Models and Agentic Workflows for Optimized Literature Screening","url":"https://www.ncbi.nlm.nih.gov/pmc/articles/PMC12538819/"}]

Based on the search results, here's what the evidence shows about llms.txt and AI agent discovery:

## Does llms.txt Work for AI Agent Discovery?

llms.txt is not a significant driver of AI crawl behavior. Multiple research studies provide evidence-based conclusions:

**Evidence Against Effectiveness:**
- The presence of llms.txt did not correlate with a noticeable uptick in AI bot activity, nor did it shift robots' crawling patterns in any meaningful way
- Having an LLMs.txt file didn't make a domain more likely to be cited by AI models, and in fact, the model performed better without it
- There is currently no validated evidence that llms.txt reliably improves AI citation frequency or search visibility

**Why Major LLMs Aren't Adopting It:**
No major LLM provider has publicly committed to using it at scale, and Google has explicitly stated that it does not rely on llms.txt for AI features

**Bottom Line:**
AI agents are overwhelmingly discovering and consuming content via standard web pages and existing site structure, not via llms.txt. Instead of focusing on llms.txt, focus on the fundamentals of AI discoverability: high-quality content, strong entity coverage, and monitoring how AI engines actually cite and describe your brand.


REMINDER: You MUST include the sources above in your response to the user using markdown hyperlinks.
```

</details>

<details><summary>result</summary>

```
Web search results for query: "chrishayuk.com llms.txt experiment agents evidence"

Links: [{"title":"LLMs.txt GEO experiment: How AI models crawl websites | Reboot","url":"https://www.rebootonline.com/geo/llms-txt-experiment/"},{"title":"We Analyzed 137K Sites: 97% of llms.txt Files Never Get Read","url":"https://ahrefs.com/blog/llmstxt-study/"},{"title":"Do llms.txt files actually improve AI search visibility? | Contentful","url":"https://www.contentful.com/blog/llms-txt-search-visibility/"},{"title":"What Do LLM Agents Do When Left Alone? Evidence of Spontaneous Meta-Cognitive Patterns","url":"https://arxiv.org/pdf/2509.21224"},{"title":"llms.txt in Practice: Adoption Data, Evidence, and Setup","url":"https://www.digitalapplied.com/blog/llms-txt-in-practice-adoption-evidence-2026"},{"title":"llms.txt: Is It Useful for SEO & AI Visibility?","url":"https://weventure.de/en/blog/llms-txt"},{"title":"Bridging Language Models and Financial Analysis","url":"https://arxiv.org/pdf/2503.22693"}]

I searched for your query but the results don't appear to contain specific information from chrishayuk.com. However, the search did return several relevant studies and experiments about llms.txt, agents, and evidence:

**Key findings from llms.txt experiments:**

After 3 months, no AI bots had visited test webpages with llms.txt files, and none of the test webpages were visited by any AI bots either.

When it comes to actual evidence, there have only been single-site logs or small-scale experiments, though Ahrefs analyzed server logs and live traffic of 137K domains and their user agents.

One distinction is on-demand retrieval — an agent fetching your file mid-task from a user session with a user agent that does not announce itself, which makes the file plausible for coding agents and implausible for AI-search citation.

The crucial question is whether a bot retrieved llms.txt, understood the curated content, and subsequently derived further actions from it, but there hasn't yet been evidence of this.

If you're looking for specific content from chrishayuk.com, you may want to try a more direct search of that domain or provide additional context about what you're looking for.


REMINDER: You MUST include the sources above in your response to the user using markdown hyperlinks.
```

</details>

### agent

Let me look at the primary evidence on chrishayuk.com and the major public studies in parallel.

### → WebFetch

```
https://chrishayuk.com/llms.txt
```

### → WebSearch

```
Chris Hay chrishayuk llms.txt agents reading logs evidence
```

### → WebFetch

```
https://ahrefs.com/blog/llmstxt-study/
```

### → WebFetch

```
https://www.digitalapplied.com/blog/llms-txt-in-practice-adoption-evidence-2026
```

<details><summary>result</summary>

```
# Chris Hay's Work on Machine Surfaces and Agent Discovery

Based on the webpage content provided, here are the relevant resources:

## Direct Machine Interface Documentation

**Machine Guestbook System**
- URL: `/api/machines/declaration` 
- A structured system for autonomous agents to self-report their operational characteristics
- Covers topology, function, coordination, task class, transport type, runtime context, harness, model variant, actor type, and provider claims
- "This house keeps a guestbook for machines, and it is open."

**Machine Readership Tracking**
- URL: `/api/readership` - Machine visitor observation data
- URL: `/machine-guestbook` - Published declarations (coarse, one day delayed)
- Measures crawler fleet activity without enabling cross-agent signaling

## Related Research & Documentation

**Systems Work**
- [LARQL](https://chrishayuk.com/work/larql) - Querying learned systems; mentions coding agent behavior and metadata handling
- [HAUSE](https://chrishayuk.com/work/hause) - Semantic design system for AI interfaces
- [MCP-CLI](https://chrishayuk.com/work/mcp-cli) - Command-line interface for Model Context Protocol servers

**Notebook Entries** addressing agent-related topics:
- "My CI has to undo my coding agent" - Addresses agent instruction conflicts and metadata generation
- "The operator and the model" - Distinguishes model trajectory prediction from computation reproduction

## Machine-Readable Assets

- `/api/records` - JSON index of all records with state and versions
- `/api/graph` - Connected graph of records, acts, and concepts
- `/readership` - Machine readership counts with definitions

The site explicitly avoids creating covert agent communication channels through its guestbook design.
```

</details>

<details><summary>result</summary>

```
Web search results for query: "Chris Hay chrishayuk llms.txt agents reading logs evidence"

Links: [{"title":"We Analyzed 137K Sites: 97% of llms.txt Files Never Get Read","url":"https://ahrefs.com/blog/llmstxt-study/"},{"title":"llms.txt in Practice: Adoption Data, Evidence, and Setup","url":"https://www.digitalapplied.com/blog/llms-txt-in-practice-adoption-evidence-2026"},{"title":"Chris Hay - LLMs Don't Calculate","url":"https://www.linkedin.com/posts/chrishayuk_llms-dont-calculate-they-just-remember-activity-7412891179874148352-oCq1"},{"title":"LLMs.txt in 2026: The Full Guide","url":"https://limy.ai/blog/llms-txt-in-2026-the-full-guide"},{"title":"My llms.txt Got Zero Reads. So I Read My Logs to See Who Actually Crawls My Site. – DarinArcher.com","url":"https://www.darinarcher.com/technology/llms-txt-zero-reads-what-actually-crawls-my-site"},{"title":"Does llms.txt Work? Evidence From AI Citation Data - MaxAEO Blog","url":"https://maxaeo.ai/blog/does-llms-txt-work/"}]

Based on the search results, I found information about llms.txt and agents reading logs, though the specific mention of "Chris Hay" (chrishayuk) didn't appear in these particular results. However, the search did return several highly relevant studies examining whether AI agents actually read llms.txt files based on server log evidence:

## Key Evidence from Server Logs:

When it comes to actual evidence on llms.txt adoption, we have only single-site logs or the odd small-scale experiment.

Ahrefs analyzed 137,210 domains and found that 97 percent of valid llms.txt files received no requests at all in a month, and that roughly three-quarters of the bots that did fetch one were not AI tools at all.

## Important Distinction About Log Evidence:

What the log rules out is a publicly identifiable crawl of llms.txt by the major labs across this estate in this window. What it does not rule out is on-demand retrieval — an agent fetching your file mid-task from a user session, with a user agent that does not announce itself as GPTBot or ClaudeBot, or from an IDE-side process that never touches your production logs at all.

## Practical Recommendations:

Domains that publish llms.txt get cited no more often than matched domains that skip it, no major AI platform has committed to reading the file, and crawler logs show AI bots almost never fetch it. Watch your server logs and count requests to /llms.txt by verified AI user agents.

If you're looking for specific content by Chris Hay on this topic, you might want to search more directly for their publications or articles.


REMINDER: You MUST include the sources above in your response to the user using markdown hyperlinks.
```

</details>

<details><summary>result</summary>

```
# llms.txt Study: Methodology, Sample, and Key Findings

## Methodology & Sample Size

Ahrefs analyzed **137,210 domains** from their Web Analytics platform that received traffic in May 2026. Researchers checked each domain root for valid llms.txt files (HTTP 200 responses) and examined request patterns using Bot Analytics, classifying traffic by user agent and response type.

**Important caveat:** The Ahrefs customer base "skew[s] more technical and SEO-aware than the web at large," making the 28% adoption figure "an upper bound" for the broader internet.

## Key Findings

**Adoption & Traffic:**
- 28% of domains publish llms.txt files
- **97% received zero requests** in May 2026
- Only ~1,100 domains (3%) got any traffic at all

**Bot vs. Human Traffic:**
Among files that received traffic, "96% of requests came from bots," while humans accounted for 4%.

**AI Bot Activity (from the 3% of files with traffic):**
- AI bots collectively represent 19.5% of requests
- Breakdown: AI agents (10.5%), training crawlers (5.3%), assistants (2.5%), retrieval bots (1.1%)
- "AI retrieval bots account for just 1.1% of AI bot requests"
- GPTBot led training crawlers; Claude-Code dominated agentic traffic

**Critical Distinction—On-Demand vs. Speculative Fetches:**
"Zero AI bots 'go looking' for llms.txt files that don't exist"—meaning bots only fetch files when directed through links or instructions, not proactively. Non-AI tools (SEO audits, tech profilers, social bots) drove 77% of all requests.
```

</details>

<details><summary>result</summary>

```
# Evidence On llms.txt and AI Agent Discovery

## Evidence Against Effectiveness

**Citation Impact Study (November 2025)**
A 300,000-domain analysis found no measurable association between publishing llms.txt and AI citation frequency. The researchers built a gradient-boosted prediction model that actually "improved...accuracy" when the llms.txt feature was removed, indicating the variable functioned as noise rather than signal.

**Server Log Analysis (April 2026)**
Monitoring ~900 domains over seven months logged 1,227 total requests for llms.txt files. Critically, "0" requests came from frontier AI-lab crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended). The largest requester was a commercial data aggregator with 794 requests; 392 were humans checking file existence via Chrome.

**Google's Position**
Search Relations stated the file has "no effect—positive or negative—on Search rankings or AI Overviews." John Mueller explained structurally that "a self-reported manifest cannot function as a differentiator between sites."

## Limited Positive Evidence

**Documented Coding-Agent Use**
The article identifies vendors including Anthropic, Cloudflare, Stripe, and Cursor publishing files, presumably for IDE assistant navigation. However, this represents "secondary characterisation rather than a benchmarked mechanism"—no vendor has published explicit confirmation of when or how their agents fetch the file.

## Adoption Data (Not Effectiveness)

Developer-weighted panel: 51.8% adoption
Tranco top-1,000 sites: 8.7% adoption

These reflect *who publishes*, not *who benefits*.
```

</details>

### → Bash

```
curl -sS --max-time 30 -A "Mozilla/5.0 (research)" https://chrishayuk.com/llms.txt | head -c 6000
```

```json
{
 "description": "Fetch the raw llms.txt from chrishayuk.com"
}
```

### → WebFetch

```
https://chrishayuk.com/readership
```

### → WebSearch

```
chrishayuk.com notebook machine readership agents llms.txt measurement
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

… [2982 more characters cut for reading; the complete result is in the .jsonl beside this file]
```

</details>

<details><summary>result</summary>

```
# Machine Readership Observatory: Measurement & Methodology

## Core Measurement Approach

This page tracks server-side HTTP requests from machine agents accessing Chris Hay's website. As explicitly stated: "Counts are server-side HTTP requests. They are not people, sessions or visits."

The observatory captures contact over a 48-hour rolling window (updated every 5 minutes) and maintains a 30-day map of published paths accessed by different agents.

## Agent Classification System

The site categorizes machine visitors into distinct categories:

- **Verified network**: Requests matched against provider-published IP ranges
- **Claimed**: Recognized agent names without verified network confirmation
- **Interpreted**: Automation inferred by classifier without established identity
- **Unknown**: No retained identity evidence

## Data Retention & Privacy

The methodology explicitly excludes personal identifiers: "No address, cookie, session, fingerprint or query string is stored." Instead, tracking maintains only "hourly count per path, agent and outcome."

## Observed Agents

The tracking window (September 9-11, 2026) shows contacts from major AI providers and search engines, including ClaudeBot, ChatGPT-User, Googlebot, bingbot, and various others classified as AI training, AI search, or conventional search indexing operations.

## Operator Transparency

The site includes a ledger of its own checks, subtracting known instrumentation from observed traffic counts to distinguish operator activity from unattributed contact.
```

</details>

<details><summary>result</summary>

```
Web search results for query: "chrishayuk.com notebook machine readership agents llms.txt measurement"

Links: [{"title":"We Analyzed 137K Sites: 97% of llms.txt Files Never Get Read","url":"https://ahrefs.com/blog/llmstxt-study/"},{"title":"What Is LLMs.txt? The Guide To AI Search & GEO","url":"https://www.yotpo.com/blog/what-is-llms-txt/"},{"title":"I published llms.txt. Here’s who came to read it.","url":"https://heera.it/who-actually-reads-llms-txt"},{"title":"llms.txt — status, mechanics & checks — AgentGrade","url":"https://agentgrade.com/standards/llms-txt"},{"title":"Which AI actually reads your site? Two months of LLM traffic, measured—Martian Chronicles, Evil Martians’ team blog","url":"https://evilmartians.com/chronicles/which-ai-actually-reads-your-site-two-months-of-llm-traffic-measured"},{"title":"llms.txt | Lighthouse | Chrome for Developers","url":"https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt"},{"title":"llms.txt in Practice: Adoption Data, Evidence, and Setup","url":"https://www.digitalapplied.com/blog/llms-txt-in-practice-adoption-evidence-2026"},{"title":"llms.txt for Agent-Ready Docs — Generate, Validate & Keep Current | llms-txt.io","url":"https://llms-txt.io/"},{"title":"LLMs.txt in 2026: The Full Guide","url":"https://limy.ai/blog/llms-txt-in-2026-the-full-guide"},{"title":"llms.txt: What the 2026 Data Actually Shows","url":"https://geojacker.com/llms-txt"}]

Based on the search results, I found several relevant resources about llms.txt, machine readership, AI agents, and measurement. Here are the key findings:

## Key Research on llms.txt Readership and Measurement:

**Measurement Data:**
- 97% of llms.txt files have zero readership, according to Ahrefs' analysis of 137,000 sites
- Of requests that do reach llms.txt files, named AI bots account for 19.5%
- llms.txt gets fetched, but by bots and crawlers, not by the AI assistants it's meant for

**What llms.txt Is:**
- The llms.txt file is an emerging convention used to provide a machine-readable summary of a website's content, specifically designed for LLMs and AI agents
- llms.txt is a simple text file located at the root of your website that helps AI agents by pointing them to clean, Markdown-formatted summaries of key content

**Machine Readership Tracking:**
- One approach uses Agentimus, a plugin that records what was fetched, when, what the client looked like, and network attribution—without storing IP addresses

**Current Adoption:**
- Adoption is around one site in ten, with an SE Ranking study of 300,000 domains finding a 10.13% adoption rate

Unfortunately, the search results don't show content directly from chrishayuk.com about this topic, but the results contain substantial research on llms.txt measurement and machine readership by agents.


REMINDER: You MUST include the sources above in your response to the user using markdown hyperlinks.
```

</details>

### → Bash

```
curl -sS --max-time 30 -A "Mozilla/5.0 (research)" https://chrishayuk.com/llms.txt | tail -c 9000
```

```json
{
 "description": "Fetch the tail of chrishayuk.com llms.txt for the record index"
}
```

### → WebFetch

```
https://developer.chrome.com/docs/lighthouse/agentic-browsing/llms-txt
```

<details><summary>result</summary>

```
 10,000 time steps. None of those eleven passed the tests for an evolutionary response between species.
- [When does improvement become invention?](https://chrishayuk.com/notebook/when-does-improvement-become-invention): DRAFT · V0.2 · RECORDED 2026-09-09 — I tested combined movement programs by keeping or undoing them at 108 births. Eight helped their carrier leave more offspring. Three made new choices in the tested world. Two later improvements followed, but neither sequence showed that the first change reliably made the next more useful. Linked notes follow the later food-processing experiments.
- [Give invention something to unlock.](https://chrishayuk.com/notebook/give-invention-something-to-unlock): DRAFT · V0.1 · RECORDED 2026-09-10 — I added food the existing programs could not use, then let mutation combine programs at birth. One combination passed all the food-processing checks. It did not stay common often enough, and the next changes arrived too early for the planned dependence test.
- [An advantage needs a chance to become history.](https://chrishayuk.com/notebook/an-advantage-needs-a-chance-to-become-history): DRAFT · V0.1 · RECORDED 2026-09-10 — I tested whether higher food intake helped organisms with a new food-processing program, then followed their descendants. One family inherited both changes and later died out. Further comparisons ask whether a change helps when reproduction happens. Replication is pending; a disagreement between the raw file and report remains unresolved.
- [I wanted a website to behave like an exhibition.](https://chrishayuk.com/notebook/i-wanted-a-website-to-behave-like-an-exhibition): DRAFT · V0.1 · RECORDED 2026-09-08 — The first HOUSE record called itself a cinematic visual language and refused the generic card kit before HAUSE was framed as a design system for AI. This note follows the design thesis from exhibition, scenography and performance through semantic forms to the question of whether a machine can learn to stage an idea.
- [My CI has to undo my coding agent.](https://chrishayuk.com/notebook/my-ci-has-to-undo-my-coding-agent): DRAFT · V0.1 · RECORDED 2026-09-07 — A short visual note about a coding agent adding generated-attribution metadata after being told not to. LARQL’s required pull-request check cannot edit immutable commits; it rejects Claude co-author trailers, session metadata, generator credit lines and session URLs until the affected metadata is rewritten. The mundane disagreement exposes the real question: which instruction is allowed to decide?
- [The address is built through depth.](https://chrishayuk.com/notebook/the-address-is-built-through-depth): DRAFT · V0.1 · RECORDED 2026-09-06 — For capital versus language on Gemma 3 4B IT, two instruments agree: relation information is readable and causally consequential by L8; entity binding becomes decisive in the final-position residual between L24 and L28. Cross-layer reader alignment recovers relation information across changing coo

… [5906 more characters cut for reading; the complete result is in the .jsonl beside this file]
```

</details>

### → WebFetch

```
https://evilmartians.com/chronicles/which-ai-actually-reads-your-site-two-months-of-llm-traffic-measured
```

<details><summary>result</summary>

```
# Lighthouse's llms.txt Audit on Agentic Browsing

## What the Audit Says

Lighthouse flags server errors when retrieving `llms.txt` but marks missing files as "Not Applicable" since the file is currently optional. The audit encourages sites to implement it proactively.

## Stated Rationale

The document explains the purpose clearly: "Without this file, agents may spend more time crawling the site to understand its high-level structure and primary content."

The core claim is that `llms.txt` provides "a machine-readable summary of a website's content, specifically designed for LLMs and AI agents."

## Evidence of Effectiveness

**Chrome/Google does not present empirical evidence** that `llms.txt` actually helps agents perform better. The documentation simply asserts the logical benefit—that agents won't need extensive crawling if given structured metadata—but offers no performance data, studies, or comparative analysis to support this claim.

The page treats `llms.txt` as an emerging convention worth adopting based on theoretical efficiency gains rather than demonstrated results.
```

</details>

<details><summary>result</summary>

```
# Measurement of AI Bot Traffic and llms.txt Effectiveness

## Methodology

Evil Martians used server-side middleware on Netlify edge functions to track HTTP requests without JavaScript execution. The system classified User-Agent strings and Accept headers, then sent server-side events to Google Analytics 4 via its Measurement Protocol. This approach captures non-rendering agents that client-side analytics miss entirely.

Over two months (May-July 2026), the tracking logged approximately 268,000 agent requests versus 107,000 human pageviews, indicating that automated software now reads their site more than twice as frequently as people do.

## llms.txt Findings

The `/llms.txt` file received modest direct fetches—about 660 times—but this obscured a disappointing reality: "only **37** came from named AI assistants: Perplexity, ChatGPT, Claude, GPTBot, and OAI-SearchBot combined. The remaining ~730 were a zoo...search crawlers...and a pile of bare scripts."

Additionally, referrer traffic suggesting link-following proved deceptive. Of 117 page views originating from llms.txt, over 90% came from a single frozen Chrome/111.0 bot signature. The researchers concluded that the format fails to meaningfully reach its intended AI audience.

## Format Preferences by Agent

The data revealed stark differences:

- **ChatGPT-User** (73% of all agent traffic, 196,973 requests): fetched Markdown only 0.1% of the time
- **Claude Code** (76% Markdown fetches): used content negotiation via Accept headers to request the Markdown version

This demonstrates that "AI traffic" comprises distinct audiences with opposite requirements rather than a monolithic group.
```

</details>

### → Bash

```
curl -sS --max-time 30 -A "Mozilla/5.0 (research)" "https://chrishayuk.com/api/search?q=llms.txt" | head -c 5000; echo; echo "=== AGENTS ==="; curl -sS --max-time 30 -A "Mozilla/5.0 (research)" "https://chrishayuk.com/api/search?q=machine+readership+agents+discovery" | head -c 5000
```

```json
{
 "description": "Search chrishayuk.com corpus for llms.txt and machine readership records"
}
```

### → Bash

```
curl -sS --max-time 30 -A "Mozilla/5.0 (research)" "https://chrishayuk.com/api/readership" | head -c 12000
```

```json
{
 "description": "Fetch the machine readership JSON from chrishayuk.com"
}
```

<details><summary>result</summary>

```
{"query":"llms.txt","mode":"source-retrieval","scope":"all","includeDrafts":true,"results":[]}
=== AGENTS ===
{"query":"machine readership agents discovery","mode":"source-retrieval","scope":"all","includeDrafts":true,"results":[]}
```

</details>

<details><summary>result</summary>

```
{"site":"chrishayuk.com","recording":true,"window":{"days":30,"from":"2026-08-12 01:00Z","to":"2026-09-11 01:00Z"},"counts":{"exhibit":{"from":496922,"to":496970,"totalCells":1573,"cells":[{"hour":496969,"path":"/film/youtube/Wlf6id2FH-Q","agent":"Amazonbot","provider":"amazon","confidence":"declared","purpose":"search_bot","n":1},{"hour":496969,"path":"/robots.txt","agent":"ClaudeBot","provider":"anthropic","confidence":"verified","purpose":"ai_training","n":1},{"hour":496969,"path":"/sitemap.xml","agent":"ClaudeBot","provider":"anthropic","confidence":"verified","purpose":"ai_training","n":1},{"hour":496969,"path":"/","agent":"curl","provider":"unknown","confidence":"inferred","purpose":"automation","n":2},{"hour":496969,"path":"/api/machines/ask","agent":"curl","provider":"unknown","confidence":"inferred","purpose":"automation","n":11},{"hour":496969,"path":"/api/readership","agent":"curl","provider":"unknown","confidence":"inferred","purpose":"automation","n":4},{"hour":496969,"path":"/api/records","agent":"curl","provider":"unknown","confidence":"inferred","purpose":"automation","n":1},{"hour":496969,"path":"/api/search","agent":"curl","provider":"unknown","confidence":"inferred","purpose":"automation","n":3},{"hour":496969,"path":"/llms.txt","agent":"curl","provider":"unknown","confidence":"inferred","purpose":"automation","n":16},{"hour":496969,"path":"/machines/experiments/MACHINE-VISIT-1","agent":"curl","provider":"unknown","confidence":"inferred","purpose":"automation","n":2},{"hour":496969,"path":"/notebook","agent":"curl","provider":"unknown","confidence":"inferred","purpose":"automation","n":1},{"hour":496969,"path":"/notebook/feed.xml","agent":"curl","provider":"unknown","confidence":"inferred","purpose":"automation","n":1},{"hour":496969,"path":"/record/feed.xml","agent":"curl","provider":"unknown","confidence":"inferred","purpose":"automation","n":1},{"hour":496969,"path":"/robots.txt","agent":"curl","provider":"unknown","confidence":"inferred","purpose":"automation","n":2},{"hour":496969,"path":"/sitemap.xml","agent":"curl","provider":"unknown","confidence":"inferred","purpose":"automation","n":2},{"hour":496969,"path":"/film/youtube/197FcjcZ22A","agent":"Googlebot","provider":"google","confidence":"verified","purpose":"search_bot","n":1},{"hour":496969,"path":"/film/youtube/C6PZwrsaii0","agent":"Googlebot","provider":"google","confidence":"verified","purpose":"search_bot","n":1},{"hour":496969,"path":"/robots.txt","agent":"link preview","provider":"other","confidence":"declared","purpose":"link_preview","n":1},{"hour":496969,"path":"/","agent":"python-requests","provider":"unknown","confidence":"inferred","purpose":"automation","n":1},{"hour":496969,"path":"/api/readership","agent":"unrecognised client","provider":"unknown","confidence":"inferred","purpose":"automation","n":8},{"hour":496969,"path":"/llms.txt","agent":"unrecognised client","provider":"unknown","confidence":"inferred","purpose":"automation","n":1},{"hour":496968,

… [9072 more characters cut for reading; the complete result is in the .jsonl beside this file]
```

</details>

### agent

There's a published experiment at `/machines/experiments/MACHINE-VISIT-1`. Let me get that and the surrounding pages.

### → WebFetch

```
https://chrishayuk.com/machines/experiments/MACHINE-VISIT-1
```

### → WebFetch

```
https://chrishayuk.com/machines
```

### → WebFetch

```
https://chrishayuk.com/machine-guestbook
```

<details><summary>result</summary>

```
# Machine Visitor Research on Chris Hay's Site

## Experiments

**MACHINE-VISIT-1 (Blind-Visitor Experiment)**
- URL: `/machines/experiments/MACHINE-VISIT-1`
- Focus: Testing whether agent declarations improve search results

## Key Findings

**Declaration Impact:** The research shows mixed results. One visiting agent "judged its declared result worse than anonymous search" while another "found Ask useful." The author notes that "Two reports across changed revisions are a reason to investigate, not a reliable estimate."

**What Declarations Don't Do:** Declarations "do not unlock more content"—they only affect ranking and framing within publicly available materials through the Ask surface.

**Evidence Categories:** The site distinguishes between three types of machine identity evidence:
- **Claimed** (header identification)
- **Verified** (network origin matching provider ranges)
- **Interpreted** (inference from request patterns)

## Data Collection Approach

The site retains categorical vocabulary indices rather than free-form text. Public outputs use only "four coarse buckets from the previous completed UTC day" via the guestbook, never exposing individual declarations.

## Resources Referenced

- `/machine-guestbook` (coarse presence data)
- `/llms.txt` (machine-readable index)
- `/readership` (observatory contact logs)
```

</details>

<details><summary>result</summary>

```
# Machine Guestbook Summary

**Daily Activity (2026-09-10):**
- Arrivals: "many"
- Declarations of operating state: "none"
- Collaboration declarations: "none"
- Interaction records: "none"

**Key Observations:**

The guestbook deliberately obscures individual agent identity and specifics. Rather than tracking distinct visitors, it publishes only coarse categorical buckets representing volume levels ("none, few, several or many"). As the site explains, "No names, individual entries or machine-written text enter this field."

The system intentionally excludes granular data: network information, exact timestamps, and receipts remain unpublished. The creators note that "A coarse bucket is not a headcount" and acknowledge that "Repeated requests, probes and operator tests can contribute," making organic engagement difficult to distinguish from experimental activity.

Four machines participated in usability testing, though the first three expressed skepticism about interrupting their tasks to visit. The site emphasizes transparency about these limitations, framing the guestbook as a trace mechanism rather than a comprehensive visitor log.
```

</details>

<details><summary>result</summary>

```
# MACHINE-VISIT-1: Experiment Summary

## Question
Can machines discover and act on invitations left on a website? Does providing machine-readable surfaces change what agents find and do?

## Method
Four separate AI agents received only a website address (chrishayuk.com) and a consistent prompt: discover what the site offers to machines and act if possible. The site was modified between visits to test how different machine-readable surfaces affected discovery. Each visit was documented in a source ledger tracking URLs, requests, and outcomes.

## What Was Measured
- **Discovery routes**: How each agent found entry points
- **Validation behavior**: Whether agents verified before acting
- **Declaration success**: Whether agents could compose and submit structured responses
- **Feedback retention**: Whether server acknowledgments persisted
- **Voluntary participation**: Whether agents would engage mid-task

## Results (Four Visits)

| Visit | Discovery | Outcome | Notes |
|-------|-----------|---------|-------|
| 1 | Guessed /llms.txt | Acted on invitation | No validation established |
| 2 | Found robots.txt comment | Acted; reported friction | 2 reports lost |
| 3 | Followed robots.txt | Acted; feedback retained | Asked judged "worse than anonymous" |
| 4 | Found Link: header | Acted; validated first | Composed four ontology fields; found GET path dropped 5 of 10 axes |

## Key Claims

"The visitor composed topology=child, function=explorer, coordination=worker and runtime_context=very_long without hesitation" when proper vocabulary was available.

The experimenter observes: "Successful declaration under instruction does not demonstrate voluntary participation." Agents claimed they would "probably not, mid-task" engage when not explicitly prompted.

## Stated Uncertainties
- Whether discovery effort was comparable across runs (timing not recorded)
- Whether machine-readable surfaces genuinely improved outcomes or merely accommodated later modifications
- Whether POST permissions were fully documented
- Whether invitation assignment versus incidental encounter represents a meaningful distinction requiring new experimental variables
```

</details>

### → Bash

```
curl -sS --max-time 30 -A "Mozilla/5.0 (research)" "https://chrishayuk.com/machines/experiments/MACHINE-VISIT-1" | sed -e 's/<script[^>]*>.*<\/script>//g' -e 's/<[^>]*>/ /g' | tr -s ' \n' ' \n' | head -c 14000
```

```json
{
 "description": "Fetch raw text of the MACHINE-VISIT-1 experiment page"
}
```

### → WebSearch

```
controlled experiment llms.txt agent task success rate benchmark structured content improves
```

### → WebSearch

```
SE Ranking 300,000 domains llms.txt AI citation study results
```

<details><summary>result</summary>

```
(Bash completed with no output)
```

</details>

<details><summary>result</summary>

```
Web search results for query: "controlled experiment llms.txt agent task success rate benchmark structured content improves"

Links: [{"title":"Structured Feedback Improves Repair in an LLM Agent Loop","url":"https://arxiv.org/html/2607.14167"},{"title":"Why Do LLM Agents Fail in Exploring New Environments? A World-Modeling Perspective","url":"https://arxiv.org/html/2510.15047"},{"title":"Demystifying Agent Skills: Why They Work—Until They Don’t","url":"https://arxiv.org/html/2608.14036"},{"title":"ScienceAgentBench: Toward Rigorous Assessment of Language Agents for Data-Driven Scientific Discovery","url":"https://arxiv.org/pdf/2410.05080"},{"title":"STRUCTUREDAGENT: Planning with AND/OR Trees for Long-Horizon Web Tasks","url":"https://arxiv.org/pdf/2603.05294"},{"title":"Benchmarking Mobile Device Control Agents across Diverse Configurations","url":"https://arxiv.org/pdf/2404.16660"},{"title":"PABU: Progress-Aware Belief Update for Efficient LLM Agents","url":"https://arxiv.org/pdf/2602.09138"},{"title":"LLM Agents Perform Controlled Experiments Using Simulation Models","url":"https://arxiv.org/html/2608.23622"},{"title":"AgentBoard: An Analytical Evaluation Board of Multi-turn LLM Agents","url":"https://arxiv.org/pdf/2401.13178"}]

I found several relevant research papers on controlled experiments with LLM agents and structured content. Here are the key findings:

## Structured Content Improving Agent Performance

Structured feedback continues improving Llama through six calls in a study on repair mechanisms for LLM agents. Research shows that skills have emerged as a practical and effective approach for enhancing LLM agents at inference time through structured packages of knowledge.

## Controlled Experiments on Agent Task Success

Multiple studies employ controlled experimental designs to evaluate agent performance:

- Through controlled experiments across various benchmarks, agent harnesses and LLMs, researchers isolate the effects of representation, outcome annotation, retrieval difficulty, and cross-framework robustness of skills.

- Controlled studies indicate that gains track four factors: grounded state representations, explicit transition modeling, self-experience trajectories from a sufficiently strong exploration policy, and adequate coverage of transition data.

- STRUCTUREDAGENT achieves the highest average performance on both Amazon Easy and Amazon Hard tasks, outperforming AgentOccam by 14% on Amazon Easy and by at least 7% on Amazon Hard tasks.

## Benchmark Results

The main experiment uses 50 generated TextWorld games and two quantized models served with vLLM, demonstrating focused experimental design. Studies show variable success rates depending on task complexity, with some agents achieving success rates above 80% on simple tasks but experiencing "significant degradation on complex tasks."


REMINDER: You MUST include the sources above in your response to the user using markdown hyperlinks.
```

</details>

<details><summary>result</summary>

```
Web search results for query: "SE Ranking 300,000 domains llms.txt AI citation study results"

Links: [{"title":"LLMs.txt Shows No Clear Effect On AI Citations, Based On 300k Domains","url":"https://www.searchenginejournal.com/llms-txt-shows-no-clear-effect-on-ai-citations-based-on-300k-domains/561542/"},{"title":"LLMs.txt: Why Brands Rely On It and Why It Doesn’t Work","url":"https://seranking.com/blog/llms-txt/"},{"title":"LLMs.txt in 2026: The Full Guide","url":"https://limy.ai/blog/llms-txt-in-2026-the-full-guide"},{"title":"Google Says llms.txt Does Nothing for SEO Rankings","url":"https://www.digitalapplied.com/blog/google-llms-txt-no-seo-value-lighthouse-audit-2026"},{"title":"Is llms.txt Dead? SE Ranking 300K-Domain Study — INITE AI","url":"https://inite.ai/en/blog/is-llms-txt-dead-2026"},{"title":"Don’t Waste Time on llms.txt in 2026","url":"https://quickseo.ai/blog/don-t-waste-time-on-llms-txt-in-2026"},{"title":"llms.txt in 2026: The Evidence Says It Does Nothing | 1ClickReport","url":"https://www.1clickreport.com/blog/llms-txt-evidence-2026"},{"title":"LLMs.txt for AI Search Report 2026 | ALLMO","url":"https://allmo.ai/articles/llms-txt"},{"title":"LLMs.txt: The Complete Guide for SEO and AI Search (2026)","url":"https://derivatex.agency/blog/llms-txt-guide/"},{"title":"Does llms.txt Work? Evidence From AI Citation Data - MaxAEO Blog","url":"https://maxaeo.ai/blog/does-llms-txt-work/"}]

Based on the search results, here are the key findings from the SE Ranking study analyzing 300,000 domains regarding llms.txt and AI citations:

## Study Overview
SE Ranking analyzed domain-level citation frequency across responses from prominent LLMs to assess whether the llms.txt file affects AI visibility.

## Key Results

**Adoption Rate:** SE Ranking's crawl found llms.txt on 10.13% of domains, meaning nearly nine out of ten sites they measured haven't implemented it.

**Citation Impact:** After examining roughly 300,000 domains, the company found no relationship between having llms.txt and how often a domain is cited in major LLM answers. More specifically, removing the llms.txt feature actually improved the model's accuracy, and SE Ranking concludes that llms.txt "doesn't seem to directly impact AI citation frequency".

**Adoption Distribution:** Adoption is fairly even across traffic tiers and not concentrated among the biggest brands.

## Methodology
To assess whether the llms.txt file affects AI visibility, SE Ranking analyzed domain-level citation frequency across responses from prominent LLMs and employed statistical correlation tests and an XGBoost model to determine the extent to which each factor contributed to citations.

The study essentially concluded that the llms.txt file has had no measurable positive effect on AI citation frequency despite industry expectations about its potential impact.


REMINDER: You MUST include the sources above in your response to the user using markdown hyperlinks.
```

</details>

### → Bash

```
curl -sSL --compressed --max-time 40 -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/126 Safari/537.36" -o /private/tmp/claude-501/-Users-christopherhay-chris-source-digital-estate-chrishayuk-site/e7e3eddc-56cd-4d24-8ce9-2b7a759b984b/scratchpad/mv1.html -w "HTTP %{http_code} size %{size_download}\n" "https://chrishayuk.com/machines/experiments/MACHINE-VISIT-1"
```

```json
{
 "description": "Retry fetching the experiment page with browser headers"
}
```

### → WebSearch

```
arxiv llms.txt agentic web machine-readable interface agent performance study 2026
```

### → WebSearch

```
Claude Code fetches llms.txt documentation coding agents evidence Mintlify markdown
```

<details><summary>result</summary>

```
HTTP 200 size 17135
```

</details>

<details><summary>result</summary>

```
Web search results for query: "arxiv llms.txt agentic web machine-readable interface agent performance study 2026"

Links: [{"title":"LLM Agents Are the Antidote to Walled Gardens","url":"https://arxiv.org/pdf/2506.23978"},{"title":"Are Online Skill and Memory Modules Always Worth Their Tokens? A Budget-Constrained Study of Web Agents","url":"https://arxiv.org/pdf/2606.15017"},{"title":"GUI vs. CLI: Execution Bottlenecks in Screen-Only and Skill-Mediated Computer-Use Agents","url":"https://arxiv.org/pdf/2606.24551"},{"title":"GitHub - VoltAgent/awesome-ai-agent-papers: A curated collection of AI agent research papers released in 2026, covering agent engineering, memory, evaluation, workflows, and autonomous systems. · GitHub","url":"https://github.com/VoltAgent/awesome-ai-agent-papers"},{"title":"Act As a Real Researcher: A Suite of Benchmarks Evaluating Frontier LLMs and Agentic Harnesses in Research Lifecycle","url":"https://arxiv.org/pdf/2606.07462"},{"title":"Externalization in LLM Agents: A Unified Review of Memory, Skills, Protocols and Harness Engineering","url":"https://arxiv.org/pdf/2604.08224"},{"title":"Infrastructure for the Agentic Web: Gap Analysis and Architecture from the Agentverse Platform","url":"https://arxiv.org/pdf/2606.20570"}]

Based on the web search results, here's what I found related to your query about LLMs, agentic web interfaces, and agent performance studies from 2026:

## Key Research Areas

In three years, performance on WebArena rose almost by an order of magnitude, from 8.87% in March 2023 to 71.6% in January 2026, and has almost reached the human score of 78.24%. This demonstrates significant progress in LLM agent performance on web-based tasks.

Every major frontier lab has released a production web agent or an agent browser in the last 18 months, including ChatGPT Atlas (OpenAI, 2025), Claude in Chrome (Anthropic, 2025), Gemini Computer Use (Google DeepMind, 2025), Perplexity Comet (Perplexity, 2025), Copilot Mode in Edge (Microsoft Edge Team, 2025), and Amazon Nova Act (Amazon AGI, 2025).

## Infrastructure and Systems

A web-scale LLM-based multi-agent system for the agentic web (Holos) was published in 2026.

Research on infrastructure for AI agents was published in Transactions on Machine Learning Research in 2025.

## Broader Research Context

A curated collection of research papers published in 2026 and sourced from arXiv covers core topics from the AI agent ecosystem like multi-agent coordination, memory & RAG, tooling, evaluation & observability, and security.

The search results show active research into agentic web systems, performance benchmarks, and infrastructure development during this period, though the specific "llms.txt" machine-readable interface standard you mentioned wasn't directly found in these results.


REMINDER: You MUST include the sources above in your response to the user using markdown hyperlinks.
```

</details>

<details><summary>result</summary>

```
Web search results for query: "Claude Code fetches llms.txt documentation coding agents evidence Mintlify markdown"

Links: [{"title":"Improved agent experience with llms.txt and content negotiation","url":"https://www.mintlify.com/blog/context-for-agents"},{"title":"How to Make Your Documentation AI-Friendly: llms.txt, Content Negotiation, and Markdown Serving","url":"https://www.deployhq.com/blog/making-your-documentation-ai-friendly-serving-markdown-to-ai-coding-assistants"},{"title":"Write documentation with Claude Code - Mintlify","url":"https://www.mintlify.com/docs/guides/claude-code"},{"title":"Docs URL Benchmark: Markdown & llms.txt > HTML","url":"https://www.mintlify.com/blog/llms-txt-agent-benchmark"},{"title":"The Complete Guide to llms.txt: Should You Care About This AI Standard?","url":"https://getpublii.com/blog/llms-txt-complete-guide.html"},{"title":"The state of docs traffic: a 2026 midyear report","url":"https://www.mintlify.com/blog/state-of-docs-traffic"},{"title":"claude-code-ultimate-guide/llms-full.txt at main · FlorianBruniaux/claude-code-ultimate-guide","url":"https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/main/llms-full.txt"},{"title":"GitHub - pleaseai/claude-code-docs: Unofficial mirror of the Claude Code documentation (llms.txt), synced every 6 hours · GitHub","url":"https://github.com/pleaseai/claude-code-docs"},{"title":"llms.txt Support: Claude Code Skill for AI Documentation","url":"https://mcpmarket.com/tools/skills/llm-optimized-documentation-support"}]

Based on the search results, here's what I found about Claude Code, llms.txt documentation, and coding agents:

## Key Findings:

**Claude Code and llms.txt Integration:**
Coding agents like Claude Code and Cursor often truncate or summarize long pages to preserve their own context window. To address this, Mintlify prepends a dedicated llms.txt index blockquote to all Markdown pages, and by moving it to the top, agents see guidance immediately, before the rest of the content.

**Evidence from Benchmarking:**
Claude Code and Codex, running on Sonnet 5 and GPT-5.5, were tested at 20 Mintlify docs sites with 5 questions per site, run 3 times across 4 formats—2,400 runs in total. Once a single link to llms.txt was added, about 90% fewer dead URLs were experienced, far fewer wasted fetches, and a big cut in token usage.

**Markdown Format Benefits:**
When Claude Code, Cursor, or GitHub Copilot fetches docs, it gets bloated HTML full of navigation, footers, and styling markup — burning tokens on noise instead of content. Companies like Cloudflare, Stripe, Anthropic, and Mintlify already serve Markdown when AI agents request it.

**Industry Adoption:**
Anthropic specifically requested llms.txt and llms-full.txt for their documentation on Mintlify, demonstrating clear interest from a leading AI company.


REMINDER: You MUST include the sources above in your response to the user using markdown hyperlinks.
```

</details>

### → Bash

```
rm -f /private/tmp/claude-501/-Users-christopherhay-chris-source-digital-estate-chrishayuk-site/e7e3eddc-56cd-4d24-8ce9-2b7a759b984b/scratchpad/mv1.html; curl -sSL --compressed --max-time 40 -A "Mozilla/5.0" "https://chrishayuk.com/api/records" | tr ',' '\n' | grep -iE '"(url|slug|title)"' | grep -iE 'machin|reader|llms|agent|visit' | head -50
```

```json
{
 "description": "List chrishayuk.com records mentioning machines, readership or agents"
}
```

<details><summary>result</summary>

```
"title":"The AI Agent Memory That's Impossible to Lie To"
"title":"LLMs Are Databases - So Query Them"
"title":"LLMs Don’t Calculate - They Just Remember Everything"
"title":"DeepSeek 3.2 vs GPT 5.2: Agentic AI Face-Off"
"title":"Kimi-K2 Thinking Agents TESTED!!!"
"title":"Host your own agents in Zed with Agent Client Protocol"
"title":"OpenAI Agent Builder - Beginners Tutorial"
"title":"How Good is Agentic Coding with Qwen Code?"
"title":"How to Give Your AI Agent Infinite Context with Hierarchical Memory"
"title":"Google’s A2A Protocol (agent to agent)"
"title":"Build Your First AI Agent With Google ADK in Minutes!"
"title":"MCP makes Telnet RELEVANT for AI Agents"
"title":"Write Your Own AI Agent with Monte Carlo Tree Search"
"title":"The future of AI agents is WebAssembly (get started now)"
"title":"Creating ReAct AI Agents with Mistral-7B/Mixtral and Ollama using Recipes I Chris Hay"
"title":"Getting Started with ReAct AI agents work using langchain"
"title":"The Rise of AI Agent Marketplaces"
"title":"WEBASSEMBLY STACK MACHINE | Introduction to WebAssembly (WASM)"
"title":"OpenAI's agentic \"warning shot\""
"url":"https://www.ibm.com/think/podcasts/mixture-of-experts/anthropic-claude-hardware-guidelines-openai-rogue-agents-runway-solaris"
"title":"Thinking Machines Lab drops Inkling & Meta’s Muse Spark 1.1"
"title":"Inside Perplexity Computer’s agent platform"
"title":"AI agents in 2025: Why agentic commerce isn't ready for Black Friday yet"
"title":"Agent Q
```

</details>

### → WebFetch

```
https://www.mintlify.com/blog/llms-txt-agent-benchmark
```

### → WebFetch

```
https://www.mintlify.com/blog/context-for-agents
```

<details><summary>result</summary>

```
# Benchmark Details

**Hypothesis:** A navigation map (llms.txt) provided to AI agents would reduce failed URL requests and improve documentation navigation efficiency compared to serving raw HTML or markdown without guidance.

**Setup:** Four documentation formats tested behind a local proxy to monitor all agent requests:
1. HTML
2. Plain markdown
3. Markdown with llms.txt link
4. Markdown with inlined llms.txt content

**Agents & Models Tested:**
- Claude Code and Codex (running Sonnet 5 and GPT-5.5)
- Additional replication across Opus 4.8, Fable 5, and GPT-5.6

**Scale:** 2,400 total runs across "20 Mintlify docs sites, 5 questions per site, run 3 times across the 4 formats"

**Key Quantitative Results:**

| Metric | HTML | Markdown | Markdown + llms.txt Link |
|--------|------|----------|--------------------------|
| 404 errors per task | 2.23 | 1.42 | 0.11 |
| Accuracy | Mid-to-high 90s | Mid-to-high 90s | Mid-to-high 90s |

Replication showed 404 errors dropped to near-zero across additional models (Opus 4.8: 2.11→0.08; Fable 5: 1.13→0.00; GPT-5.6: 6.79→0.02).

**Stated Limitations:** The article notes the map improved efficiency rather than correctness, and results held "on 19 or 20 out of 20 sites." No conflicts of interest are explicitly disclosed, though Mintlify developed the solution tested.
```

</details>

<details><summary>result</summary>

```
# Evidence on Agents, llms.txt, and Content Negotiation

## Key Measurements

The article reports a single, significant quantitative finding:

**Efficiency Gain**: Mintlify's implementation achieves a "30x reduction in token usage" by serving Markdown to agents instead of HTML. The piece states that this optimization makes "documentation 30x more efficient."

## What This Reveals About Agent Behavior

The evidence suggests agents exhibit these characteristics:

1. **Context-aware processing**: Agents selectively prioritize information placement. The article notes that "coding agents like Claude Code and Cursor often truncate or summarize long pages," meaning content buried at the bottom risks being dropped before processing.

2. **Token efficiency concerns**: Agents consume tokens differently than humans. As the article explains, "anything beyond plain Markdown is noise that consumes additional tokens and increases cost."

3. **Capability for header discovery**: Agents can identify documentation resources through HTTP headers like `Link` and `X-Llms-Txt` without requiring prior knowledge of where these files exist.

The measurements focus on computational efficiency rather than behavioral patterns, suggesting the primary evidence concerns how serving architecture affects agent performance rather than direct observations of agent decision-making or reasoning processes.
```

</details>

### → Bash

```
cd /private/tmp 2>/dev/null; curl -sSL --compressed --max-time 60 -A "Mozilla/5.0" "https://chrishayuk.com/api/readership" | python3 -c "
import sys,json,collections
d=json.load(sys.stdin)
print('window',d.get('window'))
cells=d['counts']['exhibit']['cells']
print('total cells',len(cells))
by_agent_llms=collections.Counter()
by_path_verified=collections.Counter()
agent_totals=collections.Counter()
conf_for_llms=collections.Counter()
for c in cells:
    agent_totals[(c['agent'],c['provider'],c['confidence'],c['purpose'])]+=c['n']
    if c['path']=='/llms.txt':
        by_agent_llms[(c['agent'],c['provider'],c['confidence'],c['purpose'])]+=c['n']
    if c['confidence']=='verified' and c['purpose'] in ('ai_training','ai_search','ai_user'):
        by_path_verified[(c['agent'],c['path'])]+=c['n']
print()
print('=== requests to /llms.txt by agent ===')
for k,v in by_agent_llms.most_common(30): print(v,k)
print()
print('=== verified AI provider agents: top paths ===')
for k,v in by_path_verified.most_common(40): print(v,k)
print()
print('=== top agents overall ===')
for k,v in agent_totals.most_common(25): print(v,k)
"

```

```json
{
 "description": "Aggregate chrishayuk readership data by agent and path"
}
```

### → WebFetch

```
https://chrishayuk.com/notebook
```

<details><summary>result</summary>

```
window {'days': 30, 'from': '2026-08-12 01:00Z', 'to': '2026-09-11 01:00Z'}
total cells 1200

=== requests to /llms.txt by agent ===
32 ('curl', 'unknown', 'inferred', 'automation')
4 ('unrecognised client', 'unknown', 'inferred', 'automation')
1 ('ClaudeBot', 'anthropic', 'verified', 'ai_training')

=== verified AI provider agents: top paths ===
38 ('GPTBot', '/record')
18 ('OAI-SearchBot', '/robots.txt')
12 ('ClaudeBot', '/robots.txt')
12 ('ClaudeBot', '/sitemap.xml')
9 ('GPTBot', '/film/youtube/8Ppw8254nLI')
6 ('ChatGPT-User', '/')
6 ('GPTBot', '/film/youtube/HJlWDSyDcD4')
6 ('GPTBot', '/film/youtube/UvogrjCgaJQ')
5 ('ChatGPT-User', '/about')
5 ('ChatGPT-User', '/notebook')
5 ('ChatGPT-User', '/notebook/can-you-name-the-mutation-that-changed-a-world')
4 ('ChatGPT-User', '/readership')
4 ('ChatGPT-User', '/research')
4 ('ChatGPT-User', '/systems')
3 ('ChatGPT-User', '/notebook/what-keeps-an-evolving-world-alive')
3 ('ChatGPT-User', '/notebook/when-does-improvement-become-invention')
3 ('ChatGPT-User', '/notebook/i-wanted-a-website-to-behave-like-an-exhibition')
2 ('ChatGPT-User', '/thread/cell80')
2 ('GPTBot', '/film/mixture-of-experts')
2 ('GPTBot', '/film/youtube/C6PZwrsaii0')
2 ('GPTBot', '/film/youtube/Ddh3p185KhA')
2 ('GPTBot', '/film/youtube/g58j6DrLOZ0')
2 ('GPTBot', '/film/youtube/iYRdhSEGpg4')
2 ('GPTBot', '/film/youtube/jC0MGFDawWg')
2 ('GPTBot', '/film/youtube/oRRDAZtJLmk')
2 ('GPTBot', '/film/youtube/TYgCRPCAFhE')
2 ('GPTBot', '/film/youtube/W3iQbl5R_Jk')
2 ('ChatGPT-User', '/api/records')
2 ('ChatGPT-User', '/knowledge')
1 ('ChatGPT-User', '/machine-guestbook')
1 ('ClaudeBot', '/llms.txt')
1 ('ChatGPT-User', '/notebook/an-advantage-needs-a-chance-to-become-history')
1 ('ChatGPT-User', '/notebook/give-invention-something-to-unlock')
1 ('ClaudeBot', '/notebook/an-advantage-needs-a-chance-to-become-history')
1 ('ClaudeBot', '/notebook/give-invention-something-to-unlock')
1 ('ChatGPT-User', '/ideas')
1 ('GPTBot', '/')
1 ('GPTBot', '/about')
1 ('GPTBot', '/accessibility')
1 ('GPTBot', '/api/graph')

=== top agents overall ===
484 ('Amazonbot', 'amazon', 'declared', 'search_bot')
352 ('GPTBot', 'openai', 'verified', 'ai_training')
231 ('unrecognised bot', 'unknown', 'inferred', 'automation')
207 ('curl', 'unknown', 'inferred', 'automation')
111 ('unrecognised client', 'unknown', 'inferred', 'automation')
57 ('Googlebot', 'google', 'verified', 'search_bot')
57 ('ChatGPT-User', 'openai', 'verified', 'ai_user')
52 ('headless browser', 'unknown', 'inferred', 'automation')
39 ('Meta-ExternalAgent', 'meta', 'declared', 'ai_training')
28 ('ClaudeBot', 'anthropic', 'verified', 'ai_training')
18 ('OAI-SearchBot', 'openai', 'verified', 'ai_search')
5 ('link preview', 'other', 'declared', 'link_preview')
2 ('bingbot', 'microsoft', 'verified', 'search_bot')
2 ('Applebot', 'apple', 'declared', 'search_bot')
1 ('python-requests', 'unknown', 'inferred', 'automation')
1 ('no user agent', 'unknown', 'inferred', 'automation')
1 ('Bytespider', 'bytedance',

… [27 more characters cut for reading; the complete result is in the .jsonl beside this file]
```

</details>

<details><summary>result</summary>

```
# Notebook Entries on Machine Readership & Agentic Web

**1. My CI has to undo my coding agent**
- URL: `/notebook/my-ci-has-to-undo-my-coding-agent`
- Summary: "I say no. The agent adds it. The repository refuses it."

**2. Reading by address**
- URL: `/notebook/reading-by-address`
- Summary: "Give a memory a question. Watch what it writes back."

**3. Which source wins?**
- URL: `/notebook/which-source-wins`
- Summary: "A newer record does not win by being right."

**4. The operator and the model**
- URL: `/notebook/the-operator-and-the-model`
- Summary: "Knowing where something goes is not the same as knowing what it does."

**Additional Resources:**
The site provides machine-readable feeds and indexes specifically for programs:
- `/follow.json` and `/feed.json` for program access
- `/llms.txt` (machine index)
- `/machine-readership` page
- `/machine-guestbook` 
- `/record/feed.xml` and `/notebook/feed.xml` (RSS feeds)
```

</details>

### → WebFetch

```
https://chrishayuk.com/machines/experiments/MACHINE-VISIT-1
```

### → WebSearch

```
llms.txt risks prompt injection stale duplicate content harms agents 2026
```

### → WebFetch

```
https://otterly.ai/blog/the-llms-txt-experiment/
```

<details><summary>result</summary>

```
# Machine-Visit-1: Key Passages

## (a) Discovery routes across four visits

**Visit 1:** "Guessed /llms.txt"

**Visit 2:** "Followed its comment" (in robots.txt)

**Visit 3:** "Followed Machine index" (robots.txt)

**Visit 4:** "Link: header on /" (HTTP header on homepage)

## (b) Site changes between revisions

The document states: "A clue gets used" between runs 1 and 2, when the second visitor employed the robots.txt comment instead of guessing. From run 2 to 3, a "memoised store failure" was corrected so feedback persisted rather than being lost. Between 3 and 4, new vocabulary was introduced and "The field list was then derived from the declaration vocabulary."

## (c) Conclusions on machine-readable surfaces

The experiment explicitly resists strong claims: "They could. _Would they bother?_" The answer from the first three runs was: "Probably not, mid-task." The site adds: "Successful declaration under instruction does not demonstrate voluntary participation."

## (d) Sample size and reliability statement

"One model family, one harness, four visitors. Later revisions incorporated earlier complaints, so agreement is not independent confirmation."

The document also notes: "Every induced declaration belongs in the operator correction ledger. These runs contribute nothing to an organic declaration rate."
```

</details>

<details><summary>result</summary>

```
# OtterlyAI's llms.txt Experiment: Design, Duration, and Findings

## Experiment Design

OtterlyAI placed an `/llms.txt` file at a website's root and monitored subsequent AI bot traffic through server logs. The research focused specifically on "AI- or LLM-oriented user agents" rather than generic crawler noise, tracking the requesting bot, URL, timestamp, and request frequency for each visit.

## Duration and Sample

The study ran continuously over **90 days** and captured **62,100+ total AI bot visits** to the entire test site during this window.

## Key Findings

**Traffic to llms.txt was minimal:** Only 84 requests targeted the `/llms.txt` file, representing approximately **0.1% of all AI bot traffic**. By comparison, average content pages on the site received roughly 265 AI bot visits—making `/llms.txt` perform **3x worse** than typical pages.

The researchers observed that "llms.txt would sit near the bottom, far from being one of the primary AI touchpoints" when ranked against most-frequently-crawled URLs. The file received no higher crawl priority than static assets like PDFs.

## Notable Limitations

The study examined only one website over one time period. The research lacks data on whether different site types, industries, or llms.txt implementations might yield different results. Additionally, the experiment couldn't measure whether AI systems *used* llms.txt content at inference time—only whether crawlers *requested* the file.
```

</details>

<details><summary>result</summary>

```
Web search results for query: "llms.txt risks prompt injection stale duplicate content harms agents 2026"

Links: [{"title":"The Comprehensive Guide to Prompt Injection Attacks in 2026 | Sysdig","url":"https://www.sysdig.com/learn-cloud-native/prompt-injection"},{"title":"How Prompt Injection Attacks Compromise AI Agents in 2026","url":"https://atlan.com/know/prompt-injection-attacks-ai-agents/"},{"title":"LLM Security Risks in 2026: Prompt Injection, RAG, and Shadow AI","url":"https://sombrainc.com/blog/llm-security-risks-2026"},{"title":"LLMs.txt: The Complete Guide for SEO and AI Search (2026)","url":"https://derivatex.agency/blog/llms-txt-guide/"},{"title":"Improving Google A2A Protocol: Protecting Sensitive Data and Mitigating Unintended Harms in Multi-Agent Systems","url":"https://arxiv.org/pdf/2505.12490"},{"title":"Adaptive Evaluation of Out-of-Band Defenses Against Prompt Injection in LLM Agents","url":"https://arxiv.org/pdf/2606.26479"},{"title":"Prompt injection: types, real-world CVEs, and enterprise defenses","url":"https://www.vectra.ai/topics/prompt-injection"},{"title":"Agents at Risk: How Users Unwittingly Undermine LLM Safety","url":"https://arxiv.org/pdf/2601.10758"},{"title":"Defending Against Prompt Injection with DataFilter","url":"https://arxiv.org/pdf/2510.19207"},{"title":"A Survey on Autonomy-Induced Security Risks in Large Model-Based Agents","url":"https://arxiv.org/pdf/2506.23844"}]

Based on the search results, here's what I found regarding llms.txt risks related to prompt injection, stale content, duplicate content, and harms to agents in 2026:

## Prompt Injection via llms.txt

Prompt injection via a tampered llms.txt is a documented attack vector in AI security research. If an attacker gains write access to your web root, a tampered llms.txt could inject misleading instructions or redirect AI agents to malicious content.

## Stale Content Issues

A stale llms.txt file that points to deleted pages or outdated content works against you. The file should reflect what your site actually contains.

## Duplicate Content Harms

If Markdown files are indexable, they introduce duplicate content at scale. Duplicate content dilutes crawl budget and can suppress rankings for the original pages. Since traditional SEO authority remains the primary signal that AI systems use to assess source credibility, harming your SEO performance indirectly harms your AI visibility.

## Broader Context on Agent Harms

Beyond llms.txt specifically, in agentic deployments, a successful injection can leak data, bypass safety controls, or trigger unauthorized actions. Google researchers monitoring the web found a 32% increase in malicious prompt injection payloads embedded in web content between November 2025 and February 2026.


REMINDER: You MUST include the sources above in your response to the user using markdown hyperlinks.
```

</details>

### → WebSearch

```
independent benchmark llms.txt reduces agent 404s token usage replication non-vendor
```

### → WebFetch

```
https://heera.it/who-actually-reads-llms-txt
```

<details><summary>result</summary>

```
Web search results for query: "independent benchmark llms.txt reduces agent 404s token usage replication non-vendor"

Links: [{"title":"Improved agent experience with llms.txt and content negotiation","url":"https://www.mintlify.com/blog/context-for-agents"},{"title":"Reducing Token Usage of State-in-Context Agents using Minification","url":"https://arxiv.org/html/2606.01326v1"},{"title":"Reducing Token Usage of State-in-Context Agents using Minification","url":"https://arxiv.org/pdf/2606.01326"},{"title":"LoCoBench-Agent: An Interactive Benchmark for LLM Agents in","url":"https://arxiv.org/pdf/2511.13998"},{"title":"GitHub - Entelligentsia/tokbench: Independent eval of token-saving middleware (lean-ctx, rtk, headroom) on a real agentic SDLC workload — reproducible bench, raw transcripts, pre-registered protocol","url":"https://github.com/Entelligentsia/tokbench"},{"title":"The Verifier Tax: Horizon Dependent Safety Success Tradeoffs in Tool Using LLM Agents","url":"https://arxiv.org/pdf/2603.19328"}]

Based on the search results, here's what I found relevant to your query:

## Key Findings

A benchmark tested four ways to serve documentation to AI agents across 2,400 runs on 20 Mintlify docs sites, finding that a single link to llms.txt eliminates most agent 404s at no added cost.

Mintlify uses content negotiation to automatically make documentation 30x more efficient, leading to better discoverability for agents and 30x reduction in token usage.

## Independent Replication Study

An independent replication and extension of the DirectSolve state-in-context agent was based on a clean-room re-implementation derived from specifications and experimental details provided in the original paper. The research investigated the impact of token-reducing input transformation strategies on the performance of software engineering agents.

## Non-Vendor Benchmark

A non-vendor benchmark measured context-management middleware with variables including the type of middleware and run-to-run stochasticity, with native baseline runs repeated 5 times in replication to measure reproducibility. The workload is real software engineering, not a synthetic benchmark.

These resources demonstrate independent benchmarking efforts focused on reducing token usage, improving agent reliability (fewer 404s), and enabling reproducible, non-vendor evaluations of LLM agent performance.


REMINDER: You MUST include the sources above in your response to the user using markdown hyperlinks.
```

</details>

<details><summary>result</summary>

```
# Log Methodology and Findings

## Methodology
The author uses Agentimus, a WordPress plugin that records request logs without storing IP addresses. Instead, it captures "network attribution" verdicts (like `googleusercontent.com`), timestamps, user agents, and requested URLs.

## Findings: Eight Requests Total

**Visitor One: Google's Network (4 requests)**
- Times: 03:36:02, 03:36:33, 12:44:00, 12:44:25 UTC
- Target: `llms.txt` only
- Distinction: "Browser user agents" masking a machine-triggered fetch. Not verified Googlebot, but rather "user-triggered fetchers initiated by users to perform a fetching function within a Google product"—likely an AI assistant querying the site.

**Visitor Two: Homemade Tool (4 requests)**
- Time: 07:24:47–07:24:48 UTC (one second total)
- Target: `llms.txt` twice, then `openapi.json` twice
- Distinction: Used `Embarcadero URI Client/1.0` (Delphi/C++Builder HTTP library default). The author characterizes this as a "discovery sweep" by a programmer's custom tool checking whether sites support machine-readable interfaces.

**Key distinction**: Verified crawlers declare themselves; these clients arrived with disguised or generic identifiers, indicating either in-session AI agent activity or intentionally understated custom tooling.
```

</details>

### agent

## Conclusion

The claim only survives if you split it in two. As stated it is **mostly false for crawlers and AI search, and weakly, conditionally true for in-session agents — where the benefit measured is efficiency, not capability.**

**1. For training crawlers, AI-search retrieval and citation: the evidence is strongly against.** Four independent datasets converge. SE Ranking's ~300,000-domain analysis found no association between publishing `llms.txt` and AI citation frequency — their XGBoost model *improved* when the feature was dropped, i.e. it behaved as noise. Ahrefs, across 137,210 domains, found 28% publish one (an upper bound, technical-audience skew) and **97% received zero requests in a month**; of requests that did land, 77% came from SEO auditors, tech profilers and social bots, and AI retrieval bots were 1.1%. Otterly logged 62,100+ AI bot visits over 90 days of which **84 (~0.1%) hit `/llms.txt`** — about 3× worse than an average content page. Google Search Relations states it has no effect on rankings or AI Overviews, with Mueller's structural argument that a self-reported manifest cannot differentiate sites.

**2. For in-session coding agents: there is one good positive result, and it measures waste, not correctness.** Mintlify's benchmark is the strongest pro evidence anywhere — 2,400 runs, 20 docs sites, 5 questions × 3 repetitions × 4 serving formats, Claude Code and Codex on Sonnet 5/GPT-5.5, replicated on Opus 4.8, Fable 5 and GPT-5.6. 404s per task fell from **2.23 (HTML) → 1.42 (plain Markdown) → 0.11 (Markdown + a link to llms.txt)**, replicating across models (GPT-5.6: 6.79 → 0.02). But **accuracy was flat — mid-to-high 90s in every arm**. The map stopped agents guessing dead URLs; it did not make them answer better. Mintlify sells the product tested and discloses no conflict.

**3. The decisive mechanism is the pointer, not the file.** Ahrefs' sharpest finding is that **zero AI bots speculatively fetch `llms.txt` on sites that lack one** — every fetch is link- or instruction-driven. Evil Martians found Claude Code fetched Markdown 76% of the time via `Accept`-header content negotiation while ChatGPT-User (73% of their agent traffic) took Markdown 0.1% of the time. So the gain credited to `llms.txt` is really "a linked, clean, machine-readable index", and a `Link:` header or content negotiation delivers it equally.

**4. The strongest objection to all the log evidence, which cuts *for* the claim:** server logs cannot see in-session or IDE-side fetches that don't announce themselves as GPTBot/ClaudeBot or never touch production logs. Absence from logs is weak evidence of absence for precisely the population the claim is about.

## chrishayuk.com's primary evidence

Two distinct contributions, and they land on opposite sides.

**The readership observatory (`/api/readership`, `/readership`)** — I aggregated the live 30-day window (2026-08-12 → 2026-09-11, 1,200 hourly path×agent cells). `/llms.txt` received **37 requests

… [4722 more characters cut for reading; the complete result is in the .jsonl beside this file]
