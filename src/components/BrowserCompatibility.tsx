import React, { useEffect, useState } from 'react'

/**
 * Componente para detectar navegadores antigos e mostrar fallback
 * Suporta: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
 * Fallback para navegadores mais antigos
 */
const BrowserCompatibility: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isCompatible, setIsCompatible] = useState<boolean | null>(null)

  useEffect(() => {
    // Verificar recursos modernos necessários
    const checkCompatibility = () => {
      // Fallback para CSS.supports se não estiver disponível
      const supports = (property: string, value?: string) => {
        if (typeof CSS !== 'undefined' && CSS.supports) {
          return value ? CSS.supports(property, value) : CSS.supports(property)
        }
        // Fallback básico: assumir suporte se CSS.supports não existir
        return true
      }

      const features = {
        // CSS Custom Properties (variáveis CSS)
        cssVariables: supports('color', 'var(--test)'),
        // Flexbox
        flexbox: supports('display', 'flex'),
        // Grid
        grid: supports('display', 'grid'),
        // Transitions
        transitions: supports('transition', 'opacity 0.3s'),
        // ES6+ features
        arrowFunctions: typeof (() => {}) === 'function',
        // localStorage
        localStorage: typeof Storage !== 'undefined',
        // Fetch API
        fetch: typeof fetch !== 'undefined',
        // Promise
        promise: typeof Promise !== 'undefined',
      }

      // Verificar se todos os recursos essenciais estão disponíveis
      const essentialFeatures = [
        features.cssVariables,
        features.flexbox,
        features.transitions,
        features.localStorage,
        features.promise,
      ]

      const isSupported = essentialFeatures.every(feature => feature === true)
      setIsCompatible(isSupported)
    }

    checkCompatibility()
  }, [])

  // Mostrar loading enquanto verifica
  if (isCompatible === null) {
    return <>{children}</>
  }

  // Se não for compatível, mostrar versão simplificada
  if (!isCompatible) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#050814',
        color: '#d3cec3',
        padding: '2rem',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        lineHeight: '1.6'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h1 style={{ 
            color: '#c92337', 
            fontSize: '2rem', 
            marginBottom: '1rem',
            fontWeight: 'bold'
          }}>
            Azimut
          </h1>
          <p style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>
            Seu navegador não suporta todas as funcionalidades modernas deste site.
          </p>
          <p style={{ marginBottom: '2rem', color: '#8a8a8a' }}>
            Para uma melhor experiência, recomendamos atualizar para uma versão mais recente do seu navegador:
          </p>
          <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
            <li style={{ marginBottom: '0.5rem' }}>
              <a 
                href="https://www.google.com/chrome/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#c92337', textDecoration: 'underline' }}
              >
                Google Chrome (recomendado)
              </a>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <a 
                href="https://www.mozilla.org/firefox/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#c92337', textDecoration: 'underline' }}
              >
                Mozilla Firefox
              </a>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <a 
                href="https://www.microsoft.com/edge" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#c92337', textDecoration: 'underline' }}
              >
                Microsoft Edge
              </a>
            </li>
            <li style={{ marginBottom: '0.5rem' }}>
              <a 
                href="https://www.apple.com/safari/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ color: '#c92337', textDecoration: 'underline' }}
              >
                Safari
              </a>
            </li>
          </ul>
          <div style={{ 
            padding: '1.5rem', 
            backgroundColor: 'rgba(201, 35, 55, 0.1)', 
            border: '1px solid rgba(201, 35, 55, 0.3)',
            borderRadius: '8px'
          }}>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>
              <strong>Contato:</strong> contato@azimutimmersive.com
            </p>
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

export default BrowserCompatibility

