import { machineJourney } from "./machine-journey.ts";
import { cell80Journey } from "./cell80-journey.ts";
import { getRecord, recordPath, isListed } from "./records.ts";

export const memoryStudy = {
  id: "DEMO-ADDRESS", title: "Try the mechanism.", url: "/demos/addressed-memory", visibility: undefined as "unlisted" | undefined,
  text: "Choose a planted address, inspect its key matches and suppress a neuron in a constructed six-fact FFN. The browser study makes the calculation inspectable; it does not run a trained language model.",
};

export const authorityStudy = {
  id: "DEMO-AUTHORITY", title: "Which source wins?", url: "/demos/authority-gate", visibility: undefined as "unlisted" | undefined,
  text: "Promote a record beside the question, retire the original sentence from individual global attention layers, and read the answer that was recorded. The study replays measured arms from a long-context experiment; it does not run a model, and it returns nothing for combinations that were never run.",
};

export const demoStudies = [memoryStudy, authorityStudy];

/** Editorial reading order. Membership never asserts historical causation. */
const composedThread = {
  id: "THREAD-MAP", slug: "the-map", title: "From a map to a memory.",
  path: "/thread/the-map", version: "0.1", created: "2026-09-06",
  // Deliberately uncounted: steps whose destination is an unlisted preview are
  // filtered out below, so the summary has to read correctly either way.
  abstract: "What can a model’s changing state tell us about the way it reads? Follow the map film through the visual notebooks, studies you can work yourself, and the questions behind LARQL and VINDEX3.",
  context: "A curated reading order, rather than a chronology of discovery. Films keep their original dates. Notes and dossiers remain working drafts. Interactive studies are labelled as either constructed examples or replays of recorded results.",
  steps: [
    { id: "YT-HJlWDSyDcD4", label: "WATCH THE STATE MOVE", text: "Begin with the capital of Japan. The film follows the changing residual state, then asks what happens when a France state enters an Australia computation.", start: 120, media: "film-still-HJlWDSyDcD4-120" },
    { id: "N-MAP", label: "ASK WHAT THE PICTURE MEANS", text: "Which token position is moving? What are the axes? The notebook reads the demonstration alongside its projection code and distinguishes a useful picture from an answer probability.", media: "notebook-map" },
    { id: "N-STATE", label: "CHANGE THE STATE", text: "Replacing one position and replacing the full sequence are different interventions. Follow the transplant evidence into the question of what must persist after the next word.", media: "film-still-HJlWDSyDcD4-240" },
    { id: "N-ADDRESS", label: "EXAMINE THE READER", text: "A state becomes useful when an operation can read it. Follow key matches, activations and value contributions, then compare the constructed memory with the native-model experiments.", media: "notebook-address" },
    { id: memoryStudy.id, label: "MAKE AN INTERVENTION", text: "Choose capital of Atlantis. Inspect the competing activations, remove a neuron and watch the answer scores change. Every operation in this little memory is visible." },
    { id: "N-AUTHORITY", label: "ASK WHICH ONE ANSWERS", text: "A stored memory eventually holds two things that disagree. Follow the recorded arc from a record that replaces a retired source, to one that is completely inert against a source still being read.", media: "film-still-HJlWDSyDcD4-1222" },
    { id: authorityStudy.id, label: "RETIRE A READ", text: "Eight attention layers can see the whole context. Switch one off and the newer record takes the answer. The study replays what was measured, and stays silent about what was not." },
    { id: "N-ADDRESS-BUILD", label: "WATCH THE ADDRESS TAKE SHAPE", text: "Return to native facts. A final-position transplant and an independent reader locate the entity transition between L24 and L28. Explore the early relation frame and changing coordinates, with the answer-token endpoint marked explicitly." },
    { id: "W-LARQL", label: "TURN THE QUESTION TOWARDS SOFTWARE", text: "LARQL explores how learned systems can be queried. Return from the small memory to the larger engineering question: which operations can a model reliably expose?", media: "film-still-8Ppw8254nLI-1290" },
    { id: "W-VINDEX3", label: "ASK HOW TO REPRESENT IT", text: "If a model has parts we can address and relationships we can inspect, how should we represent them? VINDEX3 gives that question its own system and specification." },
  ],
};
export type ThreadStep = (typeof composedThread.steps)[number];
/** A step whose destination is an unlisted preview is not offered publicly.
 *  It rejoins the thread, in place, when that record becomes listed. */
const listedStep = (step: ThreadStep) => {
  const study = demoStudies.find(s => s.id === step.id);
  if (study) return study.visibility !== "unlisted";
  const record = getRecord(step.id);
  return Boolean(record && isListed(record));
};
export const mapThread = { ...composedThread, steps: composedThread.steps.filter(listedStep) };
export const cell80Thread = {
  id: "THREAD-CELL80", slug: "cell80", title: "A world that can be questioned.",
  path: "/thread/cell80", version: "0.3", created: "2026-09-09",
  abstract: "Six connected notes from a small evolutionary world: replay a birth, keep an ecology alive, test an improvement, follow an inheritance, and ask what survives the controls.",
  context: "Start with any question, or follow the whole experiment. The first three notes study movement and ecology; the next two use a new food-processing world. The closing note tests what the design itself made possible. These are different assays, not one continuous simulation.",
  steps: cell80Journey.map<ThreadStep>(step => ({ id: step.id, label: step.question.toUpperCase(), text: `${step.finding} ${step.bridge}` })).filter(listedStep),
};
export const machineThread = {
  id: "THREAD-MACHINES", slug: "machines", title: "The website asks. Whose instruction counts?",
  path: "/thread/machines", version: "0.2", created: "2026-09-12",
  abstract: "An invitation became a usability test, then a question about permission, task scope and what makes an action worthwhile. Follow five connected notes, from agents recognising the experiment to visitors leaving a mark as a courtesy.",
  context: "Five notebook entries, one recorded model family, different tasks and site revisions. Follow the experiments in reading order, or start with the latest comparison. Declarations, anonymous marks, reported reasons and HTTP contacts remain different kinds of evidence.",
  steps: machineJourney.map<ThreadStep>(step => ({ id: step.id, label: step.experiment, text: `${step.finding} ${step.bridge}` })).filter(listedStep),
};
export const threads = [mapThread, cell80Thread, machineThread];
export function resolveThreadStep(step: ThreadStep) {
  const study = demoStudies.find(s => s.id === step.id);
  if (study) return { ...step, title: study.title, url: study.url, kind: "interactive study",
    status: study.id === memoryStudy.id ? "CONSTRUCTED EXAMPLE" : "RECORDED RESULTS", date: undefined };
  const record = getRecord(step.id);
  if (!record) throw new Error(`Unresolved thread member: ${step.id}`);
  return { ...step, title: record.title, url: `${recordPath(record)}${step.start !== undefined ? `?t=${step.start}` : ""}`, kind: record.kind,
    status: record.publication === "catalogued" ? "ORIGINAL FILM" : `WORKING DRAFT · ${record.status || "OPEN"}`,
    date: record.published, record };
}
export function threadPosition(id: string) {
  const thread = threads.find(t => t.steps.some(s => s.id === id));
  if (!thread) return undefined;
  const index = thread.steps.findIndex(s => s.id === id);
  return { thread, index, previous: index ? resolveThreadStep(thread.steps[index - 1]) : undefined,
    next: index + 1 < thread.steps.length ? resolveThreadStep(thread.steps[index + 1]) : undefined };
}
