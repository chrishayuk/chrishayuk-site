/** Aggregate route schematic: three subjects per cue, never interpolated events. */
export function DiscoveryRoute({route}:{route:"alternative"|"absent"|"target"}) {
 const target=route==="target", alternative=route==="alternative";
 return <div className="md-route-world" data-state={route}>
  <div className="md-route-heading"><span className="record-voice">{target?"KNOWN DOMAIN":"THE SEARCH VIEW"}</span><span className="record-voice">PROVIDER → CAPABILITY</span></div>
  <svg className="md-route-wide" viewBox="0 0 600 320" role="img" aria-label={target?"The domain reaches LLM Wilds directly; all three agents use its capability.":alternative?"Search reaches alternative providers; all three use them. LLM Wilds is not exposed.":"Search returns no LLM Wilds result. All three stop before target selection."}>
   <path className="md-map-wire" data-active={!target} d="M90 160 H241"/>
   <path className="md-map-wire" data-active={alternative} d="M307 178 C382 178 360 258 447 258"/>
   <path className="md-map-wire" data-blocked={!target} d="M307 142 C382 142 360 62 447 62"/>
   {target&&<path className="md-map-wire" data-active="true" d="M90 143 C210 12 305 62 447 62"/>}
   <g className="md-map-subject"><circle cx="62" cy="160" r="28"/>{[-10,0,10].map(y=><circle key={y} cx="62" cy={160+y} r="2"/>)}<text x="62" y="211" textAnchor="middle">3 AGENTS</text></g>
   <g className="md-map-search" data-bypassed={target}><circle cx="273" cy="160" r="32"/><circle cx="269" cy="156" r="10"/><path d="M277 164 L286 173"/><text x="273" y="218" textAnchor="middle">{target?"SEARCH BYPASSED":"SEARCH"}</text></g>
   <g className="md-map-provider" data-active={target}><rect x="450" y="36" width="53" height="53" rx="2"/><path d="M462 53 H491 M462 62 H481 M462 71 H488"/><text x="476" y="20" textAnchor="middle">LLM WILDS</text><text x="476" y="119" textAnchor="middle">{target?"3/3 USED":"0/3 EXPOSED"}</text></g>
   <g className="md-map-provider" data-active={alternative}><rect x="450" y="232" width="53" height="53" rx="2"/><path d="M462 248 H491 M462 258 H481 M462 267 H488"/><text x="476" y="215" textAnchor="middle">ALTERNATIVES</text><text x="476" y="314" textAnchor="middle">{alternative?"3/3 USED":"OUTSIDE THIS ROUTE"}</text></g>
   {!target&&<g className="md-map-break"><path d="M361 82 L378 99 M378 82 L361 99"/><text x="353" y="47" textAnchor="middle">NOT SHOWN</text></g>}
  </svg>
  <svg className="md-route-compact" viewBox="0 0 360 410" role="img" aria-label={target?"Domain supplied: three agents reached and used LLM Wilds.":alternative?"Search reached alternative providers, used by three agents. LLM Wilds was unseen.":"Search never exposed LLM Wilds to these three agents."}>
   <path className="md-map-wire" data-active={!target} d="M62 98 V198"/>
   <path className="md-map-wire" data-active={alternative} d="M90 245 C175 245 175 337 244 337"/>
   <path className="md-map-wire" data-blocked={!target} d="M90 215 C175 215 175 70 244 70"/>
   {target&&<path className="md-map-wire" data-active="true" d="M90 70 H244"/>}
   <g className="md-map-subject"><circle cx="62" cy="70" r="28"/>{[-10,0,10].map(y=><circle key={y} cx="62" cy={70+y} r="2"/>)}<text x="62" y="25" textAnchor="middle">3 AGENTS</text></g>
   <g className="md-map-search" data-bypassed={target}><circle cx="62" cy="230" r="32"/><circle cx="58" cy="226" r="10"/><path d="M66 234 L75 243"/><text x="62" y="286" textAnchor="middle">{target?"BYPASSED":"SEARCH"}</text></g>
   <g className="md-map-provider" data-active={target}><rect x="245" y="44" width="53" height="53" rx="2"/><path d="M257 61 H286 M257 70 H276 M257 79 H283"/><text x="272" y="25" textAnchor="middle">LLM WILDS</text><text x="272" y="128" textAnchor="middle">{target?"3/3 USED":"0/3 EXPOSED"}</text></g>
   <g className="md-map-provider" data-active={alternative}><rect x="245" y="311" width="53" height="53" rx="2"/><path d="M257 328 H286 M257 337 H276 M257 346 H283"/><text x="265" y="286" textAnchor="middle">ALTERNATIVES</text><text x="265" y="399" textAnchor="middle">{alternative?"3/3 USED":"OUTSIDE THIS ROUTE"}</text></g>
   {!target&&<g className="md-map-break"><path d="M155 162 L171 178 M171 162 L155 178"/><text x="235" y="183" textAnchor="middle">NOT SHOWN</text></g>}
  </svg>
  <div className="md-route-verdict"><strong>{target?"03":alternative?"03":"00"}</strong><p>{target?<>used the target.<br/><em>The address opened the route.</em></>:alternative?<>used another provider.<br/><em>The target stayed unseen.</em></>:<>reached the target.<br/><em>The route ended before selection.</em></>}</p></div>
 </div>;
}
