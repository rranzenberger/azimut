import React, { useState } from 'react'
import { type Lang } from '../i18n'
import ApiService from '../services/api'

interface VancouverInterestFormProps {
  lang: Lang
}

interface FormData {
  name: string
  email: string
  whatsapp: string
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
  const [formData, setFormData] = useState<FormData>({
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

  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
      newsletter: 'Quero receber atualizações sobre Vancouver',
      webinars: 'Quero participar dos próximos webinars',
      submit: 'Enviar Interesse',
      submitting: 'Enviando...',
      successMessage: 'Obrigado! Recebemos seu interesse em Vancouver. Em breve entraremos em contato para agendar sua consulta gratuita.',
      errorMessage: 'Ops! Algo deu errado. Por favor, tente novamente ou entre em contato diretamente:',
      required: 'Campos obrigatórios'
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

    try {
      await ApiService.submitVancouverLead(formData)
      setSuccess(true)
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
    return (
      <div className="p-8 card-adaptive rounded-2xl border border-azimut-red/50 bg-azimut-red/10 animate-fade-in">
        <div className="text-center">
          <div className="text-6xl mb-4">✅</div>
          <h3 className="text-2xl font-semibold text-white mb-4">
            {t.successMessage}
          </h3>
          <p className="text-white/70 mb-6">
            Verifique seu email (inclusive spam) para mais informações.
          </p>
          <button
            onClick={() => setSuccess(false)}
            className="px-6 py-3 bg-azimut-red hover:bg-azimut-red/90 text-white font-semibold rounded-lg transition-all"
          >
            Enviar Outro Interesse
          </button>
        </div>
      </div>
    )
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
            <label className="block text-sm font-medium text-white/80 mb-2">
              {t.name} *
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 input-adaptive rounded-lg"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                {t.email} *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 input-adaptive rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                {t.whatsapp} *
              </label>
              <input
                type="tel"
                name="whatsapp"
                required
                placeholder="(11) 99999-9999"
                value={formData.whatsapp}
                onChange={handleChange}
                className="w-full px-4 py-3 input-adaptive rounded-lg"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                {t.age} *
              </label>
              <input
                type="number"
                name="age"
                required
                min="15"
                max="99"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-4 py-3 input-adaptive rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                {t.city} *
              </label>
              <input
                type="text"
                name="city"
                required
                placeholder="São Paulo, Brazil / New York, USA / Paris, France"
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-3 input-adaptive rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              {t.currentSituation} *
            </label>
            <select
              name="currentSituation"
              required
              value={formData.currentSituation}
              onChange={handleChange}
              className="w-full px-4 py-3 input-adaptive rounded-lg"
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
            <label className="block text-sm font-medium text-white/80 mb-2">
              {t.targetSchool} *
            </label>
            <select
              name="targetSchool"
              required
              value={formData.targetSchool}
              onChange={handleChange}
              className="w-full px-4 py-3 input-adaptive rounded-lg"
            >
              {t.schools.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              {t.areaInterest} *
            </label>
            <select
              name="areaInterest"
              required
              value={formData.areaInterest}
              onChange={handleChange}
              className="w-full px-4 py-3 input-adaptive rounded-lg"
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
              <label className="block text-sm font-medium text-white/80 mb-2">
                {t.intakeYear} *
              </label>
              <select
                name="intakeYear"
                required
                value={formData.intakeYear}
                onChange={handleChange}
                className="w-full px-4 py-3 input-adaptive rounded-lg"
              >
                {t.intakes.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                {t.englishLevel} *
              </label>
              <select
                name="englishLevel"
                required
                value={formData.englishLevel}
                onChange={handleChange}
                className="w-full px-4 py-3 input-adaptive rounded-lg"
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
            <label className="block text-sm font-medium text-white/80 mb-2">
              {t.hasPortfolio} *
            </label>
            <select
              name="hasPortfolio"
              required
              value={formData.hasPortfolio}
              onChange={handleChange}
              className="w-full px-4 py-3 input-adaptive rounded-lg"
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
            <label className="block text-sm font-medium text-white/80 mb-2">
              {t.budgetRange} *
            </label>
            <select
              name="budgetRange"
              required
              value={formData.budgetRange}
              onChange={handleChange}
              className="w-full px-4 py-3 input-adaptive rounded-lg"
            >
              {t.budgetRanges.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              {t.fundingSource} *
            </label>
            <select
              name="fundingSource"
              required
              value={formData.fundingSource}
              onChange={handleChange}
              className="w-full px-4 py-3 input-adaptive rounded-lg"
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
            <label className="block text-sm font-medium text-white/80 mb-2">
              {t.howHeard} *
            </label>
            <select
              name="howHeard"
              required
              value={formData.howHeard}
              onChange={handleChange}
              className="w-full px-4 py-3 input-adaptive rounded-lg"
            >
              {t.howHeardOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-2">
              {t.comments}
            </label>
            <textarea
              name="comments"
              rows={4}
              value={formData.comments}
              onChange={handleChange}
              placeholder={t.commentsPlaceholder}
              className="w-full px-4 py-3 input-adaptive rounded-lg"
            />
          </div>
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
