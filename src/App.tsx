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
import ErrorBoundary from './components/ErrorBoundary'
import { detectGeoFromTimezone, detectLanguageFromBrowser } from './utils/geoDetection'

// Lazy loading de páginas para melhor performance
const Home = lazy(() => import('./pages/Home'))
const WhatWeDo = lazy(() => import('./pages/WhatWeDo'))
const Work = lazy(() => import('./pages/Work'))
const Studio = lazy(() => import('./pages/Studio'))
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
        const geo = detectGeoFromTimezone()
        
        if (geo.countryCode !== 'DEFAULT') {
          localStorage.setItem('azimut-lang', geo.language)
          return geo.language
        }
      } catch (e) {
      // Fallback: usar idioma do navegador se timezone falhar
      const browserLang = detectLanguageFromBrowser()
      localStorage.setItem('azimut-lang', browserLang)
      console.log(`🌐 Fallback: idioma do navegador (${browserLang.toUpperCase()})`)
      return browserLang
    }
    
    // Último fallback: INGLÊS (língua internacional, não PT)
    console.log('🌐 Último fallback: EN (internacional)')
    return 'en'
    } catch (e) {
      // Fallback se localStorage não estiver disponível
      return 'pt'
    }
  })

  // Detectar país via IP (funciona com VPN) - PRIORIDADE MÁXIMA
  // ⚠️ NUNCA TRAVA O SITE: 3 APIs de fallback + timezone backup
  useEffect(() => {
    let mounted = true
    
    const detectAndUpdateLanguage = async () => {
      try {
        console.log('🔍 Iniciando detecção de idioma...')
        
        // SEMPRE tentar detectar via IP primeiro (funciona com VPN)
        const { detectCountryFromIP, getLanguageFromCountry } = await import('./utils/geoDetection')
        const ipGeo = await detectCountryFromIP()
        
        // Verificar se componente ainda está montado
        if (!mounted) return
        
        if (ipGeo && ipGeo.countryCode) {
          // ✅ IP detectado com sucesso
          const detectedLang = getLanguageFromCountry(ipGeo.countryCode)
          const currentLang = localStorage.getItem('azimut-lang') as Lang | null
          
          console.log(`🌍 GEO: IP detectado - ${ipGeo.countryCode} → lang: ${detectedLang}`)
          console.log(`🌐 AZIMUT: Idioma detectado → ${detectedLang}`)
          
          // Atualizar se o idioma detectado for diferente
          if (currentLang !== detectedLang) {
            console.log(`🌐 AZIMUT: Atualizando idioma de ${currentLang || 'nenhum'} para ${detectedLang}`)
            setLang(detectedLang)
            localStorage.setItem('azimut-lang', detectedLang)
            console.log(`🌐 AZIMUT: Salvando preferência → ${detectedLang}`)
          } else {
            console.log(`✅ AZIMUT: Idioma já correto (${detectedLang})`)
          }
        } else {
          // ⚠️ TODAS as APIs de IP falharam - usar timezone como fallback
          console.log('⚠️ GEO: APIs de IP indisponíveis, usando timezone...')
          const timezoneGeo = detectGeoFromTimezone()
          const detectedLang = timezoneGeo.language
          const currentLang = localStorage.getItem('azimut-lang') as Lang | null
          
          console.log(`🌍 GEO: Timezone detectado - ${timezoneGeo.timeZone || 'unknown'} → lang: ${detectedLang}`)
          
          if (currentLang !== detectedLang) {
            console.log(`🌐 AZIMUT: Idioma detectado via timezone → ${detectedLang}`)
            setLang(detectedLang)
            localStorage.setItem('azimut-lang', detectedLang)
          }
        }
      } catch (error) {
        // ❌ ERRO CRÍTICO: usar navegador ou manter idioma atual
        console.error('❌ GEO: Erro crítico na detecção:', error)
        
        const currentLang = localStorage.getItem('azimut-lang') as Lang | null
        if (!currentLang) {
          // Se não tem idioma salvo, usar navegador
          const browserLang = detectLanguageFromBrowser()
          console.log(`🌐 AZIMUT: Fallback final → navegador (${browserLang})`)
          setLang(browserLang)
          localStorage.setItem('azimut-lang', browserLang)
        } else {
          console.log(`✅ AZIMUT: Mantendo idioma atual (${currentLang})`)
        }
      }
    }
    
    // Executar detecção (não bloqueia renderização)
    detectAndUpdateLanguage()
    
    // Cleanup
    return () => {
      mounted = false
    }
  }, []) // Executar apenas uma vez no mount

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
          <Suspense 
            fallback={<LoadingSkeleton />}
            // Error boundary para capturar erros no lazy loading
          >
            <ErrorBoundary>
              <Routes>
              {/* Rota de Login - SEM ProtectedRoute */}
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
            </ErrorBoundary>
          </Suspense>
        </AppLayout>
      </BrowserRouter>
    </BrowserCompatibility>
  )
}

export default App
