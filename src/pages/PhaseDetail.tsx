import { Link, useLocation } from 'react-router-dom'
import { PageBanner, LastUpdated } from '@/components/blocks'
import { PHASES, phaseBySlug, phaseStatusLabel, type Phase } from '@/content/phases'
import NotFound from '@/pages/NotFound'
import { usePhaseTotals, phaseTotal } from '@/lib/queries/funding'
import { formatUsd } from '@/lib/utils'

/**
 * Funding numbers for a phase. `raised` is cash received (from the database);
 * `inKind` is donated care/facilities shown as its own bar segment and never
 * added to the cash goal. Covered participants = those already carried by
 * in-kind care + those the cash raised so far can carry, where each additional
 * participant costs an equal share of the cash goal.
 */
function useCovered(phase: Phase) {
  const { data: totals } = usePhaseTotals()
  const { goal, raised } = phaseTotal(totals, phase.number)
  const inKind = phase.inKindUsd ?? 0
  const inKindN = phase.inKindParticipants ?? 0
  let covered: number | null = null
  if (phase.participantTarget) {
    const remaining = phase.participantTarget - inKindN
    const perParticipant =
      phase.costPerParticipant ?? (remaining > 0 && goal > 0 ? goal / remaining : null)
    if (perParticipant) {
      covered = Math.min(phase.participantTarget, inKindN + Math.floor(raised / perParticipant))
    }
  }
  return { goal, raised, inKind, inKindN, covered }
}

function PhaseFunding({ phase }: { phase: Phase }) {
  const { goal, raised, inKind, inKindN, covered } = useCovered(phase)
  const pct = goal > 0 ? Math.round((raised / goal) * 100) : 0
  const cashW = raised === 0 ? 0 : Math.max(1.5, Math.min(100, (raised / goal) * 100))
  const inKindW = inKind > 0 && goal > 0 ? Math.min(100 - cashW, (inKind / goal) * 100) : 0

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
        aria-label={`Phase ${phase.number} funding: ${formatUsd(raised)} raised of ${formatUsd(goal)}${inKind ? `, plus ${formatUsd(inKind)} donated in kind` : ''}`}
      >
        <div className="fund-fill" style={{ width: `${cashW}%` }} />
        {inKindW > 0 && (
          <div
            className="fund-fill fund-fill-inkind"
            style={{ width: `${inKindW}%` }}
            title={`${formatUsd(inKind)} donated in kind`}
          />
        )}
      </div>
      {inKind > 0 && (
        <div className="pf-legend">
          <span className="pf-key pf-key-cash">{formatUsd(raised)} raised</span>
          <span className="pf-key pf-key-inkind">{formatUsd(inKind)} donated in kind</span>
        </div>
      )}

      {covered !== null && phase.participantTarget && (
        <div className="pf-impact">
          <div className="pf-impact-num">
            {covered} <span>of {phase.participantTarget} participants covered</span>
          </div>
          <p className="pf-impact-note">
            {inKindN > 0
              ? `${inKindN} participants are already covered by care donated in kind. Every gift toward the ${formatUsd(goal)} goal carries the next veteran through the study.`
              : 'Every gift is measured in lives, not just dollars.'}
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

function PhaseNav({ phase }: { phase: Phase }) {
  const idx = PHASES.findIndex((p) => p.number === phase.number)
  const prev = idx > 0 ? PHASES[idx - 1] : null
  const next = idx < PHASES.length - 1 ? PHASES[idx + 1] : null
  return (
    <>
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
        <LastUpdated date="2026-09-29" />
      </div>
    </>
  )
}

function Timeline({ phase }: { phase: Phase }) {
  if (!phase.timeline || phase.timeline.length === 0) return null
  return (
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
  )
}

/* ------------------------------------------------------------------------ */
/* Participant-first layout (Phase 1 while onboarding)                       */
/* ------------------------------------------------------------------------ */
function ParticipantPhase({ phase }: { phase: Phase }) {
  const pc = phase.participant!
  const { covered } = useCovered(phase)

  return (
    <>
      <PageBanner
        eyebrow={`Research Phase ${phase.number} · ${phaseStatusLabel(phase)}`}
        title={pc.bannerTitle}
        tag={pc.bannerTag}
        image={pc.bannerImage ?? phase.image}
        imageMobile={pc.bannerImageMobile}
        imagePosition={pc.bannerImagePosition}
        tall
      />

      <section className="phase-active-band">
        <div className="container phase-active-inner">
          <div>
            <p className="pab-eyebrow">
              <span className="pab-dot" aria-hidden="true" /> Now Onboarding
            </p>
            <h2 className="pab-title">Phase {phase.number} has begun — we are onboarding veterans now.</h2>
            <p className="pab-text">
              Veterans living with persistent symptoms after mild traumatic brain injury can
              apply to take part. Care, evaluations, and imaging are provided at no cost.
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

      {/* Key facts — participants first, with the covered count kept at the top */}
      <section className="pp-facts">
        <div className="container">
          <dl className="pp-factgrid">
            {pc.keyFacts.map((f) => (
              <div className="pp-fact" key={f.label}>
                <dt>{f.value}</dt>
                <dd>{f.label}</dd>
              </div>
            ))}
            {covered !== null && phase.participantTarget && (
              <div className="pp-fact pp-fact-covered">
                <dt>
                  {covered}
                  <small> of {phase.participantTarget}</small>
                </dt>
                <dd>Participants covered by funding so far</dd>
              </div>
            )}
          </dl>
        </div>
      </section>

      {/* The unseen injury */}
      <section className="section">
        <div className="container narrow">
          <p className="eyebrow center">{pc.eyebrow}</p>
          <h2 className="display-sm center pp-headline">{pc.headline}</h2>
          <p className="lead pp-intro">{pc.intro}</p>
        </div>
      </section>

      {/* Evidence stats */}
      <section className="pp-stats">
        <div className="container">
          <div className="pp-statgrid">
            {pc.stats.map((s) => (
              <div className="pp-stat" key={s.value}>
                <div className="pp-stat-n">{s.value}</div>
                <div className="pp-stat-l">{s.label}</div>
              </div>
            ))}
          </div>
          <p className="pp-sources">{pc.statsSources}</p>
        </div>
      </section>

      {/* Three pillars */}
      <section className="section">
        <div className="container">
          <div className="pp-pillars">
            {pc.pillars.map((p) => (
              <div className="pp-pillar" key={p.title}>
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What happens + who can apply */}
      <section className="section pp-alt">
        <div className="container narrow">
          <Timeline phase={phase} />

          <div className="pp-eligibility">
            <h2>{pc.eligibilityHeading}</h2>
            <ul className="pp-elig-list">
              {pc.eligibility.map((e) => (
                <li key={e}>{e}</li>
              ))}
            </ul>
            <div className="pp-elig-actions">
              <Link to="/apply" className="btn">
                Apply to Participate
              </Link>
              <Link to="/refer" className="btn btn-outline">
                Refer a Veteran
              </Link>
            </div>
          </div>

          <p className="pp-conducted">{pc.conductedBy}</p>
        </div>
      </section>

      {/* Principal investigator */}
      <section className="section">
        <div className="container narrow">
          <div className="pp-pi">
            <p className="eyebrow">Your principal investigator</p>
            <h2 className="pp-pi-name">{pc.investigator.name}</h2>
            <p className="pp-pi-title">{pc.investigator.title}</p>
            <p className="pp-pi-bio">{pc.investigator.bio}</p>
            <Link to="/research-team" className="pp-pi-link">
              Meet the full research team →
            </Link>
          </div>
        </div>
      </section>

      {/* Funding — kept, but at the end */}
      <section className="section-dark section pp-funding">
        <div className="container narrow">
          <p className="eyebrow center">Support Phase {phase.number}</p>
          <h2 className="display-sm center">{pc.fundingHeadline}</h2>
          <p className="lead pp-fund-intro">{pc.fundingIntro}</p>
          <PhaseFunding phase={phase} />
          <h3 className="pp-dollars-h">Where every dollar goes</h3>
          <p className="pp-dollars-lead">
            The {formatUsd(phase.goal)} is not an estimate. It is built from the ground up,
            line by line, around fifty veterans and the care required to treat them well.
            The largest share of every gift goes directly into that care.
          </p>
          <ul className="pp-dollars">
            {pc.whereDollarsGo.map((d) => (
              <li key={d.title}>
                <b>{d.title}</b> — {d.detail}
              </li>
            ))}
          </ul>
          <p className="pp-overhead">{pc.overheadNote}</p>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container narrow">
          <PhaseNav phase={phase} />
        </div>
      </section>
    </>
  )
}

/* ------------------------------------------------------------------------ */
/* Standard layout (funding-first) for the other phases                      */
/* ------------------------------------------------------------------------ */
function StandardPhase({ phase }: { phase: Phase }) {
  return (
    <>
      <PageBanner
        eyebrow={`Research Phase ${phase.number} · ${phaseStatusLabel(phase)}`}
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

          <Timeline phase={phase} />

          <div className="p-delivers">
            <h2>{phase.deliversHeading}</h2>
            <p>{phase.delivers}</p>
          </div>

          <p className="p-covers">
            <strong>Your support here covers</strong>
            {phase.covers}
          </p>

          <PhaseNav phase={phase} />
        </div>
      </section>
    </>
  )
}

export default function PhaseDetail() {
  const { pathname } = useLocation()
  const slug = pathname.split('/').filter(Boolean).pop() ?? ''
  const phase = phaseBySlug(slug)
  if (!phase) return <NotFound />
  return phase.participant ? <ParticipantPhase phase={phase} /> : <StandardPhase phase={phase} />
}
