You are senior BC family-law counsel. Build the JSON Schema (draft 2020-12) sub-schema for **property division and debt allocation** in a BC FLA separation agreement.

**Output strict JSON only**, top-level shape:
```
{
  "$id": "property.schema.json",
  "definitions": { Asset, Debt, Valuation, Allocation, RealProperty, Pension, BusinessInterest, Account },
  "properties": {
    "valuation_date": { ... },
    "family_property": { ... },
    "excluded_property": { ... },
    "family_debt": { ... },
    "real_property": { ... },
    "pensions_and_rrsps": { ... },
    "business_interests": { ... },
    "personal_property": { ... },
    "vehicles": { ... },
    "financial_accounts": { ... },
    "tax_treatment": { ... },
    "implementation_and_transfer": { ... }
  }
}
```

**Coverage requirements:**

1. **`valuation_date`** — FLA s. 87 [VERIFY]: date for valuing family property. Default = date of agreement. Allow override + reason.

2. **`family_property`** (FLA s. 84 [VERIFY]) — array of asset records. Each asset:
   - `asset_id`, `category` (enum: real_property | pension | rrsp | tfsa | non-registered_account | vehicle | personal | business | crypto | digital | other)
   - `description`, `legal_title_holder` ("spouse_1" | "spouse_2" | "joint" | "third_party_with_beneficial_interest")
   - `acquisition_date`, `acquisition_value`, `valuation_method` (e.g., "appraisal", "FMV estimate", "book value")
   - `current_value`, `valuation_source` (e.g., "BC Assessment 2026", "appraisal by [name] dated [date]")
   - `encumbrances` (array of debts secured)
   - `allocation`: "spouse_1" | "spouse_2" | "sold_proceeds_split" with `split_ratio` if applicable
   - `equalization_payment`: number (positive = paid by spouse_1 to spouse_2)

3. **`excluded_property`** (FLA s. 85 [VERIFY]) — array, same structure as family_property, plus:
   - `exclusion_basis`: enum "pre_relationship" | "gift" | "inheritance" | "settlement_for_personal_injury" | "trust_property" | "traced_from_excluded"
   - `tracing_documentation`: array of supporting doc references
   - `growth_in_value_during_relationship`: number (this is family property and divisible per FLA s. 84(2)(g))

4. **`family_debt`** (FLA s. 86 [VERIFY]) — array. Each debt:
   - `debt_id`, `category` (mortgage | line_of_credit | credit_card | personal_loan | tax | student_loan | business_debt | other)
   - `creditor`, `original_amount`, `current_balance`, `interest_rate`, `monthly_payment`
   - `secured_against` (asset_id reference) or null
   - `legal_obligor` ("spouse_1" | "spouse_2" | "joint")
   - `allocation`: same enum, with `split_ratio` if applicable
   - `indemnity_required`: boolean (whether the non-allocated spouse gets an indemnity from the allocated spouse)

5. **`real_property`** — sub-array of family_property entries that are real estate, with extra fields:
   - PID, civic address, legal description
   - mortgage details, refinance plans
   - listing/sale plan if to be sold (timeline, list price, agent)
   - exclusive possession order references
   - Land Title Office transfer instructions

6. **`pensions_and_rrsps`** — division mechanics:
   - PBSA-governed plan (Pension Benefits Standards Act): division at source via Form P1 / P2 etc. [VERIFY]
   - Federal pensions: Pension Benefits Division Act
   - RRSP rollover under ITA s. 146(16) [VERIFY] with required Form T2220
   - DC vs DB plans: actuarial valuation requirement

7. **`business_interests`** — corporate/partnership shares:
   - valuation method (income, asset, market)
   - whether to be retained vs bought out
   - non-compete / non-solicitation if exiting

8. **`equalization_payment_summary`**:
   - total family property at FMV
   - total family debt
   - net family property
   - 50/50 split (default) or unequal with reasons under FLA s. 95 [VERIFY] significant unfairness factors
   - net equalization payment owed (from / to)
   - payment terms (lump sum vs instalments, interest)

9. **`tax_treatment`**:
   - rollover provisions (s. 73 ITA spousal rollover)
   - capital gains exposure on transfers
   - principal residence designation
   - support payment deductibility

10. **`implementation_and_transfer`**:
    - timing (within X days of execution)
    - title transfers, document execution authority
    - escrow arrangements
    - default / breach remedies

**Constraints:**
- Each leaf has `description`.
- `[VERIFY]` for uncertain section numbers.
- ≤ 2000 words. Strict JSON only. No prose outside the JSON.

Begin now.
