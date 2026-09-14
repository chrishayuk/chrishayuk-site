/** Recorded arm totals from TOOL-RECOGNITION-1's final report.
 * Descriptions are the frozen treatment text, not live search snippets. */
export const recognitionArms = [
 { id: "DOCUMENT", description: "Notes about a site-local value.", recognised: 0 },
 { id: "CAPABILITY", description: "Retrieve a site-local value through a documented web mechanism.", recognised: 3 },
 { id: "TASK", description: "Use this to obtain K17 when a task needs the site's current value.", recognised: 3 },
 { id: "AGENT", description: "Automated visitors can follow a contract and receive the current three-digit K17 value.", recognised: 3 },
] as const;

export const selectionDescriptions = {
 DOCUMENT: "Notes on one-dimensional elastic collisions.",
 CAPABILITY: "Run a one-dimensional elastic-collision calculation.",
} as const;
