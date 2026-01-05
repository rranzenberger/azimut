import React from 'react'
import { Link, LinkProps, useLocation } from 'react-router-dom'
import { type Lang } from '../i18n'

/**
 * Link que automaticamente adiciona prefixo de idioma
 * Uso: <LangLink to="/studio">Studio</LangLink>
 * Resultado: /pt/studio (se idioma for PT)
 */
interface LangLinkProps extends Omit<LinkProps, 'to'> {
  to: string
  lang?: 'pt' | 'en' | 'fr' | 'es'
}

const LangLink: React.FC<LangLinkProps> = ({ to, lang, children, onClick, ...props }) => {
  const location = useLocation()
  
  // EXTRAIR idioma diretamente da URL atual (método mais confiável)
  const urlLangMatch = location.pathname.match(/^\/(pt|en|fr|es)(\/|$)/)
  const currentUrlLang = urlLangMatch ? urlLangMatch[1] as Lang : null
  
  // Fallback: tentar localStorage se não tiver na URL
  const storedLang = typeof window !== 'undefined' 
    ? localStorage.getItem('azimut-lang') as Lang | null 
    : null
  
  // Usar: 1) lang prop, 2) currentUrlLang (da URL atual), 3) storedLang (localStorage), 4) fallback 'en'
  const targetLang = lang || currentUrlLang || storedLang || 'en'
  
  // Se o link já tem prefixo de idioma, usar ele
  const hasLangPrefix = /^\/(pt|en|fr|es)(\/|$)/.test(to)
  
  let href: string
  if (hasLangPrefix) {
    // Já tem prefixo, usar direto
    href = to
  } else {
    // Adicionar prefixo de idioma
    const cleanPath = to.startsWith('/') ? to : `/${to}`
    href = `/${targetLang}${cleanPath}`
  }
  
  // Handler para scroll em âncoras
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Executar onClick do usuário se existir
    if (onClick) {
      onClick(e)
    }
    
    // Se tem âncora (#), fazer scroll suave
    if (to.includes('#')) {
      const [path, hash] = to.split('#')
      if (hash) {
        // Pequeno delay para garantir que a navegação aconteceu
        setTimeout(() => {
          const element = document.getElementById(hash)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }, 100)
      }
    }
  }
  
  return (
    <Link to={href} onClick={handleClick} {...props}>
      {children}
    </Link>
  )
}

export default LangLink

