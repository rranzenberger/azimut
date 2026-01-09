import React from 'react'
import { useAIRecommendations } from '../hooks/useAIRecommendations'
import { Link } from 'react-router-dom'
import { type Lang } from '../i18n'

interface AIProjectRecommendationsProps {
  lang: Lang
  visitedPages?: string[]
  currentPage?: string
  className?: string
}

export const AIProjectRecommendations: React.FC<AIProjectRecommendationsProps> = ({
  lang,
  visitedPages = [],
  currentPage,
  className = ''
}) => {
  const { projects, loading, detectedInterest } = useAIRecommendations({
    visitedPages,
    currentPage,
    sessionId: sessionStorage.getItem('sessionId') || undefined,
    enabled: true
  })

  if (loading) {
    return (
      <div className={`animate-pulse ${className}`}>
        <div className="h-8 bg-white/10 rounded w-1/3 mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-64 bg-white/5 rounded-lg"></div>
          ))}
        </div>
      </div>
    )
  }

  if (!projects || projects.length === 0) return null

  const titles: Record<Lang, Record<string, string>> = {
    pt: {
      default: 'Projetos Recomendados para Você',
      museums: 'Outros Museus que Criamos',
      education: 'Projetos Educacionais Similares',
      corporate: 'Soluções Corporativas',
      vr: 'Experiências Imersivas VR/AR'
    },
    en: {
      default: 'Recommended Projects for You',
      museums: 'Other Museums We Created',
      education: 'Similar Educational Projects',
      corporate: 'Corporate Solutions',
      vr: 'Immersive VR/AR Experiences'
    },
    es: {
      default: 'Proyectos Recomendados para Ti',
      museums: 'Otros Museos que Creamos',
      education: 'Proyectos Educativos Similares',
      corporate: 'Soluciones Corporativas',
      vr: 'Experiencias Inmersivas VR/AR'
    },
    fr: {
      default: 'Projets Recommandés pour Vous',
      museums: 'Autres Musées que Nous Avons Créés',
      education: 'Projets Éducatifs Similaires',
      corporate: 'Solutions Corporatives',
      vr: 'Expériences Immersives VR/AR'
    }
  }

  const title = titles[lang][detectedInterest] || titles[lang].default

  return (
    <div className={className}>
      <h3 className="text-2xl md:text-3xl font-handel uppercase tracking-wider mb-6 animate-fade-in">
        <span className="text-white/90 dark:text-white">
          {title}
        </span>
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.slice(0, 6).map((project, index) => {
          const translation = project.translations?.find(t => t.language === lang) || project.translations?.[0]
          
          return (
            <Link
              key={project.id}
              to={`/${lang}/projetos/${project.slug}`}
              className="group relative overflow-hidden rounded-lg border border-white/10 hover:border-white/30 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Imagem */}
              <div className="aspect-video overflow-hidden bg-white/5">
                {project.heroImage?.large ? (
                  <img
                    src={project.heroImage.large}
                    alt={translation?.title || project.slug}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-azimut-red/20 to-transparent flex items-center justify-center">
                    <span className="text-white/50 text-4xl">✨</span>
                  </div>
                )}
              </div>

              {/* Conteúdo */}
              <div className="p-4 card-adaptive">
                <h4 className="font-semibold text-lg mb-2 text-white/90 dark:text-white group-hover:text-azimut-red transition-colors">
                  {translation?.title || project.slug}
                </h4>
                
                {translation?.subtitle && (
                  <p className="text-sm text-white/70 dark:text-white/60 line-clamp-2">
                    {translation.subtitle}
                  </p>
                )}

                {/* Badge de IA (sutil) */}
                {(project as any).aiScore && (project as any).aiScore > 80 && (
                  <div className="mt-2 inline-block">
                    <span className="text-xs px-2 py-1 bg-azimut-red/20 border border-azimut-red/30 rounded-full text-azimut-red font-medium">
                      ✨ Recomendado
                    </span>
                  </div>
                )}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default AIProjectRecommendations
