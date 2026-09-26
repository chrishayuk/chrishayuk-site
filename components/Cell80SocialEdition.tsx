import type { PublicationRecord } from '@/lib/types';
import preview from '@/lib/data/cell80-home-preview.json';

/** The same recorded EX-4 states used on the homepage, without a simulated outcome. */
export function Cell80SocialEdition({ record, format, assetOrigin }: {
  record: PublicationRecord;
  format: 'linkedin' | 'x' | 'og';
  assetOrigin: string;
}) {
  const portrait = format === 'linkedin', og = format === 'og';
  const scale = og ? .75 : 1;
  const imageSize = portrait ? 504 : 360 * scale;
  const muted = '#b7b8aa';
  return <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', padding: portrait ? '64px 72px 56px' : og ? '40px 48px' : '58px 64px', background: '#10150f', color: '#f2f0eb', fontFamily: 'Archivo' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 22 * scale }}><span>Chris Hay</span><span>Notebook / Cell80</span></div>
    <div style={{ display: 'flex', flex: 1, flexDirection: portrait ? 'column' : 'row', alignItems: portrait ? 'stretch' : 'center', justifyContent: 'center', gap: portrait ? 70 : 56 * scale }}>
      <div style={{ display: 'flex', flexDirection: 'column', width: portrait ? '100%' : 640 * scale, gap: portrait ? 30 : 28 * scale }}>
        <div style={{ display: 'flex', fontFamily: 'Newsreader', fontSize: portrait ? 96 : 82 * scale, lineHeight: 1.04, letterSpacing: -2 * scale }}>{record.title}</div>
        <div style={{ display: 'flex', fontSize: portrait ? 28 : 26 * scale, color: muted }}>One birth. Two recorded histories.</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', width: portrait ? '100%' : 760 * scale, gap: 24 * scale }}>
        <div style={{ display: 'flex', fontSize: portrait ? 22 : 20 * scale, color: muted }}>EX-4 / Tick 1,080</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: portrait ? 48 : 40 * scale }}>
          {preview.histories.map(history => <div key={history.label} style={{ display: 'flex', flexDirection: 'column', width: imageSize, gap: portrait ? 20 : 18 * scale }}>
            <span style={{ fontSize: portrait ? 24 : 22 * scale }}>{history.label}</span>
            {/* Native img is required by ImageResponse. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={new URL(history.image, assetOrigin).href} width={imageSize} height={imageSize} alt={history.label}/>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 * scale }}><span style={{ fontFamily: 'Newsreader', fontSize: portrait ? 72 : 58 * scale, lineHeight: 1 }}>{history.share}</span><span style={{ fontSize: portrait ? 22 : 20 * scale, color: muted }}>carry program 33</span></div>
          </div>)}
        </div>
      </div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 * scale }}>
      <span style={{ fontSize: portrait ? 23 : 21 * scale, lineHeight: 1.5, maxWidth: portrait ? 1000 : 1320 * scale, color: muted }}>Undo the program change at birth; keep the other birth changes. Amber marks program 33. A mark can contain several organisms.</span>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: portrait ? 19 : 18 * scale, color: muted }}><span>{record.created} / {record.publication === 'draft' ? 'Working note' : 'Research note'}</span><span>chrishayuk.com</span></div>
    </div>
  </div>;
}
