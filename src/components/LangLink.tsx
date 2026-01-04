import React, { useEffect } from 'react'
import { Link, LinkProps, useLocation } from 'react-router-dom'
import { useLanguageRoute } from '../hooks/useLanguageRoute'

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
  const { getLangPath } = useLanguageRoute()
  
  // Não adicionar prefixo se já tem (segurança)
  const hasLangPrefix = /^\/(pt|en|fr|es)(\/|$)/.test(to)
  const href = hasLangPrefix ? to : getLangPath(to, lang)
  
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

