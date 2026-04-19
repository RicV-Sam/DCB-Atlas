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

const researchPendingNote =
  'Research pending. This placeholder entry exists so the atlas can show global coverage while the public market profile is still being enriched.'

const enrichedMarkets = {
  ZA: {
    status: 'live',
    marketScore: 82,
    riskScore: 48,
    opportunityScore: 84,
    subscriberEstimate: 108000000,
    dcbReadiness: 'high',
    confidence: 'observed',
    notes:
      'Placeholder editorial summary based on public industry signals and prior market observation. South Africa is commonly treated as a meaningful VAS and billing market, but operator routes and compliance specifics should be validated before execution.',
    commercialNote:
      'Good shortlisting candidate for teams prioritising scale, mobile familiarity, and structured local validation.',
    operators: [
      {
        name: 'Vodacom',
        subscriberEstimate: 45000000,
        dcb: 'observed',
        notes: 'Illustrative estimate only. Route availability and flow design need live verification.',
      },
      {
        name: 'MTN South Africa',
        subscriberEstimate: 38000000,
        dcb: 'observed',
        notes: 'Public profile suggests strong prepaid relevance, but commercial access should be verified.',
      },
    ],
    aggregators: [
      {
        name: 'Digital Virgo',
        status: 'observed',
        notes: 'Named as an illustrative market participant rather than a verified active route.',
      },
      {
        name: 'MCP',
        status: 'observed',
        notes: 'Included as observed market intelligence context only.',
      },
    ],
    regulation: {
      riskLevel: 'medium',
      notes:
        'Consumer protection, consent clarity, and billing transparency remain core validation themes.',
    },
    sources: [
      {
        type: 'observed',
        label: 'Editorial placeholder built from public industry context',
        confidence: 'observed',
      },
    ],
    privateTags: ['internal-sample'],
  },
  NG: {
    status: 'limited',
    marketScore: 74,
    riskScore: 66,
    opportunityScore: 81,
    subscriberEstimate: 220000000,
    dcbReadiness: 'medium',
    confidence: 'estimated',
    notes:
      'Placeholder summary only. Nigeria shows scale and digital demand, but payment flows, operator access, and compliance execution should be treated as market-specific validation work.',
    commercialNote:
      'High upside market for teams prepared for local complexity and careful route qualification.',
    operators: [
      { name: 'MTN Nigeria', subscriberEstimate: 87000000, dcb: 'estimated', notes: 'Illustrative estimate only.' },
      { name: 'Airtel Nigeria', subscriberEstimate: 61000000, dcb: 'estimated', notes: 'Illustrative estimate only.' },
    ],
    aggregators: [
      { name: 'Local / regional aggregator coverage', status: 'research', notes: 'Named generically until verified.' },
    ],
    regulation: {
      riskLevel: 'high',
      notes: 'Consent, complaint handling, and billing governance should be reviewed before launch planning.',
    },
    sources: [{ type: 'estimated', label: 'Public market-scale placeholder', confidence: 'estimated' }],
  },
  KE: {
    status: 'limited',
    marketScore: 69,
    riskScore: 55,
    opportunityScore: 73,
    subscriberEstimate: 64000000,
    dcbReadiness: 'medium',
    confidence: 'estimated',
    notes:
      'Placeholder summary. Kenya is often evaluated through a broader mobile payments lens, so DCB feasibility should be checked against the exact operator and acquisition model.',
    commercialNote:
      'Potentially interesting where billing alternatives and local digital behaviour are understood early.',
    operators: [
      { name: 'Safaricom', subscriberEstimate: 45000000, dcb: 'estimated', notes: 'Illustrative estimate only.' },
      { name: 'Airtel Kenya', subscriberEstimate: 18000000, dcb: 'research', notes: 'Research pending.' },
    ],
    aggregators: [],
    regulation: {
      riskLevel: 'medium',
      notes: 'Messaging, consent wording, and promotional framing should be locally reviewed.',
    },
    sources: [{ type: 'estimated', label: 'Editorial placeholder', confidence: 'estimated' }],
  },
  EG: {
    status: 'live',
    marketScore: 77,
    riskScore: 58,
    opportunityScore: 79,
    subscriberEstimate: 111000000,
    dcbReadiness: 'high',
    confidence: 'observed',
    notes:
      'Placeholder summary. Egypt is frequently screened as a larger regional market, though route quality, user journey design, and local approvals still need direct confirmation.',
    commercialNote:
      'Useful candidate for regional expansion lists when execution resources can support country-level validation.',
    operators: [
      { name: 'Vodafone Egypt', subscriberEstimate: 48000000, dcb: 'observed', notes: 'Illustrative estimate only.' },
      { name: 'Orange Egypt', subscriberEstimate: 31000000, dcb: 'observed', notes: 'Illustrative estimate only.' },
    ],
    aggregators: [{ name: 'Digital Virgo', status: 'observed', notes: 'Observed as a known name, not a verified route statement.' }],
    regulation: {
      riskLevel: 'medium',
      notes: 'Billing transparency and consumer communication should be treated as mandatory review items.',
    },
    sources: [{ type: 'observed', label: 'Observed industry context', confidence: 'observed' }],
  },
  MA: {
    status: 'limited',
    marketScore: 64,
    riskScore: 47,
    opportunityScore: 67,
    subscriberEstimate: 55000000,
    dcbReadiness: 'medium',
    confidence: 'estimated',
    notes:
      'Placeholder summary. Morocco can be commercially interesting in regional portfolios, but route depth and operator openness should be checked directly.',
    commercialNote: 'More suitable as a qualified follow-on market than a blind first launch.',
    operators: [
      { name: 'Maroc Telecom', subscriberEstimate: 20000000, dcb: 'estimated', notes: 'Illustrative estimate only.' },
      { name: 'Orange Maroc', subscriberEstimate: 16000000, dcb: 'research', notes: 'Research pending.' },
    ],
    aggregators: [],
    regulation: {
      riskLevel: 'medium',
      notes: 'Local offer framing and billing controls should be reviewed before go-to-market decisions.',
    },
    sources: [{ type: 'estimated', label: 'Editorial placeholder', confidence: 'estimated' }],
  },
  SA: {
    status: 'live',
    marketScore: 80,
    riskScore: 57,
    opportunityScore: 82,
    subscriberEstimate: 197000000,
    dcbReadiness: 'high',
    confidence: 'observed',
    notes:
      'Placeholder summary. Saudi Arabia is often viewed as commercially attractive for premium digital products, but local compliance and partner access should be confirmed case by case.',
    commercialNote:
      'Strong shortlist candidate where teams can support high-quality compliance and partner due diligence.',
    operators: [
      { name: 'stc', subscriberEstimate: 26000000, dcb: 'observed', notes: 'Illustrative estimate only.' },
      { name: 'Mobily', subscriberEstimate: 12000000, dcb: 'observed', notes: 'Illustrative estimate only.' },
    ],
    aggregators: [{ name: 'TPAY', status: 'observed', notes: 'Illustrative observed participant, not a verified commercial route statement.' }],
    regulation: {
      riskLevel: 'medium',
      notes: 'Offer wording, subscription clarity, and partner approvals should be carefully validated.',
    },
    sources: [{ type: 'observed', label: 'Observed regional market context', confidence: 'observed' }],
  },
  AE: {
    status: 'limited',
    marketScore: 68,
    riskScore: 42,
    opportunityScore: 70,
    subscriberEstimate: 21000000,
    dcbReadiness: 'medium',
    confidence: 'estimated',
    notes:
      'Placeholder summary. The UAE can be strategically important, but scale and operator route fit should be weighed against commercial objectives.',
    commercialNote: 'Useful for premium and partnership-led discussions more than pure scale plays.',
    operators: [
      { name: 'e&', subscriberEstimate: 13000000, dcb: 'estimated', notes: 'Illustrative estimate only.' },
      { name: 'du', subscriberEstimate: 8000000, dcb: 'research', notes: 'Research pending.' },
    ],
    aggregators: [],
    regulation: {
      riskLevel: 'medium',
      notes: 'Local promotional and subscription practices should be checked before activation.',
    },
    sources: [{ type: 'estimated', label: 'Editorial placeholder', confidence: 'estimated' }],
  },
  IN: {
    status: 'limited',
    marketScore: 79,
    riskScore: 73,
    opportunityScore: 85,
    subscriberEstimate: 1140000000,
    dcbReadiness: 'medium',
    confidence: 'estimated',
    notes:
      'Placeholder summary. India offers exceptional scale, but DCB relevance varies by operator, content type, and commercial structure. This should not be treated as a blanket market-go signal.',
    commercialNote:
      'Strong opportunity if route economics, policy constraints, and traffic quality are validated early.',
    operators: [
      { name: 'Reliance Jio', subscriberEstimate: 470000000, dcb: 'estimated', notes: 'Illustrative estimate only.' },
      { name: 'Bharti Airtel', subscriberEstimate: 390000000, dcb: 'estimated', notes: 'Illustrative estimate only.' },
    ],
    aggregators: [{ name: 'Local aggregator ecosystem', status: 'research', notes: 'Kept generic until verified.' }],
    regulation: {
      riskLevel: 'high',
      notes: 'Policy, billing behaviour, and content category suitability must be reviewed in detail.',
    },
    sources: [{ type: 'estimated', label: 'Public scale placeholder', confidence: 'estimated' }],
  },
  ID: {
    status: 'live',
    marketScore: 78,
    riskScore: 61,
    opportunityScore: 83,
    subscriberEstimate: 197000000,
    dcbReadiness: 'high',
    confidence: 'observed',
    notes:
      'Placeholder summary. Indonesia is often screened as a strong carrier billing market, though operator-level performance assumptions still require validation.',
    commercialNote:
      'Often worth prioritising for teams that can secure reliable local execution and compliance coverage.',
    operators: [
      { name: 'Telkomsel', subscriberEstimate: 159000000, dcb: 'observed', notes: 'Illustrative estimate only.' },
      { name: 'Indosat Ooredoo Hutchison', subscriberEstimate: 100000000, dcb: 'observed', notes: 'Illustrative estimate only.' },
    ],
    aggregators: [{ name: 'TPAY', status: 'observed', notes: 'Observed market name only.' }],
    regulation: {
      riskLevel: 'medium',
      notes: 'Consent design and complaint management should be checked before launch.',
    },
    sources: [{ type: 'observed', label: 'Observed market context', confidence: 'observed' }],
  },
  PK: {
    status: 'limited',
    marketScore: 63,
    riskScore: 69,
    opportunityScore: 71,
    subscriberEstimate: 193000000,
    dcbReadiness: 'medium',
    confidence: 'estimated',
    notes:
      'Placeholder summary. Pakistan shows scale, but payment behaviour, route stability, and compliance suitability should be verified before planning spend.',
    commercialNote:
      'Potential opportunity where teams are comfortable with a more exploratory qualification process.',
    operators: [
      { name: 'Jazz', subscriberEstimate: 71000000, dcb: 'estimated', notes: 'Illustrative estimate only.' },
      { name: 'Zong', subscriberEstimate: 51000000, dcb: 'research', notes: 'Research pending.' },
    ],
    aggregators: [],
    regulation: {
      riskLevel: 'high',
      notes: 'Local rules and user journey suitability should be reviewed before any commercial commitment.',
    },
    sources: [{ type: 'estimated', label: 'Editorial placeholder', confidence: 'estimated' }],
  },
  PH: {
    status: 'live',
    marketScore: 76,
    riskScore: 56,
    opportunityScore: 80,
    subscriberEstimate: 156000000,
    dcbReadiness: 'high',
    confidence: 'observed',
    notes:
      'Placeholder summary. The Philippines is frequently considered for VAS and billing programs, but each operator route should still be checked directly.',
    commercialNote:
      'Good candidate for teams seeking a mix of market familiarity and meaningful mobile reach.',
    operators: [
      { name: 'Globe Telecom', subscriberEstimate: 59000000, dcb: 'observed', notes: 'Illustrative estimate only.' },
      { name: 'Smart', subscriberEstimate: 67000000, dcb: 'observed', notes: 'Illustrative estimate only.' },
    ],
    aggregators: [{ name: 'DOCOMO Digital', status: 'observed', notes: 'Observed market name only.' }],
    regulation: {
      riskLevel: 'medium',
      notes: 'Subscription flow clarity and customer support handling should be confirmed.',
    },
    sources: [{ type: 'observed', label: 'Observed regional billing context', confidence: 'observed' }],
  },
  BR: {
    status: 'limited',
    marketScore: 72,
    riskScore: 63,
    opportunityScore: 77,
    subscriberEstimate: 218000000,
    dcbReadiness: 'medium',
    confidence: 'estimated',
    notes:
      'Placeholder summary. Brazil offers obvious scale, but billing route depth and commercial suitability should be validated at operator level.',
    commercialNote:
      'Compelling enough for shortlist review, but not a market to treat as plug-and-play.',
    operators: [
      { name: 'Vivo', subscriberEstimate: 99000000, dcb: 'estimated', notes: 'Illustrative estimate only.' },
      { name: 'Claro Brasil', subscriberEstimate: 86000000, dcb: 'estimated', notes: 'Illustrative estimate only.' },
    ],
    aggregators: [{ name: 'Regional aggregator coverage', status: 'research', notes: 'Generic placeholder until verified.' }],
    regulation: {
      riskLevel: 'high',
      notes: 'Offer structure, regulatory exposure, and partner quality should be evaluated directly.',
    },
    sources: [{ type: 'estimated', label: 'Editorial placeholder', confidence: 'estimated' }],
  },
  MX: {
    status: 'limited',
    marketScore: 70,
    riskScore: 58,
    opportunityScore: 74,
    subscriberEstimate: 142000000,
    dcbReadiness: 'medium',
    confidence: 'estimated',
    notes:
      'Placeholder summary. Mexico can be strategically interesting for regional coverage, but operator access and billing fit should be qualified before forecasting.',
    commercialNote: 'Reasonable pipeline market where route confirmation happens early.',
    operators: [
      { name: 'Telcel', subscriberEstimate: 83000000, dcb: 'estimated', notes: 'Illustrative estimate only.' },
      { name: 'AT&T Mexico', subscriberEstimate: 23000000, dcb: 'research', notes: 'Research pending.' },
    ],
    aggregators: [],
    regulation: {
      riskLevel: 'medium',
      notes: 'Subscription UX and consumer messaging should be locally reviewed.',
    },
    sources: [{ type: 'estimated', label: 'Editorial placeholder', confidence: 'estimated' }],
  },
  TR: {
    status: 'live',
    marketScore: 75,
    riskScore: 60,
    opportunityScore: 78,
    subscriberEstimate: 89000000,
    dcbReadiness: 'high',
    confidence: 'observed',
    notes:
      'Placeholder summary. Turkey is frequently monitored as an active digital billing environment, but operator and content-level suitability still needs validation.',
    commercialNote:
      'Good candidate for teams already comfortable with regional partner diligence.',
    operators: [
      { name: 'Turkcell', subscriberEstimate: 39000000, dcb: 'observed', notes: 'Illustrative estimate only.' },
      { name: 'Vodafone Turkey', subscriberEstimate: 25000000, dcb: 'observed', notes: 'Illustrative estimate only.' },
    ],
    aggregators: [{ name: 'TPAY', status: 'observed', notes: 'Observed market name only.' }],
    regulation: {
      riskLevel: 'medium',
      notes: 'Commercial flows should be checked for clarity, retention mechanics, and local compliance fit.',
    },
    sources: [{ type: 'observed', label: 'Observed market context', confidence: 'observed' }],
  },
}

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
  lastUpdated: '2026-04-19',
  operators: [],
  aggregators: [],
  notes: researchPendingNote,
  commercialNote:
    'Public market briefing not yet published. Contact DCB Atlas for a tailored qualification pass.',
  regulation: {
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
    const enriched = enrichedMarkets[country.cca2]

    return enriched ? { ...base, ...enriched, lastUpdated: '2026-04-19' } : base
  })
  .sort((left, right) => left.country.localeCompare(right.country))

fs.writeFileSync(outputPath, JSON.stringify(dataset, null, 2))
console.log(`Generated ${dataset.length} country records in ${outputPath}`)
