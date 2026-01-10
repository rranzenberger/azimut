'use client'

import React, { useState } from 'react'
import { 
  Sparkles, Check, X, Tag, FileText, FolderOpen, 
  Target, Star, Palette, Eye, Zap, Loader2 
} from 'lucide-react'

interface AIAnalysis {
  category: string
  tags: string[]
  caption: string
  suggestedProjects?: Array<{
    name: string
    confidence: number
    reason: string
  }>
  suggestedPosition: string
  quality: {
    resolution: string
    focus: string
    lighting: string
    composition: string
  }
  detectedObjects: string[]
  detectedPeople: boolean
  isVancouver: boolean
  isAcademy: boolean
  isProfessional: boolean
  colors: {
    dominant: string
    palette: string[]
  }
  recommendation: string
  confidence: number
}

interface MediaAIAssistantProps {
  mediaId: string
  imageUrl: string
  onApply: (data: Partial<AIAnalysis>) => void
  onClose: () => void
}

const MediaAIAssistant: React.FC<MediaAIAssistantProps> = ({
  mediaId,
  imageUrl,
  onApply,
  onClose
}) => {
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [editedCaption, setEditedCaption] = useState('')

  const analyzeImage = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/media/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mediaId, imageUrl })
      })

      const data = await response.json()

      if (!data.success) {
        throw new Error(data.error || 'Failed to analyze')
      }

      const analysisData = data.analysis
      setAnalysis(analysisData)
      setSelectedTags(analysisData.tags || [])
      setEditedCaption(analysisData.caption || '')
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleApplyAll = () => {
    if (!analysis) return
    
    onApply({
      category: analysis.category,
      tags: selectedTags,
      caption: editedCaption
    })
  }

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  const getCategoryLabel = (cat: string) => {
    const labels: Record<string, string> = {
      portfolio: '📁 Portfolio',
      academy: '🎓 Academy',
      studio: '🎥 Estúdio',
      team: '👥 Equipe',
      blog: '📝 Blog'
    }
    return labels[cat] || cat
  }

  const getConfidenceBadge = (confidence: number) => {
    if (confidence > 0.9) return { icon: '🎯', color: 'green', label: 'Alta confiança' }
    if (confidence > 0.7) return { icon: '✅', color: 'blue', label: 'Boa confiança' }
    return { icon: '⚠️', color: 'yellow', label: 'Baixa confiança' }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6 h-6 text-purple-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Análise com IA
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!analysis && !loading && !error && (
            <div className="text-center py-12">
              <Sparkles className="w-16 h-16 mx-auto mb-4 text-purple-600" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                Pronto para analisar!
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                A IA vai identificar categoria, tags, qualidade e sugerir onde usar esta imagem
              </p>
              <button
                onClick={analyzeImage}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium"
              >
                🤖 Analisar com IA
              </button>
            </div>
          )}

          {loading && (
            <div className="text-center py-12">
              <Loader2 className="w-12 h-12 mx-auto mb-4 text-purple-600 animate-spin" />
              <p className="text-gray-600 dark:text-gray-400">
                Analisando imagem com Claude Vision...
              </p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <p className="text-red-600 dark:text-red-400">{error}</p>
                <button
                  onClick={analyzeImage}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Tentar novamente
                </button>
              </div>
            </div>
          )}

          {analysis && (
            <div className="space-y-6">
              {/* Confidence Badge */}
              <div className="flex items-center justify-between">
                <div className={`
                  px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2
                  ${analysis.confidence > 0.9 ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                    analysis.confidence > 0.7 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'}
                `}>
                  <span>{getConfidenceBadge(analysis.confidence).icon}</span>
                  <span>{(analysis.confidence * 100).toFixed(0)}% - {getConfidenceBadge(analysis.confidence).label}</span>
                </div>
              </div>

              {/* Category */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FolderOpen className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Categoria</h3>
                </div>
                <div className="text-2xl font-bold text-purple-600">
                  {getCategoryLabel(analysis.category)}
                </div>
              </div>

              {/* Tags */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Tag className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold text-gray-900 dark:text-white">Tags</h3>
                  </div>
                  <button
                    onClick={() => setSelectedTags(analysis.tags)}
                    className="text-sm text-purple-600 hover:underline"
                  >
                    Selecionar todas
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {analysis.tags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`
                        px-3 py-1 rounded-full text-sm font-medium transition-colors
                        ${selectedTags.includes(tag)
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }
                      `}
                    >
                      {selectedTags.includes(tag) && <Check className="w-3 h-3 inline mr-1" />}
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Caption */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Caption / Descrição</h3>
                </div>
                <textarea
                  value={editedCaption}
                  onChange={(e) => setEditedCaption(e.target.value)}
                  className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  rows={3}
                />
              </div>

              {/* Position Suggestion */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Onde Usar</h3>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Posição ideal:</span> {analysis.suggestedPosition}
                </p>
              </div>

              {/* Quality Assessment */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Qualidade</h3>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Resolução:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">{analysis.quality.resolution}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Foco:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">{analysis.quality.focus}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Iluminação:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">{analysis.quality.lighting}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-400">Composição:</span>
                    <span className="ml-2 font-medium text-gray-900 dark:text-white">{analysis.quality.composition}</span>
                  </div>
                </div>
              </div>

              {/* Colors */}
              <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Palette className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-gray-900 dark:text-white">Paleta de Cores</h3>
                </div>
                <div className="flex gap-2">
                  {analysis.colors.palette.map((color, i) => (
                    <div
                      key={i}
                      className="w-12 h-12 rounded-lg border-2 border-gray-300 dark:border-gray-700"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              {/* Recommendation */}
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-purple-600" />
                  <h3 className="font-semibold text-purple-900 dark:text-purple-100">Recomendação da IA</h3>
                </div>
                <p className="text-purple-800 dark:text-purple-200">
                  {analysis.recommendation}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {analysis && (
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 dark:border-gray-800">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              Cancelar
            </button>
            <button
              onClick={handleApplyAll}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium flex items-center gap-2"
            >
              <Check className="w-5 h-5" />
              Aplicar Sugestões
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MediaAIAssistant
