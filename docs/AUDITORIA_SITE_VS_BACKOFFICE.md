# Auditoria: Site (público) ↔ Backoffice — mídias e textos

Documento de referência para garantir que **o que está no backoffice (mídias, textos, informações) vai para o site**. Inclui APIs públicas, slugs e observações.

---

## 1. Resumo do que foi garantido (implementado)

| Área | O que foi feito |
|------|------------------|
| **API pública página** | `GET /api/public/page/[slug]` agora retorna **heroImageUrl** (imagem de fundo do hero), além de SEO e textos do hero. Assim qualquer página que use essa API pode exibir a imagem definida no backoffice. |
| **4 cards da Academy** | Criado `GET /api/public/academy/landing-sections`, que devolve as 4 seções (Vancouver, Cursos, Workshops, Corporate) com **heroImageUrl** e textos (slogan, subtitle, description) por idioma. A página `/academy` (**AcademyNew.tsx**) passa a buscar essa API e exibir **imagem e textos do backoffice** nos 4 cards; se a API falhar ou não houver imagem, usa fallback (emoji + conteúdo hardcoded). |
| **Projetos (Work)** | **API** `/api/public/content?page=work`: **featuredProjects** = exatamente os 7 projetos marcados (featured + priorityHome 1–7) para o topo da página; **highlightProjects** = todos os projetos com os **marcados primeiro** (ordem por priorityHome desc). Assim o que está marcado no backoffice aparece no topo e na ordem correta. |
| **Hook useBackofficeContent** | Passa a expor **heroImageUrl** no objeto `page`, para páginas que consumirem conteúdo via esse hook. |

---

## 2. Tabela: Página do site × Fonte × API backoffice

| Página / área do site | Fonte atual | API backoffice | Observação |
|------------------------|-------------|----------------|------------|
| **Home** (hero, pilares, cards projetos) | Textos: `useBackofficeContent('home')` ou similar; cards: API projetos | `/api/public/page/home`, `/api/public/project/*` | Hero image disponível via `page.heroImageUrl` (API page). Cards Home usam projetos com prioridade home. |
| **Academy** (página principal) – 4 cards | **API** `GET /api/public/academy/landing-sections` + fallback hardcoded | `landing-sections` + `/api/public/page/academy/*` | Imagem e textos dos 4 cards vêm do backoffice (hero de cada subpágina academy/vancouver, courses, workshops, corporate). |
| **Academy – Cursos** (grid de cursos) | **API** `GET /api/public/academy/courses` | Mesma API | Se houver cursos no backoffice, aparecem com imagem; senão, fallback hardcoded. |
| **Academy – Past Events** (workshops) | **API** `GET /api/public/academy/past-events` | Mesma API | Slots do backoffice (imagens) preenchem a galeria; senão, placeholders. |
| **Academy – Vancouver / Cursos / Workshops / Corporate** (subpáginas) | Podem usar `useBackofficeContent('academy/...')` ou página estática | `/api/public/page/academy/vancouver`, etc. | Hero + textos + **heroImageUrl** disponíveis na API page. |
| **Serviços (What)** – listagem e detalhe | **API** serviços | `/api/public/services`, `/api/public/service/[slug]` | Conteúdo e imagens do backoffice. |
| **Projetos (Work)** – listagem e destaque | **API** conteúdo | `/api/public/content?page=work` | **featuredProjects** = 7 projetos marcados no backoffice (priorityHome 1–7) para o topo; **highlightProjects** = todos os projetos com os marcados **primeiro** (ordem priorityHome desc). Marque em **Projetos** → featured + Prioridade Home 1–7. |
| **Studio** (about, equipe, credibilidade) | **API** página + equipe + credenciais | `/api/public/page/studio/*`, `/api/public/team`, `/api/public/credentials` | Textos e fotos vêm do backoffice. |
| **Blog** – listagem e post | **API** blog | `/api/public/blog`, `/api/public/blog/[slug]`, `/api/public/blog/categories` | Posts e capas do backoffice. |
| **Imprensa (Press)** | **API** | `/api/public/press` | Conteúdo do backoffice. |
| **Histórico / Timeline** | **API** | `/api/public/history` | Dados do backoffice. |
| **Editais** | **API** | `/api/public/editais` | Status e listagem do backoffice. |
| **Publicações / Research** | **API** | `/api/public/publications` | Dados do backoffice. |
| **Rodapé** (links, textos) | **API** footer-settings ou página | `/api/public/footer-settings` ou páginas | Conforme configurado no backoffice. |
| **Newsletter** | Envio para backoffice | `POST /api/public/newsletter` | Inscrição registrada no backoffice. |

---

## 3. APIs públicas (backoffice) – lista

Todas sob o prefixo do backoffice (ex.: `https://backoffice.azmt.com.br` ou `VITE_BACKOFFICE_URL`):

| Endpoint | Método | Uso no site |
|----------|--------|-------------|
| `/api/public/page/[slug]` | GET | Conteúdo de página (SEO, hero textos + **heroImageUrl**) |
| `/api/public/academy/landing-sections` | GET | 4 cards da página Academy (imagem + textos) |
| `/api/public/academy/courses` | GET | Lista de cursos (grid Academy) |
| `/api/public/academy/past-events` | GET | Slots Past Events (galeria Workshops) |
| `/api/public/project/[slug]` | GET | Detalhe de projeto (galeria, vídeo, textos) |
| `/api/public/services` | GET | Lista de serviços |
| `/api/public/service/[slug]` | GET | Detalhe de serviço |
| `/api/public/team` | GET | Equipe |
| `/api/public/credentials` | GET | Credenciais |
| `/api/public/history` | GET | Timeline / histórico |
| `/api/public/blog` | GET | Listagem de posts |
| `/api/public/blog/[slug]` | GET | Post individual |
| `/api/public/blog/categories` | GET | Categorias do blog |
| `/api/public/press` | GET | Imprensa |
| `/api/public/publications` | GET | Publicações / research |
| `/api/public/editais` | GET | Editais (ex.: status ABERTO) |
| `/api/public/media` | GET | Mídias por página/seção (ex.: ServiceDetail hero/gallery) |
| `/api/public/footer-settings` | GET | Configurações do rodapé |
| `/api/public/newsletter` | POST | Inscrição newsletter |

---

## 4. Slugs importantes (páginas)

- **Home:** `home`
- **Studio:** `studio`, `studio/about`, etc.
- **Academy:** `academy`, `academy/vancouver`, `academy/courses`, `academy/workshops`, `academy/corporate`
- **Serviços:** definidos em **Serviços** no backoffice (ex.: `what/cinema-audiovisual`).
- **Contato:** `contact`

O site deve usar o **mesmo slug** que o backoffice (com barra quando for subpágina, ex.: `academy/courses`). A API `/api/public/page/[slug]` aceita slug com barra (ex.: `['academy','courses']` → `academy/courses`).

---

## 5. SQL relevante

- **Academy (cursos e past events):** tabelas e slots criados via **Prisma migrations** em `azimut-cms/prisma/migrations/`. Se não usar migrate, rodar manualmente: `sql/EXECUTAR_ACADEMY_SE_PRECISAR.sql`.
- **4 páginas dos cards da Academy:** para as imagens e textos dos 4 cards (Vancouver, Cursos, Workshops, Corporate) irem do backoffice para o site, as páginas precisam existir no banco com status PUBLISHED. Execute **`sql/ensure_academy_landing_pages.sql`** no Neon (ou no banco do backoffice). Isso faz INSERT/UPDATE de `academy/vancouver`, `academy/courses`, `academy/workshops`, `academy/corporate`. Depois, no backoffice em Academy → "4 cards" → Trocar imagem e EDITAR em cada card.
- **Projetos (display de mídia):** `sql/apply_project_media_display_options.sql` (displayFit, displayPosition, displayScale) — não incluir referências a arquivos locais (ex.: `image.png`).
- **Páginas (hero):** a imagem do hero vem do modelo **Page** (heroBackgroundImageId / heroBackgroundImageUrl e relação com **Media**). Não é necessário SQL extra para o hero da página; basta editar no backoffice em **Páginas** → Editar página → Hero / Mídia.

---

## 6. Checklist rápido: “Salvei no backoffice e não aparece no site”

1. **Página publicada?** Em **Páginas**, a página deve estar com status **PUBLISHED**.
2. **Slug correto?** O site chama a API com o mesmo slug (ex.: `academy/courses` com barra).
3. **Cache:** A API pública usa `s-maxage=300, stale-while-revalidate=600`; em até ~5 min o novo conteúdo pode aparecer.
4. **Variável de ambiente:** O site usa `VITE_BACKOFFICE_URL` para chamar o backoffice; em produção deve apontar para a URL correta (ex.: `https://backoffice.azmt.com.br`). No backoffice (Vercel), defina **NEXT_PUBLIC_BACKOFFICE_URL** = `https://backoffice.azmt.com.br` para as APIs retornarem URLs absolutas das imagens.
5. **4 cards Academy:** As imagens e textos vêm do **hero** de cada subpágina (Vancouver, Cursos, Workshops, Corporate). Editar em **Academy** → "4 cards da página Academy" → **Trocar imagem** e **EDITAR** (textos e hero da página).
6. **Projetos (Work):** Os projetos em destaque no topo são os **marcados** no backoffice: **Projetos** → editar cada projeto → **Featured** ativado e **Prioridade Home** 1–7 (1 = destaque principal). A lista mostra todos, com os marcados primeiro.

---

## 7. Verificação geral (backoffice ↔ site)

| Área | O que verificar |
|------|------------------|
| **Academy 4 cards** | Páginas academy/vancouver, courses, workshops, corporate existem e PUBLISHED; hero preenchido. Rodar `sql/ensure_academy_landing_pages.sql` se necessário. |
| **Projetos (Work)** | Projetos no topo: **Featured** = true e **Prioridade Home** = 1 a 7. API `content?page=work` devolve featuredProjects (7) e highlightProjects (todos, marcados primeiro). |
| **Home** | Cards "Projetos em Destaque" = projetos com featured + priorityHome 1–7. |
| **Imagens** | Backoffice: NEXT_PUBLIC_BACKOFFICE_URL; site: VITE_BACKOFFICE_URL. |

--- “4 cards da página Academy” → **Trocar imagem** e **EDITAR** (textos e hero da página).

---

*Última atualização: fev 2026 — Academy 4 cards; Projetos (Work) com marcados no topo; APIs heroImageUrl em URL absoluta; SQL ensure_academy_landing_pages.sql.*
