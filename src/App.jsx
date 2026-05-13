import { Navigate, Route, Routes } from 'react-router-dom'
import { SiteLayout } from './components/layout/SiteLayout'
import { AboutPage } from './pages/About'
import { CountryDetailPage } from './pages/CountryDetail'
import { DcbComplianceBasicsPage } from './pages/DcbComplianceBasics'
import { HomePage } from './pages/Home'
import { ChromeHttpsHeaderEnrichmentArticle } from './pages/ChromeHttpsHeaderEnrichmentArticle'
import { GlossaryIndexPage } from './pages/GlossaryIndex'
import { GlossaryTermPage } from './pages/GlossaryTerm'
import { HowDcbWorksPage } from './pages/HowDcbWorks'
import { InsightsPage } from './pages/Insights'
import { MarketsPage } from './pages/Markets'
import { MethodologyPage } from './pages/Methodology'
import { PaymentsComparisonPage } from './pages/PaymentsComparison'
import { WhatIsDcbPage } from './pages/WhatIsDcb'

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="markets" element={<MarketsPage />} />
        <Route path="markets/:slug" element={<CountryDetailPage />} />
        <Route path="resources/what-is-direct-carrier-billing" element={<WhatIsDcbPage />} />
        <Route path="resources/dcb-compliance-basics" element={<DcbComplianceBasicsPage />} />
        <Route path="resources/how-direct-carrier-billing-works" element={<HowDcbWorksPage />} />
        <Route path="resources/dcb-vs-card-payments-vs-wallets" element={<PaymentsComparisonPage />} />
        <Route path="glossary" element={<GlossaryIndexPage />} />
        <Route path="glossary/:slug" element={<GlossaryTermPage />} />
        <Route path="insights" element={<InsightsPage />} />
        <Route
          path="insights/chrome-https-msisdn-header-enrichment-dcb-impact"
          element={<ChromeHttpsHeaderEnrichmentArticle />}
        />
        <Route path="methodology" element={<MethodologyPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
