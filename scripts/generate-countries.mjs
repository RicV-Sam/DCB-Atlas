import fs from 'node:fs'
import path from 'node:path'
import countries from 'world-countries'

const outputPath = path.resolve('src/data/countries.json')

const slugify = (value) =>
  value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const normalizePricingModel = (values = []) =>
  values.map((value) => value.toLowerCase())

const normalizeEntry = (value) => value.toLowerCase()

const normalizeConfidence = (value) => value.toLowerCase()

const normalizeMarket = (market) => ({
  status: market.marketStatus.dcbStatus.toLowerCase() === 'live' ? 'live' : 'limited',
  marketScore: market.marketScore,
  riskScore:
    market.marketStatus.risk === 'low'
      ? 32
      : market.marketStatus.risk === 'medium'
        ? 54
        : 74,
  opportunityScore:
    market.opportunity === 'high'
      ? Math.min(92, market.marketScore + 5)
      : market.opportunity === 'medium'
        ? Math.max(60, market.marketScore - 2)
        : Math.max(48, market.marketScore - 8),
  confidence: normalizeConfidence(market.confidence),
  dcbReadiness: market.marketStatus.readiness.toLowerCase(),
  marketStatus: {
    dcbStatus: market.marketStatus.dcbStatus.toLowerCase(),
    signalStrength: market.marketStatus.signalStrength.toLowerCase(),
    readiness: market.marketStatus.readiness.toLowerCase(),
    risk: market.marketStatus.risk.toLowerCase(),
  },
  commercial: {
    arpuLevel: market.commercial.arpuLevel.toLowerCase(),
    conversionDifficulty: market.commercial.conversionDifficulty.toLowerCase(),
    pricingModel: normalizePricingModel(market.commercial.pricingModel),
  },
  operators: market.operators.map((name) => ({
    name,
    subscriberEstimate: null,
    dcb: true,
    notes: 'Normalised priority-market operator reference.',
  })),
  aggregators: [
    ...market.aggregators.local.map((name) => ({
      name,
      scope: 'local',
      status: 'listed',
      notes: 'Normalised local aggregator reference.',
    })),
    ...market.aggregators.international.map((name) => ({
      name,
      scope: 'international',
      status: 'listed',
      notes: 'Normalised international aggregator reference.',
    })),
  ],
  capabilities: {
    dcb: market.capabilities.dcb,
    psms: market.capabilities.psms,
    wallet: market.capabilities.wallet.toLowerCase(),
    heSupport: market.capabilities.heSupport.toLowerCase(),
  },
  regulation: {
    regulator: market.regulation.regulator,
    strictness: market.regulation.strictness.toLowerCase(),
    riskLevel: market.marketStatus.risk.toLowerCase(),
    notes: market.regulation.notes,
  },
  notes: market.insight,
  commercialNote: `Recommended route: ${market.recommendedEntry.replace(/_/g, ' ')}. ${market.insight}`,
  opportunity: market.opportunity.toLowerCase(),
  entryEase: market.entryEase.toLowerCase(),
  recommendedEntry: normalizeEntry(market.recommendedEntry),
  bestVerticals: market.bestVerticals.map((value) => value.toLowerCase()),
  sources: [
    {
      type: 'normalised-dataset',
      label: 'Africa Top 10 normalised editorial dataset',
      confidence: normalizeConfidence(market.confidence),
    },
  ],
})

const africaTop10 = {
  ZA: normalizeMarket({
    marketScore: 82,
    confidence: 'high',
    marketStatus: {
      dcbStatus: 'Live',
      signalStrength: 'Strong',
      readiness: 'High',
      risk: 'medium',
    },
    commercial: {
      arpuLevel: 'high',
      conversionDifficulty: 'moderate',
      pricingModel: ['daily', 'weekly', 'monthly'],
    },
    operators: ['Vodacom', 'MTN', 'Telkom', 'Cell C'],
    aggregators: {
      local: ['Mobivate', 'Clickatell'],
      international: ['Digital Virgo', 'Bango', 'DIMOCO', 'Fortumo'],
    },
    capabilities: {
      dcb: true,
      psms: true,
      wallet: 'limited',
      heSupport: 'high',
    },
    regulation: {
      regulator: 'ICASA',
      strictness: 'high',
      notes: 'WASPA compliance, strict opt-in, strong enforcement',
    },
    insight:
      'Most mature DCB market in Africa with strong infrastructure and high monetisation potential, but strict compliance increases operational complexity.',
    opportunity: 'high',
    entryEase: 'moderate',
    recommendedEntry: 'aggregator',
    bestVerticals: ['gaming', 'streaming', 'subscriptions'],
  }),
  NG: normalizeMarket({
    marketScore: 78,
    confidence: 'high',
    marketStatus: {
      dcbStatus: 'Live',
      signalStrength: 'Strong',
      readiness: 'High',
      risk: 'medium',
    },
    commercial: {
      arpuLevel: 'medium',
      conversionDifficulty: 'hard',
      pricingModel: ['daily', 'weekly', 'monthly'],
    },
    operators: ['MTN', 'Airtel', 'Globacom', '9mobile'],
    aggregators: {
      local: ['Terragon', 'VAS2Nets'],
      international: ['Digital Virgo', 'Bango', 'Fortumo'],
    },
    capabilities: {
      dcb: true,
      psms: true,
      wallet: 'growing',
      heSupport: 'medium',
    },
    regulation: {
      regulator: 'NCC',
      strictness: 'high',
      notes: 'DND registry, strict VAS enforcement',
    },
    insight:
      'Largest African market with massive scale, but trust issues and regulation make conversion difficult. Volume-driven strategy required.',
    opportunity: 'high',
    entryEase: 'difficult',
    recommendedEntry: 'direct_operator',
    bestVerticals: ['gaming', 'religious', 'entertainment'],
  }),
  KE: normalizeMarket({
    marketScore: 85,
    confidence: 'high',
    marketStatus: {
      dcbStatus: 'Live',
      signalStrength: 'Strong',
      readiness: 'High',
      risk: 'low',
    },
    commercial: {
      arpuLevel: 'medium',
      conversionDifficulty: 'easy',
      pricingModel: ['daily', 'weekly', 'monthly'],
    },
    operators: ['Safaricom', 'Airtel', 'Telkom'],
    aggregators: {
      local: ['Cellulant'],
      international: ['Bango', 'Fortumo'],
    },
    capabilities: {
      dcb: true,
      psms: true,
      wallet: 'dominant',
      heSupport: 'high',
    },
    regulation: {
      regulator: 'CA',
      strictness: 'high',
      notes: 'Strong mobile money regulation',
    },
    insight:
      'Best mobile-first ecosystem globally due to M-Pesa. Extremely strong monetisation if positioned correctly.',
    opportunity: 'high',
    entryEase: 'easy',
    recommendedEntry: 'hybrid',
    bestVerticals: ['fintech', 'gaming', 'education'],
  }),
  EG: normalizeMarket({
    marketScore: 80,
    confidence: 'high',
    marketStatus: {
      dcbStatus: 'Live',
      signalStrength: 'Strong',
      readiness: 'High',
      risk: 'medium',
    },
    commercial: {
      arpuLevel: 'medium',
      conversionDifficulty: 'moderate',
      pricingModel: ['daily', 'weekly', 'monthly'],
    },
    operators: ['Vodafone Egypt', 'Orange', 'Etisalat', 'WE'],
    aggregators: {
      local: ['tpay'],
      international: ['Digital Virgo', 'Bango'],
    },
    capabilities: {
      dcb: true,
      psms: true,
      wallet: 'growing',
      heSupport: 'medium',
    },
    regulation: {
      regulator: 'NTRA',
      strictness: 'high',
      notes: 'Content sensitivity and licensing required',
    },
    insight:
      'Large Arabic market with strong DCB adoption but heavy regulatory and content restrictions.',
    opportunity: 'high',
    entryEase: 'moderate',
    recommendedEntry: 'aggregator',
    bestVerticals: ['gaming', 'religious', 'video'],
  }),
  MA: normalizeMarket({
    marketScore: 79,
    confidence: 'high',
    marketStatus: {
      dcbStatus: 'Live',
      signalStrength: 'Strong',
      readiness: 'High',
      risk: 'low',
    },
    commercial: {
      arpuLevel: 'medium',
      conversionDifficulty: 'easy',
      pricingModel: ['daily', 'weekly', 'monthly'],
    },
    operators: ['Maroc Telecom', 'Orange', 'Inwi'],
    aggregators: {
      local: ['tpay'],
      international: ['Bango', 'DIMOCO'],
    },
    capabilities: {
      dcb: true,
      psms: true,
      wallet: 'emerging',
      heSupport: 'medium',
    },
    regulation: {
      regulator: 'ANRT',
      strictness: 'medium',
      notes: 'Stable regulatory environment',
    },
    insight:
      'Strong DCB market with low card penetration and good gaming monetisation potential.',
    opportunity: 'high',
    entryEase: 'easy',
    recommendedEntry: 'aggregator',
    bestVerticals: ['gaming', 'entertainment'],
  }),
  GH: normalizeMarket({
    marketScore: 72,
    confidence: 'medium-high',
    marketStatus: {
      dcbStatus: 'Live',
      signalStrength: 'Medium',
      readiness: 'Medium',
      risk: 'medium',
    },
    commercial: {
      arpuLevel: 'medium',
      conversionDifficulty: 'moderate',
      pricingModel: ['daily', 'weekly'],
    },
    operators: ['MTN', 'Telecel', 'AirtelTigo'],
    aggregators: {
      local: ['Hubtel'],
      international: ['Digital Virgo', 'Bango'],
    },
    capabilities: {
      dcb: true,
      psms: true,
      wallet: 'strong',
      heSupport: 'medium',
    },
    regulation: {
      regulator: 'NCA',
      strictness: 'medium',
      notes: 'Improving regulatory environment',
    },
    insight:
      'Growing market with strong mobile money usage and relatively low fraud compared to Nigeria.',
    opportunity: 'medium',
    entryEase: 'moderate',
    recommendedEntry: 'aggregator',
    bestVerticals: ['sports', 'music', 'finance'],
  }),
  TZ: normalizeMarket({
    marketScore: 68,
    confidence: 'medium-high',
    marketStatus: {
      dcbStatus: 'Live',
      signalStrength: 'Medium',
      readiness: 'Medium',
      risk: 'medium',
    },
    commercial: {
      arpuLevel: 'low',
      conversionDifficulty: 'moderate',
      pricingModel: ['daily', 'weekly'],
    },
    operators: ['Vodacom', 'Airtel', 'Tigo'],
    aggregators: {
      local: ['Selcom'],
      international: ['Digital Virgo', 'Bango'],
    },
    capabilities: {
      dcb: true,
      psms: true,
      wallet: 'strong',
      heSupport: 'medium',
    },
    regulation: {
      regulator: 'TCRA',
      strictness: 'medium',
      notes: 'Content approval required',
    },
    insight:
      'Mobile money dominates, making DCB secondary. Requires strong localisation strategy.',
    opportunity: 'medium',
    entryEase: 'moderate',
    recommendedEntry: 'hybrid',
    bestVerticals: ['agriculture', 'finance', 'sports'],
  }),
  UG: normalizeMarket({
    marketScore: 65,
    confidence: 'medium',
    marketStatus: {
      dcbStatus: 'Live',
      signalStrength: 'Medium',
      readiness: 'Medium',
      risk: 'medium',
    },
    commercial: {
      arpuLevel: 'low',
      conversionDifficulty: 'hard',
      pricingModel: ['daily'],
    },
    operators: ['MTN', 'Airtel'],
    aggregators: {
      local: ['Yo Uganda'],
      international: ['Digital Virgo', 'Bango'],
    },
    capabilities: {
      dcb: true,
      psms: true,
      wallet: 'dominant',
      heSupport: 'medium',
    },
    regulation: {
      regulator: 'UCC',
      strictness: 'medium',
      notes: 'Regulatory unpredictability',
    },
    insight:
      'Mobile money dominates payments, limiting DCB growth potential.',
    opportunity: 'medium',
    entryEase: 'difficult',
    recommendedEntry: 'hybrid',
    bestVerticals: ['religious', 'agriculture'],
  }),
  CI: normalizeMarket({
    marketScore: 70,
    confidence: 'medium-high',
    marketStatus: {
      dcbStatus: 'Live',
      signalStrength: 'Medium',
      readiness: 'Medium',
      risk: 'medium',
    },
    commercial: {
      arpuLevel: 'medium',
      conversionDifficulty: 'moderate',
      pricingModel: ['daily', 'weekly'],
    },
    operators: ['Orange', 'MTN', 'Moov'],
    aggregators: {
      local: ['Cinetpay'],
      international: ['Digital Virgo', 'Bango'],
    },
    capabilities: {
      dcb: true,
      psms: true,
      wallet: 'strong',
      heSupport: 'medium',
    },
    regulation: {
      regulator: 'ARTCI',
      strictness: 'medium',
      notes: 'Regional BCEAO regulation',
    },
    insight:
      'Fastest growing Francophone market with strong mobile money usage and youth population.',
    opportunity: 'medium',
    entryEase: 'moderate',
    recommendedEntry: 'aggregator',
    bestVerticals: ['music', 'gaming', 'sports'],
  }),
  SN: normalizeMarket({
    marketScore: 66,
    confidence: 'medium-high',
    marketStatus: {
      dcbStatus: 'Live',
      signalStrength: 'Medium',
      readiness: 'Medium',
      risk: 'low',
    },
    commercial: {
      arpuLevel: 'low',
      conversionDifficulty: 'moderate',
      pricingModel: ['daily', 'weekly'],
    },
    operators: ['Orange', 'Free', 'Expresso'],
    aggregators: {
      local: ['PayDunya'],
      international: ['Digital Virgo', 'Bango'],
    },
    capabilities: {
      dcb: true,
      psms: true,
      wallet: 'strong',
      heSupport: 'medium',
    },
    regulation: {
      regulator: 'ARTP',
      strictness: 'medium',
      notes: 'Stable regulatory environment',
    },
    insight:
      'Stable market with strong Orange dominance and growing digital ecosystem.',
    opportunity: 'medium',
    entryEase: 'moderate',
    recommendedEntry: 'aggregator',
    bestVerticals: ['gaming', 'education'],
  }),
}

const researchPendingNote =
  'Research pending. This placeholder entry exists so the atlas can show global coverage while the public market profile is still being enriched.'

const baseRecord = (country) => ({
  code: country.cca2,
  mapId: country.ccn3,
  country: country.name.common,
  slug: slugify(country.name.common),
  region: country.region || 'Other',
  status: 'research',
  marketScore: null,
  riskScore: null,
  opportunityScore: null,
  subscriberEstimate: null,
  dcbReadiness: 'unknown',
  confidence: 'pending',
  marketStatus: {
    dcbStatus: 'research',
    signalStrength: 'unknown',
    readiness: 'unknown',
    risk: 'unknown',
  },
  commercial: {
    arpuLevel: 'unknown',
    conversionDifficulty: 'unknown',
    pricingModel: [],
  },
  capabilities: {
    dcb: false,
    psms: false,
    wallet: 'unknown',
    heSupport: 'unknown',
  },
  opportunity: 'unknown',
  entryEase: 'unknown',
  recommendedEntry: 'research',
  bestVerticals: [],
  lastUpdated: '2026-04-19',
  operators: [],
  aggregators: [],
  notes: researchPendingNote,
  commercialNote:
    'Public market briefing not yet published. Contact DCB Atlas for a tailored qualification pass.',
  regulation: {
    regulator: 'Pending',
    strictness: 'unknown',
    riskLevel: 'unknown',
    notes: 'Public-facing compliance summary not yet added.',
  },
  sources: [
    {
      type: 'placeholder',
      label: 'Research pending placeholder',
      confidence: 'pending',
    },
  ],
  privateTags: [],
})

const dataset = countries
  .filter((country) => country.cca2 !== 'AQ')
  .map((country) => {
    const base = baseRecord(country)
    const enriched = africaTop10[country.cca2]

    return enriched
      ? { ...base, ...enriched, lastUpdated: '2026-04-19' }
      : base
  })
  .sort((left, right) => left.country.localeCompare(right.country))

fs.writeFileSync(outputPath, JSON.stringify(dataset, null, 2))
console.log(`Generated ${dataset.length} country records in ${outputPath}`)
