import { useState, type FormEvent } from 'react'
import { submitEventRequest } from '@/lib/queries/events'
import type { EventItem } from '@/content/events'

/**
 * Invitation-only "Request to Attend" form. This event has no public
 * registration — most guests are personally invited and RSVP directly. This
 * form is for those exploring the opportunity; every request is vetted by the
 * research team, which is why the connection field matters.
 */
export function RequestToAttendForm({ event }: { event: EventItem }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending')
    const form = e.currentTarget
    const fd = new FormData(form)
    await submitEventRequest({
      eventSlug: event.slug,
      eventTitle: event.title,
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      phone: fd.get('phone') ? String(fd.get('phone')) : undefined,
      organization: fd.get('organization') ? String(fd.get('organization')) : undefined,
      connection: fd.get('connection') ? String(fd.get('connection')) : undefined,
    })
    setStatus('done')
    form.reset()
  }

  return (
    <aside className="reg-card">
      <div className="reg-head">
        <span className="ev-invite">Invitation Only</span>
        <h3 className="rh-t">Request to Attend</h3>
      </div>
      <div className="reg-body">
        <div className="reg-line">
          <span className="ic" aria-hidden="true">◆</span>
          <span>
            <b>{event.dateShort}</b> · {event.timeLine}
          </span>
        </div>
        <div className="reg-line">
          <span className="ic" aria-hidden="true">◆</span>
          <span>
            <b>{event.venueName}</b>
            <br />
            {event.venueStreet}, {event.venueCityLine}
          </span>
        </div>

        {status === 'done' ? (
          <p className="reg-intro" style={{ borderTop: 'none' }}>
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
                <input id="er-name" name="name" type="text" required />
              </div>
              <div className="frow">
                <label htmlFor="er-email">Email *</label>
                <input id="er-email" name="email" type="email" required />
              </div>
              <div className="f2">
                <div className="frow">
                  <label htmlFor="er-phone">Phone</label>
                  <input id="er-phone" name="phone" type="tel" />
                </div>
                <div className="frow">
                  <label htmlFor="er-org">Organization</label>
                  <input id="er-org" name="organization" type="text" />
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
                  placeholder="How you know Dr. Slininger or Cmdr. O'Shea, your interest in the research, or the community you represent."
                />
              </div>
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
