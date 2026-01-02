import React, { useEffect, useState } from 'react'

/**
 * Componente ULTRA INCLUSIVO para detectar navegadores antigos
 * ✅ Suporta: IE11+, Chrome 60+, Firefox 55+, Safari 11+, Edge 15+
 * ✅ Progressive Enhancement: funciona em TODOS, melhor nos modernos
 * ✅ Graceful Degradation: degrada elegantemente em browsers antigos
 * 
 * OBJETIVO: Garantir que funcione em:
 * - Prefeituras com Windows 7 e IE11
 * - Escolas com Firefox ESR antigo
 * - Computadores doados com Chrome 60+
 * - Telas CRT 1024x768
 */
const BrowserCompatibility: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCompatible, setIsCompatible] = useState<boolean | null>(null)
  const [browserInfo, setBrowserInfo] = useState<string>('')
  const [shouldShowSimplified, setShouldShowSimplified] = useState(false)

  useEffect(() => {
    // Detectar navegador e versão
    const detectBrowser = () => {
      const ua = navigator.userAgent
      let browser = 'Desconhecido'
      let version = '0'

      // Internet Explorer 6-11
      if (ua.indexOf('MSIE') !== -1 || ua.indexOf('Trident/') !== -1) {
        browser = 'Internet Explorer'
        const match = ua.match(/(?:MSIE |rv:)(\d+(\.\d+)?)/)
        version = match ? match[1] : '11'
      }
      // Edge Legacy (EdgeHTML)
      else if (ua.indexOf('Edge/') !== -1) {
        browser = 'Edge Legacy'
        const match = ua.match(/Edge\/(\d+(\.\d+)?)/)
        version = match ? match[1] : '0'
      }
      // Edge Chromium
      else if (ua.indexOf('Edg/') !== -1) {
        browser = 'Edge'
        const match = ua.match(/Edg\/(\d+(\.\d+)?)/)
        version = match ? match[1] : '0'
      }
      // Chrome
      else if (ua.indexOf('Chrome/') !== -1 && ua.indexOf('Edg/') === -1) {
        browser = 'Chrome'
        const match = ua.match(/Chrome\/(\d+(\.\d+)?)/)
        version = match ? match[1] : '0'
      }
      // Firefox
      else if (ua.indexOf('Firefox/') !== -1) {
        browser = 'Firefox'
        const match = ua.match(/Firefox\/(\d+(\.\d+)?)/)
        version = match ? match[1] : '0'
      }
      // Safari
      else if (ua.indexOf('Safari/') !== -1 && ua.indexOf('Chrome') === -1) {
        browser = 'Safari'
        const match = ua.match(/Version\/(\d+(\.\d+)?)/)
        version = match ? match[1] : '0'
      }

      return { browser, version: parseFloat(version) }
    }

    const checkCompatibility = () => {
      const info = detectBrowser()
      setBrowserInfo(`${info.browser} ${info.version}`)

      // Verificar recursos BÁSICOS (não bloqueia browsers antigos)
      // Se não tiver esses recursos, mostra versão simplificada
      const supports = (property: string, value?: string) => {
        try {
          if (typeof CSS !== 'undefined' && CSS.supports) {
            return value ? CSS.supports(property, value) : CSS.supports(property)
          }
          // Fallback: assumir suporte
          return true
        } catch (e) {
          return true
        }
      }

      const features = {
        // Recursos ESSENCIAIS (se não tiver, mostra versão simplificada)
        flexbox: supports('display', 'flex'),
        // Recursos OPCIONAIS (se não tiver, site ainda funciona)
        cssVariables: supports('color', 'var(--test)'),
        grid: supports('display', 'grid'),
        transitions: supports('transition', 'opacity 0.3s'),
      }

      // Verificar JavaScript básico
      const hasBasicJS = (
        typeof Array !== 'undefined' &&
        typeof Object !== 'undefined' &&
        typeof Function !== 'undefined'
      )

      // Se não tiver Flexbox OU JavaScript básico, mostrar versão simplificada
      const needsSimplified = !features.flexbox || !hasBasicJS

      // Browsers MUITO antigos: IE < 11, Chrome < 60, Firefox < 55
      const isTooOld = (
        (info.browser === 'Internet Explorer' && info.version < 11) ||
        (info.browser === 'Chrome' && info.version < 60) ||
        (info.browser === 'Firefox' && info.version < 55) ||
        (info.browser === 'Safari' && info.version < 11) ||
        (info.browser === 'Edge Legacy' && info.version < 15)
      )

      // Se for browser MUITO antigo, mostrar aviso mas PERMITIR uso
      setShouldShowSimplified(isTooOld)
      
      // IMPORTANTE: Sempre permitir acesso, apenas avisar
      setIsCompatible(true)
    }

    checkCompatibility()
  }, [])

  // Mostrar loading enquanto verifica
  if (isCompatible === null) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#050814',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{ color: '#ffffff', textAlign: 'center' }}>
          Carregando...
        </div>
      </div>
    )
  }

  // Se for browser MUITO antigo, mostrar banner de aviso MAS permitir uso
  if (shouldShowSimplified) {
    return (
      <>
        {/* Banner de aviso não intrusivo */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: '#c92337',
          color: '#ffffff',
          padding: '0.75rem',
          textAlign: 'center',
          fontSize: '0.875rem',
          zIndex: 9999,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
        }}>
          <strong>⚠️ Navegador Desatualizado ({browserInfo})</strong> 
          {' '}- O site pode não funcionar perfeitamente. Recomendamos atualizar para 
          {' '}<a href="https://www.google.com/chrome/" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', textDecoration: 'underline' }}>Chrome</a>,
          {' '}<a href="https://www.mozilla.org/firefox/" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', textDecoration: 'underline' }}>Firefox</a> ou
          {' '}<a href="https://www.microsoft.com/edge" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', textDecoration: 'underline' }}>Edge</a>.
        </div>
        {/* Adicionar padding-top para compensar o banner */}
        <div style={{ paddingTop: '50px' }}>
          {children}
        </div>
      </>
    )
  }

  // Browser compatível: mostrar site normalmente
  return <>{children}</>
}

export default BrowserCompatibility

