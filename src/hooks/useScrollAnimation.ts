// ════════════════════════════════════════════════════════════
// HOOK: useScrollAnimation - Anima seções quando entram na viewport
// ════════════════════════════════════════════════════════════
// Automático: Detecta elementos com opacity-0 e anima quando visíveis
// Melhora UX sem precisar configurar manualmente

import { useEffect, useRef } from 'react'

export const useScrollAnimation = () => {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Criar Intersection Observer uma vez
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement
            // Remover opacity-0 e adicionar classe de animação
            element.classList.remove('opacity-0')
            element.classList.add('animate-fadeInUp')
            // Desconectar após animar (só anima uma vez)
            observerRef.current?.unobserve(element)
          }
        })
      },
      {
        rootMargin: '0px 0px -50px 0px', // Começar animação 50px antes de entrar
        threshold: 0.1 // 10% visível
      }
    )

    // Observar todos elementos com opacity-0
    const elements = document.querySelectorAll('.opacity-0')
    elements.forEach((el) => {
      observerRef.current?.observe(el)
    })

    return () => {
      observerRef.current?.disconnect()
    }
  }, [])

  return null
}
