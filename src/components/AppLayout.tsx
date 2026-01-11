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
  // DEBUG: Verificar se children está chegando
  console.log('🔵 AppLayout - children:', children)
  console.log('🔵 AppLayout - children type:', typeof children)
  
  // Sempre usar Layout para todas as rotas
  return (
    <Layout lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme}>
      {children}
    </Layout>
  )
}

export default AppLayout



























