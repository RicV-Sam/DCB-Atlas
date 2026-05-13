import { Link } from 'react-router-dom'
import { CtaBanner } from '../components/shared/CtaBanner'
import { PageMetadata } from '../components/shared/PageMetadata'
import { SectionHeading } from '../components/shared/SectionHeading'
import { buildBreadcrumbSchema } from '../utils/seo'

export function MethodologyPage() {
  return (
    <div className="atlas-container space-y-8">
      <PageMetadata
        title="Methodology"
        description="How DCB Atlas frames market score, opportunity, confidence, freshness, and research-pending coverage in the public editorial layer."
        pathname="/methodology"
        structuredData={buildBreadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Methodology', path: '/methodology' },
        ])}
      />

      <section className="atlas-panel px-6 py-8 sm:px-8">
        <SectionHeading
          eyebrow="Methodology"
          title="A decision-oriented framework for comparing markets without pretending certainty"
          description="DCB Atlas is based on public editorial research unless otherwise stated. The methodology is built to support shortlist decisions and market-entry conversations, not to replace route testing, commercial negotiation, legal review, or direct operator diligence."
        />
      </section>

      <section className="atlas-panel px-6 py-6">
        <h2 className="atlas-title text-3xl font-semibold text-[#0d1b24]">
          How to read DCB Atlas market pages
        </h2>
        <div className="mt-5 space-y-4 text-sm leading-8 text-[#35505f]">
          <p>
            Market pages are public editorial references. They are not commercial
            route approvals, operator confirmations, legal opinions, or guarantees
            that a merchant can launch immediately in a country.
          </p>
          <p>
            The Atlas is designed to help teams ask better questions sooner: which
            markets deserve deeper validation, where operator or aggregator access may
            matter, and which public signals should be checked before budget or launch
            commitments are made.
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="atlas-panel px-6 py-6">
          <h2 className="atlas-title text-3xl font-semibold text-[#0d1b24]">
            Score model dimensions
          </h2>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-[#35505f]">
            <li>Market score is a directional blend of commercial usability, launch conditions, and practical access signals.</li>
            <li>Opportunity score leans harder toward market attractiveness: where scale, monetisation potential, and route relevance look stronger.</li>
            <li>Risk should be read as launch friction and exposure, not just abstract country risk.</li>
            <li>Readiness indicates how prepared a market appears for DCB-style execution in public sources.</li>
            <li>Capability indicators such as DCB or PSMS mean a capability is flagged, or not flagged, in public data. They do not guarantee live billing availability.</li>
          </ul>
        </div>
        <div className="atlas-panel px-6 py-6">
          <h2 className="atlas-title text-3xl font-semibold text-[#0d1b24]">
            Confidence and freshness
          </h2>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-[#35505f]">
            <li>Confidence reflects the strength of the current public editorial read, not a guarantee of route truth.</li>
            <li>Freshness shows when the profile was last updated and should be used to judge whether a market needs a new validation pass.</li>
            <li>A high-confidence profile can still require operator-level confirmation if launch stakes are high.</li>
            <li>Low confidence means the market should be manually reviewed before anyone relies on the profile for planning.</li>
            <li>Pending means there is not enough confidence to publish a firm editorial view yet.</li>
            <li>Data can change as operators, aggregators, regulators, browsers, pricing rules, and payment habits evolve.</li>
          </ul>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="atlas-panel px-6 py-6">
          <h2 className="atlas-title text-3xl font-semibold text-[#0d1b24]">
            What market score means
          </h2>
          <p className="mt-5 max-w-4xl text-sm leading-8 text-[#35505f]">
            A stronger market score means Atlas sees a better combination of
            commercial relevance, route plausibility, and practical usability. It
            does not mean the market is automatically easy to enter, fully compliant,
            or already commercially open.
          </p>
        </div>
        <div className="atlas-panel px-6 py-6">
          <h2 className="atlas-title text-3xl font-semibold text-[#0d1b24]">
            What research pending means
          </h2>
          <p className="mt-5 max-w-4xl text-sm leading-8 text-[#35505f]">
            Research pending means the country remains visible in the Atlas so users
            can track global coverage, but the public profile has not been expanded
            into a decision-ready market read. Atlas intentionally avoids fabricating
            detail for those markets. Pending markets should be treated as coverage
            placeholders until fresh public evidence or direct validation is available.
          </p>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="atlas-panel px-6 py-6">
          <h2 className="atlas-title text-3xl font-semibold text-[#0d1b24]">
            What validation still means
          </h2>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-[#35505f]">
            <li>Operator-level validation is required before commercial planning or route commitments.</li>
            <li>Aggregator access should be confirmed directly, including coverage, technical readiness, reporting, settlement, and support responsibilities.</li>
            <li>Legal and regulatory validation is required before launch decisions, especially for consent, pricing, subscription, refund, advertising, and unsubscribe rules.</li>
            <li>Commercial models should be checked against the actual route, not assumed from the public country profile.</li>
          </ul>
        </div>
        <div className="atlas-panel px-6 py-6">
          <h2 className="atlas-title text-3xl font-semibold text-[#0d1b24]">
            Corrections and evidence
          </h2>
          <p className="mt-5 text-sm leading-8 text-[#35505f]">
            If a market page is out of date, incomplete, or missing stronger public
            evidence, users can send corrections or updated evidence through the
            contact route on the About page. DCB Atlas should improve when better
            public data becomes available, but unsupported claims should not be added
            just to make a profile look complete.
          </p>
          <div className="mt-5">
            <Link className="atlas-button-secondary" to="/about">
              Contact DCB Atlas
            </Link>
          </div>
        </div>
      </section>

      <section className="atlas-panel px-6 py-6">
        <h2 className="atlas-title text-3xl font-semibold text-[#0d1b24]">
          Public editorial layer versus deeper validation
        </h2>
        <p className="mt-5 max-w-4xl text-sm leading-8 text-[#35505f]">
          The public site is an editorial layer: it helps users compare markets,
          identify where to look next, and understand why a country may matter. It is
          not the same as deeper validation, which may include operator outreach,
          route testing, commercial negotiation, traffic suitability review, and
          market-specific compliance analysis. The public UI never exposes internal-only
          tags or sensitive notes.
        </p>
      </section>

      <section className="atlas-panel px-6 py-6">
        <SectionHeading
          eyebrow="Related reading"
          title="Use the methodology with the resource library"
          description="The scoring notes make more sense when read alongside the core DCB, compliance, commercial and terminology guides."
        />
        <div className="mt-5 flex flex-wrap gap-3">
          <Link className="atlas-button-secondary" to="/resources">
            Resources hub
          </Link>
          <Link className="atlas-button-secondary" to="/resources/dcb-compliance-basics">
            DCB Compliance Basics
          </Link>
          <Link className="atlas-button-secondary" to="/resources/operator-revenue-share-models">
            Operator Revenue Share
          </Link>
          <Link className="atlas-button-secondary" to="/glossary">
            Glossary
          </Link>
          <Link className="atlas-button-secondary" to="/about">
            About
          </Link>
        </div>
      </section>

      <CtaBanner
        title="Need the methodology turned into a real shortlist?"
        description="The public scoring model is designed to frame decisions, not make them for you. Request a market briefing when you need country prioritisation grounded in a real launch plan."
        primaryLabel="Request Market Briefing"
        primaryHref="mailto:briefings@dcbatlas.com?subject=Request%20Market%20Briefing"
        secondaryLabel="Browse markets"
        secondaryTo="/markets"
      />
    </div>
  )
}
