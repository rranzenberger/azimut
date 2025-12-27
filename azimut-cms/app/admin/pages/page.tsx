'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Redirect de /admin/pages para /admin/site-pages
 * Rota /admin/pages tem bug no Next.js/Vercel (erro 1798066378)
 * Solução: Redirect para rota funcional
 */
export default function PagesPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/site-pages');
  }, [router]);

  return (
    <div style={{ padding: 40, textAlign: 'center', color: '#c0bccf' }}>
      Redirecionando...
    </div>
  );
}
