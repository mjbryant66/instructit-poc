#!/usr/bin/env node
/**
 * InstructIT MCP server — exposes the POC pipeline as agent tools.
 *
 * Tools:
 *   validate_fla_agreement      — validate an instance against the BC FLA Separation Agreement schema
 *   validate_criminal           — validate against the Criminal Guilty Plea Instructions schema
 *   bridge_fla_session          — convert family-law browser POC localStorage → schema fragment
 *   bridge_criminal_session     — convert criminal browser POC localStorage → schema fragment
 *   list_schemas                — list known schemas with their property counts
 *   get_schema                  — return a named schema as JSON
 *   verify_markers              — return all [VERIFY] markers in the family-law schema, grouped by section
 *
 * Transport: stdio. Run via `node server.mjs` from inside this folder.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const SCHEMA_DIR = path.join(REPO_ROOT, "family-law-schema/schema");

const SCHEMAS = {
  fla_agreement: path.join(SCHEMA_DIR, "agreement.schema.json"),
  criminal_instructions: path.join(SCHEMA_DIR, "criminal/instructions.schema.json"),
};

const ajv = new Ajv2020.default({ strict: false, allErrors: true });
addFormats.default(ajv);

const server = new Server(
  { name: "instructit-mcp-server", version: "0.1.0" },
  { capabilities: { tools: {} } },
);

const TOOLS = [
  {
    name: "list_schemas",
    description:
      "List the JSON Schemas the InstructIT POC publishes (BC FLA separation agreement; Criminal Code s. 606 guilty plea instructions). Returns each schema's id, top-level property count, and required-field count.",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "get_schema",
    description: "Return the full JSON Schema for a named instructit schema.",
    inputSchema: {
      type: "object",
      properties: { schema_name: { type: "string", enum: Object.keys(SCHEMAS) } },
      required: ["schema_name"],
    },
  },
  {
    name: "validate_fla_agreement",
    description:
      "Validate a candidate instance against the BC FLA Separation Agreement schema. Returns valid:true on pass, or a list of validation errors with paths and messages on fail.",
    inputSchema: {
      type: "object",
      properties: { instance: { type: "object", description: "The candidate JSON instance to validate." } },
      required: ["instance"],
    },
  },
  {
    name: "validate_criminal",
    description:
      "Validate a candidate instance against the Criminal Code s. 606 Guilty Plea Instructions schema.",
    inputSchema: {
      type: "object",
      properties: { instance: { type: "object", description: "The candidate JSON instance to validate." } },
      required: ["instance"],
    },
  },
  {
    name: "bridge_fla_session",
    description:
      "Convert a family-law browser POC localStorage export (a JSON object with a .log array of decision-tree confirmations) into a partial schema fragment populating instructions_record, behavioural_and_capacity_screen, and procedural_fairness.",
    inputSchema: {
      type: "object",
      properties: {
        browser_state: {
          type: "object",
          description: "The contents of localStorage.getItem('instructit_family_law_v1') as a parsed JSON object.",
        },
      },
      required: ["browser_state"],
    },
  },
  {
    name: "bridge_criminal_session",
    description:
      "Convert a criminal browser POC localStorage export into a partial criminal-instructions fragment populating instructions_record.",
    inputSchema: {
      type: "object",
      properties: {
        browser_state: {
          type: "object",
          description: "The contents of localStorage.getItem('instructit_criminal_guilty_plea_v1').",
        },
      },
      required: ["browser_state"],
    },
  },
  {
    name: "verify_markers",
    description:
      "Return every [VERIFY] marker in the BC FLA Separation Agreement schema, grouped by enclosing top-level property. Use this to plan a counsel review pass.",
    inputSchema: { type: "object", properties: {} },
  },
];

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOLS }));

function loadSchema(name) {
  const p = SCHEMAS[name];
  if (!p) throw new Error(`Unknown schema: ${name}`);
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function listSchemas() {
  return Object.entries(SCHEMAS).map(([key, p]) => {
    const s = JSON.parse(fs.readFileSync(p, "utf8"));
    return {
      schema_name: key,
      $id: s.$id,
      title: s.title,
      top_level_properties: Object.keys(s.properties || {}).length,
      required_top_level: (s.required || []).length,
      definitions: Object.keys(s.definitions || s.$defs || {}).length,
      verify_markers_in_schema: (JSON.stringify(s).match(/\[VERIFY/g) || []).length,
    };
  });
}

function validateInstance(schemaName, instance) {
  const schema = loadSchema(schemaName);
  const fn = ajv.compile(schema);
  const ok = fn(instance);
  if (ok) return { valid: true, schema_id: schema.$id };
  return {
    valid: false,
    schema_id: schema.$id,
    error_count: fn.errors.length,
    errors: fn.errors.map((e) => ({
      path: e.instancePath || "<root>",
      message: e.message,
      keyword: e.keyword,
      params: e.params,
    })),
  };
}

function bridgeFlaSession(browserState) {
  if (!Array.isArray(browserState?.log)) {
    return { error: "browser_state.log must be an array of decision-tree entries." };
  }
  const STRESS_KEYS = ["fearful", "sad", "angry", "disgusted"];
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
    affect_snapshot_ref: e.affect_snapshot ? `affect_${i + 1}` : null,
    stress_confirmed: !!e.stress_confirmed,
  }));
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
      exceeded: (e.affect_snapshot.stress_score || 0) > 0.45,
      additional_confirmation_required: !!e.stress_confirmed || ((e.affect_snapshot.stress_score || 0) > 0.45),
      additional_confirmation_given: !!e.stress_confirmed,
    } : null)
    .filter(Boolean);
  return {
    instructions_record: {
      chain_genesis_hash: "GENESIS",
      entries,
      final_hash: entries.length ? entries[entries.length - 1].hash : null,
    },
    behavioural_and_capacity_screen: {
      affect_monitor_used: !!browserState.affect_enabled,
      affect_monitor_consent_attestation: browserState.affect_enabled
        ? "User opted in to in-browser affect monitoring; camera stream stayed local."
        : "User did not enable affect monitoring for this session.",
      affect_snapshots: affectSnapshots,
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
}

function bridgeCriminalSession(browserState) {
  if (!Array.isArray(browserState?.log)) {
    return { error: "browser_state.log must be an array of decision-tree entries." };
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
    stress_confirmed: false,
    affect_snapshot_ref: null,
  }));
  return {
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
    },
  };
}

function verifyMarkers() {
  const schema = loadSchema("fla_agreement");
  const groups = {};
  function walk(node, pathArr) {
    if (node && typeof node === "object" && !Array.isArray(node)) {
      for (const [k, v] of Object.entries(node)) walk(v, [...pathArr, k]);
    } else if (Array.isArray(node)) {
      for (const [i, v] of node.entries()) walk(v, [...pathArr, String(i)]);
    } else if (typeof node === "string" && node.includes("[VERIFY")) {
      let top = "_root";
      for (let i = 0; i < pathArr.length; i++) {
        if (pathArr[i] === "properties" && i + 1 < pathArr.length) { top = pathArr[i + 1]; break; }
      }
      (groups[top] ||= []).push({
        selector: pathArr.filter(p => !/^\d+$/.test(p)).join("."),
        text: node,
      });
    }
  }
  walk(schema, []);
  return {
    total: Object.values(groups).reduce((n, arr) => n + arr.length, 0),
    by_section: groups,
  };
}

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const { name, arguments: args } = req.params;
  let result;
  try {
    switch (name) {
      case "list_schemas": result = listSchemas(); break;
      case "get_schema": result = loadSchema(args.schema_name); break;
      case "validate_fla_agreement": result = validateInstance("fla_agreement", args.instance); break;
      case "validate_criminal": result = validateInstance("criminal_instructions", args.instance); break;
      case "bridge_fla_session": result = bridgeFlaSession(args.browser_state); break;
      case "bridge_criminal_session": result = bridgeCriminalSession(args.browser_state); break;
      case "verify_markers": result = verifyMarkers(); break;
      default: throw new Error(`Unknown tool: ${name}`);
    }
    return { content: [{ type: "text", text: JSON.stringify(result, null, 2) }] };
  } catch (e) {
    return { content: [{ type: "text", text: `Error: ${e.message}` }], isError: true };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("instructit-mcp-server connected over stdio");
