You are senior Canadian criminal-defence counsel. Build a JSON Schema (draft 2020-12) **data model** that captures every parameter a comprehensive client-confirmed-instructions record for a guilty-plea matter (BC or Ontario, governed by the Criminal Code) needs to fully express.

The schema is the structured output produced by an InstructIT-style browser tool that walks a client through an 11-node confirmation tree (charge, admission, voluntariness, consequences, court-not-bound, trial-rights, sentencing-range, collateral, appeal, alternatives, final).

**Output strict JSON only**, top-level shape:
```
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://justack.ai/schemas/criminal-guilty-plea-instructions/v1",
  "title": "Criminal Code s. 606 — Client-Confirmed Plea Instructions",
  "definitions": { ... },
  "properties": {
    "matter": { ... },
    "accused": { ... },
    "counsel": { ... },
    "charges": { ... },
    "agreed_facts": { ... },
    "admission": { ... },
    "voluntariness": { ... },
    "consequences_acknowledged": { ... },
    "court_not_bound_acknowledged": { ... },
    "trial_rights_waived": { ... },
    "sentencing_range_discussed": { ... },
    "collateral_consequences_acknowledged": { ... },
    "appeal_rights_acknowledged": { ... },
    "alternatives_considered": { ... },
    "final_instruction_to_plead": { ... },
    "instructions_record": { ... }
  },
  "required": [...]
}
```

**Coverage requirements:**

1. **`matter`** — court level (Provincial Court / SCJ / SC), province, registry, information / indictment number, scheduled plea date, presiding judicial officer if known.

2. **`accused`** — name, DOB, citizenship/immigration status (string + drop-down values: Canadian citizen / permanent resident / foreign national / refugee claimant / unknown), preferred language, interpreter required (boolean), capacity status (capable / capacity question / capable per s. 672.22 [VERIFY]).

3. **`counsel`** — name, firm, LSBC or LSO number, role (defence / agent), date retained, scope of retainer (limited or full).

4. **`charges`** — array of charges. Each: count number, Criminal Code section, offence description, election (summary / indictable / hybrid where applicable), max sentence, mandatory minimum if any, plea (guilty / not guilty per count). Allow per-count plea differences.

5. **`agreed_facts`** — narrative text, attached file reference, source enum [Crown_brief, agreed_statement, viva_voce], whether reviewed with client, date reviewed.

6. **`admission`** — per-charge admission of essential elements (boolean + attestation_text per charge) plus aggregate confirmation.

7. **`voluntariness`** — confirmed boolean, no_threat boolean, no_inducement_other_than_record boolean, no_substance_impairment boolean, attestation_text, signed_at_timestamp.

8. **`consequences_acknowledged`** — conviction_understood, sentence_will_follow, criminal_record_understood, attestation_text.

9. **`court_not_bound_acknowledged`** — joint_submission_understood, anthony_cook_test_explained, attestation_text.

10. **`trial_rights_waived`** — array of waivers, each {right_name, explained, waived, attestation_text}. Cover: presumption of innocence, burden of proof, cross-examination, defence evidence, silence, forum choice (judge alone vs jury where applicable), fitness inquiry, language rights (s. 530).

11. **`sentencing_range_discussed`** — discussed_low, discussed_mid, discussed_high (number or string), discussed_form (custody / conditional / probation / fine / discharge), is_joint_submission boolean, joint_submission_amount, prediction_not_guarantee_acknowledged, attestation_text.

12. **`collateral_consequences_acknowledged`** — sub-object per category: immigration (IRPA s. 36 — applicable boolean + counsel-advice note), employment_licensing, dna_order (designated offence boolean), firearms_prohibition (s. 109 / 110 type), soira_registration, travel_us, driving_prohibition, family_cps_implications. Each sub-object with applicable, explained, acknowledged booleans + attestation_text.

13. **`appeal_rights_acknowledged`** — appeal_from_plea_limited_explained, sentence_appeal_retained, attestation_text.

14. **`alternatives_considered`** — diversion, withdrawal, peace_bond_810, discharge_730_absolute, discharge_730_conditional, trial. Per item: discussed boolean, available boolean, why_not_pursued (free text).

15. **`final_instruction_to_plead`** — instruction_to_plead_guilty boolean, scope (per charge or all), date_of_intended_plea, attestation_text, signed_at_timestamp.

16. **`instructions_record`** — append-only hash chain entries (sequence, node_id, node_title, decision, decision_label, note, ts, prev_hash, hash, stress_confirmed, affect_snapshot_ref or null), chain_genesis_hash "GENESIS", final_hash.

**Constraints:**
- Each leaf has a `description` field.
- `[VERIFY]` for any uncertain section or rule number.
- Use `format: "date"`, `format: "date-time"`, `format: "email"` where applicable.
- ≤ 2000 words. Strict JSON only. No prose outside JSON.

Begin.
