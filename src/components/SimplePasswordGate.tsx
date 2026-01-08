import React, { useState, useEffect } from 'react'

interface SimplePasswordGateProps {
  children: React.ReactNode
}

const SimplePasswordGate: React.FC<SimplePasswordGateProps> = ({ children }) => {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [error, setError] = useState('')

  // Senha fixa (você pode mudar)
  const CORRECT_PASSWORD = 'a'

  // Verificar se já está autenticado (sessionStorage) OU se bypass está ativo
  useEffect(() => {
    // Verificar bypass do DevTools (login desligado)
    const bypassActive = localStorage.getItem('azimut-bypass-login') === 'true'
    const devBypassToken = localStorage.getItem('azimut-dev-bypass-token') === 'dev-mode-active'
    
    // Se bypass ativo, autenticar automaticamente
    if (bypassActive || devBypassToken) {
      console.log('🔓 Bypass ativo - Login automático')
      setIsAuthenticated(true)
      return
    }
    
    // Verificar autenticação normal
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

  // Tela de senha - REDESIGN PREMIUM
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Pattern de fundo */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(#c92337 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      {/* Estrela de fundo */}
      <div className="absolute right-0 bottom-0 w-[600px] h-[600px] opacity-10 pointer-events-none">
        <img 
          src="/logo-azimut-star.svg" 
          alt="" 
          className="w-full h-full object-contain"
        />
      </div>

      <div className="relative w-full max-w-md p-8 mx-4">
        {/* Card principal */}
        <div className="relative backdrop-blur-xl bg-slate-900/80 border border-white/10 rounded-2xl shadow-2xl p-8 animate-fade-in-up">
          {/* Glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-azimut-red/20 to-azimut-red/10 rounded-2xl blur opacity-30" />
          
          <div className="relative">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <img 
                  src="/logo-azimut-star.svg" 
                  alt="Azimut" 
                  className="h-24 w-24 animate-fade-in-up"
                  style={{ animationDelay: '0.1s' }}
                />
                <div className="absolute inset-0 animate-pulse">
                  <div className="h-full w-full rounded-full bg-azimut-red/20 blur-xl" />
                </div>
              </div>
            </div>

            {/* Título */}
            <div className="text-center mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-center gap-2 text-slate-400 text-sm mb-2">
                <span className="w-8 h-[2px] bg-gradient-to-r from-transparent to-azimut-red/50" />
                <span>Site em construção</span>
                <span className="w-8 h-[2px] bg-gradient-to-l from-transparent to-azimut-red/50" />
              </div>
              <p className="text-slate-500 text-xs uppercase tracking-wider">
                Acesso restrito
              </p>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                  Senha de acesso
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite a senha"
                    className="w-full px-4 py-3 rounded-lg bg-slate-950/50 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-azimut-red focus:ring-2 focus:ring-azimut-red/20 transition-all"
                    autoFocus
                  />
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                    <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                </div>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm animate-fade-in-up">
                  <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                className="relative w-full py-3 px-4 bg-azimut-red hover:bg-azimut-red/90 text-white font-handel rounded-lg transition-all duration-300 uppercase tracking-[0.15em] text-sm overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <span>Entrar</span>
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
                {/* Shine effect */}
                <span className="absolute inset-0 w-full h-full block bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 transform -translate-x-full group-hover:translate-x-full" />
              </button>
            </form>

            {/* Footer */}
            <div className="mt-6 text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <p className="text-xs text-slate-600">
                Em breve o site estará disponível publicamente
              </p>
              <div className="mt-4 flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-slate-500">Sistema online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Hint (opcional - pode remover) */}
        <div className="mt-6 text-center animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <p className="text-xs text-slate-700">
            💡 Dica: Use o DevTools (🔧) para desativar login durante testes
          </p>
        </div>
      </div>
    </div>
  )
}

export default SimplePasswordGate

