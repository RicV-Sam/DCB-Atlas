import { Link } from 'react-router-dom'
import { PageMetadata } from '../components/shared/PageMetadata'
import { SectionHeading } from '../components/shared/SectionHeading'
import {
  buildBreadcrumbSchema,
  buildCollectionSchema,
} from '../utils/seo'

const pathname = '/resources/'
const title = 'DCB Atlas Resources'
const description =
  'Evergreen Direct Carrier Billing guides covering DCB basics, user journeys, compliance, payment comparisons, revenue share, operator identity and core VAS terminology.'

const resourceGroups = [
  {
    eyebrow: 'Start here',
    title: 'Understand the model',
    description:
      'Clear foundations for people new to DCB and for teams aligning around the same operating model.',
    items: [
      {
        title: 'What is Direct Carrier Billing?',
        to: '/resources/what-is-direct-carrier-billing',
        summary:
          'A practical introduction to DCB, operator billing, aggregators, use cases, compliance basics and the future of the model.',
      },
      {
        title: 'How Direct Carrier Billing Works',
        to: '/resources/how-direct-carrier-billing-works',
        summary:
          'A visual walkthrough of the user journey, identification, consent, charging, reporting, settlement, refunds and support.',
      },
    ],
  },
  {
    eyebrow: 'Commercial model',
    title: 'Compare economics and payment choices',
    description:
      'Guides for commercial teams comparing DCB with other methods and modelling the revenue waterfall correctly.',
    items: [
      {
        title: 'DCB vs Card Payments vs Wallets',
        to: '/resources/dcb-vs-card-payments-vs-wallets',
        summary:
          'A balanced comparison of where carrier billing, cards and wallets can each make sense.',
      },
      {
        title: 'Operator Revenue Share Models',
        to: '/resources/operator-revenue-share-models',
        summary:
          'How gross billed amount becomes operator payout, aggregator share and merchant net revenue.',
      },
    ],
  },
  {
    eyebrow: 'Compliance and user protection',
    title: 'Build flows that can last',
    description:
      'Market-neutral guidance on the user-protection themes operators, aggregators and merchants usually need to consider.',
    items: [
      {
        title: 'DCB Compliance Basics',
        to: '/resources/dcb-compliance-basics',
        summary:
          'Consent, pricing visibility, unsubscribe paths, refunds, customer support, fraud controls and operator approval themes.',
      },
    ],
  },
  {
    eyebrow: 'Technical and identity topics',
    title: 'Follow the identity transition',
    description:
      'Identity, browser and network API topics that increasingly affect DCB conversion and operator strategy.',
    items: [
      {
        title: 'Chrome HTTPS and MSISDN Header Enrichment',
        to: '/insights/chrome-https-msisdn-header-enrichment-dcb-impact',
        summary:
          'Why HTTPS-first browsing is a wake-up call for legacy Header Enrichment and silent identification flows.',
      },
      {
        title: 'MSISDN',
        to: '/glossary/msisdn',
        summary:
          'The mobile number or subscriber number used commercially in many DCB and VAS flows.',
      },
      {
        title: 'Header Enrichment',
        to: '/glossary/header-enrichment',
        summary:
          'Legacy mobile-network identification through enriched HTTP headers and why HTTPS changes the model.',
      },
      {
        title: 'OTP',
        to: '/glossary/otp',
        summary:
          'One-time password verification, why it is used, and why it adds friction compared with seamless identification.',
      },
      {
        title: 'CAMARA',
        to: '/glossary/camara',
        summary:
          'The API direction behind more standardised access to network capabilities, including identity-related use cases.',
      },
    ],
  },
]

function ResourceCard({ item }) {
  return (
    <article className="rounded-[24px] border border-[#12354a]/10 bg-white/75 p-5">
      <h3 className="text-xl font-semibold text-[#0d1b24]">{item.title}</h3>
      <p className="mt-3 text-sm leading-7 text-[#35505f]">{item.summary}</p>
      <Link className="atlas-link mt-4 inline-flex" to={item.to}>
        Read more
      </Link>
    </article>
  )
}

export function ResourcesIndexPage() {
  return (
    <div className="atlas-container space-y-8">
      <PageMetadata
        title={title}
        description={description}
        pathname={pathname}
        structuredData={[
          buildCollectionSchema({ name: title, description, pathname }),
          buildBreadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Resources', path: pathname },
          ]),
        ]}
      />

      <section className="atlas-panel px-6 py-8 sm:px-8 sm:py-10">
        <p className="atlas-eyebrow">Resource hub</p>
        <h1 className="atlas-title mt-3 max-w-5xl text-4xl font-semibold leading-tight text-[#0d1b24] sm:text-6xl">
          Direct Carrier Billing resources for operators, aggregators and VAS teams
        </h1>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-[#35505f]">
          Start with the DCB basics, then move into user journeys, compliance,
          commercial models, payment comparisons and identity topics. These pages are
          designed to help new readers get oriented and experienced teams align around
          clear language.
        </p>
      </section>

      {resourceGroups.map((group) => (
        <section key={group.eyebrow} className="atlas-panel px-6 py-7 sm:px-8">
          <SectionHeading
            eyebrow={group.eyebrow}
            title={group.title}
            description={group.description}
          />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {group.items.map((item) => (
              <ResourceCard key={item.to} item={item} />
            ))}
          </div>
        </section>
      ))}

      <section className="atlas-panel px-6 py-6">
        <SectionHeading
          eyebrow="Next step"
          title="Use the glossary while reading"
          description="Keep the glossary open when you need fast definitions for operator billing, subscriber identity and DCB flow terminology."
          action={
            <Link className="atlas-button-secondary" to="/glossary">
              Open glossary
            </Link>
          }
        />
      </section>
    </div>
  )
}
