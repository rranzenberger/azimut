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
        // Fallback: usar idioma do navegador
        const browserLang = detectLanguageFromBrowser()
        localStorage.setItem('azimut-lang', browserLang)
        return browserLang
      }
      
      return 'en' // Padrão: Inglês (língua internacional)
    } catch (e) {
      // Fallback se localStorage não estiver disponível
      return 'pt'
    }
  })

  // Detectar país via IP (funciona com VPN) e ajustar idioma se necessário
  // IMPORTANTE: Executar apenas uma vez no mount, não a cada navegação
  // CORREÇÃO: Só atualizar se realmente necessário (VPN ativa ou país diferente)
  useEffect(() => {
    let mounted = true
    
    const detectAndUpdateLanguage = async () => {
      try {
        // Verificar se já tem idioma salvo E se timezone já detectou corretamente
        const savedLang = localStorage.getItem('azimut-lang') as Lang | null
        const timezoneGeo = detectGeoFromTimezone()
        
        // Se timezone já detectou corretamente e tem idioma salvo, não sobrescrever
        if (savedLang && timezoneGeo.countryCode !== 'DEFAULT') {
          const timezoneLang = timezoneGeo.language
          // Se idioma salvo corresponde ao timezone, não fazer nada (usuário está no país correto)
          if (savedLang === timezoneLang) {
            console.log(`✅ Idioma já correto (${savedLang.toUpperCase()}) baseado em timezone`)
            return
          }
        }
        
        // Só detectar via IP se necessário (VPN ou país diferente)
        const { detectCountryFromIP, getLanguageFromCountry } = await import('./utils/geoDetection')
        const ipGeo = await detectCountryFromIP()
        
        // Verificar se componente ainda está montado antes de atualizar
        if (!mounted) return
        
        if (ipGeo && ipGeo.countryCode !== 'DEFAULT') {
          const detectedLang = getLanguageFromCountry(ipGeo.countryCode)
          const currentLang = localStorage.getItem('azimut-lang') as Lang | null
          
          // Só atualizar se:
          // 1. País detectado via IP é diferente do timezone (VPN ativa)
          // 2. E idioma detectado é diferente do atual
          if (ipGeo.countryCode !== timezoneGeo.countryCode && currentLang !== detectedLang) {
            console.log(`🌍 País detectado via IP: ${ipGeo.country} (${ipGeo.countryCode})`)
            console.log(`🌍 País detectado via timezone: ${timezoneGeo.country} (${timezoneGeo.countryCode})`)
            console.log(`🌐 Idioma detectado: ${detectedLang.toUpperCase()}, atual: ${currentLang?.toUpperCase() || 'nenhum'}`)
            
            // Atualizar idioma apenas se realmente necessário (VPN detectada)
            setLang(detectedLang)
            localStorage.setItem('azimut-lang', detectedLang)
            console.log(`✅ Idioma atualizado para ${detectedLang.toUpperCase()} (VPN detectada)`)
          } else {
            console.log(`ℹ️ Idioma mantido (${currentLang?.toUpperCase() || 'nenhum'}) - sem VPN ou já correto`)
          }
        }
      } catch (error) {
        // Silencioso - não é crítico
        console.warn('Detecção via IP falhou (não crítico):', error)
      }
    }
    
    // Executar detecção via IP após renderização inicial (apenas uma vez)
    detectAndUpdateLanguage()
    
    // Cleanup: marcar como desmontado
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
          <Suspense fallback={<LoadingSkeleton />}>
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
          </Suspense>
        </AppLayout>
      </BrowserRouter>
    </BrowserCompatibility>
  )
}

export default App
