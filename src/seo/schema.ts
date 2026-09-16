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

/**
 * Human names for intermediate path segments that have their own page. Segments
 * not listed here (e.g. "/support") have no landing page and are skipped so the
 * breadcrumb never links to a 404.
 */
const CRUMB_NAMES: Record<string, string> = {
  '/study-design': 'Study Design',
  '/research-phases': 'Research Phases',
  '/supporting-research': 'Supporting Research',
  '/research-team': 'The Research Team',
  '/events': 'Events',
  '/blog': 'Blog',
  '/media': 'Media',
  '/refer': 'Refer a Participant',
  '/contact': 'Contact Us',
  '/support/financial-contribution': 'Financial Contribution',
  '/support/research-partnership': 'Research Partnership',
  '/support/organizational-support': 'Organizational Support',
  '/privacy': 'Privacy Policy',
  '/terms': 'Terms of Use',
}

function breadcrumbNode(meta: PageMeta): JsonLdNode {
  const segments = meta.path.split('/').filter(Boolean)
  const items: JsonLdNode[] = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE.origin },
  ]
  let acc = ''
  segments.forEach((seg, i) => {
    acc += `/${seg}`
    const isLeaf = i === segments.length - 1
    const known = CRUMB_NAMES[acc]
    // Skip intermediate segments with no page of their own.
    if (!isLeaf && !known) return
    const name = isLeaf ? meta.title.split(' — ')[0] : known
    items.push({
      '@type': 'ListItem',
      position: items.length + 1,
      name,
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
    name: 'The mTBI Keystone Research Study',
    alternateName: 'The Mild Traumatic Brain Injury Keystone Research Study',
    description:
      'A phased clinical research study investigating the craniocervical junction as a structural root cause of persistent mild traumatic brain injury symptoms in veterans, special operators, and athletes.',
    status: 'https://schema.org/Recruiting',
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
    // Invitation-only, not ticketed — there is no price to attend.
    isAccessibleForFree: true,
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

/** Build a schema.org/BlogPosting node for an individual post. */
export function blogPostingNode(post: import('@/content/blog').Post): JsonLdNode {
  const url = absoluteUrl(post.path)
  return {
    '@type': 'BlogPosting',
    '@id': `${url}#post`,
    headline: post.title,
    description: post.excerpt,
    url,
    mainEntityOfPage: { '@id': `${url}#webpage` },
    datePublished: post.date,
    dateModified: post.updatedAt ?? post.date,
    author: { '@type': post.authorType ?? 'Organization', name: post.author },
    publisher: { '@id': ORG_ID },
    image: absoluteUrl(post.image),
    articleSection: post.categoryLabel,
    keywords: post.tags.join(', '),
    inLanguage: 'en-US',
    isPartOf: { '@id': `${SITE.origin}/blog#blog` },
  }
}

/** Build a schema.org/Blog node for the listing page. */
export function blogNode(posts: import('@/content/blog').Post[]): JsonLdNode {
  return {
    '@type': 'Blog',
    '@id': `${SITE.origin}/blog#blog`,
    name: `${SITE.name} Blog`,
    description: 'Articles and research reviews from the mTBI Keystone Research Study team.',
    url: absoluteUrl('/blog'),
    publisher: { '@id': ORG_ID },
    blogPost: posts.map((p) => ({ '@id': `${absoluteUrl(p.path)}#post` })),
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
