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
        { icon: '🌍', title: 'Internacional', desc: 'Brasil & Canadá' }
      ],
      sections: [
        {
          icon: '📜',
          title: '1. Aceitação dos Termos',
          content: 'Ao usar azmt.com, você concorda com estes termos. Se não concorda, por favor não use nosso site.',
          type: 'simple'
        },
        {
          icon: '🖥️',
          title: '2. Uso do Site',
          items: [
            { title: 'Permitido', icon: '✅', list: ['Navegar pelo site', 'Preencher formulários', 'Baixar press kit', 'Compartilhar nas redes sociais'] },
            { title: 'Proibido', icon: '⛔', list: ['Copiar conteúdo sem autorização', 'Hackear ou comprometer segurança', 'Usar robots/scrapers sem permissão', 'Engenharia reversa'] }
          ],
          type: 'grid'
        },
        {
          icon: '©️',
          title: '3. Propriedade Intelectual',
          content: 'Todo conteúdo (textos, imagens, vídeos, código) é propriedade da Azimut. Protegido por leis de direitos autorais.',
          highlight: 'Projetos: Imagens e descrições são propriedade da Azimut e clientes',
          type: 'simple'
        },
        {
          icon: '📝',
          title: '4. Formulários',
          content: 'Ao enviar formulários, você garante que as informações são verdadeiras e nos autoriza a entrar em contato.',
          type: 'simple'
        },
        {
          icon: '⚠️',
          title: '5. Isenção de Responsabilidade',
          cards: [
            { icon: '🏗️', title: '"Como Está"', desc: 'Site fornecido sem garantias' },
            { icon: '🔌', title: 'Disponibilidade', desc: 'Pode ter manutenções' },
            { icon: '🔗', title: 'Links Externos', desc: 'Não somos responsáveis' }
          ],
          type: 'cards'
        },
        {
          icon: '🌍',
          title: '9. Lei Aplicável',
          content: 'Regido pelas leis do Brasil (projetos BR) e Canadá/Québec (projetos CA).',
          flags: '🇧🇷 Brasil | 🇨🇦 Canadá',
          type: 'simple'
        },
        {
          icon: '📧',
          title: '10. Contato',
          contact: {
            email: 'contact@azimut.com',
            locations: ['🇧🇷 São Paulo, Brasil', '🇨🇦 Montreal, Canadá']
          },
          type: 'contact'
        }
      ]
    },
    // EN, FR, ES - títulos traduzidos, conteúdo usa PT como fallback
    en: { title: 'Terms of Use', subtitle: 'Site usage conditions', lastUpdate: 'Last updated: January 2026' },
    fr: { title: 'Conditions d\'Utilisation', subtitle: 'Conditions d\'usage du site', lastUpdate: 'Dernière mise à jour : Janvier 2026' },
    es: { title: 'Términos de Uso', subtitle: 'Condiciones de uso del sitio', lastUpdate: 'Última actualización: Enero 2026' }
  }

  // Usa conteúdo PT como fallback para sections, highlights
  const langContent = content[lang] || content.pt
  const text = {
    ...content.pt, // base com todo conteúdo
    ...langContent, // sobrescreve títulos traduzidos
    sections: langContent.sections?.length ? langContent.sections : content.pt.sections,
    highlights: langContent.highlights?.length ? langContent.highlights : content.pt.highlights
  }

  return (
    <>
      <SEO 
        title={`${text.title} - Azimut`}
        description="Termos de Uso do site Azimut"
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
                  <h2 className="font-handel text-3xl font-bold text-theme-text">
                    {section.title}
                  </h2>
                </div>

                {section.type === 'simple' && (
                  <div className="pl-16 space-y-4">
                    <p className="text-lg leading-relaxed text-theme-text-secondary">
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
                  <div className="pl-16 grid md:grid-cols-2 gap-6">
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
                  <div className="pl-16 grid md:grid-cols-3 gap-4">
                    {section.cards.map((card, j) => (
                      <div key={j} className="p-4 rounded-lg bg-slate-900/50 border border-azimut-red/20 text-center">
                        <div className="text-3xl mb-2">{card.icon}</div>
                        <h4 className="font-semibold text-white mb-2">{card.title}</h4>
                        <p className="text-sm text-theme-text-secondary">{card.desc}</p>
                      </div>
                    ))}
                  </div>
                )}

                {section.type === 'contact' && section.contact && (
                  <div className="pl-16">
                    <div className="p-6 rounded-lg bg-gradient-to-br from-azimut-red/10 to-slate-900/50 border border-azimut-red/30">
                      <a 
                        href={`mailto:${section.contact.email}`}
                        className="block text-xl font-bold text-white mb-4 hover:text-azimut-red transition-colors"
                      >
                        {section.contact.email}
                      </a>
                      <div className="flex flex-wrap gap-4">
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
              {lang === 'pt' ? 'Tem Dúvidas?' : 'Questions?'} → {lang === 'pt' ? 'Fale Conosco' : 'Contact Us'}
            </LangLink>
          </div>
        </div>
      </main>
    </>
  )
}

export default Terms
