import { useState, useEffect } from 'react'
import type { Lang } from '../i18n'
import ApiService from '../services/api'

interface SmartContactFormProps {
  lang?: Lang
}

export default function SmartContactForm({ lang = 'pt' }: SmartContactFormProps) {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
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
      errorTitle: '❌ Erro',
      errorMessage: 'Ocorreu um erro. Tente novamente ou envie email para contato@azmt.com.br',
      guarantees: {
        response: '✅ Resposta em até 24h úteis',
        meeting: '✅ Reunião de descoberta gratuita',
        proposal: '✅ Proposta detalhada em 2 semanas',
        commitment: '✅ Sem compromisso'
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
        indefinido: "I don't know yet (need help)"
      },
      budget: 'Available Budget: *',
      budgetRanges: {
        '': 'Select...',
        '<100k': '< USD $30k / CAD $30k',
        '100k-300k': 'USD $30k-90k / CAD $30k-90k',
        '300k-500k': 'USD $90k-150k / CAD $90k-150k',
        '500k-1m': 'USD $150k-300k / CAD $150k-300k',
        '1m-3m': 'USD $300k-900k / CAD $300k-900k',
        '3m+': 'USD $900k+ / CAD $900k+',
        grant: '💰 Need to apply for grant',
        indefinido: 'Not defined yet'
      },
      timeline: 'When do you need it ready? *',
      timelines: {
        '': 'Select...',
        urgente: '⚡ Urgent (< 3 months)',
        '6m': '📅 Normal (3-6 months)',
        '12m': '🗓️ Planning (6-12 months)',
        '18m+': '📆 Long term (12+ months)',
        indefinido: "I don't know yet"
      },
      country: 'Country',
      city: 'City',
      description: 'Briefly describe your project or need',
      interestInGrants: 'I would like help applying for grants',
      acceptContact: 'I accept to be contacted by Azimut about my project *',
      submit: 'Submit Request',
      submitting: 'Submitting...',
      successTitle: '✅ Request Submitted!',
      successMessage: 'We received your request. We will respond within 24 business hours.',
      successCTA: 'Close',
      errorTitle: '❌ Error',
      errorMessage: 'An error occurred. Please try again or email contact@azmt.com.br',
      guarantees: {
        response: '✅ Response within 24h',
        meeting: '✅ Free discovery meeting',
        proposal: '✅ Detailed proposal in 2 weeks',
        commitment: '✅ No commitment'
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
        indefinido: 'Aún no sé (necesito ayuda)'
      },
      budget: 'Presupuesto Disponible: *',
      budgetRanges: {
        '': 'Seleccione...',
        '<100k': '< USD $30k / CAD $30k',
        '100k-300k': 'USD $30k-90k / CAD $30k-90k',
        '300k-500k': 'USD $90k-150k / CAD $90k-150k',
        '500k-1m': 'USD $150k-300k / CAD $150k-300k',
        '1m-3m': 'USD $300k-900k / CAD $300k-900k',
        '3m+': 'USD $900k+ / CAD $900k+',
        grant: '💰 Necesito aplicar para grant',
        indefinido: 'Aún no definido'
      },
      timeline: '¿Cuándo lo necesita listo? *',
      timelines: {
        '': 'Seleccione...',
        urgente: '⚡ Urgente (< 3 meses)',
        '6m': '📅 Normal (3-6 meses)',
        '12m': '🗓️ Planificación (6-12 meses)',
        '18m+': '📆 Largo plazo (12+ meses)',
        indefinido: 'Aún no sé'
      },
      country: 'País',
      city: 'Ciudad',
      description: 'Describa brevemente su proyecto o necesidad',
      interestInGrants: 'Me gustaría ayuda para aplicar a grants/convocatorias',
      acceptContact: 'Acepto ser contactado por Azimut sobre mi proyecto *',
      submit: 'Enviar Solicitud',
      submitting: 'Enviando...',
      successTitle: '✅ ¡Solicitud Enviada!',
      successMessage: 'Recibimos su solicitud. Responderemos en 24 horas hábiles.',
      successCTA: 'Cerrar',
      errorTitle: '❌ Error',
      errorMessage: 'Ocurrió un error. Intente nuevamente o envíe email a contato@azmt.com.br',
      guarantees: {
        response: '✅ Respuesta en 24h hábiles',
        meeting: '✅ Reunión de descubrimiento gratuita',
        proposal: '✅ Propuesta detallada en 2 semanas',
        commitment: '✅ Sin compromiso'
      }
    },
    fr: {
      title: 'Demander un Devis',
      subtitle: 'Remplissez le formulaire et nous répondrons dans les 24 heures',
      name: 'Nom complet *',
      email: 'Email *',
      phone: 'Téléphone / WhatsApp',
      company: "Nom de l'Organisation *",
      position: 'Votre Poste',
      organizationType: 'Vous représentez: *',
      orgTypes: {
        '': 'Sélectionner...',
        governo: '🏛️ Gouvernement (fédéral/provincial/municipal)',
        museu: '🎨 Musée ou Centre Culturel',
        universidade: '🎓 Université/Éducation',
        fundacao: '💼 Fondation ou Institut',
        corporativo: '🏢 Entreprise Privée',
        produtor: '🎬 Producteur/Réalisateur/Artiste',
        outro: '🤷 Autre'
      },
      projectType: 'Type de Projet: *',
      projectTypes: {
        '': 'Sélectionner...',
        museu: 'Musée/Exposition',
        instalacao: 'Installation Immersive',
        vr: 'Expérience VR/AR',
        app: 'App/Plateforme Numérique',
        evento: 'Événement/Festival',
        treinamento: 'Formation Corporative',
        indefinido: "Je ne sais pas encore (besoin d'aide)"
      },
      budget: 'Budget Disponible: *',
      budgetRanges: {
        '': 'Sélectionner...',
        '<100k': '< CAD $30k',
        '100k-300k': 'CAD $30k-90k',
        '300k-500k': 'CAD $90k-150k',
        '500k-1m': 'CAD $150k-300k',
        '1m-3m': 'CAD $300k-900k',
        '3m+': 'CAD $900k+',
        grant: '💰 Besoin de demander une subvention',
        indefinido: 'Pas encore défini'
      },
      timeline: 'Quand en avez-vous besoin? *',
      timelines: {
        '': 'Sélectionner...',
        urgente: '⚡ Urgent (< 3 mois)',
        '6m': '📅 Normal (3-6 mois)',
        '12m': '🗓️ Planification (6-12 mois)',
        '18m+': '📆 Long terme (12+ mois)',
        indefinido: 'Je ne sais pas encore'
      },
      country: 'Pays',
      city: 'Ville',
      description: 'Décrivez brièvement votre projet ou besoin',
      interestInGrants: "J'aimerais de l'aide pour demander des subventions",
      acceptContact: "J'accepte d'être contacté par Azimut concernant mon projet *",
      submit: 'Envoyer la Demande',
      submitting: 'Envoi en cours...',
      successTitle: '✅ Demande Envoyée!',
      successMessage: 'Nous avons reçu votre demande. Nous répondrons dans les 24 heures ouvrables.',
      successCTA: 'Fermer',
      errorTitle: '❌ Erreur',
      errorMessage: 'Une erreur est survenue. Veuillez réessayer ou envoyer un email à contato@azmt.com.br',
      guarantees: {
        response: '✅ Réponse sous 24h ouvrables',
        meeting: '✅ Réunion de découverte gratuite',
        proposal: '✅ Proposition détaillée en 2 semaines',
        commitment: '✅ Sans engagement'
      }
    }
  }

  const t = labels[lang] || labels.en

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      await ApiService.submitLead(formData)

      setSuccess(true)
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
    } catch (err) {
      setError(t.errorMessage)
    } finally {
      setLoading(false)
    }
  }

  // Buscar sugestões IA quando dados relevantes mudarem
  useEffect(() => {
    // Só buscar se tiver dados suficientes
    if (!formData.organizationType || !formData.projectType) {
      setAiSuggestions(null)
      return
    }

    const timer = setTimeout(() => {
      fetchAISuggestions()
    }, 1000) // Debounce 1s

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
      // Silencioso - não quebrar formulário
      console.warn('Sugestões IA não disponíveis')
    } finally {
      setLoadingSuggestions(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined
    
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
      {/* Container seguindo padrão glass-panel do site */}
      <div className="glass-panel backdrop-blur-xl bg-black/60 border border-white/10 rounded-2xl p-6 md:p-8 lg:p-10 shadow-[0_16px_40px_rgba(0,0,0,0.4)] [data-theme='light']:bg-white/95 [data-theme='light']:border-slate-200/50">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="font-handel text-3xl md:text-4xl uppercase tracking-wider text-white [data-theme='light']:text-slate-900 mb-3">
              {t.title}
            </h2>
            <p className="text-white/70 [data-theme='light']:text-slate-600">
              {t.subtitle}
            </p>
          </div>

          {error && (
            <div className="glass-panel backdrop-blur-xl bg-red-900/30 border border-red-500/40 rounded-lg p-4 text-red-200 [data-theme='light']:bg-red-50 [data-theme='light']:border-red-200 [data-theme='light']:text-red-800">
              <p className="font-semibold">{t.errorTitle}</p>
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Sugestões IA em tempo real */}
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

          {/* Personal Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white/80 [data-theme='light']:text-slate-700 mb-2">
            {t.name}
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input-adaptive w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-azimut-red transition-all"
            placeholder="João Silva"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 [data-theme='light']:text-slate-700 mb-2">
            {t.email}
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="input-adaptive w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-azimut-red transition-all"
            placeholder="joao@example.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white/80 [data-theme='light']:text-slate-700 mb-2">
            {t.phone}
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="input-adaptive w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-azimut-red transition-all"
            placeholder="+55 11 98765-4321"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 [data-theme='light']:text-slate-700 mb-2">
            {t.position}
          </label>
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className="input-adaptive w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-azimut-red transition-all"
            placeholder="Diretor de Tecnologia"
          />
        </div>
      </div>

      {/* Organization */}
      <div>
        <label className="block text-sm font-medium text-white/80 [data-theme='light']:text-slate-700 mb-2">
          {t.company}
        </label>
        <input
          type="text"
          name="company"
          value={formData.company}
          onChange={handleChange}
          required
          className="input-adaptive w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-azimut-red transition-all"
          placeholder="Museu de Arte de São Paulo"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/80 [data-theme='light']:text-slate-700 mb-2">
          {t.organizationType}
        </label>
        <select
          name="organizationType"
          value={formData.organizationType}
          onChange={handleChange}
          required
          className="input-adaptive w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-azimut-red transition-all"
        >
          {Object.entries(t.orgTypes).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      {/* Project Info */}
      <div>
        <label className="block text-sm font-medium text-white/80 [data-theme='light']:text-slate-700 mb-2">
          {t.projectType}
        </label>
        <select
          name="projectType"
          value={formData.projectType}
          onChange={handleChange}
          required
          className="input-adaptive w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-azimut-red transition-all"
        >
          {Object.entries(t.projectTypes).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white/80 [data-theme='light']:text-slate-700 mb-2">
            {t.budget}
          </label>
          <select
            name="budget"
            value={formData.budget}
            onChange={handleChange}
            required
            className="input-adaptive w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-azimut-red transition-all"
          >
            {Object.entries(t.budgetRanges).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 [data-theme='light']:text-slate-700 mb-2">
            {t.timeline}
          </label>
          <select
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
            required
            className="input-adaptive w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-azimut-red transition-all"
          >
            {Object.entries(t.timelines).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white/80 [data-theme='light']:text-slate-700 mb-2">
            {t.country}
          </label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="input-adaptive w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-azimut-red transition-all"
            placeholder="Brasil"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-white/80 [data-theme='light']:text-slate-700 mb-2">
            {t.city}
          </label>
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="input-adaptive w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-azimut-red transition-all"
            placeholder="São Paulo"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-white/80 [data-theme='light']:text-slate-700 mb-2">
          {t.description}
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="input-adaptive w-full px-4 py-3 rounded-lg focus:ring-2 focus:ring-azimut-red transition-all resize-none"
          placeholder="Queremos criar uma instalação imersiva para nosso museu..."
        />
      </div>

          {/* Checkboxes */}
          <div className="space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="interestInGrants"
                checked={formData.interestInGrants}
                onChange={handleChange}
                className="mt-1 w-5 h-5 rounded border-white/30 text-azimut-red focus:ring-2 focus:ring-azimut-red bg-white/10 [data-theme='light']:border-slate-300 [data-theme='light']:bg-white"
              />
              <span className="text-sm text-white/80 [data-theme='light']:text-slate-700">
                {t.interestInGrants}
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="acceptContact"
                checked={formData.acceptContact}
                onChange={handleChange}
                required
                className="mt-1 w-5 h-5 rounded border-white/30 text-azimut-red focus:ring-2 focus:ring-azimut-red bg-white/10 [data-theme='light']:border-slate-300 [data-theme='light']:bg-white"
              />
              <span className="text-sm text-white/80 [data-theme='light']:text-slate-700">
                {t.acceptContact}
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
        type="submit"
        disabled={loading}
        className="w-full px-8 py-4 bg-azimut-red text-white rounded-lg hover:bg-azimut-red/90 transition-all duration-300 font-handel text-lg uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
      >
        {loading ? t.submitting : t.submit}
      </button>

          {/* Guarantees */}
          <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 [data-theme='light']:border-slate-200/50">
            <div className="text-xs text-white/60 [data-theme='light']:text-slate-600">
              {t.guarantees.response}
            </div>
            <div className="text-xs text-slate-300 dark:text-slate-400">
              {t.guarantees.meeting}
            </div>
            <div className="text-xs text-slate-300 dark:text-slate-400">
              {t.guarantees.proposal}
            </div>
            <div className="text-xs text-slate-300 dark:text-slate-400">
              {t.guarantees.commitment}
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
