import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { chartInk } from '../lib/chart-ink.ts';

// Node has no CSSOM; each case supplies the computed properties of its surface.
Object.defineProperty(globalThis, 'getComputedStyle', { value: () => ({ getPropertyValue: () => '' }), configurable: true, writable: true });

const palettes = readFileSync(new URL('../app/notebook-palette.css', import.meta.url), 'utf8');
const adapters = readFileSync(new URL('../app/notebook-template.css', import.meta.url), 'utf8');
const token = (css: string, name: string) => css.match(new RegExp(`${name}:\\s*(#[\\da-f]{6})`))![1];
const rgb = (hex: string) => [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16));
const luminance = (channels: number[]) => channels.map(n => n / 255).map(n => n <= .04045 ? n / 12.92 : ((n + .055) / 1.055) ** 2.4).reduce((sum, n, i) => sum + n * [.2126, .7152, .0722][i], 0);
const contrast = (foreground: string, background: number[]) => {
 const a = luminance(rgb(foreground)), b = luminance(background);
 return (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
};

test('transparent chart strokes and small labels remain readable on every collection stock and shade', t => {
 const properties: Record<string, string> = Object.fromEntries([
  '--codex-ink', '--codex-muted', '--codex-rule', '--notebook-rust', '--notebook-blue',
 ].map(name => [name, token(name.startsWith('--codex') ? palettes : adapters, name)]));
 t.mock.method(globalThis, 'getComputedStyle', () => ({ getPropertyValue: (name: string) => properties[name] }));
 const ink = chartInk({} as Element);
 const stocks = [...palettes.matchAll(/--notebook-stock:\s*(#[\da-f]{6})/g)].map(match => match[1]);
 assert.equal(stocks.length, 5);
 for (const stock of stocks) for (const tone of [.45, .72, 1]) {
  const paper = rgb(stock).map((channel, i) => channel * tone + rgb('#f5f0e5')[i] * (1 - tone));
  for (const colour of [ink.ink, ink.muted]) assert.ok(contrast(colour, paper) >= 4.5, `${colour} text on ${stock}/${tone}`);
  for (const colour of [ink.accent, ink.secondary]) assert.ok(contrast(colour, paper) >= 3, `${colour} chart stroke on ${stock}/${tone}`);
 }
});

test('standalone dark charts retain readable fallback strokes', t => {
 t.mock.method(globalThis, 'getComputedStyle', () => ({ getPropertyValue: () => '' }));
 const ink = chartInk({} as Element);
 for (const colour of [ink.ink, ink.muted, ink.accent, ink.secondary]) assert.ok(contrast(colour, rgb('#10150f')) >= 3);
});
