import { cookies } from 'next/headers';
import { redirect, notFound } from 'next/navigation';
import { verifyAuthToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';
import Link from 'next/link';
import { EditalEditForm } from '../components/EditalEditForm';

export const revalidate = 0;

export default async function EditalEditPage({ params }: { params: { id: string } }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('azimut_admin_token')?.value;
  const session = token ? verifyAuthToken(token) : null;

  if (!session) {
    redirect('/login');
  }

  const edital = await prisma.edital.findUnique({
    where: { id: params.id },
  });

  if (!edital) {
    notFound();
  }

  return (
    <div style={{ width: '100%', maxWidth: 900, boxSizing: 'border-box' }}>
      <div style={{ marginBottom: 24 }}>
        <Link
          href="/admin/editais"
          style={{ color: '#7dd3fc', textDecoration: 'none', fontSize: 14 }}
        >
          ← Voltar para Editais
        </Link>
      </div>
      <h1 style={{ margin: '0 0 8px', fontSize: 24, fontWeight: 700 }}>
        Editar edital
      </h1>
      <p style={{ margin: 0, color: '#94a3b8', fontSize: 14 }}>
        Altere o status para <strong>Aberto</strong> para exibir no site, ou <strong>Fechado</strong> para ocultar.
      </p>
      <div style={{ marginTop: 24 }}>
        <EditalEditForm edital={edital} />
      </div>
    </div>
  );
}
