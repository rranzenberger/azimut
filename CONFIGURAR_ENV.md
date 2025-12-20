# 🔧 Como Configurar Variáveis de Ambiente

## 📋 Site Principal (azimut-site-vite-tailwind)

### 1. Criar arquivo `.env` na raiz

Crie um arquivo `.env` na raiz do projeto com:

```bash
# URL da API do CMS (Backoffice)
# Desenvolvimento local:
VITE_CMS_API_URL=http://localhost:3001/api

# Produção (após deploy do CMS):
# VITE_CMS_API_URL=https://azimut-backoffice.vercel.app/api
```

### 2. Adicionar na Vercel (Produção)

1. Acesse: https://vercel.com/dashboard
2. Abra o projeto do site
3. **Settings** → **Environment Variables**
4. Adicione:
   - **Name**: `VITE_CMS_API_URL`
   - **Value**: `https://azimut-backoffice.vercel.app/api`
   - Marque: **Production**, **Preview**, **Development**
5. Clique em **Save**
6. Faça redeploy

---

## 📋 CMS/Backoffice (azimut-cms)

### 1. Criar arquivo `.env.local`

No diretório `azimut-cms`, crie `.env.local`:

```bash
# Database (PostgreSQL/Supabase)
DATABASE_URL=postgresql://usuario:senha@host:5432/database

# NextAuth
NEXTAUTH_URL=http://localhost:3001
NEXTAUTH_SECRET=azimut-2025-secret-change-in-production

# JWT
JWT_SECRET=azimut-cms-secret-jwt-2025-production-change-me

# Supabase (para storage de imagens)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh...
SUPABASE_SERVICE_ROLE_KEY=eyJh...

# IA (opcional)
AI_PROVIDER=deepseek
DEEPSEEK_API_KEY=sk-...

# Site URL
SITE_URL=http://localhost:5173
```

### 2. Adicionar na Vercel (Produção)

1. Acesse: https://vercel.com/dashboard
2. Abra projeto `azimut-backoffice`
3. **Settings** → **Environment Variables**
4. Adicione todas as variáveis acima
5. Marque todas para **Production**, **Preview**, **Development**
6. Clique em **Save**
7. Faça redeploy

---

## ✅ Verificar Configuração

### Site Principal

Execute:
```powershell
.\scripts\verificar-integracao-site.ps1
```

### CMS

Execute:
```powershell
.\scripts\verificar-config-cms.ps1
```

---

## 🔑 Onde Obter as Credenciais

### Supabase

1. Acesse: https://supabase.com/dashboard
2. Abra seu projeto
3. **Settings** → **API**
4. Copie:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY`
5. **Settings** → **Database** → **Connection string** → **URI**
   - Copie e substitua `[YOUR-PASSWORD]` → `DATABASE_URL`

### DeepSeek (IA)

1. Acesse: https://platform.deepseek.com/
2. Crie conta (grátis)
3. Vá em **API Keys**
4. Crie uma key → `DEEPSEEK_API_KEY`

### JWT Secret

Gere um secret seguro:
```bash
# No PowerShell:
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

Ou use: https://generate-secret.vercel.app/32

---

## ⚠️ Importante

- **NUNCA** commite arquivos `.env` ou `.env.local` no Git
- Use `.env.example` como template
- Em produção, sempre use variáveis de ambiente da Vercel
- Troque os secrets padrão em produção!

