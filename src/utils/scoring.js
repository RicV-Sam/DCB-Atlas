const statusConfig = {
  live: {
    label: 'Live signal',
    className: 'bg-emerald-100 text-emerald-900 border-emerald-200',
  },
  limited: {
    label: 'Limited signal',
    className: 'bg-amber-100 text-amber-900 border-amber-200',
  },
  research: {
    label: 'Research pending',
    className: 'bg-slate-100 text-slate-700 border-slate-200',
  },
  'high-risk': {
    label: 'High risk',
    className: 'bg-rose-100 text-rose-900 border-rose-200',
  },
  unknown: {
    label: 'Unknown',
    className: 'bg-stone-100 text-stone-700 border-stone-200',
  },
}

const confidenceConfig = {
  high: {
    label: 'High confidence',
    className: 'bg-emerald-100 text-emerald-900 border-emerald-200',
  },
  'medium-high': {
    label: 'Medium-high confidence',
    className: 'bg-sky-100 text-sky-900 border-sky-200',
  },
  medium: {
    label: 'Medium confidence',
    className: 'bg-amber-100 text-amber-900 border-amber-200',
  },
  pending: {
    label: 'Pending',
    className: 'bg-slate-100 text-slate-700 border-slate-200',
  },
}

const readinessConfig = {
  high: {
    label: 'High readiness',
    className: 'bg-emerald-100 text-emerald-900 border-emerald-200',
  },
  medium: {
    label: 'Medium readiness',
    className: 'bg-amber-100 text-amber-900 border-amber-200',
  },
  low: {
    label: 'Low readiness',
    className: 'bg-rose-100 text-rose-900 border-rose-200',
  },
  unknown: {
    label: 'Unknown readiness',
    className: 'bg-slate-100 text-slate-700 border-slate-200',
  },
}

const riskConfig = {
  low: {
    label: 'Low risk',
    className: 'bg-emerald-100 text-emerald-900 border-emerald-200',
  },
  medium: {
    label: 'Medium risk',
    className: 'bg-amber-100 text-amber-900 border-amber-200',
  },
  high: {
    label: 'High risk',
    className: 'bg-rose-100 text-rose-900 border-rose-200',
  },
  unknown: {
    label: 'Risk pending',
    className: 'bg-slate-100 text-slate-700 border-slate-200',
  },
}

const opportunityConfig = {
  high: {
    label: 'High opportunity',
    className: 'bg-[#e8ddc8] text-[#12354a] border-[#d3c1a0]',
  },
  medium: {
    label: 'Medium opportunity',
    className: 'bg-[#f5ecd8] text-[#785a1c] border-[#e6d3aa]',
  },
  low: {
    label: 'Lower opportunity',
    className: 'bg-slate-100 text-slate-700 border-slate-200',
  },
  unknown: {
    label: 'Opportunity pending',
    className: 'bg-slate-100 text-slate-700 border-slate-200',
  },
}

const entryEaseConfig = {
  easy: {
    label: 'Easier entry',
    className: 'bg-emerald-100 text-emerald-900 border-emerald-200',
  },
  moderate: {
    label: 'Moderate entry',
    className: 'bg-amber-100 text-amber-900 border-amber-200',
  },
  difficult: {
    label: 'Difficult entry',
    className: 'bg-rose-100 text-rose-900 border-rose-200',
  },
  unknown: {
    label: 'Entry pending',
    className: 'bg-slate-100 text-slate-700 border-slate-200',
  },
}

const statusColors = {
  live: '#1c8b6a',
  limited: '#c68931',
  research: '#9da8ae',
  'high-risk': '#b85a5a',
  unknown: '#c0b7a9',
}

const opportunityColors = {
  high: '#0f7c67',
  medium: '#7cbca8',
  low: '#d9e3de',
  unknown: '#9da8ae',
}

const riskColors = {
  low: '#1c8b6a',
  medium: '#c68931',
  high: '#b85a5a',
  unknown: '#9da8ae',
}

const readinessColors = {
  high: '#0f7c67',
  medium: '#6b94b3',
  low: '#c6a15a',
  unknown: '#9da8ae',
}

export const mapModes = ['status', 'opportunity', 'risk', 'readiness']

export const getStatusBadge = (status = 'unknown') =>
  statusConfig[status] ?? statusConfig.unknown

export const getConfidenceBadge = (confidence = 'pending') =>
  confidenceConfig[confidence] ?? confidenceConfig.pending

export const getReadinessBadge = (readiness = 'unknown') =>
  readinessConfig[readiness] ?? readinessConfig.unknown

export const getRiskBadge = (riskLevel = 'unknown') =>
  riskConfig[riskLevel] ?? riskConfig.unknown

export const getOpportunityBadge = (opportunity = 'unknown') =>
  opportunityConfig[opportunity] ?? opportunityConfig.unknown

export const getEntryEaseBadge = (entryEase = 'unknown') =>
  entryEaseConfig[entryEase] ?? entryEaseConfig.unknown

export const getResolvedRiskLevel = (market) =>
  market?.regulation?.riskLevel ?? market?.marketStatus?.risk ?? market?.riskScore ?? 'unknown'

export const getResolvedReadiness = (market) =>
  market?.dcbReadiness ?? market?.marketStatus?.readiness ?? 'unknown'

export const getResolvedOpportunityLevel = (market) => {
  if (market?.opportunity && market.opportunity !== 'unknown') {
    return market.opportunity
  }

  const score = market?.opportunityScore ?? market?.marketScore
  if (typeof score !== 'number') return 'unknown'
  if (score >= 75) return 'high'
  if (score >= 50) return 'medium'
  return 'low'
}

export const getResolvedEntryEase = (market) =>
  market?.entryEase ?? market?.entryDifficulty ?? 'unknown'

export const getMapModeLabel = (mode) => {
  switch (mode) {
    case 'opportunity':
      return 'Opportunity'
    case 'risk':
      return 'Risk'
    case 'readiness':
      return 'DCB readiness'
    default:
      return 'Status'
  }
}

export const getMapLegend = (mode) => {
  switch (mode) {
    case 'opportunity':
      return [
        { label: 'High opportunity', color: opportunityColors.high },
        { label: 'Medium opportunity', color: opportunityColors.medium },
        { label: 'Lower opportunity', color: opportunityColors.low },
        { label: 'Research pending', color: opportunityColors.unknown },
      ]
    case 'risk':
      return [
        { label: 'Low risk', color: riskColors.low },
        { label: 'Medium risk', color: riskColors.medium },
        { label: 'High risk', color: riskColors.high },
        { label: 'Research pending', color: riskColors.unknown },
      ]
    case 'readiness':
      return [
        { label: 'High readiness', color: readinessColors.high },
        { label: 'Medium readiness', color: readinessColors.medium },
        { label: 'Low readiness', color: readinessColors.low },
        { label: 'Research pending', color: readinessColors.unknown },
      ]
    default:
      return [
        { label: 'Live signal', color: statusColors.live },
        { label: 'Limited signal', color: statusColors.limited },
        { label: 'High risk / constrained', color: statusColors['high-risk'] },
        { label: 'Research pending', color: statusColors.research },
      ]
  }
}

export const getMapTone = (market, mode = 'status') => {
  if (!market) return statusColors.unknown

  switch (mode) {
    case 'opportunity':
      return opportunityColors[getResolvedOpportunityLevel(market)] ?? opportunityColors.unknown
    case 'risk':
      return riskColors[getResolvedRiskLevel(market)] ?? riskColors.unknown
    case 'readiness':
      return readinessColors[getResolvedReadiness(market)] ?? readinessColors.unknown
    default:
      return statusColors[market.status] ?? statusColors.unknown
  }
}
