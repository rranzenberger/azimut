/**
 * Subpágina: Todos os projetos (Projetos realizados / Our portfolio).
 * Rota: /:lang/work/projects
 * Pills (ALL, Video, VR&XR, etc.) levam aqui com ?type=... quando aplicável.
 */

import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import type { Lang } from '../i18n'
import SEO from '../components/SEO'
import { useAzimutContent } from '../hooks/useAzimutContent'
import { useScrollAnimation } from '../hooks/useScrollAnimation'
import { trackPageView, trackProjectInteraction } from '../utils/analytics'
import { useUserTracking } from '../hooks/useUserTracking'
import StarBackground from '../components/StarBackground'
import OptimizedImage from '../components/OptimizedImage'
import { useTheme } from '../contexts/ThemeContext'
import { MAIN_CATEGORIES, getCategoryFilters } from '../utils/categoryMapping'
import { useBehaviorTracking } from '../hooks/useBehaviorTracking'
import LangLink from '../components/LangLink'
import { PageFooterNavigation } from '../components/PageFooterNavigation'

interface WorkProject {
  id?: string
  slug: string
  title: string
  summary?: string
  shortTitle?: string
  type?: string
  tags?: string[]
  year?: number
  city?: string
  country?: string
  heroImage?: { medium?: string; large?: string; alt?: string } | null
  thumbnailUrl?: string
  projectCategory?: string[]
  workType?: string[]
  technologies?: string[]
  industry?: string | null
}

const TITLES: Record<Lang, string> = {
  pt: 'Projetos realizados',
  en: 'Our portfolio',
  es: 'Proyectos realizados',
  fr: 'Projets réalisés',
}
const SUBTITLES: Record<Lang, string> = {
  pt: 'Portfólio completo. Filtre por área ou explore todos.',
  en: 'Full portfolio. Filter by area or explore all.',
  es: 'Portafolio completo. Filtra por área o explora todos.',
  fr: 'Portfolio complet. Filtrez par domaine ou explorez tout.',
}
const CTA_FULL: Record<Lang, string> = {
  pt: 'Veja todo nosso portfólio',
  en: 'View full portfolio',
  es: 'Ver todo nuestro portafolio',
  fr: 'Voir tout notre portfolio',
}

function getProjectImageUrl(project: WorkProject): string | null {
  if (project.heroImage?.medium || project.heroImage?.large) return project.heroImage.medium || project.heroImage.large || null
  return project.thumbnailUrl || null
}

function getProjectImageAlt(project: WorkProject): string {
  return project.heroImage?.alt || `${project.title} | Azimut Portfolio`
}

interface WorkProjectsProps {
  lang: Lang
}

const WorkProjects: React.FC<WorkProjectsProps> = ({ lang }) => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { theme } = useTheme()
  const { trackInteraction } = useUserTracking()
  const { trackCategoryClick } = useBehaviorTracking()
  useScrollAnimation()

  const typeFromUrl = searchParams.get('type')
  const tagFromUrl = searchParams.get('tag')

  const [selectedCategory, setSelectedCategory] = useState<string[]>([])
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [selectedTag, setSelectedTag] = useState<string | null>(null)

  const { content: cmsContent, loading: cmsLoading } = useAzimutContent({ page: 'work', lang })

  // Fallback quando backoffice retorna vazio ou está inacessível (igual à página Work)
  const defaultCases = useMemo((): WorkProject[] => [
    { slug: 'museu-olimpico-rio', title: lang === 'pt' ? 'Museu Olímpico do Rio' : lang === 'es' ? 'Museo Olímpico de Río' : lang === 'fr' ? 'Musée Olympique de Rio' : 'Rio Olympic Museum', summary: lang === 'pt' ? 'Direção geral, tecnologia e audiovisual. Projeto expográfico completo com recursos interativos.' : 'General direction, technology and audiovisual. Complete expographic project with digital interactive resources.', year: 2016, tags: [lang === 'pt' ? 'Museografia Digital' : 'Digital Museography', lang === 'pt' ? 'Projeto Expográfico' : 'Expographic Project'], type: 'MUSEUM', projectCategory: ['museum', 'exhibition'] },
    { slug: 'exposicao-itinerante-tmnt', title: lang === 'pt' ? 'TMNT - Tartarugas Ninjas - Exposição Itinerante' : 'TMNT - Ninja Turtles - Itinerant Exhibition', summary: lang === 'pt' ? 'Projeto expográfico para exposição itinerante interativa.' : 'Expographic project for interactive itinerant exhibition.', year: 2024, tags: [lang === 'pt' ? 'Exposição Itinerante' : 'Itinerant Exhibition', 'Animation'], type: 'EXHIBITION', projectCategory: ['museum', 'exhibition', 'animation'] },
    { slug: 'curadoria-festival-gramado-vr', title: lang === 'pt' ? 'Curadoria Festival de Gramado - Mostra VR' : 'Gramado Film Festival - VR Showcase', summary: lang === 'pt' ? 'Curadoria e programação de mostra VR desde 2017.' : 'Curation and programming of VR film showcase since 2017.', year: 2024, tags: [lang === 'pt' ? 'Curadoria' : 'Curation', 'Festival', 'VR'], type: 'FESTIVAL', projectCategory: ['curadoria', 'festival', 'vr-360'] },
    { slug: 'filme-vr-360-zen', title: lang === 'pt' ? 'VR ZEN - Filme VR 360°' : 'VR ZEN - 360° Virtual Reality Film', summary: lang === 'pt' ? 'Coprodução de filme 360° com narrativa transmidiática.' : 'Co-production of 360° film. Interactive transmedia narrative.', year: 2023, tags: ['VR', '360°', lang === 'pt' ? 'Documentário' : 'Documentary'], type: 'VR_FILM', projectCategory: ['vr-360', 'vr', 'cinema'] },
    { slug: 'curso-producao-cinematicvr-ufrj', title: lang === 'pt' ? 'Produção CinematicVR - UFRJ' : 'CinematicVR Production - UFRJ', summary: lang === 'pt' ? 'Curso de extensão em Produção CinematicVR. Direção audiovisual e pedagógica.' : 'University extension course in CinematicVR Production.', year: 2023, tags: [lang === 'pt' ? 'Educação' : 'Education', 'VR'], type: 'EDUCATION', projectCategory: ['education', 'vr-360'] },
    { slug: 'animacao-3d-personagens', title: lang === 'pt' ? 'Animação 3D e Personagens' : '3D Animation & Characters', summary: lang === 'pt' ? 'Personagens 3D, animações e motion design para exposições e educação.' : '3D character creation, animations and motion design.', year: 2024, tags: ['3D', 'Animation', 'Motion Design'], type: 'ANIMATION', projectCategory: ['design', 'animation', 'vfx'] },
    { slug: 'maquete-virtual-arquitetura', title: lang === 'pt' ? 'Maquete Virtual e Renders 3D' : 'Virtual Model & 3D Renders', summary: lang === 'pt' ? 'Maquetes virtuais e renders 3D para projetos arquitetônicos e culturais.' : 'Interactive virtual models and 3D renders for architectural and cultural projects.', year: 2024, tags: ['3D', lang === 'pt' ? 'Maquete Virtual' : 'Virtual Model'], type: 'ARCHITECTURE', projectCategory: ['design', 'vfx'] },
  ], [lang])

  const allCases = useMemo(() => {
    if (cmsContent?.highlightProjects && Array.isArray(cmsContent.highlightProjects) && cmsContent.highlightProjects.length > 0) {
      return cmsContent.highlightProjects as WorkProject[]
    }
    return defaultCases
  }, [cmsContent?.highlightProjects, defaultCases])

  useEffect(() => {
    if (typeFromUrl) {
      const cat = MAIN_CATEGORIES.find(c => getCategoryFilters(c.id).type === typeFromUrl)
      if (cat?.projectCategory) {
        setSelectedCategory(cat.projectCategory!)
        setSelectedType(typeFromUrl)
      } else {
        setSelectedType(typeFromUrl)
      }
      setSelectedTag(null)
    } else if (tagFromUrl) {
      setSelectedTag(tagFromUrl)
      setSelectedCategory([])
      setSelectedType(null)
    } else {
      setSelectedCategory([])
      setSelectedType(null)
      setSelectedTag(null)
    }
  }, [typeFromUrl, tagFromUrl])

  const cases = useMemo(() => {
    if (!Array.isArray(allCases)) return []
    return allCases.filter((project: WorkProject) => {
      if (selectedCategory.length > 0) {
        const has = project.projectCategory?.some(c => selectedCategory.includes(c))
        if (!has) return false
      }
      if (selectedType && project.type !== selectedType) return false
      if (selectedTag && (!project.tags || !project.tags.includes(selectedTag))) return false
      return true
    })
  }, [allCases, selectedCategory, selectedType, selectedTag])

  const hasActiveFilters = selectedCategory.length > 0 || selectedType !== null || selectedTag !== null

  const clearFilters = () => {
    setSelectedCategory([])
    setSelectedType(null)
    setSelectedTag(null)
    navigate(`/${lang}/work/projects`)
  }

  useEffect(() => {
    const cleanup = trackPageView('work_projects')
    return () => { cleanup?.() }
  }, [])

  const seo = {
    title: lang === 'pt' ? 'Projetos realizados | Azimut' : lang === 'es' ? 'Proyectos realizados | Azimut' : lang === 'fr' ? 'Projets réalisés | Azimut' : 'Our portfolio | Azimut',
    description: lang === 'pt' ? 'Portfólio completo de projetos em VR, XR, museus, festivais e experiências imersivas.' : 'Full portfolio of VR, XR, museums, festivals and immersive experiences.',
    url: `https://azmt.com.br/${lang}/work/projects`,
  }

  return (
    <>
      <SEO title={seo.title} description={seo.description} url={seo.url} />
      <main className="relative pb-24 film-grain">
        <StarBackground
          className="fixed top-[160px] -right-28 h-[520px] w-[520px] md:top-[160px] md:-right-40 md:h-[680px] md:w-[680px]"
          zIndex={-10}
          opacity={0.5}
        />

        {/* Barra de pills - mesma do Work, mas navega para /work/projects */}
        <div className="fixed left-0 right-0 z-40 backdrop-blur-xl submenu-nav" style={{ top: '52px' }}>
          <div className="mx-auto max-w-7xl w-full sm:px-4 min-[768px]:px-6 py-3 flex justify-center">
            <nav className="flex flex-wrap gap-2 sm:gap-3 md:gap-4">
              <button
                onClick={() => {
                  clearFilters()
                }}
                className={`flex items-center gap-1.5 px-3 sm:px-5 py-2 rounded-lg font-sora text-xs font-medium uppercase tracking-wide transition-colors ${
                  !hasActiveFilters ? 'text-azimut-red border-b-2 border-azimut-red' : 'text-slate-400 hover:text-azimut-red'
                }`}
              >
                <span>+</span>
                <span>{lang === 'pt' ? 'TODOS' : lang === 'es' ? 'TODOS' : lang === 'fr' ? 'TOUS' : 'ALL'}</span>
              </button>
              {MAIN_CATEGORIES.map((category) => {
                const filters = getCategoryFilters(category.id)
                const isActive = filters.projectCategory?.some(cat => selectedCategory.includes(cat)) || (filters.type && selectedType === filters.type)
                return (
                  <button
                    key={category.id}
                    onClick={() => {
                      trackCategoryClick(category.id, 'menu')
                      if (filters.type) {
                        navigate(`/${lang}/work/projects?type=${filters.type}`)
                      } else if (filters.projectCategory?.length) {
                        navigate(`/${lang}/work/projects?type=${filters.type || ''}`)
                      }
                    }}
                    className={`flex items-center gap-1.5 px-3 sm:px-5 py-2 rounded-lg font-sora text-xs font-medium uppercase tracking-wide transition-all duration-200 ${
                      isActive ? 'text-azimut-red border-b-2 border-azimut-red scale-105' : 'text-slate-400 hover:text-azimut-red hover:scale-105'
                    }`}
                  >
                    <span>{category.icon}</span>
                    <span>{category.label[lang]}</span>
                  </button>
                )
              })}
            </nav>
          </div>
        </div>

        <div style={{ height: '48px' }} />
        <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="pt-6 md:pt-8 mb-8">
            <span className="block font-sora text-[0.7rem] font-medium uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              {lang === 'pt' ? 'PORTFÓLIO' : lang === 'es' ? 'PORTAFOLIO' : lang === 'fr' ? 'PORTFOLIO' : 'PORTFOLIO'}
            </span>
            <h1 className="mb-2 font-handel uppercase tracking-[0.12em] text-white" style={{ fontSize: 'clamp(2.5rem, 4vw, 4rem)', lineHeight: '1.1' }}>
              {TITLES[lang]}
            </h1>
            <p className="max-w-2xl text-slate-400 dark:text-slate-300 mb-6" style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.1rem)' }}>
              {SUBTITLES[lang]}
            </p>

            <div className="mb-6 flex items-center justify-between flex-wrap gap-3">
              <div className="font-sora text-sm text-slate-500 dark:text-slate-400">
                {cases.length} {lang === 'pt' ? (cases.length === 1 ? 'projeto' : 'projetos') : lang === 'es' ? (cases.length === 1 ? 'proyecto' : 'proyectos') : (cases.length === 1 ? 'project' : 'projects')}
                {hasActiveFilters && <span className="ml-2 text-azimut-red">({lang === 'pt' ? 'filtrado' : 'filtered'})</span>}
              </div>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 rounded-lg border border-azimut-red/40 bg-azimut-red/10 px-4 py-2 text-xs font-sora font-semibold uppercase tracking-wide text-azimut-red hover:bg-azimut-red/20 transition-all"
                >
                  {lang === 'pt' ? '✕ Limpar filtros' : '✕ Clear filters'}
                </button>
              )}
            </div>
          </div>

          {cmsLoading && allCases.length === 0 && (
            <div className="py-16 text-center text-slate-400">Carregando projetos...</div>
          )}

          {!cmsLoading && cases.length === 0 && (
            <div className="py-16 text-center">
              <p className="text-lg text-slate-400 mb-4">
                {lang === 'pt' ? 'Nenhum projeto encontrado com os filtros selecionados.' : lang === 'es' ? 'No se encontraron proyectos con los filtros seleccionados.' : lang === 'fr' ? 'Aucun projet trouvé avec les filtres sélectionnés.' : 'No projects found with the selected filters.'}
              </p>
              {hasActiveFilters ? (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 rounded-lg border border-azimut-red/50 bg-azimut-red/10 px-5 py-2.5 font-sora text-sm font-semibold uppercase tracking-[0.1em] text-azimut-red hover:bg-azimut-red/20 transition-all"
                >
                  {lang === 'pt' ? 'Ver todos os projetos' : lang === 'es' ? 'Ver todos los proyectos' : lang === 'fr' ? 'Voir tous les projets' : 'View all projects'}
                </button>
              ) : (
                <Link to={`/${lang}/work`} className="inline-flex items-center gap-2 text-azimut-red hover:underline font-sora text-sm">
                  {lang === 'pt' ? '← Voltar ao Nosso Trabalho' : lang === 'es' ? '← Volver a Nuestro Trabajo' : lang === 'fr' ? '← Retour à Notre Travail' : '← Back to Our Work'}
                </Link>
              )}
            </div>
          )}

          {cases.length > 0 && (
            <div id="projects-grid" className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
              {cases.map((item: WorkProject, index: number) => (
                <article
                  key={item.slug}
                  className={`group rounded-2xl border card-adaptive overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur transition-all duration-300 hover:scale-[1.02] hover:border-azimut-red/50 ${
                    theme === 'dark' ? 'border-white/10' : 'border-slate-300/30'
                  }`}
                  style={{ animation: `fadeInUp 0.6s ease-out ${index * 0.05}s both` }}
                  onClick={() => {
                    trackInteraction('project_view', item.slug)
                    trackProjectInteraction(item.slug, 'CLICK')
                    navigate(`/${lang}/work/${item.slug}`)
                  }}
                >
                  <div className="relative aspect-video bg-gradient-to-br from-slate-800/80 to-slate-950 overflow-hidden">
                    {getProjectImageUrl(item) ? (
                      <>
                        <OptimizedImage
                          src={getProjectImageUrl(item)!}
                          alt={getProjectImageAlt(item)}
                          className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-110"
                          objectFit="contain"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent pointer-events-none" />
                      </>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800/60 to-slate-950">
                        <div className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center">
                          <svg className="h-6 w-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 font-sora text-[1.05rem] group-hover:text-azimut-red transition-colors line-clamp-2" style={{ color: theme === 'dark' ? '#cbd5e1' : '#f5f1e8' }}>
                      {item.title}
                    </h3>
                    <p className="text-sm leading-relaxed mb-3 line-clamp-3" style={{ color: theme === 'dark' ? '#94a3b8' : '#e8e5df' }}>
                      {item.summary || item.shortTitle}
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      {item.tags?.slice(0, 3).map((tag: string, idx: number) => (
                        <span key={idx} className="rounded-full border px-2 py-0.5 text-[0.68rem]" style={{ borderColor: 'rgba(255,255,255,0.1)', color: '#94a3b8' }}>
                          {tag}
                        </span>
                      ))}
                      {item.year && <span className="text-xs text-slate-500">{item.year}</span>}
                    </div>
                    <Link
                      to={`/${lang}/work/${item.slug}`}
                      onClick={(e) => { e.stopPropagation(); trackInteraction('project_view', item.slug) }}
                      className="mt-3 inline-flex items-center gap-2 rounded-lg border border-azimut-red/50 bg-azimut-red/10 px-4 py-2 font-sora text-[0.7rem] font-semibold uppercase tracking-[0.1em] hover:bg-azimut-red/20 transition-all w-full justify-center"
                      style={{ color: 'var(--theme-text)' }}
                    >
                      {lang === 'pt' ? 'Ver Projeto' : lang === 'es' ? 'Ver Proyecto' : lang === 'fr' ? 'Voir' : 'View'}
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          <PageFooterNavigation
            lang={lang}
            mainCta={{
              title: CTA_FULL[lang],
              description: lang === 'pt' ? 'Volte à página Nosso Trabalho para curadoria, festivais e oportunidades.' : 'Back to Our Work for curation, festivals and opportunities.',
              buttonText: lang === 'pt' ? 'Nosso Trabalho' : 'Our Work',
              buttonHref: '/work'
            }}
            navigation={{
              previous: { label: lang === 'pt' ? 'Nosso Trabalho' : 'Our Work', href: '/work', icon: '🎬' },
              next: { label: lang === 'pt' ? 'Serviços' : 'Solutions', href: '/what', icon: '✨' }
            }}
          />
        </div>
      </main>
    </>
  )
}

export default WorkProjects
