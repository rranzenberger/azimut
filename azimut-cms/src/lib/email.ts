/**
 * Email utility - Envio de emails usando SMTP do Settings
 */

import nodemailer from 'nodemailer';
import { getSettings } from './settings';

export interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

/**
 * Envia email usando configurações SMTP do Settings
 */
export async function sendEmail(options: EmailOptions): Promise<void> {
  const settings = await getSettings();

  // Verificar se SMTP está configurado
  if (!settings?.smtpHost || !settings.smtpPort || !settings.smtpUser || !settings.smtpPassword) {
    console.warn('⚠️ SMTP não configurado. Email não será enviado:', {
      to: options.to,
      subject: options.subject,
    });
    return;
  }

  try {
    // Criar transporter
    const port = parseInt(settings.smtpPort.toString());
    const transporter = nodemailer.createTransport({
      host: settings.smtpHost,
      port: port,
      secure: port === 465, // true apenas para 465 (SSL), false para 587 (TLS) e outras
      auth: {
        user: settings.smtpUser,
        pass: settings.smtpPassword,
      },
      // Configuração adicional para TLS na porta 587
      tls: {
        rejectUnauthorized: false, // Aceita certificados auto-assinados
      },
    });

    // Verificar conexão SMTP
    await transporter.verify();

    // Enviar email
    await transporter.sendMail({
      from: settings.smtpFromEmail || settings.smtpUser,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text || options.html.replace(/<[^>]*>/g, ''), // Texto simples removendo HTML
    });

    console.log('✅ Email enviado com sucesso:', {
      to: options.to,
      subject: options.subject,
    });

  } catch (error: any) {
    console.error('❌ Erro ao enviar email:', {
      error: error.message,
      to: options.to,
      subject: options.subject,
    });
    
    // Não lançar erro para não quebrar o fluxo, apenas logar
    // O lead já foi salvo no banco, então não queremos que falhe por causa do email
  }
}

