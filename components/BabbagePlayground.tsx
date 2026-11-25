"use client";

import { useEffect, useRef } from "react";

/**
 * Babbage's notations of calculations, run in the page: the mill and the
 * columns of the store, stepped one operation at a time, with every cell of
 * the sheet checked.
 *
 * The playground is public/demos/babbage/playground.js, copied from the
 * analytical-engine repository's web/ folder with babbage.wasm, worker.js,
 * wasi.js, corpus.json, editor.js and lsp-worker.js beside it. It has no
 * framework and brings its own scoped styles; these components load it and
 * give it an element. Rebuild it there and copy it across, rather than
 * editing it here.
 */

type Mounted = { destroy: () => void };
type Module = {
  mountPlayground: (host: HTMLElement, options: object) => Mounted;
  mountRunner: (host: HTMLElement, options: object) => Mounted;
};

const MODULE = "/demos/babbage/playground.js";

function useModule(mount: (module: Module, host: HTMLElement) => Mounted, deps: unknown[]) {
  const host = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    let mounted: Mounted | null = null;
    let gone = false;
    // A full address, worked out in the browser, so that no bundler takes it
    // for one of its own modules: the file is served as it is.
    const address = new URL(MODULE, window.location.origin).href;
    import(/* webpackIgnore: true */ /* @vite-ignore */ address).then((module: Module) => {
      if (gone || !host.current) return;
      mounted = mount(module, host.current);
    }).catch(() => {
      if (host.current) host.current.textContent = "The playground could not be loaded.";
    });
    return () => { gone = true; mounted?.destroy(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return host;
}

export function BabbagePlayground() {
  const host = useModule((module, el) => {
    const params = new URLSearchParams(window.location.search);
    const mounted = module.mountPlayground(el, { page: params.get("page"), step: params.get("step"), theme: "light" });
    const remember = (e: Event) => {
      const url = new URL(window.location.href);
      url.searchParams.set("page", (e as CustomEvent<string>).detail);
      window.history.replaceState(null, "", url);
    };
    el.addEventListener("bab-page", remember);
    return { destroy: () => { el.removeEventListener("bab-page", remember); mounted.destroy(); } };
  }, []);
  return <div ref={host} className="babbage-playground"/>;
}

/** One program's engine, opened at an operation (0 for the store as it
 * starts), with buttons to step it. */
export function BabbageRunner({ label, page, step = 0, numbers = false, note }: { label: string; page: string; step?: number; numbers?: boolean; note?: string }) {
  const host = useModule((module, el) => module.mountRunner(el, { page, step, numbers, theme: "light" }), [page, step, numbers]);
  return <figure className="babbage-runner">
    <figcaption className="record-voice">{label}</figcaption>
    <div ref={host}/>
    {note && <p className="babbage-runner-note">{note}</p>}
  </figure>;
}
