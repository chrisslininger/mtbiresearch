import { Link } from 'react-router-dom'
import { PHASES, phaseStatusLabel } from '@/content/phases'

/**
 * The four funded-phase cards. Whole card is a link into that phase's detail
 * page. The current phase is highlighted with its status pill ("Active ·
 * Onboarding" while Phase 1 runs); the rest read "Upcoming".
 */
export function PhaseCards() {
  return (
    <div className="pcards">
      {PHASES.map((p) => (
        <Link
          key={p.number}
          className={`pcard${p.current ? ' is-current' : ''}`}
          to={p.path}
        >
          <div
            className="pc-thumb"
            style={{ backgroundImage: `url('${p.image}')` }}
          >
            <span className="pc-n">{p.number}</span>
          </div>
          <div className="pc-body">
            <span className={`pc-status ${p.current ? 'current' : 'up'}`}>
              {phaseStatusLabel(p)}
            </span>
            <div className="pc-t">{p.name}</div>
            <div className="pc-tag">{p.subtitle}</div>
            <p className="pc-s">{p.cardDesc}</p>
            <span className="pc-go">Explore Phase →</span>
          </div>
        </Link>
      ))}
    </div>
  )
}
