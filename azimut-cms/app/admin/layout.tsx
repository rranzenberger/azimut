import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAuthToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';
import { AdminLayoutClient } from './components/AdminLayoutClient';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Obter cookies de forma segura
  const cookieStore = await cookies();
  const token = cookieStore.get('azimut_admin_token')?.value;
  
  // Verificar autenticação
  const session = token ? verifyAuthToken(token) : null;

  if (!session) {
    redirect('/login');
  }

  // Buscar dados do usuário
  let user = null;
  try {
    user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { id: true, email: true, name: true, role: true },
    });
  } catch (error) {
    console.error('[AdminLayout] Error fetching user:', error);
  }

  // Passar dados para o Client Component
  const userData = {
    email: user?.email || session.email,
    role: user?.role || session.role,
  };

  return <AdminLayoutClient userData={userData}>{children}</AdminLayoutClient>;
}


