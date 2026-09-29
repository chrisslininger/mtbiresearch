import { Link, useLocation } from 'react-router-dom'
import type { PageMeta } from '@/seo/types'
import { CLINIC } from '@/content/intake'
import { SITE } from '@/content/site'

export const meta: PageMeta = {
  path: '/apply/thank-you',
  title: 'Application Received — mTBI Research',
  description:
    'Thank you for applying to the Phase 1 pilot of the mTBI Keystone Research Study. A member of the research team will reach out to coordinate next steps.',
  updatedAt: '2026-09-29',
  noindex: true,
  priority: 0.1,
}

/** Passed by the intake form via router state so the page can greet by name. */
export interface ThankYouState {
  firstName?: string
  contact?: 'email' | 'phone' | 'text'
}

const CONTACT_WORD: Record<NonNullable<ThankYouState['contact']>, string> = {
  email: 'email',
  phone: 'phone',
  text: 'text message',
}

export default function ApplyThankYou() {
  const { state } = useLocation() as { state: ThankYouState | null }
  const firstName = state?.firstName?.trim()
  const contact = state?.contact ? CONTACT_WORD[state.contact] : null

  return (
    <>
      <section className="ty-hero">
        <div className="container center">
          <div className="ty-check" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12.5l5 5L20 6.5" />
            </svg>
          </div>
          <p className="eyebrow">Application Received</p>
          <h1 className="display">{firstName ? `Thank you, ${firstName}.` : 'Thank you.'}</h1>
          <p className="ty-sub">
            We have received your application for the Phase 1 pilot. One of our team
            members will reach out to you{contact ? ` by ${contact}` : ''} to coordinate
            next steps.
          </p>
          <p className="ty-email">
            Please continue to check your email — including your spam or junk folder — for
            messages from the research team.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <p className="eyebrow center">What happens next</p>
          <ol className="ty-steps">
            <li>
              <span className="ty-n" aria-hidden="true">1</span>
              <div>
                <b>Your application is reviewed.</b>
                <span>
                  Every application is read personally by the research team. Veterans who
                  served in Special Operations are prioritized for the pilot.
                </span>
              </div>
            </li>
            <li>
              <span className="ty-n" aria-hidden="true">2</span>
              <div>
                <b>A team member reaches out.</b>
                <span>
                  We will contact you{contact ? ` by ${contact}` : ' using the method you chose'} to
                  confirm your details, answer your questions, and coordinate the next step.
                </span>
              </div>
            </li>
            <li>
              <span className="ty-n" aria-hidden="true">3</span>
              <div>
                <b>Initial consultation and evaluation.</b>
                <span>
                  If you are selected, your first visit is an initial consultation and
                  evaluation at {CLINIC.name} in {CLINIC.city}, lasting about an hour and a
                  half, to confirm that you are a candidate for care.
                </span>
              </div>
            </li>
          </ol>

          <div className="ty-actions">
            <Link to="/" className="btn">
              Return to Homepage
            </Link>
            <Link to="/research-phases/phase-1" className="btn btn-outline">
              About Phase 1
            </Link>
          </div>

          <p className="ty-help">
            Questions in the meantime? Email{' '}
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. Submitting an application does
            not guarantee selection.
          </p>
        </div>
      </section>
    </>
  )
}
