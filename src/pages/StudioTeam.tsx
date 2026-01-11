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
      title: 'Conheça a Equipe',
      subtitle: 'Os diretores e especialistas por trás das experiências imersivas da Azimut',
      team: [
        {
          name: 'Ranz Enberger',
          role: 'DIRETOR CRIATIVO & DE TECNOLOGIA',
          subtitle: 'Cineasta · Pesquisador · Curador',
          bio: 'Lidera direção criativa, tecnologia, storytelling imersivo, VR/XR, curadoria e pipelines com IA. Diretor Geral no Rio Museu Olímpico. Mestrado em Mídias Criativas (UFRJ-VF), pós em Análise de Sistemas. Iniciou pesquisa em IA para animação em 1997. Cidadão canadense com atuação global. Certificado em VFX (EUA/Canadá).',
          expandedBio: `Com mais de 30 anos de experiência em produção audiovisual, CG e tecnologias imersivas, Ranz é um pioneiro em integrar narrativa cinematográfica com tecnologias emergentes.

Sua trajetória única combina:
• Produção Cinematográfica de alto nível
• Direção de Tecnologia em projetos institucionais
• Curadoria especializada em VR/XR
• Pesquisa acadêmica em IA para narrativa
• Educação em pós-graduação

No Rio Museu Olímpico, foi responsável por toda a direção de tecnologia, incluindo integração de 50+ telas interativas, games, VR rooms, projeções mapeadas e sistemas interativos complexos.

Como curador de VR no Festival de Gramado (desde 2017), seleciona e apresenta os melhores filmes em realidade virtual do mundo, ajudando a formar o público brasileiro para esta nova linguagem.`,
          credentials: [
            { icon: '🏛️', text: 'Diretor de Tecnologia, Rio Museu Olímpico (2015-2017)' },
            { icon: '🎬', text: 'Curador VR, Festival de Gramado (2017-presente)' },
            { icon: '🔧', text: 'Ex-Application Engineer & Training Specialist Autodesk' },
            { icon: '🎨', text: 'Autodesk Discreet Demo Artist (1996-2008)' },
            { icon: '🍁', text: 'Único contrato Canadá Autodesk na América do Sul' },
            { icon: '🔥', text: 'Único Flame Trainer certificado no Brasil' },
            { icon: '🎓', text: 'Professor pós-graduação em Mídias Criativas' },
            { icon: '🤖', text: '30+ anos em CG, VR/XR e IA para audiovisual' }
          ],
          linkedin: 'https://ca.linkedin.com/in/ranzenberger',
          photo: '/team/ranz.jpg'
        },
        {
          name: 'Anick Couto',
          role: 'DIRETORA DE ARTE',
          subtitle: 'Designer Visual & de Experiência',
          bio: 'Responsável pela direção visual, design de personagens e ambientes, cenografia, concept art e estética de animação. Liderou toda a equipe de arte no Rio Museu Olímpico – UI, grafismo, textos de parede, sinalização e design completo.',
          expandedBio: `Anick traz sensibilidade artística e rigor técnico para cada projeto da Azimut.

Sua expertise inclui:
• Direção de Arte completa (do conceito à execução)
• Design de Personagens e Ambientes 2D/3D
• Cenografia Digital para instalações
• Concept Art para narrativas imersivas
• UI/UX para experiências interativas

No Museu Olímpico, coordenou uma equipe multidisciplinar de designers, ilustradores e animadores, criando uma linguagem visual coesa para mais de 50 pontos de interação.

Também é co-criadora do universo visual de Casa dos Duendes, uma série de instalações imersivas para o público infantil.`,
          credentials: [
            { icon: '🎨', text: 'Diretora de Arte, Rio Museu Olímpico' },
            { icon: '✏️', text: 'Designer Visual + Cenografia Digital' },
            { icon: '👥', text: 'Concept Art + Character Design' },
            { icon: '🖼️', text: 'Liderou equipe completa (UI, grafismo, sinalização)' },
            { icon: '🏰', text: 'Universo Casa dos Duendes (co-criação)' }
          ],
          linkedin: 'https://br.linkedin.com/in/anickcouto',
          photo: '/team/anick.jpg'
        },
        {
          name: 'Alberto Moura',
          role: 'DIRETOR AUDIOVISUAL & OPERAÇÕES',
          subtitle: 'Educador · Estrategista Cultural',
          bio: 'Lidera produção audiovisual, operações, coordenação de projetos, parcerias acadêmicas e estratégia cultural. Diretor Audiovisual no Rio Museu Olímpico. Faz a ponte entre instituições, educação e experiência do público.',
          expandedBio: `Alberto combina experiência em produção audiovisual com profundo conhecimento em educação e estratégia cultural.

Suas áreas de atuação:
• Produção Audiovisual completa
• Coordenação de Projetos Complexos
• Parcerias Acadêmicas e Institucionais
• Estratégia Cultural para marcas e museus
• Educação em Audiovisual (graduação e pós)

No Museu Olímpico, foi responsável por toda a produção audiovisual, incluindo captação, edição, motion graphics e integração com a cenografia física.

Como educador, formou centenas de profissionais em audiovisual, trazendo esta experiência pedagógica para os projetos da Azimut Academy.`,
          credentials: [
            { icon: '🎬', text: 'Diretor Audiovisual, Rio Museu Olímpico' },
            { icon: '🎓', text: 'Professor Universitário (graduação + pós)' },
            { icon: '📚', text: 'Ex-Coordenador de Curso de Audiovisual' },
            { icon: '🏢', text: 'Fundador empresa de Digital Signage' },
            { icon: '🤝', text: 'Estratégia Cultural + Parcerias Acadêmicas' }
          ],
          linkedin: 'https://br.linkedin.com/in/albertomoura3d',
          photo: '/team/alberto.jpg'
        }
      ]
    },
    en: {
      title: 'Meet the Team',
      subtitle: 'The directors and specialists behind Azimut\'s immersive experiences',
      team: [
        {
          name: 'Ranz Enberger',
          role: 'CREATIVE & TECHNOLOGY DIRECTOR',
          subtitle: 'Filmmaker · Researcher · Curator',
          bio: 'Leads creative direction, technology, immersive storytelling, VR/XR, curatorship and AI-driven pipelines. General Director at Rio Olympic Museum. Master\'s in Creative Media (UFRJ), Systems Analysis post-grad. Started AI research for animation in 1997. Canadian citizen with global reach.',
          expandedBio: `With 30+ years of experience in audiovisual production, CG and immersive technologies, Ranz is a pioneer in integrating cinematic narrative with emerging technologies.

His unique trajectory combines:
• High-level Cinematographic Production
• Technology Direction in institutional projects
• Specialized VR/XR curatorship
• Academic research in AI for narrative
• Post-graduate education

At Rio Olympic Museum, he was responsible for all technology direction, including integration of 50+ interactive screens, games, VR rooms, mapped projections and complex interactive systems.

As VR curator at Gramado Festival (since 2017), he selects and presents the best virtual reality films from around the world, helping to build Brazilian audiences for this new language.`,
          credentials: [
            { icon: '🏛️', text: 'Technology Director, Rio Olympic Museum (2015-2017)' },
            { icon: '🎬', text: 'VR Curator, Gramado Festival (2017-present)' },
            { icon: '🔧', text: 'Ex-Application Engineer & Training Specialist Autodesk' },
            { icon: '🎨', text: 'Autodesk Discreet Demo Artist (1996-2008)' },
            { icon: '🍁', text: 'Only Autodesk Canada contract in South America' },
            { icon: '🔥', text: 'Only certified Flame Trainer in Brazil' },
            { icon: '🎓', text: 'Post-graduate professor in Creative Media' },
            { icon: '🤖', text: '30+ years in CG, VR/XR and AI for audiovisual' }
          ],
          linkedin: 'https://ca.linkedin.com/in/ranzenberger',
          photo: '/team/ranz.jpg',
          specialties: ['VR/XR', 'Generative AI', 'Technical Direction', 'Curatorship', 'Cinema', 'VFX', 'Flame', 'Education']
        },
        {
          name: 'Anick Couto',
          role: 'ART DIRECTOR',
          subtitle: 'Visual & Experience Designer',
          bio: 'Responsible for visual direction, character and environment design, scenography, concept art and animation aesthetics. Led the entire art team at Rio Olympic Museum – UI, graphics, wall texts, signage, and complete design.',
          expandedBio: `Anick brings artistic sensitivity and technical rigor to every Azimut project.

Her expertise includes:
• Complete Art Direction (from concept to execution)
• 2D/3D Character and Environment Design
• Digital Scenography for installations
• Concept Art for immersive narratives
• UI/UX for interactive experiences

At the Olympic Museum, she coordinated a multidisciplinary team of designers, illustrators and animators, creating a cohesive visual language for 50+ interaction points.

She is also co-creator of the Casa dos Duendes visual universe, a series of immersive installations for children.`,
          credentials: [
            { icon: '🎨', text: 'Art Director, Rio Olympic Museum' },
            { icon: '✏️', text: 'Visual Designer + Digital Scenography' },
            { icon: '👥', text: 'Concept Art + Character Design' },
            { icon: '🖼️', text: 'Led complete team (UI, graphics, signage)' },
            { icon: '🏰', text: 'Casa dos Duendes universe (co-creation)' }
          ],
          linkedin: 'https://br.linkedin.com/in/anickcouto',
          photo: '/team/anick.jpg',
          specialties: ['Art Direction', 'Character Design', 'Concept Art', 'UI/UX', 'Digital Scenography', '2D/3D', 'Illustration']
        },
        {
          name: 'Alberto Moura',
          role: 'AUDIOVISUAL & OPERATIONS DIRECTOR',
          subtitle: 'Educator · Cultural Strategist',
          bio: 'Leads audiovisual production, operations, project coordination, academic partnerships and cultural strategy. Audiovisual Director at Rio Olympic Museum. Bridges institutions, education and public experience.',
          expandedBio: `Alberto combines audiovisual production experience with deep knowledge in education and cultural strategy.

His areas of practice:
• Complete Audiovisual Production
• Complex Project Coordination
• Academic and Institutional Partnerships
• Cultural Strategy for brands and museums
• Audiovisual Education (undergraduate and graduate)

At the Olympic Museum, he was responsible for all audiovisual production, including capture, editing, motion graphics and integration with physical scenography.

As an educator, he trained hundreds of professionals in audiovisual, bringing this pedagogical experience to Azimut Academy projects.`,
          credentials: [
            { icon: '🎬', text: 'Audiovisual Director, Rio Olympic Museum' },
            { icon: '🎓', text: 'University Professor (undergraduate + graduate)' },
            { icon: '📚', text: 'Ex-Audiovisual Course Coordinator' },
            { icon: '🏢', text: 'Digital Signage company founder' },
            { icon: '🤝', text: 'Cultural Strategy + Academic Partnerships' }
          ],
          linkedin: 'https://br.linkedin.com/in/albertomoura3d',
          photo: '/team/alberto.jpg',
          specialties: ['AV Production', 'Coordination', 'Cultural Strategy', 'Education', 'Digital Signage', 'Partnerships']
        }
      ]
    }
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

        <div className="mx-auto max-w-7xl px-6">
          {/* Breadcrumbs */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-theme-text-secondary">
            <LangLink to="/" className="hover:text-azimut-red transition-colors">Home</LangLink>
            <span>›</span>
            <LangLink to="/studio" className="hover:text-azimut-red transition-colors">Studio</LangLink>
            <span>›</span>
            <span className="text-azimut-red font-medium">{text.title}</span>
          </nav>

          {/* Hero */}
          <div className="mb-16 text-center">
            <div className="mb-4 inline-block px-4 py-2 rounded-full bg-azimut-red/10 border border-azimut-red/30 text-sm font-semibold text-azimut-red uppercase tracking-wider">
              👥 Team
            </div>
            <h1 className="mb-4 font-handel text-5xl md:text-6xl lg:text-7xl font-bold uppercase text-theme-text">
              {text.title}
            </h1>
            <p className="text-xl md:text-2xl text-theme-text-secondary max-w-4xl mx-auto leading-relaxed">
              {text.subtitle}
            </p>
          </div>

          {/* Team Members - SUPER DETALHADO */}
          <div className="space-y-20">
            {text.team.map((member, i) => (
              <article key={i} className="relative">
                <div className="grid lg:grid-cols-[400px,1fr] gap-10">
                  {/* Coluna Esquerda - Foto e Links */}
                  <div className="sticky top-24 self-start">
                    {/* Foto */}
                    <div className="relative mb-6 group">
                      <div className="aspect-[3/4] rounded-xl bg-gradient-to-br from-azimut-red/20 to-slate-900 flex items-center justify-center overflow-hidden border-2 border-azimut-red/30">
                        <span className="text-9xl">👤</span>
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <p className="text-white text-sm text-center px-4">
                            [PLACEHOLDER]<br/>
                            Upload foto real no backoffice:<br/>
                            {member.photo}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Info Card */}
                    <div className="p-6 rounded-lg bg-slate-900/50 border border-azimut-red/20">
                      <h2 className="text-2xl font-bold text-white mb-2">{member.name}</h2>
                      <p className="text-azimut-red text-sm uppercase tracking-wider mb-3">{member.role}</p>
                      <p className="text-sm text-theme-text-secondary mb-4">{member.subtitle}</p>
                      
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-azimut-red text-white hover:bg-azimut-red/90 transition-all font-semibold"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                          </svg>
                          LinkedIn
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Coluna Direita - Bio e Credenciais */}
                  <div className="space-y-8">
                    {/* Bio */}
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                        <span className="text-azimut-red">📖</span>
                        Biografia
                      </h3>
                      <div className="space-y-4">
                        <p className="text-lg leading-relaxed text-theme-text-secondary">
                          {member.bio}
                        </p>
                        {member.expandedBio && (
                          <div className="p-6 rounded-lg bg-slate-900/30 border-l-4 border-azimut-red/50">
                            <p className="text-theme-text-secondary leading-relaxed whitespace-pre-line">
                              {member.expandedBio}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Credenciais */}
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <span className="text-azimut-red">🏆</span>
                        Credenciais & Conquistas
                      </h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {member.credentials.map((cred, j) => (
                          <div key={j} className="flex items-start gap-3 p-4 rounded-lg bg-slate-900/30 hover:bg-slate-900/50 border border-transparent hover:border-azimut-red/30 transition-all group">
                            <span className="text-2xl group-hover:scale-110 transition-transform">{cred.icon}</span>
                            <span className="text-sm text-theme-text-secondary group-hover:text-theme-text transition-colors">{cred.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Especialidades */}
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                        <span className="text-azimut-red">⚡</span>
                        Especialidades
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {member.specialties && member.specialties.map((spec, j) => (
                          <span key={j} className="px-4 py-2 rounded-full text-sm font-semibold bg-azimut-red/10 text-white border border-azimut-red/30 hover:bg-azimut-red hover:text-black transition-all cursor-default">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Separador */}
                {i < text.team.length - 1 && (
                  <div className="mt-20 h-px bg-gradient-to-r from-transparent via-azimut-red/50 to-transparent"></div>
                )}
              </article>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-20 text-center">
            <p className="text-xl text-theme-text-secondary mb-6">
              {lang === 'pt' ? 'Interessado em trabalhar com nossa equipe?' : 'Interested in working with our team?'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <LangLink
                to="/contact"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-lg bg-azimut-red text-white font-sora font-bold uppercase tracking-wider hover:bg-azimut-red/90 transition-all shadow-xl hover:shadow-2xl"
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

// Adicionar especialidades inline (placeholder - você pode trocar)
const teamDataWithSpecialties = {
  pt: {
    team: [
      { specialties: ['VR/XR', 'IA Generativa', 'Direção Técnica', 'Curadoria', 'Cinema', 'VFX', 'Flame', 'Educação'] },
      { specialties: ['Art Direction', 'Character Design', 'Concept Art', 'UI/UX', 'Cenografia Digital', '2D/3D', 'Ilustração'] },
      { specialties: ['Produção AV', 'Coordenação', 'Estratégia Cultural', 'Educação', 'Digital Signage', 'Parcerias'] }
    ]
  }
}

export default StudioTeam
