import React, { useRef, useEffect } from 'react'
import { type Lang } from '../i18n'
import SEO, { seoData } from '../components/SEO'
import { useUserTracking } from '../hooks/useUserTracking'
import { useBackofficeContent } from '../hooks/useBackofficeContent'
import LangLink from '../components/LangLink'

interface ResearchProps {
  lang: Lang
}

const Research: React.FC<ResearchProps> = ({ lang }) => {
  useUserTracking()
  const seo = seoData.research[lang]
  const starRef = useRef<HTMLDivElement>(null)
  
  // Parallax effect
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
  
  const { page: researchPage, loading: pageLoading } = useBackofficeContent('academy/research', lang)

  const content = {
    pt: {
      title: 'Research & Lab',
      subtitle: 'Explorando fronteiras da narrativa imersiva e tecnologias emergentes',
      areas: [
        { icon: '🤖', title: 'IA Generativa para Narrativa', desc: 'Pipelines híbridos IA+Humano para storytelling cinematográfico', color: 'from-purple-500/20 to-pink-500/20', border: 'purple-500/30' },
        { icon: '🎬', title: 'Cinematic VR & 360', desc: 'Linguagem cinematográfica em experiências imersivas', color: 'from-red-500/20 to-orange-500/20', border: 'red-500/30' },
        { icon: '⚡', title: 'Sistemas Interativos', desc: 'Interfaces tangíveis e experiências responsivas em tempo real', color: 'from-blue-500/20 to-cyan-500/20', border: 'blue-500/30' },
        { icon: '🧬', title: 'Pipelines Híbridos', desc: 'Integração entre produção tradicional e ferramentas de IA', color: 'from-green-500/20 to-emerald-500/20', border: 'green-500/30' },
        { icon: '🏛️', title: 'Museografia Digital', desc: 'Experiências culturais interativas para instituições', color: 'from-yellow-500/20 to-amber-500/20', border: 'yellow-500/30' },
        { icon: '🎓', title: 'Educação Imersiva', desc: 'Metodologias de ensino com VR, AR e ambientes 3D', color: 'from-indigo-500/20 to-violet-500/20', border: 'indigo-500/30' }
      ],
      projects: {
        title: 'Projetos de Pesquisa',
        items: [
          { year: '2024-2026', title: 'IA para Animação de Personagens', desc: 'Pesquisa em Motion Matching e procedural animation com ML' },
          { year: '2023-2025', title: 'VR Cinematográfico', desc: 'Desenvolvimento de linguagem para narrativa em 360°' },
          { year: '2022-2024', title: 'Interfaces Tangíveis', desc: 'Exploração de interação física em instalações imersivas' }
        ]
      },
      publications: 'Publicações & Apresentações',
      cta: 'Interessado em colaborações acadêmicas?',
      contact: 'Fale Conosco'
    },
    en: {
      title: 'Research & Lab',
      subtitle: 'Exploring frontiers of immersive storytelling and emerging technologies',
      areas: [
        { icon: '🤖', title: 'Generative AI for Storytelling', desc: 'Hybrid AI+Human pipelines for cinematic content', color: 'from-purple-500/20 to-pink-500/20', border: 'purple-500/30' },
        { icon: '🎬', title: 'Cinematic VR & 360', desc: 'Cinematic language in immersive experiences', color: 'from-red-500/20 to-orange-500/20', border: 'red-500/30' },
        { icon: '⚡', title: 'Interactive Systems', desc: 'Tangible interfaces and real-time responsive experiences', color: 'from-blue-500/20 to-cyan-500/20', border: 'blue-500/30' },
        { icon: '🧬', title: 'Hybrid Pipelines', desc: 'Integration between traditional production and AI tools', color: 'from-green-500/20 to-emerald-500/20', border: 'green-500/30' },
        { icon: '🏛️', title: 'Digital Museography', desc: 'Interactive cultural experiences for institutions', color: 'from-yellow-500/20 to-amber-500/20', border: 'yellow-500/30' },
        { icon: '🎓', title: 'Immersive Education', desc: 'Teaching methodologies with VR, AR and 3D environments', color: 'from-indigo-500/20 to-violet-500/20', border: 'indigo-500/30' }
      ],
      projects: {
        title: 'Research Projects',
        items: [
          { year: '2024-2026', title: 'AI for Character Animation', desc: 'Research in Motion Matching and procedural animation with ML' },
          { year: '2023-2025', title: 'Cinematic VR', desc: 'Language development for 360° storytelling' },
          { year: '2022-2024', title: 'Tangible Interfaces', desc: 'Exploration of physical interaction in immersive installations' }
        ]
      },
      publications: 'Publications & Presentations',
      cta: 'Interested in academic collaborations?',
      contact: 'Contact Us'
    },
    es: { ...{} },
    fr: { ...{} }
  }

  const text = content[lang] || content.pt

  return (
    <>
      <SEO 
        lang={lang}
        title={seo.title}
        description={seo.description}
        path="/academy/research"
      />
      
      <main className="relative py-16 md:py-20">
        {/* Star Parallax */}
        <div 
          ref={starRef}
          className="pointer-events-none fixed top-20 -right-28 h-[520px] w-[520px] md:-right-40 md:h-[680px] md:w-[680px] transition-transform duration-75"
          style={{ opacity: 0.25, zIndex: -5, willChange: 'transform' }}
        >
          <img src="/logo-azimut-star.svg" alt="" className="h-full w-full object-contain" loading="lazy" />
        </div>

        <div className="mx-auto max-w-6xl px-6">
          {/* Hero */}
          <div className="mb-16">
            <div className="mb-4 inline-block px-4 py-2 rounded-full bg-azimut-red/10 border border-azimut-red/30 text-sm font-semibold text-azimut-red uppercase tracking-wider">
              🔬 Research & Development
            </div>
            <h1 className="mb-4 font-handel text-5xl md:text-6xl lg:text-7xl font-bold uppercase text-theme-text">
              {text.title}
            </h1>
            <p className="text-xl md:text-2xl text-theme-text-secondary max-w-4xl leading-relaxed">
              {text.subtitle}
            </p>
          </div>

          {/* Research Areas - Grid Visual */}
          <section className="mb-20">
            <h2 className="mb-10 font-handel text-3xl font-bold uppercase text-theme-text flex items-center gap-3">
              <span className="text-azimut-red">⚗️</span>
              {lang === 'pt' ? 'Áreas de Pesquisa' : 'Research Areas'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {text.areas.map((area, i) => (
                <div 
                  key={i}
                  className={`group relative p-6 rounded-lg bg-gradient-to-br ${area.color} border border-${area.border} hover:border-azimut-red/50 transition-all overflow-hidden`}
                >
                  <div className="absolute -right-4 -bottom-4 text-8xl opacity-10 group-hover:opacity-20 transition-opacity">
                    {area.icon}
                  </div>
                  <div className="relative z-10">
                    <div className="text-5xl mb-4">{area.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-3">{area.title}</h3>
                    <p className="text-sm text-theme-text-secondary leading-relaxed">{area.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Research Projects Timeline */}
          <section className="mb-20">
            <h2 className="mb-10 font-handel text-3xl font-bold uppercase text-theme-text flex items-center gap-3">
              <span className="text-azimut-red">📊</span>
              {text.projects.title}
            </h2>
            <div className="space-y-6">
              {text.projects.items.map((project, i) => (
                <div 
                  key={i}
                  className="relative pl-12 pb-8 border-l-2 border-azimut-red/30 last:border-0"
                >
                  <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-azimut-red border-4 border-slate-900"></div>
                  <div className="mb-2 inline-block px-3 py-1 rounded-full bg-azimut-red/20 text-xs font-bold text-azimut-red">
                    {project.year}
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                  <p className="text-theme-text-secondary">{project.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Publications */}
          <section className="mb-20">
            <h2 className="mb-10 font-handel text-3xl font-bold uppercase text-theme-text flex items-center gap-3">
              <span className="text-azimut-red">📚</span>
              {text.publications}
            </h2>
            <div className="p-12 rounded-lg bg-slate-900/30 border border-azimut-red/20 text-center">
              <p className="text-lg text-theme-text-secondary mb-6">
                {lang === 'pt' && 'Papers, artigos e apresentações em congressos serão listados aqui.'}
                {lang === 'en' && 'Papers, articles and conference presentations will be listed here.'}
              </p>
              <div className="text-6xl mb-4">📄</div>
              <p className="text-sm text-theme-text-secondary/60">
                {lang === 'pt' ? 'Em breve' : 'Coming soon'}
              </p>
            </div>
          </section>

          {/* CTA */}
          <div className="text-center">
            <p className="text-xl text-theme-text-secondary mb-6">{text.cta}</p>
            <LangLink
              to="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-lg bg-azimut-red text-white font-sora font-bold uppercase tracking-wider hover:bg-azimut-red/90 transition-all shadow-xl hover:shadow-2xl"
            >
              {text.contact}
              <span className="text-2xl">→</span>
            </LangLink>
          </div>
        </div>
      </main>
    </>
  )
}

export default Research
