# 🔗 INTEGRAÇÃO COM KABBAM/CRM

## 📊 Sistema de Leads Implementado

### **O que foi criado:**

1. ✅ **Budget Wizard** - Wizard em 4 etapas
2. ✅ **Sistema de Scoring** - Priorização automática (0-10)
3. ✅ **API de Leads** - `src/api/leads.ts`
4. ✅ **Integração no Layout** - Botão "Start a Project" abre wizard

---

## 🎯 **SCORING DE LEADS (Priorização)**

### **Algoritmo de Score (0-10):**

```typescript
Budget:
- 1M+ → +4 pontos
- 200k-1M → +3 pontos
- 50k-200k → +2 pontos
- 10k-50k → +1 ponto

Perfil:
- Museu/Prefeitura → +2 pontos
- Marca → +1.5 pontos
- Educação → +1 ponto

Complexidade:
- Múltiplas necessidades (>2) → +1 ponto
- Localização definida → +1 ponto
- Prazo definido → +1 ponto
- Precisa financiamento → +0.5 pontos
```

### **Classificação:**

- **High Priority** (score > 7): Lead quente, contatar imediatamente
- **Medium Priority** (score 4-7): Lead qualificado, contatar em 24-48h
- **Low Priority** (score < 4): Lead frio, pode ser "fuchiqueiro", contatar quando tiver tempo

---

## 🔌 **INTEGRAÇÃO COM KABBAM**

### **Formato de Dados:**

```typescript
{
  name: string (organização)
  email: string (será preenchido no formulário final)
  phone: string (será preenchido no formulário final)
  budget: '10k-50k' | '50k-200k' | '200k-1M' | '1M+' | 'funding'
  needs: string[] (necessidades)
  location: string
  deadline: string
  audience: string
  objective: string
  role: 'museum' | 'prefecture' | 'brand' | 'education' | 'other'
  leadScore: number (0-10)
  priority: 'high' | 'medium' | 'low'
  source: 'website'
  timestamp: string (ISO)
  custom_fields: {
    needs_funding: boolean
    project_type: string
    estimated_budget_range: string
  }
}
```

### **Endpoint Sugerido:**

```typescript
POST /api/leads
Content-Type: application/json

{
  ...lead data
}
```

### **Integração com Kabbam (Webhook):**

```typescript
// Quando backend estiver pronto
async function sendToKabbam(lead: Lead) {
  await fetch('https://kabbam.com/api/webhooks/azimut', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.KABBAM_API_KEY}`
    },
    body: JSON.stringify({
      ...lead,
      integration: 'kabbam',
      source: 'website'
    })
  })
}
```

---

## 📋 **FLUXO COMPLETO:**

```
1. Usuário clica "Start a Project"
   ↓
2. Budget Wizard abre (modal)
   ↓
3. Usuário preenche 4 etapas:
   - Necessidades
   - Orçamento
   - Contexto
   - Recomendações
   ↓
4. Sistema calcula score (0-10)
   ↓
5. Lead é classificado:
   - High (score > 7)
   - Medium (score 4-7)
   - Low (score < 4)
   ↓
6. Lead enviado para:
   - API local (por enquanto)
   - Kabbam/CRM (quando backend estiver pronto)
   ↓
7. Você recebe lead com:
   - Perfil completo
   - Score de prioridade
   - Recomendações de editais
   - Histórico de navegação (futuro)
```

---

## 🎯 **PRÓXIMOS PASSOS:**

### **Fase 1: Testar Localmente**
- [ ] Testar Budget Wizard
- [ ] Verificar scoring
- [ ] Validar dados capturados

### **Fase 2: Backend API**
- [ ] Criar endpoint `/api/leads`
- [ ] Salvar leads em database
- [ ] Enviar email de notificação

### **Fase 3: Integração Kabbam**
- [ ] Configurar webhook Kabbam
- [ ] Testar envio de leads
- [ ] Validar campos customizados

### **Fase 4: Dashboard de Leads**
- [ ] Visualizar leads por prioridade
- [ ] Filtrar por score, perfil, data
- [ ] Exportar para CSV

---

**Última atualização:** Dezembro 2025




























