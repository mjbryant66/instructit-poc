// Auto-generated from agreement.schema.json
// Do not edit by hand. Re-run working/json-to-ts.mjs to regenerate.

export type Date = string;

export type Currency = {
  /** Monetary amount in the specified currency. */
  "amount": number;
  /** ISO 4217 currency code. */
  "currency_code": string;
};

export type Address = {
  /** Street address line 1. */
  "street_line_1": string;
  /** Street address line 2 (unit, suite, etc.). */
  "street_line_2"?: string | null;
  /** City or municipality. */
  "city": string;
  /** Province, state, or territory. */
  "province_or_state": string;
  /** Postal or ZIP code. */
  "postal_code": string;
  /** Country name. */
  "country": string;
};

export type Solicitor = {
  /** Full legal name of the solicitor. */
  "name": string;
  /** Law firm name. */
  "firm": string;
  "address"?: Address;
  /** Professional email. */
  "email": string;
  /** Contact phone number. */
  "phone"?: string;
  /** Law Society of BC member number, if available. */
  "law_society_number"?: string | null;
};

export type Person = {
  /** Gender-neutral role label for referencing this party throughout the agreement. */
  "role_label": "Spouse 1" | "Spouse 2";
  "legal_name": {
  /** Legal first name(s). */
  "first": string;
  /** Legal middle name(s). */
  "middle"?: string | null;
  /** Legal surname. */
  "last": string;
};
  /** All former and maiden names. */
  "former_names"?: Array<string>;
  /** Preferred or commonly known name, if different from legal name. */
  "preferred_name"?: string | null;
  /** Date of birth. */
  "date_of_birth": Date;
  /** Social Insurance Number. Optional; encrypted at rest. */
  "sin"?: string | null;
  /** Current occupation or profession. */
  "occupation"?: string | null;
  /** Current employer name. */
  "employer"?: string | null;
  /** Current residential address. */
  "residential_address": Address;
  /** Mailing address if different from residential address. */
  "mailing_address"?: unknown;
  /** Personal email address for notices. */
  "email": string;
  /** Primary telephone number. */
  "phone": string;
  "solicitor": Solicitor;
};

export type Child = {
  /** Full legal name of the child as shown on birth certificate or adoption order. */
  "legal_name": string;
  /** Child's date of birth (YYYY-MM-DD). */
  "date_of_birth": string;
  /** Sex or gender identity of the child. Free text; optional. */
  "sex_or_gender"?: string;
  /** Canadian province or territory of birth, or country if born outside Canada. */
  "province_of_birth": string;
  /** Relationship basis. 'standing_in_place_of_parent' engages FLA s. 147 [VERIFY] regarding a person who is not a biological or adoptive parent but has demonstrated settled intention to treat the child as their own (see also FLA s. 146 [VERIFY]). */
  "parentage_type": "biological" | "adopted" | "standing_in_place_of_parent";
  /** Current school attended by the child. */
  "school_name"?: string;
  /** Current grade or program level. */
  "grade"?: string;
  /** Address of the child's primary residence for enrollment and records purposes. */
  "primary_residence_address"?: string;
  /** Any diagnosed special needs, chronic medical conditions, or ongoing treatment requirements. Optional; free text. */
  "special_needs_or_medical"?: string;
};

export type ParentingTimeBlock = {
  /** Day of the week for this block. */
  "day": "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  /** Start time (HH:MM, 24-hour). */
  "start_time": string;
  /** End time (HH:MM, 24-hour). */
  "end_time": string;
  /** Which parent has the child during this block. */
  "with_parent": "spouse_1" | "spouse_2";
};

export type HolidayAllocation = {
  /** Name of the holiday or special day (e.g., Christmas Day, Thanksgiving, Mother's Day). */
  "holiday_name": string;
  /** Which parent has the child, or rotation pattern. */
  "allocated_to": "spouse_1" | "spouse_2" | "alternating" | "split_day";
  /** Rotation details, e.g., 'Spouse 1 in even years, Spouse 2 in odd years.' */
  "rotation_rule"?: string;
  /** When holiday parenting time begins. */
  "start_datetime"?: string;
  /** When holiday parenting time ends. */
  "end_datetime"?: string;
};

export type DecisionDomain = {
  /** Category of parental decision-making per FLA s. 41 [VERIFY]. */
  "domain": "health" | "education" | "religion_spiritual" | "extracurricular" | "day_to_day_care" | "emergency" | "cultural_heritage";
  /** Who holds decision-making authority. 'consult_then_one_decides' requires meaningful consultation before the designated parent makes the final call. */
  "allocation": "joint" | "spouse_1" | "spouse_2" | "consult_then_one_decides";
  /** The parent with final authority when allocation is 'consult_then_one_decides' or sole. Omit for joint. */
  "deciding_parent_if_applicable"?: "spouse_1" | "spouse_2";
  /** Additional terms or qualifications for this domain. */
  "notes"?: string;
};

export type BreakAllocation = {
  /** School break period. */
  "break_name": "summer_break" | "winter_break" | "spring_break";
  /** How the break is divided, e.g., 'First three weeks with Spouse 1, remaining with Spouse 2, alternating annually.' */
  "allocation_method": string;
  /** Days before the break starts by which each parent must confirm plans. */
  "notification_deadline_days"?: number;
};

export type Asset = {
  /** Unique identifier for this asset within the agreement. */
  "asset_id": string;
  /** Classification of the asset. */
  "category": "real_property" | "pension" | "rrsp" | "tfsa" | "non_registered_account" | "vehicle" | "personal" | "business" | "crypto" | "digital" | "other";
  /** Plain-language description of the asset sufficient for identification. */
  "description": string;
  /** Party holding legal title or registered ownership. */
  "legal_title_holder": "spouse_1" | "spouse_2" | "joint" | "third_party_with_beneficial_interest";
  /** Date the asset was acquired. */
  "acquisition_date"?: string;
  /** Value of the asset at the time of acquisition, in CAD. */
  "acquisition_value"?: number;
  /** Method used to determine current value. */
  "valuation_method"?: "appraisal" | "fmv_estimate" | "book_value" | "market_quote" | "actuarial" | "cra_assessment" | "other";
  /** Fair market value of the asset as at the valuation date, in CAD. */
  "current_value": number;
  /** Source or authority for the current value (e.g., 'BC Assessment 2026', 'Appraisal by J. Smith dated 2026-03-15'). */
  "valuation_source"?: string;
  /** Array of debt_id references for debts secured against this asset. */
  "encumbrances"?: Array<string>;
  "allocation": Allocation;
  /** Net equalization amount attributable to this asset. Positive = payable by spouse_1 to spouse_2; negative = reverse. */
  "equalization_payment"?: number;
};

export type Debt = {
  /** Unique identifier for this debt within the agreement. */
  "debt_id": string;
  /** Classification of the debt. */
  "category": "mortgage" | "line_of_credit" | "credit_card" | "personal_loan" | "tax" | "student_loan" | "business_debt" | "other";
  /** Name of the creditor or financial institution. */
  "creditor": string;
  /** Original principal amount of the debt, in CAD. */
  "original_amount"?: number;
  /** Outstanding balance as at the valuation date, in CAD. */
  "current_balance": number;
  /** Annual interest rate expressed as a percentage (e.g., 5.25). */
  "interest_rate"?: number;
  /** Current required monthly payment, in CAD. */
  "monthly_payment"?: number;
  /** Reference to the asset_id this debt is secured against, or null if unsecured. */
  "secured_against"?: string | null;
  /** Party legally responsible for the debt per the creditor agreement. */
  "legal_obligor": "spouse_1" | "spouse_2" | "joint";
  "allocation": Allocation;
  /** Whether the non-allocated spouse is entitled to an indemnity from the allocated spouse for this debt. */
  "indemnity_required": boolean;
};

export type Valuation = {
  /** Date as of which the valuation was prepared. */
  "valuation_date": string;
  /** Name and credentials of the valuator. */
  "valuator_name"?: string;
  /** Methodology applied (income approach, asset approach, market approach, actuarial, etc.). */
  "valuation_method"?: string;
  /** Concluded fair market value in CAD. */
  "fair_market_value": number;
  /** File name or reference to the attached valuation report. */
  "report_reference"?: string;
};

export type Allocation = {
  /** Party receiving the asset or assuming the debt, or disposition method. */
  "allocated_to": "spouse_1" | "spouse_2" | "sold_proceeds_split" | "retained_jointly";
  /** Ratio of division if sold_proceeds_split or retained_jointly (e.g., '50:50', '60:40'). Spouse_1 share listed first. */
  "split_ratio"?: string;
};

export type RealProperty = {
  /** Parcel Identifier (PID) registered at the BC Land Title Office. */
  "pid": string;
  /** Municipal street address of the property. */
  "civic_address": string;
  /** Full legal description as shown on the certificate of title. */
  "legal_description": string;
  /** Details of the mortgage registered against this property. */
  "mortgage_details"?: {
  /** Mortgage lender name. */
  "lender"?: string;
  /** Mortgage account number. */
  "account_number"?: string;
  /** Outstanding mortgage balance in CAD. */
  "balance"?: number;
  /** Mortgage maturity or renewal date. */
  "maturity_date"?: string;
  /** Monthly mortgage payment in CAD. */
  "monthly_payment"?: number;
};
  /** Terms for refinancing if one spouse is retaining the property. */
  "refinance_plan"?: {
  /** Date by which refinancing must be completed. */
  "deadline"?: string;
  /** Whether the non-retaining spouse must be released from the mortgage covenant. */
  "release_of_non_retaining_spouse"?: boolean;
};
  /** Terms if the property is to be listed and sold. */
  "sale_plan"?: {
  /** Date by which the property must be listed. */
  "listing_deadline"?: string;
  /** Agreed list price in CAD, or null if to be set by agent. */
  "target_list_price"?: number;
  /** Agreed real estate agent or brokerage. */
  "listing_agent"?: string;
  /** Terms for price reductions if unsold (e.g., '5% reduction every 60 days'). */
  "price_reduction_schedule"?: string;
  "proceeds_split"?: Allocation;
};
  /** Details of any exclusive possession arrangement or order. */
  "exclusive_possession"?: {
  /** Party granted exclusive possession. */
  "granted_to"?: "spouse_1" | "spouse_2";
  /** Start date of exclusive possession. */
  "from_date"?: string;
  /** End date or 'until_sale'. */
  "to_date"?: string;
  /** Court file number if possession is court-ordered. */
  "court_order_reference"?: string;
};
  /** Instructions for Land Title Office transfer. */
  "lto_transfer_instructions"?: {
  /** LTO form to be used (typically Form A Transfer). */
  "transfer_form"?: string;
  /** Whether Property Transfer Tax exemption under s. 14(4)(a) PTA [VERIFY] is claimed for transfers between separating spouses. */
  "ptt_exemption_claimed"?: boolean;
  /** Date by which the transfer must be submitted for registration. */
  "registration_deadline"?: string;
};
};

export type Pension = {
  /** Name of the pension plan or RRSP/RRIF institution. */
  "plan_name": string;
  /** Type of retirement savings or pension vehicle. */
  "plan_type": "defined_benefit" | "defined_contribution" | "rrsp" | "rrif" | "lira" | "lif" | "dpsp" | "federal_pension" | "other";
  /** Name and contact for the plan administrator. */
  "plan_administrator"?: string;
  /** The spouse who is the plan member. */
  "member_spouse": "spouse_1" | "spouse_2";
  /** Period used to calculate the proportionate share. */
  "benefit_accrual_period"?: {
  /** Date relationship began for pension division purposes. */
  "relationship_start"?: string;
  /** Date relationship ended for pension division purposes. */
  "relationship_end"?: string;
};
  /** Method of division. Division at source per BC PBSA Part 6 [VERIFY] for provincially regulated plans. */
  "division_method": "division_at_source" | "lump_sum_transfer" | "if_and_when" | "reserved";
  /** Applicable BC Pension Benefits Standards Act forms for division at source. */
  "bc_pbsa_forms"?: {
  /** Whether Form P1 (Notice to Plan Administrator) is required [VERIFY]. */
  "form_p1_notice"?: boolean;
  /** Whether Form P2 (Spouse's Agreement) is required [VERIFY]. */
  "form_p2_agreement"?: boolean;
  /** Whether Form P9 (Waiver) applies [VERIFY]. */
  "form_p9_waiver"?: boolean;
};
  /** For federally regulated pensions: division under the Pension Benefits Division Act, SC 1992, c. 46, Sch. II [VERIFY]. */
  "federal_pbda_division"?: {
  /** Federal form required for division application. */
  "application_form"?: string;
  /** Maximum percentage transferable (generally 50%). */
  "maximum_division_percentage"?: number;
};
  /** Actuarial valuation for defined benefit plans. */
  "actuarial_valuation"?: Valuation;
  /** RRSP transfer on relationship breakdown under ITA s. 146(16) [VERIFY]. */
  "rrsp_rollover"?: {
  /** Amount to be transferred in CAD. */
  "transfer_amount"?: number;
  /** Whether CRA Form T2220 (Transfer from an RRSP) must be filed [VERIFY]. */
  "form_t2220_required"?: boolean;
  /** Name and account of the receiving RRSP or RRIF. */
  "receiving_plan"?: string;
  /** Deadline for completing the transfer. */
  "transfer_deadline"?: string;
};
  /** Commuted or account value in CAD as at valuation date. */
  "current_value"?: number;
  /** Value or percentage allocated to the non-member spouse. */
  "allocated_share_non_member"?: number;
};

export type BusinessInterest = {
  /** Legal name of the business entity. */
  "entity_name": string;
  /** Type of business entity. */
  "entity_type": "corporation" | "partnership" | "sole_proprietorship" | "professional_corporation" | "other";
  /** Jurisdiction where the entity is incorporated or registered. */
  "jurisdiction_of_incorporation"?: string;
  "ownership_interest": {
  /** Spouse holding the interest. */
  "holding_spouse"?: "spouse_1" | "spouse_2";
  /** Class and series of shares held, if applicable. */
  "share_class"?: string;
  /** Number of shares held. */
  "number_of_shares"?: number;
  /** Percentage of total equity held. */
  "percentage_ownership"?: number;
};
  "valuation"?: Valuation;
  /** Primary valuation methodology applied. */
  "valuation_approach"?: "income_approach" | "asset_approach" | "market_approach" | "combination";
  /** How the business interest will be dealt with. */
  "disposition": "retained_by_holder" | "buyout" | "sold_to_third_party" | "divided";
  /** Applicable if disposition is 'buyout'. */
  "buyout_terms"?: {
  /** Total buyout price in CAD. */
  "buyout_amount"?: number;
  /** Lump sum or instalment terms. */
  "payment_schedule"?: string;
  /** Collateral or guarantee securing the buyout obligation. */
  "security_for_payment"?: string;
};
  /** Non-competition restrictions if the exiting spouse must refrain from competing. */
  "non_compete"?: {
  /** Duration of the non-compete in months. */
  "duration_months"?: number;
  /** Geographic limitation. */
  "geographic_scope"?: string;
  /** Restricted activities. */
  "activity_scope"?: string;
};
  /** Non-solicitation restrictions on the exiting spouse. */
  "non_solicitation"?: {
  /** Duration in months. */
  "duration_months"?: number;
  /** Employees, clients, or both. */
  "scope"?: string;
};
};

export type Account = {
  /** Unique identifier for this account within the agreement. */
  "account_id": string;
  /** Name of financial institution or platform. */
  "institution": string;
  /** Type of account. */
  "account_type": "chequing" | "savings" | "brokerage" | "tfsa" | "non_registered_investment" | "crypto_wallet" | "gic" | "other";
  /** Last four digits of the account number for identification. */
  "account_number_last_four"?: string;
  /** Registered account holder. */
  "account_holder": "spouse_1" | "spouse_2" | "joint";
  /** Account balance as at the valuation date, in CAD. */
  "balance_at_valuation_date": number;
  "allocation": Allocation;
};

export type IncomeSource = {
  /** Name or category of income source (e.g., employment, self-employment, investment, pension, disability benefits). */
  "source_name": string;
  /** Gross annual amount from this source in CAD. */
  "annual_amount": number;
  /** Whether this income source is taxable under the Income Tax Act, R.S.C. 1985, c. 1 (5th Supp.). */
  "taxable": boolean;
  /** If non-taxable, the grossed-up equivalent for guideline income purposes per Federal Child Support Guidelines s. 19(1)(h). */
  "grossed_up_amount"?: number | null;
  /** Document substantiating this source (e.g., T4, T4A, T5, financial statement). */
  "documentation"?: string;
};

export type SupportPayment = {
  /** Payment amount per period in CAD. */
  "amount": number;
  /** How often the payment is made. */
  "frequency": "monthly" | "biweekly" | "semimonthly";
  /** Day or date within each period payment is due (e.g., '1st of each month'). */
  "payment_due_date"?: string;
  /** Method of payment. FMEP refers to BC Family Maintenance Enforcement Program enrollment. */
  "payment_method"?: "direct_deposit" | "e_transfer" | "cheque" | "FMEP";
  /** Date support payments commence. */
  "start_date": string;
};

export type ReviewTrigger = {
  /** Event that triggers a support review (e.g., child completes secondary school, payor reaches age 65, recipient achieves self-sufficiency). */
  "trigger_event": string;
  /** Classification of the trigger. */
  "trigger_type": "scheduled_date" | "milestone_event" | "material_change";
  /** Estimated date of trigger if ascertainable. */
  "anticipated_date"?: string | null;
  /** Dispute resolution process to be followed upon trigger. */
  "review_process": "negotiation" | "mediation" | "med_arb" | "arbitration" | "court";
};

export type S7Expense = {
  /** Category of special or extraordinary expense under Federal Child Support Guidelines s. 7. [VERIFY: s. 7 categories] */
  "category": "child_care" | "medical_dental_premiums" | "healthcare_uninsured" | "primary_secondary_extracurricular" | "post_secondary" | "extraordinary_extracurricular";
  /** Specific description of the expense. */
  "description": string;
  /** Estimated gross annual cost in CAD. */
  "annual_amount_estimated": number;
  /** Value of any tax deduction or credit attributable to this expense in CAD. */
  "tax_deduction_credit"?: number;
  /** Net annual cost after applying tax deductions or credits. */
  "net_after_tax": number;
  /** Payor's proportional share of net expense, based on ratio of respective guideline incomes. */
  "proportional_share_payor": number;
  /** Recipient's proportional share of net expense. */
  "proportional_share_recipient": number;
  /** Documents required to substantiate expense (e.g., receipts, invoices, enrollment confirmation). */
  "documentation_required"?: string;
};

export type WitnessBlock = {
  /** Full legal name of the witness. */
  "witness_full_name": string;
  /** Occupation of the witness. */
  "witness_occupation": string;
  /** Full address of the witness. */
  "witness_address": string;
  /** Date the witness signed. */
  "witness_signature_date": string;
  /** True when the witness has signed. */
  "witness_signature": boolean;
};

export type ILACertificate = {
  /** Name of the party who received ILA. */
  "party_name": string;
  /** Full name of the advising lawyer. */
  "lawyer_name": string;
  /** Name of the lawyer's firm. */
  "law_firm": string;
  /** Business address of the firm. */
  "firm_address": string;
  /** Law Society of British Columbia member number. */
  "lsbc_member_number": string;
  /** Date ILA was provided. */
  "date_of_advice": string;
  /** City/address where advice was given. */
  "location_of_advice": string;
  /** Duration of the ILA session in minutes. */
  "duration_minutes": number;
  /** Mandatory confirmations the ILA lawyer must attest to. */
  "confirmations": {
  /** Lawyer reviewed the entire agreement with the client. */
  "reviewed_entire_agreement": boolean;
  /** Client appeared to understand the terms and consequences. */
  "client_appeared_to_understand": boolean;
  /** Client appeared free of duress, coercion, or undue influence. */
  "free_of_duress_coercion_undue_influence": boolean;
  /** Client had a reasonable opportunity to ask questions and have them answered. */
  "reasonable_opportunity_for_questions": boolean;
  /** Client confirmed that full financial disclosure had been made. */
  "client_confirmed_full_disclosure": boolean;
  /** Lawyer is independent and does not also act for the other spouse. */
  "lawyer_is_independent": boolean;
};
  /** True when the ILA lawyer has signed the certificate. */
  "lawyer_signature": boolean;
};

export type NotaryBlock = {
  /** Full name of the notary public. */
  "notary_name": string;
  /** BC notary commission or appointment number. */
  "notary_commission_number": string;
  /** Expiry date of the notary's commission. */
  "commission_expiry"?: string;
  /** Date the document was notarized. */
  "notarization_date": string;
  /** Location where notarization occurred. */
  "notarization_location": string;
  /** True when the notary has signed and sealed. */
  "notary_signature": boolean;
};

export type Attestation = {
  /** Identifier of the spouse making the attestation. */
  "attesting_party": string;
  /** Full text of the attestation. */
  "attestation_text": string;
  /** ISO 8601 timestamp when the attestation was signed. */
  "signed_at_timestamp": string;
  /** Whether the party affirmed the attestation. */
  "confirmed": boolean;
};

export type ProceduralFairnessFactor = {
  /** Name of the procedural fairness factor. */
  "factor_name": string;
  /** Whether this factor is satisfied. */
  "satisfied": boolean;
  /** Summary of evidence supporting satisfaction or deficiency. */
  "evidence_summary": string;
};

export type DisclosureItem = {
  /** Category of financial disclosure document. */
  "category": "T1" | "T4" | "NoA" | "employment_income_letter" | "business_financials" | "pension_statement" | "real_property_appraisal" | "account_statements" | "debt_statements" | "life_insurance_policies" | "trust_documents" | "corporate_records" | "other";
  /** Date the document was provided to the other party. */
  "date_provided": string;
  /** Unique reference or filename identifying the document. */
  "document_reference": string;
  /** Whether the receiving spouse signed acknowledgment of receipt. */
  "recipient_acknowledgment_signed": boolean;
};

export type BehaviouralScreen = {
  /** Identifier of the decision node at which the snapshot was taken. */
  "node_id": string;
  /** ISO 8601 timestamp of the snapshot. */
  "timestamp": string;
  /** Affect-expression probability scores at this snapshot. */
  "expression_scores": {
  /** Probability score for happy expression. */
  "happy": number;
  /** Probability score for neutral expression. */
  "neutral": number;
  /** Probability score for sad expression. */
  "sad": number;
  /** Probability score for fearful expression. */
  "fearful": number;
  /** Probability score for angry expression. */
  "angry": number;
  /** Probability score for surprised expression. */
  "surprised": number;
  /** Probability score for disgusted expression. */
  "disgusted": number;
};
  /** Composite stress score derived from expression and biometric signals. */
  "stress_score": number;
  /** Threshold above which additional confirmation is required. */
  "stress_threshold": number;
  /** Whether stress_score exceeded the threshold. */
  "exceeded": boolean;
  /** Whether the system flagged this node for additional confirmation. */
  "additional_confirmation_required": boolean;
  /** Whether the party provided additional confirmation after the flag. */
  "additional_confirmation_given": boolean;
};

export interface SeparationAgreement {
  /** Exactly two spouses who are parties to this agreement. */
  "parties": Array<Person>;
  /** Classification of the spousal relationship under the FLA, s. 3. */
  "relationship_status": {
  /** FLA s. 3 spouse classification. 'married' = legally married; 'unmarried_2yr_or_more' = lived in marriage-like relationship ≥ 2 years (full property rights per s. 3(1)(b)); 'unmarried_under_2yr_with_child' = < 2 years but with a child (support rights, limited property rights [VERIFY s. 3]); 'unmarried_no_property_rights' = does not meet s. 3 threshold for property division. */
  "category": "married" | "unmarried_2yr_or_more" | "unmarried_under_2yr_with_child" | "unmarried_no_property_rights";
  /** Date of marriage, if applicable. */
  "marriage_date"?: unknown;
  /** City/province/country where the marriage was solemnized. */
  "marriage_place"?: string | null;
  /** Date the parties began living in a marriage-like relationship (FLA s. 3(1)(b)). */
  "cohabitation_start_date"?: unknown;
  /** Date of separation. Triggers limitation periods under FLA s. 198 (2 years for property/debt division) and s. 198(2) (1 year for spousal support for unmarried spouses) [VERIFY s. 198(2)]. */
  "separation_date": Date;
  /** Whether the separation date is agreed, disputed, or adopted solely for purposes of this agreement. */
  "separation_finality": "date_certain" | "date_disputed" | "date_agreed_for_purposes_of_this_agreement";
};
  /** Ordered recital clauses forming the preamble of the agreement. */
  "recitals"?: Array<{
  /** Unique snake_case identifier for this recital. */
  "key": string;
  /** Recital prose. Use {{placeholder}} tokens for party names, dates, and other variable data. */
  "text": string;
  /** One-line drafter note explaining the legal or practical purpose of this recital. */
  "purpose": string;
}>;
  /** Defined terms used throughout the agreement body. */
  "definitions_section"?: Array<{
  /** The defined term as it appears in the agreement (title case, in quotation marks when used in the document). */
  "term": string;
  /** Full definition text. */
  "definition": string;
  /** FLA section cross-reference, if the term maps to a statutory definition. Null otherwise. */
  "fla_cross_reference": string | null;
}>;
  /** All children of the relationship to whom this agreement applies. */
  "children"?: Array<Child>;
  /** Parenting time arrangements per FLA ss. 40–42 [VERIFY]. */
  "parenting_time"?: {
  /** High-level characterization of the parenting time arrangement. */
  "schedule_type": "shared_5050" | "primary_with_one_parent" | "split" | "other_specified";
  /** Parent with whom the child primarily resides, if schedule_type is 'primary_with_one_parent'. */
  "primary_parent_if_applicable"?: "spouse_1" | "spouse_2";
  /** Recurring weekly parenting time blocks. */
  "weekly_schedule": Array<ParentingTimeBlock>;
  /** Named holidays and special days with allocation and rotation rules. */
  "holiday_schedule"?: Array<HolidayAllocation>;
  /** Summer, winter, and spring break allocations. */
  "break_allocations"?: Array<BreakAllocation>;
  /** Rules governing physical exchanges of the child between parents. */
  "transitions"?: {
  /** Who provides transportation at transitions. */
  "responsible_for_transport"?: "spouse_1" | "spouse_2" | "alternating" | "receiving_parent";
  /** Location for exchanges, e.g., school, neutral public place, or a parent's residence. */
  "transition_location"?: string;
  /** Any constraints on transition timing, e.g., 'No transitions after 8:00 PM on school nights.' */
  "time_of_day_rules"?: string;
};
  /** Right of first refusal for childcare during the other parent's scheduled time. */
  "right_of_first_refusal"?: {
  /** Whether the other parent must be offered care before a third-party caregiver is used. */
  "enabled": boolean;
  /** Minimum number of consecutive hours of absence that triggers the obligation. */
  "threshold_hours"?: number;
};
};
  /** Allocation of parental responsibilities (decision-making) per FLA s. 41 [VERIFY]. */
  "parental_responsibilities"?: {
  /** Each decision-making domain with its allocation. */
  "domains": Array<DecisionDomain>;
  /** Process when jointly deciding parents cannot agree, e.g., mediation, parenting coordinator, arbitration. */
  "dispute_resolution_for_deadlock"?: string;
};
  /** Communication protocols between parents and with children. */
  "communication"?: {
  /** Required communication platform, e.g., 'OurFamilyWizard', 'email only', or named app. */
  "parent_to_parent_channel": string;
  /** Maximum hours within which a parent must respond to a non-emergency communication. */
  "response_time_hours"?: number;
  /** Maximum hours for response to an emergency communication. */
  "emergency_response_time_hours"?: number;
  /** Terms for a parent contacting the child during the other parent's parenting time. */
  "parent_child_contact_during_other_time"?: {
  /** How often the non-residential parent may contact the child, e.g., 'once daily'. */
  "frequency"?: string;
  /** Permitted mode of contact, e.g., 'phone call, video call'. */
  "mode"?: string;
  /** Acceptable window for contact, e.g., '6:00 PM – 7:30 PM'. */
  "time_window"?: string;
};
  /** Whether the agreement includes a mutual prohibition on disparaging the other parent in the child's presence or hearing. */
  "no_disparagement": boolean;
};
  /** Relocation provisions per FLA Part 4, Division 6 (ss. 65–71) [VERIFY]. */
  "relocation_and_mobility"?: {
  /** Minimum days of written notice required before a proposed relocation. FLA s. 66 prescribes a minimum of 60 days [VERIFY]. */
  "notice_period_days": number;
  /** What constitutes a 'relocation' triggering notice obligations, e.g., move exceeding a specified distance or change of school district. */
  "relocation_definition": string;
  /** Distance in kilometres beyond which a move is treated as a relocation. */
  "distance_threshold_km"?: number;
  /** Required dispute-resolution steps (mediation, arbitration, court application) before either parent may relocate with a child. */
  "dispute_resolution_before_move": string;
};
  /** International and domestic travel provisions and passport custody. */
  "travel_and_passports"?: {
  /** Steps required to obtain the other parent's consent for international travel, including form of consent (written/notarized) and advance notice period. */
  "international_travel_consent_process": string;
  /** Days of notice required before international travel with the child. */
  "advance_notice_days"?: number;
  /** Which parent retains physical custody of the child's passport. */
  "passport_held_by": "spouse_1" | "spouse_2" | "alternating_with_schedule" | "jointly_held_neutral_location";
  /** How the non-holding parent obtains the passport for approved travel. */
  "passport_retrieval_process"?: string;
  /** Notification requirements for travel itinerary, accommodations, and return. */
  "itinerary_disclosure"?: {
  /** Whether the travelling parent must provide a detailed itinerary. */
  "required"?: boolean;
  /** Categories of travel information that must be disclosed. */
  "details"?: Array<"flight_numbers" | "accommodations" | "contact_numbers" | "return_date" | "emergency_contact_at_destination">;
  /** Days before departure by which the itinerary must be provided. */
  "disclosure_deadline_days"?: number;
};
};
  /** Scheduled reviews and variation mechanism for parenting provisions. */
  "review_and_variation"?: {
  /** Pre-agreed points at which the parties will review parenting arrangements. */
  "scheduled_reviews"?: Array<{
  /** Event or date triggering review, e.g., 'child turns 13', 'child enters high school', or a calendar date. */
  "trigger": string;
  /** What is reviewed, e.g., 'parenting time schedule', 'all parenting provisions'. */
  "scope"?: string;
}>;
  /** Text affirming either party may seek variation upon a material change in circumstances affecting the child's best interests, consistent with FLA s. 47 [VERIFY]. */
  "material_change_clause": string;
  /** Ordered steps before court application, e.g., ['negotiation', 'mediation', 'arbitration', 'court_application']. */
  "dispute_resolution_path": Array<string>;
};
  /** Valuation date for family property per FLA s. 87 [VERIFY]. Default is the date of the agreement unless the parties agree otherwise. */
  "valuation_date": {
  /** The agreed valuation date. */
  "date": string;
  /** True if the valuation date is the date of the agreement (FLA s. 87 default) [VERIFY]. */
  "is_default"?: boolean;
  /** If is_default is false, the reason the parties selected an alternative valuation date (e.g., 'date of separation', 'date of trial'). */
  "override_reason"?: string;
};
  /** All family property within the meaning of FLA s. 84 [VERIFY]. Includes property owned by at least one spouse at the date of separation, regardless of when acquired, unless excluded under s. 85. */
  "family_property"?: Array<Asset>;
  /** Property excluded from family property under FLA s. 85 [VERIFY]. Growth in value during the relationship is family property per FLA s. 84(2)(g) [VERIFY]. */
  "excluded_property"?: Array<unknown>;
  /** All family debt within the meaning of FLA s. 86 [VERIFY]. Includes debt incurred during the relationship for a family purpose and debt incurred to acquire, maintain, or improve family property. */
  "family_debt"?: Array<Debt>;
  /** Detailed records for each parcel of real property, supplementing the corresponding family_property entry. */
  "real_property"?: Array<RealProperty>;
  /** Pension plans, RRSPs, RRIFs, LIRAs, LIFs, and DPSPs subject to division. */
  "pensions_and_rrsps"?: Array<Pension>;
  /** Corporate shares, partnership interests, and sole proprietorship interests that are family property. */
  "business_interests"?: Array<BusinessInterest>;
  /** Tangible personal property (furniture, jewelry, art, collectibles, etc.). */
  "personal_property"?: Array<Asset>;
  /** Motor vehicles, recreational vehicles, boats, and similar titled personal property. */
  "vehicles"?: Array<unknown>;
  /** Bank accounts, brokerage accounts, TFSAs, non-registered investments, and crypto wallets. */
  "financial_accounts"?: Array<Account>;
  /** Summary calculation of the equalization payment. */
  "equalization_payment_summary"?: {
  /** Aggregate fair market value of all family property in CAD. */
  "total_family_property_fmv": number;
  /** Aggregate outstanding family debt in CAD. */
  "total_family_debt": number;
  /** Total family property FMV minus total family debt. */
  "net_family_property": number;
  /** Division ratio. Default is 50:50 per FLA s. 81 [VERIFY]. Spouse_1 share listed first. */
  "division_ratio": string;
  /** Applicable only if the parties agree to an unequal division. Courts may order unequal division under FLA s. 95 [VERIFY] where equal division would be significantly unfair. */
  "unequal_division"?: {
  /** Whether unequal division is agreed. */
  "claimed"?: boolean;
  /** Significant unfairness factors relied upon (e.g., 'duration of relationship', 'spouse's contribution to the other's career', 'debt incurred for non-family purposes'). */
  "fla_s95_factors"?: Array<string>;
  /** Agreed unequal ratio. Spouse_1 share first. */
  "agreed_ratio"?: string;
};
  /** Spouse_1's calculated share of net family property in CAD. */
  "spouse_1_net_entitlement"?: number;
  /** Spouse_2's calculated share of net family property in CAD. */
  "spouse_2_net_entitlement"?: number;
  /** The net payment required to achieve the agreed division. */
  "net_equalization_payment": {
  /** Equalization payment amount in CAD. */
  "amount": number;
  /** Payor spouse. */
  "from": "spouse_1" | "spouse_2";
  /** Payee spouse. */
  "to": "spouse_1" | "spouse_2";
};
  /** Terms governing payment of the equalization amount. */
  "payment_terms"?: {
  /** Payment method. */
  "method"?: "lump_sum" | "instalments" | "combination";
  /** Due date for lump sum payment, if applicable. */
  "lump_sum_due_date"?: string;
  /** Schedule of instalment payments. */
  "instalment_schedule"?: Array<{
  /** Instalment due date. */
  "due_date"?: string;
  /** Instalment amount in CAD. */
  "amount"?: number;
}>;
  /** Annual interest rate on outstanding balance, if any. */
  "interest_rate"?: number;
  /** Security or collateral for deferred payment (e.g., charge on real property, letter of credit). */
  "security"?: string;
};
};
  /** Income tax treatment of support payments under the Income Tax Act, R.S.C. 1985, c. 1 (5th Supp.). */
  "tax_treatment"?: {
  /** Post-May 1997 child support: not deductible by payor, not includable by recipient, per ITA s. 56.1(4) and s. 60.1(4). */
  "child_support_tax_treatment": string;
  /** Periodic spousal support: deductible by payor under ITA s. 60(b), includable by recipient under ITA s. 56(1)(b). [VERIFY: s. 60(b) and s. 56(1)(b) current references] */
  "spousal_support_periodic_tax_treatment": {
  "deductible_to_payor"?: boolean;
  "includable_to_recipient"?: boolean;
};
  /** Lump sum spousal support: generally not deductible to payor and not includable to recipient. */
  "lump_sum_spousal_support_tax_treatment": {
  "deductible_to_payor"?: boolean;
  "includable_to_recipient"?: boolean;
};
  /** Retroactive periodic spousal support may be deductible/includable in the years to which it relates; recipient may request CRA reassessment for prior years per ITA s. 60.1(3). Retroactive child support is not deductible/includable. [VERIFY: s. 60.1(3) applicability] */
  "retroactive_support_tax_treatment": string;
};
  /** Mechanics for executing the property division and completing all required transfers. */
  "implementation_and_transfer"?: {
  /** Number of days after execution of the agreement within which all transfers and steps must be completed. */
  "implementation_deadline_days": number;
  /** List of title transfers required. */
  "title_transfers"?: Array<{
  /** Reference to the asset being transferred. */
  "asset_id"?: string;
  /** Transferor. */
  "from"?: "spouse_1" | "spouse_2" | "joint";
  /** Transferee. */
  "to"?: "spouse_1" | "spouse_2";
  /** Method of transfer (e.g., 'Form A LTO transfer', 'ICBC transfer', 'broker DTC transfer'). */
  "transfer_method"?: string;
  /** Deadline for this specific transfer. */
  "deadline"?: string;
}>;
  /** Power of attorney or deemed signing provisions if a party fails to execute required documents. */
  "document_execution_authority"?: {
  /** Whether each party grants the other an irrevocable power of attorney to execute transfer documents if they fail to do so. */
  "irrevocable_poa_granted"?: boolean;
  /** Whether the agreement itself operates as authority for registration in the event of non-compliance. */
  "deemed_signing_clause"?: boolean;
};
  /** Escrow arrangements for funds or documents pending completion. */
  "escrow"?: {
  /** Name of the escrow agent (typically one party's solicitor). */
  "escrow_agent"?: string;
  /** List of documents or funds held in escrow. */
  "items_in_escrow"?: Array<string>;
  /** Conditions that must be satisfied for release of escrowed items. */
  "release_conditions"?: string;
};
  /** Remedies available if a party fails to comply with the implementation obligations. */
  "default_and_breach"?: {
  /** Number of days' written notice required before a default is triggered. */
  "notice_period_days"?: number;
  /** Available remedies (e.g., 'specific performance', 'costs on a full indemnity basis', 'interest at the post-judgment rate under the Court Order Interest Act [VERIFY]', 'registration of the agreement as a court order under FLA s. 44 [VERIFY]'). */
  "remedies"?: Array<string>;
  /** Interest accruing on late equalization or other payments. */
  "interest_on_late_payment"?: {
  /** Annual interest rate as a percentage. */
  "rate"?: number;
  /** Statutory or contractual basis for the rate (e.g., 'Court Order Interest Act, RSBC 1996, c. 79 [VERIFY]'). */
  "basis"?: string;
};
};
};
  /** Income determination for each spouse for guideline support purposes. */
  "income_determination"?: {
  "spouse_1": propertiesincomeDeterminationdefsSpouseIncome;
  "spouse_2": propertiesincomeDeterminationdefsSpouseIncome;
};
  /** Child support terms under the Federal Child Support Guidelines, SOR/97-175, and BC Family Law Act, S.B.C. 2011, c. 25, Part 7. */
  "child_support"?: {
  /** The spouse obligated to pay child support. */
  "payor": "spouse_1" | "spouse_2";
  /** Applicable guideline instrument. */
  "applicable_guideline": string;
  /** Payor's guideline income for table amount lookup. */
  "payor_guideline_income": number;
  /** Recipient's guideline income, required for shared or split parenting arrangements under s. 8 or s. 9. */
  "recipient_guideline_income"?: number | null;
  /** Children for whom support is payable. */
  "children"?: Array<{
  "name"?: string;
  "date_of_birth"?: string;
  /** Whether child qualifies as child of the marriage per Divorce Act, R.S.C. 1985, c. 3 (2nd Supp.), s. 2(1), or child under FLA s. 146. [VERIFY: FLA s. 146 definition of child for support] */
  "child_of_marriage"?: boolean;
}>;
  /** Parenting arrangement classification affecting calculation: primary (s. 3), shared (s. 9, each parent 40%+ time), split (s. 8). */
  "parenting_arrangement_for_cs": "primary_residence" | "shared_40_60_or_closer" | "split";
  /** Monthly table amount per applicable Federal Tables, BC schedule. */
  "table_amount": number;
  /** Set-off calculation for shared or split parenting under s. 8 or s. 9. */
  "set_off_calculation"?: unknown | null;
  "payment": SupportPayment;
  /** Whether the order/agreement is enrolled with the BC Family Maintenance Enforcement Program. */
  "fmep_enrollment"?: boolean;
  /** Event upon which child support terminates (e.g., 'child ceases to be a child of the marriage per Divorce Act s. 2(1) or is no longer a child under FLA s. 146'). [VERIFY: FLA s. 146 and s. 147 re child support obligation end] */
  "end_event": string;
  /** Special or extraordinary expenses under Federal Child Support Guidelines s. 7. */
  "section_7_expenses"?: {
  "expenses": Array<S7Expense>;
  /** How often s. 7 expenses are reconciled (e.g., 'quarterly with receipts within 30 days of quarter end'). */
  "reconciliation_cadence": string;
  /** Whether both spouses must consent before incurring a new s. 7 expense. */
  "pre_approval_required"?: boolean;
};
};
  /** Retroactive child support claim, resolved per DBS v. SRG, 2006 SCC 37, and Michel v. Graydon, 2020 SCC 24. [VERIFY: Michel v. Graydon citation 2020 SCC 24] */
  "retroactive_child_support"?: unknown | null;
  /** Spousal support terms under FLA Part 7, Division 8, and the Spousal Support Advisory Guidelines (SSAG). */
  "spousal_support"?: {
  /** Basis of entitlement per Moge v. Moge, [1992] 3 SCR 813, and Bracklow v. Bracklow, [1999] 1 SCR 420. */
  "entitlement_basis": Array<"compensatory" | "non_compensatory" | "contractual">;
  /** Advisory framework used for quantum and duration. */
  "applicable_guideline": string;
  "ssag_calculation": {
  /** SSAG formula applied. */
  "formula": "without_child_support" | "with_child_support";
  /** Low-end monthly amount. */
  "range_low_amount": number;
  /** Mid-range monthly amount. */
  "range_mid_amount": number;
  /** High-end monthly amount. */
  "range_high_amount": number;
  /** Low-end duration in months (null if indefinite). */
  "range_low_duration_months"?: number | null;
  "range_mid_duration_months"?: number | null;
  "range_high_duration_months"?: number | null;
  /** Where the agreed amount and duration fall relative to the SSAG range. */
  "agreed_position": "within_range" | "above_range" | "below_range";
  /** Explanation if amount/duration is above or below the SSAG range. */
  "reasons_for_position"?: string;
};
  "payment"?: SupportPayment;
  "duration": {
  /** Duration classification. */
  "type": "indefinite" | "fixed_term" | "to_review_event";
  /** Fixed end date if applicable. */
  "end_date"?: string | null;
  /** Event triggering end or review if type is to_review_event. */
  "review_event"?: string | null;
};
  /** Annual cost-of-living adjustment. */
  "indexation"?: {
  "indexed": boolean;
  /** Index used (e.g., 'Statistics Canada CPI All-Items, Vancouver, B.C.'). */
  "index_reference"?: string | null;
  /** When adjustment takes effect (e.g., 'January 1 of each year'). */
  "adjustment_cadence"?: string | null;
};
  /** Lump sum spousal support in lieu of or in addition to periodic payments. */
  "lump_sum_option"?: unknown | null;
  /** Waiver of spousal support, structured to withstand Miglin v. Miglin, 2003 SCC 24, Stage 1 and Stage 2 analysis. */
  "waiver"?: unknown | null;
};
  /** Security for support obligations. */
  "support_security"?: {
  /** Life insurance policy maintained to secure support obligations. */
  "life_insurance"?: unknown | null;
  /** Charge registered against real property as security for support arrears or lump sum. */
  "charge_on_property"?: unknown | null;
  /** Whether the agreement is assigned to the BC Family Maintenance Enforcement Program for enforcement. */
  "fmep_assignment"?: boolean;
};
  /** Review and variation provisions for child and spousal support. */
  "support_review_and_variation"?: {
  /** Specific future dates on which support will be reviewed. */
  "scheduled_review_dates"?: Array<string>;
  /** Events that automatically trigger a support review. */
  "automatic_review_triggers": Array<ReviewTrigger>;
  /** Definition of material change in circumstances sufficient to warrant variation (e.g., 'a change in income of 10% or more, or any change that, had it been known, would likely have resulted in a different order per Willick v. Willick, [1994] 3 SCR 670'). */
  "material_change_threshold": string;
  /** Ordered sequence of dispute resolution steps before court application. FLA s. 4 encourages out-of-court resolution. */
  "dispute_resolution_process": Array<"negotiation" | "mediation" | "med_arb" | "arbitration" | "court">;
};
  /** Mutual releases of all claims arising from the relationship, subject to FLA s. 4 and s. 93 set-aside jurisdiction. */
  "releases_and_waivers"?: {
  /** Text of the mutual general release of claims arising from the relationship, subject to FLA s. 4 (agreement requirements) and s. 93 (set-aside powers). */
  "mutual_general_release": string;
  /** Category-specific releases. */
  "specific_releases": {
  /** Release of all property division claims under FLA Part 5. */
  "property": string;
  /** Release of spousal support claims except as provided in this agreement. */
  "support": string;
  /** Release of parenting claims except as provided; subject to best-interests reservation. */
  "parenting": string;
  /** Release of estate claims, including acknowledgment of WESA s. 60 wills variation rights being waived for spousal claims. */
  "estate_wills_variation": string;
  /** Release of tort claims arising from the relationship. */
  "tort": string;
  /** Release of claims for intentional infliction of emotional distress arising from the relationship. */
  "intentional_infliction": string;
};
  /** Acknowledgment that all releases are intended to be final and binding. */
  "finality_acknowledgment": string;
  /** Explicit reservation: Nothing in this agreement releases claims relating to children, which remain always subject to the court's best-interests jurisdiction. */
  "children_reservation": string;
  /** Each party acknowledges awareness of WESA s. 60 wills variation rights and waives spousal claims thereunder. */
  "wesa_s60_acknowledgment": string;
};
  /** Mutual and specific indemnification provisions. */
  "indemnities"?: {
  /** Each party indemnifies the other for debts allocated to that party under the property/debt division sections. */
  "debt_indemnity": string;
  /** Indemnity for tax liability arising from assets allocated or transferred under this agreement. */
  "tax_exposure_indemnity": string;
  /** Indemnity for loss arising from breach of the full-disclosure representations. */
  "disclosure_breach_indemnity": string;
  /** Procedural rights on indemnified claims. */
  "notice_and_defence_rights": {
  /** Indemnified party must give prompt written notice of any third-party claim. */
  "notice_requirement": string;
  /** Indemnifying party has the right to assume defence of the claim at its cost. */
  "right_to_defend": string;
  /** Indemnified party must cooperate in the defence. */
  "cooperation": string;
};
};
  /** Tiered dispute resolution: mediation, arbitration, then court. */
  "dispute_resolution"?: {
  /** Mediation as the mandatory first step. */
  "mandatory_mediation": {
  /** Process for selecting a mediator (mutual agreement, then roster selection). */
  "mediator_selection_process": string;
  /** Mediation costs shared equally unless mediator or court orders otherwise. */
  "cost_sharing": string;
  /** Mediation to commence within 30 days of written dispute notice. */
  "timeline": string;
};
  /** Arbitration as second tier if mediation fails. */
  "arbitration": {
  /** Arbitration conducted under BC Arbitration Act and, where applicable, the Notice to Mediate (Family) Regulation [VERIFY]. */
  "governing_rules": string;
  /** Single arbitrator selected by agreement or appointed per BC Arbitration Act. */
  "arbitrator_selection": string;
  /** True if arbitration is binding. */
  "binding": boolean;
};
  /** Court proceedings as last resort. */
  "court_last_resort": {
  /** Supreme Court of British Columbia. */
  "court": string;
  /** Named judicial registry (e.g., Vancouver, Victoria, etc.). */
  "registry": string;
};
  /** Party who initiates frivolous proceedings bears the other party's mediator/arbitrator fees and reasonable legal costs. */
  "cost_rules": string;
};
  /** Governing law and jurisdictional provisions. */
  "governing_law_and_jurisdiction"?: {
  /** This agreement is governed by the Family Law Act, SBC 2011, c. 25, and the laws of British Columbia. */
  "governing_law": string;
  /** The parties submit to the exclusive jurisdiction of the courts of British Columbia. */
  "exclusive_jurisdiction": string;
  /** Acknowledgment that under FLA s. 198(5) [VERIFY], limitation periods are suspended while the parties are engaged in qualifying family dispute resolution. */
  "limitation_suspension_acknowledgment": string;
};
  /** Entire agreement / integration clause. */
  "entire_agreement_clause"?: {
  /** This agreement constitutes the entire agreement and supersedes all prior oral or written agreements, understandings, and negotiations. */
  "supersession": string;
  /** Neither party has relied on any representations, warranties, or promises not expressly set out in this agreement. */
  "no_outside_representations": string;
};
  /** Standard severability clause. */
  "severability"?: {
  /** If any provision is found unenforceable or invalid by a court of competent jurisdiction, the remaining provisions continue in full force and effect. */
  "clause_text": string;
};
  /** Amendment formalities and counterpart execution. */
  "amendments_and_counterparts"?: {
  /** Amendments only effective if in writing, signed by both parties, with each party having received ILA on the amendment. */
  "amendments_in_writing": string;
  /** Electronic signatures are permitted under the BC Electronic Transactions Act, SBC 2001, c. 10 [VERIFY]. */
  "electronic_signatures": string;
  /** This agreement may be executed in counterparts, each of which is deemed an original, and all of which together constitute one agreement. */
  "counterparts": string;
};
  /** Service and notice requirements. */
  "notice_provisions"?: {
  /** Permitted delivery methods: registered mail, email with read receipt, courier. */
  "permitted_methods": Array<string>;
  /** Each party's address for service, cross-referencing the parties section. */
  "addresses_for_service": {
  /** Party 1's last known address for service. */
  "party_1_address": string;
  /** Party 2's last known address for service. */
  "party_2_address": string;
};
  /** Rules for when notice is deemed received. */
  "deemed_receipt_rules": {
  /** 5 business days after posting. */
  "registered_mail": string;
  /** Upon receipt of read confirmation or, absent confirmation, 2 business days after sending. */
  "email": string;
  /** Next business day after delivery to the courier. */
  "courier": string;
};
  /** Each party must notify the other in writing of any change of address within 10 days. */
  "address_change_obligation": string;
};
  /** Conditions that must be satisfied before the agreement becomes binding, if applicable. */
  "conditions_precedent"?: {
  /** Court approval required where a party lacks legal capacity or is an undischarged bankrupt. */
  "court_approval_if_required"?: string;
  /** Completion of all property transfers described in this agreement. */
  "property_transfer_completion"?: string;
  /** Each party's ILA certificate must be executed and appended before the agreement takes effect. */
  "ila_confirmation": string;
  /** Both parties certify that financial disclosure exchange, including Form F8 equivalents, is complete. */
  "financial_disclosure_certified_complete": string;
};
  /** Default events, cure periods, and enforcement mechanisms. */
  "default_and_remedies"?: {
  /** Events constituting default: missed support payment, failure to transfer property or assets by deadline, breach of disclosure representations, failure to maintain required insurance. */
  "events_of_default": Array<string>;
  /** Number of days after written notice within which the defaulting party may cure (e.g., 15 days). */
  "cure_period_days": number;
  /** Upon uncured default, the non-defaulting party may declare all remaining obligations immediately due. */
  "acceleration_of_obligations": string;
  /** The agreement may be filed with the court under FLA s. 44 [VERIFY] for property enforcement or s. 148 [VERIFY] for support enforcement. */
  "fla_filing_for_enforcement": string;
  /** Support obligations may be enrolled with the BC Family Maintenance Enforcement Program for enforcement. */
  "fmep_enrollment": string;
};
  /** Signature, witness, and optional notarization blocks for each party. */
  "execution_block"?: {
  /** Execution block for Party 1. */
  "party_1_execution": {
  /** Full legal name of Party 1. */
  "party_name": string;
  /** Date Party 1 signed. */
  "signature_date": string;
  /** City and province where Party 1 signed. */
  "signature_location": string;
  /** True when Party 1 has signed. */
  "party_signature": boolean;
  "witness": WitnessBlock;
  "notarization"?: NotaryBlock;
};
  /** Execution block for Party 2. */
  "party_2_execution": {
  /** Full legal name of Party 2. */
  "party_name": string;
  /** Date Party 2 signed. */
  "signature_date": string;
  /** City and province where Party 2 signed. */
  "signature_location": string;
  /** True when Party 2 has signed. */
  "party_signature": boolean;
  "witness": WitnessBlock;
  "notarization"?: NotaryBlock;
};
};
  /** Separate ILA certificate appended for each party. */
  "ila_certificates"?: {
  "party_1_ila": ILACertificate;
  "party_2_ila": ILACertificate;
};
  /** Index of schedules forming part of this agreement. */
  "schedules_index"?: {
  /** Schedule A: Complete inventory of family and excluded assets and debts. */
  "schedule_a": string;
  /** Schedule B: Sworn financial statements per spouse (Form F8 equivalent). */
  "schedule_b": string;
  /** Schedule C: Detailed parenting time calendar. */
  "schedule_c": string;
  /** Schedule D: Life and other insurance policies with beneficiary designations. */
  "schedule_d": string;
  /** Schedule E: Transfer forms and conveyancing documents for real property. */
  "schedule_e": string;
  /** Schedule F: Pension division agreements and required statutory forms. */
  "schedule_f": string;
  /** Schedule G: Spousal Support Advisory Guidelines calculation output used to inform support terms. */
  "schedule_g": string;
};
  /** Procedural fairness factors per Brandsema v. Brandsema, 2009 SCC 10, protecting against set-aside under FLA s. 93(3)(b) and (c). */
  "procedural_fairness": {
  /** Independent legal advice records for each spouse, per Brandsema and FLA s. 93(3)(b). */
  "independent_legal_advice": {
  /** ILA record for spouse 1. */
  "spouse_1": {
  /** Whether spouse 1 received independent legal advice. */
  "received": boolean;
  /** Full name of the advising lawyer. */
  "lawyer_name"?: string;
  /** Law firm of the advising lawyer. */
  "firm"?: string;
  /** Date ILA was provided. */
  "date"?: string;
  /** Duration of the ILA session in minutes. */
  "duration_minutes"?: number;
  /** Lawyer's certificate of independent legal advice text. */
  "attestation_text": string;
};
  /** ILA record for spouse 2. */
  "spouse_2": {
  /** Whether spouse 2 received independent legal advice. */
  "received": boolean;
  /** Full name of the advising lawyer. */
  "lawyer_name"?: string;
  /** Law firm of the advising lawyer. */
  "firm"?: string;
  /** Date ILA was provided. */
  "date"?: string;
  /** Duration of the ILA session in minutes. */
  "duration_minutes"?: number;
  /** Lawyer's certificate of independent legal advice text. */
  "attestation_text": string;
};
};
  /** Per-spouse voluntariness attestations addressing duress, coercion, and undue influence per Brandsema and FLA s. 93(3)(c). */
  "voluntariness": {
  "spouse_1": {
  /** Spouse 1 confirms the agreement was entered voluntarily. */
  "confirmed": boolean;
  /** Spouse 1 confirms no duress was present. */
  "no_duress": boolean;
  /** Spouse 1 confirms no coercion was present. */
  "no_coercion": boolean;
  /** Spouse 1 confirms no undue influence was exerted. */
  "no_undue_influence": boolean;
  /** Full voluntariness attestation text. */
  "attestation_text": string;
  /** Timestamp of signing. */
  "signed_at_timestamp": string;
};
  "spouse_2": {
  /** Spouse 2 confirms the agreement was entered voluntarily. */
  "confirmed": boolean;
  /** Spouse 2 confirms no duress was present. */
  "no_duress": boolean;
  /** Spouse 2 confirms no coercion was present. */
  "no_coercion": boolean;
  /** Spouse 2 confirms no undue influence was exerted. */
  "no_undue_influence": boolean;
  /** Full voluntariness attestation text. */
  "attestation_text": string;
  /** Timestamp of signing. */
  "signed_at_timestamp": string;
};
};
  /** Assessment of bargaining power imbalance per Brandsema, relevant to FLA s. 93(3)(b). */
  "equality_of_bargaining_position": {
  /** Narrative assessment of whether bargaining positions were equal. */
  "assessment": string;
  /** List of acknowledged vulnerabilities (e.g., language barrier, financial dependence, family violence history). */
  "vulnerabilities_acknowledged": Array<string>;
  /** List of accommodations made to address identified vulnerabilities. */
  "accommodations_made": Array<string>;
};
  /** Per-spouse record of time afforded to review the agreement before signing. */
  "time_to_consider": {
  "spouse_1": {
  /** Calendar days between receipt of first draft and execution. */
  "days_between_first_draft_and_signing": number;
  /** Whether the time afforded was reasonable in the circumstances. */
  "was_reasonable": boolean;
};
  "spouse_2": {
  /** Calendar days between receipt of first draft and execution. */
  "days_between_first_draft_and_signing": number;
  /** Whether the time afforded was reasonable in the circumstances. */
  "was_reasonable": boolean;
};
};
  /** Per-spouse confirmation that the agreement and its consequences were understood. */
  "understanding": {
  "spouse_1": {
  /** Primary language used in negotiations. */
  "language_of_negotiation": string;
  /** Whether an interpreter was used. */
  "interpreter_used": boolean;
  /** Spouse confirms understanding of the agreement terms. */
  "confirmed_understands_terms": boolean;
  /** Spouse confirms understanding of the legal and financial consequences of the agreement. */
  "confirmed_understands_consequences": boolean;
};
  "spouse_2": {
  /** Primary language used in negotiations. */
  "language_of_negotiation": string;
  /** Whether an interpreter was used. */
  "interpreter_used": boolean;
  /** Spouse confirms understanding of the agreement terms. */
  "confirmed_understands_terms": boolean;
  /** Spouse confirms understanding of the legal and financial consequences of the agreement. */
  "confirmed_understands_consequences": boolean;
};
};
};
  /** Substantive fairness analysis per Miglin v. Miglin, 2003 SCC 24 (Stage 1 and Stage 2) and Hartshorne v. Hartshorne, 2004 SCC 22, addressing FLA s. 93(3)(d) and (e) [VERIFY]. */
  "substantive_fairness": {
  /** Miglin Stage 1: whether the agreement, at formation, substantially complied with the objectives of the FLA. */
  "miglin_stage_1": {
  /** Whether the agreement reflects the genuine intentions of both parties at execution. */
  "agreement_reflects_parties_intentions": boolean;
  /** Whether the agreement substantially complies with the objectives of the FLA (Part 5 spousal support, Part 5 property division) [VERIFY part references]. */
  "complies_with_fla_objectives": boolean;
  /** Specific FLA objectives addressed (e.g., FLA s. 161 spousal support objectives, FLA s. 81 equal division presumption) [VERIFY section numbers]. */
  "fla_objectives_referenced": Array<string>;
  /** Explanation for any departure from Spousal Support Advisory Guidelines ranges, or null if SSAG range is met. */
  "departure_from_ssag_explained"?: string | null;
  /** Explanation for any departure from the FLA s. 81 presumption of equal division of family property, or null if equal division applies. */
  "departure_from_equal_division_explained"?: string | null;
};
  /** Foreseeable changes the parties contemplated at execution, documented to defeat later claims of unforeseen change under Miglin Stage 2. */
  "miglin_stage_2_anticipated_changes": Array<{
  /** Description of the anticipated change (e.g., career trajectory, child developmental phase, retirement timeline). */
  "change_description": string;
  /** How the agreement accounts for or addresses this anticipated change. */
  "how_agreement_addresses_it": string;
}>;
  /** Hartshorne factors relevant where there is an unequal division of property. */
  "hartshorne_circumstances": {
  /** Whether an unequal division of property or support is acknowledged. */
  "unequal_position_acknowledged": boolean;
  /** Explanation of why the unequal division is substantively fair in the circumstances. */
  "why_unequal_division_substantively_fair": string;
  /** Comparison of the agreed division to the default equal-division result under FLA s. 81. */
  "comparison_to_fla_default_division": string;
};
  /** Text acknowledging that the agreement may be set aside in limited circumstances under FLA s. 93, as interpreted in Brandsema, Miglin, and Hartshorne, and that both parties accept this residual risk. */
  "acknowledgment_of_setaside_grounds": string;
};
  /** Per-spouse financial disclosure attestations required to defend against set-aside under FLA s. 93(3)(a) (failure to disclose significant property or debts) [VERIFY]. */
  "financial_disclosure_attestations": {
  "spouse_1": {
  /** Attestation of full and complete financial disclosure by spouse 1. */
  "disclosure_complete_attestation": {
  /** Whether spouse 1 confirms disclosure is complete. */
  "confirmed": boolean;
  /** Timestamp of the attestation. */
  "signed_at_timestamp": string;
  /** Full attestation text, e.g., 'I have made full and complete disclosure of all my assets, debts, income, and financial interests, and to the best of my knowledge nothing material has been omitted.' */
  "attestation_text": string;
};
  /** Inventory of financial disclosure documents provided by spouse 1. */
  "disclosure_documents_provided": Array<DisclosureItem>;
  /** Valuation methods used for each significant asset disclosed by spouse 1. */
  "valuation_methodology": Array<{
  /** Identifier of the asset being valued. */
  "asset_id": string;
  /** Valuation method (e.g., market appraisal, book value, actuarial valuation, CRA assessment). */
  "method_used": string;
  /** Basis or standard of value applied. */
  "basis": string;
  /** Name and credentials of the qualified appraiser, or null if no appraiser was used. */
  "qualified_appraiser_if_applicable"?: string | null;
}>;
  /** Spouse 2's acknowledgment regarding spouse 1's disclosure. */
  "non_disclosure_acknowledgment_by_other_spouse": {
  /** Whether spouse 2 confirms they are not aware of undisclosed material assets or debts of spouse 1. */
  "confirmed": boolean;
  /** Full acknowledgment text, e.g., 'I acknowledge that I am not aware of any undisclosed material asset or debt of the other spouse.' */
  "attestation_text": string;
};
};
  "spouse_2": {
  /** Attestation of full and complete financial disclosure by spouse 2. */
  "disclosure_complete_attestation": {
  /** Whether spouse 2 confirms disclosure is complete. */
  "confirmed": boolean;
  /** Timestamp of the attestation. */
  "signed_at_timestamp": string;
  /** Full attestation text. */
  "attestation_text": string;
};
  /** Inventory of financial disclosure documents provided by spouse 2. */
  "disclosure_documents_provided": Array<DisclosureItem>;
  /** Valuation methods used for each significant asset disclosed by spouse 2. */
  "valuation_methodology": Array<{
  /** Identifier of the asset being valued. */
  "asset_id": string;
  /** Valuation method. */
  "method_used": string;
  /** Basis or standard of value applied. */
  "basis": string;
  /** Name and credentials of the qualified appraiser, or null. */
  "qualified_appraiser_if_applicable"?: string | null;
}>;
  /** Spouse 1's acknowledgment regarding spouse 2's disclosure. */
  "non_disclosure_acknowledgment_by_other_spouse": {
  /** Whether spouse 1 confirms they are not aware of undisclosed material assets or debts of spouse 2. */
  "confirmed": boolean;
  /** Full acknowledgment text. */
  "attestation_text": string;
};
};
  /** Text quoting FLA s. 93(3)(a) [VERIFY] consequence: a court may set aside or replace all or part of the agreement if a spouse failed to disclose significant property, debts, or other liabilities existing at the time the agreement was made. */
  "consequences_of_non_disclosure": string;
};
  /** Optional contemporaneous behavioural and capacity evidence to corroborate voluntariness and capacity at each decision node. */
  "behavioural_and_capacity_screen"?: {
  /** Whether an affect-monitoring tool was used during the agreement process. */
  "affect_monitor_used": boolean;
  /** Text of consent attestation from both parties for use of the affect monitor. */
  "affect_monitor_consent_attestation"?: string;
  /** Array of affect snapshots captured at decision nodes. */
  "affect_snapshots"?: Array<BehaviouralScreen>;
  /** Per-spouse capacity attestations at execution. */
  "capacity_attestation_per_spouse": {
  "spouse_1": {
  /** Spouse 1 confirms they were not under the influence of alcohol or drugs. */
  "confirmed_no_intoxication": boolean;
  /** Spouse 1 confirms mental capacity to enter the agreement. */
  "confirmed_mental_capacity_intact": boolean;
  /** Timestamp of the capacity attestation. */
  "signed_timestamp": string;
};
  "spouse_2": {
  /** Spouse 2 confirms they were not under the influence of alcohol or drugs. */
  "confirmed_no_intoxication": boolean;
  /** Spouse 2 confirms mental capacity to enter the agreement. */
  "confirmed_mental_capacity_intact": boolean;
  /** Timestamp of the capacity attestation. */
  "signed_timestamp": string;
};
};
};
  /** Append-only, hash-chained confirmation log recording each party's decision at every node, providing tamper-evident proof of informed consent. */
  "instructions_record": {
  /** SHA-256 hash seeding the chain, generated at session initialization. */
  "chain_genesis_hash": string;
  /** Ordered array of decision-log entries, one per decision node. */
  "entries": Array<{
  /** Zero-indexed sequence number of this entry. */
  "sequence": number;
  /** Unique identifier of the decision node. */
  "node_id": string;
  /** Human-readable title of the decision node. */
  "node_title": string;
  /** Party's decision at this node. */
  "decision": "agree" | "disagree" | "defer" | "factual" | "acknowledged";
  /** Human-readable label for the decision (e.g., 'I agree to waive spousal support'). */
  "decision_label": string;
  /** Optional free-text note recorded by the party at this node. */
  "note"?: string;
  /** ISO 8601 timestamp of the decision. */
  "ts": string;
  /** SHA-256 hash of the previous entry, or chain_genesis_hash for the first entry. */
  "prev_hash": string;
  /** SHA-256 hash of this entry (computed over sequence, node_id, decision, ts, and prev_hash). */
  "hash": string;
  /** Reference to a BehaviouralScreen node_id captured at this decision, or null if affect monitoring was not active. */
  "affect_snapshot_ref"?: string | null;
  /** Whether any stress flag at this node was resolved by additional confirmation. */
  "stress_confirmed": boolean;
}>;
  /** SHA-256 hash of the last entry in the chain, locked at execution and recorded in the signed agreement. */
  "final_hash": string;
};
}
