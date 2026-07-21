/**
 * GigRadar Form Handler
 * - Integra cadastro com backoffice
 * - Dispara download automático
 * - Cria grupo WhatsApp via n8n
 */

import { GigRadarBackofficeService } from './gigradarBackoffice'
import { ApiService } from './api'

interface FormSubmitData {
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

export const GigRadarFormHandler = {
  /**
   * Processa submissão do formulário:
   * 1. Registra no Azimut (CRM)
   * 2. Registra no Backoffice GigRadar
   * 3. Dispara workflow n8n (WhatsApp + APK)
   * 4. Retorna código + link download
   */
  async handleFormSubmit(data: FormSubmitData): Promise<{
    success: boolean
    code?: string
    downloadUrl?: string
    whatsappLink?: string
    message: string
  }> {
    try {
      // 1️⃣ Salva no CRM Azimut (lead tracking)
      await ApiService.submitLead({
        name: data.name,
        email: data.email,
        phone: data.whatsapp,
        leadType: 'gigradar-beta',
        source: 'gigradar-form',
        lang: data.lang,
        interest: data.app,
        message: `GigRadar Beta Registration\nCity: ${data.city}\nPhone: ${data.phone || '—'}\nAccepted Terms: ${data.acceptedTerms}\nFeedback Commitment: ${data.acceptedFeedback}`,
      })

      // 2️⃣ Registra no Backoffice GigRadar (recebe código + links)
      const backofficeResponse = await GigRadarBackofficeService.submitBetaRegistration(data)

      // 3️⃣ Dispara workflow n8n (cria grupo + envia APK)
      await GigRadarBackofficeService.triggerBackofficeWorkflow({
        ...data,
        code: backofficeResponse.code,
      })

      return {
        success: true,
        code: backofficeResponse.code,
        downloadUrl: backofficeResponse.apkUrl,
        whatsappLink: backofficeResponse.whatsappLink,
        message: 'Cadastro realizado! Verifique seu WhatsApp para o código e grupo de testadores.',
      }
    } catch (error) {
      console.error('Form submission failed:', error)
      return {
        success: false,
        message: 'Erro ao processar cadastro. Tente novamente ou contate suporte.',
      }
    }
  },

  /**
   * Inicia download automático do APK
   */
  triggerDownload(downloadUrl: string, filename: string = 'gigradar-latest.apk'): void {
    const link = document.createElement('a')
    link.href = downloadUrl
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  },

  /**
   * Abre WhatsApp com mensagem pré-formatada
   */
  openWhatsApp(whatsappLink: string): void {
    window.open(whatsappLink, '_blank')
  },
}
