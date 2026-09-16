import { useState, type FormEvent } from 'react'
import { submitEventRequest } from '@/lib/queries/events'
import { SITE } from '@/content/site'
import type { EventItem } from '@/content/events'

type Status = 'idle' | 'sending' | 'done' | 'error'

/**
 * Invitation-only "Request to Attend" form. This event has no public
 * registration — most guests are personally invited and RSVP directly. This
 * form is for those exploring the opportunity; every request is vetted by the
 * research team, which is why the connection field matters.
 */
export function RequestToAttendForm({ event }: { event: EventItem }) {
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    if (fd.get('website')) {
      setStatus('done')
      form.reset()
      return
    }
    setStatus('sending')
    const ok = await submitEventRequest({
      eventSlug: event.slug,
      eventTitle: event.title,
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      phone: fd.get('phone') ? String(fd.get('phone')) : undefined,
      organization: fd.get('organization') ? String(fd.get('organization')) : undefined,
      connection: fd.get('connection') ? String(fd.get('connection')) : undefined,
    })
    if (ok) {
      setStatus('done')
      form.reset()
    } else {
      setStatus('error')
    }
  }

  return (
    <aside className="reg-card" aria-labelledby="reg-title">
      <div className="reg-head">
        <span className="ev-invite">Invitation Only</span>
        <h2 className="rh-t" id="reg-title">
          Request to Attend
        </h2>
      </div>
      <div className="reg-body">
        <div className="reg-line">
          <span className="ic" aria-hidden="true">
            ◆
          </span>
          <span>
            <b>{event.dateShort}</b> · {event.timeLine}
          </span>
        </div>
        <div className="reg-line">
          <span className="ic" aria-hidden="true">
            ◆
          </span>
          <span>
            <b>{event.venueName}</b>
            <br />
            {event.venueStreet}, {event.venueCityLine}
          </span>
        </div>

        {status === 'done' ? (
          <p className="reg-intro" style={{ borderTop: 'none' }} role="status">
            Thank you — your request has been received. The research team personally
            reviews every request and will be in touch about attending.
          </p>
        ) : (
          <>
            <p className="reg-intro">
              Seating is limited and by invitation. If you'd like to attend, share a
              little about your connection to the speakers or the work, and we'll be
              in touch.
            </p>
            <form onSubmit={onSubmit}>
              <div className="frow">
                <label htmlFor="er-name">Full Name *</label>
                <input id="er-name" name="name" type="text" required aria-required="true" autoComplete="name" />
              </div>
              <div className="frow">
                <label htmlFor="er-email">Email *</label>
                <input id="er-email" name="email" type="email" required aria-required="true" autoComplete="email" />
              </div>
              <div className="f2">
                <div className="frow">
                  <label htmlFor="er-phone">Phone</label>
                  <input id="er-phone" name="phone" type="tel" autoComplete="tel" />
                </div>
                <div className="frow">
                  <label htmlFor="er-org">Organization</label>
                  <input id="er-org" name="organization" type="text" autoComplete="organization" />
                </div>
              </div>
              <div className="frow">
                <label htmlFor="er-connection">
                  Your Connection to the Speakers or Topic *
                </label>
                <textarea
                  id="er-connection"
                  name="connection"
                  required
                  aria-required="true"
                  placeholder="How you know Dr. Slininger or Cmdr. O'Shea, your interest in the research, or the community you represent."
                />
              </div>
              <div className="hp" aria-hidden="true">
                <label htmlFor="er-website">Website</label>
                <input id="er-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
              </div>
              {status === 'error' && (
                <p className="form-error" role="alert">
                  Something went wrong and your request wasn’t sent. Please try again, or
                  email us at <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
                </p>
              )}
              <button className="btn btn-block" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Request to Attend'}
              </button>
              <p className="reg-note">Requests are reviewed personally by the research team.</p>
            </form>
          </>
        )}
      </div>
    </aside>
  )
}
