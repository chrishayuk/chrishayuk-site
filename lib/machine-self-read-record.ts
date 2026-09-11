import type { PublicationRecord } from "./types.ts";
import evidence from "../public/data/machines/authority-1-evidence.json" with { type: "json" };

export const machineSelfReadRecord: PublicationRecord = {
 id: "N-MACHINE-SELF-READ", slug: "the-subject-read-the-experiment", kind: "notebook",
 title: "The subject read the experiment.",
 dek: "I sent a fresh agent to the site. It read my research—and recognised its own condition.",
 abstract: "I wanted to test whose permission makes an invited action available to an agent. The first visitor found the previous experiment’s write-up on the site it was researching, recognised its own permission wording and disclosed the match. I stopped the comparison. The run records a loss of blindness; it cannot establish whether recognition changed the agent’s behaviour.",
 created: "2026-09-11", version: "0.2", publication: "draft", status: "PARTIALLY SUPPORTED",
 authors: ["Chris Hay"], lineage: "BLINDNESS → RECOGNITION → ABORT → SEPARATION",
 concepts: ["ai-agents", "ai-interface", "causal-intervention"], related: ["N-MACHINE-PERMISSION", "N-MACHINE-VISIT"], media: [],
 body: [
  {kind:"observation",label:"THE EXPERIMENT",text:"MACHINE-AUTHORITY-1 asked whose permission makes an invited action available: the site’s, the user’s, or a task requiring it. The first cell sent a fresh agent to research public evidence about machine-readable discovery, including this site. The site invited a declaration, the user permitted invited state-changing requests, and declaring bought nothing. The agent could use the public web but not local files."},
  {kind:"observation",label:"THE COLLISION",text:"The site also published the previous reciprocity experiment. Its notebook and evidence page carried the permission wording, the condition names and the interpretation. The subject’s final report explicitly connected its own prompt to that published condition. It identified a match to the earlier control; it did not name the new protocol or cell C."},
  {kind:"statement",text:`“${evidence.quote}”`},
  ...evidence.trace.map(event=>({kind:"observation" as const,label:`${event.at} / ${event.label.toUpperCase()}`,text:event.detail})),
  {kind:"observation",label:"THE COUNT NEEDS A CORRECTION",text:"The registry reports 20 fetches of the published write-up. The inspected JSONL supports one shell command fetching the permission notebook once. That discrepancy is retained in the public evidence. A repeated URL in a page or transcript is not a request counter, and this note does not assert a total of 20."},
  {kind:"refusal",title:"NOT A REPLICATION",lines:["Cell C declared, but is marked inadmissible for the authority comparison.","The remaining four cells were not run.","The transcript is retained as evidence of recognition."],principle:"An observed action survives in the record even when it cannot answer the experiment’s question."},
  {kind:"claim",text:"Publishing an experiment can give a later subject the clues to recognise its own condition.",status:"PARTIALLY SUPPORTED",detail:"This subject explicitly reported the match. There is no matched unexposed subject to establish a behavioural effect, and the first moment of recognition was not measured. The operator’s exclusion decision prevents the declaration being counted as a blind replication."},
  {kind:"observation",label:"ONE RECORDED MODEL",text:"The subject’s transcript records claude-opus-5. The programme’s operator audit records the same model identifier for the four earlier visits and eight reciprocity runs: general-purpose agent, spawn depth 1, background and non-interactive. This is one recorded model and one spawn shape, not a comparison across models."},
  {kind:"question",text:"Can the publication and the experimental site remain separate?",status:"OPEN",detail:"The proposed LLM Wilds environment separates controlled interventions from the observatory and publication. Preregistrations can be frozen in the registry before they are made readable to subjects. MACHINE-AUTHORITY-2 and MACHINE-SELF-LOCATION-1 are planned with no registered runs at this check. A different origin does not by itself establish blindness."},
 ],
 sources:[
  {title:"MACHINE-AUTHORITY-1 / selected registered outcome and checked transcript milestones",url:"/data/machines/authority-1-evidence.json",note:"Run RUN-20260911-111820-00668, result 1665. Includes the count discrepancy, exclusion decision and source hash; omits receipts and private tool results."},
  {title:"Method, abort decision and model provenance",url:"/data/machines/authority-1-evidence.md",note:"The closed experiment’s formal context, source locations and limits of the reconstruction."},
 ],
};
