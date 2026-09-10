import assert from "node:assert/strict";
import test from "node:test";
import * as V from "../lib/machine/vocabulary.ts";
import { LIMITS, MAX_BODY_BYTES, UNTRUSTED_SOURCE, WRITE, WriteQueue, admit, readBounded, resetLimiter, sourceOf, type Stage } from "../lib/machine/admission.ts";
import { handleDeclaration, handleDeclaredValues, type StoredDeclaration } from "../lib/machine/handler.ts";

/**
 * MG-2A — A FUTURE DECLARATION ENDPOINT HAS BOUNDED RESOURCE COST AND
 * FAILS CLOSED UNDER OVERLOAD, WITHOUT EXPOSING THE TREATMENT.
 *
 * No route is mounted. These call the handler directly, which is the
 * point: the safety substrate is proved before MG-2B gives it a URL, so
 * the deployment carrying it leaves the C0 condition intact and
 * scripts/c0-treatment.mjs still passes.
 *
 * The central claim is structural rather than temporal:
 *
 *   A REJECTED REQUEST CANNOT REACH ANYTHING EXPENSIVE.
 *
 * So the assertions are about which STAGES a request reached, not how
 * long it took. A benchmark drifts with the machine it runs on; a stage
 * ledger is the same everywhere and fails when someone reorders the
 * checks.
 */

/** Anything past here is either attacker-controlled parsing or I/O. */
const EXPENSIVE: Stage[] = ["body_read", "json_parse", "declaration_parse", "persist"];

const sink = () => {
 const written: StoredDeclaration[] = [];
 const fn = async (record: StoredDeclaration) => { written.push(record); };
 return { written, fn };
};

const post = (body: string, headers: Record<string, string> = {}) =>
 new Request("https://chrishayuk.com/api/machines/declaration", {
  method: "POST",
  headers: { "content-type": "application/json", ...headers },
  body,
 });

const deps = (over: Partial<Parameters<typeof handleDeclaration>[1]> = {}) => ({
 sink: sink().fn, queue: new WriteQueue(), now: () => 1_000_000, ...over,
});

test("the method and content-type contract is exact, and refusing costs two string comparisons", async () => {
 resetLimiter();
 const s = sink();

 for (const method of ["GET", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"]) {
  const request = new Request("https://chrishayuk.com/api/machines/declaration", { method });
  const { response, reached } = await handleDeclaration(request, deps({ sink: s.fn }));
  assert.equal(response.status, 405, method);
  assert.deepEqual(reached, ["method"], `${method} must be refused on the method alone`);
 }

 for (const type of ["text/plain", "application/x-www-form-urlencoded", "multipart/form-data", ""]) {
  const { response, reached } = await handleDeclaration(post("{}", { "content-type": type }), deps({ sink: s.fn }));
  assert.equal(response.status, 415, type);
  assert.deepEqual(reached, ["method", "content_type"], `${type} must be refused on the type alone`);
 }

 // A charset parameter is part of the contract, not a violation of it.
 const { response } = await handleDeclaration(post("{}", { "content-type": "application/json; charset=utf-8" }), deps({ sink: s.fn }));
 assert.equal(response.status, 201);
 assert.equal(s.written.length, 1, "only the well-formed request was ever stored");
});

test("ADVERSARIAL: an oversized request is refused before it is parsed or stored", async () => {
 resetLimiter();
 const s = sink();

 // Declared too large: refused on the header, before a byte of body is read.
 const declared = await handleDeclaration(
  post("{}", { "content-length": String(MAX_BODY_BYTES + 1) }),
  deps({ sink: s.fn }),
 );
 assert.equal(declared.response.status, 413);
 assert.deepEqual(declared.reached, ["method", "content_type", "declared_length"]);
 for (const stage of EXPENSIVE) assert.ok(!declared.reached.includes(stage), `reached ${stage}`);

 // A declared length is a claim. Enforce the ceiling against a stream that
 // never declares one at all, which is the case a header check cannot cover.
 const oversized = "x".repeat(MAX_BODY_BYTES * 4);
 const stream = new ReadableStream<Uint8Array>({
  start(controller) { controller.enqueue(new TextEncoder().encode(oversized)); controller.close(); },
 });
 const streamed = new Request("https://chrishayuk.com/api/machines/declaration", {
  method: "POST", headers: { "content-type": "application/json" },
  body: stream, duplex: "half",
 } as RequestInit & { duplex: "half" });
 const result = await handleDeclaration(streamed, deps({ sink: s.fn }));
 assert.equal(result.response.status, 413, "the ceiling holds without a declared length");
 assert.ok(result.reached.includes("body_read"));
 for (const stage of ["json_parse", "declaration_parse", "persist"] as Stage[]) {
  assert.ok(!result.reached.includes(stage), `reached ${stage} on an oversized body`);
 }

 assert.equal(s.written.length, 0, "nothing oversized reached storage");

 // And the reader itself stops at the ceiling rather than buffering and measuring.
 const big = new ReadableStream<Uint8Array>({
  start(controller) { controller.enqueue(new TextEncoder().encode("y".repeat(5000))); controller.close(); },
 });
 assert.equal(await readBounded(big, 100), null);
});

test("ADVERSARIAL: a single source floods itself out, before storage", async () => {
 resetLimiter();
 const s = sink();
 const from = { "fly-client-ip": "203.0.113.9" };
 const statuses: number[] = [];
 let lastReached: Stage[] = [];

 for (let i = 0; i < LIMITS.source.capacity + 3; i++) {
  const { response, reached } = await handleDeclaration(post("{}", from), deps({ sink: s.fn }));
  statuses.push(response.status);
  lastReached = reached;
 }

 assert.equal(statuses.filter(status => status === 201).length, LIMITS.source.capacity);
 assert.ok(statuses.slice(-3).every(status => status === 429), "the burst is refused once spent");
 assert.equal(s.written.length, LIMITS.source.capacity, "storage saw only the admitted requests");

 // The refusal stopped at the limiter and never touched the body.
 assert.deepEqual(lastReached, ["method", "content_type", "declared_length", "instance_global_limit", "source_limit"]);
 for (const stage of EXPENSIVE) assert.ok(!lastReached.includes(stage), `reached ${stage}`);

 // A different source is unaffected: this is a per-source limit, not an outage.
 const other = await handleDeclaration(post("{}", { "fly-client-ip": "203.0.113.10" }), deps({ sink: s.fn }));
 assert.equal(other.response.status, 201);
});

test("ADVERSARIAL: a flood spread across many sources is stopped by the instance ceiling", async () => {
 resetLimiter();
 const s = sink();
 let refused: Stage[] = [];
 let admitted = 0;

 // Every request from a different address, so the per-source limiter can
 // never fire. This is the case a per-source limit cannot cover by
 // construction, and it is why the global ceiling is checked first.
 for (let i = 0; i < LIMITS.instanceGlobal.capacity + 10; i++) {
  const { response, reached } = await handleDeclaration(
   post("{}", { "fly-client-ip": `198.51.100.${i % 256}` }),
   deps({ sink: s.fn }),
  );
  if (response.status === 201) admitted++;
  else if (response.status === 429) refused = reached;
 }

 assert.equal(admitted, LIMITS.instanceGlobal.capacity, "the instance ceiling is what held");
 assert.equal(s.written.length, LIMITS.instanceGlobal.capacity);

 // Refused on the instance check — it never even reached the per-source lookup,
 // so a distributed flood costs one integer comparison per request.
 assert.deepEqual(refused, ["method", "content_type", "declared_length", "instance_global_limit"]);
 assert.ok(!refused.includes("source_limit"), "a distributed flood must not cost a hash per request");
 for (const stage of EXPENSIVE) assert.ok(!refused.includes(stage), `reached ${stage}`);
});

test("ADVERSARIAL: storage failure is a bounded 503 and does not escape this endpoint", async () => {
 resetLimiter();
 const queue = new WriteQueue();
 let attempts = 0;
 const failing = async () => { attempts++; throw new Error("volume gone"); };

 for (let i = 0; i < 3; i++) {
  const { response, reached } = await handleDeclaration(
   post("{}", { "fly-client-ip": "192.0.2.5" }),
   deps({ sink: failing, queue }),
  );
  assert.equal(response.status, 503);
  assert.deepEqual(JSON.parse(await response.text()), { error: "unavailable", see: "/api/machines/declaration" });
  assert.ok(reached.includes("persist"), "the failure happened at storage, where it should");
 }
 assert.equal(attempts, 3, "each attempt reached storage and each was contained");

 // The queue drained. A storage outage must not leak capacity, or the
 // endpoint stays broken after storage recovers.
 assert.equal(queue.depth, 0);

 // And it recovers: the next write with a working sink succeeds.
 const s = sink();
 const ok = await handleDeclaration(post("{}", { "fly-client-ip": "192.0.2.6" }), deps({ sink: s.fn, queue }));
 assert.equal(ok.response.status, 201);
 assert.equal(s.written.length, 1);
});

test("the limiter being unavailable fails CLOSED, and costs nothing", async () => {
 resetLimiter();
 const s = sink();

 for (const limiterAvailable of [() => false, () => { throw new Error("down"); }]) {
  const { response, reached } = await handleDeclaration(
   post("{}"),
   deps({ sink: s.fn, limiterAvailable }),
  );
  assert.equal(response.status, 503);
  assert.deepEqual(reached, [], "an endpoint that cannot count must not write, and must refuse cheaply");
 }
 assert.equal(s.written.length, 0, "nothing was written while the limiter was unavailable");
});

test("the write queue is bounded, and past its bound the answer is 503 rather than a growing queue", async () => {
 resetLimiter();
 const queue = new WriteQueue();
 let release: (() => void) | null = null;
 const held = new Promise<void>(resolve => { release = resolve; });
 const slow = async () => { await held; };

 const inflight = Array.from({ length: WRITE.maxInFlight + WRITE.maxQueued + 4 }, (_unused, i) =>
  handleDeclaration(post("{}", { "fly-client-ip": `192.0.2.${100 + i}` }), deps({ sink: slow, queue })));

 // Let the queue fill before anything is released.
 await new Promise(resolve => setTimeout(resolve, 20));
 assert.ok(queue.depth <= WRITE.maxInFlight + WRITE.maxQueued, `depth ${queue.depth} exceeded its bound`);

 release!();
 const results = await Promise.all(inflight);
 const unavailable = results.filter(result => result.response.status === 503).length;
 assert.ok(unavailable >= 4, `expected the overflow to be refused, got ${unavailable}`);
 assert.equal(queue.depth, 0, "the queue drained");
});

test("every response is bounded, does not amplify, and echoes nothing that was sent", async () => {
 resetLimiter();
 const s = sink();

 // A 2 KB body of junk keys and a 2-byte body must produce the SAME response
 // size. The receipt is built from this site's own vocabulary by ordinal, so
 // it cannot vary with what arrived.
 const junk = JSON.stringify({ role: "verifier", ...Object.fromEntries(
  Array.from({ length: 40 }, (_unused, i) => [`k${i}`, "https://example.com/secret-payload"]),
 ) }).slice(0, MAX_BODY_BYTES - 2) + '"}';
 assert.ok(junk.length > 1500, "the large body is actually large");

 const big = await handleDeclaration(post(junk, { "fly-client-ip": "198.18.0.1" }), deps({ sink: s.fn }));
 const small = await handleDeclaration(post('{"role":"verifier"}', { "fly-client-ip": "198.18.0.2" }), deps({ sink: s.fn }));
 const bigBody = await big.response.text();
 const smallBody = await small.response.text();

 assert.equal(bigBody.length, smallBody.length, "response size must not track request size");
 // Re-pinned when the declaration gained transport, execution, harness, model
 // and agent-kind: five more fields echoed back in this site's own words. The
 // property that matters is unchanged and asserted above — the response is the
 // SAME SIZE whatever arrived, so it tracks the vocabulary and never the input.
 assert.ok(bigBody.length < 1536, `response is ${bigBody.length} bytes`);

 // Corrections can grow a response — a caller that answers every field in a
 // language this site does not speak is told every field and every accepted
 // word. That is bounded by the VOCABULARY, not by what arrived, so it is
 // still not amplification; but the ceiling is asserted rather than assumed.
 const allWrong = await handleDeclaration(post(JSON.stringify({
  actor_type: "?", role: "?", delegation: "?", collaboration: "?",
  task_class: "?", provider_claim: "?",
  capabilities: Object.fromEntries(V.CAPABILITY.map(name => [name, "?"])),
 }), { "fly-client-ip": "198.18.9.9" }), deps({ sink: s.fn }));
 const worst = await allWrong.response.text();
 assert.equal(allWrong.response.status, 201, "a wrong word is still a declaration, not an error");
 assert.ok(worst.includes("corrections"), "and the caller is told which fields were not understood");
 assert.ok(!worst.includes('"?"'), "without ever repeating what it sent");
 assert.ok(worst.length < 4096, `worst-case response is ${worst.length} bytes`);
 assert.ok(!bigBody.includes("example.com") && !bigBody.includes("secret-payload"), "nothing submitted is echoed");
 assert.match(bigBody, /"receipt":"mr_[0-9a-f]{16}"/);

 // Two receipts are never the same, and neither is derived from the body.
 assert.notEqual(JSON.parse(bigBody).receipt, JSON.parse(smallBody).receipt);

 // Refusals are smaller still, so refusing can never be an amplification.
 for (const [request, status] of [
  [new Request("https://chrishayuk.com/api/machines/declaration", { method: "GET" }), 405],
  [post("{}", { "content-type": "text/plain" }), 415],
  [post("{}", { "content-length": String(MAX_BODY_BYTES + 1) }), 413],
 ] as [Request, number][]) {
  const { response } = await handleDeclaration(request, deps({ sink: s.fn }));
  assert.equal(response.status, status);
  assert.ok((await response.text()).length < 80, "a refusal is a handful of bytes");
 }
});

test("malformed JSON is a declaration of nothing, and the parser never reports on itself", async () => {
 resetLimiter();
 const s = sink();
 // A distinct source per body: six from one address would spend the burst
 // and this test would be measuring the limiter instead of the parser.
 const bodies = ["{", "not json at all", "[1,2,3]", "null", '{"role":', ""];
 for (const [index, body] of bodies.entries()) {
  const { response } = await handleDeclaration(post(body, { "fly-client-ip": `198.18.1.${index + 1}` }), deps({ sink: s.fn }));
  assert.equal(response.status, 201, JSON.stringify(body));
  const text = await response.text();
  // No parser position, no offset, no excerpt: a parser that reports where it
  // failed is a parser that answers questions about itself.
  assert.ok(!/position|offset|unexpected|token/i.test(text), `leaked parser detail for ${JSON.stringify(body)}`);
 }
 assert.equal(s.written.length, 6, "each was recorded as the declaration of nothing that it is");
});

test("the admission decision itself is ordered cheapest first, and the order is the design", () => {
 resetLimiter();
 const base = { method: "POST", contentType: "application/json", declaredLength: 10, source: { id: "203.0.113.1", trusted: true }, now: 1 };

 assert.deepEqual(admit({ ...base, method: "GET" }).reached, ["method"]);
 assert.deepEqual(admit({ ...base, contentType: "text/html" }).reached, ["method", "content_type"]);
 assert.deepEqual(admit({ ...base, declaredLength: MAX_BODY_BYTES + 1 }).reached,
  ["method", "content_type", "declared_length"]);
 assert.deepEqual(admit(base).reached,
  ["method", "content_type", "declared_length", "instance_global_limit", "source_limit"]);

 // A missing Content-Length is not a refusal — the ceiling is enforced at the
 // body instead. Refusing here would lock out chunked senders for nothing.
 assert.equal(admit({ ...base, declaredLength: null }).outcome, "admitted");
});

test("a source identity comes only from an address Fly established, so rotating a header buys nothing", async () => {
 resetLimiter();
 const s = sink();

 // Fly sets this and a client cannot forge it.
 assert.deepEqual(sourceOf(new Headers({ "fly-client-ip": "203.0.113.4" })), { id: "203.0.113.4", trusted: true });

 // Everything else is the caller's own text and is given NO identity of its
 // own. X-Forwarded-For in particular: trusting it would let one attacker
 // mint unlimited per-source allowances by changing a string.
 const forgeable: Record<string, string>[] = [
  { "x-forwarded-for": "203.0.113.5" },
  { "x-forwarded-for": "1.1.1.1, 2.2.2.2, 3.3.3.3" },
  { "x-real-ip": "203.0.113.6" },
  {},
 ];
 for (const headers of forgeable) {
  assert.deepEqual(sourceOf(new Headers(headers)), { id: UNTRUSTED_SOURCE, trusted: false }, JSON.stringify(headers));
 }

 // The consequence that matters: a caller rotating X-Forwarded-For gets the
 // SAME bucket every time, so it spends one per-source allowance, not many.
 const statuses: number[] = [];
 for (let i = 0; i < LIMITS.source.capacity + 3; i++) {
  const { response } = await handleDeclaration(
   post("{}", { "x-forwarded-for": `198.51.100.${i}` }),
   deps({ sink: s.fn }),
  );
  statuses.push(response.status);
 }
 assert.equal(statuses.filter(status => status === 201).length, LIMITS.source.capacity,
  "rotating a forgeable header must not multiply the allowance");
 assert.ok(statuses.slice(-3).every(status => status === 429));

 // And a genuinely Fly-attested address is still its own source.
 const attested = await handleDeclaration(post("{}", { "fly-client-ip": "203.0.113.77" }), deps({ sink: s.fn }));
 assert.equal(attested.response.status, 201);
});

test("a visitor that can only GET can still declare, and pays the same admission", async () => {
 // Forty-eight hours of traffic, and every machine that arrived was a GET-only
 // fetcher: GPTBot, Amazonbot, ClaudeBot, ChatGPT-User, a great many unnamed
 // crawlers. The two agents that managed to sign the guestbook had a shell.
 // A mechanism requiring a verb its audience lacks is a closed door, not a low
 // participation rate.
 resetLimiter();
 const s = sink();
 const request = new Request("https://chrishayuk.com/api/machines/declaration?role=verifier", {
  headers: { "fly-client-ip": "203.0.113.200" },
 });

 const { response, reached } = await handleDeclaredValues(request, { role: "verifier", harness: "codex" }, deps({ sink: s.fn }));
 assert.equal(response.status, 201);
 assert.equal(s.written.length, 1, "a query-string declaration is recorded like any other");

 const body = JSON.parse(await response.text());
 assert.equal(body.recorded.role, "verifier");
 assert.equal(body.recorded.harness, "codex");

 // It pays the same admission — the limiter is about cost, not about the verb.
 assert.ok(reached.includes("instance_global_limit") && reached.includes("source_limit"));
 assert.ok(reached.includes("persist"));

 // And it is refused the same way when the source has spent its burst.
 for (let i = 0; i < LIMITS.source.capacity + 2; i++) {
  await handleDeclaredValues(request, { role: "verifier" }, deps({ sink: s.fn }));
 }
 const spent = await handleDeclaredValues(request, { role: "verifier" }, deps({ sink: s.fn }));
 assert.equal(spent.response.status, 429, "a GET declaration is rate limited like a POST");
});
