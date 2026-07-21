/**
 * GigRadar Backoffice Integration
 * - Recebe dados do cadastro beta
 * - Gera código de liberação instantaneamente
 * - Envia para n8n criar grupo WhatsApp + enviar APK
 */

interface GigRadarBetaSubmission {
  name: string
  email: string
  whatsapp: string
  city: string
  app: string
  phone?: string
  lang: 'pt' | 'en' | 'es' | 'fr'
  acceptedTerms: boolean
  acceptedFeedback: boolean
  acceptedUpdates?: boolean
}

interface CodeGenerationResponse {
  code: string
  deviceId?: string
  validUntil: string
  apkUrl: string
  whatsappLink: string
}

const BACKOFFICE_API = process.env.REACT_APP_BACKOFFICE_API || 'https://api.azimut.com.br/gigradar'
const N8N_WEBHOOK = process.env.REACT_APP_N8N_WEBHOOK || 'https://n8n.azimut.com.br/webhook/gigradar-beta'

export const GigRadarBackofficeService = {
  /**
   * Submete cadastro beta e retorna código + link de download
   */
  async submitBetaRegistration(data: GigRadarBetaSubmission): Promise<CodeGenerationResponse> {
    try {
      const response = await fetch(`${BACKOFFICE_API}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          whatsapp: data.whatsapp.replace(/\D/g, ''),
          city: data.city,
          app: data.app,
          phone: data.phone,
          lang: data.lang,
          terms: {
            betaTerms: data.acceptedTerms,
            feedbackCommitment: data.acceptedFeedback,
            updates: data.acceptedUpdates,
          },
          timestamp: new Date().toISOString(),
        }),
      })

      if (!response.ok) throw new Error('Failed to register beta tester')
      return await response.json()
    } catch (err) {
      console.error('Beta registration failed:', err)
      throw err
    }
  },

  /**
   * Envia dados para n8n criar grupo WhatsApp + enviar APK automaticamente
   */
  async triggerBackofficeWorkflow(data: GigRadarBetaSubmission & { code: string }): Promise<void> {
    try {
      await fetch(N8N_WEBHOOK, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'gigradar-beta-registered',
          user: {
            name: data.name,
            email: data.email,
            whatsapp: data.whatsapp,
            city: data.city,
            app: data.app,
          },
          code: data.code,
          lang: data.lang,
          actions: [
            'send_code_via_whatsapp',
            'add_to_beta_group',
            'send_apk_link',
            'create_backoffice_record',
          ],
        }),
      })
    } catch (err) {
      console.warn('N8N webhook failed (non-blocking):', err)
    }
  },

  /**
   * Gera código de liberação a partir de deviceId + contato
   */
  async generateUnlockCode(deviceId: string, contact: string): Promise<CodeGenerationResponse> {
    try {
      const response = await fetch(`${BACKOFFICE_API}/code/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deviceId,
          contact,
          timestamp: new Date().toISOString(),
        }),
      })

      if (!response.ok) throw new Error('Failed to generate code')
      return await response.json()
    } catch (err) {
      console.error('Code generation failed:', err)
      throw err
    }
  },

  /**
   * Busca status da licença (válida, expirada, bloqueada)
   */
  async checkLicenseStatus(code: string): Promise<{
    valid: boolean
    daysRemaining: number
    status: 'active' | 'expired' | 'blocked'
  }> {
    try {
      const response = await fetch(`${BACKOFFICE_API}/license/status/${code}`)
      if (!response.ok) throw new Error('Failed to check license')
      return await response.json()
    } catch (err) {
      console.error('License check failed:', err)
      return { valid: false, daysRemaining: 0, status: 'expired' }
    }
  },

  /**
   * Submete feedback semanal do tester
   */
  async submitFeedback(code: string, feedback: {
    used: boolean
    worked: boolean
    error?: string
    suggestion?: string
  }): Promise<void> {
    try {
      await fetch(`${BACKOFFICE_API}/feedback/${code}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...feedback,
          timestamp: new Date().toISOString(),
        }),
      })
    } catch (err) {
      console.error('Feedback submission failed:', err)
      throw err
    }
  },

  /**
   * Gera link de download direto + rastreamento
   */
  getDownloadLink(code: string, lang: string = 'pt'): string {
    const params = new URLSearchParams({
      code,
      lang,
      t: Date.now().toString(),
    })
    return `/downloads/gigradar-latest.apk?${params.toString()}`
  },
}
