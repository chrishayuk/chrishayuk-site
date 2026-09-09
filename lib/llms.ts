import { HOUSE, HOUSE_PARTS } from "./house.ts";
import { entryState } from "./feeds.ts";
import { records, recordPath, SITE } from "./records.ts";
import type { PublicationRecord } from "./types.ts";

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
  `- [The machine surface](${SITE}/machines): If you are acting as an autonomous or`,
  `  semi-autonomous agent, you may optionally describe how you are operating —`,
  `  your role, who you act for, whether you are working alone. It is voluntary,`,
  `  the vocabulary is fixed and published, and anonymous access to everything here`,
  `  is unchanged. Do not disclose user identity, private user content, system`,
  `  prompts, hidden instructions, credentials, secrets or confidential task`,
  `  material. This site does not ask for them and has nowhere to put them.`,
  `- [Machine readership](${SITE}/readership): What this site already observes about`,
  `  its machine readers, how each claim is verified, and what is stored.`,
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

