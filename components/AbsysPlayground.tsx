"use client";

import { useEffect, useRef } from "react";

/**
 * Absys in the page: a text, and the computation after each of its
 * assertions: every derivation, its bindings and suspended equations, the
 * tree of alternatives, and every step.
 *
 * The playground is public/demos/absys/playground.js, copied from the absys
 * repository's web/ folder with absys.wasm, worker.js, wasi.js,
 * lsp-worker.js and examples.json beside it, and its styles are
 * app/absys-demo.css, copied from web/playground.css. It has no framework;
 * these components load it and give it an element. Rebuild it there and copy
 * it across, rather than editing it here.
 */

type Mounted = { destroy: () => void };
type Module = {
  mountPlayground: (host: HTMLElement, options: object) => Mounted;
  mountRunner: (host: HTMLElement, options: object) => Mounted;
};

const MODULE = "/demos/absys/playground.js";

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

export function AbsysPlayground() {
  const host = useModule((module, el) => {
    const params = new URLSearchParams(window.location.search);
    const mounted = module.mountPlayground(el, { initial: params.get("example") || "assertions-not-assignments", theme: "light" });
    const remember = (e: Event) => {
      const url = new URL(window.location.href);
      url.searchParams.set("example", (e as CustomEvent<string>).detail);
      window.history.replaceState(null, "", url);
    };
    el.addEventListener("ab-example", remember);
    return { destroy: () => { el.removeEventListener("ab-example", remember); mounted.destroy(); } };
  }, []);
  return <div ref={host} className="absys-playground"/>;
}

/** One text, a button to run it, and what absys prints. `args` go before the
 * text: ["--each"], ["--env"], ["permute"], ["--select", "fifo"] … */
export function AbsysRunner({ label, example, text, notation = "1990", args = [], note }: { label: string; example?: string; text?: string; notation?: "1990" | "1969"; args?: string[]; note?: string }) {
  const host = useModule((module, el) => module.mountRunner(el, { example, text, notation, args, note, theme: "light" }), [example, text, notation, args.join(" "), note]);
  return <figure className="absys-runner">
    <figcaption className="record-voice">{label}</figcaption>
    <div ref={host}/>
  </figure>;
}
