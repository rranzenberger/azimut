/**
 * Script para Enviar Relatório Diário de Leads por Email
 * Executa diariamente via cron ou manualmente
 */

// Carregar variáveis de ambiente
try {
  const { config } = require('dotenv')
  const { resolve } = require('path')
  const { existsSync } = require('fs')
  
  const possiblePaths = [
    resolve(__dirname, '../.env.local'),
    resolve(__dirname, '../.env'),
    resolve(process.cwd(), '.env'),
  ]
  
  for (const envPath of possiblePaths) {
    if (existsSync(envPath)) {
      config({ path: envPath })
      break
    }
  }
} catch (e) {
  console.warn('⚠️  Erro ao carregar .env:', e)
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://backoffice.azmt.com.br'
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@azimut.com.br'

async function sendEmailReport() {
  try {
    // Buscar relatório
    const response = await fetch(`${SITE_URL}/api/admin/reports/leads-daily`, {
      headers: {
        'Cookie': `azimut_admin_token=${process.env.ADMIN_TOKEN || ''}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Erro ao buscar relatório: ${response.statusText}`)
    }

    const report = await response.json()

    // Formatar email HTML
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .header { background: #1a1a1a; color: #fff; padding: 20px; text-align: center; }
    .content { padding: 20px; }
    .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin: 20px 0; }
    .stat-card { background: #f5f5f5; padding: 15px; border-radius: 8px; text-align: center; }
    .stat-value { font-size: 32px; font-weight: bold; color: #2563eb; }
    .stat-label { font-size: 14px; color: #666; margin-top: 5px; }
    .hot-leads { background: #fef2f2; border-left: 4px solid #ef4444; padding: 15px; margin: 20px 0; }
    .lead-item { padding: 10px; border-bottom: 1px solid #eee; }
    .insights { background: #f0f9ff; border-left: 4px solid #3b82f6; padding: 15px; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>📊 Relatório Diário de Leads - Azimut</h1>
    <p>${new Date().toLocaleDateString('pt-BR')}</p>
  </div>
  
  <div class="content">
    <h2>📈 Estatísticas do Dia</h2>
    <div class="stats">
      <div class="stat-card">
        <div class="stat-value">${report.stats.total}</div>
        <div class="stat-label">Total de Leads</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" style="color: #ef4444;">${report.stats.hot}</div>
        <div class="stat-label">Leads Quentes</div>
      </div>
      <div class="stat-card">
        <div class="stat-value" style="color: #f59e0b;">${report.stats.high}</div>
        <div class="stat-label">Leads Bons</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">R$ ${report.stats.totalEstimatedValue.toLocaleString('pt-BR')}</div>
        <div class="stat-label">Valor Estimado</div>
      </div>
    </div>

    ${report.hotLeads.length > 0 ? `
    <div class="hot-leads">
      <h2>🔥 Leads Quentes (Prioridade Máxima)</h2>
      ${report.hotLeads.map((lead: any) => `
        <div class="lead-item">
          <strong>${lead.name}</strong> - ${lead.company || 'Sem empresa'}<br>
          📧 ${lead.email} | 📊 Score: ${lead.score} | 💰 R$ ${(lead.estimatedValue || 0).toLocaleString('pt-BR')}<br>
          <small>Projeto: ${lead.projectType || 'Não especificado'}</small>
        </div>
      `).join('')}
    </div>
    ` : ''}

    ${report.aiInsights ? `
    <div class="insights">
      <h2>🧠 Insights da IA</h2>
      <h3>Principais Insights:</h3>
      <ul>
        ${report.aiInsights.insights?.map((i: string) => `<li>${i}</li>`).join('') || ''}
      </ul>
      <h3>Recomendações:</h3>
      <ul>
        ${report.aiInsights.recommendations?.map((r: string) => `<li>${r}</li>`).join('') || ''}
      </ul>
      <h3>Ações Prioritárias:</h3>
      <ul>
        ${report.aiInsights.priorityActions?.map((a: string) => `<li>${a}</li>`).join('') || ''}
      </ul>
    </div>
    ` : ''}

    <p style="margin-top: 30px;">
      <a href="${SITE_URL}/admin/leads" style="background: #2563eb; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
        Ver Todos os Leads no Backoffice
      </a>
    </p>
  </div>
  
  <div class="footer">
    <p>Relatório gerado automaticamente pelo Sistema de Análise Inteligente de Leads</p>
    <p>Azimut - Experiências Imersivas</p>
  </div>
</body>
</html>
    `

    // TODO: Integrar com serviço de email (SendGrid, Nodemailer, etc)
    // Por enquanto, salvar em arquivo para teste
    const fs = require('fs')
    const path = require('path')
    const emailPath = path.join(__dirname, '../reports', `leads-report-${new Date().toISOString().split('T')[0]}.html`)
    
    // Criar diretório se não existir
    const reportsDir = path.dirname(emailPath)
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir, { recursive: true })
    }
    
    fs.writeFileSync(emailPath, emailHtml)
    console.log(`✅ Relatório salvo em: ${emailPath}`)
    console.log(`📧 Para enviar por email, configure SMTP/SendGrid no código`)

    return { success: true, report, emailPath }
  } catch (error: any) {
    console.error('❌ Erro ao gerar relatório:', error)
    throw error
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  sendEmailReport()
    .then(() => {
      console.log('✅ Relatório gerado com sucesso!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('❌ Erro:', error)
      process.exit(1)
    })
}

export { sendEmailReport }
