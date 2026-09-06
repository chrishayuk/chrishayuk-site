import type { Act, PublicationRecord } from "./types.ts";

/** The readable text of a HAUSE act, without inventing an interpretation. */
export function actText(act: Act): string {
  switch (act.kind) {
    case "statement": return act.text;
    case "observation": return [act.label, act.text].filter(Boolean).join(". ");
    case "connection": return [act.text, ...act.links.map(link => link.label)].join(". ");
    case "question": case "claim": return [act.text, act.detail].filter(Boolean).join(" ");
    case "refusal": return [act.title, ...act.lines, act.principle].join(". ");
    case "evidence": return act.items.map(item => `${item.label} [${item.status}]. ${item.detail}`).join(" ");
    case "comparison": return `${act.objectLabel}. ${act.left.label}: ${act.left.properties.join("; ")}. ${act.right.label}: ${act.right.properties.join("; ")}.`;
    case "film": return "caption" in act ? act.caption : "";
    case "photograph": return "";
  }
}

export const actAnchor = (index: number) => `act-${index + 1}`;
export function recordActs(record: PublicationRecord) {
  return record.body.flatMap((act, index) => {
    const text = actText(act);
    return text ? [{ id: `${record.id}@${record.version}:${actAnchor(index)}`, anchor: actAnchor(index), kind: act.kind, text,
      status: "status" in act ? act.status : undefined }] : [];
  });
}
