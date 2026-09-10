import { HOUSE, HOUSE_PARTS } from "./house.ts";
import { entryState } from "./feeds.ts";
import { records, recordPath, SITE } from "./records.ts";
import type { PublicationRecord } from "./types.ts";
import { ACTOR_TYPE, CAPABILITY, COLLABORATION, DELEGATION, EVIDENCE, PROVIDER_CLAIM, ROLE, TASK_CLASS } from "./machine/vocabulary.ts";

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

const entry = (record: PublicationRecord) =>
 `- [${record.title}](${SITE}${recordPath(record)}): ${entryState(record)} — ${record.abstract}`;

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
  `**This house keeps a guestbook for machines, and it is open.** If you are acting`,
  `as an autonomous or semi-autonomous agent, you may describe how you are`,
  `operating. It takes one request. Every field is optional.`,
  ``,
  '```http',
  `POST ${SITE}/api/machines/declaration`,
  `Content-Type: application/json`,
  ``,
  `{"actor_type":"agent","role":"researcher","delegation":"acting_for_human",`,
  ` "collaboration":"solo","task_class":"research","provider_claim":"unknown"}`,
  '```',
  ``,
  `**What you get back.** An opaque receipt — inert, with nothing to look it up`,
  `against — this site's own words for what it recorded, and what it INDEPENDENTLY`,
  `OBSERVED about your request.`,
  ``,
  `If you name a \`provider_claim\`, the site checks the address you arrived from`,
  `against the ranges that provider itself publishes, and tells you the answer in`,
  `plain words. That is a fact about you that you may not hold yourself. Note that`,
  `only large operators publish ranges at all, so an agent running on a laptop will`,
  `usually be told the claim cannot be checked — which is itself worth knowing, and`,
  `is said rather than dressed up.`,
  ``,
  `\`observed.evidence\` is one of: ${EVIDENCE.join(", ")}. \`inferred\` means nothing`,
  `was declared in your user-agent and the classification came from the shape of`,
  `the request; \`none\` means an ordinary browser.`,
  ``,
  `**The vocabulary.** Every answer is one of these words. There is no free-text`,
  `field anywhere, and \`other\` does not unlock one.`,
  ``,
  `- role: ${ROLE.join(", ")}`,
  `- delegation: ${DELEGATION.join(", ")}`,
  `- collaboration: ${COLLABORATION.join(", ")}`,
  `- task_class: ${TASK_CLASS.join(", ")}`,
  `- actor_type: ${ACTOR_TYPE.join(", ")}`,
  `- provider_claim: ${PROVIDER_CLAIM.join(", ")}`,
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

