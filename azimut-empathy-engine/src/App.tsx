import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSettingsStore } from './stores/settingsStore'
import SplashScreen from './screens/SplashScreen'
import GameScreen from './screens/GameScreen'
import TutorialScreen from './screens/TutorialScreen'
import TipsScreen from './screens/TipsScreen'
import LeaderboardScreen from './screens/LeaderboardScreen'
import SettingsScreen from './screens/SettingsScreen'
import './index.css'

export type AppView = 'splash' | 'game' | 'tutorial' | 'tips' | 'leaderboard' | 'settings'

const pageTransition = (reducedMotion: boolean) =>
  reducedMotion
    ? { initial: false, animate: false, exit: false }
    : {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -8 },
        transition: { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] },
      }

function App() {
  const [view, setView] = useState<AppView>('splash')
  const [returnAfterLeaderboard, setReturnAfterLeaderboard] = useState<AppView>('splash')
  const reducedMotion = useSettingsStore((s) => s.reducedMotion)
  const transition = pageTransition(reducedMotion)

  const goToLeaderboard = (from: AppView) => {
    setReturnAfterLeaderboard(from)
    setView('leaderboard')
  }

  return (
    <div className="game-bg relative h-screen min-h-screen overflow-hidden">
      <AnimatePresence mode="wait">
        {view === 'splash' && (
        <motion.div
          key="splash"
          className="absolute inset-0 h-screen overflow-hidden"
          initial={transition.initial}
          animate={transition.animate}
          exit={transition.exit}
          transition={transition.transition}
        >
          <SplashScreen
            onStart={() => setView('game')}
            onExperiences={() => goToLeaderboard('splash')}
            onAbout={() => setView('tutorial')}
            onTips={() => setView('tips')}
            onSettings={() => setView('settings')}
            onBack={undefined}
          />
        </motion.div>
      )}

      {view === 'game' && (
        <motion.div
          key="game"
          className="absolute inset-0 h-screen overflow-hidden"
          initial={transition.initial}
          animate={transition.animate}
          exit={transition.exit}
          transition={transition.transition}
        >
          <GameScreen
            onLeaderboard={() => setView('leaderboard')}
            onBack={() => setView('splash')}
          />
        </motion.div>
      )}

      {view === 'tutorial' && (
        <motion.div
          key="tutorial"
          className="absolute inset-0 h-screen overflow-hidden"
          initial={transition.initial}
          animate={transition.animate}
          exit={transition.exit}
          transition={transition.transition}
        >
          <TutorialScreen
            onComplete={() => setView('game')}
            onBack={() => setView('splash')}
          />
        </motion.div>
      )}

      {view === 'tips' && (
        <motion.div
          key="tips"
          className="absolute inset-0 h-screen overflow-hidden"
          initial={transition.initial}
          animate={transition.animate}
          exit={transition.exit}
          transition={transition.transition}
        >
          <TipsScreen onBack={() => setView('splash')} />
        </motion.div>
      )}

      {view === 'leaderboard' && (
        <motion.div
          key="leaderboard"
          className="absolute inset-0 min-h-screen"
          initial={transition.initial}
          animate={transition.animate}
          exit={transition.exit}
          transition={transition.transition}
        >
          <LeaderboardScreen onBack={() => setView(returnAfterLeaderboard)} />
        </motion.div>
      )}

      {view === 'settings' && (
        <motion.div
          key="settings"
          className="absolute inset-0 h-screen overflow-hidden"
          initial={transition.initial}
          animate={transition.animate}
          exit={transition.exit}
          transition={transition.transition}
        >
          <SettingsScreen onBack={() => setView('splash')} />
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  )
}

export default App
