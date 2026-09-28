import { Link, useLocation } from 'react-router-dom'
import { PageBanner, LastUpdated } from '@/components/blocks'
import { PHASES, phaseBySlug, phaseStatusLabel, type Phase } from '@/content/phases'
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
        eyebrow={`Research Phase ${phase.number} · ${phaseStatusLabel(phase)}`}
        title={phase.name}
        tag={phase.subtitle}
        image={phase.image}
      />

      {phase.status === 'active' && (
        <section className="phase-active-band">
          <div className="container phase-active-inner">
            <div>
              <p className="pab-eyebrow">
                <span className="pab-dot" aria-hidden="true" /> Research Underway
              </p>
              <h2 className="pab-title">Phase {phase.number} has begun — we are onboarding participants now.</h2>
              <p className="pab-text">
                Veterans living with persistent symptoms after mild traumatic brain injury
                can apply to take part. Care and evaluation are provided at no cost.
              </p>
              {phase.oversight && <p className="pab-irb">{phase.oversight}</p>}
            </div>
            <div className="pab-actions">
              <Link to="/apply" className="btn">
                Apply to Participate
              </Link>
              <Link to="/refer" className="btn btn-ghost-light">
                Refer a Veteran
              </Link>
            </div>
          </div>
        </section>
      )}

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

          {phase.timeline && phase.timeline.length > 0 && (
            <div className="phase-timeline">
              <h2>What happens during Phase {phase.number}</h2>
              <ol className="agenda">
                {phase.timeline.map((step, i) => (
                  <li key={step.title}>
                    <span className="an" aria-hidden="true">{i + 1}</span>
                    <b>{step.title}</b>
                    <span>{step.detail}</span>
                  </li>
                ))}
              </ol>
              {phase.status === 'active' && (
                <div className="center mt-m">
                  <Link to="/apply" className="btn">
                    Apply to Participate in Phase {phase.number}
                  </Link>
                </div>
              )}
            </div>
          )}

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
            <LastUpdated date="2026-09-28" />
          </div>
        </div>
      </section>
    </>
  )
}
