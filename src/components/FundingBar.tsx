import { useFundingTotals } from '@/lib/queries/funding'
import { formatUsd } from '@/lib/utils'

/**
 * Live funding progress. Server-renders the static fallback ($20M goal, $0
 * raised, 0% bar) so the number is present in raw HTML for crawlers; the client
 * hydrates and updates from the public_funding_totals RPC. Because raised is
 * currently $0, the static and live values match — no layout shift.
 */
export function FundingBar() {
  const { data } = useFundingTotals()
  const goal = data.goal || 1
  const pct = Math.max(0, Math.min(100, (data.raised / goal) * 100))
  // A hair of visible fill even at 0% reads as an intentional track, not a bug.
  const width = data.raised === 0 ? 0 : Math.max(1, pct)

  return (
    <div className="narrow mt-l">
      <div
        className="fund-bar"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={data.goal}
        aria-valuenow={data.raised}
        aria-label="Funding raised to date"
      >
        <div className="fund-fill" style={{ width: `${width}%` }} />
      </div>
      <p className="fund-legend">
        Funding Goal: {formatUsd(data.goal)}&nbsp;&nbsp;&nbsp;Raised to Date:{' '}
        {formatUsd(data.raised)}
      </p>
    </div>
  )
}
