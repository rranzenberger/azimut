import { Button } from '../components/ui'

export interface SplashScreenProps {
  onStart?: () => void
  onExperiences?: () => void
  onAbout?: () => void
  onBack?: () => void
}

export default function SplashScreen({ onStart, onExperiences, onAbout, onBack }: SplashScreenProps) {
  return (
    <div className="min-h-screen splash-bg flex flex-col items-center justify-center p-6 md:p-8 relative z-0 overflow-y-auto">
      {onBack && (
        <div className="absolute top-6 left-6 z-10">
          <Button variant="ghost" size="sm" onClick={onBack}>
            ← Design System
          </Button>
        </div>
      )}

      <div className="relative z-10 w-full max-w-xl mx-auto text-center space-y-8 py-8">
        {/* Logo Azimut + subtítulo */}
        <div className="space-y-3">
          <img
            src="/azimut-logo.svg"
            alt="Azimut"
            className="h-14 md:h-16 w-auto mx-auto object-contain"
          />
          <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--text-primary)] tracking-tight">
            EMPATHY ENGINE
          </h2>
          <p className="font-body text-base text-[var(--text-secondary)]">
            Experiências que conectam mundos
          </p>
        </div>

        {/* Área: Sobre o jogo — objetivos e como jogar */}
        <section
          className="glass-card rounded-2xl border border-white/10 p-6 text-left space-y-5"
          aria-labelledby="sobre-o-jogo"
        >
          <h3 id="sobre-o-jogo" className="font-display text-lg font-bold text-azimut-red">
            Sobre o jogo
          </h3>
          <div className="space-y-4 font-body text-sm text-[var(--text-secondary)]">
            <div>
              <p className="font-semibold text-[var(--text-primary)] mb-1">Objetivo</p>
              <p>
                Você recebe um <strong>brief</strong> (tema + objetivo) em cada fase. As <strong>cartas</strong> da rodada
                são só desse tema: <strong>XR/VR</strong>, <strong>Produção audiovisual</strong>, <strong>Eventos corporativos</strong>, <strong>Cultura & Museus</strong> ou <strong>Estudar Canadá</strong>.
                Monte a proposta na zona de composição e atinja a <strong className="text-gold-main">meta de pontos</strong> antes do tempo.
                Às vezes há uma <strong className="text-purple-epic">surpresa</strong> (ex.: cliente pede um combo; tempo extra ou reduzido).
              </p>
            </div>
            <div>
              <p className="font-semibold text-[var(--text-primary)] mb-2">Como jogar</p>
              <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)]">
                <li>Leia o <strong>brief</strong> no topo (tema + objetivo da fase).</li>
                <li>Arraste as <strong>cartas do tema</strong> (ex.: XR puxa Oculus, câmera 360, Unity…) para a <strong>zona de composição</strong>.</li>
                <li>Atinja a <strong className="text-gold-main">meta de pontos</strong>; combos dão bônus. Se houver surpresa (ex.: “cliente quer um combo”), tente cumprir.</li>
                <li>Power-ups podem aparecer ao formar combos — use quando quiser.</li>
              </ul>
            </div>
          </div>
          {onAbout && (
            <Button variant="ghost" size="sm" onClick={onAbout} className="w-full sm:w-auto">
              Ver tutorial completo
            </Button>
          )}
        </section>

        {/* CTAs */}
        <div className="flex flex-col gap-4 pt-2">
          {onStart && (
            <Button variant="primary" size="lg" onClick={onStart} fullWidth>
              ▶ Sentir & Criar
            </Button>
          )}
          {onExperiences && (
            <Button variant="secondary" size="md" onClick={onExperiences} fullWidth>
              🏆 Experiências criadas
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
