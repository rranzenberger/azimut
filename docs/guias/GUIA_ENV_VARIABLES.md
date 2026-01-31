# ⚙️ VARIÁVEIS DE AMBIENTE - GUIA COMPLETO

## 📋 SITE PRINCIPAL (azmt-site)

### Google Analytics
```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```
**Onde pegar:** https://analytics.google.com → Admin → Data Streams  
**Obrigatório:** Não (mas recomendado)  
**Efeito:** Tracking de visitantes e conversões

---

### Claude AI (Chatbot)
```bash
VITE_CLAUDE_API_KEY=sk-ant-api03-XXXXXXXXXX
```
**Onde pegar:** https://console.anthropic.com/settings/keys  
**Obrigatório:** Sim (se quiser chatbot)  
**Custo:** ~$0.003 por mensagem (modelo Haiku)

---

### DeepSeek AI (Chatbot econômico)
```bash
VITE_DEEPSEEK_API_KEY=sk-XXXXXXXXXX
```
**Onde pegar:** https://platform.deepseek.com/api_keys  
**Obrigatório:** Sim (se quiser chatbot)  
**Custo:** ~$0.0001 por mensagem (90% das respostas)

---

### Outras (opcionais)
```bash
VITE_MAPBOX_TOKEN=pk.XXXXXXXXXX
VITE_RECAPTCHA_SITE_KEY=6Le...
```

---

## 📋 BACKOFFICE (azimut-cms)

### Database
```bash
DATABASE_URL=postgresql://usuario:senha@host:5432/database?schema=public
```
**Onde pegar:** Painel do Supabase/Neon/Vercel Postgres  
**Obrigatório:** SIM (sem isso nada funciona)

---

### Authentication
```bash
JWT_SECRET=sua-string-secreta-aleatoria-256-bits
NEXTAUTH_SECRET=outra-string-secreta-aleatoria
NEXTAUTH_URL=https://azimut-backoffice.vercel.app
```
**Como gerar:**
```bash
# No terminal:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

### Claude AI
```bash
CLAUDE_API_KEY=sk-ant-api03-XXXXXXXXXX
```
**Usado para:** AI Writing Assistant, Lead Insights

---

### DeepSeek AI
```bash
DEEPSEEK_API_KEY=sk-XXXXXXXXXX
```
**Usado para:** Geração de conteúdo, análise de leads

---

### Supabase (Storage de imagens)
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```
**Onde pegar:** https://supabase.com/dashboard → Project Settings → API

---

### Email (Resend)
```bash
RESEND_API_KEY=re_XXXXXXXXXX
```
**Onde pegar:** https://resend.com/api-keys  
**Usado para:** Envio de emails automáticos

---

## 🔧 COMO CONFIGURAR NO VERCEL

### Passo a passo:

1. **Acessar Vercel Dashboard:**
   https://vercel.com/dashboard

2. **Selecionar projeto:**
   - Site Principal: `azmt-site`
   - Backoffice: `azimut-cms`

3. **Ir em Settings → Environment Variables**

4. **Adicionar cada variável:**
   - Name: `NOME_DA_VARIAVEL`
   - Value: `valor-secreto`
   - Environments: ✅ Production, ✅ Preview, ✅ Development

5. **Salvar**

6. **Redeploy:**
   - Deployments → ... (três pontos) → Redeploy

---

## ✅ VERIFICAR SE CONFIGUROU CERTO

### Via Vercel Dashboard:
```
Settings → Environment Variables → Ver se aparecem todas
```

### Via código (console F12):
```javascript
// No site, abrir console:
console.log(import.meta.env.VITE_GA_MEASUREMENT_ID)
// Se aparecer "G-XXXXXXXXXX" → ✅ Configurado
// Se aparecer "undefined" → ❌ Não configurado
```

---

## 🚨 ERROS COMUNS

### 1. "API key not found"
**Causa:** Variável não configurada ou nome errado  
**Solução:** Verificar nome exato (maiúsculas/minúsculas)

### 2. "Invalid API key"
**Causa:** API key expirada ou incorreta  
**Solução:** Gerar nova key no painel do provedor

### 3. "Redeploy required"
**Causa:** Adicionou variável mas não fez redeploy  
**Solução:** Deployments → Redeploy

### 4. "Environment not selected"
**Causa:** Esqueceu de marcar Production/Preview  
**Solução:** Editar variável e marcar todos os ambientes

---

## 💰 CUSTOS ESTIMADOS

### Google Analytics
**Custo:** Grátis (até 10M eventos/mês)

### Claude Haiku (Chatbot)
**Custo:** $0.25 por 1M tokens input, $1.25 por 1M tokens output  
**Real:** ~$0.003 por conversa (3 mensagens)  
**Estimativa:** R$ 15-30/mês (1.000-2.000 conversas)

### DeepSeek (Chatbot)
**Custo:** $0.014 por 1M tokens  
**Real:** ~$0.0001 por conversa  
**Estimativa:** R$ 1-3/mês (1.000-2.000 conversas)

### Supabase (Storage)
**Custo:** Grátis até 1GB  
**Pago:** $25/mês (100GB)

### Resend (Email)
**Custo:** Grátis até 3.000 emails/mês  
**Pago:** $20/mês (50.000 emails)

---

## 🎯 PRIORIDADES

### ALTA (fazer agora):
- [ ] `DATABASE_URL` (backoffice)
- [ ] `JWT_SECRET` (backoffice)
- [ ] `VITE_GA_MEASUREMENT_ID` (site)

### MÉDIA (fazer esta semana):
- [ ] `VITE_CLAUDE_API_KEY` (chatbot)
- [ ] `VITE_DEEPSEEK_API_KEY` (chatbot)
- [ ] `CLAUDE_API_KEY` (backoffice AI)

### BAIXA (pode esperar):
- [ ] `SUPABASE_*` (storage de imagens)
- [ ] `RESEND_API_KEY` (email automático)
- [ ] `VITE_MAPBOX_TOKEN` (mapas interativos)

---

## 📝 TEMPLATE COMPLETO

### Copiar e colar no Vercel (ajustar valores):

#### SITE PRINCIPAL:
```bash
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_CLAUDE_API_KEY=sk-ant-api03-XXXXXXXXXX
VITE_DEEPSEEK_API_KEY=sk-XXXXXXXXXX
```

#### BACKOFFICE:
```bash
DATABASE_URL=postgresql://...
JWT_SECRET=<gerar com node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
NEXTAUTH_SECRET=<gerar com node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
NEXTAUTH_URL=https://azimut-backoffice.vercel.app
CLAUDE_API_KEY=sk-ant-api03-XXXXXXXXXX
DEEPSEEK_API_KEY=sk-XXXXXXXXXX
NEXT_PUBLIC_SUPABASE_URL=https://xyz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
RESEND_API_KEY=re_XXXXXXXXXX
```

---

**Dúvidas?** Ver `TODO_AMANHA.md` para passo a passo detalhado!
