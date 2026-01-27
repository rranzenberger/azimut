import React, { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom'
import { type Lang } from './i18n'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import BrowserCompatibility from './components/BrowserCompatibility'
import ScrollToTop from './components/ScrollToTop'
import LoadingSkeleton from './components/LoadingSkeleton'
import { OrganizationSchema, LocalBusinessSchema } from './components/StructuredData'
import InstallPrompt from './components/InstallPrompt'
import PlausibleScript from './components/PlausibleScript'
import AppLayout from './components/AppLayout'
import ErrorBoundary from './components/ErrorBoundary'
import Chatbot from './components/Chatbot'
import SimplePasswordGate from './components/SimplePasswordGate'
import LangRouteWrapper from './components/LangRouteWrapper'
import LangRedirect from './components/LangRedirect'
import GoogleAnalytics from './components/GoogleAnalytics'
import GlobalSearch from './components/GlobalSearch'
import { detectGeoFromTimezone, detectLanguageFromBrowser } from './utils/geoDetection'

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

// Home: Import direto (primeira rota, crítico para LCP)
import Home from './pages/Home'

// Páginas críticas: Import direto (menos erros, mais rápido)
import Studio from './pages/Studio'
import StudioTeam from './pages/StudioTeam'
import StudioCredentials from './pages/StudioCredentials'
import StudioDiferenciais from './pages/StudioDiferenciais'
import AcademyNew from './pages/AcademyNew'
import Contact from './pages/Contact'
import WhatWeDo from './pages/WhatWeDo'
import Work from './pages/Work'
import ServiceDetail from './pages/ServiceDetail'
import ProjectDetail from './pages/ProjectDetail'

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
  useEffect(() => {
    let mounted = true
    
    const detectAndUpdateLanguage = async () => {
      try {
        // Verificar se há idioma na URL atual
        const currentPath = window.location.pathname
        const urlLangMatch = currentPath.match(/^\/(pt|en|fr|es)(\/|$)/)
        const urlLang = urlLangMatch ? urlLangMatch[1] as Lang : null
        
        // Se tem idioma na URL, usar ele e salvar no localStorage
        if (urlLang) {
          const currentLang = localStorage.getItem('azimut-lang') as Lang | null
          
          if (currentLang !== urlLang) {
            setLang(urlLang)
            localStorage.setItem('azimut-lang', urlLang)
          }
          
          // NÃO fazer GEO detection se usuário já escolheu o idioma via URL
          return
        }
        
        // APENAS se NÃO tem idioma na URL: fazer GEO detection
        const { detectCountryFromIP, getLanguageFromCountry } = await import('./utils/geoDetection')
        const ipGeo = await detectCountryFromIP()
        
        // Verificar se componente ainda está montado
        if (!mounted) return
        
        if (ipGeo && ipGeo.countryCode) {
          // IP detectado com sucesso
          const detectedLang = getLanguageFromCountry(ipGeo.countryCode)
          const currentLang = localStorage.getItem('azimut-lang') as Lang | null
          
          // Atualizar se o idioma detectado for diferente
          if (currentLang !== detectedLang) {
            setLang(detectedLang)
            localStorage.setItem('azimut-lang', detectedLang)
          }
        } else {
          // TODAS as APIs de IP falharam - usar timezone como fallback
          const timezoneGeo = detectGeoFromTimezone()
          const detectedLang = timezoneGeo.language
          const currentLang = localStorage.getItem('azimut-lang') as Lang | null
          
          if (currentLang !== detectedLang) {
            setLang(detectedLang)
            localStorage.setItem('azimut-lang', detectedLang)
          }
        }
      } catch (error) {
        // ERRO CRÍTICO: usar navegador ou manter idioma atual
        console.error('GEO: Erro crítico na detecção:', error)
        
        const currentLang = localStorage.getItem('azimut-lang') as Lang | null
        if (!currentLang) {
          // Se não tem idioma salvo, usar navegador
          const browserLang = detectLanguageFromBrowser()
          setLang(browserLang)
          localStorage.setItem('azimut-lang', browserLang)
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
            <GoogleAnalytics />
            {/* Structured Data para SEO - Organization + LocalBusiness */}
            <OrganizationSchema lang={lang} />
            <LocalBusinessSchema />
            {/* Analytics - Plausible */}
            <PlausibleScript />
            {/* Vinheta cinematográfica - efeito de bordas escuras */}
            <div className="cinematic-vignette" aria-hidden="true" />
          
          {/* ✅ ETAPA 2: Global Search REATIVADO - Hooks simples, sem API */}
          <GlobalSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} lang={lang} theme={theme} />
          
          {/* ✅ ETAPA 1: PWA Install Prompt REATIVADO - Componente simples */}
          <InstallPrompt />
          
          <AppLayout key={theme} lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme}>
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
                <Route path="/:lang/studio/equipe" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <StudioTeam lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/studio/credibilidade" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <StudioCredentials lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/studio/diferenciais" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <StudioDiferenciais lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/academy" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <AcademyNew lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/academy/courses" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <AcademyCourses lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/academy/workshops" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <AcademyWorkshops lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/academy/corporate" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <AcademyCorporate lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/academy/vancouver" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <Vancouver lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/academy/research" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <Research lang={routeLang} />}
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
                <Route path="/:lang/privacy" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <Privacy lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/terms" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <Terms lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/thank-you" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <ThankYou lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/project/:slug" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <ProjectDetail lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                
                {/* Blog */}
                <Route path="/:lang/blog" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <Blog lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/blog/:slug" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <BlogPost lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                
                {/* Preview/Degustação - Marketing VR/NFT/Web3 */}
                <Route path="/:lang/experience-preview" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <ExperiencePreview lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                
                {/* Backwards compatibility: rotas SEM prefixo redirecionam */}
                <Route path="/what" element={<Navigate to={`/${lang}/what`} replace />} />
                <Route path="/work" element={<Navigate to={`/${lang}/work`} replace />} />
                <Route path="/blog" element={<Navigate to={`/${lang}/blog`} replace />} />
                <Route path="/experience-preview" element={<Navigate to={`/${lang}/experience-preview`} replace />} />
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
              </ErrorBoundary>
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
          <GoogleAnalytics />
          {/* Structured Data para SEO - Organization + LocalBusiness */}
          <OrganizationSchema lang={lang} />
          <LocalBusinessSchema />
          {/* Analytics - Plausible */}
          <PlausibleScript />
          {/* Vinheta cinematográfica - efeito de bordas escuras */}
          <div className="cinematic-vignette" aria-hidden="true" />
          
          <AppLayout key={theme} lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme}>
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
                <Route path="/:lang/studio/equipe" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <StudioTeam lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/studio/credibilidade" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <StudioCredentials lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/studio/diferenciais" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <StudioDiferenciais lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/academy" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <AcademyNew lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/academy/courses" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <AcademyCourses lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/academy/workshops" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <AcademyWorkshops lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/academy/corporate" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <AcademyCorporate lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/academy/vancouver" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <Vancouver lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/academy/research" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <Research lang={routeLang} />}
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
                <Route path="/:lang/privacy" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <Privacy lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/terms" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <Terms lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/thank-you" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <ThankYou lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/project/:slug" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <ProjectDetail lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                
                {/* Blog */}
                <Route path="/:lang/blog" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <Blog lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                <Route path="/:lang/blog/:slug" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <BlogPost lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                
                {/* Preview/Degustação - Marketing VR/NFT/Web3 */}
                <Route path="/:lang/experience-preview" element={
                  <LangRouteWrapper setLang={setLang}>
                    {(routeLang) => <ExperiencePreview lang={routeLang} />}
                  </LangRouteWrapper>
                } />
                
                {/* Backwards compatibility: rotas SEM prefixo redirecionam */}
                <Route path="/what" element={<Navigate to={`/${lang}/what`} replace />} />
                <Route path="/work" element={<Navigate to={`/${lang}/work`} replace />} />
                <Route path="/blog" element={<Navigate to={`/${lang}/blog`} replace />} />
                <Route path="/experience-preview" element={<Navigate to={`/${lang}/experience-preview`} replace />} />
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


