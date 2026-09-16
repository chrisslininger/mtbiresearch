/**
 * THE ROUTE MANIFEST — one array, four consumers: client routing, the
 * prerenderer, the sitemap generator, and the build-time renderer. Adding a
 * route here adds it everywhere. Never duplicate this list.
 */
import type { ComponentType } from 'react'
import type { PageMeta } from '@/seo/types'
import { PHASES } from '@/content/phases'
import { EVENTS } from '@/content/events'
import { eventNode } from '@/seo/schema'

import Home, { meta as homeMeta } from '@/pages/Home'
import StudyDesign, { meta as studyDesignMeta } from '@/pages/StudyDesign'
import ResearchPhases, { meta as researchPhasesMeta } from '@/pages/ResearchPhases'
import PhaseDetail from '@/pages/PhaseDetail'
import SupportingResearch, { meta as supportingResearchMeta } from '@/pages/SupportingResearch'
import ResearchTeam, { meta as researchTeamMeta } from '@/pages/ResearchTeam'
import Events, { meta as eventsMeta } from '@/pages/Events'
import EventDetail from '@/pages/EventDetail'
import Fund, { meta as fundMeta } from '@/pages/Fund'
import Partnership, { meta as partnershipMeta } from '@/pages/Partnership'
import Organizational, { meta as organizationalMeta } from '@/pages/Organizational'
import Refer, { meta as referMeta } from '@/pages/Refer'
import Media, { meta as mediaMeta } from '@/pages/Media'
import Contact, { meta as contactMeta } from '@/pages/Contact'
import Privacy, { meta as privacyMeta } from '@/pages/Privacy'
import Terms, { meta as termsMeta } from '@/pages/Terms'
import NotFound, { meta as notFoundMeta } from '@/pages/NotFound'

export interface RouteEntry {
  path: string
  Component: ComponentType
  meta: PageMeta
  /** Public routes are rendered to static HTML at build time. */
  prerender: boolean
}

const phaseRoutes: RouteEntry[] = PHASES.map((p) => ({
  path: p.path,
  Component: PhaseDetail,
  prerender: true,
  meta: {
    path: p.path,
    title: `Phase ${p.number}: ${p.name} — mTBI Research`,
    description: `${p.subtitle}. ${p.cardDesc} Phase goal ${p.goal.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}.`,
    updatedAt: '2026-08-15',
    priority: p.current ? 0.9 : 0.7,
    changefreq: 'weekly',
    ogImage: p.image,
  },
}))

const eventRoutes: RouteEntry[] = EVENTS.map((e) => ({
  path: e.path,
  Component: EventDetail,
  prerender: true,
  meta: {
    path: e.path,
    title: `${e.title} — mTBI Research`,
    description: e.cardDesc,
    updatedAt: e.updatedAt,
    priority: 0.7,
    changefreq: 'weekly',
    ogImage: e.socialImage,
    schema: [eventNode(e)],
  },
}))

export const routes: RouteEntry[] = [
  { path: '/', Component: Home, meta: homeMeta, prerender: true },
  { path: '/study-design', Component: StudyDesign, meta: studyDesignMeta, prerender: true },
  { path: '/research-phases', Component: ResearchPhases, meta: researchPhasesMeta, prerender: true },
  ...phaseRoutes,
  { path: '/supporting-research', Component: SupportingResearch, meta: supportingResearchMeta, prerender: true },
  { path: '/research-team', Component: ResearchTeam, meta: researchTeamMeta, prerender: true },
  { path: '/events', Component: Events, meta: eventsMeta, prerender: true },
  ...eventRoutes,
  { path: '/support/financial-contribution', Component: Fund, meta: fundMeta, prerender: true },
  { path: '/support/research-partnership', Component: Partnership, meta: partnershipMeta, prerender: true },
  { path: '/support/organizational-support', Component: Organizational, meta: organizationalMeta, prerender: true },
  { path: '/refer', Component: Refer, meta: referMeta, prerender: true },
  { path: '/media', Component: Media, meta: mediaMeta, prerender: true },
  { path: '/contact', Component: Contact, meta: contactMeta, prerender: true },
  { path: '/privacy', Component: Privacy, meta: privacyMeta, prerender: true },
  { path: '/terms', Component: Terms, meta: termsMeta, prerender: true },
  { path: '*', Component: NotFound, meta: notFoundMeta, prerender: false },
]

/** Metadata lookup by path, used during client-side navigation. */
export function metaForPath(pathname: string): PageMeta {
  const found = routes.find((r) => r.path === pathname)
  return found?.meta ?? notFoundMeta
}
