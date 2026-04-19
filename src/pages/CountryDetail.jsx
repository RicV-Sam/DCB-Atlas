import { Link, useParams } from 'react-router-dom'
import { CtaBanner } from '../components/shared/CtaBanner'
import { EmptyState } from '../components/shared/EmptyState'
import { SectionHeading } from '../components/shared/SectionHeading'
import { Badge } from '../components/shared/Badge'
import { getMarketBySlug } from '../utils/data'
import {
  formatCompactNumber,
  formatNumber,
  formatReadableDate,
} from '../utils/formatters'
import {
  getConfidenceBadge,
  getReadinessBadge,
  getRiskBadge,
  getStatusBadge,
} from '../utils/scoring'

export function CountryDetailPage() {
  const { slug } = useParams()
  const market = getMarketBySlug(slug)

  if (!market) {
    return (
      <div className="atlas-container">
        <EmptyState
          title="Country not found"
          description="This market profile does not exist in the current Atlas dataset."
        />
      </div>
    )
  }

  const status = getStatusBadge(market.status)
  const readiness = getReadinessBadge(market.dcbReadiness)
  const risk = getRiskBadge(market.regulation?.riskLevel)
  const confidence = getConfidenceBadge(market.confidence)
  const isPending = market.marketScore === null

  return (
    <div className="atlas-container space-y-8">
      <section className="atlas-panel px-6 py-8 sm:px-8 sm:py-10">
        <Link className="atlas-link" to="/markets">
          Back to markets
        </Link>
        <div className="mt-5 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="atlas-eyebrow">{market.region}</p>
            <h1 className="atlas-title mt-3 text-5xl font-semibold text-[#0d1b24]">
              {market.country}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-[#35505f]">
              {market.notes}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge className={status.className}>{status.label}</Badge>
              <Badge className={readiness.className}>{readiness.label}</Badge>
              <Badge className={risk.className}>{risk.label}</Badge>
              <Badge className={confidence.className}>{confidence.label}</Badge>
            </div>
          </div>

          <div className="rounded-[28px] bg-[#12354a] px-6 py-6 text-[#f3ead9]">
            <p className="atlas-eyebrow text-[#d8ba7a]">Market pulse</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[#cbbfa7]">
                  Market score
                </p>
                <p className="atlas-title mt-2 text-4xl font-semibold">
                  {market.marketScore ?? '—'}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[#cbbfa7]">
                  Opportunity score
                </p>
                <p className="atlas-title mt-2 text-4xl font-semibold">
                  {market.opportunityScore ?? '—'}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[#cbbfa7]">
                  Subscribers
                </p>
                <p className="atlas-title mt-2 text-4xl font-semibold">
                  {market.subscriberEstimate
                    ? formatCompactNumber(market.subscriberEstimate)
                    : 'Pending'}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[#cbbfa7]">
                  Last updated
                </p>
                <p className="mt-2 text-sm font-semibold">
                  {formatReadableDate(market.lastUpdated)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isPending ? (
        <EmptyState
          title="Public profile still being enriched"
          description="This country is visible in the atlas so teams can track global coverage, but the public profile has not yet been expanded beyond a research-pending placeholder."
        />
      ) : (
        <>
          <section className="grid gap-6 lg:grid-cols-2">
            <div className="atlas-panel px-6 py-6">
              <SectionHeading
                eyebrow="Commercial framing"
                title="What the current public read suggests"
                description={market.commercialNote}
              />
            </div>
            <div className="atlas-panel px-6 py-6">
              <SectionHeading
                eyebrow="Regulatory stance"
                title={
                  market.regulation?.riskLevel
                    ? `${market.regulation.riskLevel[0].toUpperCase()}${market.regulation.riskLevel.slice(1)} risk outlook`
                    : 'Risk outlook pending'
                }
                description={market.regulation?.notes}
              />
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="atlas-panel px-6 py-6">
              <SectionHeading
                eyebrow="Operators"
                title="Main public operator references"
                description="Operator counts and subscriber estimates are illustrative where marked and should be verified before planning live access."
              />
              <div className="mt-6 space-y-4">
                {market.operators.length > 0 ? (
                  market.operators.map((operator) => (
                    <article
                      key={operator.name}
                      className="rounded-[24px] border border-[#12354a]/10 bg-white/70 p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-[#0d1b24]">
                            {operator.name}
                          </h3>
                          <p className="mt-2 text-sm leading-7 text-[#35505f]">
                            {operator.notes}
                          </p>
                        </div>
                        <div className="text-right text-sm text-[#35505f]">
                          <p className="font-semibold text-[#0d1b24]">
                            {operator.subscriberEstimate
                              ? formatNumber(operator.subscriberEstimate)
                              : 'Pending'}
                          </p>
                          <p className="mt-1 text-xs uppercase tracking-[0.16em]">
                            Subscribers
                          </p>
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <p className="mt-6 text-sm text-[#35505f]">Research pending.</p>
                )}
              </div>
            </div>

            <div className="atlas-panel px-6 py-6">
              <SectionHeading
                eyebrow="Aggregators"
                title="Publicly framed billing partners"
                description="Aggregator references are illustrative observations unless clearly verified."
              />
              <div className="mt-6 space-y-4">
                {market.aggregators.length > 0 ? (
                  market.aggregators.map((aggregator) => (
                    <article
                      key={aggregator.name}
                      className="rounded-[24px] border border-[#12354a]/10 bg-white/70 p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-[#0d1b24]">
                            {aggregator.name}
                          </h3>
                          <p className="mt-2 text-sm leading-7 text-[#35505f]">
                            {aggregator.notes}
                          </p>
                        </div>
                        <Badge className="border-[#d3c1a0] bg-[#ebe0cb] text-[#12354a]">
                          {aggregator.status}
                        </Badge>
                      </div>
                    </article>
                  ))
                ) : (
                  <p className="mt-6 text-sm text-[#35505f]">
                    No public aggregator names are currently attached to this profile.
                  </p>
                )}
              </div>
            </div>
          </section>
        </>
      )}

      <section className="atlas-panel px-6 py-6">
        <SectionHeading
          eyebrow="Source framing"
          title="How confident is this public profile?"
          description="DCB Atlas uses lightweight public labels so readers can separate stronger observed signals from placeholder coverage."
        />
        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {market.sources.map((source) => (
            <article
              key={`${source.type}-${source.label}`}
              className="rounded-[24px] border border-[#12354a]/10 bg-white/70 p-4"
            >
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#6a7881]">
                {source.type}
              </p>
              <h3 className="mt-2 text-lg font-semibold text-[#0d1b24]">
                {source.label}
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#35505f]">
                Confidence: {source.confidence}
              </p>
            </article>
          ))}
        </div>
      </section>

      <CtaBanner
        title={`Need a deeper view on ${market.country}?`}
        description="Public atlas notes are a starting point. Request a tailored market briefing when you need route validation, operator prioritisation, or partner context."
      />
    </div>
  )
}
