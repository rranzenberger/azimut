import React, { useEffect, useRef } from 'react'
import { type Lang } from '../i18n'
import SEO from '../components/SEO'
import LangLink from '../components/LangLink'

interface TermsProps {
  lang: Lang
}

const Terms: React.FC<TermsProps> = ({ lang }) => {
  const starRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const star = starRef.current
    if (!star) return

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset || document.documentElement.scrollTop
          const parallax = scrolled * 0.2
          if (star) {
            star.style.transform = `translateY(${parallax}px)`
          }
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const content = {
    pt: {
      title: 'Termos de Uso',
      subtitle: 'Condições de uso do site e serviços',
      lastUpdate: 'Última atualização: Janeiro 2026',
      highlights: [
        { icon: '✅', title: 'Transparente', desc: 'Linguagem clara e direta' },
        { icon: '⚖️', title: 'Justo', desc: 'Proteção mútua' },
        { icon: '🌍', title: 'Internacional', desc: 'Brasil, Canadá & EUA' }
      ],
      sections: [
        {
          icon: '📜',
          title: '1. Aceitação dos Termos',
          content: 'Ao acessar e usar azmt.com.br ou azimut.art ("Site"), você concorda com estes Termos de Uso. Se não concorda com algum termo, por favor não use nosso Site.',
          type: 'simple'
        },
        {
          icon: '🖥️',
          title: '2. Uso do Site',
          items: [
            { title: 'Permitido', icon: '✅', list: ['Navegar pelo site e portfolio', 'Preencher formulários de contato', 'Baixar press kit e materiais públicos', 'Compartilhar conteúdo nas redes sociais (com créditos)', 'Usar o Budget Wizard para orçamentos'] },
            { title: 'Proibido', icon: '⛔', list: ['Copiar conteúdo sem autorização escrita', 'Hackear ou comprometer a segurança', 'Usar robots, scrapers ou ferramentas automatizadas', 'Fazer engenharia reversa do código', 'Usar o site para fins ilegais'] }
          ],
          type: 'grid'
        },
        {
          icon: '©️',
          title: '3. Propriedade Intelectual',
          content: 'Todo o conteúdo do Site (textos, imagens, vídeos, logos, código-fonte, design) é propriedade da Azimut ou de seus licenciadores. Protegido por leis de direitos autorais do Brasil, Canadá e tratados internacionais.',
          highlight: '🎬 Projetos: Imagens e descrições são propriedade da Azimut e/ou clientes. Uso não autorizado é proibido.',
          type: 'simple'
        },
        {
          icon: '📝',
          title: '4. Formulários e Comunicações',
          content: 'Ao enviar formulários (contato, Budget Wizard, newsletter), você:',
          items: [
            { title: 'Você Garante', icon: '✅', list: ['Informações são verdadeiras e precisas', 'Tem autoridade para fornecer os dados', 'Leu e concorda com nossa Política de Privacidade'] },
            { title: 'Nos Autoriza', icon: '📧', list: ['Entrar em contato sobre sua solicitação', 'Enviar orçamentos e propostas', 'Incluir na newsletter (se optou)', 'Processar dados conforme Política de Privacidade'] }
          ],
          type: 'grid'
        },
        {
          icon: '📰',
          title: '5. Newsletter e Comunicações',
          content: 'Ao se inscrever em nossa newsletter, você concorda em receber comunicações da Azimut sobre projetos, novidades e conteúdo relevante.',
          highlight: '📵 Cancelamento: Você pode cancelar a inscrição a qualquer momento através do link no email ou em privacy@azimut.art',
          type: 'simple'
        },
        {
          icon: '⚠️',
          title: '6. Isenção de Responsabilidade',
          cards: [
            { icon: '🏗️', title: '"Como Está"', desc: 'Site fornecido sem garantias expressas ou implícitas' },
            { icon: '🔌', title: 'Disponibilidade', desc: 'Pode haver manutenções programadas ou não' },
            { icon: '🔗', title: 'Links Externos', desc: 'Não somos responsáveis por sites de terceiros' },
            { icon: '💾', title: 'Dados', desc: 'Faça backup de informações importantes' },
            { icon: '🛡️', title: 'Segurança', desc: 'Implementamos medidas, mas nenhum sistema é 100% seguro' },
            { icon: '📊', title: 'Precisão', desc: 'Conteúdo pode conter erros ou imprecisões' }
          ],
          type: 'cards'
        },
        {
          icon: '⚖️',
          title: '7. Limitação de Responsabilidade',
          content: 'Na máxima extensão permitida por lei, a Azimut não será responsável por danos diretos, indiretos, incidentais, especiais ou consequenciais resultantes do uso ou incapacidade de usar o Site.',
          highlight: '💰 Limite: Nossa responsabilidade total não excederá R$ 1.000 (mil reais) ou CAD$ 500 (quinhentos dólares canadenses)',
          type: 'simple'
        },
        {
          icon: '🤝',
          title: '8. Indenização',
          content: 'Você concorda em indenizar e isentar a Azimut, seus diretores, funcionários, parceiros e afiliados de qualquer reclamação, dano, perda ou despesa (incluindo honorários advocatícios) resultante de: violação destes Termos, uso do Site, ou violação de direitos de terceiros.',
          type: 'simple'
        },
        {
          icon: '🌍',
          title: '9. Lei Aplicável e Jurisdição',
          content: 'Estes Termos são regidos pelas leis aplicáveis conforme a localização do projeto:',
          flags: '🇧🇷 Brasil (São Paulo) | 🇨🇦 Canadá (Québec/Montreal)',
          highlight: '⚖️ Disputas serão resolvidas nos tribunais competentes de São Paulo (BR) ou Montreal (CA), conforme o caso.',
          type: 'simple'
        },
        {
          icon: '🔄',
          title: '10. Modificações',
          content: 'Reservamos o direito de modificar estes Termos a qualquer momento. Alterações significativas serão comunicadas através de aviso no Site. Seu uso contínuo após as mudanças constitui aceitação dos novos termos.',
          highlight: '📅 Data: Sempre verifique a data de "Última atualização" no topo desta página',
          type: 'simple'
        },
        {
          icon: '📧',
          title: '11. Contato',
          contact: {
            email: 'contact@azimut.art',
            legal: 'legal@azimut.art',
            locations: ['🇧🇷 São Paulo, Brasil', '🇨🇦 Montreal, Québec, Canadá']
          },
          type: 'contact'
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 🇫🇷 FRANCÊS (QUÉBEC) - Lei 96 exige versão completa em francês
    // ═══════════════════════════════════════════════════════════════
    fr: {
      title: 'Conditions d\'Utilisation',
      subtitle: 'Conditions d\'utilisation du site et des services',
      lastUpdate: 'Dernière mise à jour : Janvier 2026',
      highlights: [
        { icon: '✅', title: 'Transparent', desc: 'Langage clair et direct' },
        { icon: '⚖️', title: 'Équitable', desc: 'Protection mutuelle' },
        { icon: '🌍', title: 'International', desc: 'Brésil, Canada & É-U' }
      ],
      sections: [
        {
          icon: '📜',
          title: '1. Acceptation des Conditions',
          content: 'En accédant et en utilisant azmt.com.br ou azimut.art (« Site »), vous acceptez ces Conditions d\'Utilisation. Si vous n\'êtes pas d\'accord avec l\'un de ces termes, veuillez ne pas utiliser notre Site.',
          type: 'simple'
        },
        {
          icon: '🖥️',
          title: '2. Utilisation du Site',
          items: [
            { title: 'Permis', icon: '✅', list: ['Naviguer sur le site et le portfolio', 'Remplir les formulaires de contact', 'Télécharger le dossier de presse et documents publics', 'Partager le contenu sur les réseaux sociaux (avec crédits)', 'Utiliser le Budget Wizard pour des devis'] },
            { title: 'Interdit', icon: '⛔', list: ['Copier du contenu sans autorisation écrite', 'Pirater ou compromettre la sécurité', 'Utiliser des robots, scrapers ou outils automatisés', 'Faire de l\'ingénierie inverse du code', 'Utiliser le site à des fins illégales'] }
          ],
          type: 'grid'
        },
        {
          icon: '©️',
          title: '3. Propriété Intellectuelle',
          content: 'Tout le contenu du Site (textes, images, vidéos, logos, code source, design) est la propriété d\'Azimut ou de ses concédants. Protégé par les lois sur le droit d\'auteur du Brésil, du Canada et les traités internationaux.',
          highlight: '🎬 Projets : Les images et descriptions sont la propriété d\'Azimut et/ou des clients. L\'utilisation non autorisée est interdite.',
          type: 'simple'
        },
        {
          icon: '📝',
          title: '4. Formulaires et Communications',
          content: 'En soumettant des formulaires (contact, Budget Wizard, infolettre), vous :',
          items: [
            { title: 'Vous Garantissez', icon: '✅', list: ['Les informations sont vraies et exactes', 'Vous avez l\'autorité de fournir les données', 'Vous avez lu et acceptez notre Politique de Confidentialité'] },
            { title: 'Vous Nous Autorisez', icon: '📧', list: ['À vous contacter concernant votre demande', 'À envoyer des devis et propositions', 'À vous inclure dans l\'infolettre (si vous avez opté)', 'À traiter les données selon la Politique de Confidentialité'] }
          ],
          type: 'grid'
        },
        {
          icon: '📰',
          title: '5. Infolettre et Communications',
          content: 'En vous inscrivant à notre infolettre, vous acceptez de recevoir des communications d\'Azimut sur les projets, nouveautés et contenu pertinent.',
          highlight: '📵 Désinscription : Vous pouvez vous désinscrire à tout moment via le lien dans le courriel ou à privacy@azimut.art',
          type: 'simple'
        },
        {
          icon: '⚠️',
          title: '6. Exclusion de Garantie',
          cards: [
            { icon: '🏗️', title: '« Tel Quel »', desc: 'Site fourni sans garanties expresses ou implicites' },
            { icon: '🔌', title: 'Disponibilité', desc: 'Des maintenances programmées ou non peuvent survenir' },
            { icon: '🔗', title: 'Liens Externes', desc: 'Nous ne sommes pas responsables des sites tiers' },
            { icon: '💾', title: 'Données', desc: 'Sauvegardez vos informations importantes' },
            { icon: '🛡️', title: 'Sécurité', desc: 'Nous implémentons des mesures, mais aucun système n\'est 100% sécuritaire' },
            { icon: '📊', title: 'Exactitude', desc: 'Le contenu peut contenir des erreurs ou imprécisions' }
          ],
          type: 'cards'
        },
        {
          icon: '⚖️',
          title: '7. Limitation de Responsabilité',
          content: 'Dans la mesure maximale permise par la loi, Azimut ne sera pas responsable des dommages directs, indirects, accessoires, spéciaux ou consécutifs résultant de l\'utilisation ou de l\'impossibilité d\'utiliser le Site.',
          highlight: '💰 Limite : Notre responsabilité totale n\'excédera pas 500 $ CAD (cinq cents dollars canadiens)',
          type: 'simple'
        },
        {
          icon: '🤝',
          title: '8. Indemnisation',
          content: 'Vous acceptez d\'indemniser et de dégager de toute responsabilité Azimut, ses administrateurs, employés, partenaires et affiliés de toute réclamation, dommage, perte ou dépense (incluant les frais d\'avocats) résultant de : la violation de ces Conditions, l\'utilisation du Site, ou la violation des droits de tiers.',
          type: 'simple'
        },
        {
          icon: '🌍',
          title: '9. Loi Applicable et Juridiction',
          content: 'Ces Conditions sont régies par les lois applicables selon l\'emplacement du projet :',
          flags: '🇧🇷 Brésil (São Paulo) | 🇨🇦 Canada (Québec/Montréal)',
          highlight: '⚖️ Les litiges seront résolus devant les tribunaux compétents de São Paulo (BR) ou Montréal (CA), selon le cas.',
          type: 'simple'
        },
        {
          icon: '🔄',
          title: '10. Modifications',
          content: 'Nous nous réservons le droit de modifier ces Conditions à tout moment. Les changements importants seront communiqués par un avis sur le Site. Votre utilisation continue après les modifications constitue l\'acceptation des nouvelles conditions.',
          highlight: '📅 Date : Vérifiez toujours la date de « Dernière mise à jour » en haut de cette page',
          type: 'simple'
        },
        {
          icon: '📧',
          title: '11. Contact',
          contact: {
            email: 'contact@azimut.art',
            legal: 'legal@azimut.art',
            locations: ['🇧🇷 São Paulo, Brésil', '🇨🇦 Montréal, Québec, Canada']
          },
          type: 'contact'
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 🇬🇧 INGLÊS - Versão completa
    // ═══════════════════════════════════════════════════════════════
    en: {
      title: 'Terms of Use',
      subtitle: 'Site and service usage conditions',
      lastUpdate: 'Last updated: January 2026',
      highlights: [
        { icon: '✅', title: 'Transparent', desc: 'Clear and direct language' },
        { icon: '⚖️', title: 'Fair', desc: 'Mutual protection' },
        { icon: '🌍', title: 'International', desc: 'Brazil, Canada & USA' }
      ],
      sections: [
        {
          icon: '📜',
          title: '1. Acceptance of Terms',
          content: 'By accessing and using azmt.com.br or azimut.art ("Site"), you agree to these Terms of Use. If you do not agree with any term, please do not use our Site.',
          type: 'simple'
        },
        {
          icon: '🖥️',
          title: '2. Site Usage',
          items: [
            { title: 'Permitted', icon: '✅', list: ['Browse the site and portfolio', 'Fill out contact forms', 'Download press kit and public materials', 'Share content on social media (with credits)', 'Use Budget Wizard for quotes'] },
            { title: 'Prohibited', icon: '⛔', list: ['Copy content without written authorization', 'Hack or compromise security', 'Use robots, scrapers or automated tools', 'Reverse engineer the code', 'Use the site for illegal purposes'] }
          ],
          type: 'grid'
        },
        {
          icon: '©️',
          title: '3. Intellectual Property',
          content: 'All Site content (text, images, videos, logos, source code, design) is owned by Azimut or its licensors. Protected by copyright laws of Brazil, Canada and international treaties.',
          highlight: '🎬 Projects: Images and descriptions are property of Azimut and/or clients. Unauthorized use is prohibited.',
          type: 'simple'
        },
        {
          icon: '📝',
          title: '4. Forms and Communications',
          content: 'By submitting forms (contact, Budget Wizard, newsletter), you:',
          items: [
            { title: 'You Guarantee', icon: '✅', list: ['Information is true and accurate', 'You have authority to provide the data', 'You have read and agree to our Privacy Policy'] },
            { title: 'You Authorize Us', icon: '📧', list: ['To contact you about your request', 'To send quotes and proposals', 'To include you in newsletter (if opted)', 'To process data per Privacy Policy'] }
          ],
          type: 'grid'
        },
        {
          icon: '📰',
          title: '5. Newsletter and Communications',
          content: 'By subscribing to our newsletter, you agree to receive communications from Azimut about projects, news and relevant content.',
          highlight: '📵 Unsubscribe: You can unsubscribe at any time via the link in the email or at privacy@azimut.art',
          type: 'simple'
        },
        {
          icon: '⚠️',
          title: '6. Disclaimer',
          cards: [
            { icon: '🏗️', title: '"As Is"', desc: 'Site provided without express or implied warranties' },
            { icon: '🔌', title: 'Availability', desc: 'Scheduled or unscheduled maintenance may occur' },
            { icon: '🔗', title: 'External Links', desc: 'We are not responsible for third-party sites' },
            { icon: '💾', title: 'Data', desc: 'Back up important information' },
            { icon: '🛡️', title: 'Security', desc: 'We implement measures, but no system is 100% secure' },
            { icon: '📊', title: 'Accuracy', desc: 'Content may contain errors or inaccuracies' }
          ],
          type: 'cards'
        },
        {
          icon: '⚖️',
          title: '7. Limitation of Liability',
          content: 'To the maximum extent permitted by law, Azimut will not be liable for direct, indirect, incidental, special or consequential damages resulting from use or inability to use the Site.',
          highlight: '💰 Limit: Our total liability will not exceed CAD$ 500 (five hundred Canadian dollars) or USD$ 500',
          type: 'simple'
        },
        {
          icon: '🤝',
          title: '8. Indemnification',
          content: 'You agree to indemnify and hold harmless Azimut, its directors, employees, partners and affiliates from any claim, damage, loss or expense (including legal fees) resulting from: violation of these Terms, use of the Site, or violation of third-party rights.',
          type: 'simple'
        },
        {
          icon: '🌍',
          title: '9. Governing Law and Jurisdiction',
          content: 'These Terms are governed by the applicable laws according to the project location:',
          flags: '🇧🇷 Brazil (São Paulo) | 🇨🇦 Canada (Quebec/Montreal)',
          highlight: '⚖️ Disputes will be resolved in the competent courts of São Paulo (BR) or Montreal (CA), as applicable.',
          type: 'simple'
        },
        {
          icon: '🔄',
          title: '10. Modifications',
          content: 'We reserve the right to modify these Terms at any time. Significant changes will be communicated through Site notice. Your continued use after changes constitutes acceptance of the new terms.',
          highlight: '📅 Date: Always check the "Last updated" date at the top of this page',
          type: 'simple'
        },
        {
          icon: '📧',
          title: '11. Contact',
          contact: {
            email: 'contact@azimut.art',
            legal: 'legal@azimut.art',
            locations: ['🇧🇷 São Paulo, Brazil', '🇨🇦 Montreal, Quebec, Canada']
          },
          type: 'contact'
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 🇪🇸 ESPANHOL - Versão completa
    // ═══════════════════════════════════════════════════════════════
    es: {
      title: 'Términos de Uso',
      subtitle: 'Condiciones de uso del sitio y servicios',
      lastUpdate: 'Última actualización: Enero 2026',
      highlights: [
        { icon: '✅', title: 'Transparente', desc: 'Lenguaje claro y directo' },
        { icon: '⚖️', title: 'Justo', desc: 'Protección mutua' },
        { icon: '🌍', title: 'Internacional', desc: 'Brasil, Canadá y EE.UU.' }
      ],
      sections: [
        {
          icon: '📜',
          title: '1. Aceptación de los Términos',
          content: 'Al acceder y usar azmt.com.br o azimut.art ("Sitio"), usted acepta estos Términos de Uso. Si no está de acuerdo con algún término, por favor no use nuestro Sitio.',
          type: 'simple'
        },
        {
          icon: '🖥️',
          title: '2. Uso del Sitio',
          items: [
            { title: 'Permitido', icon: '✅', list: ['Navegar por el sitio y portfolio', 'Completar formularios de contacto', 'Descargar press kit y materiales públicos', 'Compartir contenido en redes sociales (con créditos)', 'Usar el Budget Wizard para cotizaciones'] },
            { title: 'Prohibido', icon: '⛔', list: ['Copiar contenido sin autorización escrita', 'Hackear o comprometer la seguridad', 'Usar robots, scrapers o herramientas automatizadas', 'Hacer ingeniería inversa del código', 'Usar el sitio para fines ilegales'] }
          ],
          type: 'grid'
        },
        {
          icon: '©️',
          title: '3. Propiedad Intelectual',
          content: 'Todo el contenido del Sitio (textos, imágenes, videos, logos, código fuente, diseño) es propiedad de Azimut o sus licenciantes. Protegido por leyes de derechos de autor de Brasil, Canadá y tratados internacionales.',
          highlight: '🎬 Proyectos: Las imágenes y descripciones son propiedad de Azimut y/o clientes. El uso no autorizado está prohibido.',
          type: 'simple'
        },
        {
          icon: '⚖️',
          title: '7. Limitación de Responsabilidad',
          content: 'En la máxima extensión permitida por la ley, Azimut no será responsable por daños directos, indirectos, incidentales, especiales o consecuentes resultantes del uso o incapacidad de usar el Sitio.',
          highlight: '💰 Límite: Nuestra responsabilidad total no excederá USD$ 500 (quinientos dólares)',
          type: 'simple'
        },
        {
          icon: '🌍',
          title: '9. Ley Aplicable y Jurisdicción',
          content: 'Estos Términos se rigen por las leyes aplicables según la ubicación del proyecto:',
          flags: '🇧🇷 Brasil (São Paulo) | 🇨🇦 Canadá (Quebec/Montreal)',
          type: 'simple'
        },
        {
          icon: '📧',
          title: '11. Contacto',
          contact: {
            email: 'contact@azimut.art',
            legal: 'legal@azimut.art',
            locations: ['🇧🇷 São Paulo, Brasil', '🇨🇦 Montreal, Quebec, Canadá']
          },
          type: 'contact'
        }
      ]
    }
  }

  const text = content[lang] || content.pt

  return (
    <>
      <SEO 
        title={`${text.title} - Azimut`}
        description={lang === 'fr' ? 'Conditions d\'utilisation du site Azimut' : 'Terms of Use - Azimut Immersive'}
        lang={lang}
        path="/terms"
      />
      
      <main className="relative py-16 md:py-20">
        {/* Star Parallax */}
        <div 
          ref={starRef}
          className="pointer-events-none fixed top-20 -right-28 h-[520px] w-[520px] md:-right-40 md:h-[680px] md:w-[680px] transition-transform duration-75"
          style={{ opacity: 0.15, zIndex: -5, willChange: 'transform' }}
        >
          <img src="/logo-azimut-star.svg" alt="" className="h-full w-full object-contain" loading="lazy" />
        </div>

        <div className="mx-auto max-w-6xl px-6">
          {/* Hero */}
          <div className="mb-16 text-center">
            <h1 className="mb-4 font-handel text-5xl md:text-6xl font-bold uppercase text-theme-text">
              {text.title}
            </h1>
            <p className="text-xl text-theme-text-secondary max-w-3xl mx-auto">
              {text.subtitle}
            </p>
            <p className="text-sm text-theme-text-secondary/60 mt-4">
              {text.lastUpdate}
            </p>
          </div>

          {/* Highlights */}
          {text.highlights && (
            <div className="grid md:grid-cols-3 gap-6 mb-16">
              {text.highlights.map((item, i) => (
                <div key={i} className="text-center p-6 rounded-lg bg-slate-900/30 border border-azimut-red/20">
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-theme-text-secondary">{item.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* Sections */}
          <div className="max-w-4xl mx-auto space-y-12">
            {text.sections && text.sections.map((section, i) => (
              <section key={i} className="relative">
                <div className="flex items-start gap-4 mb-6">
                  <span className="text-4xl">{section.icon}</span>
                  <h2 className="font-handel text-2xl md:text-3xl font-bold text-theme-text">
                    {section.title}
                  </h2>
                </div>

                {section.type === 'simple' && (
                  <div className="pl-0 md:pl-16 space-y-4">
                    <p className="text-base md:text-lg leading-relaxed text-theme-text-secondary">
                      {section.content}
                    </p>
                    {section.highlight && (
                      <div className="p-4 rounded-lg bg-azimut-red/10 border-l-4 border-azimut-red">
                        <p className="text-sm font-semibold text-white">{section.highlight}</p>
                      </div>
                    )}
                    {section.flags && (
                      <div className="text-center p-4 rounded-lg bg-slate-900/30 border border-azimut-red/20">
                        <p className="text-lg font-semibold text-white">{section.flags}</p>
                      </div>
                    )}
                  </div>
                )}

                {section.type === 'grid' && section.items && (
                  <div className="pl-0 md:pl-16 grid md:grid-cols-2 gap-6">
                    {section.items.map((item, j) => (
                      <div key={j} className="p-6 rounded-lg bg-slate-900/30 border border-azimut-red/20">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-2xl">{item.icon}</span>
                          <h4 className="text-lg font-bold text-white">{item.title}</h4>
                        </div>
                        <ul className="space-y-2">
                          {item.list.map((li, k) => (
                            <li key={k} className="flex items-start gap-2 text-sm text-theme-text-secondary">
                              <span className="text-azimut-red mt-0.5">•</span>
                              <span>{li}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}

                {section.type === 'cards' && section.cards && (
                  <div className="pl-0 md:pl-16 grid grid-cols-2 md:grid-cols-3 gap-4">
                    {section.cards.map((card, j) => (
                      <div key={j} className="p-4 rounded-lg bg-slate-900/50 border border-azimut-red/20 text-center">
                        <div className="text-2xl md:text-3xl mb-2">{card.icon}</div>
                        <h4 className="font-semibold text-white mb-2 text-sm md:text-base">{card.title}</h4>
                        <p className="text-xs md:text-sm text-theme-text-secondary">{card.desc}</p>
                      </div>
                    ))}
                  </div>
                )}

                {section.type === 'contact' && section.contact && (
                  <div className="pl-0 md:pl-16">
                    <div className="p-6 rounded-lg bg-gradient-to-br from-azimut-red/10 to-slate-900/50 border border-azimut-red/30">
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-theme-text-secondary mb-1">📧 {lang === 'fr' ? 'Courriel Général' : lang === 'es' ? 'Email General' : lang === 'en' ? 'General Email' : 'Email Geral'}</p>
                          <a 
                            href={`mailto:${section.contact.email}`}
                            className="text-lg font-bold text-white hover:text-azimut-red transition-colors"
                          >
                            {section.contact.email}
                          </a>
                        </div>
                        <div>
                          <p className="text-sm text-theme-text-secondary mb-1">⚖️ {lang === 'fr' ? 'Questions Juridiques' : lang === 'es' ? 'Consultas Legales' : lang === 'en' ? 'Legal Inquiries' : 'Questões Jurídicas'}</p>
                          <a 
                            href={`mailto:${section.contact.legal}`}
                            className="text-lg font-bold text-white hover:text-azimut-red transition-colors"
                          >
                            {section.contact.legal}
                          </a>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
                        {section.contact.locations.map((loc, j) => (
                          <span key={j} className="text-sm text-theme-text-secondary">
                            {loc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <LangLink
              to="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-azimut-red text-white font-sora font-semibold uppercase tracking-wider hover:bg-azimut-red/90 transition-all shadow-lg"
            >
              {lang === 'fr' ? 'Des Questions?' : lang === 'es' ? '¿Preguntas?' : lang === 'en' ? 'Questions?' : 'Dúvidas?'} → {lang === 'fr' ? 'Contactez-nous' : lang === 'es' ? 'Contáctenos' : lang === 'en' ? 'Contact Us' : 'Fale Conosco'}
            </LangLink>
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-white/10 text-center">
            <p className="text-sm text-gray-500">
              {lang === 'fr' ? '© 2026 Azimut. Tous droits réservés.' : 
               lang === 'es' ? '© 2026 Azimut. Todos los derechos reservados.' :
               lang === 'en' ? '© 2026 Azimut. All rights reserved.' :
               '© 2026 Azimut. Todos os direitos reservados.'}
            </p>
          </footer>
        </div>
      </main>
    </>
  )
}

export default Terms
