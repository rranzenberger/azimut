// ════════════════════════════════════════════════════════════
// HOOK: useScrollAnimation - Anima seções quando entram na viewport
// ════════════════════════════════════════════════════════════
// Automático: Detecta elementos com opacity-0 e anima quando visíveis
// Melhora UX sem precisar configurar manualmente

import { useEffect, useRef } from 'react'

export const useScrollAnimation = () => {
  // Usar useRef para manter referência do observer entre renders
  const observerRef = useRef<IntersectionObserver | null>(null)
  // Flag para evitar re-inicialização
  const initializedRef = useRef(false)

  useEffect(() => {
    // Evitar re-inicialização se já foi feita
    if (initializedRef.current) return
    initializedRef.current = true
    
    // Aguardar um pouco para garantir que DOM está pronto
    const timeoutId = setTimeout(() => {
      try {
        // Criar Intersection Observer uma vez
        observerRef.current = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                try {
                  const element = entry.target as HTMLElement
                  // Remover opacity-0 e adicionar classe de animação
                  element.classList.remove('opacity-0')
                  element.classList.add('animate-fadeInUp')
                  // Desconectar após animar (só anima uma vez)
                  observerRef.current?.unobserve(element)
                } catch (e) {
                  // Silencioso - não quebrar se elemento não existir mais
                }
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
          try {
            observerRef.current?.observe(el)
          } catch (e) {
            // Silencioso
          }
        })
      } catch (e) {
        // Silencioso - IntersectionObserver pode não estar disponível
      }
    }, 100) // Pequeno delay para garantir DOM está pronto

    return () => {
      clearTimeout(timeoutId)
      try {
        observerRef.current?.disconnect()
      } catch (e) {
        // Silencioso
      }
    }
  }, [])

  // Retornar undefined ao invés de null para consistência
  return undefined
}
