import React, { useEffect, useRef, useState } from 'react'
import { t, type Lang } from '../i18n'
import SEO, { seoData } from '../components/SEO'
import BudgetWizardModal from '../components/BudgetWizardModal'
import { type UserProfile } from '../components/BudgetWizard'
import { useUserTracking } from '../hooks/useUserTracking'
import CredibilidadeEditais from '../components/CredibilidadeEditais'
import OportunidadesAtivas from '../components/OportunidadesAtivas'

interface ContactProps {
  lang: Lang
}

type Option = { value: string; label: string }

type FormState = {
  name: string
  email: string
  phone: string
  org: string
  countryCity: string
  projectType: string
  objective: string
  place: string
  timeframe: string
  budget: string
  audience: string
  references: string
  themes: string
  message: string
}

const Contact: React.FC<ContactProps> = ({ lang }) => {
  const seo = seoData.contact[lang]
  const { trackInteraction } = useUserTracking()
  
  // Estado para controlar qual modo está ativo
  const [mode, setMode] = useState<'wizard' | 'form'>('wizard')
  const [wizardOpen, setWizardOpen] = useState(false)
  
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    org: '',
    countryCity: '',
    projectType: '',
    objective: '',
    place: '',
    timeframe: '',
    budget: '',
    audience: '',
    references: '',
    themes: '',
    message: ''
  })

  const labels = {
    title: {
      pt: 'Brief rápido (2 minutos)',
      en: 'Quick brief (2 minutes)',
      es: 'Brief rápido (2 minutos)'
    },
    intro: {
      pt: 'Conte em poucas respostas o que você precisa; devolvemos uma proposta clara.',
      en: 'Share a few answers; we’ll return with a clear proposal.',
      es: 'Comparta unas pocas respuestas; devolvemos una propuesta clara.'
    },
    name: { pt: 'Nome', en: 'Name', es: 'Nombre' },
    email: { pt: 'E-mail', en: 'Email', es: 'Correo' },
    phone: { pt: 'Telefone/WhatsApp', en: 'Phone/WhatsApp', es: 'Teléfono/WhatsApp' },
    org: { pt: 'Organização (opcional)', en: 'Organization (optional)', es: 'Organización (opcional)' },
    countryCity: { pt: 'País / Cidade', en: 'Country / City', es: 'País / Ciudad' },
    projectType: { pt: 'Tipo de projeto', en: 'Project type', es: 'Tipo de proyecto' },
    objective: { pt: 'Objetivo principal', en: 'Main goal', es: 'Objetivo principal' },
    place: { pt: 'Onde será', en: 'Where', es: 'Dónde' },
    timeframe: { pt: 'Quando', en: 'When', es: 'Cuándo' },
    budget: { pt: 'Orçamento (faixa)', en: 'Budget (range)', es: 'Presupuesto (rango)' },
    audience: { pt: 'Público-alvo', en: 'Audience', es: 'Público objetivo' },
    references: { pt: 'Referências / links (opcional)', en: 'References / links (optional)', es: 'Referencias / links (opcional)' },
    themes: { pt: 'Temas ou sensível (ex.: Amazônia, patrimônio)', en: 'Themes/sensitive (e.g. Amazon, heritage)', es: 'Temas o sensibles (ej.: Amazonia, patrimonio)' },
    message: { pt: 'Mensagem adicional', en: 'Additional message', es: 'Mensaje adicional' },
    submit: { pt: 'Enviar brief rápido', en: 'Send quick brief', es: 'Enviar brief rápido' }
  }

  const i18n = (entry: { pt: string; en: string; es: string }) => {
    return lang === 'fr' ? entry.en : entry[lang as 'pt' | 'en' | 'es'] || entry.en
  }

  // Custom Select component (para evitar dropdown branco nativo)
  const SelectField: React.FC<{
    value: string
    onChange: (v: string) => void
    options: Option[]
    placeholder: string
    ariaLabel: string
  }> = ({ value, onChange, options, placeholder, ariaLabel }) => {
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
      <div className="relative" ref={ref}>
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

  const handleChange = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Placeholder: integrate with backend /api/brief
    console.log('Brief data:', form)
    alert(lang === 'pt' ? 'Brief enviado! Retornaremos em breve.' : lang === 'es' ? 'Brief enviado. Responderemos pronto.' : 'Brief sent! We will reply soon.')
    setForm({
      name: '',
      email: '',
      phone: '',
      org: '',
      countryCity: '',
      projectType: '',
      objective: '',
      place: '',
      timeframe: '',
      budget: '',
      audience: '',
      references: '',
      themes: '',
      message: ''
    })
  }

  // Handler para quando o wizard completar
  const handleWizardComplete = async (profile: UserProfile & { leadScore?: number; priority?: string }) => {
    const successMessage = {
      pt: '✅ Brief enviado com sucesso! Analisaremos seu projeto e retornaremos em breve.',
      en: '✅ Brief sent successfully! We will review your project and get back to you soon.',
      es: '✅ Brief enviado con éxito! Revisaremos su proyecto y responderemos pronto.',
      fr: '✅ Brief sent successfully! We will review your project and get back to you soon.'
    }
    
    alert(successMessage[lang])
    setWizardOpen(false)
  }

  return (
    <>
      <SEO 
        lang={lang}
        title={seo.title}
        description={seo.description}
        path="/contact"
      />
      
      {/* Budget Wizard Modal */}
      <BudgetWizardModal
        lang={lang}
        isOpen={wizardOpen}
        onClose={() => setWizardOpen(false)}
        onComplete={handleWizardComplete}
      />

      <main className="relative py-16 md:py-20">
        {/* Star background on the side */}
        <div 
          className="pointer-events-none fixed top-20 -right-28 h-[520px] w-[520px] md:top-32 md:-right-40 md:h-[680px] md:w-[680px]" 
          style={{ 
            opacity: 0.3,
            zIndex: -5
          }}
        >
          <img src="/logo-azimut-star.svg" alt="" className="h-full w-full object-contain" />
        </div>

        <div className="mx-auto max-w-5xl px-6">
          <h1 className="mb-8 font-handel text-4xl uppercase tracking-[0.16em] md:text-5xl">
            {t(lang, 'contactTitle')}
          </h1>
          <p className="mb-6 text-lg leading-relaxed text-slate-300">
            {t(lang, 'contactNote')}
          </p>

          {/* Bloco de credibilidade (editais/coprodução) */}
          <div className="mb-8">
            <CredibilidadeEditais lang={lang} />
          </div>

          {/* Oportunidades (tabela enxuta) */}
          <div className="mb-8">
            <OportunidadesAtivas lang={lang} limit={5} />
          </div>

          {/* Seletor de Modo */}
          <div className="mb-8 flex gap-4 rounded-xl border border-white/10 card-adaptive p-4">
            <button
              onClick={() => {
                setMode('wizard')
                setWizardOpen(true)
                trackInteraction('cta_click', 'contact_mode_wizard')
              }}
              className={`flex-1 rounded-lg px-6 py-3 font-sora text-sm font-medium uppercase tracking-[0.1em] transition-all ${
                mode === 'wizard'
                  ? 'bg-azimut-red'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
              style={{ color: mode === 'wizard' ? '#ffffff' : 'var(--theme-text-secondary)' }}
            >
              {lang === 'pt' ? '⚡ Brief Rápido (2 min)' : lang === 'es' ? '⚡ Brief Rápido (2 min)' : '⚡ Quick Brief (2 min)'}
            </button>
            <button
              onClick={() => {
                setMode('form')
                trackInteraction('cta_click', 'contact_mode_form')
              }}
              className={`flex-1 rounded-lg px-6 py-3 font-sora text-sm font-medium uppercase tracking-[0.1em] transition-all ${
                mode === 'form'
                  ? 'bg-azimut-red'
                  : 'bg-white/5 hover:bg-white/10'
              }`}
              style={{ color: mode === 'form' ? '#ffffff' : 'var(--theme-text-secondary)' }}
            >
              {lang === 'pt' ? '📋 Formulário Completo' : lang === 'es' ? '📋 Formulario Completo' : '📋 Full Form'}
            </button>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
            {/* Se modo wizard, mostrar card explicativo */}
            {mode === 'wizard' && (
              <div className="space-y-6 rounded-2xl border border-white/10 card-adaptive p-8 shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur">
                <div>
                  <h2 className="mb-3 font-handel text-2xl uppercase tracking-[0.12em] text-azimut-red">
                    {lang === 'pt' ? '⚡ Brief Rápido' : lang === 'es' ? '⚡ Brief Rápido' : '⚡ Quick Brief'}
                  </h2>
                  <p className="text-base leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
                    {lang === 'pt' 
                      ? 'Responda 4 perguntas rápidas e receba uma proposta personalizada em minutos. Nosso sistema inteligente analisa suas necessidades e sugere as melhores soluções.'
                      : lang === 'es'
                      ? 'Responda 4 preguntas rápidas y reciba una propuesta personalizada en minutos. Nuestro sistema inteligente analiza sus necesidades y sugiere las mejores soluciones.'
                      : 'Answer 4 quick questions and receive a personalized proposal in minutes. Our intelligent system analyzes your needs and suggests the best solutions.'}
                  </p>
                </div>
                
                <div className="space-y-3">
                  <h3 className="font-sora text-sm font-semibold uppercase tracking-[0.1em]" style={{ color: 'var(--theme-text)' }}>
                    {lang === 'pt' ? 'Como funciona:' : lang === 'es' ? 'Cómo funciona:' : 'How it works:'}
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2" style={{ color: 'var(--theme-text-secondary)' }}>
                      <span className="text-azimut-red mt-0.5">1.</span>
                      <span>{lang === 'pt' ? 'Selecione suas necessidades (VR, instalação, museu, etc.)' : lang === 'es' ? 'Seleccione sus necesidades (VR, instalación, museo, etc.)' : 'Select your needs (VR, installation, museum, etc.)'}</span>
                    </li>
                    <li className="flex items-start gap-2" style={{ color: 'var(--theme-text-secondary)' }}>
                      <span className="text-azimut-red mt-0.5">2.</span>
                      <span>{lang === 'pt' ? 'Defina orçamento e prazo' : lang === 'es' ? 'Defina presupuesto y plazo' : 'Define budget and timeline'}</span>
                    </li>
                    <li className="flex items-start gap-2" style={{ color: 'var(--theme-text-secondary)' }}>
                      <span className="text-azimut-red mt-0.5">3.</span>
                      <span>{lang === 'pt' ? 'Conte sobre seu projeto' : lang === 'es' ? 'Cuente sobre su proyecto' : 'Tell us about your project'}</span>
                    </li>
                    <li className="flex items-start gap-2" style={{ color: 'var(--theme-text-secondary)' }}>
                      <span className="text-azimut-red mt-0.5">4.</span>
                      <span>{lang === 'pt' ? 'Receba recomendações personalizadas' : lang === 'es' ? 'Reciba recomendaciones personalizadas' : 'Get personalized recommendations'}</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={() => setWizardOpen(true)}
                  className="w-full rounded-xl bg-azimut-red px-6 py-4 font-sora text-sm font-semibold uppercase tracking-[0.12em] transition hover:brightness-110 shadow-[0_8px_24px_rgba(201,35,55,0.3)]"
                  style={{ color: '#ffffff' }}
                >
                  {lang === 'pt' ? '🚀 Iniciar Brief Rápido' : lang === 'es' ? '🚀 Iniciar Brief Rápido' : '🚀 Start Quick Brief'}
                </button>
              </div>
            )}

            {/* Formulário Completo - só mostra se mode === 'form' */}
            {mode === 'form' && (
              <form
                onSubmit={handleSubmit}
                className="space-y-4 rounded-2xl border border-white/10 card-adaptive p-5 shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur"
              >
              <div>
                <h2 className="mb-1 font-sora text-[1rem] text-slate-50">{i18n(labels.title)}</h2>
                <p className="text-sm text-slate-400">{i18n(labels.intro)}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex flex-col gap-1 text-sm text-slate-200">
                  {i18n(labels.name)}
                  <input className="input-adaptive" value={form.name} onChange={handleChange('name')} required />
                </label>
                <label className="flex flex-col gap-1 text-sm text-slate-200">
                  {i18n(labels.email)}
                  <input className="input-adaptive" type="email" value={form.email} onChange={handleChange('email')} required />
                </label>
                <label className="flex flex-col gap-1 text-sm text-slate-200">
                  {i18n(labels.phone)}
                  <input className="input-adaptive" value={form.phone} onChange={handleChange('phone')} />
                </label>
                <label className="flex flex-col gap-1 text-sm text-slate-200">
                  {i18n(labels.org)}
                  <input className="input-adaptive" value={form.org} onChange={handleChange('org')} />
                </label>
              </div>

              <label className="flex flex-col gap-1 text-sm text-slate-200">
                {i18n(labels.countryCity)}
                <input className="input-adaptive" value={form.countryCity} onChange={handleChange('countryCity')} />
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex flex-col gap-1 text-sm text-slate-200">
                  {i18n(labels.projectType)}
                  <SelectField
                    value={form.projectType}
                    onChange={(v) => setForm(prev => ({ ...prev, projectType: v }))}
                    placeholder={lang === 'pt' ? 'Selecione' : lang === 'es' ? 'Seleccione' : 'Select'}
                    ariaLabel={i18n(labels.projectType)}
                    options={[
                      { value: 'museu', label: 'Museu / Exposição' },
                      { value: 'marca', label: 'Ativação de marca / Evento' },
                      { value: 'vr', label: 'Filme VR / 360' },
                      { value: 'instalacao', label: 'Instalação interativa' },
                      { value: 'workshop', label: 'Workshop / Curso' },
                      { value: 'consultoria', label: 'Consultoria / Captação' },
                      { value: 'outro', label: 'Outro' },
                    ]}
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm text-slate-200">
                  {i18n(labels.objective)}
                  <SelectField
                    value={form.objective}
                    onChange={(v) => setForm(prev => ({ ...prev, objective: v }))}
                    placeholder={lang === 'pt' ? 'Selecione' : lang === 'es' ? 'Seleccione' : 'Select'}
                    ariaLabel={i18n(labels.objective)}
                    options={[
                      { value: 'engajar', label: lang === 'pt' ? 'Engajar / aumentar visitação' : lang === 'es' ? 'Enganchar / aumentar visitas' : 'Engage / increase visits' },
                      { value: 'lancar', label: lang === 'pt' ? 'Lançar produto/evento' : lang === 'es' ? 'Lanzar producto/evento' : 'Launch product/event' },
                      { value: 'edital', label: lang === 'pt' ? 'Captação (Rouanet/PROAC/Creative BC/CMF/Telefilm)' : lang === 'es' ? 'Captación (incentivos)' : 'Funding (incentives)' },
                      { value: 'educacao', label: lang === 'pt' ? 'Educação / Workshop' : lang === 'es' ? 'Educación / Workshop' : 'Education / Workshop' },
                      { value: 'outro', label: lang === 'pt' ? 'Outro' : lang === 'es' ? 'Otro' : 'Other' },
                    ]}
                  />
                </label>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex flex-col gap-1 text-sm text-slate-200">
                  {i18n(labels.place)}
                  <SelectField
                    value={form.place}
                    onChange={(v) => setForm(prev => ({ ...prev, place: v }))}
                    placeholder={lang === 'pt' ? 'Selecione' : lang === 'es' ? 'Seleccione' : 'Select'}
                    ariaLabel={i18n(labels.place)}
                    options={[
                      { value: 'fisico', label: lang === 'pt' ? 'Espaço físico (museu/galeria/praça/feira)' : lang === 'es' ? 'Espacio físico' : 'Physical space' },
                      { value: 'hibrido', label: lang === 'pt' ? 'Híbrido' : lang === 'es' ? 'Híbrido' : 'Hybrid' },
                      { value: 'online', label: lang === 'pt' ? 'On-line' : lang === 'es' ? 'En línea' : 'Online' },
                      { value: 'nao-sabe', label: lang === 'pt' ? 'Ainda não sei' : lang === 'es' ? 'Aún no sé' : 'Not sure yet' },
                    ]}
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm text-slate-200">
                  {i18n(labels.timeframe)}
                  <input className="input-adaptive" placeholder={lang === 'pt' ? 'Mês/ano ou urgência' : lang === 'es' ? 'Mes/año o urgencia' : 'Month/year or urgency'} value={form.timeframe} onChange={handleChange('timeframe')} />
                </label>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex flex-col gap-1 text-sm text-slate-200">
                  {i18n(labels.budget)}
                  <SelectField
                    value={form.budget}
                    onChange={(v) => setForm(prev => ({ ...prev, budget: v }))}
                    placeholder={lang === 'pt' ? 'Não definido' : lang === 'es' ? 'No definido' : 'Not defined'}
                    ariaLabel={i18n(labels.budget)}
                    options={[
                      { value: '200k', label: 'Até R$200k' },
                      { value: '200-500', label: 'R$200–500k' },
                      { value: '500-1m', label: 'R$500k–1M' },
                      { value: '1m-plus', label: 'R$1M+' },
                    ]}
                  />
                </label>
                <label className="flex flex-col gap-1 text-sm text-slate-200">
                  {i18n(labels.audience)}
                  <input className="input-adaptive" placeholder={lang === 'pt' ? 'Ex.: jovens, famílias, corporativo' : lang === 'es' ? 'Ej.: jóvenes, familias, corporativo' : 'e.g. youth, families, corporate'} value={form.audience} onChange={handleChange('audience')} />
                </label>
              </div>

              <label className="flex flex-col gap-1 text-sm text-slate-200">
                {i18n(labels.references)}
                <textarea className="input-adaptive min-h-[70px]" value={form.references} onChange={handleChange('references')} placeholder="Links ou ideias (YouTube, Vimeo, sites de referência)" />
              </label>

              <label className="flex flex-col gap-1 text-sm text-slate-200">
                {i18n(labels.themes)}
                <input className="input-adaptive" value={form.themes} onChange={handleChange('themes')} placeholder={lang === 'pt' ? 'Amazônia, patrimônio, inclusão...' : lang === 'es' ? 'Amazonia, patrimonio, inclusión...' : 'Amazon, heritage, inclusion...'} />
              </label>

              <label className="flex flex-col gap-1 text-sm text-slate-200">
                {i18n(labels.message)}
                <textarea className="input-adaptive min-h-[70px]" value={form.message} onChange={handleChange('message')} />
              </label>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="rounded-md bg-azimut-red px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:brightness-110"
                >
                  {i18n(labels.submit)}
                </button>
              </div>
              </form>
            )}

            <aside className="space-y-4 rounded-2xl border border-white/10 card-adaptive p-5 shadow-[0_16px_40px_rgba(0,0,0,0.35)] backdrop-blur">
              <h3 className="font-sora text-[1rem] text-slate-50">Como funciona</h3>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>1. Você responde em poucos passos.</li>
                <li>2. Recomendamos rota criativa + faixa de investimento.</li>
                <li>3. Se fizer sentido, encaixamos em edital (Rouanet/PROAC/Creative BC/CMF/Telefilm).</li>
                <li>4. Entregamos timeline resumida e próximos passos.</li>
              </ul>
              <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-slate-200">
                <p className="font-semibold text-slate-50">Dica</p>
                <p>Se tiver referências, links ou mood (YouTube/Vimeo/Instagram), cole no campo de referências.</p>
              </div>
            </aside>
          </div>
        </div>
      </main>
    </>
  )
}

export default Contact
