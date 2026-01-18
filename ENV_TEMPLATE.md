# 🔐 Variáveis de Ambiente - Template Completo

## Para o n8n (.env)

```env
# ============================================================
# n8n Configuration
# ============================================================
N8N_PASSWORD=SuaSenhaForteAqui123!
N8N_HOST=localhost
WEBHOOK_URL=http://localhost:5678

# ============================================================
# Database (PostgreSQL para n8n)
# ============================================================
DB_TYPE=postgresdb
DB_POSTGRESDB_HOST=localhost
DB_POSTGRESDB_PORT=5432
DB_POSTGRESDB_DATABASE=n8n
DB_POSTGRESDB_USER=n8n
DB_POSTGRESDB_PASSWORD=SenhaDoBancoN8n

# ============================================================
# Encryption Key (gerar com: openssl rand -base64 32)
# ============================================================
N8N_ENCRYPTION_KEY=GereUmaChaveAleatoriaCom32CaracteresAqui

# ============================================================
# API Keys - Enriquecimento
# ============================================================
PROXYCURL_API_KEY=your_proxycurl_key_aqui
SERPAPI_KEY=your_serpapi_key_aqui
CLAUDE_API_KEY=your_claude_key_aqui
RESEND_API_KEY=your_resend_key_aqui

# ============================================================
# Neon Database (Azimut - URL completa)
# ============================================================
NEON_DATABASE_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require

# ============================================================
# Backoffice URL (opcional)
# ============================================================
BACKOFFICE_URL=https://backoffice.azmt.com.br

# ============================================================
# Slack Webhook (opcional - para notificações)
# ============================================================
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

## Como Preencher

### 1. N8N_PASSWORD
```bash
# Gerar senha forte
openssl rand -base64 24
```

### 2. N8N_ENCRYPTION_KEY
```bash
# Gerar chave de criptografia
openssl rand -base64 32
```

### 3. NEON_DATABASE_URL
1. Acessar https://console.neon.tech
2. Selecionar projeto
3. Connection Details
4. Copiar "Connection string"
5. Formato: `postgresql://user:pass@host/dbname?sslmode=require`

### 4. API Keys

**Proxycurl:**
- Criar conta: https://nubela.co/proxycurl
- Dashboard → API Keys → Copy

**SerpAPI:**
- Criar conta: https://serpapi.com
- Dashboard → API Key → Copy

**Claude:**
- Console: https://console.anthropic.com
- API Keys → Create Key → Copy

**Resend:**
- Dashboard: https://resend.com/api-keys
- Create API Key → Copy

---

## Para o Site (Vercel)

Adicionar no Vercel Dashboard → Settings → Environment Variables:

```env
VITE_BACKOFFICE_URL=https://backoffice.azmt.com.br
```

---

## Para o Backoffice

Adicionar no `.env` do backoffice:

```env
# APIs de Enriquecimento
PROXYCURL_API_KEY=your_key
SERPAPI_KEY=your_key
CLAUDE_API_KEY=your_key
RESEND_API_KEY=your_key

# Neon Database
DATABASE_URL=postgresql://user:pass@host/dbname

# n8n Webhook
N8N_WEBHOOK_URL=https://seu-n8n.railway.app/webhook/lead-enrichment
N8N_API_KEY=sua_key_do_n8n
```

---

## Validação

Após preencher, validar:

```bash
# Verificar se todas as keys estão definidas
echo $PROXYCURL_API_KEY
echo $SERPAPI_KEY
echo $CLAUDE_API_KEY
echo $RESEND_API_KEY
echo $NEON_DATABASE_URL
```
