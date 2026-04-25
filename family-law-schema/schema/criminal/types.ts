// Auto-generated from instructions.schema.json
// Do not edit by hand. Re-run working/json-to-ts.mjs to regenerate.

export type CollateralSub = {
  /** True if this category of collateral consequence applies to the accused. */
  "applicable": boolean;
  /** True if counsel explained this category to the accused. */
  "explained": boolean;
  /** True if the accused acknowledges the consequence. */
  "acknowledged": boolean;
  /** Verbatim attestation as recorded in the audit log. */
  "attestation_text": string;
};

export type HashChainEntry = {
  /** 1-based sequence index. */
  "sequence": number;
  /** Identifier of the confirmation node. */
  "node_id": string;
  /** Human-readable title of the node. */
  "node_title": string;
  /** Decision recorded for this node. */
  "decision": "agree" | "disagree" | "defer" | "factual" | "acknowledged";
  /** Display-friendly decision label. */
  "decision_label"?: string;
  /** Free-text note (required if decision == disagree). */
  "note"?: string;
  /** ISO 8601 timestamp. */
  "ts": string;
  /** Hash of the previous entry, or GENESIS for the first. */
  "prev_hash": string;
  /** SHA-256 hex digest of this entry. */
  "hash": string;
  /** True if this entry was committed under an elevated-stress override (family-law variant only; default false in criminal). */
  "stress_confirmed"?: boolean;
  /** Optional reference to a behavioural-snapshot record, or null. */
  "affect_snapshot_ref"?: string | null;
};

export interface CriminalGuiltyPleaInstructions {
  /** Identifies the court matter for which plea instructions are recorded. */
  "matter": {
  /** Level of court where plea will be entered. */
  "court_level": "Provincial Court" | "Superior Court of Justice" | "Supreme Court of British Columbia";
  /** Province of jurisdiction. */
  "province": "BC" | "ON";
  /** Court registry or courthouse name. */
  "registry_or_courthouse"?: string;
  /** Information or indictment file number. */
  "information_indictment_number": string;
  /** Date the plea is scheduled to be entered. */
  "scheduled_plea_date": string;
  /** Name of the presiding judge or justice if known. */
  "presiding_judicial_officer"?: string | null;
};
  /** Identifying and status information for the accused person. */
  "accused": {
  /** Full legal name as it appears on the Information or Indictment. */
  "full_legal_name": string;
  /** Date of birth of the accused. */
  "date_of_birth": string;
  /** Citizenship or immigration status, relevant to IRPA s. 36 collateral consequences. */
  "citizenship_immigration_status": "Canadian citizen" | "permanent resident" | "foreign national" | "refugee claimant" | "unknown";
  /** Preferred language of the accused (relevant to s. 530 language rights). */
  "preferred_language": string;
  /** Whether a court interpreter is required. */
  "interpreter_required": boolean;
  /** Fitness to instruct counsel. [VERIFY] s. 672.22 Criminal Code (presumption of fitness). */
  "capacity_status": "capable" | "capacity_question_raised" | "capable_per_s_672_22";
};
  /** Identifying information for defence counsel on record. */
  "counsel": {
  /** Full name of counsel. */
  "name": string;
  /** Law firm name, if applicable. */
  "firm"?: string | null;
  /** LSBC or LSO licence number. */
  "law_society_number": string;
  /** Governing law society. */
  "law_society": "LSBC" | "LSO";
  /** Whether counsel acts as counsel of record or designated agent. */
  "role": "defence" | "agent";
  /** Date counsel was retained. */
  "date_retained": string;
  /** Whether retainer covers full representation or is limited in scope. */
  "retainer_scope": "full" | "limited";
  /** Professional email address of counsel. */
  "email"?: string;
};
  /** Array of each count on the Information or Indictment to which instructions pertain. */
  "charges": Array<{
  /** Count number on the Information or Indictment. */
  "count_number": number;
  /** Statutory section (e.g. 'CC s. 267(a)'). */
  "criminal_code_section": string;
  /** Plain-language description of the offence. */
  "offence_description": string;
  /** Mode of trial election or Crown election on hybrid offences. */
  "election": "summary" | "indictable" | "hybrid_proceeded_summary" | "hybrid_proceeded_indictable" | "not_applicable";
  /** Statutory maximum sentence for the elected mode. */
  "maximum_sentence": string;
  /** Mandatory minimum sentence, if any, or null. */
  "mandatory_minimum"?: string | null;
  /** Plea to be entered on this count. */
  "plea": "guilty" | "not_guilty";
}>;
  /** Factual basis for the plea as required by s. 606(1.1) [VERIFY]. */
  "agreed_facts": {
  /** Text of the agreed or anticipated facts. */
  "narrative": string;
  /** Reference ID or URI to an attached document, if any. */
  "attached_file_ref"?: string | null;
  /** Source of the factual basis. */
  "source": "Crown_brief" | "agreed_statement" | "viva_voce";
  /** Whether the facts were reviewed with the accused. */
  "reviewed_with_client": boolean;
  /** Date on which the facts were reviewed with the accused. */
  "date_reviewed": string;
};
  /** Client's admission of essential elements for each guilty-plea count. */
  "admission": {
  "per_charge": Array<{
  /** Corresponding count number. */
  "count_number": number;
  /** Whether the accused admits each essential element of the offence. */
  "essential_elements_admitted": boolean;
  /** Client's own-words attestation for this count. */
  "attestation_text": string;
}>;
  /** Aggregate confirmation that the accused admits guilt on all counts to which a guilty plea is entered. */
  "aggregate_confirmation": boolean;
  /** Aggregate attestation statement. */
  "aggregate_attestation_text"?: string;
};
  /** Confirmation that the plea is voluntary per s. 606(1.1)(b) [VERIFY]. */
  "voluntariness": {
  /** Accused confirms the plea is voluntary. */
  "confirmed_voluntary": boolean;
  /** Accused confirms no threats were made to induce the plea. */
  "no_threats": boolean;
  /** No promises or inducements beyond what is recorded in the plea agreement or joint submission. */
  "no_inducement_other_than_on_record": boolean;
  /** Accused confirms they are not impaired by drugs, alcohol, or medication at time of instructions. */
  "no_substance_impairment": boolean;
  /** Free-text voluntariness attestation. */
  "attestation_text": string;
  /** Timestamp of voluntariness confirmation. */
  "signed_at": string;
};
  /** Accused's acknowledgment of immediate consequences of a guilty plea. */
  "consequences_acknowledged": {
  /** Understands a guilty plea results in a conviction (unless a discharge is granted). */
  "conviction_understood": boolean;
  /** Understands a sentence will be imposed. */
  "sentence_will_follow": boolean;
  /** Understands that a conviction (not a discharge) results in a criminal record. */
  "criminal_record_understood": boolean;
  /** Attestation text for consequences acknowledgment. */
  "attestation_text": string;
};
  /** Acknowledgment that the sentencing court is not bound by a joint submission; R v Anthony-Cook, 2016 SCC 43 test explained. */
  "court_not_bound_acknowledged": {
  /** Understands the court may depart from a joint submission. */
  "joint_submission_understood": boolean;
  /** Counsel explained the public-interest test from R v Anthony-Cook, 2016 SCC 43. */
  "anthony_cook_test_explained": boolean;
  /** Attestation for court-not-bound acknowledgment. */
  "attestation_text": string;
};
  /** Enumeration of Charter and procedural trial rights waived by entering a guilty plea. */
  "trial_rights_waived": {
  "waivers": Array<{
  /** Identifier for the specific right. [VERIFY] s. 672.11 for fitness inquiry. */
  "right_name": "presumption_of_innocence" | "Crown_burden_of_proof_beyond_reasonable_doubt" | "right_to_cross_examine" | "right_to_call_defence_evidence" | "right_to_silence" | "forum_choice_judge_alone_or_jury" | "fitness_inquiry_s_672_11" | "language_rights_s_530";
  /** Whether this right was explained to the accused. */
  "explained": boolean;
  /** Whether the accused knowingly waives this right. */
  "waived": boolean;
  /** Attestation for waiver of this specific right. */
  "attestation_text": string;
}>;
};
  /** Record of the sentencing range and form discussed with the accused. */
  "sentencing_range_discussed": {
  /** Low end of the range discussed (e.g. '6 months probation'). */
  "discussed_low": string;
  /** Mid-range estimate discussed, if applicable. */
  "discussed_mid"?: string | null;
  /** High end of the range discussed. */
  "discussed_high": string;
  /** Forms of sentence discussed. */
  "discussed_form": Array<"custody" | "conditional_sentence" | "probation" | "fine" | "absolute_discharge" | "conditional_discharge" | "suspended_sentence" | "intermittent_sentence">;
  /** Whether a joint submission on sentence has been reached. */
  "is_joint_submission": boolean;
  /** Description of the joint submission, if any. */
  "joint_submission_detail"?: string | null;
  /** Accused acknowledges counsel's range discussion is a prediction, not a guarantee. */
  "prediction_not_guarantee_acknowledged": boolean;
  /** Attestation for sentencing discussion. */
  "attestation_text": string;
};
  /** Collateral consequences discussed and acknowledged, per R v Wong, 2018 SCC 25 duty. */
  "collateral_consequences_acknowledged": {
  /** Immigration consequences under IRPA s. 36 (inadmissibility / deportation). [VERIFY] IRPA s. 36(1) serious criminality, s. 36(2) criminality. */
  "immigration": unknown;
  /** Impact on professional licences, employment, or vulnerable-sector checks. */
  "employment_licensing": CollateralSub;
  "dna_order": {
  /** Whether the offence is a designated offence under s. 487.04 [VERIFY] for DNA order. */
  "designated_offence": boolean;
  /** Primary or secondary designated offence classification. */
  "primary_or_secondary"?: "primary" | "secondary" | null;
  "explained": boolean;
  "acknowledged": boolean;
  "attestation_text"?: string;
};
  "firearms_prohibition": {
  /** Whether a firearms prohibition applies. */
  "applicable": boolean;
  /** Type of prohibition under CC ss. 109 or 110. */
  "prohibition_type"?: "s_109_mandatory" | "s_110_discretionary" | null;
  "explained": boolean;
  "acknowledged": boolean;
  "attestation_text"?: string;
};
  /** Sex Offender Information Registration Act obligations, if designated offence. [VERIFY] SOIRA ss. 490.011 et seq. */
  "soira_registration": CollateralSub;
  /** Impact on ability to travel to the United States (US inadmissibility). */
  "travel_us": CollateralSub;
  /** Driving prohibition under CC s. 320.24 [VERIFY] or provincial legislation. */
  "driving_prohibition": CollateralSub;
  /** Potential family law and child protection service implications. */
  "family_cps_implications": CollateralSub;
};
  /** Acknowledgment of limited appeal rights following a guilty plea. */
  "appeal_rights_acknowledged": {
  /** Counsel explained that appeals from a guilty plea are narrow (R v Taillefer, 2003 SCC 70 [VERIFY]; s. 686(1)(a)(iii)). */
  "appeal_from_plea_limited_explained": boolean;
  /** Counsel explained the right to seek leave to appeal sentence under s. 675(1)(b) [VERIFY]. */
  "sentence_appeal_right_explained": boolean;
  /** Attestation for appeal-rights acknowledgment. */
  "attestation_text": string;
};
  /** Record of alternative dispositions discussed with the accused before guilty-plea instructions. */
  "alternatives_considered": {
  "diversion": {
  /** Whether diversion/alternative measures (s. 717 [VERIFY]) were discussed. */
  "discussed": boolean;
  /** Whether diversion was available in this case. */
  "available": boolean;
  /** Reason diversion was not pursued, if applicable. */
  "why_not_pursued"?: string | null;
};
  "withdrawal": {
  "discussed": boolean;
  "available": boolean;
  "why_not_pursued"?: string | null;
};
  "peace_bond_810": {
  /** Whether a s. 810 peace bond was discussed. */
  "discussed": boolean;
  "available": boolean;
  "why_not_pursued"?: string | null;
};
  "discharge_730_absolute": {
  /** Whether an absolute discharge under s. 730 was discussed. */
  "discussed": boolean;
  "available": boolean;
  "why_not_pursued"?: string | null;
};
  "discharge_730_conditional": {
  /** Whether a conditional discharge under s. 730 was discussed. */
  "discussed": boolean;
  "available": boolean;
  "why_not_pursued"?: string | null;
};
  "trial": {
  /** Whether proceeding to trial was discussed. */
  "discussed": boolean;
  "available": boolean;
  "why_not_pursued"?: string | null;
};
};
  /** The accused's final, confirmed instruction to counsel to enter a guilty plea. */
  "final_instruction_to_plead": {
  /** True if the accused instructs counsel to enter a guilty plea. */
  "instruction_to_plead_guilty": boolean;
  /** Whether instruction covers all guilty-plea counts or is given per count. */
  "scope": "all_guilty_counts" | "per_count";
  /** Per-count instructions if scope is per_count; null otherwise. */
  "per_count_instructions"?: unknown | null;
  /** Date on which the plea is to be entered. */
  "date_of_intended_plea": string;
  /** Final attestation in the accused's own words. */
  "attestation_text": string;
  /** Timestamp of final instruction signature. */
  "signed_at": string;
};
  /** Append-only hash-chain audit log of each confirmation-tree node traversal. */
  "instructions_record": {
  /** Sentinel value for the first entry's prev_hash. */
  "chain_genesis_hash": string;
  "entries": Array<HashChainEntry>;
  /** SHA-256 hex digest of the last entry in the chain; serves as the integrity seal for the full record. */
  "final_hash": string;
};
}
