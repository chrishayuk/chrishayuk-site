"use client";

import { useEffect, type ReactNode } from "react";

/** Open cited field notes before scrolling to their existing semantic anchor. */
export function NotebookFieldNotes({ children }: {
    children: ReactNode;
}) {
    useEffect(() => {
        const revealCitation = () => {
            if (!/^#act-\d+$/.test(window.location.hash))
                return;
            const target = document.getElementById(window.location.hash.slice(1));
            const details = target?.closest("details") || target?.querySelector("details");
            if (details) {
                details.open = true;
                target?.scrollIntoView({ behavior: "instant", block: "start" });
            }
        };
        revealCitation();
        window.addEventListener("hashchange", revealCitation);
        return () => window.removeEventListener("hashchange", revealCitation);
    }, []);
    return <div className="authority-field-notes">{children}</div>;
}
