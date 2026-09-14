import { ecologySeriesUpdates } from '@/lib/ecology-series-updates';
import '@/app/world-remembers.css';
export function EcologySeriesUpdate({id}:{id:string}){
 const update=ecologySeriesUpdates[id];
 if(!update)return null;
 return <aside className="ecology-series-update" id="series-update" role="note"><p className="record-voice">SERIES UPDATE / 14 SEPTEMBER 2026</p><p>{update.text}</p><a href={update.href}>{update.label} ↗</a><p className="record-voice">The original experiment and its recorded conclusions are preserved below.</p></aside>;
}
