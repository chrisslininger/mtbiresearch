/**
 * Events — single source of truth for the Events listing, individual event
 * pages, the homepage featured card, and each event's structured data.
 */

export interface Speaker {
  name: string
  role: string
  bio: string
  photo: string
  initials: string
}

export interface AgendaItem {
  title: string
  detail: string
}

export interface EventItem {
  slug: string
  path: string
  /** Full event title. */
  title: string
  /** Short line under the title. */
  tagline: string
  /** Card description (shorter). */
  cardDesc: string
  invitationOnly: boolean
  /** ISO start / end for schema + display. */
  startISO: string
  endISO: string
  /** Display strings. */
  dateLong: string // "Wednesday, October 14, 2026"
  dateShort: string // "Oct 14, 2026"
  month: string // "Oct"
  day: string // "14"
  year: string // "2026"
  timeLine: string // "6:00–7:00 PM · networking to 8:30"
  timeDetail: string // "6:00–7:00 PM talk\nNetworking 7:00–8:30 PM"
  venueName: string // "The Stovall House · Hunt Room"
  venueStreet: string
  venueCityLine: string // "Tampa, FL 33611"
  /** Full-bleed banner + card photo. */
  image: string
  /** 1200x630 social share image. */
  socialImage: string
  /** Intro paragraphs (lead first). */
  body: string[]
  agenda: AgendaItem[]
  topics: string[]
  speakers: Speaker[]
  networkingNote: string
  updatedAt: string
}

/**
 * Add an event object here to publish it. The Events page, homepage card,
 * event detail route, sitemap and structured data all read from this list.
 * Past events drop off the listings automatically (see upcomingEvents).
 */
export const EVENTS: EventItem[] = []

export function eventBySlug(slug: string): EventItem | undefined {
  return EVENTS.find((e) => e.slug === slug)
}

/** Upcoming events, soonest first. */
export function upcomingEvents(): EventItem[] {
  const now = Date.now()
  return EVENTS.filter((e) => new Date(e.endISO).getTime() >= now).sort(
    (a, b) => new Date(a.startISO).getTime() - new Date(b.startISO).getTime(),
  )
}
