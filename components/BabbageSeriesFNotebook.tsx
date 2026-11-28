import type { PublicationRecord } from "@/lib/types";
import { StudyMeasures } from "@chrishayuk/hause/components/exhibition/Study";
import { NotebookEntry } from "./NotebookEntry";
import { Acts } from "./Acts";
import { SeriesFSimulator } from "./SeriesFSimulator";

const F021 = "https://collection.sciencemuseumgroup.org.uk/documents/aa110000505";
const CREDIT = "SCIENCE MUSEUM GROUP COLLECTION";

/** The note: Babbage's B and U labels, two held-out tests, and the simulator. */
export function BabbageSeriesFNotebook({ record }: { record: PublicationRecord }) {
  const act = (index: number) => <Acts acts={[record.body[index]]} anchored offset={index} staticRefusals/>;
  return <NotebookEntry record={record} className="babbage-notebook" chapters={[
    { label: "A chart of every moving part", children: <>
      <figure className="babbage-excerpt">
        <img src="/media/notebook/babbage/f021-band1.jpg" width={2000} height={214} loading="lazy"
          alt="The head of the first band of Babbage’s chart of division without a table, sheet 1 of 4, January 1836. Row numbers 1/3, 2/3 and 1 run down the left margin. In the 2/3 row, in five columns, labels B 5, B 3, B.4, B 4 and B 3; in row 1 beneath each, a short upward arrow with a figure: .4, 1.1, .6, .6 and 1.1. Below the heavy rule, rows 2 and 3, with dashed shafts in some columns."/>
        <figcaption className="record-voice">BAB/F/021, DIVISION WITHOUT TABLE, SHEET 1 OF 4, JANUARY 1836, THE HEAD OF THE FIRST BAND · {CREDIT} · <a href={F021}>THE SHEET ↗</a></figcaption>
      </figure>
      {act(0)}
    </> },
    { label: "Bolted to a travelling platform", children: <>
      {act(1)}
      <StudyMeasures label="THE READING, AND WHERE IT COMES FROM" items={[
        { label: "B k", value: "BOLT", detail: "The part is bolted to travelling platform k and moves as it moves." },
        { label: "U k", value: "UNBOLT", detail: "The part is released; it no longer moves with the platform." },
        { label: "PLATFORM k", value: "A SIGNED FIGURE", detail: "In its head on the sheet of 5 January 1836: platform 3 +1.1, platform 7 −.2." },
      ]} note="The notebooks of 1835 describe the platforms and the locking of axes to them; the expansion of B and U is a reading."/>
    </> },
    { label: "Two tests on held-out sheets", kind: "evidence", children: <>{act(2)}</> },
    { label: "A fresh B moves its part", kind: "evidence", children: <>
      {act(3)}
      <StudyMeasures label="A FRESH “B k”, ON TEN HELD-OUT SHEETS" items={[
        { label: "MOVED", value: "173 / 173" },
        { label: "THE WAY F/013 GIVES PLATFORM k", value: "168 / 173" },
        { label: "BY F/013’S LIFT", value: "145 / 150", detail: "Where a figure is written." },
        { label: "RETURNED THE OTHER WAY", value: "123 / 124" },
      ]} note="Division without a table (4 sheets), square root (4), the ordinary cycle, the notation of carriage."/>
    </> },
    { label: "And it stays bolted", kind: "evidence", children: <>
      {act(4)}
      <StudyMeasures label="PARTS BOLTED EARLIER, WITH NO LABEL OF THEIR OWN: 43" items={[
        { label: "A BOLT PERSISTS", value: "37 / 43", detail: "Division 14 of 16, square root 21 of 24, carriage 2 of 3." },
        { label: "ONLY A FRESH LABEL MOVES", value: "6 / 43" },
        { label: "DIRECTION, WHEN IT MOVED", value: "37 / 37" },
        { label: "RELEASED, AND STILL", value: "198 / 198", detail: "A U in the band, or released earlier; 251 / 251 counting the edge cells." },
      ]} note="Four band-4 cells where the paper ends inside row 1 are left unscored here. Counted as not moving: persistence 37 of 47 (10 still), released 251 of 251. Three of the six that did not move sit under U labels the list of labels had missed."/>
    </> },
    { label: "What failed", kind: "evidence", children: <>
      {act(5)}
      <StudyMeasures label="WHAT THE READING DOES NOT EXPLAIN" items={[
        { label: "A BARE B", value: "37 MOVED", detail: "Predicted still; mostly by 0.45 or 0.3, outside the platform table." },
        { label: "NO LABEL YET", value: "102 MOVED", detail: "70 in columns never labelled on their sheet, 32 labelled only later. A rule that unlabelled parts stay still fails." },
        { label: "CARRIAGE", value: "THE OTHER WAY", detail: "Mid-band “B 7” goes up where F/013’s platform 7 goes down." },
        { label: "RETURN TIMING", value: "UNTESTED", detail: "Whether a part returns with its platform: no held-out sheet numbers its platform columns." },
      ]} note="Each is left unknown in the simulator, not filled in."/>
    </> },
    { label: "Step through the simulator", kind: "operate", children: <>
      {act(6)}
      <SeriesFSimulator/>
    </> },
    { label: "How it was checked", children: <>{act(7)}{act(8)}</> },
    { label: "What this does not show", children: <>{act(9)}{act(10)}</> },
  ]}/>;
}
