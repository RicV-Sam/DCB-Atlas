import { Link } from 'react-router-dom'
import { PageMetadata } from '../components/shared/PageMetadata'
import { SectionHeading } from '../components/shared/SectionHeading'
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
} from '../utils/seo'

const pathname = '/resources/operator-revenue-share-models/'
const title = 'Operator Revenue Share Models in DCB: How the Money Flows'
const description =
  'A plain-English guide to Direct Carrier Billing revenue share, gross billed amount, operator payout, aggregator share, merchant net revenue, settlement delays and reporting mistakes.'

const waterfallRows = [
  {
    label: 'Consumer price / gross billed amount',
    meaning: 'The price charged to the user before the commercial waterfall is applied.',
  },
  {
    label: 'VAT, tax or regulated fees where applicable',
    meaning: 'Handled according to the relevant market, operator and tax treatment.',
  },
  {
    label: 'Operator revenue share',
    meaning: 'The operator retains its agreed share for billing access, subscriber relationship, risk, support exposure and route control.',
  },
  {
    label: 'Aggregator revenue share or fee',
    meaning: 'The aggregator may retain a share or fee for connectivity, platform, compliance workflow, reporting, reconciliation and settlement services.',
  },
  {
    label: 'Refunds, reversals and adjustments',
    meaning: 'Refunds, complaints, failed renewals, charge reversals or settlement corrections can reduce the amount paid out later.',
  },
  {
    label: 'Merchant / content provider net revenue',
    meaning: 'The amount left for the merchant after the agreed deductions and adjustments.',
  },
]

const commonMistakes = [
  'Treating gross billed amount as merchant revenue.',
  'Comparing marketing CPA against gross revenue instead of expected net revenue.',
  'Ignoring taxes, refunds, reversals or later settlement adjustments.',
  'Mixing successful charges with consent attempts or billing attempts.',
  'Not separating one-off purchases, first subscriptions and renewal revenue.',
  'Comparing operators or aggregators without checking settlement timing and approval rules.',
]

const checklist = [
  'What is the user-facing price?',
  'Is tax included, excluded or handled separately in this market?',
  'What amount does the operator calculate revenue share from?',
  'Is the aggregator paid as a percentage, fixed fee, platform fee or blended model?',
  'Which refunds, reversals and complaint adjustments can reduce payout?',
  'What is the settlement cycle and expected payment delay?',
  'Which report is the source of truth for payable revenue?',
  'Is marketing CPA being compared against gross revenue, operator payout or merchant net revenue?',
  'Are renewals, cancellations, failed charges and charge reversals reconciled separately?',
  'Are operator-specific rules and approval conditions reflected in the commercial model?',
]

function RevenueSection({ eyebrow, title: sectionTitle, children }) {
  return (
    <section className="space-y-5">
      <p className="atlas-eyebrow">{eyebrow}</p>
      <h2 className="atlas-title text-3xl font-semibold text-[#0d1b24] sm:text-4xl">
        {sectionTitle}
      </h2>
      <div className="space-y-5 text-base leading-8 text-[#35505f]">{children}</div>
    </section>
  )
}

export function OperatorRevenueShareModelsPage() {
  return (
    <div className="atlas-container space-y-8">
      <PageMetadata
        title={title}
        description={description}
        pathname={pathname}
        appendSiteName={false}
        type="article"
        structuredData={[
          buildArticleSchema({
            headline: title,
            description,
            pathname,
            datePublished: '2026-05-13',
            dateModified: '2026-05-13',
          }),
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Resources', path: pathname },
            { name: 'Operator Revenue Share Models', path: pathname },
          ]),
        ]}
      />

      <article className="atlas-panel px-6 py-8 sm:px-8 sm:py-10">
        <p className="atlas-eyebrow">Evergreen resource</p>
        <h1 className="atlas-title mt-3 max-w-5xl text-4xl font-semibold leading-tight text-[#0d1b24] sm:text-6xl">
          Operator Revenue Share Models in DCB: How the Money Flows
        </h1>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-[#35505f]">
          Direct Carrier Billing revenue can look simple from the outside: a user pays,
          the service is delivered, and the merchant earns money. In practice, DCB
          money usually moves through a commercial chain involving the mobile operator,
          aggregator and merchant, with taxes, refunds, reporting and settlement timing
          all affecting the final amount paid.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="space-y-12">
            <section className="rounded-[28px] bg-[#12354a] px-6 py-6 text-[#f3ead9]">
              <p className="atlas-eyebrow text-[#d8ba7a]">Executive summary</p>
              <ul className="mt-4 space-y-3 text-sm leading-7">
                <li>Gross billed amount is not the same as merchant revenue.</li>
                <li>Operators usually retain an agreed share before funds move onward.</li>
                <li>Aggregators may retain a share or fee for route, platform and settlement services.</li>
                <li>Refunds, reversals, taxes, complaints and adjustments can change the final payout.</li>
                <li>Marketing CPA should be judged against the right revenue basis, usually expected net revenue, not headline price.</li>
              </ul>
            </section>

            <RevenueSection eyebrow="1. The chain" title="The basic DCB money flow">
              <p>
                A user pays for a digital product or service through airtime or a
                postpaid bill. The{' '}
                <Link className="atlas-link" to="/glossary/direct-carrier-billing">
                  Direct Carrier Billing
                </Link>{' '}
                transaction is controlled through the operator billing route, often
                connected through an{' '}
                <Link className="atlas-link" to="/glossary/aggregator">
                  aggregator
                </Link>
                . The operator collects or records the charge, retains its agreed
                commercial share, and the remaining value moves through the settlement
                chain to the aggregator and merchant.
              </p>
              <p>
                The exact order, calculation basis and timing vary by market, operator,
                aggregator agreement, product type, tax treatment and compliance rules.
                This page is a commercial explainer, not a benchmark of typical rates.
              </p>
            </RevenueSection>

            <RevenueSection eyebrow="2. Waterfall" title="From gross billed amount to merchant net revenue">
              <div className="grid gap-3">
                {waterfallRows.map((row, index) => (
                  <div
                    key={row.label}
                    className="grid gap-3 rounded-[22px] border border-[#12354a]/10 bg-white/75 p-4 md:grid-cols-[3rem_minmax(0,1fr)]"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#12354a] text-sm font-semibold text-white">
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#0d1b24]">{row.label}</h3>
                      <p className="mt-2 text-sm leading-7 text-[#35505f]">{row.meaning}</p>
                    </div>
                  </div>
                ))}
              </div>
            </RevenueSection>

            <RevenueSection eyebrow="3. Commercial language" title="Why gross, payout and net revenue are different">
              <p>
                The consumer price is the price shown to the user. Gross billed amount
                usually means the value of successful billed transactions before the
                full commercial waterfall is applied. Net operator payout may mean the
                amount available after the operator has retained its share and applied
                any operator-level deductions. Merchant net revenue is the amount the
                merchant expects after operator share, aggregator share or fees, taxes
                where applicable, refunds and settlement adjustments.
              </p>
              <p>
                Teams get into trouble when these terms are used loosely. A campaign
                that looks profitable on gross revenue can be loss-making on merchant
                net revenue once the real payout basis is applied.
              </p>
            </RevenueSection>

            <RevenueSection eyebrow="4. Settlement" title="Settlement cycles and payment delays">
              <p>
                DCB settlement is rarely instant. Operators may settle to aggregators
                after a reporting and reconciliation cycle. Aggregators may then settle
                to merchants after checking operator reports, refund windows, charge
                reversals, invoicing, minimum payout thresholds and any contractual
                holdbacks.
              </p>
              <p>
                This timing matters commercially. A service may generate revenue today,
                but the merchant may only receive cash later. Working-capital planning,
                media spend, affiliate payouts and content costs should reflect the
                expected settlement cycle, not only daily billed volume.
              </p>
            </RevenueSection>

            <RevenueSection eyebrow="5. Marketing economics" title="Compare CPA against the correct revenue basis">
              <p>
                DCB campaigns often use marketing metrics such as CPA, conversion rate,
                first-charge revenue, renewal revenue and user lifetime value. The key
                question is: which revenue number is being compared with acquisition
                cost?
              </p>
              <p>
                For practical decision-making, CPA should usually be compared against
                expected merchant net revenue or expected contribution after known
                deductions, not the user-facing price. This is especially important for
                subscription products where renewals, churn, refunds and complaint risk
                can change the real economics.
              </p>
            </RevenueSection>

            <RevenueSection eyebrow="6. Illustrative example" title="A simple worked example without benchmark percentages">
              <div className="rounded-[24px] border border-[#12354a]/10 bg-[#f5efe4] p-5">
                <p>
                  Imagine a user-facing price of <strong>100 units</strong>. This is an
                  illustrative example only, not a market benchmark.
                </p>
                <ul className="mt-4 space-y-3 text-sm leading-7">
                  <li>Start with 100 units of successful gross billed amount.</li>
                  <li>Apply any VAT, tax or regulated fee treatment required in the market.</li>
                  <li>Deduct the operator share agreed for that route and service.</li>
                  <li>Deduct the aggregator share, platform fee or settlement fee if applicable.</li>
                  <li>Adjust for refunds, reversals, chargebacks, complaints or reporting corrections.</li>
                  <li>The remaining amount is the merchant net revenue for that transaction or reporting period.</li>
                </ul>
              </div>
              <p>
                The point is not the size of each deduction. The point is that the
                commercial model should show the waterfall clearly before media budgets,
                merchant forecasts or partner payouts are approved.
              </p>
            </RevenueSection>

            <RevenueSection eyebrow="7. Reporting" title="Common mistakes in DCB reporting">
              <ul className="grid gap-3 sm:grid-cols-2">
                {commonMistakes.map((item) => (
                  <li
                    key={item}
                    className="rounded-[20px] border border-[#12354a]/10 bg-white/70 px-4 py-3 text-sm leading-6"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </RevenueSection>

            <RevenueSection eyebrow="8. Checklist" title="Checklist for reviewing a DCB commercial model">
              <ul className="grid gap-3 sm:grid-cols-2">
                {checklist.map((item) => (
                  <li
                    key={item}
                    className="rounded-[20px] border border-[#12354a]/10 bg-white/70 px-4 py-3 text-sm leading-6"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </RevenueSection>

            <RevenueSection eyebrow="9. Final view" title="Follow the money, not just the headline price">
              <p>
                A strong DCB commercial model separates consumer price, gross billed
                amount, operator payout, aggregator economics and merchant net revenue.
                Once those layers are clear, operators, aggregators and merchants can
                make better decisions about pricing, traffic, compliance, refunds,
                settlement timing and sustainable growth.
              </p>
            </RevenueSection>
          </div>

          <aside className="space-y-4">
            <div className="rounded-[24px] bg-[#12354a] p-5 text-sm leading-7 text-[#f3ead9]">
              <p className="atlas-eyebrow text-[#d8ba7a]">Related resources</p>
              <div className="mt-4 flex flex-col gap-3">
                <Link className="font-semibold text-white" to="/resources">
                  Resource hub
                </Link>
                <Link className="font-semibold text-white" to="/resources/what-is-direct-carrier-billing">
                  What is Direct Carrier Billing?
                </Link>
                <Link className="font-semibold text-white" to="/resources/how-direct-carrier-billing-works">
                  How DCB Works
                </Link>
                <Link className="font-semibold text-white" to="/resources/dcb-compliance-basics">
                  DCB Compliance Basics
                </Link>
                <Link className="font-semibold text-white" to="/resources/dcb-vs-card-payments-vs-wallets">
                  DCB vs Cards vs Wallets
                </Link>
              </div>
            </div>
            <div className="rounded-[24px] border border-[#12354a]/10 bg-white/70 p-5 text-sm leading-7 text-[#35505f]">
              <p className="font-semibold text-[#0d1b24]">Glossary</p>
              <div className="mt-3 flex flex-col gap-2">
                <Link className="atlas-link" to="/glossary/direct-carrier-billing">
                  Direct Carrier Billing
                </Link>
                <Link className="atlas-link" to="/glossary/aggregator">Aggregator</Link>
              </div>
            </div>
            <div className="rounded-[24px] border border-[#12354a]/10 bg-white/70 p-5 text-sm leading-7 text-[#35505f]">
              <p className="font-semibold text-[#0d1b24]">Atlas context</p>
              <div className="mt-3 flex flex-col gap-2">
                <Link className="atlas-link" to="/methodology">Methodology</Link>
                <Link className="atlas-link" to="/about">About DCB Atlas</Link>
              </div>
            </div>
          </aside>
        </div>
      </article>

      <section className="atlas-panel px-6 py-6">
        <SectionHeading
          eyebrow="Next step"
          title="Model the route before scaling traffic"
          description="Revenue-share assumptions, settlement timing and refund exposure should be understood before a DCB campaign is judged as profitable."
        />
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link className="atlas-button-primary" to="/resources/how-direct-carrier-billing-works">
            Review the DCB flow
          </Link>
          <Link className="atlas-button-secondary" to="/resources/dcb-compliance-basics">
            Check compliance basics
          </Link>
        </div>
      </section>
    </div>
  )
}
