import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import type { Lang } from '../i18n'

// Registrar componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

interface Project {
  slug: string
  title: string
  shortTitle?: string
  summary: string
  city?: string
  country?: string
  year?: number
  tags?: string[]
  heroImage?: {
    type?: string
    thumbnail?: string
    medium?: string
    large?: string
    alt?: string
  } | null
}

interface ProjectShowcaseProps {
  projects: Project[]
  lang: Lang
}

// Cores dos badges por projeto (AZIMUT IDENTITY - Red Dominant)
const projectColors = [
  '#c92337', // azimut-red (01) - IDENTIDADE
  '#DC2626', // red-600 (02)
  '#B91C1C', // red-700 (03)
  '#991B1B', // red-800 (04)
  '#EF4444', // red-500 (05)
  '#F87171', // red-400 (06)
  '#DC2626', // red-600 (07)
  '#c92337', // azimut-red (08) - IDENTIDADE
  '#B91C1C', // red-700 (09)
]

export const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ projects, lang }) => {
  const [selectedProjectId, setSelectedProjectId] = useState(0)
  
  // Garantir que sempre temos pelo menos 1 projeto
  const displayProjects = projects.slice(0, 9)
  const selectedProject = displayProjects[selectedProjectId] || displayProjects[0]
  
  // Calcular "DNA" do projeto (mock - baseado em tags)
  const calculateProjectDNA = (project: Project) => {
    const tags = project.tags || []
    const hasVR = tags.some(t => t.toLowerCase().includes('vr') || t.toLowerCase().includes('immersive') || t.toLowerCase().includes('imersiv'))
    const hasMotion = tags.some(t => t.toLowerCase().includes('motion') || t.toLowerCase().includes('cinema') || t.toLowerCase().includes('audiovisual'))
    const hasMuseum = tags.some(t => t.toLowerCase().includes('museum') || t.toLowerCase().includes('museu') || t.toLowerCase().includes('institutional'))
    
    return {
      spatial: hasVR ? 50 : hasMuseum ? 30 : 20,
      motion: hasMotion ? 50 : 30,
      typography: 15,
      color: 15
    }
  }
  
  const projectDNA = calculateProjectDNA(selectedProject)
  
  // Chart.js data
  const chartData = {
    labels: [
      lang === 'pt' ? '3D/Espacial' : '3D/Spatial',
      lang === 'pt' ? 'Motion' : 'Motion',
      lang === 'pt' ? 'Tipografia' : 'Typography',
      lang === 'pt' ? 'Cor/Luz' : 'Color/Light'
    ],
    datasets: [{
      label: lang === 'pt' ? 'Composição %' : 'Composition %',
      data: [projectDNA.spatial, projectDNA.motion, projectDNA.typography, projectDNA.color],
      backgroundColor: [projectColors[selectedProjectId], projectColors[selectedProjectId], '#78716C', '#A8A29E'],
      borderRadius: 4,
    }]
  }
  
  const chartOptions = {
    indexAxis: 'y' as const,
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { display: false, max: 60 },
      y: { 
        grid: { display: false },
        ticks: { 
          font: { size: 12, weight: '600' },
          color: 'var(--theme-text)'
        }
      }
    },
    plugins: { 
      legend: { display: false },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        padding: 14,
        titleFont: { size: 14, weight: 'bold' },
        bodyFont: { size: 13 },
        borderColor: projectColors[selectedProjectId],
        borderWidth: 2
      }
    }
  }
  
  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Título */}
        <div className="mb-8 text-center">
          <h2 className="font-handel text-3xl md:text-4xl uppercase tracking-[0.12em] mb-3" style={{ color: 'var(--theme-text)' }}>
            {lang === 'pt' ? 'Projetos em Destaque' : lang === 'es' ? 'Proyectos Destacados' : lang === 'fr' ? 'Projets en Vedette' : 'Featured Projects'}
          </h2>
          <p className="text-sm md:text-base" style={{ color: 'var(--theme-text-secondary)' }}>
            {lang === 'pt' ? 'Clique em um cartão para analisar os detalhes do projeto' : lang === 'es' ? 'Haz clic en una tarjeta para analizar los detalles del proyecto' : 'Click a card to analyze project details'}
          </p>
        </div>
        
        {/* Grid 5+7 (estilo Gemini) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          
          {/* Lista de Projetos (col-5) */}
          <div className="lg:col-span-5 space-y-3 md:space-y-4">
            {displayProjects.map((project, idx) => (
              <div
                key={project.slug}
                onClick={() => setSelectedProjectId(idx)}
                className={`site-card group glass-panel backdrop-blur-sm p-4 md:p-5 rounded-xl border cursor-pointer shadow-sm relative overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                  selectedProjectId === idx 
                    ? 'border-azimut-red bg-red-50/80 dark:bg-red-950/30' 
                    : 'bg-white/70 dark:bg-slate-800/70 border-stone-200 dark:border-stone-700 hover:border-azimut-red'
                }`}
              >
                {/* Barra lateral (Gemini style) */}
                <div 
                  className="absolute top-0 left-0 w-1 h-full transition-colors"
                  style={{ 
                    backgroundColor: selectedProjectId === idx ? projectColors[idx] : '#E7E5E4'
                  }}
                ></div>
                
                <div className="flex justify-between items-center ml-3">
                  <div>
                    <h4 
                      className="font-handel text-base md:text-lg transition-colors line-clamp-1"
                      style={{ 
                        color: selectedProjectId === idx ? projectColors[idx] : 'var(--theme-text)'
                      }}
                    >
                      {project.title}
                    </h4>
                    <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--theme-text-muted)' }}>
                      {[project.city, project.country].filter(Boolean).join(', ') || project.year || ''}
                    </p>
                  </div>
                  <div className="text-right">
                    <span 
                      className="text-2xl font-bold transition-colors"
                      style={{ 
                        color: selectedProjectId === idx ? `${projectColors[idx]}30` : '#E7E5E4'
                      }}
                    >
                      0{idx + 1}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Detail Panel Sticky (col-7) */}
          <div className="lg:col-span-7">
            <div className="sticky top-24 glass-panel backdrop-blur-xl rounded-2xl p-6 md:p-8 border shadow-xl transition-all duration-500"
              style={{
                background: 'var(--theme-card-bg)',
                borderColor: 'var(--theme-border)'
              }}
            >
              {/* Header com Score Badge */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-3xl md:text-4xl font-handel" style={{ color: 'var(--theme-text)' }}>
                    {selectedProject.title}
                  </h3>
                  <p 
                    className="font-medium uppercase tracking-wide text-sm mt-1"
                    style={{ color: projectColors[selectedProjectId] }}
                  >
                    {[selectedProject.city, selectedProject.country].filter(Boolean).join(', ')}
                  </p>
                </div>
                <div 
                  className="text-white rounded-lg p-3 text-center min-w-[80px]"
                  style={{ backgroundColor: projectColors[selectedProjectId] }}
                >
                  <span className="block text-2xl font-bold">{selectedProject.year || '2024'}</span>
                  <span className="block text-[10px] uppercase opacity-70">
                    {lang === 'pt' ? 'Ano' : lang === 'es' ? 'Año' : 'Year'}
                  </span>
                </div>
              </div>
              
              {/* Imagem do Projeto */}
              {(selectedProject.heroImage?.large || selectedProject.heroImage?.medium || selectedProject.heroImage?.thumbnail) && (
                <img 
                  src={selectedProject.heroImage?.large || selectedProject.heroImage?.medium || selectedProject.heroImage?.thumbnail || ''} 
                  alt={selectedProject.heroImage?.alt || selectedProject.title}
                  className="w-full h-48 md:h-64 object-cover rounded-xl mb-6" 
                />
              )}
              
              <p className="text-base md:text-lg leading-relaxed mb-8" style={{ color: 'var(--theme-text-secondary)' }}>
                {selectedProject.summary || selectedProject.shortTitle}
              </p>
              
              {/* Destaques + DNA Chart (estilo Gemini) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="glass-panel backdrop-blur-sm bg-white/90 dark:bg-stone-900/80 p-5 rounded-xl border border-azimut-red/20 dark:border-azimut-red/30">
                  <h4 className="font-bold text-base mb-3 pb-2 border-b" style={{ 
                    color: 'var(--theme-text)',
                    borderColor: projectColors[selectedProjectId],
                    borderWidth: '2px'
                  }}>
                    {lang === 'pt' ? 'Destaques' : lang === 'es' ? 'Destacados' : lang === 'fr' ? 'Points Forts' : 'Highlights'}
                  </h4>
                  <ul className="space-y-3 text-sm">
                    {(selectedProject.tags || []).slice(0, 3).map((tag, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <span 
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: projectColors[selectedProjectId] }}
                        ></span>
                        <span className="font-medium" style={{ color: 'var(--theme-text)' }}>
                          {tag}
                        </span>
                      </li>
                    ))}
                    {(!selectedProject.tags || selectedProject.tags.length === 0) && (
                      <li className="flex items-center gap-3">
                        <span 
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: projectColors[selectedProjectId] }}
                        ></span>
                        <span className="font-medium" style={{ color: 'var(--theme-text)' }}>
                          {lang === 'pt' ? 'Projeto Premium' : 'Premium Project'}
                        </span>
                      </li>
                    )}
                  </ul>
                </div>
                
                <div className="glass-panel backdrop-blur-sm bg-white/90 dark:bg-stone-900/80 p-5 rounded-xl border border-azimut-red/20 dark:border-azimut-red/30">
                  <h4 className="font-bold text-base mb-3 pb-2 border-b" style={{ 
                    color: 'var(--theme-text)',
                    borderColor: projectColors[selectedProjectId],
                    borderWidth: '2px'
                  }}>
                    {lang === 'pt' ? 'Composição Visual' : 'Visual Composition'}
                  </h4>
                  <div style={{ height: '150px' }}>
                    <Bar data={chartData} options={chartOptions} />
                  </div>
                </div>
              </div>
              
              <Link
                to={`/work/${selectedProject.slug}`}
                className="w-full py-3 bg-stone-100 dark:bg-stone-800 hover:bg-amber-100 dark:hover:bg-amber-900/30 rounded-lg transition-colors flex justify-center items-center gap-2 group font-semibold"
                style={{ color: 'var(--theme-text)' }}
              >
                <span>{lang === 'pt' ? 'Ver Projeto Completo' : lang === 'es' ? 'Ver Proyecto Completo' : 'View Full Project'}</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  )
}

