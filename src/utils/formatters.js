export const formatNumber = (value) => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return 'Pending research'
  }

  return new Intl.NumberFormat('en-GB').format(value)
}

export const formatCompactNumber = (value) => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return 'Pending'
  }

  return new Intl.NumberFormat('en-GB', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value)
}

export const formatReadableDate = (value) => {
  if (!value) return 'Pending research'

  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}

export const titleCase = (value = '') =>
  value
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
