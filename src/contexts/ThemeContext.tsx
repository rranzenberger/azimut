import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Theme = 'dark' | 'light'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 768
      const savedTheme = localStorage.getItem('azimut-theme') as Theme | null
      const userHasPreference = localStorage.getItem('azimut-theme-manual') === 'true'
      
      // Se usuário trocou manualmente, SEMPRE respeitar a escolha dele
      if (userHasPreference && savedTheme && ['dark', 'light'].includes(savedTheme)) {
        return savedTheme
      }
      
      // Caso contrário, tema padrão baseado no dispositivo
      // 📱 Mobile: light | 💻 Desktop: dark
      return isMobile ? 'light' : 'dark'
    }
    return 'dark'
  })

  useEffect(() => {
    console.log('🎨 [ThemeContext] Theme changed to:', theme)
    
    // Aplicar tema ao document
    const html = document.documentElement
    const body = document.body
    
    // Remover tema anterior
    html.removeAttribute('data-theme')
    body.removeAttribute('data-theme')
    body.className = body.className.replace(/theme-\w+/g, '')
    
    // Aplicar novo tema
    html.setAttribute('data-theme', theme)
    body.setAttribute('data-theme', theme)
    body.classList.add(`theme-${theme}`)
    
    console.log('🎨 [ThemeContext] HTML data-theme:', html.getAttribute('data-theme'))
    
    // Salvar no localStorage
    localStorage.setItem('azimut-theme', theme)
    
    // Atualizar meta theme-color para mobile
    let metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta')
      metaThemeColor.setAttribute('name', 'theme-color')
      document.head.appendChild(metaThemeColor)
    }
    metaThemeColor.setAttribute('content', theme === 'dark' ? '#050814' : '#d3cec3')
    
    // Forçar reflow
    void html.offsetHeight
    
    // Disparar evento customizado
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }))
  }, [theme])

  const toggleTheme = () => {
    console.log('🎨 [ThemeContext] Toggle clicked! Current:', theme)
    setThemeState(prev => {
      const newTheme = prev === 'dark' ? 'light' : 'dark'
      console.log('🎨 [ThemeContext] New theme:', newTheme)
      localStorage.setItem('azimut-theme-manual', 'true')
      return newTheme
    })
  }

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme)
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, isDark: theme === 'dark' }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    // Fallback para quando não está dentro do Provider (SSR, etc)
    console.warn('⚠️ useTheme() called outside ThemeProvider! Using fallback.')
    return {
      theme: 'dark' as Theme,
      toggleTheme: () => {},
      setTheme: () => {},
      isDark: true
    }
  }
  return context
}
