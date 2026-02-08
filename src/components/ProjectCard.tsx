import React from 'react'
import { Link } from 'react-router-dom'
import { type Lang } from '../i18n'
import { useTheme } from '../contexts/ThemeContext'
import { prefetchProject } from '../hooks/useProject'
import OptimizedImage from './OptimizedImage'

interface ProjectCardProps {
  project: {
    slug: string
    title: string
    shortTitle?: string
    summary?: string
    city?: string
    country?: string
    year?: number
    tags?: string[]
    technologies?: string[]
    projectCategory?: string[]
    industry?: string
    hasDetailPage?: boolean
    heroImage?: {
      original?: string
      thumbnail?: string
      medium?: string
      large?: string
      alt?: string
    } | null
    thumbnailUrl?: string
    videoUrl?: string
  }
  lang: Lang
  variant?: 'default' | 'featured' | 'compact'
  index?: number
  onInteraction?: (type: string, slug: string) => void
}

// Mapeamento de categorias para ícones
const categoryIcons: Record<string, string> = {
  'museum': '🏛️',
  'museus': '🏛️',
  'curadoria': '🎪',
  'vr-360': '🥽',
  'vr': '🥽',
  'motion': '🎬',
  'games': '🎮',
  'education': '🎓',
  'corporate': '🏢',
  'festival': '🎪',
  'animacao': '✨',
  'renders-3d': '🎨',
}

// Mapeamento de indústrias para cores
const industryColors: Record<string, string> = {
  'cultural': '#9333ea',
  'entertainment': '#dc2626',
  'education': '#2563eb',
  'corporate': '#059669',
  'government': '#ca8a04',
  'research': '#7c3aed',
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  lang,
  variant = 'default',
  index = 0,
  onInteraction
}) => {
  const { theme } = useTheme()
  
  // Obter ícone da categoria principal
  const getCategoryIcon = () => {
    if (project.projectCategory && project.projectCategory.length > 0) {
      for (const cat of project.projectCategory) {
        if (categoryIcons[cat.toLowerCase()]) {
          return categoryIcons[cat.toLowerCase()]
        }
      }
    }
    return '✦'
  }
  
  // Obter cor da indústria
  const getIndustryColor = () => {
    if (project.industry) {
      return industryColors[project.industry.toLowerCase()] || '#c92337'
    }
    return '#c92337'
  }
  
  // Obter URL da imagem
  const getImageUrl = () => {
    if (project.thumbnailUrl) return project.thumbnailUrl
    if (project.heroImage?.medium) return project.heroImage.medium
    if (project.heroImage?.large) return project.heroImage.large
    if (project.heroImage?.original) return project.heroImage.original
    return null
  }
  
  const imageUrl = getImageUrl()
  const categoryIcon = getCategoryIcon()
  const industryColor = getIndustryColor()
  
  // Variante FEATURED (grande, full-width)
  if (variant === 'featured') {
    return (
      <article
        className={`group relative overflow-hidden rounded-3xl border card-adaptive shadow-[0_32px_80px_rgba(0,0,0,0.6)] transition-all duration-500 hover:shadow-[0_40px_100px_rgba(201,35,55,0.3)] ${
          theme === 'dark' ? 'border-white/10' : 'border-slate-300/30'
        }`}
        style={{
          animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
        }}
      >
        {/* Linha colorida superior */}
        <div 
          className="absolute top-0 left-0 right-0 h-1 z-20"
          style={{ 
            background: `linear-gradient(90deg, ${industryColor}, ${industryColor}88)`,
            boxShadow: `0 2px 20px ${industryColor}66`
          }}
        />
        
        <div className="grid md:grid-cols-2">
          {/* Área de Imagem */}
          <div className="relative aspect-video md:aspect-auto md:min-h-[420px] bg-gradient-to-br from-slate-800/80 to-slate-950 overflow-hidden">
            {imageUrl ? (
              <>
                <OptimizedImage
                  src={imageUrl}
                  alt={project.heroImage?.alt || project.title}
                  className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-110"
                  objectFit="contain"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none transition-opacity duration-300 group-hover:opacity-80" />
              </>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-azimut-red/10 via-slate-900/80 to-slate-950">
                <div className="text-center p-6">
                  <div className="mb-4 inline-flex h-24 w-24 items-center justify-center rounded-full border-2 border-azimut-red/30 bg-azimut-red/10 backdrop-blur transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
                    <span className="text-5xl">{categoryIcon}</span>
                  </div>
                  <div className="inline-flex items-center gap-2 rounded-full border border-azimut-red/30 bg-azimut-red/10 px-4 py-1.5 backdrop-blur">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-azimut-red" />
                    <span className="font-sora text-[0.7rem] uppercase tracking-[0.2em] text-slate-200">
                      {lang === 'pt' ? 'Projeto em Destaque' : 'Featured Project'}
                    </span>
                  </div>
                </div>
              </div>
            )}
            
            {/* Badge de categoria flutuante */}
            <div className="absolute top-4 left-4 z-10">
              <div 
                className="flex items-center gap-2 rounded-full px-4 py-2 backdrop-blur-md border transition-all duration-300 group-hover:scale-105"
                style={{ 
                  background: `${industryColor}20`,
                  borderColor: `${industryColor}40`
                }}
              >
                <span className="text-lg">{categoryIcon}</span>
                <span className="font-sora text-xs font-semibold uppercase tracking-wider text-white">
                  {project.projectCategory?.[0] || project.industry || ''}
                </span>
              </div>
            </div>
            
            {/* Badge de vídeo se tiver */}
            {project.videoUrl && (
              <div className="absolute bottom-4 right-4 z-10">
                <div className="flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 backdrop-blur-sm border border-white/20">
                  <svg className="w-4 h-4 text-azimut-red" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  <span className="font-sora text-xs text-white">Vídeo</span>
                </div>
              </div>
            )}
          </div>

          {/* Área de Conteúdo */}
          <div className="p-8 md:p-10 flex flex-col justify-center overflow-hidden">
            {/* Ano */}
            {project.year && (
              <span className="mb-3 font-sora text-sm font-medium" style={{ color: industryColor }}>
                {project.year}
              </span>
            )}
            
            {/* Título */}
            <h2 
              className="mb-4 font-handel text-3xl md:text-4xl uppercase tracking-[0.12em] line-clamp-2 transition-colors duration-300 group-hover:text-azimut-red"
              style={{ 
                color: theme === 'dark' ? '#ffffff' : '#f5f1e8',
                textShadow: theme === 'light' ? '0 2px 8px rgba(0, 0, 0, 0.4)' : '0 2px 4px rgba(0, 0, 0, 0.2)'
              }}
            >
              {project.title}
            </h2>
            
            {/* Descrição */}
            <p 
              className="mb-5 text-base leading-relaxed line-clamp-4"
              style={{ 
                color: theme === 'dark' ? '#cbd5e1' : '#e8e5df',
                textShadow: theme === 'light' ? '0 1px 4px rgba(0, 0, 0, 0.4)' : '0 1px 2px rgba(0, 0, 0, 0.2)'
              }}
            >
              {project.summary || project.shortTitle}
            </p>
            
            {/* Localização */}
            {(project.city || project.country) && (
              <p className="mb-4 flex items-center gap-2 text-sm" style={{ color: theme === 'dark' ? '#94a3b8' : '#d3cec3' }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {[project.city, project.country].filter(Boolean).join(', ')}
              </p>
            )}
            
            {/* Tags/Tecnologias */}
            <div className="flex flex-wrap gap-2 mb-6">
              {(project.technologies || project.tags || []).slice(0, 4).map((tag, idx) => (
                <span 
                  key={idx} 
                  className="rounded-full border px-3 py-1 font-sora text-[0.68rem] uppercase tracking-[0.15em] transition-all duration-300 hover:border-azimut-red/50 hover:bg-azimut-red/10"
                  style={{ 
                    borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.4)',
                    color: theme === 'dark' ? '#94a3b8' : '#f5f1e8'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            
            {/* CTA */}
            {project.hasDetailPage !== false && (
              <Link
                to={`/${lang}/work/${project.slug}`}
                state={{ projectPreview: project }}
                onMouseEnter={() => prefetchProject(project.slug, lang)}
                onClick={(e) => {
                  e.stopPropagation()
                  onInteraction?.('click', project.slug)
                }}
                className="inline-flex items-center gap-3 rounded-xl border px-6 py-3 font-sora text-sm font-semibold uppercase tracking-[0.15em] transition-all duration-300 hover:bg-azimut-red hover:border-azimut-red hover:shadow-lg hover:shadow-azimut-red/30 group/btn"
                style={{ 
                  borderColor: `${industryColor}60`,
                  backgroundColor: `${industryColor}15`,
                  color: 'var(--theme-text)'
                }}
              >
                <span>{lang === 'pt' ? 'Ver Projeto' : lang === 'es' ? 'Ver Proyecto' : 'View Project'}</span>
                <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </article>
    )
  }
  
  // Variante COMPACT (pequena)
  if (variant === 'compact') {
    return (
      <article
        className={`group relative overflow-hidden rounded-xl border card-adaptive shadow-md transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:border-azimut-red/50 ${
          theme === 'dark' ? 'border-white/10' : 'border-slate-300/30'
        }`}
        style={{
          animation: `fadeInUp 0.5s ease-out ${index * 0.08}s both`
        }}
      >
        {/* Linha colorida */}
        <div 
          className="absolute top-0 left-0 right-0 h-0.5 z-10"
          style={{ background: industryColor }}
        />
        
        <Link
          to={project.hasDetailPage !== false ? `/${lang}/work/${project.slug}` : '#'}
          state={project.hasDetailPage !== false ? { projectPreview: project } : undefined}
          onMouseEnter={() => project.hasDetailPage !== false && prefetchProject(project.slug, lang)}
          onClick={(e) => {
            if (project.hasDetailPage === false) e.preventDefault()
            onInteraction?.('click', project.slug)
          }}
          className="block"
        >
          {/* Imagem */}
          <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-slate-800/80 to-slate-950">
            {imageUrl ? (
              <OptimizedImage
                src={imageUrl}
                alt={project.heroImage?.alt || project.title}
                className="absolute inset-0 h-full w-full transition-transform duration-500 group-hover:scale-110"
                objectFit="contain"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl opacity-60 group-hover:scale-110 transition-transform duration-300">{categoryIcon}</span>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent pointer-events-none" />
          </div>
          
          {/* Conteúdo */}
          <div className="p-4">
            <h3 
              className="font-sora text-sm font-semibold line-clamp-1 transition-colors duration-300 group-hover:text-azimut-red"
              style={{ color: theme === 'dark' ? '#e2e8f0' : '#f5f1e8' }}
            >
              {project.title}
            </h3>
            {project.year && (
              <span className="text-xs" style={{ color: theme === 'dark' ? '#64748b' : '#a3a095' }}>
                {project.year}
              </span>
            )}
          </div>
        </Link>
      </article>
    )
  }
  
  // Variante DEFAULT (card padrão)
  return (
    <article
      className={`group relative overflow-hidden rounded-2xl border card-adaptive shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_24px_60px_rgba(201,35,55,0.25)] ${
        theme === 'dark' ? 'border-white/10 hover:border-azimut-red/50' : 'border-slate-300/30 hover:border-azimut-red/50'
      }`}
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
      }}
    >
      {/* Linha colorida no topo */}
      <div 
        className="absolute top-0 left-0 right-0 h-[3px] z-10 transition-all duration-300"
        style={{ 
          background: `linear-gradient(90deg, ${industryColor}, ${industryColor}66)`,
          boxShadow: `0 2px 12px ${industryColor}44`
        }}
      />
      
      <Link
        to={project.hasDetailPage !== false ? `/${lang}/work/${project.slug}` : '#'}
        state={project.hasDetailPage !== false ? { projectPreview: project } : undefined}
        onMouseEnter={() => project.hasDetailPage !== false && prefetchProject(project.slug, lang)}
        onClick={(e) => {
          if (project.hasDetailPage === false) e.preventDefault()
          onInteraction?.('click', project.slug)
        }}
        className="block"
      >
        {/* Área de Imagem */}
        <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-slate-800/80 to-slate-950">
          {imageUrl ? (
            <>
              <OptimizedImage
                src={imageUrl}
                alt={project.heroImage?.alt || project.title}
                className="absolute inset-0 h-full w-full transition-transform duration-700 group-hover:scale-110"
                objectFit="contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent pointer-events-none opacity-100 group-hover:from-azimut-red/20 group-hover:via-slate-950/40 transition-all duration-500" />
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800/60 to-slate-950 transition-all duration-500 group-hover:from-azimut-red/15 group-hover:to-slate-950">
              <div className="text-center p-4">
                <div className={`mb-2 inline-flex h-14 w-14 items-center justify-center rounded-full border bg-subtle backdrop-blur transition-all duration-500 group-hover:scale-110 group-hover:border-azimut-red/50 group-hover:rotate-12 ${
                  theme === 'dark' ? 'border-white/20' : 'border-slate-300/40'
                }`}>
                  <span className="text-3xl">{categoryIcon}</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Badge flutuante */}
          <div className="absolute top-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
            <div 
              className="flex items-center gap-1.5 rounded-full px-3 py-1.5 backdrop-blur-md border text-xs font-semibold"
              style={{ 
                background: `${industryColor}30`,
                borderColor: `${industryColor}50`,
                color: '#fff'
              }}
            >
              <span>{categoryIcon}</span>
              <span className="uppercase tracking-wider">{project.industry || project.projectCategory?.[0] || ''}</span>
            </div>
          </div>
          
          {/* Badge de vídeo */}
          {project.videoUrl && (
            <div className="absolute bottom-3 right-3 z-10">
              <div className="flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 backdrop-blur-sm border border-white/20">
                <svg className="w-3.5 h-3.5 text-azimut-red" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Conteúdo */}
        <div className="p-5 relative z-10 overflow-hidden">
          {/* Título */}
          <h3 
            className="mb-2 font-sora text-[1.1rem] font-semibold leading-tight line-clamp-2 transition-colors duration-300 group-hover:text-azimut-red"
            style={{ 
              color: theme === 'dark' ? '#e2e8f0' : '#f5f1e8',
              textShadow: theme === 'light' ? '0 1px 4px rgba(0, 0, 0, 0.4)' : '0 1px 2px rgba(0, 0, 0, 0.2)'
            }}
          >
            {project.title}
          </h3>
          
          {/* Descrição */}
          <p 
            className="text-sm leading-relaxed mb-4 line-clamp-3 transition-colors duration-300 group-hover:text-slate-300"
            style={{ 
              color: theme === 'dark' ? '#94a3b8' : '#e8e5df',
              textShadow: theme === 'light' ? '0 1px 3px rgba(0, 0, 0, 0.5)' : '0 1px 2px rgba(0, 0, 0, 0.3)'
            }}
          >
            {project.summary || project.shortTitle}
          </p>
          
          {/* Footer do card */}
          <div className="flex flex-wrap items-center justify-between gap-2 mt-auto">
            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {(project.technologies || project.tags || []).slice(0, 2).map((tag, idx) => (
                <span 
                  key={idx} 
                  className="rounded-full border px-2 py-0.5 text-[0.65rem] font-medium transition-all duration-300 group-hover:border-azimut-red/50 group-hover:bg-azimut-red/10 group-hover:text-azimut-red"
                  style={{ 
                    borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.4)',
                    color: theme === 'dark' ? '#94a3b8' : '#f5f1e8'
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Ano */}
            {project.year && (
              <span 
                className="text-xs font-medium"
                style={{ color: theme === 'dark' ? '#64748b' : '#a3a095' }}
              >
                {project.year}
              </span>
            )}
          </div>
          
          {/* CTA (só se tiver hasDetailPage) */}
          {project.hasDetailPage !== false && (
            <div 
              className="mt-4 flex items-center justify-center gap-2 rounded-lg border py-2.5 font-sora text-[0.7rem] font-semibold uppercase tracking-[0.12em] transition-all duration-300 group-hover:bg-azimut-red group-hover:border-azimut-red group-hover:text-white"
              style={{ 
                borderColor: `${industryColor}50`,
                backgroundColor: `${industryColor}10`,
                color: 'var(--theme-text)'
              }}
            >
              <span>{lang === 'pt' ? 'Ver Detalhes' : lang === 'es' ? 'Ver Detalles' : 'View Details'}</span>
              <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          )}
        </div>
      </Link>
    </article>
  )
}

export default ProjectCard
