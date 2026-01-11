/**
 * 📧 API: NOTIFICAÇÃO DE FORMULÁRIOS
 * 
 * Envia email quando QUALQUER formulário é preenchido
 * Com subject inteligente e tags múltiplas
 */

import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email-service'

export const runtime = 'nodejs'

// Emails de destino baseados no tipo
const getEmailDestination = (formType: string): string => {
  const academy = process.env.ACADEMY_NOTIFICATION_EMAIL || 'academy@azimutimmersive.com'
  const contact = process.env.FORM_NOTIFICATION_EMAIL || 'contact@azimutimmersive.com'
  const leads = process.env.ADMIN_NOTIFICATION_EMAIL || 'leads@azimutimmersive.com'

  // Formulários de educação → academy@
  if (formType.includes('vancouver') || formType.includes('academy') || formType.includes('course')) {
    return academy
  }

  // Hot leads → leads@
  if (formType.includes('hot')) {
    return leads
  }

  // Resto → contact@
  return contact
}

// Gerar subject inteligente com tags
function generateSubject(data: any): string {
  const tags: string[] = []

  // 1. TEMPERATURA
  const score = data.score || data.engagementScore || 0
  if (score >= 70) tags.push('[HOT]')
  else if (score >= 40) tags.push('[WARM]')
  else tags.push('[COLD]')

  // 2. TIPO DE LEAD
  if (data.formType?.includes('vancouver') || data.formType?.includes('academy')) {
    tags.push('[STUDENT]')
  } else if (data.budget && parseInt(data.budget) > 50000) {
    tags.push('[HIGH_VALUE]')
  }

  // 3. INTERESSE (baseado em campos do formulário)
  if (data.interest?.includes('VR') || data.project?.includes('VR')) tags.push('[VR]')
  if (data.interest?.includes('360')) tags.push('[360]')
  if (data.interest?.includes('VFX') || data.project?.includes('VFX')) tags.push('[VFX]')
  if (data.interest?.includes('Cinema')) tags.push('[CINEMA]')
  if (data.interest?.includes('Motion')) tags.push('[MOTION]')
  if (data.interest?.includes('Museum') || data.project?.includes('Museum')) tags.push('[MUSEUM]')
  if (data.interest?.includes('Brand')) tags.push('[BRAND]')
  if (data.interest?.includes('Vancouver') || data.formType?.includes('vancouver')) tags.push('[VANCOUVER]')
  
  // 4. ORIGEM DO FORMULÁRIO
  let formName = 'Form'
  if (data.formType?.includes('contact')) formName = 'Contact_Form'
  else if (data.formType?.includes('vancouver')) formName = 'Vancouver_Form'
  else if (data.formType?.includes('academy')) formName = 'Academy_Form'
  else if (data.formType?.includes('budget')) formName = 'Budget_Wizard'
  else if (data.formType?.includes('quick')) formName = 'Quick_Form'

  // 5. MONTAR SUBJECT
  const name = data.name || data.firstName || 'Unknown'
  const tagsStr = tags.join(' ')
  
  return `${tagsStr} ${formName} - ${name}`
}

// Gerar corpo do email
function generateEmailBody(data: any): string {
  const sections: string[] = []

  sections.push(`<h2 style="color: #c92337;">📋 Novo Formulário Recebido</h2>`)
  
  // Informações básicas
  sections.push(`<div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">`)
  sections.push(`<p><strong>Nome:</strong> ${data.name || data.firstName || 'N/A'}</p>`)
  sections.push(`<p><strong>Email:</strong> ${data.email || 'N/A'}</p>`)
  sections.push(`<p><strong>Telefone:</strong> ${data.phone || data.whatsapp || 'N/A'}</p>`)
  if (data.company) sections.push(`<p><strong>Empresa:</strong> ${data.company}</p>`)
  sections.push(`</div>`)

  // Detalhes do projeto/interesse
  sections.push(`<div style="margin: 20px 0;">`)
  sections.push(`<h3>Detalhes:</h3>`)
  if (data.project) sections.push(`<p><strong>Projeto:</strong> ${data.project}</p>`)
  if (data.interest) sections.push(`<p><strong>Interesse:</strong> ${data.interest}</p>`)
  if (data.budget) sections.push(`<p><strong>Orçamento:</strong> ${data.budget}</p>`)
  if (data.timeline) sections.push(`<p><strong>Cronograma:</strong> ${data.timeline}</p>`)
  if (data.message) sections.push(`<p><strong>Mensagem:</strong><br/>${data.message}</p>`)
  sections.push(`</div>`)

  // Metadados
  sections.push(`<div style="background: #f9f9f9; padding: 15px; border-left: 4px solid #c92337; margin: 20px 0;">`)
  sections.push(`<p style="font-size: 12px; color: #666;">`)
  sections.push(`<strong>Formulário:</strong> ${data.formType || 'Unknown'}<br/>`)
  sections.push(`<strong>Score:</strong> ${data.score || data.engagementScore || 'N/A'}/100<br/>`)
  sections.push(`<strong>Data:</strong> ${new Date().toLocaleString('pt-BR')}<br/>`)
  if (data.lang) sections.push(`<strong>Idioma:</strong> ${data.lang.toUpperCase()}<br/>`)
  sections.push(`</p>`)
  sections.push(`</div>`)

  // Link para backoffice
  sections.push(`<div style="margin: 30px 0; text-align: center;">`)
  sections.push(`<a href="https://backoffice.azmt.com.br/admin/leads" style="background: #c92337; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">`)
  sections.push(`Ver Lead no Backoffice →`)
  sections.push(`</a>`)
  sections.push(`</div>`)

  return sections.join('\n')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Determinar email de destino
    const toEmail = getEmailDestination(body.formType || 'contact')
    
    // Gerar subject inteligente
    const subject = generateSubject(body)
    
    // Gerar corpo do email
    const htmlBody = generateEmailBody(body)
    
    // Enviar email
    await sendEmail({
      to: toEmail,
      subject: subject,
      html: htmlBody,
      from: 'noreply@azmt.com.br'
    })

    return NextResponse.json({ 
      success: true,
      message: 'Email sent',
      to: toEmail,
      subject: subject
    })
  } catch (error) {
    console.error('Error sending form notification:', error)
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to send email' 
    }, { status: 500 })
  }
}
