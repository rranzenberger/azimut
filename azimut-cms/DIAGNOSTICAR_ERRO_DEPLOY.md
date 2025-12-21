# 🔍 Diagnosticar Erro no Deploy

## ⚠️ Deploy em Erro

**Preciso ver os logs para identificar o problema exato.**

---

## 🎯 Como Verificar o Erro

### **PASSO 1: Abrir Logs do Deploy**

1. **Na Vercel, vá em "Deployments"**
2. **Clique no deploy que está em erro** (geralmente o mais recente)
3. **Vá na aba "Logs" ou "Build Logs"**

---

### **PASSO 2: Identificar o Erro**

**Procure por:**

1. **Mensagem de erro** (geralmente no final dos logs):
   - Pode estar em vermelho
   - Pode ter "Error:", "Failed:", "Build Failed", etc.

2. **Repositório sendo clonado:**
   - `Cloning github.com/rranzenberger/azimut` ✅ (correto)
   - `Cloning github.com/rranzenberger/azimut-backoffice` ❌ (errado)

3. **Root Directory:**
   - Deve aparecer algo sobre `azimut-cms`
   - Ou erro sobre Root Directory não encontrado

4. **Erros comuns:**
   - "Root Directory does not exist"
   - "package.json not found"
   - "Build command failed"
   - "Module not found"
   - Etc.

---

## 🔧 Erros Comuns e Soluções

### **Erro 1: "Root Directory does not exist"**

**Causa:** Root Directory configurado mas pasta não existe no repositório

**Solução:**
1. Verificar se pasta `azimut-cms` existe no repositório `azimut`
2. Verificar se Root Directory está correto: `azimut-cms` (sem barra no final)
3. Fazer novo push

---

### **Erro 2: "package.json not found"**

**Causa:** Root Directory não está configurado ou está errado

**Solução:**
1. Settings → Build and Deployment
2. Verificar Root Directory: `azimut-cms`
3. Salvar e fazer novo deploy

---

### **Erro 3: "Build command failed"**

**Causa:** Erro no build do Next.js

**Solução:**
1. Verificar logs completos
2. Verificar se todas as dependências estão instaladas
3. Verificar variáveis de ambiente

---

### **Erro 4: Ainda clonando `azimut-backoffice`**

**Causa:** Configuração não foi salva ou cache

**Solução:**
1. Verificar Settings → Git: Deve ser `azimut`
2. Se estiver errado, desconectar e reconectar
3. Fazer redeploy sem cache

---

## 📋 Informações que Preciso

**Me envie:**
1. **Mensagem de erro exata** (copie e cole)
2. **Qual repositório está sendo clonado** (nos logs)
3. **Se aparece algo sobre Root Directory** (nos logs)
4. **Últimas linhas dos logs** (geralmente onde está o erro)

---

## ✅ Checklist de Diagnóstico

- [ ] Abri o deploy em erro
- [ ] Fui na aba "Logs"
- [ ] Identifiquei a mensagem de erro
- [ ] Verifiquei qual repositório está sendo clonado
- [ ] Copiei a mensagem de erro para enviar

---

**Ação imediata:** Abra os logs do deploy em erro e me envie a mensagem de erro exata!

