export const defaultFilters = {
  region: 'all',
  status: 'all',
  readiness: 'all',
  riskLevel: 'all',
  aggregatorPresence: 'all',
  confidence: 'all',
}

export const filterMarkets = (markets, filters) =>
  markets.filter((market) => {
    if (filters.region !== 'all' && market.region !== filters.region) return false
    if (filters.status !== 'all' && market.status !== filters.status) return false
    if (filters.readiness !== 'all' && market.dcbReadiness !== filters.readiness) return false

    if (
      filters.riskLevel !== 'all' &&
      (market.regulation?.riskLevel ?? 'unknown') !== filters.riskLevel
    ) {
      return false
    }

    if (filters.confidence !== 'all' && market.confidence !== filters.confidence) {
      return false
    }

    if (filters.aggregatorPresence === 'present' && market.aggregators.length === 0) {
      return false
    }

    if (filters.aggregatorPresence === 'absent' && market.aggregators.length > 0) {
      return false
    }

    return true
  })

export const getFilterOptions = (markets) => ({
  regions: [...new Set(markets.map((market) => market.region))].sort(),
  statuses: [...new Set(markets.map((market) => market.status))],
  readiness: [...new Set(markets.map((market) => market.dcbReadiness))],
  confidence: [...new Set(markets.map((market) => market.confidence))],
  riskLevels: [
    ...new Set(markets.map((market) => market.regulation?.riskLevel ?? 'unknown')),
  ],
})
