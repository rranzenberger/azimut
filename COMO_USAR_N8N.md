# 🚀 COMO USAR N8N - Guia Completo

## **🎯 O que é N8N?**

N8N é a plataforma de automação que você está usando para:
- 🕵️ Investigar leads automaticamente
- 📧 Enviar emails personalizados
- 🔍 Verificar IPs, emails, LinkedIn, etc
- 🤖 Integrar todas as APIs (Hunter, Clearbit, etc)

**Localização:** `c:\Users\ranz\Documents\azimut-site-vite-tailwind\n8n\`

---

## **🔧 PASSO 1: Iniciar o N8N**

### **Opção A: Via Docker (Recomendado)**

```bash
# 1. Abrir PowerShell no diretório n8n
cd c:\Users\ranz\Documents\azimut-site-vite-tailwind\n8n

# 2. Iniciar N8N
docker-compose up -d

# 3. Verificar se está rodando
docker ps

# Você verá algo como:
# CONTAINER ID   IMAGE              STATUS         PORTS
# abc123def456   n8nio/n8n:latest   Up 2 minutes   0.0.0.0:5678->5678/tcp
```

### **Opção B: Via Docker Desktop (Windows)**

1. Abrir **Docker Desktop**
2. Ir em **Containers**
3. Clicar em **Start** no container `azimut-n8n`

---

## **🌐 PASSO 2: Acessar o N8N**

### **Abrir no navegador:**
```
http://localhost:5678
```

### **Credenciais:**
```
Usuário: admin
Senha: ChangeMe123!
```

*(Você pode mudar a senha no arquivo `.env` ou `docker-compose.yml`)*

---

## **📥 PASSO 3: Importar o Workflow**

### **3.1. Na interface do N8N:**

1. **Clicar em "Workflows"** (barra lateral esquerda)
2. **Clicar em "Import"** (botão no topo)
3. **Selecionar arquivo:**
   ```
   c:\Users\ranz\Documents\azimut-site-vite-tailwind\n8n\lead-intelligence-workflow.json
   ```
4. **Clicar em "Import"**

### **3.2. O que foi importado:**

Você verá um workflow visual com:

```
┌──────────────┐
│   Webhook    │ ← Recebe lead do backoffice
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ 1️⃣ Validar IP│ ← ipapi.co (grátis)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ 2️⃣ Email     │ ← Hunter.io (pago)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ 3️⃣ Google    │ ← Google Search
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ 4️⃣ LinkedIn  │ ← Proxycurl (pago)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ 5️⃣ Clearbit  │ ← Clearbit (pago)
└──────┬───────┘
       │
       ▼
┌──────────────┐
│ 6️⃣ Análise   │ ← Inteligência artificial
└──────┬───────┘
       │
       ▼
┌──────────────┐
│   Decisão    │ ← SEND / CAUTION / BLOCK
└──────────────┘
```

---

## **🔑 PASSO 4: Configurar APIs**

### **4.1. Adicionar credenciais no N8N:**

**Na interface do N8N:**

1. **Clicar em "Credentials"** (barra lateral)
2. **Clicar em "Add Credential"**
3. **Adicionar uma por uma:**

---

### **API 1: Hunter.io (validar email)**

**Tipo:** HTTP Header Auth

**Nome:** `hunterApiKey`

**Configuração:**
```
Name: Authorization
Value: Bearer SEU_HUNTER_API_KEY_AQUI
```

**Onde conseguir a chave:**
1. Criar conta em https://hunter.io/users/sign_up
2. Ir em **API** → **API Keys**
3. Copiar a chave

**Custo:** $49/mês (1k verificações)

---

### **API 2: Proxycurl (LinkedIn)**

**Tipo:** HTTP Header Auth

**Nome:** `proxycurlAuth`

**Configuração:**
```
Name: Authorization
Value: Bearer SEU_PROXYCURL_API_KEY_AQUI
```

**Onde conseguir:**
1. Criar conta em https://nubela.co/proxycurl/
2. Dashboard → API Key
3. Copiar

**Custo:** $29/mês (3k buscas)

---

### **API 3: Clearbit (dados da empresa)**

**Tipo:** HTTP Header Auth

**Nome:** `clearbitAuth`

**Configuração:**
```
Name: Authorization
Value: Bearer SEU_CLEARBIT_API_KEY_AQUI
```

**Onde conseguir:**
1. Criar conta em https://clearbit.com/
2. API Settings
3. Copiar

**Custo:** $99/mês (2.5k buscas)

---

### **API 4: Google Custom Search**

**Tipo:** Generic Credential Type

**Nome:** `googleApiKey` e `googleSearchEngineId`

**Configuração:**
```
googleApiKey: SUA_GOOGLE_API_KEY
googleSearchEngineId: SEU_CUSTOM_SEARCH_ENGINE_ID
```

**Onde conseguir:**
1. Ir em https://console.developers.google.com/
2. Criar projeto
3. Ativar "Custom Search API"
4. Criar credenciais (API Key)
5. Ir em https://cse.google.com/cse/
6. Criar Custom Search Engine
7. Copiar o ID

**Custo:** $5 por 1k buscas

---

### **APIs GRÁTIS (não precisa cadastrar):**

- ✅ **ipapi.co** - Geolocalização (1k/dia grátis)
- ✅ **AbuseIPDB** - Blacklist (1k/dia grátis)
- ✅ **StopForumSpam** - Blacklist emails (grátis)

---

## **🔗 PASSO 5: Conectar ao Backoffice**

### **5.1. Copiar URL do Webhook:**

No N8N, clicar no nó **"Webhook - Novo Lead"** e copiar a URL:

```
http://localhost:5678/webhook/lead-intelligence
```

*(Ou se estiver em produção: `https://n8n.azmt.com.br/webhook/lead-intelligence`)*

---

### **5.2. Adicionar ao backoffice:**

Editar arquivo:
```
azimut-cms/app/api/leads/route.ts
```

Trocar:
```typescript
// ANTES (envio direto):
fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/notify-form`, {
  method: 'POST',
  ...
});
```

Por:
```typescript
// DEPOIS (via N8N):
const N8N_WEBHOOK_URL = process.env.N8N_LEAD_INTELLIGENCE_WEBHOOK || 
  'http://localhost:5678/webhook/lead-intelligence';

fetch(N8N_WEBHOOK_URL, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id: lead.id,
    name: data.name,
    email: data.email,
    phone: data.phone,
    company: data.company,
    ip: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip'),
    // ... outros campos
  })
}).catch(err => {
  console.warn('N8N webhook failed (non-critical):', err);
});
```

---

### **5.3. Adicionar variável de ambiente:**

Criar/editar arquivo `.env` no `azimut-cms`:

```bash
N8N_LEAD_INTELLIGENCE_WEBHOOK=http://localhost:5678/webhook/lead-intelligence
```

---

## **🧪 PASSO 6: Testar**

### **6.1. Teste manual no N8N:**

1. **Clicar em "Execute Workflow"** (botão play no topo)
2. **Inserir dados de teste:**
```json
{
  "name": "João Silva",
  "email": "joao@teste.com",
  "phone": "+5521999999999",
  "company": "Teste Ltda",
  "ip": "177.34.123.45"
}
```
3. **Ver o resultado** em cada nó

---

### **6.2. Teste real (do site):**

1. **Preencher formulário** no seu site
2. **Verificar no N8N** se o webhook foi acionado
3. **Ver os dados** sendo processados
4. **Conferir no banco** se `leadIntelligence` foi preenchido

Query para conferir:
```sql
SELECT id, name, email, 
       leadIntelligence->>'classification' as classification,
       leadIntelligence->>'riskScore' as risk
FROM "Lead" 
ORDER BY "createdAt" DESC 
LIMIT 1;
```

---

## **📊 PASSO 7: Monitorar**

### **Ver execuções no N8N:**

1. **Ir em "Executions"** (barra lateral)
2. **Ver histórico** de todas as execuções
3. **Clicar em uma execução** para ver detalhes
4. **Ver erros** (se houver)

### **Logs úteis:**

```bash
# Ver logs do container N8N
docker logs azimut-n8n -f

# Ver últimas 50 linhas
docker logs azimut-n8n --tail 50
```

---

## **🚀 PASSO 8: Deploy em Produção**

### **Opção A: Self-hosted (VPS)**

```bash
# 1. No seu servidor (VPS):
cd /var/www/azimut-n8n
docker-compose up -d

# 2. Configurar proxy reverso (Nginx):
server {
    listen 443 ssl;
    server_name n8n.azmt.com.br;
    
    location / {
        proxy_pass http://localhost:5678;
        proxy_set_header Host $host;
    }
}

# 3. Atualizar webhook URL no .env:
N8N_LEAD_INTELLIGENCE_WEBHOOK=https://n8n.azmt.com.br/webhook/lead-intelligence
```

---

### **Opção B: N8N Cloud (pago)**

1. Criar conta em https://n8n.io/cloud
2. Importar workflow
3. Configurar credenciais
4. Usar webhook URL fornecido pela N8N Cloud

**Custo:** $20/mês (plano básico)

---

## **💰 Resumo de Custos**

### **Mínimo (essencial):**
- N8N: **$0** (self-hosted) ou **$20/mês** (cloud)
- Hunter.io: **$49/mês**
- AbuseIPDB: **$0** (grátis)

**Total mínimo:** $49-69/mês

---

### **Completo (recomendado):**
- N8N: **$0** (self-hosted)
- Hunter.io: **$49/mês**
- Proxycurl: **$29/mês**
- Clearbit: **$99/mês**
- Google Search: **~$10/mês**
- AbuseIPDB: **$0** (grátis)

**Total completo:** **~$187/mês**

---

## **🆘 Problemas Comuns**

### **N8N não inicia:**
```bash
# Verificar se Docker está rodando
docker ps

# Reiniciar N8N
docker-compose restart

# Ver logs de erro
docker logs azimut-n8n
```

---

### **Webhook não responde:**
```bash
# Verificar se porta 5678 está aberta
netstat -an | findstr 5678

# Testar webhook manualmente
curl -X POST http://localhost:5678/webhook/lead-intelligence \
  -H "Content-Type: application/json" \
  -d '{"name":"Teste","email":"teste@exemplo.com"}'
```

---

### **API retorna erro:**
- Verificar se credenciais estão corretas
- Verificar se há saldo/créditos na API
- Ver logs no N8N (Executions → Ver detalhes)

---

## **📚 Próximos Passos**

1. ✅ Iniciar N8N (`docker-compose up -d`)
2. ✅ Acessar `http://localhost:5678`
3. ✅ Importar workflow
4. ✅ Configurar APIs (pelo menos Hunter.io)
5. ✅ Conectar ao backoffice
6. ✅ Testar com lead fake
7. ✅ Monitorar primeiros 10 leads reais

---

**Quer que eu te ajude a iniciar o N8N agora?**
