/**
 * API de Recuperação de Senha
 * Gera uma nova senha temporária e envia por email ao admin
 */

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { sendEmail } from '@/src/lib/email';
import bcrypt from 'bcryptjs';

export const runtime = 'nodejs';

// Email autorizado a receber redefinição de senha
const RECOVERY_EMAIL = 'ranz@azmt.com.br';

function generateTempPassword(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  let pwd = '';
  for (let i = 0; i < 12; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pwd;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';

    if (!email) {
      return NextResponse.json({ error: 'Email é obrigatório' }, { status: 400 });
    }

    // Verificar se o usuário existe
    const user = await prisma.user.findUnique({ where: { email } });

    // Sempre retornar sucesso (não revelar se o email existe ou não)
    if (!user) {
      return NextResponse.json({
        success: true,
        message: 'Se o email estiver cadastrado, as novas credenciais serão enviadas.',
      });
    }

    // Gerar nova senha temporária
    const tempPassword = generateTempPassword();
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // Atualizar senha no banco
    await prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });

    // Enviar email com novas credenciais
    try {
      await sendEmail({
        to: RECOVERY_EMAIL,
        subject: '🔐 Azimut Backoffice - Nova senha de acesso',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #c92337; margin-bottom: 20px;">Azimut Backoffice</h2>
            <p>Foi solicitada uma redefinição de senha para o backoffice.</p>
            <div style="background: #f5f5f5; border-radius: 8px; padding: 16px; margin: 20px 0;">
              <p style="margin: 0 0 8px;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 0;"><strong>Nova senha:</strong> <code style="background: #e0e0e0; padding: 2px 8px; border-radius: 4px; font-size: 16px;">${tempPassword}</code></p>
            </div>
            <p style="color: #666; font-size: 13px;">
              Recomendamos alterar esta senha após o primeiro acesso.<br/>
              Acesse: <a href="https://backoffice.azmt.com.br/login">backoffice.azmt.com.br/login</a>
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="color: #999; font-size: 11px;">
              Se você não solicitou esta redefinição, ignore este email. A senha anterior foi substituída.
            </p>
          </div>
        `,
        text: `Azimut Backoffice - Nova senha\n\nEmail: ${email}\nNova senha: ${tempPassword}\n\nAcesse: https://backoffice.azmt.com.br/login`,
      });
    } catch (emailError) {
      console.error('Erro ao enviar email de recuperação:', emailError);
      // Não falhar - a senha já foi redefinida
    }

    return NextResponse.json({
      success: true,
      message: 'Se o email estiver cadastrado, as novas credenciais serão enviadas.',
    });
  } catch (error: any) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Erro ao processar solicitação' }, { status: 500 });
  }
}
