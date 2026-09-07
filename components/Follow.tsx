import { CopyAddress } from "./CopyAddress";
import { FEEDS } from "@/lib/feeds";
import { CHATGPT_TASK } from "@/lib/follow";
import { SITE } from "@/lib/records";

/**
 * FOLLOW — the third verb, next to CITE and ARCHIVE.
 *
 * Cite refers to an object. Archive shows who else holds a copy and
 * since when. Follow is how the next object reaches you, and it
 * completes the same argument: work received by other people on the day
 * it is recorded has a contemporaneous trail no later edit can
 * manufacture.
 *
 * What it deliberately is not: a mailing list. No account, no address,
 * no consent machinery, nothing for this site to store — a feed address
 * is not a person. The watching happens in the reader's own tools, so
 * the relationship stays theirs. Email could arrive later as another
 * transport under the same verb without any of this changing.
 *
 * The feed links are ordinary anchors and the addresses are printed as
 * text, so the panel is fully usable with no JavaScript at all.
 */
export function Follow({ id = "follow" }: { id?: string }) {
 return (
  <section className="follow-section" id={id} aria-labelledby={`${id}-heading`}>
   <h2 id={`${id}-heading`}>FOLLOW THE WORK</h2>
   <p className="follow-intro">New notebook entries and recorded work, as they appear. Point a feed reader — or an agent of your own — at an address below. No account, no email address, nothing for this site to keep.</p>
   {CHATGPT_TASK && <p className="follow-agent"><a className="text-link" href={CHATGPT_TASK} rel="noreferrer">FOLLOW WITH CHATGPT<span aria-hidden="true">↗</span></a><span>A scheduled task, created in your own account, that watches the publication signal and tells you when something meaningful appears.</span></p>}
   <ul className="follow-feeds">
    {Object.values(FEEDS).map(feed => (
     <li key={feed.path}>
      <div className="follow-feed-identity">
       <h3>{feed.title.replace("Chris Hay — ", "")}</h3>
       <p>{feed.blurb}</p>
      </div>
      <div className="follow-feed-actions">
       <a className="text-link" href={feed.path}>OPEN FEED<span aria-hidden="true">↗</span></a>
       <CopyAddress value={`${SITE}${feed.path}`}/>
       <code>{SITE}{feed.path}</code>
      </div>
     </li>
    ))}
   </ul>
   <p className="follow-signal record-voice">FOR PROGRAMS · <a href="/follow.json">follow.json</a> · <a href="/feed.json">JSON Feed</a></p>
  </section>
 );
}
