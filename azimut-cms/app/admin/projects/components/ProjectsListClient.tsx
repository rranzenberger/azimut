'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ProjectCard } from './ProjectCard';
import { NewProjectButton } from './NewProjectButton';

interface ProjectsListClientProps {
  projects: any[];
  error: string | null;
}

const filterBtnStyle = (active: boolean): React.CSSProperties => ({
  padding: '6px 14px',
  borderRadius: 8,
  border: `1px solid ${active ? 'rgba(201,35,55,0.5)' : 'rgba(255,255,255,0.1)'}`,
  background: active ? 'rgba(201,35,55,0.2)' : 'rgba(255,255,255,0.04)',
  color: active ? '#fca5a5' : '#94a3b8',
  fontSize: 12,
  fontWeight: active ? 700 : 500,
  cursor: 'pointer',
  transition: 'all 0.2s ease',
});

export function ProjectsListClient({ projects, error }: ProjectsListClientProps) {
  // Filtros
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'PUBLISHED' | 'DRAFT' | 'ARCHIVED'>('all');
  const [filterFeatured, setFilterFeatured] = useState<'all' | 'featured' | 'normal'>('all');
  const [filterYear, setFilterYear] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recent' | 'year-desc' | 'year-asc' | 'title' | 'priority'>('recent');

  // Anos únicos
  const availableYears = useMemo(() => {
    const years = projects
      .map((p: any) => p.year)
      .filter((y: any) => y != null && y > 0)
      .sort((a: number, b: number) => b - a);
    return [...new Set(years)] as number[];
  }, [projects]);

  // Contadores
  const counts = useMemo(() => {
    const published = projects.filter((p: any) => p.status === 'PUBLISHED').length;
    const draft = projects.filter((p: any) => p.status === 'DRAFT').length;
    const archived = projects.filter((p: any) => p.status === 'ARCHIVED').length;
    const featured = projects.filter((p: any) => p.featured && p.priorityHome >= 1 && p.priorityHome <= 4).length;
    const noYear = projects.filter((p: any) => !p.year || p.year === 0).length;
    return { published, draft, archived, featured, noYear, total: projects.length };
  }, [projects]);

  // Filtrar e ordenar
  const filtered = useMemo(() => {
    let result = [...projects];

    // Busca por texto
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((p: any) =>
        (p.title || '').toLowerCase().includes(q) ||
        (p.shortTitle || '').toLowerCase().includes(q) ||
        (p.client || '').toLowerCase().includes(q) ||
        (p.city || '').toLowerCase().includes(q) ||
        (p.slug || '').toLowerCase().includes(q) ||
        (p.type || '').toLowerCase().includes(q)
      );
    }

    // Status
    if (filterStatus !== 'all') {
      result = result.filter((p: any) => p.status === filterStatus);
    }

    // Destaque
    if (filterFeatured === 'featured') {
      result = result.filter((p: any) => p.featured && p.priorityHome >= 1 && p.priorityHome <= 4);
    } else if (filterFeatured === 'normal') {
      result = result.filter((p: any) => !p.featured || p.priorityHome < 1 || p.priorityHome > 4);
    }

    // Ano
    if (filterYear === 'sem-data') {
      result = result.filter((p: any) => !p.year || p.year === 0);
    } else if (filterYear !== 'all') {
      result = result.filter((p: any) => String(p.year) === filterYear);
    }

    // Ordenar
    result.sort((a: any, b: any) => {
      switch (sortBy) {
        case 'year-desc':
          return ((b.yearEnd ?? b.year) || 0) - ((a.yearEnd ?? a.year) || 0);
        case 'year-asc':
          return ((a.yearEnd ?? a.year) || 0) - ((b.yearEnd ?? b.year) || 0);
        case 'title':
          return (a.title || '').localeCompare(b.title || '', 'pt');
        case 'priority':
          return (a.priorityHome || 0) - (b.priorityHome || 0);
        case 'recent':
        default:
          return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      }
    });

    return result;
  }, [projects, search, filterStatus, filterFeatured, filterYear, sortBy]);

  // Separar home e demais
  const homeProjects = filtered.filter((p: any) => p.featured && p.priorityHome >= 1 && p.priorityHome <= 4).sort((a: any, b: any) => (a.priorityHome || 0) - (b.priorityHome || 0));
  const otherProjects = filtered.filter((p: any) => !p.featured || p.priorityHome < 1 || p.priorityHome > 4);

  return (
    <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, gap: 16, flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 200 }}>
          <h1 style={{ margin: 0, fontSize: 32, marginBottom: 8, fontWeight: 700, letterSpacing: '-0.5px' }}>
            Projetos
          </h1>
          <p style={{ margin: 0, color: '#c0bccf', fontSize: 16 }}>
            {counts.total} projetos · {counts.published} publicados · {counts.featured} em destaque
            {counts.noYear > 0 && <span style={{ color: '#fbbf24' }}> · {counts.noYear} sem data</span>}
          </p>
        </div>
        <NewProjectButton />
      </header>

      {/* ═══ BARRA DE FILTROS ═══ */}
      <div style={{
        marginBottom: 20,
        padding: '16px 20px',
        borderRadius: 12,
        border: '1px solid rgba(255,255,255,0.08)',
        background: 'rgba(255,255,255,0.02)',
      }}>
        {/* Busca */}
        <div style={{ marginBottom: 12 }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Buscar por título, cliente, cidade, slug..."
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.04)',
              color: '#fff',
              fontSize: 14,
            }}
          />
        </div>

        {/* Filtros em linha */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600, marginRight: 4 }}>Status:</span>
          <button type="button" onClick={() => setFilterStatus('all')} style={filterBtnStyle(filterStatus === 'all')}>Todos ({counts.total})</button>
          <button type="button" onClick={() => setFilterStatus('PUBLISHED')} style={filterBtnStyle(filterStatus === 'PUBLISHED')}>Publicados ({counts.published})</button>
          <button type="button" onClick={() => setFilterStatus('DRAFT')} style={filterBtnStyle(filterStatus === 'DRAFT')}>Rascunhos ({counts.draft})</button>
          <button type="button" onClick={() => setFilterStatus('ARCHIVED')} style={filterBtnStyle(filterStatus === 'ARCHIVED')}>Arquivados ({counts.archived})</button>

          <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600, marginLeft: 12, marginRight: 4 }}>Destaque:</span>
          <button type="button" onClick={() => setFilterFeatured('all')} style={filterBtnStyle(filterFeatured === 'all')}>Todos</button>
          <button type="button" onClick={() => setFilterFeatured('featured')} style={filterBtnStyle(filterFeatured === 'featured')}>⭐ Destaque ({counts.featured})</button>
          <button type="button" onClick={() => setFilterFeatured('normal')} style={filterBtnStyle(filterFeatured === 'normal')}>Normais</button>
        </div>

        {/* Filtro por ano + ordenação */}
        <div style={{ display: 'flex', gap: 12, marginTop: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600 }}>Ano:</span>
          <select
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
            style={{
              padding: '6px 10px',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.04)',
              color: '#fff',
              fontSize: 12,
            }}
          >
            <option value="all">Todos os anos</option>
            <option value="sem-data" style={{ color: '#fbbf24' }}>⚠️ Sem data ({counts.noYear})</option>
            {availableYears.map(y => (
              <option key={y} value={String(y)}>{y}</option>
            ))}
          </select>

          <span style={{ fontSize: 12, color: '#64748b', fontWeight: 600, marginLeft: 12 }}>Ordenar:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            style={{
              padding: '6px 10px',
              borderRadius: 8,
              border: '1px solid rgba(255,255,255,0.12)',
              background: 'rgba(255,255,255,0.04)',
              color: '#fff',
              fontSize: 12,
            }}
          >
            <option value="recent">Mais recentes (criação)</option>
            <option value="year-desc">Ano: mais novo primeiro</option>
            <option value="year-asc">Ano: mais antigo primeiro</option>
            <option value="title">Título A-Z</option>
            <option value="priority">Prioridade Home</option>
          </select>

          {/* Indicador de resultados */}
          <span style={{ fontSize: 12, color: '#64748b', marginLeft: 'auto' }}>
            Mostrando <strong style={{ color: '#e2e8f0' }}>{filtered.length}</strong> de {counts.total}
          </span>
        </div>
      </div>

      {/* Referência visual */}
      <div style={{
        marginBottom: 24,
        padding: '12px 16px',
        borderRadius: 10,
        border: '1px solid rgba(56, 189, 248, 0.2)',
        background: 'rgba(56, 189, 248, 0.03)',
        fontSize: 12,
        color: '#64748b',
        display: 'flex',
        gap: 16,
        flexWrap: 'wrap',
      }}>
        <span>🏠 <strong style={{ color: '#7dd3fc' }}>Home</strong> = ⭐ destaque + prioridade &gt; 0</span>
        <span>📁 <strong style={{ color: '#7dd3fc' }}>/work</strong> = todos publicados</span>
        <span>❌ <strong style={{ color: '#fca5a5' }}>Remover da Home</strong> = desmarcar ⭐ ou prioridade = 0</span>
      </div>

      {error && (
        <div style={{ padding: '12px 14px', borderRadius: 10, border: '1px solid rgba(201,35,55,0.35)', background: 'rgba(201,35,55,0.12)', color: '#fca5a5', marginBottom: 16 }}>
          {error}
        </div>
      )}

      {filtered.length === 0 && !error && (
        <div style={{ padding: 40, textAlign: 'center', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.03)', color: '#9f9bb0' }}>
          <p style={{ margin: 0, fontSize: 16 }}>
            {projects.length === 0 ? 'Nenhum projeto ainda.' : 'Nenhum projeto encontrado com esses filtros.'}
          </p>
          {projects.length === 0 && (
            <Link href="/admin/projects/new" style={{ display: 'inline-block', marginTop: 12, padding: '10px 16px', borderRadius: 10, background: '#c92337', color: '#fff', textDecoration: 'none', fontWeight: 600 }}>
              Criar primeiro projeto
            </Link>
          )}
        </div>
      )}

      {/* ═══ PROJETOS NA HOME ═══ */}
      {filterFeatured !== 'normal' && homeProjects.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#fff' }}>
              🏠 Projetos na Home
            </h2>
            <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 999, background: 'rgba(201,35,55,0.15)', color: '#fca5a5', border: '1px solid rgba(201,35,55,0.3)', fontWeight: 600 }}>
              {homeProjects.length} projeto{homeProjects.length > 1 ? 's' : ''}
            </span>
            <span style={{ fontSize: 12, color: '#6b6780' }}>
              — Ordenados por prioridade (maior primeiro)
            </span>
          </div>
          <div style={{ display: 'grid', gap: 12, width: '100%' }}>
            {homeProjects.map((project: any) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}

      {/* ═══ DEMAIS PROJETOS ═══ */}
      {otherProjects.length > 0 && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#fff' }}>
              📁 {filterFeatured === 'featured' ? 'Nenhum outro projeto em destaque' : 'Demais projetos'}
            </h2>
            <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.08)', color: '#9f9bb0', border: '1px solid rgba(255,255,255,0.12)', fontWeight: 600 }}>
              {otherProjects.length} projeto{otherProjects.length > 1 ? 's' : ''}
            </span>
          </div>
          <div style={{ display: 'grid', gap: 12, width: '100%' }}>
            {otherProjects.map((project: any) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
