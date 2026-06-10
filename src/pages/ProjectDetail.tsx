import React, { useEffect, useRef } from 'react'
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { type Lang } from '../i18n'
import SEO, { seoData } from '../components/SEO'
import { useUserTracking } from '../hooks/useUserTracking'
import { trackPageView } from '../utils/analytics'
import { useProject } from '../hooks/useProject'
import { useAzimutContent } from '../hooks/useAzimutContent'
import ProjectGalleryStatus from '../components/ProjectGalleryStatus'
import StarBackground from '../components/StarBackground'
import { ProjectSchema, VideoObjectSchema, ReviewRatingSchema } from '../components/StructuredData'
import Breadcrumbs from '../components/Breadcrumbs'
import { useTheme } from '../contexts/ThemeContext'

interface ProjectDetailProps {
  lang: Lang
}

// Slug antigo/errado → slug canônico (evita "projeto não encontrado" por URL errada)
const SLUG_REDIRECTS: Record<string, string> = {
  'rio-museu-olimpico': 'museu-olimpico-rio',
}

// Monta projeto mínimo a partir do item da lista Work (quando API falha e não há placeholder)
function minimalProjectFromList(item: any): any {
  if (!item || !item.slug) return null
  const hero = item.heroImage
  return {
    slug: item.slug,
    title: item.title || item.slug,
    shortTitle: item.shortTitle || null,
    summary: item.summary || null,
    description: item.description || item.summary || null,
    city: item.city || null,
    stateProvince: item.stateProvince || null,
    country: item.country || null,
    year: item.year ?? null,
    month: item.month ?? null,
    client: item.client || null,
    partnership: item.partnership || null,
    coproduction: item.coproduction || null,
    type: item.type || null,
    tags: Array.isArray(item.tags) ? item.tags : [],
    services: Array.isArray(item.services) ? item.services : [],
    heroImage: hero ? {
      type: hero.type || 'IMAGE',
      original: hero.original || hero.large || hero.medium || hero.thumbnail,
      thumbnail: hero.thumbnail || hero.medium || hero.original,
      medium: hero.medium || hero.thumbnail || hero.original,
      large: hero.large || hero.medium || hero.original,
      alt: hero.alt || item.title,
    } : null,
    heroImageFit: item.heroImageFit || 'contain',
    heroImagePosition: item.heroImagePosition || 'center',
    gallery: [],
    market: null,
    cta: {},
    seo: null,
  }
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ lang }) => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const location = useLocation()
  const { theme } = useTheme()
  // REMOVIDO: useUserTracking já é chamado no Layout.tsx
  // const { trackInteraction } = useUserTracking()
  const trackInteraction = (type: string, target: string) => {} // Dummy
  const starRef = useRef<HTMLDivElement>(null)

  const canonicalSlug = (slug && SLUG_REDIRECTS[slug]) || slug || ''
  const { project, loading, error } = useProject(canonicalSlug, lang)

  // Preview vindo da lista (Work): mostra conteúdo na hora e completa quando a API responder
  const projectPreview = (location.state as any)?.projectPreview ?? null

  // Redirecionar para slug canônico (ex: /pt/work/rio-museu-olimpico → /pt/work/museu-olimpico-rio)
  // Path sempre relativo (/:lang/work/:slug) para evitar SecurityError no History.replaceState
  useEffect(() => {
    if (slug && SLUG_REDIRECTS[slug]) {
      const path = `/${lang}/work/${SLUG_REDIRECTS[slug]}`
      navigate(path, { replace: true })
    }
  }, [slug, lang, navigate])
  const { content: cmsContent } = useAzimutContent({ page: 'work' })
  const allProjects = cmsContent?.highlightProjects || []

  // Ordem: API → preview da navegação → lista Work (fallback quando API falha)
  const fallbackFromList = (!project && (canonicalSlug || slug))
    ? (allProjects as any[]).find((p: any) => p.slug === canonicalSlug || p.slug === slug)
    : null
  const effectiveProject = project
    ?? (projectPreview ? minimalProjectFromList(projectPreview) : null)
    ?? (fallbackFromList ? minimalProjectFromList(fallbackFromList) : null)
  
  // Estados para filtros da galeria (apenas Museu Olímpico)
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)
  const [showTier1Only, setShowTier1Only] = React.useState(false)
  
  // Projetos relacionados (mesmo tipo ou tags similares, excluindo o atual)
  const relatedProjects = React.useMemo(() => {
    if (!effectiveProject || allProjects.length === 0) return []
    
    return allProjects
      .filter((p: any) => p.slug !== effectiveProject.slug)
      .filter((p: any) => {
        const hasSameType = effectiveProject.type && p.type === effectiveProject.type
        const hasCommonTags = effectiveProject.tags?.some((tag: string) => p.tags?.includes(tag))
        return hasSameType || hasCommonTags
      })
      .slice(0, 3)
  }, [effectiveProject, allProjects])
  
  // Tracking
  useEffect(() => {
    if (slug) {
      try {
        const cleanup = trackPageView(`work/${slug}`)
        return cleanup
      } catch (error) {
        console.warn('Tracking error:', error)
        return () => {}
      }
    }
  }, [slug])
  
  // Parallax na estrela
  useEffect(() => {
    const star = starRef.current
    if (!star) return

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset || document.documentElement.scrollTop
          const parallax = scrolled * 0.3
          
          if (star) {
            star.style.transform = `translateY(${parallax}px)`
          }
          
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Skeleton só quando não temos nada para mostrar (sem preview da lista e sem cache)
  if (loading && !effectiveProject) {
    return (
      <main className="relative py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-10 rounded w-1/3 bg-slate-200 dark:bg-slate-700" />
            <div className="aspect-video md:aspect-[21/9] rounded-2xl md:rounded-3xl bg-slate-200 dark:bg-slate-700" />
            <div className="h-6 rounded w-full max-w-2xl bg-slate-200 dark:bg-slate-700" />
            <div className="h-6 rounded w-3/4 max-w-xl bg-slate-200 dark:bg-slate-700" />
            <div className="h-24 rounded-2xl bg-slate-200 dark:bg-slate-700" />
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="aspect-video rounded-xl bg-slate-200 dark:bg-slate-700" />
              ))}
            </div>
          </div>
        </div>
      </main>
    )
  }

  // Error state: só quando não temos nem projeto nem fallback da lista Work
  if (!effectiveProject) {
    const messages = {
      pt: { title: 'Projeto não encontrado', body: 'O projeto que você está procurando não existe, foi removido ou está temporariamente indisponível. Tente novamente ou volte à lista.', back: 'Voltar para Projetos' },
      en: { title: 'Project not found', body: 'The project you are looking for does not exist, has been removed, or is temporarily unavailable. Try again or go back to the list.', back: 'Back to Projects' },
      es: { title: 'Proyecto no encontrado', body: 'El proyecto que buscas no existe, ha sido eliminado o está temporalmente no disponible. Intenta de nuevo o vuelve a la lista.', back: 'Volver a Proyectos' },
      fr: { title: 'Projet non trouvé', body: 'Le projet que vous recherchez n\'existe pas, a été supprimé ou est temporairement indisponible. Réessayez ou retournez à la liste.', back: 'Retour aux projets' },
    }
    const msg = messages[lang] || messages.en
    return (
      <main className="relative py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="mb-4 font-handel text-4xl uppercase tracking-[0.16em]" style={{ color: 'var(--theme-text)' }}>
            {msg.title}
          </h1>
          <p className="mb-8 text-sm md:text-base max-w-lg mx-auto" style={{ color: 'var(--theme-text-secondary)' }}>
            {msg.body}
          </p>
          <Link
            to={`/${lang}/work`}
            className="inline-flex items-center gap-2 rounded-lg border border-azimut-red/50 bg-azimut-red/10 px-5 py-2.5 font-sora text-sm font-semibold uppercase tracking-[0.1em] transition-all hover:bg-azimut-red/20"
            style={{ color: 'var(--theme-text)' }}
          >
            {msg.back}
          </Link>
        </div>
      </main>
    )
  }

  // Usar campos SEO otimizados pela IA se disponíveis, senão usar fallback
  const seoTitle = effectiveProject.seo?.title || `${effectiveProject.title} | ${seoData.work[lang].title}`
  const seoDescription = effectiveProject.seo?.description || effectiveProject.description || effectiveProject.summary || seoData.work[lang].description
  const seoKeywords = effectiveProject.seo?.keywords?.join(', ') || seoData.work[lang].keywords

  // Detectar se hero é vídeo (tipo ou URL): vídeo aparece aqui na subpágina, não no card
  const hasVideo = effectiveProject.heroImage?.original && (
    effectiveProject.heroImage.type === 'VIDEO' ||
    effectiveProject.heroImage.original.includes('youtube.com') ||
    effectiveProject.heroImage.original.includes('youtu.be') ||
    effectiveProject.heroImage.original.includes('.mp4') ||
    effectiveProject.heroImage.original.includes('.webm')
  )

  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
    return match ? match[1] : null
  }
  const getVimeoId = (url: string) => {
    const match = url.match(/(?:vimeo\.com\/)(?:video\/)?([0-9]+)/)
    return match ? match[1] : null
  }

  const youtubeId = effectiveProject.heroImage?.original ? getYouTubeId(effectiveProject.heroImage.original) : null
  const videoEmbedUrl = youtubeId ? `https://www.youtube-nocookie.com/embed/${youtubeId}` : undefined
  const videoContentUrl = effectiveProject.heroImage?.original?.includes('youtube.com') || effectiveProject.heroImage?.original?.includes('youtu.be')
    ? undefined
    : effectiveProject.heroImage?.original

  return (
    <>
      <SEO
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        url={`/${lang}/work/${effectiveProject.slug}`}
        locale={lang === 'pt' ? 'pt_BR' : lang === 'en' ? 'en_US' : lang === 'es' ? 'es_ES' : 'fr_FR'}
        image={effectiveProject.heroImage?.large || effectiveProject.heroImage?.original}
        type="article"
      />
      
      {/* Schema.org: Project/CreativeWork */}
      <ProjectSchema
        name={effectiveProject.title}
        description={seoDescription}
        image={effectiveProject.heroImage?.large || effectiveProject.heroImage?.original || 'https://azimutimmersive.com/og-image.png'}
        dateCreated={effectiveProject.year ? `${effectiveProject.year}-01-01` : new Date().toISOString().split('T')[0]}
        creator="Azimut"
        client={effectiveProject.client}
        category={effectiveProject.tags?.[0]}
        url={`/${lang}/work/${effectiveProject.slug}`}
        lang={lang}
      />

      {/* Schema.org: VideoObject (se tiver vídeo) */}
      {hasVideo && effectiveProject.heroImage && (
        <VideoObjectSchema
          name={effectiveProject.title}
          description={seoDescription}
          thumbnailUrl={effectiveProject.heroImage.thumbnail || effectiveProject.heroImage.original}
          uploadDate={effectiveProject.year ? `${effectiveProject.year}-01-01` : new Date().toISOString().split('T')[0]}
          contentUrl={videoContentUrl}
          embedUrl={videoEmbedUrl}
          lang={lang}
        />
      )}

      {/* Schema.org: Review/Rating (avaliação genérica para projetos premiados) */}
      {effectiveProject.tags?.some(tag => tag.toLowerCase().includes('premiado') || tag.toLowerCase().includes('award')) && (
        <ReviewRatingSchema
          itemName={effectiveProject.title}
          itemType="CreativeWork"
          ratingValue={4.8}
          bestRating={5}
          worstRating={1}
          reviewCount={1}
          reviews={[{
            author: 'Azimut',
            datePublished: effectiveProject.year ? `${effectiveProject.year}-01-01` : new Date().toISOString().split('T')[0],
            reviewBody: seoDescription,
            ratingValue: 5
          }]}
          lang={lang}
        />
      )}
      <main className="relative py-16 md:py-20">
        {/* Star background - Parallax com detecção automática de tema */}
        <div 
          ref={starRef}
          className="transition-transform duration-75 ease-out" 
          style={{ willChange: 'transform' }}
        >
          <StarBackground 
            className="top-[160px] -right-28 h-[520px] w-[520px] md:top-[160px] md:-right-40 md:h-[680px] md:w-[680px]"
            position="fixed"
            opacity={0.3}
            zIndex={-5}
          />
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs Visuais Premium */}
          <div className="mb-6 md:mb-8">
            <Breadcrumbs 
              lang={lang}
              items={[
                { name: lang === 'pt' ? 'Início' : lang === 'es' ? 'Inicio' : lang === 'fr' ? 'Accueil' : 'Home', url: `/${lang === 'pt' ? '' : lang}` },
                { name: lang === 'pt' ? 'Projetos' : lang === 'es' ? 'Proyectos' : lang === 'fr' ? 'Projets' : 'Work', url: `/${lang === 'pt' ? '' : lang}/work` },
                { name: effectiveProject.title, url: `/${lang === 'pt' ? '' : lang}/work/${effectiveProject.slug}` }
              ]}
            />
          </div>

          {/* Aviso discreto quando a página usa dados da lista Work (API indisponível) */}
          {!project && fallbackFromList && (
            <div className="mb-6 py-3 px-4 rounded-xl border text-sm text-center" style={{ borderColor: 'var(--theme-text-muted)', color: 'var(--theme-text-secondary)' }}>
              {lang === 'pt' && 'Exibindo dados básicos. Conteúdo completo em breve.'}
              {lang === 'en' && 'Showing basic info. Full content coming soon.'}
              {lang === 'es' && 'Mostrando datos básicos. Contenido completo próximamente.'}
              {lang === 'fr' && 'Affichage des informations de base. Contenu complet bientôt.'}
            </div>
          )}

          {/* Hero: imagem principal ou vídeo (vídeo só aqui na subpágina, não no card) */}
          <div className="mb-10 md:mb-12">
            <div className="relative aspect-video md:aspect-[21/9] rounded-2xl md:rounded-3xl overflow-hidden bg-slate-900 mb-6 md:mb-8 shadow-2xl ring-1 ring-black/10 dark:ring-white/5">
              {hasVideo && videoEmbedUrl ? (
                <iframe
                  src={videoEmbedUrl}
                  title={effectiveProject.heroImage?.alt || effectiveProject.title}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : hasVideo && videoContentUrl ? (
                <video
                  src={videoContentUrl}
                  controls
                  className="absolute inset-0 h-full w-full object-contain bg-black"
                  poster={effectiveProject.heroImage?.thumbnail || undefined}
                >
                  {lang === 'pt' ? 'Seu navegador não suporta vídeo.' : lang === 'es' ? 'Su navegador no soporta video.' : lang === 'fr' ? 'Votre navigateur ne prend pas en charge la vidéo.' : 'Your browser does not support video.'}
                </video>
              ) : effectiveProject.heroImage?.large || effectiveProject.heroImage?.original ? (
                <img
                  src={effectiveProject.heroImage.large || effectiveProject.heroImage.original}
                  alt={effectiveProject.heroImage.alt || `${effectiveProject.title}${effectiveProject.summary ? ` - ${effectiveProject.summary.substring(0, 100)}` : ''}${effectiveProject.year ? ` (${effectiveProject.year})` : ''} - Azimut`}
                  className="absolute inset-0 h-full w-full"
                  style={{
                    objectFit: (effectiveProject as any).heroImageFit === 'cover' ? 'cover' : 'contain',
                    objectPosition: (effectiveProject as any).heroImagePosition || 'center',
                  }}
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-20 h-20 text-slate-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm uppercase tracking-wider" style={{ color: 'var(--theme-text-muted)' }}>
                      {lang === 'pt' ? 'Sem imagem' : lang === 'es' ? 'Sin imagen' : lang === 'fr' ? 'Sans image' : 'No image'}
                    </p>
                  </div>
                </div>
              )}
              {!hasVideo && (effectiveProject.heroImage?.large || effectiveProject.heroImage?.original) && (
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              )}
            </div>

            {/* Title and Meta */}
            <div className="mb-6">
              <h1 className="mb-4 font-handel text-4xl md:text-5xl lg:text-6xl uppercase tracking-[0.12em] text-white dark:text-white" style={{ color: 'var(--theme-text)' }}>
                {effectiveProject.title}
              </h1>
              
              {/* Tags */}
              {effectiveProject.tags && effectiveProject.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {effectiveProject.tags.map((tag: string, idx: number) => (
                    <span 
                      key={idx} 
                      className="pill-adaptive rounded-full border px-3 py-1 font-sora text-[0.68rem] uppercase tracking-[0.18em]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Meta Info - só exibe campos preenchidos (tema claro/escuro) */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm" style={{ color: 'var(--theme-text-secondary)' }}>
                {(effectiveProject.year != null || effectiveProject.month != null) && (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {effectiveProject.month != null && effectiveProject.year != null
                      ? `${String(effectiveProject.month).padStart(2, '0')}/${effectiveProject.year}`
                      : effectiveProject.year}
                  </span>
                )}
                {(effectiveProject.city || effectiveProject.stateProvince || effectiveProject.country) && (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {effectiveProject.slug === 'museu-olimpico-rio' 
                      ? lang === 'pt' 
                        ? 'Velódromo, Parque Olímpico, Barra da Tijuca, Rio de Janeiro'
                        : lang === 'es'
                        ? 'Velódromo, Parque Olímpico, Barra da Tijuca, Río de Janeiro'
                        : lang === 'fr'
                        ? 'Vélodrome, Parc Olympique, Barra da Tijuca, Rio de Janeiro'
                        : 'Velodrome, Olympic Park, Barra da Tijuca, Rio de Janeiro'
                      : [effectiveProject.city, effectiveProject.stateProvince, effectiveProject.country].filter(Boolean).join(', ')}
                  </span>
                )}
                {effectiveProject.slug === 'museu-olimpico-rio' && (
                  <span className="flex items-center gap-2 text-xs" style={{ color: 'var(--theme-text-muted)' }}>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {lang === 'pt' 
                      ? 'Próximo ao Parque Rita Lee'
                      : lang === 'es'
                      ? 'Cerca del Parque Rita Lee'
                      : lang === 'fr'
                      ? 'Près du Parc Rita Lee'
                      : 'Near Rita Lee Park'}
                  </span>
                )}
                {effectiveProject.type && (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {effectiveProject.type}
                  </span>
                )}
                {effectiveProject.client && (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {effectiveProject.client}
                  </span>
                )}
                {effectiveProject.partnership && effectiveProject.partnership.trim() && (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {lang === 'pt' ? 'Parceria:' : lang === 'es' ? 'Asociación:' : lang === 'fr' ? 'Partenariat:' : 'Partnership:'} {effectiveProject.partnership}
                  </span>
                )}
                {effectiveProject.coproduction && effectiveProject.coproduction.trim() && (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    {lang === 'pt' ? 'Coprodução:' : lang === 'es' ? 'Coproducción:' : lang === 'fr' ? 'Coproduction:' : 'Co-production:'} {effectiveProject.coproduction}
                  </span>
                )}
                {(effectiveProject as any).duration && String((effectiveProject as any).duration).trim() && (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {(effectiveProject as any).duration}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Description - Prioriza description completa, fallback para summary. Renderiza markdown (##, **, listas) */}
          {(effectiveProject.description || effectiveProject.summary) && (
            <div className="mb-12">
              <div
                className={`prose prose-lg max-w-none leading-relaxed ${
                  theme === 'dark'
                    ? 'prose-invert prose-headings:text-white prose-p:text-white/80 prose-a:text-azimut-red prose-strong:text-white prose-li:text-white/80'
                    : 'prose-slate prose-headings:text-[#0f172a] prose-p:text-black/80 prose-a:text-azimut-red prose-strong:text-[#0f172a] prose-li:text-black/80'
                }`}
              >
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {effectiveProject.description || effectiveProject.summary || ''}
                </ReactMarkdown>
              </div>
            </div>
          )}

          {/* Vídeo principal (só se preenchido no backoffice) */}
          {(effectiveProject as any).videoUrl && String((effectiveProject as any).videoUrl).trim() && (() => {
            const url = (effectiveProject as any).videoUrl
            const yId = getYouTubeId(url)
            const vId = getVimeoId(url)
            const embedUrl = yId ? `https://www.youtube-nocookie.com/embed/${yId}` : vId ? `https://player.vimeo.com/video/${vId}` : null
            if (!embedUrl) return null
            return (
              <section className="mb-12">
                <h2 className="font-handel text-xl md:text-2xl uppercase tracking-[0.12em] mb-4" style={{ color: 'var(--theme-text)' }}>
                  {lang === 'pt' ? 'Vídeo principal' : lang === 'es' ? 'Vídeo principal' : lang === 'fr' ? 'Vidéo principale' : 'Main video'}
                </h2>
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 ring-1 ring-black/10 dark:ring-white/5">
                  <iframe src={embedUrl} title={effectiveProject.title} className="absolute inset-0 w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div>
              </section>
            )
          })()}

          {/* Showreel (só se preenchido) */}
          {(effectiveProject as any).videoShowreel && String((effectiveProject as any).videoShowreel).trim() && (() => {
            const url = (effectiveProject as any).videoShowreel
            const yId = getYouTubeId(url)
            const vId = getVimeoId(url)
            const embedUrl = yId ? `https://www.youtube-nocookie.com/embed/${yId}` : vId ? `https://player.vimeo.com/video/${vId}` : null
            if (!embedUrl) return null
            return (
              <section className="mb-12">
                <h2 className="font-handel text-xl md:text-2xl uppercase tracking-[0.12em] mb-4" style={{ color: 'var(--theme-text)' }}>
                  {lang === 'pt' ? 'Showreel' : lang === 'es' ? 'Showreel' : lang === 'fr' ? 'Showreel' : 'Showreel'}
                </h2>
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 ring-1 ring-black/10 dark:ring-white/5">
                  <iframe src={embedUrl} title={`${effectiveProject.title} - Showreel`} className="absolute inset-0 w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                </div>
              </section>
            )
          })()}

          {/* Prêmios (só se houver itens) */}
          {(effectiveProject as any).awards && Array.isArray((effectiveProject as any).awards) && (effectiveProject as any).awards.length > 0 && (
            <section className="mb-12">
              <h2 className="font-handel text-xl md:text-2xl uppercase tracking-[0.12em] mb-4" style={{ color: 'var(--theme-text)' }}>
                {lang === 'pt' ? 'Prêmios' : lang === 'es' ? 'Premios' : lang === 'fr' ? 'Prix' : 'Awards'}
              </h2>
              <ul className="space-y-3">
                {((effectiveProject as any).awards as Array<{ title?: string; organization?: string; year?: number; category?: string }>).map((a: any, i: number) => (
                  <li key={i} className="flex flex-wrap items-baseline gap-2 text-sm" style={{ color: 'var(--theme-text-secondary)' }}>
                    <span className="font-semibold" style={{ color: 'var(--theme-text)' }}>{a.title}</span>
                    {a.organization && <span>— {a.organization}</span>}
                    {a.year != null && <span>({a.year})</span>}
                    {a.category && <span className="rounded-full border px-2 py-0.5 text-xs">{a.category}</span>}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Métricas de impacto (só se houver dados) */}
          {(effectiveProject as any).metrics && typeof (effectiveProject as any).metrics === 'object' && Object.keys((effectiveProject as any).metrics).length > 0 && (
            <section className="mb-12">
              <h2 className="font-handel text-xl md:text-2xl uppercase tracking-[0.12em] mb-4" style={{ color: 'var(--theme-text)' }}>
                {lang === 'pt' ? 'Métricas de impacto' : lang === 'es' ? 'Métricas de impacto' : lang === 'fr' ? 'Métriques d\'impact' : 'Impact metrics'}
              </h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {Object.entries((effectiveProject as any).metrics as Record<string, unknown>).map(([key, value]) => {
                  if (value == null || value === '') return null
                  const display = typeof value === 'object' ? JSON.stringify(value) : String(value)
                  return (
                    <div key={key} className="rounded-xl border border-white/10 bg-white/5 dark:bg-white/5 px-4 py-3">
                      <span className="block text-xs uppercase tracking-wider opacity-80" style={{ color: 'var(--theme-text-muted)' }}>{key}</span>
                      <span className="font-medium" style={{ color: 'var(--theme-text)' }}>{display}</span>
                    </div>
                  )
                })}
              </div>
            </section>
          )}

          {/* Links externos (só se houver itens) */}
          {(effectiveProject as any).externalLinks && Array.isArray((effectiveProject as any).externalLinks) && (effectiveProject as any).externalLinks.length > 0 && (
            <section className="mb-12">
              <h2 className="font-handel text-xl md:text-2xl uppercase tracking-[0.12em] mb-4" style={{ color: 'var(--theme-text)' }}>
                {lang === 'pt' ? 'Links' : lang === 'es' ? 'Enlaces' : lang === 'fr' ? 'Liens' : 'Links'}
              </h2>
              <div className="flex flex-wrap gap-3">
                {((effectiveProject as any).externalLinks as Array<{ label: string; url: string }>).map((link: any, i: number) => (
                  <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-azimut-red/50 bg-azimut-red/10 px-4 py-2 font-sora text-sm font-medium transition-all hover:bg-azimut-red/20 hover:border-azimut-red/80" style={{ color: 'var(--theme-text)' }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    {link.label}
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Logos de parceiros (só se houver URLs) */}
          {(effectiveProject as any).partnerLogos && Array.isArray((effectiveProject as any).partnerLogos) && (effectiveProject as any).partnerLogos.length > 0 && (
            <section className="mb-12">
              <h2 className="font-handel text-xl md:text-2xl uppercase tracking-[0.12em] mb-4" style={{ color: 'var(--theme-text)' }}>
                {lang === 'pt' ? 'Parceiros' : lang === 'es' ? 'Socios' : lang === 'fr' ? 'Partenaires' : 'Partners'}
              </h2>
              <div className="flex flex-wrap items-center gap-6">
                {((effectiveProject as any).partnerLogos as string[]).map((logoUrl: string, i: number) => (
                  <img key={i} src={logoUrl} alt="" className="h-10 md:h-12 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity" loading="lazy" />
                ))}
              </div>
            </section>
          )}

          {/* Antes / Depois (só se preenchido) */}
          {(effectiveProject as any).beforeAfterImages && typeof (effectiveProject as any).beforeAfterImages === 'object' && ((effectiveProject as any).beforeAfterImages as any).before && ((effectiveProject as any).beforeAfterImages as any).after && (
            (() => {
              const ba = (effectiveProject as any).beforeAfterImages as { before: string; after: string; label?: string }
              return (
                <section className="mb-12">
                  <h2 className="font-handel text-xl md:text-2xl uppercase tracking-[0.12em] mb-4" style={{ color: 'var(--theme-text)' }}>
                    {ba.label && ba.label.trim() ? ba.label : (lang === 'pt' ? 'Antes e depois' : lang === 'es' ? 'Antes y después' : lang === 'fr' ? 'Avant et après' : 'Before & after')}
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl overflow-hidden bg-slate-900 ring-1 ring-black/10 dark:ring-white/5">
                      <img src={ba.before} alt={lang === 'pt' ? 'Antes' : lang === 'es' ? 'Antes' : lang === 'fr' ? 'Avant' : 'Before'} className="w-full h-auto object-contain" loading="lazy" />
                      <p className="text-center py-2 text-sm" style={{ color: 'var(--theme-text-muted)' }}>{lang === 'pt' ? 'Antes' : lang === 'es' ? 'Antes' : lang === 'fr' ? 'Avant' : 'Before'}</p>
                    </div>
                    <div className="rounded-2xl overflow-hidden bg-slate-900 ring-1 ring-black/10 dark:ring-white/5">
                      <img src={ba.after} alt={lang === 'pt' ? 'Depois' : lang === 'es' ? 'Después' : lang === 'fr' ? 'Après' : 'After'} className="w-full h-auto object-contain" loading="lazy" />
                      <p className="text-center py-2 text-sm" style={{ color: 'var(--theme-text-muted)' }}>{lang === 'pt' ? 'Depois' : lang === 'es' ? 'Después' : lang === 'fr' ? 'Après' : 'After'}</p>
                    </div>
                  </div>
                </section>
              )
            })()
          )}

          {/* Galeria universal: todas as imagens e vídeos em sequência (ordem do backoffice), com legenda opcional */}
          {effectiveProject.gallery && effectiveProject.gallery.length > 0 && (
            <section className="mb-14 md:mb-16 pt-2 border-t border-slate-200/80 dark:border-white/10" aria-label={lang === 'pt' ? 'Galeria' : lang === 'es' ? 'Galería' : lang === 'fr' ? 'Galerie' : 'Gallery'}>
              <h2 className="font-handel text-2xl md:text-3xl uppercase tracking-[0.12em] mb-10 md:mb-12" style={{ color: 'var(--theme-text)' }}>
                {lang === 'pt' ? 'Galeria' : lang === 'es' ? 'Galería' : lang === 'fr' ? 'Galerie' : 'Gallery'}
              </h2>
              <div className="space-y-12 md:space-y-16">
                {effectiveProject.gallery.map((media: any, index: number) => {
                  const isVideo = media.type === 'VIDEO'
                  const videoUrl = isVideo ? (media.original || '') : ''
                  const isDirectVideo = isVideo && (videoUrl.includes('.mp4') || videoUrl.includes('.webm'))
                  const youtubeId = isVideo && videoUrl ? (() => {
                    const m = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
                    return m ? m[1] : null
                  })() : null
                  const hasCaption = media.caption && String(media.caption).trim()
                  const fit = media.displayFit || 'contain'
                  const pos = media.displayPosition || 'center'
                  const scale = media.displayScale != null ? media.displayScale : 1
                  const transformOriginMap: Record<string, string> = {
                    'top left': '0% 0%', top: '50% 0%', 'top right': '100% 0%',
                    left: '0% 50%', center: '50% 50%', right: '100% 50%',
                    'bottom left': '0% 100%', bottom: '50% 100%', 'bottom right': '100% 100%',
                  }
                  const transformOrigin = transformOriginMap[pos] || '50% 50%'
                  const imgStyle = {
                    objectFit: fit as 'contain' | 'cover',
                    objectPosition: pos,
                    ...(scale !== 1 && { transform: `scale(${scale})`, transformOrigin }),
                  }
                  return (
                    <figure key={media.id || index} className="space-y-3">
                      <div className="relative aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden bg-slate-900 ring-1 ring-black/10 dark:ring-white/5 shadow-lg">
                        {media.type === 'IMAGE' ? (
                          <img
                            src={media.large || media.medium || media.thumbnail || media.original}
                            alt={media.alt || `${effectiveProject.title} – ${index + 1}`}
                            className="w-full h-full"
                            style={imgStyle}
                            loading="lazy"
                          />
                        ) : isDirectVideo ? (
                          <video
                            src={videoUrl}
                            controls
                            className="w-full h-full bg-black"
                            style={imgStyle}
                            poster={media.thumbnail || undefined}
                          />
                        ) : youtubeId ? (
                          <iframe
                            src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
                            title={media.alt || effectiveProject.title}
                            className="absolute inset-0 w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        ) : (
                          <a href={media.original} target="_blank" rel="noopener noreferrer" className="absolute inset-0 flex items-center justify-center bg-slate-900">
                            {media.thumbnail && <img src={media.thumbnail} alt="" className="w-full h-full object-cover opacity-80" />}
                            <span className="relative w-16 h-16 rounded-full bg-azimut-red/90 flex items-center justify-center">
                              <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                            </span>
                          </a>
                        )}
                      </div>
                      {hasCaption && (
                        <figcaption className="text-sm md:text-base leading-relaxed max-w-4xl mt-2 md:mt-3" style={{ color: 'var(--theme-text-secondary)' }}>
                          {media.caption}
                        </figcaption>
                      )}
                    </figure>
                  )
                })}
              </div>
            </section>
          )}

          {/* Status da Galeria - Apenas para Museu Olímpico */}
          {effectiveProject.slug === 'museu-olimpico-rio' && effectiveProject.gallery && effectiveProject.gallery.length > 0 && (
            <ProjectGalleryStatus gallery={effectiveProject.gallery} lang={lang} />
          )}

          {/* Seções Temáticas - Apenas para Museu Olímpico */}
          {effectiveProject.slug === 'museu-olimpico-rio' && effectiveProject.gallery && effectiveProject.gallery.length > 0 && (
            <div className="mb-12 space-y-8">
              <h2 className="font-handel text-2xl uppercase tracking-[0.12em] mb-6" style={{ color: 'var(--theme-text)' }}>
                {lang === 'pt' ? 'Seções Temáticas' : lang === 'es' ? 'Secciones Temáticas' : lang === 'fr' ? 'Sections Thématiques' : 'Thematic Sections'}
              </h2>

              {/* Seção: Na Mídia */}
              {effectiveProject.gallery.some((m: any) => (m.original || '').toLowerCase().includes('jornal')) && (
                <div className="rounded-2xl border border-white/10 card-adaptive p-6 bg-subtle backdrop-blur">
                  {/* Texto sempre claro pois card-adaptive tem fundo escuro */}
                  <h3 className="mb-4 font-handel text-xl uppercase tracking-[0.12em] text-white">
                    📰 {lang === 'pt' ? 'Na Mídia' : lang === 'es' ? 'En los Medios' : lang === 'fr' ? 'Dans les Médias' : 'In the Media'}
                  </h3>
                  <p className="mb-4 text-slate-300">
                    {lang === 'pt' 
                      ? 'O projeto foi destaque no jornal O Globo, com reconhecimento explícito do papel da Azimut como diretor de Tecnologia-Audiovisual.'
                      : lang === 'es'
                      ? 'El proyecto fue destacado en el periódico O Globo, con reconocimiento explícito del papel de Azimut como director de Tecnología-Audiovisual.'
                      : lang === 'fr'
                      ? 'Le projet a été mis en avant dans le journal O Globo, avec une reconnaissance explicite du rôle d\'Azimut en tant que directeur Technologie-Audiovisuel.'
                      : 'The project was featured in O Globo newspaper, with explicit recognition of Azimut\'s role as Technology-Audiovisual Director.'}
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {effectiveProject.gallery
                      .filter((m: any) => (m.original || '').toLowerCase().includes('jornal'))
                      .map((media: any) => (
                        <div
                          key={media.id}
                          className="group relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 cursor-pointer ring-2 ring-azimut-red/50"
                          onClick={() => window.open(media.large || media.original, '_blank')}
                        >
                          <img
                            src={media.medium || media.thumbnail || media.original}
                            alt={media.alt || `${effectiveProject.title} - Galeria de imagens${media.altPt ? `: ${media.altPt}` : ''} - Azimut`}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            loading="lazy"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Seção: Instalações Interativas */}
              {effectiveProject.gallery.some((m: any) => (m.original || '').toLowerCase().includes('semi-esfera') || (m.original || '').toLowerCase().includes('bicicleta') || (m.original || '').toLowerCase().includes('tela-interativa')) && (
                <div className="rounded-2xl border border-white/10 card-adaptive p-6 bg-subtle backdrop-blur">
                  {/* Texto sempre claro pois card-adaptive tem fundo escuro */}
                  <h3 className="mb-4 font-handel text-xl uppercase tracking-[0.12em] text-white">
                    🎮 {lang === 'pt' ? 'Instalações Interativas' : lang === 'es' ? 'Instalaciones Interactivas' : lang === 'fr' ? 'Installations Interactives' : 'Interactive Installations'}
                  </h3>
                  <p className="mb-4 text-slate-300">
                    {lang === 'pt' 
                      ? 'Tecnologia inovadora desenvolvida pela Azimut: semi-esfera, games interativos, telas interativas e integração perfeita entre cenografia, tecnologia e audiovisual.'
                      : lang === 'es'
                      ? 'Tecnología innovadora desarrollada por Azimut: semi-esfera, juegos interactivos, pantallas interactivas e integración perfecta entre escenografía, tecnología y audiovisual.'
                      : lang === 'fr'
                      ? 'Technologie innovante développée par Azimut: semi-sphère, jeux interactifs, écrans interactifs et intégration parfaite entre scénographie, technologie et audiovisuel.'
                      : 'Innovative technology developed by Azimut: semi-sphere, interactive games, interactive screens and perfect integration between scenography, technology and audiovisual.'}
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {effectiveProject.gallery
                      .filter((m: any) => {
                        const url = (m.original || '').toLowerCase()
                        return url.includes('semi-esfera') || url.includes('bicicleta') || url.includes('tela-interativa') || url.includes('velodromo-exterior')
                      })
                      .map((media: any) => (
                        <div
                          key={media.id}
                          className="group relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 cursor-pointer"
                          onClick={() => window.open(media.large || media.original, '_blank')}
                        >
                          <img
                            src={media.medium || media.thumbnail || media.original}
                            alt={media.alt || `${effectiveProject.title} - Galeria de imagens${media.altPt ? `: ${media.altPt}` : ''} - Azimut`}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            loading="lazy"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Seção: Ginástica Artística */}
              {effectiveProject.gallery.some((m: any) => (m.original || '').toLowerCase().includes('ginastica')) && (
                <div className="rounded-2xl border border-white/10 card-adaptive p-6 bg-subtle backdrop-blur">
                  {/* Texto sempre claro pois card-adaptive tem fundo escuro */}
                  <h3 className="mb-4 font-handel text-xl uppercase tracking-[0.12em] text-white">
                    🤸 {lang === 'pt' ? 'Ginástica Artística' : lang === 'es' ? 'Gimnasia Artística' : lang === 'fr' ? 'Gymnastique Artistique' : 'Artistic Gymnastics'}
                  </h3>
                  <p className="mb-4 text-slate-300">
                    {lang === 'pt' 
                      ? 'Exemplo de curadoria e integração perfeita: 5 áreas temáticas com equipamentos físicos Rio 2016, vídeos de atletas e tecnologia interativa.'
                      : lang === 'es'
                      ? 'Ejemplo de curaduría e integración perfecta: 5 áreas temáticas con equipos físicos Rio 2016, videos de atletas y tecnología interactiva.'
                      : lang === 'fr'
                      ? 'Exemple de curation et intégration parfaite: 5 zones thématiques avec équipements physiques Rio 2016, vidéos d\'athlètes et technologie interactive.'
                      : 'Example of curation and perfect integration: 5 thematic areas with Rio 2016 physical equipment, athlete videos and interactive technology.'}
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {effectiveProject.gallery
                      .filter((m: any) => (m.original || '').toLowerCase().includes('ginastica'))
                      .map((media: any) => (
                        <div
                          key={media.id}
                          className="group relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 cursor-pointer"
                          onClick={() => window.open(media.large || media.original, '_blank')}
                        >
                          <img
                            src={media.medium || media.thumbnail || media.original}
                            alt={media.alt || `${effectiveProject.title} - Galeria de imagens${media.altPt ? `: ${media.altPt}` : ''} - Azimut`}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            loading="lazy"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Link para site oficial - apenas para Museu Olímpico */}
          {effectiveProject.slug === 'museu-olimpico-rio' && (
            <div className="mb-12 rounded-2xl border border-white/10 card-adaptive p-6 bg-white/5 backdrop-blur">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  {/* Texto sempre claro pois card-adaptive tem fundo escuro */}
                  <h3 className="mb-2 font-handel text-xl uppercase tracking-[0.12em] text-white">
                    {lang === 'pt' ? 'Site Oficial do Projeto' : lang === 'es' ? 'Sitio Oficial del Proyecto' : lang === 'fr' ? 'Site Officiel du Projet' : 'Official Project Website'}
                  </h3>
                  <p className="text-sm text-slate-300">
                    {lang === 'pt' 
                      ? 'Visite o site oficial do Museu Olímpico do Rio para conhecer mais sobre este projeto da Prefeitura do Rio de Janeiro.'
                      : lang === 'es'
                      ? 'Visite el sitio oficial del Museo Olímpico de Río para conocer más sobre este proyecto de la Prefectura de Río de Janeiro.'
                      : lang === 'fr'
                      ? 'Visitez le site officiel du Musée Olympique de Rio pour en savoir plus sur ce projet de la Mairie de Rio de Janeiro.'
                      : 'Visit the official Rio Olympic Museum website to learn more about this City of Rio de Janeiro project.'}
                  </p>
                </div>
                <a
                  href="https://museuolimpico.rio/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackInteraction('external_link', 'museu_olimpico_site')}
                  className="inline-flex items-center gap-2 rounded-lg border border-azimut-red/50 bg-azimut-red/10 px-6 py-3 font-sora text-sm font-medium uppercase tracking-[0.1em] transition-all hover:bg-azimut-red/20 hover:border-azimut-red/80 whitespace-nowrap text-white"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  {lang === 'pt' ? 'Visitar Site' : lang === 'es' ? 'Visitar Sitio' : lang === 'fr' ? 'Visiter le Site' : 'Visit Website'}
                </a>
              </div>
            </div>
          )}

          {/* Gallery com Filtros e Curadoria - Apenas para Museu Olímpico */}
          {effectiveProject.gallery && effectiveProject.gallery.length > 0 && (
            <div className="mb-12">
              <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h2 className="font-handel text-2xl uppercase tracking-[0.12em]" style={{ color: 'var(--theme-text)' }}>
                  {lang === 'pt' ? 'Galeria' : lang === 'es' ? 'Galería' : lang === 'fr' ? 'Galerie' : 'Gallery'}
                </h2>
                
                {/* Filtros - Apenas para Museu Olímpico */}
                {effectiveProject.slug === 'museu-olimpico-rio' && (
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => {
                        setShowTier1Only(!showTier1Only)
                        setSelectedCategory(null)
                        trackInteraction('filter_click', 'tier1_only')
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        showTier1Only
                          ? 'bg-azimut-red text-white'
                          : 'bg-subtle-md hover:bg-subtle-strong'
                      }`}
                      style={!showTier1Only ? { color: 'var(--theme-text-secondary)' } : undefined}
                    >
                      ⭐ {lang === 'pt' ? 'Destaques' : lang === 'es' ? 'Destacados' : lang === 'fr' ? 'En vedette' : 'Highlights'}
                    </button>
                    {['jornal', 'instalacoes', 'ginastica', 'eventos', 'making-of'].map((cat) => {
                      const labels: Record<string, Record<Lang, string>> = {
                        jornal: { pt: 'Jornal', en: 'Press', es: 'Prensa', fr: 'Presse' },
                        instalacoes: { pt: 'Instalações', en: 'Installations', es: 'Instalaciones', fr: 'Installations' },
                        ginastica: { pt: 'Ginástica', en: 'Gymnastics', es: 'Gimnasia', fr: 'Gymnastique' },
                        eventos: { pt: 'Eventos', en: 'Events', es: 'Eventos', fr: 'Événements' },
                        'making-of': { pt: 'Making-of', en: 'Making-of', es: 'Making-of', fr: 'Making-of' }
                      }
                      return (
                        <button
                          key={cat}
                          onClick={() => {
                            setSelectedCategory(selectedCategory === cat ? null : cat)
                            setShowTier1Only(false)
                            trackInteraction('filter_click', `category_${cat}`)
                          }}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            selectedCategory === cat
                              ? 'bg-azimut-red text-white'
                              : 'bg-subtle-md hover:bg-subtle-strong'
                          }`}
                          style={selectedCategory !== cat ? { color: 'var(--theme-text-secondary)' } : undefined}
                        >
                          {labels[cat]?.[lang] || cat}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>

              {/* Galeria Filtrada */}
              {(() => {
                let filteredGallery = effectiveProject.gallery
                
                // Filtrar por categoria (baseado no nome do arquivo ou alt text)
                if (selectedCategory) {
                  filteredGallery = effectiveProject.gallery.filter((media: any) => {
                    const alt = (media.alt || '').toLowerCase()
                    const url = (media.original || '').toLowerCase()
                    return alt.includes(selectedCategory) || url.includes(selectedCategory)
                  })
                }
                
                // Filtrar apenas TIER 1 (arquivos específicos)
                if (showTier1Only) {
                  const tier1Files = [
                    'jornal-o-globo-capa',
                    'velodromo-exterior',
                    'semi-esfera-verde',
                    'bicicleta-interativa',
                    'tela-interativa-mapa'
                  ]
                  filteredGallery = effectiveProject.gallery.filter((media: any) => {
                    const url = (media.original || '').toLowerCase()
                    return tier1Files.some(file => url.includes(file))
                  })
                }

                if (filteredGallery.length === 0) {
                  return (
                    <div className="text-center py-12 text-slate-600 dark:text-slate-400">
                      {lang === 'pt' 
                        ? 'Nenhuma imagem encontrada com os filtros selecionados.'
                        : lang === 'es'
                        ? 'No se encontraron imágenes con los filtros seleccionados.'
                        : lang === 'fr'
                        ? 'Aucune image trouvée avec les filtres sélectionnés.'
                        : 'No images found with selected filters.'}
                    </div>
                  )
                }

                return (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredGallery.map((media: any, index: number) => {
                      const isTier1 = effectiveProject.slug === 'museu-olimpico-rio' && [
                        'jornal-o-globo-capa',
                        'velodromo-exterior',
                        'semi-esfera-verde',
                        'bicicleta-interativa',
                        'tela-interativa-mapa'
                      ].some(file => (media.original || '').toLowerCase().includes(file))
                      const isVideo = media.type === 'VIDEO'
                      const videoUrl = isVideo ? (media.original || '') : ''
                      const isDirectVideo = isVideo && (videoUrl.includes('.mp4') || videoUrl.includes('.webm'))
                      const youtubeId = isVideo && videoUrl ? (() => {
                        const m = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
                        return m ? m[1] : null
                      })() : null

                      return (
                        <figure key={media.id} className="space-y-2">
                          <div
                            className={`group relative aspect-video rounded-xl overflow-hidden bg-slate-900 transition-all ${
                              isTier1 ? 'ring-2 ring-azimut-red/50 shadow-lg shadow-azimut-red/20' : ''
                            } ${!isVideo ? 'cursor-pointer' : ''}`}
                            onClick={() => {
                              if (!isVideo) {
                                trackInteraction('gallery_image_click', media.id)
                                window.open(media.large || media.original, '_blank')
                              }
                            }}
                          >
                            {media.type === 'IMAGE' ? (
                              <img
                                src={media.medium || media.thumbnail || media.original}
                                alt={media.alt || `${effectiveProject.title} - ${index + 1}`}
                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                loading="lazy"
                              />
                            ) : isDirectVideo ? (
                              <video
                                src={videoUrl}
                                controls
                                className="absolute inset-0 h-full w-full object-contain bg-black"
                                poster={media.thumbnail || undefined}
                                onClick={(e) => e.stopPropagation()}
                              />
                            ) : youtubeId ? (
                              <div
                                className="absolute inset-0 flex items-center justify-center bg-black cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  window.open(`https://www.youtube.com/watch?v=${youtubeId}`, '_blank')
                                }}
                              >
                                <img
                                  src={media.thumbnail || `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
                                  alt=""
                                  className="absolute inset-0 h-full w-full object-cover opacity-80"
                                />
                                <div className="relative w-16 h-16 rounded-full bg-azimut-red/90 flex items-center justify-center">
                                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </div>
                              </div>
                            ) : (
                              <a
                                href={media.original}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="absolute inset-0 flex items-center justify-center bg-slate-900"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <img src={media.thumbnail || media.original} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
                                <span className="relative w-14 h-14 rounded-full bg-azimut-red/90 flex items-center justify-center">
                                  <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                  </svg>
                                </span>
                              </a>
                            )}
                            {isTier1 && (
                              <div className="absolute top-2 right-2 bg-azimut-red text-white px-2 py-1 rounded text-xs font-bold">
                                ⭐
                              </div>
                            )}
                            {!isVideo && media.alt && (
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-sm">
                                  {media.alt}
                                </div>
                              </div>
                            )}
                          </div>
                          {media.caption && media.caption.trim() && (
                            <figcaption className="text-sm leading-relaxed px-1" style={{ color: 'var(--theme-text-secondary)' }}>
                              {media.caption}
                            </figcaption>
                          )}
                        </figure>
                      )
                    })}
                  </div>
                )
              })()}
            </div>
          )}

          {/* Services */}
          {effectiveProject.services && effectiveProject.services.length > 0 && (
            <div className="mb-12">
              <h2 className={`mb-4 font-handel text-2xl uppercase tracking-[0.12em] ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {lang === 'pt' ? 'Serviços' : lang === 'es' ? 'Servicios' : lang === 'fr' ? 'Services' : 'Services'}
              </h2>
              <div className="flex flex-wrap gap-2">
                {effectiveProject.services.map((service: any) => (
                  <span 
                    key={service.slug}
                    className="rounded-lg border border-white/10 bg-subtle px-4 py-2 text-sm"
                    style={{ color: 'var(--theme-text-secondary)' }}
                  >
                    {service.title}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Related Projects */}
          {relatedProjects.length > 0 && (
            <div className="mb-12">
              <h2 className="mb-6 font-handel text-2xl uppercase tracking-[0.12em]" style={{ color: 'var(--theme-text)' }}>
                {lang === 'pt' ? 'Projetos Relacionados' : lang === 'es' ? 'Proyectos Relacionados' : lang === 'fr' ? 'Projets connexes' : 'Related Projects'}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedProjects.map((related: any) => (
                  <article
                    key={related.slug}
                    className="group rounded-2xl border border-white/10 card-adaptive overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur transition-all duration-300 hover:scale-[1.02] hover:border-azimut-red/50 hover:shadow-[0_24px_60px_rgba(var(--theme-accent-red-rgb),0.3)] cursor-pointer"
                    onClick={() => navigate(`/${lang}/work/${related.slug}`)}
                  >
                    {related.heroImage?.medium || related.heroImage?.large ? (
                      <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
                        <img
                          src={related.heroImage.large || related.heroImage.medium}
                          alt={related.heroImage.alt || `${related.title}${related.summary ? ` - ${related.summary.substring(0, 80)}` : ''}${related.year ? ` (${related.year})` : ''} - Projeto relacionado - Azimut`}
                          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none"></div>
                      </div>
                    ) : null}
                    <div className="p-4">
                      <h3 className={`mb-2 font-sora text-[1.05rem] group-hover:text-azimut-red transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        {related.title}
                      </h3>
                      {related.summary && (
                        <p className="text-sm leading-relaxed line-clamp-2 mb-2" style={{ color: 'var(--theme-text-secondary)' }}>
                          {related.summary}
                        </p>
                      )}
                      {related.year && (
                        <span className="text-xs text-slate-800 dark:text-slate-500">{related.year}</span>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="rounded-3xl border border-azimut-red/50 bg-gradient-to-br from-azimut-red/10 to-transparent p-8 md:p-12 text-center">
            <h2 className="mb-4 font-handel text-3xl uppercase tracking-[0.12em]" style={{ color: 'var(--theme-text)' }}>
              {lang === 'pt' 
                ? 'Quer um projeto similar?'
                : lang === 'es'
                ? '¿Quieres un proyecto similar?'
                : lang === 'fr'
                ? 'Vous voulez un projet similaire?'
                : 'Want a similar project?'}
            </h2>
            <p className="mb-6 text-lg max-w-2xl mx-auto" style={{ color: 'var(--theme-text-secondary)' }}>
              {lang === 'pt' 
                ? 'Vamos conversar sobre como podemos criar uma experiência imersiva para seu projeto.'
                : lang === 'es'
                ? 'Hablemos sobre cómo podemos crear una experiencia inmersiva para tu proyecto.'
                : lang === 'fr'
                ? 'Parlons de la façon dont nous pouvons créer une expérience immersive pour votre projet.'
                : 'Let\'s talk about how we can create an immersive experience for your project.'}
            </p>
            <Link
              to={`/${lang}/contact`}
              onClick={() => trackInteraction('cta_click', 'project_detail_cta')}
              className="inline-flex items-center gap-2 rounded-lg border border-azimut-red/80 bg-azimut-red px-6 py-3 font-sora text-sm font-semibold uppercase tracking-[0.1em] text-white hover:bg-azimut-red/90 transition-all"
            >
              {lang === 'pt' ? 'Iniciar um Projeto' : lang === 'es' ? 'Iniciar un Proyecto' : lang === 'fr' ? 'Commencer un projet' : 'Start a Project'}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default ProjectDetail

