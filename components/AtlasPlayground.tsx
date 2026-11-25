"use client";

import { useEffect, useRef } from "react";

/**
 * Atlas Autocode on the Flexowriter: the keyboard, the page it typed, the
 * seven-track tape it punched, and the line printer, with COMPILER AA or AB.
 *
 * The playground is public/demos/atlas-autocode/playground.js, copied from
 * the atlas-autocode repository's web/ folder with flexowriter.js,
 * worker.js, wasi.js, aa.wasm and the examples beside it. It has no
 * framework; these components load it and give it an element. Rebuild it
 * there and copy it across, rather than editing it here.
 */

type Mounted = { destroy: () => void };
type Module = {
  mountPlayground: (host: HTMLElement, options: object) => Mounted;
  mountRunner: (host: HTMLElement, options: object) => Mounted;
};

const MODULE = "/demos/atlas-autocode/playground.js";

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

export function AtlasPlayground() {
  const host = useModule((module, el) => {
    const params = new URLSearchParams(window.location.search);
    const mounted = module.mountPlayground(el, { example: params.get("example"), autorun: params.has("run") });
    const remember = (e: Event) => {
      const url = new URL(window.location.href);
      url.searchParams.set("example", (e as CustomEvent<string>).detail);
      window.history.replaceState(null, "", url);
    };
    el.addEventListener("aa-example", remember);
    return { destroy: () => { el.removeEventListener("aa-example", remember); mounted.destroy(); } };
  }, []);
  return <div ref={host} className="atlas-playground"/>;
}

/** One program, a button to run it, what it prints, and for the two
 * programs of 1965 the page that was printed then. */
export function AtlasRunner({ label, example, tape, compiler = "aa", note }: { label: string; example?: string; tape?: string; compiler?: "aa" | "ab"; note?: string }) {
  const host = useModule((module, el) => module.mountRunner(el, { example, tape, compiler }), [example, tape, compiler]);
  return <figure className="atlas-runner">
    <figcaption className="record-voice">{label}</figcaption>
    <div ref={host}/>
    {note && <p className="atlas-runner-note">{note}</p>}
  </figure>;
}
