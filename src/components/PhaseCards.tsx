import { Link } from 'react-router-dom'
import { PHASES } from '@/content/phases'

/**
 * The four funded-phase cards. Whole card is a link into that phase's detail
 * page. The current phase is highlighted with a "Now Funding" pill; the rest
 * read "Upcoming". Recovered from the approved SD-preview design.
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
              {p.current ? 'Now Funding' : 'Upcoming'}
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
