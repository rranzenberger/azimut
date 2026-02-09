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

No painel do projeto (Vercel ou outro), adicione a variável de ambiente:

- **Nome:** `PRISMA_CLIENT_ENGINE_TYPE`
- **Valor:** `library`

Assim o build em CI/deploy usa o engine "library" do Prisma e evita o erro "Invalid client engine type".

## Migrations

Após o deploy, aplique as migrations no banco (ex.: Neon/Postgres):

```bash
cd azimut-cms
npx prisma migrate deploy
```

Ou execute manualmente o SQL da pasta `prisma/migrations/` (ex.: `20260208000000_add_project_media_display_options`).
