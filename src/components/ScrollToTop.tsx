import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Componente que faz scroll automático para o topo ao trocar de rota
const ScrollToTop = () => {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

export default ScrollToTop
