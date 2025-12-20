# 🚀 COMEÇAR AGORA - Configuração Rápida

## ⚡ Opção 1: Scripts Interativos (Mais Fácil!)

### 1️⃣ Configurar CMS

```powershell
.\scripts\configurar-cms-interativo.ps1
```

O script vai:
- ✅ Perguntar cada variável necessária
- ✅ Gerar secrets automaticamente
- ✅ Criar `.env.local` automaticamente

### 2️⃣ Configurar Site Principal

```powershell
.\scripts\configurar-site-interativo.ps1
```

O script vai:
- ✅ Perguntar qual ambiente usar
- ✅ Criar `.env` automaticamente

---

## 📋 Opção 2: Manual (Passo a Passo)

### Passo 1: Configurar CMS

1. **Criar arquivo** `azimut-cms\.env.local`:

```bash
DATABASE_URL="postgresql://postgres:senha@host:5432/database"
NEXTAUTH_URL="http://localhost:3001"
NEXTAUTH_SECRET="gere-com-script-ou-online"
JWT_SECRET="gere-com-script-ou-online"
NEXT_PUBLIC_SUPABASE_URL="https://xxxxx.supabase.co"
SUPABASE_SERVICE_ROLE_KEY="eyJh..."
SITE_URL="http://localhost:5173"
```

2. **Gerar Secrets** (PowerShell):

```powershell
# Gerar JWT Secret
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))
```

Ou use: https://generate-secret.vercel.app/32

### Passo 2: Configurar Site

1. **Criar arquivo** `.env` na raiz:

```bash
VITE_CMS_API_URL=http://localhost:3001/api
```

---

## 🔑 Onde Obter Credenciais

### Supabase (Database + Storage)

1. Acesse: https://supabase.com/dashboard
2. Crie projeto → **Settings** → **API** → Copie:
   - Project URL
   - anon public key
   - service_role key
3. **Settings** → **Database** → **Connection string** → **URI**
4. **Storage** → Criar bucket `media` (público)

### DeepSeek (IA - Opcional)

1. Acesse: https://platform.deepseek.com/
2. Crie conta → **API Keys** → Crie key

---

## ✅ Verificar

```powershell
# Verificar CMS
.\scripts\verificar-config-cms.ps1

# Verificar Site
.\scripts\verificar-integracao-site.ps1
```

---

## 🚀 Próximos Passos

1. **Instalar dependências:**
```powershell
cd azimut-cms
npm install
```

2. **Configurar banco:**
```powershell
npm run prisma:generate
npm run prisma:push
npm run prisma:seed
```

3. **Iniciar CMS:**
```powershell
npm run dev
```

4. **Iniciar Site** (outro terminal):
```powershell
cd ..
npm run dev
```

---

## 📚 Documentação Completa

- **CONFIGURACAO_PASSO_A_PASSO.md** - Guia detalhado completo
- **CONFIGURAR_ENV.md** - Referência de variáveis
- **PROXIMOS_PASSOS_PRIORITARIOS.md** - Após configurar

---

**💡 Dica:** Use os scripts interativos! Eles guiam você passo a passo. 🎯

