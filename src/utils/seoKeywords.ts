// ════════════════════════════════════════════════════════════
// SEO KEYWORDS - Keywords Estratégicas por Página
// ════════════════════════════════════════════════════════════
// Keywords otimizadas para aparecer em primeiro nos buscadores
// ════════════════════════════════════════════════════════════

import { type Lang } from '../i18n'

// Keywords primárias (alta competição)
export const PRIMARY_KEYWORDS = {
  pt: [
    'experiências imersivas brasil',
    'realidade virtual VR brasil',
    'produtora audiovisual rio de janeiro',
    'agente educacional VFS Vancouver',
    'produtora museus exposições',
    'XR AR VR studio brasil',
    'animação 3D VFX brasil',
    'cinema 360 graus'
  ],
  en: [
    'immersive experiences brazil',
    'virtual reality VR brazil',
    'audiovisual production rio de janeiro',
    'education agent VFS Vancouver',
    'museum exhibitions production',
    'XR AR VR studio brazil',
    '3D animation VFX brazil',
    '360 cinema'
  ],
  es: [
    'experiencias inmersivas brasil',
    'realidad virtual VR brasil',
    'producción audiovisual rio de janeiro',
    'agente educativo VFS Vancouver',
    'producción exposiciones museos',
    'XR AR VR studio brasil',
    'animación 3D VFX brasil',
    'cine 360 grados'
  ],
  fr: [
    'expériences immersives brésil',
    'réalité virtuelle VR brésil',
    'production audiovisuelle rio de janeiro',
    'agent éducatif VFS Vancouver',
    'production expositions musées',
    'XR AR VR studio brésil',
    'animation 3D VFX brésil',
    'cinéma 360 degrés'
  ]
}

// Long-tail keywords (menos competição, mais específicas)
export const LONG_TAIL_KEYWORDS = {
  pt: [
    'como estudar cinema no Canadá',
    'melhor agente educacional VFS Vancouver',
    'curso VFX com certificação internacional',
    'produtora VR para museus',
    'experiências imersivas para eventos',
    'realidade virtual para exposições culturais',
    'produção audiovisual para marcas',
    'estudar animação 3D Vancouver'
  ],
  en: [
    'how to study film in Canada',
    'best education agent VFS Vancouver',
    'VFX course with international certification',
    'VR production for museums',
    'immersive experiences for events',
    'virtual reality for cultural exhibitions',
    'audiovisual production for brands',
    'study 3D animation Vancouver'
  ],
  es: [
    'cómo estudiar cine en Canadá',
    'mejor agente educativo VFS Vancouver',
    'curso VFX con certificación internacional',
    'producción VR para museos',
    'experiencias inmersivas para eventos',
    'realidad virtual para exposiciones culturales',
    'producción audiovisual para marcas',
    'estudiar animación 3D Vancouver'
  ],
  fr: [
    'comment étudier le cinéma au Canada',
    'meilleur agent éducatif VFS Vancouver',
    'cours VFX avec certification internationale',
    'production VR pour musées',
    'expériences immersives pour événements',
    'réalité virtuelle pour expositions culturelles',
    'production audiovisuelle pour marques',
    'étudier animation 3D Vancouver'
  ]
}

/**
 * Otimiza título com keywords estratégicas
 * Garante que keyword principal está no início do título
 */
export function optimizeTitleWithKeywords(
  title: string,
  keywords: string[],
  lang: Lang
): string {
  if (!keywords || keywords.length === 0) return title

  // Pegar keyword principal (primeira da lista)
  const mainKeyword = keywords[0]

  // Se título já contém a keyword principal, retornar como está
  if (title.toLowerCase().includes(mainKeyword.toLowerCase())) {
    return title
  }

  // Se título é muito curto, adicionar keyword no início
  if (title.length < 40) {
    return `${mainKeyword} | ${title}`
  }

  // Se título é médio, adicionar keyword no início mas limitar tamanho
  if (title.length < 55) {
    const optimized = `${mainKeyword} | ${title}`
    // Limitar a 60 caracteres (limite do Google)
    return optimized.length > 60 ? optimized.substring(0, 57) + '...' : optimized
  }

  // Se título já é longo, apenas garantir que keyword está presente
  return title
}

/**
 * Gera keywords string para meta tag
 * Combina keywords primárias e long-tail
 */
export function generateKeywordsString(
  pageKeywords: string[],
  lang: Lang,
  includeLongTail: boolean = false
): string {
  const primary = PRIMARY_KEYWORDS[lang] || PRIMARY_KEYWORDS.pt
  const longTail = includeLongTail ? (LONG_TAIL_KEYWORDS[lang] || LONG_TAIL_KEYWORDS.pt) : []

  // Combinar: keywords da página + primárias + long-tail (se solicitado)
  const allKeywords = [
    ...pageKeywords,
    ...primary.slice(0, 5), // Primeiras 5 primárias
    ...(includeLongTail ? longTail.slice(0, 3) : []) // Primeiras 3 long-tail se solicitado
  ]

  // Remover duplicatas e retornar string
  return [...new Set(allKeywords)].join(', ')
}

/**
 * Keywords por página (fallback quando não há dados do backoffice)
 */
export const PAGE_KEYWORDS: Record<string, Record<Lang, string[]>> = {
  home: {
    pt: ['produtora audiovisual', 'VR', 'AR', 'realidade virtual', 'experiências imersivas', 'VFX', 'animação', 'game design', 'Vancouver', 'VFS', 'VanArts'],
    en: ['audiovisual production', 'VR', 'AR', 'virtual reality', 'immersive experiences', 'VFX', 'animation', 'game design', 'Vancouver', 'VFS', 'VanArts'],
    es: ['producción audiovisual', 'VR', 'AR', 'realidad virtual', 'experiencias inmersivas', 'VFX', 'animación', 'game design', 'Vancouver', 'VFS', 'VanArts'],
    fr: ['production audiovisuelle', 'VR', 'AR', 'réalité virtuelle', 'expériences immersives', 'VFX', 'animation', 'game design', 'Vancouver', 'VFS', 'VanArts']
  },
  vancouver: {
    pt: ['estudar Vancouver', 'VFS', 'VanArts', 'Canadá', 'intercâmbio', 'cinema', 'VFX', 'animação', 'residência permanente'],
    en: ['study Vancouver', 'VFS', 'VanArts', 'Canada', 'exchange', 'film', 'VFX', 'animation', 'permanent residence'],
    es: ['estudiar Vancouver', 'VFS', 'VanArts', 'Canadá', 'intercambio', 'cine', 'VFX', 'animación', 'residencia permanente'],
    fr: ['étudier Vancouver', 'VFS', 'VanArts', 'Canada', 'échange', 'cinéma', 'VFX', 'animation', 'résidence permanente']
  },
  work: {
    pt: ['portfolio', 'projetos VR', 'exposições imersivas', 'realidade virtual', 'casos de sucesso'],
    en: ['portfolio', 'VR projects', 'immersive exhibitions', 'virtual reality', 'success cases'],
    es: ['portfolio', 'proyectos VR', 'exposiciones inmersivas', 'realidad virtual', 'casos de éxito'],
    fr: ['portfolio', 'projets VR', 'expositions immersives', 'réalité virtuelle', 'cas de succès']
  }
}
