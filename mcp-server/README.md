# InstructIT MCP server

Exposes the InstructIT POC pipeline as agent tools over stdio MCP.

## Tools

| Tool | What it does |
|---|---|
| `list_schemas` | Lists available JSON Schemas with property/definition/required counts. |
| `get_schema` | Returns a named schema as JSON. |
| `validate_fla_agreement` | Validates an instance against the BC FLA Separation Agreement schema. |
| `validate_criminal` | Validates an instance against the Criminal Code s. 606 schema. |
| `bridge_fla_session` | Browser POC localStorage → schema fragment (instructions_record + behavioural_and_capacity_screen + partial procedural_fairness). |
| `bridge_criminal_session` | Browser POC localStorage → criminal schema fragment. |
| `verify_markers` | Every `[VERIFY]` in the FLA schema grouped by enclosing top-level property. |

## Install

```
cd /Users/mjb/Desktop/instructit-poc/mcp-server
npm install
```

## Run

Stdio:

```
node server.mjs
```

## Wire to Claude Code

Add to `~/.claude/settings.json`:

```json
{
  "mcp": {
    "instructit": {
      "command": "node",
      "args": ["/Users/mjb/Desktop/instructit-poc/mcp-server/server.mjs"]
    }
  }
}
```

Then in any Claude Code session you can call the tools:

> Use the instructit MCP to validate this candidate FLA instance: { ... }

> Use the instructit MCP to list the [VERIFY] markers in the FLA schema, grouped by section.

## Smoke test (without an MCP client)

```
echo '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' | node server.mjs
```

This isn't fully MCP-compliant for stdio (the SDK expects framed messages), but
it's enough to confirm the server boots without error.

## License

MPL-2.0.
