const statusConfig = {
  live: { label: 'Live signal', className: 'bg-emerald-100 text-emerald-900 border-emerald-200' },
  limited: { label: 'Limited signal', className: 'bg-amber-100 text-amber-900 border-amber-200' },
  research: { label: 'Research pending', className: 'bg-slate-100 text-slate-700 border-slate-200' },
  'high-risk': { label: 'High risk', className: 'bg-rose-100 text-rose-900 border-rose-200' },
  unknown: { label: 'Unknown', className: 'bg-stone-100 text-stone-700 border-stone-200' },
}

const confidenceConfig = {
  high: { label: 'High confidence', className: 'bg-emerald-100 text-emerald-900 border-emerald-200' },
  'medium-high': { label: 'Medium-high confidence', className: 'bg-sky-100 text-sky-900 border-sky-200' },
  medium: { label: 'Medium confidence', className: 'bg-amber-100 text-amber-900 border-amber-200' },
  pending: { label: 'Pending', className: 'bg-slate-100 text-slate-700 border-slate-200' },
}

const readinessConfig = {
  high: { label: 'High readiness', className: 'bg-emerald-100 text-emerald-900 border-emerald-200' },
  medium: { label: 'Medium readiness', className: 'bg-amber-100 text-amber-900 border-amber-200' },
  low: { label: 'Low readiness', className: 'bg-rose-100 text-rose-900 border-rose-200' },
  unknown: { label: 'Unknown readiness', className: 'bg-slate-100 text-slate-700 border-slate-200' },
}

const riskConfig = {
  low: { label: 'Low risk', className: 'bg-emerald-100 text-emerald-900 border-emerald-200' },
  medium: { label: 'Medium risk', className: 'bg-amber-100 text-amber-900 border-amber-200' },
  high: { label: 'High risk', className: 'bg-rose-100 text-rose-900 border-rose-200' },
  unknown: { label: 'Risk pending', className: 'bg-slate-100 text-slate-700 border-slate-200' },
}

const mapStatusColor = {
  live: '#1c8b6a',
  limited: '#c68931',
  research: '#9da8ae',
  'high-risk': '#b85a5a',
  unknown: '#c0b7a9',
}

export const getStatusBadge = (status = 'unknown') =>
  statusConfig[status] ?? statusConfig.unknown

export const getConfidenceBadge = (confidence = 'pending') =>
  confidenceConfig[confidence] ?? confidenceConfig.pending

export const getReadinessBadge = (readiness = 'unknown') =>
  readinessConfig[readiness] ?? readinessConfig.unknown

export const getRiskBadge = (riskLevel = 'unknown') =>
  riskConfig[riskLevel] ?? riskConfig.unknown

export const getMarketTone = (market) =>
  mapStatusColor[market?.status] ?? mapStatusColor.unknown
