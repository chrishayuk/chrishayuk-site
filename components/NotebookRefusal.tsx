import type { RefusalProps } from "@chrishayuk/hause/components/forms/Refusal";
/** Publication-local static mode of HAUSE Refusal. The complete text is the
 * resting state: no pulse, no reveal dependency, no duplicated flattened copy.
 * Preserve the vendor until this alternative is admitted upstream. */
export function NotebookRefusal({ kicker, title, lines, principle }: RefusalProps) {
    return <section className="notebook-refusal" data-hause-act="refusal">
    {kicker && <p className="record-voice">{kicker}</p>}
    <h3 className="voice-evidence">{title}</h3>
    <ul className="voice-system">{lines.map(line => <li key={line}>{line}</li>)}</ul>
    <p className="voice-editorial">{principle}</p>
  </section>;
}
