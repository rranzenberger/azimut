import React, { useState, useEffect } from 'react'
import { type Lang } from '../i18n'
import { trackBudgetWizard } from '../utils/analytics'
import { matchEditais } from '../utils/editaisMatching'
import { type Edital } from '../data/editais'

interface BudgetWizardProps {
  lang: Lang
  onComplete: (profile: UserProfile) => void
  onCancel?: () => void
}

export interface UserProfile {
  needs: string[]
  budget: string
  location: string
  deadline: string
  audience: string
  objective: string
  organization?: string
  role?: 'museum' | 'prefecture' | 'brand' | 'education' | 'other'
  needsFunding: boolean
}

const BudgetWizard: React.FC<BudgetWizardProps> = ({ lang, onComplete, onCancel }) => {
  const [step, setStep] = useState(1)
  
  // Track step changes
  useEffect(() => {
    trackBudgetWizard('step_viewed', { step: step.toString() })
  }, [step])
  
  const [answers, setAnswers] = useState<UserProfile>({
    needs: [],
    budget: '',
    location: '',
    deadline: '',
    audience: '',
    objective: '',
    needsFunding: false
  })
  const [recommendedEditais, setRecommendedEditais] = useState<Edital[]>([])

  // Recalcular sugestões de editais sempre que respostas mudarem
  useEffect(() => {
    setRecommendedEditais(matchEditais(answers))
  }, [answers])

  const texts = {
    pt: {
      title: 'Brief Rápido',
      subtitle: 'Vamos entender seu projeto em poucos passos',
      step1Title: 'O que você precisa?',
      step1Subtitle: 'Selecione todas as opções que se aplicam',
      step2Title: 'Qual seu orçamento?',
      step2Subtitle: 'Isso nos ajuda a sugerir os melhores serviços',
      step3Title: 'Contexto do projeto',
      step3Subtitle: 'Conte-nos mais sobre seu projeto',
      step4Title: 'Recomendações para você',
      step4Subtitle: 'Baseado nas suas respostas, aqui estão sugestões',
      next: 'Próximo',
      back: 'Voltar',
      finish: 'Enviar Brief',
      cancel: 'Cancelar',
      needs: [
        'Experiência imersiva para museu',
        'Ativação de marca/evento',
        'Filme/documentário VR/IA',
        'Workshop/formação',
        'Consultoria para edital',
        'Outro'
      ],
      budgets: [
        { value: '2k-10k', label: 'R$ 2k - R$ 10k', icon: '🎬', description: 'Edições simples, conteúdo básico' },
        { value: '10k-50k', label: 'R$ 10k - R$ 50k', icon: '💰', description: 'Projetos menores, ativações' },
        { value: '50k-200k', label: 'R$ 50k - R$ 200k', icon: '💎', description: 'Projetos médios, instalações' },
        { value: '200k-1M', label: 'R$ 200k - R$ 1M', icon: '🏆', description: 'Grandes projetos, museus' },
        { value: '1M+', label: 'Acima de R$ 1M', icon: '👑', description: 'Enterprise, múltiplas fases' },
        { value: 'funding', label: 'Ajuda com financiamento', icon: '📋', description: 'Editais e linhas de financiamento' }
      ],
      locationLabel: 'Localização do projeto',
      deadlineLabel: 'Prazo',
      deadlineOptions: [
        'Já tenho prazo definido',
        '3-6 meses',
        '6-12 meses',
        'Mais de 1 ano',
        'Ainda não defini'
      ],
      audienceLabel: 'Público-alvo',
      objectiveLabel: 'Objetivo principal',
      organizationLabel: 'Organização/Instituição'
    },
    en: {
      title: 'Quick Brief',
      subtitle: 'Let\'s understand your project in a few steps',
      step1Title: 'What do you need?',
      step1Subtitle: 'Select all that apply',
      step2Title: 'What\'s your budget?',
      step2Subtitle: 'This helps us suggest the best solutions',
      step3Title: 'Project context',
      step3Subtitle: 'Tell us more about your project',
      step4Title: 'Recommendations for you',
      step4Subtitle: 'Based on your answers, here are suggestions',
      next: 'Next',
      back: 'Back',
      finish: 'Send Brief',
      cancel: 'Cancel',
      needs: [
        'Immersive experience for museum',
        'Brand/event activation',
        'VR/AI film/documentary',
        'Workshop/training',
        'Edital consulting',
        'Other'
      ],
      budgets: [
        { value: '2k-10k', label: '$2k - $10k', icon: '🎬', description: 'Simple edits, basic content' },
        { value: '10k-50k', label: '$10k - $50k', icon: '💰', description: 'Smaller projects, activations' },
        { value: '50k-200k', label: '$50k - $200k', icon: '💎', description: 'Medium projects, installations' },
        { value: '200k-1M', label: '$200k - $1M', icon: '🏆', description: 'Large projects, museums' },
        { value: '1M+', label: 'Above $1M', icon: '👑', description: 'Enterprise, multiple phases' },
        { value: 'funding', label: 'Need funding help', icon: '📋', description: 'Editais and funding lines' }
      ],
      locationLabel: 'Project location',
      deadlineLabel: 'Deadline',
      deadlineOptions: [
        'I already have a deadline',
        '3-6 months',
        '6-12 months',
        'More than 1 year',
        'Not defined yet'
      ],
      audienceLabel: 'Target audience',
      objectiveLabel: 'Main objective',
      organizationLabel: 'Organization/Institution'
    },
    es: {
      title: 'Brief Rápido',
      subtitle: 'Entendamos tu proyecto en pocos pasos',
      step1Title: '¿Qué necesitas?',
      step1Subtitle: 'Selecciona todas las opciones que apliquen',
      step2Title: '¿Cuál es tu presupuesto?',
      step2Subtitle: 'Esto nos ayuda a sugerir las mejores soluciones',
      step3Title: 'Contexto del proyecto',
      step3Subtitle: 'Cuéntanos más sobre tu proyecto',
      step4Title: 'Recomendaciones para ti',
      step4Subtitle: 'Basado en tus respuestas, aquí hay sugerencias',
      next: 'Siguiente',
      back: 'Atrás',
      finish: 'Enviar Brief',
      cancel: 'Cancelar',
      needs: [
        'Experiencia inmersiva para museo',
        'Activación de marca/evento',
        'Película/documental VR/IA',
        'Taller/formación',
        'Consultoría para edital',
        'Otro'
      ],
      budgets: [
        { value: '2k-10k', label: '$2k - $10k', icon: '🎬', description: 'Ediciones simples, contenido básico' },
        { value: '10k-50k', label: '$10k - $50k', icon: '💰', description: 'Proyectos pequeños, activaciones' },
        { value: '50k-200k', label: '$50k - $200k', icon: '💎', description: 'Proyectos medianos, instalaciones' },
        { value: '200k-1M', label: '$200k - $1M', icon: '🏆', description: 'Proyectos grandes, museos' },
        { value: '1M+', label: 'Más de $1M', icon: '👑', description: 'Enterprise, múltiples fases' },
        { value: 'funding', label: 'Ayuda con financiamiento', icon: '📋', description: 'Editais y líneas de financiamiento' }
      ],
      locationLabel: 'Ubicación del proyecto',
      deadlineLabel: 'Plazo',
      deadlineOptions: [
        'Ya tengo un plazo definido',
        '3-6 meses',
        '6-12 meses',
        'Más de 1 año',
        'Aún no lo he definido'
      ],
      audienceLabel: 'Público objetivo',
      objectiveLabel: 'Objetivo principal',
      organizationLabel: 'Organización/Institución'
    }
  }

  const t = texts[lang] || texts.en

  // Step 1: Needs
  if (step === 1) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur">
        <div className="mb-6">
          <h2 className="mb-2 font-handel text-2xl uppercase tracking-[0.12em] text-slate-100">
            {t.step1Title}
          </h2>
          <p className="text-sm text-slate-400">{t.step1Subtitle}</p>
        </div>

        <div className="space-y-3 mb-6">
          {t.needs.map((need, idx) => (
            <label
              key={idx}
              className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10 transition-all cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={answers.needs.includes(need)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setAnswers({ ...answers, needs: [...answers.needs, need] })
                  } else {
                    setAnswers({ ...answers, needs: answers.needs.filter(n => n !== need) })
                  }
                }}
                className="w-5 h-5 rounded border-white/20 bg-white/5 text-azimut-red focus:ring-azimut-red focus:ring-2"
              />
              <span className="flex-1 font-sora text-sm text-slate-200 group-hover:text-slate-100">
                {need}
              </span>
            </label>
          ))}
        </div>

        <div className="flex gap-3 justify-end">
          {onCancel && (
            <button
              onClick={onCancel}
              className="px-6 py-2 rounded-lg border border-white/20 bg-transparent text-slate-300 hover:bg-white/5 transition-colors"
            >
              {t.cancel}
            </button>
          )}
          <button
            onClick={() => answers.needs.length > 0 && setStep(2)}
            disabled={answers.needs.length === 0}
            className="px-6 py-2 rounded-lg bg-azimut-red text-white hover:bg-azimut-red-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t.next}
          </button>
        </div>
      </div>
    )
  }

  // Step 2: Budget
  if (step === 2) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur">
        <div className="mb-6">
          <h2 className="mb-2 font-handel text-2xl uppercase tracking-[0.12em] text-slate-100">
            {t.step2Title}
          </h2>
          <p className="text-sm text-slate-400">{t.step2Subtitle}</p>
        </div>

        <div className="space-y-2 mb-6 max-h-[55vh] overflow-y-auto pr-2">
          {t.budgets.map((budget) => (
            <label
              key={budget.value}
              className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer group ${
                answers.budget === budget.value
                  ? 'border-azimut-red bg-azimut-red/10'
                  : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
              }`}
            >
              <input
                type="radio"
                name="budget"
                value={budget.value}
                checked={answers.budget === budget.value}
                onChange={(e) => {
                  setAnswers({
                    ...answers,
                    budget: e.target.value,
                    needsFunding: e.target.value === 'funding'
                  })
                }}
                className="w-4 h-4 border-white/20 bg-white/5 text-azimut-red focus:ring-azimut-red focus:ring-2 shrink-0"
              />
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <span className="text-xl shrink-0">{budget.icon}</span>
                <div className="flex-1 min-w-0">
                  <span className="font-sora text-[0.85rem] font-semibold text-slate-100 block">
                    {budget.label}
                  </span>
                  <p className="text-[0.7rem] text-slate-400 leading-tight">{budget.description}</p>
                </div>
              </div>
            </label>
          ))}
        </div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setStep(1)}
            className="px-6 py-2 rounded-lg border border-white/20 bg-transparent text-slate-300 hover:bg-white/5 transition-colors"
          >
            {t.back}
          </button>
          <button
            onClick={() => answers.budget && setStep(3)}
            disabled={!answers.budget}
            className="px-6 py-2 rounded-lg bg-azimut-red text-white hover:bg-azimut-red-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {t.next}
          </button>
        </div>
      </div>
    )
  }

  // Step 3: Context
  if (step === 3) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur">
        <div className="mb-6">
          <h2 className="mb-2 font-handel text-2xl uppercase tracking-[0.12em] text-slate-100">
            {t.step3Title}
          </h2>
          <p className="text-sm text-slate-400">{t.step3Subtitle}</p>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="block mb-2 text-sm font-sora font-semibold text-white">
              {t.locationLabel}
            </label>
            <input
              type="text"
              value={answers.location}
              onChange={(e) => setAnswers({ ...answers, location: e.target.value })}
              placeholder={lang === 'pt' ? 'Ex: Rio de Janeiro, BR' : lang === 'es' ? 'Ej: Río de Janeiro, BR' : 'Ex: Rio de Janeiro, BR'}
              className="input-adaptive"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-sora font-semibold text-white">
              {t.deadlineLabel}
            </label>
            <select
              value={answers.deadline}
              onChange={(e) => setAnswers({ ...answers, deadline: e.target.value })}
              className="dropdown-azimut"
            >
              <option value="">{lang === 'pt' ? 'Selecione...' : lang === 'es' ? 'Selecciona...' : 'Select...'}</option>
              {t.deadlineOptions.map((opt, idx) => (
                <option key={idx} value={opt}>{opt}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-sora font-semibold text-white">
              {t.audienceLabel}
            </label>
            <input
              type="text"
              value={answers.audience}
              onChange={(e) => setAnswers({ ...answers, audience: e.target.value })}
              placeholder={lang === 'pt' ? 'Ex: Famílias, estudantes, turistas...' : lang === 'es' ? 'Ej: Familias, estudiantes, turistas...' : 'Ex: Families, students, tourists...'}
              className="input-adaptive"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-sora font-semibold text-white">
              {t.objectiveLabel}
            </label>
            <textarea
              value={answers.objective}
              onChange={(e) => setAnswers({ ...answers, objective: e.target.value })}
              rows={4}
              placeholder={lang === 'pt' ? 'Descreva o objetivo principal do projeto...' : lang === 'es' ? 'Describe el objetivo principal del proyecto...' : 'Describe the main objective of the project...'}
              className="input-adaptive resize-none"
            />
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setStep(2)}
            className="px-6 py-2 rounded-lg border border-white/20 bg-transparent text-slate-300 hover:bg-white/5 transition-colors"
          >
            {t.back}
          </button>
          <button
            onClick={() => {
              // Detectar perfil baseado nas respostas
              let role: UserProfile['role'] = 'other'
              if (answers.needs.some(n => n.toLowerCase().includes('museu'))) role = 'museum'
              else if (answers.needs.some(n => n.toLowerCase().includes('marca') || n.toLowerCase().includes('evento'))) role = 'brand'
              else if (answers.needs.some(n => n.toLowerCase().includes('workshop') || n.toLowerCase().includes('formação'))) role = 'education'
              
              setAnswers({ ...answers, role })
              setStep(4)
            }}
            className="px-6 py-2 rounded-lg bg-azimut-red text-white hover:bg-azimut-red-light transition-colors"
          >
            {t.next}
          </button>
        </div>
      </div>
    )
  }

  // Step 4: Recommendations & Contact
  if (step === 4) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur">
        <div className="mb-6">
          <h2 className="mb-2 font-handel text-2xl uppercase tracking-[0.12em] text-slate-100">
            {t.step4Title}
          </h2>
          <p className="text-sm text-slate-400">{t.step4Subtitle}</p>
        </div>

        {/* Editais sugeridos em tempo real */}
        {recommendedEditais.length > 0 && (
          <div className="mb-6 space-y-2">
            <h3 className="font-sora text-[0.95rem] font-semibold uppercase tracking-[0.1em] text-white">
              {lang === 'pt'
                ? 'Possíveis editais para você'
                : lang === 'es'
                ? 'Posibles editais para ti'
                : 'Possible funds/grants for you'}
            </h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {recommendedEditais.map((edital) => {
                const label =
                  lang === 'pt' ? edital.name.pt : lang === 'es' ? edital.name.es : edital.name.en
                const countryLabel =
                  edital.country === 'BR'
                    ? 'Brasil'
                    : edital.country === 'CA'
                    ? 'Canadá'
                    : edital.country === 'EU'
                    ? 'Europa'
                    : edital.country === 'US'
                    ? 'EUA'
                    : 'Internacional'
                return (
                  <div
                    key={edital.id}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-2"
                  >
                    <p className="font-sora text-[0.9rem] text-white">{label}</p>
                    <p className="text-[0.8rem] text-slate-300">{countryLabel}</p>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* Mensagem padrão caso não haja sugestões */}
        {recommendedEditais.length === 0 && (
          <div className="mb-6 p-4 rounded-lg border border-azimut-red/30 bg-azimut-red/10">
            <p className="text-sm text-slate-200">
              {lang === 'pt'
                ? '📋 Com base no seu perfil, vamos preparar recomendações personalizadas de projetos e editais disponíveis.'
                : lang === 'es'
                ? '📋 Basado en tu perfil, prepararemos recomendaciones personalizadas de proyectos y editais disponibles.'
                : '📋 Based on your profile, we\'ll prepare personalized recommendations for projects and available editais.'}
            </p>
          </div>
        )}

        <div className="flex gap-3 justify-end">
          <button
            onClick={() => setStep(3)}
            className="px-6 py-2 rounded-lg border border-white/20 bg-transparent text-slate-300 hover:bg-white/5 transition-colors"
          >
            {t.back}
          </button>
          <button
            onClick={() => onComplete(answers)}
            className="px-6 py-2 rounded-lg bg-azimut-red text-white hover:bg-azimut-red-light transition-colors"
          >
            {t.finish}
          </button>
        </div>
      </div>
    )
  }

  return null
}

export default BudgetWizard

