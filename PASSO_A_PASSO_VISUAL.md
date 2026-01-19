# 🎯 PASSO A PASSO VISUAL - Setup Completo

## 📋 CHECKLIST RÁPIDO

```
[ ] 1. Executar SQL no banco
[ ] 2. Criar conta Proxycurl
[ ] 3. Criar conta SerpAPI  
[ ] 4. Verificar Resend
[ ] 5. Verificar Claude API
[ ] 6. Deploy n8n (Railway)
[ ] 7. Configurar n8n
[ ] 8. Criar workflows
[ ] 9. Testar sistema
```

---

## ✅ PASSO 1: SQL no Banco (5 minutos)

### Método Rápido: Neon Console

1. **Abrir:** https://console.neon.tech
2. **Clicar:** No seu projeto
3. **Clicar:** "SQL Editor" (menu lateral)
4. **Abrir arquivo:** `sql/enrichment_schema.sql` (do projeto)
5. **Copiar** todo o conteúdo
6. **Colar** no SQL Editor
7. **Clicar:** "Run" (ou F5)
8. **Verificar:** Mensagem "Success"

✅ **Pronto!** Tabelas criadas.

---

## ✅ PASSO 2: Criar Contas APIs (10 minutos)

### 2.1 Proxycurl

1. **Abrir:** https://nubela.co/proxycurl
2. **Clicar:** "Sign Up" (canto superior direito)
3. **Preencher:** Email, senha
4. **Confirmar:** Email
5. **Ir em:** Dashboard → API Keys
6. **Copiar:** API Key
7. **Salvar em:** `ENV_TEMPLATE.md` → `PROXYCURL_API_KEY=`

### 2.2 SerpAPI

1. **Abrir:** https://serpapi.com
2. **Clicar:** "Sign Up"
3. **Preencher:** Dados
4. **Ir em:** Dashboard → API Key
5. **Copiar:** API Key
6. **Salvar em:** `ENV_TEMPLATE.md` → `SERPAPI_KEY=`

### 2.3 Resend

1. **Abrir:** https://resend.com
2. **Verificar:** Se já tem conta
3. **Se não:** Sign Up
4. **Ir em:** API Keys → Create API Key
5. **Copiar:** Key
6. **Salvar em:** `ENV_TEMPLATE.md` → `RESEND_API_KEY=`

### 2.4 Claude

1. **Abrir:** https://console.anthropic.com
2. **Verificar:** Se já tem conta
3. **Se não:** Sign Up
4. **Ir em:** API Keys → Create Key
5. **Copiar:** Key
6. **Salvar em:** `ENV_TEMPLATE.md` → `CLAUDE_API_KEY=`

---

## ✅ PASSO 3: Deploy n8n no Railway (15 minutos)

### 3.1 Criar Conta Railway

1. **Abrir:** https://railway.app
2. **Clicar:** "Start a New Project"
3. **Clicar:** "Login with GitHub"
4. **Autorizar:** Railway acessar GitHub

### 3.2 Criar Projeto

1. **Clicar:** "New Project"
2. **Clicar:** "Empty Project"

### 3.3 Adicionar PostgreSQL (para n8n)

1. **Clicar:** "New" → "Database" → "PostgreSQL"
2. **Aguardar:** Railway criar banco
3. **Clicar:** No banco criado
4. **Ir em:** "Variables" tab
5. **Copiar:** `DATABASE_URL` (vai usar depois)

### 3.4 Deploy n8n

1. **Clicar:** "New" → "GitHub Repo"
2. **Selecionar:** Repositório do Azimut
3. **Railway vai detectar** automaticamente
4. **Ir em:** "Settings" do serviço
5. **Root Directory:** `n8n`
6. **Build Command:** (deixar vazio)
7. **Start Command:** `docker-compose up`

### 3.5 Configurar Variáveis

1. **Ir em:** "Variables" tab
2. **Adicionar cada uma:**

```
N8N_PASSWORD=[gerar senha forte]
N8N_HOST=[vai aparecer depois]
WEBHOOK_URL=[vai aparecer depois]
DB_TYPE=postgresdb
DB_POSTGRESDB_HOST=[do PostgreSQL criado]
DB_POSTGRESDB_PORT=5432
DB_POSTGRESDB_DATABASE=railway
DB_POSTGRESDB_USER=postgres
DB_POSTGRESDB_PASSWORD=[do PostgreSQL criado]
N8N_ENCRYPTION_KEY=[gerar: openssl rand -base64 32]
PROXYCURL_API_KEY=[que você salvou]
SERPAPI_KEY=[que você salvou]
CLAUDE_API_KEY=[que você salvou]
RESEND_API_KEY=[que você salvou]
NEON_DATABASE_URL=[do Neon]
```

3. **Salvar:** Railway vai fazer redeploy

### 3.6 Obter URL

1. **Aguardar:** Deploy completar (2-3 min)
2. **Clicar:** No serviço n8n
3. **Ver:** URL pública (ex: `n8n-production.up.railway.app`)
4. **Copiar:** URL
5. **Atualizar:** Variável `N8N_HOST` e `WEBHOOK_URL` com essa URL
6. **Redeploy:** Railway vai atualizar

### 3.7 Primeiro Acesso

1. **Abrir:** URL do n8n
2. **Login:** Com `N8N_PASSWORD` que você definiu
3. **✅ Pronto!** n8n funcionando

---

## ✅ PASSO 4: Configurar n8n (20 minutos)

### 4.1 Criar Credenciais

1. **Clicar:** "Credentials" (menu lateral)
2. **Criar cada uma:**

**PostgreSQL (Neon):**
- Type: PostgreSQL
- Host: [do Neon]
- Database: [nome]
- User: [usuário]
- Password: [senha]
- Port: 5432
- **Salvar como:** "Neon Database"

**Claude API:**
- Type: HTTP Header Auth
- Name: `x-api-key`
- Value: `[sua Claude key]`
- **Salvar como:** "Claude API"

**Proxycurl:**
- Type: HTTP Header Auth
- Name: `Authorization`
- Value: `Bearer [sua Proxycurl key]`
- **Salvar como:** "Proxycurl"

**SerpAPI:**
- Type: Query Auth
- Name: `api_key`
- Value: `[sua SerpAPI key]`
- **Salvar como:** "SerpAPI"

**Resend:**
- Type: HTTP Header Auth
- Name: `Authorization`
- Value: `Bearer [sua Resend key]`
- **Salvar como:** "Resend"

### 4.2 Criar Workflow: Enriquecimento

1. **Clicar:** "Workflows" → "New Workflow"
2. **Nomear:** "Enriquecimento de Leads"
3. **Adicionar nodes** (arrastar do menu esquerdo):

```
[Webhook] → [Set] → [IF] → [HTTP Request - Proxycurl] 
→ [HTTP Request - SerpAPI] → [Code] → [HTTP Request - Claude]
→ [PostgreSQL] → [HTTP Request - Notificação]
```

4. **Configurar cada node:**
   - Ver detalhes em `docs/n8n-workflows.md`
   - Conectar credenciais criadas

5. **Ativar:** Toggle "Active" (canto superior direito)

### 4.3 Criar Workflow: Email

1. **New Workflow** → "Email Personalizado"
2. **Adicionar:**
   - Schedule Trigger (cron: `0 9 * * *`)
   - PostgreSQL (buscar leads)
   - Loop
   - HTTP Request (Claude - gerar email)
   - HTTP Request (Resend - enviar)
   - PostgreSQL (registrar)

3. **Ativar**

---

## ✅ PASSO 5: Testar (5 minutos)

### Teste Rápido

1. **Criar lead de teste** no backoffice
2. **Chamar webhook:**
   ```bash
   curl -X POST https://seu-n8n.railway.app/webhook/lead-enrichment \
     -H "Content-Type: application/json" \
     -d '{"lead_id": 1, "email": "teste@teste.com", "name": "Teste", "company": "Teste"}'
   ```
3. **Verificar:** Logs do n8n
4. **Verificar:** Banco (perfil enriquecido)

---

## 🎉 PRONTO!

Sistema funcionando. Agora é só:
- Deixar workflows rodando
- Monitorar leads sendo enriquecidos
- Ajustar conforme necessário

---

**Dúvidas?** Ver `SETUP_COMPLETO.md` para detalhes.
