# Form Builder — Schema → Counsel-Facing Form

Renders any of the InstructIT POC's JSON Schemas as a fillable HTML form a
lawyer can use on a live matter. Walks `properties` recursively; supports
primitives, enums, objects, arrays (skeleton), and `$ref` resolution
within the schema's `$defs`/`definitions`.

## Loaded schemas

- **BC FLA Separation Agreement** — `../../family-law-schema/schema/agreement.schema.json` (48 top-level properties, 29 defs, 70 [VERIFY])
- **Criminal Guilty Plea Instructions** — `../../family-law-schema/schema/criminal/instructions.schema.json` (16 top-level properties, 11 [VERIFY])

## What it does

1. Pick a schema from the dropdown.
2. The form renders recursively. Every required field gets an asterisk;
   every leaf gets the schema's `description` as a hint.
3. Live ajv validation: as you fill, the status bar reports either
   "✅ validates" or the first 5 errors.
4. Export → downloads `instance.json` you can pass to:
   - `family-law-schema/validate.mjs path/to/instance.json`
   - `family-law-schema/working/render-docx.mjs path/to/instance.json out.docx`
   - `family-law-schema/working/render-criminal-docx.mjs path/to/instance.json out.docx`
5. Load sample → loads the validated demo into the JSON view (useful for
   inspecting the shape).

## Limits (POC)

- Array items beyond the first must be edited via the JSON view directly
  (the form scaffold renders one "+ add item" button per array; the
  per-item form for arrays of objects is not auto-rendered).
- `oneOf` / `anyOf` are passed through `$ref` only.
- No auto-save or persistence — fill, export, and pipe to the renderer
  yourself.

## Running

Open `index.html` in a browser. Loads schemas via `fetch` from sibling
folders, so serve over HTTP for full functionality:

```
cd /Users/mjb/Desktop/instructit-poc
python3 -m http.server 8765
# Open http://localhost:8765/apps/form-builder/
```

Or use the deployed showcase at https://instructit-poc.vercel.app/apps/form-builder/.
