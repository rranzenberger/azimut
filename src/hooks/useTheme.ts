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
      
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/cd5c9e98-fcf8-48d0-8a4c-847d5c0a34f9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useTheme.ts:init',message:'Theme initialization',data:{isMobile,defaultTheme,savedTheme,userHasPreference,windowWidth:window.innerWidth},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      
      // Se usuário trocou manualmente (via toggle), respeitar escolha
      if (userHasPreference && savedTheme && ['dark', 'light'].includes(savedTheme)) {
        // #region agent log
        fetch('http://127.0.0.1:7242/ingest/cd5c9e98-fcf8-48d0-8a4c-847d5c0a34f9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useTheme.ts:manual',message:'Using manual preference',data:{savedTheme},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
        // #endregion
        return savedTheme
      }
      
      // Caso contrário, usar tema padrão baseado em mobile/desktop
      // #region agent log
      fetch('http://127.0.0.1:7242/ingest/cd5c9e98-fcf8-48d0-8a4c-847d5c0a34f9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useTheme.ts:default',message:'Using default theme',data:{defaultTheme},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'A'})}).catch(()=>{});
      // #endregion
      return defaultTheme
    }
    return 'dark'
  })

  useEffect(() => {
    // #region agent log
    fetch('http://127.0.0.1:7242/ingest/cd5c9e98-fcf8-48d0-8a4c-847d5c0a34f9',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'useTheme.ts:useEffect',message:'Applying theme to DOM',data:{theme,documentThemeBefore:document.documentElement.getAttribute('data-theme')},timestamp:Date.now(),sessionId:'debug-session',runId:'run1',hypothesisId:'B'})}).catch(()=>{});
    // #endregion
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



























