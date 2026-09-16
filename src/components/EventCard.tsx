import { Link } from 'react-router-dom'
import type { EventItem } from '@/content/events'

/**
 * Homepage / listing event card — Option 2 (image on top). The whole card is a
 * link to the event's page. Photo sits above the title so faces read at a
 * glance; a floating date block and an "Invitation Only" pill overlay the image.
 */
export function EventCard({ event }: { event: EventItem }) {
  return (
    <Link to={event.path} className="ev2" aria-label={event.title}>
      <div
        className="ev2-img"
        style={{ backgroundImage: `url('${event.image}')` }}
      >
        <div className="ev2-db">
          <span className="mo">{event.month}</span>
          <span className="dy">{event.day}</span>
        </div>
        {event.invitationOnly && <span className="ev2-inv">Invitation Only</span>}
      </div>
      <div className="ev2-body">
        <p className="ev2-when">
          {event.dateLong} · {event.timeLine}
        </p>
        <h3 className="ev2-title">{event.title}</h3>
        <p className="ev2-sub">{event.cardDesc}</p>
        <p className="ev2-loc">
          {event.venueName} · {event.venueCityLine}
        </p>
      </div>
    </Link>
  )
}
