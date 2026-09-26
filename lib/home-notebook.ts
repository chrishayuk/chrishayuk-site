import type { GraphNode } from './graph.ts';

/** Select current published records from the same graph used by the public API.
 * Revision, creation and retrieval dates never replace publication chronology. */
export function selectHomeNotebook(nodes: readonly GraphNode[], featuredIds: readonly string[] = []) {
 const published = nodes.filter(node => node.kind === 'notebook' && node.publication === 'published'
  && node.basis === 'published-record' && Boolean(node.published) && node.id === node.recordId)
  .sort((a, b) => b.published!.localeCompare(a.published!) || a.id.localeCompare(b.id));
 const latest = published[0];
 const byId = new Map(published.map(node => [node.id, node]));
 const featured = [...new Set([...featuredIds, ...published.map(node => node.id)])]
  .filter(id => id !== latest?.id && byId.has(id)).slice(0, 3).map(id => byId.get(id)!);
 return { latest, featured };
}
