# 🚀 SETUP COMPLETO - Sistema de Captação Inteligente

> **Guia passo a passo para implementar tudo**

---

## ✅ PASSO 1: Executar SQL no Banco

### Opção A: Via Script (Recomendado)

**Windows PowerShell:**
```powershell
# Pegar URL do Neon no console: https://console.neon.tech
$env:DATABASE_URL = "postgresql://user:pass@host.neon.tech/dbname"
.\scripts\setup-enrichment.ps1
```

**Linux/Mac:**
```bash
export DATABASE_URL="postgresql://user:pass@host.neon.tech/dbname"
bash scripts/setup-enrichment.sh
```

### Opção B: Via Neon Console

1. Acessar https://console.neon.tech
2. Selecionar seu projeto
3. Abrir SQL Editor
4. Copiar conteúdo de `sql/enrichment_schema.sql`
5. Colar e executar

### Opção C: Via pgAdmin

1. Conectar no banco Neon
2. Abrir Query Tool
3. Abrir arquivo `sql/enrichment_schema.sql`
4. Executar (F5)

**✅ Validação:** Verificar se as tabelas foram criadas:
```sql
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('lead_interactions', 'enrichment_sources', 'conversation_triggers', 'email_templates', 'sent_emails');
```

---

## ✅ PASSO 2: Criar Contas nas APIs

### 2.1 Proxycurl (LinkedIn Data)

1. Acessar: https://nubela.co/proxycurl
2. Criar conta (Free tier: 50 requests/mês)
3. Ir em Dashboard → API Keys
4. Copiar API Key
5. **Salvar:** `PROXYCURL_API_KEY=your_key_here`

**Preço:** 
- Free: 50 req/mês
- Starter: $49/mês (500 req)
- **Recomendado:** Starter

### 2.2 SerpAPI (Google Search)

1. Acessar: https://serpapi.com
2. Criar conta (Free tier: 100 searches/mês)
3. Dashboard → API Key
4. Copiar API Key
5. **Salvar:** `SERPAPI_KEY=your_key_here`

**Preço:**
- Free: 100 searches/mês
- Starter: $50/mês (5k searches)
- **Recomendado:** Starter

### 2.3 Resend (Email)

1. Acessar: https://resend.com
2. Verificar se já tem conta
3. API Keys → Create API Key
4. Copiar key
5. **Salvar:** `RESEND_API_KEY=your_key_here`

**Preço:** Gratis até 3.000 emails/mês

### 2.4 Claude API (Já tem?)

1. Verificar: https://console.anthropic.com
2. Se não tiver, criar conta
3. API Keys → Create Key
4. **Salvar:** `CLAUDE_API_KEY=your_key_here`

---

## ✅ PASSO 3: Deploy do n8n

### Opção A: Railway (Mais Fácil - Recomendado)

1. **Criar conta:**
   - Acessar https://railway.app
   - Sign up with GitHub

2. **Criar novo projeto:**
   - New Project → Empty Project

3. **Adicionar serviço:**
   - New → Database → PostgreSQL (para n8n)
   - New → Service → Deploy from GitHub

4. **Configurar:**
   - Conectar repositório do Azimut
   - Root Directory: `n8n`
   - Build Command: (deixar vazio)
   - Start Command: `docker-compose up`

5. **Variáveis de ambiente:**
   ```
   N8N_PASSWORD=sua_senha_forte_aqui
   N8N_HOST=seu-dominio.railway.app
   WEBHOOK_URL=https://seu-dominio.railway.app
   DB_TYPE=postgresdb
   DB_POSTGRESDB_HOST=[do PostgreSQL do Railway]
   DB_POSTGRESDB_PORT=5432
   DB_POSTGRESDB_DATABASE=railway
   DB_POSTGRESDB_USER=postgres
   DB_POSTGRESDB_PASSWORD=[senha do PostgreSQL]
   N8N_ENCRYPTION_KEY=[gerar: openssl rand -base64 32]
   ```

6. **Deploy:**
   - Railway vai fazer deploy automaticamente
   - Aguardar URL aparecer

### Opção B: VPS (Mais Controle)

1. **Servidor Ubuntu 22.04:**
   ```bash
   # Instalar Docker
   curl -fsSL https://get.docker.com -o get-docker.sh
   sh get-docker.sh
   
   # Instalar Docker Compose
   sudo apt install docker-compose -y
   ```

2. **Clonar projeto:**
   ```bash
   git clone [seu-repo]
   cd azimut-site-vite-tailwind/n8n
   ```

3. **Configurar .env:**
   ```bash
   cp .env.example .env
   nano .env
   # Preencher todas as variáveis
   ```

4. **Deploy:**
   ```bash
   docker-compose up -d
   ```

5. **Verificar:**
   ```bash
   docker-compose ps
   # Acessar: http://seu-ip:5678
   ```

---

## ✅ PASSO 4: Configurar n8n

### 4.1 Primeiro Acesso

1. Acessar n8n (Railway URL ou http://localhost:5678)
2. Login com credenciais do `.env`
3. Criar credenciais para APIs

### 4.2 Criar Credenciais

**PostgreSQL (Neon):**
- Type: PostgreSQL
- Host: [do Neon]
- Database: [nome do banco]
- User: [usuário]
- Password: [senha]
- Port: 5432

**Claude API:**
- Type: HTTP Header Auth
- Name: `x-api-key`
- Value: `[CLAUDE_API_KEY]`

**Proxycurl:**
- Type: HTTP Header Auth
- Name: `Authorization`
- Value: `Bearer [PROXYCURL_API_KEY]`

**SerpAPI:**
- Type: Query Auth
- Name: `api_key`
- Value: `[SERPAPI_KEY]`

**Resend:**
- Type: HTTP Header Auth
- Name: `Authorization`
- Value: `Bearer [RESEND_API_KEY]`

### 4.3 Criar Workflow: Enriquecimento

1. **New Workflow**
2. **Adicionar nodes:**
   - Webhook (POST `/webhook/lead-enrichment`)
   - Set (extrair dados)
   - IF (verificar se já enriquecido)
   - HTTP Request (Proxycurl)
   - HTTP Request (SerpAPI)
   - HTTP Request (Claude - análise)
   - PostgreSQL (salvar perfil)
   - HTTP Request (notificar)

3. **Configurar cada node:**
   - Ver detalhes em `docs/n8n-workflows.md`

4. **Ativar workflow:**
   - Toggle "Active" no canto superior direito

### 4.4 Criar Workflow: Email Personalizado

1. **New Workflow**
2. **Schedule Trigger:**
   - Cron: `0 9 * * *` (9h todo dia)
3. **Adicionar nodes:**
   - PostgreSQL (buscar leads qualificados)
   - Loop (para cada lead)
   - PostgreSQL (buscar perfil)
   - HTTP Request (Claude - gerar email)
   - HTTP Request (Resend - enviar)
   - PostgreSQL (registrar)

4. **Ativar workflow**

---

## ✅ PASSO 5: Testar Sistema

### 5.1 Teste de Enriquecimento

1. Criar lead de teste no backoffice
2. Chamar webhook:
   ```bash
   curl -X POST https://seu-n8n.railway.app/webhook/lead-enrichment \
     -H "Content-Type: application/json" \
     -H "X-API-Key: sua_key" \
     -d '{"lead_id": 1, "email": "teste@empresa.com", "name": "Teste", "company": "Empresa Teste"}'
   ```
3. Verificar no banco se perfil foi enriquecido
4. Verificar logs do n8n

### 5.2 Teste de Email

1. Aguardar workflow de email rodar (ou trigger manual)
2. Verificar email chegou
3. Verificar tracking (abertura/clique)

---

## ✅ PASSO 6: Integrar no Site

### 6.1 Atualizar Backoffice

Adicionar endpoint para solicitar enriquecimento:
```typescript
// No backoffice
POST /api/enrichment/request
Body: { lead_id: number }
```

### 6.2 Atualizar Site

O código já está em `src/api/enrichment.ts` - só precisa conectar:

```typescript
import { requestEnrichment } from '../api/enrichment'

// Quando lead é criado
await requestEnrichment(leadId)
```

---

## 🔍 TROUBLESHOOTING

### Erro: "psql não encontrado"
- Instalar PostgreSQL client
- Ou usar Neon Console

### Erro: "Connection refused" no n8n
- Verificar se Docker está rodando
- Verificar portas (5678)
- Verificar firewall

### Erro: "API key inválida"
- Verificar se key está correta
- Verificar se conta está ativa
- Verificar limites de uso

### Workflow não executa
- Verificar se está "Active"
- Verificar logs do n8n
- Verificar credenciais configuradas

---

## 📊 VALIDAÇÃO FINAL

Execute estes comandos para validar:

```sql
-- Verificar tabelas
SELECT table_name FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name LIKE '%enrichment%' OR table_name LIKE '%lead%';

-- Verificar campos na tabela leads
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'leads' 
AND column_name LIKE '%enrich%';
```

---

## ✅ CHECKLIST COMPLETO

- [ ] SQL executado no banco
- [ ] Conta Proxycurl criada e key salva
- [ ] Conta SerpAPI criada e key salva
- [ ] Resend configurado
- [ ] Claude API key configurada
- [ ] n8n deployado e acessível
- [ ] Credenciais criadas no n8n
- [ ] Workflow de enriquecimento criado e ativo
- [ ] Workflow de email criado e ativo
- [ ] Teste de enriquecimento funcionando
- [ ] Teste de email funcionando
- [ ] Integração com backoffice funcionando

---

**Pronto! Sistema funcionando! 🎉**
