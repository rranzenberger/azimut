import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAuthToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';
import { SettingsForm } from './components/SettingsForm';
import { UsersManagement } from './components/UsersManagement';

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

    // Se não existir, tentar criar com valores padrão
    if (!settings) {
      try {
        settings = await prisma.settings.create({
          data: {
            id: 'singleton',
            siteName: 'Azimut',
            siteUrl: 'https://azmt.com.br',
            defaultLanguage: 'pt',
            defaultCountry: 'BR',
            timezone: 'America/Sao_Paulo',
            notificationEmail: process.env.NOTIFICATION_EMAIL || null,
          },
        });
      } catch (createError: any) {
        // Se falhar ao criar (tabela não existe), usar valores padrão genéricos
        console.warn('⚠️ Tabela Settings não existe. Usando valores padrão.', createError.message);
        settings = {
          id: 'singleton',
          siteName: 'Azimut',
          siteUrl: 'https://azmt.com.br',
          contactEmail: null,
          contactPhone: null,
          defaultMetaDescription: null,
          defaultKeywords: null,
          ogImageUrl: null,
          facebookUrl: null,
          instagramUrl: null,
          linkedinUrl: null,
          twitterUrl: null,
          youtubeUrl: null,
          kabbamApiKey: null,
          kabbamApiUrl: null,
          smtpHost: null,
          smtpPort: null,
          smtpUser: null,
          smtpPassword: null,
          smtpFromEmail: null,
          deepseekApiKey: null,
          notificationEmail: process.env.NOTIFICATION_EMAIL || null,
          defaultLanguage: 'pt',
          defaultCountry: 'BR',
          timezone: 'America/Sao_Paulo',
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }
    }
  } catch (err: any) {
    console.warn('⚠️ Erro ao buscar Settings. Usando valores padrão.', err.message);
    // Usar valores padrão genéricos em vez de mostrar erro
    settings = {
      id: 'singleton',
      siteName: 'Azimut',
      siteUrl: 'https://azmt.com.br',
      contactEmail: null,
      contactPhone: null,
      defaultMetaDescription: null,
      defaultKeywords: null,
      ogImageUrl: null,
      facebookUrl: null,
      instagramUrl: null,
      linkedinUrl: null,
      twitterUrl: null,
      youtubeUrl: null,
      kabbamApiKey: null,
      kabbamApiUrl: null,
      smtpHost: null,
      smtpPort: null,
      smtpUser: null,
      smtpPassword: null,
      smtpFromEmail: null,
      deepseekApiKey: null,
      notificationEmail: process.env.NOTIFICATION_EMAIL || null,
      defaultLanguage: 'pt',
      defaultCountry: 'BR',
      timezone: 'America/Sao_Paulo',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    // Não definir error - deixar settings com valores padrão funcionar
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
            border: '1px solid rgba(251,191,36,0.35)',
            background: 'rgba(251,191,36,0.12)',
            color: '#fde047',
            marginBottom: 16,
          }}
        >
          ⚠️ {error}
        </div>
      )}

      {!settings && !error && (
        <div
          style={{
            padding: '12px 14px',
            borderRadius: 10,
            border: '1px solid rgba(251,191,36,0.35)',
            background: 'rgba(251,191,36,0.12)',
            color: '#fde047',
            marginBottom: 16,
          }}
        >
          ⚠️ Usando valores padrão. A tabela Settings será criada automaticamente quando você salvar.
        </div>
      )}

      {settings && (
        <>
          <SettingsForm settings={settings} />
          <UsersManagement />
        </>
      )}
    </div>
  );
}

