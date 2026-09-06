import Link from "next/link";
import type { ReactNode } from "react";
import type { Act } from "@/lib/types";
import { actAnchor } from "@/lib/record-knowledge";
import { Acts } from "./Acts";
import { Media } from "./Media";
import { NotebookFieldNotes } from "./NotebookFieldNotes";
function Flow({ steps }: {
    steps: {
        label: string;
        value: string;
        detail?: string;
    }[];
}) {
    return <div className="notebook-flow">{steps.map((step, i) => <div key={step.label}><span className="record-voice">{step.label}</span><strong>{step.value}</strong>{step.detail && <small>{step.detail}</small>}{i < steps.length - 1 && <span className="notebook-flow-arrow" aria-hidden="true">→</span>}</div>)}</div>;
}
function LayerJourney({ label, answer }: {
    label: string;
    answer: string;
}) {
    return <div className="map-layer-journey"><span className="record-voice">{label}</span><div><span className="record-voice">LAYERS</span><strong>01 <i>→</i> 02 <i>→</i> … <i>→</i> 34</strong></div><div><span className="record-voice">GENERATES</span><strong>{answer}</strong></div></div>;
}
function CoordinateRows({ together }: {
    together: boolean;
}) {
    return <div className="map-coordinate-case"><span className="record-voice">{together ? "RELABEL STATE + READER" : "RELABEL STATE ONLY"}</span>{["STATE", "READER"].map(label => <div className="map-coordinate-row" key={label}><span className="record-voice">{label}</span>{(label === "STATE" || together ? ["C", "A", "D", "B"] : ["A", "B", "C", "D"]).map(value => <strong data-coordinate={value} key={value}>{value}</strong>)}</div>)}<p>{together ? "✓ Output restored" : "× Result changes"}</p></div>;
}
type Visual = {
    title: ReactNode;
    figure: ReactNode;
    boundary?: ReactNode;
};
function visualFor(label: string): Visual | undefined {
    if (label.startsWith("01 /"))
        return {
            title: <>The dot is not<br /><em>the answer.</em></>,
            figure: <><p className="map-visual-intro">It is a projection of the model’s changing state.</p><Flow steps={[{ label: "PROMPT", value: "The capital of Japan is" }, { label: "STATE AT EACH POSITION", value: "2,560", detail: "numbers" }, { label: "THROUGH THE MODEL", value: "34", detail: "layers" }, { label: "READOUT", value: "Tokyo" }]}/><div className="map-state-weight"><div><span className="record-voice">WEIGHTS</span><strong>fixed</strong></div><span aria-hidden="true">/</span><div><span className="record-voice">STATE</span><strong>moving</strong></div></div></>,
            boundary: "Gemma 3 4B in the opening demonstration. Attention reads earlier positions; the FFN transforms the state at each position.",
        };
    if (label.startsWith("02 /"))
        return {
            title: <>Useful picture.<br /><em>Incomplete space.</em></>,
            figure: <div className="map-annotated"><div className="map-callouts"><div><span className="record-voice">THIS DOT</span><p>Last-token residual state</p></div><div><span className="record-voice">THESE LANDMARKS</span><p>Selected output-token directions</p></div></div><Media id="film-still-HJlWDSyDcD4-156"/><div className="map-callouts"><div><span className="record-voice">THIS SPACE</span><p>3 chosen axes from 2,560 dimensions</p></div><div><span className="record-voice">THIS DISTANCE</span><p>Not answer probability</p></div></div></div>,
            boundary: "Projected points are normalised onto a sphere. Most dimensions remain out of sight.",
        };
    if (label === "LAYERS AND TOKENS ARE TWO DIFFERENT CLOCKS")
        return {
            title: <>Two different<br /><em>clocks.</em></>,
            figure: <div className="map-two-clocks"><LayerJourney label="ONE TOKEN" answer="Tokyo"/><LayerJourney label="NEXT TOKEN" answer="Continuation"/></div>,
            boundary: "The layer journey starts again for every generated token. The continuation could be punctuation; moving away from Tokyo is not evidence of forgetting.",
        };
    if (label.startsWith("03 /"))
        return {
            title: <>The model never<br /><em>said Sydney.</em></>,
            figure: <><Flow steps={[{ label: "AROUND LAYER 24", value: "Sydney", detail: "provisional readout" }, { label: "BY LAYER 26", value: "Canberra", detail: "provisional readout" }, { label: "FINAL", value: "Canberra", detail: "the answer" }]}/><p className="map-visual-intro">We asked what an unfinished state would say.</p></>,
            boundary: "A logit lens applies the final normalisation and output reader to intermediate states. These are readouts inside one prediction.",
        };
    if (label.startsWith("04 /"))
        return {
            title: <>Change the state.<br /><em>Change the answer.</em></>,
            figure: <><div className="map-fixed-prompt record-voice">PROMPT STAYS / “THE CAPITAL OF AUSTRALIA IS”</div><Flow steps={[{ label: "RECIPIENT STATE", value: "Australia" }, { label: "SWAP IN DONOR STATE", value: "France" }, { label: "REMAINING LAYERS", value: "Paris", detail: "final answer" }]}/></>,
            boundary: "The remaining computation follows the state it receives.",
        };
    if (label === "THE SIZE OF THE INTERVENTION MATTERS")
        return {
            title: <>The whole sequence.<br /><em>Every position.</em></>,
            figure: <div className="map-sequence-pair">{[false, true].map(all => <div key={String(all)}><span className="record-voice">{all ? "ACTUAL INTERVENTION" : "A DIFFERENT EXPERIMENT"}</span><div className="map-sequence" aria-label={all ? "All token positions replaced" : "Only the last token position replaced"}>{Array.from({ length: 6 }, (_, i) => <span key={i} data-replaced={all || i === 5}>{all || i === 5 ? "×" : "·"}</span>)}</div><p>{all ? "Whole sequence state" : "One final-position vector"}</p></div>)}</div>,
            boundary: "This does not show that one vector can preserve an entire conversation. Six boxes illustrate positions; they are not a tokenisation of the prompt.",
        };
    if (label.startsWith("05 /"))
        return {
            title: <>Where did the<br /><em>signal come from?</em></>,
            figure: <Flow steps={[{ label: "KV ANATOMIST", value: "Attention heads", detail: "layer-by-head attribution" }, { label: "SELECTED IN THE FILM", value: "L26 / H2" }, { label: "CONTRIBUTION TOWARDS", value: "Paris" }]}/>,
            boundary: "Attribution identifies a contribution to investigate. Removing or injecting it is a separate causal test.",
        };
    if (label === "KNOWLEDGE IN THE WEIGHTS; INFORMATION IN THE PROMPT")
        return {
            title: <>Two sources<br /><em>of an answer.</em></>,
            figure: <div className="map-source-pair"><div><span className="record-voice">TRAINING / FAMILIAR ASSOCIATION</span><strong>France <i>→</i> Paris</strong></div><div><span className="record-voice">CONTEXT / SUPPLIED FACT</span><strong>Zarkov <i>→</i> Voltara</strong></div></div>,
            boundary: "Two situations to compare. This does not assign every fact to one isolated head or pathway.",
        };
    if (label.startsWith("06 /"))
        return {
            title: <>A small intervention<br /><em>is not a small memory.</em></>,
            figure: <><div className="map-injection"><div><span className="record-voice">ANSWER-TOKEN ID</span><strong>“Volt”</strong></div><span aria-hidden="true">+</span><div><span className="record-voice">COEFFICIENT</span><strong>strength</strong></div></div><Flow steps={[{ label: "DOCUMENT-CONDITIONED RUN", value: "Signal derived" }, { label: "INJECTION", value: "Signal strengthened" }, { label: "RESULT", value: "Readout changes" }]}/></>,
            boundary: "The eight-byte payload already specifies the answer token. It is not a document encoding that recovers arbitrary unknown facts.",
        };
    if (label === "AND THE 370,000-TOKEN DOCUMENT?")
        return {
            title: <>The passage is still<br /><em>part of the mechanism.</em></>,
            figure: <><Flow steps={[{ label: "01 / ROUTE", value: "Window 170" }, { label: "02 / LOAD", value: "State + tokens" }, { label: "03 / READ", value: "The passage" }, { label: "04 / ANSWER", value: "John Coyle", detail: "23 bowls" }]}/><Link href="/notebook/which-source-wins" className="map-authority-branch"><span className="record-voice">THE NEXT QUESTION / N-AUTHORITY</span><p>What if two passages<br />claim different things? <span>↗</span></p></Link></>,
        };
    if (label.startsWith("07 /"))
        return {
            title: <>A coordinate has<br /><em>no meaning alone.</em></>,
            figure: <div className="map-coordinate-pair"><CoordinateRows together={false}/><CoordinateRows together/></div>,
            boundary: "MAP-1’s standalone FFN: relabel the state and matching weights together, and the output returns within numerical precision. The letters illustrate the permutation, not measured semantic coordinates.",
        };
    if (label === "CAN A NEIGHBOURING LAYER READ THE SAME MAP?")
        return {
            title: <>Nearby does not<br /><em>mean interchangeable.</em></>,
            figure: <><div className="map-neighbour-results">{[{ label: "NEIGHBOUR BETTER", value: "1" }, { label: "RANDOM CONTROL BETTER", value: "6" }, { label: "TIE", value: "1" }].map(result => <div key={result.label}><span className="record-voice">{result.label}</span><strong>{result.value}</strong></div>)}</div><p className="record-voice map-evidence-caption">MAP-2b / n = 8 · TWO-SIDED SIGN TEST p = 0.125</p></>,
            boundary: "No qualified interchangeability rule. The corrected original-FFN baseline is bit-identical; the eight-prompt sample is small.",
        };
    if (label.startsWith("08 /"))
        return {
            title: <>From a picture<br /><em>to a mechanism.</em></>,
            figure: <><Flow steps={[{ label: "QUERY", value: "Address" }, { label: "MATCH", value: "Key" }, { label: "ACTIVATE", value: "Weight" }, { label: "COMBINE", value: "Value" }, { label: "READ", value: "Answer" }]}/><div className="map-six-facts"><strong>6 / 6</strong><span className="record-voice">PLANTED FACTS RECOVERED<br />CONSTRUCTED MEMORY</span></div></>,
            boundary: "An inspectable mechanism. The toy is not evidence that Gemma stores every fact this way.",
        };
}
/** Exhibition-local statements/evidence; films keep their existing performance
 * ownership. Original prose and references remain readable in native disclosures. */
export function MapNotebook({ acts }: {
    acts: Act[];
}) {
    return <NotebookFieldNotes>{acts.slice(1).map((act, i) => {
            const offset = i + 1;
            const visual = act.kind === "observation" ? visualFor(act.label || "") : undefined;
            if (!visual)
                return <Acts staticRefusals key={offset} acts={[act]} anchored offset={offset}/>;
            return <section className="map-visual-section" id={actAnchor(offset)} key={offset}>
      <span className="record-voice map-section-label">{act.kind === "observation" && act.label}</span>
      <h2>{visual.title}</h2>
      <div className="map-evidence-object">{visual.figure}</div>
      {visual.boundary && <p className="notebook-boundary">{visual.boundary}</p>}
      <details className="authority-notes"><summary className="record-voice">FIELD NOTES <span>EXPLANATION & SOURCES +</span></summary><Acts staticRefusals acts={[act]}/></details>
    </section>;
        })}</NotebookFieldNotes>;
}
