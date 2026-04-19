import { Link } from 'react-router-dom'
import { formatCompactNumber, formatReadableDate } from '../../utils/formatters'
import {
  getConfidenceBadge,
  getReadinessBadge,
  getRiskBadge,
  getStatusBadge,
} from '../../utils/scoring'
import { Badge } from '../shared/Badge'

export function MarketCard({ market }) {
  const status = getStatusBadge(market.status)
  const readiness = getReadinessBadge(market.dcbReadiness)
  const confidence = getConfidenceBadge(market.confidence)
  const risk = getRiskBadge(market.regulation?.riskLevel)

  return (
    <article className="atlas-panel p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="atlas-eyebrow">{market.region}</p>
          <h3 className="atlas-title mt-2 text-2xl font-semibold text-[#0d1b24]">
            {market.country}
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#35505f]">
            {market.notes}
          </p>
        </div>

        <div className="rounded-[24px] bg-[#f2eadc] px-4 py-3 text-right">
          <p className="text-xs uppercase tracking-[0.18em] text-[#5f6a72]">
            Market score
          </p>
          <p className="atlas-title text-3xl font-semibold text-[#12354a]">
            {market.marketScore ?? '—'}
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <Badge className={status.className}>{status.label}</Badge>
        <Badge className={readiness.className}>{readiness.label}</Badge>
        <Badge className={risk.className}>{risk.label}</Badge>
        <Badge className={confidence.className}>{confidence.label}</Badge>
      </div>

      <div className="mt-6 grid gap-4 text-sm text-[#35505f] sm:grid-cols-3">
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[#6a7881]">
            Subscribers
          </p>
          <p className="mt-2 font-semibold text-[#0d1b24]">
            {market.subscriberEstimate
              ? formatCompactNumber(market.subscriberEstimate)
              : 'Pending research'}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[#6a7881]">
            Operators
          </p>
          <p className="mt-2 font-semibold text-[#0d1b24]">
            {market.operators.length > 0 ? market.operators.length : 'Pending'}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[#6a7881]">
            Updated
          </p>
          <p className="mt-2 font-semibold text-[#0d1b24]">
            {formatReadableDate(market.lastUpdated)}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#12354a]/10 pt-5">
        <p className="text-sm text-[#35505f]">
          {market.commercialNote}
        </p>
        <Link className="atlas-button-primary" to={`/markets/${market.slug}`}>
          View full profile
        </Link>
      </div>
    </article>
  )
}
