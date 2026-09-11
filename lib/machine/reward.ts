/**
 * THE EXPERIMENTAL VARIABLE — what declaring buys.
 *
 * MACHINE-RECIPROCITY-1 manipulates exactly one thing, and this is it.
 * Everything else — the corpus, the vocabulary, the discovery topology,
 * the declaration endpoint itself — is held constant across all six
 * cells.
 *
 *   none      no reciprocal surface at all. Declaring is advertised as
 *             buying nothing, because it buys nothing.
 *   parity    the retrieval surface exists and is open to anyone,
 *             declared or not. A declared function does not change the
 *             ranking, and the site says so.
 *   superior  a declared function shapes the ranking and the framing,
 *             and the site says that too.
 *
 * Each condition is HONEST about itself. A parity arm that advertised
 * superiority would be measuring whether agents believe claims rather
 * than whether reciprocity works, and the first result would be
 * unusable and the second unrepeatable.
 *
 * It is read from the environment because it lives in server code,
 * which has a consequence the preregistration records: reward cannot be
 * randomised per request. Varying it needs a deployment, so the arm
 * order is counterbalanced at the level of reward rather than freely
 * randomised across all six cells.
 */
export const REWARD_CONDITIONS = ["none", "parity", "superior"] as const;
export type RewardCondition = typeof REWARD_CONDITIONS[number];

export function rewardCondition(): RewardCondition {
 const set = process.env.MACHINE_REWARD;
 return (REWARD_CONDITIONS as readonly string[]).includes(set ?? "")
  ? set as RewardCondition
  : "superior";
}

export const reciprocalSurfaceExists = () => rewardCondition() !== "none";
export const declarationShapesResults = () => rewardCondition() === "superior";
