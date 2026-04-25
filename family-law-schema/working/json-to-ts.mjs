#!/usr/bin/env node
// Convert the unified JSON Schema to TypeScript types using a minimal walker.
// Avoids external deps so the POC runs anywhere with node.
// Reads schema/agreement.schema.json, writes schema/types.ts.

import fs from "node:fs";
import path from "node:path";

const ROOT = "/Users/mjb/Desktop/family-law-settlement-poc";
const schema = JSON.parse(fs.readFileSync(path.join(ROOT, "schema/agreement.schema.json"), "utf8"));

const out = [];
const declared = new Set();

out.push("// Auto-generated from agreement.schema.json");
out.push("// Do not edit by hand. Re-run working/json-to-ts.mjs to regenerate.\n");

function tsName(key) {
  return key.replace(/(^|_)([a-z])/g, (_, _u, c) => c.toUpperCase()).replace(/[^A-Za-z0-9]/g, "");
}

function tsType(node, name) {
  if (!node) return "unknown";
  if (node.$ref) {
    const ref = node.$ref.replace(/^#\/(definitions|\$defs)\//, "");
    return tsName(ref);
  }
  if (node.enum) return node.enum.map(v => JSON.stringify(v)).join(" | ");
  if (Array.isArray(node.type)) return node.type.map(t => mapPrim(t)).join(" | ");
  if (node.type === "array") return `Array<${tsType(node.items || {}, name + "Item")}>`;
  if (node.type === "object" || node.properties) {
    const props = node.properties || {};
    const required = new Set(node.required || []);
    const lines = Object.entries(props).map(([k, v]) => {
      const opt = required.has(k) ? "" : "?";
      const desc = v.description ? `  /** ${v.description.replace(/\*\//g, "*\\/")} */\n  ` : "  ";
      return `${desc}${JSON.stringify(k)}${opt}: ${tsType(v, name + tsName(k))};`;
    });
    return `{\n${lines.join("\n")}\n}`;
  }
  return mapPrim(node.type);
}

function mapPrim(t) {
  switch (t) {
    case "string": return "string";
    case "number":
    case "integer": return "number";
    case "boolean": return "boolean";
    case "null": return "null";
    default: return "unknown";
  }
}

// Emit definitions first
const defs = schema.definitions || schema.$defs || {};
for (const [name, def] of Object.entries(defs)) {
  if (declared.has(name)) continue;
  out.push(`export type ${tsName(name)} = ${tsType(def, name)};\n`);
  declared.add(name);
}

// Top-level type
out.push(`export interface SeparationAgreement ${tsType(schema, "SeparationAgreement")}\n`);

fs.writeFileSync(path.join(ROOT, "schema/types.ts"), out.join("\n"));
console.log(`types.ts written: ${out.join("\n").length} bytes`);
