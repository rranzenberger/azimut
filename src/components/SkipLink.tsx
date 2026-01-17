import React from 'react'

const SkipLink: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[9999] focus:p-4 focus:bg-azimut-red focus:text-white focus:font-semibold focus:rounded-br-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
      style={{
        position: 'absolute',
        left: '-9999px',
        zIndex: 9999,
        padding: '1rem 1.5rem',
        backgroundColor: '#c92337',
        color: '#ffffff',
        textDecoration: 'none',
        fontWeight: 600,
        fontSize: '1rem',
        borderRadius: '0 0 8px 0',
        transition: 'all 0.2s ease-in-out',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
      }}
      onFocus={(e) => {
        e.currentTarget.style.left = '0'
        e.currentTarget.style.top = '0'
      }}
      onBlur={(e) => {
        e.currentTarget.style.left = '-9999px'
      }}
      aria-label="Pular para conteúdo principal"
    >
      Pular para conteúdo principal
    </a>
  )
}

export default SkipLink













































