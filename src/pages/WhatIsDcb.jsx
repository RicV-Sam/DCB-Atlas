import { Link } from 'react-router-dom'
import { PageMetadata } from '../components/shared/PageMetadata'
import { SectionHeading } from '../components/shared/SectionHeading'
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
} from '../utils/seo'

const pathname = '/resources/what-is-direct-carrier-billing/'
const title =
  'What is Direct Carrier Billing? DCB Explained for Operators, Merchants and VAS Teams'
const description =
  'A plain-English guide to Direct Carrier Billing, how DCB works, why it matters for mobile operators, merchants, aggregators and VAS businesses, and where the model is evolving.'

const glossaryLinks = [
  ['Direct Carrier Billing', '/glossary/direct-carrier-billing'],
  ['MSISDN', '/glossary/msisdn'],
  ['Header Enrichment', '/glossary/header-enrichment'],
  ['OTP', '/glossary/otp'],
  ['CAMARA', '/glossary/camara'],
  ['Aggregator', '/glossary/aggregator'],
]

function GuideSection({ eyebrow, title: sectionTitle, children }) {
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

export function WhatIsDcbPage() {
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
            headline: 'What is Direct Carrier Billing? A Plain-English Guide',
            description,
            pathname,
            datePublished: '2026-05-13',
            dateModified: '2026-05-13',
          }),
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Resources', path: pathname },
            { name: 'What is Direct Carrier Billing?', path: pathname },
          ]),
        ]}
      />

      <article className="atlas-panel px-6 py-8 sm:px-8 sm:py-10">
        <p className="atlas-eyebrow">Evergreen guide</p>
        <h1 className="atlas-title mt-3 max-w-5xl text-4xl font-semibold leading-tight text-[#0d1b24] sm:text-6xl">
          What is Direct Carrier Billing? A Plain-English Guide
        </h1>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-[#35505f]">
          Direct Carrier Billing, usually shortened to DCB, lets a mobile user pay
          for eligible digital goods or services through their prepaid airtime or
          postpaid mobile bill. It is one of the core commercial tools behind many
          VAS, MVAS, content, gaming, subscription, and micro-payment models.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="space-y-12">
            <GuideSection eyebrow="1. The simple version" title="What Direct Carrier Billing is">
              <p>
                DCB is a payment method built around the mobile operator billing
                relationship. Instead of asking the user for a card, wallet, or bank
                account, the service charges the user's mobile account. If the user is
                prepaid, the charge comes from airtime or stored mobile balance. If the
                user is postpaid, the charge appears on the mobile bill.
              </p>
              <p>
                The model is especially useful where card penetration is low, where
                users prefer mobile-first payments, or where the product price is too
                small to justify a heavy checkout process. It is also useful when the
                merchant wants distribution through operator relationships rather than
                only app stores, cards, or wallets.
              </p>
            </GuideSection>

            <GuideSection eyebrow="2. The flow" title="How DCB works in simple terms">
              <p>
                A typical DCB journey starts when the user sees an offer for a game,
                video service, education product, donation, ticket, subscription, or
                other digital item. The user chooses to buy or subscribe, the flow
                identifies the mobile number or subscriber account, the price and terms
                are shown, and the user confirms.
              </p>
              <p>
                Behind the scenes, a merchant or content provider usually connects
                through a DCB <Link className="atlas-link" to="/glossary/aggregator">aggregator</Link>.
                The aggregator connects to one or more mobile operators, routes the
                charge, returns billing status, supports reporting, and helps settlement
                between the parties.
              </p>
              <p>
                For a step-by-step operating view, see{' '}
                <Link className="atlas-link" to="/resources/how-direct-carrier-billing-works">
                  How Direct Carrier Billing Works
                </Link>
                .
              </p>
            </GuideSection>

            <GuideSection eyebrow="3. The parties" title="Operators, aggregators, and merchants">
              <p>
                The mobile operator owns the subscriber billing relationship and sets
                many of the market rules: what can be billed, how consent should be
                captured, how refunds work, what price points are allowed, and what
                compliance evidence is required.
              </p>
              <p>
                Aggregators sit between operators and merchants. They reduce the need
                for every merchant to integrate separately with each operator. Merchants
                and content providers bring the product, service, marketing, customer
                experience, and user support obligations. In a healthy model, all three
                parties care about conversion, consent, refunds, and long-term trust.
              </p>
            </GuideSection>

            <GuideSection eyebrow="4. Confirmation models" title="One-click, two-click, OTP, and DOI-style flows">
              <p>
                DCB journeys vary by market. Some are low-friction one-click or
                two-click flows where the user can be identified on mobile data and
                asked to confirm quickly. Some require a PIN or{' '}
                <Link className="atlas-link" to="/glossary/otp">OTP</Link>, where the
                user receives a one-time code and enters it before the transaction
                continues. Some subscription models use DOI-style logic, meaning a
                double opt-in or second confirmation step.
              </p>
              <p>
                Low friction matters because every extra step creates drop-off. But
                friction is not automatically bad. In some markets, stronger
                confirmation protects users, reduces disputes, and satisfies operator or
                regulator expectations. The commercial challenge is finding the right
                balance between conversion and clear consent.
              </p>
            </GuideSection>

            <GuideSection eyebrow="5. Commercial model" title="Why DCB is useful">
              <p>
                DCB can open payment access for users who are under-carded, reluctant
                to enter card details, or buying small-value digital services. Common
                use cases include mobile games, video, education, digital content,
                donations, ticketing, subscriptions, micro-payments, and other VAS
                products.
              </p>
              <p>
                The commercial model is usually revenue share. The user pays through
                airtime or a mobile bill, then the operator, aggregator, and merchant
                each receive their agreed share. The exact percentages vary by market,
                operator, product category, risk, volume, and commercial agreement.
              </p>
              <p>
                To compare DCB with other payment options, read{' '}
                <Link className="atlas-link" to="/resources/dcb-vs-card-payments-vs-wallets">
                  DCB vs Card Payments vs Wallets
                </Link>
                . For the commercial waterfall behind operator billing, see{' '}
                <Link className="atlas-link" to="/resources/operator-revenue-share-models">
                  Operator Revenue Share Models
                </Link>
                .
              </p>
            </GuideSection>

            <GuideSection eyebrow="6. Compliance" title="Compliance basics and risks">
              <p>
                DCB is strongest when users understand what they are buying. Good flows
                show the price, renewal terms, billing frequency, provider identity,
                confirmation step, refund route, customer care details, and unsubscribe
                instructions. Subscription services need especially clear cancellation
                and recurring billing information.
              </p>
              <p>
                Risks include fraud, misleading landing pages, poor consent records,
                unclear pricing, accidental subscriptions, high refunds, chargebacks or
                complaint pressure, and regulator intervention. Operators and
                aggregators often respond by tightening rules, adding OTP, limiting
                categories, or pausing merchants that create too much consumer harm.
              </p>
              <p>
                For a practical market-neutral checklist, read{' '}
                <Link className="atlas-link" to="/resources/dcb-compliance-basics">
                  DCB Compliance Basics
                </Link>
                .
              </p>
            </GuideSection>

            <GuideSection eyebrow="7. Future direction" title="Where DCB is evolving">
              <p>
                The future of DCB is likely less dependent on fragile browser tricks
                and more dependent on secure operator identity, privacy-friendly APIs,
                and better fraud controls. Legacy{' '}
                <Link className="atlas-link" to="/glossary/header-enrichment">Header Enrichment</Link>{' '}
                helped make DCB seamless, but the web is moving further toward HTTPS by
                default. That makes identity architecture a strategic issue, not only a
                technical detail.
              </p>
              <p>
                Initiatives such as <Link className="atlas-link" to="/glossary/camara">CAMARA</Link>{' '}
                and GSMA Open Gateway point toward standardised network APIs, although
                real availability depends on operator implementation and commercial
                readiness. DCB will also sit alongside wallets, super apps, cards, app
                stores, and big-tech identity layers. Operators that want to stay
                relevant need to treat billing and identity as connected products.
              </p>
              <p>
                For a deeper look at why web security changes matter for DCB identity,
                read the DCB Atlas analysis on{' '}
                <Link
                  className="atlas-link"
                  to="/insights/chrome-https-msisdn-header-enrichment-dcb-impact"
                >
                  Chrome HTTPS and MSISDN Header Enrichment
                </Link>
                .
              </p>
            </GuideSection>
          </div>

          <aside className="space-y-4">
            <div className="rounded-[24px] bg-[#12354a] p-5 text-sm leading-7 text-[#f3ead9]">
              <p className="atlas-eyebrow text-[#d8ba7a]">Glossary</p>
              <div className="mt-4 flex flex-col gap-3">
                {glossaryLinks.map(([label, to]) => (
                  <Link key={to} className="font-semibold text-white" to={to}>
                    {label}
                  </Link>
                ))}
              </div>
            </div>
            <div className="rounded-[24px] border border-[#12354a]/10 bg-white/70 p-5 text-sm leading-7 text-[#35505f]">
              <p className="font-semibold text-[#0d1b24]">Useful next pages</p>
              <div className="mt-3 flex flex-col gap-2">
                <Link className="atlas-link" to="/resources">Resource hub</Link>
                <Link className="atlas-link" to="/markets">Browse DCB markets</Link>
                <Link className="atlas-link" to="/resources/how-direct-carrier-billing-works">
                  How DCB works
                </Link>
                <Link className="atlas-link" to="/resources/dcb-compliance-basics">
                  Compliance basics
                </Link>
                <Link className="atlas-link" to="/resources/dcb-vs-card-payments-vs-wallets">
                  DCB vs cards vs wallets
                </Link>
                <Link className="atlas-link" to="/resources/operator-revenue-share-models">
                  Operator revenue share models
                </Link>
                <Link className="atlas-link" to="/methodology">Read methodology</Link>
                <Link className="atlas-link" to="/about">About DCB Atlas</Link>
              </div>
            </div>
          </aside>
        </div>
      </article>

      <section className="atlas-panel px-6 py-6">
        <SectionHeading
          eyebrow="Next step"
          title="Use the guide, then compare markets"
          description="Once the model is clear, the Atlas market directory helps you compare where DCB and VAS opportunities may deserve deeper validation."
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
