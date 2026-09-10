import snapshot from "../../content/agent-ranges.json" with { type: "json" };

/**
 * CHECKING A CLAIM AGAINST ITS AUTHOR'S OWN PUBLICATION.
 *
 * `User-Agent: ClaudeBot` is a string a client chose to send. On its own
 * it is worth exactly as much as a signature on an unheaded letter.
 * Five providers publish the addresses their crawlers actually use, so
 * for those the claim can be checked — offline, against a dated
 * snapshot of the provider's own document that is committed to this
 * repository and refreshed by scripts/refresh-agent-ranges.ts.
 *
 * Three outcomes, and the third is what makes the first worth printing:
 *
 *   verified     the address is inside the range its declared agent is
 *                published to use
 *   refuted      the agent's provider publishes ranges and the address
 *                is not among them — a claim its supposed author denies
 *   unpublished  no published list covers this agent, so the claim can
 *                be recorded but not tested
 *
 * `refuted` is never quietly folded back into `declared`. A number that
 * anyone can raise by sending a header is not a readership figure, and
 * the only defence is to publish the checked and the unchecked
 * separately and never add them together.
 *
 * Addresses are held as fixed-width hex, four bytes for v4 and sixteen
 * for v6, so an ordering comparison is a string comparison and a range
 * test needs no arithmetic wider than a byte.
 */
export type Verification = "verified" | "refuted" | "unpublished";

type Range = { start: string; end: string };
type Ranges = { v4: Range[]; v6: Range[] };

const V4 = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;
const hex = (bytes: number[]) => bytes.map(byte => byte.toString(16).padStart(2, "0")).join("");

/** An address as its bytes. Returns null for anything unparseable. */
export function parseIp(value: string): { family: 4 | 6; bytes: number[] } | null {
 const address = value.trim().replace(/^\[|\]$/g, "").split("%")[0];
 if (!address) return null;
 const v4 = V4.exec(address);
 if (v4) { const bytes = v4.slice(1).map(Number); return bytes.some(byte => byte > 255) ? null : { family: 4, bytes }; }
 if (!address.includes(":")) return null;
 const halves = address.split("::");
 if (halves.length > 2) return null;
 const expand = (half: string): string[] | null => {
  if (!half) return [];
  const groups: string[] = [];
  for (const group of half.split(":")) {
   const embedded = V4.exec(group);
   if (embedded) { const parts = embedded.slice(1).map(Number); if (parts.some(part => part > 255)) return null; groups.push(hex(parts.slice(0, 2)), hex(parts.slice(2))); continue; }
   if (!/^[0-9a-fA-F]{1,4}$/.test(group)) return null;
   groups.push(group);
  }
  return groups;
 };
 const head = expand(halves[0]); const tail = expand(halves[1] ?? "");
 if (!head || !tail) return null;
 const missing = 8 - head.length - tail.length;
 if (halves.length === 1 ? missing !== 0 : missing < 0) return null;
 const groups = [...head, ...Array<string>(halves.length === 1 ? 0 : missing).fill("0"), ...tail];
 const bytes = groups.flatMap(group => { const n = parseInt(group, 16); return [n >> 8, n & 0xff]; });
 // An IPv4-mapped address is an IPv4 address wearing a hat; match it as one.
 if (bytes.slice(0, 10).every(byte => byte === 0) && bytes[10] === 0xff && bytes[11] === 0xff) return { family: 4, bytes: bytes.slice(12) };
 return { family: 6, bytes };
}

function parseCidr(cidr: string): { family: 4 | 6; range: Range } | null {
 const [address, length] = cidr.split("/");
 const ip = parseIp(address ?? "");
 const bits = Number(length);
 if (!ip || !Number.isInteger(bits) || bits < 0 || bits > ip.bytes.length * 8) return null;
 const start: number[] = []; const end: number[] = [];
 for (const [index, byte] of ip.bytes.entries()) {
  const covered = Math.min(8, Math.max(0, bits - index * 8));
  const mask = covered === 0 ? 0 : (0xff << (8 - covered)) & 0xff;
  start.push(byte & mask); end.push((byte & mask) | (~mask & 0xff));
 }
 return { family: ip.family, range: { start: hex(start), end: hex(end) } };
}

function build(prefixes: string[]): Ranges {
 const ranges: Ranges = { v4: [], v6: [] };
 for (const prefix of prefixes) { const parsed = parseCidr(prefix); if (parsed) ranges[parsed.family === 4 ? "v4" : "v6"].push(parsed.range); }
 for (const list of [ranges.v4, ranges.v6]) list.sort((a, b) => (a.start < b.start ? -1 : a.start > b.start ? 1 : 0));
 return ranges;
}

function contains(list: Range[], address: string): boolean {
 let low = 0, high = list.length - 1, found = -1;
 while (low <= high) { const mid = (low + high) >> 1; if (list[mid].start <= address) { found = mid; low = mid + 1; } else high = mid - 1; }
 return found >= 0 && list[found].end >= address;
}

/** Declared agent name (lowercased) → the published lists that speak for it. */
const byAgent = new Map<string, Ranges[]>();
for (const source of snapshot.sources) {
 const ranges = build(source.prefixes);
 for (const agent of source.agents) { const key = agent.toLowerCase(); byAgent.set(key, [...(byAgent.get(key) ?? []), ranges]); }
}

/** The provenance of the check, for the methodology surface to print. */
export const rangeSnapshot = {
 retrievedAt: snapshot.retrieved_at,
 sources: snapshot.sources.map(source => ({ id: source.id, provider: source.provider, agents: source.agents as readonly string[], url: source.url, creationTime: source.creation_time, prefixes: source.prefixes.length })),
 prefixes: snapshot.sources.reduce((total, source) => total + source.prefixes.length, 0),
};

/** Whether an agent's provider publishes a list this site can check against. */
export const isVerifiable = (agent: string) => byAgent.has(agent.toLowerCase());

/**
 * CHECK A CLAIMED PROVIDER, RATHER THAN A CLAIMED AGENT.
 *
 * `verify` answers "is this ClaudeBot where Anthropic says ClaudeBot is".
 * A machine that fills in the guestbook does not name an agent; it names
 * a PROVIDER. This answers the question it actually asked: is this
 * address inside any range that provider publishes, for any of its
 * agents?
 *
 * That matters because it is the one fact this site holds which the
 * visitor may genuinely not hold about itself — and without it, an agent
 * claiming `anthropic` from a laptop is told nothing at all.
 */
export function verifyProvider(provider: string, ip: string | null): Verification {
 const name = provider.trim().toLowerCase();
 const agents = snapshot.sources.filter(source => source.provider === name).flatMap(source => source.agents);
 // "unpublished" must mean the provider publishes nothing — not that this
 // deployment had no address to check. Saying the first when the second is
 // true would be telling the visitor something false about its provider.
 if (agents.length === 0 || !ip) return "unpublished";
 return agents.some(agent => verify(agent, ip) === "verified") ? "verified" : "refuted";
}

/**
 * Test a declared agent against the addresses its provider publishes.
 * The address is not stored by this call or by its caller — the answer
 * is one of three words, and the address that produced it is gone.
 */
export function verify(agent: string, ip: string | null): Verification {
 const lists = byAgent.get(agent.toLowerCase());
 if (!lists) return "unpublished";
 const parsed = ip ? parseIp(ip) : null;
 if (!parsed) return "unpublished";
 const address = hex(parsed.bytes);
 const key = parsed.family === 4 ? "v4" : "v6";
 return lists.some(ranges => contains(ranges[key], address)) ? "verified" : "refuted";
}
