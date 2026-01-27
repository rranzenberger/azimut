// ════════════════════════════════════════════════════════════
// INTENTION DEBUG PANEL - Painel de Debug Temporário
// ════════════════════════════════════════════════════════════
// Mostra informações de debug sobre detecção de intenção
// REMOVER EM PRODUÇÃO
// ════════════════════════════════════════════════════════════

import React from 'react'
import { useIntentionDetection } from '../hooks/useIntentionDetection'
import { useBehaviorTracking } from '../hooks/useBehaviorTracking'

const IntentionDebugPanel: React.FC = () => {
  const { intention, loading, error } = useIntentionDetection()
  const { behavior } = useBehaviorTracking()
  
  // Só mostrar em desenvolvimento
  if (import.meta.env.PROD) {
    return null
  }
  
  return (
    <div
      className="fixed bottom-4 right-4 z-[99998] max-w-sm bg-black/90 text-white p-4 rounded-lg text-xs font-mono border border-white/20"
      style={{ fontSize: '11px' }}
    >
      <div className="font-bold mb-2 text-yellow-400">🔍 DEBUG: Detecção de Intenção</div>
      
      <div className="space-y-1 mb-3">
        <div>
          <span className="text-gray-400">Loading:</span>{' '}
          <span className={loading ? 'text-yellow-400' : 'text-green-400'}>
            {loading ? '⏳ Sim' : '✅ Não'}
          </span>
        </div>
        
        {error && (
          <div>
            <span className="text-gray-400">Erro:</span>{' '}
            <span className="text-red-400">{error}</span>
          </div>
        )}
        
        {intention ? (
          <>
            <div>
              <span className="text-gray-400">Intenção:</span>{' '}
              <span className="text-cyan-400">{intention.intention}</span>
            </div>
            <div>
              <span className="text-gray-400">Confiança:</span>{' '}
              <span className={intention.confidence >= 0.7 ? 'text-green-400' : 'text-yellow-400'}>
                {(intention.confidence * 100).toFixed(0)}%
              </span>
            </div>
            <div>
              <span className="text-gray-400">CTA:</span>{' '}
              <span className="text-white">{intention.personalizedCTA}</span>
            </div>
            <div>
              <span className="text-gray-400">Tipo:</span>{' '}
              <span className="text-purple-400">{intention.visitorType || 'N/A'}</span>
            </div>
          </>
        ) : (
          <div className="text-gray-500">Nenhuma intenção detectada ainda</div>
        )}
      </div>
      
      <div className="border-t border-white/20 pt-2 mt-2">
        <div className="text-gray-400 mb-1">Comportamento:</div>
        <div className="space-y-0.5 text-gray-300">
          <div>Tempo na página: {behavior.timeOnPage}s</div>
          <div>Tempo no site: {behavior.timeOnSite}s</div>
          <div>Páginas: {behavior.pagesVisited.length}</div>
          <div>Categorias: {behavior.categoriesClicked.length}</div>
          <div>Projetos: {behavior.projectsViewed.length}</div>
          <div>Buscas: {behavior.searchesPerformed.length}</div>
        </div>
      </div>
    </div>
  )
}

export default IntentionDebugPanel
