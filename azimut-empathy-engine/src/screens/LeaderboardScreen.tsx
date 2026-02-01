import { useState } from 'react'
import { Button, GameHeader } from '../components/ui'
import { topics } from '../data/topics'
import { getGameLang, getLeaderboardTranslations, getCommonTranslations, getTopicName } from '../i18n'

type ScoreEntry = { name: string; score: number; topicIds?: string[]; date?: number }

export interface LeaderboardScreenProps {
  onBack?: () => void
}

export default function LeaderboardScreen({ onBack }: LeaderboardScreenProps) {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null)
  const raw = typeof localStorage !== 'undefined' ? localStorage.getItem('azimut-leaderboard') : null
  const allScores: ScoreEntry[] = raw ? JSON.parse(raw) : []

  const lang = getGameLang()
  const common = getCommonTranslations(lang)
  const t = getLeaderboardTranslations(lang)
  const filtered =
    selectedTopicId == null
      ? allScores
      : allScores.filter((s) => s.topicIds?.includes(selectedTopicId))
  const sorted = [...filtered].sort((a, b) => b.score - a.score).slice(0, 10)

  return (
    <div className="game-bg h-full flex flex-col overflow-hidden">
      <GameHeader
        leftAction={onBack ? <Button variant="back" size="sm" onClick={onBack}>← {common.back}</Button> : undefined}
        title={<span className="font-display font-bold text-azimut-red text-sm md:text-base uppercase tracking-wider">{t.title}</span>}
      />
      <main className="flex-1 min-h-0 overflow-auto p-4 sm:p-6">
        <div className="max-w-2xl mx-auto space-y-6">

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedTopicId(null)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              selectedTopicId == null
                ? 'bg-azimut-red/20 border border-azimut-red/50 text-azimut-red'
                : 'bg-white/5 border border-white/10 text-[var(--text-secondary)] hover:bg-white/10'
            }`}
          >
            {t.all}
          </button>
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopicId(topic.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-1.5 ${
                selectedTopicId === topic.id
                  ? 'border text-white'
                  : 'bg-white/5 border border-white/10 text-[var(--text-secondary)] hover:bg-white/10'
              }`}
              style={
                selectedTopicId === topic.id
                  ? { background: `${topic.color}20`, borderColor: `${topic.color}50`, color: topic.color }
                  : undefined
              }
            >
              <span>{topic.icon}</span>
              <span>{getTopicName(lang, topic.id)}</span>
            </button>
          ))}
        </div>

        <div className="glass-card rounded-2xl p-6 font-body">
          {sorted.length === 0 ? (
            <p className="text-[var(--text-tertiary)]">
              {selectedTopicId == null ? t.noScoresYet : t.noScoresInTopic}
            </p>
          ) : (
            <ul className="space-y-2">
              {sorted.map((s, i) => (
                <li key={i} className="flex justify-between items-center text-[var(--text-primary)]">
                  <span className="flex items-center gap-2">
                    <span className="text-[var(--text-tertiary)] font-data w-6">#{i + 1}</span>
                    {s.name ?? common.anonymous}
                  </span>
                  <span className="font-data text-gold-main">{s.score} {common.pts}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        </div>
      </main>
    </div>
  )
}
