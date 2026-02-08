# Checklist deploy – Subpáginas premium + Backoffice

**Objetivo:** Garantir coerência site ↔ backoffice antes do deploy (último deploy foi há ~40 min; alterações locais ainda não subidas).

---

## Coerência verificada (site ↔ backoffice)

| Item | Site (Vite) | API pública | Backoffice (Next.js) |
|------|-------------|-------------|----------------------|
| Hero imagem/vídeo | ProjectDetail: hero com imagem ou vídeo; Work/Home: thumbnail quando VIDEO | project/[slug]: heroImage com type, thumbnail, large, original | Imagem de capa + vídeo opcional no projeto |
| Galeria (ordem + legenda) | ProjectDetail: project.gallery.map, media.caption | project/[slug]: gallery com order, caption por lang (PT/EN/ES/FR) | GalleryManager: 4 campos legenda; PATCH captionPt/En/Es/Fr |
| Meta (ano, mês, cidade, estado, país, cliente, tipo, parceria, coprodução) | ProjectDetail: só exibe se preenchido | project/[slug]: stateProvince, city, country, year, month, client, type, partnership, coproduction | Editar projeto → aba Localização: todos os campos + Estado/Província |
| Campos nulos não aparecem | Condicionais em todos os meta | — | Texto na seção: "só aparecem os preenchidos" |

- **useProject.ts** chama API com `lang`; API devolve `gallery` com `caption` no idioma correto. ✓  
- **Prisma:** Project tem stateProvince; ProjectMedia tem captionPt/En/Es/Fr. Schema já usado nas rotas. ✓  

---

## Arquivos alterados (não commitados)

**Backoffice (azimut-cms):**
- `app/admin/projects/[id]/page.tsx` – Seção Localização (aba que abre) + campo Estado
- `app/admin/projects/components/GalleryManager.tsx` – Legendas em 4 idiomas
- `app/api/admin/projects/[id]/gallery/route.ts` – PATCH com 4 captions (já existia)
- `app/api/public/project/[slug]/route.ts` – stateProvince + gallery caption por lang
- `prisma/schema.prisma` – (ajustes existentes)

**Site (src):**
- `src/pages/ProjectDetail.tsx` – Refino visual, galeria, meta
- `src/pages/Work.tsx` – Thumbnail quando vídeo
- `src/pages/Home.tsx` – Thumbnail quando vídeo
- `src/hooks/useProject.ts` – (ajustes existentes)

**Docs/SQL (opcional commit):**
- `docs/ANDAMENTO_SUBPAGINA_PROJETOS_GALERIA.md`
- `docs/BACKOFFICE_GALERIA_PROJETOS.md`
- `docs/IMPLEMENTACAO_TOTAL_SUBPAGINA_PROJETOS.md`
- `docs/CHECKLIST_DEPLOY_SUBPAGINAS.md` (este arquivo)
- `sql/referencia_project_media_galeria.sql` (e outros .sql)

---

## Antes do deploy

1. **Build site:** `npm run build` (raiz) – já passou em teste anterior.
2. **Build backoffice:** na Vercel costuma usar `prisma generate && next build`; se no local falhou por engine do Prisma, na Vercel pode passar.
3. **Variáveis de ambiente:** DATABASE_URL e demais iguais ao último deploy que funcionou.

---

## Deploy (Vercel)

Após commit e push, a Vercel faz o deploy automático (site e backoffice conforme projetos configurados).

- **Site:** build Vite → output em `dist/` (ou comando vercel-build se configurado).
- **Backoffice:** build Next.js em `azimut-cms/` (root do projeto Vercel do backoffice).

Fim do checklist.
