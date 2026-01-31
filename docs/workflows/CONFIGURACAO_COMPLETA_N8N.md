# 🚀 Configuração Completa do Workflow n8n - Copy & Paste

## 📋 WORKFLOW: "Enriquecimento Automático de Lead"

**URL do seu workflow:** `https://n8n-production-dce3.up.railway.app/workflow/of7Eei71oSXKZCQQCpb8R`

---

## 🎯 NÓ 1: WEBHOOK (Trigger)

### Configuração:

**HTTP Method:** `POST`

**Path:** `/webhook/lead-enrichment`

**Response Mode:** `Last Node`

**Authentication:** `None`

**Options:**
- ✅ Ignore SSL Issues: `false`
- ✅ Response Data: `All Entries`

---

## 🎯 NÓ 2: SET (Extrair Dados)

### Adicionar Nó:
1. Clique no **"+"** após o Webhook
2. Busque: `Set`
3. Selecione: **"Set"**

### Configuração - Values to Set:

**Adicione cada campo clicando em "Add Value":**

1. **Name:** `leadId`
   - **Value:** `{{ $json.body.id || $json.id }}`

2. **Name:** `email`
   - **Value:** `{{ $json.body.email || $json.email }}`

3. **Name:** `name`
   - **Value:** `{{ $json.body.name || $json.name }}`

4. **Name:** `company`
   - **Value:** `{{ $json.body.company || $json.company }}`

5. **Name:** `phone`
   - **Value:** `{{ $json.body.phone || $json.phone }}`

6. **Name:** `lang`
   - **Value:** `{{ $json.body.lang || $json.lang || 'pt' }}`

**Options:**
- Keep Only Set Fields: `false`
- Dot Notation: `true`

---

## 🎯 NÓ 3: HTTP REQUEST - SerpAPI (Buscar Informações)

### Adicionar Nó:
1. Clique no **"+"** após o Set
2. Busque: `HTTP Request`
3. Selecione: **"HTTP Request"**

### Configuração:

**Method:** `GET`

**URL:** `https://serpapi.com/search`

**Authentication:** `Generic Credential Type`
- **Credential Type:** `Query Auth`
- **Name:** `api_key`
- **Value:** `{{ $env.SERPAPI_KEY }}`

**Query Parameters:**
Adicione cada parâmetro:

1. **Name:** `q`
   - **Value:** `{{ $json.name }} {{ $json.company }}`

2. **Name:** `engine`
   - **Value:** `google`

3. **Name:** `gl`
   - **Value:** `{{ $json.lang === 'en' ? 'ca' : $json.lang === 'pt' ? 'br' : $json.lang === 'es' ? 'es' : 'fr' }}`

4. **Name:** `api_key`
   - **Value:** `{{ $env.SERPAPI_KEY }}`

**Options:**
- Response Format: `JSON`
- Ignore SSL Issues: `false`

---

## 🎯 NÓ 4: CODE - Processar Dados SerpAPI

### Adicionar Nó:
1. Clique no **"+"** após o SerpAPI
2. Busque: `Code`
3. Selecione: **"Code"** → **"JavaScript"**

### Configuração - Código:

```javascript
// Processar dados do SerpAPI e extrair informações relevantes
const serpData = $input.item.json;
const leadData = $('Set').item.json;

// Extrair informações relevantes
const results = {
  organic_results: serpData.organic_results || [],
  people_also_search_for: serpData.people_also_search_for || [],
  knowledge_graph: serpData.knowledge_graph || {},
  related_questions: serpData.related_questions || []
};

// Extrair LinkedIn URL se disponível
let linkedinUrl = null;
if (serpData.organic_results) {
  for (const result of serpData.organic_results) {
    if (result.link && result.link.includes('linkedin.com/in/')) {
      linkedinUrl = result.link;
      break;
    }
  }
}

// Extrair cidade/empresa de resultados
let detectedCity = null;
let detectedCompany = leadData.company || null;

if (serpData.knowledge_graph && serpData.knowledge_graph.address) {
  detectedCity = serpData.knowledge_graph.address;
}

// Combinar dados
return {
  json: {
    leadData: leadData,
    serpResults: results,
    linkedinUrl: linkedinUrl,
    detectedCity: detectedCity,
    detectedCompany: detectedCompany,
    searchQuery: `${leadData.name} ${leadData.company}`
  }
};
```

---

## 🎯 NÓ 5: HTTP REQUEST - Claude AI (Análise de Perfil)

### Adicionar Nó:
1. Clique no **"+"** após o Code
2. Busque: `HTTP Request`
3. Selecione: **"HTTP Request"**

### Configuração:

**Method:** `POST`

**URL:** `https://api.anthropic.com/v1/messages`

**Authentication:** `Header Auth`

**Headers:**
Adicione cada header:

1. **Name:** `x-api-key`
   - **Value:** `{{ $env.CLAUDE_API_KEY }}`

2. **Name:** `anthropic-version`
   - **Value:** `2023-06-01`

3. **Name:** `content-type`
   - **Value:** `application/json`

**Body Content Type:** `JSON`

**Body (JSON):**

```json
{
  "model": "claude-3-5-sonnet-20241022",
  "max_tokens": 2000,
  "messages": [
    {
      "role": "user",
      "content": "Analise o perfil do lead com base nos seguintes dados:\n\n**Dados do Lead:**\n- Nome: {{ $json.leadData.name }}\n- Email: {{ $json.leadData.email }}\n- Empresa: {{ $json.leadData.company }}\n- Telefone: {{ $json.leadData.phone }}\n- Idioma: {{ $json.leadData.lang }}\n\n**Resultados da Busca Google:**\n{{ JSON.stringify($json.serpResults, null, 2) }}\n\n**LinkedIn:** {{ $json.linkedinUrl || 'Não encontrado' }}\n\n**Tarefa:**\nAnalise todas as informações e identifique:\n\n1. **Interesses Pessoais:** Esportes favoritos, hobbies, origem/cidade, times, atividades\n2. **Perfil Profissional:** Cargo atual, área de atuação, nível hierárquico\n3. **Poder de Decisão:** Alto, Médio ou Baixo (baseado em cargo e empresa)\n4. **Tom de Comunicação Ideal:** Formal, Semiformal, Casual, Técnico\n5. **Small Talk Personalizado:** 2-3 tópicos para iniciar conversa (ex: \"Vi que você é fã do Flamengo...\")\n6. **Abordagem Recomendada:** Estratégia de comunicação (ex: \"Focar em ROI\", \"Enfatizar inovação\")\n7. **Score do Lead:** 0-100 (baseado em poder de decisão, empresa, interesse)\n\n**Formato de Resposta (JSON):**\n```json\n{\n  \"interests\": {\n    \"sports\": \"\",\n    \"hobbies\": \"\",\n    \"origin\": \"\",\n    \"teams\": \"\"\n  },\n  \"role\": \"\",\n  \"decisionPower\": \"Alto|Médio|Baixo\",\n  \"communicationTone\": \"Formal|Semiformal|Casual|Técnico\",\n  \"smallTalk\": [\"\", \"\"],\n  \"recommendedApproach\": \"\",\n  \"leadScore\": 0\n}\n```\n\nRetorne APENAS o JSON, sem markdown ou explicações adicionais."
    }
  ]
}
```

**Options:**
- Response Format: `JSON`
- Ignore SSL Issues: `false`

---

## 🎯 NÓ 6: CODE - Processar Resposta Claude

### Adicionar Nó:
1. Clique no **"+"** após o Claude
2. Busque: `Code`
3. Selecione: **"Code"** → **"JavaScript"**

### Configuração - Código:

```javascript
// Processar resposta do Claude e extrair JSON
const claudeResponse = $input.item.json;
const previousData = $('Code').item.json;

// Extrair texto da resposta do Claude
let analysisText = '';
if (claudeResponse.content && claudeResponse.content[0]) {
  analysisText = claudeResponse.content[0].text;
} else if (claudeResponse.body && claudeResponse.body.content) {
  analysisText = claudeResponse.body.content[0].text;
} else {
  analysisText = JSON.stringify(claudeResponse);
}

// Tentar extrair JSON da resposta
let analysis = {};
try {
  // Remover markdown code blocks se houver
  const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    analysis = JSON.parse(jsonMatch[0]);
  } else {
    analysis = JSON.parse(analysisText);
  }
} catch (e) {
  // Se falhar, criar estrutura básica
  analysis = {
    interests: {},
    role: 'Não identificado',
    decisionPower: 'Médio',
    communicationTone: 'Semiformal',
    smallTalk: [],
    recommendedApproach: 'Abordagem padrão',
    leadScore: 50
  };
}

// Combinar todos os dados
return {
  json: {
    leadId: previousData.leadData.id || previousData.leadData.leadId,
    email: previousData.leadData.email,
    name: previousData.leadData.name,
    company: previousData.leadData.company,
    phone: previousData.leadData.phone,
    enrichedProfile: analysis,
    conversationContext: JSON.stringify(analysis),
    recommendedApproach: analysis.recommendedApproach || 'Abordagem padrão',
    leadScore: analysis.leadScore || 50,
    decisionPower: analysis.decisionPower || 'Médio',
    detectedCity: previousData.detectedCity,
    detectedCompany: previousData.detectedCompany,
    linkedinUrl: previousData.linkedinUrl,
    enrichmentStatus: 'completed'
  }
};
```

---

## 🎯 NÓ 7: PostgreSQL - Salvar Dados Enriquecidos

### Adicionar Nó:
1. Clique no **"+"** após o Code
2. Busque: `PostgreSQL`
3. Selecione: **"PostgreSQL"**

### Configuração:

**Operation:** `Execute Query`

**Query:**

```sql
UPDATE "Lead" 
SET 
  enriched_profile = $1::jsonb,
  conversation_context = $2,
  recommended_approach = $3,
  enrichment_status = $4,
  enriched_at = NOW(),
  lead_score = $5,
  decision_power = $6,
  detected_city = $7,
  detected_company = $8,
  linkedin_url = $9
WHERE id = $10
```

**Parameters:**
Adicione cada parâmetro na ordem:

1. `{{ JSON.stringify($json.enrichedProfile) }}`
2. `{{ $json.conversationContext }}`
3. `{{ $json.recommendedApproach }}`
4. `completed`
5. `{{ $json.leadScore }}`
6. `{{ $json.decisionPower }}`
7. `{{ $json.detectedCity || null }}`
8. `{{ $json.detectedCompany || null }}`
9. `{{ $json.linkedinUrl || null }}`
10. `{{ $json.leadId }}`

**Nota:** Você precisará configurar a conexão com o banco Neon primeiro!

---

## 🔧 CONFIGURAR CONEXÃO POSTGRESQL:

### No n8n:

1. **Clique no nó PostgreSQL**
2. **Clique em "Credential"** → **"Create New"**
3. **Preencha:**
   - **Host:** (do seu Neon - ex: `ep-xxx.us-east-2.aws.neon.tech`)
   - **Database:** (nome do banco)
   - **User:** (usuário do Neon)
   - **Password:** (senha do Neon)
   - **Port:** `5432`
   - **SSL:** `require`

4. **Teste a conexão** e salve

---

## ✅ CHECKLIST FINAL:

- [ ] Nó 1: Webhook configurado
- [ ] Nó 2: Set configurado
- [ ] Nó 3: SerpAPI configurado
- [ ] Nó 4: Code (processar SerpAPI) configurado
- [ ] Nó 5: Claude AI configurado
- [ ] Nó 6: Code (processar Claude) configurado
- [ ] Nó 7: PostgreSQL configurado
- [ ] Conexão PostgreSQL testada
- [ ] Workflow salvo
- [ ] Workflow ativado

---

## 🧪 TESTAR WORKFLOW:

### Dados de Teste:

```json
{
  "id": "test-123",
  "email": "joao.silva@exemplo.com",
  "name": "João Silva",
  "company": "Tech Solutions",
  "phone": "+5511999999999",
  "lang": "pt"
}
```

### Como Testar:

1. **Clique no nó Webhook**
2. **Clique em "Test"** ou "Execute Node"
3. **Cole os dados de teste acima**
4. **Execute o workflow**
5. **Verifique os resultados** em cada nó

---

## 💡 DICAS:

- **Salve frequentemente:** Ctrl+S
- **Teste cada nó individualmente:** Clique no nó → "Execute Node"
- **Veja os logs:** Em caso de erro, verifique os logs
- **Ajuste conforme necessário:** Os valores podem variar dependendo da estrutura dos dados

---

**Copie e cole cada configuração no n8n e me avise se tiver alguma dúvida!** 🚀
