import fs from 'node:fs'
import path from 'node:path'

const sourcePath = path.resolve(
  'src/data/sources/DCB_Atlas_Master_Source_Document.md',
)

const ignoredHeadings = new Set([
  'what this document does',
  'source precedence used',
  'coverage summary',
  'canonical market schema',
  'validation legend',
  'remaining africa markets summary table',
  'pacific micro-markets',
  'oceania regional summary table',
  'top 25 markets by market score',
  'market classification by tier',
  'regional opportunity matrix',
  'aggregator ecosystem global map',
  'key compliance frameworks by region',
])

const customAliases = {
  drc: 'CD',
  'democratic republic of congo': 'CD',
  'democratic republic of congo drc': 'CD',
  'democratic republic of the congo': 'CD',
  "cote d'ivoire": 'CI',
  'cote divoire': 'CI',
  'ivory coast': 'CI',
  'ivory coast cote divoire': 'CI',
  'russian federation': 'RU',
  'south korea': 'KR',
  'palestine west bank gaza': 'PS',
  palestine: 'PS',
  uae: 'AE',
}

const excludedMarketCodes = new Set(['AF'])

const confidenceRank = {
  pending: 0,
  low: 1,
  medium: 2,
  'medium-high': 3,
  high: 4,
}

const cleanText = (value = '') =>
  value
    .replace(/\u2013|\u2014/g, '-')
    .replace(/\u2018|\u2019/g, "'")
    .replace(/\u201c|\u201d/g, '"')
    .replace(/\u00a0/g, ' ')
    .trim()

const normalizeKey = (value = '') =>
  cleanText(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[()]/g, ' ')
    .replace(/[^a-z0-9]+/gi, ' ')
    .toLowerCase()
    .trim()

const sentenceCase = (value = '') =>
  cleanText(value)
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase())

const firstNumber = (value = '') => {
  const match = cleanText(value).match(/(\d{1,3})(?:\s*\/\s*100)?/)
  return match ? Number.parseInt(match[1], 10) : null
}

const splitList = (value = '') =>
  cleanText(value)
    .split(/[,|]/)
    .map((item) => item.trim())
    .filter(Boolean)

const dedupeStrings = (values = []) => [...new Set(values.filter(Boolean))]

const invalidNamePattern =
  /^(yes|no|unknown|limited|minimal|partial|n\/a|none confirmed|minimal presence|limited presence|very limited|limited information|information|presence|not verifiable|\/ not verifiable|none)$/i

const extractNames = (value = '') =>
  dedupeStrings(
    splitList(value.replace(/\([^)]*\)/g, '')).map((item) =>
      item
        .replace(/\b(active|limited|unknown|very limited|partial)\b/gi, '')
        .replace(/\s+-.*$/g, '')
        .replace(/\s{2,}/g, ' ')
        .trim(),
    ),
  ).filter(
    (item) =>
      item &&
      !invalidNamePattern.test(item) &&
      item.length > 1,
  )

const enumFromText = (value = '', fallback = 'unknown') => {
  const normalized = normalizeKey(value)

  if (!normalized) {
    return fallback
  }

  if (normalized.includes('medium high') || normalized.includes('high medium')) {
    return 'medium'
  }

  if (normalized.includes('very high') || normalized.includes('high')) {
    return 'high'
  }

  if (normalized.includes('low medium') || normalized.includes('medium low')) {
    return 'medium'
  }

  if (normalized.includes('medium') || normalized.includes('moderate')) {
    return 'medium'
  }

  if (normalized.includes('low') || normalized.includes('weak')) {
    return 'low'
  }

  return fallback
}

const normalizeSignal = (value = '') => {
  const normalized = normalizeKey(value)

  if (normalized.includes('strong')) {
    return 'strong'
  }

  if (normalized.includes('medium') || normalized.includes('moderate')) {
    return 'medium'
  }

  if (normalized.includes('weak') || normalized.includes('low')) {
    return 'weak'
  }

  return 'unknown'
}

const normalizeStatus = (value = '') => {
  const normalized = normalizeKey(value)

  if (
    normalized.includes('live') ||
    normalized.includes('active') ||
    normalized.includes('available')
  ) {
    return 'live'
  }

  if (
    normalized.includes('partial') ||
    normalized.includes('limited') ||
    normalized.includes('emerging') ||
    normalized.includes('pilot')
  ) {
    return 'limited'
  }

  return 'research'
}

const normalizeConfidence = (value = '') => {
  const normalized = normalizeKey(value)

  if (normalized.includes('medium high')) {
    return 'medium-high'
  }

  if (normalized.includes('high')) {
    return 'high'
  }

  if (normalized.includes('medium')) {
    return 'medium'
  }

  if (normalized.includes('low')) {
    return 'low'
  }

  return 'pending'
}

const normalizeArpu = (value = '') => {
  const normalized = normalizeKey(value)

  if (normalized.includes('low medium') || normalized.includes('medium low')) {
    return 'medium'
  }

  return enumFromText(normalized, 'unknown')
}

const normalizeConversionDifficulty = (value = '') => {
  const normalized = normalizeKey(value)

  if (normalized.includes('easy')) {
    return 'easy'
  }

  if (
    normalized.includes('hard') ||
    normalized.includes('difficult') ||
    normalized.includes('challenging')
  ) {
    return 'hard'
  }

  if (normalized.includes('moderate') || normalized.includes('medium')) {
    return 'moderate'
  }

  return 'unknown'
}

const normalizeWallet = (value = '') => {
  const normalized = normalizeKey(value)

  if (!normalized || normalized === 'unknown') {
    return 'unknown'
  }

  if (normalized.includes('dominant')) {
    return 'dominant'
  }

  if (normalized.includes('strong') || normalized.includes('widely adopted')) {
    return 'strong'
  }

  if (normalized.includes('partial') || normalized.includes('limited')) {
    return 'limited'
  }

  if (normalized.includes('growing') || normalized.includes('high adoption')) {
    return 'growing'
  }

  if (normalized.includes('emerging') || normalized.includes('early')) {
    return 'emerging'
  }

  return 'limited'
}

const normalizeStrictness = (value = '') => enumFromText(value, 'unknown')

const parsePricingModels = (value = '') => {
  const normalized = normalizeKey(value)
  const models = []

  if (normalized.includes('daily')) {
    models.push('daily')
  }

  if (normalized.includes('weekly')) {
    models.push('weekly')
  }

  if (normalized.includes('monthly')) {
    models.push('monthly')
  }

  return models
}

const inferOpportunity = (marketScore, readiness, risk) => {
  if (marketScore === null) {
    return 'unknown'
  }

  if (marketScore >= 75 || (marketScore >= 68 && readiness === 'high' && risk !== 'high')) {
    return 'high'
  }

  if (marketScore >= 55) {
    return 'medium'
  }

  return 'low'
}

const inferEntryEase = (risk, readiness) => {
  if (risk === 'high' || readiness === 'low') {
    return 'difficult'
  }

  if (risk === 'low' && readiness === 'high') {
    return 'easy'
  }

  return 'moderate'
}

const inferRecommendedEntry = ({ aggregatorCount, wallet, risk, confidence }) => {
  if (wallet === 'strong' || wallet === 'dominant') {
    return 'hybrid'
  }

  if (aggregatorCount > 0) {
    return 'aggregator'
  }

  if (risk !== 'high' && confidence === 'high') {
    return 'direct_operator'
  }

  return 'aggregator'
}

const inferBestVerticals = (text = '') => {
  const normalized = normalizeKey(text)
  const verticals = []
  const candidates = [
    ['gaming', 'gaming'],
    ['game', 'gaming'],
    ['music', 'music'],
    ['video', 'video'],
    ['streaming', 'streaming'],
    ['sport', 'sports'],
    ['education', 'education'],
    ['fintech', 'fintech'],
    ['finance', 'finance'],
    ['subscription', 'subscriptions'],
    ['religious', 'religious'],
    ['entertainment', 'entertainment'],
    ['agriculture', 'agriculture'],
  ]

  for (const [needle, value] of candidates) {
    if (normalized.includes(needle) && !verticals.includes(value)) {
      verticals.push(value)
    }
  }

  return verticals.slice(0, 4)
}

const buildCountryIndex = (countries) => {
  const index = new Map()

  const addAlias = (alias, code) => {
    const key = normalizeKey(alias)
    if (key) {
      index.set(key, code)
    }
  }

  for (const country of countries) {
    addAlias(country.name.common, country.cca2)
    addAlias(country.name.official, country.cca2)

    for (const alias of country.altSpellings ?? []) {
      addAlias(alias, country.cca2)
    }
  }

  for (const [alias, code] of Object.entries(customAliases)) {
    addAlias(alias, code)
  }

  return index
}

const resolveCountryCode = (title, countryIndex) => {
  const direct = countryIndex.get(normalizeKey(title))
  if (direct) {
    return direct
  }

  const stripped = cleanText(title).replace(/\s*\([^)]*\)\s*/g, ' ').trim()
  return countryIndex.get(normalizeKey(stripped)) ?? null
}

const extractSections = (text) => {
  const matches = [...text.matchAll(/^##\s+(.+)$/gm)]
  const sections = []

  for (let index = 0; index < matches.length; index += 1) {
    const match = matches[index]
    const title = cleanText(match[1])
    const start = match.index + match[0].length
    const end = index + 1 < matches.length ? matches[index + 1].index : text.length
    sections.push({
      title,
      body: text.slice(start, end).trim(),
    })
  }

  return sections
}

const splitSubsections = (body) => {
  const matches = [...body.matchAll(/^###\s+(.+)$/gm)]

  if (matches.length === 0) {
    return { intro: body, sections: {} }
  }

  const intro = body.slice(0, matches[0].index).trim()
  const sections = {}

  for (let index = 0; index < matches.length; index += 1) {
    const match = matches[index]
    const title = normalizeKey(match[1])
    const start = match.index + match[0].length
    const end = index + 1 < matches.length ? matches[index + 1].index : body.length
    sections[title] = body.slice(start, end).trim()
  }

  return { intro, sections }
}

const parseKeyValueList = (block = '') => {
  const result = {}

  for (const line of cleanText(block).split('\n')) {
    const trimmed = line.trim()
    if (!trimmed.startsWith('- ')) {
      continue
    }

    const content = trimmed.slice(2).trim()
    const separatorIndex = content.indexOf(':')
    if (separatorIndex === -1) {
      continue
    }

    const key = content.slice(0, separatorIndex).trim()
    const value = content.slice(separatorIndex + 1).trim()
    result[normalizeKey(key)] = value
  }

  return result
}

const parseOperators = (block = '') => {
  const operators = []

  for (const line of cleanText(block).split('\n')) {
    const trimmed = line.trim()
    if (!trimmed.startsWith('- ')) {
      continue
    }

    const content = trimmed.slice(2).trim()
    if (
      /^(operator|operators?|note|notes|others|prepaid dominan)/i.test(content)
    ) {
      continue
    }

    const name = content
      .split('|')[0]
      .replace(/\s+[–-]\s+.*$/g, '')
      .replace(/:\s*[^:]*$/g, '')
      .trim()

    if (name) {
      operators.push(name)
    }
  }

  return dedupeStrings(operators)
}

const parseAggregators = (block = '') => {
  const local = []
  const international = []
  let mode = null

  for (const rawLine of cleanText(block).split('\n')) {
    const trimmed = rawLine.trim()
    if (!trimmed) {
      continue
    }

    if (/^local aggregators:?$/i.test(trimmed)) {
      mode = 'local'
      continue
    }

    if (/^international aggregators:?$/i.test(trimmed)) {
      mode = 'international'
      continue
    }

    if (trimmed.startsWith('- ')) {
      const content = trimmed.slice(2).trim()

      if (/^local:/i.test(content)) {
        local.push(...extractNames(content.replace(/^local:\s*/i, '')))
        mode = null
        continue
      }

      if (/^international:/i.test(content)) {
        international.push(...extractNames(content.replace(/^international:\s*/i, '')))
        mode = null
        continue
      }

      if (mode === 'local') {
        local.push(...extractNames(content))
        continue
      }

      if (mode === 'international') {
        international.push(...extractNames(content))
      }
    }
  }

  return {
    local: dedupeStrings(local),
    international: dedupeStrings(international),
  }
}

const parseInsight = (block = '') =>
  cleanText(
    block
      .split('\n')
      .map((line) => line.replace(/^- /, '').trim())
      .filter(Boolean)
      .join(' '),
  )

const parseBooleanCapability = (value = '') => {
  const normalized = normalizeKey(value)

  if (!normalized || normalized === 'unknown') {
    return null
  }

  if (
    normalized.includes('yes') ||
    normalized.includes('available') ||
    normalized.includes('active') ||
    normalized.includes('full')
  ) {
    return true
  }

  if (
    normalized.includes('no') ||
    normalized.includes('none') ||
    normalized.includes('not available')
  ) {
    return false
  }

  if (normalized.includes('partial') || normalized.includes('limited')) {
    return true
  }

  return null
}

const cleanMetaTail = (value = '') =>
  cleanText(value)
    .replace(/Last Updated:[^.]+/gi, '')
    .replace(/Confidence(?: Level)?:[^.]+/gi, '')
    .replace(/\s+-\s*$/g, '')
    .replace(/\s+/g, ' ')
    .trim()

const inferRegulatorFromInsight = (value = '') => {
  const match = value.match(/\b([A-Z][A-Z&]{1,8}) is the regulator\b/)
  return match ? match[1] : null
}

const parseOperatorsDetailed = (block = '') => {
  const operators = []

  for (const line of cleanText(block).split('\n')) {
    const trimmed = line.trim()
    if (!trimmed.startsWith('- ')) {
      continue
    }

    const content = trimmed.slice(2).trim()
    if (
      /^(operator|operators?|note|notes|others|prepaid dominance)/i.test(content)
    ) {
      continue
    }

    const name = content
      .split('|')[0]
      .replace(/\s+[\u2013-]\s+.*$/g, '')
      .replace(/:\s*[^:]*$/g, '')
      .trim()

    if (!name || invalidNamePattern.test(name)) {
      continue
    }

    const notes = cleanText(
      content
        .replace(name, '')
        .replace(/^[|:\-\s]+/, ''),
    )

    if (!operators.some((operator) => operator.name === name)) {
      operators.push({
        name,
        notes: notes || null,
      })
    }
  }

  return operators
}

const parseAggregatorsDetailed = (block = '') => {
  const local = []
  const international = []
  let mode = null

  const pushAggregator = (target, name, notes = null) => {
    if (!name || invalidNamePattern.test(name)) {
      return
    }

    if (!target.some((aggregator) => aggregator.name === name)) {
      target.push({
        name,
        notes: notes || null,
      })
    }
  }

  for (const rawLine of cleanText(block).split('\n')) {
    const trimmed = rawLine.trim()
    if (!trimmed) {
      continue
    }

    if (/^local aggregators:?$/i.test(trimmed)) {
      mode = 'local'
      continue
    }

    if (/^international aggregators:?$/i.test(trimmed)) {
      mode = 'international'
      continue
    }

    if (!trimmed.startsWith('- ')) {
      continue
    }

    const content = trimmed.slice(2).trim()

    if (/^local:/i.test(content)) {
      for (const name of extractNames(content.replace(/^local:\s*/i, ''))) {
        pushAggregator(local, name)
      }
      mode = null
      continue
    }

    if (/^international:/i.test(content)) {
      for (const name of extractNames(content.replace(/^international:\s*/i, ''))) {
        pushAggregator(international, name)
      }
      mode = null
      continue
    }

    if (mode === 'local') {
      for (const name of extractNames(content)) {
        pushAggregator(
          local,
          name,
          cleanText(content.replace(name, '').replace(/^[|:\-\s]+/, '')) || null,
        )
      }
      continue
    }

    if (mode === 'international') {
      for (const name of extractNames(content)) {
        pushAggregator(
          international,
          name,
          cleanText(content.replace(name, '').replace(/^[|:\-\s]+/, '')) || null,
        )
      }
    }
  }

  return { local, international }
}

const parseRecord = (title, body, countryIndex) => {
  const code = resolveCountryCode(title, countryIndex)
  if (!code) {
    return null
  }

  const { intro, sections } = splitSubsections(body)
  const metadata = parseKeyValueList(intro)
  const statusFields = parseKeyValueList(sections['market status'])
  const subscriberFields = parseKeyValueList(sections['subscriber data'])
  const billingFields = parseKeyValueList(sections['billing capabilities'])
  const regulationFields = parseKeyValueList(sections['regulation compliance'])
  const commercialFields = parseKeyValueList(sections['commercial assessment'])
  const metaFields = parseKeyValueList(sections.meta)
  const aggregators = parseAggregatorsDetailed(sections.aggregators)
  const operators = parseOperatorsDetailed(sections.operators)
  const insight = cleanMetaTail(parseInsight(sections['market insights']))
  const confidence = normalizeConfidence(
    metadata['source confidence'] ?? metaFields['confidence level'],
  )
  const readiness = enumFromText(statusFields['market readiness'])
  const risk = enumFromText(statusFields['risk level'])
  const marketScore =
    firstNumber(statusFields['market score']) ??
    firstNumber(metadata['observed market scores across sources'])

  const walletField =
    billingFields['wallet billing'] ?? billingFields['wallet billing strong']

  const sourceLabels = dedupeStrings(
    [
      metadata['canonical source'],
      ...splitList(metadata['supporting sources']),
    ].filter(Boolean),
  )

  const regulationNotes = [
    regulationFields.compliance,
    regulationFields['key requirements'],
    regulationFields['notable compliance'],
    regulationFields['known enforcement strictness'],
  ]
    .filter(Boolean)
    .join(' ')

  const pricingModels = parsePricingModels(commercialFields['pricing models'])
  const opportunity = inferOpportunity(marketScore, readiness, risk)
  const entryEase = inferEntryEase(risk, readiness)
  const combinedInsightText = [
    insight,
    commercialFields['typical pricing models'],
    commercialFields['pricing models'],
  ]
    .filter(Boolean)
    .join(' ')

  return {
    code,
    region: sentenceCase(metadata.region ?? ''),
    status: normalizeStatus(statusFields['vas dcb status']),
    marketScore,
    confidence,
    dcbReadiness: readiness,
    marketStatus: {
      dcbStatus: normalizeStatus(statusFields['vas dcb status']),
      signalStrength: normalizeSignal(statusFields['signal strength']),
      readiness,
      risk,
    },
    subscriberEstimate:
      subscriberFields['total mobile subscribers'] ??
      subscriberFields['total mobile subscribers sim unique'] ??
      null,
    commercial: {
      arpuLevel: normalizeArpu(commercialFields['arpu expectations']),
      conversionDifficulty: normalizeConversionDifficulty(
        commercialFields['conversion difficulty'],
      ),
      pricingModel: pricingModels,
    },
    operators: operators.map((operator) => ({
      name: operator.name,
      subscriberEstimate: null,
      dcb: true,
      notes: operator.notes || 'Public operator reference from source.',
    })),
    aggregators: [
      ...aggregators.local.map((aggregator) => ({
        name: aggregator.name,
        scope: 'local',
        status: 'listed',
        notes: aggregator.notes || 'Listed in source.',
      })),
      ...aggregators.international.map((aggregator) => ({
        name: aggregator.name,
        scope: 'international',
        status: 'listed',
        notes: aggregator.notes || 'Listed in source.',
      })),
    ],
    capabilities: {
      dcb:
        parseBooleanCapability(
          billingFields['direct carrier billing'] ?? billingFields.dcb,
        ) ?? false,
      psms:
        parseBooleanCapability(
          billingFields['premium sms'] ?? billingFields.psms,
        ) ?? false,
      wallet: normalizeWallet(walletField),
      heSupport: enumFromText(
        billingFields['he support likelihood'] ?? billingFields['header enrichment'],
        'unknown',
      ),
    },
    regulation: {
      regulator:
        regulationFields.regulator ??
        regulationFields['key regulator'] ??
        inferRegulatorFromInsight(insight) ??
        'Pending',
      strictness: normalizeStrictness(
        regulationFields['enforcement strictness'] ??
          regulationFields['known enforcement strictness'],
      ),
      riskLevel: risk,
      notes: cleanText(regulationNotes),
    },
    notes: insight || null,
    commercialNote: cleanText(
      [
        insight,
        commercialFields['pricing models']
          ? `Pricing models: ${commercialFields['pricing models']}.`
          : null,
        commercialFields['arpu expectations']
          ? `ARPU: ${commercialFields['arpu expectations']}.`
          : null,
        commercialFields['conversion difficulty']
          ? `Conversion difficulty: ${commercialFields['conversion difficulty']}.`
          : null,
      ]
        .filter(Boolean)
        .join(' '),
    ),
    opportunity,
    entryEase,
    recommendedEntry: inferRecommendedEntry({
      aggregatorCount: aggregators.local.length + aggregators.international.length,
      wallet: normalizeWallet(walletField),
      risk,
      confidence,
    }),
    bestVerticals: inferBestVerticals(combinedInsightText),
    sources: sourceLabels.map((label) => ({
      type: 'master-markdown',
      label,
      confidence,
    })),
    privateTags: [],
    _quality:
      (confidenceRank[confidence] ?? 0) * 10 +
      (marketScore ?? 0) / 10 +
      operators.length +
      aggregators.local.length +
      aggregators.international.length +
      (insight ? 2 : 0) +
      (pricingModels.length > 0 ? 1 : 0),
  }
}

const isEmptyValue = (value) => {
  if (value === null || value === undefined) {
    return true
  }

  if (typeof value === 'string') {
    return value === '' || value === 'unknown' || value === 'Pending'
  }

  if (Array.isArray(value)) {
    return value.length === 0
  }

  if (typeof value === 'object') {
    return Object.keys(value).length === 0
  }

  return false
}

const mergeRecords = (records) => {
  const sorted = [...records].sort((left, right) => right._quality - left._quality)
  const [primary, ...rest] = sorted
  const merged = structuredClone(primary)

  for (const candidate of rest) {
    for (const [key, value] of Object.entries(candidate)) {
      if (key === '_quality' || key === 'code') {
        continue
      }

      if (Array.isArray(value)) {
        if (key === 'sources') {
          merged.sources = dedupeStrings([
            ...(merged.sources ?? []).map((item) => JSON.stringify(item)),
            ...value.map((item) => JSON.stringify(item)),
          ]).map((item) => JSON.parse(item))
          continue
        }

        if (isEmptyValue(merged[key]) && !isEmptyValue(value)) {
          merged[key] = value
        }
        continue
      }

      if (
        value &&
        typeof value === 'object' &&
        !Array.isArray(value) &&
        merged[key] &&
        typeof merged[key] === 'object' &&
        !Array.isArray(merged[key])
      ) {
        merged[key] = {
          ...value,
          ...merged[key],
        }
        for (const [nestedKey, nestedValue] of Object.entries(value)) {
          if (isEmptyValue(merged[key][nestedKey]) && !isEmptyValue(nestedValue)) {
            merged[key][nestedKey] = nestedValue
          }
        }
        continue
      }

      if (isEmptyValue(merged[key]) && !isEmptyValue(value)) {
        merged[key] = value
      }
    }
  }

  delete merged._quality
  return merged
}

export const parseMasterSourceMarkets = (countries) => {
  const markdown = fs.readFileSync(sourcePath, 'utf8')
  const countryIndex = buildCountryIndex(countries)
  const grouped = new Map()

  for (const section of extractSections(markdown)) {
    if (ignoredHeadings.has(normalizeKey(section.title))) {
      continue
    }

    const record = parseRecord(section.title, section.body, countryIndex)
    if (!record) {
      continue
    }

    if (excludedMarketCodes.has(record.code)) {
      continue
    }

    if (!grouped.has(record.code)) {
      grouped.set(record.code, [])
    }

    grouped.get(record.code).push(record)
  }

  return Object.fromEntries(
    [...grouped.entries()].map(([code, records]) => [code, mergeRecords(records)]),
  )
}
