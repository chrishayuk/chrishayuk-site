/** These figures show recorded gates. Marks are counts, never spatial states. */
export function Cell80SurvivalGate() {
  return <figure className="cell80-evidence-path">
    <figcaption className="record-voice">EX-9 / WHERE THE CAUSAL TEST STOPPED</figcaption>
    <div className="cell80-gate-stages">{[
      { count: 12, label: "worlds started", detail: "Six at each swap rate." },
      { count: 11, label: "kept both species", detail: "Eligible for the response screens." },
      { count: 0, label: "passed either screen", detail: "No proposed response advanced to replay." },
    ].map(stage => <div key={stage.label}><div className="cell80-count-marks" aria-hidden="true">{Array.from({length:12},(_,i)=><i key={i} data-filled={i<stage.count}/>)}</div><strong>{stage.count}<small> / 12</small></strong><h3>{stage.label}</h3><p>{stage.detail}</p></div>)}</div>
    <p className="cell80-caption">One mark = one world. The final screen result is 0 of 11 eligible worlds. This sequence separates survival, statistical screening and causal replay.</p>
  </figure>;
}

export function Cell80TimingGate() {
  return <figure className="cell80-timing-gate">
    <figcaption className="record-voice">EX-11 / ALIGN BOTH HISTORIES AT ESTABLISHMENT</figcaption>
    <div className="cell80-timing-labels record-voice"><span>BEFORE</span><span>ESTABLISHED</span><span>AFTER</span></div>
    <div className="cell80-timing-rows">{[{seed:5,change:2050,established:2069,gap:19},{seed:6,change:560,established:564,gap:4}].map(row=><div className="cell80-timing-row" key={row.seed}>
      <span className="record-voice">WORLD +{row.seed}</span>
      <div className="cell80-timing-axis" aria-hidden="true"><i style={{left:`${50-row.gap*2}%`}}/><b/><span/></div>
      <p><strong>{row.gap} ticks too early.</strong> Intake changed at {row.change.toLocaleString("en-GB")}; capability established at {row.established.toLocaleString("en-GB")}.</p>
    </div>)}</div>
    <p className="cell80-caption">Shared scale: 25 ticks before to 25 after establishment. ● = food-intake change; vertical line = establishment; shaded right half = timing allowed by the rule. Neither event qualified.</p>
  </figure>;
}

export function Cell80InheritanceGate() {
  return <figure className="cell80-inheritance-gate">
    <figcaption className="record-voice">EX-13 / TEN FUTURES, EIGHT WINS REQUIRED</figcaption>
    <div className="cell80-ten-futures" role="img" aria-label="Six successful comparisons, then four with no offspring. The required eight wins were not reached.">{Array.from({length:10},(_,i)=><div key={i} data-win={i<6} data-threshold={i===7}><span aria-hidden="true">{i<6?"+":"∅"}</span><small>{i+1}</small>{i===7&&<b className="record-voice">8 REQUIRED</b>}</div>)}</div>
    <div className="cell80-gate-key"><span>+ 6 supported dependence</span><span>∅ 4 had no offspring in any version</span></div>
    <p className="cell80-caption">Grouped by outcome, not seed order. Six wins fall short of eight. EX-14 then separated the chance of reproduction from the benefit when reproduction happens.</p>
  </figure>;
}
