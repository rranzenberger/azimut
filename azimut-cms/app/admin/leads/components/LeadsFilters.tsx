'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export function LeadsFilters({
  currentStatus,
  currentPriority,
  currentLeadType,
  currentDateFrom,
  currentDateTo,
  currentSearch,
}: {
  currentStatus?: string;
  currentPriority?: string;
  currentLeadType?: string;
  currentDateFrom?: string;
  currentDateTo?: string;
  currentSearch?: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(currentSearch || '');

  const updateFilters = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    
    // Reset para página 1 quando filtrar
    params.delete('page');
    
    router.push(`/admin/leads?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateFilters({ search: search || null });
  };

  const clearFilters = () => {
    router.push('/admin/leads');
    setSearch('');
  };

  const hasFilters = currentStatus || currentPriority || currentLeadType || currentDateFrom || currentDateTo || currentSearch;

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 12,
        padding: 20,
      }}
    >
      <form onSubmit={handleSearch} style={{ marginBottom: 16 }}>
        <input
          type="text"
          placeholder="Buscar por nome, email ou empresa..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(0,0,0,0.2)',
            color: '#fff',
            fontSize: 14,
            outline: 'none',
          }}
        />
      </form>

      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <select
          value={currentStatus || ''}
          onChange={(e) => updateFilters({ status: e.target.value || null })}
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(0,0,0,0.2)',
            color: '#fff',
            fontSize: 14,
            outline: 'none',
            cursor: 'pointer',
          }}
        >
          <option value="">Todos os status</option>
          <option value="NEW">Novo</option>
          <option value="IN_PROGRESS">Em Progresso</option>
          <option value="WON">Ganho</option>
          <option value="LOST">Perdido</option>
        </select>

        <select
          value={currentPriority || ''}
          onChange={(e) => updateFilters({ priority: e.target.value || null })}
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(0,0,0,0.2)',
            color: '#fff',
            fontSize: 14,
            outline: 'none',
            cursor: 'pointer',
          }}
        >
          <option value="">Todas as prioridades</option>
          <option value="LOW">Baixa</option>
          <option value="MEDIUM">Média</option>
          <option value="HIGH">Alta</option>
          <option value="URGENT">Urgente</option>
        </select>

        <select
          value={currentLeadType || ''}
          onChange={(e) => updateFilters({ leadType: e.target.value || null })}
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(0,0,0,0.2)',
            color: '#fff',
            fontSize: 14,
            outline: 'none',
            cursor: 'pointer',
          }}
        >
          <option value="">Todos os tipos</option>
          <option value="CONTACT_FORM">Formulário de Contato</option>
          <option value="BUDGET_INQUIRY">Solicitação de Orçamento</option>
        </select>

        <input
          type="date"
          value={currentDateFrom || ''}
          onChange={(e) => updateFilters({ dateFrom: e.target.value || null })}
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(0,0,0,0.2)',
            color: '#fff',
            fontSize: 14,
            outline: 'none',
          }}
          placeholder="Data inicial"
        />

        <input
          type="date"
          value={currentDateTo || ''}
          onChange={(e) => updateFilters({ dateTo: e.target.value || null })}
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            border: '1px solid rgba(255,255,255,0.1)',
            background: 'rgba(0,0,0,0.2)',
            color: '#fff',
            fontSize: 14,
            outline: 'none',
          }}
          placeholder="Data final"
        />

        {hasFilters && (
          <button
            type="button"
            onClick={clearFilters}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: '1px solid rgba(201,35,55,0.3)',
              background: 'rgba(201,35,55,0.1)',
              color: '#fca5a5',
              fontSize: 14,
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            Limpar Filtros
          </button>
        )}
      </div>
    </div>
  );
}

