import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CountryPanel } from '../components/map/CountryPanel'
import { WorldMap } from '../components/map/WorldMap'
import { MarketCard } from '../components/markets/MarketCard'
import { SearchBar } from '../components/markets/SearchBar'
import { CtaBanner } from '../components/shared/CtaBanner'
import { PageMetadata } from '../components/shared/PageMetadata'
import { QuickStat } from '../components/shared/QuickStat'
import { SectionHeading } from '../components/shared/SectionHeading'
import { buildOrganizationSchema, buildWebsiteSchema } from '../utils/seo'
import {
  allMarkets,
  getEmergingMarketsToWatch,
  getFeaturedMarkets,
  getHighRiskHighRewardMarkets,
  getQuickStats,
  getRecentlyUpdatedMarkets,
  getTopMapMarkets,
  getTopOpportunityMarkets,
} from '../utils/data'

const homepageDescription =
  'Compare operators, aggregators, risk, and launch readiness across global VAS/DCB markets.'

export function HomePage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [selectedMarket, setSelectedMarket] = useState(
    getFeaturedMarkets(1)[0] ?? null,
  )

  const quickStats = useMemo(() => getQuickStats(), [])
  const topOpportunity = useMemo(() => getTopOpportunityMarkets(3), [])
  const watchlist = useMemo(() => getEmergingMarketsToWatch(3), [])
  const highRiskHighReward = useMemo(() => getHighRiskHighRewardMarkets(3), [])
  const recent = useMemo(() => getRecentlyUpdatedMarkets(3), [])
  const accessibleMarkets = useMemo(() => getTopMapMarkets(14), [])

  return (
    <div className="atlas-container space-y-10">
      <PageMetadata
        title="Find the best markets to launch DCB services globally"
        description={homepageDescription}
        pathname="/"
        structuredData={[
          buildWebsiteSchema({ description: homepageDescription }),
          buildOrganizationSchema(),
        ]}
      />

      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="atlas-panel overflow-hidden px-6 py-8 sm:px-8 sm:py-10">
          <p className="atlas-eyebrow">Global VAS / DCB market reference</p>
          <h1 className="atlas-title mt-3 max-w-4xl text-5xl font-semibold leading-tight text-[#0d1b24] sm:text-6xl">
            Find the best markets to launch DCB services globally
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#35505f]">
            Compare operators, aggregators, risk, and launch readiness across global
            VAS/DCB markets. DCB Atlas is built for business development,
            partnerships, and market-entry teams that need a sharper shortlist before
            briefing partners or validating routes.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              className="atlas-button-primary"
              href="mailto:briefings@dcbatlas.com?subject=Request%20Market%20Briefing"
            >
              Request Market Briefing
            </a>
            <Link className="atlas-button-secondary" to="/markets">
              Browse market directory
            </Link>
          </div>

          <div className="mt-8 max-w-2xl">
            <SearchBar
              value={query}
              onChange={setQuery}
              placeholder="Search a country, operator, or aggregator"
            />
            <div className="mt-3">
              <button
                type="button"
                onClick={() =>
                  navigate(
                    `/markets${query ? `?query=${encodeURIComponent(query)}` : ''}`,
                  )
                }
                className="atlas-link"
              >
                Search the full market directory
              </button>
            </div>
          </div>
        </div>

        <div className="atlas-panel bg-[#12354a] px-6 py-8 text-[#f2eadc] sm:px-8">
          <p className="atlas-eyebrow text-[#d5b777]">Positioning</p>
          <h2 className="atlas-title mt-3 text-3xl font-semibold">
            Built to support country prioritisation, not passive browsing.
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-7 text-[#e8ddc6]">
            <p>
              Use Atlas to shape shortlists, validate route direction, and identify
              which operators or aggregators are likely to matter before you spend
              time on deeper diligence.
            </p>
            <ul className="space-y-3">
              <li>Shortlist shaping: where the public market signal is strongest</li>
              <li>Route validation: where aggregator depth or operator access may matter most</li>
              <li>Partner context: which markets justify immediate follow-up versus watchlisting</li>
              <li>Country prioritisation: where readiness, risk, and opportunity move together</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <SectionHeading
          eyebrow="Start here"
          title="Learn the model, then compare the markets"
          description="Use these plain-English resources to understand DCB, core operator billing terms, and the latest identity changes affecting conversion."
        />
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
          <article className="atlas-panel px-6 py-6">
            <p className="atlas-eyebrow">Evergreen guide</p>
            <h2 className="atlas-title mt-3 text-3xl font-semibold text-[#0d1b24]">
              What is Direct Carrier Billing?
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#35505f]">
              A practical introduction to DCB, user journeys, operator roles,
              aggregators, compliance basics, and revenue-share models.
            </p>
            <Link
              className="atlas-button-primary mt-5"
              to="/resources/what-is-direct-carrier-billing"
            >
              Read the guide
            </Link>
          </article>

          <article className="atlas-panel px-6 py-6">
            <p className="atlas-eyebrow">Glossary</p>
            <h2 className="atlas-title mt-3 text-3xl font-semibold text-[#0d1b24]">
              DCB and VAS terms
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#35505f]">
              Plain-English definitions for MSISDN, Header Enrichment, OTP,
              CAMARA, aggregators, and related operator billing concepts.
            </p>
            <Link className="atlas-button-secondary mt-5" to="/glossary">
              Open glossary
            </Link>
          </article>

          <article className="atlas-panel px-6 py-6">
            <p className="atlas-eyebrow">Compliance</p>
            <h2 className="atlas-title mt-3 text-3xl font-semibold text-[#0d1b24]">
              DCB compliance basics
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#35505f]">
              Consent, pricing visibility, unsubscribe paths, refunds, support,
              fraud controls, and operator approval themes.
            </p>
            <Link
              className="atlas-button-secondary mt-5"
              to="/resources/dcb-compliance-basics"
            >
              Read compliance guide
            </Link>
          </article>

          <article className="atlas-panel overflow-hidden">
            <img
              src={`${import.meta.env.BASE_URL}assets/insights/chrome-https-msisdn-header-enrichment-dcb-impact/dcb-wake-up-call.png`}
              alt="The DCB wake-up call: Chrome HTTPS move and operator revenue"
              className="aspect-[16/9] w-full object-cover"
              loading="lazy"
            />
            <div className="px-6 py-6">
              <p className="atlas-eyebrow">Latest insight</p>
              <h2 className="atlas-title mt-3 text-2xl font-semibold text-[#0d1b24]">
                Chrome HTTPS and Header Enrichment
              </h2>
              <p className="mt-4 text-sm leading-7 text-[#35505f]">
                Why HTTPS-first browsing changes legacy identification assumptions
                and what operators should measure before conversion drops.
              </p>
              <Link
                className="atlas-button-secondary mt-5"
                to="/insights/chrome-https-msisdn-header-enrichment-dcb-impact"
              >
                Read analysis
              </Link>
            </div>
          </article>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {quickStats.map((stat) => (
          <QuickStat key={stat.label} {...stat} />
        ))}
      </section>

      <section className="relative">
        <WorldMap
          markets={allMarkets}
          selectedMarket={selectedMarket}
          onSelectMarket={setSelectedMarket}
          accessibleMarkets={accessibleMarkets}
        />
        <CountryPanel
          market={selectedMarket}
          open={Boolean(selectedMarket)}
          onClose={() => setSelectedMarket(null)}
        />
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Top opportunity markets"
          title="Start with markets that combine commercial signal and launch potential"
          description="Directional shortlist for teams prioritising where to invest partner conversations first."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {topOpportunity.map((market) => (
            <MarketCard key={market.code} market={market} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Emerging markets to watch"
          title="Markets that may justify earlier attention before they become obvious"
          description="These profiles tend to show useful opportunity but only medium readiness, making them better for monitored build-up than instant scale."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {watchlist.map((market) => (
            <MarketCard key={market.code} market={market} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="High-risk / high-reward"
          title="Markets where upside exists, but execution quality matters more than optimism"
          description="Use these as markets for controlled planning, not casual expansion."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {highRiskHighReward.map((market) => (
            <MarketCard key={market.code} market={market} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Recently updated"
          title="Public profiles touched most recently"
          description="Useful when you want to see where the latest public editorial effort has gone."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {recent.map((market) => (
            <MarketCard key={market.code} market={market} compact />
          ))}
        </div>
      </section>

      <CtaBanner
        title="Need a clearer launch decision than a public profile can provide?"
        description="Use the Atlas to narrow the field, then request a market briefing when you need route validation, operator or aggregator introductions, and market-entry framing."
        primaryLabel="Request Market Entry Plan"
        primaryHref="mailto:briefings@dcbatlas.com?subject=Request%20Market%20Entry%20Plan"
        secondaryLabel="Browse all markets"
        secondaryTo="/markets"
      />
    </div>
  )
}
