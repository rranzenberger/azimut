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
      subtitle: 'Nossa trajetória de 30 anos em produção imersiva',
      timeline: [
        { year: '1994', title: 'Fundação', desc: 'Início das atividades em produção audiovisual e CG' },
        { year: '1996', title: 'Autodesk Partnership', desc: 'Único contrato Autodesk Canadá na América do Sul. Demo Artist oficial.' },
        { year: '2000', title: 'VFX & Compositing', desc: 'Único Flame Trainer certificado no Brasil' },
        { year: '2007', title: 'Educação', desc: 'Início das atividades acadêmicas (pós-graduação em Mídias Criativas)' },
        { year: '2015', title: 'Rio Museu Olímpico', desc: 'Direção Geral de Tecnologia e Produção Audiovisual completa' },
        { year: '2017', title: 'Curadoria VR', desc: 'Curadoria oficial de Filmes VR no Festival de Gramado (até hoje)' },
        { year: '2018', title: 'XRBR', desc: 'Membros fundadores da Associação XRBR (Realidade Estendida Brasil)' },
        { year: '2020', title: 'Operações Canadá', desc: 'Expansão internacional Brasil ↔ Canadá' },
        { year: '2024', title: 'IA Generativa', desc: 'Pesquisa e implementação de pipelines híbridos IA+Humano' }
      ],
      credentials: {
        title: 'Certificações & Conquistas',
        items: [
          { icon: '🏆', title: 'XRBR', desc: 'Membros fundadores da Associação de Realidade Estendida Brasil' },
          { icon: '🎓', title: 'Mestrado UFRJ', desc: 'Mídias Criativas & Tecnologia na Educação' },
          { icon: '🎬', title: 'Gramado Festival', desc: 'Curadoria VR oficial desde 2017 (8 anos consecutivos)' },
          { icon: '🏛️', title: 'Museu Olímpico', desc: 'Direção Geral de Tecnologia (projeto oficial Prefeitura RJ)' },
          { icon: '🔥', title: 'Autodesk', desc: 'Único Flame Trainer certificado no Brasil (2000-2015)' },
          { icon: '🍁', title: 'Canadá', desc: 'Único contrato Autodesk Canadá na América do Sul' },
          { icon: '🌍', title: 'Internacional', desc: 'Operações Brasil ↔ Canadá (Rio, SP, Belém, Vancouver)' },
          { icon: '🤖', title: 'IA Pioneer', desc: 'Pesquisa em IA para animação desde 1997' }
        ]
      }
    },
    en: { title: 'Credentials & Timeline', subtitle: '', timeline: [], credentials: { title: '', items: [] } }
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
            <span className="text-azimut-red">{text.title}</span>
          </nav>

          {/* Hero */}
          <div className="mb-16">
            <h1 className="mb-4 font-handel text-5xl md:text-6xl font-bold uppercase text-theme-text">
              🏆 {text.title}
            </h1>
            <p className="text-xl text-theme-text-secondary max-w-4xl">
              {text.subtitle}
            </p>
          </div>

          {/* Timeline */}
          <section className="mb-20">
            <h2 className="mb-12 font-handel text-3xl font-bold uppercase text-theme-text">
              📅 Timeline
            </h2>
            <div className="relative space-y-8">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-azimut-red/30"></div>
              {text.timeline.map((item, i) => (
                <div key={i} className="relative pl-20">
                  <div className="absolute left-0 top-0 w-16 h-16 rounded-full bg-azimut-red flex items-center justify-center font-bold text-white border-4 border-slate-900">
                    {item.year}
                  </div>
                  <div className="p-6 rounded-lg bg-slate-900/50 border border-azimut-red/20 hover:border-azimut-red/40 transition-all">
                    <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-theme-text-secondary leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Credentials Grid */}
          <section className="mb-20">
            <h2 className="mb-12 font-handel text-3xl font-bold uppercase text-theme-text">
              {text.credentials.title}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {text.credentials.items.map((item, i) => (
                <div key={i} className="p-6 rounded-lg bg-gradient-to-br from-slate-900/50 to-slate-900/30 border border-azimut-red/20 hover:border-azimut-red/40 transition-all text-center">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-theme-text-secondary">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Back */}
          <div className="text-center">
            <LangLink
              to="/studio"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-lg border-2 border-white/30 text-white hover:bg-white hover:text-black transition-all"
            >
              <span>←</span>
              {lang === 'pt' ? 'Voltar para Studio' : 'Back to Studio'}
            </LangLink>
          </div>
        </div>
      </main>
    </>
  )
}

export default StudioCredentials
