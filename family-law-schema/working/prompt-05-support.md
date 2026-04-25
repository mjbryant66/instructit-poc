You are senior BC family-law counsel. Build the JSON Schema (draft 2020-12) sub-schema for **child support and spousal support** in a BC FLA separation agreement.

**Output strict JSON only**, top-level shape:
```
{
  "$id": "support.schema.json",
  "definitions": { IncomeSource, SupportPayment, ReviewTrigger, S7Expense },
  "properties": {
    "income_determination": { ... },
    "child_support": { ... },
    "spousal_support": { ... },
    "support_security": { ... },
    "support_review_and_variation": { ... },
    "tax_treatment": { ... }
  }
}
```

**Coverage requirements:**

1. **`income_determination`** — for each spouse:
   - `line_15000_income` (T1 line, prior year + current estimate)
   - `imputed_income` if applicable + basis
   - `self_employment_adjustments` (s. 17-18 Federal Child Support Guidelines [VERIFY])
   - `non_taxable_income` (e.g., disability) + grossed-up calculation
   - `prescribed_income_documentation`: array (T1, T4, NoA, financial statements, etc.)
   - `annual_disclosure_obligation`: boolean + due date + form (e.g., June 30 of each year)

2. **`child_support`**:
   - `payor`: "spouse_1" | "spouse_2"
   - `applicable_guideline`: "Federal Child Support Guidelines, SOR/97-175"
   - `payor_guideline_income`: number
   - `recipient_guideline_income`: number (for shared/split parenting)
   - `parenting_arrangement_for_cs`: enum "primary_residence" | "shared_40_60_or_closer" | "split"
   - `table_amount`: number (per Federal Tables, BC schedule)
   - `set_off_calculation` (if shared/split): both parents' table amounts and set-off
   - `payment_frequency`: enum "monthly" | "biweekly" | "semimonthly"
   - `payment_due_date`, `payment_method` (direct deposit, FMEP enrollment)
   - `start_date`, `end_event` (e.g., "child ceases to be child of marriage per Divorce Act s. 2(1)" / "FLA s. 146" definition [VERIFY])

3. **`section_7_special_extraordinary_expenses`** (Federal Guidelines s. 7):
   - array of expense categories: child_care, medical_dental_premiums, healthcare_uninsured, primary_secondary_extracurricular, post_secondary, extraordinary_extracurricular
   - per expense: `description`, `annual_amount_estimated`, `tax_deduction_credit`, `net_after_tax`, `proportional_share_payor`, `proportional_share_recipient`, `documentation_required`
   - reconciliation cadence (e.g., quarterly with receipts)

4. **`retroactive_child_support`**:
   - whether claimed and resolved
   - period covered
   - amount agreed
   - payment plan
   - reference to *DBS v. SRG* 2006 SCC 37 [VERIFY] / *Michel v. Graydon* 2020 SCC 24

5. **`spousal_support`**:
   - `entitlement_basis`: array of "compensatory" | "non_compensatory" | "contractual"
   - `applicable_guideline`: "Spousal Support Advisory Guidelines (SSAG), 2008/Revised"
   - `ssag_calculation`:
     - formula: "without_child_support" | "with_child_support"
     - low / mid / high range amounts and durations
     - agreed amount within / above / below range + reasons
   - `amount`: number, `frequency`, `start_date`
   - `duration`: enum "indefinite" | "fixed_term" | "to_review_event" + value
   - `indexation`: boolean + index (e.g., CPI All-Items Vancouver) + adjustment cadence
   - `lump_sum_option`: amount + present-value-discount-rate + tax characterization
   - `waiver`: if waiving, capture the waiver explicitly with full Miglin Stage 1 + Stage 2 acknowledgments
     - acknowledgment of compensatory entitlement waived + reasons
     - acknowledgment that conditions could change but waiver remains intended final
     - acknowledgment of receipt of ILA on the waiver specifically

6. **`support_security`**:
   - life insurance to secure support: insurer, policy number, face amount, beneficiary designation, term, who pays premium, proof-of-coverage cadence
   - charge on real property as security (optional)
   - assignment of FMEP enrollment

7. **`support_review_and_variation`**:
   - scheduled review dates
   - automatic-review triggers (e.g., child finishes high school, payor retires at age 65, recipient becomes self-sufficient)
   - material-change-in-circumstances threshold
   - process: mediation/arbitration before court

8. **`tax_treatment`**:
   - child support: not deductible/includable (per Income Tax Act post-1997)
   - spousal support periodic: deductible to payor / includable to recipient (s. 60(b) / 56(1)(b) ITA [VERIFY])
   - lump sum spousal support: generally not deductible/includable
   - retroactive support: special tax rules

**Constraints:**
- Each leaf has `description`.
- `[VERIFY]` for uncertain numbers.
- ≤ 2000 words. Strict JSON only.

Begin now.
