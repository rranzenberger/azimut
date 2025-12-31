import React, { useEffect, useState, useRef } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const location = useLocation()
  const hasCheckedRef = useRef(false)

  useEffect(() => {
    // Verificar autenticação de forma síncrona (não async para evitar delay)
    const checkAuth = () => {
      try {
        const authToken = sessionStorage.getItem('azimut_preview_auth')
        const authenticated = authToken === 'authenticated'
        
        // Log apenas em desenvolvimento
        if (import.meta.env.DEV) {
          console.log(`[ProtectedRoute] Verificando autenticação para: ${location.pathname}`)
          console.log(`[ProtectedRoute] Auth token: ${authToken ? 'presente' : 'ausente'}`)
          console.log(`[ProtectedRoute] Autenticado: ${authenticated}`)
        }
        
        setIsAuthenticated(authenticated)
      } catch (error) {
        // Se houver erro ao acessar sessionStorage, considerar não autenticado
        console.error('[ProtectedRoute] Erro ao verificar autenticação:', error)
        setIsAuthenticated(false)
      }
    }
    
    // Resetar ref quando a rota muda
    hasCheckedRef.current = false
    
    // Verificar imediatamente
    checkAuth()
  }, [location.pathname]) // Verificar quando a rota muda

  // Aguardar verificação inicial (apenas no primeiro render)
  if (isAuthenticated === null) {
    if (import.meta.env.DEV) {
      console.log(`[ProtectedRoute] Aguardando verificação para: ${location.pathname}`)
    }
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--theme-bg)' }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c92337] mx-auto mb-4"></div>
          <p style={{ color: 'var(--theme-text-secondary)' }}>Carregando...</p>
        </div>
      </div>
    )
  }

  // Se não autenticado, redirecionar para login
  if (!isAuthenticated) {
    console.log(`[ProtectedRoute] Não autenticado, redirecionando para /login de: ${location.pathname}`)
    // Evitar loop: só redirecionar se não estiver já na página de login
    if (location.pathname !== '/login') {
      return <Navigate to="/login" state={{ from: location }} replace />
    }
    // Se já está em /login, mostrar login (não redirecionar)
    return <>{children}</>
  }

  // Se autenticado, mostrar conteúdo protegido
  console.log(`[ProtectedRoute] Autenticado, mostrando conteúdo para: ${location.pathname}`)
  
  // Forçar re-render para garantir que o conteúdo seja exibido
  return (
    <div key={location.pathname}>
      {children}
    </div>
  )
}

export default ProtectedRoute

