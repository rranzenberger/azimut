import React, { useRef, useEffect } from 'react'
import { type Lang } from '../i18n'
import SEO from '../components/SEO'
import { useUserTracking } from '../hooks/useUserTracking'
import LangLink from '../components/LangLink'

interface StudioDiferenciaisProps {
  lang: Lang
}

const StudioDiferenciais: React.FC<StudioDiferenciaisProps> = ({ lang }) => {
  useUserTracking()
  const starRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const star = starRef.current
    if (!star) return
    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset
          if (star) star.style.transform = `translateY(${scrolled * 0.3}px)`
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const content = {
    pt: {
      title: 'O Que Nos Torna Únicos',
      subtitle: 'Nossa combinação especial',
      heritage: {
        title: 'Desde 1996 | Brasil-Canadá',
        body: 'Unimos arte, tecnologia e educação em projetos pioneiros. Do primeiro centro de treinamento Autodesk da América do Sul à direção técnica do Rio Museu Olímpico, criamos experiências imersivas entre Brasil e Canadá.',
        stats: [
          { label: 'Desde', value: '1996' },
          { label: 'Autodesk', value: '1996-2018' },
          { label: 'Rio Museum', value: 'Atual' },
          { label: 'Gramado', value: '2017' },
          { label: 'Binacional', value: 'BR-CA' }
        ]
      },
      unique: {
        title: 'O que nos torna únicos',
        items: [
          'Pesquisa acadêmica + Produção comercial (raramente encontradas juntas)',
          'Educação (formamos centenas) + Curadoria de festivais (Gramado VR desde 2017)',
          'Arquitetura/BIM + Cinema/VFX + VR/XR/IA (expertise técnica ampla)',
          'Time com 30 anos de bagagem internacional (desde 1996)',
          'Operação binacional Brasil-Canadá (conectando ecossistemas criativos)',
          'Não somos apenas um estúdio. Somos um ecossistema que integra conhecimento, criação e transformação.'
        ]
      },
      vision: {
        title: 'Visão',
        body: 'Ser referência global em experiências imersivas, interativas e cinematográficas que unem arte, tecnologia e narrativa, transformando espaços culturais, marcas e cidades em ambientes de conexão e descoberta.'
      },
      mission: {
        title: 'Missão',
        body: 'Criar experiências imersivas de ponta a ponta que conectam pessoas, histórias e espaços através de tecnologia criativa, design cinematográfico e narrativas envolventes, sempre em colaboração com instituições, marcas e comunidades.\n\nTransformamos conceitos em jornadas memoráveis que ressoam emocional e culturalmente — operando na interseção entre arte, tecnologia e conexão humana, construindo pontes entre os ecossistemas criativos do Brasil e do Canadá.'
      },
      values: {
        title: 'Valores',
        items: [
          {
            title: 'Inovação Contínua',
            description: 'Exploramos fronteiras tecnológicas e artísticas, sempre em busca de novas formas de contar histórias e criar conexões.'
          },
          {
            title: 'Excelência Técnica',
            description: '30 anos de expertise em CG, VFX, VR/XR e IA aplicada ao audiovisual, com certificações internacionais e formação de profissionais.'
          },
          {
            title: 'Colaboração',
            description: 'Acreditamos em cocriação com artistas, instituições, marcas e comunidades, construindo projetos em rede.'
          },
          {
            title: 'Impacto Cultural',
            description: 'Geramos transformação real através da cultura, educação e inclusão, conectando ecossistemas criativos entre Brasil e Canadá.'
          }
        ]
      },
      pillars: [
        {
          icon: '🎨',
          title: 'Arte e Estética Imersiva',
          body: 'Criamos experiências visuais e sonoras que capturam e transportam o público, misturando arte contemporânea, design interativo e ambientações sensoriais.'
        },
        {
          icon: '🧠',
          title: 'Tecnologia Criativa',
          body: 'Exploramos as fronteiras da tecnologia para contar histórias de forma interativa — usando XR, IA, projeções, sensores, instalações reativas e mais.'
        },
        {
          icon: '🎥',
          title: 'Narrativa Cinematográfica',
          body: 'Nosso diferencial é o storytelling sofisticado com linguagem de cinema, roteiros autorais, ritmo, emoção e direção de arte envolvente.'
        },
        {
          icon: '🌍',
          title: 'Impacto Cultural e Social',
          body: 'Geramos transformação real por meio da cultura, colaborando com comunidades, museus, territórios criativos e iniciativas de educação e inclusão.'
        },
        {
          icon: '🌐',
          title: 'Atuação Binacional (Brasil–Canadá)',
          body: 'Conectamos ecossistemas criativos entre América do Sul e América do Norte — em projetos, editais, festivais e parcerias institucionais.'
        },
        {
          icon: '🤝',
          title: 'Modelo de Cocriação',
          body: 'Desenvolvemos projetos em rede, com artistas, marcas, estúdios e instituições públicas/privadas, usando metodologias ágeis e colaborativas.'
        }
      ]
    },
    en: { title: 'What Makes Us Unique', subtitle: '', heritage: { title: '', body: '', stats: [] }, unique: { title: '', items: [] }, vision: { title: '', body: '' }, mission: { title: '', body: '' }, values: { title: '', items: [] }, pillars: [] }
  }

  const text = content[lang] || content.pt

  return (
    <>
      <SEO 
        lang={lang}
        title={`${text.title} - Studio - Azimut`}
        description={text.subtitle}
        path="/studio/diferenciais"
      />
      
      <main className="relative py-16 md:py-20">
        <div 
          ref={starRef}
          className="pointer-events-none fixed top-20 -right-28 h-[520px] w-[520px] md:-right-40 md:h-[680px] md:w-[680px] transition-transform duration-75"
          style={{ opacity: 0.25, zIndex: -5, willChange: 'transform' }}
        >
          <img src="/logo-azimut-star.svg" alt="" className="h-full w-full object-contain" loading="lazy" />
        </div>

        <div className="mx-auto max-w-6xl px-6">
          {/* Breadcrumbs */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-theme-text-secondary">
            <LangLink to="/" className="hover:text-azimut-red transition-colors">Home</LangLink>
            <span>›</span>
            <LangLink to="/studio" className="hover:text-azimut-red transition-colors">Studio</LangLink>
            <span>›</span>
            <span className="text-azimut-red font-medium">{text.title}</span>
          </nav>

          {/* Hero */}
          <div className="mb-16">
            <h1 className="mb-6 font-handel text-5xl md:text-6xl lg:text-7xl font-bold uppercase text-theme-text">
              ⚡ {text.title}
            </h1>
            <p className="text-xl md:text-2xl text-theme-text-secondary max-w-4xl">
              {text.subtitle}
            </p>
          </div>

          {/* Heritage */}
          <section className="mb-20">
            <div className="p-8 rounded-lg bg-gradient-to-r from-azimut-red/20 to-transparent border-l-4 border-azimut-red mb-8">
              <h2 className="text-2xl md:text-3xl font-handel uppercase tracking-wide text-azimut-red mb-4">
                {text.heritage.title}
              </h2>
              <p className="text-lg leading-relaxed text-white">
                {text.heritage.body}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {text.heritage.stats.map((stat, i) => (
                <div key={i} className="text-center p-6 rounded-lg bg-slate-900/50 border border-azimut-red/20 hover:border-azimut-red/40 transition-all group">
                  <div className="font-handel text-4xl md:text-5xl text-azimut-red mb-2 group-hover:scale-110 transition-transform">
                    {stat.value}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-theme-text-secondary">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Unique Items */}
          <section className="mb-20">
            <h2 className="mb-10 font-handel text-3xl font-bold uppercase text-theme-text">
              {text.unique.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {text.unique.items.map((item, i) => (
                <div key={i} className="flex items-start gap-3 p-6 rounded-lg bg-slate-900/30 hover:bg-slate-900/50 border border-transparent hover:border-azimut-red/30 transition-all group">
                  <svg className="w-6 h-6 text-azimut-red shrink-0 mt-0.5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-theme-text-secondary group-hover:text-theme-text transition-colors">{item}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Visão - DESTAQUE */}
          <section className="mb-20">
            <div className="p-10 rounded-lg bg-gradient-to-br from-azimut-red/20 to-slate-900/50 border-2 border-azimut-red shadow-2xl">
              <h2 className="text-3xl font-handel uppercase text-azimut-red mb-6 flex items-center gap-3">
                <span className="text-4xl">👁️</span>
                {text.vision.title}
              </h2>
              <p className="text-xl md:text-2xl leading-relaxed text-white">
                {text.vision.body}
              </p>
            </div>
          </section>

          {/* Missão + Valores Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {/* Missão */}
            <div className="p-8 rounded-lg bg-slate-900/50 border border-azimut-red/20">
              <h2 className="text-2xl font-handel uppercase text-azimut-red mb-6 flex items-center gap-3">
                <span className="text-3xl">🎯</span>
                {text.mission.title}
              </h2>
              <p className="text-theme-text-secondary leading-relaxed whitespace-pre-line">
                {text.mission.body}
              </p>
            </div>

            {/* Valores */}
            <div className="p-8 rounded-lg bg-slate-900/50 border border-azimut-red/20">
              <h2 className="text-2xl font-handel uppercase text-azimut-red mb-6 flex items-center gap-3">
                <span className="text-3xl">💎</span>
                {text.values.title}
              </h2>
              <div className="space-y-4">
                {text.values.items.map((value, i) => (
                  <div key={i}>
                    <h4 className="font-bold text-white mb-1">{value.title}</h4>
                    <p className="text-sm text-theme-text-secondary">{value.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pillars - 6 Cards */}
          <section className="mb-20">
            <h2 className="mb-10 font-handel text-3xl font-bold uppercase text-theme-text text-center">
              {lang === 'pt' ? 'Nossos Pilares' : 'Our Pillars'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {text.pillars.map((pillar, i) => (
                <div key={i} className="p-6 rounded-lg bg-gradient-to-br from-slate-900/50 to-slate-900/30 border border-azimut-red/20 hover:border-azimut-red/50 transition-all group">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{pillar.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{pillar.title}</h3>
                  <p className="text-sm text-theme-text-secondary leading-relaxed">{pillar.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="text-center">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <LangLink
                to="/contact"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-lg bg-azimut-red text-white font-sora font-bold uppercase hover:bg-azimut-red/90 transition-all shadow-xl"
              >
                {lang === 'pt' ? 'Trabalhe Conosco' : 'Work With Us'}
                <span className="text-2xl">→</span>
              </LangLink>
              <LangLink
                to="/studio"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-lg border-2 border-white/30 text-white hover:bg-white hover:text-black transition-all font-semibold"
              >
                <span>←</span>
                {lang === 'pt' ? 'Voltar para Studio' : 'Back to Studio'}
              </LangLink>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default StudioDiferenciais
