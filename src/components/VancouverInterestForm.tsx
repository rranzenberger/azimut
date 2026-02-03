import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { t, type Lang } from '../i18n'
import ApiService from '../services/api'
import CanadaMapleLeaf from './CanadaMapleLeaf'
import { useFormTracking } from '../hooks/useFormTracking'
import { logger } from '@/utils/logger'
import { checkHoneypot, canSubmit } from '../utils/formValidation'

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
  wantsNewsletter?: boolean // 🆕 Checkbox newsletter
  website?: string // Honeypot anti-spam (campo oculto)
}

const VancouverInterestForm: React.FC<VancouverInterestFormProps> = ({ lang }) => {
  const formRef = useRef<HTMLFormElement>(null)
  const { fieldsCompleted, totalFields } = useFormTracking({
    formId: 'vancouver-interest-form',
    formName: 'Vancouver Interest Form',
    enabled: true
  })
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
    comments: '',
    wantsNewsletter: false, // 🆕 Checkbox newsletter
    website: '' // Honeypot anti-spam (campo oculto)
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
        logger.warn('Could not detect country:', error)
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

  const situations = [
    { value: '', label: t(lang, 'formVanSituationSelect') },
    { value: 'ensino-medio-cursando', label: t(lang, 'formVanSituationHighSchool') },
    { value: 'ensino-medio-completo', label: t(lang, 'formVanSituationHighSchoolDone') },
    { value: 'graduacao-cursando', label: t(lang, 'formVanSituationUniversity') },
    { value: 'graduacao-completo', label: t(lang, 'formVanSituationUniversityDone') },
    { value: 'outro', label: t(lang, 'formVanSituationOther') }
  ]
  const schools = [
    { value: '', label: t(lang, 'formVanSituationSelect') },
    { value: 'vfs', label: t(lang, 'formVanSchoolVfs') },
    { value: 'vanarts', label: t(lang, 'formVanSchoolVanarts') },
    { value: 'nao-sei', label: t(lang, 'formVanSchoolUndecided') }
  ]
  const areas = [
    { value: '', label: t(lang, 'formVanSituationSelect') },
    { value: '3d-animation-vfx', label: t(lang, 'formVanArea3d') },
    { value: 'game-design', label: t(lang, 'formVanAreaGame') },
    { value: 'film-production', label: t(lang, 'formVanAreaFilm') },
    { value: 'acting', label: t(lang, 'formVanAreaActing') },
    { value: 'digital-design', label: t(lang, 'formVanAreaDigital') },
    { value: 'sound-design', label: t(lang, 'formVanAreaSound') },
    { value: 'programming', label: t(lang, 'formVanAreaProgramming') },
    { value: 'outro', label: t(lang, 'formVanAreaOther') }
  ]
  const intakes = [
    { value: '', label: t(lang, 'formVanSituationSelect') },
    { value: '2026', label: t(lang, 'formVanIntake2026') },
    { value: '2027', label: t(lang, 'formVanIntake2027') },
    { value: '2028', label: t(lang, 'formVanIntake2028') },
    { value: 'nao-sei', label: t(lang, 'formVanIntakeUndecided') }
  ]
  const englishLevels = [
    { value: '', label: t(lang, 'formVanSituationSelect') },
    { value: 'iniciante', label: t(lang, 'formVanEnglishBeginner') },
    { value: 'intermediario', label: t(lang, 'formVanEnglishIntermediate') },
    { value: 'avancado', label: t(lang, 'formVanEnglishAdvanced') },
    { value: 'fluente', label: t(lang, 'formVanEnglishFluent') }
  ]
  const portfolioOptions = [
    { value: '', label: t(lang, 'formVanSituationSelect') },
    { value: 'sim-completo', label: t(lang, 'formVanPortfolioYes') },
    { value: 'sim-precisa-melhorar', label: t(lang, 'formVanPortfolioImprove') },
    { value: 'comecando', label: t(lang, 'formVanPortfolioStarting') },
    { value: 'nao-tenho', label: t(lang, 'formVanPortfolioNo') }
  ]
  const budgetRanges = [
    { value: '', label: t(lang, 'formVanSituationSelect') },
    { value: 'ate-100k', label: t(lang, 'formVanBudget100') },
    { value: '100k-200k', label: t(lang, 'formVanBudget200') },
    { value: '200k-300k', label: t(lang, 'formVanBudget300') },
    { value: 'acima-300k', label: t(lang, 'formVanBudget300Plus') },
    { value: 'bolsa', label: t(lang, 'formVanBudgetScholarship') }
  ]
  const fundingSources = [
    { value: '', label: t(lang, 'formVanSituationSelect') },
    { value: 'familia', label: t(lang, 'formVanFundingFamily') },
    { value: 'economia-propria', label: t(lang, 'formVanFundingOwn') },
    { value: 'financiamento', label: t(lang, 'formVanFundingLoan') },
    { value: 'bolsa', label: t(lang, 'formVanFundingScholarship') },
    { value: 'combinacao', label: t(lang, 'formVanFundingCombo') }
  ]
  const howHeardOptions = [
    { value: '', label: t(lang, 'formVanSituationSelect') },
    { value: 'webinar', label: t(lang, 'formVanHowWebinar') },
    { value: 'palestra-escola', label: t(lang, 'formVanHowSchool') },
    { value: 'feira', label: t(lang, 'formVanHowFair') },
    { value: 'redes-sociais', label: t(lang, 'formVanHowSocial') },
    { value: 'indicacao', label: t(lang, 'formVanHowReferral') },
    { value: 'google', label: t(lang, 'formVanHowGoogle') },
    { value: 'outro', label: t(lang, 'formVanHowOther') }
  ]
  const contactOptions = [
    { value: 'email', label: t(lang, 'formVanContactEmail') },
    { value: 'whatsapp', label: t(lang, 'formVanContactWhatsapp') },
    { value: 'call', label: t(lang, 'formVanContactCall') },
    { value: 'any', label: t(lang, 'formVanContactAny') }
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Rate limiting (prevenir spam)
    if (!canSubmit()) {
      setError(t(lang, 'formWaitBeforeResend'))
      return
    }
    
    // Honeypot anti-spam
    if (!checkHoneypot(formData.website || '')) {
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
        setSuccess(true)
        setTimeout(() => navigate(`/${lang}/thank-you`), 2000)
      }, 1000)
      return
    }
    
    setLoading(true)
    setError(null)
    setSuccess(false)

    // Validação suave - só essenciais
    if (!formData.name || !formData.name.trim()) {
      setError(t(lang, 'formFillName'))
      setLoading(false)
      return
    }

    const hasEmail = formData.email && formData.email.trim()
    const hasPhone = formData.whatsapp && formData.whatsapp.replace(/\D/g, '').length >= 8

    if ((formData.preferredContact === 'email') && !hasEmail) {
      setError(t(lang, 'formEmailRequestedNoEmail'))
      setLoading(false)
      return
    }
    if ((formData.preferredContact === 'whatsapp' || formData.preferredContact === 'call') && !hasPhone) {
      setError(t(lang, 'formPhoneRequestedNoPhoneWhatsApp'))
      setLoading(false)
      return
    }
    if (formData.preferredContact === 'any' && !hasEmail && !hasPhone) {
      setError(t(lang, 'formEmailOrPhoneRequired'))
      setLoading(false)
      return
    }
    if (hasEmail) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        setError(t(lang, 'formInvalidEmailExample'))
        setLoading(false)
        return
      }
    }
    if (formData.whatsapp && formData.whatsapp.replace(/\D/g, '').length > 0 && formData.whatsapp.replace(/\D/g, '').length < 8) {
      setError(t(lang, 'formPhoneIncompleteCheck'))
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
      
      // 🆕 Se marcou newsletter, criar NewsletterSubscriber
      if (formData.wantsNewsletter && formData.email) {
        try {
          const backofficeUrl = import.meta.env.VITE_CMS_API_URL || 'https://backoffice.azmt.com.br'
          await fetch(`${backofficeUrl}/api/public/newsletter`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: formData.email,
              name: formData.name,
              lang: lang,
              source: 'vancouver_form'
            })
          })
        } catch (newsletterError) {
          console.warn('Newsletter subscription failed (non-critical):', newsletterError)
        }
      }
      
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
        logger.warn('Email notification failed:', emailErr)
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
        comments: '',
        website: ''
      })

      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch (err: any) {
      logger.error(err instanceof Error ? err : new Error(String(err)), { 
        action: 'submitVancouverLead',
        formType: 'vancouver_interest'
      })
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
            <p className="text-red-400 text-sm mb-2">{t(lang, 'formVanErrorMessage')}</p>
            <div className="flex flex-col gap-2 text-sm text-red-300">
              <a href="mailto:contact@azimutimmersive.com" className="hover:text-red-200">
                📧 contact@azimutimmersive.com
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
              {t(lang, 'formVanEmail')} *
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
              {t(lang, 'formVanWhatsapp')} *
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
                      width: '140px', 
                      minWidth: '140px', 
                      maxWidth: '140px', 
                      flexShrink: 0,
                      flexGrow: 0,
                      height: '48px'
                    }}
                  >
                    <option value="custom">🌍➕ Outro</option>
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
                  <div className="flex gap-1" style={{ width: '140px', minWidth: '140px', flexShrink: 0 }}>
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
                {t(lang, 'formVanCodeDetected')}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="label-adaptive">
                {t(lang, 'formVanAge')} *
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
              {t(lang, 'formVanCurrentSituation')} *
            </label>
            <select
              name="currentSituation"
              value={formData.currentSituation}
              onChange={handleChange}
              className="dropdown-azimut w-full"
            >
              {situations.map(option => (
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
              {t(lang, 'formVanAreaInterest')} *
            </label>
            <select
              name="areaInterest"
              value={formData.areaInterest}
              onChange={handleChange}
              className="dropdown-azimut w-full"
            >
              {areas.map(option => (
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
                {t(lang, 'formVanEnglishLevel')} *
              </label>
              <select
                name="englishLevel"
                value={formData.englishLevel}
                onChange={handleChange}
                className="dropdown-azimut w-full"
              >
                {englishLevels.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="label-adaptive">
              {t(lang, 'formVanHasPortfolio')} *
            </label>
            <select
              name="hasPortfolio"
              value={formData.hasPortfolio}
              onChange={handleChange}
              className="dropdown-azimut w-full"
            >
              {portfolioOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Financial */}
        <div className="space-y-4 mb-6">
          <h3 className="text-xl font-semibold text-white mb-4">{t(lang, 'formVanSectionFinancial')}</h3>

          <div>
            <label className="label-adaptive">
              {t(lang, 'formVanBudgetRange')} *
            </label>
            <select
              name="budgetRange"
              value={formData.budgetRange}
              onChange={handleChange}
              className="dropdown-azimut w-full"
            >
              {budgetRanges.map(option => (
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
              {t(lang, 'formVanHowHeard')} *
            </label>
            <select
              name="howHeard"
              value={formData.howHeard}
              onChange={handleChange}
              className="dropdown-azimut w-full"
            >
              {howHeardOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label-adaptive">
              {t(lang, 'formVanComments')}
            </label>
            <textarea
              name="comments"
              rows={4}
              value={formData.comments}
              onChange={handleChange}
              placeholder={t(lang, 'formVanCommentsPlaceholder')}
              className="input-adaptive w-full"
              style={{ minHeight: '120px' }}
            />
          </div>
        </div>

        {/* Preferência de Contato */}
        <div className="mb-6">
          <label className="label-adaptive">
            {t(lang, 'formVanPreferredContact')} *
          </label>
          <select
            name="preferredContact"
            value={formData.preferredContact}
            onChange={handleChange}
            className="dropdown-azimut w-full"
          >
            {contactOptions.map(option => (
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
              name="wantsNewsletter"
              checked={formData.wantsNewsletter || false}
              onChange={(e) => setFormData({ ...formData, wantsNewsletter: e.target.checked })}
              className="mt-1 border-white/30 text-azimut-red focus:ring-2 focus:ring-azimut-red bg-white/10 rounded"
            />
            <span className="text-sm text-white/80">{t(lang, 'formVanNewsletter')}</span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="mt-1 border-white/30 text-azimut-red focus:ring-2 focus:ring-azimut-red bg-white/10 rounded"
            />
            <span className="text-sm text-white/80">{t(lang, 'formVanWebinars')}</span>
          </label>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-8 py-4 bg-azimut-red hover:bg-azimut-red/90 disabled:bg-azimut-red/50 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-azimut-red/50 disabled:cursor-not-allowed"
        >
          {loading ? t(lang, 'formVanSubmitting') : t(lang, 'formVanSubmit')}
        </button>

        <p className="text-xs text-white/50 text-center mt-4">
          * {t(lang, 'formVanRequired')}
        </p>
        
        {/* Honeypot anti-spam (campo oculto) */}
        <input
          type="text"
          name="website"
          value={formData.website || ''}
          onChange={handleChange}
          style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />
      </div>
    </form>
  )
}

export default VancouverInterestForm
