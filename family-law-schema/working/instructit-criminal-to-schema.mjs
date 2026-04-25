#!/usr/bin/env node
// Bridge: InstructIT criminal-guilty-plea browser POC localStorage → criminal-schema fragment
// Usage: node working/instructit-criminal-to-schema.mjs <export.json> [out.json]
//
// Input: a JSON file with localStorage.getItem("instructit_criminal_guilty_plea_v1")
// from the browser POC. Output: a partial criminal-instructions instance with
// `instructions_record` populated.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const inPath = process.argv[2];
const outPath = process.argv[3] || path.join(ROOT, "schema/criminal/instructit-export.json");

if (!inPath) {
  console.error("Usage: node working/instructit-criminal-to-schema.mjs <export.json> [out.json]");
  console.error("");
  console.error("In the criminal browser POC, run:");
  console.error("  copy(localStorage.getItem('instructit_criminal_guilty_plea_v1'))");
  console.error("Paste into a file and pass it here.");
  process.exit(1);
}

const browserState = JSON.parse(fs.readFileSync(inPath, "utf8"));
if (!Array.isArray(browserState.log)) {
  console.error("Not a recognized export — missing .log array.");
  process.exit(1);
}

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
  stress_confirmed: false,        // criminal POC does not use affect monitor
  affect_snapshot_ref: null,
}));

const fragment = {
  _NOTE: "Partial fragment exported from InstructIT criminal-guilty-plea browser POC. Counsel must merge with matter / accused / counsel / charges / agreed-facts data before validation.",
  _exported_at: new Date().toISOString(),
  _source: path.basename(inPath),
  instructions_record: {
    chain_genesis_hash: "GENESIS",
    entries,
    final_hash: entries.length ? entries[entries.length - 1].hash : null,
  },
  _stats: {
    total_entries: entries.length,
    agree_count: entries.filter(e => e.decision === "agree").length,
    disagree_count: entries.filter(e => e.decision === "disagree").length,
    acknowledged_count: entries.filter(e => e.decision === "acknowledged").length,
    defer_count: entries.filter(e => e.decision === "defer").length,
  },
};

fs.writeFileSync(outPath, JSON.stringify(fragment, null, 2));
console.log(`✅ Wrote ${outPath}`);
console.log(`   ${entries.length} log entries; final hash: ${entries.length ? entries[entries.length-1].hash.slice(0,12) : "n/a"}…`);
