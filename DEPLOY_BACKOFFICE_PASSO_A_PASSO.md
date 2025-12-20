# 🚀 Deploy do Backoffice - Passo a Passo Completo

## 📍 Situação Atual

✅ Backoffice está na pasta `azimut-cms`  
✅ Código no mesmo repositório GitHub  
✅ Build configurado corretamente  
⚠️ Precisa criar projeto separado na Vercel  
⚠️ Precisa configurar variáveis de ambiente  
⚠️ Precisa executar seed do banco  

---

## 🎯 PASSO 1: Criar Projeto na Vercel

### 1.1 Acessar Vercel
1. Vá em: https://vercel.com/new
2. Faça login (se não estiver)
3. Clique em **"Add New..."** → **"Project"**

### 1.2 Importar Repositório
1. Selecione o repositório: `rranzenberger/azimut`
2. Clique em **"Import"**

### 1.3 Configurar Projeto ⚠️ IMPORTANTE!

**Configure EXATAMENTE assim:**

- **Project Name:** `azimut-cms` (ou `azimut-backoffice`)
- **Root Directory:** `azimut-cms` ⚠️ **CRÍTICO!**
- **Framework Preset:** Next.js (já detecta automaticamente)
- **Build Command:** `npm run build` (deixa padrão)
- **Output Directory:** `.next` (deixa padrão)
- **Install Command:** `npm install` (deixa padrão)

### 1.4 Deixar Variáveis de Ambiente para Depois

**NÃO adicione variáveis agora!** Primeiro vamos fazer o primeiro deploy, depois configuramos.

Clique em **"Deploy"**

---

## 🎯 PASSO 2: Adicionar Variáveis de Ambiente

### 2.1 Após o Primeiro Deploy

1. Vá em **Settings** (do projeto)
2. Clique em **Environment Variables**
3. Adicione cada uma:

```
DATABASE_URL
postgresql://azimt_20255:SUA_SENHA@azimt_20255.postgresql.dbaas.com.br:5432/azimt_20255?sslmode=require
Production, Preview, Development

JWT_SECRET
azimut-cms-secret-jwt-2025-production-change-me
Production, Preview, Development

NODE_ENV
production
Production, Preview, Development

SITE_URL
https://azmt.com.br
Production, Preview, Development
```

⚠️ **IMPORTANTE:** Substitua `SUA_SENHA` pela senha real do banco PostgreSQL da Locaweb!

### 2.2 Fazer Novo Deploy

Após adicionar variáveis, faça um novo deploy:
- Vá em **Deployments**
- Clique nos **3 pontinhos** do último deploy
- Clique em **"Redeploy"**

---

## 🎯 PASSO 3: Executar Seed do Banco

### 3.1 Instalar e Configurar Localmente

Abra o terminal na pasta do backoffice:

```powershell
cd azimut-cms
npm install
```

### 3.2 Criar Arquivo .env.local

Crie um arquivo `.env.local` na pasta `azimut-cms` com:

```env
DATABASE_URL=postgresql://azimt_20255:SUA_SENHA@azimt_20255.postgresql.dbaas.com.br:5432/azimt_20255?sslmode=require
JWT_SECRET=azimut-cms-secret-jwt-2025-production-change-me
NODE_ENV=production
SITE_URL=https://azmt.com.br
```

### 3.3 Executar Prisma

```powershell
npm run prisma:generate
npm run prisma:push
npm run prisma:seed
```

Isso vai:
- ✅ Gerar o cliente Prisma
- ✅ Criar as tabelas no banco
- ✅ Criar o usuário admin

### 3.4 Credenciais do Admin

Após o seed, você poderá fazer login com:
- **Email:** `admin@azimut.com.br`
- **Senha:** `Azimut2025!`

---

## 🎯 PASSO 4: Configurar Domínio

### 4.1 Adicionar Domínio na Vercel

1. Vá em **Settings** → **Domains**
2. Adicione: `cms.azimut.com.br`
3. Anote o IP/CNAME que aparecer

### 4.2 Configurar DNS na Locaweb

Na Locaweb, adicione:

**Tipo:** `CNAME`  
**Nome:** `cms`  
**Valor:** `cname.vercel-dns.com` (ou o valor que a Vercel mostrar)

Aguarde a propagação (5-30 minutos).

---

## 🎯 PASSO 5: Testar

1. Acesse: `https://cms-xxx.vercel.app` (URL temporária)
2. Ou: `https://cms.azimut.com.br` (quando DNS propagar)
3. Faça login com:
   - Email: `admin@azimut.com.br`
   - Senha: `Azimut2025!`

---

## ❌ Se Der Erro

### Erro: "Prisma Client not generated"
- Verifique se o `package.json` tem `"postinstall": "prisma generate"`
- Faça redeploy na Vercel

### Erro: "Cannot connect to database"
- Verifique se `DATABASE_URL` está correta
- Verifique se o banco está acessível (firewall Locaweb)

### Erro: "JWT_SECRET is required"
- Adicione `JWT_SECRET` nas variáveis de ambiente
- Faça redeploy

---

## ✅ Checklist Final

- [ ] Projeto criado na Vercel com Root Directory: `azimut-cms`
- [ ] Variáveis de ambiente configuradas
- [ ] Deploy realizado com sucesso
- [ ] Seed executado localmente (banco criado + admin)
- [ ] Domínio `cms.azimut.com.br` configurado
- [ ] Login testado e funcionando

---

**Pronto! Agora é só seguir os passos acima!** 🚀










