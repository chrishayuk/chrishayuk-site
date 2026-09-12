"""Project recorded states; never run the agent or invent intermediate frames."""
import argparse
import hashlib
import json
from pathlib import Path

parser = argparse.ArgumentParser()
parser.add_argument("source", type=Path, help="Directory containing the original a1b result JSON files")
args = parser.parse_args()
root = Path(__file__).resolve().parents[1]
ledger = json.loads((root / "public/data/ecology/evidence.json").read_text())
output = {"scope": "Recorded state boundaries and exact supplied user records. Layout is a diagram, not spatial telemetry. No inference or interpolated state.", "sources": {}, "worlds": {}, "decisions": {}}

def state(value):
    return {key: value[key] for key in ("board", "resources", "known", "settled")}

for n in (5, 9, 11, 12):
    entry = next(e for e in ledger["experiments"] if e["number"] == n)
    source = entry["verifiedResult"]
    data = (args.source / source["filename"]).read_bytes()
    assert hashlib.sha256(data).hexdigest() == source["sha256"], f"A1B{n}: source changed"
    record = json.loads(data)
    output["sources"][str(n)] = {"run": entry["run"], "sha256": source["sha256"], "filename": source["filename"]}
    if n == 5:
        for name, session in record["sessions"].items():
            frames = []
            for episode, finished in enumerate(session["finished"]):
                for turn, row in enumerate(finished["rows"]):
                    frames.append({"episode": episode + 1, "round": turn // 2 + 1, "actor": row["actor"], "action": row["raw"], "executed": row["executed"], "before": state(row["before"]), "after": state(row["after"])})
            output["worlds"][name] = {"frames": frames, "archive": session["archive"] is not None}
    else:
        groups = {}
        for row in record["rows"]:
            name = row.get("lineage", row.get("arm"))
            user = row["request"]["messages"][-1]["content"]
            frames = groups.setdefault(name, [])
            frames.append({"case": row["case_id"], "input": user, "requestSha256": row["request_sha256"], "action": row["reply"], "executed": row["world_row"]["executed"], "ownActions": row.get("own_actions", []), "external": row.get("external_present", row.get("artefact_present", False)), "before": state(row["world_row"]["before"]), "after": state(row["world_row"]["after"])})
        output["decisions"][str(n)] = groups

path = root / "public/data/ecology/replays.json"
path.write_text(json.dumps(output, ensure_ascii=False, separators=(",", ":")) + "\n")
print(f"Wrote {path.name}: 72 world events and 72 decision records, all from verified sources.")
