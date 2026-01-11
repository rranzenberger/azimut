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
      title: 'Nossa Combinação Única',
      subtitle: 'Após 30 anos, descobrimos que nossa combinação é única',
      hero: 'Não somos apenas um estúdio de produção. Não somos apenas uma consultoria de tecnologia. Não somos apenas educadores. Somos a INTERSECÇÃO destes três mundos.',
      body: [
        'A Azimut nasceu da produção audiovisual profissional, expandiu para tecnologias imersivas (VR/XR/AR) e amadureceu na educação e curadoria. Esta trajetória nos deu uma visão 360° do ecossistema criativo-tecnológico.',
        'Enquanto produtoras focam em executar, e consultorias em recomendar, nós FAZEMOS e ENSINAMOS. Esta combinação única nos permite não apenas entregar projetos, mas também capacitar equipes, formar mercado e elevar o nível técnico-criativo do Brasil.',
        'Nossa expertise em curadoria (Festival de Gramado) nos mantém conectados com o que há de mais avançado globalmente. Nossa atuação em educação (Academy) nos força a traduzir complexidade em clareza. Nossa experiência em grandes projetos (Museu Olímpico) nos ensinou a integrar múltiplas disciplinas.'
      ],
      stats: [
        { value: '30+', label: 'Anos de Experiência' },
        { value: '50+', label: 'Projetos Entregues' },
        { value: '2', label: 'Países (BR & CA)' },
        { value: '3', label: 'Diretores Sênior' },
        { value: '8', label: 'Anos Curadoria VR' }
      ],
      diferenciais: [
        {
          icon: '🎬',
          title: 'Cinema + Tecnologia',
          desc: 'Unimos narrativa cinematográfica com engenharia de sistemas complexos. Não sacrificamos a arte pela técnica, nem a técnica pela arte.'
        },
        {
          icon: '🏛️',
          title: 'Institucional + Comercial',
          desc: 'Experiência tanto em projetos culturais/governamentais quanto em ativações de marca. Entendemos ambos os mundos.'
        },
        {
          icon: '🎓',
          title: 'Execução + Educação',
          desc: 'Não apenas fazemos - ensinamos. Formamos profissionais e elevamos o mercado. Nossos clientes aprendem conosco.'
        },
        {
          icon: '🌍',
          title: 'Local + Global',
          desc: 'Raízes no Brasil, cidadania no Canadá. Conhecemos profundamente a cultura local mas com padrão internacional.'
        },
        {
          icon: '🤖',
          title: 'Tradição + IA',
          desc: 'Pesquisamos IA desde 1997. Integramos ferramentas generativas sem perder a autoria humana. Pipelines híbridos.'
        },
        {
          icon: '👁️',
          title: 'Curadoria + Produção',
          desc: 'Como curadores, vemos o melhor do mundo. Como produtores, aplicamos este conhecimento. Ciclo virtuoso de excelência.'
        }
      ],
      credentials: [
        '🏆 Membros fundadores XRBR',
        '🎬 Curadoria VR Gramado (8 anos)',
        '🏛️ Museu Olímpico (Direção Técnica)',
        '🍁 Único contrato Autodesk Canadá na América do Sul'
      ]
    },
    en: { title: 'Our Unique Combination', subtitle: '', hero: '', body: [], stats: [], diferenciais: [], credentials: [] }
  }

  const text = content[lang] || content.pt

  return (
    <>
      <SEO 
        lang={lang}
        title={`${text.title} - Studio - Azimut`}
        description={text.hero}
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
            <h1 className="mb-6 font-handel text-5xl md:text-6xl font-bold uppercase text-theme-text">
              ⚡ {text.title}
            </h1>
            <div className="p-8 rounded-lg bg-gradient-to-r from-azimut-red/20 to-transparent border-l-4 border-azimut-red">
              <p className="text-2xl font-handel uppercase tracking-wide text-azimut-red">
                {text.subtitle}
              </p>
            </div>
          </div>

          {/* Hero Message */}
          <div className="mb-16 p-8 rounded-lg bg-slate-900/50 border border-azimut-red/30">
            <p className="text-xl leading-relaxed text-white font-semibold text-center">
              {text.hero}
            </p>
          </div>

          {/* Body Paragraphs */}
          <div className="mb-16 space-y-6">
            {text.body.map((paragraph, i) => (
              <p key={i} className="text-lg leading-relaxed text-theme-text-secondary">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Stats */}
          <div className="mb-16 grid grid-cols-2 md:grid-cols-5 gap-6 p-8 rounded-lg bg-gradient-to-br from-slate-900/50 to-slate-900/30 border border-azimut-red/20">
            {text.stats.map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="font-handel text-5xl text-azimut-red mb-2 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-wider text-theme-text-secondary">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Diferenciais Grid */}
          <section className="mb-16">
            <h2 className="mb-10 font-handel text-3xl font-bold uppercase text-theme-text text-center">
              {lang === 'pt' ? 'Nossos Diferenciais' : 'Our Differentials'}
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {text.diferenciais.map((item, i) => (
                <div key={i} className="p-6 rounded-lg bg-gradient-to-br from-slate-900/50 to-slate-900/30 border border-azimut-red/20 hover:border-azimut-red/50 transition-all group">
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-sm text-theme-text-secondary leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Credentials Badges */}
          <div className="mb-16 flex flex-wrap gap-3 justify-center">
            {text.credentials.map((cred, i) => (
              <span key={i} className="px-5 py-3 rounded-full bg-azimut-red/10 border border-azimut-red/30 text-white font-semibold">
                {cred}
              </span>
            ))}
          </div>

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
