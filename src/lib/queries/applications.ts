/**
 * Phase 1 intake submission. Inserts one row into phase1_applications.
 * RLS on that table allows the public to INSERT only — never read — so a
 * successful insert returns no data; we only learn whether it succeeded.
 */
import { supabase } from '@/lib/supabase'
import { AGREEMENTS_VERSION } from '@/content/intake'

export interface ApplicationInput {
  fullName: string
  email: string
  phone: string
  preferredContact: 'email' | 'phone' | 'text'
  city?: string
  state?: string

  isVeteran: boolean
  branches: string[]
  servedSof: boolean
  sofRoles: string[]
  sofRolesOther?: string

  mtbiDiagnosed: boolean
  mtbiEventCount?: string
  mostRecentMtbi?: string
  symptomsOver3Months: boolean | null
  repetitiveBlastDiagnosed: boolean | null
  largeBlastExposure?: 'none' | 'direct' | 'indirect' | 'both'
  servedAsBreacher: boolean | null
  knockedUnconscious: boolean | null

  symptoms: string[]
  symptomsOther?: string
  functionalImpact?: string

  novelTreatments: string[]
  novelTreatmentsOther?: string
  conventionalTreatments: string[]
  medications?: string
  currentlyInTreatment: boolean | null
  currentTreatmentDetail?: string

  imagingAccess: string[]
  hasVaRecords: boolean | null
  hasServiceRecords: boolean | null

  agreeInitialEvaluation: boolean
  agreeVisitSchedule: boolean
  agreeNoCostNoCompensation: boolean
  agreePrivacy: boolean
}

export type SubmitResult = { ok: true } | { ok: false; reason: 'offline' | 'rejected' }

export async function submitApplication(input: ApplicationInput): Promise<SubmitResult> {
  if (!supabase) return { ok: false, reason: 'offline' }
  const clean = (s?: string) => (s && s.trim() ? s.trim() : null)
  try {
    const { error } = await supabase.from('phase1_applications').insert({
      full_name: input.fullName.trim(),
      email: input.email.trim().toLowerCase(),
      phone: input.phone.trim(),
      preferred_contact: input.preferredContact,
      city: clean(input.city),
      state: clean(input.state),

      is_veteran: input.isVeteran,
      branches: input.branches,
      served_sof: input.servedSof,
      sof_roles: input.sofRoles,
      sof_roles_other: clean(input.sofRolesOther),

      mtbi_diagnosed: input.mtbiDiagnosed,
      mtbi_event_count: clean(input.mtbiEventCount),
      most_recent_mtbi: clean(input.mostRecentMtbi),
      symptoms_over_3_months: input.symptomsOver3Months,
      repetitive_blast_diagnosed: input.repetitiveBlastDiagnosed,
      large_blast_exposure: input.largeBlastExposure ?? null,
      served_as_breacher: input.servedAsBreacher,
      knocked_unconscious: input.knockedUnconscious,

      symptoms: input.symptoms,
      symptoms_other: clean(input.symptomsOther),
      functional_impact: clean(input.functionalImpact),

      novel_treatments: input.novelTreatments,
      novel_treatments_other: clean(input.novelTreatmentsOther),
      conventional_treatments: input.conventionalTreatments,
      medications: clean(input.medications),
      currently_in_treatment: input.currentlyInTreatment,
      current_treatment_detail: clean(input.currentTreatmentDetail),

      imaging_access: input.imagingAccess,
      has_va_records: input.hasVaRecords,
      has_service_records: input.hasServiceRecords,

      agree_initial_evaluation: input.agreeInitialEvaluation,
      agree_visit_schedule: input.agreeVisitSchedule,
      agree_no_cost_no_compensation: input.agreeNoCostNoCompensation,
      agree_privacy: input.agreePrivacy,
      agreements_version: AGREEMENTS_VERSION,

      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent.slice(0, 300) : null,
    })
    return error ? { ok: false, reason: 'rejected' } : { ok: true }
  } catch {
    return { ok: false, reason: 'offline' }
  }
}
