# 🔍 Clicar no Deploy em Erro para Ver Logs

## ⚠️ Deploys em Erro

**Vejo 3 deploys em erro:**
1. `6ZTvfn7eJ` - commit `e0c43e7` (mais recente, o que acabamos de fazer)
2. `8NNVq6oDF` - commit `2939440` (anterior)
3. `GN9FnJL2U` - redeploy

---

## 🎯 O Que Fazer Agora

### **PASSO 1: Clicar no Deploy Mais Recente em Erro**

1. **Clique no deploy:** `6ZTvfn7eJ` (primeiro da lista, com status "Error")
2. **Uma página de detalhes do deploy abrirá**

---

### **PASSO 2: Ver Logs do Build**

**Na página do deploy:**

1. **Procure pela aba "Logs" ou "Build Logs"**
   - Geralmente está no topo da página
   - Ou em uma seção "Build Logs"

2. **Clique na aba "Logs"**

3. **Você verá os logs do build**

---

### **PASSO 3: Identificar o Erro**

**Nos logs, procure por:**

1. **Mensagem de erro** (geralmente no final):
   - Pode estar em vermelho
   - Pode ter "Error:", "Failed:", "Build Failed", etc.
   - **Copie a mensagem de erro exata**

2. **Repositório sendo clonado:**
   - Procure por: `Cloning github.com/rranzenberger/...`
   - Qual repositório aparece?
   - `azimut` ✅ ou `azimut-backoffice` ❌?

3. **Root Directory:**
   - Procure por algo sobre "Root Directory" ou "azimut-cms"
   - Aparece algum erro sobre isso?

4. **Últimas linhas dos logs:**
   - Geralmente o erro está nas últimas linhas
   - **Copie as últimas 10-20 linhas**

---

## 📋 Informações que Preciso

**Me envie:**
1. **Mensagem de erro exata** (copie e cole)
2. **Qual repositório está sendo clonado** (nos logs)
3. **Se aparece algo sobre Root Directory** (nos logs)
4. **Últimas linhas dos logs** (onde geralmente está o erro)

---

## 🔧 Erros Comuns

### **Se aparecer:**
- `Cloning github.com/rranzenberger/azimut-backoffice` → Repositório errado
- `Root Directory "azimut-cms" does not exist` → Pasta não encontrada
- `package.json not found` → Root Directory não configurado
- `Build command failed` → Erro no build do Next.js
- `Module not found` → Dependência faltando

---

## ✅ Checklist

- [ ] Cliquei no deploy `6ZTvfn7eJ` (mais recente em erro)
- [ ] Fui na aba "Logs" ou "Build Logs"
- [ ] Identifiquei a mensagem de erro
- [ ] Verifiquei qual repositório está sendo clonado
- [ ] Copiei a mensagem de erro para enviar

---

**Ação imediata:** Clique no deploy `6ZTvfn7eJ` → Vá em "Logs" → Me envie a mensagem de erro exata!

