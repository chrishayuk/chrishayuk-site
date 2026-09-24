import test from "node:test";
import assert from "node:assert/strict";
import { runInNewContext } from "node:vm";
import { pageTransitionScript, canReturnToIndex } from "../lib/page-transitions.ts";

// Exercise the actual before-paint script against browser event contracts.
// Layout, the native snapshot animation and embedded playback require a browser.
const origin = "https://chrishayuk.com";
const film = "/film/youtube/selected-film";
function navigate({ from = "/", to = film, reduced = false, paused = false,
  storageBlocked = false, room = false, activation = true, transition = true,
  notebookPage = false, notes = [] as string[] } = {}) {
  let handler: (event: object) => void = () => { throw new Error("listener missing"); };
  let skips = 0;
  runInNewContext(pageTransitionScript, {
    URL, location: { origin, pathname: from }, history: { length: 2 },
    window: { addEventListener: (name: string, callback: typeof handler) => {
      assert.equal(name, "pageswap"); handler = callback;
    } },
    sessionStorage: { getItem: () => {
      if (storageBlocked) throw new Error("storage denied");
      return paused ? "paused" : null;
    } },
    matchMedia: () => ({ matches: reduced }),
    document: { querySelectorAll: () => notes.map(path => ({getAttribute: () => path})), querySelector: (selector: string) =>
      selector === "[data-film-destination]" && from === "/" ? { getAttribute: () => film }
        : selector === "[data-film-journey]" && room ? {}
        : selector === "[data-notebook-page]" && notebookPage ? {} : null },
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

test("Notebook transitions only open a note actually present in the contents", () => {
  const note = "/notebook/the-repairer-left";
  assert.equal(navigate({from: "/notebook", to: note, notes: [note]}), 0);
  assert.equal(navigate({from: "/notebook", to: "/notebook/another-note", notes: [note]}), 1);
  assert.equal(navigate({from: "/notebook", to: "https://elsewhere.test" + note, notes: [note]}), 1);
  assert.equal(navigate({from: "/notebook", to: "/notebook/archive", notes: [note]}), 1);
});
test("Notebook returns use the contents route and honour both motion preferences", () => {
  const note = "/notebook/the-repairer-left";
  assert.equal(navigate({from: note, to: "/notebook", notebookPage: true}), 0);
  assert.equal(navigate({from: note, to: "/notebook", notebookPage: true, reduced: true}), 1);
  assert.equal(navigate({from: note, to: "/notebook", notebookPage: true, paused: true}), 1);
  assert.equal(navigate({from: note, to: "/notebook", notebookPage: false}), 1);
  assert.equal(navigate({from: note, to: "/research", notebookPage: true}), 1);
});

test("return links only traverse a direct unchanged history entry", () => {
  const visit = {referrer: origin + "/notebook", origin, index: "/notebook", path: "/notebook/one", length: 3, entry: {path: "/notebook/one", length: 3}};
  assert.equal(canReturnToIndex(visit), true);
  assert.equal(canReturnToIndex({...visit, path: "/notebook/two"}), false);
  assert.equal(canReturnToIndex({...visit, length: 4}), false);
  assert.equal(canReturnToIndex({...visit, referrer: ""}), false);
  assert.equal(canReturnToIndex({...visit, referrer: "https://elsewhere.test/notebook"}), false);
  assert.equal(canReturnToIndex({...visit, entry: undefined}), false);
  assert.equal(canReturnToIndex({...visit, length: 1, entry: {...visit.entry, length: 1}}), false);
});
