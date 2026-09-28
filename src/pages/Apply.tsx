import { Link } from 'react-router-dom'
import type { PageMeta } from '@/seo/types'
import { PageBanner } from '@/components/blocks'
import { IntakeForm } from '@/components/IntakeForm'
import { CLINIC, IRB_STATEMENT } from '@/content/intake'

export const meta: PageMeta = {
  path: '/apply',
  title: 'Apply for the Phase 1 Pilot — mTBI Research',
  description:
    'Phase 1 of the mTBI Keystone Research Study is now onboarding participants. Veterans with persistent mTBI symptoms can apply to the pilot at no cost.',
  updatedAt: '2026-09-28',
  priority: 0.9,
  changefreq: 'weekly',
  ogImage: '/images/phases/phase-1.jpg',
}

export default function Apply() {
  return (
    <>
      <PageBanner
        eyebrow="Phase 1 · Now Onboarding"
        title="Apply to Participate"
        tag="The Phase 1 pilot is enrolling veterans living with persistent mTBI symptoms"
        image="/images/phases/phase-1.jpg"
      />

      <section className="section">
        <div className="container">
          <div className="apply-grid">
            <div className="apply-intro prose">
              <p className="lead">
                Phase 1 is a fifty-participant pilot testing whether precise, image-guided
                care at the craniocervical junction — where the skull meets the upper
                cervical spine — produces measurable improvement in the symptoms that
                persist after mild traumatic brain injury.
              </p>
              <h2>What to expect</h2>
              <ul className="apply-list">
                <li>
                  <b>Application review.</b> The research team personally reviews every
                  application. Veterans who served in Special Operations are prioritized
                  for the first cohort.
                </li>
                <li>
                  <b>Initial consultation and evaluation</b> (about 1½ hours) at{' '}
                  {CLINIC.name} in {CLINIC.city} to confirm you are a candidate for care.
                </li>
                <li>
                  <b>An eight-week care period</b> — visits two to three times per week —
                  with assessments and imaging at the start and again at the end.
                </li>
                <li>
                  <b>No cost, no compensation.</b> Care and evaluation are provided free
                  of charge; there is no payment for participating.
                </li>
              </ul>
              <p className="irb">{IRB_STATEMENT}</p>
              <p className="field-note">
                This form takes about ten minutes. Questions before you apply? See the{' '}
                <Link to="/research-phases/ccj-feasibility-pilot">Phase 1 overview</Link> or{' '}
                <Link to="/contact">contact the research team</Link>.
              </p>
            </div>

            <div className="apply-form">
              <IntakeForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
