import React, { useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
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

interface ProjectDetailProps {
  lang: Lang
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ lang }) => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  // REMOVIDO: useUserTracking já é chamado no Layout.tsx
  // const { trackInteraction } = useUserTracking()
  const trackInteraction = (type: string, target: string) => {} // Dummy
  const starRef = useRef<HTMLDivElement>(null)
  
  const { project, loading, error } = useProject(slug || '', lang)
  const { content: cmsContent } = useAzimutContent({ page: 'work' })
  const allProjects = cmsContent?.highlightProjects || []
  
  // Estados para filtros da galeria (apenas Museu Olímpico)
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null)
  const [showTier1Only, setShowTier1Only] = React.useState(false)
  
  // Projetos relacionados (mesmo tipo ou tags similares, excluindo o atual)
  const relatedProjects = React.useMemo(() => {
    if (!project || allProjects.length === 0) return []
    
    return allProjects
      .filter((p: any) => p.slug !== project.slug)
      .filter((p: any) => {
        // Mesmo tipo ou tags em comum
        const hasSameType = project.type && p.type === project.type
        const hasCommonTags = project.tags?.some((tag: string) => p.tags?.includes(tag))
        return hasSameType || hasCommonTags
      })
      .slice(0, 3) // Máximo 3 relacionados
  }, [project, allProjects])
  
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

  // Loading state
  if (loading) {
    return (
      <main className="relative py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-slate-800 rounded w-1/3"></div>
            <div className="h-64 bg-slate-800 rounded"></div>
            <div className="h-32 bg-slate-800 rounded"></div>
          </div>
        </div>
      </main>
    )
  }

  // Error state
  if (error || !project) {
    return (
      <main className="relative py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h1 className="mb-4 font-handel text-4xl uppercase tracking-[0.16em] text-white">
            {lang === 'pt' ? 'Projeto não encontrado' : lang === 'es' ? 'Proyecto no encontrado' : lang === 'fr' ? 'Projet non trouvé' : 'Project not found'}
          </h1>
          <p className="mb-8 text-slate-600 dark:text-slate-400">
            {lang === 'pt' 
              ? 'O projeto que você está procurando não existe ou foi removido.'
              : lang === 'es'
              ? 'El proyecto que buscas no existe o ha sido eliminado.'
              : lang === 'fr'
              ? 'Le projet que vous recherchez n\'existe pas ou a été supprimé.'
              : 'The project you are looking for does not exist or has been removed.'}
          </p>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 rounded-lg border border-azimut-red/50 bg-azimut-red/10 px-5 py-2.5 font-sora text-sm font-semibold uppercase tracking-[0.1em] text-slate-900 dark:text-white hover:bg-azimut-red/20 transition-all"
          >
            {lang === 'pt' ? 'Voltar para Projetos' : lang === 'es' ? 'Volver a Proyectos' : lang === 'fr' ? 'Retour aux projets' : 'Back to Projects'}
          </Link>
        </div>
      </main>
    )
  }

  const seoTitle = `${project.title} | ${seoData.work[lang].title}`
  const seoDescription = project.description || project.summary || seoData.work[lang].description

  // Detectar se tem vídeo no heroImage
  const hasVideo = project.heroImage?.original && (
    project.heroImage.original.includes('youtube.com') || 
    project.heroImage.original.includes('youtu.be') ||
    project.heroImage.original.includes('.mp4') ||
    project.heroImage.original.includes('.webm')
  )

  // Extrair ID do YouTube se for vídeo do YouTube
  const getYouTubeId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/)
    return match ? match[1] : null
  }

  const youtubeId = project.heroImage?.original ? getYouTubeId(project.heroImage.original) : null
  const videoEmbedUrl = youtubeId ? `https://www.youtube.com/embed/${youtubeId}` : undefined
  const videoContentUrl = project.heroImage?.original?.includes('youtube.com') || project.heroImage?.original?.includes('youtu.be') 
    ? undefined 
    : project.heroImage?.original

  return (
    <>
      <SEO
        lang={lang}
        title={seoTitle}
        description={seoDescription}
        path={`/${lang}/work/${project.slug}`}
        image={project.heroImage?.large || project.heroImage?.original}
      />
      
      {/* Schema.org: Project/CreativeWork */}
      <ProjectSchema
        name={project.title}
        description={seoDescription}
        image={project.heroImage?.large || project.heroImage?.original || 'https://azmt.com.br/og-image.png'}
        dateCreated={project.year ? `${project.year}-01-01` : new Date().toISOString().split('T')[0]}
        creator="Azimut"
        client={project.client}
        category={project.tags?.[0]}
        url={`/${lang}/work/${project.slug}`}
        lang={lang}
      />

      {/* Schema.org: VideoObject (se tiver vídeo) */}
      {hasVideo && project.heroImage && (
        <VideoObjectSchema
          name={project.title}
          description={seoDescription}
          thumbnailUrl={project.heroImage.thumbnail || project.heroImage.original}
          uploadDate={project.year ? `${project.year}-01-01` : new Date().toISOString().split('T')[0]}
          contentUrl={videoContentUrl}
          embedUrl={videoEmbedUrl}
          lang={lang}
        />
      )}

      {/* Schema.org: Review/Rating (avaliação genérica para projetos premiados) */}
      {project.tags?.some(tag => tag.toLowerCase().includes('premiado') || tag.toLowerCase().includes('award')) && (
        <ReviewRatingSchema
          itemName={project.title}
          itemType="CreativeWork"
          ratingValue={4.8}
          bestRating={5}
          worstRating={1}
          reviewCount={1}
          reviews={[{
            author: 'Azimut',
            datePublished: project.year ? `${project.year}-01-01` : new Date().toISOString().split('T')[0],
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

        <div className="mx-auto max-w-6xl px-6">
          {/* Breadcrumbs Visuais Premium */}
          <div className="mb-8">
            <Breadcrumbs 
              lang={lang}
              items={[
                { name: lang === 'pt' ? 'Início' : lang === 'es' ? 'Inicio' : lang === 'fr' ? 'Accueil' : 'Home', url: `/${lang === 'pt' ? '' : lang}` },
                { name: lang === 'pt' ? 'Projetos' : lang === 'es' ? 'Proyectos' : lang === 'fr' ? 'Projets' : 'Work', url: `/${lang === 'pt' ? '' : lang}/work` },
                { name: project.title, url: `/${lang === 'pt' ? '' : lang}/work/${project.slug}` }
              ]}
            />
          </div>

          {/* Hero Section */}
          <div className="mb-12">
            <div className="relative aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 mb-8">
              {project.heroImage?.large || project.heroImage?.original ? (
                <img
                  src={project.heroImage.large || project.heroImage.original}
                  alt={project.heroImage.alt || `${project.title}${project.summary ? ` - ${project.summary.substring(0, 100)}` : ''}${project.year ? ` (${project.year})` : ''} - Azimut`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-20 h-20 text-slate-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm text-slate-800 dark:text-slate-500 uppercase tracking-wider">
                      {lang === 'pt' ? 'Sem imagem' : lang === 'es' ? 'Sin imagen' : lang === 'fr' ? 'Sans image' : 'No image'}
                    </p>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
            </div>

            {/* Title and Meta */}
            <div className="mb-6">
              <h1 className="mb-4 font-handel text-4xl md:text-5xl lg:text-6xl uppercase tracking-[0.12em] text-white dark:text-white" style={{ color: 'var(--theme-text)' }}>
                {project.title}
              </h1>
              
              {/* Tags */}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag: string, idx: number) => (
                    <span 
                      key={idx} 
                      className="pill-adaptive rounded-full border px-3 py-1 font-sora text-[0.68rem] uppercase tracking-[0.18em]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
                {project.year && (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {project.year}
                  </span>
                )}
                {(project.city || project.country) && (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {project.slug === 'museu-olimpico-rio' 
                      ? lang === 'pt' 
                        ? 'Velódromo, Parque Olímpico, Barra da Tijuca, Rio de Janeiro'
                        : lang === 'es'
                        ? 'Velódromo, Parque Olímpico, Barra da Tijuca, Río de Janeiro'
                        : lang === 'fr'
                        ? 'Vélodrome, Parc Olympique, Barra da Tijuca, Rio de Janeiro'
                        : 'Velodrome, Olympic Park, Barra da Tijuca, Rio de Janeiro'
                      : [project.city, project.country].filter(Boolean).join(', ')}
                  </span>
                )}
                {project.slug === 'museu-olimpico-rio' && (
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
                {project.type && (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {project.type}
                  </span>
                )}
                {project.client && (
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {project.client}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Description - Prioriza description completa, fallback para summary */}
          {(project.description || project.summary) && (
            <div className="mb-12">
              <div className="prose prose-invert max-w-none">
                <div 
                  className="text-lg leading-relaxed"
                  style={{ color: 'var(--theme-text-secondary)' }}
                  dangerouslySetInnerHTML={{ 
                    __html: project.description 
                      ? project.description.replace(/\n/g, '<br />')
                      : (project.summary || '').replace(/\n/g, '<br />')
                  }}
                />
              </div>
            </div>
          )}

          {/* Status da Galeria - Apenas para Museu Olímpico */}
          {project.slug === 'museu-olimpico-rio' && project.gallery && project.gallery.length > 0 && (
            <ProjectGalleryStatus gallery={project.gallery} lang={lang} />
          )}

          {/* Seções Temáticas - Apenas para Museu Olímpico */}
          {project.slug === 'museu-olimpico-rio' && project.gallery && project.gallery.length > 0 && (
            <div className="mb-12 space-y-8">
              <h2 className="font-handel text-2xl uppercase tracking-[0.12em] mb-6" style={{ color: 'var(--theme-text)' }}>
                {lang === 'pt' ? 'Seções Temáticas' : lang === 'es' ? 'Secciones Temáticas' : lang === 'fr' ? 'Sections Thématiques' : 'Thematic Sections'}
              </h2>

              {/* Seção: Na Mídia */}
              {project.gallery.some((m: any) => (m.original || '').toLowerCase().includes('jornal')) && (
                <div className="rounded-2xl border border-white/10 card-adaptive p-6 bg-subtle backdrop-blur">
                  <h3 className="mb-4 font-handel text-xl uppercase tracking-[0.12em] text-white">
                    📰 {lang === 'pt' ? 'Na Mídia' : lang === 'es' ? 'En los Medios' : lang === 'fr' ? 'Dans les Médias' : 'In the Media'}
                  </h3>
                  <p className="mb-4" style={{ color: 'var(--theme-card-text, #d3cec3)' }}>
                    {lang === 'pt' 
                      ? 'O projeto foi destaque no jornal O Globo, com reconhecimento explícito do papel da Azimut como diretor de Tecnologia-Audiovisual.'
                      : lang === 'es'
                      ? 'El proyecto fue destacado en el periódico O Globo, con reconocimiento explícito del papel de Azimut como director de Tecnología-Audiovisual.'
                      : lang === 'fr'
                      ? 'Le projet a été mis en avant dans le journal O Globo, avec une reconnaissance explicite du rôle d\'Azimut en tant que directeur Technologie-Audiovisuel.'
                      : 'The project was featured in O Globo newspaper, with explicit recognition of Azimut\'s role as Technology-Audiovisual Director.'}
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    {project.gallery
                      .filter((m: any) => (m.original || '').toLowerCase().includes('jornal'))
                      .map((media: any) => (
                        <div
                          key={media.id}
                          className="group relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 cursor-pointer ring-2 ring-azimut-red/50"
                          onClick={() => window.open(media.large || media.original, '_blank')}
                        >
                          <img
                            src={media.medium || media.thumbnail || media.original}
                            alt={media.alt || `${project.title} - Galeria de imagens${media.altPt ? `: ${media.altPt}` : ''} - Azimut`}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            loading="lazy"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Seção: Instalações Interativas */}
              {project.gallery.some((m: any) => (m.original || '').toLowerCase().includes('semi-esfera') || (m.original || '').toLowerCase().includes('bicicleta') || (m.original || '').toLowerCase().includes('tela-interativa')) && (
                <div className="rounded-2xl border border-white/10 card-adaptive p-6 bg-subtle backdrop-blur">
                  <h3 className="mb-4 font-handel text-xl uppercase tracking-[0.12em] text-white">
                    🎮 {lang === 'pt' ? 'Instalações Interativas' : lang === 'es' ? 'Instalaciones Interactivas' : lang === 'fr' ? 'Installations Interactives' : 'Interactive Installations'}
                  </h3>
                  <p className="mb-4" style={{ color: 'var(--theme-card-text, #d3cec3)' }}>
                    {lang === 'pt' 
                      ? 'Tecnologia inovadora desenvolvida pela Azimut: semi-esfera, games interativos, telas interativas e integração perfeita entre cenografia, tecnologia e audiovisual.'
                      : lang === 'es'
                      ? 'Tecnología innovadora desarrollada por Azimut: semi-esfera, juegos interactivos, pantallas interactivas e integración perfecta entre escenografía, tecnología y audiovisual.'
                      : lang === 'fr'
                      ? 'Technologie innovante développée par Azimut: semi-sphère, jeux interactifs, écrans interactifs et intégration parfaite entre scénographie, technologie et audiovisuel.'
                      : 'Innovative technology developed by Azimut: semi-sphere, interactive games, interactive screens and perfect integration between scenography, technology and audiovisual.'}
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {project.gallery
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
                            alt={media.alt || `${project.title} - Galeria de imagens${media.altPt ? `: ${media.altPt}` : ''} - Azimut`}
                            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                            loading="lazy"
                          />
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {/* Seção: Ginástica Artística */}
              {project.gallery.some((m: any) => (m.original || '').toLowerCase().includes('ginastica')) && (
                <div className="rounded-2xl border border-white/10 card-adaptive p-6 bg-subtle backdrop-blur">
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
                    {project.gallery
                      .filter((m: any) => (m.original || '').toLowerCase().includes('ginastica'))
                      .map((media: any) => (
                        <div
                          key={media.id}
                          className="group relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 cursor-pointer"
                          onClick={() => window.open(media.large || media.original, '_blank')}
                        >
                          <img
                            src={media.medium || media.thumbnail || media.original}
                            alt={media.alt || `${project.title} - Galeria de imagens${media.altPt ? `: ${media.altPt}` : ''} - Azimut`}
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
          {project.slug === 'museu-olimpico-rio' && (
            <div className="mb-12 rounded-2xl border border-white/10 card-adaptive p-6 bg-white/5 backdrop-blur">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
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
                  className="inline-flex items-center gap-2 rounded-lg border border-azimut-red/50 bg-azimut-red/10 px-6 py-3 font-sora text-sm font-medium uppercase tracking-[0.1em] text-white transition-all hover:bg-azimut-red/20 hover:border-azimut-red/80 whitespace-nowrap"
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
          {project.gallery && project.gallery.length > 0 && (
            <div className="mb-12">
              <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <h2 className="font-handel text-2xl uppercase tracking-[0.12em]" style={{ color: 'var(--theme-text)' }}>
                  {lang === 'pt' ? 'Galeria' : lang === 'es' ? 'Galería' : lang === 'fr' ? 'Galerie' : 'Gallery'}
                </h2>
                
                {/* Filtros - Apenas para Museu Olímpico */}
                {project.slug === 'museu-olimpico-rio' && (
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
                let filteredGallery = project.gallery
                
                // Filtrar por categoria (baseado no nome do arquivo ou alt text)
                if (selectedCategory) {
                  filteredGallery = project.gallery.filter((media: any) => {
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
                  filteredGallery = project.gallery.filter((media: any) => {
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
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredGallery.map((media: any, index: number) => {
                      // Verificar se é TIER 1 para destacar
                      const isTier1 = [
                        'jornal-o-globo-capa',
                        'velodromo-exterior',
                        'semi-esfera-verde',
                        'bicicleta-interativa',
                        'tela-interativa-mapa'
                      ].some(file => (media.original || '').toLowerCase().includes(file))
                      
                      return (
                        <div
                          key={media.id}
                          className={`group relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 cursor-pointer transition-all ${
                            isTier1 ? 'ring-2 ring-azimut-red/50 shadow-lg shadow-azimut-red/20' : ''
                          }`}
                          onClick={() => {
                            trackInteraction('gallery_image_click', media.id)
                            window.open(media.large || media.original, '_blank')
                          }}
                        >
                          {media.type === 'IMAGE' ? (
                            <img
                              src={media.medium || media.thumbnail || media.original}
                              alt={media.alt || `${project.title} - Galeria de imagens${media.altPt ? `: ${media.altPt}` : ''} - Azimut`}
                              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                              loading="lazy"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                              <svg className="w-16 h-16 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                          )}
                          {isTier1 && (
                            <div className="absolute top-2 right-2 bg-azimut-red text-white px-2 py-1 rounded text-xs font-bold">
                              ⭐
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {media.alt && (
                              <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-sm">
                                {media.alt}
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )
              })()}
            </div>
          )}

          {/* Services */}
          {project.services && project.services.length > 0 && (
            <div className="mb-12">
              <h2 className="mb-4 font-handel text-2xl uppercase tracking-[0.12em] text-white">
                {lang === 'pt' ? 'Serviços' : lang === 'es' ? 'Servicios' : lang === 'fr' ? 'Services' : 'Services'}
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.services.map((service: any) => (
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
                      <h3 className="mb-2 font-sora text-[1.05rem] text-white group-hover:text-azimut-red transition-colors duration-300">
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

