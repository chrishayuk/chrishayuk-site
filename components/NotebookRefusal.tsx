import { Refusal, type RefusalProps } from "@chrishayuk/hause/components/forms/Refusal";
/** Publication adapter for HAUSE's still edition: one complete reading,
 * without pulses or duplicated flattened fallback text. */
export function NotebookRefusal({ kicker, title, lines, principle }: RefusalProps) {
    return <Refusal kicker={kicker} title={title} lines={lines} principle={principle} presentation="still" />;
}
