'use client';
import type { ReactNode } from 'react';
import { useNotebookEdition } from '@chrishayuk/hause/components/NotebookEdition';
import { NotebookFilm } from '@chrishayuk/hause/components/NotebookTemplate';

/** The same source player gets a paper mount only inside a notebook edition. */
export function NotebookScreening({ children, caption, timestamp, source }: {
 children: ReactNode; caption: ReactNode; timestamp: string; source: { href: string; label: string };
}) {
 const notebook = useNotebookEdition();
 if (notebook) return <NotebookFilm caption={caption} timestamp={timestamp} source={source}>{children}</NotebookFilm>;
 return <figure className="notebook-screening">{children}<figcaption><span className="record-voice">FROM THE FILM / {timestamp}</span><p>{caption}</p><a className="text-link" href={source.href}>{source.label} ↗</a></figcaption></figure>;
}
