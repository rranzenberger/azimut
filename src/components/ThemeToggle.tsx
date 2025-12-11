import React from 'react'

interface ThemeToggleProps {
  theme: 'dark' | 'light'
  onToggle: () => void
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  return (
    <button
      onClick={onToggle}
      className="relative flex items-center justify-center transition-all duration-300 group"
      aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
      title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}
    >
      {/* Container - estilo anterior com fundo suave */}
      <div className="relative w-[42px] h-[22px] rounded-full transition-all duration-400"
        style={{ 
          background: theme === 'dark' 
            ? 'linear-gradient(135deg, #1a1f2e 0%, #0a0f1a 100%)' 
            : 'linear-gradient(135deg, #8B2332 0%, #6a1a26 100%)',
          border: '1.5px solid',
          borderColor: theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(139, 35, 50, 0.8)'
        }}
      >
        {/* Círculo deslizante */}
        <div 
          className="absolute top-[2px] w-[16px] h-[16px] rounded-full transition-all duration-400 flex items-center justify-center"
          style={{ 
            left: theme === 'dark' ? '3px' : '21px',
            background: theme === 'dark' ? '#c92337' : '#ffffff',
            boxShadow: theme === 'dark' 
              ? '0 0 8px rgba(201, 35, 55, 0.5)' 
              : '0 2px 4px rgba(0, 0, 0, 0.2)'
          }}
        >
          {/* Ícone dentro do círculo */}
          {theme === 'dark' ? (
            <svg className="w-[10px] h-[10px]" fill="#fff" viewBox="0 0 24 24">
              <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
            </svg>
          ) : (
            <svg className="w-[10px] h-[10px]" fill="#c92337" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="4"/>
            </svg>
          )}
        </div>
      </div>
    </button>
  )
}

export default ThemeToggle
