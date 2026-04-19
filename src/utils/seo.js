export const SITE_NAME = 'DCB Atlas'
export const SITE_ORIGIN = 'https://ricv-sam.github.io'
export const BASE_PATH = import.meta.env.BASE_URL
export const SITE_URL = new URL(BASE_PATH, SITE_ORIGIN).toString().replace(/\/$/, '')

export const getCanonicalUrl = (pathname = '/') => {
  const cleanPath = pathname === '/' ? '' : pathname.replace(/^\//, '')
  return cleanPath ? `${SITE_URL}/${cleanPath}` : SITE_URL
}

export const buildWebsiteSchema = ({ description }) => ({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE_NAME,
  url: SITE_URL,
  description,
})

export const buildOrganizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: SITE_NAME,
  url: SITE_URL,
})

export const buildCollectionSchema = ({ name, description, pathname }) => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name,
  description,
  url: getCanonicalUrl(pathname),
})

export const buildBreadcrumbSchema = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: getCanonicalUrl(item.path),
  })),
})
