# Brandsema Fitness Test

> Does the BC FLA Separation Agreement schema actually capture every factor the
> Supreme Court of Canada tested in *Rick v. Brandsema*, 2009 SCC 10?

This walk-through takes the Brandsema fact pattern and maps each procedural-fairness
and substantive-fairness factor that the SCC weighed against the schema fields that
would record it.

It does **two** things:

1. **Narrative mapping** (this file) — every factor → schema field.
2. **Operational test** — `case-studies/brandsema-instance.json` is a
   reconstruction of the Brandsema facts as a schema instance. Run
   `node validate.mjs case-studies/brandsema-instance.json` from the schema root.

If both succeed, the schema is *fit for purpose* against the leading SCC procedural-fairness
authority on family-law set-asides.

## The Brandsema facts (digested)

(Drawn from *Rick v. Brandsema*, 2009 SCC 10, ¶¶ 3–25; this is a teaching summary —
read the case for the full record.)

- The parties married in 1973 and separated 30 years later in 2000.
- They had five children and operated a successful dairy farm together.
- Mrs. Rick suffered from mental illness (including delusions); the trial judge
  found her judgment was impaired during the negotiation of the separation
  agreement.
- The husband (Mr. Brandsema) had effective control over the corporate and
  agricultural assets and **deliberately misled** Mrs. Rick about their value.
- The agreement (a "reconciliation agreement" entered between separation and
  the contemplated divorce) gave Mrs. Rick well below her statutory
  entitlement.
- Mrs. Rick had legal counsel, but the trial judge found that the legal advice
  she received was inadequate against the backdrop of (a) the non-disclosure
  and (b) her mental-health vulnerability.
- After execution, Mrs. Rick discovered the true value of the assets and sued
  to set the agreement aside.
- Trial: agreement set aside; equal division ordered.
- BCCA: reversed.
- SCC (Abella J. for unanimous court): trial judgment restored. The SCC
  articulated the modern procedural-fairness test for setting aside a
  domestic-contract: full-and-frank disclosure + recognition of vulnerabilities +
  meaningful ILA.

## Factor-by-factor mapping

| Brandsema factor | What the SCC said | Schema field that captures it |
|---|---|---|
| **Marriage / separation chronology** | Long marriage; separation 2000 | `parties[]`, `relationship_status.marriage_date`, `relationship_status.separation_date`, `relationship_status.category` (= "married") |
| **Material non-disclosure** | Husband concealed value of corporate / agricultural assets | `financial_disclosure_attestations.spouse_1.disclosure_complete_attestation` (false) + `non_disclosure_acknowledgment_by_other_spouse` (false from the affected spouse) + `consequences_of_non_disclosure` text |
| **Asset valuation methodology** | Husband valued the assets unilaterally and far below true FMV | `financial_disclosure_attestations.spouse_X.valuation_methodology[].method_used` + `qualified_appraiser_if_applicable` |
| **Wife's mental-health vulnerability** | Trial judge found her judgment impaired by psychiatric condition | `procedural_fairness.equality_of_bargaining_position.vulnerabilities_acknowledged[]` (must include "mental_health_impairment") + `procedural_fairness.equality_of_bargaining_position.accommodations_made[]` (in Brandsema, none) |
| **Independent legal advice — formal** | She had counsel | `procedural_fairness.independent_legal_advice.spouse_X.received` (true) + `lawyer_name` |
| **Independent legal advice — adequacy** | ILA was inadequate against the vulnerabilities | `procedural_fairness.independent_legal_advice.spouse_X.duration_minutes` + `attestation_text` (note: a record of *time* alone is not adequacy; counsel review required) |
| **Equality of bargaining position** | Profound disparity (control of assets + mental-health vulnerability) | `procedural_fairness.equality_of_bargaining_position.assessment` |
| **Time to consider** | Husband pressed for a quick agreement | `procedural_fairness.time_to_consider.spouse_X.days_between_first_draft_and_signing` + `was_reasonable` |
| **Voluntariness** | Not on classic duress, but agreement product of misinformation + impaired judgment | `procedural_fairness.voluntariness.spouse_X.confirmed` + `no_undue_influence` (must be `false` here) + `attestation_text` |
| **Substantive fairness — Miglin Stage 1** | Agreement well below statutory entitlement; departed from default | `substantive_fairness.miglin_stage_1.complies_with_fla_objectives` (would be `false`) + `departure_from_equal_division_explained` (the husband's stated reason here was the unilateral valuation, which is precisely what the SCC found unreliable) |
| **Substantive fairness — Hartshorne** | Significant departure from FLA default with no offsetting circumstance | `substantive_fairness.hartshorne_circumstances.unequal_position_acknowledged` + `why_unequal_division_substantively_fair` |
| **Acknowledged set-aside risk** | The agreement nominally said it was "final"; SCC said finality clause cannot cure procedural-fairness defects | `substantive_fairness.acknowledgment_of_setaside_grounds` (the schema captures the *attestation* of awareness; whether the attestation withstands review is the litigation question) |
| **Outcome** | Set aside; equal division | (Outcome is not stored — the schema records pre-execution facts; the outcome is downstream litigation) |

## What the schema *does not yet* directly capture

A small honest list of gaps the Brandsema test surfaces:

1. **Counsel-quality flag.** The schema records that ILA was *received* and the
   `duration_minutes`, but the *adequacy* of the ILA against known vulnerabilities
   is left to the `attestation_text`. Brandsema teaches that the more vulnerable
   the spouse, the more demanding the ILA must be. A future field could be
   `ila_calibrated_to_vulnerabilities_documented: bool` + a free-text note.
2. **Capacity at signing.** `behavioural_and_capacity_screen.capacity_attestation_per_spouse`
   exists but is shallow. Brandsema-style mental-health impairment would benefit from a
   `medical_letter_attached: bool` and `evaluating_clinician` reference.
3. **Asset-control asymmetry.** The schema records each asset's
   `legal_title_holder` but not who *controlled* the asset operationally. In
   Brandsema, the husband's *operational* control of the farm assets enabled the
   non-disclosure. A future enhancement: `operational_control_holder` per asset.
4. **Inducement / promise outside the agreement.** Brandsema involved
   misrepresentations rather than promises, but a related set of cases turns on
   side-promises that aren't reduced to writing. The schema's `recitals` could
   be extended with a `representations_made_outside_agreement: array` that
   forces the parties to enumerate or expressly disclaim.

These gaps are pragmatic, not fatal — the schema captures the *primary* SCC
factors. They go onto the post-counsel-review polish list.

## Operational test

Run the validator against the reconstructed instance:

```
cd family-law-schema
node validate.mjs case-studies/brandsema-instance.json
```

The reconstructed instance is intentionally **shaped to validate** so the
schema's structural test passes. The substantive question — whether the
agreement *as drafted* would withstand a Brandsema challenge — is answered
*not* by ajv but by the values the parties record (e.g. setting
`disclosure_complete_attestation.confirmed: false` would, at the time of
signing, indicate the agreement was destined to fail).

The point of the fitness test isn't that ajv catches Brandsema — ajv can't
read minds — but that the *schema captures the inputs a court will examine
for itself*.
