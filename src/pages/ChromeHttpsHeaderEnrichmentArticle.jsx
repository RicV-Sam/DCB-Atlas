import { Link } from 'react-router-dom'
import { PageMetadata } from '../components/shared/PageMetadata'
import {
  BASE_PATH,
  SITE_URL,
  buildArticleSchema,
  buildBreadcrumbSchema,
} from '../utils/seo'

const slug = 'chrome-https-msisdn-header-enrichment-dcb-impact'
const articlePath = `/insights/${slug}`
const assetRoot = `${BASE_PATH}assets/insights/${slug}/`
const absoluteAssetRoot = `${SITE_URL}/assets/insights/${slug}/`

const title =
  'Chrome HTTPS, MSISDN Header Enrichment and DCB: What Operators Need to Know'
const description =
  "A plain-English guide to how Chrome's HTTPS-first move may impact MSISDN Header Enrichment, Direct Carrier Billing conversion, and operator VAS revenue - plus the possible solutions."

const images = {
  hero: {
    src: `${assetRoot}dcb-wake-up-call.png`,
    alt: 'The DCB wake-up call: why Chrome HTTPS could hit operator revenue',
  },
  changing: {
    src: `${assetRoot}what-is-changing.png`,
    alt: 'What is changing with Chrome HTTPS-first for public HTTP sites',
  },
  headerEnrichment: {
    src: `${assetRoot}what-is-header-enrichment.png`,
    alt: 'What is Header Enrichment and how it supports one or two click DCB',
  },
  httpsBreaks: {
    src: `${assetRoot}why-https-breaks-old-model.png`,
    alt: 'Why HTTPS breaks the old HTTP Header Enrichment model',
  },
  commercialImpact: {
    src: `${assetRoot}commercial-impact.png`,
    alt: 'The commercial impact of extra billing steps and OTP friction',
  },
  solutions: {
    src: `${assetRoot}possible-solutions.png`,
    alt: 'Possible solutions for secure operator identity and DCB conversion',
  },
  reaction: {
    src: `${assetRoot}knee-jerk-reaction.png`,
    alt: 'The knee-jerk reaction when DCB revenue falls',
  },
  actions: {
    src: `${assetRoot}operator-actions.png`,
    alt: 'What operators should be doing now to protect DCB revenue',
  },
}

const articleSchema = buildArticleSchema({
  headline: title,
  description,
  pathname: articlePath,
  image: `${absoluteAssetRoot}dcb-wake-up-call.png`,
  datePublished: '2026-05-13',
  dateModified: '2026-05-13',
})

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', path: '/' },
  { name: 'Insights', path: '/insights' },
  { name: 'Chrome HTTPS and Header Enrichment', path: articlePath },
])

function ArticleImage({ image, caption }) {
  return (
    <figure className="my-8 overflow-hidden rounded-[24px] border border-[#12354a]/10 bg-white/85 shadow-[0_18px_50px_rgba(17,35,49,0.08)]">
      <img
        src={image.src}
        alt={image.alt}
        className="mx-auto max-h-[520px] w-full object-contain"
        loading="lazy"
      />
      {caption ? (
        <figcaption className="px-5 py-4 text-sm leading-6 text-[#5f6a72]">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  )
}

function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="scroll-mt-6">
      <p className="atlas-eyebrow">{eyebrow}</p>
      <h2 className="atlas-title mt-3 text-3xl font-semibold text-[#0d1b24] sm:text-4xl">
        {title}
      </h2>
      <div className="mt-5 space-y-5 text-base leading-8 text-[#35505f]">
        {children}
      </div>
    </section>
  )
}

function Checklist({ items }) {
  return (
    <ul className="mt-5 grid gap-3 sm:grid-cols-2">
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

export function ChromeHttpsHeaderEnrichmentArticle() {
  return (
    <article className="atlas-container space-y-8">
      <PageMetadata
        title={title}
        description={description}
        pathname={articlePath}
        type="article"
        appendSiteName={false}
        image={`${absoluteAssetRoot}dcb-wake-up-call.png`}
        structuredData={[articleSchema, breadcrumbSchema]}
      />

      <section className="atlas-panel grid overflow-hidden lg:grid-cols-[0.95fr_1.05fr]">
        <div className="flex items-start bg-[#061735] p-4 sm:p-6">
          <img
            src={images.hero.src}
            alt={images.hero.alt}
            className="mx-auto max-h-[440px] w-full rounded-[20px] object-contain"
          />
        </div>
        <div className="px-6 py-8 sm:px-8 sm:py-10 lg:flex lg:flex-col lg:justify-center">
          <Link className="atlas-link" to="/insights">
            Back to insights
          </Link>
          <p className="atlas-eyebrow mt-6">Operator billing transition</p>
          <h1 className="atlas-title mt-3 max-w-5xl text-4xl font-semibold leading-tight text-[#0d1b24] sm:text-5xl">
            {title}
          </h1>
          <p className="mt-5 max-w-4xl text-lg leading-8 text-[#35505f]">
            This is not a story about HTTPS being bad, or Google attacking Direct
            Carrier Billing. It is a wake-up call for a DCB ecosystem that still
            depends, in some places, on silent identification methods designed for a
            less encrypted web.
          </p>
          <div className="mt-6 flex flex-wrap gap-2 text-sm font-semibold text-[#12354a]">
            <span className="rounded-full bg-white/80 px-4 py-2">DCB</span>
            <span className="rounded-full bg-white/80 px-4 py-2">MSISDN Header Enrichment</span>
            <span className="rounded-full bg-white/80 px-4 py-2">Chrome HTTPS-first</span>
            <span className="rounded-full bg-white/80 px-4 py-2">Operator identity</span>
          </div>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div className="atlas-panel px-6 py-8 sm:px-8">
          <div className="space-y-12">
            <section className="rounded-[28px] bg-[#12354a] px-6 py-6 text-[#f3ead9]">
              <p className="atlas-eyebrow text-[#d8ba7a]">Executive summary</p>
              <ul className="mt-5 space-y-3 text-sm leading-7">
                <li>Chrome is moving further towards HTTPS-first behaviour for public sites.</li>
                <li>Legacy MSISDN Header Enrichment often relied on HTTP-based flows.</li>
                <li>HTTPS encrypts the browser session, making old-style header insertion difficult or impossible.</li>
                <li>DCB conversion may fall if users move from silent identification to manual MSISDN entry and OTP.</li>
                <li>Operators should not wait for revenue to drop before acting.</li>
                <li>The long-term answer is likely secure, API-based, privacy-friendly operator identity.</li>
              </ul>
            </section>

            <Section
              id="what-is-changing"
              eyebrow="1. Chrome and HTTPS"
              title="What is changing with Chrome and HTTPS?"
            >
              <p>
                Chrome is increasingly trying to use HTTPS by default. In plain
                English, that means Chrome first tries to connect to a safer encrypted
                version of a public website, and can warn the user before loading a
                public HTTP-only page.
              </p>
              <p>
                Google's published Chrome plan says the public-sites variant of
                "Always Use Secure Connections" is enabled for Enhanced Safe Browsing
                users in Chrome 147, released in April 2026, and is planned as the
                default for all users with Chrome 154 in October 2026. This does not
                mean Google permanently blocks every HTTP page. It means HTTPS-first
                behaviour and warnings add friction around public HTTP access.
              </p>
              <p>
                For users, this is a web security improvement. For legacy DCB flows,
                the issue is that old HTTP-based identification journeys may no
                longer work smoothly enough to protect conversion.
              </p>
              <p>
                Source note: the Chrome timeline is based on the Chrome Security
                Team's official post,{' '}
                <a
                  className="atlas-link"
                  href="https://www.googblogs.com/https-by-default/"
                  target="_blank"
                  rel="noreferrer"
                >
                  HTTPS by default
                </a>
                .
              </p>
              <ArticleImage image={images.changing} />
            </Section>

            <Section
              id="why-dcb-matters"
              eyebrow="2. DCB conversion"
              title="Why this matters to Direct Carrier Billing"
            >
              <p>
                DCB works best when the user journey is low-friction. The commercial
                promise is simple: the user sees an offer, confirms, and pays through
                the mobile bill or prepaid balance with as few steps as possible.
              </p>
              <p>
                One-click or two-click flows depend on identifying the user quickly.
                If the journey changes to "type your number, wait for an OTP, enter
                the OTP, then confirm", conversion usually falls. More steps create
                more hesitation, more failed attempts, and more abandonment.
              </p>
              <p>
                That is why this is not only a technical issue. It can become a
                revenue issue for mobile operators, aggregators, merchants, and VAS
                businesses that still rely on silent identification.
              </p>
            </Section>

            <Section
              id="header-enrichment"
              eyebrow="3. Header Enrichment"
              title="What is MSISDN Header Enrichment?"
            >
              <p>
                MSISDN Header Enrichment is an old but widely understood way of
                identifying a mobile user when they are browsing on mobile data.
              </p>
              <p>
                The simple version is this: the user is on the operator's mobile
                network, the operator recognises the subscriber, and the billing flow
                receives an identifier such as the MSISDN or a subscriber ID. The
                merchant or aggregator can then understand which mobile account should
                be used for the billing confirmation.
              </p>
              <p>
                This helped DCB feel seamless. It reduced typing, reduced OTP reliance,
                and made subscription or payment confirmation feel closer to one or two
                clicks.
              </p>
              <ArticleImage image={images.headerEnrichment} />
            </Section>

            <Section
              id="https-breaks-old-model"
              eyebrow="4. The old model"
              title="Why HTTPS breaks the old model"
            >
              <p>
                With ordinary HTTP traffic, the network could see or modify more of
                the request. In many legacy setups, that made it possible for an
                operator-side system to insert or expose an identifier into the flow.
              </p>
              <p>
                HTTPS changes the assumptions. The browser and destination site create
                an encrypted session. The operator still carries the traffic, but it
                should not be able to read or modify the browser request in the old
                way.
              </p>
              <p>
                That is good for privacy and security. It is also exactly why legacy
                HTTP Header Enrichment becomes fragile. The encrypted web protects the
                user, but it also removes the quiet network-layer shortcut many DCB
                flows were built around.
              </p>
              <ArticleImage image={images.httpsBreaks} />
            </Section>

            <Section
              id="commercial-impact"
              eyebrow="5. Commercial impact"
              title="The commercial impact"
            >
              <ArticleImage image={images.commercialImpact} />
              <p>
                When identification fails, the billing flow becomes harder. The user
                may be pushed to manual number entry, an OTP, a second confirmation
                screen, or a fallback payment method. Each extra step is a commercial
                tax on intent.
              </p>
              <p>
                The dangerous part is that the root cause can be misread. Failed
                enrichment may look like poor traffic, weak campaign quality, bad
                merchant performance, aggregator underperformance, or pricing fatigue.
                In reality, the user may simply no longer be identified silently at the
                point where the legacy flow expected identification to happen.
              </p>
            </Section>

            <Section
              id="knee-jerk-reaction"
              eyebrow="6. Revenue diagnosis"
              title="The likely knee-jerk reaction from operators and opcos"
            >
              <p>
                When revenue drops, the first internal conversation may not be about
                browser behaviour or identity architecture. It may be about traffic
                quality, Google Ads, merchants, aggregators, content, pricing,
                compliance wording, or campaign setup.
              </p>
              <p>
                Those factors can matter, but they may not be the real reason. The
                real issue may be that Chrome traffic is affected, Header Enrichment
                success rate falls, users cannot be silently identified, more users are
                pushed into manual MSISDN or OTP flows, and conversion drops.
              </p>
              <p>
                Operators should not wait for the quarterly revenue review to discover
                this problem. By then, the market may already have routed around the
                operator identity layer.
              </p>
              <ArticleImage image={images.reaction} />
            </Section>

            <Section
              id="solutions"
              eyebrow="7. Possible solutions"
              title="Possible solutions"
            >
              <ArticleImage image={images.solutions} />
              <h3 className="text-xl font-semibold text-[#0d1b24]">
                A. TLS termination / HTTPS enrichment
              </h3>
              <p>
                TLS termination or HTTPS enrichment can act as a short-term bridge in
                some controlled environments. It may preserve continuity where legacy
                journeys still depend on enrichment, but it is sensitive, must be
                designed carefully, and should not be treated as the future-proof
                answer for open web identity.
              </p>
              <h3 className="text-xl font-semibold text-[#0d1b24]">
                B. IP-to-MSISDN lookup API
              </h3>
              <p>
                In this model, the merchant or aggregator sends a secure
                server-to-server request. The operator maps network, session, or IP
                information to subscriber identity outside the encrypted browser
                request. This can protect conversion, but it requires operator
                investment, trust controls, security design, and scale.
              </p>
              <h3 className="text-xl font-semibold text-[#0d1b24]">
                C. Identity server / alias model
              </h3>
              <p>
                Instead of exposing the raw MSISDN, the operator can provide a token
                or alias. Merchant-specific aliases reduce unnecessary data sharing and
                help limit cross-site tracking. This is a stronger fit for GDPR-style
                privacy expectations and a more future-ready identity model.
              </p>
              <h3 className="text-xl font-semibold text-[#0d1b24]">
                D. CAMARA / GSMA Open Gateway
              </h3>
              <p>
                CAMARA and GSMA Open Gateway point towards a more standardised
                operator API layer. They are not a magic switch. Operators still need
                real implementation, product ownership, commercial agreements, and
                reliable operations. Strategically, though, this is the direction the
                industry should be watching closely.
              </p>
              <h3 className="text-xl font-semibold text-[#0d1b24]">
                E. OTP / manual MSISDN fallback
              </h3>
              <p>
                OTP and manual MSISDN entry work, and in some markets they may be the
                most familiar or compliant option. But they add friction and weaken
                DCB's biggest advantage. They should be a fallback, not the only
                strategy.
              </p>
            </Section>

            <Section
              id="operator-checklist"
              eyebrow="8. Operator checklist"
              title="What operators should do now"
            >
              <p>
                Operators need to get involved before the revenue line forces the
                conversation. The practical starting point is measurement, then a
                continuity plan, then a future identity roadmap.
              </p>
              <Checklist
                items={[
                  'Audit all DCB flows that still depend on HTTP-based Header Enrichment.',
                  'Measure Chrome traffic separately.',
                  'Measure Chrome version performance.',
                  'Track Header Enrichment success and failure rates.',
                  'Track drop-off by browser and journey step.',
                  'Engage aggregators and merchants early.',
                  'Choose a short-term continuity plan.',
                  'Define a long-term identity API roadmap.',
                  'Consider alias or token-based identity instead of raw MSISDN exposure.',
                  'Align with CAMARA and Open Gateway where practical.',
                  'Act before October 2026, not after.',
                ]}
              />
              <ArticleImage image={images.actions} />
            </Section>

            <Section
              id="merchant-aggregator-measurement"
              eyebrow="9. Measurement"
              title="What merchants and aggregators should measure"
            >
              <p>
                Merchants and aggregators should not wait for operators to provide the
                full diagnostic picture. They should split performance reporting around
                the variables most likely to reveal identification failure.
              </p>
              <Checklist
                items={[
                  'Chrome versus non-Chrome conversion.',
                  'Chrome version conversion.',
                  'Mobile data versus Wi-Fi.',
                  'Header Enrichment success rate.',
                  'MSISDN identification failure rate.',
                  'Drop-off before the billing page.',
                  'Drop-off before confirmation.',
                  'Revenue by operator, browser, and flow type.',
                  'Impact of OTP fallback on conversion.',
                ]}
              />
            </Section>

            <Section id="final-view" eyebrow="10. Final view" title="Final view">
              <p>
                DCB is not dead. HTTPS is not the enemy. Google is not necessarily the
                enemy. The old identity model needs to evolve.
              </p>
              <p>
                Operators have an opportunity to become trusted identity providers,
                not just connectivity providers. Secure, privacy-friendly,
                API-enabled identity can protect conversion while respecting the more
                encrypted web users now expect.
              </p>
              <p>
                If operators delay, the industry will not wait politely. Merchants and
                platforms will route around them through OTP, wallets, cards, or
                big-tech identity layers. Falling revenue should not be the first
                trigger for action.
              </p>
            </Section>
          </div>
        </div>

        <aside className="hidden lg:block">
          <div className="atlas-panel sticky top-6 px-5 py-5">
            <p className="atlas-eyebrow">In this insight</p>
            <nav className="mt-4 flex flex-col gap-3 text-sm text-[#35505f]">
              <a className="atlas-link" href="#what-is-changing">Chrome and HTTPS</a>
              <a className="atlas-link" href="#why-dcb-matters">Why DCB is exposed</a>
              <a className="atlas-link" href="#header-enrichment">Header Enrichment</a>
              <a className="atlas-link" href="#https-breaks-old-model">Why HTTPS changes it</a>
              <a className="atlas-link" href="#commercial-impact">Commercial impact</a>
              <a className="atlas-link" href="#solutions">Possible solutions</a>
              <a className="atlas-link" href="#operator-checklist">Operator checklist</a>
            </nav>
            <div className="mt-6 rounded-[22px] bg-white/70 p-4 text-sm leading-6 text-[#35505f]">
              <p className="font-semibold text-[#0d1b24]">Related Atlas pages</p>
              <div className="mt-3 flex flex-col gap-2">
                <Link className="atlas-link" to="/markets">DCB market directory</Link>
                <Link className="atlas-link" to="/methodology">Atlas methodology</Link>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </article>
  )
}
