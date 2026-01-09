// ════════════════════════════════════════════════════════════
// ACADEMY QUICK FORM - FORMULÁRIO SIMPLIFICADO
// ════════════════════════════════════════════════════════════
// Apenas 3-5 campos essenciais
// IA preenche automaticamente resto com base em Quiz/Recomendador
// ════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react'
import { type Lang } from '../i18n'
import ApiService from '../services/api'

interface AcademyQuickFormProps {
  lang: Lang
  type: 'vancouver' | 'course' | 'workshop' | 'corporate'
  prefilledData?: Partial<FormData>
}

interface FormData {
  name: string
  email: string
  phone: string
  interest: string // Pré-preenchido se veio do Quiz/Recomendador
  message: string
}

const AcademyQuickForm: React.FC<AcademyQuickFormProps> = ({ lang, type, prefilledData }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
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
        vancouver: 'Quero estudar em Vancouver',
        course: 'Quero fazer um curso',
        workshop: 'Quero participar de um workshop',
        corporate: 'Quero um treinamento corporativo'
      },
      subtitle: 'Preencha apenas 3 campos. O resto fazemos para você.',
      fields: {
        name: 'Nome completo',
        email: 'E-mail',
        phone: 'WhatsApp (opcional)',
        interest: 'Interesse (preenchido automaticamente)',
        message: 'Mensagem adicional (opcional)'
      },
      submit: 'Enviar Interesse',
      submitting: 'Enviando...',
      success: '✅ Pronto! Entraremos em contato em breve.',
      error: 'Erro ao enviar. Tente novamente ou entre em contato: contact@azmt.com.br',
      required: 'Campos obrigatórios: Nome e E-mail'
    },
    en: {
      title: {
        vancouver: 'I want to study in Vancouver',
        course: 'I want to take a course',
        workshop: 'I want to join a workshop',
        corporate: 'I want corporate training'
      },
      subtitle: 'Fill in just 3 fields. We do the rest for you.',
      fields: {
        name: 'Full name',
        email: 'Email',
        phone: 'WhatsApp (optional)',
        interest: 'Interest (auto-filled)',
        message: 'Additional message (optional)'
      },
      submit: 'Send Interest',
      submitting: 'Sending...',
      success: '✅ Done! We will contact you soon.',
      error: 'Error sending. Try again or contact: contact@azmt.com.br',
      required: 'Required fields: Name and Email'
    },
    es: {
      title: {
        vancouver: 'Quiero estudiar en Vancouver',
        course: 'Quiero hacer un curso',
        workshop: 'Quiero participar en un taller',
        corporate: 'Quiero capacitación corporativa'
      },
      subtitle: 'Complete solo 3 campos. Hacemos el resto por usted.',
      fields: {
        name: 'Nombre completo',
        email: 'Email',
        phone: 'WhatsApp (opcional)',
        interest: 'Interés (autocompletado)',
        message: 'Mensaje adicional (opcional)'
      },
      submit: 'Enviar Interés',
      submitting: 'Enviando...',
      success: '✅ ¡Listo! Nos pondremos en contacto pronto.',
      error: 'Error al enviar. Intente nuevamente o contacte: contact@azmt.com.br',
      required: 'Campos obligatorios: Nombre y Email'
    },
    fr: {
      title: {
        vancouver: 'Je veux étudier à Vancouver',
        course: 'Je veux suivre un cours',
        workshop: 'Je veux participer à un atelier',
        corporate: 'Je veux une formation d\'entreprise'
      },
      subtitle: 'Remplissez seulement 3 champs. On fait le reste pour vous.',
      fields: {
        name: 'Nom complet',
        email: 'Email',
        phone: 'WhatsApp (optionnel)',
        interest: 'Intérêt (rempli automatiquement)',
        message: 'Message supplémentaire (optionnel)'
      },
      submit: 'Envoyer Intérêt',
      submitting: 'Envoi...',
      success: '✅ Terminé! Nous vous contactons bientôt.',
      error: 'Erreur d\'envoi. Réessayez ou contactez: contact@azmt.com.br',
      required: 'Champs obligatoires: Nom et Email'
    }
  }

  const t = content[lang] || content.pt

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validação mínima
    if (!formData.name || !formData.email) {
      setError(t.required)
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Preparar dados do lead
      const leadData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        leadType: type === 'vancouver' ? 'VANCOUVER' : 
                  type === 'course' ? 'CONTACT_FORM' : 
                  'CONTACT_FORM',
        description: formData.interest + (formData.message ? `\n\n${formData.message}` : ''),
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
      
      // Limpar localStorage após sucesso
      localStorage.removeItem('quizVancouverResult')
      localStorage.removeItem('courseRecommendation')

      // Limpar formulário
      setFormData({
        name: '',
        email: '',
        phone: '',
        interest: '',
        message: ''
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

      {/* Success Message */}
      {success && (
        <div id="form-success" className="mb-8 p-6 bg-green-500/20 border border-green-500/40 rounded-xl text-center">
          <div className="text-5xl mb-3">🎉</div>
          <p className="text-xl font-bold text-green-400 mb-2">
            {t.success}
          </p>
          <p className="text-white/70">
            Nossa equipe entrará em contato em até 24 horas.
          </p>
        </div>
      )}

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
              placeholder="João Silva"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-white/90 mb-2 uppercase tracking-wider">
              {t.fields.email} *
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="input-adaptive w-full"
              required
              placeholder="joao@email.com"
            />
          </div>

          {/* Phone (opcional) */}
          <div>
            <label className="block text-sm font-semibold text-white/90 mb-2 uppercase tracking-wider">
              {t.fields.phone}
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="input-adaptive w-full"
              placeholder="+55 21 99999-9999"
            />
          </div>

          {/* Interest (auto-filled) */}
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
                      IA detectou seu interesse:
                    </p>
                    <p className="text-white/80 text-sm">
                      {formData.interest}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Message (opcional) */}
          <div>
            <label className="block text-sm font-semibold text-white/90 mb-2 uppercase tracking-wider">
              {t.fields.message}
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="input-adaptive w-full"
              rows={3}
              placeholder="Alguma dúvida ou informação adicional..."
            />
          </div>

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
            Seus dados são protegidos e nunca compartilhados.
          </p>
        </form>
      )}
    </div>
  )
}

export default AcademyQuickForm
