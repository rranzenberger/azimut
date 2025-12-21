# 🔧 Como Verificar e Corrigir Configuração do Projeto

## 🐛 Problema

O commit `333fff4` existe no repositório, mas o projeto `azimut-backoffice` na Vercel não está detectando os commits novos.

**Commits no repositório:**
- ✅ `333fff4` - fix: Force rebuild to update pages menu
- ✅ `ccc1c69` - chore: Force redeploy to include pages feature
- ✅ `f49e7af` - docs: Adiciona guia de como editar slogan
- ✅ `67ec448` - feat: Adiciona campo heroSlogan editavel no CMS

**Mas o projeto `azimut-backoffice` ainda mostra:**
- ❌ `62dcdb5` - fix: Revert build seed and add manual setup script (antigo)

---

## ✅ Solução: Verificar Configuração do Projeto

### **PASSO 1: Acessar Settings do Projeto**

1. **Vercel Dashboard:** https://vercel.com/dashboard
2. **Selecione:** Projeto `azimut-backoffice`
3. **Clique na aba:** **"Settings"** (no topo)
4. **Clique em:** **"General"** (no menu lateral esquerdo)

---

### **PASSO 2: Verificar "Root Directory"**

**Onde:** Settings → General → Seção "Build & Development Settings"

**Verificar:**
- ✅ **Deve ser:** `azimut-cms`
- ❌ **NÃO deve ser:** vazio ou outro valor

**Se estiver errado:**
1. Clique em **"Edit"** ao lado de "Root Directory"
2. Digite: `azimut-cms`
3. Clique em **"Save"**

---

### **PASSO 3: Verificar "Build Command"**

**Onde:** Settings → General → Seção "Build & Development Settings"

**Verificar:**
- ✅ **Deve ser:** `cd azimut-cms && npm run build`
- ✅ **Ou pode ser:** `npm run build` (se Root Directory estiver correto)

**Se estiver errado:**
1. Clique em **"Edit"** ao lado de "Build Command"
2. Digite: `cd azimut-cms && npm run build`
3. Clique em **"Save"**

---

### **PASSO 4: Verificar "Output Directory"**

**Onde:** Settings → General → Seção "Build & Development Settings"

**Verificar:**
- ✅ **Deve ser:** `.next` (padrão Next.js)
- ✅ **Ou pode ser:** vazio (usa padrão)

**Se estiver errado:**
1. Clique em **"Edit"** ao lado de "Output Directory"
2. Digite: `.next`
3. Clique em **"Save"**

---

### **PASSO 5: Verificar Git Configuration**

**Onde:** Settings → **"Git"** (no menu lateral esquerdo)

#### **5.1. Verificar "Production Branch"**

**Verificar:**
- ✅ **Deve ser:** `main`
- ❌ **NÃO deve ser:** `master` ou outro branch

**Se estiver errado:**
1. Clique em **"Edit"** ao lado de "Production Branch"
2. Selecione: `main`
3. Clique em **"Save"**

#### **5.2. Verificar "Auto-deploy"**

**Verificar:**
- ✅ **Deve estar:** **Habilitado** (toggle verde/azul)
- ❌ **NÃO deve estar:** Desabilitado

**Se estiver desabilitado:**
1. Clique no toggle para **habilitar**
2. Isso garante que novos commits façam deploy automático

#### **5.3. Verificar Repositório Conectado**

**Verificar:**
- ✅ **Deve ser:** `rranzenberger/azimut`
- ✅ **Deve ser o mesmo** do projeto `azimut`

**Se estiver errado:**
1. Clique em **"Disconnect"** (se houver)
2. Clique em **"Connect Git Repository"**
3. Selecione: `rranzenberger/azimut`
4. Configure:
   - Root Directory: `azimut-cms`
   - Production Branch: `main`
5. Clique em **"Connect"**

---

### **PASSO 6: Após Corrigir Configuração**

1. **Fazer novo deploy:**
   - Vá em **"Deployments"**
   - Clique nos 3 pontos (⋯) do último deploy
   - Selecione **"Redeploy"**
   - **DESMARQUE:** "Use existing Build Cache"
   - Clique em **"Redeploy"**

2. **OU aguardar deploy automático:**
   - Se Auto-deploy estiver habilitado
   - Vercel deve detectar commits novos automaticamente
   - Aguardar 2-5 minutos

---

## 📋 Checklist de Configuração

- [ ] **Root Directory:** `azimut-cms`
- [ ] **Build Command:** `cd azimut-cms && npm run build` (ou `npm run build`)
- [ ] **Output Directory:** `.next` (ou vazio)
- [ ] **Production Branch:** `main`
- [ ] **Auto-deploy:** Habilitado
- [ ] **Repositório:** `rranzenberger/azimut`

---

## 🔍 Como Verificar se Está Correto

### **1. Verificar Deploy Mais Recente**

Vercel Dashboard → `azimut-backoffice` → Deployments → Deploy mais recente → Aba "Deployment" → Source

**Deve mostrar:**
- ✅ Commit: `333fff4` ou mais recente
- ✅ Branch: `main`
- ❌ **NÃO deve ser:** `62dcdb5`

### **2. Verificar Build Logs**

Vercel Dashboard → Deployments → Deploy → Aba "Logs" → Build Logs

**Deve aparecer:**
- ✅ "Route (app)" → Lista `/admin/pages`
- ✅ "Build Completed" sem erros

### **3. Testar no Site**

1. Limpar cache: `Ctrl + Shift + Delete`
2. Acessar: `backoffice.azmt.com.br/admin`
3. Verificar menu:
   - ✅ Deve mostrar "Páginas" (sem "em breve")
   - ❌ Não deve mostrar "Páginas (em breve)"

---

## 🐛 Se Ainda Não Funcionar

### **Opção 1: Reconectar Repositório**

1. Settings → Git → **"Disconnect"**
2. **"Connect Git Repository"**
3. Selecionar: `rranzenberger/azimut`
4. Configurar:
   - Root Directory: `azimut-cms`
   - Production Branch: `main`
5. **"Connect"**

### **Opção 2: Forçar Deploy com Commit Novo**

1. Criar commit vazio:
   ```bash
   git commit --allow-empty -m "chore: Force deploy azimut-backoffice"
   git push origin main
   ```

2. Aguardar deploy automático (2-5 minutos)

3. Verificar se novo deploy mostra commit mais recente

---

## ✅ Resumo

**O problema é configuração do projeto na Vercel.**

**Solução:**
1. Verificar Settings → General → Root Directory: `azimut-cms`
2. Verificar Settings → Git → Production Branch: `main`
3. Verificar Settings → Git → Auto-deploy: Habilitado
4. Fazer redeploy ou aguardar deploy automático

---

**Última atualização:** Guia para verificar e corrigir configuração

