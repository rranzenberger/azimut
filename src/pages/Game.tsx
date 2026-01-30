/**
 * Página do jogo Empathy Engine
 * Exibe o jogo em iframe (build em /game/)
 */

import { type Lang } from '../i18n'
import SEO from '../components/SEO'
import ErrorBoundary from '../components/ErrorBoundary'

interface GamePageProps {
  lang: Lang
}

export default function GamePage({ lang }: GamePageProps) {
  return (
    <>
      <SEO
        title={lang === 'pt' ? 'Empathy Engine – Jogue e sinta' : lang === 'en' ? 'Empathy Engine – Play & Feel' : lang === 'es' ? 'Empathy Engine – Juega y siente' : 'Empathy Engine – Jouez et ressentez'}
        description={lang === 'pt' ? 'Jogo de composição por brief: monte propostas com cartas de XR/VR, produção audiovisual, eventos e mais. Sinta como o cliente reage.' : lang === 'en' ? 'Brief-based composition game: build proposals with XR/VR, audiovisual, events cards. See how the client reacts.' : lang === 'es' ? 'Juego de composición por brief: arma propuestas con cartas de XR/VR, audiovisual, eventos. Siente cómo reacciona el cliente.' : 'Jeu de composition par brief: construisez des propositions avec des cartes XR/VR, audiovisuel, événements.'}
        keywords="Empathy Engine, jogo Azimut, experiência imersiva, VR, XR, produção audiovisual, eventos, jogo de cartas"
        url={`/${lang}/game`}
        locale={lang === 'pt' ? 'pt_BR' : lang === 'en' ? 'en_US' : lang === 'es' ? 'es_ES' : 'fr_FR'}
        type="website"
      />
      <ErrorBoundary>
        <div style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 9999, background: '#0f0f12' }}>
          <iframe
            src="/game/"
            title="Empathy Engine"
            style={{ width: '100%', height: '100%', border: 'none' }}
            allow="fullscreen"
          />
        </div>
      </ErrorBoundary>
    </>
  )
}
