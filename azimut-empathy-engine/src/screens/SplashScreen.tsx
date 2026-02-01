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

  const topics = [
    { icon: '🥽', nameKey: 'topicXrVr' as const, color: '#00F5FF' },
    { icon: '🎬', nameKey: 'topicAudiovisual' as const, color: '#A855F7' },
    { icon: '🎪', nameKey: 'topicEvents' as const, color: '#F97316' },
    { icon: '🏛️', nameKey: 'topicCultureMuseums' as const, color: '#3B82F6' },
    { icon: MAPLE_LEAF_ICON, nameKey: 'topicStudyCanada' as const, color: '#be0320' },
    { icon: '⚡', nameKey: 'topicTechConsulting' as const, color: '#FFD700' },
    { icon: '🤖', nameKey: 'topicIaGenerativa' as const, color: '#10B981' },
    { icon: '🌐', nameKey: 'topicWeb3' as const, color: '#F59E0B' },
    { icon: '🎮', nameKey: 'topicGames' as const, color: '#EC4899' },
    { icon: '🏗️', nameKey: 'topicCenografia' as const, color: '#8B5CF6' },
    { icon: '🎨', nameKey: 'topicAnimacao2d3d' as const, color: '#A855F7' },
    { icon: '✨', nameKey: 'topicMotionDesign' as const, color: '#14B8A6' },
  ] as const

  const backButton = (
    <button
      onClick={handleBackToSite}
      className="flex items-center gap-1 px-2 py-1 sm:px-3 sm:py-2 rounded-lg text-[10px] sm:text-sm font-medium shrink-0"
      style={{
        background: 'rgba(255, 255, 255, 0.06)',
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
      className="inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md text-[10px] sm:text-xs font-medium whitespace-nowrap"
      style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(201, 35, 55, 0.6)', color: '#ffffff' }}
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

      {/* Desktop: GameHeader com idiomas (EN, FR, PT, ES) + pílula + Voltar — como era original */}
      <div className="hidden sm:block flex-shrink-0">
        <GameHeader
          leftAction={pillInteractive}
          rightAction={backButton}
          showLangSwitcher={true}
          accentColor="rgba(201, 35, 55, 0.35)"
        />
      </div>

      {/* Conteúdo principal — mobile: mais espaço entre seções, scroll suave; desktop como era */}
      <main className="relative z-10 flex-1 min-h-0 flex flex-col items-center justify-start sm:justify-center pt-2 sm:pt-2 pb-2 px-2 sm:pb-2 sm:px-6 md:px-8 overflow-y-auto overflow-x-hidden">
        <div className="w-full max-w-3xl mx-auto text-center flex flex-col items-center justify-start sm:justify-center gap-3 sm:gap-4">
          {/* Mobile: pílula "Jogo Interativo" fora do menu, logo abaixo do header */}
          <div className="sm:hidden flex justify-center w-full">
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-semibold whitespace-nowrap"
              style={{ background: 'rgba(255, 255, 255, 0.06)', border: '1px solid rgba(201, 35, 55, 0.6)', color: '#ffffff' }}
              title={t.badgeInteractiveGame}
            >
              <span aria-hidden className="inline-flex" style={{ fontStyle: 'normal' }}>🎮</span>
              <span>{t.badgeInteractiveGame}</span>
            </span>
          </div>
          {/* Nome do jogo */}
          <h1
            className="font-display text-xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight"
            style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 40%, #C92337 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            EMPATHY ENGINE
          </h1>
          {/* Texto abaixo do jogo: bullets; "Área secreta..." com glow/destaque premium — 5 toques destravam área secreta */}
          <p className="text-[13px] sm:text-sm font-body max-w-2xl mx-auto leading-[1.5] sm:leading-snug text-center px-3 sm:px-1 sm:whitespace-nowrap" style={{ color: '#9CA3AF' }}>
            {t.bullets}
            <button
              type="button"
              onClick={handleSecretHintClick}
              className="block sm:inline mt-0.5 sm:mt-0 cursor-pointer text-left sm:text-center border-0 bg-transparent p-0 font-inherit underline decoration-dotted decoration-cyan-400/60 underline-offset-2 hover:decoration-cyan-300 transition-all rounded focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
              style={{
                color: '#00F5FF',
                textShadow: '0 0 20px rgba(0, 245, 255, 0.35), 0 0 40px rgba(0, 245, 255, 0.15)',
              }}
              title={isSecretUnlocked() ? t.secretAreaTitle : t.secretAreaHint}
              aria-label={t.bulletsSecret}
            >
              {t.bulletsSecret}
            </button>
          </p>
          <p className="text-sm sm:text-sm font-body max-w-2xl mx-auto leading-[1.55] mt-2 sm:leading-snug sm:mt-1 text-center px-3 sm:px-1 sm:whitespace-nowrap" style={{ color: '#6B7280' }}>
            {t.teaser}
          </p>

          {/* Card — conteúdo dentro do card; mobile com mais respiro */}
          <div className="card-glow-home rounded-lg sm:rounded-xl text-left mt-0 sm:mt-8 flex-shrink-0 w-full max-w-3xl overflow-visible sm:overflow-hidden">
            <div className="card-glow-home-inner rounded-lg sm:rounded-xl p-3 sm:p-6 md:p-8 space-y-3 sm:space-y-6 overflow-visible sm:overflow-hidden min-w-0">
            {/* Tópicos — wrap no mobile (sem truncar); uma linha no desktop */}
            <div className="min-w-0 overflow-visible">
              <h3 
                className="text-[10px] sm:text-sm font-bold uppercase tracking-widest mb-1 sm:mb-3 flex items-center gap-1 sm:gap-2"
                style={{ color: '#C92337' }}
              >
                <span>📚</span> {t.topicsTitle}
              </h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-1.5 sm:gap-2">
                {topics.map((topic) => {
                  const name = t[topic.nameKey]
                  const isEstudarCanada = topic.nameKey === 'topicStudyCanada'
                  return (
                    <span
                      key={topic.nameKey}
                      className="inline-flex items-center justify-center gap-1 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-[8px] sm:text-[10px] font-semibold text-center transition-all duration-200 hover:scale-105 cursor-default"
                      style={{
                        background: isEstudarCanada 
                          ? 'linear-gradient(135deg, rgba(190, 3, 32, 0.15), rgba(255, 255, 255, 0.08))' 
                          : `linear-gradient(135deg, ${topic.color}15, ${topic.color}08)`,
                        border: `1px solid ${topic.color}40`,
                        color: topic.color,
                        boxShadow: `0 2px 8px ${topic.color}15`,
                      }}
                    >
                      <span className="flex-shrink-0"><TopicIcon icon={topic.icon} size={14} /></span>
                      <span className="truncate">{name}</span>
                    </span>
                  )
                })}
              </div>
            </div>

            {/* Divisor */}
            <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }} />

            {/* Como jogar — mobile: textos curtos em grid 2x2 | desktop: textos longos em lista como original */}
            <div>
              <h3 
                className="text-[10px] sm:text-sm font-bold uppercase tracking-widest mb-1 sm:mb-3 flex items-center gap-1 sm:gap-2"
                style={{ color: '#FFD700' }}
              >
                <span>🎯</span> {t.howToPlay}
              </h3>
              {/* Mobile: stepsShort em grid 2x2 */}
              <div className="sm:hidden grid grid-cols-2 gap-1.5">
                {(t.stepsShort ?? t.steps).map((step, i) => {
                  const color = STEP_COLORS[i]
                  const parts = step.text.split(step.highlight)
                  const before = parts[0] ?? ''
                  const after = parts.slice(1).join(step.highlight)
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 py-1 px-1.5 rounded"
                      style={{ background: 'rgba(255, 255, 255, 0.03)' }}
                    >
                      <span
                        className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0"
                        style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-[10px] text-[var(--text-secondary)] leading-tight min-w-0 text-left">
                        {before}
                        <strong style={{ color }}>{step.highlight}</strong>
                        {after}
                      </span>
                    </div>
                  )
                })}
              </div>
              {/* Desktop: steps completos, uma linha cada, fonte maior */}
              <div className="hidden sm:grid grid-cols-1 gap-2 sm:gap-3">
                {t.steps.map((step, i) => {
                  const color = STEP_COLORS[i]
                  const parts = step.text.split(step.highlight)
                  const before = parts[0] ?? ''
                  const after = parts.slice(1).join(step.highlight)
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-3 py-2 px-3 rounded-md min-w-0"
                      style={{ background: 'rgba(255, 255, 255, 0.03)' }}
                    >
                      <span
                        className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}
                      >
                        {i + 1}
                      </span>
                      <span className="text-base text-[var(--text-secondary)] leading-snug whitespace-nowrap overflow-x-auto min-w-0">
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
            <div className="flex justify-center w-full">
              <button
                onClick={onStart}
                className="flex items-center justify-center gap-2 px-6 py-3 sm:px-10 sm:py-4 rounded-full text-sm sm:text-base font-bold transition-all duration-300 shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #C92337 0%, #9B1B2A 100%)',
                  color: '#fff',
                  boxShadow: '0 8px 32px rgba(201, 35, 55, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)'
                  e.currentTarget.style.boxShadow = '0 12px 40px rgba(201, 35, 55, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)'
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(201, 35, 55, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)'
                }}
              >
                <span>▶</span>
                <span>{t.startGame}</span>
              </button>
            </div>
          )}

          {/* 4 pílulas: mobile = grid 2x2; desktop = 4 colunas numa linha (largura do card) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2 w-full max-w-sm sm:max-w-3xl px-1">
            {onExperiences && (
              <button
                onClick={onExperiences}
                className="flex items-center justify-center gap-1 sm:gap-2 px-3 py-2.5 sm:px-4 sm:py-2.5 rounded-full text-[11px] sm:text-sm font-semibold transition-all duration-300 min-w-0"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#B8B4A8',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 215, 0, 0.1)'
                  e.currentTarget.style.borderColor = 'rgba(255, 215, 0, 0.3)'
                  e.currentTarget.style.color = '#FFD700'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)'
                  e.currentTarget.style.color = '#B8B4A8'
                }}
              >
                <span>🏆</span>
                <span>{t.viewRanking}</span>
              </button>
            )}
            {onAbout && (
              <button
                onClick={onAbout}
                className="flex items-center justify-center gap-1 sm:gap-2 px-3 py-2.5 sm:px-4 sm:py-2.5 rounded-full text-[11px] sm:text-sm font-semibold transition-all duration-300 min-w-0"
                style={{
                  background: 'rgba(168, 85, 247, 0.12)',
                  border: '1px solid rgba(168, 85, 247, 0.35)',
                  color: '#C084FC',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(168, 85, 247, 0.2)'
                  e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(168, 85, 247, 0.12)'
                  e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.35)'
                }}
              >
                <span aria-hidden>📖</span>
                <span>{t.fullTutorial}</span>
              </button>
            )}
            {onTips && (
              <button
                onClick={onTips}
                className="flex items-center justify-center gap-1 sm:gap-2 px-3 py-2.5 sm:px-4 sm:py-2.5 rounded-full text-[11px] sm:text-sm font-semibold transition-all duration-300 min-w-0"
                style={{
                  background: 'rgba(255, 193, 7, 0.1)',
                  border: '1px solid rgba(255, 193, 7, 0.3)',
                  color: '#FCD34D',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 193, 7, 0.18)'
                  e.currentTarget.style.borderColor = 'rgba(255, 193, 7, 0.45)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 193, 7, 0.1)'
                  e.currentTarget.style.borderColor = 'rgba(255, 193, 7, 0.3)'
                }}
              >
                <span aria-hidden>💡</span>
                <span>{t.tipsAndTricks}</span>
              </button>
            )}
            {onSettings && (
              <button
                onClick={onSettings}
                className="flex items-center justify-center gap-1 sm:gap-2 px-3 py-2.5 sm:px-4 sm:py-2.5 rounded-full text-[11px] sm:text-sm font-semibold transition-all duration-300 min-w-0"
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#9CA3AF',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(168, 85, 247, 0.1)'
                  e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.3)'
                  e.currentTarget.style.color = '#C084FC'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)'
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)'
                  e.currentTarget.style.color = '#9CA3AF'
                }}
              >
                <span aria-hidden>⚙️</span>
                <span>{t.achievementsAndSettings}</span>
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Footer — mobile compacto | desktop como original */}
      <footer className="relative z-10 text-center py-1.5 sm:py-3 flex-shrink-0" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
        <p className="text-[9px] sm:text-xs" style={{ color: '#4B5563' }}>
          {t.footer}
        </p>
      </footer>
    </div>
    <SecretAreaModal isOpen={showSecretModal} onClose={() => setShowSecretModal(false)} t={t} />
    </>
  )
}
