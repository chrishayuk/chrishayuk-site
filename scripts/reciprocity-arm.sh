#!/usr/bin/env bash
# MACHINE-RECIPROCITY-1 — run one cell the same way every time.
#
# Six cells across three deployments is six chances to run a cell against
# the previous arm, and that failure is invisible afterwards: the
# transcript looks fine, the funnel looks fine, and two cells are wrong
# with nothing in the record to say so. So the arm is verified from the
# outside, before the visitor is dispatched, and the check goes into the
# transcript rather than into somebody's memory of having done it.
set -euo pipefail
SITE=https://chrishayuk.com

case "${1:-}" in
precheck)
  echo "=== arm precheck $(date -u +%Y-%m-%dT%H:%M:%SZ) ==="
  want=$(git rev-parse HEAD)
  got=$(curl -s $SITE/api/health | sed -n 's/.*"commit":"\([^"]*\)".*/\1/p')
  echo "expected commit : $want"
  echo "deployed commit : $got"
  # A push that fails CI leaves the previous revision running and says nothing
  # about it. That is how a cell gets run against the wrong arm while every
  # visible signal looks correct, so it stops here rather than warning.
  [ "$want" = "$got" ] || { echo "REFUSING        : deployed revision is not HEAD"; exit 1; }
  echo "fly.toml arm    : $(grep -E '^  MACHINE_REWARD' fly.toml | tr -s ' ')"
  ask=$(curl -s -o /dev/null -w '%{http_code}' "$SITE/api/machines/ask?question=test&function=verifier")
  adv=$(curl -s $SITE/llms.txt | grep -c 'machines/ask' || true)
  fn=$(curl -s $SITE/llms.txt | grep 'machines/ask' | grep -c 'function=' || true)
  echo "ask status      : $ask"
  echo "llms ask lines  : $adv  (with function=: $fn)"
  if   [ "$ask" = 404 ] && [ "$adv" = 0 ];              then echo "SERVING         : none"
  elif [ "$ask" = 200 ] && [ "$adv" -gt 0 ] && [ "$fn" = 0 ]; then echo "SERVING         : parity"
  elif [ "$ask" = 200 ] && [ "$fn" -gt 0 ];             then echo "SERVING         : superior"
  else echo "SERVING         : INCONSISTENT — do not run a cell against this"; exit 1; fi
  echo
  echo "window starts after this line. Every operator request from here on is"
  echo "contamination and belongs in the corrections ledger."
  echo "WINDOW_START=$(date -u +%Y-%m-%dT%H:%M:%SZ)"
  ;;
capture)
  n=$2; reward=$3; visit=$4; jsonl=$5; window=$6
  out="docs/reciprocity/arm-$n-$reward-$visit"
  cp "$jsonl" "$out.jsonl"
  python3 scripts/reciprocity-transcript.py "$jsonl" "$out.md" "arm $n — reward=$reward, visit=$visit"
  echo
  echo "=== server-side funnel since $window ==="
  node --experimental-strip-types scripts/reciprocity-observe.ts --since "$window"
  ;;
*) echo "usage: $0 precheck | capture <n> <reward> <visit> <agent.jsonl> <window-start>"; exit 2;;
esac
