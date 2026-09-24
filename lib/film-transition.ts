/** Runs before paint, including history restoration. Native navigation retains
 * browser scroll/focus restoration; no router interception or artificial delay. */
export const filmTransitionScript = `(() => {
  window.addEventListener('pageswap', (event) => {
    if (!event.viewTransition) return;
    let paused = false;
    try { paused = sessionStorage.getItem('hause-motion') === 'paused'; } catch {}
    const destination = event.activation?.entry?.url;
    const film = document.querySelector('[data-film-destination]')?.getAttribute('href');
    const room = document.querySelector('[data-film-journey]');
    let journey = false;
    if (destination) {
      const next = new URL(destination);
      journey = next.origin === location.origin && (
        (location.pathname === '/' && film && next.pathname === film) ||
        (room && next.pathname === '/')
      );
    }
    if (!journey || paused || matchMedia('(prefers-reduced-motion: reduce)').matches) {
      event.viewTransition.skipTransition();
    }
  });
})();`;
