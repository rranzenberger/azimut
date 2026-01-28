/**
 * Página de Degustação/Preview
 * Mostra o que podemos fazer de forma empolgante
 */

import { ExperiencePreview } from '../components/ExperiencePreview'
import { type Lang } from '../i18n'
import SEO from '../components/SEO'
import ErrorBoundary from '../components/ErrorBoundary'

interface ExperiencePreviewPageProps {
  lang: Lang
}

export default function ExperiencePreviewPage({ lang }: ExperiencePreviewPageProps) {
  return (
    <>
      <SEO
        title="Degustação: VR, NFT, Web3 e Experiências Imersivas | Azimut"
        description="Veja o que podemos fazer por você: experiências VR imersivas, coleções NFT personalizadas, integração Web3 completa e marketing que converte."
        keywords="VR, NFT, Web3, realidade virtual, blockchain, marketing imersivo, experiência interativa"
        url={`/${lang}/experience-preview`}
        locale={lang === 'pt' ? 'pt_BR' : lang === 'en' ? 'en_US' : lang === 'es' ? 'es_ES' : 'fr_FR'}
        type="website"
      />
      <ErrorBoundary>
        <ExperiencePreview lang={lang} />
      </ErrorBoundary>
    </>
  )
}
