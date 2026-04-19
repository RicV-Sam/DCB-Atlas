import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FilterBar } from '../components/markets/FilterBar'
import { MarketCard } from '../components/markets/MarketCard'
import { SearchBar } from '../components/markets/SearchBar'
import { EmptyState } from '../components/shared/EmptyState'
import { SectionHeading } from '../components/shared/SectionHeading'
import { allMarkets } from '../utils/data'
import { defaultFilters, filterMarkets, getFilterOptions } from '../utils/filters'
import { searchMarkets } from '../utils/search'

export function MarketsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [filters, setFilters] = useState(defaultFilters)
  const [query, setQuery] = useState(searchParams.get('query') ?? '')

  const filterOptions = useMemo(() => getFilterOptions(allMarkets), [])

  const results = useMemo(() => {
    const searched = searchMarkets(allMarkets, query)
    return filterMarkets(searched, filters)
  }, [filters, query])

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
    setSearchParams({}, { replace: true })
  }

  return (
    <div className="atlas-container space-y-8">
      <section className="atlas-panel px-6 py-8 sm:px-8">
        <SectionHeading
          eyebrow="Market directory"
          title="Search across countries, operators, and aggregator signals"
          description="This directory is intentionally editorial, not definitive. Use it to narrow your shortlist, then validate route and compliance details before acting."
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

      <section className="space-y-4">
        <p className="text-sm font-medium text-[#35505f]">
          Showing {results.length} of {allMarkets.length} mapped countries
        </p>

        {results.length === 0 ? (
          <EmptyState
            title="No markets match the current filters"
            description="Reset the search and filters to restore the full directory, or try broader operator and aggregator terms."
          />
        ) : (
          <div className="grid gap-5">
            {results.map((market) => (
              <MarketCard key={market.code} market={market} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
