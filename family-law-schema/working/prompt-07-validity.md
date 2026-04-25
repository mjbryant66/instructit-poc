You are senior BC family-law counsel. Build the JSON Schema (draft 2020-12) sub-schema for the **validity preconditions + financial disclosure attestations** that protect a BC FLA separation agreement against set-aside under FLA s. 4 / s. 93 and the Brandsema / Miglin / Hartshorne framework.

**Output strict JSON only**, top-level shape:
```
{
  "$id": "validity.schema.json",
  "definitions": { Attestation, ProceduralFairnessFactor, DisclosureItem, BehaviouralScreen },
  "properties": {
    "procedural_fairness": { ... },
    "substantive_fairness": { ... },
    "financial_disclosure_attestations": { ... },
    "behavioural_and_capacity_screen": { ... },
    "instructions_record": { ... }
  }
}
```

**Coverage requirements:**

1. **`procedural_fairness`** — captures Brandsema (2009 SCC 10) factors:
   - `independent_legal_advice`: per-spouse object {received: bool, lawyer_name, firm, date, duration_minutes, attestation_text}
   - `voluntariness`: per-spouse {confirmed: bool, no_duress: bool, no_coercion: bool, no_undue_influence: bool, attestation_text, signed_at_timestamp}
   - `equality_of_bargaining_position`: {assessment, vulnerabilities_acknowledged: array, accommodations_made: array}
   - `time_to_consider`: per-spouse {days_between_first_draft_and_signing, was_reasonable: bool}
   - `understanding`: per-spouse {language_of_negotiation, interpreter_used: bool, confirmed_understands_terms: bool, confirmed_understands_consequences: bool}

2. **`substantive_fairness`** — captures Miglin Stage 1 + Stage 2 and Hartshorne factors:
   - `miglin_stage_1`: {agreement_reflects_parties_intentions: bool, complies_with_fla_objectives: bool, fla_objectives_referenced: array, departure_from_ssag_explained: string|null, departure_from_equal_division_explained: string|null}
   - `miglin_stage_2_anticipated_changes`: array of foreseeable changes parties contemplated at execution (career trajectories, child-development phases, retirement) — to defeat later "unforeseen change" attack
   - `hartshorne_circumstances`: {unequal_position_acknowledged: bool, why_unequal_division_substantively_fair: string, comparison_to_fla_default_division: string}
   - `acknowledgment_of_setaside_grounds`: text acknowledging that even after signing the agreement may be set aside in limited circumstances under FLA s. 4 / Brandsema / Miglin / Hartshorne, and that the parties accept this risk

3. **`financial_disclosure_attestations`** — per spouse:
   - `disclosure_complete_attestation`: bool + signed timestamp + attestation_text ("I have made full and complete disclosure of all my assets, debts, income, and financial interests, and to the best of my knowledge nothing material has been omitted.")
   - `disclosure_documents_provided`: array of {category: enum [T1, T4, NoA, employment_income_letter, business_financials, pension_statement, real_property_appraisal, account_statements, debt_statements, life_insurance_policies, trust_documents, corporate_records, other], date_provided, document_reference, recipient_acknowledgment_signed}
   - `valuation_methodology`: array of {asset_id, method_used, basis, qualified_appraiser_if_applicable}
   - `non_disclosure_acknowledgment_by_other_spouse`: bool + text ("I acknowledge that I am not aware of any undisclosed material asset or debt of the other spouse.")
   - `consequences_of_non_disclosure`: text quoting FLA s. 93(3)(a) [VERIFY] consequence of incomplete disclosure

4. **`behavioural_and_capacity_screen`** — optional but recommended; captures contemporaneous evidence of voluntariness:
   - `affect_monitor_used`: bool
   - `affect_monitor_consent_attestation`: text
   - `affect_snapshots`: array of {node_id, timestamp, expression_scores: {happy, neutral, sad, fearful, angry, surprised, disgusted}, stress_score, stress_threshold, exceeded: bool, additional_confirmation_required: bool, additional_confirmation_given: bool}
   - `capacity_attestation_per_spouse`: {confirmed_no_intoxication: bool, confirmed_mental_capacity_intact: bool, signed_timestamp}

5. **`instructions_record`** — the InstructIT-style append-only confirmation log:
   - `chain_genesis_hash`: string
   - `entries`: array of {sequence: int, node_id, node_title, decision: enum [agree, disagree, defer, factual, acknowledged], decision_label, note, ts, prev_hash, hash, affect_snapshot_ref, stress_confirmed: bool}
   - `final_hash`: string (last entry's hash, locked at execution)

**Constraints:**
- Each leaf has `description`.
- `[VERIFY]` on any FLA section number not 100% certain.
- ≤ 2000 words. Strict JSON only.

Begin now.
