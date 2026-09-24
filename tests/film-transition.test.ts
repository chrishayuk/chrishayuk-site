import test from "node:test";
import assert from "node:assert/strict";
import { runInNewContext } from "node:vm";
import { filmTransitionScript } from "../lib/film-transition.ts";

// Exercise the actual before-paint script against browser event contracts.
// Layout, the native snapshot animation and embedded playback require a browser.
const origin = "https://chrishayuk.com";
const film = "/film/youtube/selected-film";
function navigate({ from = "/", to = film, reduced = false, paused = false,
  storageBlocked = false, room = false, activation = true, transition = true } = {}) {
  let handler: (event: object) => void = () => { throw new Error("listener missing"); };
  let skips = 0;
  runInNewContext(filmTransitionScript, {
    URL, location: { origin, pathname: from },
    window: { addEventListener: (name: string, callback: typeof handler) => {
      assert.equal(name, "pageswap"); handler = callback;
    } },
    sessionStorage: { getItem: () => {
      if (storageBlocked) throw new Error("storage denied");
      return paused ? "paused" : null;
    } },
    matchMedia: () => ({ matches: reduced }),
    document: { querySelector: (selector: string) =>
      selector === "[data-film-destination]" && from === "/" ? { getAttribute: () => film }
        : selector === "[data-film-journey]" && room ? {} : null },
  });
  handler({
    activation: activation ? { entry: { url: new URL(to, origin).href } } : undefined,
    viewTransition: transition ? { skipTransition: () => { skips++; } } : undefined,
  });
  return skips;
}

test("the selected film journey allows native forward and history-return transitions", () => {
  assert.equal(navigate(), 0);
  assert.equal(navigate({ from: film, to: "/#film", room: true }), 0);
  assert.equal(navigate({ to: `${film}?t=30` }), 0);
});
test("unrelated routes, other films and external destinations keep ordinary navigation", () => {
  assert.equal(navigate({ to: "/notebook" }), 1);
  assert.equal(navigate({ to: "/film/youtube/another-film" }), 1);
  assert.equal(navigate({ to: "https://example.org" + film }), 1);
  assert.equal(navigate({ from: "/notebook", to: film }), 1);
  assert.equal(navigate({ from: "/film/youtube/another-film", to: "/" }), 1);
});
test("reduced motion and the existing pause preference skip the animation", () => {
  assert.equal(navigate({ reduced: true }), 1);
  assert.equal(navigate({ paused: true }), 1);
});
test("blocked storage and incomplete browser support cannot prevent navigation", () => {
  assert.equal(navigate({ storageBlocked: true }), 0);
  assert.equal(navigate({ activation: false }), 1);
  assert.equal(navigate({ transition: false }), 0);
});
