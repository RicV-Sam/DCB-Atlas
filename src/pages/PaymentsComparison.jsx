import { Link } from 'react-router-dom'
import { PageMetadata } from '../components/shared/PageMetadata'
import { SectionHeading } from '../components/shared/SectionHeading'
import {
  buildArticleSchema,
  buildBreadcrumbSchema,
} from '../utils/seo'

const pathname = '/resources/dcb-vs-card-payments-vs-wallets/'
const title = 'DCB vs Card Payments vs Wallets: When Each Payment Method Makes Sense'
const description =
  'A market-neutral guide comparing Direct Carrier Billing, card payments and mobile wallets for merchants, operators, aggregators and VAS teams.'

const comparisonRows = [
  {
    angle: 'User account',
    dcb: 'Mobile number, prepaid balance or postpaid bill.',
    cards: 'Card account issued through a bank or card scheme.',
    wallets: 'Wallet balance, linked bank account, card, or stored payment method.',
  },
  {
    angle: 'Best fit',
    dcb: 'Mobile-first digital content, micro-payments, subscriptions, gaming and VAS where operator billing access matters.',
    cards: 'Broad e-commerce, higher-ticket goods, cross-border payments and markets with strong card adoption.',
    wallets: 'Markets where wallet adoption is high, app ecosystems are strong, and users trust wallet checkout.',
  },
  {
    angle: 'Main strength',
    dcb: 'Low-friction billing through the mobile relationship, especially for users without cards or who prefer not to enter card details.',
    cards: 'Global acceptance, familiar merchant tooling, mature fraud controls and broad payment coverage.',
    wallets: 'Fast returning-user checkout, stored credentials, peer-to-peer ecosystems and super-app distribution where available.',
  },
  {
    angle: 'Main trade-off',
    dcb: 'Operator rules, revenue-share economics, compliance controls and market-by-market route availability.',
    cards: 'Card access, card-entry friction, chargeback management and possible lower conversion for very small purchases.',
    wallets: 'Wallet availability, user funding, ecosystem dependency and integration fragmentation across markets.',
  },
]

const decisionQuestions = [
  'Is the product digital, mobile-first and suitable for operator billing?',
  'Does the market have strong prepaid or under-carded user segments?',
  'Is the price point small enough that checkout friction matters heavily?',
  'Do users already trust cards or wallets for this category?',
  'Can the merchant support refunds, support, consent logs and compliance evidence?',
  'Are operator routes, aggregator access and reporting reliable enough for scale?',
]

function ComparisonSection({ eyebrow, title: sectionTitle, children }) {
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

export function PaymentsComparisonPage() {
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
            { name: 'DCB vs Cards vs Wallets', path: pathname },
          ]),
        ]}
      />

      <article className="atlas-panel px-6 py-8 sm:px-8 sm:py-10">
        <p className="atlas-eyebrow">Evergreen resource</p>
        <h1 className="atlas-title mt-3 max-w-5xl text-4xl font-semibold leading-tight text-[#0d1b24] sm:text-6xl">
          DCB vs Card Payments vs Wallets: When Each Payment Method Makes Sense
        </h1>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-[#35505f]">
          Direct Carrier Billing, card payments and mobile wallets can all be strong
          payment methods. The right choice depends on market context, product type,
          user trust, checkout friction, compliance requirements, and commercial
          economics. DCB is not always better; cards and wallets are not always
          better either.
        </p>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="space-y-12">
            <section className="rounded-[28px] bg-[#12354a] px-6 py-6 text-[#f3ead9]">
              <p className="atlas-eyebrow text-[#d8ba7a]">Executive summary</p>
              <ul className="mt-4 space-y-3 text-sm leading-7">
                <li>DCB charges eligible services to airtime or the mobile bill.</li>
                <li>Cards are broad, mature and widely understood in many markets.</li>
                <li>Wallets can be very strong where users already store value and transact often.</li>
                <li>The best method depends on the user, product, operator route, checkout journey and market.</li>
                <li>Many merchants should support more than one payment method where practical.</li>
              </ul>
            </section>

            <ComparisonSection eyebrow="1. Positioning" title="What each payment method is">
              <p>
                <Link className="atlas-link" to="/glossary/direct-carrier-billing">
                  Direct Carrier Billing
                </Link>{' '}
                lets a user pay for eligible digital goods or services through mobile
                airtime or a postpaid bill. Card payments charge a debit, credit or
                prepaid card. Wallets charge a stored wallet balance, linked account,
                linked card or in-app payment method.
              </p>
              <p>
                These methods often coexist. A content service, game, donation product
                or subscription may use DCB for some users, cards for others, and
                wallets in markets where wallet adoption is strong.
              </p>
            </ComparisonSection>

            <ComparisonSection eyebrow="2. Comparison" title="Side-by-side comparison">
              <div className="overflow-hidden rounded-[24px] border border-[#12354a]/10 bg-white/80">
                <div className="grid grid-cols-4 bg-[#12354a] text-xs font-semibold uppercase tracking-[0.14em] text-white">
                  <div className="p-3">Angle</div>
                  <div className="p-3">DCB</div>
                  <div className="p-3">Cards</div>
                  <div className="p-3">Wallets</div>
                </div>
                {comparisonRows.map((row) => (
                  <div
                    key={row.angle}
                    className="grid grid-cols-1 border-t border-[#12354a]/10 text-sm leading-6 text-[#35505f] md:grid-cols-4"
                  >
                    <div className="bg-[#f5efe4] p-3 font-semibold text-[#0d1b24]">
                      {row.angle}
                    </div>
                    <div className="p-3">{row.dcb}</div>
                    <div className="p-3">{row.cards}</div>
                    <div className="p-3">{row.wallets}</div>
                  </div>
                ))}
              </div>
            </ComparisonSection>

            <ComparisonSection eyebrow="3. DCB strengths" title="Where DCB can be useful">
              <p>
                DCB can be useful when the user is mobile-first, the product is
                digital, the price point is relatively small, and the market has users
                who may not have cards or may not want to enter card details. It can
                also be useful where operator distribution, VAS partnerships or mobile
                subscriptions are part of the commercial model.
              </p>
              <p>
                DCB conversion depends heavily on low friction, reliable subscriber
                identification, operator approval and clear consent. To understand the
                full journey, read{' '}
                <Link className="atlas-link" to="/resources/how-direct-carrier-billing-works">
                  How Direct Carrier Billing Works
                </Link>
                .
              </p>
            </ComparisonSection>

            <ComparisonSection eyebrow="4. Cards and wallets" title="Where cards and wallets may be stronger">
              <p>
                Cards may be stronger for broader e-commerce, higher-ticket goods,
                international payments, recurring services where card trust is high,
                and markets with mature card acceptance. Wallets may be stronger where
                users already keep money in a wallet, where wallet apps dominate daily
                commerce, or where a super-app ecosystem gives merchants strong reach.
              </p>
              <p>
                Cards and wallets can also give merchants more direct payment control
                in some contexts. The trade-off is that each method has its own
                checkout friction, fraud model, chargeback or refund process,
                integration requirements and user trust assumptions.
              </p>
            </ComparisonSection>

            <ComparisonSection eyebrow="5. Commercial trade-offs" title="What merchants and operators should compare">
              <p>
                The comparison should not stop at headline conversion. Teams should
                compare approval requirements, user eligibility, failed payment rates,
                refund rates, complaint levels, support load, reporting quality,
                settlement timing, net revenue, user lifetime value and the strategic
                value of the operator or wallet relationship.
              </p>
              <p>
                For DCB, operator and{' '}
                <Link className="atlas-link" to="/glossary/aggregator">aggregator</Link>{' '}
                requirements can shape everything from landing page copy to price
                points and reporting. For cards and wallets, scheme rules, wallet
                policies, fraud tooling and local payment habits can be just as
                important.
              </p>
            </ComparisonSection>

            <ComparisonSection eyebrow="6. Compliance" title="Compliance and user protection">
              <p>
                Every payment method needs user protection. In DCB, this often means
                clear pricing, active consent, unsubscribe routes, support, refund
                handling and traffic monitoring. Cards and wallets have their own
                dispute, chargeback, refund, authentication and consumer protection
                models.
              </p>
              <p>
                For the DCB-specific checklist, read{' '}
                <Link className="atlas-link" to="/resources/dcb-compliance-basics">
                  DCB Compliance Basics
                </Link>
                .
              </p>
            </ComparisonSection>

            <ComparisonSection eyebrow="7. Decision checklist" title="Questions to ask before choosing">
              <ul className="grid gap-3 sm:grid-cols-2">
                {decisionQuestions.map((item) => (
                  <li
                    key={item}
                    className="rounded-[20px] border border-[#12354a]/10 bg-white/70 px-4 py-3 text-sm leading-6"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </ComparisonSection>

            <ComparisonSection eyebrow="8. Final view" title="Use the right mix">
              <p>
                DCB, cards and wallets are tools, not religions. A strong payment
                strategy uses the method that fits the user, market, product and risk
                profile. In many cases, the best answer is a thoughtful mix rather than
                a single universal checkout path.
              </p>
            </ComparisonSection>
          </div>

          <aside className="space-y-4">
            <div className="rounded-[24px] bg-[#12354a] p-5 text-sm leading-7 text-[#f3ead9]">
              <p className="atlas-eyebrow text-[#d8ba7a]">Related resources</p>
              <div className="mt-4 flex flex-col gap-3">
                <Link className="font-semibold text-white" to="/resources/what-is-direct-carrier-billing">
                  What is Direct Carrier Billing?
                </Link>
                <Link className="font-semibold text-white" to="/resources/how-direct-carrier-billing-works">
                  How DCB Works
                </Link>
                <Link className="font-semibold text-white" to="/resources/dcb-compliance-basics">
                  DCB Compliance Basics
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
                <Link className="atlas-link" to="/glossary/otp">OTP</Link>
              </div>
            </div>
            <div className="rounded-[24px] border border-[#12354a]/10 bg-white/70 p-5 text-sm leading-7 text-[#35505f]">
              <p className="font-semibold text-[#0d1b24]">Atlas context</p>
              <div className="mt-3 flex flex-col gap-2">
                <Link className="atlas-link" to="/markets">Browse markets</Link>
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
          title="Compare the market context"
          description="Payment-method decisions become clearer when you understand market readiness, operator routes, aggregator depth and compliance risk."
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
