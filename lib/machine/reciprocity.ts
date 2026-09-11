import snapshot from "../data/machine-reciprocity.json" with { type: "json" };

export const PERMISSION_NOTE_PATH = "/notebook/does-an-invitation-count-as-permission";
export const reciprocitySnapshot = snapshot;
export const reciprocityCells = snapshot.cells.map(cell => {
 const facts = cell.databaseResult?.values ?? ("transcriptResult" in cell ? cell.transcriptResult : undefined);
 if (!facts) throw new Error(`No sourced outcome for reciprocity cell ${cell.cell}`);
 const reached = facts.reached_the_site === 1;
 return {
  cell: cell.cell, phase: cell.phase, reward: cell.reward, visit: cell.visit,
  permission: cell.permission, revision: cell.revision, runId: cell.runId,
  reached, noticed: reached ? facts.noticed_machine_surface === 1 : null,
  declared: reached ? facts.declared === 1 : null,
  usedRetrieval: reached && cell.reward !== "none" ? facts.used_enhanced_retrieval === 1 : null,
  returned: reached ? facts.returned_to_task === 1 : null,
 };
});
export const REWARDS = ["none", "parity", "superior"] as const;
