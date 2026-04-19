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
      label: 'Africa priority normalised editorial dataset',
      confidence: normalizeConfidence(market.confidence),
    },
  ],
})

const africaPriorityMarkets = {
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
  DZ: normalizeMarket({
    marketScore: 68,
    confidence: 'medium',
    marketStatus: {
      dcbStatus: 'Live',
      signalStrength: 'Medium',
      readiness: 'Medium',
      risk: 'medium',
    },
    commercial: {
      arpuLevel: 'medium',
      conversionDifficulty: 'moderate',
      pricingModel: ['daily', 'weekly', 'monthly'],
    },
    operators: ['Mobilis', 'Djezzy', 'Ooredoo Algeria'],
    aggregators: {
      local: [],
      international: ['Bango', 'Digital Virgo'],
    },
    capabilities: {
      dcb: true,
      psms: true,
      wallet: 'growing',
      heSupport: 'medium',
    },
    regulation: {
      regulator: 'ARPCE',
      strictness: 'medium',
      notes: 'Telecom content controls and approvals can delay launch timing.',
    },
    insight:
      'Treat Algeria as a medium-upside market where launch speed depends on approvals and local execution support. Start with controlled pilots before scaling paid acquisition.',
    opportunity: 'medium',
    entryEase: 'moderate',
    recommendedEntry: 'aggregator',
    bestVerticals: ['gaming', 'video', 'sports'],
  }),
  ET: normalizeMarket({
    marketScore: 62,
    confidence: 'medium',
    marketStatus: {
      dcbStatus: 'Live',
      signalStrength: 'Medium',
      readiness: 'Low',
      risk: 'high',
    },
    commercial: {
      arpuLevel: 'low',
      conversionDifficulty: 'hard',
      pricingModel: ['daily', 'weekly'],
    },
    operators: ['Ethio Telecom', 'Safaricom Ethiopia'],
    aggregators: {
      local: [],
      international: ['Bango'],
    },
    capabilities: {
      dcb: true,
      psms: true,
      wallet: 'growing',
      heSupport: 'low',
    },
    regulation: {
      regulator: 'ECA',
      strictness: 'high',
      notes: 'Market liberalization is evolving and execution conditions can shift quickly.',
    },
    insight:
      'Ethiopia has long-term upside but near-term execution risk. Use low-cost pilot traffic, validate billing reliability early, and avoid aggressive scaling until operational stability improves.',
    opportunity: 'medium',
    entryEase: 'difficult',
    recommendedEntry: 'hybrid',
    bestVerticals: ['education', 'music', 'sports'],
  }),
  AO: normalizeMarket({
    marketScore: 64,
    confidence: 'medium',
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
    operators: ['Unitel', 'Africell Angola', 'Movicel'],
    aggregators: {
      local: [],
      international: ['Digital Virgo', 'Bango'],
    },
    capabilities: {
      dcb: true,
      psms: true,
      wallet: 'emerging',
      heSupport: 'medium',
    },
    regulation: {
      regulator: 'INACOM',
      strictness: 'medium',
      notes: 'Licensing and local partner quality are key execution constraints.',
    },
    insight:
      'Angola can deliver steady returns when partner selection is strong. Focus on weekly plans, fraud controls, and localized lifecycle messaging before broad campaign expansion.',
    opportunity: 'medium',
    entryEase: 'moderate',
    recommendedEntry: 'aggregator',
    bestVerticals: ['gaming', 'music', 'entertainment'],
  }),
  TN: normalizeMarket({
    marketScore: 71,
    confidence: 'medium',
    marketStatus: {
      dcbStatus: 'Live',
      signalStrength: 'Medium',
      readiness: 'Medium',
      risk: 'medium',
    },
    commercial: {
      arpuLevel: 'medium',
      conversionDifficulty: 'moderate',
      pricingModel: ['daily', 'weekly', 'monthly'],
    },
    operators: ['Tunisie Telecom', 'Ooredoo Tunisia', 'Orange Tunisia'],
    aggregators: {
      local: [],
      international: ['Bango', 'DIMOCO'],
    },
    capabilities: {
      dcb: true,
      psms: true,
      wallet: 'growing',
      heSupport: 'medium',
    },
    regulation: {
      regulator: 'INT',
      strictness: 'medium',
      notes: 'Compliance is manageable but content and billing transparency still matter.',
    },
    insight:
      'Tunisia is a practical North Africa expansion step. Run aggregator-first, prioritize transparent offer flows, and optimize conversion through localized creatives and short billing cycles.',
    opportunity: 'medium',
    entryEase: 'moderate',
    recommendedEntry: 'aggregator',
    bestVerticals: ['gaming', 'education', 'video'],
  }),
  CM: normalizeMarket({
    marketScore: 67,
    confidence: 'medium',
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
    operators: ['MTN Cameroon', 'Orange Cameroon', 'Camtel'],
    aggregators: {
      local: [],
      international: ['Digital Virgo', 'Bango'],
    },
    capabilities: {
      dcb: true,
      psms: true,
      wallet: 'strong',
      heSupport: 'medium',
    },
    regulation: {
      regulator: 'ART Cameroon',
      strictness: 'medium',
      notes: 'Regional and operator-level differences can affect execution consistency.',
    },
    insight:
      'Cameroon supports measured growth strategies, especially with bilingual localization. Keep acquisition controlled, test operator-specific journeys, and use retention-heavy product design to protect margins.',
    opportunity: 'medium',
    entryEase: 'moderate',
    recommendedEntry: 'aggregator',
    bestVerticals: ['music', 'gaming', 'sports'],
  }),
  ZM: normalizeMarket({
    marketScore: 63,
    confidence: 'medium',
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
    operators: ['MTN Zambia', 'Airtel Zambia', 'Zamtel'],
    aggregators: {
      local: [],
      international: ['Bango', 'Digital Virgo'],
    },
    capabilities: {
      dcb: true,
      psms: true,
      wallet: 'growing',
      heSupport: 'medium',
    },
    regulation: {
      regulator: 'ZICTA',
      strictness: 'medium',
      notes: 'Operational reliability varies by partner and route setup.',
    },
    insight:
      'Zambia is best approached as a selective medium-return market. Use pilot campaigns, prioritize billing stability, and scale only after strong repeat-payment behavior is proven.',
    opportunity: 'medium',
    entryEase: 'moderate',
    recommendedEntry: 'aggregator',
    bestVerticals: ['sports', 'education', 'entertainment'],
  }),
  RW: normalizeMarket({
    marketScore: 60,
    confidence: 'medium',
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
    operators: ['MTN Rwanda', 'Airtel Rwanda'],
    aggregators: {
      local: [],
      international: ['Bango'],
    },
    capabilities: {
      dcb: true,
      psms: true,
      wallet: 'strong',
      heSupport: 'medium',
    },
    regulation: {
      regulator: 'RURA',
      strictness: 'medium',
      notes: 'Regulatory climate is relatively stable for controlled digital launches.',
    },
    insight:
      'Rwanda is a low-risk, smaller-scale market suited to disciplined testing. Keep product scope narrow, align pricing to wallet habits, and use it as an operational benchmark market.',
    opportunity: 'medium',
    entryEase: 'moderate',
    recommendedEntry: 'hybrid',
    bestVerticals: ['education', 'fintech', 'gaming'],
  }),
  MZ: normalizeMarket({
    marketScore: 59,
    confidence: 'medium',
    marketStatus: {
      dcbStatus: 'Live',
      signalStrength: 'Medium',
      readiness: 'Low',
      risk: 'medium',
    },
    commercial: {
      arpuLevel: 'low',
      conversionDifficulty: 'hard',
      pricingModel: ['daily', 'weekly'],
    },
    operators: ['Vodacom Mozambique', 'Movitel', 'Tmcel'],
    aggregators: {
      local: [],
      international: ['Digital Virgo'],
    },
    capabilities: {
      dcb: true,
      psms: true,
      wallet: 'growing',
      heSupport: 'low',
    },
    regulation: {
      regulator: 'INCM',
      strictness: 'medium',
      notes: 'Execution complexity is mostly operational rather than policy-driven.',
    },
    insight:
      'Mozambique requires conservative rollout assumptions. Start with limited offers, monitor payment reliability closely, and avoid scaling until conversion and retention stabilize across operator routes.',
    opportunity: 'medium',
    entryEase: 'difficult',
    recommendedEntry: 'aggregator',
    bestVerticals: ['sports', 'music', 'entertainment'],
  }),
  BW: normalizeMarket({
    marketScore: 58,
    confidence: 'medium',
    marketStatus: {
      dcbStatus: 'Live',
      signalStrength: 'Medium',
      readiness: 'Low',
      risk: 'low',
    },
    commercial: {
      arpuLevel: 'medium',
      conversionDifficulty: 'moderate',
      pricingModel: ['daily', 'weekly'],
    },
    operators: ['Mascom', 'Orange Botswana', 'BTC Mobile'],
    aggregators: {
      local: [],
      international: ['Bango'],
    },
    capabilities: {
      dcb: true,
      psms: true,
      wallet: 'emerging',
      heSupport: 'low',
    },
    regulation: {
      regulator: 'BOCRA',
      strictness: 'medium',
      notes: 'Stable operating environment but limited scale potential.',
    },
    insight:
      'Botswana is a lower-risk but smaller opportunity market. Use it for focused verticals and efficient campaign structures rather than scale-heavy strategies.',
    opportunity: 'medium',
    entryEase: 'moderate',
    recommendedEntry: 'aggregator',
    bestVerticals: ['education', 'subscriptions', 'gaming'],
  }),
  NA: normalizeMarket({
    marketScore: 57,
    confidence: 'medium',
    marketStatus: {
      dcbStatus: 'Live',
      signalStrength: 'Medium',
      readiness: 'Low',
      risk: 'low',
    },
    commercial: {
      arpuLevel: 'medium',
      conversionDifficulty: 'moderate',
      pricingModel: ['daily', 'weekly'],
    },
    operators: ['MTC', 'TN Mobile', 'Paratus Mobile'],
    aggregators: {
      local: [],
      international: ['Bango'],
    },
    capabilities: {
      dcb: true,
      psms: true,
      wallet: 'emerging',
      heSupport: 'low',
    },
    regulation: {
      regulator: 'CRAN',
      strictness: 'medium',
      notes: 'Regulatory environment is generally stable with moderate compliance overhead.',
    },
    insight:
      'Namibia is suitable for tightly scoped launches with clear unit economics. Keep spend disciplined, optimize for retention, and treat it as a supporting market rather than a primary growth engine.',
    opportunity: 'medium',
    entryEase: 'moderate',
    recommendedEntry: 'aggregator',
    bestVerticals: ['subscriptions', 'education', 'sports'],
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
    const enriched = africaPriorityMarkets[country.cca2]

    return enriched
      ? { ...base, ...enriched, lastUpdated: '2026-04-19' }
      : base
  })
  .sort((left, right) => left.country.localeCompare(right.country))

fs.writeFileSync(outputPath, JSON.stringify(dataset, null, 2))
console.log(`Generated ${dataset.length} country records in ${outputPath}`)
