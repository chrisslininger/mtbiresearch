import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { LastUpdated } from '@/components/blocks'
import { RequestToAttendForm } from '@/components/RequestToAttendForm'
import { eventBySlug } from '@/content/events'
import NotFound from '@/pages/NotFound'

const HERO_SCRIM =
  'linear-gradient(180deg, oklch(0.20 0.009 255 / .20) 0%, oklch(0.20 0.009 255 / .30) 38%, oklch(0.20 0.009 255 / .72) 78%, oklch(0.20 0.009 255 / .94) 100%)'

export default function EventDetail() {
  const { pathname } = useLocation()
  const slug = pathname.split('/').filter(Boolean).pop() ?? ''
  const event = eventBySlug(slug)
  // Prerendered HTML always shows the "upcoming" state; the past/upcoming switch
  // is applied after hydration so server and client markup match on first paint.
  const [isPast, setIsPast] = useState(false)
  const endISO = event?.endISO ?? ''
  useEffect(() => {
    if (endISO) setIsPast(new Date(endISO).getTime() < Date.now())
  }, [endISO])
  if (!event) return <NotFound />

  return (
    <>
      <section
        className="page-banner ev-photo-hero"
        style={{
          backgroundImage: `${HERO_SCRIM}, url('${event.image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 18%',
        }}
      >
        <div
          className="ev-hero-img"
          role="img"
          aria-label={`${event.speakers.map((s) => s.name).join(' and ')}`}
          style={{ backgroundImage: `url('${event.image}')` }}
        />
        <div className="container">
          <div className="eb-date">
            {isPast ? 'Past Event' : 'Upcoming Event'} · {event.dateLong}
          </div>
          <h1 className="display">{event.title}</h1>
          <p className="tag">{event.tagline}</p>
          <div className="ev-meta">
            <span className="ev-chip">
              <span className="ic" aria-hidden="true">📅</span> {event.dateShort}
            </span>
            <span className="ev-chip">
              <span className="ic" aria-hidden="true">🕕</span> {event.timeLine}
            </span>
            <span className="ev-chip">
              <span className="ic" aria-hidden="true">📍</span> {event.venueName}
            </span>
            {event.invitationOnly && (
              <span className="ev-chip invite">
                <span className="ic" aria-hidden="true">✦</span> By invitation only
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid-ev">
            <div className="ev-main">
              <div className="prose">
                {event.body.map((para, i) => (
                  <p key={i} className={i === 0 ? 'lead' : undefined}>
                    {para}
                  </p>
                ))}

                <h2>What We'll Cover</h2>
                <ol className="agenda">
                  {event.agenda.map((item, i) => (
                    <li key={i}>
                      <span className="an" aria-hidden="true">{i + 1}</span>
                      <b>{item.title}</b>
                      <span>{item.detail}</span>
                    </li>
                  ))}
                </ol>

                <h3 className="subhead">Symptoms We'll Discuss</h3>
                <ul className="topics">
                  {event.topics.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>

                <h2>Featured Speakers</h2>
                {event.speakers.map((s) => (
                  <div className="speaker" key={s.name}>
                    <img className="sp-photo" src={s.photo} alt={s.name} width={92} height={92} />
                    <div>
                      <h3 className="sp-name">{s.name}</h3>
                      <p className="sp-role">{s.role}</p>
                      <p className="sp-bio">{s.bio}</p>
                    </div>
                  </div>
                ))}

                <h2>Location</h2>
                <p>
                  {event.venueName}
                  <br />
                  {event.venueStreet}
                  <br />
                  {event.venueCityLine}
                  <br />
                  <span style={{ color: 'var(--muted)' }}>{event.networkingNote}</span>
                </p>

                <div className="mt-m">
                  <LastUpdated date={event.updatedAt} />
                </div>
                <div className="mt-m">
                  <Link to="/events" className="btn btn-outline">
                    ← All Events
                  </Link>
                </div>
              </div>
            </div>

            {isPast ? (
              <aside className="reg-card">
                <div className="reg-head">
                  <h2 className="rh-t">This Event Has Passed</h2>
                </div>
                <div className="reg-body">
                  <p className="reg-intro" style={{ borderTop: 'none' }}>
                    Thank you to everyone who joined us. See what's coming next on the{' '}
                    <Link to="/events">Events page</Link>.
                  </p>
                </div>
              </aside>
            ) : (
              <RequestToAttendForm event={event} />
            )}
          </div>
        </div>
      </section>
    </>
  )
}
