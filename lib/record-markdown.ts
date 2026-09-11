import { entryState } from "./feeds.ts";
import { recordPath, SITE } from "./records.ts";
import type { PublicationRecord } from "./types.ts";

/**
 * A RECORD, AS MARKDOWN, FOR SOMETHING THAT READS RATHER THAN RENDERS.
 *
 * Thirty days of this site's own logs say the machine index is barely
 * read: 48 fetches of /llms.txt, one of them from a provider crawler.
 * Over the same window the fleets that ARE here — GPTBot, ChatGPT-User,
 * ClaudeBot, Amazonbot — fetched pages and never the index. The
 * published evidence on agent behaviour agrees and is blunter: the
 * route agents actually exercise is `Accept: text/markdown` and a `.md`
 * URL, not a conventional file at a well-known path.
 *
 * So this exists because the surface agents use was the one surface
 * this site did not serve. It had a machine index nothing read, and no
 * Markdown at all.
 *
 * THE DISCIPLINE IS THE SAME ONE THE HTML KEEPS. Editorial state
 * travels with the title, in the same line, because an agent lifting a
 * sentence into an answer must not be able to lose the fact that it
 * came from a draft. A claim carries its status. A refusal carries its
 * principle. Nothing here is summarised, softened, or reordered into
 * something more quotable than the record is.
 */

const state = (record: PublicationRecord) => entryState(record);

function block(b: PublicationRecord["body"][number]): string[] {
 switch (b.kind) {
  case "statement":
   return [`> ${b.text}`];
  case "observation":
   return [
    ...(b.label ? [`### ${b.label}`] : []),
    b.text,
    ...(b.references?.length ? b.references.map(r => `- [${r.label}](${r.url})`) : []),
   ];
  case "connection":
   return [b.text, ...b.links.map(l => `- [${l.label}](${l.href})`)];
  case "summary":
   return [`### ${b.label}`, ...b.lines.map(l => `- ${l}`), ...(b.detail ? [b.detail] : [])];
  case "question":
   return [`### Question — ${b.status}`, b.text, ...(b.detail ? [b.detail] : [])];
  case "claim":
   return [`### Claim — ${b.status}`, b.text, ...(b.detail ? [b.detail] : [])];
  case "evidence":
   return ["### Evidence", ...b.items.map(i => `- **${i.label}** — ${i.status}: ${i.detail}`)];
  case "refusal":
   // A refusal is this site declining to claim something. It is the block
   // most likely to be quoted out of shape, so it keeps its principle.
   return [`### ${b.title}`, ...b.lines.map(l => `- ${l}`), `**Principle:** ${b.principle}`];
  case "comparison":
   return [
    `### ${b.objectLabel}`,
    `**${b.left.label}**`, ...b.left.properties.map(p => `- ${p}`),
    `**${b.right.label}**`, ...b.right.properties.map(p => `- ${p}`),
   ];
  default:
   return [];
 }
}

export function recordMarkdown(record: PublicationRecord): string {
 const url = `${SITE}${recordPath(record)}`;
 return [
  `# ${record.title}`,
  ``,
  // State first, on its own line, before anything quotable.
  `**${state(record)}**`,
  ...(record.dek ? [``, `*${record.dek}*`] : []),
  ``,
  `- Canonical: ${url}`,
  `- Record: \`${record.id}\` · version ${record.version} · ${record.publication}`,
  ...(record.status ? [`- Status: ${record.status}`] : []),
  ...(record.authors?.length ? [`- Authors: ${record.authors.join(", ")}`] : []),
  ...(record.lineage ? [`- Lineage: ${record.lineage}`] : []),
  ...(record.concepts?.length ? [`- Concepts: ${record.concepts.join(", ")}`] : []),
  ``,
  ...(record.abstract ? [`## Abstract`, ``, record.abstract, ``] : []),
  `## Body`,
  ``,
  ...record.body.flatMap(b => [...block(b), ``]),
  ...(record.sources?.length
   ? [`## Sources`, ``, ...record.sources.map(s =>
       `- ${s.url ? `[${s.title}](${s.url.startsWith("http") ? s.url : SITE + s.url})` : s.title}${s.note ? ` — ${s.note}` : ""}`), ``]
   : []),
  `---`,
  ``,
  `Machine index: ${SITE}/llms.txt`,
  `Machine interface: ${SITE}/machines`,
  ``,
 ].join("\n");
}
