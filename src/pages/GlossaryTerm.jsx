import { Link, Navigate, useParams } from 'react-router-dom'
import { PageMetadata } from '../components/shared/PageMetadata'
import { getGlossaryTerm } from '../data/glossary'
import {
  buildBreadcrumbSchema,
  buildDefinedTermSchema,
} from '../utils/seo'

const chromeArticlePath =
  '/insights/chrome-https-msisdn-header-enrichment-dcb-impact'

const complianceRelatedTerms = new Set(['direct-carrier-billing', 'aggregator'])
const flowRelatedTerms = new Set(['direct-carrier-billing', 'aggregator'])

export function GlossaryTermPage() {
  const { slug } = useParams()
  const term = getGlossaryTerm(slug)

  if (!term) return <Navigate to="/glossary" replace />

  const pathname = `/glossary/${term.slug}/`
  const metaDescription = `${term.name} explained in plain English for DCB, VAS, mobile operator billing, merchants, aggregators, and telecom commercial teams.`

  return (
    <div className="atlas-container space-y-8">
      <PageMetadata
        title={`${term.name} Explained`}
        description={metaDescription}
        pathname={pathname}
        structuredData={[
          buildDefinedTermSchema({
            name: term.name,
            description: term.description,
            pathname,
          }),
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Glossary', path: '/glossary/' },
            { name: term.name, path: pathname },
          ]),
        ]}
      />

      <article className="atlas-panel px-6 py-8 sm:px-8 sm:py-10">
        <Link className="atlas-link" to="/glossary">
          Back to glossary
        </Link>
        <p className="atlas-eyebrow mt-6">Glossary</p>
        <h1 className="atlas-title mt-3 text-4xl font-semibold text-[#0d1b24] sm:text-5xl">
          {term.name}
        </h1>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-[#35505f]">
          {term.description}
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="space-y-8 text-base leading-8 text-[#35505f]">
            <section>
              <h2 className="atlas-title text-3xl font-semibold text-[#0d1b24]">
                Plain-English definition
              </h2>
              <p className="mt-4">
                {term.name} is best understood through how it affects the user,
                the operator, and the commercial flow. In DCB and VAS, the term is
                not just technical vocabulary; it shapes how a user is identified,
                how consent is captured, how a charge is confirmed, and how revenue
                is reported or settled between parties.
              </p>
              <p className="mt-4">{term.description}</p>
            </section>

            <section>
              <h2 className="atlas-title text-3xl font-semibold text-[#0d1b24]">
                Why it matters in DCB and VAS
              </h2>
              <p className="mt-4">{term.whyItMatters}</p>
              <p className="mt-4">
                For operators, the topic usually connects to subscriber trust,
                revenue protection, compliance, and partner control. For merchants
                and aggregators, it connects to conversion, user experience,
                reporting accuracy, support, and whether a flow can scale across
                markets without becoming confusing or fragile.
              </p>
            </section>

            <section>
              <h2 className="atlas-title text-3xl font-semibold text-[#0d1b24]">
                How it is used
              </h2>
              <p className="mt-4">{term.used}</p>
              <p className="mt-4">
                The exact implementation varies by country, operator, aggregator,
                product type, and compliance model. That is why DCB Atlas treats
                these terms as commercial operating concepts, not only dictionary
                entries.
              </p>
            </section>

            <section>
              <h2 className="atlas-title text-3xl font-semibold text-[#0d1b24]">
                Common misunderstandings
              </h2>
              <ul className="mt-4 space-y-3">
                {term.misunderstandings.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>

            <section>
              <h2 className="atlas-title text-3xl font-semibold text-[#0d1b24]">
                Related terms
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {term.related.map((item) => {
                  const related = item.toLowerCase().replace(/ /g, '-')
                  const mappedSlug =
                    related === 'dcb' ? 'direct-carrier-billing' : related
                  return (
                    <Link
                      key={item}
                      className="rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-[#12354a] transition hover:bg-white"
                      to={`/glossary/${mappedSlug}`}
                    >
                      {item}
                    </Link>
                  )
                })}
              </div>
            </section>
          </div>

          <aside className="space-y-4">
            <div className="rounded-[24px] bg-[#12354a] p-5 text-sm leading-7 text-[#f3ead9]">
              <p className="atlas-eyebrow text-[#d8ba7a]">Start here</p>
              <Link
                className="mt-3 inline-flex font-semibold text-white"
                to="/resources/what-is-direct-carrier-billing"
              >
                Read the DCB guide
              </Link>
            </div>
            {complianceRelatedTerms.has(term.slug) ? (
              <div className="rounded-[24px] border border-[#12354a]/10 bg-white/70 p-5 text-sm leading-7 text-[#35505f]">
                <p className="font-semibold text-[#0d1b24]">Compliance basics</p>
                <Link className="atlas-link mt-3" to="/resources/dcb-compliance-basics">
                  Consent, pricing, unsubscribe and user protection
                </Link>
              </div>
            ) : null}
            {flowRelatedTerms.has(term.slug) ? (
              <div className="rounded-[24px] border border-[#12354a]/10 bg-white/70 p-5 text-sm leading-7 text-[#35505f]">
                <p className="font-semibold text-[#0d1b24]">Flow guide</p>
                <Link
                  className="atlas-link mt-3"
                  to="/resources/how-direct-carrier-billing-works"
                >
                  User journey, charging and settlement
                </Link>
              </div>
            ) : null}
            {term.slug === 'direct-carrier-billing' ? (
              <div className="rounded-[24px] border border-[#12354a]/10 bg-white/70 p-5 text-sm leading-7 text-[#35505f]">
                <p className="font-semibold text-[#0d1b24]">Payment comparison</p>
                <Link
                  className="atlas-link mt-3"
                  to="/resources/dcb-vs-card-payments-vs-wallets"
                >
                  DCB vs card payments vs wallets
                </Link>
              </div>
            ) : null}
            <div className="rounded-[24px] border border-[#12354a]/10 bg-white/70 p-5 text-sm leading-7 text-[#35505f]">
              <p className="font-semibold text-[#0d1b24]">Related analysis</p>
              <Link className="atlas-link mt-3" to={chromeArticlePath}>
                Chrome HTTPS and Header Enrichment
              </Link>
            </div>
          </aside>
        </div>
      </article>
    </div>
  )
}
