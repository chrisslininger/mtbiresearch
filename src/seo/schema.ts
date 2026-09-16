/**
 * Typed JSON-LD builders. Structured data is generated from the same content
 * that renders the page and emitted as one @graph node — the form AI engines
 * parse most reliably. Never hand-authored per page.
 */
import type { JsonLdNode, PageMeta } from './types'
import { SITE } from '@/content/site'
import { absoluteUrl } from '@/lib/utils'

const ORG_ID = `${SITE.origin}/#organization`
const WEBSITE_ID = `${SITE.origin}/#website`

function organizationNode(): JsonLdNode {
  return {
    '@type': ['Organization', 'MedicalOrganization'],
    '@id': ORG_ID,
    name: SITE.name,
    legalName: SITE.legalName,
    url: SITE.origin,
    email: SITE.email,
    telephone: SITE.phone,
    logo: absoluteUrl('/images/brand/mtbi-logo.png'),
    description: SITE.description,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.locality,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: SITE.address.country,
    },
    ...(SITE.sameAs.length > 0 ? { sameAs: SITE.sameAs } : {}),
  }
}

function websiteNode(): JsonLdNode {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE.origin,
    name: SITE.name,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-US',
  }
}

function webPageNode(meta: PageMeta): JsonLdNode {
  const url = absoluteUrl(meta.path)
  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: meta.title,
    description: meta.description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    ...(meta.updatedAt ? { dateModified: meta.updatedAt } : {}),
    inLanguage: 'en-US',
  }
}

function breadcrumbNode(meta: PageMeta): JsonLdNode {
  const segments = meta.path.split('/').filter(Boolean)
  const items: JsonLdNode[] = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: SITE.origin,
    },
  ]
  let acc = ''
  segments.forEach((seg, i) => {
    acc += `/${seg}`
    items.push({
      '@type': 'ListItem',
      position: i + 2,
      name: seg
        .split('-')
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' '),
      item: absoluteUrl(acc),
    })
  })
  return {
    '@type': 'BreadcrumbList',
    '@id': `${absoluteUrl(meta.path)}#breadcrumb`,
    itemListElement: items,
  }
}

/** Build a FAQPage node from question/answer pairs. */
export function faqNode(faqs: Array<{ q: string; a: string }>): JsonLdNode {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}

/** Build a MedicalWebPage / MedicalStudy node for the study itself. */
export function medicalStudyNode(): JsonLdNode {
  return {
    '@type': 'MedicalStudy',
    '@id': `${SITE.origin}/#study`,
    name: 'The Mild Traumatic Brain Injury Keystone Research Study',
    description:
      'A phased clinical research study investigating the craniocervical junction as a structural root cause of persistent mild traumatic brain injury symptoms in veterans, special operators, and athletes.',
    studySubject: {
      '@type': 'MedicalCondition',
      name: 'Mild Traumatic Brain Injury (mTBI)',
    },
    sponsor: { '@id': ORG_ID },
  }
}

/** Build a schema.org/Event node for an individual event page. */
export function eventNode(event: import('@/content/events').EventItem): JsonLdNode {
  const url = absoluteUrl(event.path)
  // venueCityLine is "Tampa, FL 33611"
  const [locality = '', regionPostal = ''] = event.venueCityLine.split(',').map((s) => s.trim())
  const [region = '', postalCode = ''] = regionPostal.split(/\s+/)
  return {
    '@type': 'Event',
    '@id': `${url}#event`,
    name: event.title,
    description: event.tagline,
    startDate: event.startISO,
    endDate: event.endISO,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    image: absoluteUrl(event.socialImage),
    url,
    isAccessibleForFree: false,
    location: {
      '@type': 'Place',
      name: event.venueName,
      address: {
        '@type': 'PostalAddress',
        streetAddress: event.venueStreet,
        addressLocality: locality,
        addressRegion: region,
        postalCode,
        addressCountry: 'US',
      },
    },
    organizer: { '@id': ORG_ID },
    performer: event.speakers.map((s) => ({
      '@type': 'Person',
      name: s.name,
      description: s.role,
    })),
  }
}

/**
 * Assemble the full @graph for a page: always Organization, WebSite, WebPage,
 * BreadcrumbList, plus any page-specific nodes from meta.schema.
 */
export function buildGraph(meta: PageMeta): string {
  const graph: JsonLdNode[] = [
    organizationNode(),
    websiteNode(),
    webPageNode(meta),
    breadcrumbNode(meta),
    ...(meta.schema ?? []),
  ]
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
}
