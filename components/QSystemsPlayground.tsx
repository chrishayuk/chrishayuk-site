"use client";

import { useEffect, useRef } from "react";

/**
 * The Q-systems in the page: a treatment and its data, and for each phase the
 * graph of strings as the first phase grows it, one rule application at a
 * time, then what the second phase removes and what is left.
 *
 * The playground is public/demos/q-systems/playground.js, copied from the
 * q-systems repository's web/ folder with qsys.wasm, worker.js, lsp-worker.js, wasi.js and
 * examples.json beside it, and its styles are app/q-systems-demo.css, copied
 * from web/playground.css. It has no framework; these components load it and
 * give it an element. Rebuild it there and copy it across, rather than
 * editing it here.
 */

type Mounted = { destroy: () => void };
type Module = {
  mountPlayground: (host: HTMLElement, options: object) => Mounted;
  mountRunner: (host: HTMLElement, options: object) => Mounted;
};

const MODULE = "/demos/q-systems/playground.js";

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

export function QSystemsPlayground() {
  const host = useModule((module, el) => {
    const params = new URLSearchParams(window.location.search);
    const mounted = module.mountPlayground(el, { initial: params.get("example") || "abc", theme: "light" });
    const remember = (e: Event) => {
      const url = new URL(window.location.href);
      url.searchParams.set("example", (e as CustomEvent<string>).detail);
      window.history.replaceState(null, "", url);
    };
    el.addEventListener("qs-example", remember);
    return { destroy: () => { el.removeEventListener("qs-example", remember); mounted.destroy(); } };
  }, []);
  return <div ref={host} className="qsystems-playground"/>;
}

/** One treatment and its data, a button to run them, and what qsys prints.
 * `args` go before the program: ["--det"], ["--max-arrows", "12"] … */
export function QSystemsRunner({ label, example, program, data, args = [], note }: { label: string; example?: string; program?: string; data?: string; args?: string[]; note?: string }) {
  const host = useModule((module, el) => module.mountRunner(el, { example, program, data, args, note, theme: "light" }), [example, program, data, args.join(" "), note]);
  return <figure className="qsystems-runner">
    <figcaption className="record-voice">{label}</figcaption>
    <div ref={host}/>
  </figure>;
}
