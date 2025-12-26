# ⚡ SETUP RÁPIDO DO CMS - 5 MINUTOS

## 🎯 O que você precisa:

1. Conta no Supabase (grátis)
2. API Key do DeepSeek (grátis)

---

## 📝 PASSO 1: Criar conta no Supabase

### 1.1. Acessar

Vá em: **https://supabase.com**

### 1.2. Criar conta

- Clique em "Start your project"
- Faça login com GitHub (recomendado) ou email

### 1.3. Criar projeto

- Nome: `azimut-cms`
- Database Password: **anote isso!** (ex: `Azimut2025!`)
- Region: South America (São Paulo)
- Clique em "Create new project"

⏳ **Aguarde 2 minutos** (criando o banco de dados)

---

## 📋 PASSO 2: Copiar credenciais

### 2.1. Database URL

1. No Supabase, vá em: **Settings** (ícone de engrenagem)
2. Clique em: **Database**
3. Role até: **Connection string** → **URI**
4. Copie a URL que começa com `postgresql://...`

**Importante:** Troque `[YOUR-PASSWORD]` pela senha que você criou!

### 2.2. Storage Keys

1. Vá em: **Settings** → **API**
2. Copie:
   - **Project URL** (ex: `https://xxxxx.supabase.co`)
   - **anon public** (começa com `eyJh...`)
   - **service_role** (começa com `eyJh...`)

---

## 🔑 PASSO 3: Configurar .env.local

Na pasta `azimut-cms`, edite o arquivo `.env.local`:

```bash
# Database
DATABASE_URL="postgresql://postgres.xxxxx:[SUA-SENHA]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJh..."
SUPABASE_SERVICE_ROLE_KEY="eyJh..."

# NextAuth
NEXTAUTH_URL="http://localhost:3001"
NEXTAUTH_SECRET="azimut-2025-secret-change-in-production"

# IA (opcional por enquanto)
AI_PROVIDER="deepseek"
DEEPSEEK_API_KEY="sk-..."

# Site
SITE_URL="http://localhost:5173"
```

---

## 🗄️ PASSO 4: Criar storage bucket

1. No Supabase, vá em: **Storage**
2. Clique em: **Create a new bucket**
3. Nome: `media`
4. **Public bucket**: ✅ (marque esta opção)
5. Clique em **Create bucket**

---

## 🚀 PASSO 5: Rodar migrations

No terminal do CMS (`azimut-cms`):

```powershell
# Gerar Prisma client
npm run prisma:generate

# Criar tabelas
npm run prisma:push

# Popular com dados iniciais
npm run prisma:seed
```

Você verá:
```
✅ Database seeded successfully!

📝 Credenciais do Admin:
   Email: admin@azimut.com.br
   Senha: Azimut2025!

🚀 Acesse: http://localhost:3001/login
```

---

## ✅ PASSO 6: Iniciar CMS

```powershell
npm run dev
```

Acesse: **http://localhost:3001**

---

## 🎉 PRONTO!

Agora você tem:
- ✅ CMS rodando
- ✅ Banco de dados configurado
- ✅ IA pronta (quando adicionar API key)

---

## 🔑 OPCIONAL: DeepSeek (IA)

Se quiser ativar a IA:

1. Acesse: https://platform.deepseek.com/
2. Crie conta (grátis)
3. Vá em: **API Keys**
4. Crie uma key
5. Adicione no `.env.local`:
   ```bash
   DEEPSEEK_API_KEY="sk-..."
   ```

---

## 🆘 ERROS COMUNS

### "Can't reach database server"

**Solução:** Verifique se a DATABASE_URL está correta e se trocou `[YOUR-PASSWORD]`

### "Bucket not found"

**Solução:** Crie o bucket `media` no Supabase Storage (passo 4)

### "Invalid API key"

**Solução:** Verifique se copiou todas as 3 keys do Supabase (URL, anon, service_role)

---

**Qualquer dúvida, me chama! 😊**
























