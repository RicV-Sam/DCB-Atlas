export function SearchBar({
  value,
  onChange,
  placeholder = 'Search by country, operator, or aggregator',
}) {
  return (
    <label className="block">
      <span className="sr-only">Search markets</span>
      <input
        className="atlas-input"
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </label>
  )
}
