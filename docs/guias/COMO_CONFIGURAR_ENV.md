# ⚙️ COMO CONFIGURAR .ENV - PASSO A PASSO

**Data:** 08 Janeiro 2026  
**Objetivo:** Configurar Claude no azimut-cms

---

## 📍 **ONDE ESTÁ O ARQUIVO .ENV?**

**Localização:** `azimut-cms/.env` ou `azimut-cms/.env.local`

Se não existir, você precisa criar!

---

## 🔍 **PASSO 1: VERIFICAR SE JÁ EXISTE**

### **No Windows (PowerShell):**
```powershell
cd azimut-cms
Test-Path .env
```

### **Ou verifique manualmente:**
- Abra a pasta `azimut-cms/`
- Procure por arquivo `.env` ou `.env.local`
- Se não existir, crie um novo arquivo chamado `.env`

---

## 📝 **PASSO 2: CRIAR/EDITAR .ENV**

### **Opção A: Se já tem DeepSeek (manter ambos):**

```env
# DeepSeek (atual - manter para fallback)
DEEPSEEK_API_KEY=sk-...

# Claude (novo - adicionar)
ANTHROPIC_API_KEY=sk-ant-api03-...

# Provider padrão (Claude tem prioridade se tiver key)
AI_PROVIDER=claude
AI_MODE=auto
```

### **Opção B: Substituir DeepSeek por Claude:**

```env
# Remover DeepSeek (comentar ou deletar)
# DEEPSEEK_API_KEY=sk-...

# Adicionar Claude
ANTHROPIC_API_KEY=sk-ant-api03-...
AI_PROVIDER=claude
AI_MODE=auto
```

### **Opção C: Manter só DeepSeek (se orçamento é crítico):**

```env
DEEPSEEK_API_KEY=sk-...
AI_PROVIDER=deepseek
```

---

## 🔑 **PASSO 3: OBTER API KEY CLAUDE**

### **1. Acesse:**
https://console.anthropic.com/

### **2. Crie conta (se não tiver):**
- Email
- Senha
- Confirme email

### **3. Vá em "API Keys":**
- Menu lateral → "API Keys"
- Clique em "Create Key"

### **4. Copie a key:**
- Começa com `sk-ant-api03-...`
- **IMPORTANTE:** Copie AGORA (não aparece de novo!)

### **5. Cole no .env:**
```env
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxx
```

---

## ✅ **PASSO 4: FORMATO CORRETO DO .ENV**

**IMPORTANTE:** Cada variável em uma linha separada!

```env
# ✅ CORRETO:
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxx
AI_PROVIDER=claude
AI_MODE=auto

# ❌ ERRADO (tudo em uma linha):
ANTHROPIC_API_KEY=sk-ant-...AI_PROVIDER=claudeAI_MODE=auto
```

---

## 🧪 **PASSO 5: TESTAR**

### **1. Reinicie o servidor:**
```powershell
cd azimut-cms
npm run dev
```

### **2. Teste no CRM:**
- Acesse: `http://localhost:3000/admin/leads`
- Clique em um lead
- Veja painel de IA (🤖 Análise IA)
- Deve funcionar com Claude agora!

### **3. Verifique logs:**
- No terminal, deve aparecer "Claude" ou "claude" nos logs
- Se aparecer erro, verifique a API key

---

## 💰 **COMPARAÇÃO: DEEPSEEK vs CLAUDE**

### **Custos Mensais (100 leads/dia):**

| Provider | Custo/Mês | Qualidade | Segurança | Contexto |
|----------|-----------|-----------|-----------|----------|
| **DeepSeek** | ~$0.30 | ⭐⭐⭐ | ⭐⭐⭐ | 32K tokens |
| **Claude Sonnet** | ~$2.70 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 200K tokens |
| **Claude Opus** | ~$9.00 | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | 200K tokens |

**Diferença:** Claude Sonnet custa ~$2.40/mês a mais que DeepSeek

---

## 🎯 **BENEFÍCIOS DE MUDAR PARA CLAUDE:**

### **1. Segurança Máxima:**
- ✅ Anthropic **NÃO usa seus dados** para treinar
- ✅ Dados **não são armazenados** após processamento
- ✅ **GDPR/LGPD compliant** garantido
- ✅ Ideal para dados sensíveis (emails, leads)

### **2. Qualidade Superior:**
- ✅ **Melhor raciocínio** para análises de negócio
- ✅ **Menos alucinações** (mais preciso)
- ✅ **Insights mais profundos** e acionáveis
- ✅ Entende contexto complexo melhor

### **3. Dados Pesados:**
- ✅ **200K tokens** de contexto (vs 32K do DeepSeek)
- ✅ **6x mais capacidade** para análises complexas
- ✅ Pode analisar leads com muito histórico
- ✅ Suporta muitos projetos simultaneamente

### **4. Custo-Benefício:**
- ✅ Por apenas **$2.40/mês a mais**, você ganha:
  - Segurança máxima
  - Qualidade muito melhor
  - Suporte a dados pesados
  - Compliance garantido

---

## ⚖️ **VALE A PENA?**

### **SIM, se:**
- ✅ Dados sensíveis (emails, informações pessoais)
- ✅ Precisa de máxima segurança
- ✅ Análises complexas com muitos dados
- ✅ Orçamento permite ~$2.70/mês

### **NÃO, se:**
- ✅ Orçamento muito limitado (< $1/mês)
- ✅ Análises muito simples
- ✅ Não precisa de máxima privacidade
- ✅ Volume muito alto (milhares/dia)

---

## 🚀 **RECOMENDAÇÃO FINAL:**

**Para você (dados pesados + segurança + CRM premium):**

```env
ANTHROPIC_API_KEY=sk-ant-api03-...
AI_PROVIDER=claude
AI_MODE=auto
```

**Por quê:**
- ✅ Segurança máxima (importante para leads)
- ✅ Qualidade muito melhor
- ✅ Suporta dados pesados (200K tokens)
- ✅ Custo ainda barato (~$2.70/mês)
- ✅ Auto decide quando usar Opus

**Custo adicional:** Apenas ~$2.40/mês vs DeepSeek  
**Benefício:** Segurança + qualidade + dados pesados

---

## 📋 **CHECKLIST:**

- [ ] Criar/editar arquivo `.env` em `azimut-cms/`
- [ ] Obter API key Claude em https://console.anthropic.com/
- [ ] Adicionar `ANTHROPIC_API_KEY=sk-ant-...` no .env
- [ ] Adicionar `AI_PROVIDER=claude` no .env
- [ ] Adicionar `AI_MODE=auto` no .env
- [ ] Salvar arquivo
- [ ] Reiniciar servidor (`npm run dev`)
- [ ] Testar no CRM (`/admin/leads`)

---

## ❓ **PERGUNTAS FREQUENTES:**

### **1. Preciso remover DeepSeek?**
Não! Pode manter ambos. O sistema usa Claude se tiver `ANTHROPIC_API_KEY`, senão usa DeepSeek.

### **2. E se não tiver API key Claude?**
Sistema usa DeepSeek automaticamente (fallback).

### **3. Posso usar ambos ao mesmo tempo?**
Sim! Pode ter ambas as keys. Sistema prioriza Claude se tiver.

### **4. Quanto custa realmente?**
- DeepSeek: ~$0.30/mês
- Claude Sonnet: ~$2.70/mês
- Claude Opus: ~$9.00/mês

### **5. Qual escolher?**
- **Orçamento limitado:** DeepSeek
- **Custo-benefício:** Claude Sonnet (auto)
- **Máxima qualidade:** Claude Opus (max)

---

**PRONTO! Siga os passos acima e está configurado! 🚀**
