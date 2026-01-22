// ════════════════════════════════════════════════════════════
// COMPONENTE: CompanyTimeline
// ════════════════════════════════════════════════════════════
// Timeline completa da empresa usando dados reais da API
// - Busca dados de /api/public/history
// - FALLBACK: Usa dados estáticos se API falhar (404, etc)
// - Lista sequencial completa sempre visível (formato tabela)
// - Suporta multilíngue
// - Filtros por tipo, featured, período
// - Layout: Ano fixo à esquerda + Conteúdo à direita
// ════════════════════════════════════════════════════════════

import React, { useEffect, useState, useMemo, useCallback, useRef } from 'react'
import { Lang } from '../i18n'

interface CompanyHistoryItem {
  id: string
  year: number
  yearEnd: number | null
  period: string
  type: string
  title: string
  description: string | null
  bullets: string[]
  icon: string | null
  logoUrl: string | null
  externalLink: string | null
  isFeatured: boolean
}

interface CompanyTimelineProps {
  lang: Lang
  type?: string // Filtrar por tipo
  featured?: boolean // Mostrar apenas featured
  yearStart?: number
  yearEnd?: number
  layout?: 'vertical' | 'horizontal'
  className?: string
}

// ════════════════════════════════════════════════════════════
// DADOS ESTÁTICOS DE FALLBACK (quando API não está disponível)
// ════════════════════════════════════════════════════════════
const FALLBACK_HISTORY: Record<Lang, CompanyHistoryItem[]> = {
  pt: [
    { id: '1', year: 1996, yearEnd: null, period: '1996', type: 'milestone', title: 'ArchiCAD Brasil - Computação Gráfica', description: 'Início das atividades com ArchiCAD, computação gráfica, CAD e maquetes virtuais.', bullets: [], icon: '🏗️', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '2', year: 2000, yearEnd: 2018, period: '2000-2018', type: 'partnership', title: 'AZMT - Centro de Treinamento Autodesk', description: 'AZMT Computação e Produções Cinematográficas (nome fantasia Azimut) torna-se Centro de Treinamento Autodesk oficial na América do Sul por 18 anos.', bullets: ['Centro de Treinamento Autodesk Oficial', 'Demo Artist Autodesk Discreet', 'Application Engineer América do Sul', 'Único Flame Trainer certificado no Brasil'], icon: '🎓', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '3', year: 1998, yearEnd: null, period: '1998', type: 'milestone', title: 'AZMT Computação e Produções Cinematográficas', description: 'Fundação oficial da empresa com foco em produções cinematográficas.', bullets: [], icon: '🎬', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '4', year: 1999, yearEnd: null, period: '1999', type: 'partnership', title: 'Discreet (Montreal, Canada)', description: 'Parceria com Discreet (adquirida pela Autodesk em 1999) - empresa canadense sediada em Montreal.', bullets: [], icon: '🇨🇦', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '5', year: 2002, yearEnd: null, period: '2002', type: 'award', title: '1 de 15 no mundo - Training Specialist', description: 'Training Specialist Discreet Montreal - elite mundial de especialistas certificados.', bullets: [], icon: '🌟', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '6', year: 2004, yearEnd: 2018, period: '2004-2018', type: 'milestone', title: 'Azimut Escola de Animação', description: 'Primeira escola de animação CG Autodesk na América Latina.', bullets: ['Cursos profissionalizantes 1-2 anos', 'CAD, 3ds Max, After Effects, Flame', 'Formamos centenas de profissionais', 'Filiais em Rio, Belém, Florianópolis'], icon: '🎓', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '7', year: 2005, yearEnd: null, period: '2005', type: 'award', title: 'Digital Designer - Pessoa do Ano', description: 'Pessoa do ano em computação gráfica no Brasil - MAC Niterói.', bullets: [], icon: '🏆', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '8', year: 2005, yearEnd: 2007, period: '2005-2007', type: 'project', title: 'Taikodom - Maior Game Brasileiro', description: 'Direção de arte do maior projeto de game desenvolvido no Brasil - MMORPG espacial.', bullets: [], icon: '🎮', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '9', year: 2023, yearEnd: 2025, period: '2023-2025', type: 'project', title: 'Museu Olímpico do Rio', description: 'Direção Geral de Tecnologia para o Museu Olímpico do Rio de Janeiro - pós Olimpíadas 2016.', bullets: [], icon: '🏛️', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '10', year: 2017, yearEnd: null, period: '2017', type: 'milestone', title: 'Vancouver, Canadá', description: 'Expansão internacional com operações em Vancouver, British Columbia.', bullets: [], icon: '🍁', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '11', year: 2017, yearEnd: 2025, period: '2017-2025', type: 'partnership', title: 'Festival de Gramado - Curadoria VR', description: 'Curadoria oficial de Realidade Virtual do Festival de Cinema de Gramado por 8 anos consecutivos - único no Brasil.', bullets: [], icon: '🎬', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '12', year: 2018, yearEnd: null, period: '2018', type: 'partnership', title: 'XRBR - Membro Fundador', description: 'Membro fundador da Associação Brasileira de Realidade Estendida.', bullets: [], icon: '🏆', logoUrl: null, externalLink: null, isFeatured: false },
  ],
  en: [
    { id: '1', year: 1996, yearEnd: null, period: '1996', type: 'milestone', title: 'ArchiCAD Brasil - Computer Graphics', description: 'Start of activities with ArchiCAD, computer graphics, CAD and virtual models.', bullets: [], icon: '🏗️', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '2', year: 2000, yearEnd: 2018, period: '2000-2018', type: 'partnership', title: 'AZMT - Autodesk Training Center', description: 'AZMT Computing and Cinematographic Productions (trade name Azimut) becomes official Autodesk Training Center in South America for 18 years.', bullets: ['Official Autodesk Training Center', 'Demo Artist Autodesk Discreet', 'Application Engineer South America', 'Only certified Flame Trainer in Brazil'], icon: '🎓', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '3', year: 1998, yearEnd: null, period: '1998', type: 'milestone', title: 'AZMT Computing and Cinematographic Productions', description: 'Official company foundation focused on cinematographic productions.', bullets: [], icon: '🎬', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '4', year: 1999, yearEnd: null, period: '1999', type: 'partnership', title: 'Discreet (Montreal, Canada)', description: 'Partnership with Discreet (acquired by Autodesk in 1999) - Canadian company based in Montreal.', bullets: [], icon: '🇨🇦', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '5', year: 2002, yearEnd: null, period: '2002', type: 'award', title: '1 of 15 worldwide - Training Specialist', description: 'Discreet Montreal Training Specialist - global elite of certified specialists.', bullets: [], icon: '🌟', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '6', year: 2004, yearEnd: 2018, period: '2004-2018', type: 'milestone', title: 'Azimut Animation School', description: 'First CG animation school Autodesk in Latin America.', bullets: ['Professional courses 1-2 years', 'CAD, 3ds Max, After Effects, Flame', 'Trained hundreds of professionals', 'Branches in Rio, Belém, Florianópolis'], icon: '🎓', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '7', year: 2005, yearEnd: null, period: '2005', type: 'award', title: 'Digital Designer - Person of the Year', description: 'Person of the year in computer graphics in Brazil - MAC Niterói.', bullets: [], icon: '🏆', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '8', year: 2005, yearEnd: 2007, period: '2005-2007', type: 'project', title: 'Taikodom - Largest Brazilian Game', description: 'Art direction of the largest game project developed in Brazil - space MMORPG.', bullets: [], icon: '🎮', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '9', year: 2023, yearEnd: 2025, period: '2023-2025', type: 'project', title: 'Olympic Museum of Rio', description: 'General Technology Director for the Olympic Museum of Rio de Janeiro - post 2016 Olympics.', bullets: [], icon: '🏛️', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '10', year: 2017, yearEnd: null, period: '2017', type: 'milestone', title: 'Vancouver, Canada', description: 'International expansion with operations in Vancouver, British Columbia.', bullets: [], icon: '🍁', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '11', year: 2017, yearEnd: 2025, period: '2017-2025', type: 'partnership', title: 'Gramado Festival - VR Curatorship', description: 'Official Virtual Reality curatorship of Gramado Film Festival for 8 consecutive years - unique in Brazil.', bullets: [], icon: '🎬', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '12', year: 2018, yearEnd: null, period: '2018', type: 'partnership', title: 'XRBR - Founding Member', description: 'Founding member of Brazilian Extended Reality Association.', bullets: [], icon: '🏆', logoUrl: null, externalLink: null, isFeatured: false },
  ],
  es: [
    { id: '1', year: 1996, yearEnd: null, period: '1996', type: 'milestone', title: 'ArchiCAD Brasil - Computación Gráfica', description: 'Inicio de actividades con ArchiCAD, computación gráfica, CAD y maquetas virtuales.', bullets: [], icon: '🏗️', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '2', year: 2000, yearEnd: 2018, period: '2000-2018', type: 'partnership', title: 'AZMT - Centro de Capacitación Autodesk', description: 'AZMT Computación y Producciones Cinematográficas (nombre comercial Azimut) se convierte en Centro de Capacitación Autodesk oficial en América del Sur por 18 años.', bullets: ['Centro de Capacitación Autodesk Oficial', 'Demo Artist Autodesk Discreet', 'Application Engineer América del Sur', 'Único Flame Trainer certificado en Brasil'], icon: '🎓', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '3', year: 1998, yearEnd: null, period: '1998', type: 'milestone', title: 'AZMT Computación y Producciones Cinematográficas', description: 'Fundación oficial de la empresa con enfoque en producciones cinematográficas.', bullets: [], icon: '🎬', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '4', year: 2005, yearEnd: 2007, period: '2005-2007', type: 'project', title: 'Taikodom - Mayor Juego Brasileño', description: 'Dirección de arte del mayor proyecto de juego desarrollado en Brasil.', bullets: [], icon: '🎮', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '5', year: 2023, yearEnd: 2025, period: '2023-2025', type: 'project', title: 'Museo Olímpico de Río', description: 'Dirección General de Tecnología para el Museo Olímpico de Río de Janeiro - post Olimpíadas 2016.', bullets: [], icon: '🏛️', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '6', year: 2017, yearEnd: 2025, period: '2017-2025', type: 'partnership', title: 'Festival de Gramado - Curaduría VR', description: 'Curaduría oficial de Realidad Virtual del Festival de Cine de Gramado por 8 años consecutivos.', bullets: [], icon: '🎬', logoUrl: null, externalLink: null, isFeatured: true },
  ],
  fr: [
    { id: '1', year: 1996, yearEnd: null, period: '1996', type: 'milestone', title: 'ArchiCAD Brasil - Infographie', description: 'Début des activités avec ArchiCAD, infographie, CAD et maquettes virtuelles.', bullets: [], icon: '🏗️', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '2', year: 2000, yearEnd: 2018, period: '2000-2018', type: 'partnership', title: 'AZMT - Centre de Formation Autodesk', description: 'AZMT Informatique et Productions Cinématographiques (nom commercial Azimut) devient Centre de Formation Autodesk officiel en Amérique du Sud pendant 18 ans.', bullets: ['Centre de Formation Autodesk Officiel', 'Demo Artist Autodesk Discreet', 'Application Engineer Amérique du Sud', 'Seul Flame Trainer certifié au Brésil'], icon: '🎓', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '3', year: 1998, yearEnd: null, period: '1998', type: 'milestone', title: 'AZMT Informatique et Productions Cinématographiques', description: 'Fondation officielle de l\'entreprise axée sur les productions cinématographiques.', bullets: [], icon: '🎬', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '4', year: 2005, yearEnd: 2007, period: '2005-2007', type: 'project', title: 'Taikodom - Plus Grand Jeu Brésilien', description: 'Direction artistique du plus grand projet de jeu développé au Brésil.', bullets: [], icon: '🎮', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '5', year: 2023, yearEnd: 2025, period: '2023-2025', type: 'project', title: 'Musée Olympique de Rio', description: 'Direction Générale de la Technologie pour le Musée Olympique de Rio de Janeiro - post Jeux 2016.', bullets: [], icon: '🏛️', logoUrl: null, externalLink: null, isFeatured: true },
    { id: '6', year: 2017, yearEnd: 2025, period: '2017-2025', type: 'partnership', title: 'Festival de Gramado - Curation VR', description: 'Curation officielle de Réalité Virtuelle du Festival de Cinéma de Gramado pendant 8 années consécutives.', bullets: [], icon: '🎬', logoUrl: null, externalLink: null, isFeatured: true },
  ],
}

export const CompanyTimeline: React.FC<CompanyTimelineProps> = React.memo(({
  lang,
  type,
  featured,
  yearStart,
  yearEnd,
  layout = 'vertical',
  className = ''
}) => {
  const [history, setHistory] = useState<CompanyHistoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usingFallback, setUsingFallback] = useState(false)
  
  // Ref para AbortController (cancelar requisições anteriores)
  const abortControllerRef = useRef<AbortController | null>(null)

  // Função para aplicar filtros nos dados (API ou fallback) - MEMOIZADA
  const applyFilters = useCallback((data: CompanyHistoryItem[]): CompanyHistoryItem[] => {
    let filtered = [...data]
    
    // Filtrar por tipo
    if (type && type !== 'all') {
      filtered = filtered.filter(item => item.type === type)
    }
    
    // Filtrar por featured
    if (featured !== undefined) {
      filtered = filtered.filter(item => item.isFeatured === featured)
    }
    
    // Filtrar por período
    if (yearStart) {
      filtered = filtered.filter(item => item.year >= yearStart)
    }
    if (yearEnd) {
      filtered = filtered.filter(item => item.year <= yearEnd)
    }
    
    return filtered
  }, [type, featured, yearStart, yearEnd])

  // Função para usar dados de fallback - MEMOIZADA
  const useFallbackData = useCallback(() => {
    console.log('[CompanyTimeline] Using FALLBACK data for lang:', lang)
    const fallbackData = FALLBACK_HISTORY[lang] || FALLBACK_HISTORY.pt
    const filteredData = applyFilters(fallbackData)
    setHistory(filteredData)
    setUsingFallback(true)
    setError(null)
    setLoading(false)
  }, [lang, applyFilters])

  const fetchHistory = useCallback(async () => {
    // Cancelar requisição anterior se ainda estiver pendente
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }
    
    // Criar novo AbortController para esta requisição
    const abortController = new AbortController()
    abortControllerRef.current = abortController
    try {
      setLoading(true)
      setError(null)
      setUsingFallback(false)
      
      // Construir URL com query params
      const params = new URLSearchParams()
      params.set('lang', lang)
      if (type && type !== 'all') params.set('type', type)
      if (featured !== undefined) params.set('featured', featured.toString())
      if (yearStart) params.set('yearStart', yearStart.toString())
      if (yearEnd) params.set('yearEnd', yearEnd.toString())

      // Usar VITE_BACKOFFICE_URL (padrão) ou fallback
      const envBackofficeUrl = import.meta.env.VITE_BACKOFFICE_URL
      const envCmsApiUrl = import.meta.env.VITE_CMS_API_URL
      const apiUrl = envBackofficeUrl || envCmsApiUrl || 'https://backoffice.azmt.com.br'
      const url = `${apiUrl}/api/public/history?${params.toString()}`
      
      console.log('[CompanyTimeline] Fetching from API:', url)
      
      const response = await fetch(url, {
        headers: { 'Accept': 'application/json' },
        signal: abortController.signal // Adicionar signal para cancelamento
      })
      
      // Se API retornar erro (404, 500, etc), usar fallback
      if (!response.ok) {
        console.warn('[CompanyTimeline] API returned error:', response.status, '- Using fallback data')
        useFallbackData()
        return
      }

      const data = await response.json()
      
      if (data.success && Array.isArray(data.data) && data.data.length > 0) {
        // Remover duplicatas baseado em year + title + type
        const uniqueHistory = data.data.filter((item: CompanyHistoryItem, index: number, self: CompanyHistoryItem[]) => 
          index === self.findIndex((t: CompanyHistoryItem) => 
            t.year === item.year && 
            t.title === item.title && 
            t.type === item.type
          )
        )
        
        console.log('[CompanyTimeline] API data loaded:', uniqueHistory.length, 'items')
        setHistory(uniqueHistory)
        setError(null)
      } else {
        // API retornou vazio ou formato inválido - usar fallback
        console.warn('[CompanyTimeline] API returned empty/invalid data - Using fallback')
        useFallbackData()
      }
    } catch (err) {
      // Se foi cancelado (AbortError), não fazer nada
      if (err instanceof Error && err.name === 'AbortError') {
        console.log('[CompanyTimeline] Request aborted')
        return
      }
      
      // Erro de rede ou outro - usar fallback
      console.warn('[CompanyTimeline] Network error - Using fallback data:', err)
      useFallbackData()
    } finally {
      // Só atualizar loading se não foi cancelado
      if (!abortController.signal.aborted) {
        setLoading(false)
      }
    }
  }, [lang, type, featured, yearStart, yearEnd, applyFilters, useFallbackData])

  // Effect com cleanup para cancelar requisições
  useEffect(() => {
    fetchHistory()
    
    // Cleanup: cancelar requisição quando componente desmonta ou props mudam
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [fetchHistory])

  // Memoizar dados filtrados para evitar re-filtragem desnecessária
  const filteredHistory = useMemo(() => {
    return applyFilters(history)
  }, [history, applyFilters])

  // Função removida - não usamos mais AnimatedTimeline, sempre lista completa

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-azimut-red border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-white/60">
            {lang === 'pt' ? 'Carregando timeline...' : 
             lang === 'en' ? 'Loading timeline...' : 
             lang === 'es' ? 'Cargando timeline...' : 
             'Chargement timeline...'}
          </p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="card-adaptive rounded-xl p-8 text-center">
        <div className="text-6xl mb-4">⚠️</div>
        <h3 className="text-xl font-bold text-white mb-2">
          {lang === 'pt' ? 'Erro ao carregar timeline' :
           lang === 'en' ? 'Error loading timeline' :
           lang === 'es' ? 'Error al cargar timeline' :
           'Erreur de chargement timeline'}
        </h3>
        <p className="text-white/60 mb-4">{error}</p>
        <button
          onClick={fetchHistory}
          className="px-6 py-2 bg-azimut-red text-white rounded-lg hover:bg-azimut-red/80 transition-colors"
        >
          {lang === 'pt' ? 'Tentar novamente' :
           lang === 'en' ? 'Try again' :
           lang === 'es' ? 'Intentar de nuevo' :
           'Réessayer'}
        </button>
      </div>
    )
  }

  // Empty state
  if (filteredHistory.length === 0) {
    return (
      <div className="card-adaptive rounded-xl p-8 text-center">
        <div className="text-6xl mb-4">📭</div>
        <h3 className="text-xl font-bold text-white mb-2">
          {lang === 'pt' ? 'Nenhum evento encontrado' :
           lang === 'en' ? 'No events found' :
           lang === 'es' ? 'No se encontraron eventos' :
           'Aucun événement trouvé'}
        </h3>
        <p className="text-white/60">
          {lang === 'pt' ? 'Tente ajustar os filtros.' :
           lang === 'en' ? 'Try adjusting the filters.' :
           lang === 'es' ? 'Intente ajustar los filtros.' :
           'Essayez d\'ajuster les filtres.'}
        </p>
      </div>
    )
  }

  return (
    <div className={className}>
      {/* Estatísticas */}
      <div className="mb-8 text-center">
        <p className="text-white/60 text-lg mb-4">
          <span className="font-bold text-azimut-red">{filteredHistory.length}</span>{' '}
          {lang === 'pt' ? 'eventos históricos' : lang === 'en' ? 'historical events' : lang === 'es' ? 'eventos históricos' : 'événements historiques'}
          {' • '}
          <span className="font-mono">{filteredHistory[0]?.year}</span> - <span className="font-mono">{filteredHistory[filteredHistory.length - 1]?.year}</span>
        </p>
      </div>

      {/* Lista Sequencial Completa - Sempre Visível */}
      <div className="space-y-4">
        {filteredHistory.map((item, index) => (
          <div
            key={item.id}
            className="relative flex gap-4 md:gap-6 group"
          >
            {/* Linha conectora vertical (exceto último item) */}
            {index < filteredHistory.length - 1 && (
              <div className="absolute left-5 md:left-6 top-14 bottom-0 w-0.5 bg-gradient-to-b from-azimut-red/60 via-azimut-red/40 to-transparent" />
            )}

            {/* Coluna do Ano (fixa) */}
            <div className="flex-shrink-0 w-16 md:w-20 text-center">
              <div className="sticky top-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-azimut-red to-orange-500 flex items-center justify-center text-white text-sm md:text-lg font-bold shadow-lg shadow-azimut-red/30 group-hover:scale-110 transition-transform mx-auto mb-2">
                  {item.icon || '📌'}
                </div>
                <div className="text-xs md:text-sm font-mono font-bold text-azimut-red bg-white/5 rounded px-2 py-1">
                  {item.period}
                </div>
              </div>
            </div>

            {/* Conteúdo do evento (expansível) */}
            <div className="flex-1 pb-6">
              <div className="card-adaptive rounded-xl p-4 md:p-6 hover:border-azimut-red/50 transition-all group-hover:shadow-lg group-hover:shadow-azimut-red/20">
                {/* Header com título e badge */}
                <div className="flex items-start justify-between mb-3 flex-wrap gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-2">
                      {item.isFeatured && (
                        <span className="inline-block px-2 py-1 text-xs font-semibold uppercase tracking-wider bg-azimut-red text-white rounded-full">
                          {lang === 'pt' ? '⭐ Destaque' : lang === 'en' ? '⭐ Featured' : lang === 'es' ? '⭐ Destacado' : '⭐ En vedette'}
                        </span>
                      )}
                      <span className="inline-block px-2 py-1 text-xs font-medium text-azimut-red/80 bg-azimut-red/10 rounded uppercase">
                        {item.type === 'milestone' ? (lang === 'pt' ? 'Marco' : lang === 'en' ? 'Milestone' : lang === 'es' ? 'Hito' : 'Jalon') :
                         item.type === 'partnership' ? (lang === 'pt' ? 'Parceria' : lang === 'en' ? 'Partnership' : lang === 'es' ? 'Asociación' : 'Partenariat') :
                         item.type === 'project' ? (lang === 'pt' ? 'Projeto' : lang === 'en' ? 'Project' : lang === 'es' ? 'Proyecto' : 'Projet') :
                         item.type === 'award' ? (lang === 'pt' ? 'Prêmio' : lang === 'en' ? 'Award' : lang === 'es' ? 'Premio' : 'Prix') :
                         item.type}
                      </span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1 group-hover:text-azimut-red transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Descrição */}
                {item.description && (
                  <p className="text-white/70 mb-4 leading-relaxed">
                    {item.description}
                  </p>
                )}

                {/* Bullets (lista detalhada) */}
                {item.bullets && item.bullets.length > 0 && (
                  <ul className="space-y-2 mb-4">
                    {item.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-white/70">
                        <span className="text-azimut-red mt-1.5 text-lg">▸</span>
                        <span className="flex-1">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Logo/Imagem se existir */}
                {item.logoUrl && (
                  <div className="mt-4 mb-4">
                    <img
                      src={item.logoUrl}
                      alt={item.title}
                      className="h-16 object-contain opacity-80 hover:opacity-100 transition-opacity"
                    />
                  </div>
                )}

                {/* Link externo se existir */}
                {item.externalLink && (
                  <a
                    href={item.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-azimut-red hover:text-azimut-red/80 transition-colors group/link"
                  >
                    {lang === 'pt' ? 'Saiba mais' : lang === 'en' ? 'Learn more' : lang === 'es' ? 'Saber más' : 'En savoir plus'}
                    <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
})

// Adicionar displayName para debugging
CompanyTimeline.displayName = 'CompanyTimeline'

export default CompanyTimeline
