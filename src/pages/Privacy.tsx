import React, { useEffect, useRef } from 'react'
import { t, type Lang } from '../i18n'
import SEO from '../components/SEO'

interface PrivacyProps {
  lang: Lang
}

/**
 * 📄 POLÍTICA DE PRIVACIDADE - LGPD/GDPR
 * 
 * Página completa explicando:
 * - Quais dados coletamos
 * - Como usamos
 * - Direitos do usuário
 * - Como exercer direitos
 */

const Privacy: React.FC<PrivacyProps> = ({ lang }) => {
  const starRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (starRef.current) {
      starRef.current.style.opacity = '0.15'
    }
  }, [])

  // Textos por idioma
  const content = {
    pt: {
      title: 'Política de Privacidade',
      lastUpdate: 'Última atualização: Janeiro 2026',
      sections: [
        {
          title: '1. Introdução',
          content: `A Azimut ("nós", "nosso" ou "conosco") respeita sua privacidade e está comprometida em proteger seus dados pessoais. Esta Política de Privacidade explica como coletamos, usamos, armazenamos e protegemos suas informações quando você visita nosso site azimut.com.

Esta política está em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018) do Brasil e o Regulamento Geral de Proteção de Dados (GDPR) da União Europeia.`
        },
        {
          title: '2. Dados que Coletamos',
          content: `**2.1. Dados Fornecidos Voluntariamente:**
- Nome e email (quando você preenche formulários de contato)
- Informações profissionais (empresa, cargo, tipo de projeto)
- Orçamento e cronograma (quando usa nosso Budget Wizard)

**2.2. Dados Coletados Automaticamente:**
- Endereço IP (anonimizado)
- Tipo de navegador e dispositivo
- Páginas visitadas e tempo gasto
- Scroll depth (profundidade de rolagem)
- País e idioma preferido
- Referência de origem (de onde você veio)

**2.3. Cookies e Tecnologias Similares:**
- **Cookies Essenciais:** Necessários para o funcionamento do site (preferências de idioma, tema claro/escuro, consentimento de cookies)
- **Cookies de Análise:** Plausible Analytics (privacy-first, sem cookies de terceiros, GDPR compliant)
- **Session ID:** Identificador único anônimo para análise de comportamento (não identifica você pessoalmente)`
        },
        {
          title: '3. Como Usamos Seus Dados',
          content: `**3.1. Dados de Contato:**
- Responder suas solicitações
- Enviar orçamentos e propostas
- Comunicação relacionada a projetos

**3.2. Dados de Navegação:**
- Melhorar a experiência do usuário
- Entender quais conteúdos são mais relevantes
- Personalizar recomendações de projetos
- Identificar leads qualificados

**3.3. Análise com IA:**
Usamos inteligência artificial (DeepSeek) para:
- Identificar seu perfil de interesse (curador de museu, gerente de marca, etc.)
- Recomendar projetos relevantes para você
- Calcular scores de interesse em diferentes áreas
- Sugerir ações e próximas páginas

**Importante:** Toda análise é baseada em comportamento anônimo. Não vendemos, alugamos ou compartilhamos seus dados com terceiros para marketing.`
        },
        {
          title: '4. Base Legal (LGPD)',
          content: `Processamos seus dados com base nas seguintes bases legais:

- **Consentimento:** Quando você aceita cookies ou preenche formulários
- **Legítimo Interesse:** Para análise de tráfego e melhoria do site
- **Execução de Contrato:** Quando você solicita orçamentos ou serviços
- **Obrigação Legal:** Quando exigido por lei`
        },
        {
          title: '5. Armazenamento e Segurança',
          content: `**5.1. Onde Armazenamos:**
- Servidores seguros em cloud (Vercel, AWS)
- Banco de dados criptografado (PostgreSQL)
- Backups automáticos diários

**5.2. Por Quanto Tempo:**
- **Dados de contato:** 5 anos após último contato
- **Dados de navegação:** 2 anos
- **Session IDs:** 1 ano
- **Cookies essenciais:** Até você limpar o navegador
- **Cookies de análise:** 12 meses

**5.3. Segurança:**
- Conexão HTTPS/TLS criptografada
- Acesso restrito aos dados (apenas equipe autorizada)
- Logs de acesso monitorados
- Auditorias regulares de segurança`
        },
        {
          title: '6. Seus Direitos (LGPD/GDPR)',
          content: `Você tem os seguintes direitos sobre seus dados:

**🔹 Acesso:** Solicitar cópia dos dados que temos sobre você  
**🔹 Retificação:** Corrigir dados incorretos ou incompletos  
**🔹 Exclusão:** Solicitar a eliminação de seus dados ("direito ao esquecimento")  
**🔹 Portabilidade:** Receber seus dados em formato estruturado  
**🔹 Oposição:** Opor-se ao processamento de seus dados  
**🔹 Revogação:** Retirar consentimento a qualquer momento  
**🔹 Revisão:** Solicitar revisão de decisões automatizadas (IA)

**Como Exercer Seus Direitos:**  
Envie email para: **privacy@azimut.com**  
Responderemos em até 15 dias úteis.`
        },
        {
          title: '7. Cookies e Consentimento',
          content: `Você pode controlar cookies através:

1. **Banner de Cookies:** Escolha "Aceitar tudo" ou "Apenas essenciais"
2. **Configurações do Navegador:** Bloqueie ou exclua cookies manualmente
3. **Opt-out Analytics:** Desabilite Plausible via banner

**Cookies Essenciais (não podem ser desabilitados):**
- \`cookie-consent\`: Salva sua escolha sobre cookies
- \`lang\`: Seu idioma preferido
- \`theme\`: Tema claro/escuro

**Cookies de Análise (podem ser desabilitados):**
- Plausible Analytics (privacy-first, GDPR compliant)
- Session ID (identificador anônimo de sessão)`
        },
        {
          title: '8. Transferência Internacional',
          content: `Como atuamos no Brasil e Canadá, seus dados podem ser transferidos entre esses países. Garantimos proteção adequada através de:

- Cláusulas contratuais padrão
- Certificações de segurança
- Conformidade com LGPD e GDPR

Países onde operamos: 🇧🇷 Brasil, 🇨🇦 Canadá`
        },
        {
          title: '9. Menores de Idade',
          content: `Nosso site não é direcionado a menores de 18 anos. Não coletamos intencionalmente dados de menores. Se você é pai/mãe e acredita que seu filho forneceu dados, entre em contato conosco.`
        },
        {
          title: '10. Alterações nesta Política',
          content: `Podemos atualizar esta Política periodicamente. Alterações significativas serão comunicadas através:

- Banner no site
- Email (se tivermos seu contato)
- Data "Última atualização" no topo desta página

Recomendamos revisar esta política regularmente.`
        },
        {
          title: '11. Contato',
          content: `**Controlador de Dados / DPO:**  
Azimut - Immersive, Interactive & Cinematic Experiences

**Email Privacidade:** privacy@azimut.com  
**Email Geral:** contact@azimut.com  
**Telefone:** +55 (XX) XXXX-XXXX (Brasil) | +1 (XXX) XXX-XXXX (Canadá)

**Endereços:**  
🇧🇷 [Endereço Brasil]  
🇨🇦 [Endereço Canadá]

**Horário de Atendimento:** Segunda a Sexta, 9h-18h (horário local)`
        }
      ],
      footer: '© 2026 Azimut. Todos os direitos reservados.'
    },
    en: {
      title: 'Privacy Policy',
      lastUpdate: 'Last updated: January 2026',
      sections: [
        {
          title: '1. Introduction',
          content: `Azimut ("we", "our" or "us") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, store and protect your information when you visit our website azimut.com.

This policy complies with Brazil's General Data Protection Law (LGPD - Law No. 13.709/2018) and the European Union's General Data Protection Regulation (GDPR).`
        },
        {
          title: '2. Data We Collect',
          content: `**2.1. Data Provided Voluntarily:**
- Name and email (when you fill contact forms)
- Professional information (company, position, project type)
- Budget and timeline (when using our Budget Wizard)

**2.2. Automatically Collected Data:**
- IP address (anonymized)
- Browser type and device
- Pages visited and time spent
- Scroll depth
- Country and preferred language
- Referral source

**2.3. Cookies and Similar Technologies:**
- **Essential Cookies:** Necessary for site functionality (language preferences, light/dark theme, cookie consent)
- **Analytics Cookies:** Plausible Analytics (privacy-first, no third-party cookies, GDPR compliant)
- **Session ID:** Anonymous unique identifier for behavior analysis (doesn't personally identify you)`
        },
        {
          title: '3. How We Use Your Data',
          content: `**3.1. Contact Data:**
- Respond to your inquiries
- Send quotes and proposals
- Project-related communication

**3.2. Navigation Data:**
- Improve user experience
- Understand which content is most relevant
- Personalize project recommendations
- Identify qualified leads

**3.3. AI Analysis:**
We use artificial intelligence (DeepSeek) to:
- Identify your interest profile (museum curator, brand manager, etc.)
- Recommend relevant projects
- Calculate interest scores in different areas
- Suggest actions and next pages

**Important:** All analysis is based on anonymous behavior. We don't sell, rent or share your data with third parties for marketing.`
        },
        {
          title: '4. Legal Basis (LGPD)',
          content: `We process your data based on the following legal grounds:

- **Consent:** When you accept cookies or fill forms
- **Legitimate Interest:** For traffic analysis and site improvement
- **Contract Execution:** When you request quotes or services
- **Legal Obligation:** When required by law`
        },
        {
          title: '5. Storage and Security',
          content: `**5.1. Where We Store:**
- Secure cloud servers (Vercel, AWS)
- Encrypted database (PostgreSQL)
- Daily automatic backups

**5.2. For How Long:**
- **Contact data:** 5 years after last contact
- **Navigation data:** 2 years
- **Session IDs:** 1 year
- **Essential cookies:** Until you clear browser
- **Analytics cookies:** 12 months

**5.3. Security:**
- Encrypted HTTPS/TLS connection
- Restricted data access (authorized team only)
- Monitored access logs
- Regular security audits`
        },
        {
          title: '6. Your Rights (LGPD/GDPR)',
          content: `You have the following rights regarding your data:

**🔹 Access:** Request a copy of data we have about you  
**🔹 Rectification:** Correct incorrect or incomplete data  
**🔹 Erasure:** Request deletion of your data ("right to be forgotten")  
**🔹 Portability:** Receive your data in structured format  
**🔹 Objection:** Object to data processing  
**🔹 Revocation:** Withdraw consent at any time  
**🔹 Review:** Request review of automated decisions (AI)

**How to Exercise Your Rights:**  
Email: **privacy@azimut.com**  
We'll respond within 15 business days.`
        },
        {
          title: '7. Cookies and Consent',
          content: `You can control cookies through:

1. **Cookie Banner:** Choose "Accept all" or "Essential only"
2. **Browser Settings:** Block or delete cookies manually
3. **Analytics Opt-out:** Disable Plausible via banner

**Essential Cookies (cannot be disabled):**
- \`cookie-consent\`: Saves your cookie choice
- \`lang\`: Your preferred language
- \`theme\`: Light/dark theme

**Analytics Cookies (can be disabled):**
- Plausible Analytics (privacy-first, GDPR compliant)
- Session ID (anonymous session identifier)`
        },
        {
          title: '8. International Transfer',
          content: `As we operate in Brazil and Canada, your data may be transferred between these countries. We ensure adequate protection through:

- Standard contractual clauses
- Security certifications
- LGPD and GDPR compliance

Countries where we operate: 🇧🇷 Brazil, 🇨🇦 Canada`
        },
        {
          title: '9. Minors',
          content: `Our site is not directed to individuals under 18. We don't intentionally collect data from minors. If you're a parent and believe your child provided data, contact us.`
        },
        {
          title: '10. Changes to This Policy',
          content: `We may update this Policy periodically. Significant changes will be communicated through:

- Site banner
- Email (if we have your contact)
- "Last updated" date at the top of this page

We recommend reviewing this policy regularly.`
        },
        {
          title: '11. Contact',
          content: `**Data Controller / DPO:**  
Azimut - Immersive, Interactive & Cinematic Experiences

**Privacy Email:** privacy@azimut.com  
**General Email:** contact@azimut.com  
**Phone:** +55 (XX) XXXX-XXXX (Brazil) | +1 (XXX) XXX-XXXX (Canada)

**Addresses:**  
🇧🇷 [Brazil Address]  
🇨🇦 [Canada Address]

**Business Hours:** Monday to Friday, 9am-6pm (local time)`
        }
      ],
      footer: '© 2026 Azimut. All rights reserved.'
    },
    fr: {
      title: 'Politique de Confidentialité',
      lastUpdate: 'Dernière mise à jour : Janvier 2026',
      sections: [
        // Versão francesa simplificada (pode expandir se necessário)
        {
          title: '1. Introduction',
          content: `Azimut respecte votre vie privée et s'engage à protéger vos données personnelles. Cette Politique de Confidentialité explique comment nous collectons, utilisons et protégeons vos informations.

Cette politique est conforme au RGPD de l'Union européenne et à la LGPD du Brésil.`
        },
        // ... mais seções podem ser adicionadas
      ],
      footer: '© 2026 Azimut. Tous droits réservés.'
    },
    es: {
      title: 'Política de Privacidad',
      lastUpdate: 'Última actualización: Enero 2026',
      sections: [
        // Versão espanhola simplificada
        {
          title: '1. Introducción',
          content: `Azimut respeta su privacidad y está comprometido a proteger sus datos personales. Esta Política de Privacidad explica cómo recopilamos, usamos y protegemos su información.

Esta política cumple con el RGPD de la Unión Europea y la LGPD de Brasil.`
        },
        // ... mais seções podem ser adicionadas
      ],
      footer: '© 2026 Azimut. Todos los derechos reservados.'
    }
  }

  const text = content[lang]

  return (
    <>
      <SEO 
        title={text.title}
        description="Política de Privacidade e proteção de dados da Azimut. LGPD e GDPR compliant."
      />
      
      <main className="relative min-h-screen pt-8 md:pt-12 pb-24">
        {/* Estrela de fundo */}
        <div 
          ref={starRef}
          className="fixed -right-28 -bottom-40 min-[768px]:-right-40 min-[768px]:-bottom-60 z-[-5] pointer-events-none"
          style={{ opacity: 0 }}
          aria-hidden="true"
        >
          <img 
            src="/logo-azimut-star.svg" 
            alt="" 
            className="h-[520px] w-[520px] min-[768px]:h-[680px] min-[768px]:w-[680px]"
          />
        </div>

        {/* Conteúdo */}
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {text.title}
            </h1>
            <p className="text-sm text-gray-400">
              {text.lastUpdate}
            </p>
          </div>

          {/* Seções */}
          <div className="space-y-8">
            {text.sections.map((section, index) => (
              <section key={index} className="prose prose-invert max-w-none">
                <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">
                  {section.title}
                </h2>
                <div 
                  className="text-gray-300 leading-relaxed whitespace-pre-line"
                  dangerouslySetInnerHTML={{ 
                    __html: section.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                  }}
                />
              </section>
            ))}
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
            {text.footer}
          </footer>

        </div>
      </main>
    </>
  )
}

export default Privacy

