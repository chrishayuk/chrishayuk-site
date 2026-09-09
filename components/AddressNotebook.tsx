import type { Act } from "@/lib/types";
import { StudyRoom, StudySequence, StudyMeasures } from "@chrishayuk/hause/components/exhibition/Study";
import { EvidenceTable } from "@chrishayuk/hause/components/EvidenceTable";
import { Acts } from "./Acts";
import { NotebookFieldNotes } from "./NotebookFieldNotes";
import { StudyNotes, StudyComparison } from "./NotebookStudy";

export function AddressNotebook({ acts }: { acts: Act[] }) {
  if (acts.length !== 23 || acts[21].kind !== "question") throw new Error("Address notebook record changed");
  return <NotebookFieldNotes><div className="cinematic-notebook address-reading-notebook">
    <StudyRoom label="01 / THE QUESTION IS THE ADDRESS" title={<>A pattern to recognise.<br/><em>Not a numbered drawer.</em></>}>
      <StudySequence label="AN EXPLANATORY READING / NOT A LITERAL MEMORY ADDRESS" steps={[{label:"ENTITY",value:"France",detail:"Which place?"},{label:"RELATION",value:"Capital",detail:"What about it?"},{label:"ANSWER DIRECTION",value:"Paris",detail:"What can the reader recover?"}]} note="A model’s address is a vector. Matching it need not isolate one neuron or one fact." />
      <StudyNotes acts={acts} start={1} end={3} label="WHAT AN ADDRESS MEANS HERE" />
    </StudyRoom>
    <StudyRoom label="02 / MAKE THE MEMORY INSPECTABLE" title={<>Six facts.<br/><em>Nothing learned.</em></>} tone="dark" description="Two invented places. Three relations. Keys and values we deliberately put there.">
      <EvidenceTable caption="Constructed memory / ffn.py" rowLabel="Entity" columns={[{id:"capital",label:"Capital"},{id:"currency",label:"Currency"},{id:"language",label:"Language"}]} rows={[{id:"atlantis",label:"Atlantis",values:{capital:"Paris",currency:"Euro",language:"Latin"}},{id:"zerivia",label:"Zerivia",values:{capital:"Cairo",currency:"Rand",language:"Tamil"}}]} note="Each full question has a supplied, normalised 24-number key. There is no training." />
      <StudyNotes acts={acts} start={3} label="BUILD THE SIX-FACT MEMORY" />
    </StudyRoom>
    <StudyRoom label="03 / FOLLOW ONE READ" title={<>The question selects.<br/><em>The reader answers.</em></>}>
      <StudySequence label="TWO MATRIX MULTIPLICATIONS / ONE NONLINEARITY" steps={[{label:"01 / MATCH",value:"Compare keys",detail:"Dot products with the supplied input."},{label:"02 / ACTIVATE",value:"Clip at zero",detail:"ReLU retains positive matches."},{label:"03 / WRITE",value:"Sum values",detail:"Weight each value by its activation."},{label:"04 / READ",value:"Score answers",detail:"The largest score supplies the word."}]} />
      <StudyNotes acts={acts} start={4} label="THE CALCULATION" />
      <Acts acts={[acts[5]]} anchored offset={5} />
      <StudyNotes acts={acts} start={6} label="BEFORE YOU SWITCH A NEURON OFF" />
      <StudyMeasures label="SAVED RUN / GIVEN KEYS, KNOWN READS" items={[{value:"6/6",label:"intended answers",detail:"seed-0 constructed vectors"}]} note="The browser is checked against independent NumPy readouts. Suppression is an interactive extension, not a saved-run result." />
      <StudyNotes acts={acts} start={7} label="THE SAVED RESULT" />
    </StudyRoom>
    <StudyRoom label="THE LIMIT / KEEP IT IN VIEW" title={<>The question is<br/><em>already encoded.</em></>} tone="accent" description="Choosing a label supplies its stored key. This little memory does not understand the phrase, learn a document, or establish unlimited capacity."><StudyNotes acts={acts} start={8} label="WHAT THE TOY DOES NOT SHOW" /></StudyRoom>
    <StudyRoom label="04 / TWO DIFFERENT OPERATIONS" title={<>Packing a mixture.<br/><em>Reading one answer.</em></>}>
      <Acts acts={[acts[9]]} anchored offset={9} />
      <StudyNotes acts={acts} start={10} label="RELATED ILLUSTRATIONS, DIFFERENT CONSTRUCTIONS" />
    </StudyRoom>
    <StudyRoom label="05 / THE MODEL BUILDS THE QUERY" title={<>Sydney, then Canberra.<br/><em>Before a word is printed.</em></>} tone="dark">
      <Acts acts={[acts[11]]} anchored offset={11} />
      <StudySequence label="INTERMEDIATE READOUTS / ONE PREDICTION" steps={[{label:"AROUND L24",value:"Sydney",detail:"Provisional readout."},{label:"BY L26",value:"Canberra",detail:"The leading readout changes."}]} note="These are not two emitted words. The changing state motivates inspecting when a useful query becomes available." />
      <StudyNotes acts={acts} start={12} label="THE STATE REACHING THE READER" />
    </StudyRoom>
    <StudyRoom label="06 / TWO PARTS OF THE QUESTION" title={<>Reading the relation<br/><em>is not finding the place.</em></>}>
      <StudyComparison act={acts[13]} index={13} />
      <StudyMeasures label="L10 / TRAINED RELATION PROBE" items={[{value:"6",label:"tested synonyms",detail:"seat · metropolis · money · cash · tongue · speech"},{value:"15",label:"entities per synonym",detail:"all decode to the intended relation"}]} note="Information recoverable by this trained probe—not a universal address format." />
      <StudyNotes acts={acts} start={14} label="THE RELATION PROBE" />
      <EvidenceTable caption="L26 / entity router · changed questions, known entities" rowLabel="Test" columns={[{id:"one",label:"Top one",unit:"%",precision:1},{id:"five",label:"Top five",unit:"%",precision:0}]} rows={[{id:"paraphrase",label:"Paraphrase",values:{one:66,five:86}},{id:"relation",label:"Cross-relation",values:{one:50.7,five:76}}]} note="150 entities already in router training. L26 is best for paraphrase top-five in this run; L28 has higher top-one scores. Cross-relation top-one is approximate." />
      <StudyNotes acts={acts} start={15} end={17} label="A SHORTLIST STILL NEEDS A WAY TO CHOOSE" />
    </StudyRoom>
    <StudyRoom label="07 / THE WRITE MUST MEET A READER" title={<>Place an answer.<br/><em>Can the model read it?</em></>} tone="dark">
      <Acts acts={[acts[17]]} anchored offset={17} />
      <StudySequence label="NATIVE.PY / A WEIGHT EDIT AT L26" steps={[{label:"GATE + UP ROWS",value:"Recognise",detail:"Respond to the captured target address."},{label:"DOWN COLUMN",value:"Write",detail:"Supply an answer direction."},{label:"FORWARD PASS",value:"Read back",detail:"The changed weights are used normally."}]} note="This edits weights. It is not the map experiment’s transient residual swap." />
      <StudyNotes acts={acts} start={18} label="THE NATIVE-MODEL WRITE" />
      <StudyMeasures label="SAVED NATIVE WRITE / NATIVE.JSON" items={[{value:"3/3",label:"target reads",detail:"Oslo · Yen · Welsh"},{value:"6",label:"control prompts",detail:"original top-ranked token retained"}]} note="Those six controls do not establish unchanged behaviour everywhere." />
      <StudyNotes acts={acts} start={19} label="EXACT TARGETS & CONTROL SCOPE" />
    </StudyRoom>
    <Acts acts={[acts[20]]} anchored offset={20} staticRefusals />
    <div className="notebook-open-question"><Acts acts={acts.slice(21)} anchored offset={21} /></div>
  </div></NotebookFieldNotes>;
}
