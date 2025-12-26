# 🚀 Deploy do Backoffice (CMS) na Vercel

## 📋 Pré-requisitos

1. ✅ Backoffice está no mesmo repositório (pasta `azimut-cms`)
2. ⚠️ Precisa configurar variáveis de ambiente na Vercel
3. ⚠️ Precisa executar seed do banco de dados (criar usuário admin)

---

## 🎯 Passo a Passo

### **1. Criar Novo Projeto na Vercel para o Backoffice**

1. Acesse: https://vercel.com/new
2. Conecte com o mesmo repositório: `rranzenberger/azimut`
3. **IMPORTANTE:** Configure o projeto:
   - **Root Directory:** `azimut-cms` (⚠️ ESSENCIAL!)
   - **Framework Preset:** Next.js (detecta automaticamente)
   - **Build Command:** `npm run build` (já configurado no package.json)
   - **Output Directory:** `.next` (automático para Next.js)

### **2. Configurar Variáveis de Ambiente**

Na Vercel → **Settings** → **Environment Variables**, adicione:

```
# Basic Auth (opcional)
BASIC_AUTH_ENABLED=false
BASIC_AUTH_USER=azimut
BASIC_AUTH_PASS=Azimut2025!Preview

# Database (PostgreSQL da Locaweb)
DATABASE_URL=postgresql://azimt_20255:SUA_SENHA@azimt_20255.postgresql.dbaas.com.br:5432/azimt_20255?sslmode=require

# JWT Secret
JWT_SECRET=azimut-cms-secret-change-in-production-2025

# Node Environment
NODE_ENV=production

# Site URL (para CORS)
SITE_URL=https://azmt.com.br
```

**⚠️ IMPORTANTE:** Substitua `SUA_SENHA` pela senha real do banco PostgreSQL da Locaweb!

### **3. Executar Seed do Banco de Dados**

Depois do primeiro deploy, você precisa criar o usuário admin:

**Opção A - Via Vercel CLI (recomendado):**
```bash
cd azimut-cms
vercel env pull .env.local
npm install
npm run prisma:generate
npm run prisma:push
npm run prisma:seed
```

**Opção B - Via Terminal Local:**
1. Configure o `.env.local` com as mesmas variáveis
2. Execute localmente:
```bash
cd azimut-cms
npm install
npm run prisma:generate
npm run prisma:push
npm run prisma:seed
```

### **4. Adicionar Domínio**

Na Vercel → **Settings** → **Domains**:
- Adicione: `cms.azimut.com.br`
- Configure DNS na Locaweb (já configurado antes)

### **5. Verificar Deploy**

1. Aguarde o deploy terminar
2. Acesse: `https://cms-xxx.vercel.app` (URL temporária)
3. Ou: `https://cms.azimut.com.br` (quando DNS propagar)

---

## ✅ Credenciais do Admin

Após executar o seed:
- **Email:** `admin@azimut.com.br`
- **Senha:** `Azimut2025!`

---

## 🔧 Se Der Erro no Build

**Erro: "Prisma Client not generated"**
- A Vercel precisa gerar o Prisma Client antes do build
- Adicione no `package.json`:
```json
"postinstall": "prisma generate"
```

Ou configure na Vercel:
- **Install Command:** `npm install && npm run prisma:generate`

---

## 📝 Checklist

- [ ] Projeto criado na Vercel
- [ ] Root Directory configurado: `azimut-cms`
- [ ] Variáveis de ambiente adicionadas
- [ ] Deploy realizado
- [ ] Seed executado (usuário admin criado)
- [ ] Domínio `cms.azimut.com.br` adicionado
- [ ] Login testado

---

**Pronto! Agora é só seguir os passos acima!** 🚀

















