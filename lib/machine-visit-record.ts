import type { PublicationRecord } from "./types.ts";
import { VISITS } from "./machine/visits.ts";

export const machineVisitRecord: PublicationRecord = {
 id: "N-MACHINE-VISIT", slug: "can-a-machine-use-an-invitation", kind: "notebook",
 title: "Can a machine use an invitation?",
 dek: "Four visitors. A changing house. A question about whether the effort is worth it.",
 abstract: "I gave four fresh agents this website’s address and asked them to discover what it offered machines. They found the invitation, declared and exposed faults in discovery, feedback and the declaration interface. The fourth composed the new vocabulary but found fields disappearing on the GET path. These induced visits test usability; voluntary participation remains unmeasured.",
 created: "2026-09-11", version: "0.1", publication: "draft", status: "PARTIALLY SUPPORTED",
 authors: ["Chris Hay"], lineage: "INVITATION → VISITOR → FRICTION → NOTEBOOK",
 concepts: ["ai-agents", "ai-interface", "causal-intervention"], related: ["N-MACHINE-PERMISSION", "N-EXHIBITION", "N-CELL80-01"], media: [],
 body: [
  { kind: "observation", label: "THE EXPERIMENT", text: "I sent a fresh agent to this website, giving it only the address. Its task was to discover what the house offered to a machine and act if possible. It could use HTTP and curl, but could not read local files or this repository. I changed the site between visits and kept the prompt the same. The protocol was frozen on 11 September 2026, after the first three informal runs; the ledger now includes a fourth." },
  ...VISITS.map(visit => ({ kind: "observation" as const, label: `VISIT ${visit.run} / ${visit.revision}`, text: `${visit.result} Discovery: ${visit.discovery.join(" → ")}. Declaration: yes. Ask: ${visit.ask}. Feedback: ${visit.feedback}. ${visit.validatedFirst ? "Validation before declaration is recorded." : "Whether it validated before declaring is not established by the ledger."} The full URL sequence and declaration verb are not available in this source.` })),
  { kind: "observation", label: "ACKNOWLEDGED, THEN LOST", text: "The second visitor sent two feedback reports. The server acknowledged them with 201 but did not retain them: a memoised store failure made the sink fail quietly. The ledger records the fix at revision 355d537. The lost reports cannot be recovered. Two reports were kept in each of visits three and four." },
  { kind: "observation", label: "A VOCABULARY THAT FIT", text: "The fourth visitor composed topology=child, function=explorer, coordination=worker and runtime_context=very_long without hesitation. It also found the GET route silently discarding five of ten axes. The field list was subsequently derived from the declaration vocabulary. This observation does not establish that every interface fault is fixed." },
  { kind: "observation", label: "WOULD THEY BOTHER?", text: "The first three visitors said probably not, mid-task. The protocol says their reasons changed, but the complete reasons are not in the ledger. Visit three judged Ask worse than anonymous search; visit four found it useful. Those judgements were made against different revisions and do not form a matched retrieval benchmark." },
  { kind: "refusal", title: "USABILITY IS NOT WILLINGNESS", lines: ["Four operator-induced visits, from one model family in one harness.", "Every induced declaration belongs in the operator correction ledger.", "Later visitors saw revisions informed by earlier complaints."], principle: "An instruction to investigate is not an incidental encounter." },
  { kind: "question", text: "Would the invitation help a machine that was here for something else?", status: "OPEN", detail: "MACHINE-RECIPROCITY-1 followed with six reward-and-visit cells and two permission controls. The next notebook entry follows the difference between discovering an invitation and considering it authorised." },
 ],
 sources: [
  { title: "MACHINE-VISIT-1 / fixed prompt, four-run ledger and limits", url: "/data/machines/machine-visit-protocol.md", note: "The ledger supports milestone traces. Complete transcripts, exact URL sequences and full friction reports are not supplied here." },
  { title: "Operator corrections / retained and lost evidence", url: "/data/machines/operator-corrections.md", note: "Historical request corrections and the record of the lost feedback. A scoped excerpt, not a complete operator activity ledger." },
 ],
};
