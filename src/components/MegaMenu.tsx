import React from 'react'
import { Link } from 'react-router-dom'
import LangLink from './LangLink'
import { Lang } from '../i18n'

interface MegaMenuProps {
  lang: Lang
  theme: 'light' | 'dark'
  isOpen: boolean
  onClose: () => void
}

const MegaMenu: React.FC<MegaMenuProps> = ({ lang, theme, isOpen, onClose }) => {
  if (!isOpen) return null

  const services = {
    culture: [
      { 
        slug: 'museus-exposicoes',
        icon: '🏛️',
        titlePt: 'Museus & Exposições',
        titleEn: 'Museums & Exhibitions',
        titleEs: 'Museos & Exposiciones',
        titleFr: 'Musées & Expositions'
      },
      { 
        slug: 'festivais-curadoria-eventos',
        icon: '🎪',
        titlePt: 'Festivais & Eventos',
        titleEn: 'Festivals & Events',
        titleEs: 'Festivales & Eventos',
        titleFr: 'Festivals & Événements'
      },
      { 
        slug: 'educacao-treinamento',
        icon: '🎓',
        titlePt: 'Educação & Treinamento',
        titleEn: 'Education & Training',
        titleEs: 'Educación & Capacitación',
        titleFr: 'Éducation & Formation'
      },
      { 
        slug: 'teatro-espetaculos-imersivos',
        icon: '🎭',
        titlePt: 'Teatro & Espetáculos',
        titleEn: 'Theater & Shows',
        titleEs: 'Teatro & Espectáculos',
        titleFr: 'Théâtre & Spectacles'
      }
    ],
    brands: [
      { 
        slug: 'branded-experiences-ativacoes',
        icon: '🎯',
        titlePt: 'Branded Experiences',
        titleEn: 'Branded Experiences',
        titleEs: 'Branded Experiences',
        titleFr: 'Branded Experiences'
      },
      { 
        slug: 'realidade-virtual-vr',
        icon: '🥽',
        titlePt: 'Realidade Virtual',
        titleEn: 'Virtual Reality',
        titleEs: 'Realidad Virtual',
        titleFr: 'Réalité Virtuelle'
      },
      { 
        slug: 'xr-interatividade-web3',
        icon: '🌐',
        titlePt: 'XR, Web3 & Metaverso',
        titleEn: 'XR, Web3 & Metaverse',
        titleEs: 'XR, Web3 & Metaverso',
        titleFr: 'XR, Web3 & Métavers'
      }
    ],
    production: [
      { 
        slug: 'cinema-audiovisual',
        icon: '🎬',
        titlePt: 'Cinema & Audiovisual',
        titleEn: 'Cinema & Audiovisual',
        titleEs: 'Cine & Audiovisual',
        titleFr: 'Cinéma & Audiovisuel'
      },
      { 
        slug: 'pos-producao-vfx',
        icon: '🎨',
        titlePt: 'Pós-Produção & VFX',
        titleEn: 'Post-Production & VFX',
        titleEs: 'Post-Producción & VFX',
        titleFr: 'Post-Production & VFX'
      },
      { 
        slug: 'animacao-2d-3d',
        icon: '🎭',
        titlePt: 'Animação 2D/3D',
        titleEn: 'Animation 2D/3D',
        titleEs: 'Animación 2D/3D',
        titleFr: 'Animation 2D/3D'
      },
      { 
        slug: 'games-interativos',
        icon: '🎮',
        titlePt: 'Games & Interativos',
        titleEn: 'Games & Interactive',
        titleEs: 'Juegos & Interactivos',
        titleFr: 'Jeux & Interactifs'
      }
    ],
    technology: [
      { 
        slug: 'ia-criativa',
        icon: '🤖',
        titlePt: 'IA Criativa',
        titleEn: 'Creative AI',
        titleEs: 'IA Creativa',
        titleFr: 'IA Créative'
      },
      { 
        slug: 'consultoria-estrategia',
        icon: '💡',
        titlePt: 'Consultoria & Estratégia',
        titleEn: 'Consulting & Strategy',
        titleEs: 'Consultoría & Estrategia',
        titleFr: 'Conseil & Stratégie'
      },
      { 
        slug: 'direcao-arte-criativa',
        icon: '🎭',
        titlePt: 'Direção de Arte',
        titleEn: 'Art Direction',
        titleEs: 'Dirección de Arte',
        titleFr: 'Direction Artistique'
      },
      { 
        slug: 'cenografia-design-espacial',
        icon: '🏗️',
        titlePt: 'Cenografia & Design',
        titleEn: 'Scenography & Design',
        titleEs: 'Escenografía & Diseño',
        titleFr: 'Scénographie & Design'
      },
      { 
        slug: 'arquitetura-virtual-bim',
        icon: '🏗️',
        titlePt: 'Arquitetura Virtual',
        titleEn: 'Virtual Architecture',
        titleEs: 'Arquitectura Virtual',
        titleFr: 'Architecture Virtuelle'
      }
    ]
  }

  const getTitle = (service: any) => {
    switch (lang) {
      case 'pt': return service.titlePt
      case 'en': return service.titleEn
      case 'es': return service.titleEs
      case 'fr': return service.titleFr
      default: return service.titleEn
    }
  }

  const getCategoryTitle = (category: string) => {
    const titles = {
      culture: {
        pt: 'Cultura & Instituições',
        en: 'Culture & Institutions',
        es: 'Cultura & Instituciones',
        fr: 'Culture & Institutions'
      },
      brands: {
        pt: 'Marcas & Experiências',
        en: 'Brands & Experiences',
        es: 'Marcas & Experiencias',
        fr: 'Marques & Expériences'
      },
      production: {
        pt: 'Produção Audiovisual',
        en: 'Audiovisual Production',
        es: 'Producción Audiovisual',
        fr: 'Production Audiovisuelle'
      },
      technology: {
        pt: 'Tecnologia & Estratégia',
        en: 'Technology & Strategy',
        es: 'Tecnología & Estrategia',
        fr: 'Technologie & Stratégie'
      }
    }
    return titles[category as keyof typeof titles][lang]
  }

  const categoryIcons = {
    culture: '🏛️',
    brands: '🎯',
    production: '🎬',
    technology: '💡'
  }

  return (
    <div
      className="absolute left-0 right-0 top-full z-50 animate-fadeIn"
      style={{
        marginTop: '0px'
      }}
    >
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm"
        onClick={onClose}
        style={{ top: '60px' }}
      />
      
      {/* Mega Menu Content */}
      <div 
        className="relative mx-auto max-w-7xl px-6 py-8"
        style={{
          background: theme === 'dark' 
            ? 'linear-gradient(180deg, #0a0e18 0%, #060a12 100%)'
            : 'linear-gradient(180deg, #f5f3f0 0%, #e8e6e3 100%)',
          borderRadius: '0 0 12px 12px',
          boxShadow: theme === 'dark'
            ? '0 10px 40px rgba(0, 0, 0, 0.5)'
            : '0 10px 40px rgba(0, 0, 0, 0.15)'
        }}
      >
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h3 
            className="text-2xl font-bold"
            style={{ 
              color: theme === 'dark' ? '#d3cec3' : '#0a0e18'
            }}
          >
            {lang === 'pt' ? 'Nossas Soluções' : lang === 'es' ? 'Nuestras Soluciones' : lang === 'fr' ? 'Nos Solutions' : 'Our Solutions'}
          </h3>
          <LangLink
            to="/what"
            onClick={onClose}
            className="group flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #c92337 0%, #a01d2f 100%)',
              color: '#ffffff',
              boxShadow: '0 2px 8px rgba(201, 35, 55, 0.3)'
            }}
          >
            {lang === 'pt' ? 'Ver Todas (16)' : lang === 'es' ? 'Ver Todas (16)' : lang === 'fr' ? 'Voir Toutes (16)' : 'View All (16)'}
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </LangLink>
        </div>

        {/* Categories */}
        <div className="space-y-6">
          {Object.entries(services).map(([category, items]) => (
            <div key={category}>
              {/* Category Title */}
              <h4 
                className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wider"
                style={{
                  color: theme === 'dark' ? '#a89f94' : '#4a4a4a',
                  opacity: 0.8
                }}
              >
                <span className="text-lg">{categoryIcons[category as keyof typeof categoryIcons]}</span>
                {getCategoryTitle(category)}
                <span 
                  className="ml-auto text-xs font-normal"
                  style={{ opacity: 0.5 }}
                >
                  {items.length} {lang === 'pt' ? 'serviços' : lang === 'es' ? 'servicios' : lang === 'fr' ? 'services' : 'services'}
                </span>
              </h4>

              {/* Services Grid */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                {items.map((service) => (
                  <LangLink
                    key={service.slug}
                    to={`/what/${service.slug}`}
                    onClick={onClose}
                    className="group relative overflow-hidden rounded-lg p-4 transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                    style={{
                      background: theme === 'dark'
                        ? 'rgba(255, 255, 255, 0.03)'
                        : 'rgba(255, 255, 255, 0.6)',
                      border: theme === 'dark'
                        ? '1px solid rgba(255, 255, 255, 0.05)'
                        : '1px solid rgba(0, 0, 0, 0.08)',
                      backdropFilter: 'blur(10px)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
                    }}
                  >
                    {/* Hover Gradient */}
                    <div 
                      className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background: 'linear-gradient(135deg, rgba(201, 35, 55, 0.1) 0%, rgba(201, 35, 55, 0.05) 100%)'
                      }}
                    />
                    
                    {/* Content */}
                    <div className="relative">
                      <div 
                        className="mb-2 text-3xl transition-transform duration-300 group-hover:scale-110"
                      >
                        {service.icon}
                      </div>
                      <h5 
                        className="text-sm font-semibold leading-tight transition-colors"
                        style={{
                          color: theme === 'dark' ? '#d3cec3' : '#0a0e18'
                        }}
                      >
                        {getTitle(service)}
                      </h5>
                    </div>

                    {/* Red Border on Hover */}
                    <div 
                      className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-transparent via-azimut-red to-transparent transition-all duration-300 group-hover:w-full"
                    />
                  </LangLink>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div 
          className="mt-8 flex flex-col items-center justify-between gap-4 rounded-lg p-6 sm:flex-row"
          style={{
            background: theme === 'dark'
              ? 'linear-gradient(135deg, rgba(201, 35, 55, 0.1) 0%, rgba(201, 35, 55, 0.05) 100%)'
              : 'linear-gradient(135deg, rgba(201, 35, 55, 0.08) 0%, rgba(201, 35, 55, 0.04) 100%)',
            border: '1px solid rgba(201, 35, 55, 0.2)'
          }}
        >
          <div>
            <h5 
              className="mb-1 font-bold"
              style={{ color: theme === 'dark' ? '#d3cec3' : '#0a0e18' }}
            >
              🤝 {lang === 'pt' ? 'Agências de Publicidade & Marketing' : lang === 'es' ? 'Agencias de Publicidad & Marketing' : lang === 'fr' ? 'Agences Publicité & Marketing' : 'Advertising & Marketing Agencies'}
            </h5>
            <p 
              className="text-sm"
              style={{ 
                color: theme === 'dark' ? '#a89f94' : '#4a4a4a',
                opacity: 0.8
              }}
            >
              {lang === 'pt' ? 'Parceiros técnicos para projetos com VR, IA e Web3' : lang === 'es' ? 'Socios técnicos para proyectos con VR, IA y Web3' : lang === 'fr' ? 'Partenaires techniques pour projets VR, IA et Web3' : 'Technical partners for VR, AI and Web3 projects'}
            </p>
          </div>
          <LangLink
            to="/what#para-agencias"
            onClick={onClose}
            className="group whitespace-nowrap rounded-full px-6 py-2.5 text-sm font-semibold transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #c92337 0%, #a01d2f 100%)',
              color: '#ffffff',
              boxShadow: '0 4px 12px rgba(201, 35, 55, 0.3)'
            }}
          >
            {lang === 'pt' ? 'Saiba Mais' : lang === 'es' ? 'Saber Más' : lang === 'fr' ? 'En Savoir Plus' : 'Learn More'}
            <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
          </LangLink>
        </div>
      </div>
    </div>
  )
}

export default MegaMenu

