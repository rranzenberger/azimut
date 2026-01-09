# ⚡ CONFIGURAÇÃO RÁPIDA - CLAUDE OPUS

## 🎯 **PARA DADOS PESADOS + SEGURANÇA:**

### **Opção 1: Auto (Recomendado) - Custo-Benefício Ideal**

```env
ANTHROPIC_API_KEY=sk-ant-...
AI_PROVIDER=claude
AI_MODE=auto
```

**O que faz:**
- ✅ Usa Claude Sonnet normalmente (rápido e barato)
- ✅ Usa Claude Opus apenas quando necessário (análises complexas)
- ✅ Custo-benefício perfeito

---

### **Opção 2: Max - Máxima Qualidade (Recomendado para você!)**

```env
ANTHROPIC_API_KEY=sk-ant-...
AI_PROVIDER=claude
AI_MODE=max
```

**O que faz:**
- ✅ Sempre usa Claude Opus
- ✅ Melhor para dados pesados
- ✅ Máxima segurança
- ✅ Melhor qualidade de análise

**Custo:** ~$15/1M tokens input, ~$75/1M tokens output

---

### **Opção 3: Sonnet - Mais Rápido e Barato**

```env
ANTHROPIC_API_KEY=sk-ant-...
AI_PROVIDER=claude
AI_MODE=sonnet
```

**O que faz:**
- ✅ Sempre usa Claude Sonnet
- ✅ 3x mais barato que Opus
- ✅ Ainda muito preciso

---

## 📍 **ONDE ESTÁ CADA COISA:**

### **BACKOFFICE (CRM):**
- `/admin/leads` - Lista com filtro score + badge
- `/admin/leads/[id]` - Detalhes + Painel IA 🤖
- Botão "✏️ Editar" - Modal de edição rápida

### **SITE PRINCIPAL:**
- `/contact` - Formulário com sugestões IA

---

## ✅ **RECOMENDAÇÃO PARA VOCÊ:**

**Como você mencionou dados pesados e segurança:**

```env
ANTHROPIC_API_KEY=sk-ant-...
AI_PROVIDER=claude
AI_MODE=max
```

**Por quê:**
- ✅ Claude Opus é o melhor para dados pesados
- ✅ Máxima segurança (Anthropic não treina com seus dados)
- ✅ Suporta até 200K tokens de contexto
- ✅ Melhor qualidade de análise

---

## 🔄 **FALLBACK AUTOMÁTICO:**

Se não tiver `ANTHROPIC_API_KEY`:
1. Tenta DeepSeek
2. Tenta OpenAI
3. Tenta Gemini
4. Usa fallback básico (sem IA)

**NUNCA QUEBRA O SITE! ✅**

---

## 🚀 **PRONTO!**

Configure as variáveis de ambiente e está pronto!

**Arquivo:** `.env` ou `.env.local` no `azimut-cms/`
