# 🚀 INTEGRAR N8N NO SITE - Passo a Passo

## 📋 O QUE VAMOS FAZER:

Integrar o workflow do n8n para que, quando um lead for salvo no site, ele seja automaticamente enriquecido com IA.

---

## 🎯 PASSO 1: Adicionar Função para Chamar n8n

### 1.1: Criar/Atualizar Arquivo `src/api/n8n-enrichment.ts`

**Criar novo arquivo ou atualizar o existente:**

```typescript
// src/api/n8n-enrichment.ts

const N8N_WEBHOOK_URL = import.meta.env.VITE_N8N_WEBHOOK_URL || 
  'https://n8n-production-dce3.up.railway.app/webhook/lead-enrichment'

export interface LeadEnrichmentData {
  id: string
  email: string
  name?: string
  company?: string
  phone?: string
  lang?: string
}

/**
 * Envia lead para enriquecimento no n8n
 * Esta função é chamada DEPOIS que o lead foi salvo no banco
 */
export async function submitLeadForEnrichment(
  leadData: LeadEnrichmentData
): Promise<{ success: boolean; message?: string }> {
  try {
    // Chamar webhook do n8n de forma assíncrona (não bloqueia)
    // Não esperamos resposta para não atrasar o usuário
    fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    }).catch((error) => {
      // Log erro mas não interrompe o fluxo
      console.warn('[n8n] Erro ao enviar lead para enriquecimento:', error)
    })

    return { success: true }
  } catch (error) {
    console.error('[n8n] Erro ao enviar lead para enriquecimento:', error)
    return { 
      success: false, 
      message: 'Erro ao enviar para enriquecimento (não crítico)' 
    }
  }
}
```

**✅ Salve o arquivo**

---

## 🎯 PASSO 2: Adicionar Variável de Ambiente no Vercel

### 2.1: Acessar Vercel

1. **Acesse:** https://vercel.com
2. **Faça login**
3. **Vá em seu projeto "azimut"**

### 2.2: Adicionar Variável

1. **Vá em "Settings"** → **"Environment Variables"**
2. **Clique em "Add New"**
3. **Preencha:**
   - **Name:** `VITE_N8N_WEBHOOK_URL`
   - **Value:** `https://n8n-production-dce3.up.railway.app/webhook/lead-enrichment`
   - **Environment:** Selecione todas (Production, Preview, Development)
4. **Clique em "Save"**

**✅ Variável adicionada!**

---

## 🎯 PASSO 3: Integrar no Formulário Principal (SmartContactForm)

### 3.1: Abrir Arquivo

**Arquivo:** `src/components/SmartContactForm.tsx`

### 3.2: Adicionar Import

**No topo do arquivo, adicione:**

```typescript
import { submitLeadForEnrichment } from '../api/n8n-enrichment'
```

### 3.3: Modificar Função handleSubmit

**Encontre a linha:**
```typescript
await ApiService.submitLead(submitData)
```

**Adicione DEPOIS dessa linha:**

```typescript
await ApiService.submitLead(submitData)

// 🚀 Enriquecimento automático com n8n (não bloqueia)
try {
  // Pegar o leadId da resposta (se disponível)
  const response = await ApiService.submitLead(submitData)
  const leadId = response?.leadId || response?.id || `temp-${Date.now()}`
  
  // Enviar para n8n (assíncrono, não bloqueia)
  submitLeadForEnrichment({
    id: leadId.toString(),
    email: formData.email,
    name: formData.name,
    company: formData.company,
    phone: fullPhone,
    lang: lang
  }).catch((error) => {
    // Não mostrar erro para o usuário, apenas log
    console.warn('Enriquecimento n8n falhou (não crítico):', error)
  })
} catch (enrichmentError) {
  // Não interrompe o fluxo se falhar
  console.warn('Enriquecimento n8n falhou (não crítico):', enrichmentError)
}
```

**OU, se `ApiService.submitLead` não retornar o leadId:**

```typescript
await ApiService.submitLead(submitData)

// 🚀 Enriquecimento automático com n8n (não bloqueia)
// Usar ID temporário baseado em timestamp
submitLeadForEnrichment({
  id: `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  email: formData.email,
  name: formData.name,
  company: formData.company,
  phone: fullPhone,
  lang: lang
}).catch((error) => {
  console.warn('Enriquecimento n8n falhou (não crítico):', error)
})
```

**✅ Salve o arquivo**

---

## 🎯 PASSO 4: Integrar em Outros Formulários (Opcional)

### 4.1: AcademyQuickForm

**Arquivo:** `src/components/AcademyQuickForm.tsx`

**Adicione import:**
```typescript
import { submitLeadForEnrichment } from '../api/n8n-enrichment'
```

**Adicione DEPOIS de:**
```typescript
await ApiService.submitLead(leadData)
```

**Adicione:**
```typescript
// 🚀 Enriquecimento automático com n8n
submitLeadForEnrichment({
  id: `temp-${Date.now()}`,
  email: formData.email,
  name: formData.name,
  company: formData.company,
  phone: formData.phone,
  lang: lang
}).catch((error) => {
  console.warn('Enriquecimento n8n falhou:', error)
})
```

### 4.2: AcademyGameForm

**Arquivo:** `src/components/AcademyGameForm.tsx`

**Mesmo processo acima**

---

## 🎯 PASSO 5: Melhorar - Pegar leadId Real do Backend

### 5.1: Verificar Resposta do Backend

**O backend deve retornar o `leadId` após salvar.**

**Verifique em:** `azimut-cms/app/api/leads/route.ts`

**Deve retornar:**
```typescript
return NextResponse.json({
  success: true,
  leadId: lead.id  // ✅ Isso já existe!
})
```

### 5.2: Atualizar submitLead para Retornar leadId

**Arquivo:** `src/utils/analytics.ts`

**Modifique a função `submitLead`:**

```typescript
export async function submitLead(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  // ... outros campos
}): Promise<{ success: boolean; leadId?: string }> {  // ✅ Adicionar leadId no retorno
  const sessionId = getSessionId();

  const response = await fetch(`${API_URL}/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      sessionId,
      ...data,
      source: {
        url: window.location.href,
        referrer: document.referrer,
        utm_source: new URLSearchParams(window.location.search).get('utm_source'),
        utm_medium: new URLSearchParams(window.location.search).get('utm_medium'),
        utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign'),
      },
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to submit lead');
  }

  const result = await response.json();
  return {
    success: true,
    leadId: result.leadId || result.id  // ✅ Retornar leadId
  };
}
```

### 5.3: Usar leadId Real nos Formulários

**Agora nos formulários, use:**

```typescript
const response = await ApiService.submitLead(submitData)

// 🚀 Enriquecimento automático com n8n
if (response?.leadId) {
  submitLeadForEnrichment({
    id: response.leadId.toString(),
    email: formData.email,
    name: formData.name,
    company: formData.company,
    phone: fullPhone,
    lang: lang
  }).catch((error) => {
    console.warn('Enriquecimento n8n falhou:', error)
  })
}
```

---

## ✅ CHECKLIST COMPLETO:

### Configuração:
- [ ] Arquivo `src/api/n8n-enrichment.ts` criado
- [ ] Variável `VITE_N8N_WEBHOOK_URL` adicionada no Vercel
- [ ] Variável testada (deve aparecer no build)

### Integração:
- [ ] `SmartContactForm.tsx` atualizado
- [ ] `AcademyQuickForm.tsx` atualizado (opcional)
- [ ] `AcademyGameForm.tsx` atualizado (opcional)
- [ ] Função `submitLead` retorna `leadId` (se possível)

### Teste:
- [ ] Deploy no Vercel
- [ ] Testar formulário de contato
- [ ] Verificar execução no n8n (aba "Executions")
- [ ] Verificar dados enriquecidos no banco

---

## 🧪 TESTAR INTEGRAÇÃO:

### 1. Deploy no Vercel

1. **Faça commit das mudanças:**
```bash
git add .
git commit -m "feat: Integrar n8n para enriquecimento automático de leads"
git push
```

2. **Vercel fará deploy automaticamente**

### 2. Testar Formulário

1. **Acesse o site:** https://azmt.com.br
2. **Preencha o formulário de contato**
3. **Envie o formulário**

### 3. Verificar n8n

1. **Acesse n8n:** https://n8n-production-dce3.up.railway.app
2. **Vá em "Executions"** (aba no topo)
3. **Veja se o workflow foi executado**
4. **Verifique se não há erros**

### 4. Verificar Banco de Dados

1. **Acesse Neon Console**
2. **Execute query:**
```sql
SELECT id, email, name, enriched_profile, lead_score, decision_power 
FROM "Lead" 
WHERE email = 'email-do-teste@exemplo.com'
ORDER BY created_at DESC 
LIMIT 1;
```

3. **Verifique se `enriched_profile` foi preenchido**

---

## 💡 DICAS:

- **Não bloquear o usuário:** O enriquecimento é assíncrono, não espera resposta
- **Erros não críticos:** Se falhar, apenas loga, não mostra erro para o usuário
- **Monitorar execuções:** Veja regularmente a aba "Executions" no n8n
- **Ajustar prompts:** Se necessário, ajuste o prompt do Claude no n8n

---

## 🆘 PROBLEMAS COMUNS:

### Erro: "VITE_N8N_WEBHOOK_URL is not defined"
**Solução:** 
- Verifique se a variável está no Vercel
- Faça novo deploy
- Verifique se o nome está correto (com `VITE_` no início)

### Workflow não executa
**Solução:**
- Verifique se o workflow está ativo no n8n
- Verifique a URL do webhook
- Veja os logs em "Executions"

### Lead não é enriquecido
**Solução:**
- Verifique se o leadId está sendo enviado corretamente
- Verifique se o workflow está funcionando (teste manual)
- Verifique os logs do n8n

---

## 🎯 PRÓXIMOS PASSOS (Depois de Funcionar):

1. **Monitorar execuções** regularmente
2. **Ajustar prompts do Claude** conforme necessário
3. **Criar workflow de email** personalizado
4. **Integrar com chatbot** (usar dados enriquecidos)

---

**Siga os passos acima e me avise quando terminar ou se tiver dúvidas!** 🚀
