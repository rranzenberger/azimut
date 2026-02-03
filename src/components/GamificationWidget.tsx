// ════════════════════════════════════════════════════════════
// 🎮 GAMIFICATION WIDGET - UI FLUTUANTE
// ════════════════════════════════════════════════════════════
// Widget que mostra progresso, pontos, level e badges
// ════════════════════════════════════════════════════════════

import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  loadProgress, 
  getCurrentLevel, 
  getNextLevel, 
  getProgressPercentage,
  getRarityColor,
  getRarityGlow,
  type UserProgress,
  type Badge
} from '../utils/gamification'

interface GamificationWidgetProps {
  lang: 'pt' | 'en' | 'fr' | 'es'
  position?: 'bottom-left' | 'bottom-right' | 'top-right'
  showOnMount?: boolean
}

export const GamificationWidget: React.FC<GamificationWidgetProps> = ({
  lang,
  position = 'bottom-right',
  showOnMount = true
}) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [progress, setProgress] = useState<UserProgress | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(true)
  const [showNotification, setShowNotification] = useState(false)
  const [notification, setNotification] = useState<{
    type: 'levelUp' | 'badge' | 'achievement' | 'points'
    message: string
    emoji: string
  } | null>(null)
  const [navigateFeedback, setNavigateFeedback] = useState(false)

  // Carregar progresso
  useEffect(() => {
    const prog = loadProgress()
    setProgress(prog)
    
    // Mostrar widget automaticamente no primeiro acesso
    if (showOnMount && prog.stats.pagesVisited === 1) {
      setTimeout(() => {
        setIsMinimized(false)
        setTimeout(() => setIsMinimized(true), 5000)
      }, 2000)
    }
  }, [showOnMount])

  // Abrir painel quando a URL tiver #gamification (ex.: após clicar em "Ver Perfil")
  useEffect(() => {
    if (location.hash === '#gamification') {
      setIsMinimized(false)
    }
  }, [location.hash])

  // Atualizar progresso quando houver mudanças
  useEffect(() => {
    const handleStorageChange = () => {
      setProgress(loadProgress())
    }
    
    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('gamification-update', handleStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('gamification-update', handleStorageChange)
    }
  }, [])

  if (!progress) return null

  const currentLevel = getCurrentLevel(progress)
  const nextLevel = getNextLevel(progress)
  const progressPercent = getProgressPercentage(progress)

  const positionClasses = {
    'bottom-left': 'bottom-6 left-6',
    'bottom-right': 'bottom-[104px] right-6', // ← Acima do ClaudeAssistant (64px + 40px gap)
    'top-right': 'top-24 right-6'
  }

  const content = {
    pt: {
      level: 'Nível',
      points: 'Pontos',
      badges: 'Badges',
      badgesDesc: 'Conquistas desbloqueadas explorando o site',
      streak: 'Sequência',
      days: 'dias',
      streakDesc: 'Dias seguidos visitando o site',
      achievements: 'Conquistas',
      achievementsDesc: 'concluídas de',
      viewProfile: 'Ver meu progresso na página Studio',
      viewProfileTooltip: 'Abre a página Studio com este painel de progresso em destaque.',
      alreadyHere: 'Você está aqui',
      alreadyHereSub: 'Painel já aberto nesta página.',
      closePanel: 'Fechar painel',
      navigatingToast: 'Indo para Studio…',
      close: 'Fechar',
      xpToNext: 'XP para próximo nível',
      recent: 'Recentes',
      howItWorks: 'Como funciona?',
      howPoints: 'Ganhe pontos ao navegar, ver projetos, preencher formulários e completar ações no site.',
      howLevels: 'Suba de nível (Explorador → Curioso → … → Azimut Elite) conforme acumula XP.',
      howStreak: 'Volte em dias seguidos para manter sua sequência e desbloquear badges especiais.',
      howBadges: 'Badges são conquistas que você desbloqueia ao explorar páginas, ver vídeos e interagir.',
      headerSubtitle: 'Sua jornada no site Azimut — ganhe XP navegando e interagindo.'
    },
    en: {
      level: 'Level',
      points: 'Points',
      badges: 'Badges',
      badgesDesc: 'Achievements unlocked by exploring the site',
      streak: 'Streak',
      days: 'days',
      streakDesc: 'Consecutive days visiting the site',
      achievements: 'Achievements',
      achievementsDesc: 'completed out of',
      viewProfile: 'View my progress on Studio page',
      viewProfileTooltip: 'Opens the Studio page with this progress panel highlighted.',
      alreadyHere: 'You are here',
      alreadyHereSub: 'Panel is already open on this page.',
      closePanel: 'Close panel',
      navigatingToast: 'Going to Studio…',
      close: 'Close',
      xpToNext: 'XP to next level',
      recent: 'Recent',
      howItWorks: 'How does it work?',
      howPoints: 'Earn points by browsing, viewing projects, filling forms and completing actions.',
      howLevels: 'Level up (Explorer → Curious → … → Azimut Elite) as you accumulate XP.',
      howStreak: 'Come back on consecutive days to keep your streak and unlock special badges.',
      howBadges: 'Badges are achievements you unlock by exploring pages, watching videos and interacting.',
      headerSubtitle: 'Your journey on the Azimut site — earn XP by browsing and interacting.'
    },
    es: {
      level: 'Nivel',
      points: 'Puntos',
      badges: 'Insignias',
      badgesDesc: 'Logros desbloqueados explorando el sitio',
      streak: 'Racha',
      days: 'días',
      streakDesc: 'Días seguidos visitando el sitio',
      achievements: 'Logros',
      achievementsDesc: 'completados de',
      viewProfile: 'Ver mi progreso en la página Studio',
      viewProfileTooltip: 'Abre la página Studio con este panel de progreso destacado.',
      alreadyHere: 'Ya estás aquí',
      alreadyHereSub: 'El panel ya está abierto en esta página.',
      closePanel: 'Cerrar panel',
      navigatingToast: 'Yendo a Studio…',
      close: 'Cerrar',
      xpToNext: 'XP para siguiente nivel',
      recent: 'Recientes',
      howItWorks: '¿Cómo funciona?',
      howPoints: 'Gana puntos navegando, viendo proyectos, formularios y completando acciones.',
      howLevels: 'Sube de nivel (Explorador → Curioso → …) según acumules XP.',
      howStreak: 'Vuelve días seguidos para mantener tu racha y desbloquear insignias especiales.',
      howBadges: 'Las insignias son logros que desbloqueas al explorar, ver vídeos e interactuar.',
      headerSubtitle: 'Tu recorrido en el sitio Azimut — gana XP navegando e interactuando.'
    },
    fr: {
      level: 'Niveau',
      points: 'Points',
      badges: 'Badges',
      badgesDesc: 'Succès débloqués en explorant le site',
      streak: 'Série',
      days: 'jours',
      streakDesc: 'Jours consécutifs à visiter le site',
      achievements: 'Succès',
      achievementsDesc: 'complétés sur',
      viewProfile: 'Voir ma progression sur la page Studio',
      viewProfileTooltip: 'Ouvre la page Studio avec ce panneau de progression en évidence.',
      alreadyHere: 'Vous y êtes',
      alreadyHereSub: 'Le panneau est déjà ouvert sur cette page.',
      closePanel: 'Fermer le panneau',
      navigatingToast: 'Ouverture de Studio…',
      close: 'Fermer',
      xpToNext: 'XP pour niveau suivant',
      recent: 'Récents',
      howItWorks: 'Comment ça marche ?',
      howPoints: 'Gagnez des points en naviguant, en regardant les projets et en complétant des actions.',
      howLevels: 'Montez de niveau (Explorateur → Curieux → …) en accumulant de l\'XP.',
      howStreak: 'Revenez des jours consécutifs pour garder votre série et débloquer des badges.',
      howBadges: 'Les badges sont des succès débloqués en explorant, regardant des vidéos et en interagissant.',
      headerSubtitle: 'Votre parcours sur le site Azimut — gagnez de l\'XP en naviguant et en interagissant.'
    }
  }[lang]

  const recentBadges = progress.badges.slice(-3).reverse()

  // Já estamos na página Studio com o painel em destaque? Mostrar feedback diferente.
  const isOnStudioPage = location.pathname.includes('/studio')
  const isProfileView = location.hash === '#gamification'
  const isAlreadyOnStudioProfile = isOnStudioPage && isProfileView

  const handleClosePanelAndClearHash = () => {
    setIsMinimized(true)
    if (location.hash === '#gamification') {
      window.history.replaceState(null, '', location.pathname + location.search)
    }
  }

  const handleGoToStudioProfile = () => {
    setNavigateFeedback(true)
    setTimeout(() => setNavigateFeedback(false), 1500)
    navigate(`/${lang}/studio#gamification`)
  }

  return (
    <>
      {/* Widget Minimizado (Botão Flutuante) */}
      {isMinimized && (
        <button
          onClick={() => setIsMinimized(false)}
          className={`fixed ${positionClasses[position]} z-50 group transition-all duration-300 hover:scale-110`}
          aria-label="Abrir gamificação"
        >
          {/* Badge de notificação */}
          {showNotification && (
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-azimut-red rounded-full animate-ping" />
          )}
          
          <div className="relative">
            {/* Glow effect */}
            <div 
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-xl"
              style={{ 
                background: 'radial-gradient(circle, rgba(201, 35, 55, 0.4) 0%, transparent 70%)'
              }}
            />
            
            {/* Button */}
            <div className="relative bg-gradient-to-br from-[#1a1f2e] to-[#0a0e18] border-2 border-azimut-red/40 rounded-full p-4 shadow-2xl backdrop-blur-sm">
              <div className="flex flex-col items-center gap-1">
                <span className="text-2xl">{currentLevel.emoji}</span>
                <span className="text-xs font-bold text-white">{progress.level}</span>
              </div>
            </div>
          </div>
        </button>
      )}

      {/* Widget Expandido */}
      {!isMinimized && (
        <div className={`fixed ${positionClasses[position]} z-50 transition-all duration-300`}>
          <div className="bg-gradient-to-br from-[#1a1f2e] to-[#0a0e18] border-2 border-azimut-red/40 rounded-2xl shadow-2xl backdrop-blur-md w-[340px] max-w-[90vw] overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-azimut-red/20 to-transparent p-4 border-b border-azimut-red/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{currentLevel.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-white text-sm font-sora uppercase tracking-wider truncate">
                        {currentLevel.name}
                      </h3>
                      <span className="text-xs px-2 py-0.5 bg-azimut-red/20 text-azimut-red rounded-full flex-shrink-0">
                        {content.level} {progress.level}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      {progress.totalPoints.toLocaleString()} {content.points}
                    </p>
                    <p className="text-[10px] text-slate-500 mt-0.5 leading-tight max-w-[200px]">
                      {content.headerSubtitle}
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsMinimized(true)}
                  className="text-slate-400 hover:text-white hover:bg-white/10 transition-all p-2 rounded-lg text-xl font-bold"
                  aria-label={content.close}
                  title={content.close}
                >
                  ✕
                </button>
              </div>
              
              {/* Progress Bar */}
              {nextLevel && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-slate-400">
                      {content.xpToNext}
                    </span>
                    <span className="text-xs font-medium text-white">
                      {progressPercent}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-azimut-red to-orange-500 transition-all duration-500 ease-out"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-slate-500">
                      {currentLevel.name}
                    </span>
                    <span className="text-xs text-slate-500">
                      {nextLevel.name}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Stats */}
            <div className="p-4 grid grid-cols-3 gap-2">
              <div className="bg-[#0a0e18] rounded-lg p-3 text-center border border-azimut-red/10" title={content.badgesDesc}>
                <div className="text-2xl mb-1">🏆</div>
                <div className="text-xl font-bold text-white">{progress.badges.length}</div>
                <div className="text-xs text-slate-400">{content.badges}</div>
                <div className="text-[10px] text-slate-500 mt-0.5 leading-tight hidden sm:block">{content.badgesDesc}</div>
              </div>
              
              <div className="bg-[#0a0e18] rounded-lg p-3 text-center border border-azimut-red/10" title={content.streakDesc}>
                <div className="text-2xl mb-1">🔥</div>
                <div className="text-xl font-bold text-white">{progress.streak}</div>
                <div className="text-xs text-slate-400">{content.days}</div>
                <div className="text-[10px] text-slate-500 mt-0.5 leading-tight hidden sm:block">{content.streakDesc}</div>
              </div>
              
              <div className="bg-[#0a0e18] rounded-lg p-3 text-center border border-azimut-red/10" title={content.achievements + ': ' + content.achievementsDesc + ' ' + progress.achievements.length}>
                <div className="text-2xl mb-1">⭐</div>
                <div className="text-xl font-bold text-white">
                  {progress.achievements.filter(a => a.completed).length}
                  <span className="text-slate-500 font-normal text-sm">/{progress.achievements.length}</span>
                </div>
                <div className="text-xs text-slate-400">{content.achievements}</div>
                <div className="text-[10px] text-slate-500 mt-0.5 leading-tight hidden sm:block">{content.achievementsDesc} {progress.achievements.length}</div>
              </div>
            </div>

            {/* Como funciona? - Explicação clara para o usuário */}
            <div className="px-4 pb-4 border-t border-azimut-red/10 pt-3">
              <h4 className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                {content.howItWorks}
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li className="flex gap-2">
                  <span className="text-azimut-red flex-shrink-0">•</span>
                  <span>{content.howPoints}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-azimut-red flex-shrink-0">•</span>
                  <span>{content.howLevels}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-azimut-red flex-shrink-0">•</span>
                  <span>{content.howStreak}</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-azimut-red flex-shrink-0">•</span>
                  <span>{content.howBadges}</span>
                </li>
              </ul>
            </div>

            {/* Recent Badges */}
            {recentBadges.length > 0 && (
              <div className="p-4 border-t border-azimut-red/10">
                <h4 className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">
                  {content.recent} {content.badges}
                </h4>
                <div className="flex gap-2">
                  {recentBadges.map((badge) => (
                    <div
                      key={badge.id}
                      className="flex-1 bg-[#0a0e18] rounded-lg p-2 text-center border transition-all hover:scale-105 cursor-pointer group relative"
                      style={{ 
                        borderColor: getRarityColor(badge.rarity),
                        boxShadow: `0 0 0 ${getRarityGlow(badge.rarity)}`
                      }}
                      title={badge.name}
                    >
                      <div className="text-2xl mb-1">{badge.emoji}</div>
                      <div className="text-xs text-slate-300 truncate">{badge.name}</div>
                      
                      {/* Tooltip on hover */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
                        <div className="bg-slate-900 text-white text-xs rounded-lg p-2 whitespace-nowrap shadow-xl border border-azimut-red/20">
                          <div className="font-semibold">{badge.name}</div>
                          <div className="text-slate-400 text-xs">{badge.description}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA explícito: ir para Studio OU feedback "já está aqui" */}
            <div className="p-4 border-t border-azimut-red/10 space-y-2">
              {isAlreadyOnStudioProfile ? (
                <>
                  <div className="rounded-lg bg-slate-700/60 border border-azimut-red/20 px-3 py-2.5 text-center">
                    <p className="text-sm font-medium text-white">{content.alreadyHere}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{content.alreadyHereSub}</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleClosePanelAndClearHash}
                    className="w-full text-sm text-slate-400 hover:text-white border border-slate-500 hover:border-slate-400 rounded-lg py-2 px-3 transition-colors"
                  >
                    {content.closePanel}
                  </button>
                </>
              ) : (
                <>
                  {navigateFeedback && (
                    <p className="text-xs text-azimut-red/90 text-center animate-pulse" role="status">
                      {content.navigatingToast}
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={handleGoToStudioProfile}
                    title={content.viewProfileTooltip}
                    disabled={navigateFeedback}
                    className="w-full bg-gradient-to-r from-azimut-red to-orange-600 hover:from-azimut-red/90 hover:to-orange-600/90 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-azimut-red/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
                  >
                    <span>{content.viewProfile}</span>
                    <span aria-hidden>→</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Notification Toast (Level up, nova badge, etc) */}
      {notification && (
        <div className="fixed top-6 right-6 z-[60] animate-slide-in-right">
          <div className="bg-gradient-to-br from-azimut-red/90 to-orange-600/90 backdrop-blur-md rounded-xl p-4 shadow-2xl border border-white/20 max-w-sm">
            <div className="flex items-center gap-3">
              <div className="text-3xl">{notification.emoji}</div>
              <div>
                <div className="text-sm font-semibold text-white">{notification.message}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default GamificationWidget
