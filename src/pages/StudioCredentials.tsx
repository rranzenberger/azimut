import React, { useRef, useEffect } from 'react'
import { type Lang } from '../i18n'
import SEO from '../components/SEO'
import { useUserTracking } from '../hooks/useUserTracking'
import LangLink from '../components/LangLink'

interface StudioCredentialsProps {
  lang: Lang
}

const StudioCredentials: React.FC<StudioCredentialsProps> = ({ lang }) => {
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
      title: 'Credenciais & Timeline',
      subtitle: 'Nossa jornada de 30 anos',
      timeline: [
        {
          period: '1996-2004',
          title: 'Architecad + Fundações',
          icon: '🏗️',
          items: [
            'Pioneiros em Maquete Virtual no Brasil',
            'Centro de Treinamento Autodesk',
            'Único Application Engineer na América do Sul',
            'Demo Artist Autodesk Discreet (1996-2008)',
            'Azimut Computação e Produções Cinematográficas (1998-2004)'
          ]
        },
        {
          period: '2004-2018',
          title: 'Azimut Escola',
          icon: '🎓',
          items: [
            'Cursos profissionalizantes: Animação, VFX, Maquete Virtual',
            'Único Flame Trainer certificado no Brasil',
            'Formamos centenas de profissionais',
            'Centro de Treinamento Autodesk (único na América do Sul)',
            'Cursos de 1-2 anos + cursos de curta duração',
            'CAD, 3ds Max, Photoshop, After Effects, Flame'
          ]
        },
        {
          period: '2018-2025',
          title: 'Azimut Projetos Audiovisuais',
          icon: '🎬',
          items: [
            'Direção Técnica Rio Museu Olímpico',
            'Curadoria VR Festival de Gramado (desde 2017)',
            'Instalações imersivas + IA',
            'Projetos com YDreams e instituições',
            'Operação binacional Brasil-Canadá',
            'Foco em cultura, museus, festivais e marcas'
          ]
        }
      ],
      credentials: [
        { icon: '🏆', title: 'XRBR', desc: 'Membros fundadores da Associação de Realidade Estendida Brasil', year: '2018' },
        { icon: '🎓', title: 'Mestrado UFRJ', desc: 'Mídias Criativas & Tecnologia na Educação', year: '2010' },
        { icon: '🎬', title: 'Gramado Festival', desc: 'Curadoria VR oficial (8 anos consecutivos)', year: '2017' },
        { icon: '🏛️', title: 'Museu Olímpico', desc: 'Direção Geral de Tecnologia', year: '2015-2017' },
        { icon: '🔥', title: 'Autodesk Flame', desc: 'Único Flame Trainer certificado no Brasil', year: '2000-2015' },
        { icon: '🍁', title: 'Autodesk Canadá', desc: 'Único contrato na América do Sul', year: '1996-2008' },
        { icon: '🌍', title: 'Internacional', desc: 'Rio, SP, Belém, Florianópolis, Vancouver', year: '2020' },
        { icon: '🤖', title: 'IA Pioneer', desc: 'Pesquisa em IA para animação', year: '1997' }
      ]
    },
    en: { title: 'Credentials & Timeline', subtitle: '', timeline: [], credentials: [] }
  }

  const text = content[lang] || content.pt

  return (
    <>
      <SEO 
        lang={lang}
        title={`${text.title} - Studio - Azimut`}
        description={text.subtitle}
        path="/studio/credibilidade"
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
              🏆 {text.title}
            </h1>
            <p className="text-xl md:text-2xl text-theme-text-secondary max-w-4xl">
              {text.subtitle}
            </p>
          </div>

          {/* Timeline Vertical */}
          <section className="mb-20">
            <h2 className="mb-12 font-handel text-3xl font-bold uppercase text-theme-text text-center">
              📅 Nossa Jornada
            </h2>
            <div className="relative space-y-12">
              <div className="absolute left-12 top-0 bottom-0 w-1 bg-azimut-red/30"></div>
              {text.timeline.map((period, i) => (
                <div key={i} className="relative pl-28">
                  <div className="absolute left-0 top-0 w-24 h-24 rounded-full bg-gradient-to-br from-azimut-red to-azimut-red/70 flex flex-col items-center justify-center font-bold text-white border-4 border-slate-900 shadow-lg">
                    <div className="text-2xl">{period.icon}</div>
                    <div className="text-xs">{period.period}</div>
                  </div>
                  <div className="p-8 rounded-lg bg-gradient-to-br from-slate-900/50 to-slate-900/30 border border-azimut-red/20 hover:border-azimut-red/40 transition-all">
                    <h3 className="text-3xl font-bold text-white mb-6">{period.title}</h3>
                    <ul className="space-y-3">
                      {period.items.map((item, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="text-azimut-red mt-1">✓</span>
                          <span className="text-theme-text-secondary">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Credentials Cards */}
          <section className="mb-20">
            <h2 className="mb-12 font-handel text-3xl font-bold uppercase text-theme-text text-center">
              🎖️ Certificações & Conquistas
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {text.credentials.map((cred, i) => (
                <div key={i} className="p-6 rounded-lg bg-gradient-to-br from-slate-900/50 to-slate-900/30 border border-azimut-red/20 hover:border-azimut-red/40 transition-all text-center group">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{cred.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{cred.title}</h3>
                  <p className="text-sm text-theme-text-secondary mb-2">{cred.desc}</p>
                  <div className="text-xs text-azimut-red font-semibold">{cred.year}</div>
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
                {lang === 'pt' ? 'Iniciar um Projeto' : 'Start a Project'}
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

export default StudioCredentials
