// ════════════════════════════════════════════════════════════
// ACADEMY QUICK FORM - FORMULÁRIO SIMPLIFICADO
// ════════════════════════════════════════════════════════════
// Apenas 3 campos essenciais + opcionais
// Validação suave + Dropdown bonito
// ════════════════════════════════════════════════════════════

import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { type Lang } from '../i18n'
import ApiService from '../services/api'

// SelectField Component - Customizado (igual SmartContactForm)
interface SelectFieldProps {
  value: string
  onChange: (value: string) => void
  options: Array<{ value: string; label: string; icon?: string }>
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
  const currentIcon = options.find(o => o.value === value)?.icon

  return (
    <div className={`relative ${className}`} ref={ref}>
      <button
        type="button"
        aria-label={ariaLabel}
        className="select-trigger"
        onClick={() => setOpen(o => !o)}
      >
        <span className={value ? 'text-slate-100' : 'text-slate-400'}>
          {currentIcon && <span className="mr-2">{currentIcon}</span>}
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
              {opt.icon && <span className="mr-2">{opt.icon}</span>}
              {opt.label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

interface AcademyQuickFormProps {
  lang: Lang
  type: 'vancouver' | 'course' | 'workshop' | 'corporate'
  prefilledData?: Partial<FormData>
}

interface FormData {
  name: string
  contact: string // Email OU WhatsApp (usuário escolhe)
  school?: string // Para Vancouver
  courseArea?: string // Área de interesse (opcional)
  preferredLanguage?: Lang
  contactPreference?: 'email' | 'whatsapp' | 'call' | 'any'
  interest: string // Auto-preenchido
}

const AcademyQuickForm: React.FC<AcademyQuickFormProps> = ({ lang, type, prefilledData }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    contact: '',
    school: type === 'vancouver' ? 'undecided' : undefined,
    courseArea: '',
    preferredLanguage: lang,
    contactPreference: 'email',
    interest: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [contactWarning, setContactWarning] = useState<string | null>(null)

  useEffect(() => {
    // Buscar dados do Quiz/Recomendador no localStorage
    const quizData = localStorage.getItem('quizVancouverResult')
    const recommendationData = localStorage.getItem('courseRecommendation')
    
    let autoFilled: Partial<FormData> = {}

    if (quizData && type === 'vancouver') {
      try {
        const quiz = JSON.parse(quizData)
        autoFilled.interest = `Interessado em ${quiz.bestSchool} - ${quiz.area || 'Animação/VFX'}. Score: ${quiz.score}/100. Budget estimado: ${quiz.estimatedBudget}.`
      } catch (e) {
        console.warn('Erro ao parsear Quiz data')
      }
    }

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

    setFormData({
      ...formData,
      ...autoFilled,
      ...prefilledData
    })
  }, [type, prefilledData])

  // Cursos VFS e VanArts completos
  const courseOptions = {
    pt: [
      { value: '', label: 'Não quero especificar agora', icon: '✨' },
      // VanArts
      { value: 'vanarts-3d-animation', label: 'VanArts - Animação 3D', icon: '🎬' },
      { value: 'vanarts-visual-effects', label: 'VanArts - Efeitos Visuais (VFX)', icon: '💫' },
      { value: 'vanarts-game-art-design', label: 'VanArts - Game Art & Design', icon: '🎮' },
      { value: 'vanarts-character-animation', label: 'VanArts - Animação de Personagens', icon: '🦸' },
      { value: 'vanarts-digital-painting', label: 'VanArts - Pintura Digital', icon: '🎨' },
      // VFS
      { value: 'vfs-film-production', label: 'VFS - Produção Cinematográfica', icon: '🎥' },
      { value: 'vfs-3d-animation-vfx', label: 'VFS - Animação 3D & VFX', icon: '🌟' },
      { value: 'vfs-game-design', label: 'VFS - Game Design', icon: '🕹️' },
      { value: 'vfs-sound-design', label: 'VFS - Sound Design', icon: '🎵' },
      { value: 'vfs-acting', label: 'VFS - Atuação para Cinema/TV', icon: '🎭' },
      { value: 'vfs-writing', label: 'VFS - Writing para TV/Cinema', icon: '✍️' },
      { value: 'vfs-makeup-design', label: 'VFS - Makeup Design para Cinema', icon: '💄' },
      { value: 'vfs-programming', label: 'VFS - Programming para Jogos', icon: '💻' }
    ],
    en: [
      { value: '', label: 'I don\'t want to specify now', icon: '✨' },
      { value: 'vanarts-3d-animation', label: 'VanArts - 3D Animation', icon: '🎬' },
      { value: 'vanarts-visual-effects', label: 'VanArts - Visual Effects (VFX)', icon: '💫' },
      { value: 'vanarts-game-art-design', label: 'VanArts - Game Art & Design', icon: '🎮' },
      { value: 'vanarts-character-animation', label: 'VanArts - Character Animation', icon: '🦸' },
      { value: 'vanarts-digital-painting', label: 'VanArts - Digital Painting', icon: '🎨' },
      { value: 'vfs-film-production', label: 'VFS - Film Production', icon: '🎥' },
      { value: 'vfs-3d-animation-vfx', label: 'VFS - 3D Animation & VFX', icon: '🌟' },
      { value: 'vfs-game-design', label: 'VFS - Game Design', icon: '🕹️' },
      { value: 'vfs-sound-design', label: 'VFS - Sound Design', icon: '🎵' },
      { value: 'vfs-acting', label: 'VFS - Acting for Film/TV', icon: '🎭' },
      { value: 'vfs-writing', label: 'VFS - Writing for TV/Film', icon: '✍️' },
      { value: 'vfs-makeup-design', label: 'VFS - Makeup Design for Film', icon: '💄' },
      { value: 'vfs-programming', label: 'VFS - Programming for Games', icon: '💻' }
    ],
    es: [
      { value: '', label: 'No quiero especificar ahora', icon: '✨' },
      { value: 'vanarts-3d-animation', label: 'VanArts - Animación 3D', icon: '🎬' },
      { value: 'vanarts-visual-effects', label: 'VanArts - Efectos Visuales (VFX)', icon: '💫' },
      { value: 'vanarts-game-art-design', label: 'VanArts - Game Art & Design', icon: '🎮' },
      { value: 'vanarts-character-animation', label: 'VanArts - Animación de Personajes', icon: '🦸' },
      { value: 'vanarts-digital-painting', label: 'VanArts - Pintura Digital', icon: '🎨' },
      { value: 'vfs-film-production', label: 'VFS - Producción Cinematográfica', icon: '🎥' },
      { value: 'vfs-3d-animation-vfx', label: 'VFS - Animación 3D & VFX', icon: '🌟' },
      { value: 'vfs-game-design', label: 'VFS - Game Design', icon: '🕹️' },
      { value: 'vfs-sound-design', label: 'VFS - Sound Design', icon: '🎵' },
      { value: 'vfs-acting', label: 'VFS - Actuación para Cine/TV', icon: '🎭' },
      { value: 'vfs-writing', label: 'VFS - Escritura para TV/Cine', icon: '✍️' },
      { value: 'vfs-makeup-design', label: 'VFS - Makeup Design para Cine', icon: '💄' },
      { value: 'vfs-programming', label: 'VFS - Programación para Juegos', icon: '💻' }
    ],
    fr: [
      { value: '', label: 'Je ne veux pas spécifier maintenant', icon: '✨' },
      { value: 'vanarts-3d-animation', label: 'VanArts - Animation 3D', icon: '🎬' },
      { value: 'vanarts-visual-effects', label: 'VanArts - Effets Visuels (VFX)', icon: '💫' },
      { value: 'vanarts-game-art-design', label: 'VanArts - Game Art & Design', icon: '🎮' },
      { value: 'vanarts-character-animation', label: 'VanArts - Animation de Personnages', icon: '🦸' },
      { value: 'vanarts-digital-painting', label: 'VanArts - Peinture Numérique', icon: '🎨' },
      { value: 'vfs-film-production', label: 'VFS - Production Cinématographique', icon: '🎥' },
      { value: 'vfs-3d-animation-vfx', label: 'VFS - Animation 3D & VFX', icon: '🌟' },
      { value: 'vfs-game-design', label: 'VFS - Game Design', icon: '🕹️' },
      { value: 'vfs-sound-design', label: 'VFS - Sound Design', icon: '🎵' },
      { value: 'vfs-acting', label: 'VFS - Acting pour Film/TV', icon: '🎭' },
      { value: 'vfs-writing', label: 'VFS - Écriture pour TV/Film', icon: '✍️' },
      { value: 'vfs-makeup-design', label: 'VFS - Makeup Design pour Film', icon: '💄' },
      { value: 'vfs-programming', label: 'VFS - Programmation pour Jeux', icon: '💻' }
    ]
  }

  const content: Record<Lang, any> = {
    pt: {
      title: {
        vancouver: 'Quero estudar em Vancouver 🇨🇦',
        course: 'Quero fazer um curso 📚',
        workshop: 'Quero participar de um workshop 🎬',
        corporate: 'Quero um treinamento corporativo 🏢'
      },
      subtitle: 'Super rápido: só 3 campos obrigatórios!',
      fields: {
        name: 'Seu nome',
        contact: 'Email ou WhatsApp',
        school: 'Escola de interesse',
        courseArea: 'Área de interesse (opcional)',
        preferredLanguage: 'Idioma preferido para atendimento',
        contactPreference: 'Como prefere receber informações?'
      },
      schoolOptions: [
        { value: 'undecided', label: '🤔 Ainda não sei - Quero orientação FREE', icon: '💡' },
        { value: 'vanarts', label: 'VanArts (Animação, VFX, Game Design)', icon: '🎬' },
        { value: 'vfs', label: 'VFS (Cinema, Som, Atuação)', icon: '🎥' },
        { value: 'both', label: 'Ambas - Quero conhecer as duas', icon: '🌟' }
      ],
      languageOptions: [
        { value: 'pt', label: '🇧🇷 Português' },
        { value: 'en', label: '🇨🇦 English' },
        { value: 'es', label: '🇪🇸 Español' },
        { value: 'fr', label: '🇫🇷 Français' }
      ],
      contactPreferenceOptions: [
        { value: 'email', label: '📧 Email (sem ligação)', icon: '📧' },
        { value: 'whatsapp', label: '💬 WhatsApp', icon: '💬' },
        { value: 'call', label: '📞 Pode me ligar', icon: '📞' },
        { value: 'any', label: '🤝 Como for melhor', icon: '🤝' }
      ],
      placeholders: {
        name: 'Ex: João Silva',
        contact: 'joao@email.com ou +55 21 99999-9999'
      },
      freeConsultation: '💡 Não sabe qual escola escolher? Oferecemos orientação gratuita!',
      submit: 'Quero Receber Info!',
      submitting: 'Enviando...',
      required: 'Preenche seu nome e contato!',
      contactHint: '💡 Pode ser email ou WhatsApp, como preferir!',
      contactWarningEmail: '⚠️ Email parece incompleto (falta @). Mas se for WhatsApp, tudo certo!',
      contactWarningPhone: '💬 WhatsApp detectado! Se preferir, pode adicionar código do país (+55, +1, etc)'
    },
    en: {
      title: {
        vancouver: 'I wanna study in Vancouver 🇨🇦',
        course: 'I wanna take a course 📚',
        workshop: 'I wanna join a workshop 🎬',
        corporate: 'I want corporate training 🏢'
      },
      subtitle: 'Super quick: just 3 required fields!',
      fields: {
        name: 'Your name',
        contact: 'Email or WhatsApp',
        school: 'School of interest',
        courseArea: 'Area of interest (optional)',
        preferredLanguage: 'Preferred language for service',
        contactPreference: 'How do you prefer to be contacted?'
      },
      schoolOptions: [
        { value: 'undecided', label: '🤔 Not sure yet - I want FREE guidance', icon: '💡' },
        { value: 'vanarts', label: 'VanArts (Animation, VFX, Game Design)', icon: '🎬' },
        { value: 'vfs', label: 'VFS (Film, Sound, Acting)', icon: '🎥' },
        { value: 'both', label: 'Both - I want to know both', icon: '🌟' }
      ],
      languageOptions: [
        { value: 'pt', label: '🇧🇷 Português' },
        { value: 'en', label: '🇨🇦 English' },
        { value: 'es', label: '🇪🇸 Español' },
        { value: 'fr', label: '🇫🇷 Français' }
      ],
      contactPreferenceOptions: [
        { value: 'email', label: '📧 Email (no calls)', icon: '📧' },
        { value: 'whatsapp', label: '💬 WhatsApp', icon: '💬' },
        { value: 'call', label: '📞 Call me', icon: '📞' },
        { value: 'any', label: '🤝 Whatever works', icon: '🤝' }
      ],
      placeholders: {
        name: 'Ex: John Smith',
        contact: 'john@email.com or +1 555 1234'
      },
      freeConsultation: '💡 Not sure which school? We offer free guidance!',
      submit: 'Send Me Info!',
      submitting: 'Sending...',
      required: 'Fill your name and contact!',
      contactHint: '💡 Can be email or WhatsApp, whatever you prefer!',
      contactWarningEmail: '⚠️ Email seems incomplete (missing @). But if it\'s WhatsApp, all good!',
      contactWarningPhone: '💬 WhatsApp detected! If you want, you can add country code (+55, +1, etc)'
    },
    es: {
      title: {
        vancouver: 'Quiero estudiar en Vancouver 🇨🇦',
        course: 'Quiero hacer un curso 📚',
        workshop: 'Quiero participar en un taller 🎬',
        corporate: 'Quiero capacitación corporativa 🏢'
      },
      subtitle: '¡Super rápido: solo 3 campos obligatorios!',
      fields: {
        name: 'Tu nombre',
        contact: 'Email o WhatsApp',
        school: 'Escuela de interés',
        courseArea: 'Área de interés (opcional)',
        preferredLanguage: 'Idioma preferido para atención',
        contactPreference: '¿Cómo prefieres ser contactado?'
      },
      schoolOptions: [
        { value: 'undecided', label: '🤔 No estoy seguro - Quiero orientación GRATIS', icon: '💡' },
        { value: 'vanarts', label: 'VanArts (Animación, VFX, Game Design)', icon: '🎬' },
        { value: 'vfs', label: 'VFS (Cine, Sonido, Actuación)', icon: '🎥' },
        { value: 'both', label: 'Ambas - Quiero conocer las dos', icon: '🌟' }
      ],
      languageOptions: [
        { value: 'pt', label: '🇧🇷 Português' },
        { value: 'en', label: '🇨🇦 English' },
        { value: 'es', label: '🇪🇸 Español' },
        { value: 'fr', label: '🇫🇷 Français' }
      ],
      contactPreferenceOptions: [
        { value: 'email', label: '📧 Email (sin llamadas)', icon: '📧' },
        { value: 'whatsapp', label: '💬 WhatsApp', icon: '💬' },
        { value: 'call', label: '📞 Puedes llamarme', icon: '📞' },
        { value: 'any', label: '🤝 Como sea mejor', icon: '🤝' }
      ],
      placeholders: {
        name: 'Ej: Juan García',
        contact: 'juan@email.com o +34 600 123 456'
      },
      freeConsultation: '💡 ¿No sabes qué escuela elegir? ¡Ofrecemos orientación gratuita!',
      submit: '¡Quiero Recibir Info!',
      submitting: 'Enviando...',
      required: '¡Completa tu nombre y contacto!',
      contactHint: '💡 Puede ser email o WhatsApp, ¡como prefieras!',
      contactWarningEmail: '⚠️ Email parece incompleto (falta @). ¡Pero si es WhatsApp, todo bien!',
      contactWarningPhone: '💬 WhatsApp detectado! Si quieres, puedes agregar código de país (+55, +1, etc)'
    },
    fr: {
      title: {
        vancouver: 'Je veux étudier à Vancouver 🇨🇦',
        course: 'Je veux suivre un cours 📚',
        workshop: 'Je veux participer à un atelier 🎬',
        corporate: 'Je veux une formation entreprise 🏢'
      },
      subtitle: 'Super rapide: seulement 3 champs obligatoires!',
      fields: {
        name: 'Votre nom',
        contact: 'Email ou WhatsApp',
        school: 'École de intérêt',
        courseArea: 'Domaine d\'intérêt (optionnel)',
        preferredLanguage: 'Langue préférée pour le service',
        contactPreference: 'Comment préférez-vous être contacté?'
      },
      schoolOptions: [
        { value: 'undecided', label: '🤔 Pas encore sûr - Je veux des conseils GRATUITS', icon: '💡' },
        { value: 'vanarts', label: 'VanArts (Animation, VFX, Game Design)', icon: '🎬' },
        { value: 'vfs', label: 'VFS (Cinéma, Son, Acting)', icon: '🎥' },
        { value: 'both', label: 'Les deux - Je veux connaître les deux', icon: '🌟' }
      ],
      languageOptions: [
        { value: 'pt', label: '🇧🇷 Português' },
        { value: 'en', label: '🇨🇦 English' },
        { value: 'es', label: '🇪🇸 Español' },
        { value: 'fr', label: '🇫🇷 Français' }
      ],
      contactPreferenceOptions: [
        { value: 'email', label: '📧 Email (pas de appels)', icon: '📧' },
        { value: 'whatsapp', label: '💬 WhatsApp', icon: '💬' },
        { value: 'call', label: '📞 Appelez-moi', icon: '📞' },
        { value: 'any', label: '🤝 Comme vous voulez', icon: '🤝' }
      ],
      placeholders: {
        name: 'Ex: Marie Dupont',
        contact: 'marie@email.com ou +33 6 12 34 56 78'
      },
      freeConsultation: '💡 Vous ne savez pas quelle école choisir? Nous offrons des conseils gratuits!',
      submit: 'Envoyer Info!',
      submitting: 'Envoi...',
      required: 'Remplissez votre nom et contact!',
      contactHint: '💡 Peut être email ou WhatsApp, comme vous préférez!',
      contactWarningEmail: '⚠️ Email semble incomplet (manque @). Mais si c\'est WhatsApp, tout va bien!',
      contactWarningPhone: '💬 WhatsApp détecté! Si vous voulez, vous pouvez ajouter le code pays (+55, +1, etc)'
    }
  }

  const t = content[lang] || content.pt

  // Validação suave do contato
  const validateContact = (value: string) => {
    if (!value) {
      setContactWarning(null)
      return
    }

    // Se tem @ mas não parece email válido
    if (value.includes('@') && !value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setContactWarning(t.contactWarningEmail)
    }
    // Se parece número mas não tem código país
    else if (value.match(/^\d/) && !value.match(/^\+/)) {
      setContactWarning(t.contactWarningPhone)
    }
    else {
      setContactWarning(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validação mínima: só nome e contato
    if (!formData.name || !formData.contact) {
      setError(t.required)
      return
    }

    setLoading(true)
    setError(null)

    try {
      const isEmail = formData.contact.includes('@')
      const schoolLabel = formData.school ? t.schoolOptions.find(s => s.value === formData.school)?.label : ''
      const courseLabel = formData.courseArea ? courseOptions[lang].find(c => c.value === formData.courseArea)?.label : ''
      const langLabel = formData.preferredLanguage ? t.languageOptions.find(l => l.value === formData.preferredLanguage)?.label : ''
      const contactPrefLabel = formData.contactPreference ? t.contactPreferenceOptions.find(c => c.value === formData.contactPreference)?.label : ''
      
      const leadData = {
        name: formData.name,
        email: isEmail ? formData.contact : undefined,
        phone: !isEmail ? formData.contact : undefined,
        leadType: type === 'vancouver' ? 'VANCOUVER' : 'CONTACT_FORM',
        description: [
          formData.interest,
          schoolLabel ? `Escola: ${schoolLabel}` : '',
          courseLabel ? `Curso de interesse: ${courseLabel}` : '',
          langLabel ? `Idioma preferido: ${langLabel}` : '',
          contactPrefLabel ? `⚠️ Preferência de contato: ${contactPrefLabel}` : ''
        ].filter(Boolean).join('\n'),
        sourceUrl: window.location.href,
        utmSource: new URLSearchParams(window.location.search).get('utm_source') || undefined,
        utmMedium: new URLSearchParams(window.location.search).get('utm_medium') || undefined,
        utmCampaign: new URLSearchParams(window.location.search).get('utm_campaign') || undefined
      }

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
      
      localStorage.removeItem('quizVancouverResult')
      localStorage.removeItem('courseRecommendation')

      setFormData({
        name: '',
        contact: '',
        school: type === 'vancouver' ? 'undecided' : undefined,
        courseArea: '',
        preferredLanguage: lang,
        contactPreference: 'email',
        interest: ''
      })
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
              onChange={(e) => {
                setFormData({ ...formData, contact: e.target.value })
                validateContact(e.target.value)
              }}
              className="input-adaptive w-full"
              required
              placeholder={t.placeholders.contact}
            />
            <p className="mt-2 text-xs text-white/50">
              {t.contactHint}
            </p>
            {contactWarning && (
              <p className="mt-2 text-xs text-yellow-400">
                {contactWarning}
              </p>
            )}
          </div>

          {/* School Dropdown (Vancouver only) */}
          {type === 'vancouver' && (
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2 uppercase tracking-wider">
                {t.fields.school} *
              </label>
              <SelectField
                value={formData.school || 'undecided'}
                onChange={(value) => setFormData({ ...formData, school: value })}
                options={t.schoolOptions}
                placeholder="Selecione..."
                ariaLabel={t.fields.school}
              />
              
              {formData.school === 'undecided' && (
                <div className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <p className="text-sm text-yellow-400">
                    {t.freeConsultation}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Course Area (Opcional - todos os cursos VFS e VanArts) */}
          <div>
            <label className="block text-sm font-semibold text-white/90 mb-2 uppercase tracking-wider">
              {t.fields.courseArea}
            </label>
            <SelectField
              value={formData.courseArea || ''}
              onChange={(value) => setFormData({ ...formData, courseArea: value })}
              options={courseOptions[lang]}
              placeholder="Selecione se quiser..."
              ariaLabel={t.fields.courseArea}
            />
          </div>

          {/* Preferred Language */}
          <div>
            <label className="block text-sm font-semibold text-white/90 mb-2 uppercase tracking-wider">
              {t.fields.preferredLanguage}
            </label>
            <SelectField
              value={formData.preferredLanguage || lang}
              onChange={(value) => setFormData({ ...formData, preferredLanguage: value as Lang })}
              options={t.languageOptions}
              placeholder="Selecione..."
              ariaLabel={t.fields.preferredLanguage}
            />
          </div>

          {/* Contact Preference */}
          <div>
            <label className="block text-sm font-semibold text-white/90 mb-2 uppercase tracking-wider">
              {t.fields.contactPreference} *
            </label>
            <SelectField
              value={formData.contactPreference || 'email'}
              onChange={(value) => setFormData({ ...formData, contactPreference: value as any })}
              options={t.contactPreferenceOptions}
              placeholder="Selecione..."
              ariaLabel={t.fields.contactPreference}
            />
          </div>

          {/* Interest (auto-filled - read-only display) */}
          {formData.interest && (
            <div>
              <label className="block text-sm font-semibold text-white/90 mb-2 uppercase tracking-wider">
                🤖 IA detectou:
              </label>
              <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <p className="text-white/80 text-sm">
                  {formData.interest}
                </p>
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
