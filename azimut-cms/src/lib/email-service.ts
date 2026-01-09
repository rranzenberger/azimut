/**
 * Email Service - Envio de emails via Resend
 */

import { EmailTemplate } from './email-templates'

const RESEND_API_KEY = process.env.RESEND_API_KEY
const FROM_EMAIL = process.env.EMAIL_FROM || 'vancouver@azmt.com.br'

export async function sendEmail(to: string, template: EmailTemplate): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.warn('⚠️ RESEND_API_KEY not configured. Email NOT sent.')
    return false
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to,
        subject: template.subject,
        html: template.html,
        text: template.text
      })
    })

    if (!response.ok) {
      const error = await response.text()
      console.error('❌ Resend API error:', error)
      return false
    }

    const result = await response.json()
    console.log(`✅ Email sent to ${to}: ${result.id}`)
    return true
  } catch (error) {
    console.error('❌ Error sending email:', error)
    return false
  }
}

/**
 * Enviar email de confirmação para o lead (D+0)
 */
export async function sendLeadConfirmation(lead: {
  id: string
  email: string
  name: string
  leadType: string
  targetSchool?: string
}): Promise<boolean> {
  const { getEmailSequence } = await import('./email-templates')
  
  const template = getEmailSequence(lead.leadType, 0, lead)
  if (!template) {
    console.warn(`⚠️ No email template for leadType: ${lead.leadType}`)
    return false
  }

  return await sendEmail(lead.email, template)
}

/**
 * Enviar email de follow-up (D+2, D+5, D+7)
 */
export async function sendFollowUpEmail(lead: {
  id: string
  email: string
  name: string
  leadType: string
  createdAt: Date
}, day: number): Promise<boolean> {
  const { getEmailSequence } = await import('./email-templates')
  
  const template = getEmailSequence(lead.leadType, day, lead)
  if (!template) {
    return false
  }

  return await sendEmail(lead.email, template)
}
