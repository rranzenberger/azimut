import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyAuthToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';
import Link from 'next/link';
import { HoverCard, HoverButton } from '../components/HoverCard';

export const revalidate = 0;

export default async function TeamPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('azimut_admin_token')?.value;
  const session = token ? verifyAuthToken(token) : null;

  if (!session) {
    redirect('/login');
  }

  let members: any[] = [];
  let error: string | null = null;

  try {
    members = await prisma.teamMembers.findMany({
      orderBy: [
        { displayOrder: 'asc' },
        { name: 'asc' },
      ],
    });
  } catch (err: any) {
    console.error('Team fetch error:', err);
    error = 'Erro ao carregar membros. Verifique a conexão com o banco.';
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
            Equipe
          </h1>
          <p style={{ margin: 0, color: '#c0bccf', fontSize: 16 }}>
            Gerencie os membros da equipe exibidos na página Studio.
          </p>
        </div>
        <HoverButton href="/admin/team/new">
          + Novo Membro
        </HoverButton>
      </header>

      {error && (
        <div
          style={{
            padding: 16,
            backgroundColor: '#fee2e2',
            color: '#991b1b',
            borderRadius: 8,
            marginBottom: 24,
          }}
        >
          {error}
        </div>
      )}

      {members.length === 0 ? (
        <div
          style={{
            padding: 48,
            textAlign: 'center',
            backgroundColor: 'rgba(0,0,0,0.2)',
            borderRadius: 12,
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <p style={{ margin: 0, color: '#c0bccf', fontSize: 16 }}>
            Nenhum membro cadastrado ainda.
          </p>
          <div style={{ marginTop: 16 }}>
            <HoverButton href="/admin/team/new">
              Criar primeiro membro
            </HoverButton>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 16,
          }}
        >
          {members.map((member) => (
            <HoverCard key={member.id} href={`/admin/team/${member.id}`}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                {member.photoUrl && (
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      objectFit: 'cover',
                    }}
                  />
                )}
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, fontSize: 18, fontWeight: 600, marginBottom: 4 }}>
                    {member.name}
                  </h3>
                  <p style={{ margin: 0, fontSize: 14, color: '#c0bccf' }}>
                    {member.rolePt}
                  </p>
                </div>
              </div>
              {member.bioPt && (
                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    color: '#a0a0a0',
                    lineHeight: 1.5,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {member.bioPt}
                </p>
              )}
              <div
                style={{
                  marginTop: 12,
                  paddingTop: 12,
                  borderTop: '1px solid rgba(255,255,255,0.1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span
                  style={{
                    fontSize: 12,
                    color: member.isPublished ? '#10b981' : '#6b7280',
                    fontWeight: 500,
                  }}
                >
                  {member.isPublished ? 'Publicado' : 'Rascunho'}
                </span>
                <span style={{ fontSize: 12, color: '#6b7280' }}>
                  Ordem: {member.displayOrder}
                </span>
              </div>
            </HoverCard>
          ))}
        </div>
      )}
    </div>
  );
}
