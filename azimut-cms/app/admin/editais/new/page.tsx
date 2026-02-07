import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAuthToken } from '@/src/lib/auth';
import Link from 'next/link';
import { EditalEditForm } from '../components/EditalEditForm';

export const revalidate = 0;

export default async function NewEditalPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('azimut_admin_token')?.value;
  const session = token ? verifyAuthToken(token) : null;

  if (!session) {
    redirect('/login');
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
        Novo edital
      </h1>
      <p style={{ margin: 0, color: '#94a3b8', fontSize: 14 }}>
        Preencha os dados. Use status <strong>Aberto</strong> para exibir na seção Oportunidades Ativas do site.
      </p>
      <div style={{ marginTop: 24 }}>
        <EditalEditForm />
      </div>
    </div>
  );
}
