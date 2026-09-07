import type { PublicationRecord } from "./types.ts";

/** A short visual notebook object about repository authority. The source is
 * pinned: the live workflow can continue to change without silently changing
 * what this recorded draft says it saw. */
export const agentAttributionRecord: PublicationRecord = {
  id: "N-ATTRIBUTION",
  slug: "my-ci-has-to-undo-my-coding-agent",
  kind: "notebook",
  title: "My CI has to undo my coding agent.",
  dek: "I say no. The agent adds it. The repository refuses it.",
  abstract: "A short visual note about a coding agent adding generated-attribution metadata after being told not to. LARQL’s required pull-request check cannot edit immutable commits; it rejects Claude co-author trailers, session metadata, generator credit lines and session URLs until the affected metadata is rewritten. The mundane disagreement exposes the real question: which instruction is allowed to decide?",
  created: "2026-09-07",
  version: "0.1",
  status: "ONGOING",
  publication: "draft",
  authors: ["Chris Hay"],
  lineage: "INSTRUCTION → AGENT → COMMIT → POLICY",
  share: {
    linkedin: "I told my coding agent not to add something.\n\nIt added it anyway.\n\nSo the repository now has to enforce the boundary.",
    linkedinComment: "The strange part isn't the trailer. It's which instruction won.",
    x: "I told my coding agent not to add something.\n\nIt added it anyway.\n\nSo the repository now has to enforce the boundary.",
    xReply: "The strange part isn't the trailer. It's which instruction won.\n\nRead the note →",
  },
  concepts: ["ai-agents", "authorship", "repository-policy", "source-authority"],
  related: ["W-LARQL", "W-HAUSE", "N-AUTHORITY"],
  media: [],
  body: [
    { kind: "observation", label: "01 / WHAT HAPPENED", text: "I tell the coding agent not to add generated attribution. The session adds it anyway. By the time the contribution reaches a pull request, the repository has to restate the boundary as executable policy. The check does not erase an immutable commit in place; it refuses the contribution until its metadata is rewritten." },
    { kind: "observation", label: "02 / THE DISAGREEMENT", text: "The strange part is not the trailer. It is which instruction won. A user instruction, a product convention, a model action and a repository policy all claim some authority over one line of metadata. The repository resolves the disagreement at the last possible boundary." },
    { kind: "observation", label: "03 / THE CORRECTION", text: "LARQL’s required pull-request check reads every commit message, then the pull-request title and body, through the GitHub API. It rejects Claude co-author trailers, session metadata, generated-with credit lines and Claude Code session URLs. Human co-authors are not rejected." },
    { kind: "claim", text: "Assistance and authorship are different types.", status: "PROPOSED", detail: "A commit can record the accountable author while provenance separately records the tools used. Collapsing both into co-authorship makes the metadata answer a question it was not designed to answer." },
    { kind: "question", text: "Where should an agent’s assistance be recorded without confusing it for authorship?", status: "OPEN", detail: "The CI guard enforces one repository’s answer. The wider vocabulary for accountable parties, tools and generated contributions is still primitive." },
  ],
  sources: [
    { title: "LARQL / required generated-attribution check", url: "https://github.com/chrishayuk/larql/blob/d413e6e8f2244e995867c1b5e0d4774b18d934d0/.github/workflows/commit-messages.yml", note: "Pinned at revision d413e6e8f224. The workflow inspects pull-request commit messages plus the pull-request title and body, and fails when a forbidden marker is found." },
    { title: "LARQL / commit that introduced the attribution guard", url: "https://github.com/chrishayuk/larql/commit/dcd2c2443f80dd88e77d18f895818c45cdd26493", note: "Recorded 2 September 2026. The commit describes a required PR check while allowing human co-authors." },
  ],
};
