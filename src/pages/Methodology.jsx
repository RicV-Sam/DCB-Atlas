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
          description="DCB Atlas is intentionally public, directional, and cautious. The methodology is built to support shortlist decisions and market-entry conversations, not to replace route testing, legal review, or direct partner diligence."
        />
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
            <li>A lower-confidence profile is a signal to verify sooner, not a reason to ignore the market entirely.</li>
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
            detail for those markets.
          </p>
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
