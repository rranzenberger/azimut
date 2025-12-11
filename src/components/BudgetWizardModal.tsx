import React, { useState } from 'react'
import { type Lang } from '../i18n'
import BudgetWizard, { type UserProfile } from './BudgetWizard'
import { trackBudgetWizard } from '../utils/analytics'

interface BudgetWizardModalProps {
  lang: Lang
  isOpen: boolean
  onClose: () => void
  onComplete: (profile: UserProfile) => void
}

const BudgetWizardModal: React.FC<BudgetWizardModalProps> = ({ lang, isOpen, onClose, onComplete }) => {
  if (!isOpen) return null

  const handleComplete = async (profile: UserProfile) => {
    // Track wizard completion
    trackBudgetWizard('completed', {
      budget: profile.budget || 'unknown',
      projectType: profile.projectType || 'unknown'
    })
    
    // Importar função de API que calcula score
    const { submitLead } = await import('../api/leads')
    const lead = await submitLead(profile)
    
    // Passar lead completo (já com score e priority)
    onComplete({
      ...profile,
      leadScore: lead.leadScore,
      priority: lead.priority,
      timestamp: lead.timestamp
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={() => {
            trackBudgetWizard('closed')
            onClose()
          }}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full border border-white/20 bg-white/5 hover:bg-white/10 transition-colors"
          aria-label={lang === 'pt' ? 'Fechar' : lang === 'es' ? 'Cerrar' : 'Close'}
        >
          <svg className="w-6 h-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Wizard */}
        <BudgetWizard
          lang={lang}
          onComplete={handleComplete}
          onCancel={onClose}
        />
      </div>
    </div>
  )
}

export default BudgetWizardModal

