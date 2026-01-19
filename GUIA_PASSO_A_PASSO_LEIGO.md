# 🚀 GUIA PASSO A PASSO - Para Leigos (Super Detalhado)

## 📋 O QUE VAMOS FAZER:

Vamos criar um workflow no n8n que:
1. Recebe um lead (pessoa interessada)
2. Busca informações sobre ela no Google
3. Usa IA (Claude) para analisar o perfil
4. Salva tudo no banco de dados

**Tempo estimado:** 30-45 minutos

---

## 🎯 PASSO 1: ABRIR SEU WORKFLOW NO N8N

### 1.1: Acessar o n8n

1. **Abra seu navegador** (Chrome, Edge, etc.)
2. **Cole esta URL na barra de endereço:**
   ```
   https://n8n-production-dce3.up.railway.app/workflow/of7Eei71oSXKZCQQCpb8R
   ```
3. **Pressione Enter**
4. **Faça login** se necessário

### 1.2: Verificar se está no editor

Você deve ver:
- Uma tela com um nó (ou tela em branco)
- Botão "Save" no canto superior direito
- Botão "Active" ou "Inactive" no canto superior direito

**✅ Se estiver aqui, pode continuar!**

---

## 🎯 PASSO 2: CRIAR/VERIFICAR NÓ WEBHOOK

### 2.1: Se não tiver nenhum nó ainda

1. **Clique no centro da tela** onde diz "Add first step..."
2. **Digite na busca:** `webhook`
3. **Clique em "Webhook"** (o primeiro resultado)
4. **Um nó aparecerá na tela**

### 2.2: Se já tiver um nó

1. **Clique no nó que já existe**
2. **Verifique se é "Webhook"**
3. **Se não for, delete e crie um novo** (clique no nó → três pontinhos → Delete)

### 2.3: CONFIGURAR O WEBHOOK

**Clique no nó Webhook que está na tela:**

1. **HTTP Method:**
   - Clique no campo que diz "GET" ou "POST"
   - **Selecione:** `POST`

2. **Path:**
   - Clique no campo "Path"
   - **Apague tudo que estiver lá**
   - **Digite exatamente:** `/webhook/lead-enrichment`

3. **Response Mode:**
   - Clique no campo "Response Mode"
   - **Selecione:** `Last Node`

4. **Authentication:**
   - Deixe como está (geralmente "None")

5. **Clique em "Save"** (botão vermelho no canto superior direito)

**✅ Webhook configurado!**

---

## 🎯 PASSO 3: ADICIONAR NÓ "SET" (Extrair Dados)

### 3.1: Adicionar o nó

1. **Olhe para o nó Webhook na tela**
2. **Você verá um pequeno círculo na direita do nó**
3. **Clique nesse círculo** (ou no "+" que aparece)
4. **Uma busca aparecerá**
5. **Digite:** `set`
6. **Clique em "Set"** (o primeiro resultado)
7. **Um novo nó aparecerá conectado ao Webhook**

### 3.2: CONFIGURAR O NÓ SET

**Clique no nó Set que acabou de criar:**

1. **Você verá uma seção "Values to Set"**
2. **Clique no botão "Add Value"** (ou "+ Add Value")

**Agora vamos adicionar 6 campos, um por um:**

#### Campo 1: leadId

1. **Name:** (campo à esquerda)
   - **Digite:** `leadId`
2. **Value:** (campo à direita)
   - **Clique no campo**
   - **Digite exatamente:** `{{ $json.body.id || $json.id }}`
3. **Clique em "Add Value" novamente** para adicionar o próximo

#### Campo 2: email

1. **Name:** `email`
2. **Value:** `{{ $json.body.email || $json.email }}`
3. **Clique em "Add Value"**

#### Campo 3: name

1. **Name:** `name`
2. **Value:** `{{ $json.body.name || $json.name }}`
3. **Clique em "Add Value"**

#### Campo 4: company

1. **Name:** `company`
2. **Value:** `{{ $json.body.company || $json.company }}`
3. **Clique em "Add Value"`

#### Campo 5: phone

1. **Name:** `phone`
2. **Value:** `{{ $json.body.phone || $json.phone }}`
3. **Clique em "Add Value"**

#### Campo 6: lang

1. **Name:** `lang`
2. **Value:** `{{ $json.body.lang || $json.lang || 'pt' }}`
3. **Não precisa clicar em "Add Value" agora**

4. **Clique em "Save"** (botão vermelho no canto superior direito)

**✅ Nó Set configurado!**

---

## 🎯 PASSO 4: ADICIONAR NÓ SERPAPI (Buscar no Google)

### 4.1: Adicionar o nó

1. **Clique no círculo à direita do nó Set**
2. **Digite na busca:** `http`
3. **Clique em "HTTP Request"**
4. **Um novo nó aparecerá**

### 4.2: CONFIGURAR SERPAPI

**Clique no nó HTTP Request:**

1. **Method:**
   - Clique no campo
   - **Selecione:** `GET`

2. **URL:**
   - Clique no campo "URL"
   - **Digite exatamente:** `https://serpapi.com/search`

3. **Authentication:**
   - Clique em "Authentication"
   - **Selecione:** `Generic Credential Type`
   - **Credential Type:** `Query Auth`
   - **Name:** `api_key`
   - **Value:** `{{ $env.SERPAPI_KEY }}`

4. **Query Parameters:**
   - Clique em "Add Parameter" (ou "+ Add Parameter")

   **Adicione 4 parâmetros, um por um:**

   **Parâmetro 1:**
   - **Name:** `q`
   - **Value:** `{{ $json.name }} {{ $json.company }}`

   **Parâmetro 2:**
   - **Name:** `engine`
   - **Value:** `google`

   **Parâmetro 3:**
   - **Name:** `gl`
   - **Value:** `{{ $json.lang === 'en' ? 'ca' : $json.lang === 'pt' ? 'br' : $json.lang === 'es' ? 'es' : 'fr' }}`

   **Parâmetro 4:**
   - **Name:** `api_key`
   - **Value:** `{{ $env.SERPAPI_KEY }}`

5. **Clique em "Save"**

**✅ SerpAPI configurado!**

---

## 🎯 PASSO 5: ADICIONAR NÓ CODE (Processar SerpAPI)

### 5.1: Adicionar o nó

1. **Clique no círculo à direita do nó HTTP Request (SerpAPI)**
2. **Digite na busca:** `code`
3. **Clique em "Code"** → **"JavaScript"**
4. **Um novo nó aparecerá**

### 5.2: CONFIGURAR O CÓDIGO

**Clique no nó Code:**

1. **Você verá um campo grande de texto** (editor de código)
2. **Selecione TODO o texto que estiver lá** (Ctrl+A)
3. **Apague tudo** (Delete)
4. **Cole este código EXATO:**

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

5. **Clique em "Save"**

**✅ Código configurado!**

---

## 🎯 PASSO 6: ADICIONAR NÓ CLAUDE AI (Análise com IA)

### 6.1: Adicionar o nó

1. **Clique no círculo à direita do nó Code**
2. **Digite na busca:** `http`
3. **Clique em "HTTP Request"**
4. **Um novo nó aparecerá**

### 6.2: CONFIGURAR CLAUDE AI

**Clique no nó HTTP Request:**

1. **Method:**
   - **Selecione:** `POST`

2. **URL:**
   - **Digite:** `https://api.anthropic.com/v1/messages`

3. **Authentication:**
   - Clique em "Authentication"
   - **Selecione:** `Header Auth`
   - **Clique em "Add Header"**

   **Adicione 3 headers, um por um:**

   **Header 1:**
   - **Name:** `x-api-key`
   - **Value:** `{{ $env.CLAUDE_API_KEY }}`

   **Header 2:**
   - **Name:** `anthropic-version`
   - **Value:** `2023-06-01`

   **Header 3:**
   - **Name:** `content-type`
   - **Value:** `application/json`

4. **Body Content Type:**
   - **Selecione:** `JSON`

5. **Body (JSON):**
   - Clique no campo grande de texto
   - **Cole este JSON EXATO:**

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

6. **Clique em "Save"**

**✅ Claude AI configurado!**

---

## 🎯 PASSO 7: ADICIONAR NÓ CODE (Processar Resposta Claude)

### 7.1: Adicionar o nó

1. **Clique no círculo à direita do nó HTTP Request (Claude)**
2. **Digite na busca:** `code`
3. **Clique em "Code"** → **"JavaScript"**
4. **Um novo nó aparecerá**

### 7.2: CONFIGURAR O CÓDIGO

**Clique no nó Code:**

1. **Selecione TODO o texto** (Ctrl+A)
2. **Apague tudo** (Delete)
3. **Cole este código EXATO:**

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

4. **Clique em "Save"**

**✅ Código configurado!**

---

## 🎯 PASSO 8: ADICIONAR NÓ POSTGRESQL (Salvar no Banco)

### 8.1: Adicionar o nó

1. **Clique no círculo à direita do último nó Code**
2. **Digite na busca:** `postgres`
3. **Clique em "PostgreSQL"**
4. **Um novo nó aparecerá**

### 8.2: CONFIGURAR POSTGRESQL

**Clique no nó PostgreSQL:**

1. **Operation:**
   - **Selecione:** `Execute Query`

2. **Credential:**
   - **Clique em "Credential"** → **"Create New"**
   - **Preencha os dados do seu banco Neon:**
     - **Host:** (ex: `ep-xxx.us-east-2.aws.neon.tech`)
     - **Database:** (nome do banco)
     - **User:** (usuário)
     - **Password:** (senha)
     - **Port:** `5432`
     - **SSL:** `require`
   - **Clique em "Test"** para testar
   - **Clique em "Save"**

3. **Query:**
   - Clique no campo grande de texto
   - **Cole este SQL EXATO:**

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

4. **Parameters:**
   - Clique em "Add Parameter" (ou "+")
   - **Adicione 10 parâmetros, um por um:**

   **Parâmetro 1:** `{{ JSON.stringify($json.enrichedProfile) }}`
   **Parâmetro 2:** `{{ $json.conversationContext }}`
   **Parâmetro 3:** `{{ $json.recommendedApproach }}`
   **Parâmetro 4:** `completed`
   **Parâmetro 5:** `{{ $json.leadScore }}`
   **Parâmetro 6:** `{{ $json.decisionPower }}`
   **Parâmetro 7:** `{{ $json.detectedCity || null }}`
   **Parâmetro 8:** `{{ $json.detectedCompany || null }}`
   **Parâmetro 9:** `{{ $json.linkedinUrl || null }}`
   **Parâmetro 10:** `{{ $json.leadId }}`

5. **Clique em "Save"**

**✅ PostgreSQL configurado!**

---

## 🎯 PASSO 9: SALVAR E ATIVAR WORKFLOW

### 9.1: Salvar

1. **Clique no botão "Save"** (vermelho, canto superior direito)
2. **Dê um nome ao workflow:**
   - Ex: "Enriquecimento de Lead"
3. **Clique em "Save" novamente**

### 9.2: Ativar

1. **No canto superior direito**, procure o toggle "Inactive"
2. **Clique nele** para mudar para "Active"
3. **O workflow está ativo!**

---

## ✅ CHECKLIST FINAL:

- [ ] Nó 1: Webhook configurado
- [ ] Nó 2: Set configurado (6 campos)
- [ ] Nó 3: SerpAPI configurado
- [ ] Nó 4: Code (processar SerpAPI) configurado
- [ ] Nó 5: Claude AI configurado
- [ ] Nó 6: Code (processar Claude) configurado
- [ ] Nó 7: PostgreSQL configurado
- [ ] Conexão PostgreSQL testada
- [ ] Workflow salvo
- [ ] Workflow ativado

---

## 🧪 TESTAR O WORKFLOW:

### Como Testar:

1. **Clique no nó Webhook**
2. **Clique em "Test"** ou "Execute Node"
3. **Cole estes dados de teste:**

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

4. **Clique em "Execute Workflow"**
5. **Veja os resultados** em cada nó

---

## 💡 DICAS IMPORTANTES:

- **Salve sempre:** Use Ctrl+S ou clique em "Save" frequentemente
- **Teste cada nó:** Clique no nó → "Execute Node" para ver se funciona
- **Copie e cole exatamente:** Não mude nada nos códigos
- **Se der erro:** Me avise qual nó deu erro e qual foi a mensagem

---

## 🆘 SE TIVER DÚVIDAS:

**Me avise:**
- Qual passo você está
- Qual nó está configurando
- Qual erro apareceu (se houver)
- Tire print se necessário

---

**Vá passo a passo, sem pressa! Me avise quando terminar cada nó!** 🚀
