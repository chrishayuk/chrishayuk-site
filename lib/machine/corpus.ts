import { recordGraph } from "../graph.ts";

/**
 * THE BOUNDARY AGENT-SUPPLIED IDENTIFIERS DO NOT CROSS.
 *
 * An agent may refer to something on this site. It may not invent
 * something on this site.
 *
 * `ordinal` is a lookup into an index built from the site's own graph.
 * It returns a number or null, and there is deliberately NO exported
 * function that adds to the index, so the request path — which can
 * reach this module only through `ordinal` — has no reachable write.
 * An unrecognised identifier is therefore a refusal that leaves no
 * trace, and a recognised one becomes an integer while the submitted
 * string is discarded at the door.
 *
 * This is the rule that keeps a site-owned identifier from becoming a
 * smuggling format. `claim_id: "base64:…"` does not fail a filter that
 * somebody has to remember to write; it fails to be a member of a set
 * this site built out of its own records.
 *
 * The alphabet is still an alphabet. Choosing WHICH of 775 published
 * resources to refer to is itself worth log2(775) bits per reference,
 * which is why no cross-participant surface ever returns identifiers —
 * only the coarse quantities in projection.ts.
 */

let ids: string[] = [];
let index: Map<string, number> | null = null;
let version = 0;

/** FNV-1a, 32 bits. Deterministic, dependency-free, and only ever an identity. */
function hash(value: string): number {
 let h = 0x811c9dc5;
 for (let i = 0; i < value.length; i++) {
  h ^= value.charCodeAt(i);
  h = Math.imul(h, 0x01000193) >>> 0;
 }
 return h;
}

function build(): void {
 if (index) return;
 ids = recordGraph().nodes.filter(node => node.retrievable).map(node => node.id).sort();
 index = new Map(ids.map((id, ordinal) => [id, ordinal]));
 version = hash(ids.join("\n"));
}

/**
 * The longest identifier this site publishes is well under this. The
 * bound exists so that an enormous string is rejected before it is
 * hashed into a Map lookup, not because a long string could ever match.
 */
const MAX_ID = 128;

/**
 * An identifier this site published, as its ordinal. Null for anything
 * else. Never an insert, never a partial match, never a normalisation:
 * an identifier either is one of ours, exactly, or it is not.
 */
export function ordinal(id: unknown): number | null {
 if (typeof id !== "string" || id.length === 0 || id.length > MAX_ID) return null;
 build();
 return index!.get(id) ?? null;
}

/**
 * The reverse, for the site's own rendering and the private
 * Observatory. Takes an ordinal and the corpus version it was recorded
 * under, and returns nothing when the corpus has changed since.
 *
 * Ordinals shift when records are added, so an event recorded against
 * an older corpus cannot be resolved against this one. Being unable to
 * name a record is a smaller failure than naming the wrong one, and a
 * publication that prints provenance has no business guessing.
 */
export function identifier(recordedOrdinal: number, recordedVersion: number): string | null {
 build();
 if (recordedVersion !== version) return null;
 return ids[recordedOrdinal] ?? null;
}

/** The identity of the corpus these ordinals belong to. Stored beside every event. */
export function corpusVersion(): number {
 build();
 return version;
}

export function corpusSize(): number {
 build();
 return ids.length;
}

/** What one reference to a published resource is worth, as a channel. */
export const corpusBits = (): number => Math.log2(corpusSize());

/** Tests only: forget the built index so a rebuild can be observed. */
export function resetForTests(): void {
 index = null;
 ids = [];
 version = 0;
}
