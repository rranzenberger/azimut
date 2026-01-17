// ════════════════════════════════════════════════════════════
// 🎮 SISTEMA DE GAMIFICAÇÃO TOTAL - AZIMUT
// ════════════════════════════════════════════════════════════
// Transforma a navegação do site em uma jornada premiada
// Sistema de pontos, badges, níveis e conquistas
// ════════════════════════════════════════════════════════════

import { trackBehavior } from './analytics'

// ═══════════════════════════════════════════════════════════
// 🏆 TIPOS E INTERFACES
// ═══════════════════════════════════════════════════════════

export interface UserProgress {
  totalPoints: number
  level: number
  xp: number
  xpToNextLevel: number
  badges: Badge[]
  achievements: Achievement[]
  streak: number // Dias consecutivos
  lastVisit: string
  stats: UserStats
}

export interface Badge {
  id: string
  name: string
  description: string
  emoji: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
  unlockedAt: string
  category: 'explorer' | 'learner' | 'social' | 'expert' | 'special'
}

export interface Achievement {
  id: string
  name: string
  description: string
  progress: number
  total: number
  completed: boolean
  reward: number // Pontos
  emoji: string
}

export interface UserStats {
  pagesVisited: number
  projectsViewed: number
  videosWatched: number
  quizzesCompleted: number
  formsSubmitted: number
  sharesCount: number
  timeSpent: number // segundos
  scrollDepth: number // média %
}

// ═══════════════════════════════════════════════════════════
// 📊 SISTEMA DE PONTOS E XP
// ═══════════════════════════════════════════════════════════

const POINTS_CONFIG = {
  // Navegação
  pageView: 5,
  firstTimeVisitor: 50,
  returningVisitor: 20,
  deepScroll: 10, // Scroll > 80%
  longVisit: 15, // > 2 minutos na mesma página
  
  // Interações
  projectView: 10,
  projectLike: 15,
  videoPlay: 20,
  videoComplete: 50,
  quizStart: 25,
  quizComplete: 100,
  formStart: 30,
  formComplete: 150,
  
  // Social
  share: 50,
  download: 30,
  
  // Academy
  courseView: 15,
  alumniStory: 20,
  calculateBudget: 40,
  contactAgent: 100,
  
  // Especial
  pwaDnstall: 200,
  referFriend: 300,
  becomeClient: 1000,
}

const LEVELS = [
  { level: 1, name: 'Explorador', xpNeeded: 0, emoji: '🌱' },
  { level: 2, name: 'Curioso', xpNeeded: 200, emoji: '👀' },
  { level: 3, name: 'Interessado', xpNeeded: 500, emoji: '🔍' },
  { level: 4, name: 'Engajado', xpNeeded: 1000, emoji: '⚡' },
  { level: 5, name: 'Entusiasta', xpNeeded: 2000, emoji: '🎯' },
  { level: 6, name: 'Expert', xpNeeded: 4000, emoji: '🏆' },
  { level: 7, name: 'Master', xpNeeded: 8000, emoji: '👑' },
  { level: 8, name: 'Legend', xpNeeded: 15000, emoji: '⭐' },
  { level: 9, name: 'Azimut Pro', xpNeeded: 25000, emoji: '💎' },
  { level: 10, name: 'Azimut Elite', xpNeeded: 50000, emoji: '🌟' },
]

// ═══════════════════════════════════════════════════════════
// 🎖️ BADGES DISPONÍVEIS
// ═══════════════════════════════════════════════════════════

export const BADGES_DATABASE: Omit<Badge, 'unlockedAt'>[] = [
  // EXPLORER
  { id: 'first_visit', name: 'Primeira Visita', description: 'Visitou o site pela primeira vez', emoji: '👋', rarity: 'common', category: 'explorer' },
  { id: 'page_explorer', name: 'Explorador', description: 'Visitou 5 páginas diferentes', emoji: '🗺️', rarity: 'common', category: 'explorer' },
  { id: 'deep_diver', name: 'Mergulhador', description: 'Rolou até o final de 10 páginas', emoji: '🤿', rarity: 'rare', category: 'explorer' },
  { id: 'time_traveler', name: 'Viajante do Tempo', description: 'Passou mais de 30 minutos no site', emoji: '⏰', rarity: 'rare', category: 'explorer' },
  { id: 'marathon', name: 'Maratonista', description: 'Visitou 20+ páginas em uma sessão', emoji: '🏃', rarity: 'epic', category: 'explorer' },
  
  // LEARNER (Academy)
  { id: 'curious_mind', name: 'Mente Curiosa', description: 'Visitou a Academy', emoji: '🎓', rarity: 'common', category: 'learner' },
  { id: 'quiz_master', name: 'Mestre dos Quizzes', description: 'Completou 3 quizzes', emoji: '🧠', rarity: 'rare', category: 'learner' },
  { id: 'budget_planner', name: 'Planejador', description: 'Usou a calculadora de orçamento', emoji: '💰', rarity: 'common', category: 'learner' },
  { id: 'vancouver_dreamer', name: 'Sonhador de Vancouver', description: 'Explorou a página Vancouver', emoji: '🇨🇦', rarity: 'common', category: 'learner' },
  { id: 'school_expert', name: 'Expert em Escolas', description: 'Completou o quiz VFS vs VanArts', emoji: '🏫', rarity: 'rare', category: 'learner' },
  
  // SOCIAL
  { id: 'sharer', name: 'Compartilhador', description: 'Compartilhou conteúdo', emoji: '🔗', rarity: 'common', category: 'social' },
  { id: 'viral', name: 'Viral', description: 'Compartilhou 5+ vezes', emoji: '🚀', rarity: 'rare', category: 'social' },
  { id: 'influencer', name: 'Influencer', description: 'Referiu 3+ amigos', emoji: '📣', rarity: 'epic', category: 'social' },
  
  // EXPERT (Projetos)
  { id: 'project_viewer', name: 'Crítico', description: 'Viu 5 projetos', emoji: '🎬', rarity: 'common', category: 'expert' },
  { id: 'cinephile', name: 'Cinéfilo', description: 'Assistiu 5 vídeos completos', emoji: '🍿', rarity: 'rare', category: 'expert' },
  { id: 'portfolio_master', name: 'Mestre do Portfolio', description: 'Viu todos os projetos featured', emoji: '🏆', rarity: 'epic', category: 'expert' },
  { id: 'vr_enthusiast', name: 'Entusiasta VR', description: 'Explorou 10+ projetos VR/XR', emoji: '🥽', rarity: 'rare', category: 'expert' },
  
  // SPECIAL
  { id: 'early_bird', name: 'Madrugador', description: 'Visitou entre 5h-7h', emoji: '🌅', rarity: 'rare', category: 'special' },
  { id: 'night_owl', name: 'Coruja', description: 'Visitou entre 0h-4h', emoji: '🦉', rarity: 'rare', category: 'special' },
  { id: 'multilingual', name: 'Poliglota', description: 'Viu o site em 3 idiomas', emoji: '🌍', rarity: 'epic', category: 'special' },
  { id: 'pwa_user', name: 'Power User', description: 'Instalou o PWA', emoji: '📱', rarity: 'epic', category: 'special' },
  { id: 'loyal', name: 'Leal', description: '7 dias consecutivos', emoji: '💎', rarity: 'legendary', category: 'special' },
  { id: 'legend', name: 'Lenda', description: 'Alcançou nível máximo', emoji: '🌟', rarity: 'legendary', category: 'special' },
  { id: 'client', name: 'Cliente Azimut', description: 'Tornou-se cliente!', emoji: '🤝', rarity: 'legendary', category: 'special' },
]

// ═══════════════════════════════════════════════════════════
// 🎯 ACHIEVEMENTS (Conquistas)
// ═══════════════════════════════════════════════════════════

export const ACHIEVEMENTS_DATABASE: Omit<Achievement, 'progress' | 'completed'>[] = [
  { id: 'page_explorer', name: 'Explorador', description: 'Visite 10 páginas diferentes', total: 10, reward: 100, emoji: '🗺️' },
  { id: 'video_watcher', name: 'Cinéfilo', description: 'Assista 5 vídeos', total: 5, reward: 150, emoji: '🎬' },
  { id: 'quiz_champion', name: 'Campeão de Quizzes', description: 'Complete 5 quizzes', total: 5, reward: 200, emoji: '🏆' },
  { id: 'social_butterfly', name: 'Borboleta Social', description: 'Compartilhe 3 vezes', total: 3, reward: 100, emoji: '🦋' },
  { id: 'deep_reader', name: 'Leitor Profundo', description: 'Role até o final de 15 páginas', total: 15, reward: 150, emoji: '📚' },
  { id: 'time_master', name: 'Mestre do Tempo', description: 'Passe 1 hora total no site', total: 3600, reward: 250, emoji: '⏱️' },
  { id: 'project_connoisseur', name: 'Conhecedor', description: 'Veja 20 projetos', total: 20, reward: 200, emoji: '🎨' },
  { id: 'academy_scholar', name: 'Acadêmico', description: 'Visite todas as páginas Academy', total: 4, reward: 300, emoji: '🎓' },
  { id: 'multilingual_pro', name: 'Poliglota Pro', description: 'Veja o site nos 4 idiomas', total: 4, reward: 400, emoji: '🌐' },
  { id: 'completionist', name: 'Completista', description: 'Desbloqueie todos os badges', total: 20, reward: 1000, emoji: '💯' },
]

// ═══════════════════════════════════════════════════════════
// 💾 STORAGE E PERSISTÊNCIA
// ═══════════════════════════════════════════════════════════

const STORAGE_KEY = 'azimut_gamification'

export function loadProgress(): UserProgress {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const progress = JSON.parse(stored)
      // Atualizar streak
      progress.streak = calculateStreak(progress.lastVisit)
      progress.lastVisit = new Date().toISOString()
      saveProgress(progress)
      return progress
    }
  } catch (e) {
    console.warn('Erro ao carregar progresso:', e)
  }
  
  // Primeiro acesso
  return {
    totalPoints: 0,
    level: 1,
    xp: 0,
    xpToNextLevel: 200,
    badges: [],
    achievements: ACHIEVEMENTS_DATABASE.map(a => ({ ...a, progress: 0, completed: false })),
    streak: 1,
    lastVisit: new Date().toISOString(),
    stats: {
      pagesVisited: 0,
      projectsViewed: 0,
      videosWatched: 0,
      quizzesCompleted: 0,
      formsSubmitted: 0,
      sharesCount: 0,
      timeSpent: 0,
      scrollDepth: 0,
    }
  }
}

export function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch (e) {
    console.warn('Erro ao salvar progresso:', e)
  }
}

// ═══════════════════════════════════════════════════════════
// 🎮 FUNÇÕES DE GAMIFICAÇÃO
// ═══════════════════════════════════════════════════════════

export function addPoints(
  action: keyof typeof POINTS_CONFIG,
  metadata?: Record<string, any>
): { 
  progress: UserProgress, 
  levelUp: boolean, 
  newBadges: Badge[],
  newAchievements: Achievement[]
} {
  const progress = loadProgress()
  const points = POINTS_CONFIG[action] || 0
  
  // Adicionar pontos e XP
  progress.totalPoints += points
  progress.xp += points
  
  // Verificar level up
  const levelUp = checkLevelUp(progress)
  
  // Verificar novos badges
  const newBadges = checkNewBadges(progress, action, metadata)
  
  // Verificar achievements
  const newAchievements = updateAchievements(progress, action, metadata)
  
  // Salvar
  saveProgress(progress)
  
  // Track gamification event
  trackBehavior('gamification', {
    element: action,
    value: points.toString(),
    metadata: {
      totalPoints: progress.totalPoints,
      level: progress.level,
      newBadges: newBadges.map(b => b.id),
      newAchievements: newAchievements.map(a => a.id),
    }
  })
  
  return { progress, levelUp, newBadges, newAchievements }
}

function checkLevelUp(progress: UserProgress): boolean {
  const nextLevel = LEVELS.find(l => l.level === progress.level + 1)
  if (!nextLevel) return false
  
  if (progress.xp >= nextLevel.xpNeeded) {
    progress.level = nextLevel.level
    progress.xpToNextLevel = LEVELS.find(l => l.level === progress.level + 1)?.xpNeeded || 99999
    
    // Badge de level up
    if (progress.level === 10) {
      unlockBadge(progress, 'legend')
    }
    
    return true
  }
  
  // Atualizar XP para próximo nível
  const currentLevel = LEVELS.find(l => l.level === progress.level)
  if (currentLevel && nextLevel) {
    progress.xpToNextLevel = nextLevel.xpNeeded - progress.xp
  }
  
  return false
}

function checkNewBadges(
  progress: UserProgress, 
  action: string, 
  metadata?: Record<string, any>
): Badge[] {
  const newBadges: Badge[] = []
  
  // Verificar condições de badges
  const checks: Array<{ condition: boolean, badgeId: string }> = [
    { condition: progress.stats.pagesVisited === 1, badgeId: 'first_visit' },
    { condition: progress.stats.pagesVisited >= 5, badgeId: 'page_explorer' },
    { condition: progress.stats.pagesVisited >= 20, badgeId: 'marathon' },
    { condition: action === 'deepScroll' && metadata?.count >= 10, badgeId: 'deep_diver' },
    { condition: progress.stats.timeSpent >= 1800, badgeId: 'time_traveler' },
    { condition: action.includes('course') || action.includes('academy'), badgeId: 'curious_mind' },
    { condition: progress.stats.quizzesCompleted >= 3, badgeId: 'quiz_master' },
    { condition: action === 'calculateBudget', badgeId: 'budget_planner' },
    { condition: metadata?.page === 'vancouver', badgeId: 'vancouver_dreamer' },
    { condition: progress.stats.sharesCount >= 1, badgeId: 'sharer' },
    { condition: progress.stats.sharesCount >= 5, badgeId: 'viral' },
    { condition: progress.stats.projectsViewed >= 5, badgeId: 'project_viewer' },
    { condition: progress.stats.videosWatched >= 5, badgeId: 'cinephile' },
    { condition: action === 'pwaInstall', badgeId: 'pwa_user' },
    { condition: progress.streak >= 7, badgeId: 'loyal' },
  ]
  
  for (const check of checks) {
    if (check.condition && !progress.badges.find(b => b.id === check.badgeId)) {
      const badge = unlockBadge(progress, check.badgeId)
      if (badge) newBadges.push(badge)
    }
  }
  
  return newBadges
}

function unlockBadge(progress: UserProgress, badgeId: string): Badge | null {
  const badgeData = BADGES_DATABASE.find(b => b.id === badgeId)
  if (!badgeData) return null
  
  const badge: Badge = {
    ...badgeData,
    unlockedAt: new Date().toISOString()
  }
  
  progress.badges.push(badge)
  
  // Pontos extras por badge
  const rarityBonus = {
    common: 50,
    rare: 100,
    epic: 200,
    legendary: 500
  }
  progress.totalPoints += rarityBonus[badge.rarity]
  progress.xp += rarityBonus[badge.rarity]
  
  return badge
}

function updateAchievements(
  progress: UserProgress, 
  action: string, 
  metadata?: Record<string, any>
): Achievement[] {
  const completed: Achievement[] = []
  
  for (const achievement of progress.achievements) {
    if (achievement.completed) continue
    
    // Atualizar progresso baseado na ação
    if (achievement.id === 'page_explorer') {
      achievement.progress = progress.stats.pagesVisited
    } else if (achievement.id === 'video_watcher') {
      achievement.progress = progress.stats.videosWatched
    } else if (achievement.id === 'quiz_champion') {
      achievement.progress = progress.stats.quizzesCompleted
    } else if (achievement.id === 'social_butterfly') {
      achievement.progress = progress.stats.sharesCount
    } else if (achievement.id === 'time_master') {
      achievement.progress = progress.stats.timeSpent
    } else if (achievement.id === 'project_connoisseur') {
      achievement.progress = progress.stats.projectsViewed
    }
    
    // Verificar se completou
    if (achievement.progress >= achievement.total && !achievement.completed) {
      achievement.completed = true
      progress.totalPoints += achievement.reward
      progress.xp += achievement.reward
      completed.push(achievement)
    }
  }
  
  return completed
}

function calculateStreak(lastVisit: string): number {
  const last = new Date(lastVisit)
  const now = new Date()
  const diffDays = Math.floor((now.getTime() - last.getTime()) / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return 1 // Mesmo dia
  if (diffDays === 1) return 1 // Consecutivo
  if (diffDays > 1) return 1 // Quebrou streak
  
  return 1
}

// ═══════════════════════════════════════════════════════════
// 🎯 HELPERS
// ═══════════════════════════════════════════════════════════

export function getCurrentLevel(progress: UserProgress) {
  return LEVELS.find(l => l.level === progress.level) || LEVELS[0]
}

export function getNextLevel(progress: UserProgress) {
  return LEVELS.find(l => l.level === progress.level + 1)
}

export function getProgressPercentage(progress: UserProgress): number {
  const current = getCurrentLevel(progress)
  const next = getNextLevel(progress)
  
  if (!next) return 100
  
  const xpInCurrentLevel = progress.xp - current.xpNeeded
  const xpNeededForNext = next.xpNeeded - current.xpNeeded
  
  return Math.min(100, Math.round((xpInCurrentLevel / xpNeededForNext) * 100))
}

export function getRarityColor(rarity: Badge['rarity']): string {
  const colors = {
    common: '#a0aec0',
    rare: '#4299e1',
    epic: '#9f7aea',
    legendary: '#f6ad55'
  }
  return colors[rarity]
}

export function getRarityGlow(rarity: Badge['rarity']): string {
  const glows = {
    common: '0 0 10px rgba(160, 174, 192, 0.3)',
    rare: '0 0 15px rgba(66, 153, 225, 0.5)',
    epic: '0 0 20px rgba(159, 122, 234, 0.6)',
    legendary: '0 0 30px rgba(246, 173, 85, 0.8)'
  }
  return glows[rarity]
}
