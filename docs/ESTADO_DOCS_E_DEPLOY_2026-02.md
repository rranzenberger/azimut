# Estado dos docs e deploy (fev 2026)

## Docs principais – Work / Curadoria

| Doc | Estado |
|-----|--------|
| `docs/WORK_CURADORIA_BACKOFFICE_CHECKLIST.md` | Atualizado. Passos 1–5 feitos (Prisma, API pública, API admin PUT, formData, UI backoffice). Passos 6–8: SQL no Neon (se precisar), deploy, testar. |
| `sql/add_curation_fields.sql` | ALTER TABLE + UPDATE para página work. Rodar no Neon se as colunas de curadoria não existirem. |
| `sql/work_page_curadoria_update.sql` | INSERT da página work (se não existir) + UPDATE curadoria. Cast `'PUBLISHED'::"PageStatus"` e `"slug"` entre aspas. |

## Deploy

- **Site (Vite):** `npx vite build` → saída em `dist/`. Deploy via Vercel (push em `main`).
- **CMS (Next.js):** `cd azimut-cms && npm run build`. Deploy via Vercel (mesmo repo ou projeto separado).

## Alterações não commitadas (antes do deploy)

- `azimut-cms/app/admin/pages/edit/[[...slug]]/page.tsx` – formData + UI Curadoria
- `azimut-cms/app/api/admin/pages/[...slug]/route.ts` – PUT curadoria
- `azimut-cms/app/api/public/content/route.ts` – retorno curadoria
- `azimut-cms/prisma/schema.prisma` – campos Page
- `src/pages/Work.tsx` – card curadoria
- `docs/WORK_CURADORIA_BACKOFFICE_CHECKLIST.md` – novo
- `sql/add_curation_fields.sql`, `sql/work_page_curadoria_update.sql` – novos
