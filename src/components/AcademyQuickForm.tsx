// ════════════════════════════════════════════════════════════
// ACADEMY QUICK FORM - FORMULÁRIO SIMPLIFICADO
// ════════════════════════════════════════════════════════════
// Email + Telefone separados + Geolocalização automática
// ════════════════════════════════════════════════════════════

import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { type Lang } from '../i18n'
import ApiService from '../services/api'
import CanadaMapleLeaf from './CanadaMapleLeaf'
import { useFormTracking } from '../hooks/useFormTracking'
import { logger } from '@/utils/logger'

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
        style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
        onClick={() => setOpen(o => !o)}
      >
        <span className={value ? 'text-slate-100' : 'text-slate-400'} style={{ whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '4px' }}>
          {currentIcon && <span>{currentIcon}</span>}
          <span>{currentLabel}</span>
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
  email: string // Email separado
  countryCode: string // Código do país (+55, +1, etc)
  phone: string // Telefone sem código
  school?: string
  courseArea?: string
  preferredLanguage?: Lang
  contactPreference?: 'email' | 'whatsapp' | 'call' | 'any'
  interest: string
  wantsNewsletter: boolean // 🆕 Checkbox newsletter
}

const AcademyQuickForm: React.FC<AcademyQuickFormProps> = ({ lang, type, prefilledData }) => {
  const navigate = useNavigate()
  const { formRef } = useFormTracking({
    formId: 'academy-quick-form',
    formName: 'Academy Quick Form',
    enabled: true
  })
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    countryCode: '+1', // Default
    phone: '',
    school: type === 'vancouver' ? 'undecided' : undefined,
    courseArea: '',
    preferredLanguage: 'pt', // 🇧🇷 Padrão Português (maioria dos alunos são brasileiros)
    contactPreference: 'email',
    interest: '',
    wantsNewsletter: false // 🆕 Checkbox newsletter
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [customCodeMode, setCustomCodeMode] = useState(false) // Modo código personalizado
  const [customCode, setCustomCode] = useState('') // Código customizado digitado

  // Detectar geolocalização e configurar código de país AUTOMATICAMENTE
  useEffect(() => {
    const detectCountry = async () => {
      try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
        
        let detectedCode = '+55' // Default: Brasil (maioria Academy)
        
        // Detecção por timezone
        if (timezone.includes('America/Sao_Paulo') || 
            timezone.includes('America/Fortaleza') ||
            timezone.includes('America/Recife') ||
            timezone.includes('America/Manaus') ||
            timezone.includes('Brazil')) {
          detectedCode = '+55' // Brasil
        } else if (timezone.includes('America/Toronto') || 
                   timezone.includes('America/Vancouver') ||
                   timezone.includes('America/Montreal')) {
          detectedCode = '+1' // Canadá
        } else if (timezone.includes('America/New_York') || 
                   timezone.includes('America/Los_Angeles') ||
                   timezone.includes('America/Chicago')) {
          detectedCode = '+1' // EUA
        } else if (timezone.includes('Europe/Madrid') || 
                   timezone.includes('Europe/Barcelona')) {
          detectedCode = '+34' // Espanha
        } else if (timezone.includes('Europe/Paris')) {
          detectedCode = '+33' // França
        } else if (timezone.includes('Europe/Lisbon')) {
          detectedCode = '+351' // Portugal
        } else if (timezone.includes('America/Mexico')) {
          detectedCode = '+52' // México
        } else if (timezone.includes('America/Argentina')) {
          detectedCode = '+54' // Argentina
        }
        
        setFormData(prev => ({ ...prev, countryCode: detectedCode }))
      } catch (error) {
        console.warn('Could not detect country:', error)
      }
    }

    detectCountry()
  }, [])

  // Auto-preencher dados do Quiz
  useEffect(() => {
    const quizData = localStorage.getItem('quizVancouverResult')
    const recommendationData = localStorage.getItem('courseRecommendation')
    
    let autoFilled: Partial<FormData> = {}

    if (quizData && type === 'vancouver') {
      try {
        const quiz = JSON.parse(quizData)
        autoFilled.interest = `Interessado em ${quiz.bestSchool} - ${quiz.area || 'Animação/VFX'}. Score: ${quiz.score}/100.`
      } catch (e) {
        logger.warn('Erro ao parsear Quiz data')
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
        logger.warn('Erro ao parsear Recommendation data')
      }
    }

    setFormData(prev => ({
      ...prev,
      ...autoFilled,
      ...prefilledData
    }))
  }, [type, prefilledData])

  // Função para formatar telefone com código de área
  const formatPhoneWithAreaCode = (value: string, countryCode: string): string => {
    const numbers = value.replace(/\D/g, '')
    
    if (countryCode === '+55') {
      if (numbers.length <= 2) return numbers
      if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
      if (numbers.length <= 10) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
    }
    
    if (countryCode === '+1') {
      if (numbers.length <= 3) return numbers
      if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`
    }
    
    if (countryCode === '+34') {
      if (numbers.length <= 3) return numbers
      if (numbers.length <= 5) return `${numbers.slice(0, 3)} ${numbers.slice(3)}`
      if (numbers.length <= 7) return `${numbers.slice(0, 3)} ${numbers.slice(3, 5)} ${numbers.slice(5)}`
      return `${numbers.slice(0, 3)} ${numbers.slice(3, 5)} ${numbers.slice(5, 7)} ${numbers.slice(7, 9)}`
    }
    
    if (countryCode === '+33') {
      if (numbers.length <= 2) return numbers
      if (numbers.length <= 4) return `${numbers.slice(0, 2)} ${numbers.slice(2)}`
      if (numbers.length <= 6) return `${numbers.slice(0, 2)} ${numbers.slice(2, 4)} ${numbers.slice(4)}`
      if (numbers.length <= 8) return `${numbers.slice(0, 2)} ${numbers.slice(2, 4)} ${numbers.slice(4, 6)} ${numbers.slice(6)}`
      return `${numbers.slice(0, 2)} ${numbers.slice(2, 4)} ${numbers.slice(4, 6)} ${numbers.slice(6, 8)} ${numbers.slice(8, 10)}`
    }
    
    if (countryCode === '+351') {
      if (numbers.length <= 3) return numbers
      if (numbers.length <= 6) return `${numbers.slice(0, 3)} ${numbers.slice(3)}`
      return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6, 9)}`
    }
    
    if (countryCode === '+52') {
      if (numbers.length <= 3) return numbers
      if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)} ${numbers.slice(6, 10)}`
    }
    
    if (countryCode === '+54') {
      if (numbers.length <= 3) return numbers
      if (numbers.length <= 7) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`
      return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`
    }
    
    return numbers
  }

  // Códigos de país
  const countryCodes = [
    { value: '+1', label: 'CA +1', icon: '' },
    { value: '+55', label: 'BR +55', icon: '' },
    { value: '+34', label: 'ES +34', icon: '' },
    { value: '+33', label: 'FR +33', icon: '' },
    { value: '+351', label: 'PT +351', icon: '' },
    { value: '+52', label: 'MX +52', icon: '' },
    { value: '+54', label: 'AR +54', icon: '' },
    { value: '+56', label: 'CL +56', icon: '' },
    { value: '+44', label: 'UK +44', icon: '' },
    { value: '+49', label: 'DE +49', icon: '' },
  ]

  // Cursos VFS e VanArts
  const courseOptions = {
    pt: [
      { value: '', label: 'Não quero especificar agora', icon: '✨' },
      { value: 'vanarts-3d-animation', label: 'VanArts - Animação 3D', icon: '🎬' },
      { value: 'vanarts-visual-effects', label: 'VanArts - Efeitos Visuais (VFX)', icon: '💫' },
      { value: 'vanarts-game-art-design', label: 'VanArts - Game Art & Design', icon: '🎮' },
      { value: 'vanarts-character-animation', label: 'VanArts - Animação de Personagens', icon: '🦸' },
      { value: 'vanarts-digital-painting', label: 'VanArts - Pintura Digital', icon: '🎨' },
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
      { value: 'vfs-film-production', label: 'VFS - Film Production', icon: '🎥' },
      { value: 'vfs-game-design', label: 'VFS - Game Design', icon: '🕹️' },
      { value: 'vfs-sound-design', label: 'VFS - Sound Design', icon: '🎵' },
      { value: 'vfs-acting', label: 'VFS - Acting for Film/TV', icon: '🎭' }
    ],
    es: [
      { value: '', label: 'No quiero especificar ahora', icon: '✨' },
      { value: 'vanarts-3d-animation', label: 'VanArts - Animación 3D', icon: '🎬' },
      { value: 'vfs-film-production', label: 'VFS - Producción Cinematográfica', icon: '🎥' },
    ],
    fr: [
      { value: '', label: 'Je ne veux pas spécifier maintenant', icon: '✨' },
      { value: 'vanarts-3d-animation', label: 'VanArts - Animation 3D', icon: '🎬' },
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
      subtitle: 'Preencha seus dados e te enviamos tudo!',
      fields: {
        name: 'Seu nome',
        email: 'Email',
        phone: 'WhatsApp/Telefone (opcional)',
        school: 'Escola de interesse',
        courseArea: 'Área de interesse (opcional)',
        preferredLanguage: 'Idioma preferido',
        contactPreference: 'Como prefere ser contatado?'
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
        { value: 'email', label: '📧 Email', icon: '' },
        { value: 'whatsapp', label: '💬 WhatsApp', icon: '' },
        { value: 'call', label: '📞 Ligação', icon: '' },
        { value: 'any', label: '🤝 Qualquer um', icon: '' }
      ],
      placeholders: {
        name: 'Ex: João Silva',
        email: 'joao@email.com',
        phone: '21 99999-9999'
      },
      newsletter: 'Quero receber novidades e informações por email',
      submit: 'Quero Receber Info!',
      submitting: 'Enviando...',
      required: 'Preencha pelo menos nome e email OU telefone!',
      emailOrPhone: '💡 Pelo menos email OU telefone é necessário'
    },
    // Outros idiomas simplificados...
    en: {
      title: {
        vancouver: 'I wanna study in Vancouver 🇨🇦',
        course: 'I wanna take a course 📚',
        workshop: 'I wanna join a workshop 🎬',
        corporate: 'I want corporate training 🏢'
      },
      subtitle: 'Fill your data and we\'ll send you everything!',
      fields: {
        name: 'Your name',
        email: 'Email',
        phone: 'WhatsApp/Phone (optional)',
        school: 'School of interest',
        courseArea: 'Area of interest (optional)',
        preferredLanguage: 'Preferred language',
        contactPreference: 'How do you prefer to be contacted?'
      },
      schoolOptions: [
        { value: 'undecided', label: '🤔 Not sure yet - I want FREE guidance', icon: '💡' },
        { value: 'vanarts', label: 'VanArts (Animation, VFX, Game Design)', icon: '🎬' },
        { value: 'vfs', label: 'VFS (Film, Sound, Acting)', icon: '🎥' },
        { value: 'both', label: 'Both', icon: '🌟' }
      ],
      languageOptions: [
        { value: 'pt', label: '🇧🇷 Português' },
        { value: 'en', label: '🇨🇦 English' },
        { value: 'es', label: '🇪🇸 Español' },
        { value: 'fr', label: '🇫🇷 Français' }
      ],
      contactPreferenceOptions: [
        { value: 'email', label: '📧 Email', icon: '' },
        { value: 'whatsapp', label: '💬 WhatsApp', icon: '' },
        { value: 'call', label: '📞 Call', icon: '' },
        { value: 'any', label: '🤝 Any', icon: '' }
      ],
      placeholders: {
        name: 'Ex: John Smith',
        email: 'john@email.com',
        phone: '555 1234'
      },
      newsletter: 'I want to receive news and updates by email',
      submit: 'Send Me Info!',
      submitting: 'Sending...',
      required: 'Fill at least name and email OR phone!',
      emailOrPhone: '💡 At least email OR phone is required'
    },
    es: {
      title: {
        vancouver: 'Quiero estudiar en Vancouver 🇨🇦',
        course: 'Quiero hacer un curso 📚',
        workshop: 'Quiero participar en un taller 🎬',
        corporate: 'Quiero capacitación corporativa 🏢'
      },
      subtitle: '¡Completa tus datos y te enviamos todo!',
      fields: {
        name: 'Tu nombre',
        email: 'Email',
        phone: 'WhatsApp/Teléfono (opcional)',
        school: 'Escuela de interés',
        courseArea: 'Área de interés (opcional)',
        preferredLanguage: 'Idioma preferido',
        contactPreference: '¿Cómo prefieres ser contactado?'
      },
      schoolOptions: [
        { value: 'undecided', label: '🤔 No estoy seguro', icon: '💡' },
        { value: 'vanarts', label: 'VanArts', icon: '🎬' },
        { value: 'vfs', label: 'VFS', icon: '🎥' },
        { value: 'both', label: 'Ambas', icon: '🌟' }
      ],
      languageOptions: [
        { value: 'pt', label: '🇧🇷 Português' },
        { value: 'en', label: '🇨🇦 English' },
        { value: 'es', label: '🇪🇸 Español' },
        { value: 'fr', label: '🇫🇷 Français' }
      ],
      contactPreferenceOptions: [
        { value: 'email', label: '📧 Email', icon: '' },
        { value: 'whatsapp', label: '💬 WhatsApp', icon: '' },
        { value: 'call', label: '📞 Llamada', icon: '' },
        { value: 'any', label: '🤝 Cualquiera', icon: '' }
      ],
      placeholders: {
        name: 'Ej: Juan García',
        email: 'juan@email.com',
        phone: '600 123 456'
      },
      newsletter: 'Quiero recibir noticias y novedades por email',
      submit: '¡Quiero Info!',
      submitting: 'Enviando...',
      required: '¡Completa al menos nombre y email O teléfono!',
      emailOrPhone: '💡 Se requiere al menos email O teléfono'
    },
    fr: {
      title: {
        vancouver: 'Je veux étudier à Vancouver 🇨🇦',
        course: 'Je veux suivre un cours 📚',
        workshop: 'Je veux participer à un atelier 🎬',
        corporate: 'Je veux une formation entreprise 🏢'
      },
      subtitle: 'Remplissez vos données et nous vous envoyons tout!',
      fields: {
        name: 'Votre nom',
        email: 'Email',
        phone: 'WhatsApp/Téléphone (optionnel)',
        school: 'École de intérêt',
        courseArea: 'Domaine d\'intérêt (optionnel)',
        preferredLanguage: 'Langue préférée',
        contactPreference: 'Comment préférez-vous être contacté?'
      },
      schoolOptions: [
        { value: 'undecided', label: '🤔 Pas encore sûr', icon: '💡' },
        { value: 'vanarts', label: 'VanArts', icon: '🎬' },
        { value: 'vfs', label: 'VFS', icon: '🎥' },
        { value: 'both', label: 'Les deux', icon: '🌟' }
      ],
      languageOptions: [
        { value: 'pt', label: '🇧🇷 Português' },
        { value: 'en', label: '🇨🇦 English' },
        { value: 'es', label: '🇪🇸 Español' },
        { value: 'fr', label: '🇫🇷 Français' }
      ],
      contactPreferenceOptions: [
        { value: 'email', label: '📧 Email', icon: '' },
        { value: 'whatsapp', label: '💬 WhatsApp', icon: '' },
        { value: 'call', label: '📞 Appel', icon: '' },
        { value: 'any', label: '🤝 N\'importe', icon: '' }
      ],
      placeholders: {
        name: 'Ex: Marie Dupont',
        email: 'marie@email.com',
        phone: '6 12 34 56 78'
      },
      newsletter: 'Je veux recevoir des nouvelles et mises à jour par email',
      submit: 'Envoyer Info!',
      submitting: 'Envoi...',
      required: 'Remplissez au moins nom et email OU téléphone!',
      emailOrPhone: '💡 Au moins email OU téléphone est requis'
    }
  }

  const t = content[lang] || content.pt

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validação: Nome obrigatório
    if (!formData.name) {
      setError(lang === 'pt' ? 'Por favor, preencha seu nome.' : lang === 'es' ? 'Por favor, complete su nombre.' : lang === 'fr' ? 'Veuillez remplir votre nom.' : 'Please fill in your name.')
      return
    }

    // 🆕 VALIDAÇÃO CRUZADA INTELIGENTE baseada em preferência de contato
    const hasEmail = formData.email && formData.email.trim()
    const hasPhone = formData.phone && formData.phone.replace(/\D/g, '').length >= 8

    // Se pediu contato por EMAIL mas não forneceu email
    if (formData.contactPreference === 'email' && !hasEmail) {
      setError(lang === 'pt' ? 'Você solicitou contato por email, mas não forneceu seu email. Por favor, preencha o email ou mude a preferência de contato.' : 
               lang === 'en' ? 'You requested email contact, but didn\'t provide your email. Please fill in email or change contact preference.' :
               lang === 'es' ? 'Solicitaste contacto por correo, pero no proporcionaste tu email. Por favor, completa el email o cambia la preferencia.' :
               'Vous avez demandé un contact par email, mais n\'avez pas fourni votre email.')
      return
    }

    // Se pediu contato por CALL mas não forneceu telefone
    if (formData.contactPreference === 'call' && !hasPhone) {
      setError(lang === 'pt' ? 'Você solicitou contato por telefone, mas não forneceu seu número. Por favor, preencha o telefone ou mude a preferência de contato.' : 
               lang === 'en' ? 'You requested phone contact, but didn\'t provide your number. Please fill in phone or change preference.' :
               lang === 'es' ? 'Solicitaste contacto por teléfono, pero no proporcionaste tu número. Por favor, completa el teléfono.' :
               'Vous avez demandé un contact par téléphone, mais n\'avez pas fourni votre numéro.')
      return
    }

    // Se marcou "Any" (qualquer), precisa de pelo menos um
    if (formData.contactPreference === 'any' && !hasEmail && !hasPhone) {
      setError(lang === 'pt' ? 'Por favor, forneça pelo menos email OU telefone.' : 
               lang === 'es' ? 'Por favor, proporcione al menos email O teléfono.' :
               lang === 'fr' ? 'Veuillez fournir au moins email OU téléphone.' :
               'Please provide at least email OR phone.')
      return
    }

    // Validar formato de email se fornecido
    if (hasEmail && !formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError(lang === 'pt' ? 'Por favor, forneça um email válido (exemplo: seu@email.com).' : 
               lang === 'es' ? 'Por favor, proporcione un correo electrónico válido (ejemplo: su@correo.com).' :
               lang === 'fr' ? 'Veuillez fournir un email valide (exemple: votre@email.com).' :
               'Please provide a valid email (example: your@email.com).')
      return
    }

    // Validar telefone se fornecido
    if (formData.phone && formData.phone.replace(/\D/g, '').length > 0 && formData.phone.replace(/\D/g, '').length < 8) {
      setError(lang === 'pt' ? 'O número de telefone parece incompleto. Por favor, verifique.' : 
               lang === 'es' ? 'El número de teléfono parece incompleto. Por favor, verifique.' :
               lang === 'fr' ? 'Le numéro de téléphone semble incomplet. Veuillez vérifier.' :
               'The phone number seems incomplete. Please check.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      // Combinar countryCode + phone (remover formatação, só números)
      const phoneNumbers = formData.phone.replace(/\D/g, '')
      const fullPhone = phoneNumbers ? `${formData.countryCode}${phoneNumbers}` : undefined
      const schoolLabel = formData.school ? t.schoolOptions.find(s => s.value === formData.school)?.label : ''
      const courseLabel = formData.courseArea ? courseOptions[lang].find(c => c.value === formData.courseArea)?.label : ''
      
      const leadData = {
        name: formData.name,
        email: formData.email || undefined,
        phone: fullPhone,
        leadType: type === 'vancouver' ? 'VANCOUVER' : 'CONTACT_FORM',
        description: [
          formData.interest,
          schoolLabel ? `Escola: ${schoolLabel}` : '',
          courseLabel ? `Curso: ${courseLabel}` : '',
          `Idioma preferido: ${formData.preferredLanguage}`,
          `Contato preferido: ${formData.contactPreference}`
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

      // 🆕 Se marcou newsletter, criar NewsletterSubscriber
      if (formData.wantsNewsletter && formData.email) {
        const backofficeUrl = import.meta.env.VITE_CMS_API_URL || 'https://backoffice.azmt.com.br'
        try {
          await fetch(`${backofficeUrl}/api/public/newsletter`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: formData.email,
              name: formData.name,
              lang: formData.preferredLanguage || lang,
              source: type === 'vancouver' ? 'vancouver_form' : 'academy_form'
            })
          })
        } catch (newsletterError) {
          logger.warn('Newsletter subscription failed (non-critical):', newsletterError)
        }
      }

      setSuccess(true)
      
      setTimeout(() => {
        navigate(`/${lang}/thank-you`)
      }, 2000)
      
      localStorage.removeItem('quizVancouverResult')
      localStorage.removeItem('courseRecommendation')

      setFormData({
        name: '',
        email: '',
        countryCode: '+1',
        phone: '',
        school: type === 'vancouver' ? 'undecided' : undefined,
        courseArea: '',
        preferredLanguage: lang,
        contactPreference: 'email',
        interest: '',
        wantsNewsletter: false
      })
    } catch (err: any) {
      logger.error(err instanceof Error ? err : new Error(String(err)), { 
        action: 'submitAcademyQuickForm',
        formType: 'academy_quick'
      })
      setError(err.message || 'Erro ao enviar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card-adaptive rounded-2xl p-8 md:p-10 border border-white/10">
      <div className="text-center mb-8">
        <div className="inline-block px-6 py-2 bg-azimut-red/20 border border-azimut-red/40 rounded-full mb-4">
          <span className="text-azimut-red text-sm font-semibold uppercase inline-flex items-center gap-1">
            {type === 'vancouver' ? <CanadaMapleLeaf size="sm" /> : type === 'course' ? '📚' : type === 'workshop' ? '🎬' : '🏢'} Formulário Rápido
          </span>
        </div>
        
        <h3 className="text-3xl md:text-4xl font-handel uppercase tracking-wider text-white mb-3">
          {t.title[type]}
        </h3>
        
        <p className="text-lg text-white/70">
          {t.subtitle}
        </p>
      </div>

      {success && null}

      {!success && (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
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
              placeholder={t.placeholders.email}
            />
          </div>

          {/* Phone (Country Code + Number) */}
          <div>
            <label className="block text-sm font-semibold text-white/90 mb-2 uppercase tracking-wider">
              {t.fields.phone}
            </label>
            <div className="flex gap-2" style={{ alignItems: 'stretch', flexWrap: 'nowrap' }}>
              {!customCodeMode ? (
                <div style={{ width: '140px', minWidth: '140px', maxWidth: '140px', flexShrink: 0 }}>
                  <SelectField
                    value={formData.countryCode}
                    onChange={(value) => {
                      if (value === 'custom') {
                        setCustomCodeMode(true)
                        setCustomCode('+')
                        setFormData({ ...formData, countryCode: '+', phone: '' })
                      } else {
                        setFormData({ ...formData, countryCode: value, phone: '' })
                      }
                    }}
                    options={[
                      { value: 'custom', label: 'Outro', icon: '🌍➕' },
                      { value: '+55', label: 'BR +55', icon: '🇧🇷' },
                      { value: '+1', label: 'CA +1', icon: '🇨🇦' },
                      { value: '+34', label: 'ES +34', icon: '🇪🇸' },
                      { value: '+33', label: 'FR +33', icon: '🇫🇷' },
                      { value: '+351', label: 'PT +351', icon: '🇵🇹' },
                      { value: '+52', label: 'MX +52', icon: '🇲🇽' },
                      { value: '+54', label: 'AR +54', icon: '🇦🇷' },
                      { value: '+56', label: 'CL +56', icon: '🇨🇱' },
                      { value: '+44', label: 'UK +44', icon: '🇬🇧' },
                      { value: '+49', label: 'DE +49', icon: '🇩🇪' }
                    ]}
                    className="ddi-select"
                    placeholder="DDI"
                    ariaLabel="Código do país"
                  />
                </div>
              ) : (
                <div className="flex gap-1" style={{ width: '140px', minWidth: '140px', flexShrink: 0 }}>
                  <input
                    type="text"
                    value={customCode}
                    onChange={(e) => {
                      const val = e.target.value
                      setCustomCode(val)
                      setFormData({ ...formData, countryCode: val })
                    }}
                    className="input-adaptive w-full px-2 py-3.5 rounded-lg text-[15px] leading-normal"
                    placeholder="+"
                    style={{ width: 'calc(100% - 36px)' }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setCustomCodeMode(false)
                      setCustomCode('')
                      setFormData({ ...formData, countryCode: '+55' })
                    }}
                    className="flex items-center justify-center w-[32px] h-[48px] bg-azimut-red/10 text-azimut-red rounded-lg hover:bg-azimut-red/20 transition-colors"
                    title="Voltar"
                  >
                    ↩
                  </button>
                </div>
              )}
              {/* Campo telefone - GRANDE com formatação */}
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => {
                  const formatted = customCodeMode ? e.target.value : formatPhoneWithAreaCode(e.target.value, formData.countryCode)
                  setFormData({ ...formData, phone: formatted })
                }}
                className="input-adaptive flex-1"
                style={{ minWidth: '0' }}
                placeholder={
                  formData.countryCode === '+55' ? '(11) 98765-4321' :
                  formData.countryCode === '+1' ? '(416) 555-1234' :
                  formData.countryCode === '+34' ? '912 34 56 78' :
                  formData.countryCode === '+33' ? '01 23 45 67 89' :
                  formData.countryCode === '+351' ? '912 345 678' :
                  formData.countryCode === '+52' ? '(55) 1234 5678' :
                  t.placeholders.phone
                }
              />
            </div>
          </div>

          {/* School (Vancouver only) */}
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
            </div>
          )}

          {/* Course Area */}
          <div>
            <label className="block text-sm font-semibold text-white/90 mb-2 uppercase tracking-wider">
              {t.fields.courseArea}
            </label>
            <SelectField
              value={formData.courseArea || ''}
              onChange={(value) => setFormData({ ...formData, courseArea: value })}
              options={courseOptions[lang]}
              placeholder="Selecione..."
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

          {/* Interest (auto-filled) */}
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

          {/* 🆕 Checkbox Newsletter */}
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              name="wantsNewsletter"
              checked={formData.wantsNewsletter}
              onChange={(e) => setFormData({ ...formData, wantsNewsletter: e.target.checked })}
              className="mt-1 w-5 h-5 rounded border-2 border-white/30 bg-transparent checked:bg-azimut-red checked:border-azimut-red focus:ring-2 focus:ring-azimut-red/50 cursor-pointer transition-all"
            />
            <span className="text-sm text-white/80 group-hover:text-white transition-colors">
              {t.newsletter}
            </span>
          </label>

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
