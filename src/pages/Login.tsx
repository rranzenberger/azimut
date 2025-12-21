import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

// Layout não é necessário na página de login

const Login: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    // Verificar se já está autenticado
    const authToken = sessionStorage.getItem('azimut_preview_auth')
    if (authToken === 'authenticated') {
      const returnTo = location.state?.from || '/'
      navigate(returnTo, { replace: true })
    }
  }, [navigate, location])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Credenciais para preview (pode ser configurado via variáveis de ambiente)
    // Em produção, isso viria de uma API segura
    const validUsername = import.meta.env.VITE_PREVIEW_USER || 'azimut'
    const validPassword = import.meta.env.VITE_PREVIEW_PASS || 'Azimut2025!Preview'

    // Simular delay de API (UX)
    await new Promise(resolve => setTimeout(resolve, 600))

    if (username.trim() === validUsername && password === validPassword) {
      // Autenticar e salvar sessão
      sessionStorage.setItem('azimut_preview_auth', 'authenticated')
      const returnTo = (location.state as any)?.from?.pathname || '/'
      // Navegar sem reload - React Router já atualiza tudo
      navigate(returnTo, { replace: true })
    } else {
      setError('Credenciais inválidas. Tente novamente.')
      setLoading(false)
      setPassword('') // Limpar senha em caso de erro
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{ 
      background: 'var(--theme-bg)',
      backgroundImage: `
        radial-gradient(ellipse at top, rgba(201, 35, 55, 0.1) 0%, transparent 50%),
        linear-gradient(135deg, var(--theme-bg) 0%, var(--theme-bg-secondary) 100%)
      `
    }}>
      {/* Estrela de fundo */}
      <img 
        src="/logo-azimut-star.svg" 
        alt="Azimut" 
        className="absolute -right-28 -bottom-40 md:-right-40 md:-bottom-60 h-[520px] w-[520px] md:h-[680px] md:w-[680px] opacity-[0.15] pointer-events-none -z-5"
      />

      {/* Card de Login */}
      <div className="relative z-10 w-full max-w-md px-6">
        <div 
          className="backdrop-blur-sm rounded-lg border p-8 shadow-2xl"
          style={{
            background: 'var(--theme-card-bg)',
            borderColor: 'var(--theme-border)',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.5), 0 0 40px rgba(201, 35, 55, 0.1)'
          }}
        >
          {/* Logo e Slogan - Minimalista */}
          <div className="text-center mb-10">
            <div className="mb-8">
              <img 
                src="/azimut-logo-horizontal.svg" 
                alt="Azimut"
                className="h-14 mx-auto opacity-95"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
            <div 
              className="text-sm font-sora uppercase tracking-[0.14em] leading-relaxed"
              style={{ color: 'var(--theme-text-secondary)', letterSpacing: '0.14em' }}
            >
              <span className="block">EXPERIENCES THAT CONNECT WORLDS</span>
            </div>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campo Usuário */}
            <div>
              <label 
                htmlFor="username"
                className="block text-sm mb-2 uppercase tracking-[0.1em]"
                style={{ color: 'var(--theme-text-secondary)' }}
              >
                Usuário
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
                className="w-full px-4 py-3 rounded border transition-all focus:outline-none"
                style={{
                  background: 'var(--theme-bg-secondary)',
                  borderColor: 'var(--theme-border)',
                  color: 'var(--theme-text)'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#c92337'
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201, 35, 55, 0.2)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--theme-border)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
                placeholder="Digite seu usuário"
              />
            </div>

            {/* Campo Senha */}
            <div>
              <label 
                htmlFor="password"
                className="block text-sm mb-2 uppercase tracking-[0.1em]"
                style={{ color: 'var(--theme-text-secondary)' }}
              >
                Senha
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded border transition-all focus:outline-none"
                style={{
                  background: 'var(--theme-bg-secondary)',
                  borderColor: 'var(--theme-border)',
                  color: 'var(--theme-text)'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#c92337'
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(201, 35, 55, 0.2)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = 'var(--theme-border)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
                placeholder="Digite sua senha"
              />
            </div>

            {/* Erro */}
            {error && (
              <div 
                className="px-4 py-3 rounded text-sm text-center"
                style={{
                  background: 'rgba(201, 35, 55, 0.15)',
                  borderColor: '#c92337',
                  border: '1px solid',
                  color: '#c92337'
                }}
              >
                {error}
              </div>
            )}

            {/* Botão Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-6 rounded font-handel uppercase tracking-[0.15em] text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg"
              style={{
                background: loading ? '#8B2332' : '#c92337',
                color: '#ffffff',
                boxShadow: loading ? 'none' : '0 0 20px rgba(201, 35, 55, 0.3)'
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.boxShadow = '0 0 30px rgba(201, 35, 55, 0.5)'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(201, 35, 55, 0.3)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }
              }}
            >
              {loading ? 'Verificando...' : 'Entrar'}
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default Login

