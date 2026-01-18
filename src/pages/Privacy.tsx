import React, { useEffect, useRef } from 'react'
import { type Lang } from '../i18n'
import SEO from '../components/SEO'
import LangLink from '../components/LangLink'

interface PrivacyProps {
  lang: Lang
}

const Privacy: React.FC<PrivacyProps> = ({ lang }) => {
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
      title: 'Política de Privacidade',
      subtitle: 'Transparência total sobre como protegemos seus dados',
      lastUpdate: 'Última atualização: Janeiro 2026',
      quickLinks: {
        title: 'Navegação Rápida',
        items: [
          { icon: '📊', text: 'Dados Coletados', id: 'dados' },
          { icon: '🔒', text: 'Segurança', id: 'seguranca' },
          { icon: '⚖️', text: 'Seus Direitos', id: 'direitos' },
          { icon: '📧', text: 'Contato', id: 'contato' }
        ]
      },
      highlights: [
        { icon: '🛡️', title: 'LGPD & GDPR', desc: 'Totalmente em conformidade' },
        { icon: '🔐', text: 'Dados Criptografados', desc: 'SSL/TLS + PostgreSQL' },
        { icon: '🚫', title: 'Sem Venda de Dados', desc: 'Nunca compartilhamos com terceiros' }
      ],
      sections: [
        {
          id: 'intro',
          icon: '👋',
          title: '1. Introdução',
          content: `A Azimut respeita sua privacidade e está comprometida em proteger seus dados pessoais. Esta política explica claramente como coletamos, usamos e protegemos suas informações.`,
          highlight: 'Conformidade com LGPD (Brasil) e GDPR (Europa)'
        },
        {
          id: 'dados',
          icon: '📊',
          title: '2. Dados que Coletamos',
          items: [
            { subtitle: 'Fornecidos por Você', list: ['Nome e email (formulários)', 'Informações profissionais', 'Orçamento e cronograma (Budget Wizard)'] },
            { subtitle: 'Coletados Automaticamente', list: ['Endereço IP (anonimizado)', 'Tipo de navegador/dispositivo', 'Páginas visitadas e tempo gasto', 'País e idioma'] },
            { subtitle: 'Cookies', list: ['Essenciais (idioma, tema, consentimento)', 'Analytics (Plausible - privacy-first)', 'Session ID anônimo'] }
          ]
        },
        {
          id: 'uso',
          icon: '⚡',
          title: '3. Como Usamos',
          items: [
            { subtitle: 'Dados de Contato', list: ['Responder solicitações', 'Enviar orçamentos', 'Comunicação de projetos'] },
            { subtitle: 'Dados de Navegação', list: ['Melhorar experiência', 'Personalizar recomendações', 'Identificar leads qualificados'] },
            { subtitle: 'Análise com IA (DeepSeek)', list: ['Identificar perfil de interesse', 'Recomendar projetos relevantes', 'Calcular scores de engajamento'] }
          ],
          highlight: '🔒 Análise anônima - NÃO vendemos ou compartilhamos dados!'
        },
        {
          id: 'seguranca',
          icon: '🔒',
          title: '5. Segurança',
          grid: [
            { icon: '🏢', title: 'Armazenamento', desc: 'Servidores Vercel/AWS, PostgreSQL criptografado' },
            { icon: '⏱️', title: 'Retenção', desc: 'Contato: 5 anos | Navegação: 2 anos | Cookies: 12 meses' },
            { icon: '🛡️', title: 'Proteção', desc: 'HTTPS/TLS, acesso restrito, auditorias regulares' }
          ]
        },
        {
          id: 'direitos',
          icon: '⚖️',
          title: '6. Seus Direitos (LGPD/GDPR)',
          rights: [
            { icon: '👁️', title: 'Acesso', desc: 'Solicitar cópia dos seus dados' },
            { icon: '✏️', title: 'Retificação', desc: 'Corrigir dados incorretos' },
            { icon: '🗑️', title: 'Exclusão', desc: 'Direito ao esquecimento' },
            { icon: '📦', title: 'Portabilidade', desc: 'Receber dados em formato estruturado' },
            { icon: '🚫', title: 'Oposição', desc: 'Opor-se ao processamento' },
            { icon: '🔄', title: 'Revogação', desc: 'Retirar consentimento a qualquer momento' }
          ],
          cta: 'Como exercer: privacy@azimut.com (resposta em 15 dias)'
        },
        {
          id: 'contato',
          icon: '📧',
          title: '11. Contato',
          contacts: [
            { label: 'Privacidade', value: 'privacy@azimut.com', type: 'email' },
            { label: 'Geral', value: 'contact@azimut.com', type: 'email' },
            { label: 'Brasil', value: '🇧🇷 [Endereço]', type: 'address' },
            { label: 'Canadá', value: '🇨🇦 [Endereço]', type: 'address' }
          ]
        }
      ]
    },
    // EN, FR, ES - títulos traduzidos, conteúdo usa PT como fallback
    en: { title: 'Privacy Policy', subtitle: 'How we protect your data', lastUpdate: 'Last updated: January 2026' },
    fr: { title: 'Confidentialité', subtitle: 'Protection de vos données', lastUpdate: 'Dernière mise à jour : Janvier 2026' },
    es: { title: 'Privacidad', subtitle: 'Protección de sus datos', lastUpdate: 'Última actualización: Enero 2026' }
  }

  // Usa conteúdo PT como fallback para sections, highlights, quickLinks
  const langContent = content[lang] || content.pt
  const text = {
    ...content.pt, // base com todo conteúdo
    ...langContent, // sobrescreve títulos traduzidos
    sections: langContent.sections?.length ? langContent.sections : content.pt.sections,
    highlights: langContent.highlights?.length ? langContent.highlights : content.pt.highlights,
    quickLinks: langContent.quickLinks || content.pt.quickLinks
  }

  return (
    <>
      <SEO 
        title={`${text.title} - Azimut`}
        description="Política de Privacidade LGPD/GDPR compliant"
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

        <div className="mx-auto max-w-6xl px-6">
          {/* Hero */}
          <div className="mb-16 text-center">
            <div className="mb-4 inline-block rounded-full bg-azimut-red/10 px-4 py-2 text-sm font-semibold text-azimut-red border border-azimut-red/30">
              🔒 LGPD & GDPR Compliant
            </div>
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
                <div key={i} className="text-center p-6 rounded-lg bg-slate-900/30 border border-azimut-red/20 hover:border-azimut-red/40 transition-colors">
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-theme-text-secondary">{item.desc}</p>
                </div>
              ))}
            </div>
          )}

          {/* Content Grid */}
          <div className="grid lg:grid-cols-[1fr,300px] gap-12">
            {/* Main Content */}
            <div className="space-y-12">
              {text.sections && text.sections.map((section, i) => (
                <section key={i} id={section.id} className="scroll-mt-24">
                  <div className="flex items-start gap-4 mb-6">
                    <span className="text-4xl">{section.icon}</span>
                    <h2 className="font-handel text-3xl font-bold text-theme-text">
                      {section.title}
                    </h2>
                  </div>

                  {section.content && (
                    <p className="text-lg leading-relaxed text-theme-text-secondary mb-4 pl-16">
                      {section.content}
                    </p>
                  )}

                  {section.highlight && (
                    <div className="pl-16 mb-6">
                      <div className="p-4 rounded-lg bg-azimut-red/10 border-l-4 border-azimut-red">
                        <p className="text-sm font-semibold text-white">{section.highlight}</p>
                      </div>
                    </div>
                  )}

                  {section.items && (
                    <div className="pl-16 space-y-6">
                      {section.items.map((item, j) => (
                        <div key={j}>
                          <h4 className="text-lg font-semibold text-white mb-3">{item.subtitle}</h4>
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
                    <div className="grid md:grid-cols-3 gap-4 pl-16">
                      {section.grid.map((card, j) => (
                        <div key={j} className="p-4 rounded-lg bg-slate-900/50 border border-azimut-red/20">
                          <div className="text-3xl mb-2">{card.icon}</div>
                          <h4 className="font-semibold text-white mb-2">{card.title}</h4>
                          <p className="text-sm text-theme-text-secondary">{card.desc}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.rights && (
                    <div className="grid md:grid-cols-2 gap-4 pl-16 mb-6">
                      {section.rights.map((right, j) => (
                        <div key={j} className="flex items-start gap-3 p-4 rounded-lg bg-slate-900/30 hover:bg-slate-900/50 transition-colors">
                          <span className="text-2xl">{right.icon}</span>
                          <div>
                            <h4 className="font-semibold text-white mb-1">{right.title}</h4>
                            <p className="text-sm text-theme-text-secondary">{right.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {section.cta && (
                    <div className="pl-16">
                      <div className="p-4 rounded-lg bg-azimut-red/10 border border-azimut-red/30 text-center">
                        <p className="text-white font-semibold">{section.cta}</p>
                      </div>
                    </div>
                  )}

                  {section.contacts && (
                    <div className="grid md:grid-cols-2 gap-4 pl-16">
                      {section.contacts.map((contact, j) => (
                        <div key={j} className="p-4 rounded-lg bg-slate-900/30">
                          <p className="text-sm text-theme-text-secondary mb-1">{contact.label}</p>
                          {contact.type === 'email' ? (
                            <a href={`mailto:${contact.value}`} className="text-white hover:text-azimut-red transition-colors">
                              {contact.value}
                            </a>
                          ) : (
                            <p className="text-white">{contact.value}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Sidebar - Quick Links */}
            {text.quickLinks && (
              <aside className="hidden lg:block">
                <div className="sticky top-24 p-6 rounded-lg bg-slate-900/50 border border-azimut-red/20">
                  <h3 className="text-sm font-bold text-white mb-4 uppercase tracking-wider">
                    {text.quickLinks.title}
                  </h3>
                  <nav className="space-y-2">
                    {text.quickLinks.items.map((item, i) => (
                      <a
                        key={i}
                        href={`#${item.id}`}
                        className="flex items-center gap-2 px-3 py-2 rounded text-sm text-theme-text-secondary hover:text-white hover:bg-azimut-red/10 transition-all"
                      >
                        <span>{item.icon}</span>
                        <span>{item.text}</span>
                      </a>
                    ))}
                  </nav>

                  <div className="mt-8 pt-6 border-t border-white/10">
                    <LangLink
                      to="/contact"
                      className="block text-center px-4 py-3 rounded-lg bg-azimut-red text-white text-sm font-semibold hover:bg-azimut-red/90 transition-all"
                    >
                      📧 Dúvidas?
                    </LangLink>
                  </div>
                </div>
              </aside>
            )}
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-white/10 text-center">
            <p className="text-sm text-gray-500">© 2026 Azimut. Todos os direitos reservados.</p>
          </footer>
        </div>
      </main>
    </>
  )
}

export default Privacy
