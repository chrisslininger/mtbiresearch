import { Link } from 'react-router-dom'
import type { PageMeta } from '@/seo/types'
import { PageBanner, LastUpdated } from '@/components/blocks'
import { PhaseCards } from '@/components/PhaseCards'
import { formatUsd } from '@/lib/utils'
import { PHASES, FULL_PROGRAM_TOTAL } from '@/content/phases'
import { faqNode } from '@/seo/schema'

export const meta: PageMeta = {
  path: '/research-phases',
  title: 'Research Phases — mTBI Keystone Research Study',
  description:
    'The mTBI study runs in four independently fundable phases: a CCJ feasibility pilot, a two-lane build-out, the full 400-veteran randomized trial, and publication.',
  updatedAt: '2026-08-15',
  priority: 0.9,
  changefreq: 'monthly',
  schema: [
    faqNode([
      {
        q: 'How is the mTBI study funded and structured?',
        a: 'As four discrete, independently fundable phases. Phase 1 is a 50-veteran craniocervical feasibility pilot ($384,702); Phase 2 builds the full trial apparatus and runs a 20-veteran two-lane comparison ($2,050,070); Phase 3 is the 400-veteran three-arm randomized controlled trial ($20,069,695); Phase 4 is analytics and multi-journal publication ($1,036,195). The full program totals $23,540,662.',
      },
      {
        q: 'Why phase the study instead of funding one large trial?',
        a: 'Each phase produces a completable, publishable result that de-risks and scientifically justifies the phase that follows. Funders can anchor to a defined milestone and a known cost rather than a single large commitment, while the scientific integrity of the full 400-participant randomized controlled trial is preserved.',
      },
    ]),
  ],
}

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
            The mTBI Research Study is structured as a sequence of discrete,
            independently fundable phases. Each phase produces a completable,
            publishable result that de-risks and scientifically justifies the phase
            that follows — letting funders anchor to a defined milestone and a known
            cost rather than a single large commitment. Click any phase to see its
            full detail, budget, and funding progress. We are currently in Phase 1.
          </p>

          <div className="mt-l">
            <PhaseCards />
          </div>
        </div>
      </section>

      <section className="section-light section">
        <div className="container narrow">
          <h2 className="display-sm" style={{ marginBottom: '10px' }}>
            The Full Arc of the Work
          </h2>
          <p className="prose">
            Taken together, the four phases represent the same complete body of work a
            single large trial would require — staged so that each step stands on its
            own, produces a real result, and makes the next more certain. A supporter
            may enter at any point along this path.
          </p>
          <table className="program-table">
            <thead>
              <tr>
                <th>Phase</th>
                <th>Scope</th>
                <th className="num">Total</th>
              </tr>
            </thead>
            <tbody>
              {PHASES.map((p) => (
                <tr key={p.number}>
                  <td>
                    <Link to={p.path}>Phase {p.number}</Link>
                  </td>
                  <td>{p.name}</td>
                  <td className="num">{formatUsd(p.goal)}</td>
                </tr>
              ))}
              <tr className="total">
                <td colSpan={2}>Full Program (Phases 1–4)</td>
                <td className="num">{formatUsd(FULL_PROGRAM_TOTAL)}</td>
              </tr>
            </tbody>
          </table>
          <div className="center mt-l">
            <LastUpdated date="2026-08-15" />
          </div>
        </div>
      </section>
    </>
  )
}
