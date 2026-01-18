import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/src/lib/prisma'

// GET - Cancelar inscrição via link no email
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')
    const token = searchParams.get('token')

    if (!email) {
      return new NextResponse(
        `<!DOCTYPE html>
        <html lang="pt">
        <head><meta charset="UTF-8"><title>Erro</title></head>
        <body style="font-family: Arial; text-align: center; padding: 50px;">
          <h1>❌ Email não informado</h1>
          <p>Link inválido.</p>
        </body>
        </html>`,
        { headers: { 'Content-Type': 'text/html' } }
      )
    }

    // Normalizar email
    const normalizedEmail = email.toLowerCase().trim()

    // Buscar subscriber
    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email: normalizedEmail }
    })

    if (!subscriber) {
      return new NextResponse(
        `<!DOCTYPE html>
        <html lang="pt">
        <head><meta charset="UTF-8"><title>Não encontrado</title></head>
        <body style="font-family: Arial; text-align: center; padding: 50px;">
          <h1>📧 Email não encontrado</h1>
          <p>Este email não está na nossa lista de newsletter.</p>
        </body>
        </html>`,
        { headers: { 'Content-Type': 'text/html' } }
      )
    }

    if (subscriber.status === 'UNSUBSCRIBED') {
      return new NextResponse(
        `<!DOCTYPE html>
        <html lang="pt">
        <head><meta charset="UTF-8"><title>Já cancelado</title></head>
        <body style="font-family: Arial; text-align: center; padding: 50px;">
          <h1>✅ Já cancelado</h1>
          <p>Sua inscrição já foi cancelada anteriormente.</p>
        </body>
        </html>`,
        { headers: { 'Content-Type': 'text/html' } }
      )
    }

    // Cancelar inscrição
    await prisma.newsletterSubscriber.update({
      where: { id: subscriber.id },
      data: {
        status: 'UNSUBSCRIBED',
        unsubscribedAt: new Date()
      }
    })

    return new NextResponse(
      `<!DOCTYPE html>
      <html lang="pt">
      <head>
        <meta charset="UTF-8">
        <title>Inscrição Cancelada</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #f5f5f5; }
          .container { max-width: 500px; margin: 0 auto; background: white; padding: 40px; border-radius: 10px; }
          h1 { color: #c92337; }
          p { color: #666; }
          .btn { display: inline-block; margin-top: 20px; padding: 12px 24px; background: #c92337; color: white; text-decoration: none; border-radius: 5px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>✅ Inscrição Cancelada</h1>
          <p>Você foi removido da nossa lista de newsletter.</p>
          <p>Sentiremos sua falta! 😢</p>
          <a href="https://azmt.com.br" class="btn">Visitar Site</a>
        </div>
      </body>
      </html>`,
      { headers: { 'Content-Type': 'text/html' } }
    )

  } catch (error) {
    console.error('[Unsubscribe] Error:', error)
    return new NextResponse(
      `<!DOCTYPE html>
      <html lang="pt">
      <head><meta charset="UTF-8"><title>Erro</title></head>
      <body style="font-family: Arial; text-align: center; padding: 50px;">
        <h1>❌ Erro</h1>
        <p>Ocorreu um erro ao processar sua solicitação.</p>
        <p>Por favor, tente novamente ou entre em contato conosco.</p>
      </body>
      </html>`,
      { status: 500, headers: { 'Content-Type': 'text/html' } }
    )
  }
}

// POST - Cancelar inscrição via API
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { success: false, error: 'Email não informado' },
        { status: 400 }
      )
    }

    const normalizedEmail = email.toLowerCase().trim()

    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email: normalizedEmail }
    })

    if (!subscriber) {
      return NextResponse.json(
        { success: false, error: 'Email não encontrado' },
        { status: 404 }
      )
    }

    await prisma.newsletterSubscriber.update({
      where: { id: subscriber.id },
      data: {
        status: 'UNSUBSCRIBED',
        unsubscribedAt: new Date()
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Inscrição cancelada com sucesso'
    })

  } catch (error) {
    console.error('[Unsubscribe] Error:', error)
    return NextResponse.json(
      { success: false, error: 'Erro ao processar' },
      { status: 500 }
    )
  }
}
