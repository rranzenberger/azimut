# 🚀 PRÓXIMOS PASSOS - Finalizar Configuração

## ✅ O QUE JÁ TEMOS:

- ✅ n8n deployado e funcionando
- ✅ Workflow importado com 7 nós
- ✅ Variáveis de ambiente configuradas (SERPAPI_KEY, CLAUDE_API_KEY, RESEND_API_KEY)

---

## 🎯 O QUE FAZER AGORA (3 Passos):

### PASSO 1: Corrigir Avisos (5 minutos)

#### 1.1: Corrigir SerpAPI

1. **Clique no nó "SerpAPI"**
2. **Verifique se o parâmetro `api_key` está usando:** `{{ $env.SERPAPI_KEY }}`
3. **Se não estiver, edite e coloque:** `{{ $env.SERPAPI_KEY }}`
4. **Clique em "Save"**

#### 1.2: Configurar PostgreSQL

1. **Clique no nó "PostgreSQL"**
2. **Clique em "Credential"** → **"Create New"**
3. **Preencha:**
   - **Host:** (do Neon - ex: `ep-xxx.us-east-2.aws.neon.tech`)
   - **Database:** (nome do banco)
   - **User:** (usuário)
   - **Password:** (senha)
   - **Port:** `5432`
   - **SSL:** `require`
4. **Clique em "Test"**
5. **Clique em "Save"**

---

### PASSO 2: Ativar e Testar Workflow (5 minutos)

#### 2.1: Salvar Workflow

1. **Clique no botão "Save"** (vermelho, canto superior direito)

#### 2.2: Ativar Workflow

1. **No canto superior direito**, procure o toggle **"Inactive"**
2. **Clique nele** para mudar para **"Active"**
3. **✅ Workflow está ativo!**

#### 2.3: Pegar URL do Webhook

1. **Clique no nó "Webhook"**
2. **Veja a URL** que aparece (ex: `https://n8n-production-dce3.up.railway.app/webhook/lead-enrichment`)
3. **Copie esta URL** e guarde

#### 2.4: Testar Workflow

1. **Clique no nó "Webhook"**
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

4. **Clique em "Execute Workflow"** (botão vermelho na parte inferior)
5. **Veja os resultados** em cada nó
6. **Verifique se chegou até o PostgreSQL** sem erros

---

### PASSO 3: Integrar com o Site (10 minutos)

#### 3.1: Adicionar Código no Site

**Precisamos criar uma função no site para enviar leads para o n8n.**

**Arquivo:** `src/api/enrichment.ts` (já existe!)

**Verificar se está correto:**

```typescript
const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || 'https://n8n-production-dce3.up.railway.app/webhook/lead-enrichment';

export const submitLeadForEnrichment = async (leadData: {
  id: string;
  email: string;
  name?: string;
  company?: string;
  phone?: string;
  lang?: string;
}) => {
  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    });

    if (!response.ok) {
      throw new Error(`Failed to submit lead for enrichment: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting lead for enrichment:', error);
    throw error;
  }
};
```

#### 3.2: Adicionar Variável de Ambiente no Vercel

1. **Acesse Vercel:** https://vercel.com
2. **Vá em seu projeto "azimut"**
3. **Vá em "Settings"** → **"Environment Variables"**
4. **Adicione:**
   - **Name:** `VITE_N8N_WEBHOOK_URL`
   - **Value:** `https://n8n-production-dce3.up.railway.app/webhook/lead-enrichment`
5. **Salve**

#### 3.3: Chamar no Formulário

**Quando um lead preencher o formulário, chamar:**

```typescript
import { submitLeadForEnrichment } from '@/api/enrichment';

// Depois de salvar o lead no banco
await submitLeadForEnrichment({
  id: lead.id,
  email: lead.email,
  name: lead.name,
  company: lead.company,
  phone: lead.phone,
  lang: lang
});
```

---

## 📋 CHECKLIST COMPLETO:

### Configuração n8n:
- [ ] SerpAPI corrigido
- [ ] PostgreSQL configurado e testado
- [ ] Workflow salvo
- [ ] Workflow ativado
- [ ] URL do webhook copiada
- [ ] Workflow testado com dados de exemplo

### Integração Site:
- [ ] Variável `VITE_N8N_WEBHOOK_URL` adicionada no Vercel
- [ ] Código `enrichment.ts` verificado
- [ ] Função chamada no formulário de contato
- [ ] Testado envio de lead real

---

## 🎯 PRÓXIMOS PASSOS (Depois de Funcionar):

### 1. Monitorar Execuções

1. **No n8n**, vá na aba **"Executions"**
2. **Veja os workflows executados**
3. **Verifique se estão funcionando corretamente**

### 2. Ajustar Prompts do Claude (Opcional)

1. **Clique no nó "Claude AI"**
2. **Ajuste o prompt** se quiser personalizar mais
3. **Salve e teste novamente**

### 3. Criar Workflow de Email (Próxima Fase)

1. **Criar workflow separado** para enviar emails personalizados
2. **Usar Resend** para envio
3. **Usar dados enriquecidos** do lead

### 4. Integrar com Chatbot

1. **Atualizar contexto do chatbot** com dados enriquecidos
2. **Usar small talk personalizado** nas conversas

---

## 🧪 TESTAR COMPLETO:

### 1. Enviar Lead de Teste

**Use Postman, curl, ou o próprio n8n:**

```bash
curl -X POST https://n8n-production-dce3.up.railway.app/webhook/lead-enrichment \
  -H "Content-Type: application/json" \
  -d '{
    "id": "test-456",
    "email": "maria.silva@exemplo.com",
    "name": "Maria Silva",
    "company": "Museu de Arte",
    "phone": "+5511987654321",
    "lang": "pt"
  }'
```

### 2. Verificar no Banco

1. **Acesse Neon Console**
2. **Execute query:**
```sql
SELECT id, email, name, enriched_profile, lead_score, decision_power 
FROM "Lead" 
WHERE id = 'test-456';
```

3. **Verifique se os dados foram enriquecidos**

---

## 💡 DICAS:

- **Salve sempre:** Use Ctrl+S ou clique em "Save"
- **Teste cada etapa:** Não pule os testes
- **Monitore execuções:** Veja se há erros
- **Ajuste conforme necessário:** O sistema é flexível

---

## 🆘 SE TIVER PROBLEMAS:

### Erro no SerpAPI:
- Verifique se `SERPAPI_KEY` está no Railway
- Verifique se a API key está válida

### Erro no Claude:
- Verifique se `CLAUDE_API_KEY` está no Railway
- Verifique se tem créditos na conta Claude

### Erro no PostgreSQL:
- Verifique credenciais
- Verifique se o banco está acessível
- Verifique se SSL está como "require"

### Workflow não executa:
- Verifique se está ativado
- Verifique os logs em "Executions"
- Teste cada nó individualmente

---

## 🎉 RESUMO:

**AGORA:**
1. ⏳ Corrigir 2 avisos (SerpAPI e PostgreSQL)
2. ⏳ Ativar workflow
3. ⏳ Testar com dados de exemplo
4. ⏳ Integrar com site

**DEPOIS:**
- ⏳ Monitorar execuções
- ⏳ Criar workflow de email
- ⏳ Integrar com chatbot

---

**Siga os 3 passos acima e me avise quando terminar ou se tiver alguma dúvida!** 🚀
