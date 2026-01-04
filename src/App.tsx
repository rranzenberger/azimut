import React, { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom'
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
import Chatbot from './components/Chatbot'
import SimplePasswordGate from './components/SimplePasswordGate'
import LangRouteWrapper from './components/LangRouteWrapper'
import LangRedirect from './components/LangRedirect'
import { detectGeoFromTimezone, detectLanguageFromBrowser } from './utils/geoDetection'

// ═══════════════════════════════════════════════════════════════
// 🔒 CONTROLE DE LOGIN DO SITE
// ═══════════════════════════════════════════════════════════════
// Mude para "false" para DESABILITAR o login temporariamente
// Mude para "true" para ATIVAR o login novamente
const SITE_PROTECTED = true // ← SITE TRAVADO! (Login ativo)
// ═══════════════════════════════════════════════════════════════

// CORREÇÃO: Import direto das páginas problemáticas
// Lazy loading estava causando erro "Failed to fetch dynamically imported module"
import Studio from './pages/Studio'
import Academy from './pages/Academy'
import Contact from './pages/Contact'
import WhatWeDo from './pages/WhatWeDo'
import ServiceDetail from './pages/ServiceDetail'
import Press from './pages/Press'

// Lazy loading apenas para páginas que funcionam bem
const Home = lazy(() => import('./pages/Home'))
const Work = lazy(() => import('./pages/Work'))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail'))
const NotFound = lazy(() => import('./pages/NotFound'))

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
      {SITE_PROTECTED ? (
        <SimplePasswordGate>
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
                {/* Redirect / para idioma detectado */}
                <Route path="/" element={<LangRedirect />} />
                
                {/* Rotas COM prefixo de idioma (PREMIUM) */}
                <Route path="/:lang" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <Home lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/home" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <Home lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/what" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <WhatWeDo lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/what/:slug" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <ServiceDetail lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/work" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <Work lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/work/:slug" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <ProjectDetail lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/studio" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <Studio lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/academy" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <Academy lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/academy/research" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <Academy lang={routeLang} section="research" />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/academy/courses" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <Academy lang={routeLang} section="courses" />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/academy/corporate" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <Academy lang={routeLang} section="corporate" />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/contact" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <Contact lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/press" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <Press lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/project/:slug" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <ProjectDetail lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                
                {/* Backwards compatibility: rotas SEM prefixo redirecionam */}
                <Route path="/what" element={<Navigate to={`/${lang}/what`} replace />} />
                <Route path="/work" element={<Navigate to={`/${lang}/work`} replace />} />
                <Route path="/studio" element={<Navigate to={`/${lang}/studio`} replace />} />
                <Route path="/academy" element={<Navigate to={`/${lang}/academy`} replace />} />
                <Route path="/academy/research" element={<Navigate to={`/${lang}/academy/research`} replace />} />
                <Route path="/academy/courses" element={<Navigate to={`/${lang}/academy/courses`} replace />} />
                <Route path="/academy/corporate" element={<Navigate to={`/${lang}/academy/corporate`} replace />} />
                <Route path="/contact" element={<Navigate to={`/${lang}/contact`} replace />} />
                <Route path="/press" element={<Navigate to={`/${lang}/press`} replace />} />
                <Route path="/project/:slug" element={<Navigate to={`/${lang}/project/:slug`} replace />} />
                
                {/* Rota 404 - captura qualquer URL não encontrada */}
                <Route path="*" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <NotFound lang={routeLang} />}
                  </LangRouteWrapper>
                } />
              </Routes>
              </ErrorBoundary>
            </Suspense>
          </AppLayout>
          
          {/* Chatbot - Assistente Virtual com DeepSeek */}
          <Chatbot lang={lang} />
        </BrowserRouter>
        </SimplePasswordGate>
      ) : (
        <BrowserRouter>
          <ScrollToTop />
          {/* Structured Data para SEO */}
          <StructuredData type="organization" />
          <StructuredData type="website" />
          {/* Analytics - Plausible */}
          <PlausibleScript />
          {/* Vinheta cinematográfica - efeito de bordas escuras */}
          <div className="cinematic-vignette" aria-hidden="true" />
          
          <AppLayout lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme}>
            <Suspense fallback={<LoadingSkeleton />}>
              <ErrorBoundary>
              <Routes>
                {/* Redirect / para idioma detectado */}
                <Route path="/" element={<LangRedirect />} />
                
                {/* Rotas COM prefixo de idioma (PREMIUM) */}
                <Route path="/:lang" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <Home lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/what" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <WhatWeDo lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/work" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <Work lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/studio" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <Studio lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/academy" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <Academy lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/contact" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <Contact lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/press" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <Press lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/project/:slug" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <ProjectDetail lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                
                {/* Backwards compatibility: rotas SEM prefixo redirecionam */}
                <Route path="/what" element={<Navigate to={`/${lang}/what`} replace />} />
                <Route path="/work" element={<Navigate to={`/${lang}/work`} replace />} />
                <Route path="/studio" element={<Navigate to={`/${lang}/studio`} replace />} />
                <Route path="/academy" element={<Navigate to={`/${lang}/academy`} replace />} />
                <Route path="/academy/research" element={<Navigate to={`/${lang}/academy/research`} replace />} />
                <Route path="/academy/courses" element={<Navigate to={`/${lang}/academy/courses`} replace />} />
                <Route path="/academy/corporate" element={<Navigate to={`/${lang}/academy/corporate`} replace />} />
                <Route path="/contact" element={<Navigate to={`/${lang}/contact`} replace />} />
                <Route path="/press" element={<Navigate to={`/${lang}/press`} replace />} />
                <Route path="/project/:slug" element={<Navigate to={`/${lang}/project/:slug`} replace />} />
                
                {/* Rota 404 - captura qualquer URL não encontrada */}
                <Route path="*" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <NotFound lang={routeLang} />}
                  </LangRouteWrapper>
                } />
              </Routes>
              </ErrorBoundary>
            </Suspense>
          </AppLayout>
          
          {/* Chatbot - Assistente Virtual com DeepSeek */}
          <Chatbot lang={lang} />
        </BrowserRouter>
      )}
    </BrowserCompatibility>
  )
}

export default App


