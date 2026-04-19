import { useEffect } from 'react'
import { getCanonicalUrl, SITE_NAME } from '../../utils/seo'

const upsertMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement('meta')
    document.head.appendChild(element)
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })
}

const upsertLink = (selector, attributes) => {
  let element = document.head.querySelector(selector)

  if (!element) {
    element = document.createElement('link')
    document.head.appendChild(element)
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value)
  })
}

export function PageMetadata({
  title,
  description,
  pathname = '/',
  type = 'website',
  structuredData = [],
}) {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
  const canonical = getCanonicalUrl(pathname)
  const schemaItems = Array.isArray(structuredData) ? structuredData : [structuredData]

  useEffect(() => {
    document.title = pageTitle

    upsertMeta('meta[name="description"]', {
      name: 'description',
      content: description,
    })
    upsertMeta('meta[property="og:site_name"]', {
      property: 'og:site_name',
      content: SITE_NAME,
    })
    upsertMeta('meta[property="og:title"]', {
      property: 'og:title',
      content: pageTitle,
    })
    upsertMeta('meta[property="og:description"]', {
      property: 'og:description',
      content: description,
    })
    upsertMeta('meta[property="og:type"]', {
      property: 'og:type',
      content: type,
    })
    upsertMeta('meta[property="og:url"]', {
      property: 'og:url',
      content: canonical,
    })
    upsertMeta('meta[name="twitter:card"]', {
      name: 'twitter:card',
      content: 'summary',
    })
    upsertMeta('meta[name="twitter:title"]', {
      name: 'twitter:title',
      content: pageTitle,
    })
    upsertMeta('meta[name="twitter:description"]', {
      name: 'twitter:description',
      content: description,
    })
    upsertLink('link[rel="canonical"]', {
      rel: 'canonical',
      href: canonical,
    })
  }, [canonical, description, pageTitle, type])

  return (
    <>
      {schemaItems.filter(Boolean).map((item, index) => (
        <script
          key={`${pathname}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  )
}
