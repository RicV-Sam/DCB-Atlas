import { Link } from 'react-router-dom'
import { PageMetadata } from '../components/shared/PageMetadata'
import { SectionHeading } from '../components/shared/SectionHeading'
import { buildBreadcrumbSchema, buildCollectionSchema } from '../utils/seo'

const insightsDescription =
  'Commercially practical DCB, VAS, operator billing, and market-entry insight for mobile operators, aggregators, and merchants.'

export function InsightsPage() {
  return (
    <div className="atlas-container space-y-8">
      <PageMetadata
        title="Insights"
        description={insightsDescription}
        pathname="/insights"
        structuredData={[
          buildCollectionSchema({
            name: 'DCB Atlas Insights',
            description: insightsDescription,
            pathname: '/insights',
          }),
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Insights', path: '/insights' },
          ]),
        ]}
      />

      <section className="atlas-panel px-6 py-8 sm:px-8">
        <SectionHeading
          eyebrow="Insights"
          title="Practical analysis for operator billing and VAS teams"
          description="Plain-English explainers and commercial notes for teams working across DCB, MVAS, aggregation, content, compliance, and mobile operator partnerships."
        />
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <article className="atlas-panel overflow-hidden">
          <img
            src={`${import.meta.env.BASE_URL}assets/insights/chrome-https-msisdn-header-enrichment-dcb-impact/dcb-wake-up-call.png`}
            alt="The DCB wake-up call: Chrome HTTPS move and operator revenue"
            className="aspect-[16/9] w-full object-cover"
            loading="eager"
          />
          <div className="px-6 py-6">
            <p className="atlas-eyebrow">Chrome HTTPS and DCB identity</p>
            <h2 className="atlas-title mt-3 text-3xl font-semibold text-[#0d1b24]">
              Chrome HTTPS, MSISDN Header Enrichment and DCB: What Operators Need to Know
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#35505f]">
              A plain-English guide to how Chrome's HTTPS-first move may affect
              MSISDN Header Enrichment, DCB conversion, and operator VAS revenue.
            </p>
            <Link
              className="atlas-button-primary mt-5"
              to="/insights/chrome-https-msisdn-header-enrichment-dcb-impact"
            >
              Read insight
            </Link>
          </div>
        </article>
      </section>
    </div>
  )
}
