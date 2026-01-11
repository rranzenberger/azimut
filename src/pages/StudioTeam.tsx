import React, { useRef, useEffect } from 'react'
import { type Lang } from '../i18n'
import SEO from '../components/SEO'
import { useUserTracking } from '../hooks/useUserTracking'
import LangLink from '../components/LangLink'

interface StudioTeamProps {
  lang: Lang
}

const StudioTeam: React.FC<StudioTeamProps> = ({ lang }) => {
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
      title: 'Equipe',
      subtitle: 'Conheça quem está por trás das experiências imersivas da Azimut',
      members: [
        {
          name: 'Ranz Enberger',
          role: 'DIRETOR CRIATIVO & DE TECNOLOGIA',
          subtitle: 'Cineasta · Pesquisador · Curador',
          bio: 'Lidera direção criativa, tecnologia, storytelling imersivo, VR/XR, curadoria e pipelines com IA. Diretor Geral no Rio Museu Olímpico. Mestrado em Mídias Criativas (UFRJ-VF), pós em Análise de Sistemas. Iniciou pesquisa em IA para animação em 1997. Cidadão canadense com atuação global.',
          credentials: [
            'Diretor de Tecnologia, Rio Museu Olímpico',
            'Curador VR, Festival de Gramado (2017-hoje)',
            'Ex-Application Engineer & Training Specialist Autodesk',
            'Autodesk Discreet Demo Artist (1996-2008)',
            'Único contrato Canadá Autodesk na América do Sul',
            'Único Flame Trainer certificado no Brasil',
            'Professor pós-graduação em Mídias Criativas',
            '30+ anos em CG, VR/XR e IA para audiovisual'
          ],
          linkedin: 'https://ca.linkedin.com/in/ranzenberger',
          photo: '/team-ranz-placeholder.jpg'
        },
        {
          name: 'Anick Couto',
          role: 'DIRETORA DE ARTE',
          subtitle: 'Designer Visual & de Experiência',
          bio: 'Responsável pela direção visual, design de personagens e ambientes, cenografia, concept art e estética de animação. Liderou toda a equipe de arte no Rio Museu Olímpico – UI, grafismo, textos de parede, sinalização e design.',
          credentials: [
            'Diretora de Arte, Rio Museu Olímpico',
            'Designer Visual + Cenografia Digital',
            'Concept Art + Character Design',
            'Liderou equipe completa de arte (UI, grafismo, sinalização)',
            'Universo Casa dos Duendes (co-criação)'
          ],
          linkedin: 'https://br.linkedin.com/in/anickcouto',
          photo: '/team-anick-placeholder.jpg'
        },
        {
          name: 'Alberto Moura',
          role: 'DIRETOR AUDIOVISUAL & OPERAÇÕES',
          subtitle: 'Educador · Estrategista Cultural',
          bio: 'Lidera produção audiovisual, operações, coordenação de projetos, parcerias acadêmicas e estratégia cultural. Diretor Audiovisual no Rio Museu Olímpico. Faz a ponte entre instituições, educação e experiência do público.',
          credentials: [
            'Diretor Audiovisual, Rio Museu Olímpico',
            'Professor Universitário (graduação + pós)',
            'Ex-Coordenador de Curso de Audiovisual',
            'Fundador de empresa de Digital Signage',
            'Estratégia Cultural + Parcerias Acadêmicas'
          ],
          linkedin: 'https://br.linkedin.com/in/albertomoura3d',
          photo: '/team-alberto-placeholder.jpg'
        }
      ]
    },
    en: { title: 'Team', subtitle: '', members: [] }
  }

  const text = content[lang] || content.pt

  return (
    <>
      <SEO 
        lang={lang}
        title={`${text.title} - Studio - Azimut`}
        description={text.subtitle}
        path="/studio/equipe"
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
              👥 {text.title}
            </h1>
            <p className="text-xl text-theme-text-secondary max-w-4xl">
              {text.subtitle}
            </p>
          </div>

          {/* Team Members */}
          <div className="space-y-16">
            {text.members.map((member, i) => (
              <article key={i} className="grid md:grid-cols-[300px,1fr] gap-8 p-8 rounded-lg bg-gradient-to-br from-slate-900/50 to-slate-900/30 border border-azimut-red/20">
                {/* Photo */}
                <div className="relative">
                  <div className="aspect-square rounded-lg bg-azimut-red/10 flex items-center justify-center overflow-hidden">
                    <span className="text-9xl">👤</span>
                    <div className="absolute bottom-4 left-4 right-4 text-xs text-white/60 text-center">
                      [PLACEHOLDER - Upload foto real no backoffice]
                    </div>
                  </div>
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-slate-900/50 text-white hover:bg-azimut-red transition-all"
                    >
                      LinkedIn →
                    </a>
                  )}
                </div>

                {/* Info */}
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">{member.name}</h2>
                  <p className="text-azimut-red text-sm uppercase tracking-wider mb-2">{member.role}</p>
                  <p className="text-theme-text-secondary mb-6">{member.subtitle}</p>
                  <p className="text-lg leading-relaxed text-theme-text-secondary mb-6">{member.bio}</p>
                  
                  <h3 className="text-xl font-bold text-white mb-4">Credenciais</h3>
                  <ul className="space-y-2">
                    {member.credentials.map((cred, j) => (
                      <li key={j} className="flex items-start gap-2">
                        <span className="text-azimut-red mt-1">✓</span>
                        <span className="text-theme-text-secondary">{cred}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <LangLink
              to="/contact"
              className="inline-flex items-center gap-3 px-10 py-5 rounded-lg bg-azimut-red text-white font-sora font-bold uppercase hover:bg-azimut-red/90 transition-all shadow-xl"
            >
              {lang === 'pt' ? 'Trabalhe Conosco' : 'Work With Us'}
              <span className="text-2xl">→</span>
            </LangLink>
          </div>
        </div>
      </main>
    </>
  )
}

export default StudioTeam
