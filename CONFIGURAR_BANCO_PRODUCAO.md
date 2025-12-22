# 🗄️ Configurar Banco Neon em Produção

## ✅ **Status Atual:**
- [x] `DATABASE_URL` já configurada no Vercel
- [ ] Variáveis de ambiente faltantes (`NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `SITE_URL`)
- [ ] Seed não rodado (banco sem usuário admin)

---

## 🔐 **PASSO 1: Adicionar Variáveis de Ambiente no Vercel**

Na tela que você está (Vercel → `azimut-backoffice` → Settings → Environment Variables):

### **1. NEXTAUTH_SECRET**
- Clique em **"Add New"** ou **"Create"**
- **Name**: `NEXTAUTH_SECRET`
- **Value**: `azimut-nextauth-secret-2025-production-secure-key`
- **Environments**: Marque todas ✅ (Production, Preview, Development)
- Clique em **"Save"**

### **2. NEXTAUTH_URL**
- Clique em **"Add New"**
- **Name**: `NEXTAUTH_URL`
- **Value**: `https://azimut-backoffice.vercel.app`
- **Environments**: Marque Production e Preview ✅
- Clique em **"Save"**

### **3. SITE_URL** (opcional mas recomendado)
- Clique em **"Add New"**
- **Name**: `SITE_URL`
- **Value**: `https://azmt.com.br`
- **Environments**: Marque todas ✅
- Clique em **"Save"**

---

## 🌱 **PASSO 2: Rodar Seed no Banco de Produção**

O banco precisa ter o usuário admin criado. Você tem 2 opções:

### **Opção A: Via Vercel CLI (Recomendado)**

```powershell
# 1. Ir para pasta do backoffice
cd azimut-cms

# 2. Baixar variáveis de ambiente do Vercel
vercel env pull .env.local

# 3. Rodar seed (vai criar usuário admin)
npm run prisma:seed
```

**Credenciais que serão criadas:**
- Email: `admin@azimut.com.br`
- Senha: `Azimut2025!`

### **Opção B: Via Endpoint Temporário (Mais Fácil)**

Vou criar um endpoint `/api/admin/setup` que você pode chamar uma vez para rodar o seed. 

**⚠️ Depois de usar, vamos remover ou proteger com senha!**

---

## 🚀 **PASSO 3: Testar Login**

Após rodar o seed:

1. Acesse: `https://azimut-backoffice.vercel.app/login`
2. Use as credenciais:
   - **Email**: `admin@azimut.com.br`
   - **Senha**: `Azimut2025!`

---

## 📋 **Checklist Final:**

- [ ] Adicionar `NEXTAUTH_SECRET` no Vercel
- [ ] Adicionar `NEXTAUTH_URL` no Vercel
- [ ] Adicionar `SITE_URL` no Vercel (opcional)
- [ ] Rodar seed no banco (Opção A ou B)
- [ ] Aguardar deploy automático (ou fazer redeploy)
- [ ] Testar login com `admin@azimut.com.br` / `Azimut2025!`

---

## 🆘 **Se der erro:**

### Erro: "Can't reach database server"
- Verifique se `DATABASE_URL` está correta no Vercel
- Confirme que o banco Neon está ativo

### Erro: "User not found"
- O seed não foi rodado ainda
- Execute o seed (Opção A ou B acima)

### Erro: "Invalid credentials"
- Confirme que usou: `admin@azimut.com.br` / `Azimut2025!`
- Se não funcionar, rode o seed novamente

---

**Me avise quando adicionar as variáveis e qual opção você prefere para rodar o seed!** 😊

