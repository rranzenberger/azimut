import React, { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { type Lang } from './i18n'
import { useTheme } from './hooks/useTheme'
import BrowserCompatibility from './components/BrowserCompatibility'
import Layout from './components/Layout'
import ScrollToTop from './components/ScrollToTop'
import LoadingSkeleton from './components/LoadingSkeleton'
import StructuredData from './components/StructuredData'
import InstallPrompt from './components/InstallPrompt'
import PlausibleScript from './components/PlausibleScript'

// Lazy loading de páginas para melhor performance
const Home = lazy(() => import('./pages/Home'))
const WhatWeDo = lazy(() => import('./pages/WhatWeDo'))
const Work = lazy(() => import('./pages/Work'))
const Studio = lazy(() => import('./pages/Studio'))
const Research = lazy(() => import('./pages/Research'))
const Academy = lazy(() => import('./pages/Academy'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

const App: React.FC = () => {
  // Carregar idioma do localStorage ou usar 'pt' como padrão
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const savedLang = localStorage.getItem('azimut-lang') as Lang | null
      return savedLang && ['pt', 'en', 'fr', 'es'].includes(savedLang) ? savedLang : 'pt'
    } catch (e) {
      // Fallback se localStorage não estiver disponível
      return 'pt'
    }
  })

  // Hook de tema (escuro/claro)
  const { theme, toggleTheme } = useTheme()

  // Salvar idioma no localStorage quando mudar
  useEffect(() => {
    try {
      localStorage.setItem('azimut-lang', lang)
    } catch (e) {
      // Ignorar erro se localStorage não estiver disponível
    }
  }, [lang])

  return (
    <BrowserCompatibility>
      <BrowserRouter>
        <ScrollToTop />
        {/* Structured Data para SEO */}
        <StructuredData type="organization" />
        <StructuredData type="website" />
        {/* Analytics - Plausible */}
        <PlausibleScript />
        {/* Vinheta cinematográfica - efeito de bordas escuras */}
        <div className="cinematic-vignette" aria-hidden="true" />
        
        {/* PWA Install Prompt */}
        <InstallPrompt />
        
        <Layout lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme}>
          <Suspense fallback={<LoadingSkeleton />}>
            <Routes>
              <Route path="/" element={<Home lang={lang} />} />
              <Route path="/home" element={<Home lang={lang} />} />
              <Route path="/what" element={<WhatWeDo lang={lang} />} />
              <Route path="/work" element={<Work lang={lang} />} />
              <Route path="/studio" element={<Studio lang={lang} />} />
              <Route path="/research" element={<Research lang={lang} />} />
              <Route path="/academy" element={<Academy lang={lang} />} />
              <Route path="/contact" element={<Contact lang={lang} />} />
              {/* Rota 404 - captura qualquer URL não encontrada */}
              <Route path="*" element={<NotFound lang={lang} />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </BrowserCompatibility>
  )
}

export default App
