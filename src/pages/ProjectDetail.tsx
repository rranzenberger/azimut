import React, { useEffect, useRef } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { type Lang } from '../i18n'
import SEO, { seoData } from '../components/SEO'
import { useUserTracking } from '../hooks/useUserTracking'
import { trackPageView } from '../utils/analytics'
import { useProject } from '../hooks/useProject'
import { useAzimutContent } from '../hooks/useAzimutContent'

interface ProjectDetailProps {
  lang: Lang
}

const ProjectDetail: React.FC<ProjectDetailProps> = ({ lang }) => {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const { trackInteraction } = useUserTracking()
  const starRef = useRef<HTMLDivElement>(null)
  
  const { project, loading, error } = useProject(slug || '', lang)
  const { content: cmsContent } = useAzimutContent({ page: 'work' })
  const allProjects = cmsContent?.highlightProjects || []
  
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
          <p className="mb-8 text-slate-400">
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

  return (
    <>
      <SEO
        lang={lang}
        title={seoTitle}
        description={seoDescription}
        path={`/work/${project.slug}`}
        image={project.heroImage?.large || project.heroImage?.original}
      />
      <main className="relative py-16 md:py-20">
        {/* Star background - Parallax */}
        <div 
          ref={starRef}
          className="pointer-events-none fixed top-20 -right-28 h-[520px] w-[520px] md:top-32 md:-right-40 md:h-[680px] md:w-[680px] transition-transform duration-75 ease-out" 
          style={{ 
            opacity: 0.3,
            zIndex: -5,
            willChange: 'transform'
          }}
        >
          <img src="/logo-azimut-star.svg" alt="" className="h-full w-full object-contain" />
        </div>

        <div className="mx-auto max-w-6xl px-6">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm" aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-slate-400">
              <li>
                <Link to="/" className="hover:text-white transition-colors">
                  {lang === 'pt' ? 'Início' : lang === 'es' ? 'Inicio' : lang === 'fr' ? 'Accueil' : 'Home'}
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link to="/work" className="hover:text-white transition-colors">
                  {lang === 'pt' ? 'Projetos' : lang === 'es' ? 'Proyectos' : lang === 'fr' ? 'Projets' : 'Work'}
                </Link>
              </li>
              <li>/</li>
              <li className="text-white">{project.title}</li>
            </ol>
          </nav>

          {/* Hero Section */}
          <div className="mb-12">
            <div className="relative aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 mb-8">
              {project.heroImage?.large || project.heroImage?.original ? (
                <img
                  src={project.heroImage.large || project.heroImage.original}
                  alt={project.heroImage.alt || project.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <svg className="w-20 h-20 text-slate-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-sm text-slate-500 uppercase tracking-wider">
                      {lang === 'pt' ? 'Sem imagem' : lang === 'es' ? 'Sin imagen' : lang === 'fr' ? 'Sans image' : 'No image'}
                    </p>
                  </div>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
            </div>

            {/* Title and Meta */}
            <div className="mb-6">
              <h1 className="mb-4 font-handel text-4xl md:text-5xl lg:text-6xl uppercase tracking-[0.12em] text-white">
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
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400">
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
                    {[project.city, project.country].filter(Boolean).join(', ')}
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
                  className="text-lg leading-relaxed text-slate-300"
                  dangerouslySetInnerHTML={{ 
                    __html: project.description 
                      ? project.description.replace(/\n/g, '<br />')
                      : (project.summary || '').replace(/\n/g, '<br />')
                  }}
                />
              </div>
            </div>
          )}

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="mb-12">
              <h2 className="mb-6 font-handel text-2xl uppercase tracking-[0.12em] text-white">
                {lang === 'pt' ? 'Galeria' : lang === 'es' ? 'Galería' : lang === 'fr' ? 'Galerie' : 'Gallery'}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {project.gallery.map((media: any) => (
                  <div
                    key={media.id}
                    className="group relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 cursor-pointer"
                    onClick={() => {
                      // TODO: Abrir lightbox (implementar depois se necessário)
                      window.open(media.large || media.original, '_blank')
                    }}
                  >
                    {media.type === 'IMAGE' ? (
                      <img
                        src={media.medium || media.thumbnail || media.original}
                        alt={media.alt || project.title}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ))}
              </div>
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
                    className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300"
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
              <h2 className="mb-6 font-handel text-2xl uppercase tracking-[0.12em] text-white">
                {lang === 'pt' ? 'Projetos Relacionados' : lang === 'es' ? 'Proyectos Relacionados' : lang === 'fr' ? 'Projets connexes' : 'Related Projects'}
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedProjects.map((related: any) => (
                  <article
                    key={related.slug}
                    className="group rounded-2xl border border-white/10 card-adaptive overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur transition-all duration-300 hover:scale-[1.02] hover:border-azimut-red/50 hover:shadow-[0_24px_60px_rgba(var(--theme-accent-red-rgb),0.3)] cursor-pointer"
                    onClick={() => navigate(`/work/${related.slug}`)}
                  >
                    {related.heroImage?.medium || related.heroImage?.large ? (
                      <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
                        <img
                          src={related.heroImage.large || related.heroImage.medium}
                          alt={related.heroImage.alt || related.title}
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
                        <p className="text-sm leading-relaxed text-slate-300 line-clamp-2 mb-2">
                          {related.summary}
                        </p>
                      )}
                      {related.year && (
                        <span className="text-xs text-slate-500">{related.year}</span>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="rounded-3xl border border-azimut-red/50 bg-gradient-to-br from-azimut-red/10 to-transparent p-8 md:p-12 text-center">
            <h2 className="mb-4 font-handel text-3xl uppercase tracking-[0.12em] text-white">
              {lang === 'pt' 
                ? 'Quer um projeto similar?'
                : lang === 'es'
                ? '¿Quieres un proyecto similar?'
                : lang === 'fr'
                ? 'Vous voulez un projet similaire?'
                : 'Want a similar project?'}
            </h2>
            <p className="mb-6 text-lg text-slate-300 max-w-2xl mx-auto">
              {lang === 'pt' 
                ? 'Vamos conversar sobre como podemos criar uma experiência imersiva para seu projeto.'
                : lang === 'es'
                ? 'Hablemos sobre cómo podemos crear una experiencia inmersiva para tu proyecto.'
                : lang === 'fr'
                ? 'Parlons de la façon dont nous pouvons créer une expérience immersive pour votre projet.'
                : 'Let\'s talk about how we can create an immersive experience for your project.'}
            </p>
            <Link
              to="/contact"
              onClick={() => trackInteraction('cta_click', 'project_detail_cta')}
              className="inline-flex items-center gap-2 rounded-lg border border-azimut-red/80 bg-azimut-red px-6 py-3 font-sora text-sm font-semibold uppercase tracking-[0.1em] text-slate-900 dark:text-white hover:bg-azimut-red/90 transition-all"
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

