import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { type Lang } from '../i18n'
import ApiService from '../services/api'

interface VancouverInterestFormProps {
  lang: Lang
}

interface FormData {
  name: string
  email: string
  countryCode: string
  whatsapp: string
  preferredContact: 'email' | 'whatsapp' | 'call' | 'any' // 🆕 Preferência de contato
  age: string
  city: string
  currentSituation: string
  targetSchool: string
  areaInterest: string
  intakeYear: string
  englishLevel: string
  hasPortfolio: string
  budgetRange: string
  fundingSource: string
  howHeard: string
  comments: string
}

const VancouverInterestForm: React.FC<VancouverInterestFormProps> = ({ lang }) => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    countryCode: '+55',
    whatsapp: '',
    preferredContact: 'email', // 🆕 Padrão: Email
    age: '',
    city: '',
    currentSituation: '',
    targetSchool: '',
    areaInterest: '',
    intakeYear: '',
    englishLevel: '',
    hasPortfolio: '',
    budgetRange: '',
    fundingSource: '',
    howHeard: '',
    comments: ''
  })

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [customCodeMode, setCustomCodeMode] = useState(false) // Modo código personalizado

  // Detectar geolocalização AUTOMATICAMENTE
  useEffect(() => {
    const detectCountry = async () => {
      try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
        let detectedCode = '+55' // Default: Brasil (maioria dos alunos)
        
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
    
    if (countryCode === '+44') {
      if (numbers.length <= 3) return numbers
      if (numbers.length <= 7) return `${numbers.slice(0, 3)} ${numbers.slice(3)}`
      return `${numbers.slice(0, 3)} ${numbers.slice(3, 7)} ${numbers.slice(7, 11)}`
    }
    
    return numbers
  }

  const labels = {
    pt: {
      name: 'Nome completo',
      email: 'Email',
      whatsapp: 'WhatsApp',
      age: 'Idade',
      city: 'Cidade/País',
      currentSituation: 'Situação atual',
      situations: [
        { value: '', label: 'Selecione...' },
        { value: 'ensino-medio-cursando', label: 'Ensino Médio (cursando)' },
        { value: 'ensino-medio-completo', label: 'Ensino Médio (completo)' },
        { value: 'graduacao-cursando', label: 'Graduação (cursando)' },
        { value: 'graduacao-completo', label: 'Graduação (completo)' },
        { value: 'outro', label: 'Outro' }
      ],
      targetSchool: 'Qual escola te interessa?',
      schools: [
        { value: '', label: 'Selecione...' },
        { value: 'vfs', label: 'VFS (Vancouver Film School)' },
        { value: 'vanarts', label: 'VanArts' },
        { value: 'nao-sei', label: 'Ainda não sei' }
      ],
      areaInterest: 'Área de interesse',
      areas: [
        { value: '', label: 'Selecione...' },
        { value: '3d-animation-vfx', label: '3D Animation & VFX' },
        { value: 'game-design', label: 'Game Design/Art' },
        { value: 'film-production', label: 'Film Production' },
        { value: 'acting', label: 'Acting' },
        { value: 'digital-design', label: 'Digital Design' },
        { value: 'sound-design', label: 'Sound Design' },
        { value: 'programming', label: 'Programming' },
        { value: 'outro', label: 'Outro' }
      ],
      intakeYear: 'Quando pretende ir?',
      intakes: [
        { value: '', label: 'Selecione...' },
        { value: '2026', label: '2026' },
        { value: '2027', label: '2027' },
        { value: '2028', label: '2028 ou depois' },
        { value: 'nao-sei', label: 'Ainda não sei' }
      ],
      englishLevel: 'Nível de inglês',
      englishLevels: [
        { value: '', label: 'Selecione...' },
        { value: 'iniciante', label: 'Iniciante' },
        { value: 'intermediario', label: 'Intermediário' },
        { value: 'avancado', label: 'Avançado' },
        { value: 'fluente', label: 'Fluente' }
      ],
      hasPortfolio: 'Já tem portfolio?',
      portfolioOptions: [
        { value: '', label: 'Selecione...' },
        { value: 'sim-completo', label: 'Sim, completo' },
        { value: 'sim-precisa-melhorar', label: 'Sim, mas precisa melhorar' },
        { value: 'comecando', label: 'Começando agora' },
        { value: 'nao-tenho', label: 'Não tenho' }
      ],
      budgetRange: 'Orçamento disponível (total)',
      budgetRanges: [
        { value: '', label: 'Selecione...' },
        { value: 'ate-100k', label: 'Até R$ 100k' },
        { value: '100k-200k', label: 'R$ 100k - 200k' },
        { value: '200k-300k', label: 'R$ 200k - 300k' },
        { value: 'acima-300k', label: 'Acima R$ 300k' },
        { value: 'bolsa', label: 'Preciso de bolsa/financiamento' }
      ],
      fundingSource: 'Fonte de recursos',
      fundingSources: [
        { value: '', label: 'Selecione...' },
        { value: 'familia', label: 'Família' },
        { value: 'economia-propria', label: 'Economia própria' },
        { value: 'financiamento', label: 'Financiamento' },
        { value: 'bolsa', label: 'Bolsa' },
        { value: 'combinacao', label: 'Combinação' }
      ],
      howHeard: 'Como soube sobre a Azimut?',
      howHeardOptions: [
        { value: '', label: 'Selecione...' },
        { value: 'webinar', label: 'Webinar' },
        { value: 'palestra-escola', label: 'Palestra na escola' },
        { value: 'feira', label: 'Feira educacional' },
        { value: 'redes-sociais', label: 'Redes sociais' },
        { value: 'indicacao', label: 'Indicação' },
        { value: 'google', label: 'Google' },
        { value: 'outro', label: 'Outro' }
      ],
      comments: 'Comentários/Dúvidas',
      commentsPlaceholder: 'Conte-nos um pouco mais sobre seus objetivos...',
      preferredContactLabel: 'Como prefere ser contatado?',
      contactOptions: [
        { value: 'email', label: '📧 Email' },
        { value: 'whatsapp', label: '💬 WhatsApp' },
        { value: 'call', label: '📞 Ligação' },
        { value: 'any', label: '🤝 Qualquer um' }
      ],
      newsletter: 'Quero receber atualizações sobre Vancouver',
      webinars: 'Quero participar dos próximos webinars',
      submit: 'Enviar Interesse',
      submitting: 'Enviando...',
      successMessage: 'Obrigado! Recebemos seu interesse em Vancouver. Em breve entraremos em contato para agendar sua consulta gratuita.',
      errorMessage: 'Ops! Algo deu errado. Por favor, tente novamente ou entre em contato diretamente:',
      required: 'Campos obrigatórios'
    },
    en: {
      // ... (copiar estrutura com traduções)
      preferredContactLabel: 'How do you prefer to be contacted?',
      contactOptions: [
        { value: 'email', label: '📧 Email' },
        { value: 'whatsapp', label: '💬 WhatsApp' },
        { value: 'call', label: '📞 Call' },
        { value: 'any', label: '🤝 Any' }
      ]
    },
    es: {
      preferredContactLabel: 'Cómo prefiere ser contactado?',
      contactOptions: [
        { value: 'email', label: '📧 Email' },
        { value: 'whatsapp', label: '💬 WhatsApp' },
        { value: 'call', label: '📞 Llamada' },
        { value: 'any', label: '🤝 Cualquiera' }
      ]
    },
    fr: {
      preferredContactLabel: 'Comment préférez-vous être contacté?',
      contactOptions: [
        { value: 'email', label: '📧 Email' },
        { value: 'whatsapp', label: '💬 WhatsApp' },
        { value: 'call', label: '📞 Appel' },
        { value: 'any', label: '🤝 N\'importe' }
      ]
    }
  }

  const t = labels[lang] || labels.pt

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    setSuccess(false)

    // Validação suave - só essenciais
    if (!formData.name || !formData.name.trim()) {
      setError(lang === 'pt' ? 'Por favor, preencha seu nome.' : 
               lang === 'es' ? 'Por favor, complete su nombre.' :
               lang === 'fr' ? 'Veuillez remplir votre nom.' :
               'Please fill in your name.')
      setLoading(false)
      return
    }

    // 🆕 VALIDAÇÃO CRUZADA INTELIGENTE baseada em preferência de contato
    const hasEmail = formData.email && formData.email.trim()
    const hasPhone = formData.whatsapp && formData.whatsapp.replace(/\D/g, '').length >= 8

    // Se pediu contato por EMAIL mas não forneceu email
    if ((formData.preferredContact === 'email') && !hasEmail) {
      setError(lang === 'pt' ? 'Você solicitou contato por email, mas não forneceu seu email. Por favor, preencha o email ou mude a preferência de contato.' : 
               lang === 'en' ? 'You requested email contact, but didn\'t provide your email. Please fill in email or change contact preference.' :
               lang === 'es' ? 'Solicitaste contacto por correo, pero no proporcionaste tu email. Por favor, completa el email o cambia la preferencia.' :
               'Vous avez demandé un contact par email, mais n\'avez pas fourni votre email.')
      setLoading(false)
      return
    }

    // Se pediu contato por WHATSAPP/CALL mas não forneceu telefone
    if ((formData.preferredContact === 'whatsapp' || formData.preferredContact === 'call') && !hasPhone) {
      setError(lang === 'pt' ? 'Você solicitou contato por telefone/WhatsApp, mas não forneceu seu número. Por favor, preencha o telefone ou mude a preferência de contato.' : 
               lang === 'en' ? 'You requested phone/WhatsApp contact, but didn\'t provide your number. Please fill in phone or change preference.' :
               lang === 'es' ? 'Solicitaste contacto por teléfono/WhatsApp, pero no proporcionaste tu número. Por favor, completa el teléfono.' :
               'Vous avez demandé un contact par téléphone, mais n\'avez pas fourni votre numéro.')
      setLoading(false)
      return
    }

    // Se marcou "Any" (qualquer), precisa de pelo menos um
    if (formData.preferredContact === 'any' && !hasEmail && !hasPhone) {
      setError(lang === 'pt' ? 'Por favor, forneça pelo menos email OU telefone.' : 
               lang === 'es' ? 'Por favor, proporcione al menos email O teléfono.' :
               lang === 'fr' ? 'Veuillez fournir au moins email OU téléphone.' :
               'Please provide at least email OR phone.')
      setLoading(false)
      return
    }

    // Validar formato de email se fornecido
    if (hasEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        setError(lang === 'pt' ? 'Por favor, forneça um email válido (exemplo: seu@email.com).' : 
                 lang === 'es' ? 'Por favor, proporcione un correo electrónico válido (ejemplo: su@correo.com).' :
                 lang === 'fr' ? 'Veuillez fournir un email valide (exemple: votre@email.com).' :
                 'Please provide a valid email (example: your@email.com).')
        setLoading(false)
        return
      }
    }

    // Validar telefone se fornecido
    if (formData.whatsapp && formData.whatsapp.replace(/\D/g, '').length > 0 && formData.whatsapp.replace(/\D/g, '').length < 8) {
      setError(lang === 'pt' ? 'O número de telefone parece incompleto. Por favor, verifique.' : 
               lang === 'es' ? 'El número de teléfono parece incompleto. Por favor, verifique.' :
               lang === 'fr' ? 'Le numéro de téléphone semble incomplet. Veuillez vérifier.' :
               'The phone number seems incomplete. Please check.')
      setLoading(false)
      return
    }

    try {
      // Combinar countryCode + whatsapp (remover formatação, só números)
      const whatsappNumbers = formData.whatsapp.replace(/\D/g, '')
      const fullWhatsapp = whatsappNumbers ? `${formData.countryCode}${whatsappNumbers}` : ''
      
      const submitData = {
        ...formData,
        whatsapp: fullWhatsapp
        // preferredContact já está em formData, não precisa sobrescrever!
      }
      
      // 1. Submeter para o backoffice (API existente)
      await ApiService.submitVancouverLead(submitData)
      
      // 2. Enviar notificação por email (API nova)
      try {
        await fetch('/api/notify-form', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...submitData,
            formType: 'vancouver_interest_full',
            lang,
            score: 60 // Formulário completo = warm lead
          })
        })
      } catch (emailErr) {
        console.warn('Email notification failed:', emailErr)
        // Não bloqueia o sucesso do formulário
      }
      
      setSuccess(true)
      
      // Redirecionar para thank-you após 2 segundos
      setTimeout(() => {
        navigate(`/${lang}/thank-you`)
      }, 2000)
      
      setFormData({
        name: '',
        email: '',
        whatsapp: '',
        age: '',
        city: '',
        currentSituation: '',
        targetSchool: '',
        areaInterest: '',
        intakeYear: '',
        englishLevel: '',
        hasPortfolio: '',
        budgetRange: '',
        fundingSource: '',
        howHeard: '',
        comments: ''
      })

      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err: any) {
      console.error('Error submitting Vancouver lead:', err)
      setError(err.message || 'Erro ao enviar formulário')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    // Redireciona automaticamente, não mostra mensagem
    return null
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-8 card-adaptive rounded-2xl border border-white/10">
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
            <p className="text-red-400 text-sm mb-2">{t.errorMessage}</p>
            <div className="flex flex-col gap-2 text-sm text-red-300">
              <a href="mailto:contato@azmt.com.br" className="hover:text-red-200">
                📧 contato@azmt.com.br
              </a>
              <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="hover:text-red-200">
                💬 WhatsApp
              </a>
            </div>
          </div>
        )}

        {/* Personal Info */}
        <div className="space-y-4 mb-6">
          <h3 className="text-xl font-semibold text-white mb-4">Informações Pessoais</h3>

          <div>
            <label className="label-adaptive">
              {t.name} *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="input-adaptive w-full"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
            <label className="label-adaptive">
              {t.email} *
            </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="input-adaptive w-full"
              />
            </div>

            <div>
            <label className="label-adaptive">
              {t.whatsapp} *
            </label>
              <div className="flex gap-2" style={{ alignItems: 'center', flexWrap: 'nowrap' }}>
                {/* Dropdown ou Input customizado - LARGURA 130px */}
                {!customCodeMode ? (
                  <select
                    value={formData.countryCode}
                    onChange={(e) => {
                      if (e.target.value === 'custom') {
                        setCustomCodeMode(true)
                        setFormData(prev => ({ ...prev, countryCode: '+', whatsapp: '' }))
                      } else {
                        setFormData(prev => ({ ...prev, countryCode: e.target.value, whatsapp: '' }))
                      }
                    }}
                    className="dropdown-azimut"
                    style={{ 
                      width: '130px', 
                      minWidth: '130px', 
                      maxWidth: '130px', 
                      flexShrink: 0,
                      flexGrow: 0,
                      height: '48px'
                    }}
                  >
                    <option value="custom">🌐 + Outro</option>
                    <option value="+55">🇧🇷 BR +55</option>
                    <option value="+1">🇨🇦 CA +1</option>
                    <option value="+34">🇪🇸 ES +34</option>
                    <option value="+33">🇫🇷 FR +33</option>
                    <option value="+351">🇵🇹 PT +351</option>
                    <option value="+52">🇲🇽 MX +52</option>
                    <option value="+54">🇦🇷 AR +54</option>
                    <option value="+44">🇬🇧 UK +44</option>
                  </select>
                ) : (
                  <div className="flex gap-1" style={{ width: '130px', minWidth: '130px', flexShrink: 0 }}>
                    <input
                      type="text"
                      value={formData.countryCode}
                      onChange={(e) => {
                        let val = e.target.value
                        if (!val.startsWith('+')) val = '+' + val.replace(/[^0-9]/g, '')
                        else val = '+' + val.slice(1).replace(/[^0-9]/g, '')
                        if (val.length <= 5) setFormData(prev => ({ ...prev, countryCode: val }))
                      }}
                      className="input-adaptive"
                      placeholder="+XX"
                      style={{ width: '70px', height: '48px', textAlign: 'center', fontWeight: 700 }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setCustomCodeMode(false)
                        setFormData(prev => ({ ...prev, countryCode: '+55', whatsapp: '' }))
                      }}
                      className="px-2 text-white/60 hover:text-white transition-colors"
                      title="Voltar para lista"
                      style={{ height: '48px' }}
                    >
                      ↩
                    </button>
                  </div>
                )}
                {/* Campo WhatsApp - flex-1 para preencher espaço restante */}
                <input
                  type="tel"
                  name="whatsapp"
                  placeholder={
                    formData.countryCode === '+55' ? '(11) 98765-4321' :
                    formData.countryCode === '+1' ? '(416) 555-1234' :
                    formData.countryCode === '+34' ? '912 34 56 78' :
                    formData.countryCode === '+33' ? '01 23 45 67 89' :
                    formData.countryCode === '+351' ? '912 345 678' :
                    formData.countryCode === '+52' ? '(55) 1234 5678' :
                    formData.countryCode === '+44' ? '020 1234 5678' :
                    '123456789'
                  }
                  value={formData.whatsapp}
                  onChange={(e) => {
                    const formatted = formatPhoneWithAreaCode(e.target.value, formData.countryCode)
                    setFormData(prev => ({ ...prev, whatsapp: formatted }))
                  }}
                  className="input-adaptive"
                  style={{ 
                    flex: '1 1 auto',
                    minWidth: '0',
                    width: 'auto',
                    height: '48px'
                  }}
                />
              </div>
              <p className="mt-1.5 text-xs text-white/50">
                💡 Código detectado automaticamente
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label-adaptive">
                {t.age} *
              </label>
              <input
                type="number"
                name="age"
                min="15"
                max="99"
                value={formData.age}
                onChange={handleChange}
                className="input-adaptive w-full"
              />
            </div>

            <div>
              <label className="label-adaptive">
                {t.city} *
              </label>
              <input
                type="text"
                name="city"
                placeholder="São Paulo, Brazil / New York, USA / Paris, France"
                value={formData.city}
                onChange={handleChange}
                className="input-adaptive w-full"
              />
            </div>
          </div>

          <div>
            <label className="label-adaptive">
              {t.currentSituation} *
            </label>
            <select
              name="currentSituation"
              value={formData.currentSituation}
              onChange={handleChange}
              className="dropdown-azimut w-full"
            >
              {t.situations.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Interest in Vancouver */}
        <div className="space-y-4 mb-6">
          <h3 className="text-xl font-semibold text-white mb-4">Interesse em Vancouver</h3>

          <div>
            <label className="label-adaptive">
              {t.targetSchool} *
            </label>
            <select
              name="targetSchool"
              value={formData.targetSchool}
              onChange={handleChange}
              className="dropdown-azimut w-full"
            >
              {t.schools.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label-adaptive">
              {t.areaInterest} *
            </label>
            <select
              name="areaInterest"
              value={formData.areaInterest}
              onChange={handleChange}
              className="dropdown-azimut w-full"
            >
              {t.areas.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label-adaptive">
                {t.intakeYear} *
              </label>
              <select
                name="intakeYear"
                value={formData.intakeYear}
                onChange={handleChange}
                className="dropdown-azimut w-full"
              >
                {t.intakes.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label-adaptive">
                {t.englishLevel} *
              </label>
              <select
                name="englishLevel"
                value={formData.englishLevel}
                onChange={handleChange}
                className="dropdown-azimut w-full"
              >
                {t.englishLevels.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="label-adaptive">
              {t.hasPortfolio} *
            </label>
            <select
              name="hasPortfolio"
              value={formData.hasPortfolio}
              onChange={handleChange}
              className="dropdown-azimut w-full"
            >
              {t.portfolioOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Financial */}
        <div className="space-y-4 mb-6">
          <h3 className="text-xl font-semibold text-white mb-4">Financeiro</h3>

          <div>
            <label className="label-adaptive">
              {t.budgetRange} *
            </label>
            <select
              name="budgetRange"
              value={formData.budgetRange}
              onChange={handleChange}
              className="dropdown-azimut w-full"
            >
              {t.budgetRanges.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label-adaptive">
              {t.fundingSource} *
            </label>
            <select
              name="fundingSource"
              value={formData.fundingSource}
              onChange={handleChange}
              className="dropdown-azimut w-full"
            >
              {t.fundingSources.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* How Heard */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="label-adaptive">
              {t.howHeard} *
            </label>
            <select
              name="howHeard"
              value={formData.howHeard}
              onChange={handleChange}
              className="dropdown-azimut w-full"
            >
              {t.howHeardOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label-adaptive">
              {t.comments}
            </label>
            <textarea
              name="comments"
              rows={4}
              value={formData.comments}
              onChange={handleChange}
              placeholder={t.commentsPlaceholder}
              className="input-adaptive w-full"
              style={{ minHeight: '120px' }}
            />
          </div>
        </div>

        {/* Preferência de Contato */}
        <div className="mb-6">
          <label className="label-adaptive">
            {t.preferredContactLabel || 'Como prefere ser contatado?'} *
          </label>
          <select
            name="preferredContact"
            value={formData.preferredContact}
            onChange={handleChange}
            className="dropdown-azimut w-full"
          >
            {(t.contactOptions || [
              { value: 'email', label: '📧 Email' },
              { value: 'whatsapp', label: '💬 WhatsApp' },
              { value: 'call', label: '📞 Ligação' },
              { value: 'any', label: '🤝 Qualquer um' }
            ]).map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Checkboxes */}
        <div className="space-y-3 mb-6">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-1 border-white/30 text-azimut-red focus:ring-2 focus:ring-azimut-red bg-white/10 rounded"
            />
            <span className="text-sm text-white/80">{t.newsletter}</span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-1 border-white/30 text-azimut-red focus:ring-2 focus:ring-azimut-red bg-white/10 rounded"
            />
            <span className="text-sm text-white/80">{t.webinars}</span>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-8 py-4 bg-azimut-red hover:bg-azimut-red/90 disabled:bg-azimut-red/50 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-azimut-red/50 disabled:cursor-not-allowed"
        >
          {loading ? t.submitting : t.submit}
        </button>

        <p className="text-xs text-white/50 text-center mt-4">
          * {t.required}
        </p>
      </div>
    </form>
  )
}

export default VancouverInterestForm
