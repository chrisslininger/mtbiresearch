/**
 * Phase 1 intake — single source of truth for every option list on the
 * /apply form. Values (the `value` keys) are what gets stored in Supabase
 * (phase1_applications); labels are what applicants see. Change wording here
 * and the form, the database, and the team notification all stay in sync.
 */

export interface Option {
  value: string
  label: string
  hint?: string
}

/** Bump this whenever the agreement wording below changes. Stored with each application. */
export const AGREEMENTS_VERSION = '2026-09-28'

export const CLINIC = {
  name: 'Cerebral Chiropractic Center',
  shortName: 'Cerebral',
  city: 'St. Petersburg',
  address: '7601 Dr. M.L.K. Jr. St. N., Suite E, St. Petersburg, FL 33702',
} as const

export const IRB_STATEMENT =
  'This study is conducted under the oversight of the Institutional Review Board (IRB) of Sherman College of Chiropractic.'

export const BRANCHES: Option[] = [
  { value: 'army', label: 'Army' },
  { value: 'navy', label: 'Navy' },
  { value: 'marine_corps', label: 'Marine Corps' },
  { value: 'air_force', label: 'Air Force' },
  { value: 'space_force', label: 'Space Force' },
  { value: 'coast_guard', label: 'Coast Guard' },
  { value: 'national_guard', label: 'National Guard' },
  { value: 'reserves', label: 'Reserves' },
]

/** Special Operations Forces roles. Multi-select — operators often rotate. */
export const SOF_ROLES: Option[] = [
  { value: 'army_special_forces', label: 'Army Special Forces (Green Berets)' },
  { value: 'army_rangers', label: '75th Ranger Regiment' },
  { value: 'delta_cag', label: 'Delta Force / CAG (Tier 1)' },
  { value: 'army_160th_soar', label: '160th SOAR (Night Stalkers)' },
  { value: 'navy_seal', label: 'Navy SEAL' },
  { value: 'devgru', label: 'DEVGRU / SEAL Team Six (Tier 1)' },
  { value: 'swcc', label: 'SWCC (Special Warfare Combatant-craft Crewman)' },
  { value: 'navy_eod', label: 'Navy EOD' },
  { value: 'marsoc_raider', label: 'Marine Raider (MARSOC)' },
  { value: 'marine_recon', label: 'Marine Force Recon / Reconnaissance' },
  { value: 'af_cct', label: 'Air Force Combat Controller (CCT)' },
  { value: 'af_pj', label: 'Air Force Pararescue (PJ)' },
  { value: 'af_sr', label: 'Air Force Special Reconnaissance (SR)' },
  { value: 'af_tacp', label: 'Air Force TACP / Special Tactics' },
  { value: 'army_eod_sof', label: 'Army EOD attached to SOF' },
  { value: 'cg_msrt_dsf', label: 'Coast Guard MSRT / DSF' },
  { value: 'sof_enabler', label: 'SOF enabler / support' },
  { value: 'other', label: 'Other (describe below)' },
]

export const MTBI_COUNTS: Option[] = [
  { value: '1', label: '1' },
  { value: '2-3', label: '2–3' },
  { value: '4-6', label: '4–6' },
  { value: '7-10', label: '7–10' },
  { value: '10+', label: 'More than 10' },
]

export const BLAST_EXPOSURE: Option[] = [
  { value: 'none', label: 'No' },
  { value: 'direct', label: 'Direct', hint: 'shockwave directly to the body' },
  { value: 'indirect', label: 'Indirect', hint: 'blast exposure through a vehicle' },
  { value: 'both', label: 'Both direct and indirect' },
]

/** Long-term post-mTBI symptoms. Order is roughly head → cognition → mood → body. */
export const SYMPTOMS: Option[] = [
  { value: 'headaches', label: 'Headaches' },
  { value: 'migraines', label: 'Migraines' },
  { value: 'head_pressure', label: 'Pressure in the head' },
  { value: 'facial_pain', label: 'Facial pain' },
  { value: 'jaw_pain', label: 'Jaw pain' },
  { value: 'neck_pain', label: 'Neck pain' },
  { value: 'dizziness', label: 'Dizziness' },
  { value: 'vertigo', label: 'Vertigo' },
  { value: 'balance', label: 'Balance problems' },
  { value: 'motion_sensitivity', label: 'Motion sensitivity' },
  { value: 'nausea', label: 'Nausea' },
  { value: 'oculomotor', label: 'Eye-movement (oculomotor) issues' },
  { value: 'nystagmus', label: 'Nystagmus' },
  { value: 'blurred_double_vision', label: 'Blurred or double vision' },
  { value: 'light_sensitivity', label: 'Light sensitivity' },
  { value: 'screens_reading', label: 'Trouble with screens or reading' },
  { value: 'tinnitus', label: 'Ringing in the ears' },
  { value: 'hearing_loss', label: 'Hearing loss' },
  { value: 'sound_sensitivity', label: 'Sound sensitivity' },
  { value: 'brain_fog', label: 'Brain fog' },
  { value: 'cognitive_decline', label: 'Cognitive decline' },
  { value: 'memory', label: 'Memory problems' },
  { value: 'concentration', label: 'Difficulty concentrating' },
  { value: 'word_finding', label: 'Word-finding difficulty' },
  { value: 'slowed_thinking', label: 'Slowed thinking' },
  { value: 'sleep', label: 'Sleep disturbances' },
  { value: 'fatigue', label: 'Fatigue' },
  { value: 'ptsd', label: 'PTSD' },
  { value: 'fight_or_flight', label: 'Fight-or-flight symptoms' },
  { value: 'anxiety', label: 'Anxiety' },
  { value: 'depression', label: 'Depression' },
  { value: 'irritability', label: 'Irritability or anger' },
  { value: 'mood_swings', label: 'Mood swings' },
  { value: 'numbness_tingling', label: 'Numbness or tingling' },
  { value: 'dysautonomia', label: 'Heart-rate or blood-pressure swings' },
  { value: 'temperature', label: 'Temperature dysregulation' },
]

/** Novel / emerging treatments the applicant may already have tried. */
export const NOVEL_TREATMENTS: Option[] = [
  { value: 'hbot', label: 'Hyperbaric oxygen therapy (HBOT)' },
  { value: 'photobiomodulation', label: 'Photobiomodulation (light therapy)' },
  { value: 'tms', label: 'Transcranial magnetic stimulation (TMS)' },
  { value: 'ketamine', label: 'Ketamine treatment' },
  { value: 'psychedelic', label: 'Ayahuasca, ibogaine, psilocybin, or other psychedelic therapy' },
  { value: 'stellate_ganglion_block', label: 'Stellate ganglion block (SGB)' },
  { value: 'stem_cell', label: 'Stem cell therapy' },
  { value: 'vestibular_rehab', label: 'Vestibular rehabilitation' },
  { value: 'vision_therapy', label: 'Vision therapy' },
  { value: 'neurofeedback', label: 'Neurofeedback / qEEG training' },
  { value: 'upper_cervical', label: 'Upper cervical / craniocervical care' },
  { value: 'hormone_peptide', label: 'Hormone or peptide therapy' },
  { value: 'iv_nutritional', label: 'IV or nutritional therapy' },
  { value: 'other', label: 'Other (describe below)' },
]

/** Conventional care already received. */
export const CONVENTIONAL_TREATMENTS: Option[] = [
  { value: 'mental_health', label: 'Mental health counseling or therapy' },
  { value: 'psychiatric_medication', label: 'Psychiatric medication' },
  { value: 'pain_medication', label: 'Pain medication' },
  { value: 'migraine_medication', label: 'Migraine medication' },
  { value: 'sleep_medication', label: 'Sleep medication' },
  { value: 'physical_therapy', label: 'Physical therapy' },
  { value: 'occupational_therapy', label: 'Occupational therapy' },
  { value: 'speech_cognitive_therapy', label: 'Speech or cognitive therapy' },
  { value: 'va_tbi_program', label: 'VA TBI / polytrauma program' },
  { value: 'none', label: 'None of these' },
]

/** Brain imaging the applicant can access. */
export const IMAGING: Option[] = [
  { value: 'mri', label: 'MRI' },
  { value: 'fmri', label: 'Functional MRI (fMRI)' },
  { value: 'dti', label: 'DTI' },
  { value: 'swi', label: 'SWI' },
  { value: 'spect', label: 'SPECT' },
  { value: 'ct', label: 'CT' },
  { value: 'other', label: 'Other brain imaging' },
  { value: 'none', label: 'None' },
]

export const CONTACT_METHODS: Option[] = [
  { value: 'email', label: 'Email' },
  { value: 'phone', label: 'Phone call' },
  { value: 'text', label: 'Text message' },
]

/** The three participation agreements + privacy acknowledgment. Wording is versioned. */
export const AGREEMENTS = {
  initialEvaluation:
    `If I am selected for the Phase 1 pilot, I understand I will first complete an initial consultation and evaluation at ${CLINIC.name} in ${CLINIC.city} to confirm that I am a candidate for care. This initial visit takes approximately one and a half hours.`,
  visitSchedule:
    `I understand that participation requires being seen at ${CLINIC.name} in ${CLINIC.city} two to three times per week for an eight-week period, and I am able to commit to that schedule.`,
  noCostNoCompensation:
    'I understand that participation is provided at no cost to me, and that there is no compensation for taking part. I agree to complete both the initial and the final consultation, evaluation, assessments, and imaging.',
  privacy:
    'I understand that the information I submit is health information, that it will be stored securely and reviewed only by the research team for the purpose of screening and enrollment, and that submitting this form does not guarantee selection.',
} as const
