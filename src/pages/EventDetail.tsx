import { Link, useLocation } from 'react-router-dom'
import { LastUpdated } from '@/components/blocks'
import { RequestToAttendForm } from '@/components/RequestToAttendForm'
import { EVENTS, eventBySlug } from '@/content/events'

const HERO_SCRIM =
  'linear-gradient(180deg, oklch(0.20 0.009 255 / .20) 0%, oklch(0.20 0.009 255 / .30) 38%, oklch(0.20 0.009 255 / .72) 78%, oklch(0.20 0.009 255 / .94) 100%)'

export default function EventDetail() {
  const { pathname } = useLocation()
  const slug = pathname.split('/').filter(Boolean).pop() ?? ''
  const event = eventBySlug(slug) ?? EVENTS[0]

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
          aria-hidden="true"
          style={{ backgroundImage: `url('${event.image}')` }}
        />
        <div className="container">
          <div className="eb-date">Upcoming Event · {event.dateLong}</div>
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

                <h3>What We'll Cover</h3>
                <ul className="agenda">
                  {event.agenda.map((item, i) => (
                    <li key={i}>
                      <span className="an">{i + 1}</span>
                      <b>{item.title}</b>
                      <span>{item.detail}</span>
                    </li>
                  ))}
                </ul>

                <p className="subhead">Symptoms We'll Discuss</p>
                <ul className="topics">
                  {event.topics.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>

                <h3>Featured Speakers</h3>
                {event.speakers.map((s) => (
                  <div className="speaker" key={s.name}>
                    <div
                      className="sp-photo"
                      aria-hidden="true"
                      style={{ backgroundImage: `url('${s.photo}')` }}
                    >
                      {s.initials}
                    </div>
                    <div>
                      <p className="sp-name">{s.name}</p>
                      <p className="sp-role">{s.role}</p>
                      <p className="sp-bio">{s.bio}</p>
                    </div>
                  </div>
                ))}

                <h3>Location</h3>
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

            <RequestToAttendForm event={event} />
          </div>
        </div>
      </section>
    </>
  )
}
