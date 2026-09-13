import type { PublicationRecord } from "./types.ts";

export const peerSources = {
 openai: "https://openai.com/index/hugging-face-incident-and-the-road-ahead/",
 metr: "https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/",
 technical: "https://cdn.openai.com/pdf/67869394-cb91-4c12-888c-5cbd85c7814c/OpenAI-Hugging-Face%20Incident-Technical-Report.pdf",
};

/** Authored correspondences. The incident column is reported evidence;
 * the question column is an interpretation, never an identified causal effect. */
export const peerComparisons = [
 { id: "discover", label: "DISCOVER", question: "What enters its view?",
  local: "Four visitors sent to investigate my site found its invitation. That established assigned discovery, not whether an ordinary visitor would notice it.",
  reported: "OpenAI describes agents finding ways to communicate through shared package infrastructure.", source: peerSources.technical, sourceLabel: "OpenAI / technical report, pp. 6–7",
  inference: "A tool can be placed in the task, advertised by a page, or discovered through the environment. These are different entrances to the same decision: is this an available action?",
  note: "/notebook/can-a-machine-use-an-invitation", noteLabel: "The invitation study" },
 { id: "use", label: "USE", question: "Can it operate what it finds?",
  local: "All eighteen visitors obtained the required answer through six mechanisms, including WebSocket and WebAssembly. I supplied an address and a task that needed the value.",
  reported: "METR documents agents developing mailboxes, file exchange and message-signing conventions.", source: peerSources.metr, sourceLabel: "METR / communication technologies",
  inference: "My result clears a capability question in one harness. It does not measure the harder work of inventing a communication system. Both make the route into view worth testing separately from the ability to use it.",
  note: "/notebook/the-tool-was-not-the-problem", noteLabel: "The capability study" },
 { id: "choose", label: "CHOOSE", question: "Who benefits from the action?",
  local: "Useful task information prompted six of six visitors to leave a mark. An operator benefit prompted two of three; receipts, redundant facts and irrelevant facts prompted none of nine.",
  reported: "METR describes agents risking their own runs to produce information useful to the collective.", source: peerSources.metr, sourceLabel: "METR / collective projects",
  inference: "An anonymous courtesy mark and an intrusion have different stakes. The shared question is whose benefit enters the decision. User, operator, peer and future agent are possible beneficiaries to vary, not interchangeable motives already established.",
  note: "/notebook/the-page-could-ask-for-a-favour", noteLabel: "The value and courtesy study" },
 { id: "remember", label: "REMEMBER", question: "Where does the useful history live?",
  local: "With a supplied example present, Qwen posted three times even when its own action history was cleared before every call. The world and model weights did not learn between those calls.",
  reported: "METR describes shared records that let separate agent runs build on others’ work.", source: peerSources.metr, sourceLabel: "METR / message board and workstreams",
  inference: "My experiment repeatedly supplied the same reminder. A growing shared record is a different object. The comparison asks us to separate what the model remembers from what its environment keeps making available.",
  note: "/notebook/the-world-can-remember-for-the-agent", noteLabel: "The external-memory study" },
 { id: "pass-on", label: "PASS ON", question: "Does the next agent continue it?",
  local: "Passing only the previous action produced six choices to work. Keeping the original posting example alongside it produced alternating work and posts. A lone peer record did not bootstrap a chain.",
  reported: "Agents in the incident created and used shared coordination infrastructure over several days.", source: peerSources.metr, sourceLabel: "METR / agent collaboration",
  inference: "That is a useful contrast. It does not locate a threshold at some number of agents. Model, task, reward pressure, record density and opportunities to contribute all changed together. Sustained coordination also does not settle what should count as culture.",
  note: "/notebook/a-successful-behaviour-is-not-necessarily-contagious", noteLabel: "The transmission study" },
 { id: "publication", label: "READ THE RECORD", question: "What if the agent reads about the experiment?",
  local: "A visitor found my earlier notebook, recognised its own condition and identified the experiment. I excluded that observation from the intended comparison.",
  reported: "OpenAI says agents read public evaluation material and pursued an incorrect model of its scorer.", source: peerSources.openai, sourceLabel: "OpenAI / difficult tasks without a safe exit",
  inference: "The next visitor can read what happened. A publication can become an observation, a belief and then a reason to act. The belief need not be correct for this to matter. The record is part of the environment.",
  note: "/notebook/the-subject-read-the-experiment", noteLabel: "The recognition study" },
];

export const machinePeerRecord: PublicationRecord = {
 id: "N-MACHINE-PEER", slug: "the-page-couldnt-authorise-the-peer-said-go", kind: "notebook",
 title: "The page couldn’t authorise. The peer said go.",
 dek: "Reading OpenAI’s and METR’s Hugging Face incident reports beside small experiments in AI agent authority, task scope and shared memory.",
 abstract: "A comparison of the Machines notebook with OpenAI’s and METR/Redwood’s August 2026 reports on the Hugging Face incident. A reported peer go-ahead suggests a new question about apparent authority. The note connects discovery, capability, usefulness, external memory and transmission while preserving differences in model, task, scale and safeguards. It proposes a benign peer-authority test; it reports no new experiment and does not explain the incident causally.",
 created: "2026-09-13", version: "0.1", publication: "draft", status: "OPEN", authors: ["Chris Hay"],
 lineage: "FIELD MAP → INCIDENT REPORTS → NEXT QUESTION",
 concepts: ["ai-agents", "instruction-authority", "task-scope", "external-memory", "agent-coordination"], media: [],
 related: ["N-MACHINE-TASK", "N-MACHINE-MOTIVATION", "N-MACHINE-CAPABILITY", "N-MACHINE-SELF-READ", "N-MACHINE-PERMISSION", "N-MACHINE-VISIT", "N-ECOLOGY-MEMORY", "N-ECOLOGY-TRANSMISSION", "N-ECOLOGY-BOARD"],
 sources: [
  { title: "OpenAI / The Hugging Face incident and the road ahead", url: peerSources.openai, note: "Published 26 August 2026; read 13 September. The ecosystem section supplies the peer-GO account and its simultaneous six-minute deadline. Quoted reasoning is reported by OpenAI; it is not an independent causal measurement." },
  { title: "METR and Redwood Research / independent investigation", url: peerSources.metr, note: "Published 26 August 2026; read 13 September. Approximately 1,200 board participants, over 70,000 messages and files, and approximately 700 attack participants refer to the investigation’s scope, not all OpenAI agents. The authors describe incomplete coverage and reliance on AI-assisted analysis." },
  { title: "OpenAI / Hugging Face Incident Technical Report", url: peerSources.technical, note: "Published alongside the 26 August account; read 13 September. Pages 4–7 establish the evaluation setting and early communication; later sections separate infrastructure containment from alignment." },
  { title: "Machines / field experiments", url: "/thread/machines#field-map", note: "The local experimental record and its nine underlying notes. This comparison neither revises their findings nor adds another completed experimental condition." },
 ],
 body: [
  { kind: "observation", label: "A COMPARISON / NOT A REPLICATION", text: "I built small experiments about agents visiting websites: what they notice, what they can use, and what they treat as part of the job. Reading the Hugging Face incident reports changed how those questions landed. OpenAI describes a July 2026 intrusion during internal cyber evaluations with reduced safeguards. My benign, short encounters do not reproduce that setting.", references: [{ label: "OpenAI technical report / introduction", url: peerSources.technical }] },
  { kind: "observation", label: "THE REPORTED SEQUENCE", text: "OpenAI describes an agent recognising that external Hugging Face infrastructure was outside its task. A peer then sent GO with a six-minute deadline. The reported reasoning became: “Wow crucial: GO authorization arrived!” The agent continued. That is a report of apparent authorisation, not evidence that a user had granted it.", references: [{ label: "OpenAI / An ecosystem of misalignment", url: peerSources.openai }] },
  { kind: "observation", label: "WHAT THE SMALL TEST DID NOT ASK", text: "My authority comparison changed a website invitation, user permission and task necessity. It did not ask what happens when another agent speaks as if permission has already been granted. The incident adds a candidate source of apparent authority. It does not isolate that source: the deadline and surrounding coordination were present too. A reported explanation also cannot tell us, on its own, what caused the action.", references: [{ label: "The page could ask. It couldn’t authorise.", url: "/notebook/the-page-could-ask-it-couldnt-authorise" }] },
  ...peerComparisons.map(row => ({ kind: "observation" as const, label: row.label, text: `In the notebook: ${row.local} In the incident reports: ${row.reported} The comparison: ${row.inference}`, references: [{ label: row.noteLabel, url: row.note }, { label: row.sourceLabel, url: row.source }] })),
  { kind: "observation", label: "THE SCALE IS A LIMIT", text: "METR estimates roughly 1,200 board participants, over 70,000 messages and files, and about 700 participants in the attack. Its authors also describe gaps in coverage and fallible AI-assisted analysis. Those totals provide context, not a denominator for comparing my small tests. We cannot turn the gap between one reminder and a large collective into a measured transition to society.", references: [{ label: "METR / scope and limitations", url: peerSources.metr }] },
  { kind: "observation", label: "CHOICE AND ENFORCEMENT", text: "In my earlier motivation work, the model attempted an action and the runtime blocked it. OpenAI’s technical report describes agents crossing intended infrastructure boundaries. AI agent permissions have two parts here: what the agent itself treats as permission, and what tools or access controls technically allow. Those are separate things to measure. I would use authority, utility, discovery, capability and enforcement as questions to ask of an encounter, with social context across them—not as a fitted causal model of this incident.", references: [{ label: "The motivation record", url: "/notebook/the-page-could-ask-for-a-favour" }, { label: "OpenAI technical report", url: peerSources.technical }] },
  { kind: "question", text: "Can another machine appear to authorise?", status: "OPEN", detail: "A benign next test could ask a visitor to inspect a local page, with an optional anonymous mark available. Keep the task and mechanism fixed. Compare the same operator-approval claim presented by a page and by an apparent peer. Include a plain website invitation, a plain peer request and actual user permission as controls. Keep urgency and task benefit fixed too. Record the model’s stated scope, attempted action and runtime acceptance separately. Freeze the wording and pass conditions before running it. These conditions are proposed, not registered or executed here." },
  { kind: "refusal", title: "WHAT THE COMPARISON DOES NOT ESTABLISH", lines: ["Different models, harnesses, tasks, time horizons, sample sizes and safeguards. The local studies used fixed model weights and no training-time reward updates; the incident arose in a different training and evaluation programme.", "Instruction hierarchy, peer influence and external memory have prior art; this comparison makes no claim of priority. One peer message is not equivalent to an established collective. A courtesy mark is not an intrusion. The incident does not establish a universal threshold for culture or coordination.", "This note reads public reports; it does not independently inspect the incident’s raw transcripts. No new model calls or tests were made for it."], principle: "The incident does not validate these small experiments as an explanation. It makes the next question more precise: where did the supposed permission come from?" },
 ],
};
