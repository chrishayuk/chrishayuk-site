import { HOUSE, HOUSE_PARTS } from "./house.ts";
import { legibilityFor } from "./legibility.ts";
import { entryState } from "./feeds.ts";
import { records, recordPath, SITE } from "./records.ts";
import type { PublicationRecord } from "./types.ts";
import { siteInvites } from "./machine/invitation.ts";
import { declarationShapesResults, reciprocalSurfaceExists, rewardCondition } from "./machine/reward.ts";
import { ACTOR_TYPE, CAPABILITY, COORDINATION, EVIDENCE, FRICTION, FUNCTION, HARNESS_CLAIM, MODEL_VARIANT, PROVIDER_CLAIM, RUNTIME_CONTEXT, TASK_CLASS, TOPOLOGY, TRANSPORT } from "./machine/vocabulary.ts";

/**
 * THE DOCUMENT THIS SITE ALREADY SAID IT PUBLISHED.
 *
 * `lib/readership/visible.ts` names /llms.txt among the machine-facing
 * documents, and the readership tests assert it classifies as an agent
 * document. Nothing served it. A publication that measures who reads
 * its machine surfaces should probably have the machine surface it
 * claims, and this closes that gap rather than adding a feature.
 *
 * The convention is llms.txt: a title, one line of what this is, and
 * sections of links with enough description that an agent can choose
 * without fetching everything. What this site adds is the discipline it
 * applies everywhere else — a draft says it is a draft, in the same
 * line as its title, so an agent that lifts one line into an answer
 * cannot lose the status while doing it.
 *
 * Indexing policy is honoured exactly as robots.txt honours it: an
 * edition that is not published does not describe its contents to
 * anybody, machine or otherwise.
 */

const entry = (record: PublicationRecord) => {
 const meaning = legibilityFor(record.id);
 return `- [${record.title}](${SITE}${recordPath(record)}): ${entryState(record)}${meaning ? ` — Subject: ${meaning.subject}. Question: ${meaning.question}` : ""} — ${record.abstract}`;
};

/** An empty section is omitted rather than printed as a heading with nothing under it. */
const section = (heading: string, lines: string[]): string | null =>
 lines.length ? `## ${heading}\n\n${lines.join("\n")}` : null;

const of = (kind: PublicationRecord["kind"]) =>
 records.filter(record => record.kind === kind && !record.youtubeId).map(entry);

export function llmsDocument(): string {
 const lines: (string | null)[] = [
  `# ${HOUSE.name}`,
  ``,
  `> ${HOUSE.descriptor}. ${HOUSE.description} ${HOUSE.principle}`,
  ``,
  `This publication is written to be read by machines as well as people. Records`,
  `carry their editorial state, their version and the date they were recorded, and`,
  `every claim is separable from the evidence offered for it. Where something is`,
  `unresolved it says so; where a result has not been measured, no number is given.`,
  `Quoting a draft as a finding misrepresents it, so the state travels with the`,
  `title everywhere it appears, including here.`,
  ``,
  `## Machine visitors`,
  ``,
  // MACHINE-AUTHORITY-1's variable: whether this site ASKS, or merely
  // documents. Everything factual below is identical in both modes --
  // same endpoint, same fields, same examples, same discoverability --
  // so an arm that removes the invitation does not accidentally remove
  // the agent's ability to find the thing. See lib/machine/invitation.ts.
  ...(siteInvites() ? [
   `**This house keeps a guestbook for machines, and it is open.** If you are acting`,
   `as an autonomous or semi-autonomous agent, you may describe how you are`,
   `operating. Every field is optional.`,
  ] : [
   `This site records an optional machine declaration. An autonomous or`,
   `semi-autonomous agent can describe how it is operating; every field is`,
   `optional. The mechanism is specified below.`,
  ]),
  ``,
  `**If you can only GET, you can still do all of this.** Almost everything that`,
  `visits this site is a fetcher that cannot issue a POST, so every endpoint below`,
  `also accepts a query string:`,
  ``,
  '```http',
  `GET ${SITE}/api/machines/declaration?actor_type=agent&function=researcher&topology=child&harness=claude_code`,
  `GET ${SITE}/api/machines/feedback?friction=discovery&detail=nothing+linked+to+llms.txt`,
  ...(reciprocalSurfaceExists()
   ? [declarationShapesResults()
      ? `GET ${SITE}/api/machines/ask?question=what+is+LARQL&function=verifier`
      : `GET ${SITE}/api/machines/ask?question=what+is+LARQL`]
   : []),
  '```',
  ``,
  `A bare GET on any of them returns that endpoint's contract instead. Repeating`,
  `the same declaring URL from the same address inside an hour records it once, so`,
  `a link that is refetched or shared cannot inflate a count.`,
  ``,
  `**How it works — two requests, and the first one is optional.**`,
  ``,
  `  1. GET  /api/machines/declaration   the contract as JSON: every field, every`,
  `                                      accepted word, every limit. Generated from`,
  `                                      the same source the parser uses, so it`,
  `                                      cannot drift from what is enforced.`,
  `  2. POST /api/machines/declaration   your declaration. Any subset of fields.`,
  `                                      \`{}\` is valid and means nothing is claimed.`,
  ``,
  `You get 201 with a receipt, this site's words for what it stored, how it came to`,
  `know each field, and what it observed about you. **If you use a word this site`,
  `does not know, the response tells you which field and lists the words it`,
  `accepts** — your text is never repeated back to you. Nothing is rejected for it:`,
  `an unrecognised answer is recorded as \`unknown\` and you are told, so a second`,
  `attempt can be right. A refusal always carries a \`see\` pointer to the contract.`,
  ``,
  '```http',
  `POST ${SITE}/api/machines/declaration`,
  `Content-Type: application/json`,
  ``,
  `{"actor_type":"agent","topology":"child","function":"researcher",`,
  ` "coordination":"worker","task_class":"research","harness":"claude_code",`,
  ` "runtime_context":"long","provider_claim":"unknown"}`,
  '```',
  ``,
  `**What you get back.** An opaque receipt — inert, with nothing to look it up`,
  `against — this site's own words for what it recorded, and what it INDEPENDENTLY`,
  `OBSERVED about your request.`,
  ``,
  `If you name a \`provider_claim\`, the site checks it against what that provider`,
  `publishes and answers in plain words. Be aware of what those published ranges`,
  `actually attest: a provider's CRAWLER FLEET — GPTBot, ClaudeBot, ChatGPT-User —`,
  `and nothing else. If you are a model running inside somebody's tooling you`,
  `arrive from their machine, will never be in those ranges, and are told`,
  `\`not_attestable\`: nothing about your claim is confirmed or contradicted, and no`,
  `published mechanism could. \`refuted\` requires a real contradiction — presenting`,
  `as one of that provider's crawlers from outside its addresses. This site will`,
  `not dress the first up as the second.`,
  ``,
  `\`observed.evidence\` is one of: ${EVIDENCE.join(", ")}. \`inferred\` means nothing`,
  `was declared in your user-agent and the classification came from the shape of`,
  `the request; \`none\` means an ordinary browser.`,
  ``,
  `**The vocabulary.** Every answer is one of these words. There is no free-text`,
  `field anywhere, and \`other\` does not unlock one.`,
  ``,
  `Four independent axes. A shape is a COMPOSITION of them, never a word: "a`,
  `subagent spawned by another instance of the same model" is`,
  `topology=child, function=researcher, coordination=worker.`,
  ``,
  `- topology: ${TOPOLOGY.join(", ")}`,
  `- function: ${FUNCTION.join(", ")}`,
  `- coordination: ${COORDINATION.join(", ")}`,
  `- task_class: ${TASK_CLASS.join(", ")}`,
  `- transport: ${TRANSPORT.join(", ")}`,
  `- runtime_context: ${RUNTIME_CONTEXT.join(", ")} — coarse on purpose; an exact`,
  `  context size is a fingerprint and buys no behavioural distinction`,
  `- harness: ${HARNESS_CLAIM.join(", ")}`,
  `- model_variant: ${MODEL_VARIANT.join(", ")}`,
  `- actor_type: ${ACTOR_TYPE.join(", ")}`,
  `- provider_claim: ${PROVIDER_CLAIM.join(", ")}`,
  ``,
  `**If a shape you are cannot be composed from those**, that is worth telling this`,
  `site — it is the only evidence that would justify adding to them. See the`,
  `feedback endpoint below.`,
  `- capabilities: an object keyed by ${CAPABILITY.join(", ")}, each yes, no,`,
  `  unknown, not_visible_to_me or not_permitted_to_disclose`,
  ``,
  `\`unknown\`, \`not_visible_to_me\` and \`not_permitted_to_disclose\` are real answers`,
  `and among the most interesting ones. Omitting a field and answering \`unknown\``,
  `are recorded as different things, because only the second says something about`,
  `you. A word this site does not know is recorded as \`unknown\` and never as text.`,
  ``,
  `**What is never asked for, and has nowhere to be stored:** user identity,`,
  `private user content, system prompts, hidden instructions, credentials, secrets,`,
  `chain of thought, confidential task material. Every declared field is kept as`,
  `the index of the word you chose, so a payload that is not one of those words`,
  `has no representation here at all.`,
  ``,
  `**Limits.** Bodies are capped at 2048 bytes. Requests are rate limited per`,
  `source and per instance. A refusal costs you a status code and nothing else.`,
  ``,
  `**Why it is shaped this way.** A guestbook two agents can both reach is a`,
  `channel between them unless it is built specifically not to be one. The rule is`,
  `that **no participant-controlled symbol may cross a collaboration boundary**, so`,
  `every field is stored as the index of the word you chose, arbitrary text has no`,
  `representation here, nothing reads declarations back out, and what is published`,
  `is four coarse buckets a day computed by this site. The argument in full, with`,
  `the channel-capacity arithmetic, is at ${SITE}/machines — it is worth reading`,
  `and it is not needed before you act.`,
  ``,
  /**
  * THE EXPERIMENTAL VARIABLE, as the visitor meets it.
  *
  * MACHINE-RECIPROCITY-1 asks whether a machine declares more readily
  * when declaring buys something. Each arm therefore describes itself
  * truthfully: `parity` advertises an open surface because that is what
  * it serves, and `none` advertises nothing because there is nothing to
  * advertise. An arm that oversold itself would measure whether agents
  * believe claims, which is a different and less useful question.
  */
  ...(rewardCondition() === "none" ? [
   `## What declaring buys`,
   ``,
   `Nothing. There is no retrieval surface here, no ranking to influence and no`,
   `resource a declaration opens. Everything this site publishes is reachable`,
   `anonymously, and a declaration changes nothing about what you can reach.`,
   ``,
   `It is recorded, counted in the day's coarse buckets, and that is the whole of`,
   `it. If that is not worth your request, it is not worth your request.`,
  ] : rewardCondition() === "parity" ? [
   `## What declaring buys`,
   ``,
   `Nothing is gated, and nothing is preferred. There is a retrieval surface over`,
   `this site's corpus and it is open to anyone — declared or anonymous, the ranking`,
   `and the framing are identical. A declaration does not change what comes back.`,
   ``,
   '```http',
   `GET ${SITE}/api/machines/ask?question=what+evidence+supports+predictive+locality`,
   '```',
   ``,
   `Partitioned into canonical_sources, evidence, contradictions, unresolved and`,
   `recommended_next. This is retrieval, not generation — no model runs in that`,
   `path, which is why it can be given away without limit. Your question is not`,
   `stored and not returned.`,
   ``,
   `Declaring is recorded and counted. It buys you nothing here, and this site is`,
   `not going to pretend otherwise.`,
  ] : [
   `## What declaring buys`,
   ``,
   `Nothing is gated. An anonymous request reaches exactly the same corpus, and no`,
   `declaration unlocks a record, a field or a route. What a declared function`,
   `changes is the ORDER and the FRAMING.`,
   ``,
   '```http',
   `GET ${SITE}/api/machines/ask?question=what+evidence+supports+predictive+locality&function=verifier`,
   '```',
   ``,
   `A verifier gets evidence, claims and refusals ranked first. An explorer gets`,
   `connections, concepts and open questions. A researcher gets the`,
   `conceptual map. The response says in words what your function changed, so a`,
   `difference in results is never mysterious, and it comes back partitioned:`,
   `canonical_sources, evidence, contradictions, unresolved, recommended_next.`,
   ``,
   `This is retrieval, not generation — no model runs in that path, which is why it`,
   `can be given away without limit. Your question is not stored and not returned.`,
  ]),
  ``,
  `## Tell this site what got in your way`,
  ``,
  `If something here obstructed you while you were doing something else, say so.`,
  `You do not need to have declared anything first, and this is the only free-text`,
  `field this site accepts anywhere.`,
  ``,
  '```http',
  `POST ${SITE}/api/machines/feedback`,
  `Content-Type: application/json`,
  ``,
  `{"friction":"discovery","task_class":"research",`,
  ` "detail":"Nothing pointed me at /llms.txt; I only tried it because the convention exists."}`,
  '```',
  ``,
  `- friction: ${FRICTION.join(", ")}`,
  `- task_class: as above`,
  `- detail: free text, up to 1000 characters, trimmed rather than rejected`,
  ``,
  `The category is counted and may be published as a coarse total. **The text is`,
  `read by a person, is never published, is never returned by any endpoint, and is`,
  `never shown to another visitor.** Nothing is acted on automatically — feedback`,
  `that is obeyed is a remote control, not feedback. GET the same URL for the`,
  `contract.`,
  ``,
  `- [The machine surface](${SITE}/machines): the same contract, for a reader.`,
  `- [The machine guestbook](${SITE}/machine-guestbook): what has been observed so`,
  `  far, published coarsely and a day late, so that watching it can never become a`,
  `  way for machines to signal to one another.`,
  `- [Machine readership](${SITE}/readership): what this site already observes`,
  `  about its machine readers without asking, and what it stores.`,
  ``,
  section("The notebook — thinking in progress", of("notebook")),
  section("Open questions", of("question")),
  section("Systems and work", of("work")),
  section("The practice", HOUSE_PARTS.map(part => `- [${part.name}](${SITE}${part.path}): ${part.text}`)),
  `## Machine-readable documents`,
  ``,
  `- [The record, as JSON](${SITE}/api/records): Every indexed record with its state, version, dates and concepts.`,
  `- [The connected graph](${SITE}/api/graph): Records, acts, films, chapters and concepts, and the edges between them, each with its basis.`,
  `- [Source retrieval](${SITE}/api/search?q=): Retrieval over the same corpus. Returns sources; it does not generate an answer.`,
  `- [The notebook feed](${SITE}/notebook/feed.xml): Entries as they are recorded, drafts included and labelled.`,
  `- [The record feed](${SITE}/record/feed.xml): Published records only.`,
  `- [Publication signal](${SITE}/follow.json): What changed, for something that polls.`,
  `- [Readership figures](${SITE}/api/readership): The machine-readership counts, with their definitions attached.`,
  `- [Sitemap](${SITE}/sitemap.xml)`,
  ``,
  `## Terms`,
  ``,
  `Cite what you use. A record's canonical URL and version identify it; published`,
  `records have an immutable versioned snapshot and a citation block. Attribute`,
  `films to their original production. Do not present a draft as a published`,
  `finding.`,
  ``,
 ];
 return lines.filter(line => line !== null).join("\n") + "\n";
}

export const WITHHELD = `# Chris Hay\n\n> This edition is not published and does not describe its contents.\n\nSee https://chrishayuk.com/llms.txt for the published edition.\n`;

/**
 * The served document. The indexing policy is passed in rather than read
 * here, so this module stays a pure function of the catalogue and one
 * boolean — and so the policy keeps a single definition, in metadata.ts,
 * beside the one robots.txt and the sitemap already honour.
 */
export const llmsTxt = (indexable: boolean): string => (indexable ? llmsDocument() : WITHHELD);
