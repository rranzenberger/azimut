import React, { useMemo, useState } from 'react'
import type { Lang } from '../i18n'
import { opportunities, type Opportunity } from '../data/opportunities'

type CountryFilter = 'ALL' | 'BR' | 'CA' | 'EU' | 'US' | 'INTL'
type StatusFilter = 'all' | 'open' | 'upcoming'

const labels = {
  title: {
    pt: 'Oportunidades Ativas',
    en: 'Active Opportunities',
    es: 'Oportunidades Activas',
    fr: 'Opportunités Actives'
  },
  subtitle: {
    pt: 'Monitoramento contínuo de editais e chamadas para cultura, XR, cinema e inovação.',
    en: 'Continuous monitoring of grants and calls for culture, XR, film and innovation.',
    es: 'Monitoreo continuo de editais y convocatorias para cultura, XR, cine e innovación.',
    fr: 'Suivi continu des appels et financements pour culture, XR, cinéma et innovation.'
  },
  country: {
    pt: 'País',
    en: 'Country',
    es: 'País',
    fr: 'Pays'
  },
  status: {
    pt: 'Status',
    en: 'Status',
    es: 'Estado',
    fr: 'Statut'
  },
  statusMap: {
    open: {
      pt: 'Aberto',
      en: 'Open',
      es: 'Abierto',
      fr: 'Ouvert'
    },
    upcoming: {
      pt: 'Em breve',
      en: 'Upcoming',
      es: 'Próximamente',
      fr: 'À venir'
    },
    closed: {
      pt: 'Fechado',
      en: 'Closed',
      es: 'Cerrado',
      fr: 'Fermé'
    }
  },
  headers: {
    name: {
      pt: 'Nome',
      en: 'Name',
      es: 'Nombre',
      fr: 'Nom'
    },
    type: {
      pt: 'Tipo',
      en: 'Type',
      es: 'Tipo',
      fr: 'Type'
    },
    area: {
      pt: 'Área',
      en: 'Area',
      es: 'Área',
      fr: 'Domaine'
    },
    deadline: {
      pt: 'Prazo',
      en: 'Deadline',
      es: 'Plazo',
      fr: 'Date limite'
    },
    status: {
      pt: 'Status',
      en: 'Status',
      es: 'Estado',
      fr: 'Statut'
    }
  }
}

const countryLabel = {
  BR: 'Brasil',
  CA: 'Canadá',
  EU: 'Europa',
  US: 'EUA',
  INTL: 'Internacional'
}

const typeLabel = {
  cultural: 'Cultura',
  film: 'Cinema',
  xr: 'XR/Imersivo',
  innovation: 'Inovação',
  education: 'Educação',
  brand: 'Brand/Ativação'
}

const eligibilityLabel = {
  individual: 'Indivíduo',
  micro: 'MEI/Micro',
  company: 'Empresa',
  coproduction: 'Coprodução'
}

const fundingLabel = {
  grant: 'Grant / fundo perdido',
  matching: 'Contrapartida / matching',
  tax_incentive: 'Incentivo fiscal'
}

interface Props {
  lang: Lang
  limit?: number
}

const OportunidadesAtivas: React.FC<Props> = ({ lang, limit }) => {
  const t = labels
  const [country, setCountry] = useState<CountryFilter>('ALL')
  const [status, setStatus] = useState<StatusFilter>('open')

  const filtered = useMemo(() => {
    return opportunities
      .filter((o) => (country === 'ALL' ? true : o.country === country))
      .filter((o) => (status === 'all' ? true : o.status === status))
      .slice(0, limit || 5) // limita a 5 para não “entregar ouro”
  }, [country, status, limit])

  return (
    <div className="card-adaptive rounded-2xl border border-white/10 p-6 sm:p-7 md:p-8 shadow-[0_16px_40px_rgba(0,0,0,0.35)]">
      <div className="mb-4">
        <p className="font-sora text-[0.8rem] font-semibold uppercase tracking-[0.18em]" style={{ color: 'var(--theme-text-muted)' }}>
          {t.subtitle[lang]}
        </p>
        <h2 className="font-handel text-2xl uppercase tracking-[0.12em] sm:text-3xl" style={{ color: 'var(--theme-text)' }}>
          {t.title[lang]}
        </h2>
      </div>

      {/* Frase de valor / parceria */}
      <div className="mb-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-[0.9rem]" style={{ color: 'var(--theme-text-secondary)' }}>
        {lang === 'pt' && (
          <>
            <p className="font-sora font-semibold text-azimut-red mb-1">Parceria e coprodução, corretagem enxuta.</p>
            <p>Monitoramos editais BR/CA e ajudamos a inscrever, produzir ou coproduzir o projeto — juntos ou orientando sua equipe.</p>
          </>
        )}
        {lang === 'es' && (
          <>
            <p className="font-sora font-semibold text-azimut-red mb-1">Coproducción y acompañamiento con corretaje ajustado.</p>
            <p>Monitoreamos editais BR/CA y apoyamos inscripción, producción o coproducción — juntos o asesorando tu equipo.</p>
          </>
        )}
        {lang === 'fr' && (
          <>
            <p className="font-sora font-semibold text-azimut-red mb-1">Coproduction et accompagnement, courtage ajusté.</p>
            <p>Nous suivons les appels BR/CA et aidons à postuler, produire ou coproduire — ensemble ou en guidant votre équipe.</p>
          </>
        )}
        {lang === 'en' && (
          <>
            <p className="font-sora font-semibold text-azimut-red mb-1">Co-production and guidance, lean brokerage.</p>
            <p>We monitor BR/CA calls and help you apply, produce or co-produce — together or guiding your team.</p>
          </>
        )}
      </div>

      {/* Filtros */}
      <div className="mb-4 flex flex-wrap gap-3">
        <select
          className="input-adaptive w-full sm:w-auto"
          value={country}
          onChange={(e) => setCountry(e.target.value as CountryFilter)}
        >
          <option value="ALL">🌎 {t.country[lang]} (Todos)</option>
          <option value="BR">🇧🇷 Brasil</option>
          <option value="CA">🇨🇦 Canadá</option>
          <option value="EU">🇪🇺 Europa</option>
          <option value="US">🇺🇸 EUA</option>
          <option value="INTL">🌍 Internacional</option>
        </select>

        <select
          className="input-adaptive w-full sm:w-auto"
          value={status}
          onChange={(e) => setStatus(e.target.value as StatusFilter)}
        >
          <option value="open">{t.statusMap.open[lang]}</option>
          <option value="upcoming">{t.statusMap.upcoming[lang]}</option>
          <option value="all">Todos</option>
        </select>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left">
              <th className="pb-2 pr-4">{t.headers.name[lang]}</th>
              <th className="pb-2 pr-4">{t.headers.deadline[lang]}</th>
              <th className="pb-2 pr-4">{t.headers.status[lang]}</th>
            </tr>
          </thead>
          <tbody className="align-top">
            {filtered.map((op) => (
              <tr key={op.id} className="border-b border-white/5">
                <td className="py-2 pr-4">
                  <a
                    href={op.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-azimut-red hover:text-azimut-red/80 transition-colors"
                  >
                    {op.name}
                  </a>
                  <div className="text-[0.8rem]" style={{ color: 'var(--theme-text-muted)' }}>
                    {countryLabel[op.country]}
                  </div>
                  <div className="text-[0.8rem] flex flex-wrap gap-2 mt-1" style={{ color: 'var(--theme-text-secondary)' }}>
                    <span className="rounded-full border border-white/10 px-2 py-0.5">
                      {typeLabel[op.type]}
                    </span>
                    <span className="rounded-full border border-white/10 px-2 py-0.5">
                      {eligibilityLabel[op.eligibility]}
                    </span>
                    <span className="rounded-full border border-white/10 px-2 py-0.5">
                      {fundingLabel[op.fundingType]}
                    </span>
                  </div>
                </td>
                <td className="py-2 pr-4" style={{ color: 'var(--theme-text-secondary)' }}>
                  {op.deadline || '—'}
                </td>
                <td className="py-2 pr-4">
                  <span
                    className={`rounded-full px-2 py-1 text-[0.75rem] ${
                      op.status === 'open'
                        ? 'bg-emerald-500/20 text-emerald-200'
                        : op.status === 'upcoming'
                        ? 'bg-amber-500/20 text-amber-200'
                        : 'bg-slate-500/20 text-slate-200'
                    }`}
                  >
                    {t.statusMap[op.status][lang] || op.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OportunidadesAtivas

