/**
 * Sitewide constants — the single source of truth for organization identity,
 * navigation, and footer. Feeds pages, metadata, and structured data alike.
 */

export const SITE = {
  name: 'mTBI Research',
  legalName: 'Advanced Orthogonal Institute',
  /** Production origin. Canonical URLs, sitemap, and OG tags derive from this. */
  origin: 'https://mtbiresearch.com',
  title: 'mTBI Research — The mTBI Keystone Research Study',
  tagline: 'Making the Invisible Wounds Visible',
  description:
    'A clinical research study tracing the persistent symptoms of mild traumatic brain injury to their structural roots at the craniocervical junction — to change how the Department of War and the VA treat it.',
  email: 'info@mtbiresearch.com',
  phone: '(727) 677-0001',
  phoneHref: '+17276770001',
  address: {
    org: 'Advanced Orthogonal Institute',
    street: '7601 Dr. M.L.K. Jr. St. N., Suite E',
    locality: 'St. Petersburg',
    region: 'FL',
    postalCode: '33702',
    country: 'US',
  },
  /** Every profile the brand controls — the entity anchor (schema sameAs). */
  sameAs: [] as string[],
  /** Full four-phase program total. Must match FULL_PROGRAM_TOTAL in phases.ts. */
  fundingGoalUsd: 23_540_662,
} as const

export interface NavChild {
  label: string
  href: string
}
export interface NavItem {
  label: string
  href?: string
  children?: NavChild[]
}

export const NAV: NavItem[] = [
  {
    label: 'About the Research',
    children: [
      { label: 'Study Design', href: '/study-design' },
      { label: 'Research Phases', href: '/research-phases' },
      { label: 'Supporting Research', href: '/supporting-research' },
      { label: 'The Research Team', href: '/research-team' },
    ],
  },
  {
    label: 'Support the Research',
    children: [
      { label: 'Financial Contribution', href: '/support/financial-contribution' },
      { label: 'Research Partnership', href: '/support/research-partnership' },
      { label: 'Organizational Support', href: '/support/organizational-support' },
    ],
  },
  { label: 'Events', href: '/events' },
  { label: 'Blog', href: '/blog' },
  { label: 'Media', href: '/media' },
  { label: 'Refer a Participant', href: '/refer' },
  { label: 'Contact Us', href: '/contact' },
]

export const FOOTER = {
  columns: [
    {
      heading: 'Support Us',
      links: [
        { label: 'Financial Contribution', href: '/support/financial-contribution' },
        { label: 'Research Partnership', href: '/support/research-partnership' },
        { label: 'Organizational Support', href: '/support/organizational-support' },
        { label: 'Refer a Participant', href: '/refer' },
      ],
    },
    {
      heading: 'About the Research',
      links: [
        { label: 'Study Design', href: '/study-design' },
        { label: 'Research Phases', href: '/research-phases' },
        { label: 'Supporting Research', href: '/supporting-research' },
        { label: 'The Research Team', href: '/research-team' },
        { label: 'Events', href: '/events' },
        { label: 'Blog', href: '/blog' },
        { label: 'Media', href: '/media' },
      ],
    },
  ],
  legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Use', href: '/terms' },
  ],
} as const
