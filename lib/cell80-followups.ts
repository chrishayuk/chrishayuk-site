import evidence from "./data/cell80-followups.json" with { type: "json" };

export const cell80Followups = evidence;
export const realization = (() => {
  const rows = evidence.assays;
  const events = rows.filter(r => r.births.B > 0 || r.births.BC > 0);
  return {
    total: rows.length,
    events: events.length,
    positive: events.filter(r => r.births.BC > r.births.B).length,
    tied: events.filter(r => r.births.BC === r.births.B).length,
    negative: events.filter(r => r.births.BC < r.births.B).length,
    unrealized: rows.length - events.length,
    arms: (["A", "B", "C", "BC"] as const).map(id => ({ id, count: rows.filter(r => r.births[id] > 0).length })),
  };
})();
