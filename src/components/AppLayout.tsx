import React from 'react'
import { useLocation } from 'react-router-dom'
import Layout from './Layout'
import GamificationWidget from './GamificationWidget'
import { type Lang } from '../i18n'

interface AppLayoutProps {
  children: React.ReactNode
  lang: Lang
  setLang: (lang: Lang) => void
  theme: 'dark' | 'light'
  toggleTheme: () => void
}

const AppLayout: React.FC<AppLayoutProps> = React.memo(({ children, lang, setLang, theme, toggleTheme }) => {
  // Sempre usar Layout para todas as rotas
  return (
    <>
      <Layout lang={lang} setLang={setLang} theme={theme} toggleTheme={toggleTheme}>
        {children}
      </Layout>
      
      {/* 🎮 GAMIFICATION WIDGET - DESABILITADO (causava erro #310)
      <GamificationWidget 
        lang={lang}
        position="bottom-right"
        showOnMount={true}
      />
      */}
    </>
  )
})

AppLayout.displayName = 'AppLayout'

export default AppLayout



























