# 🔧 Corrigir Repositório Conectado - ERRO CRÍTICO

## 🐛 Problema Identificado

**Repositório conectado está ERRADO!**

- ❌ **Conectado:** `rranzenberger/azimut-backoffice` (ERRADO!)
- ✅ **Deveria ser:** `rranzenberger/azimut` (CORRETO!)

**Isso explica por que o projeto não detecta commits novos!**

O projeto está conectado a um repositório diferente (ou que não existe), por isso não vê os commits `333fff4`, `ccc1c69`, etc.

---

## ✅ Solução: Conectar ao Repositório Correto

### **PASSO 1: Desconectar Repositório Errado**

1. **Vercel Dashboard:** https://vercel.com/dashboard
2. **Projeto:** `azimut-backoffice`
3. **Settings** → **"Git"** (menu lateral)
4. **Na seção "Connected Git Repository"**
5. **Clique em "Disconnect"** (botão no canto direito)
6. **Confirme a desconexão**

---

### **PASSO 2: Conectar ao Repositório Correto**

1. **Na mesma página (Git)**, você verá:
   - "Connect Git Repository"
   - Lista de repositórios disponíveis

2. **Procure por:** `rranzenberger/azimut`
   - ✅ **Este é o repositório CORRETO!**
   - ❌ **NÃO conecte:** `azimut-backoffice` (não existe ou está vazio)

3. **Clique em "Connect"** ao lado de `rranzenberger/azimut`

---

### **PASSO 3: Configurar Durante a Conexão** (CRUCIAL!)

Quando conectar, você verá opções de configuração:

#### **3.1. Root Directory** ⚠️ ESSENCIAL!

1. **Clique em "Edit"** ou "Configure" ao lado de "Root Directory"
2. **Digite:** `azimut-cms`
3. ✅ **Isso é CRUCIAL!** Sem isso, o projeto não encontra os arquivos

#### **3.2. Framework Preset**

- Selecione: **"Next.js"** (ou deixe auto-detect)

#### **3.3. Build Command**

- Deve aparecer automaticamente: `cd azimut-cms && npm run build`
- Se não aparecer, digite manualmente

#### **3.4. Output Directory**

- Deve aparecer: `.next`
- Ou deixe vazio (usa padrão)

#### **3.5. Production Branch**

- Selecione: **`main`**

#### **3.6. Environment Variables**

- Adicione todas as variáveis necessárias:
  - `DATABASE_URL`
  - `JWT_SECRET`
  - `NODE_ENV=production`
  - Etc.

#### **3.7. Deploy**

- Clique em **"Deploy"** ou **"Connect"**

---

### **PASSO 4: Aguardar Deploy Inicial**

1. **Aguarde 2-5 minutos** para o deploy inicial
2. **Verifique o deploy:**
   - Deve mostrar commit `333fff4` ou mais recente
   - Status: "Ready" (verde)
   - **NÃO deve mais mostrar:** `62dcdb5`

---

## 🔍 Como Verificar se Está Correto

### **1. Verificar Repositório Conectado**

Vercel Dashboard → `azimut-backoffice` → Settings → Git

**Deve mostrar:**
- ✅ Repositório: `rranzenberger/azimut`
- ✅ Status: "Connected"
- ❌ **NÃO deve mostrar:** `azimut-backoffice`

### **2. Verificar Root Directory**

Vercel Dashboard → `azimut-backoffice` → Settings → General

**Deve mostrar:**
- ✅ Root Directory: `azimut-cms`
- ❌ **NÃO deve estar:** vazio ou outro valor

### **3. Verificar Commit no Deploy**

Vercel Dashboard → `azimut-backoffice` → Deployments → Deploy mais recente → Aba "Deployment" → Source

**Deve mostrar:**
- ✅ Commit: `333fff4` ou mais recente
- ✅ Branch: `main`
- ❌ **NÃO deve ser:** `62dcdb5`

---

## ⚠️ Por Que Estava Errado?

**Possíveis causas:**
1. Projeto foi criado conectando ao repositório errado
2. Repositório `azimut-backoffice` existe mas está vazio/antigo
3. Configuração foi alterada acidentalmente

**Solução:**
- Conectar ao repositório correto: `rranzenberger/azimut`
- Configurar Root Directory: `azimut-cms`

---

## ✅ Checklist Final

- [ ] Repositório desconectado: `azimut-backoffice` (errado)
- [ ] Repositório conectado: `rranzenberger/azimut` (correto)
- [ ] Root Directory configurado: `azimut-cms`
- [ ] Production Branch: `main`
- [ ] Deploy mostra commit `333fff4` ou mais recente
- [ ] Menu mostra "Páginas" (sem "em breve")

---

## 🎯 Resumo

**O problema era o repositório conectado estar ERRADO!**

**Solução:**
1. Desconectar: `rranzenberger/azimut-backoffice` (errado)
2. Conectar: `rranzenberger/azimut` (correto)
3. Configurar Root Directory: `azimut-cms`
4. Aguardar deploy automático

---

**Última atualização:** Correção de repositório conectado

