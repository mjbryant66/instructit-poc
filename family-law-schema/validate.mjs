#!/usr/bin/env node
// Validate any JSON document against the unified BC FLA Separation Agreement schema.
// Usage: node validate.mjs path/to/instance.json

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const schemaPath = path.join(__dirname, "schema/agreement.schema.json");
const target = process.argv[2] || path.join(__dirname, "schema/sample-filled.json");

const Ajv2020 = (await import(path.join(__dirname, "working/node_modules/ajv/dist/2020.js"))).default;
const addFormats = (await import(path.join(__dirname, "working/node_modules/ajv-formats/dist/index.js"))).default;

const ajv = new Ajv2020({ strict: false, allErrors: true });
addFormats(ajv);

const schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
const instance = JSON.parse(fs.readFileSync(target, "utf8"));

const validate = ajv.compile(schema);
const valid = validate(instance);

if (valid) {
  console.log(`✅ ${path.basename(target)} validates against ${path.basename(schemaPath)}`);
  process.exit(0);
} else {
  console.log(`❌ ${path.basename(target)} failed validation:`);
  console.log(`   ${validate.errors.length} error(s)`);
  for (const err of validate.errors.slice(0, 50)) {
    console.log(`   ${err.instancePath || "<root>"} — ${err.message}`);
  }
  process.exit(1);
}
