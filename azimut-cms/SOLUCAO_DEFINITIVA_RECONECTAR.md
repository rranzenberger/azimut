# 🔧 Solução Definitiva: Reconectar Repositório

## 🐛 Problema Persistente

Mesmo após:
- ✅ Verificar configuração
- ✅ Fazer redeploy
- ✅ Limpar cache
- ✅ Verificar Root Directory

O projeto `azimut-backoffice` **ainda não detecta commits novos**.

---

## ✅ Solução Definitiva: Reconectar Repositório

### **OPÇÃO 1: Desconectar e Reconectar** (RECOMENDADO)

#### **PASSO 1: Desconectar Repositório Atual**

1. **Vercel Dashboard:** https://vercel.com/dashboard
2. **Projeto:** `azimut-backoffice`
3. **Settings** → **"Git"** (menu lateral)
4. **Role até a seção do repositório conectado**
5. **Clique em "Disconnect"** ou **"Remove"**
6. **Confirme a desconexão**

#### **PASSO 2: Reconectar Repositório**

1. **Na mesma página (Git)**, clique em **"Connect Git Repository"**
2. **Selecione:** GitHub (se não estiver selecionado)
3. **Procure pelo repositório:** `rranzenberger/azimut`
4. **Clique em "Import"** ou **"Connect"**

#### **PASSO 3: Configurar Durante a Conexão**

Quando conectar, você verá opções de configuração:

1. **Root Directory:**
   - Digite: `azimut-cms`
   - ✅ Isso é CRUCIAL!

2. **Framework Preset:**
   - Selecione: **"Next.js"** (ou deixe auto-detect)

3. **Build Command:**
   - Deve aparecer: `cd azimut-cms && npm run build`
   - Ou: `npm run build` (se Root Directory estiver correto)

4. **Output Directory:**
   - Deve aparecer: `.next`
   - Ou deixe vazio (usa padrão)

5. **Install Command:**
   - Deve aparecer: `cd azimut-cms && npm install`
   - Ou: `npm install` (se Root Directory estiver correto)

6. **Production Branch:**
   - Selecione: **`main`**

7. **Clique em "Deploy"** ou **"Connect"**

#### **PASSO 4: Aguardar Deploy Inicial**

1. **Aguarde 2-5 minutos** para o deploy inicial
2. **Verifique o deploy:**
   - Deve mostrar commit mais recente (`333fff4` ou mais recente)
   - Status deve ser "Ready" (verde)

---

### **OPÇÃO 2: Criar Novo Projeto** (Se Opção 1 Não Funcionar)

#### **PASSO 1: Criar Novo Projeto**

1. **Vercel Dashboard:** https://vercel.com/dashboard
2. **Clique em "Add New..."** → **"Project"**
3. **Selecione repositório:** `rranzenberger/azimut`
4. **Clique em "Import"**

#### **PASSO 2: Configurar Projeto**

1. **Project Name:**
   - Digite: `azimut-backoffice` (ou outro nome)

2. **Root Directory:**
   - **IMPORTANTE:** Clique em "Edit"
   - Digite: `azimut-cms`
   - ✅ Isso é ESSENCIAL!

3. **Framework Preset:**
   - Selecione: **"Next.js"**

4. **Build Command:**
   - Deve aparecer: `cd azimut-cms && npm run build`
   - Verifique se está correto

5. **Output Directory:**
   - Deve aparecer: `.next`

6. **Production Branch:**
   - Selecione: **`main`**

7. **Environment Variables:**
   - Adicione todas as variáveis necessárias:
     - `DATABASE_URL`
     - `JWT_SECRET`
     - `NODE_ENV=production`
     - Etc.

8. **Clique em "Deploy"**

#### **PASSO 3: Configurar Domínio**

1. **Settings** → **"Domains"**
2. **Adicione domínio:** `backoffice.azmt.com.br`
3. **Configure DNS** (se necessário)

---

## 🔍 Como Verificar se Funcionou

### **1. Verificar Commit no Deploy**

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
- ✅ Mostra que está buildando de `azimut-cms/`

### **3. Testar no Site**

1. **Limpar cache:** `Ctrl + Shift + Delete`
2. **Acessar:** `backoffice.azmt.com.br/admin`
3. **Verificar menu:**
   - ✅ Deve mostrar "Páginas" (sem "em breve")
   - ❌ Não deve mostrar "Páginas (em breve)"

---

## ⚠️ Importante: Root Directory

**O Root Directory DEVE ser `azimut-cms`!**

Se estiver vazio ou com outro valor, o projeto não encontrará os arquivos corretos.

**Como verificar:**
- Settings → General → Root Directory
- Deve mostrar: `azimut-cms`

**Se estiver errado:**
1. Clique em "Edit"
2. Digite: `azimut-cms`
3. Salve
4. Faça redeploy

---

## 🐛 Se Ainda Não Funcionar

### **Verificar se Arquivos Estão Commitados**

```bash
git status
git log --oneline --all -- azimut-cms/app/admin/pages/page.tsx
```

Se os arquivos não estiverem commitados:
```bash
git add azimut-cms/app/admin/pages/
git commit -m "fix: Add pages admin interface"
git push origin main
```

### **Verificar se Projeto Está no Branch Correto**

1. Vercel Dashboard → Settings → Git
2. Verificar "Production Branch": deve ser `main`
3. Verificar se há outros branches configurados

### **Limpar Build Cache Completamente**

1. Settings → General
2. Scroll até "Build & Development Settings"
3. Clique em **"Clear Build Cache"**
4. Faça novo deploy

---

## ✅ Checklist Final

- [ ] Repositório desconectado e reconectado
- [ ] Root Directory configurado: `azimut-cms`
- [ ] Production Branch: `main`
- [ ] Auto-deploy: Habilitado
- [ ] Deploy mostra commit `333fff4` ou mais recente
- [ ] Build Logs mostra rotas `/admin/pages`
- [ ] Menu mostra "Páginas" (sem "em breve")

---

## 🎯 Resumo

**O problema é que o projeto não está detectando commits novos.**

**Solução definitiva:**
1. Desconectar repositório atual
2. Reconectar ao repositório `rranzenberger/azimut`
3. **Configurar Root Directory: `azimut-cms`** (ESSENCIAL!)
4. Aguardar deploy automático

---

**Última atualização:** Solução definitiva para reconectar repositório

