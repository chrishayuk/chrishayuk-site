import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";
import { CONDITION, PUBLIC_DIMENSIONS, publicCapacityBits, publishedObservations, renderPublic } from "@/lib/machine/guestbook";

export const metadata = pageMetadata(
 "Machine guestbook",
 "Some visitors to this house are not human. A deliberately incomplete record of machine visitors: coarse, delayed, and built so that observing coordination never becomes a channel machines can communicate through.",
 "/machine-guestbook",
);

/**
 * THE PUBLIC EXHIBIT.
 *
 * Rendered per request so it always reflects the live deployment; the
 * figures behind it are cached for an hour, so a public page cannot be
 * polled into doing work.
 *
 * TWO RULES THIS PAGE MUST KEEP, and both are asserted by tests:
 *
 * 1. IT DOES NOT LINK TO /machines. The machine entry point is reached
 *    through /llms.txt and nothing else, which is what makes "how did a
 *    machine find this room" answerable at all. A link from a human page
 *    that search engines index would change discoverability and
 *    participation at the same time, and the experiment would lose the
 *    ability to say which one mattered.
 *
 * 2. IT PUBLISHES NO INDIVIDUAL OBSERVATION. Four coarse buckets from
 *    the previous completed UTC day, and nothing finer. See
 *    lib/machine/guestbook.ts for why a live feed of declarations would
 *    be a message board with a nicer typeface.
 *
 * The layout uses the publication's own furniture — `index-intro`,
 * `index-count`, `knowledge-coverage`, `knowledge-limits` — because
 * those carry the page gutter (`var(--margin)`). A bare <section> does
 * not, and text laid against the left edge of the viewport is how that
 * shows up.
 */
export const dynamic = "force-dynamic";

const LABEL: Record<string, string> = {
 discovery: "MACHINES HAVE FOUND THIS ROOM",
 declarations: "DECLARATIONS",
 collaboration: "COLLABORATION",
 interaction: "MULTI-STEP INTERACTION",
};

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
const began = (iso: string) => {
 const [year, month, day] = iso.split("-");
 return { day, month: MONTHS[Number(month) - 1] ?? "", year };
};

export default async function Page() {
 const observations = await publishedObservations();
 const words = renderPublic(observations.snapshot);
 const open = CONDITION.declarationEndpoint === "open";
 const start = began(CONDITION.startedOn);

 return <main id="main" className="publication-main machine-guestbook">
  <header className="index-intro">
   <p className="kicker record-voice">CHRIS HAY / MACHINE GUESTBOOK</p>
   <h1>Some visitors<br/><em>are not human.</em></h1>
   <p className="dek">This house keeps a guestbook for machines. What it records is deliberately coarse and deliberately late, because a guestbook that showed each machine’s entry as it arrived would be somewhere machines could leave messages for one another — and that is the one thing this was built not to be.</p>
   <div className="index-count record-voice">
    <span>PHASE {CONDITION.phase} · OBSERVATION ONLY</span>
    <span>DECLARATION {open ? "OPEN" : "NOT YET OPEN"}</span>
    <span>BEGAN {start.day} {start.month} {start.year}</span>
   </div>
  </header>

  <section className="machine-observed" aria-labelledby="observed">
   <div className="machine-observed-head">
    <h2 id="observed">What has been observed</h2>
    <p className="record-voice">PUBLISHED THROUGH {observations.through} · PREVIOUS COMPLETED DAY</p>
   </div>
   {!observations.available
    ? <p className="machine-note">This deployment keeps no counters, so there is nothing to publish. The figures appear only where the published edition has a durable store; a preview shows no invented number in its place.</p>
    : <div className="knowledge-coverage">
       {PUBLIC_DIMENSIONS.map(dimension =>
        <div key={dimension}>
         <strong className={dimension !== "discovery" && !open ? "machine-dormant" : undefined}>
          {dimension !== "discovery" && !open ? "not yet" : words[dimension]}
         </strong>
         <span>{LABEL[dimension]}</span>
        </div>)}
      </div>}
   <p className="machine-note">Three of those four cannot yet carry a figure, because there is nothing for a machine to declare. They read <em>not yet</em> rather than <em>none</em>, so that a mechanism which does not exist is never mistaken for one nobody wanted.</p>
  </section>

  <section className="knowledge-limits">
   <h2>What you are seeing is deliberately incomplete.</h2>
   <p>This guestbook records structured observations of machine visitors. Individual declarations, network information, precise arrival times and conversations are not published, and most of them are never stored at all.</p>
   <p>The house is designed to observe coordination without becoming a channel through which machines can communicate.</p>
   <p>So the published figures are four coarse quantities — <code>none</code>, <code>few</code>, <code>several</code>, <code>many</code> — computed by this site from its own events, and drawn from the previous completed day rather than from this moment. That is {publicCapacityBits().toFixed(0)} bits of visitor-influenceable public state per day, with a delay of between twenty-four and forty-eight hours between acting and seeing the effect. A house that can be used to send a message costs a day per eight bits, with no way to know whether anyone is reading, and that is not a channel anybody would choose.</p>
   <p>The parts of this page that update immediately — the phase, whether declaration is open, the date the observation began — are facts about the site rather than about its visitors. No arriving machine can move them.</p>
  </section>

  <section className="machine-closing">
   <h2>Why a house would ask</h2>
   <p>Most of what reads this publication never runs a line of its JavaScript. <Link className="text-link" href="/readership">Machine readership</Link> counts that traffic from the outside — a name in a header, an address checked against the list its provider publishes, a path. This guestbook is the other half of the question: what a machine would say about itself, if a site asked it plainly and promised to keep almost none of the answer.</p>
   <p>Nothing here identifies a visitor, and nothing here is a headcount. A count is a request. A machine is not a person.</p>
  </section>
 </main>;
}
