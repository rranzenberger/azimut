import React from 'react'
import { Link } from 'react-router-dom'
import { t, type Lang } from '../i18n'
import SEO, { seoData } from '../components/SEO'
import { useUserTracking } from '../hooks/useUserTracking'

interface PressProps {
  lang: Lang
}

const Press: React.FC<PressProps> = ({ lang }) => {
  const seo = seoData.press?.[lang] || {
    title: lang === 'pt' ? 'Imprensa - Azimut' : lang === 'es' ? 'Prensa - Azimut' : 'Press - Azimut',
    description: lang === 'pt' ? 'Material de imprensa e assessoria de comunicação da Azimut' : lang === 'es' ? 'Material de prensa y asesoría de comunicación de Azimut' : 'Press materials and communication support from Azimut'
  }
  // REMOVIDO: useUserTracking já é chamado no Layout.tsx
  // useUserTracking()

  const pressContent = {
    pt: {
      title: 'Área de Imprensa',
      subtitle: 'Material de Divulgação e Assessoria de Comunicação',
      intro: 'A Azimut está disponível para entrevistas, comentários e informações sobre nossos projetos. Nossa equipe de comunicação está pronta para atender jornalistas, veículos de mídia e profissionais interessados em conhecer mais sobre nosso trabalho.',
      contactTitle: 'Contato para Imprensa',
      contactEmail: 'imprensa@azmt.com.br',
      contactPhone: '+55 (21) 99999-9999',
      pressKit: 'Kit de Imprensa',
      pressKitDesc: 'Baixe nosso kit completo com informações sobre a empresa, projetos principais, imagens em alta resolução e releases.',
      releases: 'Releases e Notas',
      releasesDesc: 'Acompanhe nossos comunicados oficiais e notas à imprensa sobre projetos, parcerias e conquistas.',
      projects: 'Projetos em Destaque',
      projectsDesc: 'Conheça nossos principais projetos e cases de sucesso que demonstram nossa expertise.',
      media: 'Material de Mídia',
      mediaDesc: 'Acesso a imagens, vídeos e outros materiais visuais para uso editorial.',
      download: 'Download',
      viewMore: 'Ver Mais',
      contact: 'Entre em Contato'
    },
    en: {
      title: 'Press Area',
      subtitle: 'Press Materials and Communication Support',
      intro: 'Azimut is available for interviews, comments, and information about our projects. Our communication team is ready to assist journalists, media outlets, and professionals interested in learning more about our work.',
      contactTitle: 'Press Contact',
      contactEmail: 'press@azmt.com.br',
      contactPhone: '+1 (604) 999-9999',
      pressKit: 'Press Kit',
      pressKitDesc: 'Download our complete kit with information about the company, main projects, high-resolution images, and press releases.',
      releases: 'Press Releases',
      releasesDesc: 'Follow our official communications and press notes about projects, partnerships, and achievements.',
      projects: 'Featured Projects',
      projectsDesc: 'Learn about our main projects and success cases that demonstrate our expertise.',
      media: 'Media Materials',
      mediaDesc: 'Access to images, videos, and other visual materials for editorial use.',
      download: 'Download',
      viewMore: 'View More',
      contact: 'Contact Us'
    },
    es: {
      title: 'Área de Prensa',
      subtitle: 'Material de Prensa y Asesoría de Comunicación',
      intro: 'Azimut está disponible para entrevistas, comentarios e información sobre nuestros proyectos. Nuestro equipo de comunicación está listo para atender a periodistas, medios de comunicación y profesionales interesados en conocer más sobre nuestro trabajo.',
      contactTitle: 'Contacto de Prensa',
      contactEmail: 'prensa@azmt.com.br',
      contactPhone: '+55 (21) 99999-9999',
      pressKit: 'Kit de Prensa',
      pressKitDesc: 'Descargue nuestro kit completo con información sobre la empresa, proyectos principales, imágenes en alta resolución y comunicados.',
      releases: 'Comunicados y Notas',
      releasesDesc: 'Siga nuestros comunicados oficiales y notas de prensa sobre proyectos, alianzas y logros.',
      projects: 'Proyectos Destacados',
      projectsDesc: 'Conozca nuestros principales proyectos y casos de éxito que demuestran nuestra experiencia.',
      media: 'Material de Medios',
      mediaDesc: 'Acceso a imágenes, videos y otros materiales visuales para uso editorial.',
      download: 'Descargar',
      viewMore: 'Ver Más',
      contact: 'Contáctenos'
    },
    fr: {
      title: 'Espace Presse',
      subtitle: 'Matériel de Presse et Support Communication',
      intro: 'Azimut est disponible pour des interviews, commentaires et informations sur nos projets. Notre équipe de communication est prête à assister les journalistes, médias et professionnels intéressés par notre travail.',
      contactTitle: 'Contact Presse',
      contactEmail: 'presse@azmt.com.br',
      contactPhone: '+1 (604) 999-9999',
      pressKit: 'Kit Presse',
      pressKitDesc: 'Téléchargez notre kit complet avec des informations sur l\'entreprise, les principaux projets, images haute résolution et communiqués de presse.',
      releases: 'Communiqués de Presse',
      releasesDesc: 'Suivez nos communications officielles et notes de presse sur projets, partenariats et réalisations.',
      projects: 'Projets en Vedette',
      projectsDesc: 'Découvrez nos principaux projets et cas de succès qui démontrent notre expertise.',
      media: 'Matériel Média',
      mediaDesc: 'Accès aux images, vidéos et autres matériaux visuels pour usage éditorial.',
      download: 'Télécharger',
      viewMore: 'Voir Plus',
      contact: 'Contactez-nous'
    }
  }

  const content = pressContent[lang]

  return (
    <>
      <SEO 
        title={seo.title}
        description={seo.description}
        lang={lang}
        path="/press"
      />
      
      <div className="min-h-screen pt-12 md:pt-16 pb-24">
        {/* Hero Section */}
        <div className="mx-auto max-w-5xl px-3 sm:px-4 md:px-6 py-12">
          <div className="mb-12 text-center">
            <h1 className="mb-4 font-handel text-4xl uppercase tracking-[0.16em] md:text-5xl lg:text-6xl" style={{ color: 'var(--theme-text)' }}>
              {content.title}
            </h1>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
              {content.subtitle}
            </p>
          </div>

          {/* Intro */}
          <div className="mx-auto mb-12 max-w-4xl rounded-2xl border border-white/10 card-adaptive p-8 shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur">
            <p className="text-lg leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
              {content.intro}
            </p>
          </div>

          {/* Contact Info */}
          <div className="mx-auto mb-12 max-w-4xl rounded-2xl border border-white/10 card-adaptive p-8 shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur">
            <h2 className="mb-6 font-handel text-2xl uppercase tracking-[0.12em]" style={{ color: 'var(--theme-text)' }}>
              {content.contactTitle}
            </h2>
            <div className="space-y-4">
              <div>
                <p className="mb-2 text-sm font-medium uppercase tracking-wider" style={{ color: 'var(--theme-text-secondary)' }}>
                  {lang === 'pt' ? 'E-mail' : lang === 'es' ? 'Correo' : lang === 'fr' ? 'E-mail' : 'Email'}
                </p>
                <a 
                  href={`mailto:${content.contactEmail}`}
                  className="text-lg font-medium transition-colors hover:text-azimut-red"
                  style={{ color: 'var(--theme-text)' }}
                >
                  {content.contactEmail}
                </a>
              </div>
              <div>
                <p className="mb-2 text-sm font-medium uppercase tracking-wider" style={{ color: 'var(--theme-text-secondary)' }}>
                  {lang === 'pt' ? 'Telefone' : lang === 'es' ? 'Teléfono' : lang === 'fr' ? 'Téléphone' : 'Phone'}
                </p>
                <a 
                  href={`tel:${content.contactPhone.replace(/\s/g, '')}`}
                  className="text-lg font-medium transition-colors hover:text-azimut-red"
                  style={{ color: 'var(--theme-text)' }}
                >
                  {content.contactPhone}
                </a>
              </div>
            </div>
          </div>

          {/* Press Kit Section */}
          <div className="mx-auto mb-12 max-w-4xl">
            <h2 className="mb-8 font-handel text-3xl uppercase tracking-[0.12em]" style={{ color: 'var(--theme-text)' }}>
              {content.pressKit}
            </h2>
            <div className="rounded-2xl border border-white/10 card-adaptive p-8 shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur">
              <p className="mb-6 text-lg leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
                {content.pressKitDesc}
              </p>
              <a
                href="/press-kit.zip"
                download
                className="inline-flex items-center gap-2 rounded-lg bg-azimut-red px-6 py-3 font-sora text-sm font-medium uppercase tracking-[0.1em] text-white transition-all hover:bg-azimut-red/90"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {content.download}
              </a>
            </div>
          </div>

          {/* Featured Project - Museu Olímpico */}
          <div className="mx-auto mb-12 max-w-4xl">
            <h2 className="mb-8 font-handel text-3xl uppercase tracking-[0.12em]" style={{ color: 'var(--theme-text)' }}>
              {content.projects}
            </h2>
            <div className="rounded-2xl border border-white/10 card-adaptive overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur">
              <div className="p-8">
                <h3 className="mb-4 font-handel text-2xl uppercase tracking-[0.12em]" style={{ color: 'var(--theme-text)' }}>
                  {lang === 'pt' ? 'Museu Olímpico do Rio' : lang === 'es' ? 'Museo Olímpico de Río' : lang === 'fr' ? 'Musée Olympique de Rio' : 'Rio Olympic Museum'}
                </h3>
                <p className="mb-6 text-lg leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
                  {lang === 'pt' 
                    ? 'Projeto mega de quase dois anos, onde a Azimut assumiu a direção geral de tecnologia e toda a produção audiovisual, incluindo UI/grafismo, arte, vídeos, edição, motion graphics e integração entre cenografia, tecnologia e conteúdo audiovisual.'
                    : lang === 'es'
                    ? 'Proyecto mega de casi dos años, donde Azimut asumió la dirección general de tecnología y toda la producción audiovisual, incluyendo UI/grafismo, arte, videos, edición, motion graphics e integración entre escenografía, tecnología y contenido audiovisual.'
                    : lang === 'fr'
                    ? 'Projet méga de près de deux ans, où Azimut a assumé la direction générale de la technologie et toute la production audiovisuelle, y compris UI/grafisme, art, vidéos, montage, motion graphics et intégration entre scénographie, technologie et contenu audiovisuel.'
                    : 'Mega project of almost two years, where Azimut took on the general direction of technology and all audiovisual production, including UI/graphics, art, videos, editing, motion graphics and integration between scenography, technology and audiovisual content.'}
                </p>
                <div className="mb-6 flex flex-wrap gap-3">
                  <span className="rounded-full bg-azimut-red/20 px-4 py-2 text-sm font-medium text-white">
                    {lang === 'pt' ? 'Direção Geral de Tecnologia' : lang === 'es' ? 'Dirección General de Tecnología' : lang === 'fr' ? 'Direction Générale Technologie' : 'General Technology Direction'}
                  </span>
                  <span className="rounded-full bg-azimut-red/20 px-4 py-2 text-sm font-medium text-white">
                    {lang === 'pt' ? 'Produção Audiovisual' : lang === 'es' ? 'Producción Audiovisual' : lang === 'fr' ? 'Production Audiovisuelle' : 'Audiovisual Production'}
                  </span>
                  <span className="rounded-full bg-azimut-red/20 px-4 py-2 text-sm font-medium text-white">
                    {lang === 'pt' ? 'Games Interativos' : lang === 'es' ? 'Juegos Interactivos' : lang === 'fr' ? 'Jeux Interactifs' : 'Interactive Games'}
                  </span>
                  <span className="rounded-full bg-azimut-red/20 px-4 py-2 text-sm font-medium text-white">
                    {lang === 'pt' ? 'Sala Imersiva' : lang === 'es' ? 'Sala Inmersiva' : lang === 'fr' ? 'Salle Immersive' : 'Immersive Room'}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/work/museu-olimpico-rio"
                    className="inline-flex items-center gap-2 rounded-lg bg-azimut-red px-6 py-3 font-sora text-sm font-medium uppercase tracking-[0.1em] text-white transition-all hover:bg-azimut-red/90"
                  >
                    {content.viewMore}
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                  <a
                    href="https://museuolimpico.rio/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border border-white/20 bg-subtle px-6 py-3 font-sora text-sm font-medium uppercase tracking-[0.1em] text-white transition-all hover:bg-subtle-md hover:border-white/30"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    {lang === 'pt' ? 'Site Oficial do Museu' : lang === 'es' ? 'Sitio Oficial del Museo' : lang === 'fr' ? 'Site Officiel du Musée' : 'Official Museum Website'}
                  </a>
                </div>
                <p className="mt-4 text-sm italic" style={{ color: 'var(--theme-text-secondary)' }}>
                  {lang === 'pt' 
                    ? 'A Azimut foi responsável pela direção geral de tecnologia e produção audiovisual deste projeto oficial da Prefeitura do Rio de Janeiro.'
                    : lang === 'es'
                    ? 'Azimut fue responsable de la dirección general de tecnología y producción audiovisual de este proyecto oficial de la Prefectura de Río de Janeiro.'
                    : lang === 'fr'
                    ? 'Azimut était responsable de la direction générale de la technologie et de la production audiovisuelle de ce projet officiel de la Mairie de Rio de Janeiro.'
                    : 'Azimut was responsible for the general direction of technology and audiovisual production of this official project of the City of Rio de Janeiro.'}
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mx-auto max-w-4xl text-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-azimut-red bg-transparent px-8 py-4 font-sora text-sm font-medium uppercase tracking-[0.1em] text-white transition-all hover:bg-azimut-red"
            >
              {content.contact}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Press

