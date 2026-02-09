# Escaneamento: mídia no site e no backoffice — edição visual

Objetivo: **em todo lugar que tiver imagem/vídeo no site, o backoffice de edição deve ser visual** (preview “como no site”, thumb, escolher, trocar, adicionar), reutilizando o padrão dos **Projetos**.

---

## 1. Onde há mídia NO SITE (frontend)

| Página / Área | O que aparece | Tipo |
|---------------|----------------|------|
| **Home** | Hero (imagem de fundo ou vídeo demoreel) | Imagem + vídeo |
| **Home** | Cards dos projetos em destaque (Principal 1–7) | Imagem de capa por projeto |
| **/work** | Listagem de projetos — card com capa por projeto | Imagem |
| **/work/[slug]** (subpágina do projeto) | Capa (hero) + galeria de mídias | Imagem/vídeo + galeria |
| **Academy – Cursos** | Cards (CA, Courses, Workshops, Corporate) — ícones/imagens por card | Conteúdo da página (page) |
| **Academy – Workshops** | Past Events — grid de placeholders (imagens/vídeos) | Conteúdo da página |
| **Academy – Vancouver / depoimentos** | Vídeo principal + cards de perfis | Vídeo + imagens |
| **Páginas genéricas** (studio, diferenciais, etc.) | Hero, vídeos por idioma, imagens de seções | Imagem + vídeo |
| **Serviços** | Imagem/hero por serviço (se houver) | Imagem |
| **Blog** | Capa do post na listagem e na página do post | Imagem |
| **Making-of** | Grid de mídias (imagens/vídeos) | Galeria |
| **Press / Publicações** | Imagens se houver | Imagem |

---

## 2. Onde se EDITA mídia NO BACKOFFICE

| Tela de edição | Caminho | Mídia editada | Já é visual? |
|----------------|---------|----------------|--------------|
| **Projetos** | `/admin/projects/[id]` | Capa + galeria (subpágina) | ✅ Sim — preview no topo, Capa e Galeria primeiro, ícones 🖼️📋📍📝 |
| **Projetos (novo)** | `/admin/projects/new` | Capa | Parcial (UnifiedMediaUpload, sem preview “como no site”) |
| **Páginas** | `/admin/pages/edit/[[...slug]]` | Hero (imagem + demoreel), vídeos Studio, seções work (cards dos projetos) | Parcial — hero tem UnifiedMediaUpload; work tem cards com thumb; **falta preview único no topo** “como no site” |
| **Blog (post)** | `/admin/blog/[id]` | `coverImageUrl` | ❌ Campo URL/texto, sem preview de capa |
| **Making-of** | `/admin/making-of`, curation | `mediaFiles` | Lista com thumb; pode ganhar preview “como no site” |
| **Serviços** | `/admin/services/[id]` | Apenas `icon` (texto) | Sem mídia de imagem atualmente |
| **Mídias** | `/admin/media` | Upload geral | Lista de arquivos com thumb (OK) |

---

## 3. Código que já existe e pode ser reutilizado

- **UnifiedMediaUpload** (`components/admin/UnifiedMediaUpload.tsx`): upload, URL externa, biblioteca — já usado em Projetos e Páginas (home hero).
- **GalleryManager** (`app/admin/projects/components/GalleryManager.tsx`): galeria com thumbnails, reordenar, legendas, apagar, substituir — **específico de projetos** (ProjectMedia). Para outras entidades seria preciso uma variante ou componente “galeria genérica”.
- **Padrão da página de Projetos**:
  - Preview no topo: “Como aparece no site” (card principal + faixa de thumbs da galeria).
  - Navegação por ícones (🖼️ Capa e Galeria, 📋 Dados básicos, 📍 Localização, 📝 Texto e SEO).
  - Seção “Capa e Galeria” em primeiro, com UnifiedMediaUpload + GalleryManager.

---

## 4. Como proceder — plano recomendado

### Fase 1: Componente reutilizável (aproveitar o que fizemos)

1. **Criar `MediaPreviewBlock`** (ou reutilizar o bloco de preview dos projetos):
   - Props: `title`, `mainCard?: { imageUrl?, videoUrl?, title? }`, `gallery?: { thumbUrl, id }[]`, `emptyMessage?`.
   - Renderiza o mesmo layout “Como aparece no site”: card principal + faixa de miniaturas (ou mensagem quando vazio).
   - Colocar em `azimut-cms/components/admin/MediaPreviewBlock.tsx` (ou em `app/admin/components/`).

2. **Manter** `UnifiedMediaUpload` e, onde já existir, **não duplicar** — só passar a envolvê-lo com o preview no topo.

### Fase 2: Aplicar onde já há mídia

| Ordem | Tela | Ação |
|-------|------|------|
| 1 | **Páginas** (`/admin/pages/edit/[[...slug]]`) | No topo da edição (por slug), adicionar preview “Como no site”: para `home` = hero (imagem ou frame do vídeo) + texto; para `academy-courses` / `academy-workshops` = cards ou grid como no front; para `work` = só indicar “projetos editados em Projetos”. Reutilizar `MediaPreviewBlock` quando o layout for “um hero + opcional galeria”. |
| 2 | **Blog (post)** | Adicionar preview da capa no topo (miniatura da `coverImageUrl`) + manter ou trocar para UnifiedMediaUpload para escolher/trocar imagem. |
| 3 | **Making-of** | Se houver uma “página” ou bloco que exibe um grid no site, adicionar preview em grid no topo da edição; senão, manter lista com thumb. |
| 4 | **Serviços** | Se no futuro houver imagem de capa/hero por serviço, usar o mesmo padrão (preview + UnifiedMediaUpload). |

### Fase 3: Navegação por ícones (como em Projetos)

- Em **Páginas** (edit): se a página for longa, adicionar no topo os mesmos “ícones para ir ao item” (ex.: 🏠 Hero, 📝 Textos, 🎬 Mídia, etc.) e scroll ao clicar.
- Em **Blog** [id]: seção única ou poucas seções — um preview de capa no topo já resolve; ícones só se a tela crescer.

---

## 5. Tabela completa — site vs backoffice (escaneamento)

| Onde no SITE | Onde no BACKOFFICE | Mídia | Já visual (preview + trocar/adicionar)? |
|--------------|--------------------|-------|----------------------------------------|
| Home (hero) | Páginas → Editar Home | Imagem/vídeo hero | ✅ MediaPreviewBlock + UnifiedMediaUpload |
| Home (cards destaque) | Mesma página Home (cards com Trocar, EDITAR) | Capa por projeto | ✅ Cards com Trocar, galeria, EDITAR ESTE PROJETO |
| /work (listagem) | Projetos (lista) | Capa por projeto | ✅ ProjectCard com thumb + link edição |
| /work/[slug] (projeto) | Projetos → [id] | Capa + galeria | ✅ Preview topo, Capa e Galeria, GalleryManager |
| Projetos (novo) | Projetos → Novo | Capa | ✅ UnifiedMediaUpload (sem preview “como no site” no topo — opcional) |
| Academy (todas: cursos, workshops, corporate, vancouver, research) | Páginas → Editar [slug] (slug contém "academy") | Hero se houver | ✅ MediaPreviewBlock para hero em todas |
| Newsletter (página de landing do site, se existir) | Páginas → Editar newsletter | Hero se houver | ✅ MediaPreviewBlock para hero |
| Blog (listagem + post) | Blog → [id] | Capa do post | ✅ MediaPreviewBlock no topo; campo URL abaixo |
| Blog (novo post) | Blog → Novo | Capa | ✅ MediaPreviewBlock no topo |
| Equipe (foto do membro) | Team → [id] | photoUrl | ✅ MediaPreviewBlock no topo; campo URL abaixo para trocar |
| Making-of (grid) | Making-of (lista + curadoria) | mediaFiles | Lista com thumb; sem preview “como no site” no topo da edição (não há tela [id] de item) |
| History (logo/ícone) | History → [id] | logoUrl (texto) | Opcional: preview + upload |
| Serviços | Services → [id] | Só icon texto hoje | Sem mídia imagem |
| Press / Publications | Press, Publications [id] | Verificar modelos | Sem imagem no formulário atual |
| Newsletter (inscritos / enviar) | /admin/newsletter | Sem mídia (lista de emails, enviar, stats) | N/A — não edita conteúdo com imagem |

## 6. Resumo e status

- **Projetos**: referência — preview no topo, Capa e Galeria primeiro, ícones, Trocar/Adicionar na Home.
- **Componentes**: `MediaPreviewBlock` + `UnifiedMediaUpload` + `GalleryManager` (projetos).
- **Feito:** Home, **todas as páginas Academy** (hero), **Newsletter** (página de landing com hero), Blog [id] e new (preview capa), Projetos [id] e lista, Team [id] (preview foto).
- **Academy e Newsletter:** Na edição de Páginas, a seção **« Vídeo e capa »** (UnifiedMediaUpload + VideoWithThumbnailField) aparece para todas as páginas exceto Studio — ou seja, Academy (cursos, workshops, corporate, vancouver, research) e Newsletter já têm upload/troca de hero pela biblioteca.
- **Making-of:** Listagem e criação usam **GET/POST /api/admin/making-of** (rotas criadas). Curadoria usa **POST /api/admin/making-of/[id]/approve** (rota criada). Não existe tela de edição por item ([id]); plano em **docs/MAKING_OF_EDICAO_VISUAL_PLANO.md** quando existir GET/PUT por id.
- **Opcional:** History logoUrl (preview + upload).

Assim, em **todas as páginas do backoffice que tiverem opção de mídia**, entra a **visualização de como fica no site** (thumb, vídeo, imagem), com o mesmo padrão de mostrar, escolher, trocar e adicionar.
