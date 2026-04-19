import countries from '../data/countries.json'

export const allMarkets = countries

export const getMarketBySlug = (slug) =>
  allMarkets.find((market) => market.slug === slug)

export const getFeaturedMarkets = (count = 6) =>
  [...allMarkets]
    .filter((market) => market.marketScore !== null)
    .sort((left, right) => (right.marketScore ?? 0) - (left.marketScore ?? 0))
    .slice(0, count)

export const getRecentlyUpdatedMarkets = (count = 6) =>
  [...allMarkets]
    .filter((market) => market.marketScore !== null)
    .sort(
      (left, right) =>
        new Date(right.lastUpdated).getTime() - new Date(left.lastUpdated).getTime(),
    )
    .slice(0, count)

export const getQuickStats = () => {
  const enriched = allMarkets.filter((market) => market.marketScore !== null)
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

export const getTopMapMarkets = (count = 10) =>
  [...allMarkets]
    .filter((market) => market.marketScore !== null)
    .sort((left, right) => left.country.localeCompare(right.country))
    .slice(0, count)
