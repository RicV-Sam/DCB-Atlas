import { Link } from 'react-router-dom'
import { PageMetadata } from '../components/shared/PageMetadata'
import { SectionHeading } from '../components/shared/SectionHeading'
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
} from '../utils/seo'

const pathname = '/resources/how-direct-carrier-billing-works/'
const title =
  'How Direct Carrier Billing Works: User Journey, Charging and Settlement'
const description =
  'A plain-English visual guide to how Direct Carrier Billing works, covering the user journey, merchant, aggregator, mobile operator, consent, charging, settlement, refunds and reporting.'

const flowSteps = [
  'User clicks service',
  'Landing page explains offer and price',
  'User confirms or enters MSISDN/OTP',
  'Operator validates subscriber',
  'Charge is applied to airtime or bill',
  'User gets access to content/service',
  'Revenue is reported and settled',
  'Support/refunds handled if needed',
]

const parties = [
  {
    name: 'User / subscriber',
    role: 'Chooses the service, sees the price, gives consent, receives access, and may later cancel, ask for help, or request a refund.',
  },
  {
    name: 'Merchant / content provider',
    role: 'Provides the product, service experience, landing page, terms, customer support input, and commercial reporting needs.',
  },
  {
    name: 'Aggregator',
    role: 'Connects merchants to operators, routes transactions, supports compliance controls, reporting, reconciliation, and settlement.',
  },
  {
    name: 'Mobile operator',
    role: 'Owns the subscriber billing relationship, validates eligibility, applies charges, sets route rules, and monitors complaint risk.',
  },
  {
    name: 'Traffic / media partner',
    role: 'May bring users to the offer through ads, affiliate traffic, portals, apps, SMS, or partner inventory.',
  },
  {
    name: 'Regulator / compliance body',
    role: 'May set consumer protection, advertising, billing, data, telecom, or subscription rules depending on the country.',
  },
]

const reportingItems = [
  'Clicks',
  'Landing page views',
  'Consent attempts',
  'Successful subscriptions or purchases',
  'Failed billing attempts',
  'Renewals',
  'Churn and cancellations',
  'Refunds',
  'Complaints',
  'Revenue',
  'Conversion rate by operator, channel, browser, flow and campaign',
]

const failurePoints = [
  'User on Wi-Fi cannot be identified',
  'Header Enrichment fails',
  'User has insufficient prepaid balance',
  'OTP is not delivered',
  'User enters the wrong OTP',
  'Operator rejects billing',
  'Service is not approved for the user or tariff',
  'Browser changes introduce friction',
  'Landing page does not meet compliance rules',
  'Traffic quality is poor',
  'Reporting mismatch between merchant, aggregator and operator',
]

const checklist = [
  'Clear service name',
  'Clear price',
  'Clear billing frequency',
  'Honest CTA',
  'Active consent',
  'Reliable identification',
  'Operator-approved flow',
  'Customer care route',
  'Unsubscribe route',
  'Reporting and reconciliation',
  'Refund process',
  'Fraud and traffic monitoring',
]

function FlowSection({ eyebrow, title: sectionTitle, children }) {
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

function PillGrid({ items }) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-[20px] border border-[#12354a]/10 bg-white/70 px-4 py-3 text-sm leading-6 text-[#35505f]"
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

export function HowDcbWorksPage() {
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
            { name: 'How Direct Carrier Billing Works', path: pathname },
          ]),
        ]}
      />

      <article className="atlas-panel px-6 py-8 sm:px-8 sm:py-10">
        <p className="atlas-eyebrow">Evergreen resource</p>
        <h1 className="atlas-title mt-3 max-w-5xl text-4xl font-semibold leading-tight text-[#0d1b24] sm:text-6xl">
          How Direct Carrier Billing Works: User Journey, Charging and Settlement
        </h1>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-[#35505f]">
          Direct Carrier Billing is more than a payment button. A working DCB flow
          connects a user journey, merchant service, aggregator route, operator billing
          system, compliance evidence, charging result, reporting, settlement, and
          customer support process.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="space-y-12">
            <section className="rounded-[28px] bg-[#12354a] px-6 py-6 text-[#f3ead9]">
              <p className="atlas-eyebrow text-[#d8ba7a]">Executive summary</p>
              <ul className="mt-4 space-y-3 text-sm leading-7">
                <li>DCB lets users pay for digital goods or services through mobile airtime or a postpaid bill.</li>
                <li>The merchant provides the service.</li>
                <li>The aggregator connects the merchant to mobile operators.</li>
                <li>The operator identifies, confirms, and charges the user.</li>
                <li>Money is later settled through the operator, aggregator, and merchant revenue chain.</li>
                <li>Compliance, consent, reporting, refunds, and support are part of the full operating model.</li>
              </ul>
            </section>

            <FlowSection eyebrow="1. Simple flow" title="The simple DCB flow">
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
                {flowSteps.map((step, index) => (
                  <div
                    key={step}
                    className="rounded-[22px] border border-[#12354a]/10 bg-white/75 p-4"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#a87b36]">
                      Step {index + 1}
                    </p>
                    <p className="mt-3 text-base font-semibold leading-6 text-[#0d1b24]">
                      {step}
                    </p>
                  </div>
                ))}
              </div>
              <p>
                The exact sequence can vary by operator and country. Some journeys are
                one-click or two-click, some use OTP or PIN, and some are hosted by the
                operator. The important point is that the commercial flow does not end
                when the user clicks. It continues through access, reporting,
                reconciliation, support, and settlement.
              </p>
            </FlowSection>

            <FlowSection eyebrow="2. Parties" title="The main parties involved">
              <div className="grid gap-4 md:grid-cols-2">
                {parties.map((party) => (
                  <article
                    key={party.name}
                    className="rounded-[24px] border border-[#12354a]/10 bg-white/70 p-5"
                  >
                    <h3 className="text-xl font-semibold text-[#0d1b24]">{party.name}</h3>
                    <p className="mt-3 text-sm leading-7">{party.role}</p>
                  </article>
                ))}
              </div>
            </FlowSection>

            <FlowSection eyebrow="3. User journey" title="From click to access">
              <p>
                A user may arrive from an ad, operator portal, SMS, app, partner site,
                merchant page, or other media source. The landing or offer page should
                explain the service, price, billing frequency, provider, and
                confirmation action before the charge happens.
              </p>
              <p>
                The confirmation step depends on market rules and operator setup:
                one-click, two-click, OTP, PIN, double opt-in, or operator-hosted
                confirmation. After a successful charge, the user receives access to
                content or service. If the product is subscription-based, renewal and
                cancellation rules become part of the ongoing user journey.
              </p>
            </FlowSection>

            <FlowSection eyebrow="4. Identity" title="Identification and consent">
              <p>
                The flow needs a way to identify the subscriber and capture consent.
                Legacy{' '}
                <Link className="atlas-link" to="/glossary/header-enrichment">
                  MSISDN Header Enrichment
                </Link>{' '}
                could identify users on mobile data, while manual{' '}
                <Link className="atlas-link" to="/glossary/msisdn">MSISDN</Link>{' '}
                entry and <Link className="atlas-link" to="/glossary/otp">OTP</Link>{' '}
                provide more explicit verification at the cost of extra friction.
              </p>
              <p>
                Operator-hosted confirmation and identity API models can move sensitive
                identification into a more controlled environment. Token or alias
                identity models may reduce raw MSISDN exposure.{' '}
                <Link className="atlas-link" to="/glossary/camara">CAMARA</Link>{' '}
                and GSMA Open Gateway point toward standardised network API direction,
                but availability depends on real operator implementation and market
                readiness.
              </p>
              <p>
                For the browser-security angle, read the DCB Atlas article on{' '}
                <Link
                  className="atlas-link"
                  to="/insights/chrome-https-msisdn-header-enrichment-dcb-impact"
                >
                  Chrome HTTPS and MSISDN Header Enrichment
                </Link>
                .
              </p>
            </FlowSection>

            <FlowSection eyebrow="5. Charging" title="How charging works">
              <p>
                If the user is prepaid, the charge is deducted from airtime or mobile
                balance. If the user is postpaid, the charge is added to the user's
                mobile bill. Charges may be one-off or recurring, with daily, weekly,
                monthly, or other billing cycles depending on the market and service.
              </p>
              <p>
                Failed charges are normal operating events. A charge may fail because
                the prepaid balance is too low, the subscriber is barred, the tariff is
                unsupported, spend limits are reached, the product is not approved for
                that user, or the operator rejects the billing request.
              </p>
            </FlowSection>

            <FlowSection eyebrow="6. Settlement" title="Settlement and revenue share">
              <p>
                The user pays the operator through airtime or a mobile bill. The
                operator usually retains its agreed share. The aggregator may retain a
                share for connectivity, platform, reporting, compliance, and settlement
                services. The merchant receives net revenue after operator and
                aggregator shares, taxes or fees, refunds, chargebacks, and other
                adjustments.
              </p>
              <p>
                Settlement often happens after a delay. Reporting should reconcile
                gross transactions, successful charges, failed charges, renewals,
                refunds, adjustments, and the net payable amount. Percentages vary by
                market and agreement, so any commercial model should be validated route
                by route.
              </p>
            </FlowSection>

            <FlowSection eyebrow="7. Reporting" title="What good reporting should show">
              <PillGrid items={reportingItems} />
            </FlowSection>

            <FlowSection eyebrow="8. Support" title="Refunds, complaints and customer care">
              <p>
                Support matters because the operator billing relationship is close to
                the user. Even if the merchant caused the confusion, the user may
                complain to the operator. Operators therefore monitor complaint rates,
                refund rates, cancellation patterns, and service-level behaviour.
              </p>
              <p>
                Refunds may reduce settlement or trigger later adjustments. High
                complaint or refund rates can lead to route restrictions, stronger
                confirmation requirements, traffic source blocking, or service
                suspension. For the user-protection view, read{' '}
                <Link className="atlas-link" to="/resources/dcb-compliance-basics">
                  DCB Compliance Basics
                </Link>
                .
              </p>
            </FlowSection>

            <FlowSection eyebrow="9. Troubleshooting" title="Common failure points">
              <PillGrid items={failurePoints} />
            </FlowSection>

            <FlowSection eyebrow="10. Checklist" title="What a good DCB flow needs">
              <PillGrid items={checklist} />
            </FlowSection>

            <FlowSection eyebrow="11. Final view" title="A complete operating model">
              <p>
                A strong DCB flow is not just a payment button. It is a complete
                operating model covering identification, consent, charging, access,
                reporting, settlement, refunds, and user protection.
              </p>
            </FlowSection>
          </div>

          <aside className="space-y-4">
            <div className="rounded-[24px] bg-[#12354a] p-5 text-sm leading-7 text-[#f3ead9]">
              <p className="atlas-eyebrow text-[#d8ba7a]">Start here</p>
              <div className="mt-4 flex flex-col gap-3">
                <Link className="font-semibold text-white" to="/resources/what-is-direct-carrier-billing">
                  What is Direct Carrier Billing?
                </Link>
                <Link className="font-semibold text-white" to="/resources/dcb-compliance-basics">
                  DCB Compliance Basics
                </Link>
                <Link
                  className="font-semibold text-white"
                  to="/resources/dcb-vs-card-payments-vs-wallets"
                >
                  DCB vs Cards vs Wallets
                </Link>
                <Link className="font-semibold text-white" to="/glossary/direct-carrier-billing">
                  DCB glossary
                </Link>
                <Link className="font-semibold text-white" to="/glossary/aggregator">
                  Aggregator
                </Link>
              </div>
            </div>
            <div className="rounded-[24px] border border-[#12354a]/10 bg-white/70 p-5 text-sm leading-7 text-[#35505f]">
              <p className="font-semibold text-[#0d1b24]">Related glossary</p>
              <div className="mt-3 flex flex-col gap-2">
                <Link className="atlas-link" to="/glossary/msisdn">MSISDN</Link>
                <Link className="atlas-link" to="/glossary/header-enrichment">
                  Header Enrichment
                </Link>
                <Link className="atlas-link" to="/glossary/otp">OTP</Link>
                <Link className="atlas-link" to="/glossary/camara">CAMARA</Link>
              </div>
            </div>
            <div className="rounded-[24px] border border-[#12354a]/10 bg-white/70 p-5 text-sm leading-7 text-[#35505f]">
              <p className="font-semibold text-[#0d1b24]">About the Atlas</p>
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
          title="Compare where the model may work"
          description="Once the operating model is clear, use the market directory to compare countries, operators, aggregators, risk, readiness and public launch signals."
        />
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link className="atlas-button-primary" to="/markets">
            Browse market directory
          </Link>
          <Link className="atlas-button-secondary" to="/glossary">
            Open glossary
          </Link>
        </div>
      </section>
    </div>
  )
}
