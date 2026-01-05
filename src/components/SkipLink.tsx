import React from 'react'

const SkipLink: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="skip-link"
      style={{
        position: 'absolute',
        left: '-9999px',
        zIndex: 9999,
        padding: '1rem 1.5rem',
        backgroundColor: 'var(--color-azimut-red)',
        color: '#ffffff',
        textDecoration: 'none',
        fontWeight: 600,
        fontSize: '1rem',
        borderRadius: '0 0 4px 0',
        transition: 'all 0.2s ease-in-out'
      }}
      onFocus={(e) => {
        e.currentTarget.style.left = '0'
        e.currentTarget.style.top = '0'
      }}
      onBlur={(e) => {
        e.currentTarget.style.left = '-9999px'
      }}
    >
      Skip to main content
    </a>
  )
}

export default SkipLink










































