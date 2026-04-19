import countries from '../data/countries.json'
import { getComparableNumber } from './formatters'
import {
  getResolvedOpportunityLevel,
  getResolvedReadiness,
  getResolvedRiskLevel,
} from './scoring'

export const allMarkets = countries

const opportunityRank = { high: 3, medium: 2, low: 1, unknown: 0 }
const confidenceRank = { high: 4, 'medium-high': 3, medium: 2, pending: 1 }

export const isEnrichedMarket = (market) => market.marketScore !== null

export const getMarketBySlug = (slug) =>
  allMarkets.find((market) => market.slug === slug)

const compareByMarketStrength = (left, right) => {
  const marketScoreGap = (right.marketScore ?? 0) - (left.marketScore ?? 0)
  if (marketScoreGap !== 0) return marketScoreGap

  const opportunityGap =
    (right.opportunityScore ?? 0) - (left.opportunityScore ?? 0)
  if (opportunityGap !== 0) return opportunityGap

  return (confidenceRank[right.confidence] ?? 0) - (confidenceRank[left.confidence] ?? 0)
}

export const getFeaturedMarkets = (count = 6) =>
  [...allMarkets].filter(isEnrichedMarket).sort(compareByMarketStrength).slice(0, count)

export const getRecentlyUpdatedMarkets = (count = 6) =>
  [...allMarkets]
    .filter(isEnrichedMarket)
    .sort(
      (left, right) =>
        new Date(right.lastUpdated).getTime() - new Date(left.lastUpdated).getTime(),
    )
    .slice(0, count)

export const getTopOpportunityMarkets = (count = 6) =>
  [...allMarkets]
    .filter(isEnrichedMarket)
    .sort((left, right) => {
      const explicitGap = (right.opportunityScore ?? 0) - (left.opportunityScore ?? 0)
      if (explicitGap !== 0) return explicitGap

      const opportunityGap =
        (opportunityRank[getResolvedOpportunityLevel(right)] ?? 0) -
        (opportunityRank[getResolvedOpportunityLevel(left)] ?? 0)
      if (opportunityGap !== 0) return opportunityGap

      return compareByMarketStrength(left, right)
    })
    .slice(0, count)

export const getEmergingMarketsToWatch = (count = 6) =>
  [...allMarkets]
    .filter(
      (market) =>
        isEnrichedMarket(market) &&
        getResolvedOpportunityLevel(market) !== 'low' &&
        getResolvedReadiness(market) === 'medium',
    )
    .sort((left, right) => {
      const opportunityGap =
        (opportunityRank[getResolvedOpportunityLevel(right)] ?? 0) -
        (opportunityRank[getResolvedOpportunityLevel(left)] ?? 0)
      if (opportunityGap !== 0) return opportunityGap

      const freshnessGap =
        new Date(right.lastUpdated).getTime() - new Date(left.lastUpdated).getTime()
      if (freshnessGap !== 0) return freshnessGap

      return compareByMarketStrength(left, right)
    })
    .slice(0, count)

export const getHighRiskHighRewardMarkets = (count = 6) =>
  [...allMarkets]
    .filter(
      (market) =>
        isEnrichedMarket(market) &&
        getResolvedRiskLevel(market) === 'high' &&
        getResolvedOpportunityLevel(market) === 'high',
    )
    .sort(compareByMarketStrength)
    .slice(0, count)

export const getQuickStats = () => {
  const enriched = allMarkets.filter(isEnrichedMarket)
  const liveSignals = allMarkets.filter((market) => market.status === 'live')

  return [
    { label: 'Countries mapped', value: allMarkets.length },
    { label: 'Enriched profiles', value: enriched.length },
    { label: 'Live-signal markets', value: liveSignals.length },
    {
      label: 'Regions covered',
      value: new Set(allMarkets.map((market) => market.region)).size,
    },
  ]
}

export const getTopMapMarkets = (count = 10) => {
  const selected = []
  const addUnique = (market) => {
    if (!market || selected.some((item) => item.code === market.code)) return
    selected.push(market)
  }

  getTopOpportunityMarkets(5).forEach(addUnique)
  getFeaturedMarkets(5).forEach(addUnique)
  getRecentlyUpdatedMarkets(5).forEach(addUnique)

  return selected.slice(0, count)
}

export const sortMarkets = (markets, sortBy) => {
  const sorted = [...markets]

  sorted.sort((left, right) => {
    switch (sortBy) {
      case 'opportunity':
        return (right.opportunityScore ?? -1) - (left.opportunityScore ?? -1)
      case 'updated':
        return new Date(right.lastUpdated).getTime() - new Date(left.lastUpdated).getTime()
      case 'subscribers':
        return (
          (getComparableNumber(right.subscriberEstimate) ?? -1) -
          (getComparableNumber(left.subscriberEstimate) ?? -1)
        )
      case 'alphabetical':
        return left.country.localeCompare(right.country)
      case 'marketScore':
      default:
        return compareByMarketStrength(left, right)
    }
  })

  return sorted
}

export const getAggregatorAccessLabel = (market) => {
  if (market.aggregatorAccess) return market.aggregatorAccess
  const scopes = new Set(market.aggregators.map((aggregator) => aggregator.scope))
  if (scopes.has('local') && scopes.has('international')) return 'mixed'
  if (scopes.has('local')) return 'local'
  if (scopes.has('international')) return 'international'
  return null
}

export const getTrafficSuitabilityLabel = (market) => {
  if (market.trafficSuitability) return market.trafficSuitability
  if (market.bestVerticals?.length) {
    return `${market.bestVerticals.slice(0, 2).join(' + ')}`
  }
  return null
}

export const getDecisionHighlights = (market) => [
  { label: 'Opportunity', value: getResolvedOpportunityLevel(market) },
  { label: 'Risk', value: getResolvedRiskLevel(market) },
  { label: 'DCB maturity', value: market.marketStatus?.dcbStatus ?? market.status },
  {
    label: 'Entry path',
    value: market.recommendedEntry ?? null,
  },
]

export const getDirectorySummary = (results, total, sortBy, compactMode) => ({
  totalResults: results.length,
  totalMarkets: total,
  sortBy,
  compactMode,
})

export const getMarketPriorityTier = (market) => {
  if (!isEnrichedMarket(market)) return 0
  if ((market.marketScore ?? 0) >= 80) return 1
  if ((market.marketScore ?? 0) >= 60) return 2
  return 3
}
