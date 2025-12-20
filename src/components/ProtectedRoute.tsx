import React, { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const location = useLocation()

  useEffect(() => {
    // Verificar autenticação de forma síncrona (não async para evitar delay)
    const checkAuth = () => {
      try {
        const authToken = sessionStorage.getItem('azimut_preview_auth')
        const authenticated = authToken === 'authenticated'
        setIsAuthenticated(authenticated)
      } catch (error) {
        // Se houver erro ao acessar sessionStorage, considerar não autenticado
        console.warn('Erro ao verificar autenticação:', error)
        setIsAuthenticated(false)
      }
    }
    
    // Verificar imediatamente
    checkAuth()
  }, [location.pathname]) // Verificar quando a rota muda

  // Aguardar verificação inicial (apenas no primeiro render)
  if (isAuthenticated === null) {
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
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Se autenticado, mostrar conteúdo protegido
  return <>{children}</>
}

export default ProtectedRoute

