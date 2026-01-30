import { Button } from '../components/ui'

export interface TutorialScreenProps {
  onComplete?: () => void
  onBack?: () => void
}

const STEPS = [
  {
    title: 'Você recebe um brief',
    text: 'Em cada fase aparece um brief com o tema (XR/VR, Produção audiovisual, Eventos corporativos ou Estudar Canadá) e o objetivo (ex.: "Monte uma proposta de experiência XR para o cliente").',
  },
  {
    title: 'Cartas do tema',
    text: 'As cartas da rodada são só do tema do brief. Ex.: no tema XR/VR você vê Oculus, câmera 360, Unity, etc.; no tema Cultura & Museus, curadoria, exposição, festival; no tema Estudar Canadá, VFS, VanArts, cursos e visto.',
  },
  {
    title: 'Arraste para a zona de composição',
    text: 'Arraste as cartas da lista para a zona de composição no centro. Cada carta vale pontos; certas combinações formam combos com bônus (em roxo).',
  },
  {
    title: 'Atinga a meta e a surpresa',
    text: 'Cada fase tem uma meta de pontos. Atinja antes do tempo acabar. Às vezes o brief traz uma surpresa (ex.: "O cliente pede pelo menos um combo") — tente cumprir para um resultado extra.',
  },
  {
    title: '4 fases e power-ups',
    text: 'Sentir → Conectar → Sincronizar → Transformar. A cada fase, um novo brief e tema. Power-ups podem aparecer ao formar combos — use quando quiser.',
  },
]

export default function TutorialScreen({ onComplete, onBack }: TutorialScreenProps) {
  return (
    <div className="min-h-screen bg-bg-darkest p-6 md:p-8">
      <div className="max-w-2xl mx-auto space-y-8 font-body">
        {onBack && (
          <Button variant="ghost" size="sm" onClick={onBack}>
            ← Voltar
          </Button>
        )}

        <header className="space-y-2">
          <h1 className="font-display text-3xl font-bold text-azimut-red">
            Como jogar
          </h1>
          <p className="text-[var(--text-secondary)]">
            Resumo do objetivo e dos passos para jogar o Empathy Engine.
          </p>
        </header>

        <section className="glass-card rounded-2xl border border-white/10 p-6 space-y-4">
          <h2 className="font-display text-lg font-bold text-[var(--text-primary)]">
            Objetivo
          </h2>
          <p className="text-[var(--text-secondary)]">
            Em cada fase você recebe um <strong>brief</strong> (tema + objetivo). As cartas são só do tema (XR/VR, Produção audiovisual, Eventos corporativos, Estudar Canadá).
            Monte a proposta na zona de composição e atinja a <strong className="text-gold-main">meta de pontos</strong> antes do tempo.
            Às vezes há uma <strong className="text-purple-epic">surpresa</strong> no brief (ex.: cliente quer um combo). Combos dão bônus; power-ups aparecem ao formar combos.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="font-display text-lg font-bold text-[var(--text-primary)]">
            Passos
          </h2>
          <ul className="space-y-4">
            {STEPS.map((step, i) => (
              <li
                key={i}
                className="flex gap-4 rounded-xl border border-white/10 bg-bg-dark/30 p-4"
              >
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-azimut-red/20 text-azimut-red font-data font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <p className="font-display font-semibold text-[var(--text-primary)] mb-1">
                    {step.title}
                  </p>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {step.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {onComplete && (
          <div className="pt-4">
            <Button variant="primary" size="lg" onClick={onComplete} fullWidth>
              Estou pronto — jogar
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
