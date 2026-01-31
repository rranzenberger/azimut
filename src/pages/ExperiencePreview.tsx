/**
 * Página de Degustação/Preview
 * Mostra o que podemos fazer de forma empolgante — Jogar Empathy Engine e demo Web3
 */

import { ExperiencePreview } from '../components/ExperiencePreview'
import { type Lang } from '../i18n'
import SEO from '../components/SEO'
import ErrorBoundary from '../components/ErrorBoundary'

interface ExperiencePreviewPageProps {
  lang: Lang
}

const experiencePreviewTitle: Record<Lang, string> = {
  pt: 'Jogar - Empathy Engine | Azimut',
  en: 'Play - Empathy Engine | Azimut',
  es: 'Jugar - Empathy Engine | Azimut',
  fr: 'Jouer - Empathy Engine | Azimut',
}

const experiencePreviewDescription: Record<Lang, string> = {
  pt: 'Ativação de marca no seu evento: estande em feira comercial, centro cultural, lançamento de produto, evento de divulgação, interno ou exposição. Quiosque com game, tecnologia e audiovisual integrados atraem visitantes ao seu estande e à sua página. Jogue o Empathy Engine.',
  en: 'Brand activation at your event: trade-fair stand, cultural center, product launch, promotional or in-house event, or exhibition. Kiosk with game, technology and audiovisual in one draws visitors to your stand and your site. Play Empathy Engine.',
  es: 'Activación de marca en tu evento: stand en feria comercial, centro cultural, lanzamiento de producto, evento de divulgación, interno o exposición. Quiosco con game, tecnología y audiovisual integrados atrae visitantes a tu stand y a tu web. Juega el Empathy Engine.',
  fr: 'Activation de marque à votre événement : stand en foire commerciale, centre culturel, lancement de produit, événement de promotion, interne ou exposition. Kiosque avec game, technologie et audiovisuel intégrés attire les visiteurs sur votre stand et votre site. Jouez à l\'Empathy Engine.',
}

export default function ExperiencePreviewPage({ lang }: ExperiencePreviewPageProps) {
  return (
    <>
      <SEO
        title={experiencePreviewTitle[lang]}
        description={experiencePreviewDescription[lang]}
        keywords="Empathy Engine, jogar, VR, NFT, Web3, realidade virtual, blockchain, marketing imersivo, experiência interativa, demo"
        url={`/${lang}/experience-preview`}
        locale={lang === 'pt' ? 'pt_BR' : lang === 'en' ? 'en_US' : lang === 'es' ? 'es_ES' : 'fr_FR'}
        type="website"
        icon="/empaty-engine.png"
        image="/empaty-engine.png"
      />
      <ErrorBoundary>
        <ExperiencePreview lang={lang} />
      </ErrorBoundary>
    </>
  )
}
