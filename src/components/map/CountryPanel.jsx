import { Link } from 'react-router-dom'
import { formatCompactNumber, formatReadableDate, titleCase } from '../../utils/formatters'
import {
  getConfidenceBadge,
  getEntryEaseBadge,
  getOpportunityBadge,
  getReadinessBadge,
  getResolvedEntryEase,
  getResolvedOpportunityLevel,
  getResolvedRiskLevel,
  getRiskBadge,
  getStatusBadge,
} from '../../utils/scoring'
import { Badge } from '../shared/Badge'

const sentenceCase = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : 'Pending'

export function CountryPanel({ market, open, onClose }) {
  if (!market) return null

  const status = getStatusBadge(market.status)
  const readiness = getReadinessBadge(market.dcbReadiness)
  const risk = getRiskBadge(getResolvedRiskLevel(market))
  const confidence = getConfidenceBadge(market.confidence)
  const opportunity = getOpportunityBadge(getResolvedOpportunityLevel(market))
  const entryEase = getEntryEaseBadge(getResolvedEntryEase(market))
  const summaryCopy = market.marketReality ?? market.commercialNote ?? market.notes

  return (
    <>
      <button
        type="button"
        aria-label="Close country panel"
        onClick={onClose}
        className={`fixed inset-0 z-30 bg-[#0d1b24]/30 transition ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <aside
        aria-live="polite"
        className={`fixed inset-x-0 bottom-0 z-40 max-h-[85vh] overflow-y-auto rounded-t-[28px] border border-white/20 bg-[#f6efe2] shadow-2xl transition duration-300 md:inset-y-0 md:right-0 md:left-auto md:w-[430px] md:rounded-none md:rounded-l-[28px] ${
          open
            ? 'translate-y-0 md:translate-x-0'
            : 'translate-y-full md:translate-y-0 md:translate-x-full'
        }`}
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-[#12354a]/10 bg-[#f6efe2]/95 px-5 py-4 backdrop-blur">
          <div>
            <p className="atlas-eyebrow">{market.region}</p>
            <h2 className="atlas-title mt-1 text-2xl font-semibold text-[#0d1b24]">
              {market.country}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#12354a]/15 px-3 py-2 text-sm font-semibold text-[#12354a]"
          >
            Close
          </button>
        </div>

        <div className="space-y-6 px-5 py-5">
          <div className="flex flex-wrap gap-2">
            <Badge className={status.className}>{status.label}</Badge>
            <Badge className={opportunity.className}>{opportunity.label}</Badge>
            <Badge className={readiness.className}>{readiness.label}</Badge>
            <Badge className={risk.className}>{risk.label}</Badge>
            <Badge className={confidence.className}>{confidence.label}</Badge>
          </div>

          <div className="grid gap-4 rounded-[24px] bg-white/75 p-4 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-[#6b7680]">
                Market score
              </p>
              <p className="atlas-title mt-2 text-3xl font-semibold text-[#12354a]">
                {market.marketScore ?? '—'}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-[#6b7680]">
                Subscribers
              </p>
              <p className="atlas-title mt-2 text-3xl font-semibold text-[#12354a]">
                {market.subscriberEstimate
                  ? formatCompactNumber(market.subscriberEstimate)
                  : 'Pending'}
              </p>
            </div>
          </div>

          <div className="rounded-[24px] border border-[#12354a]/10 bg-white/65 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-[#6b7680]">
              Decision snapshot
            </p>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[#6b7680]">
                  Entry ease
                </p>
                <p className="mt-1 text-sm font-semibold text-[#0d1b24]">
                  {entryEase.label}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[#6b7680]">
                  Recommended path
                </p>
                <p className="mt-1 text-sm font-semibold text-[#0d1b24]">
                  {titleCase(market.recommendedEntry)}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[#6b7680]">
                  Aggregators
                </p>
                <p className="mt-1 text-sm font-semibold text-[#0d1b24]">
                  {market.aggregators.length > 0
                    ? `${market.aggregators.length} named partners`
                    : 'No named partners yet'}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[#6b7680]">
                  Last updated
                </p>
                <p className="mt-1 text-sm font-semibold text-[#0d1b24]">
                  {formatReadableDate(market.lastUpdated)}
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-3 text-sm leading-7 text-[#35505f]">
            <p>{summaryCopy}</p>
            {market.trafficSuitability ? (
              <p>
                Traffic fit: <span className="font-semibold text-[#0d1b24]">{sentenceCase(market.trafficSuitability)}</span>
              </p>
            ) : null}
          </div>

          <div className="grid gap-4 rounded-[24px] border border-[#12354a]/10 bg-white/65 p-4">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-[#6b7680]">
                Operators
              </p>
              <p className="mt-2 text-sm text-[#0d1b24]">
                {market.operators.length > 0
                  ? market.operators.map((operator) => operator.name).join(', ')
                  : 'Research pending'}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-[#6b7680]">
                Best verticals
              </p>
              <p className="mt-2 text-sm text-[#0d1b24]">
                {market.bestVerticals.length > 0
                  ? market.bestVerticals.join(', ')
                  : 'Pending'}
              </p>
            </div>
          </div>

          <div className="grid gap-3">
            <a
              className="atlas-button-primary w-full text-center"
              href={`mailto:briefings@dcbatlas.com?subject=${encodeURIComponent(`Ask for Route Validation: ${market.country}`)}`}
            >
              Ask for Route Validation
            </a>
            <Link className="atlas-button-secondary w-full text-center" to={`/markets/${market.slug}`}>
              View full profile
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
}
