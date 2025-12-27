'use client';

/**
 * Página de Gerenciamento de Páginas
 * 
 * WORKAROUND: Esta rota específica (/admin/pages) tem um bug no Next.js/Vercel
 * que causa erro 1798066378 quando usa Server Component.
 * Solução: Tornar tudo Client Component para evitar o problema.
 */

import PagesPageClient from './page-client';

export default function PagesPage() {
  return <PagesPageClient />;
}
