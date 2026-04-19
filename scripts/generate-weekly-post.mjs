import fs from 'node:fs/promises'
import path from 'node:path'

const dataDir = path.resolve('data')
const driftLogPath = path.join(dataDir, 'drift-log.json')
const countriesPath = path.join(dataDir, 'countries.json')
const weeklyPostPath = path.join(dataDir, 'weekly-post.md')

const HIGH_SIGNAL_IMPACTS = new Set(['high', 'critical'])

const interpret = (change) => {
  if (change.type === 'aggregator_added') {
    return 'Aggregator expansion suggests improving commercial routes and partner accessibility.'
  }

  if (change.type === 'operator_added') {
    return 'Operator landscape expansion may increase DCB reach.'
  }

  if (change.type === 'readiness_change') {
    return 'Market maturity shift worth re-evaluating for launch prioritisation.'
  }

  if (change.type === 'risk_change') {
    return 'Risk profile shift; compliance and exposure should be reviewed.'
  }

  if (change.type === 'status_change') {
    return 'Fundamental market change — immediate strategic relevance.'
  }

  return 'Minor structural update.'
}

const readJson = async (filePath) => JSON.parse(await fs.readFile(filePath, 'utf8'))

const titleCase = (value = '') =>
  value
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())

const flagEmoji = (countryCode = '') =>
  countryCode
    .toUpperCase()
    .slice(0, 2)
    .split('')
    .map((char) => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join('')

const getTier = (market) => {
  if (typeof market.marketScore !== 'number') return null
  if (market.marketScore >= 80) return 1
  if (market.marketScore >= 60) return 2
  return 3
}

const getExecutionLine = (market) => {
  const aggregatorCount = market.aggregators?.length ?? 0
  const wallet = market.capabilities?.wallet
  const strictness = market.regulation?.strictness
  const recommendedEntry = market.recommendedEntry

  if (market.code === 'ZA') {
    return 'Strong aggregator depth and high compliance enforcement still define whether execution stays premium or becomes operationally expensive.'
  }

  if (market.code === 'NG') {
    return 'Volume opportunity still outweighs regulatory friction, but only when operator routing, trust controls, and support handling are built for scale.'
  }

  if (market.code === 'KE') {
    return 'DCB usually performs best when positioned alongside wallet behaviour, not against it.'
  }

  if (wallet === 'dominant' || wallet === 'strong') {
    return 'DCB usually works best when positioned alongside wallet behaviour, not against it.'
  }

  if (strictness === 'high' || market.marketStatus?.risk === 'high') {
    return 'Execution is still defined more by compliance discipline and partner quality than by topline demand alone.'
  }

  if (recommendedEntry === 'direct_operator') {
    return 'Operator alignment still matters more than broad market narratives if you want execution quality.'
  }

  if (aggregatorCount >= 3) {
    return 'Route quality still depends heavily on aggregator depth and how quickly that can be converted into commercial access.'
  }

  return 'The market still rewards disciplined execution more than reactive expansion.'
}

const getStableLead = (market) => {
  if (market.code === 'ZA') {
    return 'No structural movement, but South Africa remains one of the most commercially mature DCB environments in the Atlas.'
  }

  if (market.code === 'NG') {
    return 'No major shifts, but Nigeria still carries unmatched scale in Africa for partners that can absorb the regulatory drag.'
  }

  if (market.code === 'KE') {
    return 'Stable on paper, but Kenya still behaves like a mobile-money market first and a DCB market second.'
  }

  const tier = getTier(market)

  if (tier === 1) {
    return `No structural movement, but ${market.country} still reads as one of the more commercially mature DCB environments in the Atlas.`
  }

  if (tier === 2) {
    return `No major shifts, but ${market.country} still looks like a scale or route-building market rather than a fully settled one.`
  }

  return `No major shifts, but ${market.country} still sits closer to watchlist territory, where stability can mean constraint as much as momentum.`
}

const selectStableAnchors = (countries) => {
  const covered = countries.filter((country) => country.status !== 'research')
  const byCode = new Map(covered.map((country) => [country.code, country]))
  const preferred = ['ZA', 'NG', 'KE']
    .map((code) => byCode.get(code))
    .filter(Boolean)

  if (preferred.length >= 3) {
    return preferred.slice(0, 3)
  }

  const tierBuckets = {
    1: covered.filter((country) => getTier(country) === 1),
    2: covered.filter((country) => getTier(country) === 2),
    3: covered.filter((country) => getTier(country) === 3),
  }

  const selected = [...preferred]
  for (const tier of [1, 2, 3]) {
    const candidate = tierBuckets[tier]
      .sort((left, right) => (right.marketScore ?? 0) - (left.marketScore ?? 0))
      .find((country) => !selected.some((item) => item.code === country.code))

    if (candidate) {
      selected.push(candidate)
    }

    if (selected.length >= 3) {
      break
    }
  }

  return selected.slice(0, 3)
}

const groupByCountry = (changes) => {
  const grouped = new Map()

  for (const change of changes) {
    if (!grouped.has(change.country)) {
      grouped.set(change.country, [])
    }

    grouped.get(change.country).push(change)
  }

  return [...grouped.entries()]
}

const orderChanges = (changes) =>
  [...changes].sort((left, right) => {
    const impactOrder = { critical: 4, high: 3, medium: 2, low: 1 }
    return (impactOrder[right.impact] ?? 0) - (impactOrder[left.impact] ?? 0)
  })

const summarizeCountrySignal = (country, changes) => {
  const ordered = orderChanges(changes)
  const headline = ordered
    .map((change) => {
      switch (change.type) {
        case 'aggregator_added':
          return 'commercial route coverage expanded'
        case 'aggregator_removed':
          return 'partner access appears narrower'
        case 'operator_added':
          return 'operator reach expanded'
        case 'operator_removed':
          return 'operator coverage tightened'
        case 'status_change':
          return `DCB status moved from ${change.old} to ${change.new}`
        case 'readiness_change':
          return `market readiness moved from ${change.old} to ${change.new}`
        case 'risk_change':
          return `risk moved from ${change.old} to ${change.new}`
        case 'market_score_change':
          return `market score moved from ${change.old} to ${change.new}`
        case 'confidence_change':
          return `confidence moved from ${change.old} to ${change.new}`
        default:
          return `${titleCase(change.field)} shifted`
      }
    })
    .slice(0, 2)
    .join(', ')

  const interpretation = ordered
    .map((change) => interpret(change))
    .filter((value, index, list) => list.indexOf(value) === index)
    .slice(0, 2)
    .join(' ')

  return `${country}: ${headline}. ${interpretation}`.trim()
}

const buildHighSignalPost = ({ timestamp, changes }) => {
  const grouped = groupByCountry(changes)
  const countrySignals = grouped.map(([country, countryChanges]) =>
    summarizeCountrySignal(country, countryChanges),
  )

  const lead = `This week’s DCB Atlas drift check flagged ${changes.length} high-signal changes across ${grouped.length} market${grouped.length === 1 ? '' : 's'}.`
  const body = countrySignals.map((signal) => `- ${signal}`).join('\n')

  return `# DCB Atlas - Weekly Intelligence Post

Week ending ${timestamp}

${lead}

What stands out:
${body}

The commercial takeaway is straightforward: operator and aggregator movement still matters more than headline market noise, because route access and market readiness shifts usually change execution quality before they change market narratives.

If you’re prioritising VAS/DCB expansion, the right question is not just “which markets look big?” but “which markets are quietly becoming easier or harder to enter?”

#DCB #CarrierBilling #Telecoms #VAS #MobilePayments #MarketIntelligence
`
}

const buildStablePost = ({ timestamp, countries }) => {
  const summaryLine = 'Quiet week on the surface — but that usually means consolidation, not inactivity.'
  const anchors = selectStableAnchors(countries)
  const anchorBlocks = anchors
    .map(
      (market) => `${flagEmoji(market.code)} ${market.country}
${getStableLead(market)}
-> ${getExecutionLine(market)}`,
    )
    .join('\n\n')

  return `# DCB Atlas - Weekly Intelligence Post

Week ending ${timestamp}

${summaryLine}

${anchorBlocks}

Sometimes no movement is the signal — it tells you where the market has already settled.

#DCB #CarrierBilling #Telecoms #VAS #MobilePayments #MarketIntelligence
`
}

const main = async () => {
  const driftLog = await readJson(driftLogPath)
  const countries = await readJson(countriesPath)
  const highSignalChanges = (driftLog.changes ?? []).filter((change) =>
    HIGH_SIGNAL_IMPACTS.has(change.impact),
  )

  const post = highSignalChanges.length > 0
    ? buildHighSignalPost({
        timestamp: driftLog.timestamp,
        changes: highSignalChanges,
      })
    : buildStablePost({
        timestamp: driftLog.timestamp,
        countries,
      })

  await fs.writeFile(weeklyPostPath, post)
  console.log(
    highSignalChanges.length > 0
      ? `Weekly post generated with ${highSignalChanges.length} high-signal changes.`
      : 'Weekly post generated for stable-market week.',
  )
}

await main()
