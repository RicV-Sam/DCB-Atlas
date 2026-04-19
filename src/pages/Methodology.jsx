import { CtaBanner } from '../components/shared/CtaBanner'
import { SectionHeading } from '../components/shared/SectionHeading'

export function MethodologyPage() {
  return (
    <div className="atlas-container space-y-8">
      <section className="atlas-panel px-6 py-8 sm:px-8">
        <SectionHeading
          eyebrow="Methodology"
          title="A practical framework for comparing markets without pretending certainty"
          description="DCB Atlas is intentionally lightweight. The public layer is designed to help shortlist markets, not replace partner diligence or legal review."
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="atlas-panel px-6 py-6">
          <h2 className="atlas-title text-3xl font-semibold text-[#0d1b24]">
            Score categories
          </h2>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-[#35505f]">
            <li>Market score combines directional opportunity, accessibility, and commercial usability.</li>
            <li>Risk score reflects how much diligence is still needed before confident go-to-market planning.</li>
            <li>Opportunity score leans toward scale, operator relevance, and likely commercial interest.</li>
          </ul>
        </div>
        <div className="atlas-panel px-6 py-6">
          <h2 className="atlas-title text-3xl font-semibold text-[#0d1b24]">
            Confidence tiers
          </h2>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-[#35505f]">
            <li>Verified: high-confidence data that has been directly confirmed for public use.</li>
            <li>Observed: directional industry context that is useful, but still not a substitute for route verification.</li>
            <li>Estimated: placeholder framing or rounded scale signals that should be treated cautiously.</li>
            <li>Pending: a country is mapped, but the public profile is not yet enriched.</li>
          </ul>
        </div>
      </section>

      <section className="atlas-panel px-6 py-6">
        <h2 className="atlas-title text-3xl font-semibold text-[#0d1b24]">
          What “research pending” means
        </h2>
        <p className="mt-5 max-w-4xl text-sm leading-8 text-[#35505f]">
          The atlas shows a global country skeleton so users can orient themselves visually,
          even when the public market write-up is not ready. A research-pending state means the
          country is intentionally present without a fabricated profile. It is a signal to ask
          for a briefing, not a claim that no opportunity exists.
        </p>
      </section>

      <section className="atlas-panel px-6 py-6">
        <h2 className="atlas-title text-3xl font-semibold text-[#0d1b24]">
          Public versus private intelligence
        </h2>
        <p className="mt-5 max-w-4xl text-sm leading-8 text-[#35505f]">
          The public UI never renders internal-only tags or sensitive notes. Atlas profiles are
          designed as an editorial lead-generation layer. If a market needs deeper route,
          partner, or compliance analysis, that belongs in a separate advisory workflow.
        </p>
      </section>

      <CtaBanner
        title="Need methodology translated into a live market shortlist?"
        description="The public scoring model is a framing device. Ask for a market briefing when you need a decision-oriented read on a specific launch plan."
      />
    </div>
  )
}
