const normalize = (value = '') => value.toLowerCase().trim()

export const createSearchIndex = (market) =>
  [
    market.country,
    market.region,
    market.status,
    market.dcbReadiness,
    ...market.operators.map((operator) => operator.name),
    ...market.aggregators.map((aggregator) => aggregator.name),
  ]
    .join(' ')
    .toLowerCase()

export const searchMarkets = (markets, query) => {
  const normalizedQuery = normalize(query)
  if (!normalizedQuery) return markets

  return markets.filter((market) =>
    createSearchIndex(market).includes(normalizedQuery),
  )
}
