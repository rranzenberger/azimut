# 🚀 Guia de Deploy - Site e Backoffice na Vercel

Este guia mostra como subir o site principal (Vite) e o backoffice (Next.js) na Vercel.

## 📋 Pré-requisitos

1. ✅ Conta na Vercel (já tem)
2. ✅ Conta no GitHub (ou GitLab/Bitbucket)
3. ⚠️ Git instalado (se não tiver, vamos usar upload direto)

---

## 🎯 OPÇÃO 1: Deploy via GitHub (Recomendado)

### **Passo 1: Criar Repositório no GitHub**

1. Acesse: https://github.com/new
2. Crie um repositório:
   - **Nome:** `azimut-site` (ou o que preferir)
   - **Visibilidade:** Private (recomendado)
   - **NÃO** marque "Add README" (já temos arquivos)
3. Clique em **"Create repository"**

### **Passo 2: Conectar com Git Local**

Se tiver Git instalado, execute:

```bash
# Na pasta do projeto
git init
git add .
git commit -m "Initial commit - Site Azimut"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/azimut-site.git
git push -u origin main
```

**Se NÃO tiver Git instalado:** Use a **OPÇÃO 2** abaixo (upload direto).

---

## 🎯 OPÇÃO 2: Deploy via Upload Direto (Mais Rápido)

### **Para o Site Principal (Vite):**

1. Acesse: https://vercel.com/new
2. Clique em **"Add New..."** → **"Project"**
3. Clique em **"Browse"** ou arraste a pasta do projeto
4. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `./` (raiz)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Clique em **"Deploy"**

### **Para o Backoffice (Next.js):**

1. Acesse: https://vercel.com/new
2. Clique em **"Add New..."** → **"Project"**
3. Clique em **"Browse"** ou arraste a pasta `azimut-cms`
4. Configure:
   - **Framework Preset:** Next.js (detecta automaticamente)
   - **Root Directory:** `./azimut-cms`
   - **Build Command:** `npm run build` (já configurado)
   - **Output Directory:** `.next` (automático)
5. Clique em **"Deploy"**

---

## ⚙️ Configurar Variáveis de Ambiente

### **Site Principal (Vite):**

Na Vercel → **Settings** → **Environment Variables**:

```
BASIC_AUTH_ENABLED=true
BASIC_AUTH_USER=azimut
BASIC_AUTH_PASS=Azimut2025!Preview
```

### **Backoffice (Next.js CMS):**

Na Vercel → **Settings** → **Environment Variables**:

```
# Basic Auth
BASIC_AUTH_ENABLED=true
BASIC_AUTH_USER=azimut
BASIC_AUTH_PASS=Azimut2025!Preview

# Database (PostgreSQL da Locaweb)
DATABASE_URL=postgresql://azimt_20255:SUA_SENHA@azimt_20255.postgresql.dbaas.com.br:5432/azimt_20255?sslmode=require

# JWT Secret
JWT_SECRET=azimut-cms-secret-change-in-production-2025

# Node Environment
NODE_ENV=production
```

**⚠️ IMPORTANTE:** Substitua `SUA_SENHA` pela senha real do banco PostgreSQL da Locaweb!

---

## 🌐 Configurar Domínios

### **Site Principal:**

1. Vercel → **Settings** → **Domains**
2. Adicione todos os domínios:
   - `azmt.com.br`
   - `www.azmt.com.br`
   - `azmt.ca`
   - `azimutimmersive.ca`
   - `azimutimmersive.com`
   - `discreet.com.br`
   - `animaparty.com`
   - `architecad.com`
   - `enberger.com`
   - (todos os outros)
3. Marque `azmt.com.br` como **Primary Domain**

### **Backoffice:**

1. Vercel → **Settings** → **Domains**
2. Adicione apenas:
   - `cms.azmt.com.br`

---

## 🔄 Após o Deploy

### **1. Verificar Build**

- Vercel → **Deployments** → Verifique se o build foi bem-sucedido
- Se houver erros, clique no deployment para ver os logs

### **2. Testar Basic Auth**

- Acesse qualquer domínio do site
- Deve aparecer tela de login
- Use as credenciais configuradas

### **3. Configurar Banco de Dados (Backoffice)**

Se ainda não fez:

```bash
# Na pasta azimut-cms (local ou via Vercel CLI)
npm run prisma:generate
npm run prisma:push
npm run prisma:seed
```

Ou execute via Vercel CLI ou conecte ao banco diretamente.

---

## 🛠️ Comandos Úteis

### **Instalar Vercel CLI (Opcional):**

```bash
npm i -g vercel
vercel login
vercel
```

### **Deploy Manual via CLI:**

```bash
# Site principal
cd .
vercel --prod

# Backoffice
cd azimut-cms
vercel --prod
```

---

## ✅ Checklist Final

- [ ] Site principal deployado na Vercel
- [ ] Backoffice deployado na Vercel
- [ ] Variáveis de ambiente configuradas
- [ ] Domínios adicionados e apontando
- [ ] Basic Auth funcionando
- [ ] Banco de dados conectado (backoffice)
- [ ] Seed executado (usuário admin criado)

---

## 🆘 Problemas Comuns

### **Build falha:**
- Verifique os logs na Vercel
- Confirme que `package.json` tem todos os scripts

### **Basic Auth não funciona:**
- Verifique se `BASIC_AUTH_ENABLED=true`
- Faça um novo deploy após adicionar variáveis

### **Domínio não funciona:**
- Aguarde propagação DNS (pode levar até 24h)
- Verifique DNS na Locaweb

---

**Pronto! Agora é só seguir os passos acima!** 🚀










