// ════════════════════════════════════════════════════════════
// LEAD CAPTURE API - Via Claude Assistant
// ════════════════════════════════════════════════════════════

import ApiService from '../../services/api'

export async function POST(request: Request) {
  try {
    const leadData = await request.json()

    // Salvar lead usando o ApiService existente
    const response = await ApiService.createLead({
      name: leadData.name || 'Claude Chat Lead',
      email: leadData.email || '',
      phone: leadData.phone || '',
      interest: leadData.interest || 'General Inquiry',
      message: `Chat via Claude Assistant\n\nTranscript:\n${JSON.stringify(leadData.chatTranscript, null, 2)}`,
      source: leadData.source || 'claude_assistant',
      lang: leadData.lang || 'pt',
      metadata: {
        userProfile: leadData.userProfile,
        page: leadData.page,
        intent: leadData.intent,
        timestamp: new Date().toISOString()
      }
    })

    // TODO: Enviar notificação Slack para leads quentes
    // if (response.score && response.score > 70) {
    //   await sendSlackNotification(...)
    // }

    return new Response(
      JSON.stringify({ success: true, leadId: response.id }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Lead capture error:', error)
    
    return new Response(
      JSON.stringify({ error: 'Failed to capture lead' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }
}
