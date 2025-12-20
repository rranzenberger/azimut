import React, { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { type Lang } from './i18n'
import { useTheme } from './hooks/useTheme'
import BrowserCompatibility from './components/BrowserCompatibility'
import ScrollToTop from './components/ScrollToTop'
import LoadingSkeleton from './components/LoadingSkeleton'
import StructuredData from './components/StructuredData'
import InstallPrompt from './components/InstallPrompt'
import PlausibleScript from './components/PlausibleScript'
import AppLayout from './components/AppLayout'

// Lazy loading de páginas para melhor performance
const Home = lazy(() => import('./pages/Home'))
const WhatWeDo = lazy(() => import('./pages/WhatWeDo'))
const Work = lazy(() => import('./pages/Work'))
const Studio = lazy(() => import('./pages/Studio'))
const Research = lazy(() => import('./pages/Research'))
const Academy = lazy(() => import('./pages/Academy'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))
const Login = lazy(() => import('./pages/Login'))
import ProtectedRoute from './components/ProtectedRoute'

const App: React.FC = () => {
  // Carregar idioma do localStorage ou detectar automaticamente
  const [lang, setLang] = useState<Lang>(() => {
    try {
      const savedLang = localStorage.getItem('azimut-lang') as Lang | null
      if (savedLang && ['pt', 'en', 'fr', 'es'].includes(savedLang)) {
        return savedLang
      }
      
      // Se não tem idioma salvo, detectar via timezone
      try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
        
        // Detectar país via timezone
        if (timezone.includes('America/New_York') || timezone.includes('America/Chicago') || 
            timezone.includes('America/Denver') || timezone.includes('America/Los_Angeles') ||
            timezone.includes('America/Detroit') || timezone.includes('America/Indianapolis') ||
            timezone.includes('America/Phoenix') || timezone.includes('America/Seattle')) {
          // US -> EN
          localStorage.setItem('azimut-lang', 'en')
          return 'en'
        } else if (timezone.includes('America/Toronto') || timezone.includes('America/Vancouver') ||
                   timezone.includes('America/Montreal') || timezone.includes('America/Winnipeg')) {
          // CA -> EN
          localStorage.setItem('azimut-lang', 'en')
          return 'en'
        } else if (timezone.includes('America/Sao_Paulo') || timezone.includes('America/Rio') ||
                   timezone.includes('America/Fortaleza') || timezone.includes('America/Recife') ||
                   timezone.includes('America/Manaus') || timezone.includes('America/Belem')) {
          // BR -> PT
          localStorage.setItem('azimut-lang', 'pt')
          return 'pt'
        }
      } catch (e) {
        // Fallback: usar idioma do navegador
        const browserLang = navigator.language.startsWith('pt') ? 'pt' :
                           navigator.language.startsWith('fr') ? 'fr' :
                           navigator.language.startsWith('es') ? 'es' : 'en'
        localStorage.setItem('azimut-lang', browserLang)
        return browserLang
      }
      
      return 'pt' // Padrão
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
        
        <AppLayout lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme}>
          <Suspense fallback={<LoadingSkeleton />}>
            <Routes>
              {/* Rota de Login */}
              <Route path="/login" element={<Login />} />
              
              {/* Rotas protegidas */}
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <Home lang={lang} />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/home" 
                element={
                  <ProtectedRoute>
                    <Home lang={lang} />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/what" 
                element={
                  <ProtectedRoute>
                    <WhatWeDo lang={lang} />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/work" 
                element={
                  <ProtectedRoute>
                    <Work lang={lang} />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/studio" 
                element={
                  <ProtectedRoute>
                    <Studio lang={lang} />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/research" 
                element={
                  <ProtectedRoute>
                    <Research lang={lang} />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/academy" 
                element={
                  <ProtectedRoute>
                    <Academy lang={lang} />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/contact" 
                element={
                  <ProtectedRoute>
                    <Contact lang={lang} />
                  </ProtectedRoute>
                } 
              />
              {/* Rota 404 - captura qualquer URL não encontrada */}
              <Route path="*" element={<NotFound lang={lang} />} />
            </Routes>
          </Suspense>
        </AppLayout>
      </BrowserRouter>
    </BrowserCompatibility>
  )
}

export default App
