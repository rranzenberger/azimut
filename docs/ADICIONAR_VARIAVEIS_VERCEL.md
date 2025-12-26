# 🔐 Adicionar Variáveis de Ambiente no Vercel

## ✅ **Já Configurado:**
- [x] `DATABASE_URL` ✅

## ⚠️ **Variáveis que Precisam ser Adicionadas:**

### **1. NEXTAUTH_SECRET** (OBRIGATÓRIO)

**No Vercel:**
1. Clique em **"Add New"** ou **"Create"**
2. Configure:
   - **Name**: `NEXTAUTH_SECRET`
   - **Value**: `azimut-nextauth-secret-2025-production-change-me-please` (ou gere um com openssl)
   - **Environments**: Marque todas (Production, Preview, Development)
3. Clique em **"Save"**

**Para gerar um secret seguro (opcional):**
- Acesse: https://generate-secret.vercel.app/32
- Ou terminal: `openssl rand -base64 32`

---

### **2. NEXTAUTH_URL** (OBRIGATÓRIO)

**No Vercel:**
1. Clique em **"Add New"**
2. Configure:
   - **Name**: `NEXTAUTH_URL`
   - **Value**: `https://azimut-backoffice.vercel.app`
   - **Environments**: Production, Preview
3. Clique em **"Save"**

---

### **3. SITE_URL** (OPCIONAL mas recomendado)

**No Vercel:**
1. Clique em **"Add New"**
2. Configure:
   - **Name**: `SITE_URL`
   - **Value**: `https://azmt.com.br`
   - **Environments**: Production, Preview, Development
3. Clique em **"Save"**

---

## 🗄️ **IMPORTANTE: Rodar Seed no Banco**

Após adicionar as variáveis, o banco precisa ter o usuário admin criado.

### **Opção 1: Via Vercel CLI (Recomendado)**

```powershell
cd azimut-cms
vercel env pull .env.local
npm run prisma:seed
```

### **Opção 2: Via SQL Direto no Neon**

1. Acesse: https://console.neon.tech
2. Seu projeto → SQL Editor
3. Execute o SQL do seed manualmente

---

## 📋 **Checklist:**

- [ ] Adicionar `NEXTAUTH_SECRET`
- [ ] Adicionar `NEXTAUTH_URL`
- [ ] Adicionar `SITE_URL` (opcional)
- [ ] Rodar seed no banco (criar usuário admin)
- [ ] Fazer novo deploy (ou aguardar deploy automático)
- [ ] Testar login com:
  - Email: `admin@azimut.com.br`
  - Senha: `Azimut2025!`

---

## 🚀 **Depois de Adicionar:**

1. As variáveis serão aplicadas automaticamente no próximo deploy
2. Ou faça um redeploy manual: Vercel → Deployments → Redeploy

