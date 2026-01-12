import React, { useEffect, useRef } from 'react'
import { type Lang } from '../i18n'
import { trackConversion } from '../components/GoogleAnalytics'
import { useUserTracking } from '../hooks/useUserTracking'
import LangLink from '../components/LangLink'
import SEO from '../components/SEO'

interface ThankYouProps {
  lang: Lang
}

const ThankYou: React.FC<ThankYouProps> = ({ lang }) => {
  useUserTracking()
  const starRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    trackConversion('lead', {
      page: 'thank-you',
      lang,
      source: document.referrer || 'direct',
      timestamp: new Date().toISOString()
    })
  }, [lang])

  // Parallax
  useEffect(() => {
    const star = starRef.current
    if (!star) return

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset
          if (star) {
            star.style.transform = `translateY(${scrolled * 0.3}px)`
          }
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
      title: 'Obrigado!',
      subtitle: 'Mensagem recebida com sucesso ✓',
      message: 'Sua mensagem foi enviada! Nossa equipe analisará sua solicitação e retornará em até 24 horas úteis.',
      nextSteps: 'O que acontece agora?',
      steps: [
        { icon: '📧', title: 'Análise', desc: 'Avaliação do projeto', time: '1h' },
        { icon: '💬', title: 'Retorno 24h', desc: 'Conversa detalhada', time: '24h' },
        { icon: '🎯', title: 'Proposta', desc: 'Soluções sob medida', time: '48h' }
      ],
      explore: 'Enquanto isso, explore:',
      links: [
        { to: '/work', icon: '🎬', text: 'Ver Portfolio' },
        { to: '/what', icon: '⚡', text: 'Ver Serviços' },
        { to: '/academy', icon: '🎓', text: 'Conhecer Academy' }
      ],
      backHome: 'Voltar ao Início'
    },
    en: {
      title: 'Thank You!',
      subtitle: 'Message received successfully ✓',
      message: 'Your message has been sent! Our team will review your request and get back to you within 24 business hours.',
      nextSteps: 'What happens now?',
      steps: [
        { icon: '📧', title: 'Request Analysis', desc: 'Project evaluation', time: '1h' },
        { icon: '💬', title: '24h Response', desc: 'Detailed conversation', time: '24h' },
        { icon: '🎯', title: 'Custom Proposal', desc: 'Tailored solutions', time: '48h' }
      ],
      explore: 'In the meantime, explore:',
      links: [
        { to: '/work', icon: '🎬', text: 'View Portfolio' },
        { to: '/what', icon: '⚡', text: 'View Services' },
        { to: '/academy', icon: '🎓', text: 'Discover Academy' }
      ],
      backHome: 'Back to Home'
    },
    es: {
      title: '¡Gracias!',
      subtitle: 'Mensaje recibido con éxito ✓',
      message: '¡Tu mensaje ha sido enviado! Nuestro equipo analizará tu solicitud y responderá en un plazo de 24 horas hábiles.',
      nextSteps: '¿Qué sucede ahora?',
      steps: [
        { icon: '📧', title: 'Análisis', desc: 'Evaluación proyecto', time: '1h' },
        { icon: '💬', title: 'Respuesta 24h', desc: 'Conversación detallada', time: '24h' },
        { icon: '🎯', title: 'Propuesta', desc: 'Soluciones a medida', time: '48h' }
      ],
      explore: 'Mientras tanto, explora:',
      links: [
        { to: '/work', icon: '🎬', text: 'Ver Portfolio' },
        { to: '/what', icon: '⚡', text: 'Ver Servicios' },
        { to: '/academy', icon: '🎓', text: 'Conocer Academy' }
      ],
      backHome: 'Volver al Inicio'
    },
    fr: {
      title: 'Merci!',
      subtitle: 'Message reçu avec succès ✓',
      message: 'Votre message a été envoyé! Notre équipe analysera votre demande et vous répondra dans les 24 heures ouvrables.',
      nextSteps: 'Que se passe-t-il maintenant?',
      steps: [
        { icon: '📧', title: 'Analyse', desc: 'Évaluation projet', time: '1h' },
        { icon: '💬', title: 'Réponse 24h', desc: 'Conversation détaillée', time: '24h' },
        { icon: '🎯', title: 'Proposition', desc: 'Solutions sur mesure', time: '48h' }
      ],
      explore: 'En attendant, explorez:',
      links: [
        { to: '/work', icon: '🎬', text: 'Voir Portfolio' },
        { to: '/what', icon: '⚡', text: 'Voir Services' },
        { to: '/academy', icon: '🎓', text: 'Découvrir Academy' }
      ],
      backHome: "Retour à l'Accueil"
    }
  }

  const text = content[lang] || content.pt

  return (
    <>
      <SEO 
        title={`${text.title} - Azimut`}
        description={text.message}
        lang={lang}
        path="/thank-you"
      />
      
      <main className="relative min-h-screen py-20">
        {/* Star Parallax */}
        <div 
          ref={starRef}
          className="pointer-events-none fixed top-20 -right-28 h-[520px] w-[520px] md:-right-40 md:h-[680px] md:w-[680px] transition-transform duration-75"
          style={{ opacity: 0.2, zIndex: -5, willChange: 'transform' }}
        >
          <img src="/logo-azimut-star.svg" alt="" className="h-full w-full object-contain" loading="lazy" />
        </div>

        <div className="mx-auto max-w-5xl px-6">
          {/* Hero Celebratório */}
          <div className="text-center mb-16">
            <div className="text-8xl mb-6 animate-bounce">🎉</div>
            <h1 className="font-handel text-6xl md:text-7xl font-bold uppercase text-white mb-4">
              {text.title}
            </h1>
            <div className="inline-block px-6 py-3 rounded-full bg-green-500/20 border-2 border-green-500/50 mb-6">
              <p className="text-xl font-semibold text-green-400">{text.subtitle}</p>
            </div>
            <p className="text-lg text-theme-text-secondary max-w-2xl mx-auto leading-relaxed">
              {text.message}
            </p>
          </div>

          {/* Timeline de Próximos Passos */}
          <section className="mb-20">
            <h2 className="text-center text-2xl font-bold text-white mb-10">{text.nextSteps}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {text.steps.map((step, i) => (
                <div 
                  key={i}
                  className="relative group"
                >
                  <div className="text-center p-6 rounded-lg bg-slate-900/50 border-2 border-azimut-red/30 hover:border-azimut-red transition-all h-full flex flex-col">
                    <div className="text-5xl mb-3">{step.icon}</div>
                    <div className="mb-2 text-xs font-bold text-azimut-red uppercase tracking-wider">{step.time}</div>
                    <h3 className="text-base font-bold text-white mb-2 line-clamp-2">{step.title}</h3>
                    <p className="text-sm text-theme-text-secondary line-clamp-3 flex-1">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Explore Links */}
          <section className="mb-16">
            <h2 className="text-center text-2xl font-bold text-white mb-8">{text.explore}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {text.links.map((link, i) => (
                <LangLink
                  key={i}
                  to={link.to}
                  className="group p-6 rounded-lg bg-gradient-to-br from-slate-900/50 to-slate-900/30 border border-azimut-red/20 hover:border-azimut-red/50 transition-all text-center flex flex-col items-center h-full"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{link.icon}</div>
                  <p className="text-base font-semibold text-white group-hover:text-azimut-red transition-colors line-clamp-2">{link.text}</p>
                </LangLink>
              ))}
            </div>
          </section>

          {/* CTA Home */}
          <div className="text-center">
            <LangLink
              to="/"
              className="inline-flex items-center gap-3 px-10 py-4 rounded-lg border-2 border-white/30 text-white hover:bg-white hover:text-black transition-all font-semibold"
            >
              <span className="text-xl">←</span>
              {text.backHome}
            </LangLink>
          </div>
        </div>
      </main>
    </>
  )
}

export default ThankYou
