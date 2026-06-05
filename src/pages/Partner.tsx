import React from 'react'
import { Link } from 'react-router-dom'
import { type Lang } from '../i18n'
import SEO from '../components/SEO'
import { useTheme } from '../contexts/ThemeContext'
import StarBackground from '../components/StarBackground'

interface PartnerProps {
  lang: Lang
}

const content = {
  pt: {
    seoTitle: 'Parceiros e Co-produção | Azimut',
    seoDesc: 'Agências, produtoras e estúdios internacionais: construa experiências imersivas com a Azimut. 30 anos de entrega, equipe do Rio Museu Olímpico, estrutura Brasil↔Canadá.',
    hero: 'Parceiros e Co-produção',
    sub: 'Você tem o projeto. A Azimut tem a tecnologia e 30 anos de entrega.',
    intro: 'Trabalhamos com agências de publicidade, produtoras audiovisuais, arquitetos, cenógrafos, secretarias de cultura e estúdios internacionais que precisam de um parceiro técnico em experiências imersivas.',
    whatTitle: 'O que trazemos à parceria',
    what: [
      'Direção técnica de ponta a ponta — conceito, produção, instalação, CMS',
      'Expertise em VR 360°, instalações interativas, IA generativa e Web3',
      'Estrutura binacional Brasil ↔ Canadá para projetos internacionais',
      '30 anos de entregas — do Taikodom (maior MMORPG BR) ao Rio Museu Olímpico',
    ],
    modelsTitle: 'Modelos de parceria',
    models: [
      { title: 'Co-produção', desc: 'Dividimos responsabilidades e receita. Para projetos de médio e grande porte onde queremos ambas as marcas no crédito.' },
      { title: 'Subcontratação técnica', desc: 'A Azimut executa a camada imersiva do seu projeto. Você mantém o relacionamento com o cliente final.' },
      { title: 'Consultoria por etapa', desc: 'Apoio técnico e criativo em fases específicas — conceito, especificação, supervisão de produção.' },
      { title: 'Representação internacional', desc: 'Para estúdios estrangeiros que precisam de produção física no Brasil. Azimut como parceiro local de execução.' },
    ],
    formTitle: 'Tem um projeto em vista? Vamos construir juntos.',
    namePlaceholder: 'Seu nome e empresa',
    typePlaceholder: 'Tipo de parceria',
    typeOptions: ['Co-produção', 'Subcontratação técnica', 'Consultoria', 'Representação internacional'],
    projectPlaceholder: 'Descreva brevemente o projeto',
    budgetPlaceholder: 'Orçamento estimado',
    budgetOptions: ['Até R$100k', 'R$100k–500k', 'R$500k–1M', 'Acima de R$1M'],
    countryPlaceholder: 'País / cidade',
    emailPlaceholder: 'Seu e-mail',
    cta: 'Enviar proposta',
    back: 'Voltar',
  },
  en: {
    seoTitle: 'Partners & Co-Production | Azimut',
    seoDesc: 'Agencies, studios and international partners: build immersive experiences with Azimut. 30 years of delivery, Rio Olympic Museum team, Brazil↔Canada structure.',
    hero: 'Partners & Co-Production',
    sub: 'You have the project. Azimut brings the technology and 30 years of delivery.',
    intro: 'We partner with advertising agencies, audiovisual studios, architects, scenographers, cultural secretariats and international studios that need a technical partner for immersive experiences.',
    whatTitle: 'What we bring to the partnership',
    what: [
      'End-to-end technical direction — concept, production, installation, CMS',
      'Expertise in VR 360°, interactive installations, generative AI and Web3',
      'Binational structure Brazil ↔ Canada for international projects',
      '30 years of deliveries — from Taikodom (one of Brazil\'s largest MMORPGs) to the Rio Olympic Museum',
    ],
    modelsTitle: 'Partnership models',
    models: [
      { title: 'Co-production', desc: 'Shared responsibilities and revenue. For mid-to-large projects where both brands share the credit.' },
      { title: 'Technical subcontracting', desc: 'Azimut executes the immersive layer of your project. You keep the relationship with the end client.' },
      { title: 'Consulting per phase', desc: 'Technical and creative support in specific phases — concept, specification, production supervision.' },
      { title: 'International representation', desc: 'For foreign studios needing physical production in Brazil. Azimut as local execution partner.' },
    ],
    formTitle: 'Have a project in mind? Let\'s build it together.',
    namePlaceholder: 'Your name and company',
    typePlaceholder: 'Partnership type',
    typeOptions: ['Co-production', 'Technical subcontracting', 'Consulting', 'International representation'],
    projectPlaceholder: 'Briefly describe the project',
    budgetPlaceholder: 'Estimated budget',
    budgetOptions: ['Up to $30k USD', '$30k–150k USD', '$150k–300k USD', 'Above $300k USD'],
    countryPlaceholder: 'Country / city',
    emailPlaceholder: 'Your e-mail',
    cta: 'Send proposal',
    back: 'Back',
  },
  es: {
    seoTitle: 'Socios y Co-producción | Azimut',
    seoDesc: 'Agencias, productoras y estudios internacionales: construye experiencias inmersivas con Azimut. 30 años de entrega, equipo del Museo Olímpico de Río, estructura Brasil↔Canadá.',
    hero: 'Socios y Co-producción',
    sub: 'Tú tienes el proyecto. Azimut aporta la tecnología y 30 años de entrega.',
    intro: 'Trabajamos con agencias de publicidad, productoras audiovisuales, arquitectos, escenógrafos, secretarías de cultura y estudios internacionales que necesitan un socio técnico en experiencias inmersivas.',
    whatTitle: 'Lo que aportamos a la alianza',
    what: [
      'Dirección técnica de principio a fin — concepto, producción, instalación, CMS',
      'Experiencia en VR 360°, instalaciones interactivas, IA generativa y Web3',
      'Estructura binacional Brasil ↔ Canadá para proyectos internacionales',
      '30 años de entregas — desde Taikodom hasta el Museo Olímpico de Río',
    ],
    modelsTitle: 'Modelos de alianza',
    models: [
      { title: 'Co-producción', desc: 'Responsabilidades e ingresos compartidos. Para proyectos medianos y grandes donde ambas marcas comparten el crédito.' },
      { title: 'Subcontratación técnica', desc: 'Azimut ejecuta la capa inmersiva de tu proyecto. Tú mantienes la relación con el cliente final.' },
      { title: 'Consultoría por etapa', desc: 'Apoyo técnico y creativo en fases específicas — concepto, especificación, supervisión de producción.' },
      { title: 'Representación internacional', desc: 'Para estudios extranjeros que necesitan producción física en Brasil. Azimut como socio local de ejecución.' },
    ],
    formTitle: '¿Tienes un proyecto en mente? Construyámoslo juntos.',
    namePlaceholder: 'Tu nombre y empresa',
    typePlaceholder: 'Tipo de alianza',
    typeOptions: ['Co-producción', 'Subcontratación técnica', 'Consultoría', 'Representación internacional'],
    projectPlaceholder: 'Describe brevemente el proyecto',
    budgetPlaceholder: 'Presupuesto estimado',
    budgetOptions: ['Hasta $30k USD', '$30k–150k USD', '$150k–300k USD', 'Más de $300k USD'],
    countryPlaceholder: 'País / ciudad',
    emailPlaceholder: 'Tu correo',
    cta: 'Enviar propuesta',
    back: 'Volver',
  },
  fr: {
    seoTitle: 'Partenaires & Co-production | Azimut',
    seoDesc: 'Agences, studios et partenaires internationaux : créez des expériences immersives avec Azimut. 30 ans de livraisons, équipe du Musée Olympique de Rio, structure Brésil↔Canada.',
    hero: 'Partenaires & Co-production',
    sub: 'Vous avez le projet. Azimut apporte la technologie et 30 ans de livraisons.',
    intro: 'Nous travaillons avec des agences de publicité, des studios audiovisuels, des architectes, des scénographes, des institutions culturelles et des studios internationaux qui ont besoin d\'un partenaire technique en expériences immersives.',
    whatTitle: 'Ce que nous apportons au partenariat',
    what: [
      'Direction technique de bout en bout — concept, production, installation, CMS',
      'Expertise VR 360°, installations interactives, IA générative et Web3',
      'Structure binationale Brésil ↔ Canada pour projets internationaux',
      '30 ans de livraisons — de Taikodom au Musée Olympique de Rio',
    ],
    modelsTitle: 'Modèles de partenariat',
    models: [
      { title: 'Co-production', desc: 'Responsabilités et revenus partagés. Pour les projets moyens et grands où les deux marques partagent le crédit.' },
      { title: 'Sous-traitance technique', desc: 'Azimut exécute la couche immersive de votre projet. Vous conservez la relation avec le client final.' },
      { title: 'Conseil par phase', desc: 'Soutien technique et créatif sur des phases spécifiques — concept, spécification, supervision de production.' },
      { title: 'Représentation internationale', desc: 'Pour les studios étrangers ayant besoin de production physique au Brésil. Azimut comme partenaire local d\'exécution.' },
    ],
    formTitle: 'Vous avez un projet en tête ? Construisons-le ensemble.',
    namePlaceholder: 'Votre nom et entreprise',
    typePlaceholder: 'Type de partenariat',
    typeOptions: ['Co-production', 'Sous-traitance technique', 'Conseil', 'Représentation internationale'],
    projectPlaceholder: 'Décrivez brièvement le projet',
    budgetPlaceholder: 'Budget estimé',
    budgetOptions: ['Jusqu\'à 30k USD', '30k–150k USD', '150k–300k USD', 'Plus de 300k USD'],
    countryPlaceholder: 'Pays / ville',
    emailPlaceholder: 'Votre e-mail',
    cta: 'Envoyer la proposition',
    back: 'Retour',
  },
}

const Partner: React.FC<PartnerProps> = ({ lang }) => {
  const { theme } = useTheme()
  const t = content[lang] || content.en
  const [formData, setFormData] = React.useState({ name: '', type: '', project: '', budget: '', country: '', email: '' })
  const [sent, setSent] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await fetch('/api/leads/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: 'partner-page', lang }),
      })
    } catch {}
    setSent(true)
  }

  return (
    <>
      <SEO
        title={t.seoTitle}
        description={t.seoDesc}
        url={`/${lang}/partner`}
        locale={lang === 'pt' ? 'pt_BR' : lang === 'en' ? 'en_US' : lang === 'es' ? 'es_ES' : 'fr_FR'}
      />

      <main className="relative py-16 md:py-24">
        <StarBackground
          className="top-0 -right-40 h-[600px] w-[600px]"
          position="absolute"
          opacity={0.25}
          zIndex={-1}
        />

        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

          {/* Hero */}
          <div className="mb-16 text-center">
            <p className="mb-3 font-sora text-xs uppercase tracking-[0.25em] text-azimut-red">
              {lang === 'pt' ? 'Co-produção & Parcerias' : lang === 'es' ? 'Co-producción & Alianzas' : lang === 'fr' ? 'Co-production & Partenariats' : 'Co-production & Partnerships'}
            </p>
            <h1 className="mb-5 font-handel text-4xl md:text-6xl uppercase tracking-[0.1em]" style={{ color: 'var(--theme-text)' }}>
              {t.hero}
            </h1>
            <p className="mx-auto max-w-2xl text-lg md:text-xl leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
              {t.sub}
            </p>
          </div>

          {/* Intro */}
          <p className="mb-16 mx-auto max-w-3xl text-center text-base md:text-lg leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
            {t.intro}
          </p>

          {/* O que trazemos */}
          <section className="mb-16">
            <h2 className="mb-8 font-handel text-2xl md:text-3xl uppercase tracking-[0.1em] text-center" style={{ color: 'var(--theme-text)' }}>
              {t.whatTitle}
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {t.what.map((item, i) => (
                <li key={i} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-azimut-red text-white text-xs font-bold">✓</span>
                  <span className="text-sm leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Modelos */}
          <section className="mb-20">
            <h2 className="mb-8 font-handel text-2xl md:text-3xl uppercase tracking-[0.1em] text-center" style={{ color: 'var(--theme-text)' }}>
              {t.modelsTitle}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {t.models.map((m, i) => (
                <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:border-azimut-red/40 transition-colors">
                  <h3 className="mb-2 font-handel text-lg uppercase tracking-[0.1em]" style={{ color: 'var(--theme-text)' }}>
                    {m.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>{m.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Formulário */}
          <section className="mx-auto max-w-2xl">
            <h2 className="mb-8 font-handel text-2xl md:text-3xl uppercase tracking-[0.1em] text-center" style={{ color: 'var(--theme-text)' }}>
              {t.formTitle}
            </h2>

            {sent ? (
              <div className="rounded-2xl border border-azimut-red/30 bg-azimut-red/10 p-8 text-center">
                <p className="text-lg font-semibold" style={{ color: 'var(--theme-text)' }}>
                  {lang === 'pt' ? '✅ Recebido! Entraremos em contato em breve.' : lang === 'es' ? '✅ ¡Recibido! Te contactaremos pronto.' : lang === 'fr' ? '✅ Reçu ! Nous vous contacterons bientôt.' : '✅ Received! We\'ll be in touch soon.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { key: 'name', placeholder: t.namePlaceholder, type: 'text' },
                  { key: 'email', placeholder: t.emailPlaceholder, type: 'email' },
                  { key: 'country', placeholder: t.countryPlaceholder, type: 'text' },
                ].map(({ key, placeholder, type }) => (
                  <input
                    key={key}
                    type={type}
                    required
                    placeholder={placeholder}
                    value={(formData as any)[key]}
                    onChange={e => setFormData(p => ({ ...p, [key]: e.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-azimut-red/60 transition-colors"
                    style={{ color: 'var(--theme-text)' }}
                  />
                ))}
                {[
                  { key: 'type', placeholder: t.typePlaceholder, options: t.typeOptions },
                  { key: 'budget', placeholder: t.budgetPlaceholder, options: t.budgetOptions },
                ].map(({ key, placeholder, options }) => (
                  <select
                    key={key}
                    required
                    value={(formData as any)[key]}
                    onChange={e => setFormData(p => ({ ...p, [key]: e.target.value }))}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-azimut-red/60 transition-colors"
                    style={{ color: 'var(--theme-text)' }}
                  >
                    <option value="" disabled>{placeholder}</option>
                    {options.map(o => <option key={o} value={o}>{o}</option>)}
                  </select>
                ))}
                <textarea
                  required
                  rows={4}
                  placeholder={t.projectPlaceholder}
                  value={formData.project}
                  onChange={e => setFormData(p => ({ ...p, project: e.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-azimut-red/60 transition-colors resize-none"
                  style={{ color: 'var(--theme-text)' }}
                />
                <button
                  type="submit"
                  className="w-full rounded-xl bg-azimut-red px-6 py-4 font-handel text-sm uppercase tracking-[0.15em] text-white hover:bg-azimut-red/90 transition-colors"
                >
                  {t.cta}
                </button>
              </form>
            )}

            <div className="mt-8 text-center">
              <Link to={`/${lang}/contact`} className="text-sm hover:text-azimut-red transition-colors" style={{ color: 'var(--theme-text-secondary)' }}>
                ← {t.back}
              </Link>
            </div>
          </section>

        </div>
      </main>
    </>
  )
}

export default Partner
