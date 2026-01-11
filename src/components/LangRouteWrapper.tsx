import React, { useEffect } from 'react'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { type Lang } from '../i18n'

interface LangRouteWrapperProps {
  children: (lang: Lang) => React.ReactElement
  setLang: (lang: Lang) => void
}

/**
 * Wrapper para rotas com idioma
 * - Valida idioma da URL
 * - Sincroniza com state/localStorage
 * - Redireciona se idioma inválido
 */
const LangRouteWrapper: React.FC<LangRouteWrapperProps> = ({ children, setLang }) => {
  const params = useParams<{ lang: string }>()
  const navigate = useNavigate()
  
  const urlLang = params.lang
  const validLangs: Lang[] = ['pt', 'en', 'fr', 'es']
  
  console.log('🔍 LangRouteWrapper - params:', JSON.stringify(params))
  console.log('🔍 LangRouteWrapper - urlLang:', urlLang, '| isValid:', validLangs.includes(urlLang as Lang))
  
  // Validar idioma
  const isValidLang = urlLang && validLangs.includes(urlLang as Lang)
  
  useEffect(() => {
    if (isValidLang) {
      // Sincronizar state e localStorage com URL
      setLang(urlLang as Lang)
      localStorage.setItem('azimut-lang', urlLang)
    }
  }, [urlLang, isValidLang, setLang])
  
  // Se idioma inválido, redirecionar para inglês
  if (!isValidLang) {
    const savedLang = localStorage.getItem('azimut-lang') as Lang || 'en'
    const currentPath = window.location.pathname.replace(/^\/(pt|en|fr|es)/, '') || '/'
    return <Navigate to={`/${savedLang}${currentPath}`} replace />
  }
  
  return children(urlLang as Lang)
}

export default LangRouteWrapper

