// ════════════════════════════════════════════════════════════
// ACADEMY QUICK FORM - FORMULÁRIO SIMPLIFICADO
// ════════════════════════════════════════════════════════════
// Apenas 3-5 campos essenciais
// IA preenche automaticamente resto com base em Quiz/Recomendador
// ════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { type Lang } from '../i18n'
import ApiService from '../services/api'

interface AcademyQuickFormProps {
  lang: Lang
  type: 'vancouver' | 'course' | 'workshop' | 'corporate'
  prefilledData?: Partial<FormData>
}

interface FormData {
  name: string
  contact: string // Email OU WhatsApp (usuário escolhe)
  school?: 'vanarts' | 'vfs' | 'both' | 'undecided' // Apenas para Vancouver
  preferredLanguage?: Lang // Idioma preferido para atendimento
  contactPreference?: 'email' | 'whatsapp' | 'call' | 'any' // Como prefere ser contatado
  interest: string // Pré-preenchido se veio do Quiz/Recomendador
}

const AcademyQuickForm: React.FC<AcademyQuickFormProps> = ({ lang, type, prefilledData }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    contact: '',
    school: type === 'vancouver' ? 'undecided' : undefined,
    preferredLanguage: lang, // Default: idioma atual do site
    contactPreference: 'email', // Default: email (menos invasivo)
    interest: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Buscar dados do Quiz/Recomendador no localStorage
    const quizData = localStorage.getItem('quizVancouverResult')
    const recommendationData = localStorage.getItem('courseRecommendation')
    
    let autoFilled: Partial<FormData> = {}

    // Se tem dados do Quiz Vancouver
    if (quizData && type === 'vancouver') {
      try {
        const quiz = JSON.parse(quizData)
        autoFilled.interest = `Interessado em ${quiz.bestSchool} - ${quiz.area || 'Animação/VFX'}. Score: ${quiz.score}/100. Budget estimado: ${quiz.estimatedBudget}.`
      } catch (e) {
        console.warn('Erro ao parsear Quiz data')
      }
    }

    // Se tem dados do Recomendador
    if (recommendationData && type === 'course') {
      try {
        const recommendation = JSON.parse(recommendationData)
        const topCourse = recommendation.topCourses?.[0]
        if (topCourse) {
          autoFilled.interest = `Interessado em ${topCourse.title}. Match: ${topCourse.match}%.`
        }
      } catch (e) {
        console.warn('Erro ao parsear Recommendation data')
      }
    }

    // Merge com prefilled data
    setFormData({
      ...formData,
      ...autoFilled,
      ...prefilledData
    })
  }, [type, prefilledData])

  const content: Record<Lang, any> = {
    pt: {
      title: {
        vancouver: 'Quero estudar em Vancouver 🇨🇦',
        course: 'Quero fazer um curso 📚',
        workshop: 'Quero participar de um workshop 🎬',
        corporate: 'Quero um treinamento corporativo 🏢'
      },
      subtitle: 'Super rápido: só 3 campos!',
      fields: {
        name: 'Seu nome',
        contact: 'Email ou WhatsApp',
        school: 'Escola de interesse',
        preferredLanguage: 'Idioma preferido para atendimento',
        contactPreference: 'Como prefere receber informações?',
        interest: 'O que a IA detectou sobre você'
      },
      schoolOptions: {
        vanarts: 'VanArts (Animação, VFX, Game Design)',
        vfs: 'VFS - Vancouver Film School (Cinema, Som, Atuação)',
        both: 'Ambas - Quero conhecer as duas',
        undecided: '🤔 Ainda não sei - Quero orientação FREE'
      },
      languageOptions: {
        pt: '🇧🇷 Português',
        en: '🇨🇦 English',
        es: '🇪🇸 Español',
        fr: '🇫🇷 Français'
      },
      contactPreferenceOptions: {
        email: '📧 Só quero receber por email (sem ligação)',
        whatsapp: '💬 WhatsApp (mensagens, pode chamar!)',
        call: '📞 Pode me ligar! (não tenho timidez)',
        any: '🤝 Como for melhor pra vocês (tô aberto!)'
      },
      placeholders: {
        name: 'Ex: João Silva',
        contact: 'joao@email.com ou +55 21 99999-9999'
      },
      freeConsultation: '💡 Não sabe qual escola escolher? Oferecemos orientação gratuita para te ajudar a decidir!',
      submit: 'Quero Receber Info!',
      submitting: 'Enviando...',
      success: '🎉 Show! Vamos te mandar tudo em',
      successContact: 'Aguenta 24h!',
      error: 'Deu ruim! Manda no WhatsApp: +55 21 99999-9999',
      required: 'Preenche seu nome e contato!'
    },
    en: {
      title: {
        vancouver: 'I wanna study in Vancouver 🇨🇦',
        course: 'I wanna take a course 📚',
        workshop: 'I wanna join a workshop 🎬',
        corporate: 'I want corporate training 🏢'
      },
      subtitle: 'Super quick: just 3 fields!',
      fields: {
        name: 'Your name',
        contact: 'Email or WhatsApp',
        school: 'School of interest',
        preferredLanguage: 'Preferred language for service',
        contactPreference: 'How do you prefer to be contacted?',
        interest: 'What AI detected about you'
      },
      schoolOptions: {
        vanarts: 'VanArts (Animation, VFX, Game Design)',
        vfs: 'VFS - Vancouver Film School (Film, Sound, Acting)',
        both: 'Both - I want to know both schools',
        undecided: '🤔 Not sure yet - I want FREE guidance'
      },
      languageOptions: {
        pt: '🇧🇷 Português',
        en: '🇨🇦 English',
        es: '🇪🇸 Español',
        fr: '🇫🇷 Français'
      },
      contactPreferenceOptions: {
        email: '📧 Email only (no calls please)',
        whatsapp: '💬 WhatsApp (messages, you can text!)',
        call: '📞 Call me! (I do not mind talking)',
        any: '🤝 Whatever works best (I am flexible!)'
      },
      placeholders: {
        name: 'Ex: John Smith',
        contact: 'john@email.com or +1 555 1234'
      },
      freeConsultation: '💡 Not sure which school? We offer free guidance to help you decide!',
      submit: 'Send Me Info!',
      submitting: 'Sending...',
      success: '🎉 Done! We will send you everything in',
      successContact: 'Wait 24h!',
      error: 'Error! WhatsApp us: +1 555 1234',
      required: 'Fill your name and contact!'
    },
    es: {
      title: {
        vancouver: 'Quiero estudiar en Vancouver 🇨🇦',
        course: 'Quiero hacer un curso 📚',
        workshop: 'Quiero participar en un taller 🎬',
        corporate: 'Quiero capacitación corporativa 🏢'
      },
      subtitle: '¡Super rápido: solo 3 campos!',
      fields: {
        name: 'Tu nombre',
        contact: 'Email o WhatsApp',
        school: 'Escuela de interés',
        preferredLanguage: 'Idioma preferido para atención',
        contactPreference: '¿Cómo prefieres ser contactado?',
        interest: 'Lo que la IA detectó sobre ti'
      },
      schoolOptions: {
        vanarts: 'VanArts (Animación, VFX, Game Design)',
        vfs: 'VFS - Vancouver Film School (Cine, Sonido, Actuación)',
        both: 'Ambas - Quiero conocer las dos',
        undecided: '🤔 No estoy seguro - Quiero orientación GRATIS'
      },
      languageOptions: {
        pt: '🇧🇷 Português',
        en: '🇨🇦 English',
        es: '🇪🇸 Español',
        fr: '🇫🇷 Français'
      },
      contactPreferenceOptions: {
        email: '📧 Solo email (sin llamadas)',
        whatsapp: '💬 WhatsApp (mensajes, ¡puedes escribir!)',
        call: '📞 ¡Puedes llamarme! (no tengo vergüenza)',
        any: '🤝 Como sea mejor (¡soy flexible!)'
      },
      placeholders: {
        name: 'Ej: Juan García',
        contact: 'juan@email.com o +34 600 123 456'
      },
      freeConsultation: '💡 ¿No sabes qué escuela elegir? ¡Ofrecemos orientación gratuita para ayudarte!',
      submit: '¡Quiero Recibir Info!',
      submitting: 'Enviando...',
      success: '🎉 ¡Listo! Te mandaremos todo en',
      successContact: '¡Espera 24h!',
      error: '¡Error! WhatsApp: +34 600 123 456',
      required: '¡Completa tu nombre y contacto!'
    },
    fr: {
      title: {
        vancouver: 'Je veux étudier à Vancouver 🇨🇦',
        course: 'Je veux suivre un cours 📚',
        workshop: 'Je veux participer à un atelier 🎬',
        corporate: 'Je veux une formation entreprise 🏢'
      },
      subtitle: 'Super rapide: seulement 3 champs!',
      fields: {
        name: 'Votre nom',
        contact: 'Email ou WhatsApp',
        school: 'École de intérêt',
        preferredLanguage: 'Langue préférée pour le service',
        contactPreference: 'Comment préférez-vous être contacté?',
        interest: 'Ce que IA a détecté sur vous'
      },
      schoolOptions: {
        vanarts: 'VanArts (Animation, VFX, Game Design)',
        vfs: 'VFS - Vancouver Film School (Cinéma, Son, Acting)',
        both: 'Les deux - Je veux connaître les deux',
        undecided: '🤔 Pas encore sûr - Je veux des conseils GRATUITS'
      },
      languageOptions: {
        pt: '🇧🇷 Português',
        en: '🇨🇦 English',
        es: '🇪🇸 Español',
        fr: '🇫🇷 Français'
      },
      contactPreferenceOptions: {
        email: '📧 Email uniquement (pas de appels)',
        whatsapp: '💬 WhatsApp (messages, vous pouvez écrire!)',
        call: '📞 Appelez-moi! (je aime parler)',
        any: '🤝 Comme vous voulez (je suis flexible!)'
      },
      placeholders: {
        name: 'Ex: Marie Dupont',
        contact: 'marie@email.com ou +33 6 12 34 56 78'
      },
      freeConsultation: '💡 Vous ne savez pas quelle école choisir? Nous offrons des conseils gratuits!',
      submit: 'Envoyer Info!',
      submitting: 'Envoi...',
      success: '🎉 Terminé! Nous vous enverrons tout en',
      successContact: 'Attendez 24h!',
      error: 'Erreur! WhatsApp: +33 6 12 34 56 78',
      required: 'Remplissez votre nom et contact!'
    }
  }

  const t = content[lang] || content.pt

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validação mínima
    if (!formData.name || !formData.contact) {
      setError(t.required)
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Detectar se o contato é email ou telefone
      const isEmail = formData.contact.includes('@')
      const schoolLabel = formData.school ? t.schoolOptions[formData.school] : ''
      const langLabel = formData.preferredLanguage ? t.languageOptions[formData.preferredLanguage] : ''
      const contactPrefLabel = formData.contactPreference ? t.contactPreferenceOptions[formData.contactPreference] : ''
      
      // Preparar dados do lead
      const leadData = {
        name: formData.name,
        email: isEmail ? formData.contact : undefined,
        phone: !isEmail ? formData.contact : undefined,
        leadType: type === 'vancouver' ? 'VANCOUVER' : 
                  type === 'course' ? 'CONTACT_FORM' : 
                  'CONTACT_FORM',
        description: [
          formData.interest,
          schoolLabel ? `Escola: ${schoolLabel}` : '',
          langLabel ? `Idioma preferido: ${langLabel}` : '',
          contactPrefLabel ? `⚠️ Preferência de contato: ${contactPrefLabel}` : ''
        ].filter(Boolean).join('\n'),
        sourceUrl: window.location.href,
        utmSource: new URLSearchParams(window.location.search).get('utm_source') || undefined,
        utmMedium: new URLSearchParams(window.location.search).get('utm_medium') || undefined,
        utmCampaign: new URLSearchParams(window.location.search).get('utm_campaign') || undefined
      }

      // Enviar via API apropriada
      if (type === 'vancouver') {
        await ApiService.submitVancouverLead(leadData)
      } else {
        await ApiService.submitLead(leadData)
      }

      setSuccess(true)
      
      // Redirecionar para thank-you após 2 segundos
      setTimeout(() => {
        navigate(`/${lang}/thank-you`)
      }, 2000)
      
      // Limpar localStorage após sucesso
      localStorage.removeItem('quizVancouverResult')
      localStorage.removeItem('courseRecommendation')

      // Limpar formulário
      setFormData({
        name: '',
        contact: '',
        school: type === 'vancouver' ? 'undecided' : undefined,
        preferredLanguage: lang,
        contactPreference: 'email',
        interest: ''
      })

      // Scroll to success message
      setTimeout(() => {
        const successEl = document.getElementById('form-success')
        if (successEl) {
          successEl.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 100)
    } catch (err: any) {
      console.error('Form submission error:', err)
      setError(err.message || t.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card-adaptive rounded-2xl p-8 md:p-10 border border-white/10">
      {/* Title */}
      <div className="text-center mb-8">
        <div className="inline-block px-6 py-2 bg-azimut-red/20 border border-azimut-red/40 rounded-full mb-4">
          <span className="text-azimut-red text-sm font-semibold uppercase">
            {type === 'vancouver' ? '🍁' : type === 'course' ? '📚' : type === 'workshop' ? '🎬' : '🏢'} Formulário Rápido
          </span>
        </div>
        
        <h3 className="text-3xl md:text-4xl font-handel uppercase tracking-wider text-white mb-3">
          {t.title[type]}
        </h3>
        
        <p className="text-lg text-white/70">
          {t.subtitle}
        </p>
      </div>

      {/* Success Message - NÃO MOSTRA, redireciona direto */}
      {success && null}

      {/* Form */}
      {!success && (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-white/90 mb-2 uppercase tracking-wider">
              {t.fields.name} *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="input-adaptive w-full"
              required
              placeholder={t.placeholders.name}
            />
          </div>

          {/* Contact (Email OR WhatsApp) */}
          <div>
            <label className="block text-sm font-semibold text-white/90 mb-2 uppercase tracking-wider">
              {t.fields.contact} *
            </label>
            <input
              type="text"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              className="input-adaptive w-full"
              required
              placeholder={t.placeholders.contact}
            />
          </div>

          {/* School Dropdown (Vancouver only) */}
          {type === 'vancouver' && (
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2 uppercase tracking-wider">
                {t.fields.school} *
              </label>
              <select
                value={formData.school || 'undecided'}
                onChange={(e) => setFormData({ ...formData, school: e.target.value as any })}
                className="input-adaptive w-full"
                required
              >
                <option value="vanarts">{t.schoolOptions.vanarts}</option>
                <option value="vfs">{t.schoolOptions.vfs}</option>
                <option value="both">{t.schoolOptions.both}</option>
                <option value="undecided">{t.schoolOptions.undecided}</option>
              </select>
              
              {/* Free Consultation Alert */}
              {formData.school === 'undecided' && (
                <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="text-sm text-yellow-400">
                    {t.freeConsultation}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Preferred Language */}
          <div>
            <label className="block text-sm font-semibold text-white/90 mb-2 uppercase tracking-wider">
              {t.fields.preferredLanguage}
            </label>
            <select
              value={formData.preferredLanguage || lang}
              onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value as Lang })}
              className="input-adaptive w-full"
            >
              <option value="pt">{t.languageOptions.pt}</option>
              <option value="en">{t.languageOptions.en}</option>
              <option value="es">{t.languageOptions.es}</option>
              <option value="fr">{t.languageOptions.fr}</option>
            </select>
          </div>

          {/* Contact Preference - NOVO CAMPO */}
          <div>
            <label className="block text-sm font-semibold text-white/90 mb-2 uppercase tracking-wider">
              {t.fields.contactPreference} *
            </label>
            <select
              value={formData.contactPreference || 'email'}
              onChange={(e) => setFormData({ ...formData, contactPreference: e.target.value as any })}
              className="input-adaptive w-full"
              required
            >
              <option value="email">{t.contactPreferenceOptions.email}</option>
              <option value="whatsapp">{t.contactPreferenceOptions.whatsapp}</option>
              <option value="call">{t.contactPreferenceOptions.call}</option>
              <option value="any">{t.contactPreferenceOptions.any}</option>
            </select>
            
            {/* Helper text para pessoas tímidas */}
            {formData.contactPreference === 'email' && (
              <p className="mt-2 text-xs text-green-400">
                ✅ Relaxa! Vamos mandar tudo por email. Sem ligação, sem pressão.
              </p>
            )}
            {formData.contactPreference === 'whatsapp' && (
              <p className="mt-2 text-xs text-blue-400">
                💬 Beleza! Vamos te chamar no WhatsApp quando tiver novidade.
              </p>
            )}
            {formData.contactPreference === 'call' && (
              <p className="mt-2 text-xs text-yellow-400">
                📞 Top! Vamos te ligar para conversar melhor sobre tudo.
              </p>
            )}
          </div>

          {/* Interest (auto-filled - read-only display) */}
          {formData.interest && (
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2 uppercase tracking-wider">
                {t.fields.interest}
              </label>
              <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">🤖</span>
                  <div>
                    <p className="text-sm text-blue-400 font-semibold mb-1 uppercase">
                      IA detectou:
                    </p>
                    <p className="text-white/80 text-sm">
                      {formData.interest}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="p-4 bg-red-500/20 border border-red-500/40 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-10 py-5 bg-azimut-red hover:bg-azimut-red/90 disabled:bg-azimut-red/50 disabled:cursor-not-allowed text-white text-lg font-bold uppercase tracking-wider rounded-full transition-all hover:scale-105 hover:shadow-2xl hover:shadow-azimut-red/50"
          >
            {loading ? t.submitting : t.submit}
          </button>

          {/* Privacy */}
          <p className="text-xs text-white/40 text-center">
            🔒 Seus dados são 100% protegidos e nunca compartilhados.
          </p>
        </form>
      )}
    </div>
  )
}

export default AcademyQuickForm
