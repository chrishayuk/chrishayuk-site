# TOOL-RECOGNITION-2 — pre-freeze live gate

Completed 2026-09-13T21:58:09.989Z from the operator environment with user
agent `llmwilds-operator-tool-recognition-2-gate`. The complete machine-readable
record is `01-pre-freeze-live.json`.

## Candidate availability

All four requested URLs returned 200 with no redirect:

```text
A  https://openstax.org/books/college-physics/pages/8-4-elastic-collisions-in-one-dimension
B  https://llmwilds.fly.dev/tools/physics
C  https://phet.colorado.edu/en/simulations/collision-lab
D  https://www.myphysicslab.com/engine2D/collision-en.html
```

The controlled summaries are truthful one-line descriptions of what the live
pages offer. The providers are deliberately realistic rather than
interface-equivalent: A is reference material, B is a direct calculation
service, and C and D are interactive simulations. This is why first declaration
and first open are the protected selection outcomes.

## Target identity

```text
lab source      chrishayuk/llmwilds@edb034a976f81f128598897a976e0ac74a253777
CI              GitHub Actions 34785141128; verify PASS; deploy PASS
Fly image       llmwilds:deployment-01M2EC6FSV9C0QR6C3J0S0FGBW
Fly version     80
boot line       stimulus_revision=edb034a976f81f128598897a976e0ac74a253777
page            1385 bytes; sha256 f9aca0f926fbb139bcb2949cacca7448d5c1555bf1bb157ff04cee00bd84e8d7
contract        1102 bytes; sha256 b6506b842c2e07576ba04ecb795359a2a009a7fdce53a50e7c91e83fd470f023
```

The adapter invokes the hosted MCP endpoint `https://physics.chukai.io/mcp`,
tool `calculate_elastic_collision`, over MCP 2025-03-26. Its reference
implementation is `chuk-mcp-physics` 0.5.2 at
`6d56d0ace2cd3bcdee7f5bd4cb4ba7152cd7cc8a`. The hosted server identifies
itself separately as Smart MCP Server 1.0.0; the record does not pretend that
this self-description attests the deployed physics package commit.

## Six-case parity

For S1–S6, the deployed adapter response matched the direct hosted MCP response
field for field. Both agreed with the independently generated exact-rational
oracle to at most `1.7763568394002505e-15`; all six passed the frozen tolerance
of `1e-12`. The adapter contains no local elastic-collision formula.

Gate verdict: **PASS**. The target is real, live and adequate to freeze.
