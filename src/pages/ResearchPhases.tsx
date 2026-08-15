import { Link } from 'react-router-dom'
import type { PageMeta } from '@/seo/types'
import { PageBanner, LastUpdated } from '@/components/blocks'
import { formatUsd } from '@/lib/utils'

export const meta: PageMeta = {
  path: '/research-phases',
  title: 'Research Phases — mTBI Keystone Research Study',
  description:
    'The mTBI Keystone Study runs in four funded research phases, from the CCJ pilot study through the full randomized controlled trial to publication and policy change.',
  updatedAt: '2026-08-15',
  priority: 0.9,
  changefreq: 'monthly',
}

interface Phase {
  n: number
  name: string
  subtitle: string
  meta: string
  goal: number
  current?: boolean
}

// Editorial phase content, mirroring the funded research phases. Amounts match
// the study's phase budgets. (Provisional figures — confirm before launch.)
const PHASES: Phase[] = [
  {
    n: 1,
    name: 'CCJ Pilot Study',
    subtitle: 'Proving the Signal',
    meta: '50 veterans · single-arm craniocervical care · six months',
    goal: 384_702,
    current: true,
  },
  {
    n: 2,
    name: 'Prep & Preliminary Outcomes',
    subtitle: 'Building the Research Machine and Comparing Results',
    meta: '20 veterans · two treatment lanes · full imaging suite · six months',
    goal: 2_050_070,
  },
  {
    n: 3,
    name: 'The Full Randomized Controlled Trial',
    subtitle: 'Measuring What Really Drives Root-Cause Recovery',
    meta: '380 additional veterans (400 total) · three arms · eighteen months',
    goal: 20_069_695,
  },
  {
    n: 4,
    name: 'Analytics & Publication',
    subtitle: 'Turning Evidence into Change',
    meta: 'final analysis and multi-journal dissemination · six months',
    goal: 1_036_195,
  },
]

export default function ResearchPhases() {
  return (
    <>
      <PageBanner
        eyebrow="About the Research"
        title="Research Phases"
        tag="Four funded phases between here and policy change"
        image="/images/banners/research-phases.jpg"
      />
      <section className="section">
        <div className="container">
          <p className="narrow center prose">
            This study does not end with data collection. It ends with policy change.
            Each phase is independently scoped and funded, so the science can begin now
            and scale as the coalition grows. We are currently in Phase 1.
          </p>

          <div className="mt-l">
            {PHASES.map((p) => (
              <div className="tier" key={p.n}>
                <h4>
                  Phase {p.n}: {p.name}
                  {p.current ? ' — Current' : ''}
                </h4>
                <p style={{ marginBottom: '6px' }}>{p.subtitle}</p>
                <p style={{ marginBottom: '6px' }}>{p.meta}</p>
                <p className="amt">Phase goal: {formatUsd(p.goal)}</p>
              </div>
            ))}
          </div>

          <div className="center mt-l">
            <Link to="/support/financial-contribution" className="btn">
              Fund the Current Phase
            </Link>
          </div>
          <div className="center mt-m">
            <LastUpdated date="2026-08-15" />
          </div>
        </div>
      </section>
    </>
  )
}
