import { Link } from 'react-router-dom'
import { PageMetadata } from '../components/shared/PageMetadata'
import { SectionHeading } from '../components/shared/SectionHeading'
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
} from '../utils/seo'

const pathname = '/resources/dcb-compliance-basics/'
const title =
  'DCB Compliance Basics: Consent, Pricing, Unsubscribe and User Protection'
const description =
  'A market-neutral guide to Direct Carrier Billing compliance basics, including consent, pricing visibility, unsubscribe instructions, refunds, customer support, fraud controls and operator requirements.'

const checklist = [
  'Is the price visible before confirmation?',
  'Is the billing frequency clear?',
  'Is the service name clear?',
  'Is the merchant or provider clear?',
  'Is the CTA honest and specific?',
  'Is consent actively captured?',
  'Is there a consent log?',
  'Is unsubscribe information visible?',
  'Is customer care available?',
  'Are refunds and complaints monitored?',
  'Are ads aligned with the landing page?',
  'Are traffic sources monitored?',
  'Are operator-specific rules followed?',
]

function ComplianceSection({ eyebrow, title: sectionTitle, children }) {
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

export function DcbComplianceBasicsPage() {
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
            { name: 'DCB Compliance Basics', path: pathname },
          ]),
        ]}
      />

      <article className="atlas-panel px-6 py-8 sm:px-8 sm:py-10">
        <p className="atlas-eyebrow">Evergreen resource</p>
        <h1 className="atlas-title mt-3 max-w-5xl text-4xl font-semibold leading-tight text-[#0d1b24] sm:text-6xl">
          DCB Compliance Basics: Consent, Pricing, Unsubscribe and User Protection
        </h1>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-[#35505f]">
          This guide explains common Direct Carrier Billing and VAS compliance
          themes in plain English. It is market-neutral and not legal advice:
          requirements vary by country, regulator, operator, aggregator, product
          category, and commercial model.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="space-y-12">
            <section className="rounded-[28px] bg-[#12354a] px-6 py-6 text-[#f3ead9]">
              <p className="atlas-eyebrow text-[#d8ba7a]">Executive summary</p>
              <p className="mt-4 text-sm leading-7">
                DCB compliance is about making sure the user clearly understands
                what they are buying, how much it costs, whether it is once-off or
                recurring, how they confirm consent, how they cancel, where they get
                help, and how refunds or disputes are handled.
              </p>
            </section>

            <ComplianceSection eyebrow="1. Why it matters" title="Why DCB compliance matters">
              <p>
                In many markets, DCB compliance is not just a paperwork exercise. It
                protects users, protects operator trust, reduces refund and complaint
                pressure, and helps VAS revenue remain sustainable. Poor compliance
                can lead operators or regulators to block services, restrict traffic,
                demand stronger confirmation, or shut down whole categories.
              </p>
              <p>
                Operators often require stricter controls because the user sees the
                charge on a mobile bill or prepaid balance. If a flow feels unclear,
                users may blame the operator even when the merchant or traffic partner
                caused the problem.
              </p>
            </ComplianceSection>

            <ComplianceSection eyebrow="2. Pricing" title="Clear pricing">
              <p>
                A compliant flow will usually make price visible before confirmation.
                For subscriptions, billing frequency should be clear, such as per day,
                per week, or per month. Trial periods should explain what happens when
                the trial ends, and taxes or fees should be handled according to local
                market rules.
              </p>
              <p>
                Pricing should not be hidden only in small print. The user should not
                need to inspect a footer to understand the commercial commitment.
              </p>
            </ComplianceSection>

            <ComplianceSection eyebrow="3. Consent" title="Consent and confirmation">
              <p>
                Users should actively confirm the payment or subscription. Depending
                on market and operator rules, this may involve one-click, two-click,{' '}
                <Link className="atlas-link" to="/glossary/otp">OTP</Link>, PIN,
                double opt-in, or operator-hosted flows.
              </p>
              <p>
                Consent should be recorded. Consent logs often include timestamp,
                service name, price, billing frequency, confirmation method, and a
                subscriber identifier such as an{' '}
                <Link className="atlas-link" to="/glossary/msisdn">MSISDN</Link>,
                token, or alias where appropriate. IP, session, browser, and campaign
                data may also be recorded where permitted and useful for audit or
                dispute handling.
              </p>
              <p>
                Avoid pre-ticked boxes, confusing page flows, or misleading CTAs. A
                button should not imply one action while triggering another.
              </p>
            </ComplianceSection>

            <ComplianceSection eyebrow="4. Cancellation" title="Unsubscribe and cancellation">
              <p>
                Subscription services need a clear cancellation path. In many markets,
                common methods include SMS STOP, USSD, a web portal, customer care, or
                operator self-care. The right method depends on operator and market
                requirements.
              </p>
              <p>
                Users should not be trapped in unclear flows. Cancellation should be
                processed quickly, and cancellation instructions should be easy to
                find on the landing page, confirmation message, receipt, or service
                support page.
              </p>
            </ComplianceSection>

            <ComplianceSection eyebrow="5. Acquisition" title="Advertising and landing pages">
              <p>
                Ads and landing pages should match the service being sold. Avoid
                misleading claims, fake prizes, fake urgency, or implying the user has
                already won something unless that is genuinely true and permitted.
              </p>
              <p>
                Dark patterns damage trust. CTA wording should be honest: Subscribe,
                Confirm, Continue, or Pay are clearer than deceptive wording that hides
                the billing action.
              </p>
            </ComplianceSection>

            <ComplianceSection eyebrow="6. Support" title="Customer support and refunds">
              <p>
                Users need a way to get help. Merchants, aggregators, and operators
                should know who handles first-line support, escalation, complaint
                handling, refunds, and reporting.
              </p>
              <p>
                Refund policies should be clear. High refund rates, repeated
                complaints, or support patterns around the same service are warning
                signs that the offer, flow, traffic, or consent evidence may need
                review.
              </p>
            </ComplianceSection>

            <ComplianceSection eyebrow="7. Traffic" title="Fraud and traffic quality">
              <p>
                DCB can be vulnerable to accidental clicks, misleading flows, bot
                traffic, click injection, malware, and poor affiliate traffic.
                Operators and aggregators should monitor abnormal traffic patterns,
                conversion-rate anomalies, refund spikes, complaint spikes, and
                source-level reporting.
              </p>
              <p>
                Traffic partners should be held accountable. If a source creates
                repeated complaints or suspicious conversion behaviour, it should be
                reviewed, capped, blocked, or forced through stronger controls.
              </p>
            </ComplianceSection>

            <ComplianceSection eyebrow="8. Identity" title="Data privacy and identity">
              <p>
                Subscriber identity data must be handled carefully. Raw MSISDN exposure
                can create privacy and tracking risk, so token or alias models may be
                better long-term where they are available and supported by the
                operator ecosystem.
              </p>
              <p>
                Legacy{' '}
                <Link className="atlas-link" to="/glossary/header-enrichment">
                  Header Enrichment
                </Link>{' '}
                helped reduce friction, but browser security and HTTPS-first behaviour
                are changing assumptions. For more context, read the DCB Atlas article
                on{' '}
                <Link
                  className="atlas-link"
                  to="/insights/chrome-https-msisdn-header-enrichment-dcb-impact"
                >
                  Chrome HTTPS and MSISDN Header Enrichment
                </Link>
                .
              </p>
            </ComplianceSection>

            <ComplianceSection eyebrow="9. Approval" title="Operator and aggregator approval">
              <p>
                Operators usually require service approval before launch. Aggregators
                often enforce operator rules because they are responsible for keeping
                routes healthy and complaint levels under control.
              </p>
              <p>
                Approval may include creative review, landing page review, pricing
                review, terms review, test flow, customer care details, traffic source
                review, and reporting expectations. Requirements vary by market.
              </p>
            </ComplianceSection>

            <ComplianceSection eyebrow="10. Checklist" title="Compliance checklist">
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
            </ComplianceSection>

            <ComplianceSection eyebrow="11. Final view" title="Compliance protects revenue">
              <p>
                DCB compliance should not be treated as a blocker. Good compliance
                protects the user, protects the operator, protects the merchant, and
                protects long-term revenue. The goal is not to add friction for its
                own sake; the goal is to make the billing journey clear, accountable,
                and sustainable.
              </p>
            </ComplianceSection>
          </div>

          <aside className="space-y-4">
            <div className="rounded-[24px] bg-[#12354a] p-5 text-sm leading-7 text-[#f3ead9]">
              <p className="atlas-eyebrow text-[#d8ba7a]">Related glossary</p>
              <div className="mt-4 flex flex-col gap-3">
                <Link className="font-semibold text-white" to="/glossary/direct-carrier-billing">
                  Direct Carrier Billing
                </Link>
                <Link className="font-semibold text-white" to="/glossary/msisdn">
                  MSISDN
                </Link>
                <Link className="font-semibold text-white" to="/glossary/header-enrichment">
                  Header Enrichment
                </Link>
                <Link className="font-semibold text-white" to="/glossary/otp">
                  OTP
                </Link>
                <Link className="font-semibold text-white" to="/glossary/aggregator">
                  Aggregator
                </Link>
              </div>
            </div>
            <div className="rounded-[24px] border border-[#12354a]/10 bg-white/70 p-5 text-sm leading-7 text-[#35505f]">
              <p className="font-semibold text-[#0d1b24]">Useful next pages</p>
              <div className="mt-3 flex flex-col gap-2">
                <Link className="atlas-link" to="/resources">Resource hub</Link>
                <Link className="atlas-link" to="/resources/how-direct-carrier-billing-works">
                  How DCB works
                </Link>
                <Link className="atlas-link" to="/resources/what-is-direct-carrier-billing">
                  What is DCB?
                </Link>
                <Link className="atlas-link" to="/resources/dcb-vs-card-payments-vs-wallets">
                  DCB vs cards vs wallets
                </Link>
                <Link className="atlas-link" to="/methodology">Atlas methodology</Link>
                <Link className="atlas-link" to="/about">About DCB Atlas</Link>
              </div>
            </div>
          </aside>
        </div>
      </article>

      <section className="atlas-panel px-6 py-6">
        <SectionHeading
          eyebrow="Market-neutral note"
          title="Use this as a checklist, not legal advice"
          description="The principles are common across many DCB and VAS programmes, but launch requirements should always be checked against country, regulator, operator and aggregator rules."
        />
      </section>
    </div>
  )
}
