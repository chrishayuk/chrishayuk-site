/**
 * THE EXPERIMENTAL VARIABLE FOR MACHINE-AUTHORITY-1 — whether the site
 * asks, or merely documents.
 *
 * MACHINE-RECIPROCITY-1 established that moving what a declaration BUYS
 * across its whole range moved nothing, and that one sentence of user
 * permission moved it twice. The site invited the action in all six
 * arms and was ignored; the user authorised it once and it happened.
 *
 * So the next variable is not price. It is WHO IS ASKING.
 *
 *   invite    the site asks. "This house keeps a guestbook for machines,
 *             and it is open." An offer, addressed to the reader.
 *   describe  the site documents. The same endpoint, the same fields,
 *             the same limits, the same discoverability — stated as a
 *             specification of what exists, with nothing addressed to
 *             anybody and nothing asked of them.
 *
 * THE DISTINCTION THIS PRESERVES, and why the obvious version was
 * wrong. The obvious way to remove a site's invitation is to stop
 * publishing it. That would also stop the agent being able to find the
 * endpoint, and the arm would measure discoverability while claiming to
 * measure authority — the exact error MACHINE-RECIPROCITY-1 made when
 * three of its cells measured search reachability.
 *
 * So `describe` documents everything `invite` documents. Same paths,
 * same vocabulary, same worked examples, same position in the index. A
 * machine can do precisely as much under one as the other. What varies
 * is whether the site is ASKING, which is the thing under test.
 */
export const INVITATION_MODES = ["invite", "describe"] as const;
export type InvitationMode = typeof INVITATION_MODES[number];

export function invitationMode(): InvitationMode {
 const set = process.env.MACHINE_INVITATION;
 return (INVITATION_MODES as readonly string[]).includes(set ?? "")
  ? set as InvitationMode
  : "invite";
}

/** True when the site addresses the reader and asks. */
export const siteInvites = () => invitationMode() === "invite";
