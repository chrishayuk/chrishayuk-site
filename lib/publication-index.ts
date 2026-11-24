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
  { id: "languages", title: "Languages", question: "What did the printed page actually say?",
    description: "Historical computational systems reconstructed from their original sources, tested against the surviving evidence, and made executable in your browser.", href: "/notebook?collection=languages",
    threads: [], extra: ["N-MOUSE", "N-BASIC", "N-BOHM", "N-CPL", "N-JOSS", "N-LANING-ZIERLER", "N-TURING-ACE", "N-IPLV", "N-RHIND-PAPYRUS", "N-GEORGE", "N-ALGOL-60", "N-NINE-CHAPTERS", "N-NINE-CHAPTERS-124", "N-TPK"], continuation: undefined,
    play: [
      { label: "Mouse playground", href: "/demos/mouse", name: "Mouse", year: "1979", detail: "Peter Grogono’s single-character language, from the listing printed in BYTE." },
      { label: "BASIC playground", href: "/demos/basic", name: "BASIC", year: "1964", detail: "Dartmouth BASIC, typed in from its first instruction manual." },
      { label: "CPL playground", href: "/demos/cpl", name: "CPL", year: "1966", detail: "The language BCPL was cut down from, built from its working papers, with the one large program they contain." },
      { label: "JOSS playground", href: "/demos/joss", name: "JOSS", year: "1964", detail: "RAND’s conversational computing system, rebuilt from its papers. Make a mistake, put it right, type Go." },
      { label: "Laning and Zierler playground", href: "/demos/laning-zierler", name: "Laning and Zierler", year: "1953", detail: "Algebra for MIT’s Whirlwind I, rebuilt from its 1954 manual. Punch a tape, feed it, and read what the printer types." },
      { label: "Turing ACE playground", href: "/demos/turing-ace", name: "Turing’s ACE", year: "1945", detail: "The computer Alan Turing proposed at the National Physical Laboratory, with the programs from his report." },
      { label: "Böhm playground", href: "/demos/bohm", name: "Böhm", year: "1951", detail: "Corrado Böhm’s language, machine and self-compiling compiler, from his dissertation." },
      { label: "IPL-V playground", href: "/demos/ipl-v", name: "IPL-V", year: "1964", detail: "The list-processing machine of the IPL-V manual, the language of the first artificial intelligence programs. Step it and watch storage change." },
      { label: "Rhind Papyrus playground", href: "/demos/rhind-papyrus", name: "Rhind Papyrus", year: "c. 1550 BCE", detail: "The working of the Rhind Mathematical Papyrus, about 1550 BCE, checked figure by figure against itself. Choose a line that disagrees and see what the working gives." },
      { label: "GEORGE playground", href: "/demos/george", name: "GEORGE", year: "1958", detail: "Charles Hamblin’s reverse Polish scheme for the English Electric DEUCE, from his manual and, word for word, his own coding sheets. Step through the twelve cells of its running accumulator a symbol at a time." },
      { label: "ALGOL 60 playground", href: "/demos/algol-60", name: "ALGOL 60", year: "1962", detail: "Each program run twice: as the 1962 Report defines it and as the first implementation, on the Electrologica X1, ran it. The lines that differ are marked." },
      { label: "Nine Chapters playground", href: "/demos/nine-chapters", name: "Nine Chapters", year: "Han dynasty", detail: "Chapter 8 of the Nine Chapters on the Mathematical Art, set out in counting rods and worked as the text says, what it states checked against the board. Step through it on a board in three dimensions." },
    ] },
  { id: "practice", title: "Practice / Systems", question: "What does making reveal?",
    description: "HAUSE, coding agents, design and making.", href: "/notebook/archive?programme=practice",
    threads: [], extra: ["N-EXHIBITION", "N-ATTRIBUTION"], continuation: undefined },
];
export const researchProgrammes = programmes.filter(programme => !["languages", "practice"].includes(programme.id));
/** Home's "Ongoing work" also offers the collections that are not research threads. */
/** Languages that run in the browser; Systems and the collection share one list. */
export const languagePlaygrounds = programmes.find(programme => programme.id === "languages")!.play!;
export const ongoingProgrammes = programmes.filter(programme => programme.id !== "practice");
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
