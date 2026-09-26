/** Transparent charts must use the surface they are actually drawn on.
 * Recorded world canvases keep their independent, opaque replay palette. */
export function chartInk(element: Element) {
 const style = getComputedStyle(element);
 const read = (name: string, fallback: string) => style.getPropertyValue(name).trim() || fallback;
 return {
  ink: read('--codex-ink', '#f1eee5'),
  muted: read('--codex-muted', '#8c9185'),
  accent: read('--notebook-rust', '#e3b56b'),
  secondary: read('--notebook-blue', '#83c5d2'),
  rule: read('--codex-rule', '#d4d9c13d'),
 };
}
