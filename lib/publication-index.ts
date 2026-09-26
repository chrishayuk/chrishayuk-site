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
  { id: "machines", title: "Machines", question: "When does an action belong to the task?",
    description: "An agent has a job. A website asks for more. What counts as permission?", href: machineThread.path,
    threads: [machineThread], extra: ["N-MACHINE-PEER"],
    continuation: undefined },
  { id: "agent-ecology", title: "Agent Ecology", question: "What keeps an action alive?",
    description: "A stronger model leaves. What can weaker successors inherit and keep alive—and what happens when the record is wrong?", href: agentEcologyThread.path,
    threads: [agentEcologyThread], extra: [], continuation: undefined },
  { id: "cell80", title: "Cell80", question: "What happens when programs evolve?",
    description: "Tiny, verifiable programs: tools for agents and building blocks for evolving worlds. Replay the history. Change one thing. See what follows.", href: cell80Thread.path,
    threads: [cell80Thread], extra: [], continuation: undefined },
  { id: "learned-systems", title: "Learned systems", question: "How does a model find what it knows?",
    description: "Look inside a model’s memory. Trace how it builds an answer—and test what changes it.", href: mapThread.path,
    threads: [mapThread], extra: ["N-CONTEXT", "N-OPERATOR"], continuation: undefined },
  { id: "practice", title: "Practice / Systems", question: "What does making reveal?",
    description: "HAUSE, coding agents, design and making.", href: "/notebook/archive?programme=practice",
    threads: [], extra: ["N-EXHIBITION", "N-ATTRIBUTION"], continuation: undefined },
];
export const researchProgrammes = programmes.filter(programme => programme.id !== "practice");
/** The selected results now include the population-inheritance sequence. */
export const homeResultProgrammes = researchProgrammes;
export type Programme = typeof programmes[number];
/** Curated entrances, independent of the latest-note chronology. */
export const programmeHighlights: Record<string, string> = {
  machines: "N-MACHINE-MOTIVATION",
  "agent-ecology": "N-ECOLOGY-RECOVERY",
  cell80: "N-CELL80-BOUND",
  "learned-systems": "N-ADDRESS-BUILD",
};
export const programmeHighlight = (programme: Programme) => programmeNotes(programme).find(note => note.id === programmeHighlights[programme.id]);
export const programmeInvitations: Record<string, { text: string; label: string; anchor: string }> = {
  machines: { text: "The agent has a job. The website asks for a favour. Compare six offers and see when an optional action became worth taking.", label: "COMPARE THE INVITATIONS", anchor: "motivation-outcomes" },
  "agent-ecology": { text: "Damage arrives after the stronger builder leaves. From equal starting state, inherited code helped seven worlds recover; prose helped none.", label: "COMPARE RECOVERY", anchor: "i12r" },
  cell80: { text: "An evolved module seems to open thousands of new possibilities. Put it beside the controls. Does the exciting explanation survive?", label: "COMPARE THE CONTROLS", anchor: "cell80-study" },
  "learned-systems": { text: "Move one model state into another computation. Explore when it changes the relation, when it changes the entity, and where that explanation stops.", label: "EXPLORE THE TRANSPLANTS", anchor: "address-causal" },
};
export function programmeNotes(programme: Programme) {
  const ids = new Set([...programme.threads.flatMap(thread => thread.steps.map(step => step.id)), ...programme.extra]);
  return notebookNotes.filter(record => ids.has(record.id));
}
export const programmeFor = (record: PublicationRecord) => programmes.find(programme => programmeNotes(programme).some(note => note.id === record.id));

/** One home for every listed notebook. New notes remain discoverable before a
 * research-thread membership is authored; overlapping threads do not duplicate covers. */
export const notebookCollections = programmes.map(programme => ({
  ...programme, notes: notebookNotes.filter(note => programmeFor(note)?.id === programme.id),
}));
const looseNotes = notebookNotes.filter(note => !programmeFor(note));
if (looseNotes.length) notebookCollections.push({
  id: "working-notes", title: "Working notes", question: "What comes next?",
  description: "New questions and observations, before they become a research thread.",
  href: "/notebook/archive", threads: [], extra: [], continuation: undefined, notes: looseNotes,
});

/** The thread leads with its selected result; recency is a separate link. */
export const nowNote = programmeHighlight(programmes.find(programme => programme.id === "machines")!);
export const latestMachineNote = notebookNotes.find(note => machineThread.steps.some(step => step.id === note.id));
const methodNote = getRecord("N-MACHINE-SELF-READ");
export const selectedMachineMethod = methodNote && isListed(methodNote) ? methodNote : undefined;

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
