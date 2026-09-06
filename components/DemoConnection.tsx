import { Connection } from "@chrishayuk/hause/components/forms/Connection";
import { addressedMemory as data, readAddress } from "@/lib/addressed-memory";

/** A visual entrance to a working example, composed as HAUSE Connection. */
export function DemoConnection({ text, links }: { text: string; links: { href: string; label: string }[] }) {
  const result = readAddress(0);
  return <section className="demo-invitation" data-hause-act="connection">
    <a className="demo-invitation-stage" href={links[0].href} aria-label="Try the mechanism: open the interactive addressed-memory study">
      <div className="demo-invitation-heading">
        <p className="record-voice">FROM THE FILM / INTO YOUR HANDS</p>
        <h2>Give the memory<br/><em>a question.</em></h2>
        <p>Six planted facts. Choose an address.<br/>Switch off a neuron. See what changes.</p>
        <span className="demo-invitation-action record-voice">TRY THE MECHANISM <span aria-hidden="true">↗</span></span>
      </div>
      <div className="demo-invitation-machine">
        <p className="record-voice">A WORKING PREVIEW / CAPITAL OF ATLANTIS</p>
        <div className="demo-invitation-rows">{data.facts.map((fact, i) => <div key={fact.address} data-matching={i === 0}>
          <span>{fact.address}</span>
          <span className="demo-invitation-bar" aria-hidden="true"><span style={{ width: `${result.activations[i] * 100}%` }}/></span>
          <span>{result.activations[i].toFixed(3)}</span>
        </div>)}</div>
        <div className="demo-invitation-output"><span className="record-voice">THE OUTPUT<br/>READS</span><strong>{result.answer}</strong><span aria-hidden="true">↗</span></div>
        <p className="record-voice">CONSTRUCTED FFN / 24 DIMENSIONS / RUNS IN YOUR BROWSER</p>
      </div>
    </a>
    <Connection text={text} links={links}/>
  </section>;
}
