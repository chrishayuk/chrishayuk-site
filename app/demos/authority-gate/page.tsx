import { ThreadNavigation } from "@/components/ThreadNavigation";
import { authorityStudy } from "@/lib/threads";
import { PromotionInstrument, GateInstrument } from "@/components/AuthorityGate";
import { Acts } from "@/components/Acts";
import { pageMetadata } from "@/lib/metadata";
import { authorityGate as data } from "@/lib/authority-gate";

export const metadata = { ...pageMetadata("Which source wins — interactive study", "Replay the recorded arms of a long-context authority experiment: promote a record beside the question, retire the original sentence from individual attention layers, and read the answer that was actually measured.", "/demos/authority-gate"), robots: { index: false, follow: true } };

export default function Page() {
  return <main id="main" className="publication-main authority-demo">
    <header className="index-intro">
      <p className="kicker record-voice">CHRIS HAY / THE RECORD / INTERACTIVE STUDY</p>
      <h1>Which source<br/><em>wins?</em></h1>
      <p className="dek">Two claims in one context. Only one of them answers.</p>
      <p>A sentence planted 55,000 tokens back says the code is 7431. A short record beside the question says 5824. This study replays what was actually measured: which one the model answered with, and what had to change before the newer record could be read at all.</p>
      <div className="inline-links"><a className="text-link" href="/notebook/which-source-wins">READ THE NOTEBOOK ↗</a><a className="text-link" href="/notebook/what-has-to-survive">WHAT HAS TO SURVIVE ↗</a></div>
    </header>
    <PromotionInstrument/>
    <GateInstrument/>
    <div className="record-body">
      <Acts acts={[
        { kind: "observation", label: "WHAT YOU ARE READING", text: `Nothing on this page runs a model. Both instruments look up arms that were already measured on ${data.model} under ${data.runtime}, in a ${data.contextTokens.toLocaleString("en-GB")}-token context, and show you the recorded answer and its divergence from the unmodified run. Combinations that were never run return no answer, because there is nothing to return.` },
        { kind: "observation", label: "WHY THE GAPS MATTER", text: `The eight global attention layers admit ${2 ** data.architecture.globalLayers.length} possible retirement subsets. Fifteen were run: the empty set, each layer alone, four count-matched triples, one four-layer set and the full retirement. That is enough to show that one particular layer flips the answer by itself and that three blocked reads can behave in opposite directions — and not nearly enough to describe the other ${2 ** data.architecture.globalLayers.length - 15} subsets. The instrument stays silent about them deliberately.` },
        { kind: "refusal", title: "ONE QUESTION, ONE SPAN, ONE MODEL", lines: [
          "Every arm here asks the same question about the same planted sentence, at one depth, on one model.",
          "Layer 29 is sufficient to flip the answer. It is not necessary: two other subsets flip without it.",
          "A recorded divergence is a measurement of these arms, not a property of transformers.",
        ], principle: "An interactive study may expose recorded evidence. It must never manufacture an answer where the experiment has none." },
        { kind: "observation", label: "CONTINUE THE INVESTIGATION", text: "The notebook follows the same arc from the first promotion result to the question it leaves open: what makes a source overridable without an attention intervention at all.", references: [
          { label: "Which source wins?", url: "/notebook/which-source-wins" },
          { label: "What has to survive?", url: "/notebook/what-has-to-survive" },
          { label: "Context should be abundant", url: "/notebook/context-should-be-abundant" },
        ] },
      ]}/>
    </div>
    <footer className="demo-provenance"><ThreadNavigation id={authorityStudy.id}/>
      <p className="record-voice">INTERACTIVE STUDY / RECORDED RESULTS / 06 SEPTEMBER 2026</p>
      <p>Arms replayed from Chris Hay’s private research register. {data.register}</p>
      <details><summary>Recorded identity</summary><p className="record-voice">
        MODEL {data.model.toUpperCase()}<br/>RUNTIME {data.runtime.toUpperCase()}<br/>
        CONTEXT {data.contextTokens.toLocaleString("en-GB")} TOKENS<br/>
        PROMOTION {data.promotion.experiment} · {data.promotion.label.toUpperCase()}<br/>
        RETIREMENT {data.gate.experiment} · {data.gate.label.toUpperCase()}<br/>
        FRONTIER {data.gate.priorExperiment} · {data.gate.priorLabel.toUpperCase()}<br/>
        WALK {data.walk.experiment} · {data.walk.label.toUpperCase()}<br/>
        REVIEWED {data.reviewed}
      </p></details>
    </footer>
  </main>;
}
