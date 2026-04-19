import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CountryPanel } from '../components/map/CountryPanel'
import { WorldMap } from '../components/map/WorldMap'
import { MarketCard } from '../components/markets/MarketCard'
import { SearchBar } from '../components/markets/SearchBar'
import { CtaBanner } from '../components/shared/CtaBanner'
import { QuickStat } from '../components/shared/QuickStat'
import { SectionHeading } from '../components/shared/SectionHeading'
import {
  allMarkets,
  getFeaturedMarkets,
  getQuickStats,
  getRecentlyUpdatedMarkets,
  getTopMapMarkets,
} from '../utils/data'

export function HomePage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [selectedMarket, setSelectedMarket] = useState(
    getFeaturedMarkets(1)[0] ?? null,
  )

  const quickStats = useMemo(() => getQuickStats(), [])
  const featured = useMemo(() => getFeaturedMarkets(3), [])
  const recent = useMemo(() => getRecentlyUpdatedMarkets(3), [])
  const accessibleMarkets = useMemo(() => getTopMapMarkets(14), [])

  return (
    <div className="atlas-container space-y-10">
      <section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="atlas-panel overflow-hidden px-6 py-8 sm:px-8 sm:py-10">
          <p className="atlas-eyebrow">Global VAS / DCB market explorer</p>
          <h1 className="atlas-title mt-3 max-w-4xl text-5xl font-semibold leading-tight text-[#0d1b24] sm:text-6xl">
            Editorial market intelligence for teams exploring carrier billing
            opportunities.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[#35505f]">
            DCB Atlas turns fragmented market signals into a static, searchable world
            map. Use it to shortlist countries, scan operators and aggregator context,
            and request a sharper briefing before you go deeper.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              className="atlas-button-primary"
              href="mailto:briefings@dcbatlas.com?subject=Request%20market%20entry%20help"
            >
              Request market entry help
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
            Built as a BD asset, not a blank data dump.
          </h2>
          <div className="mt-6 space-y-4 text-sm leading-7 text-[#e8ddc6]">
            <p>
              Each public profile is framed as a starting point for commercial
              qualification, not a substitute for route verification or local legal
              review.
            </p>
            <p>
              The strongest use case is early shortlist shaping: where to focus
              diligence, who matters in-market, and where a tailored briefing can save
              time.
            </p>
          </div>
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
          eyebrow="Featured markets"
          title="Profiles with stronger public editorial coverage"
          description="These records contain a richer public summary. Scores and notes are still directional and should be validated before commercial decisions."
          action={
            <Link className="atlas-link" to="/markets">
              See all markets
            </Link>
          }
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {featured.map((market) => (
            <MarketCard key={market.code} market={market} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeading
          eyebrow="Recently updated"
          title="Freshly touched public profiles"
          description="The atlas starts with a small curated subset of enriched markets and a wider global placeholder layer."
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {recent.map((market) => (
            <MarketCard key={market.code} market={market} />
          ))}
        </div>
      </section>

      <CtaBanner
        title="Need a sharper market entry read than a public summary can provide?"
        description="Use DCB Atlas to screen the landscape, then ask for a market briefing when you need route validation, partner context, or country-by-country commercial framing."
      />
    </div>
  )
}
