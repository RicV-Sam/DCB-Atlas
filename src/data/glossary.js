export const glossaryTerms = [
  {
    slug: 'direct-carrier-billing',
    name: 'Direct Carrier Billing',
    shortName: 'DCB',
    description:
      'A payment method that lets users charge eligible digital goods or services to prepaid airtime or a postpaid mobile bill.',
    related: ['MSISDN', 'Aggregator', 'OTP', 'Header Enrichment'],
    whyItMatters:
      'DCB matters because it gives merchants a way to reach users who may not have cards, prefer not to use cards, or want a faster mobile-first payment journey.',
    used:
      'In a typical DCB flow, a user chooses a digital product, confirms the charge, and the amount is collected through the operator billing relationship. Operators, aggregators, and merchants then settle the agreed revenue share.',
    misunderstandings: [
      'DCB is not just SMS billing. Modern DCB can support web, app, subscription, and API-led journeys.',
      'DCB is not automatically frictionless. Conversion depends on identity, consent, pricing clarity, and the number of confirmation steps.',
      'DCB is not a compliance shortcut. Markets often require clear pricing, consent, receipts, unsubscribe routes, refund handling, and audit trails.',
    ],
  },
  {
    slug: 'msisdn',
    name: 'MSISDN',
    shortName: 'MSISDN',
    description:
      'The mobile number associated with a subscriber, commonly used as a commercial identifier in telecom services.',
    related: ['Header Enrichment', 'OTP', 'Direct Carrier Billing'],
    whyItMatters:
      'MSISDN matters in DCB because billing, consent, receipts, customer care, and subscription management often need to connect an action to a mobile subscriber.',
    used:
      'An MSISDN may be typed by the user, verified through OTP, provided through an operator identity process, or represented by a privacy-preserving alias rather than exposed directly.',
    misunderstandings: [
      'MSISDN is not the same as IMSI or IMEI. It is the user-facing mobile number, not the SIM identity or device identity.',
      'Raw MSISDN exposure is not always appropriate. Privacy, consent, minimisation, and local telecom rules can restrict how it is shared.',
      'Knowing an MSISDN does not prove consent to bill. Consent must still be captured and evidenced in the purchase flow.',
    ],
  },
  {
    slug: 'header-enrichment',
    name: 'Header Enrichment',
    shortName: 'Header Enrichment',
    description:
      'A legacy mobile-network identification method where operator-side systems add or expose subscriber identifiers in web traffic.',
    related: ['MSISDN', 'Direct Carrier Billing', 'CAMARA', 'OTP'],
    whyItMatters:
      'Header Enrichment has mattered because it helped DCB flows identify users on mobile data without forcing them to type a number or complete an OTP challenge.',
    used:
      'Historically, a mobile user browsing over operator data could reach a DCB flow where the operator network identified the subscriber and passed an identifier to the billing journey.',
    misunderstandings: [
      'Header Enrichment is not the only way to identify a user, and it is not always available across browsers, networks, or traffic types.',
      'HTTPS does not attack DCB. It protects the browser session, which means old HTTP-based enrichment assumptions need to evolve.',
      'Silent identification still needs governance. Low friction does not remove the need for clear consent and user protection.',
    ],
  },
  {
    slug: 'otp',
    name: 'OTP',
    shortName: 'OTP',
    description:
      'A one-time password or PIN sent to the user, usually by SMS, to verify control of a mobile number before a payment or subscription continues.',
    related: ['MSISDN', 'Direct Carrier Billing', 'Header Enrichment'],
    whyItMatters:
      'OTP matters because it can provide a familiar verification step when silent identification is unavailable, risky, or not permitted by local rules.',
    used:
      'A user enters a mobile number, receives a short code, enters that code on the payment page, and then confirms or completes the transaction according to the market rules.',
    misunderstandings: [
      'OTP is not the same as consent. It verifies access to a number, but the offer, price, renewal terms, and confirmation still need to be clear.',
      'OTP is not always better commercially. It can reduce fraud risk but usually adds friction and drop-off.',
      'OTP delivery is not guaranteed. SMS delays, roaming, spam filters, and user confusion can all damage conversion.',
    ],
  },
  {
    slug: 'camara',
    name: 'CAMARA',
    shortName: 'CAMARA',
    description:
      'An open-source network API initiative aligned with the broader GSMA Open Gateway direction for exposing operator capabilities through standardised APIs.',
    related: ['Header Enrichment', 'MSISDN', 'Direct Carrier Billing'],
    whyItMatters:
      'CAMARA matters because DCB and VAS ecosystems need cleaner ways to access operator capabilities, including identity-related signals, without relying on fragile legacy web flows.',
    used:
      'The direction is API-led: developers and platforms call standardised network APIs, with operator implementation and commercial access handled through the relevant ecosystem and agreements.',
    misunderstandings: [
      'CAMARA is not a magic switch that instantly makes every operator capability available in every market.',
      'Standardised APIs still need product ownership, deployment, security, consent, contracts, and operational support.',
      'CAMARA should not be described as only a DCB project. It is broader network API infrastructure that may support DCB-adjacent identity and fraud use cases.',
    ],
  },
  {
    slug: 'aggregator',
    name: 'Aggregator',
    shortName: 'Aggregator',
    description:
      'A company that connects merchants or content providers to mobile operators, often handling DCB integration, routing, reporting, compliance support, and settlement.',
    related: ['Direct Carrier Billing', 'MSISDN', 'OTP', 'Header Enrichment'],
    whyItMatters:
      'Aggregators matter because most merchants do not want to integrate separately with every mobile operator in every country. Aggregators make market access more practical.',
    used:
      'An aggregator may provide APIs, hosted payment pages, compliance templates, operator connectivity, reconciliation, campaign controls, fraud monitoring, and commercial reporting.',
    misunderstandings: [
      'An aggregator is not the same as an operator. The operator owns the billing relationship with the subscriber.',
      'An aggregator is not always the merchant. The merchant or content provider owns the service being sold.',
      'Aggregator access does not guarantee launch success. Conversion, compliance, traffic quality, pricing, and operator rules still determine performance.',
    ],
  },
]

export const getGlossaryTerm = (slug) =>
  glossaryTerms.find((term) => term.slug === slug)
