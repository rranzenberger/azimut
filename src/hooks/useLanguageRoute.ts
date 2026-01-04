import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { type Lang } from '../i18n'

/**
 * Hook para gerenciar rotas com prefixo de idioma
 * Garante que o idioma da URL sempre sincronize com o state
 */
export function useLanguageRoute() {
  const params = useParams<{ lang: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  
  // Idioma da URL (se existir)
  const langFromUrl = params.lang as Lang | undefined
  
  // Validar idioma
  const isValidLang = (lang: string | undefined): lang is Lang => {
    return lang !== undefined && ['pt', 'en', 'fr', 'es'].includes(lang)
  }
  
  // Idioma atual (validado)
  const currentLang: Lang = isValidLang(langFromUrl) ? langFromUrl : 'en'
  
  /**
   * Navegar para uma rota mantendo o idioma atual
   */
  const navigateWithLang = (path: string, newLang?: Lang) => {
    const targetLang = newLang || currentLang
    const cleanPath = path.startsWith('/') ? path : `/${path}`
    navigate(`/${targetLang}${cleanPath}`)
  }
  
  /**
   * Trocar idioma mantendo a rota atual
   */
  const changeLang = (newLang: Lang) => {
    // Remover QUALQUER prefixo de idioma da rota (não só o atual)
    const currentPath = location.pathname.replace(/^\/(pt|en|fr|es)/, '') || '/'
    navigate(`/${newLang}${currentPath}`)
  }
  
  /**
   * Obter caminho completo com idioma
   */
  const getLangPath = (path: string, lang?: Lang): string => {
    const targetLang = lang || currentLang
    // Remover prefixo de idioma se já existir
    let cleanPath = path.startsWith('/') ? path : `/${path}`
    cleanPath = cleanPath.replace(/^\/(pt|en|fr|es)/, '')
    if (!cleanPath.startsWith('/')) cleanPath = `/${cleanPath}`
    return `/${targetLang}${cleanPath}`
  }
  
  return {
    lang: currentLang,
    navigateWithLang,
    changeLang,
    getLangPath,
    isValidLang
  }
}

