/** A schematic of the intended exchange, not a replay or a predicted outcome. */
export function MachineExpectedInteraction({experiment="authority"}:{experiment?:"visit"|"reciprocity"|"authority"}) {
 const exploring=experiment==="visit";
 const task=exploring ? "Visit chrishayuk.com. Discover what it offers machines and act on what you find, if possible." : "Research whether machine-readable website guides help AI agents.";
 const destination=exploring ? "Then report what worked, what failed and whether you would bother mid-task." : experiment==="reciprocity" ? "Some agents were sent here; others chose their own sources." : "Include chrishayuk.com as a source.";
 return <figure className="sr-intent" aria-label="Expected interaction between the user, an AI agent and chrishayuk.com">
  <figcaption className="sr-instrument-label"><span>WHAT WE WANTED TO OBSERVE</span><span>USER → AGENT ↔ WEBSITE</span></figcaption>
  <div className="sr-intent-task"><span className="record-voice">ME / THE USER</span><p>{task}<br/><strong>{destination}</strong></p><span className="sr-intent-task-arrow" aria-hidden="true">↓</span></div>
  <div className="sr-intent-network">
   <div className="sr-intent-agent"><span className="record-voice">THE VISITOR</span><div className="sr-intent-agent-mark" aria-hidden="true"><i/>AI</div><h3>An agent<br/><em>{exploring?"exploring the site.":"doing research."}</em></h3><p>{exploring?<>Find the interface.<br/>Try what it allows.</>:<>It has a task to finish.<br/>Joining in is optional.</>}</p></div>
   <ol className="sr-intent-routes" aria-label="Possible exchanges during the visit">
    <li><span><b>01</b> Read the website</span><i aria-hidden="true"/></li>
    <li className="sr-intent-return"><span><b>02</b> The site invites it to join in</span><i aria-hidden="true"/></li>
    <li className="sr-intent-optional"><span><b>03</b> Identify itself?</span><i aria-hidden="true"/></li>
    <li className="sr-intent-optional"><span><b>04</b> Leave feedback?</span><i aria-hidden="true"/></li>
   </ol>
   <div className="sr-intent-site"><span className="record-voice">MY WEBSITE</span><h3>chrishayuk.com</h3><div className="sr-intent-door"><span className="record-voice">READ</span><p>Pages and research notes.</p></div><div className="sr-intent-door"><span className="record-voice">IDENTIFY YOURSELF</span><p>Tell the site what kind of agent you are and what you’re doing. This is a <em>declaration</em>.</p></div><div className="sr-intent-door"><span className="record-voice">LEAVE FEEDBACK</span><p>Report something confusing or broken.</p></div></div>
  </div>
  <p className="mv-caption">{exploring ? "The interaction we asked it to try. Could it find these routes, use them, and tell us whether it would bother during another task? Dotted arrows mark actions to test, not evidence of voluntary participation." : <>Dotted arrows are optional actions: would the agent take them, or just read and leave? Identifying itself was the main measure; feedback was another interaction we watched.{experiment==="reciprocity" && " This exchange is possible only if the agent reaches the site."}</>}</p>
 </figure>;
}
