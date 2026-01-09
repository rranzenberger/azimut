// ════════════════════════════════════════════════════════════
// ACADEMY HUB - REDESIGN PREMIUM 2026
// ════════════════════════════════════════════════════════════
// Página principal da Academy com estrutura visual completa
// Placeholders para imagens/vídeos que virão do backoffice
// ════════════════════════════════════════════════════════════

import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { type Lang } from '../i18n'
// import { VideoPlayerEnhanced } from '../components/VideoPlayerEnhanced' // TODO: Fix import
// import { VideoCard } from '../components/VideoCard' // TODO: Fix import
import { useUserTracking } from '../hooks/useUserTracking'

interface AcademyProps {
  lang: Lang
}

const Academy: React.FC<AcademyProps> = ({ lang }) => {
  useUserTracking()

  // ═══════════════════════════════════════════════════════════
  // CONTEÚDO POR IDIOMA
  // ═══════════════════════════════════════════════════════════
  const content = {
    pt: {
      hero: {
        badge: '🎓 Educação & Formação',
        title: 'Azimut Academy',
        subtitle: 'Forme-se com quem tem 30 anos de mercado',
        description: 'Cursos, workshops, treinamentos corporativos e agente educacional para Vancouver. Educação de excelência em tecnologias imersivas, IA e produção audiovisual.'
      },
      
      sections: [
        {
          id: 'vancouver',
          icon: '🍁',
          title: 'Estudar em Vancouver',
          description: 'Agente oficial VFS/VanArts. Forme-se em 1 ano nas melhores escolas de mídia do Canadá com 90%+ empregabilidade.',
          link: '/academy/vancouver',
          badge: 'Internacional',
          stats: [
            { label: 'Empregabilidade', value: '90%+' },
            { label: 'Duração', value: '1 ano' }
          ]
        },
        {
          id: 'courses',
          icon: '📚',
          title: 'Cursos & Workshops',
          description: 'Formação profissional em VR, IA, Motion Design, VFX e tecnologias imersivas. Turmas pequenas, 100% prático.',
          link: '/academy/courses',
          badge: 'Prático',
          stats: [
            { label: 'Turmas', value: 'Até 12 alunos' },
            { label: 'Formato', value: 'Intensivo' }
          ]
        },
        {
          id: 'workshops',
          icon: '🎬',
          title: 'Workshops & Eventos',
          description: 'Workshops curtos, palestras e mini-cursos em eventos, festivais, empresas e instituições.',
          link: '/academy/workshops',
          badge: 'Eventos',
          stats: [
            { label: 'Duração', value: '4h a 3 dias' },
            { label: 'Local', value: 'In-company' }
          ]
        },
        {
          id: 'corporate',
          icon: '🏢',
          title: 'Treinamento Corporativo',
          description: 'Programas customizados para empresas, órgãos públicos, ONGs e instituições. Consultoria e capacitação de equipes.',
          link: '/academy/corporate',
          badge: 'B2B',
          stats: [
            { label: 'Sob medida', value: '100%' },
            { label: 'Clientes', value: 'Globo, Gov, etc' }
          ]
        }
      ],

      videoSection: {
        title: 'Conheça Nossa História Educacional',
        subtitle: 'De 2004 a 2018 fomos a Azimut School. Hoje compartilhamos conhecimento através da Academy.'
      },

      statsSection: {
        title: 'Números que Importam',
        stats: [
          { value: '30+', label: 'Anos de Experiência' },
          { value: '14', label: 'Anos como Escola' },
          { value: '500+', label: 'Alunos Formados' },
          { value: '4', label: 'Programas Educacionais' }
        ]
      },

      instructors: {
        title: 'Professores & Parceiros',
        subtitle: 'Coordenadores de pós-graduação, doutores e profissionais com décadas de mercado',
        list: [
          {
            name: 'Alberto Luchetti',
            role: 'Coordenador & PhD',
            bio: 'Coordenador de pós-graduação, professor e pesquisador UFRJ/ECO',
            photo: '/instructors/alberto.jpg' // PLACEHOLDER
          },
          // Adicionar mais conforme necessário
        ]
      },

      cta: {
        title: 'Pronto para Começar?',
        subtitle: 'Entre em contato para saber mais sobre nossos programas',
        button: 'Falar com Consultor'
      }
    },
    en: {
      // ... (adicionar traduções depois)
    },
    es: {
      // ...
    },
    fr: {
      // ...
    }
  }

  const t = content.pt // Sempre usar PT por enquanto (TODO: adicionar EN, ES, FR)

  return (
    <>
      <Helmet>
        <title>{t.hero.title} | Azimut</title>
        <meta name="description" content={t.hero.description} />
      </Helmet>

      <div className="min-h-screen">
        {/* ═══════════════════════════════════════════════════════════
            HERO SECTION - Video Background
            ═══════════════════════════════════════════════════════════
            📹 PLACEHOLDER: Vídeo institucional Academy
            Backoffice: /admin/academy/settings → "Hero Video URL"
            ═══════════════════════════════════════════════════════ */}
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
          {/* Background Video (PLACEHOLDER) */}
          <div className="absolute inset-0 z-0">
            {/* TODO: Adicionar vídeo do backoffice */}
            <div 
              className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-black"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600)',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/90" />
            </div>
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-block px-4 py-2 bg-azimut-red/20 border border-azimut-red/40 rounded-full mb-6">
              <span className="text-azimut-red text-sm font-semibold uppercase tracking-wider">
                {t.hero.badge}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-handel uppercase tracking-wider text-white mb-6 leading-tight">
              {t.hero.title}
            </h1>

            <p className="text-2xl md:text-3xl text-white/90 mb-4 font-light">
              {t.hero.subtitle}
            </p>

            <p className="text-lg md:text-xl text-white/70 mb-10 max-w-3xl mx-auto leading-relaxed">
              {t.hero.description}
            </p>

            {/* Scroll Indicator */}
            <div className="animate-bounce">
              <svg className="w-6 h-6 mx-auto text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            SECTIONS GRID - 4 Programas
            ═══════════════════════════════════════════════════════════
            🖼️ PLACEHOLDER: Imagens dos programas
            Backoffice: /admin/academy/programs → cada programa tem imagem
            ═══════════════════════════════════════════════════════ */}
        <section className="py-20 bg-gradient-to-b from-black to-[#0a0e18]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {t.sections.map((section, idx) => (
                <Link
                  key={section.id}
                  to={`/${lang}${section.link}`}
                  className="group card-adaptive rounded-2xl overflow-hidden border border-white/10 hover:border-azimut-red/50 transition-all duration-500 hover:shadow-2xl hover:shadow-azimut-red/20 hover:-translate-y-2"
                >
                  {/* Image/Video Thumbnail (PLACEHOLDER) */}
                  <div className="relative aspect-video overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                      <span className="text-8xl opacity-30">{section.icon}</span>
                    </div>
                    {/* TODO: Imagem real do backoffice */}
                    {/* <img src={section.imageUrl} alt={section.title} /> */}
                    
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                    
                    {/* Badge */}
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 rounded-full bg-azimut-red text-white text-xs font-semibold uppercase tracking-wider">
                        {section.badge}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-4xl">{section.icon}</span>
                      <h3 className="text-2xl font-bold text-white group-hover:text-azimut-red transition-colors">
                        {section.title}
                      </h3>
                    </div>

                    <p className="text-white/70 mb-4 leading-relaxed">
                      {section.description}
                    </p>

                    {/* Stats */}
                    <div className="flex gap-4 mb-4">
                      {section.stats.map((stat, i) => (
                        <div key={i} className="flex-1">
                          <div className="text-azimut-red font-bold">{stat.value}</div>
                          <div className="text-xs text-white/60">{stat.label}</div>
                        </div>
                      ))}
                    </div>

                    {/* Link Arrow */}
                    <div className="flex items-center gap-2 text-azimut-red font-semibold group-hover:gap-3 transition-all">
                      Saiba mais
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            VIDEO SECTION - História Educacional
            ═══════════════════════════════════════════════════════════
            📹 PLACEHOLDER: Vídeo sobre história da Azimut School
            Backoffice: /admin/academy/videos → "História Educacional"
            ═══════════════════════════════════════════════════════ */}
        <section className="py-20 bg-gradient-to-b from-[#0a0e18] to-black">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider text-white mb-4">
                {t.videoSection.title}
              </h2>
              <p className="text-lg text-white/70">
                {t.videoSection.subtitle}
              </p>
            </div>

            {/* Video Card (PLACEHOLDER) */}
            <div className="card-adaptive rounded-xl p-6 border border-white/10 text-center">
              <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-6xl opacity-30">▶️</span>
              </div>
              <h4 className="text-white font-semibold mb-2">14 Anos Formando Profissionais</h4>
              <p className="text-white/60 text-sm">De 2004 a 2018, a Azimut School foi referência em animação e VFX.</p>
            </div>

            {/* Info Box */}
            <div className="mt-8 p-6 card-adaptive rounded-xl border border-white/10 text-center">
              <p className="text-white/80 leading-relaxed">
                <strong className="text-azimut-red">2004-2018:</strong> Azimut School. 
                Único Autodesk Training Center da América do Sul. 
                Certificado Flame Trainer (único no Brasil). 
                Centenas de profissionais formados para o mercado.
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            STATS SECTION - Números
            ═══════════════════════════════════════════════════════ */}
        <section className="py-16 bg-gradient-to-b from-black to-[#0a0e18]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-handel uppercase tracking-wider text-white mb-4">
                {t.statsSection.title}
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {t.statsSection.stats.map((stat, i) => (
                <div key={i} className="text-center card-adaptive p-6 rounded-xl border border-white/10">
                  <div className="text-4xl md:text-5xl font-bold text-azimut-red mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/60 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            INSTRUCTORS SECTION
            ═══════════════════════════════════════════════════════════
            🖼️ PLACEHOLDER: Fotos dos professores
            Backoffice: /admin/academy/instructors
            ═══════════════════════════════════════════════════════ */}
        <section className="py-20 bg-gradient-to-b from-[#0a0e18] to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider text-white mb-4">
                {t.instructors.title}
              </h2>
              <p className="text-lg text-white/70">
                {t.instructors.subtitle}
              </p>
            </div>

            {/* Instructors Grid (PLACEHOLDER) */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Placeholder Cards */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="card-adaptive rounded-xl p-6 border border-white/10 text-center">
                  {/* Photo Placeholder */}
                  <div className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-azimut-red/30 to-slate-800 mb-4 flex items-center justify-center">
                    <span className="text-4xl">👤</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    Professor {i}
                  </h3>
                  <p className="text-sm text-azimut-red mb-2">
                    Especialização
                  </p>
                  <p className="text-xs text-white/60">
                    Bio placeholder - adicionar no backoffice
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-white/60 text-sm">
                📌 <strong>BACKOFFICE:</strong> /admin/academy/instructors → Adicionar fotos e bios
              </p>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════
            CTA FINAL
            ═══════════════════════════════════════════════════════ */}
        <section className="py-20 bg-gradient-to-b from-black to-[#0a0e18]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider text-white mb-6">
              {t.cta.title}
            </h2>
            <p className="text-xl text-white/70 mb-8">
              {t.cta.subtitle}
            </p>
            <Link
              to={`/${lang}/contact`}
              className="inline-block px-8 py-4 bg-azimut-red hover:bg-azimut-red/90 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-azimut-red/50 hover:scale-105"
            >
              {t.cta.button} →
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}

export default Academy
