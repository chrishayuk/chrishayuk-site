import type { PublicationRecord } from "@/lib/types";
import { StudyMeasures } from "@chrishayuk/hause/components/exhibition/Study";
import { NotebookEntry } from "./NotebookEntry";
import { Acts } from "./Acts";

/** The third Q-LM note: interventions inside small transformers trained on invented facts. */
export function QLmTransplantNotebook({ record }: { record: PublicationRecord }) {
  const act = (index: number) => <Acts acts={[record.body[index]]} anchored offset={index} staticRefusals/>;
  return <NotebookEntry record={record} className="qsystems-notebook" chapters={[
    { label: "Worlds of invented facts", children: <>{act(0)}</> },
    { label: "It moved the answer", kind: "evidence", children: <>{act(1)}</> },
    { label: "The entity, carried by a few heads", kind: "evidence", children: <>
      {act(2)}
      <StudyMeasures label="THE TOP THREE HEADS, CHOSEN ON HALF THE PAIRS, JUDGED ON THE OTHER HALF" items={[
        { label: "LLAMA: PATCHED / RESTORED", value: "69% / 70%", detail: "Passes the plan’s criterion in 8 of 9 models." },
        { label: "CUSTOM: PATCHED / RESTORED", value: "39% / 38%", detail: "Passes in 4 of 9." },
        { label: "THREE OTHER HEADS", value: "0–4%" },
      ]} note="LARQL-QLM-TRANSPORT-001, means over 9 models of each architecture."/>
    </> },
    { label: "A relation, moved on its own", kind: "evidence", children: <>{act(3)}</> },
    { label: "A question neither donor asked", kind: "evidence", children: <>
      {act(4)}
      <StudyMeasures label="LLAMA, AFTER BLOCK 1: B’S RELATION ADDED TO “A LIVES IN”" items={[
        { label: "A’S BIRTH CITY WINS (COMPOSED)", value: "51%", detail: "29% to 78% across models; the criterion met in 4 of 9." },
        { label: "B’S BIRTH CITY WINS (INJECTED)", value: "0%" },
        { label: "RANDOM CONTROL, MATCHED", value: "0%" },
      ]} note="LARQL-QLM-SEM-001, version 3. The custom model meets the criterion in 0 of 9."/>
    </> },
    { label: "Not looked up where the entity is", kind: "evidence", children: <>{act(5)}</> },
    { label: "A fact from a table", kind: "evidence", children: <>
      {act(6)}
      <StudyMeasures label="LLAMA: AN EDITED TABLE’S CITY VECTOR AT BLOCK 3" items={[
        { label: "EDITED CAPITAL STATED, WORLDS 1–3", value: "90%" },
        { label: "THE SAME, FRESH WORLDS 4–6", value: "92%" },
        { label: "RANDOM VECTOR, SAME SIZE", value: "0–2%" },
      ]} note="LARQL-QLM-RESOLVE-001, part B. The table is told the entity and relation; read from activations alone, the edit reaches 62% (EXTERNAL-001)."/>
    </> },
    { label: "Read the results", kind: "operate", children: <>{act(7)}</> },
    { label: "What this does not show", children: <>{act(8)}{act(9)}</> },
  ]}/>;
}
