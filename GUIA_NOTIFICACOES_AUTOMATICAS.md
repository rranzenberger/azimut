# 🔔 GUIA DE CONFIGURAÇÃO - NOTIFICAÇÕES AUTOMÁTICAS

## ✅ O QUE FOI IMPLEMENTADO

O sistema agora envia notificações automáticas quando um **lead quente** é detectado:

- 🔥 **HOT LEAD** (>85% score OU prioridade URGENT)
- 🌡️ **WARM LEAD** (>75% score OU prioridade HIGH)
- ✨ **QUALIFIED LEAD** (clientes institucionais com autoAlert)

### Canais de Notificação

1. **Slack** - Webhook com card formatado
2. **Email** - HTML bonito via SendGrid ou Resend

---

## 📋 CONFIGURAÇÃO RÁPIDA

### 1. SLACK (RECOMENDADO - FÁCIL & GRÁTIS)

#### Passo 1: Criar Webhook no Slack

1. Acesse: https://api.slack.com/messaging/webhooks
2. Click em "Create New App" → "From Scratch"
3. Nome do app: **Azimut Lead Notifications**
4. Escolha o workspace
5. Em "Incoming Webhooks", ative e click em "Add New Webhook to Workspace"
6. Escolha o canal (ex: `#leads-quentes`)
7. Copie a URL do webhook (começa com `https://hooks.slack.com/services/...`)

#### Passo 2: Configurar no Vercel

1. Vá em **Vercel Dashboard** → Projeto `azimut-cms` → **Settings** → **Environment Variables**
2. Adicione:
   ```
   SLACK_WEBHOOK_URL = https://hooks.slack.com/services/SEU_WEBHOOK_AQUI
   ```
3. Salve e faça **Redeploy**

**Pronto! Notificações Slack configuradas! ✅**

---

### 2. EMAIL (OPCIONAL - MAIS PROFISSIONAL)

Você pode usar **SendGrid** (gratuito até 100 emails/dia) ou **Resend** (novo, mais fácil):

#### Opção A: SendGrid

1. Crie conta em: https://sendgrid.com/
2. Vá em **Settings** → **API Keys** → **Create API Key**
3. Dê permissão "Full Access"
4. Copie a API key

Adicione no Vercel:
```
SENDGRID_API_KEY = SG.xxxxxxxxxxxxxxxxxxxxx
EMAIL_PROVIDER = sendgrid
NOTIFICATION_EMAIL = seuemail@azimut.com
```

#### Opção B: Resend (Recomendado - Mais Simples)

1. Crie conta em: https://resend.com/
2. Vá em **API Keys** → **Create API Key**
3. Copie a API key

Adicione no Vercel:
```
RESEND_API_KEY = re_xxxxxxxxxxxxxxxxxxxxx
EMAIL_PROVIDER = resend
NOTIFICATION_EMAIL = seuemail@azimut.com
```

---

## 🎨 EXEMPLO DE NOTIFICAÇÃO

### Slack:
```
🔥 **NOVO LEAD HOT!**

Nome: João Silva
Email: joao@sescsp.org.br
Empresa: SESC São Paulo
Score: 92%
Tipo: Museum Curator

Mensagem: Projeto de exposição imersiva para 2026...
```

### Email:
HTML bonito com:
- Header colorido (vermelho para HOT, laranja para WARM)
- Todas as informações do lead
- Score de conversão
- Tipo de visitante
- Mensagem completa

---

## 🧪 TESTAR AS NOTIFICAÇÕES

### Teste Manual via API:

```javascript
// Criar um lead de teste com score alto
fetch('https://azimut-cms.vercel.app/api/leads', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'Teste Lead Quente',
    email: 'teste@sescsp.org.br',  // Email institucional
    phone: '+55 11 99999-9999',
    company: 'SESC SP',
    projectType: 'Exposição Imersiva',
    budget: 'R$ 500k+',
    timeline: '6 meses',
    description: 'Projeto de teste para notificação'
  })
})
```

Se configurado corretamente, você receberá:
- ✅ Mensagem no Slack
- ✅ Email na caixa de entrada

---

## 🔧 TROUBLESHOOTING

### "Notificação não chegou"

1. **Verifique as variáveis de ambiente no Vercel:**
   - `SLACK_WEBHOOK_URL` está correto?
   - `NOTIFICATION_EMAIL` está correto?
   - Fez redeploy após adicionar?

2. **Verifique os logs do Vercel:**
   - Vá em **Deployments** → Click no último deploy → **Functions** → Click em `api/leads`
   - Procure por:
     - `✅ Slack: OK` ou `⚠️ Slack: FALHOU`
     - `✅ Email: OK` ou `⚠️ Email: FALHOU`

3. **Teste o webhook Slack manualmente:**
   ```bash
   curl -X POST YOUR_WEBHOOK_URL \
     -H 'Content-Type: application/json' \
     -d '{"text":"Teste de webhook Azimut"}'
   ```

### "Muitas notificações"

Ajuste a condição em `azimut-cms/app/api/leads/route.ts`:

```typescript
// Linha ~165: Aumentar o threshold
const isHotLead = conversionScore > 85  // De 75 para 85
```

---

## 🚀 PRÓXIMOS PASSOS

Depois de configurado, você pode:

1. **Criar canais específicos:**
   - `#leads-hot` (>85%)
   - `#leads-warm` (75-85%)
   - `#leads-institucional` (SESC, NFB, etc.)

2. **Integrar com CRM:**
   - HubSpot, Pipedrive, etc.

3. **Dashboard de Notificações:**
   - Ver histórico no backoffice

---

## 📝 RESUMO

| Recurso | Status | Prioridade |
|---------|--------|------------|
| 🔔 Slack Notifications | ✅ Implementado | ALTA |
| 📧 Email Notifications | ✅ Implementado | MÉDIA |
| 🎯 Auto-detect Hot Leads | ✅ Implementado | ALTA |
| 🏛️ Institutional Detection | ✅ Implementado | ALTA |

**Para ativar:** Configure `SLACK_WEBHOOK_URL` no Vercel e faça redeploy! 🚀

