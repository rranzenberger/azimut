import React from 'react'
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
    await trackBudgetWizard({
      completed: true,
      budget: profile.budget || 'unknown',
      category: profile.needs?.join(', ') || 'unknown'
    })
    
    // Passar lead para o componente pai (Contact.tsx) que já sabe enviar
    onComplete(profile)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={() => {
            trackBudgetWizard({ completed: false })
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

