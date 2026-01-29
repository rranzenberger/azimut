import React, { useEffect, useRef } from 'react'
import { type Lang } from '../i18n'
import SEO from '../components/SEO'
import LangLink from '../components/LangLink'
import { useTheme } from '../contexts/ThemeContext'

interface PrivacyProps {
  lang: Lang
}

const Privacy: React.FC<PrivacyProps> = ({ lang }) => {
  const starRef = useRef<HTMLDivElement>(null)
  const { theme } = useTheme()

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
      title: 'Política de Privacidade',
      subtitle: 'Transparência total sobre como protegemos seus dados',
      lastUpdate: 'Última atualização: Janeiro 2026',
      badge: '🔒 LGPD • GDPR • BC PIPA • Lei 25 Québec • PIPEDA • CCPA/VCDPA',
      quickLinks: {
        title: 'Navegação Rápida',
        items: [
          { icon: '📊', text: 'Dados Coletados', id: 'dados' },
          { icon: '🔒', text: 'Segurança', id: 'seguranca' },
          { icon: '⚖️', text: 'Seus Direitos', id: 'direitos' },
          { icon: '🇨🇦', text: 'Québec & Canadá', id: 'quebec' },
          { icon: '🇺🇸', text: 'EUA (CCPA)', id: 'ccpa' },
          { icon: '📧', text: 'Contato DPO', id: 'contato' }
        ]
      },
      highlights: [
        { icon: '🛡️', title: 'LGPD & GDPR', desc: 'Brasil e União Europeia' },
        { icon: 'maple-leaf', title: 'Lei 25 & PIPEDA', desc: 'Québec e Canadá' },
        { icon: '🇺🇸', title: 'CCPA Compliant', desc: 'Califórnia, EUA' },
        { icon: '🚫', title: 'Sem Venda de Dados', desc: 'Nunca vendemos seus dados' }
      ],
      sections: [
        {
          id: 'intro',
          icon: '👋',
          title: '1. Introdução',
          content: `A Azimut ("nós", "nosso") respeita sua privacidade e está comprometida em proteger seus dados pessoais. Esta política explica claramente como coletamos, usamos e protegemos suas informações.`,
          highlight: 'Conformidade com LGPD (Brasil), GDPR (Europa), Lei 25 (Québec), PIPEDA (Canadá) e CCPA (Califórnia)'
        },
        {
          id: 'responsavel',
          icon: '👤',
          title: '2. Responsável pela Proteção de Dados',
          content: `Conforme exigido pela Lei 25 do Québec e GDPR, designamos um responsável pela proteção de dados:`,
          contacts: [
            { label: '👤 Responsável', value: 'Data Protection Officer (DPO)', type: 'text' },
            { label: '📧 Email DPO', value: 'privacy@azimutimmersive.com', type: 'email' },
            { label: '🏢 Empresa', value: 'Azimut Immersive Inc.', type: 'text' },
            { label: '📍 Canadá', value: 'Vancouver, BC, Canadá', type: 'text' }
          ]
        },
        {
          id: 'dados',
          icon: '📊',
          title: '3. Dados que Coletamos',
          items: [
            { subtitle: 'Fornecidos por Você', list: ['Nome e email (formulários)', 'Informações profissionais (empresa, cargo)', 'Orçamento e cronograma (Budget Wizard)', 'Preferências de comunicação'] },
            { subtitle: 'Coletados Automaticamente', list: ['Endereço IP (anonimizado)', 'Tipo de navegador e dispositivo', 'Páginas visitadas e tempo gasto', 'País e idioma preferido', 'Referência de origem'] },
            { subtitle: 'Cookies e Rastreamento', list: ['Essenciais: idioma, tema, consentimento', 'Analytics: Plausible (privacy-first, sem cookies de terceiros)', 'Session ID: identificador anônimo temporário'] }
          ]
        },
        {
          id: 'uso',
          icon: '⚡',
          title: '4. Como Usamos seus Dados',
          items: [
            { subtitle: 'Finalidades Principais', list: ['Responder solicitações de contato', 'Enviar orçamentos e propostas', 'Comunicação sobre projetos', 'Enviar newsletter (com consentimento)'] },
            { subtitle: 'Melhoria de Experiência', list: ['Personalizar recomendações', 'Melhorar navegação do site', 'Identificar interesses relevantes'] },
            { subtitle: 'Análise com IA', list: ['Identificar perfil de interesse (anônimo)', 'Recomendar projetos relevantes', 'Calcular scores de engajamento'] }
          ],
          highlight: '🔒 Análise sempre anônima - NÃO vendemos ou compartilhamos dados com terceiros para marketing!'
        },
        {
          id: 'seguranca',
          icon: '🔒',
          title: '5. Segurança e Armazenamento',
          grid: [
            { icon: '🏢', title: 'Servidores', desc: 'Vercel (EUA/Canadá), PostgreSQL criptografado' },
            { icon: '🔐', title: 'Criptografia', desc: 'HTTPS/TLS, dados em repouso criptografados' },
            { icon: '⏱️', title: 'Retenção', desc: 'Contato: 5 anos | Navegação: 2 anos | Cookies: 12 meses' },
            { icon: '🛡️', title: 'Acesso', desc: 'Restrito apenas à equipe autorizada' },
            { icon: '📋', title: 'Auditorias', desc: 'Revisões regulares de segurança' },
            { icon: '🚨', title: 'Violações', desc: 'Notificação em 72h conforme GDPR/Lei 25' }
          ]
        },
        {
          id: 'direitos',
          icon: '⚖️',
          title: '6. Seus Direitos',
          content: 'Você tem os seguintes direitos sobre seus dados pessoais:',
          rights: [
            { icon: '👁️', title: 'Acesso', desc: 'Solicitar cópia dos seus dados' },
            { icon: '✏️', title: 'Retificação', desc: 'Corrigir dados incorretos' },
            { icon: '🗑️', title: 'Exclusão', desc: 'Direito ao esquecimento' },
            { icon: '📦', title: 'Portabilidade', desc: 'Receber dados em formato estruturado (JSON/CSV)' },
            { icon: '🚫', title: 'Oposição', desc: 'Opor-se ao processamento' },
            { icon: '🔄', title: 'Revogação', desc: 'Retirar consentimento a qualquer momento' },
            { icon: '⚙️', title: 'Revisão', desc: 'Solicitar revisão de decisões automatizadas (IA)' },
            { icon: '📵', title: 'Opt-out', desc: 'Cancelar newsletter e comunicações' }
          ],
          cta: '📧 Exercer direitos: privacy@azimutimmersive.com (resposta em até 15 dias úteis)'
        },
        {
          id: 'canada',
          icon: 'maple-leaf',
          title: '7. Canadá (PIPEDA, BC PIPA, Alberta PIPA, Lei 25 Québec)',
          content: `Para residentes do Canadá, cumprimos as leis federais e provinciais de privacidade:`,
          items: [
            { subtitle: '🏛️ British Columbia - PIPA', list: ['Personal Information Protection Act (BC)', 'Aplica-se a Vancouver e residentes de BC', 'Consentimento informado obrigatório', 'Direito de acessar e corrigir dados', 'Notificação de violações de segurança'] },
            { subtitle: '🏔️ Alberta - PIPA', list: ['Personal Information Protection Act (Alberta)', 'Proteções similares ao PIPEDA federal', 'Consentimento expresso para dados sensíveis', 'Direito de retirar consentimento'] },
            { subtitle: '⚜️ Québec - Lei 25', list: ['Política em francês obrigatória', 'Consentimento expresso para dados sensíveis', 'Portabilidade de dados garantida', 'Avaliação de Impacto à Privacidade', 'Responsável pela proteção de dados'] },
            { subtitle: '🍁 PIPEDA (Federal)', list: ['Aplica-se em todo o Canadá para atividades comerciais', 'Consentimento informado e válido', 'Coleta limitada ao necessário', 'Notificação de violações ao OPC'] }
          ],
          highlight: '🇨🇦 Estamos baseados em Vancouver, BC - Total conformidade com BC PIPA e PIPEDA'
        },
        {
          id: 'usa',
          icon: '🇺🇸',
          title: '8. Estados Unidos (Leis Estaduais de Privacidade)',
          content: `Para residentes dos EUA, cumprimos as leis estaduais de privacidade aplicáveis:`,
          items: [
            { subtitle: '🌴 Califórnia (CCPA/CPRA)', list: ['Direito de saber, deletar, corrigir dados', 'Opt-out de venda/compartilhamento', 'Não-discriminação por exercer direitos', '"Do Not Sell My Personal Information" respeitado'] },
            { subtitle: '🏛️ Virginia (VCDPA)', list: ['Direito de acessar, corrigir, deletar', 'Opt-in obrigatório para dados sensíveis', 'Direito de recusar publicidade direcionada', 'Portabilidade de dados'] },
            { subtitle: '🏔️ Colorado (CPA)', list: ['Direito de acessar, corrigir, deletar', 'Opt-out de perfilamento', 'Mecanismo universal de opt-out respeitado', 'Direitos de portabilidade de dados'] },
            { subtitle: '📋 Outros Estados', list: ['Connecticut, Utah, Oregon, Montana, Iowa', 'Direitos similares: acessar, deletar, corrigir', 'Opt-out de venda de dados', 'Respeitamos todos os direitos estaduais'] }
          ],
          highlight: '🚫 A Azimut NÃO vende dados pessoais. Não compartilhamos com terceiros para marketing ou publicidade.'
        },
        {
          id: 'transferencia',
          icon: '🌍',
          title: '9. Transferência Internacional',
          content: `Como operamos no Brasil, Canadá e atendemos clientes globalmente, seus dados podem ser transferidos entre países. Garantimos proteção adequada através de:`,
          items: [
            { subtitle: 'Medidas de Proteção', list: ['Cláusulas contratuais padrão (SCCs)', 'Certificações de segurança dos provedores', 'Conformidade com LGPD, GDPR, Lei 25, PIPEDA'] }
          ],
          highlight: '🇧🇷 Brasil | 🇨🇦 Canadá (Québec) | 🇺🇸 EUA | 🇪🇺 União Europeia'
        },
        {
          id: 'cookies',
          icon: '🍪',
          title: '10. Cookies e Consentimento',
          content: 'Você pode controlar cookies através do banner de consentimento ou configurações do navegador:',
          items: [
            { subtitle: 'Cookies Essenciais (não podem ser desabilitados)', list: ['cookie-consent: sua escolha de cookies', 'lang: idioma preferido', 'theme: tema claro/escuro'] },
            { subtitle: 'Cookies de Análise (podem ser desabilitados)', list: ['Plausible Analytics: privacy-first, GDPR compliant', 'Session ID: identificador anônimo temporário'] }
          ]
        },
        {
          id: 'contato',
          icon: '📧',
          title: '11. Contato e Reclamações',
          content: 'Para exercer seus direitos ou fazer reclamações:',
          contacts: [
            { label: '📧 Privacidade/DPO', value: 'privacy@azimutimmersive.com', type: 'email' },
            { label: '📧 Geral', value: 'contact@azimutimmersive.com', type: 'email' },
            { label: '🇧🇷 Brasil', value: 'Rio de Janeiro & Florianópolis', type: 'address' },
            { label: '🇨🇦 Canadá', value: 'Vancouver, BC', type: 'address' }
          ],
          highlight: '⏱️ Prazo de resposta: 15 dias úteis (LGPD/GDPR) | 30 dias (Lei 25/PIPEDA)'
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 🇫🇷 FRANCÊS (QUÉBEC) - Lei 25 + Lei 96 exigem versão completa em francês
    // ═══════════════════════════════════════════════════════════════
    fr: {
      title: 'Politique de Confidentialité',
      subtitle: 'Transparence totale sur la protection de vos données',
      lastUpdate: 'Dernière mise à jour : Janvier 2026',
      badge: '🔒 Loi 25 Québec • LPRPDE • RGPD • LGPD • CCPA',
      quickLinks: {
        title: 'Navigation Rapide',
        items: [
          { icon: '📊', text: 'Données Collectées', id: 'dados' },
          { icon: '🔒', text: 'Sécurité', id: 'seguranca' },
          { icon: '⚖️', text: 'Vos Droits', id: 'direitos' },
          { icon: '🇨🇦', text: 'Québec & Canada', id: 'quebec' },
          { icon: '🇺🇸', text: 'É-U (CCPA)', id: 'ccpa' },
          { icon: '📧', text: 'Contact DPO', id: 'contato' }
        ]
      },
      highlights: [
        { icon: 'maple-leaf', title: 'Loi 25 & LPRPDE', desc: 'Québec et Canada' },
        { icon: '🛡️', title: 'RGPD & LGPD', desc: 'Europe et Brésil' },
        { icon: '🇺🇸', title: 'CCPA Conforme', desc: 'Californie, É-U' },
        { icon: '🚫', title: 'Aucune Vente', desc: 'Nous ne vendons jamais vos données' }
      ],
      sections: [
        {
          id: 'intro',
          icon: '👋',
          title: '1. Introduction',
          content: `Azimut (« nous », « notre ») respecte votre vie privée et s'engage à protéger vos données personnelles. Cette politique explique clairement comment nous collectons, utilisons et protégeons vos informations.`,
          highlight: 'Conformité avec la Loi 25 (Québec), LPRPDE (Canada), RGPD (Europe), LGPD (Brésil) et CCPA (Californie)'
        },
        {
          id: 'responsavel',
          icon: '👤',
          title: '2. Responsable de la Protection des Données',
          content: `Conformément à la Loi 25 du Québec et au RGPD, nous avons désigné un responsable de la protection des renseignements personnels :`,
          contacts: [
            { label: '👤 Responsable', value: 'Délégué à la Protection des Données (DPO)', type: 'text' },
            { label: '📧 Courriel DPO', value: 'privacy@azimutimmersive.com', type: 'email' },
            { label: '🏢 Entreprise', value: 'Azimut Immersive Inc.', type: 'text' },
            { label: '📍 Canada', value: 'Vancouver, BC, Canada', type: 'text' }
          ]
        },
        {
          id: 'dados',
          icon: '📊',
          title: '3. Données que Nous Collectons',
          items: [
            { subtitle: 'Fournies par Vous', list: ['Nom et courriel (formulaires)', 'Informations professionnelles (entreprise, poste)', 'Budget et échéancier (Budget Wizard)', 'Préférences de communication'] },
            { subtitle: 'Collectées Automatiquement', list: ['Adresse IP (anonymisée)', 'Type de navigateur et appareil', 'Pages visitées et temps passé', 'Pays et langue préférée', 'Source de référence'] },
            { subtitle: 'Témoins (Cookies) et Suivi', list: ['Essentiels : langue, thème, consentement', 'Analytiques : Plausible (respect de la vie privée, sans témoins tiers)', 'ID de session : identifiant anonyme temporaire'] }
          ]
        },
        {
          id: 'uso',
          icon: '⚡',
          title: '4. Comment Nous Utilisons vos Données',
          items: [
            { subtitle: 'Finalités Principales', list: ['Répondre aux demandes de contact', 'Envoyer des devis et propositions', 'Communication sur les projets', 'Envoyer l\'infolettre (avec consentement)'] },
            { subtitle: 'Amélioration de l\'Expérience', list: ['Personnaliser les recommandations', 'Améliorer la navigation du site', 'Identifier les intérêts pertinents'] },
            { subtitle: 'Analyse avec IA', list: ['Identifier le profil d\'intérêt (anonyme)', 'Recommander des projets pertinents', 'Calculer les scores d\'engagement'] }
          ],
          highlight: '🔒 Analyse toujours anonyme - Nous ne vendons NI partageons vos données avec des tiers pour le marketing !'
        },
        {
          id: 'seguranca',
          icon: '🔒',
          title: '5. Sécurité et Stockage',
          grid: [
            { icon: '🏢', title: 'Serveurs', desc: 'Vercel (É-U/Canada), PostgreSQL chiffré' },
            { icon: '🔐', title: 'Chiffrement', desc: 'HTTPS/TLS, données au repos chiffrées' },
            { icon: '⏱️', title: 'Conservation', desc: 'Contact : 5 ans | Navigation : 2 ans | Témoins : 12 mois' },
            { icon: '🛡️', title: 'Accès', desc: 'Restreint à l\'équipe autorisée seulement' },
            { icon: '📋', title: 'Audits', desc: 'Révisions régulières de sécurité' },
            { icon: '🚨', title: 'Violations', desc: 'Notification dans les 72h selon RGPD/Loi 25' }
          ]
        },
        {
          id: 'direitos',
          icon: '⚖️',
          title: '6. Vos Droits',
          content: 'Vous avez les droits suivants sur vos données personnelles :',
          rights: [
            { icon: '👁️', title: 'Accès', desc: 'Demander une copie de vos données' },
            { icon: '✏️', title: 'Rectification', desc: 'Corriger des données incorrectes' },
            { icon: '🗑️', title: 'Suppression', desc: 'Droit à l\'effacement' },
            { icon: '📦', title: 'Portabilité', desc: 'Recevoir vos données en format structuré (JSON/CSV)' },
            { icon: '🚫', title: 'Opposition', desc: 'S\'opposer au traitement' },
            { icon: '🔄', title: 'Révocation', desc: 'Retirer votre consentement à tout moment' },
            { icon: '⚙️', title: 'Révision', desc: 'Demander la révision des décisions automatisées (IA)' },
            { icon: '📵', title: 'Désinscription', desc: 'Annuler l\'infolettre et les communications' }
          ],
          cta: '📧 Exercer vos droits : privacy@azimutimmersive.com (réponse dans les 30 jours)'
        },
        {
          id: 'quebec',
          icon: 'maple-leaf',
          title: '7. Québec & Canada (Loi 25 / LPRPDE)',
          content: `Pour les résidents du Québec et du Canada, nous respectons intégralement la Loi 25 et la LPRPDE :`,
          items: [
            { subtitle: '🏛️ Loi 25 du Québec', list: ['Politique de confidentialité disponible en français', 'Consentement exprès pour les données sensibles', 'Portabilité des données garantie', 'Évaluation des facteurs relatifs à la vie privée (EFVP)', 'Responsable de la protection des renseignements personnels désigné'] },
            { subtitle: '🍁 LPRPDE (Fédéral)', list: ['Consentement éclairé et valide', 'Finalités clairement identifiées', 'Collecte limitée au nécessaire', 'Notification des atteintes à la sécurité'] }
          ],
          highlight: '🇨🇦 Les données peuvent être stockées au Canada (Vancouver) ou aux É-U avec protection adéquate'
        },
        {
          id: 'ccpa',
          icon: '🇺🇸',
          title: '8. Californie, É-U (CCPA/CPRA)',
          content: `Pour les résidents de Californie, vous avez des droits supplémentaires sous le CCPA/CPRA :`,
          rights: [
            { icon: '📋', title: 'Savoir', desc: 'Quelles données nous collectons et comment nous les utilisons' },
            { icon: '🗑️', title: 'Supprimer', desc: 'Demander la suppression de vos données personnelles' },
            { icon: '🚫', title: 'Refuser', desc: 'Refuser la vente/partage de données' },
            { icon: '⚖️', title: 'Non-discrimination', desc: 'Même service indépendamment de vos choix de confidentialité' }
          ],
          highlight: '🚫 Azimut ne vend PAS de données personnelles. Nous ne partageons pas avec des tiers pour le marketing.'
        },
        {
          id: 'transferencia',
          icon: '🌍',
          title: '9. Transfert International',
          content: `Comme nous opérons au Brésil, au Canada et servons des clients mondialement, vos données peuvent être transférées entre pays. Nous garantissons une protection adéquate par :`,
          items: [
            { subtitle: 'Mesures de Protection', list: ['Clauses contractuelles types (CCT)', 'Certifications de sécurité des fournisseurs', 'Conformité avec Loi 25, LPRPDE, RGPD, LGPD'] }
          ],
          highlight: '🇧🇷 Brésil | 🇨🇦 Canada (Québec) | 🇺🇸 É-U | 🇪🇺 Union Européenne'
        },
        {
          id: 'cookies',
          icon: '🍪',
          title: '10. Témoins (Cookies) et Consentement',
          content: 'Vous pouvez contrôler les témoins via la bannière de consentement ou les paramètres de votre navigateur :',
          items: [
            { subtitle: 'Témoins Essentiels (ne peuvent pas être désactivés)', list: ['cookie-consent : votre choix de témoins', 'lang : langue préférée', 'theme : thème clair/sombre'] },
            { subtitle: 'Témoins Analytiques (peuvent être désactivés)', list: ['Plausible Analytics : respect de la vie privée, conforme RGPD', 'ID de session : identifiant anonyme temporaire'] }
          ]
        },
        {
          id: 'contato',
          icon: '📧',
          title: '11. Contact et Plaintes',
          content: 'Pour exercer vos droits ou déposer une plainte :',
          contacts: [
            { label: '📧 Confidentialité/DPO', value: 'privacy@azimutimmersive.com', type: 'email' },
            { label: '📧 Général', value: 'contact@azimutimmersive.com', type: 'email' },
            { label: '🇧🇷 Brésil', value: 'Rio de Janeiro & Florianópolis', type: 'address' },
            { label: '🇨🇦 Canada', value: 'Vancouver, BC', type: 'address' }
          ],
          highlight: '⏱️ Délai de réponse : 30 jours (Loi 25/LPRPDE) | 15 jours ouvrables (RGPD/LGPD)'
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 🇬🇧 INGLÊS - Versão completa
    // ═══════════════════════════════════════════════════════════════
    en: {
      title: 'Privacy Policy',
      subtitle: 'Full transparency on how we protect your data',
      lastUpdate: 'Last updated: January 2026',
      badge: '🔒 GDPR • LGPD • BC PIPA • Quebec Law 25 • PIPEDA • CCPA/VCDPA/CPA',
      quickLinks: {
        title: 'Quick Navigation',
        items: [
          { icon: '📊', text: 'Data Collected', id: 'dados' },
          { icon: '🔒', text: 'Security', id: 'seguranca' },
          { icon: '⚖️', text: 'Your Rights', id: 'direitos' },
          { icon: '🇨🇦', text: 'Quebec & Canada', id: 'quebec' },
          { icon: '🇺🇸', text: 'USA (CCPA)', id: 'ccpa' },
          { icon: '📧', text: 'DPO Contact', id: 'contato' }
        ]
      },
      highlights: [
        { icon: '🛡️', title: 'GDPR & LGPD', desc: 'Europe and Brazil' },
        { icon: 'maple-leaf', title: 'Law 25 & PIPEDA', desc: 'Quebec and Canada' },
        { icon: '🇺🇸', title: 'CCPA Compliant', desc: 'California, USA' },
        { icon: '🚫', title: 'No Data Sales', desc: 'We never sell your data' }
      ],
      sections: [
        {
          id: 'intro',
          icon: '👋',
          title: '1. Introduction',
          content: `Azimut ("we", "our") respects your privacy and is committed to protecting your personal data. This policy clearly explains how we collect, use, and protect your information.`,
          highlight: 'Compliant with GDPR (Europe), LGPD (Brazil), Law 25 (Quebec), PIPEDA (Canada) and CCPA (California)'
        },
        {
          id: 'responsavel',
          icon: '👤',
          title: '2. Data Protection Officer',
          content: `As required by Quebec's Law 25 and GDPR, we have designated a data protection officer:`,
          contacts: [
            { label: '👤 Officer', value: 'Data Protection Officer (DPO)', type: 'text' },
            { label: '📧 DPO Email', value: 'privacy@azimutimmersive.com', type: 'email' },
            { label: '🏢 Company', value: 'Azimut Immersive Inc.', type: 'text' },
            { label: '📍 Canada', value: 'Vancouver, BC, Canada', type: 'text' }
          ]
        },
        {
          id: 'dados',
          icon: '📊',
          title: '3. Data We Collect',
          items: [
            { subtitle: 'Provided by You', list: ['Name and email (forms)', 'Professional information (company, position)', 'Budget and timeline (Budget Wizard)', 'Communication preferences'] },
            { subtitle: 'Collected Automatically', list: ['IP address (anonymized)', 'Browser and device type', 'Pages visited and time spent', 'Country and preferred language', 'Referral source'] },
            { subtitle: 'Cookies and Tracking', list: ['Essential: language, theme, consent', 'Analytics: Plausible (privacy-first, no third-party cookies)', 'Session ID: temporary anonymous identifier'] }
          ]
        },
        {
          id: 'uso',
          icon: '⚡',
          title: '4. How We Use Your Data',
          items: [
            { subtitle: 'Main Purposes', list: ['Respond to contact requests', 'Send quotes and proposals', 'Project communication', 'Send newsletter (with consent)'] },
            { subtitle: 'Experience Improvement', list: ['Personalize recommendations', 'Improve site navigation', 'Identify relevant interests'] },
            { subtitle: 'AI Analysis', list: ['Identify interest profile (anonymous)', 'Recommend relevant projects', 'Calculate engagement scores'] }
          ],
          highlight: '🔒 Analysis is always anonymous - We do NOT sell or share data with third parties for marketing!'
        },
        {
          id: 'seguranca',
          icon: '🔒',
          title: '5. Security and Storage',
          grid: [
            { icon: '🏢', title: 'Servers', desc: 'Vercel (USA/Canada), encrypted PostgreSQL' },
            { icon: '🔐', title: 'Encryption', desc: 'HTTPS/TLS, data at rest encrypted' },
            { icon: '⏱️', title: 'Retention', desc: 'Contact: 5 years | Navigation: 2 years | Cookies: 12 months' },
            { icon: '🛡️', title: 'Access', desc: 'Restricted to authorized team only' },
            { icon: '📋', title: 'Audits', desc: 'Regular security reviews' },
            { icon: '🚨', title: 'Breaches', desc: 'Notification within 72h per GDPR/Law 25' }
          ]
        },
        {
          id: 'direitos',
          icon: '⚖️',
          title: '6. Your Rights',
          content: 'You have the following rights over your personal data:',
          rights: [
            { icon: '👁️', title: 'Access', desc: 'Request a copy of your data' },
            { icon: '✏️', title: 'Rectification', desc: 'Correct inaccurate data' },
            { icon: '🗑️', title: 'Erasure', desc: 'Right to be forgotten' },
            { icon: '📦', title: 'Portability', desc: 'Receive data in structured format (JSON/CSV)' },
            { icon: '🚫', title: 'Object', desc: 'Object to processing' },
            { icon: '🔄', title: 'Withdraw', desc: 'Withdraw consent at any time' },
            { icon: '⚙️', title: 'Review', desc: 'Request review of automated decisions (AI)' },
            { icon: '📵', title: 'Opt-out', desc: 'Unsubscribe from newsletter and communications' }
          ],
          cta: '📧 Exercise rights: privacy@azimutimmersive.com (response within 15 business days)'
        },
        {
          id: 'quebec',
          icon: 'maple-leaf',
          title: '7. Canada (PIPEDA, BC PIPA, Alberta PIPA, Quebec Law 25)',
          content: `For Canadian residents, we comply with federal and provincial privacy laws:`,
          items: [
            { subtitle: '🏛️ British Columbia - PIPA', list: ['Personal Information Protection Act (BC)', 'Applies to Vancouver and BC residents', 'Informed consent required', 'Right to access and correct data', 'Security breach notification'] },
            { subtitle: '🏔️ Alberta - PIPA', list: ['Personal Information Protection Act (Alberta)', 'Similar protections to federal PIPEDA', 'Express consent for sensitive data', 'Right to withdraw consent'] },
            { subtitle: '⚜️ Quebec - Law 25', list: ['Privacy policy in French required', 'Express consent for sensitive data', 'Data portability guaranteed', 'Privacy Impact Assessment', 'Designated privacy officer'] },
            { subtitle: '🍁 PIPEDA (Federal)', list: ['Applies across Canada for commercial activities', 'Informed and valid consent', 'Collection limited to necessary', 'Security breach notification to OPC'] }
          ],
          highlight: '🇨🇦 We are based in Vancouver, BC - Full compliance with BC PIPA and PIPEDA'
        },
        {
          id: 'usa',
          icon: '🇺🇸',
          title: '8. United States (State Privacy Laws)',
          content: `For US residents, we comply with applicable state privacy laws:`,
          items: [
            { subtitle: '🌴 California (CCPA/CPRA)', list: ['Right to know, delete, correct data', 'Opt-out of sale/sharing', 'Non-discrimination for exercising rights', '"Do Not Sell My Personal Information" honored'] },
            { subtitle: '🏛️ Virginia (VCDPA)', list: ['Right to access, correct, delete', 'Opt-in required for sensitive data', 'Right to opt-out of targeted advertising', 'Data portability in portable format'] },
            { subtitle: '🏔️ Colorado (CPA)', list: ['Right to access, correct, delete', 'Opt-out of profiling', 'Universal opt-out mechanism honored', 'Data portability rights'] },
            { subtitle: '📋 Other States', list: ['Connecticut, Utah, Oregon, Montana, Iowa', 'Similar rights: access, delete, correct', 'Opt-out of data sales', 'We honor all state privacy rights'] }
          ],
          highlight: '🚫 Azimut does NOT sell personal data. We do not share with third parties for marketing or advertising.'
        },
        {
          id: 'transferencia',
          icon: '🌍',
          title: '9. International Transfer',
          content: `As we operate in Brazil, Canada and serve global clients, your data may be transferred between countries. We ensure adequate protection through:`,
          items: [
            { subtitle: 'Protection Measures', list: ['Standard Contractual Clauses (SCCs)', 'Provider security certifications', 'Compliance with Law 25, PIPEDA, GDPR, LGPD'] }
          ],
          highlight: '🇧🇷 Brazil | 🇨🇦 Canada (Quebec) | 🇺🇸 USA | 🇪🇺 European Union'
        },
        {
          id: 'cookies',
          icon: '🍪',
          title: '10. Cookies and Consent',
          content: 'You can control cookies through the consent banner or browser settings:',
          items: [
            { subtitle: 'Essential Cookies (cannot be disabled)', list: ['cookie-consent: your cookie choice', 'lang: preferred language', 'theme: light/dark theme'] },
            { subtitle: 'Analytics Cookies (can be disabled)', list: ['Plausible Analytics: privacy-first, GDPR compliant', 'Session ID: temporary anonymous identifier'] }
          ]
        },
        {
          id: 'contato',
          icon: '📧',
          title: '11. Contact and Complaints',
          content: 'To exercise your rights or file complaints:',
          contacts: [
            { label: '📧 Privacy/DPO', value: 'privacy@azimutimmersive.com', type: 'email' },
            { label: '📧 General', value: 'contact@azimutimmersive.com', type: 'email' },
            { label: '🇧🇷 Brazil', value: 'Rio de Janeiro & Florianópolis', type: 'address' },
            { label: '🇨🇦 Canada', value: 'Vancouver, BC', type: 'address' }
          ],
          highlight: '⏱️ Response time: 15 business days (LGPD/GDPR) | 30 days (Law 25/PIPEDA)'
        }
      ]
    },

    // ═══════════════════════════════════════════════════════════════
    // 🇪🇸 ESPANHOL - Versão completa
    // ═══════════════════════════════════════════════════════════════
    es: {
      title: 'Política de Privacidad',
      subtitle: 'Transparencia total sobre cómo protegemos sus datos',
      lastUpdate: 'Última actualización: Enero 2026',
      badge: '🔒 LGPD • RGPD • Ley 25 Québec • PIPEDA • CCPA',
      quickLinks: {
        title: 'Navegación Rápida',
        items: [
          { icon: '📊', text: 'Datos Recopilados', id: 'dados' },
          { icon: '🔒', text: 'Seguridad', id: 'seguranca' },
          { icon: '⚖️', text: 'Sus Derechos', id: 'direitos' },
          { icon: '🇨🇦', text: 'Québec & Canadá', id: 'quebec' },
          { icon: '🇺🇸', text: 'EE.UU. (CCPA)', id: 'ccpa' },
          { icon: '📧', text: 'Contacto DPO', id: 'contato' }
        ]
      },
      highlights: [
        { icon: '🛡️', title: 'LGPD & RGPD', desc: 'Brasil y Unión Europea' },
        { icon: 'maple-leaf', title: 'Ley 25 & PIPEDA', desc: 'Québec y Canadá' },
        { icon: '🇺🇸', title: 'CCPA Conforme', desc: 'California, EE.UU.' },
        { icon: '🚫', title: 'Sin Venta de Datos', desc: 'Nunca vendemos sus datos' }
      ],
      sections: [
        {
          id: 'intro',
          icon: '👋',
          title: '1. Introducción',
          content: `Azimut ("nosotros", "nuestro") respeta su privacidad y está comprometido con la protección de sus datos personales. Esta política explica claramente cómo recopilamos, usamos y protegemos su información.`,
          highlight: 'Cumplimiento con LGPD (Brasil), RGPD (Europa), Ley 25 (Québec), PIPEDA (Canadá) y CCPA (California)'
        },
        {
          id: 'responsavel',
          icon: '👤',
          title: '2. Responsable de Protección de Datos',
          content: `Según lo exigido por la Ley 25 de Québec y el RGPD, hemos designado un responsable de protección de datos:`,
          contacts: [
            { label: '👤 Responsable', value: 'Delegado de Protección de Datos (DPO)', type: 'text' },
            { label: '📧 Email DPO', value: 'privacy@azimutimmersive.com', type: 'email' },
            { label: '🏢 Empresa', value: 'Azimut Immersive Inc.', type: 'text' },
            { label: '📍 Canadá', value: 'Vancouver, BC, Canadá', type: 'text' }
          ]
        },
        {
          id: 'dados',
          icon: '📊',
          title: '3. Datos que Recopilamos',
          items: [
            { subtitle: 'Proporcionados por Usted', list: ['Nombre y email (formularios)', 'Información profesional (empresa, cargo)', 'Presupuesto y cronograma (Budget Wizard)', 'Preferencias de comunicación'] },
            { subtitle: 'Recopilados Automáticamente', list: ['Dirección IP (anonimizada)', 'Tipo de navegador y dispositivo', 'Páginas visitadas y tiempo', 'País e idioma preferido', 'Fuente de referencia'] },
            { subtitle: 'Cookies y Seguimiento', list: ['Esenciales: idioma, tema, consentimiento', 'Analytics: Plausible (privacy-first)', 'Session ID: identificador anónimo temporal'] }
          ]
        },
        {
          id: 'direitos',
          icon: '⚖️',
          title: '6. Sus Derechos',
          content: 'Usted tiene los siguientes derechos sobre sus datos personales:',
          rights: [
            { icon: '👁️', title: 'Acceso', desc: 'Solicitar copia de sus datos' },
            { icon: '✏️', title: 'Rectificación', desc: 'Corregir datos incorrectos' },
            { icon: '🗑️', title: 'Supresión', desc: 'Derecho al olvido' },
            { icon: '📦', title: 'Portabilidad', desc: 'Recibir datos en formato estructurado' },
            { icon: '🚫', title: 'Oposición', desc: 'Oponerse al tratamiento' },
            { icon: '🔄', title: 'Revocación', desc: 'Retirar consentimiento en cualquier momento' }
          ],
          cta: '📧 Ejercer derechos: privacy@azimutimmersive.com (respuesta en 15 días hábiles)'
        },
        {
          id: 'contato',
          icon: '📧',
          title: '11. Contacto y Reclamaciones',
          content: 'Para ejercer sus derechos o presentar reclamaciones:',
          contacts: [
            { label: '📧 Privacidad/DPO', value: 'privacy@azimutimmersive.com', type: 'email' },
            { label: '📧 General', value: 'contact@azimutimmersive.com', type: 'email' },
            { label: '🇧🇷 Brasil', value: 'Rio de Janeiro & Florianópolis', type: 'address' },
            { label: '🇨🇦 Canadá', value: 'Vancouver, BC', type: 'address' }
          ]
        }
      ]
    }
  }

  const text = content[lang] || content.pt

  return (
    <>
      <SEO 
        title={`${text.title} - Azimut`}
        description={lang === 'fr' ? 'Politique de confidentialité conforme Loi 25, LPRPDE, RGPD' : 'Privacy Policy - LGPD/GDPR/Law 25/PIPEDA/CCPA compliant'}
        lang={lang}
        path="/privacy"
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

        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          {/* Hero — gradiente sutil, paleta do site */}
          <div className="relative mb-12 md:mb-16 text-center rounded-2xl overflow-hidden bg-gradient-to-b from-azimut-red/5 via-transparent to-transparent border border-azimut-red/10 py-10 md:py-14 px-6">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(201,35,55,0.08),transparent)]" aria-hidden />
            <div className="relative">
              <div className="mb-4 inline-block rounded-full bg-azimut-red/10 px-4 py-2 text-sm font-semibold text-azimut-red border border-azimut-red/30">
                {text.badge}
              </div>
              <h1 className="mb-4 font-handel text-4xl sm:text-5xl md:text-6xl font-bold uppercase text-theme-text">
                {text.title}
              </h1>
              <p className="text-lg md:text-xl text-theme-text-secondary max-w-3xl mx-auto">
                {text.subtitle}
              </p>
              <p className="text-sm text-theme-text-secondary/60 mt-4">
                {text.lastUpdate}
              </p>
            </div>
          </div>

          {/* Highlights — cards com gradiente leve */}
          {text.highlights && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-12 md:mb-16">
              {text.highlights.map((item, i) => (
                <div key={i} className="text-center p-4 md:p-6 rounded-xl bg-gradient-to-b from-white/5 to-transparent dark:from-white/[0.06] dark:to-transparent border border-azimut-red/20 hover:border-azimut-red/40 hover:from-azimut-red/5 transition-all duration-300">
                  <div className="text-3xl sm:text-4xl md:text-5xl mb-2 md:mb-3">
                    {item.icon === 'maple-leaf' ? (
                      <img src="/Maple-Leaf-Canada.png" alt="Canada" className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 inline-block" />
                    ) : (
                      item.icon
                    )}
                  </div>
                  <h3 className={`text-sm md:text-base font-bold mb-0.5 md:mb-1 ${theme === 'dark' ? 'text-white' : 'text-on-dark-primary'}`}>{item.title}</h3>
                  <p className={`text-xs md:text-sm ${theme === 'dark' ? 'text-theme-text-secondary' : 'text-on-dark-secondary'}`}>{item.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* Mobile: navegação rápida horizontal */}
          {text.quickLinks && (
            <div className="lg:hidden mb-8 -mx-4 sm:mx-0 overflow-x-auto pb-2" style={{ scrollbarWidth: 'thin' }}>
              <nav className="flex gap-2 px-4 sm:px-0 min-w-max sm:flex-wrap sm:min-w-0" aria-label="Navegação rápida">
                {text.quickLinks.items.map((item, i) => (
                  <a
                    key={i}
                    href={`#${item.id}`}
                    className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/5 border border-azimut-red/20 text-theme-text-secondary hover:text-azimut-red hover:border-azimut-red/40 text-sm font-medium transition-colors"
                  >
                    <span>{item.icon}</span>
                    <span>{item.text}</span>
                  </a>
                ))}
              </nav>
            </div>
          )}

          {/* Content Grid */}
          <div className="grid lg:grid-cols-[1fr,300px] gap-12">
            {/* Main Content */}
            <div className="space-y-12">
              {text.sections && text.sections.map((section, i) => (
                <section key={i} id={section.id} className="scroll-mt-24">
                  <div className="flex items-start gap-4 mb-6">
                    <span className="text-4xl">
                      {section.icon === 'maple-leaf' ? (
                        <img src="/Maple-Leaf-Canada.png" alt="Canada" className="w-10 h-10 inline-block" />
                      ) : (
                        section.icon
                      )}
                    </span>
                    <h2 className="font-handel text-2xl md:text-3xl font-bold text-theme-text">
                      {section.title}
                    </h2>
                  </div>

                  {section.content && (
                    <p className="text-base md:text-lg leading-relaxed text-theme-text-secondary mb-4 pl-0 md:pl-16">
                      {section.content}
                    </p>
                  )}

                  {section.highlight && (
                    <div className="pl-0 md:pl-16 mb-6">
                      <div className="p-4 rounded-xl bg-gradient-to-r from-azimut-red/10 to-transparent border-l-4 border-azimut-red">
                        <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-[#1e1c1a]'}`}>{section.highlight}</p>
                      </div>
                    </div>
                  )}

                  {section.items && (
                    <div className="pl-0 md:pl-16 space-y-6">
                      {section.items.map((item, j) => (
                        <div key={j}>
                          <h4 className={`text-lg font-semibold mb-3 ${theme === 'dark' ? 'text-white' : 'text-[#1e1c1a]'}`}>{item.subtitle}</h4>
                          <ul className="space-y-2">
                            {item.list.map((li, k) => (
                              <li key={k} className="flex items-start gap-2 text-theme-text-secondary">
                                <span className="text-azimut-red mt-1">✓</span>
                                <span>{li}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.grid && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 pl-0 md:pl-16">
                      {section.grid.map((card, j) => (
                        <div key={j} className="p-4 rounded-xl bg-gradient-to-b from-white/5 to-transparent dark:from-white/[0.06] border border-azimut-red/20 hover:border-azimut-red/30 transition-colors">
                          <div className="text-2xl md:text-3xl mb-2">{card.icon}</div>
                          <h4 className={`font-semibold mb-2 text-sm md:text-base ${theme === 'dark' ? 'text-white' : 'text-on-dark-primary'}`}>{card.title}</h4>
                          <p className={`text-xs md:text-sm ${theme === 'dark' ? 'text-theme-text-secondary' : 'text-on-dark-secondary'}`}>{card.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.rights && (
                    <div className="grid sm:grid-cols-2 gap-3 md:gap-4 pl-0 md:pl-16 mb-6">
                      {section.rights.map((right, j) => (
                        <div key={j} className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent dark:from-white/[0.06] border border-azimut-red/15 hover:border-azimut-red/30 transition-colors">
                          <span className="text-2xl flex-shrink-0">{right.icon}</span>
                          <div className="min-w-0">
                            <h4 className={`font-semibold mb-1 text-sm md:text-base ${theme === 'dark' ? 'text-white' : 'text-on-dark-primary'}`}>{right.title}</h4>
                            <p className={`text-sm ${theme === 'dark' ? 'text-theme-text-secondary' : 'text-on-dark-secondary'}`}>{right.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.cta && (
                    <div className="pl-0 md:pl-16">
                      <div className="p-4 rounded-xl bg-gradient-to-r from-azimut-red/10 to-azimut-red/5 border border-azimut-red/30 text-center">
                        <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-white' : 'text-[#1e1c1a]'}`}>{section.cta}</p>
                      </div>
                    </div>
                  )}

                  {section.contacts && (
                    <div className="grid sm:grid-cols-2 gap-3 md:gap-4 pl-0 md:pl-16">
                      {section.contacts.map((contact, j) => (
                        <div key={j} className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-transparent dark:from-white/[0.06] border border-azimut-red/15">
                          <p className="text-sm text-theme-text-secondary mb-1">{contact.label}</p>
                          {contact.type === 'email' ? (
                            <a href={`mailto:${contact.value}`} className={`font-medium ${theme === 'dark' ? 'text-white hover:text-azimut-red' : 'text-on-dark-primary hover:text-azimut-red'} transition-colors`}>
                              {contact.value}
                            </a>
                          ) : (
                            <p className={theme === 'dark' ? 'text-white' : 'text-on-dark-primary'}>{contact.value}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Sidebar — Quick Links (desktop): gradiente e borda */}
            {text.quickLinks && (
              <aside className="hidden lg:block">
                <div className="sticky top-24 p-6 rounded-2xl bg-gradient-to-b from-white/5 to-transparent dark:from-white/[0.06] border border-azimut-red/20 border-l-4 border-l-azimut-red/60 backdrop-blur-sm">
                  <h3 className="text-sm font-bold text-theme-text mb-4 uppercase tracking-wider">
                    {text.quickLinks.title}
                  </h3>
                  <nav className="space-y-1" aria-label="Navegação rápida">
                    {text.quickLinks.items.map((item, i) => (
                      <a
                        key={i}
                        href={`#${item.id}`}
                        className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-theme-text-secondary hover:text-azimut-red hover:bg-azimut-red/10 transition-all"
                      >
                        <span>{item.icon}</span>
                        <span>{item.text}</span>
                      </a>
                    ))}
                  </nav>

                  <div className="mt-8 pt-6 border-t border-azimut-red/20">
                    <LangLink
                      to="/contact"
                      className="block text-center px-4 py-3 rounded-xl bg-azimut-red text-white text-sm font-semibold hover:bg-azimut-red/90 transition-all"
                    >
                      {lang === 'fr' ? '📧 Questions?' : lang === 'es' ? '📧 ¿Preguntas?' : lang === 'en' ? '📧 Questions?' : '📧 Dúvidas?'}
                    </LangLink>
                  </div>
                </div>
              </aside>
            )}
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

export default Privacy
