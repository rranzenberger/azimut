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
          bio: 'Lidera direção criativa, tecnologia, storytelling imersivo, VR/XR, curadoria e pipelines com IA. Diretor Geral no Rio Museu Olímpico. Mestrado em Mídias Criativas (UFRJ-VF), pós em Análise de Sistemas. Iniciou pesquisa em IA para animação em 1997. Cidadão canadense com atuação global.',
          expandedBio: `Com mais de 30 anos de experiência em produção audiovisual, CG e tecnologias imersivas, Ranz é um pioneiro em integrar narrativa cinematográfica com tecnologias emergentes.

Sua trajetória única combina produção cinematográfica de alto nível, direção de tecnologia em projetos institucionais, curadoria especializada em VR/XR, pesquisa acadêmica em IA para narrativa e educação em pós-graduação.

No Rio Museu Olímpico, foi responsável por toda a direção de tecnologia, incluindo integração de 50+ telas interativas, games, VR rooms, projeções mapeadas e sistemas interativos complexos. Como curador de VR no Festival de Gramado (desde 2017), seleciona e apresenta os melhores filmes em realidade virtual do mundo.`,
          credentials: [
            'Diretor de Tecnologia, Rio Museu Olímpico (2015-2017)',
            'Curador VR, Festival de Gramado (2017-presente)',
            'Ex-Application Engineer & Training Specialist Autodesk',
            'Autodesk Discreet Demo Artist (1996-2008)',
            'Único contrato Canadá Autodesk na América do Sul',
            'Único Flame Trainer certificado no Brasil',
            'Professor pós-graduação em Mídias Criativas',
            '30+ anos em CG, VR/XR e IA para audiovisual'
          ],
          linkedin: 'https://ca.linkedin.com/in/ranzenberger',
          photo: '/Ranz.jpeg'
        },
        {
          name: 'Anick Couto',
          role: 'DIRETORA DE ARTE',
          subtitle: 'Designer Visual & de Experiência',
          bio: 'Responsável pela direção visual, design de personagens e ambientes, cenografia, concept art e estética de animação. Liderou toda a equipe de arte no Rio Museu Olímpico – UI, grafismo, textos de parede, sinalização e design completo.',
          expandedBio: `Anick traz sensibilidade artística e rigor técnico para cada projeto da Azimut.

Sua expertise inclui direção de arte completa (do conceito à execução), design de personagens e ambientes 2D/3D, cenografia digital para instalações, concept art para narrativas imersivas e UI/UX para experiências interativas.

No Museu Olímpico, coordenou uma equipe multidisciplinar de designers, ilustradores e animadores, criando uma linguagem visual coesa para mais de 50 pontos de interação. Também é co-criadora do universo visual de Casa dos Duendes.`,
          credentials: [
            'Diretora de Arte, Rio Museu Olímpico',
            'Designer Visual + Cenografia Digital',
            'Concept Art + Character Design',
            'Liderou equipe completa (UI, grafismo, sinalização)',
            'Universo Casa dos Duendes (co-criação)'
          ],
          linkedin: 'https://br.linkedin.com/in/anickcouto',
          photo: '/anick.jpg'
        },
        {
          name: 'Alberto Moura',
          role: 'DIRETOR AUDIOVISUAL & OPERAÇÕES',
          subtitle: 'Educador · Estrategista Cultural',
          bio: 'Lidera produção audiovisual, operações, coordenação de projetos, parcerias acadêmicas e estratégia cultural. Diretor Audiovisual no Rio Museu Olímpico. Faz a ponte entre instituições, educação e experiência do público.',
          expandedBio: `Alberto combina experiência em produção audiovisual com profundo conhecimento em educação e estratégia cultural.

Suas áreas de atuação incluem produção audiovisual completa, coordenação de projetos complexos, parcerias acadêmicas e institucionais, estratégia cultural para marcas e museus, e educação em audiovisual (graduação e pós).

No Museu Olímpico, foi responsável por toda a produção audiovisual, incluindo captação, edição, motion graphics e integração com a cenografia física. Como educador, formou centenas de profissionais.`,
          credentials: [
            'Diretor Audiovisual, Rio Museu Olímpico',
            'Professor Universitário (graduação + pós)',
            'Ex-Coordenador de Curso de Audiovisual',
            'Fundador empresa de Digital Signage',
            'Estratégia Cultural + Parcerias Acadêmicas'
          ],
          linkedin: 'https://br.linkedin.com/in/albertomoura3d',
          photo: '/alberto.jpg'
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

His unique trajectory combines high-level cinematographic production, technology direction in institutional projects, specialized VR/XR curatorship, academic research in AI for narrative, and post-graduate education.

At Rio Olympic Museum, he was responsible for all technology direction, including integration of 50+ interactive screens, games, VR rooms, mapped projections and complex interactive systems. As VR curator at Gramado Festival (since 2017), he selects and presents the best virtual reality films from around the world.`,
          credentials: [
            'Technology Director, Rio Olympic Museum (2015-2017)',
            'VR Curator, Gramado Festival (2017-present)',
            'Ex-Application Engineer & Training Specialist Autodesk',
            'Autodesk Discreet Demo Artist (1996-2008)',
            'Only Autodesk Canada contract in South America',
            'Only certified Flame Trainer in Brazil',
            'Post-graduate professor in Creative Media',
            '30+ years in CG, VR/XR and AI for audiovisual'
          ],
          linkedin: 'https://ca.linkedin.com/in/ranzenberger',
          photo: '/Ranz.jpeg'
        },
        {
          name: 'Anick Couto',
          role: 'ART DIRECTOR',
          subtitle: 'Visual & Experience Designer',
          bio: 'Responsible for visual direction, character and environment design, scenography, concept art and animation aesthetics. Led the entire art team at Rio Olympic Museum – UI, graphics, wall texts, signage, and complete design.',
          expandedBio: `Anick brings artistic sensitivity and technical rigor to every Azimut project.

Her expertise includes complete art direction (from concept to execution), 2D/3D character and environment design, digital scenography for installations, concept art for immersive narratives, and UI/UX for interactive experiences.

At the Olympic Museum, she coordinated a multidisciplinary team of designers, illustrators and animators, creating a cohesive visual language for 50+ interaction points. She is also co-creator of the Casa dos Duendes visual universe.`,
          credentials: [
            'Art Director, Rio Olympic Museum',
            'Visual Designer + Digital Scenography',
            'Concept Art + Character Design',
            'Led complete team (UI, graphics, signage)',
            'Casa dos Duendes universe (co-creation)'
          ],
          linkedin: 'https://br.linkedin.com/in/anickcouto',
          photo: '/anick.jpg'
        },
        {
          name: 'Alberto Moura',
          role: 'AUDIOVISUAL & OPERATIONS DIRECTOR',
          subtitle: 'Educator · Cultural Strategist',
          bio: 'Leads audiovisual production, operations, project coordination, academic partnerships and cultural strategy. Audiovisual Director at Rio Olympic Museum. Bridges institutions, education and public experience.',
          expandedBio: `Alberto combines audiovisual production experience with deep knowledge in education and cultural strategy.

His areas of practice include complete audiovisual production, complex project coordination, academic and institutional partnerships, cultural strategy for brands and museums, and audiovisual education (undergraduate and graduate).

At the Olympic Museum, he was responsible for all audiovisual production, including capture, editing, motion graphics and integration with physical scenography. As an educator, he trained hundreds of professionals.`,
          credentials: [
            'Audiovisual Director, Rio Olympic Museum',
            'University Professor (undergraduate + graduate)',
            'Ex-Audiovisual Course Coordinator',
            'Digital Signage company founder',
            'Cultural Strategy + Academic Partnerships'
          ],
          linkedin: 'https://br.linkedin.com/in/albertomoura3d',
          photo: '/alberto.jpg'
        }
      ]
    },
    fr: { title: 'Équipe', subtitle: '', team: [] },
    es: { title: 'Equipo', subtitle: '', team: [] }
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
            <h1 className="mb-4 font-handel text-5xl md:text-6xl lg:text-7xl font-bold uppercase text-theme-text">
              👥 {text.title}
            </h1>
            <p className="text-xl md:text-2xl text-theme-text-secondary max-w-4xl mx-auto">
              {text.subtitle}
            </p>
          </div>

          {/* Team Members - LAYOUT HORIZONTAL (foto ao lado) */}
          <div className="space-y-24">
            {text.team.map((member, i) => (
              <article key={i} className="rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-900/30 border-2 border-azimut-red/30 overflow-hidden hover:border-azimut-red/50 transition-all">
                <div className="grid md:grid-cols-[380px,1fr] gap-0">
                  {/* FOTO AO LADO (coluna esquerda) - 380px fixa */}
                  <div className="relative bg-gradient-to-br from-azimut-red/20 to-slate-900">
                    {/* Foto grande */}
                    <div className="aspect-[3/4] md:aspect-auto md:h-full flex items-center justify-center p-8">
                      <div className="relative w-full h-full min-h-[500px] rounded-xl overflow-hidden bg-azimut-red/10 flex items-center justify-center border-2 border-azimut-red/30">
                        <span className="text-9xl">👤</span>
                        <div className="absolute bottom-4 left-4 right-4 text-center">
                          <p className="text-xs text-white/60 mb-2">[PLACEHOLDER]</p>
                          <p className="text-xs text-white/80">Upload: {member.photo}</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* LinkedIn - DESTAQUE */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-3 px-6 py-4 rounded-lg bg-azimut-red text-white hover:bg-azimut-red/90 transition-all font-bold shadow-xl"
                      >
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                        LinkedIn →
                      </a>
                    </div>
                  </div>

                  {/* INFO AO LADO (coluna direita) */}
                  <div className="p-8 md:p-10 lg:p-12">
                    {/* Header */}
                    <div className="mb-8">
                      <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">{member.name}</h2>
                      <p className="text-azimut-red text-sm uppercase tracking-widest mb-2 font-semibold">{member.role}</p>
                      <p className="text-theme-text-secondary text-lg">{member.subtitle}</p>
                    </div>

                    {/* Bio curta */}
                    <div className="mb-8">
                      <p className="text-lg leading-relaxed text-theme-text-secondary">
                        {member.bio}
                      </p>
                    </div>

                    {/* Bio expandida */}
                    {member.expandedBio && (
                      <div className="mb-8 p-6 rounded-lg bg-slate-900/50 border-l-4 border-azimut-red/50">
                        <p className="text-theme-text-secondary leading-relaxed whitespace-pre-line">
                          {member.expandedBio}
                        </p>
                      </div>
                    )}

                    {/* Credenciais */}
                    <div>
                      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        <span className="text-azimut-red">🏆</span>
                        {lang === 'pt' ? 'Credenciais' : lang === 'fr' ? 'Références' : lang === 'es' ? 'Credenciales' : 'Credentials'}
                      </h3>
                      <ul className="space-y-2">
                        {member.credentials.map((cred, j) => (
                          <li key={j} className="flex items-start gap-3 text-sm">
                            <span className="text-azimut-red mt-0.5">✓</span>
                            <span className="text-theme-text-secondary">{cred}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-20 text-center">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
              <LangLink
                to="/contact"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-lg bg-azimut-red text-white font-sora font-bold uppercase hover:bg-azimut-red/90 transition-all shadow-xl"
              >
                {lang === 'pt' ? 'Trabalhe Conosco' : lang === 'fr' ? 'Travaillez avec Nous' : lang === 'es' ? 'Trabaje con Nosotros' : 'Work With Us'}
                <span className="text-2xl">→</span>
              </LangLink>
              <LangLink
                to="/studio"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-lg border-2 border-white/30 text-white hover:bg-white hover:text-black transition-all font-semibold"
              >
                <span>←</span>
                {lang === 'pt' ? 'Voltar para Studio' : lang === 'fr' ? 'Retour au Studio' : lang === 'es' ? 'Volver al Estudio' : 'Back to Studio'}
              </LangLink>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default StudioTeam

