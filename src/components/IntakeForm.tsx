import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { PillSelect, YesNo } from '@/components/PillSelect'
import { submitApplication, type ApplicationInput } from '@/lib/queries/applications'
import { SITE } from '@/content/site'
import {
  AGREEMENTS,
  BLAST_EXPOSURE,
  BRANCHES,
  CLINIC,
  CONTACT_METHODS,
  CONVENTIONAL_TREATMENTS,
  IMAGING,
  MTBI_COUNTS,
  NOVEL_TREATMENTS,
  SOF_ROLES,
  SYMPTOMS,
} from '@/content/intake'

type Status = 'idle' | 'sending' | 'done' | 'error'

interface State {
  fullName: string
  email: string
  phone: string
  preferredContact: string[]
  city: string
  state: string
  isVeteran: boolean | null
  branches: string[]
  servedSof: boolean | null
  sofRoles: string[]
  sofRolesOther: string
  mtbiDiagnosed: boolean | null
  mtbiEventCount: string[]
  mostRecentMtbi: string
  symptomsOver3Months: boolean | null
  repetitiveBlastDiagnosed: boolean | null
  largeBlastExposure: string[]
  servedAsBreacher: boolean | null
  knockedUnconscious: boolean | null
  symptoms: string[]
  symptomsOther: string
  functionalImpact: string
  novelTreatments: string[]
  novelTreatmentsOther: string
  conventionalTreatments: string[]
  medications: string
  currentlyInTreatment: boolean | null
  currentTreatmentDetail: string
  imagingAccess: string[]
  hasVaRecords: boolean | null
  hasServiceRecords: boolean | null
  agreeInitialEvaluation: boolean
  agreeVisitSchedule: boolean
  agreeNoCostNoCompensation: boolean
  agreePrivacy: boolean
}

const INITIAL: State = {
  fullName: '',
  email: '',
  phone: '',
  preferredContact: [],
  city: '',
  state: '',
  isVeteran: null,
  branches: [],
  servedSof: null,
  sofRoles: [],
  sofRolesOther: '',
  mtbiDiagnosed: null,
  mtbiEventCount: [],
  mostRecentMtbi: '',
  symptomsOver3Months: null,
  repetitiveBlastDiagnosed: null,
  largeBlastExposure: [],
  servedAsBreacher: null,
  knockedUnconscious: null,
  symptoms: [],
  symptomsOther: '',
  functionalImpact: '',
  novelTreatments: [],
  novelTreatmentsOther: '',
  conventionalTreatments: [],
  medications: '',
  currentlyInTreatment: null,
  currentTreatmentDetail: '',
  imagingAccess: [],
  hasVaRecords: null,
  hasServiceRecords: null,
  agreeInitialEvaluation: false,
  agreeVisitSchedule: false,
  agreeNoCostNoCompensation: false,
  agreePrivacy: false,
}

/** Required-field checks. Returns the id of the first section with a problem. */
function validate(s: State): { errors: Record<string, string>; first: string | null } {
  const e: Record<string, string> = {}
  if (!s.fullName.trim()) e.fullName = 'Please enter your full name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email.trim())) e.email = 'Please enter a valid email address.'
  if (s.phone.trim().replace(/\D/g, '').length < 10) e.phone = 'Please enter a phone number.'
  if (s.preferredContact.length === 0) e.preferredContact = 'Choose how you would like us to reach you.'
  if (s.isVeteran === null) e.isVeteran = 'Please answer this question.'
  if (s.isVeteran && s.branches.length === 0) e.branches = 'Select at least one branch.'
  if (s.isVeteran && s.servedSof === null) e.servedSof = 'Please answer this question.'
  if (s.servedSof && s.sofRoles.length === 0) e.sofRoles = 'Select at least one role.'
  if (s.mtbiDiagnosed === null) e.mtbiDiagnosed = 'Please answer this question.'
  if (s.mtbiEventCount.length === 0) e.mtbiEventCount = 'Please give your best estimate.'
  if (s.symptoms.length === 0 && !s.symptomsOther.trim()) e.symptoms = 'Select at least one symptom, or describe yours below.'
  if (!s.agreeInitialEvaluation || !s.agreeVisitSchedule || !s.agreeNoCostNoCompensation || !s.agreePrivacy)
    e.agreements = 'Please review and accept each statement to submit.'
  const order = ['contact', 'service', 'injury', 'symptoms', 'agreements']
  const keyToSection: Record<string, string> = {
    fullName: 'contact', email: 'contact', phone: 'contact', preferredContact: 'contact',
    isVeteran: 'service', branches: 'service', servedSof: 'service', sofRoles: 'service',
    mtbiDiagnosed: 'injury', mtbiEventCount: 'injury',
    symptoms: 'symptoms', agreements: 'agreements',
  }
  const sections = new Set(Object.keys(e).map((k) => keyToSection[k]))
  const first = order.find((sec) => sections.has(sec)) ?? null
  return { errors: e, first }
}

export function IntakeForm() {
  const [s, setS] = useState<State>(INITIAL)
  const [status, setStatus] = useState<Status>('idle')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [failReason, setFailReason] = useState<'offline' | 'rejected'>('offline')

  const set = <K extends keyof State>(key: K, value: State[K]) => setS((prev) => ({ ...prev, [key]: value }))

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    if (new FormData(form).get('website')) {
      setStatus('done')
      return
    }
    const { errors: errs, first } = validate(s)
    setErrors(errs)
    if (first) {
      document.getElementById(`sec-${first}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      return
    }
    setStatus('sending')
    const input: ApplicationInput = {
      fullName: s.fullName,
      email: s.email,
      phone: s.phone,
      preferredContact: s.preferredContact[0] as ApplicationInput['preferredContact'],
      city: s.city,
      state: s.state,
      isVeteran: s.isVeteran === true,
      branches: s.branches,
      servedSof: s.servedSof === true,
      sofRoles: s.servedSof ? s.sofRoles : [],
      sofRolesOther: s.sofRolesOther,
      mtbiDiagnosed: s.mtbiDiagnosed === true,
      mtbiEventCount: s.mtbiEventCount[0],
      mostRecentMtbi: s.mostRecentMtbi,
      symptomsOver3Months: s.symptomsOver3Months,
      repetitiveBlastDiagnosed: s.repetitiveBlastDiagnosed,
      largeBlastExposure: (s.largeBlastExposure[0] as ApplicationInput['largeBlastExposure']) ?? undefined,
      servedAsBreacher: s.servedAsBreacher,
      knockedUnconscious: s.knockedUnconscious,
      symptoms: s.symptoms,
      symptomsOther: s.symptomsOther,
      functionalImpact: s.functionalImpact,
      novelTreatments: s.novelTreatments,
      novelTreatmentsOther: s.novelTreatmentsOther,
      conventionalTreatments: s.conventionalTreatments,
      medications: s.medications,
      currentlyInTreatment: s.currentlyInTreatment,
      currentTreatmentDetail: s.currentTreatmentDetail,
      imagingAccess: s.imagingAccess,
      hasVaRecords: s.hasVaRecords,
      hasServiceRecords: s.hasServiceRecords,
      agreeInitialEvaluation: s.agreeInitialEvaluation,
      agreeVisitSchedule: s.agreeVisitSchedule,
      agreeNoCostNoCompensation: s.agreeNoCostNoCompensation,
      agreePrivacy: s.agreePrivacy,
    }
    const result = await submitApplication(input)
    if (result.ok) {
      setStatus('done')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      setFailReason(result.reason)
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div className="intake-done" role="status">
        <p className="eyebrow">Application Received</p>
        <h2 className="display-sm">Thank you, {s.fullName.split(' ')[0] || 'and welcome'}.</h2>
        <p className="lead">
          Your application for the Phase 1 pilot has been received. The research team
          personally reviews every application and will reach out by{' '}
          {s.preferredContact[0] === 'text' ? 'text' : s.preferredContact[0] === 'phone' ? 'phone' : 'email'}{' '}
          with next steps.
        </p>
        <p>
          If you are selected, the first step is an initial consultation and evaluation
          at {CLINIC.name} in {CLINIC.city}. Questions in the meantime? Email{' '}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
        <div className="mt-m">
          <Link to="/" className="btn">
            Return to Homepage
          </Link>
        </div>
      </div>
    )
  }

  const Err = ({ k }: { k: string }) => (errors[k] ? <p className="field-error" role="alert">{errors[k]}</p> : null)

  return (
    <form className="intake" onSubmit={onSubmit} noValidate>
      {/* ---------------------------------------------------------------- */}
      <section className="intake-section" id="sec-contact" aria-labelledby="h-contact">
        <div className="intake-head">
          <span className="intake-step">1</span>
          <h2 id="h-contact">About You</h2>
        </div>
        <div className="frow">
          <label htmlFor="ap-name">Full name *</label>
          <input id="ap-name" type="text" autoComplete="name" value={s.fullName} onChange={(e) => set('fullName', e.target.value)} aria-invalid={!!errors.fullName} />
          <Err k="fullName" />
        </div>
        <div className="f2">
          <div className="frow">
            <label htmlFor="ap-email">Email *</label>
            <input id="ap-email" type="email" autoComplete="email" value={s.email} onChange={(e) => set('email', e.target.value)} aria-invalid={!!errors.email} />
            <Err k="email" />
          </div>
          <div className="frow">
            <label htmlFor="ap-phone">Phone *</label>
            <input id="ap-phone" type="tel" autoComplete="tel" value={s.phone} onChange={(e) => set('phone', e.target.value)} aria-invalid={!!errors.phone} />
            <Err k="phone" />
          </div>
        </div>
        <PillSelect name="preferred_contact" legend="Best way to reach you" required multiple={false} options={CONTACT_METHODS} value={s.preferredContact} onChange={(v) => set('preferredContact', v)} />
        <Err k="preferredContact" />
        <div className="f2">
          <div className="frow">
            <label htmlFor="ap-city">City</label>
            <input id="ap-city" type="text" autoComplete="address-level2" value={s.city} onChange={(e) => set('city', e.target.value)} />
          </div>
          <div className="frow">
            <label htmlFor="ap-state">State</label>
            <input id="ap-state" type="text" autoComplete="address-level1" value={s.state} onChange={(e) => set('state', e.target.value)} />
          </div>
        </div>
        <p className="field-note">
          Phase 1 visits take place at {CLINIC.name} in {CLINIC.city}, Florida, two to three
          times per week — your location helps us understand travel.
        </p>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="intake-section" id="sec-service" aria-labelledby="h-service">
        <div className="intake-head">
          <span className="intake-step">2</span>
          <h2 id="h-service">Military Service</h2>
        </div>
        <YesNo name="is_veteran" legend="Are you a veteran of the U.S. Armed Forces?" required value={s.isVeteran} onChange={(v) => set('isVeteran', v)} />
        <Err k="isVeteran" />
        {s.isVeteran && (
          <>
            <PillSelect name="branches" legend="Branch of service" hint="Select all that apply." required options={BRANCHES} value={s.branches} onChange={(v) => set('branches', v)} />
            <Err k="branches" />
            <YesNo name="served_sof" legend="Did you serve in Special Operations Forces?" required value={s.servedSof} onChange={(v) => set('servedSof', v)} />
            <Err k="servedSof" />
          </>
        )}
        {s.isVeteran && s.servedSof && (
          <>
            <PillSelect name="sof_roles" legend="Special Operations role(s)" hint="Select every role you served in — many operators rotate between units." required options={SOF_ROLES} value={s.sofRoles} onChange={(v) => set('sofRoles', v)} />
            <Err k="sofRoles" />
            {s.sofRoles.includes('other') && (
              <div className="frow">
                <label htmlFor="ap-sof-other">Other role</label>
                <input id="ap-sof-other" type="text" value={s.sofRolesOther} onChange={(e) => set('sofRolesOther', e.target.value)} />
              </div>
            )}
          </>
        )}
        {s.isVeteran === false && (
          <p className="field-note">
            Phase 1 is prioritizing veterans. You are welcome to apply — the study's later
            phases also enroll special operators and athletes — and we will keep your
            application on file.
          </p>
        )}
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="intake-section" id="sec-injury" aria-labelledby="h-injury">
        <div className="intake-head">
          <span className="intake-step">3</span>
          <h2 id="h-injury">Injury History</h2>
        </div>
        <YesNo name="mtbi_diagnosed" legend="Have you been diagnosed with at least one mild traumatic brain injury (mTBI)?" required value={s.mtbiDiagnosed} onChange={(v) => set('mtbiDiagnosed', v)} />
        <Err k="mtbiDiagnosed" />
        <PillSelect name="mtbi_count" legend="Approximately how many mTBI events have you experienced?" hint="Include direct impacts to the head, blast injuries, and whiplash injuries." required multiple={false} options={MTBI_COUNTS} value={s.mtbiEventCount} onChange={(v) => set('mtbiEventCount', v)} />
        <Err k="mtbiEventCount" />
        <div className="frow">
          <label htmlFor="ap-recent">When was your most recent mTBI event?</label>
          <input id="ap-recent" type="text" placeholder="Approximate month and year" value={s.mostRecentMtbi} onChange={(e) => set('mostRecentMtbi', e.target.value)} />
        </div>
        <YesNo name="over_3_months" legend="Have your symptoms persisted for more than three months?" value={s.symptomsOver3Months} onChange={(v) => set('symptomsOver3Months', v)} />
        <YesNo name="repetitive_blast" legend="Have you ever been diagnosed with repetitive blast injury?" value={s.repetitiveBlastDiagnosed} onChange={(v) => set('repetitiveBlastDiagnosed', v)} />
        <PillSelect name="blast_exposure" legend="Have you had a large blast exposure (close proximity to a large explosion)?" multiple={false} options={BLAST_EXPOSURE} value={s.largeBlastExposure} onChange={(v) => set('largeBlastExposure', v)} />
        <YesNo name="breacher" legend="Did you serve as a breacher?" value={s.servedAsBreacher} onChange={(v) => set('servedAsBreacher', v)} />
        <YesNo name="unconscious" legend="Were you ever knocked unconscious during an mTBI event?" value={s.knockedUnconscious} onChange={(v) => set('knockedUnconscious', v)} />
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="intake-section" id="sec-symptoms" aria-labelledby="h-symptoms">
        <div className="intake-head">
          <span className="intake-step">4</span>
          <h2 id="h-symptoms">Symptoms</h2>
        </div>
        <PillSelect name="symptoms" legend="Which of the following have you experienced since your mTBI?" hint="Select everything that applies." required options={SYMPTOMS} value={s.symptoms} onChange={(v) => set('symptoms', v)} />
        <Err k="symptoms" />
        <div className="frow">
          <label htmlFor="ap-sym-other">What other symptoms have you experienced long-term since your mTBI or TBI event?</label>
          <textarea id="ap-sym-other" value={s.symptomsOther} onChange={(e) => set('symptomsOther', e.target.value)} />
        </div>
        <div className="frow">
          <label htmlFor="ap-impact">
            How have these long-term symptoms affected the way you function, work, or engage with others? What restrictions have they caused?
          </label>
          <textarea id="ap-impact" rows={5} value={s.functionalImpact} onChange={(e) => set('functionalImpact', e.target.value)} />
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="intake-section" id="sec-treatment" aria-labelledby="h-treatment">
        <div className="intake-head">
          <span className="intake-step">5</span>
          <h2 id="h-treatment">Treatment History</h2>
        </div>
        <PillSelect name="novel_treatments" legend="Which of these treatments have you tried for your mTBI symptoms?" hint="Select all that apply." options={NOVEL_TREATMENTS} value={s.novelTreatments} onChange={(v) => set('novelTreatments', v)} />
        {s.novelTreatments.includes('other') && (
          <div className="frow">
            <label htmlFor="ap-novel-other">Other treatments you have tried specifically for mTBI-type symptoms</label>
            <textarea id="ap-novel-other" value={s.novelTreatmentsOther} onChange={(e) => set('novelTreatmentsOther', e.target.value)} />
          </div>
        )}
        <PillSelect name="conventional" legend="What conventional care have you already received?" hint="Select all that apply." options={CONVENTIONAL_TREATMENTS} value={s.conventionalTreatments} onChange={(v) => set('conventionalTreatments', v)} />
        <div className="frow">
          <label htmlFor="ap-meds">Medications you take or have taken for symptom relief</label>
          <textarea id="ap-meds" value={s.medications} onChange={(e) => set('medications', e.target.value)} />
        </div>
        <YesNo name="in_treatment" legend="Are you currently receiving treatment for these symptoms?" value={s.currentlyInTreatment} onChange={(v) => set('currentlyInTreatment', v)} />
        {s.currentlyInTreatment && (
          <div className="frow">
            <label htmlFor="ap-current">What treatment are you currently receiving?</label>
            <textarea id="ap-current" value={s.currentTreatmentDetail} onChange={(e) => set('currentTreatmentDetail', e.target.value)} />
          </div>
        )}
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="intake-section" id="sec-records" aria-labelledby="h-records">
        <div className="intake-head">
          <span className="intake-step">6</span>
          <h2 id="h-records">Imaging &amp; Records</h2>
        </div>
        <PillSelect name="imaging" legend="Do you have access to any brain imaging?" hint="Select all that you could provide." options={IMAGING} value={s.imagingAccess} onChange={(v) => set('imagingAccess', v)} />
        <YesNo name="va_records" legend="Do you have access to your VA records?" value={s.hasVaRecords} onChange={(v) => set('hasVaRecords', v)} />
        <YesNo name="service_records" legend="Do you have access to your service records?" value={s.hasServiceRecords} onChange={(v) => set('hasServiceRecords', v)} />
      </section>

      {/* ---------------------------------------------------------------- */}
      <section className="intake-section" id="sec-agreements" aria-labelledby="h-agreements">
        <div className="intake-head">
          <span className="intake-step">7</span>
          <h2 id="h-agreements">Participation Agreements</h2>
        </div>
        <p className="field-note">Please read each statement and confirm that you understand and agree.</p>
        {(
          [
            ['agreeInitialEvaluation', AGREEMENTS.initialEvaluation],
            ['agreeVisitSchedule', AGREEMENTS.visitSchedule],
            ['agreeNoCostNoCompensation', AGREEMENTS.noCostNoCompensation],
            ['agreePrivacy', AGREEMENTS.privacy],
          ] as const
        ).map(([key, text]) => (
          <label key={key} className={`agree${s[key] ? ' on' : ''}`}>
            <input type="checkbox" checked={s[key]} onChange={(e) => set(key, e.target.checked)} />
            <span>{text}</span>
          </label>
        ))}
        <Err k="agreements" />
      </section>

      <div className="hp" aria-hidden="true">
        <label htmlFor="ap-website">Website</label>
        <input id="ap-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === 'error' && (
        <p className="form-error" role="alert">
          {failReason === 'rejected'
            ? 'Something in the form could not be saved. Please check your answers and try again, or email us at '
            : 'We could not reach our server. Please check your connection and try again, or email us at '}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
        </p>
      )}

      <div className="intake-submit">
        <button className="btn btn-block" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Submitting…' : 'Submit My Application'}
        </button>
        <p className="reg-note">
          Your information is stored securely and reviewed only by the research team.
        </p>
      </div>
    </form>
  )
}
