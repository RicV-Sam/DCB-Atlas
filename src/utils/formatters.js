const hasNumericValue = (value) => {
  if (value === null || value === undefined) {
    return false
  }

  if (typeof value === 'number') {
    return !Number.isNaN(value)
  }

  if (typeof value === 'string') {
    return /^\d+(\.\d+)?$/.test(value.trim())
  }

  return false
}

export const formatNumber = (value) => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return 'Pending research'
  }

  if (typeof value === 'string' && !hasNumericValue(value)) {
    return value
  }

  return new Intl.NumberFormat('en-GB').format(Number(value))
}

export const formatCompactNumber = (value) => {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return 'Pending'
  }

  if (typeof value === 'string' && !hasNumericValue(value)) {
    return value
  }

  return new Intl.NumberFormat('en-GB', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(Number(value))
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
