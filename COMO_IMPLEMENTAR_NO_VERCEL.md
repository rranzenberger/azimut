# 🚀 COMO IMPLEMENTAR NO VERCEL - PASSO A PASSO

**Data:** 08 Janeiro 2026  
**Objetivo:** Adicionar configurações de IA no Vercel  
**Tempo estimado:** 5-10 minutos

---

## ⚠️ **IMPORTANTE:**

**Você PRECISA fazer manualmente!**

As variáveis de ambiente do arquivo `.env` local **NÃO são enviadas automaticamente** para o Vercel por segurança.

Você precisa adicionar manualmente no painel do Vercel.

---

## 📋 **PASSO A PASSO:**

### **PASSO 1: Acessar o Vercel Dashboard**

1. **Acesse:** https://vercel.com/
2. **Faça login** (se não estiver logado)
3. **Encontre seu projeto:** `azimut-cms`
4. **Clique no projeto**

---

### **PASSO 2: Ir em Settings → Environment Variables**

1. No projeto, clique em **"Settings"** (menu superior)
2. No menu lateral, clique em **"Environment Variables"**
3. Você verá uma lista de variáveis existentes

---

### **PASSO 3: Adicionar Claude API Key**

1. **Clique em "Add New"** (ou botão similar)
2. **Preencha:**
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** `sk-ant-api03-...` (sua key real)
   - **Environments:** Selecione:
     - ✅ Production
     - ✅ Preview
     - ✅ Development

3. **Clique "Save"**

---

### **PASSO 4: Adicionar DeepSeek API Key**

1. **Clique em "Add New"** novamente
2. **Preencha:**
   - **Name:** `DEEPSEEK_API_KEY`
   - **Value:** `sk-...` (sua key real)
   - **Environments:** Selecione:
     - ✅ Production
     - ✅ Preview
     - ✅ Development

3. **Clique "Save"**

---

### **PASSO 5: Adicionar AI_PROVIDER**

1. **Clique em "Add New"**
2. **Preencha:**
   - **Name:** `AI_PROVIDER`
   - **Value:** `claude`
   - **Environments:** Selecione:
     - ✅ Production
     - ✅ Preview
     - ✅ Development

3. **Clique "Save"**

---

### **PASSO 6: Adicionar AI_MODE**

1. **Clique em "Add New"**
2. **Preencha:**
   - **Name:** `AI_MODE`
   - **Value:** `auto`
   - **Environments:** Selecione:
     - ✅ Production
     - ✅ Preview
     - ✅ Development

3. **Clique "Save"**

---

### **PASSO 7: Fazer Redeploy**

**IMPORTANTE:** Adicionar variáveis não faz redeploy automático!

1. **Vá para "Deployments"** (menu superior)
2. **Encontre o último deployment**
3. **Clique nos 3 pontinhos** (⋮)
4. **Clique em "Redeploy"**
5. **Confirme:** "Redeploy"

**Ou via commit:**
```bash
git commit --allow-empty -m "Update env vars"
git push
```

---

## 📸 **RESUMO VISUAL:**

```
Vercel Dashboard
├── Seu Projeto (azimut-cms)
│   ├── Settings
│   │   └── Environment Variables
│   │       ├── + Add New
│   │       │   ├── ANTHROPIC_API_KEY = sk-ant-api03-...
│   │       │   ├── DEEPSEEK_API_KEY = sk-...
│   │       │   ├── AI_PROVIDER = claude
│   │       │   └── AI_MODE = auto
│   │       └── Save
│   └── Deployments
│       └── Redeploy (para aplicar mudanças)
```

---

## ✅ **CHECKLIST COMPLETO:**

- [ ] Obter Claude API key (https://console.anthropic.com/)
- [ ] Obter DeepSeek API key (https://platform.deepseek.com/)
- [ ] Acessar Vercel Dashboard
- [ ] Ir em Settings → Environment Variables
- [ ] Adicionar `ANTHROPIC_API_KEY`
- [ ] Adicionar `DEEPSEEK_API_KEY`
- [ ] Adicionar `AI_PROVIDER=claude`
- [ ] Adicionar `AI_MODE=auto`
- [ ] Fazer Redeploy
- [ ] Testar no site (https://seu-site.vercel.app/admin/leads)

---

## 🎯 **VARIÁVEIS QUE VOCÊ PRECISA ADICIONAR:**

| Nome | Valor | Onde Obter |
|------|-------|------------|
| `ANTHROPIC_API_KEY` | `sk-ant-api03-...` | https://console.anthropic.com/ |
| `DEEPSEEK_API_KEY` | `sk-...` | https://platform.deepseek.com/ |
| `AI_PROVIDER` | `claude` | Digitar manualmente |
| `AI_MODE` | `auto` | Digitar manualmente |

---

## ⚠️ **ERROS COMUNS:**

### **1. "Adicionei as variáveis mas não funciona"**
**Solução:** Você fez redeploy? Variáveis só aplicam após redeploy!

### **2. "Não encontro Environment Variables"**
**Solução:** Settings → Environment Variables (menu lateral)

### **3. "Qual ambiente selecionar?"**
**Solução:** Selecione todos (Production, Preview, Development)

### **4. "Preciso adicionar todas as 4 variáveis?"**
**Solução:** 
- Mínimo: `ANTHROPIC_API_KEY` + `AI_PROVIDER`
- Recomendado: Todas as 4

---

## 💡 **DICAS:**

### **1. Testar antes de adicionar no Vercel:**

Teste localmente primeiro:
```powershell
cd azimut-cms
npm run dev
```

Acesse: http://localhost:3001/admin/leads

Se funcionar localmente, vai funcionar no Vercel.

---

### **2. Ver logs de erro no Vercel:**

Se algo der errado:
1. Vá em "Deployments"
2. Clique no deployment com erro
3. Veja os logs
4. Procure por erros relacionados a IA

---

### **3. Ordem não importa:**

Você pode adicionar as variáveis em qualquer ordem.

---

### **4. Pode começar só com Claude:**

Se quiser testar primeiro:
1. Adicione apenas `ANTHROPIC_API_KEY` e `AI_PROVIDER=claude`
2. Teste
3. Depois adicione DeepSeek

---

## 🚀 **DEPOIS DO DEPLOY:**

### **Como verificar se funcionou:**

1. **Acesse seu site:** https://seu-site.vercel.app/admin/leads
2. **Clique em um lead**
3. **Veja o painel de IA** (🤖 Análise IA)
4. **Se aparecer insights** → Funcionou! ✅

---

### **Como saber qual provider está sendo usado:**

No Vercel, vá em:
1. **Deployments**
2. **Clique no deployment ativo**
3. **Vá em "Functions"**
4. **Veja os logs** (vai aparecer "claude" ou "deepseek")

---

## 📊 **COMPARAÇÃO:**

| Local (.env) | Vercel (Environment Variables) |
|--------------|-------------------------------|
| ✅ Automático (arquivo .env) | ⚠️ Manual (painel Vercel) |
| ✅ Funciona imediatamente | ⚠️ Precisa redeploy |
| ✅ Privado (não vai pro git) | ✅ Privado (seguro) |

---

## ❓ **PERGUNTAS FREQUENTES:**

### **1. As variáveis do .env vão automaticamente pro Vercel?**
❌ NÃO! Você precisa adicionar manualmente no painel.

### **2. Preciso commitar o .env no git?**
❌ NUNCA! O .env é privado e não deve ir pro git.

### **3. Como o Vercel sabe usar as variáveis?**
O código já está preparado. Só precisa adicionar as variáveis no painel.

### **4. E se eu mudar uma variável?**
Edite no painel e faça redeploy.

### **5. Posso usar variáveis diferentes em Production e Preview?**
Sim! Você pode definir valores diferentes para cada ambiente.

---

## 🎯 **RESUMO:**

**O que você PRECISA fazer:**
1. ✅ Obter API keys (Claude + DeepSeek)
2. ✅ Adicionar no Vercel (Settings → Environment Variables)
3. ✅ Fazer Redeploy

**O que é automático:**
1. ✅ Código já está pronto
2. ✅ Sistema híbrido já configurado
3. ✅ Fallback já implementado

**Tempo total:** 5-10 minutos

---

## 🚀 **COMECE AGORA:**

**Passo 1:** Obtenha as API keys  
**Passo 2:** Acesse Vercel Dashboard  
**Passo 3:** Adicione as variáveis  
**Passo 4:** Redeploy  
**Passo 5:** Teste!

---

**PRONTO! Siga o passo a passo acima! 🚀**

**Qualquer dúvida, me chame!**
