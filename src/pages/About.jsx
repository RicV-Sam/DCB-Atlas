import { CtaBanner } from '../components/shared/CtaBanner'
import { SectionHeading } from '../components/shared/SectionHeading'

export function AboutPage() {
  return (
    <div className="atlas-container space-y-8">
      <section className="atlas-panel px-6 py-8 sm:px-8">
        <SectionHeading
          eyebrow="About DCB Atlas"
          title="A public-facing atlas for VAS and carrier billing market discovery"
          description="DCB Atlas is built for business development, partnership, compliance, and market-entry teams that need a sharper first pass on where to focus."
        />
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="atlas-panel px-6 py-6">
          <h2 className="atlas-title text-2xl font-semibold text-[#0d1b24]">
            Who it serves
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#35505f]">
            Aggregators, content providers, monetisation teams, compliance specialists, and
            anyone who needs a fast editorial read on country-level carrier billing potential.
          </p>
        </div>
        <div className="atlas-panel px-6 py-6">
          <h2 className="atlas-title text-2xl font-semibold text-[#0d1b24]">
            Why it exists
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#35505f]">
            Market information is fragmented. Atlas brings those scattered signals into one
            map-first interface so teams can move from vague curiosity to structured follow-up.
          </p>
        </div>
        <div className="atlas-panel px-6 py-6">
          <h2 className="atlas-title text-2xl font-semibold text-[#0d1b24]">
            What it is not
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#35505f]">
            It is not a claim of live commercial access, legal sufficiency, or verified
            operator routing. It is a public exploratory layer.
          </p>
        </div>
      </section>

      <CtaBanner
        title="Turn a public profile into a briefing"
        description="If you already know which market you want to qualify, DCB Atlas can be the front door into a more decision-oriented advisory conversation."
      />
    </div>
  )
}
