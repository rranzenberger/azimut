import React, { useEffect, useRef } from 'react'
import { t, type Lang } from '../i18n'
import SEO, { seoData } from '../components/SEO'
import { useUserTracking } from '../hooks/useUserTracking'
// MIGRAÇÃO GRADUAL: Backoffice reativado COM fallbacks fortes
import { useAzimutContent } from '../hooks/useAzimutContent'

interface WhatWeDoProps {
  lang: Lang
}

const WhatWeDo: React.FC<WhatWeDoProps> = ({ lang }) => {
  const { trackInteraction } = useUserTracking()
  const starRef = useRef<HTMLDivElement>(null)
  const seo = seoData.what[lang]
  
  // MIGRAÇÃO GRADUAL: Backoffice reativado COM fallbacks fortes
  const { content: cmsContent, loading: cmsLoading, error: cmsError } = useAzimutContent({ page: 'what' })
  
  // Fallback: Serviços padrão quando backoffice está vazio ou falha
  const defaultServices = [
    { 
      slug: 'cinema-audiovisual',
      title: lang === 'pt' ? 'Cinema & Audiovisual' : lang === 'es' ? 'Cine & Audiovisual' : lang === 'fr' ? 'Cinéma & Audiovisuel' : 'Cinema & Audiovisual',
      description: lang === 'pt' ? 'Criamos narrativas cinematográficas que conectam audiências. Do conceito à finalização, entregamos conteúdo de alta qualidade para museus, festivais e marcas, com expertise técnica de 30 anos.' : lang === 'es' ? 'Creamos narrativas cinematográficas que conectan audiencias. Del concepto a la finalización, entregamos contenido de alta calidad para museos, festivales y marcas, con expertise técnica de 30 años.' : lang === 'fr' ? 'Nous créons des narrations cinématographiques qui connectent les audiences. Du concept à la finalisation, nous livrons du contenu de haute qualité pour musées, festivals et marques, avec 30 ans d\'expertise technique.' : 'We create cinematic narratives that connect audiences. From concept to finishing, we deliver high-quality content for museums, festivals and brands, with 30 years of technical expertise.',
      icon: '🎬'
    },
    { 
      slug: 'animacao-2d-3d',
      title: lang === 'pt' ? 'Animação 2D/3D' : lang === 'es' ? 'Animación 2D/3D' : lang === 'fr' ? 'Animation 2D/3D' : '2D/3D Animation',
      description: lang === 'pt' ? 'Damos vida a personagens e mundos através de animação 2D/3D. Nossa expertise técnica permite criar narrativas visuais envolventes, desde storyboards até finalização completa.' : lang === 'es' ? 'Damos vida a personajes y mundos a través de animación 2D/3D. Nuestra expertise técnica nos permite crear narrativas visuales envolventes, desde storyboards hasta finalización completa.' : lang === 'fr' ? 'Nous donnons vie aux personnages et mondes grâce à l\'animation 2D/3D. Notre expertise technique nous permet de créer des narrations visuelles engageantes, des storyboards à la finalisation complète.' : 'We bring characters and worlds to life through 2D/3D animation. Our technical expertise enables us to create engaging visual narratives, from storyboards to complete finishing.',
      icon: '🎨'
    },
    { 
      slug: 'xr-interatividade',
      title: lang === 'pt' ? 'XR / Interatividade' : lang === 'es' ? 'XR / Interactivo' : lang === 'fr' ? 'XR / Interactif' : 'XR / Interactive',
      description: lang === 'pt' ? 'Criamos experiências imersivas que transportam pessoas para novos mundos. De filmes VR 360° a instalações interativas, nossa curadoria em festivais nos dá uma visão única do que funciona em narrativas imersivas.' : lang === 'es' ? 'Creamos experiencias inmersivas que transportan personas a nuevos mundos. De películas VR 360° a instalaciones interactivas, nuestra curaduría en festivales nos da una visión única de lo que funciona en narrativas inmersivas.' : lang === 'fr' ? 'Nous créons des expériences immersives qui transportent les gens vers de nouveaux mondes. Des films VR 360° aux installations interactives, notre curation de festivals nous donne un aperçu unique de ce qui fonctionne dans la narration immersive.' : 'We create immersive experiences that transport people to new worlds. From 360° VR films to interactive installations, our festival curation gives us unique insight into what works in immersive storytelling.',
      icon: '🥽'
    },
    { 
      slug: 'ia-criativa',
      title: lang === 'pt' ? 'IA Criativa' : lang === 'es' ? 'IA Creativa' : lang === 'fr' ? 'IA Créative' : 'Creative AI',
      description: lang === 'pt' ? 'Exploramos o potencial da IA generativa para narrativas. Nossa pesquisa desde 1997 e experiência prática nos permite criar pipelines únicos que combinam IA com linguagem cinematográfica tradicional.' : lang === 'es' ? 'Exploramos el potencial de la IA generativa para narrativas. Nuestra investigación desde 1997 y experiencia práctica nos permite crear pipelines únicos que combinan IA con lenguaje cinematográfico tradicional.' : lang === 'fr' ? 'Nous explorons le potentiel de l\'IA générative pour la narration. Nos recherches depuis 1997 et notre expérience pratique nous permettent de créer des pipelines uniques qui combinent IA et langage cinématographique traditionnel.' : 'We explore the potential of generative AI for storytelling. Our research since 1997 and practical experience enables us to create unique pipelines that combine AI with traditional cinematic language.',
      icon: '🤖'
    },
    { 
      slug: 'educacao-formacao',
      title: lang === 'pt' ? 'Educação & Formação' : lang === 'es' ? 'Educación & Formación' : lang === 'fr' ? 'Éducation & Formation' : 'Education & Training',
      description: lang === 'pt' ? 'Compartilhamos conhecimento acumulado em 30 anos. Nossos workshops e mentorias formaram centenas de profissionais, enquanto nossa curadoria em festivais nos permite identificar e apresentar as melhores práticas do setor.' : lang === 'es' ? 'Compartimos conocimiento acumulado en 30 años. Nuestros workshops y mentorías han formado cientos de profesionales, mientras nuestra curaduría en festivales nos permite identificar y presentar las mejores prácticas del sector.' : lang === 'fr' ? 'Nous partageons les connaissances accumulées sur 30 ans. Nos ateliers et mentorats ont formé des centaines de professionnels, tandis que notre curation de festivals nous permet d\'identifier et présenter les meilleures pratiques de l\'industrie.' : 'We share knowledge accumulated over 30 years. Our workshops and mentoring have trained hundreds of professionals, while our festival curation allows us to identify and present the industry\'s best practices.',
      icon: '📚'
    },
    { 
      slug: 'consultoria-estrategia',
      title: lang === 'pt' ? 'Consultoria & Estratégia' : lang === 'es' ? 'Consultoría & Estrategia' : lang === 'fr' ? 'Conseil & Stratégie' : 'Consulting & Strategy',
      description: lang === 'pt' ? 'Acompanhamos projetos desde a concepção até a execução. Nossa experiência em captação de recursos (editais nacionais e internacionais) e estratégia de IA permite que clientes realizem projetos que de outra forma não conseguiriam.' : lang === 'es' ? 'Acompañamos proyectos desde la concepción hasta la ejecución. Nuestra experiencia en captación de recursos (editais nacionales e internacionales) y estrategia de IA permite que clientes realicen proyectos que de otra forma no podrían.' : lang === 'fr' ? 'Nous accompagnons les projets de la conception à l\'exécution. Notre expérience en financement (subventions nationales et internationales) et stratégie IA permet aux clients de réaliser des projets qu\'ils ne pourraient pas autrement.' : 'We support projects from conception to execution. Our experience in funding (national and international grants) and AI strategy enables clients to realize projects they otherwise could not.',
      icon: '💡'
    }
  ]
  
  // MIGRAÇÃO GRADUAL: Backoffice → Estático (sempre funciona)
  const services = (cmsContent?.services && cmsContent.services.length > 0) 
    ? (() => {
        console.log('✅ Usando serviços do backoffice');
        return cmsContent.services;
      })()
    : (() => {
        console.log('⚠️ Usando serviços estáticos (fallback) - Preencher no backoffice!');
        return defaultServices;
      })()

  // Parallax sutil na estrela de fundo
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

  return (
    <>
      <SEO 
        lang={lang}
        title={seo.title}
        description={seo.description}
        path="/what"
      />
      <main className="relative py-16 md:py-20">
        {/* Star background on the side - Parallax sutil */}
        <div 
          ref={starRef}
          className="pointer-events-none fixed top-20 -right-28 h-[520px] w-[520px] md:top-32 md:-right-40 md:h-[680px] md:w-[680px] transition-transform duration-75 ease-out" 
          style={{ 
            opacity: 0.3,
            zIndex: -5,
            willChange: 'transform'
          }}
        >
          <img src="/logo-azimut-star.svg" alt="" className="h-full w-full object-contain" />
        </div>

        <div className="mx-auto max-w-5xl px-6" style={{ opacity: 0, animation: 'fadeInUp 0.8s ease-out 0.1s forwards' }}>
          <h1 className="mb-4 font-handel text-4xl uppercase tracking-[0.16em] md:text-5xl" style={{ color: 'var(--theme-text)' }}>
            {t(lang, 'navWhat')}
          </h1>
          <p className="mb-8 max-w-3xl text-lg md:text-xl leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
            {lang === 'pt' 
              ? 'Combinamos cinema, design interativo, storytelling espacial e pipelines com IA para criar instalações narrativas, ambientes híbridos e experiências temporais. Nossa abordagem única integra pesquisa, produção e educação, permitindo projetos que outros estúdios não conseguem realizar.'
              : lang === 'es'
              ? 'Combinamos cine, diseño interactivo, narrativa espacial y pipelines con IA para crear instalaciones narrativas, entornos híbridos y experiencias temporales. Nuestro enfoque único integra investigación, producción y educación, permitiendo proyectos que otros estudios no pueden realizar.'
              : lang === 'fr'
              ? 'Nous combinons cinéma, design interactif, narration spatiale et pipelines avec IA pour créer des installations narratives, des environnements hybrides et des expériences temporelles. Notre approche unique intègre recherche, production et éducation, permettant des projets que d\'autres studios ne peuvent pas réaliser.'
              : 'We combine cinema, interactive design, spatial storytelling and AI pipelines to create narrative installations, hybrid environments and time-based experiences. Our unique approach integrates research, production and education, enabling projects other studios cannot deliver.'}
          </p>

          {/* Grid de Serviços - SEMPRE MOSTRA (backoffice OU padrão) */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service: any, index: number) => (
              <article
                key={service.slug || index}
                className="group rounded-2xl border border-white/10 card-adaptive p-4 shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur transition-all duration-300 hover:scale-[1.02] hover:border-azimut-red/50 hover:shadow-[0_24px_60px_rgba(201,35,55,0.3)] cursor-pointer"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
                onClick={() => trackInteraction('service_view', service.slug || 'default')}
              >
                {service.icon && (
                  <div className="mb-3 text-3xl">{service.icon}</div>
                )}
                <h3 className="mb-2 font-sora text-[1.05rem] font-semibold text-white group-hover:text-azimut-red transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-200 group-hover:text-slate-100 transition-colors duration-300">
                  {service.description || service.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  )
}

export default WhatWeDo
