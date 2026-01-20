import React from 'react'
import { type Lang } from '../i18n'

interface CuradoriaFestivaisProps {
  lang: Lang
}

const CuradoriaFestivais: React.FC<CuradoriaFestivaisProps> = ({ lang }) => {
  const locale = (entry: { pt: string; en: string; es: string; fr?: string }) => {
    if (lang === 'fr') return entry.fr || entry.en
    return entry[lang as 'pt' | 'en' | 'es'] || entry.en
  }

  const festivais = [
    {
      name: { pt: 'Festival de Cinema de Gramado', en: 'Gramado Film Festival', es: 'Festival de Cine de Gramado', fr: 'Festival de Cinéma de Gramado' },
      role: { pt: 'Curador Oficial VR/IA', en: 'Official VR/AI Curator', es: 'Curador Oficial VR/IA', fr: 'Curateur Officiel VR/IA' },
      period: { pt: '2017 - Presente', en: '2017 - Present', es: '2017 - Presente', fr: '2017 - Présent' },
      description: {
        pt: 'Curadoria oficial da seção de Realidade Virtual e filmes produzidos com IA. Seleção, análise e apresentação de obras imersivas que exploram novas narrativas cinematográficas.',
        en: 'Official curation of Virtual Reality section and AI-produced films. Selection, analysis and presentation of immersive works exploring new cinematic narratives.',
        es: 'Curaduría oficial de la sección de Realidad Virtual y películas producidas con IA. Selección, análisis y presentación de obras inmersivas que exploran nuevas narrativas cinematográficas.',
        fr: 'Curation officielle de la section Réalité Virtuelle et films produits avec IA. Sélection, analyse et présentation d\'œuvres immersives explorant de nouvelles narrations cinématographiques.'
      },
      highlights: [
        { pt: '8+ anos de curadoria contínua', en: '8+ years of continuous curation', es: '8+ años de curaduría continua', fr: '8+ ans de curation continue' },
        { pt: 'Centenas de filmes analisados', en: 'Hundreds of films analyzed', es: 'Cientos de películas analizadas', fr: 'Centaines de films analysés' },
        { pt: 'Pioneiro em curadoria VR no Brasil', en: 'Pioneer in VR curation in Brazil', es: 'Pionero en curaduría VR en Brasil', fr: 'Pionnier en curation VR au Brésil' }
      ],
      icon: '🎬'
    },
    {
      name: { pt: 'Rio2C', en: 'Rio2C', es: 'Rio2C', fr: 'Rio2C' },
      role: { pt: 'Mostras e Apresentações', en: 'Showcases & Presentations', es: 'Muestras y Presentaciones', fr: 'Présentations & Expositions' },
      period: { pt: 'Anual', en: 'Annual', es: 'Anual', fr: 'Annuel' },
      description: {
        pt: 'Apresentação de projetos e mostras de tecnologia imersiva e IA em um dos maiores eventos de criatividade e inovação da América Latina.',
        en: 'Presentation of projects and showcases of immersive technology and AI at one of Latin America\'s largest creativity and innovation events.',
        es: 'Presentación de proyectos y muestras de tecnología inmersiva e IA en uno de los mayores eventos de creatividad e innovación de América Latina.',
        fr: 'Présentation de projets et expositions de technologie immersive et IA lors de l\'un des plus grands événements de créativité et d\'innovation d\'Amérique latine.'
      },
      highlights: [
        { pt: 'Mostras de tecnologia imersiva', en: 'Immersive technology showcases', es: 'Muestras de tecnología inmersiva', fr: 'Expositions de technologie immersive' },
        { pt: 'Networking com criativos latino-americanos', en: 'Networking with Latin American creatives', es: 'Networking con creativos latinoamericanos', fr: 'Réseautage avec créatifs latino-américains' }
      ],
      icon: '🌐'
    },
    {
      name: { pt: 'FAM - Florianópolis Audiovisual Mercosul', en: 'FAM - Florianópolis Audiovisual Mercosul', es: 'FAM - Florianópolis Audiovisual Mercosur', fr: 'FAM - Florianópolis Audiovisuel Mercosur' },
      role: { pt: 'Participação e Mostras', en: 'Participation & Showcases', es: 'Participación y Muestras', fr: 'Participation & Expositions' },
      period: { pt: 'Anual', en: 'Annual', es: 'Anual', fr: 'Annuel' },
      description: {
        pt: 'Participação em um dos principais festivais de audiovisual do Mercosul, apresentando projetos imersivos e inovações em narrativa.',
        en: 'Participation in one of the main audiovisual festivals in Mercosur, presenting immersive projects and narrative innovations.',
        es: 'Participación en uno de los principales festivales audiovisuales del Mercosur, presentando proyectos inmersivos e innovaciones narrativas.',
        fr: 'Participation à l\'un des principaux festivals audiovisuels du Mercosur, présentant des projets immersifs et des innovations narratives.'
      },
      highlights: [
        { pt: 'Festival de referência no Mercosul', en: 'Leading festival in Mercosur', es: 'Festival de referencia en Mercosur', fr: 'Festival de référence au Mercosur' },
        { pt: 'Apresentação de inovações narrativas', en: 'Presentation of narrative innovations', es: 'Presentación de innovaciones narrativas', fr: 'Présentation d\'innovations narratives' }
      ],
      icon: '🎥'
    }
  ]

  return (
    <section className="mb-16">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-1 h-12 bg-azimut-red"></div>
          <h2 className="font-handel text-3xl md:text-4xl uppercase tracking-[0.12em]" style={{ color: 'var(--theme-text)' }}>
            {lang === 'pt' 
              ? 'Curadoria & Festivais'
              : lang === 'es'
              ? 'Curaduría & Festivales'
              : lang === 'fr'
              ? 'Curation & Festivals'
              : 'Curation & Festivals'}
          </h2>
        </div>
        <p className="max-w-3xl text-lg leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
          {lang === 'pt' 
            ? 'Nossa curadoria em festivais internacionais de cinema e tecnologia é um diferencial único. Desde 2017, selecionamos e apresentamos as melhores obras imersivas, posicionando a Azimut como referência em curadoria VR/IA no Brasil e no mundo.'
            : lang === 'es'
            ? 'Nuestra curaduría en festivales internacionales de cine y tecnología es un diferencial único. Desde 2017, seleccionamos y presentamos las mejores obras inmersivas, posicionando a Azimut como referencia en curaduría VR/IA en Brasil y el mundo.'
            : lang === 'fr'
            ? 'Notre curation dans les festivals internationaux de cinéma et technologie est un différentiel unique. Depuis 2017, nous sélectionnons et présentons les meilleures œuvres immersives, positionnant Azimut comme référence en curation VR/IA au Brésil et dans le monde.'
            : 'Our curation at international film and technology festivals is a unique differentiator. Since 2017, we have selected and presented the best immersive works, positioning Azimut as a reference in VR/AI curation in Brazil and worldwide.'}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {festivais.map((festival, idx) => (
          <article
            key={idx}
            className="group rounded-2xl border border-white/10 card-adaptive p-6 md:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.4)] backdrop-blur transition-all hover:border-azimut-red/50 hover:shadow-[0_24px_60px_rgba(0,0,0,0.5)]"
          >
            <div className="flex items-start gap-4 mb-4">
              <div className="text-4xl">{festival.icon}</div>
              <div className="flex-1">
                <div className="mb-2 inline-block rounded-full border border-azimut-red/50 bg-azimut-red/15 px-3 py-1.5 font-sora text-[0.68rem] uppercase tracking-[0.2em]" style={{ color: 'var(--theme-text)' }}>
                  {locale(festival.role)}
                </div>
                <h3 className="mb-1 font-sora text-xl" style={{ color: 'var(--theme-text)' }}>
                  {locale(festival.name)}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {locale(festival.period)}
                </p>
              </div>
            </div>
            
            <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--theme-text-secondary)' }}>
              {locale(festival.description)}
            </p>

            <ul className="space-y-2">
              {festival.highlights.map((highlight, hIdx) => (
                <li key={hIdx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                  <span className="mt-1 w-1.5 h-1.5 rounded-full bg-azimut-red shrink-0"></span>
                  <span>{locale(highlight)}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      {/* Badge de Destaque */}
      <div className="mt-8 rounded-2xl border border-azimut-red/60 bg-azimut-red/10 p-6 text-center">
        <p className="mb-2 font-handel text-xl uppercase tracking-[0.12em] text-azimut-red">
          {lang === 'pt' 
            ? 'Curadoria Oficial: Uma Responsabilidade que Honramos'
            : lang === 'es'
            ? 'Curaduría Oficial: Una Responsabilidad que Honramos'
            : lang === 'fr'
            ? 'Curation Officielle: Une Responsabilité que Nous Honorons'
            : 'Official Curation: A Responsibility We Honor'}
        </p>
        <p className="text-sm mb-3" style={{ color: 'var(--theme-text-secondary)' }}>
          {lang === 'pt' 
            ? 'Desde 2017, temos a honra de ser os curadores oficiais da seção VR/IA do Festival de Cinema de Gramado. São 8+ anos selecionando e apresentando as melhores obras imersivas do mundo, uma responsabilidade que levamos a sério.'
            : lang === 'es'
            ? 'Desde 2017, tenemos el honor de ser los curadores oficiales de la sección VR/IA del Festival de Cine de Gramado. Son 8+ años seleccionando y presentando las mejores obras inmersivas del mundo, una responsabilidad que tomamos en serio.'
            : lang === 'fr'
            ? 'Depuis 2017, nous avons l\'honneur d\'être les curateurs officiels de la section VR/IA du Festival de Cinéma de Gramado. Ce sont 8+ ans de sélection et présentation des meilleures œuvres immersives au monde, une responsabilité que nous prenons au sérieux.'
            : 'Since 2017, we have had the honor of being the official curators of the VR/AI section at Gramado Film Festival. 8+ years selecting and presenting the world\'s best immersive works, a responsibility we take seriously.'}
        </p>
        <p className="text-xs italic" style={{ color: 'var(--theme-text-muted)' }}>
          {lang === 'pt' 
            ? 'Não encontramos outro estúdio no Brasil com curadoria oficial em festival internacional de cinema.'
            : lang === 'es'
            ? 'No encontramos otro estudio en Brasil con curaduría oficial en festival internacional de cine.'
            : lang === 'fr'
            ? 'Nous n\'avons pas trouvé d\'autre studio au Brésil avec curation officielle dans un festival international de cinéma.'
            : 'We haven\'t found another studio in Brazil with official curation at an international film festival.'}
        </p>
      </div>
    </section>
  )
}

export default CuradoriaFestivais

