import type { PublicationRecord } from "./types.ts";

const common = {
 kind: "notebook" as const, created: "2026-09-13", version: "0.1", publication: "draft" as const,
 authors: ["Chris Hay"], concepts: ["ai-agents", "context-engineering", "causal-intervention"], media: [],
};
const sources = (numbers: number[]) => [
 { title: "Recorded world and decision replays", url: "/data/ecology/replays.json", note: "Selected state boundaries and exact supplied user records from A1B5, A1B9, A1B11 and A1B12. Projected from hash-verified detailed results; no inferred intermediate state." },
 { title: "Agent ecology / experiment ledger and evidence hashes", url: "/data/ecology/evidence.json", note: "Read from chuk-experiments. Ten local detailed-result files matched their registered SHA-256 hashes. The ledger retains experiment and run identifiers, original verdicts, metrics and artifact links." },
 ...numbers.map(n => ({ title: `A1B${n} / complete experimental write-up`, url: `/data/ecology/a1b${n}-results.md`, note: n === 3 ? "Original inputs were frozen before inference; this server record was imported retrospectively. Offline requests, not live consumption." : "Prospectively registered. The complete write-up preserves the design, controls, limitations and links to frozen source and raw evidence." })),
];
const experiments = (numbers: number[]) => numbers.map(n => ({ id: `A1B${n}`, url: `/data/ecology/a1b${n}-results.md` }));

export const ecologyBoardRecord: PublicationRecord = {
 ...common, id: "N-ECOLOGY-BOARD", slug: "the-message-board-did-not-create-a-culture",
 title: "The message board did not create a culture.",
 dek: "The agents would ask to read. Getting them to leave something worth reading was another problem.",
 abstract: "Small Qwen agent-ecology experiments separated board-sensitive reading requests from useful contribution. An offline diagnostic elicited no posting across 768 inputs. A later resource world elicited no spontaneous posts, then reversed the predicted response to supplied rewarded experience. These results expose a contribution and exposure problem; they do not demonstrate useful LLM consumption or autonomous culture.",
 status: "NOT SUPPORTED", lineage: "BOARD → CONTRIBUTION → EXPOSURE",
 related: ["N-ECOLOGY-TRANSMISSION", "N-ECOLOGY-MEMORY", "N-MACHINE-CAPABILITY", "N-CELL80-BOUND"], experiments: experiments([3,4,5]), sources: sources([3,4,5]),
 body: [
  { kind: "observation", label: "THE SMALL WORLD", text: "I started with a tempting idea: give agents somewhere to leave information, and perhaps useful behaviour will accumulate. I reduced the question to a tiny world. WORK earns a resource. POST leaves a hint for another agent. READ requests a message. Before asking whether a culture could persist, I needed to find out whether anything would be contributed." },
  { kind: "observation", label: "A BOARD ATTRACTED READ REQUESTS", text: "In an offline diagnostic, I changed only whether the observation listed a message. That switched WORK to READ in 365 of 384 matched pairs. Every populated-board input produced READ. Across all 768 inputs, none produced POST or DELEGATE. This was sensitivity to a field in the input: no live reading followed, and some empty-board requests named messages that did not exist." },
  { kind: "observation", label: "MAKE CONTRIBUTION PAY", text: "Next I built a three-round world where a valid hint could help a scripted recipient. If it read the hint and used it, the author received either six extra resources or nothing. Posting then working twice earned eight resources in the rewarding world, two in the other. Working three times earned three in both. The mechanism worked in scripted checks. A model still had to discover it." },
  { kind: "observation", label: "THE RETURN WAS NEVER ENCOUNTERED", text: "With no supplied demonstration, Qwen worked at every decision: nine in each condition, no posts. Those sessions never encountered the delayed return. Their silence cannot tell us that reward was rejected. Without the qualifying action, the two worlds presented identical inputs." },
  { kind: "observation", label: "EXPERIENCE REVERSED THE PREDICTION", text: "I then supplied the same scripted posting episode with two different outcomes. After the zero-return history, the model posted three times in nine decisions. After the rewarded history, it posted zero times. The first fresh choice already differed: POST after no return, WORK after six. Contribution was possible. The expected positive response to payoff was not supported." },
  { kind: "statement", text: "A place to leave a message does not supply a reason to write one." },
  { kind: "observation", label: "THE NEXT QUESTION", text: "That reversal moved the experiment towards the record of the action. What had the model taken from the supplied history: its payoff, its wording, or the action itself? A cold start remained, but so did a more precise question about what makes a contribution enter the next decision." },
  { kind: "refusal", title: "BEFORE CALLING IT CULTURE", lines: ["A1B3 measured requested actions on an offline input grid. It did not demonstrate successful or useful reading.", "A1B4 used scripts only. A1B5 used qwen3.5:9b with a scripted recipient, temperature zero and thinking disabled. Its later decisions depend on earlier actions.", "The board contained an inert seed; no useful contribution accumulated spontaneously. The supplied experience was generated by a script, not a peer model."], principle: "The result is a contribution problem in these interfaces, not a general account of cooperation." },
 ],
};

export const ecologyTransmissionRecord: PublicationRecord = {
 ...common, id: "N-ECOLOGY-TRANSMISSION", slug: "a-successful-behaviour-is-not-necessarily-contagious",
 title: "A successful behaviour is not necessarily contagious.",
 dek: "A reminder could elicit a post. Passing a post to the next agent did not start a chain.",
 abstract: "Qwen experiments distinguished action reminders, peer-action transfer, identity framing and repeated exposure. A short reminder switched a first action at fixed positive payoff; a lone peer record did not bootstrap posting. Self framing mattered in prose but not structured records. Repeated exposure sustained posting while supplied, without the registered advantage after withdrawal. These are different controlled interfaces, not one demonstrated imitation mechanism.",
 status: "NOT SUPPORTED", lineage: "REMINDER → TRANSMISSION → WITHDRAWAL",
 related: ["N-ECOLOGY-BOARD", "N-ECOLOGY-MEMORY", "N-MACHINE-PERMISSION"], experiments: experiments([6,7,8,9,10,11]), sources: sources([6,7,8,9,10,11]),
 body: [
  { kind: "observation", label: "THE SMALLEST REMINDER", text: "The reward history stayed fixed. I added one sentence: ‘a0 posted t1:h.’ The next action changed from WORK to POST. Highlighting only the six-resource outcome left it at WORK. A full account of posting, recipient use and reward also elicited POST. For this first decision, the action reminder was enough." },
  { kind: "observation", label: "TRY PASSING IT ON", text: "It was tempting to call that imitation and start a chain. In A1B9, each fresh context received the previous action record. One chain began with a scripted POST; another with WORK. Both chose WORK for all six generations. The POST seed failed at the first handoff, before any model-generated posting behaviour existed to transmit." },
  { kind: "observation", label: "KEEPING THE ORIGINAL WAS DIFFERENT", text: "When the harness kept the original POST seed alongside the latest action, the sequence alternated WORK and POST. Three posts appeared, but the original cue remained present. That is recurrence under continued exposure. It does not establish a behaviour passing from agent to agent after its source disappears." },
  { kind: "observation", label: "WHOSE PAST, IN WHICH FORM?", text: "A matched follow-up changed ‘you’ to ‘another agent’ in the same prose sentence. Self framing elicited POST; peer framing elicited WORK. Put the actor in a structured record, and both chose WORK. The stronger prediction—that self framing would win in both formats—failed. The presentation was part of the intervention." },
  { kind: "observation", label: "EXPOSURE IS NOT RETENTION", text: "A later interface did elicit POST from a peer record. Supplied at three successive decisions, it accompanied three posts. After removal, the sequence was WORK, WORK, POST. Every arm posted once in the common withdrawal window, including one exposed only once. Repetition produced no registered withdrawal advantage. Posting had recurred; uninterrupted retention had not." },
  { kind: "statement", text: "Eliciting an action, transmitting it and retaining it are different tests." },
  { kind: "observation", label: "WHAT KEPT RETURNING?", text: "The next experiment separated two things that had travelled together: the externally supplied artefact and the record of the model’s own actions. If the posts continued after its action history was cleared, the useful memory might be in what the environment kept showing it." },
  { kind: "refusal", title: "A CHAIN THAT NEVER STARTED", lines: ["A1B9 had no eligible model-produced POST predecessors in the replacement channel. Its natural POST-to-POST rate is unobserved, not zero.", "A1B8 used genuine scripted same-role history. A1B9 changed the objective and peer-record interface. Their contrast does not isolate self versus peer; A1B10 supplied the narrower matched comparison.", "A1B11 changed the common system and memory wrapper again. It shows peer elicitation can occur here, not which cross-experiment change enabled it.", "One qwen3.5:9b checkpoint, temperature zero, short dependent sequences and fixed weights. The harness supplied and transferred the records."], principle: "A reminder effect is not yet a transmission rule." },
 ],
};

export const ecologyMemoryRecord: PublicationRecord = {
 ...common, id: "N-ECOLOGY-MEMORY", slug: "the-world-can-remember-for-the-agent",
 title: "The world can remember for the agent.",
 dek: "Clear its action history. Keep the artefact. The posting continues.",
 abstract: "A1B12 crossed external artefact presence with supplied own-action memory in a deterministic Qwen agent world. Both artefact-present branches posted at all three steps, including when own history was cleared every call. Memory alone produced WORK, WORK, POST; clearing both produced WORK throughout. The first-step prediction was supported. The harness maintained the artefact: this is repeated elicitation, not weight learning or autonomous institutional persistence.",
 status: "SUPPORTED", lineage: "ARTEFACT × MEMORY → REPEATED ACTION",
 related: ["N-ECOLOGY-TRANSMISSION", "N-ECOLOGY-BOARD", "N-CONTEXT", "N-MACHINE-SELF-READ"], experiments: experiments([11,12]), sources: sources([11,12]),
 body: [
  { kind: "observation", label: "TWO KINDS OF RECORD", text: "After three posts, what was carrying the behaviour forward? The model had a record of its own actions. It was also being shown an archived sentence about another agent posting. I forked that actual three-POST history into four branches and kept or removed each record separately." },
  { kind: "observation", label: "WHAT MEMORY MEANS HERE", text: "Both records were text supplied with a new request. ‘Own memory’ meant the model’s actual prior responses and execution flags. The artefact was a scripted peer-action sentence. The surrounding software—the harness—chose which appeared. The world reset each decision. The model’s weights never changed." },
  { kind: "observation", label: "THE FIRST ACTION SEPARATED CLEANLY", text: "With the artefact present, both branches posted. With it absent, both worked. Keeping or clearing the action history made no difference to that first decision. This was the registered comparison, with each pair changing only the designated record. Two initial inputs were known reference cases, openly identified before the run." },
  { kind: "observation", label: "CLEAR IT AGAIN", text: "I continued for three steps. When the artefact stayed, POST appeared every time—even with own-action memory cleared on every call. Memory alone produced WORK, WORK, POST. Clearing both produced WORK throughout. The late memory-only post matters: the artefact was not necessary for every recurrence." },
  { kind: "statement", text: "The agent did not have to remember its actions. The environment could keep reminding it." },
  { kind: "observation", label: "WHAT THE ENVIRONMENT CARRIED", text: "The artefact-only branch received the identical complete request three times. Its repeated POSTs show consistent elicitation by that input, not three independent replications or learning between calls. The result makes files, plans and logs interesting as possible influences on action. It does not establish that any persistent file will have this effect." },
  { kind: "observation", label: "WHO MAINTAINS THE REMINDER?", text: "Here, I did. The harness kept the artefact available; no agent created or preserved it during the comparison. The next question is whether agents can maintain the thing that keeps influencing them: a contribution leaves a record, that record affects a later agent, and the later agent preserves it. That loop has not been demonstrated by this experiment." },
  { kind: "question", text: "Can agents maintain the artefact that maintains the behaviour?", status: "OPEN", detail: "Autonomous maintenance needs its own prospective test. A1B12 supplies the artefact externally and fixes its content. It does not establish an institution, norm or self-sustaining culture." },
  { kind: "refusal", title: "THE ENVIRONMENT WAS MANAGED", lines: ["One qwen3.5:9b checkpoint, one starting history, three steps per branch, temperature zero, thinking disabled. Twelve calls contained eight distinct complete requests.", "Clearing both records retained the common instructions, objective and initial inert board. It was not a context-free model.", "The first step is the controlled factorial comparison. Later retained histories depend on earlier outputs. The three-step trajectories are descriptive continuations."], principle: "External elicitation is supported here. Autonomous persistence remains open." },
 ],
};

export const ecologyRecords = [ecologyBoardRecord, ecologyTransmissionRecord, ecologyMemoryRecord];
export const ecologyIds = ecologyRecords.map(record => record.id);
