// ════════════════════════════════════════════════════════════
// ACADEMY CORPORATE - REDESIGN PREMIUM 2026
// ═══════════════════════════════════════════════════════════
// Página de Treinamento Corporativo e Consultoria
// Placeholders para logos, cases e depoimentos do backoffice
// ════════════════════════════════════════════════════════════

import React from 'react'
import { Helmet } from 'react-helmet-async'
import { type Lang } from '../i18n'
// import { VideoCard } from '../components/VideoCard' // TODO: Fix import
import { useUserTracking } from '../hooks/useUserTracking'

interface AcademyCorporateProps {
  lang: Lang
}

const AcademyCorporate: React.FC<AcademyCorporateProps> = ({ lang }) => {
  useUserTracking()

  const content = {
    pt: {
      hero: {
        badge: '🏢 Soluções B2B',
        title: 'Treinamento Corporativo',
        subtitle: 'Programas sob medida para empresas',
        description: 'Capacitação de equipes, consultoria especializada e desenvolvimento de projetos customizados. Atendemos grandes corporações, órgãos públicos, ONGs e instituições.'
      },

      formats: [
        {
          id: 'incompany',
          title: 'In-Company',
          description: 'Treinamentos na sua empresa. Programas adaptados às necessidades específicas da sua equipe.',
          icon: '🏢',
          features: [
            'Programa customizado',
            'Turmas fechadas',
            'Horário flexível',
            'Material específico'
          ]
        },
        {
          id: 'consulting',
          title: 'Consultoria Especializada',
          description: 'Acompanhamento em projetos específicos. Mentoria técnica e estratégica para equipes de inovação.',
          icon: '💼',
          features: [
            'Análise de demanda',
            'Suporte técnico',
            'Desenvolvimento de pipeline',
            'Mentoria contínua'
          ]
        },
        {
          id: 'development',
          title: 'Capacitação de Equipes',
          description: 'Programas de formação contínua. Desenvolvimento de competências em tecnologias imersivas e IA.',
          icon: '👥',
          features: [
            'Roadmap de aprendizado',
            'Avaliação de progressão',
            'Certificação',
            'Suporte pós-curso'
          ]
        }
      ],

      clients: {
        title: 'Clientes & Parcerias',
        subtitle: 'Empresas e instituições que confiam no nosso trabalho',
        logos: [
          { name: 'Globo', logo: '/clients/globo-logo.png' }, // PLACEHOLDER
          { name: 'Petrobras', logo: '/clients/petrobras-logo.png' },
          { name: 'Governo Federal', logo: '/clients/gov-logo.png' },
          { name: 'SESC', logo: '/clients/sesc-logo.png' },
          { name: 'SENAC', logo: '/clients/senac-logo.png' },
          { name: 'UFRJ', logo: '/clients/ufrj-logo.png' },
          { name: 'Museu do Amanhã', logo: '/clients/museu-logo.png' },
          { name: 'Vale', logo: '/clients/vale-logo.png' }
        ]
      },

      cases: {
        title: 'Cases de Sucesso',
        subtitle: 'Resultados reais em projetos corporativos',
        items: [
          {
            id: 'globo-vr',
            client: 'Globo',
            title: 'Treinamento VR para Equipe de Produção',
            description: 'Capacitação de 20 profissionais em produção de conteúdo VR 360° para jornalismo imersivo.',
            results: [
              '20 profissionais capacitados',
              '5 reportagens VR produzidas',
              '2 prêmios internacionais'
            ],
            cover: '/cases/globo-vr-cover.jpg', // PLACEHOLDER
            videoUrl: '' // TODO
          },
          {
            id: 'petrobras-safety',
            client: 'Petrobras',
            title: 'Treinamento de Segurança em VR',
            description: 'Desenvolvimento de simulações VR para treinamento de segurança em plataformas offshore.',
            results: [
              '500+ colaboradores treinados',
              '40% redução de acidentes',
              'ROI de 300% em 12 meses'
            ],
            cover: '/cases/petrobras-safety-cover.jpg',
            videoUrl: ''
          },
          {
            id: 'museu-interactive',
            client: 'Museu do Amanhã',
            title: 'Instalações Interativas',
            description: 'Consultoria e desenvolvimento de experiências interativas para exposição permanente.',
            results: [
              '3 instalações desenvolvidas',
              '500k+ visitantes impactados',
              'Prêmio APCA 2019'
            ],
            cover: '/cases/museu-interactive-cover.jpg',
            videoUrl: ''
          }
        ]
      },

      testimonials: {
        title: 'Depoimentos',
        items: [
          {
            name: 'Maria Santos',
            role: 'Diretora de Inovação, Globo',
            text: 'A Azimut foi fundamental para capacitar nossa equipe em VR. Profissionalismo e expertise de ponta.',
            photo: '/testimonials/maria.jpg' // PLACEHOLDER
          },
          {
            name: 'João Silva',
            role: 'Gerente de Treinamento, Petrobras',
            text: 'ROI excepcional. O investimento em VR para treinamento de segurança se pagou em menos de 1 ano.',
            photo: '/testimonials/joao.jpg'
          }
        ]
      },

      stats: {
        title: 'Números',
        items: [
          { value: '50+', label: 'Empresas Atendidas' },
          { value: '2000+', label: 'Profissionais Capacitados' },
          { value: '95%', label: 'Satisfação' },
          { value: '200%', label: 'ROI Médio' }
        ]
      },

      sectors: {
        title: 'Setores Atendidos',
        items: [
          { icon: '📺', name: 'Mídia & Entretenimento' },
          { icon: '🏭', name: 'Indústria & Energia' },
          { icon: '🏛️', name: 'Cultura & Museus' },
          { icon: '🏛️', name: 'Governo & Órgãos Públicos' },
          { icon: '🎓', name: 'Educação' },
          { icon: '🏥', name: 'Saúde' },
          { icon: '🏗️', name: 'Construção & Engenharia' },
          { icon: '💼', name: 'Consultorias & Agências' }
        ]
      },

      cta: {
        title: 'Vamos Conversar sobre Seu Projeto?',
        subtitle: 'Agende uma conversa para entender como podemos ajudar sua empresa',
        button: 'Solicitar Proposta',
        contact: 'Ou envie um email: corporate@azmt.com.br'
      }
    }
  }

  const t = content[lang] || content.pt

  return (
    <>
      <Helmet>
        <title>{t.hero.title} | Azimut Academy</title>
        <meta name="description" content={t.hero.description} />
      </Helmet>

      <div className="min-h-screen bg-black">
        {/* HERO */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div 
              className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-900"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1600)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.3
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-block px-4 py-2 bg-azimut-red/20 border border-azimut-red/40 rounded-full mb-6">
                <span className="text-azimut-red text-sm font-semibold uppercase tracking-wider">
                  {t.hero.badge}
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-handel uppercase tracking-wider text-white mb-6">
                {t.hero.title}
              </h1>

              <p className="text-2xl text-white/90 mb-4">
                {t.hero.subtitle}
              </p>

              <p className="text-lg text-white/70 mb-10 leading-relaxed">
                {t.hero.description}
              </p>
            </div>
          </div>
        </section>

        {/* FORMATS */}
        <section className="py-20 bg-gradient-to-b from-black to-[#0a0e18]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8">
              {t.formats.map(format => (
                <div key={format.id} className="card-adaptive p-8 rounded-xl border border-white/10 hover:border-azimut-red/50 transition-all">
                  <div className="text-5xl mb-4">{format.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-3">{format.title}</h3>
                  <p className="text-white/70 mb-6">{format.description}</p>
                  <ul className="space-y-2">
                    {format.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-white/60">
                        <span className="text-azimut-red">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CLIENTS LOGOS - PLACEHOLDER */}
        <section className="py-20 bg-gradient-to-b from-[#0a0e18] to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider text-white mb-4">
                {t.clients.title}
              </h2>
              <p className="text-lg text-white/70">{t.clients.subtitle}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {t.clients.logos.map((client, i) => (
                <div key={i} className="card-adaptive p-6 rounded-xl border border-white/10 flex items-center justify-center aspect-video hover:border-azimut-red/50 transition-all">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🏢</div>
                    <div className="text-white text-sm">{client.name}</div>
                  </div>
                  {/* TODO: Logo real */}
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-white/60 text-sm">
                📌 <strong>BACKOFFICE:</strong> /admin/academy/corporate/clients → Upload logos
              </p>
            </div>
          </div>
        </section>

        {/* CASES - PLACEHOLDER */}
        <section className="py-20 bg-gradient-to-b from-black to-[#0a0e18]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider text-white mb-4">
                {t.cases.title}
              </h2>
              <p className="text-lg text-white/70">{t.cases.subtitle}</p>
            </div>

            <div className="space-y-12">
              {t.cases.items.map((caseItem, i) => (
                <article key={caseItem.id} className={`card-adaptive rounded-2xl overflow-hidden border border-white/10 ${i % 2 === 0 ? 'md:flex' : 'md:flex md:flex-row-reverse'}`}>
                  {/* Cover Image (PLACEHOLDER) */}
                  <div className="md:w-1/2 aspect-video bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                    <span className="text-8xl opacity-30">📊</span>
                    {/* TODO: Imagem real */}
                  </div>

                  {/* Content */}
                  <div className="md:w-1/2 p-8">
                    <div className="text-azimut-red text-sm font-semibold uppercase tracking-wider mb-2">
                      {caseItem.client}
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">
                      {caseItem.title}
                    </h3>
                    <p className="text-white/70 mb-6">
                      {caseItem.description}
                    </p>

                    <div className="space-y-3 mb-6">
                      <div className="text-white font-semibold">Resultados:</div>
                      {caseItem.results.map((result, j) => (
                        <div key={j} className="flex items-center gap-2 text-sm text-white/60">
                          <span className="text-azimut-red text-xl">✓</span>
                          {result}
                        </div>
                      ))}
                    </div>

                    <button className="px-6 py-3 bg-azimut-red text-white font-semibold rounded-lg hover:bg-azimut-red/90 transition-all">
                      Ver Case Completo →
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-white/60 text-sm">
                📌 <strong>BACKOFFICE:</strong> /admin/academy/corporate/cases → Upload covers e vídeos
              </p>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="py-16 bg-gradient-to-b from-[#0a0e18] to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-handel uppercase tracking-wider text-white">
                {t.stats.title}
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {t.stats.items.map((stat, i) => (
                <div key={i} className="text-center card-adaptive p-6 rounded-xl border border-white/10">
                  <div className="text-5xl font-bold text-azimut-red mb-2">
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

        {/* SECTORS */}
        <section className="py-20 bg-gradient-to-b from-black to-[#0a0e18]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider text-white text-center mb-12">
              {t.sectors.title}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {t.sectors.items.map((sector, i) => (
                <div key={i} className="card-adaptive p-4 rounded-xl border border-white/10 text-center hover:border-azimut-red/50 transition-all">
                  <div className="text-4xl mb-2">{sector.icon}</div>
                  <div className="text-white text-sm">{sector.name}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="py-20 bg-gradient-to-b from-[#0a0e18] to-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider text-white text-center mb-12">
              {t.testimonials.title}
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {t.testimonials.items.map((testimonial, i) => (
                <div key={i} className="card-adaptive p-8 rounded-xl border border-white/10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-azimut-red/30 to-slate-800 rounded-full flex items-center justify-center">
                      <span className="text-3xl">👤</span>
                    </div>
                    <div>
                      <div className="text-white font-bold text-lg">{testimonial.name}</div>
                      <div className="text-white/60 text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-white/80 text-lg italic">"{testimonial.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="py-20 bg-gradient-to-b from-black to-[#0a0e18]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider text-white mb-6">
              {t.cta.title}
            </h2>
            <p className="text-xl text-white/70 mb-8">
              {t.cta.subtitle}
            </p>
            <button className="px-8 py-4 bg-azimut-red text-white font-semibold rounded-lg hover:bg-azimut-red/90 transition-all shadow-lg hover:shadow-azimut-red/50 hover:scale-105 mb-4">
              {t.cta.button} →
            </button>
            <p className="text-white/60 text-sm">
              {t.cta.contact}
            </p>
          </div>
        </section>
      </div>
    </>
  )
}

export default AcademyCorporate
