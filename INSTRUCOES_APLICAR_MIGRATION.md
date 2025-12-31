# 🔧 INSTRUÇÕES - Aplicar Migration do Settings

**Problema:** Tabela Settings não existe no banco de dados de produção

---

## 🚀 SOLUÇÃO RÁPIDA

### Opção 1: Via Vercel (Recomendado)
1. Acesse o dashboard do Vercel
2. Vá em **Settings** → **Environment Variables**
3. Certifique-se que `DATABASE_URL` está configurada
4. Vá em **Deployments** → **Redeploy** (isso aplicará migrations automaticamente)

### Opção 2: Via Script Automático (Recomendado)
```bash
cd azimut-cms
npm run migrate:settings
```

### Opção 3: Via Prisma Migrate
```bash
cd azimut-cms
npx prisma migrate deploy
```

### Opção 4: Aplicar Migration Manualmente (SQL Direto)
Execute o SQL abaixo no banco de dados:

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

-- Inserir valores padrão
INSERT INTO "Settings" ("id", "siteName", "siteUrl", "defaultLanguage", "defaultCountry", "timezone", "createdAt", "updatedAt")
VALUES ('singleton', 'Azimut', 'https://azmt.com.br', 'pt', 'BR', 'America/Sao_Paulo', NOW(), NOW())
ON CONFLICT ("id") DO NOTHING;
```

---

## ✅ VERIFICAÇÃO

Após aplicar a migration, a página de Configurações deve carregar normalmente.

---

**Arquivo da migration:** `azimut-cms/prisma/migrations/20250127120000_add_settings_model/migration.sql`

