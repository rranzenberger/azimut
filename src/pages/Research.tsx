import React, { useRef, useEffect } from 'react'
import { type Lang } from '../i18n'
import SEO, { seoData } from '../components/SEO'
import { useBackofficeContent } from '../hooks/useBackofficeContent'
import LangLink from '../components/LangLink'
import { useTheme } from '../contexts/ThemeContext'

interface ResearchProps {
  lang: Lang
}

const Research: React.FC<ResearchProps> = ({ lang }) => {
  const seo = seoData.research[lang]
  const starRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()
  
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

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Hero — gradiente sutil, paleta do site */}
          <div className="relative mb-12 md:mb-16 text-center md:text-left rounded-2xl overflow-hidden bg-gradient-to-b from-azimut-red/5 via-transparent to-transparent border border-azimut-red/10 py-10 md:py-12 px-6">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(201,35,55,0.08),transparent)]" aria-hidden />
            <div className="relative">
              <div className="mb-4 inline-block px-4 py-2 rounded-full bg-azimut-red/10 border border-azimut-red/30 text-sm font-semibold text-azimut-red uppercase tracking-wider">
                🔬 Research & Development
              </div>
              <h1 className="mb-4 font-handel text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold uppercase text-theme-text">
                {text.title}
              </h1>
              <p className="text-lg md:text-xl text-theme-text-secondary max-w-4xl leading-relaxed">
                {text.subtitle}
              </p>
            </div>
          </div>

          {/* Research Areas — grid visual com paleta do site (azimut-red, gradientes sutis) */}
          <section className="mb-16 md:mb-20">
            <h2 className="mb-8 md:mb-10 font-handel text-2xl md:text-3xl font-bold uppercase text-theme-text flex items-center gap-3">
              <span className="text-azimut-red">⚗️</span>
              {lang === 'pt' ? 'Áreas de Pesquisa' : 'Research Areas'}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {text.areas.map((area, i) => (
                <div 
                  key={i}
                  className="group relative p-5 md:p-6 rounded-xl bg-gradient-to-br from-white/5 to-transparent dark:from-white/[0.06] dark:to-transparent border border-azimut-red/20 hover:border-azimut-red/40 hover:from-azimut-red/10 transition-all overflow-hidden"
                >
                  <div className="absolute -right-4 -bottom-4 text-7xl md:text-8xl opacity-10 group-hover:opacity-15 transition-opacity pointer-events-none" aria-hidden>
                    {area.icon}
                  </div>
                  <div className="relative z-10">
                    <div className="text-4xl md:text-5xl mb-3">{area.icon}</div>
                    <h3 className={`text-lg md:text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-on-dark-primary'}`}>{area.title}</h3>
                    <p className="text-sm text-theme-text-secondary leading-relaxed">{area.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Research Projects — grid de cards (visual) */}
          <section className="mb-16 md:mb-20">
            <h2 className="mb-8 md:mb-10 font-handel text-2xl md:text-3xl font-bold uppercase text-theme-text flex items-center gap-3">
              <span className="text-azimut-red">📊</span>
              {text.projects.title}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {text.projects.items.map((project, i) => (
                <div 
                  key={i}
                  className="relative p-6 rounded-xl bg-gradient-to-b from-white/5 to-transparent dark:from-white/[0.06] border border-azimut-red/20 hover:border-azimut-red/40 transition-all overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-azimut-red/60 to-transparent opacity-80" aria-hidden />
                  <div className="mb-3 inline-block px-3 py-1.5 rounded-lg bg-azimut-red/15 border border-azimut-red/30 text-xs font-bold text-azimut-red">
                    {project.year}
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-on-dark-primary'}`}>{project.title}</h3>
                  <p className="text-sm text-theme-text-secondary leading-relaxed">{project.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Publications — grid visual com placeholders (imagens/cards) */}
          <section className="mb-16 md:mb-20">
            <h2 className="mb-8 md:mb-10 font-handel text-2xl md:text-3xl font-bold uppercase text-theme-text flex items-center gap-3">
              <span className="text-azimut-red">📚</span>
              {text.publications}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i}
                  className="rounded-xl overflow-hidden border border-azimut-red/20 bg-gradient-to-b from-white/5 to-transparent dark:from-white/[0.06] hover:border-azimut-red/40 transition-all"
                >
                  <div 
                    className="aspect-[4/3] flex items-center justify-center border-b border-azimut-red/10"
                    style={{
                      background: theme === 'dark' ? 'linear-gradient(145deg, rgba(26,31,44,0.6) 0%, rgba(22,27,38,0.4) 100%)' : 'linear-gradient(145deg, rgba(30,28,26,0.4) 0%, rgba(26,24,21,0.3) 100%)'
                    }}
                  >
                    <span className="text-5xl opacity-40" aria-hidden>📄</span>
                  </div>
                  <div className="p-4 md:p-5 text-center">
                    <p className={`text-sm font-semibold mb-1 ${theme === 'dark' ? 'text-white' : 'text-on-dark-primary'}`}>
                      {lang === 'pt' ? 'Publicação' : 'Publication'} {i}
                    </p>
                    <p className="text-xs text-theme-text-secondary/80">
                      {lang === 'pt' ? 'Em breve' : 'Coming soon'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-center text-sm text-theme-text-secondary max-w-2xl mx-auto">
              {lang === 'pt' && 'Papers, artigos e apresentações em congressos serão listados aqui.'}
              {lang === 'en' && 'Papers, articles and conference presentations will be listed here.'}
            </p>
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
