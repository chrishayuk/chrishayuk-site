import test from "node:test";
import assert from "node:assert/strict";
import { runInNewContext } from "node:vm";
import { pageTransitionScript, canReturnToIndex } from "../lib/page-transitions.ts";

// Exercise the actual before-paint script against browser event contracts.
// Layout, the native snapshot animation and embedded playback require a browser.
const origin = "https://chrishayuk.com";
const film = "/film/youtube/selected-film";
function fixture({ from = "/", to = film, reduced = false, paused = false,
  storageBlocked = false, room = false, activation = true, transition = true,
  notebookPage = false, notes = [] as string[], previous = "/notebook" } = {}) {
  const handlers: Record<string, (event: object) => void> = {};
  let skips = 0;
  let complete: () => void = () => {};
  const finished = new Promise<void>(resolve => { complete = resolve; });
  const surfaces = notes.map(path => ({ getAttribute: () => path, style: {viewTransitionName: ""}, getBoundingClientRect: () => ({top: 100, bottom: 400}) }));
  const paper = {style: {viewTransitionName: ""}};
  const root = {dataset: {} as Record<string,string>};
  const viewTransition = transition ? {skipTransition: () => { skips++; }, finished} : undefined;
  runInNewContext(pageTransitionScript, {
    URL, location: { origin, pathname: from }, history: { length: 2 },
    window: {innerHeight: 900, navigation: {activation: {from: {url: new URL(previous, origin).href}}}, addEventListener: (name: string, callback: (event: object) => void) => { handlers[name] = callback; }},
    sessionStorage: { getItem: () => {
      if (storageBlocked) throw new Error("storage denied");
      return paused ? "paused" : null;
    } },
    matchMedia: () => ({ matches: reduced }),
    document: {documentElement: root, querySelectorAll: () => surfaces, querySelector: (selector: string) =>
      selector === "[data-film-destination]" && from === "/" ? { getAttribute: () => film }
        : selector === "[data-film-journey]" && room ? {}
        : selector === "[data-notebook-page]" && notebookPage ? {}
        : selector === ".codex-book" && notebookPage ? paper : null },
  });
  return { surfaces, paper, root, complete, finished, skips: () => skips,
    swap: () => handlers.pageswap({ activation: activation ? {entry: {url: new URL(to, origin).href}} : undefined, viewTransition }),
    reveal: () => handlers.pagereveal({viewTransition}) };
}
function navigate(options: Parameters<typeof fixture>[0] = {}) {
  const browser = fixture(options); browser.swap(); return browser.skips();
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


test("the chosen notebook cover shares paper and clears its name for history restoration", async () => {
  const note = "/notebook/one";
  const browser = fixture({from: "/notebook", to: note + "#open-notebook", notes: ["/notebook/two", note]});
  browser.swap();
  assert.equal(browser.surfaces[0].style.viewTransitionName, "");
  assert.equal(browser.surfaces[1].style.viewTransitionName, "notebook-paper");
  assert.equal(browser.root.dataset.notebookJourney, "open");
  browser.complete(); await browser.finished;
  assert.equal(browser.surfaces[1].style.viewTransitionName, "");
  assert.equal(browser.root.dataset.notebookJourney, undefined);
});
test("arrival shares the first-page paper and history return finds the matching cover", () => {
  const note = "/notebook/one";
  const arrival = fixture({from: note, notebookPage: true});
  arrival.reveal();
  assert.equal(arrival.paper.style.viewTransitionName, "notebook-paper");
  const back = fixture({from: "/notebook", previous: note, notes: [note]});
  back.reveal();
  assert.equal(back.surfaces[0].style.viewTransitionName, "notebook-paper");
  assert.equal(back.root.dataset.notebookJourney, "close");
});
test("motion preferences and external arrivals never name or animate notebook paper", () => {
  for (const options of [{reduced: true}, {paused: true}, {previous: "https://elsewhere.test/notebook"}]) {
    const browser = fixture({from: "/notebook/one", notebookPage: true, ...options});
    browser.reveal();
    assert.equal(browser.paper.style.viewTransitionName, "");
  }
});
test("duplicate entrances animate the visible cover, not the offscreen latest link", () => {
  const note = "/notebook/one";
  const browser = fixture({from: "/notebook", to: note, notes: [note, note]});
  browser.surfaces[0].getBoundingClientRect = () => ({top: -500, bottom: -200});
  browser.swap();
  assert.equal(browser.surfaces[0].style.viewTransitionName, "");
  assert.equal(browser.surfaces[1].style.viewTransitionName, "notebook-paper");
});
