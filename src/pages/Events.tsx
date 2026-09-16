import type { PageMeta } from '@/seo/types'
import { PageBanner } from '@/components/blocks'
import { EventCard } from '@/components/EventCard'
import { upcomingEvents } from '@/content/events'

export const meta: PageMeta = {
  path: '/events',
  title: 'Events — mTBI Research',
  description:
    'Talks and gatherings on the research reshaping how we understand concussion, brain injury, and warfighter recovery, with the mTBI Keystone Research Study team.',
  updatedAt: '2026-09-16',
  priority: 0.8,
  changefreq: 'weekly',
  ogImage: '/images/events/speakers.jpg',
}

export default function Events() {
  const events = upcomingEvents()

  return (
    <>
      <PageBanner
        eyebrow="Gatherings & Talks"
        title="Events"
        tag="Conversations at the frontier of brain-injury science"
      />

      <section className="section">
        <div className="container">
          {events.length > 0 ? (
            <div className="ev2-grid">
              {events.map((e) => (
                <EventCard key={e.slug} event={e} />
              ))}
            </div>
          ) : (
            <p className="narrow center">
              There are no upcoming events on the calendar right now. Please check back
              soon.
            </p>
          )}
        </div>
      </section>
    </>
  )
}
