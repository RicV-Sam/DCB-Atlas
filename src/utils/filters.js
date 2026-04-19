import {
  getAggregatorAccessLabel,
  getTrafficSuitabilityLabel,
} from './data'
import {
  getResolvedEntryEase,
  getResolvedReadiness,
  getResolvedRiskLevel,
} from './scoring'

export const defaultFilters = {
  region: 'all',
  status: 'all',
  readiness: 'all',
  riskLevel: 'all',
  aggregatorPresence: 'all',
  confidence: 'all',
  entryEase: 'all',
  dcbCapability: 'all',
  wallet: 'all',
  bestVertical: 'all',
}

export const filterMarkets = (markets, filters) =>
  markets.filter((market) => {
    if (filters.region !== 'all' && market.region !== filters.region) return false
    if (filters.status !== 'all' && market.status !== filters.status) return false
    if (
      filters.readiness !== 'all' &&
      getResolvedReadiness(market) !== filters.readiness
    ) {
      return false
    }

    if (filters.riskLevel !== 'all' && getResolvedRiskLevel(market) !== filters.riskLevel) {
      return false
    }

    if (filters.confidence !== 'all' && market.confidence !== filters.confidence) {
      return false
    }

    if (filters.entryEase !== 'all' && getResolvedEntryEase(market) !== filters.entryEase) {
      return false
    }

    if (
      filters.dcbCapability !== 'all' &&
      String(Boolean(market.capabilities?.dcb)) !== filters.dcbCapability
    ) {
      return false
    }

    if (filters.wallet !== 'all' && (market.capabilities?.wallet ?? 'unknown') !== filters.wallet) {
      return false
    }

    if (
      filters.bestVertical !== 'all' &&
      !market.bestVerticals.includes(filters.bestVertical)
    ) {
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

const unique = (values) => [...new Set(values)].filter(Boolean)

export const getFilterOptions = (markets) => ({
  regions: unique(markets.map((market) => market.region)).sort(),
  statuses: unique(markets.map((market) => market.status)),
  readiness: unique(markets.map((market) => getResolvedReadiness(market))).filter(
    (value) => value !== 'unknown',
  ),
  confidence: unique(markets.map((market) => market.confidence)).filter(
    (value) => value !== 'pending',
  ),
  riskLevels: unique(markets.map((market) => getResolvedRiskLevel(market))).filter(
    (value) => value !== 'unknown',
  ),
  entryEase: unique(markets.map((market) => getResolvedEntryEase(market))).filter(
    (value) => value !== 'unknown',
  ),
  wallet: unique(markets.map((market) => market.capabilities?.wallet ?? 'unknown')).filter(
    (value) => value !== 'unknown',
  ),
  bestVerticals: unique(markets.flatMap((market) => market.bestVerticals)).sort(),
  aggregatorAccess: unique(markets.map((market) => getAggregatorAccessLabel(market))).sort(),
  trafficSuitability: unique(markets.map((market) => getTrafficSuitabilityLabel(market))).sort(),
})
