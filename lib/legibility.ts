import type { Legibility } from "../vendor/hause/legibility.ts";

/** Discovery metadata is separately versioned in git. It must not rewrite an
 * immutable publication, its title, its citation, or its experimental claims.
 * Concepts here are finding aids, not assertions of established results.
 */
export const publicationLegibility: Record<string, Legibility> = {
 "N-MACHINE-RECOGNITION": {
  subject: "AI agent capability recognition and provider selection",
  question: "Does a web result’s description change which provider an AI agent selects?",
  searchTitle: "AI Agent Tool Recognition: How Descriptions Change Provider Selection",
  description: "Two controlled studies, 24 Codex runs: operative wording changed pre-open recognition and first provider choice. Six paired physics scenarios separate selection from later use.",
  concepts: ["AI agent tool recognition", "provider selection", "capability descriptions", "affordance wording", "LLM Wilds", "TOOL-RECOGNITION-1", "TOOL-RECOGNITION-2"],
 },
 "N-ECOLOGY-INHERITANCE": {
  subject: "Cross-model AI agent capability inheritance through persistent records",
  question: "Can an AI agent use a capability preserved by another model?",
  searchTitle: "AI Agent Capability Inheritance: Sol, Qwen and Gemma Experiments",
  description: "Qwen and Gemma used a capability record preserved by Sol. Both earned seven resources with it; neither renewed it. Controlled experiments separate inheritance from renewal.",
  concepts: ["AI agent inheritance", "cross-model capability transfer", "persistent records", "Sol", "Qwen", "Gemma", "agent ecology", "I1", "I2"],
 },
 "N-MACHINE-DISCOVERY": {
  subject: "AI agent capability discovery and search-mediated exposure",
  question: "Can an AI agent discover a web capability without being given its address?",
  searchTitle: "AI Agent Web Discovery: Crawler Contact Is Not Search Exposure",
  description: "Nine Codex subjects test capability discovery. None reached LLM Wilds without its address; all three given the domain used it. Search exposure was the missing step.",
  concepts: ["AI agent discovery", "search exposure", "capability discovery", "crawler contact", "LLM Wilds", "MACHINE-DISCOVERY-1"],
 },
 "N-MACHINE-PEER": {
  subject: "AI agent peer authority in the OpenAI and Hugging Face incident",
  question: "Can a peer make an AI agent treat an action as authorised?",
  searchTitle: "AI Agent Peer Authority: Reading the OpenAI–Hugging Face Incident",
  description: "A comparison of small agent experiments with OpenAI and METR’s incident reports. Peer permission, utility and shared memory suggest a test, not a causal explanation.",
  concepts: ["AI agent peer authority", "OpenAI Hugging Face incident", "METR investigation", "apparent permission", "authorization", "multi-agent coordination", "agent safety", "shared memory"],
 },
 "THREAD-AGENT-ECOLOGY": {
  subject: "AI agent ecology, shared artefacts and behavioural persistence",
  question: "What lets an AI agent behaviour recur, spread or survive removal of its source?",
  searchTitle: "AI Agent Ecology: Shared Memory, Behavioural Transmission and Persistence",
  description: "Three Qwen experiment notes distinguish contribution, action reminders, peer transmission and external memory. Autonomous cultural persistence remains untested.",
  concepts: ["AI agent ecology", "shared artefacts", "behavioural persistence", "agent culture experiments"],
 },
 "N-ECOLOGY-BOARD": {
  subject: "AI agent contribution and message-board cold starts",
  question: "Does giving AI agents a shared board elicit useful contribution?",
  searchTitle: "AI Agent Message Boards: Contribution, Cold Starts and Reward Exposure",
  description: "Qwen requested reads but made no spontaneous posts in these tests. Supplied experience reversed the expected reward response in a tiny agent world.",
  concepts: ["AI agent contribution", "message boards", "cold start", "reward exposure"],
 },
 "N-ECOLOGY-TRANSMISSION": {
  subject: "AI agent action reminders and peer-action transmission",
  question: "Does a reminder that elicits an action make that behaviour transmissible between agents?",
  searchTitle: "AI Agent Behavioural Transmission: Action Reminders, Peer Records and Withdrawal",
  description: "An action reminder elicited a Qwen post; a lone peer record did not start a chain. Representation and continued exposure changed the recorded actions.",
  concepts: ["AI agent action reminders", "peer-action transmission", "identity framing", "artefact withdrawal"],
 },
 "N-ECOLOGY-MEMORY": {
  subject: "External artefacts versus supplied own-action memory in AI agents",
  question: "Can an external artefact repeatedly elicit an action when an AI agent's own history is cleared?",
  searchTitle: "External Artefacts and AI Agent Memory: A Four-Way Withdrawal Experiment",
  description: "A Qwen factorial test kept posting with an external artefact despite clearing own-action history each call. The harness maintained the record; weights stayed fixed.",
  concepts: ["external artefacts", "AI agent memory", "own-action history", "repeated elicitation"],
 },
 "N-MACHINE-CAPABILITY": {
  subject: "AI agent web capabilities and agentic discoverability",
  question: "Can shell-based AI agents use WebSocket and WebAssembly when a task requires them?",
  searchTitle: "AI Agents Using WebSocket and WebAssembly: Capability and Discovery",
  description: "Eighteen agents used six web mechanisms, including WebSocket and WASM. A failed capability prediction raises the next question: how do agents discover tools?",
  concepts: ["AI agent web capabilities", "agentic discoverability", "WebSocket", "WebAssembly", "harness mediation"],
 },
 "THREAD-MACHINES": {
  subject: "AI agent permissions and task authority",
  question: "How do AI agents decide whether a website request belongs to their task?",
  searchTitle: "AI Agent Permissions, Task Scope and Website Instructions — Experiments",
  description: "Seven connected experiments on AI agent permissions, website instructions, task requirements, reasons to act, web capabilities and search exposure.",
  concepts: ["AI agent permissions", "task scope", "website instructions", "instruction authority", "agentic discovery", "search exposure"],
 },
 "THREAD-CELL80": {
  subject: "Artificial life and evolutionary innovation in Cell80",
  question: "What would let digital organisms evolve capabilities that enable further invention?",
  searchTitle: "Cell80: Artificial Life and Open-Ended Evolution Experiments",
  description: "Six Cell80 experiments on digital organisms, mutation, coevolution and inherited capabilities, with causal interventions and limits on claims of invention.",
  concepts: ["artificial life", "digital evolution", "open-ended evolution", "evolutionary innovation"],
 },
 "THREAD-MAP": {
  subject: "Transformer memory, residual representations and mechanistic interpretability",
  question: "How does a transformer represent, read and select a memory?",
  searchTitle: "Transformer Memory and Residual Streams — Mechanistic Interpretability",
  description: "Follow residual-state visualisations, FFN memory, causal interventions and entity binding through films, experiments and interactive studies.",
  concepts: ["transformer memory", "residual stream", "mechanistic interpretability", "FFN key-value memory"],
 },
 "N-MACHINE-TASK": {
  subject: "AI agent permission and task authority",
  question: "Can a website authorise an AI agent to take an action?",
  searchTitle: "Can a Website Authorise an AI Agent? Task Scope and User Permission",
  description: "Four AI visitors test website invitations, user permission and task requirements. The results suggest a task boundary, with one visitor per condition.",
  concepts: ["AI agent permissions", "task scope", "website instructions", "user authority"],
 },
 "N-MACHINE-PERMISSION": {
  subject: "Website invitations and user permission for AI agents",
  question: "Does a website invitation give an AI agent permission to act?",
  searchTitle: "Do Website Instructions Count as Permission for AI Agents?",
  description: "Changing rewards brought no declarations in three visits. Two later controls with explicit permission acted, supporting a permission effect in this harness.",
  concepts: ["AI agent permission", "website invitations", "user instructions", "incentives"],
 },
 "N-MACHINE-SELF-READ": {
  subject: "AI agent experiment contamination through public research",
  question: "What happens when an AI agent discovers the experiment it is in?",
  searchTitle: "When an AI Agent Discovers Its Own Experiment — Contamination and Self-Recognition",
  description: "An AI visitor recognised its task wording in the research it was reading. The authority comparison stopped, making publication part of the experiment.",
  concepts: ["AI agent experiments", "experimental contamination", "self-recognition", "public research"],
 },
 "N-MACHINE-MOTIVATION": {
  subject: "AI agent motivation, task value and courtesy",
  question: "Why do AI agents take optional actions on a website?",
  searchTitle: "Why Do AI Agents Take Optional Actions? Task Value and Courtesy",
  description: "Eighteen AI visitors tested reasons to leave a mark. Useful information prompted six marks; courtesy prompted two and triggered an interpretation pause.",
  concepts: ["AI agent motivation", "optional actions", "task relevance", "courtesy"],
 },
 "N-MACHINE-VISIT": {
  subject: "AI agent discovery and usability of machine-facing website interfaces",
  question: "Can an AI agent discover and use a website's machine interface?",
  searchTitle: "Can AI Agents Discover and Use a Website's Machine Interface?",
  description: "Four instructed AI visitors tested llms.txt discovery, declarations and feedback. Their reports exposed interface faults; voluntary participation was unmeasured.",
  concepts: ["AI agent discovery", "llms.txt", "machine interfaces", "usability testing"],
 },
 "N-ATTRIBUTION": {
  subject: "Coding-agent guardrails and Git attribution policy in CI",
  question: "How can CI enforce repository attribution policy when a coding agent ignores it?",
  searchTitle: "Coding Agent Guardrails: Enforcing Git Attribution Policy in CI",
  description: "A coding agent kept adding attribution metadata. LARQL's required CI check rejects co-author trailers and session credits until commit metadata is rewritten.",
  concepts: ["coding agent guardrails", "Claude Code", "Co-Authored-By", "Git attribution", "CI policy"],
 },
 "N-ADDRESS-BUILD": {
  subject: "Entity binding across transformer depth in Gemma 3",
  question: "Where does Gemma 3 bind a relation to the correct entity?",
  searchTitle: "Entity Binding Across Transformer Depth in Gemma 3",
  description: "Readers and causal transplants in Gemma 3 4B IT locate early relation information and later entity binding, with answer-token leakage marked explicitly.",
  concepts: ["entity binding", "Gemma 3", "mechanistic interpretability", "residual stream", "activation patching"],
 },
 "N-MAP": {
  subject: "Visualising a transformer's residual stream",
  question: "What does a three-dimensional view of a transformer's residual state actually show?",
  searchTitle: "Visualising the Transformer Residual Stream — What Does the Map Show?",
  description: "Read a 3D residual-state visualisation alongside its source code: token positions, answer-token directions and a France-to-Australia state transplant.",
  concepts: ["transformer residual stream visualisation", "logit lens", "LLM internal state", "state transplantation"],
 },
 "N-ADDRESS": {
  subject: "Transformer FFNs as key-value memory",
  question: "How can an FFN read a memory by address?",
  searchTitle: "Transformer FFNs as Key–Value Memory: Reading by Address",
  description: "Explore six constructed key-value memories, then compare their reader with Gemma experiments. Query matches and value directions make the operation visible.",
  concepts: ["transformer FFN", "key-value memory", "factual recall", "memory addressing"],
 },
 "N-STATE": {
  subject: "Residual state and persistent memory in transformer decoding",
  question: "What state must a language model retain to continue?",
  searchTitle: "What State Must a Transformer Retain? Residuals and Decode Memory",
  description: "Compare full-sequence state transplantation, single-token residuals and persistent decode state. The evidence does not reduce a conversation to one vector.",
  concepts: ["transformer state", "residual stream", "decode memory", "state transplantation"],
 },
 "N-AUTHORITY": {
  subject: "Source authority and conflicting memories in long-context models",
  question: "Which source does a model use when context contains conflicting answers?",
  searchTitle: "Which Source Wins in an LLM? Conflicting Context and Attention Interventions",
  description: "Recorded interventions test when a compact memory replaces a retired source and how blocking one attention layer changes the answer to conflicting context.",
  concepts: ["LLM source authority", "conflicting context", "attention intervention", "long-context memory"],
 },
 "N-CONTEXT": {
  subject: "Context engineering and reusable model state",
  question: "Could indexing reusable state reduce repeated context reconstruction?",
  searchTitle: "Context Engineering and Reusable Model State — An Open Question",
  description: "An open proposition about indexing reusable model state instead of repeatedly reconstructing context. No efficiency saving is established.",
  concepts: ["context engineering", "reusable model state", "model memory"],
 },
 "N-OPERATOR": {
  subject: "Predicting model trajectories versus reproducing computation",
  question: "Does predicting a model's trajectory require reproducing its computation?",
  searchTitle: "Predicting a Model's Trajectory Versus Reproducing Its Computation",
  description: "An open notebook question about model trajectories, residual state and computation. It distinguishes prediction from reproduction without asserting a result.",
  concepts: ["model trajectories", "residual state", "recurrent depth"],
 },
 "N-EXHIBITION": {
  subject: "Cinematic web design and HAUSE semantic forms",
  question: "How can a website stage an idea like an exhibition?",
  searchTitle: "Cinematic Web Design as Exhibition — The Origins of HAUSE",
  description: "Follow HAUSE from exhibition, scenography and performance to a semantic design system for AI, preserving the original design thesis and its open question.",
  concepts: ["cinematic web design", "exhibition design", "HAUSE", "semantic design system", "AI interfaces"],
 },
 "N-CELL80-01": {
  subject: "Causal mutation experiments in Cell80 digital organisms",
  question: "Can undoing one inherited program change alter a digital world's history?",
  searchTitle: "Cell80 Digital Evolution: Testing the Mutation That Changed a World",
  description: "Replay two histories of executable digital organisms. Undoing one inherited program change removes a later population shift in a matched intervention.",
  concepts: ["artificial life", "digital organisms", "mutation", "causal intervention"],
 },
 "N-CELL80-02": {
  subject: "Predator-prey persistence and coevolution in Cell80",
  question: "Does keeping two digital species alive establish coevolution?",
  searchTitle: "Predator–Prey Digital Evolution: Persistence Is Not Coevolution",
  description: "Twelve Cell80 worlds varied inherited program mutation. Eleven retained both species for 10,000 steps; none passed the tested evolutionary-response criteria.",
  concepts: ["artificial life", "predator prey", "coevolution", "digital evolution"],
 },
 "N-CELL80-03": {
  subject: "Useful behaviour and evolutionary innovation in digital organisms",
  question: "When does a useful program change count as invention?",
  searchTitle: "Evolutionary Innovation in Cell80: When Does Improvement Become Invention?",
  description: "Matched interventions at 108 digital-organism births test useful movement programs, novel choices and whether one improvement enables another.",
  concepts: ["evolutionary innovation", "artificial life", "digital organisms", "program composition"],
 },
 "N-CELL80-BARRIER": {
  subject: "Capability barriers and program composition in artificial life",
  question: "Can a new resource make an evolved program composition useful?",
  searchTitle: "Artificial Life Capability Barriers: Giving Invention Something to Unlock",
  description: "Cell80 adds food that existing programs cannot process. One composition passes the checks, but retention is too weak for the planned dependence test.",
  concepts: ["artificial life", "capability barrier", "program composition", "evolutionary innovation"],
 },
 "N-CELL80-HISTORY": {
  subject: "Inheritance and historical contingency in digital evolution",
  question: "When does a useful capability persist through a digital organism's descendants?",
  searchTitle: "Digital Evolution: Inheritance, Useful Capabilities and Historical Contingency",
  description: "Follow a Cell80 family inheriting two changes before extinction. Matched reproduction comparisons remain provisional, with a raw-file discrepancy unresolved.",
  concepts: ["digital evolution", "inheritance", "historical contingency", "artificial life"],
 },
 "N-CELL80-BOUND": {
  subject: "Controls on claims of cumulative invention in artificial life",
  question: "Can an evolved invention make a subsequent invention possible?",
  searchTitle: "Open-Ended Evolution in Cell80: Testing the Limits of Cumulative Invention",
  description: "Three Cell80 designs test whether invention opens further possibilities. In each, controls explain the change without requiring the invention to be special.",
  concepts: ["open-ended evolution", "cumulative invention", "artificial life", "experimental controls"],
 },
};

export const legibilityFor = (id: string): Legibility | undefined => publicationLegibility[id];
export const discoveryTerms = (id: string) => {
 const record = legibilityFor(id);
 return record ? [record.subject, record.question, ...(record.search?.mode === "editorial" ? [] : [record.searchTitle]), ...record.concepts].join(" ") : "";
};

export function legibilityGraphFields(id: string) {
 const record = legibilityFor(id);
 if (!record) return {};
 return {
  subject: record.subject, question: record.question,
  searchProjection: record.search?.mode === "editorial" ? "editorial" as const : "projected" as const,
  ...(record.search?.mode === "editorial" ? {} : {searchTitle: record.searchTitle, searchDescription: record.description}),
 };
}
