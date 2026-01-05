import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop: React.FC = () => {
  const { pathname, search } = useLocation()
  const prevPathnameRef = useRef<string>(pathname)

  useEffect(() => {
    const prevPathname = prevPathnameRef.current
    
    // Remover prefixos de idioma para comparação
    const cleanPrev = prevPathname.replace(/^\/(pt|en|fr|es)/, '')
    const cleanCurrent = pathname.replace(/^\/(pt|en|fr|es)/, '')
    
    // Se mudou APENAS o idioma (mesma rota), NÃO scroll
    const onlyLangChanged = cleanPrev === cleanCurrent && prevPathname !== pathname
    
    // Fazer scroll em TODOS os outros casos (navegação real entre páginas)
    if (!onlyLangChanged) {
      // Scroll IMEDIATO para garantir que sempre funciona
      window.scrollTo(0, 0)
      
      // Pequeno delay e scroll novamente para garantir (alguns navegadores precisam)
      requestAnimationFrame(() => {
        window.scrollTo(0, 0)
      })
    }
    
    // Atualizar referência
    prevPathnameRef.current = pathname
  }, [pathname, search])

  return null
}

export default ScrollToTop














































