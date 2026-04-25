You are senior Canadian criminal-defence counsel drafting reference data for a counsel-facing bail-hearing cheat-sheet tool. Output a strict JSON file mapping **every category of offence under Criminal Code s. 515(6)** to its onus rule (which party must show cause).

The default rule under s. 515(1) is that the Crown must show cause why the accused should be detained. Section 515(6) lists categories where this is reversed and the **accused** must show cause why detention is not justified.

**Output strict JSON only**, top-level shape:
```
{
  "$id": "bail-onus.json",
  "default_rule": {
    "section": "Criminal Code s. 515(1)",
    "rule": "Crown shows cause for detention.",
    "consequence": "Accused presumptively released."
  },
  "reverse_onus_categories": [
    {
      "key": "snake_case_key",
      "label": "Human-readable label",
      "section": "s. 515(6)(a) ... [VERIFY exact subsection]",
      "trigger_description": "Plain-English description of what triggers reverse onus",
      "examples_of_offences": ["..."],
      "rule": "Accused shows cause why detention is not justified.",
      "ancillary_authority": "[VERIFY any leading case if reverse onus has been challenged]"
    }
  ],
  "non_reverse_but_complex": [
    { "key": "...", "label": "...", "note": "Areas where onus is contested or has been the subject of recent case law (e.g., terrorism reverse onus, Charter s. 11(e) challenges)." }
  ],
  "operational_test": {
    "step_1": "Identify the offence(s) charged.",
    "step_2": "Check Criminal Code s. 515(6) categories against the offence and circumstances.",
    "step_3": "Determine onus: default = Crown shows cause; reverse onus = accused shows cause.",
    "step_4": "If onus is contested, plead Charter s. 11(e) where applicable [VERIFY case anchors]."
  }
}
```

**Cover at minimum these s. 515(6) categories:**
- (a) indictable offence committed while at large on another charge
- (b) failure to appear / failure to comply (recognizance / undertaking / order)
- (c) trafficking / production / importing of controlled substances [VERIFY exact CDSA cross-reference]
- (d) firearms offences ss. 95-98, 99-101, 102-103 [VERIFY exact list]
- (e) terrorism offences
- Domestic-violence reverse onus added by s. 515(6)(b.1) [VERIFY] (Bill C-75, 2019)
- Criminal-organization offences
- Murder / s. 469 offences (separate test under s. 522)

**Constraints:**
- `[VERIFY]` for any section number or recent amendment year you are not 100% sure of.
- Output ≤ 1500 words. Strict JSON. No prose outside the JSON.

Begin.
