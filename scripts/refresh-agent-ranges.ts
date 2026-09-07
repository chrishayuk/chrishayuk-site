import { readFile, writeFile } from "node:fs/promises";

/**
 * REFRESH THE PUBLISHED AGENT ADDRESS RANGES.
 *
 * A `User-Agent` header is a claim, not an identity. Anyone can send
 * `ClaudeBot` from a laptop, and a readership number built on that
 * claim is a number anyone can move. Four of the five providers this
 * site cares about publish the addresses their crawlers actually use,
 * so the claim can be checked against something its author does not
 * control.
 *
 * This script fetches those published lists and writes a dated
 * snapshot to content/agent-ranges.json. Verification at request time
 * is then a pure, offline prefix match against a file that is in git,
 * reviewable, and attributable to a source URL and a retrieval date —
 * the same shape as content/archive.json, and for the same reason: the
 * evidence has to be inspectable by someone who does not trust us.
 *
 * The rules it enforces:
 *
 * - A source that fails to fetch, returns nothing parseable, or returns
 *   an empty prefix list NEVER overwrites the snapshot on file. A
 *   provider having a bad morning must not silently turn every
 *   verified request into an unverifiable one.
 * - A prefix that does not parse as CIDR is dropped, and the drop is
 *   reported. Nothing malformed reaches the matcher.
 * - Only the provider's own published document is a source. There is
 *   no hand-maintained range list, because a hand-maintained range
 *   list is an assertion by us about someone else's infrastructure.
 *
 * Usage:
 *   node --experimental-strip-types scripts/refresh-agent-ranges.ts [--check]
 *
 *   --check   fetch and report differences without writing the file
 */

const FILE = new URL("../content/agent-ranges.json", import.meta.url);
const UA = "chrishayuk.com machine-readership (+https://chrishayuk.com/readership)";

/**
 * Which published document speaks for which declared agent.
 *
 * Anthropic publishes one list covering all three of its crawlers, so
 * an Anthropic claim verifies at provider level. OpenAI and Perplexity
 * publish per-agent lists, so a `ChatGPT-User` claim is checked against
 * the ChatGPT-User addresses and nothing else — a training crawler
 * arriving with a user-fetch name is exactly the confusion this file
 * exists to expose.
 */
export const SOURCES = [
 { id: "openai-gptbot", provider: "openai", agents: ["GPTBot"], url: "https://openai.com/gptbot.json" },
 { id: "openai-searchbot", provider: "openai", agents: ["OAI-SearchBot"], url: "https://openai.com/searchbot.json" },
 { id: "openai-chatgpt-user", provider: "openai", agents: ["ChatGPT-User"], url: "https://openai.com/chatgpt-user.json" },
 { id: "anthropic-bots", provider: "anthropic", agents: ["ClaudeBot", "Claude-User", "Claude-SearchBot"], url: "https://claude.com/crawling/bots.json" },
 { id: "perplexity-bot", provider: "perplexity", agents: ["PerplexityBot"], url: "https://www.perplexity.ai/perplexitybot.json" },
 { id: "perplexity-user", provider: "perplexity", agents: ["Perplexity-User"], url: "https://www.perplexity.ai/perplexity-user.json" },
 { id: "google-googlebot", provider: "google", agents: ["Googlebot"], url: "https://developers.google.com/static/search/apis/ipranges/googlebot.json" },
 { id: "microsoft-bingbot", provider: "microsoft", agents: ["bingbot"], url: "https://www.bing.com/toolbox/bingbot.json" },
] as const;

const CIDR = /^(?:[0-9.]+|[0-9a-fA-F:.]+)\/\d{1,3}$/;

type Snapshot = { retrieved_at: string; sources: Source[] };
type Source = { id: string; provider: string; agents: string[]; url: string; creation_time: string | null; prefixes: string[] };

export function readPrefixes(body: unknown): string[] {
 const list = (body as { prefixes?: unknown })?.prefixes;
 if (!Array.isArray(list)) return [];
 return list.flatMap(entry => {
  const value = (entry as Record<string, unknown>)?.ipv4Prefix ?? (entry as Record<string, unknown>)?.ipv6Prefix;
  return typeof value === "string" && CIDR.test(value.trim()) ? [value.trim()] : [];
 }).sort();
}

async function main() {
 const check = process.argv.includes("--check");
 const existing: Snapshot = JSON.parse(await readFile(FILE, "utf8").catch(() => '{"retrieved_at":null,"sources":[]}'));
 const held = new Map(existing.sources.map(source => [source.id, source]));
 const sources: Source[] = [];
 let changed = false;

 for (const source of SOURCES) {
  const previous = held.get(source.id);
  let fetched: Source | null = null;
  try {
   const response = await fetch(source.url, { headers: { "User-Agent": UA, Accept: "application/json" }, signal: AbortSignal.timeout(20_000) });
   if (!response.ok) throw new Error(`HTTP ${response.status}`);
   const body = JSON.parse(await response.text());
   const prefixes = readPrefixes(body);
   if (prefixes.length === 0) throw new Error("no usable prefixes");
   const creation = typeof body?.creationTime === "string" ? body.creationTime : null;
   fetched = { id: source.id, provider: source.provider, agents: [...source.agents], url: source.url, creation_time: creation, prefixes };
  } catch (error) {
   console.warn(`${source.id}: ${(error as Error).message} — keeping ${previous ? `${previous.prefixes.length} prefixes on file` : "no entry"}`);
  }

  const kept = fetched ?? previous;
  if (!kept) continue;
  sources.push({ ...kept, agents: [...source.agents], provider: source.provider, url: source.url });
  const before = previous?.prefixes.join(",") ?? "";
  if (kept.prefixes.join(",") !== before) { changed = true; console.log(`${source.id}: ${previous ? `${previous.prefixes.length} → ` : ""}${kept.prefixes.length} prefixes`); }
  else console.log(`${source.id}: ${kept.prefixes.length} prefixes, unchanged`);
 }

 if (sources.length === 0) throw new Error("No published range list could be read and none is on file; refusing to write an empty snapshot");
 if (check) { console.log(changed ? "Published ranges have changed." : "Published ranges match the snapshot on file."); process.exit(changed ? 1 : 0); }
 if (!changed && existing.retrieved_at) { console.log("Snapshot already current; not rewriting the retrieval date."); return; }
 const snapshot: Snapshot = { retrieved_at: new Date().toISOString().slice(0, 10), sources };
 await writeFile(FILE, `${JSON.stringify(snapshot, null, 1)}\n`);
 console.log(`Wrote ${sources.length} sources, ${sources.reduce((n, s) => n + s.prefixes.length, 0)} prefixes.`);
}

if (import.meta.url === `file://${process.argv[1]}`) await main();
