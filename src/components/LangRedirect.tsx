import React from 'react'
import { Navigate } from 'react-router-dom'
import { type Lang } from '../i18n'
import { detectGeoFromTimezone, detectLanguageFromBrowser } from '../utils/geoDetection'

/**
 * Componente para redirect inteligente / → /:lang
 * Detecta idioma ideal e redireciona
 */
const LangRedirect: React.FC = () => {
  // 1. Tentar localStorage
  const savedLang = localStorage.getItem('azimut-lang') as Lang | null
  
  if (savedLang && ['pt', 'en', 'fr', 'es'].includes(savedLang)) {
    return <Navigate to={`/${savedLang}`} replace />
  }
  
  // 2. Tentar detectar por timezone
  try {
    const geo = detectGeoFromTimezone()
    if (geo.countryCode !== 'DEFAULT') {
      return <Navigate to={`/${geo.language}`} replace />
    }
  } catch (e) {
    // Ignorar erro
  }
  
  // 3. Fallback: idioma do navegador
  const browserLang = detectLanguageFromBrowser()
  return <Navigate to={`/${browserLang}`} replace />
}

export default LangRedirect

