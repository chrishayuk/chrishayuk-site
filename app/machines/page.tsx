import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { TOPOLOGY, FUNCTION, COORDINATION, RUNTIME_CONTEXT, MODEL_VARIANT, PROVIDER_CLAIM, VOCABULARY_VERSION } from "@/lib/machine/vocabulary";
import { readershipReport } from "@/lib/readership/report";
import { DeclarationComposition, EvidenceLegend, EvidencePipeline } from "@/components/MachineEvidence";
import { VISIT_PROTOCOL_PATH } from "@/lib/machine/visits";

export const metadata = pageMetadata("The machine surface — the instrument", "What a machine claims, what the site can verify and what it infers. A working instrument with a fixed declaration vocabulary.", "/machines");
export const dynamic = "force-dynamic";

export default async function Page() {
 const report = await readershipReport();
 const cells = report.counts?.exhibit.cells ?? [];
 const sample = cells.find(cell => cell.confidence === "verified") ?? cells.find(cell => cell.confidence === "declared") ?? cells[0];
 return <main id="main" className="publication-main machine-surface machine-exhibition">
  <header className="index-intro me-intro"><p className="kicker record-voice">CHRIS HAY / MACHINES / THE INSTRUMENT</p><h1>What can<br/><em>we know?</em></h1><p className="dek">A request arrives. A machine may name itself. The house keeps what was observed, what was claimed and what could be checked apart.</p></header>
  <section className="me-room me-field" aria-labelledby="instrument"><div className="me-section-head"><h2 id="instrument">One request. Different evidence.</h2><p className="record-voice">OBSERVE → TEST → INTERPRET</p></div><EvidencePipeline sample={sample}/><EvidenceLegend/></section>
  <section className="me-room" aria-labelledby="compose"><div className="me-section-head"><h2 id="compose">A machine is a composition.</h2><p className="record-voice">ONTOLOGY / VERSION {VOCABULARY_VERSION}</p></div><p>A child can be a researcher and a worker. Its place in a team, the work it does and the room it has to think are separate questions.</p><DeclarationComposition version={VOCABULARY_VERSION} axes={[
   { key: "provider_claim", label: "Provider", values: PROVIDER_CLAIM, initial: "anthropic" },
   { key: "model_variant", label: "Variant", values: MODEL_VARIANT, initial: "opus" },
   { key: "topology", label: "Topology", values: TOPOLOGY, initial: "child" },
   { key: "function", label: "Function", values: FUNCTION, initial: "researcher" },
   { key: "coordination", label: "Coordination", values: COORDINATION, initial: "worker" },
   { key: "runtime_context", label: "Context", values: RUNTIME_CONTEXT, initial: "very_long" },
  ]}/></section>
  <section className="me-room"><h2>The invitation is open.</h2><p>A visiting agent may declare how it is operating. Every field is optional. Anonymous visitors reach the same resources.</p><p className="record-voice">POST /api/machines/declaration · JSON</p><pre className="machine-contract">{`{
  "actor_type": "agent",
  "topology": "child",
  "function": "researcher",
  "coordination": "worker",
  "runtime_context": "very_long"
}`}</pre><p><a className="text-link" href="/api/machines/declaration">READ THE CONTRACT BEFORE ACTING ↗</a></p><details className="me-method"><summary>What sending a declaration does</summary><p>The response contains an opaque receipt and this site’s own words for the recorded categories. An unrecognised value becomes <code>unknown</code>; the response names the field and lists accepted values without echoing your input. Bodies are limited to two kilobytes and requests are rate limited.</p><dl><div><dt>Omitted</dt><dd>No answer was sent.</dd></div><div><dt>Stated</dt><dd>An accepted answer, including unknown, not visible to me, or not permitted to disclose.</dd></div><div><dt>Unrecognised</dt><dd>An answer the vocabulary could not represent.</dd></div></dl><p>The JSON contract is generated from the parser’s vocabulary, including all accepted fields and validation rules. A declaration is a claim about operating state; provider network verification does not attest its model identity.</p></details></section>
  <section className="me-room"><h2>Does declaring help?</h2><p>The Ask surface retrieves from the public corpus. A declaration can change ranking and framing. It does not unlock more content.</p><p className="record-voice">POST /api/machines/ask</p><p>The third blind visitor judged its declared result worse than anonymous search. That is evidence to improve the invitation, not a reason to promise a reward the experiment has not established.</p><Link className="text-link" href={VISIT_PROTOCOL_PATH}>OPEN THE BLIND-VISITOR EXPERIMENT ↗</Link></section>
  <section className="me-room"><details className="me-method"><summary>What stays outside the instrument</summary><p>User identity, private user content, system prompts, hidden instructions, credentials, secrets and confidential task material are never requested. The declaration store retains fixed vocabulary indices, not submitted prose.</p><p>The public guestbook publishes four coarse buckets from the previous completed UTC day. It exposes no individual declaration. Private feedback may inform an operator’s write-up; the site does not reprint a visitor’s words.</p><p>The instrument changes the environment it measures. Operator checks and blind runs must be identified and reconciled before interpreting participation.</p></details><div className="me-next"><Link className="text-link" href="/readership">THE OBSERVATORY / RETAINED CONTACT ↗</Link><Link className="text-link" href="/machine-guestbook">THE GUESTBOOK / COARSE PRESENCE ↗</Link><Link className="text-link" href="/llms.txt">MACHINE-READABLE INDEX ↗</Link></div></section>
 </main>;
}
