import { Navigate, Route, Routes } from 'react-router-dom'
import { SiteLayout } from './components/layout/SiteLayout'
import { AboutPage } from './pages/About'
import { CountryDetailPage } from './pages/CountryDetail'
import { HomePage } from './pages/Home'
import { ChromeHttpsHeaderEnrichmentArticle } from './pages/ChromeHttpsHeaderEnrichmentArticle'
import { InsightsPage } from './pages/Insights'
import { MarketsPage } from './pages/Markets'
import { MethodologyPage } from './pages/Methodology'

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<HomePage />} />
        <Route path="markets" element={<MarketsPage />} />
        <Route path="markets/:slug" element={<CountryDetailPage />} />
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
