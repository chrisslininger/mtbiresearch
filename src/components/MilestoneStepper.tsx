import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PHASES } from '@/content/phases'
import { usePhaseTotals, phaseTotal } from '@/lib/queries/funding'
import { formatUsd } from '@/lib/utils'

/**
 * Version A — the Milestone Stepper. The journey line, made clickable, on the
 * dark background. Click any phase to inspect it: funded phases show a full
 * bar, the current phase shows live progress from the database, and future
 * phases invite an early commitment. Recovered from the approved concept.
 */
const CURRENT = PHASES.find((p) => p.current)?.number ?? 1

type State = 'funded' | 'current' | 'future'
function stateOf(sel: number, cur: number): State {
  return sel < cur ? 'funded' : sel === cur ? 'current' : 'future'
}

export function MilestoneStepper() {
  const [sel, setSel] = useState(CURRENT)
  const { data: totals } = usePhaseTotals()

  const phase = PHASES[sel - 1]
  const { goal, raised } = phaseTotal(totals, sel)
  const st = stateOf(sel, CURRENT)
  const pct = goal > 0 ? Math.round((raised / goal) * 100) : 0

  return (
    <div className="fs">
      <div className="stepper" role="tablist" aria-label="Research phases">
        {PHASES.map((p, i) => {
          const cls = ['st']
          if (p.number < CURRENT) cls.push('done')
          if (p.number > CURRENT) cls.push('dim')
          if (p.number === sel) cls.push('sel')
          return (
            <button
              key={p.number}
              type="button"
              className={cls.join(' ')}
              role="tab"
              id={`phase-tab-${p.number}`}
              aria-selected={p.number === sel}
              aria-controls="phase-panel"
              tabIndex={p.number === sel ? 0 : -1}
              onClick={() => setSel(p.number)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') setSel(Math.min(PHASES.length, sel + 1))
                if (e.key === 'ArrowLeft') setSel(Math.max(1, sel - 1))
              }}
            >
              {i < PHASES.length - 1 && <span className="line" aria-hidden="true" />}
              <span className="dot">{p.number}</span>
              <span className="sn">{p.stepperName}</span>
              {p.number === CURRENT && <span className="now">Now Funding</span>}
            </button>
          )
        })}
      </div>

      <div
        className="panel"
        role="tabpanel"
        id="phase-panel"
        aria-labelledby={`phase-tab-${sel}`}
      >
        <div className="p-head">
          <div>
            <div className="p-name">
              Phase {phase.number} · {phase.name}
            </div>
            <div className="p-tag">{phase.subtitle}</div>
            <div className="p-meta">{phase.meta}</div>
          </div>
          {st === 'funded' && <span className="state-pill funded">✓ Fully Funded</span>}
          {st === 'current' && <span className="state-pill current">● Now Funding</span>}
          {st === 'future' && <span className="state-pill future">Upcoming</span>}
        </div>

        <div className="bar">
          <div
            className={`fill ${st === 'funded' ? 'solid' : 'striped'}`}
            style={{
              width: `${st === 'funded' ? 100 : Math.max(pct, raised > 0 ? 1.5 : 0)}%`,
            }}
          />
        </div>

        <div className="legend">
          <div className="raised">
            {formatUsd(st === 'funded' ? goal : raised)}{' '}
            <span className="goal">
              {st === 'future'
                ? 'committed so far'
                : st === 'current'
                  ? `raised · ${pct}%`
                  : 'raised'}
            </span>
          </div>
          <div className="goal">Goal {formatUsd(goal)}</div>
        </div>

        {st === 'funded' && (
          <div className="note">
            Phase {phase.number} is fully funded — thank you to everyone who made it
            possible.
          </div>
        )}

        {st === 'current' && (
          <>
            <div className="fs-actions">
              <Link className="btn" to="/support/financial-contribution">
                Contribute to Phase {phase.number}
              </Link>
              <Link className="btn btn-ghost-light" to={phase.path}>
                See the Details
              </Link>
            </div>
            <div className="note">
              Gifts beyond Phase {phase.number}'s goal carry forward to help launch Phase{' '}
              {Math.min(phase.number + 1, PHASES.length)}.
            </div>
          </>
        )}

        {st === 'future' && (
          <>
            <div className="msg">
              We're currently raising funds for{' '}
              <strong>Phase {CURRENT} · {PHASES[CURRENT - 1].name}</strong>. If you'd like
              to commit early to <strong>Phase {phase.number} · {phase.name}</strong> —{' '}
              {phase.subtitle.toLowerCase()} — we'd love to talk about it.
            </div>
            <div className="fs-actions">
              <Link className="btn" to="/support/financial-contribution">
                Commit to Phase {phase.number}
              </Link>
              <Link className="btn btn-ghost-light" to="/contact">
                Let's Discuss
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
