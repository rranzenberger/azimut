/**
 * Componente para mostrar status de progresso da galeria
 * Aparece apenas para Museu Olímpico
 */

import React from 'react'
import { type Lang } from '../i18n'

interface ProjectGalleryStatusProps {
  gallery: any[]
  lang: Lang
}

const ProjectGalleryStatus: React.FC<ProjectGalleryStatusProps> = ({ gallery, lang }) => {
  if (!gallery || gallery.length === 0) return null

  // Contar imagens por categoria
  const categories = {
    jornal: gallery.filter((m: any) => (m.original || '').toLowerCase().includes('jornal')).length,
    instalacoes: gallery.filter((m: any) => {
      const url = (m.original || '').toLowerCase()
      return url.includes('semi-esfera') || url.includes('bicicleta') || url.includes('tela-interativa') || url.includes('velodromo')
    }).length,
    ginastica: gallery.filter((m: any) => (m.original || '').toLowerCase().includes('ginastica')).length,
    eventos: gallery.filter((m: any) => {
      const url = (m.original || '').toLowerCase()
      return url.includes('inauguracao') || url.includes('evento') || url.includes('crowd')
    }).length,
    'making-of': gallery.filter((m: any) => {
      const url = (m.original || '').toLowerCase()
      return url.includes('construcao') || url.includes('making')
    }).length
  }

  // Contar TIER 1
  const tier1Files = [
    'jornal-o-globo-capa',
    'velodromo-exterior',
    'semi-esfera-verde',
    'bicicleta-interativa',
    'tela-interativa-mapa'
  ]
  const tier1Count = gallery.filter((m: any) => {
    const url = (m.original || '').toLowerCase()
    return tier1Files.some(file => url.includes(file))
  }).length

  const totalImages = gallery.length
  const totalExpected = 18 // Total esperado de imagens
  const progress = Math.round((totalImages / totalExpected) * 100)

  const labels = {
    pt: {
      title: 'Status da Galeria',
      total: 'Total de Imagens',
      tier1: 'Destaques (TIER 1)',
      categories: 'Por Categoria',
      jornal: 'Jornal',
      instalacoes: 'Instalações',
      ginastica: 'Ginástica',
      eventos: 'Eventos',
      'making-of': 'Making-of',
      progress: 'Progresso'
    },
    en: {
      title: 'Gallery Status',
      total: 'Total Images',
      tier1: 'Highlights (TIER 1)',
      categories: 'By Category',
      jornal: 'Press',
      instalacoes: 'Installations',
      ginastica: 'Gymnastics',
      eventos: 'Events',
      'making-of': 'Making-of',
      progress: 'Progress'
    },
    es: {
      title: 'Estado de la Galería',
      total: 'Total de Imágenes',
      tier1: 'Destacados (TIER 1)',
      categories: 'Por Categoría',
      jornal: 'Prensa',
      instalacoes: 'Instalaciones',
      ginastica: 'Gimnasia',
      eventos: 'Eventos',
      'making-of': 'Making-of',
      progress: 'Progreso'
    },
    fr: {
      title: 'État de la Galerie',
      total: 'Total d\'Images',
      tier1: 'En Vedette (TIER 1)',
      categories: 'Par Catégorie',
      jornal: 'Presse',
      instalacoes: 'Installations',
      ginastica: 'Gymnastique',
      eventos: 'Événements',
      'making-of': 'Making-of',
      progress: 'Progrès'
    }
  }

  const t = labels[lang]

  return (
    <div className="rounded-2xl border border-white/10 card-adaptive p-6 bg-white/5 backdrop-blur mb-8">
      <h3 className="mb-4 font-handel text-xl uppercase tracking-[0.12em] text-white">
        📊 {t.title}
      </h3>

      {/* Progresso Geral */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-300">{t.progress}</span>
          <span className="text-sm font-medium text-white">{progress}%</span>
        </div>
        <div className="w-full bg-slate-800 rounded-full h-2">
          <div
            className="bg-azimut-red h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-slate-400 mt-2">
          {totalImages} / {totalExpected} {lang === 'pt' ? 'imagens adicionadas' : lang === 'es' ? 'imágenes añadidas' : lang === 'fr' ? 'images ajoutées' : 'images added'}
        </p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="rounded-lg border border-white/10 bg-white/5 p-3">
          <p className="text-xs text-slate-400 mb-1">{t.total}</p>
          <p className="text-2xl font-bold text-white">{totalImages}</p>
        </div>
        <div className="rounded-lg border border-azimut-red/30 bg-azimut-red/10 p-3">
          <p className="text-xs text-slate-400 mb-1">{t.tier1}</p>
          <p className="text-2xl font-bold text-azimut-red">{tier1Count}</p>
        </div>
      </div>

      {/* Por Categoria */}
      <div>
        <p className="text-sm text-slate-300 mb-3">{t.categories}</p>
        <div className="space-y-2">
          {Object.entries(categories).map(([cat, count]) => {
            const catLabels: Record<string, Record<Lang, string>> = {
              jornal: { pt: 'Jornal', en: 'Press', es: 'Prensa', fr: 'Presse' },
              instalacoes: { pt: 'Instalações', en: 'Installations', es: 'Instalaciones', fr: 'Installations' },
              ginastica: { pt: 'Ginástica', en: 'Gymnastics', es: 'Gimnasia', fr: 'Gymnastique' },
              eventos: { pt: 'Eventos', en: 'Events', es: 'Eventos', fr: 'Événements' },
              'making-of': { pt: 'Making-of', en: 'Making-of', es: 'Making-of', fr: 'Making-of' }
            }
            return (
              <div key={cat} className="flex items-center justify-between">
                <span className="text-sm text-slate-300">{catLabels[cat]?.[lang] || cat}</span>
                <div className="flex items-center gap-2">
                  <div className="w-24 bg-slate-800 rounded-full h-1.5">
                    <div
                      className="bg-azimut-red h-1.5 rounded-full"
                      style={{ width: `${(count / 5) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-white w-8 text-right">{count}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ProjectGalleryStatus

