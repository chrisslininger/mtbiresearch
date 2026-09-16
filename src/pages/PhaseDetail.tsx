import { Link, useLocation } from 'react-router-dom'
import { PageBanner, LastUpdated } from '@/components/blocks'
import { PHASES, phaseBySlug, type Phase } from '@/content/phases'
import NotFound from '@/pages/NotFound'
import { usePhaseTotals, phaseTotal } from '@/lib/queries/funding'
import { formatUsd } from '@/lib/utils'

function PhaseFunding({ phase }: { phase: Phase }) {
  const { data: totals } = usePhaseTotals()
  const { goal, raised } = phaseTotal(totals, phase.number)
  const pct = goal > 0 ? Math.round((raised / goal) * 100) : 0
  const width = raised === 0 ? 0 : Math.max(1.5, pct)

  const covered =
    phase.costPerParticipant && phase.participantTarget
      ? Math.min(phase.participantTarget, Math.floor(raised / phase.costPerParticipant))
      : null

  return (
    <div className="phase-fund">
      <div className="pf-head">
        <span className="pf-raised">{formatUsd(raised)}</span>
        <span className="pf-goal">
          raised of {formatUsd(goal)} goal · {pct}%
        </span>
      </div>
      <div
        className="fund-bar"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={goal}
        aria-valuenow={raised}
        aria-label={`Phase ${phase.number} funding`}
      >
        <div className="fund-fill" style={{ width: `${width}%` }} />
      </div>

      {covered !== null && phase.participantTarget && phase.costPerParticipant && (
        <div className="pf-impact">
          <div className="pf-impact-num">
            {covered} <span>of {phase.participantTarget} participants covered</span>
          </div>
          <p className="pf-impact-note">
            About {formatUsd(phase.costPerParticipant)} carries one participant through
            this phase — every gift is measured in lives, not just dollars.
          </p>
        </div>
      )}

      <div className="center" style={{ marginTop: '22px' }}>
        <Link to="/support/financial-contribution" className="btn">
          {phase.current ? `Contribute to Phase ${phase.number}` : `Commit to Phase ${phase.number}`}
        </Link>
      </div>
    </div>
  )
}

export default function PhaseDetail() {
  const { pathname } = useLocation()
  const slug = pathname.split('/').filter(Boolean).pop() ?? ''
  const phase = phaseBySlug(slug)
  if (!phase) return <NotFound />
  const idx = PHASES.findIndex((p) => p.number === phase.number)
  const prev = idx > 0 ? PHASES[idx - 1] : null
  const next = idx < PHASES.length - 1 ? PHASES[idx + 1] : null

  return (
    <>
      <PageBanner
        eyebrow={`Research Phase ${phase.number}${phase.current ? ' · Now Funding' : ''}`}
        title={phase.name}
        tag={phase.subtitle}
        image={phase.image}
      />

      <section className="section-dark section-tight">
        <div className="container narrow">
          <PhaseFunding phase={phase} />
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <dl className="specs">
            {phase.specs.map((s) => (
              <div className="spec" key={s.label}>
                <dt>{s.label}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>

          <div className="prose">
            {phase.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          <div className="p-delivers">
            <h2>{phase.deliversHeading}</h2>
            <p>{phase.delivers}</p>
          </div>

          <p className="p-covers">
            <strong>Your support here covers</strong>
            {phase.covers}
          </p>

          <div className="phase-nav">
            {prev ? (
              <Link to={prev.path} className="phase-nav-link prev">
                ← Phase {prev.number}: {prev.name}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link to={next.path} className="phase-nav-link next">
                Phase {next.number}: {next.name} →
              </Link>
            ) : (
              <span />
            )}
          </div>

          <div className="center mt-l">
            <Link to="/research-phases" className="btn btn-outline">
              ← All Research Phases
            </Link>
          </div>
          <div className="center mt-m">
            <LastUpdated date="2026-09-16" />
          </div>
        </div>
      </section>
    </>
  )
}
