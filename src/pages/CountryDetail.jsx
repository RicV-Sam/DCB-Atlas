import { Link, useParams } from 'react-router-dom'
import { CtaBanner } from '../components/shared/CtaBanner'
import { EmptyState } from '../components/shared/EmptyState'
import { PageMetadata } from '../components/shared/PageMetadata'
import { SectionHeading } from '../components/shared/SectionHeading'
import { Badge } from '../components/shared/Badge'
import {
  getAggregatorAccessLabel,
  getMarketBySlug,
  getTrafficSuitabilityLabel,
} from '../utils/data'
import {
  formatCompactNumber,
  formatNumber,
  formatReadableDate,
  titleCase,
} from '../utils/formatters'
import { buildBreadcrumbSchema } from '../utils/seo'
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
} from '../utils/scoring'

const sentenceCase = (value) =>
  value ? `${value.charAt(0).toUpperCase()}${value.slice(1)}` : 'Pending'

const renderSnapshotValue = (value, fallback = 'Pending') => {
  if (value === null || value === undefined || value === '') return fallback
  return value
}

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
  const risk = getRiskBadge(getResolvedRiskLevel(market))
  const confidence = getConfidenceBadge(market.confidence)
  const opportunity = getOpportunityBadge(getResolvedOpportunityLevel(market))
  const entryEase = getEntryEaseBadge(getResolvedEntryEase(market))
  const isPending = market.marketScore === null
  const marketSummary = market.marketReality ?? market.commercialNote ?? market.notes
  const whyThisMarketMatters = market.marketReality ?? market.commercialNote ?? market.notes
  const aggregatorAccess = getAggregatorAccessLabel(market)
  const trafficSuitability = getTrafficSuitabilityLabel(market)
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', path: '/' },
    { name: 'Markets', path: '/markets' },
    { name: market.country, path: `/markets/${market.slug}` },
  ])

  const snapshotItems = [
    { label: 'Opportunity', value: opportunity.label },
    { label: 'Risk', value: risk.label },
    {
      label: 'DCB maturity',
      value: titleCase(market.marketStatus?.dcbStatus ?? market.status),
    },
    { label: 'Entry ease', value: entryEase.label },
    {
      label: 'Recommended entry path',
      value: titleCase(market.recommendedEntry),
    },
    {
      label: 'Aggregator access',
      value: aggregatorAccess ? titleCase(aggregatorAccess) : null,
    },
    {
      label: 'Traffic suitability',
      value: trafficSuitability ? titleCase(trafficSuitability) : null,
    },
    {
      label: 'Best verticals',
      value: market.bestVerticals.length > 0 ? market.bestVerticals.join(', ') : null,
    },
  ].filter((item) => item.value)

  return (
    <div className="atlas-container space-y-8">
      <PageMetadata
        title={`${market.country} DCB Market Profile`}
        description={`Decision-oriented DCB market profile for ${market.country}, including operators, aggregators, readiness, risk, and launch context.`}
        pathname={`/markets/${market.slug}`}
        structuredData={breadcrumbSchema}
      />

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
              {marketSummary}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge className={status.className}>{status.label}</Badge>
              <Badge className={opportunity.className}>{opportunity.label}</Badge>
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
                  Freshness
                </p>
                <p className="mt-2 text-sm font-semibold">
                  Updated {formatReadableDate(market.lastUpdated)}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[#cbbfa7]">
                  Source confidence
                </p>
                <p className="mt-2 text-sm font-semibold">{confidence.label}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="atlas-panel px-6 py-6">
          <SectionHeading
            eyebrow="Why this market matters"
            title="Fast commercial read"
            description="A compressed decision view so teams can decide whether this market belongs in immediate planning, route validation, or watchlist review."
          />
          <p className="mt-5 text-sm leading-8 text-[#35505f]">
            {whyThisMarketMatters}
          </p>
        </div>

        <div className="atlas-panel px-6 py-6">
          <SectionHeading
            eyebrow="Market snapshot"
            title="Decision snapshot"
            description="This block is intentionally compressed: it should help users scan the page before reading the deeper sections below."
          />
          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {snapshotItems.map((item) => (
              <div
                key={item.label}
                className="rounded-[24px] border border-[#12354a]/10 bg-white/70 p-4"
              >
                <p className="text-xs uppercase tracking-[0.16em] text-[#6a7881]">
                  {item.label}
                </p>
                <p className="mt-2 text-lg font-semibold text-[#0d1b24]">
                  {renderSnapshotValue(item.value)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {isPending ? (
        <EmptyState
          title="Public profile still being enriched"
          description="This country is visible in the Atlas so teams can track global coverage, but the public profile is still in research-pending mode rather than a finished market read."
        />
      ) : (
        <>
          <section className="grid gap-6 lg:grid-cols-2">
            <div className="atlas-panel px-6 py-6">
              <SectionHeading
                eyebrow="Commercial framing"
                title="Launch conditions"
                description="Use this block to quickly assess how hard the market may be to open, structure, and monetise."
              />
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] border border-[#12354a]/10 bg-white/70 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-[#6a7881]">
                    ARPU level
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[#0d1b24]">
                    {sentenceCase(market.commercial?.arpuLevel)}
                  </p>
                </div>
                <div className="rounded-[24px] border border-[#12354a]/10 bg-white/70 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-[#6a7881]">
                    Conversion difficulty
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[#0d1b24]">
                    {sentenceCase(market.commercial?.conversionDifficulty)}
                  </p>
                </div>
                <div className="rounded-[24px] border border-[#12354a]/10 bg-white/70 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-[#6a7881]">
                    Market reality
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[#35505f]">
                    {renderSnapshotValue(market.marketReality ?? market.commercialNote)}
                  </p>
                </div>
                <div className="rounded-[24px] border border-[#12354a]/10 bg-white/70 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-[#6a7881]">
                    Pricing model
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[#0d1b24]">
                    {market.commercial?.pricingModel?.length > 0
                      ? market.commercial.pricingModel.join(', ')
                      : 'Pending'}
                  </p>
                </div>
              </div>
            </div>

            <div className="atlas-panel px-6 py-6">
              <SectionHeading
                eyebrow="Risk and readiness"
                title="Operational caution points"
                description="These signals are meant to highlight where launch assumptions may need extra validation."
              />
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] border border-[#12354a]/10 bg-white/70 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-[#6a7881]">
                    Regulator
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[#0d1b24]">
                    {market.regulation?.regulator ?? 'Pending'}
                  </p>
                </div>
                <div className="rounded-[24px] border border-[#12354a]/10 bg-white/70 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-[#6a7881]">
                    Strictness
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[#0d1b24]">
                    {sentenceCase(market.regulation?.strictness)}
                  </p>
                </div>
              </div>
              <div className="mt-4 rounded-[24px] border border-[#12354a]/10 bg-white/70 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-[#6a7881]">
                  Regulatory notes
                </p>
                <p className="mt-3 text-sm leading-7 text-[#35505f]">
                  {market.regulation?.notes ?? 'Pending'}
                </p>
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="atlas-panel px-6 py-6">
              <SectionHeading
                eyebrow="Capabilities"
                title="Billing and ecosystem signals"
                description="These are useful for shortlist shaping, but still need route-level confirmation before launch."
              />
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] border border-[#12354a]/10 bg-white/70 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-[#6a7881]">DCB</p>
                  <p className="mt-2 text-lg font-semibold text-[#0d1b24]">
                    {market.capabilities?.dcb ? 'Yes' : 'No'}
                  </p>
                </div>
                <div className="rounded-[24px] border border-[#12354a]/10 bg-white/70 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-[#6a7881]">PSMS</p>
                  <p className="mt-2 text-lg font-semibold text-[#0d1b24]">
                    {market.capabilities?.psms ? 'Yes' : 'No'}
                  </p>
                </div>
                <div className="rounded-[24px] border border-[#12354a]/10 bg-white/70 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-[#6a7881]">Wallet relevance</p>
                  <p className="mt-2 text-lg font-semibold text-[#0d1b24]">
                    {sentenceCase(market.capabilities?.wallet)}
                  </p>
                </div>
                <div className="rounded-[24px] border border-[#12354a]/10 bg-white/70 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-[#6a7881]">HE support</p>
                  <p className="mt-2 text-lg font-semibold text-[#0d1b24]">
                    {sentenceCase(market.capabilities?.heSupport)}
                  </p>
                </div>
              </div>
            </div>

            <div className="atlas-panel px-6 py-6">
              <SectionHeading
                eyebrow="Traffic and vertical fit"
                title="Commercial fit"
                description="Only rendered from public Atlas fields. No synthetic traffic assumptions are added."
              />
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] border border-[#12354a]/10 bg-white/70 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-[#6a7881]">
                    Traffic suitability
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[#0d1b24]">
                    {renderSnapshotValue(
                      trafficSuitability ? titleCase(trafficSuitability) : null,
                    )}
                  </p>
                </div>
                <div className="rounded-[24px] border border-[#12354a]/10 bg-white/70 p-4">
                  <p className="text-xs uppercase tracking-[0.16em] text-[#6a7881]">
                    Aggregator access
                  </p>
                  <p className="mt-2 text-lg font-semibold text-[#0d1b24]">
                    {renderSnapshotValue(
                      aggregatorAccess ? titleCase(aggregatorAccess) : null,
                    )}
                  </p>
                </div>
              </div>
              <div className="mt-4 rounded-[24px] border border-[#12354a]/10 bg-white/70 p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-[#6a7881]">
                  Best verticals
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {market.bestVerticals.length > 0 ? (
                    market.bestVerticals.map((vertical) => (
                      <Badge
                        key={vertical}
                        className="border-[#d3c1a0] bg-[#ebe0cb] text-[#12354a]"
                      >
                        {vertical}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-sm text-[#35505f]">Pending</span>
                  )}
                </div>
              </div>
            </div>
          </section>

          <section className="grid gap-6 lg:grid-cols-2">
            <div className="atlas-panel px-6 py-6">
              <SectionHeading
                eyebrow="Operators"
                title="Main public operator references"
                description="Operator listings remain useful for context, but should not be read as guaranteed commercial routing availability."
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
                          {operator.notes ? (
                            <p className="mt-2 text-sm leading-7 text-[#35505f]">
                              {operator.notes}
                            </p>
                          ) : null}
                        </div>
                        <div className="text-right text-sm text-[#35505f]">
                          <p className="font-semibold text-[#0d1b24]">
                            {operator.subscriberEstimate
                              ? formatNumber(operator.subscriberEstimate)
                              : 'Public reference'}
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
                title="Named local and international partners"
                description="Useful for partner context and route-shortlist framing, not as a guarantee of active launch access."
              />
              <div className="mt-6 space-y-4">
                {market.aggregators.length > 0 ? (
                  market.aggregators.map((aggregator) => (
                    <article
                      key={`${aggregator.scope}-${aggregator.name}`}
                      className="rounded-[24px] border border-[#12354a]/10 bg-white/70 p-4"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-[#0d1b24]">
                            {aggregator.name}
                          </h3>
                          {aggregator.notes ? (
                            <p className="mt-2 text-sm leading-7 text-[#35505f]">
                              {aggregator.notes}
                            </p>
                          ) : null}
                        </div>
                        <Badge className="border-[#d3c1a0] bg-[#ebe0cb] text-[#12354a]">
                          {aggregator.scope}
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
          eyebrow="Confidence and freshness"
          title="How to read this public profile"
          description="Atlas profiles are editorial market references. They are built to accelerate prioritisation, not replace operator-level or legal validation."
        />
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <div className="rounded-[24px] border border-[#12354a]/10 bg-white/70 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-[#6a7881]">Confidence</p>
            <p className="mt-2 text-lg font-semibold text-[#0d1b24]">{confidence.label}</p>
          </div>
          <div className="rounded-[24px] border border-[#12354a]/10 bg-white/70 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-[#6a7881]">Last updated</p>
            <p className="mt-2 text-lg font-semibold text-[#0d1b24]">
              {formatReadableDate(market.lastUpdated)}
            </p>
          </div>
          <div className="rounded-[24px] border border-[#12354a]/10 bg-white/70 p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-[#6a7881]">Sources in profile</p>
            <p className="mt-2 text-lg font-semibold text-[#0d1b24]">{market.sources.length}</p>
          </div>
        </div>
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
        title={`Need a decision-ready plan for ${market.country}?`}
        description="Public Atlas notes are a starting point. Ask for a market entry plan when you need route validation, operator or aggregator context, and launch prioritisation."
        primaryLabel="Request Market Entry Plan"
        primaryHref={`mailto:briefings@dcbatlas.com?subject=${encodeURIComponent(`Request Market Entry Plan: ${market.country}`)}`}
        secondaryLabel="Ask for Route Validation"
        secondaryHref={`mailto:briefings@dcbatlas.com?subject=${encodeURIComponent(`Ask for Route Validation: ${market.country}`)}`}
        secondaryTo={undefined}
      />
    </div>
  )
}
