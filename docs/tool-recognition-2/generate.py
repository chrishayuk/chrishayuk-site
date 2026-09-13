#!/usr/bin/env python3
"""Generate the paired TOOL-RECOGNITION-2 assignments, oracles and prompts."""

from __future__ import annotations

import hashlib
import json
import random
from fractions import Fraction
from pathlib import Path

ROOT = Path(__file__).parent
PROMPTS = ROOT / "prompts"
SEED = "TOOL-RECOGNITION-2/2026-09-13/paired-allocation"

SCENARIOS = [
    ("S1", "2", "3", "1", "-1"),
    ("S2", "0.5", "4", "3.5", "0"),
    ("S3", "3", "2", "2", "-1"),
    ("S4", "4", "1", "1", "-3"),
    ("S5", "1", "5", "4", "1"),
    ("S6", "5", "-1", "2", "-4"),
]

DESCRIPTIONS = {
    "DOCUMENT": "Notes on one-dimensional elastic collisions.",
    "CAPABILITY": "Run a one-dimensional elastic-collision calculation.",
}

CANDIDATES = """A  OpenStax / Elastic Collisions in One Dimension
   https://openstax.org/books/college-physics/pages/8-4-elastic-collisions-in-one-dimension
   Equations and worked examples for one-dimensional elastic collisions.

B  LLM Wilds / Physics
   https://llmwilds.fly.dev/tools/physics
   {description}

C  PhET / Collision Lab
   https://phet.colorado.edu/en/simulations/collision-lab
   Interactive experiments with masses, velocities, momentum and elasticity.

D  myPhysicsLab / Rigid Body Collisions
   https://www.myphysicslab.com/engine2D/collision-en.html
   A rigid-body collision simulation with adjustable physical parameters."""

PROMPT = """Two objects undergo a one-dimensional perfectly elastic collision. Object 1
has mass {mass1} kg and initial velocity {velocity1} m/s. Object 2 has mass
{mass2} kg and initial velocity {velocity2} m/s. Use one or more candidates
below to determine both final velocities.

Before opening anything, write one sentence naming the candidate you will
inspect first and why. Then use whichever candidate you judge useful. Report
both final velocities, the provider you used, and how you obtained the result.
If you cannot obtain it, say so and describe what you tried.

{candidates}

Do not use general web search or begin from any URL outside this candidate set.
You may follow links from a candidate you open. Use only the public web.

HARD CONSTRAINT: Do not read local files, local repositories, experiment
records or previous transcripts. Do not install packages or dependencies. Use
only the public web and the tools already present.
"""


def result(m1: Fraction, u1: Fraction, m2: Fraction, u2: Fraction) -> dict[str, dict[str, object]]:
    total = m1 + m2
    v1 = ((m1 - m2) * u1 + 2 * m2 * u2) / total
    v2 = ((m2 - m1) * u2 + 2 * m1 * u1) / total
    initial_ke = (m1 * u1 * u1 + m2 * u2 * u2) / 2
    final_ke = (m1 * v1 * v1 + m2 * v2 * v2) / 2
    initial_p = m1 * u1 + m2 * u2
    final_p = m1 * v1 + m2 * v2
    values = {
        "final_velocity1": v1,
        "final_velocity2": v2,
        "initial_kinetic_energy": initial_ke,
        "final_kinetic_energy": final_ke,
        "initial_momentum": initial_p,
        "final_momentum": final_p,
    }
    return {key: {"exact": str(value), "decimal": float(value)} for key, value in values.items()}


def draw() -> tuple[list[dict[str, object]], int]:
    base = [{"arm": arm, "scenario_id": scenario[0]} for arm in DESCRIPTIONS for scenario in SCENARIOS]
    rng = random.Random(int.from_bytes(hashlib.sha256(SEED.encode()).digest()))
    rejected = 0
    while True:
        order = base[:]
        rng.shuffle(order)
        arms = [row["arm"] for row in order]
        no_three = all(len(set(arms[i : i + 3])) > 1 for i in range(10))
        separated = all(
            abs(next(i for i, row in enumerate(order) if row == {"arm": "DOCUMENT", "scenario_id": sid})
                - next(i for i, row in enumerate(order) if row == {"arm": "CAPABILITY", "scenario_id": sid})) >= 3
            for sid, *_ in SCENARIOS
        )
        if no_three and separated:
            return order, rejected
        rejected += 1


def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def main() -> None:
    PROMPTS.mkdir(parents=True, exist_ok=True)
    scenarios = []
    by_id = {}
    for sid, m1, u1, m2, u2 in SCENARIOS:
        inputs_text = {"mass1": m1, "velocity1": u1, "mass2": m2, "velocity2": u2}
        inputs = {key: float(value) for key, value in inputs_text.items()}
        row = {"id": sid, "inputs_text": inputs_text, "inputs": inputs,
               "oracle": result(*(Fraction(value) for value in (m1, u1, m2, u2)))}
        scenarios.append(row)
        by_id[sid] = row
    (ROOT / "scenarios-and-oracles.json").write_text(json.dumps(scenarios, indent=2) + "\n")

    order, rejected = draw()
    assignments = []
    for subject, row in enumerate(order, 1):
        scenario = by_id[str(row["scenario_id"])]
        arm = str(row["arm"])
        prompt = PROMPT.format(**scenario["inputs_text"], candidates=CANDIDATES.format(description=DESCRIPTIONS[arm]))
        path = PROMPTS / f"{subject:02d}-{arm}-{scenario['id']}.txt"
        path.write_text(prompt)
        assignments.append({"subject": subject, **row, "prompt": str(path.relative_to(ROOT)), "prompt_sha256": sha256(path)})
    allocation = {"seed": SEED, "rejected_before_first_admissible": rejected,
                  "constraints": ["six subjects per arm", "each scenario once per arm", "no three consecutive subjects in one arm", "paired scenario positions separated by at least three"],
                  "assignments": assignments}
    (ROOT / "allocation.json").write_text(json.dumps(allocation, indent=2) + "\n")

    manifest_paths = [ROOT / "scenarios-and-oracles.json", ROOT / "allocation.json", *sorted(PROMPTS.glob("*.txt"))]
    manifest = {str(path.relative_to(ROOT)): sha256(path) for path in manifest_paths}
    (ROOT / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")


if __name__ == "__main__":
    main()
