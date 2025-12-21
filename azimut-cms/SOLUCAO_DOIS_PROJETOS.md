# 🔧 Solução: Dois Projetos na Vercel

## 🐛 Problema Identificado

**Situação:**
- ✅ Projeto **`azimut`** (site principal): Deploy com commit `333fff4` ✅
- ❌ Projeto **`azimut-backoffice`** (CMS): Deploy com commit `62dcdb5` ❌

**Causa:**
- Dois projetos separados na Vercel
- Projeto `azimut-backoffice` não está detectando os commits novos
- Pode estar configurado para branch/pasta diferente

---

## ✅ Soluções

### **OPÇÃO 1: Forçar Redeploy no Projeto Correto** (RECOMENDADO)

1. **Acessar Vercel Dashboard:**
   - URL: https://vercel.com/dashboard
   - Selecionar projeto: **`azimut-backoffice`**

2. **Verificar Deploy Atual:**
   - Aba "Deployments"
   - Clicar no deploy mais recente
   - Aba "Deployment" → Seção "Source"
   - Verificar commit: Se for `62dcdb5`, está antigo

3. **Fazer Redeploy Manual:**
   - Clicar nos **3 pontos** (⋯) do deploy mais recente
   - Selecionar **"Redeploy"**
   - **IMPORTANTE:** Desmarcar **"Use existing Build Cache"**
   - Clicar em **"Redeploy"**
   - Aguardar 2-5 minutos

4. **Verificar Novo Deploy:**
   - Deve mostrar commit `333fff4` ou mais recente
   - Status deve ser "Ready" (verde)

---

### **OPÇÃO 2: Verificar Configuração do Projeto**

1. **Acessar Settings:**
   - Vercel Dashboard → Projeto `azimut-backoffice`
   - Aba **"Settings"** → **"General"**

2. **Verificar "Root Directory":**
   - Deve ser: **`azimut-cms`** (se monorepo)
   - Ou: **vazio** (se projeto separado)

3. **Verificar "Build Command":**
   - Deve ser: **`cd azimut-cms && npm run build`** (se monorepo)
   - Ou: **`npm run build`** (se projeto separado)

4. **Verificar "Output Directory":**
   - Deve ser: **`.next`** (padrão Next.js)
   - Ou: **vazio** (usa padrão)

5. **Verificar "Install Command":**
   - Deve ser: **`cd azimut-cms && npm install`** (se monorepo)
   - Ou: **`npm install`** (se projeto separado)

---

### **OPÇÃO 3: Verificar Branch e Git**

1. **Acessar Settings:**
   - Vercel Dashboard → Projeto `azimut-backoffice`
   - Aba **"Settings"** → **"Git"**

2. **Verificar "Production Branch":**
   - Deve ser: **`main`**
   - Não deve ser: `master` ou outro branch

3. **Verificar "Auto-deploy":**
   - Deve estar **habilitado**
   - Isso garante que novos commits façam deploy automático

4. **Verificar Webhook:**
   - Deve estar ativo
   - Se não estiver, pode não detectar novos commits

---

### **OPÇÃO 4: Conectar ao Repositório Correto**

Se o projeto `azimut-backoffice` estiver conectado ao repositório errado:

1. **Acessar Settings:**
   - Vercel Dashboard → Projeto `azimut-backoffice`
   - Aba **"Settings"** → **"Git"**

2. **Verificar Repositório:**
   - Deve ser: **`rranzenberger/azimut`**
   - Deve ser o mesmo do projeto `azimut`

3. **Se estiver errado:**
   - Desconectar repositório atual
   - Conectar ao repositório correto: `rranzenberger/azimut`
   - Configurar "Root Directory": `azimut-cms`

---

## 🔍 Como Verificar se Está Funcionando

### **1. Verificar Commit no Deploy**

Vercel Dashboard → Projeto `azimut-backoffice` → Deployments → Deploy mais recente → Aba "Deployment" → Source

**Deve mostrar:**
- ✅ Commit: `333fff4` ou mais recente
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

## 📊 Comparação dos Projetos

| Item | Projeto `azimut` | Projeto `azimut-backoffice` |
|------|------------------|----------------------------|
| **Commit Atual** | `333fff4` ✅ | `62dcdb5` ❌ |
| **Status** | Atualizado | Desatualizado |
| **Repositório** | `rranzenberger/azimut` | `rranzenberger/azimut` (mesmo) |
| **Root Directory** | (raiz) | `azimut-cms` (provavelmente) |

---

## 🚀 Próximos Passos

1. **Fazer redeploy manual** no projeto `azimut-backoffice`:
   - Desmarcar "Use existing Build Cache"
   - Aguardar deploy completo

2. **Verificar configuração:**
   - Root Directory: `azimut-cms`
   - Build Command: `cd azimut-cms && npm run build`
   - Production Branch: `main`

3. **Testar:**
   - Verificar commit no deploy
   - Testar menu no site
   - Verificar se `/admin/pages` funciona

---

**Última atualização:** Guia para resolver problema de dois projetos

