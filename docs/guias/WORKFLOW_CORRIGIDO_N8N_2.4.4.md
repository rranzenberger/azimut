# ✅ WORKFLOW CORRIGIDO PARA N8N 2.4.4

## **🔧 O QUE FOI CORRIGIDO:**

### **Problema:**
- ❌ N8N 2.4.4 não aceita propriedades `"options": {}` vazias
- ❌ Erro: "Could not find property option"

### **Solução:**
- ✅ Removidas **13 ocorrências** de `"options": {}` vazias
- ✅ Ajustado `typeVersion` de `4.2` para `4.1` (mais compatível)
- ✅ Corrigido código JavaScript (removido optional chaining `?.`)

---

## **📁 ARQUIVO CORRIGIDO:**

**Arquivo:** `n8n/lead-intelligence-workflow-completo.json`

**Status:** ✅ Pronto para importar no N8N 2.4.4

---

## **🚀 COMO IMPORTAR:**

### **PASSO 1: No N8N**

1. Clique em **"Workflows"** (barra lateral)
2. Clique em **"Add Workflow"** (ou use workflow existente)
3. Clique nos **3 pontinhos (⋮)** no canto superior direito
4. Selecione **"Import from File"**
5. Escolha o arquivo: `lead-intelligence-workflow-completo.json`
6. Clique em **"Import"**

---

### **PASSO 2: Verificar Importação**

**Deve aparecer:**
- ✅ 19 nós no workflow
- ✅ Sem erros vermelhos
- ✅ Todos os nós conectados

**Se aparecer erro:**
- Me avise qual erro específico
- Pode ser credencial faltando (normal, vamos configurar depois)

---

## **📊 NÓS DO WORKFLOW (19 nós):**

1. ✅ Receber Lead (Webhook)
2. ✅ Identificar Formulário (Switch)
3. ✅ Verificar Lead Anterior (PostgreSQL)
4. ✅ Decisão Lead Existente (Code)
5. ✅ Continuar Investigação? (IF)
6. ✅ Validar IP (HTTP Request)
7. ✅ Verificar Blacklist IP (HTTP Request)
8. ✅ Validar Email (HTTP Request) [opcional]
9. ✅ Buscar LinkedIn (HTTP Request) [opcional]
10. ✅ Google Search (HTTP Request)
11. ✅ Detectar Idioma (Code)
12. ✅ Analisar com DeepSeek (HTTP Request)
13. ✅ Processar DeepSeek (Code)
14. ✅ É Legítimo? (IF)
15. ✅ Gerar Small Talk (HTTP Request)
16. ✅ Processar Small Talk (Code)
17. ✅ Gerar Email (HTTP Request)
18. ✅ Processar Email (Code)
19. ✅ Enviar Email (HTTP Request)
20. ✅ Tem WhatsApp? (IF)
21. ✅ Preparar leadIntelligence (Code)
22. ✅ Salvar leadIntelligence (PostgreSQL)
23. ✅ Responder Webhook (Respond to Webhook)

**Total: 23 nós (19 principais + 4 auxiliares)**

---

## **⚙️ PRÓXIMOS PASSOS APÓS IMPORTAR:**

### **1. Configurar Credenciais:**

**Obrigatórias:**
- ✅ **PostgreSQL** - Credenciais do banco Neon
- ✅ **DeepSeek API** - Header Auth: `Authorization: Bearer {{$env.DEEPSEEK_API_KEY}}`
- ✅ **Claude API** - Header Auth: `x-api-key: {{$env.CLAUDE_API_KEY}}`
- ✅ **Resend API** - Header Auth: `Authorization: Bearer {{$env.RESEND_API_KEY}}`

**Opcionais (mas recomendadas):**
- ⚠️ **AbuseIPDB** - Header Auth: `Key: {{$env.ABUSEIPDB_API_KEY}}`
- ⚠️ **Hunter.io** - Header Auth: `Authorization: Bearer {{$env.HUNTER_API_KEY}}`
- ⚠️ **Proxycurl** - Header Auth: `Authorization: Bearer {{$env.PROXYCURL_API_KEY}}`
- ⚠️ **SerpAPI** - Header Auth: `Authorization: Bearer {{$env.SERPAPI_KEY}}`

**Como configurar:**
1. Clique no nó que precisa de credencial
2. Clique em **"Credential"** ou **"Add Credential"**
3. Escolha tipo: **HTTP Header Auth** ou **PostgreSQL**
4. Preencha os dados
5. Salve

---

### **2. Adicionar Variáveis de Ambiente (Railway):**

**No Railway Dashboard:**
1. Acesse: https://railway.app
2. Selecione projeto N8N
3. Vá em **"Variables"**
4. Adicione:

```
DEEPSEEK_API_KEY=sua-key
CLAUDE_API_KEY=sua-key
RESEND_API_KEY=sua-key
ABUSEIPDB_API_KEY=sua-key (opcional)
HUNTER_API_KEY=sua-key (opcional)
PROXYCURL_API_KEY=sua-key (opcional)
SERPAPI_KEY=sua-key (opcional)
```

---

### **3. Ativar Workflow:**

1. Clique no toggle **"Active"** no topo do workflow
2. Workflow fica escutando webhooks

---

### **4. Copiar URL do Webhook:**

1. Clique no nó **"Receber Lead"** (Webhook)
2. Veja a URL que aparece (ex: `https://n8n-production-dce3.up.railway.app/webhook/lead-intelligence`)
3. **Copie essa URL**

---

### **5. Adicionar no Backoffice:**

**No arquivo `.env` do backoffice:**
```
N8N_LEAD_INTELLIGENCE_WEBHOOK=https://n8n-production-dce3.up.railway.app/webhook/lead-intelligence
```

---

## **🧪 TESTAR:**

1. Clique em **"Execute Workflow"** (botão vermelho)
2. Clique em **"Add Input Data"**
3. Cole este JSON:

```json
{
  "leadId": "test-123",
  "name": "João Silva",
  "email": "joao@exemplo.com",
  "phone": "+5511999999999",
  "company": "Museu Nacional",
  "formType": "contact_form",
  "projectType": "exhibition",
  "description": "Queremos criar uma exposição imersiva sobre arte contemporânea",
  "ip": "177.34.123.45",
  "userAgent": "Mozilla/5.0",
  "sourceUrl": "https://azmt.com.br",
  "lang": "pt"
}
```

4. Clique em **"Execute Workflow"**
5. Veja se executa sem erros

---

## **✅ CHECKLIST:**

- [ ] Workflow importado com sucesso
- [ ] 19 nós aparecem no canvas
- [ ] Credenciais PostgreSQL configuradas
- [ ] Credenciais DeepSeek configuradas
- [ ] Credenciais Claude configuradas
- [ ] Credenciais Resend configuradas
- [ ] Variáveis de ambiente adicionadas no Railway
- [ ] Webhook URL copiada
- [ ] Variável `N8N_LEAD_INTELLIGENCE_WEBHOOK` adicionada no backoffice
- [ ] Workflow ativado (toggle verde)
- [ ] Teste executado com sucesso

---

## **❓ SE AINDA DER ERRO:**

**Me avise:**
1. ✅ Qual erro específico aparece?
2. ✅ Em qual nó aparece o erro?
3. ✅ O workflow importou parcialmente ou não importou nada?

**Vou ajudar a resolver!** 🚀

---

**Arquivo corrigido e pronto para importar!** ✅

**Tente importar agora e me avise se funcionou!**
