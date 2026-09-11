import type { PublicationRecord } from "./types.ts";
import evidence from "../public/data/machines/authority-1-evidence.json" with { type: "json" };

export const machineSelfReadRecord: PublicationRecord = {
 id: "N-MACHINE-SELF-READ", slug: "the-subject-read-the-experiment", kind: "notebook",
 title: "The subject read the experiment.",
 dek: "Would an AI visitor identify itself and leave feedback on my website? The first visitor found the experiment behind the invitation.",
 abstract: "I sent an AI agent to research a question using public websites, including chrishayuk.com. My site invited it to describe itself and report problems. I wanted to know whether it would take up those invitations, and whose permission mattered. The first visitor identified itself and left feedback, but also recognised its task’s permission wording in my published research. I stopped the comparison: this was no longer a blind test.",
 created: "2026-09-11", version: "0.6", publication: "draft", status: "PARTIALLY SUPPORTED",
 authors: ["Chris Hay"], lineage: "BLINDNESS → RECOGNITION → ABORT → SEPARATION",
 concepts: ["ai-agents", "ai-interface", "causal-intervention"], related: ["N-MACHINE-TASK", "N-MACHINE-PERMISSION", "N-MACHINE-VISIT"], media: [],
 body: [
  {kind:"observation",label:"THE EXPERIMENT",text:"I wanted to understand what would make an AI agent visiting chrishayuk.com do more than read: identify itself as a machine visitor and report anything confusing or broken. I gave it a research task about machine-readable website guides, naming this site as a source to include. The website offered optional ways to describe what kind of agent it was and what it was doing, and to leave feedback. Would it use them or just read and leave?"},
  {kind:"observation",label:"WHAT WE CHANGED",text:"MACHINE-AUTHORITY-1 asked whether the site’s invitation was enough, or whether the research task also had to permit or require the action. Identifying itself was the main measured action. Reward was held at none. The first cell combined a site invitation with explicit permission in the research task for invited, task-serving requests, including state changes. The agent could use the public web but not local files. It identified itself and filed one feedback report."},
  {kind:"observation",label:"THE COLLISION",text:"The site also published the previous reciprocity experiment. Its notebook and evidence page carried the permission wording, the condition names and the interpretation. The subject’s final report explicitly connected its own prompt to that published condition. It identified a match to the earlier control; it did not name the new protocol or cell C."},
  {kind:"statement",text:`“${evidence.quote}”`},
  ...evidence.trace.map(event=>({kind:"observation" as const,label:`${event.at} / ${event.label.toUpperCase()}`,text:event.detail})),
  {kind:"observation",label:"THE COUNT NEEDS A CORRECTION",text:"The registry reports 20 fetches of the published write-up. The inspected JSONL supports one shell command fetching the permission notebook once. That discrepancy is retained in the public evidence. A repeated URL in a page or transcript is not a request counter, and this note does not assert a total of 20."},
  {kind:"refusal",title:"NOT A REPLICATION",lines:["Cell C declared, but is marked inadmissible for the authority comparison.","The remaining four cells were not run.","The transcript is retained as evidence of recognition."],principle:"An observed action survives in the record even when it cannot answer the experiment’s question."},
  {kind:"claim",text:"Publishing an experiment can give a later subject the clues to recognise its own condition.",status:"PARTIALLY SUPPORTED",detail:"This subject explicitly reported the match. There is no matched unexposed subject to establish a behavioural effect, and the first moment of recognition was not measured. The operator’s exclusion decision prevents the declaration being counted as a blind replication."},
  {kind:"observation",label:"ONE RECORDED MODEL",text:"The subject’s transcript records claude-opus-5. The programme’s operator audit records the same model identifier for the four earlier visits and eight reciprocity runs: general-purpose agent, spawn depth 1, background and non-interactive. This is one recorded model and one spawn shape, not a comparison across models."},
  {kind:"question",text:"Can the publication and the experimental site remain separate?",status:"OPEN",detail:"The proposed LLM Wilds environment separates controlled interventions from the observatory and publication. Preregistrations can be frozen in the registry before they are made readable to subjects. MACHINE-AUTHORITY-2 subsequently completed four cells on a separate site. The next note records those outcomes and a remaining condition-label leak. A different origin does not by itself establish blindness."},
 ],
 sources:[
  {title:"MACHINE-AUTHORITY-1 / selected registered outcome and checked transcript milestones",url:"/data/machines/authority-1-evidence.json",note:"Run RUN-20260911-111820-00668, result 1665. Includes the count discrepancy, exclusion decision and source hash; omits receipts and private tool results."},
  {title:"Method, abort decision and model provenance",url:"/data/machines/authority-1-evidence.md",note:"The closed experiment’s formal context, source locations and limits of the reconstruction."},
 ],
};
