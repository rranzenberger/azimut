# 📧 CONFIGURAR EMAIL HOT LEADS
**Status:** Código implementado, precisa configurar variáveis

---

## ✅ O QUE JÁ ESTÁ FUNCIONANDO:

1. ✅ Sistema detecta Hot Leads (score >= 70)
2. ✅ API `/api/admin/alerts` identifica automaticamente
3. ✅ Templates de email prontos
4. ✅ Anti-spam (1 email por sessão a cada 60min)

---

## 🔧 CONFIGURAÇÃO NECESSÁRIA:

### 1. Variáveis de Ambiente no Vercel

**Backoffice (azimut-backoffice):**

```env
# Email de notificação (para onde enviar alertas)
ADMIN_NOTIFICATION_EMAIL=seu-email@azmt.com.br

# API do Resend (para enviar emails)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx

# Ou SMTP (alternativa ao Resend)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=seu-email@gmail.com
SMTP_PASS=sua-senha-app
```

**Como configurar:**
1. Acesse: https://vercel.com/azimut/azimut-backoffice
2. Settings → Environment Variables
3. Adicione as variáveis acima
4. Redeploy

---

## 📨 OPÇÕES DE ENVIO:

### Opção A: Resend (RECOMENDADO)
**Vantagens:**
- ✅ Fácil de configurar
- ✅ Não precisa senha Gmail
- ✅ Dashboard de emails enviados
- ✅ 100 emails/dia grátis

**Como obter API Key:**
1. Acesse: https://resend.com
2. Crie conta
3. API Keys → Create
4. Copie: `re_xxxxxxxxxxxxxxxxxxxx`
5. Cole no Vercel: `RESEND_API_KEY`

---

### Opção B: Gmail SMTP
**Vantagens:**
- ✅ Usa email que já tem
- ✅ Grátis ilimitado

**Como configurar:**
1. Gmail → Configurações → Segurança
2. Ativar "Verificação em 2 etapas"
3. Criar "Senha de app"
4. Usar esta senha (não a senha normal!)

---

## 🧪 COMO TESTAR:

### 1. Criar Hot Lead Fake:

No site, faça:
1. Visite 5+ páginas
2. Fique 10+ minutos
3. Vá em /contact
4. Sistema deve detectar como Hot Lead

### 2. Verificar Email:

Você deve receber:
```
De: noreply@azmt.com.br
Para: seu-email@azmt.com.br
Assunto: 🔥 Hot Lead Detectado!

Fingerprint: abc123...
País: Brasil
Páginas: 8
Tempo: 12 minutos
Score: 85/100
Interesse: VR/360, Museus

[Ver Lead no Backoffice]
```

---

## 📊 TIPOS DE ALERTAS AUTOMÁTICOS:

### 🔥 Hot Lead (score >= 70)
- Email para você
- Email para o lead (boas-vindas)

### 📈 Traffic Spike (+50% visitantes)
- Email para você
- Notificação no backoffice

### 🌍 Novo País
- Primeira visita de um país novo
- Email para você

### 🎯 PWA Instalado
- Alguém instalou o app
- Email para você

### 🔁 Visitante Frequente (5+ visitas)
- Alguém muito interessado
- Email para você

---

## ⚙️ ATIVAR/DESATIVAR:

**Para desativar temporariamente:**

Edite `azimut-cms/app/api/admin/alerts/route.ts`:

```typescript
// Linha ~36:
if (score < 70) return false  // Mude para 100 para desativar
```

**Para ativar:**
- Score >= 70 (padrão)
- Ou mude para 60 (mais sensível)
- Ou mude para 80 (menos sensível)

---

## 🎯 PRÓXIMOS PASSOS:

1. ✅ Configurar `ADMIN_NOTIFICATION_EMAIL` no Vercel
2. ✅ Configurar `RESEND_API_KEY` (ou SMTP)
3. ✅ Redeploy backoffice
4. ✅ Testar criando Hot Lead fake
5. ✅ Verificar se email chegou

---

**Quer que eu te guie passo a passo para configurar?** 📧

Ou prefere:
- ⏸️ Deixar para depois
- ✅ Fazer sozinho
- 🤝 Fazer juntos agora

**Aguardo!** 😊
