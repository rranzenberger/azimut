// ════════════════════════════════════════════════════════════
// HOOK: usePageSEO - SEO Otimizado com Backoffice
// ════════════════════════════════════════════════════════════
// Busca dados SEO do backoffice e otimiza com keywords
// ════════════════════════════════════════════════════════════

import { useMemo } from 'react'
import { type Lang } from '../i18n'
import { useBackofficeContent } from './useBackofficeContent'
import { seoData } from '../components/SEO'
import { optimizeTitleWithKeywords, generateKeywordsString, PAGE_KEYWORDS } from '../utils/seoKeywords'

interface UsePageSEOReturn {
  title: string
  description: string
  keywords: string
  image?: string
  url?: string
}

/**
 * Hook para buscar e otimizar SEO de uma página
 * 
 * @param slug - Slug da página (ex: 'home', 'vancouver', 'work')
 * @param lang - Idioma (pt, en, es, fr)
 * @returns {UsePageSEOReturn} - Dados SEO otimizados
 * 
 * @example
 * const { title, description, keywords } = usePageSEO('vancouver', 'pt')
 */
export function usePageSEO(
  slug: string,
  lang: Lang
): UsePageSEOReturn {
  // Buscar dados do backoffice
  const { page: backofficePage } = useBackofficeContent(slug, lang)

  // Fallback para dados hardcoded
  const fallbackSEO = seoData[slug as keyof typeof seoData]?.[lang] || seoData.home[lang]
  const fallbackKeywords = PAGE_KEYWORDS[slug]?.[lang] || PAGE_KEYWORDS.home[lang]

  // Usar dados do backoffice se disponíveis, senão usar fallback
  const rawTitle = backofficePage?.seo?.title || fallbackSEO.title
  const rawDescription = backofficePage?.seo?.description || fallbackSEO.description
  const pageKeywords = fallbackKeywords

  // Otimizar título com keywords
  const optimizedTitle = useMemo(() => {
    return optimizeTitleWithKeywords(rawTitle, pageKeywords, lang)
  }, [rawTitle, pageKeywords, lang])

  // Gerar keywords string completa
  const keywordsString = useMemo(() => {
    // Se description já tem keywords, usar apenas keywords da página
    // Senão, incluir long-tail keywords também
    const includeLongTail = !rawDescription.toLowerCase().includes(pageKeywords[0]?.toLowerCase() || '')
    return generateKeywordsString(pageKeywords, lang, includeLongTail)
  }, [pageKeywords, lang, rawDescription])

  const isVancouver = slug === 'vancouver' || slug === 'academy/vancouver'
  const isHome = slug === 'home'
  const isWork = slug === 'work'
  // URL da imagem (padrão ou específica da página)
  const image = isVancouver
    ? 'https://azimutimmersive.com/og-vancouver.jpg'
    : isWork
    ? 'https://azimutimmersive.com/og-work.jpg'
    : 'https://azimutimmersive.com/og-image.jpg'

  // URL canônica — sempre com prefixo de idioma (inclui /pt) para bater com os hreflang
  const url = isHome
    ? `https://azimutimmersive.com/${lang}`
    : isVancouver
    ? `https://azimutimmersive.com/${lang}/academy/vancouver`
    : `https://azimutimmersive.com/${lang}/${slug}`

  return {
    title: optimizedTitle,
    description: rawDescription,
    keywords: keywordsString,
    image,
    url
  }
}
