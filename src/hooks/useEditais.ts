/**
 * Editais (Oportunidades Ativas) vindos do backoffice.
 * GET /api/public/editais — retorna apenas status ABERTO por padrão.
 * Fallback para dados estáticos se a API falhar.
 */

import { useState, useEffect } from 'react';
import type { Opportunity } from '../data/opportunities';
import { opportunities as fallbackOpportunities } from '../data/opportunities';

const BACKOFFICE_URL =
  import.meta.env.VITE_BACKOFFICE_URL || 'https://backoffice.azmt.com.br';
const EDITAIS_URL = `${BACKOFFICE_URL}/api/public/editais`;

export interface UseEditaisOptions {
  /** status: open (só abertos), upcoming, all */
  status?: 'open' | 'upcoming' | 'all';
  /** BR, CA, ALL, etc. */
  country?: string;
  /** Limite de itens (máx 100) */
  limit?: number;
}

export function useEditais(options: UseEditaisOptions = {}) {
  const { status = 'all', country = 'ALL', limit = 50 } = options;
  const [opportunities, setOpportunities] = useState<Opportunity[]>(fallbackOpportunities);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fromApi, setFromApi] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    if (status) params.set('status', status);
    if (country && country !== 'ALL') params.set('country', country);
    params.set('limit', String(Math.min(limit, 100)));

    fetch(`${EDITAIS_URL}?${params.toString()}`, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const list = Array.isArray(data?.opportunities) ? data.opportunities : [];
        if (list.length > 0) {
          setOpportunities(list as Opportunity[]);
          setFromApi(true);
        } else {
          setOpportunities(fallbackOpportunities);
          setFromApi(false);
        }
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err?.message || 'Erro ao carregar editais');
        setOpportunities(fallbackOpportunities);
        setFromApi(false);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [status, country, limit]);

  return { opportunities, loading, error, fromApi };
}
