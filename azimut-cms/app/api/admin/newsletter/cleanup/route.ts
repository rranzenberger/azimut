import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { cookies } from 'next/headers';
import { verifyAuthToken } from '@/src/lib/auth';

export async function DELETE(request: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('azimut_admin_token')?.value;
    const session = token ? verifyAuthToken(token) : null;

    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Deletar emails com as seguintes condições:
    // 1. Status BOUNCED (erro de entrega)
    // 2. Receberam 3 ou mais emails e nunca interagiram (emailCount >= 3 e não estão ACTIVE)
    const result = await prisma.newsletterSubscriber.deleteMany({
      where: {
        OR: [
          // Emails que retornaram (bounce)
          {
            status: 'BOUNCED',
          },
          // Emails inativos: receberam 3+ emails e não estão ativos
          {
            AND: [
              {
                emailCount: {
                  gte: 3,
                },
              },
              {
                status: {
                  not: 'ACTIVE',
                },
              },
            ],
          },
          // Emails SPAM (se houver)
          {
            status: 'SPAM',
          },
        ],
      },
    });

    return NextResponse.json({
      success: true,
      message: `${result.count} emails inválidos/inativos deletados com sucesso!`,
      count: result.count,
    });
  } catch (error: any) {
    console.error('Error cleaning invalid subscribers:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
