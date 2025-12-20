# 🚀 Configuração Passo a Passo - Guia Completo

## 🎯 O que você precisa configurar

1. **CMS (Backoffice)** - Banco de dados, Supabase, IA
2. **Site Principal** - URL da API do CMS

---

## 📋 PARTE 1: Configurar o CMS

### Opção A: Script Interativo (Recomendado) ⚡

Execute o script interativo que guia você passo a passo:

```powershell
.\scripts\configurar-cms-interativo.ps1
```

O script vai:
- ✅ Perguntar cada variável necessária
- ✅ Gerar secrets automaticamente (JWT, NextAuth)
- ✅ Criar o arquivo `.env.local` automaticamente
- ✅ Mostrar próximos passos

### Opção B: Manual 📝

Se preferir fazer manualmente:

1. **Criar arquivo `.env.local`** em `azimut-cms/`:

```bash
# Database (PostgreSQL/Supabase)
DATABASE_URL="postgresql://postgres:senha@host:5432/database"

# NextAuth
NEXTAUTH_URL="http://localhost:3001"
NEXTAUTH_SECRET="cole-secret-gerado-aqui"

# JWT
JWT_SECRET="cole-secret-gerado-aqui"

# Supabase (Storage de Imagens)
NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="eyJh..."
SUPABASE_SERVICE_ROLE_KEY="eyJh..."

# IA (Opcional)
AI_PROVIDER="deepseek"
DEEPSEEK_API_KEY="sk-..."

# Site URL
SITE_URL="http://localhost:5173"
```

2. **Gerar Secrets:**

No PowerShell:
```powershell
# Gerar JWT Secret
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))

# Gerar NextAuth Secret
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

Ou use: https://generate-secret.vercel.app/32

---

## 📋 PARTE 2: Configurar o Site Principal

### Opção A: Script Interativo (Recomendado) ⚡

Execute o script interativo:

```powershell
.\scripts\configurar-site-interativo.ps1
```

O script vai:
- ✅ Perguntar qual ambiente (desenvolvimento/produção)
- ✅ Criar o arquivo `.env` automaticamente
- ✅ Mostrar próximos passos

### Opção B: Manual 📝

1. **Criar arquivo `.env`** na raiz do projeto:

```bash
# URL da API do CMS (Backoffice)
# Desenvolvimento local:
VITE_CMS_API_URL=http://localhost:3001/api

# Produção (após deploy):
# VITE_CMS_API_URL=https://azimut-backoffice.vercel.app/api
```

---

## 🔑 Onde Obter as Credenciais

### 1. Supabase (Database + Storage)

1. Acesse: https://supabase.com/dashboard
2. Crie um projeto (se não tiver):
   - Nome: `azimut-cms`
   - Senha do banco: **anote isso!**
   - Região: South America (São Paulo)
3. **Settings** → **API**:
   - Copie **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - Copie **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Copie **service_role** → `SUPABASE_SERVICE_ROLE_KEY`
4. **Settings** → **Database** → **Connection string** → **URI**:
   - Copie a URL
   - Substitua `[YOUR-PASSWORD]` pela senha que você criou
   - Cole em `DATABASE_URL`
5. **Storage** → **Create bucket**:
   - Nome: `media`
   - Marque como **público**

### 2. DeepSeek (IA - Opcional)

1. Acesse: https://platform.deepseek.com/
2. Crie conta (grátis)
3. Vá em **API Keys**
4. Crie uma key
5. Cole em `DEEPSEEK_API_KEY`

---

## ✅ Verificar Configuração

### CMS

```powershell
.\scripts\verificar-config-cms.ps1
```

Este script verifica:
- ✅ Se `.env.local` existe
- ✅ Se todas as variáveis obrigatórias estão preenchidas
- ✅ Se node_modules existe
- ✅ Se Prisma está configurado

### Site Principal

```powershell
.\scripts\verificar-integracao-site.ps1
```

Este script verifica:
- ✅ Se `.env` existe
- ✅ Se `VITE_CMS_API_URL` está configurada
- ✅ Se `analytics.ts` existe
- ✅ Se `useAzimutContent.ts` existe
- ✅ Se páginas estão usando tracking

---

## 🚀 Próximos Passos Após Configurar

### 1. Instalar Dependências do CMS

```powershell
cd azimut-cms
npm install
```

### 2. Configurar Banco de Dados

```powershell
# Gerar Prisma Client
npm run prisma:generate

# Criar tabelas no banco
npm run prisma:push

# Popular com dados iniciais (cria usuário admin)
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

### 3. Iniciar CMS

```powershell
npm run dev
```

Acesse: **http://localhost:3001**

### 4. Iniciar Site Principal

Em outro terminal:

```powershell
# Voltar para raiz
cd ..

# Iniciar site
npm run dev
```

Acesse: **http://localhost:5173**

### 5. Testar Integração

1. Abra DevTools → **Network**
2. Navegue pelo site
3. Verifique se há chamadas para:
   - `/api/geo` - Detecção de país
   - `/api/track` - Tracking de comportamento
   - `/api/public/content` - Conteúdo personalizado

---

## 🆘 Problemas Comuns

### "Can't reach database server"

**Solução:**
- Verifique se `DATABASE_URL` está correta
- Certifique-se de ter substituído `[YOUR-PASSWORD]` pela senha real
- Verifique se o Supabase está ativo (não pausado)

### "Bucket not found"

**Solução:**
- Crie o bucket `media` no Supabase Storage
- Configure como **público**

### "Invalid API key" (Supabase)

**Solução:**
- Verifique se copiou todas as 3 keys corretamente
- Certifique-se de copiar a key completa (pode ser longa)

### Site não consegue acessar API do CMS

**Solução:**
- Verifique se o CMS está rodando (`npm run dev` em `azimut-cms`)
- Verifique se `VITE_CMS_API_URL` está correta no `.env`
- Reinicie o servidor do site após criar `.env`

---

## 📚 Documentação Adicional

- **CONFIGURAR_ENV.md** - Guia detalhado de variáveis
- **azimut-cms/SETUP_RAPIDO_SUPABASE.md** - Setup rápido do Supabase
- **azimut-cms/DEEPSEEK_SETUP.md** - Setup do DeepSeek (IA)
- **PROXIMOS_PASSOS_PRIORITARIOS.md** - Próximos passos após configurar

---

## 🎉 Pronto!

Agora você tem tudo configurado! 

**Próximo passo:** Fazer o deploy do CMS na Vercel (veja `PROXIMOS_PASSOS_PRIORITARIOS.md`)

---

**Última atualização:** Dezembro 2025

