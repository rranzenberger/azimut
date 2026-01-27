// ════════════════════════════════════════════════════════════
// BANNER TEST - Banner de Teste (Sempre Visível)
// ════════════════════════════════════════════════════════════
// Use este componente para testar se o banner aparece
// REMOVER EM PRODUÇÃO
// ════════════════════════════════════════════════════════════

import React, { useEffect } from 'react'
import { useTheme } from '../contexts/ThemeContext'

const BannerTest: React.FC = () => {
  const { theme } = useTheme()
  
  // Só mostrar em desenvolvimento
  if (import.meta.env.PROD) {
    return null
  }
  
  useEffect(() => {
    console.log('🧪 BannerTest montado e renderizando!')
  }, [])
  
  // Banner de teste mais sutil e elegante - adapta ao tema
  const isDark = theme === 'dark'
  
  return (
    <div
      id="banner-test-react"
      style={{
        position: 'fixed',
        top: '100px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 999999,
        width: '90%',
        maxWidth: '400px',
        padding: '12px 16px',
        backgroundColor: isDark 
          ? 'rgba(15, 23, 42, 0.95)' 
          : 'rgba(245, 241, 232, 0.95)', // Bege do tema claro (#f5f1e8)
        border: `1px solid ${isDark ? 'rgba(201, 35, 55, 0.3)' : 'rgba(201, 35, 55, 0.2)'}`,
        borderRadius: '8px',
        boxShadow: isDark
          ? '0 4px 12px rgba(0, 0, 0, 0.3)'
          : '0 4px 12px rgba(0, 0, 0, 0.1)',
        color: isDark ? '#cbd5e1' : '#0d0d0d', // Texto escuro no tema claro
        fontSize: '12px',
        textAlign: 'center',
        pointerEvents: 'auto',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)'
      }}
    >
      <span style={{ color: '#c92337', marginRight: '6px' }}>🧪</span>
      <span style={{ fontWeight: '500' }}>Teste: Banner funcionando</span>
      <span style={{ color: isDark ? '#64748b' : '#475569', fontSize: '11px', marginLeft: '8px' }}>
        (remover em produção)
      </span>
    </div>
  )
}

export default BannerTest
