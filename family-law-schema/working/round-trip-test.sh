#!/usr/bin/env bash
# Round-trip integration test:
#   1. Validate sample-filled.json against schema
#   2. Render sample-filled.json to .docx
#   3. Run InstructIT-export bridge on sample export
#   4. Confirm bridge output is valid JSON with expected stats
#
# Returns 0 on full pass, 1 on any failure.

set -uo pipefail
DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$DIR"

PASS=0
FAIL=0
NOTE=""

step() {
  local name="$1"
  shift
  echo ""
  echo "=== $name ==="
  if "$@"; then
    echo "  ✅ pass"
    ((PASS++))
  else
    echo "  ❌ FAIL"
    ((FAIL++))
    NOTE="$NOTE; $name"
  fi
}

step "1. Validate sample-filled.json against unified schema" \
  bash -c "node validate.mjs > /tmp/rt-1.log 2>&1 && grep -q 'validates against' /tmp/rt-1.log"

step "2. Render sample-filled.json to .docx" \
  bash -c "rm -f separation-agreement-draft.docx && node working/render-docx.mjs > /tmp/rt-2.log 2>&1 && [[ -s separation-agreement-draft.docx ]]"

step "3. Run InstructIT-export bridge on sample" \
  bash -c "rm -f schema/instructit-export.json && node working/instructit-to-schema.mjs working/sample-instructit-export.json > /tmp/rt-3.log 2>&1 && [[ -s schema/instructit-export.json ]]"

step "4. Bridge output has expected stats" \
  bash -c "
    entries=\$(jq '._stats.total_entries' schema/instructit-export.json)
    affect=\$(jq '._stats.affect_snapshots_recorded' schema/instructit-export.json)
    stress=\$(jq '._stats.stress_gate_confirmations' schema/instructit-export.json)
    [[ \$entries -eq 5 && \$affect -eq 5 && \$stress -eq 1 ]]
  "

step "5. Hash chain in bridge output is sequential" \
  bash -c "
    entries=\$(jq '.instructions_record.entries | length' schema/instructit-export.json)
    seq_ok=\$(jq '[.instructions_record.entries[] | .sequence] == [range(1; .instructions_record.entries | length + 1)]' schema/instructit-export.json)
    [[ \$entries -eq 5 && \$seq_ok == 'true' ]]
  "

step "6. Schema declares 2020-12 dialect" \
  bash -c "[[ \"\$(jq -r '.\"\$schema\"' schema/agreement.schema.json)\" == 'https://json-schema.org/draft/2020-12/schema' ]]"

step "7. Schema has ≥48 top-level properties" \
  bash -c "[[ \$(jq '.properties | length' schema/agreement.schema.json) -ge 48 ]]"

step "8. Sample tree node count == log entries (round-trip integrity)" \
  bash -c "
    src_log=\$(jq '.log | length' working/sample-instructit-export.json)
    out_entries=\$(jq '.instructions_record.entries | length' schema/instructit-export.json)
    [[ \$src_log -eq \$out_entries ]]
  "

echo ""
echo "==================================="
echo " Pass: $PASS  /  Fail: $FAIL"
if [[ $FAIL -gt 0 ]]; then
  echo " Failures: $NOTE"
  exit 1
fi
echo " ✅ All round-trip checks passed."
exit 0
