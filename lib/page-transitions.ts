/** Runs before paint, including history restoration. Native navigation retains
 * browser scroll/focus restoration; no router interception or artificial delay. */
export const pageTransitionScript = `(() => {
  window.__publicationEntry = { path: location.pathname, length: history.length };
  window.addEventListener('pageswap', (event) => {
    if (!event.viewTransition) return;
    let paused = false;
    try { paused = sessionStorage.getItem('hause-motion') === 'paused'; } catch {}
    const destination = event.activation?.entry?.url;
    const film = document.querySelector('[data-film-destination]')?.getAttribute('href');
    const room = document.querySelector('[data-film-journey]');
    const note = document.querySelector('[data-notebook-page]');
    let journey = false;
    if (destination) {
      const next = new URL(destination);
      const listedNote = location.pathname === '/notebook' && Array.from(document.querySelectorAll('[data-notebook-destination]')).some(title => title.getAttribute('data-notebook-destination') === next.pathname);
      journey = next.origin === location.origin && (
        (location.pathname === '/' && film && next.pathname === film) ||
        (room && next.pathname === '/') ||
        listedNote || (note && next.pathname === '/notebook')
      );
    }
    if (!journey || paused || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      event.viewTransition.skipTransition();
    }
  });
})();`;

export type PublicationEntry = { path: string; length: number };

/** Referrer alone can outlive an SPA navigation. Only traverse the direct,
 * unchanged document entry; otherwise use the link's explicit destination. */
export function canReturnToIndex({ referrer, origin, index, path, length, entry }: {
  referrer: string; origin: string; index: string; path: string; length: number;
  entry?: PublicationEntry;
}) {
  if (!entry || entry.path !== path || entry.length !== length || length < 2) return false;
  try {
    const from = new URL(referrer);
    return from.origin === origin && from.pathname === index;
  } catch { return false; }
}
