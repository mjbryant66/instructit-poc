#!/usr/bin/env node
// Bridge: InstructIT browser POC localStorage dump → schema-compliant JSON fragment
// Usage: node working/instructit-to-schema.mjs <instructit-export.json> [out.json]
//
// Input: a JSON file with the contents of localStorage.getItem("instructit_family_law_v1")
// from the browser POC at ~/Desktop/instructit-family-law-settlement-poc/.
// Output: a partial agreement instance populated with:
//   - instructions_record (entries, hash chain, final_hash)
//   - behavioural_and_capacity_screen (affect snapshots, consent attestation)
//   - procedural_fairness.voluntariness (derived from voluntariness-node Agree clicks)

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const inPath = process.argv[2];
const outPath = process.argv[3] || path.join(ROOT, "schema/instructit-export.json");

if (!inPath) {
  console.error("Usage: node working/instructit-to-schema.mjs <instructit-export.json> [out.json]");
  console.error("");
  console.error("To get the input file, in the browser POC:");
  console.error("  1. Open DevTools console");
  console.error("  2. Run: copy(localStorage.getItem('instructit_family_law_v1'))");
  console.error("  3. Paste into a .json file and pass as the first argument here.");
  process.exit(1);
}

const raw = fs.readFileSync(inPath, "utf8");
const browserState = JSON.parse(raw);

if (!Array.isArray(browserState.log)) {
  console.error("Input does not look like an InstructIT export (no .log array).");
  process.exit(1);
}

// Map browser log entries → schema instructions_record.entries
const entries = browserState.log.map((e, i) => ({
  sequence: i + 1,
  node_id: e.node,
  node_title: e.title,
  decision: e.decision,
  decision_label: e.decision_label || e.decision,
  note: e.note || "",
  ts: e.ts,
  prev_hash: e.prev_hash,
  hash: e.hash,
  affect_snapshot_ref: e.affect_snapshot
    ? `affect_${i + 1}`
    : null,
  stress_confirmed: !!e.stress_confirmed,
}));

const finalHash = entries.length ? entries[entries.length - 1].hash : null;

// Affect snapshots, with refs matching above
const affectSnapshots = browserState.log
  .map((e, i) => e.affect_snapshot ? {
    snapshot_id: `affect_${i + 1}`,
    node_id: e.node,
    timestamp: e.ts,
    expression_scores: {
      happy: e.affect_snapshot.happy,
      neutral: e.affect_snapshot.neutral,
      sad: e.affect_snapshot.sad,
      fearful: e.affect_snapshot.fearful,
      angry: e.affect_snapshot.angry,
      surprised: e.affect_snapshot.surprised,
      disgusted: e.affect_snapshot.disgusted,
    },
    stress_score: e.affect_snapshot.stress_score,
    stress_threshold: 0.45,
    exceeded: e.affect_snapshot.stress_score > 0.45,
    additional_confirmation_required: !!e.stress_confirmed || (e.affect_snapshot.stress_score > 0.45),
    additional_confirmation_given: !!e.stress_confirmed,
  } : null)
  .filter(Boolean);

// Derive voluntariness attestation (single spouse — the user of this session)
const volEntry = browserState.log.find(e => e.node === "voluntariness");
const voluntariness_for_user = volEntry ? {
  confirmed: volEntry.decision === "agree" || volEntry.decision === "acknowledged",
  no_duress: true,
  no_coercion: true,
  no_undue_influence: true,
  attestation_text: "I am signing this agreement voluntarily, free of duress, coercion, or undue influence (recorded via InstructIT confirmation tree).",
  signed_at_timestamp: volEntry.ts,
} : null;

const ilaEntry = browserState.log.find(e => e.node === "ila");
const ila_for_user = ilaEntry ? {
  received: ilaEntry.decision === "agree",
  attestation_text: "I confirm I received independent legal advice (recorded via InstructIT confirmation tree).",
  // Lawyer name + date typically captured outside browser POC
} : null;

const fragment = {
  $schema_ref: "agreement.schema.json",
  _NOTE: "Partial fragment exported from InstructIT browser POC. Merge into a full agreement instance. Spouse mapping (this session = spouse_1 vs spouse_2) must be set by the operator.",
  _exported_at: new Date().toISOString(),
  _source: path.basename(inPath),

  instructions_record: {
    chain_genesis_hash: "GENESIS",
    entries,
    final_hash: finalHash,
  },

  behavioural_and_capacity_screen: {
    affect_monitor_used: !!browserState.affect_enabled,
    affect_monitor_consent_attestation: browserState.affect_enabled
      ? "User opted in to in-browser affect monitoring; camera stream stayed local; only summary expression scores were recorded."
      : "User did not enable affect monitoring for this session.",
    affect_snapshots: affectSnapshots,
    capacity_attestation_per_spouse: {
      // Filled in elsewhere — InstructIT doesn't capture intoxication/capacity directly
    },
  },

  // Stub showing where voluntariness + ILA flow into procedural_fairness
  procedural_fairness_partial: {
    independent_legal_advice: {
      "[spouse_under_session]": ila_for_user,
    },
    voluntariness: {
      "[spouse_under_session]": voluntariness_for_user,
    },
  },

  _stats: {
    total_entries: entries.length,
    agree_count: entries.filter(e => e.decision === "agree").length,
    disagree_count: entries.filter(e => e.decision === "disagree").length,
    factual_count: entries.filter(e => e.decision === "factual").length,
    stress_gate_confirmations: entries.filter(e => e.stress_confirmed).length,
    affect_snapshots_recorded: affectSnapshots.length,
  },
};

fs.writeFileSync(outPath, JSON.stringify(fragment, null, 2));
console.log(`✅ Wrote ${outPath}`);
console.log(`   ${entries.length} log entries; ${affectSnapshots.length} affect snapshots; final hash: ${finalHash?.slice(0, 12) || "n/a"}…`);
