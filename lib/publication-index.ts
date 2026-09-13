import { records, getRecord, isListed } from "./records.ts";
import { machineThread, agentEcologyThread, cell80Thread, mapThread } from "./threads.ts";
import { notebookSelection } from "./notebook-selection.ts";
import type { PublicationRecord, Status } from "./types.ts";

/** Publication chronology; editorial order breaks same-day ties. Revisions do
 * not silently turn an older note into a new publication. */
export const noteDate = (record: PublicationRecord) => record.published || record.created;
const editorialRank = new Map(notebookSelection.map((record, index) => [record.id, index]));
export const notebookNotes = records.filter(record => record.kind === "notebook").sort((a, b) =>
  noteDate(b).localeCompare(noteDate(a)) ||
  (editorialRank.get(a.id) ?? Infinity) - (editorialRank.get(b.id) ?? Infinity) || a.id.localeCompare(b.id));
export const latestNotes = notebookNotes.slice(0, 6);
export const shortDate = (date: string) => new Intl.DateTimeFormat("en-GB", {
  day: "numeric", month: "short", year: "numeric", timeZone: "UTC",
}).format(new Date(`${date}T00:00:00Z`));

export const programmes = [
  { id: "machines", title: "Machines", question: "What can an AI discover, authorise, use and leave behind?",
    description: "AI agents, websites, authority and shared environments.", href: machineThread.path,
    threads: [machineThread, agentEcologyThread], extra: ["N-MACHINE-PEER"],
    continuation: { title: "Agent Ecology", text: "What keeps an action alive?", href: agentEcologyThread.path } },
  { id: "cell80", title: "Cell80", question: "What can an evolving world invent?",
    description: "Artificial life, evolution and causal histories.", href: cell80Thread.path,
    threads: [cell80Thread], extra: [], continuation: undefined },
  { id: "learned-systems", title: "Learned systems", question: "How does a model construct, address and retrieve knowledge?",
    description: "Addresses, residual state, relations and memory. The questions behind LARQL and VINDEX3.", href: mapThread.path,
    threads: [mapThread], extra: ["N-CONTEXT", "N-OPERATOR"], continuation: undefined },
  { id: "practice", title: "Practice / Systems", question: "What does making reveal?",
    description: "HAUSE, coding agents, design and making.", href: "/notebook/archive?programme=practice",
    threads: [], extra: ["N-EXHIBITION", "N-ATTRIBUTION"], continuation: undefined },
];
export const researchProgrammes = programmes.filter(programme => programme.id !== "practice");
export type Programme = typeof programmes[number];
export function programmeNotes(programme: Programme) {
  const ids = new Set([...programme.threads.flatMap(thread => thread.steps.map(step => step.id)), ...programme.extra]);
  return notebookNotes.filter(record => ids.has(record.id));
}
export const programmeFor = (record: PublicationRecord) => programmes.find(programme => programmeNotes(programme).some(note => note.id === record.id));

/** NOW is an explicit editorial choice, independent of chronology. */
const discovery = getRecord("N-MACHINE-DISCOVERY");
export const nowNote = discovery && isListed(discovery) ? discovery : undefined;

export const resultOutcomes: Status[] = ["SUPPORTED", "PARTIALLY SUPPORTED", "NOT SUPPORTED", "REFUTED", "BOUND"];
export function findings(record: PublicationRecord) {
  return record.body.flatMap(act => act.kind === "claim"
    ? [{ text: act.text, status: act.status, detail: act.detail }]
    : act.kind === "evidence" ? act.items.map(item => ({ text: item.label, status: item.status, detail: item.detail })) : [])
    .filter(finding => resultOutcomes.includes(finding.status));
}
export const researchNotes = notebookNotes.filter(record => programmeFor(record)?.id !== "practice" && findings(record).length > 0);

export function notebookArchive(query: { q?: string; programme?: string }) {
  const q = (query.q || "").trim().slice(0, 300);
  const programme = programmes.find(item => item.id === query.programme);
  const source = programme ? programmeNotes(programme) : notebookNotes;
  const terms = q.toLowerCase().split(/\s+/).filter(Boolean);
  return { q, programme: programme?.id || "all", entries: source.filter(record => terms.every(term =>
    `${record.id} ${record.title} ${record.abstract} ${record.concepts.join(" ")} ${record.experiments?.map(experiment => experiment.id).join(" ") || ""}`.toLowerCase().includes(term))) };
}
