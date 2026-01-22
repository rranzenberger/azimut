// ════════════════════════════════════════════════════════════
// PÁGINA: Studio Credentials PREMIUM
// ════════════════════════════════════════════════════════════
// Versão super visual e envolvente da página de credibilidade
// - Timeline completa do banco de dados
// - Estatísticas visuais animadas
// - Curadoria de arte moderna
// - Não massante, envolvente
// ════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react'
import { type Lang } from '../i18n'
import SEO from '../components/SEO'
import LangLink from '../components/LangLink'
import CompanyTimeline from '../components/CompanyTimeline'

interface StudioCredentialsProps {
  lang: Lang
}

const StudioCredentials: React.FC<StudioCredentialsProps> = ({ lang }) => {
  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [yearsOfInnovation, setYearsOfInnovation] = useState<number>(46) // Fallback padrão

  const content = {
    pt: {
      title: 'Nossa História',
      subtitle: '46 anos transformando ideias em experiências imersivas',
      eyebrow: 'CREDIBILIDADE',
      hero: {
        bigNumber: '46',
        bigNumberLabel: 'anos de inovação',
        description: 'Da computação gráfica pioneira nos anos 80 às experiências imersivas com IA em 2026. Somos referência em animação 3D, realidade virtual e projetos audiovisuais de alto impacto.'
      },
      stats: [
        { number: '30+', label: 'Eventos Históricos', icon: '📅' },
        { number: '15+', label: 'Parcerias Globais', icon: '🤝' },
        { number: '7+', label: 'Projetos Relevantes', icon: '🚀' },
        { number: '5+', label: 'Prêmios & Reconhecimentos', icon: '🏆' }
      ],
      highlights: {
        title: 'Destaques da Trajetória',
        items: [
          {
            icon: '🌟',
            year: '2002',
            title: '1 de 15 no mundo',
            desc: 'Training Specialist Discreet Montreal - elite mundial de especialistas certificados'
          },
          {
            icon: '🏆',
            year: '2005',
            title: 'Digital Designer',
            desc: 'Pessoa do ano em computação gráfica no Brasil - MAC Niterói'
          },
          {
            icon: '🚀',
            year: '2005-2007',
            title: 'Taikodom',
            desc: 'Maior projeto de game desenvolvido no Brasil - MMORPG espacial'
          },
          {
            icon: '🏛️',
            year: '2015-2017',
            title: 'Museu Olímpico',
            desc: 'Direção Geral de Tecnologia para o Museu Olímpico do Rio 2016'
          },
          {
            icon: '🎬',
            year: '2017-2025',
            title: 'Gramado Festival',
            desc: 'Curadoria VR oficial por 8 anos consecutivos - único no Brasil'
          },
          {
            icon: '🤖',
            year: '2018-2026',
            title: 'IA + XR Pioneer',
            desc: 'Membro fundador XRBR + pesquisa IA para animação desde 1997'
          }
        ]
      },
      partnerships: {
        title: 'Parcerias que Marcaram Época',
        subtitle: 'Trabalhamos com as maiores empresas e instituições do mundo',
        items: [
          {
            icon: '🎓',
            name: 'Autodesk',
            role: 'Training Center',
            period: '1996-2018',
            highlight: 'Único na América do Sul por 22 anos',
            color: 'from-blue-500 to-cyan-500'
          },
          {
            icon: '🇨🇦',
            name: 'Discreet Logic',
            role: 'Training Specialist',
            period: '1998-2008',
            highlight: '1 de 15 especialistas certificados no mundo',
            color: 'from-red-500 to-orange-500'
          },
          {
            icon: '🎬',
            name: 'TV Globo',
            role: 'Consultoria Videographics',
            period: '1997-2004',
            highlight: 'Departamento de Hans Donner',
            color: 'from-purple-500 to-pink-500'
          },
          {
            icon: '🎮',
            name: 'Hoplon Infotainment',
            role: 'Art Direction',
            period: '2005-2007',
            highlight: 'Taikodom - maior game brasileiro',
            color: 'from-green-500 to-emerald-500'
          },
          {
            icon: '🏛️',
            name: 'Museu Olímpico',
            role: 'Direção de Tecnologia',
            period: '2015-2017',
            highlight: 'Rio 2016 - Olimpíadas',
            color: 'from-yellow-500 to-amber-500'
          },
          {
            icon: '🏆',
            name: 'XRBR',
            role: 'Membro Fundador',
            period: '2018-atual',
            highlight: 'Associação Brasileira de XR',
            color: 'from-indigo-500 to-violet-500'
          }
        ]
      },
      timeline: {
        title: 'Linha do Tempo Completa',
        subtitle: 'Explore 46 anos de história, inovação e pioneirismo',
        filters: {
          all: 'Todos',
          milestone: 'Marcos',
          partnership: 'Parcerias',
          project: 'Projetos',
          award: 'Prêmios'
        }
      },
      cta: {
        title: 'Pronto para criar algo incrível?',
        subtitle: 'Vamos transformar sua visão em realidade',
        primaryButton: 'Iniciar um Projeto',
        secondaryButton: 'Voltar para Studio'
      }
    },
    en: {
      title: 'Our History',
      subtitle: '46 years transforming ideas into immersive experiences',
      eyebrow: 'CREDIBILITY',
      hero: {
        bigNumber: '46',
        bigNumberLabel: 'years of innovation',
        description: 'From pioneering computer graphics in the 80s to immersive AI experiences in 2026. We are a reference in 3D animation, virtual reality and high-impact audiovisual projects.'
      },
      stats: [
        { number: '30+', label: 'Historical Events', icon: '📅' },
        { number: '15+', label: 'Global Partnerships', icon: '🤝' },
        { number: '7+', label: 'Relevant Projects', icon: '🚀' },
        { number: '5+', label: 'Awards & Recognition', icon: '🏆' }
      ],
      highlights: {
        title: 'Journey Highlights',
        items: [
          {
            icon: '🌟',
            year: '2002',
            title: '1 of 15 worldwide',
            desc: 'Discreet Montreal Training Specialist - global elite of certified specialists'
          },
          {
            icon: '🏆',
            year: '2005',
            title: 'Digital Designer',
            desc: 'Person of the year in computer graphics in Brazil - MAC Niterói'
          },
          {
            icon: '🚀',
            year: '2005-2007',
            title: 'Taikodom',
            desc: 'Largest game project developed in Brazil - space MMORPG'
          },
          {
            icon: '🏛️',
            year: '2015-2017',
            title: 'Olympic Museum',
            desc: 'General Technology Director for Rio 2016 Olympic Museum'
          },
          {
            icon: '🎬',
            year: '2017-2025',
            title: 'Gramado Festival',
            desc: 'Official VR curatorship for 8 consecutive years - unique in Brazil'
          },
          {
            icon: '🤖',
            year: '2018-2026',
            title: 'AI + XR Pioneer',
            desc: 'XRBR founding member + AI research for animation since 1997'
          }
        ]
      },
      partnerships: {
        title: 'Partnerships that Made History',
        subtitle: 'We worked with the world\'s largest companies and institutions',
        items: [
          {
            icon: '🎓',
            name: 'Autodesk',
            role: 'Training Center',
            period: '1996-2018',
            highlight: 'Only one in South America for 22 years',
            color: 'from-blue-500 to-cyan-500'
          },
          {
            icon: '🇨🇦',
            name: 'Discreet Logic',
            role: 'Training Specialist',
            period: '1998-2008',
            highlight: '1 of 15 certified specialists worldwide',
            color: 'from-red-500 to-orange-500'
          },
          {
            icon: '🎬',
            name: 'TV Globo',
            role: 'Videographics Consulting',
            period: '1997-2004',
            highlight: 'Hans Donner Department',
            color: 'from-purple-500 to-pink-500'
          },
          {
            icon: '🎮',
            name: 'Hoplon Infotainment',
            role: 'Art Direction',
            period: '2005-2007',
            highlight: 'Taikodom - largest Brazilian game',
            color: 'from-green-500 to-emerald-500'
          },
          {
            icon: '🏛️',
            name: 'Olympic Museum',
            role: 'Technology Direction',
            period: '2015-2017',
            highlight: 'Rio 2016 - Olympics',
            color: 'from-yellow-500 to-amber-500'
          },
          {
            icon: '🏆',
            name: 'XRBR',
            role: 'Founding Member',
            period: '2018-present',
            highlight: 'Brazilian XR Association',
            color: 'from-indigo-500 to-violet-500'
          }
        ]
      },
      timeline: {
        title: 'Complete Timeline',
        subtitle: 'Explore 46 years of history, innovation and pioneering',
        filters: {
          all: 'All',
          milestone: 'Milestones',
          partnership: 'Partnerships',
          project: 'Projects',
          award: 'Awards'
        }
      },
      cta: {
        title: 'Ready to create something amazing?',
        subtitle: 'Let\'s turn your vision into reality',
        primaryButton: 'Start a Project',
        secondaryButton: 'Back to Studio'
      }
    },
    es: {
      title: 'Nuestra Historia',
      subtitle: '46 años transformando ideas en experiencias inmersivas',
      eyebrow: 'CREDIBILIDAD',
      hero: {
        bigNumber: '46',
        bigNumberLabel: 'años de innovación',
        description: 'Desde la computación gráfica pionera en los 80 hasta experiencias inmersivas con IA en 2026. Somos referencia en animación 3D, realidad virtual y proyectos audiovisuales de alto impacto.'
      },
      stats: [
        { number: '30+', label: 'Eventos Históricos', icon: '📅' },
        { number: '15+', label: 'Alianzas Globales', icon: '🤝' },
        { number: '7+', label: 'Proyectos Relevantes', icon: '🚀' },
        { number: '5+', label: 'Premios & Reconocimientos', icon: '🏆' }
      ],
      highlights: {
        title: 'Momentos Destacados',
        items: [
          {
            icon: '🌟',
            year: '2002',
            title: '1 de 15 en el mundo',
            desc: 'Training Specialist Discreet Montreal - élite mundial de especialistas certificados'
          },
          {
            icon: '🏆',
            year: '2005',
            title: 'Digital Designer',
            desc: 'Persona del año en computación gráfica en Brasil - MAC Niterói'
          },
          {
            icon: '🚀',
            year: '2005-2007',
            title: 'Taikodom',
            desc: 'Mayor proyecto de juego desarrollado en Brasil - MMORPG espacial'
          },
          {
            icon: '🏛️',
            year: '2015-2017',
            title: 'Museo Olímpico',
            desc: 'Dirección General de Tecnología para el Museo Olímpico de Río 2016'
          },
          {
            icon: '🎬',
            year: '2017-2025',
            title: 'Festival de Gramado',
            desc: 'Curaduría VR oficial por 8 años consecutivos - único en Brasil'
          },
          {
            icon: '🤖',
            year: '2018-2026',
            title: 'Pionero IA + XR',
            desc: 'Miembro fundador XRBR + investigación IA para animación desde 1997'
          }
        ]
      },
      partnerships: {
        title: 'Alianzas que Marcaron Época',
        subtitle: 'Trabajamos con las mayores empresas e instituciones del mundo',
        items: [
          {
            icon: '🎓',
            name: 'Autodesk',
            role: 'Training Center',
            period: '1996-2018',
            highlight: 'Único en América del Sur por 22 años',
            color: 'from-blue-500 to-cyan-500'
          },
          {
            icon: '🇨🇦',
            name: 'Discreet Logic',
            role: 'Training Specialist',
            period: '1998-2008',
            highlight: '1 de 15 especialistas certificados en el mundo',
            color: 'from-red-500 to-orange-500'
          },
          {
            icon: '🎬',
            name: 'TV Globo',
            role: 'Consultoría Videographics',
            period: '1997-2004',
            highlight: 'Departamento de Hans Donner',
            color: 'from-purple-500 to-pink-500'
          },
          {
            icon: '🎮',
            name: 'Hoplon Infotainment',
            role: 'Dirección de Arte',
            period: '2005-2007',
            highlight: 'Taikodom - mayor juego brasileño',
            color: 'from-green-500 to-emerald-500'
          },
          {
            icon: '🏛️',
            name: 'Museo Olímpico',
            role: 'Dirección de Tecnología',
            period: '2015-2017',
            highlight: 'Río 2016 - Olimpiadas',
            color: 'from-yellow-500 to-amber-500'
          },
          {
            icon: '🏆',
            name: 'XRBR',
            role: 'Miembro Fundador',
            period: '2018-actual',
            highlight: 'Asociación Brasileña de XR',
            color: 'from-indigo-500 to-violet-500'
          }
        ]
      },
      timeline: {
        title: 'Línea de Tiempo Completa',
        subtitle: 'Explora 46 años de historia, innovación y pionerismo',
        filters: {
          all: 'Todos',
          milestone: 'Hitos',
          partnership: 'Alianzas',
          project: 'Proyectos',
          award: 'Premios'
        }
      },
      cta: {
        title: '¿Listo para crear algo increíble?',
        subtitle: 'Transformemos tu visión en realidad',
        primaryButton: 'Iniciar un Proyecto',
        secondaryButton: 'Volver al Estudio'
      }
    },
    fr: {
      title: 'Notre Histoire',
      subtitle: '46 ans à transformer des idées en expériences immersives',
      eyebrow: 'CRÉDIBILITÉ',
      hero: {
        bigNumber: '46',
        bigNumberLabel: 'ans d\'innovation',
        description: 'De l\'infographie pionnière des années 80 aux expériences immersives avec IA en 2026. Nous sommes une référence en animation 3D, réalité virtuelle et projets audiovisuels à fort impact.'
      },
      stats: [
        { number: '30+', label: 'Événements Historiques', icon: '📅' },
        { number: '15+', label: 'Partenariats Mondiaux', icon: '🤝' },
        { number: '7+', label: 'Projets Pertinents', icon: '🚀' },
        { number: '5+', label: 'Prix & Reconnaissances', icon: '🏆' }
      ],
      highlights: {
        title: 'Points Forts du Parcours',
        items: [
          {
            icon: '🌟',
            year: '2002',
            title: '1 sur 15 dans le monde',
            desc: 'Training Specialist Discreet Montreal - élite mondiale de spécialistes certifiés'
          },
          {
            icon: '🏆',
            year: '2005',
            title: 'Digital Designer',
            desc: 'Personne de l\'année en infographie au Brésil - MAC Niterói'
          },
          {
            icon: '🚀',
            year: '2005-2007',
            title: 'Taikodom',
            desc: 'Plus grand projet de jeu développé au Brésil - MMORPG spatial'
          },
          {
            icon: '🏛️',
            year: '2015-2017',
            title: 'Musée Olympique',
            desc: 'Direction Générale de la Technologie pour le Musée Olympique de Rio 2016'
          },
          {
            icon: '🎬',
            year: '2017-2025',
            title: 'Festival de Gramado',
            desc: 'Curation VR officielle pendant 8 années consécutives - unique au Brésil'
          },
          {
            icon: '🤖',
            year: '2018-2026',
            title: 'Pionnier IA + XR',
            desc: 'Membre fondateur XRBR + recherche IA pour l\'animation depuis 1997'
          }
        ]
      },
      partnerships: {
        title: 'Partenariats qui ont Marqué l\'Époque',
        subtitle: 'Nous avons travaillé avec les plus grandes entreprises et institutions du monde',
        items: [
          {
            icon: '🎓',
            name: 'Autodesk',
            role: 'Training Center',
            period: '1996-2018',
            highlight: 'Seul en Amérique du Sud pendant 22 ans',
            color: 'from-blue-500 to-cyan-500'
          },
          {
            icon: '🇨🇦',
            name: 'Discreet Logic',
            role: 'Training Specialist',
            period: '1998-2008',
            highlight: '1 sur 15 spécialistes certifiés dans le monde',
            color: 'from-red-500 to-orange-500'
          },
          {
            icon: '🎬',
            name: 'TV Globo',
            role: 'Conseil Videographics',
            period: '1997-2004',
            highlight: 'Département de Hans Donner',
            color: 'from-purple-500 to-pink-500'
          },
          {
            icon: '🎮',
            name: 'Hoplon Infotainment',
            role: 'Direction Artistique',
            period: '2005-2007',
            highlight: 'Taikodom - plus grand jeu brésilien',
            color: 'from-green-500 to-emerald-500'
          },
          {
            icon: '🏛️',
            name: 'Musée Olympique',
            role: 'Direction de la Technologie',
            period: '2015-2017',
            highlight: 'Rio 2016 - Jeux Olympiques',
            color: 'from-yellow-500 to-amber-500'
          },
          {
            icon: '🏆',
            name: 'XRBR',
            role: 'Membre Fondateur',
            period: '2018-présent',
            highlight: 'Association Brésilienne de XR',
            color: 'from-indigo-500 to-violet-500'
          }
        ]
      },
      timeline: {
        title: 'Chronologie Complète',
        subtitle: 'Explorez 46 ans d\'histoire, d\'innovation et de pionnier',
        filters: {
          all: 'Tous',
          milestone: 'Jalons',
          partnership: 'Partenariats',
          project: 'Projets',
          award: 'Prix'
        }
      },
      cta: {
        title: 'Prêt à créer quelque chose d\'incroyable?',
        subtitle: 'Transformons votre vision en réalité',
        primaryButton: 'Démarrer un Projet',
        secondaryButton: 'Retour au Studio'
      }
    }
  }

  const t = content[lang]

  // Calcular anos de inovação dinamicamente a partir da timeline
  useEffect(() => {
    const calculateYears = async () => {
      try {
        const apiUrl = import.meta.env.VITE_BACKOFFICE_URL || import.meta.env.VITE_CMS_API_URL || 'https://backoffice.azmt.com.br'
        const response = await fetch(`${apiUrl}/api/public/history?lang=${lang}`)
        
        if (response.ok) {
          const data = await response.json()
          if (data.success && Array.isArray(data.data) && data.data.length > 0) {
            const oldestYear = Math.min(...data.data.map((item: any) => item.year))
            const currentYear = new Date().getFullYear()
            const calculatedYears = currentYear - oldestYear
            // Usar o maior entre o calculado e 46 (para não diminuir se houver dados antigos)
            setYearsOfInnovation(Math.max(calculatedYears, 46))
          }
        }
      } catch (err) {
        // Manter fallback 46 em caso de erro
        console.warn('[StudioCredentials] Não foi possível calcular anos dinamicamente, usando fallback:', err)
      }
    }
    
    calculateYears()
  }, [lang])

  // Atualizar conteúdo com número dinâmico
  const dynamicContent = {
    ...t,
    subtitle: t.subtitle.replace('46', yearsOfInnovation.toString()),
    hero: {
      ...t.hero,
      bigNumber: yearsOfInnovation.toString(),
    },
    timeline: {
      ...t.timeline,
      subtitle: t.timeline.subtitle.replace('46', yearsOfInnovation.toString()),
    }
  }

  return (
    <>
      <SEO 
        lang={lang}
        title={`${t.title} - Studio - Azimut`}
        description={t.subtitle}
        path="/studio/credibilidade"
      />
      
      <main className="relative">
        {/* Star Background - FIXA */}
        <div 
          className="pointer-events-none fixed top-20 -right-28 h-[520px] w-[520px] md:top-24 md:-right-40 md:h-[680px] md:w-[680px] opacity-30"
          style={{ zIndex: -10 }}
        >
          <img src="/logo-azimut-star.svg" alt="" className="h-full w-full object-contain" loading="lazy" />
        </div>

        {/* HERO SECTION - IMPACTANTE */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="container-padding max-w-7xl mx-auto">
            {/* Breadcrumbs */}
            <nav className="mb-8 flex items-center gap-2 text-sm text-theme-text-secondary">
              <LangLink to="/" className="hover:text-azimut-red transition-colors">Home</LangLink>
              <span>›</span>
              <LangLink to="/studio" className="hover:text-azimut-red transition-colors">Studio</LangLink>
              <span>›</span>
              <span className="text-azimut-red font-medium">{t.title}</span>
            </nav>

            {/* Hero Content */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Text */}
              <div>
                <span className="section-eyebrow mb-6">
                  <span>🏆</span>
                  {t.eyebrow}
                </span>
                
                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                  {dynamicContent.title}
                </h1>
                
                <p className="text-xl md:text-2xl text-white/70 mb-8 leading-relaxed">
                  {dynamicContent.subtitle}
                </p>

                <p className="text-lg text-white/60 leading-relaxed">
                  {dynamicContent.hero.description}
                </p>
              </div>

              {/* Right: Big Number */}
              <div className="relative">
                <div className="relative z-10 bg-gradient-to-br from-azimut-red/20 to-purple-500/20 backdrop-blur-sm border border-azimut-red/30 rounded-3xl p-12 text-center">
                  <div className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-br from-azimut-red via-orange-500 to-yellow-500 leading-none mb-4">
                    {dynamicContent.hero.bigNumber}
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-white uppercase tracking-wider">
                    {dynamicContent.hero.bigNumberLabel}
                  </div>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-azimut-red/30 to-purple-500/30 blur-3xl -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* STATS SECTION - VISUAL */}
        <section className="py-16 bg-gradient-to-b from-slate-900/50 to-transparent">
          <div className="container-padding max-w-7xl mx-auto">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {t.stats.map((stat, i) => (
                <div 
                  key={i}
                  className="relative group"
                >
                  <div className="card-adaptive rounded-2xl p-8 text-center h-full hover:scale-105 transition-transform duration-300">
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                      {stat.icon}
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-azimut-red to-orange-500 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-sm md:text-base text-white/70 font-medium uppercase tracking-wide">
                      {stat.label}
                    </div>
                  </div>
                  {/* Glow on hover */}
                  <div className="absolute inset-0 bg-azimut-red/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10 rounded-2xl" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HIGHLIGHTS SECTION - CARDS GRANDES */}
        <section className="py-20">
          <div className="container-padding max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {t.highlights.title}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-azimut-red to-transparent mx-auto" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {t.highlights.items.map((item, i) => (
                <div 
                  key={i}
                  className="group relative"
                >
                  <div className="card-adaptive rounded-2xl p-8 h-full hover:border-azimut-red/50 transition-all duration-300">
                    {/* Icon */}
                    <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                      {item.icon}
                    </div>
                    
                    {/* Year badge */}
                    <div className="inline-block px-4 py-1 bg-azimut-red/20 rounded-full text-azimut-red font-mono text-sm font-bold mb-4">
                      {item.year}
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-azimut-red transition-colors">
                      {item.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-white/70 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  
                  {/* Glow on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-azimut-red/10 to-purple-500/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity -z-10 rounded-2xl" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PARTNERSHIPS SECTION - CARDS COM GRADIENTES */}
        <section className="py-20 bg-gradient-to-b from-transparent via-slate-900/30 to-transparent">
          <div className="container-padding max-w-7xl mx-auto">
            <div className="text-center mb-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {t.partnerships.title}
              </h2>
              <p className="text-xl text-white/60 max-w-3xl mx-auto mb-8">
                {t.partnerships.subtitle}
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-azimut-red to-transparent mx-auto" />
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {t.partnerships.items.map((partner, i) => (
                <div 
                  key={i}
                  className="group relative overflow-hidden rounded-2xl"
                >
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${partner.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                  
                  <div className="relative card-adaptive rounded-2xl p-6 h-full hover:border-azimut-red/30 transition-all">
                    {/* Icon */}
                    <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">
                      {partner.icon}
                    </div>
                    
                    {/* Name */}
                    <h3 className="text-xl font-bold text-white mb-2">
                      {partner.name}
                    </h3>
                    
                    {/* Role */}
                    <div className="text-sm text-azimut-red font-semibold mb-2 uppercase tracking-wide">
                      {partner.role}
                    </div>
                    
                    {/* Period */}
                    <div className="text-sm text-white/50 font-mono mb-3">
                      {partner.period}
                    </div>
                    
                    {/* Highlight */}
                    <p className="text-sm text-white/70 leading-relaxed">
                      {partner.highlight}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TIMELINE COMPLETA SECTION - NOSSA HISTÓRIA */}
        <section className="py-20 bg-gradient-to-b from-transparent via-slate-900/20 to-transparent">
          <div className="container-padding max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <span className="section-eyebrow mb-4">
                <span>📅</span>
                {lang === 'pt' ? 'Nossa História' : lang === 'en' ? 'Our History' : lang === 'es' ? 'Nuestra Historia' : 'Notre Histoire'}
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {dynamicContent.timeline.title}
              </h2>
              <p className="text-xl text-white/60 max-w-3xl mx-auto mb-4">
                {dynamicContent.timeline.subtitle}
              </p>
              <div className="w-full max-w-md h-0.5 bg-gradient-to-r from-transparent via-azimut-red to-transparent mx-auto" />
            </div>

            {/* Filtros */}
            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
              {Object.entries(dynamicContent.timeline.filters).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  className={`px-6 py-2 rounded-full font-medium transition-all ${
                    activeFilter === key
                      ? 'bg-azimut-red text-white shadow-lg shadow-azimut-red/30'
                      : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Timeline Component */}
            <div className="relative">
              <CompanyTimeline
                lang={lang}
                type={activeFilter === 'all' ? undefined : activeFilter}
                layout="vertical"
                className="max-w-5xl mx-auto"
              />
            </div>
          </div>
        </section>

        {/* CTA FINAL - IMPACTANTE */}
        <section className="py-20 bg-gradient-to-b from-transparent to-slate-900/50">
          <div className="container-padding max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {dynamicContent.cta.title}
            </h2>
            <p className="text-xl text-white/60 mb-12">
              {dynamicContent.cta.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <LangLink
                to="/contact"
                className="group inline-flex items-center gap-3 px-10 py-5 rounded-xl bg-gradient-to-r from-azimut-red to-orange-600 text-white font-bold uppercase tracking-wider hover:shadow-2xl hover:shadow-azimut-red/50 transition-all transform hover:scale-105"
              >
                {dynamicContent.cta.primaryButton}
                <span className="text-xl group-hover:translate-x-1 transition-transform">→</span>
              </LangLink>
              
              <LangLink
                to="/studio"
                className="group inline-flex items-center gap-3 px-10 py-5 rounded-xl border-2 border-white/20 text-white hover:bg-white hover:text-black transition-all font-bold uppercase tracking-wider"
              >
                <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
                {dynamicContent.cta.secondaryButton}
              </LangLink>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default StudioCredentials
