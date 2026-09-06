import { getRecord, recordPath } from "./records.ts";

export const memoryStudy = {
  id: "DEMO-ADDRESS", title: "Try the mechanism.", url: "/demos/addressed-memory",
  text: "Choose a planted address, inspect its key matches and suppress a neuron in a constructed six-fact FFN. The browser study makes the calculation inspectable; it does not run a trained language model.",
};

/** Editorial reading order. Membership never asserts historical causation. */
export const mapThread = {
  id: "THREAD-MAP", slug: "the-map", title: "From a map to a memory.",
  path: "/thread/the-map", version: "0.1", created: "2026-09-06",
  abstract: "What can a model’s changing state tell us about the way it reads? Follow the map film into three visual notebooks, a memory you can change yourself, and the questions behind LARQL and VINDEX3.",
  context: "A curated reading order, rather than a chronology of discovery. Films keep their original dates. Notes and dossiers remain working drafts; the interactive study is a constructed example.",
  steps: [
    { id: "YT-HJlWDSyDcD4", label: "WATCH THE STATE MOVE", text: "Begin with the capital of Japan. The film follows the changing residual state, then asks what happens when a France state enters an Australia computation.", start: 120, media: "film-still-HJlWDSyDcD4-120" },
    { id: "N-MAP", label: "ASK WHAT THE PICTURE MEANS", text: "Which token position is moving? What are the axes? The notebook reads the demonstration alongside its projection code and distinguishes a useful picture from an answer probability.", media: "notebook-map" },
    { id: "N-STATE", label: "CHANGE THE STATE", text: "Replacing one position and replacing the full sequence are different interventions. Follow the transplant evidence into the question of what must persist after the next word.", media: "film-still-HJlWDSyDcD4-240" },
    { id: "N-ADDRESS", label: "EXAMINE THE READER", text: "A state becomes useful when an operation can read it. Follow key matches, activations and value contributions, then compare the constructed memory with the native-model experiments.", media: "notebook-address" },
    { id: memoryStudy.id, label: "MAKE AN INTERVENTION", text: "Choose capital of Atlantis. Inspect the competing activations, remove a neuron and watch the answer scores change. Every operation in this little memory is visible." },
    { id: "W-LARQL", label: "TURN THE QUESTION TOWARDS SOFTWARE", text: "LARQL explores how learned systems can be queried. Return from the small memory to the larger engineering question: which operations can a model reliably expose?", media: "film-still-8Ppw8254nLI-1290" },
    { id: "W-VINDEX3", label: "ASK HOW TO REPRESENT IT", text: "If a model has parts we can address and relationships we can inspect, how should we represent them? VINDEX3 gives that question its own system and specification." },
  ],
};
export const threads = [mapThread];
export type ThreadStep = (typeof mapThread.steps)[number];
export function resolveThreadStep(step: ThreadStep) {
  if (step.id === memoryStudy.id) return { ...step, title: memoryStudy.title, url: memoryStudy.url, kind: "interactive study", status: "CONSTRUCTED EXAMPLE", date: undefined };
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
