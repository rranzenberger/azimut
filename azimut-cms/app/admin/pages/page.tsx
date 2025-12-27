/**
 * Página de Gerenciamento de Páginas
 * 
 * WORKAROUND: Usando Client Component porque Server Component está quebrando
 * na rota /admin/pages especificamente (erro 1798066378 na Vercel).
 * A API /api/admin/pages funciona perfeitamente, então usamos fetch do lado cliente.
 */

import PagesPageClient from './page-client';

export default function PagesPage() {
  return <PagesPageClient />;
}
