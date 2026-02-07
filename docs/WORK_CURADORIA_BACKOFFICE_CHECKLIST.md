# Work – Curadoria do momento: checklist e retomada

**Se o Cursor caiu:** use a lista abaixo. Anote em "Último passo concluído" o número do último item que você terminou e continue do próximo.

---

## Lista de retomada (ordem a fazer)

| # | Passo | Status | Onde |
|---|--------|--------|------|
| **0** | **Último passo concluído:** *(edite aqui: ex. "3")* | — | — |
| 1 | Prisma + SQL | ✅ Feito | Schema já tem campos; ver SQL abaixo se precisar popular |
| 2 | API pública (retornar curadoria) | ✅ Feito | `azimut-cms/app/api/public/content/route.ts` |
| 3 | API admin PUT (aceitar e gravar curadoria) | ✅ Feito | `azimut-cms/app/api/admin/pages/[...slug]/route.ts` |
| 4 | Backoffice: formData (estado + fetch) | ✅ Feito | `azimut-cms/app/admin/pages/edit/[[...slug]]/page.tsx` |
| 5 | Backoffice: UI visual "Curadoria do momento" | ✅ Feito | Seção 🎪 no Guia rápido + CollapsibleSection quando slug === 'work' |
| 6 | SQL: garantir página `work` no banco | ⚠️ Se precisar | Arquivo `sql/work_page_curadoria_update.sql` (rodar no Neon) |
| 7 | Deploy CMS (build + deploy) | — | `cd azimut-cms && npm run build` → push ou Vercel |
| 8 | Testar no site: editar no backoffice e ver no /work | — | — |

**Resumo:** Prisma, API pública, API admin PUT, formData e UI do backoffice estão feitos. Falta só: rodar SQL se a página work não existir → **deploy do CMS** → testar no site.

**Variável da API (site):** o site usa `VITE_CMS_API_URL` no `.env` ou `.env.local` (ex.: `https://backoffice.azmt.com.br/api`). O backoffice é a própria API; não precisa de variável extra para a curadoria.

**SQL para atualizar:** use o arquivo `sql/work_page_curadoria_update.sql` (INSERT se não existir página work + UPDATE da curadoria). Rodar no Neon ou no banco configurado no CMS.

---

## Estado atual (detalhe)

| Parte | Status | Observação |
|-------|--------|------------|
| **Prisma (schema)** | ✅ Feito | Modelo `Page`: `curationTitlePt/En/Es/Fr`, `curationDescriptionPt/En/Es/Fr`, `curationButtonTextPt/En/Es/Fr`, `curationFilterCategory` |
| **API pública** | ✅ Feito | `route.ts` retorna `curationTitle`, `curationDescription`, `curationButtonText`, `curationFilterCategory` (por idioma) quando existe `pageData` |
| **Site (front)** | ✅ Feito | `src/pages/Work.tsx` usa `cmsContent?.curationTitle` e `cmsContent?.curationDescription` com fallback; card na página |
| **API admin GET** | ✅ Feito | GET `/api/admin/pages/[slug]` devolve a página com campos de curadoria |
| **API admin PUT** | ✅ Feito | A rota lê e grava os 13 campos de curadoria no `body` e no `prisma.page.update` |
| **Backoffice formData** | ✅ Feito | Incluídos no estado inicial e no `setFormData` do fetch |
| **Backoffice UI** | ✅ Feito | Seção "Curadoria do momento" (só quando slug === 'work') com título, descrição, botão e filtro (PT/EN/ES/FR) |
| **Página work no banco** | ⚠️ Verificar | Precisa existir `Page` com `slug = 'work'` para a API retornar curadoria |

---

## O que falta fazer (ordem sugerida)

### Passo 3 – API admin PUT – aceitar e salvar curadoria

**Arquivo:** `azimut-cms/app/api/admin/pages/[...slug]/route.ts`

- No `PUT`, no `body`, fazer destructuring dos campos:
  - `curationTitlePt`, `curationTitleEn`, `curationTitleEs`, `curationTitleFr`
  - `curationDescriptionPt`, `curationDescriptionEn`, `curationDescriptionEs`, `curationDescriptionFr`
  - `curationButtonTextPt`, `curationButtonTextEn`, `curationButtonTextEs`, `curationButtonTextFr`
  - `curationFilterCategory`
- No `prisma.page.update`, no `data`, incluir cada um, ex.:
  - `...(curationTitlePt !== undefined && { curationTitlePt })`,
  - e assim para todos os 13 campos.

---

### Passo 4 – Backoffice – formData (estado + fetch)

**Arquivo:** `azimut-cms/app/admin/pages/edit/[[...slug]]/page.tsx`

**4.1 Estado inicial de `formData`**  
Adicionar ao objeto do `useState`:

- `curationTitlePt: ''`, `curationTitleEn: ''`, `curationTitleEs: ''`, `curationTitleFr: ''`
- `curationDescriptionPt: ''`, `curationDescriptionEn: ''`, `curationDescriptionEs: ''`, `curationDescriptionFr: ''`
- `curationButtonTextPt: ''`, `curationButtonTextEn: ''`, `curationButtonTextEs: ''`, `curationButtonTextFr: ''`
- `curationFilterCategory: ''`

**4.2 Ao carregar a página (no `setFormData` do fetch)**  
Incluir no objeto passado para `setFormData`:

- `curationTitlePt: data.curationTitlePt || ''`, e o mesmo para En/Es/Fr
- `curationDescriptionPt: data.curationDescriptionPt || ''`, e o mesmo para En/Es/Fr
- `curationButtonTextPt: data.curationButtonTextPt || ''`, e o mesmo para En/Es/Fr
- `curationFilterCategory: data.curationFilterCategory || ''`

---

### Passo 5 – Backoffice – UI visual "Curadoria do momento"

**Arquivo:** `azimut-cms/app/admin/pages/edit/[[...slug]]/page.tsx`

- Exibir **só quando `slug === 'work'`** (página Projetos).
- Adicionar uma seção (ex. com `CollapsibleSection`) com título: **"Curadoria do momento (card na página Projetos)"**.
- Campos na seção:
  - **Título (PT/EN/ES/FR):** ex. "Curadoria Gramado" – ligar a `formData.curationTitlePt` etc. e `setFormData`.
  - **Descrição (PT/EN/ES/FR):** texto do card – ligar a `formData.curationDescriptionPt` etc.
  - **Texto do botão (PT/EN/ES/FR):** ex. "Ver Curadoria" – ligar a `formData.curationButtonTextPt` etc.
  - **Filtro ao clicar (opcional):** `curationFilterCategory` (ex. `curadoria`).
- Colocar no "Guia rápido" e no fluxo da página (ex. perto de Hero ou SEO) para ficar visível e claro.

---

### Passo 6 – SQL (se a página "work" não existir ou estiver vazia)

Só usar se no banco não houver linha com `slug = 'work'` na tabela `Page`, ou para dar valores iniciais.

**Inserir página "work" (se não existir):**

```sql
INSERT INTO "Page" (
  id, name, slug, status,
  "createdAt", "updatedAt",
  "curationTitlePt", "curationDescriptionPt", "curationButtonTextPt", "curationFilterCategory"
)
SELECT
  gen_random_uuid(),
  'Projetos',
  'work',
  'PUBLISHED',
  NOW(),
  NOW(),
  'Curadoria Gramado',
  'Nosso maior diferencial: curadoria de nível internacional para festivais. Único estúdio no Brasil que combina produção técnica premium com expertise em curadoria cinematográfica.',
  'Ver Projetos de Curadoria',
  'curadoria'
WHERE NOT EXISTS (SELECT 1 FROM "Page" WHERE slug = 'work');
```

**Apenas atualizar curadoria (se a página já existir):**

```sql
UPDATE "Page"
SET
  "curationTitlePt" = 'Curadoria Gramado',
  "curationDescriptionPt" = 'Nosso maior diferencial: curadoria de nível internacional para festivais. Único estúdio no Brasil que combina produção técnica premium com expertise em curadoria cinematográfica.',
  "curationButtonTextPt" = 'Ver Projetos de Curadoria',
  "curationFilterCategory" = 'curadoria',
  "updatedAt" = NOW()
WHERE slug = 'work';
```

---

### Passo 7 – Deploy aos poucos (evitar erros)

1. **Build do CMS:**  
   `cd azimut-cms && npm run build`  
   Se der erro, corrigir antes de fazer push.

2. **Commit e push** (só quando o build passar):  
   `git add .` → `git commit -m "..."` → `git push origin main`

3. **Vercel** faz deploy automático. Verificar no dashboard se o build do projeto CMS passou.

4. **Testar:**  
   - Abrir backoffice → Páginas → editar "work".  
   - Ver se aparece a seção "Curadoria do momento" e se salva.  
   - Abrir site `/work` e ver se o card mostra o texto editado.

---

## Ligação visual (site ↔ backoffice)

- **Site (Work):** lê `cmsContent.curationTitle`, `cmsContent.curationDescription` (e pode usar `curationButtonText` / `curationFilterCategory`).
- **API pública:** ao pedir `page=work`, busca `Page` com `slug = 'work'` e devolve os campos de curadoria por idioma.
- **Backoffice:** em Páginas → editar "work" → seção **"Curadoria do momento"** → preencher e salvar.
- **API admin PUT:** recebe esses campos no `body` e grava no `Page` com `slug = 'work'`.

Quando tudo estiver feito: editar no backoffice na página "work" atualiza o card "Curadoria do momento" no site, sem novo deploy de código.
