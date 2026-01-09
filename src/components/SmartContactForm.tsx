import { useState, useEffect } from 'react'
import type { Lang } from '../i18n'
import ApiService from '../services/api'

interface SmartContactFormProps {
  lang?: Lang
}

// Helper para campos padronizados com validação (usando card-adaptive original)
const PremiumField = ({ 
  label, 
  children, 
  className = '', 
  error, 
  required = false 
}: { 
  label: string, 
  children: React.ReactNode, 
  className?: string,
  error?: string,
  required?: boolean
}) => (
  <div className={`group ${className}`}>
    <label className={`block text-sm font-medium mb-2 transition-colors ${
      error ? 'text-red-400' : 'opacity-90'
    }`}>
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <div className="relative">
      {children}
      {/* Mensagem de erro abaixo do campo */}
      {error && (
        <p className="mt-1.5 text-xs text-red-400/90 flex items-center gap-1.5 animate-fade-in-up">
          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {error}
        </p>
      )}
    </div>
  </div>
)

export default function SmartContactForm({ lang = 'pt' }: SmartContactFormProps) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [aiSuggestions, setAiSuggestions] = useState<{
    message: string
    projectSuggestions: string[]
    budgetSuggestion: string | null
    nextSteps: string[]
    aiEnabled?: boolean
  } | null>(null)
  const [loadingSuggestions, setLoadingSuggestions] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    organizationType: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
    interestInGrants: false,
    country: '',
    city: '',
    acceptContact: false
  })

  // Labels multi-idioma (mantendo estrutura original)
  const labels = {
    pt: {
      title: 'Solicitar Proposta',
      subtitle: 'Preencha o formulário e responderemos em até 24 horas',
      name: 'Nome completo *',
      email: 'Email *',
      phone: 'Telefone / WhatsApp',
      company: 'Nome da Organização *',
      position: 'Seu Cargo',
      organizationType: 'Você representa: *',
      orgTypes: {
        '': 'Selecione...',
        governo: '🏛️ Governo (federal/estadual/municipal)',
        museu: '🎨 Museu ou Centro Cultural',
        universidade: '🎓 Universidade/Educação',
        fundacao: '💼 Fundação ou Instituto',
        corporativo: '🏢 Empresa Privada',
        produtor: '🎬 Produtor/Diretor/Artista',
        outro: '🤷 Outro'
      },
      projectType: 'Tipo de Projeto: *',
      projectTypes: {
        '': 'Selecione...',
        museu: 'Museu/Exposição',
        instalacao: 'Instalação Imersiva',
        vr: 'Experiência VR/AR',
        app: 'App/Plataforma Digital',
        evento: 'Evento/Festival',
        treinamento: 'Treinamento Corporativo',
        indefinido: 'Ainda não sei (preciso ajuda)'
      },
      budget: 'Budget Disponível: *',
      budgetRanges: {
        '': 'Selecione...',
        '<100k': '< R$ 100k / CAD $30k',
        '100k-300k': 'R$ 100k-300k / CAD $30k-90k',
        '300k-500k': 'R$ 300k-500k / CAD $90k-150k',
        '500k-1m': 'R$ 500k-1M / CAD $150k-300k',
        '1m-3m': 'R$ 1M-3M / CAD $300k-900k',
        '3m+': 'R$ 3M+ / CAD $900k+',
        grant: '💰 Preciso aplicar para grant/edital',
        indefinido: 'Ainda não defini'
      },
      timeline: 'Quando precisa estar pronto? *',
      timelines: {
        '': 'Selecione...',
        urgente: '⚡ Urgente (< 3 meses)',
        '6m': '📅 Normal (3-6 meses)',
        '12m': '🗓️ Planejamento (6-12 meses)',
        '18m+': '📆 Longo prazo (12+ meses)',
        indefinido: 'Ainda não sei'
      },
      country: 'País',
      city: 'Cidade',
      description: 'Descreva brevemente seu projeto ou necessidade',
      interestInGrants: 'Gostaria de ajuda para aplicar em grants/editais',
      acceptContact: 'Aceito receber contato da Azimut sobre meu projeto *',
      submit: 'Enviar Solicitação',
      submitting: 'Enviando...',
      successTitle: '✅ Solicitação Enviada!',
      successMessage: 'Recebemos sua solicitação. Responderemos em até 24 horas úteis.',
      successCTA: 'Fechar',
      errorTitle: 'Erro ao enviar',
      errorMessage: 'Por favor, tente novamente ou entre em contato diretamente.',
      guarantees: {
        response: '✅ Resposta em 24h',
        meeting: '✅ Reunião personalizada',
        proposal: '✅ Proposta detalhada',
        commitment: '✅ Compromisso sério'
      }
    },
    en: {
      title: 'Request a Proposal',
      subtitle: 'Fill out the form and we will respond within 24 hours',
      name: 'Full name *',
      email: 'Email *',
      phone: 'Phone / WhatsApp',
      company: 'Organization Name *',
      position: 'Your Position',
      organizationType: 'You represent: *',
      orgTypes: {
        '': 'Select...',
        governo: '🏛️ Government (federal/state/municipal)',
        museu: '🎨 Museum or Cultural Center',
        universidade: '🎓 University/Education',
        fundacao: '💼 Foundation or Institute',
        corporativo: '🏢 Private Company',
        produtor: '🎬 Producer/Director/Artist',
        outro: '🤷 Other'
      },
      projectType: 'Project Type: *',
      projectTypes: {
        '': 'Select...',
        museu: 'Museum/Exhibition',
        instalacao: 'Immersive Installation',
        vr: 'VR/AR Experience',
        app: 'App/Digital Platform',
        evento: 'Event/Festival',
        treinamento: 'Corporate Training',
        indefinido: 'Not sure yet (need help)'
      },
      budget: 'Available Budget: *',
      budgetRanges: {
        '': 'Select...',
        '<100k': '< R$ 100k / CAD $30k',
        '100k-300k': 'R$ 100k-300k / CAD $30k-90k',
        '300k-500k': 'R$ 300k-500k / CAD $90k-150k',
        '500k-1m': 'R$ 500k-1M / CAD $150k-300k',
        '1m-3m': 'R$ 1M-3M / CAD $300k-900k',
        '3m+': 'R$ 3M+ / CAD $900k+',
        grant: '💰 Need to apply for grant/funding',
        indefinido: 'Not defined yet'
      },
      timeline: 'When do you need it ready? *',
      timelines: {
        '': 'Select...',
        urgente: '⚡ Urgent (< 3 months)',
        '6m': '📅 Normal (3-6 months)',
        '12m': '🗓️ Planning (6-12 months)',
        '18m+': '📆 Long term (12+ months)',
        indefinido: 'Not sure'
      },
      country: 'Country',
      city: 'City',
      description: 'Briefly describe your project or needs',
      interestInGrants: 'I would like help applying for grants/funding',
      acceptContact: 'I accept to be contacted by Azimut about my project *',
      submit: 'Submit Request',
      submitting: 'Submitting...',
      successTitle: '✅ Request Sent!',
      successMessage: 'We received your request. We will respond within 24 business hours.',
      successCTA: 'Close',
      errorTitle: 'Error submitting',
      errorMessage: 'Please try again or contact us directly.',
      guarantees: {
        response: '✅ Response in 24h',
        meeting: '✅ Personalized meeting',
        proposal: '✅ Detailed proposal',
        commitment: '✅ Serious commitment'
      }
    },
    es: {
      title: 'Solicitar Propuesta',
      subtitle: 'Complete el formulario y responderemos en 24 horas',
      name: 'Nombre completo *',
      email: 'Email *',
      phone: 'Teléfono / WhatsApp',
      company: 'Nombre de la Organización *',
      position: 'Su Cargo',
      organizationType: 'Usted representa: *',
      orgTypes: {
        '': 'Seleccione...',
        governo: '🏛️ Gobierno (federal/estatal/municipal)',
        museu: '🎨 Museo o Centro Cultural',
        universidade: '🎓 Universidad/Educación',
        fundacao: '💼 Fundación o Instituto',
        corporativo: '🏢 Empresa Privada',
        produtor: '🎬 Productor/Director/Artista',
        outro: '🤷 Otro'
      },
      projectType: 'Tipo de Proyecto: *',
      projectTypes: {
        '': 'Seleccione...',
        museu: 'Museo/Exposición',
        instalacao: 'Instalación Inmersiva',
        vr: 'Experiencia VR/AR',
        app: 'App/Plataforma Digital',
        evento: 'Evento/Festival',
        treinamento: 'Capacitación Corporativa',
        indefinido: 'Aún no lo sé (necesito ayuda)'
      },
      budget: 'Presupuesto Disponible: *',
      budgetRanges: {
        '': 'Seleccione...',
        '<100k': '< R$ 100k / CAD $30k',
        '100k-300k': 'R$ 100k-300k / CAD $30k-90k',
        '300k-500k': 'R$ 300k-500k / CAD $90k-150k',
        '500k-1m': 'R$ 500k-1M / CAD $150k-300k',
        '1m-3m': 'R$ 1M-3M / CAD $300k-900k',
        '3m+': 'R$ 3M+ / CAD $900k+',
        grant: '💰 Necesito solicitar subvención/edital',
        indefinido: 'Aún no definido'
      },
      timeline: '¿Cuándo lo necesita listo? *',
      timelines: {
        '': 'Seleccione...',
        urgente: '⚡ Urgente (< 3 meses)',
        '6m': '📅 Normal (3-6 meses)',
        '12m': '🗓️ Planificación (6-12 meses)',
        '18m+': '📆 Largo plazo (12+ meses)',
        indefinido: 'Aún no lo sé'
      },
      country: 'País',
      city: 'Ciudad',
      description: 'Describa brevemente su proyecto o necesidad',
      interestInGrants: 'Me gustaría ayuda para solicitar subvenciones/editais',
      acceptContact: 'Acepto recibir contacto de Azimut sobre mi proyecto *',
      submit: 'Enviar Solicitud',
      submitting: 'Enviando...',
      successTitle: '✅ Solicitud Enviada!',
      successMessage: 'Recibimos su solicitud. Responderemos en 24 horas hábiles.',
      successCTA: 'Cerrar',
      errorTitle: 'Error al enviar',
      errorMessage: 'Por favor, intente nuevamente o contáctenos directamente.',
      guarantees: {
        response: '✅ Respuesta en 24h',
        meeting: '✅ Reunión personalizada',
        proposal: '✅ Propuesta detallada',
        commitment: '✅ Compromiso serio'
      }
    },
    fr: {
      title: 'Demander une Proposition',
      subtitle: 'Remplissez le formulaire et nous répondrons dans 24 heures',
      name: 'Nom complet *',
      email: 'Email *',
      phone: 'Téléphone / WhatsApp',
      company: 'Nom de l\'Organisation *',
      position: 'Votre Poste',
      organizationType: 'Vous représentez: *',
      orgTypes: {
        '': 'Sélectionnez...',
        governo: '🏛️ Gouvernement (fédéral/étatique/municipal)',
        museu: '🎨 Musée ou Centre Culturel',
        universidade: '🎓 Université/Éducation',
        fundacao: '💼 Fondation ou Institut',
        corporativo: '🏢 Entreprise Privée',
        produtor: '🎬 Producteur/Réalisateur/Artiste',
        outro: '🤷 Autre'
      },
      projectType: 'Type de Projet: *',
      projectTypes: {
        '': 'Sélectionnez...',
        museu: 'Musée/Exposition',
        instalacao: 'Installation Immersive',
        vr: 'Expérience VR/AR',
        app: 'App/Plateforme Numérique',
        evento: 'Événement/Festival',
        treinamento: 'Formation d\'Entreprise',
        indefinido: 'Pas encore sûr (besoin d\'aide)'
      },
      budget: 'Budget Disponible: *',
      budgetRanges: {
        '': 'Sélectionnez...',
        '<100k': '< R$ 100k / CAD $30k',
        '100k-300k': 'R$ 100k-300k / CAD $30k-90k',
        '300k-500k': 'R$ 300k-500k / CAD $90k-150k',
        '500k-1m': 'R$ 500k-1M / CAD $150k-300k',
        '1m-3m': 'R$ 1M-3M / CAD $300k-900k',
        '3m+': 'R$ 3M+ / CAD $900k+',
        grant: '💰 Besoin de demander une subvention/appel',
        indefinido: 'Pas encore défini'
      },
      timeline: 'Quand en avez-vous besoin? *',
      timelines: {
        '': 'Sélectionnez...',
        urgente: '⚡ Urgent (< 3 mois)',
        '6m': '📅 Normal (3-6 mois)',
        '12m': '🗓️ Planification (6-12 mois)',
        '18m+': '📆 Long terme (12+ mois)',
        indefinido: 'Pas sûr'
      },
      country: 'Pays',
      city: 'Ville',
      description: 'Décrivez brièvement votre projet ou besoin',
      interestInGrants: 'J\'aimerais de l\'aide pour demander des subventions/appels',
      acceptContact: 'J\'accepte d\'être contacté par Azimut concernant mon projet *',
      submit: 'Envoyer la Demande',
      submitting: 'Envoi...',
      successTitle: '✅ Demande Envoyée!',
      successMessage: 'Nous avons reçu votre demande. Nous répondrons dans 24 heures ouvrables.',
      successCTA: 'Fermer',
      errorTitle: 'Erreur lors de l\'envoi',
      errorMessage: 'Veuillez réessayer ou nous contacter directement.',
      guarantees: {
        response: '✅ Réponse en 24h',
        meeting: '✅ Réunion personnalisée',
        proposal: '✅ Proposition détaillée',
        commitment: '✅ Engagement sérieux'
      }
    }
  }

  const t = labels[lang] || labels.en

  // Scroll automático para erro quando aparecer
  useEffect(() => {
    if (error) {
      const errorElement = document.getElementById('form-error-message')
      if (errorElement) {
        // Scroll suave para o erro
        setTimeout(() => {
          errorElement.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
          })
          // Shake effect sutil
          errorElement.style.animation = 'shake 0.5s ease-in-out'
          setTimeout(() => {
            errorElement.style.animation = ''
          }, 500)
        }, 100)
      }
    }
  }, [error])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    // Validação com feedback específico por campo
    const errors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      errors.name = lang === 'pt' ? 'Nome é obrigatório' : lang === 'es' ? 'Nombre es obligatorio' : lang === 'fr' ? 'Le nom est requis' : 'Name is required'
    }
    
    if (!formData.email.trim()) {
      errors.email = lang === 'pt' ? 'Email é obrigatório' : lang === 'es' ? 'Email es obligatorio' : lang === 'fr' ? 'L\'email est requis' : 'Email is required'
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        errors.email = lang === 'pt' ? 'Email inválido' : lang === 'es' ? 'Email inválido' : lang === 'fr' ? 'Email invalide' : 'Invalid email'
      }
    }
    
    if (!formData.company.trim()) {
      errors.company = lang === 'pt' ? 'Nome da organização é obrigatório' : lang === 'es' ? 'Nombre de la organización es obligatorio' : lang === 'fr' ? 'Le nom de l\'organisation est requis' : 'Organization name is required'
    }
    
    if (!formData.organizationType) {
      errors.organizationType = lang === 'pt' ? 'Selecione o tipo de organização' : lang === 'es' ? 'Seleccione el tipo de organización' : lang === 'fr' ? 'Sélectionnez le type d\'organisation' : 'Select organization type'
    }
    
    if (!formData.projectType) {
      errors.projectType = lang === 'pt' ? 'Selecione o tipo de projeto' : lang === 'es' ? 'Seleccione el tipo de proyecto' : lang === 'fr' ? 'Sélectionnez le type de projet' : 'Select project type'
    }
    
    if (!formData.budget) {
      errors.budget = lang === 'pt' ? 'Selecione o budget disponível' : lang === 'es' ? 'Seleccione el presupuesto disponible' : lang === 'fr' ? 'Sélectionnez le budget disponible' : 'Select available budget'
    }
    
    if (!formData.timeline) {
      errors.timeline = lang === 'pt' ? 'Selecione o prazo necessário' : lang === 'es' ? 'Seleccione el plazo necesario' : lang === 'fr' ? 'Sélectionnez le délai nécessaire' : 'Select timeline'
    }
    
    if (!formData.acceptContact) {
      errors.acceptContact = lang === 'pt' ? 'É necessário aceitar receber contato' : lang === 'es' ? 'Es necesario aceptar recibir contacto' : lang === 'fr' ? 'Vous devez accepter de recevoir des contacts' : 'You must accept to be contacted'
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setLoading(false)
      setError(
        lang === 'pt' 
          ? 'Por favor, corrija os campos destacados abaixo.'
          : lang === 'es'
          ? 'Por favor, corrija los campos destacados a continuación.'
          : lang === 'fr'
          ? 'Veuillez corriger les champs mis en évidence ci-dessous.'
          : 'Please fix the highlighted fields below.'
      )
      return
    }

    // Limpar erros de campo se validação passou
    setFieldErrors({})

    try {
      await ApiService.submitLead(formData)

      setSuccess(true)
      setError('')
      setFieldErrors({})
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        position: '',
        organizationType: '',
        projectType: '',
        budget: '',
        timeline: '',
        description: '',
        interestInGrants: false,
        country: '',
        city: '',
        acceptContact: false
      })
    } catch (err: any) {
      console.error('Error submitting form:', err)
      // Limpar erros de campo (erro de servidor é diferente)
      setFieldErrors({})
      // Mensagem de erro mais específica
      const errorMsg = err?.message || t.errorMessage || (lang === 'pt' 
        ? 'Erro ao enviar. Por favor, tente novamente ou entre em contato diretamente.'
        : lang === 'es'
        ? 'Error al enviar. Por favor, intente nuevamente o contáctenos directamente.'
        : lang === 'fr'
        ? 'Erreur lors de l\'envoi. Veuillez réessayer ou nous contacter directement.'
        : 'Error submitting. Please try again or contact us directly.')
      setError(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  // Debounce para sugestões IA
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.organizationType && formData.projectType && formData.budget && formData.description) {
        fetchAISuggestions()
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [formData.organizationType, formData.projectType, formData.budget, formData.description])

  const fetchAISuggestions = async () => {
    setLoadingSuggestions(true)
    try {
      const suggestions = await ApiService.getAiSuggestions({
        organizationType: formData.organizationType,
        projectType: formData.projectType,
        budget: formData.budget,
        description: formData.description,
      })

      if (suggestions) {
        setAiSuggestions(suggestions)
      }
    } catch (err) {
      console.warn('Sugestões IA não disponíveis')
    } finally {
      setLoadingSuggestions(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    
    // Limpar erro do campo quando usuário começar a digitar
    if (fieldErrors[name]) {
      setFieldErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
    
    // Limpar erro geral quando usuário começar a corrigir
    if (error) {
      setError('')
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  if (success) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="bg-white dark:bg-slate-900 rounded-xl p-8 max-w-md w-full shadow-2xl animate-fade-in-up">
          <div className="text-center">
            <div className="text-6xl mb-4">✅</div>
            <h2 className="text-2xl font-handel uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              {t.successTitle}
            </h2>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              {t.successMessage}
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="px-6 py-3 bg-azimut-red text-white rounded-lg hover:bg-azimut-red/90 transition-colors font-semibold"
            >
              {t.successCTA}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative">
      {/* Container usando card-adaptive (estilo original do site) */}
      <form onSubmit={handleSubmit} className="relative space-y-6 rounded-2xl border border-white/10 card-adaptive p-6 md:p-8 lg:p-10 shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur animate-fade-in-up">
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="font-handel text-3xl md:text-4xl uppercase tracking-wider mb-3">
                {t.title}
              </h2>
              <p className="text-sm md:text-base opacity-80">
                {t.subtitle}
              </p>
            </div>

            {/* Sugestões IA */}
            {aiSuggestions && (formData.organizationType && formData.projectType) && (
              <div className="glass-panel backdrop-blur-xl bg-blue-900/20 border border-blue-500/30 rounded-lg p-4 mb-6 animate-fade-in-up [data-theme='light']:bg-blue-50/50 [data-theme='light']:border-blue-200">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🤖</span>
                  <div className="flex-1">
                    <div className="font-semibold text-blue-200 [data-theme='light']:text-blue-900 mb-2 flex items-center gap-2">
                      Sugestões Personalizadas
                      {aiSuggestions.aiEnabled && (
                        <span className="text-xs px-2 py-0.5 bg-blue-500/30 [data-theme='light']:bg-blue-200 rounded-full">
                          IA
                        </span>
                      )}
                    </div>
                    {aiSuggestions.message && (
                      <p className="text-sm text-blue-200 [data-theme='light']:text-blue-800 mb-3">
                        {aiSuggestions.message}
                      </p>
                    )}
                    {aiSuggestions.projectSuggestions.length > 0 && (
                      <div className="text-sm text-blue-200/90 [data-theme='light']:text-blue-700 mb-2">
                        <strong>Projetos que podem interessar:</strong>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                          {aiSuggestions.projectSuggestions.map((s, i) => (
                            <li key={i}>{s}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {aiSuggestions.budgetSuggestion && (
                      <div className="text-sm text-blue-200/90 [data-theme='light']:text-blue-700 mt-2">
                        💡 {aiSuggestions.budgetSuggestion}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Personal Info - Grid 2 colunas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <PremiumField label={t.name} error={fieldErrors.name} required>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`relative z-10 input-adaptive w-full px-4 py-3.5 rounded-lg focus:ring-2 transition-all duration-300 group-hover:border-white/20 ${
                    fieldErrors.name 
                      ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50' 
                      : 'focus:ring-azimut-red/50 focus:border-azimut-red/50'
                  }`}
                  placeholder="João Silva"
                />
              </PremiumField>

              <PremiumField label={t.email} error={fieldErrors.email} required>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`relative z-10 input-adaptive w-full px-4 py-3.5 rounded-lg focus:ring-2 transition-all duration-300 group-hover:border-white/20 ${
                    fieldErrors.email 
                      ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50' 
                      : 'focus:ring-azimut-red/50 focus:border-azimut-red/50'
                  }`}
                  placeholder="joao@example.com"
                />
              </PremiumField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <PremiumField label={t.phone}>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="relative z-10 input-adaptive w-full px-4 py-3.5 rounded-lg focus:ring-2 focus:ring-azimut-red/50 focus:border-azimut-red/50 transition-all duration-300 group-hover:border-white/20"
                  placeholder="+55 11 98765-4321"
                />
              </PremiumField>

              <PremiumField label={t.position}>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="relative z-10 input-adaptive w-full px-4 py-3.5 rounded-lg focus:ring-2 focus:ring-azimut-red/50 focus:border-azimut-red/50 transition-all duration-300 group-hover:border-white/20"
                  placeholder="Diretor de Tecnologia"
                />
              </PremiumField>
            </div>

            {/* Organization */}
            <PremiumField label={t.company} error={fieldErrors.company} required>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className={`relative z-10 input-adaptive w-full px-4 py-3.5 rounded-lg focus:ring-2 transition-all duration-300 group-hover:border-white/20 ${
                  fieldErrors.company 
                    ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50' 
                    : 'focus:ring-azimut-red/50 focus:border-azimut-red/50'
                }`}
                placeholder="Museu de Arte de São Paulo"
              />
            </PremiumField>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <PremiumField label={t.organizationType} error={fieldErrors.organizationType} required>
                <select
                  name="organizationType"
                  value={formData.organizationType}
                  onChange={handleChange}
                  required
                  className={`relative z-10 input-adaptive w-full px-4 py-3.5 rounded-lg focus:ring-2 transition-all duration-300 group-hover:border-white/20 ${
                    fieldErrors.organizationType 
                      ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50' 
                      : 'focus:ring-azimut-red/50 focus:border-azimut-red/50'
                  }`}
                >
                  {Object.entries(t.orgTypes).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </PremiumField>

              <PremiumField label={t.projectType} error={fieldErrors.projectType} required>
                <select
                  name="projectType"
                  value={formData.projectType}
                  onChange={handleChange}
                  required
                  className={`relative z-10 input-adaptive w-full px-4 py-3.5 rounded-lg focus:ring-2 transition-all duration-300 group-hover:border-white/20 ${
                    fieldErrors.projectType 
                      ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50' 
                      : 'focus:ring-azimut-red/50 focus:border-azimut-red/50'
                  }`}
                >
                  {Object.entries(t.projectTypes).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </PremiumField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <PremiumField label={t.budget} error={fieldErrors.budget} required>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                  className={`relative z-10 input-adaptive w-full px-4 py-3.5 rounded-lg focus:ring-2 transition-all duration-300 group-hover:border-white/20 ${
                    fieldErrors.budget 
                      ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50' 
                      : 'focus:ring-azimut-red/50 focus:border-azimut-red/50'
                  }`}
                >
                  {Object.entries(t.budgetRanges).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </PremiumField>

              <PremiumField label={t.timeline} error={fieldErrors.timeline} required>
                <select
                  name="timeline"
                  value={formData.timeline}
                  onChange={handleChange}
                  required
                  className={`relative z-10 input-adaptive w-full px-4 py-3.5 rounded-lg focus:ring-2 transition-all duration-300 group-hover:border-white/20 ${
                    fieldErrors.timeline 
                      ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50' 
                      : 'focus:ring-azimut-red/50 focus:border-azimut-red/50'
                  }`}
                >
                  {Object.entries(t.timelines).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </PremiumField>
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <PremiumField label={t.country}>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="relative z-10 input-adaptive w-full px-4 py-3.5 rounded-lg focus:ring-2 focus:ring-azimut-red/50 focus:border-azimut-red/50 transition-all duration-300 group-hover:border-white/20"
                  placeholder="Brasil"
                />
              </PremiumField>

              <PremiumField label={t.city}>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="relative z-10 input-adaptive w-full px-4 py-3.5 rounded-lg focus:ring-2 focus:ring-azimut-red/50 focus:border-azimut-red/50 transition-all duration-300 group-hover:border-white/20"
                  placeholder="São Paulo"
                />
              </PremiumField>
            </div>

            {/* Description */}
            <PremiumField label={t.description}>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                className="relative z-10 input-adaptive w-full px-4 py-3.5 rounded-lg focus:ring-2 focus:ring-azimut-red/50 focus:border-azimut-red/50 transition-all duration-300 group-hover:border-white/20 resize-none"
                placeholder="Queremos criar uma instalação imersiva para nosso museu..."
              />
            </PremiumField>

            {/* Checkboxes */}
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="interestInGrants"
                  checked={formData.interestInGrants}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 rounded border-white/30 text-azimut-red focus:ring-2 focus:ring-azimut-red bg-white/10 transition-all group-hover:border-azimut-red/50 [data-theme='light']:border-slate-300 [data-theme='light']:bg-white"
                />
                <span className="text-sm text-white/85 [data-theme='light']:text-slate-700 group-hover:text-white transition-colors">
                  {t.interestInGrants}
                </span>
              </label>

              <div>
                <label className={`flex items-start gap-3 cursor-pointer group ${
                  fieldErrors.acceptContact ? 'pb-5' : ''
                }`}>
                  <input
                    type="checkbox"
                    name="acceptContact"
                    checked={formData.acceptContact}
                    onChange={handleChange}
                    required
                    className={`mt-1 w-5 h-5 rounded border-white/30 text-azimut-red focus:ring-2 focus:ring-azimut-red bg-white/10 transition-all group-hover:border-azimut-red/50 [data-theme='light']:border-slate-300 [data-theme='light']:bg-white ${
                      fieldErrors.acceptContact ? 'border-red-500/50' : ''
                    }`}
                  />
                  <span className={`text-sm transition-colors ${
                    fieldErrors.acceptContact 
                      ? 'text-red-400' 
                      : 'text-white/85 [data-theme="light"]:text-slate-700 group-hover:text-white'
                  }`}>
                    {t.acceptContact} <span className="text-red-400">*</span>
                  </span>
                </label>
                {fieldErrors.acceptContact && (
                  <p className="mt-1.5 ml-8 text-xs text-red-400/90 flex items-center gap-1.5 animate-fade-in-up">
                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {fieldErrors.acceptContact}
                  </p>
                )}
              </div>
            </div>

            {/* Error Message - Próximo ao botão (scroll automático) */}
            {error && (
              <div 
                id="form-error-message"
                className="glass-panel backdrop-blur-xl border border-red-500/50 rounded-lg p-4 animate-fade-in-up [data-theme='light']:bg-red-50/90 [data-theme='light']:border-red-300 shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, rgba(201, 35, 55, 0.15) 0%, rgba(139, 35, 50, 0.12) 100%)'
                }}
              >
                <div className="flex items-start gap-3">
                  {/* Ícone de erro */}
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-red-300 [data-theme='light']:text-red-700 mb-1">
                      {t.errorTitle}
                    </p>
                    <p className="text-sm text-red-200/90 [data-theme='light']:text-red-600 leading-relaxed">
                      {error}
                    </p>
                    {/* Ação sugerida */}
                    <p className="text-xs text-red-300/70 [data-theme='light']:text-red-500 mt-2 italic">
                      {lang === 'pt' 
                        ? 'Por favor, verifique os campos obrigatórios e tente novamente.'
                        : lang === 'es'
                        ? 'Por favor, verifique los campos obligatorios e intente nuevamente.'
                        : lang === 'fr'
                        ? 'Veuillez vérifier les champs obligatoires et réessayer.'
                        : 'Please check required fields and try again.'}
                    </p>
                  </div>
                  
                  {/* Botão fechar erro */}
                  <button
                    type="button"
                    onClick={() => setError('')}
                    className="flex-shrink-0 text-red-400/70 hover:text-red-300 transition-colors p-1 rounded hover:bg-red-500/10"
                    aria-label="Fechar erro"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {/* Submit Button - Premium com glow, muda quando tem erro */}
            <button
              type="submit"
              disabled={loading}
              className={`relative w-full px-8 py-4 rounded-lg font-handel text-lg uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-all duration-300 overflow-hidden group ${
                error 
                  ? 'bg-red-600/80 hover:bg-red-600 border border-red-500/50' 
                  : 'bg-azimut-red hover:bg-azimut-red/90 text-white hover:shadow-xl'
              } ${!error ? 'text-white' : 'text-white'}`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t.submitting}
                  </>
                ) : error ? (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {lang === 'pt' ? 'Tentar Novamente' : lang === 'es' ? 'Intentar Nuevamente' : lang === 'fr' ? 'Réessayer' : 'Try Again'}
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                ) : (
                  <>
                    {t.submit}
                    <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </span>
              
              {/* Shine effect no hover (apenas quando não tem erro) */}
              {!error && (
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform -translate-x-full group-hover:translate-x-full" />
              )}
              
              {/* Glow effect */}
              <span className={`absolute -inset-0.5 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                error ? 'bg-red-500/50' : 'bg-azimut-red/50'
              }`} />
            </button>

            {/* Guarantees */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/10">
              {Object.values(t.guarantees).map((guarantee, idx) => (
                <div key={idx} className="text-xs opacity-70 flex items-center gap-2">
                  <span className="text-azimut-red/80">✓</span>
                  {guarantee}
                </div>
              ))}
            </div>
      </form>
    </div>
  )
}
