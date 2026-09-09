import { TextCorrection } from "@chrishayuk/hause/components/forms/TextCorrection";
export function ErasingTrailer({ compact = false }: { compact?: boolean }) {
  return <TextCorrection before="Co-authored-by: Claude …" after="Rewrite required." caption="CI blocks the contribution. The author rewrites the metadata." compact={compact} />;
}
