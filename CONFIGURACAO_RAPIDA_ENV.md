# ⚡ CONFIGURAÇÃO RÁPIDA - .ENV

## 🎯 **SITUAÇÃO ATUAL:**

Você **NÃO tem arquivo .env** ainda. Vamos criar!

---

## 📝 **PASSO A PASSO:**

### **1. Criar arquivo .env**

**No Windows:**
- Abra o Explorer
- Vá para: `azimut-cms/`
- Clique direito → Novo → Arquivo de texto
- Renomeie para: `.env` (sem extensão!)
- Se Windows perguntar sobre extensão, confirme

**Ou via PowerShell:**
```powershell
cd azimut-cms
New-Item -Path .env -ItemType File
```

---

### **2. Adicionar configuração Claude**

**Abra o arquivo `.env` e cole:**

```env
# Claude (Recomendado para você - dados pesados + segurança)
ANTHROPIC_API_KEY=sk-ant-api03-...
AI_PROVIDER=claude
AI_MODE=auto
```

**IMPORTANTE:** Substitua `sk-ant-api03-...` pela sua API key real!

---

### **3. Obter API Key Claude**

1. **Acesse:** https://console.anthropic.com/
2. **Crie conta** (se não tiver)
3. **Vá em "API Keys"** (menu lateral)
4. **Clique "Create Key"**
5. **Copie a key** (começa com `sk-ant-api03-...`)
6. **Cole no .env** substituindo `...`

---

### **4. Formato correto**

**Cada variável em uma linha separada:**

```env
ANTHROPIC_API_KEY=sk-ant-api03-xxxxxxxxxxxxx
AI_PROVIDER=claude
AI_MODE=auto
```

**NÃO faça assim (tudo em uma linha):**
```env
❌ ANTHROPIC_API_KEY=sk-ant-...AI_PROVIDER=claudeAI_MODE=auto
```

---

## 💰 **COMPARAÇÃO: DEEPSEEK vs CLAUDE**

### **Você está usando DeepSeek atualmente?**

**DeepSeek (Atual):**
- ✅ Custo: ~$0.30/mês (muito barato!)
- ✅ Qualidade: ⭐⭐⭐ (boa)
- ⚠️ Segurança: ⭐⭐⭐ (não tem garantia de privacidade)
- ⚠️ Contexto: 32K tokens (limitado)

**Claude (Recomendado):**
- 💰 Custo: ~$2.70/mês (9x mais caro, mas ainda barato)
- ✅ Qualidade: ⭐⭐⭐⭐ (excelente)
- ✅ Segurança: ⭐⭐⭐⭐⭐ (máxima privacidade garantida)
- ✅ Contexto: 200K tokens (6x mais!)

---

## 🎯 **BENEFÍCIOS DE MUDAR PARA CLAUDE:**

### **1. Segurança Máxima:**
- ✅ Anthropic **NÃO usa seus dados** para treinar modelos
- ✅ Dados **não são armazenados** após processamento
- ✅ **GDPR/LGPD compliant** garantido
- ✅ Ideal para dados sensíveis (emails de leads)

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
- ✅ Dados sensíveis (emails, informações pessoais de leads)
- ✅ Precisa de máxima segurança
- ✅ Análises complexas com muitos dados
- ✅ Orçamento permite ~$2.70/mês

### **NÃO, se:**
- ✅ Orçamento muito limitado (< $1/mês)
- ✅ Análises muito simples
- ✅ Não precisa de máxima privacidade
- ✅ Volume muito alto (milhares de análises/dia)

---

## 🚀 **RECOMENDAÇÃO:**

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

- [ ] Criar arquivo `.env` em `azimut-cms/`
- [ ] Obter API key Claude em https://console.anthropic.com/
- [ ] Adicionar `ANTHROPIC_API_KEY=sk-ant-...` no .env
- [ ] Adicionar `AI_PROVIDER=claude` no .env
- [ ] Adicionar `AI_MODE=auto` no .env
- [ ] Salvar arquivo
- [ ] Reiniciar servidor (`npm run dev`)
- [ ] Testar no CRM (`/admin/leads`)

---

## ❓ **PERGUNTAS:**

### **1. Preciso remover DeepSeek?**
Não! Pode manter ambos. O sistema usa Claude se tiver `ANTHROPIC_API_KEY`, senão usa DeepSeek.

### **2. E se não tiver API key Claude?**
Sistema usa DeepSeek automaticamente (fallback seguro).

### **3. Quanto custa realmente?**
- DeepSeek: ~$0.30/mês
- Claude Sonnet: ~$2.70/mês
- Claude Opus: ~$9.00/mês

### **4. Qual escolher?**
- **Orçamento limitado:** DeepSeek
- **Custo-benefício:** Claude Sonnet (auto) ← **RECOMENDADO**
- **Máxima qualidade:** Claude Opus (max)

---

**PRONTO! Siga os passos acima! 🚀**
