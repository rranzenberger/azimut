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
  // Estrela FIXA (sem parallax) - Padronizada com Studio principal

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
    fr: {
      title: 'Références & Timeline',
      subtitle: 'Notre parcours de 30 ans',
      timeline: [
        {
          period: '1996-2004',
          title: 'Architecad + Fondations',
          icon: '🏗️',
          items: [
            'Pionniers en Maquette Virtuelle au Brésil',
            'Centre de Formation Autodesk',
            'Seul Application Engineer en Amérique du Sud',
            'Demo Artist Autodesk Discreet (1996-2008)',
            'Azimut Informatique et Productions Cinématographiques (1998-2004)'
          ]
        },
        {
          period: '2004-2018',
          title: 'Azimut École',
          icon: '🎓',
          items: [
            'Cours professionnels : Animation, VFX, Maquette Virtuelle',
            'Seul Flame Trainer certifié au Brésil',
            'Nous avons formé des centaines de professionnels',
            'Centre de Formation Autodesk (seul en Amérique du Sud)',
            'Cours de 1-2 ans + cours de courte durée',
            'CAD, 3ds Max, Photoshop, After Effects, Flame'
          ]
        },
        {
          period: '2018-2025',
          title: 'Azimut Projets Audiovisuels',
          icon: '🎬',
          items: [
            'Direction Technique Musée Olympique de Rio',
            'Curation VR Festival de Gramado (depuis 2017)',
            'Installations immersives + IA',
            'Projets avec YDreams et institutions',
            'Opération binationale Brésil-Canada',
            'Focus culture, musées, festivals et marques'
          ]
        }
      ],
      credentials: [
        { icon: '🏆', title: 'XRBR', desc: 'Membres fondateurs Association XR Brésil', year: '2018' },
        { icon: '🎓', title: 'Maîtrise UFRJ', desc: 'Médias Créatifs & Technologie Éducative', year: '2010' },
        { icon: '🎬', title: 'Festival Gramado', desc: 'Curation VR officielle (8 ans consécutifs)', year: '2017' },
        { icon: '🏛️', title: 'Musée Olympique', desc: 'Direction Générale Technologie', year: '2015-2017' },
        { icon: '🔥', title: 'Autodesk Flame', desc: 'Seul Flame Trainer certifié au Brésil', year: '2000-2015' },
        { icon: '🍁', title: 'Autodesk Canada', desc: 'Seul contrat en Amérique du Sud', year: '1996-2008' },
        { icon: '🌍', title: 'International', desc: 'Rio, SP, Belém, Florianópolis, Vancouver', year: '2020' },
        { icon: '🤖', title: 'Pionnier IA', desc: 'Recherche IA pour animation', year: '1997' }
      ]
    },
    es: {
      title: 'Credenciales & Timeline',
      subtitle: 'Nuestro recorrido de 30 años',
      timeline: [
        {
          period: '1996-2004',
          title: 'Architecad + Fundaciones',
          icon: '🏗️',
          items: [
            'Pioneros en Maqueta Virtual en Brasil',
            'Centro de Formación Autodesk',
            'Único Application Engineer en América del Sur',
            'Demo Artist Autodesk Discreet (1996-2008)',
            'Azimut Informática y Producciones Cinematográficas (1998-2004)'
          ]
        },
        {
          period: '2004-2018',
          title: 'Azimut Escuela',
          icon: '🎓',
          items: [
            'Cursos profesionales: Animación, VFX, Maqueta Virtual',
            'Único Flame Trainer certificado en Brasil',
            'Formamos cientos de profesionales',
            'Centro de Formación Autodesk (único en América del Sur)',
            'Cursos de 1-2 años + cursos de corta duración',
            'CAD, 3ds Max, Photoshop, After Effects, Flame'
          ]
        },
        {
          period: '2018-2025',
          title: 'Azimut Proyectos Audiovisuales',
          icon: '🎬',
          items: [
            'Dirección Técnica Museo Olímpico de Río',
            'Curaduría VR Festival de Gramado (desde 2017)',
            'Instalaciones inmersivas + IA',
            'Proyectos con YDreams e instituciones',
            'Operación binacional Brasil-Canadá',
            'Enfoque en cultura, museos, festivales y marcas'
          ]
        }
      ],
      credentials: [
        { icon: '🏆', title: 'XRBR', desc: 'Miembros fundadores Asociación XR Brasil', year: '2018' },
        { icon: '🎓', title: 'Maestría UFRJ', desc: 'Medios Creativos & Tecnología Educativa', year: '2010' },
        { icon: '🎬', title: 'Festival Gramado', desc: 'Curaduría VR oficial (8 años consecutivos)', year: '2017' },
        { icon: '🏛️', title: 'Museo Olímpico', desc: 'Dirección General Tecnología', year: '2015-2017' },
        { icon: '🔥', title: 'Autodesk Flame', desc: 'Único Flame Trainer certificado en Brasil', year: '2000-2015' },
        { icon: '🍁', title: 'Autodesk Canadá', desc: 'Único contrato en América del Sur', year: '1996-2008' },
        { icon: '🌍', title: 'Internacional', desc: 'Río, SP, Belém, Florianópolis, Vancouver', year: '2020' },
        { icon: '🤖', title: 'Pionero IA', desc: 'Investigación IA para animación', year: '1997' }
      ]
    },
    en: {
      title: 'Credentials & Timeline',
      subtitle: 'Our 30-year journey',
      timeline: [
        {
          period: '1996-2004',
          title: 'Architecad + Foundations',
          icon: '🏗️',
          items: [
            'Pioneers in Virtual Mockup in Brazil',
            'Autodesk Training Center',
            'Only Application Engineer in South America',
            'Autodesk Discreet Demo Artist (1996-2008)',
            'Azimut Computing and Cinematographic Productions (1998-2004)'
          ]
        },
        {
          period: '2004-2018',
          title: 'Azimut School',
          icon: '🎓',
          items: [
            'Professional courses: Animation, VFX, Virtual Mockup',
            'Only certified Flame Trainer in Brazil',
            'We trained hundreds of professionals',
            'Autodesk Training Center (only one in South America)',
            '1-2 year courses + short-term courses',
            'CAD, 3ds Max, Photoshop, After Effects, Flame'
          ]
        },
        {
          period: '2018-2025',
          title: 'Azimut Audiovisual Projects',
          icon: '🎬',
          items: [
            'Technical Direction Rio Olympic Museum',
            'VR Curation Gramado Festival (since 2017)',
            'Immersive installations + AI',
            'Projects with YDreams and institutions',
            'Binational operation Brazil-Canada',
            'Focus on culture, museums, festivals and brands'
          ]
        }
      ],
      credentials: [
        { icon: '🏆', title: 'XRBR', desc: 'Founding members of Extended Reality Brazil Association', year: '2018' },
        { icon: '🎓', title: 'Master UFRJ', desc: 'Creative Media & Technology in Education', year: '2010' },
        { icon: '🎬', title: 'Gramado Festival', desc: 'Official VR Curation (8 consecutive years)', year: '2017' },
        { icon: '🏛️', title: 'Olympic Museum', desc: 'General Technology Direction', year: '2015-2017' },
        { icon: '🔥', title: 'Autodesk Flame', desc: 'Only certified Flame Trainer in Brazil', year: '2000-2015' },
        { icon: '🍁', title: 'Autodesk Canada', desc: 'Only contract in South America', year: '1996-2008' },
        { icon: '🌍', title: 'International', desc: 'Rio, SP, Belém, Florianópolis, Vancouver', year: '2020' },
        { icon: '🤖', title: 'AI Pioneer', desc: 'AI research for animation', year: '1997' }
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
        path="/studio/credibilidade"
      />
      
      <main className="relative py-16 md:py-20">
        {/* Star Background - FIXA (FUNDO - atrás de tudo) */}
        <div 
          className="pointer-events-none fixed top-20 -right-28 h-[520px] w-[520px] md:top-24 md:-right-40 md:h-[680px] md:w-[680px] opacity-50"
          style={{ zIndex: -10 }}
        >
          <img src="/logo-azimut-star.svg" alt="" className="h-full w-full object-contain" loading="lazy" />
        </div>

        <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 lg:px-8">
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
            {/* Eyebrow com emoji */}
            <span className="section-eyebrow">
              <span>🏆</span>
              {lang === 'pt' ? 'CREDENCIAIS' : lang === 'es' ? 'CREDENCIALES' : lang === 'fr' ? 'RÉFÉRENCES' : 'CREDENTIALS'}
            </span>
            
            {/* Título grande */}
            <h1 className="section-title">
              {text.title}
            </h1>
            
            {/* Subtítulo */}
            <p className="body-large">
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
                  <h3 className="text-sm font-bold text-white mb-2 uppercase tracking-wide line-clamp-2" style={{ minHeight: '2.5rem' }}>{cred.title}</h3>
                  <p className="text-xs text-theme-text-secondary mb-2 line-clamp-3" style={{ minHeight: '3rem' }}>{cred.desc}</p>
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
                className="inline-flex items-center gap-3 px-10 py-5 rounded-lg bg-azimut-red text-white font-sora font-bold uppercase tracking-wider hover:bg-azimut-red/90 transition-all shadow-xl"
              >
                {lang === 'pt' ? 'Iniciar um Projeto' : lang === 'es' ? 'Iniciar un Proyecto' : lang === 'fr' ? 'Démarrer un Projet' : 'Start a Project'}
                <span className="text-xl">→</span>
              </LangLink>
              <LangLink
                to="/studio"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-lg border-2 border-white/30 text-white hover:bg-white hover:text-black transition-all font-sora font-bold uppercase tracking-wider"
              >
                <span className="text-xl">←</span>
                {lang === 'pt' ? 'Voltar para Studio' : lang === 'es' ? 'Volver al Estudio' : lang === 'fr' ? 'Retour au Studio' : 'Back to Studio'}
              </LangLink>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}

export default StudioCredentials
