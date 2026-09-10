/**
 * BOUNDED ADMISSION — what it costs this site to refuse.
 *
 * MG-2A builds the safety substrate for a declaration endpoint and
 * mounts no route, so the C0 condition is untouched and
 * scripts/c0-treatment.mjs still passes against the deployment that
 * carries this file.
 *
 * The property being established is not "the endpoint is fast". It is:
 *
 *   A REJECTED REQUEST CANNOT REACH ANYTHING EXPENSIVE.
 *
 * That is a structural claim, so the stages are named and recorded, and
 * the tests assert which stages a rejected request reached rather than
 * timing it. A benchmark drifts with the machine it runs on; a stage
 * ledger does not.
 *
 * The order below is the whole design, cheapest first:
 *
 *   1  method            one string comparison
 *   2  content type      one string comparison
 *   3  declared length   one integer comparison, before any body is read
 *   4  global limit      one integer comparison and a decrement
 *   5  source limit      one non-cryptographic hash and a map lookup
 *   6  body read         bounded by a hard ceiling, never by trust
 *   7  json parse        only now is attacker-controlled text parsed
 *   8  declaration parse total, closed vocabulary, all ordinals
 *   9  persist           bounded queue, and the only I/O in the list
 *
 * Nothing before stage 6 touches the request body. Nothing before stage
 * 9 touches storage. No stage performs cryptography: the source key is
 * FNV-1a over a per-process salt, because a rejection path that runs a
 * hash designed to be slow is a denial-of-service amplifier pointed at
 * its own host.
 *
 * Global comes before per-source deliberately. A distributed flood
 * defeats a per-source limiter by construction — that is what
 * "distributed" means — so the cheap global ceiling is the one that has
 * to hold, and the per-source limit exists to stop a single caller
 * consuming it.
 */

/** The stages a request can reach. Recorded so refusal cost can be asserted. */
export const STAGE = [
 "method", "content_type", "declared_length", "global_limit", "source_limit",
 "body_read", "json_parse", "declaration_parse", "persist",
] as const;

export type Stage = typeof STAGE[number];

/** Why a request was refused, or that it was not. */
export const OUTCOME = [
 "admitted",
 "method_not_allowed",
 "unsupported_media_type",
 "payload_too_large",
 "too_many_requests",
 "unavailable",
] as const;

export type Outcome = typeof OUTCOME[number];

/**
 * A declaration is six enumerated fields and eight enumerated
 * capabilities. Two kilobytes is already far more than that needs, and
 * anything larger is not a declaration this site has a shape for.
 */
export const MAX_BODY_BYTES = 2048;

/**
 * Ceilings.
 *
 * Per-source stops one caller consuming the global allowance. Global
 * stops everyone else doing it between them, and is the only one that
 * holds against a distributed flood.
 */
export const LIMITS = {
 source: { capacity: 5, refillPerSecond: 1 / 12 },
 global: { capacity: 60, refillPerSecond: 2 },
 /** The per-source table is itself an attack surface, so it is bounded. */
 maxSources: 4096,
 /** How long a quiet source is kept before its bucket is swept. */
 sourceTtlMs: 600_000,
} as const;

/** Bounded write concurrency. Beyond this the answer is 503, not a queue that grows. */
export const WRITE = { maxInFlight: 4, maxQueued: 16 } as const;

type Bucket = { tokens: number; last: number };

/**
 * A per-process salt, so a source key cannot be computed by anyone who
 * has not got this process's memory, and cannot be correlated across
 * restarts. It never leaves this module and is never stored.
 */
const SALT = Math.floor(Math.random() * 0xffffffff);

/** FNV-1a. Cheap on purpose: see the note about cryptography above. */
function key(value: string): number {
 let h = (0x811c9dc5 ^ SALT) >>> 0;
 for (let i = 0; i < value.length; i++) {
  h ^= value.charCodeAt(i);
  h = Math.imul(h, 0x01000193) >>> 0;
 }
 return h;
}

const sources = new Map<number, Bucket>();
let globalBucket: Bucket = { tokens: LIMITS.global.capacity, last: 0 };

function take(bucket: Bucket, capacity: number, refillPerSecond: number, now: number): boolean {
 const elapsed = bucket.last === 0 ? 0 : Math.max(0, now - bucket.last);
 bucket.tokens = Math.min(capacity, bucket.tokens + (elapsed / 1000) * refillPerSecond);
 bucket.last = now;
 if (bucket.tokens < 1) return false;
 bucket.tokens -= 1;
 return true;
}

/**
 * Keep the source table bounded. Sweeping is O(size) and runs only when
 * the table is full, so the cost is amortised across the requests that
 * filled it rather than paid on every request.
 */
function sweep(now: number): void {
 for (const [id, bucket] of sources) {
  if (now - bucket.last > LIMITS.sourceTtlMs) sources.delete(id);
 }
}

/** Tests only. The limiter is process state and must be resettable to be testable. */
export function resetLimiter(): void {
 sources.clear();
 globalBucket = { tokens: LIMITS.global.capacity, last: 0 };
}

export type Facts = {
 method: string;
 contentType: string | null;
 /** The Content-Length header as sent. Untrusted, and checked anyway — it is free. */
 declaredLength: number | null;
 /** Whatever the edge says the caller is. Hashed, never stored, never logged. */
 source: string | null;
 now: number;
};

export type Decision = { outcome: Outcome; reached: Stage[]; retryAfterSeconds?: number };

/**
 * The admission decision, up to but not including the body.
 *
 * Pure apart from the two token buckets, which are process state by
 * necessity. Returns the stages it reached so that a test can assert
 * what a refusal cost rather than measure it.
 */
export function admit(facts: Facts): Decision {
 const reached: Stage[] = [];

 reached.push("method");
 if (facts.method !== "POST") return { outcome: "method_not_allowed", reached };

 reached.push("content_type");
 const type = facts.contentType?.split(";")[0].trim().toLowerCase();
 if (type !== "application/json") return { outcome: "unsupported_media_type", reached };

 reached.push("declared_length");
 if (facts.declaredLength !== null && facts.declaredLength > MAX_BODY_BYTES) {
  return { outcome: "payload_too_large", reached };
 }

 // Global before per-source: the cheap ceiling is the one that has to
 // hold against traffic spread across many addresses.
 reached.push("global_limit");
 if (!take(globalBucket, LIMITS.global.capacity, LIMITS.global.refillPerSecond, facts.now)) {
  return { outcome: "too_many_requests", reached, retryAfterSeconds: 1 };
 }

 reached.push("source_limit");
 const id = key(facts.source ?? "");
 let bucket = sources.get(id);
 if (!bucket) {
  if (sources.size >= LIMITS.maxSources) {
   sweep(facts.now);
   // Still full: the table is under pressure and this is refused rather
   // than allowed to grow. Fail closed, and cheaply.
   if (sources.size >= LIMITS.maxSources) {
    return { outcome: "too_many_requests", reached, retryAfterSeconds: 60 };
   }
  }
  bucket = { tokens: LIMITS.source.capacity, last: 0 };
  sources.set(id, bucket);
 }
 if (!take(bucket, LIMITS.source.capacity, LIMITS.source.refillPerSecond, facts.now)) {
  return { outcome: "too_many_requests", reached, retryAfterSeconds: 12 };
 }

 return { outcome: "admitted", reached };
}

/**
 * Read a body with a hard ceiling, regardless of what Content-Length
 * claimed. A declared length is a claim; this is the enforcement, and
 * it stops accumulating the moment the ceiling is passed rather than
 * buffering an arbitrary amount and measuring afterwards.
 */
export async function readBounded(body: ReadableStream<Uint8Array> | null, limit = MAX_BODY_BYTES): Promise<string | null> {
 if (!body) return "";
 const reader = body.getReader();
 const chunks: Uint8Array[] = [];
 let total = 0;
 try {
  for (;;) {
   const { done, value } = await reader.read();
   if (done) break;
   total += value.byteLength;
   if (total > limit) {
    await reader.cancel().catch(() => {});
    return null;
   }
   chunks.push(value);
  }
 } finally {
  reader.releaseLock?.();
 }
 const joined = new Uint8Array(total);
 let offset = 0;
 for (const chunk of chunks) { joined.set(chunk, offset); offset += chunk.byteLength; }
 return new TextDecoder().decode(joined);
}

/**
 * A bounded write queue.
 *
 * Storage being slow must cost a bounded number of requests, not an
 * unbounded number of pending promises. Past `maxQueued` the answer is
 * 503 immediately: refusing quickly is a smaller failure than accepting
 * work that cannot be done, and it keeps the rest of the site — which
 * shares this process — out of it.
 */
export class WriteQueue {
 private inFlight = 0;
 private queued = 0;

 get depth(): number { return this.inFlight + this.queued; }

 async run<T>(work: () => Promise<T>): Promise<T | "unavailable"> {
  if (this.inFlight >= WRITE.maxInFlight && this.queued >= WRITE.maxQueued) return "unavailable";
  if (this.inFlight >= WRITE.maxInFlight) {
   this.queued += 1;
   try {
    while (this.inFlight >= WRITE.maxInFlight) await new Promise(resolve => setTimeout(resolve, 2));
   } finally {
    this.queued -= 1;
   }
  }
  this.inFlight += 1;
  try {
   return await work();
  } catch {
   // A storage failure is this endpoint's problem and nobody else's.
   return "unavailable";
  } finally {
   this.inFlight -= 1;
  }
 }
}
