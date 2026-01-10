// ════════════════════════════════════════════════════════════
// VANCOUVER COST CALCULATOR - IA QUICK WIN #3
// ════════════════════════════════════════════════════════════
// Calculadora inteligente de custos para estudar em Vancouver
// Budget detalhado + Comparação com Brasil + Dicas de economia
// ════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react'
import { type Lang } from '../i18n'

interface CostCalculatorProps {
  lang: Lang
}

interface CostBreakdown {
  tuition: number
  housing: number
  food: number
  transport: number
  personal: number
  insurance: number
  visa: number
  total: number
  monthly: number
  currency: 'CAD' | 'BRL'
}

const VancouverCostCalculator: React.FC<CostCalculatorProps> = ({ lang }) => {
  const [school, setSchool] = useState<'vfs' | 'vanarts'>('vfs')
  const [program, setProgram] = useState<string>('animation')
  const [duration, setDuration] = useState<number>(12)
  const [housing, setHousing] = useState<'homestay' | 'shared' | 'studio'>('shared')
  const [lifestyle, setLifestyle] = useState<'basic' | 'comfortable' | 'premium'>('comfortable')
  const [showCurrency, setShowCurrency] = useState<'CAD' | 'BRL'>('CAD')
  
  const [costs, setCosts] = useState<CostBreakdown | null>(null)

  const content: Record<Lang, any> = {
    pt: {
      title: 'Calculadora de Custos Vancouver',
      subtitle: 'Descubra quanto custa estudar em Vancouver',
      
      inputs: {
        school: 'Escola',
        program: 'Programa',
        duration: 'Duração (meses)',
        housing: 'Acomodação',
        lifestyle: 'Estilo de Vida',
        currency: 'Moeda'
      },

      schools: {
        vfs: 'Vancouver Film School (VFS)',
        vanarts: 'Vancouver Institute of Media Arts (VanArts)'
      },

      programs: {
        animation: 'Animação 3D',
        vfx: 'Efeitos Visuais',
        game: 'Game Design',
        film: 'Produção de Cinema'
      },

      housingOptions: {
        homestay: 'Homestay (casa de família)',
        shared: 'Apartamento Compartilhado',
        studio: 'Studio Individual'
      },

      lifestyleOptions: {
        basic: 'Básico (econômico)',
        comfortable: 'Confortável (moderado)',
        premium: 'Premium (sem restrições)'
      },

      breakdown: {
        title: 'Breakdown de Custos',
        tuition: 'Mensalidade (Tuition)',
        housing: 'Moradia',
        food: 'Alimentação',
        transport: 'Transporte',
        personal: 'Gastos Pessoais',
        insurance: 'Seguro Saúde',
        visa: 'Visto & Documentos',
        subtotal: 'Subtotal',
        total: 'Total Estimado',
        monthly: 'Custo Mensal Médio'
      },

      comparison: {
        title: 'Comparação com Brasil',
        brazil: 'Universidade no Brasil',
        vancouver: 'Vancouver',
        duration: 'Duração',
        employability: 'Empregabilidade',
        experience: 'Experiência Internacional',
        portfolio: 'Portfólio',
        network: 'Network Global'
      },

      tips: {
        title: 'Dicas para Economizar',
        list: [
          '🏠 Comece com homestay e depois mude para compartilhado',
          '🍽️ Cozinhe em casa em vez de comer fora',
          '🚇 Use transporte público com passe mensal',
          '💼 Trabalhe meio período (permitido com visto de estudante)',
          '📚 Compre materiais usados ou digitais',
          '🎫 Aproveite descontos de estudante (cinema, museus)',
          '💰 Abra conta em banco canadense para evitar taxas'
        ]
      },

      cta: {
        button: 'Falar com Consultor',
        subtitle: 'Tire suas dúvidas sobre financiamento e bolsas'
      }
    },
    en: {
      title: 'Vancouver Cost Calculator',
      subtitle: 'Find out how much it costs to study in Vancouver',
      
      inputs: {
        school: 'School',
        program: 'Program',
        duration: 'Duration (months)',
        housing: 'Accommodation',
        lifestyle: 'Lifestyle',
        currency: 'Currency'
      },

      schools: {
        vfs: 'Vancouver Film School (VFS)',
        vanarts: 'Vancouver Institute of Media Arts (VanArts)'
      },

      programs: {
        animation: '3D Animation',
        vfx: 'Visual Effects',
        game: 'Game Design',
        film: 'Film Production'
      },

      housingOptions: {
        homestay: 'Homestay (host family)',
        shared: 'Shared Apartment',
        studio: 'Private Studio'
      },

      lifestyleOptions: {
        basic: 'Basic (economical)',
        comfortable: 'Comfortable (moderate)',
        premium: 'Premium (no restrictions)'
      },

      breakdown: {
        title: 'Cost Breakdown',
        tuition: 'Tuition',
        housing: 'Housing',
        food: 'Food',
        transport: 'Transport',
        personal: 'Personal Expenses',
        insurance: 'Health Insurance',
        visa: 'Visa & Documents',
        subtotal: 'Subtotal',
        total: 'Estimated Total',
        monthly: 'Average Monthly Cost'
      },

      comparison: {
        title: 'Comparison with Traditional University',
        brazil: 'University in Home Country',
        vancouver: 'Vancouver',
        duration: 'Duration',
        employability: 'Employability',
        experience: 'International Experience',
        portfolio: 'Portfolio',
        network: 'Global Network'
      },

      tips: {
        title: 'Money Saving Tips',
        list: [
          '🏠 Start with homestay then move to shared',
          '🍽️ Cook at home instead of eating out',
          '🚇 Use public transport with monthly pass',
          '💼 Work part-time (allowed with student visa)',
          '📚 Buy used or digital materials',
          '🎫 Take advantage of student discounts',
          '💰 Open Canadian bank account to avoid fees'
        ]
      },

      cta: {
        button: 'Talk to Consultant',
        subtitle: 'Learn about financing and scholarships'
      }
    },
    es: {} as any,
    fr: {} as any
  }

  const t = content[lang] || content.pt

  useEffect(() => {
    calculateCosts()
  }, [school, program, duration, housing, lifestyle, showCurrency])

  const calculateCosts = () => {
    // Valores base em CAD
    const tuitionRates: Record<string, Record<string, number>> = {
      vfs: { animation: 38000, vfx: 42000, game: 40000, film: 36000 },
      vanarts: { animation: 32000, vfx: 35000, game: 33000, film: 30000 }
    }

    const housingRates: Record<string, number> = {
      homestay: 900,
      shared: 700,
      studio: 1400
    }

    const lifestyleRates: Record<string, { food: number; personal: number }> = {
      basic: { food: 300, personal: 150 },
      comfortable: { food: 450, personal: 300 },
      premium: { food: 650, personal: 500 }
    }

    const tuitionTotal = tuitionRates[school][program]
    const monthlyHousing = housingRates[housing]
    const monthlyFood = lifestyleRates[lifestyle].food
    const monthlyPersonal = lifestyleRates[lifestyle].personal
    const monthlyTransport = 120 // Translink monthly pass
    const insurance = 75 * duration // Monthly health insurance
    const visa = 500 // Application fees

    const housingTotal = monthlyHousing * duration
    const foodTotal = monthlyFood * duration
    const transportTotal = monthlyTransport * duration
    const personalTotal = monthlyPersonal * duration

    const totalCAD = tuitionTotal + housingTotal + foodTotal + transportTotal + personalTotal + insurance + visa
    const monthlyCAD = Math.round(totalCAD / duration)

    if (showCurrency === 'BRL') {
      const exchangeRate = 4.0 // Aproximado
      setCosts({
        tuition: Math.round(tuitionTotal * exchangeRate),
        housing: Math.round(housingTotal * exchangeRate),
        food: Math.round(foodTotal * exchangeRate),
        transport: Math.round(transportTotal * exchangeRate),
        personal: Math.round(personalTotal * exchangeRate),
        insurance: Math.round(insurance * exchangeRate),
        visa: Math.round(visa * exchangeRate),
        total: Math.round(totalCAD * exchangeRate),
        monthly: Math.round(monthlyCAD * exchangeRate),
        currency: 'BRL'
      })
    } else {
      setCosts({
        tuition: tuitionTotal,
        housing: housingTotal,
        food: foodTotal,
        transport: transportTotal,
        personal: personalTotal,
        insurance,
        visa,
        total: totalCAD,
        monthly: monthlyCAD,
        currency: 'CAD'
      })
    }
  }

  const formatCurrency = (value: number) => {
    if (showCurrency === 'BRL') {
      return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(value)
    } else {
      return new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD'
      }).format(value)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-handel uppercase tracking-wider text-white mb-4">
          {t.title}
        </h2>
        <p className="text-xl text-white/70">{t.subtitle}</p>
      </div>

      {/* Inputs */}
      <div className="card-adaptive rounded-2xl p-8 border border-white/10">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* School */}
          <div>
            <label className="block text-sm font-semibold text-white/70 mb-2 uppercase tracking-wider">
              {t.inputs.school}
            </label>
            <select
              value={school}
              onChange={(e) => setSchool(e.target.value as 'vfs' | 'vanarts')}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-azimut-red focus:ring-2 focus:ring-azimut-red/50 transition-all"
            >
              <option value="vfs">{t.schools.vfs}</option>
              <option value="vanarts">{t.schools.vanarts}</option>
            </select>
          </div>

          {/* Program */}
          <div>
            <label className="block text-sm font-semibold text-white/70 mb-2 uppercase tracking-wider">
              {t.inputs.program}
            </label>
            <select
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-azimut-red focus:ring-2 focus:ring-azimut-red/50 transition-all"
            >
              {Object.entries(t.programs).map(([key, label]) => (
                <option key={key} value={key}>{label as string}</option>
              ))}
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className="block text-sm font-semibold text-white/70 mb-2 uppercase tracking-wider">
              {t.inputs.duration}
            </label>
            <input
              type="number"
              min="6"
              max="24"
              value={duration}
              onChange={(e) => setDuration(parseInt(e.target.value))}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-azimut-red focus:ring-2 focus:ring-azimut-red/50 transition-all"
            />
          </div>

          {/* Housing */}
          <div>
            <label className="block text-sm font-semibold text-white/70 mb-2 uppercase tracking-wider">
              {t.inputs.housing}
            </label>
            <select
              value={housing}
              onChange={(e) => setHousing(e.target.value as any)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-azimut-red focus:ring-2 focus:ring-azimut-red/50 transition-all"
            >
              {Object.entries(t.housingOptions).map(([key, label]) => (
                <option key={key} value={key}>{label as string}</option>
              ))}
            </select>
          </div>

          {/* Lifestyle */}
          <div>
            <label className="block text-sm font-semibold text-white/70 mb-2 uppercase tracking-wider">
              {t.inputs.lifestyle}
            </label>
            <select
              value={lifestyle}
              onChange={(e) => setLifestyle(e.target.value as any)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-azimut-red focus:ring-2 focus:ring-azimut-red/50 transition-all"
            >
              {Object.entries(t.lifestyleOptions).map(([key, label]) => (
                <option key={key} value={key}>{label as string}</option>
              ))}
            </select>
          </div>

          {/* Currency */}
          <div>
            <label className="block text-sm font-semibold text-white/70 mb-2 uppercase tracking-wider">
              {t.inputs.currency}
            </label>
            <select
              value={showCurrency}
              onChange={(e) => setShowCurrency(e.target.value as 'CAD' | 'BRL')}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:border-azimut-red focus:ring-2 focus:ring-azimut-red/50 transition-all"
            >
              <option value="CAD">CAD (Dólares Canadenses)</option>
              <option value="BRL">BRL (Reais)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Cost Breakdown */}
      {costs && (
        <div className="card-adaptive rounded-2xl p-8 border border-white/10">
          <h3 className="text-2xl font-bold text-white mb-6">{t.breakdown.title}</h3>
          
          <div className="space-y-4 mb-6">
            {[
              { label: t.breakdown.tuition, value: costs.tuition },
              { label: t.breakdown.housing, value: costs.housing },
              { label: t.breakdown.food, value: costs.food },
              { label: t.breakdown.transport, value: costs.transport },
              { label: t.breakdown.personal, value: costs.personal },
              { label: t.breakdown.insurance, value: costs.insurance },
              { label: t.breakdown.visa, value: costs.visa }
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                <span className="text-white/70">{item.label}</span>
                <span className="text-lg font-semibold text-white">{formatCurrency(item.value)}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-white/20 pt-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xl font-bold text-white">{t.breakdown.total}</span>
              <span className="text-4xl font-handel text-azimut-red">{formatCurrency(costs.total)}</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-azimut-red/10 rounded-lg">
              <span className="text-white/80">{t.breakdown.monthly}</span>
              <span className="text-2xl font-bold text-azimut-red">{formatCurrency(costs.monthly)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="card-adaptive rounded-2xl p-8 border border-white/10">
        <h3 className="text-2xl font-bold text-white mb-6">{t.tips.title}</h3>
        <div className="space-y-3">
          {t.tips.list.map((tip: string, idx: number) => (
            <div key={idx} className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
              <span className="text-xl flex-shrink-0">{tip.substring(0, 2)}</span>
              <span className="text-white/80">{tip.substring(3)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center">
        <p className="text-white/70 mb-6">{t.cta.subtitle}</p>
        <a
          href={`/${lang}/contact`}
          className="inline-flex items-center gap-3 px-10 py-5 bg-azimut-red hover:bg-azimut-red/90 text-white text-lg font-bold uppercase tracking-wider rounded-full transition-all hover:scale-105 hover:shadow-2xl hover:shadow-azimut-red/50"
        >
          {t.cta.button}
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  )
}

export default VancouverCostCalculator
