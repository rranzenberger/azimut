import { useState, useEffect } from 'react'

type Theme = 'dark' | 'light'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // Verificar localStorage ou preferência do sistema
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('azimut-theme') as Theme | null
      if (savedTheme && ['dark', 'light'].includes(savedTheme)) {
        return savedTheme
      }
      // Se não houver tema salvo, usar preferência do sistema (mas default dark para Azimut)
      // return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
    }
    return 'dark' // Default Azimut é escuro (cinematográfico)
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
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  const setThemeMode = (newTheme: Theme) => {
    setTheme(newTheme)
  }

  return { theme, toggleTheme, setTheme: setThemeMode, isDark: theme === 'dark' }
}

















