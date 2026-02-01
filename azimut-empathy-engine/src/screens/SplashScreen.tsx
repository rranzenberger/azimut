import { useState, useCallback } from 'react'
import { AzimutLogo, GameHeader, changeGameLang } from '../components/ui'
import { TopicIcon, MAPLE_LEAF_ICON } from '../components/game'
import SecretAreaModal from '../components/SecretAreaModal'
import { setSecretUnlocked, isSecretUnlocked } from '../utils/secretArea'
import { useAchievementsStore } from '../stores/achievementsStore'
import { getGameLang, getSplashTranslations } from '../i18n'
import { playSound } from '../utils/sound'
import { trackGameEvent } from '../utils/analytics'

export interface SplashScreenProps {
  onStart?: () => void
  onExperiences?: () => void
  onAbout?: () => void
  onTips?: () => void
  onSettings?: () => void
  onBack?: () => void
}

const STEP_COLORS = ['#C92337', '#A855F7', '#FFD700', '#00F5FF'] as const
const SECRET_TAPS_NEEDED = 5

export default function SplashScreen({ onStart, onExperiences, onAbout, onTips, onSettings }: SplashScreenProps) {
  const lang = getGameLang()
  const t = getSplashTranslations(lang)
  const [secretTapCount, setSecretTapCount] = useState(0)
  const [showSecretModal, setShowSecretModal] = useState(false)

  const handleSecretHintClick = useCallback(() => {
    const next = secretTapCount + 1
    setSecretTapCount(next)
    if (next >= SECRET_TAPS_NEEDED) {
      setSecretUnlocked()
      useAchievementsStore.getState().unlock('area-secreta')
      playSound('secret')
      trackGameEvent('secret_unlock')
      setShowSecretModal(true)
      setSecretTapCount(0)
    }
  }, [secretTapCount])

  const handleBackToSite = () => {
    window.top?.location.assign(`/${lang}/experience-preview`)
  }

  // 18 tópicos (17 reais + 1 premium) - grid 6x3
  const topics = [
    // Linha 1 - Core Services
    { icon: '🥽', nameKey: 'topicXrVr' as const, color: '#00F5FF' },
    { icon: '🎬', nameKey: 'topicAudiovisual' as const, color: '#A855F7' },
    { icon: '🎪', nameKey: 'topicEvents' as const, color: '#F97316' },
    { icon: '🏛️', nameKey: 'topicCultureMuseums' as const, color: '#3B82F6' },
    { icon: MAPLE_LEAF_ICON, nameKey: 'topicStudyCanada' as const, color: '#be0320' },
    { icon: '⚡', nameKey: 'topicTechConsulting' as const, color: '#FFD700' },
    // Linha 2 - Tech & Creative
    { icon: '🤖', nameKey: 'topicIaGenerativa' as const, color: '#10B981' },
    { icon: '🌐', nameKey: 'topicWeb3' as const, color: '#F59E0B' },
    { icon: '🎮', nameKey: 'topicGames' as const, color: '#EC4899' },
    { icon: '🏗️', nameKey: 'topicCenografia' as const, color: '#8B5CF6' },
    { icon: '🖥️', nameKey: 'topicCenografiaVirtual' as const, color: '#06B6D4' },
    { icon: '🎭', nameKey: 'topicDirecaoArte' as const, color: '#F43F5E' },
    // Linha 3 - Motion, VFX & Premium
    { icon: '✨', nameKey: 'topicAtivacaoMarcas' as const, color: '#EAB308' },
    { icon: '🎨', nameKey: 'topicMotionDesign' as const, color: '#14B8A6' },
    { icon: '🎞️', nameKey: 'topicMotionVfx' as const, color: '#0D9488' },
    { icon: '🧊', nameKey: 'topicModelagem3d' as const, color: '#6366F1' },
    { icon: '🎨', nameKey: 'topicAnimacao2d3d' as const, color: '#A855F7' },
    { icon: '🔮', nameKey: 'topicPremium' as const, color: '#FBBF24' },
  ] as const

  const backButton = (
    <button
      onClick={handleBackToSite}
      className="flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-[11px] sm:text-sm font-semibold shrink-0"
      style={{
        background: 'rgba(255, 255, 255, 0.08)',
        border: '1px solid rgba(201, 35, 55, 0.6)',
        color: '#ffffff',
      }}
    >
      <span>←</span>
      <span>{t.backToSite}</span>
    </button>
  )

  const pillInteractive = (
    <span
      className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-[11px] sm:text-sm font-semibold whitespace-nowrap"
      style={{ background: 'rgba(255, 255, 255, 0.08)', border: '1px solid rgba(201, 35, 55, 0.6)', color: '#ffffff' }}
      title={t.badgeInteractiveGame}
    >
      <span aria-hidden className="inline-flex" style={{ fontStyle: 'normal' }}>🎮</span>
      <span>{t.badgeInteractiveGame}</span>
    </span>
  )

  const activeLangColor = '#E84858'
  const inactiveLangColor = '#6B7280'

  return (
    <>
    <div className="h-screen min-h-[100dvh] flex flex-col relative overflow-hidden">
      {/* Mobile: header com logo + idiomas (PT EN FR ES) + Voltar; pílula "Jogo Interativo" fora do menu, abaixo */}
      <header
        className="sm:hidden relative z-20 flex-shrink-0 flex items-center justify-between gap-2 px-2 py-1.5"
        style={{
          background: 'rgba(5, 5, 8, 0.92)',
          backdropFilter: 'blur(20px)',
          borderBottom: '2px solid rgba(201, 35, 55, 0.4)',
        }}
      >
        <AzimutLogo className="h-5 w-auto flex-shrink-0" />
        <div className="flex items-center gap-0.5 shrink-0" style={{ alignItems: 'center' }}>
          {(['pt', 'en', 'fr', 'es'] as const).map((l) => (
            <button
              key={l}
              type="button"
              onClick={() => changeGameLang(l)}
              className="touch-manipulation py-0.5 px-1 text-[10px] font-semibold uppercase rounded"
              style={{
                color: lang === l ? activeLangColor : inactiveLangColor,
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                letterSpacing: '0.02em',
              }}
            >
              {l === 'pt' ? 'PT' : l === 'en' ? 'EN' : l === 'fr' ? 'FR' : 'ES'}
            </button>
          ))}
        </div>
        {backButton}
      </header>

      {/* Desktop: Header customizado com nome do jogo */}
      <header
        className="hidden sm:flex relative z-20 flex-shrink-0 items-center justify-between gap-4 px-4 md:px-6 py-3"
        style={{
          background: 'rgba(5, 5, 8, 0.95)',
          backdropFilter: 'blur(20px)',
          borderBottom: '2px solid rgba(201, 35, 55, 0.4)',
        }}
      >
        {/* Esquerda: Logo + Nome do jogo + Pílula */}
        <div className="flex items-center gap-4">
          <AzimutLogo className="h-7 w-auto flex-shrink-0" />
          {pillInteractive}
        </div>
        
        {/* Centro: Nome do jogo no header */}
        <h1
          className="font-display text-2xl md:text-3xl font-black tracking-tight leading-none absolute left-1/2 -translate-x-1/2"
          style={{
            background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 40%, #C92337 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          EMPATHY ENGINE
        </h1>
        
        {/* Direita: Idiomas + Voltar */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {(['en', 'fr', 'pt', 'es'] as const).map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => changeGameLang(l)}
                className="px-2 py-1 text-xs font-semibold uppercase rounded transition-colors"
                style={{
                  color: lang === l ? activeLangColor : inactiveLangColor,
                  background: lang === l ? 'rgba(201, 35, 55, 0.15)' : 'transparent',
                }}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
          {backButton}
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="relative z-10 flex-1 min-h-0 flex flex-col items-center justify-center py-2 sm:py-4 px-3 sm:px-6 md:px-8 overflow-hidden">
        {/* Mobile: Nome do jogo (desktop está no header) */}
        <div className="sm:hidden text-center mb-3">
          <h1
            className="font-display text-2xl font-black tracking-tight leading-none mb-2"
            style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 40%, #C92337 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            EMPATHY ENGINE
          </h1>
          {/* Texto descritivo - mobile */}
          <p className="text-sm font-body leading-relaxed text-center px-4 mb-2" style={{ color: '#E5E7EB' }}>
            {t.bullets}
            <button
              type="button"
              onClick={handleSecretHintClick}
              className="inline cursor-pointer border-0 bg-transparent p-0 font-inherit underline decoration-dotted decoration-cyan-400/60 underline-offset-2 hover:decoration-cyan-300 transition-all rounded"
              style={{
                color: '#00F5FF',
                textShadow: '0 0 20px rgba(0, 245, 255, 0.35)',
              }}
            >
              {t.bulletsSecret}
            </button>
          </p>
          <p className="text-xs font-semibold text-amber-400 flex items-center justify-center gap-1.5">
            <span>✨</span> Quest Premium + Surpresas <span>🎁</span>
          </p>
        </div>

        {/* Desktop: Texto descritivo (nome do jogo está no header) */}
        <div className="hidden sm:block text-center mb-4">
          <p className="text-base md:text-lg font-body leading-relaxed text-center max-w-2xl mx-auto mb-2" style={{ color: '#E5E7EB' }}>
            {t.bullets}
            <button
              type="button"
              onClick={handleSecretHintClick}
              className="inline cursor-pointer border-0 bg-transparent p-0 font-inherit underline decoration-dotted decoration-cyan-400/60 underline-offset-2 hover:decoration-cyan-300 transition-all rounded"
              style={{
                color: '#00F5FF',
                textShadow: '0 0 20px rgba(0, 245, 255, 0.35)',
              }}
            >
              {t.bulletsSecret}
            </button>
          </p>
          <p className="text-sm font-semibold text-amber-400 flex items-center justify-center gap-2">
            <span>✨</span> Quest Premium + Surpresas Desbloqueáveis <span>🎁</span>
          </p>
        </div>

        <div className="w-full max-w-5xl mx-auto flex flex-col items-center gap-3 sm:gap-4">

          {/* Card — largura máxima */}
          <div className="card-glow-home rounded-xl sm:rounded-2xl text-left flex-shrink-0 w-full max-w-5xl overflow-hidden">
            <div className="card-glow-home-inner rounded-xl sm:rounded-2xl p-3 sm:p-5 md:p-6 space-y-3 sm:space-y-4 overflow-hidden min-w-0">
            {/* 18 Tópicos em grid 6x3 */}
            <div className="min-w-0">
              <h3 
                className="text-xs sm:text-base font-bold uppercase tracking-wider mb-2 sm:mb-3 flex items-center justify-between"
                style={{ color: '#C92337' }}
              >
                <span className="flex items-center gap-2">
                  <span>🎯</span> 18 Temas de Quest
                </span>
                <span className="text-xs sm:text-base font-bold text-amber-400 flex items-center gap-1.5 animate-pulse">
                  <span>🔮</span> +80 Cartas!
                </span>
              </h3>
              {/* Grid 6x3 - fontes maiores e mais legíveis */}
              <div className="grid grid-cols-6 gap-2 sm:gap-3">
                {topics.map((topic, index) => {
                  const name = t[topic.nameKey]
                  const isEstudarCanada = topic.nameKey === 'topicStudyCanada'
                  const isPremium = index >= 15 // Últimos 3 são "premium"
                  return (
                    <div
                      key={topic.nameKey}
                      className={`group flex flex-col items-center justify-center gap-1 p-2 sm:p-3 rounded-xl transition-all duration-200 hover:scale-105 cursor-default ${isPremium ? 'ring-1 ring-amber-500/50' : ''}`}
                      style={{
                        background: isPremium
                          ? 'linear-gradient(135deg, rgba(251, 191, 36, 0.18), rgba(168, 85, 247, 0.12))'
                          : isEstudarCanada 
                            ? 'linear-gradient(135deg, rgba(190, 3, 32, 0.15), rgba(255, 255, 255, 0.05))' 
                            : `linear-gradient(135deg, ${topic.color}15, ${topic.color}05)`,
                        border: `1px solid ${topic.color}35`,
                      }}
                      title={name}
                    >
                      <span style={{ color: topic.color }} className="text-xl sm:text-2xl">
                        <TopicIcon icon={topic.icon} size={26} />
                      </span>
                      <span 
                        className="text-[10px] sm:text-xs font-bold text-center leading-tight opacity-95 group-hover:opacity-100 truncate w-full"
                        style={{ color: topic.color }}
                      >
                        {name.split(' ')[0]}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Divisor */}
            <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)' }} />

            {/* Como jogar — grid 2x2 sempre, fonte maior */}
            <div>
              <h3 
                className="text-xs sm:text-base font-bold uppercase tracking-wider mb-2 sm:mb-3 flex items-center gap-2"
                style={{ color: '#FFD700' }}
              >
                <span>🎮</span> {t.howToPlay}
              </h3>
              {/* Grid 2x2 para mobile e desktop */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {(t.stepsShort ?? t.steps).map((step, i) => {
                  const color = STEP_COLORS[i]
                  const parts = step.text.split(step.highlight)
                  const before = parts[0] ?? ''
                  const after = parts.slice(1).join(step.highlight)
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-2 sm:gap-3 py-2 sm:py-3 px-2 sm:px-4 rounded-lg"
                      style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1px solid rgba(255, 255, 255, 0.06)' }}
                    >
                      <span
                        className="w-5 h-5 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[10px] sm:text-sm font-bold flex-shrink-0"
                        style={{ background: `${color}25`, color, border: `1px solid ${color}50` }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-[11px] sm:text-sm text-[var(--text-secondary)] leading-tight min-w-0 text-left">
                        {before}
                        <strong style={{ color }}>{step.highlight}</strong>
                        {after}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
            </div>
          </div>

          {/* 1 botão Começar a Jogar */}
          {onStart && (
            <button
              onClick={onStart}
              className="flex items-center justify-center gap-2 px-10 py-3 sm:px-12 sm:py-4 rounded-full text-base sm:text-lg font-bold transition-all duration-300 hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #C92337 0%, #9B1B2A 100%)',
                color: '#fff',
                boxShadow: '0 8px 32px rgba(201, 35, 55, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)',
              }}
            >
              <span>▶</span>
              <span>{t.startGame}</span>
            </button>
          )}

          {/* 4 botões em grid */}
          <div className="grid grid-cols-4 gap-2 sm:gap-3 w-full max-w-5xl">
            {onExperiences && (
              <button
                onClick={onExperiences}
                className="flex items-center justify-center gap-1.5 py-2.5 sm:py-3 rounded-xl text-[11px] sm:text-sm font-semibold transition-all duration-200 hover:scale-[1.02] whitespace-nowrap"
                style={{
                  background: 'rgba(255, 215, 0, 0.12)',
                  border: '1px solid rgba(255, 215, 0, 0.35)',
                  color: '#FFD700',
                }}
              >
                <span>🏆</span>
                <span>Ranking</span>
              </button>
            )}
            {onAbout && (
              <button
                onClick={onAbout}
                className="flex items-center justify-center gap-1.5 py-2.5 sm:py-3 rounded-xl text-[11px] sm:text-sm font-semibold transition-all duration-200 hover:scale-[1.02] whitespace-nowrap"
                style={{
                  background: 'rgba(168, 85, 247, 0.12)',
                  border: '1px solid rgba(168, 85, 247, 0.35)',
                  color: '#C084FC',
                }}
              >
                <span>📖</span>
                <span>Tutorial</span>
              </button>
            )}
            {onTips && (
              <button
                onClick={onTips}
                className="flex items-center justify-center gap-1.5 py-2.5 sm:py-3 rounded-xl text-[11px] sm:text-sm font-semibold transition-all duration-200 hover:scale-[1.02] whitespace-nowrap"
                style={{
                  background: 'rgba(255, 193, 7, 0.12)',
                  border: '1px solid rgba(255, 193, 7, 0.35)',
                  color: '#FCD34D',
                }}
              >
                <span>💡</span>
                <span>Dicas</span>
              </button>
            )}
            {onSettings && (
              <button
                onClick={onSettings}
                className="flex items-center justify-center gap-1.5 py-2.5 sm:py-3 rounded-xl text-[11px] sm:text-sm font-semibold transition-all duration-200 hover:scale-[1.02] whitespace-nowrap"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  color: '#D1D5DB',
                }}
              >
                <span>⚙️</span>
                <span>Config</span>
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center py-2 flex-shrink-0" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <p className="text-[10px] sm:text-xs font-medium" style={{ color: '#9CA3AF' }}>
          {t.footer}
        </p>
      </footer>
    </div>
    <SecretAreaModal isOpen={showSecretModal} onClose={() => setShowSecretModal(false)} t={t} />
    </>
  )
}
