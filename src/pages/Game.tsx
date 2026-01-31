/**
 * Página do jogo Empathy Engine
 * Exibe o jogo em iframe em /{lang}/game/
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
        description={lang === 'pt' ? 'Ativação de marca no seu evento: estande em feira comercial, centro cultural, lançamento de produto, evento de divulgação, interno ou exposição. Quiosque com game, tecnologia e audiovisual integrados atraem visitantes ao seu estande e à sua página. Jogue: composição por brief (XR/VR, audiovisual, eventos).' : lang === 'en' ? 'Brand activation at your event: trade-fair stand, cultural center, product launch, promotional or in-house event, or exhibition. Kiosk with game, technology and audiovisual in one draws visitors to your stand and your site. Play: brief-based composition (XR/VR, audiovisual, events).' : lang === 'es' ? 'Activación de marca en tu evento: stand en feria comercial, centro cultural, lanzamiento de producto, evento de divulgación, interno o exposición. Quiosco con game, tecnología y audiovisual integrados atrae visitantes a tu stand y a tu web. Juega: composición por brief (XR/VR, audiovisual, eventos).' : 'Activation de marque à votre événement : stand en foire commerciale, centre culturel, lancement de produit, événement de promotion, interne ou exposition. Kiosque avec game, technologie et audiovisuel intégrés attire les visiteurs sur votre stand et votre site. Jouez : composition par brief (XR/VR, audiovisuel, événements).'}
        keywords="Empathy Engine, jogo Azimut, experiência imersiva, VR, XR, produção audiovisual, eventos, jogo de cartas"
        url={`/${lang}/game`}
        locale={lang === 'pt' ? 'pt_BR' : lang === 'en' ? 'en_US' : lang === 'es' ? 'es_ES' : 'fr_FR'}
        type="website"
      />
      <ErrorBoundary>
        <div style={{ position: 'fixed', inset: 0, width: '100%', height: '100%', zIndex: 9999, background: '#0f0f12' }}>
          <iframe
            src={`/${lang}/game/`}
            title="Empathy Engine"
            style={{ width: '100%', height: '100%', border: 'none' }}
            allow="fullscreen"
          />
        </div>
      </ErrorBoundary>
    </>
  )
}
