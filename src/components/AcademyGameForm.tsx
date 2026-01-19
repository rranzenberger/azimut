// ════════════════════════════════════════════════════════════
// ACADEMY GAME FORM - FORMULÁRIO GAMIFICADO
// ════════════════════════════════════════════════════════════
// Experiência divertida estilo quiz para captar leads
// Progressão visual + Feedback instantâneo + Tom friendly
// ════════════════════════════════════════════════════════════

import React, { useState } from 'react'
import { type Lang } from '../i18n'
import ApiService from '../services/api'

interface AcademyGameFormProps {
  lang: Lang
  type: 'vancouver' | 'course' | 'workshop' | 'corporate'
}

interface FormData {
  name: string
  contact: string
  school?: 'vanarts' | 'vfs' | 'both' | 'undecided'
  preferredLanguage?: Lang
  contactPreference?: 'email' | 'whatsapp' | 'call' | 'any'
  wantsNewsletter?: boolean // 🆕 Checkbox newsletter
}

const AcademyGameForm: React.FC<AcademyGameFormProps> = ({ lang, type }) => {
  const [step, setStep] = useState(0) // Etapa atual (0-4)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    contact: '',
    school: type === 'vancouver' ? 'undecided' : undefined,
    preferredLanguage: lang,
    contactPreference: 'email',
    wantsNewsletter: false // 🆕 Checkbox newsletter
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const totalSteps = type === 'vancouver' ? 5 : 4
  const progress = ((step + 1) / totalSteps) * 100

  const content: Record<Lang, any> = {
    pt: {
      title: {
        vancouver: '🎮 Desbloqueie Vancouver!',
        course: '🎮 Encontre Seu Curso!',
        workshop: '🎮 Seu Workshop Ideal!',
        corporate: '🎮 Treinamento Pro!'
      },
      subtitle: 'Super rápido e divertido! ⚡',
      steps: {
        0: {
          emoji: '👋',
          title: 'Opa! Quem é você?',
          subtitle: 'Me conta seu nome! (pode ser só o primeiro)',
          field: 'name',
          placeholder: 'Ex: João',
          button: 'Próximo →'
        },
        1: {
          emoji: '📱',
          title: 'Como te acho?',
          subtitle: 'Email ou WhatsApp, você escolhe!',
          field: 'contact',
          placeholder: 'joao@email.com ou +55 21 99999-9999',
          button: 'Próximo →'
        },
        2: {
          emoji: '🏫',
          title: 'Qual escola te interessa?',
          subtitle: 'Sem compromisso, é só pra gente te ajudar!',
          field: 'school',
          options: {
            vanarts: '🎨 VanArts (Animação, VFX)',
            vfs: '🎬 VFS (Cinema, Som)',
            both: '🤩 Ambas! Quero conhecer',
            undecided: '🤔 Não sei ainda (me ajuda!)'
          },
          button: 'Próximo →'
        },
        3: {
          emoji: '🌍',
          title: 'Em qual idioma conversamos?',
          subtitle: 'Escolhe o que você curte mais!',
          field: 'preferredLanguage',
          options: {
            pt: '🇧🇷 Português',
            en: '🇨🇦 English',
            es: '🇪🇸 Español',
            fr: '🇫🇷 Français'
          },
          button: 'Próximo →'
        },
        4: {
          emoji: '💬',
          title: 'Como prefere receber info?',
          subtitle: 'Sem pressão! Você manda aqui.',
          field: 'contactPreference',
          options: {
            email: '📧 Email (tranquilo, sem pressa)',
            whatsapp: '💬 WhatsApp (mais rápido!)',
            call: '📞 Ligação (tô pronto!)',
            any: '🤝 Tanto faz (sou flexível)'
          },
          button: 'Finalizar! 🎉'
        }
      },
      progress: {
        text: 'Falta pouco!',
        complete: 'Quase lá!'
      },
      success: {
        emoji: '🎉',
        title: 'VOCÊ DESBLOQUEOU!',
        message: 'Show! Vamos te mandar tudo em breve.',
        subtitle: 'Aguenta 24h que a gente aparece! 🚀'
      },
      error: 'Ops! Deu ruim. Tenta de novo?',
      back: '← Voltar',
      skip: 'Pular',
      newsletter: 'Quero receber novidades por email'
    },
    en: {
      title: {
        vancouver: '🎮 Unlock Vancouver!',
        course: '🎮 Find Your Course!',
        workshop: '🎮 Your Ideal Workshop!',
        corporate: '🎮 Pro Training!'
      },
      subtitle: 'Super fast & fun! ⚡',
      steps: {
        0: {
          emoji: '👋',
          title: 'Hey! Who are you?',
          subtitle: 'Tell me your name! (first name is fine)',
          field: 'name',
          placeholder: 'Ex: John',
          button: 'Next →'
        },
        1: {
          emoji: '📱',
          title: 'How do I reach you?',
          subtitle: 'Email or WhatsApp, your choice!',
          field: 'contact',
          placeholder: 'john@email.com or +1 555 1234',
          button: 'Next →'
        },
        2: {
          emoji: '🏫',
          title: 'Which school interests you?',
          subtitle: 'No commitment, just to help you!',
          field: 'school',
          options: {
            vanarts: '🎨 VanArts (Animation, VFX)',
            vfs: '🎬 VFS (Film, Sound)',
            both: '🤩 Both! I wanna know',
            undecided: '🤔 Not sure yet (help me!)'
          },
          button: 'Next →'
        },
        3: {
          emoji: '🌍',
          title: 'What language do we speak?',
          subtitle: 'Pick what you like most!',
          field: 'preferredLanguage',
          options: {
            pt: '🇧🇷 Português',
            en: '🇨🇦 English',
            es: '🇪🇸 Español',
            fr: '🇫🇷 Français'
          },
          button: 'Next →'
        },
        4: {
          emoji: '💬',
          title: 'How do you prefer to get info?',
          subtitle: 'No pressure! You decide.',
          field: 'contactPreference',
          options: {
            email: '📧 Email (chill, no rush)',
            whatsapp: '💬 WhatsApp (faster!)',
            call: '📞 Call (I\'m ready!)',
            any: '🤝 Whatever (I\'m flexible)'
          },
          button: 'Finish! 🎉'
        }
      },
      progress: {
        text: 'Almost there!',
        complete: 'You got this!'
      },
      success: {
        emoji: '🎉',
        title: 'YOU UNLOCKED IT!',
        message: 'Awesome! We\'ll send you everything soon.',
        subtitle: 'Wait 24h and we\'ll show up! 🚀'
      },
      error: 'Oops! Something went wrong. Try again?',
      back: '← Back',
      skip: 'Skip',
      newsletter: 'I want to receive news by email'
    },
    es: {
      title: {
        vancouver: '🎮 ¡Desbloquea Vancouver!',
        course: '🎮 ¡Encuentra Tu Curso!',
        workshop: '🎮 ¡Tu Taller Ideal!',
        corporate: '🎮 ¡Entrenamiento Pro!'
      },
      subtitle: '¡Super rápido y divertido! ⚡',
      steps: {
        0: {
          emoji: '👋',
          title: '¡Hola! ¿Quién eres?',
          subtitle: '¡Cuéntame tu nombre! (solo el primero está bien)',
          field: 'name',
          placeholder: 'Ej: Juan',
          button: 'Siguiente →'
        },
        1: {
          emoji: '📱',
          title: '¿Cómo te encuentro?',
          subtitle: '¡Email o WhatsApp, tú eliges!',
          field: 'contact',
          placeholder: 'juan@email.com o +34 600 123',
          button: 'Siguiente →'
        },
        2: {
          emoji: '🏫',
          title: '¿Qué escuela te interesa?',
          subtitle: 'Sin compromiso, ¡solo para ayudarte!',
          field: 'school',
          options: {
            vanarts: '🎨 VanArts (Animación, VFX)',
            vfs: '🎬 VFS (Cine, Sonido)',
            both: '🤩 ¡Ambas! Quiero conocer',
            undecided: '🤔 No sé todavía (¡ayúdame!)'
          },
          button: 'Siguiente →'
        },
        3: {
          emoji: '🌍',
          title: '¿En qué idioma hablamos?',
          subtitle: '¡Elige el que más te guste!',
          field: 'preferredLanguage',
          options: {
            pt: '🇧🇷 Português',
            en: '🇨🇦 English',
            es: '🇪🇸 Español',
            fr: '🇫🇷 Français'
          },
          button: 'Siguiente →'
        },
        4: {
          emoji: '💬',
          title: '¿Cómo prefieres recibir info?',
          subtitle: '¡Sin presión! Tú decides.',
          field: 'contactPreference',
          options: {
            email: '📧 Email (tranquilo, sin prisa)',
            whatsapp: '💬 WhatsApp (¡más rápido!)',
            call: '📞 Llamada (¡estoy listo!)',
            any: '🤝 Lo que sea (soy flexible)'
          },
          button: '¡Finalizar! 🎉'
        }
      },
      progress: {
        text: '¡Falta poco!',
        complete: '¡Ya casi!'
      },
      success: {
        emoji: '🎉',
        title: '¡LO DESBLOQUEASTE!',
        message: '¡Genial! Te mandaremos todo pronto.',
        subtitle: '¡Espera 24h y aparecemos! 🚀'
      },
      error: '¡Ups! Algo salió mal. ¿Intentas de nuevo?',
      back: '← Atrás',
      skip: 'Saltar',
      newsletter: 'Quiero recibir novedades por email'
    },
    fr: {
      title: {
        vancouver: '🎮 Débloque Vancouver!',
        course: '🎮 Trouve Ton Cours!',
        workshop: '🎮 Ton Atelier Idéal!',
        corporate: '🎮 Formation Pro!'
      },
      subtitle: 'Super rapide et fun! ⚡',
      steps: {
        0: {
          emoji: '👋',
          title: 'Salut! C\'est qui?',
          subtitle: 'Dis-moi ton nom! (juste le prénom, c\'est bon)',
          field: 'name',
          placeholder: 'Ex: Marie',
          button: 'Suivant →'
        },
        1: {
          emoji: '📱',
          title: 'Comment je te trouve?',
          subtitle: 'Email ou WhatsApp, tu choisis!',
          field: 'contact',
          placeholder: 'marie@email.com ou +33 6 12 34',
          button: 'Suivant →'
        },
        2: {
          emoji: '🏫',
          title: 'Quelle école t\'intéresse?',
          subtitle: 'Sans engagement, c\'est juste pour t\'aider!',
          field: 'school',
          options: {
            vanarts: '🎨 VanArts (Animation, VFX)',
            vfs: '🎬 VFS (Cinéma, Son)',
            both: '🤩 Les deux! Je veux connaître',
            undecided: '🤔 Pas sûr encore (aide-moi!)'
          },
          button: 'Suivant →'
        },
        3: {
          emoji: '🌍',
          title: 'On parle en quelle langue?',
          subtitle: 'Choisis ce que tu préfères!',
          field: 'preferredLanguage',
          options: {
            pt: '🇧🇷 Português',
            en: '🇨🇦 English',
            es: '🇪🇸 Español',
            fr: '🇫🇷 Français'
          },
          button: 'Suivant →'
        },
        4: {
          emoji: '💬',
          title: 'Comment tu préfères recevoir info?',
          subtitle: 'Sans pression! Tu décides.',
          field: 'contactPreference',
          options: {
            email: '📧 Email (cool, sans rush)',
            whatsapp: '💬 WhatsApp (plus rapide!)',
            call: '📞 Appel (je suis prêt!)',
            any: '🤝 N\'importe (je suis flexible)'
          },
          button: 'Terminer! 🎉'
        }
      },
      progress: {
        text: 'Presque là!',
        complete: 'T\'as ça!'
      },
      success: {
        emoji: '🎉',
        title: 'TU L\'AS DÉBLOQUÉ!',
        message: 'Génial! On t\'envoie tout bientôt.',
        subtitle: 'Attends 24h et on arrive! 🚀'
      },
      error: 'Oups! Erreur. Tu réessayes?',
      back: '← Retour',
      skip: 'Passer',
      newsletter: 'Je veux recevoir des nouvelles par email'
    }
  }

  const t = content[lang] || content.pt
  const currentStep = t.steps[step]

  const handleNext = () => {
    // Validação simples
    const fieldName = currentStep.field as keyof FormData
    if (!formData[fieldName]) {
      setError('Preenche esse campo aí! 😊')
      return
    }

    setError(null)
    
    if (step < totalSteps - 1) {
      setStep(step + 1)
    } else {
      handleSubmit()
    }
  }

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1)
      setError(null)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError(null)

    try {
      const isEmail = formData.contact.includes('@')
      
      const leadData = {
        name: formData.name,
        email: isEmail ? formData.contact : undefined,
        phone: !isEmail ? formData.contact : undefined,
        leadType: type === 'vancouver' ? 'VANCOUVER' : 'CONTACT_FORM',
        description: `
Escola: ${formData.school ? t.steps[2].options[formData.school] : 'N/A'}
Idioma preferido: ${formData.preferredLanguage}
Preferência de contato: ${formData.contactPreference ? t.steps[4].options[formData.contactPreference] : 'N/A'}
        `.trim(),
        sourceUrl: window.location.href
      }

      if (type === 'vancouver') {
        await ApiService.submitVancouverLead(leadData)
      } else {
        await ApiService.submitLead(leadData)
      }

      // 🆕 Se marcou newsletter, criar NewsletterSubscriber
      const isEmail = formData.contact.includes('@')
      if (formData.wantsNewsletter && isEmail) {
        const backofficeUrl = import.meta.env.VITE_CMS_API_URL || 'https://backoffice.azmt.com.br'
        try {
          await fetch(`${backofficeUrl}/api/public/newsletter`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: formData.contact,
              name: formData.name,
              lang: formData.preferredLanguage || lang,
              source: type === 'vancouver' ? 'vancouver_form' : 'academy_game_form'
            })
          })
        } catch (newsletterError) {
          console.warn('Newsletter subscription failed (non-critical):', newsletterError)
        }
      }

      setSuccess(true)
    } catch (err: any) {
      console.error('Form submission error:', err)
      setError(err.message || t.error)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="card-adaptive rounded-2xl p-8 md:p-12 text-center animate-fade-in">
        <div className="text-8xl mb-6 animate-bounce">
          {t.success.emoji}
        </div>
        <h3 className="text-4xl md:text-5xl font-handel uppercase tracking-wider text-white mb-4">
          {t.success.title}
        </h3>
        <p className="text-xl text-white/80 mb-2">
          {t.success.message}
        </p>
        <p className="text-lg text-white/60">
          {t.success.subtitle}
        </p>
      </div>
    )
  }

  return (
    <div className="card-adaptive rounded-2xl p-8 md:p-12 border border-white/10">
      {/* Header */}
      <div className="text-center mb-8">
        <h3 className="text-3xl md:text-4xl font-handel uppercase tracking-wider text-white mb-2">
          {t.title[type]}
        </h3>
        <p className="text-lg text-white/70">
          {t.subtitle}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-white/60 uppercase tracking-wider">
            Etapa {step + 1}/{totalSteps}
          </span>
          <span className="text-sm text-azimut-red font-semibold">
            {progress.toFixed(0)}%
          </span>
        </div>
        <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-azimut-red to-red-400 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="mb-8 animate-fade-in">
        <div className="text-center mb-6">
          <div className="text-6xl mb-4 animate-bounce-slow">
            {currentStep.emoji}
          </div>
          <h4 className="text-2xl md:text-3xl font-bold text-white mb-2">
            {currentStep.title}
          </h4>
          <p className="text-white/70">
            {currentStep.subtitle}
          </p>
        </div>

        {/* Input Field */}
        {currentStep.field === 'name' || currentStep.field === 'contact' ? (
          <input
            type="text"
            value={formData[currentStep.field as keyof FormData] as string}
            onChange={(e) => setFormData({ ...formData, [currentStep.field]: e.target.value })}
            className="input-adaptive w-full text-center text-xl"
            placeholder={currentStep.placeholder}
            autoFocus
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(currentStep.options).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setFormData({ ...formData, [currentStep.field]: key })}
                className={`
                  p-4 rounded-xl border-2 transition-all duration-300
                  ${formData[currentStep.field as keyof FormData] === key
                    ? 'border-azimut-red bg-azimut-red/20 scale-105'
                    : 'border-white/20 bg-white/5 hover:border-white/40 hover:scale-102'
                  }
                `}
              >
                <p className="text-white font-semibold text-center">
                  {label}
                </p>
              </button>
            ))}
          </div>
        )}

        {/* 🆕 Checkbox Newsletter - Última etapa */}
        {step === totalSteps - 1 && (
          <label className="flex items-center justify-center gap-3 cursor-pointer group mt-6 p-4 rounded-xl border-2 border-white/10 hover:border-white/30 transition-all">
            <input
              type="checkbox"
              checked={formData.wantsNewsletter || false}
              onChange={(e) => setFormData({ ...formData, wantsNewsletter: e.target.checked })}
              className="w-5 h-5 rounded border-2 border-white/30 bg-transparent checked:bg-azimut-red checked:border-azimut-red focus:ring-2 focus:ring-azimut-red/50 cursor-pointer transition-all"
            />
            <span className="text-sm text-white/80 group-hover:text-white transition-colors">
              📧 {t.newsletter}
            </span>
          </label>
        )}

        {/* Error */}
        {error && (
          <div className="mt-4 p-3 bg-red-500/20 border border-red-500/40 rounded-lg">
            <p className="text-red-400 text-sm text-center">{error}</p>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-3">
        {step > 0 && (
          <button
            onClick={handleBack}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
          >
            {t.back}
          </button>
        )}
        <button
          onClick={handleNext}
          disabled={loading}
          className="flex-1 px-10 py-4 bg-azimut-red hover:bg-azimut-red/90 disabled:bg-azimut-red/50 disabled:cursor-not-allowed text-white text-lg font-bold uppercase tracking-wider rounded-full transition-all hover:scale-105 hover:shadow-2xl hover:shadow-azimut-red/50"
        >
          {loading ? '⏳ Enviando...' : currentStep.button}
        </button>
      </div>
    </div>
  )
}

export default AcademyGameForm
