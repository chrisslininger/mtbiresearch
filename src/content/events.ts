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
  dateLong: string // "Tuesday, October 13, 2026"
  dateShort: string // "Oct 13, 2026"
  month: string // "Oct"
  day: string // "13"
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

export const EVENTS: EventItem[] = [
  {
    slug: 'the-next-frontier-brain-health',
    path: '/events/the-next-frontier-brain-health',
    title: 'The Next Frontier in Brain Health & Warfighter Recovery',
    tagline: 'An evening with Dr. Chris Slininger & Navy SEAL Cmdr. Dan O’Shea (Ret.)',
    cardDesc:
      'Dr. Chris Slininger & Navy SEAL Cmdr. Dan O’Shea (Ret.) on the research reshaping how we understand concussion, recovery, and cognitive performance.',
    invitationOnly: true,
    startISO: '2026-10-13T18:00:00-04:00',
    endISO: '2026-10-13T20:30:00-04:00',
    dateLong: 'Tuesday, October 13, 2026',
    dateShort: 'Oct 13, 2026',
    month: 'Oct',
    day: '13',
    year: '2026',
    timeLine: '6:00–7:00 PM · networking to 8:30',
    timeDetail: '6:00–7:00 PM talk · Networking 7:00–8:30 PM',
    venueName: 'The Stovall House · Hunt Room',
    venueStreet: '4621 Bayshore Boulevard',
    venueCityLine: 'Tampa, FL 33611',
    image: '/images/events/speakers.jpg',
    socialImage: '/images/events/stovall-social.jpg',
    body: [
      'What if some of the lasting effects of brain injury are being driven by something medicine has largely overlooked?',
      'For years, the operators who serve at the highest levels — and the athletes who absorb a lifetime of impacts — have carried home symptoms that never show up on a standard scan. The headaches that outlast every treatment. The fog, the dizziness, the sleeplessness, the anxiety that never fully settles. Too often they are told the damage is permanent, or that the problem lives only in their minds. A growing body of research suggests a different possibility: that a significant share of these symptoms may not come from the brain tissue at all, but from an injury just beneath the skull that has rarely been looked for.',
      'Join Dr. Chris Slininger — Principal Investigator of a large-scale mild traumatic brain injury study — and retired Navy SEAL Commander Dan O’Shea for a candid conversation about the science that could reshape how we understand concussion, cognitive performance, and recovery. Dr. Slininger’s research examines the craniocervical junction, where the skull meets the upper cervical spine, and its influence on the brainstem, cerebral blood flow, and the movement of cerebrospinal fluid — the systems that govern how the brain regulates itself, clears waste, and heals. O’Shea, a former SEAL Team Three task unit commander, has become one of the most respected advocates for bringing this research and care to the special operations community, and brings the operator’s perspective on what these invisible injuries truly cost.',
      'Together, they’ll trace the effort to make invisible brain injuries measurable — with the imaging and objective testing that can finally see them — what the findings could mean for symptoms including brain fog, migraines, dizziness, PTSD, and cognitive decline, and where this rapidly evolving science may lead for warfighters, athletes, and anyone living with the lasting effects of head trauma.',
    ],
    agenda: [
      {
        title: 'The injury medicine has overlooked',
        detail:
          'Why persistent post-concussive symptoms so often outlast standard care — and why a conventional brain scan can read “normal” while a person is still profoundly symptomatic.',
      },
      {
        title: 'The craniocervical junction',
        detail:
          'The neurological, vascular, and fluid-dynamic crossroads between the body and the brain — and what happens when a blast or impact knocks it out of alignment.',
      },
      {
        title: 'From blast and impact to symptoms',
        detail:
          'How disruption at the base of the skull may restrict blood flow, slow the brain’s waste-clearance, and strain the brainstem — driving brain fog, migraines, dizziness, sleep problems, and changes in mood and cognition.',
      },
      {
        title: 'Making the invisible measurable',
        detail:
          'The advanced imaging and objective testing — MRI, SPECT, qEEG, and cone beam CT — the study uses to turn “invisible” injuries into data that medicine and policy cannot ignore.',
      },
      {
        title: 'The warfighter’s fight',
        detail:
          'Why the special operations community sits at the center of this work, Commander O’Shea’s push to bring it to those who served, and what it could mean for the VA and Department of Defense.',
      },
      {
        title: 'Where the science goes next',
        detail:
          'The road from this research to a real shift in the standard of care — and how supporters, clinicians, and advocates can be part of it.',
      },
    ],
    topics: [
      'Concussion & mTBI',
      'Brain fog',
      'Migraines',
      'Dizziness',
      'Sleep disruption',
      'PTSD',
      'Cognitive decline',
      'Cerebral blood flow',
    ],
    speakers: [
      {
        name: 'Dr. Chris Slininger',
        role: 'Principal Investigator · Army Veteran',
        bio: 'Principal Investigator of the mTBI Keystone Research Study, examining the craniocervical junction as a root cause of persistent post-concussive symptoms. A U.S. Army veteran who lived the injury and the recovery this research investigates.',
        photo: '/images/events/slininger.jpg',
        initials: 'CS',
      },
      {
        name: 'Cmdr. Dan O’Shea, USN (Ret.)',
        role: 'Former Navy SEAL · Task Unit Commander',
        bio: 'A former SEAL Team Three task unit commander and a leading advocate for bringing root-cause brain-injury research and care to the special operations community.',
        photo: '/images/events/oshea.jpg',
        initials: 'DO',
      },
    ],
    networkingNote: 'A one- to two-hour networking reception follows the talk.',
    updatedAt: '2026-09-16',
  },
]

export function eventBySlug(slug: string): EventItem | undefined {
  return EVENTS.find((e) => e.slug === slug)
}

/** Upcoming events, soonest first (all events are upcoming for now). */
export function upcomingEvents(): EventItem[] {
  const now = Date.now()
  return EVENTS.filter((e) => new Date(e.endISO).getTime() >= now).sort(
    (a, b) => new Date(a.startISO).getTime() - new Date(b.startISO).getTime(),
  )
}
