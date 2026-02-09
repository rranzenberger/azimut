# Academy: diferença Site vs Backoffice (slots e cards)

## O problema

- **No backoffice** hoje: 1 card por *página* (Academy, Corporate, Cursos, Workshops, Research, Vancouver) = edição do **hero e textos da página**.
- **No site**: cada seção tem **vários itens**:
  - **Academy (landing):** 4 cards (CA Vancouver, Cursos, Workshops, Corporate).
  - **Cursos:** 6 cards de curso (VR Production, IA Marketing, Motion Design, etc.) — cada um com imagem, título, descrição, preço, duração, tags, destaque.
  - **Workshops:** 8 slots na galeria "Past Events" (8 imagens).

Ou seja: o que aparece no site **não** é 1 card = 1 página; é **N slots/cards por seção**. O backoffice precisa refletir isso.

---

## Como está hoje (site)

| Seção | No site | No backoffice hoje | Deveria ser |
|-------|---------|--------------------|-------------|
| Academy landing | 4 cards | 6 cards (1 por página) | 4 cards editáveis (ou 4 = as 4 subpáginas com preview igual ao site) |
| Cursos | 6 course cards | 1 card (página Cursos) | **6 cards** — cada um com Trocar imagem + EDITAR (título, descrição, preço, etc.) |
| Workshops Past Events | 8 imagens | 1 página + placeholder | **8 slots** — Trocar imagem em cada slot, reordenar |

Os 6 cursos e as 8 imagens do Past Events estão **hardcoded** no site; não vêm do banco.

---

## Solução: modelo de dados + backoffice visual

### 1. Tabela `AcademyCourse` (6 cards de Cursos)

- `id`, `order` (0..5 ou mais), `imageId` (Media), `titlePt`, `titleEn`, … `descriptionPt`, … `pricePt`, `durationPt`, `levelPt`, `tags` (array), `featured`, `category` (vr, ai, motion, game).
- Backoffice: `/admin/academy/courses` — grid de **6 cards** (como no site), cada um com Trocar imagem e EDITAR.
- Site: API `/api/public/academy/courses` devolve os 6; o site substitui o array hardcoded.

### 2. Tabela `AcademyPastEvent` (8 slots Workshops)

- `id`, `order` (0..7), `mediaId` (Media), `captionPt`, `captionEn` (opcional).
- Backoffice: `/admin/academy/events/gallery` — **8 slots** visuais, cada um com Trocar imagem (+ legenda).
- Site: API `/api/public/academy/workshops/past-events` devolve as 8 mídias; o site substitui o placeholder.

### 3. Academy landing (4 cards)

- Opção A: continuar com 4 = as 4 subpáginas (CA Vancouver, Cursos, Workshops, Corporate); o hub do backoffice mostra só essas 4 no mesmo layout 2x2 do site.
- Opção B: criar 4 “slots” editáveis (título, imagem, link) na landing; exige nova tabela e API.

Recomendação: **Opção A** — no hub, mostrar só os 4 cards que são subpáginas, em layout 2x2, para o backoffice ficar igual ao site.

---

## O que foi implementado

- **Doc e plano:** este arquivo + `docs/BACKOFFICE_VISUAL_ACADEMY_VANCOUVER.md`.
- **Prisma:** modelos `AcademyCourse` (6 cards) e `AcademyPastEvent` (8 slots). Migration em `prisma/migrations/20260209000000_add_academy_courses_and_past_events/`.
- **SQL manual (opcional):** `sql/academy_courses_and_past_events.sql` — CREATE TABLE + INSERT 8 slots.
- **Backoffice Cursos:** `/admin/academy/courses` — grid de 6 cards (Trocar, EDITAR). Botão "Criar 6 cards iniciais" se ainda não existirem.
- **Backoffice Past Events:** `/admin/academy/events/gallery` — 8 slots visuais, Trocar imagem (colar ID da mídia por enquanto).
- **Hub Academy:** em "Outros" há links para **Cursos — 6 cards** e **Past Events — 8 slots**.

## Próximos passos

- **Rodar migration:** `npx prisma migrate deploy` (ou `migrate dev` em dev) para criar as tabelas.
- **API pública:** criar `/api/public/academy/courses` e `/api/public/academy/workshops/past-events` para o site consumir.
- **Site:** em `AcademyCourses.tsx` e `AcademyWorkshops.tsx`, trocar o array hardcoded por fetch à API.

Assim o backoffice fica **visualmente igual ao site** (6 cards Cursos, 8 slots Past Events) e o que se edita no CMS poderá aparecer no site.
