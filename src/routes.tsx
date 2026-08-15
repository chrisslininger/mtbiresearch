/**
 * THE ROUTE MANIFEST — one array, four consumers: client routing, the
 * prerenderer, the sitemap generator, and the build-time renderer. Adding a
 * route here adds it everywhere. Never duplicate this list.
 */
import type { ComponentType } from 'react'
import type { PageMeta } from '@/seo/types'

import Home, { meta as homeMeta } from '@/pages/Home'
import StudyDesign, { meta as studyDesignMeta } from '@/pages/StudyDesign'
import ResearchPhases, { meta as researchPhasesMeta } from '@/pages/ResearchPhases'
import SupportingResearch, { meta as supportingResearchMeta } from '@/pages/SupportingResearch'
import ResearchTeam, { meta as researchTeamMeta } from '@/pages/ResearchTeam'
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

export const routes: RouteEntry[] = [
  { path: '/', Component: Home, meta: homeMeta, prerender: true },
  { path: '/study-design', Component: StudyDesign, meta: studyDesignMeta, prerender: true },
  { path: '/research-phases', Component: ResearchPhases, meta: researchPhasesMeta, prerender: true },
  { path: '/supporting-research', Component: SupportingResearch, meta: supportingResearchMeta, prerender: true },
  { path: '/research-team', Component: ResearchTeam, meta: researchTeamMeta, prerender: true },
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
