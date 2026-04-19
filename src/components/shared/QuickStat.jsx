import { formatCompactNumber } from '../../utils/formatters'

export function QuickStat({ label, value }) {
  return (
    <div className="atlas-panel atlas-border px-5 py-5">
      <p className="atlas-eyebrow">{label}</p>
      <p className="atlas-title mt-3 text-3xl font-semibold text-[#0d1b24]">
        {typeof value === 'number' ? formatCompactNumber(value) : value}
      </p>
    </div>
  )
}
