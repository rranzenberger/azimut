import { useState, useEffect } from 'react'

type Theme = 'dark' | 'light'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      // 📱 MOBILE (< 768px): SEMPRE CLARO por padrão (melhor UX)
      // 💻 DESKTOP (>= 768px): SEMPRE ESCURO por padrão (cinematográfico)
      const isMobile = window.innerWidth < 768
      const defaultTheme = isMobile ? 'light' : 'dark'
      
      // Verificar se usuário já escolheu uma preferência manualmente
      const savedTheme = localStorage.getItem('azimut-theme') as Theme | null
      const userHasPreference = localStorage.getItem('azimut-theme-manual') === 'true'
      
      // Se usuário trocou manualmente (via toggle), respeitar escolha
      if (userHasPreference && savedTheme && ['dark', 'light'].includes(savedTheme)) {
        return savedTheme
      }
      
      // Caso contrário, usar tema padrão baseado em mobile/desktop
      return defaultTheme
    }
    return 'dark'
  })

  useEffect(() => {
    // Aplicar tema ao document
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('azimut-theme', theme)
    
    // Atualizar meta theme-color para mobile
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#050814' : '#d3cec3')
    }
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => {
      const newTheme = prev === 'dark' ? 'light' : 'dark'
      // Marcar que usuário trocou manualmente (respeitar escolha dele)
      localStorage.setItem('azimut-theme-manual', 'true')
      return newTheme
    })
  }

  const setThemeMode = (newTheme: Theme) => {
    setTheme(newTheme)
  }

  return { theme, toggleTheme, setTheme: setThemeMode, isDark: theme === 'dark' }
}



























