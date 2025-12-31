# 🔧 COMO APLICAR MIGRATION DO SETTINGS

**Status:** Migration criada, mas precisa ser aplicada no banco de produção

---

## 📊 SITUAÇÃO ATUAL

✅ **Migration criada:** `azimut-cms/prisma/migrations/20250127120000_add_settings_model/migration.sql`  
✅ **Schema atualizado:** Modelo Settings no `schema.prisma`  
✅ **Código pronto:** Sistema funciona com valores padrão mesmo sem tabela  
⚠️ **Banco de produção:** Tabela Settings ainda não existe

---

## 🚀 OPÇÕES PARA APLICAR

### Opção 1: Script Automático (Mais Fácil) ⭐

```bash
cd azimut-cms
npm run migrate:settings
```

**O que faz:**
- Verifica se tabela existe
- Cria tabela se não existir
- Cria registro padrão automaticamente
- Funciona mesmo se já existir

### Opção 2: Prisma Migrate Deploy (Recomendado para Produção)

```bash
cd azimut-cms
npx prisma migrate deploy
```

**O que faz:**
- Aplica TODAS as migrations pendentes
- Rastreia no histórico do Prisma
- Seguro para produção

### Opção 3: SQL Manual (Se outras opções falharem)

Execute no seu banco de dados (Supabase/PostgreSQL):

```sql
-- Criar tabela Settings
CREATE TABLE IF NOT EXISTS "Settings" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "siteName" TEXT DEFAULT 'Azimut',
    "siteUrl" TEXT DEFAULT 'https://azmt.com.br',
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "defaultMetaDescription" TEXT,
    "defaultKeywords" TEXT,
    "ogImageUrl" TEXT,
    "facebookUrl" TEXT,
    "instagramUrl" TEXT,
    "linkedinUrl" TEXT,
    "twitterUrl" TEXT,
    "youtubeUrl" TEXT,
    "kabbamApiKey" TEXT,
    "kabbamApiUrl" TEXT,
    "smtpHost" TEXT,
    "smtpPort" INTEGER,
    "smtpUser" TEXT,
    "smtpPassword" TEXT,
    "smtpFromEmail" TEXT,
    "deepseekApiKey" TEXT,
    "notificationEmail" TEXT,
    "defaultLanguage" TEXT DEFAULT 'pt',
    "defaultCountry" TEXT DEFAULT 'BR',
    "timezone" TEXT DEFAULT 'America/Sao_Paulo',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- Inserir registro padrão (só se não existir)
INSERT INTO "Settings" ("id", "siteName", "siteUrl", "defaultLanguage", "defaultCountry", "timezone", "createdAt", "updatedAt")
VALUES ('singleton', 'Azimut', 'https://azmt.com.br', 'pt', 'BR', 'America/Sao_Paulo', NOW(), NOW())
ON CONFLICT ("id") DO NOTHING;
```

### Opção 4: Via Vercel (Automático)

1. Acesse dashboard do Vercel
2. Vá em **Settings** → **Build & Development Settings**
3. Adicione no **Build Command**: `prisma generate && prisma migrate deploy && next build`
4. Faça **Redeploy**

Ou simplesmente:
- Vercel aplica migrations automaticamente se detectar `prisma/migrations/`
- Faça um **Redeploy** que deve aplicar

---

## ✅ VERIFICAÇÃO

Após aplicar, verifique:

```bash
# Verificar se tabela existe
cd azimut-cms
npx prisma studio
# Ou
npx prisma db execute --stdin < prisma/migrations/20250127120000_add_settings_model/migration.sql
```

---

## 🎯 RECOMENDAÇÃO

**Para produção (Vercel):**
- Use **Opção 2** (`prisma migrate deploy`) ou
- Faça **Redeploy no Vercel** (deve aplicar automaticamente)

**Para desenvolvimento local:**
- Use **Opção 1** (`npm run migrate:settings`) - mais simples

---

**Nota:** O sistema já funciona com valores padrão mesmo sem a tabela, mas é melhor criar a tabela para salvar configurações permanentemente.

