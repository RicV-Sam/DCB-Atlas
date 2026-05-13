import { Link } from 'react-router-dom'
import { PageMetadata } from '../components/shared/PageMetadata'
import { SectionHeading } from '../components/shared/SectionHeading'
import { glossaryTerms } from '../data/glossary'
import { buildBreadcrumbSchema, buildCollectionSchema } from '../utils/seo'

const description =
  'Plain-English definitions for Direct Carrier Billing, MSISDN, Header Enrichment, OTP, CAMARA, aggregators, and related VAS concepts.'

export function GlossaryIndexPage() {
  return (
    <div className="atlas-container space-y-8">
      <PageMetadata
        title="DCB Glossary"
        description={description}
        pathname="/glossary/"
        structuredData={[
          buildCollectionSchema({
            name: 'DCB Atlas Glossary',
            description,
            pathname: '/glossary/',
          }),
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Glossary', path: '/glossary/' },
          ]),
        ]}
      />

      <section className="atlas-panel px-6 py-8 sm:px-8">
        <SectionHeading
          eyebrow="Glossary"
          title="Plain-English DCB, VAS, and operator billing terms"
          description="A practical glossary for commercial, product, compliance, and technical teams who need the industry language without the fog."
        />
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {glossaryTerms.map((term) => (
          <article key={term.slug} className="atlas-panel px-6 py-6">
            <p className="atlas-eyebrow">{term.shortName}</p>
            <h2 className="atlas-title mt-3 text-2xl font-semibold text-[#0d1b24]">
              {term.name}
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#35505f]">{term.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {term.related.slice(0, 3).map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-white/75 px-3 py-1 text-xs font-semibold text-[#12354a]"
                >
                  {item}
                </span>
              ))}
            </div>
            <Link className="atlas-button-secondary mt-5" to={`/glossary/${term.slug}`}>
              Read definition
            </Link>
          </article>
        ))}
      </section>
    </div>
  )
}
