import fs from 'node:fs/promises'
import path from 'node:path'

const dataDir = path.resolve('data')
const driftLogPath = path.join(dataDir, 'drift-log.json')
const driftSummaryPath = path.join(dataDir, 'drift-summary.md')
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

const readOptionalText = async (filePath) => {
  try {
    return await fs.readFile(filePath, 'utf8')
  } catch {
    return ''
  }
}

const titleCase = (value = '') =>
  value
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())

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

const buildStablePost = ({ timestamp, summaryText }) => {
  const summaryLine = summaryText.includes('No meaningful changes detected.')
    ? 'This week’s drift check showed no high-signal structural change across the tracked DCB Atlas markets.'
    : 'This week’s drift check suggests the market picture is broadly stable.'

  return `# DCB Atlas - Weekly Intelligence Post

Week ending ${timestamp}

${summaryLine}

That does not mean nothing is happening. It means no operator, aggregator, readiness, risk, or score movement crossed the threshold that should change commercial prioritisation right now.

Stable weeks matter. In carrier billing and VAS, a quiet market can be the right market for disciplined execution, because fewer structural shifts usually mean fewer avoidable surprises in launch planning.

The better move this week is to focus on route validation, partner quality, and markets where timing already looks good rather than forcing a new narrative where the signal is weak.

#DCB #CarrierBilling #Telecoms #VAS #MobilePayments #MarketIntelligence
`
}

const main = async () => {
  const driftLog = await readJson(driftLogPath)
  const driftSummary = await readOptionalText(driftSummaryPath)
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
        summaryText: driftSummary,
      })

  await fs.writeFile(weeklyPostPath, post)
  console.log(
    highSignalChanges.length > 0
      ? `Weekly post generated with ${highSignalChanges.length} high-signal changes.`
      : 'Weekly post generated for stable-market week.',
  )
}

await main()
