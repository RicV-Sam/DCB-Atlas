import { Link } from 'react-router-dom'
import { formatCompactNumber, formatReadableDate } from '../../utils/formatters'
import {
  getConfidenceBadge,
  getReadinessBadge,
  getRiskBadge,
  getStatusBadge,
} from '../../utils/scoring'
import { Badge } from '../shared/Badge'
import { CtaBanner } from '../shared/CtaBanner'

export function CountryPanel({ market, open, onClose }) {
  if (!market) return null

  const status = getStatusBadge(market.status)
  const readiness = getReadinessBadge(market.dcbReadiness)
  const risk = getRiskBadge(market.regulation?.riskLevel)
  const confidence = getConfidenceBadge(market.confidence)

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

          <div className="space-y-3 text-sm leading-7 text-[#35505f]">
            <p>{market.notes}</p>
            <p>{market.commercialNote}</p>
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
                Aggregators
              </p>
              <p className="mt-2 text-sm text-[#0d1b24]">
                {market.aggregators.length > 0
                  ? market.aggregators.map((aggregator) => aggregator.name).join(', ')
                  : 'No public names added yet'}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-[#6b7680]">
                Last updated
              </p>
              <p className="mt-2 text-sm font-semibold text-[#0d1b24]">
                {formatReadableDate(market.lastUpdated)}
              </p>
            </div>
          </div>

          <Link className="atlas-button-primary w-full" to={`/markets/${market.slug}`}>
            View full profile
          </Link>

          <CtaBanner
            title="Need a sharper read on this market?"
            description="Use the atlas as an editorial starting point, then request a tailored briefing before making routing or launch decisions."
          />
        </div>
      </aside>
    </>
  )
}
