import React from 'react'
import type { Lang } from '../i18n'

interface CredibilidadeEditaisProps {
  lang: Lang
}

const texts = {
  pt: {
    title: 'Editais, Coprodução e Curadoria VR',
    subtitle: 'Brasil–Canadá, IA + XR, curadoria VR desde 2017',
    cta: 'Queremos revisar seu edital/projeto?',
    bullets: [
      'Curadoria VR no Festival de Gramado desde 2017; mostras em Rio2C, FAM.',
      'Direção de tecnologia no Rio Museu Olímpico; instalações imersivas e interativas.',
      'Consultoria e execução para Rouanet, PROAC, Creative BC, CMF, Telefilm.',
      'Docência e coordenação em ECDD, PUC-Rio, UFRJ, UFF, UVA; mestres/doutores.',
      'Coprodução Brasil–Canadá; pipelines IA/XR/filmes VR para cultura e marcas.'
    ],
    table: [
      { who: 'Secretarias de Cultura', what: 'Curadoria + Captação + Execução XR/IA' },
      { who: 'Museus/Institutos', what: 'Experiências imersivas + acervos digitais + mostras VR' },
      { who: 'Marcas/Agências', what: 'Ativações interativas, projeção/mapping, IA criativa' }
    ],
    badges: [
      'Gramado VR (desde 2017)',
      'Rio Museu Olímpico (Direção Técnica)',
      'Coprodução Canadá (BC/CMF)',
      'Workshops XR/IA'
    ]
  },
  en: {
    title: 'Grants, Co-production & VR Curation',
    subtitle: 'Brazil–Canada, AI + XR, VR curation since 2017',
    cta: 'Want us to review your grant/project?',
    bullets: [
      'VR curation at Gramado Film Festival since 2017; showcases at Rio2C, FAM.',
      'Tech direction at Rio Olympic Museum; immersive and interactive installations.',
      'Consulting and execution for Rouanet, PROAC, Creative BC, CMF, Telefilm.',
      'Teaching and coordination at ECDD, PUC-Rio, UFRJ, UFF, UVA; masters/PhDs.',
      'Brazil–Canada co-production; AI/XR/VR film pipelines for culture and brands.'
    ],
    table: [
      { who: 'Culture Secretariats', what: 'Curation + Funding + XR/AI execution' },
      { who: 'Museums/Institutes', what: 'Immersive experiences + digital collections + VR showcases' },
      { who: 'Brands/Agencies', what: 'Interactive activations, projection/mapping, creative AI' }
    ],
    badges: [
      'Gramado VR (since 2017)',
      'Rio Olympic Museum (Tech Direction)',
      'Canada Co-production (BC/CMF)',
      'XR/AI Workshops'
    ]
  },
  es: {
    title: 'Editais, Coproducción y Curaduría VR',
    subtitle: 'Brasil–Canadá, IA + XR, curaduría VR desde 2017',
    cta: '¿Quieres que revisemos tu edital/proyecto?',
    bullets: [
      'Curaduría VR en Gramado desde 2017; muestras en Rio2C, FAM.',
      'Dirección de tecnología en el Museo Olímpico de Río; instalaciones inmersivas e interactivas.',
      'Consultoría y ejecución para Rouanet, PROAC, Creative BC, CMF, Telefilm.',
      'Docencia y coordinación en ECDD, PUC-Rio, UFRJ, UFF, UVA; maestros/doctores.',
      'Coproducción Brasil–Canadá; pipelines IA/XR/films VR para cultura y marcas.'
    ],
    table: [
      { who: 'Secretarías de Cultura', what: 'Curaduría + Captación + Ejecución XR/IA' },
      { who: 'Museos/Institutos', what: 'Experiencias inmersivas + acervos digitales + muestras VR' },
      { who: 'Marcas/Agencias', what: 'Activaciones interactivas, proyección/mapping, IA creativa' }
    ],
    badges: [
      'Gramado VR (desde 2017)',
      'Museo Olímpico de Río (Dirección Técnica)',
      'Coproducción Canadá (BC/CMF)',
      'Workshops XR/IA'
    ]
  },
  fr: {
    title: 'Financements, Coproduction & Curation VR',
    subtitle: 'Brésil–Canada, IA + XR, curation VR depuis 2017',
    cta: 'Voulez-vous une revue de votre projet/financement ?',
    bullets: [
      'Curation VR au Festival de Gramado depuis 2017; showcases à Rio2C, FAM.',
      'Direction technologique au Musée Olympique de Rio; installations immersives et interactives.',
      'Consulting & exécution: Rouanet, PROAC, Creative BC, CMF, Telefilm.',
      'Enseignement/coordination: ECDD, PUC-Rio, UFRJ, UFF, UVA; masters/PhD.',
      'Coproduction Brésil–Canada; pipelines IA/XR/films VR pour culture et marques.'
    ],
    table: [
      { who: 'Secrétariats de la Culture', what: 'Curation + Financement + Exécution XR/IA' },
      { who: 'Musées/Instituts', what: 'Expériences immersives + collections digitales + showcases VR' },
      { who: 'Marques/Agences', what: 'Activations interactives, projection/mapping, IA créative' }
    ],
    badges: [
      'Gramado VR (depuis 2017)',
      'Musée Olympique de Rio (Direction Tech)',
      'Coproduction Canada (BC/CMF)',
      'Workshops XR/IA'
    ]
  }
}

const CredibilidadeEditais: React.FC<CredibilidadeEditaisProps> = ({ lang }) => {
  const t = texts[lang] || texts.en

  return (
    <div className="card-adaptive rounded-2xl border border-white/10 p-6 sm:p-7 md:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
      <div className="mb-4">
        <p className="font-sora text-[0.8rem] font-semibold uppercase tracking-[0.18em]" style={{ color: 'var(--theme-text-muted)' }}>
          {t.subtitle}
        </p>
        <h2 className="font-handel text-2xl uppercase tracking-[0.12em] sm:text-3xl" style={{ color: 'var(--theme-text)' }}>
          {t.title}
        </h2>
      </div>

      {/* Badges */}
      <div className="mb-4 flex flex-wrap gap-2">
        {t.badges.map((badge, idx) => (
          <span
            key={idx}
            className="pill-adaptive rounded-full border px-3 py-1 font-sora text-[0.7rem] uppercase tracking-[0.14em]"
          >
            {badge}
          </span>
        ))}
      </div>

      {/* Lista curta */}
      <ul className="mb-4 space-y-2">
        {t.bullets.map((item, idx) => (
          <li key={idx} className="flex items-start gap-2 text-[0.92rem] leading-relaxed" style={{ color: 'var(--theme-text-secondary)' }}>
            <span className="mt-1 text-azimut-red">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* Mini-tabela */}
      <div className="mb-5 grid gap-3 sm:grid-cols-2">
        {t.table.map((row, idx) => (
          <div key={idx} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
            <p className="font-sora text-[0.9rem] font-semibold" style={{ color: 'var(--theme-text)' }}>
              {row.who}
            </p>
            <p className="text-[0.85rem]" style={{ color: 'var(--theme-text-secondary)' }}>
              {row.what}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <a
        href="/contact"
        className="inline-flex items-center gap-2 rounded-xl border border-azimut-red/60 bg-azimut-red/10 px-5 py-3 font-sora text-[0.8rem] font-semibold uppercase tracking-[0.12em] transition hover:bg-azimut-red/20"
        style={{ color: 'var(--theme-text)' }}
      >
        {t.cta}
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </a>
    </div>
  )
}

export default CredibilidadeEditais





















