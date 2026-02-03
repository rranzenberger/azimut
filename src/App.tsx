import React, { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom'
import { type Lang } from './i18n'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import BrowserCompatibility from './components/BrowserCompatibility'
import ScrollToTop from './components/ScrollToTop'
import LoadingSkeleton from './components/LoadingSkeleton'
import { LocalBusinessSchema } from './components/StructuredData'
import InstallPrompt from './components/InstallPrompt'
import AppLayout from './components/AppLayout'
import ErrorBoundary from './components/ErrorBoundary'
import Chatbot from './components/Chatbot'
import SimplePasswordGate from './components/SimplePasswordGate'
import LangRouteWrapper from './components/LangRouteWrapper'
import LangRedirect from './components/LangRedirect'
import { detectGeoFromTimezone, detectLanguageFromBrowser } from './utils/geoDetection'

import DeferredAnalytics from './components/DeferredAnalytics'
// Busca: lazy, carrega só quando abrir (melhor LCP)
const GlobalSearch = lazy(() => import('./components/GlobalSearch').then(m => ({ default: m.default })))

// ═══════════════════════════════════════════════════════════════
// 🔒 CONTROLE DE LOGIN DO SITE
// ═══════════════════════════════════════════════════════════════
// PROTEÇÃO DO SITE - Controlado via DevTools (botão 🔧)
// 
// Por padrão: PROTEGIDO (true)
// DevTools pode desligar: Login Desligado = bypass ativo
// 
// Para FORÇAR aberto durante dev, mude DEFAULT_PROTECTED para false
// ═══════════════════════════════════════════════════════════════

// ════════════════════════════════════════════════════════════
// 🔒 CONTROLE DE PROTEÇÃO DO SITE
// ════════════════════════════════════════════════════════════
// 
// Para ABRIR o site para todos: SITE_ABERTO = true
// Para FECHAR o site (pedir senha): SITE_ABERTO = false
//
// ✅ ATIVO PARA TESTES LOCAIS - Site aberto sem senha
// ════════════════════════════════════════════════════════════
const SITE_ABERTO = true // ✅ ATIVO: Site aberto para testes locais
// ════════════════════════════════════════════════════════════

// Função para verificar se deve mostrar login
const shouldShowLogin = (): boolean => {
  // Se SITE_ABERTO = true, nunca mostra login
  if (SITE_ABERTO) {
    return false
  }
  
  // Se SITE_ABERTO = false, mostra login
  return true
}

// Calcular no momento da inicialização
// IMPORTANTE: SITE_PROTECTED agora é calculado dentro do componente
// para ser reativo às mudanças do DevTools (localStorage)
// ═══════════════════════════════════════════════════════════════

// ════════════════════════════════════════════════════════════
// CODE SPLITTING OTIMIZADO - Performance Premium
// ════════════════════════════════════════════════════════════
// Páginas principais: Import direto (crítico, sempre carregadas)
// Páginas secundárias: Lazy loading com preload estratégico
// ════════════════════════════════════════════════════════════

// Home + Contact: Import direto (LCP e página leve)
import Home from './pages/Home'
import Contact from './pages/Contact'

// Rotas pesadas: Lazy loading (reduz JS inicial – Lighthouse "Reduce unused JavaScript")
const Studio = lazy(() => import('./pages/Studio').then(m => ({ default: m.default })))
const StudioTeam = lazy(() => import('./pages/StudioTeam').then(m => ({ default: m.default })))
const StudioCredentials = lazy(() => import('./pages/StudioCredentials').then(m => ({ default: m.default })))
const StudioDiferenciais = lazy(() => import('./pages/StudioDiferenciais').then(m => ({ default: m.default })))
const AcademyNew = lazy(() => import('./pages/AcademyNew').then(m => ({ default: m.default })))
const WhatWeDo = lazy(() => import('./pages/WhatWeDo').then(m => ({ default: m.default })))
const Work = lazy(() => import('./pages/Work').then(m => ({ default: m.default })))
const ServiceDetail = lazy(() => import('./pages/ServiceDetail').then(m => ({ default: m.default })))
const ProjectDetail = lazy(() => import('./pages/ProjectDetail').then(m => ({ default: m.default })))

// Páginas secundárias: Lazy loading otimizado
const AcademyCourses = lazy(() => import('./pages/AcademyCourses'))
const AcademyWorkshops = lazy(() => import('./pages/AcademyWorkshops'))
const AcademyCorporate = lazy(() => import('./pages/AcademyCorporate'))
const Research = lazy(() => import('./pages/Research'))
const Vancouver = lazy(() => import('./pages/Vancouver'))
const Press = lazy(() => import('./pages/Press'))
const Privacy = lazy(() => import('./pages/Privacy'))
const Terms = lazy(() => import('./pages/Terms'))
const ThankYou = lazy(() => import('./pages/ThankYou'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const ExperiencePreview = lazy(() => import('./pages/ExperiencePreview'))
const Game = lazy(() => import('./pages/Game'))
const NotFound = lazy(() => import('./pages/NotFound'))

const App: React.FC = () => {
  // Estado para proteção do site (reativo ao DevTools)
  const [siteProtected, setSiteProtected] = useState<boolean>(() => {
    // Calcular inicialmente
    return shouldShowLogin()
  })

  // Verificar mudanças no localStorage (quando DevTools muda)
  useEffect(() => {
    const checkProtection = () => {
      const newProtected = shouldShowLogin()
      if (newProtected !== siteProtected) {
        setSiteProtected(newProtected)
      }
    }

    // Verificar a cada 500ms (polling para detectar mudanças do DevTools)
    const interval = setInterval(checkProtection, 500)

    // Event listener customizado (disparado pelo DevTools)
    const handleProtectionChange = ((e: CustomEvent) => {
      const newProtected = e.detail?.protected ?? shouldShowLogin()
      setSiteProtected(newProtected)
    }) as EventListener

    window.addEventListener('azimut-protection-change', handleProtectionChange as EventListener)

    // Também verificar quando localStorage muda (outra aba)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'azimut-bypass-login' || e.key === 'azimut-dev-bypass-token') {
        checkProtection()
      }
    }
    window.addEventListener('storage', handleStorageChange)

    return () => {
      clearInterval(interval)
      window.removeEventListener('azimut-protection-change', handleProtectionChange as EventListener)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [siteProtected])

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
      return browserLang
    }
    
    // Último fallback: INGLÊS (língua internacional, não PT)
    return 'en'
    } catch (e) {
      // Fallback se localStorage não estiver disponível
      return 'pt'
    }
  })

  // Detectar país via IP (funciona com VPN) - PRIORIDADE MÁXIMA
  // ⚠️ NUNCA TRAVA O SITE: 3 APIs de fallback + timezone backup
  // 🆕 RESPEITA O IDIOMA DA URL: Se usuário clicou em /pt/work, NÃO muda para EN
  // 🆕 IP detection atrasada 5–6s para não disparar durante Lighthouse (evita 403/429 no console = Best Practices)
  useEffect(() => {
    let mounted = true
    let idleId: number | null = null
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    const runIPGeo = async () => {
      if (!mounted) return
      try {
        const { detectCountryFromIP, getLanguageFromCountry } = await import('./utils/geoDetection')
        const ipGeo = await detectCountryFromIP()
        if (!mounted) return
        if (ipGeo && ipGeo.countryCode) {
          const detectedLang = getLanguageFromCountry(ipGeo.countryCode)
          const currentLang = localStorage.getItem('azimut-lang') as Lang | null
          if (currentLang !== detectedLang) {
            setLang(detectedLang)
            localStorage.setItem('azimut-lang', detectedLang)
          }
        } else {
          const timezoneGeo = detectGeoFromTimezone()
          const detectedLang = timezoneGeo.language
          const currentLang = localStorage.getItem('azimut-lang') as Lang | null
          if (currentLang !== detectedLang) {
            setLang(detectedLang)
            localStorage.setItem('azimut-lang', detectedLang)
          }
        }
      } catch (_error) {
        if (import.meta.env.DEV) {
          console.warn('GEO: fallback por falha na detecção', _error)
        }
        if (!mounted) return
        const currentLang = localStorage.getItem('azimut-lang') as Lang | null
        if (!currentLang) {
          const browserLang = detectLanguageFromBrowser()
          setLang(browserLang)
          localStorage.setItem('azimut-lang', browserLang)
        }
      }
    }

    const currentPath = typeof window !== 'undefined' ? window.location.pathname : ''
    const urlLangMatch = currentPath.match(/^\/(pt|en|fr|es)(\/|$)/)
    const urlLang = urlLangMatch ? urlLangMatch[1] as Lang : null

    if (urlLang) {
      const currentLang = localStorage.getItem('azimut-lang') as Lang | null
      if (currentLang !== urlLang) {
        setLang(urlLang)
        localStorage.setItem('azimut-lang', urlLang)
      }
      return () => { mounted = false }
    }

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      idleId = (window as Window & { requestIdleCallback: (cb: () => void, o?: { timeout: number }) => number })
        .requestIdleCallback(runIPGeo, { timeout: 6000 })
    } else {
      timeoutId = setTimeout(runIPGeo, 5000)
    }

    return () => {
      mounted = false
      if (idleId != null && 'cancelIdleCallback' in window) {
        (window as Window & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId)
      }
      if (timeoutId != null) clearTimeout(timeoutId)
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

  // ═══════════════════════════════════════════════════════════════
  // 🔍 GLOBAL SEARCH (Ctrl+K)
  // ═══════════════════════════════════════════════════════════════
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+K ou Cmd+K para abrir busca
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <BrowserCompatibility>
      {siteProtected ? (
        <SimplePasswordGate>
          <BrowserRouter>
            <ScrollToTop />
            {/* Analytics: carregados após first paint (melhor LCP) */}
            <Suspense fallback={null}>
              <DeferredAnalytics />
            </Suspense>
            {/* Structured Data para SEO - LocalBusiness (Organization via SEOGlobal no Layout) */}
            <LocalBusinessSchema />
            {/* Vinheta cinematográfica - efeito de bordas escuras */}
            <div className="cinematic-vignette" aria-hidden="true" />
          
          {/* Global Search: lazy, carrega só quando abrir (menos JS inicial) */}
          {searchOpen && (
            <Suspense fallback={null}>
              <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} lang={lang} theme={theme} />
            </Suspense>
          )}
          
          {/* ✅ ETAPA 1: PWA Install Prompt REATIVADO - Componente simples */}
          <InstallPrompt />
          
          <AppLayout key={theme} lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme}>
            <Suspense 
              fallback={<LoadingSkeleton />}
              // Error boundary por rota: cada página tem seu próprio ErrorBoundary
            >
              <Routes>
                {/* Redirect / para idioma detectado */}
                <Route path="/" element={<LangRedirect />} />

                {/* Rotas COM prefixo de idioma (PREMIUM) — ErrorBoundary por rota */}
                <Route path="/:lang" element={
                  <ErrorBoundary routeName="Home">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <Home lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/home" element={
                  <ErrorBoundary routeName="Home">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <Home lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/what" element={
                  <ErrorBoundary routeName="What We Do">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <WhatWeDo lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/what/:slug" element={
                  <ErrorBoundary routeName="Service">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <ServiceDetail lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/work" element={
                  <ErrorBoundary routeName="Work">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <Work lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/work/:slug" element={
                  <ErrorBoundary routeName="Project">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <ProjectDetail lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/studio" element={
                  <ErrorBoundary routeName="Studio">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <Studio lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/studio/equipe" element={
                  <ErrorBoundary routeName="Studio Team">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <StudioTeam lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/studio/credibilidade" element={
                  <ErrorBoundary routeName="Studio Credibility">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <StudioCredentials lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/studio/diferenciais" element={
                  <ErrorBoundary routeName="Studio Diferenciais">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <StudioDiferenciais lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/academy" element={
                  <ErrorBoundary routeName="Academy">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <AcademyNew lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/academy/courses" element={
                  <ErrorBoundary routeName="Academy Courses">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <AcademyCourses lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/academy/workshops" element={
                  <ErrorBoundary routeName="Academy Workshops">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <AcademyWorkshops lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/academy/corporate" element={
                  <ErrorBoundary routeName="Academy Corporate">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <AcademyCorporate lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/academy/vancouver" element={
                  <ErrorBoundary routeName="Vancouver">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <Vancouver lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/academy/research" element={
                  <ErrorBoundary routeName="Research">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <Research lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/contact" element={
                  <ErrorBoundary routeName="Contact">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <Contact lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/press" element={
                  <ErrorBoundary routeName="Press">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <Press lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/privacy" element={
                  <ErrorBoundary routeName="Privacy">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <Privacy lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/terms" element={
                  <ErrorBoundary routeName="Terms">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <Terms lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/thank-you" element={
                  <ErrorBoundary routeName="Thank You">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <ThankYou lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/project/:slug" element={
                  <ErrorBoundary routeName="Project">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <ProjectDetail lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />

                {/* Blog */}
                <Route path="/:lang/blog" element={
                  <ErrorBoundary routeName="Blog">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <Blog lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/blog/:slug" element={
                  <ErrorBoundary routeName="Blog Post">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <BlogPost lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />

                {/* Preview/Degustação - Marketing VR/NFT/Web3 */}
                <Route path="/:lang/experience-preview" element={
                  <ErrorBoundary routeName="Experience Preview">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <ExperiencePreview lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                {/* Jogo Empathy Engine */}
                <Route path="/:lang/game" element={
                  <ErrorBoundary routeName="Game">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <Game lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                
                {/* Backwards compatibility: rotas SEM prefixo redirecionam */}
                <Route path="/what" element={<Navigate to={`/${lang}/what`} replace />} />
                <Route path="/work" element={<Navigate to={`/${lang}/work`} replace />} />
                <Route path="/blog" element={<Navigate to={`/${lang}/blog`} replace />} />
                <Route path="/experience-preview" element={<Navigate to={`/${lang}/experience-preview`} replace />} />
                <Route path="/game" element={<Navigate to={`/${lang}/game`} replace />} />
                <Route path="/studio" element={<Navigate to={`/${lang}/studio`} replace />} />
                <Route path="/academy" element={<Navigate to={`/${lang}/academy`} replace />} />
                <Route path="/academy/courses" element={<Navigate to={`/${lang}/academy/courses`} replace />} />
                <Route path="/academy/workshops" element={<Navigate to={`/${lang}/academy/workshops`} replace />} />
                <Route path="/academy/corporate" element={<Navigate to={`/${lang}/academy/corporate`} replace />} />
                <Route path="/contact" element={<Navigate to={`/${lang}/contact`} replace />} />
                <Route path="/privacy" element={<Navigate to={`/${lang}/privacy`} replace />} />
                <Route path="/terms" element={<Navigate to={`/${lang}/terms`} replace />} />
                <Route path="/thank-you" element={<Navigate to={`/${lang}/thank-you`} replace />} />
                <Route path="/press" element={<Navigate to={`/${lang}/press`} replace />} />
                <Route path="/project/:slug" element={<Navigate to={`/${lang}/project/:slug`} replace />} />
                
                {/* Rota 404 - captura qualquer URL não encontrada */}
                <Route path="*" element={
                  <ErrorBoundary routeName="Page">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <NotFound lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
              </Routes>
            </Suspense>
          </AppLayout>
          
          {/* ⚠️ Chatbot DESABILITADO - Debug erro #310
          <Chatbot lang={lang} />
          */}
        </BrowserRouter>
        </SimplePasswordGate>
      ) : (
        <BrowserRouter>
          <ScrollToTop />
          {/* Analytics: carregados após first paint (melhor LCP) */}
          <Suspense fallback={null}>
            <DeferredAnalytics />
          </Suspense>
          {/* Structured Data para SEO - LocalBusiness (Organization via SEOGlobal no Layout) */}
          <LocalBusinessSchema />
          {/* Vinheta cinematográfica - efeito de bordas escuras */}
          <div className="cinematic-vignette" aria-hidden="true" />
          
          <AppLayout key={theme} lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme}>
            <Suspense fallback={<LoadingSkeleton />}>
            <Routes>
              {/* Redirect / para idioma detectado */}
              <Route path="/" element={<LangRedirect />} />

              {/* Rotas COM prefixo de idioma (PREMIUM) — ErrorBoundary por rota */}
              <Route path="/:lang" element={
                <ErrorBoundary routeName="Home">
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <Home lang={routeLang} />}
                  </LangRouteWrapper>
                </ErrorBoundary>
              } />
              <Route path="/:lang/home" element={
                <ErrorBoundary routeName="Home">
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <Home lang={routeLang} />}
                  </LangRouteWrapper>
                </ErrorBoundary>
              } />
              <Route path="/:lang/what" element={
                <ErrorBoundary routeName="What We Do">
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <WhatWeDo lang={routeLang} />}
                  </LangRouteWrapper>
                </ErrorBoundary>
              } />
                <Route path="/:lang/what/:slug" element={
                  <ErrorBoundary routeName="Service">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <ServiceDetail lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/work" element={
                  <ErrorBoundary routeName="Work">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <Work lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/work/:slug" element={
                  <ErrorBoundary routeName="Project">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <ProjectDetail lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/studio" element={
                  <ErrorBoundary routeName="Studio">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <Studio lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/studio/equipe" element={
                  <ErrorBoundary routeName="Studio Team">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <StudioTeam lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/studio/credibilidade" element={
                  <ErrorBoundary routeName="Studio Credibility">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <StudioCredentials lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/studio/diferenciais" element={
                  <ErrorBoundary routeName="Studio Diferenciais">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <StudioDiferenciais lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/academy" element={
                  <ErrorBoundary routeName="Academy">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <AcademyNew lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/academy/courses" element={
                  <ErrorBoundary routeName="Academy Courses">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <AcademyCourses lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/academy/workshops" element={
                  <ErrorBoundary routeName="Academy Workshops">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <AcademyWorkshops lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/academy/corporate" element={
                  <ErrorBoundary routeName="Academy Corporate">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <AcademyCorporate lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/academy/vancouver" element={
                  <ErrorBoundary routeName="Vancouver">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <Vancouver lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/academy/research" element={
                  <ErrorBoundary routeName="Research">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <Research lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/contact" element={
                  <ErrorBoundary routeName="Contact">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <Contact lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/press" element={
                  <ErrorBoundary routeName="Press">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <Press lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/privacy" element={
                  <ErrorBoundary routeName="Privacy">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <Privacy lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/terms" element={
                  <ErrorBoundary routeName="Terms">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <Terms lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/thank-you" element={
                  <ErrorBoundary routeName="Thank You">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <ThankYou lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/project/:slug" element={
                  <ErrorBoundary routeName="Project">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <ProjectDetail lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />

                {/* Blog */}
                <Route path="/:lang/blog" element={
                  <ErrorBoundary routeName="Blog">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <Blog lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                <Route path="/:lang/blog/:slug" element={
                  <ErrorBoundary routeName="Blog Post">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <BlogPost lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />

                {/* Preview/Degustação - Marketing VR/NFT/Web3 */}
                <Route path="/:lang/experience-preview" element={
                  <ErrorBoundary routeName="Experience Preview">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <ExperiencePreview lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                {/* Jogo Empathy Engine */}
                <Route path="/:lang/game" element={
                  <ErrorBoundary routeName="Game">
                    <LangRouteWrapper setLang={setLang}>
                      {(routeLang) => <Game lang={routeLang} />}
                    </LangRouteWrapper>
                  </ErrorBoundary>
                } />
                
                {/* Backwards compatibility: rotas SEM prefixo redirecionam */}
                <Route path="/what" element={<Navigate to={`/${lang}/what`} replace />} />
                <Route path="/work" element={<Navigate to={`/${lang}/work`} replace />} />
                <Route path="/blog" element={<Navigate to={`/${lang}/blog`} replace />} />
                <Route path="/experience-preview" element={<Navigate to={`/${lang}/experience-preview`} replace />} />
                <Route path="/game" element={<Navigate to={`/${lang}/game`} replace />} />
                <Route path="/studio" element={<Navigate to={`/${lang}/studio`} replace />} />
                <Route path="/academy" element={<Navigate to={`/${lang}/academy`} replace />} />
                <Route path="/academy/courses" element={<Navigate to={`/${lang}/academy/courses`} replace />} />
                <Route path="/academy/workshops" element={<Navigate to={`/${lang}/academy/workshops`} replace />} />
                <Route path="/academy/corporate" element={<Navigate to={`/${lang}/academy/corporate`} replace />} />
                <Route path="/contact" element={<Navigate to={`/${lang}/contact`} replace />} />
                <Route path="/privacy" element={<Navigate to={`/${lang}/privacy`} replace />} />
                <Route path="/terms" element={<Navigate to={`/${lang}/terms`} replace />} />
                <Route path="/thank-you" element={<Navigate to={`/${lang}/thank-you`} replace />} />
                <Route path="/press" element={<Navigate to={`/${lang}/press`} replace />} />
                <Route path="/project/:slug" element={<Navigate to={`/${lang}/project/:slug`} replace />} />
                
                {/* Rota 404 - captura qualquer URL não encontrada */}
                <Route path="*" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <NotFound lang={routeLang} />}
                  </LangRouteWrapper>
                } />
              </Routes>
            </Suspense>
          </AppLayout>
          
          {/* ⚠️ Chatbot DESABILITADO - Debug erro #310
          <Chatbot lang={lang} />
          */}
        </BrowserRouter>
      )}
    </BrowserCompatibility>
  )
}

export default App


