import { useState, useEffect } from 'react'

export default function DevToolsButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [debugMode, setDebugMode] = useState(false)
  const [showStats, setShowStats] = useState(false)

  useEffect(() => {
    // Carregar estado do localStorage
    const savedDebugMode = localStorage.getItem('azimut-debug-mode') === 'true'
    const savedShowStats = localStorage.getItem('azimut-show-stats') === 'true'
    
    setDebugMode(savedDebugMode)
    setShowStats(savedShowStats)
  }, [])

  const toggleDebugMode = () => {
    const newValue = !debugMode
    setDebugMode(newValue)
    localStorage.setItem('azimut-debug-mode', String(newValue))
    console.log('🔧 Debug Mode:', newValue)
  }

  const toggleShowStats = () => {
    const newValue = !showStats
    setShowStats(newValue)
    localStorage.setItem('azimut-show-stats', String(newValue))
    console.log('📊 Show Stats:', newValue)
  }

  const clearCache = () => {
    localStorage.clear()
    sessionStorage.clear()
    console.log('🗑️ Cache cleared!')
    alert('Cache limpo! A página será recarregada.')
    window.location.reload()
  }

  return (
    <>
      {/* Botão Flutuante - LADO ESQUERDO */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-[9999] w-14 h-14 rounded-full bg-slate-800 dark:bg-slate-700 text-white shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center border-2 border-slate-600"
        title="Dev Tools"
      >
        <span className="text-2xl">🔧</span>
      </button>

      {/* Painel de Ferramentas - LADO ESQUERDO */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-[9999] w-80 bg-slate-900 dark:bg-slate-800 rounded-xl shadow-2xl border-2 border-slate-700 p-4 animate-fade-in-up">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <span>🔧</span>
              <span>DEV TOOLS</span>
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white transition-colors text-xl"
            >
              ✕
            </button>
          </div>

          {/* Opções */}
          <div className="space-y-3">
            
            {/* Status do Site - INFORMATIVO */}
            <div className="p-3 rounded-lg bg-green-900/30 border border-green-700">
              <div className="flex items-center gap-2">
                <span className="text-green-400">🔓</span>
                <span className="text-sm font-medium text-white">Site ABERTO</span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Acesso direto sem senha para todos
              </p>
              <p className="text-xs text-yellow-500 mt-2">
                ⚠️ Para fechar: edite SITE_ABERTO no código
              </p>
            </div>

            {/* Debug Mode */}
            <label className="flex items-center justify-between p-3 rounded-lg bg-slate-800 dark:bg-slate-700 hover:bg-slate-700 dark:hover:bg-slate-600 cursor-pointer transition-colors">
              <span className="text-sm text-slate-300">
                🐛 Debug Mode
              </span>
              <input
                type="checkbox"
                checked={debugMode}
                onChange={toggleDebugMode}
                className="w-5 h-5 rounded border-slate-600 text-azimut-red focus:ring-2 focus:ring-azimut-red"
              />
            </label>

            {/* Show Stats */}
            <label className="flex items-center justify-between p-3 rounded-lg bg-slate-800 dark:bg-slate-700 hover:bg-slate-700 dark:hover:bg-slate-600 cursor-pointer transition-colors">
              <span className="text-sm text-slate-300">
                📊 Show Stats
              </span>
              <input
                type="checkbox"
                checked={showStats}
                onChange={toggleShowStats}
                className="w-5 h-5 rounded border-slate-600 text-azimut-red focus:ring-2 focus:ring-azimut-red"
              />
            </label>

            {/* Clear Cache */}
            <button
              onClick={clearCache}
              className="w-full p-3 rounded-lg bg-red-900/50 hover:bg-red-900 text-white text-sm transition-colors flex items-center justify-center gap-2"
            >
              <span>🗑️</span>
              <span>Limpar Cache</span>
            </button>

            {/* Info */}
            <div className="text-xs text-slate-500 text-center pt-2 border-t border-slate-700">
              Pressione ESC para fechar
            </div>
          </div>
        </div>
      )}

      {/* Fechar com ESC */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[9998]"
          onClick={() => setIsOpen(false)}
          onKeyDown={(e) => e.key === 'Escape' && setIsOpen(false)}
        />
      )}
    </>
  )
}
