import { useState, useEffect } from 'react'
import { isPWAInstalled } from '../utils/pwa'

type Theme = 'dark' | 'light'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('azimut-theme') as Theme | null
      const userHasPreference = localStorage.getItem('azimut-theme-manual') === 'true'
      
      // Se usuário trocou manualmente, SEMPRE respeitar a escolha dele
      if (userHasPreference && savedTheme && ['dark', 'light'].includes(savedTheme)) {
        return savedTheme
      }
      
      // Caso contrário, tema padrão baseado no tipo de acesso:
      // 🌐 Web (navegador): light | 📱 PWA instalado: dark
      const isPWA = isPWAInstalled()
      return isPWA ? 'dark' : 'light'
    }
    return 'dark'
  })

  useEffect(() => {
    // Aplicar tema ao document (múltiplos lugares para forçar atualização)
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
    
    // Forçar reflow para garantir que CSS seja aplicado
    void html.offsetHeight
    
    // Disparar evento customizado para componentes que precisam reagir
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }))
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



























