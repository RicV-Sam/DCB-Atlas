import fs from 'node:fs/promises'
import path from 'node:path'

const today = new Date().toISOString().slice(0, 10)

const canonicalCurrentPath = path.resolve('src/data/countries.json')
const analysisDir = path.resolve('data')
const currentSnapshotPath = path.join(analysisDir, 'countries.json')
const previousSnapshotPath = path.join(analysisDir, 'countries.previous.json')
const driftLogPath = path.join(analysisDir, 'drift-log.json')
const driftSummaryPath = path.join(analysisDir, 'drift-summary.md')

const impactOrder = {
  critical: 4,
  high: 3,
  medium: 2,
  low: 1,
}

const trimString = (value = '') => value.replace(/\s+/g, ' ').trim()

const normalizeString = (value) =>
  typeof value === 'string' ? trimString(value).toLowerCase() : value

const normalizeName = (value = '') =>
  trimString(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()

const parseSubscriberEstimate = (value) => {
  if (typeof value === 'number') {
    return Number.isNaN(value) ? null : value
  }

  if (typeof value !== 'string') {
    return null
  }

  const match = trimString(value).match(/(\d+(?:\.\d+)?)\s*([kmb])?/i)
  if (!match) {
    return null
  }

  const amount = Number.parseFloat(match[1])
  if (Number.isNaN(amount)) {
    return null
  }

  const multiplier = match[2]?.toLowerCase()
  if (multiplier === 'b') return amount * 1_000_000_000
  if (multiplier === 'm') return amount * 1_000_000
  if (multiplier === 'k') return amount * 1_000
  return amount
}

const getCountryKey = (country) => country.code ?? country.slug ?? country.country

const getDisplayCountry = (country) => country.country ?? country.code ?? 'Unknown'

const getImpact = (changeType) => {
  switch (changeType) {
    case 'operator_added':
      return 'low'
    case 'operator_removed':
      return 'medium'
    case 'aggregator_added':
      return 'high'
    case 'aggregator_removed':
      return 'high'
    case 'subscriber_change':
      return 'medium'
    case 'market_score_change':
      return 'high'
    case 'status_change':
      return 'critical'
    case 'readiness_change':
      return 'critical'
    case 'risk_change':
      return 'critical'
    default:
      return 'low'
  }
}

const createChange = ({ country, type, field, oldValue, newValue }) => {
  const impact = getImpact(type)

  return {
    country,
    type,
    field,
    old: oldValue,
    new: newValue,
    impact,
    needsReview: impact === 'high' || impact === 'critical',
  }
}

const indexCountries = (countries) =>
  new Map(countries.map((country) => [getCountryKey(country), country]))

const readJson = async (filePath) => JSON.parse(await fs.readFile(filePath, 'utf8'))

const writeJson = async (filePath, value) => {
  await fs.mkdir(path.dirname(filePath), { recursive: true })
  await fs.writeFile(filePath, `${JSON.stringify(value, null, 2)}\n`)
}

const getOperatorNames = (country) =>
  (country.operators ?? [])
    .map((operator) =>
      typeof operator === 'string' ? operator : operator?.name,
    )
    .filter(Boolean)

const getAggregatorNames = (country) =>
  (country.aggregators ?? [])
    .map((aggregator) =>
      typeof aggregator === 'string' ? aggregator : aggregator?.name,
    )
    .filter(Boolean)

const diffNameLists = (previousList, currentList) => {
  const previousMap = new Map(previousList.map((value) => [normalizeName(value), value]))
  const currentMap = new Map(currentList.map((value) => [normalizeName(value), value]))

  return {
    added: [...currentMap.entries()]
      .filter(([key]) => !previousMap.has(key))
      .map(([, value]) => value),
    removed: [...previousMap.entries()]
      .filter(([key]) => !currentMap.has(key))
      .map(([, value]) => value),
  }
}

const detectCountryChanges = (previousCountry, currentCountry) => {
  const country = getDisplayCountry(currentCountry)
  const changes = []

  const previousOperators = getOperatorNames(previousCountry)
  const currentOperators = getOperatorNames(currentCountry)
  const operatorDiff = diffNameLists(previousOperators, currentOperators)

  if (operatorDiff.added.length > 0) {
    changes.push(
      createChange({
        country,
        type: 'operator_added',
        field: 'operators',
        oldValue: previousOperators,
        newValue: currentOperators,
      }),
    )
  }

  if (operatorDiff.removed.length > 0) {
    changes.push(
      createChange({
        country,
        type: 'operator_removed',
        field: 'operators',
        oldValue: previousOperators,
        newValue: currentOperators,
      }),
    )
  }

  const previousAggregators = getAggregatorNames(previousCountry)
  const currentAggregators = getAggregatorNames(currentCountry)
  const aggregatorDiff = diffNameLists(previousAggregators, currentAggregators)

  if (aggregatorDiff.added.length > 0) {
    changes.push(
      createChange({
        country,
        type: 'aggregator_added',
        field: 'aggregators',
        oldValue: previousAggregators,
        newValue: currentAggregators,
      }),
    )
  }

  if (aggregatorDiff.removed.length > 0) {
    changes.push(
      createChange({
        country,
        type: 'aggregator_removed',
        field: 'aggregators',
        oldValue: previousAggregators,
        newValue: currentAggregators,
      }),
    )
  }

  const previousSubscribers = parseSubscriberEstimate(previousCountry.subscriberEstimate)
  const currentSubscribers = parseSubscriberEstimate(currentCountry.subscriberEstimate)

  if (
    previousSubscribers !== null &&
    currentSubscribers !== null &&
    previousSubscribers > 0
  ) {
    const delta = Math.abs(currentSubscribers - previousSubscribers) / previousSubscribers
    if (delta > 0.1) {
      changes.push(
        createChange({
          country,
          type: 'subscriber_change',
          field: 'subscriberEstimate',
          oldValue: previousCountry.subscriberEstimate,
          newValue: currentCountry.subscriberEstimate,
        }),
      )
    }
  }

  const previousStatus = normalizeString(previousCountry.marketStatus?.dcbStatus)
  const currentStatus = normalizeString(currentCountry.marketStatus?.dcbStatus)
  if (previousStatus !== currentStatus) {
    changes.push(
      createChange({
        country,
        type: 'status_change',
        field: 'marketStatus.dcbStatus',
        oldValue: previousCountry.marketStatus?.dcbStatus ?? null,
        newValue: currentCountry.marketStatus?.dcbStatus ?? null,
      }),
    )
  }

  const previousReadiness = normalizeString(previousCountry.marketStatus?.readiness)
  const currentReadiness = normalizeString(currentCountry.marketStatus?.readiness)
  if (previousReadiness !== currentReadiness) {
    changes.push(
      createChange({
        country,
        type: 'readiness_change',
        field: 'marketStatus.readiness',
        oldValue: previousCountry.marketStatus?.readiness ?? null,
        newValue: currentCountry.marketStatus?.readiness ?? null,
      }),
    )
  }

  const previousRisk = normalizeString(previousCountry.marketStatus?.risk)
  const currentRisk = normalizeString(currentCountry.marketStatus?.risk)
  if (previousRisk !== currentRisk) {
    changes.push(
      createChange({
        country,
        type: 'risk_change',
        field: 'marketStatus.risk',
        oldValue: previousCountry.marketStatus?.risk ?? null,
        newValue: currentCountry.marketStatus?.risk ?? null,
      }),
    )
  }

  const previousScore = previousCountry.marketScore
  const currentScore = currentCountry.marketScore
  if (
    typeof previousScore === 'number' &&
    typeof currentScore === 'number' &&
    Math.abs(currentScore - previousScore) >= 5
  ) {
    changes.push(
      createChange({
        country,
        type: 'market_score_change',
        field: 'marketScore',
        oldValue: previousScore,
        newValue: currentScore,
      }),
    )
  }

  const previousConfidence = normalizeString(previousCountry.confidence)
  const currentConfidence = normalizeString(currentCountry.confidence)
  if (previousConfidence !== currentConfidence) {
    changes.push(
      createChange({
        country,
        type: 'confidence_change',
        field: 'confidence',
        oldValue: previousCountry.confidence ?? null,
        newValue: currentCountry.confidence ?? null,
      }),
    )
  }

  return changes
}

const groupChangesByCountry = (changes) => {
  const grouped = new Map()

  for (const change of changes) {
    if (!grouped.has(change.country)) {
      grouped.set(change.country, [])
    }
    grouped.get(change.country).push(change)
  }

  return [...grouped.entries()].sort((left, right) => {
    const leftImpact = Math.max(...left[1].map((change) => impactOrder[change.impact] ?? 0))
    const rightImpact = Math.max(...right[1].map((change) => impactOrder[change.impact] ?? 0))
    return rightImpact - leftImpact || left[0].localeCompare(right[0])
  })
}

const summariseChange = (change) => {
  switch (change.type) {
    case 'operator_added':
      return `Operator added: ${change.new
        .filter((value) => !change.old.some((oldValue) => normalizeName(oldValue) === normalizeName(value)))
        .join(', ')} (${change.impact.toUpperCase()} impact)`
    case 'operator_removed':
      return `Operator removed: ${change.old
        .filter((value) => !change.new.some((newValue) => normalizeName(newValue) === normalizeName(value)))
        .join(', ')} (${change.impact.toUpperCase()} impact)`
    case 'aggregator_added':
      return `Aggregator added: ${change.new
        .filter((value) => !change.old.some((oldValue) => normalizeName(oldValue) === normalizeName(value)))
        .join(', ')} (${change.impact.toUpperCase()} impact)`
    case 'aggregator_removed':
      return `Aggregator removed: ${change.old
        .filter((value) => !change.new.some((newValue) => normalizeName(newValue) === normalizeName(value)))
        .join(', ')} (${change.impact.toUpperCase()} impact)`
    case 'subscriber_change':
      return `Subscriber estimate updated to ${change.new} (${change.impact.toUpperCase()} impact)`
    case 'market_score_change':
      return `Market score changed from ${change.old} to ${change.new} (${change.impact.toUpperCase()} impact)`
    case 'status_change':
      return `DCB status changed from ${change.old} to ${change.new} (${change.impact.toUpperCase()} impact)`
    case 'readiness_change':
      return `Readiness changed from ${change.old} to ${change.new} (${change.impact.toUpperCase()} impact)`
    case 'risk_change':
      return `Risk changed from ${change.old} to ${change.new} (${change.impact.toUpperCase()} impact)`
    case 'confidence_change':
      return `Confidence changed from ${change.old} to ${change.new} (${change.impact.toUpperCase()} impact)`
    default:
      return `${change.field} changed (${change.impact.toUpperCase()} impact)`
  }
}

const buildSummaryMarkdown = (changes) => {
  const grouped = groupChangesByCountry(changes)
  const counts = changes.reduce(
    (accumulator, change) => {
      accumulator[change.impact] = (accumulator[change.impact] ?? 0) + 1
      return accumulator
    },
    { critical: 0, high: 0, medium: 0, low: 0 },
  )

  const sections = ['# 🌍 DCB Atlas – Drift Report', '', '## 🔥 Key Changes', '']

  if (grouped.length === 0) {
    sections.push('No meaningful changes detected.', '')
  } else {
    for (const [country, countryChanges] of grouped) {
      sections.push(`### ${country}`)
      for (const change of countryChanges) {
        sections.push(`- ${summariseChange(change)}`)
      }
      sections.push('')
    }
  }

  sections.push('## 📊 Summary')
  sections.push(`- Total changes: ${changes.length}`)
  sections.push(`- Critical: ${counts.critical}`)
  sections.push(`- High impact: ${counts.high}`)
  sections.push(`- Medium impact: ${counts.medium}`)
  sections.push(`- Low impact: ${counts.low}`)
  sections.push('')

  return `${sections.join('\n')}\n`
}

const main = async () => {
  await fs.mkdir(analysisDir, { recursive: true })

  const currentDataset = await readJson(canonicalCurrentPath)
  await writeJson(currentSnapshotPath, currentDataset)

  const previousExists = await fs
    .access(previousSnapshotPath)
    .then(() => true)
    .catch(() => false)

  if (!previousExists) {
    const baselineLog = {
      timestamp: today,
      totalChanges: 0,
      changes: [],
    }

    await writeJson(previousSnapshotPath, currentDataset)
    await writeJson(driftLogPath, baselineLog)
    await fs.writeFile(
      driftSummaryPath,
      '# 🌍 DCB Atlas – Drift Report\n\nBaseline created from current dataset. No comparison available on first run.\n',
    )
    console.log('Baseline created at data/countries.previous.json')
    return
  }

  const previousDataset = await readJson(previousSnapshotPath)
  const previousIndex = indexCountries(previousDataset)
  const changes = []

  for (const currentCountry of currentDataset) {
    const key = getCountryKey(currentCountry)
    const previousCountry = previousIndex.get(key)
    if (!previousCountry) {
      continue
    }

    changes.push(...detectCountryChanges(previousCountry, currentCountry))
  }

  const driftLog = {
    timestamp: today,
    totalChanges: changes.length,
    changes,
  }

  await writeJson(driftLogPath, driftLog)
  await fs.writeFile(driftSummaryPath, buildSummaryMarkdown(changes))
  await writeJson(previousSnapshotPath, currentDataset)

  console.log(`Drift analysis complete with ${changes.length} meaningful changes.`)
}

await main()
