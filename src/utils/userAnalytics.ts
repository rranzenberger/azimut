/**
 * Análise básica local para inferir interesses do usuário
 * Futuro: mover para backend/IA
 */

export function inferUserInterests() {
  if (typeof window === 'undefined') return []

  try {
    const session = JSON.parse(localStorage.getItem('azimut_user_session') || '{}')
    if (!session.pages) return []

    const interests: string[] = []

    // Tempo gasto por página
    session.pages.forEach((page: any) => {
      if (!page || !page.path) return
      if (page.timeSpent > 30) {
        if (page.path.includes('work')) interests.push('portfolio')
        if (page.path.includes('studio')) interests.push('team')
        if (page.path.includes('academy')) interests.push('education')
        if (page.path.includes('research')) interests.push('research')
      }
    })

    // Interações explícitas
    if (session.interactions) {
      session.interactions.forEach((interaction: any) => {
        if (!interaction || !interaction.type) return
        if (interaction.type === 'project_view') interests.push('portfolio')
        if (interaction.type === 'service_view') interests.push('services')
        if (interaction.type === 'cta_click') interests.push('cta_engagement')
        if (interaction.type === 'language_change') interests.push('multilang')
      })
    }

    return Array.from(new Set(interests))
  } catch {
    return []
  }
}

























