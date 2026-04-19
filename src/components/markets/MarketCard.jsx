import { Link } from 'react-router-dom'
import { formatCompactNumber, formatReadableDate, titleCase } from '../../utils/formatters'
import {
  getConfidenceBadge,
  getOpportunityBadge,
  getReadinessBadge,
  getResolvedOpportunityLevel,
  getResolvedRiskLevel,
  getRiskBadge,
  getStatusBadge,
} from '../../utils/scoring'
import { Badge } from '../shared/Badge'

const truncate = (value, maxLength) => {
  if (!value || value.length <= maxLength) return value
  return `${value.slice(0, maxLength).trim()}…`
}

export function MarketCard({ market, compact = false }) {
  const status = getStatusBadge(market.status)
  const readiness = getReadinessBadge(market.dcbReadiness)
  const confidence = getConfidenceBadge(market.confidence)
  const risk = getRiskBadge(getResolvedRiskLevel(market))
  const opportunity = getOpportunityBadge(getResolvedOpportunityLevel(market))
  const notes = compact ? truncate(market.notes, 170) : market.notes
  const commercialNote = compact ? truncate(market.commercialNote, 120) : market.commercialNote

  return (
    <article className={`atlas-panel ${compact ? 'p-4 sm:p-5' : 'p-5 sm:p-6'}`}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-3xl">
          <p className="atlas-eyebrow">{market.region}</p>
          <h3 className={`atlas-title mt-2 font-semibold text-[#0d1b24] ${compact ? 'text-xl' : 'text-2xl'}`}>
            {market.country}
          </h3>
          <p className={`mt-3 leading-7 text-[#35505f] ${compact ? 'text-sm' : 'text-sm'}`}>
            {notes}
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
        <Badge className={opportunity.className}>{opportunity.label}</Badge>
        <Badge className={readiness.className}>{readiness.label}</Badge>
        <Badge className={risk.className}>{risk.label}</Badge>
        <Badge className={confidence.className}>{confidence.label}</Badge>
      </div>

      <div className={`mt-6 grid gap-4 text-sm text-[#35505f] ${compact ? 'lg:grid-cols-5' : 'sm:grid-cols-4'}`}>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[#6a7881]">Subscribers</p>
          <p className="mt-2 font-semibold text-[#0d1b24]">
            {market.subscriberEstimate
              ? formatCompactNumber(market.subscriberEstimate)
              : 'Pending research'}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[#6a7881]">Entry path</p>
          <p className="mt-2 font-semibold text-[#0d1b24]">
            {titleCase(market.recommendedEntry)}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[#6a7881]">Operators</p>
          <p className="mt-2 font-semibold text-[#0d1b24]">
            {market.operators.length > 0 ? market.operators.length : 'Pending'}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[#6a7881]">Aggregators</p>
          <p className="mt-2 font-semibold text-[#0d1b24]">
            {market.aggregators.length > 0 ? market.aggregators.length : 'Pending'}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-[#6a7881]">Updated</p>
          <p className="mt-2 font-semibold text-[#0d1b24]">
            {formatReadableDate(market.lastUpdated)}
          </p>
        </div>
      </div>

      <div className="mt-5 border-t border-[#12354a]/10 pt-5">
        <p className="text-sm leading-7 text-[#35505f]">
          {commercialNote}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
        <p className="text-xs uppercase tracking-[0.16em] text-[#6b7680]">
          Best fit: {market.bestVerticals.length > 0 ? market.bestVerticals.slice(0, 2).join(', ') : 'Pending'}
        </p>
        <Link className="atlas-button-primary" to={`/markets/${market.slug}`}>
          View full profile
        </Link>
      </div>
    </article>
  )
}
