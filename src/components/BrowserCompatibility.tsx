import React, { useEffect, useState } from 'react'

/**
 * Componente ULTRA INCLUSIVO para detectar navegadores antigos
 * ✅ Browsers modernos: Experiência completa
 * ✅ Browsers intermediários: Banner de aviso + experiência completa
 * ✅ Browsers MUITO antigos: Versão simplificada HTML básico
 */
const BrowserCompatibility: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [browserMode, setBrowserMode] = useState<'loading' | 'modern' | 'old' | 'veryOld'>('loading')
  const [browserInfo, setBrowserInfo] = useState<string>('')

  useEffect(() => {
    // Detectar navegador e versão
    const detectBrowser = () => {
      const ua = navigator.userAgent
      let browser = 'Desconhecido'
      let version = 0

      // Internet Explorer 6-11
      if (ua.indexOf('MSIE') !== -1 || ua.indexOf('Trident/') !== -1) {
        browser = 'Internet Explorer'
        const match = ua.match(/(?:MSIE |rv:)(\d+(\.\d+)?)/)
        version = match ? parseFloat(match[1]) : 11
      }
      // Edge Legacy (EdgeHTML)
      else if (ua.indexOf('Edge/') !== -1) {
        browser = 'Edge Legacy'
        const match = ua.match(/Edge\/(\d+(\.\d+)?)/)
        version = match ? parseFloat(match[1]) : 0
      }
      // Edge Chromium
      else if (ua.indexOf('Edg/') !== -1) {
        browser = 'Edge'
        const match = ua.match(/Edg\/(\d+(\.\d+)?)/)
        version = match ? parseFloat(match[1]) : 0
      }
      // Chrome
      else if (ua.indexOf('Chrome/') !== -1 && ua.indexOf('Edg/') === -1) {
        browser = 'Chrome'
        const match = ua.match(/Chrome\/(\d+(\.\d+)?)/)
        version = match ? parseFloat(match[1]) : 0
      }
      // Firefox
      else if (ua.indexOf('Firefox/') !== -1) {
        browser = 'Firefox'
        const match = ua.match(/Firefox\/(\d+(\.\d+)?)/)
        version = match ? parseFloat(match[1]) : 0
      }
      // Safari
      else if (ua.indexOf('Safari/') !== -1 && ua.indexOf('Chrome') === -1) {
        browser = 'Safari'
        const match = ua.match(/Version\/(\d+(\.\d+)?)/)
        version = match ? parseFloat(match[1]) : 0
      }

      return { browser, version }
    }

    const checkCompatibility = () => {
      const info = detectBrowser()
      setBrowserInfo(`${info.browser} ${info.version}`)

      // Classificar browser
      let mode: 'modern' | 'old' | 'veryOld' = 'modern'

      // Se versão = 0 (não detectou), assumir navegador moderno
      if (info.version === 0) {
        mode = 'modern'
        setBrowserMode(mode)
        return
      }

      // MUITO ANTIGO: Mostra versão simplificada HTML puro
      if (
        (info.browser === 'Internet Explorer' && info.version < 10) ||
        (info.browser === 'Chrome' && info.version < 49) ||
        (info.browser === 'Firefox' && info.version < 48) ||
        (info.browser === 'Safari' && info.version < 10) ||
        (info.browser === 'Edge Legacy' && info.version < 12)
      ) {
        mode = 'veryOld'
      }
      // ANTIGO: Mostra banner mas permite site completo
      else if (
        (info.browser === 'Internet Explorer' && info.version >= 10) ||
        (info.browser === 'Chrome' && info.version >= 49 && info.version < 90) ||
        (info.browser === 'Firefox' && info.version >= 48 && info.version < 88) ||
        (info.browser === 'Safari' && info.version >= 10 && info.version < 14) ||
        (info.browser === 'Edge Legacy' && info.version >= 12)
      ) {
        mode = 'old'
      }

      setBrowserMode(mode)
    }

    checkCompatibility()
  }, [])

  // Loading
  if (browserMode === 'loading') {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#050814',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Arial, sans-serif'
      }}>
        <div style={{ color: '#ffffff', textAlign: 'center', fontSize: '18px' }}>
          Carregando...
        </div>
      </div>
    )
  }

  // MUITO ANTIGO: Versão simplificada com apenas HTML básico
  if (browserMode === 'veryOld') {
    return (
      <div style={{
        fontFamily: 'Arial, Helvetica, sans-serif',
        backgroundColor: '#050814',
        color: '#ffffff',
        padding: '20px',
        lineHeight: '1.6',
        minHeight: '100vh'
      }}>
        {/* Header simplificado */}
        <div style={{
          borderBottom: '3px solid #c92337',
          paddingBottom: '20px',
          marginBottom: '30px'
        }}>
          <h1 style={{
            color: '#c92337',
            fontSize: '32px',
            margin: '0 0 10px 0',
            fontWeight: 'bold'
          }}>
            AZIMUT
          </h1>
          <p style={{
            margin: 0,
            fontSize: '14px',
            color: '#8a8a8a',
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>
            Immersive • Interactive • Cinematic Experiences
          </p>
        </div>

        {/* Banner de navegador antigo */}
        <div style={{
          backgroundColor: '#c92337',
          color: '#ffffff',
          padding: '15px',
          marginBottom: '30px',
          border: '2px solid #ffffff',
          textAlign: 'center'
        }}>
          <strong>⚠️ Versão Simplificada</strong>
          <br />
          Seu navegador ({browserInfo}) é muito antigo.
          <br />
          Esta é uma versão básica do site com apenas informações essenciais.
        </div>

        {/* Conteúdo básico */}
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          
          {/* Sobre */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              color: '#c92337', 
              fontSize: '24px',
              borderBottom: '2px solid #c92337',
              paddingBottom: '10px',
              marginBottom: '20px'
            }}>
              Sobre a Azimut
            </h2>
            <p style={{ fontSize: '16px', marginBottom: '15px' }}>
              A Azimut é um estúdio especializado em experiências imersivas, interativas e cinematográficas 
              para cultura, marcas e espaços híbridos.
            </p>
            <p style={{ fontSize: '16px', marginBottom: '15px' }}>
              Atuamos entre Brasil (Rio de Janeiro e Florianópolis) e Canadá (Vancouver), 
              desenvolvendo projetos que conectam mundos através da tecnologia e narrativa.
            </p>
          </div>

          {/* Serviços */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ 
              color: '#c92337', 
              fontSize: '24px',
              borderBottom: '2px solid #c92337',
              paddingBottom: '10px',
              marginBottom: '20px'
            }}>
              O Que Fazemos
            </h2>
            <ul style={{ fontSize: '16px', lineHeight: '2' }}>
              <li><strong>Cinema & Audiovisual:</strong> Narrativas cinematográficas imersivas</li>
              <li><strong>Animação 2D/3D:</strong> Personagens e mundos visuais únicos</li>
              <li><strong>XR / Interatividade:</strong> Realidade Virtual, Aumentada e Mista</li>
              <li><strong>IA Criativa:</strong> Pipelines de produção com inteligência artificial</li>
              <li><strong>Educação & Formação:</strong> Workshops e programas de capacitação</li>
            </ul>
          </div>

          {/* Contato */}
          <div style={{
            backgroundColor: 'rgba(201, 35, 55, 0.2)',
            border: '2px solid #c92337',
            padding: '20px',
            marginBottom: '40px'
          }}>
            <h2 style={{ 
              color: '#c92337', 
              fontSize: '24px',
              marginTop: 0,
              marginBottom: '15px'
            }}>
              Contato
            </h2>
            <p style={{ margin: '10px 0', fontSize: '16px' }}>
              <strong>Email:</strong> contato@azimutimmersive.com
            </p>
            <p style={{ margin: '10px 0', fontSize: '16px' }}>
              <strong>Brasil:</strong> Rio de Janeiro • Florianópolis
            </p>
            <p style={{ margin: '10px 0', fontSize: '16px' }}>
              <strong>Canadá:</strong> Vancouver
            </p>
          </div>

          {/* Recomendação de atualização */}
          <div style={{
            backgroundColor: '#1a1a2e',
            padding: '20px',
            border: '1px solid #c92337',
            marginBottom: '40px'
          }}>
            <h3 style={{ 
              color: '#c92337', 
              fontSize: '18px',
              marginTop: 0,
              marginBottom: '15px'
            }}>
              📢 Para uma experiência completa
            </h3>
            <p style={{ margin: '10px 0', fontSize: '14px', color: '#cccccc' }}>
              Recomendamos atualizar seu navegador para acessar:
            </p>
            <ul style={{ fontSize: '14px', color: '#cccccc', lineHeight: '1.8' }}>
              <li>Portfólio completo de projetos</li>
              <li>Vídeos e conteúdo multimídia</li>
              <li>Navegação interativa</li>
              <li>Animações e efeitos visuais</li>
            </ul>
            <div style={{ marginTop: '15px' }}>
              <a 
                href="https://www.google.com/chrome/" 
                style={{
                  display: 'inline-block',
                  backgroundColor: '#c92337',
                  color: '#ffffff',
                  padding: '10px 20px',
                  textDecoration: 'none',
                  marginRight: '10px',
                  marginBottom: '10px',
                  fontWeight: 'bold'
                }}
              >
                Baixar Chrome
              </a>
              <a 
                href="https://www.mozilla.org/firefox/" 
                style={{
                  display: 'inline-block',
                  backgroundColor: '#c92337',
                  color: '#ffffff',
                  padding: '10px 20px',
                  textDecoration: 'none',
                  marginRight: '10px',
                  marginBottom: '10px',
                  fontWeight: 'bold'
                }}
              >
                Baixar Firefox
              </a>
              <a 
                href="https://www.microsoft.com/edge" 
                style={{
                  display: 'inline-block',
                  backgroundColor: '#c92337',
                  color: '#ffffff',
                  padding: '10px 20px',
                  textDecoration: 'none',
                  marginBottom: '10px',
                  fontWeight: 'bold'
                }}
              >
                Baixar Edge
              </a>
            </div>
          </div>

          {/* Footer */}
          <div style={{
            borderTop: '2px solid #c92337',
            paddingTop: '20px',
            marginTop: '40px',
            textAlign: 'center',
            color: '#8a8a8a',
            fontSize: '14px'
          }}>
            <p style={{ margin: '5px 0' }}>
              © {new Date().getFullYear()} Azimut. Todos os direitos reservados.
            </p>
            <p style={{ margin: '5px 0' }}>
              Versão simplificada para navegadores antigos
            </p>
          </div>
        </div>
      </div>
    )
  }

  // ANTIGO: Banner de aviso mas site completo
  if (browserMode === 'old') {
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
          {' '}- Algumas funcionalidades podem não funcionar. Recomendamos 
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

  // MODERNO: Site completo sem avisos
  return <>{children}</>
}

export default BrowserCompatibility

