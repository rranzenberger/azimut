# 🚀 Criar Primeiro Workflow no n8n

## 🎉 PARABÉNS!

Você está no **dashboard do n8n**! Agora vamos criar o workflow de **Captação Inteligente com IA**.

---

## 📋 O QUE VAMOS CRIAR:

**Workflow: "Enriquecimento Automático de Lead"**

Este workflow vai:
1. ✅ Receber novos leads via webhook
2. ✅ Buscar informações públicas (SerpAPI)
3. ✅ Analisar perfil com Claude AI
4. ✅ Salvar dados enriquecidos no banco
5. ✅ Gerar contexto para comunicação personalizada

---

## 🎯 PASSO 1: Criar Novo Workflow

### 1.1: Iniciar Workflow

1. **Clique em "Start from scratch"** (card no centro)
   - Ou clique no ícone **"+"** no canto superior esquerdo
   - Ou vá em **"Workflows"** → **"New Workflow"**

2. **Você verá uma tela em branco** com um nó inicial

---

## 🎯 PASSO 2: Configurar Webhook (Trigger)

### 2.1: Adicionar Nó Webhook

1. **Clique no nó inicial** (geralmente "When clicking 'Test' button")
2. **Procure por "Webhook"** na busca
3. **Selecione "Webhook"** → **"Webhook"** (não "Wait for Webhook")

### 2.2: Configurar Webhook

**Na configuração do Webhook:**

1. **HTTP Method:** `POST`
2. **Path:** `/webhook/lead-enrichment`
3. **Response Mode:** `Last Node`
4. **Authentication:** `None` (por enquanto)

**Clique em "Save"**

### 2.3: Ativar Webhook

1. **Clique no botão "Active"** no canto superior direito (toggle)
2. **Copie a URL do webhook** que aparece (ex: `https://n8n-production-dce3.up.railway.app/webhook/lead-enrichment`)
3. **Guarde esta URL** - você vai usar no site para enviar leads

---

## 🎯 PASSO 3: Adicionar Nó Set (Extrair Dados)

### 3.1: Adicionar Nó Set

1. **Clique no "+"** após o nó Webhook
2. **Procure por "Set"**
3. **Selecione "Set"**

### 3.2: Configurar Set

**Na aba "Values to Set":**

Adicione os seguintes campos (um por um):

1. **Name:** `leadId`
   - **Value:** `{{ $json.body.id }}` ou `{{ $json.id }}`

2. **Name:** `email`
   - **Value:** `{{ $json.body.email }}` ou `{{ $json.email }}`

3. **Name:** `name`
   - **Value:** `{{ $json.body.name }}` ou `{{ $json.name }}`

4. **Name:** `company`
   - **Value:** `{{ $json.body.company }}` ou `{{ $json.company }}`

5. **Name:** `phone`
   - **Value:** `{{ $json.body.phone }}` ou `{{ $json.phone }}`

**Clique em "Save"**

---

## 🎯 PASSO 4: Adicionar Nó SerpAPI (Buscar Informações)

### 4.1: Adicionar Nó HTTP Request

1. **Clique no "+"** após o nó Set
2. **Procure por "HTTP Request"**
3. **Selecione "HTTP Request"**

### 4.2: Configurar HTTP Request para SerpAPI

**Na configuração:**

1. **Method:** `GET`
2. **URL:** `https://serpapi.com/search`
3. **Authentication:** `Generic Credential Type`
   - **Credential Type:** `Header Auth`
   - **Name:** `api_key`
   - **Value:** `{{ $env.SERPAPI_KEY }}`

4. **Query Parameters:**
   - **q:** `{{ $json.name }} {{ $json.company }}`
   - **engine:** `google`
   - **gl:** `br` (ou `ca` dependendo do lead)
   - **api_key:** `{{ $env.SERPAPI_KEY }}`

**Clique em "Save"**

---

## 🎯 PASSO 5: Adicionar Nó Claude AI (Análise de Perfil)

### 5.1: Adicionar Nó HTTP Request

1. **Clique no "+"** após o nó SerpAPI
2. **Procure por "HTTP Request"**
3. **Selecione "HTTP Request"**

### 5.2: Configurar HTTP Request para Claude

**Na configuração:**

1. **Method:** `POST`
2. **URL:** `https://api.anthropic.com/v1/messages`
3. **Authentication:** `Header Auth`
   - **Name:** `x-api-key`
   - **Value:** `{{ $env.CLAUDE_API_KEY }}`
   - **Name:** `anthropic-version`
   - **Value:** `2023-06-01`
   - **Name:** `content-type`
   - **Value:** `application/json`

4. **Body (JSON):**
```json
{
  "model": "claude-3-5-sonnet-20241022",
  "max_tokens": 2000,
  "messages": [
    {
      "role": "user",
      "content": "Analise o perfil do lead com base nos seguintes dados:\n\nNome: {{ $json.name }}\nEmail: {{ $json.email }}\nEmpresa: {{ $json.company }}\nTelefone: {{ $json.phone }}\n\nResultados da busca Google:\n{{ JSON.stringify($('SerpAPI').item.json) }}\n\nIdentifique:\n1. Interesses pessoais (esportes, hobbies, origem)\n2. Cargo e poder de decisão\n3. Tom de comunicação ideal\n4. Small talk personalizado\n5. Abordagem recomendada\n\nRetorne em JSON com: interests, role, decisionPower, communicationTone, smallTalk, recommendedApproach"
    }
  ]
}
```

**Clique em "Save"**

---

## 🎯 PASSO 6: Adicionar Nó PostgreSQL (Salvar Dados)

### 6.1: Adicionar Nó PostgreSQL

1. **Clique no "+"** após o nó Claude
2. **Procure por "PostgreSQL"**
3. **Selecione "PostgreSQL"**

### 6.2: Configurar PostgreSQL

**Na configuração:**

1. **Operation:** `Execute Query`
2. **Query:**
```sql
UPDATE "Lead" 
SET 
  enriched_profile = $1::jsonb,
  conversation_context = $2,
  recommended_approach = $3,
  enrichment_status = 'completed',
  enriched_at = NOW(),
  lead_score = $4,
  decision_power = $5,
  detected_city = $6,
  detected_company = $7
WHERE id = $8
```

3. **Parameters:**
   - `$1`: `{{ JSON.stringify($json.body.content[0].text) }}`
   - `$2`: `{{ $json.body.content[0].text }}`
   - `$3`: `{{ $json.body.content[0].text }}`
   - `$4`: `50` (score inicial)
   - `$5`: `{{ $json.body.content[0].text }}`
   - `$6`: `{{ $json.body.content[0].text }}`
   - `$7`: `{{ $('Set').item.json.company }}`
   - `$8`: `{{ $('Set').item.json.leadId }}`

**Nota:** Você precisará configurar a conexão com o banco Neon primeiro!

---

## 🎯 PASSO 7: Testar Workflow

### 7.1: Ativar Workflow

1. **Clique no toggle "Active"** no canto superior direito
2. **Workflow está ativo!**

### 7.2: Testar Manualmente

1. **Clique no nó Webhook**
2. **Clique em "Test"** ou "Execute Node"
3. **Envie dados de teste:**
```json
{
  "id": "test-123",
  "email": "teste@exemplo.com",
  "name": "João Silva",
  "company": "Empresa Teste",
  "phone": "+5511999999999"
}
```

4. **Execute o workflow** e veja os resultados

---

## ✅ CHECKLIST:

- [ ] Criar novo workflow
- [ ] Configurar Webhook
- [ ] Adicionar nó Set
- [ ] Adicionar nó SerpAPI
- [ ] Adicionar nó Claude AI
- [ ] Adicionar nó PostgreSQL
- [ ] Testar workflow
- [ ] Ativar workflow

---

## 🎯 PRÓXIMOS PASSOS (Depois de Criar):

1. **Configurar conexão com banco Neon**
2. **Ajustar prompts do Claude**
3. **Criar workflow de envio de email**
4. **Integrar com chatbot do site**

---

## 💡 DICAS:

- **Salve frequentemente:** Use Ctrl+S ou clique em "Save"
- **Teste cada nó:** Execute individualmente para verificar
- **Use "Execute Workflow":** Para testar o fluxo completo
- **Veja os logs:** Em caso de erro, verifique os logs de cada nó

---

**Comece criando o workflow e me avise quando chegar em alguma etapa específica!** 🚀
