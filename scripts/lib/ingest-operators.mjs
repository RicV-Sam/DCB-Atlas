import fs from 'node:fs/promises'
import path from 'node:path'

const SOURCE_URL =
  'https://raw.githubusercontent.com/pbakondy/mcc-mnc-list/master/mcc-mnc-list.json'

const cachePath = path.resolve('src/data/sources/mcc-mnc-list.json')

const INVALID_TERMS = ['test', 'unknown', 'satellite', 'maritime', 'trial', 'internal']

const customCountryAliases = {
  'denmark kingdom of denmark': 'DK',
  'united states of america': 'US',
  'russian federation': 'RU',
  'south korea': 'KR',
  'korea republic of': 'KR',
  'iran islamic republic of': 'IR',
  'tanzania united republic of': 'TZ',
  'venezuela bolivarian republic of': 'VE',
  'viet nam': 'VN',
  'lao peoples democratic republic': 'LA',
  'moldova republic of': 'MD',
  'syrian arab republic': 'SY',
  'palestine state of': 'PS',
  'bolivia plurinational state of': 'BO',
}

const normalizeKey = (value = '') =>
  value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/gi, ' ')
    .toLowerCase()
    .trim()

export const isValidOperator = (name) => {
  if (!name) return false

  const normalized = normalizeKey(name)
  return (
    normalized.length > 1 &&
    !INVALID_TERMS.some((term) => normalized.includes(term))
  )
}

const readCache = async () => {
  try {
    const raw = await fs.readFile(cachePath, 'utf8')
    return JSON.parse(raw)
  } catch {
    return null
  }
}

const writeCache = async (records) => {
  await fs.mkdir(path.dirname(cachePath), { recursive: true })
  await fs.writeFile(cachePath, JSON.stringify(records, null, 2))
}

const fetchSource = async () => {
  const response = await fetch(SOURCE_URL)

  if (!response.ok) {
    throw new Error(`Failed to fetch MCC/MNC data (${response.status})`)
  }

  return response.json()
}

const buildCountryIndex = (countries) => {
  const index = new Map()

  const addCountry = (alias, code) => {
    const key = normalizeKey(alias)
    if (key) {
      index.set(key, code)
    }
  }

  for (const country of countries) {
    addCountry(country.cca2, country.cca2)
    addCountry(country.name.common, country.cca2)
    addCountry(country.name.official, country.cca2)

    for (const alias of country.altSpellings ?? []) {
      addCountry(alias, country.cca2)
    }
  }

  for (const [alias, code] of Object.entries(customCountryAliases)) {
    addCountry(alias, code)
  }

  return index
}

const resolveCountryCode = (record, countryIndex) => {
  if (record.countryCode && countryIndex.has(normalizeKey(record.countryCode))) {
    return countryIndex.get(normalizeKey(record.countryCode))
  }

  if (record.countryName && countryIndex.has(normalizeKey(record.countryName))) {
    return countryIndex.get(normalizeKey(record.countryName))
  }

  return null
}

const getDisplayName = (record) => {
  const preferred = [record.brand, record.operator]

  for (const value of preferred) {
    if (isValidOperator(value)) {
      return value.trim()
    }
  }

  return null
}

const isOperational = (record) =>
  normalizeKey(record.status).includes('operational')

const hasValidCode = (record) =>
  typeof record.mcc === 'string' &&
  typeof record.mnc === 'string' &&
  record.mcc.trim() !== '' &&
  record.mnc.trim() !== ''

const normalizeRecords = (records, countryIndex) =>
  records
    .filter((record) => record && hasValidCode(record) && isOperational(record))
    .map((record) => {
      const countryCode = resolveCountryCode(record, countryIndex)
      const name = getDisplayName(record)

      if (!countryCode || !name) {
        return null
      }

      return {
        countryCode,
        countryName: record.countryName?.trim() ?? null,
        name,
        operator: record.operator?.trim() ?? null,
        brand: record.brand?.trim() ?? null,
        mcc: record.mcc.trim(),
        mnc: record.mnc.trim(),
      }
    })
    .filter(Boolean)

const groupOperatorsByCountry = (records) => {
  const grouped = new Map()

  for (const record of records) {
    if (!grouped.has(record.countryCode)) {
      grouped.set(record.countryCode, new Map())
    }

    const operators = grouped.get(record.countryCode)
    const key = normalizeKey(record.name)

    if (!operators.has(key)) {
      operators.set(key, {
        name: record.name,
        operator: record.operator,
        brand: record.brand,
        mccMnc: [],
      })
    }

    const operator = operators.get(key)
    const codeKey = `${record.mcc}-${record.mnc}`

    if (!operator.mccMnc.some((item) => `${item.mcc}-${item.mnc}` === codeKey)) {
      operator.mccMnc.push({
        mcc: record.mcc,
        mnc: record.mnc,
      })
    }
  }

  return Object.fromEntries(
    [...grouped.entries()].map(([countryCode, operators]) => [
      countryCode,
      [...operators.values()].sort((left, right) => left.name.localeCompare(right.name)),
    ]),
  )
}

export const loadOperatorIngestion = async (countries) => {
  const countryIndex = buildCountryIndex(countries)
  let records

  try {
    records = await fetchSource()
    await writeCache(records)
  } catch {
    records = await readCache()
  }

  if (!Array.isArray(records)) {
    return {}
  }

  return groupOperatorsByCountry(normalizeRecords(records, countryIndex))
}

export { SOURCE_URL, cachePath, INVALID_TERMS }
