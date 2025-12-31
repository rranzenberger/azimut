import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAuthToken } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { SettingsForm } from './components/SettingsForm';

export const revalidate = 0;

export default async function SettingsPage() {
  const cookieStore = cookies();
  const token = cookieStore.get('azimut_admin_token')?.value;
  const session = token ? verifyAuthToken(token) : null;

  if (!session) {
    redirect('/login');
  }

  let settings: any = null;
  let error: string | null = null;

  try {
    // Buscar ou criar configurações padrão
    settings = await prisma.settings.findUnique({
      where: { id: 'singleton' },
    });

    // Se não existir, criar com valores padrão
    if (!settings) {
      settings = await prisma.settings.create({
        data: {
          id: 'singleton',
          siteName: 'Azimut',
          siteUrl: 'https://azmt.com.br',
          defaultLanguage: 'pt',
          defaultCountry: 'BR',
          timezone: 'America/Sao_Paulo',
        },
      });
    }
  } catch (err: any) {
    console.error('Settings fetch error:', err);
    error = 'Erro ao carregar configurações. Verifique a conexão com o banco.';
  }

  return (
    <div style={{ width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 24,
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: 1, minWidth: 200 }}>
          <h1 style={{ margin: 0, fontSize: 32, marginBottom: 8, fontWeight: 700, letterSpacing: '-0.5px' }}>
            Configurações
          </h1>
          <p style={{ margin: 0, color: '#c0bccf', fontSize: 16 }}>
            Gerencie as configurações gerais do site e integrações.
          </p>
        </div>
      </header>

      {error && (
        <div
          style={{
            padding: '12px 14px',
            borderRadius: 10,
            border: '1px solid rgba(201,35,55,0.35)',
            background: 'rgba(201,35,55,0.12)',
            color: '#fca5a5',
            marginBottom: 16,
          }}
        >
          {error}
        </div>
      )}

      {settings && <SettingsForm settings={settings} />}
    </div>
  );
}

