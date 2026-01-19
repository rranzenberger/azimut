// ════════════════════════════════════════════════════════════
// ADVANCED VANCOUVER CALCULATOR
// ════════════════════════════════════════════════════════════
// Calculadora completa: VFS vs VanArts, ROI, Timeline, Comparações
// ════════════════════════════════════════════════════════════

import React, { useState } from 'react'
import { type Lang } from '../i18n'

interface CalculatorProps {
  lang: Lang
}

const AdvancedVancouverCalculator: React.FC<CalculatorProps> = ({ lang }) => {
  const [school, setSchool] = useState<'vanarts' | 'vfs'>('vanarts')
  const [program, setProgram] = useState('animation')
  const [housingType, setHousingType] = useState<'shared' | 'studio' | 'homestay'>('shared')
  const [lifestyle, setLifestyle] = useState<'basic' | 'moderate' | 'comfortable'>('moderate')
  
  // Dados de custos (CAD)
  const costs = {
    vanarts: {
      tuition: 28000,
      applicationFee: 150,
      duration: 12 // meses
    },
    vfs: {
      tuition: 42000,
      applicationFee: 150,
      duration: 12
    },
    housing: {
      shared: 800, // por mês
      studio: 1400,
      homestay: 900
    },
    lifestyle: {
      basic: 600, // por mês
      moderate: 900,
      comfortable: 1300
    },
    visa: 1500,
    insurance: 600, // por ano
    flights: 2000,
    misc: 1500
  }

  // Salários esperados (CAD/ano)
  const salaries = {
    animation: { junior: 45000, mid: 65000, senior: 90000 },
    vfx: { junior: 48000, mid: 70000, senior: 95000 },
    gameDesign: { junior: 50000, mid: 72000, senior: 100000 },
    film: { junior: 42000, mid: 60000, senior: 85000 }
  }

  // Cálculos
  const tuitionCost = school === 'vanarts' ? costs.vanarts.tuition : costs.vfs.tuition
  const duration = school === 'vanarts' ? costs.vanarts.duration : costs.vfs.duration
  const housingCost = costs.housing[housingType] * duration
  const lifestyleCost = costs.lifestyle[lifestyle] * duration
  const totalCost = tuitionCost + costs.visa + costs.insurance + costs.flights + costs.misc + housingCost + lifestyleCost

  const expectedSalary = salaries[program as keyof typeof salaries]?.junior || 45000
  const monthlyNet = (expectedSalary * 0.75) / 12 // 75% líquido após impostos
  const monthsToBreakEven = Math.ceil(totalCost / monthlyNet)
  const roi = ((expectedSalary - 30000) / totalCost) * 100 // vs salário Brasil (~30k CAD)

  const content = {
    pt: {
      title: 'Calculadora Avançada',
      subtitle: 'Compare custos, calcule ROI e veja quanto tempo para pagar o investimento',
      school: 'Escola',
      program: 'Programa',
      housing: 'Tipo de Moradia',
      lifestyle: 'Estilo de Vida',
      schools: {
        vanarts: 'VanArts (Mais acessível)',
        vfs: 'VFS (Mais intensivo)'
      },
      programs: {
        animation: '3D Animation',
        vfx: 'VFX',
        gameDesign: 'Game Design',
        film: 'Film Production'
      },
      housingTypes: {
        shared: 'Compartilhado (econômico)',
        studio: 'Studio (privado)',
        homestay: 'Homestay (com família)'
      },
      lifestyles: {
        basic: 'Básico (econômico)',
        moderate: 'Moderado (balanceado)',
        comfortable: 'Confortável (mais flexível)'
      },
      breakdown: 'Breakdown de Custos',
      tuition: 'Tuition (curso)',
      housingLabel: 'Moradia (12 meses)',
      food: 'Alimentação & Vida',
      visa: 'Visto & Seguro',
      misc: 'Passagens & Extras',
      total: 'INVESTIMENTO TOTAL',
      roi: 'ROI & Retorno',
      salary: 'Salário esperado (ano 1)',
      netMonthly: 'Líquido mensal',
      breakEven: 'Tempo para pagar investimento',
      months: 'meses',
      roiPercent: 'ROI (vs Brasil)',
      comparison: 'Comparação VFS vs VanArts',
      timeline: 'Timeline do Processo',
      timelineSteps: [
        { step: '0-3 meses', title: 'Preparação', desc: 'Portfolio + Inglês' },
        { step: '3-6 meses', title: 'Application', desc: 'Aprovação escola' },
        { step: '6-9 meses', title: 'Visto', desc: 'Study permit' },
        { step: '9-12 meses', title: 'Chegada', desc: 'Início das aulas' },
        { step: '12-24 meses', title: 'Formatura', desc: 'PGWP + Job hunt' },
        { step: '24+ meses', title: '💰 Trabalho', desc: 'Empregado!' }
      ],
      note: '💡 Valores em CAD (dólar canadense). Taxa atual: 1 CAD = R$ 3.70',
      ctaDownload: '📄 Baixar Relatório PDF',
      ctaContact: '💬 Falar com Consultor'
    },
    en: {
      title: 'Advanced Calculator',
      subtitle: 'Compare costs, calculate ROI and see how long to pay back investment',
      school: 'School',
      program: 'Program',
      housing: 'Housing Type',
      lifestyle: 'Lifestyle',
      schools: {
        vanarts: 'VanArts (More affordable)',
        vfs: 'VFS (More intensive)'
      },
      programs: {
        animation: '3D Animation',
        vfx: 'VFX',
        gameDesign: 'Game Design',
        film: 'Film Production'
      },
      housingTypes: {
        shared: 'Shared (budget-friendly)',
        studio: 'Studio (private)',
        homestay: 'Homestay (with family)'
      },
      lifestyles: {
        basic: 'Basic (budget)',
        moderate: 'Moderate (balanced)',
        comfortable: 'Comfortable (flexible)'
      },
      breakdown: 'Cost Breakdown',
      tuition: 'Tuition (course)',
      housingLabel: 'Housing (12 months)',
      food: 'Food & Living',
      visa: 'Visa & Insurance',
      misc: 'Flights & Extras',
      total: 'TOTAL INVESTMENT',
      roi: 'ROI & Return',
      salary: 'Expected salary (year 1)',
      netMonthly: 'Net monthly',
      breakEven: 'Time to break even',
      months: 'months',
      roiPercent: 'ROI (vs Brazil)',
      comparison: 'VFS vs VanArts Comparison',
      timeline: 'Process Timeline',
      timelineSteps: [
        { step: '0-3 months', title: 'Preparation', desc: 'Portfolio + English' },
        { step: '3-6 months', title: 'Application', desc: 'School approval' },
        { step: '6-9 months', title: 'Visa', desc: 'Study permit' },
        { step: '9-12 months', title: 'Arrival', desc: 'Classes start' },
        { step: '12-24 months', title: 'Graduation', desc: 'PGWP + Job hunt' },
        { step: '24+ months', title: '💰 Working', desc: 'Employed!' }
      ],
      note: '💡 Values in CAD (Canadian dollar). Current rate: 1 CAD = R$ 3.70',
      ctaDownload: '📄 Download PDF Report',
      ctaContact: '💬 Talk to Consultant'
    },
    es: {
      title: 'Calculadora Avanzada',
      subtitle: 'Compara costos, calcula ROI y ve cuánto tiempo para pagar la inversión',
      school: 'Escuela',
      program: 'Programa',
      housing: 'Tipo de Vivienda',
      lifestyle: 'Estilo de Vida',
      schools: {
        vanarts: 'VanArts (Más accesible)',
        vfs: 'VFS (Más intensivo)'
      },
      programs: {
        animation: 'Animación 3D',
        vfx: 'VFX',
        gameDesign: 'Diseño de Juegos',
        film: 'Producción Cinematográfica'
      },
      housingTypes: {
        shared: 'Compartido (económico)',
        studio: 'Studio (privado)',
        homestay: 'Homestay (con familia)'
      },
      lifestyles: {
        basic: 'Básico (económico)',
        moderate: 'Moderado (balanceado)',
        comfortable: 'Cómodo (flexible)'
      },
      breakdown: 'Desglose de Costos',
      tuition: 'Matrícula (curso)',
      housingLabel: 'Vivienda (12 meses)',
      food: 'Comida y Vida',
      visa: 'Visa y Seguro',
      misc: 'Vuelos y Extras',
      total: 'INVERSIÓN TOTAL',
      roi: 'ROI y Retorno',
      salary: 'Salario esperado (año 1)',
      netMonthly: 'Neto mensual',
      breakEven: 'Tiempo para recuperar inversión',
      months: 'meses',
      roiPercent: 'ROI (vs Brasil)',
      comparison: 'Comparación VFS vs VanArts',
      timeline: 'Cronología del Proceso',
      timelineSteps: [
        { step: '0-3 meses', title: 'Preparación', desc: 'Portfolio + Inglés' },
        { step: '3-6 meses', title: 'Solicitud', desc: 'Aprobación escuela' },
        { step: '6-9 meses', title: 'Visa', desc: 'Permiso de estudio' },
        { step: '9-12 meses', title: 'Llegada', desc: 'Inicio clases' },
        { step: '12-24 meses', title: 'Graduación', desc: 'PGWP + Búsqueda trabajo' },
        { step: '24+ meses', title: '💰 Trabajando', desc: '¡Empleado!' }
      ],
      note: '💡 Valores en CAD (dólar canadiense). Tasa actual: 1 CAD = R$ 3.70',
      ctaDownload: '📄 Descargar Informe PDF',
      ctaContact: '💬 Hablar con Consultor'
    },
    fr: {
      title: 'Calculateur Avancé',
      subtitle: 'Comparez les coûts, calculez le ROI et voyez combien de temps pour rembourser',
      school: 'École',
      program: 'Programme',
      housing: 'Type de Logement',
      lifestyle: 'Style de Vie',
      schools: {
        vanarts: 'VanArts (Plus abordable)',
        vfs: 'VFS (Plus intensif)'
      },
      programs: {
        animation: 'Animation 3D',
        vfx: 'VFX',
        gameDesign: 'Conception de Jeux',
        film: 'Production Cinématographique'
      },
      housingTypes: {
        shared: 'Partagé (économique)',
        studio: 'Studio (privé)',
        homestay: 'Homestay (avec famille)'
      },
      lifestyles: {
        basic: 'Basique (économique)',
        moderate: 'Modéré (équilibré)',
        comfortable: 'Confortable (flexible)'
      },
      breakdown: 'Répartition des Coûts',
      tuition: 'Frais de scolarité',
      housingLabel: 'Logement (12 mois)',
      food: 'Nourriture et Vie',
      visa: 'Visa et Assurance',
      misc: 'Vols et Extras',
      total: 'INVESTISSEMENT TOTAL',
      roi: 'ROI et Retour',
      salary: 'Salaire attendu (année 1)',
      netMonthly: 'Net mensuel',
      breakEven: 'Temps pour rentabiliser',
      months: 'mois',
      roiPercent: 'ROI (vs Brésil)',
      comparison: 'Comparaison VFS vs VanArts',
      timeline: 'Chronologie du Processus',
      timelineSteps: [
        { step: '0-3 mois', title: 'Préparation', desc: 'Portfolio + Anglais' },
        { step: '3-6 mois', title: 'Candidature', desc: 'Approbation école' },
        { step: '6-9 mois', title: 'Visa', desc: 'Permis d\'études' },
        { step: '9-12 mois', title: 'Arrivée', desc: 'Début des cours' },
        { step: '12-24 mois', title: 'Diplôme', desc: 'PGWP + Recherche emploi' },
        { step: '24+ mois', title: '💰 Travail', desc: 'Employé!' }
      ],
      note: '💡 Valeurs en CAD (dollar canadien). Taux actuel: 1 CAD = R$ 3.70',
      ctaDownload: '📄 Télécharger Rapport PDF',
      ctaContact: '💬 Parler à un Consultant'
    }
  }

  const t = content[lang] || content.pt

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      maximumFractionDigits: 0
    }).format(value)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-3xl font-handel uppercase text-white mb-3">
          {t.title}
        </h3>
        <p className="text-white/70">
          {t.subtitle}
        </p>
      </div>

      {/* Inputs */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* School */}
        <div>
          <label className="block text-sm font-semibold text-white/90 mb-2 uppercase">
            {t.school}
          </label>
          <select
            value={school}
            onChange={(e) => setSchool(e.target.value as any)}
            className="input-adaptive w-full"
          >
            <option value="vanarts">{t.schools.vanarts}</option>
            <option value="vfs">{t.schools.vfs}</option>
          </select>
        </div>

        {/* Program */}
        <div>
          <label className="block text-sm font-semibold text-white/90 mb-2 uppercase">
            {t.program}
          </label>
          <select
            value={program}
            onChange={(e) => setProgram(e.target.value)}
            className="input-adaptive w-full"
          >
            <option value="animation">{t.programs.animation}</option>
            <option value="vfx">{t.programs.vfx}</option>
            <option value="gameDesign">{t.programs.gameDesign}</option>
            <option value="film">{t.programs.film}</option>
          </select>
        </div>

        {/* Housing */}
        <div>
          <label className="block text-sm font-semibold text-white/90 mb-2 uppercase">
            {t.housing}
          </label>
          <select
            value={housingType}
            onChange={(e) => setHousingType(e.target.value as any)}
            className="input-adaptive w-full"
          >
            <option value="shared">{t.housingTypes.shared}</option>
            <option value="studio">{t.housingTypes.studio}</option>
            <option value="homestay">{t.housingTypes.homestay}</option>
          </select>
        </div>

        {/* Lifestyle */}
        <div>
          <label className="block text-sm font-semibold text-white/90 mb-2 uppercase">
            {t.lifestyle}
          </label>
          <select
            value={lifestyle}
            onChange={(e) => setLifestyle(e.target.value as any)}
            className="input-adaptive w-full"
          >
            <option value="basic">{t.lifestyles.basic}</option>
            <option value="moderate">{t.lifestyles.moderate}</option>
            <option value="comfortable">{t.lifestyles.comfortable}</option>
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Cost Breakdown */}
        <div className="card-adaptive p-6 rounded-xl border border-white/10">
          <h4 className="text-xl font-bold text-white mb-4 uppercase">
            💰 {t.breakdown}
          </h4>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-white/70">{t.tuition}</span>
              <span className="text-white font-semibold">{formatCurrency(tuitionCost)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-white/70">{t.housingLabel}</span>
              <span className="text-white font-semibold">{formatCurrency(housingCost)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-white/70">{t.food}</span>
              <span className="text-white font-semibold">{formatCurrency(lifestyleCost)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-white/70">{t.visa}</span>
              <span className="text-white font-semibold">{formatCurrency(costs.visa + costs.insurance)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-white/70">{t.misc}</span>
              <span className="text-white font-semibold">{formatCurrency(costs.flights + costs.misc)}</span>
            </div>
            
            <div className="flex justify-between items-center pt-4 border-t-2 border-azimut-red">
              <span className="text-white font-bold uppercase text-lg">{t.total}</span>
              <span className="text-azimut-red font-bold text-2xl">{formatCurrency(totalCost)}</span>
            </div>
          </div>
        </div>

        {/* ROI & Return */}
        <div className="card-adaptive p-6 rounded-xl border border-white/10">
          <h4 className="text-xl font-bold text-white mb-4 uppercase">
            📈 {t.roi}
          </h4>
          
          <div className="space-y-4">
            <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
              <div className="text-sm text-green-400 mb-1">{t.salary}</div>
              <div className="text-2xl font-bold text-white">{formatCurrency(expectedSalary)}</div>
            </div>

            <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <div className="text-sm text-blue-400 mb-1">{t.netMonthly}</div>
              <div className="text-2xl font-bold text-white">{formatCurrency(monthlyNet)}</div>
            </div>

            <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
              <div className="text-sm text-purple-400 mb-1">{t.breakEven}</div>
              <div className="text-2xl font-bold text-white">
                {monthsToBreakEven} {t.months}
                <span className="text-base text-white/60 ml-2">
                  (~{Math.ceil(monthsToBreakEven / 12)} anos)
                </span>
              </div>
            </div>

            <div className="p-4 bg-azimut-red/10 border border-azimut-red/30 rounded-lg">
              <div className="text-sm text-azimut-red mb-1">{t.roiPercent}</div>
              <div className="text-2xl font-bold text-white">
                +{roi.toFixed(0)}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="card-adaptive p-6 rounded-xl border border-white/10">
        <h4 className="text-xl font-bold text-white mb-6 uppercase text-center">
          ⏱️ {t.timeline}
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {t.timelineSteps.map((step, i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-azimut-red/20 border-2 border-azimut-red flex items-center justify-center text-azimut-red font-bold">
                {i + 1}
              </div>
              <div className="text-xs text-azimut-red mb-1">{step.step}</div>
              <div className="text-sm font-semibold text-white mb-1">{step.title}</div>
              <div className="text-xs text-white/60">{step.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Note - cores adaptáveis */}
      <div className="text-center text-sm font-medium" style={{ color: 'var(--theme-text-secondary)' }}>
        {t.note}
      </div>

      {/* CTAs - cores adaptáveis */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button
          onClick={() => alert('Download PDF em breve!')}
          className="px-8 py-4 font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
          style={{ 
            background: 'var(--theme-card-bg)',
            color: 'var(--theme-text)',
            border: '2px solid',
            borderColor: 'var(--theme-border)'
          }}
        >
          {t.ctaDownload}
        </button>
        
        <a
          href="#form"
          className="px-8 py-4 bg-azimut-red hover:bg-azimut-red/90 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-azimut-red/50 text-center"
        >
          {t.ctaContact}
        </a>
      </div>
    </div>
  )
}

export default AdvancedVancouverCalculator
