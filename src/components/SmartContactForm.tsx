import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Lang } from '../i18n'
import ApiService from '../services/api'

// SelectField Component - Customizado (original do formulário)
interface SelectFieldProps {
  value: string
  onChange: (value: string) => void
  options: Array<{ value: string; label: string }>
  placeholder: string
  ariaLabel: string
  className?: string
}

const SelectField: React.FC<SelectFieldProps> = ({ 
  value, 
  onChange, 
  options, 
  placeholder, 
  ariaLabel,
  className = '' 
}) => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const currentLabel = options.find(o => o.value === value)?.label || placeholder

  return (
    <div className={`relative ${className}`} ref={ref}>
      <button
        type="button"
        aria-label={ariaLabel}
        className="select-trigger"
        onClick={() => setOpen(o => !o)}
      >
        <span className={value ? 'text-slate-100' : 'text-slate-400'}>
          {currentLabel}
        </span>
        <svg
          className={`select-arrow w-4 h-4 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="select-panel">
          {options.map(opt => (
            <div
              key={opt.value}
              className="select-option"
              role="option"
              aria-selected={opt.value === value}
              onClick={() => {
                onChange(opt.value)
                setOpen(false)
              }}
            >
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

interface SmartContactFormProps {
  lang?: Lang
}

// Função para determinar moeda baseada no idioma/localização
function getCurrencyForLang(lang: Lang): 'BRL' | 'USD' | 'CAD' {
  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    
    // PT = Brasil = Reais (sempre)
    if (lang === 'pt') return 'BRL'
    
    // FR = Canadá (Quebec) = CAD, ou França = EUR (mas priorizamos CAD para Quebec)
    if (lang === 'fr') {
      // Canadá - Quebec e outras províncias francófonas
      if (timezone.includes('Montreal') || timezone.includes('Toronto') || 
          timezone.includes('Vancouver') || timezone.includes('Winnipeg') ||
          timezone.includes('Edmonton') || timezone.includes('Calgary') ||
          timezone.includes('Halifax')) {
        return 'CAD'
      }
      // França ou outros países francófonos (fallback para USD para manter consistência Américas)
      return 'USD'
    }
    
    // EN = EUA ou Canadá = USD ou CAD
    if (lang === 'en') {
      // Canadá (timezones canadenses)
      if (timezone.includes('Toronto') || timezone.includes('Vancouver') || 
          timezone.includes('Winnipeg') || timezone.includes('Edmonton') ||
          timezone.includes('Calgary') || timezone.includes('Halifax') ||
          timezone.includes('Montreal')) {
        return 'CAD'
      }
      // EUA (timezones americanos) ou default
      if (timezone.includes('New_York') || timezone.includes('Chicago') || 
          timezone.includes('Denver') || timezone.includes('Los_Angeles') ||
          timezone.includes('Detroit') || timezone.includes('Phoenix') ||
          timezone.includes('Seattle') || timezone.includes('Anchorage')) {
        return 'USD'
      }
      // Default para EN é USD (mais comum - EUA)
      return 'USD'
    }
    
    // ES = Espanhol = USD (prioridade Américas - México, América Central, EUA latino)
    return 'USD'
  } catch (error) {
    // Fallback: se detecção falhar, usar baseado no idioma
    if (lang === 'pt') return 'BRL'
    if (lang === 'fr') return 'CAD' // Prioridade Quebec
    return 'USD' // Default para EN e ES
  }
}

// Função para obter ranges de budget baseado na moeda
function getBudgetRanges(currency: 'BRL' | 'USD' | 'CAD', lang: Lang) {
  const selectLabel = lang === 'pt' ? 'Selecione...' : lang === 'es' ? 'Seleccione...' : lang === 'fr' ? 'Sélectionnez...' : 'Select...'
  const grantLabel = lang === 'pt' ? '💰 Preciso aplicar para grant/edital' : 
                     lang === 'es' ? '💰 Necesito solicitar subvención/edital' : 
                     lang === 'fr' ? '💰 Besoin de demander une subvention/appel' : 
                     '💰 Need to apply for grant/funding'
  const undefinedLabel = lang === 'pt' ? 'Ainda não defini' : 
                         lang === 'es' ? 'Aún no definido' : 
                         lang === 'fr' ? 'Pas encore défini' : 
                         'Not defined yet'

  if (currency === 'BRL') {
    return {
      '': selectLabel,
      '1k-5k': 'R$ 1k - R$ 5k',
      '5k-10k': 'R$ 5k - R$ 10k',
      '10k-25k': 'R$ 10k - R$ 25k',
      '25k-50k': 'R$ 25k - R$ 50k',
      '50k-100k': 'R$ 50k - R$ 100k',
      '100k-300k': 'R$ 100k - R$ 300k',
      '300k-500k': 'R$ 300k - R$ 500k',
      '500k-1m': 'R$ 500k - R$ 1M',
      '1m+': 'R$ 1M+',
      grant: grantLabel,
      indefinido: undefinedLabel
    }
  }

  if (currency === 'CAD') {
    return {
      '': selectLabel,
      '1k-5k': 'CAD $1k - $5k',
      '5k-10k': 'CAD $5k - $10k',
      '10k-25k': 'CAD $10k - $25k',
      '25k-50k': 'CAD $25k - $50k',
      '50k-100k': 'CAD $50k - $100k',
      '100k-300k': 'CAD $100k - $300k',
      '300k-500k': 'CAD $300k - $500k',
      '500k-1m': 'CAD $500k - $1M',
      '1m+': 'CAD $1M+',
      grant: grantLabel,
      indefinido: undefinedLabel
    }
  }

  // USD (default)
  return {
    '': selectLabel,
    '1k-5k': 'USD $1k - $5k',
    '5k-10k': 'USD $5k - $10k',
    '10k-25k': 'USD $10k - $25k',
    '25k-50k': 'USD $25k - $50k',
    '50k-100k': 'USD $50k - $100k',
    '100k-300k': 'USD $100k - $300k',
    '300k-500k': 'USD $300k - $500k',
    '500k-1m': 'USD $500k - $1M',
    '1m+': 'USD $1M+',
    grant: grantLabel,
    indefinido: undefinedLabel
  }
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
  <div className={`group w-full ${className}`}>
    <label 
      className={`block text-xs font-medium transition-all duration-200 flex items-center gap-1.5 uppercase tracking-wide ${
        error 
          ? 'text-red-400' 
          : 'opacity-80 group-focus-within:opacity-100 group-focus-within:text-azimut-red/90 text-white/75 group-hover:opacity-90 [data-theme="light"]:text-slate-700'
      }`} 
      style={{ 
        paddingLeft: '16px', 
        letterSpacing: '0.03em', 
        fontSize: '11px', 
        marginBottom: '6px', 
        lineHeight: '1.3',
        paddingBottom: '0',
        marginTop: '0',
        display: 'block',
        fontWeight: '500'
      }}
    >
      <span className="whitespace-nowrap">{label.replace(/:?\s*\*$/, '')}</span>
      {required && (
        <span className="text-azimut-red text-[10px] font-bold flex-shrink-0 ml-0.5" aria-label="obrigatório">*</span>
      )}
    </label>
    <div className="relative w-full">
      {children}
      {/* Mensagem de erro abaixo do campo */}
      {error && (
        <p className="mt-2.5 text-xs text-red-400/90 flex items-center gap-1.5 animate-fade-in-up" style={{ paddingLeft: '16px' }}>
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
  const navigate = useNavigate()
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
      organizationType: 'Você representa *',
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
      projectType: 'Tipo de Projeto *',
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
      budget: 'Budget Disponível *',
      budgetRanges: {}, // Será preenchido dinamicamente pela função getBudgetRanges
      timeline: 'Quando precisa estar pronto *',
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
      organizationType: 'You represent *',
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
      projectType: 'Project Type *',
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
      budget: 'Available Budget *',
      budgetRanges: {}, // Será preenchido dinamicamente pela função getBudgetRanges
      timeline: 'When do you need it ready *',
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
      organizationType: 'Usted representa *',
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
      projectType: 'Tipo de Proyecto *',
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
      budget: 'Presupuesto Disponible *',
      budgetRanges: {}, // Será preenchido dinamicamente pela função getBudgetRanges
      timeline: '¿Cuándo lo necesita listo *',
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
      organizationType: 'Vous représentez *',
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
      projectType: 'Type de Projet *',
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
      budget: 'Budget Disponible *',
      budgetRanges: {}, // Será preenchido dinamicamente pela função getBudgetRanges
      timeline: 'Quand en avez-vous besoin *',
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
  
  // Determinar moeda baseada no idioma/localização
  const currency = getCurrencyForLang(lang)
  const budgetRanges = getBudgetRanges(currency, lang)
  
  // Atualizar t.budgetRanges com os ranges corretos para a moeda
  const tWithCurrency = {
    ...t,
    budgetRanges
  }

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
      
      // Mapear nomes dos campos para exibição
      const fieldNames: Record<string, Record<string, string>> = {
        name: { pt: 'Nome completo', es: 'Nombre completo', fr: 'Nom complet', en: 'Full name' },
        email: { pt: 'Email', es: 'Email', fr: 'Email', en: 'Email' },
        company: { pt: 'Nome da Organização', es: 'Nombre de la Organización', fr: 'Nom de l\'Organisation', en: 'Organization Name' },
        organizationType: { pt: 'Você representa', es: 'Usted representa', fr: 'Vous représentez', en: 'You represent' },
        projectType: { pt: 'Tipo de Projeto', es: 'Tipo de Proyecto', fr: 'Type de Projet', en: 'Project Type' },
        budget: { pt: 'Budget Disponível', es: 'Presupuesto Disponible', fr: 'Budget Disponible', en: 'Available Budget' },
        timeline: { pt: 'Quando precisa estar pronto', es: 'Cuándo lo necesita listo', fr: 'Quand avez-vous besoin', en: 'When do you need it ready' },
        acceptContact: { pt: 'Aceitar receber contato', es: 'Aceptar recibir contacto', fr: 'Accepter de recevoir des contacts', en: 'Accept to be contacted' }
      }
      
      // Criar lista de campos faltantes
      const missingFields = Object.keys(errors).map(key => 
        fieldNames[key]?.[lang] || fieldNames[key]?.['en'] || key
      )
      
      const fieldList = missingFields.map(field => `• ${field}`).join('\n')
      
      const errorMessage = lang === 'pt' 
        ? `Por favor, preencha os seguintes campos obrigatórios:\n\n${fieldList}`
        : lang === 'es'
        ? `Por favor, complete los siguientes campos obligatorios:\n\n${fieldList}`
        : lang === 'fr'
        ? `Veuillez remplir les champs obligatoires suivants:\n\n${fieldList}`
        : `Please fill in the following required fields:\n\n${fieldList}`
      
      setError(errorMessage)
      return
    }

    // Limpar erros de campo se validação passou
    setFieldErrors({})

    try {
      await ApiService.submitLead(formData)

      // Enviar notificação por email
      try {
        await fetch(`${import.meta.env.VITE_CMS_API_URL || 'https://backoffice.azmt.com.br'}/api/notify-form`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            formType: 'contact_main',
            lang,
            score: 50 // Default médio, pode calcular depois
          })
        })
      } catch (emailError) {
        console.warn('Email notification failed (non-critical):', emailError)
      }

      setSuccess(true)
      setError('')
      setFieldErrors({})
      
      // Redirecionar para thank-you após 2 segundos
      setTimeout(() => {
        navigate(`/${lang}/thank-you`)
      }, 2000)
      
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
      
      // Mensagem de erro mais específica e útil
      let errorMsg = err?.message || ''
      
      // Traduzir mensagens comuns
      if (!errorMsg || errorMsg.includes('Failed to fetch') || errorMsg.includes('NetworkError') || errorMsg.includes('fetch')) {
        errorMsg = lang === 'pt' 
          ? 'Não foi possível conectar ao servidor no momento. Por favor, entre em contato diretamente por email: contact@azmt.com.br ou WhatsApp: +55 (48) 99970-1301'
          : lang === 'es'
          ? 'No se pudo conectar al servidor en este momento. Por favor, contáctenos directamente por email: contact@azmt.com.br o WhatsApp: +55 (48) 99970-1301'
          : lang === 'fr'
          ? 'Impossible de se connecter au serveur pour le moment. Veuillez nous contacter directement par email: contact@azmt.com.br ou WhatsApp: +55 (48) 99970-1301'
          : 'Could not connect to server at this time. Please contact us directly via email: contact@azmt.com.br or WhatsApp: +55 (48) 99970-1301'
      } else if (errorMsg.includes('timeout') || errorMsg.includes('Tempo') || errorMsg.includes('connection timeout')) {
        errorMsg = lang === 'pt'
          ? 'Tempo de conexão esgotado. Por favor, tente novamente.'
          : lang === 'es'
          ? 'Tiempo de conexión agotado. Por favor, intente nuevamente.'
          : lang === 'fr'
          ? 'Délai de connexion expiré. Veuillez réessayer.'
          : 'Connection timeout. Please try again.'
      } else if (errorMsg.includes('API não configurada')) {
        errorMsg = lang === 'pt'
          ? 'Sistema em manutenção. Por favor, entre em contato: contact@azmt.com.br'
          : lang === 'es'
          ? 'Sistema en mantenimiento. Por favor, contáctenos: contact@azmt.com.br'
          : lang === 'fr'
          ? 'Système en maintenance. Veuillez nous contacter: contact@azmt.com.br'
          : 'System maintenance. Please contact: contact@azmt.com.br'
      }
      
      // Se ainda não tiver mensagem, usar padrão
      if (!errorMsg) {
        errorMsg = t.errorMessage || (lang === 'pt' 
          ? 'Erro ao enviar. Por favor, tente novamente ou entre em contato: contact@azmt.com.br'
          : lang === 'es'
          ? 'Error al enviar. Por favor, intente nuevamente o contáctenos: contact@azmt.com.br'
          : lang === 'fr'
          ? 'Erreur lors de l\'envoi. Veuillez réessayer ou nous contacter: contact@azmt.com.br'
          : 'Error submitting. Please try again or contact: contact@azmt.com.br')
      }
      
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
    // Redireciona automaticamente, não mostra modal
    return null
  }

  return (
    <div className="relative">
      {/* Container usando card-adaptive (estilo original do site) */}
      <form onSubmit={handleSubmit} className="relative space-y-8 rounded-2xl border border-white/10 card-adaptive p-8 md:p-10 lg:p-12 shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur animate-fade-in-up overflow-hidden">
        {/* Glow effect sutil ao redor */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-azimut-red/10 via-azimut-red/5 to-azimut-red/10 rounded-2xl blur-xl opacity-50 pointer-events-none" />
        
        {/* Pattern sutil de fundo */}
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{ 
            backgroundImage: 'radial-gradient(#c92337 1px, transparent 1px)', 
            backgroundSize: '30px 30px' 
          }} 
        />

        {/* Conteúdo relativo */}
        <div className="relative z-10">
            {/* Header Premium com Logo */}
            <div className="text-center mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              {/* Logo Azimut */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <img 
                    src="/logo-azimut-star.svg" 
                    alt="Azimut" 
                    className="h-16 w-16 md:h-20 md:w-20 animate-fade-in-up opacity-90"
                    style={{ animationDelay: '0.15s' }}
                  />
                  {/* Glow sutil na logo */}
                  <div className="absolute inset-0 animate-pulse pointer-events-none">
                    <div className="h-full w-full rounded-full bg-azimut-red/10 blur-xl" />
                  </div>
                </div>
              </div>

              {/* Linha decorativa acima */}
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-azimut-red/50" />
                <div className="w-1.5 h-1.5 rounded-full bg-azimut-red/60" />
                <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-azimut-red/50" />
              </div>

              {/* Título */}
              <h2 className="font-handel text-3xl md:text-4xl lg:text-5xl uppercase tracking-[0.12em] mb-4 relative">
                <span className="relative inline-block">
                  {t.title}
                  {/* Glow sutil no título */}
                  <span className="absolute inset-0 opacity-20 blur-md pointer-events-none" style={{ color: '#c92337' }}>
                    {t.title}
                  </span>
                </span>
              </h2>
              
              {/* Subtítulo */}
              <p className="text-sm md:text-base opacity-75 max-w-xl mx-auto leading-relaxed">
                {t.subtitle}
              </p>

              {/* Linha decorativa abaixo */}
              <div className="flex items-center justify-center gap-3 mt-4">
                <div className="h-[1px] w-8 bg-gradient-to-r from-transparent to-azimut-red/30" />
                <div className="w-1 h-1 rounded-full bg-azimut-red/50" />
                <div className="h-[1px] w-8 bg-gradient-to-l from-transparent to-azimut-red/30" />
              </div>
            </div>

            {/* Sugestões IA - Premium */}
            {aiSuggestions && (formData.organizationType && formData.projectType) && (
              <div className="relative rounded-xl p-5 mb-8 animate-fade-in-up border border-azimut-red/20 bg-gradient-to-br from-azimut-red/10 via-azimut-red/5 to-transparent backdrop-blur-sm overflow-hidden">
                {/* Glow sutil */}
                <div className="absolute inset-0 bg-gradient-to-r from-azimut-red/5 to-transparent opacity-50 pointer-events-none" />
                
                <div className="relative flex items-start gap-4">
                  {/* Ícone IA Premium */}
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-azimut-red/20 flex items-center justify-center border border-azimut-red/30">
                      <svg className="w-6 h-6 text-azimut-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="font-semibold text-base flex items-center gap-2">
                        Sugestões Personalizadas
                        {aiSuggestions.aiEnabled && (
                          <span className="text-xs px-2 py-0.5 bg-azimut-red/30 border border-azimut-red/40 rounded-full text-azimut-red font-bold">
                            IA
                          </span>
                        )}
                      </h3>
                    </div>
                    
                    {aiSuggestions.message && (
                      <p className="text-sm opacity-90 leading-relaxed mb-4">
                        {aiSuggestions.message}
                      </p>
                    )}
                    
                    {aiSuggestions.projectSuggestions.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs font-semibold uppercase tracking-wider opacity-70 mb-2">
                          Projetos que podem interessar:
                        </p>
                        <ul className="space-y-2">
                          {aiSuggestions.projectSuggestions.map((s, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm opacity-90">
                              <span className="text-azimut-red mt-1.5 flex-shrink-0">•</span>
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {aiSuggestions.budgetSuggestion && (
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-azimut-red/10 border border-azimut-red/20">
                        <svg className="w-4 h-4 text-azimut-red mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                        <p className="text-sm opacity-90 leading-relaxed">
                          {aiSuggestions.budgetSuggestion}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Divisor visual */}
            <div className="my-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Personal Info - Grid 2 colunas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <PremiumField label={t.name} error={fieldErrors.name} required>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`relative z-10 input-adaptive w-full px-4 py-3.5 rounded-lg focus:ring-2 transition-all duration-300 group-hover:border-white/20 text-[15px] leading-normal ${
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
                  className={`relative z-10 input-adaptive w-full px-4 py-3.5 rounded-lg focus:ring-2 transition-all duration-300 group-hover:border-white/20 text-[15px] leading-normal ${
                    fieldErrors.email 
                      ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50' 
                      : 'focus:ring-azimut-red/50 focus:border-azimut-red/50'
                  }`}
                  placeholder="joao@example.com"
                />
              </PremiumField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4" style={{ marginTop: '1.5rem' }}>
              <PremiumField label={t.phone}>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="relative z-10 input-adaptive w-full px-4 py-3.5 rounded-lg focus:ring-2 focus:ring-azimut-red/50 focus:border-azimut-red/50 transition-all duration-300 group-hover:border-white/20 text-[15px] leading-normal"
                  placeholder="+55 11 98765-4321"
                />
              </PremiumField>

              <PremiumField label={t.position}>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="relative z-10 input-adaptive w-full px-4 py-3.5 rounded-lg focus:ring-2 focus:ring-azimut-red/50 focus:border-azimut-red/50 transition-all duration-300 group-hover:border-white/20 text-[15px] leading-normal"
                  placeholder="Diretor de Tecnologia"
                />
              </PremiumField>
            </div>

            {/* Organization */}
            <div style={{ marginTop: '1.5rem' }}>
              <PremiumField label={t.company} error={fieldErrors.company} required>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className={`relative z-10 input-adaptive w-full px-4 py-3.5 rounded-lg focus:ring-2 transition-all duration-300 group-hover:border-white/20 text-[15px] leading-normal ${
                    fieldErrors.company 
                      ? 'border-red-500/50 focus:ring-red-500/50 focus:border-red-500/50' 
                      : 'focus:ring-azimut-red/50 focus:border-azimut-red/50'
                  }`}
                  placeholder="Museu de Arte de São Paulo"
                />
              </PremiumField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4" style={{ marginTop: '1.5rem' }}>
              <PremiumField label={t.organizationType} error={fieldErrors.organizationType} required>
                <SelectField
                  value={formData.organizationType}
                  onChange={(v) => {
                    setFormData(prev => ({ ...prev, organizationType: v }))
                    if (fieldErrors.organizationType) {
                      setFieldErrors(prev => {
                        const newErrors = { ...prev }
                        delete newErrors.organizationType
                        return newErrors
                      })
                    }
                  }}
                  options={Object.entries(t.orgTypes).map(([value, label]) => ({ value, label }))}
                  placeholder={lang === 'pt' ? 'Selecione...' : lang === 'es' ? 'Seleccione...' : lang === 'fr' ? 'Sélectionnez...' : 'Select...'}
                  ariaLabel={t.organizationType}
                  className={fieldErrors.organizationType ? 'border-red-500/50' : ''}
                />
              </PremiumField>

              <PremiumField label={t.projectType} error={fieldErrors.projectType} required>
                <SelectField
                  value={formData.projectType}
                  onChange={(v) => {
                    setFormData(prev => ({ ...prev, projectType: v }))
                    if (fieldErrors.projectType) {
                      setFieldErrors(prev => {
                        const newErrors = { ...prev }
                        delete newErrors.projectType
                        return newErrors
                      })
                    }
                  }}
                  options={Object.entries(t.projectTypes).map(([value, label]) => ({ value, label }))}
                  placeholder={lang === 'pt' ? 'Selecione...' : lang === 'es' ? 'Seleccione...' : lang === 'fr' ? 'Sélectionnez...' : 'Select...'}
                  ariaLabel={t.projectType}
                  className={fieldErrors.projectType ? 'border-red-500/50' : ''}
                />
              </PremiumField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4" style={{ marginTop: '1.5rem' }}>
              <PremiumField label={t.budget} error={fieldErrors.budget} required>
                <SelectField
                  value={formData.budget}
                  onChange={(v) => {
                    setFormData(prev => ({ ...prev, budget: v }))
                    if (fieldErrors.budget) {
                      setFieldErrors(prev => {
                        const newErrors = { ...prev }
                        delete newErrors.budget
                        return newErrors
                      })
                    }
                  }}
                  options={Object.entries(tWithCurrency.budgetRanges).map(([value, label]) => ({ value, label }))}
                  placeholder={lang === 'pt' ? 'Selecione...' : lang === 'es' ? 'Seleccione...' : lang === 'fr' ? 'Sélectionnez...' : 'Select...'}
                  ariaLabel={t.budget}
                  className={fieldErrors.budget ? 'border-red-500/50' : ''}
                />
              </PremiumField>

              <PremiumField label={t.timeline} error={fieldErrors.timeline} required>
                <SelectField
                  value={formData.timeline}
                  onChange={(v) => {
                    setFormData(prev => ({ ...prev, timeline: v }))
                    if (fieldErrors.timeline) {
                      setFieldErrors(prev => {
                        const newErrors = { ...prev }
                        delete newErrors.timeline
                        return newErrors
                      })
                    }
                  }}
                  options={Object.entries(t.timelines).map(([value, label]) => ({ value, label }))}
                  placeholder={lang === 'pt' ? 'Selecione...' : lang === 'es' ? 'Seleccione...' : lang === 'fr' ? 'Sélectionnez...' : 'Select...'}
                  ariaLabel={t.timeline}
                  className={fieldErrors.timeline ? 'border-red-500/50' : ''}
                />
              </PremiumField>
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4" style={{ marginTop: '1.5rem' }}>
              <PremiumField label={t.country}>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  className="relative z-10 input-adaptive w-full px-4 py-3.5 rounded-lg focus:ring-2 focus:ring-azimut-red/50 focus:border-azimut-red/50 transition-all duration-300 group-hover:border-white/20 text-[15px] leading-normal"
                  placeholder="Brasil"
                />
              </PremiumField>

              <PremiumField label={t.city}>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="relative z-10 input-adaptive w-full px-4 py-3.5 rounded-lg focus:ring-2 focus:ring-azimut-red/50 focus:border-azimut-red/50 transition-all duration-300 group-hover:border-white/20 text-[15px] leading-normal"
                  placeholder="São Paulo"
                />
              </PremiumField>
            </div>

            {/* Description */}
            <div style={{ marginTop: '1.5rem' }}>
              <PremiumField label={t.description}>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={5}
                  className="relative z-10 input-adaptive w-full px-4 py-4 rounded-lg focus:ring-2 focus:ring-azimut-red/50 focus:border-azimut-red/50 transition-all duration-300 group-hover:border-white/20 resize-none text-[15px] leading-relaxed"
                  placeholder="Queremos criar uma instalação imersiva para nosso museu..."
                />
              </PremiumField>
            </div>

            {/* Divisor visual antes dos checkboxes */}
            <div className="my-6 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            {/* Checkboxes */}
            <div className="space-y-3" style={{ marginTop: '1rem' }}>
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
                <span className={`text-sm transition-colors leading-relaxed ${
                  fieldErrors.acceptContact 
                    ? 'text-red-400' 
                    : 'text-white/85 [data-theme="light"]:text-slate-700 group-hover:text-white'
                }`}>
                  <span>{t.acceptContact.replace(/\s*\*$/, '')}</span> <span className="text-red-400 flex-shrink-0">*</span>
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
                    <p className="text-sm text-red-200/90 [data-theme='light']:text-red-600 leading-relaxed whitespace-pre-line">
                      {error}
                    </p>
                    {/* Ação sugerida com contato direto */}
                    {error.includes('contato') || error.includes('contact') || error.includes('contacto') ? (
                      <div className="mt-3 pt-3 border-t border-red-500/30">
                        <p className="text-xs text-red-300/80 [data-theme='light']:text-red-500 mb-2">
                          {lang === 'pt' 
                            ? 'Ou entre em contato diretamente:'
                            : lang === 'es'
                            ? 'O contáctenos directamente:'
                            : lang === 'fr'
                            ? 'Ou contactez-nous directement:'
                            : 'Or contact us directly:'}
                        </p>
                        <div className="flex flex-col gap-1.5 text-xs">
                          <a 
                            href="mailto:contact@azmt.com.br" 
                            className="text-red-300 hover:text-red-200 underline [data-theme='light']:text-red-600 [data-theme='light']:hover:text-red-700"
                          >
                            📧 contact@azmt.com.br
                          </a>
                          <a 
                            href="https://wa.me/5548999701301" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-red-300 hover:text-red-200 underline [data-theme='light']:text-red-600 [data-theme='light']:hover:text-red-700"
                          >
                            📱 WhatsApp: +55 (48) 99970-1301
                          </a>
                        </div>
                      </div>
                    ) : (
                      <p className="text-xs text-red-300/70 [data-theme='light']:text-red-500 mt-2 italic">
                        {lang === 'pt' 
                          ? 'Por favor, verifique os campos obrigatórios e tente novamente.'
                          : lang === 'es'
                          ? 'Por favor, verifique los campos obligatorios e intente nuevamente.'
                          : lang === 'fr'
                          ? 'Veuillez vérifier les champs obligatoires et réessayer.'
                          : 'Please check required fields and try again.'}
                      </p>
                    )}
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
              className={`relative w-full px-8 py-4 rounded-lg font-handel text-lg uppercase tracking-[0.15em] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg transition-all duration-300 overflow-hidden group mt-8 ${
                error 
                  ? 'bg-red-600/80 hover:bg-red-600 border border-red-500/50' 
                  : 'bg-azimut-red hover:bg-azimut-red/90 text-white hover:shadow-xl hover:shadow-azimut-red/30'
              } ${!error ? 'text-white' : 'text-white'}`}
            >
              <span className="relative z-10 flex items-center justify-center gap-2.5">
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
                <>
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/25 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform -translate-x-full group-hover:translate-x-full" />
                  {/* Glow effect premium */}
                  <span className="absolute -inset-1 rounded-lg blur-md bg-azimut-red/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </>
              )}
              
              {/* Glow effect base */}
              <span className={`absolute -inset-0.5 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                error ? 'bg-red-500/50' : 'bg-azimut-red/40'
              }`} />
            </button>

            {/* Guarantees - Premium */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-white/10 mt-8">
              {Object.values(t.guarantees).map((guarantee, idx) => (
                <div 
                  key={idx} 
                  className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-azimut-red/20 transition-all duration-300 group"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <div className="w-5 h-5 rounded-full bg-azimut-red/20 flex items-center justify-center group-hover:bg-azimut-red/30 transition-colors">
                      <svg className="w-3 h-3 text-azimut-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-xs leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">
                    {guarantee}
                  </span>
                </div>
              ))}
            </div>
          </div>
      </form>
    </div>
  )
}
