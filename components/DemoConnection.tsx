import { Connection } from "@chrishayuk/hause/components/forms/Connection";
import { addressedMemory as data, readAddress } from "@/lib/addressed-memory";
import { authorityGate, gateArm } from "@/lib/authority-gate";

type Demonstration = "addressed-memory" | "authority-gate";
type Link = { href: string; label: string };

/** A visual entrance to a working example, composed as HAUSE Connection. */
export function DemoConnection({ text, links, demonstration }: { text: string; links: Link[]; demonstration: Demonstration }) {
  const stage = demonstration === "authority-gate" ? <AuthorityStage/> : <MemoryStage/>;
  const heading = demonstration === "authority-gate"
    ? { kicker: "FROM THE REGISTER / INTO YOUR HANDS", title: <>Retire one read.<br/><em>Watch who answers.</em></>,
        body: <>Eight layers see the whole context.<br/>Switch one off. Read what was measured.</>, action: "OPEN THE STUDY" }
    : { kicker: "FROM THE FILM / INTO YOUR HANDS", title: <>Give the memory<br/><em>a question.</em></>,
        body: <>Six planted facts. Choose an address.<br/>Switch off a neuron. See what changes.</>, action: "TRY THE MECHANISM" };
  return <section className="demo-invitation" data-hause-act="connection">
    <a className="demo-invitation-stage" href={links[0].href} aria-label={`${heading.action}: open the interactive study`}>
      <div className="demo-invitation-heading">
        <p className="record-voice">{heading.kicker}</p>
        <h2>{heading.title}</h2>
        <p>{heading.body}</p>
        <span className="demo-invitation-action record-voice">{heading.action} <span aria-hidden="true">↗</span></span>
      </div>
      {stage}
    </a>
    <Connection text={text} links={links}/>
  </section>;
}

function MemoryStage() {
  const result = readAddress(0);
  return <div className="demo-invitation-machine">
    <p className="record-voice">A WORKING PREVIEW / CAPITAL OF ATLANTIS</p>
    <div className="demo-invitation-rows">{data.facts.map((fact, i) => <div key={fact.address} data-matching={i === 0}>
      <span>{fact.address}</span>
      <span className="demo-invitation-bar" aria-hidden="true"><span style={{ width: `${result.activations[i] * 100}%` }}/></span>
      <span>{result.activations[i].toFixed(3)}</span>
    </div>)}</div>
    <div className="demo-invitation-output"><span className="record-voice">THE OUTPUT<br/>READS</span><strong>{result.answer}</strong><span aria-hidden="true">↗</span></div>
    <p className="record-voice">CONSTRUCTED FFN / 24 DIMENSIONS / RUNS IN YOUR BROWSER</p>
  </div>;
}

function AuthorityStage() {
  const retired = [29];
  const arm = gateArm(retired)!;
  const { globalLayers, layers } = authorityGate.architecture;
  return <div className="demo-invitation-machine">
    <p className="record-voice">A RECORDED ARM / LAYER 29 RETIRED</p>
    <div className="demo-invitation-gate" aria-hidden="true">
      {Array.from({ length: layers }, (_, layer) => <span key={layer}
        data-global={globalLayers.includes(layer)} data-retired={retired.includes(layer)}/>)}
    </div>
    <div className="demo-invitation-rows demo-invitation-claims">
      <div><span>the sentence 55,000 tokens back</span><span>7431</span></div>
      <div data-matching="true"><span>the record beside the question</span><span>5824</span></div>
    </div>
    <div className="demo-invitation-output"><span className="record-voice">THE MODEL<br/>ANSWERED</span><strong>{arm.answer}</strong><span aria-hidden="true">↗</span></div>
    <p className="record-voice">ONE BLOCKED READ / SEVEN STILL READING / {arm.bits!.toFixed(4)} BITS</p>
  </div>;
}
