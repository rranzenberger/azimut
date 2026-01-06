import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useLang } from '../hooks/useLang';
import { t } from '../i18n';

const ThankYouPage: React.FC = () => {
  const { lang } = useLang();

  const content = {
    pt: {
      title: 'Obrigado pelo Contato!',
      subtitle: 'Mensagem recebida com sucesso',
      message: 'Sua mensagem foi enviada com sucesso! Nossa equipe analisará sua solicitação e retornará em até 24 horas úteis.',
      cta: 'O que acontece agora?',
      steps: [
        {
          icon: '📧',
          title: 'Análise da Solicitação',
          desc: 'Nossa equipe avaliará seu projeto e necessidades'
        },
        {
          icon: '💬',
          title: 'Retorno em 24h',
          desc: 'Entraremos em contato para agendar uma conversa'
        },
        {
          icon: '🎯',
          title: 'Proposta Personalizada',
          desc: 'Apresentaremos soluções sob medida para seu caso'
        }
      ],
      explore: 'Enquanto isso, explore nosso trabalho:',
      viewPortfolio: 'Ver Portfolio',
      viewServices: 'Ver Serviços',
      backHome: 'Voltar ao Início'
    },
    en: {
      title: 'Thank You for Contacting Us!',
      subtitle: 'Message received successfully',
      message: 'Your message has been sent successfully! Our team will review your request and get back to you within 24 business hours.',
      cta: 'What happens now?',
      steps: [
        {
          icon: '📧',
          title: 'Request Analysis',
          desc: 'Our team will evaluate your project and needs'
        },
        {
          icon: '💬',
          title: '24h Response',
          desc: 'We will contact you to schedule a conversation'
        },
        {
          icon: '🎯',
          title: 'Custom Proposal',
          desc: 'We will present tailored solutions for your case'
        }
      ],
      explore: 'In the meantime, explore our work:',
      viewPortfolio: 'View Portfolio',
      viewServices: 'View Services',
      backHome: 'Back to Home'
    },
    es: {
      title: '¡Gracias por Contactarnos!',
      subtitle: 'Mensaje recibido con éxito',
      message: '¡Tu mensaje ha sido enviado con éxito! Nuestro equipo revisará tu solicitud y se pondrá en contacto en un plazo de 24 horas hábiles.',
      cta: '¿Qué pasa ahora?',
      steps: [
        {
          icon: '📧',
          title: 'Análisis de Solicitud',
          desc: 'Nuestro equipo evaluará tu proyecto y necesidades'
        },
        {
          icon: '💬',
          title: 'Respuesta en 24h',
          desc: 'Te contactaremos para agendar una conversación'
        },
        {
          icon: '🎯',
          title: 'Propuesta Personalizada',
          desc: 'Presentaremos soluciones a medida para tu caso'
        }
      ],
      explore: 'Mientras tanto, explora nuestro trabajo:',
      viewPortfolio: 'Ver Portfolio',
      viewServices: 'Ver Servicios',
      backHome: 'Volver al Inicio'
    },
    fr: {
      title: 'Merci de nous avoir contactés!',
      subtitle: 'Message reçu avec succès',
      message: 'Votre message a été envoyé avec succès! Notre équipe examinera votre demande et vous répondra dans les 24 heures ouvrables.',
      cta: 'Que se passe-t-il maintenant?',
      steps: [
        {
          icon: '📧',
          title: 'Analyse de la Demande',
          desc: 'Notre équipe évaluera votre projet et vos besoins'
        },
        {
          icon: '💬',
          title: 'Réponse sous 24h',
          desc: 'Nous vous contacterons pour planifier une conversation'
        },
        {
          icon: '🎯',
          title: 'Proposition Personnalisée',
          desc: 'Nous présenterons des solutions sur mesure pour votre cas'
        }
      ],
      explore: 'En attendant, explorez notre travail:',
      viewPortfolio: 'Voir le Portfolio',
      viewServices: 'Voir les Services',
      backHome: "Retour à l'Accueil"
    }
  };

  const c = content[lang];

  return (
    <>
      <Helmet>
        <title>{c.title} | Azimut</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="min-h-screen pt-8 md:pt-12 pb-24 relative overflow-hidden">
        {/* Estrela de fundo */}
        <div 
          className="absolute -right-28 -bottom-40 min-[768px]:-right-40 min-[768px]:-bottom-60 pointer-events-none z-[-5]"
          style={{ opacity: 0.15 }}
        >
          <img 
            src="/logo-azimut-star.svg" 
            alt="" 
            className="h-[520px] w-[520px] min-[768px]:h-[680px] min-[768px]:w-[680px]" 
          />
        </div>

        <div className="mx-auto max-w-4xl px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Success Icon */}
          <div className="text-center mb-8 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30 mb-6">
              <svg className="w-10 h-10 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl font-handel uppercase tracking-wider mb-4" style={{ color: 'var(--theme-text)' }}>
              {c.title}
            </h1>
            <p className="text-lg md:text-xl mb-2" style={{ color: 'var(--theme-text-secondary)' }}>
              {c.subtitle}
            </p>
            <p className="text-base max-w-2xl mx-auto" style={{ color: 'var(--theme-text-secondary)', opacity: 0.8 }}>
              {c.message}
            </p>
          </div>

          {/* Next Steps */}
          <div className="mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h2 className="text-2xl font-handel uppercase tracking-wider text-center mb-8" style={{ color: 'var(--theme-text)' }}>
              {c.cta}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {c.steps.map((step, index) => (
                <div 
                  key={index}
                  className="text-center p-6 rounded-lg card-adaptive"
                  style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                >
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h3 className="text-lg font-semibold mb-2" style={{ color: 'var(--theme-text)' }}>
                    {step.title}
                  </h3>
                  <p className="text-sm" style={{ color: 'var(--theme-text-secondary)', opacity: 0.8 }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Links */}
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <p className="text-lg mb-6" style={{ color: 'var(--theme-text-secondary)' }}>
              {c.explore}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={`/${lang}/work`}
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold uppercase text-sm tracking-wider transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: '#c92337',
                  color: '#fff',
                  boxShadow: '0 4px 12px rgba(201, 35, 55, 0.3)'
                }}
              >
                {c.viewPortfolio} →
              </Link>
              <Link
                to={`/${lang}/what`}
                className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-semibold uppercase text-sm tracking-wider transition-all duration-300 hover:scale-105 card-adaptive"
                style={{
                  border: '1px solid rgba(201, 35, 55, 0.5)'
                }}
              >
                {c.viewServices}
              </Link>
            </div>
            <div className="mt-6">
              <Link
                to={`/${lang}`}
                className="inline-flex items-center text-sm uppercase tracking-wider transition-colors"
                style={{ color: 'var(--theme-text-secondary)' }}
              >
                ← {c.backHome}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ThankYouPage;

