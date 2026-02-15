# Deploy do Backoffice (azimut-cms)

## Build local

Para o build do Next.js concluir sem erro do Prisma, defina a variável de ambiente antes de rodar o build:

**PowerShell (Windows):**
```powershell
$env:PRISMA_CLIENT_ENGINE_TYPE='library'; npm run build
```

**Bash (Linux/macOS):**
```bash
PRISMA_CLIENT_ENGINE_TYPE=library npm run build
```

## Vercel / ambiente de deploy

O script `vercel-build` já roda `next build` com `PRISMA_CLIENT_ENGINE_TYPE=library` (via cross-env). Se o build ainda falhar com "Invalid client engine type":

1. No Vercel: **Project → Settings → Environment Variables**
2. Adicione:
   - **Name:** `PRISMA_CLIENT_ENGINE_TYPE`
   - **Value:** `library`
   - Marque **Production**, **Preview** e **Development**
3. Faça um novo deploy (Redeploy).

Alternativa: em **Settings → General → Build Command**, use: `sh scripts/vercel-build.sh`

## Migrations

Após o deploy, aplique as migrations no banco (ex.: Neon/Postgres):

```bash
cd azimut-cms
npx prisma migrate deploy
```

Ou execute manualmente o SQL da pasta `prisma/migrations/` (ex.: `20260208000000_add_project_media_display_options`).
