import { useState, useEffect } from 'react'

type Theme = 'dark' | 'light'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth < 768
      const savedTheme = localStorage.getItem('azimut-theme') as Theme | null
      const userHasPreference = localStorage.getItem('azimut-theme-manual') === 'true'
      
      // Se usuário trocou manualmente, SEMPRE respeitar a escolha dele (mobile ou desktop)
      if (userHasPreference && savedTheme && ['dark', 'light'].includes(savedTheme)) {
        return savedTheme
      }
      
      // Caso contrário, usar tema padrão baseado no dispositivo
      // 📱 Mobile: light (mais legível) | 💻 Desktop: dark (cinematográfico)
      return isMobile ? 'light' : 'dark'
    }
    return 'dark'
  })

  useEffect(() => {
    // Aplicar tema ao document (múltiplos lugares para forçar atualização)
    document.documentElement.setAttribute('data-theme', theme)
    document.body.setAttribute('data-theme', theme)
    document.body.className = document.body.className.replace(/theme-\w+/, '') + ` theme-${theme}`
    localStorage.setItem('azimut-theme', theme)
    
    // Atualizar meta theme-color para mobile
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', theme === 'dark' ? '#050814' : '#d3cec3')
    }
    
    // Forçar repaint (fix para gradientes não atualizarem)
    document.body.style.display = 'none'
    setTimeout(() => {
      document.body.style.display = ''
    }, 0)
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



























