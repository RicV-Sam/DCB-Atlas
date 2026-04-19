import { CtaBanner } from '../components/shared/CtaBanner'
import { PageMetadata } from '../components/shared/PageMetadata'
import { SectionHeading } from '../components/shared/SectionHeading'
import { buildBreadcrumbSchema } from '../utils/seo'

export function AboutPage() {
  return (
    <div className="atlas-container space-y-8">
      <PageMetadata
        title="About"
        description="What DCB Atlas is for, who it serves, what it helps with, and where the public Atlas leads into deeper market-entry advisory work."
        pathname="/about"
        structuredData={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />

      <section className="atlas-panel px-6 py-8 sm:px-8">
        <SectionHeading
          eyebrow="About DCB Atlas"
          title="A public market-entry reference for teams evaluating VAS and carrier billing markets"
          description="DCB Atlas exists for business development, partnerships, monetisation, and market-entry teams that need a sharper first pass on where to focus — without confusing public editorial signals for fully validated commercial truth."
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="atlas-panel px-6 py-6">
          <h2 className="atlas-title text-2xl font-semibold text-[#0d1b24]">
            Who it is for
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#35505f]">
            Aggregators, merchants, content providers, BD teams, compliance leads, and
            advisors who need a fast commercial read on which countries deserve deeper
            attention.
          </p>
        </div>
        <div className="atlas-panel px-6 py-6">
          <h2 className="atlas-title text-2xl font-semibold text-[#0d1b24]">
            What it helps users do
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#35505f]">
            Compare markets, shape shortlists, identify partner context, and decide
            where to spend time on operator, aggregator, compliance, or route-validation
            work.
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="atlas-panel px-6 py-6">
          <h2 className="atlas-title text-2xl font-semibold text-[#0d1b24]">
            Why it exists
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#35505f]">
            Market information is fragmented across telecom references, aggregator
            signals, local operator lists, and scattered public intelligence. Atlas
            turns that into a calmer, more usable market-entry view.
          </p>
        </div>
        <div className="atlas-panel px-6 py-6">
          <h2 className="atlas-title text-2xl font-semibold text-[#0d1b24]">
            What it is not
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#35505f]">
            It is not a promise of route availability, legal sufficiency, guaranteed
            operator access, or private-market intelligence. It is a public editorial
            layer designed to guide the next question.
          </p>
        </div>
        <div className="atlas-panel px-6 py-6">
          <h2 className="atlas-title text-2xl font-semibold text-[#0d1b24]">
            Where it leads
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#35505f]">
            Atlas is the front door into deeper market briefings, route validation,
            operator or aggregator introductions, and country-by-country launch
            prioritisation work.
          </p>
        </div>
      </section>

      <CtaBanner
        title="Turn Atlas research into a live market-entry conversation"
        description="When a public profile becomes commercially relevant, use it as the starting point for a market briefing, route validation, or partner-introduction discussion."
        primaryLabel="Request Market Briefing"
        primaryHref="mailto:briefings@dcbatlas.com?subject=Request%20Market%20Briefing"
        secondaryLabel="Ask for Route Validation"
        secondaryHref="mailto:briefings@dcbatlas.com?subject=Ask%20for%20Route%20Validation"
        secondaryTo={undefined}
      />
    </div>
  )
}
