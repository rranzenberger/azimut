import React from 'react'
import { useLocation } from 'react-router-dom'
import Layout from './Layout'
import { type Lang } from '../i18n'

interface AppLayoutProps {
  children: React.ReactNode
  lang: Lang
  setLang: (lang: Lang) => void
  theme: 'dark' | 'light'
  toggleTheme: () => void
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, lang, setLang, theme, toggleTheme }) => {
  const location = useLocation()
  
  // Se for a rota de login, não usar Layout
  if (location.pathname === '/login') {
    return <>{children}</>
  }
  
  // Para todas as outras rotas, usar Layout
  return (
    <Layout lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme}>
      {children}
    </Layout>
  )
}

export default AppLayout























