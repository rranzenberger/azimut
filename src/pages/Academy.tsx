import React from 'react'
import { t, type Lang } from '../i18n'
import SEO, { seoData } from '../components/SEO'
import { useUserTracking } from '../hooks/useUserTracking'

interface AcademyProps {
  lang: Lang
}

const Academy: React.FC<AcademyProps> = ({ lang }) => {
  useUserTracking()
  const seo = seoData.academy[lang]

  const workshops = [
    {
      title: { pt: 'VR Cinematográfico', en: 'Cinematic VR', es: 'VR Cinematográfico' },
      description: { 
        pt: 'Introdução à produção de filmes em realidade virtual, linguagem 360°, direção e pós-produção.',
        en: 'Introduction to virtual reality filmmaking, 360° language, direction and post-production.',
        es: 'Introducción a la producción de películas en realidad virtual, lenguaje 360°, dirección y postproducción.'
      },
      duration: '16h',
      level: { pt: 'Intermediário', en: 'Intermediate', es: 'Intermedio' }
    },
    {
      title: { pt: 'IA para Produção Audiovisual', en: 'AI for Audiovisual Production', es: 'IA para Producción Audiovisual' },
      description: { 
        pt: 'Pipelines de IA generativa aplicados a roteiro, storyboard, animação, VFX e finalização.',
        en: 'Generative AI pipelines applied to script, storyboard, animation, VFX and finishing.',
        es: 'Pipelines de IA generativa aplicados a guión, storyboard, animación, VFX y finalización.'
      },
      duration: '12h',
      level: { pt: 'Avançado', en: 'Advanced', es: 'Avanzado' }
    },
    {
      title: { pt: 'Instalações Interativas', en: 'Interactive Installations', es: 'Instalaciones Interactivas' },
      description: { 
        pt: 'Desenvolvimento de experiências interativas para museus, eventos e espaços públicos.',
        en: 'Development of interactive experiences for museums, events and public spaces.',
        es: 'Desarrollo de experiencias interactivas para museos, eventos y espacios públicos.'
      },
      duration: '20h',
      level: { pt: 'Intermediário', en: 'Intermediate', es: 'Intermedio' }
    },
    {
      title: { pt: 'Motion Design & Animação', en: 'Motion Design & Animation', es: 'Motion Design & Animación' },
      description: { 
        pt: 'Técnicas de motion graphics, animação 2D/3D e composição para projetos imersivos.',
        en: 'Motion graphics techniques, 2D/3D animation and compositing for immersive projects.',
        es: 'Técnicas de motion graphics, animación 2D/3D y composición para proyectos inmersivos.'
      },
      duration: '24h',
      level: { pt: 'Básico', en: 'Beginner', es: 'Básico' }
    }
  ]

  const locale = (entry: { pt: string; en: string; es: string }) => {
    if (lang === 'fr') return entry.en // Fallback para francês usar inglês
    return entry[lang as 'pt' | 'en' | 'es'] || entry.en
  }

  return (
    <>
      <SEO 
        lang={lang}
        title={seo.title}
        description={seo.description}
        path="/academy"
      />
      <main className="relative py-16 md:py-20">
        {/* Star background on the side */}
        <div 
          className="pointer-events-none fixed top-20 -right-28 h-[520px] w-[520px] md:top-32 md:-right-40 md:h-[680px] md:w-[680px]" 
          style={{ 
            opacity: 0.3,
            zIndex: -5
          }}
        >
          <img src="/logo-azimut-star.svg" alt="" className="h-full w-full object-contain" />
        </div>

        <div className="mx-auto max-w-6xl px-6">
          <h1 className="mb-4 font-handel text-4xl uppercase tracking-[0.16em] md:text-5xl" style={{ color: 'var(--theme-text)' }}>
            {t(lang, 'navAcademy')}
          </h1>
          <p className="mb-12 max-w-2xl text-lg leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
            {lang === 'pt' 
              ? 'Workshops, cursos e treinamentos in-company em tecnologias imersivas, IA e produção audiovisual.'
              : lang === 'es'
              ? 'Workshops, cursos y entrenamientos in-company en tecnologías inmersivas, IA y producción audiovisual.'
              : 'Workshops, courses and in-company training in immersive technologies, AI and audiovisual production.'}
          </p>

          {/* Workshops Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {workshops.map((workshop, idx) => (
              <article
                key={idx}
                className="group rounded-2xl border border-white/10 card-adaptive p-6 shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur transition-all hover:border-white/20 hover:shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="inline-block rounded-full border border-azimut-red/30 bg-azimut-red/10 px-3 py-1 font-sora text-[0.68rem] uppercase tracking-[0.2em] text-azimut-red">
                    {workshop.duration}
                  </span>
                  <span className="font-sora text-[0.7rem] text-slate-300">
                    {locale(workshop.level)}
                  </span>
                </div>
                <h3 className="mb-3 font-sora text-xl text-white">
                  {locale(workshop.title)}
                </h3>
                <p className="text-sm leading-relaxed text-slate-200">
                  {locale(workshop.description)}
                </p>
              </article>
            ))}
          </div>

          {/* Training Types */}
          <section className="mt-16">
            <h2 className="mb-6 font-handel text-2xl uppercase tracking-[0.14em]" style={{ color: 'var(--theme-text)' }}>
              {lang === 'pt' ? 'Formatos de Treinamento' : lang === 'es' ? 'Formatos de Entrenamiento' : 'Training Formats'}
            </h2>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { 
                  title: { pt: 'Workshops', en: 'Workshops', es: 'Workshops' },
                  desc: { pt: 'Intensivos de 8-24h', en: '8-24h intensive', es: 'Intensivos de 8-24h' }
                },
                { 
                  title: { pt: 'In-Company', en: 'In-Company', es: 'In-Company' },
                  desc: { pt: 'Treinamentos customizados', en: 'Custom training', es: 'Entrenamientos personalizados' }
                },
                { 
                  title: { pt: 'Consultoria', en: 'Consulting', es: 'Consultoría' },
                  desc: { pt: 'Projetos e mentoria', en: 'Projects & mentorship', es: 'Proyectos y mentoría' }
                }
              ].map((format, idx) => (
                <div 
                  key={idx}
                  className="rounded-xl border border-white/10 card-adaptive p-6 text-center backdrop-blur"
                >
                  <h3 className="mb-2 font-sora text-lg text-white">
                    {locale(format.title)}
                  </h3>
                  <p className="text-sm text-slate-300">
                    {locale(format.desc)}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  )
}

export default Academy
