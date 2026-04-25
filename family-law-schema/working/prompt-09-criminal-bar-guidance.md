You are a senior Canadian criminal-defence counsel familiar with both LSBC and LSO professional-conduct rules and Canadian criminal-bar best-practice publications. Draft a **structured guidance table** mapping criminal-bar / law-society guidance to the 11 client-confirmation nodes of an InstructIT-style guilty-plea instructions tool.

**Output strict JSON only**, top-level shape:
```
{
  "$id": "criminal-guilty-plea-bar-guidance.json",
  "sources_canvassed": [
    {"key": "LSBC_BC_CPC", "name": "Law Society of British Columbia — Code of Professional Conduct for British Columbia", "url_or_locator": "[VERIFY url]"},
    {"key": "LSO_RPC", "name": "Law Society of Ontario — Rules of Professional Conduct", "url_or_locator": "[VERIFY]"},
    {"key": "CBA_CJS", "name": "Canadian Bar Association — Criminal Justice Section", "url_or_locator": "[VERIFY]"},
    {"key": "CLA_ON", "name": "Criminal Lawyers' Association (Ontario)", "url_or_locator": "[VERIFY]"},
    {"key": "BCTL_CRIM", "name": "Trial Lawyers Association of British Columbia, Criminal Section [VERIFY exists]"}
  ],
  "node_to_guidance": {
    "charge": [...],
    "admission": [...],
    "voluntariness": [...],
    "consequences": [...],
    "court_not_bound": [...],
    "trial_rights": [...],
    "sentencing_range": [...],
    "collateral": [...],
    "appeal": [...],
    "alternatives": [...],
    "final": [...]
  }
}
```

For each node, return an array of guidance items. Each item must have:
- `source_key`: matches a `key` from sources_canvassed
- `rule_or_section`: the specific rule, chapter, or commentary number (e.g. "LSO RPC r. 5.1-1", "LSBC CPC ch. 3 r. 3.1-2") — `[VERIFY]` if uncertain
- `gist`: 1-2 sentence summary of the duty
- `application`: 1-2 sentence note on how it shapes the client-confirmation step

**Areas to cover (across the 11 nodes):**
- Lawyer's duty to ensure client understands the charge and the elements
- Duty to obtain meaningful, voluntary, informed instructions before entering a plea
- Duty to advise on collateral consequences (immigration in particular — *R. v. Wong*-aware practice)
- Duty to refrain from assisting with a plea the client maintains they did not commit (LSO RPC commentary on guilty pleas; LSBC CPC corresponding rule)
- Duty to record instructions contemporaneously (LSO and LSBC commentaries on file documentation)
- Duty in the joint-submission context (Anthony-Cook-aware practice and any criminal-bar best-practice publications)
- Duty to advise on appeal / withdrawal of plea
- Duty to canvass alternatives (peace bond, diversion, discharge)

**Constraints:**
- If unsure of an exact rule number or commentary citation, write `"[VERIFY]"` for that field, not a guess.
- Output ≤ 2000 words. Strict JSON. No prose outside the JSON.

Begin.
