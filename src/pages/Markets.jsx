import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FilterBar } from '../components/markets/FilterBar'
import { MarketCard } from '../components/markets/MarketCard'
import { SearchBar } from '../components/markets/SearchBar'
import { PageMetadata } from '../components/shared/PageMetadata'
import { EmptyState } from '../components/shared/EmptyState'
import { SectionHeading } from '../components/shared/SectionHeading'
import { allMarkets, getDirectorySummary, sortMarkets } from '../utils/data'
import { defaultFilters, filterMarkets, getFilterOptions } from '../utils/filters'
import { searchMarkets } from '../utils/search'
import { buildBreadcrumbSchema, buildCollectionSchema } from '../utils/seo'

const sortOptions = [
  { value: 'marketScore', label: 'Market Score' },
  { value: 'opportunity', label: 'Opportunity Score' },
  { value: 'updated', label: 'Last Updated' },
  { value: 'subscribers', label: 'Subscribers' },
  { value: 'alphabetical', label: 'Alphabetical' },
]

export function MarketsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState(defaultFilters)
  const [query, setQuery] = useState(searchParams.get('query') ?? '')
  const [sortBy, setSortBy] = useState('marketScore')
  const [compactMode, setCompactMode] = useState(false)

  const filterOptions = useMemo(() => getFilterOptions(allMarkets), [])

  const results = useMemo(() => {
    const searched = searchMarkets(allMarkets, query)
    const filtered = filterMarkets(searched, filters)
    return sortMarkets(filtered, sortBy)
  }, [filters, query, sortBy])

  const directorySummary = getDirectorySummary(
    results,
    allMarkets.length,
    sortBy,
    compactMode,
  )

  const handleQueryChange = (value) => {
    setQuery(value)
    const nextParams = new URLSearchParams(searchParams)
    if (value) nextParams.set('query', value)
    else nextParams.delete('query')
    setSearchParams(nextParams, { replace: true })
  }

  const handleFilterChange = (key, value) => {
    setFilters((current) => ({ ...current, [key]: value }))
  }

  const handleReset = () => {
    setFilters(defaultFilters)
    setQuery('')
    setSortBy('marketScore')
    setSearchParams({}, { replace: true })
  }

  return (
    <div className="atlas-container space-y-8">
      <PageMetadata
        title="Markets Directory"
        description="Search and compare global DCB markets by score, opportunity, readiness, risk, operator coverage, and aggregator context."
        pathname="/markets"
        structuredData={[
          buildCollectionSchema({
            name: 'DCB Atlas Markets Directory',
            description:
              'Search and compare global DCB markets by score, opportunity, readiness, and risk.',
            pathname: '/markets',
          }),
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Markets', path: '/markets' },
          ]),
        ]}
      />

      <section className="atlas-panel px-6 py-8 sm:px-8">
        <SectionHeading
          eyebrow="Market directory"
          title="Search across countries, operators, and aggregator signals"
          description="Built for specialist users who need a fast shortlist: compare market score, opportunity, readiness, risk, and partner context in one place."
        />
        <div className="mt-6">
          <SearchBar value={query} onChange={handleQueryChange} />
        </div>
      </section>

      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
        options={filterOptions}
      />

      <section className="atlas-panel px-5 py-5 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium text-[#35505f]">
              Showing {directorySummary.totalResults} of {directorySummary.totalMarkets}{' '}
              mapped countries
            </p>
            <p className="mt-1 text-sm text-[#5f6a72]">
              Sorted by {sortOptions.find((option) => option.value === sortBy)?.label}.
              {query ? ` Query: “${query}”.` : ''}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5b6b73]">
                Sort
              </span>
              <select
                className="atlas-input"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5b6b73]">
                Layout
              </span>
              <button
                type="button"
                onClick={() => setCompactMode((current) => !current)}
                className="atlas-button-secondary"
              >
                {compactMode ? 'Comfortable cards' : 'Compact desktop mode'}
              </button>
            </label>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        {results.length === 0 ? (
          <EmptyState
            title="No markets match the current filters"
            description="Reset the search and filters to restore the full directory, or try broader operator and aggregator terms."
          />
        ) : (
          <div className={`grid gap-5 ${compactMode ? 'xl:grid-cols-2' : ''}`}>
            {results.map((market) => (
              <MarketCard key={market.code} market={market} compact={compactMode} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
