import { titleCase } from '../../utils/formatters'

const SelectField = ({ label, value, onChange, options }) => (
  <label className="flex flex-col gap-2">
    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#5b6b73]">
      {label}
    </span>
    <select
      className="atlas-input"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </label>
)

export function FilterBar({ filters, onFilterChange, onReset, options }) {
  return (
    <div className="atlas-panel px-5 py-5 sm:px-6">
      <div className="flex flex-col gap-5">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <SelectField
            label="Region"
            value={filters.region}
            onChange={(value) => onFilterChange('region', value)}
            options={[
              { value: 'all', label: 'All regions' },
              ...options.regions.map((region) => ({ value: region, label: region })),
            ]}
          />
          <SelectField
            label="Status"
            value={filters.status}
            onChange={(value) => onFilterChange('status', value)}
            options={[
              { value: 'all', label: 'All statuses' },
              ...options.statuses.map((status) => ({
                value: status,
                label: titleCase(status),
              })),
            ]}
          />
          <SelectField
            label="DCB readiness"
            value={filters.readiness}
            onChange={(value) => onFilterChange('readiness', value)}
            options={[
              { value: 'all', label: 'All readiness' },
              ...options.readiness.map((readiness) => ({
                value: readiness,
                label: titleCase(readiness),
              })),
            ]}
          />
          <SelectField
            label="Risk level"
            value={filters.riskLevel}
            onChange={(value) => onFilterChange('riskLevel', value)}
            options={[
              { value: 'all', label: 'All risk levels' },
              ...options.riskLevels.map((riskLevel) => ({
                value: riskLevel,
                label: titleCase(riskLevel),
              })),
            ]}
          />
          <SelectField
            label="Confidence"
            value={filters.confidence}
            onChange={(value) => onFilterChange('confidence', value)}
            options={[
              { value: 'all', label: 'All confidence' },
              ...options.confidence.map((confidence) => ({
                value: confidence,
                label: titleCase(confidence),
              })),
            ]}
          />
          <SelectField
            label="Entry ease"
            value={filters.entryEase}
            onChange={(value) => onFilterChange('entryEase', value)}
            options={[
              { value: 'all', label: 'All entry types' },
              ...options.entryEase.map((entryEase) => ({
                value: entryEase,
                label: titleCase(entryEase),
              })),
            ]}
          />
          <SelectField
            label="DCB capability"
            value={filters.dcbCapability}
            onChange={(value) => onFilterChange('dcbCapability', value)}
            options={[
              { value: 'all', label: 'All markets' },
              { value: 'true', label: 'DCB capability present' },
              { value: 'false', label: 'No DCB capability flagged' },
            ]}
          />
          <SelectField
            label="Wallet relevance"
            value={filters.wallet}
            onChange={(value) => onFilterChange('wallet', value)}
            options={[
              { value: 'all', label: 'All wallet contexts' },
              ...options.wallet.map((wallet) => ({
                value: wallet,
                label: titleCase(wallet),
              })),
            ]}
          />
          <SelectField
            label="Aggregator presence"
            value={filters.aggregatorPresence}
            onChange={(value) => onFilterChange('aggregatorPresence', value)}
            options={[
              { value: 'all', label: 'All markets' },
              { value: 'present', label: 'With named aggregators' },
              { value: 'absent', label: 'Without named aggregators' },
            ]}
          />
          <SelectField
            label="Best vertical"
            value={filters.bestVertical}
            onChange={(value) => onFilterChange('bestVertical', value)}
            options={[
              { value: 'all', label: 'All verticals' },
              ...options.bestVerticals.map((vertical) => ({
                value: vertical,
                label: titleCase(vertical),
              })),
            ]}
          />
        </div>

        <div className="flex justify-end">
          <button className="atlas-button-secondary" type="button" onClick={onReset}>
            Reset filters
          </button>
        </div>
      </div>
    </div>
  )
}
