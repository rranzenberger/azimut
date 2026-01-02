import React, { useState, useEffect } from 'react'

interface SimplePasswordGateProps {
  children: React.ReactNode
}

const SimplePasswordGate: React.FC<SimplePasswordGateProps> = ({ children }) => {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState('')

  // Senha fixa (você pode mudar)
  const CORRECT_PASSWORD = 'azimut2025'

  // Verificar se já está autenticado (sessionStorage)
  useEffect(() => {
    const authenticated = sessionStorage.getItem('azimut_preview_auth')
    if (authenticated === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password === CORRECT_PASSWORD) {
      sessionStorage.setItem('azimut_preview_auth', 'true')
      setIsAuthenticated(true)
      setError('')
    } else {
      setError('Senha incorreta')
      setPassword('')
    }
  }

  // Se já autenticado, mostrar conteúdo
  if (isAuthenticated) {
    return <>{children}</>
  }

  // Tela de senha
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#0a0e18] to-[#1a1f2e]">
      <div className="w-full max-w-md p-8 mx-4 rounded-2xl bg-[#0f1419] border border-white/10 shadow-2xl">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img 
            src="/logo-azimut-symbol.svg" 
            alt="Azimut" 
            className="h-16 w-16 opacity-90"
          />
        </div>

        <h1 className="text-2xl font-handel text-white text-center mb-2 uppercase tracking-wider">
          Preview
        </h1>
        <p className="text-slate-400 text-center mb-8 text-sm">
          Site em construção • Acesso restrito
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
              Senha de acesso
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite a senha"
              className="w-full px-4 py-3 rounded-lg bg-[#1a1f2e] border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-azimut-red transition-colors"
              autoFocus
            />
          </div>

          {error && (
            <p className="text-red-400 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 bg-azimut-red hover:bg-azimut-red/90 text-white font-semibold rounded-lg transition-colors uppercase tracking-wider text-sm"
          >
            Entrar
          </button>
        </form>

        <p className="mt-6 text-xs text-slate-500 text-center">
          Em breve o site estará disponível publicamente
        </p>
      </div>
    </div>
  )
}

export default SimplePasswordGate

