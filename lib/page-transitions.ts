/** Runs before paint, including history restoration. Native navigation retains
 * browser scroll/focus restoration; no router interception or artificial delay. */
export const pageTransitionScript = `(() => {
  window.__publicationEntry = { path: location.pathname, length: history.length };
  const motionPaused = () => {
    let paused = false;
    try { paused = sessionStorage.getItem('hause-motion') === 'paused'; } catch {}
    return paused || matchMedia('(prefers-reduced-motion: reduce)').matches;
  };
  const notebookSurface = (path) => {
    const candidates = Array.from(document.querySelectorAll('[data-notebook-destination]')).filter(element => element.getAttribute('data-notebook-destination') === path);
    return candidates.find(element => {
      const rect = element.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight;
    }) || candidates[0];
  };
  const sharePaper = (element, transition, direction) => {
    if (!element) return;
    const previous = element.style.viewTransitionName;
    element.style.viewTransitionName = 'notebook-paper';
    document.documentElement.dataset.notebookJourney = direction;
    const clear = () => {
      element.style.viewTransitionName = previous;
      delete document.documentElement.dataset.notebookJourney;
    };
    transition.finished.then(clear, clear);
  };
  window.addEventListener('pageswap', (event) => {
    if (!event.viewTransition) return;
    const destination = event.activation?.entry?.url;
    const film = document.querySelector('[data-film-destination]')?.getAttribute('href');
    const room = document.querySelector('[data-film-journey]');
    const note = document.querySelector('[data-notebook-page]');
    let journey = false;
    if (destination) {
      const next = new URL(destination);
      const surface = location.pathname === '/notebook' ? notebookSurface(next.pathname) : null;
      const listedNote = Boolean(surface);
      journey = next.origin === location.origin && (
        (location.pathname === '/' && film && next.pathname === film) ||
        (room && next.pathname === '/') ||
        listedNote || (note && next.pathname === '/notebook')
      );
      if (journey && !motionPaused()) {
        if (listedNote) sharePaper(surface, event.viewTransition, 'open');
        else if (note && next.pathname === '/notebook') sharePaper(document.querySelector('.codex-book'), event.viewTransition, 'close');
      }
    }
    if (!journey || motionPaused()) {
      event.viewTransition.skipTransition();
    }
  });
  window.addEventListener('pagereveal', (event) => {
    if (!event.viewTransition) return;
    if (motionPaused()) { event.viewTransition.skipTransition(); return; }
    const from = window.navigation?.activation?.from?.url;
    if (!from) return;
    const previous = new URL(from);
    if (previous.origin !== location.origin) return;
    if (location.pathname === '/notebook') sharePaper(notebookSurface(previous.pathname), event.viewTransition, 'close');
    else if (previous.pathname === '/notebook' && document.querySelector('[data-notebook-page]')) sharePaper(document.querySelector('.codex-book'), event.viewTransition, 'open');
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
